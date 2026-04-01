# explore — Spec 007

STATUS: PENDING
TESTED: 0/22
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Keyboard Navigation

#### Result Navigation
- [ ] **j moves highlight down** — press j, verify next result card gets highlight ring `[CODE]`
- [ ] **k moves highlight up** — press k, verify previous result card gets highlight ring `[CODE]`
- [ ] **ArrowDown moves highlight down** — press ArrowDown, same as j `[CODE]`
- [ ] **ArrowUp moves highlight up** — press ArrowUp, same as k `[CODE]`
- [ ] **Highlight scrolls into view** — navigate to off-screen result, verify it scrolls into view smoothly `[CODE]`
- [ ] **Highlight resets on tab change** — switch tabs, verify highlight resets to -1 (none) `[CODE]`
- [ ] **j stops at last result** — on last result, pressing j does not advance further `[CODE]`
- [ ] **k stops at first result** — on first result, pressing k does not go negative `[CODE]`

#### Selection
- [ ] **X toggles selection** — highlight a result, press X, verify selection ring appears `[CODE]`
- [ ] **X deselects** — on selected result, press X again, verify selection ring removed `[CODE]`
- [ ] **Shift+ArrowDown extends selection** — press Shift+Down, verify selection extends to next result `[CODE]`
- [ ] **Shift+ArrowUp extends selection** — press Shift+Up, verify selection extends upward `[CODE]`
- [ ] **Selection resets on tab change** — select results, switch tabs, verify selection clears `[CODE]`

#### Action Shortcuts
- [ ] **S saves highlighted result** — highlight a result, press S, verify save executes and toast shows `[CODE]`
- [ ] **O opens highlighted result** — highlight a result, press O, verify new tab opens with result URL `[CODE]`
- [ ] **B blocks highlighted source** — highlight a result, press B, verify block toast shows `[CODE]`
- [ ] **I toggles source info** — highlight a result, press I, verify source info panel toggles `[CODE]`
- [ ] **C cite shortcut** — highlight a result, press C, verify no crash (stub) `[CODE-ONLY]`

#### Guards
- [ ] **No shortcuts when input focused** — focus search bar, press j/k, verify no result navigation `[CODE]`
- [ ] **Escape blurs input** — focus search bar, press Escape, verify input loses focus `[CODE]`
- [ ] **No shortcuts with Cmd/Ctrl** — press Cmd+S, verify no save action (browser default allowed) `[CODE]`
- [ ] **/ focuses search bar** — press /, verify search input gains focus `[CODE]`
