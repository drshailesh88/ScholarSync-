# Presentation Engine V2 — Completion Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Stabilize, fix, and complete the presentation engine V2 — merging all in-progress work (emergency save features, worktree experiments) into a working, type-safe, migrated codebase on `feature/presentation-engine-v2`, then merge to `main`.

**Architecture:** The presentation engine is a 33-component system with DB-backed slide decks, AI generation/coaching/editing, and advanced features (sharing, recording, analytics, live mode, version history, comments, reference import). It sits at `/presentation` in the Next.js app router, with API routes under `/api/presentations/`, `/api/analytics/`, `/api/recordings/`, `/api/references/`, `/api/live-session/`, plus public pages at `/live/` and `/share/`.

**Tech Stack:** Next.js 15 App Router, Drizzle ORM + PostgreSQL, Framer Motion, KaTeX, Mermaid, Recharts, pptxgenjs, Phosphor Icons, Vercel AI SDK.

**Current State:** 4 TypeScript errors, 1 uncommitted schema table, 0 post-V2 migrations, 3 orphaned worktrees with experimental features built against V1.

---

## Execution Phases Overview

| Phase | Name | Tasks | Can Parallelize? |
|-------|------|-------|-----------------|
| **A** | Stabilize — Fix Build Errors | 1–4 | Yes (all independent) |
| **B** | Schema & Migration | 5–7 | Sequential |
| **C** | Wire Emergency Save Features into Editor | 8–14 | Partially (8-10 parallel, 11-14 parallel) |
| **D** | Recover Worktree Features | 15–17 | Yes (all independent) |
| **E** | Integration Testing & Polish | 18–20 | Sequential |
| **F** | Merge to Main | 21–22 | Sequential |

---

## Phase A: Stabilize — Fix Build Errors

These 4 TypeScript errors prevent the project from compiling. All are independent fixes.

### Task 1: Fix Recharts Tooltip formatter type in analytics-panel

**Files:**
- Modify: `src/components/presentation/analytics-panel.tsx:198`

**Step 1: Fix the type error**

Line 198 currently reads:
```tsx
formatter={(value: number) => [`${value}s`, "Avg Time"]}
```

Change to:
```tsx
formatter={(value: number | string | undefined) => [`${value ?? 0}s`, "Avg Time"]}
```

Recharts `Tooltip` formatter receives `ValueType` which is `number | string | (number | string)[]`, not just `number`.

**Step 2: Verify fix**

Run: `npx tsc --noEmit 2>&1 | grep analytics-panel`
Expected: No output (no errors in this file)

**Step 3: Commit**

```bash
git add src/components/presentation/analytics-panel.tsx
git commit -m "fix: widen Recharts Tooltip formatter type in analytics-panel"
```

---

### Task 2: Fix missing Phosphor icon in recording-setup-modal

**Files:**
- Modify: `src/components/presentation/recording-setup-modal.tsx:10,348`

**Step 1: Fix the import**

Line 10 currently imports `Corners` which doesn't exist in `@phosphor-icons/react` v2. Replace with `CornersOut`:

```tsx
// Old:
import { Microphone, VideoCamera, X, Record, Corners } from "@phosphor-icons/react";

// New:
import { Microphone, VideoCamera, X, Record, CornersOut } from "@phosphor-icons/react";
```

**Step 2: Fix the usage**

Find the JSX usage of `<Corners` (around line 348) and replace with `<CornersOut`:

```tsx
// Old:
<Corners weight="bold" className="w-3 h-3" />

// New:
<CornersOut weight="bold" className="w-3 h-3" />
```

**Step 3: Verify fix**

Run: `npx tsc --noEmit 2>&1 | grep recording-setup`
Expected: No output

**Step 4: Commit**

```bash
git add src/components/presentation/recording-setup-modal.tsx
git commit -m "fix: replace non-existent Corners icon with CornersOut"
```

---

### Task 3: Fix audienceType cast in versions.ts

**Files:**
- Modify: `src/lib/actions/versions.ts:221`

**Step 1: Fix the cast**

Line 221 casts `audienceType` to old V1 values `"general" | "academic" | "industry" | "committee"`. The actual enum values in `enums.ts` (line 95-98) are:

