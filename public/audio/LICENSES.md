# Audio licenses

Every file in `public/audio/` needs a row here before it ships. Nothing is listed yet:
all music and sound effects are synthesised at runtime in `src/audio/` and need no license.

Add one row per file when a CC0 loop or a generated effect is dropped in and mapped
in `manifest.json`.

| File | Used for | Source (URL) | Creator | License | Attribution required | Date added |
|---|---|---|---|---|---|---|
| | | | | | | |

## Fonts

The display font is the only external asset in the build. It is bundled from `src/ui/fonts/` and loaded through `src/ui/ui.css`; its license text sits beside it as `src/ui/fonts/OFL.txt`.

| File | Used for | Source (URL) | Creator | License | Attribution required | Date added |
|---|---|---|---|---|---|---|
| `src/ui/fonts/BigShouldersDisplay.ttf` (variable, weights 100-900) | Title, room names, banners, HUD labels | https://github.com/google/fonts/tree/main/ofl/bigshouldersdisplay (fetched from raw.githubusercontent.com/google/fonts/main/ofl/bigshouldersdisplay/BigShouldersDisplay%5Bwght%5D.ttf) | Patric King (Big Shoulders project) | SIL Open Font License 1.1 (`src/ui/fonts/OFL.txt`) | No (reserved font name must not be reused for a modified font) | 2026-09-16 |

Numerals, when they appear, use the system monospace stack; no numeral font is shipped.

Notes:

- Prefer CC0 (Kenney, Freesound CC0 filter, OpenGameArt CC0). No attribution required, no license risk.
- ElevenLabs free-tier sound effects are non-commercial and require attribution to elevenlabs.io.
- Record the CC0 declaration or the license page URL, not just the site name.
