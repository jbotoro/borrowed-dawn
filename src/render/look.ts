import * as THREE from "three";
import { tuning } from "../tuning";

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

export const ACTOR_LAYER = 1;

const actorLightSet = new Set<THREE.Light>();

export function registerActorLight(light: THREE.Light): void {
  actorLightSet.add(light);
}

export function actorLights(): ReadonlySet<THREE.Light> {
  return actorLightSet;
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

export const TINT_RAMP: Ramp = {
  void: 0x060911,
  charcoal: 0x121b2c,
  slate: 0x3c444e,
  ash: 0x8a867d,
  porcelain: 0xefe3cb,
  vermilion: 0xff4b35,
  amber: 0xffb648
};

const grainAmountUniform = { value: 0.35 };
const grainActorUniform = { value: 0.12 };
const grainScaleUniform = { value: 1 };
const grainContrastUniform = { value: 1.8 };
const grainNormalizerUniform = { value: 0.82 };

export function syncLookUniforms(
  textureGrain: number,
  textureScale: number,
  textureContrast: number,
  textureNormalizer: number
): void {
  const amount = Math.min(Math.max(textureGrain, 0), 1);
  grainAmountUniform.value = amount;
  grainActorUniform.value = amount * 0.34;
  grainScaleUniform.value = Math.max(textureScale, 0.05);
  grainContrastUniform.value = Math.max(textureContrast, 0);
  grainNormalizerUniform.value = Math.max(textureNormalizer, 0.05);
}

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

const GRAIN_SIZE = 256;

function hashLattice(x: number, y: number, seed: number): number {
  let h = x * 374761393 + y * 668265263 + seed * 1442695040;
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function periodicNoise(x: number, y: number, period: number, seed: number): number {
  const fx = x * period;
  const fy = y * period;
  const ix = Math.floor(fx);
  const iy = Math.floor(fy);
  const tx = smooth(fx - ix);
  const ty = smooth(fy - iy);
  const x0 = ((ix % period) + period) % period;
  const y0 = ((iy % period) + period) % period;
  const x1 = (x0 + 1) % period;
  const y1 = (y0 + 1) % period;
  const a = hashLattice(x0, y0, seed);
  const b = hashLattice(x1, y0, seed);
  const c = hashLattice(x0, y1, seed);
  const d = hashLattice(x1, y1, seed);
  const top = a + (b - a) * tx;
  const bottom = c + (d - c) * tx;
  return top + (bottom - top) * ty;
}

function fbm(x: number, y: number, seed: number, octaves: number[]): number {
  let sum = 0;
  let weight = 0;
  let amp = 1;
  for (const period of octaves) {
    sum += periodicNoise(x, y, period, seed + period) * amp;
    weight += amp;
    amp *= 0.55;
  }
  return sum / weight;
}

function wrappedDraw(ctx: CanvasRenderingContext2D, draw: (dx: number, dy: number) => void): void {
  const s = GRAIN_SIZE;
  for (let ox = -1; ox <= 1; ox++) {
    for (let oy = -1; oy <= 1; oy++) {
      draw(ox * s, oy * s);
    }
  }
}

function grainTexture(ctx: CanvasRenderingContext2D): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(ctx.canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.NoColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function stoneGrain(): THREE.CanvasTexture | null {
  const ctx = makeContext(GRAIN_SIZE);
  if (ctx === null) return null;
  const image = ctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
  const data = image.data;
  for (let y = 0; y < GRAIN_SIZE; y++) {
    for (let x = 0; x < GRAIN_SIZE; x++) {
      const u = x / GRAIN_SIZE;
      const v = y / GRAIN_SIZE;
      const coarse = fbm(u, v, 11, [4, 8, 16]);
      const fine = fbm(u, v, 29, [32, 64]);
      const value = 0.62 + coarse * 0.24 + fine * 0.14;
      const byte = Math.round(Math.min(Math.max(value, 0), 1) * 255);
      const i = (y * GRAIN_SIZE + x) * 4;
      data[i] = byte;
      data[i + 1] = byte;
      data[i + 2] = byte;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);

  ctx.lineCap = "round";
  for (let i = 0; i < 22; i++) {
    const x = hashLattice(i, 3, 91) * GRAIN_SIZE;
    const y = hashLattice(i, 7, 91) * GRAIN_SIZE;
    const len = 12 + hashLattice(i, 11, 91) * 46;
    const angle = hashLattice(i, 13, 91) * Math.PI;
    const dark = hashLattice(i, 17, 91) > 0.5;
    ctx.strokeStyle = dark ? "rgba(58,58,58,0.30)" : "rgba(235,235,235,0.22)";
    ctx.lineWidth = 0.8 + hashLattice(i, 19, 91) * 2.2;
    wrappedDraw(ctx, (dx, dy) => {
      ctx.beginPath();
      ctx.moveTo(x + dx, y + dy);
      ctx.lineTo(x + dx + Math.cos(angle) * len, y + dy + Math.sin(angle) * len);
      ctx.stroke();
    });
  }
  for (let i = 0; i < 14; i++) {
    const x = hashLattice(i, 23, 77) * GRAIN_SIZE;
    const y = hashLattice(i, 29, 77) * GRAIN_SIZE;
    const r = 2 + hashLattice(i, 31, 77) * 6;
    ctx.fillStyle = "rgba(40,40,40,0.24)";
    wrappedDraw(ctx, (dx, dy) => {
      ctx.beginPath();
      ctx.ellipse(x + dx, y + dy, r, r * 0.6, hashLattice(i, 37, 77) * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  return grainTexture(ctx);
}

function metalGrain(): THREE.CanvasTexture | null {
  const ctx = makeContext(GRAIN_SIZE);
  if (ctx === null) return null;
  const image = ctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
  const data = image.data;
  for (let y = 0; y < GRAIN_SIZE; y++) {
    for (let x = 0; x < GRAIN_SIZE; x++) {
      const u = x / GRAIN_SIZE;
      const v = y / GRAIN_SIZE;
      const streak = fbm(u * 6, v * 0.35, 5, [8, 16, 32]);
      const speck = fbm(u, v, 41, [64]);
      const value = 0.66 + streak * 0.24 + speck * 0.1;
      const byte = Math.round(Math.min(Math.max(value, 0), 1) * 255);
      const i = (y * GRAIN_SIZE + x) * 4;
      data[i] = byte;
      data[i + 1] = byte;
      data[i + 2] = byte;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);

  for (let i = 0; i < 18; i++) {
    const x = hashLattice(i, 5, 53) * GRAIN_SIZE;
    const y = hashLattice(i, 9, 53) * GRAIN_SIZE;
    const r = 2.4 + hashLattice(i, 15, 53) * 2.2;
    wrappedDraw(ctx, (dx, dy) => {
      const grad = ctx.createRadialGradient(x + dx - r * 0.3, y + dy - r * 0.3, 0, x + dx, y + dy, r);
      grad.addColorStop(0, "rgba(255,255,255,0.34)");
      grad.addColorStop(0.62, "rgba(150,150,150,0.14)");
      grad.addColorStop(1, "rgba(48,48,48,0.30)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  return grainTexture(ctx);
}

function paperGrain(): THREE.CanvasTexture | null {
  const ctx = makeContext(GRAIN_SIZE);
  if (ctx === null) return null;
  const image = ctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
  const data = image.data;
  for (let y = 0; y < GRAIN_SIZE; y++) {
    for (let x = 0; x < GRAIN_SIZE; x++) {
      const u = x / GRAIN_SIZE;
      const v = y / GRAIN_SIZE;
      const fibre = fbm(u, v, 61, [32, 64]);
      const speck = hashLattice(x, y, 97);
      const value = 0.68 + fibre * 0.18 + speck * 0.08;
      const byte = Math.round(Math.min(Math.max(value, 0), 1) * 255);
      const i = (y * GRAIN_SIZE + x) * 4;
      data[i] = byte;
      data[i + 1] = byte;
      data[i + 2] = byte;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return grainTexture(ctx);
}

const GRAIN_ROLES: Partial<Record<PaletteRole, TextureKind>> = {
  void: "stone",
  ash: "stone",
  architecture: "stone",
  backgroundNear: "stone",
  backgroundFar: "stone",
  rimEdge: "stone",
  chain: "metal",
  bossShell: "metal",
  actorMetal: "metal",
  actorCoat: "metal",
  enemyBody: "metal"
};

function injectGrain(
  material: THREE.Material,
  map: THREE.Texture,
  amount: { value: number },
  worldSpace: boolean
): void {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uGrainMap = { value: map };
    shader.uniforms.uGrainAmount = amount;
    shader.uniforms.uGrainScale = grainScaleUniform;
    shader.uniforms.uGrainContrast = grainContrastUniform;
    shader.uniforms.uGrainNormalizer = grainNormalizerUniform;
    shader.vertexShader = ("varying vec3 vGrainPos;\n" + shader.vertexShader).replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\n  vGrainPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;"
    );
    const uv = worldSpace
      ? "vec2 gUv = vGrainPos.xy * 0.11 * uGrainScale;"
      : "vec2 gUv = vGrainPos.xy * 0.35 * uGrainScale;";
    shader.fragmentShader = (
      "varying vec3 vGrainPos;\nuniform sampler2D uGrainMap;\nuniform float uGrainAmount;\nuniform float uGrainScale;\nuniform float uGrainContrast;\nuniform float uGrainNormalizer;\n" +
      shader.fragmentShader
    ).replace(
      "#include <map_fragment>",
      [
        uv,
        "vec3 gTex = texture2D( uGrainMap, gUv ).rgb / uGrainNormalizer;",
        "gTex = vec3( 1.0 ) + ( gTex - vec3( 1.0 ) ) * uGrainContrast;",
        "vec3 gMul = clamp( mix( vec3( 1.0 ), gTex, uGrainAmount ), vec3( 0.35 ), vec3( 1.6 ) );",
        "diffuseColor.rgb *= pow( gMul, vec3( 2.2 ) );"
      ].join("\n")
    );
  };
  material.customProgramCacheKey = (): string => (worldSpace ? "omr-grain-world" : "omr-grain-local");
  material.needsUpdate = true;
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

function mixHex(from: number, to: number, amount: number): number {
  const clamped = Math.min(Math.max(amount, 0), 1);
  scratch.setHex(from).lerp(new THREE.Color(to), clamped);
  return scratch.getHex();
}

const FAR_FIELD_C = mixHex(0x0b1019, TINT_RAMP.void, tuning.feel.farFieldDarken);

function luminanceOf(hex: number): number {
  const r = ((hex >> 16) & 255) / 255;
  const g = ((hex >> 8) & 255) / 255;
  const b = (hex & 255) / 255;
  return r * 0.299 + g * 0.587 + b * 0.114;
}

export function paleKey(ramp: Ramp, fogColor: number | undefined): number {
  if (fogColor === undefined) return 0;
  const floor = luminanceOf(ramp.charcoal);
  const value = luminanceOf(fogColor);
  if (value <= floor) return 0;
  const span = Math.max(luminanceOf(ramp.ash) - floor, 0.0001);
  return Math.min((value - floor) / span, 1);
}

export function hallTopColor(ramp: Ramp, amount: number, fogColor?: number): number {
  const base = mixHex(ramp.void, ramp.charcoal, amount);
  if (fogColor === undefined) return base;
  const pale = paleKey(ramp, fogColor);
  if (pale <= 0) return base;
  return mixHex(base, fogColor, Math.min(0.3 + 0.5 * pale, 1));
}

export function hallBaseColor(ramp: Ramp, fogColor?: number): number {
  if (fogColor === undefined) return ramp.void;
  const pale = paleKey(ramp, fogColor);
  if (pale <= 0) return ramp.void;
  return mixHex(ramp.void, fogColor, Math.min(0.18 + 0.3 * pale, 1));
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
  grain?: boolean;
  ramp?: Ramp;
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
      void: TINT_RAMP.void,
      ash: TINT_RAMP.ash,
      architecture: TINT_RAMP.slate,
      rimEdge: TINT_RAMP.porcelain,
      backgroundNear: TINT_RAMP.charcoal,
      backgroundFar: FAR_FIELD_C,
      actorCoat: TINT_RAMP.slate,
      actorMetal: TINT_RAMP.porcelain,
      actorGlass: TINT_RAMP.amber,
      enemyBody: TINT_RAMP.slate,
      enemyAccent: TINT_RAMP.vermilion,
      bossShell: TINT_RAMP.charcoal,
      bossFurnace: TINT_RAMP.amber,
      chain: TINT_RAMP.ash,
      danger: TINT_RAMP.vermilion,
      reward: TINT_RAMP.amber
    },
    ramp: TINT_RAMP,
    lights: {
      hemiSky: TINT_RAMP.ash,
      hemiGround: TINT_RAMP.void,
      hemiIntensity: 0.55,
      key: { color: 0xfff4e6, intensity: 0.62, x: -3, y: 14, z: 7 },
      fill: { color: 0x8fa6c4, intensity: 0.12, x: 9, y: 2, z: 10 },
      rim: null,
      spot: null
    },
    fog: { enabled: true, nearScale: 1, farScale: 1, saturation: 0, colorOverride: TINT_RAMP.void },
    postfx: {
      bloomScale: 0.1,
      vignetteScale: 1.5,
      outlineActors: false,
      outlineArchitecture: false,
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
    grain: true,
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

  let grainStone: THREE.CanvasTexture | null = null;
  let grainMetal: THREE.CanvasTexture | null = null;
  let grainPaper: THREE.CanvasTexture | null = null;

  if (seed.textured) {
    stone = stoneTexture();
    metal = metalTexture();
    glass = glassTexture();
  }
  if (seed.grain === true) {
    grainStone = stoneGrain();
    grainMetal = metalGrain();
    grainPaper = paperGrain();
  }
  if (seed.postfx.toon) ramp = gradientMap(bands, seed.toonLevels);

  function grainFor(role: PaletteRole, requested?: TextureKind): THREE.CanvasTexture | null {
    if (seed.grain !== true) return null;
    const kind = requested !== undefined && requested !== "none" ? requested : GRAIN_ROLES[role];
    if (kind === "stone") return grainStone;
    if (kind === "metal") return grainMetal;
    return null;
  }

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
      const basic = new THREE.MeshBasicMaterial({ color: hex, side, fog });
      if (grainPaper !== null && opts.fog !== false) {
        injectGrain(basic, grainPaper, grainActorUniform, false);
      }
      return basic;
    }

    if (seed.postfx.toon && ramp !== null) {
      const toon = new THREE.MeshToonMaterial({
        color: hex,
        gradientMap: ramp,
        emissive: emissiveColor,
        emissiveIntensity,
        side,
        fog
      });
      const grain = grainFor(role, opts.texture);
      if (grain !== null) injectGrain(toon, grain, grainAmountUniform, true);
      return toon;
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
        color: seed.palette.void,
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
    ramp: seed.ramp === undefined ? RAMP : seed.ramp,
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
    actorLayer: ACTOR_LAYER,
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

export function inkColor(): number {
  return seeds[resolveLookId()].palette.void;
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
