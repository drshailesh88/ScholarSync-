# poster — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Detailed QA Coverage
- [x] PASS: Metadata parse success hydrates `authors`, `affiliations`, `posterSize`, `gridLayout`, and `sections` from stored JSON
- [x] PASS: Metadata parse failure falls back to reconstructing poster sections from individual slides
- [x] PASS: Fallback reconstruction creates a synthetic full-width `Title` section with id `title_bar`
- [x] PASS: Fallback reconstruction maps only slides with `sortOrder > 0` into content sections
- [x] PASS: Fallback reconstruction defaults poster size to `a0_portrait` and grid layout to `three_column`
- [x] PASS: Exceptions during `getDeck()` are only logged to console before the page falls through to `Poster not found`
- [x] PASS: Toolbar back control is an icon-only link with `href="/poster"`
- [x] PASS: Toolbar title text uses `truncate max-w-[300px]` for long poster titles
- [x] PASS: Toolbar size chip uses `POSTER_SIZES[posterData.size].label`
- [x] PASS: Zoom percentage display rounds `scale * 100` to the nearest integer
- [x] PASS: Zoom out decreases scale in `0.05` steps but clamps at `0.1`
- [x] PASS: Zoom in increases scale in `0.05` steps but clamps at `1.0`
- [x] PASS: Zoom buttons remain clickable at their clamp bounds instead of entering a disabled state
- [x] PASS: `Fit to screen` always resets scale back to exactly `0.25`
- [x] PASS: `Section list` toggle starts active on initial editor load
- [x] PASS: `Theme picker` toggle starts inactive on initial editor load
- [x] PASS: Active panel toggles use brand text on a brand-tinted background
- [x] PASS: `Export PDF` is the only full-width primary-styled text button in the toolbar action group
- [x] PASS: `Export PDF` has no local loading spinner, disabled state, or completion toast
- [x] PASS: Left sidebar renders only when `showSections` is true
- [x] PASS: Left sidebar heading text is `SECTIONS`
- [x] PASS: Each section list row shows the section title and the number of content blocks
- [x] PASS: Section list rows append `| span N` only for sections that define `colSpan`
- [x] PASS: Clicking a section list row sets `activeSectionId` and updates row highlight styling
- [x] PASS: Center canvas uses a gray `#F0F0F0` background and centers the scaled poster within padded scrollable space
- [x] PASS: Canvas width is driven by inline style `${scale * 100}%` with `maxWidth: 100%`
- [x] PASS: Clicking the poster title bar on the canvas sets `activeSectionId` to the title section id
- [x] PASS: Clicking a poster section card on the canvas sets `activeSectionId` to that section id
- [x] PASS: Active canvas section and active title section show a blue ring highlight
- [x] PASS: Right sidebar appears whenever either `showThemes` is true or `activeSectionData` exists
- [x] PASS: Theme picker area in the right sidebar is separated from section details by a bottom border only when open
- [x] PASS: Right-sidebar theme tiles compare selection by `posterData.themeConfig.name`, not by theme key
- [x] PASS: Theme changes mutate local `posterData.themeConfig` only and are not saved to the backend
- [x] PASS: Section details panel is read-only and does not expose editable form controls
- [x] PASS: Section details `Title` field renders as plain text, not an input
