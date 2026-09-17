import type { Tuning } from "../tuning";
import { createMoveResult, moveAndCollide } from "./physics";
import type { AttackDir, Facing, GameEvent, Input, PlayerState, Rect, Vec2 } from "./types";

const move = createMoveResult();

function emit(events: GameEvent[], kind: GameEvent["kind"], x: number, y: number): void {
  events.push({ kind, x, y });
}

export function createPlayer(): PlayerState {
  return {
    pos: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    facing: 1,
    grounded: false,
    coyoteUntil: 0,
    jumpBufferedUntil: 0,
    jumpCutApplied: true,
    health: 1,
    invulnerableUntil: 0,
    hurtUntil: 0,
    dashUntil: 0,
    dashReadyAt: 0,
    dashDir: 1,
    airDashesUsed: 0,
    attackPhase: "none",
    attackUntil: 0,
    attackDir: "side",
    attackHitIds: [],
    longwick: false
  };
}

export function resetPlayer(
  player: PlayerState,
  pos: Vec2,
  facing: Facing,
  tuning: Tuning,
  maxHealthBonus: number
): void {
  player.pos.x = pos.x;
  player.pos.y = pos.y;
  player.prev.x = pos.x;
  player.prev.y = pos.y;
  player.vel.x = 0;
  player.vel.y = 0;
  player.facing = facing;
  player.grounded = false;
  player.coyoteUntil = 0;
  player.jumpBufferedUntil = 0;
  player.jumpCutApplied = true;
  player.health = tuning.player.maxHealth + maxHealthBonus;
  player.invulnerableUntil = 0;
  player.hurtUntil = 0;
  player.dashUntil = 0;
  player.dashReadyAt = 0;
  player.dashDir = facing;
  player.airDashesUsed = 0;
  player.attackPhase = "none";
  player.attackUntil = 0;
  player.attackDir = "side";
  player.attackHitIds.length = 0;
}

export function placePlayer(player: PlayerState, pos: Vec2, facing: Facing): void {
  player.pos.x = pos.x;
  player.pos.y = pos.y;
  player.prev.x = pos.x;
  player.prev.y = pos.y;
  player.vel.x = 0;
  player.vel.y = 0;
  player.facing = facing;
  player.grounded = false;
  player.coyoteUntil = 0;
  player.jumpBufferedUntil = 0;
  player.jumpCutApplied = true;
  player.hurtUntil = 0;
  player.dashUntil = 0;
  player.dashReadyAt = 0;
  player.dashDir = facing;
  player.airDashesUsed = 0;
  player.attackPhase = "none";
  player.attackUntil = 0;
  player.attackDir = "side";
  player.attackHitIds.length = 0;
}

export function playerReach(player: PlayerState, tuning: Tuning): number {
  return player.longwick ? tuning.attack.longwickReach : tuning.attack.reach;
}

export function attackHitbox(player: PlayerState, tuning: Tuning, out: Rect): Rect | null {
  if (player.attackPhase !== "active") {
    return null;
  }
  return attackRect(player, player.attackDir, tuning, out);
}

export function attackRect(player: PlayerState, dir: AttackDir, tuning: Tuning, out: Rect): Rect {
  const reach = playerReach(player, tuning);
  const body = tuning.player;
  const swing = tuning.attack.height;
  if (dir === "up") {
    out.w = swing;
    out.h = reach;
    out.x = player.pos.x - swing * 0.5;
    out.y = player.pos.y + body.height;
    return out;
  }
  if (dir === "down") {
    out.w = swing;
    out.h = reach;
    out.x = player.pos.x - swing * 0.5;
    out.y = player.pos.y - reach;
    return out;
  }
  out.w = reach;
  out.h = swing;
  out.x = player.facing > 0 ? player.pos.x + body.width * 0.5 : player.pos.x - body.width * 0.5 - reach;
  out.y = player.pos.y + body.height * 0.5 - swing * 0.5;
  return out;
}

export function applyRecoil(player: PlayerState, tuning: Tuning): void {
  if (player.attackDir !== "side") {
    return;
  }
  player.vel.x = -player.facing * tuning.attack.recoil;
}

export function isInvulnerable(player: PlayerState, t: number): boolean {
  return t < player.invulnerableUntil;
}

export function applyHurt(
  player: PlayerState,
  fromX: number,
  damage: number,
  t: number,
  tuning: Tuning,
  events: GameEvent[],
  god = false
): boolean {
  if (t < player.invulnerableUntil || player.health <= 0) {
    return false;
  }
  const cfg = tuning.player;
  if (!god) {
    player.health -= damage;
  }
  player.invulnerableUntil = t + cfg.hitInvulnerableMs / 1000;
  player.hurtUntil = t + cfg.hurtStunMs / 1000;
  const away: Facing = player.pos.x < fromX ? -1 : 1;
  player.vel.x = away * cfg.hurtKnockbackX;
  player.vel.y = cfg.hurtKnockbackY;
  player.dashUntil = 0;
  player.jumpCutApplied = true;
  player.attackPhase = "none";
  player.attackUntil = 0;
  emit(events, "hurt", player.pos.x, player.pos.y);
  if (player.health <= 0) {
    player.health = 0;
    emit(events, "death", player.pos.x, player.pos.y);
    return true;
  }
  return false;
}

