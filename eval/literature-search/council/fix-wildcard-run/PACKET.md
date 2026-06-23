# LLM-Council comparison packet — Manan vs Elicit

Manan results are from run `fix-wildcard`. Elicit results are snapshots (benchmark only).

## Scoring rubric

You are comparing two literature-search systems on the SAME query:
- **Manan** (system under test) vs **Elicit** (the benchmark target).

Score EACH system 0–5 (5 = best) on these six dimensions:
1. **recall** — are the landmark/must-have papers present in the top 10?
2. **ranking** — is the best/most-relevant paper near the top; is the evidence hierarchy respected (SR/MA & RCT above case reports)?
3. **metadata** — DOI/PMID/year/journal completeness and correctness.
4. **clinical_relevance** — usefulness of the top 10 to a clinician/researcher; few irrelevant items.
5. **explanation** — would the result list be easy to trust/act on (clear identifiers, no junk)?
6. **trust** — reproducibility and absence of dubious/predatory/irrelevant entries.

Then pick a **winner** per query: "manan", "elicit", or "tie".

Use the must-have list as ground truth for landmark recall. Penalize missing landmark RCTs and irrelevant case reports in the top 10. Recency-tagged queries should favor newer high-quality evidence.

## Output format (STRICT)

Return ONLY a JSON object, no prose, of this shape:
{
  "perQuery": [
    {
      "id": "<query id>",
      "manan": {"recall":0-5,"ranking":0-5,"metadata":0-5,"clinical_relevance":0-5,"explanation":0-5,"trust":0-5},
      "elicit": {"recall":0-5,"ranking":0-5,"metadata":0-5,"clinical_relevance":0-5,"explanation":0-5,"trust":0-5},
      "winner": "manan" | "elicit" | "tie",
      "note": "<one sentence justification>"
    }
  ],
  "overall": {"winner":"manan"|"elicit"|"tie","summary":"<2-3 sentences>"}
}

---

## Query: `tavr-low-risk-6yr` — "TAVR low risk six year outcomes"
Category: long_term_outcomes. Intent: Long-term (≈6yr) outcomes of TAVR vs SAVR in low surgical risk aortic stenosis; the landmark RCTs and their longest follow-ups.

**Must-have landmark papers:**
- PARTNER 3 (Mack/Leon, NEJM 2019) — balloon-expandable, low risk
- Evolut Low Risk 6-year (Forrest, JACC 2026)

### Manan top 10
1. Short- and intermediate-term outcomes of transcatheter aortic valve replacement in low-risk patients: A meta-analysis and systematic review. — 2024, Int J Cardiol Heart Vasc [meta_analysis] (PMID:39045569 DOI:10.1016/j.ijcha.2024.101458)
2. Six-Year Outcomes After Transcatheter vs Surgical Aortic Valve Replacement in Low-Risk Patients With Aortic Stenosis. — 2026, J Am Coll Cardiol [rct] (PMID:41697183 DOI:10.1016/j.jacc.2026.02.5063)
3. TAVR in Low-Risk Patients: 1-Year Results From the LRT Trial. — 2019, JACC Cardiovasc Interv [rct] (PMID:30860059 DOI:10.1016/j.jcin.2019.03.002)
4. Transcatheter vs Surgical Aortic Valve Replacement in Lower-Risk Patients: An Updated Meta-Analysis of Randomized Controlled Trials. — 2025, J Am Coll Cardiol [meta_analysis] (PMID:40044297 DOI:10.1016/j.jacc.2024.12.031)
5. Three-Year Follow-Up of the NOTION-2 Trial: TAVR Versus SAVR to Treat Younger Low-Risk Patients With Tricuspid or Bicuspid Aortic Stenosis. — 2025, Circulation [rct] (PMID:40884768 DOI:10.1161/CIRCULATIONAHA.125.076678)
6. Minimally invasive surgery versus transcatheter aortic valve replacement: a systematic review and meta-analysis. — 2021, Open Heart [meta_analysis] (PMID:33455914 DOI:10.1136/openhrt-2020-001535)
7. Transcatheter aortic valve replacement in low-risk patients: an updated meta-analysis of randomized controlled trials. — 2025, Int J Cardiol Heart Vasc [meta_analysis] (PMID:40453067 DOI:10.1016/j.ijcha.2025.101692)
8. Updated 5-year outcomes of transcatheter versus surgical aortic valve replacement in patients with severe aortic stenosis at low- to intermediate-surgical risk. — 2026, Heart [meta_analysis] (PMID:41672766 DOI:10.1136/heartjnl-2025-327092)
9. Transcatheter Aortic-Valve Replacement in Low-Risk Patients at Five Years. — 2023, N Engl J Med [rct] (PMID:37874020 DOI:10.1056/NEJMoa2307447)
10. Transcatheter versus surgical aortic valve replacement in low- to intermediate-risk patients: a meta-analysis of reconstructed time-to-event data. — 2025, Ann Cardiothorac Surg [meta_analysis] (PMID:40270848 DOI:10.21037/acs-2024-etavr-0096)

