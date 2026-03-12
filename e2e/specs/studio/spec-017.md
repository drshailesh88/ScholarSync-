# studio — Spec 017

STATUS: COMPLETE
TESTED: 4/4
PASS: 4
FAIL: 0
BLOCKED: 0
PAGE: http://127.0.0.1:3002/studio
MODULE: studio

---
### Quick Test Workflows
#### Behavior Corrections (Pass 2)
- [x] Left-sidebar reference preview rows are not clickable selectors; they are static preview cards for the first 5 cited references.
  RESULT: PASS — Page audit confirmed the left sidebar renders `citedSourcesList.slice(0, 5)` as static preview cards in plain `<div>` rows with an optional separate `View all {references.size} references` button; there is no per-row click handler or selector behavior.
- [x] AI Credits usage is fetched once on mount via `getUserUsageStats()` and does not refresh after chat sends or other AI actions.
  RESULT: PASS — Page audit confirmed `getUserUsageStats()` is called inside a mount-only `useEffect(..., [])`, and no chat-send or other AI-action path re-fetches usage stats.
- [x] `ReferenceSidebar` sort modes are `number`, `author`, `year`, and `added`; there is no title sort or edit-reference flow on `/studio`.
  RESULT: PASS — Component audit and the new `ReferenceSidebar` test confirmed the only sort modes are `number`, `author`, `year`, and `added`; the expanded row offers DOI/open/copy/remove actions, with no title sort and no edit-reference action.
- [x] `/studio` does not call `migrateLocalDocuments()` on mount; that migration runs in dashboard code, not the Studio route.
  RESULT: PASS — Code audit confirmed `migrateLocalDocuments()` is imported and called in `dashboard-client.tsx`, while the Studio route does not import or call it.
