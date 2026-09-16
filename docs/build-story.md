# Build story: how this game was made

The point of this document: a start-to-finish record of directing AI coding agents to make a game with minimal human guidance. It is the source for the demo's build-story segment. It is append-only and dated. Agents write it; the human's prompts are quoted or closely paraphrased so the amount of guidance is visible.

## Roles

- Human: chooses the destination, answers design questions, playtests, tags milestones, owns git and GitHub. Has not edited code (see `docs/interventions.md`).
- Fable (Claude Fable 5.1, the main session): design calls, architecture, the code contract, agent orchestration, verification, the records.
- Astra (GPT-6 Astra through the Codex CLI): high-level planning, story and art direction, schedules, gates, cut tables, storyboards.
- Opus (Claude Opus subagents): implementation of planned slices, each on its own directory against a contract.
- Haiku (Claude Haiku subagents): research, file reading, log reading.
- Sol (Codex review): second-opinion code review before every milestone tag, every finding verified by Fable before it counts.
- Agent eyes: a Chrome DevTools MCP server that lets agents load the running game, take screenshots, read the console, and drive input. Rule: no visual or feel claim without looking.

## Timeline

### 2026-09-15 (evening): proposals, not a plan

Human framing: about three days for a hackathon project, work-related or pure fun, high quality and a bit compelling. Astra ranked five candidates; the top pick was a work feature (Deal Brief). A feasibility pass found it feasible; the human then rejected it with a rule that shaped everything after: the project must not need product or UX decisions the builder does not own. "One More Run", a fully agent-built game, was chosen. The human challenged a 2D arcade game as too solved for current models; research settled on a fixed-camera 2.5D 3D presentation in Three.js with procedural geometry.

### 2026-09-16 09:00-09:30: eyes, rules, a contract

A session opened from the game repo confirmed the agent could see the game (screenshot and console of the boot scene). The platform repo's agent rules, skills, and guardrails were mirrored in via symlinks. Fable wrote the simulation contract as a TypeScript file and extended the tuning table. Two Opus agents were launched in parallel: pure simulation with tests, and renderer plus UI plus a scripted bot.

### 2026-09-16 09:30-10:00: an arena survivor in 35 minutes

Both agents landed. Fable verified independently: 50 tests passing, typecheck clean, the bot playing a full loop (title, play, death at 52.8 s, restart) with a clean console, screenshots showing a tilted fixed camera over a gridded arena, enemies converging on a glowing player. Codex review returned seven findings; all seven were confirmed against the code and fixed, including a 60 Hz dash overshoot the tests had not caught. Snapshot: `builds/m1-skeleton/`.

