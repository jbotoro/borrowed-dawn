import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { Decor, DecorKind, Door, Progress, Rect, Room, Vec2 } from "../game/types";
import type { LookProfile } from "./look";
import { shadeOf } from "./look";

export interface RoomMesh {
  group: THREE.Group;
  build(room: Room, progress: Progress): void;
  syncGates(progress: Progress): void;
  sync(t: number, dt: number, tuning: Tuning): void;
  dispose(): void;
}

type Feel = Tuning["feel"];

const MAX_DECOR_LIGHTS = 4;
const FAR_Z = -6;
const WARM_TARGETS: Record<string, boolean> = { belfry: true, cache: true };
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
}

interface Opening {
  door: Door;
  rect: Rect;
  side: "left" | "right" | "floor" | "ceiling";
  warm: boolean;
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

  const wallMat = look.material("backgroundNear");
  const faceMat = look.material("backgroundNear", { shade: 0.9 });
  const stoneMat = look.material("architecture");
  const stoneDarkMat = look.material("architecture", { shade: 0.74 });
  const stoneLitMat = look.material("architecture", { shade: 1.12 });
  const rimMat = look.material("rimEdge", { emissiveIntensity: 0.06 });
  const ironMat = look.material("chain");
  const ironDarkMat = look.material("chain", { shade: 0.62 });
  const midMat = look.material("architecture", { shade: 0.78 });
  const midDarkMat = look.material("backgroundNear", { shade: 1.25 });
  const bellMat = look.material("bossShell", { shade: 1.3, doubleSide: true });
  const bellInnerMat = look.material("backgroundFar", { unlit: true, shade: 0.4, doubleSide: true });
  const voidMat = new THREE.MeshBasicMaterial({ color: ramp.void, fog: false });
  const voidFogMat = new THREE.MeshBasicMaterial({ color: ramp.void });
  const farMat = new THREE.MeshBasicMaterial({ color: ramp.charcoal, fog: false });
  const farLitMat = new THREE.MeshBasicMaterial({ color: shadeOf(ramp.charcoal, 1.16), fog: false });
  const amberMat = new THREE.MeshBasicMaterial({ color: ramp.amber, fog: false });
  const amberDimMat = new THREE.MeshBasicMaterial({ color: shadeOf(ramp.amber, 0.5), fog: false });
  const gradientMat = new THREE.MeshBasicMaterial({ vertexColors: true, fog: false });
  const backPlaneMat = new THREE.MeshBasicMaterial({ color: ramp.void, fog: false });
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

