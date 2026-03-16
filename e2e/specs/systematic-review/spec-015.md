# systematic-review — Spec 015

STATUS: PARTIAL
TESTED: 35/35
PASS: 2
FAIL: 33
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Screening Panel — Criteria, Queue, Modes, and Shortcuts
- [ ] FAIL: Last-saved timestamp text appears only after a successful criteria save
- [ ] FAIL: Queue/Conflict mode switch is separate from the item filter tabs
- [ ] FAIL: Queue-mode filter tabs are `Unscreened`, `All`, `Conflicts`, and `Uncertain`
- [ ] FAIL: Changing the queue filter resets `activeIndex` back to 0
- [ ] FAIL: Blind-mode toggle label reads `Blind Mode` when off and `Blinded` when on
- [ ] FAIL: Blind-mode button title changes to explain whether AI decisions are hidden
- [ ] FAIL: Toggling blind mode clears any loaded unblinded-results summary
- [ ] FAIL: `Reprioritize` button title is `Recompute paper priorities using active learning`
- [ ] FAIL: AI batch screening only includes unscreened papers that have abstracts
- [ ] FAIL: AI batch screening sends at most the first 50 eligible papers in one request
- [ ] FAIL: AI screening failure shows `Failed to run AI screening. Please try again.`
- [ ] FAIL: Reprioritization failure shows `Failed to recompute priorities. Please try again.`
- [ ] FAIL: Recording a decision updates local queue rows to set `reviewerScreened: true`
- [ ] FAIL: In `unscreened` filter mode, a decided paper is removed from the visible queue immediately after decision
- [ ] FAIL: Queue keyboard shortcuts are inactive when the current focus target is an input, textarea, or select
- [ ] FAIL: Queue keyboard shortcut `I` records `include`
- [ ] FAIL: Queue keyboard shortcut `E` records `exclude`
- [ ] FAIL: Queue keyboard shortcut `U` records `maybe`
- [ ] FAIL: Queue keyboard shortcuts `ArrowDown` and `J` advance selection
- [ ] FAIL: Queue keyboard shortcuts `ArrowUp` and `K` move to the previous paper
- [ ] FAIL: `Unblind & Show Conflicts` button is shown only while blinded mode is on
- [ ] FAIL: Unblinding performs both `mode=unblind` fetch and a queue reload with `blinded=false`
- [ ] FAIL: Successful unblinding also turns blinded mode off
- [ ] FAIL: Conflict-view empty state heading is `No Conflicts Found`
- [ ] FAIL: Conflict-view empty state body explains there are no reviewer disagreements to resolve
- [ ] FAIL: Conflict-resolution POST includes `action: "resolve"` and optional `reason`
- [ ] FAIL: Resolving a conflict removes it from the local conflict list on success
- [ ] FAIL: Conflict-resolution failure shows `Failed to resolve conflict. Please try again.`
- [ ] FAIL: PDF viewer opens with paper metadata immediately and fetches PDF path best-effort in the background
- [ ] FAIL: PDF path fetch failure does not block opening the screening PDF viewer
#### PRISMA Flow and PRISMA Checklist — Combined Tab Details
- [ ] FAIL: The `prisma` workflow tab renders both `PRISMAFlowPanel` and `PRISMAChecklistPanel` stacked vertically
- [x] PASS: PRISMA Flow button label is `Generate Diagram`
- [x] PASS: PRISMA Flow download button label is `Download SVG`
- [ ] FAIL: PRISMA Flow download filename is `prisma-flow-diagram.svg`
- [ ] FAIL: PRISMA Flow diagram container is rendered only after a successful API response sets `flowSvg`
