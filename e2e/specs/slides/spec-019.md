# slides — Spec 019

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Shift+Click also raises the PNG scale in the filmstrip context-menu export path
- [x] PASS: Slide click with `Shift` toggles slide selection and also activates that slide
- [x] PASS: Add-slide button inserts after `activeSlideId` when available, otherwise appends at the end
- [x] PASS: Hidden slides render an extra top-right dark pill with `EyeSlash` icon above the thumbnail
- [x] PASS: Speaker notes bar is collapsed by default
- [x] PASS: Speaker notes toggle shows `CaretUp` when collapsed and `CaretDown` when expanded
- [x] PASS: Speaker notes textarea placeholder is `Click to add speaker notes...`
- [x] PASS: Speaker notes bar is hidden entirely when there is no active slide
- [x] PASS: `PropertiesPanel` starts on the `design` tab
- [x] PASS: `PropertiesPanel` can switch between `design` and `animation` tabs using local component state
- [x] PASS: Properties panel computes effective slide transition as `activeSlide.transition ?? transition`
- [x] PASS: Properties panel derives background type as `solid`, `gradient`, or `image` from `cardBackground`
- [x] PASS: Changing background type to `gradient` seeds a default linear gradient when none exists yet
- [x] PASS: Changing background type back to `solid` clears both gradient and image URL state
- [x] PASS: Properties panel supports institution-kit updates through `setInstitutionKit`
- [x] PASS: Accessibility panel computes issues from `checkAccessibility(slides, themeConfig)` and reruns when `runId` changes
- [x] PASS: Accessibility panel score ring changes color bands based on score thresholds
#### Actual Current Behavior Corrections
- [x] PASS: The slides list does not render true deck thumbnails; it shows a generic `Presentation` icon placeholder inside a 16:9 box
- [x] PASS: PPTX import does not open a modal dialog; it expands an inline import workflow card within the `/slides` page
- [x] PASS: The create flow on `/slides/new` does not generate remaining slides in the background unless a non-empty description is provided
- [x] PASS: `/slides/new` does not persist the selected theme to `createDeck`; `themeKey` is only used by the optional background generation request
- [x] PASS: `/slides/[deckId]` with an invalid param shows inline `Invalid deck ID` text instead of redirecting away
- [x] PASS: Empty slides decks show a mode-selection screen before the three-panel workspace appears
- [x] PASS: The visible slides-mode filmstrip is `w-48`, not the `w-64` width described in the original checklist
- [x] PASS: The slides toolbar does include a visible save-status indicator; it is not missing
- [x] PASS: The slides toolbar `Share` button only flips store state in the current layout; `SlidesModeLayout` does not render a share panel from that state
- [x] PASS: PDF export in slides mode is a configurable handout dialog, not a one-click direct download
- [x] PASS: Export dropdowns on the toolbar are hover-driven, not click-to-open
#### Slide Sorter View (NEW — not in original 536 checks)
- [x] PASS: Toolbar includes a `Slide Sorter` button (GridFour icon) that opens a full-screen overlay
- [x] PASS: Slide Sorter header reads `Slide Sorter` with count text `({N} slides — drag to reorder)`
- [x] PASS: Slide Sorter displays slides in a responsive grid: 2 cols (base), 3 (sm), 4 (md), 5 (lg), 6 (xl)
- [x] PASS: Slide Sorter uses `rectSortingStrategy` (grid-based) instead of `verticalListSortingStrategy` (filmstrip)
- [x] PASS: Clicking a slide in the sorter activates that slide AND closes the sorter view
- [x] PASS: Slide Sorter close button (X icon) has aria-label `Close slide sorter`
- [x] PASS: Slide Sorter overlay uses `backdrop-blur-sm` with `bg-surface/95`
