# editor — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Comments System
#### New Comment Input
- [ ] Enter to submit, Cancel button available in inline mode

### Version History (Editor page only)
- [ ] **Open** — click "Version History" button in header bar
- [ ] **Panel** — slides in from right side, 384px wide, z-50 overlay
#### Features
- [ ] **Save Current Version** — button at top, prompts for version name (e.g., "Before methods rewrite")
- [ ] **Version list** — shows all versions with:
- [ ] **Preview** — button opens modal showing version content (JSON)
- [ ] **Restore** — confirmation dialog ("Your current content will be saved as a version first"), then restores content to editor
- [ ] **Loading state** — spinner while fetching versions
- [ ] **Empty state** — "No versions yet" message
- [ ] **Close** — X button in header

### Export
#### Editor Page — Export Dialog
- [ ] **Open** — click "Export" button in header bar
- [ ] **Format selection** — DOCX or PDF, visual toggle buttons with icons
- [ ] **Options**:
- [ ] Double-spaced toggle (default: on)
- [ ] Include page numbers toggle (default: on)
- [ ] **DOCX export** — uses `tiptapToDocx()` converter, downloads `.docx` file
- [ ] Includes references from reference store
- [ ] Includes bibliography entries
- [ ] Preserves formatting
- [ ] **PDF export** — uses browser `window.print()`
- [ ] **Cancel** button closes dialog
- [ ] **Exporting...** disabled state during export
#### Studio Page — Export Dropdown
- [ ] **Export as PDF** — POST to `/api/export/pdf`, opens rendered HTML in new window
- [ ] **Export as Word** — POST to `/api/export/docx`, downloads `.doc` file
- [ ] Dropdown closes after selecting an option

### Save System
#### Auto-save
- [ ] **Debounced save** — content saved 2 seconds after last keystroke (configurable via `debounceMs`)
- [ ] **Word count updates immediately** on every keystroke
- [ ] **Cmd+S** — flushes pending save immediately (cancels debounce timer, saves now)
- [ ] Cmd+S prevents default browser save dialog
#### Save Status Indicators
- [ ] **Saving** — pulsing cloud icon + "Saving..."
- [ ] **Saved** — green check + "Saved HH:MM" (refreshes every 30 seconds)
- [ ] **Unsaved** — amber cloud icon + "Unsaved"
- [ ] **Offline** — red wifi-off icon + "Offline"
- [ ] **Saving** — spinning brand icon + "Saving..."
- [ ] **Saved** — green cloud-check + "Saved HH:MM"
