# Blinded LLM-Council packet — Engine A vs Engine B

Two anonymous engines are compared on identical queries. Engine assignment is
randomized per query; you cannot infer identity from position or formatting.

## Scoring rubric — BLINDED comparison

You are an impartial judge comparing TWO anonymous literature-search engines,
**Engine A** and **Engine B**, on the SAME biomedical query. You do NOT know
which engine is which, and you must not guess or speculate about their identity.
Judge ONLY the result lists shown.

Score EACH engine 0–5 (5 = best) on these six dimensions:
1. **recall** — are the landmark / must-have papers present in the top 10?
2. **ranking** — is the best / most-relevant paper near the top; is the evidence
   hierarchy respected (systematic reviews/meta-analyses & RCTs above weaker designs)?
3. **metadata** — DOI/PMID/year/venue completeness and plausibility.
4. **clinical_relevance** — usefulness of the top 10 to a clinician/researcher; few irrelevant items.
5. **explanation** — would the list be easy to trust/act on (clear identifiers, no junk)?
6. **trust** — absence of dubious/predatory/irrelevant/duplicate entries.

Then pick a **winner** per query: "A", "B", or "tie".

Use the listed must-have papers as ground truth for landmark recall. Penalize a
missing landmark RCT and penalize irrelevant items in the top 10. For queries
tagged recency-sensitive, favor newer high-quality evidence.

## Output format (STRICT)

Return ONLY a JSON object, no prose, no markdown fences, of EXACTLY this shape:
{
  "perQuery": [
    {
      "id": "<query id>",
      "A": {"recall":0-5,"ranking":0-5,"metadata":0-5,"clinical_relevance":0-5,"explanation":0-5,"trust":0-5},
      "B": {"recall":0-5,"ranking":0-5,"metadata":0-5,"clinical_relevance":0-5,"explanation":0-5,"trust":0-5},
      "winner": "A" | "B" | "tie",
      "note": "<one sentence justification, no identity guessing>"
    }
  ],
  "overall": {"winner":"A"|"B"|"tie","summary":"<2-3 sentences>"}
}

---

## Query: `tavr-low-risk-6yr` — "TAVR low risk six year outcomes"
Category: long_term_outcomes. Intent: Long-term (≈6yr) outcomes of TAVR vs SAVR in low surgical risk aortic stenosis; the landmark RCTs and their longest follow-ups.

**Must-have landmark papers (ground truth):**
- PARTNER 3 (Mack/Leon, NEJM 2019) — balloon-expandable, low risk
- Evolut Low Risk 6-year (Forrest, JACC 2026)

### Engine A — top 10
1. Transcatheter Aortic‐Valve Replacement with a Balloon‐Expandable Valve in Low‐Risk Patients — 2019, New England Journal of Medicine (PMID:30883058 DOI:10.1056/NEJMoa1814052)
2. Six-Year Outcomes After Transcatheter vs Surgical Aortic Valve Replacement in Low-Risk Patients With Aortic Stenosis. — 2026, Journal of the American College of Cardiology (PMID:41697183 DOI:10.1016/j.jacc.2026.02.5063)
3. Abstract 16816: 1-Year Outcomes From the Low Risk Transcatheter Aortic Valve Replacement (LRT) Study — 2018, Circulation (DOI:10.1161/circ.138.suppl_1.16816)
4. Review of Major Registries and Clinical Trials of Late Outcomes After Transcatheter Aortic Valve Replacement. — 2017, American Journal of Cardiology (PMID:28532778 DOI:10.1016/j.amjcard.2017.04.029)
5. Short- and intermediate-term outcomes of transcatheter aortic valve replacement in low-risk patients: A meta-analysis and systematic review — 2024, International Journal of Cardiology: Heart & Vasculature (PMID:39045569 DOI:10.1016/j.ijcha.2024.101458)
6. 2-Year Outcomes After Transcatheter Versus Surgical Aortic Valve Replacement in Low-Risk Patients. — 2022, Journal of the American College of Cardiology (PMID:35241222 DOI:10.1016/j.jacc.2021.11.062)
7. Transcatheter Aortic Valve Replacement in Low-Risk Patients With Symptomatic Severe Aortic Stenosis. — 2018, Journal of the American College of Cardiology (PMID:30170075 DOI:10.1016/j.jacc.2018.08.1033)
8. Outcomes 2 Years After Transcatheter Aortic Valve Replacement in Patients at Low Surgical Risk. — 2021, Journal of the American College of Cardiology (PMID:33663731 DOI:10.1016/j.jacc.2020.12.052)
9. Long-Term Results Following Transcatheter Versus Surgical Aortic Valve Replacement in Low-Risk Patients with Severe Aortic Stenosis: A Systematic Review and Meta-Analysis of Randomized Trials. — 2024, American Journal of Cardiology (PMID:39173988 DOI:10.1016/j.amjcard.2024.08.014)
10. Transcatheter Versus Surgical Aortic Valve Replacement in Low-Risk Patients. — 2019, Journal of the American College of Cardiology (PMID:31537261 DOI:10.1016/j.jacc.2019.06.076)

### Engine B — top 10
1. Six-Year Outcomes After Transcatheter vs Surgical Aortic Valve Replacement in Low-Risk Patients With Aortic Stenosis. — 2026, J Am Coll Cardiol (PMID:41697183 DOI:10.1016/j.jacc.2026.02.5063)
2. Short- and intermediate-term outcomes of transcatheter aortic valve replacement in low-risk patients: A meta-analysis and systematic review. — 2024, Int J Cardiol Heart Vasc (PMID:39045569 DOI:10.1016/j.ijcha.2024.101458)
3. Minimally invasive surgery versus transcatheter aortic valve replacement: a systematic review and meta-analysis. — 2021, Open Heart (PMID:33455914 DOI:10.1136/openhrt-2020-001535)
4. Transcatheter vs Surgical Aortic Valve Replacement in Lower-Risk Patients: An Updated Meta-Analysis of Randomized Controlled Trials. — 2025, J Am Coll Cardiol (PMID:40044297 DOI:10.1016/j.jacc.2024.12.031)
5. Predictors of Outcomes of Reintervention&#xa0;After Transcatheter Aortic&#xa0;Valve Replacement: FRANCE 2 and FRANCE TAVI Registries. — 2025, J Am Coll Cardiol (PMID:40044295 DOI:10.1016/j.jacc.2024.11.048)
6. Transcatheter aortic valve replacement in low-risk patients: an updated meta-analysis of randomized controlled trials. — 2025, Int J Cardiol Heart Vasc (PMID:40453067 DOI:10.1016/j.ijcha.2025.101692)
7. Updated 5-year outcomes of transcatheter versus surgical aortic valve replacement in patients with severe aortic stenosis at low- to intermediate-surgical risk. — 2026, Heart (PMID:41672766 DOI:10.1136/heartjnl-2025-327092)
8. Transcatheter Aortic-Valve Replacement in Low-Risk Patients at Five Years. — 2023, N Engl J Med (PMID:37874020 DOI:10.1056/NEJMoa2307447)
9. 5-Year Outcomes of Anterior Mitral&#xa0;Leaflet Laceration to Prevent&#xa0;Outflow Obstruction. — 2024, JACC Cardiovasc Interv (PMID:39243268 DOI:10.1016/j.jcin.2024.05.041)
10. Transcatheter versus surgical aortic valve replacement in low- to intermediate-risk patients: a meta-analysis of reconstructed time-to-event data. — 2025, Ann Cardiothorac Surg (PMID:40270848 DOI:10.21037/acs-2024-etavr-0096)

---

## Query: `exact-dapa-hf` — "Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction"
Category: exact_paper. Intent: Retrieve the exact DAPA-HF primary results paper by its title.

**Must-have landmark papers (ground truth):**
- DAPA-HF (McMurray, NEJM 2019)

### Engine A — top 10
1. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction. — 2019, N Engl J Med (PMID:31535829 DOI:10.1056/NEJMoa1911303)
2. SGLT2 inhibitors in patients with heart failure with reduced ejection fraction: a meta-analysis of the EMPEROR-Reduced and DAPA-HF trials. — 2020, Lancet (PMID:32877652 DOI:10.1016/S0140-6736(20)31824-9)
3. Dapagliflozin across the range of ejection fraction in patients with heart failure: a patient-level, pooled meta-analysis of DAPA-HF and DELIVER. — 2022, Nat Med (PMID:36030328 DOI:10.1038/s41591-022-01971-4)
4. Dapagliflozin in Patients Hospitalized for Heart Failure: Primary Results of the DAPA ACT HF-TIMI 68 Randomized Clinical Trial and Meta-Analysis of Sodium-Glucose Cotransporter-2 Inhibitors in Patients Hospitalized for Heart Failure. — 2025, Circulation (PMID:40884036 DOI:10.1161/CIRCULATIONAHA.125.076575)
5. Highlights in heart failure. — 2019, ESC Heart Fail (PMID:31997538 DOI:10.1002/ehf2.12555)
6. Dapagliflozin in heart failure with preserved and mildly reduced ejection fraction: rationale and design of the DELIVER trial. — 2021, Eur J Heart Fail (PMID:34051124 DOI:10.1002/ejhf.2249)
7. Dapagliflozin Effects on Biomarkers, Symptoms, and Functional Status in Patients With Heart Failure With Reduced Ejection Fraction: The DEFINE-HF Trial. — 2019, Circulation (PMID:31524498 DOI:10.1161/CIRCULATIONAHA.119.042929)
8. Natriuretic Peptides, Kidney Function,&#xa0;and Clinical Outcomes in Heart&#xa0;Failure&#xa0;With Preserved Ejection&#xa0;Fraction. — 2025, JACC Heart Fail (PMID:39365237 DOI:10.1016/j.jchf.2024.08.009)
9. Efficacy and Safety of Dapagliflozin According to Frailty in Heart Failure With Reduced Ejection Fraction : A Post Hoc Analysis of the DAPA-HF Trial. — 2022, Ann Intern Med (PMID:35467935 DOI:10.7326/M21-4776)
10. Time to Clinical Benefit of Dapagliflozin and Significance of Prior Heart Failure Hospitalization in Patients With Heart Failure With Reduced Ejection Fraction. — 2021, JAMA Cardiol (PMID:33595593 DOI:10.1001/jamacardio.2020.7585)

### Engine B — top 10
1. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction. — 2019, New England Journal of Medicine (PMID:31535829 DOI:10.1056/NEJMoa1911303)
2. The Effects of Dapagliflozin on Heart Failure With Reduced Ejection Fraction — 2021, Heart, Lung and Circulation (DOI:10.1016/j.hlc.2021.06.107)
3. Dapagliflozin in Heart Failure with Mildly Reduced or Preserved Ejection Fraction. — 2022, New England Journal of Medicine (PMID:36027570 DOI:10.1056/NEJMoa2206286)
4. Efficacy of Dapagliflozin on Renal Function and Outcomes in Patients With Heart Failure With Reduced Ejection Fraction — 2021, ? (— no id —)
5. Dapagliflozin in patients with heart failure and reduced ejection fraction — 2020, Internal and Emergency Medicine (PMID:32124206 DOI:10.1007/s11739-020-02297-0)
6. Correction to: Dapaglifozin: A Review in Symptomatic Heart Failure with Reduced Ejection Fraction — 2021, American Journal of Cardiovascular Drugs (PMID:34859355 DOI:10.1007/s40256-021-00512-7)
7. Dapagliflozin in patients with heart failure and reduced ejection fraction — 2021, Evidence-Based Practice (DOI:10.1097/EBP.0000000000001032)
8. Dapagliflozin Effects on Biomarkers, Symptoms, and Functional Status in Patients With Heart Failure With Reduced Ejection Fraction — 2020, ? (— no id —)
9. Efficacy and Safety of Dapagliflozin in Men and Women With Heart Failure With Reduced Ejection Fraction: A Prespecified Analysis of the Dapagliflozin and Prevention of Adverse Outcomes in Heart Failure Trial. — 2021, JAMA cardiology (PMID:33787831 DOI:10.1001/jamacardio.2021.0379)
10. Dapagliflozin reduced worsening HF or CV death in HF with reduced ejection fraction — 2020, Annals of Internal Medicine (PMID:32066149 DOI:10.7326/ACPJ202002180-016)

---

## Query: `recency-lecanemab` — "newest evidence on lecanemab for Alzheimer disease"
Category: recency. Intent: Recent lecanemab efficacy/safety evidence (CLARITY-AD and follow-ups).
_Recency-sensitive: newer high-quality evidence is better._

**Must-have landmark papers (ground truth):**
- CLARITY-AD — Lecanemab in Early Alzheimer's Disease (van Dyck, NEJM 2023)

### Engine A — top 10
1. Lecanemab in Early Alzheimer's Disease. — 2022, New England Journal of Medicine (PMID:36449413 DOI:10.1056/NEJMoa2212948)
2. Novel anti-amyloid-beta (Aβ) monoclonal antibody lecanemab for Alzheimer’s disease: A systematic review — 2023, International Journal of Immunopathology and Pharmacology (PMID:37902139 DOI:10.1177/03946320231209839)
3. Lecanamab Ushers in a New Era of Anti‐Amyloid Therapy for Alzheimer's Disease — 2023, Annals of Neurology (PMID:36919987 DOI:10.1002/ana.26643)
4. Lecanemab: A Humanized Monoclonal Antibody for the Treatment of Early Alzheimer Disease — 2023, The Annals of Pharmacotherapy (PMID:38095619 DOI:10.1177/10600280231218253)
5. Evidence for lecanemab in early Alzheimer’s disease — 2023, Drug and therapeutics bulletin (PMID:36725282 DOI:10.1136/dtb.2023.000005)
6. Leqembi (Lecanemab) in Early Alzheimer's Disease: A Review of Clinical
Trial Evidence and Therapeutic Implications — 2026, Reviews on recent clinical trials (DOI:10.2174/0115748871418305260224075827)
7. Lecanemab: A Breakthrough in Alzheimer’s Disease Treatment — 2024, International Journal of Innovative Science and Research Technology (DOI:10.38124/ijisrt/ijisrt24oct022)
8. Does the Current Evidence for Lecanemab Mechanism Support a Rationale for Continued Lecanemab Dosing? — 2024, Alzheimer's & Dementia (DOI:10.1002/alz.092090)
9. Lecanemab reduces brain amyloid-β and delays cognitive worsening — 2023, Cell Reports Medicine (PMID:36948153 DOI:10.1016/j.xcrm.2023.100982)
10. Developing Topics. — 2025, Alzheimer's & Dementia (PMID:41434358 DOI:10.1002/alz70861_108905)

### Engine B — top 10
1. Real-world effectiveness of monoclonal antibody lecanemab versus acetylcholinesterase inhibitors in Alzheimer's disease: a target trial emulation. — 2026, Alzheimers Res Ther (PMID:42332768 DOI:10.1186/s13195-026-02095-4)
2. Non-Cognitive Symptoms in Alzheimer’s Disease and Their Likely Impact on Patient Outcomes. A Scoping Review — 2025, Current Treatment Options in Neurology (PMID:41536422 DOI:10.1007/s11940-025-00852-8)
3. Neuroinflammation-centered pathophysiology and therapeutic strategy design in Alzheimer's disease: Cutting-edge developments. — 2026, Cell Signal (PMID:42331203 DOI:10.1016/j.cellsig.2026.112689)
4. Critical assessment of anti-amyloid-β monoclonal antibodies effects in Alzheimer’s disease: a systematic review and meta-analysis highlighting target engagement and clinical meaningfulness — 2024, Scientific Reports (PMID:39468148 DOI:10.1038/s41598-024-75204-8)
5. Lecanemab Reduces Neuropsychiatric Symptoms and Related Regional Brain Amyloid Load in Early Alzheimer's Disease: A Preliminary Prospective Study. — 2026, CNS Neurosci Ther (PMID:42277629 DOI:10.1002/cns.70974)
6. Alzheimer’s Disease: Exploring Pathophysiological Hypotheses and the Role of Machine Learning in Drug Discovery — 2025, International Journal of Molecular Sciences (PMID:39940772 DOI:10.3390/ijms26031004)
7. From clinical trial to clinical experience: Lecanemab therapy in a real-world case series. — 2026, Alzheimers Dement (Amst) (PMID:42255952 DOI:10.1002/dad2.70365)
8. Is CAA a perivascular brain clearance disease? A discussion of the evidence to date and outlook for future studies — 2024, Cellular and Molecular Life Sciences (PMID:38801464 DOI:10.1007/s00018-024-05277-1)
9. Evaluating emerging amyloid-&#x3b2; centric drugs for the treatment of Alzheimer's disease. — 2026, Expert Opin Emerg Drugs (PMID:42322185 DOI:10.1080/14728214.2026.2693701)
10. "Doctor, if it were you, which would you choose?": Navigating personal preference questions in anti-amyloid immunotherapy selection. — 2026, Alzheimers Dement (Amst) (PMID:42318437 DOI:10.1002/dad2.70373)

---

## Query: `pico-sglt2-cv-mortality` — "In adults with type 2 diabetes, do SGLT2 inhibitors compared to placebo reduce cardiovascular mortality?"
Category: pico. Intent: P=T2DM, I=SGLT2i, C=placebo, O=CV mortality. Expect CVOT RCTs + meta-analyses.

### Engine A — top 10
1. Effect of SGLT2 inhibitors on cardiovascular, renal and safety outcomes in patients with type 2 diabetes mellitus and chronic kidney disease: A systematic review and meta-analysis. — 2019, Diabetes Obes Metab (PMID:30697905 DOI:10.1111/dom.13648)
2. Impact of diabetes on the effects of sodium glucose co-transporter-2 inhibitors on kidney outcomes: collaborative meta-analysis of large placebo-controlled trials. — 2022, Lancet (PMID:36351458 DOI:10.1016/S0140-6736(22)02074-8)
3. Sodium-glucose cotransporter protein-2 (SGLT-2) inhibitors and glucagon-like peptide-1 (GLP-1) receptor agonists for type 2 diabetes: systematic review and network meta-analysis of randomised controlled trials. — 2021, BMJ (PMID:33441402 DOI:10.1136/bmj.m4573)
4. Effect of SGLT2 inhibitors on heart failure outcomes and cardiovascular death across the cardiometabolic disease spectrum: a systematic review and meta-analysis. — 2024, Lancet Diabetes Endocrinol (PMID:38768620 DOI:10.1016/S2213-8587(24)00102-5)
5. Comparative Effectiveness of Glucose-Lowering Drugs for Type 2 Diabetes: A Systematic Review and Network Meta-analysis. — 2020, Ann Intern Med (PMID:32598218 DOI:10.7326/M20-0864)
6. Association of SGLT2 Inhibitors With Cardiovascular and Kidney Outcomes in Patients With Type 2 Diabetes: A Meta-analysis. — 2021, JAMA Cardiol (PMID:33031522 DOI:10.1001/jamacardio.2020.4511)
7. Sodium-glucose cotransporter-2 inhibitors (SGLT2) in frail or older people with type 2 diabetes and heart failure: a systematic review and meta-analysis. — 2024, Age Ageing (PMID:38287703 DOI:10.1093/ageing/afad254)
8. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction. — 2019, N Engl J Med (PMID:31535829 DOI:10.1056/NEJMoa1911303)
9. Cardiovascular and kidney outcomes with finerenone in patients with type 2 diabetes and chronic kidney disease: the FIDELITY pooled analysis — 2021, European Heart Journal (PMID:35023547 DOI:10.1093/eurheartj/ehab777)
10. Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes. — 2015, N Engl J Med (PMID:26378978 DOI:10.1056/NEJMoa1504720)

### Engine B — top 10
1. Effects of SGLT2 inhibitors on cardiovascular outcomes and mortality in type 2 diabetes — 2019, Medicine (PMID:31804352 DOI:10.1097/MD.0000000000018245)
2. Sodium-glucose co-transporter 2 inhibitors and cardiovascular outcomes: A systematic review and meta-analysis — 2018, European Journal of Preventive Cardiology (PMID:29372664 DOI:10.1177/2047487318755531)
3. Systematic review and meta-analysis: SGLT2 inhibitors, blood pressure and cardiovascular outcomes — 2021, International Journal of Cardiology: Heart & Vasculature (PMID:33659605 DOI:10.1016/j.ijcha.2021.100725)
4. Cardiovascular outcomes with sodium-glucose cotransporter-2 inhibitors in patients with type II diabetes mellitus: A meta-analysis of placebo-controlled randomized trials. — 2017, International Journal of Cardiology (PMID:27866027 DOI:10.1016/j.ijcard.2016.11.181)
5. Meta-Analysis of Effects of Sodium-Glucose Cotransporter 2 Inhibitors on Cardiovascular Outcomes and All-Cause Mortality Among Patients With Type 2 Diabetes Mellitus. — 2016, American Journal of Cardiology (PMID:27666177 DOI:10.1016/j.amjcard.2016.08.061)
6. COMPARATIVE EFFICACY OF SODIUM–GLUCOSE COTRANSPORTER-2 INHIBITORS VERSUS PLACEBO ON CARDIOVASCULAR MORTALITY IN ADULTS WITH HEART FAILURE: A META-ANALYSIS OF RANDOMIZED CONTROLLED TRIALS — 2026, International Journal of Current Pharmaceutical Research (DOI:10.22159/ijcpr.2026v18i2.8085)
7. Cardiovascular outcomes of sodium glucose cotransporter‐2 inhibitors in patients with type 2 diabetes — 2018, Diabetes, obesity and metabolism (PMID:30039524 DOI:10.1111/dom.13477)
8. Effects of SGLT-2 inhibitors on mortality and cardiovascular events: a comprehensive meta-analysis of randomized controlled trials — 2016, Acta Diabetologica (PMID:27488726 DOI:10.1007/s00592-016-0892-7)
9. Cardiovascular Effects of Sodium-Glucose Cotransporter-2 Inhibitors in Adults With Type 2 Diabetes. — 2019, Canadian Journal of Diabetes (PMID:31839265 DOI:10.1016/j.jcjd.2019.09.004)
10. SGLT2 inhibitors and cardiovascular and renal outcomes: a meta-analysis and trial sequential analysis — 2021, Heart Failure Reviews (PMID:33620621 DOI:10.1007/s10741-021-10083-z)

---

## Query: `guideline-af-esc` — "ESC guidelines management of atrial fibrillation"
Category: guideline. Intent: ESC AF management guideline should rank top.

### Engine A — top 10
1. 2016 ESC Guidelines for the management of atrial fibrillation developed in collaboration with EACTS. — 2016, Eur Heart J (PMID:27567408 DOI:10.1093/eurheartj/ehw210)
2. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS): The Task Force for the diagnosis and management of atrial fibrillation of the European Society of Cardiology (ESC) Developed with the special contribution of the European Heart Rhythm Association (EHRA) of the ESC. — 2021, Eur Heart J (PMID:32860505 DOI:10.1093/eurheartj/ehaa612)
3. Guidelines for the management of atrial fibrillation: the Task Force for the Management of Atrial Fibrillation of the European Society of Cardiology (ESC). — 2010, Eur Heart J (PMID:20802247 DOI:10.1093/eurheartj/ehq278)
4. 2024 ESC Guidelines for the management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS). — 2024, Eur Heart J (PMID:39210723 DOI:10.1093/eurheartj/ehae176)
5. ACC/AHA/ESC 2006 Guidelines for the Management of Patients With Atrial Fibrillation — 2006, Circulation (PMID:16908781 DOI:10.1161/circulationaha.106.177292)
6. ACC/AHA/ESC 2006 Guidelines for the Management of Patients With Atrial Fibrillation—Executive Summary — 2006, Journal of the American College of Cardiology (PMID:16904574 DOI:10.1016/j.jacc.2006.07.009)
7. 2011 ACCF/AHA/HRS Focused Updates Incorporated Into the ACC/AHA/ESC 2006 Guidelines for the Management of Patients With Atrial Fibrillation — 2011, Journal of the American College of Cardiology (PMID:21392637 DOI:10.1016/j.jacc.2010.09.013)
8. ACC/AHA/ESC guidelines for the management of patients with supraventricular arrhythmias∗∗This document does not cover atrial fibrillation; atrial fibrillation is covered in the ACC/AHA/ESC guidelines on the management of patients with atrial fibrillation found on the ACC, AHA, and ESC Web sites.—executive summary — 2003, Journal of the American College of Cardiology (PMID:14563598 DOI:10.1016/j.jacc.2003.08.013)
9. ACC/AHA/ESC guidelines for the management of patients with atrial fibrillation: executive summary — 2001, Journal of the American College of Cardiology (PMID:11583910 DOI:10.1016/s0735-1097(01)01587-x)
10. 2012 focused update of the ESC Guidelines for the management of atrial fibrillation — 2012, EP Europace (PMID:22923145 DOI:10.1093/europace/eus305)

### Engine B — top 10
1. 2016 ESC Guidelines for the management of atrial fibrillation developed in collaboration with EACTS. — 2016, Europace (PMID:27567465 DOI:10.1093/EUROPACE/EUW295)
2. Guidelines for the management of atrial fibrillation: the Task Force for the Management of Atrial Fibrillation of the European Society of Cardiology (ESC). — 2010, Europace (PMID:20876603 DOI:10.1093/europace/euq350)
3. 2016 ESC Guidelines for the Management of Atrial Fibrillation Developed in Collaboration With EACTS. — 2017, Revista Española de Cardiología (PMID:28038729 DOI:10.1016/j.rec.2016.11.033)
4. Guidelines for the management of atrial fibrillation: the Task Force for the Management of Atrial Fibrillation of the European Society of Cardiology (ESC). — 2010, European Heart Journal (PMID:20802247 DOI:10.1093/eurheartj/ehq278)
5. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS) — 2021, Revista Española de Cardiología (DOI:10.1016/J.REC.2021.03.009)
6. 2016 ESC Guidelines for the management of atrial fibrillation developed in collaboration with EACTS. — 2016, European Journal of Cardio-Thoracic Surgery (PMID:27663299 DOI:10.1093/EJCTS/EZW313)
7. 2016 ESC Guidelines for the management of atrial fibrillation developed in collaboration with EACTS. — 2016, European Heart Journal (PMID:27567408 DOI:10.1093/eurheartj/ehw210)
8. 2012 focused update of the ESC Guidelines for the management of atrial fibrillation: an update of the 2010 ESC Guidelines for the management of atrial fibrillation. Developed with the special contribution of the European Heart Rhythm Association. — 2012, European Heart Journal (PMID:22922413 DOI:10.1093/eurheartj/ehs253)
9. [2024 ESC Guidelines for the management of atrial fibrillation]. — 2025, Giornale italiano di cardiologia (PMID:39898766 DOI:10.1714/4419.44150)
10. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation developed in collaboration with the European Association of Cardio-Thoracic Surgery (EACTS). — 2020, European Heart Journal (PMID:32860505 DOI:10.1093/eurheartj/ehaa612)

---

## Query: `compare-doac-vs-warfarin` — "DOACs versus warfarin for stroke prevention in atrial fibrillation"
Category: therapy_comparison. Intent: DOAC vs warfarin efficacy/safety in AF (RE-LY/ROCKET-AF/ARISTOTLE/ENGAGE + meta-analysis).

### Engine A — top 10
1. Warfarin versus DOACs in the prevention of thromboembolic stroke in patients with Afib. : Warfarin versus DOACs in the prevention of thromboembolic stroke in patients with Afib. — 2021, ? (DOI:10.5203/JCANPA.V3I7.900)
2. Oral anticoagulants for prevention of stroke in atrial fibrillation: systematic review, network meta-analysis, and cost effectiveness analysis — 2017, British medical journal (PMID:29183961 DOI:10.1136/bmj.j5058)
3. Oral anticoagulants for prevention of stroke in atrial fibrillation: systematic review, network meta-analysis, and cost effectiveness analysis — 2017, British medical journal (PMID:29203465 DOI:10.1136/bmj.j5631)
4. Direct-Acting Oral Anticoagulants vs. Warfarin for Preventing Strokes in Patients with Atrial Fibrillation — 2017, NEJM Journal Watch (DOI:10.1056/nejm-jw.NA45643)
5. Comparison of Oral Anticoagulants vs. Warfarin for Stroke Prevention in Atrial Fibrillation: A Meta-Analysis — 2024, Journal of Health and Rehabilitation Research (DOI:10.61919/jhrr.v4i3.1606)
6. Meta-Analysis of Safety and Efficacy of Direct Oral Anticoagulants Versus Warfarin According to Time in Therapeutic Range in Atrial Fibrillation. — 2020, American Journal of Cardiology (PMID:33189659 DOI:10.1016/j.amjcard.2020.10.064)
7. NOACs versus warfarin for stroke prevention in patients with AF: a systematic review and meta-analysis — 2016, Open Heart (PMID:26848392 DOI:10.1136/openhrt-2015-000279)
8. Comparative effectiveness and safety of direct oral anticoagulants versus vitamin K antagonists in nonvalvular atrial fibrillation: a Canadian multicentre observational cohort study. — 2020, CMAJ Open (PMID:33355273 DOI:10.9778/cmajo.20200055)
9. Direct Oral Anticoagulants Versus Warfarin in Patients With Atrial Fibrillation: Patient-Level Network Meta-Analyses of Randomized Clinical Trials With Interaction Testing by Age and Sex — 2022, Circulation (PMID:34985309 DOI:10.1161/CIRCULATIONAHA.121.056355)
10. Efficacy and Safety of Direct Oral Anticoagulants (DOACs) Versus Warfarin in Atrial Fibrillation Patients with Prior Stroke: a Systematic Review and Meta-analysis — 2022, Cardiovascular Drugs and Therapy (PMID:35467313 DOI:10.1007/s10557-022-07336-w)

### Engine B — top 10
1. Direct Oral Anticoagulants Versus Warfarin in Patients With Atrial Fibrillation: Patient-Level Network Meta-Analyses of Randomized Clinical Trials With Interaction Testing by Age and Sex. — 2022, Circulation (PMID:34985309 DOI:10.1161/CIRCULATIONAHA.121.056355)
2. Oral anticoagulants for prevention of stroke in atrial fibrillation: systematic review, network meta-analysis, and cost effectiveness analysis. — 2017, BMJ (PMID:29183961 DOI:10.1136/bmj.j5058)
3. Oral Anticoagulant Agents in Patients With Atrial Fibrillation and CKD: A Systematic Review and Pairwise Network Meta-analysis. — 2021, Am J Kidney Dis (PMID:33872690 DOI:10.1053/j.ajkd.2021.02.328)
4. Rationale and design of a randomized study comparing the Watchman FLX device to DOACs in patients with atrial fibrillation. — 2023, Am Heart J (PMID:37279840 DOI:10.1016/j.ahj.2023.05.022)
5. Continued vs. interrupted direct oral anticoagulants at the time of device surgery, in patients with moderate to high risk of arterial thrombo-embolic events (BRUISE CONTROL-2). — 2018, Eur Heart J (PMID:30462279 DOI:10.1093/eurheartj/ehy413)
6. Efficacy and Safety of Direct Oral Anticoagulants (DOACs) Versus Warfarin in Atrial Fibrillation Patients with Prior Stroke: a Systematic Review and Meta-analysis. — 2023, Cardiovasc Drugs Ther (PMID:35467313 DOI:10.1007/s10557-022-07336-w)
7. Comparative Effectiveness and Safety Between Apixaban, Dabigatran, Edoxaban, and Rivaroxaban Among Patients With Atrial Fibrillation : A Multinational Population-Based Cohort Study. — 2022, Ann Intern Med (PMID:36315950 DOI:10.7326/M22-0511)
8. Risks and benefits of direct oral anticoagulants versus warfarin in a real world setting: cohort study in primary care — 2018, BMJ (PMID:29973392 DOI:10.1136/bmj.k2505)
9. Asundexian versus Apixaban in Patients with Atrial Fibrillation — 2024, New England Journal of Medicine (PMID:39225267 DOI:10.1056/nejmoa2407105)
10. Association of Alternative Anticoagulation Strategies and Outcomes in Patients With Ischemic Stroke While Taking a Direct Oral Anticoagulant. — 2023, Neurology (PMID:37225430 DOI:10.1212/WNL.0000000000207422)

---

## Query: `exact-recovery-dex` — "Dexamethasone in Hospitalized Patients with Covid-19 RECOVERY"
Category: exact_paper. Intent: Retrieve the RECOVERY dexamethasone primary results paper.

**Must-have landmark papers (ground truth):**
- RECOVERY dexamethasone (Horby, NEJM 2021 / medRxiv 2020)

### Engine A — top 10
1. Dexamethasone in Hospitalized Patients with Covid-19. — 2021, N Engl J Med (PMID:32678530 DOI:10.1056/NEJMoa2021436)
2. Dexamethasone vs methylprednisolone high dose for Covid-19 pneumonia. — 2021, PLoS One (PMID:34033648 DOI:10.1371/journal.pone.0252057)
3. Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial — 2021, The Lancet (PMID:33933206 DOI:10.1016/s0140-6736(21)00676-0)
4. Pathophysiology, Transmission, Diagnosis, and Treatment of Coronavirus Disease 2019 (COVID-19): A Review. — 2020, JAMA (PMID:32648899 DOI:10.1001/jama.2020.12839)
5. Remdesivir for the Treatment of Covid-19 — Final Report — 2020, New England Journal of Medicine (PMID:32445440 DOI:10.1056/nejmoa2007764)
6. Are intravenous corticosteroid pulses superior to low dose corticosteroids in patients with severe COVID-19? — 2022, Eur Respir J (PMID:35777764 DOI:10.1183/13993003.01220-2022)
7. Baricitinib plus Remdesivir for Hospitalized Adults with Covid-19 — 2020, New England Journal of Medicine (PMID:33306283 DOI:10.1056/nejmoa2031994)
8. Higher dose corticosteroids in patients admitted to hospital with COVID-19 who are hypoxic but not requiring ventilatory support (RECOVERY): a randomised, controlled, open-label, platform trial. — 2023, Lancet (PMID:37060915 DOI:10.1016/S0140-6736(23)00510-X)
9. Lopinavir–ritonavir in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial — 2020, The Lancet (PMID:33031764 DOI:10.1016/s0140-6736(20)32013-4)
10. Effect of Tocilizumab vs Standard Care on Clinical Worsening in Patients Hospitalized With COVID-19 Pneumonia — 2020, JAMA Internal Medicine (PMID:33080005 DOI:10.1001/jamainternmed.2020.6615)

### Engine B — top 10
1. Effect of Dexamethasone in Hospitalized Patients with COVID-19: Preliminary Report — 2020, medRxiv (DOI:10.1101/2020.06.22.20137273)
2. Dexamethasone in Hospitalized Patients with Covid-19 — Preliminary Report — 2020, New England Journal of Medicine (PMID:32678530 DOI:10.1056/NEJMoa2021436)
3. Dexamethasone in Hospitalized Patients with Covid-19 — 2021, Romanian Archives of Microbiology and Immunology (— no id —)
4. Covid-19: Low dose steroid cuts death in ventilated patients by one third, trial finds — 2020, British medical journal (PMID:32546467 DOI:10.1136/bmj.m2422)
5. Dexamethasone in hospitalized patients with COVID-19 preliminary report: Discussions from the respirology and sleep Twitter journal club @respandsleepjc (#rsjc) — 2021, Canadian Journal of Respiratory Critical Care and Sleep Medicine (DOI:10.1080/24745332.2021.1920865)
6. Dexamethasone use and mortality in hospitalized patients with coronavirus disease 2019: A multicentre retrospective observational study — 2020, medRxiv (PMID:33608891 DOI:10.1111/bcp.14784)
7. Does dexamethasone have a role for hospitalized patients with COVID-19? — 2020, Pharmacy Today (DOI:10.1016/j.ptdy.2020.08.010)
8. From Other Journals — 2020, Emergency Medicine Australasia (PMID:33207398 DOI:10.1111/1742-6723.13676)
9. Dexamethasone for COVID-19: preliminary findings — 2020, Drug and therapeutics bulletin (PMID:32690491 DOI:10.1136/dtb.2020.000045)
10. The use of dexamethasone in the treatment of COVID-19 — 2020, Annals of Medicine and Surgery (PMID:32754312 DOI:10.1016/j.amsu.2020.07.004)

---

## Query: `exact-keynote-189` — "Pembrolizumab plus Chemotherapy in Metastatic Non-Small-Cell Lung Cancer"
Category: exact_paper. Intent: Retrieve the KEYNOTE-189 primary results paper.

**Must-have landmark papers (ground truth):**
- KEYNOTE-189 (Gandhi, NEJM 2018)

### Engine A — top 10
1. Pembrolizumab plus Chemotherapy in Metastatic Non-Small-Cell Lung Cancer. — 2018, N Engl J Med (PMID:29658856 DOI:10.1056/NEJMoa1801005)
2. Pembrolizumab plus Chemotherapy for Squamous Non-Small-Cell Lung Cancer. — 2018, N Engl J Med (PMID:30280635 DOI:10.1056/NEJMoa1810865)
3. Perioperative Pembrolizumab for Early-Stage Non-Small-Cell Lung Cancer. — 2023, N Engl J Med (PMID:37272513 DOI:10.1056/NEJMoa2302983)
4. Patient-reported outcomes following pembrolizumab or placebo plus pemetrexed and platinum in patients with previously untreated, metastatic, non-squamous non-small-cell lung cancer (KEYNOTE-189): a multicentre, double-blind, randomised, placebo-controlled, phase 3 trial. — 2020, Lancet Oncol (PMID:32035514 DOI:10.1016/S1470-2045(19)30801-0)
5. Tumor Treating Fields therapy with standard systemic therapy versus standard systemic therapy alone in metastatic non-small-cell lung cancer following progression on or after platinum-based therapy (LUNAR): a randomised, open-label, pivotal phase 3 study. — 2023, Lancet Oncol (PMID:37657460 DOI:10.1016/S1470-2045(23)00344-3)
6. Pemetrexed plus platinum with or without pembrolizumab in patients with previously untreated metastatic nonsquamous NSCLC: protocol-specified final analysis from KEYNOTE-189. — 2021, Ann Oncol (PMID:33894335 DOI:10.1016/j.annonc.2021.04.008)
7. Comparison of platinum combination chemotherapy plus pembrolizumab versus platinum combination chemotherapy plus nivolumab-ipilimumab for treatment-naive advanced non-small-cell lung cancer in Japan (JCOG2007): an open-label, multicentre, randomised, phase 3 trial. — 2024, Lancet Respir Med (PMID:39159638 DOI:10.1016/S2213-2600(24)00185-1)
8. Subcutaneous versus intravenous pembrolizumab, in combination with chemotherapy, for treatment of metastatic non-small-cell lung cancer: the phase III 3475A-D77 trial. — 2025, Ann Oncol (PMID:40157574 DOI:10.1016/j.annonc.2025.03.012)
9. Updated Analysis From KEYNOTE-189: Pembrolizumab or Placebo Plus Pemetrexed and Platinum for Previously Untreated Metastatic Nonsquamous Non-Small-Cell Lung Cancer. — 2020, J Clin Oncol (PMID:32150489 DOI:10.1200/JCO.19.03136)
10. Atezolizumab for First-Line Treatment of Metastatic Nonsquamous NSCLC — 2018, New England Journal of Medicine (PMID:29863955 DOI:10.1056/nejmoa1716948)

### Engine B — top 10
1. Pembrolizumab plus Chemotherapy in Metastatic Non–Small‐Cell Lung Cancer — 2018, New England Journal of Medicine (PMID:29658856 DOI:10.1056/NEJMoa1801005)
2. Pembrolizumab plus Chemotherapy for Squamous Non–Small‐Cell Lung Cancer — 2018, New England Journal of Medicine (PMID:30280635 DOI:10.1056/NEJMoa1810865)
3. Pembrolizumab Plus Chemotherapy in Patients With Previously Untreated Metastatic Non–small Cell Lung Cancer Without EGFR or ALK Mutations is Superior to Chemotherapy Alone — 2018, Clinical Pulmonary Medicine (DOI:10.1097/CPM.0000000000000274)
4. Carboplatin and pemetrexed with or without pembrolizumab for advanced, non-squamous non-small-cell lung cancer: a randomised, phase 2 cohort of the open-label KEYNOTE-021 study — 2016, The Lancet Oncology (PMID:27745820 DOI:10.1016/S1470-2045(16)30498-3)
5. Pembrolizumab for Metastatic Non–Small-Cell Lung Cancer — 2018, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA46557)
6. First-line Pembrolizumab Versus Pembrolizumab Plus Chemotherapy Versus Chemotherapy Alone in Non-small-cell Lung Cancer: A Systematic Review and Network Meta-analysis. — 2019, Clinical Lung Cancer (PMID:31164319 DOI:10.1016/J.CLLC.2019.05.009)
7. Pembrolizumab Alone or with Chemotherapy for Metastatic Non-Small-Cell Lung Cancer: A Systematic Review and Network Meta-Analysis. — 2022, Critical reviews in oncology/hematology (PMID:35341985 DOI:10.1016/j.critrevonc.2022.103660)
8. Final analysis of KEYNOTE-189: Pemetrexed-platinum chemotherapy (chemo) with or without pembrolizumab (pembro) in patients (pts) with previously untreated metastatic nonsquamous non-small cell lung cancer (NSCLC). — 2020, Journal of Clinical Oncology (DOI:10.1200/jco.2020.38.15_suppl.9582)
9. More Evidence on Pembrolizumab for Metastatic Non–Small-Cell Lung Cancer — 2021, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA53627)
10. Pembrolizumab (Keytruda®) in combination with chemotherapy for the treatment of metastatic non-small-cell lung cancer (NSCLC) — 2018, ? (— no id —)

---

## Query: `acronym-dapa-hf` — "DAPA-HF trial"
Category: trial_acronym. Intent: Resolve the DAPA-HF acronym to the dapagliflozin HFrEF trial + key follow-ups.

**Must-have landmark papers (ground truth):**
- DAPA-HF (McMurray, NEJM 2019)

### Engine A — top 10
1. DAPA-HF trial: dapagliflozin evolves from a glucose-lowering agent to a therapy for heart failure — 2020, Drugs in Context (PMID:32165892 DOI:10.7573/dic.2019-11-3)
2. Two Tales: One Story. EMPEROR-Reduced and DAPA-HF. — 2020, Circulation (PMID:32969716 DOI:10.1161/CIRCULATIONAHA.120.051122)
3. A trial to evaluate the effect of the sodium–glucose co‐transporter 2 inhibitor dapagliflozin on morbidity and mortality in patients with heart failure and reduced left ventricular ejection fraction (DAPA‐HF) — 2019, European Journal of Heart Failure (PMID:30895697 DOI:10.1002/ejhf.1432)
4. The DAPA-HF Trial: A Momentous Victory in the War against Heart Failure. — 2019, Cell Metabolism (PMID:31693879 DOI:10.1016/j.cmet.2019.10.008)
5. Effect of dapagliflozin on ventricular arrhythmias, resuscitated cardiac arrest, or sudden death in DAPA-HF — 2021, European Heart Journal (PMID:34448003 DOI:10.1093/eurheartj/ehab560)
6. The Dapagliflozin And Prevention of Adverse‐outcomes in Heart Failure (DAPA‐HF) trial: baseline characteristics — 2019, European Journal of Heart Failure (PMID:31309699 DOI:10.1002/ejhf.1548)
7. Effect of Dapagliflozin in Patients With HFrEF Treated With Sacubitril/Valsartan: The DAPA-HF Trial. — 2020, JACC. Heart failure (PMID:32653447 DOI:10.1016/J.JCHF.2020.04.008)
8. Effects of dapagliflozin in DAPA-HF according to background heart failure therapy — 2020, European Heart Journal (PMID:32221582 DOI:10.1093/eurheartj/ehaa183)
9. Rationale and design of the DAPA-MI trial: Dapagliflozin in patients without diabetes mellitus with acute myocardial infarction. — 2023, American Heart Journal (PMID:37648579 DOI:10.1016/j.ahj.2023.08.008)
10. Evidence-based Appraisal of the DAPA-HF Trial — 2020, Journal of contemporary pharmacy practice (DOI:10.37901/jcphp20-00011)

### Engine B — top 10
1. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction. — 2019, N Engl J Med (PMID:31535829 DOI:10.1056/NEJMoa1911303)
2. Estimating lifetime benefits of comprehensive disease-modifying pharmacological therapies in patients with heart failure with reduced ejection fraction: a comparative analysis of three randomised controlled trials. — 2020, Lancet (PMID:32446323 DOI:10.1016/S0140-6736(20)30748-0)
3. A Trial to Evaluate the Effect of the Sodium–Glucose Co-Transporter 2 Inhibitor Dapagliflozin on Morbidity and Mortality in Patients with Heart Failure and Reduced Left Ventricular Ejection Fraction (DAPA-HF) — 2019, European Journal of Heart Failure (PMID:30895697 DOI:10.1002/ejhf.1432)
4. Serial Assessment of High-Sensitivity Cardiac Troponin and the Effect of Dapagliflozin in Patients With Heart Failure With Reduced Ejection Fraction: An Analysis of the DAPA-HF Trial — 2021, Circulation (PMID:34743554 DOI:10.1161/circulationaha.121.057852)
5. EuroQol 5-Dimension Questionnaire in Heart&#xa0;Failure With Reduced, Mildly Reduced, and Preserved Ejection Fraction: A Patient-Level Analysis of DAPA-HF and DELIVER. — 2025, JACC Heart Fail (PMID:39909641 DOI:10.1016/j.jchf.2024.10.020)
6. A hierarchical kidney outcome using win statistics in patients with heart failure from the DAPA-HF and DELIVER trials. — 2024, Nat Med (PMID:38710952 DOI:10.1038/s41591-024-02941-8)
7. Projecting the benefit of vericiguat in PARADIGM-HF and DAPA-HF populations: Insights from the VICTORIA trial. — 2025, ESC Heart Fail (PMID:39434631 DOI:10.1002/ehf2.15134)
8. Acute Reno-Cardiac Action of Dapagliflozin In Advanced Heart Failure Patients on Heart Transplant Waiting List: a Multicenter, Double-blind, Randomized Clinical Trial. — 2022, Hospices Civils de Lyon (— no id —)
9. DAPA-HF trial: dapagliflozin evolves from a glucose-lowering agent to a therapy for heart failure. — 2020, Drugs Context (PMID:32165892 DOI:10.7573/dic.2019-11-3)
10. Effect of dapagliflozin on anaemia in DAPA-HF. — 2021, Eur J Heart Fail (PMID:33615642 DOI:10.1002/ejhf.2132)

---

## Query: `acronym-partner-3` — "PARTNER 3 trial"
Category: trial_acronym. Intent: Resolve PARTNER 3 to the balloon-expandable TAVR low-risk RCT and its follow-ups.

**Must-have landmark papers (ground truth):**
- PARTNER 3 (Mack/Leon, NEJM 2019)

### Engine A — top 10
1. Transcatheter Aortic-Valve Replacement with a Balloon-Expandable Valve in Low-Risk Patients. — 2019, N Engl J Med (PMID:30883058 DOI:10.1056/NEJMoa1814052)
2. Effect of a structural intervention for the prevention of intimate-partner violence and HIV in rural South Africa: a cluster randomised trial — 2006, The Lancet (PMID:17141704 DOI:10.1016/s0140-6736(06)69744-4)
3. Safety and immunogenicity of the ChAdOx1 nCoV-19 vaccine against SARS-CoV-2: a preliminary report of a phase 1/2, single-blind, randomised controlled trial — 2020, The Lancet (PMID:32702298 DOI:10.1016/s0140-6736(20)31604-4)
4. Five- Year Outcomes in Low-Risk Patients Undergoing Surgery in the PARTNER 3 Trial. — 2025, Ann Thorac Surg (PMID:39694217 DOI:10.1016/j.athoracsur.2024.11.025)
5. Late Clinical Outcomes of Balloon-Expandable Valves in Small&#xa0;Annuli: Results From the PARTNER Trials. — 2025, JACC Cardiovasc Interv (PMID:40010919 DOI:10.1016/j.jcin.2024.11.006)
6. CONSORT 2010 Statement: updated guidelines for reporting parallel group randomised trials — 2010, BMC Medicine (PMID:20334633 DOI:10.1186/1741-7015-8-18)
7. Consort 2010 statement: extension to cluster randomised trials — 2012, BMJ (PMID:22951546 DOI:10.1136/bmj.e5661)
8. FOLFIRI plus cetuximab versus FOLFIRI plus bevacizumab as first-line treatment for patients with metastatic colorectal cancer (FIRE-3): a randomised, open-label, phase 3 trial — 2014, The Lancet Oncology (PMID:25088940 DOI:10.1016/s1470-2045(14)70330-4)
9. Randomized, Controlled Intervention Trial of Male Circumcision for Reduction of HIV Infection Risk: The ANRS 1265 Trial — 2005, PLoS Medicine (PMID:16231970 DOI:10.1371/journal.pmed.0020298)
10. CONSORT statement: extension to cluster randomised trials — 2004, BMJ (PMID:15031246 DOI:10.1136/bmj.328.7441.702)

### Engine B — top 10
1. Prevention of HIV-1 Infection with Early Antiretroviral Therapy — 2011, Journal of family planning and reproductive health care (PMID:21767103 DOI:10.1136/jfprhc-2012-100379)
2. Partners of people on ART - a New Evaluation of the Risks (The PARTNER study): design and methods — 2012, BMC Public Health (PMID:22520171 DOI:10.1186/1471-2458-12-296)
3. Risk of HIV transmission through condomless sex in serodifferent gay couples with the HIV-positive partner taking suppressive antiretroviral therapy (PARTNER): final results of a multicentre, prospective, observational study — 2019, The Lancet (PMID:31056293 DOI:10.1016/S0140-6736(19)30418-0)
4. A Review of the Partner Trials. — 2020, Interventional Cardiology Clinics (PMID:32921370 DOI:10.1016/j.iccl.2020.07.002)
5. Motivational Interviewing to Reduce Drug Use and HIV Incidence Among Young Men Who Have Sex With Men in Relationships and Are High Priority for Pre-Exposure Prophylaxis (Project PARTNER): Randomized Controlled Trial Protocol — 2019, JMIR Research Protocols (PMID:31274114 DOI:10.2196/13015)
6. PREVENTION No HIV transmissions with undetectable viral load : interim PARTNER study results show need for longer follow-up — 2014, ? (— no id —)
7. A comprehensive review of the PARTNER trial. — 2013, Journal of Thoracic and Cardiovascular Surgery (PMID:23410766 DOI:10.1016/j.jtcvs.2012.11.051)
8. Antiretroviral treatment can reduce the risk of HIV transmission between male partners to ‘zero’ — 2019, British medical journal (PMID:31455630 DOI:10.1136/bmj.l4915)
9. The Placement of Aortic Transcatheter Valve (PARTNER) trial: clinical trialist perspective. — 2012, Circulation (PMID:22733337 DOI:10.1161/CIRCULATIONAHA.112.093070)
10. U=U gains strength with release of PARTNER2 data. — 2019, AIDS (London) (PMID:30702512 DOI:10.1097/QAD.0000000000002098)

---

## Query: `acronym-keynote-189` — "KEYNOTE-189"
Category: trial_acronym. Intent: Resolve KEYNOTE-189 to the pembrolizumab+chemo NSCLC trial.

**Must-have landmark papers (ground truth):**
- KEYNOTE-189 (Gandhi, NEJM 2018)

### Engine A — top 10
1. A new era of treating advanced lung cancer is upon us. — 2018, Translational Lung Cancer Research (PMID:30393601 DOI:10.21037/tlcr.2018.07.03)
2. The KEYNOTE-189 trial as a new paradigm making cure a reality for metastatic non-squamous non-small cell lung cancer — 2020, Translational Lung Cancer Research (PMID:33209640 DOI:10.21037/tlcr-20-874)
3. Updated Analysis From KEYNOTE-189: Pembrolizumab or Placebo Plus Pemetrexed and Platinum for Previously Untreated Metastatic Nonsquamous Non-Small-Cell Lung Cancer. — 2020, Journal of Clinical Oncology (PMID:32150489 DOI:10.1200/JCO.19.03136)
4. Phase III KEYNOTE-590 study of chemotherapy + pembrolizumab versus chemotherapy + placebo as first-line therapy for patients (Pts) with advanced esophageal or esophagogastric junction (E/EGJ) cancer. — 2018, Annals of Oncology (PMID:32136612 DOI:10.1093/ANNONC/MDY282.168)
5. Abstract CT075: KEYNOTE-189: Randomized, double-blind, phase 3 study of pembrolizumab (pembro) or placebo plus pemetrexed (pem) and platinum as first-line therapy for metastatic NSCLC — 2018, Clinical Trials (DOI:10.1158/1538-7445.AM2018-CT075)
6. P-38 KEYNOTE-859: A randomized, double-blind, placebo-controlled phase 3 trial of first-line pembrolizumab plus chemotherapy in patients with advanced gastric or gastroesophageal junction adenocarcinoma — 2020, Annals of Oncology (DOI:10.1016/j.annonc.2020.04.120)
7. Phase 3 study of platinum-based chemotherapy with or without pembrolizumab for first-line metastatic, nonsquamous non-small cell lung carcinoma (NSCLC): KEYNOTE-189. — 2016, Journal of Clinical Oncology (DOI:10.1200/JCO.2016.34.15_SUPPL.TPS9104)
8. Phase III KEYNOTE-789 Study of Pemetrexed and Platinum With or Without Pembrolizumab for Tyrosine Kinase Inhibitor‒Resistant, EGFR–Mutant, Metastatic Nonsquamous Non–Small Cell Lung Cancer — 2024, Journal of Clinical Oncology (PMID:39173098 DOI:10.1200/JCO.23.02747)
9. Merck’s KEYTRUDA® (pembrolizumab) Plus Pemetrexed (ALIMTA®) and Platinum Chemotherapy Reduced the Risk of Death by Half Compared with Chemotherapy Alone as First-Line Treatment for Advanced Nonsquamous NSCLC in Phase 3 KEYNOTE-189 Study — 2019, ? (— no id —)
10. P1.01-107 KEYNOTE-495/KeyImPaCT: Phase 2 Biomarker-Directed Study of Pembrolizumab-Based Therapy for Non–Small Cell Lung Cancer — 2019, Journal of Thoracic Oncology (DOI:10.1016/j.jtho.2019.08.822)

### Engine B — top 10
1. Pembrolizumab plus Chemotherapy in Metastatic Non-Small-Cell Lung Cancer. — 2018, N Engl J Med (PMID:29658856 DOI:10.1056/NEJMoa1801005)
2. Updated Analysis From KEYNOTE-189: Pembrolizumab or Placebo Plus Pemetrexed and Platinum for Previously Untreated Metastatic Nonsquamous Non-Small-Cell Lung Cancer. — 2020, J Clin Oncol (PMID:32150489 DOI:10.1200/JCO.19.03136)
3. Pemetrexed plus platinum with or without pembrolizumab in patients with previously untreated metastatic nonsquamous NSCLC: protocol-specified final analysis from KEYNOTE-189. — 2021, Ann Oncol (PMID:33894335 DOI:10.1016/j.annonc.2021.04.008)
4. Patient-reported outcomes following pembrolizumab or placebo plus pemetrexed and platinum in patients with previously untreated, metastatic, non-squamous non-small-cell lung cancer (KEYNOTE-189): a multicentre, double-blind, randomised, placebo-controlled, phase 3 trial. — 2020, Lancet Oncol (PMID:32035514 DOI:10.1016/S1470-2045(19)30801-0)
5. Pembrolizumab plus pemetrexed-platinum for metastatic nonsquamous non-small-cell lung cancer: KEYNOTE-189 Japan Study. — 2021, Cancer Sci (PMID:34036692 DOI:10.1111/cas.14980)
6. KEYNOTE-189: Updated OS and progression after the next line of therapy (PFS2) with pembrolizumab (pembro) plus chemo with pemetrexed and platinum vs placebo plus chemo for metastatic nonsquamous NSCLC. — 2019, Journal of Clinical Oncology (DOI:10.1200/jco.2019.37.15_suppl.9013)
7. A Randomized, Double-Blind, Phase III Study of Platinum+Pemetrexed Chemotherapy With or Without Pembrolizumab (MK-3475) in First Line Metastatic Non-squamous Non-small Cell Lung Cancer Subjects (KEYNOTE-189) — 2016, Merck Sharp & Dohme LLC (— no id —)
8. Evaluation of blood TMB (bTMB) in KEYNOTE-189: Pembrolizumab (pembro) plus chemotherapy (chemo) with pemetrexed and platinum versus placebo plus chemo as first-line therapy for metastatic nonsquamous NSCLC. — 2020, Journal of Clinical Oncology (DOI:10.1200/jco.2020.38.15_suppl.9521)
9. Final analysis of KEYNOTE-189: Pemetrexed-platinum chemotherapy (chemo) with or without pembrolizumab (pembro) in patients (pts) with previously untreated metastatic nonsquamous non-small cell lung cancer (NSCLC). — 2020, Journal of Clinical Oncology (DOI:10.1200/jco.2020.38.15_suppl.9582)
10. Abstract CT043: Outcomes among patients (pts) with metastatic nonsquamous NSCLC with liver metastases or brain metastases treated with pembrolizumab (pembro) plus pemetrexed-platinum: Results from the KEYNOTE-189 study — 2019, Cancer Research (DOI:10.1158/1538-7445.am2019-ct043)

---

## Query: `acronym-sprint` — "SPRINT trial intensive blood pressure control"
Category: trial_acronym. Intent: Resolve SPRINT to the intensive vs standard BP RCT (and final report).

**Must-have landmark papers (ground truth):**
- SPRINT (Wright, NEJM 2015) / final report (NEJM 2021)

### Engine A — top 10
1. Final Report of a Trial of Intensive versus Standard Blood-Pressure Control — 2021, New England Journal of Medicine (PMID:34010531 DOI:10.1056/NEJMoa1901281)
2. The design and rationale of a multi-center clinical trial comparing two strategies for control of systolic blood pressure: The Systolic Blood Pressure Intervention Trial (SPRINT) — 2014, Clinical Trials (PMID:24902920 DOI:10.1177/1740774514537404)
3. [The SPRINT Research. A Randomized Trial of Intensive versus Standard Blood-Pressure Control]. — 2016, Vnitrni lekarstvi (PMID:26967236)
4. Longer-Term All-Cause and Cardiovascular Mortality With Intensive Blood Pressure Control: A Secondary Analysis of a Randomized Clinical Trial. — 2022, JAMA cardiology (PMID:36223105 DOI:10.1001/jamacardio.2022.3345)
5. Abstract 15507: Effect of Intensive Blood Pressure Control on Residual Lifespan in the SPRINT Trial — 2019, Circulation (— no id —)
6. Heterogeneity of treatment effect in SPRINT by age and baseline comorbidities: The greatest impact of intensive blood pressure treatment is observed among younger patients without CKD or CVD and in older patients with CKD or CVD — 2020, The Journal of Clinical Hypertension (PMID:33460256 DOI:10.1111/jch.13955)
7. Cost-Effectiveness of Intensive versus Standard Blood-Pressure Control — 2017, New England Journal of Medicine (PMID:28834469 DOI:10.1056/NEJMsa1616035)
8. SP 05-1 SHOULD THE TARGET FOR BLOOD PRESSURE REDUCTION BE LOWER IN ADULTS WITH HYPERTENSION AND A HISTORY OF CARDIOVASCULAR DISEASE — 2016, Journal of Hypertension (PMID:27643145 DOI:10.1097/01.hjh.0000500968.46164.4d)
9. Successes of SPRINT, but Still Some Hurdles to Cross. — 2016, HYPERTENSION (PMID:26556815 DOI:10.1161/HYPERTENSIONAHA.115.06725)
10. SP 05-1 SHOULD THE TARGET FOR BLOOD PRESSURE REDUCTION BE LOWER IN ADULTS WITH HYPERTENSION AND A HISTORY OF CARDIOVASCULAR DISEASE. — 2016, Journal of Hypertension (PMID:27754188)

### Engine B — top 10
1. Final Report of a Trial of Intensive versus Standard Blood-Pressure Control. — 2021, N Engl J Med (PMID:34010531 DOI:10.1056/NEJMoa1901281)
2. A Randomized Trial of Intensive versus Standard Blood-Pressure Control. — 2015, N Engl J Med (PMID:26551272 DOI:10.1056/NEJMoa1511939)
3. Association of Intensive vs Standard Blood Pressure Control With Cerebral White Matter Lesions. — 2019, JAMA (PMID:31408137 DOI:10.1001/jama.2019.10551)
4. A Randomized Trial of Intensive versus Standard Blood-Pressure Control — 2016, New England Journal of Medicine (PMID:27276569 DOI:10.1056/nejmc1602668)
5. Influence of Baseline Diastolic Blood Pressure on Effects of Intensive Compared With Standard Blood Pressure Control — 2017, Circulation (PMID:29021322 DOI:10.1161/circulationaha.117.030848)
6. Effect of Intensive vs Standard Blood Pressure Control on Probable Dementia: A Randomized Clinical Trial. — 2019, JAMA (PMID:30688979 DOI:10.1001/jama.2018.21442)
7. Diastolic Blood Pressure and Intensive Blood Pressure Control on Cognitive Outcomes: Insights From the SPRINT MIND Trial. — 2023, Hypertension (PMID:36688305 DOI:10.1161/HYPERTENSIONAHA.122.20112)
8. Systolic Blood Pressure Time in Target Range and Cardiovascular Outcomes in Patients With Hypertension. — 2021, J Am Coll Cardiol (PMID:33706870 DOI:10.1016/j.jacc.2021.01.014)
9. Effect of Intensive Blood Pressure Control on Kidney Outcomes: Long-Term Electronic Health Record-Based Post-Trial Follow-Up of SPRINT. — 2024, Clin J Am Soc Nephrol (PMID:37883184 DOI:10.2215/CJN.0000000000000335)
10. Effects of Intensive BP Control in CKD. — 2017, J Am Soc Nephrol (PMID:28642330 DOI:10.1681/ASN.2017020148)

---

## Query: `broad-hfref-management` — "management of heart failure with reduced ejection fraction"
Category: broad_clinical. Intent: Overview of guideline-directed medical therapy for HFrEF; expect guidelines + landmark RCTs + SRs on top.

### Engine A — top 10
1. Management of heart failure with reduced ejection fraction — 2022, Heart (PMID:35973784 DOI:10.1136/heartjnl-2020-318811)
2. The Effect of Digoxin on Mortality and Morbidity in Patients with Heart Failure — 1997, New England Journal of Medicine (PMID:9036306 DOI:10.1056/nejm199702203360801)
3. Patiromer for the management of hyperkalemia in heart failure with reduced ejection fraction: the DIAMOND trial — 2022, European Heart Journal (PMID:35900838 DOI:10.1093/eurheartj/ehac401)
4. Medical Therapy for Heart Failure With&#xa0;Reduced Ejection Fraction: The CHAMP-HF Registry. — 2018, J Am Coll Cardiol (PMID:30025570 DOI:10.1016/j.jacc.2018.04.070)
5. Epidemiology and one-year outcomes in patients with chronic heart failure and preserved, mid-range and reduced ejection fraction: an analysis of the ESC Heart Failure Long-Term Registry. — 2017, Eur J Heart Fail (PMID:28386917 DOI:10.1002/ejhf.813)
6. Clinical management and therapeutic optimization of patients with heart failure with reduced ejection fraction and low blood pressure. A clinical consensus statement of the Heart Failure Association (HFA) of the ESC. — 2025, Eur J Heart Fail (PMID:40012353 DOI:10.1002/ejhf.3618)
7. The Effect of Spironolactone on Morbidity and Mortality in Patients with Severe Heart Failure — 1999, New England Journal of Medicine (PMID:10471456 DOI:10.1056/nejm199909023411001)
8. Medical Management of Heart Failure With Reduced Ejection Fraction in Patients With Advanced Renal Disease. — 2019, JACC Heart Fail (PMID:31047016 DOI:10.1016/j.jchf.2019.02.009)
9. Heart Failure with Preserved and Reduced Ejection Fraction in Hemodialysis Patients: Prevalence, Disease Prediction and Prognosis — 2017, Kidney & Blood Pressure Research (PMID:28395286 DOI:10.1159/000473868)
10. How to diagnose diastolic heart failure: a consensus statement on the diagnosis of heart failure with normal left ventricular ejection fraction by the Heart Failure and Echocardiography Associations of the European Society of Cardiology — 2007, European Heart Journal (PMID:17428822 DOI:10.1093/eurheartj/ehm037)

### Engine B — top 10
1. Heart Failure With Reduced Ejection Fraction: A Review. — 2020, Journal of the American Medical Association (JAMA) (PMID:32749493 DOI:10.1001/jama.2020.10262)
2. Management of heart failure with reduced ejection fraction — 2022, Heart (PMID:35973784 DOI:10.1136/heartjnl-2020-318811)
3. Management of Heart Failure with Reduced Ejection Fraction. — 2023, Current problems in cardiology (PMID:36681212 DOI:10.1016/j.cpcardiol.2023.101596)
4. Heart Failure. — 2015, South Dakota medicine : the journal of the South Dakota State Medical Association (PMID:26489162 DOI:10.1016/B978-012406061-6/50066-7)
5. Heart failure with reduced ejection fraction. — 2025, The Lancet (PMID:41319669 DOI:10.1016/s0140-6736(25)01851-3)
6. Medical Management of Patients With Heart Failure and Reduced Ejection Fraction — 2022, Korean Circulation Journal (PMID:35257531 DOI:10.4070/kcj.2021.0401)
7. A Practical Guide for the Treatment of Symptomatic Heart Failure with Reduced Ejection Fraction (HFrEF) — 2014, Current Cardiology Reviews (PMID:24251455 DOI:10.2174/1574884708666131117125508)
8. The Pathophysiology and New Advancements in the Pharmacologic and Exercise-Based Management of Heart Failure With Reduced Ejection Fraction: A Narrative Review — 2023, Cureus (PMID:37868488 DOI:10.7759/cureus.45719)
9. Heart Failure Due to Reduced Ejection Fraction: Medical Management. — 2017, American Family Physician (PMID:28075105)
10. Heart Failure With Reduced Ejection Fraction: Medical Management. — 2025, American Family Physician (PMID:40834370)

---

## Query: `broad-cap-treatment` — "treatment of community-acquired pneumonia in adults"
Category: broad_clinical. Intent: Guideline-level management of CAP; expect IDSA/ATS guidance and SRs near the top.

### Engine A — top 10
1. Community-Acquired Pneumonia in Adults: Diagnosis and Management. — 2016, American Family Physician (PMID:27929242)
2. Diagnosis and Treatment of Adults With Community-Acquired Pneumonia. — 2020, Journal of the American Medical Association (JAMA) (PMID:32027358 DOI:10.1001/jama.2019.21118)
3. Diagnosis and management of community-acquired pneumonia in adults. — 2011, American Family Physician (— no id —)
4. [Guidelines for management of community-acquired pneumonia in adults]. — 2015, Medicina (PMID:26339883)
5. Clinical practice guideline for the management of community-acquired pneumonia — 2023, ? (— no id —)
6. Diagnosis and management of community-acquired pneumonia in adults. — 2011, American Family Physician (PMID:21661712)
7. Guidelines for diagnosis and management of community- and hospital-acquired pneumonia in adults: Joint ICS/NCCP(I) recommendations — 2012, Lung India (PMID:23019384 DOI:10.4103/0970-2113.99248)
8. NEUMONÍA ADQUIRIDA DE LA COMUNIDAD EN ADULTOS. RECOMENDACIONES SOBRE SU ATENCIÓN — 2015, Medicina-buenos Aires (— no id —)
9. Community-acquired pneumonia in adults: initial antibiotic therapy. — 1997, American Family Physician (PMID:9262534)
10. Summary for Clinicians: Clinical Practice Guideline for the Diagnosis and Treatment of Community-acquired Pneumonia. — 2019, Annals of the American Thoracic Society (PMID:31770496 DOI:10.1513/annalsats.201909-704cme)

### Engine B — top 10
1. Treatment of Community-Acquired Pneumonia in Immunocompromised Adults — 2020, CHEST Journal (PMID:32561442 DOI:10.1016/j.chest.2020.05.598)
2. Effect of hydrocortisone on mortality in patients with severe community-acquired pneumonia : The REMAP-CAP Corticosteroid Domain Randomized Clinical Trial. — 2025, Intensive Care Med (PMID:40261382 DOI:10.1007/s00134-025-07861-w)
3. A Study Evaluating the Efficacy, Safety, and Tolerability of Ertapenem versus Ceftriaxone for the Treatment of Community‐Acquired Pneumonia in Adults — 2002, Clinical Infectious Diseases (PMID:11914996 DOI:10.1086/339543)
4. A multicenter, randomized study comparing the efficacy and safety of intravenous and/or oral levofloxacin versus ceftriaxone and/or cefuroxime axetil in treatment of adults with community-acquired pneumonia — 1997, Antimicrobial Agents and Chemotherapy (PMID:9303395 DOI:10.1128/aac.41.9.1965)
5. Ertapenem versus ceftriaxone for the treatment of community-acquired pneumonia in adults: combined analysis of two multicentre randomized, double-blind studies — 2004, Journal of Antimicrobial Chemotherapy (PMID:15150184 DOI:10.1093/jac/dkh207)
6. Predicting benefit from adjuvant therapy with corticosteroids in community-acquired pneumonia: a data-driven analysis of randomised trials. — 2025, Lancet Respir Med (PMID:39892408 DOI:10.1016/S2213-2600(24)00405-3)
7. A Pragmatic Trial of Glucocorticoids for Community-Acquired Pneumonia. — 2025, N Engl J Med (PMID:41159889 DOI:10.1056/NEJMoa2507100)
8. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America — 2019, American Journal of Respiratory and Critical Care Medicine (PMID:31573350 DOI:10.1164/rccm.201908-1581st)
9. Effect of Metagenomic Next-Generation Sequencing on Clinical Outcomes of Patients With Severe Community-Acquired Pneumonia in the ICU: A Multicenter, Randomized Controlled Trial. — 2025, Chest (PMID:39067508 DOI:10.1016/j.chest.2024.07.144)
10. Diagnosis and Management of Community-acquired Pneumonia: An Official American Thoracic Society Clinical Practice Guideline. — 2026, Am J Respir Crit Care Med (PMID:40679934 DOI:10.1164/rccm.202507-1692ST)

---

## Query: `broad-af-anticoagulation` — "anticoagulation for stroke prevention in atrial fibrillation"
Category: broad_clinical. Intent: Overview of DOAC/warfarin anticoagulation in AF; expect landmark DOAC RCTs + guidelines.

### Engine A — top 10
1. Anticoagulation for Stroke Prevention in Atrial Fibrillation. — 2023, Nurs Clin North Am (PMID:37536787 DOI:10.1016/j.cnur.2023.05.005)
2. Rivaroxaban versus Warfarin in Nonvalvular Atrial Fibrillation — 2011, New England Journal of Medicine (PMID:21830957 DOI:10.1056/nejmoa1009638)
3. Prospective cohort study to determine if trial efficacy of anticoagulation for stroke prevention in atrial fibrillation translates into clinical effectiveness — 2000, BMJ (PMID:10797031 DOI:10.1136/bmj.320.7244.1236)
4. Perioperative Bridging Anticoagulation in Patients with Atrial Fibrillation — 2015, New England Journal of Medicine (PMID:26095867 DOI:10.1056/nejmoa1501035)
5. Risk Factors for Stroke and Efficacy of Antithrombotic Therapy in Atrial Fibrillation — 1994, Archives of Internal Medicine (DOI:10.1001/archinte.1994.00420130036007)
6. Anticoagulation Therapy for Stroke Prevention in Atrial Fibrillation — 2003, JAMA (PMID:14645310 DOI:10.1001/jama.290.20.2685)
7. Clopidogrel plus aspirin versus oral anticoagulation for atrial fibrillation in the Atrial fibrillation Clopidogrel Trial with Irbesartan for prevention of Vascular Events (ACTIVE W): a randomised controlled trial — 2006, The Lancet (PMID:16765759 DOI:10.1016/s0140-6736(06)68845-4)
8. Apixaban in Patients with Atrial Fibrillation — 2011, New England Journal of Medicine (PMID:21309657 DOI:10.1056/nejmoa1007432)
9. 2016 ESC Guidelines for the management of atrial fibrillation developed in collaboration with EACTS — 2016, European Heart Journal (PMID:27567408 DOI:10.1093/eurheartj/ehw210)
10. Atrial Fibrillation: A Review. — 2025, JAMA (PMID:39680399 DOI:10.1001/jama.2024.22451)

### Engine B — top 10
1. Prevention of Stroke in Patients with Atrial Fibrillation — 2005, Seminars in Vascular Medicine (PMID:16123916 DOI:10.1055/s-2005-916168)
2. Antithrombotic Therapy To Prevent Stroke in Patients with Atrial Fibrillation — 2000, Annals of Internal Medicine (DOI:10.7326/0003-4819-132-10-200005160-00017)
3. Anticoagulation Therapy for Atrial Fibrillation — 2013, Seminars in Thrombosis and Hemostasis (PMID:23397554 DOI:10.1055/s-0033-1334812)
4. The increasing need for anticoagulant therapy to prevent stroke in patients with atrial fibrillation. — 2004, Mayo Clinic proceedings (PMID:15244388 DOI:10.4065/79.7.904)
5. Antithrombotic therapy in atrial fibrillation. — 1996, Canadian family physician Medecin de famille canadien (PMID:8754703)
6. Anticoagulation for Stroke Prevention in Patients with Atrial Fibrillation: A Review of the Literature and Current Guidelines — 2025, Reviews in cardiovascular medicine (PMID:40630456 DOI:10.31083/RCM39233)
7. Anticoagulation strategies for stroke prevention in atrial fibrillation: a comprehensive review of current literature — 2025, Annals of Medicine and Surgery (PMID:40486638 DOI:10.1097/MS9.0000000000003364)
8. Anticoagulation for atrial fibrillation: epidemiology informing a difficult clinical decision. — 1996, Proceedings of the Association of American Physicians (PMID:8834062)
9. Which drug should we use for stroke prevention in atrial fibrillation? — 2014, Current Opinion in Cardiology (PMID:25029448 DOI:10.1097/HCO.0000000000000065)
10. Stroke prevention in atrial fibrillation — 1997, British medical journal (PMID:9186155 DOI:10.1136/bmj.314.7094.1563)

---

## Query: `pico-egdt-septic-shock` — "In patients with septic shock, does early goal-directed therapy versus usual care improve mortality?"
Category: pico. Intent: P=septic shock, I=EGDT, C=usual care, O=mortality. Expect ProCESS/ARISE/ProMISe + meta-analysis.

**Must-have landmark papers (ground truth):**
- EGDT trials (ProCESS / ARISE / ProMISe) or their meta-analysis

### Engine A — top 10
1. Early goal-directed therapy versus usual care in the management of septic shock. — 2017, CJEM (PMID:26856422 DOI:10.1017/cem.2016.2)
2. A Randomized Trial of Protocol-Based Care for Early Septic Shock — 2014, New England Journal of Medicine (PMID:24635773 DOI:10.1056/NEJMoa1401602)
3. Trial of early, goal-directed resuscitation for septic shock. — 2015, New England Journal of Medicine (PMID:25776532 DOI:10.1056/NEJMoa1500896)
4. Goal-directed resuscitation for patients with early septic shock. — 2014, New England Journal of Medicine (PMID:25272316 DOI:10.1056/NEJMoa1404380)
5. A systematic review and meta-analysis of early goal-directed therapy for septic shock: the ARISE, ProCESS and ProMISe Investigators — 2015, Intensive Care Medicine (PMID:25952825 DOI:10.1007/s00134-015-3822-1)
6. Does Early Goal-Directed Therapy Decrease Mortality Compared with Standard Care in Patients with Septic Shock? — 2017, Journal of Emergency Medicine (PMID:27876325 DOI:10.1016/j.jemermed.2016.10.028)
7. Early goal-directed therapy did not reduce mortality more than usual care in early septic shock — 2015, Annals of Internal Medicine (PMID:25775347 DOI:10.7326/ACPJC-2015-162-6-004)
8. Early goal-directed treatment versus standard care in management of early septic shock: Meta-analysis of randomized trials — 2016, Journal of Trauma and Acute Care Surgery (PMID:27602898 DOI:10.1097/TA.0000000000001246)
9. Pooled RCTs: Early goal-directed therapy does not reduce mortality more than usual care in early septic shock — 2017, Annals of Internal Medicine (PMID:28715828 DOI:10.7326/ACPJC-2017-167-2-006)
10. Early goal-directed therapy vs usual care in the treatment of severe sepsis and septic shock: a systematic review and meta-analysis — 2015, Internal and Emergency Medicine (PMID:25982917 DOI:10.1007/s11739-015-1248-y)

### Engine B — top 10
1. Early, Goal-Directed Therapy for Septic Shock - A Patient-Level Meta-Analysis. — 2017, N Engl J Med (PMID:28320242 DOI:10.1056/NEJMoa1701380)
2. 36th International Symposium on Intensive Care and Emergency Medicine : Brussels, Belgium. 15-18 March 2016. — 2016, Crit Care (PMID:27885969 DOI:10.1186/s13054-016-1208-6)
3. A randomized trial of protocol-based care for early septic shock. — 2014, N Engl J Med (PMID:24635773 DOI:10.1056/NEJMoa1401602)
4. Goal-directed resuscitation for patients with early septic shock. — 2014, N Engl J Med (PMID:25272316 DOI:10.1056/NEJMoa1404380)
5. A systematic review and meta-analysis of early goal-directed therapy for septic shock: the ARISE, ProCESS and ProMISe Investigators. — 2015, Intensive Care Med (PMID:25952825 DOI:10.1007/s00134-015-3822-1)
6. Trial of early, goal-directed resuscitation for septic shock. — 2015, N Engl J Med (PMID:25776532 DOI:10.1056/NEJMoa1500896)
7. Early goal-directed therapy in the management of severe sepsis or septic shock in adults: a meta-analysis of randomized controlled trials. — 2015, BMC Med (PMID:25885654 DOI:10.1186/s12916-015-0312-9)
8. Effect of early goal-directed therapy on mortality in patients with severe sepsis or septic shock: a meta-analysis of randomised controlled trials. — 2016, BMJ Open (PMID:26932135 DOI:10.1136/bmjopen-2015-008330)
9. Early goal-directed resuscitation for patients with severe sepsis and septic shock: a meta-analysis and trial sequential analysis. — 2016, Scand J Trauma Resusc Emerg Med (PMID:26946514 DOI:10.1186/s13049-016-0214-7)
10. Heterogeneity in the Effect of Early Goal-Directed Therapy for Septic Shock: A Secondary Analysis of Two Multicenter International Trials. — 2025, Crit Care Med (PMID:39440873 DOI:10.1097/CCM.0000000000006463)

---

## Query: `pico-oxygen-icu` — "In critically ill ICU patients, does conservative versus liberal oxygen therapy affect mortality?"
Category: pico. Intent: P=ICU, I=conservative O2, C=liberal O2, O=mortality. Expect ICU-ROX/LOCO2/meta-analyses.

### Engine A — top 10
1. Effect of Conservative vs Conventional Oxygen Therapy on Mortality Among Patients in an Intensive Care Unit: The Oxygen-ICU Randomized Clinical Trial. — 2016, Journal of the American Medical Association (JAMA) (PMID:27706466 DOI:10.1001/jama.2016.11993)
2. Mortality and morbidity in acutely ill adults treated with liberal versus conservative oxygen therapy (IOTA): a systematic review and meta-analysis. — 2018, The Lancet (PMID:29726345 DOI:10.1016/S0140-6736(18)30479-3)
3. Effects of conservative versus liberal oxygen treatment in mortality of UCI patients — 2023, SCT Proceedings in Interdisciplinary Insights and Innovations (DOI:10.56294/piii2023152)
4. Conservative versus liberal oxygen therapy in mechanically ventilated patients: A systematic review with meta-analysis — 2025, Canadian journal of respiratory therapy : CJRT = Revue canadienne de la therapie respiratoire : RCTR (PMID:41281599 DOI:10.29390/001c.146707)
5. Conservative versus liberal oxygen therapy for critically ill patients: A meta analysis with trial sequential analysis and clinical recommendations — 2025, Journal of Translational Critical Care Medicine (DOI:10.1097/jtccm-d-25-00005)
6. Effect of liberal or conservative oxygen therapy on the prognosis for mechanically ventilated intensive care unit patients: a meta-analysis — 2022, Sao Paulo medical journal = Revista paulista de medicina (PMID:35507988 DOI:10.1590/1516-3180.2021.0062.21092021)
7. Conservative versus liberal oxygen therapy for acutely ill medical patients: A systematic review and meta-analysis. — 2021, International Journal of Nursing Studies (PMID:33774265 DOI:10.1016/j.ijnurstu.2021.103924)
8. Effects of Conservative Versus Liberal Oxygen Therapy on the Outcomes of Critically Ill Patients: A Systematic Review and Meta-Analysis — 2019, Social Science Research Network (DOI:10.2139/ssrn.3315849)
9. Conservative versus Liberal Oxygenation Targets for Mechanically Ventilated Patients. A Pilot Multicenter Randomized Controlled Trial. — 2016, American Journal of Respiratory and Critical Care Medicine (PMID:26334785 DOI:10.1164/rccm.201505-1019OC)
10. Liberal vs. Conservative Oxygen Therapy in the Acutely Ill. — 2019, American Family Physician (PMID:30600981)

### Engine B — top 10
1. Conservative or liberal oxygen therapy in adults after cardiac arrest: An individual-level patient data meta-analysis of randomised controlled trials. — 2020, Resuscitation (PMID:33058991 DOI:10.1016/j.resuscitation.2020.09.036)
2. Conservative Oxygen Targets in Mechanically Ventilated Patients (OXY-BREATHES): A Systematic Review and Meta-Analysis of Randomized Controlled Trials. — 2026, Crit Care Med (PMID:41661051 DOI:10.1097/CCM.0000000000007031)
3. A Multicenter, Randomized, Controlled Clinical Trial of Transfusion Requirements in Critical Care — 1999, New England Journal of Medicine (PMID:9971864 DOI:10.1056/nejm199902113400601)
4. Conservative or liberal oxygen targets in patients on venoarterial extracorporeal membrane oxygenation. — 2024, Intensive Care Med (PMID:39162827 DOI:10.1007/s00134-024-07564-8)
5. [Effect of conservative and conventional oxygen therapy on the prognosis of critically ill patients: a Meta-analysis]. — 2019, Zhonghua Wei Zhong Bing Ji Jiu Yi Xue (PMID:30827310 DOI:10.3760/cma.j.issn.2095-4352.2019.02.016)
6. Comparison of two fluid-management strategies in acute lung injury. — 2006, N Engl J Med (PMID:16714767 DOI:10.1056/NEJMoa062200)
7. Effect of liberal or conservative oxygen therapy on the prognosis for mechanically ventilated intensive care unit patients: a meta-analysis. — 2022, Sao Paulo Med J (PMID:35507988 DOI:10.1590/1516-3180.2021.0062.21092021)
8. Conservative oxygen therapy for mechanically ventilated adults with suspected hypoxic ischaemic encephalopathy. — 2020, Intensive Care Med (PMID:32809136 DOI:10.1007/s00134-020-06196-y)
9. The effect of conservative oxygen therapy on mortality in adult critically ill patients: A systematic review and meta-analysis of randomised controlled trials. — 2023, J Intensive Care Soc (PMID:37841302 DOI:10.1177/17511437231192385)
10. Conservative versus Liberal Oxygenation Targets for Mechanically Ventilated Patients. A Pilot Multicenter Randomized Controlled Trial. — 2016, Am J Respir Crit Care Med (PMID:26334785 DOI:10.1164/rccm.201505-1019OC)

---

## Query: `recency-semaglutide-cv-2025` — "latest 2025 trials semaglutide cardiovascular outcomes"
Category: recency. Intent: Most recent semaglutide CV outcome evidence (SELECT and newer). Newer is better.
_Recency-sensitive: newer high-quality evidence is better._

### Engine A — top 10
1. Efficacy and Safety of GLP-1 Receptor Agonists on Combined Cardiovascular and Renal Outcomes in Patients With Chronic Kidney Disease: A Systematic Review and Meta-Analysis. — 2026, Diabetes Obes Metab (PMID:42337824 DOI:10.1111/dom.71031)
2. The Impact of GLP-1-Based Therapies on Cardiovascular Outcomes in Type 2 Diabetes: A Comprehensive Systematic Review and Network Meta-Analysis. — 2026, Diabetes Obes Metab (PMID:42219271 DOI:10.1111/dom.70915)
3. Cardiometabolic Profiles of Oral and Subcutaneous Glucagon-Like Peptide-1 Receptor Mono-Agonists in Adults With Overweight or Obesity: A Systematic Review and Network Meta-Analysis. — 2026, Diabetes Obes Metab (PMID:41992023 DOI:10.1111/dom.70742)
4. Effect of oral semaglutide on cardiometabolic risk factors in overweight and obese individuals with or without diabetes: a systematic review and meta-analysis. — 2026, BMC Pharmacol Toxicol (PMID:42163419 DOI:10.1186/s40360-026-01149-5)
5. Clinical Advances in Heart Failure with Preserved Ejection Fraction: A Systematic Review of Therapeutic and Mechanistic Evidence. — 2026, Vasc Health Risk Manag (PMID:41953528 DOI:10.2147/VHRM.S578698)
6. Renal Outcomes of GLP-1 Receptor Agonists and Tirzepatide Across CKD Stages and Metabolic Phenotypes (Type&#xa0;2 Diabetes and/or Overweight/Obesity): A Scoping&#xa0;Review. — 2026, Diabetes Ther (PMID:41848820 DOI:10.1007/s13300-026-01854-8)
7. Kidney and Survival Benefits of Semaglutide in Diabetes With Chronic Kidney Disease: FLOW Trial Cardiovascular Subgroup Analyses. — 2026, J Am Coll Cardiol (PMID:42233552 DOI:10.1016/j.jacc.2026.02.5125)
8. Safety of Semaglutide After Dialysis Initiation: An Individual-Level Pooled Analysis. — 2026, Diabetes Care (PMID:41893299 DOI:10.2337/dc26-0112)
9. Oral Semaglutide and Change in Cardiovascular Risk Factors in High-Risk Type 2 Diabetes: A Post Hoc Secondary Analysis of the SOUL Randomized Clinical Trial. — 2026, JAMA Cardiol (PMID:41879791 DOI:10.1001/jamacardio.2026.0245)
10. LEAN mass Preservation with Resistance Exercise and Protein during semaglutide and tirzepatide therapy (LEAN-PREP study): a protocol for a randomised controlled trial. — 2026, BMJ Open (PMID:42020128 DOI:10.1136/bmjopen-2026-116911)

### Engine B — top 10
1. Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes. — 2023, New England Journal of Medicine (PMID:37952131 DOI:10.1056/NEJMoa2307563)
2. Obesity and Diabetes — 2026, Diabetes Technology & Therapeutics (PMID:41800639 DOI:10.1177/15209156251411115)
3. Semaglutide for cardiovascular event reduction in people with overweight or obesity: SELECT study baseline characteristics — 2022, Obesity (PMID:36502289 DOI:10.1002/oby.23621)
4. Semaglutide benefits heart health regardless of weight lost — 2025, Pharmaceutical journal (1933) (DOI:10.1211/pj.2025.1.381190)
5. Effect of semaglutide on major cardiovascular events — 2024, Drug and therapeutics bulletin (PMID:38237952 DOI:10.1136/dtb.2024.000007)
6. Semaglutide Effects on Cardiovascular Outcomes in People With Overweight or Obesity (SELECT) rationale and design. — 2020, American Heart Journal (PMID:32916609 DOI:10.1016/j.ahj.2020.07.008)
7. Late-Breaking Science Abstracts and Featured Science Abstracts From the American Heart Association’s Scientific Sessions 2023 and Late-Breaking Abstracts in Resuscitation Science From the Resuscitation Science Symposium 2023 — 2023, Circulation (DOI:10.1161/cir.0000000000001200)
8. Semaglutide (SUSTAIN and PIONEER) reduces cardiovascular events in type 2 diabetes across varying cardiovascular risk — 2020, Diabetes, obesity and metabolism (PMID:31903692 DOI:10.1111/dom.13955)
9. Predicted cardiovascular risk reduction with tirzepatide vs. semaglutide: interpretative considerations from the SURMOUNT-5 post hoc analysis — 2026, European Heart Journal Open (DOI:10.1093/ehjopen/oeag071)
10. Cardiovascular efficacy of liraglutide and semaglutide in individuals with diabetes and peripheral artery disease — 2022, Diabetes, obesity and metabolism (PMID:35332654 DOI:10.1111/dom.14700)

---

## Query: `recency-cart-myeloma` — "recent advances CAR-T therapy multiple myeloma 2024 2025"
Category: recency. Intent: Latest CAR-T (BCMA) evidence in multiple myeloma. Newer is better.
_Recency-sensitive: newer high-quality evidence is better._

### Engine A — top 10
1. Comparative efficacy and safety of BCMA-targeted CAR T cells and BiTEs in relapsed/refractory multiple myeloma: a meta-analysis of interventional and real-world studies. — 2025, Ann Hematol (PMID:40924178 DOI:10.1007/s00277-025-06524-6)
2. Advances in cancer immunotherapy: historical perspectives, current developments, and future directions — 2025, Molecular Cancer (PMID:40336045 DOI:10.1186/s12943-025-02305-x)
3. Salvage Therapy in Multiple Myeloma With Prior T-Cell Engager Exposure: Talquetamab, Elranatamab or Teclistamab in Combination With Pomalidomide. — 2026, Eur J Haematol (PMID:41757804 DOI:10.1111/ejh.70151)
4. Dual-targeted STAb-T cells secreting BCMA and CD19 T cell engagers for improved control of haematological cancers. — 2025, Oncoimmunology (PMID:39723764 DOI:10.1080/2162402X.2024.2444701)
5. Bispecific Antibodies as Bridging to BCMA CAR-T Cell Therapy for Relapsed/Refractory Multiple Myeloma — 2024, Blood Cancer Discovery (PMID:39441177 DOI:10.1158/2643-3230.bcd-24-0118)
6. Resistance Mechanisms to BCMA Targeting Bispecific Antibodies and CAR T-Cell Therapies in Multiple Myeloma — 2025, Cells (PMID:40710330 DOI:10.3390/cells14141077)
7. Idecabtagene vicleucel (ide-cel) for the treatment of triple-class exposed relapsed and refractory multiple myeloma. — 2025, Expert Opin Biol Ther (PMID:39651553 DOI:10.1080/14712598.2024.2433518)
8. Bispecific antibodies and CAR-T cells: dueling immunotherapies for large B-cell lymphomas — 2024, Blood Cancer Journal (PMID:38331870 DOI:10.1038/s41408-024-00997-w)
9. A Review of CAR T Cells and Adoptive T-Cell Therapies in Lymphoid and Solid Organ Malignancies. — 2025, Med Sci Monit (PMID:39893510 DOI:10.12659/MSM.948125)
10. CAR-T cell therapy for cancer: current challenges and future directions — 2025, Signal Transduction and Targeted Therapy (PMID:40610404 DOI:10.1038/s41392-025-02269-w)

### Engine B — top 10
1. CAR T-Cells in Multiple Myeloma: State of the Art and Future Directions — 2020, Frontiers in Oncology (PMID:32850376 DOI:10.3389/fonc.2020.01243)
2. CAR T-cell therapy to treat multiple myeloma: current state and future directions — 2024, Cancer Metastasis Review (PMID:39625587 DOI:10.1007/s10555-024-10219-1)
3. Chimeric Antigen Receptor (CAR) T-cell therapy for multiple myeloma — 2021, Pharmacology and Therapeutics (PMID:34582835 DOI:10.1016/j.pharmthera.2021.108007)
4. Update on the current and future use of CAR‐T to treat multiple myeloma — 2023, European Journal of Haematology (PMID:38099401 DOI:10.1111/ejh.14145)
5. CART-Cell Therapy: Recent Advances and New Evidence in Multiple Myeloma — 2021, Cancers (PMID:34072068 DOI:10.3390/cancers13112639)
6. CAR T and CAR NK cells in multiple myeloma: expanding the targets — 2020, Baillière's Best Practice & Research: Clinical Haematology (PMID:32139020 DOI:10.1016/j.beha.2020.101141)
7. CAR-T Therapy of Multiple Myeloma, Based on the Congresses ASH-2021 and ASCO-2022 — 2022, Клиническая онкогематология (DOI:10.21320/2500-2139-2023-16-1-1-13)
8. Updates on CAR T cell therapy in multiple myeloma — 2024, Biomarker Research (PMID:39261906 DOI:10.1186/s40364-024-00634-5)
9. Paving the Way toward Successful Multiple Myeloma Treatment: Chimeric Antigen Receptor T-Cell Therapy — 2020, Cells (PMID:32316105 DOI:10.3390/cells9040983)
10. Current status of bispecific antibodies and CAR-T therapies in multiple myeloma. — 2024, International Immunopharmacology (PMID:38733817 DOI:10.1016/j.intimp.2024.112043)

---

## Query: `sr-statins-primary-prevention` — "systematic review and meta-analysis of statins for primary prevention"
Category: systematic_review. Intent: High-quality SR/MA on statins for primary CV prevention should dominate the top.

### Engine A — top 10
1. Statins for the primary prevention of cardiovascular disease: an overview of systematic reviews — 2019, BMJ Open (PMID:31015265 DOI:10.1136/bmjopen-2018-023085)
2. Primary prevention of cardiovascular mortality and events with statin treatments: a network meta-analysis involving more than 65,000 patients. — 2008, Journal of the American College of Cardiology (PMID:19022156 DOI:10.1016/j.jacc.2008.08.039)
3. Statins for primary prevention of cardiovascular disease: the benefits outweigh the risks — 2013, Current Opinion in Cardiology (PMID:23928920 DOI:10.1097/HCO.0b013e32836429e6)
4. Statins for Primary Cardiovascular Disease Prevention: New Meta-Analysis — 2021, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA53849)
5. Primary prevention of cardiovascular diseases with statin therapy: a meta-analysis of randomized controlled trials. — 2006, Archives of Internal Medicine (PMID:17130382 DOI:10.1001/ARCHINTE.166.21.2307)
6. Statins and Primary Prevention of Cardiovascular Disease in Women — 2015, American Journal of Lifestyle Medicine (DOI:10.1177/1559827613504536)
7. Statins for the primary prevention of cardiovascular disease (Review) — 2011, ? (— no id —)
8. Statins for the primary prevention of cardiovascular disease. — 2013, Cochrane Database of Systematic Reviews (PMID:23440795 DOI:10.1002/14651858.CD004816.pub5)
9. Accumulating evidence for statins in primary prevention. — 2013, Journal of the American Medical Association (JAMA) (PMID:24276744 DOI:10.1001/jama.2013.281355)
10. Statins for the primary prevention of cardiovascular disease. — 2011, Cochrane Database of Systematic Reviews (PMID:21249663 DOI:10.1002/14651858.CD004816.pub4)

### Engine B — top 10
1. Statins for the primary prevention of cardiovascular disease. — 2013, Cochrane Database Syst Rev (PMID:23440795 DOI:10.1002/14651858.CD004816.pub5)
2. Comparative effectiveness and safety of statins as a class and of specific statins for primary prevention of cardiovascular disease: A systematic review, meta-analysis, and network meta-analysis of randomized trials with 94,283 participants. — 2019, Am Heart J (PMID:30716508 DOI:10.1016/j.ahj.2018.12.007)
3. Statins and primary prevention of venous thromboembolism: a systematic review and meta-analysis. — 2017, Lancet Haematol (PMID:28089655 DOI:10.1016/S2352-3026(16)30184-3)
4. Association Between Lowering LDL-C and Cardiovascular Risk Reduction Among Different Therapeutic Interventions: A Systematic Review and Meta-analysis. — 2016, JAMA (PMID:27673306 DOI:10.1001/jama.2016.13985)
5. Associations between statins and adverse events in primary prevention of cardiovascular disease: systematic review with pairwise, network, and dose-response meta-analyses. — 2021, BMJ (PMID:34261627 DOI:10.1136/bmj.n1537)
6. Statins for Primary Prevention of Cardiovascular Disease in Elderly Patients: Systematic Review and Meta-Analysis. — 2015, Drugs Aging (PMID:26245770 DOI:10.1007/s40266-015-0290-9)
7. PCSK9 inhibitors and ezetimibe with or without statin therapy for cardiovascular risk reduction: a systematic review and network meta-analysis. — 2022, BMJ (PMID:35508321 DOI:10.1136/bmj-2021-069116)
8. Evaluation of Time to Benefit of Statins for the Primary Prevention of Cardiovascular Events in Adults Aged 50 to 75 Years: A Meta-analysis. — 2021, JAMA Intern Med (PMID:33196766 DOI:10.1001/jamainternmed.2020.6084)
9. The Effects of Statins on Cardiovascular and Inflammatory Biomarkers in Primary Prevention: A Systematic Review and Meta-Analysis. — 2023, Heart Lung Circ (PMID:37291001 DOI:10.1016/j.hlc.2023.04.300)
10. Comparative effectiveness of statins on non-high density lipoprotein cholesterol in people with diabetes and at risk of cardiovascular disease: systematic review and network meta-analysis. — 2022, BMJ (PMID:35331984 DOI:10.1136/bmj-2021-067731)

---

## Query: `sr-sglt2-hf-hospitalization` — "meta-analysis SGLT2 inhibitors heart failure hospitalization"
Category: systematic_review. Intent: Pooled SGLT2i effect on HF hospitalization; meta-analyses should rank top.

### Engine A — top 10
1. Efficacy and safety of SGLT2 inhibitors in heart failure: systematic review and meta‐analysis — 2020, ESC Heart Failure (PMID:33586910 DOI:10.1002/ehf2.13169)
2. SGLT2 inhibitors decrease cardiovascular death and heart failure hospitalizations in patients with heart failure: A systematic review and meta-analysis — 2021, EClinicalMedicine (PMID:34308311 DOI:10.1016/j.eclinm.2021.100933)
3. Sodium-glucose cotransporter 2 inhibitors in patients with heart failure: a systematic review and meta-analysis of randomized trials. — 2021, European Heart Journal - Quality of Care and Clinical Outcomes (PMID:34617565 DOI:10.1093/ehjqcco/qcab072)
4. Sodium-Glucose Cotransporter 2 Inhibitors in Heart Failure: A Meta-Analysis of Randomized Clinical Trials. — 2020, American Journal of Medicine (PMID:32389659 DOI:10.1016/j.amjmed.2020.04.006)
5. Sodium-Glucose Cotransporter-2 (SGLT2) Inhibitors and Risk of Heart Failure Hospitalization in Type 2 Diabetes: A Systematic Review and Meta-Analysis of Randomized Controlled Trials — 2025, Cureus (PMID:41384193 DOI:10.7759/cureus.96456)
6. The Role of SGLT2 Inhibitors in Heart Failure: A Systematic Review and Meta-Analysis — 2021, Cardiology Research and Practice (PMID:34457360 DOI:10.1155/2021/9927533)
7. Cardiovascular Outcomes with SGLT-2 inhibitors in patients with heart failure with or without type 2 diabetes: A systematic review and meta-analysis of randomized controlled trials. — 2021, Diabetes & metabolic syndrome (PMID:33503584 DOI:10.1016/j.dsx.2021.01.006)
8. Heart failure hospitalization with SGLT-2 inhibitors: a systematic review and meta-analysis of randomized controlled and observational studies — 2019, Expert Review of Clinical Pharmacology (PMID:30817235 DOI:10.1080/17512433.2019.1588110)
9. Sodium‐glucose cotransporter 2 inhibitors in heart failure with reduced or preserved ejection fraction: a meta‐analysis — 2022, ESC Heart Failure (PMID:35112512 DOI:10.1002/ehf2.13805)
10. Cardiovascular Outcome in Patients Treated With SGLT2 Inhibitors for Heart Failure: A Meta-Analysis — 2021, Frontiers in Cardiovascular Medicine (PMID:34336954 DOI:10.3389/fcvm.2021.691907)

### Engine B — top 10
1. Association of SGLT2 Inhibitors With Cardiovascular and Kidney Outcomes in Patients With Type 2 Diabetes: A Meta-analysis. — 2021, JAMA Cardiol (PMID:33031522 DOI:10.1001/jamacardio.2020.4511)
2. SGLT2 inhibitors in patients with heart failure with reduced ejection fraction: a meta-analysis of the EMPEROR-Reduced and DAPA-HF trials. — 2020, Lancet (PMID:32877652 DOI:10.1016/S0140-6736(20)31824-9)
3. SGLT-2 inhibitors in patients with heart failure: a comprehensive meta-analysis of five randomised controlled trials. — 2022, Lancet (PMID:36041474 DOI:10.1016/S0140-6736(22)01429-5)
4. SGLT2 inhibitors for primary and secondary prevention of cardiovascular and renal outcomes in type 2 diabetes: a systematic review and meta-analysis of cardiovascular outcome trials. — 2019, Lancet (PMID:30424892 DOI:10.1016/S0140-6736(18)32590-X)
5. Cardiovascular, Kidney, and Safety Outcomes With GLP-1 Receptor Agonists Alone and in Combination With SGLT2 Inhibitors in Type 2 Diabetes: A Systematic Review and Meta-Analysis. — 2024, Circulation (PMID:39210781 DOI:10.1161/CIRCULATIONAHA.124.071689)
6. Impact of diabetes on the effects of sodium glucose co-transporter-2 inhibitors on kidney outcomes: collaborative meta-analysis of large placebo-controlled trials. — 2022, Lancet (PMID:36351458 DOI:10.1016/S0140-6736(22)02074-8)
7. SGLT2 inhibitors decrease cardiovascular death and heart failure hospitalizations in patients with heart failure: A systematic review and meta-analysis. — 2021, EClinicalMedicine (PMID:34308311 DOI:10.1016/j.eclinm.2021.100933)
8. Effect of SGLT2 inhibitors on heart failure outcomes and cardiovascular death across the cardiometabolic disease spectrum: a systematic review and meta-analysis. — 2024, Lancet Diabetes Endocrinol (PMID:38768620 DOI:10.1016/S2213-8587(24)00102-5)
9. Pharmacologic Treatment of Heart Failure With Reduced Ejection Fraction: An Updated Systematic Review and Network Meta-Analysis. — 2025, J Am Coll Cardiol (PMID:40892608 DOI:10.1016/j.jacc.2025.08.054)
10. Sodium-glucose cotransporter-2 inhibitors (SGLT2) in frail or older people with type 2 diabetes and heart failure: a systematic review and meta-analysis. — 2024, Age Ageing (PMID:38287703 DOI:10.1093/ageing/afad254)

---

## Query: `sr-cochrane-steroids-sepsis` — "Cochrane review corticosteroids for sepsis"
Category: systematic_review. Intent: Cochrane / high-quality SR on corticosteroids in sepsis.

### Engine A — top 10
1. Corticosteroids in Sepsis: An Updated Systematic Review and Meta-Analysis — 2018, Critical Care Medicine (PMID:29979221 DOI:10.1097/CCM.0000000000003262)
2. Association of Corticosteroid Treatment With Outcomes in Adult Patients With Sepsis: A Systematic Review and Meta-analysis — 2019, JAMA Internal Medicine (PMID:30575845 DOI:10.1001/jamainternmed.2018.5849)
3. Corticosteroids in sepsis: an updated systematic review and meta-analysis (protocol) — 2017, BMJ Open (PMID:28667229 DOI:10.1136/bmjopen-2017-016847)
4. Corticosteroids for treating sepsis in children and adults. — 2019, Cochrane Database of Systematic Reviews (PMID:31808551 DOI:10.1002/14651858.CD002243.pub4)
5. Corticosteroids for treating sepsis. — 2015, Cochrane Database of Systematic Reviews (PMID:26633262 DOI:10.1002/14651858.CD002243.pub3)
6. Corticosteroids in Sepsis and Septic Shock: A Systematic Review, Pairwise, and Dose-Response Meta-Analysis — 2024, Critical Care Explorations (PMID:38250247 DOI:10.1097/CCE.0000000000001000)
7. Corticosteroids for treating severe sepsis and septic shock. — 2004, Cochrane Database of Systematic Reviews (PMID:14973984 DOI:10.1002/14651858.CD002243.PUB2)
8. Glucocorticosteroids for sepsis: systematic review with meta-analysis and trial sequential analysis — 2015, Intensive Care Medicine (PMID:26100123 DOI:10.1007/s00134-015-3899-6)
9. Corticosteroids for Treating Sepsis in Children and Adults. — 2020, Critical Care Nurse (PMID:32737501 DOI:10.4037/ccn2020588)
10. Corticosteroid Treating sepsis in Adult Patients: A systematic review and meta-analysis — 2020, ? (DOI:10.37766/inplasy2020.11.0122)

### Engine B — top 10
1. Corticosteroids for severe sepsis and septic shock: a systematic review and meta-analysis. — 2004, BMJ (PMID:15289273 DOI:10.1136/bmj.38181.482222.55)
2. Corticosteroids in Sepsis: An Updated Systematic Review and Meta-Analysis. — 2018, Crit Care Med (PMID:29979221 DOI:10.1097/CCM.0000000000003262)
3. Systemic interventions for treatment of Stevens-Johnson syndrome (SJS), toxic epidermal necrolysis (TEN), and SJS/TEN overlap syndrome. — 2022, Cochrane Database Syst Rev (PMID:35274741 DOI:10.1002/14651858.CD013130.pub2)
4. Corticosteroids for Treating Sepsis in Adult Patients: A Systematic Review and Meta-Analysis. — 2021, Front Immunol (PMID:34484209 DOI:10.3389/fimmu.2021.709155)
5. Different corticosteroids and regimens for accelerating fetal lung maturation for babies at risk of preterm birth. — 2022, Cochrane Database Syst Rev (PMID:35943347 DOI:10.1002/14651858.CD006764.pub4)
6. Glucocorticosteroids for sepsis: systematic review with meta-analysis and trial sequential analysis. — 2015, Intensive Care Med (PMID:26100123 DOI:10.1007/s00134-015-3899-6)
7. Are Corticosteroids Beneficial for Sepsis and Septic Shock? Based on Pooling Analysis of 16 Studies. — 2019, Front Pharmacol (PMID:31354473 DOI:10.3389/fphar.2019.00714)
8. Surviving Sepsis Campaign International Guidelines for the Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children — 2020, Pediatric Critical Care Medicine (PMID:32032273 DOI:10.1097/pcc.0000000000002198)
9. Corticosteroids for treating sepsis in children and adults. — 2025, Cochrane Database Syst Rev (PMID:40470636 DOI:10.1002/14651858.CD002243.pub5)
10. Corticosteroids in COVID-19 and non-COVID-19 ARDS: a systematic review and meta-analysis. — 2021, Intensive Care Med (PMID:33876268 DOI:10.1007/s00134-021-06394-2)

---

## Query: `guideline-aortic-stenosis` — "ACC/AHA guideline management of valvular heart disease aortic stenosis"
Category: guideline. Intent: Authoritative valvular heart disease guideline (ACC/AHA) should rank top.

### Engine A — top 10
1. 2017 AHA/ACC Focused Update of the 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease: A Report of the American College of Cardiology/American Heart Association Task Force on Clinical Practice Guidelines. — 2017, Circulation (PMID:28298458 DOI:10.1161/CIR.0000000000000503)
2. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease: A Report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. — 2021, Circulation (PMID:33332150 DOI:10.1161/CIR.0000000000000923)
3. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease: Executive Summary: A Report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. — 2021, Circulation (PMID:33332149 DOI:10.1161/CIR.0000000000000932)
4. 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease: a report of the American College of Cardiology/American Heart Association Task Force on Practice Guidelines. — 2014, Circulation (PMID:24589853 DOI:10.1161/CIR.0000000000000031)
5. A prospective survey of patients with valvular heart disease in Europe: The Euro Heart Survey on Valvular Heart Disease — 2003, European Heart Journal (PMID:12831818 DOI:10.1016/s0195-668x(03)00201-x)
6. 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease: executive summary: a report of the American College of Cardiology/American Heart Association Task Force on Practice Guidelines. — 2014, Circulation (PMID:24589852 DOI:10.1161/CIR.0000000000000029)
7. Contemporary Presentation and Management of Valvular Heart Disease — 2019, Circulation (PMID:31510787 DOI:10.1161/circulationaha.119.041080)
8. 2024 AHA/ACC/AMSSM/HRS/PACES/SCMR Guideline for the Management of Hypertrophic Cardiomyopathy: A Report of the American Heart Association/American College of Cardiology Joint Committee on Clinical Practice Guidelines. — 2024, Circulation (PMID:38718139 DOI:10.1161/CIR.0000000000001250)
9. The Role of Stress Echocardiography in Valvular Heart Disease: A Current Appraisal — 2017, Cardiology (PMID:28395281 DOI:10.1159/000460274)
10. 2021 ESC/EACTS Guidelines for the management of valvular heart disease — 2021, European Heart Journal (PMID:34453165 DOI:10.1093/eurheartj/ehab395)

### Engine B — top 10
1. 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease: executive summary: a report of the American College of Cardiology/American Heart Association Task Force on Practice Guidelines. — 2014, Circulation (PMID:24589852 DOI:10.1161/CIR.0000000000000029)
2. 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease: a report of the American College of Cardiology/American Heart Association Task Force on Practice Guidelines. — 2014, Circulation (PMID:24589853 DOI:10.1161/CIR.0000000000000031)
3. 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease: a report of the American College of Cardiology/American Heart Association Task Force on Practice Guidelines. — 2014, Circulation (PMID:https://pubmed.ncbi.nlm.nih.gov/24589853 DOI:10.1161/CIR.0000000000000031)
4. New ACC/AHA valve guidelines: aligning definitions of aortic stenosis severity with treatment recommendations — 2014, Heart (PMID:24615508 DOI:10.1136/heartjnl-2013-305134)
5. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease: Executive Summary: A Report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. — 2020, Circulation (PMID:33332149 DOI:10.1161/CIR.0000000000000932)
6. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease: Executive Summary: A Report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. — 2020, Journal of the American College of Cardiology (PMID:33342587 DOI:10.1016/j.jacc.2020.11.035)
7. AHA / ACC Guideline for the Management of Patients With Valvular Heart Disease : Executive Summary A Report of the American College of Cardiology / American Heart Association Task Force on Practice — 2014, ? (— no id —)
8. 2014 AHA/ACC guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Task Force on Practice Guidelines. — 2014, Journal of Thoracic and Cardiovascular Surgery (PMID:24939033 DOI:10.1016/j.jtcvs.2014.05.014)
9. Guidelines on the management of valvular heart disease (version 2012): the Joint Task Force on the Management of Valvular Heart Disease of the European Society of Cardiology (ESC) and the European Association for Cardio-Thoracic Surgery (EACTS). — 2012, European Journal of Cardio-Thoracic Surgery (PMID:22922698 DOI:10.1093/ejcts/ezs455)
10. ESC/EACTS vs. ACC/AHA guidelines for the management of severe aortic stenosis. — 2023, European Heart Journal (PMID:36632841 DOI:10.1093/eurheartj/ehac803)

---

## Query: `guideline-kdigo-ckd` — "KDIGO clinical practice guideline evaluation and management of chronic kidney disease"
Category: guideline. Intent: KDIGO CKD guideline should rank top.

### Engine A — top 10
1. KDOQI US commentary on the 2012 KDIGO clinical practice guideline for the evaluation and management of CKD. — 2014, American Journal of Kidney Diseases (PMID:24647050 DOI:10.1053/j.ajkd.2014.01.416)
2. Executive summary of the KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease: known knowns and known unknowns. — 2024, Kidney International (PMID:38519239 DOI:10.1016/j.kint.2023.10.016)
3. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. — 2024, Kidney International (PMID:38490803 DOI:10.1016/j.kint.2023.10.018)
4. Interpretation of clinical practice guideline for the evaluation and management of chronic kidney disease: from K/ DOQI to KDIGO. — 2013, Chinese Journal of Practical Internal Medicine (— no id —)
5. KDIGO Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease Foreword — 2013, ? (— no id —)
6. Summary of KDIGO 2012 CKD Guideline: behind the scenes, need for guidance, and a framework for moving forward. — 2013, Kidney International (PMID:24284513 DOI:10.1038/ki.2013.444)
7. KDOQI US Commentary on the KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD. — 2024, American Journal of Kidney Diseases (PMID:39556063 DOI:10.1053/j.ajkd.2024.08.003)
8. Evaluation and Management of Chronic Kidney Disease: Synopsis of the Kidney Disease: Improving Global Outcomes 2024 Clinical Practice Guideline — 2025, Annals of Internal Medicine (PMID:40063957 DOI:10.7326/ANNALS-24-01926)
9. Kidney Disease: Improving Global Outcomes — 2009, Nature Reviews Nephrology (PMID:19786993 DOI:10.1038/nrneph.2009.153)
10. KDIGO 2018 Clinical Practice Guideline for the Prevention, Diagnosis, Evaluation, and Treatment of Hepatitis C in Chronic Kidney Disease — 2018, Kidney international. Supplement (PMID:30675443 DOI:10.1016/j.kisu.2018.06.001)

### Engine B — top 10
1. Evaluation and management of chronic kidney disease: synopsis of the kidney disease: improving global outcomes 2012 clinical practice guideline. — 2013, Ann Intern Med (PMID:23732715 DOI:10.7326/0003-4819-158-11-201306040-00007)
2. Executive summary of the KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease: known knowns and known unknowns. — 2024, Kidney Int (PMID:38519239 DOI:10.1016/j.kint.2023.10.016)
3. KDIGO 2025 clinical practice guideline for the evaluation, management, and treatment of autosomal dominant polycystic kidney disease (ADPKD): executive summary. — 2025, Kidney Int (PMID:39848746 DOI:10.1016/j.kint.2024.07.010)
4. Diabetes Management in Chronic Kidney Disease: Synopsis of the 2020 KDIGO Clinical Practice Guideline. — 2021, Ann Intern Med (PMID:33166222 DOI:10.7326/M20-5938)
5. KDIGO Clinical Practice Guideline on the Evaluation and Management of Candidates for Kidney Transplantation. — 2020, Transplantation (PMID:32301874 DOI:10.1097/TP.0000000000003136)
6. Evaluation and Management of Chronic Kidney Disease: Synopsis of the Kidney Disease: Improving Global Outcomes 2024 Clinical Practice Guideline. — 2025, Ann Intern Med (PMID:40063957 DOI:10.7326/ANNALS-24-01926)
7. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. — 2024, Kidney Int (PMID:38490803 DOI:10.1016/j.kint.2023.10.018)
8. KDIGO clinical practice guideline for the diagnosis, evaluation, prevention, and treatment of Chronic Kidney Disease-Mineral and Bone Disorder (CKD-MBD). — 2009, Kidney Int Suppl (PMID:19644521 DOI:10.1038/ki.2009.188)
9. Executive Summary of the KDIGO 2026 Clinical Practice Guideline for the Management of Anemia in Chronic Kidney Disease (CKD). — 2026, Kidney Int (PMID:41485807 DOI:10.1016/j.kint.2025.06.005)
10. Comments on 'KDIGO 2012 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease'. — 2013, Kidney Int (PMID:23989362 DOI:10.1038/ki.2013.243)

---

## Query: `lto-bariatric-diabetes` — "long-term outcomes of bariatric surgery in type 2 diabetes"
Category: long_term_outcomes. Intent: Long-term (≥5yr) metabolic/CV outcomes of bariatric surgery vs medical therapy (STAMPEDE/SOS).

### Engine A — top 10
1. Long-Term Outcomes of Medical Management vs Bariatric Surgery in Type 2 Diabetes. — 2024, JAMA (PMID:38411644 DOI:10.1001/jama.2024.0318)
2. Bariatric Surgery versus Intensive Medical Therapy for Diabetes - 5-Year Outcomes. — 2017, N Engl J Med (PMID:28199805 DOI:10.1056/NEJMoa1600869)
3. The long-term effect of bariatric/metabolic surgery versus pharmacologic therapy in type 2 diabetes mellitus patients: A systematic review and meta-analysis. — 2024, Diabetes Metab Res Rev (PMID:38873748 DOI:10.1002/dmrr.3830)
4. Impact of bariatric surgery on glycaemic and metabolic outcomes in people with obesity and type 2 diabetes mellitus: A meta-analysis. — 2025, Diabetes Obes Metab (PMID:40407032 DOI:10.1111/dom.16475)
5. Association of metabolic-bariatric surgery with long-term survival in adults with and without diabetes: a one-stage meta-analysis of matched cohort and prospective controlled studies with 174&#x2009;772 participants. — 2021, Lancet (PMID:33965067 DOI:10.1016/S0140-6736(21)00591-2)
6. Association of Bariatric Surgery With Long-term Remission of Type 2 Diabetes and With Microvascular and Macrovascular Complications — 2014, JAMA (PMID:24915261 DOI:10.1001/jama.2014.5988)
7. Benefits and Risks of Bariatric Surgery in Adults: A Review. — 2020, JAMA (PMID:32870301 DOI:10.1001/jama.2020.12567)
8. Bariatric–metabolic surgery versus conventional medical treatment in obese patients with type 2 diabetes: 5 year follow-up of an open-label, single-centre, randomised controlled trial — 2015, The Lancet (PMID:26369473 DOI:10.1016/s0140-6736(15)00075-6)
9. The Long-Term Effects of Bariatric Surgery on Type 2 Diabetes Remission, Microvascular and Macrovascular Complications, and Mortality: a Systematic Review and Meta-Analysis. — 2017, Obes Surg (PMID:28801703 DOI:10.1007/s11695-017-2866-4)
10. Bariatric/Metabolic Surgery to Treat Type 2 Diabetes in Patients With a BMI &lt;35 kg/m2. — 2016, Diabetes Care (PMID:27222550 DOI:10.2337/dc16-0350)

### Engine B — top 10
1. The Long-Term Effects of Bariatric Surgery for Type 2 Diabetes: Systematic Review and Meta-analysis of Randomized and Non-randomized Evidence — 2014, Obesity Surgery (PMID:25355456 DOI:10.1007/s11695-014-1460-2)
2. Long-term Outcomes of Bariatric Surgery: A National Institutes of Health Symposium — 2014, JAMA Surgery (PMID:25271405 DOI:10.1001/jamasurg.2014.2440)
3. Association of bariatric surgery with long-term remission of type 2 diabetes and with microvascular and macrovascular complications. — 2014, Journal of the American Medical Association (JAMA) (PMID:24915261 DOI:10.1001/jama.2014.5988)
4. The Long-Term Effects of Bariatric Surgery on Type 2 Diabetes Remission, Microvascular and Macrovascular Complications, and Mortality: a Systematic Review and Meta-Analysis — 2017, Obesity Surgery (PMID:28801703 DOI:10.1007/s11695-017-2866-4)
5. The Long-Term Outcomes Of Bariatric Surgery On Patients With Type 2 Diabetes Mellitus: A Systematic Review And Meta-Analyses. — 2014, Value in Health (PMID:27202676 DOI:10.1016/j.jval.2014.08.148)
6. Long-Term Outcomes of Medical Management vs Bariatric Surgery in Type 2 Diabetes. — 2024, Journal of the American Medical Association (JAMA) (PMID:38411644 DOI:10.1001/jama.2024.0318)
7. Long-term outcomes comparing metabolic surgery to no surgery in patients with type 2 diabetes and body mass index 30-35. — 2020, Surgery for Obesity and Related Diseases (PMID:32088110 DOI:10.1016/j.soard.2020.01.016)
8. Long-term outcomes of macrovascular diseases and metabolic indicators of bariatric surgery for severe obesity type 2 diabetes patients with a meta-analysis — 2019, PLoS ONE (PMID:31794559 DOI:10.1371/journal.pone.0224828)
9. Bariatric Surgery as a Long-Term Treatment for Type 2 Diabetes/Metabolic Syndrome. — 2020, Annual Review of Medicine (PMID:31986081 DOI:10.1146/annurev-med-053117-123246)
10. Bariatric surgery for type 2 diabetes: getting closer to the long-term goal — 2016, Journal of the American Medical Association (JAMA) (PMID:27002449 DOI:10.1001/jama.2016.1884)

---

## Query: `lto-pci-vs-cabg-left-main` — "ten year outcomes PCI versus CABG left main coronary disease"
Category: long_term_outcomes. Intent: Long-term mortality/MACE PCI vs CABG in left main disease (EXCEL/NOBLE/SYNTAX).

### Engine A — top 10
1. Mortality after coronary artery bypass grafting versus percutaneous coronary intervention with stenting for coronary artery disease: a pooled analysis of individual patient data. — 2018, Lancet (PMID:29478841 DOI:10.1016/S0140-6736(18)30423-9)
2. Ten-Year Outcomes After Drug-Eluting Stents Versus Coronary Artery Bypass Grafting for Left Main Coronary Disease: Extended Follow-Up of the PRECOMBAT Trial. — 2020, Circulation (PMID:32223567 DOI:10.1161/CIRCULATIONAHA.120.046039)
3. Ten-Year All-Cause Death According to Completeness of Revascularization in Patients With Three-Vessel Disease or Left Main Coronary Artery Disease: Insights From the SYNTAX Extended Survival Study. — 2021, Circulation (PMID:34011163 DOI:10.1161/CIRCULATIONAHA.120.046289)
4. Ten-Year Outcomes of Percutaneous Coronary Intervention Versus Coronary Artery Bypass Grafting for Patients with Type&#xa0;2 Diabetes Mellitus Suffering from Left Main Coronary Disease: A Meta-Analysis. — 2021, Diabetes Ther (PMID:33641081 DOI:10.1007/s13300-021-01025-x)
5. Impact of SYNTAX Score on 10-Year Outcomes After Revascularization for Left Main Coronary Artery Disease. — 2020, JACC Cardiovasc Interv (PMID:32029254 DOI:10.1016/j.jcin.2019.10.020)
6. Ten-year Outcomes After Drug-Eluting Stents or Bypass Surgery for Left Main Coronary Disease in Patients With and Without Diabetes Mellitus: The PRECOMBAT Extended Follow-Up Study. — 2021, J Am Heart Assoc (PMID:34238026 DOI:10.1161/JAHA.120.019834)
7. Left Main Stenting in Comparison With Surgical Revascularization: 10-Year Outcomes of the (Left Main Coronary Artery Stenting) LE MANS Trial. — 2016, JACC Cardiovasc Interv (PMID:26892080 DOI:10.1016/j.jcin.2015.10.044)
8. Ten-year all-cause death after percutaneous or surgical revascularization in diabetic patients with complex coronary artery disease. — 2021, Eur Heart J (PMID:34405232 DOI:10.1093/eurheartj/ehab441)
9. 10-Year Follow-Up After Revascularization in Elderly Patients With Complex Coronary Artery Disease. — 2021, J Am Coll Cardiol (PMID:34082905 DOI:10.1016/j.jacc.2021.04.016)
10. Percutaneous coronary intervention with drug-eluting stents versus coronary artery bypass grafting in left main coronary artery disease: an individual patient data meta-analysis. — 2021, Lancet (PMID:34793745 DOI:10.1016/S0140-6736(21)02334-5)

### Engine B — top 10
1. 10-Year Outcomes of Stents Versus Coronary Artery Bypass Grafting for Left Main Coronary Artery Disease. — 2018, Journal of the American College of Cardiology (PMID:30261236 DOI:10.1016/j.jacc.2018.09.012)
2. Five-Year Outcomes after PCI or CABG for Left Main Coronary Disease. — 2020, New England Journal of Medicine (PMID:32160683 DOI:10.1056/NEJMx200004)
3. Percutaneous coronary intervention versus coronary artery bypass grafting in patients with three-vessel or left main coronary artery disease: 10-year follow-up of the multicentre randomised controlled SYNTAX trial. — 2019, The Lancet (PMID:31488373 DOI:10.1016/S0140-6736(19)31997-X)
4. Ten-Year Outcomes After Drug-Eluting Stents Versus Coronary Artery Bypass Grafting for Left Main Coronary Disease — 2020, Circulation (PMID:32223567 DOI:10.1161/CIRCULATIONAHA.120.046039)
5. Long-Term Outcomes after Drug-Eluting Stents versus Coronary Artery Bypass Grafting for Left Main Coronary Disease: 10-Year Follow-Up of the Multicenter Randomized Controlled PRECOMBAT Trial — 2020, Social Science Research Network (DOI:10.2139/ssrn.3514685)
6. Five-Year Outcomes after PCI or CABG for Left Main Coronary Disease. — 2019, New England Journal of Medicine (PMID:31562798 DOI:10.1056/NEJMoa1909406)
7. Long‐term follow‐up of percutaneous coronary intervention versus coronary artery bypass grafting in left main coronary artery disease: A systematic review and meta‐analysis — 2020, Catheterization and cardiovascular interventions (PMID:33103847 DOI:10.1002/ccd.29338)
8. Ten-year outcomes after percutaneous coronary intervention versus coronary artery bypass grafting for multivessel or left main coronary artery disease: a systematic review and meta-analysis — 2023, Journal of Cardiothoracic Surgery (PMID:36732810 DOI:10.1186/s13019-023-02101-y)
9. Ten-year comparative long-term outcomes of PCI versus CABG in multi-vessel coronary artery disease — 2024, European Heart Journal (DOI:10.1093/eurheartj/ehae666.2380)
10. Five-year outcomes of percutaneous coronary intervention versus coronary artery bypass graft surgery in patients with left main coronary artery disease: An updated meta-analysis of randomized trials and adjusted observational studies. — 2015, International Journal of Cardiology (PMID:26025863 DOI:10.1016/j.ijcard.2015.05.136)

---

## Query: `lto-dapa-ckd` — "long-term renal outcomes dapagliflozin chronic kidney disease"
Category: long_term_outcomes. Intent: Long-term renal/CV outcomes of dapagliflozin in CKD (DAPA-CKD).

**Must-have landmark papers (ground truth):**
- DAPA-CKD trial

### Engine A — top 10
1. Dapagliflozin in Patients with Chronic Kidney Disease. — 2020, New England Journal of Medicine (PMID:32970396 DOI:10.1056/NEJMoa2024816)
2. Dapagliflozin Reduces Adverse Renal and Cardiovascular Events in Patients With Chronic Kidney Disease — 2020, Journal of Clinical Outcomes Management (DOI:10.12788/jcom.0030)
3. Extrapolated longer-term effects of the DAPA-CKD trial: a modelling analysis — 2022, Nephrology, Dialysis and Transplantation (PMID:36301617 DOI:10.1093/ndt/gfac280)
4. The long-term effects of dapagliflozin in chronic kidney disease: a time-to-event analysis — 2024, Nephrology, Dialysis and Transplantation (PMID:38730538 DOI:10.1093/ndt/gfae106)
5. [The dapagliflozin and prevention of adverse outcomes in chronic kidney disease: results of the DAPA-CKD study]. — 2021, Терапевтический архив (PMID:36286839 DOI:10.26442/00403660.2021.6.200891)
6. Effects of dapagliflozin on major adverse kidney and cardiovascular events in patients with diabetic and non-diabetic chronic kidney disease: a prespecified analysis from the DAPA-CKD trial. — 2021, The Lancet Diabetes and Endocrinology (PMID:33338413 DOI:10.1016/S2213-8587(20)30369-7)
7. Effect of dapagliflozin on the rate of decline in kidney function in patients with chronic kidney disease with and without type 2 diabetes: a prespecified analysis from the DAPA-CKD trial. — 2021, The Lancet Diabetes and Endocrinology (PMID:34619108 DOI:10.1016/S2213-8587(21)00242-4)
8. Dapagliflozin And Prevention of Adverse outcomes in Chronic Kidney Disease (DAPA-CKD) — 2020, Journal of Cardiac Failure (DOI:10.1016/j.cardfail.2020.11.024)
9. Cognitive Behavioral Therapy Plus Placebo Is Inferior to NSAID Therapy for Arthritis Pain — 2020, Journal of Clinical Outcomes Management (DOI:10.12788/jcom.0029)
10. #3686 The effects of dapagliflozin on renal outcomes in diabetes mellitus type II - a systematic review and meta-analysis — 2025, Nephrology, Dialysis and Transplantation (DOI:10.1093/ndt/gfaf116.1905)

### Engine B — top 10
1. Albuminuria-Lowering Effect of Dapagliflozin, Eplerenone, and Their Combination in Patients with Chronic Kidney Disease: A Randomized Crossover Clinical Trial. — 2022, J Am Soc Nephrol (PMID:35440501 DOI:10.1681/ASN.2022020207)
2. Effects of the SGLT2 inhibitor dapagliflozin on proteinuria in non-diabetic patients with chronic kidney disease (DIAMOND): a randomised, double-blind, crossover trial. — 2020, Lancet Diabetes Endocrinol (PMID:32559474 DOI:10.1016/S2213-8587(20)30162-5)
3. The long-term effects of dapagliflozin in chronic kidney disease: a time-to-event analysis. — 2024, Nephrol Dial Transplant (PMID:38730538 DOI:10.1093/ndt/gfae106)
4. Effects of the sodium-glucose co-transporter 2 inhibitor dapagliflozin in patients with type 2 diabetes and Stages 3b-4 chronic kidney disease. — 2018, Nephrol Dial Transplant (PMID:29370424 DOI:10.1093/ndt/gfx350)
5. Correlates and Consequences of an Acute Change in eGFR in Response to the SGLT2 Inhibitor Dapagliflozin in Patients with CKD. — 2022, J Am Soc Nephrol (PMID:35977807 DOI:10.1681/ASN.2022030306)
6. Dapagliflozin in Patients with Chronic Kidney Disease. — 2020, N Engl J Med (PMID:32970396 DOI:10.1056/NEJMoa2024816)
7. Extrapolated longer-term effects of the DAPA-CKD trial: a modelling analysis. — 2023, Nephrol Dial Transplant (PMID:36301617 DOI:10.1093/ndt/gfac280)
8. Therapeutic Effects of Heart Failure Medical Therapies on Standardized Kidney Outcomes: Comprehensive Individual Participant-Level Analysis of 6 Randomized Clinical Trials. — 2024, Circulation (PMID:39217458 DOI:10.1161/CIRCULATIONAHA.124.071110)
9. Baseline, Early Changes, and Residual Albuminuria: Post Hoc Analysis of a Randomized Clinical Trial of Dapagliflozin in Chronic Kidney Disease. — 2024, Clin J Am Soc Nephrol (PMID:39475817 DOI:10.2215/CJN.0000000000000550)
10. Effectiveness of Empagliflozin vs Dapagliflozin for Kidney Outcomes in Type 2 Diabetes. — 2025, JAMA Intern Med (PMID:39836391 DOI:10.1001/jamainternmed.2024.7381)

---

## Query: `safety-vaccine-myocarditis` — "myocarditis risk after mRNA COVID-19 vaccine in young males"
Category: safety_adverse_event. Intent: Quantified myocarditis risk post-mRNA vaccine; expect cohort/population studies + SRs.

### Engine A — top 10
1. Myocarditis Cases Reported After mRNA-Based COVID-19 Vaccination in the US From December 2020 to August 2021. — 2022, Journal of the American Medical Association (JAMA) (PMID:35076665 DOI:10.1001/jama.2021.24110)
2. Risk of Myocarditis and Pericarditis among Young Adults following mRNA COVID-19 Vaccinations — 2022, Vaccines (PMID:35632478 DOI:10.3390/vaccines10050722)
3. Myocarditis With COVID-19 mRNA Vaccines — 2021, Circulation (PMID:34281357 DOI:10.1161/CIRCULATIONAHA.121.056135)
4. SARS-CoV-2 Vaccination and Myocarditis in a Nordic Cohort Study of 23 Million Residents — 2022, JAMA cardiology (PMID:35442390 DOI:10.1001/jamacardio.2022.0583)
5. COVID‐19 vaccine induced myocarditis in young males: A systematic review — 2022, European Journal of Clinical Investigation (PMID:36576362 DOI:10.1111/eci.13947)
6. Risk of myocarditis and pericarditis following coronavirus disease 2019 messenger RNA Vaccination—A nationwide study — 2022, medRxiv (PMID:36804307 DOI:10.1016/j.jmii.2023.01.016)
7. Risk of Myocarditis After Sequential Doses of COVID-19 Vaccine and SARS-CoV-2 Infection by Age and Sex — 2022, Circulation (PMID:35993236 DOI:10.1161/CIRCULATIONAHA.122.059970)
8. Risk of myocarditis and pericarditis after the COVID-19 mRNA vaccination in the USA: a cohort study in claims databases — 2022, The Lancet (PMID:35691322 DOI:10.1016/S0140-6736(22)00791-7)
9. Incidence of Myocarditis/Pericarditis Following mRNA COVID-19 Vaccination Among Children and Younger Adults in the United States — 2022, Annals of Internal Medicine (PMID:36191323 DOI:10.7326/M22-2274)
10. COVID-19 vaccine-associated myocarditis — 2022, World Journal of Cardiology (PMID:36161056 DOI:10.4330/wjc.v14.i7.382)

### Engine B — top 10
_(no results)_

---

## Query: `safety-glp1-pancreatitis` — "GLP-1 receptor agonists and risk of acute pancreatitis"
Category: safety_adverse_event. Intent: Association between GLP-1 RAs and pancreatitis; expect meta-analyses/cohorts/RCT safety.

### Engine A — top 10
1. Glucagon‐like peptide‐1 receptor agonists and risk of acute pancreatitis in patients with type 2 diabetes — 2017, Diabetes, obesity and metabolism (PMID:28105738 DOI:10.1111/dom.12885)
2. Risk of pancreatitis in patients treated with incretin-based therapies — 2014, Diabetologia (PMID:24723174 DOI:10.1007/s00125-014-3231-y)
3. Glucagon-like peptide-1 receptor agonists and pancreatitis: a meta-analysis of randomized clinical trials. — 2014, Diabetes Research and Clinical Practice (PMID:24485345 DOI:10.1016/j.diabres.2014.01.010)
4. Association of Pancreatitis with Glucagon-Like Peptide-1 Agonist Use — 2010, The Annals of Pharmacotherapy (PMID:20371755 DOI:10.1345/aph.1M676)
5. Glucagonlike peptide 1-based therapies and risk of hospitalization for acute pancreatitis in type 2 diabetes mellitus: a population-based matched case-control study. — 2013, JAMA Internal Medicine (PMID:23440284 DOI:10.1001/jamainternmed.2013.2720)
6. Incretin-based therapies and acute pancreatitis risk: a systematic review and meta-analysis of observational studies — 2015, Endocrine (PMID:25146552 DOI:10.1007/s12020-014-0386-8)
7. GLP-1 receptor agonists and the risk of acute pancreatitis: a living systematic review and meta-analysis — 2026, medRxiv (DOI:10.64898/2026.03.19.26348844)
8. Pancreatitis Risk Associated with GLP-1 Receptor Agonists, Considered as a Single Class, in a Comorbidity-Free Subgroup of Type 2 Diabetes Patients in the United States: A Propensity Score-Matched Analysis — 2025, Journal of Clinical Medicine (PMID:39941615 DOI:10.3390/jcm14030944)
9. Predictors of acute pancreatitis in patients treated with GLP-1 receptor agonists for weight management. — 2025, Pancreatology : official journal of the International Association of Pancreatology (IAP) ... [et al.] (PMID:40695708 DOI:10.1016/j.pan.2025.06.018)
10. Risk of pancreatic adverse events associated with the use of glucagon-like peptide-1 receptor agonist and dipeptidyl peptidase-4 inhibitor drugs: A systematic review and meta-analysis of randomized trials — 2015, ? (DOI:10.13105/WJMA.V3.I6.254)

### Engine B — top 10
1. Glucagon-like peptide-1 receptor agonists and risk of acute pancreatitis in patients with type 2 diabetes. — 2017, Diabetes Obes Metab (PMID:28105738 DOI:10.1111/dom.12885)
2. Cardiovascular Effects and Tolerability of GLP-1 Receptor Agonists: A Systematic Review and Meta-Analysis of 99,599 Patients. — 2025, J Am Coll Cardiol (PMID:40892610 DOI:10.1016/j.jacc.2025.08.027)
3. Cardiovascular, mortality, and kidney outcomes with GLP-1 receptor agonists in patients with type 2 diabetes: a systematic review and meta-analysis of randomised trials. — 2021, Lancet Diabetes Endocrinol (PMID:34425083 DOI:10.1016/S2213-8587(21)00203-5)
4. Glucagon-Like Peptide-1 Receptor Agonists and Gastrointestinal Adverse Events: A Systematic Review and Meta-Analysis. — 2025, Gastroenterology (PMID:40499738 DOI:10.1053/j.gastro.2025.06.003)
5. Safety issues with glucagon-like peptide-1 receptor agonists (pancreatitis, pancreatic cancer and cholelithiasis): Data from randomized controlled trials. — 2017, Diabetes Obes Metab (PMID:28244632 DOI:10.1111/dom.12926)
6. Effects of GLP-1 receptor agonists on kidney and cardiovascular disease outcomes: a meta-analysis of randomised controlled trials. — 2025, Lancet Diabetes Endocrinol (PMID:39608381 DOI:10.1016/S2213-8587(24)00271-7)
7. SGLT2 Inhibitors and GLP-1 Receptor Agonists in Kidney Transplantation: A Systematic Review and Meta-Analysis. — 2026, Transplantation (PMID:40702593 DOI:10.1097/TP.0000000000005496)
8. Cardiovascular, mortality, and kidney outcomes with GLP-1 receptor agonists in patients with type 2 diabetes: a systematic review and meta-analysis of cardiovascular outcome trials. — 2019, Lancet Diabetes Endocrinol (PMID:31422062 DOI:10.1016/S2213-8587(19)30249-9)
9. Evaluating the Rates of Pancreatitis and Pancreatic Cancer Among GLP-1 Receptor Agonists: A Systematic Review and Meta-Analysis of Randomised Controlled Trials. — 2025, Endocrinol Diabetes Metab (PMID:40988099 DOI:10.1002/edm2.70113)
10. GLP-1 Receptor Agonist Outcomes, Safety, and Body Mass Index Change in a National Cohort of Patients on Dialysis. — 2025, Clin J Am Soc Nephrol (PMID:40526425 DOI:10.2215/CJN.0000000750)

---

## Query: `safety-sglt2-dka` — "SGLT2 inhibitors and risk of diabetic ketoacidosis"
Category: safety_adverse_event. Intent: DKA risk with SGLT2 inhibitors; expect cohort/pharmacovigilance + meta-analyses.

### Engine A — top 10
1. Risk of Diabetic Ketoacidosis after Initiation of an SGLT2 Inhibitor. — 2017, New England Journal of Medicine (PMID:28591538 DOI:10.1056/NEJMc1701990)
2. SGLT2 inhibitors increase risk for diabetic ketoacidosis in type 2 diabetes — 2020, Annals of Internal Medicine (PMID:33075260 DOI:10.7326/ACPJ202010200-040)
3. SGLT2 inhibitors and the underrecognized risk of euglycemic diabetic ketoacidosis: a clinical call for vigilance — 2025, Annals of Medicine and Surgery (PMID:41180667 DOI:10.1097/ms9.0000000000003890)
4. SGLT2 Inhibitors: A Systematic Review of Diabetic Ketoacidosis and Related Risk Factors in the Primary Literature — 2017, Pharmacotherapy (PMID:27931088 DOI:10.1002/phar.1881)
5. SGLT2 Inhibitors May Predispose to Ketoacidosis. — 2015, Journal of Clinical Endocrinology and Metabolism (PMID:26086329 DOI:10.1210/jc.2015-1884)
6. Evolving evidence of diabetic ketoacidosis in patients taking sodium glucose cotransporter 2 inhibitors. — 2020, Journal of Clinical Endocrinology and Metabolism (PMID:32302001 DOI:10.1210/clinem/dgaa200)
7. Sodium‐glucose co‐transporter‐2 inhibitors and the risk of ketoacidosis in patients with type 2 diabetes mellitus: A nationwide population‐based cohort study — 2018, Diabetes, obesity and metabolism (PMID:29569427 DOI:10.1111/dom.13297)
8. Sodium-Glucose Cotransporter-2 Inhibitors and Risk of Diabetic Ketoacidosis Among Adults With Type 2 Diabetes: A Systematic Review and Meta-Analysis. — 2021, Canadian Journal of Diabetes (PMID:34116926 DOI:10.1016/j.jcjd.2021.04.006)
9. Pembrolizumab for Advanced Urothelial Carcinoma. — 2017, New England Journal of Medicine (PMID:https://pubmed.ncbi.nlm.nih.gov/28591524 DOI:10.1056/NEJMc1704612)
10. SGLT2 inhibitors and the risk of diabetic ketoacidosis among adults with Type 2 Diabetes: A systematic review and meta-analysis — 2021, medRxiv (DOI:10.1101/2021.03.17.21253796)

### Engine B — top 10
1. Risk of diabetic ketoacidosis of SGLT2 inhibitors in patients with type 2 diabetes: a systematic review and network meta-analysis of randomized controlled trials. — 2023, Front Pharmacol (PMID:37397500 DOI:10.3389/fphar.2023.1145587)
2. SGLT2 Inhibitors: A Systematic Review of Diabetic Ketoacidosis and Related Risk Factors in the Primary Literature. — 2017, Pharmacotherapy (PMID:27931088 DOI:10.1002/phar.1881)
3. Sodium-glucose cotransporter-2 inhibitors (SGLT2) in frail or older people with type 2 diabetes and heart failure: a systematic review and meta-analysis. — 2024, Age Ageing (PMID:38287703 DOI:10.1093/ageing/afad254)
4. SGLT2 inhibitors increase risk for diabetic ketoacidosis in type 2 diabetes — 2020, Annals of Internal Medicine (PMID:33075260 DOI:10.7326/acpj202010200-040)
5. Euglycemic diabetic ketoacidosis associated with SGLT2 inhibitors: A systematic review and quantitative analysis. — 2022, J Family Med Prim Care (PMID:35495849 DOI:10.4103/jfmpc.jfmpc_644_21)
6. SGLT2 Inhibitors May Predispose to Ketoacidosis. — 2015, J Clin Endocrinol Metab (PMID:26086329 DOI:10.1210/jc.2015-1884)
7. SGLT2 inhibitors and GLP-1 receptor agonists: established and emerging indications. — 2021, Lancet (PMID:34216571 DOI:10.1016/S0140-6736(21)00536-5)
8. SGLT2 Inhibitors Increase the Risk of Diabetic Ketoacidosis Developing in the Community and During Hospital Admission — 2019, The Journal of Clinical Endocrinology & Metabolism (PMID:30835263 DOI:10.1210/jc.2019-00139)
9. Sodium glucose cotransporter 2 inhibitors and risk of serious adverse events: nationwide register based cohort study — 2018, BMJ (PMID:30429124 DOI:10.1136/bmj.k4365)
10. Identifying Risk Factors for Diabetic Ketoacidosis Associated with SGLT2 Inhibitors: a Nationwide Cohort Study in the USA — 2021, Journal of General Internal Medicine (PMID:33564942 DOI:10.1007/s11606-020-06561-z)

---

## Query: `safety-fluoroquinolone-aneurysm` — "fluoroquinolone use and risk of aortic aneurysm or dissection"
Category: safety_adverse_event. Intent: Association between fluoroquinolones and aortic aneurysm/dissection; expect cohort/case-control + SRs.

### Engine A — top 10
1. Fluoroquinolone Use and the Risk of Collagen-Associated Adverse Events: A Systematic Review and Meta-Analysis. — 2019, Drug Saf (PMID:31077091 DOI:10.1007/s40264-019-00828-z)
2. Fluoroquinolone use and risk of aortic aneurysm and dissection: nationwide cohort study. — 2018, BMJ (PMID:29519881 DOI:10.1136/bmj.k678)
3. Association of Infections and Use of Fluoroquinolones With the Risk of Aortic Aneurysm or Aortic Dissection. — 2020, JAMA Intern Med (PMID:32897358 DOI:10.1001/jamainternmed.2020.4192)
4. Effects of Fluoroquinolones on Outcomes of Patients With Aortic Dissection or&#xa0;Aneurysm. — 2021, J Am Coll Cardiol (PMID:33858624 DOI:10.1016/j.jacc.2021.02.047)
5. Risk of aortic aneurysm and aortic dissection with the use of fluoroquinolones in Korea: a nested case-control study. — 2022, BMC Cardiovasc Disord (PMID:35152888 DOI:10.1186/s12872-022-02488-x)
6. Fluoroquinolones and the Risk of Aortic Aneurysm or Aortic Dissection: A Systematic Review and Meta-Analysis. — 2019, Cardiovasc Hematol Agents Med Chem (PMID:30947680 DOI:10.2174/1871525717666190402121958)
7. Risk of aortic aneurysm or dissection following use of fluoroquinolones: a retrospective multinational network cohort study — 2025, EClinicalMedicine (PMID:39975698 DOI:10.1016/j.eclinm.2025.103096)
8. Risk of Aortic Dissection and Aortic Aneurysm in Patients Taking Oral Fluoroquinolone. — 2015, JAMA Intern Med (PMID:26436523 DOI:10.1001/jamainternmed.2015.5389)
9. Association of Fluoroquinolone Use With Short-term Risk of Development of Aortic Aneurysm — 2021, JAMA Surgery (PMID:33404647 DOI:10.1001/jamasurg.2020.6165)
10. Association of Fluoroquinolones With the Risk of Aortic Aneurysm or Aortic Dissection — 2020, JAMA Internal Medicine (PMID:32897307 DOI:10.1001/jamainternmed.2020.4199)

### Engine B — top 10
1. Risk of Aortic Dissection and Aortic Aneurysm in Patients Taking Oral Fluoroquinolone. — 2015, JAMA Internal Medicine (PMID:26436523 DOI:10.1001/jamainternmed.2015.5389)
2. Aortic Dissection and Aortic Aneurysms Associated with Fluoroquinolones: A Systematic Review and Meta-Analysis. — 2017, American Journal of Medicine (PMID:28739200 DOI:10.1016/j.amjmed.2017.06.029)
3. Fluoroquinolone use and risk of aortic aneurysm and dissection: nationwide cohort study — 2018, British medical journal (PMID:29519881 DOI:10.1136/bmj.k678)
4. Fluoroquinolones and the risk of aortopathy: A systematic review and meta-analysis. — 2019, International Journal of Cardiology (PMID:30309682 DOI:10.1016/j.ijcard.2018.09.067)
5. The association between fluoroquinolones and aortic dissection and aortic aneurysms: a systematic review and meta-analysis — 2020, Scientific Reports (PMID:34040146 DOI:10.1038/s41598-021-90692-8)
6. Fluoroquinolones and the Risk of Aortic Aneurysm or Aortic Dissection: A Systematic Review and Meta-Analysis — 2019, Cardiovascular & Hematological Agents in Medicinal Chemistry (PMID:30947680 DOI:10.2174/1871525717666190402121958)
7. Assessing fluoroquinolone‐associated aortic aneurysm and dissection: Data mining of the public version of the FDA adverse event reporting system — 2019, International journal of clinical practice (PMID:30809871 DOI:10.1111/ijcp.13331)
8. Fluoroquinolones and Risk for Aortic Aneurysm or Dissection — 2020, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA52422)
9. Fluoroquinolones are associated with increased risk of aortic aneurysm or dissection: systematic review and meta-analysis. — 2020, Seminars in Thoracic and Cardiovascular Surgery (PMID:33181305 DOI:10.1053/j.semtcvs.2020.11.011)
10. Oral fluoroquinolones and risk of aortic aneurysm or dissection: A nationwide population‐based propensity score‐matched cohort study — 2023, Pharmacotherapy (PMID:37381584 DOI:10.1002/phar.2841)

---

## Query: `compare-tirzepatide-semaglutide` — "tirzepatide versus semaglutide for weight loss"
Category: therapy_comparison. Intent: Head-to-head / indirect comparison of tirzepatide vs semaglutide for weight loss (SURMOUNT/SURPASS/STEP).

### Engine A — top 10
1. Semaglutide vs Tirzepatide for Weight Loss in Adults With Overweight or Obesity — 2024, JAMA Internal Medicine (PMID:38976257 DOI:10.1001/jamainternmed.2024.2525)
2. Tirzepatide as Compared with Semaglutide for the Treatment of Obesity. — 2025, New England Journal of Medicine (PMID:40353578 DOI:10.1056/NEJMoa2416394)
3. Tirzepatide Versus Semaglutide for Weight Loss in Overweight and Obese Adults: A Systematic Review and Meta-Analysis of Direct Comparative Studies — 2025, Cureus (PMID:40666599 DOI:10.7759/cureus.86080)
4. Comparative Efficacy of Tirzepatide vs. Semaglutide in Reducing Body Weight in Humans: A Systematic Review and Meta-Analysis of Clinical Trials and Real-World Data — 2025, Journal of Clinical Medicine Research (PMID:40503067 DOI:10.14740/jocmr6231)
5. Tirzepatide Versus Semaglutide on Weight Loss in Type 2 Diabetes Patients: A Systematic Review and Meta‐Analysis of Direct Comparative Studies — 2025, Endocrinology, Diabetes & Metabolism (PMID:40184508 DOI:10.1002/edm2.70045)
6. Comparative Effectiveness of Semaglutide and Tirzepatide for Weight Loss in Adults with Overweight and Obesity in the US: A Real-World Evidence Study — 2023, medRxiv (DOI:10.1101/2023.11.21.23298775)
7. Comparative efficacy and safety of semaglutide 2.4 mg and tirzepatide 5-15 mg in obesity with or without type 2 diabetes: A systematic review of Phase 3 clinical trials. — 2025, Diabetes & metabolic syndrome (PMID:40086043 DOI:10.1016/j.dsx.2025.103212)
8. Head-to-head comparison of tirzepatide and semaglutide for weight loss: A systematic review and meta-analysis. — 2026, Obesity Research and Clinical Practice (PMID:41723034 DOI:10.1016/j.orcp.2026.02.002)
9. A Review of Metabolic Health Outcomes of Tirzepatide vs Semaglutide in Obesity and Type 2 Diabetes — 2025, Journal (DOI:10.26685/urncst.945)
10. Comparative Efficacy and Safety of Tirzepatide versus Semaglutide: A Systematic Review and Meta-Analysis with Cardiometabolic Implications — 2026, Nepal Journal of Epidemiology (DOI:10.3126/nje.v16i1.92323)

### Engine B — top 10
1. Comparative effectiveness of GLP-1 receptor agonists on glycaemic control, body weight, and lipid profile for type 2 diabetes: systematic review and network meta-analysis. — 2024, BMJ (PMID:38286487 DOI:10.1136/bmj-2023-076410)
2. Subcutaneously administered tirzepatide vs semaglutide for adults with type 2 diabetes: a systematic review and network meta-analysis of randomised controlled trials. — 2024, Diabetologia (PMID:38613667 DOI:10.1007/s00125-024-06144-1)
3. Tirzepatide Versus Semaglutide on Weight Loss in Type 2 Diabetes Patients: A Systematic Review and Meta-Analysis of Direct Comparative Studies. — 2025, Endocrinol Diabetes Metab (PMID:40184508 DOI:10.1002/edm2.70045)
4. Efficacy and Safety of Glucagon-Like Peptide-1 Receptor Agonists for Weight Loss Among Adults Without Diabetes : A Systematic Review of Randomized Controlled Trials. — 2025, Ann Intern Med (PMID:39761578 DOI:10.7326/ANNALS-24-01590)
5. Seven glucagon-like peptide-1 receptor agonists and polyagonists for weight loss in patients with obesity or overweight: an updated systematic review and network meta-analysis of randomized controlled trials. — 2024, Metabolism (PMID:39305981 DOI:10.1016/j.metabol.2024.156038)
6. Tirzepatide Reduces Appetite, Energy Intake, and Fat Mass in People With Type 2 Diabetes — 2023, Diabetes Care (PMID:36857477 DOI:10.2337/dc22-1710)
7. Semaglutide vs Tirzepatide for Weight Loss in Adults With Overweight or Obesity. — 2024, JAMA Intern Med (PMID:38976257 DOI:10.1001/jamainternmed.2024.2525)
8. Greater improvement in insulin sensitivity per unit weight loss associated with tirzepatide versus semaglutide: An exploratory analysis — 2025, Diabetes Obesity and Metabolism (PMID:39762971 DOI:10.1111/dom.16159)
9. Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes. — 2021, N Engl J Med (PMID:34170647 DOI:10.1056/NEJMoa2107519)
10. Tirzepatide as Compared with Semaglutide for the Treatment of Obesity. — 2025, N Engl J Med (PMID:40353578 DOI:10.1056/NEJMoa2416394)

---

## Query: `compare-ticagrelor-clopidogrel` — "ticagrelor versus clopidogrel in acute coronary syndrome"
Category: therapy_comparison. Intent: Ticagrelor vs clopidogrel outcomes in ACS (PLATO + meta-analyses).

**Must-have landmark papers (ground truth):**
- PLATO trial (ticagrelor vs clopidogrel)

### Engine A — top 10
1. Ticagrelor versus clopidogrel in patients with acute coronary syndromes. — 2009, New England Journal of Medicine (PMID:19717846 DOI:10.1056/NEJMoa0904327)
2. TICAGRELOR VERSUS CLOPIDOGREL IN PATIENTS WITH NON-ST-ELEVATION ACUTE CORONARY SYNDROME: RESULTS FROM THE PLATO TRIAL — 2013, Journal of the American College of Cardiology (DOI:10.1016/S0735-1097(13)60002-9)
3. Comparison of ticagrelor with clopidogrel in patients with a planned invasive strategy for acute coronary syndromes (PLATO): a randomised double-blind study. — 2010, The Lancet (PMID:20079528 DOI:10.1016/S0140-6736(09)62191-7)
4. Ticagrelor versus clopidogrel in patients with acute coronary syndrome undergoing complex percutaneous coronary intervention — 2022, Catheterization and cardiovascular interventions (PMID:35032148 DOI:10.1002/ccd.30077)
5. COMPARISON OF TICAGRELOR VERSUS PRASUGREL IN PATIENTS WITH ACUTE CORONARY SYNDROME: A META-ANALYSIS OF RANDOMIZED CONTROLLED TRIALS — 2020, Journal of the American College of Cardiology (DOI:10.1016/s0735-1097(20)30861-5)
6. Ticagrelor was more effective than clopidogrel, with no increase in major bleeding in acute coronary syndromes — 2009, Annals of Internal Medicine (PMID:https://pubmed.ncbi.nlm.nih.gov/20008753 DOI:10.7326/0003-4819-151-12-200912150-02004)
7. Clopidogrel, prasugrel or ticagrelor in patients with acute coronary syndromes undergoing percutaneous coronary intervention — 2016, Internal medicine journal (Print) (PMID:26909472 DOI:10.1111/imj.13041)
8. Ticagrelor was more effective than clopidogrel in acute coronary syndromes with planned invasive treatment — 2010, Annals of Internal Medicine (PMID:https://pubmed.ncbi.nlm.nih.gov/20479021 DOI:10.7326/0003-4819-152-10-201005180-02004)
9. Ticagrelor vs Clopidogrel for Patients With Acute Coronary Syndrome Undergoing Percutaneous Intervention. — 2021, Journal of the American Medical Association (JAMA) (PMID:33651086 DOI:10.1001/jama.2020.26020)
10. Comparisons between ticagrelor and clopidogrel following percutaneous coronary intervention in patients with acute coronary syndrome: a comprehensive meta-analysis — 2019, Drug Design, Development and Therapy (PMID:30863011 DOI:10.2147/DDDT.S196535)

### Engine B — top 10
1. Clopidogrel versus ticagrelor or prasugrel in patients aged 70 years or older with non-ST-elevation acute coronary syndrome (POPular AGE): the randomised, open-label, non-inferiority trial. — 2020, Lancet (PMID:32334703 DOI:10.1016/S0140-6736(20)30325-1)
2. Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes — 2009, New England Journal of Medicine (PMID:19717846 DOI:10.1056/nejmoa0904327)
3. Ticagrelor Versus Clopidogrel in Patients With ST-Elevation Acute Coronary Syndromes Intended for Reperfusion With Primary Percutaneous Coronary Intervention — 2010, Circulation (PMID:21060072 DOI:10.1161/circulationaha.109.927582)
4. Safety and Efficacy of Ticagrelor versus Clopidogrel in East Asian Patients with Acute Coronary Syndrome Undergoing Percutaneous Coronary Intervention Treated with Dual Antiplatelet Therapy: A Meta-Analysis of Randomized Controlled Trials. — 2023, Cardiology (PMID:37094558 DOI:10.1159/000530602)
5. Compared efficacy of clopidogrel and ticagrelor in treating acute coronary syndrome: a meta-analysis. — 2018, BMC Cardiovasc Disord (PMID:30497387 DOI:10.1186/s12872-018-0948-4)
6. Ticagrelor versus clopidogrel in patients with acute coronary syndromes intended for non-invasive management: substudy from prospective randomised PLATelet inhibition and patient Outcomes (PLATO) trial — 2011, BMJ (PMID:21685437 DOI:10.1136/bmj.d3527)
7. Safety of Clopidogrel vs. Ticagrelor in Dual Antiplatelet Therapy Regimens for High-Bleeding Risk Acute Coronary Syndrome Patients: A Comprehensive Meta-analysis of Adverse Outcomes. — 2024, High Blood Press Cardiovasc Prev (PMID:38557855 DOI:10.1007/s40292-024-00635-3)
8. Ticagrelor versus clopidogrel in East Asian patients with acute coronary syndrome: Systematic review and meta-analysis. — 2018, Cardiovasc Revasc Med (PMID:29452843 DOI:10.1016/j.carrev.2018.01.009)
9. Ticagrelor Compared to Clopidogrel in Acute Coronary Syndromes trial (TC4): a Bayesian pragmatic cluster randomized controlled trial. — 2025, CMAJ (PMID:40164463 DOI:10.1503/cmaj.241862)
10. De-escalation from ticagrelor to clopidogrel in acute coronary syndrome patients: a systematic review and meta-analysis. — 2019, J Thromb Thrombolysis (PMID:31004312 DOI:10.1007/s11239-019-01860-7)

---

## Query: `mechanism-sglt2-cardioprotection` — "mechanism of action of SGLT2 inhibitors cardioprotection"
Category: mechanism. Intent: Mechanistic basis of SGLT2 inhibitor cardioprotection; expect reviews + translational studies.

### Engine A — top 10
_(no results)_

### Engine B — top 10
1. An Overview of the Cardiorenal Protective Mechanisms of SGLT2 Inhibitors — 2022, International Journal of Molecular Sciences (PMID:35409011 DOI:10.3390/ijms23073651)
2. SGLT2 inhibitors and cardioprotection: a matter of debate and multiple hypotheses — 2019, Postgraduate medicine (PMID:30757937 DOI:10.1080/00325481.2019.1581971)
3. Potential mechanisms responsible for cardioprotective effects of sodium–glucose co-transporter 2 inhibitors — 2018, Cardiovascular Diabetology (PMID:29991346 DOI:10.1186/s12933-018-0745-5)
4. Reno- and cardioprotective molecular mechanisms of SGLT2 inhibitors beyond glycemic control - from bedside to bench. — 2023, American Journal of Physiology - Cell Physiology (PMID:37519230 DOI:10.1152/ajpcell.00177.2023)
5. SGLT2 inhibitors: a focus on cardiac benefits and potential mechanisms — 2021, Heart Failure Reviews (PMID:33534040 DOI:10.1007/s10741-021-10079-9)
6. The Potential Cardioprotective Mechanism of Sodium-Glucose Cotransporter 2 Inhibitors — 2019, Journal of Korean Diabetes (DOI:10.4093/JKD.2019.20.2.81)
7. Potential mechanisms underlying the cardiovascular benefits of sodium glucose cotransporter 2 inhibitors: a systematic review of data from preclinical studies — 2018, Cardiovascular Research (PMID:30475996 DOI:10.1093/cvr/cvy295)
8. SGLT2 Inhibition in Heart Failure: Clues to Cardiac Effects? — 2024, Cardiology in Review (PMID:38189526 DOI:10.1097/CRD.0000000000000637)
9. Cardioprotection conferred by SGLT2 inhibitors: a renal proximal tubule perspective. — 2019, American Journal of Physiology - Cell Physiology (PMID:31721613 DOI:10.1152/ajpcell.00275.2019)
10. State-of-the-art-review Mechanisms of action of SGLT2 inhibitors and clinical implications. — 2024, American Journal of Hypertension (PMID:39017631 DOI:10.1093/ajh/hpae092)

---

## Query: `psy-stard-major-depression` — "STAR*D acute and longer-term outcomes depressed outpatients treatment steps"
Category: trial_acronym. Intent: Resolve STAR*D to the landmark sequenced-treatment effectiveness report for major depression.

**Must-have landmark papers (ground truth):**
- STAR*D summary (Rush, Am J Psychiatry 2006)

### Engine A — top 10
_(no results)_

### Engine B — top 10
1. Acute and Longer- Term Outcomes in Depressed Outpatients Requiring One or Several Treatment Steps: A STAR*D Report — 2006, American Journal of Psychiatry (PMID:https://pubmed.ncbi.nlm.nih.gov/17074942 DOI:10.1176/AJP.2006.163.11.1905)
2. Acute and longer-term outcomes in depressed outpatients requiring one or several treatment steps: a STAR*D report. — 2006, American Journal of Psychiatry (PMID:17074942 DOI:10.1176/appi.ajp.163.11.1905)
3. The STAR*D project results: A comprehensive review of findings — 2007, Current Psychiatry Reports (PMID:18221624 DOI:10.1007/S11920-007-0061-3)
4. Acute and Longer-Term Outcomes in Depressed Outpatients Requiring One or Several Treatment Steps: A STAR*D Report — 2008, ? (DOI:10.1176/FOC.6.1.FOC128)
5. What did STAR*D teach us? Results from a large-scale, practical, clinical trial for patients with depression. — 2009, Psychiatric Services (PMID:19880458 DOI:10.1176/ps.2009.60.11.1439)
6. STAR*D — 2009, CNS Drugs (PMID:19594193 DOI:10.2165/00023210-200923080-00001)
7. Sequenced treatment alternatives to relieve depression (STAR*D): rationale and design. — 2004, Controlled Clinical Trials (PMID:15061154 DOI:10.1016/S0197-2456(03)00112-0)
8. Sequenced Treatment Alternatives to Relieve Depression (STAR*D). Part 2: Study outcomes. — 2008, Journal of Psychosocial Nursing and Mental Health Services (PMID:18935932 DOI:10.3928/02793695-20081001-05)
9. What Did STAR✫D Teach Us? Results From a Large-Scale, Practical, Clinical Trial for Patients With Depression — 2012, ? (DOI:10.1176/APPI.FOCUS.10.4.510)
10. What Are the Implications of the STAR*D Trial for Primary Care? A Review and Synthesis. — 2008, The Primary Care Companion to the Journal Clinical Psychiatry (PMID:18458732 DOI:10.4088/PCC.V10N0201)

---

## Query: `psy-catie-antipsychotics` — "CATIE effectiveness of antipsychotic drugs in chronic schizophrenia"
Category: trial_acronym. Intent: Resolve CATIE to the antipsychotic effectiveness RCT in chronic schizophrenia.

**Must-have landmark papers (ground truth):**
- CATIE phase 1 (Lieberman, NEJM 2005)

### Engine A — top 10
1. Effectiveness of antipsychotic drugs in patients with chronic schizophrenia: efficacy, safety and cost outcomes of CATIE and other trials. — 2007, Journal of Clinical Psychiatry (PMID:17335312 DOI:10.4088/JCP.0207E04)
2. What CATIE found: results from the schizophrenia trial. — 2008, Psychiatric Services (PMID:18451005 DOI:10.1176/ps.2008.59.5.500)
3. The National Institute of Mental Health Clinical Antipsychotic Trials of Intervention Effectiveness (CATIE) project: schizophrenia trial design and protocol development. — 2003, Schizophrenia bulletin (PMID:12908658 DOI:10.1093/OXFORDJOURNALS.SCHBUL.A006986)
4. Clinical Antipsychotic Trials of Intervention Effectiveness in Schizophrenia: Selective Review on Clinical Outcomes — 2009, Hong Kong Journal of Psychiatry (— no id —)
5. Selecting antipsychotics in schizophrenia: lessons from CATIE — 2006, Journal of Psychopharmacology (PMID:16574710 DOI:10.1177/0269881106062765)
6. Effectiveness of olanzapine, quetiapine, and risperidone in patients with chronic schizophrenia after discontinuing perphenazine: a CATIE study. — 2007, American Journal of Psychiatry (PMID:17329466 DOI:10.1176/AJP.2007.164.3.415)
7. Comparative effectiveness of antipsychotic drugs. A commentary on: Cost Utility Of The Latest Antipsychotic Drugs In Schizophrenia Study (CUtLASS 1) and Clinical Antipsychotic Trials Of Intervention Effectiveness (CATIE). — 2006, Archives of General Psychiatry (PMID:17015808 DOI:10.1001/ARCHPSYC.63.10.1069)
8. Are We Treating Schizophrenia Effectively? Understanding the Primary Outcomes of the CATIE Study — 2006, CNS Spectrums (PMID:16946697 DOI:10.1017/S1092852900025748)
9. Effects of antipsychotic medications on psychosocial functioning in patients with chronic schizophrenia: findings from the NIMH CATIE study. — 2007, American Journal of Psychiatry (PMID:17329467 DOI:10.1176/AJP.2007.164.3.428)
10. Comparative effectiveness of antipsychotic drugs in schizophrenia — 2000, Dialogues in Clinical Neuroscience (PMID:22033808 DOI:10.31887/DCNS.2000.2.4/tstroup)

### Engine B — top 10
1. Effectiveness of olanzapine, quetiapine, risperidone, and ziprasidone in patients with chronic schizophrenia following discontinuation of a previous atypical antipsychotic. — 2006, Am J Psychiatry (PMID:16585435 DOI:10.1176/ajp.2006.163.4.611)
2. Effectiveness of clozapine versus olanzapine, quetiapine, and risperidone in patients with chronic schizophrenia who did not respond to prior atypical antipsychotic treatment. — 2006, Am J Psychiatry (PMID:16585434 DOI:10.1176/ajp.2006.163.4.600)
3. Effects of antipsychotic medications on psychosocial functioning in patients with chronic schizophrenia: findings from the NIMH CATIE study. — 2007, Am J Psychiatry (PMID:17329467 DOI:10.1176/ajp.2007.164.3.428)
4. Effectiveness of antipsychotic drugs in patients with chronic schizophrenia. — 2005, N Engl J Med (PMID:16172203 DOI:10.1056/NEJMoa051688)
5. Effectiveness of olanzapine, quetiapine, and risperidone in patients with chronic schizophrenia after discontinuing perphenazine: a CATIE study. — 2007, Am J Psychiatry (PMID:17329466 DOI:10.1176/ajp.2007.164.3.415)
6. Efficacy, Acceptability, and Tolerability of Antipsychotics in Treatment-Resistant Schizophrenia — 2016, JAMA Psychiatry (PMID:26842482 DOI:10.1001/jamapsychiatry.2015.2955)
7. Evidence for association of the GLI2 gene with tardive dyskinesia in patients with chronic schizophrenia. — 2010, Mov Disord (PMID:20939080 DOI:10.1002/mds.23377)
8. Treatment adherence in schizophrenia: a patient-level meta-analysis of combined CATIE and EUFEST studies. — 2015, Eur Neuropsychopharmacol (PMID:26004980 DOI:10.1016/j.euroneuro.2015.04.003)
9. Atypical Antipsychotics: CATIE Study, Drug-Induced Movement Disorder and Resulting Iatrogenic Psychiatric-Like Symptoms, Supersensitivity Rebound Psychosis and Withdrawal Discontinuation Syndromes — 2008, Psychotherapy and Psychosomatics (PMID:18230939 DOI:10.1159/000112883)
10. The effectiveness of antipsychotic medications in patients who use or avoid illicit substances: results from the CATIE study. — 2008, Schizophr Res (PMID:18191383 DOI:10.1016/j.schres.2007.11.034)

---

## Query: `psy-esketamine-trd` — "esketamine nasal spray for treatment-resistant depression efficacy and safety"
Category: therapy_comparison. Intent: Pivotal esketamine + oral antidepressant evidence in TRD (TRANSFORM family).

**Must-have landmark papers (ground truth):**
- TRANSFORM-2 esketamine (Popova, Am J Psychiatry 2019)

### Engine A — top 10
1. Efficacy and Safety of Flexibly Dosed Esketamine Nasal Spray Combined With a Newly Initiated Oral Antidepressant in Treatment-Resistant Depression: A Randomized Double-Blind Active-Controlled Study. — 2019, Am J Psychiatry (PMID:31109201 DOI:10.1176/appi.ajp.2019.19020172)
2. Esketamine Nasal Spray versus Quetiapine for Treatment-Resistant Depression. — 2023, N Engl J Med (PMID:37792613 DOI:10.1056/NEJMoa2304145)
3. Efficacy of Esketamine Nasal Spray Plus Oral Antidepressant Treatment for Relapse Prevention in Patients With Treatment-Resistant Depression: A Randomized Clinical Trial. — 2019, JAMA Psychiatry (PMID:31166571 DOI:10.1001/jamapsychiatry.2019.1189)
4. Efficacy and Safety of Fixed-Dose Esketamine Nasal Spray Combined With a New Oral Antidepressant in Treatment-Resistant Depression: Results of a Randomized, Double-Blind, Active-Controlled Study (TRANSFORM-1). — 2019, Int J Neuropsychopharmacol (PMID:31290965 DOI:10.1093/ijnp/pyz039)
5. Efficacy and Safety of Esketamine Nasal Spray Plus an Oral Antidepressant in Elderly Patients With Treatment-Resistant Depression-TRANSFORM-3. — 2020, Am J Geriatr Psychiatry (PMID:31734084 DOI:10.1016/j.jagp.2019.10.008)
6. Esketamine Nasal Spray Plus Oral Antidepressant in Patients With Treatment-Resistant Depression: Assessment of Long-Term Safety in a Phase 3, Open-Label Study (SUSTAIN-2). — 2020, J Clin Psychiatry (PMID:32316080 DOI:10.4088/JCP.19m12891)
7. Long-term safety and maintenance of response with esketamine nasal spray in participants with treatment-resistant depression: interim results of the SUSTAIN-3 study. — 2023, Neuropsychopharmacology (PMID:37173512 DOI:10.1038/s41386-023-01577-5)
8. Esketamine Nasal Spray in Major Depressive Disorder: A Meta-Analysis of Randomized Controlled Trials. — 2025, Clin Pharmacol Ther (PMID:39790081 DOI:10.1002/cpt.3555)
9. Efficacy and safety of esketamine nasal spray by sex in patients with treatment-resistant depression: findings from short-term randomized, controlled trials. — 2022, Arch Womens Ment Health (PMID:34973081 DOI:10.1007/s00737-021-01185-6)
10. Efficacy and Safety of Intranasal Esketamine Adjunctive to Oral Antidepressant Therapy in Treatment-Resistant Depression — 2017, JAMA Psychiatry (PMID:29282469 DOI:10.1001/jamapsychiatry.2017.3739)

### Engine B — top 10
1. Efficacy and Safety of Flexibly Dosed Esketamine Nasal Spray Combined With a Newly Initiated Oral Antidepressant in Treatment-Resistant Depression: A Randomized Double-Blind Active-Controlled Study. — 2019, American Journal of Psychiatry (PMID:31109201 DOI:10.1176/appi.ajp.2019.19020172)
2. Efficacy and Safety of Fixed-Dose Esketamine Nasal Spray Combined With a New Oral Antidepressant in Treatment-Resistant Depression: Results of a Randomized, Double-Blind, Active-Controlled Study (TRANSFORM-1) — 2019, International Journal of Neuropsychopharmacology (PMID:31290965 DOI:10.1093/ijnp/pyz039)
3. Efficacy and Safety of Esketamine Nasal Spray in Treatment-Resistant Depression: A Systematic Review and Meta-Analysis of Randomized Controlled Trials — 2025, medRxiv (DOI:10.1101/2025.09.22.25336317)
4. Esketamine Nasal Spray versus Quetiapine for Treatment-Resistant Depression. — 2023, New England Journal of Medicine (PMID:37792613 DOI:10.1056/NEJMoa2304145)
5. Esketamine Nasal Spray Plus Oral Antidepressant in Patients With Treatment-Resistant Depression: Assessment of Long-Term Safety in a Phase 3, Open-Label Study (SUSTAIN-2). — 2020, Journal of Clinical Psychiatry (PMID:32316080 DOI:10.4088/jcp.19m12891)
6. Efficacy and Safety of Intranasal Esketamine in Treatment-Resistant Depression in Adults: A Systematic Review — 2021, Cureus (PMID:34447651 DOI:10.7759/cureus.17352)
7. Efficacy and safety of intranasal esketamine for the treatment of major depressive disorder — 2019, Expert Opinion on Pharmacotherapy (PMID:31663783 DOI:10.1080/14656566.2019.1683161)
8. Esketamine: A Novel Option for Treatment-Resistant Depression — 2019, The Annals of Pharmacotherapy (PMID:31795735 DOI:10.1177/1060028019892644)
9. Efficacy of esketamine nasal spray for treatment-resistant depression: A meta-analysis of randomized controlled studies — 2025, Medicine (PMID:40020133 DOI:10.1097/MD.0000000000041495)
10. Intranasal esketamine: A novel drug for treatment-resistant depression. — 2020, American Journal of Health-System Pharmacy (PMID:32729898 DOI:10.1093/ajhp/zxaa191)

---

## Query: `psy-ketamine-nmda-depression` — "ketamine NMDA antagonist rapid antidepressant treatment-resistant major depression"
Category: mechanism. Intent: Foundational rapid-acting glutamatergic antidepressant evidence; expect the proof-of-concept RCT + mechanism reviews.

**Must-have landmark papers (ground truth):**
- Zarate ketamine RCT (Arch Gen Psychiatry 2006)

### Engine A — top 10
1. Antidepressant efficacy of ketamine in treatment-resistant major depression: a two-site randomized controlled trial. — 2013, Am J Psychiatry (PMID:23982301 DOI:10.1176/appi.ajp.2013.13030392)
2. Biomarkers of ketamine's antidepressant effect: An umbrella review. — 2023, J Affect Disord (PMID:36521662 DOI:10.1016/j.jad.2022.12.021)
3. Ketamine Decreases Resting State Functional Network Connectivity in Healthy Subjects: Implications for Antidepressant Drug Action — 2012, PLoS ONE (PMID:23049758 DOI:10.1371/journal.pone.0044799)
4. Double-blind, placebo-controlled, dose-ranging trial of intravenous ketamine as adjunctive therapy in treatment-resistant depression (TRD). — 2020, Mol Psychiatry (PMID:30283029 DOI:10.1038/s41380-018-0256-5)
5. The Canadian Network for Mood and Anxiety Treatments (CANMAT) Task Force Recommendations for the Use of Racemic Ketamine in Adults with Major Depressive Disorder: Recommandations Du Groupe De Travail Du R&#xe9;seau Canadien Pour Les Traitements De L'humeur Et De L'anxi&#xe9;t&#xe9; (Canmat) Concernant L'utilisation De La K&#xe9;tamine Rac&#xe9;mique Chez Les Adultes Souffrant De Trouble D&#xe9;pressif Majeur. — 2021, Can J Psychiatry (PMID:33174760 DOI:10.1177/0706743720970860)
6. Predicting treatment response to ketamine in treatment-resistant depression using auditory mismatch negativity: Study protocol. — 2024, PLoS One (PMID:39116153 DOI:10.1371/journal.pone.0308413)
7. Efficacy and Safety of Intranasal Esketamine Adjunctive to Oral Antidepressant Therapy in Treatment-Resistant Depression — 2017, JAMA Psychiatry (PMID:29282469 DOI:10.1001/jamapsychiatry.2017.3739)
8. A Randomized Trial of an N-methyl-D-aspartate Antagonist in Treatment-Resistant Major Depression — 2006, Archives of General Psychiatry (PMID:16894061 DOI:10.1001/archpsyc.63.8.856)
9. Riluzole for relapse prevention following intravenous ketamine in treatment-resistant depression: a pilot randomized, placebo-controlled continuation trial — 2009, The International Journal of Neuropsychopharmacology (PMID:19288975 DOI:10.1017/s1461145709000169)
10. KETAMINE'S MECHANISM OF ACTION: A PATH TO RAPID-ACTING ANTIDEPRESSANTS. — 2016, Depress Anxiety (PMID:27062302 DOI:10.1002/da.22501)

### Engine B — top 10
1. The promise of ketamine for treatment-resistant depression: current evidence and future directions — 2015, Annals of the New York Academy of Sciences (PMID:25649308 DOI:10.1111/nyas.12646)
2. A randomized trial of an N-methyl-D-aspartate antagonist in treatment-resistant major depression. — 2006, Archives of General Psychiatry (PMID:16894061 DOI:10.1001/ARCHPSYC.63.8.856)
3. Ketamine for Treatment-Resistant Unipolar Depression — 2012, CNS Drugs (PMID:22303887 DOI:10.2165/11599770-000000000-00000)
4. NMDA Antagonists for Treatment-Resistant Depression. — 2019, Handbook of Experimental Pharmacology (PMID:30478734 DOI:10.1007/164_2018_165)
5. The Role of Ketamine in Treatment-Resistant Depression: A Systematic Review — 2014, Current Neuropharmacology (PMID:25426012 DOI:10.2174/1570159X12666140619204251)
6. Ketamine for depression: evidence, challenges and promise — 2015, World Psychiatry (PMID:26407791 DOI:10.1002/wps.20269)
7. [Ketamine for treatment of acute depression]. — 2013, Ugeskrift for læger (PMID:24011203)
8. Nmda Receptor Antagonists for Depression: Critical Considerations — 2015, Annals of clinical psychiatry : official journal of the American Academy of Clinical Psychiatrists (PMID:26247220 DOI:10.1177/104012371502700308)
9. Treatment-Resistant Major Depression: Rationale for NMDA Receptors as Targets and Nitrous Oxide as Therapy — 2015, Frontiers in Psychiatry (PMID:26696909 DOI:10.3389/fpsyt.2015.00172)
10. Antidepressant Efficacy of Ketamine in Treatment-Resistant Major Depression: A Two-Site Randomized Controlled Trial — 2013, American Journal of Psychiatry (PMID:23982301 DOI:10.1176/appi.ajp.2013.13030392)

---

## Query: `psy-lithium-bipolar-maintenance` — "lithium versus valproate for relapse prevention in bipolar disorder"
Category: therapy_comparison. Intent: Maintenance therapy comparison in bipolar I disorder (BALANCE + meta-analyses).

**Must-have landmark papers (ground truth):**
- BALANCE (Geddes, Lancet 2010)

### Engine A — top 10
1. Evidence-based treatment strategies for rapid cycling bipolar disorder, a systematic review. — 2022, J Affect Disord (PMID:35545157 DOI:10.1016/j.jad.2022.05.017)
2. Olanzapine in long-term treatment for bipolar disorder. — 2009, Cochrane Database Syst Rev (PMID:19160237 DOI:10.1002/14651858.CD004367.pub2)
3. Valproic acid, valproate and divalproex in the maintenance treatment of bipolar disorder. — 2013, Cochrane Database Syst Rev (PMID:24132760 DOI:10.1002/14651858.CD003196.pub2)
4. Lithium plus valproate combination therapy versus monotherapy for relapse prevention in bipolar I disorder (BALANCE): a randomised open-label trial. — 2010, Lancet (PMID:20092882 DOI:10.1016/S0140-6736(09)61828-6)
5. Relapse prevention in bipolar I disorder: 18-month comparison of olanzapine plus mood stabiliser v. mood stabiliser alone. — 2004, Br J Psychiatry (PMID:15056579 DOI:10.1192/bjp.184.4.337)
6. Valproic acid, valproate and divalproex in the maintenance treatment of bipolar disorder. — 2001, Cochrane Database Syst Rev (PMID:11687047 DOI:10.1002/14651858.CD003196)
7. Pharmacological interventions for the prevention of relapse in bipolar disorder: a systematic review of controlled trials. — 2009, J Psychopharmacol (PMID:18635701 DOI:10.1177/0269881108093885)
8. Tamoxifen for bipolar disorder: Systematic review and meta-analysis. — 2019, J Psychopharmacol (PMID:30741085 DOI:10.1177/0269881118822167)
9. A systematic review and economic model of the clinical effectiveness and cost-effectiveness of interventions for preventing relapse in people with bipolar disorder. — 2007, Health Technol Assess (PMID:17903393 DOI:10.3310/hta11390)
10. Characterizing relapse prevention in bipolar disorder with adjunctive ziprasidone: clinical and methodological implications. — 2013, J Affect Disord (PMID:22999893 DOI:10.1016/j.jad.2012.04.024)

### Engine B — top 10
1. Lithium plus valproate combination therapy versus monotherapy for relapse prevention in bipolar I disorder (BALANCE): a randomised open-label trial. — 2010, The Lancet (PMID:20092882 DOI:10.1016/S0140-6736(09)61828-6)
2. Lithium Plus Valproate Combination Therapy Versus Monotherapy for Relapse Prevention in Bipolar I Disorder (BALANCE): A Randomised Open-Label Trial — 2011, ? (DOI:10.1176/FOC.9.4.FOC488)
3. In Bipolar Disorder, Lithium Alone or with Valproate Is More Effective Than Valproate Alone — 2010, NEJM Journal Watch (DOI:10.1056/JW201002160000002)
4. Pharmacological interventions for the prevention of relapse in bipolar disorder: a systematic review of controlled trials — 2009, Journal of Psychopharmacology (PMID:18635701 DOI:10.1177/0269881108093885)
5. A systematic review and economic model of the clinical effectiveness and cost-effectiveness of interventions for preventing relapse in people with bipolar disorder. — 2007, Health Technology Assessment (PMID:17903393 DOI:10.3310/HTA11390)
6. Valproic acid, valproate and divalproex in the maintenance treatment of bipolar disorder. — 2013, Cochrane Database of Systematic Reviews (PMID:24132760 DOI:10.1002/14651858.CD003196.pub2)
7. Lithium vs valproate in the maintenance treatment of bipolar I disorder: A post- hoc analysis of a randomized double-blind placebo-controlled trial — 2019, Australian and New Zealand journal of psychiatry (Print) (PMID:31845587 DOI:10.1177/0004867419894067)
8. Valproate v. lithium in the treatment of bipolar disorder in clinical practice: observational nationwide register-based cohort study. — 2011, The British journal of psychiatry : the journal of mental science (PMID:21593515 DOI:10.1192/bjp.bp.110.084822)
9. Lithium Bests Valproate in Preventing Relapse — 2010, ? (DOI:10.1176/PN.45.5.PSYCHNEWS_45_5_025)
10. Lithium is more effective than placebo for preventing all relapses in patients with bipolar but not unipolar disorder — 2002, Evidence-Based Mental Health (PMID:11915813 DOI:10.1136/EBMH.5.1.10)

---

## Query: `psy-ssri-vs-placebo-depression` — "In adults with major depressive disorder, do SSRIs compared with placebo reduce depressive symptoms?"
Category: pico. Intent: P=MDD, I=SSRI, C=placebo, O=symptom reduction/response. Expect large RCTs + network meta-analyses (Cipriani).

### Engine A — top 10
1. Selective serotonin reuptake inhibitors versus placebo in patients with major depressive disorder. A systematic review with meta-analysis and Trial Sequential Analysis — 2017, BMC Psychiatry (PMID:28178949 DOI:10.1186/s12888-016-1173-2)
2. Should antidepressants be used for major depressive disorder? — 2019, BMJ evidence-based medicine (PMID:31554608 DOI:10.1136/bmjebm-2019-111238)
3. Beneficial and harmful effects of antidepressants versus placebo, ‘active placebo’, or no intervention for adults with major depressive disorder: a protocol for a systematic review of published and unpublished data with meta-analyses and trial sequential analyses — 2021, Systematic Reviews (PMID:34034811 DOI:10.1186/s13643-021-01705-6)
4. Consistent superiority of selective serotonin reuptake inhibitors over placebo in reducing depressed mood in patients with major depression — 2015, Molecular Psychiatry (PMID:25917369 DOI:10.1038/mp.2015.53)
5. Are SSRIs more effective than placebo in patients with major depressive disorder? — 2019, Evidence-Based Practice (DOI:10.1097/ebp.0000000000000372)
6. The role of selective serotonin reuptake inhibitors in preventing relapse of major depressive disorder — 2018, Therapeutic Advances in Psychopharmacology (PMID:29344343 DOI:10.1177/2045125317737264)
7. Citalopram for major depressive disorder in adults: a systematic review and meta-analysis of published placebo-controlled trials — 2011, BMJ Open (PMID:22021869 DOI:10.1136/bmjopen-2011-000106)
8. Comparative Efficacy of Antidepressants in the Treatment of Major Depressive Disorder (MDD) in Adult’s — 2025, International Journal For Multidisciplinary Research (DOI:10.36948/ijfmr.2025.v07i02.38971)
9. SSRIs have a smaller benefit in paediatric when compared to adult major depressive disorder — 2016, Evidence-Based Mental Health (PMID:26729796 DOI:10.1136/eb-2015-102216)
10. A Review of Antidepressant Medications in the Treatment of Major Depressive Disorder: Effectiveness vs. Side Effects — 2025, Research Journal of Psychology (DOI:10.59075/rjs.v3i3.164)

### Engine B — top 10
1. Fluoxetine, cognitive-behavioral therapy, and their combination for adolescents with depression: Treatment for Adolescents With Depression Study (TADS) randomized controlled trial. — 2004, JAMA (PMID:15315995 DOI:10.1001/jama.292.7.807)
2. New generation antidepressants for depression in children and adolescents: a network meta-analysis. — 2021, Cochrane Database Syst Rev (PMID:34029378 DOI:10.1002/14651858.CD013674.pub2)
3. Antidepressant-placebo differences for specific adverse events in major depressive disorder: A systematic review. — 2020, J Affect Disord (PMID:32217218 DOI:10.1016/j.jad.2020.02.013)
4. Efficacy of anti-inflammatory treatment on major depressive disorder or depressive symptoms: meta-analysis of clinical trials. — 2019, Acta Psychiatr Scand (PMID:30834514 DOI:10.1111/acps.13016)
5. Discontinuation of antidepressants after remission with antidepressant medication in major depressive disorder: a systematic review and meta-analysis. — 2021, Mol Psychiatry (PMID:32704061 DOI:10.1038/s41380-020-0843-0)
6. Medication Augmentation after the Failure of SSRIs for Depression — 2006, New England Journal of Medicine (DOI:10.1056/nejmoa052964)
7. Probiotic Lactobacillus plantarum 299v supplementation in patients with major depression in a double-blind, randomized, placebo-controlled trial: A metabolomics study. — 2025, J Affect Disord (PMID:39271063 DOI:10.1016/j.jad.2024.09.058)
8. Systematic Review and Meta-Analysis: The Association Between Newer-Generation Antidepressants and Insomnia in Children and Adolescents With Major Depressive Disorder. — 2025, J Am Acad Child Adolesc Psychiatry (PMID:39828036 DOI:10.1016/j.jaac.2025.01.006)
9. Reduced Brain Responsiveness to Emotional Stimuli With Escitalopram But Not Psilocybin Therapy for Depression. — 2025, Am J Psychiatry (PMID:40329640 DOI:10.1176/appi.ajp.20230751)
10. A randomized, double-blind placebo-controlled trial of oral creatine monohydrate augmentation for enhanced response to a selective serotonin reuptake inhibitor in women with major depressive disorder. — 2012, Am J Psychiatry (PMID:22864465 DOI:10.1176/appi.ajp.2012.12010009)

---

## Query: `exact-flaura-osimertinib` — "Osimertinib in Untreated EGFR-Mutated Advanced Non-Small-Cell Lung Cancer"
Category: exact_paper. Intent: Retrieve the FLAURA primary results paper by its exact title.

**Must-have landmark papers (ground truth):**
- FLAURA (Soria, NEJM 2018)

### Engine A — top 10
1. Osimertinib in Untreated EGFR-Mutated Advanced Non-Small-Cell Lung Cancer. — 2018, N Engl J Med (PMID:29151359 DOI:10.1056/NEJMoa1713137)
2. Overall Survival with Osimertinib in Untreated, EGFR-Mutated Advanced NSCLC. — 2020, N Engl J Med (PMID:31751012 DOI:10.1056/NEJMoa1913662)
3. Osimertinib in Resected EGFR-Mutated Non-Small-Cell Lung Cancer. — 2020, N Engl J Med (PMID:32955177 DOI:10.1056/NEJMoa2027071)
4. Amivantamab plus Lazertinib in Previously Untreated EGFR-Mutated Advanced NSCLC. — 2024, N Engl J Med (PMID:38924756 DOI:10.1056/NEJMoa2403614)
5. Overall Survival with Amivantamab-Lazertinib in EGFR-Mutated Advanced NSCLC. — 2025, N Engl J Med (PMID:40923797 DOI:10.1056/NEJMoa2503001)
6. CNS Response to Osimertinib Versus Standard Epidermal Growth Factor Receptor Tyrosine Kinase Inhibitors in Patients With Untreated EGFR-Mutated Advanced Non-Small-Cell Lung Cancer. — 2018, J Clin Oncol (PMID:30153097 DOI:10.1200/JCO.2018.78.3118)
7. Phase 2 study of osimertinib in combination with platinum and pemetrexed in patients with previously untreated EGFR-mutated advanced non-squamous non-small cell lung cancer: The OPAL Study. — 2023, Eur J Cancer (PMID:36966696 DOI:10.1016/j.ejca.2023.02.023)
8. Osimertinib Versus Comparator EGFR TKI as First-Line Treatment for EGFR-Mutated Advanced NSCLC: FLAURA China, A Randomized Study. — 2021, Target Oncol (PMID:33544337 DOI:10.1007/s11523-021-00794-6)
9. Phase III Clinical Trial for the Combination of Erlotinib Plus Ramucirumab Compared With Osimertinib in Previously Untreated Advanced or Recurrent Non-Small Cell Lung Cancer Positive for the L858R Mutation of EGFR: REVOL858R (WJOG14420L). — 2022, Clin Lung Cancer (PMID:34887192 DOI:10.1016/j.cllc.2021.10.007)
10. Impact of tumor programmed death ligand-1 expression on osimertinib efficacy in untreated EGFR-mutated advanced non-small cell lung cancer: a prospective observational study — 2021, Translational Lung Cancer Research (PMID:34584858 DOI:10.21037/tlcr-21-461)

### Engine B — top 10
1. Osimertinib in Untreated EGFR‐Mutated Advanced Non–Small‐Cell Lung Cancer — 2018, New England Journal of Medicine (PMID:29151359 DOI:10.1056/NEJMoa1713137)
2. Osimertinib in untreated epidermal growth factor receptor (EGFR)-mutated advanced non-small cell lung cancer. — 2018, Translational Lung Cancer Research (PMID:29782558 DOI:10.21037/tlcr.2018.03.19)
3. First-line osimertinib in patients with EGFR-mutated advanced non-small cell lung cancer. — 2018, Annals of Translational Medicine (PMID:29610752 DOI:10.21037/atm.2017.12.30)
4. Osimertinib Versus Comparator EGFR TKI as First-Line Treatment for EGFR-Mutated Advanced NSCLC: FLAURA China, A Randomized Study — 2021, Targeted oncology (PMID:33544337 DOI:10.1007/s11523-021-00794-6)
5. Osimertinib: A Review in Previously Untreated, EGFR Mutation-Positive, Advanced NSCLC — 2021, Targeted oncology (PMID:34564820 DOI:10.1007/s11523-021-00839-w)
6. Osimertinib for Untreated — 2017, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA45556)
7. Osimertinib as First-Line Treatment in EGFR-Mutated Non-Small-Cell Lung Cancer. — 2018, New England Journal of Medicine (PMID:29320658 DOI:10.1056/NEJMe1714580)
8. Adjuvant Osimertinib in EGFR-Mutated Non-Small-Cell Lung Cancer. — 2020, New England Journal of Medicine (PMID:33113300 DOI:10.1056/nejme2029532)
9. Osimertinib in the Treatment of EGFR Mutation-Positive Advanced Non-Small Cell Lung Cancer: A Meta-Analysis — 2022, Pharmacology (PMID:36470213 DOI:10.1159/000527321)
10. Patient-reported outcomes from FLAURA: Osimertinib versus erlotinib or gefitinib in patients with EGFR-mutated advanced non-small-cell lung cancer. — 2019, European Journal of Cancer (PMID:31838405 DOI:10.1016/j.ejca.2019.11.006)

---

## Query: `exact-keynote-006-melanoma` — "Pembrolizumab versus Ipilimumab in Advanced Melanoma"
Category: exact_paper. Intent: Retrieve the KEYNOTE-006 primary results paper by its exact title.

**Must-have landmark papers (ground truth):**
- KEYNOTE-006 (Robert, NEJM 2015)

### Engine A — top 10
1. Pembrolizumab versus Ipilimumab in Advanced Melanoma. — 2015, N Engl J Med (PMID:25891173 DOI:10.1056/NEJMoa1503093)
2. Cancer immunotherapy efficacy and patients' sex: a systematic review and meta-analysis. — 2018, Lancet Oncol (PMID:29778737 DOI:10.1016/S1470-2045(18)30261-4)
3. Pembrolizumab versus ipilimumab in advanced melanoma (KEYNOTE-006): post-hoc 5-year results from an open-label, multicentre, randomised, controlled, phase 3 study. — 2019, Lancet Oncol (PMID:31345627 DOI:10.1016/S1470-2045(19)30388-2)
4. Hepatotoxicity From Immune Checkpoint Inhibitors: A Systematic Review and Management Recommendation. — 2020, Hepatology (PMID:32167613 DOI:10.1002/hep.31227)
5. Pembrolizumab versus ipilimumab for advanced melanoma: final overall survival results of a multicentre, randomised, open-label phase 3 study (KEYNOTE-006). — 2017, Lancet (PMID:28822576 DOI:10.1016/S0140-6736(17)31601-X)
6. Pembrolizumab Plus Ipilimumab Following Anti-PD-1/L1 Failure in Melanoma. — 2021, J Clin Oncol (PMID:33945288 DOI:10.1200/JCO.21.00079)
7. Pembrolizumab versus ipilimumab for advanced melanoma: 10-year follow-up of the phase III KEYNOTE-006 study. — 2024, Ann Oncol (PMID:39306585 DOI:10.1016/j.annonc.2024.08.2330)
8. Effect of immunotherapy time-of-day infusion on overall survival among patients with advanced melanoma in the USA (MEMOIR): a propensity score-matched analysis of a single-centre, longitudinal study. — 2021, Lancet Oncol (PMID:34780711 DOI:10.1016/S1470-2045(21)00546-5)
9. Long-Term Outcomes With Nivolumab Plus Ipilimumab or Nivolumab Alone Versus Ipilimumab in Patients With Advanced Melanoma. — 2022, J Clin Oncol (PMID:34818112 DOI:10.1200/JCO.21.02229)
10. Cost Effectiveness of Pembrolizumab for Advanced Melanoma Treatment in Portugal. — 2017, Value Health (PMID:28964438 DOI:10.1016/j.jval.2017.05.009)

### Engine B — top 10
1. Pembrolizumab versus Ipilimumab in Advanced Melanoma. — 2015, New England Journal of Medicine (PMID:25891173 DOI:10.1056/NEJMoa1503093)
2. Pembrolizumab versus ipilimumab for advanced melanoma: final overall survival results of a multicentre, randomised, open-label phase 3 study (KEYNOTE-006). — 2017, The Lancet (PMID:28822576 DOI:10.1016/S0140-6736(17)31601-X)
3. Pembrolizumab superior to ipilimumab in melanoma. — 2015, Cancer Discovery (PMID:25895921 DOI:10.1158/2159-8290.cd-nb2015-055)
4. Pembrolizumab versus ipilimumab for advanced melanoma: final overall survival analysis of KEYNOTE-006. — 2016, Journal of Clinical Oncology (DOI:10.1200/JCO.2016.34.15_SUPPL.9504)
5. Pembrolizumab Improved Survival vs Ipilimumab in Advanced Melanoma — 2015, ? (— no id —)
6. Pembrolizumab and Nivolumab vs. Ipilimumab in Advanced Melanoma — 2015, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA37577)
7. Nivolumab versus ipilimumab in the treatment of advanced melanoma: a critical appraisal — 2018, British Journal of Dermatology (PMID:29766492 DOI:10.1111/bjd.16785)
8. Abstract CT101: Phase III study of pembrolizumab (MK-3475) versus ipilimumab in patients with ipilimumab-naive advanced melanoma — 2015, Cancer Research (DOI:10.1158/1538-7445.AM2015-CT101)
9. Pembrolizumab for Advanced Melanoma — 2016, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA41075)
10. Outcomes by line of therapy and programmed death ligand 1 expression in patients with advanced melanoma treated with pembrolizumab or ipilimumab in KEYNOTE-006: A randomised clinical trial. — 2018, European Journal of Cancer (PMID:30096704 DOI:10.1016/j.ejca.2018.06.034)

---

## Query: `family-keynote-trials` — "KEYNOTE pembrolizumab trials across tumor types"
Category: trial_family. Intent: Resolve the KEYNOTE program to its landmark pembrolizumab RCTs (e.g. KEYNOTE-006 melanoma, KEYNOTE-189 NSCLC).

**Must-have landmark papers (ground truth):**
- Any landmark KEYNOTE trial (006 melanoma / 189 NSCLC)

### Engine A — top 10
1. T-Cell-Inflamed Gene-Expression Profile, Programmed Death Ligand 1 Expression, and Tumor Mutational Burden Predict Efficacy in Patients Treated With Pembrolizumab Across 20 Cancers: KEYNOTE-028. — 2019, Journal of Clinical Oncology (PMID:30557521 DOI:10.1200/JCO.2018.78.2276)
2. Pembrolizumab KEYNOTE-001: an adaptive study leading to accelerated approval for two indications and a companion diagnostic — 2017, Annals of Oncology (PMID:30052728 DOI:10.1093/annonc/mdx076)
3. KEYNOTE-495/KeyImPaCT: A randomized, biomarker-directed, phase II trial of pembrolizumab-based therapy for non–small cell lung cancer (NSCLC) — 2019, Annals of Oncology (DOI:10.1093/annonc/mdz260.111)
4. 427OPembrolizumab for patients with PD-L1–positive advanced carcinoid or pancreatic neuroendocrine tumors: Results from the KEYNOTE-028 study — 2017, Annals of Oncology (DOI:10.1093/ANNONC/MDX368)
5. Pembrolizumab versus the standard of care for cancer therapy: A meta-analysis of 12 KEYNOTE trials comparing overall survival. — 2019, Journal of Clinical Oncology (DOI:10.1200/JCO.2019.37.15_SUPPL.E14159)
6. T-cell inflamed phenotype gene expression signatures to predict clinical benefit from pembrolizumab across multiple tumor types. — 2016, Journal of Clinical Oncology (DOI:10.1200/JCO.2016.34.15_SUPPL.1536)
7. KEYNOTE-427 cohort A: Pembrolizumab monotherapy as first-line therapy in advanced clear cell renal cell carcinoma (ccRCC). — 2018, Annals of Oncology (PMID:32136713 DOI:10.1093/ANNONC/MDY283.080)
8. FDA Approval Summary: Pembrolizumab for Treatment of Metastatic Non‐Small Cell Lung Cancer: First‐Line Therapy and Beyond — 2017, The Oncologist (PMID:28835513 DOI:10.1634/theoncologist.2017-0078)
9. Phase III KEYNOTE-590 study of chemotherapy + pembrolizumab versus chemotherapy + placebo as first-line therapy for patients (Pts) with advanced esophageal or esophagogastric junction (E/EGJ) cancer. — 2018, Annals of Oncology (PMID:32136612 DOI:10.1093/ANNONC/MDY282.168)
10. Pembrolizumab in patients with advanced non-small-cell lung cancer (KEYNOTE-001): 3-year results from an open-label, phase 1 study. — 2019, The Lancet Respiratory Medicine (PMID:30876831 DOI:10.1016/S2213-2600(18)30500-9)

### Engine B — top 10
1. T-Cell-Inflamed Gene-Expression Profile, Programmed Death Ligand 1 Expression, and Tumor Mutational Burden Predict Efficacy in Patients Treated With Pembrolizumab Across 20 Cancers: KEYNOTE-028. — 2019, J Clin Oncol (PMID:30557521 DOI:10.1200/JCO.2018.78.2276)
2. Association of tumour mutational burden with outcomes in patients with advanced solid tumours treated with pembrolizumab: prospective biomarker analysis of the multicohort, open-label, phase 2 KEYNOTE-158 study. — 2020, Lancet Oncol (PMID:32919526 DOI:10.1016/S1470-2045(20)30445-9)
3. Pembrolizumab in microsatellite instability high or mismatch repair deficient cancers: updated analysis from the phase II KEYNOTE-158 study. — 2022, Ann Oncol (PMID:35680043 DOI:10.1016/j.annonc.2022.05.519)
4. Pan-tumor genomic biomarkers for PD-1 checkpoint blockade-based immunotherapy. — 2018, Science (PMID:30309915 DOI:10.1126/science.aar3593)
5. Open-Label, Single-Arm Phase II Study of Pembrolizumab Monotherapy as First-Line Therapy in Patients With Advanced Clear Cell Renal Cell Carcinoma. — 2021, J Clin Oncol (PMID:33529051 DOI:10.1200/JCO.20.02363)
6. Pembrolizumab plus Axitinib versus Sunitinib for Advanced Renal-Cell Carcinoma — 2019, New England Journal of Medicine (PMID:30779529 DOI:10.1056/nejmoa1816714)
7. FDA Approval Summary: Pembrolizumab for the Treatment of Tumor Mutational Burden-High Solid Tumors. — 2021, Clin Cancer Res (PMID:34083238 DOI:10.1158/1078-0432.CCR-21-0327)
8. Pembrolizumab 400 mg every 6 weeks as first-line therapy for advanced melanoma (KEYNOTE-555): Results from cohort B of an open-label, phase 1 study. — 2024, PLoS One (PMID:39531423 DOI:10.1371/journal.pone.0309778)
9. Perioperative Pembrolizumab for Early-Stage Non–Small-Cell Lung Cancer — 2023, New England Journal of Medicine (PMID:37272513 DOI:10.1056/nejmoa2302983)
10. Pembrolizumab versus Ipilimumab in Advanced Melanoma — 2015, New England Journal of Medicine (PMID:25891173 DOI:10.1056/nejmoa1503093)

---

## Query: `onc-her2-adjuvant-residual` — "trastuzumab emtansine T-DM1 for residual HER2-positive breast cancer after neoadjuvant therapy"
Category: therapy_comparison. Intent: Adjuvant T-DM1 vs trastuzumab for residual invasive HER2+ disease (KATHERINE).

**Must-have landmark papers (ground truth):**
- KATHERINE (von Minckwitz, NEJM 2019)

### Engine A — top 10
1. Trastuzumab Emtansine for Residual Invasive HER2‐Positive Breast Cancer — 2019, New England Journal of Medicine (PMID:30516102 DOI:10.1056/NEJMoa1814017)
2. Abstract GS1-10: Phase III study of trastuzumab emtansine (T-DM1) vs trastuzumab as adjuvant therapy in patients with HER2-positive early breast cancer with residual invasive disease after neoadjuvant chemotherapy and HER2-targeted therapy including trastuzumab: Primary results from KATHERINE — 2019, General Session Abstracts (DOI:10.1158/1538-7445.SABCS18-GS1-10)
3. Role of Post-Neoadjuvant therapy with trastuzumab emtansine in HER2-positive breast cancer — 2021, Meditsinskiy sovet = Medical Council (DOI:10.21518/2079-701x-2021-20-68-74)
4. Survival with Trastuzumab Emtansine in Residual HER2-Positive Breast Cancer. — 2025, New England Journal of Medicine (PMID:39813643 DOI:10.1056/NEJMoa2406070)
5. Faculty Opinions recommendation of Trastuzumab Emtansine for Residual Invasive HER2-Positive Breast Cancer. — 2020, Faculty Opinions – Post-Publication Peer Review of the Biomedical Literature (DOI:10.3410/f.734556957.793581147)
6. Selection of Optimal Adjuvant Chemotherapy and Targeted Therapy for Early Breast Cancer: ASCO Guideline Update. — 2020, Journal of Clinical Oncology (PMID:33079579 DOI:10.1200/JCO.20.02510)
7. Abstract P3-14-01: Adjuvant trastuzumab emtansine (T-DM1) vs trastuzumab (H) in patients with residual invasive disease after neoadjuvant therapy for HER2-positive breast cancer: KATHERINE subgroup analysis — 2020, Cancer Research (DOI:10.1158/1538-7445.SABCS19-P3-14-01)
8. Trastuzumab emtansine (T-DM1) as adjuvant treatment of HER2-positive early breast cancer: safety and efficacy — 2020, Expert Review of Anticancer Therapy (PMID:33245671 DOI:10.1080/14737140.2021.1857243)
9. Abstract GS03-12: Phase III study of adjuvant ado-trastuzumab emtansine vs trastuzumab for residual invasive HER2-positive early breast cancer after neoadjuvant chemotherapy and HER2-targeted therapy: KATHERINE final IDFS and updated OS analysis — 2024, Cancer Research (DOI:10.1158/1538-7445.sabcs23-gs03-12)
10. 96O Adjuvant trastuzumab emtansine (T-DM1) vs trastuzumab (T) in patients (pts) with residual invasive disease after neoadjuvant therapy for HER2+ breast cancer: Subgroup analysis from KATHERINE — 2020, Annals of Oncology (DOI:10.1016/j.annonc.2020.03.036)

### Engine B — top 10
1. Trastuzumab Emtansine for Residual Invasive HER2-Positive Breast Cancer. — 2019, N Engl J Med (PMID:30516102 DOI:10.1056/NEJMoa1814017)
2. Survival with Trastuzumab Emtansine in Residual HER2-Positive Breast Cancer. — 2025, N Engl J Med (PMID:39813643 DOI:10.1056/NEJMoa2406070)
3. Trastuzumab emtansine (T-DM1) versus trastuzumab in Chinese patients with residual invasive disease after neoadjuvant chemotherapy and HER2-targeted therapy for HER2-positive breast cancer in the phase 3 KATHERINE study. — 2021, Breast Cancer Res Treat (PMID:33860389 DOI:10.1007/s10549-021-06166-y)
4. Biomarker data from KATHERINE: A phase III study of adjuvant trastuzumab emtansine (T-DM1) versus trastuzumab (H) in patients with residual invasive disease after neoadjuvant therapy for HER2-positive breast cancer. — 2020, Journal of Clinical Oncology (DOI:10.1200/jco.2020.38.15_suppl.502)
5. ERBB2 mRNA Expression and Response to Ado-Trastuzumab Emtansine (T-DM1) in HER2-Positive Breast Cancer — 2020, Cancers (PMID:32674482 DOI:10.3390/cancers12071902)
6. Long-term outcomes of neoadjuvant trastuzumab emtansine&#x2009;+&#x2009;pertuzumab (T-DM1&#x2009;+&#x2009;P) and docetaxel&#x2009;+&#x2009;carboplatin&#x2009;+&#x2009;trastuzumab&#x2009;+&#x2009;pertuzumab (TCbHP) for HER2-positive primary breast cancer: results of the randomized phase 2 JBCRG20 study (Neo-peaks). — 2024, Breast Cancer Res Treat (PMID:38767786 DOI:10.1007/s10549-024-07333-7)
7. Abstract OT-03-01: Trastuzumab deruxtecan (T-DXd; DS-8201) vs trastuzumab emtansine (T-DM1) in high-risk patients with HER2-positive, residual invasive early breast cancer after neoadjuvant therapy: A randomized, phase 3 trial (DESTINY-Breast05) — 2021, Cancer Research (DOI:10.1158/1538-7445.sabcs20-ot-03-01)
8. Abstract GS1-10: Phase III study of trastuzumab emtansine (T-DM1) vs trastuzumab as adjuvant therapy in patients with HER2-positive early breast cancer with residual invasive disease after neoadjuvant chemotherapy and HER2-targeted therapy including trastuzumab: Primary results from KATHERINE — 2019, Cancer Research (DOI:10.1158/1538-7445.sabcs18-gs1-10)
9. Abstract OT1-02-03: Trastuzumab deruxtecan (T-DXd; DS-8201) vs trastuzumab emtansine (T-DM1) in high-risk patients with HER2-positive, residual invasive early breast cancer after neoadjuvant therapy: A randomized, phase 3 trial (DESTINY-Breast05) — 2022, Cancer Research (DOI:10.1158/1538-7445.sabcs21-ot1-02-03)
10. A chemotherapy-free, pathological response-adapted strategy using trastuzumab-pertuzumab and T-DM1 in HER2-positive early breast cancer: the PHERGain-2 study. — 2026, Ann Oncol (PMID:42097893 DOI:10.1016/j.annonc.2026.01.013)

---

## Query: `onc-immunotherapy-broad` — "immune checkpoint inhibitors for advanced solid tumors overview"
Category: broad_clinical. Intent: Broad landscape of PD-1/PD-L1/CTLA-4 checkpoint blockade across solid tumors; expect landmark RCTs + reviews.

### Engine A — top 10
1. mRNA vaccine for cancer immunotherapy. — 2021, Mol Cancer (PMID:33632261 DOI:10.1186/s12943-021-01335-5)
2. Emerging organoid-immune co-culture models for cancer research: from oncoimmunology to personalized immunotherapies. — 2023, J Immunother Cancer (PMID:37220953 DOI:10.1136/jitc-2022-006290)
3. Immune Checkpoint Inhibitors for Advanced Biliary Tract Cancer. — 2022, Curr Cancer Drug Targets (PMID:35168521 DOI:10.2174/1568009622666220215144235)
4. Advances in CAR T cell therapy: antigen selection, modifications, and current trials for solid tumors. — 2024, Front Immunol (PMID:39835140 DOI:10.3389/fimmu.2024.1489827)
5. Patterns of immune evasion in triple-negative breast cancer and new potential therapeutic targets: a review. — 2024, Front Immunol (PMID:39735530 DOI:10.3389/fimmu.2024.1513421)
6. Overview of Immune Checkpoint Inhibitors in Gynecological Cancer Treatment. — 2022, Cancers (Basel) (PMID:35158899 DOI:10.3390/cancers14030631)
7. Neoantigen cancer vaccines: a new star on the horizon. — 2023, Cancer Biol Med (PMID:38164734 DOI:10.20892/j.issn.2095-3941.2023.0395)
8. PD-L1 as a Biomarker in Gastric Cancer Immunotherapy. — 2025, J Gastric Cancer (PMID:39822174 DOI:10.5230/jgc.2025.25.e4)
9. Advances and clinical applications of immune checkpoint inhibitors in hematological malignancies. — 2024, Cancer Commun (Lond) (PMID:39073258 DOI:10.1002/cac2.12587)
10. Tumor immunotherapies by immune checkpoint inhibitors (ICIs); the pros and cons — 2022, Cell Communication and Signaling (PMID:35392976 DOI:10.1186/s12964-022-00854-y)

### Engine B — top 10
1. The Evolving Role of Immune Checkpoint Inhibitors in Cancer Treatment. — 2015, The Oncologist (PMID:26069281 DOI:10.1634/theoncologist.2014-0422)
2. Immune Checkpoint Blockade: A New Paradigm in Treating Advanced Cancer — 2014, Journal of the Advanced Practitioner in Oncology (PMID:26328216 DOI:10.6004/jadpro.2014.5.6.3)
3. Current status and perspectives in translational biomarker research for PD-1/PD-L1 immune checkpoint blockade therapy — 2016, Journal of Hematology & Oncology (PMID:27234522 DOI:10.1186/s13045-016-0277-y)
4. Immune Checkpoint Inhibitors: New Insights and Current Place in Cancer Therapy — 2015, Pharmacotherapy (PMID:26497482 DOI:10.1002/phar.1643)
5. Immune checkpoint inhibitors in advanced non–small cell lung cancer — 2018, Cancer (PMID:29211297 DOI:10.1002/cncr.31105)
6. From targeting the tumor to targeting the immune system: Transversal challenges in oncology with the inhibition of the PD-1/PD-L1 axis — 2017, World Journal of Clinical Oncology (PMID:28246584 DOI:10.5306/wjco.v8.i1.37)
7. How Checkpoint Inhibitors Are Changing the Treatment Paradigm in Solid Tumors: What Advanced Practitioners in Oncology Need to Know — 2016, Journal of the Advanced Practitioner in Oncology (PMID:29282426 DOI:10.6004/JADPRO.2016.7.5.3)
8. The Current Landscape of Immune Checkpoint Inhibition for Solid Malignancies. — 2019, Surgical Oncology Clinics of North America (PMID:31079794 DOI:10.1016/j.soc.2019.02.008)
9. Immunotherapy for Solid Tumors — 2023, Cancers (PMID:36980532 DOI:10.3390/cancers15061646)
10. Immune Checkpoint Inhibitors: Fundamental Mechanisms, Current Status and Future Directions — 2024, Immuno (DOI:10.3390/immuno4030013)

---

## Query: `onc-car-t-lbcl-pico` — "In patients with relapsed large B-cell lymphoma, does CAR-T therapy versus salvage chemotherapy improve event-free survival?"
Category: pico. Intent: P=relapsed/refractory LBCL, I=CD19 CAR-T, C=standard salvage+ASCT, O=EFS/OS (ZUMA-7/TRANSFORM).

### Engine A — top 10
1. Axicabtagene Ciloleucel as Second-Line Therapy for Large B-Cell Lymphoma. — 2021, New England Journal of Medicine (PMID:34891224 DOI:10.1056/NEJMoa2116133)
2. Axicabtagene Ciloleucel CAR T-Cell Therapy in Refractory Large B-Cell Lymphoma — 2017, New England Journal of Medicine (PMID:29226797 DOI:10.1056/NEJMoa1707447)
3. Comparison of 2-year outcomes with CAR T cells (ZUMA-1) vs salvage chemotherapy in refractory large B-cell lymphoma — 2021, Blood Advances (PMID:34478487 DOI:10.1182/bloodadvances.2020003848)
4. Chimeric antigen receptor T‐cell therapy is superior to standard of care as second‐line therapy for large B‐cell lymphoma: A systematic review and meta‐analysis — 2022, British Journal of Haematology (PMID:35765220 DOI:10.1111/bjh.18335)
5. CAR‐T cell therapy is superior to standard of care as second‐line therapy for large B‐cell lymphoma: A systematic review and meta‐analysis — 2022, British Journal of Haematology (PMID:36281746 DOI:10.1111/bjh.18506)
6. CAR T-Cell Therapy for Second-Line Therapy of Large B-Cell Lymphoma — 2022, Oncology Times (DOI:10.1097/01.cot.0000822040.19342.87)
7. Survival with Axicabtagene Ciloleucel in Large B-Cell Lymphoma. — 2023, New England Journal of Medicine (PMID:37272527 DOI:10.1056/NEJMoa2301665)
8. P1461: CAR-T VS. STANDARD OF CARE AS SECOND LINE TREATMENT FOR LARGE B CELL LYMPHOMA: A SYSTEMATIC REVIEW AND META-ANALYSIS — 2022, HemaSphere (DOI:10.1097/01.HS9.0000848700.33740.e2)
9. Evolving Role of CAR T Cell Therapy in First- and Second-Line Treatment of Large B Cell Lymphoma — 2023, Current Oncology Reports (PMID:37861914 DOI:10.1007/s11912-023-01466-6)
10. Axi-Cel CAR T-Cell Therapy for Large B-Cell Lymphoma — 2022, Oncology Times (DOI:10.1097/01.cot.0000822020.84303.c8)

### Engine B — top 10
1. Chimeric antigen receptor (CAR) T-cell therapy for people with relapsed or refractory diffuse large B-cell lymphoma. — 2021, Cochrane Database Syst Rev (PMID:34515338 DOI:10.1002/14651858.CD013365.pub2)
2. Efficacy of Salvage Treatments in Relapsed or Refractory Diffuse Large B-Cell Lymphoma Including Chimeric Antigen Receptor T-Cell Therapy: A Systematic Review and Meta-Analysis. — 2023, Cancer Res Treat (PMID:36915243 DOI:10.4143/crt.2022.1658)
3. The Role of Radiotherapy in Relapsed or Refractory Diffuse Large B-Cell Lymphoma Post-CAR-T Therapy: A Systematic Literature Review. — 2025, Technol Cancer Res Treat (PMID:40530487 DOI:10.1177/15330338251351065)
4. Long-term clinical outcomes of tisagenlecleucel in patients with relapsed or refractory aggressive B-cell lymphomas (JULIET): a multicentre, open-label, single-arm, phase 2 study. — 2021, Lancet Oncol (PMID:34516954 DOI:10.1016/S1470-2045(21)00375-2)
5. CD19 CAR T cells following autologous transplantation in poor-risk relapsed and refractory B-cell non-Hodgkin lymphoma. — 2019, Blood (PMID:31262783 DOI:10.1182/blood.2018883421)
6. Outcomes of subsequent antilymphoma therapies after second-line axicabtagene ciloleucel or standard of care in ZUMA-7. — 2024, Blood Adv (PMID:38315832 DOI:10.1182/bloodadvances.2023011532)
7. Long-term activity of tandem CD19/CD20 CAR therapy in refractory/relapsed B-cell lymphoma: a single-arm, phase 1-2 trial. — 2022, Leukemia (PMID:34272481 DOI:10.1038/s41375-021-01345-8)
8. CAR-T Cell Therapy Versus Salvage Chemotherapy in Relapsed/Refractory DLBCL: A Systematic Review and Meta-Analysis Integrating Radiologic, Laboratory, and Histopathologic Correlates. — 2026, Clin Ter (PMID:42340791 DOI:10.7417/CT.2026.2084)
9. Efficacy and safety of chimeric antigen receptor T cell therapy in relapsed/refractory diffuse large B-cell lymphoma with different HBV status: a retrospective study from a single center. — 2023, Front Immunol (PMID:37292195 DOI:10.3389/fimmu.2023.1200748)
10. Cost Effectiveness of Chimeric Antigen Receptor T-Cell Therapy in Multiply Relapsed or Refractory Adult Large B-Cell Lymphoma — 2019, Journal of Clinical Oncology (PMID:31157579 DOI:10.1200/jco.18.02079)

---

## Query: `onc-checkpoint-irae-safety` — "immune-related adverse events with checkpoint inhibitors incidence and management"
Category: safety_adverse_event. Intent: Frequency/spectrum of irAEs (colitis, pneumonitis, myocarditis, endocrinopathies); expect meta-analyses + cohorts.

### Engine A — top 10
1. Current Diagnosis and Management of Immune Related Adverse Events (irAEs) Induced by Immune Checkpoint Inhibitor Therapy — 2017, Frontiers in Pharmacology (PMID:28228726 DOI:10.3389/fphar.2017.00049)
2. Immune‐Related Adverse Events From Immune Checkpoint Inhibitors — 2016, Clinical pharmacology and therapy (PMID:27170616 DOI:10.1002/cpt.394)
3. Management of Immune-Related Adverse Events Affecting Outcome in Patients Treated With Checkpoint Inhibitors. — 2020, JAMA Oncology (PMID:32556062 DOI:10.1001/jamaoncol.2020.1932)
4. Optimal management of immune-related adverse events resulting from treatment with immune checkpoint inhibitors: a review and update — 2018, International Journal of Clinical Oncology (PMID:29516216 DOI:10.1007/s10147-018-1259-6)
5. Immune-Related Adverse Events Associated with Immune Checkpoint — 2018, ? (— no id —)
6. Holistic Approach to Immune Checkpoint Inhibitor-Related Adverse Events — 2022, Frontiers in Immunology (PMID:35432346 DOI:10.3389/fimmu.2022.804597)
7. Management of Immune-Related Adverse Events. — 2018, Annals of Oncology (PMID:32177404 DOI:10.1093/ANNONC/MDY368)
8. Immune-Related Adverse Events Associated with Immune Checkpoint Inhibitors — 2016, BioDrugs (PMID:27848165 DOI:10.1007/s40259-016-0204-3)
9. Pathogenesis, Clinical Manifestations and Management of Immune Checkpoint Inhibitors Toxicity — 2017, Tumori (PMID:28497847 DOI:10.5301/tj.5000625)
10. Incidence and Management of Immune-Related Adverse Events in Patients Undergoing Treatment with Immune Checkpoint Inhibitors — 2018, Current Oncology Reports (PMID:29511902 DOI:10.1007/s11912-018-0671-4)

### Engine B — top 10
1. Management of Immune-Related Adverse Events in Patients Treated With Immune Checkpoint Inhibitor Therapy: ASCO Guideline Update — 2021, Journal of Clinical Oncology (PMID:34724392 DOI:10.1200/jco.21.01440)
2. Safety and Efficacy of the Rechallenge of Immune Checkpoint Inhibitors After Immune-Related Adverse Events in Patients With Cancer: A Systemic Review and Meta-Analysis. — 2021, Front Immunol (PMID:34646270 DOI:10.3389/fimmu.2021.730320)
3. Cancer and treatment specific incidence rates of immune-related adverse events induced by immune checkpoint inhibitors: a systematic review. — 2025, Br J Cancer (PMID:39489880 DOI:10.1038/s41416-024-02887-1)
4. Association Between Sex and Immune-Related Adverse Events During Immune Checkpoint Inhibitor Therapy. — 2021, J Natl Cancer Inst (PMID:33705549 DOI:10.1093/jnci/djab035)
5. Systematic review of immune checkpoint inhibitor-related gastrointestinal, hepatobiliary, and pancreatic adverse events. — 2024, J Immunother Cancer (PMID:39542654 DOI:10.1136/jitc-2024-009742)
6. The Pattern of Time to Onset and Resolution of Immune-Related Adverse Events Caused by Immune Checkpoint Inhibitors in Cancer: A Pooled Analysis of 23 Clinical Trials and 8,436 Patients. — 2021, Cancer Res Treat (PMID:33171025 DOI:10.4143/crt.2020.790)
7. Endocrine Toxicity of Cancer Immunotherapy Targeting Immune Checkpoints. — 2019, Endocr Rev (PMID:30184160 DOI:10.1210/er.2018-00006)
8. Identification of Immune Checkpoint Inhibitor-Induced Diabetes. — 2024, JAMA Oncol (PMID:39207773 DOI:10.1001/jamaoncol.2024.3104)
9. Cardiovascular toxicities associated with immune checkpoint inhibitors: an observational, retrospective, pharmacovigilance study. — 2018, Lancet Oncol (PMID:30442497 DOI:10.1016/S1470-2045(18)30608-9)
10. Immune-related adverse events with PD-1 versus PD-L1 inhibitors: a meta-analysis of 8730 patients from clinical trials. — 2021, Future Oncol (PMID:33783228 DOI:10.2217/fon-2020-1222)

---

## Query: `exact-dawn-thrombectomy` — "Thrombectomy 6 to 24 Hours after Stroke with a Mismatch between Deficit and Infarct"
Category: exact_paper. Intent: Retrieve the DAWN late-window thrombectomy primary paper by its exact title.

**Must-have landmark papers (ground truth):**
- DAWN (Nogueira, NEJM 2018)

### Engine A — top 10
1. Thrombectomy 6 to 24 Hours after Stroke with a Mismatch between Deficit and Infarct — 2018, New England Journal of Medicine (PMID:29129157 DOI:10.1056/NEJMoa1706442)
2. Thrombectomy for Stroke at 6 to 16 Hours with Selection by Perfusion Imaging — 2018, New England Journal of Medicine (PMID:29364767 DOI:10.1056/NEJMoa1713973)
3. Late thrombectomy reduced disability in acute stroke with mismatched clinical deficit and infarction volume — 2018, Annals of Internal Medicine (PMID:29459954 DOI:10.7326/ACPJC-2018-168-4-017)
4. Clinical diffusion mismatch to select pediatric patients for embolectomy 6 to 24 hours after stroke: An analysis of the Save ChildS Study. — 2020, Neurology (PMID:33144517 DOI:10.1212/wnl.0000000000011107)
5. Eligibility for Endovascular Trial Enrollment in the 6- to 24-Hour Time Window — 2018, Stroke (— no id —)
6. Endovascular Treatment of Acute Ischemic Stroke. — 2020, Continuum (PMID:32224754 DOI:10.1212/CON.0000000000000852)
7. Thrombectomy 6 to 24 Hours after Stroke. — 2018, New England Journal of Medicine (PMID:29565516 DOI:10.1056/NEJMc1801530)
8. Persistent Target Mismatch Profile >24-hours after Stroke Onset in DEFUSE 3 — 2019, Stroke (PMID:30735466 DOI:10.1161/STROKEAHA.118.023392)
9. Faculty Opinions recommendation of Thrombectomy for Stroke at 6 to 16 Hours with Selection by Perfusion Imaging. — 2020, ? (DOI:10.3410/f.732563529.793574848)
10. Assessment of Optimal Patient Selection for Endovascular Thrombectomy Beyond 6 Hours After Symptom Onset: A Pooled Analysis of the AURORA Database. — 2021, JAMA Neurology (PMID:34309619 DOI:10.1001/jamaneurol.2021.2319)

### Engine B — top 10
1. Thrombectomy 6 to 24 Hours after Stroke with a Mismatch between Deficit and Infarct. — 2018, N Engl J Med (PMID:29129157 DOI:10.1056/NEJMoa1706442)
2. Impact of Periprocedural and Technical Factors and Patient Characteristics on Revascularization and Outcome in the DAWN Trial. — 2020, Stroke (PMID:31744425 DOI:10.1161/STROKEAHA.119.026437)
3. Mechanical Thrombectomy Versus Best Medical Treatment in the Late Time Window in Non-DEFUSE-Non-DAWN Patients: A Multicenter Cohort Study. — 2023, Stroke (PMID:36718751 DOI:10.1161/STROKEAHA.122.039793)
4. Clinical Diffusion Mismatch to Select Pediatric Patients for Embolectomy 6 to 24 Hours After Stroke: An Analysis of the Save ChildS Study. — 2021, Neurology (PMID:33144517 DOI:10.1212/WNL.0000000000011107)
5. Using Epidemiological Data to Inform Clinical Trial Feasibility Assessments: A Case Study. — 2023, Stroke (PMID:36852687 DOI:10.1161/STROKEAHA.122.041650)
6. Application of non-contrasted computed tomography and diffusion-weighted imaging protocols for endovascular treatment selection in patients with late-presenting or wake-up strokes. — 2021, Arq Neuropsiquiatr (PMID:34816985 DOI:10.1590/0004-282X-ANP-2020-0317)

---

## Query: `neuro-thrombectomy-broad` — "endovascular thrombectomy for acute ischemic stroke large vessel occlusion"
Category: broad_clinical. Intent: Overview of mechanical thrombectomy for LVO stroke; expect landmark RCTs (MR CLEAN/DAWN/DEFUSE-3) + guidelines.

### Engine A — top 10
1. Effect of Intravenous Tirofiban vs Placebo Before Endovascular Thrombectomy on Functional Outcomes in Large Vessel Occlusion Stroke: The RESCUE BT Randomized Clinical Trial. — 2022, JAMA (PMID:35943471 DOI:10.1001/jama.2022.12584)
2. Endovascular thrombectomy with or without intravenous alteplase for acute ischemic stroke due to large vessel occlusion: a systematic review and meta-analysis of randomized trials. — 2022, Stroke Vasc Neurol (PMID:35725244 DOI:10.1136/svn-2022-001547)
3. Intra-Arterial Thrombolysis Following Endovascular Recanalization for Large Vessel Occlusion Stroke: A Systematic Review and Meta-Analysis. — 2025, Neurology (PMID:40577652 DOI:10.1212/WNL.0000000000213842)
4. Effect of Thrombectomy With Combined Contact Aspiration and Stent Retriever vs Stent Retriever Alone on Revascularization in Patients With Acute Ischemic Stroke and Large Vessel Occlusion: The ASTER2 Randomized Clinical Trial. — 2021, JAMA (PMID:34581737 DOI:10.1001/jama.2021.13827)
5. Intra-Arterial Urokinase After Endovascular Reperfusion for Acute Ischemic Stroke: The POST-UK Randomized Clinical Trial. — 2025, JAMA (PMID:39804674 DOI:10.1001/jama.2024.23480)
6. How do children fare compared with adults? Comparing relative outcomes after thrombectomy for acute ischemic stroke due to large-vessel occlusion. — 2023, J Stroke Cerebrovasc Dis (PMID:37717373 DOI:10.1016/j.jstrokecerebrovasdis.2023.107350)
7. Intensive blood pressure control after endovascular thrombectomy for acute ischaemic stroke (ENCHANTED2/MT): a multicentre, open-label, blinded-endpoint, randomised controlled trial. — 2022, Lancet (PMID:36341753 DOI:10.1016/S0140-6736(22)01882-7)
8. Endovascular Thrombectomy for Low ASPECTS Large Vessel Occlusion Ischemic Stroke: A Systematic Review and Meta-Analysis. — 2020, Can J Neurol Sci (PMID:32299532 DOI:10.1017/cjn.2020.71)
9. Endovascular thrombectomy for acute ischemic stroke due to medium or distal vessel occlusion: A systematic review and meta-analysis. — 2025, Clin Neurol Neurosurg (PMID:40816111 DOI:10.1016/j.clineuro.2025.109101)
10. Endovascular thrombectomy for large vessel occlusion in acute ischemic stroke patients with concomitant intracranial hemorrhage. — 2025, J Clin Neurosci (PMID:39893927 DOI:10.1016/j.jocn.2025.111093)

### Engine B — top 10
1. Endovascular thrombectomy in acute ischemic stroke — 2016, Canadian Medical Association Journal (PMID:26668196 DOI:10.1503/cmaj.150875)
2. Endovascular Thrombectomy for the Treatment of Large Ischemic Stroke: A Systematic Review and Meta-Analysis of Randomized Control Trials — 2023, Neurosurgery (PMID:37493372 DOI:10.1227/neu.0000000000002610)
3. Endovascular stent thrombectomy: the new standard of care for large vessel ischaemic stroke. — 2015, Lancet Neurology (PMID:26119323 DOI:10.1016/S1474-4422(15)00140-4)
4. Trial of Endovascular Thrombectomy for Large Ischemic Strokes. — 2023, New England Journal of Medicine (PMID:36762865 DOI:10.1056/NEJMoa2214403)
5. Outcomes of endovascular thrombectomy with and without bridging thrombolysis for acute large vessel occlusion ischaemic stroke — 2019, Internal medicine journal (Print) (PMID:30091271 DOI:10.1111/imj.14069)
6. Endovascular thrombectomy for the treatment of large ischemic stroke: a systematic review and meta-analysis of randomized control trials — 2023, medRxiv (PMID:36909468 DOI:10.1101/2023.02.27.23286534)
7. Endovascular thrombectomy and intra-arterial interventions for acute ischaemic stroke. — 2021, Cochrane Database of Systematic Reviews (PMID:34125952 DOI:10.1002/14651858.CD007574.pub3)
8. Endovascular Therapy for Acute Ischemic Stroke: Dawn of a New Era. — 2015, JAMA Neurology (PMID:26237199 DOI:10.1001/jamaneurol.2015.1743)
9. Indications for Mechanical Thrombectomy for Acute Ischemic Stroke — 2021, Neurology (PMID:34785611 DOI:10.1212/WNL.0000000000012801)
10. Early Endovascular Thrombectomy for Large-vessel Ischemic Stroke Reduces Disability at 90 Days. — 2019, Academic Emergency Medicine (PMID:30537219 DOI:10.1111/acem.13671)

---

## Query: `neuro-tenecteplase-vs-alteplase` — "tenecteplase versus alteplase for thrombolysis in acute ischemic stroke"
Category: therapy_comparison. Intent: Head-to-head thrombolytic comparison in acute stroke (EXTEND-IA TNK, AcT, NOR-TEST).

**Must-have landmark papers (ground truth):**
- EXTEND-IA TNK family

### Engine A — top 10
1. Tenecteplase vs Alteplase for Patients With Acute Ischemic Stroke: The ORIGINAL Randomized Clinical Trial. — 2024, JAMA (PMID:39264623 DOI:10.1001/jama.2024.14721)
2. Thrombolysis for Ischemic Stroke Beyond the 4.5-Hour Window: A Meta-Analysis of Randomized Clinical Trials. — 2025, Stroke (PMID:39882605 DOI:10.1161/STROKEAHA.124.048536)
3. Intravenous tenecteplase compared with alteplase for acute ischaemic stroke in Canada (AcT): a pragmatic, multicentre, open-label, registry-linked, randomised, controlled, non-inferiority trial. — 2022, Lancet (PMID:35779553 DOI:10.1016/S0140-6736(22)01054-6)
4. Tenecteplase versus Alteplase before Thrombectomy for Ischemic Stroke. — 2018, N Engl J Med (PMID:29694815 DOI:10.1056/NEJMoa1716405)
5. Early Tirofiban Infusion after Intravenous Thrombolysis for Stroke. — 2025, N Engl J Med (PMID:40616232 DOI:10.1056/NEJMoa2503678)
6. Tenecteplase versus alteplase in acute ischaemic cerebrovascular events (TRACE-2): a phase 3, multicentre, open-label, randomised controlled, non-inferiority trial. — 2023, Lancet (PMID:36774935 DOI:10.1016/S0140-6736(22)02600-9)
7. Tenecteplase versus alteplase for acute stroke within 4&#xb7;5 h of onset (ATTEST-2): a randomised, parallel group, open-label trial. — 2024, Lancet Neurol (PMID:39424558 DOI:10.1016/S1474-4422(24)00377-6)
8. Tenecteplase versus alteplase for the management of acute ischaemic stroke in Norway (NOR-TEST 2, part A): a phase 3, randomised, open-label, blinded endpoint, non-inferiority trial. — 2022, Lancet Neurol (PMID:35525250 DOI:10.1016/S1474-4422(22)00124-7)
9. Intravenous Tenecteplase before Thrombectomy in Stroke. — 2025, N Engl J Med (PMID:40396577 DOI:10.1056/NEJMoa2503867)
10. Intra-Arterial Tenecteplase Following Endovascular Reperfusion for Large Vessel Occlusion Acute Ischemic Stroke: The POST-TNK Randomized Clinical Trial. — 2025, JAMA (PMID:39804681 DOI:10.1001/jama.2024.23466)

### Engine B — top 10
1. Tenecteplase vs. alteplase for acute ischemic stroke: a systematic review — 2022, International Journal of Emergency Medicine (PMID:34983359 DOI:10.1186/s12245-021-00399-w)
2. Tenecteplase versus alteplase for acute ischemic stroke: a systematic review and meta-analysis of randomized and non-randomized studies — 2024, Journal of Neurology (PMID:38436679 DOI:10.1007/s00415-024-12243-1)
3. Tenecteplase for thrombolysis in stroke patients: Systematic review with meta-analysis. — 2020, American Journal of Emergency Medicine (PMID:33440328 DOI:10.1016/j.ajem.2020.12.026)
4. Tenecteplase versus alteplase in acute ischemic stroke: systematic review and meta-analysis — 2018, Acta Neurologica Belgica (PMID:29728903 DOI:10.1007/s13760-018-0933-9)
5. Tenecteplase vs. alteplase for the treatment of patients with acute ischemic stroke: a systematic review and meta-analysis — 2022, Journal of Neurology (PMID:35776193 DOI:10.1007/s00415-022-11242-4)
6. Short-Term Safety and Effectiveness for Tenecteplase and Alteplase in Acute Ischemic Stroke — 2025, JAMA Network Open (PMID:40072434 DOI:10.1001/jamanetworkopen.2025.0548)
7. Tenecteplase Versus Alteplase in Patients with Acute Ischemic Stroke: A Systematic Review and Meta-analysis of Randomized Controlled Trials (P7-13.009) — 2025, Neurology (DOI:10.1212/wnl.0000000000211797)
8. Efficacy and safety of tenecteplase in comparison to alteplase in acute ischemic stroke: A systematic review and meta-analysis of randomized controlled trials. — 2023, Clinical neurology and neurosurgery (Dutch-Flemish ed. Print) (PMID:37713743 DOI:10.1016/j.clineuro.2023.107961)
9. Major Bleeding Postadministration of Tenecteplase Versus Alteplase in Acute Ischemic Stroke — 2022, The Annals of Pharmacotherapy (PMID:36004394 DOI:10.1177/10600280221120211)
10. Tenecteplase or Alteplase: What Is the Thrombolytic Agent of the Future? — 2022, Current Treatment Options in Neurology (PMID:35965955 DOI:10.1007/s11940-022-00733-4)

---

## Query: `neuro-lecanemab-pico` — "In patients with early Alzheimer disease, do anti-amyloid antibodies versus placebo slow cognitive decline?"
Category: pico. Intent: P=early AD, I=anti-amyloid mAb (lecanemab/donanemab), C=placebo, O=CDR-SB/cognitive decline + ARIA safety.

### Engine A — top 10
1. Lecanemab: A Second in Class Therapy for the Management of Early Alzheimer's Disease. — 2024, Innov Pharm (PMID:38779110 DOI:10.24926/iip.v15i1.5787)
2. Safety, Tolerability, and Pharmacokinetics of Single Doses of ABBV-916, an Anti-Amyloid Antibody, in Healthy Participants. — 2026, Clin Transl Sci (PMID:41517979 DOI:10.1111/cts.70419)
3. Low Sensitivity of Neuropsychological Scales Hinder Detection of Potential Benefit of Treatments in Alzheimer's Disease: A Position Paper. — 2026, Eur J Neurol (PMID:41923420 DOI:10.1111/ene.70590)

### Engine B — top 10
1. Donanemab in Early Alzheimer's Disease. — 2021, New England Journal of Medicine (PMID:33720637 DOI:10.1056/NEJMoa2100708)
2. Antibodies against beta-amyloid slow cognitive decline in Alzheimer's disease. — 2003, Neuron (PMID:12765607)
3. Two Randomized Phase 3 Studies of Aducanumab in Early Alzheimer’s Disease — 2022, The journal of prevention of Alzheimer's disease (PMID:35542991 DOI:10.14283/jpad.2022.30)
4. Does Solanezumab Slow Cognitive Decline in Alzheimer Disease — 2018, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA45907)
5. Efficacy of anti-amyloid-ß monoclonal antibody therapy in early Alzheimer’s disease: a systematic review and meta-analysis — 2023, Neurological Sciences (PMID:37978096 DOI:10.1007/s10072-023-07194-w)
6. Trial of Solanezumab in Preclinical Alzheimer’s Disease — 2023, New England Journal of Medicine (PMID:37458272 DOI:10.1056/NEJMoa2305032)
7. A trial of gantenerumab or solanezumab in dominantly inherited Alzheimer’s disease — 2021, Nature Medicine (PMID:34155411 DOI:10.1038/s41591-021-01369-8)
8. Immunotherapies for Alzheimer’s disease — 2023, Science (PMID:38096276 DOI:10.1126/science.adj9255)
9. Promising Results in 18-Month Analysis of Alzheimer Drug Candidate. — 2018, Journal of the American Medical Association (JAMA) (PMID:30208438 DOI:10.1001/jama.2018.13027)
10. Effect of reduction in brain amyloid levels on change in cognitive and functional decline in randomized clinical trials: An instrumental variable meta‐analysis — 2022, Alzheimer's & Dementia (PMID:36043526 DOI:10.1002/alz.12768)

---

## Query: `neuro-ms-dmt-comparison` — "high-efficacy versus moderate-efficacy disease-modifying therapy for relapsing multiple sclerosis"
Category: therapy_comparison. Intent: Treatment strategy comparison in RRMS (early high-efficacy vs escalation); expect RCTs + cohorts.

### Engine A — top 10
1. Clinical Outcomes of Escalation vs Early Intensive Disease-Modifying Therapy in Patients With Multiple Sclerosis. — 2019, JAMA Neurol (PMID:30776055 DOI:10.1001/jamaneurol.2018.4905)
2. Patterns and predictors of multiple sclerosis phenotype transition. — 2024, Brain Commun (PMID:39713244 DOI:10.1093/braincomms/fcae422)
3. Cost, efficacy, and safety comparison between early intensive and escalating strategies for multiple sclerosis: A systematic review and meta-analysis. — 2023, Mult Scler Relat Disord (PMID:36848839 DOI:10.1016/j.msard.2023.104581)
4. Patient profiling in relapsing multiple sclerosis: insights from a real-world observational study into the unmet medical needs of patients on disease-modifying therapy. — 2026, J Neurol (PMID:42045422 DOI:10.1007/s00415-026-13806-0)
5. Breaking the assumption: Disease-modifying therapy efficacy and relapse severity in relapsing-remitting multiple sclerosis. — 2025, Mult Scler Relat Disord (PMID:41038139 DOI:10.1016/j.msard.2025.106723)
6. Socioeconomic impact of initial high vs. moderate efficacy disease-modifying therapy in multiple sclerosis: Effects on labor market affiliation. — 2025, Mult Scler Relat Disord (PMID:40339266 DOI:10.1016/j.msard.2025.106466)
7. De-Escalation of Disease-Modifying Therapy in Multiple Sclerosis-A Danish Nationwide Cohort Study. — 2025, Eur J Neurol (PMID:39895213 DOI:10.1111/ene.70042)
8. "No association between disease modifying treatment and fatigue in multiple sclerosis". — 2023, Mult Scler Relat Disord (PMID:37708819 DOI:10.1016/j.msard.2023.104993)
9. Early Intensive Versus Escalation Approach: Ten-Year Impact on Disability in Relapsing Multiple Sclerosis. — 2025, Ann Clin Transl Neurol (PMID:40619726 DOI:10.1002/acn3.70131)
10. Early use of high-efficacy disease-modifying therapies reduces the risk of progression independent of relapse and MRI activity in patients with relapsing-remitting multiple sclerosis. — 2026, Mult Scler (PMID:42057337 DOI:10.1177/13524585261442036)

### Engine B — top 10
1. Initial high-efficacy disease-modifying therapy in multiple sclerosis — 2020, Neurology (PMID:32636328 DOI:10.1212/WNL.0000000000010135)
2. Timing of high-efficacy therapy for multiple sclerosis: a retrospective observational cohort study. — 2020, Lancet Neurology (PMID:32199096 DOI:10.1016/S1474-4422(20)30067-3)
3. Early High Efficacy Treatment in Multiple Sclerosis Is the Best Predictor of Future Disease Activity Over 1 and 2 Years in a Norwegian Population-Based Registry — 2021, Frontiers in Neurology (PMID:34220694 DOI:10.3389/fneur.2021.693017)
4. Effects of High- and Low-Efficacy Therapy in Secondary Progressive Multiple Sclerosis — 2021, Neurology (PMID:34193589 DOI:10.1212/WNL.0000000000012354)
5. Early highly effective versus escalation treatment approaches in relapsing multiple sclerosis. — 2019, Lancet Neurology (PMID:31375366 DOI:10.1016/S1474-4422(19)30151-6)
6. Escalating to medium‐ versus high‐efficacy disease modifying therapy after low‐efficacy treatment in relapsing remitting multiple sclerosis — 2024, Brain and Behavior (PMID:38688877 DOI:10.1002/brb3.3498)
7. Early vs. Late High-Efficacy Therapy in Multiple Sclerosis — 2020, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA51170)
8. Does initial high efficacy therapy in multiple sclerosis surpass escalation treatment strategy? A comparison of patients with relapsing-remitting multiple sclerosis in the Czech and Swedish national multiple sclerosis registries. — 2023, Multiple Sclerosis and Related Disorders (PMID:37329786 DOI:10.1016/j.msard.2023.104803)
9. Escalation or high-efficacy disease-modifying therapies in multiple sclerosis — 2023, Neurology Letters (DOI:10.61186/nl.2.2.106)
10. Initial highly effective therapy for MS — 2020, Neurology (PMID:32839302 DOI:10.1212/WNL.0000000000010302)

---

## Query: `neuro-epilepsy-guideline` — "guideline for management of status epilepticus in adults"
Category: guideline. Intent: Authoritative status epilepticus treatment guideline (e.g. AES/NCS) should rank top.

### Engine A — top 10
1. Clinical practice guidelines on the management of status epilepticus in adults: A systematic review. — 2024, Epilepsia (PMID:38606469 DOI:10.1111/epi.17982)
2. Evidence-based guideline on management of status epilepticus in adult intensive care unit in resource-limited settings: a review article. — 2023, Ann Med Surg (Lond) (PMID:37363462 DOI:10.1097/MS9.0000000000000625)
3. Optimizing pediatric status epilepticus management: The role of early midazolam infusion and adherence to clinical practice guidelines. — 2025, Epilepsia (PMID:40377450 DOI:10.1111/epi.18455)
4. Evaluation and systematic review of guidance documents for status epilepticus. — 2024, Epilepsy Behav (PMID:38128315 DOI:10.1016/j.yebeh.2023.109555)
5. Management protocols for status epilepticus in the pediatric emergency room: systematic review article. — 2017, J Pediatr (Rio J) (PMID:28941387 DOI:10.1016/j.jped.2017.08.004)
6. EFNS guideline on the management of status epilepticus in adults. — 2010, Eur J Neurol (PMID:20050893 DOI:10.1111/j.1468-1331.2009.02917.x)
7. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults: Report of the Guideline Committee of the American Epilepsy Society. — 2016, Epilepsy Curr (PMID:26900382 DOI:10.5698/1535-7597-16.1.48)
8. Japanese guidelines for treatment of pediatric status epilepticus - 2023. — 2025, Brain Dev (PMID:39626562 DOI:10.1016/j.braindev.2024.104306)
9. Treatment of Super-Refractory Status Epilepticus: A Review. — 2021, Epilepsy Curr (PMID:33719651 DOI:10.1177/1535759721999670)
10. Status Epilepticus Protocol Variation Across Accredited National Association of Epilepsy Centers Members. — 2025, Neurology (PMID:40378375 DOI:10.1212/WNL.0000000000213689)

### Engine B — top 10
1. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults: Report of the Guideline Committee of the American Epilepsy Society — 2016, Epilepsy Currents (PMID:26900382 DOI:10.5698/1535-7597-16.1.48)
2. Guidelines for the management of status epilepticus. — 2021, European journal of emergency medicine (PMID:34334768 DOI:10.1097/MEJ.0000000000000857)
3. Guidelines for the Evaluation and Management of Status Epilepticus — 2012, Neurocritical Care (PMID:22528274 DOI:10.1007/s12028-012-9695-z)
4. EFNS guideline on the management of status epilepticus in adults — 2010, European Journal of Neurology (PMID:20050893 DOI:10.1111/j.1468-1331.2009.02917.x)
5. Treatment of Convulsive Status Epilepticus: Evidence-Based Guidelines — 2016, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA40616)
6. EFNS guideline on the management of status epilepticus — 2006, European Journal of Neurology (PMID:16722966 DOI:10.1111/j.1468-1331.2006.01397.x)
7. Clinical practice guidelines on the management of status epilepticus in adults: A systematic review — 2024, Epilepsia (PMID:38606469 DOI:10.1111/epi.17982)
8. Current and emerging pharmacological treatment for status epilepticus in adults — 2022, Pharmacy &amp; Pharmacology International Journal (DOI:10.15406/ppij.2022.10.00357)
9. Commentary on SE Guidelines — 2016, Epilepsy Currents (PMID:26900383 DOI:10.5698/1535-7597-16.1.62)
10. Management of status epilepticus in adults. Position paper of the Italian League against Epilepsy. — 2019, Epilepsy & Behavior (PMID:31766004 DOI:10.1016/j.yebeh.2019.106675)

---

## Query: `exact-recovery-tocilizumab` — "Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): a randomised controlled platform trial"
Category: exact_paper. Intent: Retrieve the RECOVERY tocilizumab primary results paper by its exact title.

**Must-have landmark papers (ground truth):**
- RECOVERY tocilizumab (Lancet 2021)

### Engine A — top 10
1. Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial. — 2021, Lancet (PMID:33933206 DOI:10.1016/S0140-6736(21)00676-0)
2. Immunomodulatory therapy in children with paediatric inflammatory multisystem syndrome temporally associated with SARS-CoV-2 (PIMS-TS, MIS-C; RECOVERY): a randomised, controlled, open-label, platform trial. — 2024, Lancet Child Adolesc Health (PMID:38272046 DOI:10.1016/S2352-4642(23)00316-4)
3. Baricitinib in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial and updated meta-analysis. — 2022, Lancet (PMID:35908569 DOI:10.1016/S0140-6736(22)01109-6)

### Engine B — top 10
1. Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial — 2021, The Lancet (PMID:33933206 DOI:10.1016/S0140-6736(21)00676-0)
2. Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): preliminary results of a randomised, controlled, open-label, platform trial — 2021, medRxiv (DOI:10.1101/2021.02.11.21249258)
3. Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial — 2025, ? (DOI:10.55277/researchhub.zylsnrrv.1)
4. Efficacy of Tocilizumab in Patients Hospitalized with Covid-19 — 2020, New England Journal of Medicine (PMID:33085857 DOI:10.1056/NEJMoa2028836)
5. a of Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial . — 2021, ? (— no id —)
6. Effect of Tocilizumab vs Standard Care on Clinical Worsening in Patients Hospitalized With COVID-19 Pneumonia: A Randomized Clinical Trial. — 2020, JAMA Internal Medicine (PMID:33080005 DOI:10.1001/jamainternmed.2020.6615)
7. Tocilizumab in patients with severe COVID-19: a retrospective cohort study — 2020, The Lancet Rheumatology (PMID:32835257 DOI:10.1016/S2665-9913(20)30173-9)
8. Tocilizumab plus standard care versus standard care in patients in India with moderate to severe COVID-19-associated cytokine release syndrome (COVINTOC): an open-label, multicentre, randomised, controlled, phase 3 trial — 2021, The Lancet Respiratory Medicine (PMID:33676589 DOI:10.1016/S2213-2600(21)00081-3)
9. Tocilizumab in Hospitalized Patients With COVID-19 Pneumonia — 2020, medRxiv (DOI:10.1101/2020.08.27.20183442)
10. Efficacy and safety of tocilizumab versus standard care/placebo in patients with COVID‐19; a systematic review and meta‐analysis of randomized clinical trials — 2021, British Journal of Clinical Pharmacology (PMID:34713921 DOI:10.1111/bcp.15124)

---

## Query: `id-hiv-prep-pico` — "In adults at risk of HIV, does long-acting injectable cabotegravir versus daily oral PrEP reduce HIV acquisition?"
Category: pico. Intent: P=HIV-negative at risk, I=LA cabotegravir, C=oral TDF/FTC, O=incident HIV (HPTN 083/084).

### Engine A — top 10
1. Indirect Treatment Comparison of the Efficacy of Long-Acting Injectable Cabotegravir Compared With Lenacapavir for HIV Pre-exposure Prophylaxis. — 2026, Adv Ther (PMID:42171901 DOI:10.1007/s12325-026-03591-7)
2. Systematic review of the values and preferences regarding the use of injectable pre-exposure prophylaxis to prevent HIV acquisition. — 2023, J Int AIDS Soc (PMID:37439057 DOI:10.1002/jia2.26107)
3. Advancing youth HIV prevention and care in Uganda: stakeholder-informed innovations through implementation science, protocol for a randomized controlled trial. — 2026, BMC Health Serv Res (PMID:41639731 DOI:10.1186/s12913-026-14069-1)
4. Implementing oral (event-driven and daily) and long-acting pre-exposure prophylaxis in mobile men in sub-Saharan Africa: a phase 3b, open-label, hybrid type 2 implementation and effectiveness trial (MOBILE MEN). — 2025, Trials (PMID:41214706 DOI:10.1186/s13063-025-09138-5)
5. Estimation of Prevention-Effective CAB-LA Concentrations Among Men Who Have Sex With Men (MSM) and Transgender Women (TGW) in HPTN 083. — 2026, J Infect Dis (PMID:41206027 DOI:10.1093/infdis/jiaf561)
6. Cabotegravir Extended-Release Injectable Suspension: A Review in HIV-1 Pre-Exposure Prophylaxis. — 2022, Drugs (PMID:36255686 DOI:10.1007/s40265-022-01791-3)
7. Achieving the state of Georgia 25% HIV incidence reduction target among men who have sex with men in Atlanta through expanded use of multimodal pre-exposure prophylaxis: A mathematical model. — 2025, PLoS One (PMID:39787101 DOI:10.1371/journal.pone.0312369)
8. Exploring pre-exposure prophylaxis (PrEP) modality preferences among black cisgender women attending family planning clinics in Chicago via a cross-sectional mixed-methods study. — 2025, BMJ Public Health (PMID:40017987 DOI:10.1136/bmjph-2023-000809)
9. Willingness and preferences for long-acting injectable PrEP among US men who have sex with men: a discrete choice experiment. — 2024, BMJ Open (PMID:38653510 DOI:10.1136/bmjopen-2023-083837)
10. Long-Acting Cabotegravir for HIV/AIDS Prophylaxis. — 2021, Biochemistry (PMID:34029457 DOI:10.1021/acs.biochem.1c00157)

### Engine B — top 10
1. Cabotegravir for HIV Prevention in Cisgender Men and Transgender Women — 2021, New England Journal of Medicine (PMID:34379922 DOI:10.1056/NEJMoa2101016)
2. Safety and efficacy of long-acting injectable cabotegravir as preexposure prophylaxis to prevent HIV acquisition — 2023, AIDS (London) (PMID:36723489 DOI:10.1097/QAD.0000000000003494)
3. Efficacy and safety of long‐acting cabotegravir versus oral tenofovir disoproxil fumarate‐emtricitabine as HIV pre‐exposure prophylaxis: A systematic review and meta‐analysis — 2023, Reviews in Medical Virology (PMID:37198721 DOI:10.1002/rmv.2460)
4. Cabotegravir: A Novel Drug For Prophylaxis Of HIV/AIDS As Pre-Exposure Prophylaxis (PREP) — 2024, African Journal of Biomedical Research (DOI:10.53555/ajbr.v27i4s.3105)
5. Cabotegravir for the prevention of HIV-1 in women: results from HPTN 084, a phase 3, randomised clinical trial — 2022, The Lancet (PMID:35378077 DOI:10.1016/S0140-6736(22)00538-4)
6. Cabotegravir long-acting for HIV-1 prevention — 2015, Current Opinion in HIV and AIDS (PMID:26049951 DOI:10.1097/COH.0000000000000161)
7. Is injectable PrEP superior to oral therapy for HIV protection? — 2023, Journal of Family Practice (PMID:37549401 DOI:10.12788/jfp.0630)
8. A new paradigm for antiretroviral delivery: long-acting cabotegravir and rilpivirine for the treatment and prevention of HIV — 2021, Current Opinion in HIV and AIDS (PMID:34871188 DOI:10.1097/COH.0000000000000708)
9. Cabotegravir: The First Long-Acting Injectable for HIV Preexposure Prophylaxis — 2022, The Annals of Pharmacotherapy (PMID:35778802 DOI:10.1177/10600280221102532)
10. Dynamic choice HIV prevention with cabotegravir long-acting injectable in rural Uganda and Kenya: a randomised trial extension — 2024, The Lancet HIV (PMID:39395424 DOI:10.1016/S2352-3018(24)00235-2)

---

## Query: `id-sepsis-broad` — "early management of sepsis and septic shock in adults"
Category: broad_clinical. Intent: Overview of sepsis bundle/resuscitation; expect Surviving Sepsis guidelines + landmark RCTs.

### Engine A — top 10
1. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. — 2021, Critical Care Medicine (PMID:34605781 DOI:10.1097/CCM.0000000000005337)
2. [Management of severe sepsis/septic shock] — 2016, La Revue du praticien (PMID:30512795)
3. Evaluation and management of suspected sepsis and septic shock in adults — 2018, ? (— no id —)
4. management of septic shock — 2006, Journal of the Faculty of Medicine Baghdad (DOI:10.32007/jfacmedbagdad.4741585)
5. Sepsis and septic shock: current approaches to management — 2019, Internal medicine journal (Print) (PMID:30754087 DOI:10.1111/imj.14199)
6. Current recommendations for diagnosis and management of sepsis and septic shock — 2013, JAAPA : official journal of the American Academy of Physician Assistants (PMID:24201922 DOI:10.1097/01.JAA.0000435007.55340.07)
7. Early recognition and management of sepsis in adults: the first six hours. — 2013, American Family Physician (PMID:23939605)
8. Early management of adult sepsis and septic shock: Korean clinical practice guidelines — 2024, Acute and Critical Care (PMID:39622601 DOI:10.4266/acc.2024.00920)
9. Sepsis and Septic Shock: An Update — 2019, International journal of collaborative research on internal medicine and public health (— no id —)
10. Update in the Management of Sepsis and Septic Shock — 2014, Trauma and Critical Care Medicine (— no id —)

### Engine B — top 10
1. Surviving Sepsis Campaign guidelines for management of severe sepsis and septic shock. — 2004, Crit Care Med (PMID:15090974 DOI:10.1097/01.ccm.0000117317.18092.e4)
2. Early goal-directed therapy in the treatment of severe sepsis and septic shock. — 2001, N Engl J Med (PMID:11794169 DOI:10.1056/NEJMoa010307)
3. A randomized trial of protocol-based care for early septic shock. — 2014, N Engl J Med (PMID:24635773 DOI:10.1056/NEJMoa1401602)
4. Goal-directed resuscitation for patients with early septic shock. — 2014, N Engl J Med (PMID:25272316 DOI:10.1056/NEJMoa1404380)
5. Time-to-antibiotics and clinical outcomes in patients with sepsis and septic shock: a prospective nationwide multicenter cohort study. — 2022, Crit Care (PMID:35027073 DOI:10.1186/s13054-021-03883-0)
6. Top 10 Pearls for the Recognition, Evaluation, and Management of Maternal Sepsis. — 2021, Obstet Gynecol (PMID:34237760 DOI:10.1097/AOG.0000000000004471)
7. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. — 2021, Crit Care Med (PMID:34605781 DOI:10.1097/CCM.0000000000005337)
8. Antimicrobial management of sepsis and septic shock. — 2008, Clin Chest Med (PMID:18954702 DOI:10.1016/j.ccm.2008.06.004)
9. Management of sepsis and septic shock in the emergency department. — 2021, Intern Emerg Med (PMID:33890208 DOI:10.1007/s11739-021-02735-7)
10. Executive Summary: Surviving Sepsis Campaign: International Guidelines for the Management of Sepsis and Septic Shock 2021. — 2021, Crit Care Med (PMID:34643578 DOI:10.1097/CCM.0000000000005357)

---

## Query: `id-antibiotic-duration-pneumonia` — "short course versus long course antibiotic therapy for community-acquired pneumonia"
Category: therapy_comparison. Intent: Antibiotic duration comparison in CAP; expect non-inferiority RCTs + meta-analyses.

### Engine A — top 10
1. Short-Course vs Long-Course Antibiotic Therapy for Children With Nonsevere Community-Acquired Pneumonia: A Systematic Review and Meta-analysis. — 2022, JAMA Pediatr (PMID:36374480 DOI:10.1001/jamapediatrics.2022.4123)
2. Systematic Review and Meta-analysis of the Efficacy of Short-Course Antibiotic Treatments for Community-Acquired Pneumonia in Adults. — 2018, Antimicrob Agents Chemother (PMID:29987137 DOI:10.1128/AAC.00635-18)
3. Short-course versus long-course therapy of the same antibiotic for community-acquired pneumonia in adolescent and adult outpatients. — 2018, Cochrane Database Syst Rev (PMID:30188565 DOI:10.1002/14651858.CD009070.pub2)
4. Short-course versus long-course antibiotic therapy for non-severe community-acquired pneumonia in children aged 2 months to 59 months. — 2008, Cochrane Database Syst Rev (PMID:18425930 DOI:10.1002/14651858.CD005976.pub2)
5. Short-course versus long-course intravenous therapy with the same antibiotic for severe community-acquired pneumonia in children aged two months to 59 months. — 2017, Cochrane Database Syst Rev (PMID:29020436 DOI:10.1002/14651858.CD008032.pub3)
6. The evidence base for the optimal antibiotic treatment duration of upper and lower respiratory tract infections: an umbrella review. — 2025, Lancet Infect Dis (PMID:39243792 DOI:10.1016/S1473-3099(24)00456-0)
7. Short-course versus long-course intravenous therapy with the same antibiotic for severe community-acquired pneumonia in children aged two months to 59 months. — 2015, Cochrane Database Syst Rev (PMID:26077639 DOI:10.1002/14651858.CD008032.pub2)
8. Evaluating Short-course Antibiotic Therapy for Pediatric Community-acquired Pneumonia: A Systematic Review and Meta-analysis. — 2025, Pediatr Infect Dis J (PMID:39898624 DOI:10.1097/INF.0000000000004749)
9. Short- versus long-course antibacterial therapy for community-acquired pneumonia : a meta-analysis. — 2008, Drugs (PMID:18729535 DOI:10.2165/00003495-200868130-00004)
10. Short- vs long-course antibiotic therapy for pneumonia: a comparison of systematic reviews and guidelines for the SIMI Choosing Wisely Campaign. — 2019, Intern Emerg Med (PMID:30298412 DOI:10.1007/s11739-018-1955-2)

### Engine B — top 10
1. Efficacy of short-course antibiotic regimens for community-acquired pneumonia: a meta-analysis. — 2007, American Journal of Medicine (PMID:17765048 DOI:10.1016/J.AMJMED.2007.04.023)
2. Short- versus Long-Course Antibacterial Therapy for Community-Acquired Pneumonia — 2012, Drugs (PMID:18729535 DOI:10.2165/00003495-200868130-00004)
3. Systematic Review and Meta-analysis of the Efficacy of Short-Course Antibiotic Treatments for Community-Acquired Pneumonia in Adults — 2018, Antimicrobial Agents and Chemotherapy (PMID:29987137 DOI:10.1128/AAC.00635-18)
4. Short-course versus long-course therapy of the same antibiotic for community-acquired pneumonia in adolescent and adult outpatients. — 2011, Cochrane Database of Systematic Reviews (PMID:30188565 DOI:10.1002/14651858.CD009070.pub2)
5. Short-course versus long-course antibiotic therapy for non-severe community-acquired pneumonia in children aged 2 months to 59 months. — 2008, Cochrane Database of Systematic Reviews (PMID:18425930 DOI:10.1002/14651858.CD005976.pub2)
6. Article Type: Mini-Review Short-course versus long-course antibiotic treatment for community- acquired pneumonia: a literature review — 2019, ? (— no id —)
7. How long should we treat community-acquired pneumonia? — 2007, Current Opinion in Infectious Diseases (PMID:17496577 DOI:10.1097/QCO.0b013e3280555072)
8. Short-Course vs Long-Course Antibiotic Therapy for Children With Nonsevere Community-Acquired Pneumonia: A Systematic Review and Meta-analysis. — 2022, JAMA pediatrics (PMID:36374480 DOI:10.1001/jamapediatrics.2022.4123)
9. Short‐course vs long‐course antibiotic treatment for community‐acquired pneumonia: A literature review — 2019, Basic & Clinical Pharmacology & Toxicology (PMID:30694600 DOI:10.1111/bcpt.13205)
10. Evaluating Short-Course Antibiotic Therapy for Pediatric Community-Acquired Pneumonia: A Systematic Review and Meta-Analysis. — 2025, The Pediatric Infectious Disease Journal (PMID:39898624 DOI:10.1097/INF.0000000000004749)

---

## Query: `id-paxlovid-recency` — "latest evidence nirmatrelvir-ritonavir for COVID-19 in vaccinated outpatients"
Category: recency. Intent: Most recent efficacy data for nirmatrelvir-ritonavir in standard-risk/vaccinated populations. Newer is better.
_Recency-sensitive: newer high-quality evidence is better._

### Engine A — top 10
1. Nirmatrelvir Plus Ritonavir for Early COVID-19 in a Large U.S. Health System — 2022, Annals of Internal Medicine (PMID:36508742 DOI:10.7326/M22-2141)
2. Nirmatrelvir plus ritonavir for early COVID-19 and hospitalization in a large US health system — 2022, medRxiv (PMID:35734084 DOI:10.1101/2022.06.14.22276393)
3. Effectiveness of nirmatrelvir/ritonavir and molnupiravir in non-hospitalized adults with COVID-19: systematic review and meta-analysis of observational studies — 2024, Journal of Antimicrobial Chemotherapy (PMID:38817046 DOI:10.1093/jac/dkae163)
4. Nirmatrelvir combined with ritonavir for preventing and treating COVID‐19 — 2022, Cochrane Database of Systematic Reviews (PMID:38032024 DOI:10.1002/14651858.CD015395.pub2)
5. Nirmatrelvir Plus Ritonavir for Ambulatory COVID-19: Expanding Evidence, Expanding Role — 2022, Annals of Internal Medicine (PMID:36508735 DOI:10.7326/m22-3427)
6. Effectiveness of COVID-19 treatment with nirmatrelvir-ritonavir or molnupiravir among U.S. Veterans: target trial emulation studies with one-month and six-month outcomes — 2022, Annals of Internal Medicine (PMID:36561190 DOI:10.7326/M22-3565)
7. REAL-WORLD EFFECTIVENESS OF NIRMATRELVIR/RITONAVIR ON COVID-19-ASSOCIATED HOSPITALIZATION PREVENTION: A POPULATION-BASED COHORT STUDY IN THE PROVINCE OF QUEBEC, CANADA — 2023, medRxiv (DOI:10.1101/2023.02.14.23285860)
8. Nirmatrelvir-ritonavir for COVID-19 — 2022, Canadian Medical Association Journal (PMID:35115376 DOI:10.1503/cmaj.220081)
9. Real-World Effectiveness of Nirmatrelvir-Ritonavir in Preventing Coronavirus Disease 2019-Associated Hospitalization: A Population-Based Cohort Study in the Province of Québec, Canada. — 2025, Clinical Infectious Diseases (PMID:41160182 DOI:10.1093/cid/ciaf145)
10. Nirmatrelvir plus ritonavir remains effective in vaccinated patients at risk of progression with COVID-19: A systematic review and meta-analysis — 2023, Journal of Global Health (PMID:37469290 DOI:10.7189/jogh.13.06032)

### Engine B — top 10
1. Molnupiravir or nirmatrelvir-ritonavir plus usual care versus usual care alone in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial. — 2025, Lancet Infect Dis (PMID:40383127 DOI:10.1016/S1473-3099(25)00093-3)
2. Real-World Effectiveness of Nirmatrelvir-Ritonavir in Preventing Coronavirus Disease 2019-Associated Hospitalization: A Population-Based Cohort Study in the Province of Qu&#xe9;bec, Canada. — 2025, Clin Infect Dis (PMID:41160182 DOI:10.1093/cid/ciaf145)
3. Impact of nirmatrelvir/ritonavir on the risk of long COVID in outpatients: a systematic review and meta-analysis. — 2026, Expert Rev Anti Infect Ther (PMID:41717886 DOI:10.1080/14787210.2026.2636175)
4. The effect of remdesivir and nirmatrelvir/ritonavir on mortality in patients hospitalized with COVID-19 during the Omicron era: an emulated target trial. — 2026, Clin Microbiol Infect (PMID:40992693 DOI:10.1016/j.cmi.2025.09.012)
5. Effectiveness of nirmatrelvir-ritonavir for the treatment of patients with mild to moderate COVID-19 and at high risk of hospitalization: Systematic review and meta-analyses of observational studies. — 2023, PLoS One (PMID:37824507 DOI:10.1371/journal.pone.0284006)
6. Outpatient Treatment of Confirmed COVID-19 in Symptomatic Adults: Living, Rapid Practice Points From the American College of Physicians (Version 3). — 2026, Ann Intern Med (PMID:41662713 DOI:10.7326/ANNALS-25-03766)
7. Canadian Adaptive Platform Trial of Treatments for COVID in Community Settings (CanTreatCOVID): protocol for a randomised controlled adaptive platform trial of treatments for acute SARS-CoV-2 infection in community settings. — 2025, BMJ Open (PMID:40754325 DOI:10.1136/bmjopen-2024-097134)
8. Real-World Effectiveness of Nirmatrelvir-Ritonavir Against Severe Outcomes of COVID-19 in Taiwan: A Nationwide Population-Based Cohort Study. — 2025, Open Forum Infect Dis (PMID:40988922 DOI:10.1093/ofid/ofaf553)
9. Effectiveness of Nirmatrelvir-Ritonavir for the Prevention of COVID-19-Related Hospitalization and Mortality: A Systematic Literature Review. — 2024, Am J Ther (PMID:38691664 DOI:10.1097/MJT.0000000000001744)
10. Non-randomized evaluation of hospitalization after a prescription for nirmatrelvir/ritonavir versus molnupiravir in high-risk COVID-19 outpatients. — 2023, J Antimicrob Chemother (PMID:37229547 DOI:10.1093/jac/dkad154)

---

## Query: `id-fluoroquinolone-cdiff-safety` — "fluoroquinolone exposure and risk of Clostridioides difficile infection"
Category: safety_adverse_event. Intent: Association between fluoroquinolones and C. difficile; expect cohort/case-control + meta-analyses.

### Engine A — top 10
1. Antibiotics and healthcare facility-associated Clostridioides difficile infection: systematic review and meta-analysis 2020 update. — 2021, J Antimicrob Chemother (PMID:33787887 DOI:10.1093/jac/dkab091)
2. Meta-analysis of antibiotics and the risk of community-associated Clostridium difficile infection. — 2013, Antimicrob Agents Chemother (PMID:23478961 DOI:10.1128/AAC.02176-12)
3. Antibiotics and hospital-acquired Clostridium difficile infection: update of systematic review and meta-analysis. — 2014, J Antimicrob Chemother (PMID:24324224 DOI:10.1093/jac/dkt477)
4. Antibiotic-Specific Risk for Community-Acquired Clostridioides difficile Infection in the United States from 2008 to 2020. — 2022, Antimicrob Agents Chemother (PMID:36377887 DOI:10.1128/aac.01129-22)
5. Community-associated Clostridium difficile infection and antibiotics: a meta-analysis. — 2013, J Antimicrob Chemother (PMID:23620467 DOI:10.1093/jac/dkt129)
6. Carrier prevalence of Clostridioides difficile in emergency departments and the association of prior antibiotic consumption: a combined cross-sectional and nested case-control study. — 2023, J Antimicrob Chemother (PMID:37409612 DOI:10.1093/jac/dkad213)
7. Antibiotic exposure and risk of community-associated Clostridium difficile infection: A self-controlled case series analysis. — 2019, Am J Infect Control (PMID:30172612 DOI:10.1016/j.ajic.2018.06.016)
8. Risk factors for development of initial Clostridioides difficile infection. — 2021, J Glob Antimicrob Resist (PMID:33667706 DOI:10.1016/j.jgar.2021.02.012)
9. Antibiotic Exposure and Risk for Hospital-Associated Clostridioides difficile Infection. — 2020, Antimicrob Agents Chemother (PMID:31964789 DOI:10.1128/AAC.02169-19)
10. Incidence, outcome, and risk factors for recurrence of nosocomial Clostridioides difficile infection in adults: A prospective cohort study. — 2020, J Infect Public Health (PMID:31838001 DOI:10.1016/j.jiph.2019.11.005)

### Engine B — top 10
1. Emergence of fluoroquinolones as the predominant risk factor for Clostridium difficile-associated diarrhea: a cohort study during an epidemic in Quebec. — 2005, Clinical Infectious Diseases (PMID:16206099 DOI:10.1086/496986)
2. Do fluoroquinolones predispose patients to Clostridium difficile associated disease? A review of the evidence — 2008, Current Medical Research and Opinion (PMID:18067688 DOI:10.1185/030079908X253735)
3. difficile Associated Diarrhea — 2011, Emerging Infectious Diseases (— no id —)
4. Fluoroquinolone use and risk factors for Clostridium difficile-associated disease within a Veterans Administration health care system. — 2007, Clinical Infectious Diseases (PMID:17918075 DOI:10.1086/522187)
5. A Large Outbreak of Clostridium difficile–Associated Disease with an Unexpected Proportion of Deaths and Colectomies at a Teaching Hospital Following Increased Fluoroquinolone Use — 2005, Infection Control &#x0026; Hospital Epidemiology (PMID:15796280 DOI:10.1086/502539)
6. Antimicrobial-associated risk factors for Clostridium difficile infection. — 2008, Clinical Infectious Diseases (PMID:18177218 DOI:10.1086/521859)
7. Cumulative antibiotic exposures over time and the risk of Clostridium difficile infection. — 2011, Clinical Infectious Diseases (PMID:21653301 DOI:10.1093/cid/cir301)
8. Interaction of Age and Levofloxacin Exposure on the Incidence of Clostridium difficile Infection — 2011, Infectious Diseases in Clinical Practice (DOI:10.1097/IPC.0b013e31820994a2)
9. FLUOROQUINOLONE USE IS THE PREDOMINANT RISK FACTOR FOR THE DEVELOPMENT OF A NEW STRAIN OF CLOSTRIDIUM DIFFICILE‐ASSOCIATED DISEASE — 2007, BJU International (PMID:17233799 DOI:10.1111/j.1464-410X.2006.06741.x)
10. Clindamycin, cephalosporins, fluoroquinolones, and Clostridium difficile-associated diarrhea: this is an antimicrobial resistance problem. — 2004, Clinical Infectious Diseases (PMID:14986247 DOI:10.1086/382084)

---

## Query: `endo-surmount-obesity` — "tirzepatide once weekly for the treatment of obesity"
Category: therapy_comparison. Intent: Pivotal tirzepatide weight-loss RCT in obesity without diabetes (SURMOUNT-1).

**Must-have landmark papers (ground truth):**
- SURMOUNT-1 (Jastreboff, NEJM 2022)

### Engine A — top 10
1. Tirzepatide Once Weekly for the Treatment of Obesity. — 2022, New England Journal of Medicine (PMID:35658024 DOI:10.1056/nejmoa2206038)
2. Tirzepatide once weekly for the treatment of obesity in people with type 2 diabetes (SURMOUNT-2): a double-blind, randomised, multicentre, placebo-controlled, phase 3 trial. — 2023, The Lancet (PMID:37385275 DOI:10.1016/s0140-6736(23)01200-x)
3. Tirzepatide for overweight and obesity management — 2024, Expert Opinion on Pharmacotherapy (PMID:39632534 DOI:10.1080/14656566.2024.2436595)
4. Efficacy and safety of once-weekly tirzepatide for weight management compared to placebo: An updated systematic review and meta-analysis including the latest SURMOUNT-2 trial — 2024, Endocrine (PMID:38850440 DOI:10.1007/s12020-024-03896-z)
5. Tirzepatide: Una vez por semana para el tratamiento de la obesidad — 2023, Diagnóstico (DOI:10.33734/diagnostico.v62i2.463)
6. Continued Treatment With Tirzepatide for Maintenance of Weight Reduction in Adults With Obesity: The SURMOUNT-4 Randomized Clinical Trial. — 2023, Journal of the American Medical Association (JAMA) (PMID:38078870 DOI:10.1001/jama.2023.24945)
7. Tirzepatide for Obesity Treatment and Diabetes Prevention. — 2024, New England Journal of Medicine (PMID:39536238 DOI:10.1056/nejmoa2410819)
8. Efficacy and Safety of Tirzepatide in Type 2 Diabetes and Obesity Management — 2023, Journal of Obesity & Metabolic Syndrome (PMID:36750526 DOI:10.7570/jomes22067)
9. Tirzepatide: A new anti-obesity medication. — 2022, Gastroenterology (PMID:36155186 DOI:10.1053/j.gastro.2022.09.013)
10. Tirzepatide after intensive lifestyle intervention in adults with overweight or obesity: the SURMOUNT-3 phase 3 trial — 2023, Nature Medicine (PMID:37840095 DOI:10.1038/s41591-023-02597-w)

### Engine B — top 10
1. Tirzepatide Once Weekly for the Treatment of Obesity. — 2022, N Engl J Med (PMID:35658024 DOI:10.1056/NEJMoa2206038)
2. Efficacy and Safety of Glucagon-Like Peptide-1 Receptor Agonists for Weight Loss Among Adults Without Diabetes : A Systematic Review of Randomized Controlled Trials. — 2025, Ann Intern Med (PMID:39761578 DOI:10.7326/ANNALS-24-01590)
3. Tirzepatide cardiovascular event risk assessment: a pre-specified meta-analysis. — 2022, Nat Med (PMID:35210595 DOI:10.1038/s41591-022-01707-4)
4. Tirzepatide once weekly for the treatment of obesity in people with type 2 diabetes (SURMOUNT-2): a double-blind, randomised, multicentre, placebo-controlled, phase 3 trial. — 2023, Lancet (PMID:37385275 DOI:10.1016/S0140-6736(23)01200-X)
5. Continued Treatment With Tirzepatide for Maintenance of Weight Reduction in Adults With Obesity: The SURMOUNT-4 Randomized Clinical Trial. — 2024, JAMA (PMID:38078870 DOI:10.1001/jama.2023.24945)
6. Tirzepatide for Obesity Treatment and Diabetes Prevention. — 2025, N Engl J Med (PMID:39536238 DOI:10.1056/NEJMoa2410819)
7. Tirzepatide as Compared with Semaglutide for the Treatment of Obesity. — 2025, N Engl J Med (PMID:40353578 DOI:10.1056/NEJMoa2416394)
8. Tirzepatide for Weight Reduction in Chinese Adults With Obesity: The SURMOUNT-CN Randomized Clinical Trial. — 2024, JAMA (PMID:38819983 DOI:10.1001/jama.2024.9217)
9. Tirzepatide for the treatment of obesity: Rationale and design of the SURMOUNT clinical development program. — 2023, Obesity (Silver Spring) (PMID:36478180 DOI:10.1002/oby.23612)
10. Efficacy and safety of once-weekly tirzepatide in Japanese patients with obesity disease (SURMOUNT-J): a multicentre, randomised, double-blind, placebo-controlled phase 3 trial. — 2025, Lancet Diabetes Endocrinol (PMID:40031941 DOI:10.1016/S2213-8587(24)00377-2)

---

## Query: `exact-select-semaglutide` — "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes"
Category: exact_paper. Intent: Retrieve the SELECT cardiovascular outcomes trial primary paper by its exact title.

**Must-have landmark papers (ground truth):**
- SELECT (Lincoff, NEJM 2023)

### Engine A — top 10
1. Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes. — 2023, New England Journal of Medicine (PMID:37952131 DOI:10.1056/NEJMoa2307563)
2. Obesity and Diabetes — 2026, Diabetes Technology & Therapeutics (PMID:41800639 DOI:10.1177/15209156251411115)
3. Semaglutide for cardiovascular event reduction in people with overweight or obesity: SELECT study baseline characteristics — 2022, Obesity (PMID:36502289 DOI:10.1002/oby.23621)
4. Semaglutide improves cardiometabolic risk factors in adults with overweight or obesity: STEP 1 and 4 exploratory analyses — 2022, Diabetes, obesity and metabolism (PMID:36200477 DOI:10.1111/dom.14890)
5. Semaglutide Effects on Cardiovascular Outcomes in People With Overweight or Obesity (SELECT) rationale and design. — 2020, American Heart Journal (PMID:32916609 DOI:10.1016/j.ahj.2020.07.008)
6. Semaglutide and cardiovascular outcomes by baseline and changes in adiposity measurements: a prespecified analysis of the SELECT trial. — 2025, The Lancet (PMID:41138739 DOI:10.1016/s0140-6736(25)01375-3)
7. Is semaglutide effective in reducing cardiovascular outcomes in obesity without diabetes? — 2024, Evidence-Based Practice (DOI:10.1097/ebp.0000000000002222)
8. Effect of semaglutide on major cardiovascular events — 2024, Drug and therapeutics bulletin (PMID:38237952 DOI:10.1136/dtb.2024.000007)
9. Late-Breaking Science Abstracts and Featured Science Abstracts From the American Heart Association’s Scientific Sessions 2023 and Late-Breaking Abstracts in Resuscitation Science From the Resuscitation Science Symposium 2023 — 2023, Circulation (DOI:10.1161/cir.0000000000001200)
10. Semaglutide effects on cardiovascular outcomes in individuals with overweight or obesity who do not have diabetes: a systematic review — 2024, Medical Science Pulse (DOI:10.5604/01.3001.0055.0721)

### Engine B — top 10
1. Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes. — 2023, N Engl J Med (PMID:37952131 DOI:10.1056/NEJMoa2307563)
2. Long-term weight loss effects of semaglutide in obesity without diabetes in the SELECT trial. — 2024, Nat Med (PMID:38740993 DOI:10.1038/s41591-024-02996-7)
3. Coadministered Cagrilintide and Semaglutide in Adults with Overweight or Obesity. — 2025, N Engl J Med (PMID:40544433 DOI:10.1056/NEJMoa2502081)
4. Long-term kidney outcomes of semaglutide in obesity and cardiovascular disease in the SELECT trial. — 2024, Nat Med (PMID:38796653 DOI:10.1038/s41591-024-03015-5)
5. Semaglutide and Cardiovascular Outcomes by Baseline HbA1c and Change in HbA1c in People With Overweight or Obesity but Without Diabetes in SELECT. — 2024, Diabetes Care (PMID:38907684 DOI:10.2337/dc24-0764)
6. Effect of Semaglutide on Regression and Progression of Glycemia in People With Overweight or Obesity but Without Diabetes in the SELECT Trial. — 2024, Diabetes Care (PMID:38907683 DOI:10.2337/dc24-0491)
7. Semaglutide and tirzepatide effects on cardiovascular outcomes in people with overweight or obesity in the real world (STEER). — 2026, Diabetes Obes Metab (PMID:41491349 DOI:10.1111/dom.70436)
8. Semaglutide and cardiovascular outcomes in patients with obesity and prevalent heart failure: a prespecified analysis of the SELECT trial. — 2024, Lancet (PMID:39181597 DOI:10.1016/S0140-6736(24)01498-3)
9. Semaglutide Effects on Cardiovascular Outcomes in People With Overweight or Obesity (SELECT) rationale and design. — 2020, Am Heart J (PMID:32916609 DOI:10.1016/j.ahj.2020.07.008)
10. Semaglutide and cardiovascular outcomes by baseline and changes in adiposity measurements: a prespecified analysis of the SELECT trial. — 2025, Lancet (PMID:41138739 DOI:10.1016/S0140-6736(25)01375-3)

---

## Query: `endo-thyroid-guideline` — "ATA guideline management of hypothyroidism levothyroxine"
Category: guideline. Intent: American Thyroid Association hypothyroidism/levothyroxine guidance should rank top.

### Engine A — top 10
1. Screening and Management of Subclinical Hypothyroidism in Pregnancy: A Nationwide Survey of Physicians in Saudi Arabia. — 2025, Cureus (PMID:40926921 DOI:10.7759/cureus.89614)
2. AN ITALIAN SURVEY OF COMPLIANCE WITH MAJOR GUIDELINES FOR L-THYROXINE OF PRIMARY HYPOTHYROIDISM. — 2018, Endocr Pract (PMID:29847168 DOI:10.4158/EP-2017-0159)
3. Practice Variation in the Care of Subclinical Hypothyroidism During Pregnancy: A National Survey of Physicians in the United States. — 2019, J Endocr Soc (PMID:31598570 DOI:10.1210/js.2019-00196)
4. Clinical practice guidelines for hypothyroidism in adults: cosponsored by the American Association of Clinical Endocrinologists and the American Thyroid Association. — 2012, Endocr Pract (PMID:23246686 DOI:10.4158/EP12280.GL)
5. Appraisal of clinical practice guidelines on the management of hypothyroidism in pregnancy using the Appraisal of Guidelines for Research and Evaluation II instrument. — 2018, Endocrine (PMID:29445919 DOI:10.1007/s12020-018-1535-2)
6. Table 2, [Selection of guidelines for the management of hypothyroidism]. - 70 Years of Levothyroxine - NCBI Bookshelf — 0, ? (— no id —)
7. Management of primary hypothyroidism: statement by the British Thyroid Association Executive Committee. — 2016, Clin Endocrinol (Oxf) (PMID:26010808 DOI:10.1111/cen.12824)
8. [The Thyroid and Pregnancy]. — 2019, Dtsch Med Wochenschr (PMID:31791071 DOI:10.1055/a-0660-6126)
9. 2017 Guidelines of the American Thyroid Association for the Diagnosis and Management of Thyroid Disease During Pregnancy and the Postpartum - PubMed — 0, ? (PMID:28056690)
10. Guidelines for the Treatment of Hypothyroidism: Prepared by the American Thyroid Association Task Force on Thyroid Hormone Replacement — 0, ? (— no id —)

### Engine B — top 10
1. 2015 American Thyroid Association Management Guidelines for Adult Patients with Thyroid Nodules and Differentiated Thyroid Cancer: The American Thyroid Association Guidelines Task Force on Thyroid Nodules and Differentiated Thyroid Cancer — 2009, Thyroid (PMID:26462967 DOI:10.1089/thy.2015.0020)
2. Clinical practice guidelines for hypothyroidism in adults: cosponsored by the American Association of Clinical Endocrinologists and the American Thyroid Association. — 2012, Endocrine Practice (PMID:23246686 DOI:10.4158/EP12280.GL)
3. Clinical Practice Guidelines for Hypothyroidism in Adults: Cosponsored by the American Association of Clinical Endocrinologists and the American Thyroid Association — 2012, Thyroid (PMID:22954017 DOI:10.1089/thy.2012.0205)
4. Guidelines for the Treatment of Hypothyroidism: Prepared by the American Thyroid Association Task Force on Thyroid Hormone Replacement — 2014, Thyroid (PMID:25266247 DOI:10.1089/thy.2014.0028)
5. Management of primary hypothyroidism: statement by the British Thyroid Association Executive Committee — 2016, Clinical Endocrinology (PMID:26010808 DOI:10.1111/cen.12824)
6. A 2013 survey of clinical practice patterns in the management of primary hypothyroidism. — 2014, Journal of Clinical Endocrinology and Metabolism (PMID:24527720 DOI:10.1210/jc.2014-1046)
7. Guidelined Review: Management of Hypothyroidism — 2025, Saudi Journal of Medicine (DOI:10.36348/sjm.2025.v10i07.004)
8. 2017 Guidelines of the American Thyroid Association for the Diagnosis and Management of Thyroid Disease During Pregnancy and the Postpartum — 2011, Thyroid (PMID:28056690 DOI:10.1089/thy.2016.0457)
9. Management Practices Among Primary Care Physicians and Thyroid Specialists in the Care of Hypothyroid Patients — 2001, Thyroid (PMID:11525268 DOI:10.1089/10507250152484592)
10. Management of hypothyroidism in adults — 2008, British medical journal (PMID:18662921 DOI:10.1136/bmj.a801)

---

## Query: `endo-glp1-mechanism` — "mechanism of action of GLP-1 receptor agonists on appetite and weight"
Category: mechanism. Intent: Central and peripheral mechanisms of GLP-1 RA-induced weight loss; expect reviews + translational studies.

### Engine A — top 10
1. Effects of glucagon-like peptide 1 on appetite and body weight: focus on the CNS. — 2014, Journal of Endocrinology (PMID:24323912 DOI:10.1530/JOE-13-0414)
2. GLP-1 Receptor Activation Modulates Appetite- and Reward-Related Brain Areas in Humans — 2014, Diabetes (PMID:25071023 DOI:10.2337/db14-0849)
3. Mechanisms of GLP-1 receptor agonist-induced weight loss: A review of central and peripheral pathways in appetite and energy regulation. — 2025, American Journal of Medicine (PMID:39892489 DOI:10.1016/j.amjmed.2025.01.021)
4. Glucagon-like peptide 1 and appetite — 2013, Trends in endocrinology and metabolism (PMID:23332584 DOI:10.1016/j.tem.2012.11.008)
5. Effects of GLP-1 on appetite and weight — 2014, Reviews in Endocrine & Metabolic Disorders (PMID:24811133 DOI:10.1007/s11154-014-9289-5)
6. Effects of GLP-1 on appetite and body weight : focus on the central nervous system Chapter 2 — 2015, ? (— no id —)
7. Curbing the appetites and restoring the capacity for satisfaction: The impact of GLP-1 agonists on the reward circuitry — 2025, Neuroscience Applied (PMID:40654594 DOI:10.1016/j.nsa.2025.105512)
8. GLP-1 increases preingestive satiation via hypothalamic circuits in mice and humans — 2024, Science (PMID:38935778 DOI:10.1126/science.adj2537)
9. GLP-1 agonists and satiety — 2008, Immunology‚ Endocrine & Metabolic Agents in Medicinal Chemistry (DOI:10.2174/187152208787169170)
10. From Gut to Brain: The Neurohormonal Basis of Appetite Suppression and Gastric Emptying Delay by Semaglutide in Non-Diabetic Obesity — 2026, Journal of international research in medical and pharmaceutical sciences (DOI:10.56557/jirmeps/2026/v21i310654)

### Engine B — top 10
1. Effect of pemvidutide, a GLP-1/glucagon dual receptor agonist, on MASLD: A randomized, double-blind, placebo-controlled study. — 2025, J Hepatol (PMID:39002641 DOI:10.1016/j.jhep.2024.07.006)
2. GLP-1 receptor activation modulates appetite- and reward-related brain areas in humans. — 2014, Diabetes (PMID:25071023 DOI:10.2337/db14-0849)
3. LY3298176, a novel dual GIP and GLP-1 receptor agonist for the treatment of type 2 diabetes mellitus: From discovery to clinical proof of concept. — 2018, Mol Metab (PMID:30473097 DOI:10.1016/j.molmet.2018.09.009)
4. Effects of once-weekly semaglutide on appetite, energy intake, control of eating, food preference and body weight in subjects with obesity. — 2017, Diabetes Obes Metab (PMID:28266779 DOI:10.1111/dom.12932)
5. Effect of the glucagon-like peptide-1 receptor agonist liraglutide, compared to caloric restriction, on appetite, dietary intake, body fat distribution and cardiometabolic biomarkers: A randomized trial in adults with obesity and prediabetes. — 2023, Diabetes Obes Metab (PMID:37188932 DOI:10.1111/dom.15113)
6. Mechanisms of Action and Therapeutic Application of Glucagon-like Peptide-1. — 2018, Cell Metab (PMID:29617641 DOI:10.1016/j.cmet.2018.03.001)
7. Efficacy and safety of LY3298176, a novel dual GIP and GLP-1 receptor agonist, in patients with type 2 diabetes: a randomised, placebo-controlled and active comparator-controlled phase 2 trial. — 2018, Lancet (PMID:30293770 DOI:10.1016/S0140-6736(18)32260-8)
8. Revisiting the Complexity of GLP-1 Action from Sites of Synthesis to Receptor Activation. — 2021, Endocr Rev (PMID:33320179 DOI:10.1210/endrev/bnaa032)
9. Tirzepatide versus insulin glargine in type 2 diabetes and increased cardiovascular risk (SURPASS-4): a randomised, open-label, parallel-group, multicentre, phase 3 trial. — 2021, Lancet (PMID:34672967 DOI:10.1016/S0140-6736(21)02188-7)
10. Real-world evidence on the utilization, clinical and comparative effectiveness, and adverse effects of newer GLP-1RA-based weight-loss therapies. — 2025, Diabetes Obes Metab (PMID:40196933 DOI:10.1111/dom.16364)

---

## Query: `endo-t2dm-first-line-pico` — "In adults with newly diagnosed type 2 diabetes, does metformin versus lifestyle alone improve glycemic control?"
Category: pico. Intent: P=new T2DM, I=metformin, C=lifestyle/placebo, O=HbA1c/glycemic outcomes (UKPDS/DPP).

### Engine A — top 10
1. Intense simplified strategy for newly diagnosed type 2 diabetes in patients with severe hyperglycaemia: multicentre, open label, randomised trial. — 2024, BMJ (PMID:39406449 DOI:10.1136/bmj-2024-080122)
2. Long-term effects on glycaemic control and &#x3b2;-cell preservation of early intensive treatment in patients with newly diagnosed type 2 diabetes: A multicentre randomized trial. — 2018, Diabetes Obes Metab (PMID:29272062 DOI:10.1111/dom.13196)
3. Randomized controlled trial of effects of metformin in NAFLD patients with newly diagnosed type 2 diabetes treated with an intensive lifestyle: a study protocol. — 2025, Trials (PMID:41174662 DOI:10.1186/s13063-025-09191-0)
4. Insights from VERIFY: Early Combination Therapy Provides Better Glycaemic Durability Than a Stepwise Approach in Newly Diagnosed Type&#xa0;2 Diabetes. — 2020, Diabetes Ther (PMID:32975711 DOI:10.1007/s13300-020-00926-7)
5. Youth with type 2 diabetes have a high rate of treatment failure after discontinuation of insulin: A Pediatric Diabetes Consortium study. — 2022, Pediatr Diabetes (PMID:35138021 DOI:10.1111/pedi.13325)
6. Effects of time-restricted eating on glycemic control in type 2 diabetes: A 12-week quasi-experimental single-arm study with 1-year follow-up. — 2025, Clin Nutr (PMID:40812266 DOI:10.1016/j.clnu.2025.08.002)

### Engine B — top 10
1. Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin. — 2002, New England Journal of Medicine (PMID:11832527 DOI:10.1056/NEJMOA012512)
2. Metformin versus Lifestyle Modification in Diabetes Prevention: New Considerations in the Age of Healthcare Reform — 2013, ? (— no id —)
3. Metformin Monotherapy With and Without Lifestyle Changes Affects Anthropometric Parameters, Blood Pressure, Blood Glucose, and Lipid Profile in Indian Patients With Newly Diagnosed Type 2 Diabetes — 2024, Cureus (PMID:38868550 DOI:10.7759/cureus.62131)
4. Differential Effects of Lifestyle Interventions and Metformin for Preventing Type 2 Diabetes — 2015, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA37121)
5. Metformin is associated with fewer major adverse cardiac events among patients with a new diagnosis of type 2 diabetes mellitus — 2017, Medicine (PMID:28700501 DOI:10.1097/MD.0000000000007507)
6. Therapeutic Outcomes of Metformin Alone Versus Metformin Plus Saxagliptin in Newly Diagnosed Type 2 Diabetes — 2026, International Journal of Drug Delivery Technology (DOI:10.25258/ijddt.16.31s.18)
7. Metformin Use in Patients with Prediabetes — 2015, NEJM Journal Watch (DOI:10.1056/nejm-jw.NA37615)
8. Conquering Prediabetes: Battle of Metformin Versus Lifestyle Makeover — 2024, Pakistan journal of medicine and dentistry (DOI:10.36283/pjmd13-3/003)
9. Metformin plus lifestyle interventions versus lifestyle interventions alone for the delay or prevention of type 2 diabetes in individuals with prediabetes: a meta-analysis of randomized controlled trials — 2024, Diabetology & Metabolic Syndrome (PMID:39543645 DOI:10.1186/s13098-024-01504-8)
10. Comparative and Combined Impact of Metformin and Lifestyle Intervention (Yoga and Walking) on Metabolic Parameters in Patients with Type 2 Diabetes Mellitus — 2026, International Journal of Current Pharmaceutical Review and Research (DOI:10.25258/ijcpr.18.2.140)

---

## Query: `exact-dapa-ckd` — "Dapagliflozin in Patients with Chronic Kidney Disease"
Category: exact_paper. Intent: Retrieve the DAPA-CKD primary results paper by its exact title.

**Must-have landmark papers (ground truth):**
- DAPA-CKD (Heerspink, NEJM 2020)

### Engine A — top 10
1. Dapagliflozin in Patients with Chronic Kidney Disease. — 2020, N Engl J Med (PMID:32970396 DOI:10.1056/NEJMoa2024816)
2. Effects of dapagliflozin on major adverse kidney and cardiovascular events in patients with diabetic and non-diabetic chronic kidney disease: a prespecified analysis from the DAPA-CKD trial. — 2021, Lancet Diabetes Endocrinol (PMID:33338413 DOI:10.1016/S2213-8587(20)30369-7)
3. Effect of dapagliflozin on the rate of decline in kidney function in patients with chronic kidney disease with and without type 2 diabetes: a prespecified analysis from the DAPA-CKD trial. — 2021, Lancet Diabetes Endocrinol (PMID:34619108 DOI:10.1016/S2213-8587(21)00242-4)
4. Effect of dapagliflozin on urinary albumin excretion in patients with chronic kidney disease with and without type 2 diabetes: a prespecified analysis from the DAPA-CKD trial. — 2021, Lancet Diabetes Endocrinol (PMID:34619106 DOI:10.1016/S2213-8587(21)00243-6)
5. Albuminuria-Lowering Effect of Dapagliflozin, Eplerenone, and Their Combination in Patients with Chronic Kidney Disease: A Randomized Crossover Clinical Trial. — 2022, J Am Soc Nephrol (PMID:35440501 DOI:10.1681/ASN.2022020207)
6. Effects of Dapagliflozin in Stage 4 Chronic Kidney Disease. — 2021, J Am Soc Nephrol (PMID:34272327 DOI:10.1681/ASN.2021020167)
7. The long-term effects of dapagliflozin in chronic kidney disease: a time-to-event analysis. — 2024, Nephrol Dial Transplant (PMID:38730538 DOI:10.1093/ndt/gfae106)
8. Balcinrenone plus dapagliflozin in patients with heart failure and chronic kidney disease: Results from the phase 2b MIRACLE trial. — 2024, Eur J Heart Fail (PMID:38783712 DOI:10.1002/ejhf.3294)
9. Zibotentan in combination with dapagliflozin compared with dapagliflozin in patients with chronic kidney disease (ZENITH-CKD): a multicentre, randomised, active-controlled, phase 2b, clinical trial. — 2023, Lancet (PMID:37931629 DOI:10.1016/S0140-6736(23)02230-4)
10. A pre-specified analysis of the DAPA-CKD trial demonstrates the effects of dapagliflozin on major adverse kidney events in patients with IgA nephropathy. — 2021, Kidney Int (PMID:33878338 DOI:10.1016/j.kint.2021.03.033)

### Engine B — top 10
1. Dapagliflozin in Patients with Chronic Kidney Disease. — 2020, New England Journal of Medicine (PMID:32970396 DOI:10.1056/NEJMoa2024816)
2. Dapagliflozin Reduces Adverse Renal and Cardiovascular Events in Patients With Chronic Kidney Disease — 2020, Journal of Clinical Outcomes Management (DOI:10.12788/jcom.0030)
3. [The dapagliflozin and prevention of adverse outcomes in chronic kidney disease: results of the DAPA-CKD study]. — 2021, Терапевтический архив (PMID:36286839 DOI:10.26442/00403660.2021.6.200891)
4. Effects of dapagliflozin on major adverse kidney and cardiovascular events in patients with diabetic and non-diabetic chronic kidney disease: a prespecified analysis from the DAPA-CKD trial. — 2021, The Lancet Diabetes and Endocrinology (PMID:33338413 DOI:10.1016/S2213-8587(20)30369-7)
5. Effect of dapagliflozin on the rate of decline in kidney function in patients with chronic kidney disease with and without type 2 diabetes: a prespecified analysis from the DAPA-CKD trial. — 2021, The Lancet Diabetes and Endocrinology (PMID:34619108 DOI:10.1016/S2213-8587(21)00242-4)
6. Dapagliflozin And Prevention of Adverse outcomes in Chronic Kidney Disease (DAPA-CKD) — 2020, Journal of Cardiac Failure (DOI:10.1016/j.cardfail.2020.11.024)
7. Effect of Dapagliflozin on Clinical Outcomes in Patients with Chronic Kidney Disease, With and Without Cardiovascular Disease. — 2020, Circulation (PMID:33186054 DOI:10.1161/CIRCULATIONAHA.120.051675)
8. Cognitive Behavioral Therapy Plus Placebo Is Inferior to NSAID Therapy for Arthritis Pain — 2020, Journal of Clinical Outcomes Management (DOI:10.12788/jcom.0029)
9. Renoprotective effects of dapagliflozin in diabetic patients with chronic kidney disease: A retrospective observational study. — 2026, British Journal of Clinical Pharmacology (PMID:41635195 DOI:10.1002/bcp.70458)
10. MON-302 ADMINISTRATION OF DAPAGLIFLOZIN IN TYPE 2 DIABETES MELLITUS PATIENTS WITH CHRONIC KIDNEY DISEASE: A SYSTEMATIC REVIEW — 2019, Kidney International Reports (DOI:10.1016/J.EKIR.2019.05.1111)

---

## Query: `neph-finerenone-pico` — "In patients with diabetic kidney disease, does finerenone versus placebo reduce kidney disease progression?"
Category: pico. Intent: P=CKD+T2DM, I=finerenone, C=placebo, O=kidney/CV composite (FIDELIO-DKD/FIGARO-DKD).

### Engine A — top 10
1. Effect of Finerenone on Chronic Kidney Disease Outcomes in Type 2 Diabetes. — 2020, New England Journal of Medicine (PMID:33264825 DOI:10.1056/nejmoa2025845)
2. Cardiovascular and kidney outcomes with finerenone in patients with type 2 diabetes and chronic kidney disease: the FIDELITY pooled analysis — 2021, European Heart Journal (PMID:35023547 DOI:10.1093/eurheartj/ehab777)
3. Cardiovascular Events with Finerenone in Kidney Disease and Type 2 Diabetes. — 2021, New England Journal of Medicine (PMID:34449181 DOI:10.1056/NEJMoa2110956)
4. OUP accepted manuscript — 2022, Nephrology, Dialysis and Transplantation (PMID:https://pubmed.ncbi.nlm.nih.gov/35451488 DOI:10.1093/ndt/gfac157)
5. Finerenone in Patients with Chronic Kidney Disease and Type 2 Diabetes: The FIDELIO-DKD Subgroup from China — 2023, Kidney Diseases (PMID:38089437 DOI:10.1159/000531997)
6. Faculty Opinions recommendation of Effect of finerenone on chronic kidney disease outcomes in type 2 diabetes. — 2020, Faculty Opinions – Post-Publication Peer Review of the Biomedical Literature (DOI:10.3410/f.738883331.793580923)
7. Finerenone Versus Placebo on Renal Outcomes in Patients with Chronic Kidney Disease and Type 2 Diabetes: A Systematic Review and Meta-Analysis — 2025, Journal of Clinical Medicine (PMID:41010560 DOI:10.3390/jcm14186355)
8. Analysis from the FIDELITY study examined finerenone use and kidney outcomes in patients with chronic kidney disease and type 2 diabetes. — 2022, Kidney International (PMID:36367466 DOI:10.1016/j.kint.2022.08.040)
9. Design and Baseline Characteristics of the Finerenone in Reducing Kidney Failure and Disease Progression in Diabetic Kidney Disease Trial — 2019, American Journal of Nephrology (PMID:31655812 DOI:10.1159/000503713)
10. Finerenone Reduces Risk of Incident Heart Failure in Patients With Chronic Kidney Disease and Type 2 Diabetes: Analyses From the FIGARO-DKD Trial — 2021, Circulation (PMID:34775784 DOI:10.1161/CIRCULATIONAHA.121.057983)

### Engine B — top 10
1. Finerenone in diabetic kidney disease: A systematic review and critical appraisal. — 2022, Diabetes Metab Syndr (PMID:36223666 DOI:10.1016/j.dsx.2022.102638)
2. Effect of Finerenone on Morbidity and Mortality in CKD. — 2026, J Am Soc Nephrol (PMID:40938666 DOI:10.1681/ASN.0000000823)
3. Effect of Finerenone on Chronic Kidney Disease Outcomes in Type 2 Diabetes. — 2020, N Engl J Med (PMID:33264825 DOI:10.1056/NEJMoa2025845)
4. Efficacy and safety of finerenone in patients with chronic kidney disease: an individual participant data pooled analysis (INFINITY). — 2026, Lancet (PMID:42248158 DOI:10.1016/S0140-6736(26)01009-3)
5. Finerenone Reduces Risk of Incident Heart Failure in Patients With Chronic Kidney Disease and Type 2 Diabetes: Analyses From the FIGARO-DKD Trial. — 2022, Circulation (PMID:34775784 DOI:10.1161/CIRCULATIONAHA.121.057983)
6. Finerenone and Cardiovascular Outcomes in Patients With Chronic Kidney Disease and Type 2 Diabetes. — 2021, Circulation (PMID:33198491 DOI:10.1161/CIRCULATIONAHA.120.051898)
7. Finerenone Reduces New-Onset Atrial Fibrillation in Patients With Chronic Kidney Disease and Type 2 Diabetes. — 2021, J Am Coll Cardiol (PMID:34015478 DOI:10.1016/j.jacc.2021.04.079)
8. Design and baseline characteristics of the Finerenone, in addition to standard of care, on the progression of kidney disease in patients with Non-Diabetic Chronic Kidney Disease (FIND-CKD) randomized trial. — 2025, Nephrol Dial Transplant (PMID:38858818 DOI:10.1093/ndt/gfae132)
9. Finerenone in Patients With Chronic Kidney Disease and Type 2 Diabetes According to Baseline HbA1c and Insulin Use: An Analysis From the FIDELIO-DKD Study. — 2022, Diabetes Care (PMID:35061867 DOI:10.2337/dc21-1944)
10. COmbinatioN effect of FInerenone anD EmpaglifloziN in participants with chronic kidney disease and type 2 diabetes using a UACR Endpoint (CONFIDENCE) trial: baseline clinical characteristics. — 2025, Nephrol Dial Transplant (PMID:39916475 DOI:10.1093/ndt/gfaf022)

---

## Query: `neph-iga-nephropathy-recency` — "newest treatments for IgA nephropathy 2024 2025"
Category: recency. Intent: Recent IgA nephropathy therapeutics (sparsentan, targeted-release budesonide, APRIL/BAFF inhibitors). Newer is better.
_Recency-sensitive: newer high-quality evidence is better._

### Engine A — top 10
1. Treatment of Patients with IgA Nephropathy: A call for a new paradigm. — 2025, Kidney International (PMID:39894081 DOI:10.1016/j.kint.2025.01.014)
2. Novel Treatment Paradigms: Primary IgA Nephropathy — 2023, Kidney International Reports (PMID:38344739 DOI:10.1016/j.ekir.2023.11.026)
3. IgA nephropathy: a paradigm shift in treatment strategies. — 2025, Current opinion in nephrology and hypertension (PMID:40693412 DOI:10.1097/MNH.0000000000001105)
4. Primary IgA Nephropathy: New Insights and Emerging Therapies. — 2024, Advances in kidney disease and health (PMID:39004458 DOI:10.1053/j.akdh.2024.04.002)
5. Emerging Therapies in IgA Nephropathy: From A Proliferation-Inducing Ligand (APRIL) and B-cell Activating Factor (BAFF) Inhibitors to Precision Medicine — 2025, Cureus (PMID:41573494 DOI:10.7759/cureus.99870)
6. Therapy of IgA nephropathy: time for a paradigm change — 2024, Frontiers in Medicine (PMID:39211339 DOI:10.3389/fmed.2024.1461879)
7. The Rapidly Changing Treatment Landscape of IgA Nephropathy. — 2025, Seminars in Nephrology (PMID:40057426 DOI:10.1016/j.semnephrol.2025.151573)
8. New therapies for immunoglobulin A nephropathy: what's the standard of care in 2023? — 2024, Current opinion in nephrology and hypertension (PMID:38411173 DOI:10.1097/MNH.0000000000000979)
9. IgA nephropathy new therapies: from data in adults to application in children. — 2025, Pediatric nephrology (Berlin, West) (PMID:41266601 DOI:10.1007/s00467-025-07004-9)
10. Advances in the treatment of IgA nephropathy — 2026, Renal Disease and Transplantation Forum (DOI:10.5603/rdatf.110964)

### Engine B — top 10
1. Reshaping the therapeutic landscape of IgA nephropathy: a Bayesian network meta-analysis on the comparative efficacy and safety of immunosuppressants and targeted agents. — 2026, BMC Nephrol (PMID:42032511 DOI:10.1186/s12882-026-04996-w)
2. Efficacy and safety of Nefecon in IgA nephropathy: real world clinical practice. — 2026, Front Immunol (PMID:41727461 DOI:10.3389/fimmu.2026.1761804)
3. Efficacy and safety of complement inhibitors in IgAN: a systematic review and meta-analysis. — 2026, Int Urol Nephrol (PMID:40716009 DOI:10.1007/s11255-025-04693-x)
4. Canadian Society of Nephrology Commentary on the Evolving Kidney Disease Improving Global Outcomes Adult Glomerulonephritis Guidelines. — 2026, Can J Kidney Health Dis (PMID:41675526 DOI:10.1177/20543581251409874)
5. Early Experience With Iptacopan for Recurrent IgA Nephropathy After Kidney Transplantation. — 2026, Kidney Med (PMID:41608295 DOI:10.1016/j.xkme.2025.101189)
6. Advances in Novel Biologics Targeting BAFF/APRIL in the Treatment of IgA Nephropathy. — 2026, Cells (PMID:41677607 DOI:10.3390/cells15030240)
7. Prognosis and predictive factors in pediatric IgA nephropathy. — 2026, Pediatr Nephrol (PMID:41225194 DOI:10.1007/s00467-025-06988-8)
8. Efficacy and safety of steroids glucocorticoids compared with supportive therapy for IgA nephropathy: a systematic review and meta-analysis. — 2025, BMC Nephrol (PMID:41382053 DOI:10.1186/s12882-025-04688-x)
9. Telitacicept targets Gd-IgA1 and autoantibody-producing B cells in IgA nephropathy. — 2026, Nephrol Dial Transplant (PMID:41524180 DOI:10.1093/ndt/gfag001)
10. Role of hydroxychloroquine in primary glomerular disease - a systematic review and meta-analysis of the current evidence. — 2025, BMC Nephrol (PMID:40759913 DOI:10.1186/s12882-025-04370-2)

---

## Query: `neph-ckd-anemia-broad` — "management of anemia in chronic kidney disease ESAs and HIF inhibitors"
Category: broad_clinical. Intent: Overview of anemia management in CKD; expect KDIGO guidance, ESA/HIF-PHI RCTs + SRs.

### Engine A — top 10
1. Hypoxia-Inducible Factor Prolyl Hydroxylase Inhibitors: A Potential New Treatment for Anemia in Patients With CKD. — 2017, American Journal of Kidney Diseases (PMID:28242135 DOI:10.1053/j.ajkd.2016.12.011)
2. Treatment of Anemia Associated with Chronic Kidney Disease: Plea for Considering Physiological Erythropoiesis — 2024, International Journal of Molecular Sciences (PMID:39000429 DOI:10.3390/ijms25137322)
3. Hypoxia-inducible factor prolyl hydroxylase inhibitors for anaemia in chronic kidney disease: a clinical practice document by the European Renal Best Practice board of the European Renal Association — 2024, Nephrology, Dialysis and Transplantation (PMID:38573822 DOI:10.1093/ndt/gfae075)
4. Strategies for Managing Anemia in Chronic Kidney Disease — 2024, Journal of Drug Delivery and Therapeutics (DOI:10.22270/jddt.v14i4.6501)
5. Hypoxia-inducible factor prolyl hydroxylase inhibitors: a paradigm shift for treatment of anemia in chronic kidney disease? — 2020, Expert Opinion on Investigational Drugs (PMID:32476498 DOI:10.1080/13543784.2020.1777276)
6. Hypoxia-Inducible Factor Stabilizers in End Stage Kidney Disease: “Can the Promise Be Kept?” — 2021, International Journal of Molecular Sciences (PMID:34830468 DOI:10.3390/ijms222212590)
7. HIF-PHIs for Anemia Management in CKD: Potential and Uncertainty ASCEND. — 2022, American Society of Nephrology. Clinical Journal (PMID:35790236 DOI:10.2215/CJN.02440222)
8. Targeting Hypoxia-Inducible Factors for the Treatment of Anemia in Chronic Kidney Disease Patients — 2017, American Journal of Nephrology (PMID:28118622 DOI:10.1159/000455166)
9. Evolving Strategies in the Treatment of Anaemia in Chronic Kidney Disease: The HIF-Prolyl Hydroxylase Inhibitors — 2022, Drugs (PMID:36350500 DOI:10.1007/s40265-022-01783-3)
10. Managing Anemia across the Stages of Kidney Disease in Those Hyporesponsive to Erythropoiesis-Stimulating Agents — 2021, American Journal of Nephrology (PMID:34280923 DOI:10.1159/000516901)

### Engine B — top 10
1. KDIGO 2026 clinical practice guideline for Anemia in Chronic Kidney Disease (CKD): a commentary from the European Renal Best Practice (ERBP). — 2026, Nephrol Dial Transplant (PMID:41604211 DOI:10.1093/ndt/gfag014)
2. Erythropoiesis-Stimulating Agents (ESAs) in Chronic Kidney Disease and Cancer-Related Anemia: A Narrative Review of Literature. — 2025, Cureus (PMID:41179057 DOI:10.7759/cureus.93584)
3. Hypoxia-Inducible Factor Prolyl Hydroxylase Inhibitors: A&#xa0;Potential New Treatment for Anemia in Patients With CKD. — 2017, Am J Kidney Dis (PMID:28242135 DOI:10.1053/j.ajkd.2016.12.011)
4. Real-world use of HIF-PH inhibitors in the Japan dialysis and practice patterns study (J-DOPPS, 2019-2022). — 2026, BMC Nephrol (PMID:41714979 DOI:10.1186/s12882-026-04831-2)
5. Anaemia in CKD-treatment standard. — 2024, Nephrol Dial Transplant (PMID:38012124 DOI:10.1093/ndt/gfad250)
6. Future perspectives of anemia management in chronic kidney disease using hypoxia-inducible factor-prolyl hydroxylase inhibitors. — 2022, Pharmacol Ther (PMID:36031160 DOI:10.1016/j.pharmthera.2022.108272)
7. Hypertension Induced by Hypoxia-Inducible Factor Prolyl Hydroxylase Inhibitors in Treating Anemia in Patients With Chronic Kidney Disease: A Mini-Review. — 2024, J Clin Hypertens (Greenwich) (PMID:39494784 DOI:10.1111/jch.14924)
8. Safety and Efficacy of Hypoxia-Inducible Factor-Prolyl Hydroxylase Inhibitors vs. Erythropoietin-Stimulating Agents in Treating Anemia in Renal Patients (With or Without Dialysis): A Meta-Analysis and Systematic Review. — 2023, Cureus (PMID:38021836 DOI:10.7759/cureus.47430)
9. Efficacy of Hypoxia-Inducible Factor Prolyl-Hydroxylase Inhibitors in Renal Anemia: Enhancing Erythropoiesis and Long-Term Outcomes in Patients with Chronic Kidney Disease. — 2024, Biomedicines (PMID:39767832 DOI:10.3390/biomedicines12122926)
10. Cardiovascular safety of current and emerging drugs to treat anaemia in chronic kidney disease: a safety review. — 2023, Expert Opin Drug Saf (PMID:38111209 DOI:10.1080/14740338.2023.2285889)

---

## Query: `family-partner-trials` — "PARTNER trials transcatheter aortic valve replacement"
Category: trial_family. Intent: Resolve the PARTNER program to its landmark TAVR RCTs (PARTNER 1/2/3).

**Must-have landmark papers (ground truth):**
- PARTNER 3 low-risk (Mack/Leon, NEJM 2019)

### Engine A — top 10
1. Transcatheter Aortic-Valve Replacement in Low-Risk Patients at Five Years. — 2023, N Engl J Med (PMID:37874020 DOI:10.1056/NEJMoa2307447)
2. Transcatheter Aortic-Valve Replacement with a Balloon-Expandable Valve in Low-Risk Patients. — 2019, N Engl J Med (PMID:30883058 DOI:10.1056/NEJMoa1814052)
3. Aortic Valve Replacement in Women: A Pooled Analysis of the RHEIA and PARTNER 3 Trials. — 2025, JACC Cardiovasc Interv (PMID:40562469 DOI:10.1016/j.jcin.2025.03.036)
4. Transcatheter or Surgical Aortic-Valve Replacement in Low-Risk Patients at 7 Years. — 2026, N Engl J Med (PMID:41144631 DOI:10.1056/NEJMoa2509766)
5. Transcatheter or Surgical Aortic-Valve Replacement in Intermediate-Risk Patients. — 2016, N Engl J Med (PMID:27040324 DOI:10.1056/NEJMoa1514616)
6. Transcatheter vs Surgical Aortic Valve Replacement in Lower-Risk Patients: An Updated Meta-Analysis of Randomized Controlled Trials. — 2025, J Am Coll Cardiol (PMID:40044297 DOI:10.1016/j.jacc.2024.12.031)
7. Five-Year Outcomes of Transcatheter or Surgical Aortic-Valve Replacement. — 2020, N Engl J Med (PMID:31995682 DOI:10.1056/NEJMoa1910555)
8. 5-year outcomes of transcatheter aortic valve replacement or surgical aortic valve replacement for high surgical risk patients with aortic stenosis (PARTNER 1): a randomised controlled trial. — 2015, Lancet (PMID:25788234 DOI:10.1016/S0140-6736(15)60308-7)
9. Economic Outcomes of Transcatheter Versus Surgical Aortic Valve Replacement in Patients with Severe Aortic Stenosis and Low Surgical Risk: Results from the PARTNER 3 Trial. — 2023, Circulation (PMID:37154049 DOI:10.1161/CIRCULATIONAHA.122.062481)
10. 5-Year Echocardiographic Results of Transcatheter Versus Surgical Aortic Valve Replacement in Low-Risk Patients. — 2025, JACC Cardiovasc Imaging (PMID:40243974 DOI:10.1016/j.jcmg.2025.01.015)

### Engine B — top 10
1. A comprehensive review of the PARTNER trial. — 2013, Journal of Thoracic and Cardiovascular Surgery (PMID:23410766 DOI:10.1016/j.jtcvs.2012.11.051)
2. A Review of the Partner Trials. — 2020, Interventional Cardiology Clinics (PMID:32921370 DOI:10.1016/j.iccl.2020.07.002)
3. Two-year outcomes after transcatheter or surgical aortic-valve replacement. — 2012, New England Journal of Medicine (PMID:22443479 DOI:10.1056/NEJMoa1200384)
4. Implications of contemporary clinical trials series: the Placement of Aortic Transcatheter Valve trial (PARTNER). — 2012, Circulation (PMID:22916357 DOI:10.1161/CIRCULATIONAHA.112.121251)
5. The PARTNER trial after 1 year. — 2011, European Heart Journal (PMID:21998843)
6. Transcatheter aortic valve implantation: lessons from the PARTNER (Placement of Aortic Transcatheter Valves) trial. — 2011, JACC: Cardiovascular Interventions (PMID:21251642 DOI:10.1016/j.jcin.2010.12.002)
7. Outcomes after transfemoral transcatheter aortic valve replacement. — 2014, JACC: Cardiovascular Interventions (PMID:25459037 DOI:10.1016/j.jcin.2014.06.012)
8. Transcatheter Aortic Valve Replacement: Comprehensive Review and Present Status. — 2017, Texas Heart Institute Journal (PMID:28265210 DOI:10.14503/THIJ-16-5852)
9. Transcatheter Aortic Valve Replacement: Outcomes, Indications, Complications, and Innovations — 2017, Current Treatment Options in Cardiovascular Medicine (PMID:28936594 DOI:10.1007/s11936-017-0580-0)
10. Outcomes of Transcatheter Aortic Valve Replacement in Patients with Severe Aortic Stenosis: A Review of a Disruptive Technology in Aortic Valve Surgery. — 2019, JAMA Surgery (PMID:31774480 DOI:10.1001/jamasurg.2019.4449)

---

## Query: `family-emperor-sglt2-hf` — "EMPEROR empagliflozin heart failure outcome trials"
Category: trial_family. Intent: Resolve the EMPEROR program to its landmark empagliflozin HF RCTs (EMPEROR-Reduced/Preserved).

**Must-have landmark papers (ground truth):**
- EMPEROR-Reduced (Packer, NEJM 2020)

### Engine A — top 10
1. SGLT2 inhibitors in patients with heart failure with reduced ejection fraction: a meta-analysis of the EMPEROR-Reduced and DAPA-HF trials. — 2020, Lancet (PMID:32877652 DOI:10.1016/S0140-6736(20)31824-9)
2. Empagliflozin in Heart Failure with a Preserved Ejection Fraction. — 2021, N Engl J Med (PMID:34449189 DOI:10.1056/NEJMoa2107038)
3. Cardiovascular and Renal Outcomes with Empagliflozin in Heart Failure. — 2020, N Engl J Med (PMID:32865377 DOI:10.1056/NEJMoa2022190)
4. Empagliflozin in Heart Failure and Previous Coronary Revascularization: Insights From EMPEROR-Pooled. — 2026, JACC Adv (PMID:41609275 DOI:10.1016/j.jacadv.2025.102419)
5. Effect of Empagliflozin on the Clinical Stability of Patients With Heart Failure and a Reduced Ejection Fraction: The EMPEROR-Reduced Trial. — 2021, Circulation (PMID:33081531 DOI:10.1161/CIRCULATIONAHA.120.051783)
6. Empagliflozin in Patients With Heart&#xa0;Failure, Reduced Ejection Fraction, and Volume Overload: EMPEROR-Reduced Trial. — 2021, J Am Coll Cardiol (PMID:33736819 DOI:10.1016/j.jacc.2021.01.033)
7. Empagliflozin for Heart Failure With Preserved Left Ventricular Ejection Fraction With and Without Diabetes. — 2022, Circulation (PMID:35762322 DOI:10.1161/CIRCULATIONAHA.122.059785)
8. Empagliflozin in resistant hypertension and heart failure with preserved ejection fraction: the EMPEROR-Preserved trial. — 2025, Eur Heart J (PMID:40037646 DOI:10.1093/eurheartj/ehae938)
9. Uric Acid and SGLT2 Inhibition With Empagliflozin in Heart&#xa0;Failure With Preserved Ejection Fraction: The EMPEROR-Preserved Trial. — 2024, JACC Heart Fail (PMID:39453357 DOI:10.1016/j.jchf.2024.08.020)
10. Empagliflozin in heart failure with preserved ejection fraction with and without atrial fibrillation. — 2023, Eur J Heart Fail (PMID:37062866 DOI:10.1002/ejhf.2861)

### Engine B — top 10
1. Empagliflozin in Heart Failure with a Preserved Ejection Fraction. — 2021, New England Journal of Medicine (PMID:34449189 DOI:10.1056/NEJMoa2107038)
2. Design and rationale of the EMPEROR trials of, empagliflozin 10 mg once daily, in patients with chronic heart failure with reduced ejection fraction (EMPEROR-Reduced) or preserved ejection fraction (EMPEROR-Preserved) — 2019, Diabetologie und Stoffwechsel (DOI:10.1055/S-0039-1688298)
3. Are SGLT-2 Inhibitors the Future of Heart Failure Treatment? The EMPEROR-Preserved and EMPEROR-Reduced Trials — 2020, Diabetes Therapy (PMID:32710261 DOI:10.1007/s13300-020-00889-9)
4. Rationale and design of the EMPERIAL‐Preserved and EMPERIAL‐Reduced trials of empagliflozin in patients with chronic heart failure — 2019, European Journal of Heart Failure (PMID:31218819 DOI:10.1002/ejhf.1486)
5. Effect of Empagliflozin on Heart Failure–Related Events in Symptomatic Patients — 2021, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA54024)
6. EMPEROR-Reduced: Empagliflozin and Outcomes in Heart Failure and CKD — 2020, Journal of the American Society of Nephrology (DOI:10.1681/asn.20203110s1b1b)
7. Evaluation of the effect of sodium–glucose co‐transporter 2 inhibition with empagliflozin on morbidity and mortality of patients with chronic heart failure and a reduced ejection fraction: rationale for and design of the EMPEROR‐Reduced trial — 2019, European Journal of Heart Failure (PMID:31584231 DOI:10.1002/ejhf.1536)
8. Empagliflozin and Major Renal Outcomes in Heart Failure. — 2021, New England Journal of Medicine (PMID:34449179 DOI:10.1056/NEJMc2112411)
9. Design of the Effect of EMPaglifozin on ExeRcise ability and HF-symptoms, In patients with chronic heArt faiLure (EMPERIAL) trials of empagliflozin in patients with chronic heart failure with reduced or preserved ejection fraction — 2019, Diabetologie und Stoffwechsel (DOI:10.1055/s-0039-1688299)
10. EMPEROR‐Reduced: confirming sodium–glucose co‐transporter 2 inhibitors as an essential treatment for patients with heart failure with reduced ejection fraction — 2020, European Journal of Heart Failure (PMID:32946169 DOI:10.1002/ejhf.2006)

---

## Query: `exact-plato-ticagrelor` — "Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes"
Category: exact_paper. Intent: Retrieve the PLATO primary results paper by its exact title.

**Must-have landmark papers (ground truth):**
- PLATO (Wallentin, NEJM 2009)

### Engine A — top 10
1. Ticagrelor Compared to Clopidogrel in Acute Coronary Syndromes trial (TC4): a Bayesian pragmatic cluster randomized controlled trial. — 2025, CMAJ (PMID:40164463 DOI:10.1503/cmaj.241862)
2. Safety and Efficacy of Ticagrelor versus Clopidogrel in East Asian Patients with Acute Coronary Syndrome Undergoing Percutaneous Coronary Intervention Treated with Dual Antiplatelet Therapy: A Meta-Analysis of Randomized Controlled Trials. — 2023, Cardiology (PMID:37094558 DOI:10.1159/000530602)
3. Ticagrelor versus clopidogrel in East-Asian patients with acute coronary syndromes: a meta-analysis of randomized trials. — 2018, J Comp Eff Res (PMID:29094604 DOI:10.2217/cer-2017-0074)
4. Clopidogrel versus ticagrelor or prasugrel in patients aged 70 years or older with non-ST-elevation acute coronary syndrome (POPular AGE): the randomised, open-label, non-inferiority trial. — 2020, Lancet (PMID:32334703 DOI:10.1016/S0140-6736(20)30325-1)
5. Did Prasugrel and Ticagrelor Offer the Same Benefit in Patients with Acute Coronary Syndromes after Percutaneous Coronary Interventions Compared to Clopidogrel? Insights from Randomized Clinical Trials, Registries and Meta-analysis. — 2018, Curr Pharm Des (PMID:29308737 DOI:10.2174/1381612824666180108121834)
6. Ticagrelor in patients with heart failure after acute coronary syndromes-Insights from the PLATelet inhibition and patient Outcomes (PLATO) trial. — 2019, Am Heart J (PMID:31108273 DOI:10.1016/j.ahj.2019.04.006)
7. Ticagrelor versus clopidogrel in East Asian patients with acute coronary syndrome: Systematic review and meta-analysis. — 2018, Cardiovasc Revasc Med (PMID:29452843 DOI:10.1016/j.carrev.2018.01.009)
8. Comparison of Ticagrelor With Clopidogrel in East Asian Patients With Acute Coronary Syndrome: A Systematic Review and Meta-Analysis of Randomized Clinical Trials. — 2022, J Cardiovasc Pharmacol (PMID:35091511 DOI:10.1097/FJC.0000000000001225)
9. De-escalation from Prasugrel or Ticagrelor to Clopidogrel in Patients with Acute Coronary Syndrome Managed with Percutaneous Coronary Intervention: An Updated Meta-analysis of Randomized Clinical Trials. — 2022, Am J Cardiovasc Drugs (PMID:34651261 DOI:10.1007/s40256-021-00504-7)
10. Comparison of major bleeding in patients with acute coronary syndrome that underwent coronary artery bypass grafting treated with clopidogrel or ticagrelor: a systematic review and meta-analysis. — 2020, F1000Res (PMID:33732438 DOI:10.12688/f1000research.21925.2)

### Engine B — top 10
1. Ticagrelor versus clopidogrel in patients with acute coronary syndromes. — 2009, New England Journal of Medicine (PMID:19717846 DOI:10.1056/NEJMoa0904327)
2. TICAGRELOR VERSUS CLOPIDOGREL IN PATIENTS WITH NON-ST-ELEVATION ACUTE CORONARY SYNDROME: RESULTS FROM THE PLATO TRIAL — 2013, Journal of the American College of Cardiology (DOI:10.1016/S0735-1097(13)60002-9)
3. Comparison of ticagrelor with clopidogrel in patients with a planned invasive strategy for acute coronary syndromes (PLATO): a randomised double-blind study. — 2010, The Lancet (PMID:20079528 DOI:10.1016/S0140-6736(09)62191-7)
4. Ticagrelor was more effective than clopidogrel in acute coronary syndromes with planned invasive treatment — 2010, Annals of Internal Medicine (PMID:https://pubmed.ncbi.nlm.nih.gov/20479021 DOI:10.7326/0003-4819-152-10-201005180-02004)
5. Clopidogrel, prasugrel or ticagrelor in patients with acute coronary syndromes undergoing percutaneous coronary intervention — 2016, Internal medicine journal (Print) (PMID:26909472 DOI:10.1111/imj.13041)
6. Ticagrelor versus clopidogrel in patients with acute coronary syndrome undergoing complex percutaneous coronary intervention — 2022, Catheterization and cardiovascular interventions (PMID:35032148 DOI:10.1002/ccd.30077)
7. Ticagrelor was more effective than clopidogrel, with no increase in major bleeding in acute coronary syndromes — 2009, Annals of Internal Medicine (PMID:https://pubmed.ncbi.nlm.nih.gov/20008753 DOI:10.7326/0003-4819-151-12-200912150-02004)
8. Ticagrelor vs Clopidogrel for Patients With Acute Coronary Syndrome Undergoing Percutaneous Intervention. — 2021, Journal of the American Medical Association (JAMA) (PMID:33651086 DOI:10.1001/jama.2020.26020)
9. Review Article Ticagrelor Versus Clopidogrel in Acute Coronary Syndromes — 2012, ? (— no id —)
10. Ticagrelor Bests Clopidogrel for Invasively Treated Acute Coronary Syndromes — 2010, NEJM Journal Watch (DOI:10.1056/JC201002170000001)

---

## Query: `sr-doac-vs-warfarin-metaanalysis` — "meta-analysis of DOACs versus warfarin for atrial fibrillation efficacy and bleeding"
Category: systematic_review. Intent: Pooled DOAC-vs-warfarin efficacy/safety; high-quality meta-analyses should dominate.

### Engine A — top 10
1. Meta-Analysis of Safety and Efficacy of Direct Oral Anticoagulants Versus Warfarin According to Time in Therapeutic Range in Atrial Fibrillation. — 2020, American Journal of Cardiology (PMID:33189659 DOI:10.1016/j.amjcard.2020.10.064)
2. Bleeding Risk in Nonvalvular Atrial Fibrillation Patients Receiving Direct Oral Anticoagulants and Warfarin: A Systematic Review and Meta-Analysis of Observational Studies — 2020, TH Open (PMID:32676543 DOI:10.1055/s-0040-1714918)
3. Meta-Analysis of Direct-Acting Oral Anticoagulants Compared With Warfarin in Patients >75 Years of Age. — 2019, American Journal of Cardiology (PMID:30982541 DOI:10.1016/J.AMJCARD.2019.02.060)
4. Safety of the direct-acting anticoagulants in patients with atrial fibrillation: a meta-analysis. — 2015, Thrombosis Research (PMID:25891842 DOI:10.1016/j.thromres.2015.04.004)
5. Efficacy and Safety of Direct Oral Anticoagulants (DOACs) Versus Warfarin in Atrial Fibrillation Patients with Prior Stroke: a Systematic Review and Meta-analysis — 2022, Cardiovascular Drugs and Therapy (PMID:35467313 DOI:10.1007/s10557-022-07336-w)
6. Comparison of the Direct Oral Anticoagulants and Warfarin in Patients With Atrial Fibrillation and Valvular Heart Disease: Updated Systematic Review and Meta-Analysis of Randomized Controlled Trials — 2021, Frontiers in Cardiovascular Medicine (PMID:34631818 DOI:10.3389/fcvm.2021.712585)
7. Real-world Comparisons of Direct Oral Anticoagulants for Stroke Prevention in Asian Patients with Non-valvular Atrial Fibrillation: a Systematic Review and Meta-analysis — 2019, Cardiovascular Drugs and Therapy (PMID:31745687 DOI:10.1007/s10557-019-06910-z)
8. Meta-analysis of Efficacy and Safety of the New Anticoagulants Versus Warfarin in Patients With Atrial Fibrillation — 2014, Journal of Cardiovascular Pharmacology (PMID:24869601 DOI:10.1097/FJC.0000000000000129)
9. Direct Acting Oral Anticoagulant vs. Warfarin in the Prevention of Thromboembolism in Patients With Non-valvular Atrial Fibrillation With Valvular Heart Disease—A Systematic Review and Meta-Analysis — 2021, Frontiers in Cardiovascular Medicine (PMID:35096994 DOI:10.3389/fcvm.2021.764356)
10. Comparison of Oral Anticoagulants vs. Warfarin for Stroke Prevention in Atrial Fibrillation: A Meta-Analysis — 2024, Journal of Health and Rehabilitation Research (DOI:10.61919/jhrr.v4i3.1606)

### Engine B — top 10
1. Oral anticoagulants for prevention of stroke in atrial fibrillation: systematic review, network meta-analysis, and cost effectiveness analysis. — 2017, BMJ (PMID:29183961 DOI:10.1136/bmj.j5058)
2. Oral Anticoagulant Agents in Patients With Atrial Fibrillation and CKD: A Systematic Review and Pairwise Network Meta-analysis. — 2021, Am J Kidney Dis (PMID:33872690 DOI:10.1053/j.ajkd.2021.02.328)
3. Comparison of Efficacy and Safety of Direct Oral Anticoagulants and Warfarin between Patients in Asian and Non-Asian Regions: A Systematic Review and Meta-Regression Analysis. — 2023, Clin Pharmacol Ther (PMID:36861312 DOI:10.1002/cpt.2881)
4. Periprocedural Outcomes of Direct Oral Anticoagulants Versus Warfarin in Nonvalvular Atrial Fibrillation. — 2018, Circulation (PMID:29794081 DOI:10.1161/CIRCULATIONAHA.117.031457)
5. Direct Oral Anticoagulants Versus Warfarin in Patients With Atrial Fibrillation: Patient-Level Network Meta-Analyses of Randomized Clinical Trials With Interaction Testing by Age and Sex. — 2022, Circulation (PMID:34985309 DOI:10.1161/CIRCULATIONAHA.121.056355)
6. Efficacy and Safety of Direct Oral Anticoagulants (DOACs) Versus Warfarin in Atrial Fibrillation Patients with Prior Stroke: a Systematic Review and Meta-analysis. — 2023, Cardiovasc Drugs Ther (PMID:35467313 DOI:10.1007/s10557-022-07336-w)
7. Meta-Analysis of Direct-Acting Oral Anticoagulants Compared With Warfarin in Patients &gt;75 Years of Age. — 2019, Am J Cardiol (PMID:30982541 DOI:10.1016/j.amjcard.2019.02.060)
8. Efficacy and safety of anticoagulation for atrial fibrillation in patients with cirrhosis: A systematic review and meta-analysis. — 2019, Dig Liver Dis (PMID:30594462 DOI:10.1016/j.dld.2018.12.001)
9. Systematic Review and Meta-Analysis of Direct Oral Anticoagulants Versus Warfarin in Atrial Fibrillation With Low Stroke Risk. — 2023, Am J Cardiol (PMID:37573616 DOI:10.1016/j.amjcard.2023.07.108)
10. Meta-analysis of safety and efficacy for direct oral anticoagulation treatment of non-valvular atrial fibrillation in relation to renal function. — 2017, Thromb Res (PMID:29096154 DOI:10.1016/j.thromres.2017.10.013)

---

## Query: `sr-pci-vs-cabg-metaanalysis` — "systematic review PCI versus CABG multivessel coronary disease mortality"
Category: systematic_review. Intent: Pooled revascularization comparison; expect patient-level meta-analyses near the top.

### Engine A — top 10
1. Coronary artery bypass grafting vs percutaneous coronary intervention and long-term mortality and morbidity in multivessel disease: meta-analysis of randomized clinical trials of the arterial grafting and stenting era. — 2014, JAMA Internal Medicine (PMID:24296767 DOI:10.1001/jamainternmed.2013.12844)
2. Coronary artery bypass grafting (CABG) vs. percutaneous coronary intervention (PCI) in the treatment of multivessel coronary disease: quo vadis? -a review of the evidences on coronary artery disease. — 2018, Annals of Cardiothoracic Surgery (PMID:30094215 DOI:10.21037/acs.2018.05.17)
3. Percutaneous Coronary Intervention (Pci) Versus Coronary Artery Bypass Grafting (Cabg) in Multivessel Disease — 2026, Archives of Clinical and Biomedical Research (DOI:10.26502/acbr.50170509)
4. Long-term outcomes comparison between surgical and percutaneous coronary revascularization in patients with multivessel coronary disease or left main disease. A systematic review and study level meta-analysis of randomized trials. — 2023, Current problems in cardiology (PMID:36921648 DOI:10.1016/j.cpcardiol.2023.101699)
5. Comparing the Long-term Outcomes of Coronary Artery Bypass Grafting (CABG) vs. Percutaneous Coronary Intervention (PCI) in Patients with Multivessel Disease- A Systematic Review and Meta-Analysis. — 2026, Current Cardiology Reviews (PMID:41833019 DOI:10.2174/011573403x402044251204104520)
6. Long-Term Mortality of 306,868 Patients with Multi-Vessel Coronary Artery Disease: CABG versus PCI — 2013, British Journal of Medicine and Medical Research (PMID:24611133 DOI:10.9734/bjmmr/2013/3380)
7. Comparison of Percutaneous Coronary Intervention with Drug Eluting Stents Versus Coronary Artery Bypass Grafting in Patients With Multivessel Coronary Artery Disease: Meta-Analysis of Six Randomized Controlled Trials — 2015, Cardiovascular Revascularization Medicine (PMID:25662779 DOI:10.1016/j.carrev.2015.01.002)
8. Meta-analysis of 5-year outcomes of CABG vs PCI with stenting in patients with multivessel disease. — 2008, Minerva Cardioangiologica : a Journal on Cardiovascular Pathophysiology, Clinical Medicine and Therapy (PMID:18813180)
9. Review: In CAD, CABG reduced 5-year mortality more than PCI in multivessel but not left main disease — 2018, Annals of Internal Medicine (PMID:29913491 DOI:10.7326/ACPJC-2018-168-12-066)
10. Revascularization for Multivessel Disease: CABG or PCI? — 2008, NEJM Journal Watch (DOI:10.1056/JW200802050000002)

### Engine B — top 10
1. Mortality after coronary artery bypass grafting versus percutaneous coronary intervention with stenting for coronary artery disease: a pooled analysis of individual patient data. — 2018, Lancet (PMID:29478841 DOI:10.1016/S0140-6736(18)30423-9)
2. Minimally Invasive CABG or Hybrid Coronary Revascularization for Multivessel Coronary Diseases: Which Is Best? A Systematic Review and Metaanalysis. — 2019, Heart Surg Forum (PMID:31895036 DOI:10.1532/hsf.2499)
3. Coronary revascularization in diabetic patients: a systematic review and Bayesian network meta-analysis. — 2014, Ann Intern Med (PMID:25402514 DOI:10.7326/M14-0808)
4. Has the difference in mortality between percutaneous coronary intervention and coronary artery bypass grafting in people with heart disease and diabetes changed over the years? A systematic review and meta-regression. — 2015, BMJ Open (PMID:26719324 DOI:10.1136/bmjopen-2015-010055)
5. Coronary artery bypass graft surgery vs percutaneous interventions in coronary revascularization: a systematic review. — 2013, JAMA (PMID:24240936 DOI:10.1001/jama.2013.281718)
6. Effectiveness of percutaneous coronary intervention with drug-eluting stents compared with bypass surgery in diabetics with multivessel coronary disease: comprehensive systematic review and meta-analysis of randomized clinical data. — 2013, J Am Heart Assoc (PMID:23926119 DOI:10.1161/JAHA.113.000354)
7. Comparing the Long-term Outcomes of Coronary Artery Bypass Grafting (CABG) vs. Percutaneous Coronary Intervention (PCI) in Patients with Multivessel Disease- A Systematic Review and Meta-Analysis. — 2026, Curr Cardiol Rev (PMID:41833019 DOI:10.2174/011573403X402044251204104520)
8. Robot-assisted Hybrid Coronary Revascularisation: Systematic Review. — 2015, Heart Lung Circ (PMID:26235991 DOI:10.1016/j.hlc.2015.06.818)
9. Hybrid revascularization vs. coronary bypass for coronary artery disease: a systematic review and meta-analysis. — 2022, J Cardiovasc Surg (Torino) (PMID:35343660 DOI:10.23736/S0021-9509.22.12163-4)
10. Percutaneous Coronary Intervention Versus Coronary Artery Bypass Grafting in Non-ST-Elevation Coronary Syndromes and Multivessel Disease: A Systematic Review and Meta-Analysis. — 2023, Am J Cardiol (PMID:37011556 DOI:10.1016/j.amjcard.2023.03.005)

---

## Query: `guideline-esc-heart-failure` — "ESC guidelines for the diagnosis and treatment of acute and chronic heart failure"
Category: guideline. Intent: ESC heart failure guideline should rank top.

### Engine A — top 10
1. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure — 2022, European Journal of Heart Failure (PMID:35083827 DOI:10.1002/ejhf.2333)
2. Guidelines for the diagnosis and treatment of chronic heart failure: executive summary (update 2005): The Task Force for the Diagnosis and Treatment of Chronic Heart Failure of the European Society of Cardiology. — 2005, European Heart Journal (PMID:15901669 DOI:10.1093/EURHEARTJ/EHI204)
3. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure — 2023, Russian Journal of Cardiology (DOI:10.15829/1560-4071-2023-5168)
4. 2016 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure — 2016, Revista Española de Cardiología (PMID:27894487 DOI:10.1016/j.rec.2016.11.005)
5. CLINICAL GUIDELINES FOR THE DIAGNOSIS AND TREATMENT OF CHRONIC AND ACUTE HEART FAILURE — 2014, Eurasian heart journal (DOI:10.38109/2225-1685-2014-2-4-37)
6. ESC GUIDELINES FOR THE DIAGNOSIS AND TREATMENT OF ACUTE AND CHRONIC HEART FAILURE 2008 (ENDING) — 2009, Racionalʹnaâ Farmakoterapiâ v Kardiologii (DOI:10.20996/1819-6446-2009-5-4-93-118)
7. 2021 ESC Guidelines for the Diagnosis and Treatment of Acute and 
Chronic Heart Failure — 2021, EMJ Cardiology (DOI:10.33590/emjcardiol/21f1011)
8. 2023 Focused Update of the 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. — 2023, European Heart Journal (PMID:37622666 DOI:10.1093/eurheartj/ehad195)
9. 2023 Focused Update of the 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure — 2024, European Journal of Heart Failure (PMID:38169072 DOI:10.1002/ejhf.3024)
10. [The new ESC Guidelines for acute and chronic heart failure 2016]. — 2016, Herz (PMID:27858115 DOI:10.1007/S00059-016-4496-3)

### Engine B — top 10
1. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure - PubMed — 0, ? (PMID:34447992)
2. [PDF] 2016 ESC Guidelines for the diagnosis and treatment of acute and ... — 0, ? (— no id —)
3. 2023 Focused Update of ESC Guidelines for Acute and Chronic HF — 0, ? (— no id —)
4. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure: Developed by the Task Force for the diagnosis and treatment of acute and chronic heart failure of the European Society of Cardiology (ESC). With the special contribution of the Heart Failure Association (HFA) of the ESC - PubMed — 0, ? (PMID:35083827)
5. [The new ESC Guidelines for acute and chronic heart failure 2016] - PubMed — 0, ? (PMID:27858115)

---

## Query: `recency-tavr-2025` — "latest 2025 transcatheter aortic valve replacement long-term outcome trials"
Category: recency. Intent: Most recent TAVR long-term/expanded-indication evidence. Newer is better.
_Recency-sensitive: newer high-quality evidence is better._

### Engine A — top 10
1. Long-term Outcomes of Transcatheter Aortic Valve Replacement With the Lotus Valve vs CoreValve/EvolutR — 2022, JAMA Network Open (PMID:36301543 DOI:10.1001/jamanetworkopen.2022.38792)
2. Long‐term outcomes associated with the transaortic approach to transcatheter Aortic valve replacement — 2015, Catheterization and cardiovascular interventions (PMID:25511236 DOI:10.1002/ccd.25785)
3. Five-year Outcomes of Transcatheter Aortic Valve Replacement Versus Surgery in Low-risk Aortic Stenosis: Insights from the Evolut Low Risk Trial. — 2025, Heart International (PMID:41377641 DOI:10.17925/HI.2025.19.2.5)
4. Review of Major Registries and Clinical Trials of Late Outcomes After Transcatheter Aortic Valve Replacement. — 2017, American Journal of Cardiology (PMID:28532778 DOI:10.1016/j.amjcard.2017.04.029)
5. Five-year Outcomes of Aortic Valve Replacement Using a Bioprosthetic Valve with the Novel RESILIA Tissue: Final Study Results — 2019, Structural Heart (DOI:10.1080/24748706.2019.1588539)
6. Transcatheter Aortic Valve Implantation: Long-Term Outcomes and Durability — 2023, Methodist DeBakey Cardiovascular Journal (PMID:37213878 DOI:10.14797/mdcvj.1201)
7. Long-Term Outcomes of Inoperable Patients with Aortic Stenosis Randomized to Transcatheter Aortic Valve Replacement or Standard Therapy — 2014, ? (— no id —)
8. Five-year outcomes of transcatheter versus surgical aortic valve replacement in women: A systematic review and meta-analysis. — 2025, European Journal of Cardio-Thoracic Surgery (PMID:41234051 DOI:10.1093/ejcts/ezaf400)
9. Time-to-event analysis of the long-term outcome in trials comparing transcatheter and surgical aortic valve implantation: A meta-analysis. — 2025, International Journal of Cardiology (PMID:40571128 DOI:10.1016/j.ijcard.2025.133524)
10. Outcomes Beyond 10 Years After Transcatheter Aortic Valve Implantation in High‐Risk Patients With Severe Aortic Valve Stenosis — 2025, Catheterization and cardiovascular interventions (PMID:40509586 DOI:10.1002/ccd.31677)

### Engine B — top 10
1. Comparative outcomes of balloon-expandable and self-expanding valves in Transcatheter aortic valve replacement: A systematic review and Meta-analysis. — 2026, J Cardiol (PMID:42303223 DOI:10.1016/j.jjcc.2026.06.009)
2. Seven-Year Valve Durability With Transcatheter or Surgical Aortic Valve Replacement: An Ad Hoc Analysis of the PARTNER 3 Randomized Clinical Trial. — 2026, JAMA Cardiol (PMID:42340728 DOI:10.1001/jamacardio.2026.2299)
3. Meta-Analysis of Transcatheter Versus Surgical Aortic Valve Replacement in Low Surgical Risk Patients: An Update. — 2026, Am J Cardiol (PMID:42128260 DOI:10.1016/j.amjcard.2026.05.013)
4. Comparative Effectiveness of Balloon-Expandable and Self-Expanding Valves in Small Aortic Annulus Transcatheter Aortic Valve Replacement: An Updated Meta-Analysis of Randomized and Propensity Score Matched Studies. — 2026, Am J Cardiol (PMID:42061669 DOI:10.1016/j.amjcard.2026.04.059)
5. Transcatheter versus surgical aortic valve replacement in low-risk patients with severe aortic stenosis: a systematic review and meta-analysis. — 2026, BMC Cardiovasc Disord (PMID:41714983 DOI:10.1186/s12872-026-05558-6)
6. Sex-Based Patterns and Trends in Transcatheter Aortic Valve Implantation. — 2026, JAMA Cardiol (PMID:42090130 DOI:10.1001/jamacardio.2026.0941)
7. Study protocol for an international prospective non-randomized trial evaluating the long-term outcomes of sutureless aortic valve replacement versus stented aortic valve replacement for aortic-valve stenosis in patients at risk to severe valve obstruction: the SAVI-AVR trial. — 2026, J Cardiothorac Surg (PMID:42015281 DOI:10.1186/s13019-026-04091-z)
8. Routine cerebral embolic protection during TAVR: A meta-analysis and trial sequential evidence from 11,000 randomized patients. — 2026, J Cardiol (PMID:42162864 DOI:10.1016/j.jjcc.2026.05.001)
9. Clinical and cardiopulmonary predictors of functional recovery and complications after transcatheter aortic valve implantation: Protocol of a prospective interventional study. — 2026, PLoS One (PMID:42139369 DOI:10.1371/journal.pone.0348568)
10. Myocardial Fibrosis and Early Intervention in Asymptomatic Patients With Severe Aortic Stenosis: Insights From the EVOLVED Randomized Clinical Trial. — 2026, JAMA Cardiol (PMID:41984459 DOI:10.1001/jamacardio.2026.0654)

---

## Query: `lto-stampede-bariatric-cardiac` — "long-term diabetes remission after bariatric surgery versus medical therapy"
Category: long_term_outcomes. Intent: Durability of glycemic benefit/remission at ≥5yr (STAMPEDE/SOS).

**Must-have landmark papers (ground truth):**
- STAMPEDE 5-year (Schauer, NEJM 2017)

### Engine A — top 10
1. Long-Term Outcomes of Medical Management vs Bariatric Surgery in Type 2 Diabetes. — 2024, Journal of the American Medical Association (JAMA) (PMID:38411644 DOI:10.1001/jama.2024.0318)
2. Long-Term Efficacy of Bariatric Surgery Compared to Modern Medical Therapy in Type 2 Diabetes and Obesity: A Systematic Review — 2025, Cureus (PMID:40918897 DOI:10.7759/cureus.89409)
3. Bariatric-metabolic surgery versus conventional medical treatment in obese patients with type 2 diabetes: 5 year follow-up of an open-label, single-centre, randomised controlled trial. — 2015, The Lancet (PMID:26369473 DOI:10.1016/S0140-6736(15)00075-6)
4. Association of bariatric surgery with long-term remission of type 2 diabetes and with microvascular and macrovascular complications. — 2014, Journal of the American Medical Association (JAMA) (PMID:24915261 DOI:10.1001/jama.2014.5988)
5. Diabetes remission and diabetic complications of bariatric surgery vs. medical management in patients with type 2 diabetes: A meta‐analysis of randomized controlled trials — 2025, Diabetes, obesity and metabolism (PMID:40988570 DOI:10.1111/dom.70152)
6. Bariatric surgery versus conventional medical therapy for type 2 diabetes. — 2012, New England Journal of Medicine (PMID:22449317 DOI:10.1056/NEJMoa1200111)
7. Metabolic surgery versus conventional medical therapy in patients with type 2 diabetes: 10-year follow-up of an open-label, single-centre, randomised controlled trial. — 2021, The Lancet (PMID:33485454 DOI:10.1016/S0140-6736(20)32649-0)
8. The Long-Term Effects of Bariatric Surgery for Type 2 Diabetes: Systematic Review and Meta-analysis of Randomized and Non-randomized Evidence — 2014, Obesity Surgery (PMID:25355456 DOI:10.1007/s11695-014-1460-2)
9. The Long-Term Effects of Bariatric Surgery on Type 2 Diabetes Remission, Microvascular and Macrovascular Complications, and Mortality: a Systematic Review and Meta-Analysis — 2017, Obesity Surgery (PMID:28801703 DOI:10.1007/s11695-017-2866-4)
10. Bariatric Surgery as a Long-Term Treatment for Type 2 Diabetes/Metabolic Syndrome. — 2020, Annual Review of Medicine (PMID:31986081 DOI:10.1146/annurev-med-053117-123246)

### Engine B — top 10
1. Long-Term Outcomes of Medical Management vs Bariatric Surgery in Type 2 Diabetes. — 2024, JAMA (PMID:38411644 DOI:10.1001/jama.2024.0318)
2. Association of metabolic-bariatric surgery with long-term survival in adults with and without diabetes: a one-stage meta-analysis of matched cohort and prospective controlled studies with 174&#x2009;772 participants. — 2021, Lancet (PMID:33965067 DOI:10.1016/S0140-6736(21)00591-2)
3. Metabolic surgery versus conventional medical therapy in patients with type 2 diabetes: 10-year follow-up of an open-label, single-centre, randomised controlled trial. — 2021, Lancet (PMID:33485454 DOI:10.1016/S0140-6736(20)32649-0)
4. The long-term effect of bariatric/metabolic surgery versus pharmacologic therapy in type 2 diabetes mellitus patients: A systematic review and meta-analysis. — 2024, Diabetes Metab Res Rev (PMID:38873748 DOI:10.1002/dmrr.3830)
5. Outcomes of Bariatric Surgery Versus Medical Management for Type 2 Diabetes Mellitus: a Meta-Analysis of Randomized Controlled Trials. — 2019, Obes Surg (PMID:30402804 DOI:10.1007/s11695-018-3552-x)
6. Long-term follow-up after bariatric surgery: a systematic review. — 2014, JAMA (PMID:25182102 DOI:10.1001/jama.2014.10706)
7. Diabetes remission and diabetic complications of bariatric surgery vs. medical management in patients with type 2 diabetes: A meta-analysis of randomized controlled trials. — 2025, Diabetes Obes Metab (PMID:40988570 DOI:10.1111/dom.70152)
8. Remission of type 2 diabetes: is bariatric surgery ready for prime time? — 2015, Endocrine (PMID:25355307 DOI:10.1007/s12020-014-0463-z)
9. Long-term outcomes of metabolic and bariatric surgery in adolescents with severe obesity with a follow-up of at least 5 years: A systematic review. — 2019, Surg Obes Relat Dis (PMID:30514669 DOI:10.1016/j.soard.2018.10.016)
10. Long-Term Results of Bariatric Surgery in Adolescents with at Least 5 Years of Follow-up: a Systematic Review and Meta-Analysis. — 2023, Obes Surg (PMID:37115416 DOI:10.1007/s11695-023-06593-4)

---

## Query: `recency-esketamine-monotherapy-2025` — "newest 2025 esketamine monotherapy trial treatment-resistant depression"
Category: recency. Intent: Most recent esketamine-monotherapy efficacy evidence in TRD. Newer is better.
_Recency-sensitive: newer high-quality evidence is better._

**Must-have landmark papers (ground truth):**
- Esketamine monotherapy RCT (Janik, JAMA Psychiatry 2025)

### Engine A — top 10
1. Esketamine Monotherapy in Adults With Treatment-Resistant Depression: A Randomized Clinical Trial. — 2025, JAMA Psychiatry (PMID:40601310 DOI:10.1001/jamapsychiatry.2025.1317)
2. A New Era for Esketamine in Managing Treatment-Resistant Depression: A Systematic Review of Its Use From Adjunct to First-Line Therapy. — 2025, Cureus (PMID:41185718 DOI:10.7759/cureus.91829)
3. Efficacy of Lamotrigine in the Treatment of Unipolar and Bipolar Depression: Meta-Analysis of Acute and Maintenance Randomised Controlled Trials. — 2025, Pharmaceuticals (Basel) (PMID:41155702 DOI:10.3390/ph18101590)
4. The Black Book of Psychotropic Dosing and Monitoring. — 2024, Psychopharmacol Bull (PMID:38993656 DOI:10.64719/pb.4493)
5. WHO urges scale up of newborn screening to improve early detection and care of birth defects - World Health Organization (WHO) — 2026, ? (— no id —)
6. Efficacy and safety of esketamine for "treatment resistant depression": registered report for a systematic review with an individual patient data meta-analysis of randomized, double-blind, placebo-controlled trials. — 2025, BMC Med (PMID:41310599 DOI:10.1186/s12916-025-04435-x)

### Engine B — top 10
1. Esketamine for treatment resistant depression — 2019, Expert Review of Neurotherapeutics (PMID:31282772 DOI:10.1080/14737175.2019.1640604)
2. Esketamine Monotherapy in Adults With Treatment-Resistant Depression — 2025, JAMA psychiatry (PMID:40601310 DOI:10.1001/jamapsychiatry.2025.1317)
3. Oral esketamine for treatment-resistant depression: rationale and design of a randomized controlled trial — 2019, BMC Psychiatry (PMID:31783823 DOI:10.1186/s12888-019-2359-1)
4. Esketamine monotherapy efficacious in treatment‐resistant depression — 2025, The Brown University Psychopharmacology Update (DOI:10.1002/pu.31369)
5. Registered clinical trials investigating ketamine and esketamine for treatment-resistant depression: A systematic review — 2023, Journal of Psychedelic Studies (DOI:10.1556/2054.2022.00234)
6. Esketamine nasal spray versus quetiapine XR in adults with treatment-resistant depression: a secondary analysis of the ESCAPE-TRD randomized clinical trial — 2025, CNS Spectrums (PMID:39819527 DOI:10.1017/S1092852924002451)
7. S114. Efficacy and Safety of Intranasal Esketamine Plus an Oral Antidepressant in Elderly Patients With Treatment-Resistant Depression — 2018, Biological Psychiatry (DOI:10.1016/j.biopsych.2018.02.1005)
8. Efficacy and safety of esketamine for “treatment resistant depression”: registered report for a systematic review with an individual patient data meta-analysis of randomized, double-blind, placebo-controlled trials — 2025, BMC Medicine (PMID:41310599 DOI:10.1186/s12916-025-04435-x)
9. [Treatment-resistant depression. From classification to new therapies.] — 2022, Rivista di psichiatria (PMID:36503940 DOI:10.1708/3922.39072)
10. A New Era for Esketamine in Managing Treatment-Resistant Depression: A Systematic Review of Its Use From Adjunct to First-Line Therapy — 2025, Cureus (PMID:41185718 DOI:10.7759/cureus.91829)

---

## Query: `family-evolut-trials` — "Evolut trials self-expanding transcatheter aortic valve replacement"
Category: trial_family. Intent: Resolve the Evolut program to its landmark self-expanding TAVR RCTs (Evolut Low Risk, SURTAVI).

**Must-have landmark papers (ground truth):**
- Evolut Low Risk (Popma, NEJM 2019)

### Engine A — top 10
1. Early and midterm outcomes of transcatheter aortic-valve replacement with balloon-expandable versus self-expanding valves: A meta-analysis. — 2022, J Cardiol (PMID:35599108 DOI:10.1016/j.jjcc.2022.04.011)
2. Reinterventions After CoreValve/Evolut Transcatheter or Surgical Aortic Valve&#xa0;Replacement for Treatment of&#xa0;Severe Aortic Stenosis. — 2024, JACC Cardiovasc Interv (PMID:38573257 DOI:10.1016/j.jcin.2024.01.292)
3. Comparison of outcomes of self-expanding versus balloon-expandable valves for transcatheter aortic valve replacement: a meta-analysis of randomized and propensity-matched studies. — 2023, BMC Cardiovasc Disord (PMID:37525092 DOI:10.1186/s12872-023-03397-3)
4. 3-Year Outcomes After Transcatheter or Surgical Aortic Valve Replacement in Low-Risk Patients With Aortic Stenosis. — 2023, J Am Coll Cardiol (PMID:36882136 DOI:10.1016/j.jacc.2023.02.017)
5. 5-Year Outcomes With Self-Expanding vs Balloon-Expandable Transcatheter Aortic&#xa0;Valve Replacement in Patients With Small Annuli. — 2023, JACC Cardiovasc Interv (PMID:36858662 DOI:10.1016/j.jcin.2022.11.032)
6. Transcatheter Aortic-Valve Replacement with a Self-Expanding Valve in Low-Risk Patients. — 2019, N Engl J Med (PMID:30883053 DOI:10.1056/NEJMoa1816885)
7. ACURATE neo2 valve versus commercially available transcatheter heart valves in patients with severe aortic stenosis (ACURATE IDE): a multicentre, randomised, controlled, non-inferiority trial. — 2025, Lancet (PMID:40412426 DOI:10.1016/S0140-6736(25)00319-8)
8. 5-Year Outcomes After Transcatheter or Surgical Aortic Valve Replacement in Low-Risk&#xa0;Patients With Aortic Stenosis. — 2025, J Am Coll Cardiol (PMID:40158212 DOI:10.1016/j.jacc.2025.03.004)
9. Balloon- vs Self-Expanding Valve Systems for Failed Small Surgical Aortic&#xa0;Valve Bioprostheses. — 2022, J Am Coll Cardiol (PMID:35597385 DOI:10.1016/j.jacc.2022.05.005)
10. Six-Year Outcomes After Transcatheter vs Surgical Aortic Valve Replacement in Low-Risk Patients With Aortic Stenosis. — 2026, J Am Coll Cardiol (PMID:41697183 DOI:10.1016/j.jacc.2026.02.5063)

### Engine B — top 10
1. Initial Experience of a Second-Generation Self-Expanding Transcatheter Aortic Valve: The UK & Ireland Evolut R Implanters' Registry. — 2017, JACC: Cardiovascular Interventions (PMID:28183467 DOI:10.1016/j.jcin.2016.11.025)
2. Early Clinical Outcomes After Transcatheter Aortic Valve Replacement Using a Novel Self-Expanding Bioprosthesis in Patients With Severe Aortic Stenosis Who Are Suboptimal for Surgery: Results of the Evolut R U.S. Study. — 2017, JACC: Cardiovascular Interventions (PMID:28183466 DOI:10.1016/j.jcin.2016.08.050)
3. Early Outcomes With the Evolut PRO Repositionable Self-Expanding Transcatheter Aortic Valve With Pericardial Wrap. — 2018, JACC: Cardiovascular Interventions (PMID:29348010 DOI:10.1016/j.jcin.2017.10.014)
4. Treatment of Symptomatic Severe Aortic Stenosis With a Novel Resheathable Supra-Annular Self-Expanding Transcatheter Aortic Valve System. — 2015, JACC: Cardiovascular Interventions (PMID:26315740 DOI:10.1016/j.jcin.2015.05.015)
5. Three Generations of Self-Expanding Transcatheter Aortic Valves: A Report From the STS/ACC TVT Registry. — 2020, JACC: Cardiovascular Interventions (PMID:31973793 DOI:10.1016/j.jcin.2019.08.035)
6. Balloon- Versus Self-Expanding Valve Systems for Treating Small Failed Surgical Aortic Bioprostheses: The LYTEN Trial. — 2022, Journal of the American College of Cardiology (PMID:35597385 DOI:10.1016/j.jacc.2022.05.005)
7. Outcomes for the Commercial Use of Self-Expanding Prostheses in Transcatheter Aortic Valve Replacement: A Report From the STS/ACC TVT Registry. — 2017, JACC: Cardiovascular Interventions (PMID:29050627 DOI:10.1016/j.jcin.2017.07.027)
8. Early and Mid-Term Outcomes of Transcatheter Aortic Valve Replacement Using the New Generation Self-Expanding Corevalve Evolut R Device — 2018, Structural Heart (DOI:10.1080/24748706.2018.1440097)
9. From CoreValve to Evolut PRO: Reviewing the Journey of Self-Expanding Transcatheter Aortic Valves — 2017, Cardiology and Therapy (PMID:29080095 DOI:10.1007/s40119-017-0100-z)
10. 1-Year Outcomes With the Evolut R Self-Expanding Transcatheter Aortic Valve: From the International FORWARD Study. — 2018, JACC: Cardiovascular Interventions (PMID:30466832 DOI:10.1016/j.jcin.2018.07.032)

---

## Query: `family-sglt2-cvot-trials` — "SGLT2 inhibitor cardiovascular outcome trials EMPA-REG DECLARE CANVAS"
Category: trial_family. Intent: Resolve the SGLT2i CVOT family to its landmark trials (EMPA-REG OUTCOME, DECLARE-TIMI 58, CANVAS).

**Must-have landmark papers (ground truth):**
- EMPA-REG OUTCOME (Zinman, NEJM 2015)

### Engine A — top 10
1. What have we learned about renal protection from the cardiovascular outcome trials and observational analyses with SGLT2 inhibitors? — 2020, Diabetes Obes Metab (PMID:32267075 DOI:10.1111/dom.13965)
2. Minireview: are SGLT2 inhibitors heart savers in diabetes? — 2020, Heart Fail Rev (PMID:31410757 DOI:10.1007/s10741-019-09849-3)
3. Renal physiology of glucose handling and therapeutic implications. — 2020, Nephrol Dial Transplant (PMID:32003835 DOI:10.1093/ndt/gfz230)
4. Sodium-glucose co-transporter-2 inhibitors and atrial fibrillation in the cardiovascular and renal outcome trials. — 2021, Diabetes Obes Metab (PMID:33001548 DOI:10.1111/dom.14211)
5. Sodium-Glucose Cotransporter-2 (SGLT2) Inhibitors and Cardiovascular Outcomes: A Review of Literature. — 2024, Cureus (PMID:39099905 DOI:10.7759/cureus.63796)
6. An exploration of the heterogeneity in effects of SGLT2 inhibition on cardiovascular and all-cause mortality in the EMPA-REG OUTCOME, CANVAS Program, DECLARE-TIMI 58, and CREDENCE trials. — 2021, Int J Cardiol (PMID:32979427 DOI:10.1016/j.ijcard.2020.09.050)
7. Cardiovascular Protection with Anti-hyperglycemic Agents. — 2019, Am J Cardiovasc Drugs (PMID:30767126 DOI:10.1007/s40256-019-00325-9)
8. Multi-Organ Protective Effects of Sodium Glucose Cotransporter 2 Inhibitors. — 2021, Int J Mol Sci (PMID:33922546 DOI:10.3390/ijms22094416)
9. Renal Outcomes in Type 2 Diabetes: A Review of Cardiovascular and Renal Outcome Trials. — 2020, Diabetes Ther (PMID:31863343 DOI:10.1007/s13300-019-00747-3)
10. [Cardiovascular and renal protection with SGLT2 inhibitors: from EMPA-REG OUTCOME to VERTIS CV]. — 2020, Rev Med Suisse (PMID:32852168)

### Engine B — top 10
1. Cardiorenal Outcomes in the CANVAS, DECLARE-TIMI 58, and EMPA-REG OUTCOME Trials: A Systematic Review. — 2018, Reviews in cardiovascular medicine (PMID:31032602 DOI:10.31083/j.rcm.2018.02.907)
2. SGLT2 Inhibitors Through the Windows of EMPA-REG and CANVAS Trials: A Review — 2017, Diabetes Therapy (PMID:29076040 DOI:10.1007/s13300-017-0320-1)
3. Cardiovascular effects of sodium glucose cotransporter 2 inhibitors — 2018, Diabetes, Metabolic Syndrome and Obesity : Targets and Therapy (PMID:29695924 DOI:10.2147/DMSO.S154602)
4. Pleiotropic effects of SGLT2 inhibitors beyond the effect on glycemic control — 2018, Diabetology International (PMID:30603370 DOI:10.1007/s13340-018-0367-x)
5. SGLT2 Inhibitors and Cardiovascular Outcomes: Do They Differ or There is a Class Effect? New Insights from the EMPA-REG OUTCOME trial and the CVD-REAL Study — 2019, Current Cardiology Reviews (PMID:31362691 DOI:10.2174/1573403X15666190730094215)
6. Class Effect for Sodium Glucose-Cotransporter-2 Inhibitors in Cardiovascular Outcomes: Implications for the Cardiovascular Disease Specialist. — 2018, Circulation (PMID:29555706 DOI:10.1161/CIRCULATIONAHA.117.030117)
7. Canagliflozin and Cardiovascular and Renal Events in Type 2 Diabetes (The CANVAS Program)1 — 2017, ? (— no id —)
8. Outcome-Studien zu SGLT-2-Inhibitoren — 2019, Der Internist (PMID:31375850 DOI:10.1007/s00108-019-0656-x)
9. An exploration of the heterogeneity in effects of SGLT2 inhibition on cardiovascular and all-cause mortality in the EMPA-REG OUTCOME, CANVAS Program, DECLARE-TIMI 58, and CREDENCE trials. — 2020, International Journal of Cardiology (PMID:32979427 DOI:10.1016/j.ijcard.2020.09.050)
10. Series: Cardiovascular outcome trials for diabetes drugs Canagliflozin and the CANVAS Program, dapagliflozin and DECLARE-TIMI 58, ertugliflozin and VERTIS CV — 2021, British Journal of Diabetes (DOI:10.15277/bjd.2021.320)

---

## Query: `acronym-aristotle` — "ARISTOTLE trial apixaban atrial fibrillation"
Category: trial_acronym. Intent: Resolve ARISTOTLE to the apixaban-vs-warfarin AF RCT.

**Must-have landmark papers (ground truth):**
- ARISTOTLE (Granger, NEJM 2011)

### Engine A — top 10
1. Apixaban versus warfarin in patients with atrial fibrillation. — 2011, New England Journal of Medicine (PMID:21870978 DOI:10.1056/NEJMoa1107039)
2. Apixaban versus warfarin in patients with atrial fibrillation — 2012, Indian heart journal (DOI:10.1016/S0019-4832(12)60030-3)
3. Atrial fibrillation: ARISTOTLE reveals superiority of apixaban over warfarin in patients with atrial fibrillation — 2011, Nature Reviews Cardiology (PMID:21912413 DOI:10.1038/nrcardio.2011.140)
4. Apixaban for reduction in stroke and other ThromboemboLic events in atrial fibrillation (ARISTOTLE) trial: design and rationale. — 2010, American Heart Journal (PMID:20211292 DOI:10.1016/j.ahj.2009.07.035)
5. Apixaban for the Prevention of Thromboembolic Events in Patients with Atrial Fibrillation: Primary Results of the ARISTOTLE Trial — 2011, Journal of Arrhythmia (DOI:10.4020/JHRS.27.SY06_5)
6. Efficacy and Safety of Apixaban in Patients With Atrial Fibrillation According to Sex : Results From the ARISTOTLE Trial — 2013, Circulation (— no id —)
7. 10 years of ARISTOTLE trial: results and lessons — 2021, Consilium Medicum (DOI:10.26442/20751753.2021.6.200991)
8. Apixaban for Stroke Prevention in Atrial Fibrillation: A Review of the Clinical Trial Evidence — 2011, Hospital Practice (PMID:22056819 DOI:10.3810/hp.2011.10.918)
9. Major bleeding in patients with atrial fibrillation receiving apixaban or warfarin: The ARISTOTLE Trial (Apixaban for Reduction in Stroke and Other Thromboembolic Events in Atrial Fibrillation): Predictors, Characteristics, and Clinical Outcomes. — 2014, Journal of the American College of Cardiology (PMID:24657685 DOI:10.1016/j.jacc.2014.02.549)
10. A new era for anticoagulation in atrial fibrillation. — 2011, New England Journal of Medicine (PMID:21870977 DOI:10.1056/NEJMe1109748)

### Engine B — top 10
1. Apixaban versus warfarin in patients with atrial fibrillation. — 2011, N Engl J Med (PMID:21870978 DOI:10.1056/NEJMoa1107039)
2. Patients With Atrial Fibrillation Taking Nonsteroidal Anti-Inflammatory Drugs and Oral Anticoagulants in the ARISTOTLE Trial. — 2020, Circulation (PMID:31747786 DOI:10.1161/CIRCULATIONAHA.119.041296)
3. Pre-treatment lysis time of plasma-derived fibrin clots and bleeding in patients on oral anticoagulants for atrial fibrillation in the ARISTOTLE trial. — 2026, Eur Heart J (PMID:40444814 DOI:10.1093/eurheartj/ehaf347)
4. Apixaban Versus Warfarin in Patients With Atrial Fibrillation and Advanced Chronic Kidney Disease. — 2020, Circulation (PMID:32160801 DOI:10.1161/CIRCULATIONAHA.119.044059)
5. Safety and efficacy of apixaban versus warfarin in peritoneal dialysis patients with non-valvular atrial fibrillation: protocol for a prospective, randomised, open-label, blinded endpoint trial (APIDP2). — 2024, BMJ Open (PMID:39306346 DOI:10.1136/bmjopen-2024-089353)
6. Heterogeneity of diabetes as a risk factor for major adverse cardiovascular events in anticoagulated patients with atrial fibrillation: an analysis of the ARISTOTLE trial. — 2022, Eur Heart J Cardiovasc Pharmacother (PMID:33367487 DOI:10.1093/ehjcvp/pvaa140)
7. Outcomes of apixaban versus warfarin in patients with atrial fibrillation and multi-morbidity: Insights from the ARISTOTLE trial. — 2019, Am Heart J (PMID:30579505 DOI:10.1016/j.ahj.2018.09.017)
8. Economic Analysis of Apixaban Therapy for Patients With Atrial Fibrillation From a US Perspective: Results From the ARISTOTLE Randomized Clinical Trial. — 2017, JAMA Cardiol (PMID:28355434 DOI:10.1001/jamacardio.2017.0065)
9. Gastrointestinal bleeding in patients with atrial fibrillation treated with Apixaban or warfarin: Insights from the Apixaban for Reduction in Stroke and Other Thromboembolic Events in Atrial Fibrillation (ARISTOTLE) trial. — 2020, Am Heart J (PMID:31896036 DOI:10.1016/j.ahj.2019.10.013)
10. Repeated Measurement of the Novel Atrial Biomarker BMP10 (Bone Morphogenetic Protein 10) Refines Risk Stratification in Anticoagulated Patients With Atrial Fibrillation: Insights From the ARISTOTLE Trial. — 2024, J Am Heart Assoc (PMID:38529655 DOI:10.1161/JAHA.123.033720)

---

## Query: `acronym-empa-reg` — "EMPA-REG OUTCOME empagliflozin cardiovascular mortality type 2 diabetes"
Category: trial_acronym. Intent: Resolve EMPA-REG OUTCOME to the empagliflozin CV-mortality CVOT.

**Must-have landmark papers (ground truth):**
- EMPA-REG OUTCOME (Zinman, NEJM 2015)

### Engine A — top 10
1. Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes. — 2015, N Engl J Med (PMID:26378978 DOI:10.1056/NEJMoa1504720)
2. Empagliflozin and Clinical Outcomes in Patients With Type 2 Diabetes Mellitus, Established Cardiovascular Disease, and Chronic Kidney Disease. — 2018, Circulation (PMID:28904068 DOI:10.1161/CIRCULATIONAHA.117.028268)
3. The effect of empagliflozin on the total burden of cardiovascular and hospitalization events in the Asian and non-Asian populations of the EMPA-REG OUTCOME trial of patients with type 2 diabetes and cardiovascular disease. — 2022, Diabetes Obes Metab (PMID:34908223 DOI:10.1111/dom.14626)
4. Empagliflozin in women with type 2 diabetes and cardiovascular disease - an analysis of EMPA-REG OUTCOME&#xae;. — 2018, Diabetologia (PMID:29713728 DOI:10.1007/s00125-018-4630-2)
5. Effects of SGLT-2 Inhibitor on Myocardial Perfusion, Function and Metabolism in Type 2 DM Patients at High Cardiovascular Risk: The SIMPle Randomized Clinical Trial — 2017, Herlev and Gentofte Hospital (— no id —)
6. Empagliflozin and Cardiovascular Outcomes in Asian Patients With Type 2 Diabetes and Established Cardiovascular Disease&#x3000;- Results From EMPA-REG OUTCOME&#xae;. — 2017, Circ J (PMID:28025462 DOI:10.1253/circj.CJ-16-1148)
7. EMPagliflozin compaRative effectIveness and SafEty (EMPRISE) Study Program — 2017, Boehringer Ingelheim (— no id —)
8. Cardiovascular outcomes and LDL-cholesterol levels in EMPA-REG OUTCOME&#xae;. — 2020, Diab Vasc Dis Res (PMID:33307785 DOI:10.1177/1479164120975256)
9. Effect of empagliflozin on total myocardial infarction events by type and additional coronary outcomes: insights from the randomized EMPA-REG OUTCOME trial. — 2024, Cardiovasc Diabetol (PMID:38992713 DOI:10.1186/s12933-024-02328-6)
10. Renoprotective effects of sodium-glucose cotransporter-2 inhibitors. — 2018, Kidney Int (PMID:29735306 DOI:10.1016/j.kint.2017.12.027)

### Engine B — top 10
1. Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes. — 2015, New England Journal of Medicine (PMID:26378978 DOI:10.1056/NEJMoa1504720)
2. [EMPA-REG OUTCOME: Empagliflozin reduces mortality in patients with type 2 diabetes at high cardiovascular risk]. — 2015, Revue Medicale de Liege (PMID:26738271)
3. Cardiovascular Mortality Reduction With Empagliflozin in Patients With Type 2 Diabetes and Cardiovascular Disease. — 2018, Journal of the American College of Cardiology (PMID:29348030 DOI:10.1016/j.jacc.2017.11.022)
4. EFFECT OF EMPAGLIFLOZIN ON MORTALITY AND CAUSES OF DEATH IN PATIENTS WITH TYPE 2 DIABETES AT HIGH CARDIOVASCULAR RISK — 2016, Canadian Journal of Cardiology (DOI:10.1016/j.cjca.2016.07.182)
5. Empagliflozin reduces cardiovascular events and mortality in type 2 diabetes — 2016, Postgraduate medicine (PMID:27043258 DOI:10.1080/00325481.2016.1174566)
6. Differential cardiovascular profiles of sodium-glucose cotransporter 2 inhibitors: critical evaluation of empagliflozin — 2017, Therapeutics and Clinical Risk Management (PMID:28496330 DOI:10.2147/TCRM.S97619)
7. Mortality Reduction in EMPA-REG OUTCOME Trial: Beyond the Antidiabetes Effect — 2018, Diabetes Care (PMID:29358464 DOI:10.2337/dc17-1059)
8. SGLT2 Inhibitors and Cardiovascular Risk: Lessons Learned From the EMPA-REG OUTCOME Study — 2016, Diabetes Care (PMID:27208375 DOI:10.2337/dc16-0041)
9. Finding Efficacy in a Safety Trial: Empagliflozin and Cardiovascular Death. — 2016, Circulation (PMID:27601559 DOI:10.1161/CIRCULATIONAHA.116.024512)
10. Reducing type 2 diabetes mortality: empagliflozin study — 2015, Healthcare executive (— no id —)

---

## Query: `family-zuma-cart-trials` — "ZUMA axicabtagene ciloleucel CAR-T trials large B-cell lymphoma"
Category: trial_family. Intent: Resolve the ZUMA program to its landmark axi-cel CAR-T trials (ZUMA-1 pivotal, ZUMA-7 second-line).

**Must-have landmark papers (ground truth):**
- ZUMA axi-cel trial family

### Engine A — top 10
1. Axicabtagene Ciloleucel CAR T-Cell Therapy in Refractory Large B-Cell Lymphoma. — 2017, N Engl J Med (PMID:29226797 DOI:10.1056/NEJMoa1707447)
2. Long-term safety and activity of axicabtagene ciloleucel in refractory large B-cell lymphoma (ZUMA-1): a single-arm, multicentre, phase 1-2 trial. — 2019, Lancet Oncol (PMID:30518502 DOI:10.1016/S1470-2045(18)30864-7)
3. Three-year follow-up analysis of first-line axicabtagene ciloleucel for high-risk large B-cell lymphoma: the ZUMA-12 study. — 2025, Blood (PMID:39938019 DOI:10.1182/blood.2024027347)
4. Axicabtagene ciloleucel as first-line therapy in high-risk large B-cell lymphoma: the phase 2 ZUMA-12 trial. — 2022, Nat Med (PMID:35314842 DOI:10.1038/s41591-022-01731-4)
5. Safety and Efficacy of Axicabtagene Ciloleucel versus Standard of Care in Patients 65 Years of Age or Older with Relapsed/Refractory Large B-Cell Lymphoma. — 2023, Clin Cancer Res (PMID:36999993 DOI:10.1158/1078-0432.CCR-22-3136)
6. Validation of Cure Assumptions when Analyzing ZUMA-7 Follow-up Data of Axicabtagene Ciloleucel and Standard of Care Therapy in Second-Line Relapsed/Refractory Large B-cell Lymphoma. — 2025, Transplant Cell Ther (PMID:40930226 DOI:10.1016/j.jtct.2025.09.015)
7. Prophylactic corticosteroid use in patients receiving axicabtagene ciloleucel for large B-cell lymphoma. — 2021, Br J Haematol (PMID:34296427 DOI:10.1111/bjh.17527)
8. Tumor immune contexture is a determinant of anti-CD19 CAR T cell efficacy in large B cell lymphoma. — 2022, Nat Med (PMID:36038629 DOI:10.1038/s41591-022-01916-x)
9. Earlier corticosteroid use for adverse event management in patients receiving axicabtagene ciloleucel for large B-cell lymphoma. — 2021, Br J Haematol (PMID:34590303 DOI:10.1111/bjh.17673)
10. Real-World Evidence of Axicabtagene Ciloleucel for the Treatment of Large B Cell Lymphoma in the United States. — 2022, Transplant Cell Ther (PMID:35609867 DOI:10.1016/j.jtct.2022.05.026)

### Engine B — top 10
1. Axicabtagene Ciloleucel CAR T-Cell Therapy in Refractory Large B-Cell Lymphoma — 2017, New England Journal of Medicine (PMID:29226797 DOI:10.1056/NEJMoa1707447)
2. Long-term safety and activity of axicabtagene ciloleucel in refractory large B-cell lymphoma (ZUMA-1): a single-arm, multicentre, phase 1-2 trial — 2018, The Lancet Oncology (PMID:30518502 DOI:10.1016/S1470-2045(18)30864-7)
3. Axicabtagene Ciloleucel as Second-Line Therapy for Large B-Cell Lymphoma. — 2021, New England Journal of Medicine (PMID:34891224 DOI:10.1056/NEJMoa2116133)
4. ZUMA-23: A global, phase 3, randomized controlled study of axicabtagene ciloleucel versus standard of care as first-line therapy in patients with high-risk large B-cell lymphoma. — 2023, Journal of Clinical Oncology (DOI:10.1200/jco.2023.41.16_suppl.tps7578)
5. Five-year follow-up of ZUMA-1 supports the curative potential of axicabtagene ciloleucel in refractory large B-cell lymphoma — 2023, Blood (PMID:36821768 DOI:10.1182/blood.2022018893)
6. Axicabtagene Ciloleucel, an Anti-CD19 Chimeric Antigen Receptor T-Cell Therapy for Relapsed or Refractory Large B-Cell Lymphoma: Practical Implications for the Community Oncologist. — 2019, The Oncologist (PMID:31585984 DOI:10.1634/theoncologist.2019-0395)
7. Retreatment (reTx) of patients (pts) with refractory large B-cell lymphoma with axicabtagene ciloleucel (axi-cel) in ZUMA-1. — 2020, Journal of Clinical Oncology (DOI:10.1200/jco.2020.38.15_suppl.8012)
8. ZUMA‐7 trial shows the value of axicabtagene ciloleucel for early relapsed B‐cell lymphoma — 2023, Cancer (PMID:37656154 DOI:10.1002/cncr.34994)
9. Durability of response in ZUMA-1, the pivotal phase 2 study of axicabtagene ciloleucel (Axi-Cel) in patients (Pts) with refractory large B-cell lymphoma. — 2018, Journal of Clinical Oncology (DOI:10.1200/JCO.2018.36.15_SUPPL.3003)
10. Axicabtagene ciloleucel as first-line therapy in high-risk large B-cell lymphoma: the phase 2 ZUMA-12 trial — 2022, Nature Medicine (PMID:35314842 DOI:10.1038/s41591-022-01731-4)

---

## Query: `ambiguous-ace-acronym` — "ACE trial"
Category: ambiguous_acronym. Intent: Deliberately ambiguous: 'ACE' could mean the ACE cardiology trial, an Adverse Childhood Experiences study, or angiotensin-converting enzyme work. A good ranker surfaces named clinical trials and asks for disambiguation rather than committing to one meaning.

### Engine A — top 10
1. Advanced Cutaneous Evaluator (ACE): Estimation of Clinical and Economic Impact — 2025, Fundacin Biomedica Galicia Sur (— no id —)
2. Adverse Childhood Experiences in Patients With Coronary Artery Disease: a Pilot Randomized Control Trial — 2021, University Health Network, Toronto (— no id —)
3. A peer-volunteer led active ageing programme to prevent decline in physical function in older people at risk of mobility disability (Active, Connected, Engaged [ACE]): study protocol for a randomised controlled trial. — 2023, Trials (PMID:38031101 DOI:10.1186/s13063-023-07758-3)
4. Failure of selenium-ace to improve osteoarthritis. — 1990, Br J Rheumatol (PMID:2192771 DOI:10.1093/rheumatology/29.3.211)
5. Vasopeptidase inhibitors. — 2001, Lancet (PMID:11705582 DOI:10.1016/S0140-6736(01)06584-9)
6. ACE inhibitors in congestive heart failure. — 1989, Cardiology (PMID:2670220 DOI:10.1159/000174558)
7. Are ACE Inhibitors and Beta-blockers Dangerous in Patients at Risk for Anaphylaxis? — 2017, J Allergy Clin Immunol Pract (PMID:28552379 DOI:10.1016/j.jaip.2017.04.033)
8. Should angiotensin converting enzyme (ACE) inhibitors be used routinely after infarction? Perspectives from the Survival and Ventricular Enlargement (SAVE) trial. — 1994, Br Heart J (PMID:8130017 DOI:10.1136/hrt.71.2.115)
9. Angiotensin II receptor antagonists. — 2000, Lancet (PMID:10696996 DOI:10.1016/s0140-6736(99)10365-9)
10. Maternal Treatment With ACE-inhibitors and Breastfeeding: a Mono-centric Study on the Exposure Through Breast Milk — 2021, Universitaire Ziekenhuizen KU Leuven (— no id —)

### Engine B — top 10
1. Angiotensin II and trials of cardiovascular outcomes. — 2002, American Journal of Cardiology (PMID:11835905 DOI:10.1016/S0002-9149(01)02322-0)
2. Overview of randomized trials of angiotensin-converting enzyme inhibitors on mortality and morbidity in patients with heart failure. Collaborative Group on ACE Inhibitor Trials. — 1995, Journal of the American Medical Association (JAMA) (PMID:7654275 DOI:10.1001/jama.273.18.1450)
3. Multicentre randomized controlled trial of angiotensin-converting enzyme inhibitor/angiotensin receptor blocker withdrawal in advanced renal disease: the STOP-ACEi trial — 2015, Nephrology, Dialysis and Transplantation (PMID:26429974 DOI:10.1093/ndt/gfv346)
4. Angiotensin II and trials of cardiovascular outcomes. Discussion — 2002, American Journal of Cardiology (— no id —)
5. Role of ACE inhibitors in anthracycline‐induced cardiotoxicity: A randomized, double‐blind, placebo‐controlled trial — 2018, Pediatric Blood & Cancer (PMID:30009543 DOI:10.1002/pbc.27308)
6. Rationale and Design of a Trial of Angiotensin Converting Enzyme Inhibition in Infants with Single Ventricle — 2009, American Heart Journal (PMID:19081394 DOI:10.1016/j.ahj.2008.08.030)
7. Effectiveness of ecallantide in treating angiotensin-converting enzyme inhibitor-induced angioedema in the emergency department. — 2015, Annals of Allergy, Asthma & Immunology (PMID:25601538 DOI:10.1016/j.anai.2014.12.007)
8. Robust arm and leg muscle adaptation to training despite ACE inhibition: a randomized placebo-controlled trial — 2022, European Journal of Applied Physiology (PMID:36271942 DOI:10.1007/s00421-022-05072-5)
9. Therapeutic trials comparing angiotensin converting enzyme inhibitors and Angiotensin II receptor blockers — 2000, Current Hypertension Reports (PMID:10981176 DOI:10.1007/S11906-000-0045-8)
10. Ongoing trials of angiotensin-converting enzyme inhibition: what they can tell us. — 2001, American Journal of Hypertension (PMID:11497208 DOI:10.1016/S0895-7061(01)02153-7)

---

## Query: `ambiguous-cast-acronym` — "CAST trial cardiology"
Category: ambiguous_acronym. Intent: 'CAST' maps to the Cardiac Arrhythmia Suppression Trial (antiarrhythmics post-MI increased mortality) but also to oncology/stroke CAST studies. Expect the landmark CAST antiarrhythmic RCT to surface when 'cardiology' is given.

### Engine A — top 10
1. The cardiac arrhythmia suppression trial (CAST). — 1989, New England Journal of Medicine (PMID:2501683 DOI:10.1056/NEJM198908103210608)
2. Mortality following ventricular arrhythmia suppression by encainide, flecainide, and moricizine after myocardial infarction. The original design concept of the Cardiac Arrhythmia Suppression Trial (CAST). — 1993, Journal of the American Medical Association (JAMA) (PMID:8230622 DOI:10.1001/JAMA.1993.03510200057032)
3. The Cardiac Arrhythmia Suppression Trial: How Has it Impacted on Contemporary Arrhythmia Management? — 1990, Journal of Cardiovascular Electrophysiology (DOI:10.1111/j.1540-8167.1990.tb01078.x)
4. FINAL REPORT FROM THE CAST STUDY. — 1991, NEJM Journal Watch (DOI:10.1056/JW199103220000001)
5. The Cardiac Arrhythmia Suppression Trial : First CAST . . . Then CAST-1 — 2016, ? (PMID:https://pubmed.ncbi.nlm.nih.gov/2535645 DOI:10.1056/nejm198912213212510)
6. The reversal of cardiology practices: interventions that were tried in vain. — 2013, Cardiovascular Diagnosis and Therapy (PMID:24400206 DOI:10.3978/j.issn.2223-3652.2013.10.05)
7. Implications of the Cardiac Arrhythmia Suppression Trial for antiarrhythmic drug treatment. — 1990, American Journal of Cardiology (PMID:2106253 DOI:10.1016/0002-9149(90)91410-8)
8. CAST: A study that rocked the cardiology world and became the poster child for evidence-based medicine. — 2024, Heart Rhythm (PMID:38296455 DOI:10.1016/j.hrthm.2023.09.030)
9. The Cardiac Arrhythmia Suppression Trial: first CAST ... then CAST-II. — 1992, Journal of the American College of Cardiology (PMID:1552108 DOI:10.1016/0735-1097(92)90267-Q)
10. Data monitoring in the cardiac arrhythmia suppression trial. — 1993, The Online Journal of Current Clinical Trials (PMID:8306012)

### Engine B — top 10
1. CAST and beyond. Implications of the Cardiac Arrhythmia Suppression Trial. Task Force of the Working Group on Arrhythmias of the European Society of Cardiology. — 1990, Circulation (PMID:1689621 DOI:10.1161/01.cir.81.3.1123)
2. Flecainide in structural heart diseases: A contemporary reappraisal beyond the CAST. — 2025, Heart Rhythm (PMID:40865597 DOI:10.1016/j.hrthm.2025.08.034)
3. Amiodarone as a first-line drug in the treatment of atrial fibrillation: the protagonist viewpoint. — 1994, Cardiovasc Drugs Ther (PMID:7873475 DOI:10.1007/BF00877125)
4. Do antiarrhythmic drugs work? Some reflections on the implications of the Cardiac Arrhythmia Suppression Trial. — 1990, Clin Cardiol (PMID:2257714 DOI:10.1002/clc.4960131011)
5. Cardiac Arrhythmia Suppression Trial (CAST) — 1986, National Heart, Lung, and Blood Institute (NHLBI) (— no id —)
6. The reversal of cardiology practices: interventions that were tried in vain. — 2013, Cardiovasc Diagn Ther (PMID:24400206 DOI:10.3978/j.issn.2223-3652.2013.10.05)
7. Optimising the use of beta-adrenoceptor antagonists in coronary artery disease. — 2005, Drugs (PMID:15819591 DOI:10.2165/00003495-200565060-00006)
8. Interleukin-1&#x3b2; in circulating mononuclear cells predicts steatotic liver disease&#xa0;improvement after weight loss in subjects with obesity and prediabetes or type 2 diabetes. — 2025, Cardiovasc Diabetol (PMID:40514652 DOI:10.1186/s12933-025-02706-8)
9. Antidepressant choice in the patient with cardiac disease: lessons from the Cardiac Arrhythmia Suppression Trial (CAST) studies. — 1994, J Clin Psychiatry (PMID:7961547)
10. The Role of Non-Invasive Multimodality Imaging in Chronic Coronary Syndrome: Anatomical and Functional Pathways. — 2023, Diagnostics (Basel) (PMID:37370978 DOI:10.3390/diagnostics13122083)

---

## Query: `negctrl-keynote-heart-failure` — "KEYNOTE trial for heart failure with reduced ejection fraction"
Category: negative_control. Intent: There is NO KEYNOTE heart-failure trial — KEYNOTE is an oncology (pembrolizumab) program. A correct ranker should NOT surface KEYNOTE-189/006 oncology papers as if they answered a heart-failure question.

### Engine A — top 10
1. A trial to evaluate the effect of the sodium–glucose co‐transporter 2 inhibitor dapagliflozin on morbidity and mortality in patients with heart failure and reduced left ventricular ejection fraction (DAPA‐HF) — 2019, European Journal of Heart Failure (PMID:30895697 DOI:10.1002/ejhf.1432)
2. Heart failure drug treatment: the fantastic four — 2021, European Heart Journal (PMID:33447845 DOI:10.1093/eurheartj/ehaa1012)
3. Cardiovascular and Kidney Outcomes with Empagliflozin in Heart Failure — 2021, Diabetologie und Stoffwechsel (DOI:10.1055/S-0041-1727471)
4. Paradigm shifts in heart-failure therapy--a timeline. — 2014, New England Journal of Medicine (PMID:25184412 DOI:10.1056/NEJMp1410241)
5. Evaluation of the effect of sodium–glucose co‐transporter 2 inhibition with empagliflozin on morbidity and mortality of patients with chronic heart failure and a reduced ejection fraction: rationale for and design of the EMPEROR‐Reduced trial — 2019, European Journal of Heart Failure (PMID:31584231 DOI:10.1002/ejhf.1536)
6. The DAPA-HF Trial: A Momentous Victory in the War against Heart Failure. — 2019, Cell Metabolism (PMID:31693879 DOI:10.1016/j.cmet.2019.10.008)
7. A Novel Drug Therapy for Heart Failure with Reduced Systolic Function — 2020, NEJM Journal Watch (DOI:10.1056/NEJM-JW.NA51206)
8. Hemodynamically-Guided Management of Heart Failure Across the Ejection Fraction Spectrum: The GUIDE-HF Trial. — 2022, JACC. Heart failure (PMID:36456066 DOI:10.1016/j.jchf.2022.08.012)
9. COMMANDER HF - A Trial and an Answer. — 2018, New England Journal of Medicine (PMID:30281980 DOI:10.1056/NEJMe1811089)
10. Effect of Ejection Fraction on Clinical Outcomes in Patients treated with Omecamtiv Mecarbil in GALACTIC-HF. — 2021, Journal of the American College of Cardiology (PMID:34015475 DOI:10.1016/j.jacc.2021.04.065)

### Engine B — top 10
1. Long-term outcomes with conventional fractionated and stereotactic radiotherapy for suspected heart-base tumours in dogs. — 2021, Vet Comp Oncol (PMID:33135852 DOI:10.1111/vco.12662)
2. A Pilot Trial of Proton-Based Cardiac Sparing Accelerated Fractionated Radiation Therapy in Unresectable Non-small Cell Lung Cancer With Extended Durvalumab Therapy (PARTICLE-D). — 2024, Pract Radiat Oncol (PMID:39002856 DOI:10.1016/j.prro.2024.06.007)
3. [Radiotherapy of bone metastases: Which fractionations?]. — 2015, Cancer Radiother (PMID:26321686 DOI:10.1016/j.canrad.2015.06.015)
4. [Radiotherapy of breast cancer]. — 2016, Cancer Radiother (PMID:27522187 DOI:10.1016/j.canrad.2016.07.025)
5. [Normofractionated breast irradiation in breast cancer. Indications and benefits]. — 2016, Cancer Radiother (PMID:27592268 DOI:10.1016/j.canrad.2016.07.093)
6. Palliative Radiation for Cancer Pain Management. — 2021, Cancer Treat Res (PMID:34542881 DOI:10.1007/978-3-030-81526-4_10)
7. Head and neck cancer: altered fractionation schedules. — 1999, Oncologist (PMID:10337367)
8. A Century of Fractionated Radiotherapy: How Mathematical Oncology Can Break the Rules. — 2022, Int J Mol Sci (PMID:35163240 DOI:10.3390/ijms23031316)
9. Improving control of high-grade glioma by ultra-hyper-fractionated radiotherapy. — 2022, J Neurosci Res (PMID:35184314 DOI:10.1002/jnr.25030)
10. Optimization of combined proton-photon treatments. — 2018, Radiother Oncol (PMID:29370987 DOI:10.1016/j.radonc.2017.12.031)

---

## Query: `negctrl-dapa-oncology` — "DAPA trial for metastatic breast cancer chemotherapy"
Category: negative_control. Intent: The DAPA-HF/DAPA-CKD trials are dapagliflozin cardiology/nephrology trials, NOT oncology. The query invents a non-existent breast-cancer 'DAPA' trial.

### Engine A — top 10
1. Datopotamab Deruxtecan Versus Chemotherapy in Previously Treated Inoperable/Metastatic Hormone Receptor–Positive Human Epidermal Growth Factor Receptor 2–Negative Breast Cancer: Primary Results From TROPION-Breast01 — 2024, Journal of Clinical Oncology (PMID:39265124 DOI:10.1200/JCO.24.00920)
2. LBA11 Datopotamab deruxtecan (Dato-DXd) vs chemotherapy in previously-treated inoperable or metastatic hormone receptor-positive, HER2-negative (HR+/HER2–) breast cancer (BC): Primary results from the randomised phase III TROPION-Breast01 trial — 2023, Annals of Oncology (DOI:10.1016/j.annonc.2023.10.015)
3. 261TiP TROPION-Breast05: Phase (Ph) III study of datopotamab deruxtecan (Dato-DXd) ± durvalumab (D) vs chemotherapy (CT) + pembrolizumab (pembro) in patients (pts) with PD-L1+ locally recurrent inoperable or metastatic triple-negative breast cancer (TNBC) — 2024, ESMO Open (DOI:10.1016/j.esmoop.2024.103282)
4. A Phase I Study of Dasatinib (D) in Combination with Weekly (w) Paclitaxel (P) for Patients (Pts) with Metastatic Breast Carcinoma (MBC): Activity Despite Prior Taxane Exposure. — 2009, Cancer Research (DOI:10.1158/0008-5472.SABCS-09-5070)
5. TROPION-Breast05: a randomized phase III study of Dato-DXd with or without durvalumab versus chemotherapy plus pembrolizumab in patients with PD-L1-high locally recurrent inoperable or metastatic triple-negative breast cancer — 2025, Therapeutic Advances in Medical Oncology (PMID:40297626 DOI:10.1177/17588359251327992)
6. Abstract P3-07-07: Inhibition of death-associated protein kinase 1 enhances chemotherapy action against triple-negative breast cancer — 2017, Cancer Research (DOI:10.1158/1538-7445.sabcs16-p3-07-07)
7. Abstract GS02-01: Randomized phase 3 study of datopotamab deruxtecan vs chemotherapy for patients with previously-treated inoperable or metastatic hormone receptor-positive, HER2-negative breast cancer: Results from TROPION-Breast01 — 2024, Cancer Research (DOI:10.1158/1538-7445.sabcs23-gs02-01)
8. Abstract OT3-04-02: The DORA trial: A non-comparator randomised phase II multi-center maintenance study of olaparib alone or olaparib in combination with durvalumab in platinum treated advanced triple negative breast cancer (TNBC) — 2018, Cancer Research (DOI:10.1158/1538-7445.SABCS17-OT3-04-02)
9. Phase II DORA Study of Olaparib with or without Durvalumab as a Chemotherapy-Free Maintenance Strategy in Platinum-Pretreated Advanced Triple-Negative Breast Cancer — 2024, Clinical Cancer Research (PMID:38236575 DOI:10.1158/1078-0432.CCR-23-2513)
10. Abstract OT1-05-02: A phase II study to evaluate the efficacy, safety and pharmacokinetics of DHP107 (Liporaxel®, oral paclitaxel) compared to IV paclitaxel in patients with recurrent or metastatic breast cancer: OPERA (NCT03326102) — 2020, Cancer Research (DOI:10.1158/1538-7445.SABCS19-OT1-05-02)

### Engine B — top 10
1. Omitting Regional Nodal Irradiation after Response to Neoadjuvant Chemotherapy. — 2025, N Engl J Med (PMID:40466065 DOI:10.1056/NEJMoa2414859)
2. Prospective observational study of bevacizumab combined with paclitaxel as first- or second-line chemotherapy for locally advanced or metastatic breast cancer: the JBCRG-C05 (B-SHARE) study. — 2021, Breast Cancer (PMID:32715420 DOI:10.1007/s12282-020-01138-4)
3. Mitigating Anthracycline-Induced Cardiac Toxicity With Dapagliflozin: A Randomized, Double-Blind, Placebo-Controlled Trial of 10 mg Daily for Four Months — 2024, Hawler Medical University (— no id —)
4. Radiomics-based Machine Learning Prediction of Neoadjuvant Chemotherapy Response in Breast Cancer Using Physiologically Decomposed Diffusion-weighted MRI. — 2025, Radiol Imaging Cancer (PMID:40679371 DOI:10.1148/rycan.240312)
5. Nomogram for Predicting Neoadjuvant Chemotherapy Response in Breast Cancer Using MRI-based Intratumoral Heterogeneity Quantification. — 2025, Radiology (PMID:40232145 DOI:10.1148/radiol.241805)
6. Intratumoral Spatial Heterogeneity at Perfusion MR Imaging Predicts Recurrence-free Survival in Locally Advanced Breast Cancer Treated with Neoadjuvant Chemotherapy. — 2018, Radiology (PMID:29714680 DOI:10.1148/radiol.2018172462)
7. Calcifications Affect Pathologic Complete Response and MRI Prediction after Neoadjuvant Chemotherapy in Human Epidermal Growth Factor Receptor 2-positive Breast Cancer. — 2025, Radiology (PMID:40923884 DOI:10.1148/radiol.250718)
8. Molecular Biomarkers for Prediction of Targeted Therapy Response in Metastatic Breast Cancer: Trick or Treat? — 2017, Int J Mol Sci (PMID:28054957 DOI:10.3390/ijms18010085)
9. Predicting Breast Cancer Pathologic Complete Response after Neoadjuvant Chemotherapy Using Bimodal US and MRI. — 2025, Radiol Imaging Cancer (PMID:41104975 DOI:10.1148/rycan.240493)
10. Bisphosphonates and breast cancer prevention. — 2012, Anticancer Agents Med Chem (PMID:21864227 DOI:10.2174/187152012799014913)

---

## Query: `negctrl-recovery-orthopedics` — "RECOVERY trial enhanced recovery after hip replacement surgery"
Category: negative_control. Intent: The landmark RECOVERY platform trial is about COVID-19 therapeutics (dexamethasone, tocilizumab), NOT orthopedic enhanced-recovery-after-surgery protocols.

### Engine A — top 10
1. ENhanced Recovery and ABbreviated LEngth of Anticoagulation for Thromboprophylaxis After Primary Hip Arthroplasty — 2024, Johannes Gutenberg University Mainz (— no id —)
2. Opioid-free versus opioid-sparing anaesthesia in ambulatory total hip arthroplasty: a randomised controlled trial. — 2024, Br J Anaesth (PMID:38044236 DOI:10.1016/j.bja.2023.10.031)
3. Effectiveness of Neuromuscular Electrical Stimulation for Enhanced Recovery After Total Hip Replacement Surgery: A Randomized Controlled Trial. — 2022, Geriatr Orthop Surg Rehabil (PMID:36177369 DOI:10.1177/21514593221129528)
4. Prospective Randomized Controlled Trial of Impact of Enhanced Recovery After Surgery(ERAS) for Outcomes of Total Knee and Hip Arthroplasty — 2019, Yonsei University (— no id —)
5. Enhanced Recovery After Surgery (ERAS) Pathway for Primary Hip and Knee Arthroplasty: a Prospective, Controlled, Randomized Clinical Trial — 2021, West China Hospital (— no id —)
6. [Fast-Track-Arthroplasty]. — 2024, Orthopadie (Heidelb) (PMID:38226987 DOI:10.1007/s00132-023-04465-4)
7. Enhanced recovery after surgery (ERAS) pathway for primary hip and knee arthroplasty: study protocol for a randomized controlled trial. — 2019, Trials (PMID:31640757 DOI:10.1186/s13063-019-3706-8)
8. Enhanced recovery after surgery: nursing strategy for total hip arthroplasty in older adult patients. — 2025, BMC Geriatr (PMID:40281425 DOI:10.1186/s12877-025-05888-8)
9. Recovery and the use of postoperative physical therapy after total hip or knee replacement. — 2022, BMC Musculoskelet Disord (PMID:35831841 DOI:10.1186/s12891-022-05429-z)
10. Feasibility of the Hip Instructional Prehabilitation Program for Enhanced Recovery (HIPPER) Intervention Protocol: An eHealth Approach for Pre-surgical Hip Replacement Education — 2021, University of British Columbia (— no id —)

### Engine B — top 10
1. Enhanced recovery after surgery for hip and knee arthroplasty: a systematic review and meta-analysis — 2017, Postgraduate medical journal (PMID:28751437 DOI:10.1136/postgradmedj-2017-134991)
2. Enhanced Recovery after arthroplasty surgery — 2020, Acta Orthopaedica (PMID:32406307 DOI:10.1080/17453674.2020.1763565)
3. Impact of enhanced recovery after surgery on postoperative recovery after joint arthroplasty: results from a systematic review and meta-analysis — 2018, Postgraduate medical journal (PMID:30665908 DOI:10.1136/postgradmedj-2018-136166)
4. Reduced short-term complications and mortality following Enhanced Recovery primary hip and knee arthroplasty: results from 6,000 consecutive procedures — 2014, Acta Orthopaedica (PMID:24359028 DOI:10.3109/17453674.2013.874925)
5. Enhanced recovery program for hip and knee replacement reduces death rate — 2011, Acta Orthopaedica (PMID:21895500 DOI:10.3109/17453674.2011.618911)
6. Does implementation of an enhanced recovery after surgery program for hip replacement improve quality of recovery in an Australian private hospital: a quality improvement study — 2018, BMC Anesthesiology (PMID:29898653 DOI:10.1186/s12871-018-0525-5)
7. Effect of Enhanced Recovery After Surgery on the Prognosis of Patients With Hip Fractures: A Systematic Review and Meta-Analysis — 2023, Journal of Trauma Nursing (PMID:37702730 DOI:10.1097/JTN.0000000000000741)
8. Enhanced recovery programmes after total hip arthroplasty can result in reduced length of hospital stay without compromising functional outcome. — 2016, The Bone & Joint Journal (PMID:27037429 DOI:10.1302/0301-620X.98B4.36243)
9. IMPLEMENTING A MULTIMODAL ENHANCED RECOVERY PATHWAY FOR ELECTIVE TOTAL HIP REPLACEMENT UTILISING PRE-OPERATIVE NUTRITION AND ROPIVACAINE, KETOROLAC AND ADRENALINE (RKA) INJECTION — 2013, Journal of Bone and Joint Surgery-british Volume (— no id —)
10. Enhanced Recovery After Surgery for Hip and Knee Replacements. — 2017, Orthopedic Nursing (PMID:28538534 DOI:10.1097/NOR.0000000000000351)

---
