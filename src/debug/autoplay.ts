import { tuning } from "../tuning";
import type { Boss, Game, GameState, Input, Room, Vec2 } from "../game/types";
import { emptyInput, type InputSource } from "../input";

const RESTART_DELAY_MS = 1500;
const JUMP_HOLD_MS = 450;
const WAYPOINT_REACH_X = 0.9;
const WAYPOINT_REACH_Y = 1.6;
const JUMP_RISE = 0.5;
const JUMP_NEAR_X = 0.6;
const RETREAT_MARGIN = 1.8;
const BLOCKED_SECONDS = 0.2;
const DASH_AHEAD = 3;
const DASH_LEVEL = 0.8;
const GUARD_PANIC = 3;
const HAZARD_PANIC = 2;
const STUCK_SECONDS = 2.5;
const STUCK_EPSILON = 0.4;

const FORWARD_DOOR: Record<string, string> = {
  landing: "gallery",
  gallery: "belfry",
  cache: "gallery",
  belfry: "belfry"
};

const BOSS_TELEGRAPHS: Boss["state"][] = [
  "sweepTelegraph",
  "sweepActive",
  "stompTelegraph",
  "stompRise",
  "stompSlam"
];

function doorTarget(room: Room): Vec2 {
  const forward = FORWARD_DOOR[room.id];
  for (const door of room.doors) {
    if (door.to === forward) {
      return { x: door.rect.x + door.rect.w / 2, y: door.rect.y };
    }
  }
  const last = room.waypoints[room.waypoints.length - 1];
  return last ?? { x: room.bounds.x + room.bounds.w / 2, y: room.bounds.y };
}

function hasGroundAt(room: Room, x: number, feetY: number): boolean {
  for (const solid of room.solids) {
    const top = solid.y + solid.h;
    if (x < solid.x || x > solid.x + solid.w) continue;
    if (Math.abs(top - feetY) <= 0.25) return true;
  }
  return false;
}

interface Launch {
  edge: number;
  away: number;
}

function nearEdgeOfSupport(room: Room, target: Vec2, fromX: number): Launch | null {
  for (const solid of room.solids) {
    const top = solid.y + solid.h;
    if (Math.abs(top - target.y) > 0.25) continue;
    if (target.x < solid.x - 0.2 || target.x > solid.x + solid.w + 0.2) continue;
    const right = solid.x + solid.w;
    if (fromX > right) return { edge: right, away: 1 };
    if (fromX < solid.x) return { edge: solid.x, away: -1 };
    return fromX - solid.x <= right - fromX
      ? { edge: solid.x, away: -1 }
      : { edge: right, away: 1 };
  }
  return null;
}

function maxJumpHeight(): number {
  const p = tuning.player;
  return (p.jumpVelocity * p.jumpVelocity) / (2 * p.gravity);
}

function jumpLead(dy: number): number {
  const p = tuning.player;
  const disc = p.jumpVelocity * p.jumpVelocity - 2 * p.gravity * dy;
  const rise =
    disc <= 0 ? p.jumpVelocity / p.gravity : (p.jumpVelocity - Math.sqrt(disc)) / p.gravity;
  return p.walkSpeed * rise + p.width / 2 + 0.25;
}

function breakableAhead(state: GameState, room: Room, reach: number): boolean {
  const player = state.player;
  for (const breakable of room.breakables) {
    if (state.progress.broken.includes(breakable.id)) continue;
    const cx = breakable.rect.x + breakable.rect.w / 2;
    const dx = cx - player.pos.x;
    if (dx * player.facing < -0.2) continue;
    if (Math.abs(dx) > reach + breakable.rect.w) continue;
    if (player.pos.y > breakable.rect.y + breakable.rect.h) continue;
    return true;
  }
  return false;
}

function nearestThreatAhead(state: GameState, reach: number): boolean {
  const player = state.player;
  for (const enemy of state.enemies) {
    if (!enemy.alive) continue;
    const dx = enemy.pos.x - player.pos.x;
    if (dx * player.facing < -0.2) continue;
    if (Math.abs(dx) > reach + 0.4) continue;
    if (Math.abs(enemy.pos.y - player.pos.y) > 1.6) continue;
    return true;
  }
  const boss = state.boss;
  if (boss !== null && boss.alive && boss.state !== "dormant") {
    const dx = boss.pos.x - player.pos.x;
    if (dx * player.facing >= -0.2 && Math.abs(dx) <= reach + tuning.boss.width / 2) return true;
  }
  return false;
}

