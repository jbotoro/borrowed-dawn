import type { GameState } from "../game/types";
import { CONTROLS, HOOK, START_PROMPT, TITLE } from "../content/strings";

export interface TitleScreen {
  sync(state: GameState): void;
}

export function createTitle(root: HTMLElement): TitleScreen {
  const screen = document.createElement("div");
  screen.className = "screen screen-title";

  const heading = document.createElement("h1");
  heading.textContent = TITLE;

  const hook = document.createElement("p");
  hook.className = "screen-hook";
  hook.textContent = HOOK;

  const controls = document.createElement("p");
  controls.className = "screen-controls";
  controls.textContent = CONTROLS;

  const prompt = document.createElement("p");
  prompt.className = "screen-prompt";
  prompt.textContent = START_PROMPT;

  screen.appendChild(heading);
  screen.appendChild(hook);
  screen.appendChild(controls);
  screen.appendChild(prompt);
  root.appendChild(screen);

  let visible: boolean | null = null;

  return {
    sync(state: GameState): void {
      const show = state.phase === "title";
      if (show !== visible) {
        visible = show;
        screen.classList.toggle("show", show);
      }
    }
  };
}
