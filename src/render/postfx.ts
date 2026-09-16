import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import type { Tuning } from "../tuning";

export interface Postfx {
  sync(feel: Tuning["feel"]): void;
  render(): void;
  setSize(width: number, height: number): void;
}

export function createPostfx(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera
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
  composer.addPass(new OutputPass());

  return {
    sync(feel: Tuning["feel"]): void {
      bloom.strength = feel.bloomStrength;
      bloom.radius = feel.bloomRadius;
      bloom.threshold = feel.bloomThreshold;
    },
    render(): void {
      composer.render();
    },
    setSize(width: number, height: number): void {
      composer.setSize(width, height);
    }
  };
}
