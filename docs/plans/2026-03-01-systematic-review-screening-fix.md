# Systematic Review Screening Fix — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the 3 critical bugs blocking the AI Screening tab (and everything downstream) in the Systematic Review workflow.

**Architecture:** The screening system uses a Drizzle ORM schema → PostgreSQL database → Next.js API routes → Zustand client store pipeline. The bugs are at three layers: (1) missing DB migration for `reviewer_id` column and 2 tables, (2) no API endpoint to persist screening criteria, (3) no save button in the UI. We fix bottom-up: database first, then API, then UI.

**Tech Stack:** Drizzle ORM, PostgreSQL, Next.js 15 App Router API routes, Zustand, Zod, Clerk auth

**Parallelism:** Tasks 1-3 are independent DB/API/UI layers and CAN be worked by parallel agents. Task 4 (integration test) must run after all three complete.

---

## Bug Summary

| Bug | Layer | Root Cause | File |
|-----|-------|-----------|------|
| BUG-1 | UI + API | No "Save Criteria" button, no API to INSERT into `screening_criteria` | `ScreeningPanel.tsx`, no endpoint exists |
| BUG-2 | DB | `reviewer_id` column defined in Drizzle schema but missing from migration 0000 | `drizzle/0000_calm_calypso.sql` vs `src/lib/db/schema/systematic.ts` |
| BUG-3 | DB + API | `screening-queue` POST and `dual-screening.ts` reference `reviewer_id` which doesn't exist in DB | `screening-queue/route.ts:166-170`, `dual-screening.ts:87` |

BUG-2 and BUG-3 share the same root cause (missing migration). Additionally, 2 tables (`project_collaborators`, `sr_audit_log`) are defined in the schema but have no migration.

---

## Task 1: Database Migration — Fix `screening_decisions` + Add Missing Tables

**Fixes:** BUG-2, BUG-3 (root cause), plus missing `project_collaborators` and `sr_audit_log` tables

**Files:**
- Create: `drizzle/0002_fix_screening_decisions_and_missing_tables.sql`
- Modify: `drizzle/meta/_journal.json` (Drizzle migration journal)

**Why not `drizzle-kit generate`?** The schema already has the correct definition. The problem is that the migration was generated BEFORE `reviewer_id` was added to the schema. We write a manual ALTER migration to bring the DB in sync.

### Step 1: Write the migration SQL

Create `drizzle/0002_fix_screening_decisions_and_missing_tables.sql`:

```sql
-- Fix screening_decisions: add reviewer_id column, fix unique constraint, add index
-- The Drizzle schema (systematic.ts:71) defines reviewerId as nullable TEXT.
-- Migration 0000 created the table WITHOUT this column.

ALTER TABLE "screening_decisions" ADD COLUMN "reviewer_id" text;--> statement-breakpoint

-- Drop the old unique constraint (project_id, paper_id, stage)
ALTER TABLE "screening_decisions" DROP CONSTRAINT "screening_decisions_project_paper_stage_unique";--> statement-breakpoint

-- Add new unique constraint including reviewer_id (matches schema line 75-80)
ALTER TABLE "screening_decisions" ADD CONSTRAINT "screening_decisions_project_paper_stage_reviewer_unique" UNIQUE("project_id", "paper_id", "stage", "reviewer_id");--> statement-breakpoint

-- Add index on reviewer_id (matches schema line 83)
CREATE INDEX "idx_screening_decisions_reviewer" ON "screening_decisions" USING btree ("reviewer_id");--> statement-breakpoint

-- Create project_collaborators table (schema lines 308-327, never migrated)
CREATE TABLE IF NOT EXISTS "project_collaborators" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"user_id" text,
	"email" text NOT NULL,
	"role" text DEFAULT 'reviewer' NOT NULL,
	"invited_at" timestamp DEFAULT now(),
	"accepted_at" timestamp,
	CONSTRAINT "uq_project_collaborator" UNIQUE("project_id","user_id")
);--> statement-breakpoint

ALTER TABLE "project_collaborators" ADD CONSTRAINT "project_collaborators_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_collaborators" ADD CONSTRAINT "project_collaborators_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint

-- Create sr_audit_log table (schema lines 358-373, never migrated)
CREATE TABLE IF NOT EXISTS "sr_audit_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"action" text NOT NULL,
	"entity_type" text,
	"entity_id" text,
	"details" jsonb,
	"ai_involved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);--> statement-breakpoint

ALTER TABLE "sr_audit_log" ADD CONSTRAINT "sr_audit_log_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
```

### Step 2: Update the Drizzle migration journal

Read `drizzle/meta/_journal.json` and add a new entry for migration 0002. The entry should follow the same format as existing entries (idx, version, when timestamp, tag, breakpoints).

### Step 3: Verify migration syntax

Run: `cat drizzle/0002_fix_screening_decisions_and_missing_tables.sql`
Verify: SQL is valid, all `-->` statement breakpoints are present

### Step 4: Run the migration

Run: `cd /Users/shaileshsingh/ScholarSync && npx drizzle-kit push`
OR if using migrate mode: `npx drizzle-kit migrate`

