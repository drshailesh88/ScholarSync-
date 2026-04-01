# explore — Spec 008

STATUS: PENDING
TESTED: 0/14
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Search History & Shortcuts Overlay

#### Search History Dropdown
- [ ] **Toggle history dropdown** — click clock icon, verify dropdown opens with "Recent Searches" header `[CODE]`
- [ ] **Close on click outside** — open dropdown, click outside, verify it closes `[CODE]`
- [ ] **Load last 20 entries** — verify dropdown shows up to 20 recent searches `[CODE]`
- [ ] **Entry shows query text** — each entry displays the search query `[CODE]`
- [ ] **Entry shows tab and time** — each entry shows tab label and relative time (e.g., "Academic . 5m ago") `[CODE]`
- [ ] **Click entry runs search** — click a history entry, verify search executes with that query `[CODE]`
- [ ] **Delete single entry** — hover entry, click X, verify entry removed from list `[CODE]`
- [ ] **Clear all history** — click "Clear all", verify all entries removed `[CODE]`
- [ ] **Empty state** — with no history, shows "No recent searches" `[CODE]`
- [ ] **Loading state** — on first open, briefly shows "Loading..." `[CODE]`

#### Shortcuts Overlay
- [ ] **? opens overlay** — press ?, verify full-screen keyboard shortcuts overlay appears `[CODE]`
- [ ] **Overlay shows all shortcuts** — verify Navigation, Tabs, Actions, Selection, Other sections present `[CODE]`
- [ ] **Close with Escape** — press Escape, verify overlay closes `[CODE]`
- [ ] **Close with ?** — press ? again, verify overlay closes `[CODE]`
