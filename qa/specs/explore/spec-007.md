# explore — Spec 007

STATUS: PARTIAL
TESTED: 21/22
PASS: 14
FAIL: 7
BLOCKED: 1
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Keyboard Navigation

#### Result Navigation
- [ ] FAIL: **j moves highlight down** — press j, verify next result card gets highlight ring `[CODE]`
- [ ] FAIL: **k moves highlight up** — press k, verify previous result card gets highlight ring `[CODE]`
- [ ] FAIL: **ArrowDown moves highlight down** — press ArrowDown, same as j `[CODE]`
- [ ] FAIL: **ArrowUp moves highlight up** — press ArrowUp, same as k `[CODE]`
- [x] PASS: **Highlight scrolls into view** — navigate to off-screen result, verify it scrolls into view smoothly `[CODE]`
- [x] PASS: **Highlight resets on tab change** — switch tabs, verify highlight resets to -1 (none) `[CODE]`
- [x] PASS: **j stops at last result** — on last result, pressing j does not advance further `[CODE]`
- [x] PASS: **k stops at first result** — on first result, pressing k does not go negative `[CODE]`

#### Selection
- [x] PASS: **X toggles selection** — highlight a result, press X, verify selection ring appears `[CODE]`
- [x] PASS: **X deselects** — on selected result, press X again, verify selection ring removed `[CODE]`
- [ ] FAIL: **Shift+ArrowDown extends selection** — press Shift+Down, verify selection extends to next result `[CODE]`
- [ ] FAIL: **Shift+ArrowUp extends selection** — press Shift+Up, verify selection extends upward `[CODE]`
- [x] PASS: **Selection resets on tab change** — select results, switch tabs, verify selection clears `[CODE]`

#### Action Shortcuts
- [x] PASS: **S saves highlighted result** — highlight a result, press S, verify save executes and toast shows `[CODE]`
- [x] PASS: **O opens highlighted result** — highlight a result, press O, verify new tab opens with result URL `[CODE]`
- [x] PASS: **B blocks highlighted source** — highlight a result, press B, verify block toast shows `[CODE]`
- [x] PASS: **I toggles source info** — highlight a result, press I, verify source info panel toggles `[CODE]`
- [ ] BLOCKED: **C cite shortcut** — highlight a result, press C, verify no crash (stub) `[CODE-ONLY]`

#### Guards
- [x] PASS: **No shortcuts when input focused** — focus search bar, press j/k, verify no result navigation `[CODE]`
- [x] PASS: **Escape blurs input** — focus search bar, press Escape, verify input loses focus `[CODE]`
- [ ] FAIL: **No shortcuts with Cmd/Ctrl** — press Cmd+S, verify no save action (browser default allowed) `[CODE]`
- [x] PASS: **/ focuses search bar** — press /, verify search input gains focus `[CODE]`
