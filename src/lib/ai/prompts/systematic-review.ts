/**
 * AI prompts for the PRISMA-compliant systematic review pipeline.
 *
 * Covers:
 *  - Search strategy generation (PICO → MeSH/Boolean)
 *  - Triple-agent screening (title/abstract & full-text)
 *  - RoB 2 risk-of-bias assessment
 *  - Structured data extraction
 */

// ---------------------------------------------------------------------------
// Search Strategy Generation
// ---------------------------------------------------------------------------

export function getSearchStrategyPrompt(pico: {
  population: string;
  intervention: string;
  comparison?: string;
  outcome: string;
}) {
  return `You are a medical librarian expert in constructing systematic review search strategies.

Given the following PICO framework, generate a comprehensive PubMed search strategy:

Population: ${pico.population}
Intervention: ${pico.intervention}
Comparison: ${pico.comparison || "Not specified"}
Outcome: ${pico.outcome}

Your response must include:
1. MeSH terms for each PICO element (use correct MeSH headings)
2. Free-text synonyms and alternate spellings for each element
3. A complete Boolean search string combining all elements with AND/OR
4. Filters to consider (study type, date range, language)

Format the search string so it can be directly pasted into PubMed Advanced Search.
Use [MeSH Terms] tags for MeSH headings and [tiab] for title/abstract free text.
Combine synonyms within each PICO element with OR, then combine elements with AND.`;
}

// ---------------------------------------------------------------------------
// Triple-Agent Screening — each agent gets a different "persona"
// ---------------------------------------------------------------------------

const SCREENING_BASE = `You are evaluating a research paper for inclusion in a systematic review.

INCLUSION/EXCLUSION CRITERIA:
{criteria}

PAPER:
Title: {title}
Abstract: {abstract}

Evaluate whether this paper meets ALL inclusion criteria and does not meet ANY exclusion criteria.

You MUST respond with a JSON object containing:
- "decision": "include" | "exclude" | "uncertain"
- "confidence": a number between 0 and 1
- "reasoning": a 2-3 sentence explanation of your decision
- "matched_inclusion": array of inclusion criteria IDs that this paper matches
- "matched_exclusion": array of exclusion criteria IDs that triggered exclusion (if any)`;

export function getScreeningAgentPrompt(
  agentIndex: 0 | 1 | 2,
  criteria: string,
  title: string,
  abstract: string
): string {
  const personas = [
    // Agent 0: Sensitivity-focused (minimize false exclusions)
    `You are Agent A — a sensitivity-focused screener. Your primary goal is to MINIMIZE FALSE EXCLUSIONS. When in doubt, err on the side of inclusion. Only exclude papers that clearly fail the criteria.`,
    // Agent 1: Specificity-focused (minimize false inclusions)
    `You are Agent B — a specificity-focused screener. Your primary goal is to ensure PRECISION. Carefully check each criterion and only include papers that clearly match all requirements.`,
    // Agent 2: Balanced reviewer
    `You are Agent C — a balanced methodological reviewer. Weigh both inclusion and exclusion criteria equally. Focus on study design and methodological alignment with the review protocol.`,
  ];

  return `${personas[agentIndex]}

${SCREENING_BASE
  .replace("{criteria}", criteria)
  .replace("{title}", title)
  .replace("{abstract}", abstract)}`;
}

export function getFullTextScreeningPrompt(
  criteria: string,
  title: string,
  fullText: string
): string {
  return `You are conducting full-text screening for a systematic review.

INCLUSION/EXCLUSION CRITERIA:
${criteria}

PAPER:
Title: ${title}

Full text (truncated if necessary):
${fullText.slice(0, 15000)}

Evaluate whether this paper meets ALL inclusion criteria based on the full text.
Pay special attention to:
- Study design and methodology
- Population characteristics
- Intervention/exposure details
- Outcome measures reported
- Follow-up duration

Respond with a JSON object:
- "decision": "include" | "exclude"
- "confidence": a number between 0 and 1
- "reasoning": detailed explanation (3-5 sentences)
- "matched_inclusion": array of criteria IDs met
- "matched_exclusion": array of criteria IDs that triggered exclusion
- "extraction_notes": any notes relevant for data extraction phase`;
}

// ---------------------------------------------------------------------------
// RoB 2 (Risk of Bias) Assessment
// ---------------------------------------------------------------------------

