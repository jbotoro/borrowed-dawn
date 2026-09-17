import { resolveCombat } from "./combat";
import { spawnEnemies, stepEnemies } from "./enemies";
import { clearHazards, createHazards, stepHazards } from "./hazards";
import { createPlayer, placePlayer, resetPlayer, stepPlayer } from "./player";
import { createProgress, deathDelayElapsed, onDeath } from "./progress";
import { createRng } from "./rng";
import {
  activeSolids,
  checkDoors,
  collectPickups,
  findRoom,
  openGates,
  pickupsFor,
  touchCheckpoint
} from "./rooms";
import { spawnBoss, stepBoss } from "./boss";
import type { Facing, Game, GameDeps, GameState, Input, Rect, Room, Vec2 } from "./types";

export type * from "./types";
export { createFixedLoop } from "./loop";
export type { FixedLoop } from "./loop";
export { createRng } from "./rng";
export type { Rng } from "./rng";
export { activeSolids, findRoom, checkpointRect, pickupRect } from "./rooms";
export { attackHitbox, attackRect, applyHurt, createPlayer, playerReach } from "./player";
export { aabbOf, moveAndCollide, rectsOverlap, createMoveResult } from "./physics";
export { enemyConfig, hurtEnemy, spawnEnemies, stepEnemies } from "./enemies";
export { bossAttackHitbox, bossBodyIsHazard, bossBodyRect, hurtBoss, spawnBoss, stepBoss } from "./boss";
export { createHazards, spawnHazard, stepHazards } from "./hazards";
export { createProgress } from "./progress";

const emptyRoom: Room = {
  id: "",
  name: "",
  bounds: { x: 0, y: 0, w: 0, h: 0 },
  solids: [],
  doors: [],
  enemies: [],
  pickups: [],
  gates: [],
  breakables: [],
  decor: [],
  waypoints: []
};

function defaultStartPos(room: Room): Vec2 {
  if (room.checkpoint) {
    return { x: room.checkpoint.x, y: room.checkpoint.y };
  }
  const first = room.waypoints[0];
  if (first) {
    return { x: first.x, y: first.y };
  }
  return { x: room.bounds.x + room.bounds.w * 0.5, y: room.bounds.y };
}

