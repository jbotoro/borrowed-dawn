import type { Tuning } from "../tuning";
import type { GameState, Progress, Vec2 } from "./types";

export function createProgress(startRoom: string, startPos: Vec2): Progress {
  return {
    checkpointRoom: startRoom,
    checkpoint: { x: startPos.x, y: startPos.y },
    collected: [],
    opened: [],
    broken: [],
    bossDefeated: false,
    deaths: 0
  };
}

export function onDeath(state: GameState, t: number): void {
  state.deathAt = t;
  state.phase = "dead";
  state.transition = null;
}

export function deathDelayElapsed(state: GameState, tuning: Tuning): boolean {
  return state.time >= state.deathAt + tuning.feel.deathDelayMs / 1000;
}
