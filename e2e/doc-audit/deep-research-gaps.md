# Deep Research — Feature Doc Gaps

**Doc:** `DEEP_RESEARCH_FEATURES_TESTING.md`
**Original Claude checkbox count:** 200
**Current checkbox count after Codex fresh pass:** 439
**Fresh-pass checks added beyond the original 200:** 239
**Original-section coverage versus current doc size:** 45.6%

## Fresh Pass Summary

- [ ] The previous layered audit addenda were replaced with one source-backed `Verified Feature Audit (Codex Fresh Pass)` section.
- [ ] The new section now captures the actual `/deep-research` import tree, page-local state model, API contracts, engine behavior, and dead-code paths.
- [ ] The new section explicitly records that the live execute flow emits `progress`, `report`, `done`, and `error`, but not `section`.
- [ ] The new section explicitly records that the running-state progress bar never advances because the current server does not emit numeric `progress`.
- [ ] The new section explicitly records that `/deep-research` has no route-local `loading.tsx`, `error.tsx`, Zustand store, `sessionStorage`, or `localStorage`.
- [ ] The new section explicitly records that the client has no source selector, no standalone depth/breadth controls, and no session delete flow.

## Existing-Doc Hallucinations Now Called Out

- [ ] Client-side `5–500` topic validation.
- [ ] Start-button loading spinner during plan generation.
- [ ] Live streaming section previews from execute SSE.
- [ ] Explicit client handling of `done` SSE events.
- [ ] Progress state clearing on `Stop`.
- [ ] Green completed-stage icon.
- [ ] Rotating microscope icon in the running state.
- [ ] Full-screen mobile TOC with handle/swipe behavior.
- [ ] DOI/PubMed/PDF links directly inside citations-panel rows.
- [ ] Session delete behavior in the page flow.
- [ ] Source-selection controls in the page UI.
- [ ] Separate depth/breadth controls in the page UI.
- [ ] Mode reset on `Start New Research`.
- [ ] Session-storage-based Open in Studio handoff.
- [ ] Route-local `loading.tsx` / `error.tsx` files.
- [ ] Escape-key close behavior for TOC/citations overlays.
- [ ] Custom ARIA/live-region accessibility wiring for progress updates.
- [ ] Abstract fallback when PDF full-text extraction fails.