Expected: All ALTER/CREATE statements execute without error

### Step 5: Verify schema sync

Run: `npx drizzle-kit check`
Expected: No schema drift between `systematic.ts` and the database

### Step 6: Commit

```bash
git add drizzle/0002_fix_screening_decisions_and_missing_tables.sql drizzle/meta/_journal.json
git commit -m "fix: add reviewer_id to screening_decisions, create project_collaborators and sr_audit_log tables"
```

---

## Task 2: API — Create Screening Criteria CRUD Endpoint

**Fixes:** BUG-1 (server side)

**Files:**
- Create: `src/app/api/systematic-review/screening-criteria/route.ts`

**Context:** The `screening_criteria` table already exists in the DB (migration 0000, line ~845). The Drizzle schema is at `src/lib/db/schema/systematic.ts:37-52`. The table has columns: `id`, `project_id`, `criterion_type` (enum: inclusion/exclusion), `description`, `category`, `created_at`. Currently, criteria are only READ inside `src/app/api/systematic-review/screen/route.ts:77-78`. No endpoint creates them.

### Step 1: Write the API route

Create `src/app/api/systematic-review/screening-criteria/route.ts`:

```typescript
/**
 * /api/systematic-review/screening-criteria
 *
 * GET  — Load saved criteria for a project
 * POST — Save (replace) all criteria for a project
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { screeningCriteria } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const saveCriteriaSchema = z.object({
  projectId: z.number(),
  criteria: z.array(
    z.object({
      type: z.enum(["inclusion", "exclusion"]),
      description: z.string().min(1),
      category: z.string().optional(),
    })
  ),
});

// GET — Load criteria for a project
export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projectId = req.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 }
    );
  }

  const rows = await db
    .select()
    .from(screeningCriteria)
    .where(eq(screeningCriteria.projectId, Number(projectId)));

  return NextResponse.json({
    criteria: rows.map((r) => ({
      type: r.criterionType,
      description: r.description,
      category: r.category,
    })),
  });
}

// POST — Replace all criteria for a project (delete-then-insert)
export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = saveCriteriaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { projectId, criteria } = parsed.data;

  // Replace: delete existing, insert new (transactional)
  await db.transaction(async (tx) => {
    await tx
      .delete(screeningCriteria)
      .where(eq(screeningCriteria.projectId, projectId));

    if (criteria.length > 0) {
      await tx.insert(screeningCriteria).values(
        criteria.map((c) => ({
          projectId,
          criterionType: c.type as "inclusion" | "exclusion",
          description: c.description,
          category: c.category ?? null,
        }))
      );
    }
  });

  return NextResponse.json({ success: true, count: criteria.length });
}
```

### Step 2: Verify the endpoint compiles

Run: `cd /Users/shaileshsingh/ScholarSync && npx tsc --noEmit --pretty 2>&1 | grep screening-criteria || echo "No errors"`
Expected: No type errors

### Step 3: Commit

```bash
git add src/app/api/systematic-review/screening-criteria/route.ts
git commit -m "feat: add screening criteria CRUD API endpoint"
```

---

## Task 3: UI — Add Save/Load Criteria to ScreeningPanel

**Fixes:** BUG-1 (client side)

**Files:**
- Modify: `src/components/systematic-review/ScreeningPanel.tsx` (lines ~722-771)
- Modify: `src/stores/systematic-review-store.ts` (lines ~236-244, persist config)

**Context:** The ScreeningPanel criteria section (lines 722-771) lets users add/edit/remove criteria in Zustand state but never persists them. The Zustand store (lines 236-244) explicitly excludes `criteria` from the `partialize` persist whitelist. We need to: (a) add criteria to persist, (b) add a "Save Criteria" button that calls the new API, (c) load saved criteria on mount.

### Step 1: Update Zustand store persist config

In `src/stores/systematic-review-store.ts`, modify the `partialize` config (line 238-244) to include `criteria`:

```typescript
// BEFORE (line 238-244):
partialize: (state) => ({
  projectId: state.projectId,
  projectTitle: state.projectTitle,
  activeTab: state.activeTab,
  reviewStage: state.reviewStage,
  pico: state.pico,
}),

// AFTER:
partialize: (state) => ({
  projectId: state.projectId,
  projectTitle: state.projectTitle,
  activeTab: state.activeTab,
  reviewStage: state.reviewStage,
  pico: state.pico,
  criteria: state.criteria,
}),
```

### Step 2: Add save/load criteria logic to ScreeningPanel

In `src/components/systematic-review/ScreeningPanel.tsx`:

**2a.** Add state for save status. Near the top of the component (around line ~130-150, near other useState calls), add:

```typescript
const [isSavingCriteria, setIsSavingCriteria] = useState(false);
const [criteriaLastSaved, setCriteriaLastSaved] = useState<Date | null>(null);
```

**2b.** Add a `loadCriteria` function that runs on mount (or when projectId changes):

