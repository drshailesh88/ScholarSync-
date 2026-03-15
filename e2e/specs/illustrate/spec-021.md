# illustrate — Spec 021

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Fabric.js Canvas Internals
- [x] PASS: `Canvas` initializes Fabric with `width`, `height`, `backgroundColor`, `selection: true`, `preserveObjectStacking: true`, `renderOnAddRemove: true`, `stopContextMenu: true`, and `fireRightClick: true`
- [x] PASS: The live canvas initialization does not pass Fabric `selectionColor`, `selectionBorderColor`, or `selectionLineWidth`
- [x] PASS: `useCanvas()` throws `useCanvas must be used within a CanvasProvider` when consumed outside the provider
- [x] PASS: `CanvasProvider.clearCanvas()` clears all objects and resets the Fabric background color to `#ffffff`
- [x] PASS: `CanvasProvider.importSVG()` uses `loadSVGFromString`, groups all parsed SVG objects with `util.groupSVGElements`, scales the group to fit within 90% of canvas width and height, and centers it on the canvas
- [x] PASS: `CanvasProvider.selectAll()` filters out grid objects before constructing the `ActiveSelection`
- [x] PASS: `CanvasProvider.copy()` stores serialized `obj.toObject()` payloads in memory only; it does not use the system clipboard
- [x] PASS: `CanvasProvider.paste()` re-enlivens each serialized object independently, offsets each pasted object by `+20` left and `+20` top, and logs `Failed to paste object:` on per-object failure
- [x] PASS: `CanvasProvider.zoomToFit()` ignores grid objects, fits the remaining content into 90% of the canvas viewport, and clamps the resulting zoom to a maximum of `2`
- [x] PASS: `CanvasProvider.setZoom()` clamps requested zoom between `0.1` and `10`
- [x] PASS: `CanvasProvider.centerView()` resets the viewport transform to `[1, 0, 0, 1, 0, 0]` instead of computing a content-aware center point
- [x] PASS: Grid rendering is implemented as an overlay via `registerGridOverlay()` and not as persisted Fabric line objects
- [x] PASS: Grid overlay registration adds `before:render` and `after:render` listeners, clears the top context before each render, and removes those listeners during cleanup
- [x] PASS: Grid overlay lines use color `rgba(200, 200, 200, 0.3)` and 1px crisp-line drawing on the top canvas context
- [x] PASS: Grid spacing is calculated as `gridSize * zoom`, with offsets derived from `viewportTransform[4]` and `viewportTransform[5]`
- [x] PASS: Snap-to-grid snaps `left` and `top` to the nearest multiple of the current `gridSize`; it does not snap width, height, or rotation
- [x] PASS: Guide snapping uses a hard threshold of `5` pixels and checks object left edge, center, and right edge or top edge, center, and bottom edge against guide positions
- [x] PASS: `selection:created` and `selection:updated` both forward `e.selected` into the editor selection callback
- [x] PASS: `selection:cleared` forwards an empty array into the editor selection callback
- [x] PASS: The live canvas does not register a Fabric `object:selected` listener; selection state is driven by `selection:created` and `selection:updated`
- [x] PASS: `object:modified` pushes history only when `shouldPushHistoryForEvent('object:modified', _isDrawing)` returns true, so in-progress drawing updates are excluded
- [x] PASS: Hand-pan behavior updates `viewportTransform[4]` and `viewportTransform[5]` from pointer deltas in client coordinates and mirrors those values into the editor store pan state
- [x] PASS: Status-bar zoom buttons and editor-store zoom clamp between `0.1` and `10`, while the agent preview zoom/store clamp to `25` through `400`, so zoom bounds are not uniform across illustrate
#### Shape Defaults and Object Lifecycle
- [x] PASS: The rendered editor has no dedicated `circle` creation tool; ellipse creation uses Fabric `Ellipse`
- [x] PASS: The rendered editor has no dedicated `textbox` creation tool; the Text tool creates Fabric `IText`, and `textbox` support only applies to loaded or imported objects
- [x] PASS: Rectangle draw start creates a Fabric rect with `width: 0`, `height: 0`, `fill: 'rgba(0, 120, 212, 0.1)'`, `stroke: '#0078d4'`, `strokeWidth: 2`, `selectable: false`, and `evented: false`
- [x] PASS: Ellipse draw start creates a Fabric ellipse with `rx: 0`, `ry: 0`, `fill: 'rgba(0, 120, 212, 0.1)'`, `stroke: '#0078d4'`, `strokeWidth: 2`, `selectable: false`, and `evented: false`
- [x] PASS: Line draw start creates a Fabric line whose `x1`, `y1`, `x2`, and `y2` all start at the pointer position, with `fill: undefined`, `stroke: '#0078d4'`, `strokeWidth: 2`, `selectable: false`, and `evented: false`
- [x] PASS: Arrow draw start reuses the line defaults during drag, then finalizes into a Fabric `Group` containing the line plus a triangle arrowhead
- [x] PASS: The arrowhead defaults to `width: 15`, `height: 15`, `fill: '#0078d4'`, and `angle = atan2(...) * 180 / Math.PI + 90`
- [x] PASS: Polygon draw start creates a Fabric polygon from `generatePolygonPoints(0, 0, 0, polygonSides)`, so the initial radius is `0`
- [x] PASS: Star draw start creates a Fabric polygon from `generateStarPoints(0, 0, 0, 0, starPoints)`, so both outer and inner radii start at `0`
- [x] PASS: Polygon and star drawing use the same default `fill`, `stroke`, and `strokeWidth` as rect/ellipse, and holding `Shift` forces the radius to `max(abs(dx), abs(dy))`
- [x] PASS: Star drawing fixes the inner radius to exactly `outerRadius * 0.5`
- [x] PASS: None of the live shape-tool constructors explicitly set `opacity`, so opacity falls through to Fabric defaults until edited later
