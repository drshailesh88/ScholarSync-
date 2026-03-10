# Library — Feature Doc Gaps

**Original doc:** `LIBRARY_FEATURES_TESTING.md`
**Original checkbox count:** 155
**After Codex Pass 1:** 285
**After Claude Code Pass 2:** 383
**After Codex Verification Pass:** 402
**Checks added in verification:** 19
**Hallucinations removed in verification:** 39

## Audit History

| Pass | Agent | Checks Added | Total | Focus |
|------|-------|-------------|-------|-------|
| Initial | Claude Code | 155 | 155 | Core library feature inventory |
| Pass 1 | Codex | +130 | 285 | Detailed QA coverage across page state, filters, upload flow, PDF viewer, and optimistic mutations |
| Pass 2 | Claude Code | +98 | 383 | Deep source read: modal behavior, icon details, API routes, loading structure, Sentry, server-action specifics |
| Verification | Codex | +19 | 402 | Full re-audit: pass-2 verification, stale-claim cleanup, accessibility gaps, async races, and PDF-route auth/validation edge cases |

## Verification Pass

- Reviewed every checkbox in `Re-Audit Discoveries (Claude Code Pass 2)`: 98 assertions total, 95 correct, 0 hallucinated, 3 partial.
- The 3 partials were wording-level issues only: `ErrorDisplay` uses a rounded container rather than a circle, and `/api/papers/[id]/pdf` uses R2/local storage semantics instead of an active signed-GCS path.
- Added 19 new checks covering `Tabs` semantics/styling, modal/search/filter/icon-button accessibility gaps, collection-name exact matching, upload concurrency, async race conditions, dedup edge cases, missing PDF MIME validation, and missing ownership checks on `/api/papers/[id]/pdf`.
- Cleaned 39 stale assertions from older sections, including non-rendered Citation Dialog / Reference Store coverage, auto-inserted citations, spinner/toast claims that do not exist, PDF title expectations, GCS-specific wording, and extract-PDF DOI claims.

## Codex Verification Pass Discoveries

### Added Coverage
- Accessibility & shared UI: 7 checks
- Edge cases & cleanup: 5 checks
- Async races, dedup limits, and PDF-route auth/validation: 7 checks

### Most Important New Findings
1. `/api/papers/[id]/pdf` authenticates users but does not verify a `userReferences` ownership link before serving or storing a PDF.
2. `POST /api/papers/[id]/pdf` does not validate uploaded MIME type or `.pdf` extension before writing storage.
3. `fetchPapers()` and `openCiteModal()` both lack request sequencing/cancellation, so stale responses can overwrite newer UI state.
4. Citation tabs use shared `Tabs` buttons with no `role="tablist"`, `role="tab"`, or `aria-selected`, and the shared `Modal` lacks `role="dialog"` / `aria-modal`.
5. `copied` feedback is timer-based and not reset on modal reopen or tab change, so `Copied!` can briefly linger across citation-context changes.

## Features in doc that DON'T EXIST in the app

- The Library page does not render the shared Citation Dialog or Reference Store UI; those belong to editor/studio flows.
- Library does not auto-insert citations into the editor; it stores `{ paperId, title }` in `sessionStorage`, and the editor shows a pending-citation notice.
- Results loading shows text only, not a spinner icon.
- Library PDF viewer does not show a document title because `/library` does not pass a `title` prop.
- Arrow-key PDF page navigation is not implemented.
- Upload success does not show a toast, and `/api/extract-pdf` does not extract DOI metadata.
- The upload pipeline is storage-backed via `uploadPdf(...)` to R2/local storage, not a GCS-specific implementation.
- The page remains a simple scrollable column; infinite scroll is not implemented.
