# systematic-review — Spec 032

STATUS: DONE
TESTED: 15/15
PASS: 15
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Liveblocks Configuration Details
- [x] PASS: Activity feed entry ID format: `activity-{timestamp}-{incrementingCounter}`
#### Zustand Store — Additional Details
- [x] PASS: `clearProject()` also resets `criteria` to `[{ type: "inclusion", description: "" }]`, `screeningResults` to `[]`, `screeningSummary` to `null`
- [x] PASS: `setProject()` sets `reviewStage` from config, `pico` from `config.pico` (falls back to DEFAULT_PICO), and `generatedStrategy` from `config.searchStrategy`
- [x] PASS: `WorkflowTab` union type includes both `rob2` and `rob` as valid tab keys
- [x] PASS: Store persistence keeps only `projectId`, `projectTitle`, `activeTab`, `reviewStage`, and `pico`; `generatedStrategy`, `reviewConfig`, `criteria`, `screeningResults`, `screeningSummary`, `projects`, and `isLoadingProjects` are omitted from the persisted subset
#### Components Referenced But Not Rendered
- [x] PASS: Shared `Tabs` renders plain `<button>` elements with no `role="tablist"`, `role="tab"`, `aria-selected`, or arrow-key handlers in the current workflow shell
- [x] PASS: The inner workflow-page `useEffect` still contains an `isNaN(projectId)` redirect branch, but the outer page component already returns `null` for non-numeric params before that branch can run
- [x] PASS: Screening PDF viewer chunk loading uses `fetch(/api/systematic-review/paper-chunks...)` inside `useEffect` without `AbortController` cancellation or a stale-response guard
- [x] PASS: Screening PDF viewer active-chunk clearing uses a bare `setTimeout(() => setActiveChunkId(null), 3000)` with no cleanup when the viewer closes or unmounts
- [x] PASS: Screening panel best-effort PDF hydration calls `/api/systematic-review/paper-pdf?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree
- [x] PASS: Screening PDF viewer fetches `/api/systematic-review/paper-chunks?paperId={paperId}&projectId={projectId}`, but no matching route file exists under `src/app/api/systematic-review/` in the current source tree
- [x] PASS: Screening PDF viewer resolves stored PDFs through `/api/pdf/serve?path={encodedPath}`, but no matching route file exists under `src/app/api/pdf/` in the current source tree
- [x] PASS: Screening PDF viewer keeps the hard-coded `w-[70%]` / `w-[30%]` split at all breakpoints; there is no mobile-specific stacked layout
- [x] PASS: Activity feed open/close behavior has no explicit focus management or focus restoration logic around the drawer toggle button
- [x] PASS: Route error recovery delegates only to `ErrorDisplay`'s retry callback; it does not clear persisted systematic-review store state or navigate away from the workflow page
