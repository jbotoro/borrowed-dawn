import type { Synth } from "./synth";
import { lfo, metal, noiseBurst, stopSource, tone } from "./synth";

export type BedId = "cinder" | "bellkeeper" | "dawn";

export interface BedConfig {
  readonly fightPulseGain: number;
  readonly fightTollBars: number;
  readonly fightTempoScale: number;
}

export interface Bed {
  readonly id: BedId;
  start(at: number): void;
  schedule(until: number): void;
  fadeIn(at: number, seconds: number): void;
  fadeOut(at: number, seconds: number): number;
  setIntensity(value: number, at: number): void;
  setPhase2(at: number): void;
  bossDown(at: number): void;
  stop(at: number): void;
}

const BPM = 54;
const BEAT = 60 / BPM;
const STEP = BEAT / 2;
const STEPS_PER_BAR = 8;

const CHORDS: number[][] = [
  [146.83, 174.61, 220.0],
  [116.54, 146.83, 174.61],
  [98.0, 116.54, 146.83],
  [110.0, 130.81, 164.81]
];

const DAWN_CHORDS: number[][] = [
  [146.83, 220.0, 293.66],
  [164.81, 246.94, 329.63],
  [130.81, 196.0, 261.63],
  [174.61, 261.63, 349.23]
];

const DAWN_RISE = [146.83, 174.61, 220.0, 261.63, 329.63, 391.99];
const DAWN_CUTOFF_SCALE = 1.9;

const STRIKE_ROOT = 73.42;
const STRIKE_RATIOS = [1, 2.0, 3.01, 4.72];
const TOLL_RATIOS = [1, 2.0, 2.76, 5.4, 8.9];
const TOLL_ROOTS = [110.0, 73.42];

const ORGAN_CUTOFF = 520;
const ORGAN_SWELL = 2.2;
const ORGAN_HOLD = 3.4;
const ORGAN_RELEASE = 3.8;

const FIGHT_ROOT = 36.71;
const FIGHT_VOICE_ROOT = 293.66;
const FIGHT_VOICE_RATIOS = [1, 2.01, 3.38];
const FIGHT_PEDAL = [73.42, 87.31, 98.0, 110.0];
const FIGHT_IN = 0.5;
const FIGHT_OUT = 0.9;
const FIGHT_GATE = 1.05;

function pick(table: number[][], index: number): number[] {
  const row = table[((index % table.length) + table.length) % table.length];
  return row === undefined ? [] : row;
}

function pickNumber(table: number[], index: number, fallback: number): number {
  const value = table[((index % table.length) + table.length) % table.length];
  return value === undefined ? fallback : value;
}