### Elicit top 10
1. Transcatheter Aortic-Valve Replacement with a Balloon-Expandable Valve in Low-Risk Patients (PARTNER 3) — 2019, N Engl J Med (PMID:30883058 DOI:10.1056/NEJMoa1814052, 3610 cites)
2. Six-Year Outcomes After Transcatheter vs Surgical Aortic Valve Replacement in Low-Risk Patients (Evolut Low Risk 6-yr) — 2026, J Am Coll Cardiol (PMID:41697183 DOI:10.1016/j.jacc.2026.02.5063, 7 cites)
3. 1-Year Outcomes From the Low Risk TAVR (LRT) Study — 2018, Circulation (DOI:10.1161/circ.138.suppl_1.16816, 0 cites)
4. Review of Major Registries and Clinical Trials of Late Outcomes After TAVR — 2017, Am J Cardiol (PMID:28532778 DOI:10.1016/j.amjcard.2017.04.029, 9 cites)
5. Short- and intermediate-term outcomes of TAVR in low-risk patients: meta-analysis — 2024, Int J Cardiol Heart Vasc (PMID:39045569 DOI:10.1016/j.ijcha.2024.101458, 9 cites)
6. 2-Year Outcomes After Transcatheter Versus Surgical AVR in Low-Risk Patients (Evolut 2-yr) — 2022, J Am Coll Cardiol (PMID:35241222 DOI:10.1016/j.jacc.2021.11.062, 84 cites)
7. TAVR in Low-Risk Patients With Symptomatic Severe Aortic Stenosis (Waksman LRT) — 2018, J Am Coll Cardiol (PMID:30170075 DOI:10.1016/j.jacc.2018.08.1033, 194 cites)
8. Outcomes 2 Years After TAVR in Patients at Low Surgical Risk (PARTNER 3 2-yr) — 2021, J Am Coll Cardiol (PMID:33663731 DOI:10.1016/j.jacc.2020.12.052, 255 cites)
9. Long-Term Results TAVR vs SAVR in Low-Risk: Systematic Review and Meta-Analysis — 2024, Am J Cardiol (PMID:39173988 DOI:10.1016/j.amjcard.2024.08.014, 15 cites)
10. Transcatheter Versus Surgical AVR in Low-Risk Patients (Kolte meta) — 2019, J Am Coll Cardiol (PMID:31537261 DOI:10.1016/j.jacc.2019.06.076, 147 cites)

---

## Query: `exact-dapa-hf` — "Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction"
Category: exact_paper. Intent: Retrieve the exact DAPA-HF primary results paper by its title.

**Must-have landmark papers:**
- DAPA-HF (McMurray, NEJM 2019)

