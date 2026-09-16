import type { Hazard, Rect } from "./types";

export function createHazards(capacity: number): Hazard[] {
  const pool: Hazard[] = [];
  for (let i = 0; i < capacity; i += 1) {
    pool.push({
      pos: { x: 0, y: 0 },
      prev: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
      w: 0,
      h: 0,
      until: 0,
      damage: 0,
      alive: false
    });
  }
  return pool;
}

export function clearHazards(hazards: Hazard[]): void {
  for (const hazard of hazards) {
    hazard.alive = false;
  }
}

export function countHazards(hazards: Hazard[]): number {
  let n = 0;
  for (const hazard of hazards) {
    if (hazard.alive) {
      n += 1;
    }
  }
  return n;
}

export function spawnHazard(
  hazards: Hazard[],
  x: number,
  y: number,
  w: number,
  h: number,
  vx: number,
  until: number,
  damage: number
): Hazard | null {
  for (const hazard of hazards) {
    if (hazard.alive) {
      continue;
    }
    hazard.pos.x = x;
    hazard.pos.y = y;
    hazard.prev.x = x;
    hazard.prev.y = y;
    hazard.vel.x = vx;
    hazard.vel.y = 0;
    hazard.w = w;
    hazard.h = h;
    hazard.until = until;
    hazard.damage = damage;
    hazard.alive = true;
    return hazard;
  }
  return null;
}

export function stepHazards(hazards: Hazard[], bounds: Rect, t: number, dt: number): void {
  for (const hazard of hazards) {
    if (!hazard.alive) {
      continue;
    }
    hazard.prev.x = hazard.pos.x;
    hazard.prev.y = hazard.pos.y;
    hazard.pos.x += hazard.vel.x * dt;
    hazard.pos.y += hazard.vel.y * dt;
    if (t >= hazard.until) {
      hazard.alive = false;
      continue;
    }
    const half = hazard.w * 0.5;
    if (
      hazard.pos.x + half < bounds.x ||
      hazard.pos.x - half > bounds.x + bounds.w ||
      hazard.pos.y + hazard.h < bounds.y ||
      hazard.pos.y > bounds.y + bounds.h
    ) {
      hazard.alive = false;
    }
  }
}
