/**
 * PRISMA Compliance Checklist Engine
 *
 * Covers three PRISMA checklists:
 *  - PRISMA 2020 (27 items) — Page et al., BMJ 2021
 *  - PRISMA-S (16 items)    — Rethlefsen et al., systematic literature search reporting
 *  - PRISMA-NMA (5 items)   — Hutton et al., network meta-analysis extension
 *
 * Each checklist is verified against a manuscript text using AI to determine
 * the reporting status of every item.
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { z } from "zod";

// ---------------------------------------------------------------------------
// PRISMA 2020 — All 27 items
// ---------------------------------------------------------------------------

export interface PRISMAItem {
  number: number;
  section: string;
  topic: string;
  description: string;
}

export const PRISMA_2020_ITEMS: PRISMAItem[] = [
  // TITLE
  {
    number: 1,
    section: "TITLE",
    topic: "Title",
    description:
      "Identify the report as a systematic review.",
  },
  // ABSTRACT
  {
    number: 2,
    section: "ABSTRACT",
    topic: "Abstract",
    description:
      "Provide a structured summary including background, objectives, data sources, study eligibility criteria, participants and interventions, study appraisal and synthesis methods, results, limitations, conclusions and implications, and systematic review registration number.",
  },
  // INTRODUCTION
  {
    number: 3,
    section: "INTRODUCTION",
    topic: "Rationale",
    description:
      "Describe the rationale for the review in the context of existing knowledge.",
  },
  {
    number: 4,
    section: "INTRODUCTION",
    topic: "Objectives",
    description:
      "Provide an explicit statement of the objective(s) or question(s) the review addresses using the PICO framework or similar.",
  },
  // METHODS
  {
    number: 5,
    section: "METHODS",
    topic: "Eligibility criteria",
    description:
      "Specify the inclusion and exclusion criteria for the review and how studies were grouped for the syntheses.",
  },
  {
    number: 6,
    section: "METHODS",
    topic: "Information sources",
    description:
      "Specify all databases, registers, websites, organisations, reference lists, and other sources searched or consulted. Specify the date when each source was last searched or consulted.",
  },
  {
    number: 7,
    section: "METHODS",
    topic: "Search strategy",
    description:
      "Present the full search strategies for all databases, registers, and websites, including any filters and limits used.",
  },
  {
    number: 8,
    section: "METHODS",
    topic: "Selection process",
    description:
      "Specify the methods used to decide whether a study met the inclusion criteria, including how many reviewers screened each record and each report, whether they worked independently, and if applicable, details of automation tools used.",
  },
  {
    number: 9,
    section: "METHODS",
    topic: "Data collection process",
    description:
      "Specify the methods used to collect data from reports, including how many reviewers collected data, whether they worked independently, any processes for obtaining or confirming data, and if applicable, details of automation tools used.",
  },
  {
    number: 10,
    section: "METHODS",
    topic: "Data items",
    description:
      "List and define all outcomes for which data were sought. List and define all other variables for which data were sought. Describe any assumptions made about missing or unclear information.",
  },
  {
    number: 11,
    section: "METHODS",
    topic: "Study risk of bias assessment",
    description:
      "Specify the methods used to assess risk of bias in the included studies, including details of the tool(s) used, how many reviewers assessed each study, and whether they worked independently.",
  },
  {
    number: 12,
    section: "METHODS",
    topic: "Effect measures",
    description:
      "Specify for each outcome the effect measure(s) (e.g. risk ratio, mean difference) used in the synthesis or presentation of results.",
  },
  {
    number: 13,
    section: "METHODS",
    topic: "Synthesis methods",
    description:
      "Describe the processes used to decide which studies were eligible for each synthesis. Describe any methods required to prepare the data for presentation or synthesis. Describe any methods used to tabulate or visually display results of individual studies and syntheses. Describe any methods used to synthesise results. Describe any sensitivity analyses conducted. If meta-analysis was done, describe statistical model, methods for pooling, and software used.",
  },
  {
    number: 14,
    section: "METHODS",
    topic: "Reporting bias assessment",
    description:
      "Describe any methods used to assess risk of bias due to missing results in a synthesis (arising from reporting biases).",
  },
  {
    number: 15,
    section: "METHODS",
    topic: "Certainty assessment",
    description:
      "Describe any methods used to assess certainty (or confidence) in the body of evidence for an outcome.",
  },
  // RESULTS
  {
    number: 16,
    section: "RESULTS",
    topic: "Study selection",
    description:
      "Describe the results of the search and selection process, from the number of records identified to the number of studies included, ideally using a PRISMA flow diagram.",
  },
  {
    number: 17,
    section: "RESULTS",
    topic: "Study characteristics",
    description:
      "Cite each included study and present its characteristics.",
  },
  {
    number: 18,
    section: "RESULTS",
    topic: "Risk of bias in studies",
    description:
      "Present assessments of risk of bias for each included study.",
  },
  {
    number: 19,
    section: "RESULTS",
    topic: "Results of individual studies",
    description:
      "For all outcomes, present for each study (a) summary statistics and (b) an estimate of effect, with confidence interval, ideally using structured tables or forest plots.",
  },
  {
    number: 20,
    section: "RESULTS",
    topic: "Results of syntheses",
    description:
      "For each synthesis, briefly summarise the characteristics and risk of bias among contributing studies. Present results of all statistical syntheses conducted, including results of sensitivity analyses.",
  },
  {
    number: 21,
    section: "RESULTS",
    topic: "Reporting biases",
    description:
      "Present assessments of risk of bias due to missing results for each synthesis assessed.",
  },
  {
    number: 22,
    section: "RESULTS",
    topic: "Certainty of evidence",
    description:
      "Present assessments of certainty (or confidence) in the body of evidence for each outcome assessed.",
  },
  // DISCUSSION
  {
    number: 23,
    section: "DISCUSSION",
    topic: "Discussion",
    description:
      "Provide a general interpretation of the results in the context of other evidence. Discuss limitations of the evidence included in the review. Discuss limitations of the review processes used. Discuss implications of the results for practice, policy, and future research.",
  },
  // OTHER INFORMATION
  {
    number: 24,
    section: "OTHER INFORMATION",
    topic: "Registration and protocol",
    description:
      "Provide registration information for the review, including register name and registration number. Indicate where the review protocol can be accessed, or state that a protocol was not prepared.",
  },
  {
    number: 25,
    section: "OTHER INFORMATION",
    topic: "Support",
    description:
      "Describe sources of financial or non-financial support for the review, and the role of the funders or sponsors in the review.",
  },
  {
    number: 26,
    section: "OTHER INFORMATION",
    topic: "Competing interests",
    description:
      "Declare any competing interests of review authors.",
  },
  {
    number: 27,
    section: "OTHER INFORMATION",
    topic: "Availability of data, code, and other materials",
    description:
      "Report which of the following are publicly available and where they can be found: template data collection forms; data extracted from included studies; data used for analyses; analytic code; any other materials used in the review.",
  },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ComplianceStatus =
  | "reported"
  | "partially_reported"
  | "not_reported"
  | "not_applicable";

export interface ChecklistItemResult {
  itemNumber: number;
  section: string;
  topic: string;
  description: string;
  status: ComplianceStatus;
  location: string;
  suggestion: string;
}

export interface ComplianceResult {
  items: ChecklistItemResult[];
  summary: {
    reported: number;
    partiallyReported: number;
    notReported: number;
    notApplicable: number;
    compliancePercentage: number;
  };
}

// ---------------------------------------------------------------------------
// AI-powered checklist verification
// ---------------------------------------------------------------------------

const itemResultSchema = z.object({
  itemNumber: z.number(),
  status: z.enum(["reported", "partially_reported", "not_reported", "not_applicable"]),
  location: z.string().describe("Where in the manuscript this item is addressed, or empty if not found"),
  suggestion: z.string().describe("Brief suggestion for how to improve compliance, or empty if fully reported"),
});

const batchResultSchema = z.object({
  items: z.array(itemResultSchema),
});

/**
 * Verify PRISMA 2020 compliance by checking a manuscript against all 27 items.
 *
 * Processes items in batches of 9 (3 API calls) to stay within token limits.
 */
