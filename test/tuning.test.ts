import { describe, expect, it } from "vitest";
import { tuning } from "../src/tuning";

describe("tuning", () => {
  it("keeps the dash shorter than its cooldown so it cannot be chained", () => {
    expect(tuning.dash.durationMs).toBeLessThan(tuning.dash.cooldownMs);
  });

  it("keeps the arena larger than the camera can hide", () => {
    expect(tuning.arena.radius).toBeGreaterThan(tuning.player.radius * 10);
  });
});
