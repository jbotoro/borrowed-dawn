import type { Room, RoomAmbience, Vec2 } from "../game/types";
import { roomNames } from "./strings";

const VOID = 0x07090d;
const CHARCOAL = 0x151b24;
const ASH = 0x7c8794;
const PORCELAIN = 0xe8e2d5;
const EMBER = 0xffb648;
const PALE_HAZE = 0x8fa3b6;
const COOL_KEY = 0xdfe9f2;
const DAWN_HAZE = 0x7d7360;
const DAWN_KEY = 0xfff2dc;

const landingAmbience: RoomAmbience = {
  fogColor: VOID,
  fogNear: 13,
  fogFar: 34,
  hemiSky: ASH,
  hemiGround: VOID,
  hemiIntensity: 0.55,
  keyColor: PORCELAIN,
  keyIntensity: 0.62,
  fillColor: ASH,
  fillIntensity: 0.12,
  emberDensity: 0.25
};

const galleryAmbience: RoomAmbience = {
  fogColor: VOID,
  fogNear: 11,
  fogFar: 28,
  hemiSky: ASH,
  hemiGround: VOID,
  hemiIntensity: 0.42,
  keyColor: PORCELAIN,
  keyIntensity: 0.7,
  fillColor: ASH,
  fillIntensity: 0.08,
  emberDensity: 0.4
};

const cacheAmbience: RoomAmbience = {
  fogColor: VOID,
  fogNear: 8,
  fogFar: 22,
  hemiSky: ASH,
  hemiGround: CHARCOAL,
  hemiIntensity: 0.5,
  keyColor: PORCELAIN,
  keyIntensity: 0.55,
  fillColor: EMBER,
  fillIntensity: 0.14,
  emberDensity: 0.35
};

const vaultAmbience: RoomAmbience = {
  fogColor: VOID,
  fogNear: 11,
  fogFar: 26,
  hemiSky: ASH,
  hemiGround: CHARCOAL,
  hemiIntensity: 0.58,
  keyColor: PORCELAIN,
  keyIntensity: 0.66,
  fillColor: EMBER,
  fillIntensity: 0.26,
  emberDensity: 0.55
};

const reserveAmbience: RoomAmbience = {
  fogColor: PALE_HAZE,
  fogNear: 8,
  fogFar: 22,
  hemiSky: PORCELAIN,
  hemiGround: ASH,
  hemiIntensity: 1.0,
  keyColor: COOL_KEY,
  keyIntensity: 0.9,
  fillColor: EMBER,
  fillIntensity: 0.1,
  emberDensity: 0.12
};

const sunwellAmbience: RoomAmbience = {
  fogColor: DAWN_HAZE,
  fogNear: 6,
  fogFar: 17,
  hemiSky: PORCELAIN,
  hemiGround: ASH,
  hemiIntensity: 1.3,
  keyColor: DAWN_KEY,
  keyIntensity: 1.15,
  fillColor: EMBER,
  fillIntensity: 0.5,
  emberDensity: 0.2
};

const belfryAmbience: RoomAmbience = {
  fogColor: VOID,
  fogNear: 12,
  fogFar: 36,
  hemiSky: ASH,
  hemiGround: VOID,
  hemiIntensity: 0.4,
  keyColor: PORCELAIN,
  keyIntensity: 0.6,
  fillColor: EMBER,
  fillIntensity: 0.12,
  emberDensity: 0.9
};

