# latex — Spec 017

STATUS: DONE
TESTED: 11/11
PASS: 11
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Behavior Corrections (Pass 2)
- [x] PASS: **File delete DOES have a confirmation dialog**: `window.confirm("Delete {path}?")` is called in file-tree.tsx — the Codex audit statement "Project and file deletions currently have no confirmation dialog" is only correct for project deletion (page.tsx), not file deletion
- [x] PASS: **Draft-tab auto-send for section drafting uses a 50ms setTimeout**, not a custom event dispatch — the existing doc mentions `latex:draft-section` event but the actual mechanism is `pendingDraftSection` store state consumed by a useEffect
#### Components Referenced But Not Rendered
- [x] PASS: `SourceEditor` does not import the custom completions from `completions.ts`; current editor behavior comes from `codemirror-lang-latex` plus CodeMirror built-ins
- [x] PASS: `SourceEditor` does not import `ai-completion-extension.ts`; ghost-text AI completion is not active in the current workspace
- [x] PASS: `SourceEditor` does not import `track-changes-extension.ts`; switching to `Suggest` mode changes store state only and does not mount inline diff decorations
- [x] PASS: `Cmd/Ctrl+S` manual save does not clear `saveTimerRef`, so a pending autosave can still fire after the manual save completes
- [x] PASS: Export PDF is not visually disabled when no compiled PDF exists; `handleExportPdf()` simply returns early when `compiledPdfUrl` is null
- [x] PASS: Compiled PDF blob URLs created after successful compile are never revoked on replacement or unmount; only ad hoc `.tex` / `.zip` export URLs are cleaned up
- [x] PASS: `createAddToDictionaryAction()` points at `/api/latex/spell-check/add`, but there is no matching API route under `src/app/api/latex/spell-check/add`
- [x] PASS: `/latex`, `/latex/new`, and `/latex/[projectId]` currently have no route-level `loading.tsx` or `error.tsx`; recovery is handled inline at the page and component level
- [x] PASS: Several icon-only controls rely on `title` tooltips instead of explicit `aria-label`s; the new-file type select is the notable exception with a dedicated accessibility label
