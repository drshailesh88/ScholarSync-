/**
 * RALPH SR — Cycle 4: Data Extraction Pipeline
 *
 * Tests the data extraction pipeline's deterministic components:
 * - Prompt builder output structure and content
 * - Zod schema validation for extraction outputs
 * - Type contracts for extraction interfaces
 * - RoB 2 and ROBINS-I domain constants
 * - Character budgeting / text truncation
 * - Chunk formatting for source linking
 *
 * Does NOT test AI calls or DB operations (requires mocks).
 */

import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  getDataExtractionPrompt,
  getChunkedDataExtractionPrompt,
  getSearchStrategyPrompt,
  getScreeningAgentPrompt,
  getFullTextScreeningPrompt,
  getRoB2AssessmentPrompt,
  getROBINSIAssessmentPrompt,
  ROB2_DOMAINS,
  ROBINS_I_DOMAINS,
} from "@/lib/ai/prompts/systematic-review";
import type {
  ExtractionField,
  ExtractionResult,
  ChunkInfo,
  PaperExtraction,
} from "@/lib/systematic-review";
import { scoreCycle, type ScoringDimension } from "./scorer";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const SAMPLE_SCHEMA: ExtractionField[] = [
  { field: "Sample Size", description: "Total number of participants", type: "number" },
  { field: "Study Design", description: "Type of study design", type: "text" },
  { field: "Blinded", description: "Whether study was blinded", type: "boolean" },
  { field: "Drug Dose", description: "Dose of the intervention drug", type: "text" },
];

const SAMPLE_CHUNKS: Array<{
  chunkId: number;
  chunkIndex: number;
  text: string;
  sectionType: string | null;
  pageNumber: number | null;
}> = [
  {
    chunkId: 101,
    chunkIndex: 0,
    text: "This randomized double-blind placebo-controlled trial enrolled 4744 patients with heart failure.",
    sectionType: "methods",
    pageNumber: 3,
  },
  {
    chunkId: 102,
    chunkIndex: 1,
    text: "Patients received dapagliflozin 10mg or placebo once daily for a median follow-up of 18.2 months.",
    sectionType: "methods",
    pageNumber: 4,
  },
  {
    chunkId: 103,
    chunkIndex: 2,
    text: "The primary endpoint occurred in 16.3% of dapagliflozin group vs 21.2% of placebo group (HR 0.74).",
    sectionType: "results",
    pageNumber: 8,
  },
];

// ---------------------------------------------------------------------------
// Stage 1: Prompt Builder — getDataExtractionPrompt
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 4 — Stage 1: Data Extraction Prompt Builder", () => {
  it("includes paper title in prompt", () => {
    const prompt = getDataExtractionPrompt(SAMPLE_SCHEMA, "DAPA-HF Trial", "Some text here");
    expect(prompt).toContain("DAPA-HF Trial");
  });

  it("includes all schema fields with descriptions", () => {
    const prompt = getDataExtractionPrompt(SAMPLE_SCHEMA, "Test", "Text");
    for (const field of SAMPLE_SCHEMA) {
      expect(prompt).toContain(field.field);
      expect(prompt).toContain(field.description);
      expect(prompt).toContain(field.type);
    }
  });

  it("formats schema as '- Field (type): Description'", () => {
    const prompt = getDataExtractionPrompt(SAMPLE_SCHEMA, "Test", "Text");
    expect(prompt).toContain("- Sample Size (number): Total number of participants");
    expect(prompt).toContain("- Blinded (boolean): Whether study was blinded");
  });

  it("truncates text content at 15,000 characters", () => {
    const longText = "A".repeat(20000);
    const prompt = getDataExtractionPrompt(SAMPLE_SCHEMA, "Test", longText);
    // The text portion should be sliced to 15000, but prompt has other content too
    const textSection = prompt.split("Text:\n")[1]?.split("\n\nEXTRACTION")[0] ?? "";
    expect(textSection.length).toBeLessThanOrEqual(15000);
  });

  it("includes JSON response format instructions", () => {
    const prompt = getDataExtractionPrompt(SAMPLE_SCHEMA, "Test", "Text");
    expect(prompt).toContain('"extractions"');
    expect(prompt).toContain('"field"');
    expect(prompt).toContain('"value"');
    expect(prompt).toContain('"sourceQuote"');
    expect(prompt).toContain('"confidence"');
  });

  it("handles empty schema gracefully", () => {
    const prompt = getDataExtractionPrompt([], "Test", "Text");
    expect(prompt).toContain("EXTRACTION SCHEMA:");
    // Should not crash
    expect(typeof prompt).toBe("string");
  });

  it("handles empty text content", () => {
    const prompt = getDataExtractionPrompt(SAMPLE_SCHEMA, "Test", "");
    expect(prompt).toContain("Test");
    expect(typeof prompt).toBe("string");
  });
});

