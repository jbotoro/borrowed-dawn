# Milestone evidence

One row per gate. The URL is the snapshot under `builds/<tag>/`. Gate results are honest: passed, failed (with the failing criterion), or missing independent validation.

| Tag | When | URL | Gate result | Screenshot | Clip | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| m1-skeleton | 2026-09-16 10:15 (snapshot written; tag and push pending) | https://jbotoro.github.io/one-more-run/builds/m1-skeleton/ | Skeleton criteria met on localhost: fixed-camera arena, enemies spawn and chase, dash kills, contact costs health, death, score screen, restart, best score persisted, configurator live; 52 tests, Codex review 7/7 fixed. Deployed check and fresh-viewer check not run. | `docs/evidence/m1-skeleton.png` | none | Destination redrawn right after this gate: the arena survivor is retired (a colleague shipped a survivor clone last year). This build is the build-story evidence of the path not taken. No manual code edits. |
| m2-skeleton | 2026-09-16 13:10 (snapshot written; tag and push pending) | https://jbotoro.github.io/one-more-run/builds/m2-skeleton/ | Side-view skeleton. Agent-verifiable criteria met on the deployed root build: start, move, jump, attack, dash, guard and stomper encounters, four connected rooms, death, checkpoint respawn within two seconds, shortcut opens on boss approach and is walkable, Bellkeeper with sweep and stomp telegraphs and phase two; bot closed three death-respawn loops on the deployed build; 55 tests; Codex review 5/6 confirmed and fixed, 1 rejected. Human criteria pending: three complete loops by hand, fresh-viewer three-second check (`docs/playtest.md` Gate 1). | `docs/evidence/m2-skeleton-gallery.png`, `docs/evidence/m2-skeleton-deployed.png` | none | Built in about 75 minutes of agent time from the redrawn destination. Level changes for the gate: Gallery dash gap 5.0 to 4.3, cache shaft moved, Belfry Gallery door raised onto a ledge so the shortcut route is clear. No manual code edits. |
| m3-first-fun | | | | | | |
| m4-juiced | | | | | | |
| m5-final | | | | | | |

Procedure at each gate (10 minutes): `npm run snapshot -- <tag>`, commit, `git tag <tag>`, push, wait for Pages, open the snapshot URL, take one screenshot and a 15 to 20 second clip, fill the row.