export function createBed(synth: Synth, dest: AudioNode, id: BedId, cfg: BedConfig): Bed {
  const ctx = synth.ctx;
  const dawn = id === "dawn";
  const baseCutoff = dawn ? ORGAN_CUTOFF * DAWN_CUTOFF_SCALE : ORGAN_CUTOFF;

  const output = ctx.createGain();
  output.gain.value = 0.0001;
  output.connect(dest);

  const pulseBus = ctx.createGain();
  pulseBus.gain.value = 1;
  pulseBus.connect(output);

  const organFilter = ctx.createBiquadFilter();
  organFilter.type = "lowpass";
  organFilter.Q.value = 0.7;
  organFilter.frequency.value = baseCutoff;
  organFilter.connect(output);

  const organBus = ctx.createGain();
  organBus.gain.value = dawn ? 0.7 : 0.55;
  organBus.connect(organFilter);

  const tollBus = ctx.createGain();
  tollBus.gain.value = 0.9;
  tollBus.connect(output);

  const furnaceBus = ctx.createGain();
  furnaceBus.gain.value = 1;
  furnaceBus.connect(output);

  const fightBus = ctx.createGain();
  fightBus.gain.value = 0;
  fightBus.connect(output);

  const continuous: AudioScheduledSourceNode[] = [];

  let nextStep = 0;
  let stepIndex = 0;
  let intensity = 1;
  let phase2 = false;
  let started = false;
  let fight = false;

  function rampFight(to: number, at: number, seconds: number): void {
    const param = fightBus.gain;
    param.cancelScheduledValues(at);
    param.setValueAtTime(param.value, at);
    param.linearRampToValueAtTime(to, at + seconds);
  }

  function stepSeconds(): number {
    if (!fight) return STEP;
    const scale = cfg.fightTempoScale > 0.1 ? cfg.fightTempoScale : 1;
    return STEP / scale;
  }

  function strike(at: number, level: number): void {
    const gain = level * intensity;
    metal(synth, pulseBus, at, STRIKE_ROOT, STRIKE_RATIOS, {
      gain: gain * 0.5,
      decay: 0.95,
      falloff: 0.5,
      spread: 0.2,
      filter: { type: "lowpass", freq: 1200 + 700 * (intensity - 1), q: 0.9 }
    });
    noiseBurst(synth, pulseBus, at, {
      gain: gain * 0.05,
      attack: 0.001,
      decay: 0.035,
      filter: { type: "highpass", freq: 2600, q: 0.8 }
    });
  }

  function organ(at: number, index: number): void {
    const chord = pick(dawn ? DAWN_CHORDS : CHORDS, index);
    let voice = 0;
    for (const freq of chord) {
      tone(synth, organBus, at, {
        type: "sine",
        freq,
        gain: dawn ? 0.075 : 0.085,
        attack: ORGAN_SWELL,
        hold: ORGAN_HOLD,
        decay: ORGAN_RELEASE,
        curve: "linear"
      });
      tone(synth, organBus, at, {
        type: "triangle",
        freq: freq * 2,
        detune: voice === 0 ? -5 : 4,
        gain: dawn ? 0.042 : 0.026,
        attack: ORGAN_SWELL + 0.6,
        hold: ORGAN_HOLD,
        decay: ORGAN_RELEASE,
        curve: "linear"
      });
      if (voice === 0) {
        tone(synth, organBus, at, {
          type: "sine",
          freq: freq * 0.5,
          gain: 0.05,
          attack: ORGAN_SWELL,
          hold: ORGAN_HOLD + 0.8,
          decay: ORGAN_RELEASE,
          curve: "linear"
        });
      }
      voice += 1;
    }
  }

  function rise(at: number, index: number): void {
    const steps = 3;
    const offset = (index % 3) * 1;
    for (let i = 0; i < steps; i++) {
      const freq = pickNumber(DAWN_RISE, offset + i, 220);
      const when = at + i * BEAT * 1.5;
      tone(synth, organBus, when, {
        type: "triangle",
        freq,
        gain: 0.05,
        attack: 0.3,
        hold: 0.55,
        decay: 1.5,
        curve: "linear"
      });
      tone(synth, organBus, when, {
        type: "sine",
        freq: freq * 2,
        gain: 0.022,
        attack: 0.22,
        hold: 0.4,
        decay: 1.2,
        curve: "linear"
      });
    }
  }

  function toll(at: number, index: number, decay: number, gain: number): void {
    const root = pickNumber(TOLL_ROOTS, index, 110);
    metal(synth, tollBus, at, root, TOLL_RATIOS, {
      gain,
      decay,
      falloff: 0.62,
      spread: 0.16,
      filter: { type: "lowpass", freq: 2400, q: 0.6 }
    });
    noiseBurst(synth, tollBus, at, {
      gain: 0.03,
      attack: 0.002,
      decay: 0.25,
      filter: { type: "bandpass", freq: 900, freqTo: 400, sweep: 0.25, q: 1.6 }
    });
  }

  function fightPulse(at: number, step: number): void {
    const level = Math.max(cfg.fightPulseGain, 0) * (step % 4 === 0 ? 1 : 0.68);
    tone(synth, fightBus, at, {
      type: "sawtooth",
      freq: FIGHT_ROOT * 2,
      freqTo: FIGHT_ROOT,
      glide: 0.08,
      gain: level,
      attack: 0.004,
      decay: 0.17,
      filter: { type: "lowpass", freq: 300, q: 1.3 }
    });
  }

  function fightVoice(at: number, doubled: boolean): void {
    metal(synth, fightBus, at, FIGHT_VOICE_ROOT, FIGHT_VOICE_RATIOS, {
      gain: 0.08,
      decay: 0.34,
      falloff: 0.5,
      spread: 0.3,
      filter: { type: "bandpass", freq: 2200, q: 1.1 }
    });
    if (!doubled) return;
    metal(synth, fightBus, at, FIGHT_VOICE_ROOT * 2, FIGHT_VOICE_RATIOS, {
      gain: 0.05,
      decay: 0.26,
      falloff: 0.5,
      spread: 0.3,
      filter: { type: "highpass", freq: 1800, q: 0.9 }
    });
  }

  function pedal(at: number, index: number, span: number): void {
    const freq = pickNumber(FIGHT_PEDAL, index, 73.42);
    const next = pickNumber(FIGHT_PEDAL, index + 1, 98.0);
    tone(synth, fightBus, at, {
      type: "sawtooth",
      freq,
      freqTo: next,
      glide: span,
      gain: 0.07,
      attack: span * 0.55,
      decay: span * 0.45,
      curve: "linear",
      filter: { type: "lowpass", freq: 320, freqTo: 1100, sweep: span, q: 1.5 }
    });
    tone(synth, fightBus, at, {
      type: "triangle",
      freq: freq * 2,
      freqTo: next * 2,
      glide: span,
      gain: 0.035,
      attack: span * 0.6,
      decay: span * 0.4,
      curve: "linear"
    });
  }

  function startAir(at: number): void {
    const source = synth.noiseSource();
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = dawn ? 760 : 380;
    band.Q.value = 0.9;
    const level = ctx.createGain();
    level.gain.value = dawn ? 0.035 : 0.05;
    source.connect(band);
    band.connect(level);
    level.connect(output);
    source.start(at, 0.4);
    synth.track(source);
    continuous.push(source);
    continuous.push(lfo(synth, band.frequency, at, 0.05, 140));
  }

  function startFurnace(at: number): void {
    for (const detune of [-7, 6]) {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = 36.71;
      osc.detune.value = detune;
      const low = ctx.createBiquadFilter();
      low.type = "lowpass";
      low.frequency.value = 96;
      low.Q.value = 1.1;
      const level = ctx.createGain();
      level.gain.value = 0.085;
      osc.connect(low);
      low.connect(level);
      level.connect(furnaceBus);
      osc.start(at);
      synth.track(osc);
      continuous.push(osc);
      continuous.push(lfo(synth, level.gain, at, 0.07, 0.03));
    }

    const body = ctx.createOscillator();
    body.type = "sine";
    body.frequency.value = 73.42;
    const bodyLevel = ctx.createGain();
    bodyLevel.gain.value = 0.045;
    body.connect(bodyLevel);
    bodyLevel.connect(furnaceBus);
    body.start(at);
    synth.track(body);
    continuous.push(body);

    const breath = synth.noiseSource();
    const low = ctx.createBiquadFilter();
    low.type = "lowpass";
    low.frequency.value = 190;
    low.Q.value = 0.8;
    const breathLevel = ctx.createGain();
    breathLevel.gain.value = 0.07;
    breath.connect(low);
    low.connect(breathLevel);
    breathLevel.connect(furnaceBus);
    breath.start(at, 0.9);
    synth.track(breath);
    continuous.push(breath);
    continuous.push(lfo(synth, breathLevel.gain, at, 0.11, 0.025));
  }

  function scheduleUntil(until: number): void {
    if (!started) return;
    const now = ctx.currentTime;
    const span = stepSeconds();
    if (nextStep < now) {
      const skipped = Math.ceil((now - nextStep) / span);
      nextStep += skipped * span;
      stepIndex += skipped;
    }
    while (nextStep < until) {
      const at = nextStep;
      const dur = stepSeconds();
      const step = stepIndex % STEPS_PER_BAR;
      const bar = Math.floor(stepIndex / STEPS_PER_BAR);
      if (dawn) {
        if (step === 0) {
          if (bar % 2 === 0) organ(at, bar / 2);
          else rise(at, (bar - 1) / 2);
        }
      } else {
        if (step === 0) {
          strike(at, 0.5);
          if (bar % 2 === 0) organ(at, bar / 2);
        } else if (step === 4) {
          strike(at, 0.3);
        } else if (step === 6 && intensity > FIGHT_GATE) {
          strike(at, Math.min(0.3, 0.3 * (intensity - 1)));
        }
        if (fight) {
          fightPulse(at, step);
          if (step % 2 === 1) fightVoice(at, phase2);
          if (step === 0) {
            const bars = Math.max(1, Math.round(cfg.fightTollBars));
            if (bar % bars === 0) toll(at, bar, 4.2, 0.26 * intensity);
            if (phase2) pedal(at, bar, dur * STEPS_PER_BAR);
          }
        } else if (id === "bellkeeper" && step === 0 && bar % (phase2 ? 2 : 4) === 0) {
          toll(at, bar / 2, 4.6, 0.2 * intensity);
        }
      }
      nextStep += dur;
      stepIndex += 1;
    }
  }

  return {
    id,
    start(at: number): void {
      if (started) return;
      started = true;
      nextStep = at + 0.05;
      stepIndex = 0;
      startAir(at);
      if (id === "bellkeeper") startFurnace(at);
      scheduleUntil(at + 0.5);
    },
    schedule(until: number): void {
      scheduleUntil(until);
    },
    fadeIn(at: number, seconds: number): void {
      const param = output.gain;
      param.cancelScheduledValues(at);
      param.setValueAtTime(Math.max(param.value, 0.0001), at);
      param.linearRampToValueAtTime(1, at + seconds);
    },
    fadeOut(at: number, seconds: number): number {
      const param = output.gain;
      param.cancelScheduledValues(at);
      param.setValueAtTime(Math.max(param.value, 0.0001), at);
      param.linearRampToValueAtTime(0, at + seconds);
      return at + seconds;
    },
    setIntensity(value: number, at: number): void {
      intensity = value;
      const want = id === "bellkeeper" && value > FIGHT_GATE;
      if (want !== fight) {
        fight = want;
        rampFight(want ? 1 : 0, at, want ? FIGHT_IN : FIGHT_OUT);
      }
      organFilter.frequency.cancelScheduledValues(at);
      organFilter.frequency.setValueAtTime(organFilter.frequency.value, at);
      organFilter.frequency.linearRampToValueAtTime(baseCutoff * value, at + 2.5);
      pulseBus.gain.cancelScheduledValues(at);
      pulseBus.gain.setValueAtTime(pulseBus.gain.value, at);
      pulseBus.gain.linearRampToValueAtTime(value, at + 2.5);
    },
    setPhase2(at: number): void {
      if (phase2) return;
      phase2 = true;
      furnaceBus.gain.cancelScheduledValues(at);
      furnaceBus.gain.setValueAtTime(furnaceBus.gain.value, at);
      furnaceBus.gain.linearRampToValueAtTime(1.45, at + 2);
    },
    bossDown(at: number): void {
      if (id !== "bellkeeper") return;
      fight = false;
      rampFight(0, at, FIGHT_OUT);
      toll(at, 1, 9.5, 0.34);
    },
    stop(at: number): void {
      for (const node of continuous) stopSource(node, at);
      continuous.length = 0;
      started = false;
      fight = false;
      output.disconnect();
    }
  };
}
