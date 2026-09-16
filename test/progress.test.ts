import { describe, expect, it } from "vitest";
import { createGame } from "../src/game/index";
import { hurtBoss } from "../src/game/boss";
import { createProgress } from "../src/game/progress";
import type { Game } from "../src/game/types";
import { tuning } from "../src/tuning";
import { DT, countEvents, emptyInput } from "./helpers";
import { makeRooms } from "./fixtures/rooms";

function newGame(): Game {
  const game = createGame({ tuning, seed: 11, rooms: makeRooms() });
  game.setInput(emptyInput());
  game.start();
  return game;
}

function stepN(game: Game, n: number): void {
  for (let i = 0; i < n; i += 1) {
    game.step(DT);
  }
}

function killPlayerAndRespawn(game: Game, awayX: number): void {
  game.state.player.pos.x = awayX;
  game.state.player.health = 0;
  game.step(DT);
  expect(game.state.phase).toBe("dead");
  for (let i = 0; i < 600 && game.state.phase === "dead"; i += 1) {
    game.step(DT);
  }
  expect(game.state.phase).toBe("playing");
}

describe("progress", () => {
  it("seeds the checkpoint from the start position", () => {
    const progress = createProgress("hall", { x: 4, y: 1 });
    expect(progress.checkpointRoom).toBe("hall");
    expect(progress.checkpoint).toEqual({ x: 4, y: 1 });
    expect(progress.deaths).toBe(0);
    expect(progress.bossDefeated).toBe(false);
  });

  it("waits the tuned delay before respawning and counts the death", () => {
    const game = newGame();
    game.state.player.pos.x = 20;
    game.state.player.health = 0;
    game.step(DT);
    expect(game.state.phase).toBe("dead");
    const deathAt = game.state.deathAt;
    let steps = 0;
    while (game.state.phase === "dead" && steps < 600) {
      game.step(DT);
      steps += 1;
    }
    expect(game.state.phase).toBe("playing");
    expect(game.state.time - deathAt).toBeGreaterThanOrEqual(tuning.feel.deathDelayMs / 1000 - 1e-9);
    expect(game.state.progress.deaths).toBe(1);
    expect(countEvents(game.state.events, "respawn")).toBe(1);
  });

  it("respawns immediately on confirm", () => {
    const game = newGame();
    game.state.player.pos.x = 20;
    game.state.player.health = 0;
    game.step(DT);
    expect(game.state.phase).toBe("dead");
    const confirm = emptyInput();
    confirm.confirm = true;
    game.setInput(confirm);
    game.step(DT);
    expect(game.state.phase).toBe("playing");
    expect(game.state.time - game.state.deathAt).toBeLessThan(tuning.feel.deathDelayMs / 1000);
  });

  it("keeps collected, opened and broken through death and resets enemies and health", () => {
    const game = newGame();
    game.state.player.pos.x = 9;
    game.state.player.pos.y = 1;
    stepN(game, 12);
    expect(game.state.progress.collected).toContain("wick");
    game.state.player.pos.x = 43;
    stepN(game, 2);
    expect(game.state.roomId).toBe("vault");
    expect(game.state.progress.opened).toContain("shortcut");
    game.state.progress.broken.push("rubble");

    const enemy = game.state.enemies[0];
    expect(enemy).toBeDefined();
    if (enemy) {
      enemy.health = 1;
      enemy.pos.x = enemy.pos.x + 3;
    }
    const boss = game.state.boss;
    expect(boss).not.toBeNull();
    if (boss) {
      hurtBoss(boss, 4, game.state.time, tuning, game.state.events);
      expect(boss.health).toBeLessThan(boss.maxHealth);
    }

    killPlayerAndRespawn(game, 20);

    expect(game.state.roomId).toBe("vault");
    expect(game.state.progress.collected).toContain("wick");
    expect(game.state.progress.opened).toContain("shortcut");
    expect(game.state.progress.broken).toContain("rubble");
    expect(game.state.progress.bossDefeated).toBe(false);
    expect(game.state.player.longwick).toBe(true);
    expect(game.state.player.health).toBe(tuning.player.maxHealth);
    expect(game.state.enemies.length).toBe(1);
    expect(game.state.enemies[0]?.health).toBe(tuning.guard.health);
    expect(game.state.boss?.state).toBe("dormant");
    expect(game.state.boss?.health).toBe(tuning.boss.health);
  });

  it("keeps a defeated boss defeated after death", () => {
    const game = newGame();
    game.state.player.pos.x = 43;
    stepN(game, 2);
    expect(game.state.roomId).toBe("vault");
    const boss = game.state.boss;
    expect(boss).not.toBeNull();
    if (boss) {
      hurtBoss(boss, boss.maxHealth, game.state.time, tuning, game.state.events);
    }
    game.state.player.pos.x = 3;
    game.step(DT);
    expect(game.state.progress.bossDefeated).toBe(true);

    killPlayerAndRespawn(game, 20);

    expect(game.state.roomId).toBe("vault");
    expect(game.state.progress.bossDefeated).toBe(true);
    expect(game.state.boss).toBeNull();
    expect(game.state.enemies.length).toBe(0);
  });
});
