# 1. Title, hook, premise, and tone

**Title options**

1. **Borrowed Dawn** - Recommended. Names the stolen resource and the question of who deserves to keep it.
2. **The Morning Thief** - Emphasizes the courier and the act of taking daylight back.
3. **Last Light Delivery** - Emphasizes the journey and the player's ordinary job under extraordinary conditions.

**Hook:** Steal the sunrise from the machines that hoard it.

**Premise:** During the ash winter, the mountain towns stored sunlight inside a network of furnaces, glass orchards, and weather engines. The sky has cleared, but the machines still follow their emergency order: preserve the reserve; refuse every withdrawal. You are a lantern courier carrying the last public delivery lantern. Climb the distribution line, defeat its mechanical custodians, and reconnect the towns to their daylight. Each liberated machine becomes useful again: a furnace heats a landing, an orchard opens its shutters, a pump sends warm rain downhill. At the summit, decide whether to release the reserve into one shared sunrise or keep it circulating through a public network that will need tending.

**Tone:** Defiant, tactile, generous.

This is not a story of an extinct kingdom, an unknowable darkness, or a chosen vessel; people are waiting for their delivery, and your work visibly helps them.

**Scope:** The first area is the four-room foundation for the three-day build presented Friday, September 18, 2026. Later areas are optional extensions, each scoped to roughly one to two days of agent work directed by one engineer. This document specifies their intended experience; future content and its numerical targets remain subject to playtesting.

# 2. The player

**The Courier** is a human municipal worker, unnamed because the job matters more than ancestry. They know how to climb service routes, open lamp housings, and move through dangerous machinery. They are taking back a public utility.

They carry:

- **A delivery lantern:** a brass cylinder with a bright amber chamber, fastened against the chest so both hands remain useful.
- **A wick needle:** a long metal lamp-maintenance tool used for directional strikes. It is a practical implement, without a sacred history.
- **A pressure mantle:** a short protective coat whose stored heat powers the dash.

**Silhouette:** A dark cone-shaped coat, a shallow pale cylinder for the cap, two short box legs, an amber lantern chamber, and one thin projecting weapon. The pale cap, triangular coat, and off-center needle must identify the Courier at small screen size. No horns, wings, insect limbs, face drawing, or flowing cloth simulation. Express effort through lean, squash, recoil, and the lantern's motion.

The Courier remains visibly the same person throughout. Upgrades change one recognizable attachment or light behavior rather than replacing the silhouette.

| Ability or upgrade | Meaning in the fiction | Gameplay promise |
|---|---|---|
| Move and jump | A courier's practiced route work | Precise positioning and readable platforming from the start. |
| Directional attack | The wick needle clears obstructions and disables machinery | Left, right, upward, and downward attacks; downward attack does not imply a bounce. |
| Invulnerable dash | The mantle releases a brief pressure burst | Pass through a committed attack; cannot pass through solid walls. |
| Longwick | A telescoping needle recovered from a service cache | Reach grows from 1.6 to 2.4 world units; damage stays unchanged. |
| **Parry: Mirror Cuff** | The recovered Dawn Core powers a reflective shutter around the lantern | Deflect marked strikes and return light pulses into receivers. |
| **Upward dash: Updraft Bellows** | The Pruner's bellows redirect the mantle's exhaust downward | Reach visibly higher ledges and evade low attacks vertically. Shares the existing airborne dash allowance. |
| Equipment choice | Interchangeable lantern fittings | Change a preference or tradeoff, never the ability to finish a route. |

Parry is the first expansion verb. Upward dash is the second. Neither is required for the original Bellkeeper.

The following remain **reserved, not promised**:

| Candidate | Fiction | Required reason to add it |
|---|---|---|
| Wall jump | Clamp soles grip marked service ribs | A new area built around ribbed shafts with safe practice walls. |
| Pogo | A sprung needle foot rebounds from impact | Clearly marked resilient caps and enemies whose backs invite a bounce. |
| Charged attack | The needle holds and releases lantern pressure | Riveted obstructions and armored enemies with long, visible openings. |
| Ranged tool | A shutter launches a condensed light pellet | Remote receivers and exposed targets that existing reach cannot serve. |

