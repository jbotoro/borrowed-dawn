export const tuning = {
  arena: {
    radius: 18
  },
  player: {
    speed: 9,
    radius: 0.6
  },
  dash: {
    distance: 6,
    durationMs: 140,
    cooldownMs: 900,
    invulnerableMs: 220
  },
  enemy: {
    speed: 3.2,
    radius: 0.5,
    separation: 0.9,
    maxCount: 2000
  },
  waves: {
    startSpawnPerSec: 1.5,
    spawnGrowthPerSec: 0.05,
    speedGrowthPerSec: 0.004
  },
  camera: {
    tiltDeg: 55,
    distance: 26,
    followLerp: 0.08,
    shakeDecay: 0.85
  },
  feel: {
    hitstopMs: 40,
    shakeOnKill: 0.12,
    shakeOnHit: 0.35,
    bloomStrength: 0.9,
    bloomRadius: 0.4,
    bloomThreshold: 0.7
  }
};

export type Tuning = typeof tuning;
