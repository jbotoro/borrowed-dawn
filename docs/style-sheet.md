# Style sheet: Borrowed Dawn, graphic monochrome (look C, canonical)

Selected 2026-09-16 14:05 by the human from three in-engine looks (`docs/evidence/looks/`). This sheet is the reference for every visual task. One lead agent owns it; supporting agents build against it and do not choose palettes, silhouettes, shaders, or typography on their own. Everything on screen is procedural, agent-built geometry, materials, and code. No imported or generated images, models, or sprites. One open-license web font is the only external asset, recorded in `public/audio/LICENSES.md` alongside audio.

## Standing rules from the human

1. Visuals and feel before anything else. No new rooms, no new verbs, no combat changes until the four rooms look and move like one finished game.
2. Nothing on screen is a nondescript box. Every platform, wall, prop, and passage is a recognizable thing in an abandoned industrial shrine: a stair flight, a gallery walkway with a balustrade, a fallen beam, a bench, a tool rack, a crate stack, a winch platform, a bell yoke, a furnace mouth, a bricked doorway.
3. Traversal is motivated by the place. You climb because the ground route is blocked by something you can see (a collapsed stair, a sealed door, a fallen beam), and the alternative is legible (the service stair up to the gallery). Never a hop for its own sake.
4. Doorways are passages cut into wall masses, never frames standing on a platform. See "Passages".

## Reference qualities (study these, copy nothing)

- INSIDE: staging and depth. The figure sits small and low in a wide frame; negative space and fog do the composing; light is placed to lead the eye to the next place; foreground and far layers are silhouettes; the world is quiet except where something matters.
- Paper Mario: one material premise organizing everything. Every character, surface, effect, and menu obeys the same physical idea. Ours is cast iron and cut stone lit by stored sunlight.
- Neva: graphic clarity and animation. Poses read as shapes; every action has anticipation, a clear contact frame, and settle; the interface is almost absent.

## Value ramp and chroma

Five values, used everywhere. Toon shading with three bands; outlines on actors and on foreground architecture edges.

| Role | Hex | Use |
| --- | --- | --- |
| void | `#07090D` | background field, outlines, passage interiors, bell interior |
| charcoal | `#151B24` | walls, far architecture, shadow band |
| slate | `#3A4452` | mid architecture, actor bodies, mid band |
| ash | `#7C8794` | lit band, metal edges, far layer one step up from charcoal |
| porcelain | `#E8E2D5` | walkable rims, actor highlights, lit stone tops, UI text |

Chroma is meaning, never decoration:

- vermilion `#FF4B35`: threat only. Telegraph marks on the exact threatened area, active enemy weapons, hazards, the Bellkeeper's furnace mouth during an attack, the guard's visor when it commits.
- amber `#FFB648`: the world's stored light, safety, reward. The courier's lantern (the only warm light the player carries), checkpoint flame, pickups, furnace mouths at rest, light spilling from a passage that leads somewhere warm.

Room mood comes from fog density, the value key, and where amber sits, not from tinted ambient light. Landing: mid key, amber pooled at the checkpoint and behind the sealed door. Gallery: darkest, highest contrast, cold; amber only at the Cache hatch and the far stair. Cache: close fog, amber pockets on the tool racks. Belfry: dark, wide negative space around the boss, two furnace mouths.

## Shape language

Cast iron and cut stone. Heavy horizontals, chamfered stone piers, riveted iron plates, arches with keystones, chains with real links and brackets, yokes and winches. Every mass connects to a wall or the floor with a visible support: corbel, bracket, column, or stair stringer. Edge wear as small chipped corners on stone, never on the walkable line itself. The walkable line is always a continuous porcelain edge with a charcoal face beneath.

Depth in three roles: far silhouette (charcoal cutouts, no detail), midground machinery (slate, low detail, fogged), playable foreground (full ramp, outlines). Foreground never overlaps the courier, a landing edge, or a threat.

## Passages

A passage is an opening in a wall mass at least 1.2 units thick: an arch or a lintel over a threshold step, a void interior with one value step of ash at the far end, and light spill on the floor in front (amber if it leads to warmth or safety, ash if it leads to cold). Vertical exits are stair flights that climb into an opening in an upper wall or floor. A sealed passage shows its door: an iron gate with bars and a lock plate, or a bricked arch. The exit of a room must be readable from its entry without UI: it is the one opening with light in it.

