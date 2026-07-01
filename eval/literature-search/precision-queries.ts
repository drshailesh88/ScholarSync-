/**
 * NICHE / BROAD precision benchmark for Manan OS literature search.
 *
 * THE GAP THIS CLOSES
 * -------------------
 * The recall benchmark (`./queries.ts`) is dominated by KNOWN-ITEM queries where
 * the answer is a famous, high-citation landmark (PARTNER 3, DAPA-HF, KEYNOTE-189).
 * On those, a citation-dominant ranking looks great. This set is the inverse: the
 * on-topic papers are NOT blockbusters, and the generic mega-cited papers are
 * exactly the wrong answer. Every query encodes:
 *
 *   - `onTopic`  — phrases that identify a genuinely on-topic paper.
 *   - `offTopic` — CURATED intruder classes: the tempting-but-wrong papers a
 *                  citation-greedy or lexically-naive ranker pulls to the top.
 *
 * The four recurring intruder archetypes (the failure class made concrete):
 *   1. Reporting/methods papers — PRISMA, GRADE, Cochrane handbook. Astronomically
 *      cited, topically empty.
 *   2. Broad parent-field guidelines — a whole-disease ESC/KDIGO/ACC-AHA guideline
 *      when the query asks about a narrow sub-entity.
 *   3. Famous-but-wrong-subtype blockbusters — HFrEF trials for an HFpEF query,
 *      checkpoint-inhibitor EFFICACY trials for an irAE-toxicity query.
 *   4. Wrong-but-lexically-similar conditions — diabetic/IgA nephropathy for a
 *      contrast-nephropathy query; GERD for eosinophilic esophagitis.
 *
 * Intruder phrases are written so they do NOT trip on the genuine niche papers
 * (e.g. HFpEF uses "enalapril"/"paradigm-hf"/"reduced ejection fraction" as the
 * HFrEF marker — never "sacubitril valsartan", which PARAGON-HF (a real HFpEF
 * trial) also carries).
 */

import type { PrecisionSpec } from "./precision-metric";

export interface PrecisionQuery extends PrecisionSpec {
  /** Stable slug (used in artifact filenames). */
  id: string;
  /** The user query as typed into the live search tab. */
  query: string;
  specialty: string;
  /** What an on-topic top-10 should actually contain. */
  intent: string;
  notes?: string;
}

/** The reporting/methods-paper intruder — cited everywhere, on-topic nowhere. */
const METHODS_INTRUDER = {
  label: "reporting/methods paper (PRISMA/GRADE/Cochrane)",
  phrases: [
    "prisma statement",
    "preferred reporting items",
    "prisma 2020",
    "grade approach",
    "grade guidelines",
    "cochrane handbook",
    "risk of bias tool",
    "consort statement",
  ],
};

