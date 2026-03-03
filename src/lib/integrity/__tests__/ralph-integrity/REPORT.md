# RALPH Integrity — Hardening Report

## Summary

| Metric | Value |
|--------|-------|
| Total Cycles | 7 |
| Total Tests | 250 |
| Pass Rate | 250/250 (100%) |
| Bugs Found | 3 |
| Bugs Fixed | 2 (1 documented limitation) |
| Exit Condition | 3 consecutive cycles at 9.5+/10 with zero new bugs |
| Exit Cycles | Cycle 5 (9.5), Cycle 6 (9.5), Cycle 7 (9.5) |

## Test Files

| File | Tests | Cycles |
|------|-------|--------|
| `runner.test.ts` | 48 | 1-12: Foundation |
| `runner-orchestrator.test.ts` | 8 | 5: Orchestrator tier gating |
| `runner-turnitin-parity.test.ts` | 31 | 13-21: Turnitin feature parity |
| `runner-stress.test.ts` | 32 | 22-28: Stress tests & boundary conditions |
| `runner-deep.test.ts` | 38 | 29-35: Deep bug hunting |
| `runner-bugfix.test.ts` | 33 | 36-40: Bug fixes & regressions |
| `runner-final.test.ts` | 36 | 41-47: Type contracts & parity checklist |
| `runner-exit.test.ts` | 24 | 48-52: Exit validation |

## Bugs Found & Fixed

### Bug 1: Predatory Journal False Positive on Short Names (Cycle 2)
- **File**: `src/lib/integrity/predatory-journals.ts`
- **Severity**: High (production false positives)
- **Issue**: Bidirectional substring matching flagged legitimate publishers like "Nature" and "Science" because predatory list entries containing those words (e.g., "nature and science publishing") matched via reverse substring check.
- **Fix**: Added `MIN_REVERSE_MATCH_LENGTH = 12` constant. Reverse matching (`pred.includes(input)`) now only applies when the input name is at least 12 characters, preventing false positives on short legitimate publisher/journal names.

### Bug 2: TTR Punctuation Inflation (Cycle 4-5)
- **File**: `src/lib/integrity/ai-detection.ts`
- **Severity**: Medium (inaccurate metric)
- **Issue**: `computeTextStatistics` computed Type-Token Ratio without stripping trailing punctuation. Words like "the." and "the" were counted as different unique tokens, inflating TTR values.
- **Fix**: Added `.replace(/[^a-z0-9]/g, "")` before inserting into the uniqueness Set, ensuring punctuation doesn't affect vocabulary diversity calculation.

### Known Limitation: Passive Voice Regex Missing Irregular Past Participles
- **File**: `src/lib/integrity/ai-detection.ts`
- **Severity**: Low (false negatives, not false positives)
- **Issue**: The passive voice regex pattern matches suffixes `-ed`, `-en`, `-wn`, `-ht`, `-ne`, `-lt` but misses common irregulars like "found" (`-nd`), "made" (`-de`), "said" (`-id`), "held" (`-ld`). These are false negatives — passive voice sentences using these words are not detected.
- **Status**: Documented, not fixed. Expanding the regex suffix list risks false positives and would need careful calibration.

## Turnitin Parity Coverage

| # | Feature | Status | Test IDs |
|---|---------|--------|----------|
| 1 | Similarity detection | Covered | IC-001-010, IC-100-105, IC-146-150, IC-205, IC-235, IC-240 |
| 2 | AI writing detection | Covered | IC-011-021, IC-088-097, IC-120-145, IC-206, IC-236 |
| 3 | Similarity score with breakdown | Covered | IC-080-084, IC-207, IC-237 |
| 4 | Highlighted text (per-paragraph) | Covered (type contracts) | IC-202 |
| 5 | Source list with URLs | Covered | IC-207, IC-237 |
| 6 | Self-plagiarism | Covered | IC-054, IC-098-099, IC-194-196, IC-208 |
| 7 | Batch processing | Covered (type contracts) | IC-239 |
| 8 | PDF report | Covered (exports) | IC-045 |
| 9 | Paraphrase detection | Covered | IC-057-059, IC-240 |
| 10 | Predatory journal flagging | Covered | IC-036-041, IC-064-067, IC-106-109, IC-179-183, IC-209, IC-231, IC-241 |
| 11 | Retraction checking | Covered (type contracts) | IC-068, IC-204 |
| 12 | Grade-level readability | Covered | IC-070-073, IC-138-141, IC-210, IC-242 |
| 13 | Citation verification | Covered | IC-022-026, IC-110-113, IC-151-157, IC-184-190, IC-211, IC-243 |
| 14 | Humanize suggestions | Covered (type contracts) | IC-078-079 |
| 15 | Paraphrase API | Covered (type contracts) | IC-078-079 |
| 16 | Exclude quotes/bibliography | Covered | IC-043-044, IC-238 |
| 17 | Document history | Covered (type contracts) | IC-239 |

## Performance

- `checkPredatoryJournal`: 100 calls in < 100ms (IC-249)
- `computeTextStatistics`: < 50ms for 50-sentence text (IC-250)
- Full test suite: ~1 second for 250 tests

## Architecture Notes

- Tests are split across 8 files to avoid `vi.mock` hoisting pollution
- Orchestrator tests (`runner-orchestrator.test.ts`) isolated in separate file because `vi.mock` is hoisted to file scope
- Citation audit tests use `vi.stubGlobal("fetch")` to mock network calls
- All async imports use dynamic `import()` to ensure fresh module instances in tests with mocks
