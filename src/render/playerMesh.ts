import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { PlayerState } from "../game/types";
import type { LookProfile } from "./look";
import { applyOutline, registerActorLight } from "./look";

export interface PlayerMesh {
  group: THREE.Group;
  sync(
    player: PlayerState,
    alpha: number,
    t: number,
    rt: number,
    tuning: Tuning
  ): void;
}

type Point = readonly [number, number];

const BASE_WIDTH = 0.6;
const BASE_HEIGHT = 1.2;

const HIP_Y = 0.5;
const SHOULDER_Y = 0.88;
const NECK_Y = 0.94;
const CAPE_Y = 1.02;
const THIGH_LEN = 0.2;
const SHIN_LEN = 0.2;
const UPPER_LEN = 0.17;
const FORE_LEN = 0.16;

const DIMPLE_SHADE = 0.52;
const BUCKLE_RADIUS = 0.019;
const HOOD_POINT_SWING = 1.35;
const HOOD_POINT_X = -0.035;
const HOOD_POINT_Y = 1.18;
const SATCHEL_X = -0.208;
const SATCHEL_Y = 0.515;

const WHITE = new THREE.Color(0xffffff);

const LAMP_Z = -0.16;
const BEAM_Z = 0.15;
const BEAM_SPLAY = 0.45;
const HALO_SIZE = 64;
const POOL_SIZE = 64;
const BEAM_SIZE = 64;
const POOL_ASPECT = 0.32;
const BEAM_WIDTH_RATIO = 0.62;
const BEAM_TOP_RATIO = 0.26;
const GROUND_FADE_PER_SEC = 9;

