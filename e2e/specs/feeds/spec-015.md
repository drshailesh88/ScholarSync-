# feeds — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Related Papers (related-papers.tsx)
- [x] PASS: Paper card container: `rounded-xl border border-border-subtle bg-surface-raised/60 p-3`
- [x] PASS: Paper title: `text-sm font-medium leading-snug text-ink`
- [x] PASS: Authors: first 3 joined by ", " + " et al." when more than 3
- [x] PASS: Authors fallback: "Unknown authors" when authors array is empty
- [x] PASS: Paper metadata line: authors + ` · {journal}` + ` · {year}` (each part conditional)
- [x] PASS: Paper abstract: `line-clamp-3 text-xs leading-relaxed text-ink-muted`; only shown when NOT `dense` AND `abstract` exists
- [x] PASS: DOI link: `inline-flex items-center gap-1 text-xs text-brand hover:underline` with ArrowSquareOut icon (12px)
- [x] PASS: PubMed link: same styling as DOI link, links to `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
- [x] PASS: Citation count: `{count} citations` in `text-xs text-ink-muted`; only shown when `citationCount > 0`
- [x] PASS: Save button "Saving..." state icon: `Spinner` with `animate-spin`
- [x] PASS: Save button "Saved" state icon: `Check` with `weight="bold"`
- [x] PASS: Save button "Retry Save" state icon: `BookmarkSimple` with `weight="fill"`
- [x] PASS: Save button idle state icon: `BookmarkSimple` with `weight="regular"`
- [x] PASS: Save POSTs to `/api/papers/save` with `{ paper }` body
- [x] PASS: `RelatedPapers` uses local component state (separate from store's copilot-related papers)
- [x] PASS: `RelatedPapers` prevents re-fetch after first load: `if (loading || loaded) return`
- [x] PASS: `getPaperKey()` fallback chain: `paper.doi || paper.pmid || paper.s2Id || "{title}-{year}-{index}"`
#### Copilot Panel (copilot-panel.tsx)
- [x] PASS: Copilot header icon container: `w-6 h-6 rounded-full bg-brand/20`
- [x] PASS: Copilot title: "AI Copilot" (`text-sm font-semibold text-ink`)
- [x] PASS: Close button: `p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised`
- [x] PASS: CompactHeader styling: `px-4 py-3 bg-surface-raised/50 rounded-xl border border-border-subtle`
- [x] PASS: CompactHeader title: `text-sm font-semibold text-ink line-clamp-2`
- [x] PASS: CompactHeader second line: authors + ` · {journal}` + ` · {year}` (year from `new Date(publishedAt).getFullYear()`)
- [x] PASS: CompactHeader authors fallback: empty string `""` when null
- [x] PASS: Quick actions layout: `flex gap-2` (NOT grid despite doc section calling it "3-column grid")
- [x] PASS: Summarize button full styling: `bg-brand/10 text-brand` with `Lightning` icon (`weight="fill"`)
- [x] PASS: Explain button full styling: `bg-surface-raised text-ink` with `ChatText` icon
- [x] PASS: Explain sends hardcoded question: "Explain this paper to me in simple terms — what was studied, what was found, and why it matters."
- [x] PASS: Related button full styling: `bg-surface-raised text-ink` with `Books` icon
- [x] PASS: Related button disabled condition: `copilotLoading || relatedPapersLoading` (stricter than Summarize/Explain)
- [x] PASS: Summarize and Explain disabled condition: only `copilotLoading`
- [x] PASS: Source badge full_paper: `bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400`
- [x] PASS: Source badge abstract_only: `bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400`
- [x] PASS: Source badge title_only: `bg-red-500/10 border-red-500/20 text-red-500`
- [x] PASS: Source badge icons: 📄 full_paper, 📋 abstract_only, ⚠️ title_only