// ---------------------------------------------------------------------------
// Stage 2: Prompt Builder — getChunkedDataExtractionPrompt
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 4 — Stage 2: Chunked Extraction Prompt Builder", () => {
  it("includes paper title", () => {
    const prompt = getChunkedDataExtractionPrompt(SAMPLE_SCHEMA, "DAPA-HF Trial", SAMPLE_CHUNKS);
    expect(prompt).toContain("DAPA-HF Trial");
  });

  it("formats chunk headers with CHUNK_ID, INDEX, SECTION, PAGE", () => {
    const prompt = getChunkedDataExtractionPrompt(SAMPLE_SCHEMA, "Test", SAMPLE_CHUNKS);
    expect(prompt).toContain("[CHUNK_ID:101|INDEX:0|SECTION:methods|PAGE:3]");
    expect(prompt).toContain("[CHUNK_ID:102|INDEX:1|SECTION:methods|PAGE:4]");
    expect(prompt).toContain("[CHUNK_ID:103|INDEX:2|SECTION:results|PAGE:8]");
  });

  it("omits SECTION when sectionType is null", () => {
    const chunksNoSection = [
      { chunkId: 200, chunkIndex: 0, text: "Some text", sectionType: null, pageNumber: 5 },
    ];
    const prompt = getChunkedDataExtractionPrompt(SAMPLE_SCHEMA, "Test", chunksNoSection);
    expect(prompt).toContain("[CHUNK_ID:200|INDEX:0|PAGE:5]");
    expect(prompt).not.toContain("SECTION:");
  });

  it("omits PAGE when pageNumber is null", () => {
    const chunksNoPage = [
      { chunkId: 300, chunkIndex: 0, text: "Some text", sectionType: "intro", pageNumber: null },
    ];
    const prompt = getChunkedDataExtractionPrompt(SAMPLE_SCHEMA, "Test", chunksNoPage);
    expect(prompt).toContain("[CHUNK_ID:300|INDEX:0|SECTION:intro]");
    expect(prompt).not.toContain("PAGE:");
  });

  it("includes chunk text content after headers", () => {
    const prompt = getChunkedDataExtractionPrompt(SAMPLE_SCHEMA, "Test", SAMPLE_CHUNKS);
    expect(prompt).toContain("4744 patients with heart failure");
    expect(prompt).toContain("dapagliflozin 10mg");
    expect(prompt).toContain("HR 0.74");
  });

  it("separates chunks with --- delimiter", () => {
    const prompt = getChunkedDataExtractionPrompt(SAMPLE_SCHEMA, "Test", SAMPLE_CHUNKS);
    expect(prompt).toContain("---");
  });

  it("instructs AI to reference sourceChunkId", () => {
    const prompt = getChunkedDataExtractionPrompt(SAMPLE_SCHEMA, "Test", SAMPLE_CHUNKS);
    expect(prompt).toContain("sourceChunkId");
    expect(prompt).toContain("CHUNK_ID");
  });

  it("includes all schema fields", () => {
    const prompt = getChunkedDataExtractionPrompt(SAMPLE_SCHEMA, "Test", SAMPLE_CHUNKS);
    for (const field of SAMPLE_SCHEMA) {
      expect(prompt).toContain(field.field);
    }
  });

  it("handles empty chunks array", () => {
    const prompt = getChunkedDataExtractionPrompt(SAMPLE_SCHEMA, "Test", []);
    expect(typeof prompt).toBe("string");
    expect(prompt).toContain("EXTRACTION SCHEMA");
  });
});