export function stepPlayer(
  player: PlayerState,
  input: Input,
  solids: Rect[],
  t: number,
  dt: number,
  tuning: Tuning,
  events: GameEvent[]
): void {
  const cfg = tuning.player;
  const dashCfg = tuning.dash;
  const atkCfg = tuning.attack;

  player.prev.x = player.pos.x;
  player.prev.y = player.pos.y;

  if (player.attackPhase !== "none" && t >= player.attackUntil) {
    if (player.attackPhase === "windup") {
      player.attackPhase = "active";
      player.attackUntil = t + atkCfg.activeMs / 1000;
    } else if (player.attackPhase === "active") {
      player.attackPhase = "recovery";
      player.attackUntil = t + atkCfg.recoveryMs / 1000;
    } else {
      player.attackPhase = "none";
      player.attackUntil = 0;
    }
  }

  const stunned = t < player.hurtUntil;
  const wasDashing = t - dt < player.dashUntil;

  if (
    input.dash &&
    !stunned &&
    t >= player.dashUntil &&
    t >= player.dashReadyAt &&
    (player.grounded || player.airDashesUsed < dashCfg.airDashes)
  ) {
    player.dashUntil = t + dashCfg.durationMs / 1000;
    player.dashReadyAt = t + dashCfg.cooldownMs / 1000;
    player.dashDir = player.facing;
    const invulnerableUntil = player.dashUntil + dashCfg.invulnerableMs / 1000;
    if (invulnerableUntil > player.invulnerableUntil) {
      player.invulnerableUntil = invulnerableUntil;
    }
    if (!player.grounded) {
      player.airDashesUsed += 1;
    }
    emit(events, "dash", player.pos.x, player.pos.y);
  }

  const dashing = t < player.dashUntil;

  if (!dashing && wasDashing) {
    const cap = cfg.walkSpeed;
    if (player.vel.x > cap) {
      player.vel.x = cap;
    } else if (player.vel.x < -cap) {
      player.vel.x = -cap;
    }
  }

  if (input.attack && player.attackPhase === "none" && !dashing && !stunned) {
    let dir: AttackDir = "side";
    if (input.moveY > 0.5) {
      dir = "up";
    } else if (input.moveY < -0.5 && !player.grounded) {
      dir = "down";
    }
    player.attackDir = dir;
    player.attackPhase = "windup";
    player.attackUntil = t + atkCfg.windupMs / 1000;
    player.attackHitIds.length = 0;
    emit(events, "attackSwing", player.pos.x, player.pos.y);
  }

  let moveX = 0;
  if (!stunned && !dashing) {
    moveX = input.moveX > 1 ? 1 : input.moveX < -1 ? -1 : input.moveX;
  }

  if (moveX !== 0 && !dashing && player.attackPhase !== "active") {
    player.facing = moveX > 0 ? 1 : -1;
  }

  if (player.grounded) {
    player.coyoteUntil = t + cfg.coyoteMs / 1000;
    player.airDashesUsed = 0;
  }

  if (input.jump) {
    player.jumpBufferedUntil = t + cfg.jumpBufferMs / 1000;
  }

  let jumped = false;
  if (!dashing && !stunned && t < player.jumpBufferedUntil && (player.grounded || t < player.coyoteUntil)) {
    player.vel.y = cfg.jumpVelocity;
    player.jumpBufferedUntil = 0;
    player.coyoteUntil = 0;
    player.jumpCutApplied = false;
    player.grounded = false;
    jumped = true;
    emit(events, "jump", player.pos.x, player.pos.y);
  }

  if (!jumped && !input.jumpHeld && !player.jumpCutApplied && player.vel.y > 0) {
    player.vel.y *= cfg.jumpCutMultiplier;
    player.jumpCutApplied = true;
  }

  if (dashing) {
    const remaining = player.dashUntil - t;
    const slice = remaining < dt ? remaining : dt;
    const speed = dashCfg.distance / (dashCfg.durationMs / 1000);
    player.vel.x = player.dashDir * speed * (slice / dt);
    player.vel.y = 0;
  } else if (!stunned) {
    const target = moveX * cfg.walkSpeed;
    let rate = moveX !== 0 ? cfg.accel : cfg.decel;
    if (!player.grounded) {
      rate *= cfg.airControl;
    }
    const delta = rate * dt;
    if (player.vel.x < target) {
      player.vel.x = Math.min(target, player.vel.x + delta);
    } else if (player.vel.x > target) {
      player.vel.x = Math.max(target, player.vel.x - delta);
    }
  }

  if (!dashing) {
    player.vel.y -= cfg.gravity * dt;
    if (player.vel.y < -cfg.maxFallSpeed) {
      player.vel.y = -cfg.maxFallSpeed;
    }
  }

  const wasGrounded = player.grounded;
  moveAndCollide(player.pos, player.vel, cfg.width, cfg.height, solids, dt, move);
  player.grounded = move.grounded;

  if (player.grounded && !wasGrounded) {
    player.airDashesUsed = 0;
    player.jumpCutApplied = true;
    emit(events, "land", player.pos.x, player.pos.y);
  }
}
