import * as THREE from "three";

export type LookId = "baseline" | "a" | "b" | "c";

export type PaletteRole =
  | "void"
  | "ash"
  | "architecture"
  | "rimEdge"
  | "backgroundNear"
  | "backgroundFar"
  | "actorCoat"
  | "actorMetal"
  | "actorGlass"
  | "enemyBody"
  | "enemyAccent"
  | "bossShell"
  | "bossFurnace"
  | "chain"
  | "danger"
  | "reward";

export type Palette = Record<PaletteRole, number>;

export type TextureKind = "none" | "stone" | "metal" | "glass";

export type LitMaterial = THREE.Material & {
  color: THREE.Color;
  emissive: THREE.Color;
  emissiveIntensity: number;
};

export interface MaterialOptions {
  shade?: number;
  emissiveIntensity?: number;
  emissiveColor?: number;
  doubleSide?: boolean;
  roughness?: number;
  metalness?: number;
  texture?: TextureKind;
  repeat?: number;
  unlit?: boolean;
  fog?: boolean;
  emissiveMix?: number;
}

export interface LightSpec {
  color: number;
  intensity: number;
  x: number;
  y: number;
  z: number;
}

export interface LightRig {
  hemiSky: number;
  hemiGround: number;
  hemiIntensity: number;
  key: LightSpec;
  fill: LightSpec;
  rim: LightSpec | null;
  spot: LightSpec | null;
}

export interface FogTreatment {
  enabled: boolean;
  nearScale: number;
  farScale: number;
  saturation: number;
  colorOverride: number | null;
}

export interface PostfxFlags {
  bloomScale: number;
  vignetteScale: number;
  outlineActors: boolean;
  outlineArchitecture: boolean;
  toon: boolean;
  toneMapped: boolean;
}

export interface Ramp {
  void: number;
  charcoal: number;
  slate: number;
  ash: number;
  porcelain: number;
  vermilion: number;
  amber: number;
}

export interface LookProfile {
  id: LookId;
  name: string;
  palette: Palette;
  ramp: Ramp;
  lights: LightRig;
  fog: FogTreatment;
  postfx: PostfxFlags;
  shadows: boolean;
  glowAdditive: boolean;
  bevel: number;
  depthDesaturate: number;
  ambienceSaturation: number;
  ambienceIntensityScale: number;
  rigMix: number;
  actorLayer: number;
  material(role: PaletteRole, options?: MaterialOptions): THREE.Material;
  litMaterial(role: PaletteRole, options?: MaterialOptions): LitMaterial;
  heat(t: number): number;
  glowMaterial(hex: number, opacity: number): THREE.MeshBasicMaterial;
  boxGeometry(w: number, h: number, d: number): THREE.BufferGeometry;
  outlineMaterial(): THREE.Material | null;
  colorOf(role: PaletteRole, shade?: number): number;
}

export const RAMP: Ramp = {
  void: 0x07090d,
  charcoal: 0x151b24,
  slate: 0x3a4452,
  ash: 0x7c8794,
  porcelain: 0xe8e2d5,
  vermilion: 0xff4b35,
  amber: 0xffb648
};

const PALE_RIM = 0xcad5df;
const EMBER = RAMP.amber;
const DANGER = RAMP.vermilion;

const basePalette: Palette = {
  void: 0x070b12,
  ash: 0x66788a,
  architecture: 0x252f3d,
  rimEdge: PALE_RIM,
  backgroundNear: 0x1a222e,
  backgroundFar: 0x0f151d,
  actorCoat: 0x3c4757,
  actorMetal: 0xe8eff4,
  actorGlass: EMBER,
  enemyBody: 0x414b5c,
  enemyAccent: DANGER,
  bossShell: 0x0c1016,
  bossFurnace: 0xff5a1e,
  chain: 0x55616f,
  danger: DANGER,
  reward: EMBER
};

const scratch = new THREE.Color();

