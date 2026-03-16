# slides — Spec 016

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Successful PPTX preview shows title, slide count, optional theme name, and original filename in a summary card
- [x] PASS: Slide preview cards show slide index, layout label, and image count only when `imageCount > 0`
- [x] PASS: Slide preview text is clamped to three lines in the import preview
- [x] PASS: Import preview shows only the first six extracted slide previews even when more exist
- [x] PASS: Import warnings are capped to the first three visible rows plus a `+N more warnings` summary line
- [x] PASS: Ready-state primary import button label is `Import into ScholarSync`
- [x] PASS: Importing-state primary import button label changes to `Importing...`
- [x] PASS: Secondary import action label is `Choose another file`
- [x] PASS: Successful import redirects directly to `/slides/{deckId}`
- [x] PASS: Failed import after preview returns to `ready` phase and preserves the preview card
- [x] PASS: Empty state on `/slides` is a dashed border panel rather than a plain centered message
- [x] PASS: Empty-state helper copy explicitly mentions creating a new deck or importing an existing PowerPoint presentation
- [x] PASS: Non-empty deck cards use a generic `Presentation` icon placeholder, not a real slide thumbnail preview
- [x] PASS: Slides list cards show only title, slide count, theme name, and updated date
- [x] PASS: Slides list card delete button is hover-revealed and positioned in the top-right corner
- [x] PASS: Slides list delete failures are ignored silently after confirmation
- [x] PASS: `/slides/new` uses step names `topic`, `audience`, `theme`, and `generating` rather than a generic wizard index
- [x] PASS: `/slides/new` starts with `step = "topic"`, `audienceType = "general"`, and `themeKey = "modern"`
- [x] PASS: Topic-step title is `What's your presentation about?`
- [x] PASS: Topic-step helper copy says `Give it a title and optionally describe the content`
- [x] PASS: Topic-step title input is autofocus-enabled
- [x] PASS: Topic-step description textarea uses four rows
- [x] PASS: Topic-step `Next` is disabled only when trimmed title is empty
- [x] PASS: Audience-step title is `Who's your audience?`
- [x] PASS: Audience-step helper copy says it helps tailor language, depth, and style
- [x] PASS: Audience-step renders exactly seven audience options in a 2-column grid
- [x] PASS: Audience option labels are `General`, `Conference`, `Thesis Defense`, `Journal Club`, `Classroom`, `Grant`, and `Poster`
- [x] PASS: Theme-step title is `Pick a theme`
- [x] PASS: Theme-step helper copy says the theme can be changed anytime in the editor
- [x] PASS: Theme-step theme list is limited to the first eight keys from `PRESET_THEMES`
- [x] PASS: Theme-step preview tiles show only abstract bars and the capitalized theme key label
- [x] PASS: Theme-step primary CTA label is `Create Presentation`
- [x] PASS: Clicking `Create Presentation` immediately switches the route to the `generating` step before server work completes
- [x] PASS: Generating step shows a spinner ring plus heading `Creating your presentation`
- [x] PASS: Creating a slides deck calls `createDeck` with title, optional description, and audience only; no theme is persisted at deck creation time
