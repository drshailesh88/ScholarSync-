# systematic-review — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Snowballing Panel
#### Configuration
- [x] PASS: **Depth 2** — citations of citations
#### Execution
- [x] PASS: **Run snowballing** — triggers citation search
- [x] PASS: **API call** — `POST /api/systematic-review/snowball`
- [x] PASS: **Progress indicator** — shows progress during search
- [x] PASS: **Results list** — newly discovered papers displayed
#### Session History
- [x] PASS: **Session tracking** — previous snowballing runs saved
- [x] PASS: **Session list** — past sessions viewable with date and results
- [x] PASS: **Session details** — expand to see papers found in each session
#### Citation Network Visualization
- [x] PASS: **Network graph** — visual network of citation relationships
- [x] PASS: **Node interaction** — click nodes to view paper details
- [x] PASS: **Edge display** — citation direction shown on edges
- [x] PASS: **Included papers highlighted** — distinguish between included and new papers
#### API
- [x] PASS: `POST /api/systematic-review/snowball` — initiates snowball search
- [x] PASS: `GET /api/systematic-review/snowball` — retrieves snowball results

### Import/Export Panel
#### Import
- [x] PASS: **Drag-and-drop** — files can be dragged onto import area
- [x] PASS: **Click to upload** — file picker for selecting import files
- [x] PASS: **File validation** — invalid files show error message
- [x] PASS: **Parse preview** — shows count of papers found before confirming import
- [x] PASS: **Duplicate handling** — detects and flags duplicates against existing papers
#### Export
- [x] PASS: **Format selector** — dropdown or buttons to choose export format
- [x] PASS: **Filter selector** — choose which papers to include in export
#### RevMan Export
- [x] PASS: **RevMan export** — specialized export compatible with Cochrane RevMan software
- [x] PASS: **RevMan format** — correct XML structure for RevMan import
#### API
- [x] PASS: `POST /api/systematic-review/import-references` — imports reference files
- [x] PASS: `GET /api/systematic-review/import-references` — retrieves imported references

### Protocol Panel
#### Protocol Generation
- [x] PASS: **Generate from config** — auto-generates protocol from review configuration
- [x] PASS: **API call** — `POST /api/systematic-review/protocol`
- [x] PASS: **Generated sections** — protocol structured with standard sections
#### Section Editing
- [x] PASS: **Editable sections** — each protocol section individually editable
- [x] PASS: **Guidance text** — each section shows guidance on what to include
- [x] PASS: **Rich text editing** — formatting supported within sections
#### Protocol Sections (Expected)
- [x] PASS: **Title and registration** — review title and registration details
- [x] PASS: **Background/rationale** — justification for the review
- [x] PASS: **Objectives** — review question and aims
- [x] PASS: **Methods** — search strategy, eligibility, screening, extraction, analysis
