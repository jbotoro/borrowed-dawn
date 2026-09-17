# Visual upgrade plan and proposal history

Date: 2026-09-16. Current status: the human selected C, graphic near-monochrome, from the three in-engine looks. `docs/style-sheet.md` is the canonical art specification. The actor/environment benchmark is implemented but still awaits human approval. The illustrated hybrid below is an earlier proposal, not the selected pipeline.

## Resume here: selected C, benchmark approval next

- Preserve the current working tree: Claude's actors, procedural architecture/passages, graphic VFX, title/HUD/font, and wired audio are already present. Evidence from those interrupted slices is under `docs/evidence/actors/`, `docs/evidence/benchmark/`, and `docs/evidence/looks/`.
- Follow `docs/style-sheet.md`: procedural agent-built art, one licensed font exception, five-value ramp, amber for safety/rewards, vermilion for threats. Visuals and feel take priority over new rooms or combat work.
- Codex's continuation repairs platform/decor ownership and removes the redundant checkpoint diamond when an authored lamp represents the checkpoint. Verification and remaining issues are recorded in `docs/playtest.md` under the Codex benchmark continuation.
- Next human decision: play Cinder Landing and fill in the benchmark approval checklist in `docs/playtest.md`. Keep the chosen look; request one focused correction round if necessary. Room-wide approval has not been granted.
- Audio is integrated, not unwired. The listening checklist remains a human task. Preserve the existing four-room scope and simulation.

## Proposal history: accepted process and human references

The following records the earlier planning conversation. Subsequent selection and the canonical style sheet above supersede its open choices, next-deliverable language, and snapshot of implementation status.

The human asked Codex to prepare this plan while Claude was rate-limited, then explicitly accepted the three directions as good ideas for now and the proposed feedback loop. The human asked that this conversation be recorded so Claude can continue without repeating the planning discussion.

User-named references:

- **Paper Mario:** a game/art style the human would have named independently. No particular entry was specified by the human; the research note's Thousand-Year Door example was the agent's choice.
- **Hollow Knight:** an existing art and genre reference for the initial work, including the soulslike action direction. The earlier requirement for an original fiction remains: liking its craft and presentation does not select a bug kingdom or copied characters.
- **Limbo:** the human likes exceptionally well-executed monochromatic art. A broad palette or high surface-detail density is not a prerequisite for visual appeal.

Art-direction interpretation for the next concepts: explore Paper Mario's coherent material/shape language, Hollow Knight's silhouette and combat clarity, and Limbo's value separation and atmosphere. These are qualities to study, not an instruction to blend recognizable assets or to choose one game's style wholesale. The exact qualities the human prefers will be tested with the sheets.

Next deliverable: three comparable Belfry concept sheets, A/B/C below, with the same gameplay-scale layout and an implementation route for each. Include a deliberate monochrome or near-monochrome treatment within direction C, using shape and value to preserve threats and rewards. Distinguish concepts from engine captures. The human chooses the direction; then establish the canonical sheet and build one live benchmark before extending it across the area. The illustrated hybrid remains the agent's recommendation, not the human's selection.

Generated/sourced concept exploration is within the agreed process. Which external/generated assets ship in the game remains part of the direction choice; acceptance of the feedback loop does not choose an imported character pipeline. Keep the working game and uncommitted art/coherence/audio work intact while preparing options. Audio integration remains unfinished and follows the visual decision rather than replacing it as the immediate priority.

Continuation evidence: the earlier context pass inspected Landing, Gallery, and Belfry and ran 55 passing tests plus typecheck; this plan was grounded in refreshed source and primary-source research. Those checks preceded implementation of any visual upgrade. No new gate was passed here. Gate 2a is checked in the human playtest doc, but tester identity/build provenance is not filled in; exploration Gate 2b and the repaired transitions still need human validation.

## Target and decision

