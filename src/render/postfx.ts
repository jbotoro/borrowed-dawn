import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { Pass, FullScreenQuad } from "three/addons/postprocessing/Pass.js";
import type { Tuning } from "../tuning";
import { inkColor, syncLookUniforms } from "./look";

const MAX_SHAFT_SAMPLES = 48;

const quadVertex = [
  "varying vec2 vUv;",
  "void main() {",
  "  vUv = uv;",
  "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
  "}"
].join("\n");

const eyeDepthGlsl = [
  "uniform float uNear;",
  "uniform float uFar;",
  "float eyeDepth(sampler2D tex, vec2 uv) {",
  "  float d = texture2D(tex, uv).x;",
  "  return -((uNear * uFar) / ((uFar - uNear) * d - uFar));",
  "}"
].join("\n");

const inkShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    tDepth: { value: null as THREE.Texture | null },
    uTexel: { value: new THREE.Vector2(1 / 1280, 1 / 720) },
    uThickness: { value: 1 },
    uThreshold: { value: 0.2 },
    uOpacity: { value: 0.85 },
    uScale: { value: 0.02 },
    uInk: { value: new THREE.Color(0x060911) },
    uNear: { value: 0.1 },
    uFar: { value: 400 }
  },
  vertexShader: quadVertex,
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform sampler2D tDepth;",
    "uniform vec2 uTexel;",
    "uniform float uThickness;",
    "uniform float uThreshold;",
    "uniform float uOpacity;",
    "uniform float uScale;",
    "uniform vec3 uInk;",
    "varying vec2 vUv;",
    eyeDepthGlsl,
    "void main() {",
    "  vec4 base = texture2D(tDiffuse, vUv);",
    "  vec2 o = uTexel * max(uThickness, 0.35);",
    "  float c  = eyeDepth(tDepth, vUv);",
    "  float tl = eyeDepth(tDepth, vUv + vec2(-o.x,  o.y));",
    "  float tc = eyeDepth(tDepth, vUv + vec2( 0.0,  o.y));",
    "  float tr = eyeDepth(tDepth, vUv + vec2( o.x,  o.y));",
    "  float ml = eyeDepth(tDepth, vUv + vec2(-o.x,  0.0));",
    "  float mr = eyeDepth(tDepth, vUv + vec2( o.x,  0.0));",
    "  float bl = eyeDepth(tDepth, vUv + vec2(-o.x, -o.y));",
    "  float bc = eyeDepth(tDepth, vUv + vec2( 0.0, -o.y));",
    "  float br = eyeDepth(tDepth, vUv + vec2( o.x, -o.y));",
    "  float gx = (tl + 2.0 * ml + bl) - (tr + 2.0 * mr + br);",
    "  float gy = (tl + 2.0 * tc + tr) - (bl + 2.0 * bc + br);",
    "  float mag = sqrt(gx * gx + gy * gy);",
    "  float rel = mag / max(c, 0.001);",
    "  float t0 = max(uThreshold, 0.001) * max(uScale, 0.0001);",
    "  float edge = smoothstep(t0, t0 * 4.0, rel);",
    "  gl_FragColor = vec4(mix(base.rgb, uInk, edge * uOpacity), base.a);",
    "}"
  ].join("\n")
};

const brightShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uThreshold: { value: 0.38 },
    uTexel: { value: new THREE.Vector2(1 / 640, 1 / 360) }
  },
  vertexShader: quadVertex,
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform float uThreshold;",
    "uniform vec2 uTexel;",
    "varying vec2 vUv;",
    "vec3 lit(vec2 uv) {",
    "  vec3 c = texture2D(tDiffuse, uv).rgb;",
    "  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));",
    "  float warm = smoothstep(0.02, 0.22, c.r - c.b);",
    "  return c * smoothstep(uThreshold, uThreshold + 0.4, l) * warm;",
    "}",
    "void main() {",
    "  vec2 o = uTexel * 2.6;",
    "  vec3 sum = lit(vUv) * 4.0;",
    "  sum += lit(vUv + vec2( o.x, 0.0)) * 2.0;",
    "  sum += lit(vUv + vec2(-o.x, 0.0)) * 2.0;",
    "  sum += lit(vUv + vec2(0.0,  o.y)) * 2.0;",
    "  sum += lit(vUv + vec2(0.0, -o.y)) * 2.0;",
    "  sum += lit(vUv + o) + lit(vUv - o) + lit(vUv + vec2(o.x, -o.y)) + lit(vUv + vec2(-o.x, o.y));",
    "  gl_FragColor = vec4(sum / 16.0, 1.0);",
    "}"
  ].join("\n")
};

const shaftShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    tBright: { value: null as THREE.Texture | null },
    uDir: { value: new THREE.Vector2(0, -1) },
    uStrength: { value: 0.35 },
    uDecay: { value: 0.94 },
    uSamples: { value: 24 },
    uGain: { value: 3.2 }
  },
  vertexShader: quadVertex,
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform sampler2D tBright;",
    "uniform vec2 uDir;",
    "uniform float uStrength;",
    "uniform float uDecay;",
    "uniform float uSamples;",
    "uniform float uGain;",
    "varying vec2 vUv;",
    "void main() {",
    "  vec4 base = texture2D(tDiffuse, vUv);",
    "  float n = max(uSamples, 1.0);",
    "  vec2 stepUv = uDir / n;",
    "  vec3 sum = vec3(0.0);",
    "  float w = 1.0;",
    "  float total = 0.0;",
    "  for (int i = 0; i < " + MAX_SHAFT_SAMPLES + "; i++) {",
    "    float t = float(i);",
    "    if (t >= n) break;",
    "    float k = t / n;",
    "    vec2 uv = vUv - stepUv * t;",
    "    sum += texture2D(tBright, uv).rgb * w;",
    "    total += w;",
    "    w *= uDecay;",
    "  }",
    "  sum /= max(total, 0.0001);",
    "  gl_FragColor = vec4(base.rgb + sum * uStrength * uGain, base.a);",
    "}"
  ].join("\n")
};

const dofShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    tDepth: { value: null as THREE.Texture | null },
    uFocus: { value: 15 },
    uAperture: { value: 0.012 },
    uMaxBlur: { value: 0.006 },
    uAspect: { value: 16 / 9 },
    uGain: { value: 4 },
    uTaps: { value: 16 },
    uNear: { value: 0.1 },
    uFar: { value: 400 }
  },
  vertexShader: quadVertex,
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform sampler2D tDepth;",
    "uniform float uFocus;",
    "uniform float uAperture;",
    "uniform float uMaxBlur;",
    "uniform float uAspect;",
    "uniform float uGain;",
    "uniform float uTaps;",
    "varying vec2 vUv;",
    eyeDepthGlsl,
    "void main() {",
    "  float dist = eyeDepth(tDepth, vUv);",
    "  float coc = clamp(abs(dist - uFocus) * uAperture * uGain, 0.0, 1.0) * uMaxBlur;",
    "  vec4 base = texture2D(tDiffuse, vUv);",
    "  if (coc < 0.0004) {",
    "    gl_FragColor = base;",
    "    return;",
    "  }",
    "  vec2 scale = vec2(1.0 / uAspect, 1.0);",
    "  vec3 sum = base.rgb;",
    "  float total = 1.0;",
    "  float n = max(uTaps, 1.0);",
    "  for (int i = 1; i <= 16; i++) {",
    "    float t = float(i);",
    "    if (t > n) break;",
    "    float a = t * 2.39996323;",
    "    float r = sqrt(t / n);",
    "    vec2 off = vec2(cos(a), sin(a)) * r * coc * scale;",
    "    sum += texture2D(tDiffuse, vUv + off).rgb;",
    "    total += 1.0;",
    "  }",
    "  gl_FragColor = vec4(sum / total, base.a);",
    "}"
  ].join("\n")
};

const grainShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uAmount: { value: 0.08 },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1280, 720) }
  },
  vertexShader: quadVertex,
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform float uAmount;",
    "uniform float uTime;",
    "uniform vec2 uResolution;",
    "varying vec2 vUv;",
    "float hash12(vec2 p) {",
    "  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);",
    "}",
    "void main() {",
    "  vec4 c = texture2D(tDiffuse, vUv);",
    "  if (uAmount <= 0.0001) {",
    "    gl_FragColor = c;",
    "    return;",
    "  }",
    "  float n = hash12(floor(vUv * uResolution) + vec2(uTime, uTime * 1.7)) - 0.5;",
    "  vec3 g = pow(max(c.rgb, vec3(0.0)), vec3(0.4545454));",
    "  float luma = dot(g, vec3(0.2126, 0.7152, 0.0722));",
    "  g += n * uAmount * (0.22 + 1.1 * luma * (1.0 - luma * 0.6));",
    "  gl_FragColor = vec4(pow(max(g, vec3(0.0)), vec3(2.2)), c.a);",
    "}"
  ].join("\n")
};

const vignetteShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    strength: { value: 0.55 },
    softness: { value: 0.45 }
  },
  vertexShader: quadVertex,
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform float strength;",
    "uniform float softness;",
    "varying vec2 vUv;",
    "void main() {",
    "  vec4 color = texture2D(tDiffuse, vUv);",
    "  vec2 d = vUv - vec2(0.5);",
    "  float r = length(d) * 1.41421356;",
    "  float edge = smoothstep(1.0 - softness, 1.0, r);",
    "  color.rgb *= 1.0 - edge * strength;",
    "  gl_FragColor = color;",
    "}"
  ].join("\n")
};

type Slot<T> = { value: T };

interface InkUniforms {
  tDiffuse: Slot<THREE.Texture | null>;
  tDepth: Slot<THREE.Texture | null>;
  uTexel: Slot<THREE.Vector2>;
  uThickness: Slot<number>;
  uThreshold: Slot<number>;
  uOpacity: Slot<number>;
  uScale: Slot<number>;
  uInk: Slot<THREE.Color>;
  uNear: Slot<number>;
  uFar: Slot<number>;
}

interface BrightUniforms {
  tDiffuse: Slot<THREE.Texture | null>;
  uThreshold: Slot<number>;
  uTexel: Slot<THREE.Vector2>;
}

interface ShaftUniforms {
  tDiffuse: Slot<THREE.Texture | null>;
  tBright: Slot<THREE.Texture | null>;
  uDir: Slot<THREE.Vector2>;
  uStrength: Slot<number>;
  uDecay: Slot<number>;
  uSamples: Slot<number>;
  uGain: Slot<number>;
}

interface DofUniforms {
  tDiffuse: Slot<THREE.Texture | null>;
  tDepth: Slot<THREE.Texture | null>;
  uFocus: Slot<number>;
  uAperture: Slot<number>;
  uMaxBlur: Slot<number>;
  uAspect: Slot<number>;
  uGain: Slot<number>;
  uTaps: Slot<number>;
  uNear: Slot<number>;
  uFar: Slot<number>;
}

interface GrainUniforms {
  tDiffuse: Slot<THREE.Texture | null>;
  uAmount: Slot<number>;
  uTime: Slot<number>;
  uResolution: Slot<THREE.Vector2>;
}

const copyShader = {
  uniforms: { tDiffuse: { value: null as THREE.Texture | null } },
  vertexShader: quadVertex,
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "varying vec2 vUv;",
    "void main() {",
    "  gl_FragColor = texture2D(tDiffuse, vUv);",
    "}"
  ].join("\n")
};

class ScenePass extends Pass {
  readonly target: THREE.WebGLRenderTarget;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.Camera;
  private readonly copyMaterial: THREE.ShaderMaterial;
  private readonly copyUniforms: Slot<THREE.Texture | null>;
  private readonly quad: FullScreenQuad;

  constructor(scene: THREE.Scene, camera: THREE.Camera, width: number, height: number) {
    super();
    this.needsSwap = false;
    this.scene = scene;
    this.camera = camera;
    this.target = new THREE.WebGLRenderTarget(width, height, {
      type: THREE.HalfFloatType,
      depthTexture: makeDepthTexture(width, height)
    });
    this.copyMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(copyShader.uniforms),
      vertexShader: copyShader.vertexShader,
      fragmentShader: copyShader.fragmentShader,
      depthTest: false,
      depthWrite: false
    });
    this.copyUniforms = this.copyMaterial.uniforms.tDiffuse as Slot<THREE.Texture | null>;
    this.copyUniforms.value = this.target.texture;
    this.quad = new FullScreenQuad(this.copyMaterial);
  }

  get depth(): THREE.Texture | null {
    return this.target.depthTexture ?? null;
  }

  override setSize(width: number, height: number): void {
    this.target.setSize(Math.max(width, 2), Math.max(height, 2));
  }

  override render(
    renderer: THREE.WebGLRenderer,
    writeBuffer: THREE.WebGLRenderTarget,
    readBuffer: THREE.WebGLRenderTarget
  ): void {
    renderer.setRenderTarget(this.target);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    this.quad.render(renderer);
  }

  override dispose(): void {
    this.target.dispose();
    this.copyMaterial.dispose();
    this.quad.dispose();
  }
}

