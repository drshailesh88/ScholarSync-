# library — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Filters
#### Clear Filters Button
- [ ] Translucent red background/hover when filters are active
- [ ] Clicking resets non-search filters to defaults
- [ ] Hidden when no non-search filters are active
#### Filter Behavior
- [ ] All filters are AND'd together (combined filtering)
- [ ] Filters trigger server-side re-fetch
- [ ] Filter state persists while the page remains mounted

### Paper Cards
#### Card Layout
- [ ] Glass-panel background with `rounded-xl` border
- [ ] Left icon: PDF icon (if `source === "user_upload"`) or Globe icon
#### Card Content
- [ ] **Title** — `font-medium`, wraps naturally (no truncation class)
- [ ] **Authors** — comma-separated, truncated
- [ ] **Metadata row** — "Journal · Year · Citation Count · Study Type"
- [ ] Missing metadata fields show fallback text (e.g., "Unknown journal" for missing journal — no raw "null" shown)
#### Empty States
- [ ] Loading: "Loading papers..." text-only state
- [ ] No results (with filters/search): "No papers match your search or filters."
- [ ] Empty library: BookOpen icon + "Your library is empty. Add papers from Discover."

### Favorites
- [ ] Star icon on each paper card toggles favorite
- [ ] Filled star (amber-500) = favorited
- [ ] Empty star = not favorited
- [ ] Toggle calls `toggleFavorite(refId)` server action
- [ ] Optimistic UI update (immediate visual toggle)
- [ ] Reverts on error
- [ ] Favorites collection in sidebar shows correct count
- [ ] Clicking "Favorites" in sidebar filters to favorited papers only

### Citation Modal
- [ ] Opens when "Cite" button clicked on a paper card
- [ ] Modal title: "Cite Source"
- [ ] Modal with backdrop blur
#### Citation Style Tabs
- [ ] Selecting a tab shows formatted citation for that style
- [ ] Loading state: "Formatting citations..." with pulse animation
- [ ] Citation text displayed in monospace area (min-h-80px)
#### Copy Buttons
- [ ] **Copy Citation** (primary/brand) — copies full bibliography entry
- [ ] **Copy In-Text** (secondary/bordered) — copies parenthetical citation
- [ ] Hidden for BibTeX style (only full copy available)
- [ ] Copy feedback: text changes to "Copied!" for 2 seconds
- [ ] Clipboard write succeeds

### PDF Viewer
- [ ] Opens when "View PDF" clicked on a paper card
