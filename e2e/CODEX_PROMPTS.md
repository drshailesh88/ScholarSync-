# Codex Instance Prompts — Copy-Paste Per Terminal

Read `e2e/CODEX_HANDOFF.md` first for the full spec format and rules.

## Recommended: 5 Parallel Instances

Balanced by checkpoint count (~2,500 each):

| Instance | Modules | Total Checks |
|----------|---------|-------------|
| Terminal 1 | editor (1,308) + onboarding (242) + settings (297) | 1,847 |
| Terminal 2 | illustrate (1,284) + dashboard (281) + projects (305) | 1,870 |
| Terminal 3 | systematic-review (1,100) + library (380) + analysis (323) | 1,803 |
| Terminal 4 | presentation (937) + slides (819) + poster (509) | 2,265 |
| Terminal 5 | notebook (859) + slides-ai (716) + feeds (658) + compliance (533) + deep-research (525) + research (598) + studio (564) + latex (571) | 5,024 |

Or split Terminal 5 further into 2-3 more instances if you have the capacity.

---

## Terminal 1 — Editor + Onboarding + Settings

```
You are testing ScholarSync features using agent-browser. Dev server is at http://localhost:3001.

Read e2e/CODEX_HANDOFF.md for the full spec format, commit conventions, and rules.

Your assigned modules: editor, onboarding, settings

For each module:
1. git checkout test/queue-v2 && git checkout -b test/codex-{module}-v2
2. Read e2e/specs/{module}/MANIFEST.md to see all spec files
3. Start from spec-001.md. For each spec file:
   a. Read every - [ ] checkbox
   b. Navigate to the PAGE url in agent-browser
   c. Test each item by performing the action and observing the result
   d. Mark results: [x] PASS, [!] FAIL, [b] BLOCKED, [s] SKIP
   e. When you find a FAIL — investigate the source code, fix the bug if < 20 lines, re-test
   f. Commit fixes: git commit -m "fix({module}): {description}"
   g. Commit spec results: git commit -m "test({module}): spec-NNN — {pass}P/{fail}F/{blocked}B"
   h. Update MANIFEST.md counts after each spec
4. Move to the next spec file until all are COMPLETE
5. Then move to the next module

Start with onboarding (smallest, 7 specs). Then settings (9 specs). Then editor (38 specs).
```

---

## Terminal 2 — Illustrate + Dashboard + Projects

```
You are testing ScholarSync features using agent-browser. Dev server is at http://localhost:3001.

Read e2e/CODEX_HANDOFF.md for the full spec format, commit conventions, and rules.

Your assigned modules: illustrate, dashboard, projects

For each module:
1. git checkout test/queue-v2 && git checkout -b test/codex-{module}-v2
2. Read e2e/specs/{module}/MANIFEST.md to see all spec files
3. Start from spec-001.md. For each spec file:
   a. Read every - [ ] checkbox
   b. Navigate to the PAGE url in agent-browser
   c. Test each item by performing the action and observing the result
   d. Mark results: [x] PASS, [!] FAIL, [b] BLOCKED, [s] SKIP
   e. When you find a FAIL — investigate the source code, fix the bug if < 20 lines, re-test
   f. Commit fixes: git commit -m "fix({module}): {description}"
   g. Commit spec results: git commit -m "test({module}): spec-NNN — {pass}P/{fail}F/{blocked}B"
   h. Update MANIFEST.md counts after each spec
4. Move to the next spec file until all are COMPLETE
5. Then move to the next module

Start with dashboard (9 specs). Then projects (9 specs). Then illustrate (37 specs).
```

---

## Terminal 3 — Systematic Review + Library + Analysis