function shadeHex(hex: number, shade: number): number {
  if (shade === 1) return hex;
  scratch.setHex(hex);
  if (shade < 1) {
    scratch.multiplyScalar(shade);
  } else {
    scratch.lerp(new THREE.Color(0xffffff), Math.min((shade - 1) * 0.8, 1));
  }
  return scratch.getHex();
}

function desaturate(hex: number, amount: number): number {
  if (amount >= 1) return hex;
  scratch.setHex(hex);
  const grey = scratch.r * 0.299 + scratch.g * 0.587 + scratch.b * 0.114;
  scratch.setRGB(
    grey + (scratch.r - grey) * amount,
    grey + (scratch.g - grey) * amount,
    grey + (scratch.b - grey) * amount
  );
  return scratch.getHex();
}

function makeContext(size: number): CanvasRenderingContext2D | null {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return canvas.getContext("2d");
}

function toTexture(ctx: CanvasRenderingContext2D): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(ctx.canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function stoneTexture(): THREE.CanvasTexture | null {
  const ctx = makeContext(128);
  if (ctx === null) return null;
  ctx.fillStyle = "#b9b9b9";
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 2600; i++) {
    const v = 150 + Math.floor(Math.random() * 105);
    ctx.fillStyle = "rgba(" + v + "," + v + "," + v + ",0.35)";
    ctx.fillRect(Math.random() * 128, Math.random() * 128, 1.6, 1.6);
  }
  for (let i = 0; i < 26; i++) {
    ctx.strokeStyle = "rgba(90,90,90,0.16)";
    ctx.lineWidth = 0.6 + Math.random();
    ctx.beginPath();
    const y = Math.random() * 128;
    ctx.moveTo(0, y);
    ctx.lineTo(128, y + (Math.random() - 0.5) * 12);
    ctx.stroke();
  }
  return toTexture(ctx);
}

function metalTexture(): THREE.CanvasTexture | null {
  const ctx = makeContext(128);
  if (ctx === null) return null;
  ctx.fillStyle = "#c2c2c2";
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * 128;
    const w = 0.6 + Math.random() * 2.4;
    const v = 120 + Math.floor(Math.random() * 120);
    ctx.fillStyle = "rgba(" + v + "," + Math.floor(v * 0.9) + "," + Math.floor(v * 0.78) + ",0.3)";
    ctx.fillRect(x, 0, w, 128);
  }
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = "rgba(150,96,54,0.09)";
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    ctx.fillRect(x, y, 2 + Math.random() * 10, 1 + Math.random() * 26);
  }
  return toTexture(ctx);
}

function glassTexture(): THREE.CanvasTexture | null {
  const ctx = makeContext(128);
  if (ctx === null) return null;
  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.45, "#ffd9a0");
  grad.addColorStop(1, "#9d5f22");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return toTexture(ctx);
}

function gradientMap(bands: number, levels: number[] | null): THREE.DataTexture {
  const count = Math.max(2, Math.min(Math.round(bands), 8));
  const texels = levels === null ? count : levels.length;
  const data = new Uint8Array(texels);
  for (let i = 0; i < texels; i++) {
    const value = levels === null ? (i + 1) / count : (levels[i] ?? 1);
    data[i] = Math.round(Math.min(Math.max(value, 0), 1) * 255);
  }
  const texture = new THREE.DataTexture(data, texels, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function bevelGeometry(w: number, h: number, d: number, bevel: number): THREE.BufferGeometry {
  const b = Math.min(bevel, w * 0.28, h * 0.28, d * 0.28);
  if (b <= 0.004) return new THREE.BoxGeometry(w, h, d);
  const hw = w * 0.5 - b;
  const hh = h * 0.5 - b;
  const depth = Math.max(d - b * 2, 0.001);
  const shape = new THREE.Shape();
  shape.moveTo(-hw, -hh);
  shape.lineTo(hw, -hh);
  shape.lineTo(hw, hh);
  shape.lineTo(-hw, hh);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: 2,
    curveSegments: 1
  });
  geometry.translate(0, 0, -depth * 0.5);
  return geometry;
}

