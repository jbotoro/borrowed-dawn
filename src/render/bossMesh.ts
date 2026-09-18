import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { Boss } from "../game/types";
import type { LookProfile } from "./look";
import { applyOutline } from "./look";

export interface BossMesh {
  group: THREE.Group;
  sync(
    boss: Boss | null,
    alpha: number,
    t: number,
    rt: number,
    tuning: Tuning,
    targetX?: number,
    targetY?: number
  ): void;
}

type Point = readonly [number, number];

const WHITE = new THREE.Color(0xffffff);

const LINK_SPACING_REST = 0.075;
const LINK_SPACING_FULL = 0.138;
const LINKS_PER_SEGMENT = 4;
const GLOW_SIZE = 64;
const ARM_LAG = 0.55;
const SWAY_FOLLOW = 0.09;
const HEAD_FOLLOW = 0.07;
const HEAD_TRACK_LIMIT = 0.14;

function glowTexture(): THREE.Texture | null {
  const canvas = document.createElement("canvas");
  canvas.width = GLOW_SIZE;
  canvas.height = GLOW_SIZE;
  const ctx = canvas.getContext("2d");
  if (ctx === null) return null;
  const half = GLOW_SIZE * 0.5;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.16, "rgba(255,255,255,0.7)");
  grad.addColorStop(0.42, "rgba(255,255,255,0.26)");
  grad.addColorStop(0.72, "rgba(255,255,255,0.06)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, GLOW_SIZE, GLOW_SIZE);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const BELL: Point[] = [
  [-0.5, 0.0],
  [-0.497, 0.055],
  [-0.44, 0.12],
  [-0.405, 0.22],
  [-0.392, 0.35],
  [-0.385, 0.46],
  [-0.345, 0.55],
  [-0.25, 0.625],
  [-0.15, 0.66],
  [0.15, 0.66],
  [0.25, 0.625],
  [0.345, 0.55],
  [0.385, 0.46],
  [0.392, 0.35],
  [0.405, 0.22],
  [0.44, 0.12],
  [0.497, 0.055],
  [0.5, 0.0]
];

const BELL_RIM: Point[] = [
  [-0.5, 0.0],
  [0.5, 0.0],
  [0.495, 0.024],
  [-0.495, 0.024]
];

const BELL_BAND_LOW: Point[] = [
  [-0.393, 0.33],
  [0.393, 0.33],
  [0.391, 0.355],
  [-0.391, 0.355]
];

const BELL_BAND_HIGH: Point[] = [
  [-0.377, 0.5],
  [0.377, 0.5],
  [0.366, 0.525],
  [-0.366, 0.525]
];

const CRACK: Point[] = [
  [-0.03, 0.05],
  [0.015, 0.14],
  [-0.015, 0.24],
  [0.03, 0.33],
  [0.0, 0.42],
  [0.045, 0.5],
  [0.085, 0.47],
  [0.04, 0.39],
  [0.075, 0.3],
  [0.03, 0.21],
  [0.06, 0.12],
  [0.022, 0.04]
];

const TORSO: Point[] = [
  [-0.2, 0.52],
  [-0.27, 0.66],
  [-0.3, 0.77],
  [-0.24, 0.85],
  [-0.08, 0.89],
  [0.14, 0.87],
  [0.24, 0.8],
  [0.22, 0.67],
  [0.17, 0.57],
  [0.1, 0.52]
];

const HEAD: Point[] = [
  [-0.16, -0.07],
  [-0.19, 0.03],
  [-0.14, 0.11],
  [0.02, 0.14],
  [0.16, 0.09],
  [0.19, 0.0],
  [0.14, -0.08]
];

const HEAD_VOID: Point[] = [
  [-0.12, -0.05],
  [0.15, -0.05],
  [0.15, 0.09],
  [-0.12, 0.09]
];

