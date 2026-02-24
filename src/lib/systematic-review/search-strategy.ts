/**
 * Search Strategy Generator
 *
 * Converts a PICO framework into a comprehensive, reproducible search
 * strategy compatible with PubMed, Cochrane, and other databases.
 *
 * Replicates Scholara's approach:
 *  - PICO → MeSH terms + free-text synonyms
 *  - Boolean string construction
 *  - Live PubMed result preview (count)
 *  - Multi-database support
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { getSearchStrategyPrompt } from "@/lib/ai/prompts/systematic-review";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PICOInput {
  population: string;
  intervention: string;
  comparison?: string;
  outcome: string;
}

export interface SearchBlock {
  picoElement: "population" | "intervention" | "comparison" | "outcome";
  meshTerms: string[];
  freeTextTerms: string[];
  booleanBlock: string;
}

export interface SearchStrategy {
  pico: PICOInput;
  blocks: SearchBlock[];
  fullSearchString: string;
  suggestedFilters: string[];
  estimatedResults?: number;
}

// ---------------------------------------------------------------------------
// Schema for AI-generated strategy
// ---------------------------------------------------------------------------

const searchStrategySchema = z.object({
  blocks: z.array(
    z.object({
      picoElement: z.enum(["population", "intervention", "comparison", "outcome"]),
      meshTerms: z.array(z.string()).describe("MeSH headings for this PICO element"),
      freeTextTerms: z.array(z.string()).describe("Free-text synonyms and alternate spellings"),
      booleanBlock: z.string().describe("Boolean block for this element, e.g. (term1[MeSH] OR term2[tiab])"),
    })
  ),
  fullSearchString: z.string().describe("Complete PubMed search string combining all blocks with AND"),
  suggestedFilters: z.array(z.string()).describe("Suggested PubMed filters (e.g. Randomized Controlled Trial, English, Humans)"),
});

// ---------------------------------------------------------------------------
// Generate search strategy from PICO
// ---------------------------------------------------------------------------

export async function generateSearchStrategy(
  pico: PICOInput
): Promise<SearchStrategy> {
  const prompt = getSearchStrategyPrompt(pico);

  const { object } = await generateObject({
    model: getModel(),
    schema: searchStrategySchema,
    prompt,
  });

  // Get estimated result count from PubMed
  let estimatedResults: number | undefined;
  try {
    estimatedResults = await getPubMedResultCount(object.fullSearchString);
  } catch {
    // Non-critical — continue without count
  }

  return {
    pico,
    blocks: object.blocks,
    fullSearchString: object.fullSearchString,
    suggestedFilters: object.suggestedFilters,
    estimatedResults,
  };
}

// ---------------------------------------------------------------------------
// Get PubMed result count for a search string (live preview)
// ---------------------------------------------------------------------------

async function getPubMedResultCount(searchString: string): Promise<number> {
  const params = new URLSearchParams({
    db: "pubmed",
    term: searchString,
    rettype: "count",
    retmode: "json",
  });

  const res = await fetch(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${params}`,
    { signal: AbortSignal.timeout(10_000) }
  );

  if (!res.ok) throw new Error(`PubMed API error: ${res.status}`);

  const data = await res.json();
  return parseInt(data.esearchresult?.count ?? "0", 10);
}

// ---------------------------------------------------------------------------
// Format search string for different databases
// ---------------------------------------------------------------------------

export function formatForCochrane(pubmedString: string): string {
  // Convert PubMed syntax to Cochrane CENTRAL syntax
  return pubmedString
    .replace(/\[MeSH Terms\]/g, "[MeSH descriptor]")
    .replace(/\[tiab\]/g, ":ti,ab")
    .replace(/\[Mesh\]/g, "[MeSH descriptor]");
}

export function formatForEmbase(pubmedString: string): string {
  // Convert PubMed syntax to Embase syntax
  return pubmedString
    .replace(/\[MeSH Terms\]/g, "/exp")
    .replace(/\[tiab\]/g, ":ti,ab")
    .replace(/\[Mesh\]/g, "/exp");
}
