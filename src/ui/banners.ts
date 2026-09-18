import type { Tuning } from "../tuning";
import type { GameEvent, GameState } from "../game/types";
import {
  BOSS_DEFEATED,
  BOSS_INTRO,
  CHECKPOINT,
  DEATH,
  GATE_OPEN,
  VICTORY,
  VICTORY_PROMPT,
  WALL_BROKEN,
  pickupNames
} from "../content/strings";

export interface Banners {
  onEvent(event: GameEvent, state: GameState, tuning: Tuning): void;
  sync(state: GameState, tuning: Tuning): void;
}

function setText(el: HTMLElement, value: string): void {
  if (el.textContent !== value) el.textContent = value;
}

export function createBanners(root: HTMLElement): Banners {
  const vignette = document.createElement("div");
  vignette.className = "vignette";

  const banner = document.createElement("div");
  banner.className = "banner";

  const prompt = document.createElement("p");
  prompt.className = "banner-prompt";
  prompt.textContent = VICTORY_PROMPT;

  root.appendChild(vignette);
  root.appendChild(banner);
  root.appendChild(prompt);

  let text = "";
  let shownAt = -1000;
  let holdSeconds = 0;
  let visible: boolean | null = null;
  let promptVisible: boolean | null = null;
  let vignetteOn: boolean | null = null;
  let vignetteMs = -1;
  let bannerTone = "";
  let bossIntroShown = false;
  let lockUntil = -1000;
  const announced = new Set<string>();

  function show(state: GameState, value: string, seconds: number): void {
    if (state.time < lockUntil) return;
    text = value;
    shownAt = state.time;
    holdSeconds = seconds;
  }

  function showLocked(state: GameState, value: string, seconds: number): void {
    text = value;
    shownAt = state.time;
    holdSeconds = seconds;
    lockUntil = state.time + seconds;
  }

  function resetRun(): void {
    bossIntroShown = false;
    lockUntil = -1000;
    text = "";
    shownAt = -1000;
    holdSeconds = 0;
    announced.clear();
  }

  function pickupText(state: GameState, event: GameEvent): string {
    let best: string | null = null;
    let bestDist = Number.POSITIVE_INFINITY;
    for (const pickup of state.pickups) {
      if (!pickup.collected) continue;
      if (announced.has(pickup.id)) continue;
      const dx = pickup.pos.x - event.x;
      const dy = pickup.pos.y - event.y;
      const dist = dx * dx + dy * dy;
      if (dist < bestDist) {
        bestDist = dist;
        best = pickup.id;
      }
    }
    if (best === null) return pickupNames.longwick;
    announced.add(best);
    const found = state.pickups.find((pickup) => pickup.id === best);
    return found === undefined ? pickupNames.longwick : pickupNames[found.kind];
  }

  function toneFor(dead: boolean, won: boolean, intro: boolean): string {
    if (won) return "victory";
    if (dead) return "death";
    if (intro) return "intro";
    return "";
  }

  return {
    onEvent(event: GameEvent, state: GameState, tuning: Tuning): void {
      const feel = tuning.feel;
      const banners = feel.bannerMs / 1000;
      if (event.kind === "pickup") show(state, pickupText(state, event), banners);
      else if (event.kind === "checkpoint") show(state, CHECKPOINT, banners);
      else if (event.kind === "gateOpen") {
        if (!state.progress.bossDefeated) show(state, GATE_OPEN, banners);
      }
      else if (event.kind === "breakableBroken") show(state, WALL_BROKEN, banners);
      else if (event.kind === "death") showLocked(state, DEATH, banners);
      else if (event.kind === "victory") showLocked(state, VICTORY, banners);
      else if (event.kind === "bossDeath") showLocked(state, BOSS_DEFEATED, feel.bossIntroMs / 1000);
      else if (event.kind === "roomEnter") {
        const boss = state.boss;
        if (!bossIntroShown && boss !== null && boss.alive) {
          bossIntroShown = true;
          showLocked(state, BOSS_INTRO, feel.bossIntroMs / 1000);
        }
      }
    },

    sync(state: GameState, tuning: Tuning): void {
      const dead = state.phase === "dead";
      const won = state.phase === "victory";
      if (state.phase === "title") resetRun();

      let showBanner: boolean;
      let value = text;
      if (dead) {
        showBanner = true;
        value = DEATH;
      } else if (won) {
        showBanner = true;
        value = VICTORY;
      } else {
        showBanner = state.phase !== "title" && state.time - shownAt < holdSeconds;
      }

      if (showBanner) setText(banner, value);
      if (showBanner !== visible) {
        visible = showBanner;
        banner.classList.toggle("show", showBanner);
      }

      const intro = showBanner && !dead && !won && (value === BOSS_INTRO || value === BOSS_DEFEATED);
      const tone = toneFor(dead, won, intro);
      if (tone !== bannerTone) {
        bannerTone = tone;
        banner.classList.toggle("banner-victory", tone === "victory");
        banner.classList.toggle("banner-death", tone === "death");
        banner.classList.toggle("banner-intro", tone === "intro");
      }

      const showPrompt = won && state.time - state.victoryAt >= tuning.feel.victoryHoldMs / 1000;
      if (showPrompt !== promptVisible) {
        promptVisible = showPrompt;
        prompt.classList.toggle("show", showPrompt);
      }

      const showVignette = dead || won;
      const ms = dead ? tuning.feel.deathDelayMs : tuning.feel.victoryHoldMs;
      if (ms !== vignetteMs) {
        vignetteMs = ms;
        vignette.style.setProperty("--vignette-ms", ms + "ms");
      }
      if (showVignette !== vignetteOn) {
        vignetteOn = showVignette;
        vignette.classList.toggle("show", showVignette);
        vignette.classList.toggle("victory", won);
      }
    }
  };
}
