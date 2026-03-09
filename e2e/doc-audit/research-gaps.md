# Research — Feature Doc Gaps

**Original doc:** `RESEARCH_FEATURES_TESTING.md`
**Original checkbox count:** 162
**Features found in UI:** 241
**Features found in source code:** 307
**Missing from doc:** 145
**Completeness of original doc:** 52.8%

## Missing Features

### Detailed QA Coverage
- [ ] Real search-bar implementation details for the single-line input, button-disable rules, timeout handling, and persisted session restore
- [ ] Empty-state composition for recent searches, recently saved papers, limited suggested searches, and the `Loading your history...` helper
- [ ] Exact filter-to-query-param wiring, including `openAccessOnly`, `studyTypes`, `Last 5 Years`, and the `High Impact` override to citation sort
- [ ] Sort-dropdown behavior, including the lack of outside-click dismissal and the fact that sort changes only auto-search after a first search exists
- [ ] Actual source-count line and AI-optimized-query disclosure tied to `/api/search/unified`
- [ ] Real loading and error presentation for the live route, which uses pulsing result cards and a `GlassPanel` error state
- [ ] Result-card specifics for DOI/PMID title links, metadata fallbacks, abstract/TLDR visibility, and relevance helpers
- [ ] Save-button keying, optimistic local saved-state transitions, silent save failures, and `Save & Cite` redirect payload behavior
- [ ] Similar-paper request/empty/error states, cache short-circuiting, and retry behavior
- [ ] Previous/Next pagination behavior replacing the load-more pattern described in the original doc
- [ ] Floating Research Copilot toggle, chat welcome state, text-only message rendering, and send-button gating
- [ ] Auto-triggered AI synthesis behavior including citation-marker scrolling, free-plan blur overlay, and `Upgrade to Pro` link
- [ ] Route-level loading and error boundary copy

## Features in doc that DON'T EXIST in the app
- The live `/research` route does not use a textarea-based search box; it uses a single-line text input.
- The live `/research` route does not render the `ResultsTable.tsx` selection model with per-row checkboxes and `Select all`.
- The live `/research` route does not currently render the `PaperDetailPanel` flow described in the original document.
- The live `/research` route does not currently render the evidence-table setup/view flow from the newer research component stack.
- The live `/research` route does not expose a standalone `Insert Citation` action; it exposes `Save & Cite`.
- The live `/research` route does not use a `Load more results...` button; it uses paginated `Previous` and `Next` controls.
- The live `/research` route does not currently expose the tabbed paper-chat/search-plan stack described by `SearchTab.tsx`.
- The live search backend is `/api/search/unified`, not `/api/research/search`.
- The live unified search fans out to PubMed, Semantic Scholar, OpenAlex, and ClinicalTrials.gov, not just PubMed and Semantic Scholar.
- The live unified-search source timeout is 4.5 seconds per source, not 8 seconds.
