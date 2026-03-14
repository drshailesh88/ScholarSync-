# ScholarSync QA Progress

Updated: 2026-03-14T14:55:09.294Z

## Overall

`[████████░░░░░░░░░░░░░░░░░░░░░░] 26.6%`

| Metric | Count |
|--------|-------|
| Total specs | 376 |
| Total checkpoints | 12804 |
| Pending | 270 |
| Pass 1 done | 100 |
| Pass 2 done | 0 |
| Blocked | 6 |

## Per Module

| Module | Specs | Done | Pending | Blocked | Checkpoints | Pass1 P/F/B |
|--------|-------|------|---------|---------|-------------|-------------|
| dashboard | 9 | 9 | 0 | 0 | 281 | 281/0/0 |
| onboarding | 7 | 6 | 1 | 0 | 242 | 210/0/0 |
| settings | 9 | 9 | 0 | 0 | 297 | 297/0/0 |
| projects | 9 | 0 | 9 | 0 | 305 | 0/0/0 |
| library | 11 | 0 | 11 | 0 | 380 | 0/0/0 |
| studio | 17 | 17 | 0 | 0 | 564 | 564/0/0 |
| editor | 38 | 38 | 0 | 0 | 1303 | 1267/0/0 |
| research | 18 | 18 | 0 | 0 | 598 | 598/0/0 |
| latex | 17 | 0 | 17 | 0 | 571 | 0/0/0 |
| notebook | 25 | 0 | 25 | 0 | 859 | 0/0/0 |
| compliance | 16 | 0 | 16 | 0 | 533 | 0/0/0 |
| analysis | 10 | 2 | 8 | 0 | 323 | 272/47/0 |
| deep-research | 15 | 0 | 9 | 6 | 525 | 279/246/0 |
| feeds | 19 | 1 | 18 | 0 | 658 | 439/219/0 |
| slides | 24 | 0 | 24 | 0 | 819 | 0/0/0 |
| slides-ai | 21 | 0 | 21 | 0 | 716 | 0/0/0 |
| poster | 15 | 0 | 15 | 0 | 509 | 0/0/0 |
| presentation | 27 | 0 | 27 | 0 | 937 | 0/0/0 |
| illustrate | 37 | 0 | 37 | 0 | 1284 | 0/0/0 |
| systematic-review | 32 | 0 | 32 | 0 | 1100 | 0/0/0 |

## Blocked Specs

| Spec | Module | Reason |
|------|--------|--------|
| deep-research.spec-001 | deep-research | Error: Unhandled deep-research checkpoint: cp-000 Title: "Deep Research" with Microscope icon (blue accent)

  82 |
  83 |     if (!handled) {
> 84 |       throw new Error('Unhandled deep-research checkpoint: cp-000 Title: "Deep Research" with Microscope icon (blue accent)');
     |             ^
  85 |     }
  86 |
  87 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-001.spec.ts:84:13; Error: Unhandled deep-research checkpoint: cp-001 Subtitle: "Multi-perspective literature synthesis"

  132 |
  133 |     if (!handled) {
> 134 |       throw new Error('Unhandled deep-research checkpoint: cp-001 Subtitle: "Multi-perspective literature synthesis"');
      |             ^
  135 |     }
  136 |
  137 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-001.spec.ts:134:13; Error: Unhandled deep-research checkpoint: cp-002 Sticky top positioning

  182 |
  183 |     if (!handled) {
> 184 |       throw new Error('Unhandled deep-research checkpoint: cp-002 Sticky top positioning');
      |             ^
  185 |     }
  186 |
  187 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-001.spec.ts:184:13 |
| deep-research.spec-002 | deep-research | Error: Unhandled deep-research checkpoint: cp-002 Expanded perspectives show search queries section

  182 |
  183 |     if (!handled) {
> 184 |       throw new Error('Unhandled deep-research checkpoint: cp-002 Expanded perspectives show search queries section');
      |             ^
  185 |     }
  186 |
  187 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-002.spec.ts:184:13; Error: Unhandled deep-research checkpoint: cp-003 Each perspective has 3–4 search queries by default

  232 |
  233 |     if (!handled) {
> 234 |       throw new Error('Unhandled deep-research checkpoint: cp-003 Each perspective has 3–4 search queries by default');
      |             ^
  235 |     }
  236 |
  237 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-002.spec.ts:234:13; Error: Unhandled deep-research checkpoint: cp-004 Query text displayed in editable input fields

  282 |
  283 |     if (!handled) {
> 284 |       throw new Error('Unhandled deep-research checkpoint: cp-004 Query text displayed in editable input fields');
      |             ^
  285 |     }
  286 |
  287 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-002.spec.ts:284:13 |
