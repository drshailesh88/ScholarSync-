# feeds — Spec 017

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Add Feed Modal (add-feed-modal.tsx)
- [x] PASS: Successful PubMed add: clears `pubmedQuery` then calls `onClose()`
- [x] PASS: `subscribe` error re-thrown by store — modal catches it and sets local error state
- [x] PASS: `subscribePubMed` error re-thrown by store — modal catches it with different default message: "Failed to create PubMed feed"
#### Citation Modal (citation-modal.tsx)
- [x] PASS: Modal title: "Cite Article" (not "Citation" or "Cite")
- [x] PASS: Default citation tab: `"apa"` (useState initial value)
- [x] PASS: Citation display area: `bg-surface-raised rounded-xl p-4 mb-4 min-h-[80px]`
- [x] PASS: Citation text uses `font-mono` (monospace rendering)
- [x] PASS: Loading text: "Formatting citations..." with `animate-pulse`
- [x] PASS: Error text: "Failed to load citation formats" (`text-xs text-ink-muted`)
- [x] PASS: Copy Citation button: `bg-brand text-white` with `ClipboardText` icon (16px)
- [x] PASS: Copy button text changes: "Copy BibTeX" on bibtex tab, "Copy Citation" on others
- [x] PASS: Copy feedback text: "Copied!" for exactly 2000ms
- [x] PASS: Copy In-Text button: `border border-border text-ink` secondary style
- [x] PASS: Copy In-Text button hidden on bibtex tab (`tab !== "bibtex"`)
- [x] PASS: Clipboard fallback: creates textarea, calls `document.execCommand("copy")`, removes textarea
- [x] PASS: DOI section: centered (`text-center`) below copy buttons with `mt-3`
- [x] PASS: Citation formats fetched via server action `getAllCitationFormats(articleToPaperData(article))`
- [x] PASS: When article changes: formats reset to null, loading set to `!!article`, tab NOT reset
- [x] PASS: Fetch uses cancellation pattern: `let cancelled = false` with cleanup function
- [x] PASS: Copy buttons disabled when `!formats` (no formats loaded)
#### Journal Browser (journal-browser.tsx)
- [x] PASS: Loading state: 4 `Skeleton` bars (`h-16 w-full rounded-xl`)
- [x] PASS: Search uses `SearchInput` shared UI component (not raw input)
- [x] PASS: Category dropdown default: "All Categories"
- [x] PASS: Specialty dropdown default: "All Specialties"
- [x] PASS: Dropdowns styled: `rounded-xl border border-border bg-surface-raised px-3 py-2 text-sm`
- [x] PASS: Fetch uses `AbortController` for cleanup on search/category/specialty changes
- [x] PASS: AbortError caught and silently ignored (DOMException with name "AbortError")
- [x] PASS: Browse mode empty state: "No journals found matching your filters."
- [x] PASS: Browse mode subtitle: "Explore the curated directory by category, specialty, or publisher."
- [x] PASS: "Can't find what you're looking for?" help section only in search mode
- [x] PASS: "Can't find" text varies: references PubMed + RSS URL when no feeds found vs when some found
- [x] PASS: Journal card category pill: `rounded-full bg-surface-raised px-2 py-0.5 text-[10px] text-ink-muted`
- [x] PASS: Journal card specialty pill: same styling as category pill
- [x] PASS: Journal card "Suggested for you" badge: `rounded-full bg-brand/10 px-2 py-0.5 text-[10px] text-brand`
- [x] PASS: Journal list container: `max-h-64 overflow-y-auto` (scrollable, fixed height)
