# deep-research — Spec 012

STATUS: PARTIAL
TESTED: 35/35
PASS: 23
FAIL: 12
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Export, Copy, and Open in Studio
- [ ] FAIL: BibTeX keys are derived from the first segment of the first author name, then year, then the first title word, lowercased, with fallback `ref{n}`.
- [ ] FAIL: RIS export writes `AN  - PMID:{pmid}` when a PubMed ID exists.
#### Save to Library and Session History
- [x] PASS: `SaveToLibraryButton` initializes `state = "idle"` and `errorMessage = ""`.
- [x] PASS: `SaveToLibraryButton` defaults `isLoggedIn = true`; the page never passes a different value.
- [x] PASS: Save-to-library clicks are ignored when `!isComplete` or `!isLoggedIn`.
- [x] PASS: Save-to-library posts `POST /api/deep-research/save` with `{ topic, mode, markdownReport, sources, keyFindings, gaps }`.
- [ ] FAIL: Save-to-library success sets `state = "saved"` and leaves the button disabled thereafter.
- [x] PASS: Save-to-library failure sets `state = "error"` and sets `errorMessage` to `err.message` or `Failed to save`.
- [x] PASS: The error-state save button label is exactly `Retry`.
- [x] PASS: The saved-state save button label is exactly `Saved`.
- [x] PASS: The save button tooltip text is one of `Sign in to save`, `Research must be complete to save`, `Saved to library`, or `Save to library`.
- [ ] FAIL: Save-to-library error tooltips do not auto-clear; clicking the button again retries the same request.
- [x] PASS: `PastResearchSessions` fetches `GET /api/deep-research/sessions` on mount inside a `useEffect([])` and protects state updates with a `cancelled` flag on cleanup.
- [x] PASS: The past-research loading message is exactly `Loading past research...`.
- [x] PASS: A non-401 past-research fetch failure stores the exact error string `Could not load past research`, then returns `null` because `if (error || sessions.length === 0) return null`.
- [x] PASS: A `401` past-research response does not set an error and simply hides the section.
- [x] PASS: The visible section title is exactly `Past Research`.
- [ ] FAIL: Each past-session row shows `{Capitalized mode} · {papersFound} papers · {relativeDate}`.
- [x] PASS: Relative dates are exactly `just now`, `{m}m ago`, `{h}h ago`, `{d}d ago`, or an `en-US` short month/day date.
- [ ] FAIL: The page tree has no session-delete control and no session-delete API call.
#### API Routes Called by the Page
- [ ] FAIL: `POST /api/deep-research/plan` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
- [x] PASS: `POST /api/deep-research/plan` has `maxDuration = 30`.
- [ ] FAIL: `POST /api/deep-research/plan` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
- [x] PASS: `POST /api/deep-research/plan` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
- [x] PASS: `POST /api/deep-research/plan` defaults `mode` to `"standard"` when omitted.
- [ ] FAIL: `POST /api/deep-research/plan` uses `validateTopic(topic)`, so server-side topic validation enforces 5-to-500 characters even though the page UI does not.
- [x] PASS: `POST /api/deep-research/plan` streams `progress`, `perspectives`, `done`, and `error` events; it never streams `report` or `section`.
- [x] PASS: `POST /api/deep-research/plan` streams one `perspectives` event whose payload items include `id`, `name`, `description`, `queries`, and `expectedPaperTypes`.
- [ ] FAIL: `POST /api/deep-research/execute` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
- [x] PASS: `POST /api/deep-research/execute` has `maxDuration = 300`.
- [ ] FAIL: `POST /api/deep-research/execute` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
- [x] PASS: `POST /api/deep-research/execute` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
- [x] PASS: `POST /api/deep-research/execute` requires a non-empty `perspectives` array; otherwise it returns `400 {"error":"perspectives array is required"}`.
- [ ] FAIL: `POST /api/deep-research/execute` converts plan perspectives into engine perspectives, defaulting missing IDs to `perspective-{n}`, defaulting missing descriptions to the perspective name, and filtering out blank query strings.
- [x] PASS: `POST /api/deep-research/execute` emits only `progress`, `report`, `done`, and `error` SSE event types.
