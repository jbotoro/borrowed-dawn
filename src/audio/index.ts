import type { Tuning } from "../tuning";
import type { GameEvent, GameState, Room } from "../game/types";
import type { Synth } from "./synth";
import { createSynth } from "./synth";
import type { Bed, BedId } from "./music";
import { createBed } from "./music";
import type { SfxKey } from "./sfx";
import { playSfx } from "./sfx";
import { createFileLayer } from "./files";

export interface AudioStats {
  context: string;
  bed: BedId | null;
  beds: number;
  muted: boolean;
  intensity: number;
  created: number;
  active: number;
}

export interface AudioApi {
  readonly muted: boolean;
  readonly context: AudioContext | null;
  unlock(): void;
  setRoom(room: Room): void;
  onEvent(event: GameEvent, state: GameState): void;
  sync(state: GameState, dt: number): void;
  toggleMute(): void;
  stats(): AudioStats;
}

interface BedSlot {
  bed: Bed;
  stopAt: number | null;
}

const LOOKAHEAD = 0.45;
const MUTE_RAMP = 0.06;
const PAUSE_DUCK = 0.5;

function bedForRoom(room: Room, dawn: boolean): BedId {
  if (room.music === "reserve") return "reserve";
  let id: BedId;
  if (room.music === "bellkeeper") id = "bellkeeper";
  else if (room.music === "cinder") id = "cinder";
  else id = room.bossArena === undefined ? "cinder" : "bellkeeper";
  return dawn && id === "cinder" ? "dawn" : id;
}

function pickupKey(event: GameEvent, state: GameState): SfxKey {
  for (const pickup of state.pickups) {
    if (Math.abs(pickup.pos.x - event.x) < 0.01 && Math.abs(pickup.pos.y - event.y) < 0.01) {
      return pickup.kind === "dawnCore" ? "dawnCore" : "pickup";
    }
  }
  return "pickup";
}

function eventKey(event: GameEvent, state: GameState): SfxKey | null {
  switch (event.kind) {
    case "roomEnter":
      return null;
    case "pickup":
      return pickupKey(event, state);
    case "bossTelegraph":
      return state.boss !== null && state.boss.state === "stompTelegraph"
        ? "bossTelegraphStomp"
        : "bossTelegraphSweep";
    default:
      return event.kind;
  }
}