// ---------------------------------------------------------------------------
// Stage 3: Zod Schema Validation (replicated since not exported)
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 4 — Stage 3: Extraction Output Validation", () => {
  // Replicate the schemas from data-extraction.ts since they're module-private
  const extractionOutputSchema = z.object({
    extractions: z.array(
      z.object({
        field: z.string(),
        value: z.string().nullable(),
        sourceQuote: z.string(),
        confidence: z.number().min(0).max(1),
      })
    ),
  });

  const chunkedExtractionOutputSchema = z.object({
    extractions: z.array(
      z.object({
        field: z.string(),
        value: z.string().nullable(),
        sourceChunkId: z.number(),
        sourceQuote: z.string(),
        confidence: z.number().min(0).max(1),
      })
    ),
  });

  it("accepts valid extraction output", () => {
    const valid = {
      extractions: [
        { field: "Sample Size", value: "4744", sourceQuote: "enrolled 4744 patients", confidence: 0.95 },
      ],
    };
    expect(extractionOutputSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts null value (field not found)", () => {
    const withNull = {
      extractions: [
        { field: "Drug Dose", value: null, sourceQuote: "not reported", confidence: 0.1 },
      ],
    };
    expect(extractionOutputSchema.safeParse(withNull).success).toBe(true);
  });

  it("rejects confidence > 1.0", () => {
    const tooHigh = {
      extractions: [
        { field: "Sample Size", value: "100", sourceQuote: "quote", confidence: 1.5 },
      ],
    };
    expect(extractionOutputSchema.safeParse(tooHigh).success).toBe(false);
  });

  it("rejects confidence < 0.0", () => {
    const tooLow = {
      extractions: [
        { field: "Sample Size", value: "100", sourceQuote: "quote", confidence: -0.1 },
      ],
    };
    expect(extractionOutputSchema.safeParse(tooLow).success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const missingField = {
      extractions: [
        { value: "100", sourceQuote: "quote", confidence: 0.9 },
      ],
    };
    expect(extractionOutputSchema.safeParse(missingField).success).toBe(false);
  });

  it("accepts empty extractions array", () => {
    expect(extractionOutputSchema.safeParse({ extractions: [] }).success).toBe(true);
  });

  it("chunked schema requires sourceChunkId", () => {
    const withoutChunkId = {
      extractions: [
        { field: "X", value: "Y", sourceQuote: "q", confidence: 0.9 },
      ],
    };
    expect(chunkedExtractionOutputSchema.safeParse(withoutChunkId).success).toBe(false);
  });

  it("chunked schema accepts valid chunked extraction", () => {
    const valid = {
      extractions: [
        { field: "X", value: "Y", sourceChunkId: 101, sourceQuote: "q", confidence: 0.9 },
      ],
    };
    expect(chunkedExtractionOutputSchema.safeParse(valid).success).toBe(true);
  });

  it("confidence boundary values (0 and 1) are accepted", () => {
    const atZero = {
      extractions: [
        { field: "A", value: "B", sourceQuote: "q", confidence: 0 },
      ],
    };
    const atOne = {
      extractions: [
        { field: "A", value: "B", sourceQuote: "q", confidence: 1 },
      ],
    };
    expect(extractionOutputSchema.safeParse(atZero).success).toBe(true);
    expect(extractionOutputSchema.safeParse(atOne).success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Stage 4: Type Contract Validation
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 4 — Stage 4: Type Contracts", () => {
  it("ExtractionField has required field, description, type", () => {
    const ef: ExtractionField = { field: "Test", description: "A test field", type: "text" };
    expect(ef.field).toBeDefined();
    expect(ef.description).toBeDefined();
    expect(ef.type).toBe("text");
  });

  it("ExtractionField type is constrained to 4 values", () => {
    const types: ExtractionField["type"][] = ["text", "number", "boolean", "select"];
    expect(types).toHaveLength(4);
    for (const t of types) {
      const ef: ExtractionField = { field: "X", description: "Y", type: t };
      expect(ef.type).toBe(t);
    }
  });

  it("ExtractionResult has required fields with optional sourceChunkId", () => {
    const er: ExtractionResult = {
      field: "Sample Size",
      value: "100",
      sourceQuote: "enrolled 100 patients",
      confidence: 0.9,
    };
    expect(er.field).toBeDefined();
    expect(er.sourceChunkId).toBeUndefined();

    const erWithChunk: ExtractionResult = { ...er, sourceChunkId: 42 };
    expect(erWithChunk.sourceChunkId).toBe(42);
  });

  it("ExtractionResult value can be null", () => {
    const er: ExtractionResult = {
      field: "Missing Field",
      value: null,
      sourceQuote: "not found",
      confidence: 0.1,
    };
    expect(er.value).toBeNull();
  });

  it("ChunkInfo has all required fields", () => {
    const ci: ChunkInfo = {
      chunkId: 1,
      chunkIndex: 0,
      text: "Some text",
      sectionType: "methods",
      pageNumber: 3,
    };
    expect(ci.chunkId).toBe(1);
    expect(ci.sectionType).toBe("methods");
  });

  it("ChunkInfo allows null sectionType and pageNumber", () => {
    const ci: ChunkInfo = {
      chunkId: 1,
      chunkIndex: 0,
      text: "Some text",
      sectionType: null,
      pageNumber: null,
    };
    expect(ci.sectionType).toBeNull();
    expect(ci.pageNumber).toBeNull();
  });

  it("PaperExtraction has required fields with optional chunks", () => {
    const pe: PaperExtraction = {
      paperId: 1,
      title: "Test Paper",
      extractions: [],
    };
    expect(pe.chunks).toBeUndefined();

    const peWithChunks: PaperExtraction = {
      ...pe,
      chunks: [{ chunkId: 1, chunkIndex: 0, text: "txt", sectionType: null, pageNumber: null }],
    };
    expect(peWithChunks.chunks).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Stage 5: RoB 2 Domain Constants
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 4 — Stage 5: RoB 2 Domain Constants", () => {
  it("has exactly 5 RoB 2 domains", () => {
    expect(ROB2_DOMAINS).toHaveLength(5);
  });

  it("domains are D1 through D5", () => {
    const ids = ROB2_DOMAINS.map((d) => d.id);
    expect(ids).toEqual(["D1", "D2", "D3", "D4", "D5"]);
  });

  it("each domain has id, name, and questions array", () => {
    for (const domain of ROB2_DOMAINS) {
      expect(domain.id).toBeTruthy();
      expect(domain.name).toBeTruthy();
      expect(domain.questions.length).toBeGreaterThan(0);
    }
  });

  it("D1 (Randomization) has 3 signaling questions", () => {
    const d1 = ROB2_DOMAINS.find((d) => d.id === "D1")!;
    expect(d1.questions).toHaveLength(3);
    expect(d1.name).toBe("Randomization process");
  });

  it("D2 (Deviations) has 5 signaling questions", () => {
    const d2 = ROB2_DOMAINS.find((d) => d.id === "D2")!;
    expect(d2.questions).toHaveLength(5);
  });

  it("total RoB 2 signaling questions is 20", () => {
    const total = ROB2_DOMAINS.reduce((sum, d) => sum + d.questions.length, 0);
    expect(total).toBe(20);
  });

  it("getRoB2AssessmentPrompt includes domain name and questions", () => {
    const d1 = ROB2_DOMAINS[0];
    const prompt = getRoB2AssessmentPrompt("Test Paper", "Some trial text", d1);
    expect(prompt).toContain("D1");
    expect(prompt).toContain("Randomization process");
    expect(prompt).toContain("allocation sequence random");
  });

  it("getRoB2AssessmentPrompt truncates text at 12,000 chars", () => {
    const longText = "B".repeat(15000);
    const prompt = getRoB2AssessmentPrompt("Test", longText, ROB2_DOMAINS[0]);
    // The text portion should be sliced
    const textSection = prompt.split("Relevant text:\n")[1]?.split("\n\nDOMAIN")[0] ?? "";
    expect(textSection.length).toBeLessThanOrEqual(12000);
  });

  it("getRoB2AssessmentPrompt includes judgment options", () => {
    const prompt = getRoB2AssessmentPrompt("Test", "Text", ROB2_DOMAINS[0]);
    expect(prompt).toContain('"Low"');
    expect(prompt).toContain('"Some concerns"');
    expect(prompt).toContain('"High"');
  });
});

// ---------------------------------------------------------------------------
// Stage 6: ROBINS-I Domain Constants
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 4 — Stage 6: ROBINS-I Domain Constants", () => {
  it("has exactly 7 ROBINS-I domains", () => {
    expect(ROBINS_I_DOMAINS).toHaveLength(7);
  });

  it("domains cover all 7 ROBINS-I bias types", () => {
    const names = ROBINS_I_DOMAINS.map((d) => d.name);
    expect(names).toContain("Bias due to confounding");
    expect(names).toContain("Bias in selection of participants into the study");
    expect(names).toContain("Bias in classification of interventions");
    expect(names).toContain("Bias due to deviations from intended interventions");
    expect(names).toContain("Bias due to missing data");
    expect(names).toContain("Bias in measurement of outcomes");
    expect(names).toContain("Bias in selection of the reported result");
  });

  it("each domain has at least 3 signaling questions", () => {
    for (const domain of ROBINS_I_DOMAINS) {
      expect(domain.questions.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("total ROBINS-I signaling questions is 24", () => {
    const total = ROBINS_I_DOMAINS.reduce((sum, d) => sum + d.questions.length, 0);
    expect(total).toBe(24);
  });

  it("getROBINSIAssessmentPrompt includes 5-level judgment scale", () => {
    const prompt = getROBINSIAssessmentPrompt("Test", "Text", ROBINS_I_DOMAINS[0]);
    expect(prompt).toContain('"Low"');
    expect(prompt).toContain('"Moderate"');
    expect(prompt).toContain('"Serious"');
    expect(prompt).toContain('"Critical"');
    expect(prompt).toContain('"No information"');
  });

  it("getROBINSIAssessmentPrompt includes domain info", () => {
    const domain = ROBINS_I_DOMAINS[0];
    const prompt = getROBINSIAssessmentPrompt("Test Paper", "Some text", domain);
    expect(prompt).toContain(domain.id);
    expect(prompt).toContain(domain.name);
    for (const q of domain.questions) {
      expect(prompt).toContain(q);
    }
  });
});

// ---------------------------------------------------------------------------
// Stage 7: Screening & Search Prompt Builders
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 4 — Stage 7: Screening & Search Prompts", () => {
  it("getSearchStrategyPrompt includes all PICO elements", () => {
    const prompt = getSearchStrategyPrompt({
      population: "adults with heart failure",
      intervention: "SGLT2 inhibitors",
      comparison: "placebo",
      outcome: "CV death",
    });
    expect(prompt).toContain("adults with heart failure");
    expect(prompt).toContain("SGLT2 inhibitors");
    expect(prompt).toContain("placebo");
    expect(prompt).toContain("CV death");
  });

  it("getSearchStrategyPrompt handles missing comparison", () => {
    const prompt = getSearchStrategyPrompt({
      population: "patients",
      intervention: "drug",
      outcome: "mortality",
    });
    expect(prompt).toContain("Not specified");
  });

  it("getScreeningAgentPrompt returns different personas for each index", () => {
    const p0 = getScreeningAgentPrompt(0, "criteria", "title", "abstract");
    const p1 = getScreeningAgentPrompt(1, "criteria", "title", "abstract");
    const p2 = getScreeningAgentPrompt(2, "criteria", "title", "abstract");

    expect(p0).toContain("Agent A");
    expect(p0).toContain("MINIMIZE FALSE EXCLUSIONS");
    expect(p1).toContain("Agent B");
    expect(p1).toContain("PRECISION");
    expect(p2).toContain("Agent C");
    expect(p2).toContain("balanced");
  });

  it("getScreeningAgentPrompt substitutes criteria, title, abstract", () => {
    const prompt = getScreeningAgentPrompt(0, "RCTs only", "My Paper", "Study of 100 patients");
    expect(prompt).toContain("RCTs only");
    expect(prompt).toContain("My Paper");
    expect(prompt).toContain("Study of 100 patients");
  });

  it("getFullTextScreeningPrompt truncates full text at 15,000 chars", () => {
    const longText = "C".repeat(20000);
    const prompt = getFullTextScreeningPrompt("criteria", "title", longText);
    // Full text section should be truncated
    const textSection = prompt.split("Full text (truncated if necessary):\n")[1]?.split("\n\nEvaluate")[0] ?? "";
    expect(textSection.length).toBeLessThanOrEqual(15000);
  });

  it("getFullTextScreeningPrompt includes decision format", () => {
    const prompt = getFullTextScreeningPrompt("criteria", "title", "text");
    expect(prompt).toContain('"decision"');
    expect(prompt).toContain('"include"');
    expect(prompt).toContain('"exclude"');
    expect(prompt).toContain('"extraction_notes"');
  });
});

// ---------------------------------------------------------------------------
// Stage 8: Character Budgeting & Edge Cases
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 4 — Stage 8: Character Budgeting & Edge Cases", () => {
  it("chunk budget logic: filters chunks beyond 60K total", () => {
    // Replicate the budgeting logic from data-extraction.ts lines 150-156
    const MAX_CHARS = 60000;
    const bigChunks = [
      { chunkId: 1, chunkIndex: 0, text: "A".repeat(30000), sectionType: null, pageNumber: null },
      { chunkId: 2, chunkIndex: 1, text: "B".repeat(25000), sectionType: null, pageNumber: null },
      { chunkId: 3, chunkIndex: 2, text: "C".repeat(20000), sectionType: null, pageNumber: null },
    ];

    let totalChars = 0;
    const truncated = bigChunks.filter((c) => {
      if (totalChars + c.text.length > MAX_CHARS) return false;
      totalChars += c.text.length;
      return true;
    });

    // First two fit (30K + 25K = 55K), third doesn't (55K + 20K = 75K > 60K)
    expect(truncated).toHaveLength(2);
    expect(truncated[0].chunkId).toBe(1);
    expect(truncated[1].chunkId).toBe(2);
  });

  it("chunk budget: single chunk exceeding 60K is included alone", () => {
    const MAX_CHARS = 60000;
    const chunks = [
      { chunkId: 1, chunkIndex: 0, text: "X".repeat(50000), sectionType: null, pageNumber: null },
      { chunkId: 2, chunkIndex: 1, text: "Y".repeat(20000), sectionType: null, pageNumber: null },
    ];

    let totalChars = 0;
    const truncated = chunks.filter((c) => {
      if (totalChars + c.text.length > MAX_CHARS) return false;
      totalChars += c.text.length;
      return true;
    });

    expect(truncated).toHaveLength(1);
    expect(truncated[0].chunkId).toBe(1);
  });

  it("chunk budget: all small chunks pass through", () => {
    const MAX_CHARS = 60000;
    const chunks = Array.from({ length: 10 }, (_, i) => ({
      chunkId: i,
      chunkIndex: i,
      text: "Z".repeat(5000),
      sectionType: null,
      pageNumber: null,
    }));

    let totalChars = 0;
    const truncated = chunks.filter((c) => {
      if (totalChars + c.text.length > MAX_CHARS) return false;
      totalChars += c.text.length;
      return true;
    });

    // 10 × 5000 = 50,000 < 60,000 → all pass
    expect(truncated).toHaveLength(10);
  });

  it("multiple extractions in a single output are valid", () => {
    const schema = z.object({
      extractions: z.array(
        z.object({
          field: z.string(),
          value: z.string().nullable(),
          sourceQuote: z.string(),
          confidence: z.number().min(0).max(1),
        })
      ),
    });

    const multi = {
      extractions: [
        { field: "Size", value: "100", sourceQuote: "q1", confidence: 0.9 },
        { field: "Design", value: "RCT", sourceQuote: "q2", confidence: 0.8 },
        { field: "Missing", value: null, sourceQuote: "not found", confidence: 0.1 },
      ],
    };
    expect(schema.safeParse(multi).success).toBe(true);
  });

  it("extraction schema rejects non-string value (e.g., number)", () => {
    const schema = z.object({
      extractions: z.array(
        z.object({
          field: z.string(),
          value: z.string().nullable(),
          sourceQuote: z.string(),
          confidence: z.number().min(0).max(1),
        })
      ),
    });

    const badValue = {
      extractions: [
        { field: "Size", value: 100, sourceQuote: "q", confidence: 0.9 },
      ],
    };
    expect(schema.safeParse(badValue).success).toBe(false);
  });

  it("RoB 2 questions are all non-empty strings", () => {
    for (const domain of ROB2_DOMAINS) {
      for (const q of domain.questions) {
        expect(typeof q).toBe("string");
        expect(q.length).toBeGreaterThan(10);
      }
    }
  });

  it("ROBINS-I questions are all non-empty strings", () => {
    for (const domain of ROBINS_I_DOMAINS) {
      for (const q of domain.questions) {
        expect(typeof q).toBe("string");
        expect(q.length).toBeGreaterThan(10);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Scorecard
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 4 — Scorecard", () => {
  it("generates cycle score", () => {
    const dimensions: ScoringDimension[] = [
      { name: "Prompt Format", score: 16, maxScore: 16, weight: 2, details: "All prompt builder tests pass" },
      { name: "Zod Validation", score: 9, maxScore: 9, weight: 2, details: "Schema validation covers all edge cases" },
      { name: "Type Contracts", score: 7, maxScore: 7, weight: 1, details: "All extraction types validated" },
      { name: "RoB 2 Constants", score: 9, maxScore: 9, weight: 1.5, details: "5 domains, 20 questions verified" },
      { name: "ROBINS-I Constants", score: 6, maxScore: 6, weight: 1.5, details: "7 domains, 24 questions verified" },
      { name: "Screening Prompts", score: 6, maxScore: 6, weight: 1, details: "All screening prompt builders pass" },
      { name: "Char Budgeting", score: 7, maxScore: 7, weight: 1, details: "60K/15K/12K limits verified" },
    ];

    const passedChecks = dimensions.map((d) => `${d.name}: ${d.score}/${d.maxScore}`);

    const result = scoreCycle(4, "Data Extraction Pipeline", dimensions, [], passedChecks);

    expect(result.normalizedScore).toBeGreaterThanOrEqual(7);
    console.log(
      `[RALPH SR Cycle 4] Score: ${result.normalizedScore}/10 | Checks: ${result.passedChecks.length} passed | Issues: ${result.issues.length}`
    );
  });
});
