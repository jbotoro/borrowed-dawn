# Playtest log (async)

The human tests whenever there is time; agents read this file at the start of every slice and before every gate. Check boxes as they pass, write what you saw under the session log, and add anything else under Open feedback. Do not tidy old entries; append.

## How to test

- Local: `npm run dev` then `http://localhost:5173/one-more-run/`. Deployed: `https://jbotoro.github.io/one-more-run/` (latest push to main). Milestone builds stay playable under `/builds/<tag>/` (retired arena: `/builds/m1-skeleton/`).
- Controls: arrows or WASD move, Z or Space jump, X or J attack, C or Shift dash, up or down plus attack for a vertical swing, Esc pause, Enter start or restart.
- Useful params: `?room=belfry` starts in the boss chamber, `?start=demo` at the demo start, `?god=1` no damage, `?screenshot=1` hides the UI, `?autoplay=1&seed=42` lets the bot play.
- The tuning panel (top right) changes every number live and remembers changes in this browser. "copy tuning as JSON" puts the current numbers on the clipboard; paste them into a session entry when a change felt right. "reset saved overrides" goes back to defaults.
- Share the deployed link with anyone; ask them to play from the title screen uncoached and to write three lines here or tell you: what they thought the goal was, what killed them, whether they wanted another go.

## Gate 1: side-view skeleton (Wednesday 14:00)

- [ ] Title screen reads; Enter starts
- [ ] Move, jump, attack, dash all work from the game's own instructions
- [ ] Jump height and hang feel right (note the numbers you changed)
- [ ] Landing on platforms reads; no surprising slides or snags
- [ ] Attack has a visible windup and reach; positioning matters
- [ ] Dash feels like an escape and a commitment
- [ ] One enemy encounter is a real fight, not a bump
- [ ] Walking between two rooms works; camera settles correctly
- [ ] Death then checkpoint respawn within two seconds
- [ ] Boss proxy shows one telegraphed attack in the Belfry
- [ ] Three complete loops without a blocker
- [ ] A fresh viewer calls it a side-view game with 3D depth in three seconds (who: ____)
- [ ] It does not look like the arena survivor or like Hollow Knight

## Gate 2a: boss first fun (Wednesday 20:00, uncoached tester)

- [ ] Tester uses attack, jump, and dash from the instructions alone
- [ ] Tester deliberately avoids both attack types
- [ ] Tester punishes at least one recovery window
- [ ] After a death the tester names the threat and something different to try
- [ ] A later attempt shows adaptation or a win through counterplay
- [ ] Tester retries voluntarily after a death
- [ ] Builder demonstrated a win with and without the Longwick before the session

## Gate 2b: exploration first fun (Wednesday 20:00, uncoached tester)

- [ ] Within four minutes the tester identifies the boss as the destination
- [ ] Tester notices and investigates the Cache cue without a hint
- [ ] Tester collects the Longwick and can describe its effect
- [ ] Tester opens the shortcut and recognizes where it returns them

## Gate 3: juiced and feature complete (Thursday 14:00)

- [ ] Three complete playthroughs without a blocker, one without the optional loot
- [ ] Loot and shortcut state survive death; the boss resets correctly
- [ ] Pause freezes everything and resume causes no surprise hit
- [ ] Attacks, damage, pickups, phase change, victory are legible with sound off
- [ ] Music and SFX start on the normal entry flow and sit at sensible levels
- [ ] Platform edges, attack signals, and the player silhouette stay readable with the full palette and bloom

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