export async function verifyPRISMACompliance(
  manuscriptText: string
): Promise<ComplianceResult> {
  return verifyItemsCompliance(
    PRISMA_2020_ITEMS,
    "PRISMA 2020",
    manuscriptText
  );
}

// ---------------------------------------------------------------------------
// PRISMA-S — 16 items for search reporting
// ---------------------------------------------------------------------------

export const PRISMA_S_ITEMS: PRISMAItem[] = [
  {
    number: 1,
    section: "INFORMATION SOURCES AND METHODS",
    topic: "Database name",
    description:
      "Name each database searched, stating the platform for each",
  },
  {
    number: 2,
    section: "INFORMATION SOURCES AND METHODS",
    topic: "Multi-database searching",
    description:
      "If databases were searched simultaneously on a single platform, state the name of the platform, listing all of the databases searched",
  },
  {
    number: 3,
    section: "INFORMATION SOURCES AND METHODS",
    topic: "Study registries",
    description:
      "List any study registries, clinical trial registries, or other data sources searched",
  },
  {
    number: 4,
    section: "INFORMATION SOURCES AND METHODS",
    topic: "Online resources and browsing",
    description:
      "Describe any online or print source purposefully searched or browsed, including methods used",
  },
  {
    number: 5,
    section: "INFORMATION SOURCES AND METHODS",
    topic: "Citation searching",
    description:
      "Indicate whether cited references or citing references were examined, and describe any methods used",
  },
  {
    number: 6,
    section: "INFORMATION SOURCES AND METHODS",
    topic: "Contacts",
    description:
      "Indicate whether additional studies or data were sought by contacting authors, experts, manufacturers, or others",
  },
  {
    number: 7,
    section: "INFORMATION SOURCES AND METHODS",
    topic: "Other methods",
    description:
      "Describe any additional information sources or search methods used",
  },
  {
    number: 8,
    section: "SEARCH STRATEGIES",
    topic: "Full search strategies",
    description:
      "Include the search strategies for each database and information source, copied and pasted exactly as run",
  },
  {
    number: 9,
    section: "SEARCH STRATEGIES",
    topic: "Limits and restrictions",
    description:
      "Specify that no limits were used, or describe any limits or restrictions applied to a search and justify their use",
  },
  {
    number: 10,
    section: "SEARCH STRATEGIES",
    topic: "Search filters",
    description:
      "Indicate whether published search filters were used and cite them",
  },
  {
    number: 11,
    section: "SEARCH STRATEGIES",
    topic: "Prior work",
    description:
      "Indicate when search strategies from other literature reviews were adapted or translated",
  },
  {
    number: 12,
    section: "SEARCH STRATEGIES",
    topic: "Updates and reruns",
    description:
      "Report the date of the most recent search or the date of the last search update",
  },
  {
    number: 13,
    section: "SEARCH STRATEGIES",
    topic: "Dates of searches",
    description:
      "For each search strategy, provide the date when the last search occurred",
  },
  {
    number: 14,
    section: "PEER REVIEW",
    topic: "Peer review",
    description: "Describe any search peer review process",
  },
  {
    number: 15,
    section: "MANAGING RECORDS",
    topic: "Total records",
    description:
      "Document the total number of records identified from each database and other information sources",
  },
  {
    number: 16,
    section: "MANAGING RECORDS",
    topic: "Deduplication",
    description:
      "Describe the processes and any software used to deduplicate records",
  },
];

