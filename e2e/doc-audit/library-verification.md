# Library — Claude Code Pass 2 Verification Report

**Total assertions reviewed:** 98
**Verified Correct:** 95
**Hallucinated / Inaccurate:** 0
**Partially Correct:** 3
**Accuracy rate:** 96.9%

All 8 highlighted behavior corrections were verified against source. Modal behaviors, SearchInput details, `ErrorDisplay` Sentry reporting, action-button icons, PDF viewer specifics, skeleton composition, API route details, and `savePaper` behavior were otherwise confirmed.

Line references below point to the pre-cleanup `Re-Audit Discoveries (Claude Code Pass 2)` block as reviewed before Codex corrected wording in `LIBRARY_FEATURES_TESTING.md`.

## Hallucinated / Inaccurate
- None.

## Partially Correct
- [line 651] "ErrorDisplay renders a `WarningCircle` icon (red, size 32) in a `bg-red-500/10` circle" — MOSTLY RIGHT but the container uses `rounded-2xl`, not a circular shape.
- [line 718] "GET fallback chain: signed GCS URL (redirect) → local buffer ... → `pdf_url` redirect → `open_access_url` redirect → 404" — MOSTLY RIGHT but the route calls `getSignedPdfUrl(...)` from the R2/local storage helper, which currently returns `null`, so there is no active signed-GCS redirect path.
- [line 723] "POST stores PDF in GCS, sets `pdf_storage_path` and `full_text_available = true` on paper record" — MOSTLY RIGHT but `uploadPdf(...)` writes to the app's R2/local storage layer, not GCS specifically.
