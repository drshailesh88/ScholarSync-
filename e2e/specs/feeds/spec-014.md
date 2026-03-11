# feeds — Spec 014

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Article Reader (article-reader.tsx)
- [ ] Reader empty state: `glass-panel rounded-2xl h-full flex items-center justify-center`
- [ ] Reader empty state text styling: `text-sm text-ink-muted`
- [ ] Title styling: `text-lg font-bold text-ink leading-snug mb-3`
- [ ] Authors: `text-sm text-ink-muted mb-2`; hidden when `article.authors` is falsy
- [ ] Journal info format: `[journal] · Vol. {volume} · Issue {issue}` (array filtered + joined by " · ")
- [ ] Journal info styling: `text-xs text-ink-muted/70 mb-1`
- [ ] Published date styling: `text-xs text-ink-muted/70 mb-4`
- [ ] Reading time on same line as published date, separated by ` · `
- [ ] `estimateReadingTime()` returns `"< 1 min"` for null/empty text, otherwise `"{n} min read"` (at 200 WPM)
- [ ] Reader Star button label text: "Starred" / "Star" (not icon-only like card view)
- [ ] Reader Save button label text: "Saved" / "Save" (not icon-only like card view)
- [ ] Reader Cite button: only rendered when `onCite` prop is provided
- [ ] Reader AI button styling: `bg-brand/10 text-brand hover:bg-brand/15 border border-brand/20`
- [ ] Reader AI button icon: `Sparkle` with `weight="fill"`
- [ ] Reader Open Original: `<a>` element (not button), hidden when `article.link` falsy
- [ ] Abstract header text: "Abstract" (`text-sm font-semibold text-ink mb-2`)
- [ ] Abstract body: `text-sm text-ink-muted leading-relaxed`
- [ ] DOI text format: "DOI: " followed by linked doi value (`text-brand hover:underline`)
- [ ] ArticleNotes rendered inside the actions border-b section
- [ ] RelatedPapers rendered below notes with `mt-4`, still inside the border-b section
#### Article Notes (article-notes.tsx)
- [ ] NoteBlank icon size: 14px
- [ ] "Notes" label: `text-xs text-ink-muted`
- [ ] Saved indicator: Check icon (12px) + "Saved" text in `text-emerald-500`
- [ ] Textarea: `resize-none rounded-xl border border-border bg-surface-raised px-3 py-2 text-xs leading-relaxed`
- [ ] Textarea focus: `focus:ring-2 focus:ring-brand/40`
- [ ] Auto-save debounce: `setTimeout(() => persist(value), 1000)` (exactly 1000ms)
- [ ] Blur handler clears pending save timer before persisting
- [ ] Blur handler only persists when `localValue !== notes` (skips if unchanged)
- [ ] Saved indicator disappears after exactly 2000ms
- [ ] Component cleans up both save timer and saved-indicator timer on unmount
#### Related Papers (related-papers.tsx)
- [ ] "Find Related Papers" button: `rounded-xl border border-border-subtle bg-surface-raised/50 px-4 py-3 text-sm`
- [ ] Loading: `Spinner` icon (18px) with `animate-spin` + "Finding related papers..." text
- [ ] Error text: `text-red-400` center-aligned `text-xs`
- [ ] Error message: "Could not find related papers"
- [ ] RelatedPaperCards empty state: "No related papers found." (`text-xs text-ink-muted` centered)
