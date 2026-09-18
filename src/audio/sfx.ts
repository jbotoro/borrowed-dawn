import type { Synth } from "./synth";
import { metal, noiseBurst, tone } from "./synth";

export type SfxKey =
  | "start"
  | "jump"
  | "land"
  | "attackSwing"
  | "attackHit"
  | "dash"
  | "hurt"
  | "death"
  | "respawn"
  | "enemyHurt"
  | "enemyDeath"
  | "pickup"
  | "dawnCore"
  | "gateOpen"
  | "breakableBroken"
  | "checkpoint"
  | "guardTelegraph"
  | "guardAttack"
  | "stomperTelegraph"
  | "stomperAttack"
  | "lamplighterTelegraph"
  | "lamplighterAttack"
  | "sentryTelegraph"
  | "sentryAttack"
  | "bossTelegraphSweep"
  | "bossTelegraphStomp"
  | "bossAttack"
  | "bossHurt"
  | "bossPhase"
  | "bossDeath"
  | "victorySting"
  | "victory"
  | "pause"
  | "resume";

export const SFX_KEYS: SfxKey[] = [
  "start",
  "jump",
  "land",
  "attackSwing",
  "attackHit",
  "dash",
  "hurt",
  "death",
  "respawn",
  "enemyHurt",
  "enemyDeath",
  "pickup",
  "dawnCore",
  "gateOpen",
  "breakableBroken",
  "checkpoint",
  "guardTelegraph",
  "guardAttack",
  "stomperTelegraph",
  "stomperAttack",
  "lamplighterTelegraph",
  "lamplighterAttack",
  "sentryTelegraph",
  "sentryAttack",
  "bossTelegraphSweep",
  "bossTelegraphStomp",
  "bossAttack",
  "bossHurt",
  "bossPhase",
  "bossDeath",
  "victorySting",
  "victory",
  "pause",
  "resume"
];

const WARN_GAP = 0.16;

function jitter(at: number, amount: number): number {
  return 1 + Math.sin(at * 127.1) * amount;
}

function warnTicks(synth: Synth, dest: AudioNode, at: number, freq: number, gain: number, q: number): void {
  noiseBurst(synth, dest, at, {
    gain,
    attack: 0.001,
    decay: 0.05,
    filter: { type: "bandpass", freq, q }
  });
  noiseBurst(synth, dest, at + WARN_GAP, {
    gain: gain * 0.8,
    attack: 0.001,
    decay: 0.06,
    filter: { type: "bandpass", freq: freq * 0.9, q }
  });
}

function jump(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.16,
    attack: 0.006,
    decay: 0.11,
    filter: { type: "bandpass", freq: 900, freqTo: 1900, sweep: 0.11, q: 1.4 }
  });
  tone(synth, dest, at, {
    type: "sine",
    freq: 220,
    freqTo: 330,
    glide: 0.09,
    gain: 0.07,
    decay: 0.1
  });
}

function land(synth: Synth, dest: AudioNode, at: number): void {
  tone(synth, dest, at, {
    type: "sine",
    freq: 148,
    freqTo: 70,
    glide: 0.12,
    gain: 0.2,
    decay: 0.13
  });
  noiseBurst(synth, dest, at, {
    gain: 0.09,
    attack: 0.001,
    decay: 0.05,
    filter: { type: "highpass", freq: 1400, q: 0.7 }
  });
  metal(synth, dest, at + 0.02, 2100, [1, 1.61], {
    gain: 0.03,
    decay: 0.1,
    falloff: 0.7
  });
}

function attackSwing(synth: Synth, dest: AudioNode, at: number): void {
  const bright = jitter(at, 0.08);
  noiseBurst(synth, dest, at, {
    gain: 0.13,
    attack: 0.012,
    decay: 0.1,
    filter: { type: "bandpass", freq: 1200 * bright, freqTo: 3100 * bright, sweep: 0.08, q: 3.2 }
  });
  noiseBurst(synth, dest, at + 0.05, {
    gain: 0.05,
    attack: 0.004,
    decay: 0.07,
    filter: { type: "bandpass", freq: 2600, freqTo: 1100, sweep: 0.07, q: 3 }
  });
}

