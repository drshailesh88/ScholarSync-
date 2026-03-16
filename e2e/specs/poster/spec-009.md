# poster — Spec 009

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Detailed QA Coverage
- [x] PASS: Step 2 `Back` returns to Step 1 while preserving title, theme, and instructions state
- [x] PASS: Clicking `Generate Poster` moves to Step 3 immediately before any network response completes
- [x] PASS: `Generate Poster` does not show its own inline spinner; progress feedback only appears after Step 3 mounts
- [x] PASS: Client-side Step 2 does not enforce the API's 500-character title maximum before submission
- [x] PASS: Step 3 always renders exactly two progress rows: `Preprocessing content` and `Generating poster sections`
- [x] PASS: `Preprocessing content` shows a pending hollow circle before preprocessing begins
- [x] PASS: `Preprocessing content` swaps to a spinning `CircleNotch` while `preprocessing` is true
- [x] PASS: `Preprocessing content` swaps to a green `Check` after streamed preprocess output populates `preprocessedData`
- [x] PASS: `Preprocessing content` swaps to a red `Warning` when preprocess fails before any output is captured
- [x] PASS: `Generating poster sections` remains pending until preprocess completes successfully
- [x] PASS: `Generating poster sections` swaps to a spinning `CircleNotch` while `generating` is true
- [x] PASS: `Generating poster sections` swaps to a green `Check` after `generationResult` is received
- [x] PASS: `Generating poster sections` swaps to a red `Warning` when generation fails after preprocess has succeeded
- [x] PASS: Entering Step 3 calls `handlePreprocess()` immediately via `handleStartGeneration`
- [x] PASS: Preprocess requests remap `sourceType="import_deck"` to `sourceType="text"` before posting to `/api/presentations/preprocess`
- [x] PASS: Preprocess requests send imported deck `sourceText` instead of manual `rawText` when the imported deck source is active
- [x] PASS: Preprocess requests omit unrelated source fields by passing them as `undefined`
- [x] PASS: Stream parsing appends only SSE-style lines prefixed with `0:`
- [x] PASS: Malformed streamed chunks are skipped silently without surfacing a client-side parse error
- [x] PASS: Preprocess failures show a single inline red error banner with `Warning` and the message text
- [x] PASS: When preprocess succeeds and there is no generation result or error, `AutoTrigger` schedules `handleGenerate` after 500 ms
- [x] PASS: Generation requests POST `preprocessedData`, `title`, `posterSize`, `gridLayout`, `themeKey`, optional `templateId`, and optional `additionalInstructions` to `/api/posters/generate`
- [x] PASS: Generation success shows an inline green success banner instead of redirecting automatically
- [x] PASS: Generation success banner appends `using the {template} template` only when a template is selected
- [x] PASS: Generation success CTA reads `Open Poster Editor` and pushes to `/poster/{deckId}`
- [x] PASS: Generation error after preprocess keeps the first progress row done while marking only the second row as error
- [x] PASS: Retry after preprocess failure reruns preprocess because `preprocessedData` is still empty
- [x] PASS: Retry after generation failure calls `handleGenerate()` directly without rerunning preprocess
- [x] PASS: Error-state `Back` from Step 3 returns to Step 2 and clears `error`, `preprocessedData`, and `generationResult`
- [x] PASS: Step 3 has no explicit cancel action once preprocess has started
- [x] PASS: Poster editor parses `posterId` from route params using `Number(params.posterId)`
- [x] PASS: Poster editor starts with `loading = true` and shows `Loading poster...` centered in the viewport
- [x] PASS: Poster editor calls `getDeck(posterId)` inside a client `useEffect`
- [x] PASS: Missing deck data triggers `router.push("/poster")` before the editor tries to reconstruct poster state
- [x] PASS: Deck reconstruction prefers slide `sortOrder === 0` with a metadata text block containing the string `"isPoster"`
