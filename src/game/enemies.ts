import type { Tuning } from "../tuning";
import { spawnHazard } from "./hazards";
import { createMoveResult, moveAndCollide } from "./physics";
import type { Enemy, EnemyKind, Facing, GameEvent, Hazard, PlayerState, Rect, Room } from "./types";

const move = createMoveResult();

export function enemyConfig(
  kind: EnemyKind,
  tuning: Tuning
): Tuning["guard"] | Tuning["stomper"] | Tuning["lamplighter"] {
  if (kind === "guard") {
    return tuning.guard;
  }
  return kind === "stomper" ? tuning.stomper : tuning.lamplighter;
}

export function enemyWidth(enemy: Enemy, tuning: Tuning): number {
  return enemyConfig(enemy.kind, tuning).width;
}

export function enemyHeight(enemy: Enemy, tuning: Tuning): number {
  return enemyConfig(enemy.kind, tuning).height;
}

export function spawnEnemies(room: Room, tuning: Tuning, t = 0): Enemy[] {
  const out: Enemy[] = [];
  for (const placement of room.enemies) {
    const lamplighter = placement.kind === "lamplighter";
    const hoverY = placement.y + tuning.lamplighter.hoverHeight;
    const y = lamplighter
      ? hoverY + Math.sin(t * tuning.lamplighter.bobSpeed) * tuning.lamplighter.bobAmp
      : placement.y;
    out.push({
      id: placement.id,
      kind: placement.kind,
      pos: { x: placement.x, y },
      prev: { x: placement.x, y },
      vel: { x: 0, y: lamplighter ? hoverY : 0 },
      facing: placement.facing,
      grounded: false,
      health: enemyConfig(placement.kind, tuning).health,
      state: "patrol",
      stateUntil: lamplighter ? t + tuning.lamplighter.dropIntervalMs / 1000 : 0,
      patrolMinX: placement.patrolMinX,
      patrolMaxX: placement.patrolMaxX,
      alive: true,
      flash: 0
    });
  }
  return out;
}

function stepLamplighter(
  enemy: Enemy,
  player: PlayerState,
  hazards: Hazard[],
  t: number,
  dt: number,
  tuning: Tuning
): void {
  const cfg = tuning.lamplighter;
  const sightY = enemy.pos.y - player.pos.y;
  const inSight =
    Math.abs(player.pos.x - enemy.pos.x) <= cfg.sightRange &&
    sightY >= -cfg.height &&
    sightY <= cfg.sightDepth;
  if (inSight) {
    enemy.facing = player.pos.x < enemy.pos.x ? -1 : 1;
  }
  if (enemy.state === "hurt") {
    if (t >= enemy.stateUntil) {
      enemy.state = "patrol";
      enemy.stateUntil = t + cfg.dropIntervalMs / 1000;
    }
  } else if (enemy.state === "patrol") {
    if (enemy.pos.x <= enemy.patrolMinX) {
      enemy.facing = 1;
    } else if (enemy.pos.x >= enemy.patrolMaxX) {
      enemy.facing = -1;
    }
    if (inSight) {
      enemy.facing = player.pos.x < enemy.pos.x ? -1 : 1;
    }
    if (inSight && t >= enemy.stateUntil) {
      enemy.state = "telegraph";
      enemy.stateUntil = t + cfg.dropTelegraphMs / 1000;
      enemy.vel.x = 0;
    } else {
      enemy.vel.x = enemy.facing * cfg.patrolSpeed;
    }
  } else if (enemy.state === "telegraph") {
    enemy.vel.x = 0;
    if (t >= enemy.stateUntil) {
      enemy.state = "attack";
      enemy.stateUntil = t + dt;
      spawnHazard(
        hazards,
        "ember",
        enemy.pos.x,
        enemy.pos.y,
        cfg.emberWidth,
        cfg.emberHeight,
        0,
        -cfg.emberFallSpeed,
        t + cfg.emberLifeMs / 1000,
        cfg.damage
      );
    }
  } else if (enemy.state === "attack") {
    enemy.vel.x = 0;
    if (t >= enemy.stateUntil) {
      enemy.state = "recover";
      enemy.stateUntil = t + cfg.dropIntervalMs / 1000;
    }
  } else if (enemy.state === "recover") {
    enemy.vel.x = 0;
    if (t >= enemy.stateUntil) {
      enemy.state = "patrol";
    }
  }
  enemy.pos.x += enemy.vel.x * dt;
  if (enemy.pos.x < enemy.patrolMinX) {
    enemy.pos.x = enemy.patrolMinX;
  } else if (enemy.pos.x > enemy.patrolMaxX) {
    enemy.pos.x = enemy.patrolMaxX;
  }
  enemy.pos.y = enemy.vel.y + Math.sin(t * cfg.bobSpeed) * cfg.bobAmp;
  enemy.grounded = false;
}

export function hurtEnemy(
  enemy: Enemy,
  damage: number,
  fromX: number,
  t: number,
  tuning: Tuning,
  events: GameEvent[]
): boolean {
  if (!enemy.alive || enemy.state === "dead") {
    return false;
  }
  enemy.health -= damage;
  enemy.flash = 1;
  const away: Facing = enemy.pos.x < fromX ? -1 : 1;
  enemy.vel.x = away * tuning.attack.knockback;
  events.push({ kind: "enemyHurt", x: enemy.pos.x, y: enemy.pos.y });
  if (enemy.health <= 0) {
    enemy.health = 0;
    enemy.alive = false;
    enemy.state = "dead";
    enemy.stateUntil = t;
    enemy.vel.x = 0;
    enemy.vel.y = 0;
    events.push({ kind: "enemyDeath", x: enemy.pos.x, y: enemy.pos.y });
    return true;
  }
  enemy.state = "hurt";
  enemy.stateUntil = t + enemyConfig(enemy.kind, tuning).hurtMs / 1000;
  return false;
}

