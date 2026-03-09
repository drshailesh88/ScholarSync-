# GAP-004: Integrity — Pasted-Text Check Does Not Reach Results

## Problem
The primary pasted-text integrity workflow did not complete during QA. I was not able to reach a reliable result state with similarity / AI detection output.

## Evidence
- Quality Assessment Module 5
- Screenshot: `e2e/quality-assessment/integrity/02-stalled-run.png`
- Score impact: D1 = 1/5, D3 = 1/5, D4 = 1/5

## Root Cause (Investigate)
- Page interaction/state path in [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/compliance/page.tsx)
- Integrity orchestration across [index.ts](/Users/shaileshsingh/ScholarSync/src/lib/integrity/index.ts), [plagiarism-engine.ts](/Users/shaileshsingh/ScholarSync/src/lib/integrity/plagiarism-engine.ts), and [ai-detection.ts](/Users/shaileshsingh/ScholarSync/src/lib/integrity/ai-detection.ts)

## Acceptance Criteria
- AC-1: Pasting text and clicking `Run Integrity Check` returns a result or explicit failure state in under 10 seconds.
- AC-2: The UI shows similarity and AI-detection output when successful.
- AC-3: The UI never silently stalls.
- AC-4: The user can retry a failed check without reloading the page.

## Files Likely Involved
- [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/compliance/page.tsx)
- [index.ts](/Users/shaileshsingh/ScholarSync/src/lib/integrity/index.ts)
- [plagiarism-engine.ts](/Users/shaileshsingh/ScholarSync/src/lib/integrity/plagiarism-engine.ts)
- [ai-detection.ts](/Users/shaileshsingh/ScholarSync/src/lib/integrity/ai-detection.ts)

## Effort Estimate
Medium (M)

## Verification
```bash
agent-browser --session qa open http://127.0.0.1:3000/compliance
# Paste text and run the check
# Expect results or actionable error in <10s
```

