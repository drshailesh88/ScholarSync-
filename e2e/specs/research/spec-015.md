# research — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### AISynthesisPanel Internals
- [x] PASS: AISynthesisPanel outer container uses a gradient background: `bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.02]` with `backdrop-blur-sm`
- [x] PASS: `onSynthesisChange` callback is called progressively during streaming with each accumulated text chunk, not just once at the end
- [x] PASS: Skeleton placeholder during initial streaming shows exactly 4 lines with widths `w-full`, `w-[92%]`, `w-[85%]`, `w-[60%]`
#### S2 Recommendations API (`/api/search/s2-recommendations`)
- [x] PASS: GET handler requires authentication, returns 401 `{ error: "Authentication required" }` when unauthenticated
- [x] PASS: GET handler applies rate limit with key `"search"` and `RATE_LIMITS.search` (120 req/hour)
- [x] PASS: GET handler returns 400 `{ error: "Query parameter 'paperId' is required" }` when `paperId` query param is missing
- [x] PASS: GET handler accepts optional `paperTitle` query parameter used as fallback for title-based search
- [x] PASS: GET handler defaults `limit` to `10` and caps it at `100` via `Math.min(parseInt(...), 100)`
- [x] PASS: GET handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors
- [x] PASS: POST handler exists on the same endpoint for list-based recommendations using positive/negative paper IDs
- [x] PASS: POST handler requires a non-empty `positivePaperIds` array, returns 400 `{ error: "positivePaperIds is required" }` when empty or missing
- [x] PASS: POST handler accepts optional `negativePaperIds` array (defaults to `[]`) and optional `limit` (defaults to `10`, caps at `100`)
- [x] PASS: POST handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors
#### Research Agent API (`/api/research-agent`)
- [x] PASS: Research-agent rate limit uses key `"research-agent"` with `RATE_LIMITS.ai` (60 req/hour), not `RATE_LIMITS.search`
- [x] PASS: Research-agent uses `getModel()` (main model) for streaming, not `getSmallModel()`
- [x] PASS: Research-agent response is streamed via `result.toTextStreamResponse()`
- [x] PASS: System prompt defines the agent role as `a medical research librarian AI` that conducts `systematic literature searches`
- [x] PASS: System prompt specifies a 4-phase search strategy: BROAD SWEEP (3-4 tool calls), ASSESS COVERAGE, TARGETED SEARCH (2-3 tool calls), SYNTHESIZE
- [x] PASS: System prompt instructs "Try at least 2 different query formulations per source"
- [x] PASS: System prompt instructs to "ALWAYS include the openAccessUrl if one is available" when saving papers to the library
- [x] PASS: System prompt stopping criterion: "new searches return mostly papers already found, OR all key aspects covered"
- [x] PASS: System prompt instructs to "Always cite paper titles and key findings when discussing results"
- [x] PASS: When `context.savedPaperIds` is provided and non-empty, the system prompt appends only a count (`The user has {N} papers saved in their library.`), not the actual paper IDs or titles
#### Synthesize API (`/api/research/synthesize`)
- [x] PASS: Unhandled synthesis errors return 500 `{ error: "Synthesis failed" }` — error is logged via `console.error`, not the structured `logger`
- [x] PASS: Synthesize request body also accepts optional `customInstructions` (string) and `targetWordCount` (number) fields beyond `papers`, `reportType`, and `mode`
- [x] PASS: Synthesize streaming response for generate mode is returned via `result.toTextStreamResponse()`
#### Rate Limiting Module
- [x] PASS: Rate limit error response body is exactly `{ error: "Rate limit exceeded. Please try again later." }` with HTTP 429 status
- [x] PASS: Rate limit response includes `X-RateLimit-Remaining` header with the remaining request count as a string
- [x] PASS: Rate limit key format is `${userId}:${endpoint}` — e.g., `user_123:search`
- [x] PASS: `RATE_LIMITS.search` allows 120 requests per 3600 seconds (120/hour)
- [x] PASS: `RATE_LIMITS.ai` allows 60 requests per 3600 seconds (60/hour)
- [x] PASS: In-memory rate limiter (development/Upstash-unavailable fallback) uses a fixed-window counter with a `Map<string, { count, resetAt }>` store
- [x] PASS: In-memory rate limiter cleans up expired entries every 60 seconds via a `setInterval` loop
- [x] PASS: Production rate limiter uses Upstash Redis with `@upstash/ratelimit` sliding window and prefix `"scholarsync"`
- [x] PASS: Rate limiter falls through to in-memory when Upstash Redis env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are missing or when the Upstash request throws
