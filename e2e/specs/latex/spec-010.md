# latex — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Source Editor Details
- [x] PASS: Source editor highlights the active line and active line gutter simultaneously
- [x] PASS: Source editor enables rectangular selection and search-match highlighting
- [x] PASS: Source editor exposes imperative helpers for `replaceRange`, `scrollToLine`, `getSelection`, `setContent`, `insertAtCursor`, `setDiagnostics`, and `clearDiagnostics`
- [x] PASS: `scrollToLine(line)` clamps the requested line into the valid document range before focusing the editor
- [x] PASS: `setContent(content)` replaces the entire document and resets the selection anchor to position 0
- [x] PASS: `insertAtCursor(text)` removes the currently typed slash-command fragment when one exists on the same line before inserting replacement text
- [x] PASS: Inline diagnostics auto-scroll to the first error severity entry or the first warning when no error exists
- [x] PASS: Slash menu opens only when the text before the cursor is exactly `/`
- [x] PASS: Slash menu remains open while the slash fragment contains no spaces or newlines
- [x] PASS: Slash menu repositions itself as the filter string grows by shifting left based on filter length
- [x] PASS: Slash menu dismisses automatically when the slash token no longer matches the allowed pattern
#### File Tree and Sidebar Details
- [x] PASS: File-tree panel tab state defaults to `files`
- [x] PASS: File-tree panel header label is uppercase `Files`
- [x] PASS: New-file inline input placeholder is `filename or folder/name`
- [x] PASS: New-file creation seeds `.bib` files with `% Add references here\\n` and all other files with an empty string
- [x] PASS: Creating a new file selects it immediately after it is added
- [x] PASS: Empty new-file input closes on blur without creating a file
- [x] PASS: Non-main files expose a hover-only context-menu trigger
- [x] PASS: Main files do not show the `DotsThree` context-menu trigger
- [x] PASS: Rename mode exits without persisting when the new path is blank or unchanged
- [x] PASS: Deleting the currently active non-main file automatically falls back to the main file if one exists
- [x] PASS: Folder rows are collapsed by default until clicked
- [x] PASS: Outline section is expanded by default
- [x] PASS: Outline empty-state text is `No sections found`
- [x] PASS: Outline indent increases by 12 px per section depth level
- [x] PASS: Outline rows expose a hover-only sparkle action when `onDraftSection` is available
- [x] PASS: Clicking an outline sparkle opens the agent panel, switches to the `draft` tab, stores `pendingDraftSection`, and Draft auto-sends after a 50ms delay
#### Mobile and Overlay Behavior
- [x] PASS: Mobile editor/preview toggle bar is rendered only when `isMobile` is true
- [x] PASS: Mobile defaults to showing the editor side first (`mobileShowPreview = false`)
- [x] PASS: Mobile preview view adds a top-right `Back to editor` close button
- [x] PASS: Mobile file-tree toggle button only appears when the file tree is currently closed
- [x] PASS: Mobile AI-panel toggle button only appears when the agent panel is currently closed
- [x] PASS: Mobile file tree opens as a full-screen fixed overlay instead of a narrow sidebar
- [x] PASS: Mobile agent panel opens as a full-screen fixed overlay instead of a narrow sidebar
- [x] PASS: Selecting a file, outline entry, comment jump target, or inserted image from the file-tree overlay closes that overlay on mobile
