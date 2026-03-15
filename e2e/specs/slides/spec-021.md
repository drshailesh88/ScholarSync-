# slides — Spec 021

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Slide Store — Defaults & Internals
- [x] PASS: Store default `snapToGrid` is `false`
- [x] PASS: `gridSize` is clamped to range `[1, 100]` and non-finite values fall back to `5`
- [x] PASS: Undo entries coalesce with a 500ms debounce timer before flushing to the undo stack
- [x] PASS: Maximum undo history is 50 entries (`MAX_UNDO_HISTORY = 50`)
- [x] PASS: Any new action clears the redo stack
- [x] PASS: Debounced save fires 800ms after last `updateSlide` call
- [x] PASS: Save status transitions: `idle` → `saving` → `saved` → `idle` (auto-reset after 1500ms)
- [x] PASS: Save status transitions to `error` on server failure with no auto-reset
- [x] PASS: Agent chat history is capped at 50 messages (`MAX_CHAT_HISTORY = 50`)
- [x] PASS: `AgentMode` type has four values: `"learn"`, `"draft"`, `"visual"`, `"illustrate"`
- [x] PASS: `loadDeck` resets `agentChatHistory` to `[]`, `editingBlockIndex` to `null`, `saveStatus` to `"idle"`
- [x] PASS: `loadDeck` sets `activeSlideId` to the first slide's ID (or `null` if empty)
- [x] PASS: `loadDeck` sets `selectedSlideIds` to a `Set` containing only the first slide's ID
#### Slide Store — Duplicate Slide Behavior
- [x] PASS: `duplicateSlide` appends ` (copy)` to the source slide's title
- [x] PASS: `duplicateSlide` preserves source `transition`, `hidden`, `cardBackground`, and `masterId`
- [x] PASS: `duplicateSlide` activates and selects the newly created slide
#### Slide Store — Delete Slide Behavior
- [x] PASS: `deleteSlide` uses optimistic update: removes from state before server call
- [x] PASS: `deleteSlide` reverts to previous state (`slides`, `activeSlideId`, `selectedSlideIds`) on server failure
- [x] PASS: When the deleted slide was active, `activeSlideId` falls back to `filtered[0].id`
- [x] PASS: After deletion, if `selectedSlideIds` becomes empty and `newActiveId` is not null, the active slide is added to selection
#### Slide Store — New Slide Defaults
- [x] PASS: `addSlide` creates a slide with layout `"title_content"`, title `"New Slide"`, one text block `{ type: "text", data: { text: "Click to add content", style: "body" } }`
- [x] PASS: `addSlide` failure sets `saveStatus` to `"error"` and returns `null`
#### Slide Store — Block Selection State
- [x] PASS: `setActiveSlide` resets `selectedBlockIndices` to empty, `allBlocksSelected` to `false`, and `editingBlockIndex` to `null`
- [x] PASS: `selectBlock` with `addToSelection=true` toggles the block in/out of multi-selection
- [x] PASS: `deleteSelectedBlocks` also resets `editingBlockIndex` to `null`
#### Keyboard Shortcuts — Tab Cycling Guard
- [x] PASS: `Tab` cycling only works when `selectedBlockIndices.size > 0` AND `allBlocksSelected` is false
- [x] PASS: `Tab` cycling requires a `primarySelectedBlockIndex` to be non-null; otherwise no-op
- [x] PASS: `Delete`/`Backspace` respects lock: if any selected block has `locked: true`, the entire deletion is skipped
#### Handout Export Dialog — Defaults & Details
- [x] PASS: Handout dialog default layout is `"three_up_notes"` (not `"full_slide"`)
- [x] PASS: Handout dialog defaults: `includeSlideNumbers: true`, `includeHeader: true`, `includeSpeakerNotes: true`, `paperSize: "letter"`
- [x] PASS: Speaker notes toggle is disabled unless layout is `"three_up_notes"`
- [x] PASS: Outline layout description is `Text document, no images`
- [x] PASS: Six Slides layout description is `3x2 grid`
- [x] PASS: Dialog title reads `Export PDF Handout` with FilePdf icon
- [x] PASS: Export button text toggles between `Export PDF` and `Exporting...`
