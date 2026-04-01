# explore — Spec 003

STATUS: COMPLETE
TESTED: 18/18
PASS: 18
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Filter System (FilterPills)

#### Scope Dropdown
- [x] PASS: **Default shows "All Sources"** — scope pill displays "All Sources" by default `[CODE]`
- [x] PASS: **Select user scope** — open scope dropdown, click a custom scope, verify pill updates to scope name `[CODE]`
- [x] PASS: **Reset to All Sources** — select a scope, then select "All Sources", verify reset `[CODE]`
- [x] PASS: **Edit Scopes link** — click "Edit Scopes..." in dropdown, verify navigation to /explore/scopes `[CODE]`
- [x] PASS: **Active scope highlighted** — selected scope shows checkmark in dropdown `[CODE]`

#### Order By Dropdown
- [x] PASS: **Default order is Quality** — pill shows "Order: Quality" by default `[CODE]`
- [x] PASS: **Switch to Recency** — select Recency, verify pill updates and results refresh `[CODE]`
- [x] PASS: **Citation Count disabled on Web tab** — switch to Web tab, open Order By, verify "Citation Count (Academic only)" is disabled `[CODE]`
- [x] PASS: **Citation Count enabled on Academic tab** — on Academic tab, verify Citation Count is clickable `[CODE]`

#### Time Filter Dropdown
- [x] PASS: **Default is "Any time"** — time pill shows "Any time" `[CODE]`
- [x] PASS: **Select Past week** — click "Past week", verify pill updates and results refresh `[CODE]`
- [x] PASS: **Custom date range** — enter From and To dates in custom range inputs, verify filters apply `[CODE]`

#### Options Dropdown
- [x] PASS: **Exact match toggle** — enable Exact match, verify pill shows "Options (1)" and results refresh `[CODE]`
- [x] PASS: **Use my preferences toggle** — disable "Use my preferences", verify Options count increments `[CODE]`
- [x] PASS: **Open access only (academic)** — on Academic tab, enable Open access only, verify it appears in options `[CODE]`
- [x] PASS: **Open access hidden on non-academic** — switch to Web tab, open Options, verify Open access toggle is absent `[CODE]`
- [x] PASS: **Active filter count** — enable 2 options, verify pill shows "Options (2)" `[CODE]`

#### Filter Reset
- [x] PASS: **Clear all button** — set non-default filters, click "Clear all", verify all filters reset to defaults `[CODE]`
