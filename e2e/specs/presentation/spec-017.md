# presentation — Spec 017

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### Detailed QA Coverage
- [ ] Deck-card preview uses the resolved theme background color and a 1px top accent bar based on theme primary color
- [ ] Deck-card delete button is hidden until card hover via `opacity-0 group-hover:opacity-100`
- [ ] Clicking the delete button stops link navigation with both `preventDefault()` and `stopPropagation()`
- [ ] Delete confirmation uses the browser-native prompt text `Delete this presentation?`
- [ ] Successful delete removes the deck optimistically from local state without refetching the list
- [ ] List-page load failures are logged to console and leave the page in a non-loading state without an inline error banner
- [ ] AI badge appears only when `generationStatus === "completed"`, not for other AI-related statuses
- [ ] Modified date on cards is formatted with `toLocaleDateString()` rather than relative time
- [ ] Blank-mode new presentation page renders inside a `Suspense` boundary with a centered `Loading...` fallback
- [ ] New-presentation header back button is icon-only and links to `/presentation`
- [ ] Header title changes between `New Presentation` and `AI Presentation Generator` based on `mode=ai`
- [ ] Blank mode opens with `title`, `description`, and `creating` all empty/false and `audience = "general"`
- [ ] Blank mode opens with `themeKey = "modern"`
- [ ] Title input in blank mode is autofocused on first render
- [ ] Blank-mode title field does not show an inline validation error; it simply keeps `Create Blank Deck` disabled when trimmed title is empty
- [ ] Description textarea is optional, uses three rows, and placeholder `Brief description of your presentation`
- [ ] Audience buttons render in a responsive `2 / 3` column grid depending on viewport width
- [ ] Selected audience button uses `border-brand bg-brand/5`
- [ ] Blank-mode theme picker renders all themes from `PRESET_THEMES`, not a fixed set of four
- [ ] Blank-mode theme tiles render as aspect-video previews with the theme name centered inside
- [ ] `Create Blank Deck` is disabled when `creating` is true even if title is present
- [ ] `Create Blank Deck` swaps its label to `Creating...` while the deck is being created
- [ ] Blank deck creation trims title and description before passing them to `createDeck`
- [ ] Blank deck creation passes `sourceType: "custom"` and `audienceType: audience` to `createDeck`
- [ ] Blank deck creation immediately creates slide 0 as `title_slide` with empty `contentBlocks`
- [ ] Blank deck creation sets the new slide subtitle to trimmed description or fallback text `Click to edit`
- [ ] Blank deck creation redirects directly to `/presentation/{deckId}` after `createSlide` succeeds
- [ ] Blank deck creation failures are logged to console and leave the user on the same page with `creating` reset to false
- [ ] Secondary mode-switch CTA uses a bordered link labeled `Generate with AI`
- [ ] AI wizard step indicator labels read `Select Source`, `Template & Audience`, `Configure`, and `Generate`
- [ ] AI wizard starts on step 0 with `sourceType = "text"` and `title = ""`
- [ ] AI wizard `Next` on step 0 starts disabled because raw text is empty
- [ ] AI wizard supports `references`, `url`, and `import_deck` as real step-0 paths in addition to papers/document/text/deep research
- [ ] Step 0 uses the shared `SourceSelector` grid plus a separate full-width `From Deep Research` card beneath it
- [ ] Step-0 `Reference Library` path is considered valid only when `selectedReferences.length > 0`
