import type { Tuning } from "../tuning";
import { aabbOf, rectsOverlap } from "./physics";
import type { GameEvent, GameState, Pickup, Progress, Rect, Room, Vec2 } from "./types";

const bodyRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
const otherRect: Rect = { x: 0, y: 0, w: 0, h: 0 };

export function findRoom(rooms: Room[], id: string): Room | undefined {
  for (const room of rooms) {
    if (room.id === id) {
      return room;
    }
  }
  return undefined;
}

export function activeSolids(room: Room, progress: Progress, out: Rect[]): Rect[] {
  out.length = 0;
  for (const solid of room.solids) {
    out.push(solid);
  }
  for (const breakable of room.breakables) {
    if (!progress.broken.includes(breakable.id)) {
      out.push(breakable.rect);
    }
  }
  for (const gate of room.gates) {
    if (!progress.opened.includes(gate.id)) {
      out.push(gate.rect);
    }
  }
  return out;
}

export function pickupsFor(room: Room, progress: Progress): Pickup[] {
  const out: Pickup[] = [];
  for (const placement of room.pickups) {
    if (progress.collected.includes(placement.id)) {
      continue;
    }
    if (placement.kind === "dawnCore" && !progress.bossDefeated) {
      continue;
    }
    out.push({
      id: placement.id,
      kind: placement.kind,
      pos: { x: placement.x, y: placement.y },
      collected: false
    });
  }
  return out;
}

export function checkpointRect(point: Vec2, tuning: Tuning, out: Rect): Rect {
  out.w = tuning.world.checkpointWidth;
  out.h = tuning.world.checkpointHeight;
  out.x = point.x - out.w * 0.5;
  out.y = point.y;
  return out;
}

export function pickupRect(pos: Vec2, tuning: Tuning, out: Rect): Rect {
  out.w = tuning.world.pickupWidth;
  out.h = tuning.world.pickupHeight;
  out.x = pos.x - out.w * 0.5;
  out.y = pos.y - out.h * 0.5;
  return out;
}

export function playerRect(state: GameState, tuning: Tuning, out: Rect): Rect {
  return aabbOf(state.player.pos, tuning.player.width, tuning.player.height, out);
}

export function checkDoors(state: GameState, room: Room, tuning: Tuning): void {
  if (state.transition) {
    return;
  }
  playerRect(state, tuning, bodyRect);
  for (const door of room.doors) {
    if (rectsOverlap(bodyRect, door.rect)) {
      state.transition = {
        to: door.to,
        entry: { x: door.entry.x, y: door.entry.y },
        entryFacing: door.entryFacing
      };
      return;
    }
  }
}

export function openGates(
  rooms: Room[],
  progress: Progress,
  when: "bossApproach" | "bossDefeated",
  events: GameEvent[]
): void {
  const opening: string[] = [];
  for (const room of rooms) {
    for (const gate of room.gates) {
      if (gate.openWhen !== when) {
        continue;
      }
      const alreadyOpen = progress.opened.includes(gate.id) && !opening.includes(gate.id);
      if (alreadyOpen) {
        continue;
      }
      if (!opening.includes(gate.id)) {
        opening.push(gate.id);
      }
      if (!progress.opened.includes(gate.id)) {
        progress.opened.push(gate.id);
      }
      events.push({ kind: "gateOpen", x: gate.rect.x + gate.rect.w * 0.5, y: gate.rect.y });
    }
  }
}

export function collectPickups(state: GameState, tuning: Tuning, events: GameEvent[]): void {
  if (state.pickups.length === 0) {
    return;
  }
  playerRect(state, tuning, bodyRect);
  for (const pickup of state.pickups) {
    if (pickup.collected) {
      continue;
    }
    pickupRect(pickup.pos, tuning, otherRect);
    if (!rectsOverlap(bodyRect, otherRect)) {
      continue;
    }
    pickup.collected = true;
    if (!state.progress.collected.includes(pickup.id)) {
      state.progress.collected.push(pickup.id);
    }
    events.push({ kind: "pickup", x: pickup.pos.x, y: pickup.pos.y });
    if (pickup.kind === "longwick") {
      state.player.longwick = true;
    } else if (pickup.kind === "dawnCore") {
      events.push({ kind: "victory", x: pickup.pos.x, y: pickup.pos.y });
      state.phase = "victory";
      state.victoryAt = state.time;
    }
  }
}

export function touchCheckpoint(
  state: GameState,
  room: Room,
  tuning: Tuning,
  wasTouching: boolean,
  events: GameEvent[]
): boolean {
  const point = room.checkpoint;
  if (!point) {
    return false;
  }
  playerRect(state, tuning, bodyRect);
  checkpointRect(point, tuning, otherRect);
  if (!rectsOverlap(bodyRect, otherRect)) {
    return false;
  }
  state.progress.checkpointRoom = room.id;
  state.progress.checkpoint.x = point.x;
  state.progress.checkpoint.y = point.y;
  state.player.health = tuning.player.maxHealth;
  if (!wasTouching) {
    events.push({ kind: "checkpoint", x: point.x, y: point.y });
  }
  return true;
}
