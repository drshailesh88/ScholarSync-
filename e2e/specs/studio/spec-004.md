# studio — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Research Tab
#### Research Sidebar
- [x] PASS: Results can be saved to library
- [x] PASS: Papers can be cited directly

### Integrity Panel (Checks Tab)
- [x] PASS: Tab labeled "Checks" in right panel
#### Idle State
- [x] PASS: Shield icon displayed
- [x] PASS: Title: "Integrity Check"
- [x] PASS: Description text explaining the feature
- [x] PASS: "Run Integrity Check" button (brand colored)
#### Running State
- [x] PASS: Spinning circle animation
- [x] PASS: Text: "Analyzing Document..."
- [x] PASS: Subtext: "Running AI detection, plagiarism scan, and citation verification."
#### Error State
- [x] PASS: Warning icon
- [x] PASS: Error message displayed
- [x] PASS: "Retry" button with ArrowClockwise icon
#### Results State
- [x] PASS: Header: "Integrity Report" with "Re-run" button
- [x] PASS: Circular gauge showing Human Score (0–100%)
#### Section 1: AI Detection
- [x] PASS: Robot icon (color by score: emerald ≥80%, amber ≥50%, red <50%)
- [x] PASS: Summary: `{humanScore}% human · {overallRisk} risk`
- [x] PASS: Expandable with chevron
- [x] PASS: Stats grid (2 columns):
- [x] PASS: Flagged Paragraphs (top 5):
- [x] PASS: Paragraph excerpt displayed
- [x] PASS: AI probability percentage shown
- [x] PASS: Flags listed as bullets
- [x] PASS: Suggestion shown if available
- [x] PASS: Available on free tier
#### Section 2: Plagiarism
- [x] PASS: MagnifyingGlass icon (emerald <15%, amber <30%, red ≥30%)
- [x] PASS: Summary: `X% similar · Y sources` or "Paid feature"
- [x] PASS: Expandable section
- [x] PASS: "Scanned Z scholarly sources" text
- [x] PASS: No matches: green success "No significant matches found"
- [x] PASS: Match cards (up to 5):
- [x] PASS: Similarity percentage (colored)
- [x] PASS: Severity badge: high / medium / low
- [x] PASS: Excerpt quote
- [x] PASS: Source title with year