const landing: Room = {
  id: "landing",
  name: roomNames.landing,
  bounds: { x: 0, y: 0, w: 34, h: 16 },
  solids: [
    { x: -2, y: -2, w: 38, h: 2 },
    { x: -2, y: 0, w: 2, h: 18 },
    { x: 34, y: 0, w: 2, h: 18 },
    { x: -2, y: 16, w: 38, h: 2 },
    { x: 5.2, y: 0.4, w: 2.4, h: 0.16 },
    { x: 11.2, y: 0, w: 1.35, h: 1.2 },
    { x: 11.9, y: 1.2, w: 1.2, h: 1.05 },
    { x: 15.4, y: 0, w: 4.4, h: 0.9 },
    { x: 21.4, y: 1.3, w: 1.0, h: 0.28 },
    { x: 22.5, y: 2.1, w: 1.0, h: 0.28 },
    { x: 23.6, y: 2.9, w: 1.0, h: 0.28 },
    { x: 24.7, y: 3.7, w: 1.0, h: 0.28 },
    { x: 25.8, y: 4.5, w: 1.0, h: 0.28 },
    { x: 27.0, y: 4.9, w: 7.0, h: 0.5 }
  ],
  doors: [
    {
      rect: { x: 33.6, y: 5.4, w: 1.2, h: 2.8 },
      to: "gallery",
      entry: { x: 2.9, y: 0 },
      entryFacing: 1
    },
    {
      rect: { x: 33.6, y: 0, w: 1.2, h: 3.4 },
      to: "belfry",
      entry: { x: 3, y: 0 },
      entryFacing: 1
    },
    {
      rect: { x: -0.6, y: 0, w: 1.2, h: 2.8 },
      to: "sunwell",
      entry: { x: 2.8, y: 0 },
      entryFacing: 1
    }
  ],
  enemies: [],
  pickups: [],
  gates: [
    { id: "belfry-shortcut", rect: { x: 32.4, y: 0, w: 1.0, h: 3.4 }, openWhen: "bossApproach" },
    { id: "sunwell-shutter", rect: { x: 0.6, y: 0, w: 1.0, h: 2.8 }, openWhen: "bossDefeated" }
  ],
  breakables: [],
  checkpoint: { x: 2.5, y: 0 },
  ambience: landingAmbience,
  music: "cinder",
  decor: [
    { kind: "glow", rect: { x: 17.7, y: 4.4, w: 7, h: 7 }, z: -14.5, color: EMBER, intensity: 0.3 },
    { kind: "block", rect: { x: 12.4, y: 0, w: 3.2, h: 19 }, z: -13 },
    { kind: "block", rect: { x: 27, y: 0, w: 3.2, h: 19 }, z: -13 },
    { kind: "block", rect: { x: 15.6, y: 0, w: 11.4, h: 3.4 }, z: -13 },
    { kind: "block", rect: { x: 15.6, y: 13.2, w: 11.4, h: 5.8 }, z: -13 },
    { kind: "bell", rect: { x: 17.3, y: 4.6, w: 7.8, h: 7.6 }, z: -12 },
    { kind: "chain", rect: { x: 20.95, y: 12.2, w: 0.5, h: 1.2 }, z: -12 },
    { kind: "block", rect: { x: -3, y: 0, w: 13, h: 10.5 }, z: -13 },
    { kind: "block", rect: { x: 30.2, y: 0, w: 12, h: 19 }, z: -13 },
    { kind: "chain", rect: { x: 8.2, y: 8, w: 0.3, h: 11 }, z: -8 },
    { kind: "chain", rect: { x: 32.6, y: 6, w: 0.3, h: 13 }, z: -8 },
    { kind: "embers", rect: { x: 20, y: 0, w: 14, h: 9 }, z: -5, intensity: 0.5 },
    { kind: "wall", rect: { x: 0, y: 0, w: 34, h: 3.1 }, z: -4.2 },
    { kind: "pillar", rect: { x: 3.9, y: 0, w: 1.0, h: 9 }, z: -3.4 },
    { kind: "pillar", rect: { x: 13.3, y: 0, w: 1.0, h: 9 }, z: -3.4 },
    { kind: "arch", rect: { x: 5.3, y: 3.1, w: 7.6, h: 6.4 }, z: -3.6 },
    { kind: "arch", rect: { x: 15.4, y: 3.1, w: 5.4, h: 5.4 }, z: -3.6 },
    { kind: "pillar", rect: { x: 21.2, y: 0, w: 1.0, h: 9 }, z: -3.4 },
    { kind: "boiler", rect: { x: 7.6, y: 0, w: 2.4, h: 1.5 }, z: -2.2 },
    { kind: "lamp", rect: { x: 0, y: 0, w: 3.1, h: 3.7 }, z: -0.9 },
    { kind: "bench", rect: { x: 5.2, y: 0, w: 2.4, h: 0.55 }, z: 0 },
    { kind: "crate", rect: { x: 11.2, y: 0, w: 2.0, h: 2.25 }, z: 0 },
    { kind: "beam", rect: { x: 15.4, y: 0, w: 4.4, h: 16 }, z: 0, intensity: 1 },
    { kind: "stair", rect: { x: 21.2, y: 0, w: 5.8, h: 4.8 }, z: 0 },
    { kind: "gallery", rect: { x: 27.0, y: 0, w: 7.0, h: 5.4 }, z: 0 },
    { kind: "rubble", rect: { x: 28.2, y: 0, w: 3.4, h: 1.5 }, z: -1.6 }
  ],
  waypoints: [
    { x: 2.5, y: 0 },
    { x: 9, y: 0 },
    { x: 14, y: 0 },
    { x: 20.5, y: 0 },
    { x: 21.9, y: 1.58 },
    { x: 23.0, y: 2.38 },
    { x: 24.1, y: 3.18 },
    { x: 25.2, y: 3.98 },
    { x: 26.3, y: 4.78 },
    { x: 28.5, y: 5.4 },
    { x: 33.2, y: 5.4 }
  ]
};

