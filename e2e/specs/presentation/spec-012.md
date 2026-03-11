# presentation — Spec 012

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Audience View (`/presentation/audience`)
- [ ] **20.9** Slide transitions match presenter transitions

### AI Per-Slide Tools (14 Actions)
- [ ] **21.15** Each action sends request to `/api/presentations/edit-slide`
- [ ] **21.16** Modified content blocks replace current blocks on success
- [ ] **21.17** Loading indicator shown during AI processing
- [ ] **21.18** Error message displayed on failure

### Preset Themes (20+)
- [ ] **22.22** Theme picker renders preview swatches for all themes
- [ ] **22.23** Selecting a theme applies it to the entire deck
- [ ] **22.24** Theme change is reflected in sidebar thumbnails
- [ ] **22.25** Custom themes are supported and persistable

### API Routes
#### POST `/api/presentations/generate`
- [ ] **23.1** Accepts title (1-500 chars), preprocessedData (1-200k), audienceType
- [ ] **23.2** Optional params: slideCount, themeKey
- [ ] **23.3** Uses model `claude-sonnet-4-20250514`
- [ ] **23.4** Returns generated deck structure
- [ ] **23.5** Validates title length (1-500)
- [ ] **23.6** Validates preprocessedData length (1-200k)
- [ ] **23.7** Returns 400 on invalid input
#### POST `/api/presentations/preprocess`
- [ ] **23.8** Accepts sourceType and data payload
- [ ] **23.9** Streams response back to client
- [ ] **23.10** Handles all 7 source types (papers/document/text/deep_research/references/url/import_deck)
#### POST `/api/presentations/agent`
- [ ] **23.11** Accepts deckId, command (1-2000 chars), slides (1-100)
- [ ] **23.12** Returns modifiedSlides array and summary string
- [ ] **23.13** Validates command length (1-2000)
- [ ] **23.14** Validates slides count (1-100)
#### POST `/api/presentations/coach`
- [ ] **23.15** Accepts slides for evaluation
- [ ] **23.16** Returns CoachEvaluation with overall score and 5 dimensions
#### POST `/api/presentations/defense-prep`
- [ ] **23.17** Accepts difficulty, focusAreas, conversationHistory
- [ ] **23.18** Returns question, answer evaluation, follow-ups
#### POST `/api/presentations/edit-slide`
- [ ] **23.19** Accepts action and contentBlocks
- [ ] **23.20** Returns modified content blocks
- [ ] **23.21** Uses model `claude-haiku-4-5-20251001`

### Store & State Management
#### Key State Fields
- [ ] **24.1** `deckId` -- tracks active deck identifier
- [ ] **24.2** `slides` -- array of slide objects
- [ ] **24.3** `activeSlideId` -- currently selected slide
- [ ] **24.4** `themeKey` -- selected theme identifier
- [ ] **24.5** `themeConfig` -- resolved theme configuration
