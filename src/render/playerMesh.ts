import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { PlayerState } from "../game/types";

export interface PlayerMesh {
  group: THREE.Group;
  sync(player: PlayerState, alpha: number, t: number, tuning: Tuning): void;
}

const COLOR_BODY = 0x3c4757;
const COLOR_CAP = 0xe8eff4;
const COLOR_LEG = 0x252d38;
const COLOR_CORE = 0xffb648;
const COLOR_CORE_EMISSIVE = 0xff9a2e;
const COLOR_COAT_RIM = 0x7ea3d6;
const COLOR_NEEDLE = 0xdfe8ef;

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export function createPlayerMesh(tuning: Tuning): PlayerMesh {
  const group = new THREE.Group();
  group.name = "player";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: COLOR_BODY,
    emissive: COLOR_COAT_RIM,
    emissiveIntensity: tuning.feel.playerCoatEmissive,
    roughness: 0.68,
    metalness: 0.2,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const capMat = new THREE.MeshStandardMaterial({
    color: COLOR_CAP,
    emissive: COLOR_CAP,
    emissiveIntensity: tuning.feel.playerCapEmissive,
    roughness: 0.3,
    metalness: 0.6,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const legMat = new THREE.MeshStandardMaterial({
    color: COLOR_LEG,
    emissive: COLOR_COAT_RIM,
    emissiveIntensity: tuning.feel.playerCoatEmissive * 0.5,
    roughness: 0.85,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const coreMat = new THREE.MeshStandardMaterial({
    color: COLOR_CORE,
    emissive: COLOR_CORE_EMISSIVE,
    emissiveIntensity: tuning.feel.playerEmissive,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const needleMat = new THREE.MeshStandardMaterial({
    color: COLOR_NEEDLE,
    roughness: 0.3,
    metalness: 0.7,
    emissive: COLOR_NEEDLE,
    emissiveIntensity: 0.15,
    flatShading: true,
    side: THREE.DoubleSide
  });

  const rig = new THREE.Group();
  group.add(rig);

  const body = new THREE.Mesh(new THREE.ConeGeometry(0.44, 0.62, 7), bodyMat);
  body.position.set(0, 0.6, 0);
  rig.add(body);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.34, 0.2, 8), capMat);
  cap.position.set(0, 0.95, 0);
  rig.add(cap);

  const capStem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 6), capMat);
  capStem.position.set(0, 1.08, 0);
  rig.add(capStem);

  const legGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.22);
  const legLeft = new THREE.Object3D();
  legLeft.position.set(-0.18, 0.31, 0);
  const legLeftMesh = new THREE.Mesh(legGeometry, legMat);
  legLeftMesh.position.set(0, -0.16, 0);
  legLeft.add(legLeftMesh);
  rig.add(legLeft);

  const legRight = new THREE.Object3D();
  legRight.position.set(0.18, 0.31, 0);
  const legRightMesh = new THREE.Mesh(legGeometry, legMat);
  legRightMesh.position.set(0, -0.16, 0);
  legRight.add(legRightMesh);
  rig.add(legRight);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), coreMat);
  core.position.set(0, 0.42, 0.28);
  rig.add(core);

  const coreLight = new THREE.PointLight(
    COLOR_CORE,
    tuning.feel.playerLightIntensity,
    tuning.feel.playerLightDistance,
    2
  );
  coreLight.position.set(0, tuning.player.height * 0.45, 0.4);
  group.add(coreLight);

  const needleGeometry = new THREE.BoxGeometry(1, 0.07, 0.07);
  needleGeometry.translate(0.5, 0, 0);
  const weapon = new THREE.Object3D();
  const needle = new THREE.Mesh(needleGeometry, needleMat);
  weapon.add(needle);
  group.add(weapon);

  rig.scale.set(tuning.player.width, tuning.player.height, tuning.player.width);

  let squashY = 1;
  let lastGrounded = true;
  let lastT = 0;

  function swingAngle(player: PlayerState, t: number, live: Tuning): number {
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

  return {
    group,

    sync(player: PlayerState, alpha: number, t: number, live: Tuning): void {
      const feel = live.feel;
      const dt = Math.max(0, Math.min(t - lastT, 0.1));
      lastT = t;

      const x = player.prev.x + (player.pos.x - player.prev.x) * alpha;
      const y = player.prev.y + (player.pos.y - player.prev.y) * alpha;
      group.position.set(x, y, 0);

      rig.scale.set(live.player.width, live.player.height, live.player.width);

      if (player.grounded && !lastGrounded) {
        squashY = feel.landSquash;
      } else if (!player.grounded && lastGrounded && player.vel.y > 0) {
        squashY = 2 - feel.jumpSquash;
      }
      lastGrounded = player.grounded;

      const recover = Math.min(1, Math.max(feel.squashRecoverPerSec, 0) * dt);
      squashY += (1 - squashY) * recover;

      const dashing = t < player.dashUntil;
      let scaleY = squashY;
      let scaleXZ = 1 / Math.sqrt(Math.max(squashY, 0.05));
      if (dashing) {
        scaleXZ *= feel.dashStretch;
        scaleY /= feel.dashStretch;
      }

      group.scale.set(scaleXZ * player.facing, scaleY, scaleXZ);

      const moving = player.grounded && Math.abs(player.vel.x) > 0.4;
      if (moving) {
        const swing = THREE.MathUtils.degToRad(feel.legSwingDeg);
        const phase = t * feel.legSwingSpeed;
        legLeft.rotation.z = Math.sin(phase) * swing;
        legRight.rotation.z = -Math.sin(phase) * swing;
      } else {
        legLeft.rotation.z *= 0.8;
        legRight.rotation.z *= 0.8;
      }

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
      weapon.position.set(0, live.player.height * feel.needleHoldRatio, 0.18);

      let base = 0;
      if (player.attackDir === "up") base = Math.PI * 0.5;
      else if (player.attackDir === "down") base = -Math.PI * 0.5;
      weapon.rotation.z = base + swingAngle(player, t, live);

      coreLight.position.set(0, live.player.height * 0.45, 0.4);
      coreLight.distance = feel.playerLightDistance;

      const invulnerable = t < player.invulnerableUntil && !dashing;
      if (invulnerable) {
        const period = Math.max(feel.blinkPeriodMs, 1) / 1000;
        const on = Math.floor(t / period) % 2 === 0;
        coreMat.emissiveIntensity = on ? feel.playerEmissive : feel.blinkEmissive;
        coreLight.intensity = on ? feel.playerLightIntensity : feel.playerLightIntensity * 0.25;
        needleMat.emissiveIntensity = on ? 0.15 : 0.02;
      } else {
        coreMat.emissiveIntensity = feel.playerEmissive;
        coreLight.intensity = feel.playerLightIntensity;
        needleMat.emissiveIntensity = 0.15;
      }

      bodyMat.emissiveIntensity = feel.playerCoatEmissive;
      legMat.emissiveIntensity = feel.playerCoatEmissive * 0.5;
      capMat.emissiveIntensity = feel.playerCapEmissive;
    }
  };
}
