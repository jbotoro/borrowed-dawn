# Wayfinder map: One More Run

Label: wayfinder:map. Tracker: this file plus `docs/tickets/`. Lifecycle record: `platform/.claude/plans/hackathon-2026-context.md`.

## Destination

A playable, deployed fixed-camera 2.5D arena survivor in Three.js, presented live at midday Friday 2026-09-18 with a build story (milestone URLs, intervention log, transcript moments). Done means: title, one arena, waves, dash, survival-time score, loss, score screen, instant restart, pause, best score, music and SFX, and it reads as 3D in the first three seconds.

## Notes

- Vibecoded means directed: agents write the code, the human prompts, playtests, directs; every manual edit is logged in `docs/interventions.md`.
- Stack is fixed: Three.js, TypeScript, Vite, procedural low-poly, no imported 3D models. Renderer decision is in the code plan.
- Skills every session consults: `grilling` for any design call, `prototype` for feel questions, `research` for stack facts. Agents must look at the game before claiming a visual or feel change works: with the dev server running, use the Chrome DevTools MCP tools `navigate_page` to `http://localhost:5173/?autoplay=1&seed=42`, `take_screenshot`, `list_console_messages`, and `evaluate_script`; `press_key` drives input. Add `&screenshot=1` to hide the HUD and configurator.
- Playtest before tuning. Numbers change through the configurator, then get written back to the tuning defaults.
- Model routing: design calls on Fable, implementation on Opus, screenshots and log reading on Haiku, Codex review before each milestone tag.

## Decisions so far

- [Feasibility of the original Deal Brief idea](../../platform/.claude/plans/hackathon-2026-context.md): feasible, then ruled out of scope because it needs product and UX decisions the builder does not own.
- [Ambition axis](../../platform/.claude/plans/hackathon-2026-context.md): fixed-camera 2.5D 3D presentation with an arcade-simple core; full 3D movement and deep 2D systems both rejected on risk.
- [Destination named](../../platform/.claude/plans/hackathon-2026-context.md): all round-3 recommendations accepted 2026-09-16.
- [Stack versions and API shapes](tickets/02-research-stack-versions.md): three 0.186 with WebGL EffectComposer bloom (not deprecated, verified), Vite 8 on Pages with `base`, milestone builds snapshotted under `public/builds/<tag>/`, Chrome DevTools MCP via `.mcp.json` launching its own Chrome.
- [Audio sourcing](tickets/03-research-audio-sourcing.md): CC0 loop from OpenGameArt, eight SFX from ElevenLabs free tier, Kenney backup, procedural WebAudio fallback, first-gesture unlock; Suno skipped on license ambiguity.

## Not yet specified

- Theme and look: the arena survivor has no fiction yet. What are the player and the enemies, what palette, what is the joke the room gets. Decided by prototype once the skeleton runs, not before.
- Audio direction: sourcing is decided (ticket 03); which specific track and the SFX prompts wait on theme (ticket 05).
- The LLM-in-game stretch: only if first fun lands Wednesday night; shape unknown until then.
- Demo storyboard details: which transcript moments, which milestone URLs to show side by side. Waits on the builds existing.

## Out of scope

- Deal Brief (Apex handoff page): product-owned decisions. See the platform context doc.
- Leaderboard, levels, difficulty select, phone or touch play, multiplayer, campaign, level editor.
- Imported or generated 3D models: procedural geometry only, so the asset pipeline never blocks.
