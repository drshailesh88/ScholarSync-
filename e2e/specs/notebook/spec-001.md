# notebook — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Sources Sidebar
#### Header
- [ ] **Back button** — arrow left navigates to `/dashboard`
- [ ] **Title** — "Notebook Sources" with paper count badge
- [ ] **Paper count badge** — displays `files.length` in a pill
#### Mode Toggle
- [ ] **Research / Learn toggle** — two-button segmented control with `role="tablist"`
- [ ] Research button shows Lightning icon + "Research"
- [ ] Learn button shows GraduationCap icon + "Learn"
- [ ] Active mode highlighted with brand background + white text
- [ ] Inactive mode shows muted text with hover state
#### Upload Area
- [ ] **Drop zone** — dashed border box: "Drag files here or click to upload"
- [ ] **Accepted formats label** — ".pdf, .txt, .md" shown below
- [ ] **Click to upload** — opens file picker (hidden `<input type="file">`)
- [ ] **Multiple file support** — `multiple` attribute on file input
#### File List
- [ ] **Scrollable** — `overflow-y-auto` fills remaining sidebar space
- [ ] Each file entry shows:
- [ ] Checkbox (select/deselect for RAG)
- [ ] File type icon (FileText for uploads, Globe for URLs)
- [ ] File name (truncated)
- [ ] File size / status label
- [ ] Remove button (X icon, visible on hover)
- [ ] **Hover state** — background highlight on file entry hover
#### URL Input
- [ ] **"Add Link / URL" button** — shows LinkSimple icon, toggles URL input
- [ ] **URL input field** — text input with placeholder "https://..."
- [ ] **Enter key** — submits URL
- [ ] **"Add" button** — submits URL
- [ ] **Auto-focuses** on open

### Source Upload & Ingestion
#### Upload Error Handling
- [ ] **Extract failure** — file entry shows "error" status
- [ ] **Zero chunks** — file shows "embed_failed" status
- [ ] **Embedding failure** — file shows "embed_failed" with retry button
- [ ] **File input reset** — input value cleared after upload completes
- [ ] **Per-file error isolation** — one file failure doesn't block others

### URL Ingestion
- [ ] **Trigger** — "Add Link / URL" button in sidebar footer
- [ ] File added immediately with "processing" status and URL as name
- [ ] `ingestUrl()` server action called
- [ ] On success: name updated to page title, size shows word count, status → `ready`
- [ ] On failure: size shows error message, status → `error`
