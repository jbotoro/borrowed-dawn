import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { PlayerState } from "../game/types";
import type { LookProfile } from "./look";
import { applyOutline } from "./look";

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

const BASE_WIDTH = 0.6;
const BASE_HEIGHT = 1.2;

const WAIST_Y = 0.5;
const HIP_Y = 0.51;
const HEAD_Y = 0.92;
const SHOULDER_Y = 0.9;
const THIGH_LEN = 0.21;
const SHIN_LEN = 0.2;

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

function coatProfile(): THREE.Vector2[] {
  return [
    new THREE.Vector2(0.2, WAIST_Y - 0.02),
    new THREE.Vector2(0.195, WAIST_Y + 0.06),
    new THREE.Vector2(0.225, WAIST_Y + 0.16),
    new THREE.Vector2(0.25, WAIST_Y + 0.26),
    new THREE.Vector2(0.255, WAIST_Y + 0.35),
    new THREE.Vector2(0.235, WAIST_Y + 0.42),
    new THREE.Vector2(0.16, WAIST_Y + 0.465),
    new THREE.Vector2(0.1, WAIST_Y + 0.49)
  ];
}

function hemProfile(): THREE.Vector2[] {
  return [
    new THREE.Vector2(0.2, 0.03),
    new THREE.Vector2(0.222, -0.06),
    new THREE.Vector2(0.256, -0.14),
    new THREE.Vector2(0.292, -0.2),
    new THREE.Vector2(0.3, -0.235)
  ];
}

function hoodProfile(): THREE.Vector2[] {
  return [
    new THREE.Vector2(0.118, -0.05),
    new THREE.Vector2(0.152, 0.02),
    new THREE.Vector2(0.162, 0.1),
    new THREE.Vector2(0.15, 0.175),
    new THREE.Vector2(0.118, 0.232),
    new THREE.Vector2(0.066, 0.268),
    new THREE.Vector2(0.018, 0.278)
  ];
}

