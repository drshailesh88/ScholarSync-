# presentation — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Audience View (`/presentation/audience`)
- [x] PASS: **20.9** Slide transitions match presenter transitions

### AI Per-Slide Tools (14 Actions)
- [x] PASS: **21.15** Each action sends request to `/api/presentations/edit-slide`
- [x] PASS: **21.16** Modified content blocks replace current blocks on success
- [x] PASS: **21.17** Loading indicator shown during AI processing
- [x] PASS: **21.18** Error message displayed on failure

### Preset Themes (20+)
- [x] PASS: **22.22** Theme picker renders preview swatches for all themes
- [x] PASS: **22.23** Selecting a theme applies it to the entire deck
- [x] PASS: **22.24** Theme change is reflected in sidebar thumbnails
- [x] PASS: **22.25** Custom themes are supported and persistable

### API Routes
#### POST `/api/presentations/generate`
- [x] PASS: **23.1** Accepts title (1-500 chars), preprocessedData (1-200k), audienceType
- [x] PASS: **23.2** Optional params: slideCount, themeKey
- [x] PASS: **23.3** Uses model `claude-sonnet-4-20250514`
- [x] PASS: **23.4** Returns generated deck structure
- [x] PASS: **23.5** Validates title length (1-500)
- [x] PASS: **23.6** Validates preprocessedData length (1-200k)
- [x] PASS: **23.7** Returns 400 on invalid input
#### POST `/api/presentations/preprocess`
- [x] PASS: **23.8** Accepts sourceType and data payload
- [x] PASS: **23.9** Streams response back to client
- [x] PASS: **23.10** Handles all 7 source types (papers/document/text/deep_research/references/url/import_deck)
#### POST `/api/presentations/agent`
- [x] PASS: **23.11** Accepts deckId, command (1-2000 chars), slides (1-100)
- [x] PASS: **23.12** Returns modifiedSlides array and summary string
- [x] PASS: **23.13** Validates command length (1-2000)
- [x] PASS: **23.14** Validates slides count (1-100)
#### POST `/api/presentations/coach`
- [x] PASS: **23.15** Accepts slides for evaluation
- [x] PASS: **23.16** Returns CoachEvaluation with overall score and 5 dimensions
#### POST `/api/presentations/defense-prep`
- [x] PASS: **23.17** Accepts difficulty, focusAreas, conversationHistory
- [x] PASS: **23.18** Returns question, answer evaluation, follow-ups
#### POST `/api/presentations/edit-slide`
- [x] PASS: **23.19** Accepts action and contentBlocks
- [x] PASS: **23.20** Returns modified content blocks
- [x] PASS: **23.21** Uses model `claude-haiku-4-5-20251001`

### Store & State Management
#### Key State Fields
- [x] PASS: **24.1** `deckId` -- tracks active deck identifier
- [x] PASS: **24.2** `slides` -- array of slide objects
- [x] PASS: **24.3** `activeSlideId` -- currently selected slide
- [x] PASS: **24.4** `themeKey` -- selected theme identifier
- [x] PASS: **24.5** `themeConfig` -- resolved theme configuration
