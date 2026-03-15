# slides-ai — Spec 016

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)
- [x] PASS: `PresenterMode` is lazy-loaded via `React.lazy` with Suspense fallback showing "Loading presenter mode..." on a full-screen black background
- [x] PASS: Presenter mode filters out slides where `hidden === true` before passing to `PresenterMode`
- [x] PASS: Presenter mode starts at the index of the current `activeSlideId` within the visible slides (falls back to 0)
- [x] PASS: Entire workspace is wrapped in `<ThemeProvider theme={themeConfig}>` so theme context propagates to all children
- [x] PASS: Mode selection screen is shown only when `slides.length === 0` AND user has not yet chosen a mode; existing decks with slides skip it automatically
- [x] PASS: Presenter receives `masters`, `themeKey`, `themeConfig`, and `transition` from the store
#### Slides Store — Additional State & Defaults (`slides-store.ts`)
- [x] PASS: Default `agentMode` is `"draft"`, not `"learn"`
- [x] PASS: Default `transition` is `"fade"`
- [x] PASS: Default `themeKey` is `"modern"` and `themeConfig` is `PRESET_THEMES.modern`
- [x] PASS: `RightPanel` full type union: `"properties" | "agent" | "comments" | "versions" | "analytics" | "defense" | "accessibility" | null`
- [x] PASS: `loadDeck` clears `agentChatHistory` to empty array on every deck load
- [x] PASS: `loadDeck` sets `activeSlideId` to the first slide's ID and `selectedSlideIds` to a Set of that ID
- [x] PASS: `setActiveSlide` clears `selectedBlockIndices`, `allBlocksSelected`, and `editingBlockIndex`
- [x] PASS: `addSlide` creates a slide with title `"New Slide"` and one text block `{ type: "text", data: { text: "Click to add content", style: "body" } }`
- [x] PASS: `duplicateSlide` appends `" (copy)"` to the original slide's title
- [x] PASS: `deleteSlide` is optimistic: removes from local state first, then restores `slides`, `activeSlideId`, and `selectedSlideIds` on server failure
- [x] PASS: `reorderSlides` is optimistic: applies new order locally, reverts on server failure
- [x] PASS: Undo stack is capped at `MAX_UNDO_HISTORY = 50` entries
- [x] PASS: Undo coalesces rapid changes to the same slide within a 500ms debounce window, keeping the original before-state
- [x] PASS: Calling `undo()` or `redo()` flushes any pending debounced undo entry first
- [x] PASS: Any new edit clears the redo stack
- [x] PASS: Save debounce: `_debouncedSave` waits 800ms of inactivity, then `saveStatus` goes `"saving"` → `"saved"` → (1500ms later) `"idle"`
- [x] PASS: Save is skipped if the slide was deleted during the debounce window
- [x] PASS: `customThemes` support: `addCustomTheme(key, config)` and `deleteCustomTheme(key)` persisted via `updateDeck`
- [x] PASS: `institutionKit` support: `setInstitutionKit(kit)` for branding
- [x] PASS: `gridSize` clamped between 1 and 100, defaults to 5
- [x] PASS: Store exposes `showFindReplace`, `showSlideSorter`, `showRulers`, `showGrid`, `snapToGrid`, `showVisualizePopover`, `showSharePanel` boolean toggles
- [x] PASS: Block clipboard: `copyBlock()` deep-clones selected blocks, `cutBlock()` copies then deletes, `pasteBlock()` inserts after last selected block
- [x] PASS: `clipboardSlide` for slide-level copy/paste: `copySlide(id)` strips `id` and `sortOrder`, `pasteSlide()` creates after active slide
- [x] PASS: `regenerateSlide` tracks in-progress IDs via `regeneratingSlideIds` Set, adds on start, removes in `finally`
- [x] PASS: `regenerateSlide` sends context: `{ prevSlideTitle, nextSlideTitle, deckTitle, audienceType }`
- [x] PASS: `replaceAllSlides` preserves `activeSlideId` if found in new slides, otherwise falls back to first
#### SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)
- [x] PASS: Slides mode agent panel width is `w-80` (320px), not `w-[360px]` like Gamma mode
- [x] PASS: Global keyboard shortcuts registered on mount via `registerGlobalShortcuts(useSlidesStore)`
- [x] PASS: `PresenceBridgeSlot` rendered for real-time collaboration sync