const gallery: Room = {
  id: "gallery",
  name: roomNames.gallery,
  bounds: { x: 0, y: 0, w: 40, h: 16 },
  solids: [
    { x: -2, y: -0.6, w: 44, h: 0.6 },
    { x: -2, y: 0, w: 2, h: 18 },
    { x: 40, y: 0, w: 2, h: 18 },
    { x: -2, y: 16, w: 44, h: 2 },
    { x: 5.4, y: 0.44, w: 0.95, h: 0.28 },
    { x: 6.45, y: 1.16, w: 0.95, h: 0.28 },
    { x: 7.5, y: 1.88, w: 4.0, h: 0.28 },
    { x: 11.6, y: 2.6, w: 0.95, h: 0.28 },
    { x: 12.65, y: 3.32, w: 0.95, h: 0.28 },
    { x: 13.6, y: 3.0, w: 13.9, h: 0.6 },
    { x: 27.5, y: 2.42, w: 0.9, h: 0.28 },
    { x: 28.5, y: 1.52, w: 0.9, h: 0.28 },
    { x: 29.5, y: 0.62, w: 0.9, h: 0.28 },
    { x: 7.6, y: 3.8, w: 1.3, h: 0.4 },
    { x: 6.22, y: 4.65, w: 1.38, h: 0.4 },
    { x: 4.84, y: 5.5, w: 1.38, h: 0.4 },
    { x: 3.44, y: 6.35, w: 1.4, h: 0.4 },
    { x: 2.06, y: 7.2, w: 1.38, h: 0.4 },
    { x: 0, y: 6.6, w: 2.06, h: 1.0 },
    { x: 0, y: 9.6, w: 3.4, h: 1.2 },
    { x: 15.0, y: 4.9, w: 1.6, h: 0.3 },
    { x: 17.8, y: 6.4, w: 3.8, h: 0.45 },
    { x: 24.0, y: 7.7, w: 2.2, h: 0.35 },
    { x: 27.8, y: 8.65, w: 3.4, h: 0.35 },
    { x: 33.4, y: 9.15, w: 6.6, h: 0.6 }
  ],
  doors: [
    {
      rect: { x: -0.6, y: 0, w: 1.2, h: 2.6 },
      to: "landing",
      entry: { x: 31.2, y: 5.4 },
      entryFacing: -1
    },
    {
      rect: { x: 0.9, y: 9.0, w: 1.6, h: 0.6 },
      to: "cache",
      entry: { x: 3.4, y: 0 },
      entryFacing: 1
    },
    {
      rect: { x: 39.4, y: 0, w: 1.2, h: 2.8 },
      to: "belfry",
      entry: { x: 1.7, y: 6.4 },
      entryFacing: 1
    },
    {
      rect: { x: 39.4, y: 9.75, w: 1.2, h: 2.55 },
      to: "vault",
      entry: { x: 1.6, y: 0 },
      entryFacing: 1
    }
  ],
  enemies: [
    { id: 1, kind: "guard", x: 25, y: 3.6, patrolMinX: 23, patrolMaxX: 27, facing: -1 },
    { id: 2, kind: "stomper", x: 34, y: 0, patrolMinX: 31, patrolMaxX: 38, facing: -1 },
    { id: 4, kind: "lamplighter", x: 17.6, y: 6.9, patrolMinX: 15.2, patrolMaxX: 21.0, facing: -1 }
  ],
  pickups: [],
  gates: [],
  breakables: [],
  ambience: galleryAmbience,
  music: "cinder",
  decor: [
    { kind: "glow", rect: { x: 28.6, y: -7.5, w: 3.8, h: 3.8 }, z: -13.3, color: EMBER, intensity: 0.4 },
    { kind: "arch", rect: { x: 4, y: -9, w: 6.6, h: 9 }, z: -13, intensity: 1 },
    { kind: "arch", rect: { x: 15, y: -9, w: 6.6, h: 9 }, z: -13, intensity: 1 },
    { kind: "arch", rect: { x: 26, y: -9, w: 6.6, h: 9 }, z: -13, intensity: 1 },
    { kind: "block", rect: { x: -3, y: -9, w: 6, h: 9 }, z: -13.2 },
    { kind: "block", rect: { x: 11.6, y: -9, w: 2.4, h: 9 }, z: -13.2 },
    { kind: "block", rect: { x: 22.6, y: -9, w: 2.4, h: 9 }, z: -13.2 },
    { kind: "block", rect: { x: 33.6, y: -9, w: 9, h: 9 }, z: -13.2 },
    { kind: "pillar", rect: { x: 6, y: 0, w: 1.6, h: 19 }, z: -12.5 },
    { kind: "pillar", rect: { x: 24, y: 0, w: 1.6, h: 19 }, z: -12.5 },
    { kind: "block", rect: { x: 34, y: 0, w: 9, h: 19 }, z: -13 },
    { kind: "bell", rect: { x: 35.4, y: 3, w: 8, h: 8 }, z: -12 },
    { kind: "chain", rect: { x: 9.4, y: 6.5, w: 0.3, h: 9.5 }, z: -8 },
    { kind: "chain", rect: { x: 32.4, y: 3.6, w: 0.3, h: 12.4 }, z: -8 },
    { kind: "pillar", rect: { x: 12.5, y: 0, w: 1.1, h: 12 }, z: -3.4 },
    { kind: "pillar", rect: { x: 31.4, y: 0, w: 1.1, h: 12 }, z: -3.4 },
    { kind: "pillar", rect: { x: 36, y: 0, w: 1.1, h: 10.5 }, z: -3.2 },
    { kind: "winch", rect: { x: 17.1, y: 4.6, w: 5.2, h: 10.6 }, z: -2.8 },
    { kind: "chain", rect: { x: 22.9, y: 5.4, w: 0.3, h: 10.6 }, z: -2.8 },
    { kind: "pipe", rect: { x: 32.6, y: 4.6, w: 3.4, h: 0.3 }, z: -2.6, intensity: 1 },
    { kind: "boiler", rect: { x: 33.0, y: 0, w: 2.6, h: 1.5 }, z: -2.4 },
    { kind: "rack", rect: { x: 30.9, y: 1.0, w: 2.2, h: 2.2 }, z: -2.2 },
    { kind: "furnace", rect: { x: 36.0, y: 0.6, w: 1.4, h: 2.4 }, z: -2.2, intensity: 0.6 },
    { kind: "glow", rect: { x: 28.4, y: 0.4, w: 5.2, h: 5.2 }, z: -3.4, color: EMBER, intensity: 0.4 },
    { kind: "embers", rect: { x: 28, y: 0, w: 12, h: 10 }, z: -2.2, intensity: 0.8 },
    { kind: "pillar", rect: { x: 1.7, y: 0, w: 0.7, h: 6.6 }, z: -2.0 },
    { kind: "pillar", rect: { x: 7.05, y: 2.16, w: 0.5, h: 1.5 }, z: -2.0 },
    { kind: "embers", rect: { x: 4, y: 0, w: 22, h: 12 }, z: -2.4, intensity: 0.15 },
    { kind: "rubble", rect: { x: 18.6, y: 0, w: 3.2, h: 1.2 }, z: -1.6 },
    { kind: "glow", rect: { x: 38.2, y: 9.9, w: 3.2, h: 3.2 }, z: -1.2, color: EMBER, intensity: 0.2 },
    { kind: "embers", rect: { x: 39.4, y: 0, w: 2.4, h: 5 }, z: -0.3, intensity: 1 },
    { kind: "lamp", rect: { x: 7.3, y: 2.16, w: 1.2, h: 1.4 }, z: -0.9 },
    { kind: "wall", rect: { x: 0, y: 6.6, w: 2.06, h: 1.0 }, z: 0 },
    { kind: "wall", rect: { x: 0, y: 9.6, w: 3.4, h: 1.2 }, z: 0, intensity: 1 },
    { kind: "stair", rect: { x: 2.06, y: 3.75, w: 6.84, h: 3.9 }, z: 0 },
    { kind: "stair", rect: { x: 5.4, y: 0, w: 8.2, h: 3.6 }, z: 0 },
    { kind: "gallery", rect: { x: 13.6, y: 0, w: 13.9, h: 3.6 }, z: 0 },
    { kind: "stair", rect: { x: 27.5, y: 0, w: 2.9, h: 3.6 }, z: 0 },
    { kind: "chain", rect: { x: 15.15, y: 5.2, w: 0.3, h: 10.6 }, z: -0.9 },
    { kind: "chain", rect: { x: 16.15, y: 5.2, w: 0.3, h: 10.6 }, z: -0.9 },
    { kind: "beam", rect: { x: 15.0, y: 4.9, w: 1.6, h: 1.2 }, z: 0 },
    { kind: "chain", rect: { x: 17.95, y: 6.85, w: 0.3, h: 8.95 }, z: -0.9 },
    { kind: "chain", rect: { x: 21.15, y: 6.85, w: 0.3, h: 8.95 }, z: -0.9 },
    { kind: "beam", rect: { x: 17.8, y: 6.4, w: 3.8, h: 1.2 }, z: 0 },
    { kind: "chain", rect: { x: 24.15, y: 8.05, w: 0.3, h: 7.75 }, z: -0.9 },
    { kind: "chain", rect: { x: 25.75, y: 8.05, w: 0.3, h: 7.75 }, z: -0.9 },
    { kind: "beam", rect: { x: 24.0, y: 7.7, w: 2.2, h: 1.2 }, z: 0 },
    { kind: "chain", rect: { x: 27.95, y: 9.0, w: 0.3, h: 6.8 }, z: -0.9 },
    { kind: "chain", rect: { x: 30.75, y: 9.0, w: 0.3, h: 6.8 }, z: -0.9 },
    { kind: "beam", rect: { x: 27.8, y: 8.65, w: 3.4, h: 1.2 }, z: 0 },
    { kind: "gallery", rect: { x: 33.4, y: 0, w: 6.6, h: 9.75 }, z: 0 },
    { kind: "veil", rect: { x: 40, y: 9.75, w: 8, h: 3.45 }, z: 0 }
  ],
  waypoints: [
    { x: 3, y: 0 },
    { x: 5.9, y: 0.72 },
    { x: 6.95, y: 1.44 },
    { x: 10.5, y: 2.16 },
    { x: 12.1, y: 2.88 },
    { x: 13.2, y: 3.6 },
    { x: 18.5, y: 3.6 },
    { x: 25.5, y: 3.6 },
    { x: 27.9, y: 2.7 },
    { x: 28.9, y: 1.8 },
    { x: 29.9, y: 0.9 },
    { x: 33.5, y: 0 },
    { x: 38.6, y: 0 }
  ]
};

