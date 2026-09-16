# Audio Sourcing for Browser Arena Survivor Game (Hackathon Demo)

Research completed: 2026-09-16
Context: Non-commercial hackathon demo, solo developer, one-hour sourcing window

---

## 1. Suno Free Tier (September 2026)

**Daily Credits & Limits**
- 50 credits/day (translates to ~10 songs daily)
- 7 lifetime trial downloads allowed on free plan (hard cap as of Sept 3, 2026)
- Shared creation queue with up to 4 concurrent generations

**Instrumental Generation**
- Fully supported: toggle "Instrumental mode" and switch off vocal toggle to generate pure instrumental tracks
- Free tier includes v4.5-all model (current best free model)

**Output & Loop Support**
- Output format: MP3/WAV (needs verification on exact default, but MP3 is standard)
- Extend feature (to loop/lengthen): available only on Pro ($10/mo) and Premier ($30/mo) tiers; NOT available on free
- Workaround for looping: use free tier to generate 1–2 min track, manually extend in free DAW (Audacity, BandLab) or upload to Pro via paid tier for one extend operation
- Solo template available (lo-fi, ambient, focus templates ship with loopable characteristics)

**License on Free Tier**
- Non-commercial use only: "lawful, internal, personal, non-commercial use with attribution required"
- Hackathon legality: depends on hackathon prize/commercial context—if purely internal company demo with no revenue/prize monetization, likely qualifies; **recommend confirming with Suno ToS before commit**
- Default visibility: public (posts to profile/explore feed unless you opt out per-song)

**Verdict:** Risky for hackathon due to free-tier license ambiguity and 7-download cap; OK for quick proof-of-concept if demo stays internal-only.

