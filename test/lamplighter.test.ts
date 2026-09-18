import { describe, expect, it } from "vitest";
import { resolveCombat } from "../src/game/combat";
import { spawnEnemies, stepEnemies } from "../src/game/enemies";
import { countHazards, createHazards, spawnHazard, stepHazards } from "../src/game/hazards";
import { createGame } from "../src/game/index";
import type { Enemy, Room } from "../src/game/types";
import { rooms } from "../src/content/rooms";
import { tuning } from "../src/tuning";
import { DT, emptyInput, playerAt } from "./helpers";

function lamplighterRoom(): Room {
  return {
    id: "lamp-test",
    name: "Lamp Test",
    bounds: { x: 0, y: 0, w: 20, h: 12 },
    solids: [{ x: 0, y: 0, w: 20, h: 1 }],
    doors: [],
    enemies: [
      { id: 10, kind: "lamplighter", x: 10, y: 1, patrolMinX: 7, patrolMaxX: 13, facing: 1 }
    ],
    pickups: [],
    gates: [],
    breakables: [],
    decor: [],
    waypoints: [{ x: 2, y: 1 }]
  };
}

function lamplighterOf(enemies: Enemy[]): Enemy {
  const enemy = enemies.find((candidate) => candidate.kind === "lamplighter");
  if (!enemy) {
    throw new Error("no lamplighter");
  }
  return enemy;
}

