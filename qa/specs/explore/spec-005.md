# explore — Spec 005

STATUS: COMPLETE
TESTED: 13/17
PASS: 13
FAIL: 0
BLOCKED: 4
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Actions Menu

#### Menu Behavior
- [x] PASS: **Open actions menu** — click three-dots button on result card, verify dropdown appears `[CODE]`
- [x] PASS: **Close on outside click** — open menu, click outside, verify menu closes `[CODE]`
- [x] PASS: **Close on Escape** — open menu, press Escape, verify menu closes and trigger button refocuses `[CODE]`
- [x] PASS: **aria-expanded attribute** — verify trigger button has aria-expanded="true" when open `[CODE]`

#### Menu Items
- [x] PASS: **Save to Library item** — menu shows "Save to Library" with S shortcut badge `[CODE]`
- [x] PASS: **Save hidden when saved** — on an already-saved result, "Save to Library" item is hidden `[CODE]`
- [x] PASS: **Open Original item** — click "Open Original", verify new tab opens with result URL `[CODE]`
- [x] PASS: **More from this source** — click item, verify search bar updates with site: prefix `[CODE]`
- [x] PASS: **Block this source (danger)** — item styled in red, clicking triggers block and shows toast `[CODE]`
- [x] PASS: **Copy Link** — click "Copy Link", verify URL is copied to clipboard `[CODE]`

#### Stub Items (no crash)
- [ ] BLOCKED: **Save to Project** — click item, verify no crash (callback not wired) `[CODE-ONLY]`
- [ ] BLOCKED: **Cite in Draft** — click item, verify no crash (callback not wired) `[CODE-ONLY]`
- [ ] BLOCKED: **Summarize Page** — click item, verify no crash (callback not wired) `[CODE-ONLY]`
- [ ] BLOCKED: **Ask About Page** — click item, verify no crash (callback not wired) `[CODE-ONLY]`

#### Menu Separators
- [x] PASS: **Separator before Open Original** — visual divider appears above "Open Original" group `[CODE]`
- [x] PASS: **Separator before Block** — visual divider appears above "Block this source" `[CODE]`
- [x] PASS: **Shortcut badges** — S, C, O, B shortcuts display as kbd badges in menu items `[CODE]`
