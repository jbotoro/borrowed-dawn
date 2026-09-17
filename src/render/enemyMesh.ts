import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { Enemy, EnemyKind } from "../game/types";
import type { LookProfile } from "./look";
import { applyOutline } from "./look";

export interface EnemyMeshes {
  group: THREE.Group;
  sync(enemies: Enemy[], alpha: number, t: number, tuning: Tuning): void;
}

type Point = readonly [number, number];

const WHITE = new THREE.Color(0xffffff);

const GUARD_BODY: Point[] = [
  [-0.3, 0.3],
  [-0.33, 0.5],
  [-0.3, 0.66],
  [-0.22, 0.74],
  [0.14, 0.74],
  [0.28, 0.68],
  [0.33, 0.52],
  [0.3, 0.34],
  [0.14, 0.22],
  [-0.12, 0.24]
];

const GUARD_HELM: Point[] = [
  [-0.2, 0.7],
  [-0.23, 0.83],
  [-0.16, 0.94],
  [0.03, 0.98],
  [0.19, 0.92],
  [0.24, 0.8],
  [0.19, 0.7]
];

const GUARD_VISOR: Point[] = [
  [-0.15, 0.81],
  [0.19, 0.815],
  [0.2, 0.865],
  [-0.15, 0.86]
];

const GUARD_VISOR_BACK: Point[] = [
  [-0.18, 0.79],
  [0.23, 0.795],
  [0.24, 0.885],
  [-0.18, 0.88]
];

const GUARD_GORGET: Point[] = [
  [-0.235, 0.685],
  [0.235, 0.685],
  [0.27, 0.735],
  [-0.2, 0.735]
];

const GUARD_LEG: Point[] = [
  [-0.075, 0.02],
  [0.075, 0.02],
  [0.085, -0.16],
  [0.145, -0.19],
  [0.15, -0.27],
  [-0.115, -0.27],
  [-0.11, -0.18],
  [-0.085, -0.15]
];

const GUARD_ARM: Point[] = [
  [-0.055, 0.03],
  [0.055, 0.03],
  [0.048, -0.24],
  [-0.048, -0.24]
];

const GUARD_BLADE: Point[] = [
  [0.0, 0.055],
  [0.3, 0.095],
  [0.35, 0.005],
  [0.28, -0.05],
  [0.0, -0.05]
];

const GUARD_BLADE_EDGE: Point[] = [
  [0.0, -0.05],
  [0.28, -0.05],
  [0.35, 0.005],
  [0.3, 0.012],
  [0.26, -0.022],
  [0.0, -0.022]
];

const STOMPER_DRUM: Point[] = [
  [-0.38, 0.3],
  [-0.4, 0.78],
  [-0.32, 0.9],
  [0.32, 0.9],
  [0.4, 0.78],
  [0.4, 0.3],
  [0.32, 0.22],
  [-0.32, 0.22]
];

const STOMPER_BAND_LOW: Point[] = [
  [-0.4, 0.4],
  [0.4, 0.4],
  [0.4, 0.435],
  [-0.4, 0.435]
];

const STOMPER_BAND_HIGH: Point[] = [
  [-0.4, 0.72],
  [0.4, 0.72],
  [0.4, 0.755],
  [-0.4, 0.755]
];

const STOMPER_CHIMNEY: Point[] = [
  [-0.1, 0.86],
  [0.1, 0.86],
  [0.09, 1.0],
  [-0.09, 1.0]
];

const STOMPER_GLOW: Point[] = [
  [-0.15, 0.0],
  [0.15, 0.0],
  [0.2, 0.25],
  [-0.2, 0.25]
];

const STOMPER_FOOT: Point[] = [
  [-0.11, 0.24],
  [0.11, 0.24],
  [0.13, 0.05],
  [0.13, 0.0],
  [-0.13, 0.0],
  [-0.13, 0.05]
];

