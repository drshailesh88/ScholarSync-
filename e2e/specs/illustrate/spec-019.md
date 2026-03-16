# illustrate — Spec 019

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Editor Menus, Toolbar, and Status Bar — Detailed Cases
- [x] PASS: File > Save As menu action prompts with default value `diagram.finnish`
- [x] PASS: File > Save As menu action appends `.finnish` when the entered filename omits the extension
- [x] PASS: File > Save As menu action success toast reads `Saved as "{finalFilename}"`
- [x] PASS: `Ctrl+Shift+S` shortcut save-as path shows toast `Saved: {filename}` using the raw prompt string instead of the final appended download name
- [x] PASS: File > Recent Files submenu is static placeholder content rather than a live recent-file list
- [x] PASS: File > Recent Files includes disabled rows `diagram-1.finnish`, `flowchart.finnish`, and `No recent files`
- [x] PASS: Image menu includes disabled placeholder items `Crop Image` and `Resize Image`
- [x] PASS: Help > Keyboard Shortcuts currently shows a long-lived toast summary rather than opening the richer `ShortcutsHelp` modal component
- [x] PASS: Help > Keyboard Shortcuts toast stays visible for about 10 seconds
- [x] PASS: Help > About FINNISH shows toast text beginning `FINNISH v0.1.0 - AI-Powered Scientific Illustration Tool.`
- [x] PASS: Help > About FINNISH toast stays visible for about 8 seconds
- [x] PASS: Help > Documentation opens `https://finnish.dev/docs` in a new tab
- [x] PASS: Toolbar root has `role="toolbar"` and `aria-orientation="vertical"`
- [x] PASS: Toolbar keyboard navigation supports `ArrowUp`, `ArrowDown`, `Home`, and `End` for moving focus between toolbar buttons
- [x] PASS: Polygon config popup opens only when the Polygon tool is clicked while already active
- [x] PASS: Polygon sides input clamps values to 3 through 24 in the store
- [x] PASS: Star config popup opens only when the Star tool is clicked while already active
- [x] PASS: Star points input clamps values to 3 through 24 in the store
- [x] PASS: Scientific Shapes toolbar button label is "Scientific Shapes"
- [x] PASS: Status bar shows selection value `None` when no objects are selected
- [x] PASS: Status bar zoom reset button `aria-label` includes the current zoom percentage
- [x] PASS: Status bar zoom-in increments by 10%
- [x] PASS: Status bar zoom-out decrements by 10%
- [x] PASS: Status bar zoom reset restores store zoom and viewport transform to defaults
- [x] PASS: Ruler-corner unit toggle title is `Ruler units: {UNIT} (click to toggle)`
#### Editor File Import, Canvas Interaction, and Toast Outcomes
- [x] PASS: Creating a new document shows browser confirm text `Create new document? Unsaved changes will be lost.`
- [x] PASS: Confirming New clears the canvas and shows info toast `New document created`
- [x] PASS: Cancelling New leaves current canvas state intact
- [x] PASS: Hidden Place Image picker accepts `.png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml`
- [x] PASS: Unsupported image file selection shows error toast `Unsupported image file. Use PNG, JPG, or SVG.`
- [x] PASS: Successful image file placement from picker shows success toast `Placed image: {file.name}`
- [x] PASS: Pasting supported image data from clipboard shows success toast `Pasted image from clipboard`
- [x] PASS: Image-import failure shows error toast `Failed to import image`
- [x] PASS: Canvas drag-over sets `dropEffect` to `copy`
- [x] PASS: Canvas drag-leave ignores internal child transitions so the active dropzone does not flicker off while moving within the canvas area
