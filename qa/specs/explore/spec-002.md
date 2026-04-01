# explore — Spec 002

STATUS: PENDING
TESTED: 0/16
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Tab Navigation

#### Tab Clicking
- [ ] **Academic tab active by default** — after search, Academic tab is selected with underline `[CODE]`
- [ ] **Switch to Web tab** — click Web tab, verify Web results display `[CODE]`
- [ ] **Switch to News tab** — click News tab, verify News results display `[CODE]`
- [ ] **Switch to Discussions tab** — click Discussions tab, verify Discussions results display `[CODE]`
- [ ] **More tab placeholder** — click More tab, verify "Coming soon" message with "Images, videos, and podcasts" text `[CODE]`
- [ ] **Lazy tab loading** — switch to a tab not yet loaded, verify it fetches results on first visit `[CODE]`

#### Tab Keyboard Shortcuts
- [ ] **Key 1 switches to Academic** — press 1, verify Academic tab activates `[CODE]`
- [ ] **Key 2 switches to Web** — press 2, verify Web tab activates `[CODE]`
- [ ] **Key 3 switches to News** — press 3, verify News tab activates `[CODE]`
- [ ] **Key 4 switches to Discussions** — press 4, verify Discussions tab activates `[CODE]`
- [ ] **] cycles tab forward** — press ], verify next tab activates `[CODE]`
- [ ] **[ cycles tab backward** — press [, verify previous tab activates `[CODE]`
- [ ] **Tab cycling wraps around** — on last tab press ], verify it wraps to first tab `[CODE]`

#### Tab Edge Cases
- [ ] **Unavailable tab message** — when a non-academic tab is unavailable, shows "Temporarily unavailable" message `[CODE]`
- [ ] **No results empty state** — on a tab with 0 results, shows "No {tab} results found" with query text `[CODE]`
- [ ] **Tab-specific result counts** — each tab shows its own result count in stats line `[CODE]`