```
"thesis_defense" | "conference" | "journal_club" | "classroom" | "general" |
"grant_presentation" | "poster_session" | "systematic_review" | "patient_case" | "grand_rounds"
```

Replace line 221:
```typescript
// Old:
audienceType: snapshot.deck.audienceType as "general" | "academic" | "industry" | "committee" | null,

// New:
audienceType: snapshot.deck.audienceType as
  | "thesis_defense" | "conference" | "journal_club" | "classroom" | "general"
  | "grant_presentation" | "poster_session" | "systematic_review" | "patient_case" | "grand_rounds"
  | null,
```

**Step 2: Verify fix**

Run: `npx tsc --noEmit 2>&1 | grep versions.ts`
Expected: Only the line 235 error remains (fixed in Task 4)

**Step 3: Commit**

```bash
git add src/lib/actions/versions.ts
git commit -m "fix: update audienceType cast to match V2 enum values"
```

---

### Task 4: Fix layout cast in versions.ts

**Files:**
- Modify: `src/lib/actions/versions.ts:235-238`

**Step 1: Fix the cast**

Line 235-238 casts layout to old V1 values. The actual enum in `enums.ts` (lines 85-91) is:

```
"title_slide" | "title_content" | "two_column" | "section_header" |
"image_text" | "chart_slide" | "table_slide" | "quote_slide" |
"comparison" | "blank" |
"bibliography_slide" | "methodology" | "results_summary" | "key_findings" |
"timeline_slide" | "stat_overview" | "three_column" | "big_number"
```

Replace the cast:
```typescript
// Old:
layout: s.layout as "title_content" | "title_only" | "two_column" | "blank" | "section_header" | "image_full" | "comparison" | "quote" | null,

// New:
layout: s.layout as
  | "title_slide" | "title_content" | "two_column" | "section_header"
  | "image_text" | "chart_slide" | "table_slide" | "quote_slide"
  | "comparison" | "blank"
  | "bibliography_slide" | "methodology" | "results_summary" | "key_findings"
  | "timeline_slide" | "stat_overview" | "three_column" | "big_number"
  | null,
```

**Step 2: Verify fix — full build**

Run: `npx tsc --noEmit 2>&1 | head -5`
Expected: No errors (0 exit code)

**Step 3: Commit**

```bash
git add src/lib/actions/versions.ts
git commit -m "fix: update slide layout cast to match V2 enum values"
```

---

## Phase B: Schema & Migration

### Task 5: Commit the presentation_recordings table

**Files:**
- Modify: `src/lib/db/schema/editor.ts` (33 uncommitted lines — the `presentationRecordings` table)

The `presentationRecordings` table definition already exists as an uncommitted change. It needs to be committed.

**Step 1: Verify the schema is valid**

Read `src/lib/db/schema/editor.ts` and confirm the `presentationRecordings` table references `slideDecks.id` correctly and uses proper column types.

**Step 2: Check schema exports**

Ensure `presentationRecordings` is exported from `src/lib/db/schema/index.ts`. If not, add it.

Run: `grep "presentationRecordings" src/lib/db/schema/index.ts`
If no output, add the re-export.

**Step 3: Commit**

```bash
git add src/lib/db/schema/editor.ts src/lib/db/schema/index.ts
git commit -m "feat: add presentation_recordings table schema"
```

---

### Task 6: Generate Drizzle migration

**Files:**
- Creates: `drizzle/XXXX_*.sql` (auto-generated migration)
- Modifies: `drizzle/meta/_journal.json`

**Step 1: Generate migration**

Run: `npx drizzle-kit generate`
Expected: A new SQL migration file is created in `drizzle/`

**Step 2: Review the generated SQL**

Read the generated migration file. It should contain:
- Any new enum values added in V2 (if not already in the base migration)
- The `presentation_recordings` table
- The `slide_deck_versions` table (if not in base migration)
- New columns on `slide_decks` (templateId, citationStyle, institutionKit, shareToken, shareEnabled)
- New indexes

**Step 3: Commit**

