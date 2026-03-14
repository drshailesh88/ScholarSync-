# feeds — Spec 014

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Article Reader (article-reader.tsx)
- [x] PASS: Reader empty state: `glass-panel rounded-2xl h-full flex items-center justify-center`
- [x] PASS: Reader empty state text styling: `text-sm text-ink-muted`
- [x] PASS: Title styling: `text-lg font-bold text-ink leading-snug mb-3`
- [x] PASS: Authors: `text-sm text-ink-muted mb-2`; hidden when `article.authors` is falsy
- [x] PASS: Journal info format: `[journal] · Vol. {volume} · Issue {issue}` (array filtered + joined by " · ")
- [x] PASS: Journal info styling: `text-xs text-ink-muted/70 mb-1`
- [x] PASS: Published date styling: `text-xs text-ink-muted/70 mb-4`
- [x] PASS: Reading time on same line as published date, separated by ` · `
- [x] PASS: `estimateReadingTime()` returns `"< 1 min"` for null/empty text, otherwise `"{n} min read"` (at 200 WPM)
- [x] PASS: Reader Star button label text: "Starred" / "Star" (not icon-only like card view)
- [x] PASS: Reader Save button label text: "Saved" / "Save" (not icon-only like card view)
- [x] PASS: Reader Cite button: only rendered when `onCite` prop is provided
- [x] PASS: Reader AI button styling: `bg-brand/10 text-brand hover:bg-brand/15 border border-brand/20`
- [x] PASS: Reader AI button icon: `Sparkle` with `weight="fill"`
- [x] PASS: Reader Open Original: `<a>` element (not button), hidden when `article.link` falsy
- [x] PASS: Abstract header text: "Abstract" (`text-sm font-semibold text-ink mb-2`)
- [x] PASS: Abstract body: `text-sm text-ink-muted leading-relaxed`
- [x] PASS: DOI text format: "DOI: " followed by linked doi value (`text-brand hover:underline`)
- [x] PASS: ArticleNotes rendered inside the actions border-b section
- [x] PASS: RelatedPapers rendered below notes with `mt-4`, still inside the border-b section
#### Article Notes (article-notes.tsx)
- [x] PASS: NoteBlank icon size: 14px
- [x] PASS: "Notes" label: `text-xs text-ink-muted`
- [x] PASS: Saved indicator: Check icon (12px) + "Saved" text in `text-emerald-500`
- [x] PASS: Textarea: `resize-none rounded-xl border border-border bg-surface-raised px-3 py-2 text-xs leading-relaxed`
- [x] PASS: Textarea focus: `focus:ring-2 focus:ring-brand/40`
- [x] PASS: Auto-save debounce: `setTimeout(() => persist(value), 1000)` (exactly 1000ms)
- [x] PASS: Blur handler clears pending save timer before persisting
- [x] PASS: Blur handler only persists when `localValue !== notes` (skips if unchanged)
- [x] PASS: Saved indicator disappears after exactly 2000ms
- [x] PASS: Component cleans up both save timer and saved-indicator timer on unmount
#### Related Papers (related-papers.tsx)
- [x] PASS: "Find Related Papers" button: `rounded-xl border border-border-subtle bg-surface-raised/50 px-4 py-3 text-sm`
- [x] PASS: Loading: `Spinner` icon (18px) with `animate-spin` + "Finding related papers..." text
- [x] PASS: Error text: `text-red-400` center-aligned `text-xs`
- [x] PASS: Error message: "Could not find related papers"
- [x] PASS: RelatedPaperCards empty state: "No related papers found." (`text-xs text-ink-muted` centered)
