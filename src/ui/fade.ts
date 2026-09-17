import type { Tuning } from "../tuning";
import type { GameEvent } from "../game/types";

export interface Fade {
  onEvent(event: GameEvent, tuning: Tuning): void;
}

export function createFade(root: HTMLElement): Fade {
  const veil = document.createElement("div");
  veil.className = "fade";
  root.appendChild(veil);

  return {
    onEvent(event: GameEvent, tuning: Tuning): void {
      if (event.kind === "start") {
        veil.style.transition = "none";
        veil.style.opacity = "0";
        return;
      }
      if (event.kind !== "roomEnter" && event.kind !== "respawn") return;
      veil.style.transition = "none";
      veil.style.opacity = "1";
      void veil.offsetWidth;
      veil.style.transition = "opacity " + Math.max(0, tuning.feel.transitionFadeMs) + "ms linear";
      veil.style.opacity = "0";
    }
  };
}
