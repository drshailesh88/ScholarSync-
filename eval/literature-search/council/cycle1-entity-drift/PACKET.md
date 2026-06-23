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
1. Short- and intermediate-term outcomes of transcatheter aortic valve replacement in low-risk patients: A meta-analysis and systematic review. — 2024, Int J Cardiol Heart Vasc (PMID:39045569 DOI:10.1016/j.ijcha.2024.101458)
2. Six-Year Outcomes After Transcatheter vs Surgical Aortic Valve Replacement in Low-Risk Patients With Aortic Stenosis. — 2026, J Am Coll Cardiol (PMID:41697183 DOI:10.1016/j.jacc.2026.02.5063)
3. TAVR in Low-Risk Patients: 1-Year Results From the LRT Trial. — 2019, JACC Cardiovasc Interv (PMID:30860059 DOI:10.1016/j.jcin.2019.03.002)
4. Transcatheter vs Surgical Aortic Valve Replacement in Lower-Risk Patients: An Updated Meta-Analysis of Randomized Controlled Trials. — 2025, J Am Coll Cardiol (PMID:40044297 DOI:10.1016/j.jacc.2024.12.031)
5. Three-Year Follow-Up of the NOTION-2 Trial: TAVR Versus SAVR to Treat Younger Low-Risk Patients With Tricuspid or Bicuspid Aortic Stenosis. — 2025, Circulation (PMID:40884768 DOI:10.1161/CIRCULATIONAHA.125.076678)
6. Minimally invasive surgery versus transcatheter aortic valve replacement: a systematic review and meta-analysis. — 2021, Open Heart (PMID:33455914 DOI:10.1136/openhrt-2020-001535)
7. Transcatheter aortic valve replacement in low-risk patients: an updated meta-analysis of randomized controlled trials. — 2025, Int J Cardiol Heart Vasc (PMID:40453067 DOI:10.1016/j.ijcha.2025.101692)
8. Updated 5-year outcomes of transcatheter versus surgical aortic valve replacement in patients with severe aortic stenosis at low- to intermediate-surgical risk. — 2026, Heart (PMID:41672766 DOI:10.1136/heartjnl-2025-327092)
9. Transcatheter Aortic-Valve Replacement in Low-Risk Patients at Five Years. — 2023, N Engl J Med (PMID:37874020 DOI:10.1056/NEJMoa2307447)
10. Transcatheter versus surgical aortic valve replacement in low- to intermediate-risk patients: a meta-analysis of reconstructed time-to-event data. — 2025, Ann Cardiothorac Surg (PMID:40270848 DOI:10.21037/acs-2024-etavr-0096)

---

## Query: `exact-dapa-hf` — "Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction"
Category: exact_paper. Intent: Retrieve the exact DAPA-HF primary results paper by its title.

**Must-have landmark papers (ground truth):**
- DAPA-HF (McMurray, NEJM 2019)

### Engine A — top 10
1. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction. — 2019, N Engl J Med (PMID:31535829 DOI:10.1056/NEJMoa1911303)
2. SGLT2 inhibitors in patients with heart failure with reduced ejection fraction: a meta-analysis of the EMPEROR-Reduced and DAPA-HF trials. — 2020, Lancet (PMID:32877652 DOI:10.1016/S0140-6736(20)31824-9)
3. Time to Clinical Benefit of Dapagliflozin and Significance of Prior Heart Failure Hospitalization in Patients With Heart Failure With Reduced Ejection Fraction. — 2021, JAMA Cardiol (PMID:33595593 DOI:10.1001/jamacardio.2020.7585)
4. Dapagliflozin Effects on Biomarkers, Symptoms, and Functional Status in Patients With Heart Failure With Reduced Ejection Fraction: The DEFINE-HF Trial. — 2019, Circulation (PMID:31524498 DOI:10.1161/CIRCULATIONAHA.119.042929)
5. Effect of Dapagliflozin on Worsening Heart Failure and Cardiovascular Death in Patients With Heart Failure With and Without Diabetes — 2020, JAMA (PMID:32219386 DOI:10.1001/jama.2020.1906)
6. Cardiovascular and Renal Outcomes with Empagliflozin in Heart Failure — 2020, New England Journal of Medicine (PMID:32865377 DOI:10.1056/nejmoa2022190)
7. Natriuretic Peptides, Kidney Function,&#xa0;and Clinical Outcomes in Heart&#xa0;Failure&#xa0;With Preserved Ejection&#xa0;Fraction. — 2025, JACC Heart Fail (PMID:39365237 DOI:10.1016/j.jchf.2024.08.009)
8. A Trial to Evaluate the Effect of the Sodium–Glucose Co-Transporter 2 Inhibitor Dapagliflozin on Morbidity and Mortality in Patients with Heart Failure and Reduced Left Ventricular Ejection Fraction (DAPA-HF) — 2019, European Journal of Heart Failure (PMID:30895697 DOI:10.1002/ejhf.1432)
9. Highlights in heart failure. — 2019, ESC Heart Fail (PMID:31997538 DOI:10.1002/ehf2.12555)
10. Dapagliflozin in heart failure with preserved and mildly reduced ejection fraction: rationale and design of the DELIVER trial. — 2021, Eur J Heart Fail (PMID:34051124 DOI:10.1002/ejhf.2249)

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
1. Lecanemab in Early Alzheimer’s Disease — 2022, New England Journal of Medicine (PMID:36449413 DOI:10.1056/nejmoa2212948)
2. Aging modulates amyloid clearance kinetics during anti-amyloid therapy: evidence from real-world serial amyloid PET. — 2026, Front Aging Neurosci (PMID:42182561 DOI:10.3389/fnagi.2026.1801267)
3. Non-Cognitive Symptoms in Alzheimer’s Disease and Their Likely Impact on Patient Outcomes. A Scoping Review — 2025, Current Treatment Options in Neurology (PMID:41536422 DOI:10.1007/s11940-025-00852-8)
4. Lecanemab in patients with early Alzheimer’s disease: detailed results on biomarker, cognitive, and clinical effects from the randomized and open-label extension of the phase 2 proof-of-concept study — 2022, Alzheimer s Research & Therapy (PMID:36544184 DOI:10.1186/s13195-022-01124-2)
5. Lecanemab Reduces Neuropsychiatric Symptoms and Related Regional Brain Amyloid Load in Early Alzheimer's Disease: A Preliminary Prospective Study. — 2026, CNS Neurosci Ther (PMID:42277629 DOI:10.1002/cns.70974)
6. Critical assessment of anti-amyloid-β monoclonal antibodies effects in Alzheimer’s disease: a systematic review and meta-analysis highlighting target engagement and clinical meaningfulness — 2024, Scientific Reports (PMID:39468148 DOI:10.1038/s41598-024-75204-8)
7. From clinical trial to clinical experience: Lecanemab therapy in a real-world case series. — 2026, Alzheimers Dement (Amst) (PMID:42255952 DOI:10.1002/dad2.70365)
8. Neuroinflammation-centered pathophysiology and therapeutic strategy design in Alzheimer's disease: Cutting-edge developments. — 2026, Cell Signal (PMID:42331203 DOI:10.1016/j.cellsig.2026.112689)
9. Lecanemab in Clinical Practice: Real-World Treatment Outcomes from a Retrospective Neurological Clinic Case Series Review in Early Alzheimer’s Disease (P12-3.008) — 2025, Neurology (DOI:10.1212/wnl.0000000000211951)
10. Quantitative AV-45 PET imaging for assessing treatment response to lecanemab and deep cervical lymphatic-venous anastomosis in Alzheimer's disease. — 2026, Nucl Med Commun (PMID:42199075 DOI:10.1097/MNM.0000000000002184)

---

## Query: `pico-sglt2-cv-mortality` — "In adults with type 2 diabetes, do SGLT2 inhibitors compared to placebo reduce cardiovascular mortality?"
Category: pico. Intent: P=T2DM, I=SGLT2i, C=placebo, O=CV mortality. Expect CVOT RCTs + meta-analyses.

### Engine A — top 10
1. Effect of SGLT2 inhibitors on cardiovascular, renal and safety outcomes in patients with type 2 diabetes mellitus and chronic kidney disease: A systematic review and meta-analysis. — 2019, Diabetes Obes Metab (PMID:30697905 DOI:10.1111/dom.13648)
2. Impact of diabetes on the effects of sodium glucose co-transporter-2 inhibitors on kidney outcomes: collaborative meta-analysis of large placebo-controlled trials. — 2022, Lancet (PMID:36351458 DOI:10.1016/S0140-6736(22)02074-8)
3. Sodium-glucose cotransporter protein-2 (SGLT-2) inhibitors and glucagon-like peptide-1 (GLP-1) receptor agonists for type 2 diabetes: systematic review and network meta-analysis of randomised controlled trials. — 2021, BMJ (PMID:33441402 DOI:10.1136/bmj.m4573)
4. Association of SGLT2 Inhibitors With Cardiovascular and Kidney Outcomes in Patients With Type 2 Diabetes: A Meta-analysis. — 2021, JAMA Cardiol (PMID:33031522 DOI:10.1001/jamacardio.2020.4511)
5. Effect of SGLT2 inhibitors on heart failure outcomes and cardiovascular death across the cardiometabolic disease spectrum: a systematic review and meta-analysis. — 2024, Lancet Diabetes Endocrinol (PMID:38768620 DOI:10.1016/S2213-8587(24)00102-5)
6. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction. — 2019, N Engl J Med (PMID:31535829 DOI:10.1056/NEJMoa1911303)
7. Oral Semaglutide and Cardiovascular Outcomes in People With Type 2 Diabetes, According to SGLT2i Use: Prespecified Analyses of the SOUL Randomized Trial. — 2025, Circulation (PMID:40156843 DOI:10.1161/CIRCULATIONAHA.125.074545)
8. Effects of empagliflozin on progression of chronic kidney disease: a prespecified secondary analysis from the empa-kidney trial. — 2024, Lancet Diabetes Endocrinol (PMID:38061371 DOI:10.1016/S2213-8587(23)00321-2)
9. Canagliflozin and Renal Outcomes in Type 2 Diabetes and Nephropathy. — 2019, N Engl J Med (PMID:30990260 DOI:10.1056/NEJMoa1811744)
10. Pharmacological selectivity of SGLT2 inhibitors and cardiovascular outcomes in patients with type 2 diabetes: a meta-analysis — 2022, European Heart Journal (DOI:10.1093/eurheartj/ehac544.2688)

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

