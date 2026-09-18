import type { Tuning } from "../tuning";
import { spawnHazard } from "./hazards";
import type { Rng } from "./rng";
import type { Boss, GameEvent, Hazard, PlayerState, Rect, Room } from "./types";

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function spawnBoss(room: Room, tuning: Tuning): Boss | null {
  const arena = room.bossArena;
  if (!arena) {
    return null;
  }
  return {
    id: -1,
    pos: { x: arena.x, y: arena.y },
    prev: { x: arena.x, y: arena.y },
    facing: -1,
    health: tuning.boss.health,
    maxHealth: tuning.boss.health,
    phase: 1,
    state: "dormant",
    stateStart: 0,
    stateUntil: 0,
    nextAttack: "sweep",
    lastAttack: null,
    repeatedLastAttack: false,
    arenaMinX: arena.arenaMinX,
    arenaMaxX: arena.arenaMaxX,
    alive: true,
    flash: 0
  };
}

export function spawnDefeatedBoss(room: Room, tuning: Tuning, t: number): Boss | null {
  const boss = spawnBoss(room, tuning);
  if (!boss) {
    return null;
  }
  boss.health = 0;
  boss.alive = false;
  boss.state = "dead";
  boss.stateStart = t;
  boss.stateUntil = t;
  return boss;
}

export function resetBoss(boss: Boss, room: Room, tuning: Tuning): void {
  const arena = room.bossArena;
  if (arena) {
    boss.pos.x = arena.x;
    boss.pos.y = arena.y;
    boss.arenaMinX = arena.arenaMinX;
    boss.arenaMaxX = arena.arenaMaxX;
  }
  boss.prev.x = boss.pos.x;
  boss.prev.y = boss.pos.y;
  boss.facing = -1;
  boss.health = tuning.boss.health;
  boss.maxHealth = tuning.boss.health;
  boss.phase = 1;
  boss.state = "dormant";
  boss.stateStart = 0;
  boss.stateUntil = 0;
  boss.nextAttack = "sweep";
  boss.lastAttack = null;
  boss.repeatedLastAttack = false;
  boss.alive = true;
  boss.flash = 0;
}

export function bossBodyRect(boss: Boss, tuning: Tuning, out: Rect): Rect {
  out.x = boss.pos.x - tuning.boss.width * 0.5;
  out.y = boss.pos.y;
  out.w = tuning.boss.width;
  out.h = tuning.boss.height;
  return out;
}

export function bossBodyIsHazard(boss: Boss): boolean {
  return boss.state === "sweepActive" || boss.state === "stompSlam";
}

export function bossContactDamage(boss: Boss, tuning: Tuning): number {
  return boss.state === "sweepActive" ? tuning.boss.sweepDamage : tuning.boss.stompDamage;
}

export function bossAttackHitbox(boss: Boss, tuning: Tuning, out: Rect): Rect | null {
  if (boss.state !== "sweepActive") {
    return null;
  }
  const cfg = tuning.boss;
  out.w = cfg.sweepReach;
  out.h = cfg.height * cfg.sweepHeightRatio;
  out.x = boss.facing > 0 ? boss.pos.x + cfg.width * 0.5 : boss.pos.x - cfg.width * 0.5 - cfg.sweepReach;
  out.y = boss.pos.y;
  return out;
}

function setState(boss: Boss, state: Boss["state"], t: number, durationMs: number): void {
  boss.state = state;
  boss.stateStart = t;
  boss.stateUntil = t + durationMs / 1000;
}

function wake(boss: Boss, t: number, tuning: Tuning): void {
  setState(boss, "idle", t, tuning.boss.idleMs);
  boss.nextAttack = "sweep";
}

export function hurtBoss(
  boss: Boss,
  damage: number,
  t: number,
  tuning: Tuning,
  events: GameEvent[]
): boolean {
  if (!boss.alive || boss.state === "dead") {
    return false;
  }
  if (boss.state === "dormant") {
    wake(boss, t, tuning);
  }
  boss.health -= damage;
  boss.flash = 1;
  events.push({ kind: "bossHurt", x: boss.pos.x, y: boss.pos.y });
  if (boss.health <= 0) {
    boss.health = 0;
    boss.alive = false;
    setState(boss, "dead", t, 0);
    events.push({ kind: "bossDeath", x: boss.pos.x, y: boss.pos.y });
    return true;
  }
  return false;
}

function recordAttack(boss: Boss, attack: Boss["nextAttack"]): void {
  boss.repeatedLastAttack = boss.lastAttack === attack;
  boss.lastAttack = attack;
}

function telegraphScale(boss: Boss, tuning: Tuning, rng: Rng): number {
  const scale = rng.range(tuning.boss.telegraphScaleMin, tuning.boss.telegraphScaleMax);
  return boss.phase === 2 ? scale * tuning.boss.phase2TelegraphScale : scale;
}

function beginSweep(boss: Boss, t: number, tuning: Tuning, rng: Rng, events: GameEvent[]): void {
  recordAttack(boss, "sweep");
  setState(
    boss,
    "sweepTelegraph",
    t,
    tuning.boss.sweepTelegraphMs * telegraphScale(boss, tuning, rng)
  );
  events.push({ kind: "bossTelegraph", x: boss.pos.x, y: boss.pos.y });
}

function beginStomp(boss: Boss, t: number, tuning: Tuning, rng: Rng, events: GameEvent[]): void {
  recordAttack(boss, "stomp");
  setState(
    boss,
    "stompTelegraph",
    t,
    tuning.boss.stompTelegraphMs * telegraphScale(boss, tuning, rng)
  );
  events.push({ kind: "bossTelegraph", x: boss.pos.x, y: boss.pos.y });
}

