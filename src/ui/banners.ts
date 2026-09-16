import type { GameEvent, GameState } from "../game/types";
import {
  CHECKPOINT,
  DEATH,
  GATE_OPEN,
  VICTORY,
  WALL_BROKEN,
  pickupNames
} from "../content/strings";

export interface Banners {
  onEvent(event: GameEvent, state: GameState): void;
  sync(state: GameState): void;
}

const BANNER_SECONDS = 2.4;

function setText(el: HTMLElement, value: string): void {
  if (el.textContent !== value) el.textContent = value;
}

export function createBanners(root: HTMLElement): Banners {
  const vignette = document.createElement("div");
  vignette.className = "vignette";

  const banner = document.createElement("div");
  banner.className = "banner";

  root.appendChild(vignette);
  root.appendChild(banner);

  let text = "";
  let shownAt = -1000;
  let visible: boolean | null = null;
  let vignetteOn: boolean | null = null;
  const announced = new Set<string>();

  function show(state: GameState, value: string): void {
    text = value;
    shownAt = state.time;
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

  return {
    onEvent(event: GameEvent, state: GameState): void {
      if (event.kind === "pickup") show(state, pickupText(state, event));
      else if (event.kind === "checkpoint") show(state, CHECKPOINT);
      else if (event.kind === "gateOpen") show(state, GATE_OPEN);
      else if (event.kind === "breakableBroken") show(state, WALL_BROKEN);
      else if (event.kind === "death") show(state, DEATH);
      else if (event.kind === "victory") show(state, VICTORY);
    },

    sync(state: GameState): void {
      const dead = state.phase === "dead";
      const won = state.phase === "victory";

      let showBanner: boolean;
      let value = text;
      if (dead) {
        showBanner = true;
        value = DEATH;
      } else if (won) {
        showBanner = true;
        value = VICTORY;
      } else {
        showBanner = state.phase !== "title" && state.time - shownAt < BANNER_SECONDS;
      }

      if (showBanner) setText(banner, value);
      if (showBanner !== visible) {
        visible = showBanner;
        banner.classList.toggle("show", showBanner);
      }

      const showVignette = dead || won;
      if (showVignette !== vignetteOn) {
        vignetteOn = showVignette;
        vignette.classList.toggle("show", showVignette);
        vignette.classList.toggle("victory", won);
      }
    }
  };
}
