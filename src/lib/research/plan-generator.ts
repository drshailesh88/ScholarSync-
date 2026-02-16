/**
 * Research plan generation using AI.
 *
 * Translates a natural language research question into a structured
 * PubMed search strategy with MeSH terms, Boolean operators, and filters.
 */

import type { SearchPlan, StudyType } from "./types";

const PLAN_SYSTEM_PROMPT = `You are a medical librarian assistant. Given a research question, generate a structured PubMed search strategy.

Rules:
- Identify key concepts and map to MeSH terms where possible
- Include common synonyms and variant spellings
- Use Boolean operators (AND, OR) appropriately
- Group related terms with parentheses
- Suggest appropriate date ranges based on topic recency
- Suggest study type filters based on the question type
- Do NOT fabricate MeSH terms — only use real MeSH vocabulary
- If unsure about a MeSH term, use free-text search instead
- Output valid PubMed query syntax

Respond in JSON format only, matching this schema exactly:
{
  "pubmedQuery": "the Boolean PubMed query string",
  "meshTerms": ["MeSH Term 1", "MeSH Term 2"],
  "synonyms": { "concept": ["synonym1", "synonym2"] },
  "suggestedFilters": {
    "dateFrom": 2020,
    "dateTo": 2026,
    "studyTypes": ["rct", "systematic_review"]
  },
  "estimatedResults": "~120-180 papers",
  "rationale": "Brief explanation of the search strategy"
}

For studyTypes, use only these values: rct, systematic_review, meta_analysis, cohort, case_control, cross_sectional, case_report, case_series, clinical_trial, guideline, narrative_review, other`;

export interface PlanGenerationInput {
  question: string;
  currentFilters?: {
    dateFrom?: number;
    dateTo?: number;
    studyTypes?: StudyType[];
  };
  documentContext?: {
    title?: string;
    sectionHeadings?: string[];
  };
}

/**
 * Generate a search plan from a research question.
 * Called server-side from the /api/research/plan route.
 */
export function buildPlanPrompt(input: PlanGenerationInput): {
  system: string;
  user: string;
} {
  let userPrompt = `Research question: "${input.question}"`;

  if (input.currentFilters) {
    const parts: string[] = [];
    if (input.currentFilters.dateFrom) parts.push(`Date from: ${input.currentFilters.dateFrom}`);
    if (input.currentFilters.dateTo) parts.push(`Date to: ${input.currentFilters.dateTo}`);
    if (input.currentFilters.studyTypes?.length) {
      parts.push(`Study types: ${input.currentFilters.studyTypes.join(", ")}`);
    }
    if (parts.length > 0) {
      userPrompt += `\n\nUser has pre-selected these filters:\n${parts.join("\n")}`;
    }
  }

  if (input.documentContext) {
    const ctx: string[] = [];
    if (input.documentContext.title) ctx.push(`Document title: "${input.documentContext.title}"`);
    if (input.documentContext.sectionHeadings?.length) {
      ctx.push(`Section headings: ${input.documentContext.sectionHeadings.join(", ")}`);
    }
    if (ctx.length > 0) {
      userPrompt += `\n\nDocument context:\n${ctx.join("\n")}`;
    }
  }

  return {
    system: PLAN_SYSTEM_PROMPT,
    user: userPrompt,
  };
}

/**
 * Parse the AI-generated plan JSON into a SearchPlan.
 * Handles common AI output formatting issues.
 */
export function parsePlanResponse(
  originalQuery: string,
  responseText: string
): SearchPlan {
  // Try to extract JSON from the response
  let jsonStr = responseText.trim();

  // Handle markdown code blocks
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      originalQuery,
      pubmedQuery: parsed.pubmedQuery || originalQuery,
      meshTerms: Array.isArray(parsed.meshTerms) ? parsed.meshTerms : [],
      synonyms: typeof parsed.synonyms === "object" ? parsed.synonyms : {},
      suggestedFilters: {
        dateFrom: parsed.suggestedFilters?.dateFrom,
        dateTo: parsed.suggestedFilters?.dateTo,
        studyTypes: Array.isArray(parsed.suggestedFilters?.studyTypes)
          ? parsed.suggestedFilters.studyTypes
          : undefined,
      },
      estimatedResults: parsed.estimatedResults || "Unknown",
      rationale: parsed.rationale || "",
    };
  } catch {
    // Fallback: use the original query as a simple PubMed search
    return {
      originalQuery,
      pubmedQuery: originalQuery,
      meshTerms: [],
      synonyms: {},
      suggestedFilters: {},
      estimatedResults: "Unknown",
      rationale: "Could not generate structured plan. Using direct query.",
    };
  }
}