### Engine B — top 10
1. 2016 ESC Guidelines for the management of atrial fibrillation developed in collaboration with EACTS. — 2016, Eur Heart J (PMID:27567408 DOI:10.1093/eurheartj/ehw210)
2. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS): The Task Force for the diagnosis and management of atrial fibrillation of the European Society of Cardiology (ESC) Developed with the special contribution of the European Heart Rhythm Association (EHRA) of the ESC. — 2021, Eur Heart J (PMID:32860505 DOI:10.1093/eurheartj/ehaa612)
3. Guidelines for the management of atrial fibrillation: the Task Force for the Management of Atrial Fibrillation of the European Society of Cardiology (ESC). — 2010, Eur Heart J (PMID:20802247 DOI:10.1093/eurheartj/ehq278)
4. Corrigendum to: 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS): The Task Force for the diagnosis and management of atrial fibrillation of the European Society of Cardiology (ESC) Developed with the special contribution of the European Heart Rhythm Association (EHRA) of the ESC — 2021, European Heart Journal (DOI:10.1093/eurheartj/ehab648)
5. 2024 ESC Guidelines for the management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS). — 2024, Eur Heart J (PMID:39210723 DOI:10.1093/eurheartj/ehae176)
6. ACC/AHA/ESC 2006 Guidelines for the Management of Patients With Atrial Fibrillation—Executive Summary — 2006, Journal of the American College of Cardiology (PMID:16904574 DOI:10.1016/j.jacc.2006.07.009)
7. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure — 2021, European Heart Journal (PMID:34447992 DOI:10.1093/eurheartj/ehab368)
8. ACC/AHA/ESC 2006 Guidelines for the Management of Patients With Atrial Fibrillation — 2006, Circulation (PMID:16908781 DOI:10.1161/circulationaha.106.177292)
9. ‘Ten Commandments’ of 2016 ESC Guidelines for the management of atrial fibrillation — 2016, European Heart Journal (PMID:27923817 DOI:10.1093/eurheartj/ehw370)
10. ACC/AHA/ESC guidelines for the management of patients with supraventricular arrhythmias∗∗This document does not cover atrial fibrillation; atrial fibrillation is covered in the ACC/AHA/ESC guidelines on the management of patients with atrial fibrillation found on the ACC, AHA, and ESC Web sites.—executive summary — 2003, Journal of the American College of Cardiology (PMID:14563598 DOI:10.1016/j.jacc.2003.08.013)

---

## Query: `compare-doac-vs-warfarin` — "DOACs versus warfarin for stroke prevention in atrial fibrillation"
Category: therapy_comparison. Intent: DOAC vs warfarin efficacy/safety in AF (RE-LY/ROCKET-AF/ARISTOTLE/ENGAGE + meta-analysis).

### Engine A — top 10
1. Direct Oral Anticoagulants Versus Warfarin in Patients With Atrial Fibrillation: Patient-Level Network Meta-Analyses of Randomized Clinical Trials With Interaction Testing by Age and Sex. — 2022, Circulation (PMID:34985309 DOI:10.1161/CIRCULATIONAHA.121.056355)
2. Oral anticoagulants for prevention of stroke in atrial fibrillation: systematic review, network meta-analysis, and cost effectiveness analysis. — 2017, BMJ (PMID:29183961 DOI:10.1136/bmj.j5058)
3. Direct oral anticoagulants vs warfarin in non-valvular atrial fibrillation. Meta-analysis, includes all published trials — 2021, European Heart Journal (DOI:10.1093/eurheartj/ehab724.0343)
4. Direct oral anticoagulants for stroke prevention in patients with device-detected atrial fibrillation: assessing net clinical benefit — 2024, European Heart Journal Supplements (PMID:39099575 DOI:10.1093/eurheartjsupp/suae075)
5. Continued vs. interrupted direct oral anticoagulants at the time of device surgery, in patients with moderate to high risk of arterial thrombo-embolic events (BRUISE CONTROL-2). — 2018, Eur Heart J (PMID:30462279 DOI:10.1093/eurheartj/ehy413)
6. Efficacy and Safety of Direct Oral Anticoagulants (DOACs) Versus Warfarin in Atrial Fibrillation Patients with Prior Stroke: a Systematic Review and Meta-analysis. — 2023, Cardiovasc Drugs Ther (PMID:35467313 DOI:10.1007/s10557-022-07336-w)
7. Rationale and design of a randomized study comparing the Watchman FLX device to DOACs in patients with atrial fibrillation. — 2023, Am Heart J (PMID:37279840 DOI:10.1016/j.ahj.2023.05.022)
8. Risks and benefits of direct oral anticoagulants versus warfarin in a real world setting: cohort study in primary care — 2018, BMJ (PMID:29973392 DOI:10.1136/bmj.k2505)
9. Association of Alternative Anticoagulation Strategies and Outcomes in Patients With Ischemic Stroke While Taking a Direct Oral Anticoagulant. — 2023, Neurology (PMID:37225430 DOI:10.1212/WNL.0000000000207422)
10. Oral Anticoagulant Agents in Patients With Atrial Fibrillation and CKD: A Systematic Review and Pairwise Network Meta-analysis. — 2021, Am J Kidney Dis (PMID:33872690 DOI:10.1053/j.ajkd.2021.02.328)

### Engine B — top 10
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

---

## Query: `exact-recovery-dex` — "Dexamethasone in Hospitalized Patients with Covid-19 RECOVERY"
Category: exact_paper. Intent: Retrieve the RECOVERY dexamethasone primary results paper.

**Must-have landmark papers (ground truth):**
- RECOVERY dexamethasone (Horby, NEJM 2021 / medRxiv 2020)

### Engine A — top 10
1. Dexamethasone in Hospitalized Patients with Covid-19. — 2021, N Engl J Med (PMID:32678530 DOI:10.1056/NEJMoa2021436)
2. Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial — 2021, The Lancet (PMID:33933206 DOI:10.1016/s0140-6736(21)00676-0)
3. Dexamethasone vs methylprednisolone high dose for Covid-19 pneumonia. — 2021, PLoS One (PMID:34033648 DOI:10.1371/journal.pone.0252057)
4. Higher dose corticosteroids in patients admitted to hospital with COVID-19 who are hypoxic but not requiring ventilatory support (RECOVERY): a randomised, controlled, open-label, platform trial. — 2023, Lancet (PMID:37060915 DOI:10.1016/S0140-6736(23)00510-X)
5. Lopinavir–ritonavir in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial — 2020, The Lancet (PMID:33031764 DOI:10.1016/s0140-6736(20)32013-4)
6. Low-dose versus high-dose dexamethasone for hospitalized patients with COVID-19 pneumonia: A randomized clinical trial — 2022, PLoS ONE (PMID:36190994 DOI:10.1371/journal.pone.0275217)
7. Dexamethasone for Inpatients With COVID-19 in a National Cohort — 2023, JAMA Network Open (PMID:37067800 DOI:10.1001/jamanetworkopen.2023.8516)
8. Pathophysiology, Transmission, Diagnosis, and Treatment of Coronavirus Disease 2019 (COVID-19): A Review. — 2020, JAMA (PMID:32648899 DOI:10.1001/jama.2020.12839)
9. Association Between Dexamethasone Treatment After Hospital Discharge for Patients With COVID-19 Infection and Rates of Hospital Readmission and Mortality — 2022, JAMA Network Open (PMID:35258575 DOI:10.1001/jamanetworkopen.2022.1455)
10. Effect of Dexamethasone in Hospitalized Patients with COVID-19 – Preliminary Report — 2020, medRxiv (DOI:10.1101/2020.06.22.20137273)

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

### Engine B — top 10
1. Pembrolizumab plus Chemotherapy in Metastatic Non-Small-Cell Lung Cancer. — 2018, N Engl J Med (PMID:29658856 DOI:10.1056/NEJMoa1801005)
2. Pembrolizumab plus Chemotherapy for Squamous Non-Small-Cell Lung Cancer. — 2018, N Engl J Med (PMID:30280635 DOI:10.1056/NEJMoa1810865)
3. Five-Year Outcomes With Pembrolizumab Versus Chemotherapy for Metastatic Non–Small-Cell Lung Cancer With PD-L1 Tumor Proportion Score ≥ 50% — 2021, Journal of Clinical Oncology (PMID:33872070 DOI:10.1200/jco.21.00174)
4. First-line Pembrolizumab Versus Pembrolizumab Plus Chemotherapy Versus Chemotherapy Alone in Non-small-cell Lung Cancer: A Systematic Review and Network Meta-analysis. — 2019, Clin Lung Cancer (PMID:31164319 DOI:10.1016/j.cllc.2019.05.009)
5. Patient-reported outcomes following pembrolizumab or placebo plus pemetrexed and platinum in patients with previously untreated, metastatic, non-squamous non-small-cell lung cancer (KEYNOTE-189): a multicentre, double-blind, randomised, placebo-controlled, phase 3 trial. — 2020, Lancet Oncol (PMID:32035514 DOI:10.1016/S1470-2045(19)30801-0)
6. Randomized clinical trial of pembrolizumab vs chemotherapy for previously untreated Chinese patients with PD-L1-positive locally advanced or metastatic non-small-cell lung cancer: KEYNOTE-042 China Study. — 2021, Int J Cancer (PMID:33231285 DOI:10.1002/ijc.33399)
7. Pembrolizumab Plus Chemotherapy in Squamous Non-Small-Cell Lung Cancer: 5-Year Update of the Phase III KEYNOTE-407 Study. — 2023, J Clin Oncol (PMID:36735893 DOI:10.1200/JCO.22.01990)
8. Pembrolizumab with or without radiotherapy for metastatic non-small-cell lung cancer: a pooled analysis of two randomised trials. — 2021, Lancet Respir Med (PMID:33096027 DOI:10.1016/S2213-2600(20)30391-X)
9. Pembrolizumab plus chemotherapy in Japanese patients with metastatic squamous non-small-cell lung cancer in KEYNOTE-407. — 2023, Cancer Sci (PMID:37183528 DOI:10.1111/cas.15816)
10. Updated Analysis From KEYNOTE-189: Pembrolizumab or Placebo Plus Pemetrexed and Platinum for Previously Untreated Metastatic Nonsquamous Non-Small-Cell Lung Cancer. — 2020, J Clin Oncol (PMID:32150489 DOI:10.1200/JCO.19.03136)

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
1. SGLT2 inhibitors in patients with heart failure with reduced ejection fraction: a meta-analysis of the EMPEROR-Reduced and DAPA-HF trials. — 2020, Lancet (PMID:32877652 DOI:10.1016/S0140-6736(20)31824-9)
2. A Trial to Evaluate the Effect of the Sodium–Glucose Co-Transporter 2 Inhibitor Dapagliflozin on Morbidity and Mortality in Patients with Heart Failure and Reduced Left Ventricular Ejection Fraction (DAPA-HF) — 2019, European Journal of Heart Failure (PMID:30895697 DOI:10.1002/ejhf.1432)
3. Effect of Dapagliflozin on Health Status and Quality of Life Across the Spectrum of Ejection Fraction: Participant-Level Pooled Analysis from the DAPA-HF and DELIVER Trials — 2023, European Journal of Heart Failure (PMID:37211977 DOI:10.1002/ejhf.2909)
4. SGLT-2 inhibitors in patients with heart failure: a comprehensive meta-analysis of five randomised controlled trials. — 2022, Lancet (PMID:36041474 DOI:10.1016/S0140-6736(22)01429-5)
5. Effects of dapagliflozin in DAPA-HF according to background heart failure therapy — 2020, European Heart Journal (PMID:32221582 DOI:10.1093/eurheartj/ehaa183)
6. Iron Deficiency in Heart Failure and Effect of Dapagliflozin: Findings From DAPA-HF. — 2022, Circulation (PMID:35971840 DOI:10.1161/CIRCULATIONAHA.122.060511)
7. Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction. — 2019, N Engl J Med (PMID:31535829 DOI:10.1056/NEJMoa1911303)
8. Serial Assessment of High-Sensitivity Cardiac Troponin and the Effect of Dapagliflozin in Patients With Heart Failure With Reduced Ejection Fraction: An Analysis of the DAPA-HF Trial — 2021, Circulation (PMID:34743554 DOI:10.1161/circulationaha.121.057852)
9. Highlights in heart failure. — 2019, ESC Heart Fail (PMID:31997538 DOI:10.1002/ehf2.12555)
10. Efficacy and Safety of Dapagliflozin in Heart Failure With Reduced Ejection Fraction According to N-Terminal Pro-B-Type Natriuretic Peptide: Insights From the DAPA-HF Trial — 2021, Circulation Heart Failure (PMID:34802253 DOI:10.1161/circheartfailure.121.008837)

