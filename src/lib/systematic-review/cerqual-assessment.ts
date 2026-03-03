/**
 * GRADE-CERQual (Confidence in the Evidence from Reviews of
 * Qualitative Research) Assessment Engine
 *
 * CERQual provides a transparent framework for assessing confidence
 * in findings from qualitative evidence syntheses.
 *
 * Four assessment components:
 * 1. Methodological Limitations — quality of underlying primary studies
 * 2. Coherence — how well the data supports the review finding
 * 3. Adequacy of Data — richness and quantity of supporting data
 * 4. Relevance — applicability to the review question context
 *
 * Confidence levels (starting from "high" and downgrading):
 * - High: No or very minor concerns across all components
 * - Moderate: Minor concerns in one or more components
 * - Low: Moderate concerns in one or more components
 * - Very Low: Serious concerns in one or more components
 *
 * Reference: Lewin et al., J Clin Epidemiol 2018;97:13-20
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CERQualConfidence = "high" | "moderate" | "low" | "very low";

export type CERQualConcern = "no concerns" | "minor" | "moderate" | "serious";

export type CERQualComponent =
  | "methodological_limitations"
  | "coherence"
  | "adequacy"
  | "relevance";

export const CERQUAL_COMPONENT_LABELS: Record<CERQualComponent, string> = {
  methodological_limitations: "Methodological Limitations",
  coherence: "Coherence",
  adequacy: "Adequacy of Data",
  relevance: "Relevance",
};

export const CERQUAL_CONCERN_LABELS: Record<CERQualConcern, string> = {
  "no concerns": "No or very minor concerns",
  minor: "Minor concerns",
  moderate: "Moderate concerns",
  serious: "Serious concerns",
};

export const CERQUAL_CONFIDENCE_LABELS: Record<CERQualConfidence, string> = {
  high: "High confidence",
  moderate: "Moderate confidence",
  low: "Low confidence",
  "very low": "Very low confidence",
};

export interface CERQualComponentAssessment {
  component: CERQualComponent;
  concern: CERQualConcern;
  explanation: string;
  /** Number of downgrade levels for this component (0, 1, or 2) */
  downgradeLevels: number;
}

export interface CERQualFindingAssessment {
  findingId: string;
  findingStatement: string;
  /** Number of contributing studies */
  contributingStudies: number;
  components: CERQualComponentAssessment[];
  overallConfidence: CERQualConfidence;
  explanation: string;
}

export interface CERQualSummary {
  projectId: string;
  assessments: CERQualFindingAssessment[];
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Assessment logic
// ---------------------------------------------------------------------------

/**
 * Compute overall confidence by starting at "high" and downgrading
 * based on concerns across the four components.
 *
 * Each component can downgrade by 0, 1, or 2 levels:
 * - no concerns → 0 levels
 * - minor → 0-1 levels (counted as 0.5 for fine-grained rounding)
 * - moderate → 1 level
 * - serious → 2 levels
 *
 * Total downgrade determines final confidence:
 * - 0 → high
 * - 1 → moderate
 * - 2 → low
 * - 3+ → very low
 */
export function computeCERQualConfidence(
  components: CERQualComponentAssessment[]
): CERQualConfidence {
  const totalDowngrade = components.reduce(
    (sum, c) => sum + c.downgradeLevels,
    0
  );

  if (totalDowngrade === 0) return "high";
  if (totalDowngrade === 1) return "moderate";
  if (totalDowngrade === 2) return "low";
  return "very low";
}

/**
 * Infer downgrade levels from concern level.
 * Used when the caller provides concern but not explicit downgrade levels.
 */
export function inferDowngradeLevels(concern: CERQualConcern): number {
  switch (concern) {
    case "no concerns":
      return 0;
    case "minor":
      return 1;
    case "moderate":
      return 1;
    case "serious":
      return 2;
  }
}

/**
 * Assess a single review finding using the CERQual framework.
 */
export function assessCERQualFinding(
  findingId: string,
  findingStatement: string,
  contributingStudies: number,
  components: CERQualComponentAssessment[],
  explanation: string = ""
): CERQualFindingAssessment {
  // Validate that all 4 components are present
  const componentSet = new Set(components.map((c) => c.component));
  const requiredComponents: CERQualComponent[] = [
    "methodological_limitations",
    "coherence",
    "adequacy",
    "relevance",
  ];

  for (const req of requiredComponents) {
    if (!componentSet.has(req)) {
      throw new Error(`Missing required CERQual component: ${req}`);
    }
  }

  const overallConfidence = computeCERQualConfidence(components);

  return {
    findingId,
    findingStatement,
    contributingStudies,
    components,
    overallConfidence,
    explanation:
      explanation ||
      `Overall confidence is ${overallConfidence} based on assessment of ${components.length} components.`,
  };
}

/**
 * Generate a Summary of Qualitative Findings (SoQF) table in CSV format.
 *
 * This is the CERQual equivalent of a GRADE Summary of Findings table.
 */
export function exportCERQualSoQFTable(
  assessments: CERQualFindingAssessment[]
): string {
  const headers = [
    "Finding ID",
    "Finding Statement",
    "Contributing Studies",
    "Methodological Limitations",
    "Coherence",
    "Adequacy of Data",
    "Relevance",
    "Overall Confidence",
  ];

  const rows = assessments.map((a) => {
    const getComponentConcern = (comp: CERQualComponent) => {
      const found = a.components.find((c) => c.component === comp);
      return found ? found.concern : "N/A";
    };

    return [
      a.findingId,
      `"${a.findingStatement.replace(/"/g, '""')}"`,
      `${a.contributingStudies}`,
      getComponentConcern("methodological_limitations"),
      getComponentConcern("coherence"),
      getComponentConcern("adequacy"),
      getComponentConcern("relevance"),
      a.overallConfidence,
    ];
  });

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

/**
 * Generate a visual confidence indicator.
 */
export function generateConfidenceIndicator(
  confidence: CERQualConfidence
): string {
  switch (confidence) {
    case "high":
      return "⊕⊕⊕⊕ High";
    case "moderate":
      return "⊕⊕⊕⊖ Moderate";
    case "low":
      return "⊕⊕⊖⊖ Low";
    case "very low":
      return "⊕⊖⊖⊖ Very Low";
  }
}
