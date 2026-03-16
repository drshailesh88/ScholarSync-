# compliance — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: `Add Citation` copies a plain-text citation string composed from source title, optional year, and optional DOI
- [x] PASS: `Add Citation` uses `navigator.clipboard.writeText(...)` with no visible failure handling
- [x] PASS: `Add Citation` feedback switches to `Copied!` for 2 seconds, then resets
- [x] PASS: Paraphrase requests post `text`, `sourceTitle`, and optional `sourceDoi` to `/api/integrity-check/paraphrase`
- [x] PASS: While paraphrasing is in flight, the button shows a spinner plus `Paraphrasing...`
- [x] PASS: Successful paraphrase output renders `Paraphrased:` plus a `Citation:` helper line
- [x] PASS: Paraphrase failures fail silently and leave no inline error
- [x] PASS: Citation Audit section is omitted entirely when `result.citationAudit` is missing
- [x] PASS: Citation Audit issue list is truncated to the first 8 issues
- [x] PASS: Citation Audit issue cards show `Ref: ...` only when `issue.reference` exists
- [x] PASS: Self-Plagiarism section renders only when `matchedDocuments.length > 0`
- [x] PASS: Self-Plagiarism score color changes to amber only when `selfSimilarityScore > 30`
- [x] PASS: Self-Plagiarism excerpt cards show locale-formatted `checkedAt` date text
- [x] PASS: `Run External Scan` resets `copyleaksResult` and `copyleaksScanId` before starting a new request
- [x] PASS: External source scan posts `{ action: "scan", text: inputText }` to `/api/copyleaks`
- [x] PASS: A `503` Copyleaks response sets `copyleaksAvailable = false` and shows the configuration message
- [x] PASS: Non-503 non-OK Copyleaks scan failures fail silently and return the section to its idle button state
- [x] PASS: After a scan starts successfully, the page stores `scanId` and marks Copyleaks as available
- [x] PASS: Copyleaks polling starts immediately after `scanId` is set and repeats every 5 seconds
- [x] PASS: Copyleaks polling stops automatically when status becomes `completed` or `error`
- [x] PASS: Copyleaks polling errors are swallowed and do not surface to the UI
- [x] PASS: Completed Copyleaks results render score text, a color-coded progress bar, and source cards
- [x] PASS: Copyleaks completed state with zero sources shows `No matching sources found.`
- [x] PASS: Copyleaks source title links open in a new tab and are truncated to roughly 70% width of the row
- [x] PASS: Copyleaks `error` status does not show a dedicated error message; the section falls back to the idle button on the next render branch
- [x] PASS: Writing Quality metric cards always render Passive Voice, Avg Words/Sentence, and Grade blocks
- [x] PASS: Readability and average-sentence-length values are formatted with `toFixed(1)`
- [x] PASS: Writing suggestions section is hidden when `result.writingQuality.suggestions.length === 0`
- [x] PASS: Download Report posts the current `result`, `inputText`, and optional `documentTitle` to `/api/integrity-check/report`
- [x] PASS: Downloaded filename format is `integrity-report-YYYY-MM-DD.md`
- [x] PASS: Download failures fail silently with no toast or inline error
- [x] PASS: Switching to the History tab triggers a fresh fetch from `/api/integrity-check/history?limit=20`
- [x] PASS: History tab shows a centered spinner while `historyLoading` is true
- [x] PASS: History empty state reads `No integrity checks found. Run your first check to see history here.`
- [x] PASS: History sparkline is rendered only when at least 2 history entries exist