interface LookSeed {
  id: LookId;
  name: string;
  palette: Palette;
  lights: LightRig;
  fog: FogTreatment;
  postfx: PostfxFlags;
  shadows: boolean;
  glowAdditive: boolean;
  bevel: number;
  depthDesaturate: number;
  ambienceSaturation: number;
  ambienceIntensityScale: number;
  rigMix: number;
  textured: boolean;
  smooth: boolean;
  specular: boolean;
  toonLevels: number[] | null;
}

const seeds: Record<LookId, LookSeed> = {
  baseline: {
    id: "baseline",
    name: "Baseline",
    palette: basePalette,
    lights: {
      hemiSky: 0x6f8fbf,
      hemiGround: 0x0a0d14,
      hemiIntensity: 1,
      key: { color: 0xffe6cc, intensity: 1, x: -10, y: 14, z: 12 },
      fill: { color: 0x6f93c8, intensity: 1, x: 9, y: 3, z: 14 },
      rim: null,
      spot: null
    },
    fog: { enabled: true, nearScale: 1, farScale: 1, saturation: 1, colorOverride: null },
    postfx: {
      bloomScale: 1,
      vignetteScale: 1,
      outlineActors: false,
      outlineArchitecture: false,
      toon: false,
      toneMapped: true
    },
    shadows: false,
    glowAdditive: true,
    bevel: 0,
    depthDesaturate: 0,
    ambienceSaturation: 1,
    ambienceIntensityScale: 1,
    rigMix: 0,
    textured: false,
    smooth: false,
    specular: false,
    toonLevels: null
  },
  a: {
    id: "a",
    name: "Illustrated fable",
    palette: {
      void: 0x0f151d,
      ash: 0x6b7787,
      architecture: 0x2f3e51,
      rimEdge: 0xd2dce6,
      backgroundNear: 0x212b38,
      backgroundFar: 0x161d27,
      actorCoat: 0x445061,
      actorMetal: 0xe6d9c2,
      actorGlass: 0xffc879,
      enemyBody: 0x4a5464,
      enemyAccent: DANGER,
      bossShell: 0x15191f,
      bossFurnace: 0xff7a2e,
      chain: 0x6b7787,
      danger: DANGER,
      reward: 0xffc266
    },
    lights: {
      hemiSky: 0x8fb4e4,
      hemiGround: 0x1b2330,
      hemiIntensity: 1.05,
      key: { color: 0xfff0dc, intensity: 1.0, x: -12, y: 13, z: 12 },
      fill: { color: 0x6d93cc, intensity: 1.6, x: 10, y: 2, z: 13 },
      rim: { color: 0xff9a4a, intensity: 0.26, x: 4, y: 6, z: -12 },
      spot: null
    },
    fog: { enabled: true, nearScale: 0.8, farScale: 0.95, saturation: 0.9, colorOverride: null },
    postfx: {
      bloomScale: 0.68,
      vignetteScale: 1.05,
      outlineActors: false,
      outlineArchitecture: false,
      toon: false,
      toneMapped: true
    },
    shadows: false,
    glowAdditive: true,
    bevel: 0,
    depthDesaturate: 0.45,
    ambienceSaturation: 1,
    ambienceIntensityScale: 1.05,
    rigMix: 0.62,
    textured: true,
    smooth: true,
    specular: false,
    toonLevels: null
  },
  b: {
    id: "b",
    name: "Miniature theatre",
    palette: {
      void: 0x1d232b,
      ash: 0x8d8f95,
      architecture: 0x3d4550,
      rimEdge: 0xc4c9cd,
      backgroundNear: 0x2b323b,
      backgroundFar: 0x1d232b,
      actorCoat: 0x4b5361,
      actorMetal: 0xd8c79a,
      actorGlass: 0xffc470,
      enemyBody: 0x555d6a,
      enemyAccent: 0xe2543f,
      bossShell: 0x22262c,
      bossFurnace: 0xff8a3a,
      chain: 0x8d8f95,
      danger: 0xe2543f,
      reward: 0xf0b45e
    },
    lights: {
      hemiSky: 0x9aa8bb,
      hemiGround: 0x2b2520,
      hemiIntensity: 0.75,
      key: { color: 0xffe2b5, intensity: 1.55, x: -11, y: 15, z: 10 },
      fill: { color: 0x8aa0bd, intensity: 0.7, x: 8, y: 2, z: 12 },
      rim: { color: 0x9fc4ff, intensity: 1.1, x: 2, y: 8, z: -14 },
      spot: { color: 0xffdca8, intensity: 90, x: -8, y: 16, z: 9 }
    },
    fog: { enabled: true, nearScale: 1.2, farScale: 1.15, saturation: 0.75, colorOverride: null },
    postfx: {
      bloomScale: 0.55,
      vignetteScale: 0.85,
      outlineActors: false,
      outlineArchitecture: false,
      toon: false,
      toneMapped: true
    },
    shadows: true,
    glowAdditive: false,
    bevel: 0.06,
    depthDesaturate: 0.2,
    ambienceSaturation: 0.7,
    ambienceIntensityScale: 0.9,
    rigMix: 0.7,
    textured: false,
    smooth: false,
    specular: true,
    toonLevels: null
  },
  c: {
    id: "c",
    name: "Graphic monochrome",
    palette: {
      void: RAMP.void,
      ash: RAMP.ash,
      architecture: RAMP.slate,
      rimEdge: RAMP.porcelain,
      backgroundNear: RAMP.charcoal,
      backgroundFar: 0x0d1117,
      actorCoat: RAMP.slate,
      actorMetal: RAMP.porcelain,
      actorGlass: RAMP.amber,
      enemyBody: RAMP.slate,
      enemyAccent: RAMP.vermilion,
      bossShell: RAMP.charcoal,
      bossFurnace: RAMP.amber,
      chain: RAMP.ash,
      danger: RAMP.vermilion,
      reward: RAMP.amber
    },
    lights: {
      hemiSky: RAMP.ash,
      hemiGround: RAMP.void,
      hemiIntensity: 0.55,
      key: { color: 0xffffff, intensity: 0.62, x: -3, y: 14, z: 7 },
      fill: { color: RAMP.ash, intensity: 0.12, x: 9, y: 2, z: 10 },
      rim: null,
      spot: null
    },
    fog: { enabled: true, nearScale: 1, farScale: 1, saturation: 0, colorOverride: RAMP.void },
    postfx: {
      bloomScale: 0.1,
      vignetteScale: 1.5,
      outlineActors: true,
      outlineArchitecture: true,
      toon: true,
      toneMapped: false
    },
    shadows: false,
    glowAdditive: false,
    bevel: 0,
    depthDesaturate: 1,
    ambienceSaturation: 0,
    ambienceIntensityScale: 1,
    rigMix: 1,
    textured: false,
    smooth: false,
    specular: false,
    toonLevels: [0.55, 0.55, 0.55, 0.55, 0.86, 0.86, 0.86, 1.0]
  }
};

