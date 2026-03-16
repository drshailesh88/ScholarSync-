# slides — Spec 022

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Handout Export Dialog — Defaults & Details
- [x] PASS: PDF handout filename is `{title}_handout.pdf`
#### PPTX Export Details
- [x] PASS: PPTX export posts to `/api/export/pptx` with JSON payload containing `title`, `themeConfig`, `institutionKit`, and `slides` array
- [x] PASS: PPTX export filename is `{title}.pptx` (un-sanitized title used directly)
- [x] PASS: PPTX export error is logged to console only (`PPTX export error:`)
#### Find & Replace — Additional Details
- [x] PASS: Find input placeholder is `Find...`
- [x] PASS: Replace input placeholder is `Replace with...`
- [x] PASS: Find input auto-focuses on mount
- [x] PASS: Dialog is positioned `fixed top-16 right-4` (not centered)
- [x] PASS: `Enter` key inside the dialog navigates to the next match
- [x] PASS: `Shift+Enter` inside the dialog navigates to the previous match
- [x] PASS: Match counter shows `{current} of {total}` when matches exist, `No matches` when query has no results, or non-breaking space when query is empty
- [x] PASS: Previous match button title is `Previous match (Shift+Enter)`
- [x] PASS: Next match button title is `Next match (Enter)`
#### Accessibility Panel — Additional Details
- [x] PASS: Accessibility panel header includes a `Re-check` button that increments `runId` to force recomputation
- [x] PASS: Zero-issue state shows green `CheckCircle` icon with text `No accessibility issues found!`
- [x] PASS: Score is computed via `calculateAccessibilityScore(issues)` (separate from `checkAccessibility`)
- [x] PASS: Error severity section defaults to open; warning and info sections default to closed
- [x] PASS: Auto-fix for `missing-alt-text` navigates to slide, selects the block, and switches right panel to `properties`
- [x] PASS: Auto-fix for `low-contrast-text` calls `suggestAccessibleColor(textColor, backgroundColor)` and updates theme
- [x] PASS: Auto-fix for `low-contrast-primary` calls `suggestAccessibleColor(primaryColor, backgroundColor)` and updates theme
- [x] PASS: Auto-fix for `empty-slide` adds a default text block `{ type: "text", data: { text: "Click to add content", style: "body" } }`
- [x] PASS: Auto-fixable rule IDs: `missing-alt-text`, `missing-slide-title`, `low-contrast-text`, `low-contrast-primary`, `empty-slide`
#### Regenerate Dialog — Additional Details
- [x] PASS: Default tone is `"keep_similar"`
- [x] PASS: Dialog resets `instruction`, `tone`, `submitting`, and `error` when closed
- [x] PASS: Regeneration failure message is `Regeneration failed. The slide was left unchanged.`
- [x] PASS: Dialog cannot be closed while `submitting` is true
- [x] PASS: Submit label defaults to `"Regenerate"` (passed from filmstrip)
#### API Routes — Validation & Error Handling
- [x] PASS: `/api/slides/regenerate` validates with zod: `deckId` (positive int), `slideId` (positive int), `instruction` (max 4000 chars), `tone` (1-100 chars), `context` object with optional `prevSlideTitle`/`nextSlideTitle` and required `deckTitle`/`audienceType`
- [x] PASS: `/api/slides/regenerate` returns 400 with `{ error, details }` on validation failure
- [x] PASS: `/api/slides/regenerate` returns 404 with `{ error: "Deck not found" }` when deck doesn't exist
- [x] PASS: `/api/slides/regenerate` returns 404 with `{ error: "Slide not found" }` when slide doesn't exist
- [x] PASS: `/api/slides/regenerate` returns 500 with `{ error: "Slide regeneration failed" }` on unexpected error
- [x] PASS: `/api/slides/generate-image` validates with zod: `prompt` (1-4000 chars), optional `style` enum (`realistic`, `illustration`, `diagram`, `abstract`), optional `aspectRatio` enum (`16:9`, `4:3`, `1:1`, `3:4`)
- [x] PASS: `/api/slides/generate-image` returns `{ imageUrl, attribution }` on success
- [x] PASS: `/api/slides/generate-image` returns 500 with `{ error: "Image generation failed" }` on failure
