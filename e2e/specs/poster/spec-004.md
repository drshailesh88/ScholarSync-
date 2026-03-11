# poster — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Poster Editor — Right Panel
#### Section Details (when `activeSectionData` is set)
- [ ] Content blocks list shows each block's type
- [ ] Content blocks list shows each block's preview text
- [ ] Right panel hides theme picker when `showThemes` is false
- [ ] Right panel hides section details when no section is active

### PosterRenderer Component
- [ ] PosterRenderer accepts `poster`, `scale`, `className`, `onSectionClick`, `activeSectionId` props
- [ ] Default scale is 0.2 when not specified
- [ ] Font base size calculates correctly as `scale * 14px`
- [ ] Title section spans full width
- [ ] Title section has gradient or primary background color
- [ ] Title section text is white
- [ ] Title text renders at 2.2em
- [ ] Authors text renders at 0.9em
- [ ] Affiliations text renders at 0.75em
- [ ] Content grid uses CSS grid layout
- [ ] Content grid has 0.8em gap
- [ ] Section cards have 2px border with primaryColor + "30" opacity
- [ ] Section cards have 0.4em border-radius
- [ ] Section headers have primaryColor + "15" background opacity
- [ ] Clicking a section triggers `onSectionClick` callback
- [ ] Active section is visually highlighted via `activeSectionId`
- [ ] Custom `className` is applied to the root element

### Content Block Types
#### Callout Types
- [ ] `text` block renders with correct style variants (title, subtitle, caption, body)
- [ ] `bullets` block renders ordered lists (`ol`) correctly
- [ ] `bullets` block renders unordered lists (`ul`) correctly
- [ ] `image` block displays image with max height of 12em
- [ ] `image` block shows placeholder when no URL is provided
- [ ] `chart` block renders pie charts via PosterChartPreview
- [ ] `chart` block renders bar charts via PosterChartPreview
- [ ] `chart` block renders line charts via PosterChartPreview
- [ ] `table` block renders tabular data via PosterTablePreview
- [ ] `citation` block has left border in accentColor
- [ ] `quote` block renders text in italic
- [ ] `math` block renders LaTeX formulas via KaTeX
- [ ] `diagram` block renders diagrams via Mermaid
- [ ] `code` block uses monospace font with dark background
