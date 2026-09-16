import { describe, expect, it } from "vitest";
import { createGame } from "../src/game/index";
import { hurtBoss } from "../src/game/boss";
import type { Enemy, Game, Input } from "../src/game/types";
import { tuning } from "../src/tuning";
import { DT, cloneTuning, countEvents, emptyInput, hasEvent } from "./helpers";
import { makeRooms } from "./fixtures/rooms";

function kindOf(enemies: Enemy[], kind: Enemy["kind"]): Enemy {
  const found = enemies.find((enemy) => enemy.kind === kind);
  if (!found) {
    throw new Error("no " + kind + " in room");
  }
  return found;
}

describe("game lifecycle", () => {
  it("starts from the title on confirm", () => {
    const game = createGame({ tuning, seed: 5, rooms: makeRooms() });
    const idle = emptyInput();
    game.setInput(idle);
    game.step(DT);
    expect(game.state.phase).toBe("title");
    const confirm = emptyInput();
    confirm.confirm = true;
    game.setInput(confirm);
    game.step(DT);
    expect(game.state.phase).toBe("playing");
    expect(hasEvent(game.state.events, "start")).toBe(true);
    expect(game.state.roomId).toBe("hall");
    expect(game.state.player.pos.x).toBeCloseTo(4, 6);
  });

  it("pauses and resumes without advancing time", () => {
    const game = createGame({ tuning, seed: 5, rooms: makeRooms() });
    game.setInput(emptyInput());
    game.start();
    const pause = emptyInput();
    pause.pause = true;
    game.setInput(pause);
    game.step(DT);
    expect(game.state.phase).toBe("paused");
    const frozen = game.state.time;
    game.setInput(emptyInput());
    game.step(DT);
    game.step(DT);
    expect(game.state.time).toBe(frozen);
    game.setInput(pause);
    game.step(DT);
    expect(game.state.phase).toBe("playing");
    expect(countEvents(game.state.events, "pause")).toBe(1);
    expect(countEvents(game.state.events, "resume")).toBe(1);
  });

  it("never clears events inside step", () => {
    const game = createGame({ tuning, seed: 5, rooms: makeRooms() });
    game.setInput(emptyInput());
    game.start();
    const before = game.state.events.length;
    for (let i = 0; i < 30; i += 1) {
      game.step(DT);
    }
    expect(game.state.events.length).toBeGreaterThanOrEqual(before);
  });

  it("ignores damage in god mode", () => {
    const game = createGame({ tuning, seed: 5, rooms: makeRooms(), god: true });
    game.setInput(emptyInput());
    game.start();
    const guard = kindOf(game.state.enemies, "guard");
    game.state.player.pos.x = guard.pos.x;
    game.state.player.pos.y = guard.pos.y;
    for (let i = 0; i < 120; i += 1) {
      game.step(DT);
    }
    expect(game.state.player.health).toBe(tuning.player.maxHealth);
    expect(game.state.phase).toBe("playing");
  });

  it("wins by collecting the dawn core after the boss falls", () => {
    const game = createGame({ tuning, seed: 5, rooms: makeRooms() });
    game.setInput(emptyInput());
    game.start();
    game.state.player.pos.x = 43;
    game.step(DT);
    game.step(DT);
    expect(game.state.roomId).toBe("vault");
    expect(game.state.pickups.length).toBe(0);
    const boss = game.state.boss;
    expect(boss).not.toBeNull();
    if (boss) {
      hurtBoss(boss, boss.maxHealth, game.state.time, tuning, game.state.events);
    }
    game.state.player.pos.x = 3;
    game.step(DT);
    expect(game.state.progress.bossDefeated).toBe(true);
    expect(game.state.pickups.length).toBe(1);
    game.state.player.pos.x = 22;
    game.state.player.pos.y = 1;
    for (let i = 0; i < 10 && game.state.phase === "playing"; i += 1) {
      game.step(DT);
    }
    expect(game.state.phase).toBe("victory");
    expect(hasEvent(game.state.events, "victory")).toBe(true);
  });
});

