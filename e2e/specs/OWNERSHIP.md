# Module Ownership — v2 Test Queue

## Rules
1. Each module is owned by exactly ONE agent
2. Only the owning agent tests and fixes code within that module's source files
3. Queue branch (test/queue-v2) holds spec files and manifests only — no app code changes
4. Agent branches hold test results + code fixes for owned modules only
5. Agent branches merge only into test/integration-v2, never into each other

## Codex Ownership

| Module | Specs | Checkpoints | Branch |
|--------|-------|-------------|--------|
| editor | 38 | 1,308 | test/codex-editor-v2 |
| latex | 17 | 571 | test/codex-latex-v2 |
| notebook | 25 | 859 | test/codex-notebook-v2 |
| slides | 24 | 819 | test/codex-slides-v2 |
| slides-ai | 21 | 716 | test/codex-slides-ai-v2 |
| **Total** | **125** | **4,273** | |

## Claude Ownership

| Module | Specs | Checkpoints | Branch |
|--------|-------|-------------|--------|
| analysis | 10 | 323 | test/claude-analysis-v2 |
| compliance | 16 | 533 | test/claude-compliance-v2 |
| dashboard | 9 | 281 | test/claude-dashboard-v2 |
| deep-research | 15 | 525 | test/claude-deep-research-v2 |
| feeds | 19 | 658 | test/claude-feeds-v2 |
| illustrate | 37 | 1,284 | test/claude-illustrate-v2 |
| library | 11 | 380 | test/claude-library-v2 |
| onboarding | 7 | 242 | test/claude-onboarding-v2 |
| poster | 15 | 509 | test/claude-poster-v2 |
| presentation | 27 | 937 | test/claude-presentation-v2 |
| projects | 9 | 305 | test/claude-projects-v2 |
| research | 18 | 598 | test/claude-research-v2 |
| settings | 9 | 297 | test/claude-settings-v2 |
| studio | 17 | 564 | test/claude-studio-v2 |
| systematic-review | 32 | 1,100 | test/claude-systematic-review-v2 |
| **Total** | **251** | **8,536** | |

## Branch Model

```
main (untouched)
 └── test/queue-v2 (specs, manifests, pipeline — no app code)
      ├── test/codex-editor-v2
      ├── test/codex-latex-v2
      ├── test/codex-notebook-v2
      ├── test/codex-slides-v2
      ├── test/codex-slides-ai-v2
      ├── test/claude-analysis-v2
      ├── test/claude-compliance-v2
      ├── test/claude-dashboard-v2
      ├── test/claude-deep-research-v2
      ├── test/claude-feeds-v2
      ├── test/claude-illustrate-v2
      ├── test/claude-library-v2
      ├── test/claude-onboarding-v2
      ├── test/claude-poster-v2
      ├── test/claude-presentation-v2
      ├── test/claude-projects-v2
      ├── test/claude-research-v2
      ├── test/claude-settings-v2
      ├── test/claude-studio-v2
      ├── test/claude-systematic-review-v2
      └── test/integration-v2 (human-reviewed merges only)
```

## Merge Policy
1. test/queue-v2 merges into integration first (baseline)
2. Agent branches merge only into test/integration-v2
3. Agent branches NEVER merge into each other
4. If two branches fix the same file → pick one, cherry-pick the other selectively
5. Human reviews every merge into integration
