import type { Hazard, HazardKind, Rect } from "./types";

export function createHazards(capacity: number): Hazard[] {
  const pool: Hazard[] = [];
  for (let i = 0; i < capacity; i += 1) {
    pool.push({
      kind: "wave",
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
  kind: HazardKind,
  x: number,
  y: number,
  w: number,
  h: number,
  vx: number,
  vy: number,
  until: number,
  damage: number
): Hazard | null {
  for (const hazard of hazards) {
    if (hazard.alive) {
      continue;
    }
    hazard.kind = kind;
    hazard.pos.x = x;
    hazard.pos.y = y;
    hazard.prev.x = x;
    hazard.prev.y = y;
    hazard.vel.x = vx;
    hazard.vel.y = vy;
    hazard.w = w;
    hazard.h = h;
    hazard.until = until;
    hazard.damage = damage;
    hazard.alive = true;
    return hazard;
  }
  return null;
}

function hitSolidBelow(hazard: Hazard, solids: Rect[]): boolean {
  const left = hazard.pos.x - hazard.w * 0.5;
  const right = hazard.pos.x + hazard.w * 0.5;
  for (const solid of solids) {
    if (right <= solid.x || left >= solid.x + solid.w) {
      continue;
    }
    const top = solid.y + solid.h;
    const crossedTop = hazard.prev.y >= top && hazard.pos.y <= top;
    const overlaps = hazard.pos.y < top && hazard.pos.y + hazard.h > solid.y;
    if (crossedTop || overlaps) {
      return true;
    }
  }
  return false;
}

export function stepHazards(hazards: Hazard[], bounds: Rect, solids: Rect[], t: number, dt: number): void {
  for (const hazard of hazards) {
    if (!hazard.alive) {
      continue;
    }
    hazard.prev.x = hazard.pos.x;
    hazard.prev.y = hazard.pos.y;
    hazard.pos.x += hazard.vel.x * dt;
    hazard.pos.y += hazard.vel.y * dt;
    if (hazard.kind === "ember" && hazard.vel.y < 0 && hitSolidBelow(hazard, solids)) {
      hazard.alive = false;
      continue;
    }
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
