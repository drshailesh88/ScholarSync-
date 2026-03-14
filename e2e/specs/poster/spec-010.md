# poster — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Detailed QA Coverage
- [ ] Metadata parse success hydrates `authors`, `affiliations`, `posterSize`, `gridLayout`, and `sections` from stored JSON
- [ ] Metadata parse failure falls back to reconstructing poster sections from individual slides
- [ ] Fallback reconstruction creates a synthetic full-width `Title` section with id `title_bar`
- [ ] Fallback reconstruction maps only slides with `sortOrder > 0` into content sections
- [ ] Fallback reconstruction defaults poster size to `a0_portrait` and grid layout to `three_column`
- [ ] Exceptions during `getDeck()` are only logged to console before the page falls through to `Poster not found`
- [ ] Toolbar back control is an icon-only link with `href="/poster"`
- [ ] Toolbar title text uses `truncate max-w-[300px]` for long poster titles
- [ ] Toolbar size chip uses `POSTER_SIZES[posterData.size].label`
- [ ] Zoom percentage display rounds `scale * 100` to the nearest integer
- [ ] Zoom out decreases scale in `0.05` steps but clamps at `0.1`
- [ ] Zoom in increases scale in `0.05` steps but clamps at `1.0`
- [ ] Zoom buttons remain clickable at their clamp bounds instead of entering a disabled state
- [ ] `Fit to screen` always resets scale back to exactly `0.25`
- [ ] `Section list` toggle starts active on initial editor load
- [ ] `Theme picker` toggle starts inactive on initial editor load
- [ ] Active panel toggles use brand text on a brand-tinted background
- [ ] `Export PDF` is the only full-width primary-styled text button in the toolbar action group
- [ ] `Export PDF` has no local loading spinner, disabled state, or completion toast
- [ ] Left sidebar renders only when `showSections` is true
- [ ] Left sidebar heading text is `SECTIONS`
- [ ] Each section list row shows the section title and the number of content blocks
- [ ] Section list rows append `| span N` only for sections that define `colSpan`
- [ ] Clicking a section list row sets `activeSectionId` and updates row highlight styling
- [ ] Center canvas uses a gray `#F0F0F0` background and centers the scaled poster within padded scrollable space
- [ ] Canvas width is driven by inline style `${scale * 100}%` with `maxWidth: 100%`
- [ ] Clicking the poster title bar on the canvas sets `activeSectionId` to the title section id
- [ ] Clicking a poster section card on the canvas sets `activeSectionId` to that section id
- [ ] Active canvas section and active title section show a blue ring highlight
- [ ] Right sidebar appears whenever either `showThemes` is true or `activeSectionData` exists
- [ ] Theme picker area in the right sidebar is separated from section details by a bottom border only when open
- [ ] Right-sidebar theme tiles compare selection by `posterData.themeConfig.name`, not by theme key
- [ ] Theme changes mutate local `posterData.themeConfig` only and are not saved to the backend
- [ ] Section details panel is read-only and does not expose editable form controls
- [ ] Section details `Title` field renders as plain text, not an input
