# editor — Spec 014

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Save, Local Draft, and Export Details
- [x] PASS: Studio export dropdown contains exactly `Export as PDF` and `Export as Word`
- [x] PASS: Studio export dropdown does not include an outside-click handler in the current page component
- [x] PASS: Studio PDF export posts HTML content to `/api/export/pdf`
- [x] PASS: Successful Studio PDF export opens a new browser window or tab; HTML responses are written into it while binary PDF responses navigate there via blob URL
- [x] PASS: Studio Word export posts HTML content to `/api/export/docx`
- [x] PASS: Successful Studio Word export downloads a `.doc` file whose filename replaces non-alphanumeric characters with underscores
- [x] PASS: Failed Studio export requests fail silently in the UI and only log to the console
#### Studio AI Panel Detailed States
- [x] PASS: When neither the reference sidebar nor comment sidebar is open, `/studio` shows a right-side AI panel that is 80 units wide
- [x] PASS: AI panel top tabs are `Chat & Learn`, `Research`, and `Checks`
- [x] PASS: Chat tab renders `chatError` as an amber inline banner above the message list
- [x] PASS: User chat bubbles are right-aligned and assistant chat bubbles are left-aligned
- [x] PASS: Assistant chat bubbles include a leading sparkle-avatar chip
- [x] PASS: Streaming assistant placeholder appears only while loading and only when the newest message is not already an assistant message
- [x] PASS: Chat composer placeholder is `Ask your AI research assistant...` in Write mode
- [x] PASS: Chat composer placeholder switches to `Ask me to challenge your thinking...` in Learn mode
- [x] PASS: Send button is disabled while a chat request is in progress
- [x] PASS: Send button is also disabled when the chat input is empty or whitespace-only
- [x] PASS: Submitting the first message creates a conversation whose mode is `draft` in Write mode and `learn` in Learn mode
- [x] PASS: Chat request body sends prior messages as `{ role, content }` pairs to `/api/chat`
- [x] PASS: Learn-mode chat request includes `guideContext` only when a guide document type has been selected
- [x] PASS: Write-mode chat request includes `draftContext.intensity` with the active draft intensity
- [x] PASS: Non-OK chat responses try to parse `{ error }` JSON and fall back to `Chat failed`
- [x] PASS: Missing response streams surface `No response stream` in the chat error banner
- [x] PASS: Generic request failures surface `Failed to send message. Check your API key.`
- [x] PASS: Research tab primary CTA label is `Open Literature Research Panel`
- [x] PASS: Research tab helper text advertises `Cmd+Shift+L` as the literature-panel shortcut
- [x] PASS: Research quick-search input placeholder is `Quick search PubMed...`
- [x] PASS: Research quick-search `Search` button ignores empty or whitespace-only queries
- [x] PASS: Checks tab mounts `IntegrityPanel` and reads plain text from `editorRef.current?.getText()`
#### Actual Current Behavior Corrections
- [x] PASS: The live editor routes are `/editor/[id]` and `/studio`; there is no dedicated `/editor/new` route file in the current app tree
- [x] PASS: `/editor/[id]` uses `AcademicEditor` with `TopBar`, floating outline, link popover, and inline comment sidebar inside the editor shell
- [x] PASS: `/studio` uses `TiptapEditor` plus separate right-side research/reference/comment/AI panels rather than the exact same shell as `/editor/[id]`
- [x] PASS: Studio export is a two-item dropdown, not the same modal export dialog used on `/editor/[id]`
- [x] PASS: Studio export menu does not currently close on outside click because no backdrop or document listener is wired in this page component
- [x] PASS: Editor-page overflow `DotsThree` action is present visually but has no implemented behavior