Aim for the visual coherence, character appeal, animation clarity, and presentation of a premium side-view handheld game within the existing four-room scope. Comparable commercial production fidelity throughout the game is an aspiration, not a two-day delivery estimate. The achievable commitment is one approved visual language, a strong playable benchmark, and consistent application to the launch area.

Keep Three.js and the working simulation. Recommend a hybrid illustrated 2.5D presentation: painted distant scenery and surface detail, sculpted procedural actors and playable architecture, controlled shading, and authored effects. Actor silhouettes must be redesigned alongside the environment. Adding attractive backgrounds around the existing figures is insufficient.

The user has invited generated/sourced options as part of planning. Runtime use of those assets would revise the current procedural-only restrictions in CLAUDE.md, the wayfinder map, and vision section 8. This proposal makes that change explicit; it does not silently rewrite the restrictions. Imported/generated 3D actors are not a dependency of the recommended route. If the human chooses a different asset policy or look, update the production route before implementation.

## Evidence from the present build

The previous context pass inspected the local Landing, Gallery, and Belfry. This planning pass re-read the current renderer, tuning, content, UI, and latest playtest feedback.

- The screenshots show very bright platform tops and furnace apertures against large dark fields. Depth exists, but background structure and material differences are often lost. The eye is drawn to emission before character or destination.
- The Courier is built from a cone coat, cylinder cap, box legs, sphere lantern, and box needle in src/render/playerMesh.ts. Improving light around those shapes will not alone create a distinctive protagonist.
- Platforms share box construction and pale rims; the new door frames and industrial props improve readability but need a common architectural design language and contextual supports.
- src/render/roomMesh.ts now contains doors, boilers, chains, furnaces, embers, and shafts. The missing ingredient is not simply more prop categories; it is deliberate placement, scale, material treatment, and hierarchy.
- Existing animation includes leg swings, squash/stretch, and weapon poses. New art must retain readable anticipation, active attacks, and recovery instead of obscuring the simulation with decorative motion.
- src/render/fx.ts reuses particle bursts for several distinct events. Those events need different shapes, timing, and emphasis.
- The UI uses system monospace type, generic gradients, and an always-mounted configurator that is hidden by screenshot mode. The normal player-facing presentation needs its own finishing pass.
- The latest Gate 2a note in docs/playtest.md says mechanics/difficulty seem fine and requests an art-production discussion before proceeding. Gate 2b remains unchecked. Art direction is the immediate decision; more boss tuning is not implied by the current feedback.
- The new audio implementation exists under src/audio/ but is not imported by src/main.ts at this inspection. Completion belongs in the presentation block after the visual benchmark establishes the mood.

These observations establish production priorities. They do not constitute a fresh full playtest or a performance diagnosis.

## Choose between three concrete directions

Generate three comparable concept sheets of the same Belfry encounter. Keep the camera, player size, boss placement, playable floor, door, and HUD positions fixed. Each sheet includes a gameplay-scale image, a small Courier/Bellkeeper silhouette study, and the same example attack effect. Label them concept targets, not engine screenshots.

| Direction | Visual promise | Production route | Main risk |
| --- | --- | --- | --- |
| A. Illustrated industrial fable (recommended) | Painted stone, oxidized metal, luminous amber glass, layered atmospheric architecture, expressive shapes | Painted background planes and a small texture family; redesigned procedural actors with simplified shading | Characters and paintings can look unrelated unless tested together immediately |
| B. Crafted miniature theatre | Carved stone, enamel, brass, rounded edges, tactile miniature machinery, theatrical lighting | Mostly procedural 3D, deliberate profiles/bevels, controlled materials and contact shadows | Can remain toy-like if character posing and composition are weak |
| C. Graphic animated adventure | Strong silhouettes, deliberate monochrome or near-monochrome values, atmospheric depth, sharp impact shapes | Simplified meshes/cutout silhouettes, limited shading bands, graphic VFX | Flatness and lost threat/reward separation can hurt depth and playability |

