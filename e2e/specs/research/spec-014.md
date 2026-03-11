# research — Spec 014

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Empty-State UI Details
- [ ] Recent search result-count suffix is formatted with `toLocaleString()` so numbers include thousands separators
#### Search Mechanics
- [ ] `Last 5 Years` filter dynamically computes yearStart as `new Date().getFullYear() - 5` — it is not hardcoded to a specific year
- [ ] Filter/sort auto-re-search useEffect dependency array is exactly `[filters, sort]` — changes to `query` alone do NOT trigger auto-re-search
- [ ] When the API returns a non-OK status and no JSON error body can be parsed, the error message fallback is `Search failed (status ${statusCode})` — not `Search failed. Please try again.`
- [ ] The fallback `Search failed. Please try again.` only appears for non-`Error` exception types in the catch block (when `err instanceof Error` is false)
- [ ] `highImpact` filter overrides `sort` in the URL by calling `params.set("sort", "citations")` after the original sort is already set — this means the API receives `sort=citations` even if the user selected a different sort option
- [ ] `buildSearchUrl` includes `perPage` as `perPage.toString()` (always `"20"`) in every search request URL
- [ ] `handleSearch` clears `aiSummary` to `null` before each new search, forcing the AISynthesisPanel to re-synthesize even if the same query is rerun
- [ ] The search-history `saveSearchQuery` call uses `.catch(() => {})` so history-save failures are completely silent and non-blocking
#### Result Card Rendering
- [ ] DOI link in the metadata row calls `e.stopPropagation()` on click to prevent triggering any parent click handlers
- [ ] Result card wrapper includes `id="paper-result-{idx}"` as a DOM id for scroll-to targeting from synthesis citations
- [ ] Result card wrapper has `transition-[box-shadow] duration-500` enabling smooth 500ms ring highlight transitions when synthesis citations target it
- [ ] Result card React `key` attribute is `${identityKey}-${idx}` — the array index is appended for uniqueness in case duplicate identity keys exist
- [ ] When `citationCount` is exactly `0`, the " · N citations" suffix is omitted because the render branch checks truthiness (`r.citationCount ? ...`)
- [ ] Saving state button uses `cursor-wait` class to show the wait cursor while a save is in progress
- [ ] Similar-paper lookup key uses `r.s2Id || r.doi || r.title`, which differs from the save key that uses `r.doi || r.pmid || r.s2Id || r.title`
- [ ] Similar-paper section header reads `Similar Papers` in `text-[10px] text-ink-muted uppercase tracking-wider font-medium`
- [ ] Result author row renders `r.authors.slice(0, 3).join(", ")` — if the original `authors` array is empty, an empty `<p>` element still renders
#### Copilot Sidebar
- [ ] Copilot sidebar is rendered as an `<aside>` HTML element, not a `<div>`
- [ ] Copilot sidebar width is exactly `w-96` (384px / 24rem)
- [ ] Copilot sidebar close button uses the `X` icon from Phosphor Icons (size 16)
- [ ] Copilot send button uses the `PaperPlaneTilt` icon from Phosphor Icons (size 16)
- [ ] User chat messages are styled with `bg-brand/10 text-ink ml-8` (indented from left)
- [ ] Assistant chat messages are styled with `bg-surface-raised text-ink mr-4` (indented from right)
- [ ] Chat message text renders with `whitespace-pre-wrap` preserving line breaks and whitespace in AI responses
- [ ] Copilot welcome card shows a `Sparkle` icon (size 14) with uppercase `Research Assistant` label text
- [ ] Copilot welcome message body reads exactly `Ask me to find papers on any topic. I'll search across PubMed, Semantic Scholar, and OpenAlex using systematic search strategies.`
- [ ] Copilot AI status indicator shows a pulsing emerald dot (`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`) with `AI` text in `text-emerald-500`
- [ ] Copilot header uses `Brain` icon (size 18) in `text-brand` color
#### AISynthesisPanel Internals
- [ ] Synthesis streaming uses `ReadableStream.getReader()` with `TextDecoder` `stream: true` option for progressive multi-chunk decoding
- [ ] "Generating..." indicator text appears next to the header during streaming, shown as a pulsing brand dot + `text-[10px] text-brand/70` label
- [ ] Citation `et al.` suffix is added when a paper has more than 1 author (`p.authors.length > 1`), not the 2-author or 3-author threshold used elsewhere in the codebase
- [ ] AISynthesisPanel `paperCount` is computed as `Math.min(results.length, 5)` — if fewer than 5 results exist, the header reads `Answer from top {actual count} papers`
- [ ] Free-plan blur overlay gradient direction is `bg-gradient-to-t from-surface via-surface/90 to-transparent` (bottom-to-top fade)
- [ ] Free-plan upgrade link text reads `Upgrade to Pro` with `text-brand hover:text-brand-hover` styling
