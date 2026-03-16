# editor — Spec 028

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
- [x] PASS: Studio chat API selects `getDraftSystemPrompt(...)` only when `mode === "draft"` and `draftContext.intensity` exists
- [x] PASS: Studio chat API falls back to `getDefaultDraftPrompt()` when Draft mode lacks intensity context
- [x] PASS: Draft prompt builder layers the base prompt, intensity overlay, optional ScholarRules, and optional document context in that order
- [x] PASS: Guide prompt builder is stage-based and document-type-based rather than a single static system prompt string
- [x] PASS: Studio chat API returns `Authentication required.` with HTTP 401 when auth fails
- [x] PASS: Studio chat API returns `Invalid request. Please check your input and try again.` with HTTP 400 when zod validation fails
- [x] PASS: Studio chat API returns `AI service is not configured. Please contact an administrator.` with HTTP 503 when models are unavailable
- [x] PASS: Studio chat API returns `An unexpected error occurred. Please try again.` with HTTP 500 for uncaught server errors
- [x] PASS: Studio page turns non-OK chat responses into the visible `chatError` banner without appending an assistant message
- [x] PASS: Studio page appends an empty assistant message before streaming response chunks into it
- [x] PASS: Streaming assistant content is persisted back to conversations only after the final chunk has been received
- [x] PASS: `scholarsync:ai-action` `continue` prompt starts `Continue writing from where the user left off.`
- [x] PASS: `scholarsync:ai-action` `outline-section` prompt starts `Create a concise bullet outline for the current section`
- [x] PASS: `scholarsync:ai-action` `check-guidelines` prompt starts `Review this draft against the most relevant reporting guideline checklist`
- [x] PASS: `scholarsync:ai-action` `precision-edit` prompt starts `Improve the clarity, precision, and academic tone`
- [x] PASS: `scholarsync:ai-action` `summarize` prompt starts `Summarize the following text concisely:`
- [x] PASS: `scholarsync:ai-action` `cite` prompt is the fixed question `Help me add a citation from my library. What paper should I cite here?`
- [x] PASS: `scholarsync:ai-action` `ask` focuses the chat input and does not auto-send any message
- [x] PASS: `scholarsync:ai-action` `find-sources` opens the ResearchSidebar instead of sending a chat message
- [x] PASS: `find-sources` seeds research query text from only the first 200 characters of editor context
- [x] PASS: `scholarsync:ai-action` `integrity-check` switches directly to the `Checks` tab and does not auto-run chat
- [x] PASS: Studio `show-word-count` action writes a synthetic assistant chat message instead of opening a modal
- [x] PASS: Studio word-count assistant message starts with `Section word counts:` when section headings exist
- [x] PASS: Studio word-count assistant message falls back to `Document word count: <n> words` when no section headings exist
- [x] PASS: Studio comment action dispatch always includes `quotedText` extracted from the current selection
- [x] PASS: Studio citation insertion restores the saved text selection before inserting a citation node when possible
- [x] PASS: Successful Studio citation insertion auto-appends a bibliography node when missing
- [x] PASS: Studio citation notice auto-clears after 2500 ms
- [x] PASS: Research-to-editor citation insertion creates ids in the form `ref-research-<stableKey>`
- [x] PASS: Research quick-search button opens the ResearchSidebar only when the query is non-empty
- [x] PASS: Checks tab feeds `IntegrityPanel` plain text from `editorRef.current?.view.dom.innerText?.trim()` before falling back to `editor.getText(...)`
- [x] PASS: Studio export dropdown items are `Export as PDF` and `Export as Word`
- [x] PASS: Studio export dropdown closes immediately before either network request is started
- [x] PASS: Studio `handleExportPDF()` posts `{ title, content }` HTML to `/api/export/pdf`
- [x] PASS: Studio `handleExportPDF()` silently returns when editor HTML content is empty

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Fixed `src/app/(app)/studio/page.tsx` so `handleExportPDF()` now posts only `{ title, content }` to `/api/export/pdf`, matching the spec.
  - Source verification covered `src/app/(app)/studio/page.tsx`, `src/app/api/chat/route.ts`, `src/lib/ai/prompts/draft.ts`, `src/lib/ai/prompts/guide.ts`, and `src/components/research/ResearchSidebar.tsx`.
  - Focused tests passed in `src/app/api/chat/__tests__/route.test.ts`, `src/lib/ai/prompts/__tests__/draft-guide-prompts.test.ts`, `src/hooks/__tests__/use-studio-document.test.tsx`, and `src/components/studio/__tests__/studio-shell-controls.test.tsx`.
  - Live browser verification on `/studio` covered the non-OK chat banner path, draft chat payload, `continue` prompt prefix, `ask`, `find-sources`, `integrity-check`, `show-word-count`, quick-search gating, export dropdown labels, export-dropdown close behavior, and the PDF export request body.
-->
