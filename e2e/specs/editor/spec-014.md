# editor — Spec 014

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Save, Local Draft, and Export Details
- [ ] Studio export dropdown contains exactly `Export as PDF` and `Export as Word`
- [ ] Studio export dropdown does not include an outside-click handler in the current page component
- [ ] Studio PDF export posts HTML content to `/api/export/pdf`
- [ ] Successful Studio PDF export opens a new browser window or tab and writes returned HTML into it
- [ ] Studio Word export posts HTML content to `/api/export/docx`
- [ ] Successful Studio Word export downloads a `.doc` file whose filename replaces non-alphanumeric characters with underscores
- [ ] Failed Studio export requests fail silently in the UI and only log to the console
#### Studio AI Panel Detailed States
- [ ] When neither the reference sidebar nor comment sidebar is open, `/studio` shows a right-side AI panel that is 80 units wide
- [ ] AI panel top tabs are `Chat & Learn`, `Research`, and `Checks`
- [ ] Chat tab renders `chatError` as an amber inline banner above the message list
- [ ] User chat bubbles are right-aligned and assistant chat bubbles are left-aligned
- [ ] Assistant chat bubbles include a leading sparkle-avatar chip
- [ ] Streaming assistant placeholder appears only while loading and only when the newest message is not already an assistant message
- [ ] Chat composer placeholder is `Ask your AI research assistant...` in Write mode
- [ ] Chat composer placeholder switches to `Ask me to challenge your thinking...` in Learn mode
- [ ] Send button is disabled while a chat request is in progress
- [ ] Send button is also disabled when the chat input is empty or whitespace-only
- [ ] Submitting the first message creates a conversation whose mode is `draft` in Write mode and `learn` in Learn mode
- [ ] Chat request body sends prior messages as `{ role, content }` pairs to `/api/chat`
- [ ] Learn-mode chat request includes `guideContext` only when a guide document type has been selected
- [ ] Write-mode chat request includes `draftContext.intensity` with the active draft intensity
- [ ] Non-OK chat responses try to parse `{ error }` JSON and fall back to `Chat failed`
- [ ] Missing response streams surface `No response stream` in the chat error banner
- [ ] Generic request failures surface `Failed to send message. Check your API key.`
- [ ] Research tab primary CTA label is `Open Literature Research Panel`
- [ ] Research tab helper text advertises `Cmd+Shift+L` as the literature-panel shortcut
- [ ] Research quick-search input placeholder is `Quick search PubMed...`
- [ ] Research quick-search `Search` button ignores empty or whitespace-only queries
- [ ] Checks tab mounts `IntegrityPanel` and reads plain text from `editorRef.current?.getText()`
#### Actual Current Behavior Corrections
- [ ] The live editor routes are `/editor/[id]` and `/studio`; there is no dedicated `/editor/new` route file in the current app tree
- [ ] `/editor/[id]` uses `AcademicEditor` with `TopBar`, floating outline, link popover, and inline comment sidebar inside the editor shell
- [ ] `/studio` uses `TiptapEditor` plus separate right-side research/reference/comment/AI panels rather than the exact same shell as `/editor/[id]`
- [ ] Studio export is a two-item dropdown, not the same modal export dialog used on `/editor/[id]`
- [ ] Studio export menu does not currently close on outside click because no backdrop or document listener is wired in this page component
- [ ] Editor-page overflow `DotsThree` action is present visually but has no implemented behavior