const cache: Room = {
  id: "cache",
  name: roomNames.cache,
  bounds: { x: 0, y: 0, w: 24, h: 12 },
  solids: [
    { x: -2, y: -2, w: 28, h: 2 },
    { x: -2, y: 0, w: 2, h: 14 },
    { x: 24, y: 0, w: 2, h: 14 },
    { x: -2, y: 12, w: 28, h: 2 },
    { x: 13.5, y: 0, w: 2.5, h: 0.8 }
  ],
  doors: [
    {
      rect: { x: 1.0, y: 0, w: 1.6, h: 0.5 },
      to: "gallery",
      entry: { x: 1.7, y: 7.6 },
      entryFacing: 1
    }
  ],
  enemies: [{ id: 3, kind: "guard", x: 10, y: 0, patrolMinX: 7, patrolMaxX: 13, facing: 1 }],
  pickups: [{ id: "longwick", kind: "longwick", x: 20.5, y: 1 }],
  gates: [],
  breakables: [{ id: "cache-wall", rect: { x: 17, y: 0, w: 1.2, h: 4 }, health: 3 }],
  ambience: cacheAmbience,
  music: "cinder",
  decor: [
    { kind: "wall", rect: { x: 0, y: 0, w: 24, h: 12 }, z: -4.2 },
    { kind: "pillar", rect: { x: 6.6, y: 0, w: 1, h: 12 }, z: -3.4 },
    { kind: "pillar", rect: { x: 16.2, y: 0, w: 1, h: 12 }, z: -3.6 },
    { kind: "arch", rect: { x: 7.6, y: 0, w: 8.6, h: 7.4 }, z: -3.5 },
    { kind: "chain", rect: { x: 4.4, y: 6, w: 0.3, h: 6 }, z: -2.4 },
    { kind: "rack", rect: { x: 3.6, y: 0.9, w: 3.0, h: 2.6 }, z: -1.6 },
    { kind: "rack", rect: { x: 8.0, y: 0.9, w: 3.2, h: 2.6 }, z: -1.6 },
    { kind: "beam", rect: { x: 11.6, y: 3.2, w: 4.4, h: 0.3 }, z: -1.5 },
    { kind: "crate", rect: { x: 12.0, y: 3.5, w: 1.1, h: 1.0 }, z: -1.5 },
    { kind: "crate", rect: { x: 13.4, y: 3.5, w: 0.9, h: 0.8 }, z: -1.5 },
    { kind: "beam", rect: { x: 11.6, y: 5.4, w: 4.4, h: 0.3 }, z: -1.5 },
    { kind: "crate", rect: { x: 14.2, y: 5.7, w: 1.0, h: 0.9 }, z: -1.5 },
    { kind: "pipe", rect: { x: 0, y: 4.6, w: 3.2, h: 0.3 }, z: -2.4, intensity: 1 },
    { kind: "rack", rect: { x: 19.2, y: 0.6, w: 2.8, h: 2.6 }, z: -1.3 },
    { kind: "lamp", rect: { x: 24, y: 0, w: -3.3, h: 3.6 }, z: -0.9 },
    { kind: "embers", rect: { x: 2, y: 0, w: 20, h: 6 }, z: -1.8, intensity: 0.3 },
    { kind: "bench", rect: { x: 13.5, y: 0, w: 2.5, h: 0.8 }, z: 0 }
  ],
  waypoints: [
    { x: 3.4, y: 0 },
    { x: 9, y: 0 },
    { x: 14.8, y: 0.8 },
    { x: 16.2, y: 0 },
    { x: 20.5, y: 0 }
  ]
};

