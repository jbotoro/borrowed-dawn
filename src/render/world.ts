import * as THREE from "three";
import type { Tuning } from "../tuning";
import type {
  GameEvent,
  GameState,
  PlayerState,
  Progress,
  Room,
  RoomAmbience
} from "../game/types";
import { createRenderer } from "./renderer";
import { createPostfx } from "./postfx";
import { createRoomMesh } from "./roomMesh";
import { createPlayerMesh } from "./playerMesh";
import { createEnemyMeshes } from "./enemyMesh";
import { createBossMesh } from "./bossMesh";
import { createFx } from "./fx";
import { createSideCamera } from "./camera";
import { desaturateHex, mountLookBar, resolveLook } from "./look";

export interface RenderWorld {
  setRoom(room: Room, progress: Progress): void;
  sync(
    state: GameState,
    room: Room,
    alpha: number,
    dt: number,
    simTime: number,
    renderTime: number,
    tuning: Tuning
  ): void;
  onEvent(event: GameEvent, state: GameState, tuning: Tuning): void;
  addShake(amount: number): void;
  snapCamera(room: Room, player: PlayerState): void;
  render(): void;
  resize(): void;
}

const COLOR_BACKGROUND = 0x070b12;

export function createRenderWorld(canvas: HTMLCanvasElement, tuning: Tuning): RenderWorld {
  const look = resolveLook(tuning.feel.toonBands);
  mountLookBar(look.id);

  const { renderer, resize: resizeRenderer } = createRenderer(canvas, look.shadows);
  if (!look.postfx.toneMapped) {
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1;
  }

  const rig = look.lights;
  const baseBackground = look.fog.colorOverride === null ? COLOR_BACKGROUND : look.fog.colorOverride;

  const scene = new THREE.Scene();
  const background = new THREE.Color(baseBackground);
  scene.background = background;
  const fog = new THREE.Fog(
    baseBackground,
    tuning.feel.fogNear * look.fog.nearScale,
    tuning.feel.fogFar * look.fog.farScale
  );
  if (look.fog.enabled) scene.fog = fog;

  const hemi = new THREE.HemisphereLight(
    rig.hemiSky,
    rig.hemiGround,
    tuning.feel.hemiIntensity * rig.hemiIntensity
  );
  hemi.layers.enableAll();
  scene.add(hemi);

  const key = new THREE.DirectionalLight(rig.key.color, tuning.feel.keyIntensity * rig.key.intensity);
  key.layers.enableAll();
  key.position.set(rig.key.x, rig.key.y, rig.key.z);
  if (look.shadows) {
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -22;
    key.shadow.camera.right = 22;
    key.shadow.camera.top = 22;
    key.shadow.camera.bottom = -22;
    key.shadow.camera.far = 80;
    key.shadow.bias = -0.0015;
  }
  scene.add(key);

  const fill = new THREE.DirectionalLight(
    rig.fill.color,
    tuning.feel.fillIntensity * rig.fill.intensity
  );
  fill.layers.enableAll();
  fill.position.set(rig.fill.x, rig.fill.y, rig.fill.z);
  scene.add(fill);

  if (rig.rim !== null) {
    const rim = new THREE.DirectionalLight(rig.rim.color, rig.rim.intensity);
    rim.layers.enableAll();
    rim.position.set(rig.rim.x, rig.rim.y, rig.rim.z);
    scene.add(rim);
  }

  const spotSpec = rig.spot;
  let spot: THREE.SpotLight | null = null;
  if (spotSpec !== null) {
    spot = new THREE.SpotLight(spotSpec.color, spotSpec.intensity, 70, Math.PI * 0.32, 0.55, 1.4);
    spot.layers.enableAll();
    spot.position.set(spotSpec.x, spotSpec.y, spotSpec.z);
    if (look.shadows) {
      spot.castShadow = true;
      spot.shadow.mapSize.set(1024, 1024);
      spot.shadow.bias = -0.002;
    }
    scene.add(spot);
    scene.add(spot.target);
  }

  const room = createRoomMesh(tuning, look);
  scene.add(room.group);

  const player = createPlayerMesh(tuning, look);
  scene.add(player.group);

  const enemies = createEnemyMeshes(tuning, look);
  scene.add(enemies.group);

  const boss = createBossMesh(tuning, look);
  scene.add(boss.group);

  const fx = createFx(tuning, look);
  scene.add(fx.group);

  if (look.shadows) {
    for (const root of [room.group, player.group, enemies.group, boss.group]) {
      root.traverse((node) => {
        const mesh = node as THREE.Mesh;
        if (mesh.isMesh === true) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
    }
  }

  const camera = createSideCamera(tuning, window.innerWidth / window.innerHeight);
  const postfx = createPostfx(
    renderer,
    scene,
    camera.camera,
    look.postfx.bloomScale,
    look.postfx.vignetteScale
  );

  let ambience: RoomAmbience | null = null;
  let builtRoomId: string | null = null;
  let firstApply = true;
  let titlePose: PlayerState | null = null;

  function posedForTitle(state: GameState, currentRoom: Room): PlayerState {
    const spot = currentRoom.checkpoint ?? currentRoom.waypoints[0];
    if (state.phase !== "title" || spot === undefined) return state.player;
    if (titlePose === null) {
      titlePose = { ...state.player, pos: { x: spot.x, y: spot.y }, prev: { x: spot.x, y: spot.y }, vel: { x: 0, y: 0 } };
    }
    titlePose.pos.x = spot.x;
    titlePose.pos.y = spot.y;
    titlePose.prev.x = spot.x;
    titlePose.prev.y = spot.y;
    titlePose.facing = 1;
    titlePose.grounded = true;
    titlePose.health = state.player.health;
    return titlePose;
  }

  const rigSky = new THREE.Color(rig.hemiSky);
  const rigGround = new THREE.Color(rig.hemiGround);
  const rigKey = new THREE.Color(rig.key.color);
  const rigFill = new THREE.Color(rig.fill.color);

  const rewardColor = new THREE.Color(look.colorOf("reward"));
  let furnaceBoost = 1;
  let emberBoost = 1;
  let doorGlow = 1;

  const targetFog = new THREE.Color(baseBackground);
  const targetSky = new THREE.Color(rig.hemiSky);
  const targetGround = new THREE.Color(rig.hemiGround);
  const targetKey = new THREE.Color(rig.key.color);
  const targetFill = new THREE.Color(rig.fill.color);

  let targetFogNear = tuning.feel.fogNear;
  let targetFogFar = tuning.feel.fogFar;
  let targetHemi = tuning.feel.hemiIntensity;
  let targetKeyI = tuning.feel.keyIntensity;
  let targetFillI = tuning.feel.fillIntensity;

  function applyDawnTargets(live: Tuning): void {
    const warmth = Math.max(0, Math.min(1, live.feel.dawnWarmth));
    targetKey.lerp(rewardColor, warmth);
    targetFill.lerp(rewardColor, warmth);
    targetHemi *= live.feel.dawnLightBoost;
    targetKeyI *= live.feel.dawnLightBoost;
  }

  function applyVictoryTargets(live: Tuning): void {
    const warmth = Math.max(0, Math.min(1, live.feel.victoryWarmth));
    targetKey.lerp(rewardColor, warmth);
    targetFill.lerp(rewardColor, warmth);
    targetHemi *= live.feel.victoryLightBoost;
    targetKeyI *= live.feel.victoryLightBoost;
  }

  function resolveTargets(live: Tuning, victory: boolean, dawn: boolean): void {
    const amb = ambience;
    const sat = look.ambienceSaturation;
    if (amb === null) {
      targetFog.setHex(baseBackground);
      targetSky.setHex(rig.hemiSky);
      targetGround.setHex(rig.hemiGround);
      targetKey.setHex(rig.key.color);
      targetFill.setHex(rig.fill.color);
      targetFogNear = live.feel.fogNear * look.fog.nearScale;
      targetFogFar = live.feel.fogFar * look.fog.farScale;
      targetHemi = live.feel.hemiIntensity * rig.hemiIntensity;
      targetKeyI = live.feel.keyIntensity * rig.key.intensity;
      targetFillI = live.feel.fillIntensity * rig.fill.intensity;
      if (dawn) applyDawnTargets(live);
      if (victory) applyVictoryTargets(live);
      return;
    }
    const fogHex =
      look.fog.colorOverride === null
        ? desaturateHex(amb.fogColor, look.fog.saturation)
        : look.fog.colorOverride;
    const mix = look.rigMix;
    targetFog.setHex(fogHex);
    targetSky.setHex(desaturateHex(amb.hemiSky, sat)).lerp(rigSky, mix);
    targetGround.setHex(desaturateHex(amb.hemiGround, sat)).lerp(rigGround, mix);
    targetKey.setHex(desaturateHex(amb.keyColor, sat)).lerp(rigKey, mix);
    targetFill.setHex(desaturateHex(amb.fillColor, sat)).lerp(rigFill, mix);
    const gain = live.feel.ambienceGain * look.ambienceIntensityScale;
    targetFogNear = amb.fogNear * look.fog.nearScale;
    targetFogFar = amb.fogFar * look.fog.farScale;
    targetHemi = amb.hemiIntensity * gain * rig.hemiIntensity;
    targetKeyI = amb.keyIntensity * gain * rig.key.intensity;
    targetFillI = amb.fillIntensity * gain * rig.fill.intensity;
    if (dawn) applyDawnTargets(live);
    if (victory) applyVictoryTargets(live);
  }

  function applyAmbience(dt: number, live: Tuning, victory: boolean, dawn: boolean): void {
    resolveTargets(live, victory, dawn);
    const rate = firstApply
      ? 1
      : Math.min(1, Math.max(live.feel.ambienceLerpPerSec, 0) * Math.max(dt, 0));
    firstApply = false;

    fog.color.lerp(targetFog, rate);
    background.copy(fog.color);
    hemi.color.lerp(targetSky, rate);
    hemi.groundColor.lerp(targetGround, rate);
    key.color.lerp(targetKey, rate);
    fill.color.lerp(targetFill, rate);

    fog.near += (targetFogNear - fog.near) * rate;
    fog.far += (targetFogFar - fog.far) * rate;
    hemi.intensity += (targetHemi - hemi.intensity) * rate;
    key.intensity += (targetKeyI - key.intensity) * rate;
    fill.intensity += (targetFillI - fill.intensity) * rate;

    const targetBoost = victory ? live.feel.victoryFurnaceBoost : 1;
    furnaceBoost += (targetBoost - furnaceBoost) * rate;

    const targetEmber = dawn ? Math.max(live.feel.dawnEmberBoost, 1) : 1;
    emberBoost += (targetEmber - emberBoost) * rate;

    const targetDoor = dawn ? Math.max(live.feel.dawnDoorGlow, 1) : 1;
    doorGlow += (targetDoor - doorGlow) * rate;
  }

  function resize(): void {
    resizeRenderer();
    camera.resize(window.innerWidth / window.innerHeight);
    postfx.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", resize);

  return {
    setRoom(nextRoom: Room, progress: Progress): void {
      ambience = nextRoom.ambience === undefined ? null : nextRoom.ambience;
      if (builtRoomId !== nextRoom.id) {
        builtRoomId = nextRoom.id;
        room.build(nextRoom, progress);
      } else {
        room.syncGates(progress);
      }
      fx.setRoom(nextRoom);
    },

    sync(
      state: GameState,
      currentRoom: Room,
      alpha: number,
      dt: number,
      simTime: number,
      renderTime: number,
      live: Tuning
    ): void {
      const dawn = state.progress.bossDefeated && state.phase !== "title";
      applyAmbience(dt, live, state.phase === "victory", dawn);

      room.syncGates(state.progress);
      room.sync(renderTime, dt, live, furnaceBoost, emberBoost, doorGlow);
      const shown = posedForTitle(state, currentRoom);
      player.sync(shown, alpha, simTime, renderTime, live);
      enemies.sync(state.enemies, alpha, simTime, live);
      boss.sync(state.boss, alpha, simTime, renderTime, live);
      fx.sync(state, shown, alpha, dt, simTime, renderTime, live);
      camera.sync(shown, currentRoom, alpha, dt, live);
      if (spot !== null && spotSpec !== null) {
        spot.position.set(
          state.player.pos.x + spotSpec.x,
          state.player.pos.y + spotSpec.y,
          spotSpec.z
        );
        spot.target.position.set(state.player.pos.x, state.player.pos.y, 0);
        spot.target.updateMatrixWorld();
      }
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