export const ROB2_DOMAINS = [
  {
    id: "D1",
    name: "Randomization process",
    questions: [
      "Was the allocation sequence random?",
      "Was the allocation sequence concealed until participants were enrolled and assigned to interventions?",
      "Did baseline differences between intervention groups suggest a problem with the randomization process?",
    ],
  },
  {
    id: "D2",
    name: "Deviations from intended interventions",
    questions: [
      "Were participants aware of their assigned intervention during the trial?",
      "Were carers and people delivering the interventions aware of participants' assigned intervention during the trial?",
      "Were there deviations from the intended intervention that arose because of the trial context?",
      "Were these deviations likely to have affected the outcome?",
      "Was an appropriate analysis used to estimate the effect of assignment to intervention?",
    ],
  },
  {
    id: "D3",
    name: "Missing outcome data",
    questions: [
      "Were data for this outcome available for all, or nearly all, participants randomized?",
      "Is there evidence that the result was not biased by missing outcome data?",
      "Could missingness in the outcome depend on its true value?",
      "Is it likely that missingness in the outcome depended on its true value?",
    ],
  },
  {
    id: "D4",
    name: "Measurement of the outcome",
    questions: [
      "Was the method of measuring the outcome inappropriate?",
      "Could measurement or ascertainment of the outcome have differed between intervention groups?",
      "Were outcome assessors aware of the intervention received by study participants?",
      "Could assessment of the outcome have been influenced by knowledge of intervention received?",
      "Is it likely that assessment of the outcome was influenced by knowledge of intervention received?",
    ],
  },
  {
    id: "D5",
    name: "Selection of the reported result",
    questions: [
      "Were the data that produced this result analysed in accordance with a pre-specified analysis plan?",
      "Is the numerical result being assessed likely to have been selected from multiple eligible outcome measurements or analyses?",
      "Is the numerical result being assessed likely to have been selected from multiple eligible outcome measurements or analyses of the data?",
    ],
  },
] as const;

export function getRoB2AssessmentPrompt(
  title: string,
  textContent: string,
  domain: (typeof ROB2_DOMAINS)[number]
): string {
  const questionsFormatted = domain.questions
    .map((q, i) => `  ${i + 1}. ${q}`)
    .join("\n");

  return `You are an expert in assessing risk of bias in randomized controlled trials using the Cochrane RoB 2 tool.

PAPER:
Title: ${title}

Relevant text:
${textContent.slice(0, 12000)}

DOMAIN: ${domain.id} — ${domain.name}

SIGNALING QUESTIONS:
${questionsFormatted}

For each signaling question, provide:
- "answer": "Yes" | "Probably yes" | "Probably no" | "No" | "No information"
- "support": quote or paraphrase from the text supporting your answer

Then provide an overall domain judgment:
- "judgment": "Low" | "Some concerns" | "High"
- "rationale": 2-3 sentence explanation

Respond as a JSON object with:
{
  "domain": "${domain.id}",
  "domainName": "${domain.name}",
  "signalingQuestions": [
    { "question": "...", "answer": "...", "support": "..." }
  ],
  "judgment": "Low" | "Some concerns" | "High",
  "rationale": "..."
}`;
}

// ---------------------------------------------------------------------------
// ROBINS-I (Risk of Bias in Non-randomized Studies of Interventions)
// ---------------------------------------------------------------------------