function buildProfile(seed: LookSeed, bands: number): LookProfile {
  let stone: THREE.CanvasTexture | null = null;
  let metal: THREE.CanvasTexture | null = null;
  let glass: THREE.CanvasTexture | null = null;
  let ramp: THREE.DataTexture | null = null;
  let outlineMat: THREE.Material | null = null;

  if (seed.textured) {
    stone = stoneTexture();
    metal = metalTexture();
    glass = glassTexture();
  }
  if (seed.postfx.toon) ramp = gradientMap(bands, seed.toonLevels);

  function textureFor(kind: TextureKind): THREE.CanvasTexture | null {
    if (!seed.textured) return null;
    if (kind === "stone") return stone;
    if (kind === "metal") return metal;
    if (kind === "glass") return glass;
    return null;
  }

  function colorOf(role: PaletteRole, shade?: number): number {
    return shadeHex(seed.palette[role], shade === undefined ? 1 : shade);
  }

  function material(role: PaletteRole, options?: MaterialOptions): THREE.Material {
    const opts = options === undefined ? {} : options;
    const hex = colorOf(role, opts.shade);
    const side = opts.doubleSide === true ? THREE.DoubleSide : THREE.FrontSide;
    let emissiveColor = opts.emissiveColor === undefined ? hex : opts.emissiveColor;
    if (opts.emissiveMix !== undefined) {
      const mix = Math.min(Math.max(opts.emissiveMix, 0), 1);
      scratch.setHex(hex).lerp(new THREE.Color(emissiveColor), mix);
      emissiveColor = scratch.getHex();
    }
    const emissiveIntensity =
      opts.emissiveIntensity === undefined ? 0 : opts.emissiveIntensity;
    const fog = opts.fog === undefined ? true : opts.fog;

    if (opts.unlit === true) {
      return new THREE.MeshBasicMaterial({ color: hex, side, fog });
    }

    if (seed.postfx.toon && ramp !== null) {
      return new THREE.MeshToonMaterial({
        color: hex,
        gradientMap: ramp,
        emissive: emissiveColor,
        emissiveIntensity,
        side,
        fog
      });
    }

    const map = textureFor(opts.texture === undefined ? "none" : opts.texture);
    const standard = new THREE.MeshStandardMaterial({
      color: hex,
      emissive: emissiveColor,
      emissiveIntensity,
      roughness: opts.roughness === undefined ? (seed.specular ? 0.34 : 0.8) : opts.roughness,
      metalness: opts.metalness === undefined ? (seed.specular ? 0.55 : 0.15) : opts.metalness,
      flatShading: !seed.smooth,
      side,
      fog
    });
    if (map !== null) {
      const repeat = opts.repeat === undefined ? 1 : opts.repeat;
      const cloned = map.clone();
      cloned.needsUpdate = true;
      cloned.wrapS = THREE.RepeatWrapping;
      cloned.wrapT = THREE.RepeatWrapping;
      cloned.repeat.set(repeat, repeat);
      standard.map = cloned;
    }
    return standard;
  }

  function litMaterial(role: PaletteRole, options?: MaterialOptions): LitMaterial {
    const opts = options === undefined ? {} : options;
    const lit = material(role, { ...opts, unlit: false });
    return lit as LitMaterial;
  }

  const heatStops: [number, number][] = [
    [0, seed.palette.backgroundNear],
    [0.3, seed.palette.architecture],
    [0.55, shadeHex(seed.palette.reward, 0.5)],
    [0.8, seed.palette.reward],
    [1, seed.palette.danger]
  ];
  const heatFrom = new THREE.Color();
  const heatTo = new THREE.Color();

  function heat(t: number): number {
    const v = Math.min(Math.max(t, 0), 1);
    for (let i = 1; i < heatStops.length; i++) {
      const prev = heatStops[i - 1];
      const next = heatStops[i];
      if (prev === undefined || next === undefined) continue;
      if (v > next[0]) continue;
      const span = Math.max(next[0] - prev[0], 0.0001);
      heatFrom.setHex(prev[1]);
      heatTo.setHex(next[1]);
      return heatFrom.lerp(heatTo, (v - prev[0]) / span).getHex();
    }
    return seed.palette.danger;
  }

  function glowMaterial(hex: number, opacity: number): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({
      color: hex,
      transparent: true,
      opacity: seed.glowAdditive ? opacity : opacity * 0.7,
      depthWrite: false,
      blending: seed.glowAdditive ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexColors: true,
      side: THREE.DoubleSide
    });
  }

  function boxGeometry(w: number, h: number, d: number): THREE.BufferGeometry {
    if (seed.bevel <= 0) return new THREE.BoxGeometry(w, h, d);
    return bevelGeometry(w, h, d, seed.bevel);
  }

  function outlineMaterial(): THREE.Material | null {
    if (!seed.postfx.outlineActors && !seed.postfx.outlineArchitecture) return null;
    if (outlineMat === null) {
      outlineMat = new THREE.MeshBasicMaterial({
        color: RAMP.void,
        side: THREE.BackSide,
        fog: false
      });
    }
    return outlineMat;
  }

  return {
    id: seed.id,
    name: seed.name,
    palette: seed.palette,
    ramp: RAMP,
    lights: seed.lights,
    fog: seed.fog,
    postfx: seed.postfx,
    shadows: seed.shadows,
    glowAdditive: seed.glowAdditive,
    bevel: seed.bevel,
    depthDesaturate: seed.depthDesaturate,
    ambienceSaturation: seed.ambienceSaturation,
    ambienceIntensityScale: seed.ambienceIntensityScale,
    rigMix: seed.rigMix,
    actorLayer: 1,
    material,
    litMaterial,
    heat,
    glowMaterial,
    boxGeometry,
    outlineMaterial,
    colorOf
  };
}

