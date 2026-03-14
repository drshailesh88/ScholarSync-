# presentation — Spec 018

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
- [ ] Step-0 `From URL` path is considered valid only when at least one URL exists and at least one URL has been fetched successfully
- [ ] Step-0 imported-deck path becomes valid as soon as `importedDeck` is non-null
- [ ] URL source allows adding at most three URLs before the input is replaced by `Maximum of 3 URLs reached`
- [ ] URL add button stays disabled until `inputValue` passes `http:` or `https:` URL validation
- [ ] Pressing `Enter` in the URL input triggers the same `addUrl()` path as clicking `Add`
- [ ] Each URL row shows `Fetch Preview` until fetched, then swaps to fetched metadata and hides the button
- [ ] URL fetch failures render inline red text per-source instead of a global wizard error
- [ ] Step-0 imported-reference summary shows `Clear & re-import` only after references exist
- [ ] Imported-reference rows show the first two authors and append `et al.` when more than two authors exist
- [ ] Step-0 imported deck copies `deck.title` into the wizard title only if the title field is still blank
- [ ] Deep Research source exposes a numeric input only while that source is selected
- [ ] Step 1 opens with `templateId = null` and `audienceType = "general"`
- [ ] Step 1 template grid includes a `No Template (Custom)` card in addition to academic templates
- [ ] Selecting `No Template (Custom)` clears `templateId` without changing audience type
- [ ] Selecting a template forces `audienceType` to the template's configured audience type via `onAudienceChange`
- [ ] Template cards show default slide count and optional estimated duration in their top-right metadata
- [ ] Step-1 audience choices are rendered as pill buttons rather than cards
- [ ] Step-1 `Next` is always enabled and does not require a template selection
- [ ] Step-1 `Back` returns to source selection without clearing imported source state
- [ ] Step 2 heading text is `Configure Presentation`
- [ ] Step-2 title input placeholder is `Presentation title`, not the blank-mode example placeholder
- [ ] Step-2 title input is autofocus-enabled when the step mounts
- [ ] Step-2 title is required only by `title.trim().length > 0`
- [ ] Step-2 target slide count uses a range slider, not a numeric text field
- [ ] Range slider minimum is 5 and maximum is 30
- [ ] Step-2 citation style defaults to `apa`
- [ ] Citation style selector renders as flat pill buttons for APA, MLA, Chicago, Vancouver, and Harvard
- [ ] Step-2 theme picker renders a 7-column grid of all preset themes
- [ ] Template structure preview is hidden until a template is selected
- [ ] Template structure preview toggle label reads `Template Structure Preview ({template name})`
- [ ] Expanded structure preview shows slot title, optional marker, one-line guidance, and layout name for each slot
- [ ] Additional instructions textarea is optional and uses exactly three rows
- [ ] Empty additional instructions are sent to the generate API as `undefined`
- [ ] `Generate` button on step 2 uses `Sparkle` icon and moves to step 3 before preprocess completes
- [ ] Step 3 heading text is `Generating Presentation`
