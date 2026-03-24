# systematic-review — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Snowballing Panel
#### Configuration
- [ ] **Depth 2** — citations of citations
#### Execution
- [ ] **Run snowballing** — triggers citation search
- [ ] **API call** — `POST /api/systematic-review/snowball`
- [ ] **Progress indicator** — shows progress during search
- [ ] **Results list** — newly discovered papers displayed
#### Session History
- [ ] **Session tracking** — previous snowballing runs saved
- [ ] **Session list** — past sessions viewable with date and results
- [ ] **Session details** — expand to see papers found in each session
#### Citation Network Visualization
- [ ] **Network graph** — visual network of citation relationships
- [ ] **Node interaction** — click nodes to view paper details
- [ ] **Edge display** — citation direction shown on edges
- [ ] **Included papers highlighted** — distinguish between included and new papers
#### API
- [ ] `POST /api/systematic-review/snowball` — initiates snowball search
- [ ] `GET /api/systematic-review/snowball` — retrieves snowball results

### Import/Export Panel
#### Import
- [ ] **Drag-and-drop** — files can be dragged onto import area
- [ ] **Click to upload** — file picker for selecting import files
- [ ] **File validation** — invalid files show error message
- [ ] **Parse preview** — shows count of papers found before confirming import
- [ ] **Duplicate handling** — detects and flags duplicates against existing papers
#### Export
- [ ] **Format selector** — dropdown or buttons to choose export format
- [ ] **Filter selector** — choose which papers to include in export
#### RevMan Export
- [ ] **RevMan export** — specialized export compatible with Cochrane RevMan software
- [ ] **RevMan format** — correct XML structure for RevMan import
#### API
- [ ] `POST /api/systematic-review/import-references` — imports reference files
- [ ] `GET /api/systematic-review/import-references` — retrieves imported references

### Protocol Panel
#### Protocol Generation
- [ ] **Generate from config** — auto-generates protocol from review configuration
- [ ] **API call** — `POST /api/systematic-review/protocol`
- [ ] **Generated sections** — protocol structured with standard sections
#### Section Editing
- [ ] **Editable sections** — each protocol section individually editable
- [ ] **Guidance text** — each section shows guidance on what to include
- [ ] **Rich text editing** — formatting supported within sections
#### Protocol Sections (Expected)
- [ ] **Title and registration** — review title and registration details
- [ ] **Background/rationale** — justification for the review
- [ ] **Objectives** — review question and aims
- [ ] **Methods** — search strategy, eligibility, screening, extraction, analysis
