# 03 Research: audio sourcing under one hour

Label: wayfinder:research (AFK)
Blocked by: none
Claimed by: research subagent, 2026-09-16
Status: closed 2026-09-16

## Answer

Music: one pre-looped CC0 arcade track from OpenGameArt. SFX: eight from ElevenLabs free tier (50 generations a month, non-commercial explicitly allowed): dash, hit, enemy death, player death, wave start, UI click, pause, restart. Backup: Kenney Impact Sounds and Interface Sounds packs (CC0, WAV). Fallback: WebAudio oscillator blip and sweep boom synthesized in code. Unlock audio on the first click or keypress (Chrome and Safari both require a gesture); howler handles the iOS empty-buffer unlock. Skip Suno: extend/loop is paid-only and the free-tier license is ambiguous for a company hackathon. Budget 45 minutes on Thursday morning. Details and URLs in `docs/research/audio-sourcing.md`.

## Question

Where does one loopable track and about eight SFX come from in under an hour on Thursday, with license terms acceptable for an internal non-commercial demo, and what is the zero-asset procedural fallback so audio never blocks?

## Resolution

Findings land in `docs/research/audio-sourcing.md`, including the browser autoplay unlock pattern and the WebAudio blip/boom fallback.
