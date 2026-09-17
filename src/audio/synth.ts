export interface Synth {
  readonly ctx: AudioContext;
  created: number;
  active: number;
  noiseSource(): AudioBufferSourceNode;
  track(node: AudioScheduledSourceNode): void;
}

export interface FilterSpec {
  type: BiquadFilterType;
  freq: number;
  freqTo?: number;
  sweep?: number;
  q?: number;
}

export interface EnvelopeSpec {
  gain: number;
  attack?: number;
  hold?: number;
  decay: number;
  curve?: "exp" | "linear";
}

export interface ToneSpec extends EnvelopeSpec {
  type: OscillatorType;
  freq: number;
  freqTo?: number;
  glide?: number;
  detune?: number;
  filter?: FilterSpec;
}

export interface NoiseSpec extends EnvelopeSpec {
  filter?: FilterSpec;
  rate?: number;
}

export interface MetalSpec extends EnvelopeSpec {
  type?: OscillatorType;
  filter?: FilterSpec;
  falloff?: number;
  spread?: number;
}

const FLOOR = 0.0001;
const NOISE_SECONDS = 2;

export function createSynth(ctx: AudioContext): Synth {
  const length = Math.floor(ctx.sampleRate * NOISE_SECONDS);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let seed = 0x2f6e2b1;
  for (let i = 0; i < length; i += 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    data[i] = (seed / 4294967295) * 2 - 1;
  }

  const synth: Synth = {
    ctx,
    created: 0,
    active: 0,
    noiseSource(): AudioBufferSourceNode {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      return source;
    },
    track(node: AudioScheduledSourceNode): void {
      synth.created += 1;
      synth.active += 1;
      node.onended = (): void => {
        synth.active -= 1;
      };
    }
  };

  return synth;
}

export function envelopeEnd(at: number, spec: EnvelopeSpec): number {
  const attack = Math.max(spec.attack ?? 0.004, 0.001);
  const hold = spec.hold ?? 0;
  return at + attack + hold + Math.max(spec.decay, 0.01);
}

export function envelope(ctx: AudioContext, at: number, spec: EnvelopeSpec): GainNode {
  const node = ctx.createGain();
  const peak = Math.max(spec.gain, FLOOR * 4);
  const attack = Math.max(spec.attack ?? 0.004, 0.001);
  const hold = spec.hold ?? 0;
  const end = envelopeEnd(at, spec);
  const param = node.gain;
  param.setValueAtTime(FLOOR, at);
  if (spec.curve === "linear") {
    param.linearRampToValueAtTime(peak, at + attack);
    param.setValueAtTime(peak, at + attack + hold);
    param.linearRampToValueAtTime(0, end);
  } else {
    param.exponentialRampToValueAtTime(peak, at + attack);
    param.setValueAtTime(peak, at + attack + hold);
    param.exponentialRampToValueAtTime(FLOOR, end);
  }
  return node;
}

export function filterNode(ctx: AudioContext, at: number, spec: FilterSpec, fallbackSweep: number): BiquadFilterNode {
  const node = ctx.createBiquadFilter();
  node.type = spec.type;
  node.Q.value = spec.q ?? 1;
  node.frequency.setValueAtTime(Math.max(spec.freq, 20), at);
  if (spec.freqTo !== undefined) {
    const sweep = Math.max(spec.sweep ?? fallbackSweep, 0.01);
    node.frequency.exponentialRampToValueAtTime(Math.max(spec.freqTo, 20), at + sweep);
  }
  return node;
}

function chain(ctx: AudioContext, at: number, dest: AudioNode, spec: EnvelopeSpec, filter?: FilterSpec): GainNode {
  const env = envelope(ctx, at, spec);
  if (filter === undefined) {
    env.connect(dest);
    return env;
  }
  const biquad = filterNode(ctx, at, filter, envelopeEnd(at, spec) - at);
  env.connect(biquad);
  biquad.connect(dest);
  return env;
}

export function tone(synth: Synth, dest: AudioNode, at: number, spec: ToneSpec): number {
  const ctx = synth.ctx;
  const osc = ctx.createOscillator();
  osc.type = spec.type;
  if (spec.detune !== undefined) osc.detune.setValueAtTime(spec.detune, at);
  osc.frequency.setValueAtTime(Math.max(spec.freq, 1), at);
  if (spec.freqTo !== undefined) {
    const glide = Math.max(spec.glide ?? spec.decay, 0.01);
    osc.frequency.exponentialRampToValueAtTime(Math.max(spec.freqTo, 1), at + glide);
  }
  const env = chain(ctx, at, dest, spec, spec.filter);
  osc.connect(env);
  const end = envelopeEnd(at, spec);
  osc.start(at);
  osc.stop(end + 0.02);
  synth.track(osc);
  return end;
}

export function noiseBurst(synth: Synth, dest: AudioNode, at: number, spec: NoiseSpec): number {
  const ctx = synth.ctx;
  const source = synth.noiseSource();
  if (spec.rate !== undefined) source.playbackRate.setValueAtTime(spec.rate, at);
  const env = chain(ctx, at, dest, spec, spec.filter);
  source.connect(env);
  const end = envelopeEnd(at, spec);
  source.start(at, (at * 7919) % 1.5);
  source.stop(end + 0.02);
  synth.track(source);
  return end;
}

export function metal(
  synth: Synth,
  dest: AudioNode,
  at: number,
  base: number,
  ratios: number[],
  spec: MetalSpec
): number {
  const falloff = spec.falloff ?? 0.55;
  const spread = spec.spread ?? 0.22;
  let index = 0;
  let end = at;
  const bus = spec.filter === undefined ? dest : filterNode(synth.ctx, at, spec.filter, spec.decay);
  if (spec.filter !== undefined) bus.connect(dest);
  for (const ratio of ratios) {
    const level = spec.gain * Math.pow(falloff, index);
    const decay = Math.max(spec.decay * (1 - spread * index), 0.04);
    const partial = tone(synth, bus, at, {
      type: spec.type ?? "sine",
      freq: base * ratio,
      gain: level,
      attack: 0.002 + index * 0.001,
      decay
    });
    if (partial > end) end = partial;
    index += 1;
  }
  return end;
}

export function lfo(synth: Synth, target: AudioParam, at: number, rate: number, depth: number): OscillatorNode {
  const ctx = synth.ctx;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(rate, at);
  const amount = ctx.createGain();
  amount.gain.setValueAtTime(depth, at);
  osc.connect(amount);
  amount.connect(target);
  osc.start(at);
  synth.track(osc);
  return osc;
}

export function stopSource(node: AudioScheduledSourceNode, at: number): void {
  try {
    node.stop(at);
  } catch {
    node.disconnect();
  }
}
