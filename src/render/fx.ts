import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { GameEvent, GameState, PlayerState, Room, Vec2 } from "../game/types";
import type { LookProfile } from "./look";
import { ACTOR_LAYER, registerActorLight } from "./look";
import { lampAnchor } from "./roomMesh";

export interface Fx {
  group: THREE.Group;
  setRoom(room: Room): void;
  onEvent(event: GameEvent, state: GameState, tuning: Tuning): void;
  sync(
    state: GameState,
    player: PlayerState,
    alpha: number,
    dt: number,
    t: number,
    rt: number,
    tuning: Tuning
  ): void;
}

const MARK_SLOTS = 6;
const BURST_SLOTS = 8;
const CHEVRON_SLOTS = 10;
const PUFF_SLOTS = 14;
const LIFT_SLOTS = 12;
const PICKUP_SLOTS = 4;
const EMBER_TAIL = 3;
const TONGUE_COUNT = 4;
const TONGUE_X = [-0.32, -0.12, 0.11, 0.34];
const TONGUE_BASE_Y = [0.4, 0.74, 0.7, 0.36];
const TONGUE_HEIGHT = [0.46, 0.72, 0.64, 0.42];
const SPARK_WAVES = 8;
const SPARK_LIFE = 0.55;
const MARK_THICKNESS = 0.055;
const FX_Z = 0.35;
const BEHIND_Z = -0.25;
const MARK_Z = -0.42;

interface Sprite {
  mesh: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  spin: number;
  flip: number;
  born: number;
  life: number;
  active: boolean;
}

interface Mark {
  group: THREE.Group;
  fill: THREE.Mesh;
  fillMaterial: THREE.MeshBasicMaterial;
  edges: THREE.Mesh[];
  edgeMaterial: THREE.MeshBasicMaterial;
}

interface Ridge {
  group: THREE.Group;
  crest: THREE.Mesh;
  core: THREE.Mesh;
  underglow: THREE.Mesh;
  tongues: THREE.Mesh[];
}

interface EmberView {
  group: THREE.Group;
  head: THREE.Mesh;
  tail: THREE.Mesh[];
}

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function starGeometry(spikes: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const points = Math.max(4, Math.round(spikes)) * 2;
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const radius = i % 2 === 0 ? 1 : 0.34;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function chevronGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0.5, 0);
  shape.lineTo(-0.2, 0.5);
  shape.lineTo(-0.5, 0.5);
  shape.lineTo(0.16, 0);
  shape.lineTo(-0.5, -0.5);
  shape.lineTo(-0.2, -0.5);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function puffGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-0.5, 0);
  shape.lineTo(-0.34, 0.34);
  shape.lineTo(0, 0.5);
  shape.lineTo(0.34, 0.34);
  shape.lineTo(0.5, 0);
  shape.lineTo(0.24, 0.1);
  shape.lineTo(-0.24, 0.1);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function ridgeGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-0.5, 0);
  shape.lineTo(-0.28, 0.58);
  shape.lineTo(0, 1);
  shape.lineTo(0.28, 0.58);
  shape.lineTo(0.5, 0);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function glowTexture(): THREE.Texture | null {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx === null) return null;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.3, "rgba(255,255,255,0.5)");
  grad.addColorStop(0.68, "rgba(255,255,255,0.12)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function tongueGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-0.5, 0);
  shape.lineTo(-0.3, 0.34);
  shape.lineTo(-0.12, 0.62);
  shape.lineTo(0.02, 1);
  shape.lineTo(0.16, 0.7);
  shape.lineTo(0.36, 0.42);
  shape.lineTo(0.5, 0);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function diamondGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.5);
  shape.lineTo(0.3, 0);
  shape.lineTo(0, -0.5);
  shape.lineTo(-0.3, 0);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

