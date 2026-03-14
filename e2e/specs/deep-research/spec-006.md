# deep-research — Spec 006

STATUS: PARTIAL
TESTED: 35/35
PASS: 2
FAIL: 33
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Research Engine & Backends
#### Citation Graph Traversal
- [ ] FAIL: Backward references fetched via S2 API
- [ ] FAIL: Rate-limited with delays between requests
- [ ] FAIL: Converts S2 format to unified result format
#### Data Extraction
- [ ] FAIL: Uses `getSmallModel()` to extract structured data from abstracts:
- [ ] FAIL: Study design
- [ ] FAIL: Sample size
- [ ] FAIL: Effect sizes
- [ ] FAIL: P-values
- [ ] FAIL: Population characteristics
- [ ] FAIL: Follow-up duration
- [ ] FAIL: Key findings
- [ ] FAIL: Conservative extraction (no speculation on missing data)
#### Full-Text Extraction
- [ ] FAIL: Downloads open-access PDFs
- [ ] FAIL: Extracts Results and Discussion sections
- [ ] FAIL: Falls back to the pre-references full text when section headers are missing, but does not fall back to the abstract if PDF extraction fails
- [ ] FAIL: Max file size: 20 MB
- [ ] FAIL: Timeout: 15 seconds
#### Synthesis Pipeline
- [ ] FAIL: Pass 1: Per-perspective narrative sections (parallel execution)
- [ ] FAIL: Pass 2: Executive summary and introduction
- [ ] FAIL: Pass 3: Comparison tables, gaps, contradictions, conclusions
- [ ] FAIL: Pass 4: Self-critique and revision
- [x] PASS: Outputs markdown with interactive citation markers `[N]`

### Error Handling
#### Validation Errors
- [ ] FAIL: Topic < 5 characters: the plan route emits an SSE error and the page shows the error state with the validation message
- [ ] FAIL: Topic > 500 characters: the plan route emits an SSE error and the page shows the error state with the validation message
- [ ] FAIL: Empty topic: Start button disabled
#### Network Errors
- [ ] FAIL: Fetch failures caught and displayed
- [ ] FAIL: AbortError handled silently (expected from Stop button)
- [ ] FAIL: Non-AbortError shows error state with message
#### Error State UI
- [ ] FAIL: Red AlertCircle icon
- [ ] FAIL: Heading: "Research Failed"
- [ ] FAIL: Error message text displayed
- [x] PASS: "Try Again" button returns to `idle` state
#### API Errors
- [ ] FAIL: Plan generation failure shows error and allows retry
- [ ] FAIL: Execute failure shows error with context
- [ ] FAIL: Save failure shows error tooltip on button
