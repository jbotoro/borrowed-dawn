import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { GameEvent, GameState } from "../game/types";

export interface Fx {
  group: THREE.Group;
  onEvent(event: GameEvent, state: GameState, tuning: Tuning): void;
  sync(state: GameState, alpha: number, dt: number, t: number, tuning: Tuning): void;
}

const COLOR_VERMILION = 0xff3b1f;
const COLOR_AMBER = 0xffb648;
const COLOR_HIT = 0xffd9a0;
const COLOR_KILL = 0xff6a2a;
const COLOR_BOSS_HIT = 0xff8a2b;
const COLOR_HAZARD = 0xff4a22;

const TELEGRAPH_LINES = 6;
const HAZARD_SLOTS = 16;
const BURST_SLOTS = 8;
const HALO_SLOTS = 4;

interface Burst {
  points: THREE.Points;
  material: THREE.PointsMaterial;
  geometry: THREE.BufferGeometry;
  attribute: THREE.BufferAttribute;
  velocity: Float32Array;
  startAt: number;
  active: boolean;
}

interface Halo {
  group: THREE.Group;
  ring: THREE.Mesh;
  light: THREE.PointLight;
}

export function createFx(tuning: Tuning): Fx {
  const group = new THREE.Group();
  group.name = "fx";

  const telegraphMat = new THREE.MeshBasicMaterial({
    color: COLOR_VERMILION,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const arcMat = new THREE.MeshBasicMaterial({
    color: COLOR_VERMILION,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const ringMat = new THREE.MeshBasicMaterial({
    color: COLOR_VERMILION,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const hazardMat = new THREE.MeshStandardMaterial({
    color: COLOR_HAZARD,
    emissive: COLOR_HAZARD,
    emissiveIntensity: tuning.feel.hazardEmissive,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const haloMat = new THREE.MeshBasicMaterial({
    color: COLOR_AMBER,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const flameMat = new THREE.MeshStandardMaterial({
    color: COLOR_AMBER,
    emissive: COLOR_AMBER,
    emissiveIntensity: tuning.feel.playerEmissive,
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  const unitBox = new THREE.BoxGeometry(1, 1, 1);

  const lines: THREE.Mesh[] = [];
  for (let i = 0; i < TELEGRAPH_LINES; i++) {
    const mesh = new THREE.Mesh(unitBox, telegraphMat);
    mesh.visible = false;
    group.add(mesh);
    lines.push(mesh);
  }

  const arcInner = Math.max(0.1, 1 - tuning.feel.sweepArcThickness);
  const arc = new THREE.Mesh(new THREE.RingGeometry(arcInner, 1, 28, 1, -0.75, 1.5), arcMat);
  arc.visible = false;
  group.add(arc);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.05, 4, 28), ringMat);
  ring.visible = false;
  group.add(ring);

  const hazards: THREE.Mesh[] = [];
  for (let i = 0; i < HAZARD_SLOTS; i++) {
    const mesh = new THREE.Mesh(unitBox, hazardMat);
    mesh.visible = false;
    group.add(mesh);
    hazards.push(mesh);
  }

  const halos: Halo[] = [];
  const haloRingGeometry = new THREE.TorusGeometry(1, 0.12, 4, 18);
  for (let i = 0; i < HALO_SLOTS; i++) {
    const holder = new THREE.Group();
    const mesh = new THREE.Mesh(haloRingGeometry, haloMat);
    holder.add(mesh);
    const light = new THREE.PointLight(COLOR_AMBER, tuning.feel.pickupLightIntensity, 5, 2);
    holder.add(light);
    holder.visible = false;
    group.add(holder);
    halos.push({ group: holder, ring: mesh, light });
  }

  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1, 7), flameMat);
  flame.visible = false;
  group.add(flame);
  const flameLight = new THREE.PointLight(COLOR_AMBER, tuning.feel.pickupLightIntensity, 6, 2);
  flameLight.visible = false;
  group.add(flameLight);

  const sparkCount = Math.max(4, Math.round(tuning.feel.sparkCount));
  const bursts: Burst[] = [];
  for (let i = 0; i < BURST_SLOTS; i++) {
    const geometry = new THREE.BufferGeometry();
    const attribute = new THREE.BufferAttribute(new Float32Array(sparkCount * 3), 3);
    attribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", attribute);
    const material = new THREE.PointsMaterial({
      color: COLOR_HIT,
      size: tuning.feel.sparkSize,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    points.visible = false;
    group.add(points);
    bursts.push({
      points,
      material,
      geometry,
      attribute,
      velocity: new Float32Array(sparkCount * 3),
      startAt: 0,
      active: false
    });
  }

  let nextBurst = 0;

  function spawnBurst(x: number, y: number, color: number, t: number, live: Tuning): void {
    const burst = bursts[nextBurst % BURST_SLOTS];
    nextBurst = (nextBurst + 1) % BURST_SLOTS;
    if (burst === undefined) return;

    const speed = live.feel.sparkSpeed;
    const array = burst.attribute.array as Float32Array;
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * 0.9;
      const mag = speed * (0.35 + Math.random() * 0.65);
      array[i * 3] = 0;
      array[i * 3 + 1] = 0;
      array[i * 3 + 2] = 0;
      burst.velocity[i * 3] = Math.cos(angle) * mag;
      burst.velocity[i * 3 + 1] = Math.sin(angle) * mag;
      burst.velocity[i * 3 + 2] = pitch * mag * 0.3;
    }
    burst.attribute.needsUpdate = true;
    burst.material.color.setHex(color);
    burst.material.size = live.feel.sparkSize;
    burst.material.opacity = 1;
    burst.points.position.set(x, y, 0.4);
    burst.points.visible = true;
    burst.startAt = t;
    burst.active = true;
  }

  function syncBursts(dt: number, t: number, live: Tuning): void {
    const life = Math.max(live.feel.sparkLifeMs, 1) / 1000;
    const gravity = live.feel.sparkGravity;
    for (const burst of bursts) {
      if (!burst.active) continue;
      const age = t - burst.startAt;
      if (age >= life || age < 0) {
        burst.active = false;
        burst.points.visible = false;
        continue;
      }
      const array = burst.attribute.array as Float32Array;
      for (let i = 0; i < sparkCount; i++) {
        const vy = (burst.velocity[i * 3 + 1] ?? 0) - gravity * dt;
        burst.velocity[i * 3 + 1] = vy;
        array[i * 3] = (array[i * 3] ?? 0) + (burst.velocity[i * 3] ?? 0) * dt;
        array[i * 3 + 1] = (array[i * 3 + 1] ?? 0) + vy * dt;
        array[i * 3 + 2] = (array[i * 3 + 2] ?? 0) + (burst.velocity[i * 3 + 2] ?? 0) * dt;
      }
      burst.attribute.needsUpdate = true;
      burst.material.opacity = 1 - age / life;
    }
  }

  return {
    group,

    onEvent(event: GameEvent, state: GameState, live: Tuning): void {
      const t = state.time;
      if (event.kind === "attackHit") {
        spawnBurst(event.x, event.y, COLOR_HIT, t, live);
      } else if (event.kind === "enemyDeath") {
        spawnBurst(event.x, event.y, COLOR_KILL, t, live);
      } else if (event.kind === "bossHurt") {
        spawnBurst(event.x, event.y, COLOR_BOSS_HIT, t, live);
      } else if (event.kind === "death") {
        spawnBurst(
          state.player.pos.x,
          state.player.pos.y + live.player.height * 0.5,
          COLOR_AMBER,
          t,
          live
        );
      } else if (event.kind === "pickup" || event.kind === "checkpoint") {
        spawnBurst(event.x, event.y, COLOR_AMBER, t, live);
      }
    },

    sync(state: GameState, alpha: number, dt: number, t: number, live: Tuning): void {
      const feel = live.feel;

      let lineIndex = 0;
      for (const enemy of state.enemies) {
        if (lineIndex >= TELEGRAPH_LINES) break;
        if (!enemy.alive || enemy.state !== "telegraph") continue;
        const mesh = lines[lineIndex];
        if (mesh === undefined) break;
        lineIndex++;
        const reach =
          enemy.kind === "guard"
            ? live.guard.lungeSpeed * (live.guard.lungeMs / 1000)
            : live.stomper.hopVelocityX * 0.8;
        const ex = enemy.prev.x + (enemy.pos.x - enemy.prev.x) * alpha;
        const ey = enemy.prev.y + (enemy.pos.y - enemy.prev.y) * alpha;
        mesh.visible = true;
        mesh.scale.set(reach, feel.telegraphLineHeight, feel.telegraphLineHeight);
        mesh.position.set(ex + (reach * 0.5) * enemy.facing, ey + feel.telegraphLineHeight, 0.3);
      }
      for (let i = lineIndex; i < TELEGRAPH_LINES; i++) {
        const mesh = lines[i];
        if (mesh !== undefined) mesh.visible = false;
      }

      const boss = state.boss;
      if (boss !== null && boss.state === "sweepTelegraph") {
        const dur = Math.max(live.boss.sweepTelegraphMs, 1) / 1000;
        const p = Math.min(1, Math.max(0, 1 - (boss.stateUntil - t) / dur));
        arc.visible = true;
        arc.position.set(boss.pos.x, boss.pos.y + live.boss.height * 0.35, 0.3);
        arc.rotation.z = boss.facing === 1 ? 0 : Math.PI;
        arc.scale.setScalar(live.boss.sweepReach * (0.55 + 0.45 * p));
        arcMat.opacity = feel.sweepArcOpacity * (0.35 + 0.65 * p);
      } else {
        arc.visible = false;
      }

      if (boss !== null && boss.state === "stompTelegraph") {
        const dur = Math.max(live.boss.stompTelegraphMs, 1) / 1000;
        const p = Math.min(1, Math.max(0, 1 - (boss.stateUntil - t) / dur));
        ring.visible = true;
        ring.position.set(boss.pos.x, boss.pos.y + 0.1, 0.3);
        ring.scale.set(feel.telegraphRingRadius * p, feel.telegraphRingRadius * p * 0.4, 1);
        ringMat.opacity = 0.75 * (1 - p * 0.5);
      } else {
        ring.visible = false;
      }

      let hazardIndex = 0;
      for (const hazard of state.hazards) {
        if (hazardIndex >= HAZARD_SLOTS) break;
        if (!hazard.alive) continue;
        const mesh = hazards[hazardIndex];
        if (mesh === undefined) break;
        hazardIndex++;
        const hx = hazard.prev.x + (hazard.pos.x - hazard.prev.x) * alpha;
        const hy = hazard.prev.y + (hazard.pos.y - hazard.prev.y) * alpha;
        mesh.visible = true;
        mesh.scale.set(hazard.w, hazard.h, hazard.h);
        mesh.position.set(hx, hy + hazard.h * 0.5, 0);
      }
      for (let i = hazardIndex; i < HAZARD_SLOTS; i++) {
        const mesh = hazards[i];
        if (mesh !== undefined) mesh.visible = false;
      }
      hazardMat.emissiveIntensity = feel.hazardEmissive;

      let haloIndex = 0;
      for (const pickup of state.pickups) {
        if (haloIndex >= HALO_SLOTS) break;
        if (pickup.collected) continue;
        const halo = halos[haloIndex];
        if (halo === undefined) break;
        haloIndex++;
        const bob = Math.sin(t * feel.pickupBobSpeed + haloIndex) * feel.pickupBobAmp;
        halo.group.visible = true;
        halo.group.position.set(pickup.pos.x, pickup.pos.y + feel.pickupHaloRadius + bob, 0);
        halo.ring.scale.setScalar(feel.pickupHaloRadius);
        halo.ring.rotation.y = t * 1.2;
        halo.light.intensity = feel.pickupLightIntensity;
        halo.light.distance = feel.pickupLightDistance;
      }
      for (let i = haloIndex; i < HALO_SLOTS; i++) {
        const halo = halos[i];
        if (halo !== undefined) halo.group.visible = false;
      }

      const showCheckpoint = state.progress.checkpointRoom === state.roomId;
      flame.visible = showCheckpoint;
      flameLight.visible = showCheckpoint;
      if (showCheckpoint) {
        const cp = state.progress.checkpoint;
        const flicker = 1 + Math.sin(t * 7.3) * 0.06;
        flame.position.set(cp.x, cp.y + feel.checkpointFlameHeight * 0.5, 0);
        flame.scale.set(1, feel.checkpointFlameHeight * flicker, 1);
        flameMat.emissiveIntensity = feel.playerEmissive * flicker;
        flameLight.position.set(cp.x, cp.y + feel.checkpointFlameHeight, 0.3);
        flameLight.intensity = feel.pickupLightIntensity * flicker;
        flameLight.distance = feel.pickupLightDistance;
      }

      syncBursts(Math.max(dt, 0), t, live);
    }
  };
}
