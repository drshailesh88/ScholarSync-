# Ralph Loop State

## Setup
- Date started: 2026-03-11
- Dev server: http://localhost:3001 (shared with Codex)
- Total modules: 20
- Total spec files: 376
- Total checkpoints: 12,809
- Branch: test/codex-feature-tests

## How to Resume (paste this in a new Claude session)

```
Read e2e/ralph/RALPH_PROMPT.md and e2e/ralph/RALPH_STATE.md.
Run: bash e2e/ralph/progress.sh
Then pick up the next PENDING spec and test it via agent-browser.
```

## How to Check Progress

```bash
# Full report
bash e2e/ralph/progress.sh

# Quick one-liner
bash e2e/ralph/progress.sh --compact

# Single module
bash e2e/ralph/progress.sh --module dashboard

# Git log of test commits
git log --oneline --grep="test(" -20

# Git log of fix commits
git log --oneline --grep="fix(" -20
```

## How to Run the Automated Loop

```bash
# All modules (default 200 iterations)
./e2e/ralph/ralph.sh

# Specific module
MODULE=dashboard ./e2e/ralph/ralph.sh

# Custom iteration limit
MAX_ITER=500 ./e2e/ralph/ralph.sh

# Logs are in e2e/ralph/logs/
```

## Module Order (by spec count, ascending)
1. onboarding (7 specs, 242 items)
2. dashboard (9 specs, 281 items)
3. settings (9 specs, 297 items)
4. projects (9 specs, 305 items)
5. analysis (10 specs, 323 items)
6. library (11 specs, 380 items)
7. deep-research (15 specs, 525 items)
8. poster (15 specs, 509 items)
9. compliance (16 specs, 533 items)
10. latex (17 specs, 571 items)
11. studio (17 specs, 564 items)
12. research (18 specs, 598 items)
13. feeds (19 specs, 658 items)
14. slides-ai (21 specs, 716 items)
15. slides (24 specs, 819 items)
16. notebook (25 specs, 859 items)
17. presentation (27 specs, 937 items)
18. systematic-review (32 specs, 1100 items)
19. illustrate (37 specs, 1284 items)
20. editor (38 specs, 1308 items)
