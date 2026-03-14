# compliance — Spec 004

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Report Panel — External Source Matching (Copyleaks)
#### Completed Results
- [ ] **Source list** — each source shows:
#### Polling Behavior
- [ ] After scan submission, polls `/api/copyleaks` with `action: "results"` every 5 seconds
- [ ] Polling stops on status `"completed"` or `"error"`
- [ ] Polling interval cleaned up on unmount
- [ ] 503 response marks Copyleaks as unavailable

### Report Panel — Writing Quality
- [ ] **Section title** — "Writing Quality", separated by top border
#### Suggestions
- [ ] Listed below stats when present
- [ ] Each suggestion in `text-xs text-ink-muted` with left brand-colored border (`border-l-2 border-brand/30`)
- [ ] Preceded by "Suggestions" label in `text-xs font-medium text-ink-muted`

### Humanize Text
- [ ] **Trigger** — "Humanize Text" button on paragraphs with `<40%` human probability
- [ ] **Loading state** — CircleNotch spinner (10px) + "Humanizing..."
- [ ] **Completed state** — button text changes to checkmark + "Humanized"
- [ ] **API** — `POST /api/integrity-check/humanize` with paragraph text (10-5000 chars)
- [ ] **Inline result** — displayed below paragraph in results view:
- [ ] Results stored per paragraph index in `humanizeResults` state

### Paraphrase & Add Citation
#### Add Citation
- [ ] **Button** — BookOpen icon (12px) + "Add Citation"
- [ ] Styled `text-brand bg-brand/10 hover:bg-brand/20`
- [ ] Copies formatted string: `"{Title} ({Year}). DOI: {doi}"` to clipboard
- [ ] **Feedback** — icon changes to Check (12px), text changes to "Copied!" for 2 seconds
#### Paraphrase
- [ ] **Button** — PenNib icon (12px) + "Paraphrase"
- [ ] Styled `text-ink-muted bg-surface-raised`
- [ ] **Loading state** — CircleNotch spinner (12px) + "Paraphrasing..."
- [ ] **API** — `POST /api/integrity-check/paraphrase` with text, `sourceTitle` (required), optional `sourceDoi`
- [ ] **Inline result** — displayed below the match:
- [ ] Results stored per match index in `paraphraseResults` state

### Download Report
- [ ] **Button** — DownloadSimple icon (16px) + "Download Report" (visible in results view header)
- [ ] **API** — `POST /api/integrity-check/report`
- [ ] **Payload** — sends `result`, `text`, and `documentTitle`
- [ ] **Response** — Markdown file, content-type `text/markdown`
- [ ] **Filename** — `integrity-report-YYYY-MM-DD.md`
- [ ] **Download mechanism** — creates Blob URL, creates ephemeral `<a>` element, triggers click, revokes URL
#### Report Contents
- [ ] Header with document title, date, word count, tier
- [ ] Overall Scores table (human score, AI risk, plagiarism similarity, citations verified, readability grade)
- [ ] AI Detection section with per-paragraph breakdown table
- [ ] Plagiarism Detection section with matched sources table (if paid)
