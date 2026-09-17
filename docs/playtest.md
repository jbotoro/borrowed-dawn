# Playtest log (async)

The human tests whenever there is time; agents read this file at the start of every slice and before every gate. Check boxes as they pass, write what you saw under the session log, and add anything else under Open feedback. Do not tidy old entries; append.

## How to test

- Local: `npm run dev` then `http://localhost:5173/one-more-run/`. Deployed: `https://jbotoro.github.io/one-more-run/` (latest push to main). Milestone builds stay playable under `/builds/<tag>/` (retired arena: `/builds/m1-skeleton/`).
- Controls: arrows or WASD move, Z or Space jump, X or J attack, C or Shift dash, up or down plus attack for a vertical swing, Esc pause, Enter start or restart.
- Useful params: `?room=belfry` starts in the boss chamber, `?start=demo` at the demo start, `?god=1` no damage, `?screenshot=1` hides the UI, `?autoplay=1&seed=42` lets the bot play.
- The tuning panel (top right) changes every number live and remembers changes in this browser. "copy tuning as JSON" puts the current numbers on the clipboard; paste them into a session entry when a change felt right. "reset saved overrides" goes back to defaults.
- Share the deployed link with anyone; ask them to play from the title screen uncoached and to write three lines here or tell you: what they thought the goal was, what killed them, whether they wanted another go.

## Gate 1: side-view skeleton (Wednesday 14:00)

- [x] Title screen reads; Enter starts
- [x] Move, jump, attack, dash all work from the game's own instructions
- [x] Jump height and hang feel right (note the numbers you changed)
- [x] Landing on platforms reads; no surprising slides or snags
- [x] Attack has a visible windup and reach; positioning matters
- [x] Dash feels like an escape and a commitment
- [x] One enemy encounter is a real fight, not a bump
- [ ] Walking between two rooms works; camera settles correctly
this part is a bit weird, not sure if its because the visuals are in a early state, but on the first screen its not super intuitive that going on the left most platform and moving left will take us to the next room -- not only that but when we do go left to the next room (left hand side of screen 1) we start room 2 on the left most side of the bottom platform (for continuity if we entered a new room from room 1 left hand side, we would expect for us to be on the right most side of room 2 after crossing the threshold)
- [x] Death then checkpoint respawn within two seconds
- [x] Boss proxy shows one telegraphed attack in the Belfry
- [x] Three complete loops without a blocker
- [x] A fresh viewer calls it a side-view game with 3D depth in three seconds (who: ____)
- [x] It does not look like the arena survivor or like Hollow Knight
but we clearly need (if we havent already accounted and planned for this) to refine our art direction/style and asset quality etc, right now its very generic. the visuals of this game are just as if not more important than the gameplay itself(for this iteration), the visuals, level storytelling via small clues that a boss is near etc, shift in music, music quality and consistency in general are all key in delivery the mood and feel of the game that we are going for

## Gate 2a: boss first fun (Wednesday 20:00, uncoached tester)

- [x] Tester uses attack, jump, and dash from the instructions alone
- [x] Tester deliberately avoids both attack types
- [x] Tester punishes at least one recovery window
- [x] After a death the tester names the threat and something different to try
- [x] A later attempt shows adaptation or a win through counterplay
- [x] Tester retries voluntarily after a death
- [x] Builder demonstrated a win with and without the Longwick before the session
 mechanics and difficulty seem fine but before we go any further I think we really need to have an astra/ Fable session and how we source or build our art assets. because if its going to be more of the same as what we have going forward it wont work. it looks like a flash game from 2009 if we are being honest. whether that is a library limitation (three.js?) or simply that we keep running with our given sources/styles without exploring alternatives or thinking of alternatives way we could source, or potentially build our own etc
## Gate 2b: exploration first fun (Wednesday 20:00, uncoached tester)