const MOUTH: Point[] = [
  [-0.15, 0.035],
  [-0.142, 0.13],
  [-0.08, 0.195],
  [0.08, 0.195],
  [0.142, 0.13],
  [0.15, 0.035]
];

const MOUTH_BAR: Point[] = [
  [-0.011, 0.042],
  [0.011, 0.042],
  [0.011, 0.186],
  [-0.011, 0.186]
];

const MOUTH_BAR_X = [-0.084, 0.0, 0.084];

const YOKE: Point[] = [
  [-0.55, 0.96],
  [0.55, 0.96],
  [0.55, 1.09],
  [0.42, 1.09],
  [0.42, 1.03],
  [-0.42, 1.03],
  [-0.42, 1.09],
  [-0.55, 1.09]
];

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function shapeOf(points: Point[]): THREE.Shape {
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
  return shape;
}

function ringShape(rx: number, ry: number, tx: number, ty: number): THREE.Shape {
  const shape = new THREE.Shape();
  shape.absellipse(0, 0, rx, ry, 0, Math.PI * 2, false, 0);
  const hole = new THREE.Path();
  hole.absellipse(0, 0, Math.max(rx - tx, 0.002), Math.max(ry - ty, 0.002), 0, Math.PI * 2, true, 0);
  shape.holes.push(hole);
  return shape;
}

function discShape(radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  shape.absellipse(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
  return shape;
}

function extrude(shape: THREE.Shape, depth: number): THREE.BufferGeometry {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    curveSegments: 10
  });
  geometry.translate(0, 0, -depth * 0.5);
  return geometry;
}

function centered(geometry: THREE.BufferGeometry): [THREE.BufferGeometry, number, number] {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (box === null) return [geometry, 0, 0];
  const cx = (box.min.x + box.max.x) * 0.5;
  const cy = (box.min.y + box.max.y) * 0.5;
  geometry.translate(-cx, -cy, 0);
  return [geometry, cx, cy];
}

function plate(points: Point[], material: THREE.Material, depth: number): THREE.Mesh {
  const [geometry, cx, cy] = centered(extrude(shapeOf(points), depth));
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(cx, cy, 0);
  return mesh;
}

