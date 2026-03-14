# systematic-review — Spec 015

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Screening Panel — Criteria, Queue, Modes, and Shortcuts
- [ ] Last-saved timestamp text appears only after a successful criteria save
- [ ] Queue/Conflict mode switch is separate from the item filter tabs
- [ ] Queue-mode filter tabs are `Unscreened`, `All`, `Conflicts`, and `Uncertain`
- [ ] Changing the queue filter resets `activeIndex` back to 0
- [ ] Blind-mode toggle label reads `Blind Mode` when off and `Blinded` when on
- [ ] Blind-mode button title changes to explain whether AI decisions are hidden
- [ ] Toggling blind mode clears any loaded unblinded-results summary
- [ ] `Reprioritize` button title is `Recompute paper priorities using active learning`
- [ ] AI batch screening only includes unscreened papers that have abstracts
- [ ] AI batch screening sends at most the first 50 eligible papers in one request
- [ ] AI screening failure shows `Failed to run AI screening. Please try again.`
- [ ] Reprioritization failure shows `Failed to recompute priorities. Please try again.`
- [ ] Recording a decision updates local queue rows to set `reviewerScreened: true`
- [ ] In `unscreened` filter mode, a decided paper is removed from the visible queue immediately after decision
- [ ] Queue keyboard shortcuts are inactive when the current focus target is an input, textarea, or select
- [ ] Queue keyboard shortcut `I` records `include`
- [ ] Queue keyboard shortcut `E` records `exclude`
- [ ] Queue keyboard shortcut `U` records `maybe`
- [ ] Queue keyboard shortcuts `ArrowDown` and `J` advance selection
- [ ] Queue keyboard shortcuts `ArrowUp` and `K` move to the previous paper
- [ ] `Unblind & Show Conflicts` button is shown only while blinded mode is on
- [ ] Unblinding performs both `mode=unblind` fetch and a queue reload with `blinded=false`
- [ ] Successful unblinding also turns blinded mode off
- [ ] Conflict-view empty state heading is `No Conflicts Found`
- [ ] Conflict-view empty state body explains there are no reviewer disagreements to resolve
- [ ] Conflict-resolution POST includes `action: "resolve"` and optional `reason`
- [ ] Resolving a conflict removes it from the local conflict list on success
- [ ] Conflict-resolution failure shows `Failed to resolve conflict. Please try again.`
- [ ] PDF viewer opens with paper metadata immediately and fetches PDF path best-effort in the background
- [ ] PDF path fetch failure does not block opening the screening PDF viewer
#### PRISMA Flow and PRISMA Checklist — Combined Tab Details
- [ ] The `prisma` workflow tab renders both `PRISMAFlowPanel` and `PRISMAChecklistPanel` stacked vertically
- [ ] PRISMA Flow button label is `Generate Diagram`
- [ ] PRISMA Flow download button label is `Download SVG`
- [ ] PRISMA Flow download filename is `prisma-flow-diagram.svg`
- [ ] PRISMA Flow diagram container is rendered only after a successful API response sets `flowSvg`
