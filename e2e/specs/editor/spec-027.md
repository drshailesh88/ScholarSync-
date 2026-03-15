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
- [x] Studio left-rail title input has no placeholder and always reflects `docTitle`
- [x] Studio `Write` button applies brand styling only when Learn mode is off
- [x] Studio `Learn` button applies emerald styling only when Learn mode is on
- [x] Studio project selector is hidden when the user has zero or one project
- [x] Studio project selector selected-label fallback text is `Select project`
- [x] Studio project-selector dropdown closes on outside `mousedown`
- [x] Selecting the already-active project from the project selector is a no-op in the hook
- [x] Switching Studio projects clears `initialContent` to `null` before the new project document loads
- [x] Switching Studio projects also clears `document` state and resets save status to `idle`
- [x] Studio navigation item labels are `Current Draft`, `My Library`, and `Literature Search`
- [x] Studio references summary header shows `References (<n>)` using total references in the store rather than cited-only count
- [x] Left-rail empty citation helper reads `Use Cmd+Shift+C to add citations`
- [x] Left-rail summary truncates to the first five numbered citations sorted by citation order
- [x] Left-rail `View all <n> references` button appears only when `references.size > 5`
- [x] Studio AI-credits widget falls back to `0 / 50000` when usage stats fail to load
- [x] Write-mode intensity buttons are `Focus`, `Collaborate`, and `Accelerate`
- [x] Write-mode intensity descriptions are `AI is quiet — only responds when you ask`, `AI assists with completions and suggestions`, and `AI is proactive — full suggestions and sidebar`
- [x] Learn-mode banner text is `Guide Mode — I won't write for you — I'll teach you how`
- [x] Learn-mode document-type trigger default text is `Select document type`
- [x] Learn-mode stage tracker renders only after a guide document type has been selected
- [x] Learn-mode stage buttons are `Understand`, `Plan`, `Outline`, `Draft`, `Revise`, and `Polish`
- [x] Completed Learn-mode stages render a lighter emerald style while the active stage renders solid emerald
- [x] Studio `docLoading` screen text is `Loading document...`
- [x] Studio `docError` screen renders the raw hook error string without extra fallback copy
#### Studio Chat, Prompt Construction, Research, Checks, and Export Wiring
- [x] Studio first chat submit lazily creates a conversation record through `createConversation(...)`
- [x] New Studio conversation titles are truncated to the first 80 characters of the first user message
- [x] Studio always writes the user chat message to the conversation table optimistically with `.catch(() => {})`
- [x] Chat POST body sends only `{ role, content }` pairs from the in-memory message list
- [x] Learn-mode chat adds `guideContext.documentType` only when `guideDocType` is set
- [x] Learn-mode chat always sends `guideContext.stage` when `guideDocType` is set
- [x] Learn-mode chat sends `guideContext.projectTitle` only when the title is not `Untitled Document`
- [x] Write-mode chat always sends `draftContext.intensity`
- [x] Write-mode chat sends `draftContext.projectTitle` only when the title is not `Untitled Document`
- [x] Studio chat API selects `getGuideSystemPrompt(...)` only when `mode === "learn"` and both `guideContext.documentType` and `guideContext.stage` exist
- [x] Studio chat API falls back to `getDefaultGuidePrompt()` when Learn mode lacks full guide context

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Fixed project switching in `src/hooks/use-studio-document.ts` to clear `activeSectionId` alongside `initialContent`, `document`, and `saveStatus`, preventing stale section ids from leaking across projects.
  - Source verification covered `src/app/(app)/studio/page.tsx`, `src/hooks/use-studio-document.ts`, `src/components/studio/ProjectSelector.tsx`, and `src/app/api/chat/route.ts`.
  - Focused tests passed in `src/hooks/__tests__/use-studio-document.test.tsx`, `src/components/studio/__tests__/studio-shell-controls.test.tsx`, and `src/app/api/chat/__tests__/route.test.ts`.
  - Live browser verification on `/studio` confirmed the shell labels, write/learn mode copy, loading-state fallback credits, Learn-mode doc-type trigger, stage buttons, and completed-vs-active emerald styling.
-->
