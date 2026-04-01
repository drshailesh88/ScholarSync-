# explore — Spec 008

STATUS: PARTIAL
TESTED: 14/14
PASS: 5
FAIL: 9
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Search History & Shortcuts Overlay

#### Search History Dropdown
- [x] PASS: **Toggle history dropdown** — click clock icon, verify dropdown opens with "Recent Searches" header `[CODE]`
- [x] PASS: **Close on click outside** — open dropdown, click outside, verify it closes `[CODE]`
- [ ] FAIL: **Load last 20 entries** — verify dropdown shows up to 20 recent searches `[CODE]`
- [ ] FAIL: **Entry shows query text** — each entry displays the search query `[CODE]`
- [ ] FAIL: **Entry shows tab and time** — each entry shows tab label and relative time (e.g., "Academic . 5m ago") `[CODE]`
- [ ] FAIL: **Click entry runs search** — click a history entry, verify search executes with that query `[CODE]`
- [ ] FAIL: **Delete single entry** — hover entry, click X, verify entry removed from list `[CODE]`
- [x] PASS: **Clear all history** — click "Clear all", verify all entries removed `[CODE]`
- [x] PASS: **Empty state** — with no history, shows "No recent searches" `[CODE]`
- [x] PASS: **Loading state** — on first open, briefly shows "Loading..." `[CODE]`

#### Shortcuts Overlay
- [ ] FAIL: **? opens overlay** — press ?, verify full-screen keyboard shortcuts overlay appears `[CODE]`
- [ ] FAIL: **Overlay shows all shortcuts** — verify Navigation, Tabs, Actions, Selection, Other sections present `[CODE]`
- [ ] FAIL: **Close with Escape** — press Escape, verify overlay closes `[CODE]`
- [ ] FAIL: **Close with ?** — press ? again, verify overlay closes `[CODE]`
