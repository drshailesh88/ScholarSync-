# explore — Spec 002

STATUS: COMPLETE
TESTED: 16/16
PASS: 16
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Tab Navigation

#### Tab Clicking
- [x] PASS: **Academic tab active by default** — after search, Academic tab is selected with underline `[CODE]`
- [x] PASS: **Switch to Web tab** — click Web tab, verify Web results display `[CODE]`
- [x] PASS: **Switch to News tab** — click News tab, verify News results display `[CODE]`
- [x] PASS: **Switch to Discussions tab** — click Discussions tab, verify Discussions results display `[CODE]`
- [x] PASS: **More tab placeholder** — click More tab, verify "Coming soon" message with "Images, videos, and podcasts" text `[CODE]`
- [x] PASS: **Lazy tab loading** — switch to a tab not yet loaded, verify it fetches results on first visit `[CODE]`

#### Tab Keyboard Shortcuts
- [x] PASS: **Key 1 switches to Academic** — press 1, verify Academic tab activates `[CODE]`
- [x] PASS: **Key 2 switches to Web** — press 2, verify Web tab activates `[CODE]`
- [x] PASS: **Key 3 switches to News** — press 3, verify News tab activates `[CODE]`
- [x] PASS: **Key 4 switches to Discussions** — press 4, verify Discussions tab activates `[CODE]`
- [x] PASS: **] cycles tab forward** — press ], verify next tab activates `[CODE]`
- [x] PASS: **[ cycles tab backward** — press [, verify previous tab activates `[CODE]`
- [x] PASS: **Tab cycling wraps around** — on last tab press ], verify it wraps to first tab `[CODE]`

#### Tab Edge Cases
- [x] PASS: **Unavailable tab message** — when a non-academic tab is unavailable, shows "Temporarily unavailable" message `[CODE]`
- [x] PASS: **No results empty state** — on a tab with 0 results, shows "No {tab} results found" with query text `[CODE]`
- [x] PASS: **Tab-specific result counts** — each tab shows its own result count in stats line `[CODE]`
