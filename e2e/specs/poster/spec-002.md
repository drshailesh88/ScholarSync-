# poster — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### New Poster Wizard — Step 2: Theme & Options
- [ ] Default theme is "modern"
- [ ] Selecting a different theme updates the state
- [ ] Template structure preview section is present (expandable)
- [ ] Template structure toggle text reads "Template Structure ({name})" with the selected template name
- [ ] Clicking the template structure toggle expands/collapses the preview
- [ ] Additional instructions textarea is present with 3 rows
- [ ] Additional instructions placeholder reads "e.g., Emphasize results section, include forest plot..."
- [ ] "Generate Poster" button is displayed with Sparkle icon
- [ ] "Generate Poster" button triggers generation (advances to Step 3)
- [ ] Cannot proceed without filling in the title field

### New Poster Wizard — Step 3: Generation
#### Progress Items
- [ ] Step 3 displays the heading "Generating Poster"
- [ ] "Preprocessing content" progress item appears first
- [ ] "Generating poster sections" auto-triggers 500ms after preprocessing completes
- [ ] Progress indicators animate during processing
- [ ] On error: red box with Warning icon is displayed
- [ ] On error: retry button is available and functional
- [ ] Clicking retry restarts the generation process
- [ ] On success: green box with Check icon is displayed
- [ ] On success: section count is shown as "{sectionCount} sections"
- [ ] On success: "Open Poster Editor" button appears with ArrowRight icon
- [ ] Clicking "Open Poster Editor" navigates to `/poster/{deckId}`
- [ ] Generation handles network timeout gracefully
- [ ] Generation handles server errors gracefully

### Step Indicator
- [ ] Step indicator shows 4 steps (0 through 3)
- [ ] Completed steps display filled circles with Check icon
- [ ] Current step displays an outlined circle
- [ ] Future steps display empty circles
- [ ] Step indicator updates correctly as user progresses through wizard
- [ ] Step indicator reflects correct state when going back

### Wizard State Management
- [ ] All state fields initialize with correct default values
- [ ] State persists correctly when navigating between steps
- [ ] Changing source type clears previous source-specific data
- [ ] Error state is cleared when retrying generation
- [ ] `templateExpanded` toggles correctly on click

### Poster Editor — Top Toolbar
- [ ] Back button (ArrowLeft) is visible and navigates to `/poster`