export function applyOutline(root: THREE.Object3D, thickness: number, profile: LookProfile): void {
  if (!profile.postfx.outlineActors) return;
  const mat = profile.outlineMaterial();
  if (mat === null) return;
  const targets: THREE.Mesh[] = [];
  root.traverse((node) => {
    const mesh = node as THREE.Mesh;
    if (mesh.isMesh === true && mesh.userData.outline !== true) targets.push(mesh);
  });
  for (const mesh of targets) {
    const shell = new THREE.Mesh(mesh.geometry, mat);
    shell.userData.outline = true;
    shell.scale.setScalar(1 + thickness);
    shell.renderOrder = -1;
    shell.layers.mask = mesh.layers.mask;
    mesh.add(shell);
  }
}

export function fadeWithDepth(hex: number, z: number, profile: LookProfile): number {
  if (profile.depthDesaturate <= 0 || z >= 0) return hex;
  const depth = Math.min(Math.abs(z) / 12, 1);
  const amount = 1 - profile.depthDesaturate * depth;
  return shadeHex(desaturate(hex, amount), 1 - depth * 0.35 * profile.depthDesaturate);
}

export function desaturateHex(hex: number, amount: number): number {
  return desaturate(hex, amount);
}

export function shadeOf(hex: number, shade: number): number {
  return shadeHex(hex, shade);
}

