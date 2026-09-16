# Three.js + TypeScript + Vite Browser Game Stack

**Research Date: September 16, 2026**

## 1. Current NPM Package Versions

| Package | Version | Published | URL |
|---------|---------|-----------|-----|
| `three` | 0.186.0 | 8 days ago | https://www.npmjs.com/package/three |
| `vite` | 8.3.0 | 4 days ago | https://www.npmjs.com/package/vite |
| `typescript` | 7.0.2 | July 8, 2026 | https://www.npmjs.com/package/typescript |
| `vitest` | 5.0.0 | 9 days ago | https://www.npmjs.com/package/vitest |
| `lil-gui` | 0.21.0 | 10 months ago | https://www.npmjs.com/package/lil-gui |
| `howler` | 2.2.4 | 3 years ago (stable) | https://www.npmjs.com/package/howler |
| `@types/three` | 0.185.4 | 1 month ago | https://www.npmjs.com/package/@types/three |
| `@types/howler` | 2.2.13 | 3 months ago | https://www.npmjs.com/package/@types/howler |

### Breaking Changes (Three.js r170+)

**Correction (verified 2026-09-16 against the official Migration Guide):** the r182 to r183 entry says only "PostProcessing has been renamed to RenderPipeline". That is the WebGPU-path class (`three/webgpu`), not `EffectComposer`. The guide does not deprecate `EffectComposer` for `WebGLRenderer` in r180 through r186. Decision for this project: `WebGLRenderer` + `EffectComposer` + `UnrealBloomPass` + `OutputPass` is the baseline; `RenderPipeline` is only relevant if the WebGPU stretch is taken.

Postprocessing addons import path: `three/addons/postprocessing/` (unchanged through r186)

---

## 2. WebGLRenderer + EffectComposer + UnrealBloomPass Setup

### Minimal Setup Code

```javascript
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Composer
const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,    // strength (0-3)
  0.4,    // radius (0-1)
  0.85    // threshold (0-1)
);

const outputPass = new OutputPass();

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(outputPass);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  composer.render();
}
animate();
```

**Key Settings:**
- Tone mapping: `ACESFilmicToneMapping` for bloom-friendly HDR workflow
- Exposure: typically 0.1–2.0 range, start at 1.0
- **OutputPass is required** to finalize tone mapping and color space conversion
- All three addons (`EffectComposer`, `UnrealBloomPass`, `OutputPass`) are imported from `three/addons/postprocessing/`

---

## 3. InstancedMesh with Per-Instance Color

### Setup

```javascript
const count = 1000;
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Material must have vertexColors enabled
const material = new THREE.MeshPhongMaterial({ vertexColors: true });
const mesh = new THREE.InstancedMesh(geometry, material, count);

// Initialize instanceColor (must be done before setColorAt)
if (mesh.instanceColor === null) {
  mesh.instanceColor = new THREE.BufferAttribute(
    new Float32Array(count * 3),
    3
  );
}

// Set per-instance colors
const color = new THREE.Color();
for (let i = 0; i < count; i++) {
  color.setHSL(Math.random(), 0.7, 0.5);
  mesh.setColorAt(i, color);
}

// CRITICAL: Mark as needing update
mesh.instanceColor.needsUpdate = true;

// Also set transform
const matrix = new THREE.Matrix4();
for (let i = 0; i < count; i++) {
  matrix.setPosition(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50
  );
  mesh.setMatrixAt(i, matrix);
}
mesh.instanceMatrix.needsUpdate = true;
```

### Key Points

- `instanceColor` is `null` by default; create and assign before calling `setColorAt()`
- After all `setColorAt()` calls, set `instanceColor.needsUpdate = true`
- Material must have `vertexColors: true`
- Each color is a `THREE.Color` object passed to `setColorAt(index, color)`
- Set transforms with `setMatrixAt()` and mark `instanceMatrix.needsUpdate = true`
- Frustum culling works automatically with InstancedMesh

---

## 4. Vite + GitHub Pages Deployment

### vite.config.js for Repository Subpath

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  // For repo at https://github.com/username/repo-name
  base: '/repo-name/',
  build: {
    outDir: 'dist',
  },
})
```

For root domain (username.github.io), use `base: '/'` or omit it (defaults to `/`).

### GitHub Actions Workflow

Save as `.github/workflows/deploy.yml`:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7
      
      - name: Set up Node
        uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7
        with:
          node-version: lts/*
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@45bfe0192ca1faeb007ade9deae92b16b8254a0d # v6
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9 # v5
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@368f82528645a54fb793d4d04e342629a3f51346 # v5
```

### Tagged Release Subdirectory Deployment

**Status:** No single official pattern. Requires custom workflow step. Common approach:

1. Use `s0/git-publish-subdir-action` to push a subdirectory as a branch
2. Trigger on `push` with tag matching (e.g., `tags: 'v*.*.*'`)
3. Set target branch to a subdirectory-specific branch (e.g., `gh-pages-builds`)
4. Configure GitHub Pages to serve from that branch under a custom subdirectory routing

