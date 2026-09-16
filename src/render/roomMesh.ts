import * as THREE from "three";
import type { Tuning } from "../tuning";
import type { Decor, Progress, Rect, Room } from "../game/types";

export interface RoomMesh {
  group: THREE.Group;
  build(room: Room, progress: Progress): void;
  syncGates(progress: Progress): void;
  dispose(): void;
}

const COLOR_SOLID = 0x2a3444;
const COLOR_SOLID_SIDE = 0x202938;
const COLOR_RIM = 0x9fb0c0;
const COLOR_GATE = 0x6a2a24;
const COLOR_GATE_EDGE = 0xff3b1f;
const COLOR_BREAKABLE = 0x3a3b42;
const COLOR_BLOCK_BG = 0x1e2734;
const COLOR_BLOCK_FG = 0x2b3546;
const COLOR_PILLAR = 0x232c3b;
const COLOR_CHAIN = 0x4a5464;
const COLOR_CYLINDER = 0x2a3342;
const COLOR_BELL = 0x0f141b;
const COLOR_BELL_RIM = 0x49545f;
const COLOR_GLOW = 0xffb648;
const COLOR_DECOR_RIM = 0x8a9aab;
const COLOR_BACKPLANE = 0x090d14;

const MAX_DECOR_LIGHTS = 3;

interface GateEntry {
  id: string;
  mesh: THREE.Object3D;
}

function bellProfile(scale: number): THREE.Vector2[] {
  const points: THREE.Vector2[] = [];
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const v = i / steps;
    const y = v * scale;
    const r = (0.5 - 0.42 * Math.pow(v, 1.7)) * scale;
    points.push(new THREE.Vector2(Math.max(r, 0.02 * scale), y));
  }
  points.push(new THREE.Vector2(0.06 * scale, scale * 1.06));
  return points;
}

