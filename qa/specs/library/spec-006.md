# library — Spec 006: API & Error States

STATUS: COMPLETE
TESTED: 10/10
PASS: 10
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/library
MODULE: library

---
### API Endpoints
- [x] **POST /api/library/save** — POST with search result payload, returns { id, alreadySaved } `[CONFIRMED]`
- [x] **POST /api/library/upload-pdf** — POST multipart form with PDF, returns { success, paperId, title } `[CONFIRMED]`
- [x] **GET /api/library/annotations** — GET with sourceId param, returns array of annotations `[CONFIRMED]`
- [x] **POST /api/library/annotations** — POST with annotation data, creates and returns annotation `[CONFIRMED]`
- [x] **PATCH /api/library/annotations** — PATCH with id + updates, returns updated annotation `[CONFIRMED]`
- [x] **DELETE /api/library/annotations** — DELETE with annotation id, removes annotation `[CONFIRMED]`

### Error & Loading States
- [x] **Loading skeleton on page load** — navigate to /library, loading skeleton renders before content `[CONFIRMED]`
- [x] **Error boundary on reader** — if reader page throws, error boundary renders with retry/back buttons `[CONFIRMED]`
- [x] **Retry button on error** — click "Try again" on error page, page attempts to reload `[CONFIRMED]`
- [x] **Back to Library from error** — click "Back to Library" on error page, navigates to /library `[CONFIRMED]`