This is **not yet a first-class GitHub Pages feature**; most projects use custom matrix workflows or separate deploy actions per tag.

---

## 5. Chrome DevTools MCP Configuration & Tools

### Claude Code Configuration

**Corrected 2026-09-16 against the official README.** Claude Code reads a project-level `.mcp.json` (the Claude Desktop config path is a different product). The package is `chrome-devtools-mcp`, and the server launches its own Chrome the first time a tool needs one; no manual Chrome launch or remote-debugging port is required (those are only for attaching to an existing browser). Node LTS is required.

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

Tool names (from `docs/tool-reference.md`): `navigate_page`, `take_screenshot`, `list_console_messages`, `get_console_message`, `evaluate_script`, `resize_page`, `press_key`, `click`.

### Chrome Launch (only when attaching to an already-running Chrome; not the default)

```bash
# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# Linux
google-chrome --remote-debugging-port=9222

# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

### Available Tools

| Tool | Purpose |
|------|---------|
| `navigate_page` | Load URL, back, forward, or reload |
| `take_screenshot` | Screenshot with optional file path |
| `take_snapshot` | Text snapshot of page (accessibility tree) |
| `list_console_messages` | All console output since last nav |
| `get_console_message` | Fetch individual message by ID |
| `list_pages` | View all open tabs |
| `new_page` | Open new tab with URL |
| `select_page` | Switch active tab |
| `close_page` | Close tab |
| `wait_for` | Wait for text to appear on page |
| `evaluate_script` | Run JavaScript |

---

## 6. lil-gui API: Folders, Ranges, onChange, Save/Load

### Complete Example

```javascript
import GUI from 'lil-gui';

const params = {
  position: { x: 0, y: 0, z: 0 },
  material: { color: '#ff0000', roughness: 0.5 },
  settings: { debug: false },
};

const gui = new GUI({ title: 'Game Settings' });

// Folder for organized controllers
const posFolder = gui.addFolder('Position');
posFolder.add(params.position, 'x', -10, 10, 0.1);
posFolder.add(params.position, 'y', -10, 10, 0.1);
posFolder.add(params.position, 'z', -10, 10, 0.1);

// Material folder with onChange
const matFolder = gui.addFolder('Material');
matFolder.addColor(params.material, 'color').onChange(val => {
  console.log('Color changed:', val);
});
matFolder.add(params.material, 'roughness', 0, 1, 0.01).onFinishChange(val => {
  // Fires only after focus lost (expensive operations)
  expensiveUpdate(val);
});

// Settings
gui.add(params.settings, 'debug').onChange(val => {
  renderer.debug.wireframe = val;
});

// Save and load state
let savedState = {};

gui.add({ save: () => {
  savedState = gui.save(); // Captures all folders and controllers
  console.log('Saved:', savedState);
}}, 'save');

gui.add({ load: () => {
  if (Object.keys(savedState).length > 0) {
    gui.load(savedState); // Restores all values
    console.log('Loaded');
  }
}}, 'load');

// Persist to localStorage (manual)
window.addEventListener('beforeunload', () => {
  localStorage.setItem('gui-preset', JSON.stringify(gui.save()));
});

window.addEventListener('load', () => {
  const saved = localStorage.getItem('gui-preset');
  if (saved) gui.load(JSON.parse(saved));
});
```

### Key API Points

- `gui.save()` returns hierarchical object: `{ controllers: {...}, folders: {...} }`
- `gui.load(data)` restores from saved object
- `gui.save(false)` ignores nested folders (recursive=false)
- `onChange()` fires on every change; `onFinishChange()` fires only on blur
- Controllers are auto-named from property keys; name collisions throw error
- GUI is fully compatible with JSON serialization for localStorage

---

## Pinned Versions (package.json)

```json
{
  "dependencies": {
    "three": "^0.186.0",
    "howler": "^2.2.4"
  },
  "devDependencies": {
    "vite": "^8.3.0",
    "typescript": "^7.0.2",
    "vitest": "^5.0.0",
    "@types/three": "^0.185.4",
    "@types/howler": "^2.2.13",
    "lil-gui": "^0.21.0"
  }
}
```

---

## Sources

- [three.js npm](https://www.npmjs.com/package/three)
- [Vite npm](https://www.npmjs.com/package/vite)
- [TypeScript npm](https://www.npmjs.com/package/typescript)
- [vitest npm](https://www.npmjs.com/package/vitest)
- [Three.js UnrealBloomPass docs](https://threejs.org/docs/pages/UnrealBloomPass.html)
- [Three.js bloom example](https://github.com/mrdoob/three.js/blob/dev/examples/webgl_postprocessing_unreal_bloom.html)
- [Three.js InstancedMesh docs](https://threejs.org/docs/#api/en/objects/InstancedMesh.instanceColor)
- [lil-gui Guide](https://github.com/georgealways/lil-gui/blob/main/Guide.md)
- [Vite static deploy](https://vite.dev/guide/static-deploy)
- [Chrome DevTools MCP tool reference](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md)
- [Chrome DevTools MCP client configuration](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/client-configurations.md)
