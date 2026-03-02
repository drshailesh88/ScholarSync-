/**
 * RALPH SR Fixture: SGLT2 Inhibitor Protocol Input
 *
 * A realistic ProtocolInput for testing protocol builder functions.
 * Models a real PROSPERO-worthy systematic review of SGLT2 inhibitors
 * in heart failure — mirrors the Cycle 1 study fixture data.
 */

import type { ProtocolInput, Protocol, PROSPEROField } from "@/lib/systematic-review/protocol-builder";

export const SGLT2_PROTOCOL_INPUT: ProtocolInput = {
  projectTitle:
    "SGLT2 Inhibitors and Cardiovascular Outcomes in Heart Failure: A Systematic Review and Meta-Analysis",
  pico: {
    population: "adults with heart failure (HFrEF and HFpEF)",
    intervention: "SGLT2 inhibitors (dapagliflozin, empagliflozin, sotagliflozin)",
    comparison: "placebo or standard of care",
    outcome:
      "composite of cardiovascular death or hospitalization for heart failure",
  },
  searchStrategy: {
    pubmedQuery:
      '("sodium-glucose transporter 2 inhibitors" OR "SGLT2 inhibitors" OR dapagliflozin OR empagliflozin OR sotagliflozin) AND ("heart failure" OR "cardiac failure") AND ("randomized controlled trial" OR "RCT")',
    databases: ["PubMed", "EMBASE", "Cochrane CENTRAL", "Web of Science"],
  },
  criteria: [
    { type: "inclusion", description: "Randomized controlled trials (RCTs)" },
    {
      type: "inclusion",
      description: "Adults ≥18 years with diagnosed heart failure",
    },
    {
      type: "inclusion",
      description:
        "SGLT2 inhibitor as active intervention vs placebo or standard care",
    },
    {
      type: "inclusion",
      description:
        "Reports composite endpoint of CV death or HF hospitalization",
    },
    { type: "exclusion", description: "Observational studies and case reports" },
    { type: "exclusion", description: "Pediatric populations" },
    {
      type: "exclusion",
      description: "Studies with <100 participants per arm",
    },
    {
      type: "exclusion",
      description: "Non-English language publications without translation",
    },
  ],
  additionalContext:
    "This review is motivated by the growing body of evidence from DAPA-HF, EMPEROR-Reduced, DELIVER, EMPEROR-Preserved, and SOLOIST-WHF trials.",
};

/** Minimal input — only a title, no PICO, no strategy, no criteria */
export const MINIMAL_PROTOCOL_INPUT: ProtocolInput = {
  projectTitle: "A Systematic Review",
};

/** Partial PICO — some fields filled, some missing */
export const PARTIAL_PICO_INPUT: ProtocolInput = {
  projectTitle: "Partial PICO Review",
  pico: {
    population: "patients with diabetes",
    intervention: "metformin",
    // comparison and outcome missing
  },
};

/** Input with empty strings instead of undefined */
export const EMPTY_STRINGS_INPUT: ProtocolInput = {
  projectTitle: "Empty Strings Review",
  pico: {
    population: "",
    intervention: "",
    comparison: "",
    outcome: "",
  },
  searchStrategy: {
    pubmedQuery: "",
    databases: [],
  },
  criteria: [],
};

/**
 * A pre-built Protocol object (16 sections) for testing export functions.
 * Simulates what generateProtocol() would return.
 */
