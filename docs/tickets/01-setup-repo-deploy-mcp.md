# 01 Setup: repo, deploy pipeline, agent eyes

Label: wayfinder:task (HITL for git and GitHub, AFK for files)
Blocked by: none (02 closed)
Claimed by: agent and human, 2026-09-16
Status: closed 2026-09-16 09:15

## Resolution

Repo: https://github.com/jbotoro/one-more-run (public; branch renamed from `main,` to `main`). Pages enabled with source GitHub Actions; first run failed with a 404 because it ran before Pages existed; re-run deployed. Site: https://jbotoro.github.io/one-more-run/ renders the boot scene (arena disc, blue wall ring, glowing octahedron, tuning panel) as confirmed by the human's screenshot. Confirmed 2026-09-16 09:25: the Chrome DevTools MCP server starts from `.mcp.json` in a Claude Code session opened from this directory, launches its own Chrome, and returns a screenshot and console messages for `http://localhost:5173/one-more-run/?screenshot=1`. Console at boot: vite connected, `[one-more-run] boot ok`, a lil-gui form-field accessibility issue (24 fields, harmless), and a 404 for `/favicon.ico` (silenced with an empty data-URI icon in `index.html`).

## Agent part, done 2026-09-16

Scaffold written and verified under Node 24 (`.tool-versions` added because asdf fell back to Node 18 outside the platform repo): `npm run typecheck` clean, `npm test` 2 passing, `npm run build` 587 kB. Boot scene in `src/main.ts` (arena disc, glowing wall ring, rotating player octahedron, bloom, fixed 55-degree camera, configurator) is NOT yet visually verified; first thing Wednesday, run `npm run dev` and look at it through Chrome DevTools MCP. Files: `package.json` (pinned), `vite.config.ts` (`base` for Pages, snapshot base via `SNAPSHOT_TAG`), `tsconfig.json`, `index.html`, `src/main.ts`, `src/tuning.ts`, `src/ui/configurator.ts`, `src/ui/ui.css`, `scripts/snapshot.mjs`, `.github/workflows/pages.yml`, `.mcp.json`, `.gitignore`, `docs/milestones.md`, `test/tuning.test.ts`.

## Question

What must exist before the first build hour on Wednesday so that every later ticket can deploy, be seen by agents, and be tagged at milestones?

## Checklist

Human (git and GitHub writes are yours):
1. `cd ~/Desktop/one-more-run && git init -b main`
2. `gh repo create one-more-run --private --source . --push` after the scaffold commit
3. In the repo settings, Pages: source = GitHub Actions
4. Confirm the Chrome DevTools MCP server starts from `.mcp.json` in a fresh Claude Code session in this directory

Agent (file-only, once 02 pins versions):
1. Scaffold Vite + TypeScript with the pinned versions, `base` set for the repo subpath
2. `.mcp.json` with the Chrome DevTools MCP server
3. `.github/workflows/pages.yml`: on push to main build and deploy `dist` to Pages; on tag `m*-*` also publish to `builds/<tag>/`
4. `src/tuning.ts` skeleton and the `docs/milestones.md` evidence template (URL, timestamp, gate result, screenshot, clip)

## Resolution

Recorded here when done: repo URL, Pages URL, first deploy timestamp.