  const transientMaterials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const gates: Tagged[] = [];
  const breakables: Tagged[] = [];
  const flames: Flame[] = [];
  const sways: SwayEntry[] = [];
  let embers: EmberField | null = null;
  let decorLights = 0;
  let currentOpenings: Opening[] = [];
  let currentRoom: Room | null = null;
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
      const shellMat = look.outlineMaterial();
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
      rect.y + rect.h - feel.rimHeight * 0.5,
      z + depth * 0.5 - lineDepth * 0.5 + feel.rimOverhang - inset,
      rimMat,
      parent,
      true
    );
  }

  function addTop(rect: Rect, depth: number, z: number, parent: THREE.Object3D, material: THREE.Material): void {
    const capH = 0.07;
    addBox(rect.w, capH, depth - 0.02, rect.x + rect.w * 0.5, rect.y + rect.h - capH * 0.5, z, material, parent);
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
    seed: number
  ): void {
    const spacing = Math.max(feel.courseSpacing, 0.3);
    const rows = Math.floor(rect.h / spacing);
    if (rows < 1) return;
    const random = seededRandom(seed);
    const front = z + depth * 0.5 + 0.006;
    const lineMat = voidMat;
    for (let i = 1; i <= rows; i++) {
      const y = rect.y + i * spacing;
      if (y > rect.y + rect.h - 0.05) break;
      addBox(rect.w, 0.032, 0.012, rect.x + rect.w * 0.5, y, front, lineMat, parent);
      const joints = Math.max(1, Math.floor(rect.w / 1.6));
      for (let j = 0; j < joints; j++) {
        const jx = rect.x + ((j + 0.25 + random() * 0.5) / joints) * rect.w;
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
    sways.length = 0;
    embers = null;
    decorLights = 0;
  }

  function syncGates(progress: Progress): void {
    for (const entry of gates) {
      entry.mesh.visible = progress.opened.indexOf(entry.id) === -1;
    }
    for (const entry of breakables) {
      entry.mesh.visible = progress.broken.indexOf(entry.id) === -1;
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
    z: number
  ): THREE.PointLight | null {
    if (decorLights >= MAX_DECOR_LIGHTS) return null;
    decorLights++;
    const light = new THREE.PointLight(hex, intensity, distance, 2);
    light.layers.enableAll();
    light.position.set(x, y, z);
    group.add(light);
    return light;
  }

  function addFloorSpill(
    x: number,
    floorY: number,
    width: number,
    length: number,
    dir: number,
    hex: number,
    opacity: number
  ): void {
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
  }

  function addPoolSpill(x: number, floorY: number, radius: number, hex: number, opacity: number): void {
    const geometry = track(new THREE.CircleGeometry(radius, 24));
    radialFalloff(geometry);
    const mesh = new THREE.Mesh(geometry, spillMaterial(hex, opacity));
    mesh.rotation.x = -Math.PI * 0.5;
    mesh.scale.set(1, 0.42, 1);
    mesh.position.set(x, floorY + 0.012, 0.1);
    group.add(mesh);
  }

  function addWallGlow(
    x: number,
    y: number,
    w: number,
    h: number,
    z: number,
    hex: number,
    opacity: number
  ): void {
    const geometry = track(new THREE.CircleGeometry(1, 24));
    radialFalloff(geometry);
    const mesh = new THREE.Mesh(geometry, spillMaterial(hex, opacity));
    mesh.scale.set(w * 0.5, h * 0.5, 1);
    mesh.position.set(x, y, z);
    group.add(mesh);
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
        addBox(plate.w, 0.06, depth, plate.x + plate.w * 0.5, plate.y + plate.h - 0.03, z, farLitMat, group);
      } else {
        addPlate(plate, z, group, feel);
        addBox(plate.w, 0.1, 0.12, plate.x + plate.w * 0.5, plate.y + 0.05, z + depth * 0.5 - 0.06, ironDarkMat, group, true);
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
      addPlateWithRivets(0.22, beam.h * 1.06, depth * 1.05, beam.x + 0.11, cy, z, group, ironMat);
      addPlateWithRivets(0.22, beam.h * 1.06, depth * 1.05, beam.x + beam.w - 0.11, cy, z, group, ironMat);
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

  function addWall(decor: Decor, solids: Rect[], feel: Feel): void {
    const z = decor.z;
    const far = z <= FAR_Z;
    const depth = far ? feel.solidDepth * 0.6 : feel.solidDepth;
    const riveted = (decor.intensity ?? 0) >= 1;
    const masses: Rect[] = [];
    const hatches: Opening[] = [];
    for (const source of solids.length > 0 ? solids : [decor.rect]) {
      const cuts = decor.z === 0
        ? currentOpenings.filter((o) => (o.side === "ceiling" || o.side === "floor") && rectsTouch(o.rect, source, 0.05) && o.rect.y >= source.y - 0.05 && o.rect.y + o.rect.h <= source.y + source.h + 0.05)
        : [];
      if (cuts.length === 0) {
        masses.push(source);
        continue;
      }
      let cursor = source.x;
      for (const cut of cuts.slice().sort((p, q) => p.rect.x - q.rect.x)) {
        if (cut.rect.x > cursor + 0.02) masses.push({ x: cursor, y: source.y, w: cut.rect.x - cursor, h: source.h });
        cursor = cut.rect.x + cut.rect.w;
        hatches.push(cut);
      }
      if (source.x + source.w > cursor + 0.02) masses.push({ x: cursor, y: source.y, w: source.x + source.w - cursor, h: source.h });
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
      addBox(0.94, feel.rimHeight, depth * 0.54, 0, 0.12 - feel.rimHeight * 0.5, 0, rimMat, holder, true);
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
    addBox(lw, lh - 0.1, lw * 0.9, lampX, ly, z, glass, group);
    const edges = [lampX - lw * 0.5, lampX + lw * 0.5];
    for (const ex of edges) addBox(0.05, lh, 0.05, ex, ly, z + lw * 0.46, ironDarkMat, group);
    addBox(0.05, lh, 0.05, lampX, ly, z + lw * 0.46, ironDarkMat, group);
    const flameMat = transient(new THREE.MeshBasicMaterial({ color: ramp.porcelain, fog: false }));
    addBox(0.1, 0.2, 0.1, lampX, ly - 0.05, z + lw * 0.2, flameMat, group);
    const light = addFlameLight(ramp.amber, feel.lampLightIntensity, feel.lampLightDistance, lampX, ly, z + 0.9);
    addPoolSpill(lampX, rect.y, 2.4, ramp.amber, feel.passageSpillOpacity * 0.8);
    addWallGlow(lampX, ly - 0.3, 3.0, 3.6, z - 0.35, ramp.amber, feel.passageSpillOpacity * 0.22);
    flames.push({ material: glass, base: new THREE.Color(ramp.amber), light, lightBase: feel.lampLightIntensity, phase: lampX, amount: 0.12 });
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
    const light = addFlameLight(ramp.amber, feel.furnaceLightIntensity * strength, feel.furnaceLightDistance, cx, mouthY, front + 0.8);
    addWallGlow(cx, mouthY, rect.w * 2.4, rect.h * 1.6, front + 0.12, ramp.amber, feel.decorGlowOpacity * 0.6 * strength);
    flames.push({ material: mouthMat, base: new THREE.Color(ramp.amber), light, lightBase: feel.furnaceLightIntensity * strength, phase: cx * 0.6, amount: feel.furnacePulseAmount });
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
    if (decor.z > FAR_Z) addFlameLight(hex, feel.decorGlowIntensity * strength, size * 6, cx, cy, decor.z + 0.5);
  }

  function buildEmbers(rects: Decor[], density: number, feel: Feel): void {
    let total = 0;
    for (const decor of rects) {
      const area = Math.max(decor.rect.w * decor.rect.h, 0);
      total += Math.round(area * feel.emberPerArea * density);
    }
    const count = Math.min(Math.max(total, 0), Math.max(1, Math.round(feel.emberMax)));
    if (count <= 0) return;

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
      if (total > count) share = Math.round((share * count) / total);
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
    const points = new THREE.Points(geometry, emberMat);
    points.frustumCulled = false;
    group.add(points);
    embers = { points, attribute, seed, originX, minY, spanY, count };
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
    for (const wall of walls) {
      if (!rectsTouch(door.rect, wall, 0.05)) continue;
      const rightWall = wall.x >= b.x + b.w - 0.01;
      const leftWall = wall.x + wall.w <= b.x + 0.01;
      const floor = wall.y + wall.h <= b.y + 0.01;
      const ceiling = wall.y >= b.y + b.h - 0.01;
      if (rightWall || leftWall) {
        return {
          door,
          rect: { x: wall.x, y: door.rect.y, w: wall.w, h: door.rect.h },
          side: rightWall ? "right" : "left",
          warm
        };
      }
      if (floor || ceiling) {
        return {
          door,
          rect: { x: door.rect.x, y: wall.y, w: door.rect.w, h: wall.h },
          side: floor ? "floor" : "ceiling",
          warm
        };
      }
    }
    for (const slab of slabs) {
      if (!rectsTouch(door.rect, slab, 0.05)) continue;
      if (door.rect.x < slab.x - 0.05 || door.rect.x + door.rect.w > slab.x + slab.w + 0.05) continue;
      const above = door.rect.y + door.rect.h * 0.5 < slab.y;
      return {
        door,
        rect: { x: door.rect.x, y: slab.y, w: door.rect.w, h: slab.h },
        side: above ? "ceiling" : "floor",
        warm
      };
    }
    return null;
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
    const hex = opening.warm ? ramp.amber : ramp.ash;
    const glowHex = opening.warm ? ramp.amber : shadeOf(ramp.ash, 1.15);

    const back = track(new THREE.PlaneGeometry(rect.w, rect.h, 8, 2));
    paintPlane(back, new THREE.Color(ramp.void), new THREE.Color(hex).multiplyScalar(opening.warm ? 0.7 : 0.9), "x", 1.4);
    if (!right) back.rotateY(Math.PI).rotateY(Math.PI);
    if (!right) back.scale(-1, 1, 1);
    const backMesh = new THREE.Mesh(back, gradientMat);
    backMesh.position.set(cx, cy, -depth * 0.5 + 0.03);
    group.add(backMesh);

    const floor = track(new THREE.PlaneGeometry(rect.w, depth, 8, 2));
    paintPlane(floor, new THREE.Color(ramp.charcoal), new THREE.Color(hex).multiplyScalar(0.75), "x", 1.3);
    if (!right) floor.scale(-1, 1, 1);
    const floorMesh = new THREE.Mesh(floor, gradientMat);
    floorMesh.rotation.x = -Math.PI * 0.5;
    floorMesh.position.set(cx, rect.y + 0.02, 0);
    group.add(floorMesh);

    const ceiling = track(new THREE.PlaneGeometry(rect.w, depth, 8, 2));
    paintPlane(ceiling, new THREE.Color(ramp.void), new THREE.Color(ramp.charcoal), "x", 1.5);
    if (!right) ceiling.scale(-1, 1, 1);
    const ceilingMesh = new THREE.Mesh(ceiling, gradientMat);
    ceilingMesh.rotation.x = Math.PI * 0.5;
    ceilingMesh.position.set(cx, rect.y + rect.h - 0.02, 0);
    group.add(ceilingMesh);

    const sill = addBox(rect.w + 0.4, 0.07, depth + 0.16, cx - dir * 0.2, rect.y + 0.035, 0, stoneLitMat, group, true);
    sill.renderOrder = 1;

    const jambW = 0.42;
    addBox(jambW, rect.h + 0.05, depth + 0.16, innerX + dir * jambW * 0.5, cy, 0, stoneMat, group, true);
    addBox(jambW * 0.7, rect.h + 0.05, depth + 0.1, outerX - dir * jambW * 0.35, cy, 0, stoneDarkMat, group, true);

    if (arched) {
      const radius = rect.w * 0.5;
      addArchStones(cx, rect.y + rect.h - 0.02, radius, 0.5, depth + 0.16, 0, stoneMat, group);
      addBox(rect.w + 1.2, 0.36, depth + 0.16, cx, rect.y + rect.h + radius + 0.62, 0, stoneDarkMat, group, true);
    } else {
      addBox(rect.w + jambW * 1.6, 0.62, depth + 0.16, cx, rect.y + rect.h + 0.31, 0, stoneMat, group, true);
      addBox(0.7, 0.72, depth + 0.22, cx, rect.y + rect.h + 0.36, 0, stoneLitMat, group, true);
      addBox(rect.w + jambW * 2.2, 0.22, depth + 0.1, cx, rect.y + rect.h + 0.73, 0, stoneDarkMat, group, true);
    }

    addFloorSpill(innerX, rect.y, Math.min(rect.w * 2.1, depth - 0.1), feel.passageSpillLength, -dir, glowHex, feel.passageSpillOpacity * 0.9);
    addWallGlow(cx - dir * 0.2, cy, rect.w * 1.6, rect.h * 1.15, -depth * 0.5 + 0.4, glowHex, feel.passageSpillOpacity * (opening.warm ? 0.9 : 0.6));
    if (feel.passageLightIntensity > 0 && opening.warm) {
      addFlameLight(hex, feel.passageLightIntensity, feel.passageLightDistance, innerX - dir * 0.2, cy, 0.4);
    }
  }

  function addVerticalPassage(opening: Opening, room: Room, feel: Feel): void {
    const rect = opening.rect;
    const up = opening.side === "ceiling";
    const depth = feel.solidDepth;
    const cx = rect.x + rect.w * 0.5;
    const cy = rect.y + rect.h * 0.5;
    const hex = opening.warm ? ramp.amber : ramp.ash;
    const glowHex = opening.warm ? ramp.amber : shadeOf(ramp.ash, 1.15);
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
      addPoolSpill(cx, ladderBottom, rect.w * 1.6, glowHex, feel.passageSpillOpacity * 0.9);
      addWallGlow(cx, rect.y + 0.2, rect.w * 2.2, 1.6, -depth * 0.5 + 0.4, glowHex, feel.passageSpillOpacity * 0.7);
    } else {
      addWallGlow(cx, rect.y + rect.h - 0.3, rect.w * 2.0, 1.4, -depth * 0.5 + 0.4, glowHex, feel.passageSpillOpacity * 0.5);
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
    addFloorSpill(cx, rect.y, rect.w * 1.6, feel.passageSpillLength * 0.6, 1, ramp.ash, feel.passageSpillOpacity * 0.6);
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
        addBox(pilasterW, span.h, depth + 0.24, innerX + dir * pilasterW * 0.5, span.y + span.h * 0.5, 0, stoneDarkMat, group, true);
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
    if (warm) {
      const glowGeometry = track(new THREE.CircleGeometry(1, 24));
      radialFalloff(glowGeometry);
      const glow = new THREE.Mesh(glowGeometry, spillMaterial(ramp.amber, feel.passageSpillOpacity * 1.1));
      glow.scale.set(rect.w * 1.4, rect.h * 0.62, 1);
      glow.position.set(0, -rect.h * 0.08, -depth * 0.5 - 0.12);
      holder.add(glow);
      const floorGlow = new THREE.Mesh(glowGeometry, spillMaterial(ramp.amber, feel.passageSpillOpacity * 0.7));
      floorGlow.rotation.x = -Math.PI * 0.5;
      floorGlow.scale.set(rect.w * 2.6, feel.solidDepth * 0.42, 1);
      floorGlow.position.set(-rect.w * 1.6, -rect.h * 0.5 + 0.012, 0);
      holder.add(floorGlow);
    }
    const frameW = Math.max(rect.w, 0.3);
    const frameT = 0.14;
    addBox(frameW, frameT, depth, 0, rect.h * 0.5 - frameT * 0.5, 0, ironDarkMat, holder, true);
    addBox(frameW, frameT, depth, 0, -rect.h * 0.5 + frameT * 0.5, 0, ironDarkMat, holder, true);
    addBox(frameT, rect.h, depth, -frameW * 0.5 + frameT * 0.5, 0, 0, ironDarkMat, holder, true);
    addBox(frameT, rect.h, depth, frameW * 0.5 - frameT * 0.5, 0, 0, ironDarkMat, holder, true);
    const bars = Math.max(3, Math.round(depth / 0.28));
    for (let i = 0; i < bars; i++) {
      const bz = -depth * 0.5 + ((i + 0.5) / bars) * depth;
      addBox(frameW * 0.86, 0.09, 0.09, 0, 0, bz, ironMat, holder, true);
      addBox(0.09, rect.h - frameT * 2, 0.09, 0, 0, bz, ironMat, holder, true);
    }
    addBox(frameW * 0.92, 0.12, depth * 1.04, 0, rect.h * 0.22, 0, ironDarkMat, holder, true);
    addBox(frameW * 0.92, 0.12, depth * 1.04, 0, -rect.h * 0.22, 0, ironDarkMat, holder, true);
    const plate = addBox(frameW * 0.9, 0.5, 0.16, 0, -rect.h * 0.02, depth * 0.5 + 0.06, ironMat, holder, true);
    plate.renderOrder = 1;
    addBox(0.08, 0.14, 0.06, 0, -rect.h * 0.02 - 0.02, depth * 0.5 + 0.16, voidMat, holder);
    addBox(0.14, 0.06, 0.06, 0, -rect.h * 0.02 + 0.06, depth * 0.5 + 0.16, voidMat, holder);
    addRivets(0, -rect.h * 0.02, frameW * 0.86, 0.46, depth * 0.5 + 0.16, holder, ironDarkMat);
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

      const backPlane = new THREE.Mesh(track(new THREE.PlaneGeometry(feel.backPlaneSize, feel.backPlaneSize)), backPlaneMat);
      backPlane.position.set(b.x + b.w * 0.5, b.y + b.h * 0.5, feel.backPlaneZ);
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

    sync(t: number, dt: number, live: Tuning): void {
      const feel = live.feel;
      const flicker =
        1 + (Math.sin(t * feel.flickerSpeed) * 0.6 + Math.sin(t * feel.flickerSpeed * 2.37) * 0.4) * feel.flickerAmount;

      for (const entry of flames) {
        const pulse = 1 + Math.sin(t * feel.furnacePulseSpeed + entry.phase) * entry.amount;
        const value = Math.min(pulse * flicker, 1.25);
        entry.material.color.copy(entry.base).multiplyScalar(value);
        if (entry.light !== null) entry.light.intensity = entry.lightBase * pulse * flicker;
      }

      const sway = THREE.MathUtils.degToRad(feel.chainSwayDeg);
      for (const entry of sways) {
        entry.pivot.rotation.z = Math.sin(t * feel.chainSwaySpeed + entry.phase) * sway;
      }

      const field = embers;
      if (field !== null) {
        emberMat.size = feel.emberSize;
        emberMat.opacity = feel.emberOpacity;
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
    }
  };
}
