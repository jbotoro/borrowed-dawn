import { describe, expect, it } from "vitest";
import { hurtEnemy, spawnEnemies, stepEnemies } from "../src/game/enemies";
import { countHazards, createHazards } from "../src/game/hazards";
import { activeSolids } from "../src/game/rooms";
import { createProgress } from "../src/game/progress";
import type { Enemy, GameEvent, Hazard, Rect } from "../src/game/types";
import { findRoom } from "../src/content/rooms";
import { tuning } from "../src/tuning";
import { DT, countEvents, playerAt } from "./helpers";
import { makeRooms, roomById } from "./fixtures/rooms";

function setup(): {
  enemies: Enemy[];
  solids: Rect[];
  hazards: Hazard[];
  events: GameEvent[];
} {
  const rooms = makeRooms();
  const hall = roomById(rooms, "hall");
  const progress = createProgress("hall", { x: 4, y: 1 });
  const solids: Rect[] = [];
  activeSolids(hall, progress, solids);
  return {
    enemies: spawnEnemies(hall, tuning),
    solids,
    hazards: createHazards(tuning.world.hazardCapacity),
    events: []
  };
}

function guardOf(enemies: Enemy[]): Enemy {
  const found = enemies.find((e) => e.kind === "guard");
  if (!found) {
    throw new Error("no guard");
  }
  return found;
}

function stomperOf(enemies: Enemy[]): Enemy {
  const found = enemies.find((e) => e.kind === "stomper");
  if (!found) {
    throw new Error("no stomper");
  }
  return found;
}

describe("guard", () => {
  it("stays within its Gallery patrol range while lunging at the neighbouring platform", () => {
    const gallery = findRoom("gallery");
    if (!gallery) {
      throw new Error("no Gallery room");
    }
    const progress = createProgress(gallery.id, { x: 20.8, y: 3.6 });
    const solids: Rect[] = [];
    activeSolids(gallery, progress, solids);
    const enemies = spawnEnemies(gallery, tuning);
    const guard = guardOf(enemies);
    const player = playerAt(20.8, 3.6);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const statesSeen = new Set<Enemy["state"]>();
    const placementY = guard.pos.y;
    let t = 0;

    for (let i = 0; i < 8 / DT; i += 1) {
      player.pos.x = 20.8;
      player.pos.y = 3.6;
      player.prev.x = player.pos.x;
      player.prev.y = player.pos.y;
      player.vel.y = 0;
      stepEnemies(enemies, player, solids, hazards, t, DT, tuning);
      statesSeen.add(guard.state);
      expect(guard.pos.y).toBeGreaterThanOrEqual(placementY - 0.1);
      expect(guard.pos.x).toBeGreaterThanOrEqual(guard.patrolMinX);
      expect(guard.pos.x).toBeLessThanOrEqual(guard.patrolMaxX);
      t += DT;
    }

    expect(statesSeen.has("telegraph")).toBe(true);
    expect(statesSeen.has("attack")).toBe(true);
  });

  it("patrols between its bounds and turns at the ends", () => {
    const s = setup();
    const guard = guardOf(s.enemies);
    const player = playerAt(-40, 1);
    let t = 0;
    let turnedUp = false;
    let turnedDown = false;
    for (let i = 0; i < 1200; i += 1) {
      stepEnemies(s.enemies, player, s.solids, s.hazards, t, DT, tuning);
      t += DT;
      expect(guard.pos.x).toBeGreaterThan(guard.patrolMinX - 1);
      expect(guard.pos.x).toBeLessThan(guard.patrolMaxX + 1);
      if (guard.facing === 1) {
        turnedUp = true;
      } else {
        turnedDown = true;
      }
    }
    expect(turnedUp).toBe(true);
    expect(turnedDown).toBe(true);
  });

  it("telegraphs then lunges when the player comes into sight", () => {
    const s = setup();
    const guard = guardOf(s.enemies);
    const player = playerAt(guard.pos.x - tuning.guard.sightRange + 1, 1);
    let t = 0;
    stepEnemies(s.enemies, player, s.solids, s.hazards, t, DT, tuning);
    t += DT;
    expect(guard.state).toBe("telegraph");
    expect(guard.facing).toBe(-1);
    const telegraphStart = 0;
    let attackAt = -1;
    for (let i = 0; i < 200 && attackAt < 0; i += 1) {
      stepEnemies(s.enemies, player, s.solids, s.hazards, t, DT, tuning);
      if (guard.state === "attack") {
        attackAt = t;
      }
      t += DT;
    }
    expect(attackAt).toBeGreaterThanOrEqual(telegraphStart + tuning.guard.telegraphMs / 1000 - 1e-9);
    expect(attackAt).toBeLessThan(telegraphStart + tuning.guard.telegraphMs / 1000 + 2 * DT);
    const before = guard.pos.x;
    for (let i = 0; i < 6; i += 1) {
      stepEnemies(s.enemies, player, s.solids, s.hazards, t, DT, tuning);
      t += DT;
    }
    expect(guard.pos.x).toBeLessThan(before);
    let recovered = false;
    for (let i = 0; i < 400 && !recovered; i += 1) {
      stepEnemies(s.enemies, player, s.solids, s.hazards, t, DT, tuning);
      t += DT;
      if (guard.state === "recover") {
        recovered = true;
      }
    }
    expect(recovered).toBe(true);
  });
});

describe("stomper", () => {
  it("hops toward the player and spawns two ground waves on landing", () => {
    const s = setup();
    const stomper = stomperOf(s.enemies);
    const player = playerAt(stomper.pos.x - 3, 1);
    let t = 0;
    let hopped = false;
    for (let i = 0; i < 400; i += 1) {
      stepEnemies(s.enemies, player, s.solids, s.hazards, t, DT, tuning);
      t += DT;
      if (stomper.state === "attack") {
        hopped = true;
      }
      if (hopped && countHazards(s.hazards) >= 2) {
        break;
      }
    }
    expect(hopped).toBe(true);
    expect(stomper.facing).toBe(-1);
    const live = s.hazards.filter((h) => h.alive);
    expect(live.length).toBe(2);
    expect(live.every((hazard) => hazard.kind === "wave")).toBe(true);
    const dirs = live.map((h) => Math.sign(h.vel.x)).sort();
    expect(dirs).toEqual([-1, 1]);
    expect(live[0]?.damage).toBe(tuning.stomper.damage);
  });
});

describe("hurtEnemy", () => {
  it("flashes, knocks back and emits enemyHurt", () => {
    const s = setup();
    const guard = guardOf(s.enemies);
    const before = guard.health;
    const died = hurtEnemy(guard, 1, guard.pos.x + 1, 0, tuning, s.events);
    expect(died).toBe(false);
    expect(guard.health).toBe(before - 1);
    expect(guard.flash).toBe(1);
    expect(guard.state).toBe("hurt");
    expect(guard.vel.x).toBeCloseTo(-tuning.attack.knockback, 6);
    expect(countEvents(s.events, "enemyHurt")).toBe(1);
  });

  it("kills at zero health and emits enemyDeath", () => {
    const s = setup();
    const guard = guardOf(s.enemies);
    const died = hurtEnemy(guard, guard.health, guard.pos.x - 1, 0, tuning, s.events);
    expect(died).toBe(true);
    expect(guard.alive).toBe(false);
    expect(guard.state).toBe("dead");
    expect(countEvents(s.events, "enemyDeath")).toBe(1);
    expect(hurtEnemy(guard, 1, 0, 0, tuning, s.events)).toBe(false);
    expect(countEvents(s.events, "enemyDeath")).toBe(1);
  });
});
