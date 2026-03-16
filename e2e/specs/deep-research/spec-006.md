# deep-research — Spec 006

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Research Engine & Backends
#### Citation Graph Traversal
- [x] PASS: Backward references fetched via S2 API
- [x] PASS: Rate-limited with delays between requests
- [x] PASS: Converts S2 format to unified result format
#### Data Extraction
- [x] PASS: Uses `getSmallModel()` to extract structured data from abstracts:
- [x] PASS: Study design
- [x] PASS: Sample size
- [x] PASS: Effect sizes
- [x] PASS: P-values
- [x] PASS: Population characteristics
- [x] PASS: Follow-up duration
- [x] PASS: Key findings
- [x] PASS: Conservative extraction (no speculation on missing data)
#### Full-Text Extraction
- [x] PASS: Downloads open-access PDFs
- [x] PASS: Extracts Results and Discussion sections
- [x] PASS: Falls back to the pre-references full text when section headers are missing, but does not fall back to the abstract if PDF extraction fails
- [x] PASS: Max file size: 20 MB
- [x] PASS: Timeout: 15 seconds
#### Synthesis Pipeline
- [x] PASS: Pass 1: Per-perspective narrative sections (parallel execution)
- [x] PASS: Pass 2: Executive summary and introduction
- [x] PASS: Pass 3: Comparison tables, gaps, contradictions, conclusions
- [x] PASS: Pass 4: Self-critique and revision
- [x] PASS: Outputs markdown with interactive citation markers `[N]`

### Error Handling
#### Validation Errors
- [x] PASS: Topic < 5 characters: the plan route emits an SSE error and the page shows the error state with the validation message
- [x] PASS: Topic > 500 characters: the plan route emits an SSE error and the page shows the error state with the validation message
- [x] PASS: Empty topic: Start button disabled
#### Network Errors
- [x] PASS: Fetch failures caught and displayed
- [x] PASS: AbortError handled silently (expected from Stop button)
- [x] PASS: Non-AbortError shows error state with message
#### Error State UI
- [x] PASS: Red AlertCircle icon
- [x] PASS: Heading: "Research Failed"
- [x] PASS: Error message text displayed
- [x] PASS: "Try Again" button returns to `idle` state
#### API Errors
- [x] PASS: Plan generation failure shows error and allows retry
- [x] PASS: Execute failure shows error with context
- [x] PASS: Save failure shows error tooltip on button
