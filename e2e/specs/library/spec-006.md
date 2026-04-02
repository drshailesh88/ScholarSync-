# library — Spec 006: API & Error States

STATUS: PENDING
TESTED: 0/10
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/library
MODULE: library

---
### API Endpoints
- [ ] **POST /api/library/save** — POST with search result payload, returns { id, alreadySaved } `[CONFIRMED]`
- [ ] **POST /api/library/upload-pdf** — POST multipart form with PDF, returns { success, paperId, title } `[CONFIRMED]`
- [ ] **GET /api/library/annotations** — GET with sourceId param, returns array of annotations `[CONFIRMED]`
- [ ] **POST /api/library/annotations** — POST with annotation data, creates and returns annotation `[CONFIRMED]`
- [ ] **PATCH /api/library/annotations** — PATCH with id + updates, returns updated annotation `[CONFIRMED]`
- [ ] **DELETE /api/library/annotations** — DELETE with annotation id, removes annotation `[CONFIRMED]`

### Error & Loading States
- [ ] **Loading skeleton on page load** — navigate to /library, loading skeleton renders before content `[CONFIRMED]`
- [ ] **Error boundary on reader** — if reader page throws, error boundary renders with retry/back buttons `[CONFIRMED]`
- [ ] **Retry button on error** — click "Try again" on error page, page attempts to reload `[CONFIRMED]`
- [ ] **Back to Library from error** — click "Back to Library" on error page, navigates to /library `[CONFIRMED]`
