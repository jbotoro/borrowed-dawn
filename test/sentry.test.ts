import { describe, expect, it } from "vitest";
import { resolveCombat } from "../src/game/combat";
import { hurtEnemy, spawnEnemies, stepEnemies } from "../src/game/enemies";
import { countHazards, createHazards, stepHazards } from "../src/game/hazards";
import { createGame } from "../src/game/index";
import type { Enemy, GameEvent, Hazard, Room } from "../src/game/types";
import { tuning } from "../src/tuning";
import { DT, emptyInput, playerAt } from "./helpers";

const FLOOR_TOP = 1;
const SENTRY_X = 12;

function sentryRoom(): Room {
  return {
    id: "sentry-test",
    name: "Sentry Test",
    bounds: { x: 0, y: 0, w: 24, h: 12 },
    solids: [
      { x: 0, y: 0, w: 24, h: 1 },
      { x: -1, y: 0, w: 1, h: 12 },
      { x: 24, y: 0, w: 1, h: 12 }
    ],
    doors: [],
    enemies: [
      { id: 20, kind: "sentry", x: SENTRY_X, y: FLOOR_TOP, patrolMinX: 4, patrolMaxX: 20, facing: 1 }
    ],
    pickups: [],
    gates: [],
    breakables: [],
    decor: [],
    waypoints: [{ x: 2, y: FLOOR_TOP }]
  };
}

function sentryOf(enemies: Enemy[]): Enemy {
  const found = enemies.find((enemy) => enemy.kind === "sentry");
  if (!found) {
    throw new Error("no sentry");
  }
  return found;
}

function liveBeam(hazards: Hazard[]): Hazard | undefined {
  return hazards.find((hazard) => hazard.alive && hazard.kind === "beam");
}