The fiction is provisionally retained: a municipal courier returning stored sunlight to people. Its current literal cone-and-cylinder execution is open to redesign. Choose one world with a clear material and shape vocabulary, not a mixture of the most impressive unrelated images.

## Human feedback loop

1. Model prepares the three sheets, explains how each would be built, and recommends one. The human picks a direction, names two elements to keep, and names one objection. "None" is a valid result. Budget one targeted revision round rather than indefinite rerolling.
2. Model produces the selected direction's canonical sheet: Courier front/side/attack poses, boss neutral/telegraph/recovery poses, platform/door/prop samples, palette, texture scale, lighting, HUD, and effects. This becomes the reference passed to every asset-generation and implementation task.
3. Model implements one representative playable section. Human compares the live result with the target, plays a short movement/combat loop, and approves it or identifies the largest mismatch. A good concept image alone does not authorize propagating the treatment to every room.
4. Model extends the accepted kit across all rooms and presents matched before/after captures plus a short playthrough. Human checks consistency, reading of exits/rewards, combat clarity, and the emotional payoff.

Expected human time: roughly 20-30 minutes across the decisions and play checks, plus optional asynchronous notes. This is an estimate, not a gate. If the human is unavailable, prepare options and technical work that does not presume an unanswered aesthetic choice. Keep original prompts, selected assets, rejected variants, and reasons as build-story evidence.

One lead agent owns the visual specification. Supporting agents can build bounded assets or rendering components against it; they do not independently choose palettes, silhouettes, shaders, or typography.

## Asset production and consistency

| Asset family | Proposed source | Initial cap and acceptance |
| --- | --- | --- |
| Courier | Generated design reference; code-built profile and articulated parts | One design. Must read at actual gameplay size in idle, run, jump, dash, side/up/down strike, hurt, and death |
| Bellkeeper | Same reference family; procedural articulated shell, furnace, arm | One design. Both telegraphs and recovery poses clear without effects |
| Guard and stomper | Reuse actor material family and mechanical motifs | Two designs; share construction language but have distinct silhouettes |
| Architecture | One modular procedural kit with selected painted/created surface treatment | About 8-12 reusable pieces: platform/cap/support, pier/arch, doorway, chain bracket, furnace/pipe/grate, checkpoint |
| Backgrounds | Generated or sourced images following the selected sheet | Two master compositions, with a few separate depth layers; derive four room treatments instead of four unrelated paintings |
| Materials | Small authored/generated family; a coherent licensed source set only if it matches | Rough stone, dark metal, worn brass/enamel, glass; modest detail visible at play scale |
| Effects | Code-driven shapes/particles, optionally an approved small alpha atlas | One shared family for trails, impacts, smoke, dust, heat, and rewards |
| UI | Code/CSS/vector drawing plus a licensed font family if required | One icon and border language. Real text for labels and title |
| Audio | Existing procedural layer plus curated replacements where valuable | One coherent ambient/boss treatment and a small matching effects set |

Generate distant architecture without characters, UI, or fake walkable foreground platforms. Request separate layers with compatible perspective, illumination, and coverage beyond the camera bounds. Do not assume that separating one flattened image into clean parallax layers is free. Avoid prominent readable signs baked into generated art; render story text separately.

Each shipped image needs a declared role, dimensions, scale, anchor/crop, transparency treatment, and source or generation record. Tileable textures need seam checks; cutouts need edge checks against both light and dark backgrounds. Use the accepted image as a reference for variants, rather than relying on a repeated prose prompt alone. Localize, optimize, and test approved runtime assets instead of depending on remote asset URLs during the demo.

Sourcing is selective: one compatible kit or material family, not a grab bag of marketplace styles. Record the asset-specific license before incorporation. Research/catalog browsing does not imply purchase permission. Store provenance in the existing docs/research area or an asset manifest. The project remains agent-built with human art direction; disclose the use of generated/sourced art in the build story if adopted.

