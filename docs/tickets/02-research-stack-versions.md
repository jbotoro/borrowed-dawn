# 02 Research: pinned stack versions and API shapes

Label: wayfinder:research (AFK)
Blocked by: none
Claimed by: research subagent, 2026-09-16
Status: closed 2026-09-16

## Answer

Pinned: three 0.186.0, @types/three 0.185.4, vite 8.3.0, typescript 7.0.2, vitest 5.0.0, lil-gui 0.21.0, howler 2.2.4, @types/howler 2.2.13. Postprocessing addons still import from `three/addons/postprocessing/`; `OutputPass` is required after bloom; ACES tone mapping. InstancedMesh per-instance color: `instanceColor` attribute, `setColorAt`, `needsUpdate`. Vite `base: '/one-more-run/'`. Pages via `actions/deploy-pages`; milestone sub-builds have no first-class pattern, so they are snapshotted into `public/builds/<tag>/` and shipped with every deploy (code plan decision). Chrome DevTools MCP: `.mcp.json` with `npx -y chrome-devtools-mcp@latest`, it launches its own Chrome, Node LTS. Two subagent claims were corrected after verification: EffectComposer is not deprecated for WebGL, and no remote-debugging-port flag is needed.

## Question

What are the exact current versions and API shapes for three (postprocessing addons, InstancedMesh per-instance color), Vite on GitHub Pages with a subpath and tagged sub-builds, Chrome DevTools MCP configuration and tool names, and lil-gui save/load, so implementation agents do not guess?

## Resolution

Findings land in `docs/research/stack-versions.md`. Pinned versions go into `package.json` by ticket 01.
