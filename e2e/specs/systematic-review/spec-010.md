# systematic-review — Spec 010

STATUS: PARTIAL
TESTED: 35/35
PASS: 16
FAIL: 19
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Protocol Panel
#### Protocol Sections (Expected)
- [ ] FAIL: **Timeline** — projected timeline for review completion
#### PROSPERO ID Tracking
- [x] PASS: **PROSPERO ID field** — input to enter/track PROSPERO registration number
- [ ] FAIL: **ID validation** — format check for PROSPERO IDs (e.g., CRD42...)
- [x] PASS: **ID persistence** — saved with project configuration
#### API
- [ ] FAIL: `GET /api/systematic-review/protocol` — retrieves saved protocol
- [ ] FAIL: `POST /api/systematic-review/protocol` — generates/saves protocol

### PROSPERO Export Panel
#### Auto-Population
- [ ] FAIL: **22 fields auto-populated** — fields pre-filled from review configuration and data
- [x] PASS: **Field list** — all 22 PROSPERO registration fields present
- [ ] FAIL: **Data sources** — fields populated from PICO, protocol, search strategy, screening criteria
#### Field Editing
- [ ] FAIL: **Editable fields** — each of the 22 fields can be manually edited before export
- [x] PASS: **Validation** — required fields flagged if empty
- [ ] FAIL: **Preview** — shows complete PROSPERO form before export
#### Export
- [ ] FAIL: **Download as text** — exports PROSPERO registration as plain text file
- [ ] FAIL: **Complete fields** — all 22 fields included in export
- [x] PASS: **Formatted output** — text file properly structured for PROSPERO submission
#### API
- [ ] FAIL: `GET /api/systematic-review/prospero` — retrieves auto-populated fields
- [ ] FAIL: `POST /api/systematic-review/prospero` — saves/exports PROSPERO data

### Activity Feed
#### Real-Time Log
- [ ] FAIL: **Activity feed component** — renders a chronological log of review activities
- [x] PASS: **Real-time updates** — new entries appear without page refresh (via Liveblocks)
- [x] PASS: **Chronological order** — most recent activity at top
#### Entry Types
- [x] PASS: **Entry content** — each entry shows timestamp, actor, action description
- [x] PASS: **Icon color coding** — icons use appropriate colors per type
- [x] PASS: **Entry details** — expandable for additional context (if applicable)

### Zustand Store & Persistence
#### Store: `systematic-review-store.ts`
- [ ] FAIL: **Zustand persist middleware** — store persisted to localStorage
- [ ] FAIL: **Rehydration** — state restored on page load
- [x] PASS: **Tab persistence** — `activeTab` survives page refresh
- [ ] FAIL: **Cross-tab sync** — state consistent across browser tabs (if applicable)
- [ ] FAIL: **Clear on project switch** — stale state cleared when switching projects

### Loading & Error States
#### Loading State (loading.tsx)
- [x] PASS: **Skeleton tabs** — placeholder skeleton for the 15-tab bar
- [x] PASS: **Skeleton content** — placeholder skeleton for panel content area
- [x] PASS: **Pulse animation** — all skeletons animate with pulse
- [x] PASS: **No layout shift** — skeleton dimensions match real content
#### Error State (error.tsx)
- [ ] FAIL: **Error title** — "Systematic Review unavailable"
- [ ] FAIL: **Error message** — "We couldn't load the systematic review tool. Please try again."
- [x] PASS: **Retry button** — triggers `reset()` to re-attempt page load
