import type { PickupKind } from "../game/types";

export const TITLE = "BORROWED DAWN";

export const HOOK = "Steal the sunrise from the machines that hoard it.";

export const CONTROLS =
  "ARROWS or WASD move  Z/SPACE jump  X/J attack  C/SHIFT dash  ESC pause";

export const START_PROMPT = "ENTER to begin";

export const PAUSED = "paused";

export const PAUSE_PROMPT = "ESC to resume";

export const CHECKPOINT = "ember rekindled";

export const DEATH = "the ember gutters";

export const VICTORY = "The bell falls silent. The furnace stays warm.";

export const VICTORY_PROMPT = "ENTER to return to the landing";

export const BOSS_INTRO = "THE BELLKEEPER - No light leaves the reserve.";

export const BOSS_NAME = "THE BELLKEEPER";

export const LONGWICK_BADGE = "Longwick";

export const GATE_OPEN = "the shortcut grinds open";

export const WALL_BROKEN = "the wick cache opens";

export const pickupNames: Record<PickupKind, string> = {
  longwick: "Longwick: your needle reaches further",
  dawnCore: "Dawn Core: the shrine relights",
  emberFlask: "Ember Flask: one more ember to burn"
};

export const roomNames = {
  landing: "Cinder Landing",
  gallery: "Chain Gallery",
  cache: "Wick Cache",
  belfry: "Belfry",
  vault: "Ember Vault"
};

export type RoomId = keyof typeof roomNames;

export function roomName(id: string): string {
  const names = roomNames as Record<string, string | undefined>;
  return names[id] ?? id;
}
