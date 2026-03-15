# systematic-review — Spec 031

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### API Routes — Undocumented Endpoints
- [ ] `POST /api/systematic-review/press` — validates search strategy using PRESS 2015 framework; rate limited
- [ ] `GET /api/systematic-review/prisma-flow?projectId={id}` — returns PRISMA flow data in JSON or SVG format
- [ ] `POST /api/systematic-review/prisma-flow` — updates specific PRISMA flow stages
- [ ] `GET /api/systematic-review/prisma-checklist` — returns static checklist items
- [ ] `POST /api/systematic-review/prisma-checklist` — verifies manuscript compliance against PRISMA 2020 (27 items); supports CSV export
- [ ] `POST /api/systematic-review/import` — imports papers from search databases (pubmed, semantic_scholar, openalex); max results 1-500
- [ ] `GET /api/systematic-review/import?projectId={id}` — fetches papers with full details
#### API Route — Screening Internals
- [ ] `POST /api/systematic-review/screen` sets `maxDuration = 300` (5-minute timeout for batch operations)
- [ ] Screen API is rate-limited via `checkRateLimit(userId, "systematic-review", RATE_LIMITS.ai)`
- [ ] Screen API returns 400 with message `No screening criteria found. Define inclusion/exclusion criteria first.` when no criteria exist
- [ ] Screen batch mode Zod validates papers array: min 1, max 100 items
- [ ] Screen batch response includes `summary` object: `{ total, included, excluded, conflicts }`
- [ ] `GET /api/systematic-review/screen?projectId={id}` returns screening summary (separate from queue)
#### API Route — Extraction Internals
- [ ] Extract API supports 4 discriminated modes: `single`, `single-fulltext`, `batch`, `batch-fulltext`
- [ ] Extract schema allows max 50 fields per extraction
- [ ] `single` mode textContent Zod: min 50, max 100000 characters
- [ ] `batch` and `batch-fulltext` modes allow max 50 papers per request
- [ ] `single-fulltext` mode returns `{ extractions, chunks }` for source linking
- [ ] `GET /api/systematic-review/extract?paperId={id}` returns chunks for a specific paper
- [ ] `GET /api/systematic-review/extract?projectId={id}` returns the full extraction table; returns 404 when no data exists
#### API Route — Screening Queue Internals
- [ ] Screening queue GET supports `stage` parameter: `title_abstract` (default) or `full_text`
- [ ] Screening queue GET supports `mode` parameter: `conflicts` or `unblind`
- [ ] Screening queue verifies project access via `verifyProjectAccess(projectId, userId)` (owner or collaborator)
- [ ] `mode=conflicts` returns `{ conflicts, total }` from `detectConflicts(projectId, stage)`
- [ ] `mode=unblind` returns results with `{ results, summary: { total, withBothDecisions, agreements, conflicts } }`
- [ ] Standard queue GET returns `{ queue, progress, agreement, reviewerProgress }` from 4 parallel promises
- [ ] Queue POST discriminates actions via `z.union([resolveSchema, decisionSchema])`
- [ ] Resolve action calls `resolveConflict(projectId, paperId, stage, resolution, userId, reason)`
- [ ] Decision action calls `recordHumanDecision` with both `userId` and `reviewerId` set to current user
- [ ] Queue PUT recomputes priorities via `updateScreeningPriorities(projectId)` from active-learning module
#### Liveblocks Configuration Details
- [ ] Liveblocks SR rooms use empty storage (`SRStorage = Record<string, never>`) — all data persisted in DB
- [ ] Liveblocks auth endpoint is `/api/liveblocks-auth`
- [ ] `SRUserMeta` includes `id: string` and `info: { name, avatar, color }`
- [ ] `SRRoomEvent` is a 5-variant discriminated union on `type` field
- [ ] `useCollaborativeReview` hook exposes 5 broadcast helpers: `broadcastDecision`, `broadcastExtraction`, `broadcastRoB2`, `broadcastStageAdvanced`, `broadcastPapersImported`