function sees(enemy: Enemy, player: PlayerState, range: number, band: number): boolean {
  return Math.abs(player.pos.x - enemy.pos.x) <= range && Math.abs(player.pos.y - enemy.pos.y) <= band;
}

function stepGuard(enemy: Enemy, player: PlayerState, t: number, tuning: Tuning): void {
  const cfg = tuning.guard;
  if (enemy.state === "hurt") {
    if (t >= enemy.stateUntil) {
      enemy.state = "patrol";
    }
    return;
  }
  if (enemy.state === "patrol") {
    if (enemy.pos.x <= enemy.patrolMinX) {
      enemy.facing = 1;
    } else if (enemy.pos.x >= enemy.patrolMaxX) {
      enemy.facing = -1;
    }
    enemy.vel.x = enemy.facing * cfg.patrolSpeed;
    if (sees(enemy, player, cfg.sightRange, cfg.sightHeight)) {
      enemy.facing = player.pos.x < enemy.pos.x ? -1 : 1;
      enemy.state = "telegraph";
      enemy.stateUntil = t + cfg.telegraphMs / 1000;
      enemy.vel.x = 0;
    }
    return;
  }
  if (enemy.state === "telegraph") {
    enemy.vel.x = 0;
    if (t >= enemy.stateUntil) {
      enemy.state = "attack";
      enemy.stateUntil = t + cfg.lungeMs / 1000;
    }
    return;
  }
  if (enemy.state === "attack") {
    enemy.vel.x = enemy.facing * cfg.lungeSpeed;
    if (t >= enemy.stateUntil) {
      enemy.state = "recover";
      enemy.stateUntil = t + cfg.recoveryMs / 1000;
      enemy.vel.x = 0;
    }
    return;
  }
  if (enemy.state === "recover") {
    enemy.vel.x = 0;
    if (t >= enemy.stateUntil) {
      enemy.state = "patrol";
    }
  }
}

function stepStomper(enemy: Enemy, player: PlayerState, hazards: Hazard[], t: number, tuning: Tuning): void {
  const cfg = tuning.stomper;
  if (enemy.state === "hurt") {
    if (t >= enemy.stateUntil) {
      enemy.state = "patrol";
      enemy.stateUntil = t + cfg.hopIntervalMs / 1000;
    }
    return;
  }
  if (enemy.state === "attack") {
    if (enemy.grounded) {
      enemy.state = "recover";
      enemy.stateUntil = t + cfg.hopIntervalMs / 1000;
      enemy.vel.x = 0;
      const y = enemy.pos.y;
      const life = t + cfg.waveLifeMs / 1000;
      spawnHazard(
        hazards,
        "wave",
        enemy.pos.x,
        y,
        cfg.waveWidth,
        cfg.waveHeight,
        cfg.waveSpeed,
        0,
        life,
        cfg.damage
      );
      spawnHazard(
        hazards,
        "wave",
        enemy.pos.x,
        y,
        cfg.waveWidth,
        cfg.waveHeight,
        -cfg.waveSpeed,
        0,
        life,
        cfg.damage
      );
    }
    return;
  }
  if (enemy.state === "recover") {
    enemy.vel.x = 0;
    if (t >= enemy.stateUntil) {
      enemy.state = "patrol";
    }
    return;
  }
  enemy.vel.x = 0;
  if (!enemy.grounded || t < enemy.stateUntil) {
    return;
  }
  if (!sees(enemy, player, cfg.sightRange, cfg.sightRange)) {
    return;
  }
  enemy.facing = player.pos.x < enemy.pos.x ? -1 : 1;
  enemy.vel.x = enemy.facing * cfg.hopVelocityX;
  enemy.vel.y = cfg.hopVelocityY;
  enemy.state = "attack";
  enemy.stateUntil = t;
  enemy.grounded = false;
}

export function stepEnemies(
  enemies: Enemy[],
  player: PlayerState,
  solids: Rect[],
  hazards: Hazard[],
  t: number,
  dt: number,
  tuning: Tuning
): void {
  const gravity = tuning.player.gravity;
  const maxFall = tuning.player.maxFallSpeed;
  const decay = tuning.feel.flashDecayPerSec * dt;
  for (const enemy of enemies) {
    if (enemy.flash > 0) {
      enemy.flash = Math.max(0, enemy.flash - decay);
    }
    if (!enemy.alive) {
      continue;
    }
    enemy.prev.x = enemy.pos.x;
    enemy.prev.y = enemy.pos.y;
    if (enemy.kind === "lamplighter") {
      stepLamplighter(enemy, player, hazards, t, dt, tuning);
      continue;
    }
    if (enemy.kind === "guard") {
      stepGuard(enemy, player, t, tuning);
    } else {
      stepStomper(enemy, player, hazards, t, tuning);
    }
    enemy.vel.y -= gravity * dt;
    if (enemy.vel.y < -maxFall) {
      enemy.vel.y = -maxFall;
    }
    const cfg = enemyConfig(enemy.kind, tuning);
    moveAndCollide(enemy.pos, enemy.vel, cfg.width, cfg.height, solids, dt, move);
    enemy.grounded = move.grounded;
    if (enemy.kind === "guard") {
      const clampedX = Math.max(enemy.patrolMinX, Math.min(enemy.patrolMaxX, enemy.pos.x));
      if (clampedX !== enemy.pos.x) {
        enemy.pos.x = clampedX;
        if (enemy.state === "attack") {
          enemy.state = "recover";
          enemy.stateUntil = t + tuning.guard.recoveryMs / 1000;
          enemy.vel.x = 0;
        }
      }
    }
  }
}
