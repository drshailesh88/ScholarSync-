Research Pass 3 Verification Report

Total Pass 3 assertions reviewed: 155
Verified Correct: 151
Hallucinated / Inaccurate: 1
Partially Correct: 3
Accuracy rate: 97.4%
Behavior corrections verified: 10/10 correct

Verified Correct (sample)

- [line 860] "`readSession()` returns `null` when stored JSON is corrupt or cannot be parsed" — CONFIRMED in `src/app/(app)/research/page.tsx:132-139`
- [line 875] "`Recent Searches` heading text reads exactly `Recent Searches`" — CONFIRMED in `src/app/(app)/research/page.tsx:691-694`
- [line 889] "`Last 5 Years` filter dynamically computes yearStart as `new Date().getFullYear() - 5`" — CONFIRMED in `src/app/(app)/research/page.tsx:341-343`
- [line 900] "DOI link in the metadata row calls `e.stopPropagation()`" — CONFIRMED in `src/app/(app)/research/page.tsx:902-913`
- [line 912] "Copilot sidebar is rendered as an `<aside>` HTML element" — CONFIRMED in `src/app/(app)/research/page.tsx:1125-1127`
- [line 926] "Synthesis streaming uses `ReadableStream.getReader()` with `TextDecoder` `stream: true`" — CONFIRMED in `src/components/research/AISynthesisPanel.tsx:136-145`
- [line 938] "GET handler requires authentication, returns 401 `{ error: \"Authentication required\" }`" — CONFIRMED in `src/app/api/search/s2-recommendations/route.ts:13-21`
- [line 951] "Research-agent rate limit uses key `\"research-agent\"` with `RATE_LIMITS.ai`" — CONFIRMED in `src/app/api/research-agent/route.ts:57-60`
- [line 970] "Rate limit error response body is exactly `{ error: \"Rate limit exceeded. Please try again later.\" }` with HTTP 429 status" — CONFIRMED in `src/lib/rate-limit.ts:75-83` and `src/lib/rate-limit.ts:93-100`
- [line 982] "`getEvidenceLevel()` maps `meta_analysis` and `systematic_review` to Level I" — CONFIRMED in `src/lib/search/evidence-level.ts:9-14`
- [line 999] "RRF contribution formula is `1 / (k + rank + 1)` where `k` defaults to `60`" — CONFIRMED in `src/lib/search/rank-fusion.ts:9-21`
- [line 1005] "Cohere rerank request uses `resilientFetch` with `timeout: 10000` and `maxRetries: 2`" — CONFIRMED in `src/lib/search/rerank.ts:26-43`
- [line 1018] "`UnifiedSearchResult` type includes `openalexId?: string`" — CONFIRMED in `src/types/search.ts:3-8`
- [line 1040] "Search input has no `aria-label` or accessible name attribute" — CONFIRMED in `src/app/(app)/research/page.tsx:573-580`
- [line 1054] "Route-level `loading.tsx` renders ... exactly 3 `SkeletonCard` placeholders" — CONFIRMED in `src/app/(app)/research/loading.tsx:5-12`

Hallucinated / Inaccurate

- [line 906] "Similar-paper `key` is derived as `r.s2Id || r.doi || r.title`" — WRONG because the rendered similar-paper cards use `key={simIdx}` in `src/app/(app)/research/page.tsx:1045-1048`

Partially Correct

- [line 975] "In-memory rate limiter ... uses a fixed sliding window" — MOSTLY RIGHT but the fallback implementation is a fixed-window counter keyed by `resetAt`; only the Upstash branch uses a sliding window in `src/lib/rate-limit.ts:15-35` and `src/lib/rate-limit.ts:69-73`
- [line 1013] "`handleSave(result)` sends `citation_count: result.citationCount` — not `citations` or `citation_count`" — MOSTLY RIGHT but the wording is self-contradictory; the actual payload key is `citation_count` in `src/app/(app)/research/page.tsx:467-490`
- [line 1035] "`Math.max(totalPages, 1)` ensures `Page 1 of 1` is shown even when there are 0 results" — MOSTLY RIGHT but the pagination block renders only when `totalResults > 0`, so that zero-results conclusion is false in `src/app/(app)/research/page.tsx:1076-1089`

