# systematic-review — Spec 031

STATUS: PARTIAL
TESTED: 35/35
PASS: 3
FAIL: 32
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### API Routes — Undocumented Endpoints
- [ ] FAIL: `POST /api/systematic-review/press` — validates search strategy using PRESS 2015 framework; rate limited
- [ ] FAIL: `GET /api/systematic-review/prisma-flow?projectId={id}` — returns PRISMA flow data in JSON or SVG format
- [ ] FAIL: `POST /api/systematic-review/prisma-flow` — updates specific PRISMA flow stages
- [ ] FAIL: `GET /api/systematic-review/prisma-checklist` — returns static checklist items
- [x] PASS: `POST /api/systematic-review/prisma-checklist` — verifies manuscript compliance against PRISMA 2020 (27 items); supports CSV export
- [x] PASS: `POST /api/systematic-review/import` — imports papers from search databases (pubmed, semantic_scholar, openalex); max results 1-500
- [ ] FAIL: `GET /api/systematic-review/import?projectId={id}` — fetches papers with full details
#### API Route — Screening Internals
- [x] PASS: `POST /api/systematic-review/screen` sets `maxDuration = 300` (5-minute timeout for batch operations)
- [ ] FAIL: Screen API is rate-limited via `checkRateLimit(userId, "systematic-review", RATE_LIMITS.ai)`
- [ ] FAIL: Screen API returns 400 with message `No screening criteria found. Define inclusion/exclusion criteria first.` when no criteria exist
- [ ] FAIL: Screen batch mode Zod validates papers array: min 1, max 100 items
- [ ] FAIL: Screen batch response includes `summary` object: `{ total, included, excluded, conflicts }`
- [ ] FAIL: `GET /api/systematic-review/screen?projectId={id}` returns screening summary (separate from queue)
#### API Route — Extraction Internals
- [ ] FAIL: Extract API supports 4 discriminated modes: `single`, `single-fulltext`, `batch`, `batch-fulltext`
- [ ] FAIL: Extract schema allows max 50 fields per extraction
- [ ] FAIL: `single` mode textContent Zod: min 50, max 100000 characters
- [ ] FAIL: `batch` and `batch-fulltext` modes allow max 50 papers per request
- [ ] FAIL: `single-fulltext` mode returns `{ extractions, chunks }` for source linking
- [ ] FAIL: `GET /api/systematic-review/extract?paperId={id}` returns chunks for a specific paper
- [ ] FAIL: `GET /api/systematic-review/extract?projectId={id}` returns the full extraction table; returns 404 when no data exists
#### API Route — Screening Queue Internals
- [ ] FAIL: Screening queue GET supports `stage` parameter: `title_abstract` (default) or `full_text`
- [ ] FAIL: Screening queue GET supports `mode` parameter: `conflicts` or `unblind`
- [ ] FAIL: Screening queue verifies project access via `verifyProjectAccess(projectId, userId)` (owner or collaborator)
- [ ] FAIL: `mode=conflicts` returns `{ conflicts, total }` from `detectConflicts(projectId, stage)`
- [ ] FAIL: `mode=unblind` returns results with `{ results, summary: { total, withBothDecisions, agreements, conflicts } }`
- [ ] FAIL: Standard queue GET returns `{ queue, progress, agreement, reviewerProgress }` from 4 parallel promises
- [ ] FAIL: Queue POST discriminates actions via `z.union([resolveSchema, decisionSchema])`
- [ ] FAIL: Resolve action calls `resolveConflict(projectId, paperId, stage, resolution, userId, reason)`
- [ ] FAIL: Decision action calls `recordHumanDecision` with both `userId` and `reviewerId` set to current user
- [ ] FAIL: Queue PUT recomputes priorities via `updateScreeningPriorities(projectId)` from active-learning module
#### Liveblocks Configuration Details
- [ ] FAIL: Liveblocks SR rooms use empty storage (`SRStorage = Record<string, never>`) — all data persisted in DB
- [ ] FAIL: Liveblocks auth endpoint is `/api/liveblocks-auth`
- [ ] FAIL: `SRUserMeta` includes `id: string` and `info: { name, avatar, color }`
- [ ] FAIL: `SRRoomEvent` is a 5-variant discriminated union on `type` field
- [ ] FAIL: `useCollaborativeReview` hook exposes 5 broadcast helpers: `broadcastDecision`, `broadcastExtraction`, `broadcastRoB2`, `broadcastStageAdvanced`, `broadcastPapersImported`
