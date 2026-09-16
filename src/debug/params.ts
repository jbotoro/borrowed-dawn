export interface DebugParams {
  readonly autoplay: boolean;
  readonly seed: number;
  readonly screenshot: boolean;
  readonly fast: number;
  readonly room: string | null;
  readonly start: string | null;
  readonly god: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

function parseParams(): DebugParams {
  const search = new URLSearchParams(location.search);

  const autoplay = search.get("autoplay") === "1";
  const screenshot = search.get("screenshot") === "1";
  const god = search.get("god") === "1";

  const rawSeed = search.get("seed");
  const parsedSeed = rawSeed === null ? Number.NaN : Number.parseInt(rawSeed, 10);
  const seed = Number.isFinite(parsedSeed) ? parsedSeed >>> 0 : (Date.now() >>> 0) || 1;

  const rawFast = search.get("fast");
  const parsedFast = rawFast === null ? Number.NaN : Number.parseFloat(rawFast);
  const fast = Number.isFinite(parsedFast) ? clamp(parsedFast, 0.1, 16) : 1;

  const rawRoom = search.get("room");
  const room = rawRoom !== null && rawRoom.length > 0 ? rawRoom : null;

  const rawStart = search.get("start");
  const start = rawStart === "demo" ? "demo" : null;

  return Object.freeze({ autoplay, seed, screenshot, fast, room, start, god });
}

export const params: DebugParams = parseParams();