Do not add a reserved verb merely because it is customary in the genre. It needs both a visible traversal use and a distinct combat use.

# 3. Design pillars

| Pillar | Rule | Test for an addition |
|---|---|---|
| Every fight teaches | Each placed enemy asks for a readable decision and offers a reliable punish window. | Does this addition teach or test something beyond dealing more damage? |
| Rewards change possibilities | Exploration improves options; mandatory rewards visibly open the onward route. | Does this addition let the player do or reach something they can recognize beforehand? |
| Machinery tells the story | The world's purpose and recovery are shown through shape, motion, and light. | Does this addition communicate something without requiring a paragraph of explanation? |
| Difficulty respects learning | Failure returns the player quickly with discoveries intact and attack rules unchanged. | Does this addition make another attempt useful rather than costly? |
| Small scope, strong identity | Each area earns its place with one industrial purpose, one shape family, and one combat lesson. | Does this addition justify its build cost with an experience the existing areas cannot provide? |

# 4. The world

**Intended route**

```text
1. CINDER BELFRY
   Cinder Landing -> Chain Gallery -> Belfry
                          |
                      Wick Cache
   Belfry approach opens the shortcut back to Cinder Landing.
                          |
                    Dawn Core
              Mirror Cuff expansion
                          v
2. GLASS ORCHARD
   Return a light pulse into the sealed orchard receiver.
                          |
                 Updraft Bellows
                          v
3. RAINWORKS
   Upward-dash into the elevated intake passage.
                          |
                     Sunwheel
                          v
4. ASH OBSERVATORY
   Power the summit lift and reach the reserve shutters.
                          |
                    Dawn released
                    or circulated
```

The path is connected and revisitable. Gates stay open once solved. A mandatory gate never depends on an optional cache.

Each future area uses four compact room roles: safe arrival and practice, traversal and encounters, optional reward branch, boss and payoff. Its budget is two enemy types, one boss, one checkpoint, one return shortcut, and one music loop. Reuse existing movement and attack families where possible.

**Area 1: Cinder Belfry**

**Purpose and theme:** The network's ignition station, where stored daylight is burned to start the distribution machinery.

**Procedural identity:** Hanging chains, broad bell profiles, square piers, low cylindrical boilers. Charcoal metal and cold steel surround small furnace openings. Large background bells establish scale without crowding the play plane.

**Existing room roles remain fixed:**

| Room | Role |
|---|---|
| Cinder Landing | Safe arrival, checkpoint, movement practice, view of the belfry, and the initially closed boss shortcut. No enemies. |
| Chain Gallery | Main route, platform traversal, one guard and one stomper; the high branch leads to Wick Cache. |
| Wick Cache | Optional exploration room with one guard, a breakable wall, and the Longwick. The wall takes three ordinary hits. |
| Belfry | Flat boss arena, shortcut connection, Bellkeeper, and Dawn Core payoff. |

Reaching the boss approach opens the Landing shortcut before victory. Death must not demand another Gallery fight to retry the boss.

**Signature enemies**

| Enemy | Silhouette | Behavior and telegraph | Punish and lesson |
|---|---|---|---|
| Cinder Guard | Box torso, broad plate cap, slit visor, short projecting blade | Patrols a fixed platform; stops and leans back with a bright visor for 350 ms before a committed lunge. | Stops for 500 ms afterward; three hits to defeat. Teaches baiting, spacing, and dash-through retaliation. |
| Boiler Stomper | Squat faceted sphere on two block feet, glowing underside | Hops toward the player; its airborne arc warns of the landing and outward floor waves. | Rests for 1.2 seconds after landing; two hits. Teaches watching the ground and jumping a wave before approaching. |

There are exactly three ordinary enemies across the area: two guards and one stomper.

**Boss: The Bellkeeper**

A broad lathed bell shell over a furnace cylinder, with one long rectangular striking arm. Its outline is approximately two and a half Courier heights.

- **Clapper sweep:** The shell tilts and the arm rises for 600 ms. A low horizontal sweep follows. Jump above its path, retreat beyond reach, or time the invulnerable dash through it. Recovery lasts 900 ms.
- **Furnace stomp:** A floor warning and furnace flare last 500 ms, followed by a 350 ms rise and a slam. Floor waves travel outward. Jump the wave and approach during the 1.1-second recovery.

