# Milestone evidence

One row per gate. The URL is the snapshot under `builds/<tag>/`. Gate results are honest: passed, failed (with the failing criterion), or missing independent validation.

| Tag | When | URL | Gate result | Screenshot | Clip | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| m1-skeleton | 2026-09-16 10:15 (snapshot written; tag and push pending) | https://jbotoro.github.io/one-more-run/builds/m1-skeleton/ | Skeleton criteria met on localhost: fixed-camera arena, enemies spawn and chase, dash kills, contact costs health, death, score screen, restart, best score persisted, configurator live; 52 tests, Codex review 7/7 fixed. Deployed check and fresh-viewer check not run. | `docs/evidence/m1-skeleton.png` | none | Destination redrawn right after this gate: the arena survivor is retired (a colleague shipped a survivor clone last year). This build is the build-story evidence of the path not taken. No manual code edits. |
| m2-first-fun | | | | | | |
| m3-juiced | | | | | | |
| m4-final | | | | | | |

Procedure at each gate (10 minutes): `npm run snapshot -- <tag>`, commit, `git tag <tag>`, push, wait for Pages, open the snapshot URL, take one screenshot and a 15 to 20 second clip, fill the row.
