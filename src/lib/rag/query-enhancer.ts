import { generateObject } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import type { DomainConfig } from "@/lib/search/domains/types";
import { z } from "zod";

export async function generateMultiQueries(
  query: string,
  domain?: DomainConfig
): Promise<string[]> {
  const persona =
    domain?.personas.librarian ??
    "You are a medical research librarian. Generate query variations that use different terminology, synonyms, and phrasings. Focus on medical synonyms (e.g., 'heart attack' → 'myocardial infarction', 'blood thinners' → 'anticoagulants').";

  const { object } = await generateObject({
    model: getSmallModel(),
    schema: z.object({
      queries: z
        .array(z.string())
        .length(3)
        .describe(
          "3 variations of the query using different medical/scientific terminology"
        ),
    }),
    system: persona,
    prompt: query,
  });
  return [query, ...object.queries]; // Original + 3 variations = 4 total
}
