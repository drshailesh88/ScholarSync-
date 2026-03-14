# illustrate — Spec 037

STATUS: PENDING
TESTED: 0/24
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Keyboard Shortcuts — Additional Details (`useKeyboardShortcuts.ts`)
- [ ] `getShortcutDisplayString` detects Mac via `navigator.platform.toUpperCase().indexOf('MAC')` and renders `Cmd` instead of `Ctrl`, `Option` instead of `Alt`
- [ ] `getShortcutDisplayString` formats special keys: Space→`Space`, Delete→`Del`, Backspace→`Delete` (Mac) or `Backspace`
- [ ] Paste offsets pasted objects by +20px left and +20px top from original position
- [ ] Copy serializes objects via `obj.toObject()` into `window.__finnishClipboard` array
- [ ] Paste uses `fabric.util.enlivenObjects` to deserialize clipboard data
- [ ] `groupSelected` creates group with `name: 'Group'`
- [ ] `ungroupSelected` calls `_restoreObjectsState()` before re-adding individual items
- [ ] Hook returns `{ shortcuts, enabled, isSpacePressed }` for external consumers
#### ToolType Enum — Complete Values (`types/index.ts`)
- [ ] ToolType enum has 23 values: SELECT, DIRECT_SELECT, PEN, PENCIL, BRUSH, LINE, RECTANGLE, ELLIPSE, POLYGON, STAR, ARROW, BRACKET, CALLOUT, DIMENSION, CONNECTOR, TEXT, TEXT_ON_PATH, HAND, ZOOM, EYEDROPPER, ERASER, SCISSORS, MEASURE
- [ ] BRACKET, CALLOUT, DIMENSION, CONNECTOR, PENCIL, and TEXT_ON_PATH are defined in enum but have no toolbar buttons or keyboard shortcuts
- [ ] DiagramType union has 11 values: `flowchart`, `sequence`, `class`, `entity-relationship`, `state`, `gantt`, `pie`, `mindmap`, `timeline`, `scientific`, `custom`
- [ ] ExportDPI type allows exactly 4 values: `72 | 150 | 300 | 600`
- [ ] BlendMode type lists 12 modes: `normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`
- [ ] ExportStage type has 6 stages: `preparing`, `rendering`, `optimizing`, `encoding`, `complete`, `error`
#### Behavior Corrections (Pass 4)
- [ ] `AIGenerationTool` stores `imageSize` and `model` in component state, but `handleGenerate()` still calls `generateScientificDiagram(prompt, style, undefined, onProgress)` and does not pass either value into the generation request
- [ ] `BackgroundRemovalTool` gives the drop zone `role="button"` and `tabIndex={0}`, but it does not register any `onKeyDown` handler for Enter or Space keyboard activation
- [ ] `ExportDialog` registers its Escape handler on `document`, and pressing Escape while the dialog is open calls `onClose()` even if `isExporting` is true
- [ ] `ExportDialog` blocks backdrop clicks while `isExporting`, but the Escape-key path does not check `isExporting`
- [ ] `FigurePanelGenerator` closes on backdrop click via `onClick={onClose}`, but it has no Escape-key listener
- [ ] `IconSearch` debounces `onSearch` by `200` ms by default, clears the query on Escape when text is present, and blurs the input on Escape when the field is already empty
- [ ] `PropertiesPanel` empty state text is exactly `Select an object to edit its properties`
- [ ] `PropertiesPanel` debounces transform-panel resync by `40` ms with `window.setTimeout`, clears any pending timeout before rescheduling, and clears the timeout again on unmount
- [ ] `LayersPanel` refuses to delete the last remaining layer by returning early in the panel handler before the confirm dialog is shown
- [ ] `LayersPanel` renaming autofocuses and selects the layer-name input on entry, commits on Enter or blur, and restores the original name on Escape
