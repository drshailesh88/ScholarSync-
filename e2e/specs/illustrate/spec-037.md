# illustrate — Spec 037

STATUS: PASS
TESTED: 24/24
PASS: 24
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Keyboard Shortcuts — Additional Details (`useKeyboardShortcuts.ts`)
- [x] PASS: `getShortcutDisplayString` detects Mac via `navigator.platform.toUpperCase().indexOf('MAC')` and renders `Cmd` instead of `Ctrl`, `Option` instead of `Alt`
- [x] PASS: `getShortcutDisplayString` formats special keys: Space→`Space`, Delete→`Del`, Backspace→`Delete` (Mac) or `Backspace`
- [x] PASS: Paste offsets pasted objects by +20px left and +20px top from original position
- [x] PASS: Copy serializes objects via `obj.toObject()` into `window.__finnishClipboard` array
- [x] PASS: Paste uses `fabric.util.enlivenObjects` to deserialize clipboard data
- [x] PASS: `groupSelected` creates group with `name: 'Group'`
- [x] PASS: `ungroupSelected` calls `_restoreObjectsState()` before re-adding individual items
- [x] PASS: Hook returns `{ shortcuts, enabled, isSpacePressed }` for external consumers
#### ToolType Enum — Complete Values (`types/index.ts`)
- [x] PASS: ToolType enum has 23 values: SELECT, DIRECT_SELECT, PEN, PENCIL, BRUSH, LINE, RECTANGLE, ELLIPSE, POLYGON, STAR, ARROW, BRACKET, CALLOUT, DIMENSION, CONNECTOR, TEXT, TEXT_ON_PATH, HAND, ZOOM, EYEDROPPER, ERASER, SCISSORS, MEASURE
- [x] PASS: BRACKET, CALLOUT, DIMENSION, CONNECTOR, PENCIL, and TEXT_ON_PATH are defined in enum but have no toolbar buttons or keyboard shortcuts
- [x] PASS: DiagramType union has 11 values: `flowchart`, `sequence`, `class`, `entity-relationship`, `state`, `gantt`, `pie`, `mindmap`, `timeline`, `scientific`, `custom`
- [x] PASS: ExportDPI type allows exactly 4 values: `72 | 150 | 300 | 600`
- [x] PASS: BlendMode type lists 12 modes: `normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`
- [x] PASS: ExportStage type has 6 stages: `preparing`, `rendering`, `optimizing`, `encoding`, `complete`, `error`
#### Behavior Corrections (Pass 4)
- [x] PASS: `AIGenerationTool` stores `imageSize` and `model` in component state, but `handleGenerate()` still calls `generateScientificDiagram(prompt, style, undefined, onProgress)` and does not pass either value into the generation request
- [x] PASS: `BackgroundRemovalTool` gives the drop zone `role="button"` and `tabIndex={0}`, but it does not register any `onKeyDown` handler for Enter or Space keyboard activation
- [x] PASS: `ExportDialog` registers its Escape handler on `document`, and pressing Escape while the dialog is open calls `onClose()` even if `isExporting` is true
- [x] PASS: `ExportDialog` blocks backdrop clicks while `isExporting`, but the Escape-key path does not check `isExporting`
- [x] PASS: `FigurePanelGenerator` closes on backdrop click via `onClick={onClose}`, but it has no Escape-key listener
- [x] PASS: `IconSearch` debounces `onSearch` by `200` ms by default, clears the query on Escape when text is present, and blurs the input on Escape when the field is already empty
- [x] PASS: `PropertiesPanel` empty state text is exactly `Select an object to edit its properties`
- [x] PASS: `PropertiesPanel` debounces transform-panel resync by `40` ms with `window.setTimeout`, clears any pending timeout before rescheduling, and clears the timeout again on unmount
- [x] PASS: `LayersPanel` refuses to delete the last remaining layer by returning early in the panel handler before the confirm dialog is shown
- [x] PASS: `LayersPanel` renaming autofocuses and selects the layer-name input on entry, commits on Enter or blur, and restores the original name on Escape
