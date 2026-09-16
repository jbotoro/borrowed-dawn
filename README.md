# One More Run

A fixed-camera 2.5D arena survivor in Three.js, built for the Provide hackathon (September 16 to 18, 2026) by directing AI coding agents. Working title.

## Run it

```
npm install
npm run dev        # http://localhost:5173/one-more-run/
npm run typecheck
npm test
npm run build
npm run snapshot -- m1-skeleton   # freezes a milestone build under public/builds/<tag>/
```

Debug query params: `?autoplay=1&seed=42` (scripted run for agents), `?screenshot=1` (hide HUD and tuning panel), `?fast=4` (time scale).

## Where things are

- `CONTEXT.md`: glossary. Use these words.
- `docs/wayfinder-map.md`: destination, decisions, fog, out of scope. `docs/tickets/`: open decisions.
- `docs/plan-astra.md`: the half-day schedule, gates, cut table, storyboard.
- `docs/research/`: pinned versions, API shapes, audio sourcing.
- `docs/interventions.md`: every human code edit. `docs/milestones.md`: gate evidence.
- `src/tuning.ts`: every gameplay and feel number. The in-game panel edits it live and saves overrides to localStorage.

The lifecycle record (plan evolution, decisions, learnings) lives in the platform repo at `.claude/plans/hackathon-2026-context.md`.
