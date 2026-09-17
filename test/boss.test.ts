import { describe, expect, it } from "vitest";
import { createGame } from "../src/game";
import { bossAttackHitbox, hurtBoss, spawnBoss, stepBoss } from "../src/game/boss";
import { countHazards, createHazards } from "../src/game/hazards";
import { createRng, type Rng } from "../src/game/rng";
import type { Boss, BossState, GameEvent, Rect, Room } from "../src/game/types";
import { tuning } from "../src/tuning";
import { DT, countEvents, playerAt } from "./helpers";
import { makeRooms, roomById } from "./fixtures/rooms";

type BossAttack = Boss["nextAttack"];

function bossSetup(seed = 42): { boss: Boss; room: Room; events: GameEvent[]; rng: Rng } {
  const rooms = makeRooms();
  const room = roomById(rooms, "vault");
  const boss = spawnBoss(room, tuning);
  if (!boss) {
    throw new Error("no boss arena in fixture");
  }
  return { boss, room, events: [], rng: createRng(seed) };
}

describe("bellkeeper", () => {
  it("stays dormant until the player enters the arena", () => {
    const { boss, room, events, rng } = bossSetup();
    const away = playerAt(boss.arenaMinX - 5, 1);
    const hazards = createHazards(tuning.world.hazardCapacity);
    let t = 0;
    for (let i = 0; i < 120; i += 1) {
      stepBoss(boss, away, room, hazards, t, DT, tuning, rng, events);
      t += DT;
    }
    expect(boss.state).toBe("dormant");
    const near = playerAt(boss.arenaMinX + 1, 1);
    stepBoss(boss, near, room, hazards, t, DT, tuning, rng, events);
    expect(boss.state).toBe("idle");
  });

  it("chooses varied attacks without performing the same attack three times", () => {
    const { boss, room, events, rng } = bossSetup(7);
    const player = playerAt(boss.pos.x - 4, 1);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const attacks: BossAttack[] = [];
    let t = 0;
    for (let i = 0; i < 12000; i += 1) {
      if (i === 6000) {
        hurtBoss(
          boss,
          Math.ceil(boss.maxHealth * (1 - tuning.boss.phase2At)),
          t,
          tuning,
          events
        );
      }
      const previousState = boss.state;
      stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
      if (boss.state !== previousState && boss.state === "sweepTelegraph") {
        attacks.push("sweep");
      }
      if (boss.state !== previousState && boss.state === "stompTelegraph") {
        attacks.push("stomp");
      }
      t += DT;
    }
    expect(attacks[0]).toBe("sweep");
    expect(attacks.some((attack, index) => index > 0 && attack === attacks[index - 1])).toBe(true);
    expect(
      attacks.some(
        (attack, index) =>
          index > 1 && attack === attacks[index - 1] && attack === attacks[index - 2]
      )
    ).toBe(false);
    expect(countEvents(events, "bossTelegraph")).toBeGreaterThanOrEqual(2);
    expect(countEvents(events, "bossAttack")).toBeGreaterThanOrEqual(2);
    expect(countHazards(hazards)).toBeGreaterThan(0);
  });

  it("keeps phase one and phase two telegraphs within their scaled duration ranges", () => {
    function collectTelegraphs(phase: 1 | 2): { attack: BossAttack; durationMs: number }[] {
      const { boss, room, events, rng } = bossSetup(20);
      const player = playerAt(boss.pos.x - 4, 1);
      const hazards = createHazards(tuning.world.hazardCapacity);
      const observed: { attack: BossAttack; durationMs: number }[] = [];
      let t = 0;
      stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
      t += DT;
      if (phase === 2) {
        hurtBoss(boss, Math.ceil(boss.maxHealth * (1 - tuning.boss.phase2At)), t, tuning, events);
      }
      for (let i = 0; i < 12000 && observed.length < 20; i += 1) {
        const previousState = boss.state;
        stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
        if (
          boss.state !== previousState &&
          (boss.state === "sweepTelegraph" || boss.state === "stompTelegraph")
        ) {
          observed.push({
            attack: boss.state === "sweepTelegraph" ? "sweep" : "stomp",
            durationMs: (boss.stateUntil - boss.stateStart) * 1000
          });
        }
        t += DT;
      }
      return observed;
    }

    const phaseOne = collectTelegraphs(1);
    const phaseTwo = collectTelegraphs(2);
    expect(phaseOne.length).toBe(20);
    expect(phaseTwo.length).toBe(20);
    expect(phaseTwo[0]?.durationMs).toBeCloseTo(
      (phaseOne[0]?.durationMs ?? 0) * tuning.boss.phase2TelegraphScale,
      8
    );

    for (const { attack, durationMs } of phaseOne) {
      const base = attack === "sweep" ? tuning.boss.sweepTelegraphMs : tuning.boss.stompTelegraphMs;
      expect(durationMs).toBeGreaterThanOrEqual(base * tuning.boss.telegraphScaleMin - 1e-8);
      expect(durationMs).toBeLessThanOrEqual(base * tuning.boss.telegraphScaleMax + 1e-8);
    }
    for (const { attack, durationMs } of phaseTwo) {
      const base = attack === "sweep" ? tuning.boss.sweepTelegraphMs : tuning.boss.stompTelegraphMs;
      expect(durationMs).toBeGreaterThanOrEqual(
        base * tuning.boss.telegraphScaleMin * tuning.boss.phase2TelegraphScale - 1e-8
      );
      expect(durationMs).toBeLessThanOrEqual(
        base * tuning.boss.telegraphScaleMax * tuning.boss.phase2TelegraphScale + 1e-8
      );
    }
  });

  it("produces identical attack sequences for games with the same seed", () => {
    function attackSequence(seed: number): BossAttack[] {
      const rooms = makeRooms();
      const room = roomById(rooms, "vault");
      const game = createGame({
        tuning,
        seed,
        rooms,
        startRoom: room.id,
        startPos: { x: 16, y: 1 },
        god: true
      });
      const attacks: BossAttack[] = [];
      game.start();
      for (let i = 0; i < 12000 && attacks.length < 30; i += 1) {
        const previousState = game.state.boss?.state;
        game.step(DT);
        const boss = game.state.boss;
        if (boss?.state !== previousState && boss?.state === "sweepTelegraph") {
          attacks.push("sweep");
        }
        if (boss?.state !== previousState && boss?.state === "stompTelegraph") {
          attacks.push("stomp");
        }
      }
      return attacks;
    }

    const first = attackSequence(1234);
    const second = attackSequence(1234);
    expect(first.length).toBe(30);
    expect(second).toEqual(first);
  });

  it("swings a hitbox in front of the body only while the sweep is active", () => {
    const { boss, room, events, rng } = bossSetup();
    const player = playerAt(boss.pos.x - 4, 1);
    const hazards = createHazards(tuning.world.hazardCapacity);
    const out: Rect = { x: 0, y: 0, w: 0, h: 0 };
    let t = 0;
    expect(bossAttackHitbox(boss, tuning, out)).toBeNull();
    for (let i = 0; i < 600 && boss.state !== "sweepActive"; i += 1) {
      stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
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
    const { boss, room, events, rng } = bossSetup();
    const player = playerAt(boss.pos.x - 4, 1);
    const hazards = createHazards(tuning.world.hazardCapacity);
    let t = 0;
    stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
    t += DT;
    const target = Math.ceil(boss.maxHealth * (1 - tuning.boss.phase2At));
    hurtBoss(boss, target, t, tuning, events);
    stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
    t += DT;
    expect(boss.state).toBe("crack");
    expect(boss.phase).toBe(2);
    expect(countEvents(events, "bossPhase")).toBe(1);
    for (let i = 0; i < 2000; i += 1) {
      stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
      t += DT;
    }
    expect(countEvents(events, "bossPhase")).toBe(1);
  });

  it("chains sweep straight into stomp with no idle in phase two", () => {
    const { boss, room, events, rng } = bossSetup();
    const player = playerAt(boss.pos.x - 4, 1);
    const hazards = createHazards(tuning.world.hazardCapacity);
    let t = 0;
    stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
    t += DT;
    hurtBoss(boss, Math.ceil(boss.maxHealth * (1 - tuning.boss.phase2At)), t, tuning, events);
    for (let i = 0; i < 600; i += 1) {
      stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
      t += DT;
      if (boss.phase === 2 && boss.state === "idle") {
        break;
      }
    }
    expect(boss.phase).toBe(2);
    expect(boss.state).toBe("idle");
    const seen: BossState[] = [];
    for (let i = 0; i < 1200; i += 1) {
      stepBoss(boss, player, room, hazards, t, DT, tuning, rng, events);
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
