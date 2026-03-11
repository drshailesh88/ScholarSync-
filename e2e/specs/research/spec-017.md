# research — Spec 017

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Page Layout & CSS Behavior
- [ ] Inactive filter chip styling: `bg-surface-raised text-ink-muted border-border hover:text-ink`
- [ ] Sort dropdown overlay uses `z-20` z-index
- [ ] Copilot floating toggle button uses `z-40` z-index
- [ ] Pagination total-pages display clamps the rendered denominator with `Math.max(totalPages, 1)` whenever the pagination block is visible
- [ ] Sort dropdown menu has `min-w-[140px]` minimum width
#### Accessibility Gaps (Missing Attributes)
- [ ] Search input has no `aria-label` or accessible name attribute
- [ ] Filter chip buttons have no `aria-pressed` attribute to indicate toggle state to assistive technology
- [ ] Sort dropdown trigger has no `aria-expanded` or `aria-haspopup` attribute
- [ ] Sort dropdown menu has no `role="listbox"` or `role="menu"` attribute
- [ ] Sort dropdown items have no `role="option"` or `role="menuitem"` attributes
- [ ] Copilot close button has no `aria-label` attribute
- [ ] Copilot chat input has no `aria-label` attribute
- [ ] Copilot send button has no `aria-label` attribute
- [ ] No `aria-live` region exists for search result count updates or loading/error state transitions
- [ ] Pagination Previous/Next buttons have no `aria-label` attributes (e.g., "Go to previous page")
- [ ] Evidence level badges have no `title` or `aria-label` explaining the evidence level meaning
#### Route-Level Loading & Error Verified
- [ ] Route-level `loading.tsx` renders `ResearchLoading` — one `Skeleton` title bar (`h-8 w-48`), one `Skeleton` search bar (`h-12 w-full rounded-xl`), and exactly 3 `SkeletonCard` placeholders
- [ ] Route-level `error.tsx` renders `ErrorDisplay` component with `onRetry={reset}` prop, providing a retry button
#### Behavior Corrections (Pass 3)
- [ ] Section 21 line 397 claims "Scroll position — restored from `searchScrollPosition`" — **WRONG**. No scroll position state or restoration logic exists in page.tsx. The `searchScrollPosition` identifier does not appear anywhere in the research page; it exists only in the unused `research-store.ts` and `ResultsTable.tsx` which are not imported by this page.
- [ ] Section 2 lines 71-73 claim "Parsed filter chips — appear below input when natural language filters detected" with sub-items for X buttons and chip types — **WRONG**. No NLP-parsed filter chips exist in the current implementation. Only 6 static toggle chips (Last 5 Years, PDF Available, High Impact, RCTs Only, Reviews, Meta-Analyses) are rendered.
- [ ] Section 5 line 135 claims "Skeleton loader — 5 placeholder cards during search" — **WRONG**. The in-page loading state renders exactly 4 skeleton cards (`Array.from({ length: 4 })`). The route-level `loading.tsx` renders 3 `SkeletonCard`s — neither uses 5.
- [ ] Section 7 line 165 claims authors are truncated with "et al." if >5 — **WRONG**. Result card authors use `r.authors.slice(0, 3)` and show " et al." when `r.authors.length > 3` (threshold is 3, not 5).
- [ ] Section 7 line 169 claims a "Study type badge" is rendered on each result card — **WRONG**. No study type badge is rendered by the current page. The `studyType` field exists on results but is not displayed.
- [ ] Section 7 line 171 claims a "Source badge" (`pubmed`, `semantic_scholar`, or `both`) is rendered — **WRONG**. No source badge is rendered by the current page.
- [ ] Section 7 line 173 claims a "PMID badge" is rendered — **WRONG**. PMID is not displayed anywhere on result cards. It is used internally for title link construction and save payload only.
- [ ] Section 7 line 174 claims a "DOI badge" is rendered — **WRONG**. DOI is rendered as a text link ("DOI") in the metadata row, not as a badge component.
- [ ] Section 17 line 345 claims "Temperature — 0.3 for consistent output" for synthesis generation — **MISLEADING**. Plan mode uses temperature 0.3, but the primary streaming synthesis (generate mode) uses temperature 0.4 (correctly documented at lines 788-789 from Pass 2).
- [ ] Section 20 (Verification System) claims "Per-paper verification — calls `/api/research/verify`" — **WRONG for this page**. The `/research` page never calls `/api/research/verify`. The verification endpoint and VerificationBadge exist in the codebase but are not imported or invoked by `page.tsx`.
- [ ] `ResearchPage` never aborts `abortRef.current` on component unmount, so an in-flight `/api/search/unified` request can continue after navigation away from `/research`
- [ ] `handleSearch(...)` has no stale-request guard beyond `AbortController`, so an older aborted search can still enter `catch` / `finally` and overwrite `error` or `loading` state for a newer search
- [ ] Failed searches do not clear the prior `results` array, so an error banner can render above stale results from the previous successful search
- [ ] `handleSearch(...)` sets `hasSearched` to `true` before the fetch resolves, so a failed first search skips the rich pre-search empty state on the next render
- [ ] Main search button remains enabled for whitespace-only input; the no-op happens inside `handleSearch()` because it returns early on `!query.trim()`
- [ ] Similar-paper cards use unstable React keys (`key={simIdx}`) instead of a paper identity field
- [ ] `handleFindSimilar(...)` does not use an `AbortController` or timeout, so similar-paper fetches cannot be cancelled when the user retries or leaves the page
