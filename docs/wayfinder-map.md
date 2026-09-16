# Wayfinder map: One More Run (v2, redrawn 2026-09-16 10:20)

Label: wayfinder:map. Tracker: this file plus `docs/tickets/`. Lifecycle record: `.claude/plans/hackathon-2026-context.md` in this repo (git-ignored because it carries platform-internal notes). The v1 map (fixed-camera arena survivor) is superseded; its decisions are kept below under "Retired path".

## Destination

A playable, deployed Hollow Knight-adjacent side-view action game in Three.js, presented live at midday Friday 2026-09-18 with a build story (milestone URLs, intervention log, transcript moments, and the retired arena-survivor skeleton as the path not taken). Philosophy: intrigue via exploration, difficulty via bosses, rewards via loot. Done means: title, one four-room area (Cinder Landing, Chain Gallery, Wick Cache, Belfry), a checkpoint, three placed enemies, one two-phase boss (the Bellkeeper), one reach upgrade found by exploring (the Longwick), the boss payoff (the Dawn Core), instant respawn, pause, music and SFX, and it reads as a 3D side-view game in the first three seconds. Verbs at launch: move, jump, directional attack, dash with i-frames. No score. Full plan: `docs/plan-astra-v2.md`.

Direction (Astra, provisional until the user accepts): "Borrowed Dawn". Hook: "Steal the sunrise from the machines that hoard it." The player is a lantern courier; the world sealed its dying sun inside machines that still guard it. Two further areas are designed on paper only (Glass Orchard, Ash Observatory).

## Notes

- Vibecoded means directed: agents write the code, the human prompts, playtests, directs; every manual edit is logged in `docs/interventions.md`.
- Stack is fixed: Three.js, TypeScript, Vite, procedural low-poly geometry, no imported or generated art. Presentation is side-view 2.5D: gameplay on the XY plane, rendered in 3D with depth layers, fog, and bloom. Renderer decisions are in the code plan (lifecycle record, "Code plan v2").
- Skills every session consults: `grilling` for any design call, `prototype` for feel questions, `research` for stack facts. Agents must look at the game before claiming a visual or feel change works: with the dev server running, use the Chrome DevTools MCP tools `navigate_page` to `http://localhost:5173/one-more-run/?autoplay=1&seed=42`, `take_screenshot`, `list_console_messages`, and `evaluate_script`; `press_key` drives input (hold keys from `evaluate_script` when a tap is too short). Add `&screenshot=1` to hide the HUD and configurator; `&room=<id>` starts in a room; `&start=demo` is the demo start.
- Playtest before tuning. Numbers change through the configurator, then get written back to the tuning defaults.
- Model routing: design calls on Fable, high-level and story planning on Astra, implementation on Opus, screenshots and log reading on Haiku, Codex review before each milestone tag. Rules, skills, commands, and guardrails are the platform repo's, symlinked in (see `CLAUDE.md`).
- Every fight matters: enemies are few and placed by hand. Never a swarm.
- The genre is the certainty; the fiction is not. Nothing may copy Hollow Knight's themes or feel (no bug kingdom, no nail-and-soul vocabulary, no void melancholy by default). The vision doc (`docs/vision.md`, Astra) is the reference for what fits.
- The human playtests asynchronously through `docs/playtest.md` (checklists per gate plus a session log); agents read it before every slice and gate. The build story is kept in `docs/build-story.md` with the human's guidance counted; it is part of the deliverable.

## Decisions so far

- [Setup: repo, deploy pipeline, agent eyes](tickets/01-setup-repo-deploy-mcp.md): repo public, Pages live, Chrome DevTools MCP confirmed from a session in this directory.
- [Stack versions and API shapes](tickets/02-research-stack-versions.md): three 0.186 with WebGL EffectComposer bloom, Vite 8 on Pages with `base`, milestone builds under `public/builds/<tag>/`.
- [Audio sourcing](tickets/03-research-audio-sourcing.md): CC0 loop from OpenGameArt, generated SFX from ElevenLabs free tier, Kenney backup, procedural WebAudio fallback, first-gesture unlock.
- [Destination redrawn](../.claude/plans/hackathon-2026-context.md): the arena survivor is retired after `m1-skeleton` because a colleague shipped a survivor clone last year; the new destination is above. Seven user answers recorded in the lifecycle record's Decisions.
- [High-level plan v2](plan-astra-v2.md): Astra's phases, gates, cut table, storyboard, and the "Borrowed Dawn" direction, accepted provisionally.
- [Vision doc](vision.md): the world bible (Astra, 2026-09-16 11:30). Four areas (Cinder Belfry built; Glass Orchard, Rainworks, Ash Observatory on paper), each with two enemies, one boss, one reward, one traversal gate; expansion order parry, Orchard, Rainworks, equipment and vendor, Observatory and ending; fit checklist. Fiction terms folded into `CONTEXT.md`.
- [Testers](tickets/06-task-book-testers.md): async through `docs/playtest.md` and the shared link; no fixed sessions.

## Not yet specified

- Theme acceptance: "Borrowed Dawn" is Astra's proposal; the user judges silhouette and mood at the first visual gate (Wed 12:00-13:00 on the running skeleton). Ticket 05.
- Verb feel: whether move, jump, attack, and dash feel right together on the skeleton, and which numbers make them so. Decided by the Wednesday 12:00 and 13:00 self playtests. Ticket 09.
- Boss readability: whether the Bellkeeper's two attacks are learnable by an uncoached colleague. Decided by the Wednesday 19:00 session. Ticket 10.
- Audio direction: which specific loop and which SFX prompts, now that the theme exists (cold industrial shrine, bell, furnace). Waits on theme acceptance.
- The LLM-in-game stretch: only if both Wednesday gates pass; shape unknown. Ticket 07.
- Demo details: the demo start at the Gallery branch, which transcript moment, which intervention example. Ticket 08.

## Out of scope

- Vendor, currency, equipment menu, inventory: expansion after parry and the upward dash; designed, not built.
- Parry, wall jump, pogo, healing consumables: not in the launch commitment.
- Areas 2 and 3: paper designs only.
- Leaderboard, score, levels, difficulty select, phone or touch play, multiplayer, level editor, procedural level generation.
- Imported or generated 3D models or sprites: procedural geometry only.
- Deal Brief (Apex handoff page): product-owned decisions (v1 map).

## Retired path (v1 map, 2026-09-16 morning)

- Ambition axis: fixed-camera 2.5D arena survivor with an arcade-simple core; full 3D movement and deep 2D systems rejected on risk.
- [Dash as the attack](tickets/04-prototype-dash-as-attack.md): closed as superseded before the playtest.
- `m1-skeleton`: the arena survivor skeleton, built in about 35 minutes of agent time, verified, Codex-reviewed, snapshotted under `public/builds/m1-skeleton/`. Kept as build-story evidence. Row in `docs/milestones.md`.