- [x] Within four minutes the tester identifies the boss as the destination
- [x] Tester notices and investigates the Cache cue without a hint
- [x] Tester collects the Longwick and can describe its effect
- [x] Tester opens the shortcut and recognizes where it returns them

## Gate 3: juiced and feature complete (Thursday 14:00)

- [x] Three complete playthroughs without a blocker, one without the optional loot
- [x] Loot and shortcut state survive death; the boss resets correctly
- [x] Pause freezes everything and resume causes no surprise hit
- [x] Attacks, damage, pickups, phase change, victory are legible with sound off
- [x] Music and SFX start on the normal entry flow and sit at sensible levels
- [x] Platform edges, attack signals, and the player silhouette stay readable with the full palette and bloom

beat the boss and the "the bell falls silent. the furnace stays warm" text shows but nothing happens after, intended?
## Gate 4: final (Thursday 20:00)

- [ ] Deployed build passes everything above on the presentation machine and one other desktop
- [ ] Tester completes three runs without coaching
- [ ] QR opens the intended build; backup recording plays with sound

## Session log

Copy this block per session:

```
### <date time> - <build: local or URL or tag> - <tester: me or name>
Runs: <n>   Longest: <s>   Deaths: <cause, cause, ...>
Jump: <felt ...>   Attack: <...>   Dash: <...>
Confusing moment: <...>
Blocker: <none or ...>
Wanted to retry: <yes/no, why>
One change I would try: <value: from -> to, or an idea>
Tuning JSON if changed: <paste>
```

## Open feedback

- (add anything here, any time)

## Listening check (audio layer, 2026-09-16 14:05)

Agents cannot hear. Play with sound on (any key or click unlocks audio; M mutes; `?mute=1` starts muted) and tick or note:

- [ ] The shrine bed (Landing, Gallery, Cache) reads as "work beginning under pressure": low struck metal, slow pulse, warm sustained tones, not noise
- [ ] Entering the Belfry is felt as a shift (furnace drone, slow bell toll), not just louder
- [ ] The first boss telegraph raises intensity noticeably; the phase change is audible
- [ ] Sweep and stomp warnings cut through the music and sound different from each other
- [ ] Jump, land, attack swing, hit, dash, hurt, death, respawn, checkpoint, pickup each sound like their material (hollow metal, brass, glass, steam)
- [ ] Death ducks the music and it returns; pause quiets it and resume restores it
- [ ] Relative levels sit right; if not, the `audio` group in the tuning panel has master, music, sfx
- [ ] Nothing loops audibly or clicks

Notes:

## Benchmark approval (Cinder Landing under look C)

When the benchmark lands, open `http://localhost:5173/one-more-run/?room=landing` and judge against `docs/style-sheet.md`:

- [x] The room reads as a place (the landing at the foot of the belfry) and the platforms are things with supports
- [x] The sealed great door, the collapsed stair, and the service stair make the route obvious without UI
- [x] Exits are passages with light, not frames
- [x] The courier reads as a hooded figure with a lantern at gameplay scale; run, jump, attack, dash, hurt have readable motion
yes but he still looks a bit jank but passable for now
- [x] Grayscale still reads (threats vermilion, rewards amber are the only color)
- [x] It belongs to a finished game; name the largest mismatch: ____
 the courier imo is the weakest part thus far, the light from his chest seems to leak out at the shoulders, the sword is still very flash game like, the feet are silly and dont really match the body, his torso + head kinda blends together. The boss in the belfry was pretty good but could still use a bit more flavor or something but generally the enemies are better than the courier
Verdict (approve / one correction round / pick the simpler treatment):

## Codex benchmark continuation (2026-09-16, second Claude limit)

Built on the interrupted Claude slices; this is an agent verification record, not human benchmark approval.

