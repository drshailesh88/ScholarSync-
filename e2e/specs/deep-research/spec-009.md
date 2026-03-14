# deep-research — Spec 009

STATUS: PARTIAL
TESTED: 35/35
PASS: 30
FAIL: 5
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Research Execution and SSE
- [x] PASS: The shared SSE reader only processes lines that start with `data: `.
- [x] PASS: The shared SSE reader ignores empty SSE payloads and the literal payload `[DONE]`.
- [x] PASS: The shared SSE reader recognizes `progress`, `perspectives`, `section`, `report`, and `error`; it has no `done` handler.
- [x] PASS: The shared SSE reader swallows JSON `SyntaxError`s and continues reading the stream.
- [ ] FAIL: The `handlers.onError` callback exists in the reader signature but is never invoked by the switch statement.
- [x] PASS: `executeResearch()` resets `error = null`, `report = null`, `streamingSections = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, `progressStages = buildStagesFromEvents([], null)`, `progressPercent = 0`, and `progressMessage = "Starting research..."`.
- [ ] FAIL: `executeResearch()` posts `POST /api/deep-research/execute` with JSON `{ topic: topic.trim(), mode, perspectives: confirmedPerspectives }`.
- [x] PASS: A non-OK execute response becomes `data.error` or `Research failed ({status})`.
- [x] PASS: Execute-phase `onProgress` updates `progressMessage` on every server `progress` event.
- [x] PASS: Execute-phase `onProgress` updates `progressPercent` only when the incoming `progress` value is truthy, so `0` would never overwrite state.
- [x] PASS: The current execute route never sends a numeric `progress` field, so `progressPercent` stays `0` through the running state and only jumps to `100` on the final `report` event.
- [x] PASS: Because the running-state progress bar only renders when `progress > 0`, the percentage bar never appears during actual execution.
- [x] PASS: Stage completion is tracked by pushing the previously active stage into `seenStageIdsRef.current` when a new stage ID arrives.
- [x] PASS: The `report` SSE event sets `report`, sets `pageState = "done"`, sets `progressPercent = 100`, and marks the fixed nine stages completed.
- [ ] FAIL: After the stream closes, the page still runs `setPageState(prev => prev === "running" ? "done" : prev)` as a fallback.
- [x] PASS: The red header action during plan-preview and running is labeled exactly `Stop`.
- [x] PASS: `handleAbort()` aborts the current controller if present, clears `planPerspectives`, and sets `pageState = "idle"`.
- [x] PASS: `handleAbort()` does not clear `topic`, `mode`, `report`, `progressStages`, `progressPercent`, `progressMessage`, or `streamingSections`.
- [x] PASS: An aborted plan or execute request returns the page to `idle` without entering the error view.
- [x] PASS: The running-state fallback line is exactly `Researching: {topic}`.
- [x] PASS: The running-state microscope icon uses `animate-pulse`, not a spinning rotation class.
#### Progress Stepper
- [x] PASS: `ProgressStepper` only renders the progress-bar block when `typeof progress === "number" && progress > 0`.
- [x] PASS: The progress-bar label is exactly `Progress`.
- [ ] FAIL: The progress-bar percentage text is `Math.round(progress)%`.
- [x] PASS: The completed-stage icon is `CheckCircle2` with class `text-blue-400`.
- [x] PASS: The active-stage icon is `Loader2` with `animate-spin`.
- [x] PASS: The pending-stage icon is `Circle`.
- [x] PASS: `ProgressStage.status` includes an `error` variant, but `buildStagesFromEvents()` never returns `error`.
- [x] PASS: `STAGE_LABELS` maps the visible labels exactly to `Searching papers...`, `Traversing citation graph...`, `Expanding search...`, `Reading full-text PDFs...`, `Extracting data from papers...`, `Analyzing perspectives...`, `Writing executive summary...`, `Generating tables...`, and `Self-critique and revision...`.
#### Done State, Error State, and Session Resume
- [ ] FAIL: The done-state metadata line renders `{report.mode} mode · {report.totalSources} sources analyzed`.
- [x] PASS: The page chooses `ResearchDocument` only when `report` has a truthy `markdownReport`; otherwise it renders `LegacyReportView`.
- [x] PASS: The done-state reset button label is exactly `Start New Research`.
- [x] PASS: `Start New Research` sets `pageState = "idle"`, `report = null`, `streamingSections = []`, `progressStages = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, and `topic = ""`.
- [x] PASS: `Start New Research` does not reset `mode`, `progressMessage`, `progressPercent`, or `error`.
- [x] PASS: The error-state title is exactly `Research Failed`.
