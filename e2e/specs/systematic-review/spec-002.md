# systematic-review — Spec 002

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Workflow Page — Layout & Navigation
#### Wrapper
- [ ] **Project ID** — extracted from URL params and used to fetch/hydrate state
#### Navigation
- [ ] **Back link** — "All Reviews" text link navigates back to `/systematic-review`
- [ ] **Back link position** — top-left of page
- [ ] **Browser back** — back navigation returns to hub page

### Workflow Page — Collaborator Presence
#### Online Indicators
- [ ] **CollaboratorPresence component** — renders in workflow page header
- [ ] **Avatar display** — shows online collaborator avatars
- [ ] **Tooltips** — hover shows collaborator name, current tab, and current paper
- [ ] **WiFi status indicator** — shows connection status icon
- [ ] **Real-time updates** — avatars appear/disappear as collaborators join/leave
#### Collaborator API
- [ ] `GET /api/systematic-review/collaborators` — fetches team members
- [ ] `POST /api/systematic-review/collaborators` — adds a collaborator
- [ ] `PUT /api/systematic-review/collaborators` — updates collaborator role/permissions
- [ ] `DELETE /api/systematic-review/collaborators` — removes a collaborator

### Workflow Page — Project Header & Stage Stepper
#### Project Header
- [ ] **Title** — project title displayed in header
- [ ] **Subtitle** — "PRISMA 2020-compliant systematic review"
- [ ] **Paper count badge** — shows total paper count in a pill/badge
#### 7-Stage Stepper
- [ ] **Active stage** — visually highlighted (filled/colored)
- [ ] **Completed stages** — show completion indicator
- [ ] **Future stages** — shown as inactive/dimmed
- [ ] **Connectors** — lines or arrows between steps
- [ ] **Stage updates** — stepper reflects `reviewStage` from store

### Workflow Page — Tab System (15 Tabs)
#### Tab Bar
- [ ] **Horizontal scrollable** — tabs arranged in a scrollable horizontal bar
- [ ] **Active tab** — visually highlighted
- [ ] **Tab icons** — each tab has a unique Phosphor icon
- [ ] **Tab labels** — descriptive text label on each tab
- [ ] **Click** — switches active panel content
#### Tab Registry
- [ ] **Tab persistence** — `activeTab` stored in Zustand and survives page refresh
- [ ] **Default tab** — first tab selected on initial load
- [ ] **All 15 tabs** — verify all 15 tabs render in the bar

### Search Strategy Panel
#### PICO Input Form
- [ ] **Form layout** — 4 labeled input fields for P, I, C, O
- [ ] **Comparison marked optional** — visual indicator that C is not required
- [ ] **All fields editable** — free-text input for each PICO element
#### Generate Search Strategy
- [ ] **"Generate Search Strategy" button** — triggers strategy generation
- [ ] **API call** — `POST /api/systematic-review/search-strategy` with PICO data
- [ ] **Loading state** — button shows spinner during generation