function attackHit(synth: Synth, dest: AudioNode, at: number): void {
  metal(synth, dest, at, 420 * jitter(at, 0.06), [1, 2.41, 3.94, 5.3], {
    gain: 0.24,
    decay: 0.22,
    falloff: 0.5,
    spread: 0.25,
    filter: { type: "bandpass", freq: 1500, q: 0.9 }
  });
  noiseBurst(synth, dest, at, {
    gain: 0.12,
    attack: 0.001,
    decay: 0.03,
    filter: { type: "highpass", freq: 2500, q: 0.8 }
  });
  tone(synth, dest, at, {
    type: "sine",
    freq: 120,
    freqTo: 62,
    glide: 0.1,
    gain: 0.1,
    decay: 0.1
  });
}

function dash(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.2,
    attack: 0.01,
    decay: 0.21,
    filter: { type: "bandpass", freq: 320, freqTo: 1700, sweep: 0.13, q: 1.2 }
  });
  noiseBurst(synth, dest, at + 0.12, {
    gain: 0.08,
    attack: 0.01,
    decay: 0.14,
    filter: { type: "bandpass", freq: 1500, freqTo: 420, sweep: 0.14, q: 1.4 }
  });
  tone(synth, dest, at, {
    type: "triangle",
    freq: 180,
    freqTo: 92,
    glide: 0.18,
    gain: 0.09,
    decay: 0.18
  });
}

function hurt(synth: Synth, dest: AudioNode, at: number): void {
  metal(synth, dest, at, 1780, [1, 1.32, 2.11], {
    gain: 0.12,
    decay: 0.17,
    falloff: 0.6,
    spread: 0.3
  });
  for (const step of [0, 0.045, 0.1]) {
    noiseBurst(synth, dest, at + step, {
      gain: 0.1 - step * 0.4,
      attack: 0.002,
      decay: 0.05,
      filter: { type: "highpass", freq: 1900, q: 0.9 }
    });
  }
  tone(synth, dest, at, {
    type: "sine",
    freq: 150,
    freqTo: 72,
    glide: 0.16,
    gain: 0.16,
    decay: 0.16
  });
}

function death(synth: Synth, dest: AudioNode, at: number): void {
  tone(synth, dest, at, {
    type: "sawtooth",
    freq: 300,
    freqTo: 58,
    glide: 0.65,
    gain: 0.16,
    attack: 0.01,
    decay: 0.7,
    filter: { type: "lowpass", freq: 900, freqTo: 240, sweep: 0.7, q: 1.1 }
  });
  noiseBurst(synth, dest, at, {
    gain: 0.1,
    attack: 0.02,
    decay: 0.5,
    filter: { type: "bandpass", freq: 700, freqTo: 240, sweep: 0.5, q: 1.3 }
  });
  metal(synth, dest, at + 0.18, 220, [1, 1.51, 2.32, 3.41], {
    gain: 0.13,
    decay: 0.95,
    falloff: 0.56,
    spread: 0.2,
    filter: { type: "lowpass", freq: 1400, q: 0.7 }
  });
}

function respawn(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.09,
    attack: 0.02,
    decay: 0.16,
    filter: { type: "bandpass", freq: 600, freqTo: 1600, sweep: 0.14, q: 1.1 }
  });
  metal(synth, dest, at + 0.06, 220, [1, 2.0, 3.01], {
    gain: 0.14,
    decay: 0.8,
    falloff: 0.55,
    filter: { type: "lowpass", freq: 2200, q: 0.7 }
  });
  metal(synth, dest, at + 0.26, 293.66, [1, 2.0, 3.01], {
    gain: 0.12,
    decay: 0.95,
    falloff: 0.55,
    filter: { type: "lowpass", freq: 2400, q: 0.7 }
  });
}

function enemyHurt(synth: Synth, dest: AudioNode, at: number): void {
  const pitch = jitter(at, 0.09);
  noiseBurst(synth, dest, at, {
    gain: 0.14,
    attack: 0.001,
    decay: 0.09,
    filter: { type: "bandpass", freq: 820 * pitch, q: 7 }
  });
  tone(synth, dest, at, {
    type: "square",
    freq: 184 * pitch,
    freqTo: 132 * pitch,
    glide: 0.08,
    gain: 0.09,
    decay: 0.09,
    filter: { type: "lowpass", freq: 1100, q: 0.9 }
  });
}

