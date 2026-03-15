# systematic-review — Spec 002

STATUS: PARTIAL
TESTED: 35/35
PASS: 29
FAIL: 6
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Workflow Page — Layout & Navigation
#### Wrapper
- [ ] FAIL: **Project ID** — extracted from URL params and used to fetch/hydrate state
#### Navigation
- [x] PASS: **Back link** — "All Reviews" text link navigates back to `/systematic-review`
- [x] PASS: **Back link position** — top-left of page
- [ ] FAIL: **Browser back** — back navigation returns to hub page

### Workflow Page — Collaborator Presence
#### Online Indicators
- [x] PASS: **CollaboratorPresence component** — renders in workflow page header
- [ ] FAIL: **Avatar display** — shows online collaborator avatars
- [x] PASS: **Tooltips** — hover shows collaborator name, current tab, and current paper
- [x] PASS: **WiFi status indicator** — shows connection status icon
- [x] PASS: **Real-time updates** — avatars appear/disappear as collaborators join/leave
#### Collaborator API
- [x] PASS: `GET /api/systematic-review/collaborators` — fetches team members
- [x] PASS: `POST /api/systematic-review/collaborators` — adds a collaborator
- [x] PASS: `PUT /api/systematic-review/collaborators` — updates collaborator role/permissions
- [x] PASS: `DELETE /api/systematic-review/collaborators` — removes a collaborator

### Workflow Page — Project Header & Stage Stepper
#### Project Header
- [x] PASS: **Title** — project title displayed in header
- [x] PASS: **Subtitle** — "PRISMA 2020-compliant systematic review"
- [x] PASS: **Paper count badge** — shows total paper count in a pill/badge
#### 7-Stage Stepper
- [x] PASS: **Active stage** — visually highlighted (filled/colored)
- [x] PASS: **Completed stages** — show completion indicator
- [x] PASS: **Future stages** — shown as inactive/dimmed
- [ ] FAIL: **Connectors** — lines or arrows between steps
- [ ] FAIL: **Stage updates** — stepper reflects `reviewStage` from store

### Workflow Page — Tab System (15 Tabs)
#### Tab Bar
- [x] PASS: **Horizontal scrollable** — tabs arranged in a scrollable horizontal bar
- [x] PASS: **Active tab** — visually highlighted
- [x] PASS: **Tab icons** — each tab has a unique Phosphor icon
- [x] PASS: **Tab labels** — descriptive text label on each tab
- [x] PASS: **Click** — switches active panel content
#### Tab Registry
- [x] PASS: **Tab persistence** — `activeTab` stored in Zustand and survives page refresh
- [x] PASS: **Default tab** — first tab selected on initial load
- [x] PASS: **All 15 tabs** — verify all 15 tabs render in the bar

### Search Strategy Panel
#### PICO Input Form
- [x] PASS: **Form layout** — 4 labeled input fields for P, I, C, O
- [x] PASS: **Comparison marked optional** — visual indicator that C is not required
- [x] PASS: **All fields editable** — free-text input for each PICO element
#### Generate Search Strategy
- [x] PASS: **"Generate Search Strategy" button** — triggers strategy generation
- [ ] FAIL: **API call** — `POST /api/systematic-review/search-strategy` with PICO data
- [x] PASS: **Loading state** — button shows spinner during generation
