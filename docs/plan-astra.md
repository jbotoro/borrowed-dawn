1. **Tuesday tonight — lock the run sheet; planning only.**

   **Exit criterion:** A single checklist covers the required game, four milestone URLs, timed gates, playtests, capture routine, and demo. No implementation begins.

   **Riskiest assumption:** The supplied 12–16-hour playable estimate leaves enough time for deployment, audio, testing, and storytelling. Budget those activities inside the build hours.

   **First three tasks:**  
   1. Reserve Wednesday and Thursday **09:00–14:00 and 15:00–20:00**, totaling 20 build hours; Friday **09:00–12:00**, totaling three polish hours. Times are local.
   2. Book one colleague for Wednesday 19:00 and Thursday 18:00, for ten minutes each. They are testers, not teammates.
   3. Prepare the acceptance checklist, intervention-log template, and milestone evidence checklist.

   Wednesday’s “first fun” target is deliberately aggressive: it tests a narrow gameplay loop. The complete playable package remains targeted for build hour 14–16, leaving four to six hours for stabilization.

2. **Wednesday morning, 09:00–14:00 — playable skeleton.**

   **Exit criterion:** On the deployed skeleton URL, a player can start, move, dash, encounter approaching enemies, lose, see survival time, and restart. Three consecutive runs complete without a blocker. A fresh viewer sees the opening three seconds and describes it as a 3D game without prompting.

   **Riskiest assumption:** The fixed-camera presentation communicates depth while keeping movement and danger readable.

   **First three tasks:**  
   1. Direct the agent toward the smallest complete start–play–lose–restart experience.
   2. Get the in-game tuning configurator usable before substantial feel iteration: movement, dash, enemy pressure, and feedback intensity.
   3. Deploy early and inspect actual play using screenshots and console access; correct readability before adding decoration.

   **Playtests:** Three self-test sessions: movement/readability, full loop, then deployed acceptance. Ask a fresh colleague for the brief three-second visual check asynchronously.

3. **Wednesday afternoon/evening, 15:00–20:00 — first fun.**

   **Exit criterion:** The following all pass on the deployed build:

   - Self completes five consecutive runs without a control or restart failure.
   - The colleague starts and uses dash within 30 seconds using only the game’s instructions.
   - In three colleague runs, at least two contain a recognizable near miss or useful dash escape.
   - The colleague can explain why they lost and identify something they would try differently.
   - After the required runs, the colleague voluntarily chooses another attempt.
   - Restart returns control within two seconds; survival time behaves consistently.

   These are a milestone gate, not proof of broad appeal.

   **Riskiest assumption:** Movement, dash, and enemy pressure alone produce a repeatable survival challenge.

   **First three tasks:**  
   1. Tune the opening ten seconds so the player understands movement before pressure becomes overwhelming.
   2. Tune dash usefulness and escalating pressure through short runs.
   3. Run the uncoached colleague test at 19:00, make one focused tuning pass, and deploy the first-fun candidate by 20:00.

   **Playtests:** Three self-test sessions plus the colleague session. If the gate fails, label the deployment “first-fun candidate — gate failed”; preserve the evidence and carry the specific failure into Thursday.

4. **Thursday morning, 09:00–14:00 — juiced and feature complete.**

   **Exit criterion:** Every required feature is present: title, arena, waves, dash, survival score, loss, score screen, instant restart, pause, persistent best score, music, and SFX.

   “Juiced” additionally means:

   - Dash, danger/contact, and death have distinct, immediately readable feedback.
   - Movement and enemy positions remain readable during the busiest tested moment.
   - Music and effects are audible at sensible relative levels, without masking each other.
   - With sound muted, the player still understands dash and death.
   - Pause freezes action and survival scoring; resuming causes no unexpected jump.
   - Best score survives reload and remains intact after a worse run.
   - Three complete runs pass on the deployed juiced build, including the WebGL fallback.

   **Riskiest assumption:** Added feedback improves clarity without damaging responsiveness or the survival loop.

   **First three tasks:**  
   1. Resolve any failed first-fun criterion before adding presentation work.
   2. Complete pause, best-score memory, and screen transitions; verify them by playing.
   3. Add the smallest coherent visual/audio feedback set, then compare it with the first-fun build.

   **Playtests:** Three self-test sessions: gameplay regression, feedback with sound on/off, and deployed acceptance.

   **Stretch decision:** An in-game LLM gets at most **30 minutes**, only if Wednesday’s first-fun gate passed and this entire gate passes by 14:00. It must survive a no-network playtest gracefully. Otherwise omit it. The recommended use of that time is stabilization.

5. **Thursday afternoon/evening, 15:00–20:00 — final candidate and evidence package.**

   **Exit criterion:** The final URL passes the full checklist on the presentation machine and an independent desktop browser/device. The colleague completes three runs without coaching or blockers. Both rendering paths have been exercised. Four milestone URLs and their actual gate results are recorded. The QR opens the final URL, and a usable backup recording exists.

   **Riskiest assumption:** The deployed build behaves as reliably as the local build on the presentation setup.

   **First three tasks:**  
   1. Test the actual deployed experience, including first load, audio start, pause/resume, reload, and restart.
   2. Run the colleague session at 18:00 and fix only failures affecting comprehension, reliability, or required features.
   3. Publish the final candidate, assemble the build-story evidence, and record a complete backup demo.

   **Playtests:** Three self-test sessions plus the colleague session. Reserve **18:30–20:00** for fixes, acceptance, and capture; no new features.

