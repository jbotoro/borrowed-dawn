import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { GameEvent, GameState, PlayerState, Progress, Room } from "../game/types";
import { createRenderer } from "./renderer";
import { createPostfx } from "./postfx";
import { createRoomMesh } from "./roomMesh";
import { createPlayerMesh } from "./playerMesh";
import { createEnemyMeshes } from "./enemyMesh";
import { createBossMesh } from "./bossMesh";
import { createFx } from "./fx";
import { createSideCamera } from "./camera";

export interface RenderWorld {
  setRoom(room: Room, progress: Progress): void;
  sync(
    state: GameState,
    room: Room,
    alpha: number,
    dt: number,
    t: number,
    tuning: Tuning
  ): void;
  onEvent(event: GameEvent, state: GameState, tuning: Tuning): void;
  addShake(amount: number): void;
  snapCamera(room: Room, player: PlayerState): void;
  render(): void;
  resize(): void;
}

const COLOR_BACKGROUND = 0x070b12;
const COLOR_SKY = 0x6f8fbf;
const COLOR_GROUND_BOUNCE = 0x0a0d14;
const COLOR_KEY = 0xffe6cc;
const COLOR_FILL = 0x6f93c8;

export function createRenderWorld(canvas: HTMLCanvasElement, tuning: Tuning): RenderWorld {
  const { renderer, resize: resizeRenderer } = createRenderer(canvas);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLOR_BACKGROUND);
  const fog = new THREE.Fog(COLOR_BACKGROUND, tuning.feel.fogNear, tuning.feel.fogFar);
  scene.fog = fog;

  const hemi = new THREE.HemisphereLight(
    COLOR_SKY,
    COLOR_GROUND_BOUNCE,
    tuning.feel.hemiIntensity
  );
  scene.add(hemi);

  const key = new THREE.DirectionalLight(COLOR_KEY, tuning.feel.keyIntensity);
  key.position.set(-10, 14, 12);
  scene.add(key);

  const fill = new THREE.DirectionalLight(COLOR_FILL, tuning.feel.fillIntensity);
  fill.position.set(9, 3, 14);
  scene.add(fill);

  const room = createRoomMesh(tuning);
  scene.add(room.group);

  const player = createPlayerMesh(tuning);
  scene.add(player.group);

  const enemies = createEnemyMeshes(tuning);
  scene.add(enemies.group);

  const boss = createBossMesh(tuning);
  scene.add(boss.group);

  const fx = createFx(tuning);
  scene.add(fx.group);

  const camera = createSideCamera(tuning, window.innerWidth / window.innerHeight);
  const postfx = createPostfx(renderer, scene, camera.camera);

  function resize(): void {
    resizeRenderer();
    camera.resize(window.innerWidth / window.innerHeight);
    postfx.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", resize);

  return {
    setRoom(nextRoom: Room, progress: Progress): void {
      room.build(nextRoom, progress);
    },

    sync(
      state: GameState,
      currentRoom: Room,
      alpha: number,
      dt: number,
      t: number,
      live: Tuning
    ): void {
      fog.near = live.feel.fogNear;
      fog.far = live.feel.fogFar;
      hemi.intensity = live.feel.hemiIntensity;
      key.intensity = live.feel.keyIntensity;
      fill.intensity = live.feel.fillIntensity;

      room.syncGates(state.progress);
      player.sync(state.player, alpha, t, live);
      enemies.sync(state.enemies, alpha, t, live);
      boss.sync(state.boss, alpha, t, live);
      fx.sync(state, alpha, dt, t, live);
      camera.sync(state.player, currentRoom, alpha, dt, live);
      postfx.sync(live.feel);
    },

    onEvent(event: GameEvent, state: GameState, live: Tuning): void {
      fx.onEvent(event, state, live);
    },

    addShake(amount: number): void {
      camera.addShake(amount);
    },

    snapCamera(currentRoom: Room, playerState: PlayerState): void {
      camera.snapTo(currentRoom, playerState);
    },

    render(): void {
      postfx.render();
    },

    resize
  };
}
