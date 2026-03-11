# slides — Spec 019

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Shift+Click also raises the PNG scale in the filmstrip context-menu export path
- [ ] Slide click with `Shift` toggles slide selection and also activates that slide
- [ ] Add-slide button inserts after `activeSlideId` when available, otherwise appends at the end
- [ ] Hidden slides render an extra top-right dark pill with `EyeSlash` icon above the thumbnail
- [ ] Speaker notes bar is collapsed by default
- [ ] Speaker notes toggle shows `CaretUp` when collapsed and `CaretDown` when expanded
- [ ] Speaker notes textarea placeholder is `Click to add speaker notes...`
- [ ] Speaker notes bar is hidden entirely when there is no active slide
- [ ] `PropertiesPanel` starts on the `design` tab
- [ ] `PropertiesPanel` can switch between `design` and `animation` tabs using local component state
- [ ] Properties panel computes effective slide transition as `activeSlide.transition ?? transition`
- [ ] Properties panel derives background type as `solid`, `gradient`, or `image` from `cardBackground`
- [ ] Changing background type to `gradient` seeds a default linear gradient when none exists yet
- [ ] Changing background type back to `solid` clears both gradient and image URL state
- [ ] Properties panel supports institution-kit updates through `setInstitutionKit`
- [ ] Accessibility panel computes issues from `checkAccessibility(slides, themeConfig)` and reruns when `runId` changes
- [ ] Accessibility panel score ring changes color bands based on score thresholds
#### Actual Current Behavior Corrections
- [ ] The slides list does not render true deck thumbnails; it shows a generic `Presentation` icon placeholder inside a 16:9 box
- [ ] PPTX import does not open a modal dialog; it expands an inline import workflow card within the `/slides` page
- [ ] The create flow on `/slides/new` does not generate remaining slides in the background unless a non-empty description is provided
- [ ] `/slides/new` does not persist the selected theme to `createDeck`; `themeKey` is only used by the optional background generation request
- [ ] `/slides/[deckId]` with an invalid param shows inline `Invalid deck ID` text instead of redirecting away
- [ ] Empty slides decks show a mode-selection screen before the three-panel workspace appears
- [ ] The visible slides-mode filmstrip is `w-48`, not the `w-64` width described in the original checklist
- [ ] The slides toolbar does include a visible save-status indicator; it is not missing
- [ ] The slides toolbar `Share` button only flips store state in the current layout; `SlidesModeLayout` does not render a share panel from that state
- [ ] PDF export in slides mode is a configurable handout dialog, not a one-click direct download
- [ ] Export dropdowns on the toolbar are hover-driven, not click-to-open
#### Slide Sorter View (NEW — not in original 536 checks)
- [ ] Toolbar includes a `Slide Sorter` button (GridFour icon) that opens a full-screen overlay
- [ ] Slide Sorter header reads `Slide Sorter` with count text `({N} slides — drag to reorder)`
- [ ] Slide Sorter displays slides in a responsive grid: 2 cols (base), 3 (sm), 4 (md), 5 (lg), 6 (xl)
- [ ] Slide Sorter uses `rectSortingStrategy` (grid-based) instead of `verticalListSortingStrategy` (filmstrip)
- [ ] Clicking a slide in the sorter activates that slide AND closes the sorter view
- [ ] Slide Sorter close button (X icon) has aria-label `Close slide sorter`
- [ ] Slide Sorter overlay uses `backdrop-blur-sm` with `bg-surface/95`
