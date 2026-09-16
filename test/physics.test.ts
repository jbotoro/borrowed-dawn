import { describe, expect, it } from "vitest";
import { aabbOf, createMoveResult, moveAndCollide, rectsOverlap } from "../src/game/physics";
import type { Rect } from "../src/game/types";
import { tuning } from "../src/tuning";
import { DT } from "./helpers";

describe("physics", () => {
  it("lands a falling body on a solid and reports grounded", () => {
    const floor: Rect[] = [{ x: -10, y: 0, w: 20, h: 1 }];
    const pos = { x: 0, y: 6 };
    const vel = { x: 0, y: 0 };
    const out = createMoveResult();
    let grounded = false;
    for (let i = 0; i < 200; i += 1) {
      vel.y -= tuning.player.gravity * DT;
      if (vel.y < -tuning.player.maxFallSpeed) {
        vel.y = -tuning.player.maxFallSpeed;
      }
      moveAndCollide(pos, vel, tuning.player.width, tuning.player.height, floor, DT, out);
      if (out.grounded) {
        grounded = true;
        break;
      }
    }
    expect(grounded).toBe(true);
    expect(pos.y).toBeCloseTo(1, 6);
    expect(vel.y).toBe(0);
  });

  it("stops a body flush against a wall", () => {
    const solids: Rect[] = [
      { x: -10, y: 0, w: 20, h: 1 },
      { x: 5, y: 1, w: 1, h: 4 }
    ];
    const pos = { x: 0, y: 1 };
    const vel = { x: tuning.player.walkSpeed * 4, y: 0 };
    const out = createMoveResult();
    for (let i = 0; i < 60; i += 1) {
      vel.x = tuning.player.walkSpeed * 4;
      moveAndCollide(pos, vel, tuning.player.width, tuning.player.height, solids, DT, out);
      if (out.hitWall !== 0) {
        break;
      }
    }
    expect(out.hitWall).toBe(1);
    expect(pos.x).toBeCloseTo(5 - tuning.player.width / 2, 6);
  });

  it("does not tunnel a small body through a thin floor at max fall speed", () => {
    const floor: Rect[] = [{ x: -10, y: 0, w: 20, h: 0.2 }];
    const size = 0.2;
    const pos = { x: 0, y: 5 };
    const vel = { x: 0, y: -tuning.player.maxFallSpeed };
    const out = createMoveResult();
    let lowest = pos.y;
    for (let i = 0; i < 120; i += 1) {
      vel.y = -tuning.player.maxFallSpeed;
      moveAndCollide(pos, vel, size, size, floor, DT, out);
      lowest = Math.min(lowest, pos.y);
      if (out.grounded) {
        break;
      }
    }
    expect(out.grounded).toBe(true);
    expect(pos.y).toBeCloseTo(0.2, 6);
    expect(lowest).toBeGreaterThanOrEqual(0.2 - 1e-9);
  });

  it("does not eject sideways when the head rests exactly against a ceiling", () => {
    const solids: Rect[] = [
      { x: -10, y: 0, w: 20, h: 1 },
      { x: 3, y: 3.4, w: 6, h: 1 }
    ];
    const w = tuning.player.width;
    const h = tuning.player.height;
    const pos = { x: 5, y: 1 };
    const vel = { x: 0, y: tuning.player.jumpVelocity };
    const out = createMoveResult();
    for (let i = 0; i < 30; i += 1) {
      vel.y = tuning.player.jumpVelocity;
      moveAndCollide(pos, vel, w, h, solids, DT, out);
      if (out.hitCeiling) {
        break;
      }
    }
    expect(out.hitCeiling).toBe(true);
    expect(pos.y).toBeCloseTo(3.4 - h, 9);
    for (let i = 0; i < 20; i += 1) {
      vel.x = tuning.player.walkSpeed;
      vel.y = 0;
      const before = pos.x;
      moveAndCollide(pos, vel, w, h, solids, DT, out);
      expect(pos.x).toBeGreaterThan(before);
      expect(out.hitWall).toBe(0);
    }
  });

  it("does not eject sideways when walking on a floor it was placed on", () => {
    const floor: Rect[] = [{ x: 3.3, y: 0.7, w: 20, h: 1 }];
    const w = tuning.player.width;
    const h = tuning.player.height;
    const pos = { x: 5, y: 4 };
    const vel = { x: 0, y: -tuning.player.maxFallSpeed };
    const out = createMoveResult();
    for (let i = 0; i < 60; i += 1) {
      vel.y = -tuning.player.maxFallSpeed;
      moveAndCollide(pos, vel, w, h, floor, DT, out);
      if (out.grounded) {
        break;
      }
    }
    expect(out.grounded).toBe(true);
    for (let i = 0; i < 20; i += 1) {
      vel.x = tuning.player.walkSpeed;
      vel.y = -0.01;
      const before = pos.x;
      moveAndCollide(pos, vel, w, h, floor, DT, out);
      expect(pos.x).toBeGreaterThan(before);
      expect(out.hitWall).toBe(0);
    }
  });

  it("reports overlap only when rects intersect", () => {
    const a: Rect = { x: 0, y: 0, w: 1, h: 1 };
    const b: Rect = { x: 0.5, y: 0.5, w: 1, h: 1 };
    const c: Rect = { x: 2, y: 0, w: 1, h: 1 };
    expect(rectsOverlap(a, b)).toBe(true);
    expect(rectsOverlap(a, c)).toBe(false);
  });

  it("anchors an aabb on the feet", () => {
    const out: Rect = { x: 0, y: 0, w: 0, h: 0 };
    aabbOf({ x: 3, y: 2 }, 0.6, 1.2, out);
    expect(out.x).toBeCloseTo(2.7, 6);
    expect(out.y).toBe(2);
    expect(out.w).toBe(0.6);
    expect(out.h).toBe(1.2);
  });
});
