# poster — Spec 013

STATUS: PARTIAL
TESTED: 35/35
PASS: 32
FAIL: 3
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Step Indicator Rendering Details
- [x] PASS: Current step label uses `text-ink font-medium`; non-current labels use `text-ink-muted`
#### Wizard Selection Grid Responsiveness
- [x] PASS: Poster size selection grid uses `grid-cols-2 sm:grid-cols-3` (responsive)
- [x] PASS: Grid layout selection grid uses `grid-cols-2`
- [x] PASS: Template selection grid uses `grid-cols-2`
#### Template Structure Preview Details
- [x] PASS: Template structure expanded list has `max-h-64 overflow-y-auto` for scrollable content
- [x] PASS: Template section numbers use `font-mono w-5 shrink-0 text-right` styling
- [x] PASS: Template guidance text uses `line-clamp-1` to truncate to one line
#### Theme Count
- [x] PASS: `PRESET_THEMES` contains 26 themes; the 7-column wizard grid and 4-column editor grid wrap to multiple rows
#### PosterRenderer Root & Typography
- [x] PASS: PosterRenderer root element has `shadow-lg` class for drop shadow
- [x] PASS: Poster body text uses `fontFamily: theme.fontFamily ?? "Inter, sans-serif"`
- [x] PASS: Poster title and section headings use `theme.headingFontFamily`
- [x] PASS: Poster content container has `padding: "1.5em"`
#### Title Section Identification Logic
- [x] PASS: Title section is determined by finding the first section where `colSpan >= columns` (the grid column count)
- [x] PASS: Content sections are filtered as those where `!colSpan || colSpan < columns`
- [x] PASS: Fallback title bar (no full-width section found) uses solid `primaryColor` background with no gradient, and renders only the title text (no authors or affiliations)
#### Title Bar Rendering Specifics
- [x] PASS: Title bar gradient renders only when BOTH `theme.gradientFrom` and `theme.gradientTo` exist; otherwise solid `primaryColor`
- [x] PASS: Authors are joined with `", "` separator
- [x] PASS: Affiliations are joined with `"; "` separator
- [x] PASS: Authors text uses `opacity-90`
- [x] PASS: Affiliations text uses `opacity-75`
- [x] PASS: Title section renders its own `contentBlocks` below affiliations if any exist, with text forced to white
- [ ] FAIL: Title bar has `rounded-[0.4em]` with `mb-[1em]` bottom margin and `p-[1.2em]` padding
#### Section Card Rendering Specifics
- [ ] FAIL: Section card body background is `theme.surfaceColor ?? theme.backgroundColor`
- [ ] FAIL: Section header has a bottom border: `2px solid ${theme.primaryColor}30` (separate from the outer card border)
- [x] PASS: Section heading renders at `text-[1em] font-bold` in `theme.primaryColor`
- [x] PASS: Sections with `colSpan` use CSS `gridColumn: span N` to span multiple grid columns
- [x] PASS: Section content area has `p-[0.8em]` padding
#### Content Block Enhancements
- [x] PASS: Image blocks render via `next/Image` with `unoptimized` prop when a URL is present
- [x] PASS: Image placeholder box is `h-[6em]` tall (smaller than the `max-h-[12em]` for actual images)
- [x] PASS: Image blocks support an optional `caption` below the image at `text-[0.55em] opacity-50`
- [x] PASS: Chart blocks display an optional `title` above the chart in `text-[0.7em] font-medium` styled in `primaryColor`
- [x] PASS: Chart types beyond bar/line/pie (scatter, area, radar, funnel, forest_plot, donut, stacked_bar, waterfall, gauge, treemap) all render as horizontal bars via the same non-pie code path
- [x] PASS: Citation block shows source attribution as `"— {source}"` below the cited text at `text-[0.85em] opacity-60`
- [x] PASS: Quote block wraps content in a `<blockquote>` element with `accentColor` left border and shows `"— {attribution}"` below
- [x] PASS: Math block renders inside a container box with `surfaceColor` background and themed border
