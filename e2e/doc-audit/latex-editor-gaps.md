# LaTeX Editor — Feature Doc Gaps

**Original doc:** `LATEX_EDITOR_FEATURES_TESTING.md`
**Original checkbox count:** 241
**Features found in UI:** 321
**Features found in source code:** 386
**Missing from doc:** 145
**Completeness of original doc:** 62.4%

## Missing Features

### Project List and New-Paper Flow
- [ ] Project-list loading state is a spinner-only center block with no text label
- [ ] Project-list delete is optimistic, hover-revealed, and has no confirmation prompt
- [ ] Compiler labels on project cards fall back to `pdflatex` when null
- [ ] New-paper form keeps `title` empty by default and only falls back to `Untitled Paper` at submit time
- [ ] Successful new-paper creation keeps `creating` true until navigation replaces the page

### Workspace Defaults and Loading
- [ ] Workspace load retries three total times with 300/600/900 ms backoff before showing the error card
- [ ] Store defaults are `source` view, `live` preview, `edit` mode, closed file tree, closed agent panel, and `draft` agent tab
- [ ] Main-file detection hydrates both `activeFileId` and `documentContent` when the project loads
- [ ] Retry action on the error card bumps a `reloadToken` instead of forcing a full page reload

### Save, Compile, and Export Details
- [ ] Typing sets save state to `unsaved` immediately and saves after a 1500 ms debounce
- [ ] `Cmd/Ctrl+S` saves only the active file from store and no-ops when file id or content is missing
- [ ] Compile clears prior diagnostics before each run and auto-switches preview to `pdf` only on success
- [ ] `429`, `502/503/504`, and network failures each follow different retry/error messaging paths
- [ ] Export PDF only downloads an already-compiled blob URL; it does not compile on demand

### Source Editor, Slash Menu, and Inline AI
- [ ] Source editor imperative API includes `insertAtCursor`, `scrollToLine`, `setDiagnostics`, and `clearDiagnostics`
- [ ] Slash menu opens only on an isolated `/` token, repositions while filtering, and unmounts entirely when no commands match
- [ ] Inline AI shows four preset chips, streams suggestions inline, and treats Escape as revert-before-dismiss once a result exists
- [ ] Accepting inline AI is blocked for result strings that begin with `Error:`

### File Tree, Mobile Overlays, and Agent Panel
- [ ] File-tree outline is expanded by default and exposes hover-only `Draft Section` sparkle actions
- [ ] New `.bib` files are seeded with `% Add references here`
- [ ] Mobile file tree and agent panel use full-screen overlays, not narrow sidebars
- [ ] Mobile workflow uses an Editor/Preview switcher with explicit close buttons for overlays and preview
- [ ] Agent panel tabs are `draft`, `learn`, `cite`, and `check`, with `draft` as the default tab

## Features in doc that DON'T EXIST in the app
- The workspace does not open with file tree and agent panel already expanded; both are closed by default.
- Exporting PDF does not trigger a fresh compile automatically; it only downloads when a compiled PDF blob URL already exists.
- Slash-command filtering does not show a `No commands` empty-state row; the menu simply unmounts when there are no matches.
- Draft-tab and cite-tab failures do not currently render inline error banners; most request failures are silent.
- The mobile workspace is not a simultaneous four-panel layout; it switches between editor and preview and uses full-screen overlays for side panels.
