# 09 Prototype: do move, jump, attack, and dash feel right together?

Label: wayfinder:prototype (HITL)
Blocked by: the side-view skeleton slice landing (agents A, B, C)
Claimed by: none
Status: open
Window: Wednesday 12:00 (movement and landing) and 13:00 (combat and death loop)

## Question

The riskiest assumption of the skeleton block is that the arena foundation supports readable platform traversal quickly. With the tuning panel open: does the jump have the right height, hang, and cut; does landing read; does the attack have a windup and reach that make positioning matter; does the dash feel like an escape and a commitment at once; does the camera keep the landing surface and the threat in frame?

## How it resolves

Two ten-minute self sessions of short runs through Landing and Gallery against the guard and the boss proxy. Record run length, death cause, the confusing moment, and the desire to retry. One hypothesis, one or two values, three runs, keep or revert. The chosen numbers are written back to `src/tuning.ts` and the reasoning goes here. A fail at 12:15 triggers Astra's first cut (broad platforms, shallow elevation, static geometry).

## Resolution

Recorded here when decided.