**Phase change:** At half of its 24-hit health, the shell cracks open for 1.5 seconds. The same attacks remain. Sweep recovery leads directly into the next stomp telegraph; stomp recovery grows to 1.4 seconds. The lesson is a changed rhythm, not a surprise move.

**Defeat and rewards:** The Bellkeeper releases the **Dawn Core**, relighting the local shrine. The optional **Longwick** remains an exploration reward, never a boss prerequisite. In the extended world, the Core powers the Mirror Cuff and the Orchard connection.

**Entry gate:** None; the launch kit is sufficient for every room and the boss.

---

**Area 2: Glass Orchard**

**Purpose and theme:** A sunlight condenser whose artificial trees grow glass storage bulbs. Maintenance continues even though nothing is being distributed.

**Procedural identity:** Forked cylinder trunks, cone branches, faceted glass bulbs, square irrigation beds, and hinged mirror plates. Use opaque faceted surfaces with bright edges rather than depending on intricate transparency.

**Four room roles:** Receiver Porch, Trellis Walk, Lens Shed, Pruning Court.

**Entry gate opened by the previous reward:** The Dawn Core activates the Mirror Cuff at the relit Belfry. At Receiver Porch, a harmless practice emitter faces a sealed receiver. Parry its pulse back to unfold the bridge. The emitter repeats indefinitely; the first lesson cannot injure or strand the player.

**Signature enemies**

| Enemy | Silhouette | Behavior and telegraph | Punish and lesson |
|---|---|---|---|
| Shear Tender | Tall spindle body with two open rectangular blades | Plants its feet and opens its blades for 650 ms before snapping across one lane. A white diamond marks the parryable strike. | Blades jam open for 900 ms; three hits. Teaches parry timing, with jumping or retreating still valid. |
| Lens Sentry | Faceted bulb in a square cradle on a short pedestal | Turns a flat lens toward the player; a narrowing line previews one light pulse for 800 ms. | Lens stays exposed for one second; two hits. Teaches returning projectiles and approaching during a reload. |

**Boss: The Pruner**

A large inverted cone mounted on two piston legs, carrying two long shear bars and a single spherical condenser.

- **Cross-cut:** Blades open wide for 800 ms, then close at chest height. Parry the marked blade or dash through. Recovery: one second with the condenser exposed.
- **Light seed:** The condenser swells for 900 ms, then sends one parryable pulse horizontally. Return it for a stagger, or jump it and close the distance. Recovery: 1.2 seconds.

**Phase change:** At half health, its glass hood separates into three large pieces that remain attached. It alternates high and low pulse lanes, each shown by the aim line. Cross-cut is unchanged. Target health: 24 ordinary hits.

**Defeat and rewards:** The Pruner releases the **Updraft Bellows**. Fit it automatically and practice upward dash on the safe exit ledge. The orchard's shutters open, warming previously dim bulbs. The optional Lens Shed contains one **Lantern Band**, increasing maximum health by one.

**Onward gate:** The Rainworks intake is visibly above ordinary jump height but within jump-plus-upward-dash reach. A lower catch floor makes failed attempts safe.

---

**Area 3: Rainworks**

**Purpose and theme:** The network's heat exchanger, using captured daylight to lift water and send warm rain down to the towns.

**Procedural identity:** Broad copper pipes, stacked cylindrical tanks, square valve housings, and visible piston rods. Water is suggested by layered flat surfaces, falling light streaks, and sound; no fluid simulation is required.

**Four room roles:** High Intake, Piston Walk, Filter House, Pressure Court.

**Entry gate opened by the previous reward:** Use the Updraft Bellows to reach the high intake. The target ledge and a vertical exhaust symbol are visible from the approach. No wall jump or second airborne dash is needed.

**Signature enemies**

| Enemy | Silhouette | Behavior and telegraph | Punish and lesson |
|---|---|---|---|
| Piston Porter | Square weight riding on a thick telescoping cylinder | Compresses for 750 ms and marks its landing column before a vertical slam and low wave. | Remains compressed for 1.1 seconds; three hits. Teaches leaving the column, then using height to avoid the wave. |
| Valve Warden | Round tank body with one horizontal pipe arm | Raises the pipe and previews a low horizontal jet for 800 ms; the jet cannot be parried. | Vents harmlessly upward for one second; three hits. Teaches upward dash as counterplay and recognition of non-parryable attacks. |

