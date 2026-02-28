# Project Manager Response to Engineering

**Date:** 2026-02-27
**From:** Project Manager / Dr. Shailesh Singh
**To:** Engineering (Claude Code — Lead Implementation Agent)
**Re:** Engineering Response to Data Strategy Documents
**Status:** APPROVED WITH DECISIONS BELOW

---

## Overall Assessment

The engineering response is thorough, well-structured, and demonstrates full understanding of all four strategy documents. The phased implementation plan is approved. The gap analysis is accurate and the effort estimates are reasonable.

**Verdict: APPROVED. Proceed with execution per the decisions below.**

---

## Architectural Decisions — Signed Off

### Decision 1: `event_type` as TEXT vs. ENUM
**APPROVED: TEXT with application-level validation.**

Rationale accepted. New event types from new features should not require database migrations. Use a TypeScript const object (not enum — const object is more flexible) as the single source of truth for valid event types. Validate in the `/api/events` ingestion endpoint. Log warnings for unknown event types but do not reject them — this prevents data loss if the client is ahead of the server in a deployment.

### Decision 2: AI Interaction Archive Storage
**APPROVED: Option B — Same PostgreSQL with scheduled archival to GCS.**

Start simple. Same database. Build the GCS archival as a Phase 5 task. At our projected scale (10K users by Month 12), the archive will be manageable in PostgreSQL. Revisit at 50K users or if the archive table exceeds 50GB.

One addition: ensure `ai_interaction_archive` rows include a `archived` boolean flag (default false). When the archival job runs, it sets `archived = true` and copies to GCS, then deletes the full_prompt/full_response/full_context columns (replace with GCS URI). This keeps the metadata queryable while offloading the heavy text.

### Decision 3: Client Event Buffer — Custom vs. Library
**APPROVED: Option A — Generalize PresentationViewTracker.**

We already have a battle-tested implementation of this exact pattern. Generalizing it avoids adding dependencies and gives us full control. The PresentationViewTracker's sendBeacon + retry logic is exactly what we need.

### Decision 4: Edit Diff Computation — Client vs. Server
**APPROVED: Option B — Server-side diff.**

Send `original_text` and `final_text` to the server. Keep the client simple. The server computes `diff_operations` using a consistent algorithm. This ensures all diffs (from Studio, LaTeX, Notebook) are computed identically.

