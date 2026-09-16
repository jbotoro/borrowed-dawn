import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { Boss } from "../game/types";

export interface BossMesh {
  group: THREE.Group;
  sync(boss: Boss | null, alpha: number, t: number, tuning: Tuning): void;
}

const COLOR_SHELL = 0x0c1016;
const COLOR_SHELL_RIM = 0x7f8c99;
const COLOR_FURNACE = 0xff5a1e;
const COLOR_FURNACE_DEAD = 0xffb648;
const COLOR_ARM = 0x2a3140;
const COLOR_ARM_HOT = 0xff3b1f;
const COLOR_CRACK = 0xff7a2a;

const WHITE = new THREE.Color(0xffffff);

function shellProfile(): THREE.Vector2[] {
  return [
    new THREE.Vector2(0.5, 0),
    new THREE.Vector2(0.49, 0.1),
    new THREE.Vector2(0.44, 0.26),
    new THREE.Vector2(0.36, 0.42),
    new THREE.Vector2(0.26, 0.56),
    new THREE.Vector2(0.14, 0.66),
    new THREE.Vector2(0.07, 0.71),
    new THREE.Vector2(0.06, 0.74)
  ];
}

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export function createBossMesh(tuning: Tuning): BossMesh {
  const group = new THREE.Group();
  group.name = "boss";
  group.visible = false;

  const rig = new THREE.Group();
  group.add(rig);

  const shellMat = new THREE.MeshStandardMaterial({
    color: COLOR_SHELL,
    roughness: 0.5,
    metalness: 0.5,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: COLOR_SHELL_RIM,
    roughness: 0.45,
    metalness: 0.6,
    emissive: COLOR_SHELL_RIM,
    emissiveIntensity: 0.12,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const furnaceMat = new THREE.MeshStandardMaterial({
    color: COLOR_FURNACE,
    emissive: COLOR_FURNACE,
    emissiveIntensity: tuning.feel.bossFurnaceEmissive,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const armMat = new THREE.MeshStandardMaterial({
    color: COLOR_ARM,
    emissive: COLOR_ARM_HOT,
    emissiveIntensity: 0,
    roughness: 0.6,
    metalness: 0.35,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const crackMat = new THREE.MeshStandardMaterial({
    color: COLOR_CRACK,
    emissive: COLOR_CRACK,
    emissiveIntensity: tuning.feel.telegraphEmissive,
    roughness: 0.5,
    side: THREE.DoubleSide
  });
  const discMat = new THREE.MeshBasicMaterial({
    color: COLOR_ARM_HOT,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const furnace = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 0.44, 14), furnaceMat);
  furnace.position.set(0, 0.22, 0);
  rig.add(furnace);

  const furnaceLight = new THREE.PointLight(COLOR_FURNACE, 0, 1, 2);
  group.add(furnaceLight);

  const shellPivot = new THREE.Object3D();
  shellPivot.position.set(0, 0.26, 0);
  rig.add(shellPivot);

  const shell = new THREE.Mesh(new THREE.LatheGeometry(shellProfile(), 20), shellMat);
  shellPivot.add(shell);

  const lip = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.022, 4, 24), rimMat);
  lip.rotation.x = Math.PI * 0.5;
  lip.position.set(0, 0.012, 0);
  shellPivot.add(lip);

  const crack = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.5, 0.03), crackMat);
  crack.position.set(0.08, 0.34, 0.33);
  crack.rotation.z = 0.22;
  crack.visible = false;
  shellPivot.add(crack);

  const armPivot = new THREE.Object3D();
  armPivot.position.set(0.28, 0.54, 0.2);
  rig.add(armPivot);

  const armGeometry = new THREE.BoxGeometry(1, 0.11, 0.16);
  armGeometry.translate(0.5, 0, 0);
  const arm = new THREE.Mesh(armGeometry, armMat);
  armPivot.add(arm);

  const disc = new THREE.Mesh(new THREE.CircleGeometry(1, 24), discMat);
  disc.scale.set(0.01, 0.004, 1);
  group.add(disc);

  const scratch = new THREE.Color();
  const baseFurnace = new THREE.Color(COLOR_FURNACE);
  const deadFurnace = new THREE.Color(COLOR_FURNACE_DEAD);

  const armRest = -1.15;

  function progress(boss: Boss, t: number, durationMs: number): number {
    const dur = Math.max(durationMs, 1) / 1000;
    return clamp01(1 - (boss.stateUntil - t) / dur);
  }

  return {
    group,

    sync(boss: Boss | null, alpha: number, t: number, live: Tuning): void {
      if (boss === null) {
        group.visible = false;
        return;
      }
      group.visible = true;

      const feel = live.feel;
      const cfg = live.boss;
      const x = boss.prev.x + (boss.pos.x - boss.prev.x) * alpha;
      const y = boss.prev.y + (boss.pos.y - boss.prev.y) * alpha;

      const tilt = THREE.MathUtils.degToRad(feel.bossShellTiltDeg);
      const swing = THREE.MathUtils.degToRad(feel.bossArmSwingDeg);

      let lift = 0;
      let shellLift = boss.phase === 2 ? feel.bossShellLift * 0.4 : 0;
      let shellTilt = boss.phase === 2 ? tilt * 0.2 : 0;
      let armAngle = armRest;
      let armHot = 0;
      let discGrow = 0;
      let discAlpha = 0;
      let furnaceGlow = feel.bossFurnaceEmissive * (boss.phase === 2 ? 1 : 0.55);

      if (boss.state === "sweepTelegraph") {
        const p = progress(boss, t, cfg.sweepTelegraphMs);
        shellTilt += tilt * p;
        armAngle = armRest + (swing - armRest) * (p * p);
        armHot = feel.telegraphEmissive * p;
      } else if (boss.state === "sweepActive") {
        const p = progress(boss, t, cfg.sweepActiveMs);
        shellTilt += tilt * (1 - p);
        armAngle = swing + (-swing * 0.35 - swing) * Math.pow(p, 0.55);
        armHot = feel.telegraphEmissive;
      } else if (boss.state === "sweepRecover") {
        const p = progress(boss, t, cfg.sweepRecoveryMs);
        armAngle = -swing * 0.35 + (armRest + swing * 0.35) * p;
        armHot = feel.telegraphEmissive * (1 - p);
      } else if (boss.state === "stompTelegraph") {
        const p = progress(boss, t, cfg.stompTelegraphMs);
        discGrow = p;
        discAlpha = 0.25 + 0.45 * p;
        furnaceGlow = feel.bossFurnaceEmissive * (0.6 + p);
      } else if (boss.state === "stompRise") {
        const p = progress(boss, t, cfg.stompRiseMs);
        lift = feel.bossStompLift * Math.pow(p, 0.7);
        discGrow = 1;
        discAlpha = 0.7;
        furnaceGlow = feel.bossFurnaceEmissive * 1.6;
      } else if (boss.state === "stompSlam") {
        const p = progress(boss, t, cfg.stompSlamMs);
        lift = feel.bossStompLift * (1 - Math.pow(p, 0.5));
        discGrow = 1;
        discAlpha = 0.7 * (1 - p);
        furnaceGlow = feel.bossFurnaceEmissive * 1.9;
      } else if (boss.state === "stompRecover") {
        const p = progress(boss, t, cfg.stompRecoveryMs);
        discAlpha = 0.2 * (1 - p);
        discGrow = 1 - p;
      } else if (boss.state === "crack") {
        const p = progress(boss, t, cfg.crackMs);
        shellLift = feel.bossShellLift * p;
        shellTilt = tilt * 0.8 * p;
        furnaceGlow = feel.bossFurnaceEmissive * (1 + 1.8 * p);
      } else if (boss.state === "dead") {
        shellLift = 0;
        shellTilt = tilt * 1.4;
        furnaceGlow = feel.bossFurnaceEmissive * 0.35;
      }

      group.position.set(x, y + lift, 0);
      rig.scale.set(cfg.width * boss.facing, cfg.height, cfg.width);

      shellPivot.position.set(0, 0.26 + shellLift, 0);
      shellPivot.rotation.z = -shellTilt;

      armPivot.rotation.z = armAngle;
      arm.scale.set(Math.max(cfg.sweepReach / Math.max(cfg.width, 0.1), 0.2), 1, 1);

      crack.visible = boss.phase === 2 || boss.state === "crack" || boss.state === "dead";

      const flash = boss.flash < 0 ? 0 : boss.flash > 1 ? 1 : boss.flash;
      const dying = boss.state === "dead";
      scratch.copy(dying ? deadFurnace : baseFurnace).lerp(WHITE, flash);
      furnaceMat.emissive.copy(scratch);
      furnaceMat.color.copy(scratch);
      furnaceMat.emissiveIntensity = furnaceGlow + flash * feel.telegraphEmissive;

      shellMat.emissive.copy(WHITE);
      shellMat.emissiveIntensity = flash * 0.8;

      armMat.emissiveIntensity = armHot;

      crackMat.emissiveIntensity = feel.telegraphEmissive * (dying ? 0.3 : 1);

      furnaceLight.color.copy(scratch);
      furnaceLight.intensity = furnaceGlow * feel.bossFurnaceLightScale;
      furnaceLight.distance = cfg.width * feel.bossFurnaceLightRange;
      furnaceLight.position.set(0, cfg.height * 0.2, cfg.width * 0.4);

      const discRadius = feel.bossStompDiscRadius * discGrow;
      disc.visible = discAlpha > 0.01;
      disc.position.set(0, 0.05 - lift, -0.2);
      disc.scale.set(Math.max(discRadius, 0.01), Math.max(discRadius * 0.35, 0.01), 1);
      discMat.opacity = discAlpha;
    }
  };
}