```
You are testing ScholarSync features using agent-browser. Dev server is at http://localhost:3001.

Read e2e/CODEX_HANDOFF.md for the full spec format, commit conventions, and rules.

Your assigned modules: systematic-review, library, analysis

For each module:
1. git checkout test/queue-v2 && git checkout -b test/codex-{module}-v2
2. Read e2e/specs/{module}/MANIFEST.md to see all spec files
3. Start from spec-001.md. For each spec file:
   a. Read every - [ ] checkbox
   b. Navigate to the PAGE url in agent-browser
   c. Test each item by performing the action and observing the result
   d. Mark results: [x] PASS, [!] FAIL, [b] BLOCKED, [s] SKIP
   e. When you find a FAIL — investigate the source code, fix the bug if < 20 lines, re-test
   f. Commit fixes: git commit -m "fix({module}): {description}"
   g. Commit spec results: git commit -m "test({module}): spec-NNN — {pass}P/{fail}F/{blocked}B"
   h. Update MANIFEST.md counts after each spec
4. Move to the next spec file until all are COMPLETE
5. Then move to the next module

Start with analysis (10 specs). Then library (11 specs). Then systematic-review (32 specs).
```

---

## Terminal 4 — Presentation + Slides + Poster

```
You are testing ScholarSync features using agent-browser. Dev server is at http://localhost:3001.

Read e2e/CODEX_HANDOFF.md for the full spec format, commit conventions, and rules.

Your assigned modules: presentation, slides, poster

For each module:
1. git checkout test/queue-v2 && git checkout -b test/codex-{module}-v2
2. Read e2e/specs/{module}/MANIFEST.md to see all spec files
3. Start from spec-001.md. For each spec file:
   a. Read every - [ ] checkbox
   b. Navigate to the PAGE url in agent-browser
   c. Test each item by performing the action and observing the result
   d. Mark results: [x] PASS, [!] FAIL, [b] BLOCKED, [s] SKIP
   e. When you find a FAIL — investigate the source code, fix the bug if < 20 lines, re-test
   f. Commit fixes: git commit -m "fix({module}): {description}"
   g. Commit spec results: git commit -m "test({module}): spec-NNN — {pass}P/{fail}F/{blocked}B"
   h. Update MANIFEST.md counts after each spec
4. Move to the next spec file until all are COMPLETE
5. Then move to the next module

Start with poster (15 specs). Then slides (24 specs). Then presentation (27 specs).
```

---

## Terminal 5 — Notebook + Slides AI + Feeds + Compliance + Deep Research + Research + Studio + LaTeX

```
You are testing ScholarSync features using agent-browser. Dev server is at http://localhost:3001.

Read e2e/CODEX_HANDOFF.md for the full spec format, commit conventions, and rules.

Your assigned modules: notebook, slides-ai, feeds, compliance, deep-research, research, studio, latex

For each module:
1. git checkout test/queue-v2 && git checkout -b test/codex-{module}-v2
2. Read e2e/specs/{module}/MANIFEST.md to see all spec files
3. Start from spec-001.md. For each spec file:
   a. Read every - [ ] checkbox
   b. Navigate to the PAGE url in agent-browser
   c. Test each item by performing the action and observing the result
   d. Mark results: [x] PASS, [!] FAIL, [b] BLOCKED, [s] SKIP
   e. When you find a FAIL — investigate the source code, fix the bug if < 20 lines, re-test
   f. Commit fixes: git commit -m "fix({module}): {description}"
   g. Commit spec results: git commit -m "test({module}): spec-NNN — {pass}P/{fail}F/{blocked}B"
   h. Update MANIFEST.md counts after each spec
4. Move to the next spec file until all are COMPLETE
5. Then move to the next module

Start with compliance (16 specs). Then latex (17 specs). Then studio (17 specs). Then research (18 specs). Then feeds (19 specs). Then slides-ai (21 specs). Then notebook (25 specs). Then deep-research (15 specs).
```

---

## Quick Progress Check (run from any terminal)

```bash
bash e2e/ralph/progress.sh
```

## Important: Branch Conflicts

Each Codex instance MUST create its own branch per module:
```bash
git checkout test/queue-v2
git checkout -b test/codex-{module}-v2
```

If two instances try to fix the same source file, you'll get conflicts during integration. The module split above minimizes this — each module's source files are mostly isolated. But shared files (layout, utils) could conflict. Review merges into `test/integration-v2` manually.
