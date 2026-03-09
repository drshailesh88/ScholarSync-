# GAP-006: Systematic Review — Empty-State Project Creation Is Blocked

## Problem
The first-run create modal for `/systematic-review` displayed a disabled `Create` button without visible project fields or guidance, blocking review setup from an empty state.

## Evidence
- Quality Assessment Module 8
- Screenshot: `e2e/quality-assessment/systematic-review/02-create-modal.png`
- Score impact: D4 = 1/5, D7 = 1/5

## Root Cause (Investigate)
- Empty-state create interaction in [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/systematic-review/page.tsx)
- Project bootstrap components like [ProjectHeader.tsx](/Users/shaileshsingh/ScholarSync/src/components/systematic-review/ProjectHeader.tsx) and [ProtocolPanel.tsx](/Users/shaileshsingh/ScholarSync/src/components/systematic-review/ProtocolPanel.tsx)

## Acceptance Criteria
- AC-1: Clicking `New Review` from the empty state exposes clear required fields.
- AC-2: The create CTA becomes enabled once the visible required fields are satisfied.
- AC-3: The user can create a new review project without guessing hidden requirements.
- AC-4: If creation fails, the modal explains why and how to recover.

## Files Likely Involved
- [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/systematic-review/page.tsx)
- [ProjectHeader.tsx](/Users/shaileshsingh/ScholarSync/src/components/systematic-review/ProjectHeader.tsx)
- [ProtocolPanel.tsx](/Users/shaileshsingh/ScholarSync/src/components/systematic-review/ProtocolPanel.tsx)

## Effort Estimate
Medium (M)

## Verification
```bash
agent-browser --session qa open http://127.0.0.1:3000/systematic-review
# Create a new review from the empty state
# Expect visible required fields and successful project creation
```

