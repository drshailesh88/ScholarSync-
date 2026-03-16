# compliance — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Report Panel — External Source Matching (Copyleaks)
#### Completed Results
- [x] PASS: **Source list** — each source shows:
#### Polling Behavior
- [x] PASS: After scan submission, polls `/api/copyleaks` with `action: "results"` every 5 seconds
- [x] PASS: Polling stops on status `"completed"` or `"error"`
- [x] PASS: Polling interval cleaned up on unmount
- [x] PASS: 503 response marks Copyleaks as unavailable

### Report Panel — Writing Quality
- [x] PASS: **Section title** — "Writing Quality", separated by top border
#### Suggestions
- [x] PASS: Listed below stats when present
- [x] PASS: Each suggestion in `text-xs text-ink-muted` with left brand-colored border (`border-l-2 border-brand/30`)
- [x] PASS: Preceded by "Suggestions" label in `text-xs font-medium text-ink-muted`

### Humanize Text
- [x] PASS: **Trigger** — "Humanize Text" button on paragraphs with `<40%` human probability
- [x] PASS: **Loading state** — CircleNotch spinner (10px) + "Humanizing..."
- [x] PASS: **Completed state** — button text changes to checkmark + "Humanized"
- [x] PASS: **API** — `POST /api/integrity-check/humanize` with paragraph text (10-5000 chars)
- [x] PASS: **Inline result** — displayed below paragraph in results view:
- [x] PASS: Results stored per paragraph index in `humanizeResults` state

### Paraphrase & Add Citation
#### Add Citation
- [x] PASS: **Button** — BookOpen icon (12px) + "Add Citation"
- [x] PASS: Styled `text-brand bg-brand/10 hover:bg-brand/20`
- [x] PASS: Copies formatted string: `"{Title} ({Year}). DOI: {doi}"` to clipboard
- [x] PASS: **Feedback** — icon changes to Check (12px), text changes to "Copied!" for 2 seconds
#### Paraphrase
- [x] PASS: **Button** — PenNib icon (12px) + "Paraphrase"
- [x] PASS: Styled `text-ink-muted bg-surface-raised`
- [x] PASS: **Loading state** — CircleNotch spinner (12px) + "Paraphrasing..."
- [x] PASS: **API** — `POST /api/integrity-check/paraphrase` with text, `sourceTitle` (required), optional `sourceDoi`
- [x] PASS: **Inline result** — displayed below the match:
- [x] PASS: Results stored per match index in `paraphraseResults` state

### Download Report
- [x] PASS: **Button** — DownloadSimple icon (16px) + "Download Report" (visible in results view header)
- [x] PASS: **API** — `POST /api/integrity-check/report`
- [x] PASS: **Payload** — sends `result`, `text`, and `documentTitle`
- [x] PASS: **Response** — Markdown file, content-type `text/markdown`
- [x] PASS: **Filename** — `integrity-report-YYYY-MM-DD.md`
- [x] PASS: **Download mechanism** — creates Blob URL, creates ephemeral `<a>` element, triggers click, revokes URL
#### Report Contents
- [x] PASS: Header with document title, date, word count, tier
- [x] PASS: Overall Scores table (human score, AI risk, plagiarism similarity, citations verified, readability grade)
- [x] PASS: AI Detection section with per-paragraph breakdown table
- [x] PASS: Plagiarism Detection section with matched sources table (if paid)
