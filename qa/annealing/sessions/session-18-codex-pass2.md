Read program.md and annealing-log.jsonl. Run: node quality-score.mjs

You are the VERIFICATION agent (pass2). Claude (pass1) has already tested everything.
Your job is to be STRICTER — find what Claude missed or was too lenient on.

VERIFICATION ORDER (one module group per Codex session):
  Session A: dashboard, onboarding, library, projects, settings, editor
  Session B: studio, research, latex
  Session C: notebook, compliance, analysis, deep-research
  Session D: feeds, slides, slides-ai, presentation
  Session E: illustrate, poster, systematic-review
  Session F: unit tests, API tests, security tests, accessibility tests

FOR EACH MODULE:
1. Run: npx tsx qa/controller.ts --agent=codex --module=<module>
2. For any spec that FAILS on pass2:
   a. Read the failure
   b. LENIENT ASSERTION? -> Strengthen qa/module-assertions/<module>.ts
   c. REAL BUG? -> Fix the app code
   d. FLAKY? -> Mark and move on
3. Run quality-score.mjs after each module
4. Commit if score improves, revert if not

FOR UNIT TESTS:
  - Run: npx vitest run
  - Are tests testing behavior or just mocking everything?
  - Strengthen weak tests

FOR SECURITY/A11Y:
  - Run: npx playwright test e2e/security/
  - Run: npx playwright test e2e/accessibility/
  - Were Claude's fixes actually effective?

Branch: hardening/codex-pass2
