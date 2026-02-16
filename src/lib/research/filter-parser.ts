/**
 * Natural language filter parser.
 *
 * Parses queries like "RCTs on semaglutide since 2020 in adults"
 * into structured filters + cleaned query.
 */

import type { ParsedFilter, StudyType, ResearchSearchFilters } from "./types";
import { DEFAULT_SEARCH_FILTERS } from "./types";

const STUDY_TYPE_PATTERNS: { pattern: RegExp; type: StudyType; label: string }[] = [
  { pattern: /\b(rcts?|randomized?\s+controlled?\s+trials?)\b/i, type: "rct", label: "RCT" },
  { pattern: /\b(systematic\s+reviews?|SRs?)\b/i, type: "systematic_review", label: "Systematic Review" },
  { pattern: /\b(meta[\s-]?analysis|meta[\s-]?analyses|MAs?)\b/i, type: "meta_analysis", label: "Meta-Analysis" },
  { pattern: /\b(cohort\s+stud(?:y|ies))\b/i, type: "cohort", label: "Cohort" },
  { pattern: /\b(case[\s-]?control)\b/i, type: "case_control", label: "Case-Control" },
  { pattern: /\b(cross[\s-]?sectional)\b/i, type: "cross_sectional", label: "Cross-Sectional" },
  { pattern: /\b(case\s+reports?)\b/i, type: "case_report", label: "Case Report" },
  { pattern: /\b(clinical\s+trials?)\b/i, type: "clinical_trial", label: "Clinical Trial" },
  { pattern: /\b(guidelines?|practice\s+guidelines?)\b/i, type: "guideline", label: "Guideline" },
  { pattern: /\b(reviews?)\b/i, type: "narrative_review", label: "Review" },
];

const DATE_PATTERNS = [
  { pattern: /\bsince\s+(\d{4})\b/i, extractor: (m: RegExpMatchArray) => ({ dateFrom: parseInt(m[1]) }) },
  { pattern: /\bfrom\s+(\d{4})\b/i, extractor: (m: RegExpMatchArray) => ({ dateFrom: parseInt(m[1]) }) },
  { pattern: /\bafter\s+(\d{4})\b/i, extractor: (m: RegExpMatchArray) => ({ dateFrom: parseInt(m[1]) + 1 }) },
  { pattern: /\bbefore\s+(\d{4})\b/i, extractor: (m: RegExpMatchArray) => ({ dateTo: parseInt(m[1]) - 1 }) },
  { pattern: /\buntil\s+(\d{4})\b/i, extractor: (m: RegExpMatchArray) => ({ dateTo: parseInt(m[1]) }) },
  { pattern: /\b(\d{4})\s*[-–to]+\s*(\d{4})\b/i, extractor: (m: RegExpMatchArray) => ({ dateFrom: parseInt(m[1]), dateTo: parseInt(m[2]) }) },
  { pattern: /\blast\s+(\d+)\s+years?\b/i, extractor: (m: RegExpMatchArray) => ({ dateFrom: new Date().getFullYear() - parseInt(m[1]) }) },
  { pattern: /\bpast\s+(\d+)\s+years?\b/i, extractor: (m: RegExpMatchArray) => ({ dateFrom: new Date().getFullYear() - parseInt(m[1]) }) },
];

const POPULATION_PATTERNS = [
  /\bin\s+(adults?|children|pediatric|elderly|older\s+adults?|geriatric|neonates?|infants?|adolescents?|pregnant\s+women|women|men)\b/i,
];

/**
 * Parse a natural language query into structured filters and a cleaned query.
 *
 * Examples:
 *   "RCTs on semaglutide since 2020 in adults"
 *   → query: "semaglutide", chips: [RCT, 2020-2026, adults]
 *
 *   "systematic reviews of SGLT2 inhibitors last 5 years"
 *   → query: "SGLT2 inhibitors", chips: [Systematic Review, 2021-2026]
 */
export function parseNaturalLanguageFilters(rawQuery: string): ParsedFilter {
  let query = rawQuery.trim();
  const chips: ParsedFilter["chips"] = [];
  const filters: Partial<ResearchSearchFilters> = {};

  // Extract study types
  const foundStudyTypes: StudyType[] = [];
  for (const { pattern, type, label } of STUDY_TYPE_PATTERNS) {
    const match = query.match(pattern);
    if (match) {
      foundStudyTypes.push(type);
      chips.push({ label, type: "studyType", value: type });
      query = query.replace(match[0], "").trim();
    }
  }
  if (foundStudyTypes.length > 0) {
    filters.studyTypes = foundStudyTypes;
  }

  // Extract date ranges
  for (const { pattern, extractor } of DATE_PATTERNS) {
    const match = query.match(pattern);
    if (match) {
      const dateFilters = extractor(match);
      if ("dateFrom" in dateFilters) {
        filters.dateFrom = dateFilters.dateFrom;
      }
      if ("dateTo" in dateFilters) {
        filters.dateTo = dateFilters.dateTo;
      }
      query = query.replace(match[0], "").trim();
    }
  }
  if (filters.dateFrom || filters.dateTo) {
    const from = filters.dateFrom || DEFAULT_SEARCH_FILTERS.dateFrom;
    const to = filters.dateTo || DEFAULT_SEARCH_FILTERS.dateTo;
    chips.push({ label: `${from}–${to}`, type: "dateRange", value: `${from}-${to}` });
  }

  // Extract population mentions
  for (const pattern of POPULATION_PATTERNS) {
    const match = query.match(pattern);
    if (match) {
      const pop = match[1];
      chips.push({ label: pop, type: "population", value: pop });
      // Don't remove population from query — it's a useful search term
    }
  }

  // Clean up leftover prepositions and connectors
  query = query
    .replace(/\b(on|of|for|about|regarding|concerning)\b\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  return { query, chips, filters };
}