describe("full loop", () => {
  it("walks to an enemy, kills it, takes hits, dies and respawns at the checkpoint", () => {
    const tuned = cloneTuning();
    tuned.player.maxHealth = 4;
    tuned.guard.health = 1;
    const game = createGame({ tuning: tuned, seed: 9, rooms: makeRooms() });
    const input = emptyInput();
    game.setInput(input);
    game.start();
    expect(game.state.phase).toBe("playing");
    expect(game.state.player.health).toBe(tuned.player.maxHealth);

    const guard = kindOf(game.state.enemies, "guard");
    let killed = false;
    for (let i = 0; i < 1200; i += 1) {
      const dx = guard.pos.x - game.state.player.pos.x;
      input.moveX = Math.abs(dx) > 2 ? Math.sign(dx) : 0;
      input.attack = Math.abs(dx) < 2.4 && game.state.player.attackPhase === "none";
      game.setInput(input);
      game.step(DT);
      if (!guard.alive) {
        killed = true;
        break;
      }
    }
    expect(killed).toBe(true);
    expect(hasEvent(game.state.events, "enemyDeath")).toBe(true);
    expect(hasEvent(game.state.events, "attackHit")).toBe(true);

    const stomper = kindOf(game.state.enemies, "stomper");
    input.attack = false;
    let died = false;
    for (let i = 0; i < 3000; i += 1) {
      const dx = stomper.pos.x - game.state.player.pos.x;
      input.moveX = Math.sign(dx);
      game.setInput(input);
      game.step(DT);
      if (game.state.phase === "dead") {
        died = true;
        break;
      }
    }
    expect(died).toBe(true);
    expect(hasEvent(game.state.events, "hurt")).toBe(true);
    expect(hasEvent(game.state.events, "death")).toBe(true);

    input.moveX = 0;
    game.setInput(input);
    for (let i = 0; i < 600 && game.state.phase === "dead"; i += 1) {
      game.step(DT);
    }
    expect(game.state.phase).toBe("playing");
    expect(game.state.progress.deaths).toBe(1);
    expect(game.state.roomId).toBe(game.state.progress.checkpointRoom);
    expect(game.state.player.pos.x).toBeCloseTo(game.state.progress.checkpoint.x, 6);
    expect(game.state.player.pos.y).toBeCloseTo(game.state.progress.checkpoint.y, 6);
    expect(game.state.player.health).toBe(tuned.player.maxHealth);
    const fresh = kindOf(game.state.enemies, "guard");
    expect(fresh.alive).toBe(true);
    expect(fresh.health).toBe(tuned.guard.health);
  });
});

describe("determinism", () => {
  function script(tick: number, input: Input): void {
    input.moveX = tick % 180 < 110 ? 1 : -1;
    input.moveY = tick % 97 < 20 ? 1 : 0;
    input.jump = tick % 37 === 0;
    input.jumpHeld = tick % 37 < 12;
    input.attack = tick % 23 === 0;
    input.dash = tick % 53 === 0;
    input.pause = false;
    input.confirm = false;
  }

  function play(): string {
    const game = createGame({ tuning, seed: 1234, rooms: makeRooms() });
    const input = emptyInput();
    game.setInput(input);
    game.start();
    for (let i = 0; i < 600; i += 1) {
      script(game.state.tick, input);
      game.setInput(input);
      game.step(DT);
    }
    return snapshot(game);
  }

  function snapshot(game: Game): string {
    const s = game.state;
    return JSON.stringify({
      phase: s.phase,
      tick: s.tick,
      time: s.time,
      roomId: s.roomId,
      player: {
        pos: s.player.pos,
        vel: s.player.vel,
        facing: s.player.facing,
        health: s.player.health,
        attackPhase: s.player.attackPhase,
        longwick: s.player.longwick
      },
      enemies: s.enemies.map((e) => ({
        id: e.id,
        pos: e.pos,
        vel: e.vel,
        health: e.health,
        state: e.state,
        alive: e.alive
      })),
      boss: s.boss ? { pos: s.boss.pos, state: s.boss.state, health: s.boss.health, phase: s.boss.phase } : null,
      hazards: s.hazards.filter((h) => h.alive).map((h) => ({ pos: h.pos, vel: h.vel })),
      progress: s.progress,
      events: s.events.length
    });
  }

  it("produces identical state from the same seed and scripted inputs", () => {
    const a = play();
    const b = play();
    expect(a).toBe(b);
  });
});
