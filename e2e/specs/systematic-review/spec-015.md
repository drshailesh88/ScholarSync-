# systematic-review — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Screening Panel — Criteria, Queue, Modes, and Shortcuts
- [x] PASS: Last-saved timestamp text appears only after a successful criteria save
- [x] PASS: Queue/Conflict mode switch is separate from the item filter tabs
- [x] PASS: Queue-mode filter tabs are `Unscreened`, `All`, `Conflicts`, and `Uncertain`
- [x] PASS: Changing the queue filter resets `activeIndex` back to 0
- [x] PASS: Blind-mode toggle label reads `Blind Mode` when off and `Blinded` when on
- [x] PASS: Blind-mode button title changes to explain whether AI decisions are hidden
- [x] PASS: Toggling blind mode clears any loaded unblinded-results summary
- [x] PASS: `Reprioritize` button title is `Recompute paper priorities using active learning`
- [x] PASS: AI batch screening only includes unscreened papers that have abstracts
- [x] PASS: AI batch screening sends at most the first 50 eligible papers in one request
- [x] PASS: AI screening failure shows `Failed to run AI screening. Please try again.`
- [x] PASS: Reprioritization failure shows `Failed to recompute priorities. Please try again.`
- [x] PASS: Recording a decision updates local queue rows to set `reviewerScreened: true`
- [x] PASS: In `unscreened` filter mode, a decided paper is removed from the visible queue immediately after decision
- [x] PASS: Queue keyboard shortcuts are inactive when the current focus target is an input, textarea, or select
- [x] PASS: Queue keyboard shortcut `I` records `include`
- [x] PASS: Queue keyboard shortcut `E` records `exclude`
- [x] PASS: Queue keyboard shortcut `U` records `maybe`
- [x] PASS: Queue keyboard shortcuts `ArrowDown` and `J` advance selection
- [x] PASS: Queue keyboard shortcuts `ArrowUp` and `K` move to the previous paper
- [x] PASS: `Unblind & Show Conflicts` button is shown only while blinded mode is on
- [x] PASS: Unblinding performs both `mode=unblind` fetch and a queue reload with `blinded=false`
- [x] PASS: Successful unblinding also turns blinded mode off
- [x] PASS: Conflict-view empty state heading is `No Conflicts Found`
- [x] PASS: Conflict-view empty state body explains there are no reviewer disagreements to resolve
- [x] PASS: Conflict-resolution POST includes `action: "resolve"` and optional `reason`
- [x] PASS: Resolving a conflict removes it from the local conflict list on success
- [x] PASS: Conflict-resolution failure shows `Failed to resolve conflict. Please try again.`
- [x] PASS: PDF viewer opens with paper metadata immediately and fetches PDF path best-effort in the background
- [x] PASS: PDF path fetch failure does not block opening the screening PDF viewer
#### PRISMA Flow and PRISMA Checklist — Combined Tab Details
- [x] PASS: The `prisma` workflow tab renders both `PRISMAFlowPanel` and `PRISMAChecklistPanel` stacked vertically
- [x] PASS: PRISMA Flow button label is `Generate Diagram`
- [x] PASS: PRISMA Flow download button label is `Download SVG`
- [x] PASS: PRISMA Flow download filename is `prisma-flow-diagram.svg`
- [x] PASS: PRISMA Flow diagram container is rendered only after a successful API response sets `flowSvg`
