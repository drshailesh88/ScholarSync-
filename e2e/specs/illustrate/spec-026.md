# illustrate — Spec 026

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Agent Route and Agent Store
- [x] PASS: Mermaid generation strips fenced-code wrappers like ```mermaid and ```json and also replaces smart quotes before returning content
- [x] PASS: Mermaid generation extracts `syntax` from a JSON payload when the model responds with JSON and unescapes `\\n` back into newlines
- [x] PASS: Gemini generation throws `GEMINI_API_KEY not configured` when the API key is unavailable
- [x] PASS: Gemini vectorization uses `pngToEditableSVG(..., { colorCount, minColorRatio: 0.02, filterSpeckle: 4, simplify: true })` where `colorCount` is `16` for `flat`, `32` for `detailed`, and `16` for `schematic` or `photorealistic`
- [x] PASS: Gemini unavailability during explicit or auto Gemini selection falls back to the SVG backend only when the thrown error message mentions `GEMINI_API_KEY`
- [x] PASS: SVG-backend failures fall back to Mermaid generation
- [x] PASS: The success response normalizes output to `illustration.content`, `illustration.backend`, `illustration.format`, `illustration.caption`, and `illustration.domain`, plus optional `pathCount`, `colorPalette`, `rasterPreview`, and `vectorized`
- [x] PASS: Route-level failure returns `500` with JSON `{ error: "Illustration generation failed", details: error.message || "Unknown error" }`
- [x] PASS: Agent store persistence key is `finnish-agent-storage`
- [x] PASS: Agent store initial state is `messages: []`, `isLoading: false`, `currentDiagram: null`, `selectedCategory: 'medicine'`, `templateSearchQuery: ''`, `isSidebarCollapsed: false`, and `previewZoom: 100`
- [x] PASS: Agent store persists only the last 50 messages plus `selectedCategory`
- [x] PASS: Agent store does not persist `isLoading`, `currentDiagram`, `templateSearchQuery`, `isSidebarCollapsed`, or `previewZoom`
- [x] PASS: `addMessage()` generates ids in the shape `msg_{Date.now()}_{random}` and stamps `timestamp` with `new Date().toISOString()`
- [x] PASS: `addMessage()` updates `currentDiagram` only when the newly added message contains a `diagram`
- [x] PASS: `updateMessage()` shallow-merges updates into the matching message id and does not recompute `currentDiagram`
- [x] PASS: `clearMessages()` clears both `messages` and `currentDiagram`
- [x] PASS: `setPreviewZoom()` clamps values between `25` and `400`
#### Editor Store and Keyboard Shortcuts
- [x] PASS: Editor-store history depth is capped at `50` serialized JSON states
- [x] PASS: Undo and redo store full serialized canvas JSON strings, not command-level patches
- [x] PASS: Editor store is not persisted, so zoom, pan, tool, selection, guides, and history reset on refresh
- [x] PASS: The clipboard used by `CanvasProvider` lives in provider memory, while the `useKeyboardShortcuts` copy/paste path uses `window.__finnishClipboard`; clipboard state is not stored in `editorStore`
- [x] PASS: Grid defaults are `gridVisible: true`, `snapToGrid: false`, and `gridSize: 20`
- [x] PASS: Guide defaults are `showRulers: true`, `showGuides: true`, and empty horizontal and vertical guide arrays
- [x] PASS: `addGuide()` rounds guide positions to 2 decimals, clamps them to non-negative values, and ignores duplicate positions
- [x] PASS: `setGridSize()` ignores zero or negative values
- [x] PASS: Pressing `Space` temporarily switches the active tool to Hand on keydown and restores the previous tool on keyup
- [x] PASS: `Ctrl/Cmd+N` triggers New
- [x] PASS: `Ctrl/Cmd+O` triggers Open
- [x] PASS: `Ctrl/Cmd+S` triggers Save
- [x] PASS: `Ctrl/Cmd+Shift+S` triggers Save As
- [x] PASS: `Ctrl/Cmd+E` triggers Export
- [x] PASS: `Ctrl/Cmd+Shift+B` opens Background Removal
- [x] PASS: `Ctrl/Cmd+Shift+A` opens AI Generate Image
- [x] PASS: `Ctrl/Cmd+Shift+P` opens Place Image
- [x] PASS: `Ctrl/Cmd+Z` triggers Undo
