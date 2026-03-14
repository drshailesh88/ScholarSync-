# latex — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Agent Panel Details
- [x] PASS: Cite-tab result click copies `\\cite{key}` to the clipboard and dispatches `latex:insert-bibtex`
- [x] PASS: Cite-tab copied state text is `Copied \\cite{key}` for the last clicked result only
- [x] PASS: Check-tab primary button label is `Run LaTeX Checks`
- [x] PASS: Check-tab initial helper text reads `Check for unused refs, missing labels, package conflicts, and more.`
#### Actual Current Behavior Corrections
- [x] PASS: File tree and agent panel are both closed by default; the workspace does not open with permanent left and right sidebars already expanded
- [x] PASS: Export PDF downloads only when a compiled PDF blob URL already exists; the export action does not trigger a fresh compile automatically
- [x] PASS: Source mode is the real default editor mode; visual mode is opt-in
- [x] PASS: Live preview is the real default preview mode; PDF preview is selected automatically only after a successful compile
- [x] PASS: Project deletion is still confirmation-free on the list page, but file deletion in `file-tree.tsx` does use `window.confirm(...)`
- [x] PASS: Slash-command menu has no explicit `No commands` empty-state row; it simply unmounts when there are no matches
- [x] PASS: Draft-tab and cite-tab request failures are largely silent in the current UI instead of surfacing inline error banners
- [x] PASS: The workspace mobile experience relies on full-screen overlays and an Editor/Preview switcher rather than a simultaneous multi-column layout
#### Editor Page (`[projectId]/page.tsx`) — Loading & Error States
- [x] PASS: Error card title text is exactly "Unable to open this paper"
- [x] PASS: Error card fallback text when `error` state is null: "This LaTeX workspace could not be loaded yet. Try again once the project finishes initializing."
- [x] PASS: Catch block uses the thrown error's `.message` when it is an Error instance; otherwise shows "Unable to load this LaTeX workspace right now."
- [x] PASS: Error card "Retry" button includes an ArrowClockwise icon (size 16)
- [x] PASS: Error card "Back to Papers" button text is exactly "Back to Papers"
- [x] PASS: useEffect cleanup sets a `cancelled` flag to prevent state updates after unmount
- [x] PASS: Loading spinner text below the CircleNotch reads "Loading editor..."
#### Workspace — Compile Error Banner
- [x] PASS: A separate amber compile-error banner renders above the editor (below the top bar) whenever `compileError` is non-null
- [x] PASS: Compile-error banner uses a WarningCircle icon (size 14) and 11px amber text
- [x] PASS: Compile-error banner is distinct from the error-gutter panel below the editor
#### Workspace — BibTeX Sync
- [x] PASS: `getBibContent` callback finds the first file in the `files` array whose path ends with `.bib`
- [x] PASS: `setBibContent` store action is called via useEffect whenever the files array changes, keeping store bib content in sync
#### Workspace — AI Error Fix Flow (`handleFixError`)
- [x] PASS: Error fix extracts context as error line ±2 lines (5 lines total: `errorLineIdx - 2` to `errorLineIdx + 3`)
- [x] PASS: Error fix POSTs to `/api/latex/generate` with `{ command: "fix", description: context, errorMessage: diagnostic.message }`
- [x] PASS: Error fix streams the response body and replaces the context range in the CodeMirror editor
- [x] PASS: When the editor view is unavailable, the fix text is copied to the clipboard as fallback
- [x] PASS: Error fix errors are caught silently (no toast or error banner)
#### Error Gutter Panel — Expanded Details
- [x] PASS: Error gutter panel returns `null` (renders nothing) when the diagnostics array is empty
- [x] PASS: Fix button appears only for errors (not warnings), only when `onFixError` is provided, and only when the diagnostic has a non-null line number
- [x] PASS: Fix button icon sequence: Wrench → spinning CircleNotch (2000ms) → green Check (2000ms) → resets
- [x] PASS: Clicking an error row toggles expanded/collapsed state (CaretRight → CaretDown)
- [x] PASS: Expanded detail shows raw error message in monospace font when enriched explanation differs from raw
- [x] PASS: Expanded detail shows a Lightbulb icon + suggestion in emerald text when a fix suggestion is available
