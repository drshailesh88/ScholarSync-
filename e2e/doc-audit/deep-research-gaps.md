# Deep Research — Feature Doc Gaps

**Original doc:** `DEEP_RESEARCH_FEATURES_TESTING.md`
**Original checkbox count:** 200
**Features found in UI:** 271
**Features found in source code:** 336
**Missing from doc:** 136
**Completeness of original doc:** 59.5%

## Missing Features

### Detailed QA Coverage
- [ ] Real page-state defaults, abort behavior, and the fact that `Stop`/`Try Again`/`Start New Research` reset different subsets of state
- [ ] Exact SSE handling for plan generation and execution, including ignored `[DONE]` lines, malformed JSON handling, and the `progress = 0` edge case
- [ ] Plan-preview local editing behavior, including the component-local perspective copy and the missing `isRegenerating` wiring from the page
- [ ] Actual running-state rendering with multiple streaming `ResearchDocument` sections rather than a single accumulating markdown block
- [ ] Session-loading behavior and the lossy mapping from saved session data into the in-page enhanced-report shape
- [ ] Real `ResearchDocument` behavior for desktop/mobile TOC, citations-panel defaults, reference-list truncation, citation highlighting, and markdown component rendering
- [ ] Export button details for filename sanitization, PDF failure states, clipboard fallbacks, and open-in-studio request payloads
- [ ] Save-to-library disabled-state rules, retry/error tooltip behavior, and actual payload contents
- [ ] The fact that `/deep-research` has no separate route-level `loading.tsx` or `error.tsx`

## Features in doc that DON'T EXIST in the app
- The page does not enforce the documented `5–500` character validation range in the client UI; it only requires non-empty trimmed text to start.
- The Start button does not show a dedicated loading spinner while the plan is being generated.
- The route does not have separate `loading.tsx` or `error.tsx` files.
- Past Research cards are not explicitly sliced to 20 in the component; that limit depends on the API payload.
- The plan-preview `Regenerate` button is not wired to a visible spinner/disabled state from the page because `isRegenerating` is never passed.
- `Start New Research` clears the topic but keeps the previously selected research mode.
- Mobile table of contents is a left-side drawer overlay, not a full-screen overlay.
- Mobile citations use a bottom sheet, but the mobile table of contents does not.
