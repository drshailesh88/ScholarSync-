# Codex Handoff — Full Feature Testing

## What This Is

12,809 feature checkpoints across 20 modules, split into 376 spec files (35 items each). Every feature in the app has been documented and needs browser testing + fixing.

## Spec File Location

```
e2e/specs/{module}/spec-001.md through spec-NNN.md
e2e/specs/{module}/MANIFEST.md              — per-module index
e2e/specs/MASTER_MANIFEST.md                — global index
e2e/specs/OWNERSHIP.md                      — module assignments
```

## Spec File Format

```markdown
# {module} — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/{module}
MODULE: {module}

---
### Section Name
- [ ] Feature description to test
- [ ] Another feature to test
```

## How to Test

For each `- [ ]` item:

1. Navigate to the PAGE url
2. Perform the action described
3. Observe what happens
4. Replace the checkbox with one of:

```
- [x] PASS: {what you observed}
- [!] FAIL: expected {X}, got {Y}
- [b] BLOCKED: {reason}
- [s] SKIP: {reason — server-only, not browser-testable}
```

## How to Fix Failures

When you find a FAIL:

1. Read the relevant source file
2. If it's a code bug (missing handler, wrong route, broken API) → fix the code, re-test, mark PASS
3. If the spec is wrong (app works differently but behavior is reasonable) → correct the spec, mark PASS with note
4. If feature doesn't exist yet → mark BLOCKED
5. Keep fixes minimal. Commit fixes separately from spec results.

## How to Commit

```bash
# After fixing code:
git add src/...changed-files...
git commit -m "fix({module}): {what was fixed}"

# After testing a spec file:
git add e2e/specs/{module}/spec-NNN.md
git commit -m "test({module}): spec-NNN — {pass}P/{fail}F/{blocked}B"

# After completing a spec, update the manifest:
git add e2e/specs/{module}/MANIFEST.md
git commit -m "test({module}): update manifest"
```

## After Finishing All Specs in a Module

Update the spec headers with final counts:
```
STATUS: COMPLETE
TESTED: 35/35
PASS: 30
FAIL: 3
BLOCKED: 2
```

Update MANIFEST.md with final status per spec file.

## Branch Model

Each module gets its own branch off `test/queue-v2`:

```bash
git checkout test/queue-v2
git checkout -b test/codex-{module}-v2
# ... do all testing and fixing on this branch ...
```

Never merge module branches into each other. Only merge into `test/integration-v2` after human review.

## Rules

1. NEVER create auth bypasses or dev-only routes
2. NEVER skip items — test every checkbox
3. NEVER mark PASS without actually verifying in the browser
4. Commit code fixes SEPARATELY from spec result commits
5. Keep fixes minimal — fix the bug, not the neighborhood
6. If a fix needs more than ~20 lines → mark BLOCKED and move on

## All 20 Modules

| # | Module | Specs | Checks | Source Doc |
|---|--------|-------|--------|------------|
| 1 | analysis | 10 | 323 | ANALYSIS_FEATURES_TESTING.md |
| 2 | compliance | 16 | 533 | COMPLIANCE_FEATURES_TESTING.md |
| 3 | dashboard | 9 | 281 | DASHBOARD_FEATURES_TESTING.md |
| 4 | deep-research | 15 | 525 | DEEP_RESEARCH_FEATURES_TESTING.md |
| 5 | editor | 38 | 1,308 | EDITOR_FEATURES_TESTING.md |
| 6 | feeds | 19 | 658 | FEEDS_FEATURES_TESTING.md |
| 7 | illustrate | 37 | 1,284 | ILLUSTRATE_FEATURES_TESTING.md |
| 8 | latex | 17 | 571 | LATEX_EDITOR_FEATURES_TESTING.md |
| 9 | library | 11 | 380 | LIBRARY_FEATURES_TESTING.md |
| 10 | notebook | 25 | 859 | NOTEBOOK_FEATURES_TESTING.md |
| 11 | onboarding | 7 | 242 | ONBOARDING_FEATURES_TESTING.md |
| 12 | poster | 15 | 509 | POSTER_FEATURES_TESTING.md |
| 13 | presentation | 27 | 937 | PRESENTATION_FEATURES_TESTING.md |
| 14 | projects | 9 | 305 | PROJECTS_FEATURES_TESTING.md |
| 15 | research | 18 | 598 | RESEARCH_FEATURES_TESTING.md |
| 16 | settings | 9 | 297 | SETTINGS_FEATURES_TESTING.md |
| 17 | slides | 24 | 819 | SLIDES_FEATURES_TESTING.md |
| 18 | slides-ai | 21 | 716 | SLIDES_AI_GAMMA_FEATURES_TESTING.md |
| 19 | studio | 17 | 564 | STUDIO_FEATURES_TESTING.md |
| 20 | systematic-review | 32 | 1,100 | SYSTEMATIC_REVIEW_FEATURES_TESTING.md |