const belfry: Room = {
  id: "belfry",
  name: roomNames.belfry,
  bounds: { x: 0, y: 0, w: 36, h: 18 },
  solids: [
    { x: -2, y: -2, w: 40, h: 2 },
    { x: -2, y: 0, w: 2, h: 20 },
    { x: 36, y: 0, w: 2, h: 20 },
    { x: -2, y: 18, w: 40, h: 2 },
    { x: 0, y: 5.9, w: 2.8, h: 0.5 },
    { x: 2.7, y: 5.32, w: 0.9, h: 0.28 },
    { x: 3.75, y: 4.52, w: 0.9, h: 0.28 },
    { x: 4.8, y: 3.72, w: 0.9, h: 0.28 },
    { x: 5.85, y: 2.92, w: 0.9, h: 0.28 },
    { x: 6.9, y: 2.12, w: 0.9, h: 0.28 },
    { x: 7.95, y: 1.32, w: 0.9, h: 0.28 }
  ],
  doors: [
    {
      rect: { x: -0.6, y: 0, w: 1.2, h: 3.4 },
      to: "landing",
      entry: { x: 31.6, y: 0 },
      entryFacing: -1
    },
    {
      rect: { x: -0.6, y: 6.4, w: 1.2, h: 2.8 },
      to: "gallery",
      entry: { x: 37, y: 0 },
      entryFacing: -1
    },
    {
      rect: { x: 35.4, y: 0, w: 1.2, h: 3.4 },
      to: "reserve",
      entry: { x: 2.4, y: 0 },
      entryFacing: 1
    }
  ],
  enemies: [],
  pickups: [],
  gates: [
    { id: "belfry-shortcut", rect: { x: 1.2, y: 0, w: 1.0, h: 3.4 }, openWhen: "bossApproach" },
    { id: "reserve-door", rect: { x: 34.2, y: 0, w: 1.0, h: 3.4 }, openWhen: "bossDefeated" }
  ],
  breakables: [],
  bossArena: { x: 21, y: 0, arenaMinX: 9.5, arenaMaxX: 32.5 },
  ambience: belfryAmbience,
  music: "bellkeeper",
  decor: [
    { kind: "block", rect: { x: -3, y: 0, w: 15, h: 3 }, z: -13 },
    { kind: "block", rect: { x: 30, y: 0, w: 12, h: 3 }, z: -13 },
    { kind: "block", rect: { x: 12, y: 0, w: 2.2, h: 19 }, z: -13 },
    { kind: "block", rect: { x: 27.8, y: 0, w: 2.2, h: 19 }, z: -13 },
    { kind: "block", rect: { x: 12, y: 14.8, w: 18, h: 4.2 }, z: -13 },
    { kind: "block", rect: { x: -3, y: 0, w: 6, h: 12.5 }, z: -13 },
    { kind: "block", rect: { x: 33.6, y: 0, w: 8, h: 19 }, z: -13 },
    { kind: "glow", rect: { x: 18.2, y: 6.6, w: 5.6, h: 5.6 }, z: -14, color: EMBER, intensity: 0.16 },
    { kind: "chain", rect: { x: 14.7, y: 9, w: 0.3, h: 10 }, z: -8 },
    { kind: "chain", rect: { x: 27, y: 9, w: 0.3, h: 10 }, z: -8 },
    { kind: "bell", rect: { x: 15.4, y: 8.2, w: 11.2, h: 8.2 }, z: -6.6 },
    { kind: "yoke", rect: { x: 15.6, y: 16.4, w: 10.8, h: 1.8 }, z: -6.6 },
    { kind: "pillar", rect: { x: 9.4, y: 0, w: 1.4, h: 16 }, z: -5 },
    { kind: "pillar", rect: { x: 31.2, y: 0, w: 1.4, h: 16 }, z: -5 },
    { kind: "wall", rect: { x: 0, y: 0, w: 36, h: 3 }, z: -4.2 },
    { kind: "embers", rect: { x: 2, y: 0, w: 32, h: 16 }, z: -2.6, intensity: 1 },
    { kind: "pipe", rect: { x: 9.9, y: 6.65, w: 1.6, h: 0.3 }, z: -2.6 },
    { kind: "pipe", rect: { x: 11.2, y: 4.3, w: 0.3, h: 2.5 }, z: -2.6 },
    { kind: "pipe", rect: { x: 30.5, y: 6.65, w: 1.6, h: 0.3 }, z: -2.6 },
    { kind: "pipe", rect: { x: 30.5, y: 4.3, w: 0.3, h: 2.5 }, z: -2.6 },
    { kind: "furnace", rect: { x: 10.4, y: 1.0, w: 1.8, h: 3.4 }, z: -2.4, intensity: 0.8 },
    { kind: "furnace", rect: { x: 29.8, y: 1.0, w: 1.8, h: 3.4 }, z: -2.4, intensity: 0.8 },
    { kind: "boiler", rect: { x: 31.7, y: 0, w: 2.2, h: 1.4 }, z: -2.4 },
    { kind: "pipe", rect: { x: 33.9, y: 3.2, w: 2.1, h: 0.3 }, z: -2.6 },
    { kind: "grate", rect: { x: 11, y: 0, w: 6, h: 0.35 }, z: 0, intensity: 0.7 },
    { kind: "grate", rect: { x: 18, y: 0, w: 6, h: 0.35 }, z: 0, intensity: 0.7 },
    { kind: "grate", rect: { x: 25, y: 0, w: 6, h: 0.35 }, z: 0, intensity: 0.7 },
    { kind: "gallery", rect: { x: 0, y: 0, w: 2.8, h: 6.4 }, z: 0 },
    { kind: "stair", rect: { x: 2.6, y: 0, w: 6.4, h: 5.7 }, z: 0 }
  ],
  waypoints: [
    { x: 1.7, y: 6.4 },
    { x: 3.15, y: 5.6 },
    { x: 4.2, y: 4.8 },
    { x: 5.25, y: 4.0 },
    { x: 6.3, y: 3.2 },
    { x: 7.35, y: 2.4 },
    { x: 8.4, y: 1.6 },
    { x: 11, y: 0 },
    { x: 13, y: 0 },
    { x: 19, y: 0 },
    { x: 26, y: 0 }
  ]
};

