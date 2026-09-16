import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { PlayerState, Room } from "../game/types";

export interface SideCamera {
  camera: THREE.PerspectiveCamera;
  sync(player: PlayerState, room: Room, alpha: number, dt: number, tuning: Tuning): void;
  addShake(amount: number): void;
  snapTo(room: Room, player: PlayerState): void;
  resize(aspect: number): void;
}

export function createSideCamera(tuning: Tuning, aspect: number): SideCamera {
  const camera = new THREE.PerspectiveCamera(tuning.camera.fovDeg, aspect, 0.1, 400);
  camera.position.set(0, 0, tuning.camera.distance);

  let viewAspect = aspect;
  let appliedFov = tuning.camera.fovDeg;
  let smoothX = 0;
  let smoothY = 0;
  let shake = 0;
  let shakeX = 0;
  let shakeY = 0;
  let targetX = 0;
  let targetY = 0;

  function halfHeight(live: Tuning): number {
    const half = THREE.MathUtils.degToRad(live.camera.fovDeg) * 0.5;
    return Math.tan(half) * live.camera.distance;
  }

  function clampAxis(value: number, min: number, max: number, half: number): number {
    if (max - min <= half * 2) return (min + max) * 0.5;
    if (value < min + half) return min + half;
    if (value > max - half) return max - half;
    return value;
  }

  function computeTarget(player: PlayerState, room: Room, alpha: number, live: Tuning): void {
    const cam = live.camera;
    const px = player.prev.x + (player.pos.x - player.prev.x) * alpha;
    const py = player.prev.y + (player.pos.y - player.prev.y) * alpha;

    let wantX = px + cam.lookAheadX * player.facing;
    let wantY = py + live.player.height * 0.5 + cam.lookAheadY;

    const hh = halfHeight(live);
    const hw = hh * viewAspect;
    const pad = cam.roomPad;
    const minX = room.bounds.x - pad;
    const maxX = room.bounds.x + room.bounds.w + pad;
    const minY = room.bounds.y - pad;
    const maxY = room.bounds.y + room.bounds.h + pad;

    wantX = clampAxis(wantX, minX, maxX, hw);
    wantY = clampAxis(wantY, minY, maxY, hh);

    targetX = wantX;
    targetY = wantY;
  }

  return {
    camera,

    sync(player: PlayerState, room: Room, alpha: number, dt: number, live: Tuning): void {
      if (live.camera.fovDeg !== appliedFov) {
        appliedFov = live.camera.fovDeg;
        camera.fov = appliedFov;
        camera.updateProjectionMatrix();
      }

      computeTarget(player, room, alpha, live);

      const step = Math.max(dt, 0);
      const lerp = 1 - Math.pow(1 - live.camera.followLerp, step * 60);
      smoothX += (targetX - smoothX) * lerp;
      smoothY += (targetY - smoothY) * lerp;

      if (shake > 0.0005) {
        const angle = Math.random() * Math.PI * 2;
        shakeX = Math.cos(angle) * shake;
        shakeY = Math.sin(angle) * shake;
        shake *= Math.pow(live.camera.shakeDecay, step * 60);
      } else {
        shake = 0;
        shakeX = 0;
        shakeY = 0;
      }

      camera.position.set(smoothX + shakeX, smoothY + shakeY, live.camera.distance);
      camera.lookAt(smoothX + shakeX, smoothY + shakeY, 0);
    },

    addShake(amount: number): void {
      if (amount > shake) shake = amount;
    },

    snapTo(room: Room, player: PlayerState): void {
      computeTarget(player, room, 1, tuning);
      smoothX = targetX;
      smoothY = targetY;
      shake = 0;
      shakeX = 0;
      shakeY = 0;
      camera.position.set(smoothX, smoothY, tuning.camera.distance);
      camera.lookAt(smoothX, smoothY, 0);
    },

    resize(nextAspect: number): void {
      viewAspect = nextAspect;
      camera.aspect = nextAspect;
      camera.updateProjectionMatrix();
    }
  };
}