```bash
git add drizzle/
git commit -m "feat: generate Drizzle migration for V2 schema additions"
```

---

### Task 7: Apply migration to local database

**Step 1: Run migration**

Run: `npx drizzle-kit migrate`
Expected: Migration applied successfully

**Step 2: Verify tables exist**

If using a local database, spot-check:
```bash
npx drizzle-kit studio
```
Or skip this step if no local DB is available — the migration file existing is sufficient.

**Step 3: No commit needed** (database state, not code)

---

## Phase C: Wire Emergency Save Features into Editor

The emergency save created 10 feature areas as standalone components + API routes. Several are already imported in the editor page (`[deckId]/page.tsx`). Others need wiring. Each task below is one feature area.

### Task 8: Verify sharing feature wiring

**Files:**
- Check: `src/components/presentation/share-panel.tsx`
- Check: `src/components/presentation/share-password-gate.tsx`
- Check: `src/components/presentation/shared-presentation-viewer.tsx`
- Check: `src/app/share/[token]/page.tsx`
- Check: `src/app/(app)/presentation/[deckId]/page.tsx` (already imports SharePanel at line 50)

**Step 1: Verify SharePanel is imported and rendered**

The editor page already imports `SharePanel` (line 50) and has `showSharePanel` state (line 77). Verify it's rendered in the JSX with a toggle button.

Read `src/app/(app)/presentation/[deckId]/page.tsx` fully and confirm SharePanel is rendered conditionally.

**Step 2: Verify share page works**

Read `src/app/share/[token]/page.tsx` and confirm it imports `SharedPresentationViewer` and `SharePasswordGate` correctly.

**Step 3: Check for missing DB columns**

The share feature needs `shareToken` and `shareEnabled` columns on `slide_decks`. Verify these exist in the schema (should have been added in V2 commit).

Run: `grep -n "shareToken\|shareEnabled" src/lib/db/schema/editor.ts`

**Step 4: If anything is broken, fix it. If it works, document it as verified.**

**Step 5: Commit any fixes**

```bash
git add -A && git commit -m "fix: wire sharing feature into presentation editor"
```

---

### Task 9: Verify version history feature wiring

**Files:**
- Check: `src/components/presentation/version-history-panel.tsx` (414 lines)
- Check: `src/components/presentation/version-diff-viewer.tsx` (525 lines)
- Check: `src/lib/presentation/version-diff.ts` (358 lines)
- Check: `src/lib/actions/versions.ts` (281 lines — already fixed in Tasks 3-4)

**Step 1: Check if version history panel is importable from editor page**

The editor page does NOT currently import VersionHistoryPanel. It needs to be added:

1. Add import to `[deckId]/page.tsx`:
```tsx
import { VersionHistoryPanel } from "@/components/presentation/version-history-panel";
```

2. Add state:
```tsx
const [showVersionHistory, setShowVersionHistory] = useState(false);
```

3. Add toggle button in the toolbar area and render the panel conditionally.

**Step 2: Verify VersionHistoryPanel compiles**

Run: `npx tsc --noEmit 2>&1 | grep version`
Expected: No errors

**Step 3: Commit**

```bash
git add src/app/\(app\)/presentation/\[deckId\]/page.tsx
git commit -m "feat: wire version history panel into presentation editor"
```

---

### Task 10: Verify recording feature wiring

**Files:**
- Check: `src/components/presentation/recording-controls.tsx` (168 lines)
- Check: `src/components/presentation/recording-preview.tsx` (262 lines)
- Check: `src/components/presentation/recording-setup-modal.tsx` (407 lines — fixed in Task 2)
- Check: `src/components/presentation/recordings-panel.tsx` (255 lines)
- Check: `src/lib/recording/presentation-recorder.ts` (313 lines)
- Check: `src/app/api/recordings/upload/route.ts` (237 lines)

**Step 1: Check if recording components are imported in editor**

The editor page does NOT currently import recording components. Add:

1. Import `RecordingsPanel` in `[deckId]/page.tsx`
2. Add `showRecordings` state
3. Add toggle button and render panel conditionally

**Step 2: Verify RecordingSetupModal uses browser APIs correctly**