```typescript
// Load saved criteria from DB on mount
useEffect(() => {
  if (!projectId) return;
  fetch(`/api/systematic-review/screening-criteria?projectId=${projectId}`)
    .then((r) => r.json())
    .then((data) => {
      if (data.criteria?.length > 0) {
        setCriteria(data.criteria);
        setCriteriaLastSaved(new Date());
      }
    })
    .catch(() => {
      // Silently fall back to Zustand state
    });
}, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps
```

**2c.** Add a `saveCriteria` function:

```typescript
const saveCriteria = async () => {
  if (!projectId) return;
  setIsSavingCriteria(true);
  try {
    const res = await fetch("/api/systematic-review/screening-criteria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, criteria }),
    });
    if (res.ok) {
      setCriteriaLastSaved(new Date());
    }
  } catch {
    // Could add toast notification here
  } finally {
    setIsSavingCriteria(false);
  }
};
```

**2d.** Add a "Save Criteria" button after the "Add Criterion" button (after line 770):

```tsx
<div className="mt-4 flex items-center gap-3">
  <button
    onClick={saveCriteria}
    disabled={isSavingCriteria || criteria.length === 0}
    className="px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 flex items-center gap-2"
  >
    {isSavingCriteria ? (
      <CircleNotch weight="bold" className="animate-spin" size={16} />
    ) : (
      <FloppyDisk weight="fill" size={16} />
    )}
    {isSavingCriteria ? "Saving..." : "Save Criteria"}
  </button>
  {criteriaLastSaved && (
    <span className="text-xs text-ink-muted">
      Last saved: {criteriaLastSaved.toLocaleTimeString()}
    </span>
  )}
</div>
```

**2e.** Add `FloppyDisk` to the Phosphor Icons import at the top of the file.

Check the existing import line (should be near line 1-20). Add `FloppyDisk` to the destructured import from `@phosphor-icons/react`.

### Step 3: Verify the component compiles

Run: `cd /Users/shaileshsingh/ScholarSync && npx tsc --noEmit --pretty 2>&1 | grep -i "ScreeningPanel\|screening-criteria" || echo "No errors"`
Expected: No type errors

### Step 4: Commit

```bash
git add src/components/systematic-review/ScreeningPanel.tsx src/stores/systematic-review-store.ts
git commit -m "feat: add save/load screening criteria with DB persistence"
```

---

## Task 4: Integration Verification (After Tasks 1-3)

**Depends on:** Tasks 1, 2, 3 all complete

**Files:** None (read-only verification)

### Step 1: Full TypeScript check

Run: `cd /Users/shaileshsingh/ScholarSync && npx tsc --noEmit`
Expected: Zero errors

### Step 2: Full Next.js build

Run: `cd /Users/shaileshsingh/ScholarSync && npx next build 2>&1 | tail -20`
Expected: Build succeeds

### Step 3: Verify the screening data flow (conceptual)

Trace the fixed flow:
1. User opens Screening tab → `useEffect` calls `GET /api/systematic-review/screening-criteria?projectId=X` → loads saved criteria into Zustand
2. User edits criteria in UI → Zustand state updates + persists to localStorage
3. User clicks "Save Criteria" → `POST /api/systematic-review/screening-criteria` → delete-then-insert into `screening_criteria` table
4. User clicks "AI Screen All" → `POST /api/systematic-review/screen` → reads criteria from DB (now populated!) → AI screens papers
5. AI writes decisions → INSERT into `screening_decisions` with `reviewer_id = NULL` (AI) or `reviewer_id = userId` (human) → column now exists
6. Manual screening → `POST /api/systematic-review/screening-queue` → calls `recordHumanDecision()` with `reviewerId = userId` → column now exists, unique constraint correct

### Step 4: Commit and tag

```bash
git add -A
git commit -m "fix: systematic review screening pipeline — all 3 bugs resolved"
```

---

## Parallel Execution Strategy

```
┌─────────────────────┐
│  Agent A: Task 1    │   DB migration (reviewer_id + 2 missing tables)
│  ~5 min             │
├─────────────────────┤
│  Agent B: Task 2    │   API endpoint (screening-criteria CRUD)
│  ~5 min             │
├─────────────────────┤
│  Agent C: Task 3    │   UI changes (save button + load on mount + store persist)
│  ~5 min             │
└────────┬────────────┘
         │ all complete
         ▼
┌─────────────────────┐
│  Agent D: Task 4    │   Integration verify (tsc + next build)
│  ~3 min             │
└─────────────────────┘
```

Agents A, B, and C can run in parallel (different files, no conflicts). Agent D runs after all three merge.

---

## What This DOES NOT Fix (Future Work)

These are NOT blocking the screening pipeline but are noted:

| Item | Status | Priority |
|------|--------|----------|
| Living Review cron scheduler | Not configured | Low — feature works, just needs scheduler |
| Audit logging (`sr_audit_log`) | Table created in Task 1, but `logAuditEvent()` never called in API routes | Low — compliance, not blocking |
| Collaboration (`project_collaborators`) | Table created in Task 1, but invite/accept flows may need testing | Low — single-user works |
| PDF upload → full-text screening | Untested | Medium — only needed for full-text stage |