export function createAutoplayInput(game: Game): InputSource {
  const input = emptyInput();

  let deadAt = 0;
  let wasDead = false;
  let roomId = "";
  let waypointIndex = 0;
  let jumpHoldUntil = 0;
  let dashPending = 0;
  let retreating = false;
  let blockedSince = -1;
  let stuckX = 0;
  let stuckSince = 0;

  function reset(): Input {
    input.moveX = 0;
    input.moveY = 0;
    input.jump = false;
    input.jumpHeld = false;
    input.attack = false;
    input.dash = false;
    input.pause = false;
    input.confirm = false;
    return input;
  }

  return {
    sample(): Input {
      const state = game.state;
      reset();

      if (state.phase !== "dead") wasDead = false;

      if (state.phase === "title") {
        input.confirm = true;
        return input;
      }

      if (state.phase === "dead") {
        if (!wasDead) {
          wasDead = true;
          deadAt = performance.now();
        }
        if (performance.now() - deadAt >= RESTART_DELAY_MS) input.confirm = true;
        return input;
      }

      if (state.phase !== "playing") return input;

      const room = game.currentRoom();
      const player = state.player;

      if (room.id !== roomId) {
        roomId = room.id;
        waypointIndex = 0;
        jumpHoldUntil = 0;
        dashPending = 0;
        retreating = false;
        blockedSince = -1;
        stuckX = player.pos.x;
        stuckSince = state.time;
      }

      const waypoints = room.waypoints;
      while (waypointIndex < waypoints.length) {
        const wp = waypoints[waypointIndex];
        if (wp === undefined) break;
        const offX = player.pos.x - wp.x;
        const offY = Math.abs(player.pos.y - wp.y);
        if (offY <= WAYPOINT_REACH_Y && Math.abs(offX) <= WAYPOINT_REACH_X) {
          waypointIndex++;
          continue;
        }
        const next = waypoints[waypointIndex + 1];
        if (next === undefined) break;
        if (!player.grounded || player.pos.y < wp.y - 0.5) break;
        const forward = next.x - wp.x;
        if (forward > 0 && offX > WAYPOINT_REACH_X) waypointIndex++;
        else if (forward < 0 && offX < -WAYPOINT_REACH_X) waypointIndex++;
        else break;
      }

      const reachableRise = maxJumpHeight() * 0.9;
      while (waypointIndex > 0 && player.grounded) {
        const wp = waypoints[waypointIndex];
        if (wp === undefined) break;
        if (wp.y - player.pos.y <= reachableRise) break;
        waypointIndex--;
      }

      const target =
        waypointIndex < waypoints.length
          ? (waypoints[waypointIndex] as Vec2)
          : doorTarget(room);

      const dx = target.x - player.pos.x;
      const dy = target.y - player.pos.y;
      const absDx = Math.abs(dx);
      const dir = dx >= 0 ? 1 : -1;

      if (absDx > 0.25) input.moveX = dir;

      const dashReady = state.time >= player.dashReadyAt;

      let evaded = false;
      for (const enemy of state.enemies) {
        if (!enemy.alive || enemy.state !== "telegraph") continue;
        const ex = enemy.pos.x - player.pos.x;
        if (Math.abs(ex) > GUARD_PANIC) continue;
        if (Math.abs(enemy.pos.y - player.pos.y) > 2) continue;
        if (dashReady) {
          input.moveX = ex >= 0 ? -1 : 1;
          input.dash = true;
        }
        evaded = true;
        break;
      }

      const boss = state.boss;
      if (!evaded && boss !== null && boss.alive && BOSS_TELEGRAPHS.indexOf(boss.state) >= 0) {
        const bx = boss.pos.x - player.pos.x;
        if (Math.abs(bx) < tuning.boss.sweepReach + 2) {
          if (dashReady) {
            input.moveX = bx >= 0 ? -1 : 1;
            input.dash = true;
          }
          evaded = true;
        }
      }

      if (!evaded) {
        for (const hazard of state.hazards) {
          if (!hazard.alive) continue;
          if (Math.abs(hazard.pos.x - player.pos.x) > HAZARD_PANIC) continue;
          if (Math.abs(hazard.pos.y - player.pos.y) > 2) continue;
          if (player.grounded) {
            input.jump = true;
            jumpHoldUntil = state.time + JUMP_HOLD_MS / 1000;
          }
          evaded = true;
          break;
        }
      }

      if (!evaded) {
        const reach = player.longwick ? tuning.attack.longwickReach : tuning.attack.reach;
        if (nearestThreatAhead(state, reach) || breakableAhead(state, room, reach)) {
          input.attack = true;
        }
      }

      const groundAhead = hasGroundAt(room, player.pos.x + dir * 0.8, player.pos.y);

      const climbing = !evaded && dy > JUMP_RISE && player.grounded;
      if (climbing) {
        const launch = nearEdgeOfSupport(room, target, player.pos.x);
        const lead = jumpLead(dy);
        if (launch === null) {
          retreating = false;
          if (absDx <= lead + JUMP_NEAR_X) {
            input.jump = true;
            jumpHoldUntil = state.time + JUMP_HOLD_MS / 1000;
          }
        } else {
          const fromEdge = (player.pos.x - launch.edge) * launch.away;
          const toward = -launch.away;
          if (fromEdge < lead) retreating = true;
          else if (fromEdge > lead + RETREAT_MARGIN) retreating = false;
          if (retreating) {
            input.moveX = launch.away;
          } else if (
            fromEdge <= lead + JUMP_NEAR_X &&
            player.vel.x * toward >= tuning.player.walkSpeed * 0.85
          ) {
            input.jump = true;
            jumpHoldUntil = state.time + JUMP_HOLD_MS / 1000;
          } else {
            input.moveX = toward;
          }
        }
      } else {
        retreating = false;
      }

      if (!evaded && !retreating && !input.jump && player.grounded && !groundAhead && absDx > 1) {
        input.jump = true;
        jumpHoldUntil = state.time + JUMP_HOLD_MS / 1000;
        if (absDx > DASH_AHEAD && Math.abs(dy) <= DASH_LEVEL) dashPending = dir;
      }

      if (
        !evaded &&
        !input.dash &&
        dashPending !== 0 &&
        !player.grounded &&
        dashReady &&
        player.vel.y <= 0
      ) {
        input.moveX = dashPending;
        input.dash = true;
        dashPending = 0;
      }

      if (
        !evaded &&
        !input.dash &&
        !input.jump &&
        player.grounded &&
        groundAhead &&
        dashReady &&
        absDx > DASH_AHEAD &&
        Math.abs(dy) <= DASH_LEVEL
      ) {
        input.moveX = dir;
        input.dash = true;
      }

      if (player.grounded && !input.jump) dashPending = 0;

      if (player.grounded && input.moveX !== 0 && Math.abs(player.vel.x) < 0.5) {
        if (blockedSince < 0) blockedSince = state.time;
      } else {
        blockedSince = -1;
      }

      if (
        !evaded &&
        !retreating &&
        !input.jump &&
        blockedSince >= 0 &&
        state.time - blockedSince > BLOCKED_SECONDS
      ) {
        input.jump = true;
        jumpHoldUntil = state.time + JUMP_HOLD_MS / 1000;
        blockedSince = -1;
      }

      if (Math.abs(player.pos.x - stuckX) > STUCK_EPSILON) {
        stuckX = player.pos.x;
        stuckSince = state.time;
      } else if (state.time - stuckSince > STUCK_SECONDS) {
        stuckSince = state.time;
        if (player.grounded && !retreating) {
          input.jump = true;
          jumpHoldUntil = state.time + JUMP_HOLD_MS / 1000;
        }
      }

      if (state.time < jumpHoldUntil) input.jumpHeld = true;
      if (input.jump) input.jumpHeld = true;

      return input;
    }
  };
}
