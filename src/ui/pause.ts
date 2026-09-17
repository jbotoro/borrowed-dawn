import type { GameState } from "../game/types";
import { CONTROLS, PAUSED, PAUSE_PROMPT, roomName } from "../content/strings";

export interface PauseScreen {
  sync(state: GameState): void;
}

export function createPause(root: HTMLElement): PauseScreen {
  const screen = document.createElement("div");
  screen.className = "screen screen-pause";

  const heading = document.createElement("h1");
  heading.textContent = PAUSED;

  const where = document.createElement("p");
  where.className = "screen-prompt screen-where";

  const controls = document.createElement("p");
  controls.className = "screen-controls";
  controls.textContent = CONTROLS;

  const prompt = document.createElement("p");
  prompt.className = "screen-prompt";
  prompt.textContent = PAUSE_PROMPT;

  screen.appendChild(heading);
  screen.appendChild(where);
  screen.appendChild(controls);
  screen.appendChild(prompt);
  root.appendChild(screen);

  let visible: boolean | null = null;
  let labelled = "";

  return {
    sync(state: GameState): void {
      const show = state.phase === "paused";
      if (show && state.roomId !== labelled) {
        labelled = state.roomId;
        where.textContent = roomName(state.roomId);
      }
      if (show !== visible) {
        visible = show;
        screen.classList.toggle("show", show);
      }
    }
  };
}
