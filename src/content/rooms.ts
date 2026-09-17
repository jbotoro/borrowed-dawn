import type { Room, RoomAmbience, Vec2 } from "../game/types";
import { roomNames } from "./strings";

const VOID = 0x07090d;
const CHARCOAL = 0x151b24;
const ASH = 0x7c8794;
const PORCELAIN = 0xe8e2d5;
const EMBER = 0xffb648;

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
    }
  ],
  enemies: [],
  pickups: [],
  gates: [{ id: "belfry-shortcut", rect: { x: 32.4, y: 0, w: 1.0, h: 3.4 }, openWhen: "bossApproach" }],
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
    { kind: "lamp", rect: { x: 0, y: 0, w: 3.1, h: 3.0 }, z: -0.9 },
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
    { x: 7, y: 1.4, w: 4, h: 0.6 },
    { x: 13, y: 3, w: 5.2, h: 0.6 },
    { x: 18.6, y: 1.4, w: 4.2, h: 0.6 },
    { x: 22.5, y: 3, w: 5, h: 0.6 },
    { x: 30, y: 1.8, w: 4, h: 0.6 },
    { x: 0, y: 3, w: 3.4, h: 0.6 },
    { x: 4.6, y: 5, w: 2.6, h: 0.6 },
    { x: 0, y: 7, w: 3.4, h: 0.6 },
    { x: 0, y: 9.6, w: 3.4, h: 1.2 },
    { x: 26.6, y: 0.4, w: 1.8, h: 0.16 },
    { x: 5.3, y: 8.8, w: 2.4, h: 0.5 },
    { x: 9.6, y: 10.0, w: 2.4, h: 0.5 },
    { x: 13.2, y: 10.0, w: 6.6, h: 0.6 },
    { x: 22.6, y: 9.8, w: 2.4, h: 0.5 },
    { x: 27.6, y: 9.6, w: 2.4, h: 0.5 },
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
    { id: 4, kind: "lamplighter", x: 16.5, y: 10.6, patrolMinX: 13.6, patrolMaxX: 19.4, facing: -1 }
  ],
  pickups: [],
  gates: [],
  breakables: [],
  ambience: galleryAmbience,
  music: "cinder",
  decor: [
    { kind: "glow", rect: { x: 5.2, y: -7.5, w: 4.2, h: 4.2 }, z: -13.3, color: EMBER, intensity: 0.7 },
    { kind: "glow", rect: { x: 27.6, y: -7.5, w: 3.4, h: 3.4 }, z: -13.3, color: EMBER, intensity: 0.35 },
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
    { kind: "pillar", rect: { x: 11.8, y: 0, w: 1.1, h: 12 }, z: -3.4 },
    { kind: "pillar", rect: { x: 28.6, y: 0, w: 1.1, h: 12 }, z: -3.4 },
    { kind: "pillar", rect: { x: 36, y: 0, w: 1.1, h: 10.5 }, z: -3.2 },
    { kind: "winch", rect: { x: 17.4, y: 4.6, w: 5.2, h: 10.6 }, z: -2.8 },
    { kind: "chain", rect: { x: 24.8, y: 5.4, w: 0.3, h: 10.6 }, z: -2.8 },
    { kind: "boiler", rect: { x: 14.2, y: 0, w: 2.4, h: 1.4 }, z: -2.4 },
    { kind: "pipe", rect: { x: 8.6, y: 2.3, w: 3.2, h: 0.3 }, z: -2.6, intensity: 1 },
    { kind: "furnace", rect: { x: 36.0, y: 0.6, w: 1.4, h: 2.4 }, z: -2.2, intensity: 0.6 },
    { kind: "embers", rect: { x: 26, y: 0, w: 14, h: 12 }, z: -2.2, intensity: 0.8 },
    { kind: "embers", rect: { x: 4, y: 0, w: 16, h: 10 }, z: -2.4, intensity: 0.2 },
    { kind: "embers", rect: { x: 39.4, y: 0, w: 2.4, h: 5 }, z: -0.3, intensity: 1 },
    { kind: "gallery", rect: { x: 7, y: 0, w: 4, h: 2.0 }, z: 0 },
    { kind: "gallery", rect: { x: 13, y: 0, w: 5.2, h: 3.6 }, z: 0 },
    { kind: "beam", rect: { x: 18.6, y: 0, w: 4.2, h: 16 }, z: 0, intensity: 1 },
    { kind: "gallery", rect: { x: 22.5, y: 0, w: 5, h: 3.6 }, z: 0 },
    { kind: "gallery", rect: { x: 30, y: 0, w: 4, h: 2.4 }, z: 0 },
    { kind: "gallery", rect: { x: 0, y: 0, w: 3.4, h: 3.6 }, z: 0 },
    { kind: "gallery", rect: { x: 4.6, y: 0, w: 2.6, h: 5.6 }, z: 0 },
    { kind: "gallery", rect: { x: 0, y: 3.6, w: 3.4, h: 4.0 }, z: 0 },
    { kind: "wall", rect: { x: 0, y: 9.6, w: 3.4, h: 1.2 }, z: 0, intensity: 1 },
    { kind: "bench", rect: { x: 26.6, y: 0, w: 1.8, h: 0.56 }, z: 0 },
    { kind: "chain", rect: { x: 5.45, y: 9.3, w: 0.3, h: 6.5 }, z: -0.9 },
    { kind: "chain", rect: { x: 7.25, y: 9.3, w: 0.3, h: 6.5 }, z: -0.9 },
    { kind: "beam", rect: { x: 5.3, y: 8.8, w: 2.4, h: 1.2 }, z: 0 },
    { kind: "chain", rect: { x: 9.75, y: 10.5, w: 0.3, h: 5.3 }, z: -0.9 },
    { kind: "chain", rect: { x: 11.55, y: 10.5, w: 0.3, h: 5.3 }, z: -0.9 },
    { kind: "beam", rect: { x: 9.6, y: 10.0, w: 2.4, h: 1.2 }, z: 0 },
    { kind: "gallery", rect: { x: 13.2, y: 0, w: 6.6, h: 10.6 }, z: 0 },
    { kind: "chain", rect: { x: 22.75, y: 10.3, w: 0.3, h: 5.5 }, z: -0.9 },
    { kind: "chain", rect: { x: 24.55, y: 10.3, w: 0.3, h: 5.5 }, z: -0.9 },
    { kind: "beam", rect: { x: 22.6, y: 9.8, w: 2.4, h: 1.2 }, z: 0 },
    { kind: "chain", rect: { x: 27.75, y: 10.1, w: 0.3, h: 5.7 }, z: -0.9 },
    { kind: "chain", rect: { x: 29.55, y: 10.1, w: 0.3, h: 5.7 }, z: -0.9 },
    { kind: "beam", rect: { x: 27.6, y: 9.6, w: 2.4, h: 1.2 }, z: 0 },
    { kind: "gallery", rect: { x: 33.4, y: 0, w: 6.6, h: 9.75 }, z: 0 },
    { kind: "veil", rect: { x: 40, y: 9.75, w: 8, h: 3.45 }, z: 0 }
  ],
  waypoints: [
    { x: 3, y: 0 },
    { x: 9, y: 2 },
    { x: 15, y: 3.6 },
    { x: 17.9, y: 3.6 },
    { x: 25, y: 3.6 },
    { x: 32, y: 2.4 },
    { x: 36, y: 0 },
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
    }
  ],
  enemies: [],
  pickups: [{ id: "dawn-core", kind: "dawnCore", x: 21, y: 1.2 }],
  gates: [{ id: "belfry-shortcut", rect: { x: 1.2, y: 0, w: 1.0, h: 3.4 }, openWhen: "bossApproach" }],
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
    { kind: "boiler", rect: { x: 33, y: 0, w: 2.6, h: 1.4 }, z: -2.4 },
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

export const rooms: Room[] = [landing, gallery, cache, belfry, vault];

export const demoStart: { room: string; pos: Vec2 } = {
  room: "gallery",
  pos: { x: 5.5, y: 0 }
};

export function findRoom(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}