export const PRECISION_QUERIES: PrecisionQuery[] = [
  // ── Nephrology: contrast-induced nephropathy (REQUIRED) ─────────────────
  {
    id: "prec-contrast-nephropathy-advances",
    query: "recent advances in management of contrast-induced nephropathy",
    specialty: "nephrology",
    intent:
      "Contrast-specific prevention/management: peri-procedural hydration, the end of routine N-acetylcysteine (PRESERVE/AMACING), minimizing contrast volume. NOT the generic AKI guideline, NOT other nephropathies.",
    onTopic: [
      "contrast-induced nephropathy",
      "contrast induced acute kidney injury",
      "contrast-associated acute kidney injury",
      "contrast nephropathy prevention",
      "periprocedural hydration contrast",
      "sodium bicarbonate contrast",
      "acetylcysteine contrast",
      "intravenous fluids angiography kidney",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "broad KDIGO AKI guideline (not contrast-specific)",
        phrases: ["kdigo clinical practice guideline acute kidney injury", "kdigo aki guideline"],
      },
      {
        label: "wrong nephropathy (diabetic/IgA/membranous)",
        phrases: ["diabetic nephropathy", "diabetic kidney disease", "iga nephropathy", "membranous nephropathy"],
      },
      {
        label: "gadolinium / nephrogenic systemic fibrosis (different entity)",
        phrases: ["gadolinium", "nephrogenic systemic fibrosis"],
      },
    ],
  },

  // ── Cardiology: HFpEF (REQUIRED) ────────────────────────────────────────
  {
    id: "prec-hfpef-management",
    query: "management of HFpEF",
    specialty: "cardiology",
    intent:
      "Heart failure with PRESERVED EF: SGLT2i (EMPEROR-Preserved, DELIVER), spironolactone (TOPCAT), sacubitril-valsartan (PARAGON-HF). The famous HFrEF blockbusters are the wrong subtype.",
    onTopic: [
      "heart failure with preserved ejection fraction",
      "hfpef",
      "preserved ejection fraction",
      "empagliflozin preserved",
      "dapagliflozin preserved",
      "spironolactone preserved",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "wrong subtype: HFrEF blockbuster",
        phrases: [
          "reduced ejection fraction",
          "hfref",
          "paradigm-hf",
          "enalapril in heart failure",
          "dapagliflozin in patients with heart failure and reduced",
        ],
      },
      {
        label: "acute decompensated / cardiogenic shock (wrong setting)",
        phrases: ["cardiogenic shock", "acute decompensated heart failure inpatient"],
      },
    ],
  },

  // ── Onco-cardiology: ICI myocarditis ────────────────────────────────────
  {
    id: "prec-ici-myocarditis",
    query: "management of immune checkpoint inhibitor associated myocarditis",
    specialty: "onco-cardiology",
    intent:
      "ICI-induced myocarditis specifically: high-dose steroids, abatacept/ruxolitinib salvage. NOT the broad irAE guideline, NOT viral/giant-cell myocarditis, NOT checkpoint-inhibitor efficacy trials.",
    onTopic: [
      "checkpoint inhibitor myocarditis",
      "immune-related myocarditis",
      "immune checkpoint inhibitor associated myocarditis",
      "ici myocarditis",
      "fulminant myocarditis immune",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "broad irAE management guideline (not myocarditis-specific)",
        phrases: ["management of immune-related adverse events", "asco guideline immune-related adverse"],
      },
      {
        label: "wrong etiology myocarditis (viral/giant-cell)",
        phrases: ["viral myocarditis", "giant cell myocarditis"],
      },
      {
        label: "checkpoint-inhibitor EFFICACY blockbuster",
        phrases: ["keynote", "checkmate", "nivolumab versus", "pembrolizumab plus chemotherapy"],
      },
    ],
  },

  // ── Neurology: refractory status migrainosus ────────────────────────────
  {
    id: "prec-status-migrainosus",
    query: "treatment of refractory status migrainosus",
    specialty: "neurology",
    intent:
      "Inpatient/ED management of intractable migraine: IV DHE, magnesium, lidocaine, dexamethasone. NOT outpatient CGRP prophylaxis blockbusters, NOT cluster/tension headache, NOT the headache classification.",
    onTopic: [
      "status migrainosus",
      "refractory migraine inpatient",
      "intractable migraine emergency",
      "dihydroergotamine status",
      "lidocaine refractory migraine",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "outpatient CGRP prophylaxis blockbuster (wrong setting)",
        phrases: [
          "erenumab",
          "galcanezumab",
          "fremanezumab for episodic migraine",
          "cgrp monoclonal antibody prevention",
        ],
      },
      {
        label: "wrong headache type (cluster/tension)",
        phrases: ["cluster headache", "tension-type headache"],
      },
      {
        label: "headache classification reference",
        phrases: ["international classification of headache disorders"],
      },
    ],
  },

  // ── Electrophysiology: CIED infection ───────────────────────────────────
  {
    id: "prec-cied-infection",
    query: "management of cardiac implantable electronic device infection",
    specialty: "electrophysiology",
    intent:
      "CIED/pacemaker pocket and lead infection: complete transvenous lead extraction, antibiotic envelope evidence. NOT native-valve endocarditis, NOT prosthetic-valve endocarditis, NOT dental prophylaxis.",
    onTopic: [
      "cardiac implantable electronic device infection",
      "cied infection",
      "pacemaker lead infection",
      "transvenous lead extraction infection",
      "device pocket infection",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "native-valve infective endocarditis (lexically close, wrong entity)",
        phrases: ["infective endocarditis", "duke criteria"],
      },
      {
        label: "prosthetic valve endocarditis (wrong site)",
        phrases: ["prosthetic valve endocarditis"],
      },
      {
        label: "general dental antibiotic prophylaxis",
        phrases: ["antibiotic prophylaxis dental procedures"],
      },
    ],
  },

  // ── Gastroenterology: eosinophilic esophagitis ──────────────────────────
  {
    id: "prec-eosinophilic-esophagitis",
    query: "recent advances in management of eosinophilic esophagitis",
    specialty: "gastroenterology",
    intent:
      "EoE-specific: dupilumab, swallowed topical (orodispersible budesonide), empiric elimination diet. NOT GERD/PPI, NOT eosinophilic ASTHMA biologics, NOT generic endoscopy-quality papers.",
    onTopic: [
      "eosinophilic esophagitis",
      "dupilumab esophagitis",
      "budesonide orodispersible esophagitis",
      "swallowed topical corticosteroid esophagitis",
      "elimination diet esophagitis",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "GERD (lexically close, wrong diagnosis)",
        phrases: ["gastroesophageal reflux disease", "proton pump inhibitor reflux"],
      },
      {
        label: "eosinophilic ASTHMA biologic (wrong organ, shares 'eosinophilic')",
        phrases: ["eosinophilic asthma", "severe asthma biologic"],
      },
      {
        label: "generic endoscopy-quality paper",
        phrases: ["adenoma detection rate", "bowel preparation colonoscopy"],
      },
    ],
  },

  // ── Heme-onc: tumor lysis syndrome ──────────────────────────────────────
  {
    id: "prec-tumor-lysis-syndrome",
    query: "prevention and management of tumor lysis syndrome",
    specialty: "hematology-oncology",
    intent:
      "TLS-specific: rasburicase vs allopurinol, risk stratification, hydration. NOT febrile neutropenia, NOT CAR-T cytokine release, NOT chronic-CKD potassium binders.",
    onTopic: [
      "tumor lysis syndrome",
      "rasburicase",
      "hyperuricemia tumor lysis",
      "uric acid nephropathy malignancy",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "febrile neutropenia (different onc emergency)",
        phrases: ["febrile neutropenia", "neutropenic fever guideline"],
      },
      {
        label: "chronic CKD hyperkalemia / potassium binders (wrong context)",
        phrases: ["chronic kidney disease hyperkalemia", "patiromer", "sodium zirconium"],
      },
      {
        label: "CAR-T cytokine release syndrome (different toxicity)",
        phrases: ["cytokine release syndrome", "car t-cell therapy"],
      },
    ],
  },

  // ── ID / Orthopedics: prosthetic joint infection ────────────────────────
  {
    id: "prec-prosthetic-joint-infection",
    query: "management of prosthetic joint infection",
    specialty: "infectious-disease",
    intent:
      "PJI-specific: DAIR vs one-/two-stage revision, biofilm-active antibiotics, rifampin combinations. NOT native septic arthritis, NOT osteomyelitis, NOT generic surgical prophylaxis.",
    onTopic: [
      "prosthetic joint infection",
      "periprosthetic joint infection",
      "two-stage revision infection",
      "debridement antibiotics implant retention",
      "biofilm prosthetic",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "native septic arthritis (lexically close, wrong entity)",
        phrases: ["native joint septic arthritis", "septic arthritis native"],
      },
      {
        label: "osteomyelitis (wrong infection)",
        phrases: ["vertebral osteomyelitis", "diabetic foot osteomyelitis"],
      },
      {
        label: "generic surgical antibiotic prophylaxis",
        phrases: ["surgical antimicrobial prophylaxis guideline"],
      },
    ],
  },

  // ── Endocrinology: nonthyroidal illness syndrome ────────────────────────
  {
    id: "prec-nonthyroidal-illness",
    query: "management of nonthyroidal illness syndrome in critically ill patients",
    specialty: "endocrinology",
    intent:
      "Euthyroid-sick / low-T3 syndrome in the ICU: whether to treat, thyroid hormone trials in critical illness. NOT levothyroxine-for-hypothyroidism blockbusters, NOT Graves/hyperthyroidism, NOT thyroid nodules.",
    onTopic: [
      "nonthyroidal illness syndrome",
      "euthyroid sick syndrome",
      "low t3 syndrome critically ill",
      "thyroid hormone critical illness",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "primary hypothyroidism levothyroxine (famous, wrong context)",
        phrases: ["levothyroxine hypothyroidism", "subclinical hypothyroidism treatment"],
      },
      {
        label: "hyperthyroidism / Graves (wrong diagnosis)",
        phrases: ["graves disease", "antithyroid drug hyperthyroidism"],
      },
      {
        label: "thyroid nodule / cancer guideline",
        phrases: ["thyroid nodule", "differentiated thyroid cancer"],
      },
    ],
  },

  // ── Rheum / Nephrology: lupus nephritis induction ───────────────────────
  {
    id: "prec-lupus-nephritis-induction",
    query: "induction therapy for proliferative lupus nephritis",
    specialty: "rheumatology",
    intent:
      "LN induction specifically: MMF, low-dose cyclophosphamide, belimumab (BLISS-LN), voclosporin (AURORA). NOT broad non-renal SLE management, NOT ANCA vasculitis, NOT other glomerulonephritides.",
    onTopic: [
      "lupus nephritis",
      "proliferative lupus nephritis",
      "voclosporin lupus",
      "belimumab lupus nephritis",
      "mycophenolate lupus induction",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "broad non-renal SLE management/classification",
        phrases: ["systemic lupus erythematosus classification criteria", "eular recommendations systemic lupus"],
      },
      {
        label: "ANCA-associated vasculitis (wrong GN, lexically close)",
        phrases: ["anca-associated vasculitis", "granulomatosis with polyangiitis"],
      },
      {
        label: "wrong glomerulonephritis (IgA/diabetic)",
        phrases: ["iga nephropathy", "diabetic nephropathy"],
      },
    ],
  },

  // ── Psychiatry: treatment-resistant schizophrenia ───────────────────────
  {
    id: "prec-clozapine-resistant-schizophrenia",
    query: "management of treatment-resistant schizophrenia with clozapine",
    specialty: "psychiatry",
    intent:
      "TRS / clozapine-specific: clozapine initiation, monitoring, augmentation strategies. NOT first-episode antipsychotic blockbusters, NOT generic antipsychotic network meta-analyses, NOT bipolar/MDD.",
    onTopic: [
      "treatment-resistant schizophrenia",
      "clozapine",
      "clozapine augmentation",
      "refractory schizophrenia",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "first-episode / first-line antipsychotic blockbuster",
        phrases: ["first-episode psychosis", "antipsychotic in first-episode"],
      },
      {
        label: "generic antipsychotic comparative meta-analysis",
        phrases: ["comparative efficacy of antipsychotic", "network meta-analysis of antipsychotic"],
      },
      {
        label: "wrong diagnosis (bipolar / major depression)",
        phrases: ["bipolar disorder", "major depressive disorder"],
      },
    ],
  },

  // ── Rheum / Heme: VEXAS syndrome (recent, no blockbuster) ───────────────
  {
    id: "prec-vexas-syndrome",
    query: "diagnosis and management of VEXAS syndrome",
    specialty: "rheumatology",
    intent:
      "VEXAS-specific: UBA1 somatic mutation, treatment (JAK inhibitors, azacitidine, allo-HSCT) in VEXAS context. NOT generic MDS treatment, NOT large-vessel vasculitis, NOT other autoinflammatory syndromes.",
    onTopic: [
      "vexas syndrome",
      "uba1 somatic",
      "ubiquitin-activating enzyme uba1",
      "vacuoles e1 enzyme",
    ],
    offTopic: [
      METHODS_INTRUDER,
      {
        label: "generic myelodysplastic syndrome treatment (parent field)",
        phrases: ["myelodysplastic syndrome treatment", "azacitidine in myelodysplastic"],
      },
      {
        label: "large-vessel vasculitis / PMR (wrong rheum entity)",
        phrases: ["giant cell arteritis", "polymyalgia rheumatica"],
      },
      {
        label: "other autoinflammatory syndrome",
        phrases: ["adult-onset still", "familial mediterranean fever"],
      },
    ],
  },
];

/** Count of queries per specialty — sanity check for benchmark balance. */
export const PRECISION_SPECIALTY_COUNTS: Record<string, number> = PRECISION_QUERIES.reduce(
  (acc, q) => {
    acc[q.specialty] = (acc[q.specialty] ?? 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);
