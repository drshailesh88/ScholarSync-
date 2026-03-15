# illustrate — Spec 025

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Icon Panel
- [x] PASS: `IconPreview` shows exact empty-state text `Hover over an icon to preview`
- [x] PASS: `IconPreview` waits `50` ms before scraping the rendered `<svg>` from React-component icons for copy/tint actions
- [x] PASS: Copy-SVG success UI in `IconPreview` resets after `2000` ms
- [x] PASS: Right-panel icon insertion warns `Cannot add icon: canvas not ready` when the editor canvas or SVG payload is missing
- [x] PASS: Right-panel icon insertion warns `No valid objects found in SVG` when Fabric parses zero non-null SVG objects
- [x] PASS: Right-panel icon insertion groups parsed SVG objects, scales the group so the max dimension becomes `64`, centers it using `(canvasWidth - 64) / 2` and `(canvasHeight - 64) / 2`, and sets `name: icon.name`
#### Style, Journal, and Layers Panels
- [x] PASS: The Style tab is hand-drawn-style controls only; journal presets are not implemented inside `StylePanel`
- [x] PASS: Style toggle only mutates the hand-drawn settings object; existing canvas objects do not change until `Apply to Selection` runs
- [x] PASS: Hand-drawn presets are `clean` (`roughness: 0`, `bowing: 0`, `fillStyle: 'solid'`), `sketch` (`roughness: 1`, `bowing: 1`, `fillStyle: 'hachure'`), and `rough` (`roughness: 2`, `bowing: 1.5`, `fillStyle: 'cross-hatch'`)
- [x] PASS: Hand-drawn roughness slider range is `0..3` step `0.1`
- [x] PASS: Hand-drawn bowing slider range is `0..3` step `0.1`
- [x] PASS: Hand-drawn stroke-width slider range is `0.5..8` step `0.5`
- [x] PASS: Hand-drawn fill patterns are exactly `solid`, `hachure`, `cross-hatch`, `dots`, `zigzag`, and `dashed`
- [x] PASS: `Apply to Selection` is disabled whenever there is no current selection or hand-drawn mode is disabled
- [x] PASS: `settingsToRoughOptions()` maps the style panel to Rough.js with `roughness`, `bowing`, `strokeWidth`, `fillStyle`, and optional `seed`
- [x] PASS: The separate Journal tab provides figure-label, scale-bar, panel-letter, copyright, color-convention, and accessibility tools; it is not a theme/style preset tab
- [x] PASS: Layer store persistence key is `finnish-layer-store`
- [x] PASS: Layer store persists only `layers`, `activeLayerId`, and `isPanelExpanded`
- [x] PASS: The initial persisted layer stack contains exactly one layer with `id: 'default'`, `name: 'Layer'`, `visible: true`, `locked: false`, `objects: []`, and `order: 0`
- [x] PASS: Layers panel empty-state text is `No layers yet`
- [x] PASS: Layers panel empty-state helper text is `Click + to add a layer`
- [x] PASS: New layers default to `Layer {layers.length + 1}`
- [x] PASS: Layer delete confirm text is exactly `Delete this layer?`
- [x] PASS: Deleting the only remaining layer is silently blocked in the store and does not show an error or warning
- [x] PASS: Layer rename starts on double-click, commits on `Enter`, cancels on `Escape`, and also commits on blur
- [x] PASS: Visibility button titles are `Hide layer` and `Show layer`
- [x] PASS: Lock button titles are `Unlock layer` and `Lock layer`
- [x] PASS: Layer rows are rendered in reversed order so the highest-order layer appears first in the panel
- [x] PASS: Layer drag reordering uses native HTML5 drag events and `reorderLayers(reorderedIds)`; it does not move Fabric object z-order on the canvas
- [x] PASS: The live Layers panel is not synchronized with Fabric object membership, selection, visibility, or lock state on the canvas
#### Agent Route and Agent Store
- [x] PASS: `POST /api/illustration/generate` validates `prompt` with `.min(1).max(4000)`, `backend` as `mermaid | svg | gemini | auto`, `style` as `flat | detailed | schematic | photorealistic`, `geminiModel` as `pro | flash`, optional `domain`, optional `slideContext`, and optional `existingDiagram`
- [x] PASS: Auth lookup failure in `/api/illustration/generate` returns `401` with JSON `{ error: "Unauthorized" }`
- [x] PASS: The generate route applies the `illustrations` AI rate limit immediately after auth and returns the limiter response directly when blocked
- [x] PASS: Validation failure returns `400` with JSON `{ error: "Invalid request", details: parseResult.error.flatten().fieldErrors }`
- [x] PASS: Backend `auto` mode calls `detectBestBackend(prompt, domain)` and logs `Auto-selected backend: {selectedBackend}`
