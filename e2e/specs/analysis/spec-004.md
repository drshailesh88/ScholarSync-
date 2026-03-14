# analysis — Spec 004

STATUS: PARTIAL
TESTED: 35/35
PASS: 33
FAIL: 2
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: `getActiveDocumentForAnalysis(selectedProjectId)` runs after document mode initializes and again when the selected project changes
- [x] PASS: Document fetch failures clear `activeDoc` and reset `inputText` to an empty string
- [x] PASS: Empty `inputText` clears both `clientIssues` and `clientMetrics`
- [x] PASS: Header back control is a `Link` to `/studio`, not a button with imperative navigation
- [x] PASS: Header title reads `Writing Analysis` while `result` is null
- [x] PASS: Header title switches to `Draft Analysis` after a successful analysis response sets `result`
- [x] PASS: Source-mode toggle group is visible only while `result` is null
- [x] PASS: Results-mode legend replaces the source toggle group after `result` is set
- [x] PASS: Results legend contains exactly three items: `Low Human (<40%)`, `Mixed (40-70%)`, and `High Human (>70%)`
- [x] PASS: Each legend item includes a colored square swatch plus text label
- [x] PASS: `From Document` button is the selected toggle on initial render
- [x] PASS: Selected toggle uses `bg-brand text-white`
- [x] PASS: Unselected toggle uses `text-ink-muted` and hover text-color changes
- [x] PASS: `From Document` toggle includes a `FileText` icon before its label
- [x] PASS: `Paste Text` toggle has text only with no icon in the current implementation
- [x] PASS: Clicking `Paste Text` switches `sourceMode` to `paste`
- [x] PASS: Clicking `From Document` switches `sourceMode` back to `document`
- [x] PASS: Switching from document mode to paste mode does not clear `inputText`; the current text carries over
- [ ] FAIL: Switching back to document mode triggers a fresh document load that can overwrite pasted text
- [x] PASS: Project selector row is rendered only when `sourceMode === "document"` and `projects.length > 0`
- [x] PASS: Project selector row starts with the label `Project:`
- [x] PASS: Project dropdown trigger shows the selected project title when `selectedProject` is found
- [x] PASS: Project dropdown trigger falls back to `Select project` when no project is selected yet
- [x] PASS: Project dropdown trigger includes a trailing `CaretDown` icon
- [x] PASS: Clicking the project trigger toggles `projectDropdownOpen`
- [ ] FAIL: Open project menu renders as an absolutely positioned dropdown under the trigger
- [x] PASS: Project menu is capped with `max-h-60 overflow-y-auto`
- [x] PASS: Currently selected project row uses `bg-brand/10 text-brand font-medium`
- [x] PASS: Non-selected project rows use `text-ink` and gain a hover background
- [x] PASS: Clicking a project option sets `selectedProjectId` and closes the dropdown
- [x] PASS: Clicking outside the dropdown closes it through the `mousedown` document listener
- [x] PASS: When `activeDoc` exists, a `Document: {title}` text label is shown to the right of the project selector
- [x] PASS: While `docLoading` is true in document mode, the textarea is replaced by a centered loading state
- [x] PASS: Document loading state shows a `CircleNotch` icon with `animate-spin`
- [x] PASS: Document loading state shows the text `Loading document...`
