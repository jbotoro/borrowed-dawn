import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { tuning } from "./tuning";
import { mountConfigurator } from "./ui/configurator";

const params = new URLSearchParams(location.search);
if (params.get("screenshot") === "1") document.body.classList.add("screenshot");

const canvas = document.getElementById("game") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05060a);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(tuning.arena.radius, 48),
  new THREE.MeshStandardMaterial({ color: 0x141a2a, roughness: 0.9, flatShading: true })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const wall = new THREE.Mesh(
  new THREE.TorusGeometry(tuning.arena.radius, 0.35, 6, 64),
  new THREE.MeshStandardMaterial({ color: 0x3b7bff, emissive: 0x2255ff, emissiveIntensity: 1.6 })
);
wall.rotation.x = Math.PI / 2;
scene.add(wall);

const player = new THREE.Mesh(
  new THREE.OctahedronGeometry(tuning.player.radius, 0),
  new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x9ad8ff, emissiveIntensity: 2.2 })
);
player.position.y = tuning.player.radius;
scene.add(player);

scene.add(new THREE.HemisphereLight(0x8fb6ff, 0x101020, 0.9));
const key = new THREE.DirectionalLight(0xffffff, 1.4);
key.position.set(8, 14, 6);
scene.add(key);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  tuning.feel.bloomStrength,
  tuning.feel.bloomRadius,
  tuning.feel.bloomThreshold
);
composer.addPass(bloom);
composer.addPass(new OutputPass());

const hud = document.createElement("div");
hud.className = "hud";
hud.textContent = "boot ok";
document.getElementById("ui")?.appendChild(hud);

mountConfigurator();

function placeCamera(): void {
  const tilt = THREE.MathUtils.degToRad(tuning.camera.tiltDeg);
  const d = tuning.camera.distance;
  camera.position.set(player.position.x, Math.sin(tilt) * d, player.position.z + Math.cos(tilt) * d);
  camera.lookAt(player.position.x, 0, player.position.z);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

let last = performance.now();
function frame(now: number): void {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  player.rotation.y += dt * 1.5;
  bloom.strength = tuning.feel.bloomStrength;
  bloom.radius = tuning.feel.bloomRadius;
  bloom.threshold = tuning.feel.bloomThreshold;
  placeCamera();
  composer.render();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

console.log("[one-more-run] boot ok", { three: THREE.REVISION });