class ShaftPass extends Pass {
  private readonly bright: THREE.WebGLRenderTarget;
  private readonly brightMaterial: THREE.ShaderMaterial;
  private readonly shaftMaterial: THREE.ShaderMaterial;
  private readonly brightUniforms: BrightUniforms;
  private readonly shaftUniforms: ShaftUniforms;
  private readonly brightQuad: FullScreenQuad;
  private readonly shaftQuad: FullScreenQuad;
  private readonly scratchDir = new THREE.Vector2();
  private width = 1280;
  private height = 720;
  private quality = 1;

  constructor(width: number, height: number) {
    super();
    this.needsSwap = true;
    this.width = width;
    this.height = height;
    this.bright = new THREE.WebGLRenderTarget(
      Math.max(Math.round(width * 0.25), 16),
      Math.max(Math.round(height * 0.25), 16),
      { type: THREE.HalfFloatType, depthBuffer: false, stencilBuffer: false }
    );
    this.bright.texture.minFilter = THREE.LinearFilter;
    this.bright.texture.magFilter = THREE.LinearFilter;
    this.bright.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.bright.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.brightMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(brightShader.uniforms),
      vertexShader: brightShader.vertexShader,
      fragmentShader: brightShader.fragmentShader,
      depthTest: false,
      depthWrite: false
    });
    this.shaftMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(shaftShader.uniforms),
      vertexShader: shaftShader.vertexShader,
      fragmentShader: shaftShader.fragmentShader,
      depthTest: false,
      depthWrite: false
    });
    this.brightUniforms = this.brightMaterial.uniforms as unknown as BrightUniforms;
    this.shaftUniforms = this.shaftMaterial.uniforms as unknown as ShaftUniforms;
    this.brightQuad = new FullScreenQuad(this.brightMaterial);
    this.shaftQuad = new FullScreenQuad(this.shaftMaterial);
  }

  configure(feel: Tuning["feel"], quality: number): void {
    this.brightUniforms.uThreshold.value = Math.max(feel.shaftThreshold, 0.001);
    this.shaftUniforms.uStrength.value = feel.shaftStrength;
    this.shaftUniforms.uGain.value = Math.max(feel.shaftGain, 0);
    this.shaftUniforms.uDecay.value = Math.min(Math.max(feel.shaftDecay, 0.5), 0.999);
    this.shaftUniforms.uSamples.value = Math.min(
      Math.max(Math.round(feel.shaftSamples * quality), 4),
      MAX_SHAFT_SAMPLES
    );
    this.applyDirection(feel.shaftDirX, feel.shaftLength);
    this.enabled = feel.shaftStrength > 0.0005;
    if (quality !== this.quality) {
      this.quality = quality;
      this.resizeBright();
    }
  }

  private applyDirection(dirX: number, length: number): void {
    const aspect = this.width / Math.max(this.height, 1);
    const dir = this.scratchDir.set(dirX, -1).normalize().multiplyScalar(Math.max(length, 0));
    dir.x /= Math.max(aspect, 0.0001);
    this.shaftUniforms.uDir.value.copy(dir);
  }

  private resizeBright(): void {
    const scale = 0.25 * Math.min(Math.max(this.quality, 0.25), 1);
    const bw = Math.max(Math.round(this.width * scale), 16);
    const bh = Math.max(Math.round(this.height * scale), 16);
    this.bright.setSize(bw, bh);
    this.brightUniforms.uTexel.value.set(1 / bw, 1 / bh);
  }

  override setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.resizeBright();
  }

  override render(
    renderer: THREE.WebGLRenderer,
    writeBuffer: THREE.WebGLRenderTarget,
    readBuffer: THREE.WebGLRenderTarget
  ): void {
    const previous = renderer.getRenderTarget();
    this.brightUniforms.tDiffuse.value = readBuffer.texture;
    renderer.setRenderTarget(this.bright);
    renderer.clear();
    this.brightQuad.render(renderer);

    this.shaftUniforms.tDiffuse.value = readBuffer.texture;
    this.shaftUniforms.tBright.value = this.bright.texture;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
    }
    this.shaftQuad.render(renderer);
    renderer.setRenderTarget(previous);
  }

  override dispose(): void {
    this.bright.dispose();
    this.brightMaterial.dispose();
    this.shaftMaterial.dispose();
    this.brightQuad.dispose();
    this.shaftQuad.dispose();
  }
}

export interface Postfx {
  sync(feel: Tuning["feel"]): void;
  render(): void;
  setSize(width: number, height: number): void;
}

function makeDepthTexture(width: number, height: number): THREE.DepthTexture {
  const depth = new THREE.DepthTexture(width, height);
  depth.format = THREE.DepthFormat;
  depth.type = THREE.UnsignedIntType;
  depth.minFilter = THREE.NearestFilter;
  depth.magFilter = THREE.NearestFilter;
  return depth;
}

