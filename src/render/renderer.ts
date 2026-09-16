import * as THREE from "three";

export interface RendererHandle {
  renderer: THREE.WebGLRenderer;
  resize(): void;
}

export function createRenderer(canvas: HTMLCanvasElement): RendererHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  return {
    renderer,
    resize(): void {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  };
}