const STOMPER_TOE: Point[] = [
  [-0.13, 0.0],
  [0.13, 0.0],
  [0.13, 0.035],
  [-0.13, 0.035]
];

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function flashStep(flash: number): number {
  if (flash > 0.62) return 1;
  if (flash > 0.26) return 0.5;
  return 0;
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

function plate(
  points: Point[],
  material: THREE.Material,
  depth: number,
  holes?: THREE.Path[]
): THREE.Mesh {
  const geometry = new THREE.ExtrudeGeometry(shapeOf(points, holes), {
    depth,
    bevelEnabled: false,
    curveSegments: 8
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

interface EnemyView {
  id: number;
  kind: EnemyKind;
  group: THREE.Group;
  stack: THREE.Object3D;
  lean: THREE.Object3D;
  body: THREE.Object3D;
  head: THREE.Object3D | null;
  arm: THREE.Object3D | null;
  hips: THREE.Object3D[];
  feet: THREE.Object3D[];
  slateMat: THREE.MeshBasicMaterial;
  ashMat: THREE.MeshBasicMaterial;
  accentMat: THREE.MeshBasicMaterial;
  slateBase: THREE.Color;
  ashBase: THREE.Color;
  accentBase: THREE.Color;
  accentHot: THREE.Color;
  deadAt: number;
  squash: number;
  phase: number;
  seen: boolean;
  wasGrounded: boolean;
}

export function createEnemyMeshes(tuning: Tuning, look: LookProfile): EnemyMeshes {
  const group = new THREE.Group();
  group.name = "enemies";

  const depth = tuning.feel.actorPlateDepth;
  const step = tuning.feel.actorPlateStep;

  const porcelainMat = look.material("actorMetal", { unlit: true }) as THREE.MeshBasicMaterial;
  const pinGeometry = new THREE.CircleGeometry(tuning.feel.actorPinRadius, 12);

  const slateProto = look.material("enemyBody", { unlit: true }) as THREE.MeshBasicMaterial;
  const ashProto = look.material("ash", { unlit: true }) as THREE.MeshBasicMaterial;
  const visorRest = new THREE.Color(look.colorOf("ash", tuning.feel.guardVisorRestShade));
  const visorHot = new THREE.Color(look.colorOf("enemyAccent"));
  const glowRest = new THREE.Color(look.colorOf("reward"));
  const glowHot = new THREE.Color(look.colorOf("danger"));

  const views: EnemyView[] = [];
  const scratch = new THREE.Color();

  function pin(x: number, y: number, z: number): THREE.Mesh {
    const mesh = new THREE.Mesh(pinGeometry, porcelainMat);
    mesh.position.set(x, y, z);
    return mesh;
  }

  function buildGuard(): EnemyView {
    const root = new THREE.Group();
    const stack = new THREE.Object3D();
    root.add(stack);
    const lean = new THREE.Object3D();
    lean.position.set(0, 0.24, 0);
    stack.add(lean);

    const slateMat = slateProto.clone();
    const ashMat = ashProto.clone();
    const accentMat = slateProto.clone();
    accentMat.color.copy(visorRest);

    const body = new THREE.Object3D();
    body.position.set(0, -0.24, 0);
    lean.add(body);

    const bodyPlate = plate(GUARD_BODY, slateMat, depth);
    body.add(bodyPlate);

    const gorget = plate(GUARD_GORGET, porcelainMat, depth * 0.8);
    gorget.position.z = step;
    body.add(gorget);

    const rivetX: number[] = [-0.17, 0.0, 0.17];
    for (const rx of rivetX) body.add(pin(rx, 0.44, depth * 0.6));

    const head = new THREE.Object3D();
    head.position.set(0, 0.72, 0);
    body.add(head);
    const helmPlate = plate(GUARD_HELM, ashMat, depth, [pathOf(GUARD_VISOR)]);
    helmPlate.position.y -= 0.72;
    head.add(helmPlate);
    const visorBackHead = plate(GUARD_VISOR_BACK, accentMat, depth * 0.55);
    visorBackHead.position.y -= 0.72;
    visorBackHead.position.z = -step * 0.6;
    head.add(visorBackHead);

    const hips: THREE.Object3D[] = [];
    const legSpecs: [number, number, THREE.MeshBasicMaterial][] = [
      [-0.13, -step, slateMat],
      [0.13, step, ashMat]
    ];
    for (const [lx, lz, mat] of legSpecs) {
      const hip = new THREE.Object3D();
      hip.position.set(lx, 0.27, lz);
      stack.add(hip);
      hip.add(plate(GUARD_LEG, mat, depth));
      hips.push(hip);
    }

    const arm = new THREE.Object3D();
    arm.position.set(0.1, 0.62, step);
    body.add(arm);
    arm.add(plate(GUARD_ARM, ashMat, depth));
    arm.add(pin(0, 0, depth * 0.6));

    const hand = new THREE.Object3D();
    hand.position.set(0, -0.24, step);
    arm.add(hand);
    hand.rotation.z = -0.4;
    hand.add(plate(GUARD_BLADE, accentMat, depth));
    const bladeEdge = plate(GUARD_BLADE_EDGE, porcelainMat, depth * 0.7);
    bladeEdge.position.z = depth * 0.7;
    hand.add(bladeEdge);

    group.add(root);
    root.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (mesh.isMesh === true) mesh.layers.set(look.actorLayer);
    });
    applyOutline(root, tuning.feel.outlineThickness, look);

    return {
      id: -1,
      kind: "guard",
      group: root,
      stack,
      lean,
      body,
      head,
      arm,
      hips,
      feet: [],
      slateMat,
      ashMat,
      accentMat,
      slateBase: new THREE.Color(slateProto.color),
      ashBase: new THREE.Color(ashProto.color),
      accentBase: visorRest,
      accentHot: visorHot,
      deadAt: 0,
      squash: 1,
      phase: 0,
      seen: false,
      wasGrounded: true
    };
  }

  function buildStomper(): EnemyView {
    const root = new THREE.Group();
    const stack = new THREE.Object3D();
    root.add(stack);
    const lean = new THREE.Object3D();
    lean.position.set(0, 0.22, 0);
    stack.add(lean);

    const slateMat = slateProto.clone();
    const ashMat = ashProto.clone();
    const accentMat = slateProto.clone();
    accentMat.color.copy(glowRest);

    const body = new THREE.Object3D();
    body.position.set(0, -0.22, 0);
    lean.add(body);

    body.add(plate(STOMPER_DRUM, slateMat, depth));

    const bandLow = plate(STOMPER_BAND_LOW, porcelainMat, depth * 0.8);
    bandLow.position.z = step;
    body.add(bandLow);
    const bandHigh = plate(STOMPER_BAND_HIGH, porcelainMat, depth * 0.8);
    bandHigh.position.z = step;
    body.add(bandHigh);

    const chimney = plate(STOMPER_CHIMNEY, ashMat, depth);
    body.add(chimney);

    const rivets = Math.max(2, Math.round(tuning.feel.boilerRivets));
    for (let i = 0; i < rivets; i++) {
      const rx = -0.28 + (0.56 * i) / Math.max(rivets - 1, 1);
      body.add(pin(rx, 0.56, depth * 0.6));
    }

    const glow = plate(STOMPER_GLOW, accentMat, depth * 0.7);
    glow.position.z = -step;
    body.add(glow);

    const feet: THREE.Object3D[] = [];
    const footX: number[] = [-0.24, 0.24];
    for (const fx of footX) {
      const foot = new THREE.Object3D();
      foot.position.set(fx, 0, step);
      stack.add(foot);
      foot.add(plate(STOMPER_FOOT, ashMat, depth));
      const toe = plate(STOMPER_TOE, porcelainMat, depth * 0.7);
      toe.position.z = depth * 0.7;
      foot.add(toe);
      feet.push(foot);
    }

    group.add(root);
    root.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (mesh.isMesh === true) mesh.layers.set(look.actorLayer);
    });
    applyOutline(root, tuning.feel.outlineThickness, look);

    return {
      id: -1,
      kind: "stomper",
      group: root,
      stack,
      lean,
      body,
      head: null,
      arm: null,
      hips: [],
      feet,
      slateMat,
      ashMat,
      accentMat,
      slateBase: new THREE.Color(slateProto.color),
      ashBase: new THREE.Color(ashProto.color),
      accentBase: glowRest,
      accentHot: glowHot,
      deadAt: 0,
      squash: 1,
      phase: 0,
      seen: false,
      wasGrounded: true
    };
  }

  function acquire(enemy: Enemy): EnemyView {
    for (const view of views) {
      if (view.id === enemy.id && view.kind === enemy.kind) return view;
    }
    for (const view of views) {
      if (!view.seen && view.kind === enemy.kind && view.id === -1) {
        view.id = enemy.id;
        view.deadAt = 0;
        return view;
      }
    }
    const created = enemy.kind === "guard" ? buildGuard() : buildStomper();
    created.id = enemy.id;
    views.push(created);
    return created;
  }

  let lastT = 0;

  return {
    group,

    sync(enemies: Enemy[], alpha: number, t: number, live: Tuning): void {
      const feel = live.feel;
      const dt = Math.max(0, Math.min(t - lastT, 0.1));
      lastT = t;
      const follow = Math.min(1, 26 * dt);
      for (const view of views) view.seen = false;

      for (const enemy of enemies) {
        const view = acquire(enemy);
        view.seen = true;

        const size = enemy.kind === "guard" ? live.guard : live.stomper;
        const x = enemy.prev.x + (enemy.pos.x - enemy.prev.x) * alpha;
        const y = enemy.prev.y + (enemy.pos.y - enemy.prev.y) * alpha;

        let fade = 1;
        if (!enemy.alive || enemy.state === "dead") {
          if (view.deadAt === 0) view.deadAt = t;
          const life = Math.max(feel.enemyDeathFadeMs, 1) / 1000;
          fade = 1 - (t - view.deadAt) / life;
          if (fade <= 0) {
            view.group.visible = false;
            continue;
          }
        } else {
          view.deadAt = 0;
        }

        const flash = enemy.flash < 0 ? 0 : enemy.flash > 1 ? 1 : enemy.flash;
        const step2 = flashStep(flash);
        const recoil = step2 * feel.enemyRecoilDistance * -enemy.facing;

        view.group.visible = true;
        view.group.position.set(x + recoil, y, 0);
        view.stack.scale.z = 0.2 + 0.8 * fade;
        view.stack.position.z = -(1 - fade) * step;

        if (enemy.kind === "stomper") {
          const landed = enemy.grounded && !view.wasGrounded;
          if (landed) view.squash = feel.stomperSquash;
          view.squash += (1 - view.squash) * Math.min(1, feel.stomperSquashRecoverPerSec * dt);
        }
        view.wasGrounded = enemy.grounded;

        const squashY = enemy.kind === "stomper" ? view.squash : 1;
        const squashXZ = 1 / Math.sqrt(Math.max(squashY, 0.05));

        view.group.scale.set(
          size.width * enemy.facing * fade * squashXZ,
          size.height * fade * squashY,
          1
        );

        const leanAmount = THREE.MathUtils.degToRad(feel.enemyLeanDeg);
        const moving = Math.abs(enemy.vel.x) > 0.2;
        if (moving && enemy.state === "patrol") {
          view.phase += dt * feel.legSwingSpeed * 0.42;
        }

        let leanTarget = 0;
        let drop = 0;
        let armTarget = 0.6;
        let headTarget = 0;
        if (enemy.state === "telegraph") {
          leanTarget = leanAmount;
          const dur = Math.max(live.guard.telegraphMs, 1) / 1000;
          const p = clamp01(1 - (enemy.stateUntil - t) / dur);
          armTarget = 0.6 + 2.0 * p;
          headTarget = -0.06 * p;
        } else if (enemy.state === "attack") {
          leanTarget = -leanAmount * 1.2;
          armTarget = 0.3;
        } else if (enemy.state === "recover") {
          leanTarget = THREE.MathUtils.degToRad(feel.guardSlumpDeg) * 0.5;
          drop = -0.05;
          armTarget = 0.12;
          headTarget = THREE.MathUtils.degToRad(feel.guardSlumpDeg);
        } else if (enemy.state === "hurt") {
          leanTarget = leanAmount * 0.8;
          armTarget = 0.75;
        } else if (moving) {
          leanTarget = leanAmount * 0.25 + Math.sin(view.phase * 2) * leanAmount * 0.16;
          armTarget = 0.6 + Math.sin(view.phase) * 0.18;
        }

        if (enemy.kind === "stomper") leanTarget = 0;
        view.lean.rotation.z += (leanTarget - view.lean.rotation.z) * follow;
        const restY = enemy.kind === "stomper" ? -0.22 : -0.24;
        const bob = moving && enemy.state === "patrol" ? Math.abs(Math.cos(view.phase)) * 0.03 : 0;
        view.body.position.y += (drop + restY + bob - view.body.position.y) * follow;

        const arm = view.arm;
        if (arm !== null) arm.rotation.z += (armTarget - arm.rotation.z) * follow;
        const head = view.head;
        if (head !== null) head.rotation.z += (headTarget - head.rotation.z) * follow;

        const swing = THREE.MathUtils.degToRad(feel.enemyLeanDeg) * 0.9;
        let hipIndex = 0;
        for (const hip of view.hips) {
          const target =
            moving && enemy.state === "patrol"
              ? Math.sin(view.phase + hipIndex * Math.PI) * swing
              : 0;
          hip.rotation.z += (target - hip.rotation.z) * follow;
          hipIndex++;
        }

        let footIndex = 0;
        for (const foot of view.feet) {
          const dir = footIndex === 0 ? -1 : 1;
          const airborne = !enemy.grounded;
          const tuck = airborne ? 0.05 : 0;
          const spread = airborne ? -0.04 : (1 - view.squash) * 0.28;
          foot.position.y += (tuck - foot.position.y) * follow;
          foot.rotation.z += (dir * (airborne ? 0.3 : 0) - foot.rotation.z) * follow;
          const restX = 0.24 * dir;
          foot.position.x += (restX + spread * dir - foot.position.x) * follow;
          footIndex++;
        }

        let hot = 0;
        if (enemy.state === "telegraph") {
          const dur = Math.max(live.guard.telegraphMs, 1) / 1000;
          const p = clamp01(1 - (enemy.stateUntil - t) / dur);
          hot = 0.4 + 0.6 * p;
        } else if (enemy.state === "attack") {
          hot = 1;
        } else if (enemy.kind === "stomper" && !enemy.grounded) {
          hot = 1;
        }

        if (enemy.kind === "stomper" && (!enemy.alive || enemy.state === "dead")) hot = 0;

        scratch.copy(view.accentBase).lerp(view.accentHot, hot).lerp(WHITE, step2);
        if (enemy.kind === "stomper" && (!enemy.alive || enemy.state === "dead")) {
          scratch.lerp(view.slateBase, 1 - fade);
        }
        view.accentMat.color.copy(scratch);

        scratch.copy(view.slateBase).lerp(WHITE, step2);
        view.slateMat.color.copy(scratch);
        scratch.copy(view.ashBase).lerp(WHITE, step2);
        view.ashMat.color.copy(scratch);
      }

      for (const view of views) {
        if (!view.seen) {
          view.group.visible = false;
          view.id = -1;
          view.deadAt = 0;
        }
      }
    }
  };
}
