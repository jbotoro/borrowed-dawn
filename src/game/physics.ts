import type { Rect, Vec2 } from "./types";

export interface MoveResult {
  grounded: boolean;
  hitCeiling: boolean;
  hitWall: 0 | 1 | -1;
}

export function createMoveResult(): MoveResult {
  return { grounded: false, hitCeiling: false, hitWall: 0 };
}

export function aabbOf(pos: Vec2, w: number, h: number, out: Rect): Rect {
  out.x = pos.x - w * 0.5;
  out.y = pos.y;
  out.w = w;
  out.h = h;
  return out;
}

export function rectsOverlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function rectContains(r: Rect, x: number, y: number): boolean {
  return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
}

const scratch: Rect = { x: 0, y: 0, w: 0, h: 0 };
const CONTACT_EPS = 1e-4;

function overlapX(a: Rect, b: Rect): number {
  return Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
}

function overlapY(a: Rect, b: Rect): number {
  return Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
}

function sweepX(pos: Vec2, vel: Vec2, w: number, h: number, solids: Rect[], dt: number, out: MoveResult): void {
  const dx = vel.x * dt;
  if (dx === 0) {
    return;
  }
  pos.x += dx;
  const dir = dx > 0 ? 1 : -1;
  let hit = false;
  for (const s of solids) {
    aabbOf(pos, w, h, scratch);
    if (overlapX(scratch, s) <= 0 || overlapY(scratch, s) <= CONTACT_EPS) {
      continue;
    }
    if (dir > 0) {
      pos.x = s.x - w * 0.5;
    } else {
      pos.x = s.x + s.w + w * 0.5;
    }
    hit = true;
  }
  if (hit) {
    vel.x = 0;
    out.hitWall = dir > 0 ? 1 : -1;
  }
}

function sweepY(pos: Vec2, vel: Vec2, w: number, h: number, solids: Rect[], dt: number, out: MoveResult): void {
  const dy = vel.y * dt;
  if (dy === 0) {
    return;
  }
  pos.y += dy;
  const dir = dy > 0 ? 1 : -1;
  let hit = false;
  for (const s of solids) {
    aabbOf(pos, w, h, scratch);
    if (overlapY(scratch, s) <= 0 || overlapX(scratch, s) <= CONTACT_EPS) {
      continue;
    }
    if (dir > 0) {
      pos.y = s.y - h;
    } else {
      pos.y = s.y + s.h;
    }
    hit = true;
  }
  if (hit) {
    vel.y = 0;
    if (dir > 0) {
      out.hitCeiling = true;
    } else {
      out.grounded = true;
    }
  }
}

export function moveAndCollide(
  pos: Vec2,
  vel: Vec2,
  w: number,
  h: number,
  solids: Rect[],
  dt: number,
  out: MoveResult
): MoveResult {
  out.grounded = false;
  out.hitCeiling = false;
  out.hitWall = 0;
  const limit = Math.max(0.001, Math.min(w, h) * 0.5);
  const travel = Math.max(Math.abs(vel.x * dt), Math.abs(vel.y * dt));
  let steps = 1;
  if (travel > limit) {
    steps = Math.ceil(travel / limit);
  }
  const sub = dt / steps;
  for (let i = 0; i < steps; i += 1) {
    sweepX(pos, vel, w, h, solids, sub, out);
    sweepY(pos, vel, w, h, solids, sub, out);
  }
  return out;
}

export function groundedOn(pos: Vec2, w: number, h: number, solids: Rect[], probe: number): boolean {
  aabbOf(pos, w, h, scratch);
  scratch.y -= probe;
  scratch.h = probe;
  for (const s of solids) {
    if (rectsOverlap(scratch, s)) {
      return true;
    }
  }
  return false;
}
