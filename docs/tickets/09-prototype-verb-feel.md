# 09 Prototype: do move, jump, attack, and dash feel right together?

Label: wayfinder:prototype (HITL)
Blocked by: the side-view skeleton slice landing (agents A, B, C)
Claimed by: human, 2026-09-16 13:20
Status: closed 2026-09-16 13:20

## Resolution

Gate 1 played by hand on the deployed `m2-skeleton` build: jump height and hang, landing, attack windup and reach, dash as escape and commitment, and the enemy encounter all ticked at the tuning defaults; no numbers were changed. The defaults stand as the first-fun baseline: walk 8, jump velocity 14.5 with gravity 42 (about 2.5 units of height), coyote 100 ms, buffer 120 ms, dash 4.5 units over 150 ms with a 500 ms cooldown, attack 60/90/160 ms with reach 1.6. Astra's first cut (broad platforms, shallow elevation) was not triggered. Revisit only if the boss session (ticket 10) exposes a verb problem.
Window: Wednesday 12:00 (movement and landing) and 13:00 (combat and death loop)

## Question

The riskiest assumption of the skeleton block is that the arena foundation supports readable platform traversal quickly. With the tuning panel open: does the jump have the right height, hang, and cut; does landing read; does the attack have a windup and reach that make positioning matter; does the dash feel like an escape and a commitment at once; does the camera keep the landing surface and the threat in frame?

## How it resolves

Two ten-minute self sessions of short runs through Landing and Gallery against the guard and the boss proxy. Record run length, death cause, the confusing moment, and the desire to retry. One hypothesis, one or two values, three runs, keep or revert. The chosen numbers are written back to `src/tuning.ts` and the reasoning goes here. A fail at 12:15 triggers Astra's first cut (broad platforms, shallow elevation, static geometry).

## Resolution

Recorded here when decided.