function goIdle(boss: Boss, t: number, tuning: Tuning, next: "sweep" | "stomp"): void {
  setState(boss, "idle", t, tuning.boss.idleMs);
  boss.nextAttack = next;
}

function otherAttack(attack: Boss["nextAttack"]): Boss["nextAttack"] {
  return attack === "sweep" ? "stomp" : "sweep";
}

function chooseNextAttack(boss: Boss, tuning: Tuning, rng: Rng): Boss["nextAttack"] {
  const last = boss.lastAttack;
  if (last === null) {
    return "sweep";
  }
  if (!boss.repeatedLastAttack && rng.next() < tuning.boss.attackRepeatChance) {
    return last;
  }
  return otherAttack(last);
}

function phaseTwoOpeningAttack(boss: Boss): Boss["nextAttack"] {
  return boss.lastAttack === "sweep" && boss.repeatedLastAttack ? "stomp" : "sweep";
}

export function stepBoss(
  boss: Boss,
  player: PlayerState,
  room: Room,
  hazards: Hazard[],
  t: number,
  dt: number,
  tuning: Tuning,
  rng: Rng,
  events: GameEvent[]
): void {
  const cfg = tuning.boss;
  boss.prev.x = boss.pos.x;
  boss.prev.y = boss.pos.y;
  if (boss.flash > 0) {
    boss.flash = Math.max(0, boss.flash - tuning.feel.flashDecayPerSec * dt);
  }
  if (boss.state === "dead") {
    return;
  }
  const floorY = room.bossArena ? room.bossArena.y : boss.pos.y;

  if (boss.state === "dormant") {
    if (player.pos.x >= boss.arenaMinX && player.pos.x <= boss.arenaMaxX) {
      wake(boss, t, tuning);
    }
    return;
  }

  if (boss.phase === 1 && boss.health <= cfg.phase2At * boss.maxHealth) {
    boss.phase = 2;
    setState(boss, "crack", t, cfg.crackMs);
    boss.pos.y = floorY;
    events.push({ kind: "bossPhase", x: boss.pos.x, y: boss.pos.y });
    return;
  }

  const towardPlayer = player.pos.x < boss.pos.x ? -1 : 1;

  if (boss.state === "crack") {
    if (t >= boss.stateUntil) {
      goIdle(boss, t, tuning, phaseTwoOpeningAttack(boss));
    }
    return;
  }

  if (boss.state === "idle") {
    boss.facing = towardPlayer;
    if (t >= boss.stateUntil) {
      if (boss.nextAttack === "sweep") {
        beginSweep(boss, t, tuning, rng, events);
      } else {
        beginStomp(boss, t, tuning, rng, events);
      }
    }
    return;
  }

  if (boss.state === "sweepTelegraph") {
    boss.facing = towardPlayer;
    if (t >= boss.stateUntil) {
      setState(boss, "sweepActive", t, cfg.sweepActiveMs);
      events.push({ kind: "bossAttack", x: boss.pos.x, y: boss.pos.y });
    }
    return;
  }

  if (boss.state === "sweepActive") {
    if (t >= boss.stateUntil) {
      setState(boss, "sweepRecover", t, cfg.sweepRecoveryMs);
    }
    return;
  }

  if (boss.state === "sweepRecover") {
    if (t >= boss.stateUntil) {
      if (boss.phase === 2) {
        boss.nextAttack = "stomp";
        beginStomp(boss, t, tuning, rng, events);
      } else {
        goIdle(boss, t, tuning, chooseNextAttack(boss, tuning, rng));
      }
    }
    return;
  }

  if (boss.state === "stompTelegraph") {
    boss.facing = towardPlayer;
    if (t >= boss.stateUntil) {
      setState(boss, "stompRise", t, cfg.stompRiseMs);
    }
    return;
  }

  const lift = cfg.height * cfg.stompRiseRatio;

  if (boss.state === "stompRise") {
    const dur = Math.max(1e-6, cfg.stompRiseMs / 1000);
    boss.pos.y = floorY + lift * clamp01(1 - (boss.stateUntil - t) / dur);
    if (t >= boss.stateUntil) {
      boss.pos.y = floorY + lift;
      setState(boss, "stompSlam", t, cfg.stompSlamMs);
    }
    return;
  }

  if (boss.state === "stompSlam") {
    const dur = Math.max(1e-6, cfg.stompSlamMs / 1000);
    boss.pos.y = floorY + lift * (1 - clamp01(1 - (boss.stateUntil - t) / dur));
    if (t >= boss.stateUntil) {
      boss.pos.y = floorY;
      setState(
        boss,
        "stompRecover",
        t,
        boss.phase === 2 ? cfg.phase2RecoveryMs : cfg.stompRecoveryMs
      );
      const until = t + cfg.stompWaveLifeMs / 1000;
      spawnHazard(
        hazards,
        "wave",
        boss.pos.x,
        floorY,
        cfg.stompWaveWidth,
        cfg.stompWaveHeight,
        cfg.stompWaveSpeed,
        0,
        until,
        cfg.stompDamage
      );
      spawnHazard(
        hazards,
        "wave",
        boss.pos.x,
        floorY,
        cfg.stompWaveWidth,
        cfg.stompWaveHeight,
        -cfg.stompWaveSpeed,
        0,
        until,
        cfg.stompDamage
      );
      events.push({ kind: "bossAttack", x: boss.pos.x, y: boss.pos.y });
    }
    return;
  }

  if (boss.state === "stompRecover") {
    if (t >= boss.stateUntil) {
      goIdle(boss, t, tuning, chooseNextAttack(boss, tuning, rng));
    }
  }
}