---

## Query: `acronym-partner-3` — "PARTNER 3 trial"
Category: trial_acronym. Intent: Resolve PARTNER 3 to the balloon-expandable TAVR low-risk RCT and its follow-ups.

**Must-have landmark papers (ground truth):**
- PARTNER 3 (Mack/Leon, NEJM 2019)

### Engine A — top 10
1. Guidelines for Inclusion of Patient-Reported Outcomes in Clinical Trial Protocols — 2018, JAMA (PMID:29411037 DOI:10.1001/jama.2017.21903)
2. Economic Outcomes of Transcatheter Versus Surgical Aortic Valve Replacement in Patients with Severe Aortic Stenosis and Low Surgical Risk: Results from the PARTNER 3 Trial. — 2023, Circulation (PMID:37154049 DOI:10.1161/CIRCULATIONAHA.122.062481)
3. Late Clinical Outcomes of Balloon-Expandable Valves in Small&#xa0;Annuli: Results From the PARTNER Trials. — 2025, JACC Cardiovasc Interv (PMID:40010919 DOI:10.1016/j.jcin.2024.11.006)
4. 5-Year Echocardiographic Results of Transcatheter Versus Surgical Aortic Valve Replacement in Low-Risk Patients. — 2025, JACC Cardiovasc Imaging (PMID:40243974 DOI:10.1016/j.jcmg.2025.01.015)
5. The Impact of Preventive Interventions on Intimate Partner Violence among Pregnant Women Resident in Hamadan City Slum Areas Using the PEN-3 Model: Control Randomized Trial Study — 2021, Korean Journal of Family Medicine (PMID:34871484 DOI:10.4082/kjfm.20.0118)
6. Aortic Valve Replacement in Women: A Pooled Analysis of the RHEIA and PARTNER 3 Trials. — 2025, JACC Cardiovasc Interv (PMID:40562469 DOI:10.1016/j.jcin.2025.03.036)
7. Five- Year Outcomes in Low-Risk Patients Undergoing Surgery in the PARTNER 3 Trial. — 2025, Ann Thorac Surg (PMID:39694217 DOI:10.1016/j.athoracsur.2024.11.025)
8. Transcatheter or Surgical Aortic-Valve Replacement in Low-Risk Patients at 7 Years. — 2026, N Engl J Med (PMID:41144631 DOI:10.1056/NEJMoa2509766)
9. Transcatheter Aortic-Valve Replacement with a Balloon-Expandable Valve in Low-Risk Patients. — 2019, N Engl J Med (PMID:30883058 DOI:10.1056/NEJMoa1814052)
10. The impact of advance care planning on end of life care in elderly patients: randomised controlled trial — 2010, BMJ (PMID:20332506 DOI:10.1136/bmj.c1345)

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
1. Patient-reported outcomes following pembrolizumab or placebo plus pemetrexed and platinum in patients with previously untreated, metastatic, non-squamous non-small-cell lung cancer (KEYNOTE-189): a multicentre, double-blind, randomised, placebo-controlled, phase 3 trial. — 2020, Lancet Oncol (PMID:32035514 DOI:10.1016/S1470-2045(19)30801-0)
2. Updated Analysis From KEYNOTE-189: Pembrolizumab or Placebo Plus Pemetrexed and Platinum for Previously Untreated Metastatic Nonsquamous Non-Small-Cell Lung Cancer. — 2020, J Clin Oncol (PMID:32150489 DOI:10.1200/JCO.19.03136)
3. Pembrolizumab plus pemetrexed-platinum for metastatic nonsquamous non-small-cell lung cancer: KEYNOTE-189 Japan Study. — 2021, Cancer Sci (PMID:34036692 DOI:10.1111/cas.14980)
4. Pembrolizumab Plus Pemetrexed and Platinum in Nonsquamous Non-Small-Cell Lung Cancer: 5-Year Outcomes From the Phase 3 KEYNOTE-189 Study. — 2023, J Clin Oncol (PMID:36809080 DOI:10.1200/JCO.22.01989)
5. Abstract CT043: Outcomes among patients (pts) with metastatic nonsquamous NSCLC with liver metastases or brain metastases treated with pembrolizumab (pembro) plus pemetrexed-platinum: Results from the KEYNOTE-189 study — 2019, Cancer Research (DOI:10.1158/1538-7445.am2019-ct043)
6. Pemetrexed plus platinum with or without pembrolizumab in patients with previously untreated metastatic nonsquamous NSCLC: protocol-specified final analysis from KEYNOTE-189. — 2021, Ann Oncol (PMID:33894335 DOI:10.1016/j.annonc.2021.04.008)
7. Final analysis of KEYNOTE-189: Pemetrexed-platinum chemotherapy (chemo) with or without pembrolizumab (pembro) in patients (pts) with previously untreated metastatic nonsquamous non-small cell lung cancer (NSCLC). — 2020, Journal of Clinical Oncology (DOI:10.1200/jco.2020.38.15_suppl.9582)
8. Safety of pemetrexed plus platinum in combination with pembrolizumab for metastatic nonsquamous non-small cell lung cancer: A post hoc analysis of KEYNOTE-189. — 2021, Lung Cancer (PMID:33730652 DOI:10.1016/j.lungcan.2021.02.021)
9. KEYNOTE-189: Updated OS and progression after the next line of therapy (PFS2) with pembrolizumab (pembro) plus chemo with pemetrexed and platinum vs placebo plus chemo for metastatic nonsquamous NSCLC. — 2019, Journal of Clinical Oncology (DOI:10.1200/jco.2019.37.15_suppl.9013)
10. Abstract CT075: KEYNOTE-189: Randomized, double-blind, phase 3 study of pembrolizumab (pembro) or placebo plus pemetrexed (pem) and platinum as first-line therapy for metastatic NSCLC — 2018, Cancer Research (DOI:10.1158/1538-7445.am2018-ct075)

### Engine B — top 10
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

---

## Query: `acronym-sprint` — "SPRINT trial intensive blood pressure control"
Category: trial_acronym. Intent: Resolve SPRINT to the intensive vs standard BP RCT (and final report).

**Must-have landmark papers (ground truth):**
- SPRINT (Wright, NEJM 2015) / final report (NEJM 2021)

### Engine A — top 10
1. Effect of Standard vs Intensive Blood Pressure Control on the Risk of Recurrent Stroke: A Randomized Clinical Trial and Meta-analysis. — 2019, JAMA Neurol (PMID:31355878 DOI:10.1001/jamaneurol.2019.2167)
2. Intensive vs Standard Blood Pressure Control and Cardiovascular Disease Outcomes in Adults Aged &#x2265;75 Years: A Randomized Clinical Trial. — 2016, JAMA (PMID:27195814 DOI:10.1001/jama.2016.7050)
3. Influence of Baseline Diastolic Blood Pressure on Effects of Intensive Compared With Standard Blood Pressure Control — 2017, Circulation (PMID:29021322 DOI:10.1161/circulationaha.117.030848)
4. The Effect of Frailty on the Efficacy and Safety of Intensive Blood Pressure Control: A Post Hoc Analysis of the SPRINT Trial. — 2023, Circulation (PMID:37401465 DOI:10.1161/CIRCULATIONAHA.123.064003)
5. A Randomized Trial of Intensive versus Standard Blood-Pressure Control — 2016, New England Journal of Medicine (PMID:27276569 DOI:10.1056/nejmc1602668)
6. Intensive Versus Standard Blood Pressure Control in SPRINT-Eligible Participants of ACCORD-BP. — 2017, Diabetes Care (PMID:28947569 DOI:10.2337/dc17-1366)
7. Final Report of a Trial of Intensive versus Standard Blood-Pressure Control. — 2021, N Engl J Med (PMID:34010531 DOI:10.1056/NEJMoa1901281)
8. Benefit-harm trade-offs of intensive blood pressure control versus standard blood pressure control on cardiovascular and renal outcomes: an individual participant data analysis of randomised controlled trials. — 2025, Lancet (PMID:40902616 DOI:10.1016/S0140-6736(25)01391-1)
9. Longer-Term All-Cause and Cardiovascular Mortality With Intensive Blood Pressure Control — 2022, JAMA Cardiology (PMID:36223105 DOI:10.1001/jamacardio.2022.3345)
10. Association of Intensive vs Standard Blood Pressure Control With Cerebral Blood Flow: Secondary Analysis of the SPRINT MIND Randomized Clinical Trial. — 2022, JAMA Neurol (PMID:35254390 DOI:10.1001/jamaneurol.2022.0074)

