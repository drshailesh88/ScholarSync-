# latex — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Error Handling & Edge Cases
#### Compilation Errors
- [ ] **All retries exhausted** — clear error message to user
- [ ] **LaTeX errors** — displayed in error gutter with line numbers
#### File Operations
- [ ] **Auto-create `.bib`** — creates file when first citation inserted
- [ ] **Create fails** — falls back to clipboard copy
- [ ] **Save failures** — sets save state to "error"
#### Editor Cleanup
- [ ] **Save timer cleanup** on component unmount
- [ ] `.tex` and `.zip` export handlers revoke their temporary blob URLs after download

### Quick Test Workflows
#### Project List Page Details
- [ ] Project-list page starts with `loading = true` and renders only a centered spinner with no loading label text
- [ ] Project-list fetch calls `getLatexProjects()` once on initial mount
- [ ] Failed project-list fetches fall through silently and still end loading state
- [ ] Empty-state helper copy reads `Create your first LaTeX paper to start writing with live preview and AI assistance.`
- [ ] Project cards are full-row links to `/latex/[projectId]`
- [ ] Project cards use `toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })` for last-updated text
- [ ] Compiler label falls back to `pdflatex` when `project.compiler` is null
- [ ] Delete icon button is present in the DOM but hidden with `opacity-0` until the card is hovered
- [ ] Clicking delete prevents link navigation with both `preventDefault()` and `stopPropagation()`
- [ ] Project deletion is optimistic in the current implementation and does not show a confirmation dialog
#### New Paper Page Details
- [ ] New-paper page title input starts as an empty string even though the placeholder is `Untitled Paper`
- [ ] Pressing Enter inside the title input triggers the same `handleCreate()` flow as the primary button
- [ ] Create payload falls back to `Untitled Paper` only at submission time when the input is blank
- [ ] Template groups are derived from `category === "general"` and `category === "medical"`
- [ ] Template section labels render as uppercase `General` and `Medical & Clinical`
- [ ] Selected template card changes both border/background styling and icon color treatment
- [ ] Compiler buttons render in the fixed order `pdflatex`, `xelatex`, `lualatex`
- [ ] `pdflatex` is selected by default on first render
- [ ] `Create Paper` button remains mounted while loading and prepends a spinning `CircleNotch` icon when `creating` is true
- [ ] Successful paper creation relies on route navigation and does not reset `creating` back to false before redirect
- [ ] Failed paper creation leaves the form state intact and shows either the thrown error message or the fallback `Unable to create this paper right now. Please try again.`
- [ ] Back arrow on the new-paper page is a plain link to `/latex`
#### Workspace Loading, Retry, and Default State
- [ ] `/latex/[projectId]` loads project metadata and file list in parallel with `Promise.all`
- [ ] Workspace load retries up to 3 total attempts before surfacing an error card
- [ ] Retry delays on initial load are 300 ms, 600 ms, and 900 ms across attempts
- [ ] When `getLatexProject(projectId)` returns null on the final attempt, the error text is `This LaTeX workspace is not ready yet. Retry in a moment.`
- [ ] Error card primary action increments an internal `reloadToken` instead of hard-refreshing the page
- [ ] Error card secondary action navigates back to `/latex`
