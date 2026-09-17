# Wayfinder map: One More Run (v2, redrawn 2026-09-16 10:20)

Label: wayfinder:map. Tracker: this file plus `docs/tickets/`. Lifecycle record: `.claude/plans/hackathon-2026-context.md` in this repo (git-ignored because it carries platform-internal notes). The v1 map (fixed-camera arena survivor) is superseded; its decisions are kept below under "Retired path".

## Destination

A playable, deployed Hollow Knight-adjacent side-view action game in Three.js, presented live at midday Friday 2026-09-18 with a build story (milestone URLs, intervention log, transcript moments, and the retired arena-survivor skeleton as the path not taken). Philosophy: intrigue via exploration, difficulty via bosses, rewards via loot. Done means: title, one four-room area (Cinder Landing, Chain Gallery, Wick Cache, Belfry), a checkpoint, three placed enemies, one two-phase boss (the Bellkeeper), one reach upgrade found by exploring (the Longwick), the boss payoff (the Dawn Core), instant respawn, pause, music and SFX, and it reads as a 3D side-view game in the first three seconds. Verbs at launch: move, jump, directional attack, dash with i-frames. No score. Full plan: `docs/plan-astra-v2.md`.

Direction (Astra, provisional until the user accepts): "Borrowed Dawn". Hook: "Steal the sunrise from the machines that hoard it." The player is a lantern courier; the world sealed its dying sun inside machines that still guard it. Two further areas are designed on paper only (Glass Orchard, Ash Observatory).

Current priority (2026-09-16, Codex handoff): [visual upgrade plan](visual-upgrade-plan.md), section "Resume here". The human accepted three candidate directions and the concept-selection -> canonical sheet -> playable benchmark -> room-wide production loop. References: Paper Mario, Hollow Knight, and well-executed monochrome such as Limbo. Next: produce the three comparable concept sheets. Final style and shipped asset policy remain open; no sheets have been generated yet.

## Notes

- Vibecoded means directed: agents write the code, the human prompts, playtests, directs; every manual edit is logged in `docs/interventions.md`.
- Stack is fixed: Three.js, TypeScript, Vite. The current runtime uses procedural low-poly geometry; the visual-upgrade process can explore generated/sourced concepts, with shipped asset policy to be settled alongside the selected direction. Presentation is side-view 2.5D: gameplay on the XY plane, rendered in 3D with depth layers, fog, and bloom. Renderer decisions are in the code plan (lifecycle record, "Code plan v2").
- Skills every session consults: `grilling` for any design call, `prototype` for feel questions, `research` for stack facts. Agents must look at the game before claiming a visual or feel change works: with the dev server running, use the Chrome DevTools MCP tools `navigate_page` to `http://localhost:5173/one-more-run/?autoplay=1&seed=42`, `take_screenshot`, `list_console_messages`, and `evaluate_script`; `press_key` drives input (hold keys from `evaluate_script` when a tap is too short). Add `&screenshot=1` to hide the HUD and configurator; `&room=<id>` starts in a room; `&start=demo` is the demo start.
- Playtest before tuning. Numbers change through the configurator, then get written back to the tuning defaults.
- Model routing: design calls on Fable, high-level and story planning on Astra, implementation on Opus, screenshots and log reading on Haiku, Codex review before each milestone tag. Rules, skills, commands, and guardrails are the platform repo's, symlinked in (see `CLAUDE.md`).
- Every fight matters: enemies are few and placed by hand. Never a swarm.
- The genre is the certainty; the fiction is not. The human explicitly likes Hollow Knight as an art/genre reference; preserve original characters and fiction (no copied bug kingdom, nail-and-soul vocabulary, or default void mythology). Human visual references and their proposed application are recorded in `docs/visual-upgrade-plan.md`; the vision doc holds the world fiction.
- The human playtests asynchronously through `docs/playtest.md` (checklists per gate plus a session log); agents read it before every slice and gate. The build story is kept in `docs/build-story.md` with the human's guidance counted; it is part of the deliverable.

## Decisions so far

