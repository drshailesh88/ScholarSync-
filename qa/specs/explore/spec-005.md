# explore — Spec 005

STATUS: PENDING
TESTED: 0/17
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Actions Menu

#### Menu Behavior
- [ ] **Open actions menu** — click three-dots button on result card, verify dropdown appears `[CODE]`
- [ ] **Close on outside click** — open menu, click outside, verify menu closes `[CODE]`
- [ ] **Close on Escape** — open menu, press Escape, verify menu closes and trigger button refocuses `[CODE]`
- [ ] **aria-expanded attribute** — verify trigger button has aria-expanded="true" when open `[CODE]`

#### Menu Items
- [ ] **Save to Library item** — menu shows "Save to Library" with S shortcut badge `[CODE]`
- [ ] **Save hidden when saved** — on an already-saved result, "Save to Library" item is hidden `[CODE]`
- [ ] **Open Original item** — click "Open Original", verify new tab opens with result URL `[CODE]`
- [ ] **More from this source** — click item, verify search bar updates with site: prefix `[CODE]`
- [ ] **Block this source (danger)** — item styled in red, clicking triggers block and shows toast `[CODE]`
- [ ] **Copy Link** — click "Copy Link", verify URL is copied to clipboard `[CODE]`

#### Stub Items (no crash)
- [ ] **Save to Project** — click item, verify no crash (callback not wired) `[CODE-ONLY]`
- [ ] **Cite in Draft** — click item, verify no crash (callback not wired) `[CODE-ONLY]`
- [ ] **Summarize Page** — click item, verify no crash (callback not wired) `[CODE-ONLY]`
- [ ] **Ask About Page** — click item, verify no crash (callback not wired) `[CODE-ONLY]`

#### Menu Separators
- [ ] **Separator before Open Original** — visual divider appears above "Open Original" group `[CODE]`
- [ ] **Separator before Block** — visual divider appears above "Block this source" `[CODE]`
- [ ] **Shortcut badges** — S, C, O, B shortcuts display as kbd badges in menu items `[CODE]`
