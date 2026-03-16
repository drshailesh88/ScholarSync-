# Deep Research — Feature Doc Gaps

**Doc:** `DEEP_RESEARCH_FEATURES_TESTING.md`
**Original Claude checkbox count:** 200
**Codex fresh pass count:** 439
**Claude Code pass 3 count:** 500
**Total checks added by pass 3:** 61
**Cumulative checks added beyond original 200:** 300
**Current workspace checkbox count after Codex final correction pass:** 525
**Pass 3 verification result:** 58 verified, 2 hallucinated, 1 partially correct
**Inaccurate assertions removed or rewritten in final pass:** 43

> Note: the prompt's `500 total` reflects the audit milestone being verified. The current workspace file now contains 525 checkbox assertions after subsequent cleanup and source-backed rewrites.

## Pass 3 Summary (Claude Code)

- [ ] Added execute route STAGE_MAP analysis, including the corrected finding that `synthesis-summary` and `synthesis-tables` pass through unchanged and can activate individually.
- [ ] Added plan route SSE validation detail: `validateTopic()` errors emit as SSE events (not HTTP 400) because validation runs inside the stream.
- [ ] Added per-route error response bodies for save, sessions, sessions/[id], and open-in-studio routes; Codex also verified missed paths such as malformed-JSON falling through to generic 500s in save/open-in-studio.
- [ ] Added open-in-studio route details: project title truncation, References appending, source reference mapping for Tiptap, word count storage, and placeholder-user insertion when the authenticated user is missing from the DB.
- [ ] Added evidence badge label correction: labels are capitalized ("High", "Moderate") not lowercase ("high", "moderate").
- [ ] Added mobile citations handle bar correction: decorative only, not draggable.
- [ ] Added export button responsive behavior, tooltip text, render order, and format details (RIS DOI fallback URL, abstract truncation, uncapped clipboard references).
- [ ] Added markdown rendering details: h2 border-bottom, h4 italic, heading ID generation, IntersectionObserver config, hr rendering.
- [ ] Added print style details: even table row background, blockquote styling, code styling, link color.
- [ ] Added SSE header documentation for both plan and execute routes.

## Fresh Pass Summary (Codex)

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

## Corrections Added in Pass 3

- Evidence badge labels are capitalized ("High", "Moderate", "Low", "Unknown"), not lowercase as stated in section 11.
- Mobile citations panel handle bar is NOT draggable — purely decorative div with no event handlers.
- `markdownToRichHTML()` clipboard References section is uncapped (all sources), unlike the 50-source cap in rendered references and citations panel.

## Codex Final Verification Additions

- Corrected the active checklist so it no longer claims live streaming sections, a rotating microscope, green completed-stage icons, inline citation-row links, draggable mobile handles, or client-side 5-500 validation.
- Verified that the execute route does not call `validateTopic()`, but the plan route validates inside the SSE stream and the client surfaces both HTTP errors and SSE error events.
- Verified that the Open in Studio route's placeholder-user insert is not environment-gated even though the comment frames it as a dev fallback.
- Added a new payload-shape finding: deep-research UI components read `source.pdfUrl`, while the execute route serializes `openAccessPdfUrl` / `fullTextUrl`, so live report data typically will not surface `PDF` anchors.
