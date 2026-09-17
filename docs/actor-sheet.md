# Actor construction sheet: tin puppets

Date: 2026-09-17. Supersedes the Actors section of `docs/style-sheet.md` for construction; that sheet's value ramp, chroma rules, and acceptance still bind. Decision record: lifecycle record, Decisions 2026-09-17 10:00.

## Why

Three rounds of solid 3D actors (lathe coats, boxes, spheres, lit by a point light from inside) produced a blob at gameplay scale, a lantern that lit the shoulders, and a boss that read as a fixture. Patching moved the mess around. The construction changes instead: every actor is built from flat plates, so it is a silhouette by definition, it is unlit so no light can leak, and its motion is articulation at pins, which the existing pose code already drives.

The look: tin shadow puppets in an iron belfry. Thin cut-metal plates, layered a few millimetres apart, joined at riveted pins, hanging in a world of cast iron and stone. Paper Mario supplies the idea of flat characters with thickness in a solid world; the material and the fiction are ours.

## Construction rule (all actors)

- A plate is a 2D silhouette (`THREE.Shape`) extruded to `feel.actorPlateDepth` (new key, default 0.06), no bevel. Flat, unlit material: `look.material(role, { unlit: true })`. The dark edge comes from the screen-space ink pass in `postfx.ts` (since 2026-09-17 12:55; look c has the hull-shell `applyOutline` off); no per-plate outline geometry.
- Plates stack along z in steps of `feel.actorPlateStep` (new key, default 0.035). Back layer (hood, cape, shell) one step behind the body; far limbs one step behind; near limbs one step in front; props (lantern, needle, blade) two steps in front. The stack never exceeds five layers.
- Pins: porcelain discs of radius `feel.actorPinRadius` (new key, default 0.028) on the front face at every joint that rotates (shoulders, hips, knees, elbow on the lead arm, the Bellkeeper's arm roots). The rivet is the architecture's motif; the pin is the same motif on the body.
- Values per plate, fixed: body plates slate; back plates charcoal; near-limb and accent plates ash; rims, pins, and highlight cuts porcelain; face openings and the Bellkeeper's interior void. A plate has one value. Shading comes from which layer it is on, never from lighting.
- Chroma: amber only on the courier's lantern glass and flame, the stomper's underglow at rest, and the Bellkeeper's mouth at rest and in recovery. Vermilion only on a committed weapon: the guard's visor slit and blade during telegraph and attack, the stomper's underglow during the hop, the Bellkeeper's visor and mouth during a telegraph and active frames.
- Facing: mirror the whole figure with `group.scale.x = facing`. Plates are asymmetric so each actor has a front (the lantern side, the blade side, the lead arm).
- Articulation: joints are `THREE.Object3D` pivots at the pins; a pose sets rotations, never translations of the plates. Squash and stretch scale the root group. At rest nothing moves except a one-degree breath on the head plate (courier) or the head lift (Bellkeeper).
- Lights: the courier's lantern keeps a `PointLight` for the world (keys `playerLightIntensity`, `playerLightDistance`), placed two steps in front of the lantern plate so it lights the room, not the figure. No other actor carries a light except the Bellkeeper's mouth light (existing `bossFurnaceLight*` keys). The figures themselves are unlit.
- Collision boxes, hit timing, telegraph durations, `src/game/`, the effects layer's arcs, bursts, ridges, and the HUD do not change.

## Courier (1.2 tall, collision 0.6 x 1.2)

One dominant value (revised 2026-09-17, v4). The first build spread ash near limbs over a slate torso over a charcoal cape and put a porcelain pin at every joint: bones through a body, vertebrae down the limbs. The courier now carries one value and four porcelain accents, and its personality is in the silhouette instead.

Values: torso, near leg, near arm, both boots, the head (hood body), the satchel, the needle body, the ferrule and the eye ring are all slate. The cape-hood, the hood point, the far leg and the far arm are charcoal. Ash is gone from the courier. Porcelain appears at exactly four places: the collar line, the hood's face-edge rim, the lantern frame and bail, and the needle's tip tenth (plus the satchel's buckle dot). The face opening is void. Amber is the lantern glass and flame only.

Pins: only at the shoulders and the hips, and drawn as dimples, not rivets: a disc of `feel.actorPinRadius` in slate darkened by a `DIMPLE_SHADE` constant in `playerMesh.ts` (the file already carries its proportions as constants; no tuning key was added). The knee and elbow pins are cut.

Plates, back to front: cape-hood (charcoal, one shape: a hood with a forward peak flowing into a short cape above the knees, hem cut in four uneven ragged notches), hood point (charcoal, a tapered tail trailing back from the crown on its own pivot), far leg, far arm, satchel (slate, a rectangular flap bag on the back at the hip, flap wider than the body, with a porcelain buckle dot), torso (slate keel, narrow waist, square shoulders 0.5 wide, porcelain collar cut where hood meets torso), head (slate hood face-plate with a void face opening and a thin porcelain crescent along the front edge only, from the forward slope of the crown down to the jaw; it must not close over the crown or it reads as a ring), near leg, near arm with the needle, boots, lantern plate hung from the off hand at chest height.

Proportions from the floor: boots 0.1, legs to hip 0.5, torso to shoulder 0.42, head 0.28 with the hood peak overhanging forward 0.08. Shoulder width 0.5, hip width 0.3. The courier reads as a slight figure carrying a light.

The wick needle: a tapered slate plate 0.95 body heights long at rest (`needleRestLengthRatio`), ferrule block at the hand, an eye ring (a small torus) at the ferrule end, the last tenth porcelain. Rest angle `needleRestDeg` about -55 (held low and close), attack sweeps between `needleBackDeg` and `needleFrontDeg` as today, active-frame stretch as today. At full extension the tip lands at the attack reach so the hit reads true.

Poses (existing keys drive them): run (hip and shoulder swing `legSwingDeg`, `courierArmSwingDeg`, knees `courierKneeBendDeg`, lean `courierLeanRunDeg`, cape hem swing `courierHemSwingDeg`; the hood point rides the same hem angle, scaled by a constant so it trails further than the hem), jump (anticipation crouch `courierJumpCrouch` over `courierJumpAnticipateMs`, apex stretch `courierApexStretch`, cape flares `courierHemFlareAir`), dash (root stretch `dashStretch`, cape trails), attack (lead arm and needle arc, torso twist `courierAttackTwistDeg`), hurt (recoil `courierHurtRecoilDeg`, blink via material color, not opacity), death (crumple at hip and knee over `courierDeathCrumpleMs`, lantern gutters over `courierGutterMs`: flame shrinks to nothing, glass goes charcoal, the point light fades).

## Cinder Guard (0.8 x 1.0)

A squat iron figure: body plate (slate, a riveted breastplate silhouette with three porcelain rivet cuts), helmet plate (ash, one piece with the body's silhouette continuing up, a horizontal visor slit cut through to a void back-plate; the slit turns vermilion on telegraph and attack), two leg plates (ash near, slate far) with block feet, one arm plate carrying a short cleaver blade (porcelain edge, vermilion on commit). Patrol: a heavy two-beat walk (`enemyLeanDeg`). Telegraph: body leans back, blade arm rises over the head. Lunge: body leans in, blade sweeps down. Recover: blade stuck low, helmet dips (`guardSlumpDeg`). Hurt: recoil `enemyRecoilDistance`. Death: fade `enemyDeathFadeMs`, plates drop one step.

## Boiler Stomper (0.9 x 0.8)

A riveted boiler drum on block feet: drum plate (slate, a rounded rectangle with two porcelain band lines cut across it and a row of rivet pins), two foot plates (ash, blocks with a porcelain toe line), an underglow plate beneath the drum (amber at rest, vermilion during the hop), a small chimney stub on top. Idle: nothing moves. Hop: drum squashes (`stomperSquash`), feet tuck; landing: drum stretches, feet spread, dust puffs from the effects layer. Death: the drum plate tips and the underglow goes out.

## Lamplighter (0.8 x 0.9, hovering)

A brass hanging lamp that is also a creature. It never touches the floor and has no legs. Plates, back to front: hood-cowl (charcoal, an oil-lamp chimney cap flared wider than the lantern), lamp glass (the window plate, amber at rest, seen through the cut), lamp body (slate, a tapered lantern box wider at the top with a void window cut through to the glass), cap rim and base rim (porcelain lines closing the box top and bottom), keeper (slate, one plate: a small hooded figure crouched on the cap, offset forward, hood peak overhanging the lantern's front), wick-pole (slate, one plate swung from the keeper's hand, last tenth a porcelain tip), two chain tails hanging below the base rim (porcelain link plates cut through, two links on the back tail and three on the front so they never read as a pair of legs). Pins at the pole root, the keeper's seat, and both chain roots.

Chroma: amber in the lamp window at rest, vermilion in the window during telegraph and the tick of the drop, nothing else. Slate is the dominant value.

Bob is the simulation's (`bobAmp`, `bobSpeed`) and the render adds none.

Poses by `EnemyState`: patrol (a one-degree breath on the keeper and the lamp, chains sway off the drift, pole held low and forward); telegraph (the lamp leans toward the courier, the keeper tips forward, the pole rises, the window ramps to vermilion over `dropTelegraphMs`); attack (pole dips hard, keeper thrusts forward, window full vermilion, the ember leaves the chain tails); recover (pole hangs low, keeper sags back, window amber again); hurt (recoil `enemyRecoilDistance`, keeper rocks back, blink via material color); dead (the window goes charcoal, the figure drops one step and fades over `enemyDeathFadeMs`).

No floor mark. The threatened area is the falling ember, not the lamp's own footprint, so `fx.ts` draws no telegraph box for this kind; the wind-up is read from the pose and the window.

Ember hazard (`fx.ts`): a hazard of kind `ember` renders as an amber diamond at `emberWidth` x `emberHeight` with three fading diamonds trailing back up the fall line; kind `wave` keeps the ridge exactly as before. Ridges and embers are separate pools with separate per-frame cursors and both pools are swept invisible past their cursor, so a hazard slot recycled from one kind to the other never leaves the other mesh on screen. An ember's birth spawns no dust puff; it is born in the air.

## The Bellkeeper (3 x 3)

A hunched tin figure that wears the bell. It hangs from the yoke and chain above by two shorter chains to its shoulders, a marionette in its own belfry. Plates, back to front: shell-cape (charcoal, the bell silhouette from the shell profile, with the crack shape cut through it and a void back-plate visible through the crack when it opens), far arm, torso plate (slate, a stooped keel that rises out of the bell's rim like a figure wearing it as a skirt), head plate (ash, a helmet with a grille visor: three vertical slits cut through to a void back-plate; the slits glow vermilion during telegraphs and active frames, otherwise they are dark), near arm, mouth plate at the shell base (the mouth shape, amber at rest, vermilion during a telegraph and active frames, brighter in phase two). Arms: two segments of chain-link plates (four links each, porcelain edges) ending in clapper heads (slate discs with a porcelain rim); the lead arm is the striking arm and reaches `sweepReach` at full extension.

Poses by `BossState`: dormant (arms hang, head down, mouth dim amber); idle (head lifts one degree on the render clock, a faint breath at the mouth); sweepTelegraph (head turns to the courier, visor vermilion, lead arm winds back and up over `sweepTelegraphMs`); sweepActive (arm sweeps through the reach, mouth vermilion); sweepRecover (arm dropped low, head sags, mouth amber, the visor dark: this is the punish window and it must look like one); stompTelegraph (shell and torso compress `bellCompress`, both arms rise, visor vermilion); stompRise (figure lifts `bossStompLift`-style on the root); stompSlam (drops, arms slam, dust from the effects layer); stompRecover (figure settled low, head down); crack (the crack opens: the cut plate splits and the void shows, visor and mouth flare, phase two glow after); dead (figure sags on its chains, visor dark, mouth stays warm amber: the furnace stays warm).

## Telegraphs (effects layer, `src/render/fx.ts`)

The filled vermilion floor marks are cut. `placeMark` draws edges only; fill opacity is zero. The edge shows for the first `feel.telegraphEdgeFraction` (new key, default 0.4) of the telegraph duration and then goes out, so the last part of the wind-up is read from the body. Marks stay exactly the threatened area (the sheet's rule). Stomp wave ridges are hazards, not telegraphs, and stay.

## Verification for the build

- `npm run check` green. Unreferenced tuning keys removed after the rebuild (a scratchpad script that greps every key across `src/`, `scripts/`, `test/` exists; rerun it).
- Captures at 960x540, cap eight, under `docs/evidence/actors/v3-*.png`: courier idle, run, attack (mid active), hurt or death; guard telegraph; stomper hop; Bellkeeper sweep telegraph and stomp telegraph in the fight; one grayscale of the Belfry fight.
- Acceptance: at gameplay scale each actor is a clean one-value silhouette with a readable front; the courier's brightest point is the lantern glass; the Bellkeeper reads as a creature that wears a bell and hangs from chains; every telegraph is legible from the pose alone in the last part of its wind-up; all four actors are obviously one family with the architecture's rivets and pins.
