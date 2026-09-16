import type { GameState } from "../game/types";
import { PAUSED, PAUSE_PROMPT } from "../content/strings";

export interface PauseScreen {
  sync(state: GameState): void;
}

export function createPause(root: HTMLElement): PauseScreen {
  const screen = document.createElement("div");
  screen.className = "screen screen-pause";

  const heading = document.createElement("h1");
  heading.textContent = PAUSED;

  const prompt = document.createElement("p");
  prompt.className = "screen-prompt";
  prompt.textContent = PAUSE_PROMPT;

  screen.appendChild(heading);
  screen.appendChild(prompt);
  root.appendChild(screen);

  let visible: boolean | null = null;

  return {
    sync(state: GameState): void {
      const show = state.phase === "paused";
      if (show !== visible) {
        visible = show;
        screen.classList.toggle("show", show);
      }
    }
  };
}
