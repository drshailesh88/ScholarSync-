# systematic-review — Spec 001

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Page Overview & Architecture
#### Technology Stack
- [ ] **Liveblocks** — real-time collaboration via `SRRoomProvider`
- [ ] **Zustand** — state management with `systematic-review-store.ts` (persistence enabled)
- [ ] **15 panel components** — one per workflow tab
- [ ] **7-stage stepper** — tracks overall review progress

### Hub Page — Project List
#### Header
- [ ] **Icon** — FlowArrow icon displayed next to title
- [ ] **Title** — "Systematic Reviews" heading rendered
- [ ] **Description** — "PRISMA 2020-compliant systematic review pipeline with AI-powered screening, data extraction, and risk of bias assessment"
#### Project List
- [ ] **Projects load on mount** — fetches from `GET /api/systematic-review/projects`
- [ ] **Loading state** — shows loading indicator while projects fetch
- [ ] **Empty state** — appropriate message when no projects exist
- [ ] **Project cards** — renders one card per project (see section 4)
- [ ] **Grid layout** — cards arranged in responsive grid

### Hub Page — Create New Review
#### "New Review" Button
- [ ] **Button label** — "New Review"
- [ ] **Icon** — Plus icon displayed in button
- [ ] **Click action** — toggles visibility of create form
- [ ] **Button position** — in header area, visually prominent
#### Create Form
- [ ] **Title input** — text input for review title
- [ ] **Placeholder** — "e.g., Metformin vs Sulfonylureas for T2DM: A Systematic Review"
- [ ] **"Create Review" button** — submits the form
- [ ] **Spinner** — loading spinner shown on "Create Review" button during submission
- [ ] **"Cancel" button** — hides the create form without submitting
- [ ] **Validation** — empty title cannot be submitted
- [ ] **Success** — navigates to newly created project workflow page
- [ ] **Error handling** — displays error if creation fails
- [ ] **API call** — `POST /api/systematic-review/config` to create the review

### Hub Page — Project Cards
#### Card Content
- [ ] **Title** — project title displayed prominently
- [ ] **Stage badge** — shows current stage with color coding
- [ ] **Paper count** — number of papers in the review
- [ ] **Screening progress** — percentage of papers screened
- [ ] **Progress bar** — visual bar representing screening completion
#### Card Interactions
- [ ] **Click** — navigates to `/systematic-review/[projectId]`
- [ ] **Hover state** — visual feedback on card hover
- [ ] **Progress bar fill** — proportional to screening progress percentage
- [ ] **Paper count formatting** — correct numeric display

### Workflow Page — Layout & Navigation
#### Wrapper
- [ ] **SRRoomProvider** — page wrapped in Liveblocks room provider for real-time collaboration
