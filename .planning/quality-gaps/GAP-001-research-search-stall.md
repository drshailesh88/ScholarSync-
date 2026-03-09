# GAP-001: Research — Benchmark Search Stalls With Hydration Mismatch

## Problem
The first benchmark query in `/research` (`SGLT2 inhibitors heart failure`) stayed in `Searching...` for more than 13 seconds and never rendered a result set. The browser also surfaced a hydration mismatch on the page.

## Evidence
- Quality Assessment Module 2
- Screenshot: `e2e/quality-assessment/research/03-stuck-search.png`
- Score impact: D1 = 1/5, D3 = 1/5, D4 = 1/5, D7 = 1/5

## Root Cause (Investigate)
- Hydration mismatch in [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/research/page.tsx)
- State divergence between SSR query suggestions and client-rendered suggestions
- Search request lifecycle across [SearchInput.tsx](/Users/shaileshsingh/ScholarSync/src/components/research/SearchInput.tsx), [SearchTab.tsx](/Users/shaileshsingh/ScholarSync/src/components/research/SearchTab.tsx), and source adapters under [src/lib/search](/Users/shaileshsingh/ScholarSync/src/lib/search)

## Acceptance Criteria
- AC-1: A benchmark search returns first results in under 5 seconds in local dev.
- AC-2: The page no longer logs a hydration mismatch on initial load or query.
- AC-3: The UI shows either results or an actionable error state; it does not stay indefinitely in `Searching...`.
- AC-4: The top 5 results for `SGLT2 inhibitors heart failure` are medically relevant.

## Files Likely Involved
- [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/research/page.tsx)
- [SearchInput.tsx](/Users/shaileshsingh/ScholarSync/src/components/research/SearchInput.tsx)
- [SearchTab.tsx](/Users/shaileshsingh/ScholarSync/src/components/research/SearchTab.tsx)
- [semantic-scholar.ts](/Users/shaileshsingh/ScholarSync/src/lib/search/sources/semantic-scholar.ts)
- [pubmed.ts](/Users/shaileshsingh/ScholarSync/src/lib/search/sources/pubmed.ts)

## Effort Estimate
Medium (M)

## Verification
```bash
agent-browser --session qa open http://127.0.0.1:3000/research
agent-browser --session qa fill @search "SGLT2 inhibitors heart failure"
agent-browser --session qa click @submit
# Expect results or actionable error in <5s, with no hydration mismatch
```

