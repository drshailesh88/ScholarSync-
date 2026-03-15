# systematic-review — Spec 006

STATUS: PARTIAL
TESTED: 35/35
PASS: 10
FAIL: 25
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Unified Risk of Bias Panel
#### QUADAS-2 (for Diagnostic Studies)
- [ ] FAIL: **Overall judgment** — aggregated across domains
#### Batch Assessment
- [ ] FAIL: **"Assess All" button** — triggers batch RoB assessment for all included papers
- [ ] FAIL: **Batch progress** — shows progress during batch operation
- [ ] FAIL: **Per-paper results** — each paper gets individual assessment
#### API Routes
- [x] PASS: `POST /api/systematic-review/rob2` — submits RoB 2 assessment
- [x] PASS: `GET /api/systematic-review/rob2` — retrieves RoB 2 results
- [x] PASS: `POST /api/systematic-review/robins-i` — submits ROBINS-I assessment
- [x] PASS: `GET /api/systematic-review/robins-i` — retrieves ROBINS-I results
- [x] PASS: `POST /api/systematic-review/quadas2` — submits QUADAS-2 assessment
- [ ] FAIL: `GET /api/systematic-review/quadas2` — retrieves QUADAS-2 results

### Data Extraction Panel
#### Schema Definition
- [ ] FAIL: **Custom schema builder** — UI to define extraction fields
- [ ] FAIL: **Field name** — text input for field name
- [ ] FAIL: **Field description** — text input for field description
- [ ] FAIL: **Field type** — dropdown with options:
- [ ] FAIL: **Add field** — new fields can be added to schema
- [ ] FAIL: **Remove field** — existing fields can be deleted
- [ ] FAIL: **Reorder fields** — fields can be reordered (if supported)
#### AI Extraction
- [x] PASS: **"Run Extraction" button** — Lightning icon, triggers AI data extraction
- [x] PASS: **API call** — `POST /api/systematic-review/extract` (single/batch/fulltext modes)
- [ ] FAIL: **Single mode** — extracts from one paper at a time
- [ ] FAIL: **Batch mode** — extracts from multiple papers
- [ ] FAIL: **Fulltext mode** — uses full-text PDF content for extraction
- [ ] FAIL: **Confidence badges** — each extracted value shows confidence score
- [ ] FAIL: **Confidence color coding** — high/medium/low confidence visually differentiated
#### Source Linking
- [x] PASS: **Page number references** — extracted data linked to source page numbers
- [ ] FAIL: **Source linking** — click to jump to relevant passage in paper
- [ ] FAIL: **Provenance tracking** — each extracted value traces back to source text
#### Manual Editing
- [ ] FAIL: **Editable cells** — extracted values can be manually edited
- [x] PASS: **Override AI values** — manual edits override AI-extracted data
- [ ] FAIL: **Save edits** — changes persisted
#### Matrix Table View
- [ ] FAIL: **Table layout** — papers as rows, extraction fields as columns
- [ ] FAIL: **Scrollable** — horizontal scroll for many fields
- [ ] FAIL: **Sortable** — columns sortable (if supported)
- [ ] FAIL: **All papers visible** — every included paper has a row
#### Export
- [x] PASS: **"Download CSV" button** — exports extraction data as CSV
