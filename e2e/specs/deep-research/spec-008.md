# deep-research — Spec 008

STATUS: PARTIAL
TESTED: 35/35
PASS: 34
FAIL: 1
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Session Creation and Idle State
- [x] PASS: Idle-state subtitle is exactly `Multi-perspective literature synthesis`.
- [x] PASS: Idle hero heading is exactly `What would you like to research?`
- [x] PASS: Idle hero body copy is exactly `Enter a research topic and we will synthesize findings from multiple academic perspectives with full citations.`
- [x] PASS: The topic input placeholder is exactly `e.g., Efficacy of GLP-1 receptor agonists in type 2 diabetes management`.
- [x] PASS: The page renders no source-selection control.
- [x] PASS: The page renders no separate depth or breadth selector; the only user-facing search-shape control is the four-mode segmented control.
- [x] PASS: Mode cards render `Quick`, `Standard`, `Deep`, and `Exhaustive`.
- [x] PASS: Mode cards render the estimated times `~1 min`, `~3 min`, `~5 min`, and `~10 min`.
- [x] PASS: Mode cards do not render the mode descriptions from `RESEARCH_MODES.description`.
- [x] PASS: Client-side topic validation is only `topic.trim()` truthiness; there is no client-side 5-to-500 validator or inline validation message.
- [x] PASS: The `Start Deep Research` button is disabled only when `!topic.trim()`.
- [x] PASS: Pressing `Enter` in the topic field starts plan generation only when `pageState === "idle"`, `!e.shiftKey`, and `topic.trim()` is non-empty.
- [x] PASS: Pressing `Shift+Enter` never triggers submission because the handler explicitly requires `!e.shiftKey`.
- [x] PASS: Clicking `Start Deep Research` sets `pageState = "plan-preview"`, clears `error`, clears `planPerspectives`, and sets `progressMessage = "Generating research plan..."` before the network request resolves.
- [x] PASS: `fetchPlan()` posts `POST /api/deep-research/plan` with JSON body `{ topic: topic.trim(), mode }`.
- [x] PASS: The start button has no spinner, disabled-loading state, or label change during plan generation.
#### Plan Preview
- [x] PASS: The plan-loading shell renders only when `pageState === "plan-preview"` and `planPerspectives.length === 0`.
- [x] PASS: The loading shell shows the current `progressMessage` and the exact helper line `Preparing research plan for: {topic}`.
- [x] PASS: The populated plan preview renders only when `pageState === "plan-preview"` and `planPerspectives.length > 0`.
- [x] PASS: `ResearchPlanPreview` copies `initialPerspectives` into component-local state once with `useState(initialPerspectives)`.
- [x] PASS: The current preview component does not resync its local perspective copy if parent data changes after mount.
- [x] PASS: `ResearchPlanPreview` initializes `expandedIndex = 0`, so the first perspective starts expanded.
- [x] PASS: The preview header title is exactly `Research Plan`.
- [x] PASS: The preview subtitle is exactly `Review and customize the research perspectives before starting`.
- [x] PASS: The top-right button label is exactly `Regenerate`.
- [ ] FAIL: The bottom-right primary button label is exactly `Confirm & Start Research`.
- [x] PASS: Perspective-name inputs use the exact placeholder `Perspective name...`.
- [x] PASS: Query inputs use the exact placeholder `Search query...`.
- [x] PASS: Expanded cards show the exact section label `Search Queries`.
- [x] PASS: The add-row affordance is exactly `Add query`.
- [x] PASS: Query delete buttons render only when that perspective currently has more than one query.
- [x] PASS: `toggleExpanded()` collapses the currently open card by setting `expandedIndex` to `null`.
- [x] PASS: The page never passes `isRegenerating`, so the preview's spinner/disabled branch stays on its default `false`.
- [x] PASS: The plan API returns extra fields `id`, `description`, and `expectedPaperTypes`; runtime preview edits preserve those fields because updates spread the existing perspective objects.
#### Research Execution and SSE
- [x] PASS: The shared SSE reader throws `No response stream` if `response.body` is missing.
