# slides — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Slide Filmstrip (Left Panel)
#### Slide Thumbnails
- [x] PASS: All slides displayed as thumbnails with slide numbers
- [x] PASS: Active slide has a highlighted border
- [x] PASS: Clicking a thumbnail activates that slide
- [x] PASS: Shift+Click toggles multi-slide selection
- [x] PASS: Hidden slides appear at 50% opacity with an eye-slash icon
- [x] PASS: Regenerating slides show "Regenerating..." status label
- [x] PASS: Collaboration presence dots shown per slide
#### Drag-to-Reorder
- [x] PASS: Drag handle appears on hover (6-dot icon)
- [x] PASS: Dragging a slide reorders it in the filmstrip
- [x] PASS: Drop target highlights correctly
- [x] PASS: Reorder persists after release
#### Add Slide
- [x] PASS: "+ Add Slide" button at bottom of filmstrip
- [x] PASS: New slide inserted after active slide
#### Filmstrip Context Menu (Right-Click)
- [x] PASS: **New Slide** — inserts after the right-clicked slide
- [x] PASS: **Duplicate Slide** — creates a copy
- [x] PASS: **Copy Slide** — copies to clipboard
- [x] PASS: **Cut Slide** — copies and removes (disabled if only 1 slide)
- [x] PASS: **Paste Slide** — pastes from clipboard (disabled if clipboard empty)
- [x] PASS: **Move to Beginning** — moves slide to position 1
- [x] PASS: **Move to End** — moves slide to last position
- [x] PASS: **Regenerate with AI...** — opens regenerate dialog
- [x] PASS: **Regenerate Selected Slides...** — batch regenerate (multi-select)
- [x] PASS: **Hide Slide** — toggles hidden flag
- [x] PASS: **Change Layout...** — submenu with all standard layouts
- [x] PASS: **Apply Master...** — submenu with "No Master" + all masters
- [x] PASS: **Export as PNG HD** — exports current slide as PNG (Shift+Click = 3x scale)
- [x] PASS: **Export as SVG** — exports current slide as SVG
- [x] PASS: **Delete Slide** — removes slide (disabled if only 1 slide, red/danger style)

### WYSIWYG Canvas (Center Panel)
#### Title & Subtitle Editing
- [x] PASS: Click on title text to enter inline edit mode
- [x] PASS: Click on subtitle text to enter inline edit mode
- [x] PASS: Changes save on blur / click away
- [x] PASS: Master slide placeholder prompts shown when empty
#### Block Selection
- [x] PASS: Click a block to select it (blue selection outline)
- [x] PASS: Shift+Click to add/remove from multi-selection
- [x] PASS: Click on canvas background deselects all blocks
