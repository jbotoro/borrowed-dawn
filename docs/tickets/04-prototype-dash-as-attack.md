# 04 Prototype: is dash-as-attack the core loop?

Label: wayfinder:prototype (HITL)
Blocked by: 01
Claimed by: agent for the skeleton (2026-09-16 09:30), human for the playtest
Status: closed 2026-09-16 10:20, superseded. The destination was redrawn before the playtest: the arena survivor is retired in favor of a Hollow Knight-adjacent side-view action game with a multi-verb kit (attack, dash, jump; parry as stretch) and no score. The skeleton that would have answered this question is frozen as `m1-skeleton`. The dash-with-i-frames simulation and its tests carry over to the new game; the "dash is the attack" question does not.

## Playtest notes (human fills in)

Play at `http://localhost:5173/one-more-run/`: WASD or arrows move, Space dashes, Enter starts and restarts. The tuning panel is top right; changes apply live and persist in this browser until "reset saved overrides". The skeleton's rules: contact costs 1 of 3 health and destroys the touching enemy; a dash kills everything within `dash.hitRadius` and grants `dash.invulnerableMs`; waves spawn nothing for `waves.graceSeconds`, then ramp spawn rate and speed. Record per session: build, run length, death cause, dash usefulness, confusing moment, blocker, desire to retry. Then one hypothesis, one or two values, three runs, keep or revert.
Window: Wednesday, inside the skeleton block, decided by 14:00

## Question

The code plan's design call is one verb: dashing through enemies kills them and grants brief invulnerability, touching them otherwise costs health. Does that alone produce a repeatable survival challenge, or does the game need an auto-fire weapon with dash as the escape?

## How it resolves

Play the skeleton with the configurator open. Try dash cooldown, dash length, i-frame length, enemy speed, and spawn pressure across at least three self sessions. The answer is the Wednesday 14:00 decision: keep dash-only, or add auto-fire. Record the chosen numbers in `src/tuning.ts` defaults and the reasoning here.