6. **Friday morning, 09:00–12:00 — polish, rehearse, freeze, present.**

   **Exit criterion:** Three timed rehearsals are complete, the final build is frozen, the backup plays locally with audible sound, and the QR has been checked. The presentation fits three minutes.

   **Riskiest assumption:** The live run produces a clear payoff quickly enough for the audience to understand it.

   **First three tasks:**  
   1. **09:00–09:30:** Test the presentation machine, display, audio, deployed URL, and QR; fix only presentation blockers.
   2. **09:30–10:00:** Perform rehearsal one; trim the narration and choose the exact build-story evidence.
   3. **10:00–10:30:** Make the last essential corrections, repeat affected acceptance checks, and freeze the game.

   **Remaining schedule:** Rehearsal two at 10:30; record and verify the final backup by 11:00; dress rehearsal three at 11:00. **At 11:15, freeze slides, recording, links, and narration too.** Use the remaining time for setup and contingency. After the game freeze, recover through the verified deployment or recording rather than editing.

   **Three-minute storyboard:**

   | Time | What the room sees and hears |
   |---|---|
   | 0:00–0:20 | Problem: “Could one person direct coding agents to make a small game worth replaying in two build days?” Show the title screen. |
   | 0:20–1:15 | Live payoff: start, survive approaching waves, demonstrate dash, lose, show score, immediately restart. |
   | 1:15–2:20 | Build story: four milestone snapshots and URLs; one agent design decision, the human playtest response, and the observed result. Show the manual-edit count and one representative intervention. |
   | 2:20–2:40 | One honest limitation: a tiny playtest sample means difficulty is tuned to a few people. If something required was cut, disclose that instead. |
   | 2:40–3:00 | QR and invitation: “Desktop keyboard play.” Leave the link visible. |

   If live play stalls for more than ten seconds, switch to the verified recording.

**Fallback triggers and cut order**

Cuts remove optional breadth before required behavior. Pure 2D, missing music, or missing pause would fail the stated definition of done.

| Order / checkpoint | Observable trigger | Required response |
|---|---|---|
| **First — Wednesday 12:00** | The deployed candidate cannot complete start–move–dash–lose–restart. | Cut scenery work, alternative visual treatments, and enemy variety beyond one readable enemy type. Keep the fixed 3D presentation. |
| **Second — Wednesday 20:00** | Any first-fun criterion fails. | Cancel the LLM stretch permanently. Cut additional enemy behaviors, wave surprises, and progression embellishments. Spend Thursday’s first two hours solely on movement, dash, pressure, and loss clarity. |
| **Third — Thursday 12:00** | Required features remain absent, or feedback makes play harder to read. | Cut elaborate screen transitions, camera flourishes, layered effects, and custom audio iteration. Use one cleared music loop and a minimal essential SFX set; take the allowed CC0 fallback if generation is consuming time. |
| **Thursday 16:00** | Any required feature or rendering path still fails acceptance. | Stop all polish and optional work. Remove any LLM experiment. Work only on failed requirements and deployment reliability. |
| **Thursday 19:00** | A blocker still prevents a complete run. | Return to the latest verified playable build and record it. Explicitly list unmet requirements; do not relabel it “complete.” |
| **Friday 10:30** | Any unresolved live-demo blocker remains. | Freeze code and use the verified build or backup recording. |

**Process capture**

- At every milestone gate, the human tags the exact build and deploys its dedicated URL. Capture the URL, timestamp, gate result, one screenshot, and 15–20 seconds of play. Allow ten minutes inside each block.
- Keep one append-only intervention log. Immediately after each human code-edit episode, spend under a minute recording **time, what changed, why, and verification**. Group a continuous edit session into one entry, but enumerate every change. Explicitly record “no manual code edits” when applicable. Agent-written edits are not human interventions.
- Bookmark transcript candidates during work with a short note. Save the original exchange and its playtest outcome. Prefer one agent decision that improved play and, optionally, one that the human rejected or corrected.
- Select moments that show a real choice, alternatives, and observable consequences. Use one strong moment rather than inventing a second. Limit final curation to 20 minutes Thursday.

**Playtest-to-tuning routine**

Each self-test session lasts about ten minutes and contains several short runs. Record only: build, run duration, death cause, dash usefulness, confusing moment, blocker, and desire to retry.

After each session, choose the largest problem, state a hypothesis, change one or two related tuning values, and replay three runs. Keep or revert based on the observed result. Give agents screenshots and console evidence alongside the feedback.

Colleague sessions stay uncoached until their initial runs finish. If unavailable, record self-tests and mark independent validation as missing; self-testing does not satisfy the external first-fun gate.

**Open questions**

- What are the existing spec’s exact loss rules and dash rules? The gate must test those rules; this plan does not invent them.
- Which desktop browsers/devices are promised for the QR audience, and what is the presentation machine?
- Which colleague can attend both sessions? Who can provide the fresh three-second visual check?
- How will the separate code plan make both renderer paths explicitly testable and expose live tuning?
- Which static hosting destination supports four preserved milestone URLs?
- Which audio source will be used, and what license or attribution evidence must be retained?
- Is room audio available, and can the backup be played locally through the presentation setup?