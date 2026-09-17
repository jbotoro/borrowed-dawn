import { describe, expect, it } from "vitest";
import { applyHurt, attackHitbox, resetPlayer, stepPlayer } from "../src/game/player";
import type { GameEvent, Input, PlayerState, Rect } from "../src/game/types";
import { tuning } from "../src/tuning";
import { DT, countEvents, emptyInput, playerAt } from "./helpers";

function ground(): Rect[] {
  return [{ x: -200, y: -1, w: 600, h: 1 }];
}

interface Sim {
  player: PlayerState;
  events: GameEvent[];
  t: number;
  solids: Rect[];
  run(steps: number, input?: Input): void;
}

function sim(x = 0, y = 0, solids: Rect[] = ground()): Sim {
  const state: Sim = {
    player: playerAt(x, y),
    events: [],
    t: 0,
    solids,
    run(steps: number, input: Input = emptyInput()): void {
      for (let i = 0; i < steps; i += 1) {
        stepPlayer(state.player, input, state.solids, state.t, DT, tuning, state.events);
        state.t += DT;
      }
    }
  };
  return state;
}

describe("player jump", () => {
  it("does not jump in mid air beyond coyote time", () => {
    const s = sim(0, 8, []);
    s.run(30);
    s.events.length = 0;
    const press = emptyInput();
    press.jump = true;
    press.jumpHeld = true;
    s.run(1, press);
    s.run(3);
    expect(countEvents(s.events, "jump")).toBe(0);
  });

  it("jumps within coyote time after walking off a ledge", () => {
    const ledge: Rect[] = [{ x: 0, y: -1, w: 5, h: 1 }];
    const s = sim(4.5, 0, ledge);
    const walk = emptyInput();
    walk.moveX = 1;
    s.run(2);
    expect(s.player.grounded).toBe(true);
    while (s.player.grounded && s.t < 2) {
      s.run(1, walk);
    }
    expect(s.player.grounded).toBe(false);
    s.events.length = 0;
    const press = emptyInput();
    press.jump = true;
    press.jumpHeld = true;
    s.run(1, press);
    expect(countEvents(s.events, "jump")).toBe(1);
  });

  it("fires a buffered jump on landing", () => {
    const floorTop = 0;
    const s = sim(0, floorTop + 0.15, ground());
    const press = emptyInput();
    press.jump = true;
    press.jumpHeld = true;
    s.run(1, press);
    expect(countEvents(s.events, "jump")).toBe(0);
    const hold = emptyInput();
    hold.jumpHeld = true;
    s.run(20, hold);
    expect(countEvents(s.events, "land")).toBe(1);
    expect(countEvents(s.events, "jump")).toBe(1);
  });

  it("cuts the apex when the jump button is released", () => {
    const held = sim(0, 0);
    const cut = sim(0, 0);
    held.run(2);
    cut.run(2);
    const press = emptyInput();
    press.jump = true;
    press.jumpHeld = true;
    held.run(1, press);
    cut.run(1, press);
    const keep = emptyInput();
    keep.jumpHeld = true;
    const release = emptyInput();
    let heldApex = 0;
    let cutApex = 0;
    for (let i = 0; i < 90; i += 1) {
      held.run(1, keep);
      cut.run(1, release);
      heldApex = Math.max(heldApex, held.player.pos.y);
      cutApex = Math.max(cutApex, cut.player.pos.y);
    }
    expect(cutApex).toBeLessThan(heldApex);
    expect(heldApex).toBeGreaterThan(0);
  });
});

describe("player dash", () => {
  it("travels exactly the tuned dash distance", () => {
    const s = sim(0, 0);
    s.run(4);
    const startX = s.player.pos.x;
    const press = emptyInput();
    press.dash = true;
    s.run(1, press);
    expect(countEvents(s.events, "dash")).toBe(1);
    while (s.t < s.player.dashUntil) {
      s.run(1);
    }
    expect(s.player.pos.x - startX).toBeCloseTo(tuning.dash.distance, 4);
  });

  it("refuses a second dash before the cooldown elapses", () => {
    const s = sim(0, 0);
    s.run(4);
    const press = emptyInput();
    press.dash = true;
    s.run(1, press);
    while (s.t < s.player.dashUntil) {
      s.run(1);
    }
    s.events.length = 0;
    s.run(1, press);
    expect(countEvents(s.events, "dash")).toBe(0);
    while (s.t < s.player.dashReadyAt) {
      s.run(1);
    }
    s.run(1, press);
    expect(countEvents(s.events, "dash")).toBe(1);
  });

  it("allows one air dash and refuses the next until landing", () => {
    const deep: Rect[] = [{ x: -200, y: -80, w: 600, h: 1 }];
    const s = sim(0, 0, deep);
    const press = emptyInput();
    press.dash = true;
    s.run(1, press);
    expect(countEvents(s.events, "dash")).toBe(1);
    while (s.t < s.player.dashUntil) {
      s.run(1);
    }
    expect(s.player.grounded).toBe(false);
    while (s.t < s.player.dashReadyAt) {
      s.run(1);
    }
    s.events.length = 0;
    s.run(1, press);
    expect(s.player.airDashesUsed).toBe(tuning.dash.airDashes);
    expect(countEvents(s.events, "dash")).toBe(0);
    for (let i = 0; i < 600 && !s.player.grounded; i += 1) {
      s.run(1);
    }
    expect(s.player.grounded).toBe(true);
    s.events.length = 0;
    s.run(1, press);
    expect(countEvents(s.events, "dash")).toBe(1);
  });
});

