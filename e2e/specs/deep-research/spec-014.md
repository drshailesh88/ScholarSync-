# deep-research — Spec 014

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Dead Code (exists but never executes)
- [ ] `page.tsx` defines `streamingSections`, renders streaming `ResearchDocument` previews, and animates them with an 800 ms timeout, but the execute API never emits `section` SSE events, so this path never runs.
- [ ] The `section` branch in the shared SSE parser exists, but no currently used deep-research server route sends `type: "section"`.
- [ ] The `_streamingMarkdown` variable in `page.tsx` is computed and never used.
- [ ] The page passes `onError` into `readSSEStream()` during plan generation, but the reader never calls `handlers.onError`.
- [ ] The preview component supports `isRegenerating`, but the page never passes that prop, so the spinner/disabled path is dead from the live route.
- [ ] `SaveToLibraryButton` supports `isLoggedIn = false`, but the page never passes a false value, so the logged-out tooltip/disabled branch is dead from the live route.
- [ ] `ProgressStage.status = "error"` exists in the component contract, but the `/deep-research` page never constructs an error-status stage.
- [ ] The legacy single-endpoint route `POST /api/deep-research` still exists, but the current `/deep-research` page never calls it.
- [ ] Even if `section` SSE events were added later, the current streaming-preview path would render them with `sources = []` because `report` is still `null` during the running state.
#### Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)
- [ ] `STAGE_MAP` maps engine stages `validating`, `generating-perspectives`, `building-tree`, and `searching` to the single frontend stage `search-round-1`.
- [ ] Engine stage `search-round-3` maps to frontend `search-round-2` (no separate round-3 indicator on the frontend).
- [ ] Engine stages `deduplicating` and `unpaywall-lookup` both map to frontend `full-text-extraction`.
- [ ] Engine stage `synthesizing` maps to `synthesis-perspectives`; engine stage `complete` maps to `synthesis-critique`.
- [ ] Engine stages `citation-traversal`, `full-text-extraction`, and `data-extraction` are NOT in `STAGE_MAP` and pass through `mapStageId()` unchanged.
- [ ] Frontend stages `synthesis-summary` and `synthesis-tables` DO receive individual SSE progress events because synthesis progress is bridged through the execute route and unmapped stage IDs pass through unchanged.
- [ ] During a live research execution, the progress stepper can activate `synthesis-perspectives` → `synthesis-summary` → `synthesis-tables` → `synthesis-critique` in sequence before the final `report` event completes all stages.
- [ ] The execute route does NOT call `validateTopic()` — it only checks `!topic || typeof topic !== "string"`. A topic of 2 characters would pass the execute route's validation (but the plan route would have already rejected it).
- [ ] The execute route accepts an optional `config` field in the request body (`config?: Partial<ResearchConfig>`), but the page client never sends it — this is dead code from the page's perspective.
#### Plan Route SSE Validation (`src/app/api/deep-research/plan/route.ts`)
- [ ] `validateTopic()` runs inside the SSE stream (after the 200 response is already sent), so a 5–500 character violation is emitted as an SSE error event `{ type: "error", error: "Topic must be at least 5 characters long" }`, not as an HTTP 400 response.
- [ ] The plan route emits the first progress message as `{ stage: "generating-perspectives", message: "Generating research perspectives..." }` before calling `generatePerspectives()`.
- [ ] After perspective generation completes, the plan route emits `{ stage: "generating-perspectives", message: "Generated {N} perspectives" }` before the perspectives event.
#### Save Route Validation (`src/app/api/deep-research/save/route.ts`)
- [ ] Missing or non-string `topic` returns `400 { "error": "Topic is required" }`.
- [ ] Auth failure returns `401 { "error": "Not authenticated" }`.
- [ ] Unexpected errors return `500 { "error": "Failed to save research session" }`.
#### Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)
- [ ] Mode is extracted from `researchPlan` JSON via `(s.researchPlan as { mode?: string })?.mode` with fallback `"standard"`.
- [ ] `completedAt` for each session falls back to `startedAt?.toISOString()` when `completedAt` is null.
- [ ] Unexpected errors return `500 { "error": "Failed to fetch sessions" }`.
- [ ] Auth failure returns `401 { "error": "Not authenticated" }` (the client handles 401 silently by hiding the section).
#### Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)
- [ ] Mode defaults to `"standard"` when `researchPlan.mode` is absent from the stored JSON.
- [ ] `markdownReport` defaults to `session.finalReport || ""` — an empty string, not null/undefined.
- [ ] Unexpected errors return `500 { "error": "Failed to fetch session" }`.
- [ ] Auth failure returns `401 { "error": "Not authenticated" }`.
#### Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)
- [ ] Project title format: `Literature Review: {topic}`, with topic truncated to 77 chars + `"..."` when `topic.length > 80`.
- [ ] Project description: `Deep research report on: {topic}`.
- [ ] Document title is the same truncated string as the project title.