### Manan top 10
1. SGLT2 inhibitors in patients with heart failure with reduced ejection fraction: a meta-analysis of the EMPEROR-Reduced and DAPA-HF trials. — 2020, Lancet [meta_analysis] (PMID:32877652 DOI:10.1016/S0140-6736(20)31824-9)
2. Time to Clinical Benefit of Dapagliflozin and Significance of Prior Heart Failure Hospitalization in Patients With Heart Failure With Reduced Ejection Fraction. — 2021, JAMA Cardiol [rct] (PMID:33595593 DOI:10.1001/jamacardio.2020.7585)
3. Dapagliflozin Effects on Biomarkers, Symptoms, and Functional Status in Patients With Heart Failure With Reduced Ejection Fraction: The DEFINE-HF Trial. — 2019, Circulation [rct] (PMID:31524498 DOI:10.1161/CIRCULATIONAHA.119.042929)
4. Empagliflozin in Heart Failure with a Preserved Ejection Fraction — 2021, New England Journal of Medicine [rct] (PMID:34449189 DOI:10.1056/nejmoa2107038)
5. Effect of Dapagliflozin on Worsening Heart Failure and Cardiovascular Death in Patients With Heart Failure With and Without Diabetes — 2020, JAMA [rct] (PMID:32219386 DOI:10.1001/jama.2020.1906)
6. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction. — 2019, N Engl J Med [rct] (PMID:31535829 DOI:10.1056/NEJMoa1911303)
7. Cardiovascular and Renal Outcomes with Empagliflozin in Heart Failure — 2020, New England Journal of Medicine [rct] (PMID:32865377 DOI:10.1056/nejmoa2022190)
8. Dapagliflozin and Kidney Outcomes in Patients With Heart Failure With Mildly Reduced or Preserved Ejection Fraction: A Prespecified Analysis of the DELIVER Randomized Clinical Trial. — 2023, JAMA Cardiol [rct] (PMID:36326604 DOI:10.1001/jamacardio.2022.4210)
9. A Trial to Evaluate the Effect of the Sodium–Glucose Co-Transporter 2 Inhibitor Dapagliflozin on Morbidity and Mortality in Patients with Heart Failure and Reduced Left Ventricular Ejection Fraction (DAPA-HF) — 2019, European Journal of Heart Failure [rct] (PMID:30895697 DOI:10.1002/ejhf.1432)
10. Dapagliflozin in Heart Failure with Mildly Reduced or Preserved Ejection Fraction. — 2022, N Engl J Med [rct] (PMID:36027570 DOI:10.1056/NEJMoa2206286)

### Elicit top 10
1. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction (DAPA-HF) — 2019, N Engl J Med (PMID:31535829 DOI:10.1056/NEJMoa1911303, 4971 cites)
2. DAPA-HF trial: dapagliflozin evolves from a glucose-lowering agent to a therapy for heart failure — 2020, Drugs in Context (PMID:32165892 DOI:10.7573/dic.2019-11-3, 41 cites)
3. Evidence-based Appraisal of the DAPA-HF Trial — 2020, J Contemp Pharm Pract (DOI:10.37901/jcphp20-00011, 0 cites)

---

## Query: `recency-lecanemab` — "newest evidence on lecanemab for Alzheimer disease"
Category: recency. Intent: Recent lecanemab efficacy/safety evidence (CLARITY-AD and follow-ups).

**Must-have landmark papers:**
- CLARITY-AD lecanemab trial

