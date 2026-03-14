# feeds — Spec 017

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Add Feed Modal (add-feed-modal.tsx)
- [ ] Successful PubMed add: clears `pubmedQuery` then calls `onClose()`
- [ ] `subscribe` error re-thrown by store — modal catches it and sets local error state
- [ ] `subscribePubMed` error re-thrown by store — modal catches it with different default message: "Failed to create PubMed feed"
#### Citation Modal (citation-modal.tsx)
- [ ] Modal title: "Cite Article" (not "Citation" or "Cite")
- [ ] Default citation tab: `"apa"` (useState initial value)
- [ ] Citation display area: `bg-surface-raised rounded-xl p-4 mb-4 min-h-[80px]`
- [ ] Citation text uses `font-mono` (monospace rendering)
- [ ] Loading text: "Formatting citations..." with `animate-pulse`
- [ ] Error text: "Failed to load citation formats" (`text-xs text-ink-muted`)
- [ ] Copy Citation button: `bg-brand text-white` with `ClipboardText` icon (16px)
- [ ] Copy button text changes: "Copy BibTeX" on bibtex tab, "Copy Citation" on others
- [ ] Copy feedback text: "Copied!" for exactly 2000ms
- [ ] Copy In-Text button: `border border-border text-ink` secondary style
- [ ] Copy In-Text button hidden on bibtex tab (`tab !== "bibtex"`)
- [ ] Clipboard fallback: creates textarea, calls `document.execCommand("copy")`, removes textarea
- [ ] DOI section: centered (`text-center`) below copy buttons with `mt-3`
- [ ] Citation formats fetched via server action `getAllCitationFormats(articleToPaperData(article))`
- [ ] When article changes: formats reset to null, loading set to `!!article`, tab NOT reset
- [ ] Fetch uses cancellation pattern: `let cancelled = false` with cleanup function
- [ ] Copy buttons disabled when `!formats` (no formats loaded)
#### Journal Browser (journal-browser.tsx)
- [ ] Loading state: 4 `Skeleton` bars (`h-16 w-full rounded-xl`)
- [ ] Search uses `SearchInput` shared UI component (not raw input)
- [ ] Category dropdown default: "All Categories"
- [ ] Specialty dropdown default: "All Specialties"
- [ ] Dropdowns styled: `rounded-xl border border-border bg-surface-raised px-3 py-2 text-sm`
- [ ] Fetch uses `AbortController` for cleanup on search/category/specialty changes
- [ ] AbortError caught and silently ignored (DOMException with name "AbortError")
- [ ] Browse mode empty state: "No journals found matching your filters."
- [ ] Browse mode subtitle: "Explore the curated directory by category, specialty, or publisher."
- [ ] "Can't find what you're looking for?" help section only in search mode
- [ ] "Can't find" text varies: references PubMed + RSS URL when no feeds found vs when some found
- [ ] Journal card category pill: `rounded-full bg-surface-raised px-2 py-0.5 text-[10px] text-ink-muted`
- [ ] Journal card specialty pill: same styling as category pill
- [ ] Journal card "Suggested for you" badge: `rounded-full bg-brand/10 px-2 py-0.5 text-[10px] text-brand`
- [ ] Journal list container: `max-h-64 overflow-y-auto` (scrollable, fixed height)
