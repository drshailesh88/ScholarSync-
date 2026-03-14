# editor — Spec 027

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Left Rail, Mode Controls, and Document Loading
- [x] PASS: Studio left-rail title input has no placeholder and always reflects `docTitle`
- [x] PASS: Studio `Write` button applies brand styling only when Learn mode is off
- [x] PASS: Studio `Learn` button applies emerald styling only when Learn mode is on
- [x] PASS: Studio project selector is hidden when the user has zero or one project
- [x] PASS: Studio project selector selected-label fallback text is `Select project`
- [x] PASS: Studio project-selector dropdown closes on outside `mousedown`
- [x] PASS: Selecting the already-active project from the project selector is a no-op in the hook
- [x] PASS: Switching Studio projects clears `initialContent` to `null` before the new project document loads
- [x] PASS: Switching Studio projects also clears `document` state and resets save status to `idle`
- [x] PASS: Studio navigation item labels are `Current Draft`, `My Library`, and `Literature Search`
- [x] PASS: Studio references summary header shows `References (<n>)` using total references in the store rather than cited-only count
- [x] PASS: Left-rail empty citation helper reads `Use Cmd+Shift+C to add citations`
- [x] PASS: Left-rail summary truncates to the first five numbered citations sorted by citation order
- [x] PASS: Left-rail `View all <n> references` button appears only when `references.size > 5`
- [x] PASS: Studio AI-credits widget falls back to `0 / 50000` when usage stats fail to load
- [x] PASS: Write-mode intensity buttons are `Focus`, `Collaborate`, and `Accelerate`
- [x] PASS: Write-mode intensity descriptions are `AI is quiet — only responds when you ask`, `AI assists with completions and suggestions`, and `AI is proactive — full suggestions and sidebar`
- [x] PASS: Learn-mode banner text is `Guide Mode — I won't write for you — I'll teach you how`
- [x] PASS: Learn-mode document-type trigger default text is `Select document type`
- [x] PASS: Learn-mode stage tracker renders only after a guide document type has been selected
- [x] PASS: Learn-mode stage buttons are `Understand`, `Plan`, `Outline`, `Draft`, `Revise`, and `Polish`
- [x] PASS: Completed Learn-mode stages render a lighter emerald style while the active stage renders solid emerald
- [x] PASS: Studio `docLoading` screen text is `Loading document...`
- [x] PASS: Studio `docError` screen renders the raw hook error string without extra fallback copy
#### Studio Chat, Prompt Construction, Research, Checks, and Export Wiring
- [x] PASS: Studio first chat submit lazily creates a conversation record through `createConversation(...)`
- [x] PASS: New Studio conversation titles are truncated to the first 80 characters of the first user message
- [x] PASS: Studio always writes the user chat message to the conversation table optimistically with `.catch(() => {})`
- [x] PASS: Chat POST body sends only `{ role, content }` pairs from the in-memory message list
- [x] PASS: Learn-mode chat adds `guideContext.documentType` only when `guideDocType` is set
- [x] PASS: Learn-mode chat always sends `guideContext.stage` when `guideDocType` is set
- [x] PASS: Learn-mode chat sends `guideContext.projectTitle` only when the title is not `Untitled Document`
- [x] PASS: Write-mode chat always sends `draftContext.intensity`
- [x] PASS: Write-mode chat sends `draftContext.projectTitle` only when the title is not `Untitled Document`
- [x] PASS: Studio chat API selects `getGuideSystemPrompt(...)` only when `mode === "learn"` and both `guideContext.documentType` and `guideContext.stage` exist
- [x] PASS: Studio chat API falls back to `getDefaultGuidePrompt()` when Learn mode lacks full guide context

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Fixed project switching in `src/hooks/use-studio-document.ts` to clear `activeSectionId` alongside `initialContent`, `document`, and `saveStatus`, preventing stale section ids from leaking across projects.
  - Source verification covered `src/app/(app)/studio/page.tsx`, `src/hooks/use-studio-document.ts`, `src/components/studio/ProjectSelector.tsx`, and `src/app/api/chat/route.ts`.
  - Focused tests passed in `src/hooks/__tests__/use-studio-document.test.tsx`, `src/components/studio/__tests__/studio-shell-controls.test.tsx`, and `src/app/api/chat/__tests__/route.test.ts`.
  - Live browser verification on `/studio` confirmed the shell labels, write/learn mode copy, loading-state fallback credits, Learn-mode doc-type trigger, stage buttons, and completed-vs-active emerald styling.
-->