### Manan top 10
1. Lecanemab Reduces Neuropsychiatric Symptoms and Related Regional Brain Amyloid Load in Early Alzheimer's Disease: A Preliminary Prospective Study. — 2026, CNS Neurosci Ther [cohort] (PMID:42277629 DOI:10.1002/cns.70974)
2. Quantitative AV-45 PET imaging for assessing treatment response to lecanemab and deep cervical lymphatic-venous anastomosis in Alzheimer's disease. — 2026, Nucl Med Commun [cohort] (PMID:42199075 DOI:10.1097/MNM.0000000000002184)
3. From clinical trial to clinical experience: Lecanemab therapy in a real-world case series. — 2026, Alzheimers Dement (Amst) [observational] (PMID:42255952 DOI:10.1002/dad2.70365)
4. Aging modulates amyloid clearance kinetics during anti-amyloid therapy: evidence from real-world serial amyloid PET. — 2026, Front Aging Neurosci [cohort] (PMID:42182561 DOI:10.3389/fnagi.2026.1801267)
5. Lecanemab and amyloid-related imaging abnormalities: Real-world data from a single center experience. — 2026, Alzheimers Dement (Amst) [observational] (PMID:42255953 DOI:10.1002/dad2.70377)
6. Evaluating emerging amyloid-&#x3b2; centric drugs for the treatment of Alzheimer's disease. — 2026, Expert Opin Emerg Drugs [review] (PMID:42322185 DOI:10.1080/14728214.2026.2693701)
7. [Advances in Anti-Dementia Therapies in Older Adults]. — 2026, Dtsch Med Wochenschr [review] (PMID:42214359 DOI:10.1055/a-2676-7649)
8. Baseline amyloid deposition phenotypes inform the spatial distribution of early amyloid clearance with lecanemab in Alzheimer's disease. — 2026, Eur J Nucl Med Mol Imaging [other] (PMID:42297931 DOI:10.1007/s00259-026-07989-x)
9. Lecanemab treatment modulates brain volume and cerebrospinal fluid pathways in early Alzheimer's disease: Insights from longitudinal magnetic resonance imaging. — 2026, Alzheimers Dement (Amst) [other] (PMID:42255966 DOI:10.1002/dad2.70348)
10. Lecanemab promotes Fc receptor-dependent cell-mediated internalization and degradation of aggregated amyloid-beta in vitro and ex vivo. — 2026, Neurosci Lett [other] (PMID:42214748 DOI:10.1016/j.neulet.2026.138645)

### Elicit top 10
1. Lecanemab in Early Alzheimer's Disease (CLARITY-AD) — 2022, N Engl J Med (PMID:36449413 DOI:10.1056/NEJMoa2212948, 3498 cites)
2. The effectiveness and value of lecanemab for early Alzheimer disease (ICER) — 2023, J Manag Care Spec Pharm (PMID:37610113 DOI:10.18553/jmcp.2023.29.9.1078, 27 cites)
3. Lecanemab clarity AD: results from a randomised, double-blind phase 3 trial (abstract) — 2023, ABN Annual Meeting (DOI:10.1136/jnnp-2023-abn.139, 1 cites)
4. Lecanemab in patients with early AD: phase 2 detailed results + OLE — 2022, Alzheimers Res Ther (PMID:36544184 DOI:10.1186/s13195-022-01124-2, 232 cites)
5. A randomized, double-blind, phase 2b proof-of-concept trial of lecanemab — 2020, Alzheimers Res Ther (PMID:33865446 DOI:10.1186/s13195-021-00813-8, 676 cites)
6. Long-term safety and efficacy of lecanemab (CLARITY-AD 36-month OLE) — 2025, Alzheimers Dement (PMID:41355080 DOI:10.1002/alz.70905, 24 cites)

---

## Query: `pico-sglt2-cv-mortality` — "In adults with type 2 diabetes, do SGLT2 inhibitors compared to placebo reduce cardiovascular mortality?"
Category: pico. Intent: P=T2DM, I=SGLT2i, C=placebo, O=CV mortality. Expect CVOT RCTs + meta-analyses.

