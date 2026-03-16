# deep-research — Spec 005

STATUS: PARTIAL
TESTED: 35/35
PASS: 34
FAIL: 1
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Export System
#### Copy to Clipboard
- [x] PASS: Headings: font-size (24–14px), font-weight, margins
- [x] PASS: Paragraphs: line-height 1.6, color #333
- [x] PASS: Tables: border-collapse, cell padding, borders (#ccc)
- [x] PASS: Blockquotes: 3px left border (#ccc), italic
- [x] PASS: Superscript citations: 10px, color #2563eb
- [x] PASS: Shows "Copied" confirmation for 2 seconds
- [x] PASS: Fallback to plain text on older browsers
#### BibTeX Export (.bib)
- [x] PASS: Downloads as `{topic}_references.bib`
- [x] PASS: Citation key format: `{firstAuthorFirstSegment}{year}{firstTitleWord}` (lowercase), with fallback `ref{n}`
- [x] PASS: Fields: author, title, journal, year, doi, pmid, abstract
- [x] PASS: All sources included
#### RIS Export (.ris)
- [x] PASS: Downloads as `{topic}_references.ris`
- [x] PASS: Fields: TY, TI, AU (per author), JO, PY, DO, AN, AB, UR, ER
- [x] PASS: Compatible with Mendeley / EndNote
- [x] PASS: All sources included

### Save to Library
- [x] PASS: Button visible in `done` state header
- [x] PASS: States:
- [x] PASS: Calls `POST /api/deep-research/save`
- [x] PASS: Disabled if not logged in or research incomplete
- [x] PASS: Error tooltip appears on failure
- [x] PASS: Auto-disables after successful save
- [x] PASS: Saved session appears in Past Research on next visit

### Open in Studio
- [x] PASS: Export option: "Open in Studio"
- [x] PASS: Calls `POST /api/deep-research/open-in-studio`
- [x] PASS: Process:
- [ ] FAIL: Redirects to `/studio?projectId={projectId}`
- [x] PASS: Loading spinner during creation
- [x] PASS: Error state with retry capability

### Legacy Report View
- [x] PASS: Fallback for reports without markdown format
- [x] PASS: Renders card-based display with sections:

### Research Engine & Backends
#### Multi-Source Search
- [x] PASS: PubMed search returns results
- [x] PASS: Semantic Scholar search returns results
- [x] PASS: OpenAlex search returns results
- [x] PASS: Results deduplicated across sources
#### Citation Graph Traversal
- [x] PASS: Forward citations fetched via Semantic Scholar API