The recorder uses `MediaRecorder`, `getDisplayMedia`, etc. These are browser-only. Verify the component has proper "use client" directive and doesn't import on server.

**Step 3: Verify the upload API route**

Read `src/app/api/recordings/upload/route.ts` and check it handles file upload properly (multipart form data or blob).

**Step 4: Commit**

```bash
git add src/app/\(app\)/presentation/\[deckId\]/page.tsx
git commit -m "feat: wire recording feature into presentation editor"
```

---

### Task 11: Verify comments feature wiring

**Files:**
- Check: `src/components/presentation/comment-thread.tsx` (304 lines)
- Check: `src/components/presentation/comments-panel.tsx` (240 lines)
- Check: `src/app/(app)/presentation/[deckId]/page.tsx` (already imports CommentsPanel at line 52)

**Step 1: Verify CommentsPanel is imported and rendered**

The editor page already imports `CommentsPanel` and `useCommentCounts` (line 52) and has `showComments` state (line 79). Verify it's rendered in the JSX.

**Step 2: Check for required DB table**

Comments need the `slideComments` table. Verify it exists in `src/lib/db/schema/editor.ts`.

Run: `grep -n "slideComments" src/lib/db/schema/editor.ts`

**Step 3: Commit any fixes**

```bash
git add -A && git commit -m "fix: verify comments feature wiring"
```

---

### Task 12: Verify analytics feature wiring

**Files:**
- Check: `src/components/presentation/analytics-panel.tsx` (381 lines — fixed in Task 1)
- Check: `src/app/api/analytics/deck-stats/route.ts` (146 lines)
- Check: `src/app/api/analytics/track-view/route.ts` (63 lines)
- Check: `src/lib/analytics/view-tracker.ts` (144 lines)
- Check: `src/app/(app)/presentation/[deckId]/page.tsx` (already imports AnalyticsPanel at line 51)

**Step 1: Verify AnalyticsPanel is rendered**

The editor page imports `AnalyticsPanel` (line 51) and has `showAnalytics` state (line 78). Verify the JSX.

**Step 2: Verify API routes compile**

Run: `npx tsc --noEmit 2>&1 | grep analytics`
Expected: No errors (after Task 1 fix)

**Step 3: Commit any fixes**

---

### Task 13: Verify live presentation feature wiring

**Files:**
- Check: `src/app/live/[code]/page.tsx` (598 lines)
- Check: `src/app/live/page.tsx` (76 lines)
- Check: `src/app/api/live-session/[sessionId]/stream/route.ts` (137 lines)

**Step 1: Verify the live pages compile**

Run: `npx tsc --noEmit 2>&1 | grep "live/"`
Expected: No errors

**Step 2: Check that the live page is a public route**

The live page at `/live/[code]` should NOT be inside `(app)` layout (it isn't — it's at `src/app/live/`). Verify it doesn't require auth.

**Step 3: Check the streaming API**

Read `src/app/api/live-session/[sessionId]/stream/route.ts` and verify it uses proper SSE or WebSocket pattern.

**Step 4: Commit any fixes**

---

### Task 14: Verify reference import feature wiring

**Files:**
- Check: `src/components/presentation/reference-import-panel.tsx` (638 lines)
- Check: `src/app/api/references/parse/route.ts` (93 lines)
- Check: `src/app/api/references/zotero/route.ts` (60 lines)
- Check: `src/lib/references/format.ts` (33 lines)
- Check: `src/lib/references/import.ts` (216 lines)
- Check: `src/lib/references/zotero.ts` (176 lines)
- Check: `src/lib/references/types.ts` (28 lines)

**Step 1: Check if reference import is wired into the generation wizard**

Read `src/components/presentation/generation-wizard.tsx` and check if it has a "Import References" option or button that opens the reference import panel.

If not wired, add an import and a trigger button in the wizard's source selection step.

**Step 2: Verify API routes compile**

Run: `npx tsc --noEmit 2>&1 | grep references`
Expected: No errors

**Step 3: Commit any fixes**

```bash
git add -A && git commit -m "feat: wire reference import into generation wizard"
```

---

## Phase D: Recover Worktree Features

