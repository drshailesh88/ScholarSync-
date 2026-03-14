# poster — Spec 008

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
- [ ] `Reference Library` appears as a selectable source card but no import panel is rendered in `NewPosterPage`
- [ ] `From URL` appears as a selectable source card but no URL input panel is rendered in `NewPosterPage`
- [ ] Selecting `Reference Library` leaves `Next` disabled because Step 0 validation does not include the `references` source type
- [ ] Selecting `From URL` leaves `Next` disabled because Step 0 validation does not include the `url` source type
- [ ] Step 0 back navigation uses a `Link` with `href="/poster"` rather than a wizard-local step reset
- [ ] Step 1 opens with `A0 Portrait (841 x 1189 mm)` selected by default
- [ ] Step 1 opens with `Three Column` selected by default
- [ ] Step 1 opens with no template selected
- [ ] Poster size options are rendered as clickable buttons rather than radios or a select input
- [ ] Each poster size card shows only the human-readable label from `POSTER_SIZES`
- [ ] Selected poster size card uses `border-brand bg-brand/5`
- [ ] Grid layout cards show both label and description from `POSTER_GRID_LAYOUTS`
- [ ] Selected grid layout card uses `border-brand bg-brand/5`
- [ ] Template cards render the four template names `Clinical Research`, `Basic Science`, `Systematic Review`, and `Engineering / CS`
- [ ] Template descriptions are clamped to two lines inside each template card
- [ ] Clicking an unselected template sets `templateId` to that key
- [ ] Clicking the already selected template clears `templateId` back to `null`
- [ ] Step 1 `Back` returns to Step 0 without clearing previously entered source data
- [ ] Step 1 `Next` is always enabled and moves to Step 2 with the current selections
- [ ] Step 2 header text reads `Configure Poster` with subcopy `Set title, theme, and generation preferences`
- [ ] `Poster Title` input is autofocused on Step 2 mount
- [ ] `Poster Title` placeholder reads `e.g., Impact of Novel Therapy on Patient Outcomes`
- [ ] `Generate Poster` stays disabled until `title.trim().length > 0`
- [ ] A title consisting only of whitespace keeps `Generate Poster` disabled
- [ ] Non-empty title text enables `Generate Poster` even before any additional instructions are entered
- [ ] Theme picker buttons are generated from `PRESET_THEMES` rather than a hard-coded seven-theme list
- [ ] Each theme swatch renders the theme name as small text inside the preview square
- [ ] Selected theme swatch uses `border-brand ring-1 ring-brand/30`
- [ ] `Additional Instructions` textarea is optional and uses exactly three visible rows
- [ ] Empty additional instructions are sent as `undefined` rather than an empty string in the generation request
- [ ] Template structure toggle is hidden until a template is selected
- [ ] Template structure toggle starts collapsed when a template is first selected
- [ ] Template structure toggle label includes the currently selected template name in parentheses
- [ ] Expanding template structure shows numbered rows for each template section
- [ ] Expanded template structure rows show section title, optional `spans N cols`, and one-line guidance text