// ---------------------------------------------------------------------------
// PRISMA-NMA — 5 additional items for network meta-analysis
// ---------------------------------------------------------------------------

export const PRISMA_NMA_ITEMS: PRISMAItem[] = [
  {
    number: 1,
    section: "METHODS",
    topic: "Geometry of the network",
    description:
      "Describe methods used to present and examine the network geometry",
  },
  {
    number: 2,
    section: "METHODS",
    topic: "Assessment of inconsistency",
    description:
      "Describe the statistical methods used to evaluate consistency/coherence",
  },
  {
    number: 3,
    section: "RESULTS",
    topic: "Network geometry presentation",
    description:
      "Provide a network graph showing the available direct comparisons between treatments",
  },
  {
    number: 4,
    section: "RESULTS",
    topic: "Summary effects",
    description:
      "Provide league table or forest plots showing all pairwise comparisons, including treatment ranking",
  },
  {
    number: 5,
    section: "RESULTS",
    topic: "Inconsistency assessment",
    description:
      "Present results of the inconsistency assessment and any exploration of causes",
  },
];

// ---------------------------------------------------------------------------
// AI-powered checklist verification — shared helper
// ---------------------------------------------------------------------------

async function verifyItemsCompliance(
  items: PRISMAItem[],
  checklistName: string,
  manuscriptText: string
): Promise<ComplianceResult> {
  const batchSize = 9;
  const allResults: ChecklistItemResult[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    const itemDescriptions = batch
      .map(
        (item) =>
          `Item ${item.number} (${item.section} — ${item.topic}): ${item.description}`
      )
      .join("\n\n");

    const { object } = await generateObject({
      model: getModel(),
      schema: batchResultSchema,
      prompt: `You are a ${checklistName} compliance reviewer for systematic reviews.

Evaluate the following manuscript text against each ${checklistName} checklist item below. For each item, determine:
- "reported": The item is fully and adequately reported in the manuscript.
- "partially_reported": The item is mentioned but incomplete or lacking important details.
- "not_reported": The item is not addressed in the manuscript.
- "not_applicable": The item does not apply to this type of review.

Also provide:
- "location": A brief quote or section reference showing where the item is addressed (empty if not found).
- "suggestion": A concise recommendation for improving compliance (empty if fully reported).

${checklistName} Items to check:
${itemDescriptions}

Manuscript text:
${manuscriptText.slice(0, 30000)}`,
    });

    for (const result of object.items) {
      const item = batch.find((b) => b.number === result.itemNumber);
      if (!item) continue;
      allResults.push({
        itemNumber: result.itemNumber,
        section: item.section,
        topic: item.topic,
        description: item.description,
        status: result.status,
        location: result.location,
        suggestion: result.suggestion,
      });
    }
  }

  // Ensure all items are accounted for (fill in any missed by AI)
  for (const item of items) {
    if (!allResults.find((r) => r.itemNumber === item.number)) {
      allResults.push({
        itemNumber: item.number,
        section: item.section,
        topic: item.topic,
        description: item.description,
        status: "not_reported",
        location: "",
        suggestion: "This item was not evaluated. Please review manually.",
      });
    }
  }

  allResults.sort((a, b) => a.itemNumber - b.itemNumber);

  const reported = allResults.filter((r) => r.status === "reported").length;
  const partial = allResults.filter(
    (r) => r.status === "partially_reported"
  ).length;
  const notReported = allResults.filter(
    (r) => r.status === "not_reported"
  ).length;
  const notApplicable = allResults.filter(
    (r) => r.status === "not_applicable"
  ).length;
  const applicable = items.length - notApplicable;

  return {
    items: allResults,
    summary: {
      reported,
      partiallyReported: partial,
      notReported,
      notApplicable,
      compliancePercentage:
        applicable > 0
          ? Math.round(((reported + partial * 0.5) / applicable) * 100)
          : 100,
    },
  };
}