### Manan top 10
1. Effect of SGLT2 inhibitors on cardiovascular, renal and safety outcomes in patients with type 2 diabetes mellitus and chronic kidney disease: A systematic review and meta-analysis. — 2019, Diabetes Obes Metab [meta_analysis] (PMID:30697905 DOI:10.1111/dom.13648)
2. Impact of diabetes on the effects of sodium glucose co-transporter-2 inhibitors on kidney outcomes: collaborative meta-analysis of large placebo-controlled trials. — 2022, Lancet [systematic_review] (PMID:36351458 DOI:10.1016/S0140-6736(22)02074-8)
3. Sodium-glucose cotransporter protein-2 (SGLT-2) inhibitors and glucagon-like peptide-1 (GLP-1) receptor agonists for type 2 diabetes: systematic review and network meta-analysis of randomised controlled trials. — 2021, BMJ [systematic_review] (PMID:33441402 DOI:10.1136/bmj.m4573)
4. Association of SGLT2 Inhibitors With Cardiovascular and Kidney Outcomes in Patients With Type 2 Diabetes: A Meta-analysis. — 2021, JAMA Cardiol [meta_analysis] (PMID:33031522 DOI:10.1001/jamacardio.2020.4511)
5. Effect of SGLT2 inhibitors on heart failure outcomes and cardiovascular death across the cardiometabolic disease spectrum: a systematic review and meta-analysis. — 2024, Lancet Diabetes Endocrinol [systematic_review] (PMID:38768620 DOI:10.1016/S2213-8587(24)00102-5)
6. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction. — 2019, N Engl J Med [rct] (PMID:31535829 DOI:10.1056/NEJMoa1911303)
7. Oral Semaglutide and Cardiovascular Outcomes in People With Type 2 Diabetes, According to SGLT2i Use: Prespecified Analyses of the SOUL Randomized Trial. — 2025, Circulation [rct] (PMID:40156843 DOI:10.1161/CIRCULATIONAHA.125.074545)
8. Effects of empagliflozin on progression of chronic kidney disease: a prespecified secondary analysis from the empa-kidney trial. — 2024, Lancet Diabetes Endocrinol [rct] (PMID:38061371 DOI:10.1016/S2213-8587(23)00321-2)
9. Canagliflozin and Renal Outcomes in Type 2 Diabetes and Nephropathy. — 2019, N Engl J Med [rct] (PMID:30990260 DOI:10.1056/NEJMoa1811744)
10. Pharmacological selectivity of SGLT2 inhibitors and cardiovascular outcomes in patients with type 2 diabetes: a meta-analysis — 2022, European Heart Journal [meta_analysis] (DOI:10.1093/eurheartj/ehac544.2688)

### Elicit top 10
1. Effects of SGLT2 inhibitors on cardiovascular outcomes and mortality in type 2 diabetes — 2019, Medicine (PMID:31804352 DOI:10.1097/MD.0000000000018245, 67 cites)
2. SGLT2 inhibitors and cardiovascular outcomes: systematic review and meta-analysis — 2018, Eur J Prev Cardiol (PMID:29372664 DOI:10.1177/2047487318755531, 128 cites)
3. Cardiovascular outcomes with SGLT2 inhibitors in T2DM: meta-analysis of placebo-controlled RCTs — 2017, Int J Cardiol (PMID:27866027 DOI:10.1016/j.ijcard.2016.11.181, 67 cites)
4. Meta-Analysis of SGLT2 Inhibitors on CV Outcomes and All-Cause Mortality in T2DM — 2016, Am J Cardiol (PMID:27666177 DOI:10.1016/j.amjcard.2016.08.061, 68 cites)
5. Effects of SGLT2 inhibitors on CV disease, death and safety outcomes in T2DM - systematic review — 2018, Diabetes Res Clin Pract (PMID:29604389 DOI:10.1016/j.diabres.2018.03.027, 80 cites)
6. Effects of SGLT-2 inhibitors on mortality and CV events: comprehensive meta-analysis of RCTs — 2016, Acta Diabetol (PMID:27488726 DOI:10.1007/s00592-016-0892-7, 80 cites)

---

## Query: `guideline-af-esc` — "ESC guidelines management of atrial fibrillation"
Category: guideline. Intent: ESC AF management guideline should rank top.

