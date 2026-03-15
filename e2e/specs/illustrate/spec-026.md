# illustrate — Spec 026

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Agent Route and Agent Store
- [ ] Mermaid generation strips fenced-code wrappers like ```mermaid and ```json and also replaces smart quotes before returning content
- [ ] Mermaid generation extracts `syntax` from a JSON payload when the model responds with JSON and unescapes `\\n` back into newlines
- [ ] Gemini generation throws `GEMINI_API_KEY not configured` when the API key is unavailable
- [ ] Gemini vectorization uses `pngToEditableSVG(..., { colorCount, minColorRatio: 0.02, filterSpeckle: 4, simplify: true })` where `colorCount` is `16` for `flat`, `32` for `detailed`, and `16` for `schematic` or `photorealistic`
- [ ] Gemini unavailability during explicit or auto Gemini selection falls back to the SVG backend only when the thrown error message mentions `GEMINI_API_KEY`
- [ ] SVG-backend failures fall back to Mermaid generation
- [ ] The success response normalizes output to `illustration.content`, `illustration.backend`, `illustration.format`, `illustration.caption`, and `illustration.domain`, plus optional `pathCount`, `colorPalette`, `rasterPreview`, and `vectorized`
- [ ] Route-level failure returns `500` with JSON `{ error: "Illustration generation failed", details: error.message || "Unknown error" }`
- [ ] Agent store persistence key is `finnish-agent-storage`
- [ ] Agent store initial state is `messages: []`, `isLoading: false`, `currentDiagram: null`, `selectedCategory: 'medicine'`, `templateSearchQuery: ''`, `isSidebarCollapsed: false`, and `previewZoom: 100`
- [ ] Agent store persists only the last 50 messages plus `selectedCategory`
- [ ] Agent store does not persist `isLoading`, `currentDiagram`, `templateSearchQuery`, `isSidebarCollapsed`, or `previewZoom`
- [ ] `addMessage()` generates ids in the shape `msg_{Date.now()}_{random}` and stamps `timestamp` with `new Date().toISOString()`
- [ ] `addMessage()` updates `currentDiagram` only when the newly added message contains a `diagram`
- [ ] `updateMessage()` shallow-merges updates into the matching message id and does not recompute `currentDiagram`
- [ ] `clearMessages()` clears both `messages` and `currentDiagram`
- [ ] `setPreviewZoom()` clamps values between `25` and `400`
#### Editor Store and Keyboard Shortcuts
- [ ] Editor-store history depth is capped at `50` serialized JSON states
- [ ] Undo and redo store full serialized canvas JSON strings, not command-level patches
- [ ] Editor store is not persisted, so zoom, pan, tool, selection, guides, and history reset on refresh
- [ ] The clipboard used by `CanvasProvider` lives in provider memory, while the `useKeyboardShortcuts` copy/paste path uses `window.__finnishClipboard`; clipboard state is not stored in `editorStore`
- [ ] Grid defaults are `gridVisible: true`, `snapToGrid: false`, and `gridSize: 20`
- [ ] Guide defaults are `showRulers: true`, `showGuides: true`, and empty horizontal and vertical guide arrays
- [ ] `addGuide()` rounds guide positions to 2 decimals, clamps them to non-negative values, and ignores duplicate positions
- [ ] `setGridSize()` ignores zero or negative values
- [ ] Pressing `Space` temporarily switches the active tool to Hand on keydown and restores the previous tool on keyup
- [ ] `Ctrl/Cmd+N` triggers New
- [ ] `Ctrl/Cmd+O` triggers Open
- [ ] `Ctrl/Cmd+S` triggers Save
- [ ] `Ctrl/Cmd+Shift+S` triggers Save As
- [ ] `Ctrl/Cmd+E` triggers Export
- [ ] `Ctrl/Cmd+Shift+B` opens Background Removal
- [ ] `Ctrl/Cmd+Shift+A` opens AI Generate Image
- [ ] `Ctrl/Cmd+Shift+P` opens Place Image
- [ ] `Ctrl/Cmd+Z` triggers Undo
