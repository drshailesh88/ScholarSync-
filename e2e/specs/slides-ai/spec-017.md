# slides-ai — Spec 017

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)
- [x] PASS: PDF export opens `HandoutExportDialog` first, with options: `layout`, `includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes`, `paperSize`
- [x] PASS: PDF filename pattern: `${title}_handout.pdf`
- [x] PASS: PNG single-slide export at 2x scale by default, 3x when Shift key held during click
- [x] PASS: SVG single-slide export via `exportSlideAsSVG`
- [x] PASS: All-slides PNG export: renders off-screen at 1920px width, waits for fonts, then zips as `${title}_slides_png.zip`
- [x] PASS: Right panel renders `DefensePrepPanel` when `rightPanel === "defense"`
- [x] PASS: Right panel renders `AccessibilityPanel` when `rightPanel === "accessibility"`
- [x] PASS: Right panel renders `VersionHistoryPanel` when `rightPanel === "versions"`, which calls `loadDeck(deckId)` on restore
- [x] PASS: Right panel renders `AnalyticsPanel` when `rightPanel === "analytics"`
- [x] PASS: `FindReplaceDialog` shown as overlay when `showFindReplace` is true
- [x] PASS: `SlideSorterView` shown as overlay when `showSlideSorter` is true
#### API Route Validation & Error Shapes
- [x] PASS: Request validated by Zod: `prompt` max 4000 chars, `slides` max 100 items, `chatHistory` max 20 entries
- [x] PASS: `mode` validated as `z.enum(["learn", "draft", "chat"])`
- [x] PASS: 401 response: `{ error: "Unauthorized" }`
- [x] PASS: 400 response: `{ error: "Invalid request body", details: <fieldErrors> }`
- [x] PASS: 500 response: `{ error: "Agent operation failed" }`
- [x] PASS: Uses provider-dependent `getModel()` for all modes; with the default Anthropic provider this resolves to `"claude-sonnet-4-20250514"`
- [x] PASS: Rate limited via `checkRateLimit(userId, "presentations", RATE_LIMITS.ai)`
- [x] PASS: Request validated by Zod: `message` max 4000 chars, `slides` max 100 items, `deckId` required positive int
- [x] PASS: 401 response: `{ error: "Unauthorized" }`
- [x] PASS: 400 response: `{ error: "Invalid request body", details: <fieldErrors> }`
- [x] PASS: 500 response: `{ error: "Chat operation failed" }`
- [x] PASS: Uses provider-dependent `getModel()`; with the default Anthropic provider this resolves to `"claude-sonnet-4-20250514"`
- [x] PASS: Request validated by Zod: `title` max 500 chars, `description` max 5000, `cardCount` min 3 max 30 (server allows up to 30, UI limits to 20)
- [x] PASS: 500 response: `{ error: "Failed to generate outline" }`
- [x] PASS: System prompt instructs: "First card should be a title card", "Last card should be a summary/conclusion", "Each card should have 2-4 bullet points"
- [x] PASS: Request validated by Zod: `audienceType` is enum-validated (10 exact values), `slideCount` max 30
- [x] PASS: Response `Content-Type: application/x-ndjson; charset=utf-8`
- [x] PASS: Stream events include `{ type: "images", current: N, total: N, message: "Generating images... (N/N)" }`
- [x] PASS: Stream `complete` event includes `{ slideCount, generatedImages }`
- [x] PASS: 500 response: `{ error: "Generation failed" }`
- [x] PASS: `instruction` max 4000 chars, `tone` min 1 max 100 chars
- [x] PASS: Returns 404 `{ error: "Deck not found" }` or `{ error: "Slide not found" }` when resources missing
- [x] PASS: RegenerateTone values: `"keep_similar"`, `"more_detailed"`, `"more_concise"`, `"different_approach"` (from `src/lib/slides/regenerate.ts`)
- [x] PASS: Response validated against `generatedSlideSchema` with 18 allowed layout enum values
