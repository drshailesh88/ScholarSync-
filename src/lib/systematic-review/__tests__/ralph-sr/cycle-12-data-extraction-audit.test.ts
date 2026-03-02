/**
 * RALPH SR — Cycle 12: Data Extraction Pipeline & Audit Trail
 *
 * Phase 2 continues: mock-heavy tests for async modules.
 * Targets: data-extraction.ts (AI extraction, chunking, matrix persistence)
 *          audit-trail.ts (event logging, CSV export, summary)
 *
 * Stages:
 *   1. Data Extraction Zod Schemas
 *   2. Extraction Type Contracts
 *   3. Chunk Truncation Logic (MAX_CHARS budget)
 *   4. Mock-Based extractDataFromPaper
 *   5. Mock-Based extractDataFromPaperWithChunks
 *   6. Mock-Based batchExtractData (progress + matrix)
 *   7. Audit Trail Types & csvEscape
 *   8. Mock-Based Audit Functions
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

import type {
  ExtractionField,
  ExtractionResult,
  ChunkInfo,
  PaperExtraction,
} from "../../data-extraction";

import type {
  AuditEvent,
  AuditLogEntry,
  AuditSummary,
} from "../../audit-trail";

// ---------------------------------------------------------------------------
// Replicate Zod schemas from data-extraction.ts
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Replicate chunk truncation logic (MAX_CHARS = 60000)
// ---------------------------------------------------------------------------

function truncateChunks(chunks: ChunkInfo[], maxChars: number = 60000): ChunkInfo[] {
  let totalChars = 0;
  return chunks.filter((c) => {
    if (totalChars + c.text.length > maxChars) return false;
    totalChars += c.text.length;
    return true;
  });
}

// ---------------------------------------------------------------------------
// Replicate csvEscape from audit-trail.ts
// ---------------------------------------------------------------------------

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeChunk(index: number, textLength: number, section?: string): ChunkInfo {
  return {
    chunkId: index + 100,
    chunkIndex: index,
    text: "x".repeat(textLength),
    sectionType: section ?? "methods",
    pageNumber: index + 1,
  };
}

const SAMPLE_SCHEMA: ExtractionField[] = [
  { field: "sample_size", description: "Total number of participants", type: "number" },
  { field: "intervention", description: "Primary intervention studied", type: "text" },
  { field: "outcome_measure", description: "Primary outcome measure", type: "text" },
  { field: "blinding", description: "Was the study double-blinded?", type: "boolean" },
];

// =====================================================================
// STAGE 1: Data Extraction Zod Schemas
// =====================================================================

describe("Cycle 12 — Stage 1: Data Extraction Zod Schemas", () => {
  describe("extractionOutputSchema", () => {
    it("validates correct extraction output", () => {
      const result = extractionOutputSchema.safeParse({
        extractions: [
          { field: "sample_size", value: "150", sourceQuote: "150 patients enrolled", confidence: 0.95 },
          { field: "intervention", value: "SGLT2 inhibitor", sourceQuote: "treated with dapagliflozin", confidence: 0.88 },
        ],
      });
      expect(result.success).toBe(true);
    });

    it("allows null value (data not found)", () => {
      const result = extractionOutputSchema.safeParse({
        extractions: [
          { field: "blinding", value: null, sourceQuote: "not reported", confidence: 0.3 },
        ],
      });
      expect(result.success).toBe(true);
    });

    it("rejects confidence > 1", () => {
      const result = extractionOutputSchema.safeParse({
        extractions: [
          { field: "test", value: "x", sourceQuote: "q", confidence: 1.5 },
        ],
      });
      expect(result.success).toBe(false);
    });

    it("rejects confidence < 0", () => {
      const result = extractionOutputSchema.safeParse({
        extractions: [
          { field: "test", value: "x", sourceQuote: "q", confidence: -0.1 },
        ],
      });
      expect(result.success).toBe(false);
    });

    it("rejects missing sourceQuote", () => {
      const result = extractionOutputSchema.safeParse({
        extractions: [
          { field: "test", value: "x", confidence: 0.8 },
        ],
      });
      expect(result.success).toBe(false);
    });

    it("allows empty extractions array", () => {
      const result = extractionOutputSchema.safeParse({ extractions: [] });
      expect(result.success).toBe(true);
    });
  });

  describe("chunkedExtractionOutputSchema", () => {
    it("requires sourceChunkId (number)", () => {
      const result = chunkedExtractionOutputSchema.safeParse({
        extractions: [
          { field: "sample_size", value: "200", sourceChunkId: 5, sourceQuote: "200 enrolled", confidence: 0.9 },
        ],
      });
      expect(result.success).toBe(true);
    });

    it("rejects missing sourceChunkId", () => {
      const result = chunkedExtractionOutputSchema.safeParse({
        extractions: [
          { field: "test", value: "x", sourceQuote: "q", confidence: 0.8 },
        ],
      });
      expect(result.success).toBe(false);
    });

    it("rejects non-numeric sourceChunkId", () => {
      const result = chunkedExtractionOutputSchema.safeParse({
        extractions: [
          { field: "test", value: "x", sourceChunkId: "chunk_5", sourceQuote: "q", confidence: 0.8 },
        ],
      });
      expect(result.success).toBe(false);
    });
  });
});

// =====================================================================
// STAGE 2: Extraction Type Contracts
// =====================================================================

describe("Cycle 12 — Stage 2: Extraction Type Contracts", () => {
  it("ExtractionField supports 4 types", () => {
    const types: ExtractionField["type"][] = ["text", "number", "boolean", "select"];
    expect(types).toHaveLength(4);
  });

  it("ExtractionField has required fields", () => {
    const f: ExtractionField = { field: "sample_size", description: "N participants", type: "number" };
    expect(f.field).toBeDefined();
    expect(f.description).toBeDefined();
    expect(f.type).toBe("number");
  });

  it("ExtractionResult has optional sourceChunkId", () => {
    const r: ExtractionResult = {
      field: "intervention",
      value: "metformin",
      sourceQuote: "treated with metformin",
      confidence: 0.9,
    };
    expect(r.sourceChunkId).toBeUndefined();

    const rWithChunk: ExtractionResult = {
      ...r,
      sourceChunkId: 42,
    };
    expect(rWithChunk.sourceChunkId).toBe(42);
  });

  it("ChunkInfo has nullable fields", () => {
    const c: ChunkInfo = {
      chunkId: 1,
      chunkIndex: 0,
      text: "Introduction...",
      sectionType: null,
      pageNumber: null,
    };
    expect(c.sectionType).toBeNull();
    expect(c.pageNumber).toBeNull();
  });

  it("PaperExtraction has optional chunks", () => {
    const pe: PaperExtraction = {
      paperId: 100,
      title: "Test Paper",
      extractions: [],
    };
    expect(pe.chunks).toBeUndefined();

    const peWithChunks: PaperExtraction = {
      ...pe,
      chunks: [makeChunk(0, 100)],
    };
    expect(peWithChunks.chunks).toHaveLength(1);
  });

  it("ExtractionResult allows null value", () => {
    const r: ExtractionResult = {
      field: "blinding",
      value: null,
      sourceQuote: "not reported",
      confidence: 0.2,
    };
    expect(r.value).toBeNull();
  });
});

// =====================================================================
// STAGE 3: Chunk Truncation Logic
// =====================================================================

describe("Cycle 12 — Stage 3: Chunk Truncation Logic", () => {
  it("keeps all chunks when total < MAX_CHARS", () => {
    const chunks = [makeChunk(0, 1000), makeChunk(1, 2000), makeChunk(2, 3000)];
    const result = truncateChunks(chunks, 60000);
    expect(result).toHaveLength(3);
  });

  it("truncates chunks exceeding MAX_CHARS budget", () => {
    const chunks = [
      makeChunk(0, 30000),
      makeChunk(1, 20000),
      makeChunk(2, 15000), // would exceed 60000
    ];
    const result = truncateChunks(chunks, 60000);
    expect(result).toHaveLength(2);
    expect(result[0].chunkIndex).toBe(0);
    expect(result[1].chunkIndex).toBe(1);
  });

  it("includes first chunk even if it's exactly MAX_CHARS", () => {
    const chunks = [makeChunk(0, 60000)];
    const result = truncateChunks(chunks, 60000);
    expect(result).toHaveLength(1);
  });

  it("excludes single chunk exceeding MAX_CHARS", () => {
    const chunks = [makeChunk(0, 60001)];
    const result = truncateChunks(chunks, 60000);
    expect(result).toHaveLength(0);
  });

  it("preserves chunk order (sequential accumulation)", () => {
    const chunks = [
      makeChunk(0, 20000),
      makeChunk(1, 20000),
      makeChunk(2, 20000),
      makeChunk(3, 20000), // exceeds
    ];
    const result = truncateChunks(chunks, 60000);
    expect(result).toHaveLength(3);
    expect(result.map((c) => c.chunkIndex)).toEqual([0, 1, 2]);
  });

  it("handles empty chunks array", () => {
    expect(truncateChunks([], 60000)).toHaveLength(0);
  });

  it("handles many small chunks", () => {
    const chunks = Array.from({ length: 100 }, (_, i) => makeChunk(i, 500));
    // 100 * 500 = 50000 < 60000
    const result = truncateChunks(chunks, 60000);
    expect(result).toHaveLength(100);
  });

  it("boundary: exactly at budget includes chunk", () => {
    const chunks = [makeChunk(0, 30000), makeChunk(1, 30000)];
    const result = truncateChunks(chunks, 60000);
    expect(result).toHaveLength(2);
  });

  it("boundary: one byte over budget excludes chunk", () => {
    const chunks = [makeChunk(0, 30000), makeChunk(1, 30001)];
    const result = truncateChunks(chunks, 60000);
    expect(result).toHaveLength(1);
  });
});

// =====================================================================
// STAGE 4: Mock-Based extractDataFromPaper
// =====================================================================

vi.mock("ai", () => ({
  generateObject: vi.fn(),
}));

vi.mock("@/lib/ai/models", () => ({
  getModel: vi.fn(() => "mock-model"),
}));

vi.mock("@/lib/ai/prompts/systematic-review", () => ({
  getDataExtractionPrompt: vi.fn(
    (_schema: ExtractionField[], title: string, _text: string) =>
      `Extract data from: ${title}`
  ),
  getChunkedDataExtractionPrompt: vi.fn(
    (_schema: ExtractionField[], title: string, _chunks: ChunkInfo[]) =>
      `Chunked extract from: ${title}`
  ),
}));

vi.mock("@/lib/db", () => {
  // The mock needs to handle multiple call patterns:
  // 1. select().from(comparisonMatrices).where().limit() → [] (getOrCreateMatrix check)
  // 2. select().from(matrixColumns).where() → [{id:1, name:"sample_size"}, ...] (saveExtractionToMatrix)
  // 3. select().from(paperChunks).where().orderBy() → [] (getPaperChunks)
  // 4. select().from(srAuditLog).where().orderBy().limit().offset() → [] (getAuditLog)
  const mockWhere = vi.fn(() => ({
    orderBy: vi.fn(() => Promise.resolve([])),
    limit: vi.fn(() => Promise.resolve([])),
    offset: vi.fn(() => Promise.resolve([])),
  }));

  const mockFrom = vi.fn(() => ({
    where: mockWhere,
  }));

  const mockSelect = vi.fn(() => ({
    from: mockFrom,
  }));

  // For saveExtractionToMatrix: columns query returns column objects
  // We intercept the `where` to return columns when matrixColumns is queried
  mockWhere.mockImplementation(() => {
    return {
      orderBy: vi.fn(() => Promise.resolve([])),
      limit: vi.fn(() => Promise.resolve([])),
      offset: vi.fn(() => Promise.resolve([])),
      // When called without .orderBy/.limit, returns as array directly
      then: (resolve: (v: unknown[]) => void) => resolve([
        { id: 1, name: "sample_size" },
        { id: 2, name: "intervention" },
        { id: 3, name: "outcome_measure" },
        { id: 4, name: "blinding" },
      ]),
    };
  });

  const mockInsert = vi.fn(() => ({
    values: vi.fn(() => ({
      returning: vi.fn(() => Promise.resolve([{ id: 1 }])),
      onConflictDoUpdate: vi.fn(() => Promise.resolve()),
    })),
  }));

  return {
    db: {
      select: mockSelect,
      insert: mockInsert,
      update: vi.fn(() => ({
        set: vi.fn(() => ({
          where: vi.fn(() => Promise.resolve()),
        })),
      })),
    },
  };
});

vi.mock("@/lib/db/schema", () => ({
  comparisonMatrices: { id: "id", projectId: "projectId" },
  matrixColumns: { matrixId: "matrixId", id: "id", name: "name" },
  matrixCells: { matrixId: "matrixId", columnId: "columnId", paperId: "paperId" },
  paperChunks: {
    id: "id", paper_id: "paper_id", chunk_index: "chunk_index",
    text: "text", section_type: "section_type", page_number: "page_number",
  },
  srAuditLog: {
    id: "id", projectId: "projectId", userId: "userId",
    action: "action", entityType: "entityType", entityId: "entityId",
    details: "details", aiInvolved: "aiInvolved", createdAt: "createdAt",
  },
}));

describe("Cycle 12 — Stage 4: Mock-Based extractDataFromPaper", () => {
  let extractDataFromPaper: typeof import("../../data-extraction").extractDataFromPaper;
  let generateObjectMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const aiModule = await import("ai");
    generateObjectMock = aiModule.generateObject as ReturnType<typeof vi.fn>;
    const mod = await import("../../data-extraction");
    extractDataFromPaper = mod.extractDataFromPaper;
  });

  it("extracts data from paper text and returns ExtractionResult[]", async () => {
    generateObjectMock.mockResolvedValue({
      object: {
        extractions: [
          { field: "sample_size", value: "150", sourceQuote: "150 patients", confidence: 0.95 },
          { field: "intervention", value: "dapagliflozin", sourceQuote: "SGLT2 inhibitor", confidence: 0.88 },
        ],
      },
    });

    const results = await extractDataFromPaper(
      SAMPLE_SCHEMA,
      "SGLT2 Inhibitor Trial",
      "A randomized controlled trial of 150 patients..."
    );

    expect(results).toHaveLength(2);
    expect(results[0].field).toBe("sample_size");
    expect(results[0].value).toBe("150");
    expect(results[0].confidence).toBe(0.95);
    expect(generateObjectMock).toHaveBeenCalledTimes(1);
  });

  it("handles empty extractions (no data found)", async () => {
    generateObjectMock.mockResolvedValue({ object: { extractions: [] } });

    const results = await extractDataFromPaper(
      SAMPLE_SCHEMA, "Empty Paper", "No relevant data"
    );
    expect(results).toHaveLength(0);
  });

  it("passes schema to prompt builder", async () => {
    const { getDataExtractionPrompt } = await import("@/lib/ai/prompts/systematic-review");
    generateObjectMock.mockResolvedValue({ object: { extractions: [] } });

    await extractDataFromPaper(SAMPLE_SCHEMA, "Test", "Text");

    expect(getDataExtractionPrompt).toHaveBeenCalledWith(
      SAMPLE_SCHEMA, "Test", "Text"
    );
  });
});

// =====================================================================
// STAGE 5: Mock-Based extractDataFromPaperWithChunks
// =====================================================================

describe("Cycle 12 — Stage 5: Mock-Based extractDataFromPaperWithChunks", () => {
  let extractDataFromPaperWithChunks: typeof import("../../data-extraction").extractDataFromPaperWithChunks;

  beforeEach(async () => {
    vi.clearAllMocks();
    const mod = await import("../../data-extraction");
    extractDataFromPaperWithChunks = mod.extractDataFromPaperWithChunks;
  });

  it("throws when no chunks found for paper", async () => {
    // getPaperChunks returns empty by default (mock db returns [])
    await expect(
      extractDataFromPaperWithChunks(SAMPLE_SCHEMA, "Test", 999)
    ).rejects.toThrow("No full-text chunks found");
  });

  it("error message includes paper ID", async () => {
    await expect(
      extractDataFromPaperWithChunks(SAMPLE_SCHEMA, "Test", 42)
    ).rejects.toThrow("42");
  });
});

// =====================================================================
// STAGE 6: Mock-Based batchExtractData
// =====================================================================

describe("Cycle 12 — Stage 6: Mock-Based batchExtractData", () => {
  let batchExtractData: typeof import("../../data-extraction").batchExtractData;
  let generateObjectMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const aiModule = await import("ai");
    generateObjectMock = aiModule.generateObject as ReturnType<typeof vi.fn>;
    const mod = await import("../../data-extraction");
    batchExtractData = mod.batchExtractData;
  });

  it("processes multiple papers and returns PaperExtraction[]", async () => {
    generateObjectMock.mockResolvedValue({
      object: {
        extractions: [
          { field: "sample_size", value: "100", sourceQuote: "100 enrolled", confidence: 0.9 },
        ],
      },
    });

    const papers = [
      { paperId: 1, title: "Study A", textContent: "Text A" },
      { paperId: 2, title: "Study B", textContent: "Text B" },
    ];

    const results = await batchExtractData(1, "Primary Matrix", SAMPLE_SCHEMA, papers);

    expect(results).toHaveLength(2);
    expect(results[0].paperId).toBe(1);
    expect(results[1].paperId).toBe(2);
    expect(results[0].extractions).toHaveLength(1);
  });

  it("calls onProgress callback with correct counts", async () => {
    generateObjectMock.mockResolvedValue({ object: { extractions: [] } });

    const progressCalls: [number, number][] = [];
    const papers = [
      { paperId: 1, title: "A", textContent: "..." },
      { paperId: 2, title: "B", textContent: "..." },
      { paperId: 3, title: "C", textContent: "..." },
    ];

    await batchExtractData(1, "Matrix", SAMPLE_SCHEMA, papers, (completed, total) => {
      progressCalls.push([completed, total]);
    });

    expect(progressCalls).toEqual([
      [1, 3],
      [2, 3],
      [3, 3],
    ]);
  });

  it("handles empty papers array", async () => {
    const results = await batchExtractData(1, "Matrix", SAMPLE_SCHEMA, []);
    expect(results).toHaveLength(0);
  });
});

// =====================================================================
// STAGE 7: Audit Trail Types & csvEscape
// =====================================================================

describe("Cycle 12 — Stage 7: Audit Trail Types & csvEscape", () => {
  describe("csvEscape", () => {
    it("returns plain string unchanged", () => {
      expect(csvEscape("hello")).toBe("hello");
    });

    it("wraps string with comma in quotes", () => {
      expect(csvEscape("hello, world")).toBe('"hello, world"');
    });

    it("wraps string with newline in quotes", () => {
      expect(csvEscape("line1\nline2")).toBe('"line1\nline2"');
    });

    it("escapes double quotes by doubling", () => {
      expect(csvEscape('say "hi"')).toBe('"say ""hi"""');
    });

    it("handles combined special chars", () => {
      expect(csvEscape('a "b", c\nd')).toBe('"a ""b"", c\nd"');
    });

    it("handles empty string", () => {
      expect(csvEscape("")).toBe("");
    });
  });

  describe("AuditEvent type", () => {
    it("has required fields", () => {
      const e: AuditEvent = {
        projectId: 1,
        userId: "user_abc",
        action: "screen",
        entityType: "paper",
      };
      expect(e.projectId).toBe(1);
      expect(e.action).toBe("screen");
    });

    it("supports optional fields", () => {
      const e: AuditEvent = {
        projectId: 1,
        userId: "user_abc",
        action: "extract",
        entityType: "extraction",
        entityId: 42,
        details: { schema: "primary" },
        aiInvolved: true,
      };
      expect(e.entityId).toBe(42);
      expect(e.aiInvolved).toBe(true);
      expect(e.details).toHaveProperty("schema");
    });
  });

  describe("AuditLogEntry type", () => {
    it("has all required fields including id and createdAt", () => {
      const entry: AuditLogEntry = {
        id: 1,
        userId: "user_abc",
        action: "screen",
        entityType: "paper",
        entityId: 100,
        details: { decision: "include" },
        aiInvolved: true,
        createdAt: new Date(),
      };
      expect(entry.id).toBe(1);
      expect(entry.createdAt).toBeInstanceOf(Date);
    });

    it("allows null for nullable fields", () => {
      const entry: AuditLogEntry = {
        id: 2,
        userId: "user_xyz",
        action: "config_change",
        entityType: "config",
        entityId: null,
        details: null,
        aiInvolved: false,
        createdAt: null,
      };
      expect(entry.entityId).toBeNull();
      expect(entry.details).toBeNull();
      expect(entry.createdAt).toBeNull();
    });
  });

  describe("AuditSummary type", () => {
    it("computed fields are consistent", () => {
      const s: AuditSummary = {
        totalEvents: 50,
        aiAssistedEvents: 35,
        humanOnlyEvents: 15,
        eventsByAction: { screen: 20, extract: 15, rob2_assess: 10, config_change: 5 },
      };
      expect(s.totalEvents).toBe(s.aiAssistedEvents + s.humanOnlyEvents);
      const actionSum = Object.values(s.eventsByAction).reduce((a, b) => a + b, 0);
      expect(actionSum).toBe(s.totalEvents);
    });
  });
});

// =====================================================================
// STAGE 8: Mock-Based Audit Functions
// =====================================================================

describe("Cycle 12 — Stage 8: Mock-Based Audit Functions", () => {
  let logAuditEvent: typeof import("../../audit-trail").logAuditEvent;
  let dbMock: { insert: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    vi.clearAllMocks();
    const dbModule = await import("@/lib/db");
    dbMock = dbModule.db as unknown as typeof dbMock;
    const mod = await import("../../audit-trail");
    logAuditEvent = mod.logAuditEvent;
  });

  it("logAuditEvent calls db.insert with correct values", async () => {
    const mockValues = vi.fn(() => ({
      onConflictDoUpdate: vi.fn(() => Promise.resolve()),
    }));
    dbMock.insert = vi.fn(() => ({ values: mockValues }));

    await logAuditEvent({
      projectId: 1,
      userId: "user_abc",
      action: "screen",
      entityType: "paper",
      entityId: 42,
      details: { decision: "include" },
      aiInvolved: true,
    });

    expect(dbMock.insert).toHaveBeenCalledTimes(1);
    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: 1,
        userId: "user_abc",
        action: "screen",
        entityType: "paper",
        entityId: 42,
        aiInvolved: true,
      })
    );
  });

  it("logAuditEvent defaults aiInvolved to false", async () => {
    const mockValues = vi.fn(() => ({
      onConflictDoUpdate: vi.fn(() => Promise.resolve()),
    }));
    dbMock.insert = vi.fn(() => ({ values: mockValues }));

    await logAuditEvent({
      projectId: 1,
      userId: "user_abc",
      action: "config_change",
      entityType: "config",
    });

    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        aiInvolved: false,
        entityId: null,
        details: null,
      })
    );
  });

  it("logAuditEvent defaults entityId to null", async () => {
    const mockValues = vi.fn(() => ({
      onConflictDoUpdate: vi.fn(() => Promise.resolve()),
    }));
    dbMock.insert = vi.fn(() => ({ values: mockValues }));

    await logAuditEvent({
      projectId: 2,
      userId: "user_xyz",
      action: "export",
      entityType: "analysis",
    });

    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        entityId: null,
      })
    );
  });
});
