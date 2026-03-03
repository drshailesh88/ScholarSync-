/**
 * MOOSE Checklist — Meta-analysis Of Observational Studies in Epidemiology
 *
 * Implements the MOOSE reporting guideline for meta-analyses of
 * observational studies (Stroup et al., JAMA 2000;283:2008-12).
 *
 * 6 sections, 35 items total:
 *   1. Reporting of background (3 items)
 *   2. Reporting of search strategy (7 items)
 *   3. Reporting of methods (7 items)
 *   4. Reporting of results (4 items)
 *   5. Reporting of discussion (4 items)
 *   6. Reporting of conclusions (10 items — covers several fine-grained aspects)
 *
 * Each item can be rated: "Yes" | "No" | "Partial" | "Not Applicable"
 *
 * Overall compliance:
 *   - Complete: all applicable items are "Yes"
 *   - Major gaps: any item is "No"
 *   - Minor gaps: some items "Partial" but none "No"
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MOOSEItem {
  number: number;
  section: string;
  description: string;
}

export type MOOSERating = "Yes" | "No" | "Partial" | "Not Applicable";

export type MOOSECompliance = "Complete" | "Minor gaps" | "Major gaps";

export interface MOOSEItemResult {
  itemNumber: number;
  rating: MOOSERating;
  pageOrSection: string;
  comment: string;
}

export interface MOOSEAssessment {
  reviewId: string;
  items: MOOSEItemResult[];
  compliance: MOOSECompliance;
  completedCount: number;
  totalApplicable: number;
  completionRate: number;
}

// ---------------------------------------------------------------------------
// MOOSE Checklist Items — 35 items (Stroup et al., JAMA 2000)
// ---------------------------------------------------------------------------

export const MOOSE_ITEMS: MOOSEItem[] = [
  // REPORTING OF BACKGROUND
  {
    number: 1,
    section: "Background",
    description: "Problem definition",
  },
  {
    number: 2,
    section: "Background",
    description: "Hypothesis statement",
  },
  {
    number: 3,
    section: "Background",
    description: "Description of study outcome(s)",
  },

  // REPORTING OF SEARCH STRATEGY
  {
    number: 4,
    section: "Search Strategy",
    description: "Qualifications of searchers (e.g., librarians and investigators)",
  },
  {
    number: 5,
    section: "Search Strategy",
    description: "Search strategy, including time period included in the synthesis and keywords",
  },
  {
    number: 6,
    section: "Search Strategy",
    description: "Effort to include all available studies, including contact with authors",
  },
  {
    number: 7,
    section: "Search Strategy",
    description: "Databases and registries searched",
  },
  {
    number: 8,
    section: "Search Strategy",
    description: "Search software used, name and version, including special features used (e.g., explosion)",
  },
  {
    number: 9,
    section: "Search Strategy",
    description: "Use of hand searching (e.g., reference lists of obtained articles)",
  },
  {
    number: 10,
    section: "Search Strategy",
    description: "List of citations located and those excluded, including justification",
  },

  // REPORTING OF METHODS
  {
    number: 11,
    section: "Methods",
    description: "Description of relevance or appropriateness of studies assembled for assessing the hypothesis to be tested",
  },
  {
    number: 12,
    section: "Methods",
    description: "Rationale for the selection and coding of data (e.g., sound clinical principles or convenience)",
  },
  {
    number: 13,
    section: "Methods",
    description: "Documentation of how data were classified and coded (e.g., multiple raters, blinding, and interrater reliability)",
  },
  {
    number: 14,
    section: "Methods",
    description: "Assessment of confounding (e.g., comparability of cases and controls in studies where appropriate)",
  },
  {
    number: 15,
    section: "Methods",
    description: "Assessment of study quality, including blinding of quality assessors; stratification or regression on possible predictors of study results",
  },
  {
    number: 16,
    section: "Methods",
    description: "Assessment of heterogeneity",
  },
  {
    number: 17,
    section: "Methods",
    description: "Description of statistical methods (e.g., complete description of fixed or random effects models, justification of whether the chosen models account for predictors of study results, dose-response models, or cumulative meta-analysis) in sufficient detail to be replicated",
  },

  // REPORTING OF RESULTS
  {
    number: 18,
    section: "Results",
    description: "Graphic summarizing individual study estimates and overall estimate (e.g., forest plot)",
  },
  {
    number: 19,
    section: "Results",
    description: "Table giving descriptive information for each study included",
  },
  {
    number: 20,
    section: "Results",
    description: "Results of sensitivity testing (e.g., subgroup analysis)",
  },
  {
    number: 21,
    section: "Results",
    description: "Indication of statistical uncertainty of findings (e.g., 95% confidence intervals)",
  },

  // REPORTING OF DISCUSSION
  {
    number: 22,
    section: "Discussion",
    description: "Quantitative assessment of bias (e.g., publication bias)",
  },
  {
    number: 23,
    section: "Discussion",
    description: "Justification for exclusion (e.g., exclusion of non–English-language citations)",
  },
  {
    number: 24,
    section: "Discussion",
    description: "Assessment of quality of included studies",
  },
  {
    number: 25,
    section: "Discussion",
    description: "Consideration of alternative explanations for observed results",
  },

  // REPORTING OF CONCLUSIONS — fine-grained
  {
    number: 26,
    section: "Conclusions",
    description: "Generalizability of the conclusions",
  },
  {
    number: 27,
    section: "Conclusions",
    description: "Guidelines for future research",
  },
  {
    number: 28,
    section: "Conclusions",
    description: "Disclosure of funding source",
  },
  {
    number: 29,
    section: "Conclusions",
    description: "Role of the funding body in the conduct of the review",
  },
  {
    number: 30,
    section: "Conclusions",
    description: "Competing interests of the authors",
  },
  {
    number: 31,
    section: "Conclusions",
    description: "Availability of study data (original data from included studies)",
  },
  {
    number: 32,
    section: "Conclusions",
    description: "Registration of protocol (if applicable)",
  },
  {
    number: 33,
    section: "Conclusions",
    description: "Data sharing statement",
  },
  {
    number: 34,
    section: "Conclusions",
    description: "Pre-specified analysis plan",
  },
  {
    number: 35,
    section: "Conclusions",
    description: "Deviations from the protocol",
  },
];

// ---------------------------------------------------------------------------
// Label maps
// ---------------------------------------------------------------------------

export const MOOSE_SECTION_LABELS: Record<string, string> = {
  Background: "Reporting of Background",
  "Search Strategy": "Reporting of Search Strategy",
  Methods: "Reporting of Methods",
  Results: "Reporting of Results",
  Discussion: "Reporting of Discussion",
  Conclusions: "Reporting of Conclusions",
};

export const MOOSE_RATING_LABELS: Record<MOOSERating, string> = {
  Yes: "Fully reported",
  No: "Not reported",
  Partial: "Partially reported",
  "Not Applicable": "Not applicable",
};

// ---------------------------------------------------------------------------
// Compliance computation
// ---------------------------------------------------------------------------

/**
 * Compute overall MOOSE compliance from item results.
 *
 * - "Complete": all applicable items are "Yes"
 * - "Major gaps": any item is "No"
 * - "Minor gaps": some "Partial" but no "No"
 */
