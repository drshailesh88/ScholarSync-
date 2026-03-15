# illustrate — Spec 018

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Agent Mode — Chat History, Preview, and Message Actions
- [x] PASS: `DiagramPreview` supports Ctrl/Cmd + mouse wheel zooming between 25% and 400%
- [x] PASS: `DiagramPreview` sanitizes SVG by stripping `<script>` nodes and `on*` attributes before rendering
- [x] PASS: Agent store `previewZoom` exists but is not wired to the live `DiagramPreview` zoom controls
- [x] PASS: Messages persist across refresh, but `currentDiagram` does not persist because it is omitted from store partialization
#### Editor Routes and Workspace Initialization
- [x] PASS: `/illustrate/editor` and `/illustrate/editor/[id]` both lazy-load the editor with SSR disabled
- [x] PASS: Dynamic editor route fallback text is exactly "Loading editor..."
- [x] PASS: Editor is wrapped in both `ToastProvider` and `CanvasProvider`
- [x] PASS: Editor is wrapped in an `ErrorBoundary` with illustration-specific fallback messaging
- [x] PASS: Initial loading overlay shows "Initializing editor..." before canvas readiness
- [x] PASS: Loading existing diagram overlay shows "Loading diagram..." when store loading is true after canvas is ready
- [x] PASS: New editor session shows info toast "Editor ready. Start creating!" after canvas initialization
- [x] PASS: Initial canvas width is clamped between 600 and 1200 pixels from viewport-derived available width
- [x] PASS: Initial canvas height is clamped between 400 and 900 pixels from viewport-derived available height
- [x] PASS: Editor route with `?import=agent` reads pending SVG from session storage only after canvas is ready
- [x] PASS: Successful agent import removes the session storage key after import completes
- [x] PASS: Successful agent import shows success toast "Imported diagram from Agent mode"
- [x] PASS: Failed agent import shows error toast "Failed to import agent diagram"
- [x] PASS: Loading `/illustrate/editor/[id]` reads `localStorage['finnish-diagram-{id}']`
- [x] PASS: Successful diagram load shows success toast `Loaded diagram: {name || id}`
- [x] PASS: Missing local diagram shows warning toast `Diagram "{id}" not found`
- [x] PASS: Missing local diagram does not redirect away from the current route in the current implementation
- [x] PASS: Diagram load exception shows error toast "Failed to load diagram"
- [x] PASS: Scientific text toolbar becomes visible only for a single selected text-like object (`i-text`, `textbox`, or `text`)
- [x] PASS: Scientific text toolbar hides again when selection becomes empty or multi-select
#### Editor Menus, Toolbar, and Status Bar — Detailed Cases
- [x] PASS: File > Open creates a temporary hidden file input rather than using a persistent visible upload control
- [x] PASS: File > Open file picker accept string is `.finnish,.json,.svg`
- [x] PASS: File > Open shows info toast `Loading "{file.name}"...` before file parsing begins
- [x] PASS: File > Open parses selected file as JSON text regardless of extension
- [x] PASS: Opening a raw SVG file from the File menu fails JSON parsing and shows the invalid-format error toast in the current implementation
- [x] PASS: File > Open success toast reads `Opened "{file.name}" successfully`
- [x] PASS: File > Open failure toast reads `Invalid file format. Please select a valid .finnish, .json, or .svg file.`
- [x] PASS: File > Save menu action downloads `diagram.finnish`
- [x] PASS: File > Save menu action success toast reads `Diagram saved as "diagram.finnish"`
- [x] PASS: `Ctrl+S` save shortcut also downloads `diagram.finnish` but uses toast text `Saved: diagram.finnish`
- [x] PASS: File > Save failure toast reads `Failed to save diagram. Please try again.`
