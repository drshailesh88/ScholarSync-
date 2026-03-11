# deep-research — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Done State, Error State, and Session Resume
- [ ] The error-state retry button label is exactly `Try Again`.
- [ ] `Try Again` resets only `pageState = "idle"` and `error = null`.
- [ ] Loading a saved session sets `pageState = "running"` and `progressMessage = "Loading saved research..."`.
- [ ] `handleLoadSession()` fetches `GET /api/deep-research/sessions/{id}`.
- [ ] The synthetic loaded report always sets `summary = ""`, `perspectives = []`, `contradictions = []`, `keyFindings = data.keyFindings || []`, `gaps = data.gaps || []`, `totalSources = data.sources?.length || 0`, `sources = data.sources || []`, and `markdownReport = data.markdownReport`.
- [ ] Loading a saved session also sets `topic = data.topic`, `mode = data.mode as ResearchMode`, and `pageState = "done"`.
- [ ] A saved-session load failure always sets the exact error string `Failed to load saved research` and then shows the error state.
#### Research Document
- [ ] `ResearchDocument` uses `react-markdown` with `remarkGfm`.
- [ ] `extractTOC()` creates TOC items only from lines starting with `## ` or `### `.
- [ ] Desktop TOC heading text is exactly `Contents`.
- [ ] Desktop TOC is hidden below the `lg` breakpoint.
- [ ] Mobile TOC is a left-side drawer with width `w-72`, not a bottom sheet.
- [ ] Mobile TOC closes on backdrop click or the `X` button.
- [ ] There is no `Escape` key handler for the TOC or citations overlays.
- [ ] The floating mobile TOC button always renders, even when the markdown has no `##` or `###` headings.
- [ ] The floating mobile citations button renders only when `sources.length > 0`.
- [ ] The floating citations button title is exactly `Citations`.
- [ ] The floating TOC button title is exactly `Table of Contents`.
- [ ] `scrollToReference()` sets `highlightedCitation`, opens the citations panel if it was closed, and scrolls the matching `References` entry `ref-{N}` into view.
- [ ] `handlePanelCitationClick()` sets `highlightedCitation` and scrolls the matching `References` entry `ref-{N}` into view.
- [ ] Highlighted references keep their blue-tinted background until another citation is selected; there is no timeout that clears `highlightedCitation`.
- [ ] Markdown links always render `target="_blank"` with `rel="noopener noreferrer"`.
- [ ] Inline code renders only when the markdown `code` node has no `className`.
- [ ] Code blocks render as bordered `<code>` blocks inside `<pre>` without syntax highlighting.
- [ ] The appended references section title is exactly `References`.
- [ ] Both the references list and citations panel cap rendering at the first 50 sources.
- [ ] Reference author text uses the first 3 authors plus `et al.` when there are more than 3 authors.
- [ ] Reference metadata shows citation counts only when `source.citationCount > 0`.
- [ ] Reference metadata shows `OA` only when `source.isOpenAccess` is truthy.
- [ ] Reference links render individual `DOI`, `PubMed`, and `PDF` anchors when those fields exist.
- [ ] When the desktop citations panel is closed, the reopen icon button title is exactly `Open Citations Panel`.
#### Citation Markers and Citations Panel
- [ ] Inline citation markers render as superscript `[N]` text with hover and click behavior.
- [ ] `expandCitationNumbers()` supports single numbers, comma-separated numbers, semicolon-separated numbers, and numeric ranges split by hyphen, en dash, or em dash.
- [ ] Tooltip position is clamped with `Math.min(position.top, window.innerHeight - 240)` and `Math.min(position.left, window.innerWidth - 340)`.
- [ ] Tooltip link labels are exactly `DOI`, `PubMed`, and `PDF`.
