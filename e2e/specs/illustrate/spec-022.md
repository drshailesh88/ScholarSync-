# illustrate — Spec 022

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Shape Defaults and Object Lifecycle
- [x] PASS: The Text tool creates `IText` with literal content `Type here`, `width: 200`, `fontFamily: 'Arial'`, `fontSize: 16`, `fill: '#333333'`, `lineHeight: 1.16`, and `charSpacing: 0`
- [x] PASS: Eyedropper sampling reads object fill when the pointer is over an object and falls back to the canvas background color when it is not
- [x] PASS: Eyedropper apply mode writes the sampled color back to the `fill` property of the previously selected objects, fires `object:modified`, shows info toast `Color sampled: {HEX}`, and returns the active tool to Select
- [x] PASS: Brush activation shows info toast `Loading brush engine...` if the freehand module has not finished lazy-loading
- [x] PASS: Rough auto-conversion on shape finalize only applies to freshly drawn rectangle, ellipse, and line objects; polygon, star, arrow, and text are not auto-converted
- [x] PASS: `convertObjectToRough()` only supports object types `rect`, `ellipse`, and `line`
#### Properties Panel
- [x] PASS: With no active selection, the Properties tab shows exact empty-state text `Select an object to edit its properties`
- [x] PASS: Transform field synchronization listens to `selection:created`, `selection:updated`, `selection:cleared`, `object:moving`, `object:scaling`, `object:rotating`, and `object:modified`
- [x] PASS: Transform field synchronization is deferred through `setTimeout(..., 40)` and clears that timeout during effect cleanup
- [x] PASS: Mixed transform values render as the literal glyph `—`
- [x] PASS: X, Y, W, H, Rotation, and Opacity are all text inputs, not native `type="number"` controls
- [x] PASS: Invalid numeric transform input is ignored on change, the draft text remains visible until blur, and the underlying Fabric property is not updated until the value parses
- [x] PASS: Focusing a mixed-value transform field clears the draft string instead of pre-filling a sentinel value
- [x] PASS: Aspect-ratio lock toggles `lockUniScaling` on the selected objects and fires `object:modified`
- [x] PASS: The common shape Appearance section exposes fill mode buttons `Solid`, `Linear`, and `Radial`
- [x] PASS: Solid fill uses a color picker, while linear and radial fill modes delegate to `GradientEditor`
- [x] PASS: Shape stroke controls expose a color picker, a slider plus number input for width `1..20`, dash presets `Solid`, `Dashed`, `Dotted`, `Dash-Dot`, and `Long Dash`, line-cap options `butt`, `round`, `square`, and line-join options `miter`, `round`, `bevel`
- [x] PASS: Rect-only corner-radius controls include a slider plus number input from `0` to the computed safe max and four per-corner fields labeled `Top Left`, `Top Right`, `Bottom Right`, and `Bottom Left`
- [x] PASS: All four rect corner fields still write the same uniform Fabric `rx/ry` value because the implementation does not support independent per-corner radii
- [x] PASS: Line objects expose only Appearance color plus the shared Stroke controls; there is no fill editor for lines
- [x] PASS: Text and textbox objects expose a Character panel with Font picker, Weight select, font size `1..999`, Bold/Italic/Underline/Strikethrough buttons, align buttons `Left`, `Center`, `Right`, `Justify`, line height `0.5..3`, character spacing `-200..1000`, fill color, stroke color, and stroke width `0..20`
- [x] PASS: Character panel weight options are `Light (300)`, `Regular (400)`, `Medium (500)`, `Semi-Bold (600)`, `Bold (700)`, and `Black (900)`
- [x] PASS: Image objects expose only read-only Width, Height, and Aspect ratio display rows; the live panel does not expose crop, recolor, or filter controls for images
- [x] PASS: Group objects expose only a single `Ungroup` action in their type-specific section
- [x] PASS: Unknown single-object types show exact fallback text `No editable properties for this object type`
- [x] PASS: Multi-select mode shows Transform, Align, Pathfinder, Effects, a count label like `{n} objects selected`, helper text `Mixed values are shown as —`, and common lock/clipping indicators
- [x] PASS: Align controls only render when at least 2 objects are selected, and Distribute controls only render when at least 3 objects are selected
- [x] PASS: Pathfinder controls only render when at least 2 objects are selected
- [x] PASS: The Common Actions lock button label switches between `🔒 Unlock` and `🔓 Lock`
- [x] PASS: Brush settings appear whenever the active tool is Brush, even if no object is selected
- [x] PASS: Brush settings expose Preset select values `Pen`, `Marker`, `Highlighter`, `Brush`, and `Calligraphy`, size `1..100`, thinning `0..1` step `0.05`, smoothing `0..1` step `0.05`, streamline `0..1` step `0.05`, a color picker, and opacity `0..1` step `0.05`
#### Export Pipeline
- [x] PASS: `ExportDialog` defaults to the `png` tab, resets its filename and local error state every time the dialog opens, and closes on `Escape` via a document-level keydown listener
- [x] PASS: Clicking the export overlay closes the dialog only when `e.target === e.currentTarget` and `isExporting` is false
- [x] PASS: The export button label changes from `Export` to `Exporting...` while `isExporting` is true
- [x] PASS: `FormatTabs` exposes exactly five formats with labels and descriptions: `PNG / Raster image`, `SVG / Vector graphic`, `PDF / Document`, `PPTX / PowerPoint`, and `LaTeX / TikZ code`