Full generated frame-by-frame character animation or a new imported rig is a contingency, not the critical path. A single attractive pose does not establish consistent run/attack/death frames. If a character alternative is needed, first prove idle, run, and attack at play size within a short spike; stop if alignment or identity drifts.

## What changes on screen

### Composition, environment, and lighting

- Establish a focal hierarchy: Courier and active threat, next actionable destination, major architectural landmark, then atmosphere. Raise useful middle values so the world survives an ordinary laptop screen.
- Replace uniform white slabs with shaped ledges, integrated supports, edge wear, and material breaks while keeping the collision surface unmistakable. Decorative damage must not imply holes where the player can actually stand.
- Build three depth roles: far architectural silhouette, quieter midground machinery, sharp playable foreground. Parallax should agree with the side camera; foreground detail stays outside combat sightlines.
- Give each room an authored composition using the same kit: Landing offers shelter and a view of the destination; Gallery uses chains and heat conduits to lead onward; Cache becomes a quiet amber pocket; Belfry opens into scale and negative space around the boss.
- Use cool ambient structure and contained warm light. Furnace apertures retain shape; bloom has a small supporting role. Evaluate contacts, edge shading, and subtle material gradients before adding more lights or expensive postprocessing.
- Choose the final shading treatment in the benchmark. Apply it consistently to actors, platforms, and props. Three.js supports the required image/material techniques; implementation notes and primary sources are in docs/research/visual-production-options.md.

### Characters and motion

- Redesign the Courier around a memorable coat/cap/lantern silhouette with visible hands or a credible weapon attachment, grounded feet, controlled asymmetry, and distinct cloth/metal/glass surfaces. Keep collision size stable during visual exploration.
- Animate intention: anticipation, weight transfer, a clear contact pose, and recovery. Add restrained mantle/lantern follow-through and foot contact. Avoid continuous bobbing that reads as floating.
- Give enemies visibly different mechanical jobs. The Bellkeeper should look heavy in stillness, wound up before a sweep, compressed before a stomp, and vulnerable in recovery.
- Test every pose at normal zoom, including against the brightest and darkest backgrounds. Preserve attack and hazard truth; changing animation length must not silently change combat timing.

### VFX and camera

- Attack: a concise directional arc; impact: a sharp shape, sparks, brief flash, and a weighted reaction. Distinguish a miss from a confirmed hit.
- Dash: a pressure plume and a short controlled trail. Keep the Courier's silhouette visible.
- Stomp: anticipation at the actual threatened area, contact dust, then readable travelling waves. Decorative red furnace light must not compete with hazard signals.
- Pickup/checkpoint: contained warm lift and a distinct icon/banner response. Phase change: mechanical separation and a changed pose, not just a brighter flash.
- Death/retry: brief, readable, and compatible with the accepted fast respawn. Victory: the machinery visibly warms or relights, establishing that the player's action changed the world.
- Make hit emphasis consistent through pose, sound, and restrained camera impulse. Prototype hitstop only if it improves play; any simulation/loop change requires behavioral verification and must preserve input handling and determinism.
- Retain the side-view camera and improve framing/look-ahead as needed through playtesting. Boss staging must show both the threat and safe space. Test wide and narrow desktop aspect ratios; do not judge only a poster crop.

### Presentation and sound

- Build the title composition from the actual world and selected graphic language. Settle whether the visible title remains One More Run or becomes Borrowed Dawn as part of the direction choice.
- Carry the same type, border, icon, and material language into health, dash readiness, boss status, pause, room names, pickups, death, and victory. Keep instructions concise and legible.
- Put the tuning UI behind an explicit developer control in normal play; preserve the configurator workflow and screenshot/autoplay behavior.
- Integrate the existing audio layer, then audition it with the human. Match material sounds and the relative intensity of exploration, boss approach, impacts, and victory. Audio quality is not established by source inspection or screenshots.

## Execution budget and gates

