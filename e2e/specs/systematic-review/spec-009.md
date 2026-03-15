# systematic-review — Spec 009

STATUS: PARTIAL
TESTED: 35/35
PASS: 14
FAIL: 21
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Snowballing Panel
#### Configuration
- [x] PASS: **Depth 2** — citations of citations
#### Execution
- [ ] FAIL: **Run snowballing** — triggers citation search
- [ ] FAIL: **API call** — `POST /api/systematic-review/snowball`
- [x] PASS: **Progress indicator** — shows progress during search
- [x] PASS: **Results list** — newly discovered papers displayed
#### Session History
- [ ] FAIL: **Session tracking** — previous snowballing runs saved
- [x] PASS: **Session list** — past sessions viewable with date and results
- [x] PASS: **Session details** — expand to see papers found in each session
#### Citation Network Visualization
- [x] PASS: **Network graph** — visual network of citation relationships
- [x] PASS: **Node interaction** — click nodes to view paper details
- [x] PASS: **Edge display** — citation direction shown on edges
- [x] PASS: **Included papers highlighted** — distinguish between included and new papers
#### API
- [ ] FAIL: `POST /api/systematic-review/snowball` — initiates snowball search
- [ ] FAIL: `GET /api/systematic-review/snowball` — retrieves snowball results

### Import/Export Panel
#### Import
- [ ] FAIL: **Drag-and-drop** — files can be dragged onto import area
- [ ] FAIL: **Click to upload** — file picker for selecting import files
- [x] PASS: **File validation** — invalid files show error message
- [ ] FAIL: **Parse preview** — shows count of papers found before confirming import
- [x] PASS: **Duplicate handling** — detects and flags duplicates against existing papers
#### Export
- [ ] FAIL: **Format selector** — dropdown or buttons to choose export format
- [ ] FAIL: **Filter selector** — choose which papers to include in export
#### RevMan Export
- [ ] FAIL: **RevMan export** — specialized export compatible with Cochrane RevMan software
- [ ] FAIL: **RevMan format** — correct XML structure for RevMan import
#### API
- [x] PASS: `POST /api/systematic-review/import-references` — imports reference files
- [ ] FAIL: `GET /api/systematic-review/import-references` — retrieves imported references

### Protocol Panel
#### Protocol Generation
- [ ] FAIL: **Generate from config** — auto-generates protocol from review configuration
- [ ] FAIL: **API call** — `POST /api/systematic-review/protocol`
- [ ] FAIL: **Generated sections** — protocol structured with standard sections
#### Section Editing
- [ ] FAIL: **Editable sections** — each protocol section individually editable
- [x] PASS: **Guidance text** — each section shows guidance on what to include
- [x] PASS: **Rich text editing** — formatting supported within sections
#### Protocol Sections (Expected)
- [ ] FAIL: **Title and registration** — review title and registration details
- [ ] FAIL: **Background/rationale** — justification for the review
- [ ] FAIL: **Objectives** — review question and aims
- [ ] FAIL: **Methods** — search strategy, eligibility, screening, extraction, analysis