**Boss: The Pressure Regent**

Three stacked tank cylinders, two broad piston feet, and a crossbar carrying a pair of pipe mouths. Its long horizontal crossbar distinguishes it from the Bellkeeper.

- **Low purge:** Both pipe mouths open for 900 ms and mark a low band across the arena. Jump or upward-dash above the jet and land beside the body. Recovery: 1.2 seconds.
- **Counterweight drop:** One piston lifts for 850 ms; its landing column is marked. Leave the column, then jump the resulting low wave. Recovery: 1.3 seconds.

**Phase change:** At half health, the upper tank lifts on exposed rods. The two attacks alternate without the extra idle pause, but retain their full telegraphs and recoveries. Target health: 26 ordinary hits. No rising water, falling debris, or summoned enemies.

**Defeat and rewards:** The Regent releases the **Sunwheel**, a mechanical coupling that starts the summit lift. Warm water begins moving downhill. The optional Filter House contains the **Steady Lens**, the first equipment fitting.

**Onward gate:** The Observatory lift has an empty wheel-shaped socket, with its cable visibly continuing upward. The Sunwheel powers the lift permanently.

---

**Area 4: Ash Observatory**

**Purpose and theme:** The network's dispatch station, still measuring the old ash emergency and refusing to open its reserve shutters.

**Procedural identity:** Large segmented circles, angled telescope cylinders, narrow box bridges, broad shutter blades, and a huge pale sun disc in the far background. Ash belongs primarily in the distance; the combat plane stays clear.

**Four room roles:** Lift Crown, Meridian Walk, Keeper's Quarters, Aperture Chamber.

**Entry gate opened by the previous reward:** The Sunwheel powers the summit lift. The arrival opens a direct return stop, removing any need to repeat the Rainworks ascent after death.

**Signature enemies**

| Enemy | Silhouette | Behavior and telegraph | Punish and lesson |
|---|---|---|---|
| Surveyor | Thin tripod with one long horizontal telescope | Tracks slowly, then holds a visible aim line still for 900 ms before firing a parryable pulse. | Lens folds down for one second; three hits. Tests waiting for the committed aim before moving or parrying. |
| Shutter Guard | Two tall rectangular plates around a narrow central body | Plates separate for 700 ms, then close through a clearly marked lane. | Plates remain apart for one second after the strike; four hits. Tests attacking a real opening rather than striking armor repeatedly. |

**Boss: The Last Astronomer**

A telescope barrel carried inside an open segmented ring, supported by two angular legs. The bright central lens acts as its face. The title belongs to the last machine still performing the observatory's original job.

- **Meridian shot:** The barrel tracks, then locks its aim line for 900 ms before firing one parryable pulse. Return it to stagger the lens, or evade and approach. Recovery: one second.
- **Horizon sweep:** A low beam path appears for one second before the barrel sweeps across the floor. Jump or upward-dash over it. Recovery: 1.2 seconds.
- **Shutter fall:** Two large shutter plates mark their landing columns for one second before descending, leaving a broad safe lane. Move or dash into that lane. Recovery: 1.4 seconds.

**Phase change:** At half health, the ring opens and exposes the actual clear sky. The Astronomer begins pairing Meridian Shot with Horizon Sweep, retaining each attack's full warning. Shutter Fall remains a separate attack. Target health: 28 ordinary hits.

**Defeat and rewards:** The **Dawn Seal** unlocks the reserve controls and the ending choice. The optional Keeper's Quarters contains the second and final Lantern Band.

There is no fifth combat area in the committed world. The reserve controls are the payoff room within the Observatory, not another biome or boss.

# 5. Enemy roster rules

