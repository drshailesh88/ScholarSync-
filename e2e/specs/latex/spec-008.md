# latex — Spec 008

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Error Handling & Edge Cases
#### Compilation Errors
- [x] PASS: **All retries exhausted** — clear error message to user
- [x] PASS: **LaTeX errors** — displayed in error gutter with line numbers
#### File Operations
- [x] PASS: **Auto-create `.bib`** — creates file when first citation inserted
- [x] PASS: **Create fails** — falls back to clipboard copy
- [x] PASS: **Save failures** — sets save state to "error"
#### Editor Cleanup
- [x] PASS: **Save timer cleanup** on component unmount
- [x] PASS: `.tex` and `.zip` export handlers revoke their temporary blob URLs after download

### Quick Test Workflows
#### Project List Page Details
- [x] PASS: Project-list page starts with `loading = true` and renders only a centered spinner with no loading label text
- [x] PASS: Project-list fetch calls `getLatexProjects()` once on initial mount
- [x] PASS: Failed project-list fetches fall through silently and still end loading state
- [x] PASS: Empty-state helper copy reads `Create your first LaTeX paper to start writing with live preview and AI assistance.`
- [x] PASS: Project cards are full-row links to `/latex/[projectId]`
- [x] PASS: Project cards use `toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })` for last-updated text
- [x] PASS: Compiler label falls back to `pdflatex` when `project.compiler` is null
- [x] PASS: Delete icon button is present in the DOM but hidden with `opacity-0` until the card is hovered
- [x] PASS: Clicking delete prevents link navigation with both `preventDefault()` and `stopPropagation()`
- [x] PASS: Project deletion is optimistic in the current implementation and does not show a confirmation dialog
#### New Paper Page Details
- [x] PASS: New-paper page title input starts as an empty string even though the placeholder is `Untitled Paper`
- [x] PASS: Pressing Enter inside the title input triggers the same `handleCreate()` flow as the primary button
- [x] PASS: Create payload falls back to `Untitled Paper` only at submission time when the input is blank
- [x] PASS: Template groups are derived from `category === "general"` and `category === "medical"`
- [x] PASS: Template section labels render as uppercase `General` and `Medical & Clinical`
- [x] PASS: Selected template card changes both border/background styling and icon color treatment
- [x] PASS: Compiler buttons render in the fixed order `pdflatex`, `xelatex`, `lualatex`
- [x] PASS: `pdflatex` is selected by default on first render
- [x] PASS: `Create Paper` button remains mounted while loading and prepends a spinning `CircleNotch` icon when `creating` is true
- [x] PASS: Successful paper creation relies on route navigation and does not reset `creating` back to false before redirect
- [x] PASS: Failed paper creation leaves the form state intact and shows either the thrown error message or the fallback `Unable to create this paper right now. Please try again.`
- [x] PASS: Back arrow on the new-paper page is a plain link to `/latex`
#### Workspace Loading, Retry, and Default State
- [x] PASS: `/latex/[projectId]` loads project metadata and file list in parallel with `Promise.all`
- [x] PASS: Workspace load retries up to 3 total attempts before surfacing an error card
- [x] PASS: Retry delays on initial load are 300 ms, 600 ms, and 900 ms across attempts
- [x] PASS: When `getLatexProject(projectId)` returns null on the final attempt, the error text is `This LaTeX workspace is not ready yet. Retry in a moment.`
- [x] PASS: Error card primary action increments an internal `reloadToken` instead of hard-refreshing the page
- [x] PASS: Error card secondary action navigates back to `/latex`
