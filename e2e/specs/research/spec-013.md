# research — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Components Referenced But Not Rendered
- [ ] `src/components/research/PaperDetailPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/EvidenceTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/SynthesisDialog.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ResearchSidebar.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ChatTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/LibraryTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/SearchTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ResearchPlan.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/FilterPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/AISummaryCard.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/VerificationBadge.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ScopeSelector.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/citation-network.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
#### Session & State Behavior
- [ ] `readSession()` returns `null` when stored JSON is corrupt or cannot be parsed — the `catch` block silently swallows `JSON.parse` errors
- [ ] `writeSession()` catch block comment documents the failure reason as `quota exceeded — ignore`
- [ ] Session persistence does NOT include `similarResults`, `similarErrors`, `similarEmpty`, `loadingSimilar`, `showCopilot`, `showSortDropdown`, `showAugmented`, `chatInput`, or `chatMessages` — these all reset on page refresh
- [ ] The `saved` Set (tracking which papers the user has saved this session) is not persisted in sessionStorage and resets on refresh
- [ ] `showAugmented` (augmented-queries disclosure state) is not persisted in session; the disclosure collapses on refresh even if previously expanded
- [ ] `userPlan` initializes as `null` before `getUserUsageStats()` resolves, meaning `isFree` in AISynthesisPanel evaluates to `false` during the initial render window
- [ ] `similarResults` is stored as a `Record<string, UnifiedSearchResult[]>` keyed by `r.s2Id || r.doi || r.title`, not by a numeric index
#### Empty-State UI Details
- [ ] Empty-state data load useEffect has a `cancelled` boolean race-condition guard; the cleanup function sets `cancelled = true` to prevent state updates after unmount
- [ ] Empty-state `getRecentSearches()` failure silently returns empty array `[]` via `.catch(() => [])`
- [ ] Empty-state `getUserPapers()` failure silently returns empty array `[]` via `.catch(() => [])`
- [ ] When the `authors` field on a recently saved paper is not an array, the author mapping falls back to empty string `""`
- [ ] `emptyStateLoaded` is set to `true` inside a `finally` block, ensuring it updates even when the data-load promise rejects
- [ ] Empty-state "Recent Searches" heading text reads exactly `Recent Searches` with `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling
- [ ] Empty-state "Recently Saved" heading text reads exactly `Recently Saved`
- [ ] Empty-state "Try searching for" heading text reads exactly `Try searching for`
- [ ] Empty-state "Recent Searches" heading is prefixed with a `ClockCounterClockwise` icon (size 14)
- [ ] Empty-state "Recently Saved" heading is prefixed with a `BookmarkSimple` icon (size 14)
- [ ] Empty-state "Try searching for" heading is prefixed with a `Lightbulb` icon (size 14)
- [ ] Recently saved papers are rendered in a 2-column grid layout (`grid grid-cols-2 gap-3`)
- [ ] Recently saved paper titles are clamped to 2 lines via `line-clamp-2`
- [ ] Recently saved journal and year are joined with `" · "` separator, with falsy values filtered out via `filter(Boolean)` before joining
- [ ] Recent search rows show a `MagnifyingGlass` icon (size 14) on the left of each query text