export function resolveLookId(): LookId {
  let id: LookId = "c";
  if (typeof location !== "undefined") {
    const raw = new URLSearchParams(location.search).get("look");
    if (raw === "a" || raw === "b" || raw === "c" || raw === "baseline") id = raw;
  }
  return id;
}

export function resolveLook(bands: number): LookProfile {
  const seed = seeds[resolveLookId()];
  return buildProfile(seed, bands);
}

export function mountLookBar(current: LookId): void {
  if (typeof document === "undefined" || typeof location === "undefined") return;
  const params = new URLSearchParams(location.search);
  if (params.get("look") === null) return;
  if (params.get("screenshot") === "1") return;
  if (document.getElementById("look-bar") !== null) return;

  const bar = document.createElement("div");
  bar.id = "look-bar";
  bar.style.cssText = [
    "position:fixed",
    "left:50%",
    "bottom:18px",
    "transform:translateX(-50%)",
    "display:flex",
    "gap:8px",
    "padding:8px 10px",
    "background:rgba(7,9,13,0.86)",
    "border:1px solid rgba(232,226,213,0.25)",
    "font-family:ui-monospace,monospace",
    "font-size:12px",
    "letter-spacing:0.08em",
    "z-index:40"
  ].join(";");

  const ids: LookId[] = ["a", "b", "c"];
  for (const id of ids) {
    const button = document.createElement("button");
    button.textContent = seeds[id].name;
    const active = id === current;
    button.style.cssText = [
      "cursor:pointer",
      "padding:6px 12px",
      "border:1px solid " + (active ? "#ffb648" : "rgba(232,226,213,0.3)"),
      "background:" + (active ? "rgba(255,182,72,0.18)" : "transparent"),
      "color:" + (active ? "#ffb648" : "#e8e2d5"),
      "font:inherit"
    ].join(";");
    button.addEventListener("click", () => {
      const next = new URLSearchParams(location.search);
      next.set("look", id);
      location.search = next.toString();
    });
    bar.appendChild(button);
  }
  document.body.appendChild(bar);
}