function enemyDeath(synth: Synth, dest: AudioNode, at: number): void {
  const pitch = jitter(at, 0.07);
  metal(synth, dest, at, 700 * pitch, [1, 1.74, 2.9], {
    gain: 0.16,
    decay: 0.22,
    falloff: 0.55,
    spread: 0.25,
    filter: { type: "bandpass", freq: 1300, q: 1.1 }
  });
  metal(synth, dest, at + 0.12, 470 * pitch, [1, 1.74, 2.9], {
    gain: 0.12,
    decay: 0.26,
    falloff: 0.55,
    spread: 0.25,
    filter: { type: "bandpass", freq: 1000, q: 1.1 }
  });
  tone(synth, dest, at + 0.06, {
    type: "sine",
    freq: 96,
    freqTo: 52,
    glide: 0.22,
    gain: 0.12,
    decay: 0.24
  });
  noiseBurst(synth, dest, at, {
    gain: 0.06,
    attack: 0.004,
    decay: 0.18,
    filter: { type: "highpass", freq: 2200, q: 0.8 }
  });
}

function pickup(synth: Synth, dest: AudioNode, at: number): void {
  tone(synth, dest, at, {
    type: "sine",
    freq: 440,
    gain: 0.12,
    attack: 0.006,
    decay: 0.5
  });
  tone(synth, dest, at, {
    type: "triangle",
    freq: 880,
    gain: 0.04,
    attack: 0.006,
    decay: 0.35
  });
  tone(synth, dest, at + 0.14, {
    type: "sine",
    freq: 587.33,
    gain: 0.11,
    attack: 0.006,
    decay: 0.6
  });
  tone(synth, dest, at + 0.14, {
    type: "triangle",
    freq: 1174.66,
    gain: 0.032,
    attack: 0.008,
    decay: 0.4
  });
}

function dawnCore(synth: Synth, dest: AudioNode, at: number): void {
  metal(synth, dest, at, 73.42, [1, 2.0, 2.76, 5.4, 8.9], {
    gain: 0.26,
    decay: 3.6,
    falloff: 0.6,
    spread: 0.14,
    filter: { type: "lowpass", freq: 2600, q: 0.6 }
  });
  const chord = [146.83, 220.0, 293.66, 440.0];
  let index = 0;
  for (const freq of chord) {
    tone(synth, dest, at + 0.1 + index * 0.07, {
      type: "sine",
      freq,
      gain: 0.09 - index * 0.012,
      attack: 0.6,
      hold: 1.4,
      decay: 2.6,
      curve: "linear"
    });
    tone(synth, dest, at + 0.1 + index * 0.07, {
      type: "triangle",
      freq: freq * 2,
      gain: 0.022,
      attack: 0.9,
      hold: 1.2,
      decay: 2.4,
      curve: "linear"
    });
    index += 1;
  }
}

function gateOpen(synth: Synth, dest: AudioNode, at: number): void {
  let offset = 0;
  let gap = 0.075;
  for (let i = 0; i < 7; i += 1) {
    noiseBurst(synth, dest, at + offset, {
      gain: 0.09,
      attack: 0.001,
      decay: 0.045,
      filter: { type: "bandpass", freq: 1600 - i * 90, q: 8 }
    });
    offset += gap;
    gap *= 1.12;
  }
  tone(synth, dest, at + offset + 0.05, {
    type: "sine",
    freq: 112,
    freqTo: 58,
    glide: 0.28,
    gain: 0.2,
    decay: 0.32
  });
  metal(synth, dest, at + offset + 0.05, 196, [1, 2.2, 3.6], {
    gain: 0.12,
    decay: 0.5,
    falloff: 0.55,
    filter: { type: "lowpass", freq: 1800, q: 0.8 }
  });
}

function breakableBroken(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.2,
    attack: 0.001,
    decay: 0.12,
    filter: { type: "lowpass", freq: 1700, freqTo: 700, sweep: 0.12, q: 0.9 }
  });
  for (let i = 0; i < 6; i += 1) {
    const step = 0.05 + i * 0.042;
    noiseBurst(synth, dest, at + step, {
      gain: 0.07 * (1 - i * 0.13),
      attack: 0.001,
      decay: 0.035,
      filter: { type: "bandpass", freq: 1800 + Math.sin(i * 12.9) * 700, q: 5 }
    });
  }
  tone(synth, dest, at, {
    type: "sine",
    freq: 110,
    freqTo: 52,
    glide: 0.2,
    gain: 0.12,
    decay: 0.22
  });
}

