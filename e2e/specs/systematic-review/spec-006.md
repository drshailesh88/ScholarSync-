# systematic-review — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Unified Risk of Bias Panel
#### QUADAS-2 (for Diagnostic Studies)
- [ ] **Overall judgment** — aggregated across domains
#### Batch Assessment
- [ ] **"Assess All" button** — triggers batch RoB assessment for all included papers
- [ ] **Batch progress** — shows progress during batch operation
- [ ] **Per-paper results** — each paper gets individual assessment
#### API Routes
- [ ] `POST /api/systematic-review/rob2` — submits RoB 2 assessment
- [ ] `GET /api/systematic-review/rob2` — retrieves RoB 2 results
- [ ] `POST /api/systematic-review/robins-i` — submits ROBINS-I assessment
- [ ] `GET /api/systematic-review/robins-i` — retrieves ROBINS-I results
- [ ] `POST /api/systematic-review/quadas2` — submits QUADAS-2 assessment
- [ ] `GET /api/systematic-review/quadas2` — retrieves QUADAS-2 results

### Data Extraction Panel
#### Schema Definition
- [ ] **Custom schema builder** — UI to define extraction fields
- [ ] **Field name** — text input for field name
- [ ] **Field description** — text input for field description
- [ ] **Field type** — dropdown with options:
- [ ] **Add field** — new fields can be added to schema
- [ ] **Remove field** — existing fields can be deleted
- [ ] **Reorder fields** — fields can be reordered (if supported)
#### AI Extraction
- [ ] **"Run Extraction" button** — Lightning icon, triggers AI data extraction
- [ ] **API call** — `POST /api/systematic-review/extract` (single/batch/fulltext modes)
- [ ] **Single mode** — extracts from one paper at a time
- [ ] **Batch mode** — extracts from multiple papers
- [ ] **Fulltext mode** — uses full-text PDF content for extraction
- [ ] **Confidence badges** — each extracted value shows confidence score
- [ ] **Confidence color coding** — high/medium/low confidence visually differentiated
#### Source Linking
- [ ] **Page number references** — extracted data linked to source page numbers
- [ ] **Source linking** — click to jump to relevant passage in paper
- [ ] **Provenance tracking** — each extracted value traces back to source text
#### Manual Editing
- [ ] **Editable cells** — extracted values can be manually edited
- [ ] **Override AI values** — manual edits override AI-extracted data
- [ ] **Save edits** — changes persisted
#### Matrix Table View
- [ ] **Table layout** — papers as rows, extraction fields as columns
- [ ] **Scrollable** — horizontal scroll for many fields
- [ ] **Sortable** — columns sortable (if supported)
- [ ] **All papers visible** — every included paper has a row
#### Export
- [ ] **"Download CSV" button** — exports extraction data as CSV