describe("lamplighter", () => {
  it("closes horizontal distance to a courier in sight at chase speed", () => {
    const room = lamplighterRoom();
    const enemies = spawnEnemies(room, tuning);
    const lamplighter = lamplighterOf(enemies);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const player = playerAt(lamplighter.pos.x - 2, room.bounds.y + 1);
    const initialDistance = Math.abs(player.pos.x - lamplighter.pos.x);
    const steps = 30;

    for (let i = 0; i < steps; i += 1) {
      stepEnemies(enemies, player, room.solids, hazards, i * DT, DT, tuning);
    }

    const distance = Math.abs(player.pos.x - lamplighter.pos.x);
    const closed = Math.min(initialDistance, tuning.lamplighter.chaseSpeed * steps * DT);
    expect(distance).toBeLessThanOrEqual(initialDistance - closed + 1e-9);
    expect(distance).toBeLessThan(initialDistance - tuning.lamplighter.patrolSpeed * steps * DT);
    expect(lamplighter.facing).toBe(-1);
  });

  it("dips during the telegraph without crossing its swoop floor", () => {
    const room = lamplighterRoom();
    const enemies = spawnEnemies(room, tuning);
    const lamplighter = lamplighterOf(enemies);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const player = playerAt(lamplighter.pos.x, room.bounds.y + 1);
    const hoverLine = room.enemies[0]!.y + tuning.lamplighter.hoverHeight;
    const swoopFloor = hoverLine - tuning.lamplighter.swoopDepth;
    let t = 0;

    while (lamplighter.state !== "telegraph" && t < 4) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
    }

    const telegraphStartY = lamplighter.pos.y;
    let lowestY = telegraphStartY;
    while (lamplighter.state !== "patrol" && t < 5) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
      lowestY = Math.min(lowestY, lamplighter.pos.y);
      expect(lamplighter.pos.y).toBeGreaterThanOrEqual(swoopFloor);
    }

    expect(lowestY).toBeLessThan(hoverLine - tuning.lamplighter.bobAmp - DT);
    expect(lamplighter.pos.y).toBeGreaterThan(lowestY);
  });

  it("aims its ember sideways at a pinned post toward a courier off to the side", () => {
    const room = lamplighterRoom();
    room.enemies = [
      { id: 10, kind: "lamplighter", x: 10, y: 2.5, patrolMinX: 10, patrolMaxX: 10, facing: 1 }
    ];
    const enemies = spawnEnemies(room, tuning);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const floorTop = room.solids[0]!.y + room.solids[0]!.h;
    const courierX = 11;
    const player = playerAt(courierX, floorTop);
    let t = 0;
    let sawEmber = false;
    let lastEmberX = Number.NaN;
    let landedX = Number.NaN;

    while (Number.isNaN(landedX) && t < 8) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      stepHazards(hazards, room.bounds, room.solids, t, DT);
      t += DT;
      const ember = hazards.find((hazard) => hazard.alive && hazard.kind === "ember");
      if (ember) {
        sawEmber = true;
        lastEmberX = ember.pos.x;
      } else if (sawEmber) {
        landedX = lastEmberX;
      }
    }

    expect(sawEmber).toBe(true);
    expect(Math.abs(landedX - courierX)).toBeLessThan(0.6);
  });

  it("chases a courier two units to the side and lands an ember on it", () => {
    const room = lamplighterRoom();
    const enemies = spawnEnemies(room, tuning);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const floorTop = room.solids[0]!.y + room.solids[0]!.h;
    const courierX = room.enemies[0]!.x + 2;
    const player = playerAt(courierX, floorTop);
    let t = 0;
    let sawEmber = false;
    let lastEmberX = Number.NaN;
    let landedX = Number.NaN;

    while (Number.isNaN(landedX) && t < 8) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      stepHazards(hazards, room.bounds, room.solids, t, DT);
      t += DT;
      const ember = hazards.find((hazard) => hazard.alive && hazard.kind === "ember");
      if (ember) {
        sawEmber = true;
        lastEmberX = ember.pos.x;
      } else if (sawEmber) {
        landedX = lastEmberX;
      }
    }

    expect(sawEmber).toBe(true);
    expect(Math.abs(landedX - courierX)).toBeLessThan(0.6);
  });

  it("does not target the courier from beyond its Gallery sight depth", () => {
    const game = createGame({
      tuning,
      seed: 31,
      rooms,
      startRoom: "gallery",
      startPos: { x: 16.5, y: 3.6 },
      god: true
    });
    game.setInput(emptyInput());
    game.start();
    let telegraphed = false;
    let droppedEmber = false;

    for (let elapsed = 0; elapsed < 8; elapsed += DT) {
      game.state.player.pos.x = 16.5;
      game.state.player.pos.y = 3.6;
      game.step(DT);
      const lamplighter = lamplighterOf(game.state.enemies);
      telegraphed ||= lamplighter.state === "telegraph";
      droppedEmber ||= game.state.hazards.some((hazard) => hazard.alive && hazard.kind === "ember");
    }

    expect(telegraphed).toBe(false);
    expect(droppedEmber).toBe(false);
  });

  it("drops embers on the courier within its Gallery sight depth", () => {
    const game = createGame({
      tuning,
      seed: 31,
      rooms,
      startRoom: "gallery",
      startPos: { x: 16.5, y: 10.6 },
      god: true
    });
    game.setInput(emptyInput());
    game.start();
    let telegraphed = false;
    let droppedEmber = false;

    for (let elapsed = 0; elapsed < 8; elapsed += DT) {
      game.state.player.pos.x = 16.5;
      game.state.player.pos.y = 10.6;
      game.step(DT);
      const lamplighter = lamplighterOf(game.state.enemies);
      telegraphed ||= lamplighter.state === "telegraph";
      droppedEmber ||= game.state.hazards.some((hazard) => hazard.alive && hazard.kind === "ember");
    }

    expect(telegraphed).toBe(true);
    expect(droppedEmber).toBe(true);
  });

  it("stays on its Gallery hover path while the courier waits below", () => {
    const gallery = rooms.find((room) => room.id === "gallery");
    const placement = gallery?.enemies.find((enemy) => enemy.id === 4);
    if (!gallery || !placement) {
      throw new Error("Gallery lamplighter missing");
    }
    const game = createGame({
      tuning,
      seed: 29,
      rooms,
      startRoom: "landing"
    });
    game.setInput(emptyInput());
    game.start();
    for (let elapsed = 0; elapsed < 9; elapsed += DT) {
      game.step(DT);
    }
    game.state.transition = {
      to: gallery.id,
      entry: { x: gallery.bounds.x + gallery.bounds.w * 0.5, y: gallery.bounds.y },
      entryFacing: 1
    };
    const hoverLine = placement.y + tuning.lamplighter.hoverHeight;
    const maxTickMovement = tuning.lamplighter.patrolSpeed * DT;

    for (let elapsed = 0; elapsed < 8; elapsed += DT) {
      game.step(DT);
      const lamplighter = game.state.enemies.find((enemy) => enemy.id === placement.id);
      if (!lamplighter) {
        throw new Error("Gallery lamplighter despawned");
      }
      expect(lamplighter.pos.y).toBeGreaterThanOrEqual(hoverLine - tuning.lamplighter.bobAmp);
      expect(lamplighter.pos.y).toBeLessThanOrEqual(hoverLine + tuning.lamplighter.bobAmp);
      expect(Math.abs(lamplighter.pos.x - lamplighter.prev.x)).toBeLessThanOrEqual(
        maxTickMovement + Number.EPSILON * Math.abs(lamplighter.pos.x)
      );
      expect(Math.abs(lamplighter.pos.y - lamplighter.prev.y)).toBeLessThanOrEqual(
        maxTickMovement + Number.EPSILON * Math.abs(lamplighter.pos.y)
      );
      expect(lamplighter.pos.x).toBeGreaterThanOrEqual(placement.patrolMinX);
      expect(lamplighter.pos.x).toBeLessThanOrEqual(placement.patrolMaxX);
    }
  });

  it("hovers above its placement without falling", () => {
    const room = lamplighterRoom();
    const enemies = spawnEnemies(room, tuning);
    const lamplighter = lamplighterOf(enemies);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const player = playerAt(room.bounds.x, room.bounds.y + 1);
    const hoverLine = room.enemies[0]!.y + tuning.lamplighter.hoverHeight;
    let lowest = lamplighter.pos.y;
    let highest = lamplighter.pos.y;
    let t = 0;

    for (let i = 0; i < 600; i += 1) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
      lowest = Math.min(lowest, lamplighter.pos.y);
      highest = Math.max(highest, lamplighter.pos.y);
    }

    expect(lowest).toBeGreaterThanOrEqual(hoverLine - tuning.lamplighter.bobAmp - 1e-9);
    expect(highest).toBeLessThanOrEqual(hoverLine + tuning.lamplighter.bobAmp + 1e-9);
    expect(highest - lowest).toBeGreaterThan(tuning.lamplighter.bobAmp);
  });

  it("drops one ember after telegraphing only while the player is below and in range", () => {
    const room = lamplighterRoom();
    const enemies = spawnEnemies(room, tuning);
    const lamplighter = lamplighterOf(enemies);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const player = playerAt(lamplighter.pos.x - tuning.lamplighter.sightRange, room.bounds.y + 1);
    let t = 0;

    while (lamplighter.state !== "telegraph" && t < 4) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
    }

    expect(lamplighter.state).toBe("telegraph");
    expect(t).toBeGreaterThanOrEqual(tuning.lamplighter.dropIntervalMs / 1000);
    expect(lamplighter.facing).toBe(-1);
    expect(countHazards(hazards)).toBe(0);

    while (countHazards(hazards) === 0 && t < 5) {
      stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
      t += DT;
    }

    const ember = hazards.find((hazard) => hazard.alive);
    expect(ember?.kind).toBe("ember");
    expect(ember?.vel.x).toBeLessThan(0);
    expect(Math.abs(ember?.vel.x ?? 0)).toBeLessThanOrEqual(tuning.lamplighter.emberSideSpeed);
    expect(ember?.vel.y).toBe(-tuning.lamplighter.emberFallSpeed);
    expect(lamplighter.state).toBe("attack");

    stepEnemies(enemies, player, room.solids, hazards, t, DT, tuning);
    t += DT;
    expect(lamplighter.state).toBe("recover");

    const unseenEnemies = spawnEnemies(room, tuning);
    const unseen = lamplighterOf(unseenEnemies);
    const unseenHazards = createHazards(tuning.world.hazardCapacity);
    const distantPlayer = playerAt(room.bounds.x + room.bounds.w, room.bounds.y + 1);
    let unseenTime = 0;
    const duration =
      (tuning.lamplighter.dropIntervalMs + tuning.lamplighter.dropTelegraphMs) / 1000 + DT;

    while (unseenTime < duration) {
      stepEnemies(unseenEnemies, distantPlayer, room.solids, unseenHazards, unseenTime, DT, tuning);
      unseenTime += DT;
    }

    expect(unseen.state).toBe("patrol");
    expect(countHazards(unseenHazards)).toBe(0);

    const aboveEnemies = spawnEnemies(room, tuning);
    const above = lamplighterOf(aboveEnemies);
    const aboveHazards = createHazards(tuning.world.hazardCapacity);
    const abovePlayer = playerAt(above.pos.x, above.pos.y + 1 + tuning.lamplighter.bobAmp);
    let aboveTime = 0;

    while (aboveTime < duration) {
      stepEnemies(aboveEnemies, abovePlayer, room.solids, aboveHazards, aboveTime, DT, tuning);
      aboveTime += DT;
    }

    expect(above.state).toBe("patrol");
    expect(countHazards(aboveHazards)).toBe(0);
  });

  it("falls and damages the courier on contact", () => {
    const room = lamplighterRoom();
    const placement = room.enemies[0]!;
    placement.patrolMinX = placement.x;
    placement.patrolMaxX = placement.x;
    const game = createGame({ tuning, seed: 19, rooms: [room] });
    game.setInput(emptyInput());
    game.start();
    game.state.player.pos.x = placement.x;
    game.state.player.pos.y = room.bounds.y + room.solids[0]!.h;
    const startingHealth = game.state.player.health;
    let spawnY = 0;
    let lowestY = Number.POSITIVE_INFINITY;

    for (let i = 0; i < 300 && game.state.player.health === startingHealth; i += 1) {
      game.step(DT);
      const ember = game.state.hazards.find((hazard) => hazard.alive && hazard.kind === "ember");
      if (ember) {
        if (spawnY === 0) {
          spawnY = ember.pos.y;
        }
        lowestY = Math.min(lowestY, ember.pos.y);
      }
    }

    expect(spawnY).toBeGreaterThan(0);
    expect(lowestY).toBeLessThan(spawnY);
    expect(game.state.player.health).toBe(startingHealth - tuning.lamplighter.damage);
  });

  it("dies when it falls into a solid", () => {
    const room = lamplighterRoom();
    const hazards = createHazards(tuning.world.hazardCapacity);
    const ember = spawnHazard(
      hazards,
      "ember",
      room.bounds.x + room.bounds.w * 0.5,
      room.solids[0]!.y + room.solids[0]!.h + tuning.lamplighter.emberFallSpeed * DT * 0.5,
      tuning.lamplighter.emberWidth,
      tuning.lamplighter.emberHeight,
      0,
      -tuning.lamplighter.emberFallSpeed,
      tuning.lamplighter.emberLifeMs / 1000,
      tuning.lamplighter.damage
    );

    stepHazards(hazards, room.bounds, room.solids, 0, DT);

    expect(ember?.alive).toBe(false);
  });

  it("takes damage from an upward attack without dealing body contact damage", () => {
    const room = lamplighterRoom();
    const game = createGame({ tuning, seed: 23, rooms: [room] });
    game.setInput(emptyInput());
    game.start();
    const lamplighter = lamplighterOf(game.state.enemies);
    const startingPlayerHealth = game.state.player.health;
    const startingEnemyHealth = lamplighter.health;
    const breakableHp = new Map<string, number>();

    game.state.player.pos.x = lamplighter.pos.x;
    game.state.player.pos.y = lamplighter.pos.y;
    resolveCombat(game.state, room, breakableHp, game.state.time, tuning, game.state.events);
    expect(game.state.player.health).toBe(startingPlayerHealth);

    game.state.player.pos.y = lamplighter.pos.y - tuning.player.height - tuning.attack.reach * 0.5;
    game.state.player.attackDir = "up";
    game.state.player.attackPhase = "active";
    resolveCombat(game.state, room, breakableHp, game.state.time, tuning, game.state.events);

    expect(lamplighter.health).toBe(startingEnemyHealth - tuning.attack.damage);
    expect(lamplighter.state).toBe("hurt");
  });
});
