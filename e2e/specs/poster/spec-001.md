# poster — Spec 001

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Routes & Navigation
- [x] PASS: Navigating to `/poster/new` loads the creation wizard at Step 0
- [x] PASS: Navigating to `/poster/[posterId]` with a valid ID loads the poster editor
- [x] PASS: Navigating to `/poster/[posterId]` with an invalid ID shows an appropriate error
- [x] PASS: Back button in editor navigates to `/poster` (ArrowLeft icon)

### New Poster Wizard — Step 0: Source Selection
- [x] PASS: Step 0 displays the heading "Select Source Material"
- [x] PASS: All 7 source types are rendered with correct icons
- [x] PASS: Papers source (BookOpen icon) is selectable and functional
- [x] PASS: Document source (FileText icon) is selectable and functional
- [x] PASS: Text source (TextT icon) is selectable and functional
- [x] PASS: References source (BookBookmark icon) is selectable and functional
- [x] PASS: URL source (Globe icon) is selectable and functional
- [x] PASS: Import Deck source (Presentation icon) is selectable and functional
- [x] PASS: Deep Research source (Sparkle icon) is selectable and functional
- [x] PASS: Validation: cannot proceed without a selection that has data
- [x] PASS: Validation: text input requires more than 50 characters
- [x] PASS: Text input with exactly 50 characters is rejected
- [x] PASS: Text input with 51 characters is accepted
- [x] PASS: Back button navigates to `/poster`
- [x] PASS: Selecting a source type highlights it visually

### New Poster Wizard — Step 1: Size & Template
#### Grid Layouts (4 options)
- [x] PASS: Step 1 displays the heading "Poster Size & Template"
- [x] PASS: All 6 poster sizes are displayed in a grid
- [x] PASS: Default size is `a0_portrait`
- [x] PASS: Selecting each poster size updates the state correctly
- [x] PASS: All 4 grid layouts are displayed in a grid with descriptions
- [x] PASS: Default grid layout is `three_column`
- [x] PASS: Selecting each grid layout updates the state correctly
- [x] PASS: 4 templates are shown with an optional toggle
- [x] PASS: Templates can be toggled on/off (optional selection)
- [x] PASS: Clicking a size visually highlights the selected option
- [x] PASS: Clicking a layout visually highlights the selected option

### New Poster Wizard — Step 2: Theme & Options
- [x] PASS: Step 2 displays the heading "Configure Poster"
- [x] PASS: Title input field is present with placeholder "e.g., Impact of Novel Therapy on Patient Outcomes"
- [x] PASS: Title input has autofocus enabled
- [x] PASS: Title input is required (cannot proceed without it)
- [x] PASS: Theme picker displays as a 7-column grid