- **One job per ordinary enemy.** Define the question it asks: evade a lunge, cross a wave, return a pulse, gain height, or wait for an opening.
- **Health is counted in ordinary hits.** Fragile ranged enemies take two; standard melee enemies take three; armored enemies take four, excluding blocked hits. Health does not rise simply because an area is later.
- **Every attack has an observable commitment.** Use a changed silhouette, a held pose, and a matching sound. New ordinary attacks should begin with roughly 600-900 ms of warning; preserve the first area's existing timings until playtesting justifies a change.
- **Recovery must be useful.** A successful response earns at least one safe ordinary hit; a stronger read or successful parry can earn two. Do not let routine attacks cancel into unannounced retaliation.
- **Teach in isolation.** The first example of an enemy stands on stable ground with retreat space and no simultaneous environmental hazard.
- **Place encounters by hand.** Begin future areas with four to six ordinary enemies total across their non-boss rooms. One active attacker is the norm; two is the ceiling, introduced only after both behaviors are understood.
- **Never spawn reinforcements.** Bosses have no adds; ordinary enemies do not multiply, summon, or pursue the player across room transitions.
- **Protect retries.** Put a checkpoint or unlocked shortcut before each boss. The retry route contains no mandatory ordinary fight and targets less than 15 seconds of travel.
- **Damage belongs to readable actions.** A recovering machine should not punish the player merely for reaching its body.
- **Learnability is an acceptance test.** Within ten minutes of uncoached attempts, a new player should recognize every boss attack and identify its safe response; a victory within that period is the target, not an assumed result.

# 6. Rewards and progression

**Reward vocabulary**

| Kind | Meaning | Committed examples |
|---|---|---|
| Verb | A new player action with traversal and combat uses | Mirror Cuff parry; Updraft Bellows upward dash. |
| Reach | A larger useful interaction envelope | Longwick; increased reach without increased damage. |
| Health | More room to recover from mistakes | Two optional Lantern Bands; five starting health, seven maximum. |
| Traversal | A permanent change to the connected world | Dawn Core connection, Sunwheel lift, shortcuts, Dawn Seal. |
| Equipment | A reversible preference with a clear tradeoff | Steady Lens and Return Prism. |

**Signposting:** Show a reward's consequence before awarding it. The player sees the unlit Orchard receiver, unreachable Rainworks intake, and empty summit-lift socket. Use the same physical motif on the gate and its reward. Optional routes reveal a glow, a distinctive container, or a partial view of the prize; do not require striking every wall.

Longwick remains optional. Any later latch designed for its extra reach must open an optional cache or shortcut, never the sole onward path.

Boss rewards are guaranteed, automatic to understand, and impossible to spend. Place a safe demonstration of a new verb immediately after acquisition. No equipment menu appears during a boss payoff.

**Persistence:** Death restores health at the active checkpoint and resets ordinary encounters and an unfinished boss. Collected rewards, broken cache walls, opened shortcuts, and defeated bosses remain completed. There is no dropped bag, corpse retrieval, currency loss, or score. Extending the game beyond the first area requires discoveries to survive closing and reopening the game.

**Optional vendor: the Lamplighter**

A stationary repair worker at a safe Rainworks stop: squat coat cone, round cap, box workbench, and a hanging lamp. Their presence confirms that people still work here.

The vendor uses **Service Seals**, unique tokens placed in optional service caches. Enemies never drop them. Two seals purchase two fittings, one seal each:

- **Return Prism:** Reflected pulses deal one extra hit of damage; ordinary melee attacks have a slightly longer recovery.
- **Wideglass:** Nearby optional service sockets become easier to spot; the lantern casts less light into the background. It changes exploration comfort, not access.

The freely discovered **Steady Lens** reduces knockback from damage but slightly shortens horizontal dash distance. Every mandatory crossing must remain possible with it fitted.

Equip one fitting at a checkpoint; removing or swapping it is free. The vendor has fixed stock, no random rolls, no repair bills, and no consumable resupply loop. If the vendor is omitted, place its fittings directly in the two service caches.

**Never rewarded:** Experience levels, score multipliers, repeat-kill money, random loot, mandatory consumables, paid retries, or escalating damage upgrades that invalidate earlier fights. Progress is earned by discovery and understanding, never by repeating a cleared room for resources.

# 7. Lore delivery

**Environment carries the argument.** Early machines keep everything sealed and circulating internally. Defeated custodians stop guarding and resume useful work. The player sees closed shutters become windows, empty pipes carry light or water, and distant town windows illuminate.

Each area communicates one fact:

