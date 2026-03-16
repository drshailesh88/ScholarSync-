# editor — Spec 007

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Left Sidebar (Studio page)
- [x] PASS: **Write/Learn mode toggle** — two-button toggle below title
- [x] PASS: **Project selector** — dropdown (only if user has multiple projects)
- [x] PASS: **Navigation links**:
- [x] PASS: **References section**:
- [x] PASS: **AI Credits** — progress bar at bottom showing token usage (used / limit)

### Keyboard Shortcuts — Complete Reference
#### Keyboard Shortcuts Dialog
- [x] PASS: Accessible from TopBar `?` button (Editor page)
- [x] PASS: Shows all shortcuts organized in 4 categories: Formatting, Structure, Academic, Tools
- [x] PASS: Each shortcut shows key combination as styled keyboard keys
- [x] PASS: Modal closes on backdrop click or X button

### Error Handling & Edge Cases
#### Route Entry, Loading, and Error States
- [x] PASS: `/editor/[id]` is wrapped in `EditorErrorBoundary` before any header or editor UI renders
- [x] PASS: `/editor/[id]` route-level error screen title is `Editor unavailable`
- [x] PASS: `/editor/[id]` route-level error screen message is `We couldn't load the editor. Your work is safe — please try again.`
- [x] PASS: `/studio` route-level loading screen renders skeleton placeholders instead of the real left rail, toolbar, and editor body
- [x] PASS: `/studio` route-level error screen title is `Studio unavailable`
- [x] PASS: `/studio` route-level error screen message is `We couldn't load the editor. Your work is safe — please try again.`
- [x] PASS: Editor error boundary fallback shows a bug icon inside a red-tinted circular badge
- [x] PASS: Editor error boundary fallback headline reads `The editor encountered an error`
- [x] PASS: Editor error boundary fallback helper text reads `Don't worry — your work has been saved automatically`
- [x] PASS: Editor error boundary fallback primary button label is `Reload Editor`
- [x] PASS: Editor error boundary fallback secondary navigation link points to `/projects`
- [x] PASS: Editor error boundary fallback secondary link label is `Go to Projects`
- [x] PASS: Error boundary fallback exposes a collapsed `Technical details` section only after an actual runtime crash occurs
- [x] PASS: Expanding `Technical details` reveals the stringified error message and React component stack
#### Editor Header Inputs and Menus
- [x] PASS: Header title input is visible immediately under the `/editor/[id]` shell after loading completes
- [x] PASS: Header title input placeholder is exactly `Untitled Manuscript`
- [x] PASS: Header title input is a plain text input, not a contenteditable field
- [x] PASS: Header title input uses the current store-backed `documentTitle` value as its controlled default state
- [x] PASS: Header title input is disabled while document data is still loading
- [x] PASS: Typing in the header title updates the input immediately before persistence finishes
- [x] PASS: Title changes schedule `setTitle(newTitle)` after a 1 second delay
- [x] PASS: Back arrow in the header is a real link to `/dashboard`
- [x] PASS: Header document-type trigger is disabled while the page is loading
- [x] PASS: Header document-type trigger shows the current type label plus a `CaretDown` icon
- [x] PASS: Document-type trigger falls back to `Original Article` when the current store value does not match a known type
- [x] PASS: Opening the document-type menu renders a full-screen click-capture backdrop behind the dropdown