export function createFx(tuning: Tuning, look: LookProfile): Fx {
  const group = new THREE.Group();
  group.name = "fx";

  const plane = new THREE.PlaneGeometry(1, 1);
  let starSpikes = tuning.feel.fxBurstSpikes;
  let star = starGeometry(starSpikes);
  const chevron = chevronGeometry();
  const puff = puffGeometry();
  const ridge = ridgeGeometry();
  const tongue = tongueGeometry();
  const diamond = diamondGeometry();

  function flatMaterial(
    role: "danger" | "reward" | "actorMetal" | "ash",
    opacity: number,
    shade?: number
  ): THREE.MeshBasicMaterial {
    const material = look.material(role, {
      unlit: true,
      fog: false,
      shade: shade === undefined ? 1 : shade
    }) as THREE.MeshBasicMaterial;
    material.transparent = true;
    material.opacity = opacity;
    material.depthWrite = false;
    material.side = THREE.DoubleSide;
    return material;
  }

  function createSprites(
    count: number,
    geometry: THREE.BufferGeometry,
    role: "danger" | "reward" | "actorMetal" | "ash",
    shade: number,
    renderZ: number
  ): Sprite[] {
    const pool: Sprite[] = [];
    for (let i = 0; i < count; i++) {
      const material = flatMaterial(role, 1, shade);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      mesh.position.z = renderZ;
      mesh.frustumCulled = false;
      mesh.layers.set(ACTOR_LAYER);
      group.add(mesh);
      pool.push({
        mesh,
        material,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 1,
        spin: 0,
        flip: 1,
        born: 0,
        life: 1,
        active: false
      });
    }
    return pool;
  }

  function spawnSprite(
    pool: Sprite[],
    cursor: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
    size: number,
    spin: number,
    t: number,
    life: number,
    flip?: number
  ): number {
    const slot = pool[cursor % pool.length];
    if (slot === undefined) return cursor;
    slot.x = x;
    slot.y = y;
    slot.vx = vx;
    slot.vy = vy;
    slot.size = size;
    slot.spin = spin;
    slot.flip = flip === undefined ? 1 : flip;
    slot.born = t;
    slot.life = Math.max(life, 0.02);
    slot.active = true;
    slot.mesh.visible = true;
    return (cursor + 1) % pool.length;
  }

  function stepSprites(pool: Sprite[], dt: number, t: number, drag: number, gravity: number): void {
    for (const slot of pool) {
      if (!slot.active) continue;
      const age = t - slot.born;
      if (age < 0 || age >= slot.life) {
        slot.active = false;
        slot.mesh.visible = false;
        continue;
      }
      const decay = Math.max(0, 1 - drag * dt);
      slot.vx *= decay;
      slot.vy = slot.vy * decay - gravity * dt;
      slot.x += slot.vx * dt;
      slot.y += slot.vy * dt;
      const p = age / slot.life;
      slot.mesh.position.x = slot.x;
      slot.mesh.position.y = slot.y;
      slot.mesh.rotation.z += slot.spin * dt;
      slot.material.opacity = 1 - p * p;
    }
  }

  function createMark(role: "danger" | "reward", fillOpacity: number): Mark {
    const holder = new THREE.Group();
    holder.visible = false;
    const fillMaterial = flatMaterial(role, fillOpacity);
    const fill = new THREE.Mesh(plane, fillMaterial);
    fill.layers.set(ACTOR_LAYER);
    holder.add(fill);
    const edgeMaterial = flatMaterial(role, 1);
    const edges: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const edge = new THREE.Mesh(plane, edgeMaterial);
      edge.layers.set(ACTOR_LAYER);
      holder.add(edge);
      edges.push(edge);
    }
    group.add(holder);
    return { group: holder, fill, fillMaterial, edges, edgeMaterial };
  }

  function placeMark(
    mark: Mark,
    x: number,
    y: number,
    w: number,
    h: number,
    progress: number,
    edgeFraction: number,
    peakOpacity: number
  ): void {
    const span = Math.max(edgeFraction, 0.001);
    if (progress >= span) {
      mark.group.visible = false;
      return;
    }
    mark.group.visible = true;
    mark.group.position.set(0, 0, MARK_Z);
    const cx = x + w * 0.5;
    const cy = y + h * 0.5;
    mark.fill.visible = false;
    mark.fillMaterial.opacity = 0;
    mark.edgeMaterial.opacity = peakOpacity * (1 - progress / span);
    const tk = MARK_THICKNESS;
    const bottom = mark.edges[0];
    const top = mark.edges[1];
    const left = mark.edges[2];
    const right = mark.edges[3];
    if (bottom !== undefined) {
      bottom.position.set(cx, y + tk * 0.5, 0.01);
      bottom.scale.set(w, tk, 1);
    }
    if (top !== undefined) {
      top.position.set(cx, y + h - tk * 0.5, 0.01);
      top.scale.set(w, tk, 1);
    }
    if (left !== undefined) {
      left.position.set(x + tk * 0.5, cy, 0.01);
      left.scale.set(tk, h, 1);
    }
    if (right !== undefined) {
      right.position.set(x + w - tk * 0.5, cy, 0.01);
      right.scale.set(tk, h, 1);
    }
  }

  const arcMaterial = flatMaterial("actorMetal", tuning.feel.fxArcOpacity);

  function buildArc(spanDeg: number, innerRatio: number): THREE.BufferGeometry {
    const span = THREE.MathUtils.degToRad(spanDeg);
    return new THREE.RingGeometry(Math.max(0.05, innerRatio), 1, 22, 1, -span * 0.5, span);
  }

  let arcSpanDeg = tuning.feel.fxArcSpanDeg;
  let arcInnerRatio = tuning.feel.fxArcInnerRatio;
  let arcGeometry = buildArc(arcSpanDeg, arcInnerRatio);
  const arc = new THREE.Mesh(arcGeometry, arcMaterial);
  arc.visible = false;
  arc.frustumCulled = false;
  arc.layers.set(ACTOR_LAYER);
  group.add(arc);

  const bursts = createSprites(BURST_SLOTS, star, "actorMetal", 1, FX_Z);
  const chevrons = createSprites(CHEVRON_SLOTS, chevron, "ash", 1, BEHIND_Z);
  const puffs = createSprites(PUFF_SLOTS, puff, "ash", 0.8, FX_Z * 0.5);
  const lifts = createSprites(LIFT_SLOTS, diamond, "reward", 1, FX_Z);

  const burstAmber = new THREE.Color(look.colorOf("reward"));
  const burstPorcelain = new THREE.Color(look.colorOf("actorMetal"));

  let burstCursor = 0;
  let chevronCursor = 0;
  let puffCursor = 0;
  let liftCursor = 0;

  const enemyMarks: Mark[] = [];
  for (let i = 0; i < MARK_SLOTS; i++) enemyMarks.push(createMark("danger", 0.16));
  const sweepMark = createMark("danger", 0.2);
  const stompMark = createMark("danger", 0.12);

  const ridgeCoreMaterial = look.material("danger", { unlit: true, fog: false, shade: 0.66 }) as
    THREE.MeshBasicMaterial;
  const ridgeHeartMaterial = look.material("danger", { unlit: true, fog: false, shade: 1.5 }) as
    THREE.MeshBasicMaterial;
  const ridgeTongueMaterial = look.material("danger", { unlit: true, fog: false, shade: 1.18 }) as
    THREE.MeshBasicMaterial;
  ridgeCoreMaterial.side = THREE.DoubleSide;
  ridgeHeartMaterial.side = THREE.DoubleSide;
  ridgeTongueMaterial.side = THREE.DoubleSide;
  const ridgeUnderglowMaterial = flatMaterial("reward", 0.5);
  ridgeUnderglowMaterial.blending = THREE.AdditiveBlending;
  ridgeUnderglowMaterial.map = glowTexture();

  const ridges: Ridge[] = [];
  const hazardSlots = Math.max(1, Math.round(tuning.world.hazardCapacity));
  for (let i = 0; i < hazardSlots; i++) {
    const holder = new THREE.Group();
    holder.visible = false;
    const underglow = new THREE.Mesh(plane, ridgeUnderglowMaterial);
    underglow.position.z = -0.02;
    underglow.layers.set(ACTOR_LAYER);
    holder.add(underglow);
    const tongues: THREE.Mesh[] = [];
    for (let k = 0; k < TONGUE_COUNT; k++) {
      const flame = new THREE.Mesh(tongue, ridgeTongueMaterial);
      flame.position.z = 0.01;
      flame.layers.set(ACTOR_LAYER);
      holder.add(flame);
      tongues.push(flame);
    }
    const core = new THREE.Mesh(ridge, ridgeCoreMaterial);
    core.position.z = 0;
    core.layers.set(ACTOR_LAYER);
    holder.add(core);
    const crest = new THREE.Mesh(ridge, ridgeHeartMaterial);
    crest.position.z = 0.02;
    crest.layers.set(ACTOR_LAYER);
    holder.add(crest);
    group.add(holder);
    ridges.push({ group: holder, crest, core, underglow, tongues });
  }

  const sparkSlots =
    Math.min(hazardSlots, SPARK_WAVES) * Math.max(2, Math.round(tuning.feel.fireWaveSparks));
  const sparks = createSprites(sparkSlots, diamond, "reward", 1, FX_Z + 0.08);
  let sparkCursor = 0;
  const sparkDue: number[] = [];
  for (let i = 0; i < 64; i++) sparkDue.push(0);

  const emberHeadMaterial = flatMaterial("reward", 1);
  const emberTailMaterials: THREE.MeshBasicMaterial[] = [];
  for (let i = 0; i < EMBER_TAIL; i++) {
    emberTailMaterials.push(flatMaterial("reward", 0.5 - i * 0.14, 0.92 - i * 0.18));
  }

  const embers: EmberView[] = [];
  for (let i = 0; i < hazardSlots; i++) {
    const holder = new THREE.Group();
    holder.visible = false;
    const tail: THREE.Mesh[] = [];
    for (let k = EMBER_TAIL - 1; k >= 0; k--) {
      const material = emberTailMaterials[k];
      if (material === undefined) continue;
      const mesh = new THREE.Mesh(diamond, material);
      mesh.frustumCulled = false;
      mesh.layers.set(ACTOR_LAYER);
      holder.add(mesh);
      tail[k] = mesh;
    }
    const head = new THREE.Mesh(diamond, emberHeadMaterial);
    head.frustumCulled = false;
    head.layers.set(ACTOR_LAYER);
    holder.add(head);
    group.add(holder);
    embers.push({ group: holder, head, tail });
  }

  interface PickupView {
    group: THREE.Group;
    mesh: THREE.Mesh;
    light: THREE.PointLight;
  }

  const pickupMaterial = flatMaterial("reward", 1);
  const pickups: PickupView[] = [];
  for (let i = 0; i < PICKUP_SLOTS; i++) {
    const holder = new THREE.Group();
    holder.visible = false;
    const mesh = new THREE.Mesh(diamond, pickupMaterial);
    mesh.layers.set(ACTOR_LAYER);
    holder.add(mesh);
    const light = new THREE.PointLight(look.colorOf("reward"), 0, 5, 2);
    light.layers.enableAll();
    registerActorLight(light);
    holder.add(light);
    group.add(holder);
    pickups.push({ group: holder, mesh, light });
  }

  const flameMaterial = flatMaterial("reward", 1);
  const flame = new THREE.Mesh(diamond, flameMaterial);
  flame.visible = false;
  flame.layers.set(ACTOR_LAYER);
  group.add(flame);
  const flameLight = new THREE.PointLight(look.colorOf("reward"), 0, 6, 2);
  flameLight.layers.enableAll();
  registerActorLight(flameLight);
  flameLight.visible = false;
  group.add(flameLight);

  const hazardSeen: boolean[] = [];
  for (let i = 0; i < 64; i++) hazardSeen.push(false);

  let nextIdleLiftAt = 0;
  let lampSpot: Vec2 | null = null;
  let roomCheckpoint: Vec2 | null = null;

  function refreshStar(live: Tuning): void {
    if (live.feel.fxBurstSpikes === starSpikes) return;
    starSpikes = live.feel.fxBurstSpikes;
    const next = starGeometry(starSpikes);
    for (const slot of bursts) slot.mesh.geometry = next;
    star.dispose();
    star = next;
  }

  function spawnBurst(x: number, y: number, amber: boolean, t: number, live: Tuning): void {
    refreshStar(live);
    const slot = bursts[burstCursor % bursts.length];
    if (slot === undefined) return;
    slot.material.color.copy(amber ? burstAmber : burstPorcelain);
    burstCursor = spawnSprite(
      bursts,
      burstCursor,
      x,
      y,
      0,
      0,
      live.feel.fxBurstRadius,
      0,
      t,
      Math.max(live.feel.fxBurstLifeMs, 1) / 1000
    );
  }

  function spawnChevrons(x: number, y: number, dir: number, t: number, live: Tuning): void {
    const count = Math.max(1, Math.round(live.feel.fxChevronCount));
    for (let i = 0; i < count; i++) {
      const offset = (i + 1) * live.feel.fxChevronSpacing;
      chevronCursor = spawnSprite(
        chevrons,
        chevronCursor,
        x - dir * offset,
        y + (i % 2 === 0 ? 0.08 : -0.08),
        -dir * (1.2 + i * 0.3),
        0,
        live.feel.fxChevronSize * (1 - i * 0.12),
        0,
        t,
        (Math.max(live.feel.fxChevronLifeMs, 1) / 1000) * (1 - i * 0.1),
        dir
      );
    }
  }

  function spawnPuffs(x: number, y: number, t: number, live: Tuning, spread: number): void {
    const count = Math.max(1, Math.round(live.feel.fxDustCount));
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const step = Math.floor(i / 2) + 1;
      puffCursor = spawnSprite(
        puffs,
        puffCursor,
        x + side * step * spread * 0.4,
        y,
        side * step * spread * 0.8,
        live.feel.fxDustRise,
        live.feel.fxDustSize * (1 - i * 0.08),
        0,
        t,
        Math.max(live.feel.fxDustLifeMs, 1) / 1000
      );
    }
  }

  function spawnLift(x: number, y: number, t: number, live: Tuning): void {
    const count = Math.max(1, Math.round(live.feel.fxLiftCount));
    for (let i = 0; i < count; i++) {
      const side = (i % 2 === 0 ? 1 : -1) * (0.1 + (i % 3) * 0.12);
      liftCursor = spawnSprite(
        lifts,
        liftCursor,
        x + side,
        y + i * 0.08,
        side * 0.2,
        live.feel.fxLiftRise * (0.7 + (i % 3) * 0.2),
        live.feel.fxLiftSize * (1 - i * 0.07),
        0,
        t,
        Math.max(live.feel.fxLiftLifeMs, 1) / 1000
      );
    }
  }

  function syncSprites(pool: Sprite[]): void {
    for (const slot of pool) {
      if (!slot.active) continue;
      slot.mesh.scale.set(slot.size * slot.flip, slot.size, 1);
    }
  }

  function syncArc(player: PlayerState, alpha: number, t: number, live: Tuning): void {
    if (player.attackPhase !== "active") {
      arc.visible = false;
      return;
    }
    if (live.feel.fxArcSpanDeg !== arcSpanDeg || live.feel.fxArcInnerRatio !== arcInnerRatio) {
      arcSpanDeg = live.feel.fxArcSpanDeg;
      arcInnerRatio = live.feel.fxArcInnerRatio;
      const next = buildArc(arcSpanDeg, arcInnerRatio);
      arc.geometry = next;
      arcGeometry.dispose();
      arcGeometry = next;
    }
    const dur = Math.max(live.attack.activeMs, 1) / 1000;
    const p = clamp01(1 - (player.attackUntil - t) / dur);
    const frames = Math.max(1, Math.round(live.feel.fxArcFrames));
    const step = Math.min(frames - 1, Math.floor(p * frames));
    const phase = (step + 0.5) / frames;

    const reach = player.longwick ? live.attack.longwickReach : live.attack.reach;
    const radius = (reach + live.player.width * 0.5) * 0.8;
    const back = THREE.MathUtils.degToRad(live.feel.needleBackDeg);
    const front = THREE.MathUtils.degToRad(live.feel.needleFrontDeg);
    let center = back + (front - back) * Math.pow(phase, 0.6);
    if (player.attackDir === "up") center += Math.PI * 0.5;
    else if (player.attackDir === "down") center -= Math.PI * 0.5;
    if (player.facing < 0) center = Math.PI - center;

    const px = player.prev.x + (player.pos.x - player.prev.x) * alpha;
    const py = player.prev.y + (player.pos.y - player.prev.y) * alpha;

    arc.visible = true;
    arc.position.set(px, py + live.player.height * 0.45, FX_Z);
    arc.rotation.z = center;
    arc.scale.setScalar(radius);
    arcMaterial.opacity = live.feel.fxArcOpacity * (1 - step * 0.28);
  }

  return {
    group,
    setRoom(room: Room): void {
      lampSpot = lampAnchor(room);
      roomCheckpoint = room.checkpoint === undefined
        ? null
        : { x: room.checkpoint.x, y: room.checkpoint.y };
      for (const pool of [bursts, chevrons, puffs, lifts, sparks]) {
        for (const slot of pool) {
          slot.active = false;
          slot.mesh.visible = false;
        }
      }
      for (let i = 0; i < sparkDue.length; i++) sparkDue[i] = 0;
    },

    onEvent(event: GameEvent, state: GameState, live: Tuning): void {
      const t = state.time;
      if (event.kind === "attackHit" || event.kind === "bossHurt") {
        spawnBurst(event.x, event.y, false, t, live);
      } else if (event.kind === "enemyDeath" || event.kind === "bossDeath") {
        spawnBurst(event.x, event.y, true, t, live);
        spawnLift(event.x, event.y, t, live);
      } else if (event.kind === "dash") {
        spawnChevrons(
          event.x,
          event.y + live.player.height * 0.45,
          state.player.dashDir,
          t,
          live
        );
      } else if (event.kind === "land") {
        spawnPuffs(event.x, event.y, t, live, 0.5);
      } else if (event.kind === "bossAttack") {
        if (state.boss !== null && state.boss.state === "stompRecover") {
          spawnPuffs(event.x, event.y, t, live, 1.6);
        }
      } else if (event.kind === "checkpoint") {
        if (lampSpot !== null) {
          spawnLift(lampSpot.x, lampSpot.y, t, live);
        } else {
          spawnLift(event.x, event.y, t, live);
        }
      } else if (event.kind === "pickup") {
        spawnLift(event.x, event.y, t, live);
      } else if (event.kind === "breakableBroken") {
        spawnPuffs(event.x, event.y, t, live, 0.9);
      }
    },

    sync(
      state: GameState,
      player: PlayerState,
      alpha: number,
      dt: number,
      t: number,
      rt: number,
      live: Tuning
    ): void {
      const feel = live.feel;
      const step = Math.max(dt, 0);

      syncArc(player, alpha, t, live);

      let markIndex = 0;
      for (const enemy of state.enemies) {
        if (markIndex >= MARK_SLOTS) break;
        if (!enemy.alive || enemy.state !== "telegraph") continue;
        if (enemy.kind === "lamplighter") continue;
        const mark = enemyMarks[markIndex];
        if (mark === undefined) break;
        markIndex++;
        const cfg = enemy.kind === "guard" ? live.guard : live.stomper;
        const lunge =
          enemy.kind === "guard" ? live.guard.lungeSpeed * (live.guard.lungeMs / 1000) : 0;
        const ex = enemy.prev.x + (enemy.pos.x - enemy.prev.x) * alpha;
        const ey = enemy.prev.y + (enemy.pos.y - enemy.prev.y) * alpha;
        const left = enemy.facing > 0 ? ex - cfg.width * 0.5 : ex - cfg.width * 0.5 - lunge;
        const dur = Math.max(live.guard.telegraphMs, 1) / 1000;
        const p = clamp01(1 - (enemy.stateUntil - t) / dur);
        placeMark(
          mark,
          left,
          ey,
          cfg.width + lunge,
          cfg.height,
          p,
          feel.telegraphEdgeFraction,
          feel.fxMarkOpacity
        );
      }
      for (let i = markIndex; i < MARK_SLOTS; i++) {
        const mark = enemyMarks[i];
        if (mark !== undefined) mark.group.visible = false;
      }

      const boss = state.boss;
      if (boss !== null && boss.state === "sweepTelegraph") {
        const p = clamp01((t - boss.stateStart) / (boss.stateUntil - boss.stateStart));
        const w = live.boss.sweepReach;
        const h = live.boss.height * live.boss.sweepHeightRatio;
        const x =
          boss.facing > 0
            ? boss.pos.x + live.boss.width * 0.5
            : boss.pos.x - live.boss.width * 0.5 - w;
        placeMark(
          sweepMark,
          x,
          boss.pos.y,
          w,
          h,
          p,
          feel.telegraphEdgeFraction,
          feel.fxMarkOpacity
        );
      } else {
        sweepMark.group.visible = false;
      }

      if (
        boss !== null &&
        (boss.state === "stompTelegraph" || boss.state === "stompRise" || boss.state === "stompSlam")
      ) {
        const p =
          boss.state === "stompTelegraph"
            ? clamp01((t - boss.stateStart) / (boss.stateUntil - boss.stateStart))
            : 1;
        placeMark(
          stompMark,
          boss.pos.x - live.boss.width * 0.5,
          boss.pos.y,
          live.boss.width,
          live.boss.height,
          p,
          feel.telegraphEdgeFraction,
          feel.fxMarkOpacity
        );
      } else {
        stompMark.group.visible = false;
      }

      let ridgeIndex = 0;
      let emberIndex = 0;
      for (let i = 0; i < state.hazards.length; i++) {
        const hazard = state.hazards[i];
        if (hazard === undefined) continue;
        const wasSeen = hazardSeen[i] === true;
        if (hazard.alive && !wasSeen && hazard.kind !== "ember") {
          spawnPuffs(hazard.pos.x, hazard.pos.y, t, live, 0.6);
        }
        hazardSeen[i] = hazard.alive;
        if (!hazard.alive) continue;
        const hx = hazard.prev.x + (hazard.pos.x - hazard.prev.x) * alpha;
        const hy = hazard.prev.y + (hazard.pos.y - hazard.prev.y) * alpha;

        if (hazard.kind === "ember") {
          if (emberIndex >= embers.length) continue;
          const drop = embers[emberIndex];
          if (drop === undefined) continue;
          emberIndex++;
          drop.group.visible = true;
          drop.group.position.set(hx, hy + hazard.h * 0.5, FX_Z);
          drop.head.scale.set(hazard.w, hazard.h, 1);
          let bx = -hazard.vel.x;
          let by = -hazard.vel.y;
          const len = Math.sqrt(bx * bx + by * by);
          if (len < 0.0001) {
            bx = 0;
            by = 1;
          } else {
            bx /= len;
            by /= len;
          }
          for (let k = 0; k < EMBER_TAIL; k++) {
            const mesh = drop.tail[k];
            if (mesh === undefined) continue;
            const back = hazard.h * (0.46 + k * 0.4);
            const shrink = 0.74 - k * 0.2;
            mesh.position.set(bx * back, by * back, -0.01 * (k + 1));
            mesh.scale.set(hazard.w * shrink, hazard.h * shrink, 1);
          }
          continue;
        }

        if (ridgeIndex >= ridges.length) continue;
        const slot = ridges[ridgeIndex];
        if (slot === undefined) continue;
        ridgeIndex++;
        slot.group.visible = true;
        slot.group.position.set(hx, hy, FX_Z);
        slot.core.scale.set(hazard.w, hazard.h, 1);
        slot.core.position.set(0, 0, 0);
        slot.crest.scale.set(
          hazard.w * (1 - feel.fxRidgeCrest * 2.4),
          hazard.h * (1 - feel.fxRidgeCrest * 3),
          1
        );
        slot.crest.position.set(0, hazard.h * feel.fxRidgeCrest * 0.4, 0.02);
        slot.underglow.scale.set(hazard.w * 3.4, hazard.h * 1.5, 1);
        slot.underglow.position.set(0, hazard.h * 0.1, -0.02);

        const phase = i * 1.37;
        for (let k = 0; k < TONGUE_COUNT; k++) {
          const flame = slot.tongues[k];
          if (flame === undefined) continue;
          const wobble = 0.5 + 0.5 * Math.sin(rt * feel.fireWaveFlicker + phase + k * 1.9);
          const tall =
            hazard.h * feel.fireWaveHeightScale * (TONGUE_HEIGHT[k] ?? 0.4) * (0.4 + 0.6 * wobble);
          flame.scale.set(hazard.w * 0.24, tall, 1);
          flame.position.set(
            hazard.w * (TONGUE_X[k] ?? 0),
            hazard.h * (TONGUE_BASE_Y[k] ?? 0.6),
            0.01
          );
        }

        const due = sparkDue[i];
        if (due === undefined || t >= due) {
          const rate = Math.max(feel.fireWaveSparks, 1);
          sparkDue[i] = t + SPARK_LIFE / rate;
          const trail = hazard.vel.x >= 0 ? -1 : 1;
          const jitter = ((Math.imul(sparkCursor + 1, 2654435761) >>> 0) % 1000) / 1000;
          sparkCursor = spawnSprite(
            sparks,
            sparkCursor,
            hx + trail * hazard.w * (0.44 + jitter * 0.72),
            hy + hazard.h * (0.12 + jitter * 0.4),
            trail * (0.3 + jitter * 0.6),
            1.2 + jitter * 1.1,
            feel.fxLiftSize * (0.42 + jitter * 0.3),
            0,
            t,
            SPARK_LIFE
          );
        }
      }
      for (let i = ridgeIndex; i < ridges.length; i++) {
        const slot = ridges[i];
        if (slot !== undefined) slot.group.visible = false;
      }
      for (let i = emberIndex; i < embers.length; i++) {
        const drop = embers[i];
        if (drop !== undefined) drop.group.visible = false;
      }

      let pickupIndex = 0;
      for (const pickup of state.pickups) {
        if (pickupIndex >= PICKUP_SLOTS) break;
        if (pickup.collected) continue;
        const view = pickups[pickupIndex];
        if (view === undefined) break;
        pickupIndex++;
        const bob = Math.sin(rt * feel.pickupBobSpeed + pickupIndex) * feel.pickupBobAmp;
        view.group.visible = true;
        view.group.position.set(pickup.pos.x, pickup.pos.y + feel.pickupHaloRadius + bob, FX_Z);
        view.mesh.scale.setScalar(feel.pickupHaloRadius * 2);
        view.light.intensity = feel.pickupLightIntensity;
        view.light.distance = feel.pickupLightDistance;
        if (t >= nextIdleLiftAt) {
          nextIdleLiftAt = t + 1.1;
          spawnLift(pickup.pos.x, pickup.pos.y, t, live);
        }
      }
      for (let i = pickupIndex; i < PICKUP_SLOTS; i++) {
        const view = pickups[i];
        if (view !== undefined) view.group.visible = false;
      }

      const cp = roomCheckpoint;
      const showCheckpoint =
        cp !== null && lampSpot === null && state.progress.checkpointRoom === state.roomId;
      flame.visible = showCheckpoint;
      flameLight.visible = showCheckpoint;
      if (showCheckpoint && cp !== null) {
        const flicker =
          1 +
          (Math.sin(rt * feel.flickerSpeed) * 0.6 +
            Math.sin(rt * feel.flickerSpeed * 2.11 + 0.7) * 0.4) *
            feel.flickerAmount;
        flame.position.set(cp.x, cp.y + feel.checkpointFlameHeight * 0.5, FX_Z);
        flame.scale.set(feel.checkpointFlameHeight * 0.75, feel.checkpointFlameHeight * flicker, 1);
        flameLight.position.set(cp.x, cp.y + feel.checkpointFlameHeight * 0.5, 0.3);
        flameLight.intensity = feel.pickupLightIntensity * flicker;
        flameLight.distance = feel.pickupLightDistance;
      }

      stepSprites(bursts, step, t, 0, 0);
      stepSprites(chevrons, step, t, 3.2, 0);
      stepSprites(puffs, step, t, 2.4, -0.4);
      stepSprites(lifts, step, t, 1.1, -0.2);
      stepSprites(sparks, step, t, 1.5, 1.4);

      for (const slot of bursts) {
        if (!slot.active) continue;
        const age = t - slot.born;
        const p = clamp01(age / slot.life);
        const size = slot.size * (0.5 + feel.fxBurstGrow * p);
        slot.mesh.scale.set(size, size, 1);
      }
      syncSprites(chevrons);
      syncSprites(puffs);
      syncSprites(lifts);
      syncSprites(sparks);
    }
  };
}