// ---------------------------------------------------------------------------
// AI-powered PRISMA-S compliance verification
// ---------------------------------------------------------------------------

/**
 * Verify PRISMA-S compliance by checking a manuscript against all 16
 * search-reporting items.
 */
export async function verifyPRISMASCompliance(
  manuscriptText: string
): Promise<ComplianceResult> {
  return verifyItemsCompliance(
    PRISMA_S_ITEMS,
    "PRISMA-S (Preferred Reporting Items for Systematic reviews and Meta-Analyses literature Searches)",
    manuscriptText
  );
}

// ---------------------------------------------------------------------------
// AI-powered PRISMA-NMA compliance verification
// ---------------------------------------------------------------------------

/**
 * Verify PRISMA-NMA compliance by checking a manuscript against all 5
 * network meta-analysis extension items.
 */
export async function verifyPRISMANMACompliance(
  manuscriptText: string
): Promise<ComplianceResult> {
  return verifyItemsCompliance(
    PRISMA_NMA_ITEMS,
    "PRISMA-NMA (Network Meta-Analysis extension)",
    manuscriptText
  );
}

// ---------------------------------------------------------------------------
// Export checklist as CSV
// ---------------------------------------------------------------------------

export function exportChecklistCSV(result: ComplianceResult): string {
  const header =
    "Item #,Section,Topic,Description,Status,Location,Suggestion";
  const rows = result.items.map(
    (item) =>
      `${item.itemNumber},"${item.section}","${item.topic}","${item.description.replace(/"/g, '""')}","${item.status}","${item.location.replace(/"/g, '""')}","${item.suggestion.replace(/"/g, '""')}"`
  );
  return [header, ...rows].join("\n");
}

export function exportPRISMASChecklistCSV(result: ComplianceResult): string {
  const header =
    "Item #,Section,Topic,Description,Status,Location,Suggestion";
  const rows = result.items.map(
    (item) =>
      `${item.itemNumber},"${item.section}","${item.topic}","${item.description.replace(/"/g, '""')}","${item.status}","${item.location.replace(/"/g, '""')}","${item.suggestion.replace(/"/g, '""')}"`
  );
  return [header, ...rows].join("\n");
}

export function exportPRISMANMAChecklistCSV(result: ComplianceResult): string {
  const header =
    "Item #,Section,Topic,Description,Status,Location,Suggestion";
  const rows = result.items.map(
    (item) =>
      `${item.itemNumber},"${item.section}","${item.topic}","${item.description.replace(/"/g, '""')}","${item.status}","${item.location.replace(/"/g, '""')}","${item.suggestion.replace(/"/g, '""')}"`
  );
  return [header, ...rows].join("\n");
}
