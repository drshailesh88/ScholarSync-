# slides-ai — Spec 017

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)
- [ ] PDF export opens `HandoutExportDialog` first, with options: `layout`, `includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes`, `paperSize`
- [ ] PDF filename pattern: `${title}_handout.pdf`
- [ ] PNG single-slide export at 2x scale by default, 3x when Shift key held during click
- [ ] SVG single-slide export via `exportSlideAsSVG`
- [ ] All-slides PNG export: renders off-screen at 1920px width, waits for fonts, then zips as `${title}_slides_png.zip`
- [ ] Right panel renders `DefensePrepPanel` when `rightPanel === "defense"`
- [ ] Right panel renders `AccessibilityPanel` when `rightPanel === "accessibility"`
- [ ] Right panel renders `VersionHistoryPanel` when `rightPanel === "versions"`, which calls `loadDeck(deckId)` on restore
- [ ] Right panel renders `AnalyticsPanel` when `rightPanel === "analytics"`
- [ ] `FindReplaceDialog` shown as overlay when `showFindReplace` is true
- [ ] `SlideSorterView` shown as overlay when `showSlideSorter` is true
#### API Route Validation & Error Shapes
- [ ] Request validated by Zod: `prompt` max 4000 chars, `slides` max 100 items, `chatHistory` max 20 entries
- [ ] `mode` validated as `z.enum(["learn", "draft", "chat"])`
- [ ] 401 response: `{ error: "Unauthorized" }`
- [ ] 400 response: `{ error: "Invalid request body", details: <fieldErrors> }`
- [ ] 500 response: `{ error: "Agent operation failed" }`
- [ ] Uses provider-dependent `getModel()` for all modes; with the default Anthropic provider this resolves to `"claude-sonnet-4-20250514"`
- [ ] Rate limited via `checkRateLimit(userId, "presentations", RATE_LIMITS.ai)`
- [ ] Request validated by Zod: `message` max 4000 chars, `slides` max 100 items, `deckId` required positive int
- [ ] 401 response: `{ error: "Unauthorized" }`
- [ ] 400 response: `{ error: "Invalid request body", details: <fieldErrors> }`
- [ ] 500 response: `{ error: "Chat operation failed" }`
- [ ] Uses provider-dependent `getModel()`; with the default Anthropic provider this resolves to `"claude-sonnet-4-20250514"`
- [ ] Request validated by Zod: `title` max 500 chars, `description` max 5000, `cardCount` min 3 max 30 (server allows up to 30, UI limits to 20)
- [ ] 500 response: `{ error: "Failed to generate outline" }`
- [ ] System prompt instructs: "First card should be a title card", "Last card should be a summary/conclusion", "Each card should have 2-4 bullet points"
- [ ] Request validated by Zod: `audienceType` is enum-validated (10 exact values), `slideCount` max 30
- [ ] Response `Content-Type: application/x-ndjson; charset=utf-8`
- [ ] Stream events include `{ type: "images", current: N, total: N, message: "Generating images... (N/N)" }`
- [ ] Stream `complete` event includes `{ slideCount, generatedImages }`
- [ ] 500 response: `{ error: "Generation failed" }`
- [ ] `instruction` max 4000 chars, `tone` min 1 max 100 chars
- [ ] Returns 404 `{ error: "Deck not found" }` or `{ error: "Slide not found" }` when resources missing
- [ ] RegenerateTone values: `"keep_similar"`, `"more_detailed"`, `"more_concise"`, `"different_approach"` (from `src/lib/slides/regenerate.ts`)
- [ ] Response validated against `generatedSlideSchema` with 18 allowed layout enum values
