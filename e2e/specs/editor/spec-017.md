# editor — Spec 017

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### AcademicEditor, TopBar, and Floating Tooling
- [x] PASS: Academic editor non-H1 heading placeholder reads `Section heading...`
- [x] PASS: Academic editor root `EditorContent` class includes `prose prose-lg`
- [x] PASS: Academic editor root enables browser spellcheck via `spellcheck="true"`
- [x] PASS: `Cmd/Ctrl+S` inside `AcademicEditor` calls the route `flushSave()` path and prevents the browser default
- [x] PASS: Initial editor-content hydration only runs when the current editor text is still blank
- [x] PASS: Initial outline bootstrapping waits 300 ms after mount before scanning headings
- [x] PASS: Initial outline bootstrapping clears the outline store when the document has fewer than two headings
- [x] PASS: `AcademicEditor` recalculates and stores comment counts whenever `documentId` changes
- [x] PASS: `AcademicEditor` syncs the top-bar reference badge count from the `referenceCount` prop
- [x] PASS: `scholarsync:editor-action` with `add-comment` opens the comment sidebar first if it is closed
- [x] PASS: `scholarsync:editor-action` with `add-comment` always dispatches `scholarsync:new-inline-comment` after opening the sidebar
- [x] PASS: `scholarsync:editor-action` with `toggle-comment-sidebar` toggles the sidebar without changing the selection
- [x] PASS: `scholarsync:editor-action` with `insert-citation` forwards directly to `onOpenCitationDialog`
- [x] PASS: `scholarsync:editor-action` with `toggle-reference-sidebar` forwards directly to `onToggleReferenceSidebar`
- [x] PASS: TopBar undo button title is exactly `Undo`
- [x] PASS: TopBar redo button title is exactly `Redo`
- [x] PASS: TopBar undo button is disabled when `editor.can().undo()` is false
- [x] PASS: TopBar redo button is disabled when `editor.can().redo()` is false
- [x] PASS: TopBar mode dropdown options are exactly `Editing` and `Viewing`
- [x] PASS: TopBar mode option `Editing` description reads `Direct changes to document`
- [x] PASS: TopBar mode option `Viewing` description reads `Read-only, no edits`
- [x] PASS: Switching TopBar mode to `Viewing` calls `editor.setEditable(false)`
- [x] PASS: Switching TopBar mode back to `Editing` calls `editor.setEditable(true)`
- [x] PASS: TopBar mode dropdown uses a fixed fullscreen click-catcher to dismiss
- [x] PASS: TopBar word-count button title reads `Click for section breakdown`
- [x] PASS: TopBar section-breakdown popover closes on outside mouse down
- [x] PASS: TopBar saved state renders only `saved`, `saving`, `unsaved`, and `offline`; it has no dedicated `error` or `local` branch
- [x] PASS: TopBar keyboard-help button title is `Keyboard shortcuts (Cmd+/)`
#### Selection Toolbar and Link Popover
- [x] PASS: SelectionToolbar renders only when the current selection is non-empty
- [x] PASS: Clearing the text selection hides the floating toolbar entirely
- [x] PASS: Clearing the text selection also closes the style dropdown and highlight palette
- [x] PASS: SelectionToolbar positions itself using `coordsAtPos(selection.from)`
- [x] PASS: SelectionToolbar delays blur-close by 150 ms to allow button interactions inside the toolbar
- [x] PASS: Style dropdown current label resolves in priority order `Heading 4`, `Heading 3`, `Heading 2`, `Heading 1`, then `Normal text`
- [x] PASS: Style dropdown button minimum width is 90 px
