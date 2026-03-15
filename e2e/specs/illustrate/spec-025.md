# illustrate — Spec 025

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Icon Panel
- [ ] `IconPreview` shows exact empty-state text `Hover over an icon to preview`
- [ ] `IconPreview` waits `50` ms before scraping the rendered `<svg>` from React-component icons for copy/tint actions
- [ ] Copy-SVG success UI in `IconPreview` resets after `2000` ms
- [ ] Right-panel icon insertion warns `Cannot add icon: canvas not ready` when the editor canvas or SVG payload is missing
- [ ] Right-panel icon insertion warns `No valid objects found in SVG` when Fabric parses zero non-null SVG objects
- [ ] Right-panel icon insertion groups parsed SVG objects, scales the group so the max dimension becomes `64`, centers it using `(canvasWidth - 64) / 2` and `(canvasHeight - 64) / 2`, and sets `name: icon.name`
#### Style, Journal, and Layers Panels
- [ ] The Style tab is hand-drawn-style controls only; journal presets are not implemented inside `StylePanel`
- [ ] Style toggle only mutates the hand-drawn settings object; existing canvas objects do not change until `Apply to Selection` runs
- [ ] Hand-drawn presets are `clean` (`roughness: 0`, `bowing: 0`, `fillStyle: 'solid'`), `sketch` (`roughness: 1`, `bowing: 1`, `fillStyle: 'hachure'`), and `rough` (`roughness: 2`, `bowing: 1.5`, `fillStyle: 'cross-hatch'`)
- [ ] Hand-drawn roughness slider range is `0..3` step `0.1`
- [ ] Hand-drawn bowing slider range is `0..3` step `0.1`
- [ ] Hand-drawn stroke-width slider range is `0.5..8` step `0.5`
- [ ] Hand-drawn fill patterns are exactly `solid`, `hachure`, `cross-hatch`, `dots`, `zigzag`, and `dashed`
- [ ] `Apply to Selection` is disabled whenever there is no current selection or hand-drawn mode is disabled
- [ ] `settingsToRoughOptions()` maps the style panel to Rough.js with `roughness`, `bowing`, `strokeWidth`, `fillStyle`, and optional `seed`
- [ ] The separate Journal tab provides figure-label, scale-bar, panel-letter, copyright, color-convention, and accessibility tools; it is not a theme/style preset tab
- [ ] Layer store persistence key is `finnish-layer-store`
- [ ] Layer store persists only `layers`, `activeLayerId`, and `isPanelExpanded`
- [ ] The initial persisted layer stack contains exactly one layer with `id: 'default'`, `name: 'Layer'`, `visible: true`, `locked: false`, `objects: []`, and `order: 0`
- [ ] Layers panel empty-state text is `No layers yet`
- [ ] Layers panel empty-state helper text is `Click + to add a layer`
- [ ] New layers default to `Layer {layers.length + 1}`
- [ ] Layer delete confirm text is exactly `Delete this layer?`
- [ ] Deleting the only remaining layer is silently blocked in the store and does not show an error or warning
- [ ] Layer rename starts on double-click, commits on `Enter`, cancels on `Escape`, and also commits on blur
- [ ] Visibility button titles are `Hide layer` and `Show layer`
- [ ] Lock button titles are `Unlock layer` and `Lock layer`
- [ ] Layer rows are rendered in reversed order so the highest-order layer appears first in the panel
- [ ] Layer drag reordering uses native HTML5 drag events and `reorderLayers(reorderedIds)`; it does not move Fabric object z-order on the canvas
- [ ] The live Layers panel is not synchronized with Fabric object membership, selection, visibility, or lock state on the canvas
#### Agent Route and Agent Store
- [ ] `POST /api/illustration/generate` validates `prompt` with `.min(1).max(4000)`, `backend` as `mermaid | svg | gemini | auto`, `style` as `flat | detailed | schematic | photorealistic`, `geminiModel` as `pro | flash`, optional `domain`, optional `slideContext`, and optional `existingDiagram`
- [ ] Auth lookup failure in `/api/illustration/generate` returns `401` with JSON `{ error: "Unauthorized" }`
- [ ] The generate route applies the `illustrations` AI rate limit immediately after auth and returns the limiter response directly when blocked
- [ ] Validation failure returns `400` with JSON `{ error: "Invalid request", details: parseResult.error.flatten().fieldErrors }`
- [ ] Backend `auto` mode calls `detectBestBackend(prompt, domain)` and logs `Auto-selected backend: {selectedBackend}`
