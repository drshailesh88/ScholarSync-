# deep-research — Spec 012

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Quick Test Workflows
#### Export, Copy, and Open in Studio
- [ ] BibTeX keys are derived from the first segment of the first author name, then year, then the first title word, lowercased, with fallback `ref{n}`.
- [ ] RIS export writes `AN  - PMID:{pmid}` when a PubMed ID exists.
#### Save to Library and Session History
- [ ] `SaveToLibraryButton` initializes `state = "idle"` and `errorMessage = ""`.
- [ ] `SaveToLibraryButton` defaults `isLoggedIn = true`; the page never passes a different value.
- [ ] Save-to-library clicks are ignored when `!isComplete` or `!isLoggedIn`.
- [ ] Save-to-library posts `POST /api/deep-research/save` with `{ topic, mode, markdownReport, sources, keyFindings, gaps }`.
- [ ] Save-to-library success sets `state = "saved"` and leaves the button disabled thereafter.
- [ ] Save-to-library failure sets `state = "error"` and sets `errorMessage` to `err.message` or `Failed to save`.
- [ ] The error-state save button label is exactly `Retry`.
- [ ] The saved-state save button label is exactly `Saved`.
- [ ] The save button tooltip text is one of `Sign in to save`, `Research must be complete to save`, `Saved to library`, or `Save to library`.
- [ ] Save-to-library error tooltips do not auto-clear; clicking the button again retries the same request.
- [ ] `PastResearchSessions` fetches `GET /api/deep-research/sessions` on mount inside a `useEffect([])` and protects state updates with a `cancelled` flag on cleanup.
- [ ] The past-research loading message is exactly `Loading past research...`.
- [ ] A non-401 past-research fetch failure stores the exact error string `Could not load past research`, then returns `null` because `if (error || sessions.length === 0) return null`.
- [ ] A `401` past-research response does not set an error and simply hides the section.
- [ ] The visible section title is exactly `Past Research`.
- [ ] Each past-session row shows `{Capitalized mode} · {papersFound} papers · {relativeDate}`.
- [ ] Relative dates are exactly `just now`, `{m}m ago`, `{h}h ago`, `{d}d ago`, or an `en-US` short month/day date.
- [ ] The page tree has no session-delete control and no session-delete API call.
#### API Routes Called by the Page
- [ ] `POST /api/deep-research/plan` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
- [ ] `POST /api/deep-research/plan` has `maxDuration = 30`.
- [ ] `POST /api/deep-research/plan` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
- [ ] `POST /api/deep-research/plan` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
- [ ] `POST /api/deep-research/plan` defaults `mode` to `"standard"` when omitted.
- [ ] `POST /api/deep-research/plan` uses `validateTopic(topic)`, so server-side topic validation enforces 5-to-500 characters even though the page UI does not.
- [ ] `POST /api/deep-research/plan` streams `progress`, `perspectives`, `done`, and `error` events; it never streams `report` or `section`.
- [ ] `POST /api/deep-research/plan` streams one `perspectives` event whose payload items include `id`, `name`, `description`, `queries`, and `expectedPaperTypes`.
- [ ] `POST /api/deep-research/execute` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
- [ ] `POST /api/deep-research/execute` has `maxDuration = 300`.
- [ ] `POST /api/deep-research/execute` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
- [ ] `POST /api/deep-research/execute` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
- [ ] `POST /api/deep-research/execute` requires a non-empty `perspectives` array; otherwise it returns `400 {"error":"perspectives array is required"}`.
- [ ] `POST /api/deep-research/execute` converts plan perspectives into engine perspectives, defaulting missing IDs to `perspective-{n}`, defaulting missing descriptions to the perspective name, and filtering out blank query strings.
- [ ] `POST /api/deep-research/execute` emits only `progress`, `report`, `done`, and `error` SSE event types.
