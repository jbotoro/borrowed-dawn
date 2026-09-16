# One More Run: domain glossary

Working title. A fixed-camera 2.5D arena survivor built for the Provide Hackathon, September 2026. This file is the glossary only; decisions live in the wayfinder map and the lifecycle record at `.claude/plans/hackathon-2026-context.md`.

## Terms

- **Run**: one play from pressing start to the loss state. Score is measured per run.
- **Arena**: the single bounded playfield. There is exactly one.
- **Wave**: a timed change in enemy spawn rate, mix, or speed. Waves are a schedule, not levels; the player never chooses one.
- **Dash**: the player's one active ability: a short burst of movement with a cooldown and brief invulnerability.
- **Score**: survival time in seconds, displayed as the run's result. Kills may count toward a secondary figure but survival time is the score.
- **Best score**: the highest score on this browser, remembered across runs.
- **Loss state**: the moment the player's health reaches zero; the run ends and the score screen shows.
- **Juice**: feedback effects with no gameplay meaning: hit flash, screen shake, hitstop, particles, sound layering.
- **First fun**: the milestone where a playtester who dies wants to restart immediately without being asked.
- **Juiced**: the milestone where every player action and every enemy death has visible and audible feedback.
- **Milestone build**: a deployed, playable URL frozen at a named milestone (skeleton, first fun, juiced, final).
- **Intervention**: any code edit made by a human rather than an agent. Every intervention is logged with what, why, and whether an agent tried first.
- **Configurator**: the in-game tuning panel that exposes every gameplay number live.
- **Agent**: an AI coding agent (Claude Code or Codex). Never a person. When a person is meant, say "the human" or "the player".

## Fiction terms (working, from `docs/vision.md`; provisional until the first visual gate)

- **Borrowed Dawn**: the working fiction. Daylight is a public resource sealed inside machines that still follow an old emergency order.
- **The Courier**: the player, a municipal lantern courier. Silhouette: dark cone coat, pale cap, two short legs, amber lantern chamber, one thin needle.
- **Delivery lantern**: the amber chamber on the Courier's chest; its light is the player's presence in the dark.
- **Wick needle**: the Courier's weapon, a lamp-maintenance tool. Directional strikes: side, up, down.
- **Pressure mantle**: the coat whose stored heat powers the dash.
- **Longwick**: the optional reach upgrade found in the Wick Cache. Reach grows; damage does not.
- **Dawn Core**: the Bellkeeper's reward. Relights the shrine; in the extended world it powers the parry (Mirror Cuff).
- **Cinder Belfry**: area 1, the network's ignition station. Rooms: Cinder Landing (safe start, checkpoint, boss visible through the sealed gate), Chain Gallery (traversal, two fights, the branch), Wick Cache (optional reward room), Belfry (boss arena, shortcut).
- **Cinder Guard**: box torso, plate cap, slit visor, short blade; patrols, telegraphs, lunges, rests. Three hits.
- **Boiler Stomper**: faceted sphere on block feet; hops, lands, sends floor waves outward. Two hits.
- **The Bellkeeper**: the area 1 boss, a bell shell over a furnace with a striking arm. Clapper sweep and furnace stomp; cracks open at half health. Twenty-four hits.
- **Ember rekindled**: the checkpoint. Touching it heals and sets the respawn point.
- **Telegraph**: the visible commitment before any damaging action. Every attack has one; the danger color is vermilion, safety is amber.
- **Gate**: a sealed passage that opens permanently when its condition is met (boss approach, boss defeated).
- **Shortcut**: the gate from the Belfry approach back to Cinder Landing. Death never demands another Gallery fight before a boss retry.
