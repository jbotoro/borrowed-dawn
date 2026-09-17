import type { Howl } from "howler";

export interface AudioManifest {
  music: Record<string, string>;
  sfx: Record<string, string>;
}

export interface FileVolumes {
  master: number;
  music: number;
  sfx: number;
}

export interface FileLayer {
  load(onReady: () => void): void;
  hasMusic(id: string): boolean;
  hasSfx(key: string): boolean;
  playMusic(id: string, fadeMs: number): void;
  stopMusic(fadeMs: number): void;
  playSfx(key: string): void;
  setMuted(muted: boolean): void;
  setMusicScale(scale: number): void;
}

type HowlModule = typeof import("howler");

function emptyManifest(): AudioManifest {
  return { music: {}, sfx: {} };
}

function readMap(value: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof value !== "object" || value === null) return out;
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (typeof entry === "string" && entry.length > 0) out[key] = entry;
  }
  return out;
}

export function createFileLayer(volumes: FileVolumes): FileLayer {
  const base = import.meta.env.BASE_URL;
  let manifest = emptyManifest();
  let howler: HowlModule | null = null;
  const cache = new Map<string, Howl>();
  let musicId: string | null = null;
  let musicHowl: Howl | null = null;
  let musicScale = 1;
  let muted = false;

  function url(file: string): string {
    return base + "audio/" + file;
  }

  function sound(file: string, loop: boolean, volume: number): Howl | null {
    if (howler === null) return null;
    const key = (loop ? "m:" : "s:") + file;
    const found = cache.get(key);
    if (found !== undefined) return found;
    const made = new howler.Howl({ src: [url(file)], loop, volume, preload: true });
    cache.set(key, made);
    return made;
  }

  return {
    load(onReady: () => void): void {
      fetch(url("manifest.json"), { cache: "no-cache" })
        .then((response) => (response.ok ? response.json() : null))
        .then((data: unknown) => {
          if (typeof data !== "object" || data === null) return null;
          const record = data as Record<string, unknown>;
          manifest = { music: readMap(record.music), sfx: readMap(record.sfx) };
          const count = Object.keys(manifest.music).length + Object.keys(manifest.sfx).length;
          if (count === 0) return null;
          return import("howler");
        })
        .then((module) => {
          if (module === null) return;
          howler = module;
          module.Howler.volume(volumes.master);
          module.Howler.mute(muted);
          onReady();
        })
        .catch(() => {
          manifest = emptyManifest();
        });
    },
    hasMusic(id: string): boolean {
      return howler !== null && manifest.music[id] !== undefined;
    },
    hasSfx(key: string): boolean {
      return howler !== null && manifest.sfx[key] !== undefined;
    },
    playMusic(id: string, fadeMs: number): void {
      const file = manifest.music[id];
      if (file === undefined || howler === null) return;
      if (musicId === id && musicHowl !== null) return;
      const previous = musicHowl;
      if (previous !== null) {
        previous.fade(previous.volume(), 0, fadeMs);
        window.setTimeout(() => previous.stop(), fadeMs + 40);
      }
      const next = sound(file, true, 0);
      if (next === null) return;
      musicId = id;
      musicHowl = next;
      next.play();
      next.fade(0, volumes.music * musicScale, fadeMs);
    },
    stopMusic(fadeMs: number): void {
      const current = musicHowl;
      if (current === null) return;
      current.fade(current.volume(), 0, fadeMs);
      window.setTimeout(() => current.stop(), fadeMs + 40);
      musicHowl = null;
      musicId = null;
    },
    playSfx(key: string): void {
      const file = manifest.sfx[key];
      if (file === undefined) return;
      const one = sound(file, false, volumes.sfx);
      if (one === null) return;
      one.play();
    },
    setMuted(value: boolean): void {
      muted = value;
      if (howler !== null) howler.Howler.mute(value);
    },
    setMusicScale(scale: number): void {
      musicScale = scale;
      if (musicHowl !== null) musicHowl.volume(volumes.music * scale);
    }
  };
}
