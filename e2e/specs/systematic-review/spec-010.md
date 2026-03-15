# systematic-review — Spec 010

STATUS: PARTIAL
TESTED: 35/35
PASS: 19
FAIL: 16
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Protocol Panel
#### Protocol Sections (Expected)
- [x] PASS: **Timeline** — projected timeline for review completion
#### PROSPERO ID Tracking
- [ ] FAIL: **PROSPERO ID field** — input to enter/track PROSPERO registration number
- [x] PASS: **ID validation** — format check for PROSPERO IDs (e.g., CRD42...)
- [ ] FAIL: **ID persistence** — saved with project configuration
#### API
- [x] PASS: `GET /api/systematic-review/protocol` — retrieves saved protocol
- [x] PASS: `POST /api/systematic-review/protocol` — generates/saves protocol

### PROSPERO Export Panel
#### Auto-Population
- [x] PASS: **22 fields auto-populated** — fields pre-filled from review configuration and data
- [ ] FAIL: **Field list** — all 22 PROSPERO registration fields present
- [x] PASS: **Data sources** — fields populated from PICO, protocol, search strategy, screening criteria
#### Field Editing
- [x] PASS: **Editable fields** — each of the 22 fields can be manually edited before export
- [ ] FAIL: **Validation** — required fields flagged if empty
- [x] PASS: **Preview** — shows complete PROSPERO form before export
#### Export
- [x] PASS: **Download as text** — exports PROSPERO registration as plain text file
- [x] PASS: **Complete fields** — all 22 fields included in export
- [ ] FAIL: **Formatted output** — text file properly structured for PROSPERO submission
#### API
- [x] PASS: `GET /api/systematic-review/prospero` — retrieves auto-populated fields
- [x] PASS: `POST /api/systematic-review/prospero` — saves/exports PROSPERO data

### Activity Feed
#### Real-Time Log
- [x] PASS: **Activity feed component** — renders a chronological log of review activities
- [ ] FAIL: **Real-time updates** — new entries appear without page refresh (via Liveblocks)
- [ ] FAIL: **Chronological order** — most recent activity at top
#### Entry Types
- [ ] FAIL: **Entry content** — each entry shows timestamp, actor, action description
- [ ] FAIL: **Icon color coding** — icons use appropriate colors per type
- [ ] FAIL: **Entry details** — expandable for additional context (if applicable)

### Zustand Store & Persistence
#### Store: `systematic-review-store.ts`
- [x] PASS: **Zustand persist middleware** — store persisted to localStorage
- [x] PASS: **Rehydration** — state restored on page load
- [ ] FAIL: **Tab persistence** — `activeTab` survives page refresh
- [x] PASS: **Cross-tab sync** — state consistent across browser tabs (if applicable)
- [x] PASS: **Clear on project switch** — stale state cleared when switching projects

### Loading & Error States
#### Loading State (loading.tsx)
- [ ] FAIL: **Skeleton tabs** — placeholder skeleton for the 15-tab bar
- [ ] FAIL: **Skeleton content** — placeholder skeleton for panel content area
- [ ] FAIL: **Pulse animation** — all skeletons animate with pulse
- [ ] FAIL: **No layout shift** — skeleton dimensions match real content
#### Error State (error.tsx)
- [x] PASS: **Error title** — "Systematic Review unavailable"
- [x] PASS: **Error message** — "We couldn't load the systematic review tool. Please try again."
- [ ] FAIL: **Retry button** — triggers `reset()` to re-attempt page load
