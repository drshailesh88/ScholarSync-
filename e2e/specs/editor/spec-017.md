# editor — Spec 017

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### AcademicEditor, TopBar, and Floating Tooling
- [ ] Academic editor non-H1 heading placeholder reads `Section heading...`
- [ ] Academic editor root `EditorContent` class includes `prose prose-lg`
- [ ] Academic editor root enables browser spellcheck via `spellcheck="true"`
- [ ] `Cmd/Ctrl+S` inside `AcademicEditor` calls the route `flushSave()` path and prevents the browser default
- [ ] Initial editor-content hydration only runs when the current editor text is still blank
- [ ] Initial outline bootstrapping waits 300 ms after mount before scanning headings
- [ ] Initial outline bootstrapping clears the outline store when the document has fewer than two headings
- [ ] `AcademicEditor` recalculates and stores comment counts whenever `documentId` changes
- [ ] `AcademicEditor` syncs the top-bar reference badge count from the `referenceCount` prop
- [ ] `scholarsync:editor-action` with `add-comment` opens the comment sidebar first if it is closed
- [ ] `scholarsync:editor-action` with `add-comment` always dispatches `scholarsync:new-inline-comment` after opening the sidebar
- [ ] `scholarsync:editor-action` with `toggle-comment-sidebar` toggles the sidebar without changing the selection
- [ ] `scholarsync:editor-action` with `insert-citation` forwards directly to `onOpenCitationDialog`
- [ ] `scholarsync:editor-action` with `toggle-reference-sidebar` forwards directly to `onToggleReferenceSidebar`
- [ ] TopBar undo button title is exactly `Undo`
- [ ] TopBar redo button title is exactly `Redo`
- [ ] TopBar undo button is disabled when `editor.can().undo()` is false
- [ ] TopBar redo button is disabled when `editor.can().redo()` is false
- [ ] TopBar mode dropdown options are exactly `Editing` and `Viewing`
- [ ] TopBar mode option `Editing` description reads `Direct changes to document`
- [ ] TopBar mode option `Viewing` description reads `Read-only, no edits`
- [ ] Switching TopBar mode to `Viewing` calls `editor.setEditable(false)`
- [ ] Switching TopBar mode back to `Editing` calls `editor.setEditable(true)`
- [ ] TopBar mode dropdown uses a fixed fullscreen click-catcher to dismiss
- [ ] TopBar word-count button title reads `Click for section breakdown`
- [ ] TopBar section-breakdown popover closes on outside mouse down
- [ ] TopBar saved state renders only `saved`, `saving`, `unsaved`, and `offline`; it has no dedicated `error` or `local` branch
- [ ] TopBar keyboard-help button title is `Keyboard shortcuts (Cmd+/)`
#### Selection Toolbar and Link Popover
- [ ] SelectionToolbar renders only when the current selection is non-empty
- [ ] Clearing the text selection hides the floating toolbar entirely
- [ ] Clearing the text selection also closes the style dropdown and highlight palette
- [ ] SelectionToolbar positions itself using `coordsAtPos(selection.from)`
- [ ] SelectionToolbar delays blur-close by 150 ms to allow button interactions inside the toolbar
- [ ] Style dropdown current label resolves in priority order `Heading 4`, `Heading 3`, `Heading 2`, `Heading 1`, then `Normal text`
- [ ] Style dropdown button minimum width is 90 px
