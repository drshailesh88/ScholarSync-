# poster — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Routes & Navigation
- [ ] Navigating to `/poster/new` loads the creation wizard at Step 0
- [ ] Navigating to `/poster/[posterId]` with a valid ID loads the poster editor
- [ ] Navigating to `/poster/[posterId]` with an invalid ID shows an appropriate error
- [ ] Back button in editor navigates to `/poster` (ArrowLeft icon)

### New Poster Wizard — Step 0: Source Selection
- [ ] Step 0 displays the heading "Select Source Material"
- [ ] All 7 source types are rendered with correct icons
- [ ] Papers source (BookOpen icon) is selectable and functional
- [ ] Document source (FileText icon) is selectable and functional
- [ ] Text source (TextT icon) is selectable and functional
- [ ] References source (BookBookmark icon) is selectable and functional
- [ ] URL source (Globe icon) is selectable and functional
- [ ] Import Deck source (Presentation icon) is selectable and functional
- [ ] Deep Research source (Sparkle icon) is selectable and functional
- [ ] Validation: cannot proceed without a selection that has data
- [ ] Validation: text input requires more than 50 characters
- [ ] Text input with exactly 50 characters is rejected
- [ ] Text input with 51 characters is accepted
- [ ] Back button navigates to `/poster`
- [ ] Selecting a source type highlights it visually

### New Poster Wizard — Step 1: Size & Template
#### Grid Layouts (4 options)
- [ ] Step 1 displays the heading "Poster Size & Template"
- [ ] All 6 poster sizes are displayed in a grid
- [ ] Default size is `a0_portrait`
- [ ] Selecting each poster size updates the state correctly
- [ ] All 4 grid layouts are displayed in a grid with descriptions
- [ ] Default grid layout is `three_column`
- [ ] Selecting each grid layout updates the state correctly
- [ ] 4 templates are shown with an optional toggle
- [ ] Templates can be toggled on/off (optional selection)
- [ ] Clicking a size visually highlights the selected option
- [ ] Clicking a layout visually highlights the selected option

### New Poster Wizard — Step 2: Theme & Options
- [ ] Step 2 displays the heading "Configure Poster"
- [ ] Title input field is present with placeholder "e.g., Impact of Novel Therapy on Patient Outcomes"
- [ ] Title input has autofocus enabled
- [ ] Title input is required (cannot proceed without it)
- [ ] Theme picker displays as a 7-column grid