const vault: Room = {
  id: "vault",
  name: roomNames.vault,
  bounds: { x: 0, y: 0, w: 14, h: 8 },
  solids: [
    { x: -2, y: -2, w: 18, h: 2 },
    { x: -2, y: 0, w: 2, h: 10 },
    { x: 14, y: 0, w: 2, h: 10 },
    { x: -2, y: 8, w: 18, h: 2 },
    { x: 6.2, y: 0, w: 1.8, h: 0.9 }
  ],
  doors: [
    {
      rect: { x: -0.6, y: 0, w: 1.2, h: 2.55 },
      to: "gallery",
      entry: { x: 38.4, y: 9.75 },
      entryFacing: -1
    }
  ],
  enemies: [],
  pickups: [{ id: "ember-flask", kind: "emberFlask", x: 7.1, y: 1.0 }],
  gates: [],
  breakables: [],
  ambience: vaultAmbience,
  music: "cinder",
  decor: [
    { kind: "block", rect: { x: -3, y: 0, w: 20, h: 2.6 }, z: -13 },
    { kind: "wall", rect: { x: 0, y: 0, w: 14, h: 8 }, z: -4.2 },
    { kind: "pillar", rect: { x: 2.8, y: 0, w: 1.0, h: 8 }, z: -3.4 },
    { kind: "pillar", rect: { x: 10.2, y: 0, w: 1.0, h: 8 }, z: -3.4 },
    { kind: "arch", rect: { x: 3.9, y: 0, w: 6.2, h: 5.6 }, z: -3.6, intensity: 1 },
    { kind: "chain", rect: { x: 4.6, y: 4.6, w: 0.3, h: 3.4 }, z: -2.4 },
    { kind: "pipe", rect: { x: 0, y: 5.2, w: 3.0, h: 0.3 }, z: -2.4, intensity: 1 },
    { kind: "boiler", rect: { x: 1.3, y: 0, w: 2.2, h: 1.3 }, z: -2.2 },
    { kind: "furnace", rect: { x: 12.9, y: 0.6, w: 1.0, h: 1.8 }, z: -2.2, intensity: 0.4 },
    { kind: "rack", rect: { x: 10.0, y: 0.9, w: 2.4, h: 2.6 }, z: -1.5 },
    { kind: "embers", rect: { x: 2, y: 0, w: 11, h: 6 }, z: -1.8, intensity: 0.6 },
    { kind: "lamp", rect: { x: 14, y: 0, w: -3.0, h: 4.2 }, z: -0.9 },
    { kind: "crate", rect: { x: 6.2, y: 0, w: 1.8, h: 0.9 }, z: 0 }
  ],
  waypoints: [
    { x: 1.6, y: 0 },
    { x: 5.0, y: 0 },
    { x: 7.1, y: 0.9 }
  ]
};

