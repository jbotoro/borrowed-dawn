import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { Enemy, EnemyKind } from "../game/types";
import type { LitMaterial, LookProfile } from "./look";
import { applyOutline } from "./look";

export interface EnemyMeshes {
  group: THREE.Group;
  sync(enemies: Enemy[], alpha: number, t: number, tuning: Tuning): void;
}

const WHITE = new THREE.Color(0xffffff);

interface EnemyView {
  id: number;
  kind: EnemyKind;
  group: THREE.Group;
  lean: THREE.Object3D;
  body: THREE.Object3D;
  bodyMat: LitMaterial;
  accentMat: LitMaterial;
  accentBase: THREE.Color;
  accentHot: THREE.Color;
  bodyBase: THREE.Color;
  deadAt: number;
  squash: number;
  seen: boolean;
  wasGrounded: boolean;
}

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

export function createEnemyMeshes(tuning: Tuning, look: LookProfile): EnemyMeshes {
  const group = new THREE.Group();
  group.name = "enemies";

  const plateGeometry = new THREE.BoxGeometry(0.68, 0.46, 0.56);
  const bandGeometry = new THREE.BoxGeometry(0.72, 0.07, 0.6);
  const pauldronGeometry = new THREE.BoxGeometry(0.82, 0.1, 0.62);
  const helmGeometry = new THREE.BoxGeometry(0.44, 0.24, 0.4);
  const helmCrestGeometry = new THREE.BoxGeometry(0.46, 0.035, 0.42);
  const visorGeometry = new THREE.BoxGeometry(0.3, 0.06, 0.05);
  const rivetGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
  const footGeometry = new THREE.BoxGeometry(0.24, 0.13, 0.32);
  const armGeometry = new THREE.BoxGeometry(0.14, 0.3, 0.16);
  const bladeGeometry = new THREE.BoxGeometry(0.34, 0.11, 0.06);
  const bladeEdgeGeometry = new THREE.BoxGeometry(0.34, 0.024, 0.066);
  const bladeTipGeometry = new THREE.ConeGeometry(0.07, 0.16, 4);
  bladeTipGeometry.rotateZ(-Math.PI * 0.5);

  const boilerGeometry = new THREE.SphereGeometry(0.42, 12, 8);
  const strapGeometry = new THREE.TorusGeometry(0.425, 0.028, 4, 14);
  const capGeometry = new THREE.CylinderGeometry(0.16, 0.2, 0.09, 8);
  const blockFootGeometry = new THREE.BoxGeometry(0.22, 0.16, 0.28);
  const glowGeometry = new THREE.SphereGeometry(0.26, 10, 6, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5);

  const ironProto = look.litMaterial("enemyBody", {
    roughness: 0.85,
    metalness: 0.2,
    doubleSide: true
  });
  const plateDark = look.material("enemyBody", { shade: 0.62, roughness: 0.9, doubleSide: true });
  const rivetMat = look.material("actorMetal", {
    shade: 0.56,
    roughness: 0.5,
    metalness: 0.6,
    doubleSide: true
  });
  const edgeMat = look.material("actorMetal", { roughness: 0.4, metalness: 0.5, doubleSide: true });
  const bladeMat = look.material("actorMetal", {
    shade: 0.46,
    roughness: 0.4,
    metalness: 0.7,
    doubleSide: true
  });
  const visorProto = look.litMaterial("enemyAccent", {
    emissiveColor: look.heat(0),
    emissiveIntensity: tuning.feel.bellHeatEmissive,
    roughness: 0.4,
    doubleSide: true
  });
  const glowProto = look.litMaterial("reward", {
    emissiveColor: look.heat(0.8),
    emissiveIntensity: tuning.feel.bellHeatEmissive,
    roughness: 0.5,
    doubleSide: true
  });

  const views: EnemyView[] = [];
  const scratch = new THREE.Color();
  const visorRest = new THREE.Color(look.colorOf("ash", tuning.feel.guardVisorRestShade));
  const visorHot = new THREE.Color(look.colorOf("enemyAccent"));
  const glowRest = new THREE.Color(look.colorOf("reward"));
  const glowHot = new THREE.Color(look.colorOf("danger"));

  function buildGuard(): EnemyView {
    const root = new THREE.Group();
    const lean = new THREE.Object3D();
    lean.position.set(0, 0.16, 0);
    root.add(lean);

    const bodyMat = ironProto.clone() as LitMaterial;
    const accentMat = visorProto.clone() as LitMaterial;

    const body = new THREE.Object3D();
    lean.add(body);

    const plate = new THREE.Mesh(plateGeometry, bodyMat);
    plate.position.set(0, 0.3, 0);
    body.add(plate);

    const band = new THREE.Mesh(bandGeometry, plateDark);
    band.position.set(0, 0.36, 0.01);
    body.add(band);

    for (let i = 0; i < 6; i++) {
      const rivet = new THREE.Mesh(rivetGeometry, rivetMat);
      const side = i < 3 ? -1 : 1;
      const row = i % 3;
      rivet.position.set(side * 0.28, 0.14 + row * 0.16, 0.29);
      body.add(rivet);
    }

    const pauldron = new THREE.Mesh(pauldronGeometry, plateDark);
    pauldron.position.set(0, 0.56, 0);
    body.add(pauldron);

    const pauldronEdge = new THREE.Mesh(new THREE.BoxGeometry(0.83, 0.02, 0.63), edgeMat);
    pauldronEdge.position.set(0, 0.615, 0);
    body.add(pauldronEdge);

    const helm = new THREE.Mesh(helmGeometry, bodyMat);
    helm.position.set(0, 0.73, 0);
    body.add(helm);

    const helmCrest = new THREE.Mesh(helmCrestGeometry, plateDark);
    helmCrest.position.set(0, 0.86, 0);
    body.add(helmCrest);

    const visor = new THREE.Mesh(visorGeometry, accentMat);
    visor.position.set(0.09, 0.72, 0.21);
    body.add(visor);

    const visorHood = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.05, 0.06), plateDark);
    visorHood.position.set(0.09, 0.775, 0.215);
    body.add(visorHood);

    const arm = new THREE.Mesh(armGeometry, plateDark);
    arm.position.set(0.3, 0.42, 0.16);
    arm.rotation.z = -0.35;
    body.add(arm);

    const blade = new THREE.Mesh(bladeGeometry, bladeMat);
    blade.position.set(0.55, 0.3, 0.16);
    blade.rotation.z = -0.14;
    body.add(blade);

    const bladeEdge = new THREE.Mesh(bladeEdgeGeometry, edgeMat);
    bladeEdge.position.set(0.55, 0.354, 0.16);
    bladeEdge.rotation.z = -0.14;
    body.add(bladeEdge);

    const bladeTip = new THREE.Mesh(bladeTipGeometry, edgeMat);
    bladeTip.position.set(0.75, 0.272, 0.16);
    bladeTip.rotation.z = -0.14;
    body.add(bladeTip);

    const footL = new THREE.Mesh(footGeometry, plateDark);
    footL.position.set(-0.17, 0.068, 0.02);
    root.add(footL);
    const footR = new THREE.Mesh(footGeometry, plateDark);
    footR.position.set(0.17, 0.068, -0.02);
    root.add(footR);

    group.add(root);
    applyOutline(root, tuning.feel.outlineThickness, look);
    return {
      id: -1,
      kind: "guard",
      group: root,
      lean,
      body,
      bodyMat,
      accentMat,
      accentBase: visorRest,
      accentHot: visorHot,
      bodyBase: new THREE.Color(look.colorOf("enemyBody")),
      deadAt: 0,
      squash: 1,
      seen: false,
      wasGrounded: true
    };
  }

  function buildStomper(): EnemyView {
    const root = new THREE.Group();
    const lean = new THREE.Object3D();
    root.add(lean);

    const bodyMat = ironProto.clone() as LitMaterial;
    const accentMat = glowProto.clone() as LitMaterial;

    const body = new THREE.Object3D();
    body.position.set(0, 0.16, 0);
    lean.add(body);

    const boiler = new THREE.Mesh(boilerGeometry, bodyMat);
    boiler.position.set(0, 0.42, 0);
    boiler.scale.set(1, 0.92, 1);
    body.add(boiler);

    const strap = new THREE.Mesh(strapGeometry, plateDark);
    strap.position.set(0, 0.42, 0);
    strap.rotation.x = Math.PI * 0.5;
    body.add(strap);

    const strapVertical = new THREE.Mesh(strapGeometry, plateDark);
    strapVertical.position.set(0, 0.42, 0);
    strapVertical.rotation.y = Math.PI * 0.5;
    body.add(strapVertical);

    for (let i = 0; i < 6; i++) {
      const rivet = new THREE.Mesh(rivetGeometry, rivetMat);
      const angle = (i / 6) * Math.PI * 2;
      rivet.position.set(Math.cos(angle) * 0.3, 0.42 + Math.sin(angle) * 0.3, 0.29);
      body.add(rivet);
    }

    const cap = new THREE.Mesh(capGeometry, plateDark);
    cap.position.set(0, 0.82, 0);
    body.add(cap);

    const capEdge = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.02, 8), edgeMat);
    capEdge.position.set(0, 0.87, 0);
    body.add(capEdge);

    const glow = new THREE.Mesh(glowGeometry, accentMat);
    glow.position.set(0, 0.16, 0);
    glow.scale.set(1, 0.7, 1);
    body.add(glow);

    const footL = new THREE.Mesh(blockFootGeometry, plateDark);
    footL.position.set(-0.22, 0.08, 0.02);
    root.add(footL);
    const footR = new THREE.Mesh(blockFootGeometry, plateDark);
    footR.position.set(0.22, 0.08, -0.02);
    root.add(footR);

    group.add(root);
    applyOutline(root, tuning.feel.outlineThickness, look);
    return {
      id: -1,
      kind: "stomper",
      group: root,
      lean,
      body,
      bodyMat,
      accentMat,
      accentBase: glowRest,
      accentHot: glowHot,
      bodyBase: new THREE.Color(look.colorOf("enemyBody")),
      deadAt: 0,
      squash: 1,
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
        const step = flashStep(flash);
        const recoil = step * feel.enemyRecoilDistance * -enemy.facing;

        view.group.visible = true;
        view.group.position.set(x + recoil, y, 0);

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
          size.width * squashXZ
        );

        const leanAmount = THREE.MathUtils.degToRad(feel.enemyLeanDeg);
        let leanTarget = 0;
        let drop = 0;
        if (enemy.state === "telegraph") {
          leanTarget = leanAmount;
        } else if (enemy.state === "attack") {
          leanTarget = -leanAmount * 1.2;
        } else if (enemy.state === "recover") {
          leanTarget = THREE.MathUtils.degToRad(feel.guardSlumpDeg) * 0.5;
          drop = -0.05;
        } else if (enemy.state === "hurt") {
          leanTarget = leanAmount * 0.8;
        }
        view.lean.rotation.z += (leanTarget - view.lean.rotation.z) * follow;
        const restY = enemy.kind === "stomper" ? 0.16 : 0;
        view.body.position.y += (drop + restY - view.body.position.y) * follow;

        const idleHeat = enemy.kind === "stomper" ? 0.8 : 0.12;
        let heat = idleHeat;
        let hot = 0;
        if (enemy.state === "telegraph") {
          const dur = Math.max(live.guard.telegraphMs, 1) / 1000;
          const p = clamp01(1 - (enemy.stateUntil - t) / dur);
          heat = idleHeat + (1 - idleHeat) * (0.4 + 0.6 * p);
          hot = 0.4 + 0.6 * p;
        } else if (enemy.state === "attack") {
          heat = 1;
          hot = 1;
        } else if (enemy.kind === "stomper" && !enemy.grounded) {
          heat = 1;
          hot = 1;
        } else if (enemy.state === "hurt") {
          heat = idleHeat + 0.1;
        }

        scratch.copy(view.accentBase).lerp(view.accentHot, hot).lerp(WHITE, step);
        view.accentMat.color.copy(scratch);
        view.accentMat.emissive.setHex(look.heat(clamp01(heat)));
        view.accentMat.emissiveIntensity = Math.min(0.5, feel.bellHeatEmissive) + step * 0.4;

        scratch.copy(view.bodyBase).lerp(WHITE, step);
        view.bodyMat.color.copy(scratch);
        view.bodyMat.emissive.copy(WHITE);
        view.bodyMat.emissiveIntensity = step * 0.9;
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
