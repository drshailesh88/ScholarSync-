# library — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Filters
#### Clear Filters Button
- [x] PASS: Translucent red background/hover when filters are active
- [x] PASS: Clicking resets non-search filters to defaults
- [x] PASS: Hidden when no non-search filters are active
#### Filter Behavior
- [x] PASS: All filters are AND'd together (combined filtering)
- [x] PASS: Filters trigger server-side re-fetch
- [x] PASS: Filter state persists while the page remains mounted

### Paper Cards
#### Card Layout
- [x] PASS: Glass-panel background with `rounded-xl` border
- [x] PASS: Left icon: PDF icon (if `source === "user_upload"`) or Globe icon
#### Card Content
- [x] PASS: **Title** — `font-medium`, wraps naturally (no truncation class)
- [x] PASS: **Authors** — comma-separated, truncated
- [x] PASS: **Metadata row** — "Journal · Year · Citation Count · Study Type"
- [x] PASS: Missing metadata fields show fallback text (e.g., "Unknown journal" for missing journal — no raw "null" shown)
#### Empty States
- [x] PASS: Loading: "Loading papers..." text-only state
- [x] PASS: No results (with filters/search): "No papers match your search or filters."
- [x] PASS: Empty library: BookOpen icon + "Your library is empty. Add papers from Discover."

### Favorites
- [x] PASS: Star icon on each paper card toggles favorite
- [x] PASS: Filled star (amber-500) = favorited
- [x] PASS: Empty star = not favorited
- [x] PASS: Toggle calls `toggleFavorite(refId)` server action
- [x] PASS: Optimistic UI update (immediate visual toggle)
- [x] PASS: Reverts on error
- [x] PASS: Favorites collection in sidebar shows correct count
- [x] PASS: Clicking "Favorites" in sidebar filters to favorited papers only

### Citation Modal
- [x] PASS: Opens when "Cite" button clicked on a paper card
- [x] PASS: Modal title: "Cite Source"
- [x] PASS: Modal with backdrop blur
#### Citation Style Tabs
- [x] PASS: Selecting a tab shows formatted citation for that style
- [x] PASS: Loading state: "Formatting citations..." with pulse animation
- [x] PASS: Citation text displayed in monospace area (min-h-80px)
#### Copy Buttons
- [x] PASS: **Copy Citation** (primary/brand) — copies full bibliography entry
- [x] PASS: **Copy In-Text** (secondary/bordered) — copies parenthetical citation
- [x] PASS: Hidden for BibTeX style (only full copy available)
- [x] PASS: Copy feedback: text changes to "Copied!" for 2 seconds
- [x] PASS: Clipboard write succeeds

### PDF Viewer
- [x] PASS: Opens when "View PDF" clicked on a paper card
