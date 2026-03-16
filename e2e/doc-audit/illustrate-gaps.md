# Illustrate — Feature Doc Gaps

**Original doc:** `ILLUSTRATE_FEATURES_TESTING.md`
**Original checkbox count:** 428
**Features found in UI (Codex pass 1):** 561
**Features found in source code (Codex pass 2):** 920
**Features found in source code (Claude Code pass 3):** 1099
**Pass 3 new discoveries:** 179
**Features found in source code (Claude Code pass 4):** 1222
**Pass 4 new discoveries:** 123
**Features found after Codex verification cleanup:** 1232
**Verification-pass new discoveries:** 10
**Confirmed hallucinations corrected/removed:** 7
**Missing from original doc:** 804
**Completeness of original doc:** 34.7%

## Missing Features

### Welcome Page
- [ ] FINNISH logo header exists on `/illustrate` and there are no extra header controls beyond the logo area
- [ ] Recent Diagrams header shows `View all` only when at least one recent item exists
- [ ] Recent-diagram cards expose `role="button"`, keyboard activation, accessibility labels, and thumbnail fallback behavior
- [ ] Empty recent-diagrams state shows exact text `No recent diagrams. Create your first one!`
- [ ] Quick-template cards generate `/illustrate/agent?template={id}` links even though the agent page does not currently consume that query string

### Agent Mode
- [ ] Hydration skeleton renders before client state is ready
- [ ] Template search hides category tabs when active and searches across all templates by name/description
- [ ] Template click sends the template prompt immediately instead of prefilling the composer
- [ ] Prompt composer is a multiline textarea with auto-resize, Enter-to-send, Shift+Enter newline, Stop-button swap, and no visible character counter
- [ ] Error responses append assistant chat messages beginning `Sorry, I encountered an error:`
- [ ] Chat welcome state contains 4 concrete suggestion buttons with immediate-send behavior
- [ ] Diagram action row exposes Edit, Export, Regenerate, and Copy SVG behaviors including file names and copy-success state change
- [ ] Preview pane is close-only in the live route; no reopen control is exposed after it is dismissed
- [ ] `DiagramPreview` sanitizes SVG and uses local zoom state rather than the persisted store `previewZoom`
- [ ] Message history persists, but `currentDiagram`, preview visibility, and template search text do not persist

### Editor Workspace
- [ ] Route wrappers for `/illustrate/editor` and `/illustrate/editor/[id]` use lazy client-only loading with `Loading editor...` fallback
- [ ] Loading overlay text differs between initialization and existing-diagram load states
- [ ] Canvas size initializes from viewport with width/height clamps
- [ ] Agent import flow waits for canvas readiness, removes session storage only on success, and shows success/error toasts
- [ ] Existing-diagram load uses `localStorage['finnish-diagram-{id}']`, warns when missing, and does not redirect away
- [ ] Scientific text toolbar only appears for a single selected text-like object

### Menus, Toolbar, and Status
- [ ] File > Open uses a temporary hidden file input and parses all chosen files as JSON
- [ ] File > Open advertises `.svg` support but raw SVG files fail JSON parsing in the current implementation
- [ ] Menu Save/Save As toasts differ from keyboard-shortcut Save/Save As toasts
- [ ] Recent Files submenu is static disabled placeholder content
- [ ] Image menu includes disabled `Crop Image` and `Resize Image` placeholder items
- [ ] Help > Keyboard Shortcuts shows a long-lived toast summary instead of opening the richer shortcuts modal component
- [ ] Toolbar supports roving focus with ArrowUp/ArrowDown/Home/End
- [ ] Polygon and Star config popovers open only after clicking the already-active tool
- [ ] Status bar shows `None` for empty selection and includes resettable zoom percentage behavior
- [ ] Ruler corner toggle exposes exact `px`/`pt` unit-toggle title text

### File Import, Export, and Persistence
- [ ] Creating a new document shows browser confirm text before clearing the canvas
- [ ] Hidden image picker has exact accepted extensions and MIME types
- [ ] Drag/drop and clipboard image import paths have distinct success/error toast strings
- [ ] Export success toasts are format-specific for PNG, PDF, SVG, PowerPoint, and LaTeX
- [ ] Live editor Save/Save As flows download files locally but do not populate the recent-diagrams localStorage data the welcome page reads
- [ ] `POST /api/illustration/save` is authenticated, rate-limited, schema-validated, and currently returns mock success data instead of writing a real database record

### Credits Page
- [ ] Credits header logo and `Back to Home` links both route to `/`
- [ ] Credits page has exact title/subtitle text and exactly 3 attribution sections
- [ ] Attribution cards have hover elevation/border behavior and license-badge color mapping
- [ ] Footer text contains the scientific-community line and FINNISH tagline line

## Features in doc that DON'T EXIST in the app

- Style and model dropdowns in the live agent composer are not present; style inference happens implicitly from prompt text.
- Template clicks in agent mode do not prefill the prompt field first; they submit immediately.
- The preview pane does not expose a restore/open button after closing.
- The live preview controls do not read or write the persisted `previewZoom` store field.
- The generated `?template=` query string is not consumed by the current `/illustrate/agent` page component.
- File > Open does not truly support raw `.svg` files despite the accept string claiming it does.
- Save/Save As do not update `finnish-recent-diagrams` or `finnish-diagram-*` localStorage entries in the current editor route.
- `POST /api/illustration/save` is still a placeholder mock endpoint rather than a completed persistence feature.
- Help > Keyboard Shortcuts does not open the richer modal component described by the original doc.

## Pass 3 Discoveries Summary

### New checks added: 179
- MenuBar operation toast messages (offset path, clipping mask, compound path, flip): 18
- Quick Export vs Export Dialog toast divergence: 9
- Scientific Text Toolbar internal details (dead tabs, symbol counts, insertion behavior): 15
- Error Boundary specifics (button text, ARIA, dev-only details, resetKeys): 12
- Toolbar accessibility (group roles, aria-pressed, data attributes): 8
- Right Panel tab accessibility (role=tab, aria-selected, aria-controls): 7
- PointEditingOverlay visuals and interaction (colors, Alt drag, threshold, multi-select): 11
- Canvas internals (data-testid, ConnectorManager, tool classes, lazy modules): 11
- CanvasContext operation details: 3
- EditorMode lazy loading and state details: 5
- Status bar display details: 4
- Export options panel descriptions and details: 20
- Journal Figure Panel details (labels, scale bar, color conventions): 7
- Icon grid virtualization: 6
- Icon preview details (tinting, licenses, keywords): 5
- Effects panel ranges (shadow, blur, blend modes): 4
- Gradient editor details: 2
- API route internals (icons GET, search, generate, save schema, generate tracing): 22
- Editor store details: 5

### Behavior corrections: 7
1. PDF page sizes: No A3 option (only A4, Letter, Custom)
2. PNG quality minimum: 1 not 0
3. Error boundary button: "Try Again" not "Reset"
4. Error boundary description is generic, not illustration-specific
5. Scientific text toolbar tabs (scripts, math) are unreachable dead code
6. LaTeX Download .tex button exists independently of main Export button
7. Quick Export and Export Dialog have different toast messages

### Additional unreferenced components/stores/hooks/routes: 8
- ChartTool, PlotlyChartPanel, conversationStore, exportStore, useLayerSync, useDiagramGenerator, useToolSwitching, /api/illustration/agent/chat route
