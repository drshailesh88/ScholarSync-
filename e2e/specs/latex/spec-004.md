# latex — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Compilation System
#### Retry Logic
- [ ] **Service unavailable (502/503/504)** — retries with 2s delay, up to 2 times
- [ ] **Network error** — retries up to 2 times with 2s delay

### Error Gutter Panel
- [ ] **Error/warning count** — summary bar at top
- [ ] **Scrollable list** — max-height 48 lines
- [ ] **Each diagnostic shows**:
- [ ] Line number
- [ ] Error message
- [ ] Severity (error = red, warning = amber)
- [ ] **Click to jump** — clicking a diagnostic scrolls editor to that line
#### AI Error Intelligence
- [ ] **Error categorization** — Syntax, Package, Math, Reference, Font, File, Other
- [ ] **Human-readable explanations** — AI-enriched error descriptions
- [ ] **Suggested fixes** — actionable fix suggestions
- [ ] **"Fix this error" button** — calls `/api/latex/generate` with error context:

### File Tree Sidebar
#### Files Tab
- [ ] **Hierarchical file browser** — folder nesting support
- [ ] **File icons by type**:
- [ ] **Main file indicator** — marks the main `.tex` file
- [ ] **Create new file** — with file type selection
- [ ] **Rename file** — inline rename
- [ ] **Delete file** — with confirmation
- [ ] **Click file** — loads content into editor
#### Document Outline
- [ ] Extracts headings from LaTeX: `\section`, `\subsection`, `\subsubsection`
- [ ] **Jump-to-line** — clicking a heading scrolls editor to that line
- [ ] **"Draft this section" button** — opens Agent Panel Draft tab with section context
#### File Sync
- [ ] Content changes in editor update the local file list
- [ ] File content persists across tab switches

### Image Browser
- [ ] **Upload** — accepts PNG, JPG, PDF files (10MB max)
- [ ] **Drag-and-drop** — drop files to upload
- [ ] **Image gallery** — thumbnail previews with file size
- [ ] **Delete** — remove uploaded images
- [ ] **One-click LaTeX insertion** — generates and inserts:

### Comment Panel
- [ ] **Per-line threaded comments** — comments attached to specific line numbers
- [ ] **Reply chains** — threaded replies on each comment
- [ ] **Resolve/Unresolve** — toggle resolution status
- [ ] **Author tracking** — shows who wrote each comment
- [ ] **Jump-to-line** — clicking a comment scrolls editor to that line