Behavior Corrections Verdict

1. CORRECTION 1: Scroll position restoration claim — VERIFIED CORRECT because `searchScrollPosition` appears in `src/stores/research-store.ts` and `src/components/research/ResultsTable.tsx`, but not in `src/app/(app)/research/page.tsx`
2. CORRECTION 2: NLP parsed filter chips claim — VERIFIED CORRECT because the live page renders only six static filter buttons in `src/app/(app)/research/page.tsx:594-616`
3. CORRECTION 3: Skeleton loader count claim — VERIFIED CORRECT because the in-page loading state uses `Array.from({ length: 4 })` in `src/app/(app)/research/page.tsx:835-844`, while route loading uses 3 cards in `src/app/(app)/research/loading.tsx:8-11`
4. CORRECTION 4: Author truncation threshold claim — VERIFIED CORRECT because result cards use `r.authors.slice(0, 3)` and `r.authors.length > 3` in `src/app/(app)/research/page.tsx:890-894`
5. CORRECTION 5: Study type badge claim — VERIFIED CORRECT because no `studyType` badge render exists in the live result card markup in `src/app/(app)/research/page.tsx:932-1012`
6. CORRECTION 6: Source badge claim — VERIFIED CORRECT because no source badge render exists in the live result card markup in `src/app/(app)/research/page.tsx:932-1012`
7. CORRECTION 7: PMID badge claim — VERIFIED CORRECT because PMID is used only for title link construction and save payloads in `src/app/(app)/research/page.tsx:876-884` and `src/app/(app)/research/page.tsx:479-480`
8. CORRECTION 8: DOI badge claim — VERIFIED CORRECT because DOI is rendered as a text link labeled `DOI`, not a badge, in `src/app/(app)/research/page.tsx:902-913`
9. CORRECTION 9: Synthesis temperature claim — VERIFIED CORRECT because plan mode uses `0.3` and generate mode uses `0.4` in `src/app/api/research/synthesize/route.ts:47-52` and `src/app/api/research/synthesize/route.ts:80-85`
10. CORRECTION 10: Verification system claim — VERIFIED CORRECT because the live page imports neither `VerificationBadge` nor any `/api/research/verify` caller; those exist only in non-rendered research components found by `rg`

## Codex Verification Pass Discoveries

- `handleSearch(...)` does not clear stale `results` on failure, so the error banner can coexist with previous successful results in `src/app/(app)/research/page.tsx:374-424` and `src/app/(app)/research/page.tsx:848-856`
- `handleSearch(...)` has no stale-request token beyond `AbortController`, so an earlier aborted request can still update `error` or `loading` after a newer search starts in `src/app/(app)/research/page.tsx:361-424`
- `ResearchPage` never aborts `abortRef.current` on unmount; there is no cleanup effect paired with the search controller in `src/app/(app)/research/page.tsx:361-424`
- The first failed search flips `hasSearched` to `true` before the fetch resolves, which suppresses the rich empty state on the next render in `src/app/(app)/research/page.tsx:374-379` and `src/app/(app)/research/page.tsx:558-559`
- Similar-paper cards use unstable React keys (`key={simIdx}`) in `src/app/(app)/research/page.tsx:1045-1048`
- `handleFindSimilar(...)` has no abort or timeout path; retries and navigation do not cancel the request in `src/app/(app)/research/page.tsx:522-555`
- Copilot open/close has no focus-management code; the page never focuses the chat input on open or restores focus on close in `src/app/(app)/research/page.tsx:1111-1227`
- `AISynthesisPanel.triggerSynthesis()` also lacks a stale-request token, so an older request's `finally { setIsStreaming(false) }` can race a newer request in `src/components/research/AISynthesisPanel.tsx:91-154`
