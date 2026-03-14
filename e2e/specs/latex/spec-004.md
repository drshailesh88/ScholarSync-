# latex — Spec 004

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Compilation System
#### Retry Logic
- [x] PASS: **Service unavailable (502/503/504)** — retries with 2s delay, up to 2 times
- [x] PASS: **Network error** — retries up to 2 times with 2s delay

### Error Gutter Panel
- [x] PASS: **Error/warning count** — summary bar at top
- [x] PASS: **Scrollable list** — max-height 48 lines
- [x] PASS: **Each diagnostic shows**:
- [x] PASS: Line number
- [x] PASS: Error message
- [x] PASS: Severity (error = red, warning = amber)
- [x] PASS: **Click to jump** — clicking a diagnostic scrolls editor to that line
#### AI Error Intelligence
- [x] PASS: **Error categorization** — Syntax, Package, Math, Reference, Font, File, Other
- [x] PASS: **Human-readable explanations** — AI-enriched error descriptions
- [x] PASS: **Suggested fixes** — actionable fix suggestions
- [x] PASS: **"Fix this error" button** — calls `/api/latex/generate` with error context:

### File Tree Sidebar
#### Files Tab
- [x] PASS: **Hierarchical file browser** — folder nesting support
- [x] PASS: **File icons by type**:
- [x] PASS: **Main file indicator** — marks the main `.tex` file
- [x] PASS: **Create new file** — with file type selection
- [x] PASS: **Rename file** — inline rename
- [x] PASS: **Delete file** — with confirmation
- [x] PASS: **Click file** — loads content into editor
#### Document Outline
- [x] PASS: Extracts headings from LaTeX: `\section`, `\subsection`, `\subsubsection`
- [x] PASS: **Jump-to-line** — clicking a heading scrolls editor to that line
- [x] PASS: **"Draft this section" button** — opens Agent Panel Draft tab with section context
#### File Sync
- [x] PASS: Content changes in editor update the local file list
- [x] PASS: File content persists across tab switches

### Image Browser
- [x] PASS: **Upload** — accepts PNG, JPG, PDF files (10MB max)
- [x] PASS: **Drag-and-drop** — drop files to upload
- [x] PASS: **Image gallery** — thumbnail previews with file size
- [x] PASS: **Delete** — remove uploaded images
- [x] PASS: **One-click LaTeX insertion** — generates and inserts:

### Comment Panel
- [x] PASS: **Per-line threaded comments** — comments attached to specific line numbers
- [x] PASS: **Reply chains** — threaded replies on each comment
- [x] PASS: **Resolve/Unresolve** — toggle resolution status
- [x] PASS: **Author tracking** — shows who wrote each comment
- [x] PASS: **Jump-to-line** — clicking a comment scrolls editor to that line