describe("player attack", () => {
  function phaseTimes(moveY: number, airborne: boolean): { s: Sim; start: number; times: Record<string, number> } {
    const s = sim(0, airborne ? 6 : 0);
    s.run(4);
    const press = emptyInput();
    press.attack = true;
    press.moveY = moveY;
    const start = s.t;
    s.run(1, press);
    const times: Record<string, number> = {};
    for (let i = 0; i < 90; i += 1) {
      const before = s.player.attackPhase;
      s.run(1);
      if (s.player.attackPhase !== before && times[s.player.attackPhase] === undefined) {
        times[s.player.attackPhase] = s.t - DT;
      }
    }
    return { s, start, times };
  }

  it("runs windup, active and recovery for the tuned durations", () => {
    const { start, times } = phaseTimes(0, false);
    const active = times.active ?? -1;
    const recovery = times.recovery ?? -1;
    const none = times.none ?? -1;
    expect(active).toBeGreaterThanOrEqual(start + tuning.attack.windupMs / 1000 - 1e-9);
    expect(active).toBeLessThan(start + tuning.attack.windupMs / 1000 + DT);
    expect(recovery - active).toBeGreaterThanOrEqual(tuning.attack.activeMs / 1000 - 1e-9);
    expect(recovery - active).toBeLessThan(tuning.attack.activeMs / 1000 + DT);
    expect(none - recovery).toBeGreaterThanOrEqual(tuning.attack.recoveryMs / 1000 - 1e-9);
    expect(none - recovery).toBeLessThan(tuning.attack.recoveryMs / 1000 + DT);
  });

  it("puts the side hitbox in front of the body", () => {
    const s = sim(0, 0);
    s.run(4);
    const press = emptyInput();
    press.attack = true;
    s.run(1, press);
    while (s.player.attackPhase !== "active") {
      s.run(1);
    }
    const out: Rect = { x: 0, y: 0, w: 0, h: 0 };
    const box = attackHitbox(s.player, tuning, out);
    expect(box).not.toBeNull();
    if (!box) {
      return;
    }
    expect(box.x).toBeGreaterThanOrEqual(s.player.pos.x + tuning.player.width / 2 - 1e-9);
    expect(box.w).toBeCloseTo(tuning.attack.reach, 6);
    expect(box.h).toBeCloseTo(tuning.attack.height, 6);
  });

  it("puts the up hitbox above the head and the down hitbox below the feet", () => {
    const up = sim(0, 0);
    up.run(4);
    const upPress = emptyInput();
    upPress.attack = true;
    upPress.moveY = 1;
    up.run(1, upPress);
    while (up.player.attackPhase !== "active") {
      up.run(1);
    }
    const outUp: Rect = { x: 0, y: 0, w: 0, h: 0 };
    const upBox = attackHitbox(up.player, tuning, outUp);
    expect(upBox).not.toBeNull();
    expect(up.player.attackDir).toBe("up");
    if (upBox) {
      expect(upBox.y).toBeGreaterThanOrEqual(up.player.pos.y + tuning.player.height - 1e-9);
    }

    const down = sim(0, 6, []);
    down.run(4);
    const downPress = emptyInput();
    downPress.attack = true;
    downPress.moveY = -1;
    down.run(1, downPress);
    while (down.player.attackPhase !== "active") {
      down.run(1);
    }
    const outDown: Rect = { x: 0, y: 0, w: 0, h: 0 };
    const downBox = attackHitbox(down.player, tuning, outDown);
    expect(down.player.attackDir).toBe("down");
    expect(downBox).not.toBeNull();
    if (downBox) {
      expect(downBox.y + downBox.h).toBeLessThanOrEqual(down.player.pos.y + 1e-9);
    }
  });

  it("extends the reach with longwick", () => {
    const s = sim(0, 0);
    s.player.longwick = true;
    s.run(4);
    const press = emptyInput();
    press.attack = true;
    s.run(1, press);
    while (s.player.attackPhase !== "active") {
      s.run(1);
    }
    const out: Rect = { x: 0, y: 0, w: 0, h: 0 };
    const box = attackHitbox(s.player, tuning, out);
    expect(box?.w).toBeCloseTo(tuning.attack.longwickReach, 6);
  });
});

describe("player hurt", () => {
  it("knocks the player away from the source and blocks repeat damage while invulnerable", () => {
    const s = sim(0, 0);
    s.run(4);
    const died = applyHurt(s.player, s.player.pos.x + 2, 1, s.t, tuning, s.events);
    expect(died).toBe(false);
    expect(s.player.health).toBe(tuning.player.maxHealth - 1);
    expect(s.player.vel.x).toBeCloseTo(-tuning.player.hurtKnockbackX, 6);
    const again = applyHurt(s.player, s.player.pos.x + 2, 1, s.t, tuning, s.events);
    expect(again).toBe(false);
    expect(s.player.health).toBe(tuning.player.maxHealth - 1);
  });
});

describe("player reset", () => {
  it("restores health and clears combat state", () => {
    const s = sim(0, 0);
    s.player.health = 1;
    s.player.attackPhase = "active";
    resetPlayer(s.player, { x: 5, y: 2 }, -1, tuning, 0);
    expect(s.player.health).toBe(tuning.player.maxHealth);
    expect(s.player.attackPhase).toBe("none");
    expect(s.player.pos.x).toBe(5);
    expect(s.player.facing).toBe(-1);
  });
});
