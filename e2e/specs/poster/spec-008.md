# poster — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Detailed QA Coverage
- [x] PASS: `Reference Library` appears as a selectable source card but no import panel is rendered in `NewPosterPage`
- [x] PASS: `From URL` appears as a selectable source card but no URL input panel is rendered in `NewPosterPage`
- [x] PASS: Selecting `Reference Library` leaves `Next` disabled because Step 0 validation does not include the `references` source type
- [x] PASS: Selecting `From URL` leaves `Next` disabled because Step 0 validation does not include the `url` source type
- [x] PASS: Step 0 back navigation uses a `Link` with `href="/poster"` rather than a wizard-local step reset
- [x] PASS: Step 1 opens with `A0 Portrait (841 x 1189 mm)` selected by default
- [x] PASS: Step 1 opens with `Three Column` selected by default
- [x] PASS: Step 1 opens with no template selected
- [x] PASS: Poster size options are rendered as clickable buttons rather than radios or a select input
- [x] PASS: Each poster size card shows only the human-readable label from `POSTER_SIZES`
- [x] PASS: Selected poster size card uses `border-brand bg-brand/5`
- [x] PASS: Grid layout cards show both label and description from `POSTER_GRID_LAYOUTS`
- [x] PASS: Selected grid layout card uses `border-brand bg-brand/5`
- [x] PASS: Template cards render the four template names `Clinical Research`, `Basic Science`, `Systematic Review`, and `Engineering / CS`
- [x] PASS: Template descriptions are clamped to two lines inside each template card
- [x] PASS: Clicking an unselected template sets `templateId` to that key
- [x] PASS: Clicking the already selected template clears `templateId` back to `null`
- [x] PASS: Step 1 `Back` returns to Step 0 without clearing previously entered source data
- [x] PASS: Step 1 `Next` is always enabled and moves to Step 2 with the current selections
- [x] PASS: Step 2 header text reads `Configure Poster` with subcopy `Set title, theme, and generation preferences`
- [x] PASS: `Poster Title` input is autofocused on Step 2 mount
- [x] PASS: `Poster Title` placeholder reads `e.g., Impact of Novel Therapy on Patient Outcomes`
- [x] PASS: `Generate Poster` stays disabled until `title.trim().length > 0`
- [x] PASS: A title consisting only of whitespace keeps `Generate Poster` disabled
- [x] PASS: Non-empty title text enables `Generate Poster` even before any additional instructions are entered
- [x] PASS: Theme picker buttons are generated from `PRESET_THEMES` rather than a hard-coded seven-theme list
- [x] PASS: Each theme swatch renders the theme name as small text inside the preview square
- [x] PASS: Selected theme swatch uses `border-brand ring-1 ring-brand/30`
- [x] PASS: `Additional Instructions` textarea is optional and uses exactly three visible rows
- [x] PASS: Empty additional instructions are sent as `undefined` rather than an empty string in the generation request
- [x] PASS: Template structure toggle is hidden until a template is selected
- [x] PASS: Template structure toggle starts collapsed when a template is first selected
- [x] PASS: Template structure toggle label includes the currently selected template name in parentheses
- [x] PASS: Expanding template structure shows numbered rows for each template section
- [x] PASS: Expanded template structure rows show section title, optional `spans N cols`, and one-line guidance text
