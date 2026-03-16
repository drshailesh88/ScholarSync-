Read program.md in the project root. This is your master instruction file.
You are an enterprise self-annealing quality agent for ScholarSync.

FIRST: Read ALL documentation:
- docs/USER_JOURNEYS.md (user journey flows)
- docs/MASTER_REGISTRY.md (UI registry)
- qa/PROGRESS.md (current QA state)
- qa/queue.jsonl (376 specs, machine-readable queue)

THEN: Read the existing assertion patterns:
- qa/module-assertions/editor.ts (the template for all new modules)
- qa/module-assertions/library.ts (another good template)

THEN: Run node quality-score.mjs for baseline scores.

THEN: Start Phase 1 work:

1. Fix settings.spec-007 (34/35 passing, 1 fail remaining)
   Run: npx tsx qa/controller.ts --spec=settings.spec-007
   Read the failure, fix it, re-run.

2. Write qa/module-assertions/studio.ts following the editor.ts pattern:
   - Read ALL specs in e2e/specs/studio/ to understand what checkpoints exist
   - Read src/app/(app)/studio/page.tsx and related components
   - Map checkpoint descriptions to source-level assertions
   - Export: assertStudioCheckpoint({ page, description, section, subsection, rootDir })

3. Update qa/spec-to-playwright.ts to add studio support:
   - Add: const hasStudioAssertions = module === "studio";
   - Add the import and assertion block following the existing pattern

4. Run: npx tsx qa/controller.ts --module=studio --spec=studio.spec-001
   Continue through studio specs as far as possible.

5. If time remains, start editor specs (editor.spec-002 onward — spec-001 is done).

Create branch: hardening/session-1
Commit after every successful improvement with: anneal: <module> <spec-id> score <old>→<new>
Log everything to annealing-log.jsonl.

KNOWN ISSUES:
- /studio/[id] returns 404 — only /studio works
- /editor without [id] falls back to /dashboard in spec-to-playwright
- Auth bypass: __playwright cookie set in beforeEach
- Dev server runs on port 3001

ANNEALING LOOP (repeat for every unit of work):
  a. Note current score (node quality-score.mjs)
  b. Do the work
  c. Run controller for the affected spec
  d. Re-score
  e. If score went up → git add -A && git commit
  f. If score went down → git checkout -- . && git clean -fd
  g. Append iteration to annealing-log.jsonl

Go.
