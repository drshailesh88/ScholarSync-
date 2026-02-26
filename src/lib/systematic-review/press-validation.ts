/**
 * PRESS 2015 Peer Review of Electronic Search Strategies
 *
 * Implements the PRESS 2015 Evidence-Based Checklist for peer review of
 * electronic search strategies used in systematic reviews:
 *  - 6 elements: research question translation, Boolean/proximity operators,
 *    subject headings, text word searching, spelling/syntax, limits/filters
 *  - AI-powered assessment using generateObject
 *  - Traffic-light rating: no_revision / minor_revision / major_revision
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PRESSElement {
  element: number; // 1-6
  name: string;
  description: string;
  assessment: "no_revision" | "minor_revision" | "major_revision";
  feedback: string;
  suggestions: string[];
}

export interface PRESSValidation {
  elements: PRESSElement[];
  overallAssessment: "approved" | "minor_revisions" | "major_revisions";
  summary: string;
  assessedAt: string;
}

// ---------------------------------------------------------------------------
// PRESS element metadata
// ---------------------------------------------------------------------------

export const PRESS_ELEMENTS: Array<{
  element: number;
  name: string;
  description: string;
}> = [
  {
    element: 1,
    name: "Translation of Research Question",
    description:
      "Are all PICO elements present and adequately represented in the search? Are all key concepts from the research question included? Have concepts been appropriately translated into search terms?",
  },
  {
    element: 2,
    name: "Boolean and Proximity Operators",
    description:
      "Is AND used correctly to combine concept blocks? Is OR used correctly within concept blocks to combine synonyms? Is NOT used appropriately and sparingly? Are parentheses used correctly for grouping? Are proximity operators (NEAR, ADJ, W/n) used where appropriate?",
  },
  {
    element: 3,
    name: "Subject Headings",
    description:
      "Are appropriate controlled vocabulary terms (MeSH, Emtree, CINAHL headings) used? Are subject headings exploded where appropriate? Are subheadings applied correctly? Are any relevant subject headings missing?",
  },
  {
    element: 4,
    name: "Text Word Searching",
    description:
      "Are all relevant synonyms and alternate terms included? Is truncation used appropriately (not too broad or too narrow)? Are spelling variants covered (e.g., US vs. British English)? Are acronyms included? Are phrase searches used where appropriate?",
  },
  {
    element: 5,
    name: "Spelling, Syntax, and Line Numbers",
    description:
      "Are there any typographical or spelling errors in search terms? Is the database-specific syntax correct (e.g., [MeSH], [tiab], .af., :ti,ab)? Are field codes valid and appropriate? Are line numbers referenced correctly in combined searches?",
  },
  {
    element: 6,
    name: "Limits and Filters",
    description:
      "Are date range limits appropriate and justified? Are language filters justified? Are study design filters (e.g., RCT filter, human filter) appropriate and validated? Do filters risk inadvertently excluding relevant studies?",
  },
];

// ---------------------------------------------------------------------------
// Zod schema for AI output
// ---------------------------------------------------------------------------

const pressElementSchema = z.object({
  element: z.number().int().min(1).max(6),
  assessment: z.enum(["no_revision", "minor_revision", "major_revision"]),
  feedback: z
    .string()
    .describe(
      "Detailed feedback on this PRESS element, citing specific issues in the search strategy"
    ),
  suggestions: z
    .array(z.string())
    .describe(
      "Specific, actionable suggestions for improvement. Empty array if no_revision."
    ),
});

const pressValidationSchema = z.object({
  elements: z
    .array(pressElementSchema)
    .length(6)
    .describe("Assessment for all 6 PRESS elements in order"),
  overallAssessment: z
    .enum(["approved", "minor_revisions", "major_revisions"])
    .describe(
      "Overall recommendation: approved (all no_revision), minor_revisions (at least one minor, no major), major_revisions (at least one major)"
    ),
  summary: z
    .string()
    .describe(
      "2-4 sentence narrative summary of the overall search strategy quality and key recommendations"
    ),
});

// ---------------------------------------------------------------------------
// Assessment labels (exported for UI use)
// ---------------------------------------------------------------------------

export const PRESS_ASSESSMENT_LABELS: Record<
  PRESSElement["assessment"],
  string
> = {
  no_revision: "No Revision Required",
  minor_revision: "Minor Revision",
  major_revision: "Major Revision",
};

export const PRESS_OVERALL_LABELS: Record<
  PRESSValidation["overallAssessment"],
  string
> = {
  approved: "Approved",
  minor_revisions: "Minor Revisions Required",
  major_revisions: "Major Revisions Required",
};

// ---------------------------------------------------------------------------
// AI-powered PRESS validation
// ---------------------------------------------------------------------------

export async function validateSearchStrategy(
  searchStrategy: string,
  pico: {
    population: string;
    intervention: string;
    comparison: string;
    outcome: string;
  },
  databases: string[]
): Promise<PRESSValidation> {
  const picoContext = `
Population: ${pico.population}
Intervention: ${pico.intervention}
Comparison: ${pico.comparison || "Not specified"}
Outcome: ${pico.outcome}`.trim();

  const elementDescriptions = PRESS_ELEMENTS.map(
    (e) => `**Element ${e.element}: ${e.name}**\n${e.description}`
  ).join("\n\n");

  const prompt = `You are an expert medical librarian and systematic review methodologist performing a peer review of an electronic search strategy using the PRESS 2015 (Peer Review of Electronic Search Strategies) checklist.

## Research Question (PICO)
${picoContext}

## Target Databases
${databases.join(", ")}

## Search Strategy Under Review
\`\`\`
${searchStrategy}
\`\`\`

## PRESS 2015 Checklist Elements

${elementDescriptions}

## Instructions

Critically evaluate the search strategy against each of the 6 PRESS 2015 elements.

For each element, assign one of:
- **no_revision**: The element is handled correctly; no changes needed.
- **minor_revision**: Small issues that should be corrected but do not fundamentally compromise the search (e.g., a missing synonym, a minor syntax issue).
- **major_revision**: Significant problems that would compromise the validity or comprehensiveness of the search (e.g., missing a key PICO concept, incorrect Boolean logic, missing all MeSH terms).

Provide specific, actionable feedback tied to the actual search strategy text. Quote problematic lines where relevant. For suggestions, be concrete (e.g., "Add truncated term 'diabet*' to line 3" rather than "add more synonyms").

The overall assessment should be:
- **approved**: All 6 elements rated no_revision
- **minor_revisions**: At least one minor_revision, no major_revision
- **major_revisions**: At least one major_revision`;

  const { object } = await generateObject({
    model: getModel(),
    schema: pressValidationSchema,
    prompt,
  });

  // Merge AI output with static metadata
  const elements: PRESSElement[] = object.elements.map((el) => {
    const meta = PRESS_ELEMENTS.find((e) => e.element === el.element)!;
    return {
      element: el.element,
      name: meta.name,
      description: meta.description,
      assessment: el.assessment,
      feedback: el.feedback,
      suggestions: el.suggestions,
    };
  });

  return {
    elements,
    overallAssessment: object.overallAssessment,
    summary: object.summary,
    assessedAt: new Date().toISOString(),
  };
}
