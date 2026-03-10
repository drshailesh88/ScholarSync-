# Poster — Feature Doc Gaps

**Original doc:** `POSTER_FEATURES_TESTING.md`
**Original checkbox count:** 212
**Features found in UI:** 311
**Features found in source code (Codex pass 1):** 388
**Features found in source code (Claude Code pass 2):** 515
**Missing from doc (before Codex pass 1):** 176
**Added by Codex pass 1:** 176
**Added by Claude Code pass 2:** 127
**Completeness of original doc:** 41.2%
**Codex verification pass reviewed:** 127 assertions
**Pass 2 verified correct:** 123
**Pass 2 hallucinated / inaccurate:** 1
**Pass 2 partially correct:** 3

## Missing Features (Addressed by Pass 2)

### Detailed QA Coverage Added
- Wizard step subcopy text for Steps 0, 1, and 3
- Source card description text for all 7 source types
- Deep Research card active/inactive styling and description
- Wizard field labels with exact text and styling
- Poster size exact label strings from `POSTER_SIZES`
- Grid layout exact labels and descriptions from `POSTER_GRID_LAYOUTS`
- Template exact descriptions and the `engineering` key name
- Step indicator number rendering, dividers, and precise styling per state
- Wizard selection grid responsive breakpoints
- Template structure preview scroll behavior and guidance truncation
- Theme count (26 PRESET_THEMES vs. original 7 assumption)
- PosterRenderer root shadow, typography, padding, title section identification logic
- Title bar gradient conditions, author/affiliation separators, opacity, and contentBlock rendering
- Section card body background fallback, header bottom border, heading styling
- Content block enhancements: image captions, chart titles, chart type fallback behavior, citation/quote attributions, math container/displayMode/error fallback, code colors, callout titles, stat result sub-fields, bibliography format/doi, timeline status colors/details, divider style interpolation
- Editor right sidebar "THEME" and "SECTION DETAILS" headers, tile rendering difference (circles vs. text), content block count label, font-mono type display
- Editor toolbar vertical dividers
- Editor layout structure (full-height calc, canvas padding)
- Fallback reconstruction specifics (first content colSpan, ID format, title fallback, position calc)
- API route implementation (audienceType, sourceType, generationPrompt, code fence stripping, slide layouts, totalSlides, failed status, 400 error shape, projectId validation)
- ProgressItem text color per state, Check icon weight
- Error message exact strings for preprocess and generate failures
- POSTER_SIZES pdfPoints dimensions for all 6 sizes

## Features in doc that DON'T EXIST in the app
- `/poster` does not have a page file under `src/app/(app)/poster`; the existing routes in source are `/poster/new` and `/poster/[posterId]`.
- The poster wizard does not expose a working Reference Library import panel or URL import panel even though those source cards are visible.
- The poster editor does not support inline section editing, adding new sections, deleting sections, or drag reordering.
- Zoom controls are not disabled at minimum or maximum scale; they only clamp the value internally.
- The editor does not persist theme changes to the backend or across refresh.
- There is no `src/app/api/export/poster-pdf/route.ts` in the current source tree even though the editor posts to that endpoint.
- The route does not have dedicated `loading.tsx` or `error.tsx` files under `src/app/(app)/poster`.

## Components Referenced But Not Rendered
- `ReferenceImportPanel` imported by `source-selector.tsx` but not used in poster context (`onReferencesSelected` not passed)
- `UrlSourceInput` internal to `source-selector.tsx` but not triggered in poster context (`onUrlSourcesChange` not passed)

## Remaining Gaps After Codex Verification
- Imported deck slide preview rows also show each slide layout label (`slide.layout.replace(/_/g, " ")`), which is still not called out in `POSTER_FEATURES_TESTING.md`.
- Metadata reconstruction in the editor prefers `data.themeConfig`, then `PRESET_THEMES[data.theme ?? "modern"]`, then `PRESET_THEMES.modern`; the current doc does not capture that theme fallback chain.
- `PosterRenderer`'s fallback title header (when no full-width section exists) is not clickable and cannot receive the active blue ring highlight, unlike the full-width title-section branch.
- Section detail rows only add a supplemental preview string for `text`, `bullets`, `chart`, and `table` blocks; other block types render only the monospace type label in the sidebar.