export function createRoomMesh(tuning: Tuning): RoomMesh {
  const group = new THREE.Group();
  group.name = "room";

  const solidMat = new THREE.MeshStandardMaterial({
    color: COLOR_SOLID,
    roughness: 0.92,
    metalness: 0.05,
    flatShading: true
  });
  const solidSideMat = new THREE.MeshStandardMaterial({
    color: COLOR_SOLID_SIDE,
    roughness: 0.95,
    flatShading: true
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: COLOR_RIM,
    roughness: 0.6,
    metalness: 0.1,
    emissive: COLOR_RIM,
    emissiveIntensity: 0.12,
    flatShading: true
  });
  const gateMat = new THREE.MeshStandardMaterial({
    color: COLOR_GATE,
    roughness: 0.7,
    emissive: COLOR_GATE_EDGE,
    emissiveIntensity: 0.55,
    flatShading: true
  });
  const breakableMat = new THREE.MeshStandardMaterial({
    color: COLOR_BREAKABLE,
    roughness: 1,
    flatShading: true
  });
  const blockBgMat = new THREE.MeshStandardMaterial({
    color: COLOR_BLOCK_BG,
    roughness: 1,
    flatShading: true
  });
  const blockFgMat = new THREE.MeshStandardMaterial({
    color: COLOR_BLOCK_FG,
    roughness: 1,
    flatShading: true
  });
  const pillarMat = new THREE.MeshStandardMaterial({
    color: COLOR_PILLAR,
    roughness: 1,
    flatShading: true
  });
  const chainMat = new THREE.MeshStandardMaterial({
    color: COLOR_CHAIN,
    roughness: 0.55,
    metalness: 0.35,
    flatShading: true
  });
  const cylinderMat = new THREE.MeshStandardMaterial({
    color: COLOR_CYLINDER,
    roughness: 0.85,
    metalness: 0.2,
    side: THREE.DoubleSide,
    flatShading: true
  });
  const bellMat = new THREE.MeshStandardMaterial({
    color: COLOR_BELL,
    roughness: 0.55,
    metalness: 0.45,
    flatShading: true
  });
  const bellRimMat = new THREE.MeshStandardMaterial({
    color: COLOR_BELL_RIM,
    roughness: 0.5,
    metalness: 0.5,
    emissive: COLOR_BELL_RIM,
    emissiveIntensity: 0.04,
    flatShading: true
  });
  const glowMat = new THREE.MeshBasicMaterial({
    color: COLOR_GLOW,
    transparent: true,
    opacity: tuning.feel.decorGlowOpacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    side: THREE.DoubleSide
  });
  const decorRimMat = new THREE.MeshStandardMaterial({
    color: COLOR_DECOR_RIM,
    roughness: 0.65,
    flatShading: true
  });
  const backPlaneMat = new THREE.MeshBasicMaterial({ color: COLOR_BACKPLANE });

  const tintedMats: THREE.MeshStandardMaterial[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const gates: GateEntry[] = [];
  const breakables: GateEntry[] = [];

  function track<T extends THREE.BufferGeometry>(geometry: T): T {
    geometries.push(geometry);
    return geometry;
  }

  function tinted(base: THREE.MeshStandardMaterial, hex: number): THREE.MeshStandardMaterial {
    const mat = base.clone();
    mat.color.setHex(hex);
    tintedMats.push(mat);
    return mat;
  }

  function addBox(
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
    parent: THREE.Object3D
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addRect(
    rect: Rect,
    depth: number,
    z: number,
    material: THREE.Material,
    parent: THREE.Object3D
  ): THREE.Mesh {
    return addBox(
      Math.max(rect.w, 0.01),
      Math.max(rect.h, 0.01),
      depth,
      rect.x + rect.w * 0.5,
      rect.y + rect.h * 0.5,
      z,
      material,
      parent
    );
  }

  function clear(): void {
    for (let i = group.children.length - 1; i >= 0; i--) {
      const child = group.children[i];
      if (child !== undefined) group.remove(child);
    }
    for (const geometry of geometries) geometry.dispose();
    geometries.length = 0;
    for (const mat of tintedMats) mat.dispose();
    tintedMats.length = 0;
    for (const mat of basicMats) mat.dispose();
    basicMats.length = 0;
    gates.length = 0;
    breakables.length = 0;
  }

  function addChain(decor: Decor, material: THREE.Material): void {
    const feel = tuning.feel;
    const segH = Math.max(feel.chainSegmentHeight, 0.05);
    const count = Math.max(1, Math.round(decor.rect.h / segH));
    const radius = Math.max(feel.chainRadius, 0.02);
    const geometry = track(new THREE.TorusGeometry(radius * 1.6, radius * 0.55, 4, 8));
    const cx = decor.rect.x + decor.rect.w * 0.5;
    for (let i = 0; i < count; i++) {
      const link = new THREE.Mesh(geometry, material);
      link.position.set(cx, decor.rect.y + decor.rect.h - (i + 0.5) * segH, decor.z);
      link.rotation.x = Math.PI * 0.5;
      link.rotation.y = i % 2 === 0 ? 0 : Math.PI * 0.5;
      group.add(link);
    }
  }

  function addBell(decor: Decor, color: number): void {
    const size = Math.max(decor.rect.h, 0.5);
    const geometry = track(new THREE.LatheGeometry(bellProfile(size), 18));
    const material = color === COLOR_BELL ? bellMat : tinted(bellMat, color);
    const mesh = new THREE.Mesh(geometry, material);
    const cx = decor.rect.x + decor.rect.w * 0.5;
    mesh.position.set(cx, decor.rect.y, decor.z);
    mesh.rotation.x = Math.PI;
    mesh.position.y = decor.rect.y + size;
    mesh.scale.set(Math.max(decor.rect.w, 0.5) / size, 1, Math.max(decor.rect.w, 0.5) / size);
    group.add(mesh);

    const lip = track(new THREE.TorusGeometry(size * 0.5, size * 0.035, 4, 20));
    const lipMesh = new THREE.Mesh(lip, bellRimMat);
    lipMesh.position.set(cx, decor.rect.y + size * 0.03, decor.z);
    lipMesh.rotation.x = Math.PI * 0.5;
    lipMesh.scale.set(
      Math.max(decor.rect.w, 0.5) / size,
      Math.max(decor.rect.w, 0.5) / size,
      1
    );
    group.add(lipMesh);
  }

  let decorLights = 0;

  function syncGates(progress: Progress): void {
    for (const entry of gates) {
      entry.mesh.visible = progress.opened.indexOf(entry.id) === -1;
    }
    for (const entry of breakables) {
      entry.mesh.visible = progress.broken.indexOf(entry.id) === -1;
    }
  }

  function addGlow(decor: Decor, color: number): void {
    const feel = tuning.feel;
    const size = Math.max(decor.rect.w, decor.rect.h, feel.decorGlowSize);
    const geometry = track(new THREE.CircleGeometry(size * 0.75, 24));
    const position = geometry.getAttribute("position");
    const falloff = new Float32Array(position.count * 3);
    falloff[0] = 1;
    falloff[1] = 1;
    falloff[2] = 1;
    geometry.setAttribute("color", new THREE.BufferAttribute(falloff, 3));
    const material = color === COLOR_GLOW ? glowMat : tinted2(color);
    const mesh = new THREE.Mesh(geometry, material);
    const cx = decor.rect.x + decor.rect.w * 0.5;
    const cy = decor.rect.y + decor.rect.h * 0.5;
    mesh.position.set(cx, cy, decor.z);
    group.add(mesh);

    if (decorLights < MAX_DECOR_LIGHTS) {
      decorLights++;
      const light = new THREE.PointLight(color, feel.decorGlowIntensity, size * 6, 2);
      light.position.set(cx, cy, decor.z + 0.5);
      group.add(light);
    }
  }

  const basicMats: THREE.MeshBasicMaterial[] = [];
  function tinted2(hex: number): THREE.MeshBasicMaterial {
    const mat = glowMat.clone();
    mat.color.setHex(hex);
    basicMats.push(mat);
    return mat;
  }

  function addDecor(decor: Decor): void {
    const feel = tuning.feel;
    const back = decor.z < 0;
    const color = decor.color;

    if (decor.kind === "block") {
      const base = back ? blockBgMat : blockFgMat;
      const material = color === undefined ? base : tinted(base, color);
      addRect(decor.rect, feel.solidDepth * (back ? 1.6 : 1), decor.z, material, group);
      return;
    }
    if (decor.kind === "pillar") {
      const material = color === undefined ? pillarMat : tinted(pillarMat, color);
      addRect(decor.rect, feel.solidDepth * 1.2, decor.z, material, group);
      return;
    }
    if (decor.kind === "chain") {
      const material = color === undefined ? chainMat : tinted(chainMat, color);
      addChain(decor, material);
      return;
    }
    if (decor.kind === "cylinder") {
      const material = color === undefined ? cylinderMat : tinted(cylinderMat, color);
      const radius = Math.max(decor.rect.w, 0.2) * 0.5;
      const geometry = track(
        new THREE.CylinderGeometry(radius, radius, Math.max(decor.rect.h, 0.2), 12, 1, true)
      );
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        decor.rect.x + decor.rect.w * 0.5,
        decor.rect.y + decor.rect.h * 0.5,
        decor.z
      );
      group.add(mesh);
      return;
    }
    if (decor.kind === "bell") {
      addBell(decor, color === undefined ? COLOR_BELL : color);
      return;
    }
    if (decor.kind === "glow") {
      addGlow(decor, color === undefined ? COLOR_GLOW : color);
      return;
    }
    const material = color === undefined ? decorRimMat : tinted(decorRimMat, color);
    addRect(decor.rect, feel.rimHeight * 2, decor.z, material, group);
  }

  return {
    group,

    build(room: Room, progress: Progress): void {
      clear();
      decorLights = 0;
      const feel = tuning.feel;

      const backPlane = new THREE.Mesh(
        track(new THREE.PlaneGeometry(feel.backPlaneSize, feel.backPlaneSize)),
        backPlaneMat
      );
      backPlane.position.set(
        room.bounds.x + room.bounds.w * 0.5,
        room.bounds.y + room.bounds.h * 0.5,
        feel.backPlaneZ
      );
      group.add(backPlane);

      for (const decor of room.decor) addDecor(decor);

      for (const rect of room.solids) {
        addRect(rect, feel.solidDepth, 0, solidMat, group);
        addBox(
          Math.max(rect.w, 0.01),
          Math.max(rect.h, 0.01) * 0.98,
          feel.solidDepth * 1.25,
          rect.x + rect.w * 0.5,
          rect.y + rect.h * 0.5,
          -feel.solidDepth * 0.2,
          solidSideMat,
          group
        );
        addBox(
          Math.max(rect.w, 0.01) + feel.rimOverhang * 2,
          feel.rimHeight,
          feel.solidDepth + feel.rimOverhang * 2,
          rect.x + rect.w * 0.5,
          rect.y + rect.h - feel.rimHeight * 0.25,
          0,
          rimMat,
          group
        );
      }

      for (const gate of room.gates) {
        const holder = new THREE.Group();
        holder.position.set(
          gate.rect.x + gate.rect.w * 0.5,
          gate.rect.y + gate.rect.h * 0.5,
          0
        );
        group.add(holder);
        addBox(
          Math.max(gate.rect.w, 0.01),
          Math.max(gate.rect.h, 0.01),
          feel.gateDepth,
          0,
          0,
          0,
          gateMat,
          holder
        );
        const bars = Math.max(2, Math.round(gate.rect.h / 0.7));
        for (let i = 0; i < bars; i++) {
          addBox(
            gate.rect.w * 1.06,
            feel.rimHeight * 0.8,
            feel.gateDepth * 1.08,
            0,
            (((i + 0.5) / bars) - 0.5) * gate.rect.h,
            0,
            rimMat,
            holder
          );
        }
        gates.push({ id: gate.id, mesh: holder });
      }

      for (const breakable of room.breakables) {
        const holder = new THREE.Group();
        holder.position.set(
          breakable.rect.x + breakable.rect.w * 0.5,
          breakable.rect.y + breakable.rect.h * 0.5,
          0
        );
        group.add(holder);
        addBox(
          Math.max(breakable.rect.w, 0.01),
          Math.max(breakable.rect.h, 0.01),
          feel.breakableDepth,
          0,
          0,
          0,
          breakableMat,
          holder
        );
        addBox(
          breakable.rect.w * 0.1,
          breakable.rect.h * 0.9,
          feel.breakableDepth * 1.04,
          breakable.rect.w * 0.04,
          0,
          0,
          solidSideMat,
          holder
        );
        addBox(
          breakable.rect.w * 0.9,
          breakable.rect.h * 0.08,
          feel.breakableDepth * 1.04,
          0,
          breakable.rect.h * 0.18,
          0,
          solidSideMat,
          holder
        );
        breakables.push({ id: breakable.id, mesh: holder });
      }

      syncGates(progress);
    },

    syncGates,

    dispose(): void {
      clear();
      for (const mat of basicMats) mat.dispose();
      basicMats.length = 0;
      solidMat.dispose();
      solidSideMat.dispose();
      rimMat.dispose();
      gateMat.dispose();
      breakableMat.dispose();
      blockBgMat.dispose();
      blockFgMat.dispose();
      pillarMat.dispose();
      chainMat.dispose();
      cylinderMat.dispose();
      bellMat.dispose();
      bellRimMat.dispose();
      glowMat.dispose();
      decorRimMat.dispose();
      backPlaneMat.dispose();
    }
  };
}
