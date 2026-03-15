# illustrate — Spec 019

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Editor Menus, Toolbar, and Status Bar — Detailed Cases
- [ ] File > Save As menu action prompts with default value `diagram.finnish`
- [ ] File > Save As menu action appends `.finnish` when the entered filename omits the extension
- [ ] File > Save As menu action success toast reads `Saved as "{finalFilename}"`
- [ ] `Ctrl+Shift+S` shortcut save-as path shows toast `Saved: {filename}` using the raw prompt string instead of the final appended download name
- [ ] File > Recent Files submenu is static placeholder content rather than a live recent-file list
- [ ] File > Recent Files includes disabled rows `diagram-1.finnish`, `flowchart.finnish`, and `No recent files`
- [ ] Image menu includes disabled placeholder items `Crop Image` and `Resize Image`
- [ ] Help > Keyboard Shortcuts currently shows a long-lived toast summary rather than opening the richer `ShortcutsHelp` modal component
- [ ] Help > Keyboard Shortcuts toast stays visible for about 10 seconds
- [ ] Help > About FINNISH shows toast text beginning `FINNISH v0.1.0 - AI-Powered Scientific Illustration Tool.`
- [ ] Help > About FINNISH toast stays visible for about 8 seconds
- [ ] Help > Documentation opens `https://finnish.dev/docs` in a new tab
- [ ] Toolbar root has `role="toolbar"` and `aria-orientation="vertical"`
- [ ] Toolbar keyboard navigation supports `ArrowUp`, `ArrowDown`, `Home`, and `End` for moving focus between toolbar buttons
- [ ] Polygon config popup opens only when the Polygon tool is clicked while already active
- [ ] Polygon sides input clamps values to 3 through 24 in the store
- [ ] Star config popup opens only when the Star tool is clicked while already active
- [ ] Star points input clamps values to 3 through 24 in the store
- [ ] Scientific Shapes toolbar button label is "Scientific Shapes"
- [ ] Status bar shows selection value `None` when no objects are selected
- [ ] Status bar zoom reset button `aria-label` includes the current zoom percentage
- [ ] Status bar zoom-in increments by 10%
- [ ] Status bar zoom-out decrements by 10%
- [ ] Status bar zoom reset restores store zoom and viewport transform to defaults
- [ ] Ruler-corner unit toggle title is `Ruler units: {UNIT} (click to toggle)`
#### Editor File Import, Canvas Interaction, and Toast Outcomes
- [ ] Creating a new document shows browser confirm text `Create new document? Unsaved changes will be lost.`
- [ ] Confirming New clears the canvas and shows info toast `New document created`
- [ ] Cancelling New leaves current canvas state intact
- [ ] Hidden Place Image picker accepts `.png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml`
- [ ] Unsupported image file selection shows error toast `Unsupported image file. Use PNG, JPG, or SVG.`
- [ ] Successful image file placement from picker shows success toast `Placed image: {file.name}`
- [ ] Pasting supported image data from clipboard shows success toast `Pasted image from clipboard`
- [ ] Image-import failure shows error toast `Failed to import image`
- [ ] Canvas drag-over sets `dropEffect` to `copy`
- [ ] Canvas drag-leave ignores internal child transitions so the active dropzone does not flicker off while moving within the canvas area
