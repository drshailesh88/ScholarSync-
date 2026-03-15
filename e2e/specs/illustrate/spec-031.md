# illustrate — Spec 031

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### PointEditingOverlay Visuals and Interaction (`PointEditingOverlay.tsx`)
- [x] PASS: Anchor and handle interactive divs have no `role` or `aria-label` attributes (accessibility gap)
- [x] PASS: Drag state tracks two types: `'anchor'` (translates points) and `'handle'` (moves bezier control)
#### Canvas Internals (`Canvas.tsx`)
- [x] PASS: Canvas elements have `data-testid="illustrator-canvas-stage"` on container and `data-testid="illustrator-canvas"` on canvas
- [x] PASS: `ConnectorManager` is initialized during canvas setup and disposed during cleanup via `connectorManagerRef`
- [x] PASS: Custom `_isDrawing` flag is set on canvas: `(canvas as DrawingFlagCanvas)._isDrawing = false`
- [x] PASS: Eraser, Scissors, and Measure tools are implemented as separate class instances (`EraserTool`, `ScissorsTool`, `MeasureTool`) stored in refs
- [x] PASS: Freehand drawing module is lazy-loaded via dynamic import with promise caching in `freehandModulePromiseRef`
- [x] PASS: Rough.js module is lazy-loaded via dynamic import with promise caching in `roughModulePromiseRef`
- [x] PASS: Measurement overlay renders when `activeTool === ToolType.MEASURE && measurementOverlay !== null`
- [x] PASS: Eyedropper preview overlay renders when `activeTool === ToolType.EYEDROPPER && eyedropperPreview.visible`
- [x] PASS: Eraser cursor overlay renders when `activeTool === ToolType.ERASER && eraserCursor.visible`
- [x] PASS: `mouse:dblclick` only reacts while `activeTool === ToolType.DIRECT_SELECT`; double-clicking empty canvas exits point-editing mode, and non-empty targets are ignored
- [x] PASS: Connector color default is `#6366f1`
#### CanvasContext Operation Details (`CanvasContext.tsx`)
- [x] PASS: `ungroupSelected()` applies group transforms (angle, scaleX, scaleY adjustments) to each child item before removing the group and re-adding items individually
- [x] PASS: `makeClippingMask()`, `releaseClippingMask()`, `makeCompoundPath()`, and `releaseCompoundPath()` all fire `canvas.fire('object:modified', { target })` after completion
- [x] PASS: `subscribeToCanvasEvents()` provides a generic event subscription helper that returns an unsubscribe function for cleanup
#### EditorMode Lazy Loading and State (`EditorMode.tsx`)
- [x] PASS: EditorMode lazy-loads 7 components via `React.lazy()`: ExportDialog, BackgroundRemovalTool, AIGenerationTool, ShapeGeneratorPanel, FigurePanelGenerator, DocumentSettings, RightPanel
- [x] PASS: `figurePanelGeneratorOpen` state controls Figure Panel Generator dialog visibility
- [x] PASS: `isCanvasDragActive` state applies inline box-shadow `inset 0 0 0 2px var(--accent-primary)` to canvas area during drag
- [x] PASS: Welcome toast `Editor ready. Start creating!` appears ONLY when no `id` prop is passed (new documents), not when loading existing diagrams
- [x] PASS: Export handler creates a temporary SVG element with `position: 'absolute', left: '-9999px'` appended to `document.body`
#### Status Bar Display Details (`StatusBar.tsx`)
- [x] PASS: Selection count uses pluralization: `${selectionCount} object${selectionCount !== 1 ? 's' : ''}`
- [x] PASS: `toolDisplayNames` map includes entries for `Pencil`, `Bracket`, `Callout`, `Dimension`, `Connector`, and `Text on Path` (ToolType enum values that are not exposed as toolbar buttons)
- [x] PASS: Default tool display name when `activeTool` is not found in map: `'Select'`
- [x] PASS: Zoom percentage displayed as `Math.round(zoom * 100)` followed by `%`
#### Export Options Panel Details
- [x] PASS: PNG DPI descriptions: `Screen/Web` (72), `Standard` (150), `Print Quality` (300), `High Resolution` (600)
- [x] PASS: PNG quality slider has text hints: `Smaller file` (left) and `Better quality` (right)
- [x] PASS: PNG panel shows estimated output dimensions calculated as `(800 * dpi) / 72` and estimated file size in KB
- [x] PASS: SVG Optimize description: `Remove unnecessary elements and attributes`
- [x] PASS: SVG Minify description: `Remove whitespace for smaller file size`
- [x] PASS: SVG Embed Fonts description: `Convert text to paths for consistent display`
- [x] PASS: SVG panel renders feature tags: `Scalable`, `Editable`, `Optimized`, `Minified`; `Editable` tag is active only when `embedFonts` is false
- [x] PASS: PPTX slide layout dimensions: 16:9 (10″×5.625″), 16:10 (10″×6.25″), 4:3 (10″×7.5″)
- [x] PASS: PPTX resolution descriptions: `Standard` (1x), `High quality` (2x), `Ultra HD` (4x)
- [x] PASS: PPTX centering description: `Automatically center the illustration with padding`