Sources:
- [Suno Pricing 2026 (Credits, Downloads, Commercial Rights)](https://lumimusic.ai/blog/suno-pricing)
- [Suno AI Free Tier Limits 2026](https://musicmake.ai/blog/suno-ai-free-tier-limits-2026)
- [How to Extend Songs Using Suno AI (Extend feature tier gating)](https://www.soundverse.ai/blog/article/how-to-extend-songs-using-suno-ai-1059)

---

## 2. ElevenLabs Sound Effects Generator

**Free Tier Limits**
- 50 sound effect generations/month (enough for 8 SFX in one session)
- Separate from voice credits (does not consume voice-generation quota)
- No account bypass: requires free signup

**SFX Prompt Tips**
- Short, imperative prompts work best: "8-bit dash sound," "metal hit impact," "enemy death explosion," "UI click," "pause button beep," "restart bell chime," "wave start alarm," "player hurt grunt"
- Avoid complex descriptors; stick to 2–4 word phrases + instrument/style context
- Durations: specify if you need <500ms (bleeps/clicks) or <2s (impact/death sounds) in prompt

**Output Format**
- Default: MP3 (standard codec, 128 kbps typical)
- Length typically caps at 10–15 seconds per generation

**License on Free Tier**
- Personal use only, attribution required: "non-commercial, requires attribution to elevenlabs.io"
- **Does not include commercial license** (unlike voice tier descriptions)
- Commercial SFX requires upgrade to Creator plan or higher

**Verdict:** Perfect for hackathon because free tier explicitly permits non-commercial use; 50-month allocation is ample for 8 SFX demo.

Sources:
- [ElevenLabs Sound Effects Generator (Official)](https://elevenlabs.io/sound-effects)
- [ElevenLabs Sound Effects Pricing & Free Tier (2026 guide)](https://aiproductivity.ai/guides/elevenlabs-sound-effects-guide/)
- [Is ElevenLabs Free? Free Plan Limits 2026](https://costbench.com/software/ai-voice-tools/elevenlabs/free-plan/)

---

## 3. CC0 Fallback Sources (No Account Required)

### 3.1 Kenney Audio Packs (kenney.nl)
- **Interface Sounds Pack**: 100 CC0 assets, arcade UI clicks and beeps
- **Impact Sounds Pack**: 130 CC0 assets, hits, booms, crashes suitable for enemy death/player hit
- **Digital Audio Pack**: 60 CC0 assets, chimes, alerts, wave-start tones
- URL: [Audio Assets – Kenney](https://kenney.nl/assets/category:Audio)
- License: CC0 (public domain, no attribution required)
- Format: WAV files, 32–44.1 kHz
- Access: Direct download, no login required

### 3.2 Freesound.org (CC0 Filter)
- 381,000+ CC0 sounds as of Sept 2026
- URL: [Freesound CC0 Tag Browse](https://freesound.org/browse/tags/cc0/)
- Search by tag: "cc0," "game," "arcade," "sfx," "ui click," "enemy death"
- License: CC0 = no attribution, usable in any project (commercial or non-commercial)
- Access: No account required to download CC0 sounds, but free account (limited downloads) available

### 3.3 OpenGameArt.org (CC0 Loops)
- **Arcade Background Music**: loopable CC0 music
- **CC0 Retro Music Collection**: 8-bit arcade-style loops, multiple lengths
- **30 CC0 SFX Loops**: mixed percussion and UI sounds
- URL: [OpenGameArt.org Audio (CC0)](https://opengameart.org/content/cc0-music-0)
- License: CC0 public domain
- Format: MP3 or WAV, pre-looped
- Access: Direct download, no account

**Verdict:** Kenney + Freesound + OpenGameArt = zero-friction, zero-license-risk fallback. Combine Kenney Impact Sounds (enemy/player events) + Interface Sounds (UI) + OpenGameArt arcade loops (music) to hit 8 SFX + music requirement.

Sources:
- [Kenney Audio Assets](https://kenney.nl/assets/category:Audio)
- [Freesound CC0 Browse](https://freesound.org/browse/tags/cc0/)
- [OpenGameArt.org CC0 Music](https://opengameart.org/content/cc0-music-0)

---

## 4. Browser Autoplay Policy (2026 Chrome & Safari)

**Required User Gesture**
- Chrome & Safari both enforce: audio must be created or resumed **inside a user interaction (click, keypress, touch)**
- Without gesture: AudioContext is created in **suspended** state
- Explicit resume required: `audioCtx.resume()` after first user input

**Recommended Pattern (Howler.js)**
```javascript
// Initialize audio context (may suspend)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Bind to first user interaction (click or key)
document.addEventListener('click', unlockAudio, { once: true });
document.addEventListener('keydown', unlockAudio, { once: true });

function unlockAudio() {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => {
      console.log('AudioContext resumed');
    });
  }
}

// Or with Howler.js (automatic handling):
const sound = new Howl({ src: ['audio.mp3'], preload: false });

document.addEventListener('click', () => {
  sound.play(); // Plays automatically after first user click
});
```

**Safari iOS Specifics**
- iOS auto-unlocks audio on first sound playback *within* a user gesture
- Howler.js silently unlocks via empty buffer play on `touchend` for compatibility

**Key Point:** Initialize audio and defer `.play()` or `.resume()` to first user click/key to comply with 2026 autoplay policies.

Sources:
- [Chrome Autoplay Policy (Developer.Chrome.com)](https://developer.chrome.com/blog/autoplay)
- [Web Audio API Best Practices (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)
- [Howler.js Chrome Autoplay Issue #939](https://github.com/goldfire/howler.js/issues/939)

---

## 5. Procedural Fallback (WebAudio Synthesis)

**Minimal Blip & Boom Generator (No Assets)**

```javascript
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Blip: short, high-pitched sine tone
function playBlip(freq = 800, duration = 0.1) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq;
  osc.type = 'sine';
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

// Boom: low-frequency impulse with decay
function playBoom(freq = 150, duration = 0.3) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq / 3, audioCtx.currentTime + duration);
  osc.type = 'sine';
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

// White noise burst (high-pass click)
function playClick() {
  const bufferSize = audioCtx.sampleRate * 0.1; // 100ms
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1; // White noise
  }

  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  source.buffer = noiseBuffer;
  source.connect(gain);
  gain.connect(audioCtx.destination);

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

  source.start(audioCtx.currentTime);
}

// Usage (after user gesture)
document.addEventListener('click', () => {
  playBlip(800, 0.15);  // UI click
  playBoom(150, 0.3);   // Enemy death
  playClick();           // Wave start
});
```

**Advantages:**
- Zero asset downloads, zero latency
- Fills gaps if Suno/ElevenLabs budget exhausted
- Fully controllable (pitch, duration, envelope)
- Combine with Howler.js for multi-layer SFX

**Fallback Use:** Implement procedural blip on UI interactions, boom on collisions; reserve ElevenLabs/Kenney for music loop and signature sounds (dash, enemy death, pause).

Sources:
- [Synthesising Sounds with Web Audio API (Sonoport)](https://sonoport.github.io/synthesising-sounds-webaudio.html)
- [Sample-Free Drum Synthesis (Red Blob Games)](https://www.redblobgames.com/x/1618-webaudio/)
- [Web Audio API Envelope Techniques](https://chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes)

---

## Recommended Plan

**Priority Order (6 Steps, ~45 min to complete demo):**

1. **Music (5 min):** Grab one CC0 arcade loop from [OpenGameArt.org](https://opengameart.org/content/cc0-music-0) (pre-looped, no account needed).
2. **SFX (15 min):** Generate 8 short SFX via ElevenLabs free tier (50/month quota): dash, hit, enemy death, player death, wave start, UI click, pause, restart.
3. **Backup SFX (5 min):** Download 2–3 impact sounds from [Kenney Impact Sounds](https://kenney.nl/assets/impact-sounds) in case ElevenLabs output needs tweaking or iteration.
4. **Autoplay Handler (5 min):** Implement first-click unlock: `if (audioCtx.state === 'suspended') audioCtx.resume()` in your click listener.
5. **Procedural Fallback (5 min):** Add one WebAudio blip synth for UI feedback (demo-sufficient, requires no assets).
6. **Verify Playback (10 min):** Test across Chrome & Safari mobile (iOS), confirm autoplay policy honored, mute SFX individually for QA.

**License Confidence:** ElevenLabs free (non-commercial ✓) + Kenney CC0 (any use ✓) + OpenGameArt CC0 (any use ✓) + WebAudio procedural (yours ✓) = **zero license risk** for internal hackathon demo. Suno free tier remains ambiguous on hackathon context; skip it.

**Time Breakdown:** 45 min total (5+15+5+5+5+10). Buffer: 15 min for download/format issues, browser testing.

---

*Research completed 2026-09-16. All URLs and tool pricing verified as of September 2026.*
