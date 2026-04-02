# library — Spec 003: Workflow States & Undo

STATUS: PENDING
TESTED: 0/13
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/library/inbox
MODULE: library

---
### Workflow State Transitions
- [ ] **Move source between states** — use card menu to move from Inbox to Core, source appears in Core view `[CONFIRMED]`
- [ ] **Sidebar counts update optimistically** — after moving source, sidebar count decrements/increments immediately `[CONFIRMED]`
- [ ] **Undo toast appears** — after moving a source, toast with "Moved to [state]" and Undo link appears `[CONFIRMED]`
- [ ] **Countdown progress bar** — undo toast shows a shrinking progress bar over 5-8 seconds `[CONFIRMED]`
- [ ] **Click undo reverts move** — click "Undo" on toast, source returns to previous state `[CONFIRMED]`
- [ ] **Toast auto-dismisses** — after countdown expires, toast disappears automatically `[CONFIRMED]`
- [ ] **Bulk send to editor** — select multiple cards, click "Send to Editor" in toolbar `[CONFIRMED]`
- [ ] **Clear selection** — click X in bulk toolbar, all selections cleared `[CONFIRMED]`

### Trash & Deletion
- [ ] **Delete sends to trash** — delete a source, it disappears from list and appears in /library/trash `[CONFIRMED]`
- [ ] **Restore from trash** — click Restore button on a trashed item, it returns to inbox `[CONFIRMED]`
- [ ] **Permanent delete confirmation** — click delete on trash item, confirmation dialog appears `[CONFIRMED]`
- [ ] **Confirm permanent delete** — click confirm in dialog, source is permanently removed `[CONFIRMED]`
- [ ] **Cancel permanent delete** — click cancel in confirmation dialog, source remains in trash `[CONFIRMED]`
