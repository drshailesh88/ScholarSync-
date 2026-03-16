# systematic-review — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Unified Risk of Bias Panel
#### QUADAS-2 (for Diagnostic Studies)
- [x] PASS: **Overall judgment** — aggregated across domains
#### Batch Assessment
- [x] PASS: **"Assess All" button** — triggers batch RoB assessment for all included papers
- [x] PASS: **Batch progress** — shows progress during batch operation
- [x] PASS: **Per-paper results** — each paper gets individual assessment
#### API Routes
- [x] PASS: `POST /api/systematic-review/rob2` — submits RoB 2 assessment
- [x] PASS: `GET /api/systematic-review/rob2` — retrieves RoB 2 results
- [x] PASS: `POST /api/systematic-review/robins-i` — submits ROBINS-I assessment
- [x] PASS: `GET /api/systematic-review/robins-i` — retrieves ROBINS-I results
- [x] PASS: `POST /api/systematic-review/quadas2` — submits QUADAS-2 assessment
- [x] PASS: `GET /api/systematic-review/quadas2` — retrieves QUADAS-2 results

### Data Extraction Panel
#### Schema Definition
- [x] PASS: **Custom schema builder** — UI to define extraction fields
- [x] PASS: **Field name** — text input for field name
- [x] PASS: **Field description** — text input for field description
- [x] PASS: **Field type** — dropdown with options:
- [x] PASS: **Add field** — new fields can be added to schema
- [x] PASS: **Remove field** — existing fields can be deleted
- [x] PASS: **Reorder fields** — fields can be reordered (if supported)
#### AI Extraction
- [x] PASS: **"Run Extraction" button** — Lightning icon, triggers AI data extraction
- [x] PASS: **API call** — `POST /api/systematic-review/extract` (single/batch/fulltext modes)
- [x] PASS: **Single mode** — extracts from one paper at a time
- [x] PASS: **Batch mode** — extracts from multiple papers
- [x] PASS: **Fulltext mode** — uses full-text PDF content for extraction
- [x] PASS: **Confidence badges** — each extracted value shows confidence score
- [x] PASS: **Confidence color coding** — high/medium/low confidence visually differentiated
#### Source Linking
- [x] PASS: **Page number references** — extracted data linked to source page numbers
- [x] PASS: **Source linking** — click to jump to relevant passage in paper
- [x] PASS: **Provenance tracking** — each extracted value traces back to source text
#### Manual Editing
- [x] PASS: **Editable cells** — extracted values can be manually edited
- [x] PASS: **Override AI values** — manual edits override AI-extracted data
- [x] PASS: **Save edits** — changes persisted
#### Matrix Table View
- [x] PASS: **Table layout** — papers as rows, extraction fields as columns
- [x] PASS: **Scrollable** — horizontal scroll for many fields
- [x] PASS: **Sortable** — columns sortable (if supported)
- [x] PASS: **All papers visible** — every included paper has a row
#### Export
- [x] PASS: **"Download CSV" button** — exports extraction data as CSV
