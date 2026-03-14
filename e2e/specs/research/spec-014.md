# research — Spec 014

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Empty-State UI Details
- [x] PASS: Recent search result-count suffix is formatted with `toLocaleString()` so numbers include thousands separators
#### Search Mechanics
- [x] PASS: `Last 5 Years` filter dynamically computes yearStart as `new Date().getFullYear() - 5` — it is not hardcoded to a specific year
- [x] PASS: Filter/sort auto-re-search useEffect dependency array is exactly `[filters, sort]` — changes to `query` alone do NOT trigger auto-re-search
- [x] PASS: When the API returns a non-OK status and no JSON error body can be parsed, the error message fallback is `Search failed (status ${statusCode})` — not `Search failed. Please try again.`
- [x] PASS: The fallback `Search failed. Please try again.` only appears for non-`Error` exception types in the catch block (when `err instanceof Error` is false)
- [x] PASS: `highImpact` filter overrides `sort` in the URL by calling `params.set("sort", "citations")` after the original sort is already set — this means the API receives `sort=citations` even if the user selected a different sort option
- [x] PASS: `buildSearchUrl` includes `perPage` as `perPage.toString()` (always `"20"`) in every search request URL
- [x] PASS: `handleSearch` clears `aiSummary` to `null` before each new search, forcing the AISynthesisPanel to re-synthesize even if the same query is rerun
- [x] PASS: The search-history `saveSearchQuery` call uses `.catch(() => {})` so history-save failures are completely silent and non-blocking
#### Result Card Rendering
- [x] PASS: DOI link in the metadata row calls `e.stopPropagation()` on click to prevent triggering any parent click handlers
- [x] PASS: Result card wrapper includes `id="paper-result-{idx}"` as a DOM id for scroll-to targeting from synthesis citations
- [x] PASS: Result card wrapper has `transition-[box-shadow] duration-500` enabling smooth 500ms ring highlight transitions when synthesis citations target it
- [x] PASS: Result card React `key` attribute is `${identityKey}-${idx}` — the array index is appended for uniqueness in case duplicate identity keys exist
- [x] PASS: When `citationCount` is exactly `0`, the " · N citations" suffix is omitted because the render branch checks truthiness (`r.citationCount ? ...`)
- [x] PASS: Saving state button uses `cursor-wait` class to show the wait cursor while a save is in progress
- [x] PASS: Similar-paper lookup key uses `r.s2Id || r.doi || r.title`, which differs from the save key that uses `r.doi || r.pmid || r.s2Id || r.title`
- [x] PASS: Similar-paper section header reads `Similar Papers` in `text-[10px] text-ink-muted uppercase tracking-wider font-medium`
- [x] PASS: Result author row renders `r.authors.slice(0, 3).join(", ")` — if the original `authors` array is empty, an empty `<p>` element still renders
#### Copilot Sidebar
- [x] PASS: Copilot sidebar is rendered as an `<aside>` HTML element, not a `<div>`
- [x] PASS: Copilot sidebar width is exactly `w-96` (384px / 24rem)
- [x] PASS: Copilot sidebar close button uses the `X` icon from Phosphor Icons (size 16)
- [x] PASS: Copilot send button uses the `PaperPlaneTilt` icon from Phosphor Icons (size 16)
- [x] PASS: User chat messages are styled with `bg-brand/10 text-ink ml-8` (indented from left)
- [x] PASS: Assistant chat messages are styled with `bg-surface-raised text-ink mr-4` (indented from right)
- [x] PASS: Chat message text renders with `whitespace-pre-wrap` preserving line breaks and whitespace in AI responses
- [x] PASS: Copilot welcome card shows a `Sparkle` icon (size 14) with uppercase `Research Assistant` label text
- [x] PASS: Copilot welcome message body reads exactly `Ask me to find papers on any topic. I'll search across PubMed, Semantic Scholar, and OpenAlex using systematic search strategies.`
- [x] PASS: Copilot AI status indicator shows a pulsing emerald dot (`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`) with `AI` text in `text-emerald-500`
- [x] PASS: Copilot header uses `Brain` icon (size 18) in `text-brand` color
#### AISynthesisPanel Internals
- [x] PASS: Synthesis streaming uses `ReadableStream.getReader()` with `TextDecoder` `stream: true` option for progressive multi-chunk decoding
- [x] PASS: "Generating..." indicator text appears next to the header during streaming, shown as a pulsing brand dot + `text-[10px] text-brand/70` label
- [x] PASS: Citation `et al.` suffix is added when a paper has more than 1 author (`p.authors.length > 1`), not the 2-author or 3-author threshold used elsewhere in the codebase
- [x] PASS: AISynthesisPanel `paperCount` is computed as `Math.min(results.length, 5)` — if fewer than 5 results exist, the header reads `Answer from top {actual count} papers`
- [x] PASS: Free-plan blur overlay gradient direction is `bg-gradient-to-t from-surface via-surface/90 to-transparent` (bottom-to-top fade)
- [x] PASS: Free-plan upgrade link text reads `Upgrade to Pro` with `text-brand hover:text-brand-hover` styling
