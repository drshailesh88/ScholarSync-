# compliance — Spec 016

STATUS: PENDING
TESTED: 0/8
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### Accessibility Gaps
- [ ] Realtime score updates have no `aria-live` announcement
- [ ] Copyleaks scan progress has no `aria-busy` or `aria-live` indicator
- [ ] `src/app/api/integrity-check/batch/route.ts` still lacks checklist coverage for several 400-edge cases: `"No files uploaded"`, `Maximum 30 files per batch`, `File "{name}" exceeds 5MB limit`, `File "{name}" is empty`, and unsupported non-PDF/DOCX uploads
- [ ] `src/app/api/integrity-check/history/route.ts` clamps `limit` into `1..100`, clamps `offset` to `>= 0`, returns 401 `"Not authenticated"` when auth fails, and 500 `{ error: "Failed to fetch history" }` on server failure; these API edge cases are not called out in the checklist
- [ ] The project-dropdown outside-click effect removes its `document` `mousedown` listener on cleanup via `return () => document.removeEventListener("mousedown", handler)`; the doc covers the behavior, but not the cleanup path
- [ ] Route-level recovery coverage is still shallow: `src/components/ui/error-display.tsx` captures the route error to Sentry in a `useEffect` and renders a `Try Again` button wired to `onRetry`, but the checklist only verifies that `error.tsx` passes `error` and `reset`
- [ ] The app-wide fallback `src/app/global-error.tsx` also captures errors to Sentry and retries with `reset()`, but no pass documents this last-resort recovery path for compliance failures outside the route-local boundary
- [ ] The document-loading effect in `src/app/(app)/compliance/page.tsx` has no stale-response guard or abort path, so rapid project/source changes can let an older `getActiveDocumentForAnalysis(...)` resolution overwrite newer state
