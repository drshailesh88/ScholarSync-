# editor — Spec 027

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Left Rail, Mode Controls, and Document Loading
- [ ] Studio left-rail title input has no placeholder and always reflects `docTitle`
- [ ] Studio `Write` button applies brand styling only when Learn mode is off
- [ ] Studio `Learn` button applies emerald styling only when Learn mode is on
- [ ] Studio project selector is hidden when the user has zero or one project
- [ ] Studio project selector selected-label fallback text is `Select project`
- [ ] Studio project-selector dropdown closes on outside `mousedown`
- [ ] Selecting the already-active project from the project selector is a no-op in the hook
- [ ] Switching Studio projects clears `initialContent` to `null` before the new project document loads
- [ ] Switching Studio projects also clears `document` state and resets save status to `idle`
- [ ] Studio navigation item labels are `Current Draft`, `My Library`, and `Literature Search`
- [ ] Studio references summary header shows `References (<n>)` using total references in the store rather than cited-only count
- [ ] Left-rail empty citation helper reads `Use Cmd+Shift+C to add citations`
- [ ] Left-rail summary truncates to the first five numbered citations sorted by citation order
- [ ] Left-rail `View all <n> references` button appears only when `references.size > 5`
- [ ] Studio AI-credits widget falls back to `0 / 50000` when usage stats fail to load
- [ ] Write-mode intensity buttons are `Focus`, `Collaborate`, and `Accelerate`
- [ ] Write-mode intensity descriptions are `AI is quiet — only responds when you ask`, `AI assists with completions and suggestions`, and `AI is proactive — full suggestions and sidebar`
- [ ] Learn-mode banner text is `Guide Mode — I won't write for you — I'll teach you how`
- [ ] Learn-mode document-type trigger default text is `Select document type`
- [ ] Learn-mode stage tracker renders only after a guide document type has been selected
- [ ] Learn-mode stage buttons are `Understand`, `Plan`, `Outline`, `Draft`, `Revise`, and `Polish`
- [ ] Completed Learn-mode stages render a lighter emerald style while the active stage renders solid emerald
- [ ] Studio `docLoading` screen text is `Loading document...`
- [ ] Studio `docError` screen renders the raw hook error string without extra fallback copy
#### Studio Chat, Prompt Construction, Research, Checks, and Export Wiring
- [ ] Studio first chat submit lazily creates a conversation record through `createConversation(...)`
- [ ] New Studio conversation titles are truncated to the first 80 characters of the first user message
- [ ] Studio always writes the user chat message to the conversation table optimistically with `.catch(() => {})`
- [ ] Chat POST body sends only `{ role, content }` pairs from the in-memory message list
- [ ] Learn-mode chat adds `guideContext.documentType` only when `guideDocType` is set
- [ ] Learn-mode chat always sends `guideContext.stage` when `guideDocType` is set
- [ ] Learn-mode chat sends `guideContext.projectTitle` only when the title is not `Untitled Document`
- [ ] Write-mode chat always sends `draftContext.intensity`
- [ ] Write-mode chat sends `draftContext.projectTitle` only when the title is not `Untitled Document`
- [ ] Studio chat API selects `getGuideSystemPrompt(...)` only when `mode === "learn"` and both `guideContext.documentType` and `guideContext.stage` exist
- [ ] Studio chat API falls back to `getDefaultGuidePrompt()` when Learn mode lacks full guide context
