# 04 Prototype: is dash-as-attack the core loop?

Label: wayfinder:prototype (HITL)
Blocked by: 01
Claimed by: none
Status: open
Window: Wednesday, inside the skeleton block, decided by 14:00

## Question

The code plan's design call is one verb: dashing through enemies kills them and grants brief invulnerability, touching them otherwise costs health. Does that alone produce a repeatable survival challenge, or does the game need an auto-fire weapon with dash as the escape?

## How it resolves

Play the skeleton with the configurator open. Try dash cooldown, dash length, i-frame length, enemy speed, and spawn pressure across at least three self sessions. The answer is the Wednesday 14:00 decision: keep dash-only, or add auto-fire. Record the chosen numbers in `src/tuning.ts` defaults and the reasoning here.
