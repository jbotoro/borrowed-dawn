import { describe, expect, it } from "vitest";
import { tuning } from "../src/tuning";
import { DT } from "./helpers";

describe("tuning", () => {
  it("keeps the dash shorter than its cooldown so it cannot be chained", () => {
    expect(tuning.dash.durationMs).toBeLessThan(tuning.dash.cooldownMs);
  });

  it("lets a swing land inside the guard telegraph", () => {
    expect(tuning.attack.windupMs + tuning.attack.activeMs).toBeLessThan(tuning.guard.telegraphMs);
  });

  it("keeps the jump buffer and coyote window longer than a fixed step", () => {
    const stepMs = DT * 1000;
    expect(tuning.player.jumpBufferMs).toBeGreaterThan(stepMs);
    expect(tuning.player.coyoteMs).toBeGreaterThan(stepMs);
  });

  it("makes longwick a visible reach upgrade", () => {
    expect(tuning.attack.longwickReach).toBeGreaterThan(tuning.attack.reach);
  });
});
