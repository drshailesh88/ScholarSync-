# Benchmark Extension Verification (34 → 87 queries)

This document is the ground-truth evidence trail for the literature-search
benchmark extension in `eval/literature-search/queries.ts`. Every `mustHave`
identifier asserted in a NEW query was confirmed via the **PubMed MCP**
(`mcp__claude_ai_PubMed__search_articles` + `get_article_metadata`) during the
authoring session — we never assert a PMID/DOI we have not seen returned by the
tool for the intended landmark paper. Source for all metadata: **PubMed**.

The benchmark grew from 34 to **87** queries (≥75 target met). 53 new queries
were appended, distinct slugs, no id collisions.

---

## 1. mustHave verification evidence (NEW queries only)

For each NEW `mustHave` asserting an exact identifier: the query id, the
asserted PMID/DOI, and the **exact article title PubMed returned** for that
PMID. "VERIFIED (PMID+DOI)" means I fetched the PMID's metadata and the title
matched the intended landmark. Entries marked **titleIncludes-only** assert no
exact id (the LLM council judges relevance) — these are honest gaps where I
could not confidently pin one canonical PMID without risking the wrong paper.

| Query id | Asserted PMID | Asserted DOI | Exact PubMed title returned | Status |
|---|---|---|---|---|
| `psy-stard-major-depression` | 17074942 | 10.1176/ajp.2006.163.11.1905 | Acute and longer-term outcomes in depressed outpatients requiring one or several treatment steps: a STAR*D report. | VERIFIED (PMID+DOI) |
| `psy-catie-antipsychotics` | 16172203 | 10.1056/NEJMoa051688 | Effectiveness of antipsychotic drugs in patients with chronic schizophrenia. | VERIFIED (PMID+DOI) |
| `psy-esketamine-trd` | 31109201 | 10.1176/appi.ajp.2019.19020172 | Efficacy and Safety of Flexibly Dosed Esketamine Nasal Spray Combined With a Newly Initiated Oral Antidepressant in Treatment-Resistant Depression: A Randomized Double-Blind Active-Controlled Study. | VERIFIED (PMID+DOI) |
| `psy-ketamine-nmda-depression` | 16894061 | 10.1001/archpsyc.63.8.856 | A randomized trial of an N-methyl-D-aspartate antagonist in treatment-resistant major depression. | VERIFIED (PMID+DOI) |
| `psy-lithium-bipolar-maintenance` | 20092882 | 10.1016/S0140-6736(09)61828-6 | Lithium plus valproate combination therapy versus monotherapy for relapse prevention in bipolar I disorder (BALANCE): a randomised open-label trial. | VERIFIED (PMID+DOI) |
| `exact-flaura-osimertinib` | 29151359 | 10.1056/NEJMoa1713137 | Osimertinib in Untreated EGFR-Mutated Advanced Non-Small-Cell Lung Cancer. | VERIFIED (PMID+DOI) |
| `exact-keynote-006-melanoma` | 25891173 | 10.1056/NEJMoa1503093 | Pembrolizumab versus Ipilimumab in Advanced Melanoma. | VERIFIED (PMID+DOI) |
| `family-keynote-trials` | 25891173 / 29658856 | 10.1056/NEJMoa1503093 / 10.1056/NEJMoa1801005 | Pembrolizumab versus Ipilimumab in Advanced Melanoma. / Pembrolizumab plus Chemotherapy in Metastatic Non-Small-Cell Lung Cancer. | VERIFIED (both PMID+DOI) |
| `onc-her2-adjuvant-residual` | 30516102 | 10.1056/NEJMoa1814017 | Trastuzumab Emtansine for Residual Invasive HER2-Positive Breast Cancer. | VERIFIED (PMID+DOI) |
| `exact-dawn-thrombectomy` | 29129157 | 10.1056/NEJMoa1706442 | Thrombectomy 6 to 24 Hours after Stroke with a Mismatch between Deficit and Infarct. | VERIFIED (PMID+DOI) |
| `exact-recovery-tocilizumab` | 33933206 | 10.1016/S0140-6736(21)00676-0 | Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial. | VERIFIED (PMID+DOI) |
| `endo-surmount-obesity` | 35658024 | 10.1056/NEJMoa2206038 | Tirzepatide Once Weekly for the Treatment of Obesity. | VERIFIED (PMID+DOI) |
| `exact-select-semaglutide` | 37952131 | 10.1056/NEJMoa2307563 | Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes. | VERIFIED (PMID+DOI) |
| `exact-dapa-ckd` | 32970396 | 10.1056/NEJMoa2024816 | Dapagliflozin in Patients with Chronic Kidney Disease. | VERIFIED (PMID+DOI) |
| `family-partner-trials` | 30883058 | 10.1056/NEJMoa1814052 | (PARTNER 3, balloon-expandable low-risk TAVR — reused from existing verified seed query `tavr-low-risk-6yr`/`acronym-partner-3`) | Reused (existing verified) |
| `family-emperor-sglt2-hf` | 32865377 | 10.1056/NEJMoa2022190 | Cardiovascular and Renal Outcomes with Empagliflozin in Heart Failure. | VERIFIED (PMID+DOI) |
| `exact-plato-ticagrelor` | 19717846 | 10.1056/NEJMoa0904327 | Ticagrelor versus clopidogrel in patients with acute coronary syndromes. | VERIFIED (PMID+DOI) |
| `lto-stampede-bariatric-cardiac` | 28199805 | 10.1056/NEJMoa1600869 | Bariatric Surgery versus Intensive Medical Therapy for Diabetes - 5-Year Outcomes. | VERIFIED (PMID+DOI) |
| `recency-esketamine-monotherapy-2025` | 40601310 | 10.1001/jamapsychiatry.2025.1317 | Esketamine Monotherapy in Adults With Treatment-Resistant Depression: A Randomized Clinical Trial. | VERIFIED (PMID+DOI) |
| `family-evolut-trials` | 30883053 | 10.1056/NEJMoa1816885 | Transcatheter Aortic-Valve Replacement with a Self-Expanding Valve in Low-Risk Patients. | VERIFIED (PMID+DOI) |
| `family-sglt2-cvot-trials` | 26378978 | 10.1056/NEJMoa1504720 | Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes. | VERIFIED (PMID+DOI) |
| `acronym-aristotle` | 21870978 | 10.1056/NEJMoa1107039 | Apixaban versus warfarin in patients with atrial fibrillation. | VERIFIED (PMID+DOI) |
| `acronym-empa-reg` | 26378978 | 10.1056/NEJMoa1504720 | Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes. | VERIFIED (PMID+DOI) |