export const MOCK_PROTOCOL: Protocol = {
  title: SGLT2_PROTOCOL_INPUT.projectTitle,
  generatedAt: "2026-03-02T10:00:00.000Z",
  prosperoId: "CRD42026000001",
  sections: [
    {
      id: "review_title",
      title: "Review Title",
      content:
        "SGLT2 Inhibitors and Cardiovascular Outcomes in Heart Failure: A Systematic Review and Meta-Analysis of Randomized Controlled Trials",
      guidance: "Provide a concise title that clearly indicates the topic.",
    },
    {
      id: "background",
      title: "Background / Rationale",
      content:
        "Heart failure affects approximately 64 million people worldwide and remains a leading cause of morbidity and mortality. SGLT2 inhibitors, originally developed for type 2 diabetes, have shown surprising cardioprotective effects.\n\nRecent landmark trials including DAPA-HF, EMPEROR-Reduced, and DELIVER have demonstrated significant reductions in cardiovascular death and heart failure hospitalization.",
      guidance: "Describe the rationale for the review.",
    },
    {
      id: "objectives",
      title: "Review Objectives",
      content:
        "To systematically review and meta-analyze the efficacy and safety of SGLT2 inhibitors compared with placebo on the composite endpoint of cardiovascular death or hospitalization for heart failure in adults with heart failure.",
      guidance: "Provide an explicit statement of the question(s).",
    },
    {
      id: "search_strategy",
      title: "Search Strategy",
      content:
        "Electronic databases including PubMed, EMBASE, Cochrane CENTRAL, and Web of Science will be searched from inception to March 2026. The search strategy combines MeSH terms and free-text terms for SGLT2 inhibitors AND heart failure AND randomized controlled trials.",
      guidance: "Present the planned search strategy.",
    },
    {
      id: "eligibility_criteria",
      title: "Eligibility Criteria",
      content:
        "Inclusion: RCTs of SGLT2 inhibitors in adults ≥18 years with diagnosed HF reporting composite CV death/HF hospitalization. Exclusion: observational studies, case reports, pediatric populations, studies with <100 participants per arm, non-English publications.",
      guidance: "Specify inclusion and exclusion criteria.",
    },
    {
      id: "population",
      title: "Population",
      content:
        "Adults (≥18 years) with a clinical diagnosis of heart failure, including both heart failure with reduced ejection fraction (HFrEF, LVEF ≤40%) and heart failure with preserved ejection fraction (HFpEF, LVEF >40%).",
      guidance: "Define the population or participants.",
    },
    {
      id: "intervention",
      title: "Intervention / Exposure",
      content:
        "SGLT2 inhibitors including dapagliflozin, empagliflozin, and sotagliflozin at any dose and duration. Treatment must be compared against placebo or standard of care.",
      guidance: "Define the intervention(s) or exposure(s).",
    },
    {
      id: "comparator",
      title: "Comparator / Control",
      content:
        "Placebo or standard of care (guideline-directed medical therapy) without SGLT2 inhibitor treatment.",
      guidance: "Define the comparator(s) or control group(s).",
    },
    {
      id: "outcomes",
      title: "Outcomes",
      content:
        "Primary outcome: composite of cardiovascular death or first hospitalization for heart failure. Secondary outcomes: all-cause mortality, cardiovascular death, HF hospitalization, Kansas City Cardiomyopathy Questionnaire (KCCQ) score change.",
      guidance: "List primary and secondary outcomes.",
    },
    {
      id: "data_extraction",
      title: "Data Extraction",
      content:
        "Two independent reviewers will extract data using a standardized form. Discrepancies will be resolved by consensus or a third reviewer. Data items: study characteristics, baseline demographics, intervention details, outcome events, and follow-up duration.",
      guidance: "Describe the methods for data extraction.",
    },
    {
      id: "risk_of_bias",
      title: "Risk of Bias Assessment",
      content:
        "Risk of bias will be assessed using the Cochrane Risk of Bias tool version 2 (RoB 2) for randomized trials. Two reviewers will independently assess each domain.",
      guidance: "Describe the tool(s) for risk of bias assessment.",
    },
    {
      id: "synthesis",
      title: "Data Synthesis",
      content:
        "Meta-analysis will be performed using both fixed-effect and random-effects (DerSimonian-Laird) models. Heterogeneity will be assessed using Cochran's Q, I², and τ². Subgroup analyses by HF phenotype (HFrEF vs HFpEF) and individual SGLT2 inhibitor are planned.",
      guidance: "Describe the planned method of synthesis.",
    },
    {
      id: "confidence",
      title: "Certainty of Evidence",
      content:
        "The certainty of evidence will be assessed using the Grading of Recommendations, Assessment, Development and Evaluations (GRADE) approach for each outcome.",
      guidance: "Describe how certainty of evidence will be assessed.",
    },
    {
      id: "dissemination",
      title: "Dissemination Plans",
      content:
        "Findings will be submitted for publication in a peer-reviewed journal and presented at relevant conferences.",
      guidance: "Describe how findings will be disseminated.",
    },
    {
      id: "timeline",
      title: "Timeline",
      content:
        "Protocol registration: March 2026. Search completion: April 2026. Data extraction: May 2026. Analysis and manuscript: June-July 2026.",
      guidance: "Provide anticipated dates.",
    },
    {
      id: "funding",
      title: "Funding / Conflicts of Interest",
      content:
        "No external funding. The authors declare no conflicts of interest.",
      guidance: "Declare sources of funding and conflicts of interest.",
    },
  ],
};