function checkpoint(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.1,
    attack: 0.03,
    decay: 0.3,
    filter: { type: "bandpass", freq: 500, freqTo: 1500, sweep: 0.25, q: 1 }
  });
  metal(synth, dest, at + 0.05, 293.66, [1, 2.0, 3.01, 4.7], {
    gain: 0.16,
    decay: 1.25,
    falloff: 0.55,
    spread: 0.18,
    filter: { type: "lowpass", freq: 2600, q: 0.7 }
  });
  metal(synth, dest, at + 0.34, 440.0, [1, 2.0, 3.01, 4.7], {
    gain: 0.13,
    decay: 1.4,
    falloff: 0.55,
    spread: 0.18,
    filter: { type: "lowpass", freq: 2800, q: 0.7 }
  });
}

function guardTelegraph(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.12,
    attack: 0.04,
    decay: 0.3,
    filter: { type: "bandpass", freq: 380, freqTo: 2300, sweep: 0.3, q: 6 }
  });
  tone(synth, dest, at, {
    type: "sawtooth",
    freq: 124,
    freqTo: 268,
    glide: 0.3,
    gain: 0.05,
    attack: 0.05,
    decay: 0.3,
    filter: { type: "bandpass", freq: 700, freqTo: 1600, sweep: 0.3, q: 4 }
  });
}

function guardAttack(synth: Synth, dest: AudioNode, at: number): void {
  tone(synth, dest, at, {
    type: "sine",
    freq: 176,
    freqTo: 48,
    glide: 0.11,
    gain: 0.24,
    decay: 0.17
  });
  metal(synth, dest, at, 288, [1, 2.68], {
    gain: 0.1,
    decay: 0.13,
    falloff: 0.5,
    filter: { type: "lowpass", freq: 1200, q: 0.8 }
  });
  noiseBurst(synth, dest, at, {
    gain: 0.15,
    attack: 0.001,
    decay: 0.09,
    filter: { type: "lowpass", freq: 1900, freqTo: 480, sweep: 0.09, q: 1.1 }
  });
}

function stomperTelegraph(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.09,
    attack: 0.2,
    decay: 0.18,
    filter: { type: "bandpass", freq: 2700, freqTo: 5200, sweep: 0.34, q: 0.9 }
  });
  tone(synth, dest, at, {
    type: "triangle",
    freq: 300,
    freqTo: 430,
    glide: 0.32,
    gain: 0.03,
    attack: 0.18,
    decay: 0.2,
    filter: { type: "highpass", freq: 900, q: 0.7 }
  });
}

function stomperAttack(synth: Synth, dest: AudioNode, at: number): void {
  metal(synth, dest, at, 536, [1, 1.47, 2.93], {
    gain: 0.15,
    decay: 0.14,
    falloff: 0.48,
    spread: 0.3,
    filter: { type: "bandpass", freq: 1650, q: 1.3 }
  });
  noiseBurst(synth, dest, at, {
    gain: 0.1,
    attack: 0.001,
    decay: 0.04,
    filter: { type: "bandpass", freq: 940, q: 5 }
  });
  tone(synth, dest, at, {
    type: "square",
    freq: 94,
    freqTo: 66,
    glide: 0.1,
    gain: 0.07,
    decay: 0.11,
    filter: { type: "lowpass", freq: 620, q: 0.9 }
  });
}

function lamplighterTelegraph(synth: Synth, dest: AudioNode, at: number): void {
  metal(synth, dest, at, 1240, [1, 2.76], {
    gain: 0.07,
    decay: 0.18,
    falloff: 0.45,
    spread: 0.3,
    filter: { type: "highpass", freq: 900, q: 0.7 }
  });
  metal(synth, dest, at + 0.17, 1560, [1, 2.76], {
    gain: 0.08,
    decay: 0.2,
    falloff: 0.45,
    spread: 0.3,
    filter: { type: "highpass", freq: 1000, q: 0.7 }
  });
}

