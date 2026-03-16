# latex — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Project List Page
- [x] PASS: **Page header** — "LaTeX Editor" title with subtitle "Write, preview, and compile LaTeX papers"
- [x] PASS: **"New Paper" button** — links to `/latex/new`
- [x] PASS: **Project cards** — each shows:
- [x] PASS: Project title (truncated if long)
- [x] PASS: Last updated date (formatted: "Mar 9, 2026")
- [x] PASS: Compiler type label (pdflatex/xelatex/lualatex)
- [x] PASS: Article icon with brand color
- [x] PASS: **Click project card** — navigates to `/latex/[projectId]`
- [x] PASS: **Delete button** — appears on hover (trash icon), removes project immediately (optimistic UI)
- [x] PASS: **Loading state** — spinner while fetching projects
- [x] PASS: **Empty state** — icon + "No papers yet" message + "Create Paper" button

### New Paper Page — Template & Compiler Selection
#### Title Input
- [x] PASS: **Title field** — text input, placeholder "Untitled Paper"
- [x] PASS: **Enter key** — triggers create action
- [x] PASS: Defaults to "Untitled Paper" if left empty
#### Template Selection (12 templates)
- [x] PASS: **Selected template** — highlighted with brand border and ring
- [x] PASS: Templates have category headers: "General" and "Medical & Clinical"
- [x] PASS: Each card shows icon (color-coded) + label + description
#### Compiler Selection
- [x] PASS: Selected compiler highlighted with brand color
#### Create Action
- [x] PASS: **"Create Paper" button** — creates project and redirects to editor
- [x] PASS: **Loading state** — spinner + disabled button during creation
- [x] PASS: **Error state** — red error box below button
- [x] PASS: **Back button** — arrow left navigates to `/latex`

### LaTeX Workspace — Layout & Panels
#### Panel Visibility
- [x] PASS: **File tree** — toggle with `Cmd+B` or left-edge tab button
- [x] PASS: **Agent panel** — toggle with `Cmd+J` or right-edge tab button
- [x] PASS: **Both panels** can be open simultaneously on desktop
- [x] PASS: Panels resize responsively based on viewport
#### Page Loading
- [x] PASS: **Loading state** — spinner + "Loading editor..."
- [x] PASS: **Retry logic** — 3 attempts with exponential backoff (300ms, 600ms, 900ms)
- [x] PASS: **Error state** — error card with "Retry" and "Back to Papers" buttons

### Top Bar
#### Left Section
- [x] PASS: **Project title** — click-to-rename inline editing
- [x] PASS: **Save status indicator**:
- [x] PASS: Saving — animated icon + "Saving..."
- [x] PASS: Saved — green check + "Saved" + timestamp
- [x] PASS: Unsaved — amber icon + "Unsaved"
- [x] PASS: Error — red icon + error state
