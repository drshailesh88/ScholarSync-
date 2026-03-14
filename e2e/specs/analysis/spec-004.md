# analysis — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] `getActiveDocumentForAnalysis(selectedProjectId)` runs after document mode initializes and again when the selected project changes
- [ ] Document fetch failures clear `activeDoc` and reset `inputText` to an empty string
- [ ] Empty `inputText` clears both `clientIssues` and `clientMetrics`
- [ ] Header back control is a `Link` to `/studio`, not a button with imperative navigation
- [ ] Header title reads `Writing Analysis` while `result` is null
- [ ] Header title switches to `Draft Analysis` after a successful analysis response sets `result`
- [ ] Source-mode toggle group is visible only while `result` is null
- [ ] Results-mode legend replaces the source toggle group after `result` is set
- [ ] Results legend contains exactly three items: `Low Human (<40%)`, `Mixed (40-70%)`, and `High Human (>70%)`
- [ ] Each legend item includes a colored square swatch plus text label
- [ ] `From Document` button is the selected toggle on initial render
- [ ] Selected toggle uses `bg-brand text-white`
- [ ] Unselected toggle uses `text-ink-muted` and hover text-color changes
- [ ] `From Document` toggle includes a `FileText` icon before its label
- [ ] `Paste Text` toggle has text only with no icon in the current implementation
- [ ] Clicking `Paste Text` switches `sourceMode` to `paste`
- [ ] Clicking `From Document` switches `sourceMode` back to `document`
- [ ] Switching from document mode to paste mode does not clear `inputText`; the current text carries over
- [ ] Switching back to document mode triggers a fresh document load that can overwrite pasted text
- [ ] Project selector row is rendered only when `sourceMode === "document"` and `projects.length > 0`
- [ ] Project selector row starts with the label `Project:`
- [ ] Project dropdown trigger shows the selected project title when `selectedProject` is found
- [ ] Project dropdown trigger falls back to `Select project` when no project is selected yet
- [ ] Project dropdown trigger includes a trailing `CaretDown` icon
- [ ] Clicking the project trigger toggles `projectDropdownOpen`
- [ ] Open project menu renders as an absolutely positioned dropdown under the trigger
- [ ] Project menu is capped with `max-h-60 overflow-y-auto`
- [ ] Currently selected project row uses `bg-brand/10 text-brand font-medium`
- [ ] Non-selected project rows use `text-ink` and gain a hover background
- [ ] Clicking a project option sets `selectedProjectId` and closes the dropdown
- [ ] Clicking outside the dropdown closes it through the `mousedown` document listener
- [ ] When `activeDoc` exists, a `Document: {title}` text label is shown to the right of the project selector
- [ ] While `docLoading` is true in document mode, the textarea is replaced by a centered loading state
- [ ] Document loading state shows a `CircleNotch` icon with `animate-spin`
- [ ] Document loading state shows the text `Loading document...`
