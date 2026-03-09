# Feeds — Feature Doc Gaps

**Original doc:** `FEEDS_FEATURES_TESTING.md`
**Original checkbox count:** 185
**Codex pass 1 total:** 309
**Claude Code pass 2 total:** 641
**Features added in pass 2:** 332
**Completeness estimate:** ~95% of testable UI surface area

## Pass 2 Coverage Summary

### New sections added
- Page-level rendering logic (8 checks)
- Header specifics (19 checks)
- Loading skeleton (5 checks)
- Error boundary (5 checks)
- Empty state (5 checks)
- Feed sidebar rendering (21 checks)
- Article list rendering (7 checks)
- Article card — card view (18 checks)
- Article card — list view (10 checks)
- Article card — magazine view (13 checks)
- Article search bar (18 checks)
- Article reader (21 checks)
- Article notes (10 checks)
- Related papers (22 checks)
- Copilot panel (43 checks)
- Add feed modal (14 checks)
- Citation modal (17 checks)
- Journal browser (21 checks)
- Feed store — additional details (41 checks)
- Keyboard shortcuts — edge cases (7 checks)
- Behavior corrections (6 items)

## Behavior Corrections Identified in Pass 2

1. **Error banner dismiss**: Text "Dismiss" — not an X icon as implied by original doc
2. **Copilot quick actions**: Uses `flex gap-2` — not a CSS grid as stated in original doc
3. **Magazine link**: Shows "Open" linking to `article.link` — not "DOI" linking to `doi.org`
4. **Card abstract truncation**: 120-char truncation is card-view-specific, magazine shows full text
5. **Relevance sort direction**: `setSortBy("relevance")` always sets `sortDir = "desc"` — does NOT preserve current sortDir as claimed in Codex pass 1
6. **Magazine read title**: Uses `font-medium` — not `font-normal` as card view does

## Remaining gaps (estimated <5%)
- Toast/notification system behavior (if any exists beyond alert())
- Browser-level behaviors (back/forward navigation, URL hash state)
- Accessibility: focus management, screen reader announcements
- Network timeout/offline handling
- Concurrent request deduplication (store does not deduplicate)