const reserve: Room = {
  id: "reserve",
  name: roomNames.reserve,
  bounds: { x: 0, y: 0, w: 30, h: 14 },
  solids: [
    { x: -2, y: -2, w: 34, h: 2 },
    { x: -2, y: 0, w: 2, h: 16 },
    { x: 30, y: 0, w: 2, h: 16 },
    { x: -2, y: 14, w: 34, h: 2 },
    { x: 10.4, y: 0.9, w: 1.0, h: 0.28 },
    { x: 11.5, y: 1.7, w: 1.0, h: 0.28 },
    { x: 12.6, y: 2.5, w: 1.0, h: 0.28 },
    { x: 13.7, y: 3.3, w: 1.0, h: 0.28 },
    { x: 14.8, y: 4.1, w: 1.0, h: 0.28 },
    { x: 15.8, y: 4.1, w: 7.8, h: 0.6 },
    { x: 23.7, y: 3.9, w: 0.9, h: 0.28 },
    { x: 24.6, y: 3.1, w: 0.9, h: 0.28 },
    { x: 25.5, y: 2.3, w: 0.9, h: 0.28 },
    { x: 26.4, y: 1.5, w: 0.9, h: 0.28 },
    { x: 27.6, y: 0, w: 2.0, h: 1.0 }
  ],
  doors: [
    {
      rect: { x: -0.6, y: 0, w: 1.2, h: 3.0 },
      to: "belfry",
      entry: { x: 33.4, y: 0 },
      entryFacing: -1
    }
  ],
  enemies: [],
  pickups: [{ id: "dawn-core", kind: "dawnCore", x: 28.6, y: 1.4 }],
  gates: [],
  breakables: [],
  ambience: reserveAmbience,
  music: "reserve",
  decor: [
    { kind: "block", rect: { x: -3, y: 0, w: 36, h: 3.2 }, z: -13 },
    { kind: "block", rect: { x: -3, y: 0, w: 4, h: 16 }, z: -13 },
    { kind: "block", rect: { x: 28.4, y: 0, w: 6, h: 16 }, z: -13 },
    { kind: "glow", rect: { x: 26.4, y: 0.4, w: 5.2, h: 5.2 }, z: -12, color: EMBER, intensity: 0.35 },
    { kind: "wall", rect: { x: 0, y: 0, w: 30, h: 14 }, z: -4.2, intensity: 1 },
    { kind: "pillar", rect: { x: 4.0, y: 0, w: 1.0, h: 14 }, z: -3.4 },
    { kind: "pillar", rect: { x: 13.4, y: 0, w: 1.0, h: 14 }, z: -3.4 },
    { kind: "pillar", rect: { x: 23.8, y: 0, w: 1.0, h: 14 }, z: -3.4 },
    { kind: "arch", rect: { x: 5.0, y: 0, w: 8.4, h: 7.2 }, z: -3.6, intensity: 1 },
    { kind: "arch", rect: { x: 14.4, y: 0, w: 9.4, h: 7.2 }, z: -3.6, intensity: 1 },
    { kind: "pipe", rect: { x: 0, y: 8.6, w: 23.4, h: 0.3 }, z: -2.6, intensity: 1 },
    { kind: "pipe", rect: { x: 16.6, y: 7.2, w: 0.3, h: 1.5 }, z: -2.6 },
    { kind: "pipe", rect: { x: 19.5, y: 7.2, w: 0.3, h: 1.5 }, z: -2.6 },
    { kind: "pipe", rect: { x: 22.5, y: 7.2, w: 0.3, h: 1.5 }, z: -2.6 },
    { kind: "pipe", rect: { x: 0, y: 3.4, w: 2.4, h: 0.3 }, z: -2.4, intensity: 1 },
    { kind: "pipe", rect: { x: 2.3, y: 2.7, w: 0.3, h: 0.8 }, z: -2.4 },
    { kind: "pipe", rect: { x: 6.3, y: 2.7, w: 0.3, h: 0.8 }, z: -2.4 },
    { kind: "pipe", rect: { x: 2.3, y: 3.4, w: 4.3, h: 0.3 }, z: -2.4 },
    { kind: "rack", rect: { x: 2.0, y: 0, w: 2.6, h: 2.7 }, z: -1.6 },
    { kind: "rack", rect: { x: 5.6, y: 0, w: 2.6, h: 2.7 }, z: -1.6 },
    { kind: "jar", rect: { x: 2.5, y: 0.3, w: 0.5, h: 0.7 }, z: -1.4, color: EMBER, intensity: 0.7 },
    { kind: "jar", rect: { x: 6.1, y: 0.3, w: 0.5, h: 0.7 }, z: -1.4, color: EMBER, intensity: 0.7 },
    { kind: "lens", rect: { x: 8.0, y: 0, w: 2.2, h: 3.0 }, z: -1.5, color: COOL_KEY, intensity: 0.8 },
    { kind: "gallery", rect: { x: 15.8, y: 0, w: 7.8, h: 4.7 }, z: 0 },
    { kind: "stair", rect: { x: 10.4, y: 0, w: 5.4, h: 4.7 }, z: 0 },
    { kind: "stair", rect: { x: 23.6, y: 0, w: 3.7, h: 4.7 }, z: 0 },
    { kind: "rack", rect: { x: 16.1, y: 4.7, w: 2.4, h: 2.5 }, z: -1.6 },
    { kind: "rack", rect: { x: 19.0, y: 4.7, w: 2.4, h: 2.5 }, z: -1.6 },
    { kind: "jar", rect: { x: 16.5, y: 5.0, w: 0.5, h: 0.7 }, z: -1.4, color: EMBER, intensity: 1 },
    { kind: "jar", rect: { x: 17.6, y: 5.0, w: 0.5, h: 0.7 }, z: -1.4, color: EMBER, intensity: 0.9 },
    { kind: "jar", rect: { x: 16.5, y: 6.1, w: 0.5, h: 0.7 }, z: -1.4, color: EMBER, intensity: 0.8 },
    { kind: "jar", rect: { x: 19.4, y: 5.0, w: 0.5, h: 0.7 }, z: -1.4, color: EMBER, intensity: 1 },
    { kind: "jar", rect: { x: 20.5, y: 5.0, w: 0.5, h: 0.7 }, z: -1.4, color: EMBER, intensity: 0.9 },
    { kind: "jar", rect: { x: 19.4, y: 6.1, w: 0.5, h: 0.7 }, z: -1.4, color: EMBER, intensity: 0.8 },
    { kind: "lens", rect: { x: 21.9, y: 4.7, w: 1.6, h: 2.4 }, z: -1.5, color: COOL_KEY, intensity: 0.8 },
    { kind: "crate", rect: { x: 27.6, y: 0, w: 2.0, h: 1.0 }, z: 0 },
    { kind: "embers", rect: { x: 2, y: 0, w: 26, h: 9 }, z: -1.8, intensity: 0.2 },
    { kind: "lamp", rect: { x: 0, y: 0, w: 3.0, h: 4.1 }, z: -0.9 }
  ],
  waypoints: [
    { x: 2.4, y: 0 },
    { x: 6.0, y: 0 },
    { x: 9.4, y: 0 },
    { x: 10.9, y: 1.18 },
    { x: 12.0, y: 1.98 },
    { x: 13.1, y: 2.78 },
    { x: 14.2, y: 3.58 },
    { x: 15.3, y: 4.38 },
    { x: 18.5, y: 4.7 },
    { x: 22.6, y: 4.7 },
    { x: 24.1, y: 4.18 },
    { x: 25.0, y: 3.38 },
    { x: 25.9, y: 2.58 },
    { x: 26.8, y: 1.78 },
    { x: 28.6, y: 1.0 }
  ]
};

