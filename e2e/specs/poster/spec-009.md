# poster — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Detailed QA Coverage
- [ ] Step 2 `Back` returns to Step 1 while preserving title, theme, and instructions state
- [ ] Clicking `Generate Poster` moves to Step 3 immediately before any network response completes
- [ ] `Generate Poster` does not show its own inline spinner; progress feedback only appears after Step 3 mounts
- [ ] Client-side Step 2 does not enforce the API's 500-character title maximum before submission
- [ ] Step 3 always renders exactly two progress rows: `Preprocessing content` and `Generating poster sections`
- [ ] `Preprocessing content` shows a pending hollow circle before preprocessing begins
- [ ] `Preprocessing content` swaps to a spinning `CircleNotch` while `preprocessing` is true
- [ ] `Preprocessing content` swaps to a green `Check` after streamed preprocess output populates `preprocessedData`
- [ ] `Preprocessing content` swaps to a red `Warning` when preprocess fails before any output is captured
- [ ] `Generating poster sections` remains pending until preprocess completes successfully
- [ ] `Generating poster sections` swaps to a spinning `CircleNotch` while `generating` is true
- [ ] `Generating poster sections` swaps to a green `Check` after `generationResult` is received
- [ ] `Generating poster sections` swaps to a red `Warning` when generation fails after preprocess has succeeded
- [ ] Entering Step 3 calls `handlePreprocess()` immediately via `handleStartGeneration`
- [ ] Preprocess requests remap `sourceType="import_deck"` to `sourceType="text"` before posting to `/api/presentations/preprocess`
- [ ] Preprocess requests send imported deck `sourceText` instead of manual `rawText` when the imported deck source is active
- [ ] Preprocess requests omit unrelated source fields by passing them as `undefined`
- [ ] Stream parsing appends only SSE-style lines prefixed with `0:`
- [ ] Malformed streamed chunks are skipped silently without surfacing a client-side parse error
- [ ] Preprocess failures show a single inline red error banner with `Warning` and the message text
- [ ] When preprocess succeeds and there is no generation result or error, `AutoTrigger` schedules `handleGenerate` after 500 ms
- [ ] Generation requests POST `preprocessedData`, `title`, `posterSize`, `gridLayout`, `themeKey`, optional `templateId`, and optional `additionalInstructions` to `/api/posters/generate`
- [ ] Generation success shows an inline green success banner instead of redirecting automatically
- [ ] Generation success banner appends `using the {template} template` only when a template is selected
- [ ] Generation success CTA reads `Open Poster Editor` and pushes to `/poster/{deckId}`
- [ ] Generation error after preprocess keeps the first progress row done while marking only the second row as error
- [ ] Retry after preprocess failure reruns preprocess because `preprocessedData` is still empty
- [ ] Retry after generation failure calls `handleGenerate()` directly without rerunning preprocess
- [ ] Error-state `Back` from Step 3 returns to Step 2 and clears `error`, `preprocessedData`, and `generationResult`
- [ ] Step 3 has no explicit cancel action once preprocess has started
- [ ] Poster editor parses `posterId` from route params using `Number(params.posterId)`
- [ ] Poster editor starts with `loading = true` and shows `Loading poster...` centered in the viewport
- [ ] Poster editor calls `getDeck(posterId)` inside a client `useEffect`
- [ ] Missing deck data triggers `router.push("/poster")` before the editor tries to reconstruct poster state
- [ ] Deck reconstruction prefers slide `sortOrder === 0` with a metadata text block containing the string `"isPoster"`
