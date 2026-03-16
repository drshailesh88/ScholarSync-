# editor — Spec 029

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Chat, Prompt Construction, Research, Checks, and Export Wiring
- [x] PASS: Studio `handleExportPDF()` does nothing visible when the HTTP response is non-OK
- [x] PASS: Studio `handleExportPDF()` writes HTML responses into a newly opened window, but sends binary PDF responses to that window via blob URL navigation
- [x] PASS: Studio `handleExportDocx()` posts `{ title, content }` HTML to `/api/export/docx`
- [x] PASS: Studio `handleExportDocx()` silently returns when editor HTML content is empty
- [x] PASS: Studio Word export downloads a `.doc` filename even though the backend route returns DOCX bytes
- [x] PASS: Studio export failures log `PDF export failed:` or `DOCX export failed:` to the console and show no inline toast
#### Verified Current-Behavior Corrections from Pass 1
- [x] PASS: `/editor/[id]` still has no dedicated route-level loading file; only the route-level error boundary file exists
- [x] PASS: The editor-route `DotsThree` button remains visually present but unwired
- [x] PASS: Version-history preview still renders raw JSON rather than rich text
- [x] PASS: Studio export still uses a lightweight dropdown rather than the editor-route modal
- [x] PASS: Studio export dropdown still lacks any outside-click dismissal listener
- [x] PASS: The live editor route surface is still `/editor/[id]` plus `/studio`; `/editor/new` is still absent from the app tree
- [x] PASS: The keyboard-shortcuts dialog still advertises `Cmd + /` for comments while actual comment toggling depends on custom event wiring
- [x] PASS: Track changes are still not implemented for the editor route; the store comment still marks suggesting mode as post-beta/planned
- [x] PASS: Citation-style switching is still absent from the current reference sidebar UI
- [x] PASS: Math insertion is still not implemented as a custom editor extension in the current editor stack
#### Studio Page Architecture
- [x] PASS: `StudioPage` default export wraps `StudioContent` inside a React `<Suspense>` boundary (no fallback UI)
- [x] PASS: `StudioContent` is a separate inner function component, not the default export
- [x] PASS: Studio page root container uses `h-[calc(100vh-7rem)]` height (vs editor page's `calc(100vh-4rem)`)
- [x] PASS: Studio left sidebar has a fixed width of `w-64` (256px)
- [x] PASS: Studio left-rail title input has no `placeholder` attribute at all (empty string fallback)
- [x] PASS: Studio `Write` button uses `bg-brand text-white` styling (not sky/blue), contradicting the doc's claim of "brand purple"
- [x] PASS: Studio project selector uses `mousedown` event for outside-click detection, not `click`
- [x] PASS: Studio project selector dropdown has `max-h-60 overflow-y-auto` for long project lists
- [x] PASS: Studio project selector dropdown width is `w-56` (224px)
- [x] PASS: Studio `Current Draft` is a static `<div>` (not a `<Link>`), confirming it is not navigable
- [x] PASS: Studio `My Library` link icon is `Books` (size 16), `Literature Search` icon is `GlobeHemisphereWest` (size 16)
- [x] PASS: Studio left-rail cited source rows show first author family name only (not "first author + year")
- [x] PASS: Studio left-rail cited source author falls back to `"Unknown"` when `ref.authors[0]?.family` is undefined
- [x] PASS: Studio `View all N references` button opens `ReferenceSidebar` via `setSidebarOpen(true)`, not via `toggleSidebar()`
#### Studio Chat Internals
- [x] PASS: Studio chat message IDs are generated as `msg_${Date.now()}` for user messages and `msg_${Date.now() + 1}` for assistant messages
- [x] PASS: Studio `submitAiPrompt()` sets the input value twice — once immediately and once inside a 100ms `setTimeout` — then calls `form.requestSubmit()` via DOM query
- [x] PASS: Studio `submitAiPrompt()` finds the form element with `document.querySelector<HTMLFormElement>("form")`
- [x] PASS: Studio `ask` AI action focuses the chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]`
- [x] PASS: Studio `ask` AI action uses `setTimeout(() => ..., 0)` (zero delay) for the focus call

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Updated the PDF-export checklist wording to match current behavior after spec 28: HTML responses are written into the new window, while binary PDF responses navigate that window via a blob URL.
  - Source verification covered `src/app/(app)/studio/page.tsx`, `src/app/(app)/editor/[id]/page.tsx`, `src/components/editor/KeyboardShortcutsDialog.tsx`, `src/components/editor/VersionHistory.tsx`, `src/components/citations/reference-sidebar.tsx`, and `src/stores/editor-store.ts`.
  - Live browser verification on `/studio` confirmed that the export dropdown still lacks outside-click dismissal, PDF non-OK responses remain silent in the UI, DOCX export posts `{ title, content }`, and the downloaded filename still ends in `.doc`.
  - Repo search confirmed the app tree still exposes `/editor/[id]` and `/studio` without an `/editor/new` route and still lacks a custom math editor extension in the current editor stack.
-->
