# library — Spec 005: Annotations, Projects & Ingestion

STATUS: COMPLETE
TESTED: 22/22
PASS: 22
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/library
MODULE: library

---
### Annotations — Highlights
- [x] **Text selection shows popover** — select text in reader, highlight color popover appears `[CONFIRMED]`
- [x] **Choose highlight color** — click a color dot in popover, highlight applies with chosen color `[CONFIRMED]`
- [x] **Default highlight is yellow** — create highlight without changing color, it renders yellow `[CONFIRMED]`
- [x] **Add note to highlight** — click "Add note" in popover, note textarea appears `[CONFIRMED]`
- [x] **Submit note with Cmd+Enter** — type note text, press Cmd+Enter, note saves `[CONFIRMED]`
- [x] **Cancel highlight popover** — press Escape in popover, popover closes without saving `[CONFIRMED]`

### Annotations — Notes
- [x] **Create general note** — in workbench Notes tab, type note and click submit `[CONFIRMED]`
- [x] **Edit note inline** — click edit icon on existing note, text becomes editable `[CONFIRMED]`
- [x] **Save edited note** — edit note text and click save/Cmd+Enter, note updates `[CONFIRMED]`
- [x] **Delete annotation** — click delete icon on note/highlight, it is removed `[CONFIRMED]`
- [x] **Click highlight jumps** — in workbench Highlights tab, click a highlight, reader scrolls to its position `[CONFIRMED]`

### Project Switching
- [x] **Project dropdown opens** — click project switcher in header, dropdown with project list appears `[CONFIRMED]`
- [x] **Select project re-scopes** — click a project, URL updates to /library/project/[id], sources filter `[CONFIRMED]`
- [x] **All Library option** — click "All Library" in dropdown, exits project scope, shows all sources `[CONFIRMED]`
- [x] **Last active project persists** — select a project, navigate away, return to /library, same project active `[CONFIRMED]`
- [x] **Escape closes dropdown** — with dropdown open, press Escape, dropdown closes `[CONFIRMED]`

### Ingestion — URL Paste
- [x] **Add Source button visible** — "Add Source" button visible in library header `[CONFIRMED]`
- [x] **Add Source dialog opens** — click "Add Source", dialog with URL/PDF tabs appears `[CONFIRMED]`
- [x] **Paste URL and save** — paste a URL, click "Save to Library", success message shows `[CONFIRMED]`
- [x] **Enter submits URL** — type URL and press Enter, form submits `[CONFIRMED]`
- [x] **Escape closes dialog** — press Escape, dialog closes and state resets `[CONFIRMED]`

### Ingestion — PDF Upload
- [x] **PDF upload tab** — click "Upload PDF" tab, file picker area appears `[CONFIRMED]`
