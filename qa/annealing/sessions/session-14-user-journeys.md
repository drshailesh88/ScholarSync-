Read program.md and annealing-log.jsonl. Run: node quality-score.mjs

You are continuing the self-annealing process. This is the USER JOURNEY session.
Read docs/USER_JOURNEYS.md completely — it documents 5 cross-module end-to-end journeys.

Create directory: e2e/journeys/

JOURNEY 1: Search -> Save -> Synthesize -> Write
File: e2e/journeys/search-to-write.spec.ts
Flow: /deep-research -> search -> save paper -> /library -> /notebook -> synthesize -> /studio -> write

JOURNEY 2: Deep Research -> Library -> Presentation
File: e2e/journeys/research-to-presentation.spec.ts
Flow: /deep-research -> save findings -> /library -> select papers -> /slides -> generate

JOURNEY 3: Draft quality gate before submission
File: e2e/journeys/quality-gate.spec.ts
Flow: /studio -> write draft -> /compliance -> run checks -> /analysis -> review

JOURNEY 4: Systematic review publication pipeline
File: e2e/journeys/systematic-review-pipeline.spec.ts
Flow: /systematic-review -> create -> import refs -> screen -> extract -> meta-analysis -> manuscript

JOURNEY 5: AI-generated presentation from research
File: e2e/journeys/ai-presentation.spec.ts
Flow: /research -> search -> select evidence -> /slides -> AI generate -> /presentation

ALSO test module entry journeys (e2e/journeys/module-entries.spec.ts):
For EVERY module: dashboard click -> arrives at page, empty state visible, deep link works, back button works, refresh preserves state.

FOR EACH: Write Playwright test, run it, fix failures, commit if score improves.

Branch: hardening/session-N (increment N)
