# deep-research — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Done State, Error State, and Session Resume
- [x] PASS: The error-state retry button label is exactly `Try Again`.
- [x] PASS: `Try Again` resets only `pageState = "idle"` and `error = null`.
- [x] PASS: Loading a saved session sets `pageState = "running"` and `progressMessage = "Loading saved research..."`.
- [x] PASS: `handleLoadSession()` fetches `GET /api/deep-research/sessions/{id}`.
- [x] PASS: The synthetic loaded report always sets `summary = ""`, `perspectives = []`, `contradictions = []`, `keyFindings = data.keyFindings || []`, `gaps = data.gaps || []`, `totalSources = data.sources?.length || 0`, `sources = data.sources || []`, and `markdownReport = data.markdownReport`.
- [x] PASS: Loading a saved session also sets `topic = data.topic`, `mode = data.mode as ResearchMode`, and `pageState = "done"`.
- [x] PASS: A saved-session load failure always sets the exact error string `Failed to load saved research` and then shows the error state.
#### Research Document
- [x] PASS: `ResearchDocument` uses `react-markdown` with `remarkGfm`.
- [x] PASS: `extractTOC()` creates TOC items only from lines starting with `## ` or `### `.
- [x] PASS: Desktop TOC heading text is exactly `Contents`.
- [x] PASS: Desktop TOC is hidden below the `lg` breakpoint.
- [x] PASS: Mobile TOC is a left-side drawer with width `w-72`, not a bottom sheet.
- [x] PASS: Mobile TOC closes on backdrop click or the `X` button.
- [x] PASS: There is no `Escape` key handler for the TOC or citations overlays.
- [x] PASS: The floating mobile TOC button always renders, even when the markdown has no `##` or `###` headings.
- [x] PASS: The floating mobile citations button renders only when `sources.length > 0`.
- [x] PASS: The floating citations button title is exactly `Citations`.
- [x] PASS: The floating TOC button title is exactly `Table of Contents`.
- [x] PASS: `scrollToReference()` sets `highlightedCitation`, opens the citations panel if it was closed, and scrolls the matching `References` entry `ref-{N}` into view.
- [x] PASS: `handlePanelCitationClick()` sets `highlightedCitation` and scrolls the matching `References` entry `ref-{N}` into view.
- [x] PASS: Highlighted references keep their blue-tinted background until another citation is selected; there is no timeout that clears `highlightedCitation`.
- [x] PASS: Markdown links always render `target="_blank"` with `rel="noopener noreferrer"`.
- [x] PASS: Inline code renders only when the markdown `code` node has no `className`.
- [x] PASS: Code blocks render as bordered `<code>` blocks inside `<pre>` without syntax highlighting.
- [x] PASS: The appended references section title is exactly `References`.
- [x] PASS: Both the references list and citations panel cap rendering at the first 50 sources.
- [x] PASS: Reference author text uses the first 3 authors plus `et al.` when there are more than 3 authors.
- [x] PASS: Reference metadata shows citation counts only when `source.citationCount > 0`.
- [x] PASS: Reference metadata shows `OA` only when `source.isOpenAccess` is truthy.
- [x] PASS: Reference links render individual `DOI`, `PubMed`, and `PDF` anchors when those fields exist.
- [x] PASS: When the desktop citations panel is closed, the reopen icon button title is exactly `Open Citations Panel`.
#### Citation Markers and Citations Panel
- [x] PASS: Inline citation markers render as superscript `[N]` text with hover and click behavior.
- [x] PASS: `expandCitationNumbers()` supports single numbers, comma-separated numbers, semicolon-separated numbers, and numeric ranges split by hyphen, en dash, or em dash.
- [x] PASS: Tooltip position is clamped with `Math.min(position.top, window.innerHeight - 240)` and `Math.min(position.left, window.innerWidth - 340)`.
- [x] PASS: Tooltip link labels are exactly `DOI`, `PubMed`, and `PDF`.
