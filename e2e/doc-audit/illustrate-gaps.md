# Illustrate — Feature Doc Gaps

**Original doc:** `ILLUSTRATE_FEATURES_TESTING.md`  
**Original checkbox count:** 428  
**Features found in UI:** 561  
**Features found in source code:** 648  
**Missing from doc:** 220  
**Completeness of original doc:** 66.0%

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
