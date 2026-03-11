# latex — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Workspace Loading, Retry, and Default State
- [ ] Main-file detection prefers the first file where `isMain` is truthy
- [ ] When a main file is found during load, store state is hydrated with `activeFileId` and `documentContent`
- [ ] LaTeX editor store defaults are `viewMode = "source"`, `previewMode = "live"`, `editingMode = "edit"`, `fileTreeOpen = false`, `agentPanelOpen = false`, and `agentTab = "draft"`
- [ ] Workspace is wrapped in `YjsCollaborationProvider` with `projectId` and the initial main-file id
#### Top Bar Exact Behavior
- [ ] Top-bar title starts as a button and switches to an inline text input only after click
- [ ] Inline title input auto-focuses and selects the whole title when rename mode opens
- [ ] Title rename persists only on blur or Enter
- [ ] Blank title values are not persisted because `updateLatexProject()` runs only when `projectTitle.trim()` is truthy
- [ ] Save indicator returns `null` for any unrecognized state rather than a generic placeholder
- [ ] Save indicator `saved` state shows the literal word `Saved` plus an optional `HH:MM` timestamp
- [ ] Save indicator `error` state text is `Save failed`, not `Error`
- [ ] Editing-mode buttons are always visible and use blue/amber/slate active styling for `Edit`, `Suggest`, and `View`
- [ ] Editor-mode toggle order is `Visual` then `Source`
- [ ] Preview-mode toggle order is `Live` then `PDF`
- [ ] Compile button text changes to `Compiling...` only while `compileStatus === "compiling"`
- [ ] Compile button is disabled only while `compileStatus === "compiling"`
- [ ] Compile button retains success/error styling after a previous compile until the next compile resets status
- [ ] Export button is an icon-first dropdown trigger with no text label for export format
- [ ] Export dropdown closes on outside click through a `mousedown` document listener
- [ ] Export dropdown options are `Download PDF`, `Download .tex`, and `Download as .zip`
#### Save and Compile Flow Details
- [ ] Typing in the editor updates store content immediately and sets save state to `unsaved` before the debounce elapses
- [ ] Active file content in the local `files` array is updated immediately on every editor change so the file tree stays in sync
- [ ] Debounced autosave delay is 1500 ms
- [ ] Debounced autosave saves only the current active file id from store, not every open file
- [ ] `Cmd/Ctrl+S` performs an immediate save using the current store-backed `documentContent`
- [ ] `Cmd/Ctrl+S` does nothing when there is no active file id or when content is empty
- [ ] Compile always tries to save the current file once before sending the compile request
- [ ] Compile clears previous diagnostics and inline gutter markers before each new attempt
- [ ] Rate-limited compile responses (`429`) surface a retry message using the `Retry-After` header and retry automatically
- [ ] Compiler-service failures (`502`, `503`, `504`) retry up to two times before showing the friendly service-unavailable message
- [ ] Generic network failures retry up to two times and eventually surface `Unable to compile after multiple attempts. Check your connection and try again.`
- [ ] Successful compile stores a blob URL in `compiledPdfUrl`, sets compile status to `success`, and switches preview mode to `pdf`
- [ ] Failed compile responses with `errors` push diagnostics into both the workspace error panel and the CodeMirror lint layer
#### Source Editor Details
- [ ] Source editor uses a CodeMirror monospace stack beginning with `JetBrains Mono`
- [ ] Source editor line numbers and fold gutter are always enabled
