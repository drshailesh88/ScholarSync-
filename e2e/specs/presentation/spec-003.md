# presentation — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)
#### Step 2 -- Configure
- [ ] **3.30** Citation style: MLA
- [ ] **3.31** Citation style: Chicago
- [ ] **3.32** Citation style: Vancouver
- [ ] **3.33** Citation style: Harvard
- [ ] **3.34** Structure preview renders based on configuration
- [ ] **3.35** Advancing to Step 3 triggers generation
#### Step 3 -- Generate
- [ ] **3.36** Step 3 header displays "Generate"
- [ ] **3.37** Preprocess stream initiates and shows progress
- [ ] **3.38** Generation step runs after preprocessing
- [ ] **3.40** Error during generation shows meaningful message
- [ ] **3.41** Back button works to return to previous steps

### Deck Editor -- Layout & Navigation (`/presentation/[deckId]`)
- [ ] **4.1** Three-column layout renders: sidebar (left), canvas (center), panel (right)
- [ ] **4.2** Left sidebar is ~w-64 width
- [ ] **4.3** Right panel is ~w-72 width
- [ ] **4.4** Center canvas fills remaining space
- [ ] **4.5** Editor loads deck data from deckId route param

### Slide Outline Sidebar (Left Column)
- [ ] **5.1** SlideOutlineSidebar component renders at w-64
- [ ] **5.2** Slide thumbnails render at 0.35 scale
- [ ] **5.3** Clicking a thumbnail selects that slide in the canvas
- [ ] **5.4** Active slide is visually highlighted
- [ ] **5.5** Drag-and-drop reorders slides
- [ ] **5.6** Reorder persists after dropping
- [ ] **5.7** Comment badges appear on slides with comments
- [ ] **5.8** Delete button is present on each slide entry
- [ ] **5.9** Deleting a slide removes it from the list
- [ ] **5.10** Add new slide button/action is available

### Slide Canvas (Center Column)
- [ ] **6.1** SlideCanvas component renders
- [ ] **6.2** Preview mode displays slide read-only
- [ ] **6.3** Edit mode enables inline editing
- [ ] **6.4** Toggle between Preview and Edit modes
- [ ] **6.5** Title field is editable in edit mode
- [ ] **6.6** Subtitle field is editable in edit mode
- [ ] **6.7** Content blocks are editable in edit mode
- [ ] **6.8** Changes reflect immediately in the sidebar thumbnail
- [ ] **6.9** Slide respects the selected theme styling