Human prompts in this window, in full: the opening instruction (read three docs, confirm the screenshot, start the skeleton block, and apply the platform repo's rules here), then "move the lifecycle record into this repo, since this is not a platform project".

### 2026-09-16 10:05-10:20: the pivot

Human, on seeing the skeleton: a colleague shipped a survivor clone last year; a polished version would seem old hat; consider a platformer, a Hollow Knight type game, a TRPG, or a twist. Fable assessed the four against novelty, buildability in the hours left, a 60-second live payoff, the 3D read, and reuse, and recommended a single-boss duel with dash as the only verb. The human overruled on two points: a multi-verb kit (jump, dash, attack, parry as the vision) and no score, with exploration, bosses, and loot as the philosophy; one boss built under a broader world vision; few enemies; document everything, then pivot; Astra for story and art direction, Fable for code.

The retired skeleton became evidence: the path not taken, built and verified in about 35 minutes.

### 2026-09-16 10:20-11:05: re-planning

Astra produced the v2 plan in one pass: "Borrowed Dawn" (a lantern courier stealing sunrise from light-hoarding machines), a three-area world with one area built, four rooms, a launch kit of move, jump, attack, dash, one reach upgrade, checkpoint rules, gates, a cut table, and a storyboard. Fable redrew the map, rewrote the code plan for side-view 2.5D, wrote a new contract and tuning table, and launched three Opus agents: simulation and tests, renderer and effects, rooms and UI and bot and wiring.

Human guidance in this window: five short answers (genre is the certainty, the fiction must not copy Hollow Knight's; a vision doc for continuity; an async playtest doc; a shareable test link; and this document).

### 2026-09-16 11:05-12:20: a side-view game in 75 minutes

Three Opus agents built in parallel against a contract Fable wrote first: the simulation with 53 tests, the renderer with a lantern courier and a bell-shelled boss, and the four rooms as data plus UI, input, and a waypoint bot. Astra wrote the world bible in the same window. The content agent found and fixed two integration bugs of its own (input edges dropped on frames where the fixed step did not run; pause could not be exited) and reported a third in the simulation, a sideways teleport on ceiling grazes, which Fable traced to floating-point contact after vertical resolution and fixed with an epsilon and two regression tests. The bot walks the whole area, opens the shortcut, fights the Bellkeeper, dies, respawns, and loops. Fable's own first screenshot showed a real side-view world with depth, and two readability problems: the courier's coat vanished against the dark pillars, and the camera was too far. The camera number changed in tuning; the coat went back to the render agent with the screenshot's facts.

Human guidance in this window: none. The human was reading the vision doc.

### 2026-09-16 12:20-12:35: the look, fixed from screenshots

The render agent re-read its own work through the browser and fixed the four reported readability problems plus five it found itself, including z-fighting stripes on every platform and a boss shell washed red by its own furnace light. One intermediate attempt overshot (the coat went as pale as the hood) and the screenshot caught it, which is why the final numbers landed where they did. Every change is a tuning value, so the human can undo any of it in the panel.

Human guidance in this window: one request, to pause at the next opportunity and organize the work into commits for a clear GitHub history.

### 2026-09-16 12:40-13:10: pushed, deployed, reviewed, gated

The human pushed four commits. CI deployed the side-view game to the root URL with the retired arena still playable at its own path. Fable checked the deployed build through the browser: the bot ran, died, respawned, and looped on the live site. Codex reviewed the skeleton commit and returned six findings. Fable confirmed five against the code and fixed them: edge inputs replayed into every tick of a multi-tick frame (Escape paused and resumed in one frame), the Belfry's Gallery door sat in the walking path to the shortcut (moved onto a ledge with a step), stomp waves fired before the boss touched the floor, a lethal hit could be overwritten by a pickup or checkpoint in the same tick, and the hazard capacity was hard-coded in two files. The sixth, a scaling complaint about 2,000 enemies, was rejected: rooms hold three; the number came from a stale line in the review focus that the arena left behind, now corrected. The bot then deadlocked on the new ledge, which took one extra waypoint to fix, and the shortcut was verified by driving the player by hand. Snapshot: `builds/m2-skeleton/`.

Human guidance in this window: "pushed, run the codex review and prep the m2 gate".

## Human guidance, counted

| When | What the human said or decided | Words, roughly |
| --- | --- | --- |
| 2026-09-15 | Framing, constraints, candidate rejection rule, game chosen, "2D is too solved" | a few hundred, across a planning evening |
| 2026-09-16 09:14 | Opening instruction for the build session | about 250 |
| 2026-09-16 09:45 | Move the lifecycle record here | about 60 |
| 2026-09-16 10:05 | The pivot question with four genre options and the coworker's project | about 150 |
| 2026-09-16 10:15 | Seven answers to the pivot round | about 200 |
| 2026-09-16 11:10 | Five answers to the destination round | about 200 |

Manual code edits by the human: 0 (as of 2026-09-16 11:10).

## Agent design calls worth showing

- Dash as the only verb and the attack (Fable, arena skeleton): overruled by the human at the pivot. Consequence: the multi-verb kit that defines the new game.
- Contact with an enemy destroys that enemy as well as costing health (Fable, arena contract): prevented a hit repeating every frame. Retired with the arena.
- Lowering the player's emissive from 2.2 to 1.1 (Opus render agent, unprompted): bloom had erased the octahedron silhouette. Kept.
- Nine full 60 Hz steps make a 140 ms dash travel 6.43 units, not 6 (Codex finding, confirmed and fixed by Fable, with a test at the real timestep).
- The single-boss duel recommendation (Fable): rejected in favor of a broader kit. The reasoning is preserved in the lifecycle record.
- Latching input edges until a simulation step consumes them (Opus content agent, unprompted): the fixed-timestep loop runs zero steps on some frames, so a jump pressed on such a frame was lost. Found by watching the bot fail to jump at low time scales.
- Withholding the Dawn Core until the boss is defeated (Opus simulation agent, unprompted): otherwise the reward sat collectable in the arena before the fight.
- Moving the cache shaft out of the bot's jump arc and widening the dash gap from 5.0 to 4.3 units (Opus content agent): the math said a 5-unit gap needs a dash at the jump apex, which a new player would not find.

## Transcript moments to save

Bookmarked for `docs/transcripts/` (redacted exports), chosen Thursday:

- The pivot exchange (10:05-10:20): the human's question, Fable's assessment, the human's overrule.
- The Codex dash-overshoot finding and its verification.
- Agent B's unprompted emissive retune with its screenshot reasoning.
