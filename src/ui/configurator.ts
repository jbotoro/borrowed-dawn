import GUI from "lil-gui";
import { tuning } from "../tuning";

const STORAGE_KEY = "borrowed-dawn:tuning";

export function mountConfigurator(): GUI {
  const gui = new GUI({ title: "Tuning" });

  for (const [groupName, group] of Object.entries(tuning)) {
    const folder = gui.addFolder(groupName);
    for (const [key, value] of Object.entries(group)) {
      if (typeof value === "number") {
        const span = value === 0 ? 1 : Math.abs(value) * 4;
        const min = value < 0 ? -span : 0;
        const max = value < 0 ? 0 : span;
        folder.add(group as Record<string, number>, key, min, max);
      }
    }
    folder.close();
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) gui.load(JSON.parse(saved));
  } catch {
    // ignore unreadable saved state
  }

  gui.onChange(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gui.save()));
    } catch {
      // storage unavailable
    }
  });

  const actions = {
    exportJson: () => {
      const json = JSON.stringify(tuning, null, 2);
      void navigator.clipboard?.writeText(json);
      console.log("[tuning] copied to clipboard:\n" + json);
    },
    resetSaved: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // storage unavailable
      }
      location.reload();
    }
  };
  gui.add(actions, "exportJson").name("copy tuning as JSON");
  gui.add(actions, "resetSaved").name("reset saved overrides");

  const screenshot = new URLSearchParams(location.search).get("screenshot") === "1";
  gui.hide();
  if (!screenshot) {
    window.addEventListener("keydown", (event) => {
      if (event.code !== "Backquote") return;
      event.preventDefault();
      if (gui._hidden) gui.show();
      else gui.hide();
    });
  }

  return gui;
}