describe("prism sentry", () => {
  it("charges only while the courier is inside its sight band", () => {
    const cfg = tuning.sentry;
    const room = sentryRoom();
    const watchMs = (cfg.chargeMs + cfg.beamMs) / 1000 + 1;

    const farEnemies = spawnEnemies(room, tuning);
    const farHazards = createHazards(tuning.world.hazardCapacity);
    const far = playerAt(SENTRY_X - cfg.sightRange - 2, FLOOR_TOP);
    for (let t = 0; t < watchMs; t += DT) {
      stepEnemies(farEnemies, far, room.solids, farHazards, t, DT, tuning);
    }
    expect(sentryOf(farEnemies).state).toBe("patrol");
    expect(countHazards(farHazards)).toBe(0);

    const highEnemies = spawnEnemies(room, tuning);
    const highHazards = createHazards(tuning.world.hazardCapacity);
    const high = playerAt(SENTRY_X - 2, FLOOR_TOP + cfg.height * 0.5 + cfg.sightHeight + 0.5);
    for (let t = 0; t < watchMs; t += DT) {
      stepEnemies(highEnemies, high, room.solids, highHazards, t, DT, tuning);
    }
    expect(sentryOf(highEnemies).state).toBe("patrol");
    expect(countHazards(highHazards)).toBe(0);

    const enemies = spawnEnemies(room, tuning);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const near = playerAt(SENTRY_X - 3, FLOOR_TOP);
    const sentry = sentryOf(enemies);
    stepEnemies(enemies, near, room.solids, hazards, 0, DT, tuning);
    expect(sentry.state).toBe("telegraph");
    expect(sentry.facing).toBe(-1);
    expect(countHazards(hazards)).toBe(0);
  });

  it("fires one beam ahead of its front edge for beamMs, then holds through recover and cooldown", () => {
    const cfg = tuning.sentry;
    const room = sentryRoom();
    const enemies = spawnEnemies(room, tuning);
    const sentry = sentryOf(enemies);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const player = playerAt(SENTRY_X - 3, FLOOR_TOP);
    const fireTimes: number[] = [];
    const states: Record<string, boolean> = {};
    let t = 0;
    let beamSeen: Hazard | null = null;
    let beamStart = Number.NaN;
    let beamEnd = Number.NaN;
    let hadBeam = false;

    while (fireTimes.length < 2 && t < 12) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      stepHazards(hazards, room.bounds, room.solids, t, DT);
      states[sentry.state] = true;
      const beam = liveBeam(hazards);
      if (beam && !hadBeam) {
        hadBeam = true;
        if (beamSeen === null) {
          beamSeen = structuredClone(beam) as Hazard;
          beamStart = t;
        }
        fireTimes.push(t);
      } else if (!beam && hadBeam) {
        hadBeam = false;
        if (Number.isNaN(beamEnd)) {
          beamEnd = t;
        }
      }
      t += DT;
    }

    expect(beamSeen).not.toBeNull();
    if (!beamSeen) {
      throw new Error("no beam");
    }
    expect(beamSeen.vel.x).toBe(0);
    expect(beamSeen.vel.y).toBe(0);
    expect(beamSeen.w).toBe(cfg.beamLength);
    expect(beamSeen.h).toBe(cfg.beamHeight);
    expect(beamSeen.damage).toBe(cfg.damage);
    expect(beamSeen.pos.y).toBeCloseTo(sentry.pos.y + cfg.height * 0.5, 6);
    const front = sentry.pos.x - cfg.width * 0.5;
    expect(beamSeen.pos.x).toBeCloseTo(front - cfg.beamLength * 0.5, 6);

    expect(beamEnd - beamStart).toBeGreaterThanOrEqual(cfg.beamMs / 1000 - DT);
    expect(beamEnd - beamStart).toBeLessThanOrEqual(cfg.beamMs / 1000 + 2 * DT);

    expect(states["recover"]).toBe(true);
    const gap = (fireTimes[1] ?? 0) - (fireTimes[0] ?? 0);
    const expected = (cfg.beamMs + cfg.recoverMs + cfg.cooldownMs + cfg.chargeMs) / 1000;
    expect(gap).toBeGreaterThanOrEqual(expected - DT);
    expect(gap).toBeLessThanOrEqual(expected + 5 * DT);
  });

  it("never leaves its post, even when hit", () => {
    const room = sentryRoom();
    const enemies = spawnEnemies(room, tuning);
    const sentry = sentryOf(enemies);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const player = playerAt(SENTRY_X - 3, FLOOR_TOP);
    const events: GameEvent[] = [];
    const startX = sentry.pos.x;
    let t = 0;

    for (let i = 0; i < 360; i += 1) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
      if (i === 120) {
        hurtEnemy(sentry, tuning.attack.damage, player.pos.x, t, tuning, events);
        expect(sentry.state).toBe("hurt");
        expect(sentry.vel.x).toBe(0);
      }
      expect(sentry.pos.x).toBeCloseTo(startX, 6);
      expect(sentry.pos.y).toBeCloseTo(FLOOR_TOP, 6);
    }
    expect(sentry.grounded).toBe(true);
    expect(sentry.health).toBe(tuning.sentry.health - tuning.attack.damage);
  });

  it("burns a courier standing in the beam and misses one below or above it", () => {
    const room = sentryRoom();
    const game = createGame({ tuning, seed: 17, rooms: [room] });
    game.setInput(emptyInput());
    game.start();
    const player = game.state.player;
    const startingHealth = player.health;
    let beam: Hazard | undefined;

    for (let i = 0; i < 360 && !beam; i += 1) {
      player.pos.x = SENTRY_X - 3;
      player.pos.y = FLOOR_TOP;
      game.step(DT);
      beam = liveBeam(game.state.hazards);
    }

    expect(beam).toBeDefined();
    if (!beam) {
      throw new Error("no beam");
    }
    expect(player.health).toBe(startingHealth - tuning.sentry.damage);

    const breakableHp = new Map<string, number>();
    const standing = player.health;
    player.invulnerableUntil = 0;
    player.hurtUntil = 0;

    player.pos.y = beam.pos.y - tuning.player.height - 0.05;
    resolveCombat(game.state, room, breakableHp, game.state.time, tuning, game.state.events);
    expect(player.health).toBe(standing);

    player.pos.y = beam.pos.y + beam.h + 0.05;
    resolveCombat(game.state, room, breakableHp, game.state.time, tuning, game.state.events);
    expect(player.health).toBe(standing);

    player.pos.y = FLOOR_TOP;
    resolveCombat(game.state, room, breakableHp, game.state.time, tuning, game.state.events);
    expect(player.health).toBe(standing - tuning.sentry.damage);
  });

  it("dies to three up-close hits and never hurts the courier by contact", () => {
    const room = sentryRoom();
    const game = createGame({ tuning, seed: 19, rooms: [room] });
    game.setInput(emptyInput());
    game.start();
    const sentry = sentryOf(game.state.enemies);
    const player = game.state.player;
    const breakableHp = new Map<string, number>();
    const startingHealth = player.health;

    player.pos.x = sentry.pos.x;
    player.pos.y = sentry.pos.y;
    for (let i = 0; i < 60; i += 1) {
      resolveCombat(game.state, room, breakableHp, game.state.time, tuning, game.state.events);
    }
    expect(player.health).toBe(startingHealth);

    player.pos.x = sentry.pos.x - tuning.attack.reach * 0.5;
    player.facing = 1;
    player.attackDir = "side";
    for (let i = 0; i < tuning.sentry.health; i += 1) {
      player.attackPhase = "active";
      player.attackHitIds.length = 0;
      resolveCombat(game.state, room, breakableHp, game.state.time, tuning, game.state.events);
    }

    expect(sentry.health).toBe(0);
    expect(sentry.alive).toBe(false);
    expect(sentry.state).toBe("dead");
    expect(player.health).toBe(startingHealth);
  });

  it("serves recover plus cooldown when a hit interrupts the charge or the beam", () => {
    const cfg = tuning.sentry;
    const room = sentryRoom();
    const enemies = spawnEnemies(room, tuning);
    const sentry = sentryOf(enemies);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const player = playerAt(SENTRY_X - 3, FLOOR_TOP);
    const events: GameEvent[] = [];
    let t = 0;

    while (sentry.state !== "attack" && t < 5) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
    }
    expect(sentry.state).toBe("attack");

    hurtEnemy(sentry, tuning.attack.damage, player.pos.x, t, tuning, events);
    expect(sentry.state).toBe("hurt");
    expect(sentry.hurtFrom).toBe("attack");

    const hurtEnd = t + cfg.hurtMs / 1000;
    while (sentry.state === "hurt" && t < 12) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
    }
    expect(sentry.state).toBe("recover");
    expect(sentry.stateUntil - hurtEnd).toBeGreaterThanOrEqual(cfg.recoverMs / 1000 - 2 * DT);

    while (sentry.state === "recover" && t < 12) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
    }
    expect(sentry.state).toBe("patrol");
    expect(sentry.stateUntil - t).toBeGreaterThanOrEqual(cfg.cooldownMs / 1000 - 2 * DT);

    const chargeAgain = sentry.stateUntil + cfg.chargeMs / 1000;
    while (sentry.state !== "attack" && t < 20) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
    }
    expect(sentry.state).toBe("attack");
    expect(t).toBeGreaterThanOrEqual(chargeAgain - 2 * DT);
  });

  it("resumes the remaining cooldown when a hit lands between beams", () => {
    const cfg = tuning.sentry;
    const room = sentryRoom();
    const enemies = spawnEnemies(room, tuning);
    const sentry = sentryOf(enemies);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const player = playerAt(SENTRY_X - 3, FLOOR_TOP);
    const events: GameEvent[] = [];
    let t = 0;

    while (!(sentry.state === "patrol" && sentry.stateUntil > t) && t < 12) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
    }
    expect(sentry.state).toBe("patrol");
    const cooldownEnd = sentry.stateUntil;
    expect(cooldownEnd).toBeGreaterThan(t);

    hurtEnemy(sentry, tuning.attack.damage, player.pos.x, t, tuning, events);
    expect(sentry.hurtFrom).toBe("patrol");
    const remaining = cooldownEnd - t;

    const hurtEnd = t + cfg.hurtMs / 1000;
    while (sentry.state === "hurt" && t < 20) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
    }
    expect(sentry.state).toBe("patrol");
    expect(sentry.stateUntil).toBeGreaterThanOrEqual(hurtEnd + remaining - 2 * DT);
    expect(sentry.stateUntil).toBeLessThanOrEqual(hurtEnd + remaining + 2 * DT);
  });

  it("clips the beam at the first solid in its band and ignores solids below it", () => {
    const cfg = tuning.sentry;
    const wall = { x: SENTRY_X - 5, y: 0, w: 0.6, h: 6 };
    const low = { x: SENTRY_X - 5, y: 0, w: 0.6, h: 1.2 };

    function beamFor(extra: { x: number; y: number; w: number; h: number }): Hazard {
      const room = sentryRoom();
      const solids = [...room.solids, extra];
      const enemies = spawnEnemies(room, tuning);
      const sentry = sentryOf(enemies);
      const hazards = createHazards(tuning.world.hazardCapacity);
      const player = playerAt(SENTRY_X - 3, FLOOR_TOP);
      let t = 0;
      let beam = liveBeam(hazards);
      while (!beam && t < 6) {
        stepEnemies(enemies, player, solids, hazards, t, DT, tuning);
        t += DT;
        beam = liveBeam(hazards);
      }
      if (!beam) {
        throw new Error("no beam");
      }
      expect(sentry.facing).toBe(-1);
      return beam;
    }

    const front = SENTRY_X - cfg.width * 0.5;
    const clipped = beamFor(wall);
    const expected = front - (wall.x + wall.w);
    expect(clipped.w).toBeCloseTo(expected, 6);
    expect(clipped.pos.x).toBeCloseTo(front - expected * 0.5, 6);

    const unclipped = beamFor(low);
    expect(unclipped.w).toBe(cfg.beamLength);
    expect(unclipped.pos.x).toBeCloseTo(front - cfg.beamLength * 0.5, 6);
  });

  it("stops firing once it is dead", () => {
    const room = sentryRoom();
    const enemies = spawnEnemies(room, tuning);
    const sentry = sentryOf(enemies);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const player = playerAt(SENTRY_X - 3, FLOOR_TOP);
    sentry.health = 0;
    sentry.alive = false;
    sentry.state = "dead";
    let t = 0;

    for (let i = 0; i < 600; i += 1) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      stepHazards(hazards, room.bounds, room.solids, t, DT);
      t += DT;
    }

    expect(countHazards(hazards)).toBe(0);
  });
});
