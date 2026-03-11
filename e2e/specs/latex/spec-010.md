# latex — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Source Editor Details
- [ ] Source editor highlights the active line and active line gutter simultaneously
- [ ] Source editor enables rectangular selection and search-match highlighting
- [ ] Source editor exposes imperative helpers for `replaceRange`, `scrollToLine`, `getSelection`, `setContent`, `insertAtCursor`, `setDiagnostics`, and `clearDiagnostics`
- [ ] `scrollToLine(line)` clamps the requested line into the valid document range before focusing the editor
- [ ] `setContent(content)` replaces the entire document and resets the selection anchor to position 0
- [ ] `insertAtCursor(text)` removes the currently typed slash-command fragment when one exists on the same line before inserting replacement text
- [ ] Inline diagnostics auto-scroll to the first error severity entry or the first warning when no error exists
- [ ] Slash menu opens only when the text before the cursor is exactly `/`
- [ ] Slash menu remains open while the slash fragment contains no spaces or newlines
- [ ] Slash menu repositions itself as the filter string grows by shifting left based on filter length
- [ ] Slash menu dismisses automatically when the slash token no longer matches the allowed pattern
#### File Tree and Sidebar Details
- [ ] File-tree panel tab state defaults to `files`
- [ ] File-tree panel header label is uppercase `Files`
- [ ] New-file inline input placeholder is `filename or folder/name`
- [ ] New-file creation seeds `.bib` files with `% Add references here\\n` and all other files with an empty string
- [ ] Creating a new file selects it immediately after it is added
- [ ] Empty new-file input closes on blur without creating a file
- [ ] Non-main files expose a hover-only context-menu trigger
- [ ] Main files do not show the `DotsThree` context-menu trigger
- [ ] Rename mode exits without persisting when the new path is blank or unchanged
- [ ] Deleting the currently active non-main file automatically falls back to the main file if one exists
- [ ] Folder rows are collapsed by default until clicked
- [ ] Outline section is expanded by default
- [ ] Outline empty-state text is `No sections found`
- [ ] Outline indent increases by 12 px per section depth level
- [ ] Outline rows expose a hover-only sparkle action when `onDraftSection` is available
- [ ] Clicking an outline sparkle opens the agent panel, switches to the `draft` tab, stores `pendingDraftSection`, and Draft auto-sends after a 50ms delay
#### Mobile and Overlay Behavior
- [ ] Mobile editor/preview toggle bar is rendered only when `isMobile` is true
- [ ] Mobile defaults to showing the editor side first (`mobileShowPreview = false`)
- [ ] Mobile preview view adds a top-right `Back to editor` close button
- [ ] Mobile file-tree toggle button only appears when the file tree is currently closed
- [ ] Mobile AI-panel toggle button only appears when the agent panel is currently closed
- [ ] Mobile file tree opens as a full-screen fixed overlay instead of a narrow sidebar
- [ ] Mobile agent panel opens as a full-screen fixed overlay instead of a narrow sidebar
- [ ] Selecting a file, outline entry, comment jump target, or inserted image from the file-tree overlay closes that overlay on mobile