- **Cinder Belfry:** The reserve still works.
- **Glass Orchard:** There is more stored sunlight than the sealed towns are receiving.
- **Rainworks:** Daylight sustains heat, water, and ordinary life.
- **Ash Observatory:** The emergency has ended; the machines have not changed their orders.

Use primitive evidence: a pipe that loops back into its own tank, a shutter facing a clear sky, a public outlet clamped shut. Avoid diaries, collectible essays, and explanatory murals.

**Text budget:** One line for an important pickup, one line for a boss introduction, and short labels at a genuine choice. Boss introduction text appears once; retries begin without repeating it. Spoken dialogue is unnecessary.

**Exact first-area text**

| Moment | Text |
|---|---|
| Longwick pickup | "Longwick: your needle reaches further" |
| Dawn Core pickup | "Dawn Core: the shrine relights" |
| Bellkeeper introduction | "THE BELLKEEPER - No light leaves the reserve." |
| Checkpoint activation | "ember rekindled" |
| Shortcut opening | "the shortcut grinds open" |
| Bellkeeper defeat | "The bell falls silent. The furnace stays warm." |

The two pickup lines preserve the existing first-area wording.

**Future boss introductions**

- Pruner: "THE PRUNER - Nothing ripe may leave the orchard."
- Pressure Regent: "THE PRESSURE REGENT - All warmth returns to storage."
- Last Astronomer: "THE LAST ASTRONOMER - The emergency is not over."

**Ending choice**

After the Astronomer falls, two large controls become available. Preview their consequences in the room before the player confirms either.

- **OPEN THE SKY:** "One sunrise, for everyone." The reserve empties into the sky; distant rooftops brighten and the storage machines come to rest.
- **KEEP THE LIGHT MOVING:** "A morning worth tending." The reserve stays inside the network; pipes and town windows illuminate in a spreading sequence, and the Courier takes up the next delivery lantern.

Neither ending is a secret punishment or an inventory check. Both fulfill the delivery. The choice is between releasing a finite reserve now and accepting the work of maintaining shared access.

The first-area release ends with the shrine relighting. This final choice belongs only to the completed extended world.

# 8. Art direction rules per area

2026-09-16 update: visual execution is being reconsidered through the human-approved candidate/feedback process in `docs/visual-upgrade-plan.md`. Read its "Resume here" section for the human's Paper Mario, Hollow Knight, and Limbo references and the next concept-sheet deliverable. The palette and primitive silhouettes below describe the existing baseline, not a selected outcome of that process. A monochrome treatment is a valid candidate. Preserve original fiction and gameplay readability while exploring.

Current runtime baseline: figures and scenery use procedural primitives, low-poly profiles, flat color, emissive surfaces, and motion. Generated/sourced concept references are allowed in the accepted exploration; which drawn textures, sprites, or other assets ship is decided with the chosen direction.

| Area | Palette: five colors | Light sources | Fog and depth |
|---|---|---|---|
| Cinder Belfry | Charcoal `#151B24`, steel `#66788A`, pale rim `#CAD5DF`, ember `#FFB648`, danger `#FF4B35` | Furnace slots, Courier lantern, checkpoint flame | Blue-gray background fog; layered piers, chains, and oversized bells. |
| Glass Orchard | Deep teal `#102B30`, leaf metal `#47766B`, pale glass `#D5E9CF`, stored gold `#FFD477`, danger `#FF4B35` | Glass bulbs, receiver apertures, shutter gaps | Muted green fog behind the route; angular tree silhouettes in two depth layers. |
| Rainworks | Deep blue `#142B3A`, copper `#A76A43`, water teal `#56A6A0`, warm cream `#F4D69A`, danger `#FF4B35` | Valve windows, warm water outlets, maintenance lamps | Low blue haze behind tanks; falling water stays behind or clearly outside the movement plane. |
| Ash Observatory | Indigo `#202338`, ash `#797C8D`, porcelain `#E8E2D5`, sunrise `#FFD27A`, danger `#FF4B35` | Telescope lens, slit windows, distant sun disc | Violet-gray distance fog; clear foreground, sparse distant ash, broad empty sky around the boss. |

**Shared visual grammar**

