# library — Spec 005: Annotations, Projects & Ingestion

STATUS: PENDING
TESTED: 0/22
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/library
MODULE: library

---
### Annotations — Highlights
- [ ] **Text selection shows popover** — select text in reader, highlight color popover appears `[CONFIRMED]`
- [ ] **Choose highlight color** — click a color dot in popover, highlight applies with chosen color `[CONFIRMED]`
- [ ] **Default highlight is yellow** — create highlight without changing color, it renders yellow `[CONFIRMED]`
- [ ] **Add note to highlight** — click "Add note" in popover, note textarea appears `[CONFIRMED]`
- [ ] **Submit note with Cmd+Enter** — type note text, press Cmd+Enter, note saves `[CONFIRMED]`
- [ ] **Cancel highlight popover** — press Escape in popover, popover closes without saving `[CONFIRMED]`

### Annotations — Notes
- [ ] **Create general note** — in workbench Notes tab, type note and click submit `[CONFIRMED]`
- [ ] **Edit note inline** — click edit icon on existing note, text becomes editable `[CONFIRMED]`
- [ ] **Save edited note** — edit note text and click save/Cmd+Enter, note updates `[CONFIRMED]`
- [ ] **Delete annotation** — click delete icon on note/highlight, it is removed `[CONFIRMED]`
- [ ] **Click highlight jumps** — in workbench Highlights tab, click a highlight, reader scrolls to its position `[CONFIRMED]`

### Project Switching
- [ ] **Project dropdown opens** — click project switcher in header, dropdown with project list appears `[CONFIRMED]`
- [ ] **Select project re-scopes** — click a project, URL updates to /library/project/[id], sources filter `[CONFIRMED]`
- [ ] **All Library option** — click "All Library" in dropdown, exits project scope, shows all sources `[CONFIRMED]`
- [ ] **Last active project persists** — select a project, navigate away, return to /library, same project active `[CONFIRMED]`
- [ ] **Escape closes dropdown** — with dropdown open, press Escape, dropdown closes `[CONFIRMED]`

### Ingestion — URL Paste
- [ ] **Add Source button visible** — "Add Source" button visible in library header `[CONFIRMED]`
- [ ] **Add Source dialog opens** — click "Add Source", dialog with URL/PDF tabs appears `[CONFIRMED]`
- [ ] **Paste URL and save** — paste a URL, click "Save to Library", success message shows `[CONFIRMED]`
- [ ] **Enter submits URL** — type URL and press Enter, form submits `[CONFIRMED]`
- [ ] **Escape closes dialog** — press Escape, dialog closes and state resets `[CONFIRMED]`

### Ingestion — PDF Upload
- [ ] **PDF upload tab** — click "Upload PDF" tab, file picker area appears `[CONFIRMED]`