- [Setup: repo, deploy pipeline, agent eyes](tickets/01-setup-repo-deploy-mcp.md): repo public, Pages live, Chrome DevTools MCP confirmed from a session in this directory.
- [Stack versions and API shapes](tickets/02-research-stack-versions.md): three 0.186 with WebGL EffectComposer bloom, Vite 8 on Pages with `base`, milestone builds under `public/builds/<tag>/`.
- [Audio sourcing](tickets/03-research-audio-sourcing.md): CC0 loop from OpenGameArt, generated SFX from ElevenLabs free tier, Kenney backup, procedural WebAudio fallback, first-gesture unlock.
- [Destination redrawn](../.claude/plans/hackathon-2026-context.md): the arena survivor is retired after `m1-skeleton` because a colleague shipped a survivor clone last year; the new destination is above. Seven user answers recorded in the lifecycle record's Decisions.
- [High-level plan v2](plan-astra-v2.md): Astra's phases, gates, cut table, storyboard, and the "Borrowed Dawn" direction, accepted provisionally.
- [Vision doc](vision.md): the world bible (Astra, 2026-09-16 11:30). Four areas (Cinder Belfry built; Glass Orchard, Rainworks, Ash Observatory on paper), each with two enemies, one boss, one reward, one traversal gate; expansion order parry, Orchard, Rainworks, equipment and vendor, Observatory and ending; fit checklist. Fiction terms folded into `CONTEXT.md`.
- [Testers](tickets/06-task-book-testers.md): async through `docs/playtest.md` and the shared link; no fixed sessions.
- [Verb feel](tickets/09-prototype-verb-feel.md): jump, attack, dash, and the enemy fight accepted at the tuning defaults (Gate 1, 2026-09-16 13:20).
- [m2-skeleton gate](milestones.md): 12 of 13 by hand; room transitions failed (unsignposted exits, broken spatial continuity); corrective art/coherence changes exist in the working tree, with human retesting pending. Art and mood promoted to equal priority with first fun on the human's direction (ticket 05).
- [Visual upgrade process](visual-upgrade-plan.md): human accepted the three candidate directions and selection loop after the Codex planning session. Primary-source production research is in `docs/research/visual-production-options.md`.
- [Look C selected](style-sheet.md): graphic near-monochrome, chosen from three in-engine looks on the same Belfry frame (`docs/evidence/looks/`). Standing rules: visuals and feel first; passages not frames; rooms as places with motivated traversal; procedural, agent-built assets only. Ticket 05 tracks the benchmark approval.

## Not yet specified

- Art execution: look C selected (2026-09-16 14:05), sheet in `docs/style-sheet.md`, asset policy procedural and agent-built. Open: human approval of the Cinder Landing benchmark, then the Belfry, Gallery, and Cache under the same kit. Ticket 05.
- Boss gate evidence: Gate 2a is checked in `docs/playtest.md`; build/tester provenance and ticket 10 resolution still need reconciliation. Gate 2b exploration remains unchecked. Fixed colleague sessions were replaced by async testing (ticket 06).
- Audio direction: which specific loop and which SFX prompts, now that the theme exists (cold industrial shrine, bell, furnace). Waits on theme acceptance.
- The LLM-in-game stretch: only if both Wednesday gates pass; shape unknown. Ticket 07.
- Demo details: the demo start at the Gallery branch, which transcript moment, which intervention example. Ticket 08.

## Out of scope

- Vendor, currency, equipment menu, inventory: expansion after parry and the upward dash; designed, not built.
- Parry, wall jump, pogo, healing consumables: not in the launch commitment.
- Areas 2 and 3: paper designs only.
- Leaderboard, score, levels, difficulty select, phone or touch play, multiplayer, level editor, procedural level generation.
- Imported or generated runtime models/sprites remain outside the current baseline; the visual-upgrade process explores asset-policy changes explicitly. Generated/sourced concept sheets are part of the accepted selection loop.
- Deal Brief (Apex handoff page): product-owned decisions (v1 map).

## Retired path (v1 map, 2026-09-16 morning)

- Ambition axis: fixed-camera 2.5D arena survivor with an arcade-simple core; full 3D movement and deep 2D systems rejected on risk.
- [Dash as the attack](tickets/04-prototype-dash-as-attack.md): closed as superseded before the playtest.
- `m1-skeleton`: the arena survivor skeleton, built in about 35 minutes of agent time, verified, Codex-reviewed, snapshotted under `public/builds/m1-skeleton/`. Kept as build-story evidence. Row in `docs/milestones.md`.