- **Safe:** A steady gold light inside a round housing, with level footing beneath it. Checkpoints use an open cup silhouette.
- **Danger:** An extending weapon, closing plate, moving wave, marked impact column, or active jet. Red reinforces the signal; color alone never defines it.
- **Parryable:** A white diamond briefly closes around the striking point, paired with a crisp rising ping.
- **Not parryable:** A broad band or broken rectangular warning, paired with a low mechanical pressure sound.
- **Traversal gate:** The same recognizable socket or machine part appears on both obstacle and reward.
- **Optional reward:** A contained warm glow, visible through an opening or above a short branch.

**Legibility rules**

1. Walkable edges receive a continuous pale rim and a darker vertical face; decorative background beams do not receive the same rim.
2. Foreground decoration never covers the Courier, the landing edge, or an attack's point of contact.
3. Backgrounds have lower contrast and slower motion than enemies and platforms.
4. Bloom may soften a lamp but must preserve the contour of a weapon, floor wave, or platform edge.
5. Telegraphs show the actual threatened space. Do not draw a decorative warning larger or smaller than the attack.
6. Keep the destination ledge and relevant enemy visible during mandatory movement decisions.
7. Recovery is a pose: blades lodged open, lens folded down, piston compressed. A stopped animation alone is insufficient.
8. Camera shake follows impact; it does not obscure the warning before impact.

# 9. Audio direction

Use **one verified CC0 instrumental loop per area**. These are selection briefs, not claims that a particular recording has been found or licensed. Record the selected track's creator, source, and CC0 declaration when it is chosen.

Boss encounters retain the area's loop. Mechanical cues and changes in music level provide intensity without requiring another composition.

| Area | Musical mood | Instrumentation brief |
|---|---|---|
| Cinder Belfry | Work beginning under pressure | Low struck metal, restrained drum pulse, warm sustained organ tones; sparse enough for bell telegraphs. |
| Glass Orchard | Precise, curious, slightly brittle | Glass-like plucks, muted mallets, soft sustained harmony; avoid constant bright ticks that resemble parry cues. |
| Rainworks | Patient physical momentum | Low hand drums, woody knocks, rounded bass, slow repeating figures; leave space for pressure hisses. |
| Ash Observatory | Open, exposed, expectant | Sparse piano or mallets, airy sustained tones, long rests, restrained rising harmony; no continuous dramatic choir. |

Favor seamless loops of roughly one to two minutes, with no vocals and no large volume jumps. Music must leave enemy warnings audible at a comfortable overall volume.

**Sound effect generation brief:** Isolated sounds, no music, no speech, clean endings. Keep interaction sounds short; allow longer tails only for major machinery and rewards.

| Event | Short prompt |
|---|---|
| Footstep | "Small boot on hollow metal, dry soft tap." |
| Jump | "Coat flick and brief warm air puff." |
| Landing | "Light boot thud, tiny lantern rattle." |
| Needle attack | "Thin metal rod cutting air, quick dry swish." |
| Successful hit | "Sharp tool impact on hollow machine casing." |
| Armored hit | "Dull iron clank, short rejected scrape." |
| Horizontal dash | "Compact pressure release, fast warm whoosh." |
| Player hurt | "Lantern glass rattle and clipped steam sputter." |
| Player death | "Small flame gutters, brass housing settles." |
| Checkpoint and respawn | "Flame catches, two warm bell notes." |
| Enemy defeat | "Mechanical tension releases, two small metal falls." |
| Guard warning | "Short ratchet pull, held spring click." |
| Stomper landing | "Heavy round boiler thump, low outward rumble." |
| Bellkeeper sweep warning | "Large bell arm creaks upward, restrained metal strain." |
| Bellkeeper stomp warning | "Furnace pressure rises, deep hollow intake." |
| Boss impact | "Heavy iron strike, short bass thump, clear decay." |
| Boss phase change | "Thick casing cracks, pressurized light escapes." |
| Cache wall breaking | "Brittle mortar cracks, compact stone scatter." |
| Pickup | "Small warm chime, rising second note." |
| Dawn Core | "Deep bell opens into a warm sustained chord." |
| Shortcut opening | "Chain wheel turns, gate settles into place." |
| Parry warning | "Single clean rising glass ping." |
| Successful parry | "Bright glass-metal snap, compact ringing tail." |
| Returned pulse | "Tight light pulse reverses with a brief whistle." |
| Upward dash | "Focused pressure burst rising sharply, no explosion." |
| Shear attack | "Large pruning shears close, clean metal snap." |
| Water or steam jet | "Valve opens into a short forceful hiss." |
| Observatory aim lock | "Lens ring clicks into position, high clear tone." |
| Lift activation | "Large coupling catches, steady motor begins." |
| Menu and fitting swap | "Quiet brass button click, tiny confirmation chime." |

