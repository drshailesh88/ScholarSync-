# explore — Spec 008

STATUS: COMPLETE
TESTED: 14/14
PASS: 14
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Search History & Shortcuts Overlay

#### Search History Dropdown
- [x] PASS: **Toggle history dropdown** — click clock icon, verify dropdown opens with "Recent Searches" header `[CODE]`
- [x] PASS: **Close on click outside** — open dropdown, click outside, verify it closes `[CODE]`
- [x] PASS: **Load last 20 entries** — verify dropdown shows up to 20 recent searches `[CODE]`
- [x] PASS: **Entry shows query text** — each entry displays the search query `[CODE]`
- [x] PASS: **Entry shows tab and time** — each entry shows tab label and relative time (e.g., "Academic . 5m ago") `[CODE]`
- [x] PASS: **Click entry runs search** — click a history entry, verify search executes with that query `[CODE]`
- [x] PASS: **Delete single entry** — hover entry, click X, verify entry removed from list `[CODE]`
- [x] PASS: **Clear all history** — click "Clear all", verify all entries removed `[CODE]`
- [x] PASS: **Empty state** — with no history, shows "No recent searches" `[CODE]`
- [x] PASS: **Loading state** — on first open, briefly shows "Loading..." `[CODE]`

#### Shortcuts Overlay
- [x] PASS: **? opens overlay** — press ?, verify full-screen keyboard shortcuts overlay appears `[CODE]`
- [x] PASS: **Overlay shows all shortcuts** — verify Navigation, Tabs, Actions, Selection, Other sections present `[CODE]`
- [x] PASS: **Close with Escape** — press Escape, verify overlay closes `[CODE]`
- [x] PASS: **Close with ?** — press ? again, verify overlay closes `[CODE]`
