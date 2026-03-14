# presentation — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)
#### Step 2 -- Configure
- [x] PASS: **3.30** Citation style: MLA
- [x] PASS: **3.31** Citation style: Chicago
- [x] PASS: **3.32** Citation style: Vancouver
- [x] PASS: **3.33** Citation style: Harvard
- [x] PASS: **3.34** Structure preview renders based on configuration
- [x] PASS: **3.35** Advancing to Step 3 triggers generation
#### Step 3 -- Generate
- [x] PASS: **3.36** Step 3 header displays "Generate"
- [x] PASS: **3.37** Preprocess stream initiates and shows progress
- [x] PASS: **3.38** Generation step runs after preprocessing
- [x] PASS: **3.40** Error during generation shows meaningful message
- [x] PASS: **3.41** Back button works to return to previous steps

### Deck Editor -- Layout & Navigation (`/presentation/[deckId]`)
- [x] PASS: **4.1** Three-column layout renders: sidebar (left), canvas (center), panel (right)
- [x] PASS: **4.2** Left sidebar is ~w-64 width
- [x] PASS: **4.3** Right panel is ~w-72 width
- [x] PASS: **4.4** Center canvas fills remaining space
- [x] PASS: **4.5** Editor loads deck data from deckId route param

### Slide Outline Sidebar (Left Column)
- [x] PASS: **5.1** SlideOutlineSidebar component renders at w-64
- [x] PASS: **5.2** Slide thumbnails render at 0.35 scale
- [x] PASS: **5.3** Clicking a thumbnail selects that slide in the canvas
- [x] PASS: **5.4** Active slide is visually highlighted
- [x] PASS: **5.5** Drag-and-drop reorders slides
- [x] PASS: **5.6** Reorder persists after dropping
- [x] PASS: **5.7** Comment badges appear on slides with comments
- [x] PASS: **5.8** Delete button is present on each slide entry
- [x] PASS: **5.9** Deleting a slide removes it from the list
- [x] PASS: **5.10** Add new slide button/action is available

### Slide Canvas (Center Column)
- [x] PASS: **6.1** SlideCanvas component renders
- [x] PASS: **6.2** Preview mode displays slide read-only
- [x] PASS: **6.3** Edit mode enables inline editing
- [x] PASS: **6.4** Toggle between Preview and Edit modes
- [x] PASS: **6.5** Title field is editable in edit mode
- [x] PASS: **6.6** Subtitle field is editable in edit mode
- [x] PASS: **6.7** Content blocks are editable in edit mode
- [x] PASS: **6.8** Changes reflect immediately in the sidebar thumbnail
- [x] PASS: **6.9** Slide respects the selected theme styling