export function createBossMesh(tuning: Tuning, look: LookProfile): BossMesh {
  const group = new THREE.Group();
  group.name = "boss";
  group.visible = false;

  const depth = tuning.feel.actorPlateDepth;
  const step = tuning.feel.actorPlateStep;
  const zVoid = -2 * step;
  const zShell = -step;
  const zFarArm = 0;
  const zBody = step;
  const zNear = 2 * step;

  const charcoalMat = look.material("bossShell", { unlit: true }) as THREE.MeshBasicMaterial;
  const slateMat = look.material("enemyBody", { unlit: true }) as THREE.MeshBasicMaterial;
  const ashMat = look.material("ash", { unlit: true }) as THREE.MeshBasicMaterial;
  const chainMat = look.material("chain", { unlit: true }) as THREE.MeshBasicMaterial;
  const porcelainMat = look.material("actorMetal", { unlit: true }) as THREE.MeshBasicMaterial;
  const voidMat = look.material("void", { unlit: true, fog: false }) as THREE.MeshBasicMaterial;
  const mouthMat = look.material("bossFurnace", { unlit: true }) as THREE.MeshBasicMaterial;
  const visorMat = look.material("void", { unlit: true }) as THREE.MeshBasicMaterial;
  const crackMat = look.material("bossFurnace", { unlit: true }) as THREE.MeshBasicMaterial;

  for (const mat of [
    charcoalMat,
    slateMat,
    ashMat,
    chainMat,
    porcelainMat,
    mouthMat,
    visorMat,
    crackMat
  ]) {
    mat.fog = false;
    mat.needsUpdate = true;
  }

  const charcoalBase = new THREE.Color(charcoalMat.color);
  const slateBase = new THREE.Color(slateMat.color);
  const ashBase = new THREE.Color(ashMat.color);
  const amber = new THREE.Color(look.colorOf("bossFurnace"));
  const danger = new THREE.Color(look.colorOf("danger"));
  const voidColor = new THREE.Color(look.colorOf("void"));
  const scratch = new THREE.Color();

  const rig = new THREE.Group();
  group.add(rig);

  const yoke = plate(YOKE, charcoalMat, depth * 1.6);
  yoke.position.z = zShell;
  rig.add(yoke);

  const hangSpacing = Math.max(tuning.feel.bellChainSpacing, 0.05);
  const hangLinkGeometry = centered(
    extrude(ringShape(0.058, hangSpacing * 0.54, 0.022, 0.026), depth * 0.7)
  )[0];
  const armLinkGeometry = centered(extrude(ringShape(0.052, 0.072, 0.02, 0.024), depth * 0.7))[0];
  const clapperGeometry = centered(extrude(discShape(0.095), depth))[0];
  const clapperRimGeometry = centered(extrude(ringShape(0.11, 0.11, 0.022, 0.022), depth * 0.7))[0];

  const chain = new THREE.Group();
  chain.position.set(0, 1.06, zShell);
  rig.add(chain);
  const links = Math.max(2, Math.round(tuning.feel.bellChainLinks));
  for (let i = 0; i < links; i++) {
    const link = new THREE.Mesh(hangLinkGeometry, chainMat);
    link.position.set(0, i * hangSpacing, 0);
    link.scale.x = i % 2 === 0 ? 1 : 0.45;
    chain.add(link);
  }

  const bodyLift = new THREE.Object3D();
  rig.add(bodyLift);

  const shortChains: THREE.Object3D[] = [];
  for (const sx of [-0.28, 0.28]) {
    const holder = new THREE.Object3D();
    holder.position.set(sx, 0.98, zShell);
    rig.add(holder);
    for (let i = 0; i < 3; i++) {
      const link = new THREE.Mesh(armLinkGeometry, chainMat);
      link.position.set(0, -0.06 - i * 0.085, 0);
      link.scale.x = i % 2 === 0 ? 1 : 0.45;
      holder.add(link);
    }
    shortChains.push(holder);
  }

  const shellPivot = new THREE.Object3D();
  bodyLift.add(shellPivot);

  const shellScale = new THREE.Object3D();
  shellPivot.add(shellScale);

  const bell = plate(BELL, charcoalMat, depth);
  bell.position.z = zShell;
  shellScale.add(bell);

  const bellRim = plate(BELL_RIM, porcelainMat, depth * 0.8);
  bellRim.position.z = zShell + depth * 0.7;
  shellScale.add(bellRim);

  const bandLow = plate(BELL_BAND_LOW, porcelainMat, depth * 0.8);
  bandLow.position.z = zShell + depth * 0.7;
  shellScale.add(bandLow);

  const bandHigh = plate(BELL_BAND_HIGH, porcelainMat, depth * 0.8);
  bandHigh.position.z = zShell + depth * 0.7;
  shellScale.add(bandHigh);

  const crackBack = plate(CRACK, voidMat, depth * 0.8);
  const crackRestX = crackBack.position.x;
  const crackRestY = crackBack.position.y;
  crackBack.position.z = zVoid;
  shellScale.add(crackBack);

  const crackGlow = plate(CRACK, crackMat, depth * 0.7);
  crackGlow.position.z = zVoid + depth * 0.5;
  crackGlow.visible = false;
  shellScale.add(crackGlow);

  const torso = plate(TORSO, slateMat, depth);
  torso.position.z = zBody;
  shellScale.add(torso);

  const mouthVoid = plate(MOUTH, voidMat, depth * 0.8);
  mouthVoid.position.z = zNear + depth * 0.5;
  shellScale.add(mouthVoid);

  const mouthHeat = plate(MOUTH, mouthMat, depth * 0.7);
  mouthHeat.position.z = zNear + depth * 1.05;
  mouthHeat.scale.set(0.86, 0.8, 1);
  shellScale.add(mouthHeat);

  for (const bx of MOUTH_BAR_X) {
    const bar = plate(MOUTH_BAR, porcelainMat, depth * 0.6);
    bar.position.x += bx;
    bar.position.z = zNear + depth * 1.6;
    shellScale.add(bar);
  }

  const headPivot = new THREE.Object3D();
  headPivot.position.set(0.0, 0.89, 0);
  shellScale.add(headPivot);

  const headVoid = plate(HEAD_VOID, visorMat, depth * 0.7);
  headVoid.position.z = zBody + depth * 0.4;
  headPivot.add(headVoid);

  const headShape = shapeOf(HEAD);
  for (const sx of [-0.06, 0.02, 0.1]) {
    const slit = new THREE.Path();
    slit.moveTo(sx - 0.013, -0.035);
    slit.lineTo(sx + 0.013, -0.035);
    slit.lineTo(sx + 0.013, 0.075);
    slit.lineTo(sx - 0.013, 0.075);
    slit.closePath();
    headShape.holes.push(slit);
  }
  const headParts = centered(extrude(headShape, depth));
  const headPlate = new THREE.Mesh(headParts[0], ashMat);
  headPlate.position.set(headParts[1], headParts[2], zBody + depth);
  headPivot.add(headPlate);

  interface Arm {
    pivot: THREE.Object3D;
    links: THREE.Mesh[];
    elbow: THREE.Object3D;
    clapper: THREE.Object3D;
  }

  function buildArm(x: number, y: number, z: number, material: THREE.MeshBasicMaterial): Arm {
    const pivot = new THREE.Object3D();
    pivot.position.set(x, y, z);
    shellScale.add(pivot);

    const pin = new THREE.Mesh(
      centered(extrude(discShape(tuning.feel.actorPinRadius), depth * 0.6))[0],
      porcelainMat
    );
    pin.position.z = depth * 0.7;
    pivot.add(pin);

    const armLinks: THREE.Mesh[] = [];
    for (let i = 0; i < LINKS_PER_SEGMENT; i++) {
      const link = new THREE.Mesh(armLinkGeometry, material);
      link.rotation.z = Math.PI * 0.5;
      link.scale.x = i % 2 === 0 ? 1 : 0.45;
      pivot.add(link);
      armLinks.push(link);
    }

    const elbow = new THREE.Object3D();
    pivot.add(elbow);
    const elbowPin = new THREE.Mesh(
      centered(extrude(discShape(tuning.feel.actorPinRadius), depth * 0.6))[0],
      porcelainMat
    );
    elbowPin.position.z = depth * 0.7;
    elbow.add(elbowPin);

    for (let i = 0; i < LINKS_PER_SEGMENT; i++) {
      const link = new THREE.Mesh(armLinkGeometry, material);
      link.rotation.z = Math.PI * 0.5;
      link.scale.x = i % 2 === 0 ? 1 : 0.45;
      elbow.add(link);
      armLinks.push(link);
    }

    const clapper = new THREE.Object3D();
    elbow.add(clapper);
    const head = new THREE.Mesh(clapperGeometry, slateMat);
    clapper.add(head);
    const rim = new THREE.Mesh(clapperRimGeometry, porcelainMat);
    rim.position.z = depth * 0.7;
    clapper.add(rim);

    return { pivot, links: armLinks, elbow, clapper };
  }

  const armFar = buildArm(-0.06, 0.77, zFarArm, ashMat);
  const armLead = buildArm(0.1, 0.79, zNear, porcelainMat);

  const furnaceLight = new THREE.PointLight(look.colorOf("bossFurnace"), 0, 1, 2);
  group.add(furnaceLight);

  const furnaceGlowMat = new THREE.MeshBasicMaterial({
    color: look.colorOf("bossFurnace"),
    map: glowTexture(),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false
  });
  const furnaceGlow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), furnaceGlowMat);
  furnaceGlow.frustumCulled = false;
  furnaceGlow.layers.set(look.actorLayer);
  furnaceGlow.visible = false;
  group.add(furnaceGlow);

  rig.traverse((node) => {
    const mesh = node as THREE.Mesh;
    if (mesh.isMesh === true) mesh.layers.set(look.actorLayer);
  });
  applyOutline(rig, tuning.feel.outlineThickness, look);

  function progress(boss: Boss, t: number): number {
    return clamp01((t - boss.stateStart) / (boss.stateUntil - boss.stateStart));
  }

  function layoutArm(
    arm: Arm,
    angle: number,
    extend: number,
    amp: number,
    phase: number
  ): void {
    const spacing = LINK_SPACING_REST + (LINK_SPACING_FULL - LINK_SPACING_REST) * clamp01(extend);
    const s0 = Math.sin(phase);
    const s1 = Math.sin(phase - ARM_LAG);
    const s2 = Math.sin(phase - ARM_LAG * 2);
    arm.pivot.rotation.z = angle + amp * s0;
    arm.elbow.rotation.z = amp * 0.85 * (s1 - s0);
    let index = 0;
    for (const link of arm.links) {
      const inSegment = index % LINKS_PER_SEGMENT;
      link.position.x = (inSegment + 0.5) * spacing;
      link.rotation.z = Math.PI * 0.5 + amp * 0.55 * Math.sin(phase - 0.2 * (index + 1));
      index++;
    }
    arm.elbow.position.x = LINKS_PER_SEGMENT * spacing;
    const tipReach = LINKS_PER_SEGMENT * spacing + 0.11;
    const tipAngle = amp * 0.75 * (s2 - s1);
    arm.clapper.position.set(Math.cos(tipAngle) * tipReach, Math.sin(tipAngle) * tipReach, 0);
  }

  let swayLevel = 1;
  let headTrack = 0;

  return {
    group,

    sync(
      boss: Boss | null,
      alpha: number,
      t: number,
      rt: number,
      live: Tuning,
      targetX?: number,
      targetY?: number
    ): void {
      if (boss === null) {
        group.visible = false;
        furnaceGlow.visible = false;
        return;
      }
      group.visible = true;

      const feel = live.feel;
      const cfg = live.boss;
      const x = boss.prev.x + (boss.pos.x - boss.prev.x) * alpha;
      const y = boss.prev.y + (boss.pos.y - boss.prev.y) * alpha;

      const tilt = THREE.MathUtils.degToRad(feel.bossShellTiltDeg);
      const swing = THREE.MathUtils.degToRad(feel.bossArmSwingDeg);
      const armRest = THREE.MathUtils.degToRad(feel.bellArmRestDeg);

      let shellLift = boss.phase === 2 ? feel.bossShellLift * 0.35 : 0;
      let shellTilt = 0;
      let compress = 1;
      let leadAngle = armRest;
      let farAngle = armRest + 0.14;
      let leadExtend = 0;
      let farExtend = 0;
      let headSag = 0.14;
      let visorHot = 0;
      let visorEmber = 0;
      let mouthHeat = 0;
      let swayTarget = 0;
      let armSlack = 0;
      let mouthGlow = feel.bossFurnaceEmissive * (boss.phase === 2 ? 0.9 : 0.6);
      const breath =
        1 +
        Math.sin(rt * feel.bellBreathSpeed) * feel.bellBreathAmount * (boss.phase === 2 ? 1.4 : 1);
      const toll = Math.sin(rt * feel.bellBreathSpeed * 0.72);

      if (boss.state === "dormant") {
        headSag = 0.34;
        mouthGlow *= 0.7;
        visorEmber = 0.2;
        swayTarget = 1;
        shellTilt = THREE.MathUtils.degToRad(feel.bellRockDeg) * 0.12 * toll;
      } else if (boss.state === "idle") {
        headSag = 0.14 - Math.sin(rt * feel.bellBreathSpeed) * 0.018;
        mouthGlow *= breath;
        visorEmber = 0.34 + 0.12 * toll;
        swayTarget = 1;
        shellTilt = THREE.MathUtils.degToRad(feel.bellRockDeg) * 0.18 * toll;
      } else if (boss.state === "sweepTelegraph") {
        const p = progress(boss, t);
        shellTilt = tilt * p;
        leadAngle = armRest + (swing - armRest) * (p * p);
        leadExtend = 0.3 * p;
        headSag = 0.14 - 0.12 * p;
        visorHot = 0.35 + 0.65 * p;
        mouthHeat = p;
        mouthGlow = feel.bossFurnaceEmissive * (0.6 + feel.bellMouthFlare * p);
      } else if (boss.state === "sweepActive") {
        const p = progress(boss, t);
        shellTilt = tilt * (1 - p);
        leadAngle = swing + (-swing * 0.4 - swing) * Math.pow(p, 0.55);
        leadExtend = 0.3 + 0.7 * Math.pow(p, 0.4);
        headSag = 0.02;
        visorHot = 1;
        mouthHeat = 1;
        mouthGlow = feel.bossFurnaceEmissive * (1 + feel.bellMouthFlare);
      } else if (boss.state === "sweepRecover") {
        const p = progress(boss, t);
        leadAngle = -swing * 0.4 + (armRest + swing * 0.4) * p;
        leadExtend = 1 - p;
        headSag = 0.38 - 0.24 * p;
        visorHot = 0;
        mouthHeat = 1 - p;
        shellTilt =
          -THREE.MathUtils.degToRad(feel.bellRockDeg) * Math.sin(p * Math.PI * 3) * (1 - p);
        mouthGlow = feel.bossFurnaceEmissive * (0.9 + 0.6 * (1 - p)) * breath;
      } else if (boss.state === "stompTelegraph") {
        const p = progress(boss, t);
        compress = 1 - (1 - feel.bellCompress) * p;
        leadAngle = armRest + (swing * 0.75 - armRest) * p;
        farAngle = armRest + (swing * 0.75 - armRest) * p;
        leadExtend = 0.25 * p;
        farExtend = 0.25 * p;
        headSag = 0.14 - 0.1 * p;
        visorHot = p;
        mouthHeat = p;
        mouthGlow = feel.bossFurnaceEmissive * (0.6 + feel.bellMouthFlare * p);
      } else if (boss.state === "stompRise") {
        const p = progress(boss, t);
        compress = feel.bellCompress + (1.06 - feel.bellCompress) * p;
        shellLift += feel.bossShellLift * p;
        leadAngle = swing * 0.75;
        farAngle = swing * 0.75;
        leadExtend = 0.25;
        farExtend = 0.25;
        headSag = 0.02;
        visorHot = 1;
        mouthHeat = 1;
        mouthGlow = feel.bossFurnaceEmissive * (1 + feel.bellMouthFlare);
      } else if (boss.state === "stompSlam") {
        const p = progress(boss, t);
        compress = 1.06 - 0.24 * p;
        shellLift += feel.bossShellLift * (1 - p);
        leadAngle = swing * 0.75 + (-swing * 0.55 - swing * 0.75) * p;
        farAngle = leadAngle;
        leadExtend = 0.25 + 0.4 * p;
        farExtend = leadExtend;
        headSag = 0.1 + 0.2 * p;
        visorHot = 1;
        mouthHeat = 1;
        mouthGlow = feel.bossFurnaceEmissive * (1 + feel.bellMouthFlare * 1.4);
      } else if (boss.state === "stompRecover") {
        const p = progress(boss, t);
        compress = 0.82 + 0.18 * clamp01(p * 3);
        shellTilt =
          THREE.MathUtils.degToRad(feel.bellRockDeg) *
          Math.sin(p * Math.PI * feel.bellRockSpeed) *
          (1 - p);
        leadAngle = -swing * 0.55 + (armRest + swing * 0.55) * clamp01(p * 1.6);
        farAngle = leadAngle;
        leadExtend = 0.65 * (1 - clamp01(p * 1.6));
        farExtend = leadExtend;
        headSag = 0.32 - 0.18 * p;
        visorHot = 0;
        mouthHeat = 1 - clamp01(p * 2);
        mouthGlow = feel.bossFurnaceEmissive * (0.7 + 0.5 * (1 - p)) * breath;
      } else if (boss.state === "crack") {
        const p = progress(boss, t);
        shellLift = feel.bossShellLift * p;
        shellTilt = tilt * 0.7 * p;
        headSag = 0.14 - 0.12 * p;
        visorHot = p;
        mouthHeat = p * 0.6;
        mouthGlow = feel.bossFurnaceEmissive * (0.8 + 1.1 * p);
      } else if (boss.state === "dead") {
        const age = Math.max(t - boss.stateStart, 0);
        const decay = Math.exp(-age * 1.05);
        armSlack =
          THREE.MathUtils.degToRad(feel.bellArmSwayDeg) * 2.6 * decay * Math.sin(age * 5.4);
        shellLift = 0;
        shellTilt = tilt * 0.4;
        compress = 0.94;
        leadAngle = armRest - 0.25 + armSlack;
        farAngle = armRest - 0.18 + armSlack * 0.78;
        headSag = 0.44;
        visorHot = 0;
        mouthHeat = 0;
        mouthGlow = feel.bossFurnaceEmissive * 0.7 * breath;
      }

      group.position.set(x, y, 0);
      rig.scale.set(cfg.width * boss.facing, cfg.height, 1);

      bodyLift.position.y = shellLift;
      shellPivot.position.set(0, 0.24, 0);
      shellPivot.rotation.z = -shellTilt;
      shellScale.position.set(0, -0.24, 0);
      shellScale.scale.set(1 + (1 - compress) * 0.4, compress, 1);

      const reachUnits = cfg.sweepReach / Math.max(cfg.width, 0.1);
      const fullSpan = LINKS_PER_SEGMENT * 2 * LINK_SPACING_FULL + 0.11;
      const extendScale = clamp01(reachUnits / Math.max(fullSpan, 0.01));
      swayLevel += (swayTarget - swayLevel) * SWAY_FOLLOW;
      const swayAmp = THREE.MathUtils.degToRad(feel.bellArmSwayDeg) * swayLevel;
      const swayPhase = rt * feel.bellArmSwaySpeed;
      layoutArm(armLead, leadAngle, leadExtend * extendScale, swayAmp, swayPhase);
      layoutArm(armFar, farAngle, farExtend * extendScale, swayAmp * 0.85, swayPhase + 0.9);

      let trackTarget = 0;
      if (
        targetX !== undefined &&
        targetY !== undefined &&
        (boss.state === "idle" || boss.state === "dormant")
      ) {
        const headY = y + cfg.height * 0.78;
        const dx = Math.abs(targetX - x) + 0.6;
        const raw = Math.atan2(targetY + 0.6 - headY, dx);
        trackTarget = raw < -HEAD_TRACK_LIMIT ? -HEAD_TRACK_LIMIT : raw > HEAD_TRACK_LIMIT ? HEAD_TRACK_LIMIT : raw;
      }
      headTrack += (trackTarget - headTrack) * HEAD_FOLLOW;
      headPivot.rotation.z = -headSag + headTrack;

      const cracked = boss.phase === 2 || boss.state === "crack" || boss.state === "dead";
      crackGlow.visible = cracked;
      if (cracked) {
        const open = boss.state === "crack" ? progress(boss, t) : 1;
        crackGlow.scale.set(0.5 + 1.1 * open, 1, 1);
        crackBack.scale.set(0.5 + 1.1 * open, 1, 1);
      } else {
        crackBack.scale.set(1, 1, 1);
      }
      crackBack.position.set(crackRestX, crackRestY, zVoid);

      const flash = boss.flash < 0 ? 0 : boss.flash > 1 ? 1 : boss.flash;
      const flashStep = flash > 0.62 ? 1 : flash > 0.26 ? 0.5 : 0;
      const whiten = Math.min(1, flashStep * feel.telegraphEmissive);

      const hot =
        boss.phase === 2 ||
        boss.state === "sweepTelegraph" ||
        boss.state === "sweepActive" ||
        boss.state === "stompTelegraph" ||
        boss.state === "stompRise" ||
        boss.state === "stompSlam" ||
        boss.state === "crack";
      const shimmerSpeed = feel.bellBreathSpeed * (hot ? 5.2 : 2.4);
      const shimmer =
        (Math.sin(rt * shimmerSpeed) * 0.62 + Math.sin(rt * shimmerSpeed * 1.87 + 1.1) * 0.38) *
        feel.bossFurnaceShimmer *
        (hot ? 1.5 : 1);

      scratch
        .copy(amber)
        .lerp(danger, mouthHeat)
        .multiplyScalar(1 + shimmer * 0.3)
        .lerp(WHITE, whiten);
      mouthMat.color.copy(scratch);

      scratch.copy(voidColor).lerp(amber, visorEmber).lerp(danger, visorHot);
      visorMat.color.copy(scratch);

      scratch.copy(charcoalBase).lerp(WHITE, whiten);
      charcoalMat.color.copy(scratch);
      scratch.copy(slateBase).lerp(WHITE, whiten);
      slateMat.color.copy(scratch);
      scratch.copy(ashBase).lerp(WHITE, whiten);
      ashMat.color.copy(scratch);

      const crackHeat =
        boss.state === "crack"
          ? 0.5 + 0.45 * progress(boss, t)
          : boss.state === "dead"
            ? 0.55
            : 0.82;
      scratch.setHex(look.heat(crackHeat));
      crackMat.color.copy(scratch).lerp(WHITE, Math.min(1, feel.bellHeatEmissive * 0.3));

      const pulse = 1 + shimmer * 0.28;
      furnaceLight.color.copy(amber).lerp(danger, mouthHeat);
      furnaceLight.intensity = Math.max(mouthGlow * pulse, 0) * feel.bossFurnaceLightScale;
      furnaceLight.distance = cfg.width * feel.bossFurnaceLightRange;
      furnaceLight.position.set(0, cfg.height * 0.1, cfg.width * 0.2);

      const glowBoost = boss.phase === 2 ? 1.35 : 1;
      const glowSize =
        Math.max(feel.bossFurnaceGlowRadius, 0) * 2 * (1 + shimmer * 0.16) * glowBoost;
      const glowOpacity = Math.min(clamp01(mouthGlow * 1.05 * pulse * glowBoost), 0.42);
      furnaceGlowMat.color.copy(amber).lerp(danger, mouthHeat);
      furnaceGlowMat.opacity = glowOpacity;
      furnaceGlow.scale.set(glowSize, glowSize, 1);
      furnaceGlow.position.set(0, cfg.height * (shellLift + 0.115), cfg.width * 0.08);
      furnaceGlow.visible = glowOpacity > 0.004 && glowSize > 0.01;

      const sway = THREE.MathUtils.degToRad(feel.chainSwayDeg) * 0.25;
      const swayAngle = Math.sin(rt * feel.chainSwaySpeed) * sway + shellTilt * 0.3;
      chain.rotation.z = swayAngle;
      for (const holder of shortChains) holder.rotation.z = swayAngle * 0.6;
    }
  };
}
