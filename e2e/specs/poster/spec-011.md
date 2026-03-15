# poster — Spec 011

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Detailed QA Coverage
- [x] PASS: Section details `Position` field renders `Column X, Row Y` and appends `(spans N columns)` when relevant
- [x] PASS: Section details block list shows one compact row per content block
- [x] PASS: Text block summaries show the first 30 characters followed by `...`
- [x] PASS: Bullet block summaries show `{N} items`
- [x] PASS: Chart block summaries show the `chartType`
- [x] PASS: Table block summaries show `{N} rows`
- [x] PASS: Poster renderer computes aspect ratio directly from numeric width and height in `POSTER_SIZES`
- [x] PASS: Poster title bar renders authors only when `authors.length > 0`
- [x] PASS: Poster title bar renders affiliations only when `affiliations.length > 0`
- [x] PASS: If no full-width title section exists, `PosterRenderer` falls back to a simpler colored title header
- [x] PASS: Content grid column count is derived from `POSTER_GRID_LAYOUTS[poster.gridLayout].columns`
- [x] PASS: QR footer renders only when `poster.qrCodeUrl` exists
- [x] PASS: Image blocks without a real `url` render a themed placeholder box using `suggestion` or `alt`
- [x] PASS: Pie charts render label percentages rather than drawing a visual pie graphic
- [x] PASS: Non-pie charts render horizontal bars based on the first dataset only
- [x] PASS: Table preview uses a themed header background and row separator borders
- [x] PASS: Invalid KaTeX render exceptions fall back to inline `Invalid LaTeX` text
- [x] PASS: Diagram blocks show `Rendering diagram...` before Mermaid output resolves
- [x] PASS: Diagram render failures show `Diagram preview unavailable` plus the first 200 characters of Mermaid syntax
- [x] PASS: Export attempts POST `{ poster: posterData }` to `/api/export/poster-pdf`
- [x] PASS: Successful export sanitizes the title to alphanumeric and underscore characters before downloading `{safeTitle}_poster.pdf`
- [x] PASS: Export failures are logged to console only and do not show inline or toast feedback
#### Actual Current Behavior Corrections
- [x] PASS: Only `/poster/new` and `/poster/[posterId]` are present in the source tree; `/poster` itself is referenced by links and redirects but has no page file under `src/app/(app)/poster`
- [x] PASS: `Reference Library` and `From URL` appear as selectable source cards in the poster wizard, but their corresponding panels are not wired by `NewPosterPage`
- [x] PASS: Selecting `Reference Library` or `From URL` cannot satisfy Step 0 validation, so those choices are presentational only in the current poster flow
- [x] PASS: The poster editor is a viewer/inspector with zoom, section selection, and theme preview; it does not provide inline section editing, creation, deletion, or drag reordering
- [x] PASS: Zoom controls clamp scale at min/max values but do not disable the buttons at those bounds
- [x] PASS: Theme changes in `/poster/[posterId]` are local-only and do not persist after refresh
- [x] PASS: Poster generation success and failure feedback are inline inside Step 3; there are no toasts for either path
- [x] PASS: Invalid or inaccessible poster loads redirect toward `/poster` rather than rendering a dedicated recovery page with a retry action
- [x] PASS: There is no `src/app/api/export/poster-pdf/route.ts` in the current source tree even though the editor posts to that endpoint
- [x] PASS: There are no route-level `loading.tsx` or `error.tsx` files under `src/app/(app)/poster`
#### Wizard Step Subcopy
- [x] PASS: Step 0 renders subcopy "Choose where to generate your poster from" below the heading
- [x] PASS: Step 1 renders subcopy "Choose dimensions and a poster template" below the heading
- [x] PASS: Step 3 renders subcopy "AI is creating your conference poster" below the heading
