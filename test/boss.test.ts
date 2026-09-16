import { describe, expect, it } from "vitest";
import { bossAttackHitbox, hurtBoss, spawnBoss, stepBoss } from "../src/game/boss";
import { countHazards, createHazards } from "../src/game/hazards";
import type { Boss, BossState, GameEvent, Rect, Room } from "../src/game/types";
import { tuning } from "../src/tuning";
import { DT, countEvents, playerAt } from "./helpers";
import { makeRooms, roomById } from "./fixtures/rooms";

function bossSetup(): { boss: Boss; room: Room; events: GameEvent[] } {
  const rooms = makeRooms();
  const room = roomById(rooms, "vault");
  const boss = spawnBoss(room, tuning);
  if (!boss) {
    throw new Error("no boss arena in fixture");
  }
  return { boss, room, events: [] };
}

describe("bellkeeper", () => {
  it("stays dormant until the player enters the arena", () => {
    const { boss, room, events } = bossSetup();
    const away = playerAt(boss.arenaMinX - 5, 1);
    const hazards = createHazards();
    let t = 0;
    for (let i = 0; i < 120; i += 1) {
      stepBoss(boss, away, room, hazards, t, DT, tuning, events);
      t += DT;
    }
    expect(boss.state).toBe("dormant");
    const near = playerAt(boss.arenaMinX + 1, 1);
    stepBoss(boss, near, room, hazards, t, DT, tuning, events);
    expect(boss.state).toBe("idle");
  });

  it("alternates sweep and stomp out of idle", () => {
    const { boss, room, events } = bossSetup();
    const player = playerAt(boss.pos.x - 4, 1);
    const hazards = createHazards();
    const seen: BossState[] = [];
    let t = 0;
    for (let i = 0; i < 1400; i += 1) {
      stepBoss(boss, player, room, hazards, t, DT, tuning, events);
      const last = seen[seen.length - 1];
      if (last !== boss.state) {
        seen.push(boss.state);
      }
      t += DT;
    }
    const sweepIndex = seen.indexOf("sweepTelegraph");
    const stompIndex = seen.indexOf("stompTelegraph");
    expect(sweepIndex).toBeGreaterThanOrEqual(0);
    expect(stompIndex).toBeGreaterThan(sweepIndex);
    expect(seen.slice(sweepIndex, stompIndex)).toContain("idle");
    expect(countEvents(events, "bossTelegraph")).toBeGreaterThanOrEqual(2);
    expect(countEvents(events, "bossAttack")).toBeGreaterThanOrEqual(2);
    expect(countHazards(hazards)).toBeGreaterThan(0);
  });

  it("swings a hitbox in front of the body only while the sweep is active", () => {
    const { boss, room, events } = bossSetup();
    const player = playerAt(boss.pos.x - 4, 1);
    const hazards = createHazards();
    const out: Rect = { x: 0, y: 0, w: 0, h: 0 };
    let t = 0;
    expect(bossAttackHitbox(boss, tuning, out)).toBeNull();
    for (let i = 0; i < 600 && boss.state !== "sweepActive"; i += 1) {
      stepBoss(boss, player, room, hazards, t, DT, tuning, events);
      t += DT;
    }
    expect(boss.state).toBe("sweepActive");
    const box = bossAttackHitbox(boss, tuning, out);
    expect(box).not.toBeNull();
    if (box) {
      expect(boss.facing).toBe(-1);
      expect(box.x + box.w).toBeCloseTo(boss.pos.x - tuning.boss.width / 2, 6);
      expect(box.w).toBeCloseTo(tuning.boss.sweepReach, 6);
      expect(box.h).toBeCloseTo(tuning.boss.height * tuning.boss.sweepHeightRatio, 6);
    }
  });

  it("cracks once at the phase threshold and switches to phase two", () => {
    const { boss, room, events } = bossSetup();
    const player = playerAt(boss.pos.x - 4, 1);
    const hazards = createHazards();
    let t = 0;
    stepBoss(boss, player, room, hazards, t, DT, tuning, events);
    t += DT;
    const target = Math.ceil(boss.maxHealth * (1 - tuning.boss.phase2At));
    hurtBoss(boss, target, t, tuning, events);
    stepBoss(boss, player, room, hazards, t, DT, tuning, events);
    t += DT;
    expect(boss.state).toBe("crack");
    expect(boss.phase).toBe(2);
    expect(countEvents(events, "bossPhase")).toBe(1);
    for (let i = 0; i < 2000; i += 1) {
      stepBoss(boss, player, room, hazards, t, DT, tuning, events);
      t += DT;
    }
    expect(countEvents(events, "bossPhase")).toBe(1);
  });

  it("chains sweep straight into stomp with no idle in phase two", () => {
    const { boss, room, events } = bossSetup();
    const player = playerAt(boss.pos.x - 4, 1);
    const hazards = createHazards();
    let t = 0;
    stepBoss(boss, player, room, hazards, t, DT, tuning, events);
    t += DT;
    hurtBoss(boss, Math.ceil(boss.maxHealth * (1 - tuning.boss.phase2At)), t, tuning, events);
    for (let i = 0; i < 600; i += 1) {
      stepBoss(boss, player, room, hazards, t, DT, tuning, events);
      t += DT;
      if (boss.phase === 2 && boss.state === "idle") {
        break;
      }
    }
    expect(boss.phase).toBe(2);
    expect(boss.state).toBe("idle");
    const seen: BossState[] = [];
    for (let i = 0; i < 1200; i += 1) {
      stepBoss(boss, player, room, hazards, t, DT, tuning, events);
      const last = seen[seen.length - 1];
      if (last !== boss.state) {
        seen.push(boss.state);
      }
      t += DT;
      if (seen.includes("stompRecover")) {
        break;
      }
    }
    const sweepIndex = seen.indexOf("sweepActive");
    const stompIndex = seen.indexOf("stompTelegraph");
    expect(sweepIndex).toBeGreaterThanOrEqual(0);
    expect(stompIndex).toBeGreaterThan(sweepIndex);
    expect(seen.slice(sweepIndex, stompIndex)).not.toContain("idle");
  });

  it("dies once and emits bossDeath", () => {
    const { boss, events } = bossSetup();
    const died = hurtBoss(boss, boss.maxHealth, 1, tuning, events);
    expect(died).toBe(true);
    expect(boss.alive).toBe(false);
    expect(boss.state).toBe("dead");
    expect(countEvents(events, "bossDeath")).toBe(1);
    expect(hurtBoss(boss, 5, 2, tuning, events)).toBe(false);
    expect(countEvents(events, "bossDeath")).toBe(1);
  });
});