Use `diff-match-patch` (Google's library) on the server — it's lightweight, well-tested, and produces structured diffs suitable for training data.

### Decision 5: PostHog Overlap
**APPROVED: Option A — Keep both, separate concerns.**

PostHog handles product analytics (funnels, session replay, feature flags, A/B tests). Our pipeline handles ML training data (full prompts, edit diffs, citation pairs). Different tools for different jobs. The minor clickstream overlap is acceptable and not worth the risk of consolidation.

**Clarification:** PostHog is for understanding HOW users use the product (product decisions). Our pipeline is for understanding WHAT users create and prefer (model training). These are fundamentally different datasets.

### Decision 6: Event Pipeline — Synchronous vs. Queue-Based
**APPROVED as proposed:**
- `user_events`: Synchronous Drizzle insert
- `ai_interaction_archive`: Async (fire-and-forget Promise)
- `edit_diffs`: Async (fire-and-forget Promise)
- `search_citation_pairs`: Synchronous

Upgrade to BullMQ + Redis only if write contention becomes measurable. This will not happen before 10K users.

---

## Answers to Critical Questions (1-4)

### Q1: Stack Confirmation — Supabase vs. Drizzle + Self-Hosted PostgreSQL
**DECISION: Keep the current stack. Drizzle + self-hosted PostgreSQL is the source of truth.**

Do NOT migrate to Supabase. The engineering team's assessment is correct: self-hosted PostgreSQL with Drizzle gives us more control over the data, which is critical for ML training pipelines. Adapt the Blueprint SQL schemas to Drizzle table definitions. The Blueprint is a specification of WHAT to store, not HOW to implement it — Drizzle is the HOW.

Update the CLOUDBOARD-BRIEFING.md to reflect the actual stack (Drizzle + PostgreSQL) so future sessions don't have this confusion.

### Q2: Branch Strategy
**DECISION: Single feature branch `feature/data-foundation`.**

One branch. Not split. Reason: the event infrastructure (tables + API + client buffer) is tightly coupled — the tables depend on the API, the API depends on the schema, the client buffer depends on the API. Splitting creates merge dependencies between branches that add complexity without benefit.

Phase 3 (wiring events into features) can be done incrementally on the same branch. Each feature's events are independent — if one fails, others still work.

### Q3: LaTeX Editor Merge Priority
**DECISION: Fix LaTeX editor gaps and merge FIRST, before starting data foundation.**

Rationale: The LaTeX editor is 95% complete with only 3 high-priority functional gaps remaining (EditorView ref, slash commands, jump-to-line). Merging it creates a clean main branch as the base for `feature/data-foundation`. Do NOT do them in parallel — parallel branches with shared dependencies create merge hell.

Execution order:
1. Fix the 3 HIGH gaps on `feature/latex-editor` (EditorView ref exposure, slash command InputRule, jump-to-line)
2. Merge `feature/latex-editor` → main
3. Merge `feature/presentation-engine-v2` → main (per existing strategy)
4. Create `feature/data-foundation` from clean main
5. Build data infrastructure on `feature/data-foundation`
6. Wire LaTeX editor events as part of Phase 3 on the same branch

### Q4: Learn Mode Event Logging Scope
**DECISION: Build the event TYPE definitions and ingestion support now. Wire actual Learn Mode logging when Learn Mode is more fully developed.**

Right now, Learn Mode is a static data file with GPT-5 Nano follow-ups. There's not enough interactivity to generate meaningful Socratic events. But:
- Define the Learn Mode event types in the TypeScript const object (SOCRATIC_QUESTION_ASKED, SOCRATIC_ANSWER_GIVEN, etc.)
- Ensure the `/api/events` endpoint can accept them
- Do NOT wire them into the current static Learn Mode implementation
- Wire them when Learn Mode is rebuilt with full interactivity (likely a separate feature phase)

This costs us zero effort now and ensures we're ready when Learn Mode ships fully.

---

## Answers to Important Questions (5-8)

### Q5: Data Readiness Dashboard Location
**DECISION: `/admin/data-readiness` — separate admin route.**

The app does not currently have a formal admin role system. For now, gate access by checking `userId` against a hardcoded admin list (founder's Clerk user ID). Build a proper role system later when we need it for team features.

The dashboard should be a simple page with the SQL query results displayed as cards with color-coded indicators. No complex charting needed — just numbers and status indicators.

### Q6: Monthly Health Check Delivery
**DECISION: Admin dashboard page, refreshed on demand.**

Do NOT build email or Slack delivery for now. The admin dashboard at `/admin/data-readiness` IS the monthly health check. I will check it manually on the 1st of each month.

Future upgrade (when team grows): add email summary. But for a solo founder, a dashboard page is sufficient and avoids building notification infrastructure we don't need yet.

### Q7: Synthetic Data Generation Timing
**DECISION: Build the data infrastructure first. Generate synthetic data AFTER the event pipeline is tested and working.**

Reason: if we generate synthetic data before the pipeline exists, we have no place to store it in the canonical format. Build the pipeline → verify it works with a few test events → THEN generate 5,000 synthetic examples and store them through the same pipeline. This also serves as an integration test.

Target: synthetic data generation happens in Phase 5 or as a separate task after Phase 1 is verified.

### Q8: Edit Diff Granularity
**CONFIRMED: AI-interaction level.**

Capture the diff between what the AI generated and what the user kept/modified. This is the highest-value signal for the Writing Quality Adapter (DPO training).

Specifically:
- When AI generates text → save as `original_text`
- When user accepts/edits/rejects → save final state as `final_text`
- Compute diff on server
- If user accepts without changes: `original_text == final_text`, `user_action = 'accepted'` (still valuable — positive signal)
- If user rejects entirely: `final_text = ''` or `null`, `user_action = 'rejected'` (negative signal)
- Session-level diffs (start vs. end of session) are too coarse — they mix AI edits with manual writing, making the signal noisy

**One addition:** Also track if the AI text was generated in a specific section (Introduction, Methods, Results, Discussion, etc.) via the `section_type` field. This enables training section-specific writing models later.

---

## Answers to Low Priority Questions (9-10)

### Q9: Data Retention Enforcement
**DECISION: Document the policy. Build enforcement later.**

Add a comment in the schema file documenting the retention rules:
```
// RETENTION: raw events 3yr → archive to GCS
// RETENTION: ai_interaction_archive 1yr → summarize + delete full text
// RETENTION: edit_diffs 2yr → keep (highest-value training data)
// RETENTION: aggregated/anonymized → indefinite
```

Do NOT build automated deletion/archival now. Revisit at Month 12 when we have enough data for retention to matter.

### Q10: BigQuery Migration Trigger
**DECISION: Trigger at either >10M events OR >50GB total event-related table size, whichever comes first.**

At our projected growth, this is approximately Month 18-24. We will see it coming well in advance from the monthly dashboard.

When triggered, the migration path is: PostgreSQL → scheduled export to BigQuery (not a full migration — keep PostgreSQL as primary, BigQuery as analytics/ML warehouse). The Data Readiness Dashboard queries would move to BigQuery while the real-time ingestion stays in PostgreSQL.

---

## Additional Directives

### Directive 1: Update CLOUDBOARD-BRIEFING.md
After data foundation is built, update the CLOUDBOARD-BRIEFING.md to reflect:
- Actual stack (Drizzle + PostgreSQL, not Supabase)
- Event pipeline exists and is operational
- Which event types are actively being collected
- Any new architectural decisions

This keeps the briefing accurate for future coding sessions.

### Directive 2: Event Logging Must Never Break Features
This is a standing rule: all event logging code MUST be wrapped in try-catch. If event logging fails, the feature continues working normally. The user should NEVER see an error because event logging failed.

Pattern:
```
try {
  await trackEvent(eventData);
} catch (error) {
  logger.error('Event tracking failed', { error, eventData });
  // Feature continues — never throw from event logging
}
```

### Directive 3: Commit Messages
All commits related to the data foundation should be prefixed with `[data-foundation]` for easy identification:
```
[data-foundation] Add user_events, ai_interaction_archive, edit_diffs, search_citation_pairs tables
[data-foundation] Add POST /api/events ingestion endpoint
[data-foundation] Add client-side EventBuffer (generalized from PresentationViewTracker)
[data-foundation] Wire LaTeX editor with Blueprint event types
[data-foundation] Add privacy opt-out toggle and GDPR deletion endpoint
[data-foundation] Add Data Readiness Dashboard at /admin/data-readiness
```

### Directive 4: LaTeX Editor — Wire Events During Phase 3 (Not Before)
Do not add event logging to the LaTeX editor during the current fix phase (EditorView ref, slash commands, jump-to-line). Fix the functional gaps first, merge, THEN wire events during Phase 3 on the data-foundation branch. Mixing functional fixes with event logging in the same commits creates review complexity.

### Directive 5: The Scope Boundaries Are Correct
The "What I Will NOT Do" section (Section 9) is confirmed. Do not build ML models, distillation pipelines, model serving, public APIs, or BigQuery migration. Those are Year 2. The current scope is data collection infrastructure only.

---

## Execution Authorization

**Phase 0 (Branch Consolidation): APPROVED — Begin immediately.**
- Fix LaTeX editor HIGH gaps
- Merge latex-editor → main
- Merge presentation-engine-v2 → main

**Phase 1 (Core Event Infrastructure): APPROVED — Begin after Phase 0.**
**Phase 2 (Privacy/Compliance): APPROVED — Begin after Phase 1.**
**Phase 3 (Wire All Features): APPROVED — Begin after Phase 2.**
**Phase 4 (Dashboard): APPROVED — Begin after Phase 3.**
**Phase 5 (Distillation Readiness): APPROVED — Begin after Phase 4, lower priority.**

---

*All decisions in this document are final. Engineering may proceed without further approval on items covered here. For items NOT covered, raise them as new questions before implementation.*