export function createPostfx(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  bloomScale: number,
  vignetteScale: number
): Postfx {
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const width = Math.max(Math.round(size.x), 2);
  const height = Math.max(Math.round(size.y), 2);

  const composer = new EffectComposer(renderer);

  const scenePass = new ScenePass(scene, camera, width, height);
  composer.addPass(scenePass);

  const ink = new ShaderPass(inkShader);
  const inkUniforms = ink.uniforms as unknown as InkUniforms;
  inkUniforms.uInk.value.setHex(inkColor());
  inkUniforms.tDepth.value = scenePass.depth;
  composer.addPass(ink);

  const shafts = new ShaftPass(width, height);
  shafts.setSize(width, height);
  composer.addPass(shafts);

  const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.9, 0.4, 0.7);
  composer.addPass(bloom);

  const dof = new ShaderPass(dofShader);
  const dofUniforms = dof.uniforms as unknown as DofUniforms;
  dofUniforms.tDepth.value = scenePass.depth;
  composer.addPass(dof);

  const grain = new ShaderPass(grainShader);
  const grainUniforms = grain.uniforms as unknown as GrainUniforms;
  composer.addPass(grain);

  const vignette = new ShaderPass(vignetteShader);
  const vignetteStrength = vignette.uniforms.strength as { value: number };
  const vignetteSoftness = vignette.uniforms.softness as { value: number };
  composer.addPass(vignette);

  composer.addPass(new OutputPass());

  const perspective = camera as THREE.PerspectiveCamera;
  let viewWidth = width;
  let viewHeight = height;

  function applySize(w: number, h: number): void {
    viewWidth = Math.max(w, 2);
    viewHeight = Math.max(h, 2);
    inkUniforms.uTexel.value.set(1 / viewWidth, 1 / viewHeight);
    grainUniforms.uResolution.value.set(viewWidth, viewHeight);
    dofUniforms.uAspect.value = viewWidth / viewHeight;
  }

  applySize(width, height);

  return {
    sync(feel: Tuning["feel"]): void {
      syncLookUniforms(
        feel.textureGrain,
        feel.textureScale,
        feel.textureContrast,
        feel.textureNormalizer
      );

      const quality = Math.min(Math.max(feel.fxQuality, 0.25), 1);
      const near = perspective.near === undefined ? 0.1 : perspective.near;
      const far = perspective.far === undefined ? 400 : perspective.far;

      inkUniforms.uThickness.value = Math.max(feel.inkThickness, 0);
      inkUniforms.uThreshold.value = Math.max(feel.inkThreshold, 0.001);
      inkUniforms.uOpacity.value = Math.min(Math.max(feel.inkOpacity, 0), 1);
      inkUniforms.uScale.value = Math.max(feel.inkThresholdScale, 0.0001);
      inkUniforms.uNear.value = near;
      inkUniforms.uFar.value = far;
      ink.enabled = feel.inkOpacity > 0.0005 && feel.inkThickness > 0;

      shafts.configure(feel, quality);

      bloom.strength = feel.bloomStrength * bloomScale;
      bloom.radius = feel.bloomRadius;
      bloom.threshold = feel.bloomThreshold;

      dofUniforms.uFocus.value = Math.max(perspective.position.z, 0.1);
      dofUniforms.uAperture.value = Math.max(feel.dofAperture, 0);
      dofUniforms.uMaxBlur.value = Math.max(feel.dofMaxBlur, 0);
      dofUniforms.uGain.value = Math.max(feel.dofGain, 0);
      dofUniforms.uTaps.value = quality < 0.999 ? 8 : 16;
      dofUniforms.uNear.value = near;
      dofUniforms.uFar.value = far;
      dof.enabled = feel.dofMaxBlur > 0.00001 && feel.dofAperture > 0;

      grainUniforms.uAmount.value = Math.max(feel.grainAmount, 0);
      grainUniforms.uTime.value = (performance.now() * 0.06) % 4096;
      grain.enabled = feel.grainAmount > 0.0005;

      vignetteStrength.value = feel.vignetteStrength * vignetteScale;
      vignetteSoftness.value = Math.max(feel.vignetteSoftness, 0.01);
    },
    render(): void {
      composer.render();
    },
    setSize(w: number, h: number): void {
      composer.setSize(w, h);
      inkUniforms.tDepth.value = scenePass.depth;
      dofUniforms.tDepth.value = scenePass.depth;
      applySize(w, h);
    }
  };
}
