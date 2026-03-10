# Research — Feature Doc Gaps

**Original doc:** `RESEARCH_FEATURES_TESTING.md`
**Original checkbox count:** 162
**After Codex Pass 1:** 241
**After Codex Pass 2:** 503
**After Claude Code Pass 3:** 658
**Net additions Pass 3:** 155 (145 new discoveries + 10 behavior corrections)
**Completeness of original doc:** 24.6% (162/658)

## Pass 3 Coverage Areas

### New categories not covered by Passes 1-2:
- S2 Recommendations API internals (GET + POST handlers, validation, error responses)
- Research Agent system prompt details (4-phase strategy, role definition, stopping criteria)
- Rate limiting module specifics (key format, limits, in-memory vs Upstash, cleanup interval)
- Evidence level mapping function (exact studyType → Level mapping)
- Dedup & rank fusion internals (identity matching order, normalizeTitle, merge strategy, RRF formula)
- Cohere reranking internals (document construction, resilientFetch config, return_documents flag)
- Type definition gaps (openalexId, clinical trial fields, pico, rerankScore, journalQuartile)
- Accessibility gaps (11 missing aria-* attributes, no role attributes on interactive widgets)
- Empty-state UI heading text and icon details
- Save paper data flow (full field list forwarded to savePaper)
- Session state gap analysis (which fields are NOT persisted)
- Page layout/CSS details (fixed height, overflow scroll, z-indices)

### Behavior corrections (Pass 3):
- Section 21: Scroll position restoration claim is wrong (searchScrollPosition not in page.tsx)
- Section 2: NLP parsed filter chips claim is wrong (only static toggle chips exist)
- Section 5: Skeleton loader count is wrong (4 cards, not 5)
- Section 7: Author truncation threshold is wrong (>3, not >5)
- Section 7: Study type badge, source badge, PMID badge, DOI badge claims are wrong (not rendered)
- Section 17: Synthesis temperature claim is misleading (0.3 for plan, 0.4 for generate)
- Section 20: Verification system claim is wrong for this page (never calls /api/research/verify)

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
- The live `/research` route does not disable the main `Search` button for empty queries; an empty click is ignored only because `handleSearch()` returns early.
- The live `/research` route does not auto-scroll the copilot panel to the newest message.
- The live `/research` route does not pass current search results, filters, or saved-paper IDs into the research-agent request body.
- The live `/research` route does not render `SearchInput.tsx`, `ResearchSidebar.tsx`, `ResultsTable.tsx`, `PaperDetailPanel.tsx`, `EvidenceTable.tsx`, `SynthesisDialog.tsx`, `AISummaryCard.tsx`, or `VerificationBadge.tsx` even though those components still exist in the codebase.
- The live `/research` route does not persist or restore scroll position (no `searchScrollPosition` in page.tsx).
- The live `/research` route does not render NLP-parsed filter chips below the search input.
- The live `/research` route does not render study type badges, source badges, or PMID badges on result cards.
- The live `/research` route does not call `/api/research/verify` for paper verification.
