/**
 * Biomedical / clinical benchmark for Manan OS literature search.
 *
 * 33 queries spanning every required category. Used by the eval harness
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
  | "broad_clinical"
  | "pico"
  | "recency"
  | "systematic_review"
  | "guideline"
  | "long_term_outcomes"
  | "safety_adverse_event"
  | "therapy_comparison"
  | "mechanism";

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
];

export const CATEGORY_COUNTS: Record<QueryCategory, number> = BENCHMARK_QUERIES.reduce(
  (acc, q) => {
    acc[q.category] = (acc[q.category] ?? 0) + 1;
    return acc;
  },
  {} as Record<QueryCategory, number>
);
