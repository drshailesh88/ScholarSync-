import { generateObject } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { z } from "zod";

export async function decomposeQuery(
  query: string
): Promise<string[] | null> {
  const { object } = await generateObject({
    model: getSmallModel(),
    schema: z.object({
      isComplex: z
        .boolean()
        .describe(
          "True if the query has multiple distinct parts that need separate searches"
        ),
      subQuestions: z
        .array(z.string())
        .max(4)
        .describe("Sub-questions, only if isComplex is true"),
    }),
    system:
      "Analyze if this research question needs to be broken into sub-questions. Only decompose if the question clearly asks about multiple distinct topics (e.g., 'Compare X and Y' or 'What are the efficacy AND safety of Z'). Simple questions should NOT be decomposed.",
    prompt: query,
  });

  if (!object.isComplex || object.subQuestions.length <= 1) {
    return null;
  }
  return object.subQuestions;
}
