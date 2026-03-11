# editor — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Left Sidebar (Studio page)
- [ ] **Write/Learn mode toggle** — two-button toggle below title
- [ ] **Project selector** — dropdown (only if user has multiple projects)
- [ ] **Navigation links**:
- [ ] **References section**:
- [ ] **AI Credits** — progress bar at bottom showing token usage (used / limit)

### Keyboard Shortcuts — Complete Reference
#### Keyboard Shortcuts Dialog
- [ ] Accessible from TopBar `?` button (Editor page)
- [ ] Shows all shortcuts organized in 4 categories: Formatting, Structure, Academic, Tools
- [ ] Each shortcut shows key combination as styled keyboard keys
- [ ] Modal closes on backdrop click or X button

### Error Handling & Edge Cases
#### Route Entry, Loading, and Error States
- [ ] `/editor/[id]` is wrapped in `EditorErrorBoundary` before any header or editor UI renders
- [ ] `/editor/[id]` route-level error screen title is `Editor unavailable`
- [ ] `/editor/[id]` route-level error screen message is `We couldn't load the editor. Your work is safe — please try again.`
- [ ] `/studio` route-level loading screen renders skeleton placeholders instead of the real left rail, toolbar, and editor body
- [ ] `/studio` route-level error screen title is `Studio unavailable`
- [ ] `/studio` route-level error screen message is `We couldn't load the editor. Your work is safe — please try again.`
- [ ] Editor error boundary fallback shows a bug icon inside a red-tinted circular badge
- [ ] Editor error boundary fallback headline reads `The editor encountered an error`
- [ ] Editor error boundary fallback helper text reads `Don't worry — your work has been saved automatically`
- [ ] Editor error boundary fallback primary button label is `Reload Editor`
- [ ] Editor error boundary fallback secondary navigation link points to `/projects`
- [ ] Editor error boundary fallback secondary link label is `Go to Projects`
- [ ] Error boundary fallback exposes a collapsed `Technical details` section only after an actual runtime crash occurs
- [ ] Expanding `Technical details` reveals the stringified error message and React component stack
#### Editor Header Inputs and Menus
- [ ] Header title input is visible immediately under the `/editor/[id]` shell after loading completes
- [ ] Header title input placeholder is exactly `Untitled Manuscript`
- [ ] Header title input is a plain text input, not a contenteditable field
- [ ] Header title input uses the current store-backed `documentTitle` value as its controlled default state
- [ ] Header title input is disabled while document data is still loading
- [ ] Typing in the header title updates the input immediately before persistence finishes
- [ ] Title changes schedule `setTitle(newTitle)` after a 1 second delay
- [ ] Back arrow in the header is a real link to `/dashboard`
- [ ] Header document-type trigger is disabled while the page is loading
- [ ] Header document-type trigger shows the current type label plus a `CaretDown` icon
- [ ] Document-type trigger falls back to `Original Article` when the current store value does not match a known type
- [ ] Opening the document-type menu renders a full-screen click-capture backdrop behind the dropdown
