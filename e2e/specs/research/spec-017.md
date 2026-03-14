# research — Spec 017

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Page Layout & CSS Behavior
- [x] PASS: Inactive filter chip styling: `bg-surface-raised text-ink-muted border-border hover:text-ink`
- [x] PASS: Sort dropdown overlay uses `z-20` z-index
- [x] PASS: Copilot floating toggle button uses `z-40` z-index
- [x] PASS: Pagination total-pages display clamps the rendered denominator with `Math.max(totalPages, 1)` whenever the pagination block is visible
- [x] PASS: Sort dropdown menu has `min-w-[140px]` minimum width
#### Accessibility Gaps (Missing Attributes)
- [x] PASS: Search input has no `aria-label` or accessible name attribute
- [x] PASS: Filter chip buttons have no `aria-pressed` attribute to indicate toggle state to assistive technology
- [x] PASS: Sort dropdown trigger has no `aria-expanded` or `aria-haspopup` attribute
- [x] PASS: Sort dropdown menu has no `role="listbox"` or `role="menu"` attribute
- [x] PASS: Sort dropdown items have no `role="option"` or `role="menuitem"` attributes
- [x] PASS: Copilot close button has no `aria-label` attribute
- [x] PASS: Copilot chat input has no `aria-label` attribute
- [x] PASS: Copilot send button has no `aria-label` attribute
- [x] PASS: No `aria-live` region exists for search result count updates or loading/error state transitions
- [x] PASS: Pagination Previous/Next buttons have no `aria-label` attributes (e.g., "Go to previous page")
- [x] PASS: Evidence level badges have no `title` or `aria-label` explaining the evidence level meaning
#### Route-Level Loading & Error Verified
- [x] PASS: Route-level `loading.tsx` renders `ResearchLoading` — one `Skeleton` title bar (`h-8 w-48`), one `Skeleton` search bar (`h-12 w-full rounded-xl`), and exactly 3 `SkeletonCard` placeholders
- [x] PASS: Route-level `error.tsx` renders `ErrorDisplay` component with `onRetry={reset}` prop, providing a retry button
#### Behavior Corrections (Pass 3)
- [x] PASS: Section 21 line 397 claims "Scroll position — restored from `searchScrollPosition`" — **WRONG**. No scroll position state or restoration logic exists in page.tsx. The `searchScrollPosition` identifier does not appear anywhere in the research page; it exists only in the unused `research-store.ts` and `ResultsTable.tsx` which are not imported by this page.
- [x] PASS: Section 2 lines 71-73 claim "Parsed filter chips — appear below input when natural language filters detected" with sub-items for X buttons and chip types — **WRONG**. No NLP-parsed filter chips exist in the current implementation. Only 6 static toggle chips (Last 5 Years, PDF Available, High Impact, RCTs Only, Reviews, Meta-Analyses) are rendered.
- [x] PASS: Section 5 line 135 claims "Skeleton loader — 5 placeholder cards during search" — **WRONG**. The in-page loading state renders exactly 4 skeleton cards (`Array.from({ length: 4 })`). The route-level `loading.tsx` renders 3 `SkeletonCard`s — neither uses 5.
- [x] PASS: Section 7 line 165 claims authors are truncated with "et al." if >5 — **WRONG**. Result card authors use `r.authors.slice(0, 3)` and show " et al." when `r.authors.length > 3` (threshold is 3, not 5).
- [x] PASS: Section 7 line 169 claims a "Study type badge" is rendered on each result card — **WRONG**. No study type badge is rendered by the current page. The `studyType` field exists on results but is not displayed.
- [x] PASS: Section 7 line 171 claims a "Source badge" (`pubmed`, `semantic_scholar`, or `both`) is rendered — **WRONG**. No source badge is rendered by the current page.
- [x] PASS: Section 7 line 173 claims a "PMID badge" is rendered — **WRONG**. PMID is not displayed anywhere on result cards. It is used internally for title link construction and save payload only.
- [x] PASS: Section 7 line 174 claims a "DOI badge" is rendered — **WRONG**. DOI is rendered as a text link ("DOI") in the metadata row, not as a badge component.
- [x] PASS: Section 17 line 345 claims "Temperature — 0.3 for consistent output" for synthesis generation — **MISLEADING**. Plan mode uses temperature 0.3, but the primary streaming synthesis (generate mode) uses temperature 0.4 (correctly documented at lines 788-789 from Pass 2).
- [x] PASS: Section 20 (Verification System) claims "Per-paper verification — calls `/api/research/verify`" — **WRONG for this page**. The `/research` page never calls `/api/research/verify`. The verification endpoint and VerificationBadge exist in the codebase but are not imported or invoked by `page.tsx`.
- [x] PASS: `ResearchPage` never aborts `abortRef.current` on component unmount, so an in-flight `/api/search/unified` request can continue after navigation away from `/research`
- [x] PASS: `handleSearch(...)` has no stale-request guard beyond `AbortController`, so an older aborted search can still enter `catch` / `finally` and overwrite `error` or `loading` state for a newer search
- [x] PASS: Failed searches do not clear the prior `results` array, so an error banner can render above stale results from the previous successful search
- [x] PASS: `handleSearch(...)` sets `hasSearched` to `true` before the fetch resolves, so a failed first search skips the rich pre-search empty state on the next render
- [x] PASS: Main search button remains enabled for whitespace-only input; the no-op happens inside `handleSearch()` because it returns early on `!query.trim()`
- [x] PASS: Similar-paper cards use unstable React keys (`key={simIdx}`) instead of a paper identity field
- [x] PASS: `handleFindSimilar(...)` does not use an `AbortController` or timeout, so similar-paper fetches cannot be cancelled when the user retries or leaves the page
