/**
 * Biomedical / clinical benchmark for Manan OS literature search.
 *
 * 75 queries spanning every required category and seven specialties
 * (cardiology, oncology, neurology, infectious disease, endocrinology,
 * nephrology, psychiatry). Used by the eval harness
 * (`eval/literature-search/run.ts`) to compute deterministic metrics and to
 * build the Manan-vs-Elicit packets the LLM council judges.
 *
 * MUST-HAVE GROUND TRUTH
 * ----------------------
 * `mustHaves` are landmark/expected papers. Each entry matches if ANY of its
 * `pmids` / `dois` / `titleIncludes` match a result. Identifiers were VERIFIED
 * against Elicit/PubMed at authoring time — we never assert a PMID/DOI we have
 * not seen returned by a source, to keep recall@k honest (no hallucinated truth).
 * Where the landmark paper's exact id was not verified this session, we use a
 * distinctive `titleIncludes` substring (e.g. a trial drug name) instead.
 */

export type QueryCategory =
  | "exact_paper"
  | "trial_acronym"
  | "trial_family"
  | "broad_clinical"
  | "pico"
  | "recency"
  | "systematic_review"
  | "guideline"
  | "long_term_outcomes"
  | "safety_adverse_event"
  | "therapy_comparison"
  | "mechanism"
  | "negative_control"
  | "ambiguous_acronym";

export interface MustHave {
  /** Human-readable description of the landmark paper. */
  label: string;
  /** Match if the result's PMID is any of these. */
  pmids?: string[];
  /** Match if the result's DOI is any of these (compared case-insensitively). */
  dois?: string[];
  /** Match if the normalized result title contains any of these substrings (lowercase). */
  titleIncludes?: string[];
}

export interface BenchmarkQuery {
  /** Stable slug (used in artifact filenames). */
  id: string;
  /** The user query as typed. */
  query: string;
  category: QueryCategory;
  /** What a clinician/researcher actually wants from this query. */
  intent: string;
  /** If true, newer results are genuinely better — affects how we read ranking. */
  recencyBiased?: boolean;
  /** Study types we expect to dominate a good top-10 (evidence-hierarchy check). */
  expectedStudyTypes?: string[];
  /** Landmark/expected papers (each matches any-of its identifiers). */
  mustHaves?: MustHave[];
  notes?: string;
}

