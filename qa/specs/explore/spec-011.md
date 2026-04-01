# explore — Spec 011

STATUS: PARTIAL
TESTED: 13/13
PASS: 4
FAIL: 9
BLOCKED: 0
PAGE: http://localhost:3000/explore/sources
MODULE: explore

---
### Sources Management Page (/explore/sources)

#### Page Layout
- [x] PASS: **Page title** — shows "My Sources" heading `[CODE]`
- [x] PASS: **Back to Explore link** — arrow button navigates to /explore `[CODE]`
- [x] PASS: **Preference count display** — header shows "N / 1,000" count `[CODE]`
- [x] PASS: **Description text** — shows explanation about domain ranking `[CODE]`

#### Filter Controls
- [ ] FAIL: **Filter by domain text** — type in search box, verify list filters to matching domains `[CODE]`
- [ ] FAIL: **Filter by level (All)** — click "All" pill, verify all preferences shown `[CODE]`
- [ ] FAIL: **Filter by Preferred** — click "Preferred" pill, verify only preferred domains shown `[CODE]`
- [ ] FAIL: **Filter by Muted** — click "Muted" pill, verify only muted domains shown `[CODE]`
- [ ] FAIL: **Level count badges** — each filter pill shows count (e.g., "Preferred (3)") `[CODE]`

#### Manage Preferences
- [ ] FAIL: **Change preference level** — use dropdown on a row, change from Higher to Lower, verify update `[CODE]`
- [ ] FAIL: **Remove preference** — click trash icon on a row, verify domain removed from list `[CODE]`

#### Empty States
- [ ] FAIL: **No preferences message** — when empty, shows "No domain preferences yet. Use the shield icon..." `[CODE]`
- [ ] FAIL: **No filter matches** — set filter that matches nothing, shows "No matches for your filter." `[CODE]`
