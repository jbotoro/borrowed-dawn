import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import type { Tuning } from "../tuning";

const vignetteShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    strength: { value: 0.55 },
    softness: { value: 0.45 }
  },
  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
    "  vUv = uv;",
    "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
    "}"
  ].join("\n"),
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

export interface Postfx {
  sync(feel: Tuning["feel"]): void;
  render(): void;
  setSize(width: number, height: number): void;
}

export function createPostfx(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  bloomScale: number,
  vignetteScale: number
): Postfx {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.9,
    0.4,
    0.7
  );
  composer.addPass(bloom);

  const vignette = new ShaderPass(vignetteShader);
  const vignetteStrength = vignette.uniforms.strength as { value: number };
  const vignetteSoftness = vignette.uniforms.softness as { value: number };
  composer.addPass(vignette);

  composer.addPass(new OutputPass());

  return {
    sync(feel: Tuning["feel"]): void {
      bloom.strength = feel.bloomStrength * bloomScale;
      bloom.radius = feel.bloomRadius;
      bloom.threshold = feel.bloomThreshold;
      vignetteStrength.value = feel.vignetteStrength * vignetteScale;
      vignetteSoftness.value = Math.max(feel.vignetteSoftness, 0.01);
    },
    render(): void {
      composer.render();
    },
    setSize(width: number, height: number): void {
      composer.setSize(width, height);
    }
  };
}
