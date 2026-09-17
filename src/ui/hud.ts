import type { Tuning } from "../tuning";
import type { GameState } from "../game/types";
import { BOSS_NAME, LONGWICK_BADGE, roomName } from "../content/strings";

export interface Hud {
  sync(state: GameState, tuning: Tuning): void;
}

const ROOM_LABEL_MS = 3200;

function setText(el: HTMLElement, value: string): void {
  if (el.textContent !== value) el.textContent = value;
}

export function createHud(root: HTMLElement): Hud {
  const hud = document.createElement("div");
  hud.className = "hud";

  const lantern = document.createElement("div");
  lantern.className = "hud-lantern";

  const pips: HTMLElement[] = [];

  const dashRow = document.createElement("div");
  dashRow.className = "hud-dash";
  const dashLabel = document.createElement("span");
  dashLabel.className = "hud-dash-label";
  dashLabel.textContent = "dash";
  const dashTrack = document.createElement("div");
  dashTrack.className = "hud-dash-track";
  const dashFill = document.createElement("div");
  dashFill.className = "hud-dash-fill";
  dashTrack.appendChild(dashFill);
  dashRow.appendChild(dashLabel);
  dashRow.appendChild(dashTrack);

  const badge = document.createElement("div");
  badge.className = "hud-badge";
  badge.textContent = LONGWICK_BADGE;

  hud.appendChild(lantern);
  hud.appendChild(dashRow);
  hud.appendChild(badge);

  const roomLabel = document.createElement("div");
  roomLabel.className = "hud-room";

  const bossBar = document.createElement("div");
  bossBar.className = "hud-boss";
  const bossName = document.createElement("div");
  bossName.className = "hud-boss-name";
  bossName.textContent = BOSS_NAME;
  const bossTrack = document.createElement("div");
  bossTrack.className = "hud-boss-track";
  const bossFill = document.createElement("div");
  bossFill.className = "hud-boss-fill";
  bossTrack.appendChild(bossFill);
  bossBar.appendChild(bossName);
  bossBar.appendChild(bossTrack);

  root.appendChild(hud);
  root.appendChild(roomLabel);
  root.appendChild(bossBar);

  let lastBossPercent = -1;
  let bossVisible: boolean | null = null;

  let pipCount = -1;
  let lastHealth = -1;
  let lastPercent = -1;
  let lastReady: boolean | null = null;
  let lastBadge: boolean | null = null;
  let lastRoomId = "";
  let roomShownAt = -1000;
  let roomVisible = false;

  return {
    sync(state: GameState, tuning: Tuning): void {
      const bonus = Math.max(0, Math.round(state.progress.maxHealthBonus));
      const maxHealth = Math.max(1, Math.round(tuning.player.maxHealth) + bonus);
      if (maxHealth !== pipCount) {
        pipCount = maxHealth;
        lantern.replaceChildren();
        pips.length = 0;
        for (let i = 0; i < maxHealth; i++) {
          const pip = document.createElement("span");
          pip.className = "hud-pip";
          lantern.appendChild(pip);
          pips.push(pip);
        }
        lastHealth = -1;
      }

      const health = Math.max(0, Math.min(maxHealth, Math.round(state.player.health)));
      if (health !== lastHealth) {
        lastHealth = health;
        for (let i = 0; i < pips.length; i++) {
          const pip = pips[i];
          if (pip !== undefined) pip.classList.toggle("lit", i < health);
        }
      }

      const cooldown = Math.max(tuning.dash.cooldownMs, 1) / 1000;
      const remaining = Math.max(0, state.player.dashReadyAt - state.time);
      const fraction = Math.max(0, Math.min(1, 1 - remaining / cooldown));
      const percent = Math.round(fraction * 100);
      if (percent !== lastPercent) {
        lastPercent = percent;
        dashFill.style.width = percent + "%";
      }
      const ready = remaining <= 0;
      if (ready !== lastReady) {
        lastReady = ready;
        dashTrack.classList.toggle("ready", ready);
      }

      const hasLongwick = state.player.longwick;
      if (hasLongwick !== lastBadge) {
        lastBadge = hasLongwick;
        badge.classList.toggle("show", hasLongwick);
      }

      if (state.roomId !== lastRoomId) {
        lastRoomId = state.roomId;
        setText(roomLabel, roomName(state.roomId));
        roomShownAt = state.time;
      }

      const showRoom =
        state.phase !== "title" &&
        state.phase !== "paused" &&
        state.time - roomShownAt < ROOM_LABEL_MS / 1000;
      if (showRoom !== roomVisible) {
        roomVisible = showRoom;
        roomLabel.classList.toggle("show", showRoom);
      }

      const hidden = state.phase === "title";
      hud.classList.toggle("hidden", hidden);

      const boss = state.boss;
      const showBoss =
        !hidden &&
        state.phase !== "dead" &&
        state.phase !== "victory" &&
        boss !== null &&
        boss.alive &&
        boss.state !== "dormant";
      if (showBoss !== bossVisible) {
        bossVisible = showBoss;
        bossBar.classList.toggle("show", showBoss);
      }
      if (boss !== null) {
        const fraction = Math.max(0, Math.min(1, boss.health / Math.max(boss.maxHealth, 1)));
        const bossPercent = Math.round(fraction * 1000) / 10;
        if (bossPercent !== lastBossPercent) {
          lastBossPercent = bossPercent;
          bossFill.style.width = bossPercent + "%";
        }
      }
    }
  };
}
