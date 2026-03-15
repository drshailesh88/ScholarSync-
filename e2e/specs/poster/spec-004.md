# poster — Spec 004

STATUS: PARTIAL
TESTED: 35/35
PASS: 32
FAIL: 3
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Poster Editor — Right Panel
#### Section Details (when `activeSectionData` is set)
- [x] PASS: Content blocks list shows each block's type
- [x] PASS: Content blocks list shows each block's preview text
- [x] PASS: Right panel hides theme picker when `showThemes` is false
- [x] PASS: Right panel hides section details when no section is active

### PosterRenderer Component
- [x] PASS: PosterRenderer accepts `poster`, `scale`, `className`, `onSectionClick`, `activeSectionId` props
- [x] PASS: Default scale is 0.2 when not specified
- [x] PASS: Font base size calculates correctly as `scale * 14px`
- [x] PASS: Title section spans full width
- [x] PASS: Title section has gradient or primary background color
- [x] PASS: Title section text is white
- [ ] FAIL: Title text renders at 2.2em
- [ ] FAIL: Authors text renders at 0.9em
- [ ] FAIL: Affiliations text renders at 0.75em
- [x] PASS: Content grid uses CSS grid layout
- [x] PASS: Content grid has 0.8em gap
- [x] PASS: Section cards have 2px border with primaryColor + "30" opacity
- [x] PASS: Section cards have 0.4em border-radius
- [x] PASS: Section headers have primaryColor + "15" background opacity
- [x] PASS: Clicking a section triggers `onSectionClick` callback
- [x] PASS: Active section is visually highlighted via `activeSectionId`
- [x] PASS: Custom `className` is applied to the root element

### Content Block Types
#### Callout Types
- [x] PASS: `text` block renders with correct style variants (title, subtitle, caption, body)
- [x] PASS: `bullets` block renders ordered lists (`ol`) correctly
- [x] PASS: `bullets` block renders unordered lists (`ul`) correctly
- [x] PASS: `image` block displays image with max height of 12em
- [x] PASS: `image` block shows placeholder when no URL is provided
- [x] PASS: `chart` block renders pie charts via PosterChartPreview
- [x] PASS: `chart` block renders bar charts via PosterChartPreview
- [x] PASS: `chart` block renders line charts via PosterChartPreview
- [x] PASS: `table` block renders tabular data via PosterTablePreview
- [x] PASS: `citation` block has left border in accentColor
- [x] PASS: `quote` block renders text in italic
- [x] PASS: `math` block renders LaTeX formulas via KaTeX
- [x] PASS: `diagram` block renders diagrams via Mermaid
- [x] PASS: `code` block uses monospace font with dark background
