# slides — Spec 021

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Slide Store — Defaults & Internals
- [ ] Store default `snapToGrid` is `false`
- [ ] `gridSize` is clamped to range `[1, 100]` and non-finite values fall back to `5`
- [ ] Undo entries coalesce with a 500ms debounce timer before flushing to the undo stack
- [ ] Maximum undo history is 50 entries (`MAX_UNDO_HISTORY = 50`)
- [ ] Any new action clears the redo stack
- [ ] Debounced save fires 800ms after last `updateSlide` call
- [ ] Save status transitions: `idle` → `saving` → `saved` → `idle` (auto-reset after 1500ms)
- [ ] Save status transitions to `error` on server failure with no auto-reset
- [ ] Agent chat history is capped at 50 messages (`MAX_CHAT_HISTORY = 50`)
- [ ] `AgentMode` type has four values: `"learn"`, `"draft"`, `"visual"`, `"illustrate"`
- [ ] `loadDeck` resets `agentChatHistory` to `[]`, `editingBlockIndex` to `null`, `saveStatus` to `"idle"`
- [ ] `loadDeck` sets `activeSlideId` to the first slide's ID (or `null` if empty)
- [ ] `loadDeck` sets `selectedSlideIds` to a `Set` containing only the first slide's ID
#### Slide Store — Duplicate Slide Behavior
- [ ] `duplicateSlide` appends ` (copy)` to the source slide's title
- [ ] `duplicateSlide` preserves source `transition`, `hidden`, `cardBackground`, and `masterId`
- [ ] `duplicateSlide` activates and selects the newly created slide
#### Slide Store — Delete Slide Behavior
- [ ] `deleteSlide` uses optimistic update: removes from state before server call
- [ ] `deleteSlide` reverts to previous state (`slides`, `activeSlideId`, `selectedSlideIds`) on server failure
- [ ] When the deleted slide was active, `activeSlideId` falls back to `filtered[0].id`
- [ ] After deletion, if `selectedSlideIds` becomes empty and `newActiveId` is not null, the active slide is added to selection
#### Slide Store — New Slide Defaults
- [ ] `addSlide` creates a slide with layout `"title_content"`, title `"New Slide"`, one text block `{ type: "text", data: { text: "Click to add content", style: "body" } }`
- [ ] `addSlide` failure sets `saveStatus` to `"error"` and returns `null`
#### Slide Store — Block Selection State
- [ ] `setActiveSlide` resets `selectedBlockIndices` to empty, `allBlocksSelected` to `false`, and `editingBlockIndex` to `null`
- [ ] `selectBlock` with `addToSelection=true` toggles the block in/out of multi-selection
- [ ] `deleteSelectedBlocks` also resets `editingBlockIndex` to `null`
#### Keyboard Shortcuts — Tab Cycling Guard
- [ ] `Tab` cycling only works when `selectedBlockIndices.size > 0` AND `allBlocksSelected` is false
- [ ] `Tab` cycling requires a `primarySelectedBlockIndex` to be non-null; otherwise no-op
- [ ] `Delete`/`Backspace` respects lock: if any selected block has `locked: true`, the entire deletion is skipped
#### Handout Export Dialog — Defaults & Details
- [ ] Handout dialog default layout is `"three_up_notes"` (not `"full_slide"`)
- [ ] Handout dialog defaults: `includeSlideNumbers: true`, `includeHeader: true`, `includeSpeakerNotes: true`, `paperSize: "letter"`
- [ ] Speaker notes toggle is disabled unless layout is `"three_up_notes"`
- [ ] Outline layout description is `Text document, no images`
- [ ] Six Slides layout description is `3x2 grid`
- [ ] Dialog title reads `Export PDF Handout` with FilePdf icon
- [ ] Export button text toggles between `Export PDF` and `Exporting...`
