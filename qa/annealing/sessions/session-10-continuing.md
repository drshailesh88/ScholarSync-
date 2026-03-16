Read program.md in the project root.
Read annealing-log.jsonl to understand all previous work.
Run: git log --oneline -30
Run: node quality-score.mjs

You are continuing the self-annealing process for ScholarSync.
Determine which module and spec you should work on from the log and queue.

Current phase: Check the score output for current phase.
Continue from exactly where the last session stopped.

MODULE EXECUTION ORDER (work through in this order):
Wave 1: settings (finish), editor (37 specs), studio (17 specs)
Wave 2: research (18), latex (17), notebook (25), compliance (16)
Wave 3: analysis (10), deep-research (15), feeds (19)
Wave 4: slides (24) + slides-ai (21), presentation (27)
Wave 5: illustrate (37), poster (15), systematic-review (32)

FOR EACH NEW MODULE:
1. Read ALL specs in e2e/specs/<module>/ to understand checkpoints
2. Read the page source: src/app/(app)/<module>/page.tsx
3. Write qa/module-assertions/<module>.ts if it doesn't exist
4. Update qa/spec-to-playwright.ts to add has<Module>Assertions support
5. Run: npx tsx qa/controller.ts --module=<module> --spec=<module>.spec-001
6. Continue through all specs in the module

Work on branch: hardening/session-N (increment N).
Follow the phase gates — don't skip ahead.

ANNEALING LOOP (same every session):
  a. Note current score
  b. Do the work
  c. Run controller
  d. Re-score
  e. Commit if improved, revert if not
  f. Log to annealing-log.jsonl

Go.
