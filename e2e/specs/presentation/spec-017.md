# presentation — Spec 017

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### Detailed QA Coverage
- [x] PASS: Deck-card preview uses the resolved theme background color and a 1px top accent bar based on theme primary color
- [x] PASS: Deck-card delete button is hidden until card hover via `opacity-0 group-hover:opacity-100`
- [x] PASS: Clicking the delete button stops link navigation with both `preventDefault()` and `stopPropagation()`
- [x] PASS: Delete confirmation uses the browser-native prompt text `Delete this presentation?`
- [x] PASS: Successful delete removes the deck optimistically from local state without refetching the list
- [x] PASS: List-page load failures are logged to console and leave the page in a non-loading state without an inline error banner
- [x] PASS: AI badge appears only when `generationStatus === "completed"`, not for other AI-related statuses
- [x] PASS: Modified date on cards is formatted with `toLocaleDateString()` rather than relative time
- [x] PASS: Blank-mode new presentation page renders inside a `Suspense` boundary with a centered `Loading...` fallback
- [x] PASS: New-presentation header back button is icon-only and links to `/presentation`
- [x] PASS: Header title changes between `New Presentation` and `AI Presentation Generator` based on `mode=ai`
- [x] PASS: Blank mode opens with `title`, `description`, and `creating` all empty/false and `audience = "general"`
- [x] PASS: Blank mode opens with `themeKey = "modern"`
- [x] PASS: Title input in blank mode is autofocused on first render
- [x] PASS: Blank-mode title field does not show an inline validation error; it simply keeps `Create Blank Deck` disabled when trimmed title is empty
- [x] PASS: Description textarea is optional, uses three rows, and placeholder `Brief description of your presentation`
- [x] PASS: Audience buttons render in a responsive `2 / 3` column grid depending on viewport width
- [x] PASS: Selected audience button uses `border-brand bg-brand/5`
- [x] PASS: Blank-mode theme picker renders all themes from `PRESET_THEMES`, not a fixed set of four
- [x] PASS: Blank-mode theme tiles render as aspect-video previews with the theme name centered inside
- [x] PASS: `Create Blank Deck` is disabled when `creating` is true even if title is present
- [x] PASS: `Create Blank Deck` swaps its label to `Creating...` while the deck is being created
- [x] PASS: Blank deck creation trims title and description before passing them to `createDeck`
- [x] PASS: Blank deck creation passes `sourceType: "custom"` and `audienceType: audience` to `createDeck`
- [x] PASS: Blank deck creation immediately creates slide 0 as `title_slide` with empty `contentBlocks`
- [x] PASS: Blank deck creation sets the new slide subtitle to trimmed description or fallback text `Click to edit`
- [x] PASS: Blank deck creation redirects directly to `/presentation/{deckId}` after `createSlide` succeeds
- [x] PASS: Blank deck creation failures are logged to console and leave the user on the same page with `creating` reset to false
- [x] PASS: Secondary mode-switch CTA uses a bordered link labeled `Generate with AI`
- [x] PASS: AI wizard step indicator labels read `Select Source`, `Template & Audience`, `Configure`, and `Generate`
- [x] PASS: AI wizard starts on step 0 with `sourceType = "text"` and `title = ""`
- [x] PASS: AI wizard `Next` on step 0 starts disabled because raw text is empty
- [x] PASS: AI wizard supports `references`, `url`, and `import_deck` as real step-0 paths in addition to papers/document/text/deep research
- [x] PASS: Step 0 uses the shared `SourceSelector` grid plus a separate full-width `From Deep Research` card beneath it
- [x] PASS: Step-0 `Reference Library` path is considered valid only when `selectedReferences.length > 0`
