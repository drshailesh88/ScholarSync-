# compliance — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] `Add Citation` copies a plain-text citation string composed from source title, optional year, and optional DOI
- [ ] `Add Citation` uses `navigator.clipboard.writeText(...)` with no visible failure handling
- [ ] `Add Citation` feedback switches to `Copied!` for 2 seconds, then resets
- [ ] Paraphrase requests post `text`, `sourceTitle`, and optional `sourceDoi` to `/api/integrity-check/paraphrase`
- [ ] While paraphrasing is in flight, the button shows a spinner plus `Paraphrasing...`
- [ ] Successful paraphrase output renders `Paraphrased:` plus a `Citation:` helper line
- [ ] Paraphrase failures fail silently and leave no inline error
- [ ] Citation Audit section is omitted entirely when `result.citationAudit` is missing
- [ ] Citation Audit issue list is truncated to the first 8 issues
- [ ] Citation Audit issue cards show `Ref: ...` only when `issue.reference` exists
- [ ] Self-Plagiarism section renders only when `matchedDocuments.length > 0`
- [ ] Self-Plagiarism score color changes to amber only when `selfSimilarityScore > 30`
- [ ] Self-Plagiarism excerpt cards show locale-formatted `checkedAt` date text
- [ ] `Run External Scan` resets `copyleaksResult` and `copyleaksScanId` before starting a new request
- [ ] External source scan posts `{ action: "scan", text: inputText }` to `/api/copyleaks`
- [ ] A `503` Copyleaks response sets `copyleaksAvailable = false` and shows the configuration message
- [ ] Non-503 non-OK Copyleaks scan failures fail silently and return the section to its idle button state
- [ ] After a scan starts successfully, the page stores `scanId` and marks Copyleaks as available
- [ ] Copyleaks polling starts immediately after `scanId` is set and repeats every 5 seconds
- [ ] Copyleaks polling stops automatically when status becomes `completed` or `error`
- [ ] Copyleaks polling errors are swallowed and do not surface to the UI
- [ ] Completed Copyleaks results render score text, a color-coded progress bar, and source cards
- [ ] Copyleaks completed state with zero sources shows `No matching sources found.`
- [ ] Copyleaks source title links open in a new tab and are truncated to roughly 70% width of the row
- [ ] Copyleaks `error` status does not show a dedicated error message; the section falls back to the idle button on the next render branch
- [ ] Writing Quality metric cards always render Passive Voice, Avg Words/Sentence, and Grade blocks
- [ ] Readability and average-sentence-length values are formatted with `toFixed(1)`
- [ ] Writing suggestions section is hidden when `result.writingQuality.suggestions.length === 0`
- [ ] Download Report posts the current `result`, `inputText`, and optional `documentTitle` to `/api/integrity-check/report`
- [ ] Downloaded filename format is `integrity-report-YYYY-MM-DD.md`
- [ ] Download failures fail silently with no toast or inline error
- [ ] Switching to the History tab triggers a fresh fetch from `/api/integrity-check/history?limit=20`
- [ ] History tab shows a centered spinner while `historyLoading` is true
- [ ] History empty state reads `No integrity checks found. Run your first check to see history here.`
- [ ] History sparkline is rendered only when at least 2 history entries exist
