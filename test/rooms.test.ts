import { describe, expect, it } from "vitest";
import { createGame } from "../src/game/index";
import { activeSolids, findRoom } from "../src/game/rooms";
import { createProgress } from "../src/game/progress";
import { createMoveResult, moveAndCollide } from "../src/game/physics";
import type { Game, Rect } from "../src/game/types";
import { tuning } from "../src/tuning";
import { DT, countEvents, emptyInput } from "./helpers";
import { makeRooms, roomById } from "./fixtures/rooms";

function newGame(): Game {
  const game = createGame({ tuning, seed: 7, rooms: makeRooms() });
  game.setInput(emptyInput());
  game.start();
  return game;
}

function stepN(game: Game, n: number): void {
  for (let i = 0; i < n; i += 1) {
    game.step(DT);
  }
}

describe("rooms", () => {
  it("finds rooms by id", () => {
    const rooms = makeRooms();
    expect(findRoom(rooms, "vault")?.id).toBe("vault");
    expect(findRoom(rooms, "nowhere")).toBeUndefined();
  });

  it("moves the player to the entry point and respawns enemies through a door", () => {
    const game = newGame();
    expect(game.state.roomId).toBe("hall");
    expect(game.state.enemies.length).toBe(roomById(makeRooms(), "hall").enemies.length);
    game.state.player.pos.x = 43;
    game.state.player.pos.y = 1;
    stepN(game, 2);
    expect(game.state.roomId).toBe("vault");
    expect(game.state.player.pos.x).toBeCloseTo(3, 6);
    expect(game.state.player.pos.y).toBeCloseTo(1, 6);
    expect(game.state.player.facing).toBe(1);
    expect(game.state.enemies.length).toBe(1);
    expect(game.state.enemies[0]?.health).toBe(tuning.guard.health);
    expect(game.state.boss).not.toBeNull();

    game.state.player.pos.x = 1;
    stepN(game, 2);
    expect(game.state.roomId).toBe("hall");
    expect(game.state.player.pos.x).toBeCloseTo(39, 6);
    expect(game.state.enemies.length).toBe(2);
    for (const enemy of game.state.enemies) {
      expect(enemy.alive).toBe(true);
    }
  });

  it("opens a bossApproach gate in every room that carries it", () => {
    const game = newGame();
    expect(game.state.progress.opened).not.toContain("shortcut");
    game.state.events.length = 0;
    game.state.player.pos.x = 43;
    stepN(game, 2);
    expect(game.state.roomId).toBe("vault");
    expect(game.state.progress.opened).toContain("shortcut");
    expect(countEvents(game.state.events, "gateOpen")).toBe(2);
    game.state.events.length = 0;
    game.state.player.pos.x = 1;
    stepN(game, 2);
    expect(countEvents(game.state.events, "gateOpen")).toBe(0);
  });

  it("keeps a closed gate solid and drops it once opened", () => {
    const rooms = makeRooms();
    const hall = roomById(rooms, "hall");
    const progress = createProgress("hall", { x: 4, y: 1 });
    const solids: Rect[] = [];
    activeSolids(hall, progress, solids);
    expect(solids.length).toBe(hall.solids.length + 1);
    progress.opened.push("shortcut");
    activeSolids(hall, progress, solids);
    expect(solids.length).toBe(hall.solids.length);
  });

  it("blocks movement with a breakable until it is broken", () => {
    const rooms = makeRooms();
    const cell = roomById(rooms, "cell");
    const progress = createProgress("cell", { x: 3, y: 1 });
    const solids: Rect[] = [];
    activeSolids(cell, progress, solids);
    const out = createMoveResult();
    const pos = { x: 8, y: 1 };
    const vel = { x: tuning.player.walkSpeed, y: 0 };
    for (let i = 0; i < 120; i += 1) {
      vel.x = tuning.player.walkSpeed;
      moveAndCollide(pos, vel, tuning.player.width, tuning.player.height, solids, DT, out);
    }
    const blocked = cell.breakables[0];
    expect(blocked).toBeDefined();
    if (!blocked) {
      return;
    }
    expect(pos.x).toBeCloseTo(blocked.rect.x - tuning.player.width / 2, 6);

    progress.broken.push(blocked.id);
    activeSolids(cell, progress, solids);
    for (let i = 0; i < 120; i += 1) {
      vel.x = tuning.player.walkSpeed;
      moveAndCollide(pos, vel, tuning.player.width, tuning.player.height, solids, DT, out);
    }
    expect(pos.x).toBeGreaterThan(blocked.rect.x + blocked.rect.w);
  });

  it("breaks a breakable with attacks and records it in progress", () => {
    const rooms = makeRooms();
    const game = createGame({ tuning, seed: 3, rooms, startRoom: "cell" });
    game.setInput(emptyInput());
    game.start();
    const cell = roomById(rooms, "cell");
    const target = cell.breakables[0];
    expect(target).toBeDefined();
    if (!target) {
      return;
    }
    game.state.player.pos.x = target.rect.x - tuning.player.width / 2 - 0.05;
    game.state.player.pos.y = 1;
    const swing = emptyInput();
    swing.attack = true;
    for (let i = 0; i < 400; i += 1) {
      swing.attack = game.state.player.attackPhase === "none";
      game.setInput(swing);
      game.step(DT);
      if (game.state.progress.broken.includes(target.id)) {
        break;
      }
    }
    expect(game.state.progress.broken).toContain(target.id);
    expect(countEvents(game.state.events, "breakableBroken")).toBe(1);
  });

  it("collects a pickup once and equips longwick", () => {
    const game = newGame();
    expect(game.state.player.longwick).toBe(false);
    game.state.player.pos.x = 9;
    game.state.player.pos.y = 1;
    game.state.events.length = 0;
    stepN(game, 12);
    expect(game.state.player.longwick).toBe(true);
    expect(game.state.progress.collected).toContain("wick");
    expect(countEvents(game.state.events, "pickup")).toBe(1);
  });

  it("raises maximum health with an ember flask and keeps the bonus on respawn", () => {
    const rooms = makeRooms();
    const hall = roomById(rooms, "hall");
    hall.pickups.push({ id: "flask", kind: "emberFlask", x: 12, y: 1.6 });
    const game = createGame({ tuning, seed: 29, rooms });
    game.setInput(emptyInput());
    game.start();
    game.state.player.health = 1;
    game.state.player.pos.x = 12;
    game.state.player.pos.y = 1;

    stepN(game, 2);

    const increasedMaximum = tuning.player.maxHealth + tuning.world.flaskHealthBonus;
    expect(game.state.progress.maxHealthBonus).toBe(tuning.world.flaskHealthBonus);
    expect(game.state.player.health).toBe(increasedMaximum);

    game.state.player.health = 0;
    game.respawn();

    expect(game.state.progress.maxHealthBonus).toBe(tuning.world.flaskHealthBonus);
    expect(game.state.player.health).toBe(increasedMaximum);
  });

  it("restores health at a checkpoint and emits once per visit", () => {
    const game = newGame();
    game.state.events.length = 0;
    game.state.player.pos.x = 20;
    stepN(game, 2);
    game.state.player.health = 1;
    game.state.player.pos.x = 4;
    game.state.player.pos.y = 1;
    stepN(game, 6);
    expect(game.state.player.health).toBe(tuning.player.maxHealth);
    expect(countEvents(game.state.events, "checkpoint")).toBe(1);
    expect(game.state.progress.checkpointRoom).toBe("hall");
  });
});