function lamplighterAttack(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.1,
    attack: 0.035,
    decay: 0.24,
    filter: { type: "bandpass", freq: 1900, freqTo: 400, sweep: 0.24, q: 1.1 }
  });
  tone(synth, dest, at, {
    type: "sine",
    freq: 640,
    freqTo: 230,
    glide: 0.22,
    gain: 0.05,
    attack: 0.03,
    decay: 0.22
  });
}

function sentryTelegraph(synth: Synth, dest: AudioNode, at: number): void {
  tone(synth, dest, at, {
    type: "sine",
    freq: 610,
    freqTo: 1960,
    glide: 0.84,
    gain: 0.07,
    attack: 0.14,
    decay: 0.82
  });
  tone(synth, dest, at, {
    type: "triangle",
    freq: 915,
    freqTo: 2940,
    glide: 0.84,
    gain: 0.022,
    attack: 0.22,
    decay: 0.78
  });
  noiseBurst(synth, dest, at, {
    gain: 0.03,
    attack: 0.3,
    decay: 0.58,
    filter: { type: "bandpass", freq: 3000, freqTo: 6200, sweep: 0.8, q: 6 }
  });
}

function sentryAttack(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.16,
    attack: 0.001,
    decay: 0.045,
    filter: { type: "highpass", freq: 3800, q: 0.8 }
  });
  metal(synth, dest, at, 2380, [1, 1.93], {
    gain: 0.09,
    decay: 0.13,
    falloff: 0.5,
    spread: 0.3
  });
  for (let i = 0; i < 3; i += 1) {
    noiseBurst(synth, dest, at + 0.045 + i * 0.038, {
      gain: 0.045 - i * 0.01,
      attack: 0.001,
      decay: 0.025,
      filter: { type: "bandpass", freq: 4600 + Math.sin(i * 9.7) * 1200, q: 9 }
    });
  }
}

function chainRattle(synth: Synth, dest: AudioNode, at: number): void {
  let offset = 0;
  let gap = 0.085;
  for (let i = 0; i < 4; i += 1) {
    metal(synth, dest, at + offset, 980 + i * 190, [1, 2.44], {
      gain: 0.07,
      decay: 0.07,
      falloff: 0.5,
      spread: 0.3,
      filter: { type: "bandpass", freq: 2000 + i * 260, q: 2.4 }
    });
    offset += gap;
    gap *= 0.82;
  }
}

function bossTelegraphSweep(synth: Synth, dest: AudioNode, at: number): void {
  chainRattle(synth, dest, at);
  tone(synth, dest, at, {
    type: "sawtooth",
    freq: 92,
    freqTo: 158,
    glide: 0.45,
    gain: 0.13,
    attack: 0.06,
    decay: 0.45,
    filter: { type: "bandpass", freq: 320, freqTo: 980, sweep: 0.45, q: 5.5 }
  });
  noiseBurst(synth, dest, at + 0.08, {
    gain: 0.06,
    attack: 0.05,
    decay: 0.4,
    filter: { type: "bandpass", freq: 2400, freqTo: 3400, sweep: 0.4, q: 7 }
  });
}

function bossTelegraphStomp(synth: Synth, dest: AudioNode, at: number): void {
  warnTicks(synth, dest, at, 320, 0.11, 10);
  noiseBurst(synth, dest, at, {
    gain: 0.16,
    attack: 0.22,
    decay: 0.26,
    filter: { type: "bandpass", freq: 200, freqTo: 720, sweep: 0.44, q: 2.2 }
  });
  tone(synth, dest, at, {
    type: "sine",
    freq: 56,
    freqTo: 44,
    glide: 0.45,
    gain: 0.16,
    attack: 0.2,
    decay: 0.28
  });
  tone(synth, dest, at + 0.05, {
    type: "triangle",
    freq: 160,
    gain: 0.05,
    attack: 0.18,
    decay: 0.25,
    filter: { type: "bandpass", freq: 160, q: 12 }
  });
}

