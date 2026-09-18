import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { Decor, DecorKind, Door, Progress, Rect, Room, Vec2 } from "../game/types";
import type { LitMaterial, LookProfile } from "./look";
import {
  ACTOR_LAYER,
  hallBaseColor,
  hallTopColor,
  paleKey,
  registerActorLight,
  releaseActorLight,
  shadeOf
} from "./look";

export interface RoomMesh {
  group: THREE.Group;
  build(room: Room, progress: Progress): void;
  syncGates(progress: Progress): void;
  setPlayerPos(x: number, y: number): void;
  sync(
    t: number,
    dt: number,
    tuning: Tuning,
    furnaceBoost: number,
    emberBoost: number,
    doorGlow: number
  ): void;
  dispose(): void;
}

type Feel = Tuning["feel"];

const LIGHT_PRIORITY_KEY = 0;
const LIGHT_PRIORITY_JAR = 1;
const LIGHT_PRIORITY_FURNACE = 2;
const LIGHT_PRIORITY_CONDUIT = 3;
const LIGHT_PRIORITY_REST = 4;
const FAR_Z = -6;
const CAP_LIFT = 0.008;
const CAP_OVERHANG = 0.008;
const RIM_LIFT = 0.016;
const WARM_TARGETS: Record<string, boolean> = {
  belfry: true,
  cache: true,
  vault: true,
  sunwell: true
};
const PALE_TARGETS: Record<string, boolean> = {
  reserve: true,
  lenshall: true
};
const GLASS_TINT = 0xc8d6e4;
const PALE_SPILL = 0xb6cde2;
const HALO_SIZE = 64;
const JAMB_ORB_RADIUS = 0.5;
const DOOR_LIGHT_DAWN_CAP = 1.3;
const PLATFORM_KINDS: DecorKind[] = ["stair", "gallery", "beam", "bench", "crate", "wall"];

interface Tagged {
  id: string;
  mesh: THREE.Object3D;
}

interface Flame {
  material: THREE.MeshBasicMaterial;
  base: THREE.Color;
  light: THREE.PointLight | null;
  lightBase: number;
  phase: number;
  amount: number;
  furnace: boolean;
}

interface SwayEntry {
  pivot: THREE.Object3D;
  phase: number;
}

interface EmberField {
  points: THREE.Points;
  attribute: THREE.BufferAttribute;
  seed: Float32Array;
  originX: Float32Array;
  minY: Float32Array;
  spanY: Float32Array;
  count: number;
  base: number;
  drawn: number;
}

interface JarPulse {
  core: THREE.MeshBasicMaterial;
  halo: THREE.MeshBasicMaterial;
  base: THREE.Color;
  light: THREE.PointLight | null;
  strength: number;
  phase: number;
}

interface DoorGlow {
  material: THREE.MeshBasicMaterial;
  opacity: number;
  mesh: THREE.Object3D;
  scaleX: number;
  scaleY: number;
  grow: number;
  lengthOnly: boolean;
}

interface DoorPanel {
  material: THREE.MeshBasicMaterial;
  base: THREE.Color;
}

interface DoorLight {
  light: THREE.PointLight;
  intensity: number;
}

interface DoorPlate {
  material: LitMaterial;
  color: THREE.Color;
  emissive: THREE.Color;
  lift: number;
}

type PassageTone = "warm" | "pale" | "ash";

interface Opening {
  door: Door;
  rect: Rect;
  side: "left" | "right" | "floor" | "ceiling";
  warm: boolean;
  tone: PassageTone;
}

interface Conduit {
  bands: THREE.Object3D[];
  offsets: number[];
  axis: "x" | "y";
  start: number;
  length: number;
  core: THREE.MeshBasicMaterial;
  band: THREE.MeshBasicMaterial;
  base: THREE.Color;
  light: THREE.PointLight | null;
  lightBase: number;
  phase: number;
}

interface Shutter {
  id: string;
  sealed: THREE.Object3D;
  open: THREE.Object3D;
}

interface FadePart {
  material: THREE.Material;
  base: number;
}

interface Veil {
  rect: Rect;
  opacity: number;
  hide: FadePart[];
  show: FadePart[];
  lights: DoorLight[];
  stone: THREE.Material;
  stoneDark: THREE.Material;
  stoneLit: THREE.Material;
  outline: THREE.Material | null;
}

function jarProfile(radius: number, height: number): THREE.Vector2[] {
  const points: THREE.Vector2[] = [];
  const steps = 12;
  for (let i = 0; i <= steps; i++) {
    const v = i / steps;
    const bulge = Math.sin(Math.PI * (0.14 + v * 0.74));
    points.push(new THREE.Vector2(radius * (0.5 + 0.5 * bulge), v * height));
  }
  return points;
}

function bellProfile(scale: number, shrink: number): THREE.Vector2[] {
  const points: THREE.Vector2[] = [];
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const v = i / steps;
    const r = (0.5 - 0.42 * Math.pow(v, 1.7)) * scale * shrink;
    points.push(new THREE.Vector2(Math.max(r, 0.02 * scale), v * scale));
  }
  points.push(new THREE.Vector2(0.06 * scale, scale * 1.06));
  return points;
}

