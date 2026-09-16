import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { Enemy, EnemyKind } from "../game/types";

export interface EnemyMeshes {
  group: THREE.Group;
  sync(enemies: Enemy[], alpha: number, t: number, tuning: Tuning): void;
}

const COLOR_GUARD_BODY = 0x414b5c;
const COLOR_GUARD_PLATE = 0x333c4a;
const COLOR_VISOR = 0xff3b1f;
const COLOR_BLADE = 0x8f9aa8;
const COLOR_STOMPER_BODY = 0x2e3644;
const COLOR_STOMPER_GLOW = 0xff8a2b;

const WHITE = new THREE.Color(0xffffff);

interface EnemyView {
  id: number;
  kind: EnemyKind;
  group: THREE.Group;
  lean: THREE.Object3D;
  bodyMat: THREE.MeshStandardMaterial;
  accentMat: THREE.MeshStandardMaterial;
  accentBase: THREE.Color;
  bodyBase: THREE.Color;
  deadAt: number;
  seen: boolean;
}

export function createEnemyMeshes(tuning: Tuning): EnemyMeshes {
  const group = new THREE.Group();
  group.name = "enemies";

  const guardBodyGeometry = new THREE.BoxGeometry(0.9, 0.84, 0.8);
  const guardPlateGeometry = new THREE.BoxGeometry(0.94, 0.14, 0.86);
  const visorGeometry = new THREE.BoxGeometry(0.52, 0.11, 0.06);
  const bladeGeometry = new THREE.BoxGeometry(0.62, 0.09, 0.09);
  const stomperBodyGeometry = new THREE.SphereGeometry(0.45, 12, 9);
  const stomperLegGeometry = new THREE.BoxGeometry(0.16, 0.22, 0.18);
  const glowGeometry = new THREE.SphereGeometry(0.3, 10, 8);

  const guardBodyProto = new THREE.MeshStandardMaterial({
    color: COLOR_GUARD_BODY,
    roughness: 0.85,
    metalness: 0.15,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const guardPlateMat = new THREE.MeshStandardMaterial({
    color: COLOR_GUARD_PLATE,
    roughness: 0.9,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const visorProto = new THREE.MeshStandardMaterial({
    color: COLOR_VISOR,
    emissive: COLOR_VISOR,
    emissiveIntensity: tuning.feel.enemyEmissive,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const bladeMat = new THREE.MeshStandardMaterial({
    color: COLOR_BLADE,
    roughness: 0.35,
    metalness: 0.7,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const stomperBodyProto = new THREE.MeshStandardMaterial({
    color: COLOR_STOMPER_BODY,
    roughness: 0.8,
    metalness: 0.2,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const stomperGlowProto = new THREE.MeshStandardMaterial({
    color: COLOR_STOMPER_GLOW,
    emissive: COLOR_STOMPER_GLOW,
    emissiveIntensity: tuning.feel.enemyEmissive,
    roughness: 0.5,
    side: THREE.DoubleSide
  });

  const views: EnemyView[] = [];
  const scratch = new THREE.Color();

  function buildGuard(): EnemyView {
    const root = new THREE.Group();
    const lean = new THREE.Object3D();
    root.add(lean);

    const bodyMat = guardBodyProto.clone();
    const accentMat = visorProto.clone();

    const body = new THREE.Mesh(guardBodyGeometry, bodyMat);
    body.position.set(0, 0.44, 0);
    lean.add(body);

    const plate = new THREE.Mesh(guardPlateGeometry, guardPlateMat);
    plate.position.set(0, 0.88, 0);
    lean.add(plate);

    const visor = new THREE.Mesh(visorGeometry, accentMat);
    visor.position.set(0.2, 0.64, 0.42);
    lean.add(visor);

    const blade = new THREE.Mesh(bladeGeometry, bladeMat);
    blade.position.set(0.62, 0.36, 0.2);
    blade.rotation.z = -0.25;
    lean.add(blade);

    group.add(root);
    return {
      id: -1,
      kind: "guard",
      group: root,
      lean,
      bodyMat,
      accentMat,
      accentBase: new THREE.Color(COLOR_VISOR),
      bodyBase: new THREE.Color(COLOR_GUARD_BODY),
      deadAt: 0,
      seen: false
    };
  }

  function buildStomper(): EnemyView {
    const root = new THREE.Group();
    const lean = new THREE.Object3D();
    root.add(lean);

    const bodyMat = stomperBodyProto.clone();
    const accentMat = stomperGlowProto.clone();

    const body = new THREE.Mesh(stomperBodyGeometry, bodyMat);
    body.position.set(0, 0.56, 0);
    lean.add(body);

    const legL = new THREE.Mesh(stomperLegGeometry, bodyMat);
    legL.position.set(-0.22, 0.11, 0);
    lean.add(legL);

    const legR = new THREE.Mesh(stomperLegGeometry, bodyMat);
    legR.position.set(0.22, 0.11, 0);
    lean.add(legR);

    const glow = new THREE.Mesh(glowGeometry, accentMat);
    glow.position.set(0, 0.16, 0.05);
    glow.scale.set(1, 0.4, 1);
    lean.add(glow);

    group.add(root);
    return {
      id: -1,
      kind: "stomper",
      group: root,
      lean,
      bodyMat,
      accentMat,
      accentBase: new THREE.Color(COLOR_STOMPER_GLOW),
      bodyBase: new THREE.Color(COLOR_STOMPER_BODY),
      deadAt: 0,
      seen: false
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

  return {
    group,

    sync(enemies: Enemy[], alpha: number, t: number, live: Tuning): void {
      const feel = live.feel;
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

        view.group.visible = true;
        view.group.position.set(x, y, 0);
        view.group.scale.set(size.width * enemy.facing * fade, size.height * fade, size.width);

        const leanAmount = THREE.MathUtils.degToRad(feel.enemyLeanDeg);
        if (enemy.state === "telegraph") {
          view.lean.rotation.z = leanAmount;
        } else if (enemy.state === "attack") {
          view.lean.rotation.z = -leanAmount;
        } else {
          view.lean.rotation.z *= 0.82;
        }

        let accent = feel.enemyEmissive;
        if (enemy.state === "telegraph") {
          accent = feel.telegraphEmissive;
        } else if (enemy.state === "attack") {
          accent = feel.telegraphEmissive * 0.7;
        } else if (enemy.kind === "stomper" && !enemy.grounded) {
          accent = feel.stomperGlowIntensity;
        }

        const flash = enemy.flash < 0 ? 0 : enemy.flash > 1 ? 1 : enemy.flash;
        scratch.copy(view.accentBase).lerp(WHITE, flash);
        view.accentMat.emissive.copy(scratch);
        view.accentMat.emissiveIntensity = accent + flash * feel.telegraphEmissive;

        scratch.copy(view.bodyBase).lerp(WHITE, flash);
        view.bodyMat.color.copy(scratch);
        view.bodyMat.emissive.copy(WHITE);
        view.bodyMat.emissiveIntensity = flash * 0.9;
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
