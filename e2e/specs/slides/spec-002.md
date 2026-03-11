# slides — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Slide Filmstrip (Left Panel)
#### Slide Thumbnails
- [ ] All slides displayed as thumbnails with slide numbers
- [ ] Active slide has a highlighted border
- [ ] Clicking a thumbnail activates that slide
- [ ] Shift+Click toggles multi-slide selection
- [ ] Hidden slides appear at 50% opacity with an eye-slash icon
- [ ] Regenerating slides show "Regenerating..." status label
- [ ] Collaboration presence dots shown per slide
#### Drag-to-Reorder
- [ ] Drag handle appears on hover (6-dot icon)
- [ ] Dragging a slide reorders it in the filmstrip
- [ ] Drop target highlights correctly
- [ ] Reorder persists after release
#### Add Slide
- [ ] "+ Add Slide" button at bottom of filmstrip
- [ ] New slide inserted after active slide
#### Filmstrip Context Menu (Right-Click)
- [ ] **New Slide** — inserts after the right-clicked slide
- [ ] **Duplicate Slide** — creates a copy
- [ ] **Copy Slide** — copies to clipboard
- [ ] **Cut Slide** — copies and removes (disabled if only 1 slide)
- [ ] **Paste Slide** — pastes from clipboard (disabled if clipboard empty)
- [ ] **Move to Beginning** — moves slide to position 1
- [ ] **Move to End** — moves slide to last position
- [ ] **Regenerate with AI...** — opens regenerate dialog
- [ ] **Regenerate Selected Slides...** — batch regenerate (multi-select)
- [ ] **Hide Slide** — toggles hidden flag
- [ ] **Change Layout...** — submenu with all standard layouts
- [ ] **Apply Master...** — submenu with "No Master" + all masters
- [ ] **Export as PNG HD** — exports current slide as PNG (Shift+Click = 3x scale)
- [ ] **Export as SVG** — exports current slide as SVG
- [ ] **Delete Slide** — removes slide (disabled if only 1 slide, red/danger style)

### WYSIWYG Canvas (Center Panel)
#### Title & Subtitle Editing
- [ ] Click on title text to enter inline edit mode
- [ ] Click on subtitle text to enter inline edit mode
- [ ] Changes save on blur / click away
- [ ] Master slide placeholder prompts shown when empty
#### Block Selection
- [ ] Click a block to select it (blue selection outline)
- [ ] Shift+Click to add/remove from multi-selection
- [ ] Click on canvas background deselects all blocks
