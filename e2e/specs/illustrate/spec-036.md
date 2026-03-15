# illustrate — Spec 036

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Document Settings Dialog — Full Details (`DocumentSettings.tsx`, `document-settings.ts`)
- [x] PASS: Width input has `id="canvas-width-input"`, `type="number"`, `min={1}`
- [x] PASS: Height input has `id="canvas-height-input"`, `type="number"`, `min={1}`
- [x] PASS: Manually editing width or height auto-sets preset to `custom`
- [x] PASS: Background color input has `id="canvas-background-input"`, `type="color"`
- [x] PASS: Default background color constant is `#ffffff`
- [x] PASS: `handleConfirm` clamps width and height to `Math.max(1, Math.round(value))`
- [x] PASS: Footer buttons: `Cancel` and `Apply`
- [x] PASS: `detectPreset` auto-identifies the matching preset and orientation from initial dimensions on open
- [x] PASS: `clampCanvasDimension` returns fallback (default 1) for non-finite values
- [x] PASS: Selecting `custom` preset does not change width/height; only non-custom presets update dimensions
#### Figure Panel Generator — Full Details (`FigurePanelGenerator.tsx`)
- [x] PASS: Dialog title text is `Figure Panel Layout`
- [x] PASS: 9 layout presets in 3-column grid: `1x1` (Single panel), `1x2` (Two panels side by side), `2x1` (Two panels stacked), `2x2` (Four panel grid), `2x3` (Six panel grid), `3x2` (Six panel vertical), `3x3` (Nine panel grid), `2x4` (Eight panel grid), `4x2` (Eight panel vertical)
- [x] PASS: Each preset button shows a mini visual grid preview matching its rows×cols
- [x] PASS: Default config: rows=2, cols=2, panelWidth=150, panelHeight=150, gap=20, showLabels=true, labelPosition=`top-left`, labelFontSize=24, strokeWidth=2, strokeColor=`#000000`, fillColor=`#ffffff`
- [x] PASS: Label position options: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `center`
- [x] PASS: Labels use uppercase letters A through Z (max 26 panels)
- [x] PASS: Labels are IText objects with `fontFamily: 'Arial'`, `fontWeight: 'bold'`
- [x] PASS: Panel rectangles use Fabric `Rect` objects with configured fill, stroke, and strokeWidth
- [x] PASS: Generated panels are centered on canvas using `(canvasWidth / 2 - totalWidth / 2)`
- [x] PASS: Number inputs clamp values between `min` (default 1) and `max` (default 1000)
- [x] PASS: Footer has `Cancel` and `Generate Panels` buttons
#### Character Panel — Full Details (`CharacterPanel.tsx`)
- [x] PASS: Font weight options: `Light (300)`, `Regular (400)`, `Medium (500)`, `Semi-Bold (600)`, `Bold (700)`, `Black (900)`
- [x] PASS: Text alignment options: `left`, `center`, `right`, `justify`
- [x] PASS: `charSpacing` property is exposed for character spacing control
- [x] PASS: `lineHeight` property is exposed for line height control
- [x] PASS: `underline` and `linethrough` (strikethrough) toggles are exposed
- [x] PASS: `fontStyle` toggle for italic (`italic` vs normal)
- [x] PASS: Fill color and stroke color with stroke width controls are text-specific
- [x] PASS: Selection-aware: reads `getSelectionStyles()` for partial text formatting
#### Keyboard Shortcuts — Additional Details (`useKeyboardShortcuts.ts`)
- [x] PASS: Shortcuts are ignored when `target.tagName === 'INPUT'`, `'TEXTAREA'`, or `target.isContentEditable`
- [x] PASS: Space key handler checks `!e.repeat` to prevent re-triggering on held Space
- [x] PASS: Tool shortcuts are skipped when ctrlOrCmd is pressed (`category === 'tool' && !shortcut.ctrlOrCmd && ctrlOrCmd`)
- [x] PASS: `Backspace` key also triggers delete (in addition to `Delete`)
- [x] PASS: `B` key shortcut for Brush tool is NOT registered in default shortcuts (only PEN, not BRUSH)
- [x] PASS: `Z` key shortcut for Zoom tool is NOT registered in default shortcuts