### Engine B — top 10
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

---

## Query: `broad-hfref-management` — "management of heart failure with reduced ejection fraction"
Category: broad_clinical. Intent: Overview of guideline-directed medical therapy for HFrEF; expect guidelines + landmark RCTs + SRs on top.

### Engine A — top 10
1. Management of heart failure with reduced ejection fraction — 2022, Heart (PMID:35973784 DOI:10.1136/heartjnl-2020-318811)
2. Patiromer for the management of hyperkalemia in heart failure with reduced ejection fraction: the DIAMOND trial — 2022, European Heart Journal (PMID:35900838 DOI:10.1093/eurheartj/ehac401)
3. Clinical management and therapeutic optimization of patients with heart failure with reduced ejection fraction and low blood pressure. A clinical consensus statement of the Heart Failure Association (HFA) of the ESC. — 2025, Eur J Heart Fail (PMID:40012353 DOI:10.1002/ejhf.3618)
4. Heart Failure with Preserved and Reduced Ejection Fraction in Hemodialysis Patients: Prevalence, Disease Prediction and Prognosis — 2017, Kidney & Blood Pressure Research (PMID:28395286 DOI:10.1159/000473868)
5. Epidemiology and one-year outcomes in patients with chronic heart failure and preserved, mid-range and reduced ejection fraction: an analysis of the ESC Heart Failure Long-Term Registry. — 2017, Eur J Heart Fail (PMID:28386917 DOI:10.1002/ejhf.813)
6. The Effect of Digoxin on Mortality and Morbidity in Patients with Heart Failure — 1997, New England Journal of Medicine (PMID:9036306 DOI:10.1056/nejm199702203360801)
7. Heart Failure With Reduced Ejection Fraction — 2020, JAMA (PMID:32749493 DOI:10.1001/jama.2020.10262)
8. Medical Management of Heart Failure With Reduced Ejection Fraction in Patients With Advanced Renal Disease. — 2019, JACC Heart Fail (PMID:31047016 DOI:10.1016/j.jchf.2019.02.009)
9. Management of Atrial Fibrillation Across the Spectrum of Heart Failure With Preserved and Reduced Ejection Fraction — 2022, Circulation (PMID:35877831 DOI:10.1161/circulationaha.122.057444)
10. Editorial: Advanced therapeutic strategies and safety profiles in heart failure with reduced ejection fraction: contextualizing recent findings — 2025, Frontiers in Pharmacology (PMID:40356986 DOI:10.3389/fphar.2025.1607362)

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
1. Outpatient Treatment of Community-Acquired Pneumonia in Adults — 1994, Archives of Internal Medicine (PMID:8053746 DOI:10.1001/archinte.1994.00420160026004)
2. A multicenter, randomized study comparing the efficacy and safety of intravenous and/or oral levofloxacin versus ceftriaxone and/or cefuroxime axetil in treatment of adults with community-acquired pneumonia — 1997, Antimicrobial Agents and Chemotherapy (PMID:9303395 DOI:10.1128/aac.41.9.1965)
3. Ertapenem versus ceftriaxone for the treatment of community-acquired pneumonia in adults: combined analysis of two multicentre randomized, double-blind studies — 2004, Journal of Antimicrobial Chemotherapy (PMID:15150184 DOI:10.1093/jac/dkh207)
4. A Study Evaluating the Efficacy, Safety, and Tolerability of Ertapenem versus Ceftriaxone for the Treatment of Community‐Acquired Pneumonia in Adults — 2002, Clinical Infectious Diseases (PMID:11914996 DOI:10.1086/339543)
5. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America — 2019, American Journal of Respiratory and Critical Care Medicine (PMID:31573350 DOI:10.1164/rccm.201908-1581st)
6. Antibiotic Treatment Strategies for Community-Acquired Pneumonia in Adults — 2015, New England Journal of Medicine (PMID:25830421 DOI:10.1056/nejmoa1406330)
7. Effect of Metagenomic Next-Generation Sequencing on Clinical Outcomes of Patients With Severe Community-Acquired Pneumonia in the ICU: A Multicenter, Randomized Controlled Trial. — 2025, Chest (PMID:39067508 DOI:10.1016/j.chest.2024.07.144)
8. Community‐Acquired Pneumonia in Adults: Guidelines for Management — 1998, Clinical Infectious Diseases (PMID:9564457 DOI:10.1086/513953)
9. Systematic Review and Meta-analysis of the Efficacy of Short-Course Antibiotic Treatments for Community-Acquired Pneumonia in Adults — 2018, Antimicrobial Agents and Chemotherapy (PMID:29987137 DOI:10.1128/aac.00635-18)
10. Effect of hydrocortisone on mortality in patients with severe community-acquired pneumonia : The REMAP-CAP Corticosteroid Domain Randomized Clinical Trial. — 2025, Intensive Care Med (PMID:40261382 DOI:10.1007/s00134-025-07861-w)

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
1. Early, Goal-Directed Therapy for Septic Shock - A Patient-Level Meta-Analysis. — 2017, N Engl J Med (PMID:28320242 DOI:10.1056/NEJMoa1701380)
2. A systematic review and meta-analysis of early goal-directed therapy for septic shock: the ARISE, ProCESS and ProMISe Investigators. — 2015, Intensive Care Med (PMID:25952825 DOI:10.1007/s00134-015-3822-1)
3. Early goal-directed therapy in the management of severe sepsis or septic shock in adults: a meta-analysis of randomized controlled trials. — 2015, BMC Med (PMID:25885654 DOI:10.1186/s12916-015-0312-9)
4. 36th International Symposium on Intensive Care and Emergency Medicine : Brussels, Belgium. 15-18 March 2016. — 2016, Crit Care (PMID:27885969 DOI:10.1186/s13054-016-1208-6)
5. Early goal-directed treatment versus standard care in management of early septic shock: Meta-analysis of randomized trials. — 2016, J Trauma Acute Care Surg (PMID:27602898 DOI:10.1097/TA.0000000000001246)
6. Early goal-directed therapy did not reduce mortality more than usual care in early septic shock — 2015, Annals of Internal Medicine (PMID:25775347 DOI:10.7326/acpjc-2015-162-6-004)
7. Effect of early goal-directed therapy on mortality in patients with severe sepsis or septic shock: a meta-analysis of randomised controlled trials. — 2016, BMJ Open (PMID:26932135 DOI:10.1136/bmjopen-2015-008330)
8. A randomized trial of protocol-based care for early septic shock. — 2014, N Engl J Med (PMID:24635773 DOI:10.1056/NEJMoa1401602)
9. Early goal-directed resuscitation for patients with severe sepsis and septic shock: a meta-analysis and trial sequential analysis. — 2016, Scand J Trauma Resusc Emerg Med (PMID:26946514 DOI:10.1186/s13049-016-0214-7)
10. Early goal-directed therapy versus usual care in the management of septic shock. — 2017, CJEM (PMID:26856422 DOI:10.1017/cem.2016.2)

### Engine B — top 10
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
1. Effect of Conservative vs Conventional Oxygen Therapy on Mortality Among Patients in an Intensive Care Unit — 2016, JAMA (PMID:27706466 DOI:10.1001/jama.2016.11993)
2. Conservative or liberal oxygen therapy in adults after cardiac arrest: An individual-level patient data meta-analysis of randomised controlled trials. — 2020, Resuscitation (PMID:33058991 DOI:10.1016/j.resuscitation.2020.09.036)
3. Effect of liberal or conservative oxygen therapy on the prognosis for mechanically ventilated intensive care unit patients: a meta-analysis. — 2022, Sao Paulo Med J (PMID:35507988 DOI:10.1590/1516-3180.2021.0062.21092021)
4. Conservative or liberal oxygen targets in patients on venoarterial extracorporeal membrane oxygenation. — 2024, Intensive Care Med (PMID:39162827 DOI:10.1007/s00134-024-07564-8)
5. Conservative oxygen therapy for mechanically ventilated adults with suspected hypoxic ischaemic encephalopathy. — 2020, Intensive Care Med (PMID:32809136 DOI:10.1007/s00134-020-06196-y)
6. [Effect of conservative and conventional oxygen therapy on the prognosis of critically ill patients: a Meta-analysis]. — 2019, Zhonghua Wei Zhong Bing Ji Jiu Yi Xue (PMID:30827310 DOI:10.3760/cma.j.issn.2095-4352.2019.02.016)
7. Conservative versus liberal oxygen therapy for critically ill patients: A meta analysis with trial sequential analysis and clinical recommendations — 2025, Journal of Translational Critical Care Medicine (DOI:10.1097/jtccm-d-25-00005)
8. The effect of conservative oxygen therapy on mortality in adult critically ill patients: A systematic review and meta-analysis of randomised controlled trials. — 2023, J Intensive Care Soc (PMID:37841302 DOI:10.1177/17511437231192385)
9. Conservative versus liberal oxygen therapy in relation to all-cause mortality among patients in the intensive care unit: a systematic review of randomized controlled trials with meta-analysis and trial sequential analysis. — 2023, Med Intensiva (Engl Ed) (PMID:35644886 DOI:10.1016/j.medine.2021.08.015)
10. Conservative Oxygen Therapy during Mechanical Ventilation in the ICU — 2019, New England Journal of Medicine (PMID:31613432 DOI:10.1056/nejmoa1903297)

---

## Query: `recency-semaglutide-cv-2025` — "latest 2025 trials semaglutide cardiovascular outcomes"
Category: recency. Intent: Most recent semaglutide CV outcome evidence (SELECT and newer). Newer is better.
_Recency-sensitive: newer high-quality evidence is better._

