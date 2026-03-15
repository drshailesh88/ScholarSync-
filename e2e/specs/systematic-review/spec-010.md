# systematic-review — Spec 010

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Protocol Panel
#### Protocol Sections (Expected)
- [ ] **Timeline** — projected timeline for review completion
#### PROSPERO ID Tracking
- [ ] **PROSPERO ID field** — input to enter/track PROSPERO registration number
- [ ] **ID validation** — format check for PROSPERO IDs (e.g., CRD42...)
- [ ] **ID persistence** — saved with project configuration
#### API
- [ ] `GET /api/systematic-review/protocol` — retrieves saved protocol
- [ ] `POST /api/systematic-review/protocol` — generates/saves protocol

### PROSPERO Export Panel
#### Auto-Population
- [ ] **22 fields auto-populated** — fields pre-filled from review configuration and data
- [ ] **Field list** — all 22 PROSPERO registration fields present
- [ ] **Data sources** — fields populated from PICO, protocol, search strategy, screening criteria
#### Field Editing
- [ ] **Editable fields** — each of the 22 fields can be manually edited before export
- [ ] **Validation** — required fields flagged if empty
- [ ] **Preview** — shows complete PROSPERO form before export
#### Export
- [ ] **Download as text** — exports PROSPERO registration as plain text file
- [ ] **Complete fields** — all 22 fields included in export
- [ ] **Formatted output** — text file properly structured for PROSPERO submission
#### API
- [ ] `GET /api/systematic-review/prospero` — retrieves auto-populated fields
- [ ] `POST /api/systematic-review/prospero` — saves/exports PROSPERO data

### Activity Feed
#### Real-Time Log
- [ ] **Activity feed component** — renders a chronological log of review activities
- [ ] **Real-time updates** — new entries appear without page refresh (via Liveblocks)
- [ ] **Chronological order** — most recent activity at top
#### Entry Types
- [ ] **Entry content** — each entry shows timestamp, actor, action description
- [ ] **Icon color coding** — icons use appropriate colors per type
- [ ] **Entry details** — expandable for additional context (if applicable)

### Zustand Store & Persistence
#### Store: `systematic-review-store.ts`
- [ ] **Zustand persist middleware** — store persisted to localStorage
- [ ] **Rehydration** — state restored on page load
- [ ] **Tab persistence** — `activeTab` survives page refresh
- [ ] **Cross-tab sync** — state consistent across browser tabs (if applicable)
- [ ] **Clear on project switch** — stale state cleared when switching projects

### Loading & Error States
#### Loading State (loading.tsx)
- [ ] **Skeleton tabs** — placeholder skeleton for the 15-tab bar
- [ ] **Skeleton content** — placeholder skeleton for panel content area
- [ ] **Pulse animation** — all skeletons animate with pulse
- [ ] **No layout shift** — skeleton dimensions match real content
#### Error State (error.tsx)
- [ ] **Error title** — "Systematic Review unavailable"
- [ ] **Error message** — "We couldn't load the systematic review tool. Please try again."
- [ ] **Retry button** — triggers `reset()` to re-attempt page load
