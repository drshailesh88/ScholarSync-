# deep-research — Spec 011

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Citation Markers and Citations Panel
- [x] PASS: Open-access tooltip text is exactly `OA`.
- [x] PASS: `CitationTooltip` installs a `mousedown` outside-click listener and removes it in cleanup.
- [x] PASS: `ParsedCitationText` maps citation numbers to `sources[part.num - 1]`, so out-of-range citation numbers still render markers but have no source-backed tooltip data.
- [x] PASS: The citations-panel desktop header is exactly `Citations ({sources.length})`.
- [x] PASS: The citations-panel mobile header is exactly `Citations ({sources.length})`.
- [x] PASS: Citations-panel entries are buttons, not direct links.
- [x] PASS: Citations-panel entries show title, authors, journal/year, and an evidence label; they do not render DOI, PubMed, PDF, or OA links inline.
- [x] PASS: Citations-panel author text uses the first 2 authors plus `et al.` when there are more than 2 authors.
- [x] PASS: Mobile citations use a bottom sheet and close after a citation is clicked because the mobile handler calls both `onClickCitation(num)` and `onClose()`.
#### Export, Copy, and Open in Studio
- [x] PASS: `ExportButtons` initializes `copied = false`, `studioLoading = false`, `studioError = null`, `pdfLoading = false`, and `pdfError = null`.
- [x] PASS: Markdown export downloads `{topicSanitized}_report.md`.
- [x] PASS: Topic sanitization for all client-side downloads replaces non-alphanumeric characters with `_` and truncates the topic slug to 50 characters.
- [x] PASS: PDF export posts `POST /api/export/pdf` with `{ title: topic, content: markdownToSimpleHTML(markdownReport), citations }`.
- [x] PASS: The client only includes the `citations` field in the PDF request when `sources.length > 0`.
- [x] PASS: `markdownToSimpleHTML()` preserves block structure only; it skips horizontal rules, turns blockquotes into plain paragraphs, and flattens tables to pipe-separated text lines.
- [x] PASS: PDF export disables only the PDF button while `pdfLoading` is true.
- [x] PASS: PDF export success downloads `{topicSanitized}_report.pdf`.
- [x] PASS: PDF export failure sets `pdfError` and clears it after exactly 5000 ms.
- [x] PASS: The PDF button title is either the current `pdfError` string or `Download as PDF`.
- [x] PASS: The PDF button label becomes `...` during loading and `Failed` during error state.
- [x] PASS: Copy-to-clipboard prefers rich HTML plus plain text via `ClipboardItem` when available.
- [x] PASS: The first clipboard fallback is `navigator.clipboard.writeText(markdownReport)`.
- [x] PASS: The last clipboard fallback creates a `<textarea>`, selects it, and calls `document.execCommand("copy")`.
- [x] PASS: Copy success sets `copied = true` and clears it after exactly 2000 ms.
- [x] PASS: `markdownToRichHTML()` appends a generated `References` section from `sources`, even if the incoming markdown already contains one.
- [x] PASS: `Open in Studio` posts `{ topic, mode, markdownReport, sources, keyFindings, gaps }` to `POST /api/deep-research/open-in-studio`.
- [x] PASS: There is no `sessionStorage` handoff key or client-side payload cache in the current `Open in Studio` flow.
- [x] PASS: Successful `Open in Studio` expects `{ redirectUrl }` from the API and calls `router.push(redirectUrl)`.
- [x] PASS: Successful `Open in Studio` does not reset `studioLoading` because navigation is expected to replace the page.
- [x] PASS: Failed `Open in Studio` sets `studioError`, sets `studioLoading = false`, and clears `studioError` after exactly 5000 ms.
- [x] PASS: The Open in Studio button title is either the current `studioError` string or `Open in Studio editor`.
- [x] PASS: The Open in Studio button label becomes `Opening...` during loading and `Failed` during error state.
- [x] PASS: BibTeX and RIS buttons are completely hidden when `sources.length === 0`.
- [x] PASS: BibTeX export downloads `{topicSanitized}_references.bib`.
- [x] PASS: RIS export downloads `{topicSanitized}_references.ris`.
