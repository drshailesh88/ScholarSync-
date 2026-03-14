# slides — Spec 024

STATUS: DONE
TESTED: 14/14
PASS: 14
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Version History Panel — Restore Behavior
- [x] PASS: `VersionHistoryPanel` `onDeckRestored` callback closes the right panel and reloads the deck via `loadDeck(deckId)`
#### Delete Master — Cascade
- [x] PASS: `deleteMaster(id)` removes the master AND sets `masterId` to `undefined` on all slides that used it
#### Behavior Corrections (Pass 2 — 10 checkboxes)
- [x] PASS: The page title on `/slides` is `Presentations` (h1), not `Slides` or `Slide Decks`
- [x] PASS: The empty-state heading is `No presentations yet`, not `No decks found` or similar
- [x] PASS: Deck delete confirmation dialog uses native `confirm()` with text `Delete this presentation?` (not a custom modal)
- [x] PASS: The `Visualize` button tooltip reads `Visualize (Ctrl+Shift+V)`, not `Cmd+Shift+V`
- [x] PASS: F5 (present from beginning) first navigates to the first *sorted* slide before setting `isPresenting`; Shift+F5 keeps the current slide
- [x] PASS: Global Escape handler cascades in exact order: exit editing → deselect blocks → exit presenting; it does NOT close find/replace
- [x] PASS: Tab cycling between blocks requires at least one block to be selected first; it does not work from a zero-selection state
- [x] PASS: The `Properties Panel` width is `w-72`, not `w-80` — agent/defense/comments/versions/analytics panels use `w-80`
- [x] PASS: Slide import preview cards show `line-clamp-3` on `previewText` only when `previewText` is truthy (conditional rendering)
- [x] PASS: Completed StatusChip shows a static dot (`h-2 w-2 rounded-full`), not a checkmark icon
#### Component Wiring Notes
- [x] PASS: `showSharePanel` store state is set by Share button but `SlidesModeLayout` does not render a `SharePanel` component
- [x] PASS: `SlideSorterView` is only rendered when `showSlideSorter` is true (toggled from toolbar GridFour button)
