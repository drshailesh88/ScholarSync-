# GAP-005: Notebook — Cross-Source Answer Does Not Render Reliably

## Problem
The Notebook source rail and action affordances are strong, but a benchmark cross-source question did not produce a visible answer within the test window.

## Evidence
- Quality Assessment Module 6
- Screenshot: `e2e/quality-assessment/notebook/02-response.png`
- Score impact: D1 = 2/5, D3 = 2/5, D4 = 2/5

## Root Cause (Investigate)
- Request/response flow in [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/notebook/page.tsx)
- API behavior in [route.ts](/Users/shaileshsingh/ScholarSync/src/app/api/rag-chat/route.ts)
- Rendering/state update for message completion and citation display

## Acceptance Criteria
- AC-1: A cross-source question returns a visible answer with citations in under 10 seconds for seeded notebooks.
- AC-2: The UI shows clear loading state while generation is in flight.
- AC-3: If generation fails, the user sees a specific error and retry affordance.
- AC-4: Citation/source attribution is visible in the returned answer.

## Files Likely Involved
- [page.tsx](/Users/shaileshsingh/ScholarSync/src/app/(app)/notebook/page.tsx)
- [route.ts](/Users/shaileshsingh/ScholarSync/src/app/api/rag-chat/route.ts)
- [SourceNotesPanel.tsx](/Users/shaileshsingh/ScholarSync/src/components/notebook/SourceNotesPanel.tsx)
- [AudioOverviewPanel.tsx](/Users/shaileshsingh/ScholarSync/src/components/notebook/AudioOverviewPanel.tsx)

## Effort Estimate
Medium (M)

## Verification
```bash
agent-browser --session qa open http://127.0.0.1:3000/notebook
# Ask a seeded cross-source question
# Expect answer + citations + loading state + failure handling
```

