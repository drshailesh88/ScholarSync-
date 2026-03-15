# studio — Spec 017

STATUS: PENDING
TESTED: 0/4
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Behavior Corrections (Pass 2)
- [ ] Left-sidebar reference preview rows are not clickable selectors; they are static preview cards for the first 5 cited references.
- [ ] AI Credits usage is fetched once on mount via `getUserUsageStats()` and does not refresh after chat sends or other AI actions.
- [ ] `ReferenceSidebar` sort modes are `number`, `author`, `year`, and `added`; there is no title sort or edit-reference flow on `/studio`.
- [ ] `/studio` does not call `migrateLocalDocuments()` on mount; that migration runs in dashboard code, not the Studio route.