export function createGame(deps: GameDeps): Game {
  const tuning = deps.tuning;
  const rng = createRng(deps.seed);
  const rooms = deps.rooms;
  const firstRoom = rooms[0] ?? emptyRoom;
  const startRoomId = deps.startRoom ?? firstRoom.id;
  const startRoom = findRoom(rooms, startRoomId) ?? firstRoom;
  const startPos: Vec2 = deps.startPos
    ? { x: deps.startPos.x, y: deps.startPos.y }
    : defaultStartPos(startRoom);

  const player = createPlayer();
  const hazards = createHazards(tuning.world.hazardCapacity);
  const solids: Rect[] = [];
  const breakableHp = new Map<string, number>();
  let room: Room = startRoom;
  let touchingCheckpoint = false;

  const input: Input = {
    moveX: 0,
    moveY: 0,
    jump: false,
    jumpHeld: false,
    attack: false,
    dash: false,
    pause: false,
    confirm: false
  };

  const state: GameState = {
    phase: "title",
    time: 0,
    tick: 0,
    seed: deps.seed,
    roomId: startRoom.id,
    player,
    enemies: [],
    boss: null,
    hazards,
    pickups: [],
    progress: createProgress(startRoom.id, startPos),
    events: [],
    transition: null,
    deathAt: 0,
    victoryAt: 0,
    god: deps.god ?? false
  };

  function enterRoom(id: string, pos: Vec2, facing: Facing, heal: boolean): void {
    const next = findRoom(rooms, id);
    if (next) {
      room = next;
    }
    state.roomId = room.id;
    placePlayer(player, pos, facing);
    if (heal) {
      player.health = tuning.player.maxHealth + state.progress.maxHealthBonus;
    }
    const bossRoom = room.bossArena !== undefined;
    state.enemies = bossRoom && state.progress.bossDefeated ? [] : spawnEnemies(room, tuning, state.time);
    state.boss = state.progress.bossDefeated ? null : spawnBoss(room, tuning);
    state.pickups = pickupsFor(room, state.progress);
    clearHazards(hazards);
    state.transition = null;
    touchingCheckpoint = false;
    state.events.push({ kind: "roomEnter", x: pos.x, y: pos.y });
    if (bossRoom) {
      openGates(rooms, state.progress, "bossApproach", state.events);
    }
  }

  function start(): void {
    state.phase = "playing";
    state.time = 0;
    state.tick = 0;
    state.deathAt = 0;
    state.victoryAt = 0;
    state.transition = null;
    breakableHp.clear();
    state.progress = createProgress(startRoom.id, startPos);
    resetPlayer(player, startPos, 1, tuning, state.progress.maxHealthBonus);
    player.longwick = false;
    enterRoom(startRoom.id, startPos, 1, true);
    state.progress.checkpointRoom = room.id;
    state.progress.checkpoint.x = startPos.x;
    state.progress.checkpoint.y = startPos.y;
    touchingCheckpoint = true;
    state.events.push({ kind: "start", x: startPos.x, y: startPos.y });
  }

  function returnToTitle(): void {
    state.phase = "title";
    state.time = 0;
    state.tick = 0;
    state.deathAt = 0;
    state.victoryAt = 0;
    state.transition = null;
    breakableHp.clear();
    state.progress = createProgress(startRoom.id, startPos);
    resetPlayer(player, startPos, 1, tuning, state.progress.maxHealthBonus);
    player.longwick = false;
    enterRoom(startRoom.id, startPos, 1, true);
    state.progress.checkpointRoom = room.id;
    state.progress.checkpoint.x = startPos.x;
    state.progress.checkpoint.y = startPos.y;
    touchingCheckpoint = true;
  }

  function respawn(): void {
    state.progress.deaths += 1;
    const point = state.progress.checkpoint;
    enterRoom(state.progress.checkpointRoom, point, 1, true);
    touchingCheckpoint = true;
    state.phase = "playing";
    state.deathAt = 0;
    state.events.push({ kind: "respawn", x: point.x, y: point.y });
  }

  function pause(): void {
    if (state.phase !== "playing") {
      return;
    }
    state.phase = "paused";
    state.events.push({ kind: "pause", x: player.pos.x, y: player.pos.y });
  }

  function resume(): void {
    if (state.phase !== "paused") {
      return;
    }
    state.phase = "playing";
    state.events.push({ kind: "resume", x: player.pos.x, y: player.pos.y });
  }

  function step(dt: number): void {
    if (state.phase === "title") {
      if (input.confirm) {
        start();
      }
      return;
    }
    if (state.phase === "paused") {
      if (input.pause) {
        resume();
      }
      return;
    }
    if (state.phase === "victory") {
      state.time += dt;
      if (
        input.confirm &&
        state.time - state.victoryAt >= tuning.feel.victoryHoldMs / 1000
      ) {
        returnToTitle();
      }
      return;
    }
    if (state.phase === "dead") {
      state.time += dt;
      if (input.confirm || deathDelayElapsed(state, tuning)) {
        respawn();
      }
      return;
    }
    if (input.pause) {
      pause();
      return;
    }

    const t = state.time;

    if (state.transition) {
      const pending = state.transition;
      enterRoom(pending.to, pending.entry, pending.entryFacing, false);
    }

    activeSolids(room, state.progress, solids);
    stepPlayer(player, input, solids, t, dt, tuning, state.events);
    stepEnemies(state.enemies, player, solids, hazards, t, dt, tuning);
    if (state.boss) {
      stepBoss(state.boss, player, room, hazards, t, dt, tuning, rng, state.events);
    }
    stepHazards(hazards, room.bounds, solids, t, dt);
    resolveCombat(state, room, breakableHp, t, tuning, state.events);

    if (state.boss && !state.boss.alive && !state.progress.bossDefeated) {
      state.progress.bossDefeated = true;
      openGates(rooms, state.progress, "bossDefeated", state.events);
      state.pickups = pickupsFor(room, state.progress);
    }

    if (player.health <= 0) {
      state.time += dt;
      state.tick += 1;
      onDeath(state, state.time);
      return;
    }

    collectPickups(state, tuning, state.events);
    touchingCheckpoint = touchCheckpoint(state, room, tuning, touchingCheckpoint, state.events);
    checkDoors(state, room, tuning);

    state.time += dt;
    state.tick += 1;
  }

  const game: Game = {
    state,
    setInput(next: Input): void {
      input.moveX = next.moveX;
      input.moveY = next.moveY;
      input.jump = next.jump;
      input.jumpHeld = next.jumpHeld;
      input.attack = next.attack;
      input.dash = next.dash;
      input.pause = next.pause;
      input.confirm = next.confirm;
    },
    step,
    start,
    respawn,
    returnToTitle,
    pause,
    resume,
    currentRoom(): Room {
      return room;
    }
  };

  return game;
}
