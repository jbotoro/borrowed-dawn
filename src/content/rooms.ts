import type { Room, Vec2 } from "../game/types";
import { roomNames } from "./strings";

const landing: Room = {
  id: "landing",
  name: roomNames.landing,
  bounds: { x: 0, y: 0, w: 30, h: 14 },
  solids: [
    { x: -2, y: -2, w: 34, h: 2 },
    { x: -2, y: 0, w: 2, h: 16 },
    { x: 30, y: 0, w: 2, h: 16 },
    { x: -2, y: 14, w: 34, h: 2 },
    { x: 4, y: 1.4, w: 5, h: 0.6 },
    { x: 0, y: 3.4, w: 3, h: 0.6 },
    { x: 14, y: 0, w: 4, h: 0.5 },
    { x: 18, y: 0, w: 4, h: 1 }
  ],
  doors: [
    {
      rect: { x: 0.4, y: 4, w: 1.4, h: 2.4 },
      to: "gallery",
      entry: { x: 2.9, y: 0 },
      entryFacing: 1
    },
    {
      rect: { x: 27.4, y: 0, w: 1.6, h: 2.6 },
      to: "belfry",
      entry: { x: 3, y: 0 },
      entryFacing: 1
    }
  ],
  enemies: [],
  pickups: [],
  gates: [{ id: "belfry-shortcut", rect: { x: 24.5, y: 0, w: 1.2, h: 4 }, openWhen: "bossApproach" }],
  breakables: [],
  checkpoint: { x: 2.5, y: 0 },
  decor: [
    { kind: "bell", rect: { x: 20, y: 2.5, w: 9, h: 9 }, z: -6 },
    { kind: "pillar", rect: { x: 9.2, y: 0, w: 1.1, h: 9.5 }, z: -2.6 },
    { kind: "pillar", rect: { x: 16.4, y: 0, w: 1.1, h: 11 }, z: -3.4 },
    { kind: "pillar", rect: { x: 23.6, y: 0, w: 1.1, h: 8.5 }, z: -2.6 },
    { kind: "chain", rect: { x: 12.4, y: 5.5, w: 0.3, h: 8.5 }, z: -1.6 },
    { kind: "chain", rect: { x: 21, y: 4.2, w: 0.3, h: 9.8 }, z: -2.2 },
    { kind: "cylinder", rect: { x: 6.5, y: 0, w: 2, h: 1.1 }, z: -1.4 },
    { kind: "glow", rect: { x: 1.7, y: 0, w: 1.6, h: 1.6 }, z: 0 }
  ],
  waypoints: [
    { x: 2.5, y: 0 },
    { x: 11, y: 0 },
    { x: 16, y: 0.5 },
    { x: 20, y: 1 },
    { x: 23.4, y: 0 },
    { x: 12, y: 0 },
    { x: 6.5, y: 2 },
    { x: 1.5, y: 4 }
  ]
};