### Manan top 10
1. 2016 ESC Guidelines for the management of atrial fibrillation developed in collaboration with EACTS. — 2016, Eur Heart J [guideline] (PMID:27567408 DOI:10.1093/eurheartj/ehw210)
2. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS): The Task Force for the diagnosis and management of atrial fibrillation of the European Society of Cardiology (ESC) Developed with the special contribution of the European Heart Rhythm Association (EHRA) of the ESC. — 2021, Eur Heart J [guideline] (PMID:32860505 DOI:10.1093/eurheartj/ehaa612)
3. 2024 ESC Guidelines for the management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS). — 2024, Eur Heart J [guideline] (PMID:39210723 DOI:10.1093/eurheartj/ehae176)
4. Guidelines for the management of atrial fibrillation: the Task Force for the Management of Atrial Fibrillation of the European Society of Cardiology (ESC). — 2010, Eur Heart J [guideline] (PMID:20802247 DOI:10.1093/eurheartj/ehq278)
5. ACC/AHA/ESC 2006 Guidelines for the Management of Patients With Atrial Fibrillation—Executive Summary — 2006, Journal of the American College of Cardiology [guideline] (PMID:16904574 DOI:10.1016/j.jacc.2006.07.009)
6. ACC/AHA/ESC 2006 Guidelines for the Management of Patients With Atrial Fibrillation — 2006, Circulation [guideline] (PMID:16908781 DOI:10.1161/circulationaha.106.177292)
7. 2011 ACCF/AHA/HRS Focused Updates Incorporated Into the ACC/AHA/ESC 2006 Guidelines for the Management of Patients With Atrial Fibrillation — 2011, Journal of the American College of Cardiology [guideline] (PMID:21392637 DOI:10.1016/j.jacc.2010.09.013)
8. ACC/AHA/ESC guidelines for the management of patients with atrial fibrillation: executive summary — 2001, Journal of the American College of Cardiology [guideline] (PMID:11583910 DOI:10.1016/s0735-1097(01)01587-x)
9. Acc/aha/esc guidelines for the management of patients with atrialfibrillation: executive summary a report of the american college ofcardiology/american heart association task force on practice guideli — 2001, Circulation [guideline] (— no id —)
10. ACC/AHA/ESC guidelines for the management of patients with supraventricular arrhythmias∗∗This document does not cover atrial fibrillation; atrial fibrillation is covered in the ACC/AHA/ESC guidelines on the management of patients with atrial fibrillation found on the ACC, AHA, and ESC Web sites.—executive summary — 2003, Journal of the American College of Cardiology [review] (PMID:14563598 DOI:10.1016/j.jacc.2003.08.013)

### Elicit top 10
1. 2016 ESC Guidelines for the management of atrial fibrillation (with EACTS) — 2016, Europace (PMID:27567465 DOI:10.1093/EUROPACE/EUW295, 4514 cites)
2. ESC Guidelines for management of atrial fibrillation (2010 Task Force) — 2010, Europace (PMID:20876603 DOI:10.1093/europace/euq350, 4090 cites)
3. 2016 ESC Guidelines for the Management of Atrial Fibrillation (Rev Esp Cardiol) — 2017, Rev Esp Cardiol (PMID:28038729 DOI:10.1016/j.rec.2016.11.033, 2229 cites)
4. ESC Guidelines for management of atrial fibrillation (2010, Eur Heart J) — 2010, Eur Heart J (PMID:20802247 DOI:10.1093/eurheartj/ehq278, 3663 cites)
5. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation — 2021, Rev Esp Cardiol (DOI:10.1016/J.REC.2021.03.009, 5955 cites)

---

## Query: `compare-doac-vs-warfarin` — "DOACs versus warfarin for stroke prevention in atrial fibrillation"
Category: therapy_comparison. Intent: DOAC vs warfarin efficacy/safety in AF (RE-LY/ROCKET-AF/ARISTOTLE/ENGAGE + meta-analysis).

