import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { Boss } from "../game/types";
import type { LitMaterial, LookProfile } from "./look";
import { applyOutline } from "./look";

export interface BossMesh {
  group: THREE.Group;
  sync(
    boss: Boss | null,
    alpha: number,
    t: number,
    rt: number,
    tuning: Tuning
  ): void;
}

const WHITE = new THREE.Color(0xffffff);

function shellProfile(): THREE.Vector2[] {
  return [
    new THREE.Vector2(0.5, 0),
    new THREE.Vector2(0.492, 0.05),
    new THREE.Vector2(0.44, 0.13),
    new THREE.Vector2(0.405, 0.22),
    new THREE.Vector2(0.398, 0.33),
    new THREE.Vector2(0.378, 0.43),
    new THREE.Vector2(0.305, 0.53),
    new THREE.Vector2(0.175, 0.61),
    new THREE.Vector2(0.115, 0.65),
    new THREE.Vector2(0.105, 0.7)
  ];
}

function crackShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0.05, 0.1);
  shape.lineTo(0.015, 0.2);
  shape.lineTo(0.07, 0.31);
  shape.lineTo(0.03, 0.42);
  shape.lineTo(0.09, 0.52);
  shape.lineTo(0.13, 0.5);
  shape.lineTo(0.075, 0.4);
  shape.lineTo(0.115, 0.3);
  shape.lineTo(0.06, 0.19);
  shape.lineTo(0.1, 0.09);
  shape.lineTo(0.055, -0.01);
  shape.closePath();
  return shape;
}

function mouthShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(-0.5, 0);
  shape.lineTo(-0.5, 0.42);
  shape.quadraticCurveTo(0, 0.95, 0.5, 0.42);
  shape.lineTo(0.5, 0);
  shape.closePath();
  return shape;
}

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export function createBossMesh(tuning: Tuning, look: LookProfile): BossMesh {
  const group = new THREE.Group();
  group.name = "boss";
  group.visible = false;

  const rig = new THREE.Group();
  group.add(rig);

  const shellMat = look.litMaterial("bossShell", {
    shade: 1.13,
    roughness: 0.6,
    metalness: 0.4,
    doubleSide: true
  });
  const rimMat = look.material("actorMetal", {
    roughness: 0.45,
    metalness: 0.4,
    doubleSide: true
  });
  const voidMat = look.material("void", { unlit: true, fog: false });
  const yokeMat = look.material("bossShell", { shade: 1.1, roughness: 0.8, doubleSide: true });
  const chainMat = look.material("chain", { shade: 0.72, roughness: 0.6, doubleSide: true });
  const ashMat = look.material("ash", { shade: 0.6, roughness: 0.65, doubleSide: true });
  const furnaceMat = look.litMaterial("bossFurnace", {
    emissiveIntensity: tuning.feel.bossFurnaceEmissive,
    roughness: 0.4,
    doubleSide: true
  });
  const bodyMat = look.material("bossShell", { shade: 1.25, roughness: 0.75, doubleSide: true });
  const armMat = look.litMaterial("bossShell", {
    shade: 1.1,
    emissiveColor: look.heat(0),
    emissiveIntensity: tuning.feel.bellHeatEmissive,
    roughness: 0.6,
    metalness: 0.35,
    doubleSide: true
  });
  const crackMat = look.litMaterial("bossFurnace", {
    emissiveColor: look.heat(0.8),
    emissiveIntensity: tuning.feel.bellHeatEmissive,
    roughness: 0.5,
    doubleSide: true
  });

  const yoke = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.13, 0.42), yokeMat);
  yoke.position.set(0, 1.02, 0);
  rig.add(yoke);

  const yokeCapL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.26, 0.5), yokeMat);
  yokeCapL.position.set(-0.47, 0.96, 0);
  rig.add(yokeCapL);
  const yokeCapR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.26, 0.5), yokeMat);
  yokeCapR.position.set(0.47, 0.96, 0);
  rig.add(yokeCapR);

  const linkGeometry = new THREE.TorusGeometry(0.075, 0.024, 4, 10);
  const chain = new THREE.Group();
  chain.position.set(0, 1.08, 0);
  rig.add(chain);
  const links = Math.max(2, Math.round(tuning.feel.bellChainLinks));
  for (let i = 0; i < links; i++) {
    const link = new THREE.Mesh(linkGeometry, chainMat);
    link.position.set(0, i * tuning.feel.bellChainSpacing, 0);
    link.rotation.y = i % 2 === 0 ? 0 : Math.PI * 0.5;
    chain.add(link);
  }

  const furnaceBody = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 0.4, 12), bodyMat);
  furnaceBody.position.set(0, 0.2, 0);
  rig.add(furnaceBody);

  const mouth = new THREE.Mesh(new THREE.ShapeGeometry(mouthShape()), furnaceMat);
  mouth.position.set(0, 0.048, 0.33);
  mouth.scale.set(0.42, 0.32, 1);
  rig.add(mouth);

  const mouthFrame = new THREE.Mesh(new THREE.ShapeGeometry(mouthShape()), ashMat);
  mouthFrame.position.set(0, 0.026, 0.315);
  mouthFrame.scale.set(0.49, 0.37, 1);
  rig.add(mouthFrame);

  const furnaceLight = new THREE.PointLight(look.colorOf("bossFurnace"), 0, 1, 2);
  group.add(furnaceLight);

  const shellPivot = new THREE.Object3D();
  shellPivot.position.set(0, 0.24, 0);
  rig.add(shellPivot);

  const shellScale = new THREE.Object3D();
  shellPivot.add(shellScale);

  const shellGeometry = new THREE.LatheGeometry(shellProfile(), 18);
  const shell = new THREE.Mesh(shellGeometry, shellMat);
  shellScale.add(shell);

  const inner = new THREE.Mesh(shellGeometry, voidMat);
  inner.scale.setScalar(0.93);
  inner.position.set(0, 0.005, 0);
  shellScale.add(inner);

  const mouthPlate = new THREE.Mesh(new THREE.CircleGeometry(0.45, 18), voidMat);
  mouthPlate.rotation.x = Math.PI * 0.5;
  mouthPlate.position.set(0, 0.012, 0);
  shellScale.add(mouthPlate);

  const lip = new THREE.Mesh(new THREE.TorusGeometry(0.478, 0.026, 4, 22), rimMat);
  lip.rotation.x = Math.PI * 0.5;
  lip.position.set(0, 0.015, 0);
  shellScale.add(lip);

  const shoulderBand = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.018, 4, 20), rimMat);
  shoulderBand.rotation.x = Math.PI * 0.5;
  shoulderBand.position.set(0, 0.42, 0);
  shellScale.add(shoulderBand);

  const crackGeometry = new THREE.ShapeGeometry(crackShape());
  const crack = new THREE.Mesh(crackGeometry, crackMat);
  crack.position.set(-0.04, 0.09, 0.4);
  crack.rotation.z = 0.12;
  crack.visible = false;
  shellScale.add(crack);

  const armPivot = new THREE.Object3D();
  armPivot.position.set(0.42, 0.5, 0.3);
  rig.add(armPivot);

  const armGeometry = new THREE.BoxGeometry(1, 0.1, 0.14);
  armGeometry.translate(0.5, 0, 0);
  const arm = new THREE.Mesh(armGeometry, armMat);
  armPivot.add(arm);

  const clapper = new THREE.Object3D();
  armPivot.add(clapper);
  const clapperHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 7), armMat);
  clapperHead.scale.set(1, 1.25, 1);
  clapper.add(clapperHead);
  const clapperBand = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.02, 4, 12), rimMat);
  clapperBand.rotation.x = Math.PI * 0.5;
  clapper.add(clapperBand);

  const shoulderPin = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.14, 8), chainMat);
  shoulderPin.rotation.x = Math.PI * 0.5;
  shoulderPin.position.set(0.42, 0.5, 0.3);
  rig.add(shoulderPin);

  applyOutline(rig, tuning.feel.outlineThickness, look);

  const scratch = new THREE.Color();
  const amber = new THREE.Color(look.colorOf("bossFurnace"));
  const danger = new THREE.Color(look.colorOf("danger"));

  function progress(boss: Boss, t: number, durationMs: number): number {
    const dur = Math.max(durationMs, 1) / 1000;
    return clamp01(1 - (boss.stateUntil - t) / dur);
  }

  return {
    group,

    sync(boss: Boss | null, alpha: number, t: number, rt: number, live: Tuning): void {
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
      const armRest = THREE.MathUtils.degToRad(feel.bellArmRestDeg);

      let shellLift = boss.phase === 2 ? feel.bossShellLift * 0.35 : 0;
      let shellTilt = 0;
      let compress = 1;
      let armAngle = armRest;
      let armExtend = 0;
      let armHeat = 0;
      let mouthHeat = 0;
      let mouthGlow = feel.bossFurnaceEmissive * (boss.phase === 2 ? 0.9 : 0.6);
      const breath =
        1 + Math.sin(rt * feel.bellBreathSpeed) * feel.bellBreathAmount * (boss.phase === 2 ? 1.4 : 1);

      if (boss.state === "dormant" || boss.state === "idle") {
        mouthGlow *= breath;
      } else if (boss.state === "sweepTelegraph") {
        const p = progress(boss, t, cfg.sweepTelegraphMs);
        shellTilt = tilt * p;
        armAngle = armRest + (swing - armRest) * (p * p);
        armExtend = 0.3 * p;
        armHeat = 0.35 + 0.55 * p;
        mouthHeat = p;
        mouthGlow = feel.bossFurnaceEmissive * (0.6 + feel.bellMouthFlare * p);
      } else if (boss.state === "sweepActive") {
        const p = progress(boss, t, cfg.sweepActiveMs);
        shellTilt = tilt * (1 - p);
        armAngle = swing + (-swing * 0.4 - swing) * Math.pow(p, 0.55);
        armExtend = 0.3 + 0.7 * Math.pow(p, 0.4);
        armHeat = 1;
        mouthHeat = 1;
        mouthGlow = feel.bossFurnaceEmissive * (1 + feel.bellMouthFlare);
      } else if (boss.state === "sweepRecover") {
        const p = progress(boss, t, cfg.sweepRecoveryMs);
        armAngle = -swing * 0.4 + (armRest + swing * 0.4) * p;
        armExtend = 1 - p;
        armHeat = 0.9 * (1 - p);
        mouthHeat = 1 - p;
        shellTilt = -THREE.MathUtils.degToRad(feel.bellRockDeg) * Math.sin(p * Math.PI * 3) * (1 - p);
        mouthGlow = feel.bossFurnaceEmissive * (0.9 + 0.6 * (1 - p)) * breath;
      } else if (boss.state === "stompTelegraph") {
        const p = progress(boss, t, cfg.stompTelegraphMs);
        compress = 1 - (1 - feel.bellCompress) * p;
        mouthHeat = p;
        mouthGlow = feel.bossFurnaceEmissive * (0.6 + feel.bellMouthFlare * p);
      } else if (boss.state === "stompRise") {
        const p = progress(boss, t, cfg.stompRiseMs);
        compress = feel.bellCompress + (1.06 - feel.bellCompress) * p;
        mouthHeat = 1;
        mouthGlow = feel.bossFurnaceEmissive * (1 + feel.bellMouthFlare);
      } else if (boss.state === "stompSlam") {
        const p = progress(boss, t, cfg.stompSlamMs);
        compress = 1.06 - 0.24 * p;
        mouthHeat = 1;
        mouthGlow = feel.bossFurnaceEmissive * (1 + feel.bellMouthFlare * 1.4);
      } else if (boss.state === "stompRecover") {
        const p = progress(boss, t, cfg.stompRecoveryMs);
        compress = 0.82 + 0.18 * clamp01(p * 3);
        shellTilt =
          THREE.MathUtils.degToRad(feel.bellRockDeg) *
          Math.sin(p * Math.PI * feel.bellRockSpeed) *
          (1 - p);
        mouthHeat = 1 - clamp01(p * 2);
        mouthGlow = feel.bossFurnaceEmissive * (0.7 + 0.5 * (1 - p)) * breath;
      } else if (boss.state === "crack") {
        const p = progress(boss, t, cfg.crackMs);
        shellLift = feel.bossShellLift * p;
        shellTilt = tilt * 0.7 * p;
        mouthHeat = p * 0.6;
        mouthGlow = feel.bossFurnaceEmissive * (0.8 + 1.1 * p);
      } else if (boss.state === "dead") {
        shellLift = 0;
        shellTilt = tilt * 0.4;
        compress = 0.94;
        armAngle = armRest - 0.25;
        mouthHeat = 0;
        mouthGlow = feel.bossFurnaceEmissive * 0.7 * breath;
      }

      group.position.set(x, y, 0);
      rig.scale.set(cfg.width * boss.facing, cfg.height, cfg.width);

      shellPivot.position.set(0, 0.24 + shellLift, 0);
      shellPivot.rotation.z = -shellTilt;
      shellScale.scale.set(1 + (1 - compress) * 0.5, compress, 1 + (1 - compress) * 0.5);

      armPivot.rotation.z = armAngle;
      const armFull = 0.2 + cfg.sweepReach / Math.max(cfg.width, 0.1);
      const armLength = 0.38 + (armFull - 0.38) * clamp01(armExtend);
      arm.scale.set(armLength, 1, 1);
      clapper.position.set(armLength + 0.1, 0, 0);

      const cracked = boss.phase === 2 || boss.state === "crack" || boss.state === "dead";
      crack.visible = cracked;
      if (cracked) {
        const open = boss.state === "crack" ? progress(boss, t, cfg.crackMs) : 1;
        crack.scale.set(0.6 + 0.9 * open, 1, 1);
      }

      const flash = boss.flash < 0 ? 0 : boss.flash > 1 ? 1 : boss.flash;
      const step = flash > 0.62 ? 1 : flash > 0.26 ? 0.5 : 0;

      scratch.copy(amber).lerp(danger, mouthHeat).lerp(WHITE, step);
      furnaceMat.color.copy(scratch);
      furnaceMat.emissive.copy(scratch);
      furnaceMat.emissiveIntensity = Math.min(1, mouthGlow + step * feel.telegraphEmissive);

      shellMat.emissive.copy(WHITE);
      shellMat.emissiveIntensity = step * 0.8;

      const heatCap = Math.min(0.5, feel.bellHeatEmissive);
      armMat.emissive.setHex(look.heat(clamp01(armHeat)));
      armMat.emissiveIntensity = heatCap;

      const crackHeat = boss.state === "crack"
        ? 0.5 + 0.45 * progress(boss, t, cfg.crackMs)
        : boss.state === "dead"
          ? 0.55
          : 0.82;
      crackMat.emissive.setHex(look.heat(crackHeat));
      crackMat.emissiveIntensity = heatCap;

      furnaceLight.color.copy(scratch);
      furnaceLight.intensity = mouthGlow * feel.bossFurnaceLightScale;
      furnaceLight.distance = cfg.width * feel.bossFurnaceLightRange;
      furnaceLight.position.set(0, cfg.height * 0.14, cfg.width * 0.42);

      const sway = THREE.MathUtils.degToRad(feel.chainSwayDeg) * 0.25;
      chain.rotation.z = Math.sin(rt * feel.chainSwaySpeed) * sway + shellTilt * 0.3;
    }
  };
}
