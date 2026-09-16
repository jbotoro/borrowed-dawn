import { tuning } from "./tuning";
import { params } from "./debug/params";
import { createGame, createFixedLoop } from "./game";
import type { Vec2 } from "./game/types";
import { rooms, demoStart, findRoom } from "./content/rooms";
import { createKeyboardInput, emptyInput } from "./input";
import { createAutoplayInput } from "./debug/autoplay";
import { createRenderWorld } from "./render/world";
import { createHud } from "./ui/hud";
import { createTitle } from "./ui/title";
import { createPause } from "./ui/pause";
import { createBanners } from "./ui/banners";
import { mountConfigurator } from "./ui/configurator";

if (params.screenshot) document.body.classList.add("screenshot");

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ui = document.getElementById("ui") as HTMLElement;

mountConfigurator();

let startRoom: string | undefined;
let startPos: Vec2 | undefined;

if (params.start === "demo") {
  startRoom = demoStart.room;
  startPos = { x: demoStart.pos.x, y: demoStart.pos.y };
} else if (params.room !== null) {
  const room = findRoom(params.room);
  if (room !== undefined) {
    const spot = room.checkpoint ?? room.waypoints[0];
    startRoom = room.id;
    if (spot !== undefined) startPos = { x: spot.x, y: spot.y };
  }
}

const game = createGame({
  tuning,
  seed: params.seed,
  rooms,
  startRoom,
  startPos,
  god: params.god
});

const loop = createFixedLoop();
const input = params.autoplay ? createAutoplayInput(game) : createKeyboardInput();

const world = createRenderWorld(canvas, tuning);
const hud = createHud(ui);
const title = createTitle(ui);
const pause = createPause(ui);
const banners = createBanners(ui);

function enterRoom(): void {
  const room = game.currentRoom();
  world.setRoom(room, game.state.progress);
  world.snapCamera(room, game.state.player);
}

enterRoom();

window.addEventListener("resize", () => world.resize());

let last = performance.now();
const pending = emptyInput();

function frame(now: number): void {
  const realDt = Math.min((now - last) / 1000, 0.1) * params.fast;
  last = now;

  const sampled = input.sample();
  pending.moveX = sampled.moveX;
  pending.moveY = sampled.moveY;
  pending.jumpHeld = sampled.jumpHeld;
  if (sampled.jump) pending.jump = true;
  if (sampled.attack) pending.attack = true;
  if (sampled.dash) pending.dash = true;
  if (sampled.pause) pending.pause = true;
  if (sampled.confirm) pending.confirm = true;

  game.setInput(pending);
  const tickBefore = game.state.tick;
  const phaseBefore = game.state.phase;
  const alpha = loop.advance(realDt, (dt) => game.step(dt));

  const state = game.state;

  if (state.tick !== tickBefore || state.phase !== phaseBefore) {
    pending.jump = false;
    pending.attack = false;
    pending.dash = false;
    pending.pause = false;
    pending.confirm = false;
  }

  for (const event of state.events) {
    if (event.kind === "roomEnter" || event.kind === "respawn" || event.kind === "start") {
      enterRoom();
    }
    if (event.kind === "hurt" || event.kind === "death") world.addShake(tuning.feel.shakeOnHit);
    else if (event.kind === "enemyDeath") world.addShake(tuning.feel.shakeOnKill);
    else if (event.kind === "bossAttack") world.addShake(tuning.feel.shakeOnBossSlam);
    world.onEvent(event, state, tuning);
    banners.onEvent(event, state);
  }
  state.events.length = 0;

  const room = game.currentRoom();
  world.sync(state, room, alpha, realDt, state.time, tuning);
  hud.sync(state, tuning);
  title.sync(state);
  pause.sync(state);
  banners.sync(state);
  world.render();

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

declare global {
  interface Window {
    __omr: {
      game: typeof game;
      tuning: typeof tuning;
      params: typeof params;
      rooms: typeof rooms;
    };
  }
}

window.__omr = { game, tuning, params, rooms };

console.log("[one-more-run] boot ok", {
  seed: params.seed,
  room: game.state.roomId
});
