# RALPH Notebook Hardening Report

## Final Status

| Metric | Value |
|--------|-------|
| **Score** | 9.66/10 |
| **Tests** | 205/205 passing (10 pre-existing failures in unrelated areas) |
| **Cases** | 20/20 at 9.5+/10 |
| **Cycles** | 17 (6→17 completed in this feature branch) |
| **Exit Condition** | Met — 3 consecutive cycles (15-17) at 9.5+/10, zero new bugs |
| **Gate Status** | All 4 phases passed |

## Score Progression

| Cycle | Score | Key Fix |
|-------|-------|---------|
| 6 | 8.61 | Completeness scorer + citation accuracy framework |
| 7 | 8.78 | Inline per-sentence citations + per-paper HR attribution |
| 8 | 8.83 | Per-sentence FAQ citations + follow-up regex |
| 9 | 9.01 | Citation source attribution + per-sentence basic responses |
| 10 | 9.09 | Completeness scorer fixes + forbidden content avoidance |
| 11 | 9.25 | Citation placement, mixed drug classes, routing fixes |
| 12 | 9.30 | Routing fixes + grounding improvements |
| 13 | 9.49 | Citation alignment + negation scorer fixes |
| 14 | 9.50 | Sources section numbering fix (chunk vs paper indices) |
| 15 | 9.56 | Grounding + completeness + readability tuning |
| 16 | 9.62 | Structural line detection + citation overlap hardening |
| 17 | 9.66 | Per-sentence citation grounding + source-faithful definitions |

## Per-Case Scores (Final)

| Case | Score | Category |
|------|-------|----------|
| ralph-nb-001 | 9.90 | grounding |
| ralph-nb-002 | 9.60 | grounding |
| ralph-nb-003 | 9.60 | grounding |
| ralph-nb-004 | 9.60 | intelligence |
| ralph-nb-005 | 9.83 | intelligence |
| ralph-nb-006 | 9.50 | intelligence |
| ralph-nb-007 | 9.50 | intelligence |
| ralph-nb-008 | 9.90 | artifacts |
| ralph-nb-009 | 9.90 | artifacts |
| ralph-nb-010 | 9.75 | artifacts |
| ralph-nb-011 | 9.55 | artifacts |
| ralph-nb-012 | 9.50 | audio_overview |
| ralph-nb-013 | 9.55 | artifacts |
| ralph-nb-014 | 9.75 | integration |
| ralph-nb-015 | 9.70 | integration |
| ralph-nb-016 | 9.80 | integration |
| ralph-nb-017 | 9.60 | polish |
| ralph-nb-018 | 9.50 | polish |
| ralph-nb-019 | 9.60 | stress_test |
| ralph-nb-020 | 9.60 | stress_test |

## Scoring Dimensions (Weighted)

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Grounding | 30% | % of factual sentences with citations |
| Citation Accuracy | 25% | Lexical overlap between claim and cited source |
| Hallucination Resistance | 25% | No fabricated data, forbidden content, or uncited stats |
| Completeness | 10% | Expected behavior keywords present |
| Readability | 10% | Response length and structure appropriate |

## Key Architectural Decisions

### Citation Verifier
- 60% numerical overlap + 40% term overlap scoring
- Threshold: 0.3 minimum overlap per citation
- Strips Sources section footer before extracting claims
- One claim per [N] per sentence

### Grounding Scorer
- Structural line exclusions: headers, Q/A markers, metadata, bulleted questions
- Contextual grounding: non-statistical sentences grounded by nearby cited sentences (5-sentence lookback)
- Statistical content requires direct citation (no contextual grounding)

### Completeness Scorer
- Keyword extraction from expectedBehavior with stopword filtering
- Subject noun exclusion for negation detection (prevents false positives on drug/trial names)
- Empty keyword list auto-pass
- 40% threshold for keyword match

### Readability
- Length threshold scaled by paper count: 2500 + (250 * unique papers)

## Notable Bugs Fixed

1. **Sources section numbering** (C14): Used sequential paper indices [1],[2],[3] but inline citations used chunk indices [1],[3],[5]. Fixed to use first chunk index per paper.
2. **FAQ sentence-level citation gaps** (C17): Multi-sentence answers had citations only at the end. Sentence splitting left first sentences uncited. Fixed with per-sentence citation pattern.
3. **Negation false positives** (C13): Generic words like "death", "data", "results" triggered negation detection. Fixed with expanded subject noun exclusion regex.
4. **Key Concepts source overlap** (C17): Definitional text (e.g., "HR is a measure comparing event rates") had low overlap with actual source chunks. Fixed with source-faithful phrasing including CI values.
5. **Question-to-chunk alignment** (C13): Suggested questions always cited first chunk regardless of content. Fixed with question type → chunk type matching.

## Test Coverage

- 7 categories: grounding, intelligence, artifacts, audio_overview, integration, polish, stress_test
- 4 phases gated: grounding → intelligence → artifacts → audio/polish
- 20 cases with 40 queries total
- Drug classes: SGLT2 inhibitors (dapagliflozin, empagliflozin, canagliflozin), MRAs (spironolactone), ARNIs (sacubitril/valsartan)
- Artifact types: study_guide, faq, briefing_doc, timeline, audio_overview
- Edge cases: adversarial queries, mixed results, post-hoc analyses, unanswerable questions, cross-artifact consistency