Variations in pitch and material can distinguish related machines; warnings for the same action retain the same rhythm across areas.

**Procedural fallback:** Replace missing effects with short pitched tones, filtered noise, and low impact pulses. Preserve distinctions between warning, attack, hurt, and success. If an area's CC0 loop is unavailable, use a sparse procedural pulse and sustained tones until it is sourced. Every attack remains readable with sound muted.

# 10. Expansion order with rough effort

Estimates are agent working time under one engineer's direction, including playtesting and adjustment. They are content budgets, not a schedule for the initial build.

| Order | What to build | Effort | Needs from earlier work | Exit criterion |
|---|---|---|---|---|
| 1 | **Mirror Cuff and continuity:** Dawn Core activates parry; add the safe receiver lesson at the future Orchard threshold; preserve discoveries between visits and sessions. | 0.5-1 day | First area, Dawn Core, checkpoint progression | A fresh player returns a pulse into the receiver without coaching, and death or reopening the game preserves the reward and opened gate. |
| 2 | **Glass Orchard and Updraft Bellows:** Four rooms, two enemy types, Pruner, optional health band, CC0 loop, and safe upward-dash exit lesson. | 1-2 days | Parry, receiver grammar, persistent discoveries | An uncoached player can explain the Pruner's two attacks and use the earned upward dash to reach the onward ledge. |
| 3 | **Rainworks:** Four rooms, two enemy types, Pressure Regent, Sunwheel, free Steady Lens pickup, and one CC0 loop. | 1-2 days | Upward dash and the distinction between parryable strikes and broad hazards | The area tests vertical evasion, its boss remains learnable within ten minutes of attempts, and the Sunwheel permanently opens the summit lift. |
| 4 | **Equipment and Lamplighter:** One fitting slot, the vendor's two fixed purchases, and two optional Service Seal caches in existing areas. | 0.5-1 day | Rainworks safe stop, Steady Lens, established optional routes | Each fitting has an understandable tradeoff, and all mandatory routes remain completable with any fitting or none. |
| 5 | **Ash Observatory and ending:** Four rooms, two enemy types, three-attack Astronomer, Dawn Seal, two environmental endings, and one CC0 loop. | 1-2 days | Sunwheel lift, learned parry and upward dash, stable reward continuity | A new player completes the connected route, understands both ending choices, and sees the chosen consequence without a lore explanation. |

If an area exceeds its block, simplify scenery motion or reuse an enemy movement family before adding time. Preserve the area's boss, readable reward, and return route. The vendor can remain direct cache rewards indefinitely.

Wall jump, pogo, charged attack, and ranged combat wait until these five blocks are complete and a new area provides a concrete reason for one of them.

# 11. Fit checklist

Before adding anything, answer all ten questions with yes:

1. **Does it fit a world where daylight is a public resource trapped inside useful machines?**
2. **Can its identity be read from primitive geometry, palette, light, and motion at gameplay size?**
3. **Does it preserve side-view exploration, checkpoint retries, and the absence of score or grinding?**
4. **Does every new enemy placement teach or test a specific decision without creating a swarm?**
5. **Does every damaging action have a visible warning, a dependable safe response, and a useful recovery window?**
6. **Can an uncoached player learn every boss attack within ten minutes of attempts?**
7. **If it adds a verb or reward, does a visible obstacle or counterplay opportunity justify it?**
8. **Can the mandatory route be completed without optional caches, vendor purchases, or a particular equipment fitting?**
9. **Does its story contribution remain understandable through the environment and at most one short line at the relevant moment?**
10. **Does it fit its expansion block, including its audio and playtest criteria, without depending on an uncommitted future system?**
