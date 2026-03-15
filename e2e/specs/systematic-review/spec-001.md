# systematic-review — Spec 001

STATUS: PARTIAL
TESTED: 35/35
PASS: 23
FAIL: 12
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Page Overview & Architecture
#### Technology Stack
- [x] PASS: **Liveblocks** — real-time collaboration via `SRRoomProvider`
- [x] PASS: **Zustand** — state management with `systematic-review-store.ts` (persistence enabled)
- [x] PASS: **15 panel components** — one per workflow tab
- [x] PASS: **7-stage stepper** — tracks overall review progress

### Hub Page — Project List
#### Header
- [ ] FAIL: **Icon** — FlowArrow icon displayed next to title
- [x] PASS: **Title** — "Systematic Reviews" heading rendered
- [x] PASS: **Description** — "PRISMA 2020-compliant systematic review pipeline with AI-powered screening, data extraction, and risk of bias assessment"
#### Project List
- [x] PASS: **Projects load on mount** — fetches from `GET /api/systematic-review/projects`
- [x] PASS: **Loading state** — shows loading indicator while projects fetch
- [x] PASS: **Empty state** — appropriate message when no projects exist
- [ ] FAIL: **Project cards** — renders one card per project (see section 4)
- [ ] FAIL: **Grid layout** — cards arranged in responsive grid

### Hub Page — Create New Review
#### "New Review" Button
- [x] PASS: **Button label** — "New Review"
- [ ] FAIL: **Icon** — Plus icon displayed in button
- [ ] FAIL: **Click action** — toggles visibility of create form
- [ ] FAIL: **Button position** — in header area, visually prominent
#### Create Form
- [x] PASS: **Title input** — text input for review title
- [x] PASS: **Placeholder** — "e.g., Metformin vs Sulfonylureas for T2DM: A Systematic Review"
- [x] PASS: **"Create Review" button** — submits the form
- [x] PASS: **Spinner** — loading spinner shown on "Create Review" button during submission
- [ ] FAIL: **"Cancel" button** — hides the create form without submitting
- [ ] FAIL: **Validation** — empty title cannot be submitted
- [x] PASS: **Success** — navigates to newly created project workflow page
- [ ] FAIL: **Error handling** — displays error if creation fails
- [x] PASS: **API call** — `POST /api/systematic-review/config` to create the review

### Hub Page — Project Cards
#### Card Content
- [ ] FAIL: **Title** — project title displayed prominently
- [ ] FAIL: **Stage badge** — shows current stage with color coding
- [x] PASS: **Paper count** — number of papers in the review
- [x] PASS: **Screening progress** — percentage of papers screened
- [x] PASS: **Progress bar** — visual bar representing screening completion
#### Card Interactions
- [x] PASS: **Click** — navigates to `/systematic-review/[projectId]`
- [x] PASS: **Hover state** — visual feedback on card hover
- [x] PASS: **Progress bar fill** — proportional to screening progress percentage
- [ ] FAIL: **Paper count formatting** — correct numeric display

### Workflow Page — Layout & Navigation
#### Wrapper
- [x] PASS: **SRRoomProvider** — page wrapped in Liveblocks room provider for real-time collaboration
