# Library — Feature Doc Gaps

**Original doc:** `LIBRARY_FEATURES_TESTING.md`
**Original checkbox count:** 155
**Features found in UI:** 223
**Features found in source code (Codex pass 1):** 285
**Features found in source code (Claude Code pass 2):** 383
**New checks added in pass 2:** 98
**Missing from original doc:** 228
**Completeness of original doc:** 40.5%

## Missing Features

### Detailed QA Coverage
- [ ] Default state coverage for `loading`, `search`, `sortBy`, `activeCollection`, modal visibility, and upload state
- [ ] Conditional rendering coverage for project filter, study-type filter, and year-range inputs when metadata is absent
- [ ] Sidebar count behavior tied to the current fetched paper set rather than a global library total
- [ ] Client-side collection filtering behavior layered on top of server-side search/sort/filter results
- [ ] Search debounce timing and the exact server-side fields searched (`title`, `journal`, serialized `authors`)
- [ ] Exact sort-direction behavior where only `Title A-Z` uses ascending order
- [ ] `Clear Filters` behavior that resets only non-search filters and stays hidden for search-only states
- [ ] Paper-card fallback rendering for missing authors, journal, year, citation count, and study type
- [ ] Conditional visibility rules for `View PDF` and `DOI` actions
- [ ] Optimistic favorite and delete flows, including rollback behavior and lack of user-facing error messaging
- [ ] Exact `Cite in Editor` payload shape stored in `sessionStorage`
- [ ] Citation modal reset behavior, disabled states, `BibTeX`-specific button differences, and clipboard feedback timing
- [ ] Upload flow details for cancel/no-file, extracted-title fallback, empty-author fallback, and hidden-input reset in `finally`
- [ ] Real PDF viewer behavior including missing title slot, zoom bounds, document/page loading states, and 404-specific error copy
- [ ] Route-level loading skeleton composition and route-level error-boundary copy
- [ ] Negative assertions covering missing toasts, missing confirmation dialog, missing upload progress UI, and missing infinite scroll

## Features in doc that DON'T EXIST in the app
- The page is not infinite-scroll in the current implementation; it renders a normal scrollable column.
- The `Loading papers...` state does not include a spinner in the current page component.
- Arrow-key page navigation is not implemented in the current `PDFViewer`.
- The Library page does not render the shared Citation Dialog UI described in section 12 of the original doc.
- The Library page does not render the Reference Store UI/state described in section 13 of the original doc.
- `Cite in Editor` does not prove automatic citation insertion on the Library page; it only stores `{ paperId, title }` in `sessionStorage` and redirects to `/editor/new`.
- Upload success does not show a toast/notification in the current UI.
- Upload processing side effects like background extraction, embedding, and `full_text_available = true` are not observable from the `/library` UI itself.

## Pass 2 Discoveries Summary

### Behavior Corrections (8 checks)
- Paper title uses `font-medium` not `font-bold`, and has no truncation
- Error retry button says "Try Again" not "Retry"
- Clear Filters uses translucent red, not solid red
- Cite button icon is `BookOpen`, not clipboard
- Sidebar heading is CSS-uppercased `Collections`
- `toPaperData()` omits volume/issue/pages from citation formatting
- `View PDF` button doesn't check `open_access_url` despite API fallback support

### New Discoveries by Category
- Citation Modal (Modal component behaviors): 6 checks
- Search Input component details: 4 checks
- Error Display component details: 3 checks
- Paper Card action button icons: 5 checks
- PDF Viewer additional details: 10 checks
- Skeleton loading composition: 5 checks
- Layout & styling extras: 8 checks
- `/api/extract-pdf` route: 8 checks
- `/api/papers/save` route: 5 checks
- `/api/papers/[id]/pdf` route: 12 checks
- `/api/references/resolve` route: 12 checks
- Server action details: 9 checks
- Components referenced but not rendered: 3 checks