function seededRandom(seed: number): () => number {
  let state = Math.floor(Math.abs(seed) * 1013 + 7) % 2147483647;
  if (state <= 0) state = 11;
  return () => {
    state = (state * 48271) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function rectContains(outer: Rect, inner: Rect, tolerance: number): boolean {
  return (
    inner.x >= outer.x - tolerance &&
    inner.y >= outer.y - tolerance &&
    inner.x + inner.w <= outer.x + outer.w + tolerance &&
    inner.y + inner.h <= outer.y + outer.h + tolerance
  );
}

function rectsTouch(a: Rect, b: Rect, tolerance: number): boolean {
  return (
    a.x < b.x + b.w + tolerance &&
    a.x + a.w > b.x - tolerance &&
    a.y < b.y + b.h + tolerance &&
    a.y + a.h > b.y - tolerance
  );
}

function radialFalloff(geometry: THREE.BufferGeometry): void {
  const position = geometry.getAttribute("position");
  const colors = new Float32Array(position.count * 3);
  colors[0] = 1;
  colors[1] = 1;
  colors[2] = 1;
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

function shaftFalloff(geometry: THREE.BufferGeometry): void {
  const position = geometry.getAttribute("position");
  const colors = new Float32Array(position.count * 3);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const spanX = Math.max(maxX - minX, 0.0001);
  const spanY = Math.max(maxY - minY, 0.0001);
  for (let i = 0; i < position.count; i++) {
    const u = (position.getX(i) - minX) / spanX;
    const v = (position.getY(i) - minY) / spanY;
    const across = Math.pow(Math.max(Math.cos((u - 0.5) * Math.PI), 0), 1.4);
    const w = across * (0.15 + 0.85 * v);
    colors[i * 3] = w;
    colors[i * 3 + 1] = w;
    colors[i * 3 + 2] = w;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

function sunFalloff(geometry: THREE.BufferGeometry): void {
  const position = geometry.getAttribute("position");
  const colors = new Float32Array(position.count * 3);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const spanX = Math.max(maxX - minX, 0.0001);
  const spanY = Math.max(maxY - minY, 0.0001);
  for (let i = 0; i < position.count; i++) {
    const u = (position.getX(i) - minX) / spanX;
    const v = (position.getY(i) - minY) / spanY;
    const across = Math.pow(Math.max(Math.cos((u - 0.5) * Math.PI), 0), 0.5);
    const w = across * (0.34 + 0.66 * Math.pow(v, 0.8));
    colors[i * 3] = w;
    colors[i * 3 + 1] = w;
    colors[i * 3 + 2] = w;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

function paintPlane(
  geometry: THREE.BufferGeometry,
  from: THREE.Color,
  to: THREE.Color,
  axis: "x" | "y",
  curve: number
): void {
  const position = geometry.getAttribute("position");
  const colors = new Float32Array(position.count * 3);
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < position.count; i++) {
    const v = axis === "x" ? position.getX(i) : position.getY(i);
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const span = Math.max(max - min, 0.0001);
  const mixed = new THREE.Color();
  for (let i = 0; i < position.count; i++) {
    const v = axis === "x" ? position.getX(i) : position.getY(i);
    const t = Math.pow((v - min) / span, curve);
    mixed.copy(from).lerp(to, t);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

function paintHall(
  geometry: THREE.BufferGeometry,
  centerY: number,
  floorY: number,
  height: number,
  from: THREE.Color,
  to: THREE.Color
): void {
  const position = geometry.getAttribute("position");
  const colors = new Float32Array(position.count * 3);
  const span = Math.max(height, 0.0001);
  const mixed = new THREE.Color();
  for (let i = 0; i < position.count; i++) {
    const worldY = position.getY(i) + centerY;
    const t = Math.min(Math.max((worldY - floorY) / span, 0), 1);
    mixed.copy(from).lerp(to, Math.pow(t, 1.3));
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

export function lampAnchor(room: Room): Vec2 | null {
  const checkpoint = room.checkpoint;
  if (checkpoint === undefined) return null;
  for (const decor of room.decor) {
    if (decor.kind !== "lamp") continue;
    const rect = decor.rect;
    const x0 = Math.min(rect.x, rect.x + rect.w);
    const x1 = Math.max(rect.x, rect.x + rect.w);
    if (checkpoint.x < x0 || checkpoint.x > x1) continue;
    if (checkpoint.y < rect.y || checkpoint.y > rect.y + rect.h) continue;
    return { x: rect.x + rect.w * 0.78, y: rect.y + rect.h - 0.52 };
  }
  return null;
}

export function createRoomMesh(tuning: Tuning, look: LookProfile): RoomMesh {
  const group = new THREE.Group();
  group.name = "room";

  const ramp = look.ramp;
  const outlined = look.postfx.outlineArchitecture;

  const wallMat = look.litMaterial("backgroundNear");
  const faceMat = look.litMaterial("backgroundNear", { shade: 0.9 });
  const stoneMat = look.litMaterial("architecture");
  const stoneDarkMat = look.litMaterial("architecture", { shade: 0.74 });
  const stoneLitMat = look.litMaterial("architecture", { shade: 1.12 });
  const rimMat = look.material("rimEdge", { emissiveIntensity: 0.06 });
  const ironMat = look.litMaterial("chain");
  const ironDarkMat = look.litMaterial("chain", { shade: 0.62 });
  const midMat = look.litMaterial("architecture", { shade: 0.78 });
  const midDarkMat = look.litMaterial("backgroundNear", { shade: 1.25 });
  const bellMat = look.material("bossShell", { shade: 1.3, doubleSide: true });
  const bellInnerMat = look.material("backgroundFar", { unlit: true, shade: 0.4, doubleSide: true });
  const voidMat = new THREE.MeshBasicMaterial({ color: ramp.void, fog: false });
  const voidFogMat = new THREE.MeshBasicMaterial({ color: ramp.void });
  const farHex = look.colorOf("backgroundFar");
  const farMat = new THREE.MeshBasicMaterial({ color: farHex });
  const farLitMat = new THREE.MeshBasicMaterial({ color: shadeOf(farHex, 1.16) });
  const sunHex = shadeOf(ramp.amber, 1.4);
  const amberMat = new THREE.MeshBasicMaterial({ color: ramp.amber, fog: false });
  const amberDimMat = new THREE.MeshBasicMaterial({ color: shadeOf(ramp.amber, 0.5), fog: false });
  const gradientMat = new THREE.MeshBasicMaterial({ vertexColors: true, fog: false });
  const backPlaneMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    fog: false
  });
  const emberMat = new THREE.PointsMaterial({
    color: ramp.amber,
    size: tuning.feel.emberSize,
    transparent: true,
    opacity: tuning.feel.emberOpacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const baseMaterials: THREE.Material[] = [
    wallMat,
    faceMat,
    stoneMat,
    stoneDarkMat,
    stoneLitMat,
    rimMat,
    ironMat,
    ironDarkMat,
    midMat,
    midDarkMat,
    bellMat,
    bellInnerMat,
    voidMat,
    voidFogMat,
    farMat,
    farLitMat,
    amberMat,
    amberDimMat,
    gradientMat,
    backPlaneMat,
    emberMat
  ];

  const keyLiftTargets: { material: LitMaterial; base: THREE.Color }[] = [
    wallMat,
    faceMat,
    stoneMat,
    stoneDarkMat,
    stoneLitMat,
    ironMat,
    ironDarkMat,
    midMat,
    midDarkMat
  ].map((material) => ({ material, base: material.color.clone() }));
  const keyLiftColor = new THREE.Color(ramp.void);

  const transientMaterials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const gates: Tagged[] = [];
  const breakables: Tagged[] = [];
  const flames: Flame[] = [];
  const jars: JarPulse[] = [];
  const conduits: Conduit[] = [];
  const shutters: Shutter[] = [];
  const sways: SwayEntry[] = [];
  let roomFogHex = ramp.void;
  let roomClip: Rect | null = null;
  const clipBox = new THREE.Box3();
  const ownedActorLights: THREE.Light[] = [];
  let embers: EmberField | null = null;
  const decorLights: { light: THREE.PointLight; priority: number }[] = [];
  let currentOpenings: Opening[] = [];
  let currentRoom: Room | null = null;
  let sealedOpenings = new Set<Opening>();
  const doorGlows: DoorGlow[] = [];
  const doorPanels: DoorPanel[] = [];
  const doorLights: DoorLight[] = [];
  const doorPlates: DoorPlate[] = [];
  const veils: Veil[] = [];
  let veilByOpening = new Map<Opening, Veil>();
  let outlineOverride: THREE.Material | null = null;
  let playerX = 0;
  let playerY = 0;
  const dawnColor = new THREE.Color(ramp.amber);
  let haloMap: THREE.Texture | null = null;
  let haloTried = false;
  let outlineGeometryCache = new Map<string, THREE.BufferGeometry>();
  let boxGeometryCache = new Map<string, THREE.BufferGeometry>();

  function track<T extends THREE.BufferGeometry>(geometry: T): T {
    geometries.push(geometry);
    return geometry;
  }

  function transient<T extends THREE.Material>(material: T): T {
    transientMaterials.push(material);
    return material;
  }

  function haloTexture(): THREE.Texture | null {
    if (haloTried) return haloMap;
    haloTried = true;
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = HALO_SIZE;
    canvas.height = HALO_SIZE;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return null;
    const half = HALO_SIZE * 0.5;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.16, "rgba(255,255,255,0.58)");
    grad.addColorStop(0.42, "rgba(255,255,255,0.2)");
    grad.addColorStop(0.72, "rgba(255,255,255,0.05)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, HALO_SIZE, HALO_SIZE);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    haloMap = texture;
    return haloMap;
  }

  function glassMaterial(opacity: number): LitMaterial {
    const mat = transient(look.litMaterial("rimEdge", { texture: "glass", doubleSide: true }));
    mat.color.setHex(GLASS_TINT);
    mat.transparent = true;
    mat.opacity = Math.min(Math.max(opacity, 0.02), 1);
    mat.depthWrite = false;
    mat.needsUpdate = true;
    return mat;
  }

  function sheenMaterial(opacity: number): THREE.MeshBasicMaterial {
    return transient(
      new THREE.MeshBasicMaterial({
        color: ramp.porcelain,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false
      })
    );
  }

  function haloMaterial(hex: number): THREE.MeshBasicMaterial {
    return transient(
      new THREE.MeshBasicMaterial({
        color: hex,
        map: haloTexture(),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false
      })
    );
  }

  function spillMaterial(hex: number, opacity: number): THREE.MeshBasicMaterial {
    return transient(
      new THREE.MeshBasicMaterial({
        color: hex,
        vertexColors: true,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false
      })
    );
  }

  function outlineGeometry(w: number, h: number, d: number): THREE.BufferGeometry {
    const t = tuning.feel.edgeOutline;
    const key = w.toFixed(3) + ":" + h.toFixed(3) + ":" + d.toFixed(3);
    const cached = outlineGeometryCache.get(key);
    if (cached !== undefined) return cached;
    const geometry = track(new THREE.BoxGeometry(w + t * 2, h + t * 2, d + t * 2));
    outlineGeometryCache.set(key, geometry);
    return geometry;
  }

  function boxGeometry(w: number, h: number, d: number): THREE.BufferGeometry {
    const key = w.toFixed(3) + ":" + h.toFixed(3) + ":" + d.toFixed(3);
    const cached = boxGeometryCache.get(key);
    if (cached !== undefined) return cached;
    const geometry = track(look.boxGeometry(w, h, d));
    boxGeometryCache.set(key, geometry);
    return geometry;
  }

  function addBox(
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
    parent: THREE.Object3D,
    outline = false
  ): THREE.Mesh {
    const width = Math.max(w, 0.01);
    const height = Math.max(h, 0.01);
    const depth = Math.max(d, 0.01);
    const mesh = new THREE.Mesh(boxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    if (outline && outlined) {
      const shellMat = outlineOverride === null ? look.outlineMaterial() : outlineOverride;
      if (shellMat !== null) {
        const shell = new THREE.Mesh(outlineGeometry(width, height, depth), shellMat);
        shell.userData.outline = true;
        mesh.add(shell);
      }
    }
    return mesh;
  }

  function addRect(
    rect: Rect,
    depth: number,
    z: number,
    material: THREE.Material,
    parent: THREE.Object3D,
    outline = false
  ): THREE.Mesh {
    return addBox(
      rect.w,
      rect.h,
      depth,
      rect.x + rect.w * 0.5,
      rect.y + rect.h * 0.5,
      z,
      material,
      parent,
      outline
    );
  }

  function addBar(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    thick: number,
    depth: number,
    z: number,
    material: THREE.Material,
    parent: THREE.Object3D,
    outline = false
  ): THREE.Mesh {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.max(Math.hypot(dx, dy), 0.01);
    const mesh = addBox(
      length,
      thick,
      depth,
      (x1 + x2) * 0.5,
      (y1 + y2) * 0.5,
      z,
      material,
      parent,
      outline
    );
    mesh.rotation.z = Math.atan2(dy, dx);
    return mesh;
  }

  function addPlane(
    w: number,
    h: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
    parent: THREE.Object3D,
    paint: ((geometry: THREE.BufferGeometry) => void) | null,
    rotateX = 0
  ): THREE.Mesh {
    const geometry = track(new THREE.PlaneGeometry(w, h, 10, 4));
    if (paint !== null) paint(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = rotateX;
    parent.add(mesh);
    return mesh;
  }

  function addRim(rect: Rect, depth: number, z: number, parent: THREE.Object3D, feel: Feel, inset = 0): void {
    const lineDepth = 0.16;
    addBox(
      rect.w + feel.rimOverhang * 2 - inset * 2,
      feel.rimHeight,
      lineDepth,
      rect.x + rect.w * 0.5,
      rect.y + rect.h + RIM_LIFT - feel.rimHeight * 0.5,
      z + depth * 0.5 - lineDepth * 0.5 + feel.rimOverhang - inset,
      rimMat,
      parent,
      true
    );
  }

  function addTop(rect: Rect, depth: number, z: number, parent: THREE.Object3D, material: THREE.Material): void {
    const capH = 0.07;
    addBox(
      rect.w + CAP_OVERHANG * 2,
      capH,
      depth - 0.02,
      rect.x + rect.w * 0.5,
      rect.y + rect.h + CAP_LIFT - capH * 0.5,
      z,
      material,
      parent
    );
  }

  function addPlate(rect: Rect, z: number, parent: THREE.Object3D, feel: Feel): void {
    addRect(rect, feel.solidDepth, z, faceMat, parent, true);
    addTop(rect, feel.solidDepth, z, parent, stoneMat);
    addRim(rect, feel.solidDepth, z, parent, feel);
  }

  function addCourses(
    rect: Rect,
    depth: number,
    z: number,
    parent: THREE.Object3D,
    feel: Feel,
    seed: number,
    lineMat: THREE.Material = voidMat
  ): void {
    const spacing = Math.max(feel.courseSpacing, 0.3);
    const rows = Math.floor(rect.h / spacing);
    if (rows < 1) return;
    const random = seededRandom(seed);
    const lift = Math.max(feel.wallLift, 0.001);
    const front = z + depth * 0.5 + lift;
    const x0 = rect.x + lift;
    const w = Math.max(rect.w - lift * 2, 0.02);
    for (let i = 1; i <= rows; i++) {
      const y = rect.y + i * spacing;
      if (y > rect.y + rect.h - 0.05) break;
      addBox(w, 0.032, 0.012, x0 + w * 0.5, y, front, lineMat, parent);
      const joints = Math.max(1, Math.floor(w / 1.6));
      for (let j = 0; j < joints; j++) {
        const jx = x0 + ((j + 0.25 + random() * 0.5) / joints) * w;
        addBox(0.03, spacing - 0.06, 0.012, jx, y - spacing * 0.5, front, lineMat, parent);
      }
    }
  }

  function addRivets(
    x: number,
    y: number,
    w: number,
    h: number,
    z: number,
    parent: THREE.Object3D,
    material: THREE.Material
  ): void {
    const size = 0.06;
    const corners = [
      [x - w * 0.5 + 0.09, y - h * 0.5 + 0.09],
      [x + w * 0.5 - 0.09, y - h * 0.5 + 0.09],
      [x - w * 0.5 + 0.09, y + h * 0.5 - 0.09],
      [x + w * 0.5 - 0.09, y + h * 0.5 - 0.09]
    ];
    for (const corner of corners) {
      addBox(size, size, size, corner[0] ?? x, corner[1] ?? y, z, material, parent);
    }
  }

  function addPlateWithRivets(
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D,
    material: THREE.Material
  ): void {
    addBox(w, h, d, x, y, z, material, parent, true);
    addRivets(x, y, w, h, z + d * 0.5 + 0.02, parent, ironMat);
  }

  function clear(): void {
    for (let i = group.children.length - 1; i >= 0; i--) {
      const child = group.children[i];
      if (child !== undefined) group.remove(child);
    }
    for (const geometry of geometries) geometry.dispose();
    geometries.length = 0;
    for (const mat of transientMaterials) mat.dispose();
    transientMaterials.length = 0;
    outlineGeometryCache = new Map();
    boxGeometryCache = new Map();
    gates.length = 0;
    breakables.length = 0;
    flames.length = 0;
    jars.length = 0;
    conduits.length = 0;
    shutters.length = 0;
    sways.length = 0;
    for (const light of ownedActorLights) releaseActorLight(light);
    ownedActorLights.length = 0;
    embers = null;
    decorLights.length = 0;
    doorGlows.length = 0;
    doorPanels.length = 0;
    doorLights.length = 0;
    doorPlates.length = 0;
    veils.length = 0;
    veilByOpening = new Map();
    outlineOverride = null;
    sealedOpenings = new Set();
  }

  function syncGates(progress: Progress): void {
    for (const entry of gates) {
      entry.mesh.visible = progress.opened.indexOf(entry.id) === -1;
    }
    for (const entry of breakables) {
      entry.mesh.visible = progress.broken.indexOf(entry.id) === -1;
    }
    for (const entry of shutters) {
      const shut = progress.opened.indexOf(entry.id) === -1;
      entry.sealed.visible = shut;
      entry.open.visible = !shut;
    }
  }

  function addChainRun(
    x: number,
    topY: number,
    height: number,
    z: number,
    material: THREE.Material,
    radius: number,
    segH: number,
    parent: THREE.Object3D = group
  ): THREE.Object3D {
    const count = Math.max(1, Math.round(height / segH));
    const geometry = track(new THREE.TorusGeometry(radius * 1.6, radius * 0.55, 4, 8));
    const pivot = new THREE.Object3D();
    pivot.position.set(x, topY, z);
    parent.add(pivot);
    for (let i = 0; i < count; i++) {
      const link = new THREE.Mesh(geometry, material);
      link.position.set(0, -(i + 0.5) * segH, 0);
      link.rotation.x = Math.PI * 0.5;
      link.rotation.y = i % 2 === 0 ? 0 : Math.PI * 0.5;
      pivot.add(link);
    }
    sways.push({ pivot, phase: x * 0.7 });
    return pivot;
  }

  function addFlameLight(
    hex: number,
    intensity: number,
    distance: number,
    x: number,
    y: number,
    z: number,
    priority: number
  ): THREE.PointLight | null {
    const cap = Math.max(0, Math.round(tuning.feel.decorLightCap));
    if (cap <= 0) return null;
    if (decorLights.length >= cap) {
      let worst = -1;
      let worstPriority = priority;
      for (let i = 0; i < decorLights.length; i++) {
        const slot = decorLights[i];
        if (slot === undefined || slot.priority <= worstPriority) continue;
        worst = i;
        worstPriority = slot.priority;
      }
      if (worst < 0) return null;
      const evicted = decorLights[worst];
      if (evicted === undefined) return null;
      group.remove(evicted.light);
      evicted.light.intensity = 0;
      decorLights.splice(worst, 1);
    }
    const light = new THREE.PointLight(hex, intensity, distance, 2);
    light.layers.enableAll();
    light.position.set(x, y, z);
    group.add(light);
    decorLights.push({ light, priority });
    return light;
  }

  function fitToClip(mesh: THREE.Mesh, clip: Rect | null): THREE.Mesh {
    if (clip === null) return mesh;
    mesh.updateWorldMatrix(true, false);
    clipBox.setFromObject(mesh);
    const spanX = clipBox.max.x - clipBox.min.x;
    if (spanX > 0.02) {
      const x0 = Math.max(clipBox.min.x, clip.x);
      const x1 = Math.min(clipBox.max.x, clip.x + clip.w);
      if (x1 - x0 < 0.04) {
        mesh.visible = false;
        return mesh;
      }
      if (x1 - x0 < spanX - 0.002) {
        mesh.scale.x *= (x1 - x0) / spanX;
        mesh.position.x += (x0 + x1) * 0.5 - (clipBox.min.x + clipBox.max.x) * 0.5;
      }
    }
    const spanY = clipBox.max.y - clipBox.min.y;
    if (spanY > 0.02) {
      const y0 = Math.max(clipBox.min.y, clip.y);
      const y1 = Math.min(clipBox.max.y, clip.y + clip.h);
      if (y1 - y0 < 0.04) {
        mesh.visible = false;
        return mesh;
      }
      if (y1 - y0 < spanY - 0.002) {
        mesh.scale.y *= (y1 - y0) / spanY;
        mesh.position.y += (y0 + y1) * 0.5 - (clipBox.min.y + clipBox.max.y) * 0.5;
      }
    }
    return mesh;
  }

  function growLimit(mesh: THREE.Mesh, clip: Rect | null): number {
    if (clip === null || !mesh.visible) return 1;
    mesh.updateWorldMatrix(true, false);
    clipBox.setFromObject(mesh);
    let cap = 4;
    const halfX = (clipBox.max.x - clipBox.min.x) * 0.5;
    if (halfX > 0.02) {
      const cx = (clipBox.min.x + clipBox.max.x) * 0.5;
      cap = Math.min(cap, (cx - clip.x) / halfX, (clip.x + clip.w - cx) / halfX);
    }
    const halfY = (clipBox.max.y - clipBox.min.y) * 0.5;
    if (halfY > 0.02) {
      const cy = (clipBox.min.y + clipBox.max.y) * 0.5;
      cap = Math.min(cap, (cy - clip.y) / halfY, (clip.y + clip.h - cy) / halfY);
    }
    return Math.max(Math.min(cap, 4), 1);
  }

  function addFloorSpill(
    x: number,
    floorY: number,
    width: number,
    length: number,
    dir: number,
    hex: number,
    opacity: number,
    clip: Rect | null = null
  ): THREE.Mesh {
    const geometry = track(new THREE.PlaneGeometry(length, width, 12, 2));
    paintPlane(
      geometry,
      new THREE.Color(0xffffff),
      new THREE.Color(0x000000),
      "x",
      dir > 0 ? 0.8 : 1.25
    );
    if (dir < 0) {
      geometry.rotateZ(Math.PI);
    }
    const mesh = new THREE.Mesh(geometry, spillMaterial(hex, opacity));
    mesh.rotation.x = -Math.PI * 0.5;
    mesh.position.set(x + (dir * length) * 0.5, floorY + 0.012, 0.15);
    group.add(mesh);
    return fitToClip(mesh, clip);
  }

  function addPoolSpill(
    x: number,
    floorY: number,
    radius: number,
    hex: number,
    opacity: number,
    clip: Rect | null = null
  ): THREE.Mesh {
    const geometry = track(new THREE.CircleGeometry(radius, 24));
    radialFalloff(geometry);
    const mesh = new THREE.Mesh(geometry, spillMaterial(hex, opacity));
    mesh.rotation.x = -Math.PI * 0.5;
    mesh.scale.set(1, 0.42, 1);
    mesh.position.set(x, floorY + 0.012, 0.1);
    group.add(mesh);
    return fitToClip(mesh, clip);
  }

  function addWallGlow(
    x: number,
    y: number,
    w: number,
    h: number,
    z: number,
    hex: number,
    opacity: number,
    clip: Rect | null = null
  ): THREE.Mesh {
    const geometry = track(new THREE.CircleGeometry(1, 24));
    radialFalloff(geometry);
    const mesh = new THREE.Mesh(geometry, spillMaterial(hex, opacity));
    mesh.scale.set(w * 0.5, h * 0.5, 1);
    mesh.position.set(x, y, z);
    group.add(mesh);
    return fitToClip(mesh, clip);
  }

  function addOrb(
    x: number,
    y: number,
    z: number,
    radius: number,
    hex: number,
    opacity: number,
    parent: THREE.Object3D = group
  ): THREE.Mesh {
    const material = haloMaterial(hex);
    material.opacity = Math.min(Math.max(opacity, 0), 1);
    const size = Math.max(radius, 0.05) * 2;
    const mesh = new THREE.Mesh(track(new THREE.PlaneGeometry(size, size)), material);
    mesh.position.set(x, y, z);
    mesh.renderOrder = 3;
    mesh.layers.set(ACTOR_LAYER);
    parent.add(mesh);
    return mesh;
  }

  function registerDoorGlow(mesh: THREE.Mesh, clip: Rect | null = null, lengthOnly = false): void {
    const material = mesh.material as THREE.MeshBasicMaterial;
    doorGlows.push({
      material,
      opacity: material.opacity,
      mesh,
      scaleX: mesh.scale.x,
      scaleY: mesh.scale.y,
      grow: growLimit(mesh, clip),
      lengthOnly
    });
  }

  function registerDoorPanel(material: THREE.MeshBasicMaterial): void {
    doorPanels.push({ material, base: material.color.clone() });
  }

  function registerDoorLight(light: THREE.PointLight | null): void {
    if (light === null) return;
    doorLights.push({ light, intensity: light.intensity });
  }

  function registerDoorPlate(material: LitMaterial, lift: number): LitMaterial {
    doorPlates.push({
      material,
      color: material.color.clone(),
      emissive: material.emissive.clone(),
      lift
    });
    return material;
  }

  function addArchStones(
    cx: number,
    springY: number,
    radius: number,
    thickness: number,
    depth: number,
    z: number,
    material: THREE.Material,
    parent: THREE.Object3D
  ): void {
    const count = 9;
    const arc = Math.PI;
    for (let i = 0; i < count; i++) {
      const a = (i + 0.5) / count;
      const angle = a * arc;
      const mid = radius + thickness * 0.5;
      const x = cx + Math.cos(angle) * mid;
      const y = springY + Math.sin(angle) * mid;
      const chord = ((2 * Math.PI * mid) / (2 * count)) * 1.04;
      const keystone = i === Math.floor(count / 2);
      const stone = addBox(
        chord,
        keystone ? thickness * 1.35 : thickness,
        depth,
        x,
        keystone ? y + thickness * 0.12 : y,
        z,
        keystone ? stoneLitMat : material,
        parent,
        true
      );
      stone.rotation.z = angle - Math.PI * 0.5;
    }
    addBox(0.55, 0.32, depth * 1.06, cx - radius - thickness * 0.5, springY - 0.16, z, material, parent, true);
    addBox(0.55, 0.32, depth * 1.06, cx + radius + thickness * 0.5, springY - 0.16, z, material, parent, true);
  }

  function addPier(rect: Rect, depth: number, z: number, material: THREE.Material, parent: THREE.Object3D): void {
    const cx = rect.x + rect.w * 0.5;
    const far = z <= FAR_Z;
    addRect(rect, depth, z, material, parent, !far);
    const capH = Math.max(rect.w * 0.32, 0.18);
    addBox(rect.w * 1.28, capH, depth * 1.14, cx, rect.y + rect.h - capH * 0.5, z, material, parent, !far);
    addBox(rect.w * 1.14, capH * 0.7, depth * 1.07, cx, rect.y + rect.h - capH - capH * 0.35, z, material, parent, !far);
    addBox(rect.w * 1.32, capH * 1.1, depth * 1.16, cx, rect.y + capH * 0.55, z, material, parent, !far);
  }

  function findFloorY(room: Room, x: number, below: number): number {
    let best = room.bounds.y;
    for (const solid of room.solids) {
      const top = solid.y + solid.h;
      if (top > below + 0.01) continue;
      if (x < solid.x - 0.05 || x > solid.x + solid.w + 0.05) continue;
      if (top > best) best = top;
    }
    return best;
  }

  function addStair(decor: Decor, treads: Rect[], room: Room, feel: Feel): void {
    const list = treads.slice().sort((a, b) => a.x - b.x);
    if (list.length === 0) {
      const steps = Math.max(2, Math.round(decor.rect.w / 1.0));
      const run = decor.rect.w / steps;
      const rise = decor.rect.h / steps;
      for (let i = 0; i < steps; i++) {
        list.push({ x: decor.rect.x + i * run, y: decor.rect.y + (i + 1) * rise - 0.28, w: run, h: 0.28 });
      }
    }
    const first = list[0];
    const last = list[list.length - 1];
    if (first === undefined || last === undefined) return;
    const rising = last.y >= first.y;
    const low = rising ? first : last;
    const high = rising ? last : first;
    const far = decor.z <= FAR_Z;
    const depth = far ? feel.solidDepth * 0.6 : feel.solidDepth;
    const z = decor.z;
    const backZ = z - depth * 0.5 - 0.14;
    const treadMat = far ? farMat : faceMat;
    const barMat = far ? farLitMat : ironMat;
    const darkBar = far ? farMat : ironDarkMat;

    for (const tread of list) {
      if (far) {
        addRect(tread, depth, z, treadMat, group);
        addBox(tread.w + 0.04, 0.06, depth, tread.x + tread.w * 0.5, tread.y + tread.h - 0.03, z, farLitMat, group);
      } else {
        addPlate(tread, z, group, feel);
      }
      addBox(0.32, 0.09, 0.2, tread.x + tread.w * 0.5, tread.y - 0.05, backZ, darkBar, group, !far);
      const gusset = addBar(
        tread.x + tread.w * 0.5 + 0.16,
        tread.y - 0.08,
        tread.x + tread.w * 0.5 - 0.22,
        tread.y - 0.42,
        0.07,
        0.16,
        backZ,
        darkBar,
        group
      );
      gusset.visible = !far;
    }

    const stringerThick = Math.max(feel.stairStringer, 0.12);
    const x1 = low.x + low.w * 0.2;
    const y1 = low.y - stringerThick * 0.7;
    const x2 = high.x + high.w * 0.8;
    const y2 = high.y - stringerThick * 0.7;
    addBar(x1, y1, x2, y2, stringerThick, 0.24, backZ, barMat, group, !far);

    if (!far) {
      const railH = Math.max(feel.railHeight, 0.4);
      for (const tread of list) {
        const px = tread.x + tread.w * 0.5;
        addBox(0.07, railH, 0.07, px, tread.y + tread.h + railH * 0.5, backZ, ironDarkMat, group, true);
      }
      addBar(
        low.x + low.w * 0.5,
        low.y + low.h + railH,
        high.x + high.w * 0.5,
        high.y + high.h + railH,
        0.09,
        0.11,
        backZ,
        ironMat,
        group,
        true
      );
    }

    const floorY = findFloorY(room, low.x + low.w * 0.5, low.y);
    const plinthH = low.y - stringerThick - floorY;
    if (plinthH > 0.2) {
      const plinth: Rect = { x: low.x + low.w * 0.05, y: floorY, w: low.w * 0.9, h: plinthH };
      addRect(plinth, depth * 0.7, backZ - 0.2, far ? farMat : stoneDarkMat, group, !far);
      addBox(plinth.w * 1.12, 0.14, depth * 0.76, plinth.x + plinth.w * 0.5, floorY + plinthH - 0.07, backZ - 0.2, far ? farLitMat : stoneMat, group, !far);
    }
  }

  function addGallery(decor: Decor, plates: Rect[], room: Room, feel: Feel): void {
    const list = plates.slice().sort((a, b) => a.x - b.x);
    if (list.length === 0) {
      list.push({ x: decor.rect.x, y: decor.rect.y + decor.rect.h - 0.5, w: decor.rect.w, h: 0.5 });
    }
    const far = decor.z <= FAR_Z;
    const depth = far ? feel.solidDepth * 0.6 : feel.solidDepth;
    const z = decor.z;
    const backZ = z - depth * 0.5 + 0.16;
    const railH = Math.max(feel.railHeight, 0.4);
    const spacing = Math.max(feel.balusterSpacing, 0.4);
    const bounds = room.bounds;

    for (const plate of list) {
      if (far) {
        addRect(plate, depth, z, farMat, group);
        addBox(plate.w, 0.06, depth, plate.x + plate.w * 0.5, plate.y + plate.h + CAP_LIFT - 0.03, z, farLitMat, group);
      } else {
        addPlate(plate, z, group, feel);
        addBox(plate.w, 0.1, 0.12, plate.x + plate.w * 0.5, plate.y + 0.05 - CAP_LIFT, z + depth * 0.5 - 0.06 + CAP_LIFT, ironDarkMat, group, true);
      }

      const top = plate.y + plate.h;
      const posts = Math.max(2, Math.round(plate.w / spacing) + 1);
      for (let i = 0; i < posts; i++) {
        const px = plate.x + 0.12 + ((plate.w - 0.24) * i) / (posts - 1);
        addBox(0.075, railH, 0.075, px, top + railH * 0.5, backZ, far ? farLitMat : ironDarkMat, group, !far);
      }
      addBox(plate.w, 0.1, 0.13, plate.x + plate.w * 0.5, top + railH, backZ, far ? farLitMat : ironMat, group, !far);
      addBox(plate.w, 0.05, 0.07, plate.x + plate.w * 0.5, top + railH * 0.48, backZ, far ? farLitMat : ironDarkMat, group, !far);

      const ends = [plate.x + 0.3, plate.x + plate.w - 0.3];
      for (const ex of ends) {
        const nearLeft = ex < bounds.x + 0.9;
        const nearRight = ex > bounds.x + bounds.w - 0.9;
        if (nearLeft || nearRight) {
          const wallX = nearLeft ? bounds.x : bounds.x + bounds.w;
          const span = Math.abs(ex - wallX) + 0.3;
          const cx = (ex + wallX) * 0.5;
          addBox(span, 0.42, depth * 0.8, cx, plate.y - 0.21, backZ - 0.1, far ? farMat : stoneDarkMat, group, !far);
          addBar(wallX, plate.y - 1.2, ex, plate.y - 0.3, 0.16, 0.2, backZ - 0.1, far ? farMat : ironDarkMat, group, !far);
          continue;
        }
        const floorY = findFloorY(room, ex, plate.y);
        const colH = plate.y - floorY;
        if (colH > 0.4) {
          addBox(0.34, colH, 0.34, ex, floorY + colH * 0.5, backZ - 0.2, far ? farMat : ironDarkMat, group, !far);
          addBox(0.5, 0.16, 0.5, ex, floorY + 0.08, backZ - 0.2, far ? farMat : stoneMat, group, !far);
          addBox(0.5, 0.14, 0.5, ex, plate.y - 0.07, backZ - 0.2, far ? farMat : ironMat, group, !far);
          const dir = ex < plate.x + plate.w * 0.5 ? 1 : -1;
          addBar(ex, plate.y - 1.1, ex + dir * 0.9, plate.y - 0.16, 0.1, 0.14, backZ - 0.2, far ? farMat : ironDarkMat, group, !far);
        }
      }
    }
  }

  function addBeam(decor: Decor, solids: Rect[], room: Room, feel: Feel): void {
    const beam = solids[0] ?? { x: decor.rect.x, y: decor.rect.y, w: decor.rect.w, h: Math.min(decor.rect.h, 0.9) };
    const far = decor.z <= FAR_Z;
    const depth = far ? feel.solidDepth * 0.5 : feel.solidDepth * 0.7;
    const z = decor.z;
    const walkable = solids.length > 0;
    const cx = beam.x + beam.w * 0.5;
    const cy = beam.y + beam.h * 0.5;

    addBox(beam.w, beam.h * 0.62, depth * 0.55, cx, cy, z, far ? farMat : faceMat, group, !far);
    addBox(beam.w, beam.h * 0.2, depth, cx, beam.y + beam.h * 0.1, z, far ? farMat : ironDarkMat, group, !far);
    if (walkable && !far) {
      addBox(beam.w, beam.h * 0.2, depth, cx, beam.y + beam.h * 0.9 - feel.rimHeight * 0.5, z, ironDarkMat, group, true);
      addRim(beam, depth, z, group, feel);
    } else {
      addBox(beam.w, beam.h * 0.2, depth, cx, beam.y + beam.h * 0.9, z, far ? farLitMat : ironMat, group, !far);
    }
    if (!far) {
      addPlateWithRivets(0.22, beam.h * 1.06, depth * 1.05, beam.x + 0.11 - CAP_LIFT, cy, z, group, ironMat);
      addPlateWithRivets(0.22, beam.h * 1.06, depth * 1.05, beam.x + beam.w - 0.11 + CAP_LIFT, cy, z, group, ironMat);
    }

    const hangSpan = decor.rect.y + decor.rect.h - (beam.y + beam.h);
    if (hangSpan > 1.5 && !far) {
      const chainX = beam.x + beam.w * 0.82;
      const segH = Math.max(feel.chainSegmentHeight, 0.05);
      const hang = Math.max(hangSpan * 0.72, 0.8);
      addBox(0.7, 0.24, depth * 0.8, chainX, decor.rect.y + decor.rect.h - 0.12, z - 0.2, ironDarkMat, group, true);
      addChainRun(chainX, decor.rect.y + decor.rect.h - 0.24, hang, z - 0.2, ironMat, Math.max(feel.chainRadius, 0.02), segH);
      const otherX = beam.x + beam.w * 0.18;
      addBox(0.7, 0.24, depth * 0.8, otherX, decor.rect.y + decor.rect.h - 0.12, z - 0.2, ironDarkMat, group, true);
      addChainRun(otherX, decor.rect.y + decor.rect.h - 0.24, Math.min(hang * 0.35, 2.2), z - 0.2, ironMat, Math.max(feel.chainRadius, 0.02), segH);
      const floorY = findFloorY(room, beam.x + beam.w * 0.5, beam.y);
      if (beam.y - floorY > 0.3) {
        addBox(0.5, beam.y - floorY, 0.5, beam.x + 0.55, floorY + (beam.y - floorY) * 0.5, z - 0.3, stoneDarkMat, group, true);
        addBox(0.5, beam.y - floorY, 0.5, beam.x + beam.w - 0.55, floorY + (beam.y - floorY) * 0.5, z - 0.3, stoneDarkMat, group, true);
      }
    }
  }

  function addBench(decor: Decor, solids: Rect[], room: Room, feel: Feel): void {
    const seat = solids[0] ?? { x: decor.rect.x, y: decor.rect.y + decor.rect.h - 0.4, w: decor.rect.w, h: 0.4 };
    const z = decor.z;
    const depth = feel.solidDepth * 0.7;
    addRect(seat, depth, z, faceMat, group, true);
    addRim(seat, depth, z, group, feel);
    const floorY = findFloorY(room, seat.x + seat.w * 0.5, seat.y);
    const legH = seat.y - floorY;
    if (legH > 0.05) {
      const legs = [seat.x + 0.32, seat.x + seat.w - 0.32];
      for (const lx of legs) {
        addBox(0.34, legH, depth * 0.9, lx, floorY + legH * 0.5, z + 0.05, stoneLitMat, group, true);
        addBox(0.46, 0.09, depth * 0.94, lx, floorY + 0.045, z + 0.05, ironMat, group, true);
      }
      addBox(seat.w - 0.9, 0.08, 0.08, seat.x + seat.w * 0.5, floorY + legH * 0.45, z - 0.05, ironMat, group, true);
    }
  }

  function addCrate(decor: Decor, solids: Rect[], feel: Feel): void {
    const boxes = solids.length > 0 ? solids : [decor.rect];
    const z = decor.z;
    const far = z <= FAR_Z;
    for (const crate of boxes) {
      const depth = far ? feel.solidDepth * 0.5 : feel.solidDepth * 0.85;
      const cx = crate.x + crate.w * 0.5;
      const cy = crate.y + crate.h * 0.5;
      addRect(crate, depth, z, far ? farMat : stoneDarkMat, group, !far);
      if (far) continue;
      const front = z + depth * 0.5 + 0.008;
      addBox(crate.w - 0.16, 0.03, 0.012, cx, crate.y + crate.h * 0.36, front, voidMat, group);
      addBox(crate.w - 0.16, 0.03, 0.012, cx, crate.y + crate.h * 0.68, front, voidMat, group);
      addBox(0.09, crate.h, 0.06, crate.x + 0.06, cy, front + 0.02, ironDarkMat, group, true);
      addBox(0.09, crate.h, 0.06, crate.x + crate.w - 0.06, cy, front + 0.02, ironDarkMat, group, true);
      addBox(crate.w, 0.07, 0.06, cx, cy, front + 0.02, ironDarkMat, group, true);
      addRivets(cx, cy, crate.w - 0.02, crate.h - 0.02, front + 0.06, group, ironMat);
      if (solids.length > 0) addRim(crate, depth, z, group, feel, 0.04);
    }
  }

  function punchRect(piece: Rect, hole: Rect): Rect[] {
    const x0 = Math.max(piece.x, hole.x);
    const x1 = Math.min(piece.x + piece.w, hole.x + hole.w);
    const y0 = Math.max(piece.y, hole.y);
    const y1 = Math.min(piece.y + piece.h, hole.y + hole.h);
    if (x1 - x0 <= 0.02 || y1 - y0 <= 0.02) return [piece];
    const out: Rect[] = [];
    if (y0 - piece.y > 0.02) out.push({ x: piece.x, y: piece.y, w: piece.w, h: y0 - piece.y });
    if (piece.y + piece.h - y1 > 0.02) out.push({ x: piece.x, y: y1, w: piece.w, h: piece.y + piece.h - y1 });
    if (x0 - piece.x > 0.02) out.push({ x: piece.x, y: y0, w: x0 - piece.x, h: y1 - y0 });
    if (piece.x + piece.w - x1 > 0.02) out.push({ x: x1, y: y0, w: piece.x + piece.w - x1, h: y1 - y0 });
    return out;
  }

  function punchOpenings(source: Rect, holes: Rect[]): Rect[] {
    let pieces: Rect[] = [source];
    for (const hole of holes) {
      const next: Rect[] = [];
      for (const piece of pieces) {
        for (const part of punchRect(piece, hole)) next.push(part);
      }
      pieces = next;
    }
    return pieces;
  }

  function addWall(decor: Decor, solids: Rect[], feel: Feel): void {
    const z = decor.z;
    const far = z <= FAR_Z;
    const depth = far ? feel.solidDepth * 0.6 : feel.solidDepth;
    const riveted = (decor.intensity ?? 0) >= 1;
    const masses: Rect[] = [];
    const hatches: Opening[] = [];
    for (const source of solids.length > 0 ? solids : [decor.rect]) {
      const holes = currentOpenings.filter((o) => rectsTouch(o.rect, source, -0.04));
      if (decor.z === 0) {
        for (const hole of holes) {
          if (hole.side !== "ceiling" && hole.side !== "floor") continue;
          if (hole.rect.y < source.y - 0.05) continue;
          if (hole.rect.y + hole.rect.h > source.y + source.h + 0.05) continue;
          hatches.push(hole);
        }
      }
      for (const piece of punchOpenings(source, holes.map((o) => o.rect))) masses.push(piece);
    }
    for (const mass of masses) {
      addRect(mass, depth, z, far ? farMat : wallMat, group, !far);
      if (solids.length > 0 && !far) addRim(mass, depth, z, group, feel);
      if (far) continue;
      if (riveted) {
        const cols = Math.max(1, Math.round(mass.w / 1.4));
        const rows = Math.max(1, Math.round(mass.h / 1.0));
        const pw = mass.w / cols;
        const ph = mass.h / rows;
        const front = z + depth * 0.5 + 0.006;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const px = mass.x + (i + 0.5) * pw;
            const py = mass.y + (j + 0.5) * ph;
            addBox(pw - 0.05, 0.03, 0.012, px, mass.y + j * ph, front, voidMat, group);
            addBox(0.03, ph - 0.05, 0.012, mass.x + i * pw, py, front, voidMat, group);
            addRivets(px, py, pw - 0.1, ph - 0.1, front + 0.03, group, ironDarkMat);
          }
        }
      } else {
        addCourses(mass, depth, z, group, feel, mass.x + mass.y * 3);
      }
    }
    const room = currentRoom;
    if (room !== null) {
      for (const hatch of hatches) addVerticalPassage(hatch, room, feel);
    }
  }

  function fading(material: THREE.Material, opacity: number): THREE.Material {
    material.transparent = true;
    material.depthWrite = false;
    material.opacity = opacity;
    material.visible = opacity > 0.004;
    material.needsUpdate = true;
    return material;
  }

  function boundaryUnder(rect: Rect, room: Room): Rect | null {
    const b = room.bounds;
    for (const solid of room.solids) {
      const isBoundary =
        solid.x + solid.w <= b.x + 0.01 ||
        solid.x >= b.x + b.w - 0.01 ||
        solid.y + solid.h <= b.y + 0.01 ||
        solid.y >= b.y + b.h - 0.01;
      if (!isBoundary) continue;
      if (rectsTouch(rect, solid, 0.05)) return solid;
    }
    return null;
  }

  function addVeil(decor: Decor, feel: Feel): void {
    const room = currentRoom;
    if (room === null) return;
    const rect = decor.rect;
    const depth = feel.solidDepth;
    const rest = Math.max(feel.veilRestOpacity, 0);
    const z = decor.z + 0.02;

    const face = fading(transient(look.material("backgroundNear")), rest);
    const lineMat = fading(
      transient(new THREE.MeshBasicMaterial({ color: ramp.void, fog: false })),
      rest
    );
    const pilasterMat = fading(transient(look.material("architecture", { shade: 0.74 })), rest);
    const hideOutline = outlined
      ? fading(
          transient(
            new THREE.MeshBasicMaterial({ color: ramp.void, side: THREE.BackSide, fog: false })
          ),
          rest
        )
      : null;
    const showOutline = outlined
      ? fading(
          transient(
            new THREE.MeshBasicMaterial({ color: ramp.void, side: THREE.BackSide, fog: false })
          ),
          0
        )
      : null;

    const veil: Veil = {
      rect,
      opacity: rest,
      hide: [
        { material: face, base: 1 },
        { material: lineMat, base: 1 },
        { material: pilasterMat, base: 1 }
      ],
      show: [],
      lights: [],
      stone: fading(transient(look.material("architecture")), 0),
      stoneDark: fading(transient(look.material("architecture", { shade: 0.74 })), 0),
      stoneLit: fading(transient(look.material("architecture", { shade: 1.12 })), 0),
      outline: showOutline
    };
    if (hideOutline !== null) veil.hide.push({ material: hideOutline, base: 1 });
    veil.show.push({ material: veil.stone, base: 1 });
    veil.show.push({ material: veil.stoneDark, base: 1 });
    veil.show.push({ material: veil.stoneLit, base: 1 });
    if (showOutline !== null) veil.show.push({ material: showOutline, base: 1 });
    veils.push(veil);
    for (const opening of currentOpenings) {
      if (rectsTouch(opening.rect, rect, 0.2)) veilByOpening.set(opening, veil);
    }

    const wall = boundaryUnder(rect, room);
    const b = room.bounds;
    const rightWall = wall !== null && wall.x >= b.x + b.w - 0.01;
    const leftWall = wall !== null && wall.x + wall.w <= b.x + 0.01;
    const dir = rightWall ? 1 : leftWall ? -1 : 0;
    const lift = Math.max(feel.wallLift, 0.001);
    const faceRect: Rect =
      dir === 0
        ? rect
        : {
            x: dir > 0 ? rect.x - lift * 2 : rect.x,
            y: rect.y,
            w: rect.w + lift * 2,
            h: rect.h
          };

    outlineOverride = hideOutline;
    addRect(faceRect, depth, z, face, group, true);

    const strip: Rect =
      wall === null ? faceRect : { x: wall.x, y: rect.y, w: wall.w, h: rect.h };
    addCourses(strip, depth, z, group, feel, strip.x + strip.y, lineMat);

    const front = z + depth * 0.5 + lift * 2;
    const tellY = rect.y + Math.min(Math.max(feel.courseSpacing, 0.3) * 0.5, rect.h * 0.3);
    addBox(strip.w * 0.44, 0.05, 0.014, strip.x + strip.w * 0.24, tellY, front, lineMat, group);

    if (wall !== null && dir !== 0) {
      const innerX = dir > 0 ? wall.x : wall.x + wall.w;
      addBox(
        0.5,
        rect.h,
        depth + 0.24,
        innerX + dir * (0.25 - lift * 3),
        rect.y + rect.h * 0.5,
        z,
        pilasterMat,
        group,
        true
      );
    }
    outlineOverride = null;
  }

  function addRubble(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const far = z <= FAR_Z;
    const random = seededRandom(rect.x * 3.1 + rect.y * 1.7 + rect.w);
    const count = Math.max(4, Math.round(rect.w * 2.4));
    const depth = far ? feel.solidDepth * 0.5 : feel.solidDepth * 0.8;
    for (let i = 0; i < count; i++) {
      const u = random();
      const heap = Math.pow(1 - Math.abs(u * 2 - 1), 1.3);
      const size = 0.28 + random() * 0.55;
      const x = rect.x + u * rect.w;
      const y = rect.y + random() * rect.h * heap * 0.85 + size * 0.35;
      const pick = random();
      const mat = far ? (pick < 0.3 ? farLitMat : farMat) : pick < 0.35 ? stoneMat : pick < 0.7 ? stoneDarkMat : faceMat;
      const block = addBox(size * (0.8 + random() * 0.7), size, depth * (0.5 + random() * 0.4), x, y, z + (random() - 0.5) * 0.3, mat, group, !far);
      block.rotation.z = (random() - 0.5) * 1.1;
    }
    if (far) return;
    const fragments = 2;
    for (let i = 0; i < fragments; i++) {
      const x = rect.x + rect.w * (0.3 + i * 0.4);
      const y = rect.y + rect.h * 0.55 + i * 0.25;
      const holder = new THREE.Group();
      holder.position.set(x, y, z + 0.1);
      holder.rotation.z = (random() - 0.5) * 0.9;
      group.add(holder);
      addBox(0.9, 0.24, depth * 0.5, 0, 0, 0, faceMat, holder, true);
      addBox(0.94, feel.rimHeight, depth * 0.54, 0, 0.12 + RIM_LIFT - feel.rimHeight * 0.5, 0, rimMat, holder, true);
    }
    const bar = addBar(rect.x + rect.w * 0.2, rect.y + 0.2, rect.x + rect.w * 0.6, rect.y + rect.h * 1.3, 0.22, 0.2, z - 0.4, ironDarkMat, group, true);
    bar.rotation.z += 0.05;
  }

  function addLamp(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const arm = rect.y + rect.h;
    const dir = rect.w >= 0 ? 1 : -1;
    const wallX = rect.x;
    const lampX = rect.x + rect.w * 0.78;
    addBox(0.14, 0.9, 0.3, wallX + dir * 0.07, arm - 0.3, z, ironDarkMat, group, true);
    addBox(Math.abs(lampX - wallX) + 0.1, 0.1, 0.1, (wallX + lampX) * 0.5, arm, z, ironDarkMat, group, true);
    addBar(wallX + dir * 0.1, arm - 0.72, lampX - dir * 0.25, arm - 0.06, 0.07, 0.07, z, ironDarkMat, group, true);
    addBox(0.06, 0.16, 0.06, lampX, arm - 0.08, z, ironMat, group);
    const lanternTop = arm - 0.16;
    const lh = 0.62;
    const lw = 0.42;
    const ly = lanternTop - lh * 0.5;
    addBox(lw + 0.1, 0.09, lw + 0.1, lampX, lanternTop, z, ironDarkMat, group, true);
    addBox(lw * 0.6, 0.12, lw * 0.6, lampX, lanternTop + 0.08, z, ironDarkMat, group, true);
    addBox(lw + 0.06, 0.07, lw + 0.06, lampX, lanternTop - lh, z, ironDarkMat, group, true);
    const glass = transient(new THREE.MeshBasicMaterial({ color: ramp.amber, fog: false }));
    addBox(lw, lh - 0.1, lw * 0.9, lampX, ly, z, glass, group).layers.set(ACTOR_LAYER);
    const edges = [lampX - lw * 0.5, lampX + lw * 0.5];
    for (const ex of edges) addBox(0.05, lh, 0.05, ex, ly, z + lw * 0.46, ironDarkMat, group);
    addBox(0.05, lh, 0.05, lampX, ly, z + lw * 0.46, ironDarkMat, group);
    const flameMat = transient(new THREE.MeshBasicMaterial({ color: ramp.porcelain, fog: false }));
    addBox(0.1, 0.2, 0.1, lampX, ly - 0.05, z + lw * 0.2, flameMat, group).layers.set(ACTOR_LAYER);
    addOrb(lampX, ly, z + lw * 0.5, feel.lampHaloRadius, ramp.amber, feel.lampHaloOpacity);
    const light = addFlameLight(ramp.amber, feel.lampLightIntensity, feel.lampLightDistance, lampX, ly, z + 0.9, LIGHT_PRIORITY_KEY);
    if (light !== null) {
      registerActorLight(light);
      ownedActorLights.push(light);
    }
    addPoolSpill(lampX, rect.y, 2.4, ramp.amber, feel.passageSpillOpacity * 0.8, roomClip);
    addWallGlow(lampX, ly - 0.3, 3.0, 3.6, z - 0.35, ramp.amber, feel.passageSpillOpacity * 0.22, roomClip);
    flames.push({ material: glass, base: new THREE.Color(ramp.amber), light, lightBase: feel.lampLightIntensity, phase: lampX, amount: 0.12, furnace: false });
  }

  function addPipe(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const far = z <= FAR_Z;
    const horizontal = rect.w >= rect.h;
    const radius = Math.max(Math.min(rect.w, rect.h) * 0.5, 0.08);
    const length = Math.max(rect.w, rect.h);
    const cx = rect.x + rect.w * 0.5;
    const cy = rect.y + rect.h * 0.5;
    const bodyMat = far ? farMat : ironDarkMat;
    const flangeMat = far ? farLitMat : ironMat;
    const body = new THREE.Mesh(track(new THREE.CylinderGeometry(radius, radius, length, 10)), bodyMat);
    body.position.set(cx, cy, z);
    if (horizontal) body.rotation.z = Math.PI * 0.5;
    group.add(body);
    const flangeGeo = track(new THREE.CylinderGeometry(radius * 1.3, radius * 1.3, 0.1, 10));
    const offsets = [-length * 0.5 + 0.08, 0, length * 0.5 - 0.08];
    for (const off of offsets) {
      const flange = new THREE.Mesh(flangeGeo, flangeMat);
      flange.position.set(horizontal ? cx + off : cx, horizontal ? cy : cy + off, z);
      if (horizontal) flange.rotation.z = Math.PI * 0.5;
      group.add(flange);
    }
    if ((decor.intensity ?? 0) >= 1 && !far) {
      const ex = horizontal ? rect.x + rect.w : cx;
      const ey = horizontal ? cy : rect.y + rect.h;
      const elbow = new THREE.Mesh(track(new THREE.SphereGeometry(radius * 1.15, 10, 8)), ironDarkMat);
      elbow.position.set(ex, ey, z);
      group.add(elbow);
      const stubLen = Math.max(radius * 6, 0.8);
      const stub = new THREE.Mesh(track(new THREE.CylinderGeometry(radius, radius, stubLen, 10)), ironDarkMat);
      stub.position.set(horizontal ? ex : ex + stubLen * 0.5, horizontal ? ey + stubLen * 0.5 : ey, z);
      if (!horizontal) stub.rotation.z = Math.PI * 0.5;
      group.add(stub);
      const endFlange = new THREE.Mesh(flangeGeo, ironMat);
      endFlange.position.set(horizontal ? ex : ex + stubLen - 0.05, horizontal ? ey + stubLen - 0.05 : ey, z);
      if (!horizontal) endFlange.rotation.z = Math.PI * 0.5;
      group.add(endFlange);
    }
  }

  function addRack(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const cx = rect.x + rect.w * 0.5;
    addRect(rect, 0.16, z - 0.3, wallMat, group, true);
    const rails = [rect.y + rect.h * 0.78, rect.y + rect.h * 0.42];
    for (const ry of rails) {
      addBox(rect.w - 0.16, 0.07, 0.12, cx, ry, z - 0.16, ironMat, group, true);
      addBox(0.1, 0.16, 0.16, rect.x + 0.14, ry - 0.02, z - 0.16, ironDarkMat, group);
      addBox(0.1, 0.16, 0.16, rect.x + rect.w - 0.14, ry - 0.02, z - 0.16, ironDarkMat, group);
    }
    const top = rails[0] ?? rect.y;
    const lower = rails[1] ?? rect.y;
    const slots = Math.max(2, Math.floor(rect.w / 0.55));
    const random = seededRandom(rect.x + rect.y * 2);
    for (let i = 0; i < slots; i++) {
      const tx = rect.x + 0.3 + ((rect.w - 0.6) * i) / Math.max(slots - 1, 1);
      const pick = (i + Math.floor(random() * 2)) % 4;
      if (pick === 0) {
        addBar(tx - 0.08, top - 0.06, tx - 0.02, top - 0.7, 0.05, 0.05, z - 0.1, ironMat, group);
        addBar(tx + 0.08, top - 0.06, tx + 0.02, top - 0.7, 0.05, 0.05, z - 0.1, ironMat, group);
      } else if (pick === 1) {
        addBox(0.05, 0.62, 0.05, tx, top - 0.35, z - 0.1, ironDarkMat, group);
        addBox(0.26, 0.14, 0.14, tx, top - 0.62, z - 0.1, ironMat, group, true);
      } else if (pick === 2) {
        const coil = new THREE.Mesh(track(new THREE.TorusGeometry(0.16, 0.05, 6, 14)), ironMat);
        coil.position.set(tx, top - 0.26, z - 0.1);
        group.add(coil);
      } else {
        const spool = new THREE.Mesh(track(new THREE.CylinderGeometry(0.14, 0.14, 0.22, 10)), stoneMat);
        spool.rotation.x = Math.PI * 0.5;
        spool.position.set(tx, top - 0.22, z - 0.1);
        group.add(spool);
      }
      const lx = tx + 0.2;
      if (i % 2 === 0) {
        addBox(0.05, 0.5, 0.05, lx, lower - 0.28, z - 0.1, ironDarkMat, group);
        addBox(0.1, 0.1, 0.1, lx, lower - 0.55, z - 0.1, ironMat, group);
      } else {
        const hook = new THREE.Mesh(track(new THREE.TorusGeometry(0.1, 0.03, 6, 10, Math.PI)), ironMat);
        hook.position.set(lx, lower - 0.2, z - 0.1);
        hook.rotation.z = Math.PI;
        group.add(hook);
      }
    }
    if (feel.rimHeight < 0) return;
  }

  function addWinch(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const far = z <= FAR_Z;
    const cx = rect.x + rect.w * 0.5;
    const drumR = Math.max(rect.h * 0.24, 0.3);
    const drumY = rect.y + rect.h * 0.62;
    const drumLen = rect.w * 0.5;
    const bodyMat = far ? farMat : ironDarkMat;
    const litMat = far ? farLitMat : ironMat;
    const drum = new THREE.Mesh(track(new THREE.CylinderGeometry(drumR, drumR, drumLen, 12)), bodyMat);
    drum.rotation.z = Math.PI * 0.5;
    drum.position.set(cx, drumY, z);
    group.add(drum);
    const windGeo = track(new THREE.TorusGeometry(drumR * 1.02, drumR * 0.12, 5, 16));
    for (let i = 0; i < 4; i++) {
      const wind = new THREE.Mesh(windGeo, litMat);
      wind.rotation.y = Math.PI * 0.5;
      wind.position.set(cx - drumLen * 0.3 + i * drumLen * 0.2, drumY, z);
      group.add(wind);
    }
    const legs = [cx - drumLen * 0.5 - 0.1, cx + drumLen * 0.5 + 0.1];
    for (const lx of legs) {
      addBar(lx - 0.5, rect.y, lx, drumY, 0.16, 0.2, z, bodyMat, group, !far);
      addBar(lx + 0.5, rect.y, lx, drumY, 0.16, 0.2, z, bodyMat, group, !far);
      addBox(1.3, 0.2, 0.7, lx, rect.y + 0.1, z, far ? farMat : stoneDarkMat, group, !far);
      addBox(0.34, 0.34, 0.34, lx, drumY, z, litMat, group, !far);
    }
    if (!far) {
      const wheel = new THREE.Mesh(track(new THREE.TorusGeometry(drumR * 1.1, 0.05, 6, 18)), ironMat);
      const wx = legs[1] ?? cx;
      wheel.position.set(wx + 0.3, drumY, z + 0.2);
      wheel.rotation.y = Math.PI * 0.5;
      group.add(wheel);
      for (let i = 0; i < 4; i++) {
        const spoke = addBox(0.05, drumR * 2.1, 0.05, wx + 0.3, drumY, z + 0.2, ironMat, group);
        spoke.rotation.z = (i * Math.PI) / 4;
      }
    }
    const segH = Math.max(feel.chainSegmentHeight, 0.05);
    const hang = drumY - drumR - rect.y;
    if (hang > 0.4) {
      addChainRun(cx + drumLen * 0.1, drumY - drumR + 0.05, hang, z + 0.1, litMat, Math.max(feel.chainRadius, 0.02), segH);
    }
  }

  function addYoke(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const far = z <= FAR_Z;
    const cx = rect.x + rect.w * 0.5;
    const beamH = Math.max(rect.w * 0.09, 0.4);
    const beamY = rect.y + beamH * 0.5;
    const bodyMat = far ? farMat : stoneDarkMat;
    const strapMat = far ? farLitMat : ironMat;
    addBox(rect.w, beamH, beamH * 1.4, cx, beamY, z, bodyMat, group, !far);
    addBox(rect.w * 0.7, beamH * 0.55, beamH * 1.5, cx, beamY + beamH * 0.7, z, bodyMat, group, !far);
    const straps = [cx - rect.w * 0.3, cx + rect.w * 0.3];
    for (const sx of straps) {
      addBox(0.24, beamH * 1.2, beamH * 1.5, sx, beamY + beamH * 0.1, z, strapMat, group, !far);
    }
    const pin = new THREE.Mesh(track(new THREE.CylinderGeometry(beamH * 0.36, beamH * 0.36, beamH * 1.8, 10)), strapMat);
    pin.rotation.x = Math.PI * 0.5;
    pin.position.set(cx, beamY, z);
    group.add(pin);
    const segH = Math.max(feel.chainSegmentHeight, 0.05);
    const top = rect.y + rect.h;
    const chainH = top - (beamY + beamH);
    if (chainH > 0.3) {
      for (const sx of straps) {
        addChainRun(sx, top, chainH, z, strapMat, Math.max(feel.chainRadius, 0.02) * 1.3, segH * 1.2);
        addBox(0.8, 0.3, beamH, sx, top - 0.15, z, bodyMat, group, !far);
      }
    }
  }

  function addArch(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const far = z <= FAR_Z;
    const radius = rect.w * 0.5;
    const springY = rect.y + rect.h - radius;
    const cx = rect.x + radius;
    const thickness = Math.max(rect.w * 0.13, 0.3);
    const depth = far ? feel.solidDepth * 0.5 : feel.solidDepth * 0.9;
    const material = far ? farMat : stoneMat;
    addArchStones(cx, springY, radius, thickness, depth, z, material, group);
    const pierW = thickness * 1.15;
    addPier({ x: rect.x - pierW, y: rect.y, w: pierW, h: springY - rect.y }, depth, z, material, group);
    addPier({ x: rect.x + rect.w, y: rect.y, w: pierW, h: springY - rect.y }, depth, z, material, group);
    if ((decor.intensity ?? 0) >= 1) {
      const geometry = track(new THREE.PlaneGeometry(rect.w, rect.h, 2, 6));
      paintPlane(geometry, new THREE.Color(ramp.void), new THREE.Color(shadeOf(ramp.charcoal, 0.9)), "y", 1.2);
      const fill = new THREE.Mesh(geometry, gradientMat);
      fill.position.set(cx, rect.y + rect.h * 0.5, z - depth * 0.5 - 0.02);
      group.add(fill);
    }
  }

  function addFurnace(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const cx = rect.x + rect.w * 0.5;
    const cy = rect.y + rect.h * 0.5;
    const strength = decor.intensity === undefined ? 1 : decor.intensity;
    const depth = feel.solidDepth * 1.1;
    addRect(rect, depth, z, wallMat, group, true);
    addBox(rect.w * 1.12, 0.14, depth * 1.1, cx, rect.y + rect.h - 0.07, z, ironMat, group, true);
    addBox(rect.w * 1.12, 0.14, depth * 1.1, cx, rect.y + 0.07, z, ironDarkMat, group, true);
    const mouthW = rect.w * 0.66;
    const mouthH = rect.h * 0.46;
    const mouthY = rect.y + rect.h * 0.4;
    const front = z + depth * 0.5;
    const mouthMat = transient(new THREE.MeshBasicMaterial({ color: ramp.amber, fog: false }));
    addBox(mouthW, mouthH, 0.2, cx, mouthY, front - 0.2, mouthMat, group);
    addBox(mouthW + 0.24, 0.1, 0.16, cx, mouthY + mouthH * 0.5 + 0.05, front + 0.02, ironMat, group, true);
    addBox(mouthW + 0.24, 0.1, 0.16, cx, mouthY - mouthH * 0.5 - 0.05, front + 0.02, ironMat, group, true);
    addBox(0.12, mouthH + 0.2, 0.16, cx - mouthW * 0.5 - 0.06, mouthY, front + 0.02, ironMat, group, true);
    addBox(0.12, mouthH + 0.2, 0.16, cx + mouthW * 0.5 + 0.06, mouthY, front + 0.02, ironMat, group, true);
    const bars = 3;
    for (let i = 0; i < bars; i++) {
      addBox(0.06, mouthH, 0.08, cx - mouthW * 0.5 + ((i + 1) / (bars + 1)) * mouthW, mouthY, front - 0.04, ironDarkMat, group);
    }
    addRivets(cx, mouthY, mouthW + 0.3, mouthH + 0.26, front + 0.1, group, ironMat);
    const light = addFlameLight(ramp.amber, feel.furnaceLightIntensity * strength, feel.furnaceLightDistance, cx, mouthY, front + 0.8, LIGHT_PRIORITY_FURNACE);
    addWallGlow(cx, mouthY, rect.w * 2.4, rect.h * 1.6, front + 0.12, ramp.amber, feel.decorGlowOpacity * 0.6 * strength);
    flames.push({ material: mouthMat, base: new THREE.Color(ramp.amber), light, lightBase: feel.furnaceLightIntensity * strength, phase: cx * 0.6, amount: feel.furnacePulseAmount, furnace: true });
  }

  function addJar(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const far = z <= FAR_Z;
    const cx = rect.x + rect.w * 0.5;
    const radius = Math.max(rect.w, 0.16) * 0.5;
    const height = Math.max(rect.h, 0.3);
    const bandH = Math.min(height * 0.13, 0.2);
    const bodyH = Math.max(height - bandH * 2, 0.1);
    const baseY = rect.y + bandH;
    const coreY = baseY + bodyH * 0.44;
    const hex = decor.color === undefined ? ramp.amber : decor.color;
    const strength = decor.intensity === undefined ? 1 : decor.intensity;
    const sides = far ? 8 : 16;

    const body = new THREE.Mesh(
      track(new THREE.LatheGeometry(jarProfile(radius, bodyH), sides)),
      far ? farMat : glassMaterial(Math.min(feel.lensOpacity * 1.5, 0.9))
    );
    body.position.set(cx, baseY, z);
    body.renderOrder = 2;
    group.add(body);

    const capGeo = track(new THREE.CylinderGeometry(radius * 0.84, radius * 0.7, bandH, sides));
    const cap = new THREE.Mesh(capGeo, far ? farLitMat : rimMat);
    cap.position.set(cx, rect.y + rect.h - bandH * 0.5, z);
    group.add(cap);

    const footGeo = track(new THREE.CylinderGeometry(radius * 0.88, radius * 0.98, bandH, sides));
    const foot = new THREE.Mesh(footGeo, far ? farLitMat : ironMat);
    foot.position.set(cx, rect.y + bandH * 0.5, z);
    group.add(foot);

    if (far) return;

    const collar = new THREE.Mesh(
      track(new THREE.CylinderGeometry(radius * 0.46, radius * 0.46, bandH * 0.62, 10)),
      ironMat
    );
    collar.position.set(cx, rect.y + rect.h - bandH * 1.2, z);
    group.add(collar);

    const coreMat = transient(new THREE.MeshBasicMaterial({ color: hex, fog: false }));
    const core = new THREE.Mesh(
      track(new THREE.CylinderGeometry(radius * 0.4, radius * 0.5, bodyH * 0.58, 12)),
      coreMat
    );
    core.position.set(cx, coreY, z);
    group.add(core);

    const sheen = sheenMaterial(0.32);
    addBox(
      radius * 0.2,
      bodyH * 0.52,
      0.02,
      cx - radius * 0.44,
      baseY + bodyH * 0.56,
      z + radius * 0.82,
      sheen,
      group
    );

    const haloSize = Math.max(rect.w, rect.h) * 2.6;
    const halo = new THREE.Mesh(track(new THREE.PlaneGeometry(haloSize, haloSize)), haloMaterial(hex));
    halo.position.set(cx, coreY, z + 0.14);
    halo.layers.set(look.actorLayer);
    halo.renderOrder = 3;
    group.add(halo);

    const light = addFlameLight(
      hex,
      feel.jarLightIntensity * strength,
      feel.jarLightDistance,
      cx,
      coreY,
      z + 0.6,
      LIGHT_PRIORITY_JAR
    );
    jars.push({
      core: coreMat,
      halo: halo.material as THREE.MeshBasicMaterial,
      base: new THREE.Color(hex),
      light,
      strength,
      phase: (Math.abs(cx) * 1.73 + Math.abs(rect.y) * 2.31) % (Math.PI * 2)
    });
  }

  function addLens(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const far = z <= FAR_Z;
    const cx = rect.x + rect.w * 0.5;
    const radius = Math.max(rect.w, 0.4) * 0.5;
    const discY = Math.max(rect.y + rect.h - radius, rect.y + radius * 0.6);
    const standH = Math.max(discY - radius - rect.y, 0);
    const sides = far ? 14 : 36;
    const gatherHex = decor.color === undefined ? ramp.amber : decor.color;
    const gather = (decor.intensity === undefined ? 1 : decor.intensity) * feel.lensOpacity;

    if (standH > 0.18) {
      const legs = [cx - radius * 0.62, cx + radius * 0.62];
      for (const lx of legs) {
        addBox(0.14, standH, 0.24, lx, rect.y + standH * 0.5, z, far ? farMat : ironDarkMat, group, !far);
      }
      addBox(radius * 1.7, 0.1, 0.18, cx, rect.y + standH * 0.42, z, far ? farMat : ironMat, group, !far);
      addBox(radius * 1.5, 0.16, 0.6, cx, rect.y + 0.08, z, far ? farMat : stoneDarkMat, group, !far);
    }

    if (!far) {
      addWallGlow(cx, discY, radius * 3.4, radius * 3.4, z - 0.3, ramp.amber, gather * 0.55);
      addWallGlow(cx, discY, radius * 0.95, radius * 0.95, z - 0.08, gatherHex, gather * 0.5);
    }

    const disc = new THREE.Mesh(
      track(new THREE.CircleGeometry(radius * 0.96, sides)),
      far ? farLitMat : glassMaterial(feel.lensOpacity)
    );
    disc.position.set(cx, discY, z);
    disc.renderOrder = 2;
    group.add(disc);

    const rim = new THREE.Mesh(
      track(new THREE.TorusGeometry(radius, Math.max(radius * 0.05, 0.035), 5, sides)),
      far ? farLitMat : rimMat
    );
    rim.position.set(cx, discY, z);
    group.add(rim);
    if (far) return;

    const sheen = sheenMaterial(0.4);
    addBar(
      cx - radius * 0.58,
      discY + radius * 0.06,
      cx - radius * 0.16,
      discY + radius * 0.64,
      radius * 0.11,
      0.03,
      z + 0.05,
      sheen,
      group
    );
    addBar(
      cx - radius * 0.3,
      discY - radius * 0.34,
      cx - radius * 0.1,
      discY - radius * 0.06,
      radius * 0.07,
      0.03,
      z + 0.05,
      sheen,
      group
    );

    const clampY = [discY - radius * 0.86, discY + radius * 0.86];
    for (const cy of clampY) {
      addBox(radius * 0.36, 0.12, 0.2, cx, cy, z, ironMat, group, true);
    }
    addBox(0.12, radius * 0.4, 0.2, cx - radius * 0.97, discY, z, ironDarkMat, group, true);
    addBox(0.12, radius * 0.4, 0.2, cx + radius * 0.97, discY, z, ironDarkMat, group, true);
  }

  function addSunlight(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const cx = rect.x + rect.w * 0.5;
    const cy = rect.y + rect.h * 0.5;
    const hex = decor.color === undefined ? sunHex : decor.color;
    const strength = decor.intensity === undefined ? 1 : decor.intensity;

    const geometry = track(new THREE.PlaneGeometry(rect.w, rect.h, 14, 22));
    sunFalloff(geometry);
    const shaft = new THREE.Mesh(geometry, spillMaterial(hex, feel.sunlightOpacity * strength));
    shaft.position.set(cx, cy, z);
    group.add(shaft);

    const coreGeo = track(new THREE.PlaneGeometry(rect.w * 0.3, rect.h, 6, 22));
    sunFalloff(coreGeo);
    const core = new THREE.Mesh(coreGeo, spillMaterial(hex, feel.sunlightOpacity * strength * 0.7));
    core.position.set(cx, cy, z + 0.1);
    group.add(core);

    addBox(
      rect.w * 0.82,
      0.14,
      0.06,
      cx,
      rect.y + rect.h - 0.07,
      z + 0.14,
      sheenMaterial(Math.min(strength, 1)),
      group
    );
    addPoolSpill(
      cx,
      rect.y,
      Math.max(rect.w, 0.6) * 0.95,
      hex,
      Math.min(feel.sunlightOpacity * strength * 1.5, 1)
    );
    addFlameLight(
      hex,
      feel.sunlightLightIntensity * strength,
      Math.max(rect.h, rect.w) * 1.6,
      cx,
      rect.y + rect.h * 0.84,
      z + 0.9,
      LIGHT_PRIORITY_REST
    );
  }

  function addConduit(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const far = z <= FAR_Z;
    const horizontal = rect.w >= rect.h;
    const length = Math.max(horizontal ? rect.w : rect.h, 0.5);
    const radius = Math.max(Math.min(horizontal ? rect.h : rect.w, 0.7) * 0.5, 0.08);
    const cx = rect.x + rect.w * 0.5;
    const cy = rect.y + rect.h * 0.5;
    const hex = decor.color === undefined ? ramp.amber : decor.color;
    const strength = decor.intensity === undefined ? 1 : decor.intensity;
    const sides = far ? 8 : 14;

    const glass = new THREE.Mesh(
      track(new THREE.CylinderGeometry(radius, radius, length, sides, 1, true)),
      far ? farMat : glassMaterial(Math.min(feel.lensOpacity * 1.3, 0.8))
    );
    glass.position.set(cx, cy, z);
    if (horizontal) glass.rotation.z = Math.PI * 0.5;
    glass.renderOrder = 2;
    group.add(glass);

    const collarGeo = track(
      new THREE.CylinderGeometry(radius * 1.3, radius * 1.3, radius * 0.5, sides)
    );
    const brackets = Math.max(2, Math.round(length / 2.4) + 1);
    for (let i = 0; i < brackets; i++) {
      const off = -length * 0.5 + ((i + 0.5) / brackets) * length;
      const bx = horizontal ? cx + off : cx;
      const by = horizontal ? cy : cy + off;
      const collar = new THREE.Mesh(collarGeo, far ? farLitMat : ironMat);
      collar.position.set(bx, by, z);
      if (horizontal) collar.rotation.z = Math.PI * 0.5;
      group.add(collar);
      if (far) continue;
      addBox(radius * 0.7, radius * 0.7, 0.9, bx, by, z - 0.5, ironDarkMat, group, true);
      if (horizontal) {
        addBox(radius * 3.0, radius * 0.34, 0.22, bx, by - radius * 1.5, z, ironMat, group, true);
      } else {
        addBox(radius * 0.34, radius * 3.0, 0.22, bx - radius * 1.5, by, z, ironMat, group, true);
      }
    }

    const endGeo = track(new THREE.CylinderGeometry(radius * 1.55, radius * 1.55, 0.18, sides));
    for (const off of [-length * 0.5 + 0.09, length * 0.5 - 0.09]) {
      const flange = new THREE.Mesh(endGeo, far ? farLitMat : ironMat);
      flange.position.set(horizontal ? cx + off : cx, horizontal ? cy : cy + off, z);
      if (horizontal) flange.rotation.z = Math.PI * 0.5;
      group.add(flange);
    }

    if (far) return;

    const coreMat = transient(new THREE.MeshBasicMaterial({ color: hex, fog: false }));
    const core = new THREE.Mesh(
      track(new THREE.CylinderGeometry(radius * 0.46, radius * 0.46, length - 0.22, 10)),
      coreMat
    );
    core.position.set(cx, cy, z);
    if (horizontal) core.rotation.z = Math.PI * 0.5;
    core.renderOrder = 1;
    group.add(core);

    const bandMat = transient(
      new THREE.MeshBasicMaterial({
        color: hex,
        fog: false,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    const bandGeo = track(
      new THREE.CylinderGeometry(radius * 0.8, radius * 0.8, Math.min(length * 0.2, 1.0), 12)
    );
    const bands: THREE.Object3D[] = [];
    const offsets: number[] = [];
    const count = 3;
    for (let i = 0; i < count; i++) {
      const band = new THREE.Mesh(bandGeo, bandMat);
      band.position.set(cx, cy, z);
      if (horizontal) band.rotation.z = Math.PI * 0.5;
      band.renderOrder = 3;
      group.add(band);
      bands.push(band);
      offsets.push((i / count) * length);
    }

    const lightBase = feel.conduitLightIntensity * strength;
    const light = addFlameLight(hex, lightBase, feel.conduitLightDistance, cx, cy, z + 0.5, LIGHT_PRIORITY_CONDUIT);

    conduits.push({
      bands,
      offsets,
      axis: horizontal ? "x" : "y",
      start: horizontal ? cx - length * 0.5 : cy - length * 0.5,
      length,
      core: coreMat,
      band: bandMat,
      base: new THREE.Color(hex),
      light,
      lightBase,
      phase: (Math.abs(cx) * 1.31 + Math.abs(cy) * 2.17) % (Math.PI * 2)
    });
  }

  function addShutter(decor: Decor, room: Room, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const cx = rect.x + rect.w * 0.5;
    const cy = rect.y + rect.h * 0.5;
    const radius = Math.max(Math.min(rect.w, rect.h), 0.8) * 0.5;
    const hex = decor.color === undefined ? ramp.amber : decor.color;
    const plateD = Math.max(feel.gateDepth, 0.3) * 0.4;

    const sealed = new THREE.Group();
    sealed.position.set(cx, cy, z);
    group.add(sealed);
    const open = new THREE.Group();
    open.position.set(cx, cy, z);
    open.visible = false;
    group.add(open);

    const rimGeo = track(new THREE.TorusGeometry(radius, radius * 0.08, 6, 30));
    for (const holder of [sealed, open]) {
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.position.set(0, 0, plateD * 0.5);
      holder.add(rim);
      const collar = new THREE.Mesh(
        track(new THREE.CylinderGeometry(radius * 1.08, radius * 1.14, plateD * 0.8, 30, 1, true)),
        ironDarkMat
      );
      collar.rotation.x = Math.PI * 0.5;
      holder.add(collar);
    }

    const disc = new THREE.Mesh(
      track(new THREE.CylinderGeometry(radius * 0.99, radius * 0.99, plateD, 30)),
      ironDarkMat
    );
    disc.rotation.x = Math.PI * 0.5;
    sealed.add(disc);

    const ribs = 8;
    const ribGeo = track(new THREE.BoxGeometry(radius * 0.86, radius * 0.17, plateD * 0.9));
    const stubGeo = track(new THREE.BoxGeometry(radius * 0.24, radius * 0.17, plateD * 0.9));
    const rayGeo = track(new THREE.BoxGeometry(radius * 0.3, radius * 0.08, plateD * 0.5));
    for (let i = 0; i < ribs; i++) {
      const a = (i / ribs) * Math.PI * 2;
      const rib = new THREE.Mesh(ribGeo, ironMat);
      rib.position.set(Math.cos(a) * radius * 0.52, Math.sin(a) * radius * 0.52, plateD * 0.6);
      rib.rotation.z = a;
      sealed.add(rib);
      const stub = new THREE.Mesh(stubGeo, ironMat);
      stub.position.set(Math.cos(a) * radius * 0.85, Math.sin(a) * radius * 0.85, plateD * 0.6);
      stub.rotation.z = a;
      open.add(stub);
      const ray = new THREE.Mesh(rayGeo, rimMat);
      ray.position.set(Math.cos(a) * radius * 0.42, Math.sin(a) * radius * 0.42, plateD * 0.95);
      ray.rotation.z = a;
      sealed.add(ray);
    }

    const hub = new THREE.Mesh(
      track(new THREE.CylinderGeometry(radius * 0.25, radius * 0.25, plateD * 1.3, 18)),
      ironMat
    );
    hub.rotation.x = Math.PI * 0.5;
    hub.position.set(0, 0, plateD * 0.4);
    sealed.add(hub);
    const eye = new THREE.Mesh(
      track(new THREE.CircleGeometry(radius * 0.15, 18)),
      transient(new THREE.MeshBasicMaterial({ color: shadeOf(hex, 0.45), fog: false }))
    );
    eye.position.set(0, 0, plateD * 1.06);
    sealed.add(eye);

    const rivets = 14;
    const rivetGeo = track(new THREE.BoxGeometry(radius * 0.09, radius * 0.09, radius * 0.09));
    for (let i = 0; i < rivets; i++) {
      const a = ((i + 0.5) / rivets) * Math.PI * 2;
      const rivet = new THREE.Mesh(rivetGeo, rimMat);
      rivet.position.set(Math.cos(a) * radius * 0.9, Math.sin(a) * radius * 0.9, plateD * 0.7);
      sealed.add(rivet);
    }

    const seam = new THREE.Mesh(
      track(new THREE.CircleGeometry(radius * 1.55, 30)),
      spillMaterial(hex, feel.passageSpillOpacity * 0.7)
    );
    radialFalloff(seam.geometry);
    seam.position.set(0, 0, -plateD * 1.2);
    sealed.add(seam);
    fitToClip(seam, roomClip);
    const ring = new THREE.Mesh(
      track(new THREE.TorusGeometry(radius * 0.93, radius * 0.045, 6, 30)),
      amberDimMat
    );
    ring.position.set(0, 0, plateD * 0.9);
    sealed.add(ring);

    const iris = new THREE.Mesh(
      track(new THREE.CircleGeometry(radius * 0.82, 30)),
      transient(new THREE.MeshBasicMaterial({ color: hex, fog: false }))
    );
    iris.position.set(0, 0, -plateD * 0.2);
    open.add(iris);
    const haloMat = haloMaterial(hex);
    haloMat.opacity = Math.min(feel.passageSpillOpacity * 1.4, 1);
    const halo = new THREE.Mesh(
      track(new THREE.PlaneGeometry(Math.max(rect.w, 0.3), Math.max(rect.h, 0.3))),
      haloMat
    );
    halo.position.set(0, 0, plateD * 1.4);
    halo.renderOrder = 3;
    open.add(halo);
    fitToClip(halo, roomClip);
    const pool = new THREE.Mesh(
      track(new THREE.CircleGeometry(radius * 2.2, 24)),
      spillMaterial(hex, feel.passageSpillOpacity * 0.9)
    );
    radialFalloff(pool.geometry);
    pool.rotation.x = -Math.PI * 0.5;
    pool.scale.set(1, 0.4, 1);
    pool.position.set(0, -cy + rect.y + 0.02, 0.6);
    open.add(pool);
    fitToClip(pool, roomClip);

    let gateId: string | null = null;
    for (const gate of room.gates) {
      if (!rectsTouch(gate.rect, rect, 0.9)) continue;
      gateId = gate.id;
      break;
    }
    if (gateId !== null) shutters.push({ id: gateId, sealed, open });
  }

  function addShaft(decor: Decor, feel: Feel): void {
    const hex = decor.color === undefined ? ramp.ash : decor.color;
    const strength = decor.intensity === undefined ? 1 : decor.intensity;
    const geometry = track(new THREE.PlaneGeometry(decor.rect.w, decor.rect.h, 8, 6));
    shaftFalloff(geometry);
    const mesh = new THREE.Mesh(geometry, spillMaterial(hex, feel.shaftOpacity * strength));
    mesh.position.set(decor.rect.x + decor.rect.w * 0.5, decor.rect.y + decor.rect.h * 0.5, decor.z);
    group.add(mesh);
  }

  function addBoiler(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const z = decor.z;
    const far = z <= FAR_Z;
    const cx = rect.x + rect.w * 0.5;
    const radius = Math.max(rect.h, 0.2) * 0.5;
    const cy = rect.y + radius + 0.18;
    const length = Math.max(rect.w, 0.2);
    const bodyMat = far ? farMat : stoneDarkMat;
    const bandMat = far ? farLitMat : ironMat;

    const body = new THREE.Mesh(track(new THREE.CylinderGeometry(radius, radius, length, 14)), bodyMat);
    body.rotation.z = Math.PI * 0.5;
    body.position.set(cx, cy, z);
    group.add(body);
    const bandGeo = track(new THREE.CylinderGeometry(radius * 1.06, radius * 1.06, 0.14, 14));
    const bandOffsets = [-length * 0.32, length * 0.08, length * 0.42];
    for (const off of bandOffsets) {
      const band = new THREE.Mesh(bandGeo, bandMat);
      band.rotation.z = Math.PI * 0.5;
      band.position.set(cx + off, cy, z);
      group.add(band);
    }
    const capGeo = track(new THREE.SphereGeometry(radius * 0.98, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5));
    const capL = new THREE.Mesh(capGeo, bodyMat);
    capL.rotation.z = Math.PI * 0.5;
    capL.position.set(cx - length * 0.5, cy, z);
    group.add(capL);
    const capR = new THREE.Mesh(capGeo, bodyMat);
    capR.rotation.z = -Math.PI * 0.5;
    capR.position.set(cx + length * 0.5, cy, z);
    group.add(capR);

    const feet = [cx - length * 0.3, cx + length * 0.3];
    for (const fx of feet) {
      addBox(0.4, cy - radius * 0.7 - rect.y, 0.5, fx, rect.y + (cy - radius * 0.7 - rect.y) * 0.5, z, far ? farMat : stoneDarkMat, group, !far);
    }
    if (far) return;
    const rivets = Math.max(2, Math.round(feel.boilerRivets));
    const rivetGeometry = track(new THREE.BoxGeometry(radius * 0.12, radius * 0.12, radius * 0.12));
    for (let i = 0; i < rivets; i++) {
      const a = (i / rivets) * Math.PI - Math.PI * 0.5;
      const rivet = new THREE.Mesh(rivetGeometry, ironMat);
      rivet.position.set(cx - length * 0.12, cy + Math.sin(a) * radius * 0.9, z + Math.cos(a) * radius * 0.9);
      group.add(rivet);
    }
    addBox(radius * 0.7, radius * 0.6, 0.12, cx - length * 0.12, cy - radius * 0.15, z + radius * 0.96, wallMat, group, true);
    addBox(radius * 0.8, 0.05, 0.14, cx - length * 0.12, cy + radius * 0.16, z + radius * 0.98, ironMat, group);
    const stackR = radius * 0.28;
    const stackH = Math.max(rect.h * 1.1, 1.2);
    const stack = new THREE.Mesh(track(new THREE.CylinderGeometry(stackR, stackR, stackH, 10)), ironDarkMat);
    stack.position.set(cx + length * 0.3, cy + radius + stackH * 0.5 - 0.1, z - 0.1);
    group.add(stack);
    const collar = new THREE.Mesh(track(new THREE.CylinderGeometry(stackR * 1.35, stackR * 1.35, 0.1, 10)), ironMat);
    collar.position.set(cx + length * 0.3, cy + radius + stackH - 0.1, z - 0.1);
    group.add(collar);
    const pipeLen = Math.max(length * 1.6, 1.4);
    const pipe = new THREE.Mesh(track(new THREE.CylinderGeometry(stackR, stackR, pipeLen, 10)), ironDarkMat);
    pipe.rotation.z = Math.PI * 0.5;
    pipe.position.set(cx + length * 0.3 + pipeLen * 0.5, cy + radius + stackH - 0.15 - stackR, z - 0.1);
    group.add(pipe);
    const elbow = new THREE.Mesh(track(new THREE.SphereGeometry(stackR * 1.1, 10, 8)), ironDarkMat);
    elbow.position.set(cx + length * 0.3, cy + radius + stackH - 0.15 - stackR, z - 0.1);
    group.add(elbow);
    const endFlange = new THREE.Mesh(track(new THREE.CylinderGeometry(stackR * 1.4, stackR * 1.4, 0.1, 10)), ironMat);
    endFlange.rotation.z = Math.PI * 0.5;
    endFlange.position.set(cx + length * 0.3 + pipeLen - 0.05, cy + radius + stackH - 0.15 - stackR, z - 0.1);
    group.add(endFlange);
  }

  function addGrate(decor: Decor, feel: Feel): void {
    const rect = decor.rect;
    const cx = rect.x + rect.w * 0.5;
    const top = rect.y;
    const recess = Math.max(rect.h, 0.2);
    const strength = decor.intensity === undefined ? 0 : decor.intensity;
    const depth = feel.solidDepth * 0.82;
    const z = decor.z;
    addBox(rect.w, recess, depth, cx, top - recess * 0.5 + 0.004, z, voidFogMat, group);
    const bars = Math.max(2, Math.round(feel.grateBarCount * Math.max(rect.w / 4, 0.5)));
    const barW = 0.09;
    for (let i = 0; i < bars; i++) {
      addBox(barW, 0.058, depth, rect.x + ((i + 0.5) / bars) * rect.w, top - 0.021, z, ironDarkMat, group);
    }
    addBox(rect.w + 0.12, 0.058, 0.1, cx, top - 0.021, z + depth * 0.5 - 0.05, ironMat, group);
    addBox(rect.w + 0.12, 0.058, 0.1, cx, top - 0.021, z - depth * 0.5 + 0.05, ironMat, group);
    addBox(0.1, 0.058, depth, rect.x - 0.01, top - 0.021, z, ironMat, group);
    addBox(0.1, 0.058, depth, rect.x + rect.w + 0.01, top - 0.021, z, ironMat, group);
    if (strength > 0) {
      const geometry = track(new THREE.PlaneGeometry(rect.w, depth, 6, 2));
      paintPlane(geometry, new THREE.Color(0xffffff), new THREE.Color(0xffffff), "x", 1);
      const glow = new THREE.Mesh(geometry, spillMaterial(ramp.amber, feel.grateGlowOpacity * strength));
      glow.rotation.x = -Math.PI * 0.5;
      glow.position.set(cx, top - recess + 0.03, z);
      group.add(glow);
      addFloorSpill(cx, top, depth - 0.1, rect.w * 0.5, 1, ramp.amber, feel.grateGlowOpacity * strength * 0.35);
      addFloorSpill(cx, top, depth - 0.1, rect.w * 0.5, -1, ramp.amber, feel.grateGlowOpacity * strength * 0.35);
    }
  }

  function addBell(decor: Decor): void {
    const size = Math.max(decor.rect.h, 0.5);
    const wide = Math.max(decor.rect.w, 0.5);
    const scale = wide / size;
    const far = decor.z <= FAR_Z;
    const cx = decor.rect.x + wide * 0.5;
    const shell = new THREE.Mesh(track(new THREE.LatheGeometry(bellProfile(size, 1), 24)), far ? farMat : bellMat);
    shell.position.set(cx, decor.rect.y, decor.z);
    shell.scale.set(scale, 1, scale);
    group.add(shell);
    if (far) {
      addBox(wide * 1.02, size * 0.05, 0.1, cx, decor.rect.y + size * 0.03, decor.z + wide * 0.5, farLitMat, group);
      const crown = new THREE.Mesh(track(new THREE.BoxGeometry(size * 0.22, size * 0.16, size * 0.22)), farMat);
      crown.position.set(cx, decor.rect.y + size * 1.1, decor.z);
      group.add(crown);
      return;
    }
    const inner = new THREE.Mesh(track(new THREE.LatheGeometry(bellProfile(size * 0.97, 0.92), 16)), bellInnerMat);
    inner.position.set(cx, decor.rect.y + size * 0.02, decor.z);
    inner.scale.set(scale, 1, scale);
    group.add(inner);
    const clapper = new THREE.Mesh(track(new THREE.SphereGeometry(size * 0.08, 8, 6)), ironMat);
    clapper.position.set(cx, decor.rect.y + size * 0.22, decor.z);
    group.add(clapper);
    const lip = new THREE.Mesh(track(new THREE.TorusGeometry(size * 0.5, size * 0.032, 4, 26)), rimMat);
    lip.rotation.x = Math.PI * 0.5;
    lip.position.set(cx, decor.rect.y + size * 0.03, decor.z);
    lip.scale.set(scale, scale, 1);
    group.add(lip);
  }

  function addGlow(decor: Decor, feel: Feel): void {
    const hex = decor.color === undefined ? ramp.amber : decor.color;
    const strength = decor.intensity === undefined ? 1 : decor.intensity;
    const size = Math.max(decor.rect.w, decor.rect.h, feel.decorGlowSize);
    const cx = decor.rect.x + decor.rect.w * 0.5;
    const cy = decor.rect.y + decor.rect.h * 0.5;
    addWallGlow(cx, cy, size * 1.5, size * 1.5, decor.z, hex, feel.decorGlowOpacity * strength);
    if (decor.z > FAR_Z) addFlameLight(hex, feel.decorGlowIntensity * strength, size * 6, cx, cy, decor.z + 0.5, LIGHT_PRIORITY_REST);
  }

  function buildEmbers(rects: Decor[], density: number, feel: Feel): void {
    let total = 0;
    for (const decor of rects) {
      const area = Math.max(decor.rect.w * decor.rect.h, 0);
      total += Math.round(area * feel.emberPerArea * density);
    }
    const base = Math.min(Math.max(total, 0), Math.max(1, Math.round(feel.emberMax)));
    if (base <= 0) return;
    const headroom = Math.max(feel.dawnEmberBoost, 1);
    const count = Math.max(base, Math.round(base * headroom));

    const geometry = track(new THREE.BufferGeometry());
    const attribute = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
    attribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", attribute);

    const seed = new Float32Array(count);
    const originX = new Float32Array(count);
    const minY = new Float32Array(count);
    const spanY = new Float32Array(count);
    const array = attribute.array as Float32Array;

    let index = 0;
    for (const decor of rects) {
      const area = Math.max(decor.rect.w * decor.rect.h, 0);
      let share = Math.round(area * feel.emberPerArea * density);
      if (total > 0) share = Math.round((share * count) / total);
      for (let i = 0; i < share && index < count; i++) {
        const x = decor.rect.x + Math.random() * decor.rect.w;
        const y = decor.rect.y + Math.random() * decor.rect.h;
        originX[index] = x;
        minY[index] = decor.rect.y;
        spanY[index] = Math.max(decor.rect.h, 0.5);
        seed[index] = Math.random() * Math.PI * 2;
        array[index * 3] = x;
        array[index * 3 + 1] = y;
        array[index * 3 + 2] = decor.z;
        index++;
      }
    }
    for (; index < count; index++) {
      const first = rects[0];
      const rect = first === undefined ? { x: 0, y: 0, w: 1, h: 1 } : first.rect;
      const x = rect.x + Math.random() * rect.w;
      originX[index] = x;
      minY[index] = rect.y;
      spanY[index] = Math.max(rect.h, 0.5);
      seed[index] = Math.random() * Math.PI * 2;
      array[index * 3] = x;
      array[index * 3 + 1] = rect.y + Math.random() * rect.h;
      array[index * 3 + 2] = first === undefined ? -1 : first.z;
    }

    attribute.needsUpdate = true;
    geometry.setDrawRange(0, base);
    const points = new THREE.Points(geometry, emberMat);
    points.frustumCulled = false;
    points.layers.set(look.actorLayer);
    group.add(points);
    embers = { points, attribute, seed, originX, minY, spanY, count, base, drawn: base };
  }

  function addFallbackPlatform(rect: Rect, feel: Feel): void {
    addPlate(rect, 0, group, feel);
  }

  function addDecor(decor: Decor, solids: Rect[], room: Room, feel: Feel): void {
    const far = decor.z <= FAR_Z;
    switch (decor.kind) {
      case "block": {
        const material = far ? farMat : midDarkMat;
        addRect(decor.rect, feel.solidDepth * (far ? 0.8 : 1.4), decor.z, material, group);
        return;
      }
      case "pillar":
        addPier(decor.rect, feel.solidDepth * 1.1, decor.z, far ? farMat : midMat, group);
        return;
      case "chain": {
        const scale = Math.max(decor.rect.w / 0.3, 0.6) * (far ? 0.5 : 1);
        addChainRun(
          decor.rect.x + decor.rect.w * 0.5,
          decor.rect.y + decor.rect.h,
          decor.rect.h,
          decor.z,
          far ? farMat : ironMat,
          Math.max(feel.chainRadius, 0.02) * scale,
          Math.max(feel.chainSegmentHeight, 0.05) * scale
        );
        return;
      }
      case "cylinder": {
        const radius = Math.max(decor.rect.w, 0.2) * 0.5;
        const mesh = new THREE.Mesh(
          track(new THREE.CylinderGeometry(radius, radius, Math.max(decor.rect.h, 0.2), 14, 1, true)),
          far ? farMat : midMat
        );
        mesh.position.set(decor.rect.x + radius, decor.rect.y + decor.rect.h * 0.5, decor.z);
        group.add(mesh);
        return;
      }
      case "bell":
        addBell(decor);
        return;
      case "glow":
        addGlow(decor, feel);
        return;
      case "furnace":
        addFurnace(decor, feel);
        return;
      case "shaft":
        addShaft(decor, feel);
        return;
      case "jar":
        addJar(decor, feel);
        return;
      case "lens":
        addLens(decor, feel);
        return;
      case "sunlight":
        addSunlight(decor, feel);
        return;
      case "conduit":
        addConduit(decor, feel);
        return;
      case "shutter":
        addShutter(decor, room, feel);
        return;
      case "boiler":
        addBoiler(decor, feel);
        return;
      case "grate":
        addGrate(decor, feel);
        return;
      case "embers":
        return;
      case "stair":
        addStair(decor, solids, room, feel);
        return;
      case "gallery":
        addGallery(decor, solids, room, feel);
        return;
      case "beam":
        addBeam(decor, solids, room, feel);
        return;
      case "bench":
        addBench(decor, solids, room, feel);
        return;
      case "crate":
        addCrate(decor, solids, feel);
        return;
      case "wall":
        addWall(decor, solids, feel);
        return;
      case "veil":
        addVeil(decor, feel);
        return;
      case "rubble":
        addRubble(decor, feel);
        return;
      case "lamp":
        addLamp(decor, feel);
        return;
      case "pipe":
        addPipe(decor, feel);
        return;
      case "rack":
        addRack(decor, feel);
        return;
      case "winch":
        addWinch(decor, feel);
        return;
      case "yoke":
        addYoke(decor, feel);
        return;
      case "arch":
        addArch(decor, feel);
        return;
      case "rim":
        addRect(decor.rect, feel.rimHeight * 2, decor.z, rimMat, group, true);
        return;
      default:
        return;
    }
  }

  function classifyOpening(door: Door, room: Room, walls: Rect[], slabs: Rect[]): Opening | null {
    const b = room.bounds;
    const warm = WARM_TARGETS[door.to] === true;
    const tone: PassageTone = warm ? "warm" : PALE_TARGETS[door.to] === true ? "pale" : "ash";
    let best: Opening | null = null;
    let bestScore = -Infinity;
    for (const wall of walls) {
      if (!rectsTouch(door.rect, wall, 0.05)) continue;
      const rightWall = wall.x >= b.x + b.w - 0.01;
      const leftWall = wall.x + wall.w <= b.x + 0.01;
      const floor = wall.y + wall.h <= b.y + 0.01;
      const ceiling = wall.y >= b.y + b.h - 0.01;
      if (rightWall || leftWall) {
        const overlap =
          Math.min(door.rect.x + door.rect.w, wall.x + wall.w) - Math.max(door.rect.x, wall.x);
        const score = overlap + 0.06;
        if (score <= bestScore) continue;
        bestScore = score;
        best = {
          door,
          rect: { x: wall.x, y: door.rect.y, w: wall.w, h: door.rect.h },
          side: rightWall ? "right" : "left",
          warm,
          tone
        };
        continue;
      }
      if (floor || ceiling) {
        const overlap =
          Math.min(door.rect.y + door.rect.h, wall.y + wall.h) - Math.max(door.rect.y, wall.y);
        if (overlap <= bestScore) continue;
        bestScore = overlap;
        best = {
          door,
          rect: { x: door.rect.x, y: wall.y, w: door.rect.w, h: wall.h },
          side: floor ? "floor" : "ceiling",
          warm,
          tone
        };
      }
    }
    if (best !== null) return best;
    for (const slab of slabs) {
      if (!rectsTouch(door.rect, slab, 0.05)) continue;
      if (door.rect.x < slab.x - 0.05 || door.rect.x + door.rect.w > slab.x + slab.w + 0.05) continue;
      const above = door.rect.y + door.rect.h * 0.5 < slab.y;
      return {
        door,
        rect: { x: door.rect.x, y: slab.y, w: door.rect.w, h: slab.h },
        side: above ? "ceiling" : "floor",
        warm,
        tone
      };
    }
    return null;
  }

  function toneHex(tone: PassageTone): number {
    if (tone === "warm") return ramp.amber;
    if (tone === "pale") return PALE_SPILL;
    return ramp.ash;
  }

  function addSidePassage(opening: Opening, feel: Feel, arched: boolean): void {
    const rect = opening.rect;
    const right = opening.side === "right";
    const depth = feel.solidDepth;
    const innerX = right ? rect.x : rect.x + rect.w;
    const outerX = right ? rect.x + rect.w : rect.x;
    const dir = right ? 1 : -1;
    const cx = rect.x + rect.w * 0.5;
    const cy = rect.y + rect.h * 0.5;
    const tone = opening.tone;
    const hex = toneHex(tone);
    const glowHex = tone === "warm" ? ramp.amber : shadeOf(hex, 1.15);
    const interior = Math.max(feel.passageInteriorDepth, 0.2);
    const lift = Math.max(feel.passageFrameLift, 0);
    const backZ = -depth * 0.5 - interior;
    const revealLen = depth + interior;
    const revealZ = -interior * 0.5;

    const nearC =
      tone === "pale" ? new THREE.Color(roomFogHex).multiplyScalar(0.34) : new THREE.Color(ramp.void);
    const farC =
      tone === "pale"
        ? new THREE.Color(roomFogHex).lerp(new THREE.Color(PALE_SPILL), 0.55)
        : new THREE.Color(hex).multiplyScalar(tone === "warm" ? 0.7 : 0.42);

    const sealed = sealedOpenings.has(opening);
    const back = track(new THREE.PlaneGeometry(rect.w + 0.06, rect.h, 8, 2));
    paintPlane(back, nearC, farC, "x", 1.4);
    if (!right) back.scale(-1, 1, 1);
    const backMat = sealed
      ? transient(new THREE.MeshBasicMaterial({ vertexColors: true, fog: false }))
      : gradientMat;
    const backMesh = new THREE.Mesh(back, backMat);
    backMesh.position.set(cx, cy, backZ);
    group.add(backMesh);
    if (sealed) registerDoorPanel(backMat);

    const floor = track(new THREE.PlaneGeometry(rect.w, revealLen, 8, 2));
    paintPlane(floor, new THREE.Color(ramp.charcoal).multiplyScalar(0.7), farC.clone().multiplyScalar(0.8), "x", 1.3);
    if (!right) floor.scale(-1, 1, 1);
    const floorMesh = new THREE.Mesh(floor, gradientMat);
    floorMesh.rotation.x = -Math.PI * 0.5;
    floorMesh.position.set(cx, rect.y + 0.02, revealZ);
    group.add(floorMesh);

    const ceiling = track(new THREE.PlaneGeometry(rect.w, revealLen, 8, 2));
    paintPlane(ceiling, new THREE.Color(ramp.void), nearC.clone().lerp(farC, 0.35), "x", 1.5);
    if (!right) ceiling.scale(-1, 1, 1);
    const ceilingMesh = new THREE.Mesh(ceiling, gradientMat);
    ceilingMesh.rotation.x = Math.PI * 0.5;
    ceilingMesh.position.set(cx, rect.y + rect.h - 0.02, revealZ);
    group.add(ceilingMesh);

    const veil = veilByOpening.get(opening);
    const frameStone = veil === undefined ? stoneMat : veil.stone;
    const frameDark = veil === undefined ? stoneDarkMat : veil.stoneDark;
    const frameLit = veil === undefined ? stoneLitMat : veil.stoneLit;
    if (veil !== undefined) outlineOverride = veil.outline;

    const frameD = depth + 0.16 + lift * 2;
    const frameZ = lift;
    const jambW = 0.42;

    addBox(rect.w + 0.7, 0.16, frameD + 0.12, cx - dir * 0.14, rect.y + 0.08, frameZ, frameStone, group, true);
    const sill = addBox(rect.w + 0.86, 0.08, frameD + 0.2, cx - dir * 0.18, rect.y + 0.19, frameZ, frameLit, group, true);
    sill.renderOrder = 1;
    addBox(rect.w + 0.5, 0.06, frameD + 0.26, cx - dir * 0.1, rect.y + 0.245, frameZ, frameDark, group);

    addBox(jambW, rect.h + 0.05, frameD, innerX + dir * jambW * 0.5, cy, frameZ, frameStone, group, true);
    addBox(jambW * 0.7, rect.h + 0.05, frameD - 0.06, outerX - dir * jambW * 0.35, cy, frameZ, frameDark, group, true);
    addBox(0.16, rect.h + 0.05, frameD + 0.16, innerX + dir * 0.08, cy, frameZ, frameLit, group, true);
    for (const jx of [innerX + dir * jambW * 0.5, outerX - dir * jambW * 0.35]) {
      addBox(jambW * 1.28, 0.3, frameD + 0.14, jx, rect.y + 0.42, frameZ, frameDark, group, true);
      addBox(jambW * 1.28, 0.26, frameD + 0.14, jx, rect.y + rect.h - 0.15, frameZ, frameDark, group, true);
    }

    if (arched) {
      const radius = rect.w * 0.5;
      addArchStones(cx, rect.y + rect.h - 0.02, radius, 0.5, frameD, frameZ, frameStone, group);
      addBox(rect.w + 1.2, 0.36, frameD, cx, rect.y + rect.h + radius + 0.62, frameZ, frameDark, group, true);
    } else {
      addBox(rect.w + jambW * 1.6, 0.62, frameD, cx, rect.y + rect.h + 0.31, frameZ, frameStone, group, true);
      addBox(0.7, 0.86, frameD + 0.1, cx, rect.y + rect.h + 0.4, frameZ, frameLit, group, true);
      addBox(0.42, 0.24, frameD + 0.18, cx, rect.y + rect.h + 0.1, frameZ, frameDark, group, true);
      addBox(rect.w + jambW * 2.2, 0.22, frameD - 0.06, cx, rect.y + rect.h + 0.83, frameZ, frameDark, group, true);
    }
    outlineOverride = null;

    const recessClip: Rect = { x: rect.x, y: rect.y, w: rect.w, h: rect.h };
    const spill = addFloorSpill(innerX, rect.y, Math.min(rect.w * 2.1, depth - 0.1), feel.passageSpillLength, -dir, glowHex, feel.passageSpillOpacity * (tone === "ash" ? 0.6 : 0.9), roomClip);
    const wallGlow = addWallGlow(cx - dir * 0.2, cy, rect.w * 1.6, rect.h * 1.15, backZ + 0.3, glowHex, feel.passageSpillOpacity * (tone === "warm" ? 0.9 : tone === "pale" ? 1.5 : 0.9), recessClip);
    addWallGlow(innerX - dir * 0.3, rect.y + rect.h * 0.62, rect.w * 1.1, rect.h * 0.9, depth * 0.5 + lift * 2 + 0.06, glowHex, feel.passageSpillOpacity * 0.32, roomClip);
    addJambLamp(opening, feel);
    let passageLight: THREE.PointLight | null = null;
    if (feel.passageLightIntensity > 0 && tone !== "ash") {
      passageLight = addFlameLight(
        hex,
        feel.passageLightIntensity * (tone === "warm" ? 1 : 0.55),
        feel.passageLightDistance,
        innerX - dir * 0.2,
        cy,
        0.4,
        LIGHT_PRIORITY_KEY
      );
    }
    if (veil !== undefined) {
      const spillMat = spill.material as THREE.MeshBasicMaterial;
      const glowMat = wallGlow.material as THREE.MeshBasicMaterial;
      veil.show.push({ material: spillMat, base: spillMat.opacity });
      veil.show.push({ material: glowMat, base: glowMat.opacity });
      spillMat.opacity = 0;
      spillMat.visible = false;
      glowMat.opacity = 0;
      glowMat.visible = false;
      if (passageLight !== null) {
        veil.lights.push({ light: passageLight, intensity: passageLight.intensity });
        passageLight.intensity = 0;
      }
    }
    if (sealed) {
      registerDoorGlow(spill, roomClip, true);
      registerDoorLight(passageLight);
    }
  }

  function addJambLamp(opening: Opening, feel: Feel): void {
    const rect = opening.rect;
    const right = opening.side === "right";
    const dir = right ? 1 : -1;
    const innerX = right ? rect.x : rect.x + rect.w;
    const depth = feel.solidDepth;
    const warm = opening.tone !== "pale";
    const hex = warm ? ramp.amber : PALE_SPILL;
    const postX = innerX - dir * 0.52;
    const headY = rect.y + Math.min(rect.h * 0.78, rect.h - 0.4);
    const front = depth * 0.5 + 0.12;

    addBox(0.1, 0.34, 0.12, postX, headY + 0.28, front, ironDarkMat, group, true);
    addBox(0.26, 0.09, 0.26, postX, headY + 0.1, front, ironDarkMat, group, true);
    const glassMat = transient(new THREE.MeshBasicMaterial({ color: hex, fog: false }));
    addBox(0.2, 0.26, 0.2, postX, headY - 0.06, front, glassMat, group).layers.set(ACTOR_LAYER);
    addBox(0.26, 0.07, 0.26, postX, headY - 0.22, front, ironDarkMat, group, true);
    addOrb(postX, headY - 0.06, front + 0.1, JAMB_ORB_RADIUS, hex, feel.lampHaloOpacity);

    const beadMat = transient(
      new THREE.MeshBasicMaterial({
        color: ramp.porcelain,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false
      })
    );
    const bead = addBox(0.07, rect.h - 0.12, 0.07, innerX - dir * 0.035, rect.y + rect.h * 0.5, front - 0.02, beadMat, group);
    bead.renderOrder = 2;
    addPoolSpill(postX, rect.y, 1.9, hex, feel.passageSpillOpacity * 0.55, roomClip);
    flames.push({
      material: glassMat,
      base: new THREE.Color(hex),
      light: null,
      lightBase: 0,
      phase: postX * 1.7,
      amount: 0.1,
      furnace: false
    });
  }

  function addVerticalPassage(opening: Opening, room: Room, feel: Feel): void {
    const rect = opening.rect;
    const up = opening.side === "ceiling";
    const depth = feel.solidDepth;
    const cx = rect.x + rect.w * 0.5;
    const cy = rect.y + rect.h * 0.5;
    const hex = toneHex(opening.tone);
    const glowHex = opening.tone === "warm" ? ramp.amber : shadeOf(hex, 1.15);
    const back = track(new THREE.PlaneGeometry(rect.w, rect.h, 2, 8));
    paintPlane(back, new THREE.Color(ramp.void), new THREE.Color(hex).multiplyScalar(0.8), "y", 1.3);
    if (!up) back.scale(1, -1, 1);
    const backMesh = new THREE.Mesh(back, gradientMat);
    backMesh.position.set(cx, cy, -depth * 0.5 + 0.03);
    group.add(backMesh);
    const jambW = 0.4;
    addBox(jambW, rect.h + 0.1, depth + 0.16, rect.x - jambW * 0.5, cy, 0, stoneMat, group, true);
    addBox(jambW, rect.h + 0.1, depth + 0.16, rect.x + rect.w + jambW * 0.5, cy, 0, stoneMat, group, true);
    const edgeY = up ? rect.y : rect.y + rect.h;
    addBox(rect.w + jambW * 2.4, 0.24, depth + 0.2, cx, edgeY + (up ? -0.12 : 0.12), 0, stoneLitMat, group, true);
    const ladderTop = up ? rect.y + rect.h : rect.y + rect.h;
    const ladderBottom = up ? findFloorY(room, cx, rect.y) : rect.y;
    const ladderH = Math.max(ladderTop - ladderBottom, 0.5);
    const ladderZ = -depth * 0.5 + 0.2;
    const rungs = Math.max(2, Math.round(ladderH / 0.42));
    for (let i = 0; i < rungs; i++) {
      addBox(rect.w * 0.58, 0.06, 0.06, cx, ladderBottom + ((i + 0.5) / rungs) * ladderH, ladderZ, ironMat, group);
    }
    addBox(0.07, ladderH, 0.07, cx - rect.w * 0.3, ladderBottom + ladderH * 0.5, ladderZ, ironDarkMat, group);
    addBox(0.07, ladderH, 0.07, cx + rect.w * 0.3, ladderBottom + ladderH * 0.5, ladderZ, ironDarkMat, group);
    if (up) {
      const shaftH = Math.max(rect.y - ladderBottom, 0.4);
      const shaft = track(new THREE.PlaneGeometry(rect.w * 1.5, shaftH, 4, 8));
      paintPlane(shaft, new THREE.Color(0x000000), new THREE.Color(0xffffff), "y", 1.4);
      const shaftMesh = new THREE.Mesh(shaft, spillMaterial(glowHex, feel.passageSpillOpacity * 0.55));
      shaftMesh.position.set(cx, ladderBottom + shaftH * 0.5, -depth * 0.5 + 0.5);
      group.add(shaftMesh);
      fitToClip(shaftMesh, roomClip);
      addPoolSpill(cx, ladderBottom, rect.w * 1.6, glowHex, feel.passageSpillOpacity * 0.9, roomClip);
      addWallGlow(cx, rect.y + 0.2, rect.w * 2.2, 1.6, -depth * 0.5 + 0.4, glowHex, feel.passageSpillOpacity * 0.7, roomClip);
    } else {
      addWallGlow(cx, rect.y + rect.h - 0.3, rect.w * 2.0, 1.4, -depth * 0.5 + 0.4, glowHex, feel.passageSpillOpacity * 0.5, roomClip);
    }
  }

  function addFreePortal(door: Door, feel: Feel): void {
    const rect = door.rect;
    const cx = rect.x + rect.w * 0.5;
    const cy = rect.y + rect.h * 0.5;
    const depth = feel.solidDepth;
    addBox(rect.w, rect.h, 0.2, cx, cy, -depth * 0.5 + 0.1, voidMat, group);
    addBox(0.4, rect.h, depth, rect.x - 0.2, cy, 0, stoneMat, group, true);
    addBox(0.4, rect.h, depth, rect.x + rect.w + 0.2, cy, 0, stoneMat, group, true);
    addBox(rect.w + 0.8, 0.5, depth, cx, rect.y + rect.h + 0.25, 0, stoneMat, group, true);
    addFloorSpill(cx, rect.y, rect.w * 1.6, feel.passageSpillLength * 0.6, 1, ramp.ash, feel.passageSpillOpacity * 0.6, roomClip);
  }

  function addBoundaryWall(wall: Rect, openings: Opening[], room: Room, feel: Feel): void {
    const b = room.bounds;
    const rightWall = wall.x >= b.x + b.w - 0.01;
    const leftWall = wall.x + wall.w <= b.x + 0.01;
    const floor = wall.y + wall.h <= b.y + 0.01;
    const ceiling = wall.y >= b.y + b.h - 0.01;
    const depth = feel.solidDepth;
    const extend = 6;

    const deck = floor && wall.h <= 0.8;
    const drawn: Rect = { x: wall.x, y: wall.y, w: wall.w, h: wall.h };
    if (rightWall) drawn.w += extend;
    if (leftWall) {
      drawn.x -= extend;
      drawn.w += extend;
    }
    if (floor && !deck) {
      drawn.y -= extend;
      drawn.h += extend;
    }
    if (ceiling) drawn.h += extend;

    const cuts = openings.filter((o) => rectsTouch(o.rect, wall, 0.05));
    const pieces: Rect[] = [];
    if (rightWall || leftWall) {
      let cursor = drawn.y;
      const sorted = cuts.slice().sort((p, q) => p.rect.y - q.rect.y);
      for (const cut of sorted) {
        const gapTop = cut.rect.y + cut.rect.h;
        const archRise = cut.door.to === "belfry" || cut.door.to === "landing" ? cut.rect.w * 0.5 : 0;
        if (cut.rect.y > cursor) pieces.push({ x: drawn.x, y: cursor, w: drawn.w, h: cut.rect.y - cursor });
        cursor = gapTop + archRise;
      }
      if (drawn.y + drawn.h > cursor) pieces.push({ x: drawn.x, y: cursor, w: drawn.w, h: drawn.y + drawn.h - cursor });
    } else {
      let cursor = drawn.x;
      const sorted = cuts.slice().sort((p, q) => p.rect.x - q.rect.x);
      for (const cut of sorted) {
        if (cut.rect.x > cursor) pieces.push({ x: cursor, y: drawn.y, w: cut.rect.x - cursor, h: drawn.h });
        cursor = cut.rect.x + cut.rect.w;
      }
      if (drawn.x + drawn.w > cursor) pieces.push({ x: cursor, y: drawn.y, w: drawn.x + drawn.w - cursor, h: drawn.h });
    }

    for (const piece of pieces) {
      addRect(piece, depth, 0, wallMat, group, true);
      if (rightWall || leftWall) {
        const visible: Rect = {
          x: rightWall ? wall.x : wall.x,
          y: Math.max(piece.y, b.y - 1),
          w: wall.w,
          h: Math.min(piece.y + piece.h, b.y + b.h + 1) - Math.max(piece.y, b.y - 1)
        };
        if (visible.h > 0.4) addCourses(visible, depth, 0, group, feel, piece.y + wall.x);
      }
    }

    if (floor) {
      for (const piece of pieces) {
        const cap: Rect = { x: piece.x, y: wall.y, w: piece.w, h: wall.h };
        addTop(cap, depth, 0, group, stoneMat);
        addRim(cap, depth, 0, group, feel);
      }
      const front = depth * 0.5 + 0.006;
      if (deck) {
        const joists = Math.max(2, Math.round(wall.w / 2.4));
        for (let i = 0; i <= joists; i++) {
          const jx = wall.x + (i / joists) * wall.w;
          if (jx < b.x - 0.4 || jx > b.x + b.w + 0.4) continue;
          if (cuts.some((cut) => jx > cut.rect.x - 0.3 && jx < cut.rect.x + cut.rect.w + 0.3)) continue;
          addBox(0.3, 0.5, depth * 1.04, jx, wall.y - 0.25, 0, ironDarkMat, group, true);
        }
        addBox(wall.w, 0.16, depth * 1.02, wall.x + wall.w * 0.5, wall.y - 0.08, 0, ironMat, group, true);
      } else {
        const slabs = Math.max(2, Math.round(wall.w / 2.6));
        const random = seededRandom(wall.x + wall.w);
        addBox(wall.w, 0.032, 0.012, wall.x + wall.w * 0.5, wall.y + wall.h - 0.7, front, voidMat, group);
        for (let i = 1; i < slabs; i++) {
          const jx = wall.x + (i / slabs) * wall.w + (random() - 0.5) * 0.6;
          addBox(0.03, 0.6, 0.012, jx, wall.y + wall.h - 0.35 - feel.rimHeight, front, voidMat, group);
        }
      }
      for (const cut of cuts) {
        if (cut.side !== "floor") continue;
        addVerticalPassage(cut, room, feel);
      }
    }

    if (ceiling) {
      const beams = Math.max(2, Math.round(wall.w / 3.2));
      for (let i = 0; i <= beams; i++) {
        const bx = wall.x + (i / beams) * wall.w;
        if (bx < b.x - 0.5 || bx > b.x + b.w + 0.5) continue;
        addBox(0.55, 0.7, depth * 1.1, bx, wall.y - 0.35, 0, stoneDarkMat, group, true);
      }
      addBox(wall.w, 0.3, depth * 1.06, wall.x + wall.w * 0.5, wall.y - 0.15, 0, wallMat, group, true);
      for (const cut of cuts) {
        if (cut.side !== "ceiling") continue;
        addVerticalPassage(cut, room, feel);
      }
    }

    if (rightWall || leftWall) {
      const innerX = rightWall ? wall.x : wall.x + wall.w;
      const dir = rightWall ? 1 : -1;
      const pilasterW = 0.5;
      const spans: Rect[] = [];
      let cursor = b.y;
      const sorted = cuts.slice().sort((p, q) => p.rect.y - q.rect.y);
      for (const cut of sorted) {
        const archRise = cut.door.to === "belfry" || cut.door.to === "landing" ? cut.rect.w * 0.5 + 0.9 : 0.9;
        if (cut.rect.y - 0.02 > cursor) spans.push({ x: innerX, y: cursor, w: pilasterW, h: cut.rect.y - cursor });
        cursor = cut.rect.y + cut.rect.h + archRise;
      }
      if (b.y + b.h > cursor) spans.push({ x: innerX, y: cursor, w: pilasterW, h: b.y + b.h - cursor });
      for (const span of spans) {
        if (span.h < 0.3) continue;
        const cx = innerX + dir * (pilasterW * 0.5 - feel.wallLift);
        addBox(pilasterW, span.h, depth + 0.24, cx, span.y + span.h * 0.5, 0, stoneDarkMat, group, true);
      }
      for (const cut of cuts) {
        if (cut.side !== "left" && cut.side !== "right") continue;
        const arched = cut.door.to === "belfry" || cut.door.to === "landing";
        addSidePassage(cut, feel, arched);
      }
    }
  }

  function addGate(rect: Rect, feel: Feel, warm: boolean): THREE.Group {
    const holder = new THREE.Group();
    holder.position.set(rect.x + rect.w * 0.5, rect.y + rect.h * 0.5, 0);
    group.add(holder);
    const depth = Math.max(feel.gateDepth, 0.3);
    const plateDarkMat = warm
      ? registerDoorPlate(transient(look.litMaterial("chain", { shade: 0.62 })), 0.4)
      : ironDarkMat;
    const plateMat = warm ? registerDoorPlate(transient(look.litMaterial("chain")), 1) : ironMat;
    if (warm) {
      const glowGeometry = track(new THREE.CircleGeometry(1, 24));
      radialFalloff(glowGeometry);
      const glow = new THREE.Mesh(glowGeometry, spillMaterial(ramp.amber, feel.passageSpillOpacity * 1.1));
      glow.scale.set(rect.w * 1.4, rect.h * 0.62, 1);
      glow.position.set(0, -rect.h * 0.08, -depth * 0.5 - 0.12);
      holder.add(glow);
      fitToClip(glow, roomClip);
      const inward = roomClip === null || rect.x + rect.w * 0.5 > roomClip.x + roomClip.w * 0.5 ? -1 : 1;
      const floorGlow = new THREE.Mesh(glowGeometry, spillMaterial(ramp.amber, feel.passageSpillOpacity * 0.7));
      floorGlow.rotation.x = -Math.PI * 0.5;
      floorGlow.scale.set(rect.w * 2.6, feel.solidDepth * 0.42, 1);
      floorGlow.position.set(inward * rect.w * 1.6, -rect.h * 0.5 + 0.012, 0);
      holder.add(floorGlow);
      fitToClip(floorGlow, roomClip);
      registerDoorGlow(floorGlow, roomClip, true);
    }
    const frameW = Math.max(rect.w, 0.3);
    const frameT = 0.14;
    addBox(frameW, frameT, depth, 0, rect.h * 0.5 - frameT * 0.5, 0, plateDarkMat, holder, true);
    addBox(frameW, frameT, depth, 0, -rect.h * 0.5 + frameT * 0.5, 0, plateDarkMat, holder, true);
    addBox(frameT, rect.h, depth, -frameW * 0.5 + frameT * 0.5, 0, 0, plateDarkMat, holder, true);
    addBox(frameT, rect.h, depth, frameW * 0.5 - frameT * 0.5, 0, 0, plateDarkMat, holder, true);
    const bars = Math.max(3, Math.round(depth / 0.28));
    for (let i = 0; i < bars; i++) {
      const bz = -depth * 0.5 + ((i + 0.5) / bars) * depth;
      addBox(frameW * 0.86, 0.09, 0.09, 0, 0, bz, plateMat, holder, true);
      addBox(0.09, rect.h - frameT * 2, 0.09, 0, 0, bz, plateMat, holder, true);
    }
    addBox(frameW * 0.92, 0.12, depth * 1.04, 0, rect.h * 0.22, 0, plateDarkMat, holder, true);
    addBox(frameW * 0.92, 0.12, depth * 1.04, 0, -rect.h * 0.22, 0, plateDarkMat, holder, true);
    const plate = addBox(frameW * 0.9, 0.5, 0.16, 0, -rect.h * 0.02, depth * 0.5 + 0.06, plateMat, holder, true);
    plate.renderOrder = 1;
    addBox(0.08, 0.14, 0.06, 0, -rect.h * 0.02 - 0.02, depth * 0.5 + 0.16, voidMat, holder);
    addBox(0.14, 0.06, 0.06, 0, -rect.h * 0.02 + 0.06, depth * 0.5 + 0.16, voidMat, holder);
    addRivets(0, -rect.h * 0.02, frameW * 0.86, 0.46, depth * 0.5 + 0.16, holder, plateDarkMat);
    return holder;
  }

  function addBrickedArch(rect: Rect, feel: Feel): THREE.Group {
    const holder = new THREE.Group();
    holder.position.set(rect.x + rect.w * 0.5, rect.y + rect.h * 0.5, 0);
    group.add(holder);
    const depth = Math.max(feel.breakableDepth, 0.3);
    addBox(rect.w, rect.h, depth, 0, 0, 0, stoneDarkMat, holder, true);
    const rows = Math.max(3, Math.round(rect.h / 0.34));
    const brickH = rect.h / rows;
    const front = depth * 0.5 + 0.006;
    for (let r = 0; r < rows; r++) {
      const y = -rect.h * 0.5 + (r + 1) * brickH;
      if (r < rows - 1) addBox(rect.w, 0.03, 0.012, 0, y, front, voidMat, holder);
      const cols = Math.max(1, Math.round(rect.w / 0.42));
      for (let c = 0; c < cols; c++) {
        const jx = -rect.w * 0.5 + ((c + (r % 2 === 0 ? 0.5 : 1)) / cols) * rect.w;
        if (Math.abs(jx) < rect.w * 0.5 - 0.02) {
          addBox(0.03, brickH - 0.06, 0.012, jx, y - brickH * 0.5, front, voidMat, holder);
        }
      }
    }
    addBox(rect.w + 0.5, 0.36, depth + 0.24, 0, rect.h * 0.5 + 0.18, 0, stoneMat, holder, true);
    addBox(0.3, rect.h + 0.4, depth + 0.2, -rect.w * 0.5 - 0.15, 0.1, 0, stoneMat, holder, true);
    addBox(0.3, rect.h + 0.4, depth + 0.2, rect.w * 0.5 + 0.15, 0.1, 0, stoneMat, holder, true);
    return holder;
  }

  const emberList: Decor[] = [];

  return {
    group,

    build(room: Room, progress: Progress): void {
      clear();
      const feel = tuning.feel;
      const b = room.bounds;

      const fogColor = room.ambience === undefined ? undefined : room.ambience.fogColor;
      const pale = paleKey(ramp, fogColor);
      roomFogHex = fogColor === undefined ? ramp.void : fogColor;
      roomClip = { x: b.x, y: b.y, w: b.w, h: b.h };
      keyLiftColor.setHex(roomFogHex);
      const lift = Math.max(feel.paleKeyLift, 0);
      for (const entry of keyLiftTargets) {
        entry.material.color.copy(entry.base).lerp(keyLiftColor, pale * lift);
        entry.material.emissive.setHex(0x000000);
        entry.material.emissiveIntensity = 0;
      }

      const hallCenterY = b.y + b.h * 0.5;
      const hallGeometry = track(
        new THREE.PlaneGeometry(feel.backPlaneSize, feel.backPlaneSize, 1, 48)
      );
      paintHall(
        hallGeometry,
        hallCenterY,
        b.y,
        b.h,
        new THREE.Color(hallBaseColor(ramp, fogColor)),
        new THREE.Color(hallTopColor(ramp, feel.farGradientTop, fogColor))
      );
      const backPlane = new THREE.Mesh(hallGeometry, backPlaneMat);
      backPlane.position.set(b.x + b.w * 0.5, hallCenterY, feel.backPlaneZ);
      group.add(backPlane);

      const boundary: Rect[] = [];
      const platforms: Rect[] = [];
      for (const solid of room.solids) {
        const isBoundary =
          solid.x + solid.w <= b.x + 0.01 ||
          solid.x >= b.x + b.w - 0.01 ||
          solid.y + solid.h <= b.y + 0.01 ||
          solid.y >= b.y + b.h - 0.01;
        if (isBoundary) boundary.push(solid);
        else platforms.push(solid);
      }

      const openings: Opening[] = [];
      const loose: Door[] = [];
      for (const door of room.doors) {
        const opening = classifyOpening(door, room, boundary, platforms);
        if (opening === null) loose.push(door);
        else openings.push(opening);
      }
      currentOpenings = openings;
      currentRoom = room;

      for (const gate of room.gates) {
        const beyond = openings.find((o) => rectsTouch(o.rect, gate.rect, 1.4));
        if (beyond !== undefined && beyond.warm) sealedOpenings.add(beyond);
      }

      const claimed = new Set<Rect>();
      const assignments = new Map<Decor, Rect[]>();
      for (const decor of room.decor) {
        if (decor.z !== 0 || PLATFORM_KINDS.indexOf(decor.kind) === -1) continue;
        const mine: Rect[] = [];
        for (const solid of platforms) {
          if (claimed.has(solid)) continue;
          if (rectContains(decor.rect, solid, 0.06)) {
            mine.push(solid);
            claimed.add(solid);
          }
        }
        assignments.set(decor, mine);
      }

      emberList.length = 0;
      const ordered = room.decor.slice().sort((p, q) => p.z - q.z);
      for (const decor of ordered) {
        if (decor.kind === "embers") {
          emberList.push(decor);
          continue;
        }
        addDecor(decor, assignments.get(decor) ?? [], room, feel);
      }
      if (emberList.length > 0) {
        const density = room.ambience === undefined ? feel.emberDensity : room.ambience.emberDensity;
        buildEmbers(emberList, density, feel);
      }

      for (const solid of platforms) {
        if (claimed.has(solid)) continue;
        addFallbackPlatform(solid, feel);
      }

      for (const wall of boundary) addBoundaryWall(wall, openings, room, feel);
      for (const door of loose) addFreePortal(door, feel);

      for (const gate of room.gates) {
        const beyond = openings.find((o) => rectsTouch(o.rect, gate.rect, 1.4));
        gates.push({ id: gate.id, mesh: addGate(gate.rect, feel, beyond !== undefined && beyond.warm) });
      }
      for (const breakable of room.breakables) {
        breakables.push({ id: breakable.id, mesh: addBrickedArch(breakable.rect, feel) });
      }

      syncGates(progress);
    },

    syncGates,

    setPlayerPos(x: number, y: number): void {
      playerX = x;
      playerY = y;
    },

    sync(
      t: number,
      dt: number,
      live: Tuning,
      furnaceBoost: number,
      emberBoost: number,
      doorGlow: number
    ): void {
      const feel = live.feel;
      const dawnSpan = Math.max(feel.dawnDoorGlow - 1, 0.001);
      const dawnAmount = Math.min(Math.max((doorGlow - 1) / dawnSpan, 0), 1);

      const spillCap = Math.max(feel.dawnSpillCap, 1);
      for (const entry of doorGlows) {
        entry.material.opacity = Math.min(entry.opacity * doorGlow, 1);
        const grow = Math.min(1 + 0.35 * dawnAmount, spillCap, entry.grow);
        entry.mesh.scale.x = entry.scaleX * grow;
        entry.mesh.scale.y = entry.lengthOnly ? entry.scaleY : entry.scaleY * grow;
      }
      for (const entry of doorPanels) {
        entry.material.color
          .copy(entry.base)
          .lerp(dawnColor, dawnAmount * 0.4)
          .multiplyScalar(1 + dawnAmount * 0.9);
      }
      for (const entry of doorLights) {
        entry.light.intensity = entry.intensity * Math.min(doorGlow, DOOR_LIGHT_DAWN_CAP);
      }
      for (const entry of doorPlates) {
        const lift = dawnAmount * entry.lift;
        entry.material.color.copy(entry.color).lerp(dawnColor, lift * 0.72);
        entry.material.emissive.copy(entry.emissive).lerp(dawnColor, lift);
        entry.material.emissiveIntensity = lift * 0.9;
      }
      if (veils.length > 0) {
        const rest = Math.max(feel.veilRestOpacity, 0);
        const radius = Math.max(feel.veilRevealRadius, 0);
        const step = Math.max(feel.veilFadePerSec, 0) * dt;
        for (const veil of veils) {
          const r = veil.rect;
          const nx = Math.min(Math.max(playerX, r.x), r.x + r.w);
          const ny = Math.min(Math.max(playerY, r.y), r.y + r.h);
          const near = Math.hypot(playerX - nx, playerY - ny) <= radius;
          const target = near ? 0 : rest;
          const delta = target - veil.opacity;
          veil.opacity += Math.abs(delta) <= step ? delta : Math.sign(delta) * step;
          const hidden = veil.opacity;
          const shown = rest <= 0 ? 1 : 1 - veil.opacity / rest;
          for (const part of veil.hide) {
            part.material.opacity = part.base * hidden;
            part.material.visible = part.material.opacity > 0.004;
          }
          for (const part of veil.show) {
            part.material.opacity = part.base * shown;
            part.material.visible = part.material.opacity > 0.004;
          }
          for (const entry of veil.lights) entry.light.intensity = entry.intensity * shown;
        }
      }

      const flicker =
        1 + (Math.sin(t * feel.flickerSpeed) * 0.6 + Math.sin(t * feel.flickerSpeed * 2.37) * 0.4) * feel.flickerAmount;

      for (const entry of flames) {
        const boost = entry.furnace ? furnaceBoost : 1;
        const pulse = (1 + Math.sin(t * feel.furnacePulseSpeed + entry.phase) * entry.amount) * boost;
        const value = Math.min(pulse * flicker, 1.25);
        entry.material.color.copy(entry.base).multiplyScalar(value);
        if (entry.light !== null) entry.light.intensity = entry.lightBase * pulse * flicker;
      }

      if (jars.length > 0) {
        const glow = Math.max(feel.jarGlow, 0);
        const speed = feel.jarPulseSpeed;
        const haloBase = Math.min(glow * 0.42, 1);
        for (const jar of jars) {
          const pulse = 1 + Math.sin(t * speed + jar.phase) * 0.22;
          jar.core.color.copy(jar.base).multiplyScalar(glow * pulse);
          jar.halo.opacity = Math.min(haloBase * pulse, 1);
          if (jar.light !== null) {
            jar.light.intensity = feel.jarLightIntensity * jar.strength * pulse;
          }
        }
      }

      if (conduits.length > 0) {
        const glow = Math.max(feel.conduitGlow, 0);
        const speed = feel.conduitFlowSpeed;
        for (const conduit of conduits) {
          conduit.core.color.copy(conduit.base).multiplyScalar(glow * 0.4);
          conduit.band.color.copy(conduit.base).multiplyScalar(glow);
          const travel = t * speed + conduit.phase;
          for (let i = 0; i < conduit.bands.length; i++) {
            const band = conduit.bands[i];
            if (band === undefined) continue;
            const raw = (travel + (conduit.offsets[i] ?? 0)) % conduit.length;
            const pos = conduit.start + (raw < 0 ? raw + conduit.length : raw);
            if (conduit.axis === "x") band.position.x = pos;
            else band.position.y = pos;
          }
          if (conduit.light !== null) {
            conduit.light.intensity =
              conduit.lightBase * (0.82 + 0.26 * Math.sin(t * speed + conduit.phase));
          }
        }
      }

      const sway = THREE.MathUtils.degToRad(feel.chainSwayDeg);
      for (const entry of sways) {
        entry.pivot.rotation.z = Math.sin(t * feel.chainSwaySpeed + entry.phase) * sway;
      }

      const field = embers;
      if (field !== null) {
        emberMat.size = feel.emberSize;
        emberMat.opacity = feel.emberOpacity;
        const wanted = Math.min(field.count, Math.max(1, Math.round(field.base * emberBoost)));
        if (wanted !== field.drawn) {
          field.drawn = wanted;
          field.points.geometry.setDrawRange(0, wanted);
        }
        const array = field.attribute.array as Float32Array;
        const rise = feel.emberRiseSpeed;
        const amp = feel.emberSwayAmp;
        const speed = feel.emberSwaySpeed;
        for (let i = 0; i < field.count; i++) {
          const phase = field.seed[i] ?? 0;
          const base = field.minY[i] ?? 0;
          const span = field.spanY[i] ?? 1;
          let y = (array[i * 3 + 1] ?? base) + rise * dt * (0.6 + (phase % 1) * 0.8);
          if (y > base + span) y = base;
          array[i * 3 + 1] = y;
          array[i * 3] = (field.originX[i] ?? 0) + Math.sin(t * speed + phase) * amp;
        }
        field.attribute.needsUpdate = true;
      }
    },

    dispose(): void {
      clear();
      for (const mat of baseMaterials) mat.dispose();
      if (haloMap !== null) {
        haloMap.dispose();
        haloMap = null;
      }
      haloTried = false;
    }
  };
}
