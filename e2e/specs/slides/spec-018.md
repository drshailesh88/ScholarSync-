# slides — Spec 018

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] `Comments`, `Versions`, `Analytics`, `Defense`, and `Accessibility` panels each mount as separate right-side panes rather than tabs inside the properties panel
- [ ] `VersionHistoryPanel` compare callback is a no-op in `SlidesModeLayout`
- [ ] `CommentsPanel` in slides mode passes a no-op `onUnresolvedCountChange`
- [ ] `SlidesToolbar` starts with `Design` selected because `rightPanel` defaults to `"properties"` in the store
- [ ] Toolbar mode toggle uses `ModeSelector` with `Slides` and `Create` buttons, not generic text tabs
- [ ] Toolbar `Insert` button opens `InsertMenu` anchored to the button ref
- [ ] Toolbar `Visualize` button opens `VisualizePopover` anchored to the sparkle button ref
- [ ] Choosing `Visualize` from `InsertMenu` closes the insert menu and opens the visualize popover with an initial block type
- [ ] Undo availability includes either populated `_undoStack` or a pending coalesced undo snapshot
- [ ] Toolbar `View` options are hover-revealed via CSS group hover, not click toggled
- [ ] `Snap to Grid` checkbox is disabled whenever `showGrid` is false
- [ ] Save indicator shows icon-only idle state using `FloppyDisk`
- [ ] Save indicator `saving` state is spinner plus `Saving...`
- [ ] Save indicator `saved` state is green check plus `Saved`
- [ ] Save indicator `error` state is red warning plus `Save error`
- [ ] Toolbar exposes labeled `Agent` and icon-only `Defense`, `Comments`, `Analytics`, `Version history`, and `A11y` toggles
- [ ] Toolbar includes `Generate All Images` bulk action with inline progress text and progress bar
- [ ] `Generate All Images` shows `No empty image placeholders found.` when there are no image blocks lacking URLs
- [ ] Bulk image generation processes image blocks with concurrency limit 5
- [ ] Bulk image generation updates only placeholder image blocks by merging generated image data into block paths
- [ ] Toolbar `Share` button only sets store state `showSharePanel = true`
- [ ] Toolbar `Present` button sets `isPresenting = true` in the slides store
- [ ] Export menu is shown on hover of the `Export` button, not click
- [ ] Export menu includes `PowerPoint (.pptx)`, `PDF Handout`, `PNG (Current Slide)`, `PNG (All Slides as ZIP)`, and `SVG (Current Slide)`
- [ ] Export menu advertises `HD (Shift+Click)` helper text for both PNG actions
- [ ] `SlideFilmstrip` width is fixed at `w-48`, not `w-64`
- [ ] Filmstrip stores context-menu target slide id separately from active slide id
- [ ] Right-clicking a non-selected slide first selects it before opening the context menu
- [ ] Context-menu `selectedContextSlideIds` expands to all selected slides only when the right-clicked slide is already part of the multi-selection
- [ ] Filmstrip context menu offers `No Master` plus dynamic masters under `Apply Master...`
- [ ] Applying a master also sets the slide layout to `master.layout`
- [ ] Filmstrip `Hide Slide` toggles the slide `hidden` boolean rather than permanently removing it
- [ ] Regenerate dialog title changes between `Regenerate This Slide` and `Regenerate Selected Slides` based on target count
- [ ] Filmstrip PNG/SVG context-menu export renders the slide off-screen using `SlideRendererV2` before capture
- [ ] Filmstrip context-menu PNG export filename includes zero-padded slide number and sanitized slide title
