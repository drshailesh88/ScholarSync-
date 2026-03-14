# deep-research — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Citation Markers and Citations Panel
- [ ] Open-access tooltip text is exactly `OA`.
- [ ] `CitationTooltip` installs a `mousedown` outside-click listener and removes it in cleanup.
- [ ] `ParsedCitationText` maps citation numbers to `sources[part.num - 1]`, so out-of-range citation numbers still render markers but have no source-backed tooltip data.
- [ ] The citations-panel desktop header is exactly `Citations ({sources.length})`.
- [ ] The citations-panel mobile header is exactly `Citations ({sources.length})`.
- [ ] Citations-panel entries are buttons, not direct links.
- [ ] Citations-panel entries show title, authors, journal/year, and an evidence label; they do not render DOI, PubMed, PDF, or OA links inline.
- [ ] Citations-panel author text uses the first 2 authors plus `et al.` when there are more than 2 authors.
- [ ] Mobile citations use a bottom sheet and close after a citation is clicked because the mobile handler calls both `onClickCitation(num)` and `onClose()`.
#### Export, Copy, and Open in Studio
- [ ] `ExportButtons` initializes `copied = false`, `studioLoading = false`, `studioError = null`, `pdfLoading = false`, and `pdfError = null`.
- [ ] Markdown export downloads `{topicSanitized}_report.md`.
- [ ] Topic sanitization for all client-side downloads replaces non-alphanumeric characters with `_` and truncates the topic slug to 50 characters.
- [ ] PDF export posts `POST /api/export/pdf` with `{ title: topic, content: markdownToSimpleHTML(markdownReport), citations }`.
- [ ] The client only includes the `citations` field in the PDF request when `sources.length > 0`.
- [ ] `markdownToSimpleHTML()` preserves block structure only; it skips horizontal rules, turns blockquotes into plain paragraphs, and flattens tables to pipe-separated text lines.
- [ ] PDF export disables only the PDF button while `pdfLoading` is true.
- [ ] PDF export success downloads `{topicSanitized}_report.pdf`.
- [ ] PDF export failure sets `pdfError` and clears it after exactly 5000 ms.
- [ ] The PDF button title is either the current `pdfError` string or `Download as PDF`.
- [ ] The PDF button label becomes `...` during loading and `Failed` during error state.
- [ ] Copy-to-clipboard prefers rich HTML plus plain text via `ClipboardItem` when available.
- [ ] The first clipboard fallback is `navigator.clipboard.writeText(markdownReport)`.
- [ ] The last clipboard fallback creates a `<textarea>`, selects it, and calls `document.execCommand("copy")`.
- [ ] Copy success sets `copied = true` and clears it after exactly 2000 ms.
- [ ] `markdownToRichHTML()` appends a generated `References` section from `sources`, even if the incoming markdown already contains one.
- [ ] `Open in Studio` posts `{ topic, mode, markdownReport, sources, keyFindings, gaps }` to `POST /api/deep-research/open-in-studio`.
- [ ] There is no `sessionStorage` handoff key or client-side payload cache in the current `Open in Studio` flow.
- [ ] Successful `Open in Studio` expects `{ redirectUrl }` from the API and calls `router.push(redirectUrl)`.
- [ ] Successful `Open in Studio` does not reset `studioLoading` because navigation is expected to replace the page.
- [ ] Failed `Open in Studio` sets `studioError`, sets `studioLoading = false`, and clears `studioError` after exactly 5000 ms.
- [ ] The Open in Studio button title is either the current `studioError` string or `Open in Studio editor`.
- [ ] The Open in Studio button label becomes `Opening...` during loading and `Failed` during error state.
- [ ] BibTeX and RIS buttons are completely hidden when `sources.length === 0`.
- [ ] BibTeX export downloads `{topicSanitized}_references.bib`.
- [ ] RIS export downloads `{topicSanitized}_references.ris`.