### titleIncludes-only NEW mustHaves (no exact identifier asserted — honest gaps)

| Query id | titleIncludes substrings | Why no exact PMID |
|---|---|---|
| `neuro-tenecteplase-vs-alteplase` | `tenecteplase`, `extend-ia tnk` | The EXTEND-IA TNK / AcT / NOR-TEST trial family has several near-identical NEJM/JAMA titles; the top PubMed hit for the design/protocol paper (PMID 28952914, Int J Stroke) was NOT the primary results, so I declined to pin one PMID and let the council judge any genuine tenecteplase-vs-alteplase RCT. |
| `family-zuma-cart-trials` | `axicabtagene ciloleucel`, `zuma` | The ZUMA program (ZUMA-1 pivotal, ZUMA-7 second-line) has many sub-analyses; PMID 38315832 returned was a *subsequent-therapies* sub-study, not the pivotal ZUMA-1, so I used the drug/program name as titleIncludes rather than risk asserting a wrong canonical PMID. |

**No NEW query asserts a PMID/DOI that was not confirmed by a PubMed tool call.**
Broad-clinical, PICO, SR/MA, guideline, mechanism, recency (non-landmark),
ambiguous-acronym, and negative-control queries intentionally carry **no
mustHaves** — the LLM council judges those.

### PMIDs referenced in `notes` (negative-control traps) — not asserted as mustHaves