export function createAudio(tuning: Tuning): AudioApi {
  const cfg = tuning.audio;
  const files = createFileLayer({ master: cfg.master, music: cfg.music, sfx: cfg.sfx });

  let muted = new URLSearchParams(location.search).get("mute") === "1";
  let ctx: AudioContext | null = null;
  let synth: Synth | null = null;
  let master: GainNode | null = null;
  let sfxBus: GainNode | null = null;
  let musicBus: GainNode | null = null;
  let deathDuck: GainNode | null = null;
  let pauseDuck: GainNode | null = null;

  const beds: BedSlot[] = [];
  let current: Bed | null = null;
  let desired: BedId = "cinder";
  let intensity = 1;
  let aggro = false;
  let fileDuckUntil = 0;
  let activeRoom: Room | null = null;
  let dawn = false;

  function applyMusic(): void {
    if (ctx === null || synth === null || pauseDuck === null) return;
    const now = ctx.currentTime;
    const fade = cfg.crossfadeMs / 1000;

    if (files.hasMusic(desired)) {
      for (const slot of beds) {
        if (slot.stopAt === null) slot.stopAt = slot.bed.fadeOut(now, fade);
      }
      current = null;
      files.playMusic(desired, cfg.crossfadeMs);
      return;
    }

    files.stopMusic(cfg.crossfadeMs);
    if (current !== null && current.id === desired) return;

    for (const slot of beds) {
      if (slot.stopAt === null) slot.stopAt = slot.bed.fadeOut(now, fade);
    }

    const bed = createBed(synth, pauseDuck, desired, cfg);
    bed.start(now);
    bed.fadeIn(now, fade);
    if (intensity > 1) bed.setIntensity(intensity, now);
    beds.push({ bed, stopAt: null });
    current = bed;
  }

  function selectBed(): void {
    if (activeRoom === null) return;
    const id = bedForRoom(activeRoom, dawn);
    if (id === desired && current !== null) return;
    if (id !== desired) {
      aggro = false;
      intensity = 1;
    }
    desired = id;
    applyMusic();
  }

  function setMasterGain(at: number): void {
    if (master === null) return;
    const param = master.gain;
    param.cancelScheduledValues(at);
    param.setValueAtTime(param.value, at);
    param.linearRampToValueAtTime(muted ? 0 : cfg.master, at + MUTE_RAMP);
  }

  function duckForDeath(): void {
    fileDuckUntil = performance.now() + cfg.duckMs;
    files.setMusicScale(cfg.duckOnDeath);
    if (ctx === null || deathDuck === null) return;
    const now = ctx.currentTime;
    const seconds = cfg.duckMs / 1000;
    const param = deathDuck.gain;
    param.cancelScheduledValues(now);
    param.setValueAtTime(param.value, now);
    param.linearRampToValueAtTime(cfg.duckOnDeath, now + 0.12);
    param.setValueAtTime(cfg.duckOnDeath, now + seconds * 0.6);
    param.linearRampToValueAtTime(1, now + seconds);
  }

  function setPauseDuck(value: number): void {
    if (ctx === null || pauseDuck === null) return;
    const now = ctx.currentTime;
    const param = pauseDuck.gain;
    param.cancelScheduledValues(now);
    param.setValueAtTime(param.value, now);
    param.linearRampToValueAtTime(value, now + 0.25);
  }

  function play(key: SfxKey): void {
    if (files.hasSfx(key)) {
      files.playSfx(key);
      return;
    }
    if (ctx === null || synth === null || sfxBus === null) return;
    playSfx(synth, sfxBus, key, ctx.currentTime + 0.005);
  }

  function unlock(): void {
    if (ctx !== null) {
      if (ctx.state === "suspended") void ctx.resume();
      return;
    }
    const Ctor = window.AudioContext;
    if (Ctor === undefined) return;

    ctx = new Ctor();
    synth = createSynth(ctx);

    master = ctx.createGain();
    master.gain.value = muted ? 0 : cfg.master;
    master.connect(ctx.destination);

    sfxBus = ctx.createGain();
    sfxBus.gain.value = cfg.sfx;
    sfxBus.connect(master);

    musicBus = ctx.createGain();
    musicBus.gain.value = cfg.music;
    musicBus.connect(master);

    deathDuck = ctx.createGain();
    deathDuck.gain.value = 1;
    deathDuck.connect(musicBus);

    pauseDuck = ctx.createGain();
    pauseDuck.gain.value = 1;
    pauseDuck.connect(deathDuck);

    if (ctx.state === "suspended") void ctx.resume();
    applyMusic();
  }

  function toggleMute(): void {
    muted = !muted;
    files.setMuted(muted);
    if (ctx !== null) setMasterGain(ctx.currentTime);
  }

  function onGesture(event: Event): void {
    if (!event.isTrusted) return;
    unlock();
  }

  window.addEventListener("keydown", onGesture);
  window.addEventListener("pointerdown", onGesture);

  window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (!event.isTrusted || event.repeat || event.code !== "KeyM") return;
    toggleMute();
  });

  files.setMuted(muted);
  files.load(() => applyMusic());

  return {
    get muted(): boolean {
      return muted;
    },
    get context(): AudioContext | null {
      return ctx;
    },
    unlock,
    toggleMute,
    setRoom(room: Room): void {
      activeRoom = room;
      selectBed();
    },
    onEvent(event: GameEvent, state: GameState): void {
      if (event.kind === "death") duckForDeath();
      else if (event.kind === "pause") setPauseDuck(PAUSE_DUCK);
      else if (event.kind === "resume") setPauseDuck(1);

      if (event.kind === "bossTelegraph" && !aggro) {
        aggro = true;
        intensity = cfg.bossIntensity;
        if (ctx !== null && current !== null) current.setIntensity(intensity, ctx.currentTime);
      }
      if (event.kind === "bossPhase" && ctx !== null && current !== null) {
        current.setPhase2(ctx.currentTime);
      }
      if (event.kind === "bossDeath") {
        aggro = false;
        intensity = 1;
        if (ctx !== null && current !== null) {
          const now = ctx.currentTime;
          current.setIntensity(1, now);
          current.bossDown(now);
        }
      }

      const key = eventKey(event, state);
      if (key !== null) play(key);
      if (event.kind === "bossDeath") play("victorySting");
    },
    sync(state: GameState, _dt: number): void {
      if (state.progress.bossDefeated !== dawn) {
        dawn = state.progress.bossDefeated;
        selectBed();
      }
      if (ctx === null) return;
      const now = ctx.currentTime;
      for (let i = beds.length - 1; i >= 0; i -= 1) {
        const slot = beds[i];
        if (slot === undefined) continue;
        if (slot.stopAt !== null && now > slot.stopAt + 0.05) {
          slot.bed.stop(now);
          beds.splice(i, 1);
          continue;
        }
        slot.bed.schedule(now + LOOKAHEAD);
      }
      if (fileDuckUntil > 0 && performance.now() >= fileDuckUntil) {
        fileDuckUntil = 0;
        files.setMusicScale(1);
      }
      if (musicBus !== null && Math.abs(musicBus.gain.value - cfg.music) > 0.001) {
        musicBus.gain.value = cfg.music;
      }
      if (sfxBus !== null && Math.abs(sfxBus.gain.value - cfg.sfx) > 0.001) {
        sfxBus.gain.value = cfg.sfx;
      }
      if (!muted && master !== null && Math.abs(master.gain.value - cfg.master) > 0.001) {
        master.gain.value = cfg.master;
      }
    },
    stats(): AudioStats {
      return {
        context: ctx === null ? "none" : ctx.state,
        bed: current === null ? null : current.id,
        beds: beds.length,
        muted,
        intensity,
        created: synth === null ? 0 : synth.created,
        active: synth === null ? 0 : synth.active
      };
    }
  };
}
