# Visual production options

Research date: 2026-09-16. Scope: a two-day visual upgrade of Borrowed Dawn using the existing Three.js WebGL renderer. This is planning research, not an implemented or visually verified change.

## Recommendation and constraint

Production judgment: establish one approved gameplay composition, then build a small reusable art system around it. Keep procedural animated actors and collision geometry initially. If the human chooses a direction that needs painted detail, introduce a narrowly scoped set of static background layers, surface textures, and decorative cutouts before attempting animated image characters.

The repository currently has a stronger restriction than just avoiding 3D imports: `CLAUDE.md` bans imported/generated models **or sprites**, and `docs/wayfinder-map.md` says no imported/generated art. The user's current request explicitly opens generated/sourced options for consideration. Runtime 2D artwork is therefore a proposed change to the recorded production constraint, not something the existing rules already permit. Concept images used only to choose direction are separate from runtime assets. Imported/generated 3D models remain outside the proposed approach.

## Verified renderer options

| Need | Verified support | Production implication |
| --- | --- | --- |
| Stylized shading on existing geometry | `MeshToonMaterial` supports a `gradientMap`; its min/mag filters must use `NearestFilter`, with `NoColorSpace` for that map. [Three.js r186 source](https://raw.githubusercontent.com/mrdoob/three.js/r186/src/materials/MeshToonMaterial.js) | Test a restrained shading ramp on the Courier and Bellkeeper before converting every material. A material swap cannot repair a weak silhouette. |
| Painted background or surface color | Texture color data requires a color-space annotation; ordinary color maps generally use `SRGBColorSpace`, while alpha/normal maps are non-color data. [Three.js r186 material source](https://raw.githubusercontent.com/mrdoob/three.js/r186/src/materials/MeshToonMaterial.js) | Treat consistent color processing as part of art acceptance. Inspect imported colors through the actual game postprocessing. |
| Final display conversion | `OutputPass` includes tone mapping and output color conversion using renderer settings. [Official documentation](https://threejs.org/docs/pages/OutputPass.html) | Preserve the existing output conversion; check whether exposure/bloom changes flatten the selected palette. |
| Decorative cutouts and soft effects | Material opacity, `transparent`, `alphaTest`, and `depthWrite` are supported. Alpha testing discards fragments below a threshold; transparent objects receive different rendering treatment. [Three.js r186 source](https://raw.githubusercontent.com/mrdoob/three.js/r186/src/materials/Material.js) | Use cutout treatment for hard silhouettes where suitable, and deliberate depth ordering for translucent smoke/glow. Verify crossings and camera motion rather than accepting one still. |
| Atlases / frame sheets | Texture UV transforms include `offset` and `repeat`; multiple textures can share source image data with separate transforms. [Three.js r186 source](https://raw.githubusercontent.com/mrdoob/three.js/r186/src/textures/Texture.js) | A small atlas is feasible. Frame timing, pivots, padding, batching, and animation completeness remain application work, not automatic benefits of an atlas. |
| Billboard vs fixed artwork | Three.js `Sprite` faces the camera. [Three.js r186 source](https://raw.githubusercontent.com/mrdoob/three.js/r186/src/objects/Sprite.js) | Fixed XY planes are the more explicit default for side-view scenery; billboards suit camera-facing effects. |

## Asset pipeline tradeoffs

These are production judgments, not empirical claims about any particular image model.

- **Procedural art throughout:** least pipeline disruption and easy animation reuse. Quality depends on authored proportions, composition, materials, and motion; adding primitive count is not an art direction.
- **Hybrid procedural actors plus illustrated environment layers:** strongest candidate for a short experiment. Static art has fewer required states, but perspective, scale, edge treatment, lighting, and texture density must match the actors. A beautiful flat concept image does not prove a playable scene will hold together.
- **Full illustrated character replacement:** highest schedule uncertainty. Every locomotion/combat state needs consistent anatomy, costume, weapon position, contact points, facing, and timing. One appealing character image is not an animation asset pack. Defer unless a complete, compatible set already exists and passes a short in-game test.
- **Sourced packs:** judge a pack as a coherent system, not a collection of individually attractive assets. Before import, record its source, license/attribution requirements, intended use, and any edits. Mixing packs creates additional matching work.

For any raster experiment, specify the destination before generation: the exact camera/layout reference, palette, image dimensions, layer role, transparency needs, empty gameplay corridor, edge treatment, and whether the asset repeats. Give selected assets stable filenames and a compact manifest containing source, approval, and intended room/layer. Judge the in-engine result at gameplay size and while moving.

## First-party reference shortlist

Use these as study sources for particular qualities, not as asset sources or promises of comparable production scope.

- **INSIDE:** Playdead provides a screenshot gallery and trailers. Study side-view staging, restrained environmental contrast, and the separation of character action from background depth. This is the closest reference here for composition using 3D scenes. [Official game page and gallery](https://www.playdead.com/games/inside/)
- **Paper Mario: The Thousand-Year Door:** Nintendo provides gameplay images and describes a consistent paper world. Study how one material premise can organize characters, environment, effects, and presentation. Borrow the consistency principle, not the characters or comic tone. [Official Nintendo page](https://www.nintendo.com/us/store/products/paper-mario-the-thousand-year-door-switch/)
- **Neva:** its publisher describes minimal UI and traditional animation, alongside official footage. Study graphic clarity and how motion contributes to perceived finish; treat full traditional animation as an aspirational reference rather than the two-day production plan. [Official publisher launch article](https://www.devolverdigital.com/propaganda/gorgeous-epic-neva-available-now)

The comparison criteria and application to Borrowed Dawn above are art-direction recommendations. No reference media was downloaded or imported into the game.
