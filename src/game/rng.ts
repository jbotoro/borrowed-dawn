export interface Rng {
  seed: number;
  next(): number;
  range(min: number, max: number): number;
}

export function createRng(seed: number): Rng {
  const rng: Rng = {
    seed: seed >>> 0,
    next(): number {
      rng.seed = (rng.seed + 0x6d2b79f5) >>> 0;
      let t = rng.seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    range(min: number, max: number): number {
      return min + (max - min) * rng.next();
    }
  };
  return rng;
}