### Manan top 10
1. Direct Oral Anticoagulants Versus Warfarin in Patients With Atrial Fibrillation: Patient-Level Network Meta-Analyses of Randomized Clinical Trials With Interaction Testing by Age and Sex. — 2022, Circulation [meta_analysis] (PMID:34985309 DOI:10.1161/CIRCULATIONAHA.121.056355)
2. Oral anticoagulants for prevention of stroke in atrial fibrillation: systematic review, network meta-analysis, and cost effectiveness analysis. — 2017, BMJ [systematic_review] (PMID:29183961 DOI:10.1136/bmj.j5058)
3. Direct oral anticoagulants vs warfarin in non-valvular atrial fibrillation. Meta-analysis, includes all published trials — 2021, European Heart Journal [meta_analysis] (DOI:10.1093/eurheartj/ehab724.0343)
4. Direct oral anticoagulants for stroke prevention in patients with device-detected atrial fibrillation: assessing net clinical benefit — 2024, European Heart Journal Supplements [meta_analysis] (PMID:39099575 DOI:10.1093/eurheartjsupp/suae075)
5. Continued vs. interrupted direct oral anticoagulants at the time of device surgery, in patients with moderate to high risk of arterial thrombo-embolic events (BRUISE CONTROL-2). — 2018, Eur Heart J [rct] (PMID:30462279 DOI:10.1093/eurheartj/ehy413)
6. Rationale and design of a randomized study comparing the Watchman FLX device to DOACs in patients with atrial fibrillation. — 2023, Am Heart J [rct] (PMID:37279840 DOI:10.1016/j.ahj.2023.05.022)
7. Risks and benefits of direct oral anticoagulants versus warfarin in a real world setting: cohort study in primary care — 2018, BMJ [cohort] (PMID:29973392 DOI:10.1136/bmj.k2505)
8. Association of Alternative Anticoagulation Strategies and Outcomes in Patients With Ischemic Stroke While Taking a Direct Oral Anticoagulant. — 2023, Neurology [cohort] (PMID:37225430 DOI:10.1212/WNL.0000000000207422)
9. Oral Anticoagulant Agents in Patients With Atrial Fibrillation and CKD: A Systematic Review and Pairwise Network Meta-analysis. — 2021, Am J Kidney Dis [systematic_review] (PMID:33872690 DOI:10.1053/j.ajkd.2021.02.328)
10. Asundexian versus Apixaban in Patients with Atrial Fibrillation — 2024, New England Journal of Medicine [rct] (PMID:39225267 DOI:10.1056/nejmoa2407105)

### Elicit top 10
1. Direct-Acting Oral Anticoagulants vs. Warfarin for Preventing Strokes in AF — 2017, NEJM Journal Watch (DOI:10.1056/nejm-jw.NA45643, 0 cites)
2. Oral anticoagulants for prevention of stroke in AF: systematic review, network meta-analysis — 2017, BMJ (PMID:29183961 DOI:10.1136/bmj.j5058, 506 cites)
3. Oral anticoagulants for prevention of stroke in AF (network MA, companion) — 2017, BMJ (PMID:29203465 DOI:10.1136/bmj.j5631, 74 cites)
4. DOACs Versus Warfarin in AF: Patient-Level Network Meta-Analyses (COMBINE AF) — 2022, Circulation (PMID:34985309 DOI:10.1161/CIRCULATIONAHA.121.056355, 218 cites)
5. Comparison of Oral Anticoagulants vs. Warfarin for Stroke Prevention in AF: A Meta-Analysis — 2024, J Health Rehabil Res (DOI:10.61919/jhrr.v4i3.1606, 0 cites)
6. DOACs Versus Vitamin K Antagonists in Real-life Patients With AF: Systematic Review and Meta-analysis — 2019, Rev Esp Cardiol (PMID:29606361 DOI:10.1016/j.rec.2018.03.009, 31 cites)

---
