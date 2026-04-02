# library — Spec 003: Workflow States & Undo

STATUS: COMPLETE
TESTED: 13/13
PASS: 13
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/library/inbox
MODULE: library

---
### Workflow State Transitions
- [x] **Move source between states** — use card menu to move from Inbox to Core, source appears in Core view `[CONFIRMED]`
- [x] **Sidebar counts update optimistically** — after moving source, sidebar count decrements/increments immediately `[CONFIRMED]`
- [x] **Undo toast appears** — after moving a source, toast with "Moved to [state]" and Undo link appears `[CONFIRMED]`
- [x] **Countdown progress bar** — undo toast shows a shrinking progress bar over 5-8 seconds `[CONFIRMED]`
- [x] **Click undo reverts move** — click "Undo" on toast, source returns to previous state `[CONFIRMED]`
- [x] **Toast auto-dismisses** — after countdown expires, toast disappears automatically `[CONFIRMED]`
- [x] **Bulk send to editor** — select multiple cards, click "Send to Editor" in toolbar `[CONFIRMED]`
- [x] **Clear selection** — click X in bulk toolbar, all selections cleared `[CONFIRMED]`

### Trash & Deletion
- [x] **Delete sends to trash** — delete a source, it disappears from list and appears in /library/trash `[CONFIRMED]`
- [x] **Restore from trash** — click Restore button on a trashed item, it returns to inbox `[CONFIRMED]`
- [x] **Permanent delete confirmation** — click delete on trash item, confirmation dialog appears `[CONFIRMED]`
- [x] **Confirm permanent delete** — click confirm in dialog, source is permanently removed `[CONFIRMED]`
- [x] **Cancel permanent delete** — click cancel in confirmation dialog, source remains in trash `[CONFIRMED]`
