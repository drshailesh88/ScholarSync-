/**
 * PRISMA-ScR Compliance Checklist Engine
 *
 * PRISMA Extension for Scoping Reviews (PRISMA-ScR) — 22 items
 * Tricco AC et al., Ann Intern Med 2018;169:467-473
 *
 * Verifies a manuscript against the PRISMA-ScR checklist using AI.
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { z } from "zod";
import type {
  PRISMAItem,
  ComplianceResult,
  ChecklistItemResult,
} from "./prisma-checklist";

// ---------------------------------------------------------------------------
// PRISMA-ScR — All 22 items
// ---------------------------------------------------------------------------

export const PRISMA_SCR_ITEMS: PRISMAItem[] = [
  // TITLE
  {
    number: 1,
    section: "TITLE",
    topic: "Title",
    description: "Identify the report as a scoping review.",
  },
  // ABSTRACT
  {
    number: 2,
    section: "ABSTRACT",
    topic: "Structured summary",
    description:
      "Provide a structured summary that includes (as applicable): background, objectives, eligibility criteria, sources of evidence, charting methods, results, and conclusions.",
  },
  // INTRODUCTION
  {
    number: 3,
    section: "INTRODUCTION",
    topic: "Rationale",
    description:
      "Describe the rationale for the review in the context of what is already known. Explain why the review questions/objectives lend themselves to a scoping review approach.",
  },
  {
    number: 4,
    section: "INTRODUCTION",
    topic: "Objectives",
    description:
      "Provide an explicit statement of the questions and objectives being addressed with reference to their key elements (e.g., population or participants, concepts, and context) or other relevant key elements used to conceptualize the review questions and/or objectives.",
  },
  // METHODS
  {
    number: 5,
    section: "METHODS",
    topic: "Protocol and registration",
    description:
      "Indicate whether a review protocol exists; state if and where it can be accessed (e.g., a Web address); and if available, provide registration information, including the registration number.",
  },
  {
    number: 6,
    section: "METHODS",
    topic: "Eligibility criteria",
    description:
      "Specify characteristics of the sources of evidence used as eligibility criteria (e.g., years considered, language, and publication status), and provide a rationale.",
  },
  {
    number: 7,
    section: "METHODS",
    topic: "Information sources",
    description:
      "Describe all information sources in the search (e.g., databases with dates of coverage and contact with authors to identify additional sources), as well as the date the most recent search was executed.",
  },
  {
    number: 8,
    section: "METHODS",
    topic: "Search",
    description:
      "Present the full electronic search strategy for at least 1 database, including any limits used, such that it could be repeated.",
  },
  {
    number: 9,
    section: "METHODS",
    topic: "Selection of sources of evidence",
    description:
      "State the process for selecting sources of evidence (i.e., screening and eligibility) included in the scoping review.",
  },
  {
    number: 10,
    section: "METHODS",
    topic: "Data charting process",
    description:
      "Describe the methods of charting data from the included sources of evidence (e.g., calibrated forms or forms that have been tested by the team before their use, and whether data charting was done independently or in duplicate) and any processes for obtaining and confirming data from investigators.",
  },
  {
    number: 11,
    section: "METHODS",
    topic: "Data items",
    description:
      "List and define all variables for which data were sought and any assumptions and simplifications made.",
  },
  {
    number: 12,
    section: "METHODS",
    topic: "Critical appraisal of individual sources of evidence",
    description:
      "If done, provide a rationale for conducting a critical appraisal of included sources of evidence; describe the methods used and how this information was used in any data synthesis (if applicable).",
  },
  {
    number: 13,
    section: "METHODS",
    topic: "Synthesis of results",
    description:
      "Describe the methods of handling and summarizing the data that were charted.",
  },
  // RESULTS
  {
    number: 14,
    section: "RESULTS",
    topic: "Selection of sources of evidence",
    description:
      "Give numbers of sources of evidence screened, assessed for eligibility, and included in the review, with reasons for exclusions at each stage, ideally using a flow diagram.",
  },
  {
    number: 15,
    section: "RESULTS",
    topic: "Characteristics of sources of evidence",
    description:
      "For each source of evidence, present characteristics for which data were charted and provide the citations.",
  },
  {
    number: 16,
    section: "RESULTS",
    topic: "Critical appraisal within sources of evidence",
    description:
      "If done, present data on critical appraisal of included sources of evidence (see item 12).",
  },
  {
    number: 17,
    section: "RESULTS",
    topic: "Results of individual sources of evidence",
    description:
      "For each included source of evidence, present the relevant data that were charted that relate to the review questions and objectives.",
  },
  {
    number: 18,
    section: "RESULTS",
    topic: "Synthesis of results",
    description:
      "Summarize and/or present the charting results as they relate to the review questions and objectives.",
  },
  // DISCUSSION
  {
    number: 19,
    section: "DISCUSSION",
    topic: "Summary of evidence",
    description:
      "Summarize the main results (including an overview of concepts, themes, and types of evidence available), link to the review questions and objectives, and consider the relevance to key groups.",
  },
  {
    number: 20,
    section: "DISCUSSION",
    topic: "Limitations",
    description:
      "Discuss the limitations of the scoping review process.",
  },
  // CONCLUSIONS
  {
    number: 21,
    section: "CONCLUSIONS",
    topic: "Conclusions",
    description:
      "Provide a general interpretation of the results with respect to the review questions and objectives, as well as potential implications and/or next steps.",
  },
  // FUNDING
  {
    number: 22,
    section: "FUNDING",
    topic: "Funding",
    description:
      "Describe sources of funding for the included sources of evidence, as well as sources of funding for the scoping review. Describe the role of the funders of the scoping review.",
  },
];

// ---------------------------------------------------------------------------
// AI-powered PRISMA-ScR compliance verification
// ---------------------------------------------------------------------------

const itemResultSchema = z.object({
  itemNumber: z.number(),
  status: z.enum([
    "reported",
    "partially_reported",
    "not_reported",
    "not_applicable",
  ]),
  location: z
    .string()
    .describe(
      "Where in the manuscript this item is addressed, or empty if not found"
    ),
  suggestion: z
    .string()
    .describe(
      "Brief suggestion for how to improve compliance, or empty if fully reported"
    ),
});

const batchResultSchema = z.object({
  items: z.array(itemResultSchema),
});

/**
 * Verify PRISMA-ScR compliance by checking a manuscript against all 22
 * scoping review checklist items.
 *
 * Processes items in batches of 9 to stay within token limits.
 */
export async function verifyPRISMASCRCompliance(
  manuscriptText: string
): Promise<ComplianceResult> {
  const checklistName = "PRISMA-ScR (Scoping Reviews)";
  const items = PRISMA_SCR_ITEMS;
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
// Export checklist as CSV
// ---------------------------------------------------------------------------

export function exportPRISMASCRChecklistCSV(result: ComplianceResult): string {
  const header =
    "Item #,Section,Topic,Description,Status,Location,Suggestion";
  const rows = result.items.map(
    (item) =>
      `${item.itemNumber},"${item.section}","${item.topic}","${item.description.replace(/"/g, '""')}","${item.status}","${item.location.replace(/"/g, '""')}","${item.suggestion.replace(/"/g, '""')}"`
  );
  return [header, ...rows].join("\n");
}
