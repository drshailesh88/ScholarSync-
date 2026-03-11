# slides-ai — Spec 016

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)
- [ ] `PresenterMode` is lazy-loaded via `React.lazy` with Suspense fallback showing "Loading presenter mode..." on a full-screen black background
- [ ] Presenter mode filters out slides where `hidden === true` before passing to `PresenterMode`
- [ ] Presenter mode starts at the index of the current `activeSlideId` within the visible slides (falls back to 0)
- [ ] Entire workspace is wrapped in `<ThemeProvider theme={themeConfig}>` so theme context propagates to all children
- [ ] Mode selection screen is shown only when `slides.length === 0` AND user has not yet chosen a mode; existing decks with slides skip it automatically
- [ ] Presenter receives `masters`, `themeKey`, `themeConfig`, and `transition` from the store
#### Slides Store — Additional State & Defaults (`slides-store.ts`)
- [ ] Default `agentMode` is `"draft"`, not `"learn"`
- [ ] Default `transition` is `"fade"`
- [ ] Default `themeKey` is `"modern"` and `themeConfig` is `PRESET_THEMES.modern`
- [ ] `RightPanel` full type union: `"properties" | "agent" | "comments" | "versions" | "analytics" | "defense" | "accessibility" | null`
- [ ] `loadDeck` clears `agentChatHistory` to empty array on every deck load
- [ ] `loadDeck` sets `activeSlideId` to the first slide's ID and `selectedSlideIds` to a Set of that ID
- [ ] `setActiveSlide` clears `selectedBlockIndices`, `allBlocksSelected`, and `editingBlockIndex`
- [ ] `addSlide` creates a slide with title `"New Slide"` and one text block `{ type: "text", data: { text: "Click to add content", style: "body" } }`
- [ ] `duplicateSlide` appends `" (copy)"` to the original slide's title
- [ ] `deleteSlide` is optimistic: removes from local state first, then restores `slides`, `activeSlideId`, and `selectedSlideIds` on server failure
- [ ] `reorderSlides` is optimistic: applies new order locally, reverts on server failure
- [ ] Undo stack is capped at `MAX_UNDO_HISTORY = 50` entries
- [ ] Undo coalesces rapid changes to the same slide within a 500ms debounce window, keeping the original before-state
- [ ] Calling `undo()` or `redo()` flushes any pending debounced undo entry first
- [ ] Any new edit clears the redo stack
- [ ] Save debounce: `_debouncedSave` waits 800ms of inactivity, then `saveStatus` goes `"saving"` → `"saved"` → (1500ms later) `"idle"`
- [ ] Save is skipped if the slide was deleted during the debounce window
- [ ] `customThemes` support: `addCustomTheme(key, config)` and `deleteCustomTheme(key)` persisted via `updateDeck`
- [ ] `institutionKit` support: `setInstitutionKit(kit)` for branding
- [ ] `gridSize` clamped between 1 and 100, defaults to 5
- [ ] Store exposes `showFindReplace`, `showSlideSorter`, `showRulers`, `showGrid`, `snapToGrid`, `showVisualizePopover`, `showSharePanel` boolean toggles
- [ ] Block clipboard: `copyBlock()` deep-clones selected blocks, `cutBlock()` copies then deletes, `pasteBlock()` inserts after last selected block
- [ ] `clipboardSlide` for slide-level copy/paste: `copySlide(id)` strips `id` and `sortOrder`, `pasteSlide()` creates after active slide
- [ ] `regenerateSlide` tracks in-progress IDs via `regeneratingSlideIds` Set, adds on start, removes in `finally`
- [ ] `regenerateSlide` sends context: `{ prevSlideTitle, nextSlideTitle, deckTitle, audienceType }`
- [ ] `replaceAllSlides` preserves `activeSlideId` if found in new slides, otherwise falls back to first
#### SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)
- [ ] Slides mode agent panel width is `w-80` (320px), not `w-[360px]` like Gamma mode
- [ ] Global keyboard shortcuts registered on mount via `registerGlobalShortcuts(useSlidesStore)`
- [ ] `PresenceBridgeSlot` rendered for real-time collaboration sync
