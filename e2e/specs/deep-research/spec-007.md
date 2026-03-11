# deep-research — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Error Handling
#### API Errors
- [ ] Session load failure handled gracefully
#### Data Extraction Fallbacks
- [ ] PDF extraction failure skips full-text enrichment; abstract-based structured extraction still uses the original abstract when present
- [ ] Missing fields omitted (not guessed)
- [ ] Graceful degradation on partial data

### Keyboard & Accessibility
- [ ] Enter key submits topic (idle state, no Shift)
- [ ] There is no custom `Escape` key handler for the TOC or citations overlays
- [ ] Tab navigation through all form inputs
- [ ] Interactive controls are native buttons, inputs, and anchors; there is no custom focus-trap or focus-restoration logic
- [ ] The route does not add custom `aria-label` or `aria-live` wiring beyond native element semantics and visible text/title attributes
- [ ] Semantic HTML structure (headings, lists, sections)
- [ ] No screen-reader-specific live-region updates are implemented for progress changes

### Quick Test Workflows
#### C. Deep Mode with Full Features
- [ ] Click citation `[1]` — verify scroll to reference
- [ ] Hover citation `[3]` — verify tooltip with abstract
- [ ] Navigate TOC — click h2 heading, verify scroll
- [ ] Check evidence badges on sources
#### Import Tree
- [ ] `/deep-research` starts at `src/app/(app)/deep-research/page.tsx` and only imports the local barrel `src/components/deep-research/index.ts`.
- [ ] `src/components/deep-research/index.ts` re-exports the route-visible modules `ResearchDocument.tsx`, `CitationReference.tsx`, `CitationsPanel.tsx`, `ExportButtons.tsx`, `ResearchPlanPreview.tsx`, `ProgressStepper.tsx`, `SaveToLibraryButton.tsx`, `PastResearchSessions.tsx`, `LegacyReportView.tsx`, and `types.ts`.
- [ ] `ResearchDocument.tsx` is the only deep-research component that directly pulls in `CitationReference.tsx` and `CitationsPanel.tsx`.
- [ ] `CitationReference.tsx`, `CitationsPanel.tsx`, `ExportButtons.tsx`, `ResearchPlanPreview.tsx`, `ProgressStepper.tsx`, `SaveToLibraryButton.tsx`, and `LegacyReportView.tsx` all depend on the shared local `types.ts`.
- [ ] `PastResearchSessions.tsx` has no local deep-research imports.
- [ ] No route-level `loading.tsx` or `error.tsx` file exists under `src/app/(app)/deep-research/`.
#### Page State and No Store
- [ ] `/deep-research` uses only page-local React state; there is no Zustand store, React context store, `sessionStorage`, or `localStorage` in this route tree.
- [ ] `DeepResearchPage` initializes `topic = ""`.
- [ ] `DeepResearchPage` initializes `mode = "standard"`.
- [ ] `DeepResearchPage` initializes `pageState = "idle"`.
- [ ] `DeepResearchPage` initializes `error = null`.
- [ ] `DeepResearchPage` initializes `planPerspectives = []`.
- [ ] `DeepResearchPage` initializes `progressStages = []`.
- [ ] `DeepResearchPage` initializes `progressMessage = ""`.
- [ ] `DeepResearchPage` initializes `progressPercent = 0`.
- [ ] `DeepResearchPage` initializes `streamingSections = []`.
- [ ] `DeepResearchPage` initializes `report = null`.
- [ ] `seenStageIdsRef.current` starts as `[]`, `currentStageIdRef.current` starts as `null`, and `abortRef.current` starts as `null`.
- [ ] A full browser refresh resets all route state to those defaults; only persisted sessions come back through the sessions API.
#### Session Creation and Idle State
- [ ] Idle-state header title is exactly `Deep Research`.