export function createPlayerMesh(tuning: Tuning, look: LookProfile): PlayerMesh {
  const group = new THREE.Group();
  group.name = "player";

  const coatMat = look.litMaterial("actorCoat", {
    emissiveIntensity: tuning.feel.playerCoatEmissive,
    roughness: 0.82,
    metalness: 0.1,
    doubleSide: true
  });
  const hemMat = look.litMaterial("actorCoat", {
    shade: 0.82,
    emissiveIntensity: tuning.feel.playerCoatEmissive,
    roughness: 0.85,
    doubleSide: true
  });
  const hoodMat = look.material("actorCoat", {
    shade: 0.86,
    roughness: 0.85,
    doubleSide: true
  });
  const shoulderMat = look.material("actorMetal", {
    shade: 0.4,
    roughness: 0.6,
    metalness: 0.4,
    doubleSide: true
  });
  const highlightMat = look.material("actorMetal", {
    roughness: 0.5,
    metalness: 0.2,
    doubleSide: true
  });
  const limbMat = look.material("actorCoat", {
    shade: 0.62,
    roughness: 0.9,
    doubleSide: true
  });
  const bootMat = look.material("actorCoat", {
    shade: 0.42,
    roughness: 0.95,
    doubleSide: true
  });
  const metalMat = look.material("actorMetal", {
    shade: 0.58,
    roughness: 0.45,
    metalness: 0.6,
    doubleSide: true
  });
  const needleMat = look.litMaterial("actorMetal", {
    shade: 0.34,
    roughness: 0.35,
    metalness: 0.7,
    doubleSide: true
  });
  const voidMat = look.material("void", { unlit: true, fog: false });
  const glassMat = look.litMaterial("actorGlass", {
    emissiveIntensity: tuning.feel.playerEmissive,
    roughness: 0.3,
    doubleSide: true
  });
  glassMat.transparent = true;
  glassMat.opacity = 0.62;
  const flameMat = look.material("reward", { unlit: true }) as THREE.MeshBasicMaterial;

  const flameBase = new THREE.Color(look.colorOf("reward"));
  const voidColor = new THREE.Color(look.colorOf("void"));

  const rig = new THREE.Group();
  group.add(rig);

  const thighGeometry = new THREE.BoxGeometry(0.1, THIGH_LEN, 0.13);
  thighGeometry.translate(0, -THIGH_LEN * 0.5, 0);
  const shinGeometry = new THREE.BoxGeometry(0.088, SHIN_LEN, 0.115);
  shinGeometry.translate(0, -SHIN_LEN * 0.5, 0);
  const bootGeometry = new THREE.BoxGeometry(0.17, 0.1, 0.24);
  bootGeometry.translate(0.025, -0.05, 0.01);
  const soleGeometry = new THREE.BoxGeometry(0.178, 0.022, 0.248);
  soleGeometry.translate(0.025, -0.099, 0.01);

  interface Leg {
    hip: THREE.Object3D;
    knee: THREE.Object3D;
    boot: THREE.Object3D;
  }

  function buildLeg(side: number): Leg {
    const hip = new THREE.Object3D();
    hip.position.set(0.115 * side, HIP_Y, -0.03 * side);
    const thigh = new THREE.Mesh(thighGeometry, limbMat);
    hip.add(thigh);
    const knee = new THREE.Object3D();
    knee.position.set(0, -THIGH_LEN, 0);
    hip.add(knee);
    const shin = new THREE.Mesh(shinGeometry, limbMat);
    knee.add(shin);
    const boot = new THREE.Object3D();
    boot.position.set(0, -SHIN_LEN, 0);
    knee.add(boot);
    boot.add(new THREE.Mesh(bootGeometry, bootMat));
    boot.add(new THREE.Mesh(soleGeometry, highlightMat));
    rig.add(hip);
    return { hip, knee, boot };
  }

  const legLead = buildLeg(1);
  const legBack = buildLeg(-1);

  const torso = new THREE.Object3D();
  torso.position.set(0, WAIST_Y, 0);
  rig.add(torso);

  const coat = new THREE.Mesh(new THREE.LatheGeometry(coatProfile(), 10), coatMat);
  coat.position.set(0, -WAIST_Y, 0);
  torso.add(coat);

  const hemPivot = new THREE.Object3D();
  hemPivot.position.set(0, 0.02, 0);
  torso.add(hemPivot);
  const hem = new THREE.Mesh(new THREE.LatheGeometry(hemProfile(), 10), hemMat);
  hemPivot.add(hem);

  const shoulder = new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.07, 0.24), shoulderMat);
  shoulder.position.set(0, SHOULDER_Y - WAIST_Y - 0.035, 0);
  torso.add(shoulder);

  const shoulderEdge = new THREE.Mesh(new THREE.BoxGeometry(0.475, 0.012, 0.245), highlightMat);
  shoulderEdge.position.set(0, SHOULDER_Y - WAIST_Y + 0.006, 0);
  torso.add(shoulderEdge);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.145, 0.07, 8), hoodMat);
  collar.position.set(0, SHOULDER_Y - WAIST_Y + 0.03, 0);
  torso.add(collar);

  const head = new THREE.Object3D();
  head.position.set(0, HEAD_Y - WAIST_Y, 0);
  head.rotation.z = 0.16;
  torso.add(head);

  const hood = new THREE.Mesh(new THREE.LatheGeometry(hoodProfile(), 10), hoodMat);
  head.add(hood);

  const hollow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), voidMat);
  hollow.position.set(0.085, -0.005, 0.1);
  hollow.scale.set(0.92, 1.05, 0.92);
  head.add(hollow);

  const armGeometry = new THREE.BoxGeometry(0.082, 0.16, 0.092);
  armGeometry.translate(0, -0.08, 0);
  const forearmGeometry = new THREE.BoxGeometry(0.076, 0.15, 0.086);
  forearmGeometry.translate(0, -0.075, 0);

  const armOff = new THREE.Object3D();
  armOff.position.set(-0.06, SHOULDER_Y - WAIST_Y + 0.01, 0.13);
  armOff.rotation.z = 0.15;
  torso.add(armOff);
  armOff.add(new THREE.Mesh(armGeometry, limbMat));

  const elbowOff = new THREE.Object3D();
  elbowOff.position.set(0, -0.16, 0);
  elbowOff.rotation.z = 1.15;
  armOff.add(elbowOff);
  elbowOff.add(new THREE.Mesh(forearmGeometry, limbMat));

  const handOff = new THREE.Object3D();
  handOff.position.set(0, -0.15, 0);
  elbowOff.add(handOff);

  const lanternPivot = new THREE.Object3D();
  lanternPivot.position.set(0, 0, 0.06);
  handOff.add(lanternPivot);

  const lantern = new THREE.Group();
  lantern.position.set(0, 0.082, 0);
  lanternPivot.add(lantern);

  const postGeometry = new THREE.BoxGeometry(0.018, 0.13, 0.018);
  const postX = 0.043;
  const postZ = 0.036;
  for (let i = 0; i < 4; i++) {
    const post = new THREE.Mesh(postGeometry, metalMat);
    post.position.set(i < 2 ? postX : -postX, -0.078, i % 2 === 0 ? postZ : -postZ);
    lantern.add(post);
  }
  const capTop = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.026, 0.1), metalMat);
  capTop.position.set(0, -0.004, 0);
  lantern.add(capTop);
  const capBottom = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.024, 0.1), metalMat);
  capBottom.position.set(0, -0.152, 0);
  lantern.add(capBottom);
  const bail = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.008, 4, 10), metalMat);
  bail.position.set(0, 0.022, 0);
  lantern.add(bail);

  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.082, 0.116, 0.07), glassMat);
  glass.position.set(0, -0.078, 0);
  lantern.add(glass);

  const flame = new THREE.Mesh(new THREE.OctahedronGeometry(0.032, 0), flameMat);
  flame.position.set(0, -0.078, 0);
  flame.scale.set(0.8, 1.7, 0.8);
  lantern.add(flame);

  const lanternLight = new THREE.PointLight(
    look.colorOf("reward"),
    tuning.feel.playerLightIntensity,
    tuning.feel.playerLightDistance,
    2
  );
  lanternLight.position.set(0, -0.078, 0.04);
  lantern.add(lanternLight);

  const armLead = new THREE.Object3D();
  armLead.position.set(0.05, SHOULDER_Y - WAIST_Y + 0.01, -0.1);
  torso.add(armLead);
  armLead.add(new THREE.Mesh(armGeometry, limbMat));

  const elbowLead = new THREE.Object3D();
  elbowLead.position.set(0, -0.16, 0);
  armLead.add(elbowLead);
  elbowLead.add(new THREE.Mesh(forearmGeometry, limbMat));

  const hand = new THREE.Object3D();
  hand.position.set(0, -0.15, 0);
  elbowLead.add(hand);

  const weapon = new THREE.Object3D();
  hand.add(weapon);

  const ferrule = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.072, 0.072), metalMat);
  ferrule.position.set(0.02, 0, 0);
  weapon.add(ferrule);

  const needleGeometry = new THREE.BoxGeometry(1, 0.042, 0.042);
  needleGeometry.translate(0.5, 0, 0);
  const needle = new THREE.Mesh(needleGeometry, needleMat);
  weapon.add(needle);

  const tipGeometry = new THREE.ConeGeometry(0.036, 0.13, 4);
  tipGeometry.rotateZ(-Math.PI * 0.5);
  const needleTip = new THREE.Mesh(tipGeometry, highlightMat);
  weapon.add(needleTip);

  group.traverse((node) => {
    const mesh = node as THREE.Mesh;
    if (mesh.isMesh === true) mesh.layers.set(look.actorLayer);
  });
  applyOutline(group, tuning.feel.outlineThickness, look);

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
        live.player.width / BASE_WIDTH
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
      const forward = clampSigned((player.vel.x * player.facing) / Math.max(live.player.walkSpeed, 0.01));
      const running = player.grounded && speed > 0.4 && !dying;

      if (running) {
        runPhase += dt * feel.legSwingSpeed * (0.45 + 0.55 * Math.abs(forward));
      } else {
        runPhase += dt * feel.legSwingSpeed * 0.15;
      }

      const deathP = deathAt < 0 ? 0 : clamp01((t - deathAt) / (Math.max(feel.courierDeathCrumpleMs, 1) / 1000));

      let leanTarget = 0;
      if (dying) leanTarget = -THREE.MathUtils.degToRad(70) * deathP;
      else if (hurt) leanTarget = THREE.MathUtils.degToRad(feel.courierHurtRecoilDeg);
      else if (dashing) leanTarget = -THREE.MathUtils.degToRad(feel.courierLeanRunDeg * 1.8);
      else if (!player.grounded) leanTarget = -THREE.MathUtils.degToRad(feel.courierLeanAirDeg) * forward;
      else leanTarget = -THREE.MathUtils.degToRad(feel.courierLeanRunDeg) * forward;

      if (attacking && !dying && !hurt) {
        const attackLean = THREE.MathUtils.degToRad(feel.courierLeanAttackDeg);
        if (player.attackPhase === "windup") leanTarget += attackLean;
        else if (player.attackPhase === "active") leanTarget -= attackLean;
      }

      lean += (leanTarget - lean) * Math.min(1, 14 * dt);
      torso.rotation.z = lean;

      const twist = attacking && player.attackDir === "side" ? feel.courierAttackTwistDeg : 0;
      const twistTarget = THREE.MathUtils.degToRad(twist) * (player.attackPhase === "windup" ? -1 : 1);
      torso.rotation.y += (twistTarget - torso.rotation.y) * Math.min(1, 16 * dt);

      const breath = dying || running ? 0 : Math.sin(rt * feel.courierBreathSpeed) * feel.courierBreathAmount;
      torso.scale.set(1 - breath * 0.4, 1 + breath, 1 - breath * 0.4);

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

      legLead.boot.position.y = -SHIN_LEN + Math.max(0, -legLead.knee.rotation.z) * feel.courierBootLift;
      legBack.boot.position.y = -SHIN_LEN + Math.max(0, -legBack.knee.rotation.z) * feel.courierBootLift;
      legLead.boot.rotation.z = -legLead.hip.rotation.z - legLead.knee.rotation.z;
      legBack.boot.rotation.z = -legBack.hip.rotation.z - legBack.knee.rotation.z;

      let hemTarget = -THREE.MathUtils.degToRad(feel.courierHemSwingDeg) * forward;
      if (running) hemTarget += Math.sin(runPhase) * THREE.MathUtils.degToRad(feel.courierHemSwingDeg) * 0.3;
      if (dying) hemTarget = 0.3;
      const hemK = Math.max(feel.courierHemFollowPerSec, 0.1);
      hemVel += (hemTarget - hemAngle) * hemK * hemK * 0.5 * dt;
      hemVel *= Math.max(0, 1 - hemK * 0.62 * dt);
      hemAngle += hemVel * dt;
      hemPivot.rotation.z = hemAngle;

      const airFlare = player.grounded || dying ? 0 : feel.courierHemFlareAir;
      const flare = dashing ? feel.courierHemFlareAir * 1.5 : airFlare;
      hem.scale.set(1 + flare, 1 - flare * 0.35, 1 + flare);

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
      armLead.rotation.z += (leadArmTarget - armLead.rotation.z) * Math.min(1, (attacking ? 30 : 12) * dt);
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
      needle.scale.set(needleLength, 1, 1);
      needleTip.position.set(needleLength + 0.055, 0, 0);

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
          const hang = 1 - clamp01(Math.abs(player.vel.y) / Math.max(live.player.jumpVelocity, 0.01));
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

      group.scale.set(scaleXZ * player.facing, scaleY, scaleXZ);

      const flicker =
        1 +
        (Math.sin(rt * feel.flickerSpeed) * 0.6 +
          Math.sin(rt * feel.flickerSpeed * 1.73 + 1.1) * 0.4) *
          feel.flickerAmount;

      let lampScale = 1;
      let lampIntensity = feel.playerLightIntensity * flicker;
      let lampEmissive = feel.playerEmissive * flicker;

      if (dying) {
        const gutter = clamp01((t - deathAt) / (Math.max(feel.courierGutterMs, 1) / 1000));
        const sputter = 1 - gutter + Math.max(0, Math.sin(t * 26)) * (1 - gutter) * 0.5;
        lampScale = Math.max(0.05, sputter);
        lampIntensity = feel.playerLightIntensity * sputter * 0.8;
        lampEmissive = feel.playerEmissive * sputter;
        flameMat.color.copy(flameBase).lerp(voidColor, gutter * 0.85);
      } else {
        flameMat.color.copy(flameBase);
      }

      const invulnerable = t < player.invulnerableUntil && !dashing && !dying;
      if (invulnerable) {
        const period = Math.max(feel.blinkPeriodMs, 1) / 1000;
        const on = Math.floor(t / period) % 2 === 0;
        lampEmissive = on ? feel.playerEmissive : feel.blinkEmissive;
        lampIntensity = on ? feel.playerLightIntensity : feel.playerLightIntensity * 0.25;
        needleMat.emissiveIntensity = on ? 0.12 : 0.02;
      } else {
        needleMat.emissiveIntensity = 0.12;
      }

      flame.scale.set(0.8 * lampScale, 1.7 * lampScale, 0.8 * lampScale);
      glassMat.emissiveIntensity = lampEmissive;
      lanternLight.intensity = lampIntensity;
      lanternLight.distance = feel.playerLightDistance;

      coatMat.emissiveIntensity = feel.playerCoatEmissive;
      hemMat.emissiveIntensity = feel.playerCoatEmissive;
    }
  };
}