const sunwell: Room = {
  id: "sunwell",
  name: roomNames.sunwell,
  bounds: { x: 0, y: 0, w: 12, h: 8 },
  solids: [
    { x: -2, y: -2, w: 16, h: 2 },
    { x: -2, y: 0, w: 2, h: 10 },
    { x: 12, y: 0, w: 2, h: 10 },
    { x: -2, y: 8, w: 16, h: 2 },
    { x: 4.2, y: 0.4, w: 2.2, h: 0.16 },
    { x: 8.2, y: 0, w: 1.8, h: 0.9 }
  ],
  doors: [
    {
      rect: { x: -0.6, y: 0, w: 1.2, h: 2.8 },
      to: "landing",
      entry: { x: 2.4, y: 0 },
      entryFacing: 1
    }
  ],
  enemies: [],
  pickups: [{ id: "flask-2", kind: "emberFlask", x: 9.1, y: 1.0 }],
  gates: [],
  breakables: [],
  ambience: sunwellAmbience,
  music: "dawn",
  decor: [
    { kind: "block", rect: { x: -3, y: 0, w: 18, h: 2.6 }, z: -13 },
    { kind: "wall", rect: { x: 0, y: 0, w: 12, h: 8 }, z: -4.2 },
    { kind: "pillar", rect: { x: 0.8, y: 0, w: 1.0, h: 8 }, z: -3.4 },
    { kind: "pillar", rect: { x: 6.2, y: 0, w: 1.0, h: 8 }, z: -3.4 },
    { kind: "glow", rect: { x: 6.6, y: 0.2, w: 5.4, h: 5.4 }, z: -3.0, color: EMBER, intensity: 0.6 },
    { kind: "glow", rect: { x: 1.4, y: 0.2, w: 5.0, h: 5.0 }, z: -3.0, color: DAWN_KEY, intensity: 0.3 },
    { kind: "sunlight", rect: { x: 7.6, y: 0.9, w: 2.6, h: 7.1 }, z: -2.4, color: DAWN_KEY, intensity: 1 },
    { kind: "rubble", rect: { x: 1.3, y: 0, w: 2.6, h: 1.1 }, z: -1.6 },
    { kind: "embers", rect: { x: 1, y: 0, w: 10, h: 6 }, z: -1.8, intensity: 0.3 },
    { kind: "bench", rect: { x: 4.2, y: 0, w: 2.2, h: 0.56 }, z: 0 },
    { kind: "crate", rect: { x: 8.2, y: 0, w: 1.8, h: 0.9 }, z: 0 }
  ],
  waypoints: [
    { x: 2.4, y: 0 },
    { x: 5.2, y: 0.56 },
    { x: 7.4, y: 0 },
    { x: 9.1, y: 0.9 }
  ]
};

export const rooms: Room[] = [landing, gallery, cache, belfry, vault, reserve, sunwell];

export const demoStart: { room: string; pos: Vec2 } = {
  room: "gallery",
  pos: { x: 5.5, y: 0 }
};

export function findRoom(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}