## The rooms as places (story beats, not layouts)

- Cinder Landing: the landing at the foot of the belfry. The great door to the bell chamber is sealed (iron gate, furnace light through the bars). The ground stair beyond it has collapsed into rubble. The service stair on the right climbs to the chain gallery. The checkpoint is a wall lamp on a bracket at the entry. Props: a bench, a crate stack, a fallen beam, a boiler with pipes into the wall.
- Chain Gallery: the chain loft above the landing. A gallery walkway with a balustrade runs the length, broken in two places so you jump gaps over a drop you can see. The winch and its chains hang through the room. A maintenance hatch with a ladder leads up to the Cache. The far end descends by an iron stair into the bell chamber; heat and embers rise from that end.
- Wick Cache: a wick store. Tool racks, a workbench, shelves, a bricked-up doorway you break through; the Longwick lies on a rack behind it under an amber lamp.
- Belfry: the bell chamber. The great bell hangs from its yoke and chain. The Bellkeeper waits beneath it. Furnace mouths on both sides feed the bell. The sealed door from the landing opens from this side once you approach.

## Actors

Construction moved to `docs/actor-sheet.md` on 2026-09-17 (tin puppets: flat layered plates, pins at the joints, unlit). The part lists and poses below still describe what each actor carries and does; the construction sheet says how it is built.

Courier (1.2 units tall, collision unchanged): hooded coat with a clear shoulder line and a hem that swings with movement; the lantern held at the chest in the off hand, a small glass box with a visible amber flame, the only warm light on the player; the wick needle in the lead hand held low, one body length; boots that visibly contact the ground. Reads at 60 pixels tall as one value against void. Motion: run cycle with leg swing and coat sway, anticipation crouch on jump, a real arc on attack, recoil on hurt, a crumple and lantern gutter on death. Nothing bobs while standing still.

Bellkeeper: a cracked bell shell (porcelain rim, slate body, void interior) hanging from a yoke by a chain, a furnace mouth at its base, one striking arm ending in a clapper head. Heavy when still (arm hanging, faint breath in the mouth). Sweep wind-up: shell tilts back, arm rises, mouth goes vermilion. Stomp: shell compresses, mouth flares. Recovery: shell rocks, mouth open and amber. Phase two: the crack opens and glows.

Cinder Guard: riveted iron plate body, a visor slit (vermilion when it commits), a short blade. Boiler Stomper: a riveted boiler sphere on block feet, underglow amber, vermilion on the hop.

## Effects (graphic shapes, not sprays)

Attack: a porcelain crescent arc, three frames. Hit: a starburst shape plus a two-frame flash and a weighted recoil on the target. Miss reads differently from hit. Dash: a plume of ash chevrons behind the courier, silhouette always visible. Stomp: dust puffs at contact, waves as porcelain ridges travelling along the floor. Telegraphs: vermilion marks on the exact threatened area, never larger or smaller. Pickup and checkpoint: an amber lift and a banner. Death: the lantern gutters; brief. Victory: the furnaces relight amber along the room.

## UI

One display font for the title, room names, and banners (an open-license geometric or industrial sans from Google Fonts, chosen by the lead and recorded); monospace only for numerals. Porcelain text on void with a thin porcelain rule as the only border. Health as lantern pips, dash readiness as a short bar, boss health as a thin bar under the bell when the fight starts. The tuning panel is hidden in normal play and opens with the backquote key; `?screenshot=1` still hides everything.

On-screen title: BORROWED DAWN. "One More Run" stays the project name.

## Acceptance for any visual slice

- At gameplay scale the courier, the enemy, the next ledge, and the active threat can be told apart without UI, and again in grayscale.
- A screenshot of each room belongs to the same game.
- Every platform is a thing with a support; every exit is a passage with light; nothing floats.
- Run, jump, dash, attack, hurt, death have complete readable motion with floor contact.
- No z-fighting, no clipped glows, no frame drops on repeated room entry.
- Combat timing, hitboxes, and the simulation are unchanged; visual work never edits `src/game/`.
