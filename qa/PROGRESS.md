# ScholarSync QA Progress

Updated: 2026-03-16T11:14:47.478Z

## Overall

`[█████████████████████░░░░░░░░░] 71.3%`

| Metric | Count |
|--------|-------|
| Total specs | 376 |
| Total checkpoints | 12804 |
| Pending | 107 |
| Pass 1 done | 268 |
| Pass 2 done | 0 |
| Blocked | 1 |

## Per Module

| Module | Specs | Done | Pending | Blocked | Checkpoints | Pass1 P/F/B |
|--------|-------|------|---------|---------|-------------|-------------|
| dashboard | 9 | 9 | 0 | 0 | 281 | 278/3/0 |
| onboarding | 7 | 7 | 0 | 0 | 242 | 242/0/0 |
| settings | 9 | 9 | 0 | 0 | 297 | 297/0/0 |
| projects | 9 | 9 | 0 | 0 | 305 | 305/0/0 |
| library | 11 | 11 | 0 | 0 | 380 | 378/2/0 |
| studio | 17 | 17 | 0 | 0 | 564 | 564/0/0 |
| editor | 38 | 38 | 0 | 0 | 1303 | 1264/3/0 |
| research | 18 | 18 | 0 | 0 | 598 | 598/0/0 |
| latex | 17 | 17 | 0 | 0 | 571 | 571/0/0 |
| notebook | 25 | 25 | 0 | 0 | 859 | 857/2/0 |
| compliance | 16 | 15 | 0 | 1 | 533 | 529/4/0 |
| analysis | 10 | 8 | 2 | 0 | 323 | 313/6/0 |
| deep-research | 15 | 3 | 12 | 0 | 525 | 173/2/0 |
| feeds | 19 | 19 | 0 | 0 | 658 | 658/0/0 |
| slides | 24 | 0 | 24 | 0 | 819 | 0/0/0 |
| slides-ai | 21 | 0 | 21 | 0 | 716 | 0/0/0 |
| poster | 15 | 13 | 2 | 0 | 509 | 491/18/0 |
| presentation | 27 | 27 | 0 | 0 | 937 | 937/0/0 |
| illustrate | 37 | 23 | 14 | 0 | 1284 | 1257/27/0 |
| systematic-review | 32 | 0 | 32 | 0 | 1100 | 0/0/0 |

## Blocked Specs

| Spec | Module | Reason |
|------|--------|--------|
| compliance.spec-014 | compliance | TimeoutError: page.goto: Timeout 45000ms exceeded.
Call log:
[2m  - navigating to "http://127.0.0.1:3001/compliance", waiting until "domcontentloaded"[22m


  52 |
  53 |     // Navigate to the page
> 54 |     await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
     |                ^
  55 |     await page.waitForLoadState('networkidle').catch(() => {});
  56 |
  57 |     // Take a screenshot as proof of page load
    at /home/user/ScholarSync-/qa/generated/compliance/spec-014.spec.ts:54:16; TimeoutError: page.goto: Timeout 45000ms exceeded.
Call log:
[2m  - navigating to "http://127.0.0.1:3001/compliance", waiting until "domcontentloaded"[22m


  102 |
  103 |     // Navigate to the page
> 104 |     await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
      |                ^
  105 |     await page.waitForLoadState('networkidle').catch(() => {});
  106 |
  107 |     // Take a screenshot as proof of page load
    at /home/user/ScholarSync-/qa/generated/compliance/spec-014.spec.ts:104:16 |