export function computeMOOSECompliance(items: MOOSEItemResult[]): MOOSECompliance {
  const applicable = items.filter((i) => i.rating !== "Not Applicable");
  const hasNo = applicable.some((i) => i.rating === "No");
  const hasPartial = applicable.some((i) => i.rating === "Partial");

  if (hasNo) return "Major gaps";
  if (hasPartial) return "Minor gaps";
  return "Complete";
}

/**
 * Compute completion statistics.
 */
export function computeMOOSEStats(items: MOOSEItemResult[]): {
  completedCount: number;
  totalApplicable: number;
  completionRate: number;
} {
  const applicable = items.filter((i) => i.rating !== "Not Applicable");
  const completed = applicable.filter((i) => i.rating === "Yes");
  const totalApplicable = applicable.length;
  const completionRate =
    totalApplicable > 0 ? completed.length / totalApplicable : 0;

  return {
    completedCount: completed.length,
    totalApplicable,
    completionRate: Math.round(completionRate * 1000) / 1000,
  };
}

// ---------------------------------------------------------------------------
// Assessment function
// ---------------------------------------------------------------------------

/**
 * Create a MOOSE compliance assessment from item results.
 */
export function assessMOOSE(
  reviewId: string,
  items: MOOSEItemResult[]
): MOOSEAssessment {
  // Validate all 35 items are present
  const itemNumbers = new Set(items.map((i) => i.itemNumber));
  for (let i = 1; i <= 35; i++) {
    if (!itemNumbers.has(i)) {
      throw new Error(`Missing MOOSE item ${i}`);
    }
  }

  if (items.length !== 35) {
    throw new Error(
      `Expected 35 MOOSE items, got ${items.length}`
    );
  }

  const compliance = computeMOOSECompliance(items);
  const stats = computeMOOSEStats(items);

  return {
    reviewId,
    items,
    compliance,
    ...stats,
  };
}

// ---------------------------------------------------------------------------
// CSV export
// ---------------------------------------------------------------------------

/**
 * Export MOOSE assessment as CSV.
 */
export function exportMOOSEChecklistCSV(assessment: MOOSEAssessment): string {
  const headers = [
    "Item Number",
    "Section",
    "Description",
    "Rating",
    "Page/Section",
    "Comment",
  ];

  const rows = assessment.items.map((item) => {
    const def = MOOSE_ITEMS.find((m) => m.number === item.itemNumber);
    return [
      `${item.itemNumber}`,
      def?.section ?? "",
      `"${(def?.description ?? "").replace(/"/g, '""')}"`,
      item.rating,
      `"${item.pageOrSection.replace(/"/g, '""')}"`,
      `"${item.comment.replace(/"/g, '""')}"`,
    ];
  });

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

/**
 * Get items for a specific section.
 */
export function getMOOSEItemsBySection(section: string): MOOSEItem[] {
  return MOOSE_ITEMS.filter((i) => i.section === section);
}

/**
 * Get all unique section names in order.
 */
export function getMOOSESections(): string[] {
  const seen = new Set<string>();
  const sections: string[] = [];
  for (const item of MOOSE_ITEMS) {
    if (!seen.has(item.section)) {
      seen.add(item.section);
      sections.push(item.section);
    }
  }
  return sections;
}
