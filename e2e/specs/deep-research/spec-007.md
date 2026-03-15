# deep-research — Spec 007

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Error Handling
#### API Errors
- [x] PASS: Session load failure handled gracefully
#### Data Extraction Fallbacks
- [x] PASS: PDF extraction failure skips full-text enrichment; abstract-based structured extraction still uses the original abstract when present
- [x] PASS: Missing fields omitted (not guessed)
- [x] PASS: Graceful degradation on partial data

### Keyboard & Accessibility
- [x] PASS: Enter key submits topic (idle state, no Shift)
- [x] PASS: There is no custom `Escape` key handler for the TOC or citations overlays
- [x] PASS: Tab navigation through all form inputs
- [x] PASS: Interactive controls are native buttons, inputs, and anchors; there is no custom focus-trap or focus-restoration logic
- [x] PASS: The route does not add custom `aria-label` or `aria-live` wiring beyond native element semantics and visible text/title attributes
- [x] PASS: Semantic HTML structure (headings, lists, sections)
- [x] PASS: No screen-reader-specific live-region updates are implemented for progress changes

### Quick Test Workflows
#### C. Deep Mode with Full Features
- [x] PASS: Click citation `[1]` — verify scroll to reference
- [x] PASS: Hover citation `[3]` — verify tooltip with abstract
- [x] PASS: Navigate TOC — click h2 heading, verify scroll
- [x] PASS: Check evidence badges on sources
#### Import Tree
- [x] PASS: `/deep-research` starts at `src/app/(app)/deep-research/page.tsx` and only imports the local barrel `src/components/deep-research/index.ts`.
- [x] PASS: `src/components/deep-research/index.ts` re-exports the route-visible modules `ResearchDocument.tsx`, `CitationReference.tsx`, `CitationsPanel.tsx`, `ExportButtons.tsx`, `ResearchPlanPreview.tsx`, `ProgressStepper.tsx`, `SaveToLibraryButton.tsx`, `PastResearchSessions.tsx`, `LegacyReportView.tsx`, and `types.ts`.
- [x] PASS: `ResearchDocument.tsx` is the only deep-research component that directly pulls in `CitationReference.tsx` and `CitationsPanel.tsx`.
- [x] PASS: `CitationReference.tsx`, `CitationsPanel.tsx`, `ExportButtons.tsx`, `ResearchPlanPreview.tsx`, `ProgressStepper.tsx`, `SaveToLibraryButton.tsx`, and `LegacyReportView.tsx` all depend on the shared local `types.ts`.
- [x] PASS: `PastResearchSessions.tsx` has no local deep-research imports.
- [x] PASS: No route-level `loading.tsx` or `error.tsx` file exists under `src/app/(app)/deep-research/`.
#### Page State and No Store
- [x] PASS: `/deep-research` uses only page-local React state; there is no Zustand store, React context store, `sessionStorage`, or `localStorage` in this route tree.
- [x] PASS: `DeepResearchPage` initializes `topic = ""`.
- [x] PASS: `DeepResearchPage` initializes `mode = "standard"`.
- [x] PASS: `DeepResearchPage` initializes `pageState = "idle"`.
- [x] PASS: `DeepResearchPage` initializes `error = null`.
- [x] PASS: `DeepResearchPage` initializes `planPerspectives = []`.
- [x] PASS: `DeepResearchPage` initializes `progressStages = []`.
- [x] PASS: `DeepResearchPage` initializes `progressMessage = ""`.
- [x] PASS: `DeepResearchPage` initializes `progressPercent = 0`.
- [x] PASS: `DeepResearchPage` initializes `streamingSections = []`.
- [x] PASS: `DeepResearchPage` initializes `report = null`.
- [x] PASS: `seenStageIdsRef.current` starts as `[]`, `currentStageIdRef.current` starts as `null`, and `abortRef.current` starts as `null`.
- [x] PASS: A full browser refresh resets all route state to those defaults; only persisted sessions come back through the sessions API.
#### Session Creation and Idle State
- [x] PASS: Idle-state header title is exactly `Deep Research`.