function bossAttack(synth: Synth, dest: AudioNode, at: number): void {
  tone(synth, dest, at, {
    type: "sine",
    freq: 92,
    freqTo: 38,
    glide: 0.24,
    gain: 0.3,
    decay: 0.26
  });
  metal(synth, dest, at, 260, [1, 2.32, 3.81, 5.12], {
    gain: 0.2,
    decay: 0.42,
    falloff: 0.55,
    spread: 0.2,
    filter: { type: "lowpass", freq: 2000, q: 0.8 }
  });
  noiseBurst(synth, dest, at, {
    gain: 0.14,
    attack: 0.001,
    decay: 0.045,
    filter: { type: "highpass", freq: 1800, q: 0.8 }
  });
}

function bossHurt(synth: Synth, dest: AudioNode, at: number): void {
  metal(synth, dest, at, 186 * jitter(at, 0.05), [1, 2.12, 3.3], {
    gain: 0.16,
    decay: 0.24,
    falloff: 0.5,
    spread: 0.25,
    filter: { type: "bandpass", freq: 760, q: 1.6 }
  });
  noiseBurst(synth, dest, at, {
    gain: 0.1,
    attack: 0.001,
    decay: 0.07,
    filter: { type: "bandpass", freq: 1400, q: 6 }
  });
}

function bossPhase(synth: Synth, dest: AudioNode, at: number): void {
  noiseBurst(synth, dest, at, {
    gain: 0.22,
    attack: 0.001,
    decay: 0.16,
    filter: { type: "bandpass", freq: 1100, freqTo: 420, sweep: 0.16, q: 2.2 }
  });
  tone(synth, dest, at, {
    type: "sawtooth",
    freq: 140,
    freqTo: 52,
    glide: 0.3,
    gain: 0.16,
    decay: 0.34,
    filter: { type: "lowpass", freq: 1200, q: 1 }
  });
  noiseBurst(synth, dest, at + 0.1, {
    gain: 0.15,
    attack: 0.08,
    decay: 0.85,
    filter: { type: "highpass", freq: 1200, freqTo: 3200, sweep: 0.7, q: 0.8 }
  });
  tone(synth, dest, at + 0.12, {
    type: "sine",
    freq: 220,
    freqTo: 700,
    glide: 0.7,
    gain: 0.07,
    attack: 0.12,
    decay: 0.8
  });
}

function bossDeath(synth: Synth, dest: AudioNode, at: number): void {
  tone(synth, dest, at, {
    type: "sine",
    freq: 120,
    freqTo: 30,
    glide: 1.5,
    gain: 0.28,
    attack: 0.02,
    decay: 1.6
  });
  metal(synth, dest, at + 0.05, 73.42, [1, 2.0, 2.76, 5.4, 8.9], {
    gain: 0.24,
    decay: 3.0,
    falloff: 0.6,
    spread: 0.16,
    filter: { type: "lowpass", freq: 2200, q: 0.6 }
  });
  noiseBurst(synth, dest, at + 0.12, {
    gain: 0.16,
    attack: 0.06,
    decay: 1.2,
    filter: { type: "bandpass", freq: 2200, freqTo: 600, sweep: 1.1, q: 1.2 }
  });
  for (let i = 0; i < 5; i += 1) {
    metal(synth, dest, at + 0.5 + i * 0.13, 320 - i * 34, [1, 1.9], {
      gain: 0.07,
      decay: 0.3,
      falloff: 0.6,
      filter: { type: "bandpass", freq: 900, q: 1.8 }
    });
  }
}

function victorySting(synth: Synth, dest: AudioNode, at: number): void {
  const figure = [220.0, 293.66, 369.99];
  let index = 0;
  for (const freq of figure) {
    const when = at + 0.18 + index * 0.24;
    metal(synth, dest, when, freq, [1, 2.0, 2.76, 5.4], {
      gain: 0.16 + index * 0.03,
      decay: 2.2 + index * 0.6,
      falloff: 0.62,
      spread: 0.14,
      filter: { type: "lowpass", freq: 3200, q: 0.6 }
    });
    tone(synth, dest, when, {
      type: "sine",
      freq: freq * 2,
      gain: 0.04,
      attack: 0.05,
      hold: 0.2,
      decay: 1.1,
      curve: "linear"
    });
    index += 1;
  }
}

