# notebook — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Sources Sidebar
#### Header
- [x] PASS: **Back button** — arrow left navigates to `/dashboard`
- [x] PASS: **Title** — "Notebook Sources" with paper count badge
- [x] PASS: **Paper count badge** — displays `files.length` in a pill
#### Mode Toggle
- [x] PASS: **Research / Learn toggle** — two-button segmented control with `role="tablist"`
- [x] PASS: Research button shows Lightning icon + "Research"
- [x] PASS: Learn button shows GraduationCap icon + "Learn"
- [x] PASS: Active mode highlighted with brand background + white text
- [x] PASS: Inactive mode shows muted text with hover state
#### Upload Area
- [x] PASS: **Drop zone** — dashed border box: "Drag files here or click to upload"
- [x] PASS: **Accepted formats label** — ".pdf, .txt, .md" shown below
- [x] PASS: **Click to upload** — opens file picker (hidden `<input type="file">`)
- [x] PASS: **Multiple file support** — `multiple` attribute on file input
#### File List
- [x] PASS: **Scrollable** — `overflow-y-auto` fills remaining sidebar space
- [x] PASS: Each file entry shows:
- [x] PASS: Checkbox (select/deselect for RAG)
- [x] PASS: File type icon (FileText for uploads, Globe for URLs)
- [x] PASS: File name (truncated)
- [x] PASS: File size / status label
- [x] PASS: Remove button (X icon, visible on hover)
- [x] PASS: **Hover state** — background highlight on file entry hover
#### URL Input
- [x] PASS: **"Add Link / URL" button** — shows LinkSimple icon, toggles URL input
- [x] PASS: **URL input field** — text input with placeholder "https://..."
- [x] PASS: **Enter key** — submits URL
- [x] PASS: **"Add" button** — submits URL
- [x] PASS: **Auto-focuses** on open

### Source Upload & Ingestion
#### Upload Error Handling
- [x] PASS: **Extract failure** — file entry shows "error" status
- [x] PASS: **Zero chunks** — file shows "embed_failed" status
- [x] PASS: **Embedding failure** — file shows "embed_failed" with retry button
- [x] PASS: **File input reset** — input value cleared after upload completes
- [x] PASS: **Per-file error isolation** — one file failure doesn't block others

### URL Ingestion
- [x] PASS: **Trigger** — "Add Link / URL" button in sidebar footer
- [x] PASS: File added immediately with "processing" status and URL as name
- [x] PASS: `ingestUrl()` server action called
- [x] PASS: On success: name updated to page title, size shows word count, status → `ready`
- [x] PASS: On failure: size shows error message, status → `error`