Each worktree contains a self-contained feature built against V1. The code needs to be copied into the V2 branch and adapted to V2's expanded type system. These three tasks are fully independent and can be run in parallel via agent teams.

### Task 15: Integrate poster renderer from worktree agent-af09e9fe

**Source:** `.claude/worktrees/agent-af09e9fe/`
**Files (995 lines total):**
- Copy: `src/components/presentation/poster-renderer.tsx` (776 lines)
- Copy: `src/types/poster.ts` (219 lines)
- Copy: `src/app/(app)/poster/` (directory — page, [posterId], new)
- Copy: `src/app/api/posters/` (directory)

**Step 1: Copy files from worktree to main repo**

```bash
cp .claude/worktrees/agent-af09e9fe/src/types/poster.ts src/types/poster.ts
cp .claude/worktrees/agent-af09e9fe/src/components/presentation/poster-renderer.tsx src/components/presentation/poster-renderer.tsx
cp -r .claude/worktrees/agent-af09e9fe/src/app/\(app\)/poster src/app/\(app\)/poster
cp -r .claude/worktrees/agent-af09e9fe/src/app/api/posters src/app/api/posters
```

**Step 2: Fix V1 → V2 type mismatches**

The poster renderer was built against V1 `ContentBlock` types (7 types). V2 has 15. Read `poster-renderer.tsx` and update any type imports to use the current V2 types from `src/types/presentation.ts`.

Common issues:
- Old layout names (`"quote"` → `"quote_slide"`, `"image_full"` → `"image_text"`)
- Missing new content block type handlers (math, diagram, code, etc.)
- Old theme type (4 themes → 14 themes)

**Step 3: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | grep -i poster`
Expected: No errors

**Step 4: Add sidebar nav link**

Add a "Poster" link in the app sidebar if not already present.

**Step 5: Commit**

```bash
git add src/types/poster.ts src/components/presentation/poster-renderer.tsx src/app/\(app\)/poster src/app/api/posters
git commit -m "feat: integrate academic poster generator from worktree"
```

---

### Task 16: Integrate social media export from worktree agent-afa07df9

**Source:** `.claude/worktrees/agent-afa07df9/`
**Files (1,079 lines total):**
- Copy: `src/components/presentation/social-export-modal.tsx` (436 lines)
- Copy: `src/components/presentation/social-slide-renderer.tsx` (393 lines)
- Copy: `src/lib/presentation/social-export.ts` (182 lines)
- Copy: `src/lib/presentation/social-formats.ts` (68 lines)

**Step 1: Copy files from worktree**

```bash
cp .claude/worktrees/agent-afa07df9/src/components/presentation/social-export-modal.tsx src/components/presentation/social-export-modal.tsx
cp .claude/worktrees/agent-afa07df9/src/components/presentation/social-slide-renderer.tsx src/components/presentation/social-slide-renderer.tsx
cp .claude/worktrees/agent-afa07df9/src/lib/presentation/social-export.ts src/lib/presentation/social-export.ts
cp .claude/worktrees/agent-afa07df9/src/lib/presentation/social-formats.ts src/lib/presentation/social-formats.ts
```

**Step 2: Fix V1 → V2 type mismatches**

Read each file and update imports/types to match V2's expanded `ContentBlock`, `SlideLayout`, and `ThemeConfig` types.

**Step 3: Wire into editor toolbar**

Add a "Share to Social" button in the slide toolbar (`slide-toolbar.tsx`) or the export dropdown that opens the `SocialExportModal`.

**Step 4: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | grep -i social`
Expected: No errors

**Step 5: Commit**

```bash
git add src/components/presentation/social-export-modal.tsx src/components/presentation/social-slide-renderer.tsx src/lib/presentation/social-export.ts src/lib/presentation/social-formats.ts src/components/presentation/slide-toolbar.tsx
git commit -m "feat: integrate social media export from worktree"
```

---

### Task 17: Integrate real-time collaboration from worktree agent-ae78f4dc