| deep-research.spec-003 | deep-research | Error: Unhandled deep-research checkpoint: cp-000 Unordered lists with custom bullet styling

  82 |
  83 |     if (!handled) {
> 84 |       throw new Error('Unhandled deep-research checkpoint: cp-000 Unordered lists with custom bullet styling');
     |             ^
  85 |     }
  86 |
  87 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-003.spec.ts:84:13; Error: Unhandled deep-research checkpoint: cp-001 Ordered lists with numbered items

  132 |
  133 |     if (!handled) {
> 134 |       throw new Error('Unhandled deep-research checkpoint: cp-001 Ordered lists with numbered items');
      |             ^
  135 |     }
  136 |
  137 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-003.spec.ts:134:13; Error: Unhandled deep-research checkpoint: cp-007 Bold and italic formatting

  432 |
  433 |     if (!handled) {
> 434 |       throw new Error('Unhandled deep-research checkpoint: cp-007 Bold and italic formatting');
      |             ^
  435 |     }
  436 |
  437 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-003.spec.ts:434:13 |
| deep-research.spec-004 | deep-research | Error: Unhandled deep-research checkpoint: cp-001 Click citation entry to navigate in report

  132 |
  133 |     if (!handled) {
> 134 |       throw new Error('Unhandled deep-research checkpoint: cp-001 Click citation entry to navigate in report');
      |             ^
  135 |     }
  136 |
  137 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-004.spec.ts:134:13; Error: Unhandled deep-research checkpoint: cp-002 Auto-scroll to highlighted citation

  182 |
  183 |     if (!handled) {
> 184 |       throw new Error('Unhandled deep-research checkpoint: cp-002 Auto-scroll to highlighted citation');
      |             ^
  185 |     }
  186 |
  187 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-004.spec.ts:184:13; Error: Unhandled deep-research checkpoint: cp-003 Citation-panel rows do not render DOI, PubMed, PDF, or OA links inline

  232 |
  233 |     if (!handled) {
> 234 |       throw new Error('Unhandled deep-research checkpoint: cp-003 Citation-panel rows do not render DOI, PubMed, PDF, or OA links inline');
      |             ^
  235 |     }
  236 |
  237 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-004.spec.ts:234:13 |
| deep-research.spec-005 | deep-research | Error: Unhandled deep-research checkpoint: cp-000 Headings: font-size (24–14px), font-weight, margins

  82 |
  83 |     if (!handled) {
> 84 |       throw new Error('Unhandled deep-research checkpoint: cp-000 Headings: font-size (24–14px), font-weight, margins');
     |             ^
  85 |     }
  86 |
  87 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-005.spec.ts:84:13; Error: Unhandled deep-research checkpoint: cp-001 Paragraphs: line-height 1.6, color #333

  132 |
  133 |     if (!handled) {
> 134 |       throw new Error('Unhandled deep-research checkpoint: cp-001 Paragraphs: line-height 1.6, color #333');
      |             ^
  135 |     }
  136 |
  137 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-005.spec.ts:134:13; Error: Unhandled deep-research checkpoint: cp-003 Blockquotes: 3px left border (#ccc), italic

  232 |
  233 |     if (!handled) {
> 234 |       throw new Error('Unhandled deep-research checkpoint: cp-003 Blockquotes: 3px left border (#ccc), italic');
      |             ^
  235 |     }
  236 |
  237 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-005.spec.ts:234:13 |
| deep-research.spec-006 | deep-research | Error: Unhandled deep-research checkpoint: cp-000 Backward references fetched via S2 API

  82 |
  83 |     if (!handled) {
> 84 |       throw new Error('Unhandled deep-research checkpoint: cp-000 Backward references fetched via S2 API');
     |             ^
  85 |     }
  86 |
  87 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-006.spec.ts:84:13; Error: Unhandled deep-research checkpoint: cp-001 Rate-limited with delays between requests

  132 |
  133 |     if (!handled) {
> 134 |       throw new Error('Unhandled deep-research checkpoint: cp-001 Rate-limited with delays between requests');
      |             ^
  135 |     }
  136 |
  137 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-006.spec.ts:134:13; Error: Unhandled deep-research checkpoint: cp-002 Converts S2 format to unified result format

  182 |
  183 |     if (!handled) {
> 184 |       throw new Error('Unhandled deep-research checkpoint: cp-002 Converts S2 format to unified result format');
      |             ^
  185 |     }
  186 |
  187 |
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-006.spec.ts:184:13 |
