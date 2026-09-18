import type { Tuning } from "../tuning";
import { bossAttackHitbox, bossBodyIsHazard, bossBodyRect, bossContactDamage, hurtBoss } from "./boss";
import { enemyConfig, hurtEnemy } from "./enemies";
import { aabbOf, rectsOverlap } from "./physics";
import { applyHurt, applyRecoil, attackHitbox } from "./player";
import type { GameEvent, GameState, Rect, Room } from "./types";

const swing: Rect = { x: 0, y: 0, w: 0, h: 0 };
const bodyA: Rect = { x: 0, y: 0, w: 0, h: 0 };
const bodyB: Rect = { x: 0, y: 0, w: 0, h: 0 };

function breakableHitId(index: number): number {
  return -2 - index;
}

export function resolveCombat(
  state: GameState,
  room: Room,
  breakableHp: Map<string, number>,
  t: number,
  tuning: Tuning,
  events: GameEvent[]
): void {
  const player = state.player;
  const hit = attackHitbox(player, tuning, swing);

  if (hit) {
    for (const enemy of state.enemies) {
      if (!enemy.alive || player.attackHitIds.includes(enemy.id)) {
        continue;
      }
      const cfg = enemyConfig(enemy.kind, tuning);
      aabbOf(enemy.pos, cfg.width, cfg.height, bodyA);
      if (!rectsOverlap(hit, bodyA)) {
        continue;
      }
      const firstHit = player.attackHitIds.length === 0;
      player.attackHitIds.push(enemy.id);
      events.push({ kind: "attackHit", x: enemy.pos.x, y: enemy.pos.y + cfg.height * 0.5 });
      hurtEnemy(enemy, tuning.attack.damage, player.pos.x, t, tuning, events);
      if (firstHit) {
        applyRecoil(player, tuning);
      }
    }

    const boss = state.boss;
    if (boss && boss.alive && !player.attackHitIds.includes(boss.id)) {
      bossBodyRect(boss, tuning, bodyA);
      if (rectsOverlap(hit, bodyA)) {
        const firstHit = player.attackHitIds.length === 0;
        player.attackHitIds.push(boss.id);
        events.push({ kind: "attackHit", x: boss.pos.x, y: boss.pos.y + tuning.boss.height * 0.5 });
        hurtBoss(boss, tuning.attack.damage, t, tuning, events);
        if (firstHit) {
          applyRecoil(player, tuning);
        }
      }
    }

    for (let i = 0; i < room.breakables.length; i += 1) {
      const breakable = room.breakables[i];
      if (!breakable) {
        continue;
      }
      const hitId = breakableHitId(i);
      if (state.progress.broken.includes(breakable.id) || player.attackHitIds.includes(hitId)) {
        continue;
      }
      if (!rectsOverlap(hit, breakable.rect)) {
        continue;
      }
      const firstHit = player.attackHitIds.length === 0;
      player.attackHitIds.push(hitId);
      const cx = breakable.rect.x + breakable.rect.w * 0.5;
      const cy = breakable.rect.y + breakable.rect.h * 0.5;
      const current = breakableHp.get(breakable.id);
      const left = (current === undefined ? breakable.health : current) - tuning.attack.damage;
      breakableHp.set(breakable.id, left);
      events.push({ kind: "attackHit", x: cx, y: cy });
      if (left <= 0) {
        state.progress.broken.push(breakable.id);
        events.push({ kind: "breakableBroken", x: cx, y: cy });
      }
      if (firstHit) {
        applyRecoil(player, tuning);
      }
    }
  }

  if (player.health <= 0) {
    return;
  }

  aabbOf(player.pos, tuning.player.width, tuning.player.height, bodyA);

  for (const enemy of state.enemies) {
    if (
      !enemy.alive ||
      enemy.state === "hurt" ||
      enemy.kind === "lamplighter" ||
      enemy.kind === "sentry"
    ) {
      continue;
    }
    const cfg = enemyConfig(enemy.kind, tuning);
    aabbOf(enemy.pos, cfg.width, cfg.height, bodyB);
    if (rectsOverlap(bodyA, bodyB)) {
      applyHurt(player, enemy.pos.x, cfg.damage, t, tuning, events, state.god);
    }
  }

  for (const hazard of state.hazards) {
    if (!hazard.alive) {
      continue;
    }
    aabbOf(hazard.pos, hazard.w, hazard.h, bodyB);
    if (rectsOverlap(bodyA, bodyB)) {
      applyHurt(player, hazard.pos.x, hazard.damage, t, tuning, events, state.god);
    }
  }

  const boss = state.boss;
  if (boss && boss.alive) {
    const reach = bossAttackHitbox(boss, tuning, bodyB);
    if (reach && rectsOverlap(bodyA, reach)) {
      applyHurt(player, boss.pos.x, tuning.boss.sweepDamage, t, tuning, events, state.god);
    }
    if (bossBodyIsHazard(boss)) {
      bossBodyRect(boss, tuning, bodyB);
      if (rectsOverlap(bodyA, bodyB)) {
        applyHurt(player, boss.pos.x, bossContactDamage(boss, tuning), t, tuning, events, state.god);
      }
    }
  }
}