Planning estimate: 16 focused production hours, including integration and verification. Reconcile this with actual time remaining and reserve Friday for rehearsal. Work already completed is reusable, but unverified work is not counted as a passed gate.

| Block | Budget | Concrete output and exit gate |
| --- | --- | --- |
| 1. Direction | 1 hour | Three comparable targets, one selected direction, asset policy and concise style sheet |
| 2. Playable benchmark | 3 hours | One camera-scale section with Courier, enemy/boss poses, platforms, doorway, background, lighting, HUD, and one complete hit/dash effect; human approves the live result |
| 3. Shared kit and room pass | 4 hours | Same treatment across all four rooms; strongest staging at opening and boss; exits and Cache readable |
| 4. Actors and combat finish | 3 hours | Courier/enemies/boss motion and telegraphs, distinct effects, phase/death/reward treatment; no timing regressions |
| 5. Presentation and payoff | 2 hours | Title/HUD/pause/room transitions, audio integration and audition, shrine relight |
| 6. Acceptance and capture | 3 hours | Full-route checks, performance and loading checks, human exploration test, review, evidence and deployment handoff |

The benchmark block creates representative samples; later blocks finish the complete state/room coverage. Do not spend the entire actor budget on the Courier and leave the boss in the old style.

If the benchmark is not convincing after its budget, do one focused correction or select the simpler approved direction. Do not blanket the game with an unproven treatment. If fewer than ten hours remain, reserve at least two for verification and prioritize the shared palette/material/character treatment across all rooms, then the opening and boss compositions, basic UI, essential effects/audio, and payoff. Cut unique background variants, extra prop detail, decorative animation, and advanced shaders first. Do not cut threat visibility or room consistency.

No new area, engine migration, new combat verb, or general-purpose art editor is required. Put newly implemented gameplay/feel values in src/tuning.ts; the schedule and asset counts here are production estimates, not runtime defaults.

## Acceptance: what earns the word polished

- At normal gameplay scale, the Courier, enemy, next ledge, and active threat can be identified immediately without UI help. Repeat the check in grayscale and on an ordinary laptop display.
- A normal screenshot from each room belongs to the same game. No actor, effect, icon, or prop appears to come from a different visual family.
- Run, jump, dash, and every attack have complete readable motion, with clear floor contact and no obvious snapping or mismatched hit location.
- Alpha edges, texture tiling, camera-boundary gaps, z-fighting, clipped glows, and depth sorting are checked in motion. Examine both a small desktop viewport and the presentation resolution.
- Set a performance baseline on the presentation machine before the pass. Target stable 60 fps there, inspect worst-case combat/frame-time spikes and repeated room entry for memory growth, and record the tested conditions. Quality settings or simpler effects are available if the target is missed. This is not a hardware compatibility promise.
- Test cold loading of the actual deployment, missing/failed assets, and audio unlock. Assets must not leave a blank title or permanently block starting.
- Run title to boss payoff and death/shortcut recovery, with and without Longwick; retest the outstanding room-transition and Exploration Gate 2b observations with the human. Check mute, pause, autoplay, and screenshot modes.
- Capture consistent before/after screenshots and a short motion clip. Generated targets and implementation captures are labelled separately. Claims of improvement cite the running result and human response.

## Proposed first implementation handoff

Start with target generation and human selection. Then build the approved benchmark through src/render/playerMesh.ts, enemyMesh.ts or bossMesh.ts, roomMesh.ts, world.ts, postfx.ts, src/content/rooms.ts, src/tuning.ts, and the relevant UI files. Keep visual data separate from simulation state, and keep Three.js imports in the established locations. Add only the asset loading/presentation support that the benchmark actually needs.

After the look and permitted asset types are selected, reconcile the active art constraints, vision, ticket 05, and wayfinder pointers. Record the new direction and evidence in the lifecycle record and build story. Current proposal files do not mark any gameplay or visual gate complete.