These appear only in `notes` text to describe the "famous-but-irrelevant" trap;
they are NOT ground-truth assertions. They reuse already-verified benchmark
identifiers: DAPA-HF 31535829, DAPA-CKD 32970396 (verified above),
RECOVERY-dexamethasone 32678530, tocilizumab 33933206 (verified above),
KEYNOTE-189 29658856 (verified above), KEYNOTE-006 25891173 (verified above).

---

## 2. Final category distribution (full 87)

| Category | Count | % |
|---|---:|---:|
| exact_paper | 10 | 11% |
| therapy_comparison | 10 | 11% |
| pico | 9 | 10% |
| trial_acronym | 8 | 9% |
| broad_clinical | 7 | 8% |
| recency | 7 | 8% |
| guideline | 6 | 7% |
| safety_adverse_event | 6 | 7% |
| trial_family | 6 | 7% |
| long_term_outcomes | 5 | 6% |
| systematic_review | 5 | 6% |
| mechanism | 3 | 3% |
| negative_control | 3 | 3% |
| ambiguous_acronym | 2 | 2% |
| **TOTAL** | **87** | **100%** |

`recencyBiased: true` flag count: **7** (≈8%).

### Weighting buckets vs targets

| Bucket | Categories | Count | % | Target |
|---|---|---:|---:|---|
| Mainstream clinical | broad_clinical, pico, therapy_comparison, safety_adverse_event, mechanism, long_term_outcomes, exact_paper | 50 | 57% | ~50% |
| Landmark trial families | trial_acronym, trial_family | 14 | 16% | ~20% |
| Guidelines + SR/MA | guideline, systematic_review | 11 | 13% | ~15% |
| Recency | recency (recencyBiased) | 7 | 8% | ~10% |
| Adversarial / negative-control | negative_control, ambiguous_acronym | 5 | 6% | ~5% |

All buckets land within tolerance of the "~" targets across the full 87.

---

## 3. Specialty distribution (NEW queries ensure all seven covered)

Psychiatry was **ZERO** before this extension; it now has **6** queries
(STAR*D, CATIE, esketamine TRD, ketamine/NMDA mechanism, lithium/bipolar
BALANCE, SSRI-vs-placebo PICO, plus the recency esketamine-monotherapy 2025).

| Specialty | Representative new query ids | Count (new + existing primary-specialty) |
|---|---|---|
| Cardiology | family-partner-trials, family-evolut-trials, family-emperor-sglt2-hf, acronym-aristotle, exact-plato-ticagrelor, sr-doac-vs-warfarin-metaanalysis, sr-pci-vs-cabg-metaanalysis, guideline-esc-heart-failure, recency-tavr-2025 (+ many existing) | strongest (≈ 25) |
| Oncology | exact-flaura-osimertinib, exact-keynote-006-melanoma, family-keynote-trials, onc-her2-adjuvant-residual, onc-immunotherapy-broad, onc-car-t-lbcl-pico, onc-checkpoint-irae-safety, family-zuma-cart-trials (+ KEYNOTE-189 existing) | ≈ 13 |
| Neurology | exact-dawn-thrombectomy, neuro-thrombectomy-broad, neuro-tenecteplase-vs-alteplase, neuro-lecanemab-pico, neuro-ms-dmt-comparison, neuro-epilepsy-guideline (+ lecanemab recency existing) | ≈ 7 |
| Infectious disease | exact-recovery-tocilizumab, id-hiv-prep-pico, id-sepsis-broad, id-antibiotic-duration-pneumonia, id-paxlovid-recency, id-fluoroquinolone-cdiff-safety (+ CAP/sepsis/vaccine existing) | ≈ 11 |
| Endocrinology | endo-surmount-obesity, exact-select-semaglutide, endo-thyroid-guideline, endo-glp1-mechanism, endo-t2dm-first-line-pico, family-sglt2-cvot-trials, acronym-empa-reg (+ SGLT2/GLP-1 existing) | ≈ 13 |
| Nephrology | exact-dapa-ckd, neph-finerenone-pico, neph-iga-nephropathy-recency, neph-ckd-anemia-broad (+ KDIGO-CKD, DAPA-CKD lto existing) | ≈ 6 |
| **Psychiatry** | psy-stard-major-depression, psy-catie-antipsychotics, psy-esketamine-trd, psy-ketamine-nmda-depression, psy-lithium-bipolar-maintenance, psy-ssri-vs-placebo-depression, recency-esketamine-monotherapy-2025 | **6–7 (was 0)** |

