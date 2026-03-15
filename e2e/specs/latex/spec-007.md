# latex — Spec 007

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Export
#### Download as .zip
- [x] PASS: Uses JSZip library (dynamically imported)
- [x] PASS: Filename: `{projectTitle}.zip` (sanitized)
- [x] PASS: Preserves file paths from project structure

### Save System
#### Auto-save
- [x] PASS: **Debounced** — saves 1500ms after last keystroke
- [x] PASS: **Per-file tracking** — saves the currently active file
- [x] PASS: File tree stays in sync with editor content
- [x] PASS: Save state managed in Zustand store
#### Manual Save
- [x] PASS: **Cmd+S** — saves immediately from store-backed content (without explicitly clearing any pending autosave timer)
- [x] PASS: Calls `updateLatexFile()` server action
#### Pre-compile Save
- [x] PASS: Current file is auto-saved before compilation starts

### Mobile & Responsive Design
#### Mobile (< 768px)
- [x] PASS: **Editor/Preview toggle** — bottom bar switches between Editor and Preview views
- [x] PASS: **File tree** — opens as full-screen overlay (fixed inset-0)
- [x] PASS: Close button in header
- [x] PASS: Auto-closes after file selection or jump-to-line
- [x] PASS: **Agent panel** — opens as full-screen overlay
- [x] PASS: Close button in header
- [x] PASS: Header shows "AI Assistant" label
- [x] PASS: **Floating buttons** — folder icon (left) and chat icon (right) to open panels
- [x] PASS: **Touch targets** — minimum 44px touch target size on all buttons
- [x] PASS: **Preview close** — X button to go back to editor
#### Tablet (768px - 1024px)
- [x] PASS: **Agent panel** — narrower width (256px instead of 288px)
- [x] PASS: **Agent panel toggle** — hidden on tablet (use floating button instead)
- [x] PASS: **File tree** — normal sidebar behavior
#### Desktop (> 1024px)
- [x] PASS: **Side-by-side layout** — editor and preview visible simultaneously
- [x] PASS: **File tree toggle tab** — left-edge button
- [x] PASS: **Agent panel toggle tab** — right-edge button
- [x] PASS: **Full panel widths** — file tree 224px, agent panel 288px

### Error Handling & Edge Cases
#### Project Loading
- [x] PASS: **Retry logic** — 3 attempts with exponential backoff
- [x] PASS: **Not found** — "This LaTeX workspace is not ready yet" error card
- [x] PASS: **Network error** — "Unable to load this LaTeX workspace" error card
- [x] PASS: **Retry button** — re-triggers loading
- [x] PASS: **Back button** — returns to `/latex` project list
#### Compilation Errors
- [x] PASS: **Rate limiting (429)** — auto-retry with Retry-After header
- [x] PASS: **Service unavailable (502/503/504)** — friendly message + retry
- [x] PASS: **Network failure** — retry up to 2 times
