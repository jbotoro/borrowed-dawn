import { tuning as baseTuning } from "../src/tuning";
import type { Tuning } from "../src/tuning";
import { createPlayer, resetPlayer } from "../src/game/player";
import type { GameEvent, GameEventKind, Input, PlayerState } from "../src/game/types";

export const DT = 1 / 60;

export function emptyInput(): Input {
  return {
    moveX: 0,
    moveY: 0,
    jump: false,
    jumpHeld: false,
    attack: false,
    dash: false,
    pause: false,
    confirm: false
  };
}

export function countEvents(events: GameEvent[], kind: GameEventKind): number {
  let n = 0;
  for (const event of events) {
    if (event.kind === kind) {
      n += 1;
    }
  }
  return n;
}

export function hasEvent(events: GameEvent[], kind: GameEventKind): boolean {
  return countEvents(events, kind) > 0;
}

export function cloneTuning(): Tuning {
  return structuredClone(baseTuning) as Tuning;
}

export function playerAt(x: number, y: number, tuning: Tuning = baseTuning): PlayerState {
  const player = createPlayer();
  resetPlayer(player, { x, y }, 1, tuning);
  return player;
}

export function flatGround(): { x: number; y: number; w: number; h: number }[] {
  return [
    { x: -100, y: -1, w: 400, h: 1 },
    { x: -100, y: 20, w: 400, h: 1 }
  ];
}
