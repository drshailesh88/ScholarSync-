import { generateObject } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { z } from "zod";

const metadataFilterSchema = z.object({
  sectionType: z
    .enum([
      "abstract",
      "introduction",
      "methods",
      "results",
      "discussion",
      "conclusion",
      "other",
    ])
    .optional()
    .describe(
      "If the user asks about a specific section, filter to that section"
    ),
  yearRange: z
    .object({
      start: z.number().optional(),
      end: z.number().optional(),
    })
    .optional()
    .describe("If the user mentions a year or date range"),
  requireTable: z
    .boolean()
    .optional()
    .describe(
      "True if the user is asking about table data or numerical results"
    ),
});

export type MetadataFilters = z.infer<typeof metadataFilterSchema>;

export async function extractMetadataFilters(
  query: string
): Promise<MetadataFilters> {
  const { object } = await generateObject({
    model: getSmallModel(),
    schema: metadataFilterSchema,
    system:
      "Extract metadata filters from this research question. Only extract filters that are explicitly or strongly implied in the question. Do NOT guess.",
    prompt: query,
  });
  return object;
}
