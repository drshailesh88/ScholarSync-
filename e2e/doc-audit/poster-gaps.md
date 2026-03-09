# Poster — Feature Doc Gaps

**Original doc:** `POSTER_FEATURES_TESTING.md`
**Original checkbox count:** 212
**Features found in UI:** 311
**Features found in source code:** 388
**Missing from doc:** 176
**Completeness of original doc:** 54.6%

## Missing Features

### Detailed QA Coverage
- [ ] Real Step 0 defaults and gating, including `From Text` as the default source, disabled `Next` on first load, and the exact `> 50` trimmed-character threshold
- [ ] Source-specific field behavior for paper IDs, document ID, deep-research session ID, and imported `.pptx` decks, including parse errors, imported slide preview limits, and title/raw-text hydration
- [ ] The fact that `Reference Library` and `From URL` render as source cards in the poster wizard but their interactive panels are not wired in `NewPosterPage`
- [ ] Step 1 selection persistence, template toggle-off behavior, and the exact size/layout card rendering states
- [ ] Step 2 title validation, theme-swatch generation from `PRESET_THEMES`, template-structure expand/collapse details, and immediate Step 3 transition behavior
- [ ] Step 3 streaming preprocess logic, 500 ms auto-triggered generation, retry branching, inline success/error banners, and exact request payloads for preprocess and generate calls
- [ ] Poster editor loading and reconstruction flow, including metadata-first hydration, slide-based fallback reconstruction, and redirect behavior for missing decks
- [ ] Toolbar clamp behavior, panel default visibility, right-sidebar read-only section details, local-only theme changes, and non-persistent editor state
- [ ] Renderer-level behavior for title-bar fallbacks, QR footer gating, placeholder images, pie/bar chart rendering, KaTeX fallback text, Mermaid loading/error states, and the actual export request/download naming rules

## Features in doc that DON'T EXIST in the app
- `/poster` does not have a page file under `src/app/(app)/poster`; the existing routes in source are `/poster/new` and `/poster/[posterId]`.
- The poster wizard does not expose a working Reference Library import panel or URL import panel even though those source cards are visible.
- The poster editor does not support inline section editing, adding new sections, deleting sections, or drag reordering.
- Zoom controls are not disabled at minimum or maximum scale; they only clamp the value internally.
- The editor does not persist theme changes to the backend or across refresh.
- There is no `src/app/api/export/poster-pdf/route.ts` in the current source tree even though the editor posts to that endpoint.
- The route does not have dedicated `loading.tsx` or `error.tsx` files under `src/app/(app)/poster`.