- Fixed `roomMesh` platform ownership: only gameplay-plane decor (z=0) claims collision solids. Background walls previously stole the bench, crates, beam, and lower stairs by XY overlap, producing detached pale strips and incorrectly shaped foreground props. At 1280x720 the live Landing now shows the supported bench and separate stacked crates with their playable edges; the stair uses its actual treads.
- Removed the redundant diamond/light at the Courier's feet when an authored checkpoint lamp is present. The hanging lantern and its floor light remain; the Courier's chest lantern and boots are unobscured. Checkpoint gameplay and event effects are unchanged.
- Found an autoplay blockage against the beam at x=20.1. Reproduced for 120 simulated seconds; diagnostic removal of the beam allowed progress, while a waypoint-only change moved the blockage to the crates. The bot's existing blocked-jump recovery now also runs while retreating. No room data, player physics, combat logic, or tuning values changed.
- Added `node scripts/check-autoplay.mjs`: fixed-step seed-42 route smoke check using actual room content and god mode. Passed Landing -> Gallery at 6.62 s -> Belfry at 13.67 s. This is separate from Vitest and does not assert appearance or boss victory.
- Verification: typecheck, all 55 Vitest tests, production build; live Landing before/after screenshots and console checks via Codex's in-app browser. A separate `?autoplay=1&seed=42&fast=4&god=1&mute=1` browser run reached the Belfry, visibly fought the Bellkeeper, and showed "the shortcut grinds open"; console warnings/errors were empty. Build still emits its >500 kB chunk advisory. Existing saved PNGs predate these corrections; the current before/after observations are in the Codex conversation.
- Still required: human benchmark verdict above, uncoached exit/traversal and optional Cache checks, combat/animation approval, audio listening, and presentation-device performance. The existing four-room kit is preserved, not declared approved. No milestone was tagged or deployed.

Resume: `docs/style-sheet.md` is canonical, C is selected, audio is wired. The old concept-selection paragraphs in the proposal are historical; do not restart selection from them.

## Agent responses

- 2026-09-16 13:30, Gate 1 transitions and art note: doors get drawn archways with light spill; the layout becomes spatially coherent (Landing bottom-left, Belfry bottom-right, Gallery above; Landing's exit moves to its upper right and arrives at the Gallery's lower left; the Gallery's far right drops onto the Belfry's top-left ledge; the shortcut runs along the bottom); each room gets its own fog, light, embers, furnace slots, and light shafts as boss-is-near cues; procedural music beds that shift in the Belfry plus SFX, with a manifest for a CC0 loop and generated effects later. Re-test the transition boxes on the next deployed build.
- 2026-09-17 10:45, the victory note answered: after "the bell falls silent" the furnaces relight amber along the room, and after a short hold ENTER returns you to the Landing title for a fresh run. Also new: a boss intro line on entering the Belfry, a void fade on room changes and respawns, the death vignette closing over the respawn delay, a pause screen with the room name, and a pulsing title prompt. Your art notes from this morning (courier getting messier, boss reads as furniture, red telegraph fills) are being answered by a rebuild of all four actors as flat layered tin puppets (`docs/actor-sheet.md`); the filled telegraphs are cut, leaving a thin edge for the first part of a wind-up.
- 2026-09-17, benchmark verdict read as approved with one correction round on the courier (light leaking at the shoulders, needle, boots, head-to-torso separation) plus a Bellkeeper flavor pass; both queued after the m3-visual tag. The victory note (line shows, nothing follows) is a real gap: the simulation enters the victory phase and stops, and the presentation slice owns the payoff beat (machinery relights, banner, return to title). The Gate 1 transitions box is left to you: the layout was rebuilt after that note (Landing exits upper right into the Gallery's lower left), and the ticked Gate 2b shortcut box suggests it now holds.
- 2026-09-16, later Codex planning response to Gate 2a's art objection: `docs/visual-upgrade-plan.md` now records the human-approved three-candidate selection loop. Human references are Paper Mario, Hollow Knight, and well-executed monochrome such as Limbo. Next: concept sheets, human selection, canonical sheet, then one live benchmark before extending the look across the area. No new playtest was performed or gate checked in this documentation handoff; transition and exploration validation remain pending.
