export interface FixedLoop {
  readonly stepSeconds: number;
  readonly maxStepsPerFrame: number;
  accumulator: number;
  advance(realDt: number, step: (dt: number) => void): number;
  reset(): void;
}

export function createFixedLoop(stepSeconds = 1 / 60, maxStepsPerFrame = 8): FixedLoop {
  const loop: FixedLoop = {
    stepSeconds,
    maxStepsPerFrame,
    accumulator: 0,
    advance(realDt: number, step: (dt: number) => void): number {
      if (Number.isFinite(realDt) && realDt > 0) {
        loop.accumulator += realDt;
      }
      let steps = 0;
      while (loop.accumulator >= stepSeconds && steps < maxStepsPerFrame) {
        loop.accumulator -= stepSeconds;
        steps += 1;
        step(stepSeconds);
      }
      if (loop.accumulator >= stepSeconds) {
        loop.accumulator = loop.accumulator % stepSeconds;
      }
      return loop.accumulator / stepSeconds;
    },
    reset(): void {
      loop.accumulator = 0;
    }
  };
  return loop;
}
