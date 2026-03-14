# illustrate — Spec 018

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Agent Mode — Chat History, Preview, and Message Actions
- [ ] `DiagramPreview` supports Ctrl/Cmd + mouse wheel zooming between 25% and 400%
- [ ] `DiagramPreview` sanitizes SVG by stripping `<script>` nodes and `on*` attributes before rendering
- [ ] Agent store `previewZoom` exists but is not wired to the live `DiagramPreview` zoom controls
- [ ] Messages persist across refresh, but `currentDiagram` does not persist because it is omitted from store partialization
#### Editor Routes and Workspace Initialization
- [ ] `/illustrate/editor` and `/illustrate/editor/[id]` both lazy-load the editor with SSR disabled
- [ ] Dynamic editor route fallback text is exactly "Loading editor..."
- [ ] Editor is wrapped in both `ToastProvider` and `CanvasProvider`
- [ ] Editor is wrapped in an `ErrorBoundary` with illustration-specific fallback messaging
- [ ] Initial loading overlay shows "Initializing editor..." before canvas readiness
- [ ] Loading existing diagram overlay shows "Loading diagram..." when store loading is true after canvas is ready
- [ ] New editor session shows info toast "Editor ready. Start creating!" after canvas initialization
- [ ] Initial canvas width is clamped between 600 and 1200 pixels from viewport-derived available width
- [ ] Initial canvas height is clamped between 400 and 900 pixels from viewport-derived available height
- [ ] Editor route with `?import=agent` reads pending SVG from session storage only after canvas is ready
- [ ] Successful agent import removes the session storage key after import completes
- [ ] Successful agent import shows success toast "Imported diagram from Agent mode"
- [ ] Failed agent import shows error toast "Failed to import agent diagram"
- [ ] Loading `/illustrate/editor/[id]` reads `localStorage['finnish-diagram-{id}']`
- [ ] Successful diagram load shows success toast `Loaded diagram: {name || id}`
- [ ] Missing local diagram shows warning toast `Diagram "{id}" not found`
- [ ] Missing local diagram does not redirect away from the current route in the current implementation
- [ ] Diagram load exception shows error toast "Failed to load diagram"
- [ ] Scientific text toolbar becomes visible only for a single selected text-like object (`i-text`, `textbox`, or `text`)
- [ ] Scientific text toolbar hides again when selection becomes empty or multi-select
#### Editor Menus, Toolbar, and Status Bar — Detailed Cases
- [ ] File > Open creates a temporary hidden file input rather than using a persistent visible upload control
- [ ] File > Open file picker accept string is `.finnish,.json,.svg`
- [ ] File > Open shows info toast `Loading "{file.name}"...` before file parsing begins
- [ ] File > Open parses selected file as JSON text regardless of extension
- [ ] Opening a raw SVG file from the File menu fails JSON parsing and shows the invalid-format error toast in the current implementation
- [ ] File > Open success toast reads `Opened "{file.name}" successfully`
- [ ] File > Open failure toast reads `Invalid file format. Please select a valid .finnish, .json, or .svg file.`
- [ ] File > Save menu action downloads `diagram.finnish`
- [ ] File > Save menu action success toast reads `Diagram saved as "diagram.finnish"`
- [ ] `Ctrl+S` save shortcut also downloads `diagram.finnish` but uses toast text `Saved: diagram.finnish`
- [ ] File > Save failure toast reads `Failed to save diagram. Please try again.`