function haloTexture(): THREE.Texture | null {
  const canvas = document.createElement("canvas");
  canvas.width = HALO_SIZE;
  canvas.height = HALO_SIZE;
  const ctx = canvas.getContext("2d");
  if (ctx === null) return null;
  const half = HALO_SIZE * 0.5;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.18, "rgba(255,255,255,0.62)");
  grad.addColorStop(0.45, "rgba(255,255,255,0.22)");
  grad.addColorStop(0.75, "rgba(255,255,255,0.05)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, HALO_SIZE, HALO_SIZE);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function poolTexture(): THREE.Texture | null {
  const canvas = document.createElement("canvas");
  canvas.width = POOL_SIZE;
  canvas.height = POOL_SIZE;
  const ctx = canvas.getContext("2d");
  if (ctx === null) return null;
  const image = ctx.createImageData(POOL_SIZE, POOL_SIZE);
  const data = image.data;
  for (let y = 0; y < POOL_SIZE; y++) {
    const dy = (y / (POOL_SIZE - 1) - 0.5) * 2;
    for (let x = 0; x < POOL_SIZE; x++) {
      const dx = (x / (POOL_SIZE - 1) - 0.5) * 2;
      const r = Math.sqrt(dx * dx + dy * dy);
      const alpha = r >= 1 ? 0 : Math.pow(1 - r * r, 1.2);
      const i = (y * POOL_SIZE + x) * 4;
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = Math.round(clamp01(alpha) * 255);
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function beamTexture(): THREE.Texture | null {
  const canvas = document.createElement("canvas");
  canvas.width = BEAM_SIZE;
  canvas.height = BEAM_SIZE;
  const ctx = canvas.getContext("2d");
  if (ctx === null) return null;
  const image = ctx.createImageData(BEAM_SIZE, BEAM_SIZE);
  const data = image.data;
  for (let y = 0; y < BEAM_SIZE; y++) {
    const v = y / (BEAM_SIZE - 1);
    const splay = v >= BEAM_SPLAY ? 1 : v / BEAM_SPLAY;
    const halfWidth = BEAM_TOP_RATIO + (1 - BEAM_TOP_RATIO) * splay;
    const fall = 1 - v * v;
    for (let x = 0; x < BEAM_SIZE; x++) {
      const u = (x / (BEAM_SIZE - 1) - 0.5) * 2;
      const edge = 1 - Math.abs(u) / halfWidth;
      const across = edge <= 0 ? 0 : edge * edge;
      const alpha = clamp01(across * fall);
      const i = (y * BEAM_SIZE + x) * 4;
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = Math.round(alpha * 255);
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function glowPlane(map: THREE.Texture | null, hex: number): THREE.Mesh {
  const material = new THREE.MeshBasicMaterial({
    color: hex,
    map,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    fog: false
  });
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
}

const TORSO: Point[] = [
  [-0.09, 0.0],
  [-0.13, 0.12],
  [-0.19, 0.28],
  [-0.24, 0.4],
  [-0.21, 0.43],
  [0.19, 0.43],
  [0.26, 0.37],
  [0.19, 0.24],
  [0.12, 0.1],
  [0.09, 0.0]
];

const COLLAR: Point[] = [
  [-0.185, 0.402],
  [0.196, 0.402],
  [0.222, 0.44],
  [-0.176, 0.44]
];

const CAPE: Point[] = [
  [-0.16, 0.08],
  [-0.1, 0.2],
  [0.03, 0.23],
  [0.17, 0.17],
  [0.27, 0.05],
  [0.19, 0.0],
  [0.14, -0.08],
  [0.18, -0.22],
  [0.2, -0.42],
  [0.172, -0.62],
  [0.13, -0.5],
  [0.075, -0.71],
  [0.015, -0.53],
  [-0.055, -0.74],
  [-0.125, -0.55],
  [-0.2, -0.7],
  [-0.255, -0.48],
  [-0.3, -0.26],
  [-0.27, -0.08],
  [-0.22, 0.0]
];

const HOOD_POINT: Point[] = [
  [0.075, 0.045],
  [0.0, 0.065],
  [-0.115, 0.03],
  [-0.245, -0.035],
  [-0.355, -0.135],
  [-0.4, -0.215],
  [-0.325, -0.175],
  [-0.215, -0.108],
  [-0.095, -0.055],
  [0.02, -0.03],
  [0.075, -0.02]
];

const SATCHEL: Point[] = [
  [0.045, 0.078],
  [-0.178, 0.078],
  [-0.178, 0.012],
  [-0.152, 0.012],
  [-0.152, -0.118],
  [-0.126, -0.142],
  [0.0, -0.142],
  [0.025, -0.118],
  [0.025, 0.012],
  [0.045, 0.012]
];

const HEAD: Point[] = [
  [-0.07, 0.01],
  [-0.085, 0.09],
  [-0.06, 0.17],
  [0.0, 0.21],
  [0.09, 0.2],
  [0.15, 0.13],
  [0.12, 0.05],
  [0.07, 0.01]
];

const HOOD_RIM: Point[] = [
  [0.079, 0.198],
  [0.127, 0.166],
  [0.152, 0.13],
  [0.121, 0.048],
  [0.07, 0.008],
  [0.068, 0.026],
  [0.107, 0.056],
  [0.136, 0.128],
  [0.113, 0.157],
  [0.073, 0.182]
];

const THIGH: Point[] = [
  [-0.055, 0.02],
  [0.055, 0.02],
  [0.048, -THIGH_LEN],
  [-0.048, -THIGH_LEN]
];

const SHIN: Point[] = [
  [-0.046, 0.02],
  [0.046, 0.02],
  [0.04, -SHIN_LEN],
  [-0.04, -SHIN_LEN]
];

const BOOT: Point[] = [
  [-0.072, 0.0],
  [0.058, 0.0],
  [0.072, -0.03],
  [0.134, -0.048],
  [0.142, -0.086],
  [0.13, -0.1],
  [-0.072, -0.1],
  [-0.078, -0.06]
];

const UPPER_ARM: Point[] = [
  [-0.042, 0.03],
  [0.042, 0.03],
  [0.036, -UPPER_LEN],
  [-0.036, -UPPER_LEN]
];

const FOREARM: Point[] = [
  [-0.036, 0.02],
  [0.036, 0.02],
  [0.03, -FORE_LEN],
  [-0.03, -FORE_LEN]
];

const NEEDLE: Point[] = [
  [0.0, 0.05],
  [0.55, 0.033],
  [1.0, 0.011],
  [1.0, -0.011],
  [0.55, -0.033],
  [0.0, -0.05]
];

const NEEDLE_TIP: Point[] = [
  [0.9, 0.0176],
  [1.0, 0.011],
  [1.0, -0.011],
  [0.9, -0.0176]
];

const FERRULE: Point[] = [
  [-0.06, 0.036],
  [0.035, 0.036],
  [0.035, -0.036],
  [-0.06, -0.036]
];

const LANTERN_FRAME: Point[] = [
  [-0.058, 0.01],
  [0.058, 0.01],
  [0.058, -0.168],
  [-0.058, -0.168]
];

const LANTERN_HOLE: Point[] = [
  [-0.04, -0.022],
  [0.04, -0.022],
  [0.04, -0.148],
  [-0.04, -0.148]
];

const LANTERN_GLASS: Point[] = [
  [-0.04, -0.022],
  [0.04, -0.022],
  [0.04, -0.148],
  [-0.04, -0.148]
];

const FLAME: Point[] = [
  [0.0, -0.02],
  [0.025, -0.078],
  [0.0, -0.14],
  [-0.025, -0.078]
];

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function clampSigned(value: number): number {
  if (value < -1) return -1;
  if (value > 1) return 1;
  return value;
}

function pathOf(points: Point[]): THREE.Path {
  const path = new THREE.Path();
  let first = true;
  for (const point of points) {
    if (first) {
      path.moveTo(point[0], point[1]);
      first = false;
    } else {
      path.lineTo(point[0], point[1]);
    }
  }
  path.closePath();
  return path;
}

function ellipsePath(cx: number, cy: number, rx: number, ry: number): THREE.Path {
  const path = new THREE.Path();
  path.absellipse(cx, cy, rx, ry, 0, Math.PI * 2, false, 0);
  return path;
}

function shapeOf(points: Point[], holes?: THREE.Path[]): THREE.Shape {
  const shape = new THREE.Shape();
  let first = true;
  for (const point of points) {
    if (first) {
      shape.moveTo(point[0], point[1]);
      first = false;
    } else {
      shape.lineTo(point[0], point[1]);
    }
  }
  shape.closePath();
  if (holes !== undefined) {
    for (const hole of holes) shape.holes.push(hole);
  }
  return shape;
}

function plate(
  points: Point[],
  material: THREE.Material,
  depth: number,
  holes?: THREE.Path[]
): THREE.Mesh {
  const geometry = new THREE.ExtrudeGeometry(shapeOf(points, holes), {
    depth,
    bevelEnabled: false,
    curveSegments: 10
  });
  geometry.translate(0, 0, -depth * 0.5);
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  let cx = 0;
  let cy = 0;
  if (box !== null) {
    cx = (box.min.x + box.max.x) * 0.5;
    cy = (box.min.y + box.max.y) * 0.5;
    geometry.translate(-cx, -cy, 0);
  }
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(cx, cy, 0);
  return mesh;
}

export function createPlayerMesh(tuning: Tuning, look: LookProfile): PlayerMesh {
  const group = new THREE.Group();
  group.name = "player";

  const depth = tuning.feel.actorPlateDepth;
  const step = tuning.feel.actorPlateStep;
  const zCape = -2 * step;
  const zFar = -step;
  const zBody = 0;
  const zNear = step;
  const zProp = 2 * step;

  const slateMat = look.material("actorCoat", { unlit: true }) as THREE.MeshBasicMaterial;
  const charcoalMat = look.material("bossShell", { unlit: true }) as THREE.MeshBasicMaterial;
  const dimpleMat = look.material("actorCoat", {
    unlit: true,
    shade: DIMPLE_SHADE
  }) as THREE.MeshBasicMaterial;
  const porcelainMat = look.material("actorMetal", { unlit: true }) as THREE.MeshBasicMaterial;
  const voidMat = look.material("void", { unlit: true, fog: false }) as THREE.MeshBasicMaterial;
  const glassMat = look.material("actorGlass", { unlit: true }) as THREE.MeshBasicMaterial;
  const flameMat = look.material("reward", { unlit: true }) as THREE.MeshBasicMaterial;

  for (const mat of [slateMat, charcoalMat, dimpleMat, porcelainMat, glassMat, flameMat]) {
    mat.fog = false;
    mat.needsUpdate = true;
  }

  const slateBase = new THREE.Color(slateMat.color);
  const charcoalBase = new THREE.Color(charcoalMat.color);
  const dimpleBase = new THREE.Color(dimpleMat.color);
  const porcelainBase = new THREE.Color(porcelainMat.color);
  const glassBase = new THREE.Color(glassMat.color);
  const flameBase = new THREE.Color(flameMat.color);
  const voidColor = new THREE.Color(look.colorOf("void"));
  const tint = new THREE.Color();

  const pinGeometry = new THREE.CircleGeometry(tuning.feel.actorPinRadius, 12);
  function pin(x: number, y: number, z: number): THREE.Mesh {
    const mesh = new THREE.Mesh(pinGeometry, dimpleMat);
    mesh.position.set(x, y, z);
    return mesh;
  }

  const buckleGeometry = new THREE.CircleGeometry(BUCKLE_RADIUS, 10);

  const rig = new THREE.Group();
  group.add(rig);

  const torso = new THREE.Object3D();
  torso.position.set(0, HIP_Y, 0);
  rig.add(torso);

  const capePivot = new THREE.Object3D();
  capePivot.position.set(0, CAPE_Y - HIP_Y, zCape);
  torso.add(capePivot);
  const cape = plate(CAPE, charcoalMat, depth);
  capePivot.add(cape);

  const hoodPivot = new THREE.Object3D();
  hoodPivot.position.set(HOOD_POINT_X, HOOD_POINT_Y - HIP_Y, zCape - step * 0.4);
  torso.add(hoodPivot);
  hoodPivot.add(plate(HOOD_POINT, charcoalMat, depth));

  const satchel = new THREE.Object3D();
  satchel.position.set(SATCHEL_X, SATCHEL_Y - HIP_Y, zFar);
  torso.add(satchel);
  satchel.add(plate(SATCHEL, slateMat, depth));
  const buckle = new THREE.Mesh(buckleGeometry, porcelainMat);
  buckle.position.set(-0.066, 0.004, depth * 0.6);
  satchel.add(buckle);

  const torsoPlate = plate(TORSO, slateMat, depth);
  torsoPlate.position.z = zBody;
  torso.add(torsoPlate);

  const collar = plate(COLLAR, porcelainMat, depth * 0.8);
  collar.position.z = zNear;
  torso.add(collar);

  const head = new THREE.Object3D();
  head.position.set(0, NECK_Y - HIP_Y, 0);
  head.rotation.z = -0.04;
  torso.add(head);

  const faceHole = ellipsePath(0.042, 0.115, 0.031, 0.058);
  const headPlate = plate(HEAD, slateMat, depth, [faceHole]);
  headPlate.position.z = zBody;
  head.add(headPlate);

  const hoodRim = plate(HOOD_RIM, porcelainMat, depth * 0.8);
  hoodRim.position.z = zNear;
  head.add(hoodRim);

  const faceVoid = plate(
    [
      [-0.02, 0.03],
      [0.11, 0.03],
      [0.11, 0.2],
      [-0.02, 0.2]
    ],
    voidMat,
    depth * 0.6
  );
  faceVoid.position.z = zFar;
  head.add(faceVoid);

  interface Leg {
    hip: THREE.Object3D;
    knee: THREE.Object3D;
    boot: THREE.Object3D;
  }

  function buildLeg(x: number, z: number, material: THREE.MeshBasicMaterial): Leg {
    const hip = new THREE.Object3D();
    hip.position.set(x, HIP_Y, z);
    rig.add(hip);
    hip.add(plate(THIGH, material, depth));
    hip.add(pin(0, 0, depth * 0.6));

    const knee = new THREE.Object3D();
    knee.position.set(0, -THIGH_LEN, 0);
    hip.add(knee);
    knee.add(plate(SHIN, material, depth));

    const boot = new THREE.Object3D();
    boot.position.set(0, -SHIN_LEN, 0);
    knee.add(boot);
    boot.add(plate(BOOT, slateMat, depth));
    return { hip, knee, boot };
  }

  const legBack = buildLeg(-0.05, zFar, charcoalMat);
  const legLead = buildLeg(0.05, zNear, slateMat);

  function buildArm(x: number, z: number, material: THREE.MeshBasicMaterial): {
    shoulder: THREE.Object3D;
    elbow: THREE.Object3D;
    hand: THREE.Object3D;
  } {
    const shoulder = new THREE.Object3D();
    shoulder.position.set(x, SHOULDER_Y - HIP_Y, z);
    torso.add(shoulder);
    shoulder.add(plate(UPPER_ARM, material, depth));
    shoulder.add(pin(0, 0, depth * 0.6));

    const elbow = new THREE.Object3D();
    elbow.position.set(0, -UPPER_LEN, 0);
    shoulder.add(elbow);
    elbow.add(plate(FOREARM, material, depth));

    const hand = new THREE.Object3D();
    hand.position.set(0, -FORE_LEN, 0);
    elbow.add(hand);
    return { shoulder, elbow, hand };
  }

  const armOffParts = buildArm(-0.04, zFar, charcoalMat);
  const armOff = armOffParts.shoulder;
  const elbowOff = armOffParts.elbow;
  armOff.rotation.z = 0.15;
  elbowOff.rotation.z = 1.15;

  const lanternPivot = new THREE.Object3D();
  lanternPivot.position.set(0, 0, zProp - zFar);
  armOffParts.hand.add(lanternPivot);

  const lantern = new THREE.Group();
  lantern.position.set(0, 0.03, 0);
  lanternPivot.add(lantern);

  const lanternFrame = plate(LANTERN_FRAME, porcelainMat, depth, [pathOf(LANTERN_HOLE)]);
  lantern.add(lanternFrame);

  const bail = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.007, 4, 10), porcelainMat);
  bail.position.set(0, 0.03, 0);
  lantern.add(bail);

  const glass = plate(LANTERN_GLASS, glassMat, depth * 0.7);
  glass.position.z = depth * 0.6;
  lantern.add(glass);

  const flame = plate(FLAME, flameMat, depth * 0.5);
  flame.position.z = depth * 1.1;
  lantern.add(flame);
  const flameRestY = flame.position.y;

  const lanternLight = new THREE.PointLight(
    look.colorOf("reward"),
    tuning.feel.playerLightIntensity,
    tuning.feel.playerLightDistance,
    2
  );
  lanternLight.position.set(0, -0.085, 2 * step);
  lantern.add(lanternLight);
  registerActorLight(lanternLight);

  const armLeadParts = buildArm(0.02, zNear, slateMat);
  const armLead = armLeadParts.shoulder;
  const elbowLead = armLeadParts.elbow;

  const weapon = new THREE.Object3D();
  weapon.position.set(0, 0, zProp - zNear);
  armLeadParts.hand.add(weapon);

  const ferrule = plate(FERRULE, slateMat, depth);
  weapon.add(ferrule);

  const eye = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.008, 4, 10), slateMat);
  eye.position.set(-0.058, 0, 0);
  weapon.add(eye);

  const needleScale = new THREE.Object3D();
  needleScale.position.set(0.03, 0, 0);
  weapon.add(needleScale);
  needleScale.add(plate(NEEDLE, slateMat, depth * 0.7));
  needleScale.add(plate(NEEDLE_TIP, porcelainMat, depth * 0.72));

  group.traverse((node) => {
    const mesh = node as THREE.Mesh;
    if (mesh.isMesh === true) mesh.layers.set(look.actorLayer);
  });
  applyOutline(group, tuning.feel.outlineThickness, look);

  const lamp = new THREE.Group();
  lamp.name = "lanternLight";
  group.add(lamp);

  const amber = look.colorOf("reward");
  const halo = glowPlane(haloTexture(), amber);
  const beam = glowPlane(beamTexture(), amber);
  const pool = glowPlane(poolTexture(), amber);
  lamp.add(beam);
  lamp.add(pool);
  lamp.add(halo);
  for (const mesh of [halo, beam, pool]) {
    mesh.layers.set(look.actorLayer);
    mesh.renderOrder = 2;
  }
  const haloMat = halo.material as THREE.MeshBasicMaterial;
  const beamMat = beam.material as THREE.MeshBasicMaterial;
  const poolMat = pool.material as THREE.MeshBasicMaterial;
  const lampWorld = new THREE.Vector3();
  let groundFade = 1;

  let squashY = 1;
  let lastGrounded = true;
  let lastT = 0;
  let runPhase = 0;
  let lean = 0;
  let hemAngle = 0;
  let hemVel = 0;
  let lanternAngle = 0;
  let lanternVel = 0;
  let jumpAt = -1;
  let deathAt = -1;
  let lastHurtUntil = 0;

  function needleWorldAngle(player: PlayerState, t: number, live: Tuning): number {
    const rest = THREE.MathUtils.degToRad(live.feel.needleRestDeg);
    const back = THREE.MathUtils.degToRad(live.feel.needleBackDeg);
    const front = THREE.MathUtils.degToRad(live.feel.needleFrontDeg);
    const remaining = player.attackUntil - t;

    if (player.attackPhase === "windup") {
      const dur = Math.max(live.attack.windupMs, 1) / 1000;
      const p = clamp01(1 - remaining / dur);
      return rest + (back - rest) * (p * p);
    }
    if (player.attackPhase === "active") {
      const dur = Math.max(live.attack.activeMs, 1) / 1000;
      const p = clamp01(1 - remaining / dur);
      return back + (front - back) * Math.pow(p, 0.6);
    }
    if (player.attackPhase === "recovery") {
      const dur = Math.max(live.attack.recoveryMs, 1) / 1000;
      const p = clamp01(1 - remaining / dur);
      return front + (rest - front) * p;
    }
    return rest;
  }

  function armAttackAngle(player: PlayerState, t: number, live: Tuning): number {
    const remaining = player.attackUntil - t;
    let windAngle = -0.45;
    let strikeAngle = 1.25;
    if (player.attackDir === "up") {
      windAngle = 0.55;
      strikeAngle = 2.25;
    } else if (player.attackDir === "down") {
      windAngle = 1.55;
      strikeAngle = 0.1;
    }
    if (player.attackPhase === "windup") {
      const dur = Math.max(live.attack.windupMs, 1) / 1000;
      const p = clamp01(1 - remaining / dur);
      return windAngle * (p * p);
    }
    if (player.attackPhase === "active") {
      const dur = Math.max(live.attack.activeMs, 1) / 1000;
      const p = clamp01(1 - remaining / dur);
      return windAngle + (strikeAngle - windAngle) * Math.pow(p, 0.55);
    }
    if (player.attackPhase === "recovery") {
      const dur = Math.max(live.attack.recoveryMs, 1) / 1000;
      const p = clamp01(1 - remaining / dur);
      return strikeAngle * (1 - p);
    }
    return 0;
  }

  return {
    group,

    sync(player: PlayerState, alpha: number, t: number, rt: number, live: Tuning): void {
      const feel = live.feel;
      const dt = Math.max(0, Math.min(rt - lastT, 0.1));
      lastT = rt;

      const x = player.prev.x + (player.pos.x - player.prev.x) * alpha;
      const y = player.prev.y + (player.pos.y - player.prev.y) * alpha;
      group.position.set(x, y, 0);

      rig.scale.set(
        live.player.width / BASE_WIDTH,
        live.player.height / BASE_HEIGHT,
        1
      );

      const dashing = t < player.dashUntil;
      const attacking = player.attackPhase !== "none";
      const hurt = t < player.hurtUntil;
      const dying = player.health <= 0;
      if (dying && deathAt < 0) deathAt = t;
      if (!dying) deathAt = -1;

      if (player.hurtUntil > lastHurtUntil) {
        lanternVel += feel.courierLanternSwingDeg * 0.14 * player.facing;
        hemVel += 5;
      }
      lastHurtUntil = player.hurtUntil;

      if (player.grounded && !lastGrounded) {
        squashY = feel.landSquash;
        hemVel -= 7;
        lanternVel -= 2.4;
      } else if (!player.grounded && lastGrounded && player.vel.y > 0) {
        squashY = 2 - feel.jumpSquash;
        jumpAt = t;
      }
      lastGrounded = player.grounded;

      const recover = Math.min(1, Math.max(feel.squashRecoverPerSec, 0) * dt);
      squashY += (1 - squashY) * recover;

      const speed = Math.abs(player.vel.x);
      const forward = clampSigned(
        (player.vel.x * player.facing) / Math.max(live.player.walkSpeed, 0.01)
      );
      const running = player.grounded && speed > 0.4 && !dying;

      if (running) {
        runPhase += dt * feel.legSwingSpeed * (0.45 + 0.55 * Math.abs(forward));
      } else {
        runPhase += dt * feel.legSwingSpeed * 0.15;
      }

      const deathP =
        deathAt < 0
          ? 0
          : clamp01((t - deathAt) / (Math.max(feel.courierDeathCrumpleMs, 1) / 1000));

      let leanTarget = 0;
      if (dying) leanTarget = -THREE.MathUtils.degToRad(70) * deathP;
      else if (hurt) leanTarget = THREE.MathUtils.degToRad(feel.courierHurtRecoilDeg);
      else if (dashing) leanTarget = -THREE.MathUtils.degToRad(feel.courierLeanRunDeg * 1.8);
      else if (!player.grounded)
        leanTarget = -THREE.MathUtils.degToRad(feel.courierLeanAirDeg) * forward;
      else leanTarget = -THREE.MathUtils.degToRad(feel.courierLeanRunDeg) * forward;

      if (attacking && !dying && !hurt) {
        const attackLean = THREE.MathUtils.degToRad(feel.courierLeanAttackDeg);
        if (player.attackPhase === "windup") leanTarget += attackLean;
        else if (player.attackPhase === "active") leanTarget -= attackLean;
      }

      lean += (leanTarget - lean) * Math.min(1, 14 * dt);
      torso.rotation.z = lean;

      const twist = attacking && player.attackDir === "side" ? feel.courierAttackTwistDeg : 0;
      const twistTarget =
        THREE.MathUtils.degToRad(twist) * (player.attackPhase === "windup" ? -1 : 1);
      torso.rotation.y += (twistTarget - torso.rotation.y) * Math.min(1, 16 * dt);

      const breath = dying || running ? 0 : Math.sin(rt * feel.courierBreathSpeed);
      head.rotation.z = -0.04 + breath * feel.courierBreathAmount;

      const swing = THREE.MathUtils.degToRad(feel.legSwingDeg);
      const kneeBend = THREE.MathUtils.degToRad(feel.courierKneeBendDeg);
      if (dying) {
        legLead.hip.rotation.z += (0.9 - legLead.hip.rotation.z) * Math.min(1, 8 * dt);
        legBack.hip.rotation.z += (0.2 - legBack.hip.rotation.z) * Math.min(1, 8 * dt);
        legLead.knee.rotation.z += (-1.5 - legLead.knee.rotation.z) * Math.min(1, 8 * dt);
        legBack.knee.rotation.z += (-1.1 - legBack.knee.rotation.z) * Math.min(1, 8 * dt);
      } else if (!player.grounded) {
        const air = clampSigned(player.vel.y / Math.max(live.player.jumpVelocity, 0.01));
        const leadTarget = 0.34 + air * 0.16;
        const backTarget = -0.4 + air * 0.12;
        legLead.hip.rotation.z += (leadTarget - legLead.hip.rotation.z) * Math.min(1, 12 * dt);
        legBack.hip.rotation.z += (backTarget - legBack.hip.rotation.z) * Math.min(1, 12 * dt);
        legLead.knee.rotation.z += (-0.35 - legLead.knee.rotation.z) * Math.min(1, 12 * dt);
        legBack.knee.rotation.z += (-0.85 - legBack.knee.rotation.z) * Math.min(1, 12 * dt);
      } else if (running) {
        const s = Math.sin(runPhase);
        const c = Math.sin(runPhase + Math.PI);
        legLead.hip.rotation.z = s * swing;
        legBack.hip.rotation.z = c * swing;
        legLead.knee.rotation.z = -Math.max(0, -s) * kneeBend;
        legBack.knee.rotation.z = -Math.max(0, -c) * kneeBend;
      } else {
        legLead.hip.rotation.z *= 0.78;
        legBack.hip.rotation.z *= 0.78;
        legLead.knee.rotation.z *= 0.78;
        legBack.knee.rotation.z *= 0.78;
      }

      legLead.boot.position.y =
        -SHIN_LEN + Math.max(0, -legLead.knee.rotation.z) * feel.courierBootLift;
      legBack.boot.position.y =
        -SHIN_LEN + Math.max(0, -legBack.knee.rotation.z) * feel.courierBootLift;
      legLead.boot.rotation.z = -legLead.hip.rotation.z - legLead.knee.rotation.z;
      legBack.boot.rotation.z = -legBack.hip.rotation.z - legBack.knee.rotation.z;

      let hemTarget = -THREE.MathUtils.degToRad(feel.courierHemSwingDeg) * forward;
      if (running) {
        hemTarget += Math.sin(runPhase) * THREE.MathUtils.degToRad(feel.courierHemSwingDeg) * 0.3;
      }
      if (dying) hemTarget = 0.3;
      const hemK = Math.max(feel.courierHemFollowPerSec, 0.1);
      hemVel += (hemTarget - hemAngle) * hemK * hemK * 0.5 * dt;
      hemVel *= Math.max(0, 1 - hemK * 0.62 * dt);
      hemAngle += hemVel * dt;
      capePivot.rotation.z = hemAngle;
      hoodPivot.rotation.z = hemAngle * HOOD_POINT_SWING;

      const airFlare = player.grounded || dying ? 0 : feel.courierHemFlareAir;
      const flare = dashing ? feel.courierHemFlareAir * 1.5 : airFlare;
      cape.scale.set(1 + flare, 1 - flare * 0.35, 1);

      let lanternTarget = -THREE.MathUtils.degToRad(feel.courierLanternSwingDeg) * forward;
      if (dying) lanternTarget = 0.5;
      const lanK = Math.max(feel.courierLanternFollowPerSec, 0.1);
      lanternVel += (lanternTarget - lanternAngle) * lanK * lanK * 0.42 * dt;
      lanternVel *= Math.max(0, 1 - lanK * 0.5 * dt);
      lanternAngle += lanternVel * dt;
      lanternPivot.rotation.z = lanternAngle - armOff.rotation.z - elbowOff.rotation.z;

      const armSwing = THREE.MathUtils.degToRad(feel.courierArmSwingDeg);
      const attackArm = armAttackAngle(player, t, live);
      let leadArmTarget = attackArm;
      if (!attacking) {
        if (dying) leadArmTarget = -0.6;
        else if (!player.grounded) leadArmTarget = -0.3;
        else if (running) leadArmTarget = -Math.sin(runPhase) * armSwing;
        else leadArmTarget = 0;
      }
      armLead.rotation.z +=
        (leadArmTarget - armLead.rotation.z) * Math.min(1, (attacking ? 30 : 12) * dt);
      elbowLead.rotation.z = attacking ? 0.12 : 0.3 - Math.abs(armLead.rotation.z) * 0.3;

      const offTarget = dying ? 0.7 : running ? 0.2 + Math.sin(runPhase) * armSwing * 0.35 : 0.2;
      armOff.rotation.z += (offTarget - armOff.rotation.z) * Math.min(1, 10 * dt);

      const longwickRatio = player.longwick
        ? live.attack.longwickReach / Math.max(live.attack.reach, 0.01)
        : 1;
      const striking = player.attackPhase === "active";
      const needleLength =
        live.player.height *
        feel.needleRestLengthRatio *
        longwickRatio *
        (striking ? feel.needleActiveStretch : 1);
      needleScale.scale.set(needleLength, 1, 1);

      let base = 0;
      if (player.attackDir === "up") base = Math.PI * 0.5;
      else if (player.attackDir === "down") base = -Math.PI * 0.5;
      const armWorld = armLead.rotation.z + elbowLead.rotation.z;
      if (attacking) {
        weapon.rotation.z = base + needleWorldAngle(player, t, live) - armWorld;
      } else {
        weapon.rotation.z = THREE.MathUtils.degToRad(feel.needleRestDeg) - armWorld * 0.55;
      }

      let scaleY = squashY;
      let scaleXZ = 1 / Math.sqrt(Math.max(squashY, 0.05));
      if (!player.grounded && jumpAt >= 0) {
        const anticipate = Math.max(feel.courierJumpAnticipateMs, 1) / 1000;
        const since = t - jumpAt;
        if (since < anticipate) {
          const p = clamp01(since / anticipate);
          const crouch = feel.courierJumpCrouch + (1 - feel.courierJumpCrouch) * p;
          scaleY *= crouch;
          scaleXZ /= crouch;
        } else {
          const hang =
            1 - clamp01(Math.abs(player.vel.y) / Math.max(live.player.jumpVelocity, 0.01));
          const stretch = 1 + (feel.courierApexStretch - 1) * hang;
          scaleY *= stretch;
          scaleXZ /= stretch;
        }
      }
      if (dashing) {
        scaleXZ *= feel.dashStretch;
        scaleY /= feel.dashStretch;
      }
      if (dying) {
        scaleY *= 1 - 0.42 * deathP;
        scaleXZ *= 1 + 0.16 * deathP;
      }
      if (running) scaleY *= 1 + Math.sin(runPhase * 2) * feel.courierRunBobAmp;

      group.scale.set(scaleXZ * player.facing, scaleY, 1);

      const flicker =
        1 +
        (Math.sin(rt * feel.flickerSpeed) * 0.6 +
          Math.sin(rt * feel.flickerSpeed * 1.73 + 1.1) * 0.4) *
          feel.flickerAmount;

      let lampScale = 1;
      let lampBright = feel.playerEmissive * flicker;
      let lampIntensity = feel.playerLightIntensity * flicker;

      if (dying) {
        const gutter = clamp01((t - deathAt) / (Math.max(feel.courierGutterMs, 1) / 1000));
        const sputter = 1 - gutter + Math.max(0, Math.sin(t * 26)) * (1 - gutter) * 0.5;
        lampScale = Math.max(0.02, sputter);
        lampBright = feel.playerEmissive * sputter;
        lampIntensity = feel.playerLightIntensity * sputter * 0.8;
        flameMat.color.copy(flameBase).lerp(voidColor, clamp01(gutter * 1.1));
        glassMat.color.copy(glassBase).lerp(charcoalBase, clamp01(gutter * 1.15));
      } else {
        flameMat.color.copy(flameBase);
        glassMat.color.copy(glassBase).lerp(WHITE, clamp01((lampBright - 0.5) * 0.7));
      }

      const invulnerable = t < player.invulnerableUntil && !dashing && !dying;
      let bodyTint = 0;
      if (invulnerable) {
        const period = Math.max(feel.blinkPeriodMs, 1) / 1000;
        const on = Math.floor(t / period) % 2 === 0;
        bodyTint = on ? 0 : 0.62;
        lampBright = on ? feel.playerEmissive : feel.blinkEmissive;
        lampIntensity = on ? feel.playerLightIntensity : feel.playerLightIntensity * 0.25;
        glassMat.color.copy(glassBase).lerp(WHITE, clamp01((lampBright - 0.5) * 0.7));
      }

      const lift = clamp01(feel.playerCoatEmissive);
      tint.copy(slateBase).lerp(porcelainBase, lift).lerp(voidColor, bodyTint);
      slateMat.color.copy(tint);
      tint.copy(charcoalBase).lerp(porcelainBase, lift).lerp(voidColor, bodyTint);
      charcoalMat.color.copy(tint);
      tint.copy(dimpleBase).lerp(porcelainBase, lift).lerp(voidColor, bodyTint);
      dimpleMat.color.copy(tint);
      tint.copy(porcelainBase).lerp(voidColor, bodyTint);
      porcelainMat.color.copy(tint);

      flame.scale.set(lampScale, lampScale, 1);
      flame.position.y = flameRestY - (1 - lampScale) * 0.02;
      lanternLight.intensity = lampIntensity;
      lanternLight.distance = feel.playerLightDistance;

      const groundTarget = player.grounded && !dying ? 1 : 0;
      groundFade += (groundTarget - groundFade) * Math.min(1, GROUND_FADE_PER_SEC * dt);

      const glow = clamp01(lampIntensity / Math.max(feel.playerLightIntensity, 0.0001));
      const groupScaleX = scaleXZ * player.facing;
      lamp.scale.set(
        1 / (groupScaleX === 0 ? 1 : groupScaleX),
        1 / Math.max(scaleY, 0.0001),
        1
      );

      lanternLight.updateWorldMatrix(true, false);
      lampWorld.setFromMatrixPosition(lanternLight.matrixWorld);
      const lampX = lampWorld.x - group.position.x;
      const lampY = lampWorld.y - group.position.y;

      const haloSize = Math.max(feel.lanternHaloRadius, 0) * 2;
      halo.position.set(lampX, lampY, LAMP_Z);
      halo.scale.set(haloSize, haloSize, 1);
      const haloOpacity = Math.max(feel.lanternHaloOpacity, 0) * glow;
      haloMat.opacity = haloOpacity;
      halo.visible = haloOpacity > 0.002;

      const beamLength = Math.max(feel.lanternBeamLength, 0);
      beam.position.set(lampX, lampY - beamLength * 0.5, BEAM_Z);
      beam.scale.set(beamLength * BEAM_WIDTH_RATIO, beamLength, 1);
      const beamOpacity = Math.max(feel.lanternBeamOpacity, 0) * glow * groundFade;
      beamMat.opacity = beamOpacity;
      beam.visible = beamOpacity > 0.002;

      const poolWidth = Math.max(feel.lanternPoolWidth, 0);
      const poolHeight = poolWidth * POOL_ASPECT;
      pool.position.set(lampX * 0.35, 0, LAMP_Z);
      pool.scale.set(poolWidth, poolHeight, 1);
      const poolOpacity = Math.max(feel.lanternPoolOpacity, 0) * glow * groundFade;
      poolMat.opacity = poolOpacity;
      pool.visible = poolOpacity > 0.002;
    }
  };
}
