# poster — Spec 002

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### New Poster Wizard — Step 2: Theme & Options
- [x] PASS: Default theme is "modern"
- [x] PASS: Selecting a different theme updates the state
- [x] PASS: Template structure preview section is present (expandable)
- [x] PASS: Template structure toggle text reads "Template Structure ({name})" with the selected template name
- [x] PASS: Clicking the template structure toggle expands/collapses the preview
- [x] PASS: Additional instructions textarea is present with 3 rows
- [x] PASS: Additional instructions placeholder reads "e.g., Emphasize results section, include forest plot..."
- [x] PASS: "Generate Poster" button is displayed with Sparkle icon
- [x] PASS: "Generate Poster" button triggers generation (advances to Step 3)
- [x] PASS: Cannot proceed without filling in the title field

### New Poster Wizard — Step 3: Generation
#### Progress Items
- [x] PASS: Step 3 displays the heading "Generating Poster"
- [x] PASS: "Preprocessing content" progress item appears first
- [x] PASS: "Generating poster sections" auto-triggers 500ms after preprocessing completes
- [x] PASS: Progress indicators animate during processing
- [x] PASS: On error: red box with Warning icon is displayed
- [x] PASS: On error: retry button is available and functional
- [x] PASS: Clicking retry restarts the generation process
- [x] PASS: On success: green box with Check icon is displayed
- [x] PASS: On success: section count is shown as "{sectionCount} sections"
- [x] PASS: On success: "Open Poster Editor" button appears with ArrowRight icon
- [x] PASS: Clicking "Open Poster Editor" navigates to `/poster/{deckId}`
- [x] PASS: Generation handles network timeout gracefully
- [x] PASS: Generation handles server errors gracefully

### Step Indicator
- [x] PASS: Step indicator shows 4 steps (0 through 3)
- [x] PASS: Completed steps display filled circles with Check icon
- [x] PASS: Current step displays an outlined circle
- [x] PASS: Future steps display empty circles
- [x] PASS: Step indicator updates correctly as user progresses through wizard
- [x] PASS: Step indicator reflects correct state when going back

### Wizard State Management
- [x] PASS: All state fields initialize with correct default values
- [x] PASS: State persists correctly when navigating between steps
- [x] PASS: Changing source type clears previous source-specific data
- [x] PASS: Error state is cleared when retrying generation
- [x] PASS: `templateExpanded` toggles correctly on click

### Poster Editor — Top Toolbar
- [x] PASS: Back button (ArrowLeft) is visible and navigates to `/poster`
