# explore — Spec 003

STATUS: PENDING
TESTED: 0/18
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Filter System (FilterPills)

#### Scope Dropdown
- [ ] **Default shows "All Sources"** — scope pill displays "All Sources" by default `[CODE]`
- [ ] **Select user scope** — open scope dropdown, click a custom scope, verify pill updates to scope name `[CODE]`
- [ ] **Reset to All Sources** — select a scope, then select "All Sources", verify reset `[CODE]`
- [ ] **Edit Scopes link** — click "Edit Scopes..." in dropdown, verify navigation to /explore/scopes `[CODE]`
- [ ] **Active scope highlighted** — selected scope shows checkmark in dropdown `[CODE]`

#### Order By Dropdown
- [ ] **Default order is Quality** — pill shows "Order: Quality" by default `[CODE]`
- [ ] **Switch to Recency** — select Recency, verify pill updates and results refresh `[CODE]`
- [ ] **Citation Count disabled on Web tab** — switch to Web tab, open Order By, verify "Citation Count (Academic only)" is disabled `[CODE]`
- [ ] **Citation Count enabled on Academic tab** — on Academic tab, verify Citation Count is clickable `[CODE]`

#### Time Filter Dropdown
- [ ] **Default is "Any time"** — time pill shows "Any time" `[CODE]`
- [ ] **Select Past week** — click "Past week", verify pill updates and results refresh `[CODE]`
- [ ] **Custom date range** — enter From and To dates in custom range inputs, verify filters apply `[CODE]`

#### Options Dropdown
- [ ] **Exact match toggle** — enable Exact match, verify pill shows "Options (1)" and results refresh `[CODE]`
- [ ] **Use my preferences toggle** — disable "Use my preferences", verify Options count increments `[CODE]`
- [ ] **Open access only (academic)** — on Academic tab, enable Open access only, verify it appears in options `[CODE]`
- [ ] **Open access hidden on non-academic** — switch to Web tab, open Options, verify Open access toggle is absent `[CODE]`
- [ ] **Active filter count** — enable 2 options, verify pill shows "Options (2)" `[CODE]`

#### Filter Reset
- [ ] **Clear all button** — set non-default filters, click "Clear all", verify all filters reset to defaults `[CODE]`
