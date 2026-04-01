# explore — Spec 011

STATUS: PENDING
TESTED: 0/13
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore/sources
MODULE: explore

---
### Sources Management Page (/explore/sources)

#### Page Layout
- [ ] **Page title** — shows "My Sources" heading `[CODE]`
- [ ] **Back to Explore link** — arrow button navigates to /explore `[CODE]`
- [ ] **Preference count display** — header shows "N / 1,000" count `[CODE]`
- [ ] **Description text** — shows explanation about domain ranking `[CODE]`

#### Filter Controls
- [ ] **Filter by domain text** — type in search box, verify list filters to matching domains `[CODE]`
- [ ] **Filter by level (All)** — click "All" pill, verify all preferences shown `[CODE]`
- [ ] **Filter by Preferred** — click "Preferred" pill, verify only preferred domains shown `[CODE]`
- [ ] **Filter by Muted** — click "Muted" pill, verify only muted domains shown `[CODE]`
- [ ] **Level count badges** — each filter pill shows count (e.g., "Preferred (3)") `[CODE]`

#### Manage Preferences
- [ ] **Change preference level** — use dropdown on a row, change from Higher to Lower, verify update `[CODE]`
- [ ] **Remove preference** — click trash icon on a row, verify domain removed from list `[CODE]`

#### Empty States
- [ ] **No preferences message** — when empty, shows "No domain preferences yet. Use the shield icon..." `[CODE]`
- [ ] **No filter matches** — set filter that matches nothing, shows "No matches for your filter." `[CODE]`
