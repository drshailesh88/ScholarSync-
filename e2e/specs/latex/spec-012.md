# latex — Spec 012

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Agent Panel Details
- [ ] Cite-tab result click copies `\\cite{key}` to the clipboard and dispatches `latex:insert-bibtex`
- [ ] Cite-tab copied state text is `Copied \\cite{key}` for the last clicked result only
- [ ] Check-tab primary button label is `Run LaTeX Checks`
- [ ] Check-tab initial helper text reads `Check for unused refs, missing labels, package conflicts, and more.`
#### Actual Current Behavior Corrections
- [ ] File tree and agent panel are both closed by default; the workspace does not open with permanent left and right sidebars already expanded
- [ ] Export PDF downloads only when a compiled PDF blob URL already exists; the export action does not trigger a fresh compile automatically
- [ ] Source mode is the real default editor mode; visual mode is opt-in
- [ ] Live preview is the real default preview mode; PDF preview is selected automatically only after a successful compile
- [ ] Project deletion is still confirmation-free on the list page, but file deletion in `file-tree.tsx` does use `window.confirm(...)`
- [ ] Slash-command menu has no explicit `No commands` empty-state row; it simply unmounts when there are no matches
- [ ] Draft-tab and cite-tab request failures are largely silent in the current UI instead of surfacing inline error banners
- [ ] The workspace mobile experience relies on full-screen overlays and an Editor/Preview switcher rather than a simultaneous multi-column layout
#### Editor Page (`[projectId]/page.tsx`) — Loading & Error States
- [ ] Error card title text is exactly "Unable to open this paper"
- [ ] Error card fallback text when `error` state is null: "This LaTeX workspace could not be loaded yet. Try again once the project finishes initializing."
- [ ] Catch block uses the thrown error's `.message` when it is an Error instance; otherwise shows "Unable to load this LaTeX workspace right now."
- [ ] Error card "Retry" button includes an ArrowClockwise icon (size 16)
- [ ] Error card "Back to Papers" button text is exactly "Back to Papers"
- [ ] useEffect cleanup sets a `cancelled` flag to prevent state updates after unmount
- [ ] Loading spinner text below the CircleNotch reads "Loading editor..."
#### Workspace — Compile Error Banner
- [ ] A separate amber compile-error banner renders above the editor (below the top bar) whenever `compileError` is non-null
- [ ] Compile-error banner uses a WarningCircle icon (size 14) and 11px amber text
- [ ] Compile-error banner is distinct from the error-gutter panel below the editor
#### Workspace — BibTeX Sync
- [ ] `getBibContent` callback finds the first file in the `files` array whose path ends with `.bib`
- [ ] `setBibContent` store action is called via useEffect whenever the files array changes, keeping store bib content in sync
#### Workspace — AI Error Fix Flow (`handleFixError`)
- [ ] Error fix extracts context as error line ±2 lines (5 lines total: `errorLineIdx - 2` to `errorLineIdx + 3`)
- [ ] Error fix POSTs to `/api/latex/generate` with `{ command: "fix", description: context, errorMessage: diagnostic.message }`
- [ ] Error fix streams the response body and replaces the context range in the CodeMirror editor
- [ ] When the editor view is unavailable, the fix text is copied to the clipboard as fallback
- [ ] Error fix errors are caught silently (no toast or error banner)
#### Error Gutter Panel — Expanded Details
- [ ] Error gutter panel returns `null` (renders nothing) when the diagnostics array is empty
- [ ] Fix button appears only for errors (not warnings), only when `onFixError` is provided, and only when the diagnostic has a non-null line number
- [ ] Fix button icon sequence: Wrench → spinning CircleNotch (2000ms) → green Check (2000ms) → resets
- [ ] Clicking an error row toggles expanded/collapsed state (CaretRight → CaretDown)
- [ ] Expanded detail shows raw error message in monospace font when enriched explanation differs from raw
- [ ] Expanded detail shows a Lightbulb icon + suggestion in emerald text when a fix suggestion is available
