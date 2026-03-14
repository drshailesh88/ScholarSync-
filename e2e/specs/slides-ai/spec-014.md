# slides-ai — Spec 014

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### Detailed QA Coverage
- [x] PASS: Gamma-toolbar title edits commit only when the trimmed draft is non-empty and changed from the current title
- [x] PASS: Pressing `Escape` in gamma-toolbar title edit restores the original title and exits edit mode
- [x] PASS: Gamma-toolbar save dot uses `title={status === "idle" ? "saved" : status}` for its native tooltip text
- [x] PASS: Gamma-toolbar card count uses singular/plural card wording automatically
- [x] PASS: Theme dropdown in gamma toolbar is click-open with click-outside dismissal handled by a reusable `Dropdown` wrapper
- [x] PASS: Theme dropdown width is fixed at `320px`
- [x] PASS: Export dropdown in gamma toolbar is click-open with click-outside dismissal handled by the same `Dropdown` wrapper
- [x] PASS: Gamma export button swaps to a spinner and `Exporting...` while any export is in progress
- [x] PASS: Gamma export failure surfaces via `alert(msg)` rather than inline panel error UI
- [x] PASS: `Continue in Slides Mode` always closes the export dropdown before showing the browser confirmation dialog
- [x] PASS: Switching from Gamma to Slides mode requires confirming the exact prompt `Switch to Slides view? Your cards will be displayed as fixed-ratio slides.`
- [x] PASS: Gamma toolbar `Agent` button toggles `agentPanelOpen` in store and changes styling based on open state
- [x] PASS: Gamma toolbar `Present` button uses a filled `Play` icon and sets `isPresenting = true`
- [x] PASS: `OutlineGenerator` step names are `prompt`, `outline`, `theme`, and `generating`
- [x] PASS: Outline-generator prompt step starts with `cardCount = 8`, `audience = "general"`, and `selectedTheme = "modern"`
- [x] PASS: Prompt-step title label includes a visible red asterisk for required input
- [x] PASS: Pressing `Enter` in the outline-generator title input triggers `handleGenerateOutline()` only when title is non-empty
- [x] PASS: Prompt-step audience picker renders ten audience options in a 5-column grid
- [x] PASS: Prompt-step audience icons switch to `duotone` weight only for the active audience
- [x] PASS: Prompt-step card-count slider allows values from 3 to 20
- [x] PASS: Generate-outline CTA label changes to `Generating outline...` while the outline request is in flight
- [x] PASS: Successful outline generation immediately persists `audience` to the slides store via `setAudienceType(audience)`
- [x] PASS: Outline-generation failures remain on the prompt step and show the returned or fallback error text in a red inline alert
- [x] PASS: Outline editor header shows live card count with singular/plural text
- [x] PASS: Outline cards use hover-revealed move-up, move-down, and remove controls in the top-right corner
- [x] PASS: Outline-card remove button is disabled when there is only one outline card left
- [x] PASS: Outline-card titles are plain inputs with placeholder `Card title`
- [x] PASS: Outline-card bullet inputs use placeholder `Key point`
- [x] PASS: Outline-card `Add point` appends an empty bullet string to the current card
- [x] PASS: Outline-step `Add another card` appends a new card titled `New Card` with one bullet `Key point`
- [x] PASS: Outline-step `Back` clears any prior error text before returning to the prompt step
- [x] PASS: Outline-step `Choose Theme` is disabled when the outline array is empty
- [x] PASS: Theme-selection step renders every key from `PRESET_THEMES`, not a limited subset
- [x] PASS: Selected theme in `ThemeSwatchLarge` shows a brand check badge in the top-right corner
- [x] PASS: Theme-step primary CTA label is `Create Presentation`
