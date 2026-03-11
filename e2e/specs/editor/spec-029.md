# editor — Spec 029

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Chat, Prompt Construction, Research, Checks, and Export Wiring
- [ ] Studio `handleExportPDF()` does nothing visible when the HTTP response is non-OK
- [ ] Studio `handleExportPDF()` reads the response as text and writes it into a newly opened window
- [ ] Studio `handleExportDocx()` posts `{ title, content }` HTML to `/api/export/docx`
- [ ] Studio `handleExportDocx()` silently returns when editor HTML content is empty
- [ ] Studio Word export downloads a `.doc` filename even though the backend route returns DOCX bytes
- [ ] Studio export failures log `PDF export failed:` or `DOCX export failed:` to the console and show no inline toast
#### Verified Current-Behavior Corrections from Pass 1
- [ ] `/editor/[id]` still has no dedicated route-level loading file; only the route-level error boundary file exists
- [ ] The editor-route `DotsThree` button remains visually present but unwired
- [ ] Version-history preview still renders raw JSON rather than rich text
- [ ] Studio export still uses a lightweight dropdown rather than the editor-route modal
- [ ] Studio export dropdown still lacks any outside-click dismissal listener
- [ ] The live editor route surface is still `/editor/[id]` plus `/studio`; `/editor/new` is still absent from the app tree
- [ ] The keyboard-shortcuts dialog still advertises `Cmd + /` for comments while actual comment toggling depends on custom event wiring
- [ ] Track changes are still not implemented for the editor route; the store comment still marks suggesting mode as post-beta/planned
- [ ] Citation-style switching is still absent from the current reference sidebar UI
- [ ] Math insertion is still not implemented as a custom editor extension in the current editor stack
#### Studio Page Architecture
- [ ] `StudioPage` default export wraps `StudioContent` inside a React `<Suspense>` boundary (no fallback UI)
- [ ] `StudioContent` is a separate inner function component, not the default export
- [ ] Studio page root container uses `h-[calc(100vh-7rem)]` height (vs editor page's `calc(100vh-4rem)`)
- [ ] Studio left sidebar has a fixed width of `w-64` (256px)
- [ ] Studio left-rail title input has no `placeholder` attribute at all (empty string fallback)
- [ ] Studio `Write` button uses `bg-brand text-white` styling (not sky/blue), contradicting the doc's claim of "brand purple"
- [ ] Studio project selector uses `mousedown` event for outside-click detection, not `click`
- [ ] Studio project selector dropdown has `max-h-60 overflow-y-auto` for long project lists
- [ ] Studio project selector dropdown width is `w-56` (224px)
- [ ] Studio `Current Draft` is a static `<div>` (not a `<Link>`), confirming it is not navigable
- [ ] Studio `My Library` link icon is `Books` (size 16), `Literature Search` icon is `GlobeHemisphereWest` (size 16)
- [ ] Studio left-rail cited source rows show first author family name only (not "first author + year")
- [ ] Studio left-rail cited source author falls back to `"Unknown"` when `ref.authors[0]?.family` is undefined
- [ ] Studio `View all N references` button opens `ReferenceSidebar` via `setSidebarOpen(true)`, not via `toggleSidebar()`
#### Studio Chat Internals
- [ ] Studio chat message IDs are generated as `msg_${Date.now()}` for user messages and `msg_${Date.now() + 1}` for assistant messages
- [ ] Studio `submitAiPrompt()` sets the input value twice — once immediately and once inside a 100ms `setTimeout` — then calls `form.requestSubmit()` via DOM query
- [ ] Studio `submitAiPrompt()` finds the form element with `document.querySelector<HTMLFormElement>("form")`
- [ ] Studio `ask` AI action focuses the chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]`
- [ ] Studio `ask` AI action uses `setTimeout(() => ..., 0)` (zero delay) for the focus call
