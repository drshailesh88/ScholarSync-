# latex — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Workspace Loading, Retry, and Default State
- [x] PASS: Main-file detection prefers the first file where `isMain` is truthy
- [x] PASS: When a main file is found during load, store state is hydrated with `activeFileId` and `documentContent`
- [x] PASS: LaTeX editor store defaults are `viewMode = "source"`, `previewMode = "live"`, `editingMode = "edit"`, `fileTreeOpen = false`, `agentPanelOpen = false`, and `agentTab = "draft"`
- [x] PASS: Workspace is wrapped in `YjsCollaborationProvider` with `projectId` and the initial main-file id
#### Top Bar Exact Behavior
- [x] PASS: Top-bar title starts as a button and switches to an inline text input only after click
- [x] PASS: Inline title input auto-focuses and selects the whole title when rename mode opens
- [x] PASS: Title rename persists only on blur or Enter
- [x] PASS: Blank title values are not persisted because `updateLatexProject()` runs only when `projectTitle.trim()` is truthy
- [x] PASS: Save indicator returns `null` for any unrecognized state rather than a generic placeholder
- [x] PASS: Save indicator `saved` state shows the literal word `Saved` plus an optional `HH:MM` timestamp
- [x] PASS: Save indicator `error` state text is `Save failed`, not `Error`
- [x] PASS: Editing-mode buttons are always visible and use blue/amber/slate active styling for `Edit`, `Suggest`, and `View`
- [x] PASS: Editor-mode toggle order is `Visual` then `Source`
- [x] PASS: Preview-mode toggle order is `Live` then `PDF`
- [x] PASS: Compile button text changes to `Compiling...` only while `compileStatus === "compiling"`
- [x] PASS: Compile button is disabled only while `compileStatus === "compiling"`
- [x] PASS: Compile button retains success/error styling after a previous compile until the next compile resets status
- [x] PASS: Export button is an icon-first dropdown trigger with no text label for export format
- [x] PASS: Export dropdown closes on outside click through a `mousedown` document listener
- [x] PASS: Export dropdown options are `Download PDF`, `Download .tex`, and `Download as .zip`
#### Save and Compile Flow Details
- [x] PASS: Typing in the editor updates store content immediately and sets save state to `unsaved` before the debounce elapses
- [x] PASS: Active file content in the local `files` array is updated immediately on every editor change so the file tree stays in sync
- [x] PASS: Debounced autosave delay is 1500 ms
- [x] PASS: Debounced autosave saves only the current active file id from store, not every open file
- [x] PASS: `Cmd/Ctrl+S` performs an immediate save using the current store-backed `documentContent`
- [x] PASS: `Cmd/Ctrl+S` does nothing when there is no active file id or when content is empty
- [x] PASS: Compile always tries to save the current file once before sending the compile request
- [x] PASS: Compile clears previous diagnostics and inline gutter markers before each new attempt
- [x] PASS: Rate-limited compile responses (`429`) surface a retry message using the `Retry-After` header and retry automatically
- [x] PASS: Compiler-service failures (`502`, `503`, `504`) retry up to two times before showing the friendly service-unavailable message
- [x] PASS: Generic network failures retry up to two times and eventually surface `Unable to compile after multiple attempts. Check your connection and try again.`
- [x] PASS: Successful compile stores a blob URL in `compiledPdfUrl`, sets compile status to `success`, and switches preview mode to `pdf`
- [x] PASS: Failed compile responses with `errors` push diagnostics into both the workspace error panel and the CodeMirror lint layer
#### Source Editor Details
- [x] PASS: Source editor uses a CodeMirror monospace stack beginning with `JetBrains Mono`
- [x] PASS: Source editor line numbers and fold gutter are always enabled
