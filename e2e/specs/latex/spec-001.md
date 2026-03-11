# latex — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Project List Page
- [ ] **Page header** — "LaTeX Editor" title with subtitle "Write, preview, and compile LaTeX papers"
- [ ] **"New Paper" button** — links to `/latex/new`
- [ ] **Project cards** — each shows:
- [ ] Project title (truncated if long)
- [ ] Last updated date (formatted: "Mar 9, 2026")
- [ ] Compiler type label (pdflatex/xelatex/lualatex)
- [ ] Article icon with brand color
- [ ] **Click project card** — navigates to `/latex/[projectId]`
- [ ] **Delete button** — appears on hover (trash icon), removes project immediately (optimistic UI)
- [ ] **Loading state** — spinner while fetching projects
- [ ] **Empty state** — icon + "No papers yet" message + "Create Paper" button

### New Paper Page — Template & Compiler Selection
#### Title Input
- [ ] **Title field** — text input, placeholder "Untitled Paper"
- [ ] **Enter key** — triggers create action
- [ ] Defaults to "Untitled Paper" if left empty
#### Template Selection (12 templates)
- [ ] **Selected template** — highlighted with brand border and ring
- [ ] Templates have category headers: "General" and "Medical & Clinical"
- [ ] Each card shows icon (color-coded) + label + description
#### Compiler Selection
- [ ] Selected compiler highlighted with brand color
#### Create Action
- [ ] **"Create Paper" button** — creates project and redirects to editor
- [ ] **Loading state** — spinner + disabled button during creation
- [ ] **Error state** — red error box below button
- [ ] **Back button** — arrow left navigates to `/latex`

### LaTeX Workspace — Layout & Panels
#### Panel Visibility
- [ ] **File tree** — toggle with `Cmd+B` or left-edge tab button
- [ ] **Agent panel** — toggle with `Cmd+J` or right-edge tab button
- [ ] **Both panels** can be open simultaneously on desktop
- [ ] Panels resize responsively based on viewport
#### Page Loading
- [ ] **Loading state** — spinner + "Loading editor..."
- [ ] **Retry logic** — 3 attempts with exponential backoff (300ms, 600ms, 900ms)
- [ ] **Error state** — error card with "Retry" and "Back to Papers" buttons

### Top Bar
#### Left Section
- [ ] **Project title** — click-to-rename inline editing
- [ ] **Save status indicator**:
- [ ] Saving — animated icon + "Saving..."
- [ ] Saved — green check + "Saved" + timestamp
- [ ] Unsaved — amber icon + "Unsaved"
- [ ] Error — red icon + error state
