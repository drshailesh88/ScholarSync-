# slides — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Deck List Page (`/slides`)
- [x] PASS: Page loads and displays existing decks
- [x] PASS: "New Presentation" button navigates to `/slides/new`
- [x] PASS: **PPTX Import:**
- [x] PASS: "Import Presentation" button opens file picker
- [x] PASS: Accepts `.pptx` files up to 50 MB
- [x] PASS: Rejects files over 50 MB with error message
- [x] PASS: Detects password-protected files and shows warning
- [x] PASS: Shows inline import preview with up to 6 slide preview cards
- [x] PASS: Displays import warnings (unsupported features, etc.)
- [x] PASS: "Confirm Import" creates a new deck from the PPTX
- [x] PASS: Close button resets the inline import panel
- [x] PASS: Each deck card shows title, generic presentation placeholder, slide count
- [x] PASS: Click a deck to open it in the slides editor

### New Presentation Wizard (`/slides/new`)
#### Step 1 — Topic
- [x] PASS: Text input for presentation topic
- [x] PASS: Topic field is required before advancing
#### Step 2 — Audience
- [x] PASS: 7 audience type options displayed:
- [x] PASS: General
- [x] PASS: Conference
- [x] PASS: Thesis Defense
- [x] PASS: Journal Club
- [x] PASS: Classroom
- [x] PASS: Grant Presentation
- [x] PASS: Poster Session
- [x] PASS: Selecting an audience type highlights it
- [x] PASS: Can proceed to next step after selection
#### Step 3 — Theme
- [x] PASS: 8 preset themes displayed with previews
- [x] PASS: Clicking a theme selects it (visual highlight)
- [x] PASS: "Create" button submits and generates the deck
- [x] PASS: After creation, redirects to the slides editor
- [x] PASS: Initial title slide is created immediately; background slide generation only runs when description is provided

### Workspace Layout
- [x] PASS: Three-panel layout: Filmstrip (left) | Canvas (center) | Properties Panel (right)
- [x] PASS: Speaker Notes bar at the bottom (collapsible)
- [x] PASS: Canvas rulers toggle on/off
- [x] PASS: Grid overlay toggle on/off
- [x] PASS: Top toolbar with mode controls, save status, present button
