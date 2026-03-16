# slides — Spec 018

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: `Comments`, `Versions`, `Analytics`, `Defense`, and `Accessibility` panels each mount as separate right-side panes rather than tabs inside the properties panel
- [x] PASS: `VersionHistoryPanel` compare callback is a no-op in `SlidesModeLayout`
- [x] PASS: `CommentsPanel` in slides mode passes a no-op `onUnresolvedCountChange`
- [x] PASS: `SlidesToolbar` starts with `Design` selected because `rightPanel` defaults to `"properties"` in the store
- [x] PASS: Toolbar mode toggle uses `ModeSelector` with `Slides` and `Create` buttons, not generic text tabs
- [x] PASS: Toolbar `Insert` button opens `InsertMenu` anchored to the button ref
- [x] PASS: Toolbar `Visualize` button opens `VisualizePopover` anchored to the sparkle button ref
- [x] PASS: Choosing `Visualize` from `InsertMenu` closes the insert menu and opens the visualize popover with an initial block type
- [x] PASS: Undo availability includes either populated `_undoStack` or a pending coalesced undo snapshot
- [x] PASS: Toolbar `View` options are hover-revealed via CSS group hover, not click toggled
- [x] PASS: `Snap to Grid` checkbox is disabled whenever `showGrid` is false
- [x] PASS: Save indicator shows icon-only idle state using `FloppyDisk`
- [x] PASS: Save indicator `saving` state is spinner plus `Saving...`
- [x] PASS: Save indicator `saved` state is green check plus `Saved`
- [x] PASS: Save indicator `error` state is red warning plus `Save error`
- [x] PASS: Toolbar exposes labeled `Agent` and icon-only `Defense`, `Comments`, `Analytics`, `Version history`, and `A11y` toggles
- [x] PASS: Toolbar includes `Generate All Images` bulk action with inline progress text and progress bar
- [x] PASS: `Generate All Images` shows `No empty image placeholders found.` when there are no image blocks lacking URLs
- [x] PASS: Bulk image generation processes image blocks with concurrency limit 5
- [x] PASS: Bulk image generation updates only placeholder image blocks by merging generated image data into block paths
- [x] PASS: Toolbar `Share` button only sets store state `showSharePanel = true`
- [x] PASS: Toolbar `Present` button sets `isPresenting = true` in the slides store
- [x] PASS: Export menu is shown on hover of the `Export` button, not click
- [x] PASS: Export menu includes `PowerPoint (.pptx)`, `PDF Handout`, `PNG (Current Slide)`, `PNG (All Slides as ZIP)`, and `SVG (Current Slide)`
- [x] PASS: Export menu advertises `HD (Shift+Click)` helper text for both PNG actions
- [x] PASS: `SlideFilmstrip` width is fixed at `w-48`, not `w-64`
- [x] PASS: Filmstrip stores context-menu target slide id separately from active slide id
- [x] PASS: Right-clicking a non-selected slide first selects it before opening the context menu
- [x] PASS: Context-menu `selectedContextSlideIds` expands to all selected slides only when the right-clicked slide is already part of the multi-selection
- [x] PASS: Filmstrip context menu offers `No Master` plus dynamic masters under `Apply Master...`
- [x] PASS: Applying a master also sets the slide layout to `master.layout`
- [x] PASS: Filmstrip `Hide Slide` toggles the slide `hidden` boolean rather than permanently removing it
- [x] PASS: Regenerate dialog title changes between `Regenerate This Slide` and `Regenerate Selected Slides` based on target count
- [x] PASS: Filmstrip PNG/SVG context-menu export renders the slide off-screen using `SlideRendererV2` before capture
- [x] PASS: Filmstrip context-menu PNG export filename includes zero-padded slide number and sanitized slide title
