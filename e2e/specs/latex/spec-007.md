# latex — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Export
#### Download as .zip
- [ ] Uses JSZip library (dynamically imported)
- [ ] Filename: `{projectTitle}.zip` (sanitized)
- [ ] Preserves file paths from project structure

### Save System
#### Auto-save
- [ ] **Debounced** — saves 1500ms after last keystroke
- [ ] **Per-file tracking** — saves the currently active file
- [ ] File tree stays in sync with editor content
- [ ] Save state managed in Zustand store
#### Manual Save
- [ ] **Cmd+S** — saves immediately from store-backed content (without explicitly clearing any pending autosave timer)
- [ ] Calls `updateLatexFile()` server action
#### Pre-compile Save
- [ ] Current file is auto-saved before compilation starts

### Mobile & Responsive Design
#### Mobile (< 768px)
- [ ] **Editor/Preview toggle** — bottom bar switches between Editor and Preview views
- [ ] **File tree** — opens as full-screen overlay (fixed inset-0)
- [ ] Close button in header
- [ ] Auto-closes after file selection or jump-to-line
- [ ] **Agent panel** — opens as full-screen overlay
- [ ] Close button in header
- [ ] Header shows "AI Assistant" label
- [ ] **Floating buttons** — folder icon (left) and chat icon (right) to open panels
- [ ] **Touch targets** — minimum 44px touch target size on all buttons
- [ ] **Preview close** — X button to go back to editor
#### Tablet (768px - 1024px)
- [ ] **Agent panel** — narrower width (256px instead of 288px)
- [ ] **Agent panel toggle** — hidden on tablet (use floating button instead)
- [ ] **File tree** — normal sidebar behavior
#### Desktop (> 1024px)
- [ ] **Side-by-side layout** — editor and preview visible simultaneously
- [ ] **File tree toggle tab** — left-edge button
- [ ] **Agent panel toggle tab** — right-edge button
- [ ] **Full panel widths** — file tree 224px, agent panel 288px

### Error Handling & Edge Cases
#### Project Loading
- [ ] **Retry logic** — 3 attempts with exponential backoff
- [ ] **Not found** — "This LaTeX workspace is not ready yet" error card
- [ ] **Network error** — "Unable to load this LaTeX workspace" error card
- [ ] **Retry button** — re-triggers loading
- [ ] **Back button** — returns to `/latex` project list
#### Compilation Errors
- [ ] **Rate limiting (429)** — auto-retry with Retry-After header
- [ ] **Service unavailable (502/503/504)** — friendly message + retry
- [ ] **Network failure** — retry up to 2 times
