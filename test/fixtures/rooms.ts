import type { Room } from "../../src/game/types";

export function makeRooms(): Room[] {
  const hall: Room = {
    id: "hall",
    name: "Test Hall",
    bounds: { x: 0, y: 0, w: 44, h: 18 },
    solids: [
      { x: 0, y: 0, w: 44, h: 1 },
      { x: -1, y: 0, w: 1, h: 18 },
      { x: 44, y: 0, w: 1, h: 18 },
      { x: 0, y: 17, w: 44, h: 1 },
      { x: 14, y: 4, w: 6, h: 1 }
    ],
    doors: [{ rect: { x: 42, y: 1, w: 2, h: 4 }, to: "vault", entry: { x: 3, y: 1 }, entryFacing: 1 }],
    enemies: [
      { id: 1, kind: "guard", x: 20, y: 1, patrolMinX: 17, patrolMaxX: 25, facing: -1 },
      { id: 2, kind: "stomper", x: 32, y: 1, patrolMinX: 30, patrolMaxX: 34, facing: -1 }
    ],
    pickups: [{ id: "wick", kind: "longwick", x: 9, y: 1.6 }],
    gates: [{ id: "shortcut", rect: { x: 1, y: 1, w: 1, h: 4 }, openWhen: "bossApproach" }],
    breakables: [],
    checkpoint: { x: 4, y: 1 },
    decor: [],
    waypoints: [{ x: 4, y: 1 }]
  };

  const vault: Room = {
    id: "vault",
    name: "Test Vault",
    bounds: { x: 0, y: 0, w: 30, h: 16 },
    solids: [
      { x: 0, y: 0, w: 30, h: 1 },
      { x: -1, y: 0, w: 1, h: 16 },
      { x: 30, y: 0, w: 1, h: 16 },
      { x: 0, y: 15, w: 30, h: 1 }
    ],
    doors: [{ rect: { x: 0, y: 1, w: 1.5, h: 4 }, to: "hall", entry: { x: 39, y: 1 }, entryFacing: -1 }],
    enemies: [{ id: 3, kind: "guard", x: 8, y: 1, patrolMinX: 6, patrolMaxX: 12, facing: 1 }],
    pickups: [{ id: "core", kind: "dawnCore", x: 22, y: 1.6 }],
    gates: [{ id: "shortcut", rect: { x: 28, y: 1, w: 1, h: 4 }, openWhen: "bossApproach" }],
    breakables: [],
    checkpoint: { x: 3, y: 1 },
    bossArena: { x: 22, y: 1, arenaMinX: 14, arenaMaxX: 30 },
    decor: [],
    waypoints: [{ x: 3, y: 1 }]
  };

  const cell: Room = {
    id: "cell",
    name: "Test Cell",
    bounds: { x: 0, y: 0, w: 20, h: 10 },
    solids: [
      { x: 0, y: 0, w: 20, h: 1 },
      { x: -1, y: 0, w: 1, h: 10 },
      { x: 20, y: 0, w: 1, h: 10 },
      { x: 0, y: 9, w: 20, h: 1 }
    ],
    doors: [],
    enemies: [],
    pickups: [],
    gates: [],
    breakables: [{ id: "rubble", rect: { x: 10, y: 1, w: 1, h: 3 }, health: 2 }],
    checkpoint: { x: 3, y: 1 },
    decor: [],
    waypoints: [{ x: 3, y: 1 }]
  };

  return [hall, vault, cell];
}

export function roomById(rooms: Room[], id: string): Room {
  for (const room of rooms) {
    if (room.id === id) {
      return room;
    }
  }
  throw new Error("missing fixture room " + id);
}
