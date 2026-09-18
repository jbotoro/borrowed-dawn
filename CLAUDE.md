# Borrowed Dawn

A Hollow Knight-adjacent side-view action game in Three.js, built by directing AI coding agents in a two-day hackathon (2026-09-16 to 2026-09-18). Vibecoded means directed: agents write the code, the human prompts, playtests, and directs. The first morning's fixed-camera arena survivor was retired and is frozen as `m1-skeleton`.

## Read first

- `CONTEXT.md`: the glossary. Use these words.
- `docs/wayfinder-map.md`: destination, Notes (routing and the look-before-claiming rule), decisions, fog, out of scope. Open decisions are tickets in `docs/tickets/`.
- The lifecycle record and the code plan: `.claude/plans/hackathon-2026-context.md` (section "Code plan (Fable, 2026-09-16)"). It is the live document; the copy in the platform repo is frozen. Plan every slice from it and update its Progress log at every milestone gate. Index: `.claude/plans/INDEX.md`.
- `docs/plan-astra-v2.md`: the active side-view schedule, gate criteria, cut table, storyboard. `docs/plan-astra.md` is retired.
- For visual direction, asset production, or the next art slice, read `docs/style-sheet.md` (selected look C), then `docs/visual-upgrade-plan.md` (current continuation). The Landing benchmark awaits human approval; art is agent-built procedural geometry, with one licensed font exception.
- `docs/research/`: pinned versions and API shapes, verified against primary sources. Trust these over memory.
- Rules in `.claude/rules/` load automatically: model routing, the work context doc rule, the lifecycle-record rule for this repo, and the shared guardrails imported from `AGENTS.md`.

## Stack (fixed)

three 0.186 with `WebGLRenderer` + `EffectComposer` + `UnrealBloomPass`, TypeScript strict, Vite 8 with `base` set for GitHub Pages, Vitest, lil-gui, howler. Node 24 via `.tool-versions`. Procedural low-poly geometry only; no imported or generated 3D models or sprites. Presentation is side-view 2.5D: gameplay on the XY plane (x right, y up), z is render depth only; the camera looks along -z and follows in the plane within room bounds.

## Commands

```
npm run dev        # http://localhost:5173/borrowed-dawn/
npm run typecheck
npm test
npm run build
npm run snapshot -- m1-skeleton   # freezes a milestone build under public/builds/<tag>/
```

Debug query params: `?autoplay=1&seed=42` (scripted bot plays a run so agents can watch), `?screenshot=1` (hides HUD and tuning panel), `?fast=4` (time scale).

## Layout (one responsibility per directory)

- `src/main.ts` boot: renderer, scene, game loop, UI mount.
- `src/tuning.ts` every gameplay and feel number. The configurator (`src/ui/configurator.ts`) binds to it live and persists overrides to localStorage. Nothing else hard-codes a number.
- `src/game/` pure simulation, no three imports: physics, player, enemies, boss, hazards, combat, rooms, progress. Contract in `src/game/types.ts`.
- `src/content/` the rooms as data (solids, doors, enemies, pickups, gates, breakables, decor, bot waypoints) and the strings. Geometry is content; feel and difficulty numbers are tuning.
- `src/render/` three only: renderer, side-view camera, room mesh, player, enemies, boss, fx, postfx.
- `src/ui/` DOM overlays (title, HUD, pause, banners) in plain CSS.
- `src/audio/` howler wrapper with a procedural WebAudio fallback.
- `src/debug/` autoplay bot, params: `?autoplay=1`, `?seed=`, `?screenshot=1`, `?fast=`, `?room=<id>`, `?start=demo`, `?god=1`.
- `test/` Vitest on `src/game/` logic only. No visual tests.
- `docs/` map, tickets, interventions log, milestone evidence, research.

## Rules of the build

- Look before claiming. Never report a visual or feel change as working without seeing it: with the dev server running, use the Chrome DevTools MCP to `navigate_page` to `http://localhost:5173/borrowed-dawn/?autoplay=1&seed=42`, `take_screenshot`, `list_console_messages`. `press_key` drives input, `evaluate_script` reads state. Add `&screenshot=1` to hide the UI.
- Playtest before tuning. Numbers change in the configurator during play, then get written back to `src/tuning.ts` defaults.
- Model routing: design calls on Fable (the main session), implementation on Opus subagents, screenshots and log reading on Haiku, Codex review (`/codex-review`) before each milestone tag.
- The human owns git and GitHub: commits, pushes, tags, Pages. Agents never run git writes.
- Every human code edit is an intervention, logged in `docs/interventions.md`. Agent edits are not.
- Milestone gates: `npm run check`, a code review of the diff since the last tag (`/code-review`; Codex is out of credits until 2026-09-19), `npm run snapshot -- <tag>`, the human commits, tags, and pushes, then evidence goes in `docs/milestones.md` and the lifecycle record.

## Local agent tooling

`.claude/skills`, `.claude/commands`, `.claude/lessons`, two of the rules, and `.agents` are symlinks into `~/Desktop/platform` so this repo runs under the same skills and guardrails as the platform repo without a second copy. Project context is NOT shared: the lifecycle record, plans, and index live in this repo under `.claude/plans/`. `.claude/` is git-ignored along with `CLAUDE.local.md`. Session memory for this repo lives under `~/.claude/projects/-Users-jordanblack-Desktop-one-more-run/memory/` and links the generic platform memories.