const gallery: Room = {
  id: "gallery",
  name: roomNames.gallery,
  bounds: { x: 0, y: 0, w: 40, h: 16 },
  solids: [
    { x: -2, y: -2, w: 44, h: 2 },
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
    { x: 0, y: 7, w: 3.4, h: 0.6 }
  ],
  doors: [
    {
      rect: { x: 0.4, y: 0, w: 1.6, h: 2.4 },
      to: "landing",
      entry: { x: 2.5, y: 4 },
      entryFacing: 1
    },
    {
      rect: { x: 0.4, y: 7.6, w: 1.6, h: 2.4 },
      to: "cache",
      entry: { x: 2.9, y: 0 },
      entryFacing: 1
    },
    {
      rect: { x: 37.8, y: 0, w: 1.6, h: 2.6 },
      to: "belfry",
      entry: { x: 8.3, y: 3.2 },
      entryFacing: 1
    }
  ],
  enemies: [
    { id: 1, kind: "guard", x: 25, y: 3.6, patrolMinX: 23, patrolMaxX: 27, facing: -1 },
    { id: 2, kind: "stomper", x: 34, y: 0, patrolMinX: 31, patrolMaxX: 38, facing: -1 }
  ],
  pickups: [],
  gates: [],
  breakables: [],
  decor: [
    { kind: "glow", rect: { x: 0.4, y: 7.6, w: 1.6, h: 2.4 }, z: -1.2 },
    { kind: "pillar", rect: { x: 11.8, y: 0, w: 1.1, h: 12 }, z: -3 },
    { kind: "pillar", rect: { x: 20, y: 0, w: 1.1, h: 13.5 }, z: -3.6 },
    { kind: "pillar", rect: { x: 28.6, y: 0, w: 1.1, h: 12 }, z: -3 },
    { kind: "pillar", rect: { x: 36, y: 0, w: 1.1, h: 10.5 }, z: -2.6 },
    { kind: "chain", rect: { x: 9.4, y: 6.5, w: 0.3, h: 9.5 }, z: -1.4 },
    { kind: "chain", rect: { x: 18.6, y: 4.5, w: 0.3, h: 11.5 }, z: -1.8 },
    { kind: "chain", rect: { x: 24.8, y: 5.4, w: 0.3, h: 10.6 }, z: -1.8 },
    { kind: "chain", rect: { x: 32.4, y: 3.6, w: 0.3, h: 12.4 }, z: -1.4 },
    { kind: "cylinder", rect: { x: 14.6, y: 0, w: 2.4, h: 1.3 }, z: -1.6 },
    { kind: "cylinder", rect: { x: 26.4, y: 0, w: 2.4, h: 1.3 }, z: -1.6 },
    { kind: "block", rect: { x: 18.2, y: 0, w: 4.3, h: 0.5 }, z: -2.2 },
    { kind: "bell", rect: { x: 39, y: 2, w: 7, h: 7 }, z: -6.5 }
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
      rect: { x: 0.4, y: 0, w: 1.6, h: 2.4 },
      to: "gallery",
      entry: { x: 2.8, y: 7.6 },
      entryFacing: -1
    }
  ],
  enemies: [{ id: 3, kind: "guard", x: 10, y: 0, patrolMinX: 7, patrolMaxX: 13, facing: 1 }],
  pickups: [{ id: "longwick", kind: "longwick", x: 20.5, y: 1 }],
  gates: [],
  breakables: [{ id: "cache-wall", rect: { x: 17, y: 0, w: 1.2, h: 4 }, health: 3 }],
  decor: [
    { kind: "glow", rect: { x: 19.6, y: 0.4, w: 2, h: 2.4 }, z: -0.6 },
    { kind: "pillar", rect: { x: 5.4, y: 0, w: 1, h: 8 }, z: -2.4 },
    { kind: "pillar", rect: { x: 11.8, y: 0, w: 1, h: 9.5 }, z: -2.8 },
    { kind: "chain", rect: { x: 8.4, y: 4.2, w: 0.3, h: 7.8 }, z: -1.4 },
    { kind: "cylinder", rect: { x: 21.4, y: 0, w: 1.8, h: 1 }, z: -1.4 }
  ],
  waypoints: [
    { x: 3, y: 0 },
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
    { x: 5.2, y: 2.7, w: 3.6, h: 0.5 },
    { x: 8.2, y: 0, w: 1.4, h: 1.2 }
  ],
  doors: [
    {
      rect: { x: 0.6, y: 0, w: 1.6, h: 2.6 },
      to: "landing",
      entry: { x: 26.5, y: 0 },
      entryFacing: -1
    },
    {
      rect: { x: 6, y: 3.2, w: 1.6, h: 2.6 },
      to: "gallery",
      entry: { x: 37, y: 0 },
      entryFacing: -1
    }
  ],
  enemies: [],
  pickups: [{ id: "dawn-core", kind: "dawnCore", x: 21, y: 1.2 }],
  gates: [{ id: "belfry-shortcut", rect: { x: 3.9, y: 0, w: 1.2, h: 4 }, openWhen: "bossApproach" }],
  breakables: [],
  bossArena: { x: 21, y: 0, arenaMinX: 9.5, arenaMaxX: 32.5 },
  decor: [
    { kind: "bell", rect: { x: 13, y: 7.5, w: 16, h: 10 }, z: -3 },
    { kind: "pillar", rect: { x: 9.6, y: 0, w: 1.3, h: 15 }, z: -5 },
    { kind: "pillar", rect: { x: 31.4, y: 0, w: 1.3, h: 15 }, z: -5 },
    { kind: "pillar", rect: { x: 17.5, y: 0, w: 1.1, h: 6.5 }, z: -6.5 },
    { kind: "pillar", rect: { x: 25, y: 0, w: 1.1, h: 6.5 }, z: -6.5 },
    { kind: "chain", rect: { x: 12.2, y: 9.5, w: 0.35, h: 8.5 }, z: -4 },
    { kind: "chain", rect: { x: 29.6, y: 9.5, w: 0.35, h: 8.5 }, z: -4 },
    { kind: "chain", rect: { x: 20.8, y: 15.5, w: 0.4, h: 2.5 }, z: -3 },
    { kind: "cylinder", rect: { x: 7.8, y: 0, w: 2.6, h: 1.4 }, z: -2 },
    { kind: "cylinder", rect: { x: 33, y: 0, w: 2.6, h: 1.4 }, z: -2 },
    { kind: "block", rect: { x: 14, y: 0, w: 14, h: 0.4 }, z: -2.6 }
  ],
  waypoints: [
    { x: 9.1, y: 1.2 },
    { x: 11, y: 0 },
    { x: 13, y: 0 },
    { x: 19, y: 0 },
    { x: 26, y: 0 }
  ]
};

export const rooms: Room[] = [landing, gallery, cache, belfry];

export const demoStart: { room: string; pos: Vec2 } = {
  room: "gallery",
  pos: { x: 5.5, y: 0 }
};

export function findRoom(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}
