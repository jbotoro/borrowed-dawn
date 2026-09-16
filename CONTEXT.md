# One More Run: domain glossary

Working title. A fixed-camera 2.5D arena survivor built for the Provide Hackathon, September 2026. This file is the glossary only; decisions live in the wayfinder map and the platform repo's context doc.

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
