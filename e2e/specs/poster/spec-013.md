# poster — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Step Indicator Rendering Details
- [ ] Current step label uses `text-ink font-medium`; non-current labels use `text-ink-muted`
#### Wizard Selection Grid Responsiveness
- [ ] Poster size selection grid uses `grid-cols-2 sm:grid-cols-3` (responsive)
- [ ] Grid layout selection grid uses `grid-cols-2`
- [ ] Template selection grid uses `grid-cols-2`
#### Template Structure Preview Details
- [ ] Template structure expanded list has `max-h-64 overflow-y-auto` for scrollable content
- [ ] Template section numbers use `font-mono w-5 shrink-0 text-right` styling
- [ ] Template guidance text uses `line-clamp-1` to truncate to one line
#### Theme Count
- [ ] `PRESET_THEMES` contains 26 themes; the 7-column wizard grid and 4-column editor grid wrap to multiple rows
#### PosterRenderer Root & Typography
- [ ] PosterRenderer root element has `shadow-lg` class for drop shadow
- [ ] Poster body text uses `fontFamily: theme.fontFamily ?? "Inter, sans-serif"`
- [ ] Poster title and section headings use `theme.headingFontFamily`
- [ ] Poster content container has `padding: "1.5em"`
#### Title Section Identification Logic
- [ ] Title section is determined by finding the first section where `colSpan >= columns` (the grid column count)
- [ ] Content sections are filtered as those where `!colSpan || colSpan < columns`
- [ ] Fallback title bar (no full-width section found) uses solid `primaryColor` background with no gradient, and renders only the title text (no authors or affiliations)
#### Title Bar Rendering Specifics
- [ ] Title bar gradient renders only when BOTH `theme.gradientFrom` and `theme.gradientTo` exist; otherwise solid `primaryColor`
- [ ] Authors are joined with `", "` separator
- [ ] Affiliations are joined with `"; "` separator
- [ ] Authors text uses `opacity-90`
- [ ] Affiliations text uses `opacity-75`
- [ ] Title section renders its own `contentBlocks` below affiliations if any exist, with text forced to white
- [ ] Title bar has `rounded-[0.4em]` with `mb-[1em]` bottom margin and `p-[1.2em]` padding
#### Section Card Rendering Specifics
- [ ] Section card body background is `theme.surfaceColor ?? theme.backgroundColor`
- [ ] Section header has a bottom border: `2px solid ${theme.primaryColor}30` (separate from the outer card border)
- [ ] Section heading renders at `text-[1em] font-bold` in `theme.primaryColor`
- [ ] Sections with `colSpan` use CSS `gridColumn: span N` to span multiple grid columns
- [ ] Section content area has `p-[0.8em]` padding
#### Content Block Enhancements
- [ ] Image blocks render via `next/Image` with `unoptimized` prop when a URL is present
- [ ] Image placeholder box is `h-[6em]` tall (smaller than the `max-h-[12em]` for actual images)
- [ ] Image blocks support an optional `caption` below the image at `text-[0.55em] opacity-50`
- [ ] Chart blocks display an optional `title` above the chart in `text-[0.7em] font-medium` styled in `primaryColor`
- [ ] Chart types beyond bar/line/pie (scatter, area, radar, funnel, forest_plot, donut, stacked_bar, waterfall, gauge, treemap) all render as horizontal bars via the same non-pie code path
- [ ] Citation block shows source attribution as `"— {source}"` below the cited text at `text-[0.85em] opacity-60`
- [ ] Quote block wraps content in a `<blockquote>` element with `accentColor` left border and shows `"— {attribution}"` below
- [ ] Math block renders inside a container box with `surfaceColor` background and themed border
