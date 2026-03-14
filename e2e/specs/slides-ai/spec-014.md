# slides-ai — Spec 014

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### Detailed QA Coverage
- [ ] Gamma-toolbar title edits commit only when the trimmed draft is non-empty and changed from the current title
- [ ] Pressing `Escape` in gamma-toolbar title edit restores the original title and exits edit mode
- [ ] Gamma-toolbar save dot uses `title={status === "idle" ? "saved" : status}` for its native tooltip text
- [ ] Gamma-toolbar card count uses singular/plural card wording automatically
- [ ] Theme dropdown in gamma toolbar is click-open with click-outside dismissal handled by a reusable `Dropdown` wrapper
- [ ] Theme dropdown width is fixed at `320px`
- [ ] Export dropdown in gamma toolbar is click-open with click-outside dismissal handled by the same `Dropdown` wrapper
- [ ] Gamma export button swaps to a spinner and `Exporting...` while any export is in progress
- [ ] Gamma export failure surfaces via `alert(msg)` rather than inline panel error UI
- [ ] `Continue in Slides Mode` always closes the export dropdown before showing the browser confirmation dialog
- [ ] Switching from Gamma to Slides mode requires confirming the exact prompt `Switch to Slides view? Your cards will be displayed as fixed-ratio slides.`
- [ ] Gamma toolbar `Agent` button toggles `agentPanelOpen` in store and changes styling based on open state
- [ ] Gamma toolbar `Present` button uses a filled `Play` icon and sets `isPresenting = true`
- [ ] `OutlineGenerator` step names are `prompt`, `outline`, `theme`, and `generating`
- [ ] Outline-generator prompt step starts with `cardCount = 8`, `audience = "general"`, and `selectedTheme = "modern"`
- [ ] Prompt-step title label includes a visible red asterisk for required input
- [ ] Pressing `Enter` in the outline-generator title input triggers `handleGenerateOutline()` only when title is non-empty
- [ ] Prompt-step audience picker renders ten audience options in a 5-column grid
- [ ] Prompt-step audience icons switch to `duotone` weight only for the active audience
- [ ] Prompt-step card-count slider allows values from 3 to 20
- [ ] Generate-outline CTA label changes to `Generating outline...` while the outline request is in flight
- [ ] Successful outline generation immediately persists `audience` to the slides store via `setAudienceType(audience)`
- [ ] Outline-generation failures remain on the prompt step and show the returned or fallback error text in a red inline alert
- [ ] Outline editor header shows live card count with singular/plural text
- [ ] Outline cards use hover-revealed move-up, move-down, and remove controls in the top-right corner
- [ ] Outline-card remove button is disabled when there is only one outline card left
- [ ] Outline-card titles are plain inputs with placeholder `Card title`
- [ ] Outline-card bullet inputs use placeholder `Key point`
- [ ] Outline-card `Add point` appends an empty bullet string to the current card
- [ ] Outline-step `Add another card` appends a new card titled `New Card` with one bullet `Key point`
- [ ] Outline-step `Back` clears any prior error text before returning to the prompt step
- [ ] Outline-step `Choose Theme` is disabled when the outline array is empty
- [ ] Theme-selection step renders every key from `PRESET_THEMES`, not a limited subset
- [ ] Selected theme in `ThemeSwatchLarge` shows a brand check badge in the top-right corner
- [ ] Theme-step primary CTA label is `Create Presentation`
