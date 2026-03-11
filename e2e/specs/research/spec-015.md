# research — Spec 015

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### AISynthesisPanel Internals
- [ ] AISynthesisPanel outer container uses a gradient background: `bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.02]` with `backdrop-blur-sm`
- [ ] `onSynthesisChange` callback is called progressively during streaming with each accumulated text chunk, not just once at the end
- [ ] Skeleton placeholder during initial streaming shows exactly 4 lines with widths `w-full`, `w-[92%]`, `w-[85%]`, `w-[60%]`
#### S2 Recommendations API (`/api/search/s2-recommendations`)
- [ ] GET handler requires authentication, returns 401 `{ error: "Authentication required" }` when unauthenticated
- [ ] GET handler applies rate limit with key `"search"` and `RATE_LIMITS.search` (120 req/hour)
- [ ] GET handler returns 400 `{ error: "Query parameter 'paperId' is required" }` when `paperId` query param is missing
- [ ] GET handler accepts optional `paperTitle` query parameter used as fallback for title-based search
- [ ] GET handler defaults `limit` to `10` and caps it at `100` via `Math.min(parseInt(...), 100)`
- [ ] GET handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors
- [ ] POST handler exists on the same endpoint for list-based recommendations using positive/negative paper IDs
- [ ] POST handler requires a non-empty `positivePaperIds` array, returns 400 `{ error: "positivePaperIds is required" }` when empty or missing
- [ ] POST handler accepts optional `negativePaperIds` array (defaults to `[]`) and optional `limit` (defaults to `10`, caps at `100`)
- [ ] POST handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors
#### Research Agent API (`/api/research-agent`)
- [ ] Research-agent rate limit uses key `"research-agent"` with `RATE_LIMITS.ai` (60 req/hour), not `RATE_LIMITS.search`
- [ ] Research-agent uses `getModel()` (main model) for streaming, not `getSmallModel()`
- [ ] Research-agent response is streamed via `result.toTextStreamResponse()`
- [ ] System prompt defines the agent role as `a medical research librarian AI` that conducts `systematic literature searches`
- [ ] System prompt specifies a 4-phase search strategy: BROAD SWEEP (3-4 tool calls), ASSESS COVERAGE, TARGETED SEARCH (2-3 tool calls), SYNTHESIZE
- [ ] System prompt instructs "Try at least 2 different query formulations per source"
- [ ] System prompt instructs to "ALWAYS include the openAccessUrl if one is available" when saving papers to the library
- [ ] System prompt stopping criterion: "new searches return mostly papers already found, OR all key aspects covered"
- [ ] System prompt instructs to "Always cite paper titles and key findings when discussing results"
- [ ] When `context.savedPaperIds` is provided and non-empty, the system prompt appends only a count (`The user has {N} papers saved in their library.`), not the actual paper IDs or titles
#### Synthesize API (`/api/research/synthesize`)
- [ ] Unhandled synthesis errors return 500 `{ error: "Synthesis failed" }` — error is logged via `console.error`, not the structured `logger`
- [ ] Synthesize request body also accepts optional `customInstructions` (string) and `targetWordCount` (number) fields beyond `papers`, `reportType`, and `mode`
- [ ] Synthesize streaming response for generate mode is returned via `result.toTextStreamResponse()`
#### Rate Limiting Module
- [ ] Rate limit error response body is exactly `{ error: "Rate limit exceeded. Please try again later." }` with HTTP 429 status
- [ ] Rate limit response includes `X-RateLimit-Remaining` header with the remaining request count as a string
- [ ] Rate limit key format is `${userId}:${endpoint}` — e.g., `user_123:search`
- [ ] `RATE_LIMITS.search` allows 120 requests per 3600 seconds (120/hour)
- [ ] `RATE_LIMITS.ai` allows 60 requests per 3600 seconds (60/hour)
- [ ] In-memory rate limiter (development/Upstash-unavailable fallback) uses a fixed-window counter with a `Map<string, { count, resetAt }>` store
- [ ] In-memory rate limiter cleans up expired entries every 60 seconds via a `setInterval` loop
- [ ] Production rate limiter uses Upstash Redis with `@upstash/ratelimit` sliding window and prefix `"scholarsync"`
- [ ] Rate limiter falls through to in-memory when Upstash Redis env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are missing or when the Upstash request throws
