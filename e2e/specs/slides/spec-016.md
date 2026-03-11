# slides — Spec 016

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Successful PPTX preview shows title, slide count, optional theme name, and original filename in a summary card
- [ ] Slide preview cards show slide index, layout label, and image count only when `imageCount > 0`
- [ ] Slide preview text is clamped to three lines in the import preview
- [ ] Import preview shows only the first six extracted slide previews even when more exist
- [ ] Import warnings are capped to the first three visible rows plus a `+N more warnings` summary line
- [ ] Ready-state primary import button label is `Import into ScholarSync`
- [ ] Importing-state primary import button label changes to `Importing...`
- [ ] Secondary import action label is `Choose another file`
- [ ] Successful import redirects directly to `/slides/{deckId}`
- [ ] Failed import after preview returns to `ready` phase and preserves the preview card
- [ ] Empty state on `/slides` is a dashed border panel rather than a plain centered message
- [ ] Empty-state helper copy explicitly mentions creating a new deck or importing an existing PowerPoint presentation
- [ ] Non-empty deck cards use a generic `Presentation` icon placeholder, not a real slide thumbnail preview
- [ ] Slides list cards show only title, slide count, theme name, and updated date
- [ ] Slides list card delete button is hover-revealed and positioned in the top-right corner
- [ ] Slides list delete failures are ignored silently after confirmation
- [ ] `/slides/new` uses step names `topic`, `audience`, `theme`, and `generating` rather than a generic wizard index
- [ ] `/slides/new` starts with `step = "topic"`, `audienceType = "general"`, and `themeKey = "modern"`
- [ ] Topic-step title is `What's your presentation about?`
- [ ] Topic-step helper copy says `Give it a title and optionally describe the content`
- [ ] Topic-step title input is autofocus-enabled
- [ ] Topic-step description textarea uses four rows
- [ ] Topic-step `Next` is disabled only when trimmed title is empty
- [ ] Audience-step title is `Who's your audience?`
- [ ] Audience-step helper copy says it helps tailor language, depth, and style
- [ ] Audience-step renders exactly seven audience options in a 2-column grid
- [ ] Audience option labels are `General`, `Conference`, `Thesis Defense`, `Journal Club`, `Classroom`, `Grant`, and `Poster`
- [ ] Theme-step title is `Pick a theme`
- [ ] Theme-step helper copy says the theme can be changed anytime in the editor
- [ ] Theme-step theme list is limited to the first eight keys from `PRESET_THEMES`
- [ ] Theme-step preview tiles show only abstract bars and the capitalized theme key label
- [ ] Theme-step primary CTA label is `Create Presentation`
- [ ] Clicking `Create Presentation` immediately switches the route to the `generating` step before server work completes
- [ ] Generating step shows a spinner ring plus heading `Creating your presentation`
- [ ] Creating a slides deck calls `createDeck` with title, optional description, and audience only; no theme is persisted at deck creation time
