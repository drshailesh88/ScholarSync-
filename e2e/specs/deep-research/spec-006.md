# deep-research — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Research Engine & Backends
#### Citation Graph Traversal
- [ ] Backward references fetched via S2 API
- [ ] Rate-limited with delays between requests
- [ ] Converts S2 format to unified result format
#### Data Extraction
- [ ] Uses `getSmallModel()` to extract structured data from abstracts:
- [ ] Study design
- [ ] Sample size
- [ ] Effect sizes
- [ ] P-values
- [ ] Population characteristics
- [ ] Follow-up duration
- [ ] Key findings
- [ ] Conservative extraction (no speculation on missing data)
#### Full-Text Extraction
- [ ] Downloads open-access PDFs
- [ ] Extracts Results and Discussion sections
- [ ] Falls back to the pre-references full text when section headers are missing, but does not fall back to the abstract if PDF extraction fails
- [ ] Max file size: 20 MB
- [ ] Timeout: 15 seconds
#### Synthesis Pipeline
- [ ] Pass 1: Per-perspective narrative sections (parallel execution)
- [ ] Pass 2: Executive summary and introduction
- [ ] Pass 3: Comparison tables, gaps, contradictions, conclusions
- [ ] Pass 4: Self-critique and revision
- [ ] Outputs markdown with interactive citation markers `[N]`

### Error Handling
#### Validation Errors
- [ ] Topic < 5 characters: the plan route emits an SSE error and the page shows the error state with the validation message
- [ ] Topic > 500 characters: the plan route emits an SSE error and the page shows the error state with the validation message
- [ ] Empty topic: Start button disabled
#### Network Errors
- [ ] Fetch failures caught and displayed
- [ ] AbortError handled silently (expected from Stop button)
- [ ] Non-AbortError shows error state with message
#### Error State UI
- [ ] Red AlertCircle icon
- [ ] Heading: "Research Failed"
- [ ] Error message text displayed
- [ ] "Try Again" button returns to `idle` state
#### API Errors
- [ ] Plan generation failure shows error and allows retry
- [ ] Execute failure shows error with context
- [ ] Save failure shows error tooltip on button
