/**
 * AI extraction utilities for paper data.
 *
 * Extracts structured PICO fields and query-specific summaries
 * from paper abstracts/full text.
 */

const EXTRACTION_SYSTEM_PROMPT = `You are a medical research extraction assistant. Extract structured information from the provided paper abstract (or full text).

Rules:
- ONLY extract information that is explicitly stated in the text
- For each extracted field, provide the exact quote(s) from the text that support it
- If a field cannot be determined from the text, output "Not stated" as the value and empty string as the source
- For numerical values (sample sizes, effect sizes, p-values), copy exactly as written
- For study type, use these categories only: RCT, Systematic Review, Meta-Analysis, Cohort, Case-Control, Cross-Sectional, Case Report, Case Series, Clinical Trial, Guideline, Narrative Review, Other
- Generate a query-specific summary that addresses the user's research question using only information from this paper
- The summary should be 2-3 sentences maximum

Respond in JSON format matching this schema:
{
  "summary": "2-3 sentence summary addressing the user's query",
  "summarySourceSentences": ["exact sentence 1 from text", "exact sentence 2"],
  "fields": {
    "population": { "value": "extracted value", "source": "exact quote" },
    "intervention": { "value": "extracted value", "source": "exact quote" },
    "comparator": { "value": "extracted value", "source": "exact quote" },
    "primaryOutcome": { "value": "extracted value", "source": "exact quote" },
    "effectSize": { "value": "extracted value", "source": "exact quote" },
    "sampleSize": { "value": "extracted value", "source": "exact quote" },
    "followUp": { "value": "extracted value", "source": "exact quote" },
    "studyDesign": { "value": "extracted value", "source": "exact quote" },
    "limitations": { "value": "extracted value", "source": "exact quote" }
  }
}`;

export interface ExtractionInput {
  title: string;
  abstractText: string;
  fullText?: string;
  userQuery: string;
}

/**
 * Build the extraction prompt for the AI.
 */
export function buildExtractionPrompt(input: ExtractionInput): {
  system: string;
  user: string;
} {
  const textSource = input.fullText
    ? `Full text:\n${input.fullText.slice(0, 8000)}`
    : `Abstract:\n${input.abstractText}`;

  return {
    system: EXTRACTION_SYSTEM_PROMPT,
    user: `User's research question: "${input.userQuery}"

Paper title: "${input.title}"

${textSource}`,
  };
}

/**
 * Build prompts for evidence table column extraction.
 */
export function buildColumnExtractionPrompt(
  title: string,
  abstractText: string,
  columns: { name: string; extractionInstructions: string }[]
): {
  system: string;
  user: string;
} {
  const columnsDesc = columns
    .map((c, i) => `${i + 1}. "${c.name}": ${c.extractionInstructions}`)
    .join("\n");

  return {
    system: `You are a medical research extraction assistant. Extract specific data points from the provided paper abstract.

Rules:
- ONLY extract information explicitly stated in the text
- For each field, provide the extracted value AND the exact quote from the text
- If information is not available, use "Not stated" as value and empty string as source
- Be precise with numerical values — copy exactly as written
- Assess confidence: "high" if directly stated, "medium" if inferred from context, "low" if uncertain

Respond in JSON format:
{
  "extractions": [
    { "column": "column name", "value": "extracted value", "sourceQuote": "exact quote", "confidence": "high|medium|low" }
  ]
}`,
    user: `Paper title: "${title}"

Abstract:
${abstractText}

Extract data for these columns:
${columnsDesc}`,
  };
}

/**
 * Parse extraction response JSON.
 */
export function parseExtractionResponse(responseText: string) {
  let jsonStr = responseText.trim();
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }

  try {
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}
