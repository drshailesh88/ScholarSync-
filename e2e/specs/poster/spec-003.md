# poster — Spec 003

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Poster Editor — Top Toolbar
- [ ] Poster title is displayed and truncated at 300px for long titles
- [ ] Size label shows the current poster size correctly
- [ ] Section list toggle (List icon) toggles the left panel
- [ ] Theme toggle (Palette icon) toggles the theme picker in the right panel
- [ ] Export PDF button (DownloadSimple icon) is visible with label "Export PDF"
- [ ] All toolbar elements are properly aligned (left group, right group)

### Poster Editor — Zoom Controls
- [ ] Zoom out button (MagnifyingGlassMinus) decreases scale by 0.05
- [ ] Zoom in button (MagnifyingGlassPlus) increases scale by 0.05
- [ ] Zoom percentage label shows the correct current percentage
- [ ] Fit-to-view button (ArrowsOut) resets scale to 0.25
- [ ] Scale cannot go below 0.1 (minimum)
- [ ] Scale cannot exceed 1.0 (maximum)
- [ ] Default scale on load is 0.25
- [ ] Zoom percentage updates in real time as scale changes

### Poster Editor — Left Panel (Sections)
- [ ] Left panel is 224px wide
- [ ] Left panel displays "SECTIONS" header
- [ ] Left panel visibility toggles with the List button in toolbar
- [ ] Each section is rendered as a clickable button
- [ ] Clicking a section button sets it as the active section
- [ ] Active section has blue background, blue border, and brand-colored text
- [ ] Section buttons display "{blockCount} blocks" text
- [ ] Sections with column span display "{blockCount} blocks | span {colSpan}"
- [ ] Inactive sections have default styling (no blue highlight)
- [ ] Sections are listed in the correct order

### Poster Editor — Center Canvas
- [ ] Center area has scrollable gray background (#F0F0F0)
- [ ] PosterRenderer is displayed at the current scale
- [ ] Canvas scrolls horizontally and vertically as needed
- [ ] Poster is centered in the canvas area
- [ ] Canvas responds to zoom level changes

### Poster Editor — Right Panel
#### Section Details (when `activeSectionData` is set)
- [ ] Right panel is 256px wide
- [ ] Theme picker displays as a 4-column grid when `showThemes` is true
- [ ] Selecting a theme in the picker updates the poster theme
- [ ] Section details panel shows when a section is active (`activeSectionData`)
- [ ] Section details display the section title
- [ ] Section details display position as "Column {col}, Row {row}"