**Source:** `.claude/worktrees/agent-ae78f4dc/`
**Files (672 lines + Liveblocks config):**
- Copy: `src/components/presentation/collaboration-provider.tsx` (92 lines)
- Copy: `src/components/presentation/collaboration-avatars.tsx` (126 lines)
- Copy: `src/components/presentation/collaboration-cursors.tsx` (85 lines)
- Copy: `src/components/presentation/collaboration-toolbar-slot.tsx` (30 lines)
- Copy: `src/components/presentation/invite-collaborator-modal.tsx` (189 lines)
- Copy: `src/hooks/use-collaborative-slides.ts` (150 lines)
- Copy: `src/lib/liveblocks/config.ts`
- Copy: `src/app/api/liveblocks-auth/` (directory)
- Copy: `src/app/api/liveblocks-webhook/` (directory)

**⚠️ IMPORTANT: This feature requires `@liveblocks/client` and `@liveblocks/react` packages, which are NOT in package.json.**

**Step 1: Install Liveblocks**

```bash
npm install @liveblocks/client @liveblocks/react @liveblocks/node
```

**Step 2: Copy files from worktree**

```bash
cp .claude/worktrees/agent-ae78f4dc/src/components/presentation/collaboration-*.tsx src/components/presentation/
cp .claude/worktrees/agent-ae78f4dc/src/components/presentation/invite-collaborator-modal.tsx src/components/presentation/
cp .claude/worktrees/agent-ae78f4dc/src/hooks/use-collaborative-slides.ts src/hooks/
cp -r .claude/worktrees/agent-ae78f4dc/src/lib/liveblocks src/lib/liveblocks
cp -r .claude/worktrees/agent-ae78f4dc/src/app/api/liveblocks-auth src/app/api/liveblocks-auth
cp -r .claude/worktrees/agent-ae78f4dc/src/app/api/liveblocks-webhook src/app/api/liveblocks-webhook
```

**Step 3: Fix V1 → V2 type mismatches**

The collaborative slides hook uses `LiveObject` with V1 slide types. Update to use V2 `ContentBlock` and `SlideLayout` types.

**Step 4: Wire into editor**

Wrap the editor page content with `CollaborationProvider`. Add `CollaborationAvatars` to the toolbar. Add `CollaborationCursors` to the canvas.

**Step 5: Add LIVEBLOCKS_SECRET_KEY to .env.example**

```
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
```

**Step 6: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | grep -i "collab\|liveblocks"`
Expected: No errors

**Step 7: Commit**

```bash
git add src/components/presentation/collaboration-*.tsx src/components/presentation/invite-collaborator-modal.tsx src/hooks/use-collaborative-slides.ts src/lib/liveblocks src/app/api/liveblocks-auth src/app/api/liveblocks-webhook package.json package-lock.json
git commit -m "feat: integrate real-time collaboration (Liveblocks) from worktree"
```

---

## Phase E: Integration Testing & Polish

### Task 18: Full TypeScript compilation check

**Step 1: Run full type check**

Run: `npx tsc --noEmit`
Expected: 0 errors

If errors remain, fix them. Document each fix.

**Step 2: Run linter**

Run: `npx next lint`
Expected: 0 errors (warnings acceptable)

If errors exist, fix them.

**Step 3: Commit any fixes**

```bash
git add -A && git commit -m "fix: resolve all TypeScript and lint errors"
```

---

### Task 19: Verify dev server starts

**Step 1: Start dev server**

Run: `npm run dev`
Expected: Server starts on localhost:3000 without crashes

**Step 2: Check for hydration errors in browser console**

Navigate to `/presentation` — verify the page renders.
Navigate to `/presentation/[any-deck-id]` — verify the editor loads.

**Step 3: Check for missing env vars**

If any features crash due to missing env vars (LIVEBLOCKS_SECRET_KEY, etc.), add them to `.env.local` with placeholder values and add proper checks that degrade gracefully when the key is missing.

**Step 4: Commit any fixes**

---

### Task 20: Clean up worktrees

**Step 1: Remove worktrees that have been integrated**

```bash
git worktree remove .claude/worktrees/agent-ae78f4dc --force
git worktree remove .claude/worktrees/agent-af09e9fe --force
git worktree remove .claude/worktrees/agent-afa07df9 --force
```

**Step 2: Commit removal of submodule references if any**

```bash
git add -A && git commit -m "chore: clean up integrated worktrees"
```

---

## Phase F: Merge to Main

### Task 21: Rebase on main and resolve conflicts

**Step 1: Fetch latest main**

```bash
git fetch origin main
```

**Step 2: Rebase**

```bash
git rebase origin/main
```

If conflicts arise, resolve them file-by-file. Priority: keep V2 changes, adapt to any main-branch changes in shared files (schema, sidebar, etc.).

**Step 3: Run full type check after rebase**

Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 4: Commit/continue rebase as needed**

---

### Task 22: Merge to main

**Step 1: Switch to main**

```bash
git checkout main
git merge feature/presentation-engine-v2
```

**Step 2: Verify**

Run: `npx tsc --noEmit && npm run dev`
Expected: Clean compilation, dev server starts

**Step 3: Push**

```bash
git push origin main
```

---

## Parallelization Strategy

```
Phase A (Tasks 1-4):  ─── All 4 in parallel via agent teams ───────────┐
                                                                         │