/**
 * Mock PROSPEROField array simulating auto-populated fields
 * for the SGLT2 review.
 */
export const MOCK_PROSPERO_FIELDS: PROSPEROField[] = [
  { fieldNumber: 1, fieldName: "Review title", value: "SGLT2 Inhibitors and CV Outcomes in HF", source: "auto", required: true },
  { fieldNumber: 2, fieldName: "Original language title", value: "SGLT2 Inhibitors and CV Outcomes in HF", source: "auto", required: true },
  { fieldNumber: 3, fieldName: "Anticipated or actual start date", value: "2026-03-01", source: "auto", required: true },
  { fieldNumber: 4, fieldName: "Anticipated completion date", value: "", source: "manual", required: true },
  { fieldNumber: 5, fieldName: "Stage of review", value: "Search Strategy", source: "auto", required: true },
  { fieldNumber: 6, fieldName: "Named contact", value: "", source: "manual", required: true },
  { fieldNumber: 7, fieldName: "Named contact email", value: "", source: "manual", required: true },
  { fieldNumber: 8, fieldName: "Named contact address", value: "", source: "manual", required: true },
  { fieldNumber: 9, fieldName: "Named contact phone", value: "", source: "manual", required: true },
  { fieldNumber: 10, fieldName: "Organisational affiliation", value: "", source: "manual", required: true },
  { fieldNumber: 11, fieldName: "Review team members and affiliations", value: "", source: "manual", required: true },
  { fieldNumber: 12, fieldName: "Funding sources/sponsors", value: "", source: "manual", required: true },
  { fieldNumber: 13, fieldName: "Conflicts of interest", value: "", source: "manual", required: true },
  { fieldNumber: 14, fieldName: "Collaborators", value: "", source: "manual", required: true },
  { fieldNumber: 15, fieldName: "Review question", value: "In adults with heart failure, does SGLT2 inhibitors compared with placebo, affect CV death or HF hospitalization?", source: "auto", required: true },
  { fieldNumber: 16, fieldName: "Searches (databases, date range)", value: "Databases: PubMed, EMBASE. Search date: 2026-03-01.", source: "auto", required: true },
  { fieldNumber: 17, fieldName: "URL to search strategy", value: "https://www.crd.york.ac.uk/prospero/display_record.php?RecordID=42026000001", source: "auto", required: true },
  { fieldNumber: 18, fieldName: "Condition or domain being studied", value: "SGLT2 inhibitors in adults with heart failure", source: "auto", required: true },
  { fieldNumber: 19, fieldName: "Participants/population", value: "adults with heart failure (HFrEF and HFpEF)", source: "auto", required: true },
  { fieldNumber: 20, fieldName: "Intervention(s), exposure(s)", value: "SGLT2 inhibitors (dapagliflozin, empagliflozin, sotagliflozin)", source: "auto", required: true },
  { fieldNumber: 21, fieldName: "Comparator(s)/control", value: "placebo or standard of care", source: "auto", required: true },
  { fieldNumber: 22, fieldName: "Main outcome(s)", value: "composite of cardiovascular death or hospitalization for heart failure", source: "auto", required: true },
];

/** The 16 expected PROSPERO section IDs in template order */
export const EXPECTED_SECTION_IDS = [
  "review_title",
  "background",
  "objectives",
  "search_strategy",
  "eligibility_criteria",
  "population",
  "intervention",
  "comparator",
  "outcomes",
  "data_extraction",
  "risk_of_bias",
  "synthesis",
  "confidence",
  "dissemination",
  "timeline",
  "funding",
] as const;