export const ROBINS_I_DOMAINS = [
  {
    id: "robins_i_confounding",
    name: "Bias due to confounding",
    questions: [
      "Is there potential for confounding of the effect of intervention in this study?",
      "Were all important confounders measured and controlled for?",
      "Did the authors use appropriate methods to control for confounding?",
    ],
  },
  {
    id: "robins_i_selection",
    name: "Bias in selection of participants into the study",
    questions: [
      "Was selection of participants into the study (or into the analysis) based on participant characteristics observed after the start of intervention?",
      "Do start of follow-up and start of intervention coincide for most participants?",
      "Were adjustment techniques used that are likely to correct for the presence of selection biases?",
    ],
  },
  {
    id: "robins_i_classification",
    name: "Bias in classification of interventions",
    questions: [
      "Were intervention groups clearly defined?",
      "Was the information used to define intervention groups recorded at the start of the intervention?",
      "Could classification of intervention status have been affected by knowledge of the outcome or risk of the outcome?",
    ],
  },
  {
    id: "robins_i_deviations",
    name: "Bias due to deviations from intended interventions",
    questions: [
      "Were there deviations from the intended intervention beyond what would be expected in usual care?",
      "Were these deviations from intended intervention unbalanced between groups and likely to have affected the outcome?",
      "Was an appropriate analysis used to estimate the effect of assignment to intervention?",
      "Was there potential for failure to implement the intended intervention?",
    ],
  },
  {
    id: "robins_i_missing_data",
    name: "Bias due to missing data",
    questions: [
      "Were outcome data available for all, or nearly all, participants?",
      "Is there evidence that the result was not biased by missing outcome data?",
      "Could missingness in the outcome depend on its true value?",
      "Could missingness in the outcome have been related to assignment to intervention?",
    ],
  },
  {
    id: "robins_i_measurement",
    name: "Bias in measurement of outcomes",
    questions: [
      "Could the outcome measure have been influenced by knowledge of the intervention received?",
      "Were outcome assessors aware of the intervention received by study participants?",
      "Were the methods of outcome assessment comparable across intervention groups?",
      "Were any systematic errors in measurement of the outcome related to intervention received?",
    ],
  },
  {
    id: "robins_i_reporting",
    name: "Bias in selection of the reported result",
    questions: [
      "Were the data that produced this result analysed in accordance with a pre-specified analysis plan?",
      "Were multiple eligible outcome measurements or analysis methods available for this outcome?",
      "Is the reported result likely to have been selected from multiple eligible analyses?",
    ],
  },
] as const;

export function getROBINSIAssessmentPrompt(
  title: string,
  textContent: string,
  domain: (typeof ROBINS_I_DOMAINS)[number]
): string {
  const questionsFormatted = domain.questions
    .map((q, i) => `  ${i + 1}. ${q}`)
    .join("\n");

  return `You are an expert in assessing risk of bias in non-randomized studies of interventions (NRSI) using the ROBINS-I tool developed by Cochrane.

ROBINS-I uses four judgment categories:
- "Low": The study is comparable to a well-performed randomised trial with respect to this domain.
- "Moderate": The study is sound for a non-randomised study with respect to this domain but cannot be considered comparable to a well-performed randomised trial.
- "Serious": The study has some important problems in this domain.
- "Critical": The study is too seriously flawed to provide any useful evidence on this domain.
- "No information": No information is provided to allow a judgment.

PAPER:
Title: ${title}

Relevant text:
${textContent.slice(0, 12000)}

DOMAIN: ${domain.id} — ${domain.name}

SIGNALING QUESTIONS:
${questionsFormatted}

For each signaling question, provide:
- "answer": "Yes" | "Probably yes" | "Probably no" | "No" | "No information"
- "support": quote or paraphrase from the text supporting your answer

Then provide an overall domain judgment:
- "judgment": "Low" | "Moderate" | "Serious" | "Critical" | "No information"
- "rationale": 2-3 sentence explanation citing evidence from the paper

Respond as a JSON object with:
{
  "domain": "${domain.id}",
  "domainName": "${domain.name}",
  "signalingQuestions": [
    { "question": "...", "answer": "...", "support": "..." }
  ],
  "judgment": "Low" | "Moderate" | "Serious" | "Critical" | "No information",
  "rationale": "..."
}`;
}

// ---------------------------------------------------------------------------
// Data Extraction
// ---------------------------------------------------------------------------

export function getDataExtractionPrompt(
  schema: Array<{ field: string; description: string; type: string }>,
  title: string,
  textContent: string
): string {
  const schemaFormatted = schema
    .map((s) => `- ${s.field} (${s.type}): ${s.description}`)
    .join("\n");

  return `You are extracting structured data from a research paper for a systematic review.

PAPER:
Title: ${title}

Text:
${textContent.slice(0, 15000)}

EXTRACTION SCHEMA:
${schemaFormatted}

For each field in the schema, extract the value from the paper text.
If a value is not found or not applicable, use null.
For each extracted value, provide the source quote from the text.

Respond as a JSON object with:
{
  "extractions": [
    {
      "field": "field_name",
      "value": "extracted value or null",
      "sourceQuote": "relevant quote from text",
      "confidence": 0.0-1.0
    }
  ]
}`;
}
