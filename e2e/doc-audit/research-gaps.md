# Research — Feature Doc Gaps

**Original doc:** `RESEARCH_FEATURES_TESTING.md`
**Original checkbox count:** 162
**After Codex Pass 1:** 241
**After Codex Pass 2:** 503
**After Claude Code Pass 3:** 658
**After Codex verification cleanup:** 598
**Claude Code Pass 3 verification:** 151 correct, 1 inaccurate, 3 partial, 10/10 behavior corrections verified
**Net additions vs original doc:** 436
**Confirmed hallucinations removed during verification cleanup:** 70
**Completeness of original doc:** 27.1% (162/598)

## Verification Outcome

- Claude Code Pass 3 materially improved coverage, but verification still found 1 false assertion and 3 wording/logic errors inside the pass-3 section.
- The largest remaining quality issue in the main checklist was older non-rendered feature inventory copied from the alternate research component stack (`ResultsTable`, `PaperDetailPanel`, evidence table, verification, citation event flow, paper-chat tabs).
- After removing those live-route hallucinations and adding Codex verification discoveries, the corrected file now tracks 598 source-backed checks.

## Verified Pass 3 Coverage Areas

- S2 recommendations API internals
- Research-agent system prompt and tool contracts
- Rate-limiting module details
- Evidence-level mapping
- Deduplication and reciprocal-rank fusion internals
- Cohere reranking behavior
- Empty-state UI text, icons, and layout
- AISynthesisPanel internals
- Copilot sidebar rendering details
- Result-card rendering details
- Accessibility gaps
- Type-definition gaps

## Removed Hallucination Areas

- Non-rendered `ResultsTable` / checkbox selection flow
- Non-rendered `PaperDetailPanel` flow
- Non-rendered evidence-table flow
- Non-rendered verification flow
- Non-rendered tabbed paper-chat flow
- Non-existent citation custom-event flow
- Incorrect textarea / parsed-chip search UI claims
- Incorrect `/api/research/search` backend claim
- Incorrect 8-second timeout claim
- Incorrect load-more pagination claim