Phase B (Tasks 5-7):  ─── Sequential (schema → generate → apply) ──────┤
                                                                         │
Phase C (Tasks 8-14): ─── Group 1 parallel: 8, 9, 10 ──┐               │
                       ─── Group 2 parallel: 11, 12, 13, 14 ──┤        │
                                                                         │
Phase D (Tasks 15-17): ─── All 3 in parallel via agent teams ──────────┤
                                                                         │
Phase E (Tasks 18-20): ─── Sequential ──────────────────────────────────┤
                                                                         │
Phase F (Tasks 21-22): ─── Sequential ──────────────────────────────────┘
```

**Estimated total: 22 tasks across 6 phases.**

---

## Risk Register

| Risk | Mitigation |
|------|------------|
| V2 migration conflicts with existing DB | Back up DB before migration; use `drizzle-kit push` for dev |
| Worktree code has deep V1 assumptions | Read each file carefully; update type casts systematically |
| Liveblocks adds third-party dependency | Make collaboration optional — wrap in feature flag / env check |
| Emergency save features have runtime bugs | Phase E catches these — dev server + manual navigation test |
| Rebase on main has large conflicts | V2 branch diverged 11 commits from main; conflicts likely in schema files |

---

## File Inventory

**Total presentation files after completion: ~45 components + 15 lib files + 12 API routes + 5 pages**

Components (35):
```
src/components/presentation/
├── agent-panel.tsx              ├── analytics-panel.tsx
├── ai-tools-dropdown.tsx        ├── animation-picker.tsx
├── coach-panel.tsx              ├── collaboration-avatars.tsx    [NEW from worktree]
├── collaboration-cursors.tsx    [NEW from worktree]
├── collaboration-provider.tsx   [NEW from worktree]
├── collaboration-toolbar-slot.tsx [NEW from worktree]
├── comment-thread.tsx           ├── comments-panel.tsx
├── content-block-editor.tsx     ├── defense-prep-panel.tsx
├── design-panel.tsx             ├── generation-wizard.tsx
├── invite-collaborator-modal.tsx [NEW from worktree]
├── layout-picker.tsx            ├── poster-renderer.tsx          [NEW from worktree]
├── presenter-controls.tsx       ├── presenter-mode.tsx
├── prisma-input-form.tsx        ├── recording-controls.tsx
├── recording-preview.tsx        ├── recording-setup-modal.tsx
├── recordings-panel.tsx         ├── reference-import-panel.tsx
├── share-panel.tsx              ├── share-password-gate.tsx
├── shared-presentation-viewer.tsx
├── slide-canvas.tsx             ├── slide-outline-sidebar.tsx
├── slide-renderer.tsx           ├── slide-toolbar.tsx
├── social-export-modal.tsx      [NEW from worktree]
├── social-slide-renderer.tsx    [NEW from worktree]
├── source-selector.tsx          ├── speaker-notes-panel.tsx
├── template-selector.tsx        ├── theme-picker.tsx
├── version-diff-viewer.tsx      └── version-history-panel.tsx
```