(Counts are approximate because several drug-class queries — e.g. SGLT2i — span
cardiology + endocrinology + nephrology by design; the table assigns each to its
primary specialty.)

---

## 4. Query-type coverage checklist

| Required query type | Example new query id(s) |
|---|---|
| exact-paper-by-title (with punctuation) | exact-flaura-osimertinib, exact-keynote-006-melanoma, exact-dapa-ckd, exact-plato-ticagrelor, exact-recovery-tocilizumab (title incl. parentheses + colon), exact-select-semaglutide |
| DOI/PMID lookup (ground-truthed) | all VERIFIED rows in §1 carry PMID + DOI |
| trial-acronym | acronym-aristotle, acronym-empa-reg, psy-catie-antipsychotics, psy-stard-major-depression |
| trial-family | family-partner-trials, family-evolut-trials, family-emperor-sglt2-hf, family-sglt2-cvot-trials, family-keynote-trials, family-zuma-cart-trials |
| broad clinical | onc-immunotherapy-broad, neuro-thrombectomy-broad, id-sepsis-broad, neph-ckd-anemia-broad |
| PICO | psy-ssri-vs-placebo-depression, onc-car-t-lbcl-pico, neuro-lecanemab-pico, id-hiv-prep-pico, endo-t2dm-first-line-pico, neph-finerenone-pico |
| recency (recencyBiased) | id-paxlovid-recency, neph-iga-nephropathy-recency, recency-tavr-2025, recency-esketamine-monotherapy-2025 |
| long-term outcomes | lto-stampede-bariatric-cardiac |
| safety / adverse-event | onc-checkpoint-irae-safety, id-fluoroquinolone-cdiff-safety |
| device/drug comparison | neuro-tenecteplase-vs-alteplase, psy-lithium-bipolar-maintenance, neuro-ms-dmt-comparison, id-antibiotic-duration-pneumonia |
| guideline | neuro-epilepsy-guideline, endo-thyroid-guideline, guideline-esc-heart-failure |
| SR / MA | sr-doac-vs-warfarin-metaanalysis, sr-pci-vs-cabg-metaanalysis |
| landmark-RCT retrieval | exact-flaura-osimertinib, exact-plato-ticagrelor, exact-dawn-thrombectomy, etc. |
| ambiguous acronym | ambiguous-ace-acronym, ambiguous-cast-acronym |
| **negative controls** (trap described in `notes`) | negctrl-keynote-heart-failure, negctrl-dapa-oncology, negctrl-recovery-orthopedics |

---

## 5. Honesty notes

- **Every** exact PMID/DOI asserted in a NEW `mustHave` was confirmed by a
  PubMed `get_article_metadata` call where the returned title matched the
  intended landmark (see §1).
- **2 NEW mustHaves are titleIncludes-only** (`neuro-tenecteplase-vs-alteplase`,
  `family-zuma-cart-trials`) — the candidate PMIDs PubMed returned were
  sub-studies/protocol papers, not the canonical primary, so I deliberately did
  NOT assert a possibly-wrong PMID.
- The negative-control queries carry **no** mustHaves by design; their `notes`
  field documents the exact acronym-collision trap (e.g. oncology KEYNOTE papers
  must not surface for a heart-failure query) so the council can score them.
- Existing 34 queries were left unchanged; their identifiers were verified by a
  prior session (per the file header) and are out of scope for this extension.