function victory(synth: Synth, dest: AudioNode, at: number): void {
  metal(synth, dest, at, 146.83, [1, 2.0, 2.76, 5.4], {
    gain: 0.18,
    decay: 2.8,
    falloff: 0.6,
    spread: 0.16,
    filter: { type: "lowpass", freq: 2400, q: 0.6 }
  });
  const chord = [146.83, 174.61, 220.0, 293.66];
  let index = 0;
  for (const freq of chord) {
    tone(synth, dest, at + 0.9 + index * 0.05, {
      type: "sine",
      freq,
      gain: 0.07,
      attack: 0.9,
      hold: 1.2,
      decay: 2.4,
      curve: "linear"
    });
    index += 1;
  }
}

function pauseClick(synth: Synth, dest: AudioNode, at: number, rising: boolean): void {
  noiseBurst(synth, dest, at, {
    gain: 0.08,
    attack: 0.001,
    decay: 0.03,
    filter: { type: "bandpass", freq: 1250, q: 6 }
  });
  tone(synth, dest, at + 0.02, {
    type: "sine",
    freq: rising ? 660 : 880,
    freqTo: rising ? 880 : 660,
    glide: 0.07,
    gain: 0.07,
    decay: 0.12
  });
}

function start(synth: Synth, dest: AudioNode, at: number): void {
  metal(synth, dest, at, 110, [1, 2.0, 3.01], {
    gain: 0.12,
    decay: 1.1,
    falloff: 0.55,
    filter: { type: "lowpass", freq: 1800, q: 0.7 }
  });
  tone(synth, dest, at + 0.08, {
    type: "sine",
    freq: 220,
    freqTo: 293.66,
    glide: 0.25,
    gain: 0.06,
    attack: 0.05,
    decay: 0.5
  });
}

export function playSfx(synth: Synth, dest: AudioNode, key: SfxKey, at: number): void {
  switch (key) {
    case "start":
      start(synth, dest, at);
      return;
    case "jump":
      jump(synth, dest, at);
      return;
    case "land":
      land(synth, dest, at);
      return;
    case "attackSwing":
      attackSwing(synth, dest, at);
      return;
    case "attackHit":
      attackHit(synth, dest, at);
      return;
    case "dash":
      dash(synth, dest, at);
      return;
    case "hurt":
      hurt(synth, dest, at);
      return;
    case "death":
      death(synth, dest, at);
      return;
    case "respawn":
      respawn(synth, dest, at);
      return;
    case "enemyHurt":
      enemyHurt(synth, dest, at);
      return;
    case "enemyDeath":
      enemyDeath(synth, dest, at);
      return;
    case "pickup":
      pickup(synth, dest, at);
      return;
    case "dawnCore":
      dawnCore(synth, dest, at);
      return;
    case "gateOpen":
      gateOpen(synth, dest, at);
      return;
    case "breakableBroken":
      breakableBroken(synth, dest, at);
      return;
    case "checkpoint":
      checkpoint(synth, dest, at);
      return;
    case "guardTelegraph":
      guardTelegraph(synth, dest, at);
      return;
    case "guardAttack":
      guardAttack(synth, dest, at);
      return;
    case "stomperTelegraph":
      stomperTelegraph(synth, dest, at);
      return;
    case "stomperAttack":
      stomperAttack(synth, dest, at);
      return;
    case "lamplighterTelegraph":
      lamplighterTelegraph(synth, dest, at);
      return;
    case "lamplighterAttack":
      lamplighterAttack(synth, dest, at);
      return;
    case "sentryTelegraph":
      sentryTelegraph(synth, dest, at);
      return;
    case "sentryAttack":
      sentryAttack(synth, dest, at);
      return;
    case "bossTelegraphSweep":
      bossTelegraphSweep(synth, dest, at);
      return;
    case "bossTelegraphStomp":
      bossTelegraphStomp(synth, dest, at);
      return;
    case "bossAttack":
      bossAttack(synth, dest, at);
      return;
    case "bossHurt":
      bossHurt(synth, dest, at);
      return;
    case "bossPhase":
      bossPhase(synth, dest, at);
      return;
    case "bossDeath":
      bossDeath(synth, dest, at);
      return;
    case "victorySting":
      victorySting(synth, dest, at);
      return;
    case "victory":
      victory(synth, dest, at);
      return;
    case "pause":
      pauseClick(synth, dest, at, false);
      return;
    case "resume":
      pauseClick(synth, dest, at, true);
      return;
    default:
      return;
  }
}