### Engine A — top 10
1. Cardiometabolic Profiles of Oral and Subcutaneous Glucagon-Like Peptide-1 Receptor Mono-Agonists in Adults With Overweight or Obesity: A Systematic Review and Network Meta-Analysis. — 2026, Diabetes Obes Metab (PMID:41992023 DOI:10.1111/dom.70742)
2. The Impact of GLP-1-Based Therapies on Cardiovascular Outcomes in Type 2 Diabetes: A Comprehensive Systematic Review and Network Meta-Analysis. — 2026, Diabetes Obes Metab (PMID:42219271 DOI:10.1111/dom.70915)
3. Oral Semaglutide and Change in Cardiovascular Risk Factors in High-Risk Type 2 Diabetes: A Post Hoc Secondary Analysis of the SOUL Randomized Clinical Trial. — 2026, JAMA Cardiol (PMID:41879791 DOI:10.1001/jamacardio.2026.0245)
4. Renal Outcomes of GLP-1 Receptor Agonists and Tirzepatide Across CKD Stages and Metabolic Phenotypes (Type&#xa0;2 Diabetes and/or Overweight/Obesity): A Scoping&#xa0;Review. — 2026, Diabetes Ther (PMID:41848820 DOI:10.1007/s13300-026-01854-8)
5. Effect of oral semaglutide on cardiometabolic risk factors in overweight and obese individuals with or without diabetes: a systematic review and meta-analysis. — 2026, BMC Pharmacol Toxicol (PMID:42163419 DOI:10.1186/s40360-026-01149-5)
6. Relative Efficacy of Next-Generation Incretin Therapies for Cardio-Renal Protection in Type 2 Diabetes: Evidence From a Network Meta-Analysis. — 2026, Diabetes Obes Metab (PMID:41804851 DOI:10.1111/dom.70635)
7. Safety of Semaglutide After Dialysis Initiation: An Individual-Level Pooled Analysis. — 2026, Diabetes Care (PMID:41893299 DOI:10.2337/dc26-0112)
8. Clinical Advances in Heart Failure with Preserved Ejection Fraction: A Systematic Review of Therapeutic and Mechanistic Evidence. — 2026, Vasc Health Risk Manag (PMID:41953528 DOI:10.2147/VHRM.S578698)
9. Association of oral semaglutide with cardiovascular outcomes in a real‐world primary prevention population — 2025, Diabetes Obesity and Metabolism (PMID:41457323 DOI:10.1111/dom.70412)
10. Effect of bariatric surgery and pharmacological treatments on cardiovascular risk factors for adults with overweight and obesity: a systematic review and network meta-analysis. — 2026, Int J Surg (PMID:41738616 DOI:10.1097/JS9.0000000000004566)

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
2. CAR-T cell therapy in myeloma: hopes and hurdles — 2023, Blood Science (PMID:37228772 DOI:10.1097/bs9.0000000000000148)
3. A Review of CAR T Cells and Adoptive T-Cell Therapies in Lymphoid and Solid Organ Malignancies. — 2025, Med Sci Monit (PMID:39893510 DOI:10.12659/MSM.948125)
4. Bispecific antibodies and CAR-T cells: dueling immunotherapies for large B-cell lymphomas — 2024, Blood Cancer Journal (PMID:38331870 DOI:10.1038/s41408-024-00997-w)
5. Salvage Therapy in Multiple Myeloma With Prior T-Cell Engager Exposure: Talquetamab, Elranatamab or Teclistamab in Combination With Pomalidomide. — 2026, Eur J Haematol (PMID:41757804 DOI:10.1111/ejh.70151)
6. MicroRNA in cancer therapy: breakthroughs and challenges in early clinical applications — 2025, Journal of Experimental & Clinical Cancer Research (PMID:40259326 DOI:10.1186/s13046-025-03391-x)
7. Resistance Mechanisms to BCMA Targeting Bispecific Antibodies and CAR T-Cell Therapies in Multiple Myeloma — 2025, Cells (PMID:40710330 DOI:10.3390/cells14141077)
8. Recent updates on CAR T clinical trials for multiple myeloma — 2019, Molecular Cancer (PMID:31684964 DOI:10.1186/s12943-019-1092-1)
9. CAR T-cell therapy in multiple myeloma: mission accomplished? — 2023, Blood (PMID:38033289 DOI:10.1182/blood.2023021221)
10. [Current progress and latest therapeutic options in immuno-oncology]. — 2025, Dtsch Med Wochenschr (PMID:41151612 DOI:10.1055/a-2502-1305)

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
1. Comparative effectiveness and safety of statins as a class and of specific statins for primary prevention of cardiovascular disease: A systematic review, meta-analysis, and network meta-analysis of randomized trials with 94,283 participants. — 2019, Am Heart J (PMID:30716508 DOI:10.1016/j.ahj.2018.12.007)
2. Statins and primary prevention of venous thromboembolism: a systematic review and meta-analysis. — 2017, Lancet Haematol (PMID:28089655 DOI:10.1016/S2352-3026(16)30184-3)
3. Associations between statins and adverse events in primary prevention of cardiovascular disease: systematic review with pairwise, network, and dose-response meta-analyses. — 2021, BMJ (PMID:34261627 DOI:10.1136/bmj.n1537)
4. PCSK9 inhibitors and ezetimibe for the reduction of cardiovascular events: a clinical practice guideline with risk-stratified recommendations. — 2022, BMJ (PMID:35508320 DOI:10.1136/bmj-2021-069066)
5. Statins for the primary prevention of cardiovascular disease. — 2013, Cochrane Database Syst Rev (PMID:23440795 DOI:10.1002/14651858.CD004816.pub5)
6. Association Between Lowering LDL-C and Cardiovascular Risk Reduction Among Different Therapeutic Interventions: A Systematic Review and Meta-analysis. — 2016, JAMA (PMID:27673306 DOI:10.1001/jama.2016.13985)
7. Evaluation of Time to Benefit of Statins for the Primary Prevention of Cardiovascular Events in Adults Aged 50 to 75 Years: A Meta-analysis. — 2021, JAMA Intern Med (PMID:33196766 DOI:10.1001/jamainternmed.2020.6084)
8. The Effects of Statins on Cardiovascular and Inflammatory Biomarkers in Primary Prevention: A Systematic Review and Meta-Analysis. — 2023, Heart Lung Circ (PMID:37291001 DOI:10.1016/j.hlc.2023.04.300)
9. Comparative effectiveness of statins on non-high density lipoprotein cholesterol in people with diabetes and at risk of cardiovascular disease: systematic review and network meta-analysis. — 2022, BMJ (PMID:35331984 DOI:10.1136/bmj-2021-067731)
10. Statins for Primary Prevention of Cardiovascular Disease in Elderly Patients: Systematic Review and Meta-Analysis. — 2015, Drugs Aging (PMID:26245770 DOI:10.1007/s40266-015-0290-9)

### Engine B — top 10
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

---

## Query: `sr-sglt2-hf-hospitalization` — "meta-analysis SGLT2 inhibitors heart failure hospitalization"
Category: systematic_review. Intent: Pooled SGLT2i effect on HF hospitalization; meta-analyses should rank top.

### Engine A — top 10
1. SGLT-2 inhibitors in patients with heart failure: a comprehensive meta-analysis of five randomised controlled trials. — 2022, Lancet (PMID:36041474 DOI:10.1016/S0140-6736(22)01429-5)
2. SGLT2 inhibitors decrease cardiovascular death and heart failure hospitalizations in patients with heart failure: A systematic review and meta-analysis. — 2021, EClinicalMedicine (PMID:34308311 DOI:10.1016/j.eclinm.2021.100933)
3. SGLT2 inhibitors in patients with heart failure with reduced ejection fraction: a meta-analysis of the EMPEROR-Reduced and DAPA-HF trials. — 2020, Lancet (PMID:32877652 DOI:10.1016/S0140-6736(20)31824-9)
4. Association of SGLT2 Inhibitors With Cardiovascular and Kidney Outcomes in Patients With Type 2 Diabetes: A Meta-analysis. — 2021, JAMA Cardiol (PMID:33031522 DOI:10.1001/jamacardio.2020.4511)
5. SGLT2 inhibitors for primary and secondary prevention of cardiovascular and renal outcomes in type 2 diabetes: a systematic review and meta-analysis of cardiovascular outcome trials. — 2019, Lancet (PMID:30424892 DOI:10.1016/S0140-6736(18)32590-X)
6. Impact of diabetes on the effects of sodium glucose co-transporter-2 inhibitors on kidney outcomes: collaborative meta-analysis of large placebo-controlled trials. — 2022, Lancet (PMID:36351458 DOI:10.1016/S0140-6736(22)02074-8)
7. Effect of SGLT2 inhibitors on heart failure outcomes and cardiovascular death across the cardiometabolic disease spectrum: a systematic review and meta-analysis. — 2024, Lancet Diabetes Endocrinol (PMID:38768620 DOI:10.1016/S2213-8587(24)00102-5)
8. Cardiovascular and Renal Outcomes with Empagliflozin in Heart Failure — 2020, New England Journal of Medicine (PMID:32865377 DOI:10.1056/nejmoa2022190)
9. Sodium-glucose cotransporter protein-2 (SGLT-2) inhibitors and glucagon-like peptide-1 (GLP-1) receptor agonists for type 2 diabetes: systematic review and network meta-analysis of randomised controlled trials. — 2021, BMJ (PMID:33441402 DOI:10.1136/bmj.m4573)
10. Cardiovascular, Kidney, and Safety Outcomes With GLP-1 Receptor Agonists Alone and in Combination With SGLT2 Inhibitors in Type 2 Diabetes: A Systematic Review and Meta-Analysis. — 2024, Circulation (PMID:39210781 DOI:10.1161/CIRCULATIONAHA.124.071689)

### Engine B — top 10
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
2. Glucocorticosteroids for sepsis: systematic review with meta-analysis and trial sequential analysis. — 2015, Intensive Care Med (PMID:26100123 DOI:10.1007/s00134-015-3899-6)
3. Corticosteroids in Sepsis: An Updated Systematic Review and Meta-Analysis. — 2018, Crit Care Med (PMID:29979221 DOI:10.1097/CCM.0000000000003262)
4. Corticosteroids in sepsis: an updated systematic review and meta-analysis (protocol). — 2017, BMJ Open (PMID:28667229 DOI:10.1136/bmjopen-2017-016847)
5. Corticosteroids for treating sepsis. — 2015, Cochrane Database Syst Rev (PMID:26633262 DOI:10.1002/14651858.CD002243.pub3)
6. Corticosteroids in Sepsis and Septic Shock: A Systematic Review, Pairwise, and Dose-Response Meta-Analysis. — 2024, Crit Care Explor (PMID:38250247 DOI:10.1097/CCE.0000000000001000)
7. Corticosteroids for sepsis: registry versus Cochrane systematic review! — 2010, Critical Care (PMID:20727225 DOI:10.1186/cc9188)
8. Evaluation of the efficiency of corticosteroids in treating adult with sepsis: A protocol for systematic review and meta-analysis. — 2021, Medicine (Baltimore) (PMID:33950938 DOI:10.1097/MD.0000000000025610)
9. Are Corticosteroids Beneficial for Sepsis and Septic Shock? Based on Pooling Analysis of 16 Studies. — 2019, Front Pharmacol (PMID:31354473 DOI:10.3389/fphar.2019.00714)
10. Corticosteroids for treating sepsis in children and adults. — 2019, Cochrane Database Syst Rev (PMID:31808551 DOI:10.1002/14651858.CD002243.pub4)

---

## Query: `guideline-aortic-stenosis` — "ACC/AHA guideline management of valvular heart disease aortic stenosis"
Category: guideline. Intent: Authoritative valvular heart disease guideline (ACC/AHA) should rank top.

### Engine A — top 10
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

### Engine B — top 10
1. 2017 AHA/ACC Focused Update of the 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease: A Report of the American College of Cardiology/American Heart Association Task Force on Clinical Practice Guidelines. — 2017, Circulation (PMID:28298458 DOI:10.1161/CIR.0000000000000503)
2. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease: Executive Summary: A Report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. — 2021, Circulation (PMID:33332149 DOI:10.1161/CIR.0000000000000932)
3. 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease: a report of the American College of Cardiology/American Heart Association Task Force on Practice Guidelines. — 2014, Circulation (PMID:24589853 DOI:10.1161/CIR.0000000000000031)
4. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease: A Report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. — 2021, Circulation (PMID:33332150 DOI:10.1161/CIR.0000000000000923)
5. 2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease: A Report of the American Heart Association/American College of Cardiology Joint Committee on Clinical Practice Guidelines — 2022, Circulation (PMID:36322642 DOI:10.1161/cir.0000000000001106)
6. Contemporary Presentation and Management of Valvular Heart Disease — 2019, Circulation (PMID:31510787 DOI:10.1161/circulationaha.119.041080)
7. 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease: executive summary: a report of the American College of Cardiology/American Heart Association Task Force on Practice Guidelines. — 2014, Circulation (PMID:24589852 DOI:10.1161/CIR.0000000000000029)
8. 2014 AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease — 2014, Journal of the American College of Cardiology (DOI:10.1016/j.jacc.2014.02.536)
9. ESC/EACTS vs. ACC/AHA guidelines for the management of severe aortic stenosis — 2023, European Heart Journal (PMID:36632841 DOI:10.1093/eurheartj/ehac803)
10. ACC/AHA guidelines for the management of patients with valvular heart disease — 1998, Journal of the American College of Cardiology (PMID:9809971 DOI:10.1016/s0735-1097(98)00454-9)

---

## Query: `guideline-kdigo-ckd` — "KDIGO clinical practice guideline evaluation and management of chronic kidney disease"
Category: guideline. Intent: KDIGO CKD guideline should rank top.

### Engine A — top 10
1. Executive summary of the KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease: known knowns and known unknowns. — 2024, Kidney Int (PMID:38519239 DOI:10.1016/j.kint.2023.10.016)
2. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. — 2024, Kidney Int (PMID:38490803 DOI:10.1016/j.kint.2023.10.018)
3. KDIGO 2025 clinical practice guideline for the evaluation, management, and treatment of autosomal dominant polycystic kidney disease (ADPKD): executive summary. — 2025, Kidney Int (PMID:39848746 DOI:10.1016/j.kint.2024.07.010)
4. Evaluation and management of chronic kidney disease: synopsis of the kidney disease: improving global outcomes 2012 clinical practice guideline. — 2013, Ann Intern Med (PMID:23732715 DOI:10.7326/0003-4819-158-11-201306040-00007)
5. KDIGO Clinical Practice Guideline on the Evaluation and Management of Candidates for Kidney Transplantation. — 2020, Transplantation (PMID:32301874 DOI:10.1097/TP.0000000000003136)
6. Executive Summary of the KDIGO 2026 Clinical Practice Guideline for the Management of Anemia in Chronic Kidney Disease (CKD). — 2026, Kidney Int (PMID:41485807 DOI:10.1016/j.kint.2025.06.005)
7. KDIGO clinical practice guideline for the diagnosis, evaluation, prevention, and treatment of Chronic Kidney Disease-Mineral and Bone Disorder (CKD-MBD). — 2009, Kidney Int Suppl (PMID:19644521 DOI:10.1038/ki.2009.188)
8. Diabetes Management in Chronic Kidney Disease: Synopsis of the 2020 KDIGO Clinical Practice Guideline. — 2021, Ann Intern Med (PMID:33166222 DOI:10.7326/M20-5938)
9. Evaluation and Management of Chronic Kidney Disease: Synopsis of the Kidney Disease: Improving Global Outcomes 2024 Clinical Practice Guideline. — 2025, Ann Intern Med (PMID:40063957 DOI:10.7326/ANNALS-24-01926)
10. [PDF] KDIGO-2024-CKD-Guideline.pdf — 0, ? (— no id —)

### Engine B — top 10
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

---

## Query: `lto-bariatric-diabetes` — "long-term outcomes of bariatric surgery in type 2 diabetes"
Category: long_term_outcomes. Intent: Long-term (≥5yr) metabolic/CV outcomes of bariatric surgery vs medical therapy (STAMPEDE/SOS).

### Engine A — top 10
1. Long-Term Outcomes of Medical Management vs Bariatric Surgery in Type 2 Diabetes. — 2024, JAMA (PMID:38411644 DOI:10.1001/jama.2024.0318)
2. Association of Bariatric Surgery With Long-term Remission of Type 2 Diabetes and With Microvascular and Macrovascular Complications — 2014, JAMA (PMID:24915261 DOI:10.1001/jama.2014.5988)
3. Bariatric/Metabolic Surgery to Treat Type 2 Diabetes in Patients With a BMI &lt;35 kg/m2. — 2016, Diabetes Care (PMID:27222550 DOI:10.2337/dc16-0350)
4. The long-term effect of bariatric/metabolic surgery versus pharmacologic therapy in type 2 diabetes mellitus patients: A systematic review and meta-analysis. — 2024, Diabetes Metab Res Rev (PMID:38873748 DOI:10.1002/dmrr.3830)
5. Bariatric Surgery versus Intensive Medical Therapy for Diabetes - 5-Year Outcomes. — 2017, N Engl J Med (PMID:28199805 DOI:10.1056/NEJMoa1600869)
6. Association of metabolic-bariatric surgery with long-term survival in adults with and without diabetes: a one-stage meta-analysis of matched cohort and prospective controlled studies with 174&#x2009;772 participants. — 2021, Lancet (PMID:33965067 DOI:10.1016/S0140-6736(21)00591-2)
7. The Long-Term Effects of Bariatric Surgery on Type 2 Diabetes Remission, Microvascular and Macrovascular Complications, and Mortality: a Systematic Review and Meta-Analysis. — 2017, Obes Surg (PMID:28801703 DOI:10.1007/s11695-017-2866-4)
8. Three-Year Outcomes of Bariatric Surgery vs Lifestyle Intervention for Type 2 Diabetes Mellitus Treatment — 2015, JAMA Surgery (PMID:26132586 DOI:10.1001/jamasurg.2015.1534)
9. Impact of bariatric surgery on glycaemic and metabolic outcomes in people with obesity and type 2 diabetes mellitus: A meta-analysis. — 2025, Diabetes Obes Metab (PMID:40407032 DOI:10.1111/dom.16475)
10. Gastric bypass has better long-term outcomes than gastric banding — 2014, Evidence-Based Medicine (PMID:25516978 DOI:10.1136/ebmed-2014-110113)

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
1. Percutaneous coronary intervention with drug-eluting stents versus coronary artery bypass grafting in left main coronary artery disease: an individual patient data meta-analysis. — 2021, Lancet (PMID:34793745 DOI:10.1016/S0140-6736(21)02334-5)
2. Coronary artery bypass graft surgery versus percutaneous coronary intervention in patients with three-vessel disease and left main coronary disease: 5-year follow-up of the randomised, clinical SYNTAX trial. — 2013, Lancet (PMID:23439102 DOI:10.1016/S0140-6736(13)60141-5)
3. Ten-Year All-Cause Death According to Completeness of Revascularization in Patients With Three-Vessel Disease or Left Main Coronary Artery Disease: Insights From the SYNTAX Extended Survival Study. — 2021, Circulation (PMID:34011163 DOI:10.1161/CIRCULATIONAHA.120.046289)
4. Ten-Year Outcomes After Drug-Eluting Stents Versus Coronary Artery Bypass Grafting for Left Main Coronary Disease: Extended Follow-Up of the PRECOMBAT Trial. — 2020, Circulation (PMID:32223567 DOI:10.1161/CIRCULATIONAHA.120.046039)
5. Percutaneous coronary intervention versus coronary artery bypass grafting in patients with three-vessel or left main coronary artery disease: 10-year follow-up of the multicentre randomised controlled SYNTAX trial. — 2019, Lancet (PMID:31488373 DOI:10.1016/S0140-6736(19)31997-X)
6. Left Main Stenting in Comparison With Surgical Revascularization: 10-Year Outcomes of the (Left Main Coronary Artery Stenting) LE MANS Trial. — 2016, JACC Cardiovasc Interv (PMID:26892080 DOI:10.1016/j.jcin.2015.10.044)
7. Mortality after coronary artery bypass grafting versus percutaneous coronary intervention with stenting for coronary artery disease: a pooled analysis of individual patient data. — 2018, Lancet (PMID:29478841 DOI:10.1016/S0140-6736(18)30423-9)
8. Ten-year follow-up survival of the Medicine, Angioplasty, or Surgery Study (MASS II): a randomized controlled clinical trial of 3 therapeutic strategies for multivessel coronary artery disease. — 2010, Circulation (PMID:20733102 DOI:10.1161/CIRCULATIONAHA.109.911669)
9. Impact of SYNTAX Score on 10-Year Outcomes After Revascularization for Left Main Coronary Artery Disease. — 2020, JACC Cardiovasc Interv (PMID:32029254 DOI:10.1016/j.jcin.2019.10.020)
10. Ten-Year Outcomes of Percutaneous Coronary Intervention Versus Coronary Artery Bypass Grafting for Patients with Type&#xa0;2 Diabetes Mellitus Suffering from Left Main Coronary Disease: A Meta-Analysis. — 2021, Diabetes Ther (PMID:33641081 DOI:10.1007/s13300-021-01025-x)

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
1. Effects of dapagliflozin on major adverse kidney and cardiovascular events in patients with diabetic and non-diabetic chronic kidney disease: a prespecified analysis from the DAPA-CKD trial. — 2021, Lancet Diabetes Endocrinol (PMID:33338413 DOI:10.1016/S2213-8587(20)30369-7)
2. Effects of the SGLT2 inhibitor dapagliflozin on proteinuria in non-diabetic patients with chronic kidney disease (DIAMOND): a randomised, double-blind, crossover trial. — 2020, Lancet Diabetes Endocrinol (PMID:32559474 DOI:10.1016/S2213-8587(20)30162-5)
3. Dapagliflozin in Patients with Chronic Kidney Disease. — 2020, N Engl J Med (PMID:32970396 DOI:10.1056/NEJMoa2024816)
4. Effects of the sodium-glucose co-transporter 2 inhibitor dapagliflozin in patients with type 2 diabetes and Stages 3b-4 chronic kidney disease. — 2018, Nephrol Dial Transplant (PMID:29370424 DOI:10.1093/ndt/gfx350)
5. The long-term effects of dapagliflozin in chronic kidney disease: a time-to-event analysis. — 2024, Nephrol Dial Transplant (PMID:38730538 DOI:10.1093/ndt/gfae106)
6. Effect of dapagliflozin on the rate of decline in kidney function in patients with chronic kidney disease with and without type 2 diabetes: a prespecified analysis from the DAPA-CKD trial. — 2021, Lancet Diabetes Endocrinol (PMID:34619108 DOI:10.1016/S2213-8587(21)00242-4)
7. Effectiveness of Empagliflozin vs Dapagliflozin for Kidney Outcomes in Type 2 Diabetes. — 2025, JAMA Intern Med (PMID:39836391 DOI:10.1001/jamainternmed.2024.7381)
8. Effects of Dapagliflozin in Patients With Kidney Disease, With and Without Heart&#xa0;Failure. — 2021, JACC Heart Fail (PMID:34446370 DOI:10.1016/j.jchf.2021.06.017)
9. Effects of Dapagliflozin on Hospitalizations in Patients With Chronic Kidney Disease — 2022, Annals of Internal Medicine (PMID:36469914 DOI:10.7326/m22-2115)
10. Albuminuria-Lowering Effect of Dapagliflozin, Eplerenone, and Their Combination in Patients with Chronic Kidney Disease: A Randomized Crossover Clinical Trial. — 2022, J Am Soc Nephrol (PMID:35440501 DOI:10.1681/ASN.2022020207)

### Engine B — top 10
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
1. Risk of Myocarditis After Sequential Doses of COVID-19 Vaccine and SARS-CoV-2 Infection by Age and Sex — 2022, Circulation (PMID:35993236 DOI:10.1161/circulationaha.122.059970)
2. SARS-CoV-2 vaccination and myocarditis or myopericarditis: population based cohort study — 2021, BMJ (PMID:34916207 DOI:10.1136/bmj-2021-068665)
3. Clinically Suspected Myocarditis Temporally Related to COVID-19 Vaccination in Adolescents and Young Adults: Suspected Myocarditis After COVID-19 Vaccination — 2021, Circulation (PMID:34865500 DOI:10.1161/circulationaha.121.056583)
4. Myocarditis Cases Reported After mRNA-Based COVID-19 Vaccination in the US From December 2020 to August 2021 — 2022, JAMA (PMID:35076665 DOI:10.1001/jama.2021.24110)
5. Myocarditis With COVID-19 mRNA Vaccines — 2021, Circulation (PMID:34281357 DOI:10.1161/circulationaha.121.056135)
6. Booster vaccination with SARS-CoV-2 mRNA vaccines and myocarditis in adolescents and young adults: a Nordic cohort study — 2024, European Heart Journal (PMID:38365960 DOI:10.1093/eurheartj/ehae056)
7. Features of Inflammatory Heart Reactions Following mRNA COVID‐19 Vaccination at a Global Level — 2021, Clinical Pharmacology & Therapeutics (PMID:34860360 DOI:10.1002/cpt.2499)
8. Myocarditis Following Immunization With mRNA COVID-19 Vaccines in Members of the US Military — 2021, JAMA Cardiology (PMID:34185045 DOI:10.1001/jamacardio.2021.2833)
9. Observed versus expected rates of myocarditis after SARS-CoV-2 vaccination: a population-based cohort study — 2022, Canadian Medical Association Journal (PMID:36410749 DOI:10.1503/cmaj.220676)
10. Myocarditis after BNT162b2 mRNA Vaccine against Covid-19 in Israel — 2021, New England Journal of Medicine (PMID:34614328 DOI:10.1056/nejmoa2109730)

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
1. Cardiovascular, mortality, and kidney outcomes with GLP-1 receptor agonists in patients with type 2 diabetes: a systematic review and meta-analysis of randomised trials. — 2021, Lancet Diabetes Endocrinol (PMID:34425083 DOI:10.1016/S2213-8587(21)00203-5)
2. Effects of GLP-1 receptor agonists on kidney and cardiovascular disease outcomes: a meta-analysis of randomised controlled trials. — 2025, Lancet Diabetes Endocrinol (PMID:39608381 DOI:10.1016/S2213-8587(24)00271-7)
3. Glucagon-like peptide-1 receptor agonists and risk of acute pancreatitis in patients with type 2 diabetes. — 2017, Diabetes Obes Metab (PMID:28105738 DOI:10.1111/dom.12885)
4. Cardiovascular, mortality, and kidney outcomes with GLP-1 receptor agonists in patients with type 2 diabetes: a systematic review and meta-analysis of cardiovascular outcome trials. — 2019, Lancet Diabetes Endocrinol (PMID:31422062 DOI:10.1016/S2213-8587(19)30249-9)
5. Safety issues with glucagon-like peptide-1 receptor agonists (pancreatitis, pancreatic cancer and cholelithiasis): Data from randomized controlled trials. — 2017, Diabetes Obes Metab (PMID:28244632 DOI:10.1111/dom.12926)
6. Evaluating the Rates of Pancreatitis and Pancreatic Cancer Among GLP-1 Receptor Agonists: A Systematic Review and Meta-Analysis of Randomised Controlled Trials. — 2025, Endocrinol Diabetes Metab (PMID:40988099 DOI:10.1002/edm2.70113)
7. Glucagon-Like Peptide-1 Receptor Agonists and Gastrointestinal Adverse Events: A Systematic Review and Meta-Analysis. — 2025, Gastroenterology (PMID:40499738 DOI:10.1053/j.gastro.2025.06.003)
8. Pancreatitis and pancreatic cancer in patients with type 2 diabetes treated with glucagon-like peptide-1 receptor agonists: an updated meta-analysis of randomized controlled trials — 2023, Minerva Endocrinology (DOI:10.23736/s2724-6507.20.03219-8)
9. Glucagon-Like Peptide-1 Receptor Agonists and Pancreatic Cancer Risk in Patients With Type 2 Diabetes. — 2024, JAMA Netw Open (PMID:38175642 DOI:10.1001/jamanetworkopen.2023.50408)
10. SGLT2 Inhibitors and GLP-1 Receptor Agonists in Kidney Transplantation: A Systematic Review and Meta-Analysis. — 2026, Transplantation (PMID:40702593 DOI:10.1097/TP.0000000000005496)

---

## Query: `safety-sglt2-dka` — "SGLT2 inhibitors and risk of diabetic ketoacidosis"
Category: safety_adverse_event. Intent: DKA risk with SGLT2 inhibitors; expect cohort/pharmacovigilance + meta-analyses.

### Engine A — top 10
1. SGLT2 inhibitors in type 2 diabetes: a systematic review and meta-analysis of cardiovascular outcome trials balancing their risks and benefits. — 2022, Diabetologia (PMID:35925319 DOI:10.1007/s00125-022-05773-8)
2. SGLT2 inhibitors increase risk for diabetic ketoacidosis in type 2 diabetes — 2020, Annals of Internal Medicine (PMID:33075260 DOI:10.7326/acpj202010200-040)
3. Sodium glucose cotransporter 2 inhibitors and risk of serious adverse events: nationwide register based cohort study — 2018, BMJ (PMID:30429124 DOI:10.1136/bmj.k4365)
4. SGLT2 Inhibitors: A Systematic Review of Diabetic Ketoacidosis and Related Risk Factors in the Primary Literature. — 2017, Pharmacotherapy (PMID:27931088 DOI:10.1002/phar.1881)
5. Euglycemic diabetic ketoacidosis associated with SGLT2 inhibitors: A systematic review and quantitative analysis. — 2022, J Family Med Prim Care (PMID:35495849 DOI:10.4103/jfmpc.jfmpc_644_21)
6. SGLT2 Inhibitors Increase the Risk of Diabetic Ketoacidosis Developing in the Community and During Hospital Admission — 2019, The Journal of Clinical Endocrinology & Metabolism (PMID:30835263 DOI:10.1210/jc.2019-00139)
7. Sodium-glucose cotransporter-2 inhibitors (SGLT2) in frail or older people with type 2 diabetes and heart failure: a systematic review and meta-analysis. — 2024, Age Ageing (PMID:38287703 DOI:10.1093/ageing/afad254)
8. Risk of diabetic ketoacidosis of SGLT2 inhibitors in patients with type 2 diabetes: a systematic review and network meta-analysis of randomized controlled trials. — 2023, Front Pharmacol (PMID:37397500 DOI:10.3389/fphar.2023.1145587)
9. Preoperative SGLT2 Inhibitor Use and Postoperative Diabetic Ketoacidosis. — 2025, JAMA Surg (PMID:39969891 DOI:10.1001/jamasurg.2024.7082)
10. SGLT2 inhibitors and GLP-1 receptor agonists: established and emerging indications. — 2021, Lancet (PMID:34216571 DOI:10.1016/S0140-6736(21)00536-5)

### Engine B — top 10
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

---

## Query: `safety-fluoroquinolone-aneurysm` — "fluoroquinolone use and risk of aortic aneurysm or dissection"
Category: safety_adverse_event. Intent: Association between fluoroquinolones and aortic aneurysm/dissection; expect cohort/case-control + SRs.

### Engine A — top 10
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

### Engine B — top 10
1. Fluoroquinolone use and risk of aortic aneurysm and dissection: nationwide cohort study. — 2018, BMJ (PMID:29519881 DOI:10.1136/bmj.k678)
2. Fluoroquinolone Use and the Risk of Collagen-Associated Adverse Events: A Systematic Review and Meta-Analysis. — 2019, Drug Saf (PMID:31077091 DOI:10.1007/s40264-019-00828-z)
3. Fluoroquinolones and the Risk of Aortic Aneurysm or Aortic Dissection: A Systematic Review and Meta-Analysis. — 2019, Cardiovasc Hematol Agents Med Chem (PMID:30947680 DOI:10.2174/1871525717666190402121958)
4. Risk of aortic aneurysm or dissection following use of fluoroquinolones: a retrospective multinational network cohort study — 2025, EClinicalMedicine (PMID:39975698 DOI:10.1016/j.eclinm.2025.103096)
5. Association of Fluoroquinolone Use With Short-term Risk of Development of Aortic Aneurysm — 2021, JAMA Surgery (PMID:33404647 DOI:10.1001/jamasurg.2020.6165)
6. Association of Infections and Use of Fluoroquinolones With the Risk of Aortic Aneurysm or Aortic Dissection. — 2020, JAMA Intern Med (PMID:32897358 DOI:10.1001/jamainternmed.2020.4192)
7. Risk of Aortic Dissection and Aortic Aneurysm in Patients Taking Oral Fluoroquinolone. — 2015, JAMA Intern Med (PMID:26436523 DOI:10.1001/jamainternmed.2015.5389)
8. Association of Fluoroquinolones With the Risk of Aortic Aneurysm or Aortic Dissection — 2020, JAMA Internal Medicine (PMID:32897307 DOI:10.1001/jamainternmed.2020.4199)
9. Fluoroquinolones Are Associated With Increased Risk of Aortic Aneurysm or Dissection: Systematic Review and Meta-analysis. — 2021, Semin Thorac Cardiovasc Surg (PMID:33181305 DOI:10.1053/j.semtcvs.2020.11.011)
10. Lack of association between fluoroquinolone and aortic aneurysm or dissection. — 2023, Eur Heart J (PMID:37724037 DOI:10.1093/eurheartj/ehad627)

---

## Query: `compare-tirzepatide-semaglutide` — "tirzepatide versus semaglutide for weight loss"
Category: therapy_comparison. Intent: Head-to-head / indirect comparison of tirzepatide vs semaglutide for weight loss (SURMOUNT/SURPASS/STEP).

### Engine A — top 10
1. Comparative effectiveness of GLP-1 receptor agonists on glycaemic control, body weight, and lipid profile for type 2 diabetes: systematic review and network meta-analysis. — 2024, BMJ (PMID:38286487 DOI:10.1136/bmj-2023-076410)
2. Tirzepatide Versus Semaglutide on Weight Loss in Type 2 Diabetes Patients: A Systematic Review and Meta-Analysis of Direct Comparative Studies. — 2025, Endocrinol Diabetes Metab (PMID:40184508 DOI:10.1002/edm2.70045)
3. Subcutaneously administered tirzepatide vs semaglutide for adults with type 2 diabetes: a systematic review and network meta-analysis of randomised controlled trials. — 2024, Diabetologia (PMID:38613667 DOI:10.1007/s00125-024-06144-1)
4. Seven glucagon-like peptide-1 receptor agonists and polyagonists for weight loss in patients with obesity or overweight: an updated systematic review and network meta-analysis of randomized controlled trials. — 2024, Metabolism (PMID:39305981 DOI:10.1016/j.metabol.2024.156038)
5. Semaglutide vs Tirzepatide for Weight Loss in Adults With Overweight or Obesity. — 2024, JAMA Intern Med (PMID:38976257 DOI:10.1001/jamainternmed.2024.2525)
6. Tirzepatide Reduces Appetite, Energy Intake, and Fat Mass in People With Type 2 Diabetes — 2023, Diabetes Care (PMID:36857477 DOI:10.2337/dc22-1710)
7. Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes. — 2021, N Engl J Med (PMID:34170647 DOI:10.1056/NEJMoa2107519)
8. Tirzepatide as Compared with Semaglutide for the Treatment of Obesity. — 2025, N Engl J Med (PMID:40353578 DOI:10.1056/NEJMoa2416394)
9. Greater improvement in insulin sensitivity per unit weight loss associated with tirzepatide versus semaglutide: An exploratory analysis — 2025, Diabetes Obesity and Metabolism (PMID:39762971 DOI:10.1111/dom.16159)
10. Real‐world effectiveness of tirzepatide versus semaglutide for weight loss in overweight or obese patients in an ambulatory care setting — 2025, Diabetes Obesity and Metabolism (PMID:40116184 DOI:10.1111/dom.16343)

### Engine B — top 10
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
1. Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes — 2009, New England Journal of Medicine (PMID:19717846 DOI:10.1056/nejmoa0904327)
2. Clopidogrel versus ticagrelor or prasugrel in patients aged 70 years or older with non-ST-elevation acute coronary syndrome (POPular AGE): the randomised, open-label, non-inferiority trial. — 2020, Lancet (PMID:32334703 DOI:10.1016/S0140-6736(20)30325-1)
3. Comparison of ticagrelor with clopidogrel in patients with a planned invasive strategy for acute coronary syndromes (PLATO): a randomised double-blind study — 2010, The Lancet (PMID:20079528 DOI:10.1016/s0140-6736(09)62191-7)
4. Ticagrelor Versus Clopidogrel in Patients With ST-Elevation Acute Coronary Syndromes Intended for Reperfusion With Primary Percutaneous Coronary Intervention — 2010, Circulation (PMID:21060072 DOI:10.1161/circulationaha.109.927582)
5. Safety and Efficacy of Ticagrelor versus Clopidogrel in East Asian Patients with Acute Coronary Syndrome Undergoing Percutaneous Coronary Intervention Treated with Dual Antiplatelet Therapy: A Meta-Analysis of Randomized Controlled Trials. — 2023, Cardiology (PMID:37094558 DOI:10.1159/000530602)
6. Ticagrelor versus clopidogrel in patients with acute coronary syndromes intended for non-invasive management: substudy from prospective randomised PLATelet inhibition and patient Outcomes (PLATO) trial — 2011, BMJ (PMID:21685437 DOI:10.1136/bmj.d3527)
7. Safety of Clopidogrel vs. Ticagrelor in Dual Antiplatelet Therapy Regimens for High-Bleeding Risk Acute Coronary Syndrome Patients: A Comprehensive Meta-analysis of Adverse Outcomes. — 2024, High Blood Press Cardiovasc Prev (PMID:38557855 DOI:10.1007/s40292-024-00635-3)
8. Ticagrelor Versus Clopidogrel in Patients With Acute Coronary Syndromes Undergoing Coronary Artery Bypass Surgery — 2010, Journal of the American College of Cardiology (PMID:21194870 DOI:10.1016/j.jacc.2010.10.029)
9. Outcomes in patients treated with ticagrelor or clopidogrel after acute myocardial infarction: experiences from SWEDEHEART registry — 2016, European Heart Journal (PMID:27436867 DOI:10.1093/eurheartj/ehw284)
10. Ticagrelor Compared to Clopidogrel in Acute Coronary Syndromes trial (TC4): a Bayesian pragmatic cluster randomized controlled trial. — 2025, CMAJ (PMID:40164463 DOI:10.1503/cmaj.241862)

---

## Query: `mechanism-sglt2-cardioprotection` — "mechanism of action of SGLT2 inhibitors cardioprotection"
Category: mechanism. Intent: Mechanistic basis of SGLT2 inhibitor cardioprotection; expect reviews + translational studies.

### Engine A — top 10
1. Critical Reanalysis of the Mechanisms Underlying the Cardiorenal Benefits of SGLT2 Inhibitors and Reaffirmation of the Nutrient Deprivation Signaling/Autophagy Hypothesis. — 2022, Circulation (PMID:36315602 DOI:10.1161/CIRCULATIONAHA.122.061732)
2. Cardioprotective mechanism of SGLT2 inhibitor against myocardial infarction is through reduction of autosis. — 2022, Protein Cell (PMID:33417139 DOI:10.1007/s13238-020-00809-4)
3. Age and Sex Differences in Efficacy of Treatments for Type 2 Diabetes: A Network Meta-Analysis. — 2025, JAMA (PMID:39899304 DOI:10.1001/jama.2024.27402)
4. Sodium-glucose co-transporter 2 inhibitor therapy: mechanisms of action in heart failure — 2021, Heart (PMID:33637556 DOI:10.1136/heartjnl-2020-318060)
5. Mechanisms of enhanced renal and hepatic erythropoietin synthesis by sodium–glucose cotransporter 2 inhibitors — 2023, European Heart Journal (PMID:37086098 DOI:10.1093/eurheartj/ehad235)
6. Cardioprotective Glucose-Lowering Agents and Dementia Risk: A Systematic Review and Meta-Analysis. — 2025, JAMA Neurol (PMID:40193122 DOI:10.1001/jamaneurol.2025.0360)
7. The Cardioprotective and Anticancer Effects of SGLT2 Inhibitors: JACC: CardioOncology State-of-the-Art Review. — 2024, JACC CardioOncol (PMID:38774006 DOI:10.1016/j.jaccao.2024.01.007)
8. Impact of SGLT2 Inhibitors on Heart Failure: From Pathophysiology to Clinical Effects — 2021, International Journal of Molecular Sciences (PMID:34070765 DOI:10.3390/ijms22115863)
9. SGLT2 inhibitors and cardioprotection: a matter of debate and multiple hypotheses. — 2019, Postgrad Med (PMID:30757937 DOI:10.1080/00325481.2019.1581971)
10. SGLT2 Inhibitors: A Review of Their Antidiabetic and Cardioprotective Effects — 2019, International Journal of Environmental Research and Public Health (PMID:31426529 DOI:10.3390/ijerph16162965)

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
