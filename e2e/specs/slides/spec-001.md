# slides — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Deck List Page (`/slides`)
- [ ] Page loads and displays existing decks
- [ ] "New Presentation" button navigates to `/slides/new`
- [ ] **PPTX Import:**
- [ ] "Import Presentation" button opens file picker
- [ ] Accepts `.pptx` files up to 50 MB
- [ ] Rejects files over 50 MB with error message
- [ ] Detects password-protected files and shows warning
- [ ] Shows inline import preview with up to 6 slide preview cards
- [ ] Displays import warnings (unsupported features, etc.)
- [ ] "Confirm Import" creates a new deck from the PPTX
- [ ] Close button resets the inline import panel
- [ ] Each deck card shows title, generic presentation placeholder, slide count
- [ ] Click a deck to open it in the slides editor

### New Presentation Wizard (`/slides/new`)
#### Step 1 — Topic
- [ ] Text input for presentation topic
- [ ] Topic field is required before advancing
#### Step 2 — Audience
- [ ] 7 audience type options displayed:
- [ ] General
- [ ] Conference
- [ ] Thesis Defense
- [ ] Journal Club
- [ ] Classroom
- [ ] Grant Presentation
- [ ] Poster Session
- [ ] Selecting an audience type highlights it
- [ ] Can proceed to next step after selection
#### Step 3 — Theme
- [ ] 8 preset themes displayed with previews
- [ ] Clicking a theme selects it (visual highlight)
- [ ] "Create" button submits and generates the deck
- [ ] After creation, redirects to the slides editor
- [ ] Initial title slide is created immediately; background slide generation only runs when description is provided

### Workspace Layout
- [ ] Three-panel layout: Filmstrip (left) | Canvas (center) | Properties Panel (right)
- [ ] Speaker Notes bar at the bottom (collapsible)
- [ ] Canvas rulers toggle on/off
- [ ] Grid overlay toggle on/off
- [ ] Top toolbar with mode controls, save status, present button
