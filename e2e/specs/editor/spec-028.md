# editor — Spec 028

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
- [ ] Studio chat API selects `getDraftSystemPrompt(...)` only when `mode === "draft"` and `draftContext.intensity` exists
- [ ] Studio chat API falls back to `getDefaultDraftPrompt()` when Draft mode lacks intensity context
- [ ] Draft prompt builder layers the base prompt, intensity overlay, optional ScholarRules, and optional document context in that order
- [ ] Guide prompt builder is stage-based and document-type-based rather than a single static system prompt string
- [ ] Studio chat API returns `Authentication required.` with HTTP 401 when auth fails
- [ ] Studio chat API returns `Invalid request. Please check your input and try again.` with HTTP 400 when zod validation fails
- [ ] Studio chat API returns `AI service is not configured. Please contact an administrator.` with HTTP 503 when models are unavailable
- [ ] Studio chat API returns `An unexpected error occurred. Please try again.` with HTTP 500 for uncaught server errors
- [ ] Studio page turns non-OK chat responses into the visible `chatError` banner without appending an assistant message
- [ ] Studio page appends an empty assistant message before streaming response chunks into it
- [ ] Streaming assistant content is persisted back to conversations only after the final chunk has been received
- [ ] `scholarsync:ai-action` `continue` prompt starts `Continue writing from where the user left off.`
- [ ] `scholarsync:ai-action` `outline-section` prompt starts `Create a concise bullet outline for the current section`
- [ ] `scholarsync:ai-action` `check-guidelines` prompt starts `Review this draft against the most relevant reporting guideline checklist`
- [ ] `scholarsync:ai-action` `precision-edit` prompt starts `Improve the clarity, precision, and academic tone`
- [ ] `scholarsync:ai-action` `summarize` prompt starts `Summarize the following text concisely:`
- [ ] `scholarsync:ai-action` `cite` prompt is the fixed question `Help me add a citation from my library. What paper should I cite here?`
- [ ] `scholarsync:ai-action` `ask` focuses the chat input and does not auto-send any message
- [ ] `scholarsync:ai-action` `find-sources` opens the ResearchSidebar instead of sending a chat message
- [ ] `find-sources` seeds research query text from only the first 200 characters of editor context
- [ ] `scholarsync:ai-action` `integrity-check` switches directly to the `Checks` tab and does not auto-run chat
- [ ] Studio `show-word-count` action writes a synthetic assistant chat message instead of opening a modal
- [ ] Studio word-count assistant message starts with `Section word counts:` when section headings exist
- [ ] Studio word-count assistant message falls back to `Document word count: <n> words` when no section headings exist
- [ ] Studio comment action dispatch always includes `quotedText` extracted from the current selection
- [ ] Studio citation insertion restores the saved text selection before inserting a citation node when possible
- [ ] Successful Studio citation insertion auto-appends a bibliography node when missing
- [ ] Studio citation notice auto-clears after 2500 ms
- [ ] Research-to-editor citation insertion creates ids in the form `ref-research-<stableKey>`
- [ ] Research quick-search button opens the ResearchSidebar only when the query is non-empty
- [ ] Checks tab feeds `IntegrityPanel` plain text from `editorRef.current?.view.dom.innerText?.trim()` before falling back to `editor.getText(...)`
- [ ] Studio export dropdown items are `Export as PDF` and `Export as Word`
- [ ] Studio export dropdown closes immediately before either network request is started
- [ ] Studio `handleExportPDF()` posts `{ title, content }` HTML to `/api/export/pdf`
- [ ] Studio `handleExportPDF()` silently returns when editor HTML content is empty