export const BENCHMARK_QUERIES: BenchmarkQuery[] = [
  // ── Seed ───────────────────────────────────────────────────────────────
  {
    id: "tavr-low-risk-6yr",
    query: "TAVR low risk six year outcomes",
    category: "long_term_outcomes",
    intent:
      "Long-term (≈6yr) outcomes of TAVR vs SAVR in low surgical risk aortic stenosis; the landmark RCTs and their longest follow-ups.",
    expectedStudyTypes: ["rct", "meta_analysis", "systematic_review"],
    mustHaves: [
      {
        label: "PARTNER 3 (Mack/Leon, NEJM 2019) — balloon-expandable, low risk",
        pmids: ["30883058"],
        dois: ["10.1056/NEJMoa1814052"],
        titleIncludes: ["balloon-expandable valve in low-risk"],
      },
      {
        label: "Evolut Low Risk 6-year (Forrest, JACC 2026)",
        pmids: ["41697183"],
        dois: ["10.1016/j.jacc.2026.02.5063"],
        titleIncludes: ["six-year outcomes after transcatheter"],
      },
    ],
    notes: "Seed query. Elicit ranks PARTNER 3 #1; baseline Manan misses it entirely.",
  },

  // ── Exact paper lookup ─────────────────────────────────────────────────
  {
    id: "exact-dapa-hf",
    query: "Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction",
    category: "exact_paper",
    intent: "Retrieve the exact DAPA-HF primary results paper by its title.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "DAPA-HF (McMurray, NEJM 2019)",
        pmids: ["31535829"],
        dois: ["10.1056/NEJMoa1911303"],
      },
    ],
  },
  {
    id: "exact-recovery-dex",
    query: "Dexamethasone in Hospitalized Patients with Covid-19 RECOVERY",
    category: "exact_paper",
    intent: "Retrieve the RECOVERY dexamethasone primary results paper.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "RECOVERY dexamethasone (Horby, NEJM 2021 / medRxiv 2020)",
        pmids: ["32678530"],
        dois: ["10.1056/NEJMoa2021436", "10.1101/2020.06.22.20137273"],
      },
    ],
  },
  {
    id: "exact-keynote-189",
    query: "Pembrolizumab plus Chemotherapy in Metastatic Non-Small-Cell Lung Cancer",
    category: "exact_paper",
    intent: "Retrieve the KEYNOTE-189 primary results paper.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "KEYNOTE-189 (Gandhi, NEJM 2018)",
        pmids: ["29658856"],
        dois: ["10.1056/NEJMoa1801005"],
      },
    ],
  },

  // ── Trial acronym lookup ───────────────────────────────────────────────
  {
    id: "acronym-dapa-hf",
    query: "DAPA-HF trial",
    category: "trial_acronym",
    intent: "Resolve the DAPA-HF acronym to the dapagliflozin HFrEF trial + key follow-ups.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      { label: "DAPA-HF (McMurray, NEJM 2019)", pmids: ["31535829"], dois: ["10.1056/NEJMoa1911303"] },
    ],
  },
  {
    id: "acronym-partner-3",
    query: "PARTNER 3 trial",
    category: "trial_acronym",
    intent: "Resolve PARTNER 3 to the balloon-expandable TAVR low-risk RCT and its follow-ups.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      { label: "PARTNER 3 (Mack/Leon, NEJM 2019)", pmids: ["30883058"], dois: ["10.1056/NEJMoa1814052"] },
    ],
  },
  {
    id: "acronym-keynote-189",
    query: "KEYNOTE-189",
    category: "trial_acronym",
    intent: "Resolve KEYNOTE-189 to the pembrolizumab+chemo NSCLC trial.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      { label: "KEYNOTE-189 (Gandhi, NEJM 2018)", pmids: ["29658856"], dois: ["10.1056/NEJMoa1801005"] },
    ],
  },
  {
    id: "acronym-sprint",
    query: "SPRINT trial intensive blood pressure control",
    category: "trial_acronym",
    intent: "Resolve SPRINT to the intensive vs standard BP RCT (and final report).",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "SPRINT (Wright, NEJM 2015) / final report (NEJM 2021)",
        pmids: ["26551272", "34010531"],
        dois: ["10.1056/NEJMoa1511939", "10.1056/NEJMoa1901281"],
      },
    ],
  },

  // ── Broad clinical ─────────────────────────────────────────────────────
  {
    id: "broad-hfref-management",
    query: "management of heart failure with reduced ejection fraction",
    category: "broad_clinical",
    intent: "Overview of guideline-directed medical therapy for HFrEF; expect guidelines + landmark RCTs + SRs on top.",
    expectedStudyTypes: ["guideline", "systematic_review", "meta_analysis", "rct"],
  },
  {
    id: "broad-cap-treatment",
    query: "treatment of community-acquired pneumonia in adults",
    category: "broad_clinical",
    intent: "Guideline-level management of CAP; expect IDSA/ATS guidance and SRs near the top.",
    expectedStudyTypes: ["guideline", "systematic_review", "meta_analysis", "rct"],
  },
  {
    id: "broad-af-anticoagulation",
    query: "anticoagulation for stroke prevention in atrial fibrillation",
    category: "broad_clinical",
    intent: "Overview of DOAC/warfarin anticoagulation in AF; expect landmark DOAC RCTs + guidelines.",
    expectedStudyTypes: ["guideline", "rct", "meta_analysis", "systematic_review"],
  },

  // ── PICO ───────────────────────────────────────────────────────────────
  {
    id: "pico-sglt2-cv-mortality",
    query:
      "In adults with type 2 diabetes, do SGLT2 inhibitors compared to placebo reduce cardiovascular mortality?",
    category: "pico",
    intent: "P=T2DM, I=SGLT2i, C=placebo, O=CV mortality. Expect CVOT RCTs + meta-analyses.",
    expectedStudyTypes: ["rct", "meta_analysis", "systematic_review"],
  },
  {
    id: "pico-egdt-septic-shock",
    query:
      "In patients with septic shock, does early goal-directed therapy versus usual care improve mortality?",
    category: "pico",
    intent: "P=septic shock, I=EGDT, C=usual care, O=mortality. Expect ProCESS/ARISE/ProMISe + meta-analysis.",
    expectedStudyTypes: ["rct", "meta_analysis"],
    mustHaves: [
      { label: "EGDT trials (ProCESS / ARISE / ProMISe) or their meta-analysis", titleIncludes: ["goal-directed", "process", "arise", "promise", "protocolized care"] },
    ],
  },
  {
    id: "pico-oxygen-icu",
    query:
      "In critically ill ICU patients, does conservative versus liberal oxygen therapy affect mortality?",
    category: "pico",
    intent: "P=ICU, I=conservative O2, C=liberal O2, O=mortality. Expect ICU-ROX/LOCO2/meta-analyses.",
    expectedStudyTypes: ["rct", "meta_analysis", "systematic_review"],
  },

  // ── Recency / latest ───────────────────────────────────────────────────
  {
    id: "recency-semaglutide-cv-2025",
    query: "latest 2025 trials semaglutide cardiovascular outcomes",
    category: "recency",
    intent: "Most recent semaglutide CV outcome evidence (SELECT and newer). Newer is better.",
    recencyBiased: true,
    expectedStudyTypes: ["rct", "meta_analysis"],
  },
  {
    id: "recency-lecanemab",
    query: "newest evidence on lecanemab for Alzheimer disease",
    category: "recency",
    intent: "Recent lecanemab efficacy/safety evidence (CLARITY-AD and follow-ups).",
    recencyBiased: true,
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        // Tightened from the too-loose `titleIncludes:["lecanemab"]` (which any
        // lecanemab sub-study satisfied, giving false-positive recall) to the
        // pivotal CLARITY-AD trial by EXACT identifier only — the titleIncludes
        // matcher tests tokens independently, so any "...lecanemab... in early
        // Alzheimer..." paper would still false-match. DOI verified as returned
        // by our sources (seen at rank 1) — no hallucinated ground truth.
        label: "CLARITY-AD — Lecanemab in Early Alzheimer's Disease (van Dyck, NEJM 2023)",
        pmids: ["36449413"],
        dois: ["10.1056/NEJMoa2212948"],
      },
    ],
  },
  {
    id: "recency-cart-myeloma",
    query: "recent advances CAR-T therapy multiple myeloma 2024 2025",
    category: "recency",
    intent: "Latest CAR-T (BCMA) evidence in multiple myeloma. Newer is better.",
    recencyBiased: true,
    expectedStudyTypes: ["rct", "clinical_trial"],
  },

  // ── Systematic review / meta-analysis ──────────────────────────────────
  {
    id: "sr-statins-primary-prevention",
    query: "systematic review and meta-analysis of statins for primary prevention",
    category: "systematic_review",
    intent: "High-quality SR/MA on statins for primary CV prevention should dominate the top.",
    expectedStudyTypes: ["systematic_review", "meta_analysis"],
  },
  {
    id: "sr-sglt2-hf-hospitalization",
    query: "meta-analysis SGLT2 inhibitors heart failure hospitalization",
    category: "systematic_review",
    intent: "Pooled SGLT2i effect on HF hospitalization; meta-analyses should rank top.",
    expectedStudyTypes: ["meta_analysis", "systematic_review"],
  },
  {
    id: "sr-cochrane-steroids-sepsis",
    query: "Cochrane review corticosteroids for sepsis",
    category: "systematic_review",
    intent: "Cochrane / high-quality SR on corticosteroids in sepsis.",
    expectedStudyTypes: ["systematic_review", "meta_analysis"],
  },

  // ── Guideline ──────────────────────────────────────────────────────────
  {
    id: "guideline-aortic-stenosis",
    query: "ACC/AHA guideline management of valvular heart disease aortic stenosis",
    category: "guideline",
    intent: "Authoritative valvular heart disease guideline (ACC/AHA) should rank top.",
    expectedStudyTypes: ["guideline"],
  },
  {
    id: "guideline-af-esc",
    query: "ESC guidelines management of atrial fibrillation",
    category: "guideline",
    intent: "ESC AF management guideline should rank top.",
    expectedStudyTypes: ["guideline"],
  },
  {
    id: "guideline-kdigo-ckd",
    query: "KDIGO clinical practice guideline evaluation and management of chronic kidney disease",
    category: "guideline",
    intent: "KDIGO CKD guideline should rank top.",
    expectedStudyTypes: ["guideline"],
  },

  // ── Long-term outcomes ─────────────────────────────────────────────────
  {
    id: "lto-bariatric-diabetes",
    query: "long-term outcomes of bariatric surgery in type 2 diabetes",
    category: "long_term_outcomes",
    intent: "Long-term (≥5yr) metabolic/CV outcomes of bariatric surgery vs medical therapy (STAMPEDE/SOS).",
    expectedStudyTypes: ["rct", "cohort", "meta_analysis"],
  },
  {
    id: "lto-pci-vs-cabg-left-main",
    query: "ten year outcomes PCI versus CABG left main coronary disease",
    category: "long_term_outcomes",
    intent: "Long-term mortality/MACE PCI vs CABG in left main disease (EXCEL/NOBLE/SYNTAX).",
    expectedStudyTypes: ["rct", "meta_analysis"],
  },
  {
    id: "lto-dapa-ckd",
    query: "long-term renal outcomes dapagliflozin chronic kidney disease",
    category: "long_term_outcomes",
    intent: "Long-term renal/CV outcomes of dapagliflozin in CKD (DAPA-CKD).",
    expectedStudyTypes: ["rct", "meta_analysis"],
    mustHaves: [{ label: "DAPA-CKD trial", titleIncludes: ["dapagliflozin", "chronic kidney"] }],
  },

  // ── Safety / adverse event ─────────────────────────────────────────────
  {
    id: "safety-vaccine-myocarditis",
    query: "myocarditis risk after mRNA COVID-19 vaccine in young males",
    category: "safety_adverse_event",
    intent: "Quantified myocarditis risk post-mRNA vaccine; expect cohort/population studies + SRs.",
    expectedStudyTypes: ["cohort", "systematic_review", "meta_analysis"],
  },
  {
    id: "safety-glp1-pancreatitis",
    query: "GLP-1 receptor agonists and risk of acute pancreatitis",
    category: "safety_adverse_event",
    intent: "Association between GLP-1 RAs and pancreatitis; expect meta-analyses/cohorts/RCT safety.",
    expectedStudyTypes: ["meta_analysis", "cohort", "rct"],
  },
  {
    id: "safety-sglt2-dka",
    query: "SGLT2 inhibitors and risk of diabetic ketoacidosis",
    category: "safety_adverse_event",
    intent: "DKA risk with SGLT2 inhibitors; expect cohort/pharmacovigilance + meta-analyses.",
    expectedStudyTypes: ["cohort", "meta_analysis"],
  },
  {
    id: "safety-fluoroquinolone-aneurysm",
    query: "fluoroquinolone use and risk of aortic aneurysm or dissection",
    category: "safety_adverse_event",
    intent: "Association between fluoroquinolones and aortic aneurysm/dissection; expect cohort/case-control + SRs.",
    expectedStudyTypes: ["cohort", "systematic_review", "meta_analysis"],
  },

  // ── Therapy comparison ─────────────────────────────────────────────────
  {
    id: "compare-tirzepatide-semaglutide",
    query: "tirzepatide versus semaglutide for weight loss",
    category: "therapy_comparison",
    intent: "Head-to-head / indirect comparison of tirzepatide vs semaglutide for weight loss (SURMOUNT/SURPASS/STEP).",
    expectedStudyTypes: ["rct", "meta_analysis"],
  },
  {
    id: "compare-doac-vs-warfarin",
    query: "DOACs versus warfarin for stroke prevention in atrial fibrillation",
    category: "therapy_comparison",
    intent: "DOAC vs warfarin efficacy/safety in AF (RE-LY/ROCKET-AF/ARISTOTLE/ENGAGE + meta-analysis).",
    expectedStudyTypes: ["rct", "meta_analysis"],
  },
  {
    id: "compare-ticagrelor-clopidogrel",
    query: "ticagrelor versus clopidogrel in acute coronary syndrome",
    category: "therapy_comparison",
    intent: "Ticagrelor vs clopidogrel outcomes in ACS (PLATO + meta-analyses).",
    expectedStudyTypes: ["rct", "meta_analysis"],
    mustHaves: [{ label: "PLATO trial (ticagrelor vs clopidogrel)", titleIncludes: ["ticagrelor", "platelet inhibition and patient outcomes"] }],
  },

  // ── Mechanism ──────────────────────────────────────────────────────────
  {
    id: "mechanism-sglt2-cardioprotection",
    query: "mechanism of action of SGLT2 inhibitors cardioprotection",
    category: "mechanism",
    intent: "Mechanistic basis of SGLT2 inhibitor cardioprotection; expect reviews + translational studies.",
    expectedStudyTypes: ["narrative_review", "systematic_review"],
  },

  // ════════════════════════════════════════════════════════════════════════
  // EXTENSION → 75 queries (multi-specialty, trial-families, negative controls)
  // Identifiers below verified via the PubMed MCP this session; see
  // docs/literature-search/BENCHMARK-EXTENSION-VERIFICATION.md for evidence.
  // ════════════════════════════════════════════════════════════════════════

  // ── Psychiatry (specialty was previously ZERO) ─────────────────────────
  {
    id: "psy-stard-major-depression",
    query: "STAR*D acute and longer-term outcomes depressed outpatients treatment steps",
    category: "trial_acronym",
    intent: "Resolve STAR*D to the landmark sequenced-treatment effectiveness report for major depression.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "STAR*D summary (Rush, Am J Psychiatry 2006)",
        pmids: ["17074942"],
        dois: ["10.1176/ajp.2006.163.11.1905"],
      },
    ],
  },
  {
    id: "psy-catie-antipsychotics",
    query: "CATIE effectiveness of antipsychotic drugs in chronic schizophrenia",
    category: "trial_acronym",
    intent: "Resolve CATIE to the antipsychotic effectiveness RCT in chronic schizophrenia.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "CATIE phase 1 (Lieberman, NEJM 2005)",
        pmids: ["16172203"],
        dois: ["10.1056/NEJMoa051688"],
      },
    ],
  },
  {
    id: "psy-esketamine-trd",
    query: "esketamine nasal spray for treatment-resistant depression efficacy and safety",
    category: "therapy_comparison",
    intent: "Pivotal esketamine + oral antidepressant evidence in TRD (TRANSFORM family).",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "TRANSFORM-2 esketamine (Popova, Am J Psychiatry 2019)",
        pmids: ["31109201"],
        dois: ["10.1176/appi.ajp.2019.19020172"],
      },
    ],
  },
  {
    id: "psy-ketamine-nmda-depression",
    query: "ketamine NMDA antagonist rapid antidepressant treatment-resistant major depression",
    category: "mechanism",
    intent: "Foundational rapid-acting glutamatergic antidepressant evidence; expect the proof-of-concept RCT + mechanism reviews.",
    expectedStudyTypes: ["rct", "narrative_review"],
    mustHaves: [
      {
        label: "Zarate ketamine RCT (Arch Gen Psychiatry 2006)",
        pmids: ["16894061"],
        dois: ["10.1001/archpsyc.63.8.856"],
      },
    ],
  },
  {
    id: "psy-lithium-bipolar-maintenance",
    query: "lithium versus valproate for relapse prevention in bipolar disorder",
    category: "therapy_comparison",
    intent: "Maintenance therapy comparison in bipolar I disorder (BALANCE + meta-analyses).",
    expectedStudyTypes: ["rct", "meta_analysis"],
    mustHaves: [
      {
        label: "BALANCE (Geddes, Lancet 2010)",
        pmids: ["20092882"],
        dois: ["10.1016/S0140-6736(09)61828-6"],
      },
    ],
  },
  {
    id: "psy-ssri-vs-placebo-depression",
    query:
      "In adults with major depressive disorder, do SSRIs compared with placebo reduce depressive symptoms?",
    category: "pico",
    intent: "P=MDD, I=SSRI, C=placebo, O=symptom reduction/response. Expect large RCTs + network meta-analyses (Cipriani).",
    expectedStudyTypes: ["meta_analysis", "systematic_review", "rct"],
  },

  // ── Oncology ───────────────────────────────────────────────────────────
  {
    id: "exact-flaura-osimertinib",
    query: "Osimertinib in Untreated EGFR-Mutated Advanced Non-Small-Cell Lung Cancer",
    category: "exact_paper",
    intent: "Retrieve the FLAURA primary results paper by its exact title.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "FLAURA (Soria, NEJM 2018)",
        pmids: ["29151359"],
        dois: ["10.1056/NEJMoa1713137"],
      },
    ],
  },
  {
    id: "exact-keynote-006-melanoma",
    query: "Pembrolizumab versus Ipilimumab in Advanced Melanoma",
    category: "exact_paper",
    intent: "Retrieve the KEYNOTE-006 primary results paper by its exact title.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "KEYNOTE-006 (Robert, NEJM 2015)",
        pmids: ["25891173"],
        dois: ["10.1056/NEJMoa1503093"],
      },
    ],
  },
  {
    id: "family-keynote-trials",
    query: "KEYNOTE pembrolizumab trials across tumor types",
    category: "trial_family",
    intent: "Resolve the KEYNOTE program to its landmark pembrolizumab RCTs (e.g. KEYNOTE-006 melanoma, KEYNOTE-189 NSCLC).",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "Any landmark KEYNOTE trial (006 melanoma / 189 NSCLC)",
        pmids: ["25891173", "29658856"],
        dois: ["10.1056/NEJMoa1503093", "10.1056/NEJMoa1801005"],
      },
    ],
  },
  {
    id: "onc-her2-adjuvant-residual",
    query: "trastuzumab emtansine T-DM1 for residual HER2-positive breast cancer after neoadjuvant therapy",
    category: "therapy_comparison",
    intent: "Adjuvant T-DM1 vs trastuzumab for residual invasive HER2+ disease (KATHERINE).",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "KATHERINE (von Minckwitz, NEJM 2019)",
        pmids: ["30516102"],
        dois: ["10.1056/NEJMoa1814017"],
      },
    ],
  },
  {
    id: "onc-immunotherapy-broad",
    query: "immune checkpoint inhibitors for advanced solid tumors overview",
    category: "broad_clinical",
    intent: "Broad landscape of PD-1/PD-L1/CTLA-4 checkpoint blockade across solid tumors; expect landmark RCTs + reviews.",
    expectedStudyTypes: ["rct", "narrative_review", "systematic_review"],
  },
  {
    id: "onc-car-t-lbcl-pico",
    query:
      "In patients with relapsed large B-cell lymphoma, does CAR-T therapy versus salvage chemotherapy improve event-free survival?",
    category: "pico",
    intent: "P=relapsed/refractory LBCL, I=CD19 CAR-T, C=standard salvage+ASCT, O=EFS/OS (ZUMA-7/TRANSFORM).",
    expectedStudyTypes: ["rct"],
  },
  {
    id: "onc-checkpoint-irae-safety",
    query: "immune-related adverse events with checkpoint inhibitors incidence and management",
    category: "safety_adverse_event",
    intent: "Frequency/spectrum of irAEs (colitis, pneumonitis, myocarditis, endocrinopathies); expect meta-analyses + cohorts.",
    expectedStudyTypes: ["meta_analysis", "cohort", "systematic_review"],
  },

  // ── Neurology ──────────────────────────────────────────────────────────
  {
    id: "exact-dawn-thrombectomy",
    query: "Thrombectomy 6 to 24 Hours after Stroke with a Mismatch between Deficit and Infarct",
    category: "exact_paper",
    intent: "Retrieve the DAWN late-window thrombectomy primary paper by its exact title.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "DAWN (Nogueira, NEJM 2018)",
        pmids: ["29129157"],
        dois: ["10.1056/NEJMoa1706442"],
      },
    ],
  },
  {
    id: "neuro-thrombectomy-broad",
    query: "endovascular thrombectomy for acute ischemic stroke large vessel occlusion",
    category: "broad_clinical",
    intent: "Overview of mechanical thrombectomy for LVO stroke; expect landmark RCTs (MR CLEAN/DAWN/DEFUSE-3) + guidelines.",
    expectedStudyTypes: ["rct", "guideline", "meta_analysis"],
  },
  {
    id: "neuro-tenecteplase-vs-alteplase",
    query: "tenecteplase versus alteplase for thrombolysis in acute ischemic stroke",
    category: "therapy_comparison",
    intent: "Head-to-head thrombolytic comparison in acute stroke (EXTEND-IA TNK, AcT, NOR-TEST).",
    expectedStudyTypes: ["rct", "meta_analysis"],
    mustHaves: [
      { label: "EXTEND-IA TNK family", titleIncludes: ["tenecteplase", "extend-ia tnk"] },
    ],
  },
  {
    id: "neuro-lecanemab-pico",
    query:
      "In patients with early Alzheimer disease, do anti-amyloid antibodies versus placebo slow cognitive decline?",
    category: "pico",
    intent: "P=early AD, I=anti-amyloid mAb (lecanemab/donanemab), C=placebo, O=CDR-SB/cognitive decline + ARIA safety.",
    expectedStudyTypes: ["rct", "meta_analysis"],
  },
  {
    id: "neuro-ms-dmt-comparison",
    query: "high-efficacy versus moderate-efficacy disease-modifying therapy for relapsing multiple sclerosis",
    category: "therapy_comparison",
    intent: "Treatment strategy comparison in RRMS (early high-efficacy vs escalation); expect RCTs + cohorts.",
    expectedStudyTypes: ["rct", "cohort", "meta_analysis"],
  },
  {
    id: "neuro-epilepsy-guideline",
    query: "guideline for management of status epilepticus in adults",
    category: "guideline",
    intent: "Authoritative status epilepticus treatment guideline (e.g. AES/NCS) should rank top.",
    expectedStudyTypes: ["guideline"],
  },

  // ── Infectious disease ─────────────────────────────────────────────────
  {
    id: "exact-recovery-tocilizumab",
    query: "Tocilizumab in patients admitted to hospital with COVID-19 (RECOVERY): a randomised controlled platform trial",
    category: "exact_paper",
    intent: "Retrieve the RECOVERY tocilizumab primary results paper by its exact title.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "RECOVERY tocilizumab (Lancet 2021)",
        pmids: ["33933206"],
        dois: ["10.1016/S0140-6736(21)00676-0"],
      },
    ],
  },
  {
    id: "id-hiv-prep-pico",
    query:
      "In adults at risk of HIV, does long-acting injectable cabotegravir versus daily oral PrEP reduce HIV acquisition?",
    category: "pico",
    intent: "P=HIV-negative at risk, I=LA cabotegravir, C=oral TDF/FTC, O=incident HIV (HPTN 083/084).",
    expectedStudyTypes: ["rct"],
  },
  {
    id: "id-sepsis-broad",
    query: "early management of sepsis and septic shock in adults",
    category: "broad_clinical",
    intent: "Overview of sepsis bundle/resuscitation; expect Surviving Sepsis guidelines + landmark RCTs.",
    expectedStudyTypes: ["guideline", "rct", "systematic_review"],
  },
  {
    id: "id-antibiotic-duration-pneumonia",
    query: "short course versus long course antibiotic therapy for community-acquired pneumonia",
    category: "therapy_comparison",
    intent: "Antibiotic duration comparison in CAP; expect non-inferiority RCTs + meta-analyses.",
    expectedStudyTypes: ["rct", "meta_analysis"],
  },
  {
    id: "id-paxlovid-recency",
    query: "latest evidence nirmatrelvir-ritonavir for COVID-19 in vaccinated outpatients",
    category: "recency",
    intent: "Most recent efficacy data for nirmatrelvir-ritonavir in standard-risk/vaccinated populations. Newer is better.",
    recencyBiased: true,
    expectedStudyTypes: ["rct", "cohort"],
  },
  {
    id: "id-fluoroquinolone-cdiff-safety",
    query: "fluoroquinolone exposure and risk of Clostridioides difficile infection",
    category: "safety_adverse_event",
    intent: "Association between fluoroquinolones and C. difficile; expect cohort/case-control + meta-analyses.",
    expectedStudyTypes: ["cohort", "meta_analysis", "systematic_review"],
  },

  // ── Endocrinology ──────────────────────────────────────────────────────
  {
    id: "endo-surmount-obesity",
    query: "tirzepatide once weekly for the treatment of obesity",
    category: "therapy_comparison",
    intent: "Pivotal tirzepatide weight-loss RCT in obesity without diabetes (SURMOUNT-1).",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "SURMOUNT-1 (Jastreboff, NEJM 2022)",
        pmids: ["35658024"],
        dois: ["10.1056/NEJMoa2206038"],
      },
    ],
  },
  {
    id: "exact-select-semaglutide",
    query: "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes",
    category: "exact_paper",
    intent: "Retrieve the SELECT cardiovascular outcomes trial primary paper by its exact title.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "SELECT (Lincoff, NEJM 2023)",
        pmids: ["37952131"],
        dois: ["10.1056/NEJMoa2307563"],
      },
    ],
  },
  {
    id: "endo-thyroid-guideline",
    query: "ATA guideline management of hypothyroidism levothyroxine",
    category: "guideline",
    intent: "American Thyroid Association hypothyroidism/levothyroxine guidance should rank top.",
    expectedStudyTypes: ["guideline"],
  },
  {
    id: "endo-glp1-mechanism",
    query: "mechanism of action of GLP-1 receptor agonists on appetite and weight",
    category: "mechanism",
    intent: "Central and peripheral mechanisms of GLP-1 RA-induced weight loss; expect reviews + translational studies.",
    expectedStudyTypes: ["narrative_review", "systematic_review"],
  },
  {
    id: "endo-t2dm-first-line-pico",
    query:
      "In adults with newly diagnosed type 2 diabetes, does metformin versus lifestyle alone improve glycemic control?",
    category: "pico",
    intent: "P=new T2DM, I=metformin, C=lifestyle/placebo, O=HbA1c/glycemic outcomes (UKPDS/DPP).",
    expectedStudyTypes: ["rct", "meta_analysis"],
  },

  // ── Nephrology ─────────────────────────────────────────────────────────
  {
    id: "exact-dapa-ckd",
    query: "Dapagliflozin in Patients with Chronic Kidney Disease",
    category: "exact_paper",
    intent: "Retrieve the DAPA-CKD primary results paper by its exact title.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "DAPA-CKD (Heerspink, NEJM 2020)",
        pmids: ["32970396"],
        dois: ["10.1056/NEJMoa2024816"],
      },
    ],
  },
  {
    id: "neph-finerenone-pico",
    query:
      "In patients with diabetic kidney disease, does finerenone versus placebo reduce kidney disease progression?",
    category: "pico",
    intent: "P=CKD+T2DM, I=finerenone, C=placebo, O=kidney/CV composite (FIDELIO-DKD/FIGARO-DKD).",
    expectedStudyTypes: ["rct", "meta_analysis"],
  },
  {
    id: "neph-iga-nephropathy-recency",
    query: "newest treatments for IgA nephropathy 2024 2025",
    category: "recency",
    intent: "Recent IgA nephropathy therapeutics (sparsentan, targeted-release budesonide, APRIL/BAFF inhibitors). Newer is better.",
    recencyBiased: true,
    expectedStudyTypes: ["rct"],
  },
  {
    id: "neph-ckd-anemia-broad",
    query: "management of anemia in chronic kidney disease ESAs and HIF inhibitors",
    category: "broad_clinical",
    intent: "Overview of anemia management in CKD; expect KDIGO guidance, ESA/HIF-PHI RCTs + SRs.",
    expectedStudyTypes: ["guideline", "rct", "systematic_review"],
  },

  // ── Cardiology trial-families + SR/MA + recency ────────────────────────
  {
    id: "family-partner-trials",
    query: "PARTNER trials transcatheter aortic valve replacement",
    category: "trial_family",
    intent: "Resolve the PARTNER program to its landmark TAVR RCTs (PARTNER 1/2/3).",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "PARTNER 3 low-risk (Mack/Leon, NEJM 2019)",
        pmids: ["30883058"],
        dois: ["10.1056/NEJMoa1814052"],
      },
    ],
  },
  {
    id: "family-emperor-sglt2-hf",
    query: "EMPEROR empagliflozin heart failure outcome trials",
    category: "trial_family",
    intent: "Resolve the EMPEROR program to its landmark empagliflozin HF RCTs (EMPEROR-Reduced/Preserved).",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "EMPEROR-Reduced (Packer, NEJM 2020)",
        pmids: ["32865377"],
        dois: ["10.1056/NEJMoa2022190"],
      },
    ],
  },
  {
    id: "exact-plato-ticagrelor",
    query: "Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes",
    category: "exact_paper",
    intent: "Retrieve the PLATO primary results paper by its exact title.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "PLATO (Wallentin, NEJM 2009)",
        pmids: ["19717846"],
        dois: ["10.1056/NEJMoa0904327"],
      },
    ],
  },
  {
    id: "sr-doac-vs-warfarin-metaanalysis",
    query: "meta-analysis of DOACs versus warfarin for atrial fibrillation efficacy and bleeding",
    category: "systematic_review",
    intent: "Pooled DOAC-vs-warfarin efficacy/safety; high-quality meta-analyses should dominate.",
    expectedStudyTypes: ["meta_analysis", "systematic_review"],
  },
  {
    id: "sr-pci-vs-cabg-metaanalysis",
    query: "systematic review PCI versus CABG multivessel coronary disease mortality",
    category: "systematic_review",
    intent: "Pooled revascularization comparison; expect patient-level meta-analyses near the top.",
    expectedStudyTypes: ["meta_analysis", "systematic_review"],
  },
  {
    id: "guideline-esc-heart-failure",
    query: "ESC guidelines for the diagnosis and treatment of acute and chronic heart failure",
    category: "guideline",
    intent: "ESC heart failure guideline should rank top.",
    expectedStudyTypes: ["guideline"],
  },
  {
    id: "recency-tavr-2025",
    query: "latest 2025 transcatheter aortic valve replacement long-term outcome trials",
    category: "recency",
    intent: "Most recent TAVR long-term/expanded-indication evidence. Newer is better.",
    recencyBiased: true,
    expectedStudyTypes: ["rct", "meta_analysis"],
  },
  {
    id: "lto-stampede-bariatric-cardiac",
    query: "long-term diabetes remission after bariatric surgery versus medical therapy",
    category: "long_term_outcomes",
    intent: "Durability of glycemic benefit/remission at ≥5yr (STAMPEDE/SOS).",
    expectedStudyTypes: ["rct", "cohort"],
    mustHaves: [
      {
        label: "STAMPEDE 5-year (Schauer, NEJM 2017)",
        pmids: ["28199805"],
        dois: ["10.1056/NEJMoa1600869"],
      },
    ],
  },

  // ── Recency (additional, non-cardiology) ───────────────────────────────
  {
    id: "recency-esketamine-monotherapy-2025",
    query: "newest 2025 esketamine monotherapy trial treatment-resistant depression",
    category: "recency",
    intent: "Most recent esketamine-monotherapy efficacy evidence in TRD. Newer is better.",
    recencyBiased: true,
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "Esketamine monotherapy RCT (Janik, JAMA Psychiatry 2025)",
        pmids: ["40601310"],
        dois: ["10.1001/jamapsychiatry.2025.1317"],
      },
    ],
  },

  // ── More trial-families / trial-acronyms (toward ~20% weighting) ───────
  {
    id: "family-evolut-trials",
    query: "Evolut trials self-expanding transcatheter aortic valve replacement",
    category: "trial_family",
    intent: "Resolve the Evolut program to its landmark self-expanding TAVR RCTs (Evolut Low Risk, SURTAVI).",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "Evolut Low Risk (Popma, NEJM 2019)",
        pmids: ["30883053"],
        dois: ["10.1056/NEJMoa1816885"],
      },
    ],
  },
  {
    id: "family-sglt2-cvot-trials",
    query: "SGLT2 inhibitor cardiovascular outcome trials EMPA-REG DECLARE CANVAS",
    category: "trial_family",
    intent: "Resolve the SGLT2i CVOT family to its landmark trials (EMPA-REG OUTCOME, DECLARE-TIMI 58, CANVAS).",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "EMPA-REG OUTCOME (Zinman, NEJM 2015)",
        pmids: ["26378978"],
        dois: ["10.1056/NEJMoa1504720"],
      },
    ],
  },
  {
    id: "acronym-aristotle",
    query: "ARISTOTLE trial apixaban atrial fibrillation",
    category: "trial_acronym",
    intent: "Resolve ARISTOTLE to the apixaban-vs-warfarin AF RCT.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "ARISTOTLE (Granger, NEJM 2011)",
        pmids: ["21870978"],
        dois: ["10.1056/NEJMoa1107039"],
      },
    ],
  },
  {
    id: "acronym-empa-reg",
    query: "EMPA-REG OUTCOME empagliflozin cardiovascular mortality type 2 diabetes",
    category: "trial_acronym",
    intent: "Resolve EMPA-REG OUTCOME to the empagliflozin CV-mortality CVOT.",
    expectedStudyTypes: ["rct"],
    mustHaves: [
      {
        label: "EMPA-REG OUTCOME (Zinman, NEJM 2015)",
        pmids: ["26378978"],
        dois: ["10.1056/NEJMoa1504720"],
      },
    ],
  },
  {
    id: "family-zuma-cart-trials",
    query: "ZUMA axicabtagene ciloleucel CAR-T trials large B-cell lymphoma",
    category: "trial_family",
    intent: "Resolve the ZUMA program to its landmark axi-cel CAR-T trials (ZUMA-1 pivotal, ZUMA-7 second-line).",
    expectedStudyTypes: ["rct", "clinical_trial"],
    mustHaves: [
      { label: "ZUMA axi-cel trial family", titleIncludes: ["axicabtagene ciloleucel", "zuma"] },
    ],
  },

  // ── Ambiguous-acronym disambiguation ───────────────────────────────────
  {
    id: "ambiguous-ace-acronym",
    query: "ACE trial",
    category: "ambiguous_acronym",
    intent:
      "Deliberately ambiguous: 'ACE' could mean the ACE cardiology trial, an Adverse Childhood Experiences study, or angiotensin-converting enzyme work. A good ranker surfaces named clinical trials and asks for disambiguation rather than committing to one meaning.",
    notes:
      "Adversarial-ish: no single correct paper. Tests whether ranking degrades gracefully on an under-specified acronym; no mustHaves.",
  },
  {
    id: "ambiguous-cast-acronym",
    query: "CAST trial cardiology",
    category: "ambiguous_acronym",
    intent:
      "'CAST' maps to the Cardiac Arrhythmia Suppression Trial (antiarrhythmics post-MI increased mortality) but also to oncology/stroke CAST studies. Expect the landmark CAST antiarrhythmic RCT to surface when 'cardiology' is given.",
    expectedStudyTypes: ["rct"],
    notes:
      "Disambiguation test. The classic CAST showed encainide/flecainide INCREASED mortality — a famous counterintuitive result. titleIncludes left off intentionally; council judges relevance.",
  },

  // ── Negative controls (famous-but-irrelevant trap papers) ──────────────
  {
    id: "negctrl-keynote-heart-failure",
    query: "KEYNOTE trial for heart failure with reduced ejection fraction",
    category: "negative_control",
    intent:
      "There is NO KEYNOTE heart-failure trial — KEYNOTE is an oncology (pembrolizumab) program. A correct ranker should NOT surface KEYNOTE-189/006 oncology papers as if they answered a heart-failure question.",
    notes:
      "Negative control. TRAP: the famous oncology KEYNOTE papers share the surface acronym 'KEYNOTE' but are irrelevant to HFrEF. Surfacing KEYNOTE-189 (NSCLC) or KEYNOTE-006 (melanoma) here is a FALSE positive. A good result returns genuine HFrEF evidence (or nothing), never the oncology KEYNOTE trials.",
  },
  {
    id: "negctrl-dapa-oncology",
    query: "DAPA trial for metastatic breast cancer chemotherapy",
    category: "negative_control",
    intent:
      "The DAPA-HF/DAPA-CKD trials are dapagliflozin cardiology/nephrology trials, NOT oncology. The query invents a non-existent breast-cancer 'DAPA' trial.",
    notes:
      "Negative control. TRAP: dapagliflozin 'DAPA-*' trials (DAPA-HF PMID 31535829, DAPA-CKD PMID 32970396) share the 'DAPA' token but are irrelevant to metastatic breast cancer chemotherapy. Surfacing them is a FALSE positive driven by acronym collision.",
  },
  {
    id: "negctrl-recovery-orthopedics",
    query: "RECOVERY trial enhanced recovery after hip replacement surgery",
    category: "negative_control",
    intent:
      "The landmark RECOVERY platform trial is about COVID-19 therapeutics (dexamethasone, tocilizumab), NOT orthopedic enhanced-recovery-after-surgery protocols.",
    notes:
      "Negative control. TRAP: the COVID-19 RECOVERY papers (dexamethasone PMID 32678530, tocilizumab PMID 33933206) match the word 'recovery' but are irrelevant to ERAS/hip-replacement. A good ranker returns orthopedic ERAS literature, not the COVID RECOVERY trial.",
  },
];

export const CATEGORY_COUNTS: Record<QueryCategory, number> = BENCHMARK_QUERIES.reduce(
  (acc, q) => {
    acc[q.category] = (acc[q.category] ?? 0) + 1;
    return acc;
  },
  {} as Record<QueryCategory, number>
);
