# poster — Spec 003

STATUS: PARTIAL
TESTED: 35/35
PASS: 32
FAIL: 3
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Poster Editor — Top Toolbar
- [x] PASS: Poster title is displayed and truncated at 300px for long titles
- [x] PASS: Size label shows the current poster size correctly
- [x] PASS: Section list toggle (List icon) toggles the left panel
- [x] PASS: Theme toggle (Palette icon) toggles the theme picker in the right panel
- [x] PASS: Export PDF button (DownloadSimple icon) is visible with label "Export PDF"
- [x] PASS: All toolbar elements are properly aligned (left group, right group)

### Poster Editor — Zoom Controls
- [x] PASS: Zoom out button (MagnifyingGlassMinus) decreases scale by 0.05
- [x] PASS: Zoom in button (MagnifyingGlassPlus) increases scale by 0.05
- [x] PASS: Zoom percentage label shows the correct current percentage
- [ ] FAIL: Fit-to-view button (ArrowsOut) resets scale to 0.25
- [ ] FAIL: Scale cannot go below 0.1 (minimum)
- [ ] FAIL: Scale cannot exceed 1.0 (maximum)
- [x] PASS: Default scale on load is 0.25
- [x] PASS: Zoom percentage updates in real time as scale changes

### Poster Editor — Left Panel (Sections)
- [x] PASS: Left panel is 224px wide
- [x] PASS: Left panel displays "SECTIONS" header
- [x] PASS: Left panel visibility toggles with the List button in toolbar
- [x] PASS: Each section is rendered as a clickable button
- [x] PASS: Clicking a section button sets it as the active section
- [x] PASS: Active section has blue background, blue border, and brand-colored text
- [x] PASS: Section buttons display "{blockCount} blocks" text
- [x] PASS: Sections with column span display "{blockCount} blocks | span {colSpan}"
- [x] PASS: Inactive sections have default styling (no blue highlight)
- [x] PASS: Sections are listed in the correct order

### Poster Editor — Center Canvas
- [x] PASS: Center area has scrollable gray background (#F0F0F0)
- [x] PASS: PosterRenderer is displayed at the current scale
- [x] PASS: Canvas scrolls horizontally and vertically as needed
- [x] PASS: Poster is centered in the canvas area
- [x] PASS: Canvas responds to zoom level changes

### Poster Editor — Right Panel
#### Section Details (when `activeSectionData` is set)
- [x] PASS: Right panel is 256px wide
- [x] PASS: Theme picker displays as a 4-column grid when `showThemes` is true
- [x] PASS: Selecting a theme in the picker updates the poster theme
- [x] PASS: Section details panel shows when a section is active (`activeSectionData`)
- [x] PASS: Section details display the section title
- [x] PASS: Section details display position as "Column {col}, Row {row}"
