# GAP-002: Studio — Citation Insertion Does Not Complete Reliably

## Problem
Manual reference creation in Studio succeeds, but the actual in-text citation insertion did not complete during QA. The dialog remained active and no citation appeared in the document.

## Evidence
- Quality Assessment Module 1
- Screenshot: `e2e/quality-assessment/studio/02-after-interactions.png`
- Score impact: D3 = 2/5, D4 = 2/5

## Root Cause (Investigate)
- Dialog state management in [citation-dialog.tsx](/Users/shaileshsingh/ScholarSync/src/components/citations/citation-dialog.tsx)
- Selection insertion path in [citation-plugin.ts](/Users/shaileshsingh/ScholarSync/src/components/editor/extensions/citation-plugin.ts)
- Studio page/editor integration in [AcademicEditor.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/AcademicEditor.tsx) and [tiptap-editor.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/tiptap-editor.tsx)

## Acceptance Criteria
- AC-1: Saving a manual reference and clicking insert adds an in-text citation at the current cursor location.
- AC-2: The bibliography/reference list updates automatically after insertion.
- AC-3: The user sees clear success feedback after citation insertion.
- AC-4: The full flow completes in under 3 seconds after the reference is selected.

## Files Likely Involved
- [citation-dialog.tsx](/Users/shaileshsingh/ScholarSync/src/components/citations/citation-dialog.tsx)
- [citation-plugin.ts](/Users/shaileshsingh/ScholarSync/src/components/editor/extensions/citation-plugin.ts)
- [AcademicEditor.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/AcademicEditor.tsx)
- [tiptap-editor.tsx](/Users/shaileshsingh/ScholarSync/src/components/editor/tiptap-editor.tsx)

## Effort Estimate
Medium (M)

## Verification
```bash
agent-browser --session qa open http://127.0.0.1:3000/studio
# Create manual reference and insert it
# Expect in-text citation + updated reference list + success feedback
```

