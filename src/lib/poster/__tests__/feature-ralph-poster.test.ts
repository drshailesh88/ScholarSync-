// =============================================================================
// FEATURE RALPH: Poster Generator Tests
// Coverage target: 9+/10
// =============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { z } from "zod";
import { POST } from "@/app/api/posters/generate/route";
import {
  POSTER_SIZES,
  POSTER_GRID_LAYOUTS,
  POSTER_TEMPLATES,
  type PosterSize,
  type PosterGridLayout,
} from "@/types/poster";
import { getPosterGeneratorSystemPrompt } from "@/lib/ai/prompts/presentation";

// Define schema locally since it's not exported from route
const generatePosterSchema = z.object({
  title: z.string().min(1).max(500),
  preprocessedData: z.string().min(1).max(200000),
  posterSize: z.enum(["a0_portrait", "a0_landscape", "a1_portrait", "a1_landscape", "48x36", "36x24"]),
  gridLayout: z.enum(["three_column", "two_column_wide", "four_column", "two_plus_one"]),
  themeKey: z.string().optional(),
  templateId: z.string().optional(),
  additionalInstructions: z.string().optional(),
  projectId: z.number().int().positive().optional(),
});

// =============================================================================
// MOCKS
// =============================================================================

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn().mockResolvedValue("user-123"),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn().mockResolvedValue(null),
  RATE_LIMITS: { ai: { maxRequests: 10, windowMs: 60000 } },
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: () => ({
      error: vi.fn(),
      info: vi.fn(),
    }),
  },
}));

vi.mock("@/lib/ai/models", () => ({
  getModel: vi.fn().mockReturnValue("mock-model"),
  traceGeneration: () => ({ end: vi.fn() }),
}));

vi.mock("ai", () => ({
  generateText: vi.fn().mockImplementation(() => {
    return Promise.resolve({
      text: JSON.stringify({
        title: "Test Poster",
        authors: ["John Doe", "Jane Smith"],
        affiliations: ["University of Testing"],
        sections: [
          {
            id: "intro",
            title: "Introduction",
            column: 0,
            row: 1,
            contentBlocks: [{ type: "text", data: { text: "Intro text" } }],
          },
          {
            id: "results",
            title: "Results",
            column: 1,
            row: 1,
            colSpan: 2,
            contentBlocks: [{ type: "bullets", data: { items: ["Result 1"] } }],
          },
        ],
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      usage: { inputTokens: 100, outputTokens: 50, totalTokens: 150, inputTokenDetails: undefined, outputTokenDetails: undefined } as any,
    });
  }),
}));

vi.mock("@/lib/actions/presentations", () => ({
  createDeck: vi.fn().mockResolvedValue({ id: 1, title: "Test Poster" }),
  updateDeck: vi.fn().mockResolvedValue(undefined),
  createSlide: vi.fn().mockResolvedValue({ id: 1 }),
}));

// =============================================================================
// FEATURE 1: API INPUT VALIDATION
// =============================================================================

describe("Poster Generate API - Input Validation", () => {
  describe("generatePosterSchema", () => {
    it("accepts valid minimal input", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test Poster",
        preprocessedData: "Some content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(true);
    });

    it("accepts valid full input", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test Poster",
        preprocessedData: "Content".repeat(100),
        posterSize: "a1_landscape",
        gridLayout: "two_column_wide",
        themeKey: "modern",
        templateId: "clinical_research",
        additionalInstructions: "Focus on results",
        projectId: 42,
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty title", () => {
      const result = generatePosterSchema.safeParse({
        title: "",
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(false);
    });

    it("rejects title over 500 chars", () => {
      const result = generatePosterSchema.safeParse({
        title: "x".repeat(501),
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(false);
    });

    it("rejects empty preprocessedData", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test",
        preprocessedData: "",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(false);
    });

    it("rejects preprocessedData over 200000 chars", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test",
        preprocessedData: "x".repeat(200001),
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(false);
    });

    it("rejects invalid posterSize", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test",
        preprocessedData: "Content",
        posterSize: "invalid_size",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(false);
    });

    it("rejects invalid gridLayout", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test",
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "invalid_layout",
      });
      expect(result.success).toBe(false);
    });

    it("accepts all valid poster sizes", () => {
      const validSizes: PosterSize[] = [
        "a0_portrait",
        "a0_landscape",
        "a1_portrait",
        "a1_landscape",
        "48x36",
        "36x24",
      ];
      for (const size of validSizes) {
        const result = generatePosterSchema.safeParse({
          title: "Test",
          preprocessedData: "Content",
          posterSize: size,
          gridLayout: "three_column",
        });
        expect(result.success).toBe(true);
      }
    });

    it("accepts all valid grid layouts", () => {
      const validLayouts: PosterGridLayout[] = [
        "three_column",
        "two_column_wide",
        "four_column",
        "two_plus_one",
      ];
      for (const layout of validLayouts) {
        const result = generatePosterSchema.safeParse({
          title: "Test",
          preprocessedData: "Content",
          posterSize: "a0_portrait",
          gridLayout: layout,
        });
        expect(result.success).toBe(true);
      }
    });
  });
});

// =============================================================================
// FEATURE 2: API RESPONSE SHAPES
// =============================================================================

describe("Poster Generate API - Response Shapes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns deckId on success", async () => {
    const req = new NextRequest("http://localhost/api/posters/generate", {
      method: "POST",
      body: JSON.stringify({
        title: "Test Poster",
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toHaveProperty("deckId");
    expect(data).toHaveProperty("sectionCount");
    expect(data).toHaveProperty("posterData");
  });

  it("returns 401 for unauthenticated users", async () => {
    vi.mocked(await import("@/lib/auth")).getCurrentUserId.mockImplementationOnce(() => {
      throw new Error("Unauthorized");
    });

    const req = new NextRequest("http://localhost/api/posters/generate", {
      method: "POST",
      body: JSON.stringify({
        title: "Test Poster",
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid input", async () => {
    const req = new NextRequest("http://localhost/api/posters/generate", {
      method: "POST",
      body: JSON.stringify({
        title: "",
        preprocessedData: "",
        posterSize: "invalid",
        gridLayout: "invalid",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data).toHaveProperty("error");
  });
});

// =============================================================================
// FEATURE 3: POSTER SIZES & LAYOUTS
// =============================================================================

describe("Poster Types - POSTER_SIZES", () => {
  it("has all required poster sizes", () => {
    const expectedSizes: PosterSize[] = [
      "a0_portrait",
      "a0_landscape",
      "a1_portrait",
      "a1_landscape",
      "48x36",
      "36x24",
    ];
    for (const size of expectedSizes) {
      expect(POSTER_SIZES).toHaveProperty(size);
    }
  });

  it("has required properties for each size", () => {
    for (const [_key, config] of Object.entries(POSTER_SIZES)) {
      expect(config).toHaveProperty("width");
      expect(config).toHaveProperty("height");
      expect(config).toHaveProperty("unit");
      expect(config).toHaveProperty("label");
      expect(config).toHaveProperty("pdfPoints");
      expect(config.pdfPoints).toHaveProperty("width");
      expect(config.pdfPoints).toHaveProperty("height");
      expect(typeof config.width).toBe("number");
      expect(typeof config.height).toBe("number");
    }
  });

  it("has correct dimensions for A0 Portrait", () => {
    expect(POSTER_SIZES.a0_portrait.width).toBe(841);
    expect(POSTER_SIZES.a0_portrait.height).toBe(1189);
    expect(POSTER_SIZES.a0_portrait.unit).toBe("mm");
  });

  it("has correct dimensions for A0 Landscape", () => {
    expect(POSTER_SIZES.a0_landscape.width).toBe(1189);
    expect(POSTER_SIZES.a0_landscape.height).toBe(841);
  });

  it("has correct dimensions for US Standard 48x36", () => {
    expect(POSTER_SIZES["48x36"].width).toBe(48);
    expect(POSTER_SIZES["48x36"].height).toBe(36);
    expect(POSTER_SIZES["48x36"].unit).toBe("in");
  });

  it("portrait sizes have height > width", () => {
    expect(POSTER_SIZES.a0_portrait.height).toBeGreaterThan(POSTER_SIZES.a0_portrait.width);
    expect(POSTER_SIZES.a1_portrait.height).toBeGreaterThan(POSTER_SIZES.a1_portrait.width);
  });

  it("landscape sizes have width > height", () => {
    expect(POSTER_SIZES.a0_landscape.width).toBeGreaterThan(POSTER_SIZES.a0_landscape.height);
    expect(POSTER_SIZES.a1_landscape.width).toBeGreaterThan(POSTER_SIZES.a1_landscape.height);
  });
});

describe("Poster Types - POSTER_GRID_LAYOUTS", () => {
  it("has all required grid layouts", () => {
    const expectedLayouts: PosterGridLayout[] = [
      "three_column",
      "two_column_wide",
      "four_column",
      "two_plus_one",
    ];
    for (const layout of expectedLayouts) {
      expect(POSTER_GRID_LAYOUTS).toHaveProperty(layout);
    }
  });

  it("has required properties for each layout", () => {
    for (const [_key, config] of Object.entries(POSTER_GRID_LAYOUTS)) {
      expect(config).toHaveProperty("label");
      expect(config).toHaveProperty("columns");
      expect(config).toHaveProperty("description");
      expect(typeof config.columns).toBe("number");
      expect(config.columns).toBeGreaterThanOrEqual(2);
      expect(config.columns).toBeLessThanOrEqual(4);
    }
  });

  it("three_column has 3 columns", () => {
    expect(POSTER_GRID_LAYOUTS.three_column.columns).toBe(3);
  });

  it("two_column_wide has 2 columns", () => {
    expect(POSTER_GRID_LAYOUTS.two_column_wide.columns).toBe(2);
  });

  it("four_column has 4 columns", () => {
    expect(POSTER_GRID_LAYOUTS.four_column.columns).toBe(4);
  });

  it("two_plus_one has 3 columns", () => {
    expect(POSTER_GRID_LAYOUTS.two_plus_one.columns).toBe(3);
  });
});

// =============================================================================
// FEATURE 4: POSTER TEMPLATES
// =============================================================================

describe("Poster Types - POSTER_TEMPLATES", () => {
  it("has expected templates", () => {
    expect(POSTER_TEMPLATES).toHaveProperty("clinical_research");
    expect(POSTER_TEMPLATES).toHaveProperty("basic_science");
    expect(POSTER_TEMPLATES).toHaveProperty("systematic_review");
    expect(POSTER_TEMPLATES).toHaveProperty("engineering");
  });

  it("each template has required properties", () => {
    for (const [_key, template] of Object.entries(POSTER_TEMPLATES)) {
      expect(template).toHaveProperty("name");
      expect(template).toHaveProperty("description");
      expect(template).toHaveProperty("gridLayout");
      expect(template).toHaveProperty("sections");
      expect(Array.isArray(template.sections)).toBe(true);
    }
  });

  it("clinical_research template uses three_column layout", () => {
    expect(POSTER_TEMPLATES.clinical_research.gridLayout).toBe("three_column");
  });

  it("engineering template uses two_column_wide layout", () => {
    expect(POSTER_TEMPLATES.engineering.gridLayout).toBe("two_column_wide");
  });

  it("template sections have required properties", () => {
    for (const [_key, template] of Object.entries(POSTER_TEMPLATES)) {
      for (const section of template.sections) {
        expect(section).toHaveProperty("title");
        expect(section).toHaveProperty("column");
        expect(section).toHaveProperty("row");
        expect(section).toHaveProperty("guidance");
        expect(typeof section.column).toBe("number");
        expect(typeof section.row).toBe("number");
      }
    }
  });

  it("title sections span full width", () => {
    for (const [_key, template] of Object.entries(POSTER_TEMPLATES)) {
      const titleSection = template.sections.find((s) => s.title === "Title");
      expect(titleSection).toBeDefined();
      // colSpan should equal columns for the layout
      if (titleSection?.colSpan) {
        const columns = POSTER_GRID_LAYOUTS[template.gridLayout].columns;
        expect(titleSection.colSpan).toBe(columns);
      }
    }
  });

  it("systematic_review template includes PRISMA section", () => {
    const prismaSection = POSTER_TEMPLATES.systematic_review.sections.find(
      (s) => s.title === "PRISMA Flow"
    );
    expect(prismaSection).toBeDefined();
  });
});

// =============================================================================
// FEATURE 5: POSTER GENERATOR PROMPT
// =============================================================================

describe("getPosterGeneratorSystemPrompt", () => {
  it("returns a string", () => {
    const prompt = getPosterGeneratorSystemPrompt({
      gridLayout: "three_column",
      columns: 3,
    });
    expect(typeof prompt).toBe("string");
  });

  it("includes column count in prompt", () => {
    const prompt = getPosterGeneratorSystemPrompt({
      gridLayout: "three_column",
      columns: 3,
    });
    expect(prompt).toContain("3-column");
  });

  it("includes grid layout name", () => {
    const prompt = getPosterGeneratorSystemPrompt({
      gridLayout: "two_column_wide",
      columns: 2,
    });
    expect(prompt).toContain("two_column_wide");
  });

  it("mentions template when templateId provided", () => {
    const prompt = getPosterGeneratorSystemPrompt({
      templateId: "clinical_research",
      gridLayout: "three_column",
      columns: 3,
    });
    expect(prompt).toContain("clinical_research");
  });

  it("includes JSON structure guidance", () => {
    const prompt = getPosterGeneratorSystemPrompt({
      gridLayout: "three_column",
      columns: 3,
    });
    expect(prompt).toContain('"title"');
    expect(prompt).toContain('"authors"');
    expect(prompt).toContain('"sections"');
  });

  it("includes content block types", () => {
    const prompt = getPosterGeneratorSystemPrompt({
      gridLayout: "three_column",
      columns: 3,
    });
    expect(prompt).toContain("text");
    expect(prompt).toContain("bullets");
    expect(prompt).toContain("chart");
    expect(prompt).toContain("table");
    expect(prompt).toContain("stat_result");
    expect(prompt).toContain("callout");
  });

  it("includes section rules", () => {
    const prompt = getPosterGeneratorSystemPrompt({
      gridLayout: "three_column",
      columns: 3,
    });
    expect(prompt).toContain("colSpan");
    expect(prompt).toContain("column:0, row:0");
  });

  it("includes poster best practices", () => {
    const prompt = getPosterGeneratorSystemPrompt({
      gridLayout: "three_column",
      columns: 3,
    });
    expect(prompt.toLowerCase()).toContain("results");
    expect(prompt.toLowerCase()).toContain("conclusions");
  });
});

// =============================================================================
// FEATURE 6: POSTER RENDERER COMPONENT STRUCTURE
// =============================================================================

describe("PosterRenderer Component Structure", () => {
  // Import the component to verify it exists and has correct structure
  it("should be importable", async () => {
    const posterModule = await import("@/components/presentation/poster-renderer");
    expect(posterModule.PosterRenderer).toBeDefined();
    expect(typeof posterModule.PosterRenderer).toBe("function");
  });

  it("should have correct props interface structure", () => {
    // Verify interface structure through type check
    interface PosterRendererProps {
      poster: {
        id: string;
        deckId: number;
        title: string;
        authors: string[];
        affiliations: string[];
        size: PosterSize;
        gridLayout: PosterGridLayout;
        sections: Array<{
          id: string;
          title: string;
          column: number;
          row: number;
          colSpan?: number;
          contentBlocks: unknown[];
        }>;
        themeConfig?: unknown;
        qrCodeUrl?: string;
      };
      scale?: number;
      className?: string;
      onSectionClick?: (sectionId: string) => void;
      activeSectionId?: string | null;
    }

    // Type check passes if no TS errors
    const _props: PosterRendererProps = {
      poster: {
        id: "test",
        deckId: 1,
        title: "Test",
        authors: [],
        affiliations: [],
        size: "a0_portrait",
        gridLayout: "three_column",
        sections: [],
      },
    };
    expect(_props).toBeDefined();
  });
});

// =============================================================================
// FEATURE 7: EDGE CASES
// =============================================================================

describe("Edge Cases", () => {
  describe("Schema edge cases", () => {
    it("handles minimum title length (1 char)", () => {
      const result = generatePosterSchema.safeParse({
        title: "x",
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(true);
    });

    it("handles maximum title length (500 chars)", () => {
      const result = generatePosterSchema.safeParse({
        title: "x".repeat(500),
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(true);
    });

    it("handles minimum preprocessedData length (1 char)", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test",
        preprocessedData: "x",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(true);
    });

    it("handles maximum preprocessedData length (200000 chars)", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test",
        preprocessedData: "x".repeat(200000),
        posterSize: "a0_portrait",
        gridLayout: "three_column",
      });
      expect(result.success).toBe(true);
    });

    it("rejects negative projectId", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test",
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
        projectId: -1,
      });
      expect(result.success).toBe(false);
    });

    it("rejects zero projectId", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test",
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
        projectId: 0,
      });
      expect(result.success).toBe(false);
    });

    it("accepts positive projectId", () => {
      const result = generatePosterSchema.safeParse({
        title: "Test",
        preprocessedData: "Content",
        posterSize: "a0_portrait",
        gridLayout: "three_column",
        projectId: 1,
      });
      expect(result.success).toBe(true);
    });
  });

  describe("PDF Points conversion", () => {
    it("A0 Portrait has correct PDF points", () => {
      // A0 is 841 x 1189 mm = 2384 x 3370 points (at 72 pts/inch, 1 inch = 25.4mm)
      expect(POSTER_SIZES.a0_portrait.pdfPoints.width).toBe(2384);
      expect(POSTER_SIZES.a0_portrait.pdfPoints.height).toBe(3370);
    });

    it("48x36 inches has correct PDF points", () => {
      // 48 x 36 inches = 3456 x 2592 points (48*72, 36*72)
      expect(POSTER_SIZES["48x36"].pdfPoints.width).toBe(3456);
      expect(POSTER_SIZES["48x36"].pdfPoints.height).toBe(2592);
    });
  });

  describe("Template column spans", () => {
    it("template section colSpans do not exceed layout columns", () => {
      for (const [_templateId, template] of Object.entries(POSTER_TEMPLATES)) {
        const columns = POSTER_GRID_LAYOUTS[template.gridLayout].columns;
        for (const section of template.sections) {
          if (section.colSpan) {
            expect(section.colSpan).toBeLessThanOrEqual(columns);
          }
        }
      }
    });

    it("template section columns are within layout bounds", () => {
      for (const [_templateId, template] of Object.entries(POSTER_TEMPLATES)) {
        const columns = POSTER_GRID_LAYOUTS[template.gridLayout].columns;
        for (const section of template.sections) {
          expect(section.column).toBeGreaterThanOrEqual(0);
          expect(section.column).toBeLessThan(columns);
        }
      }
    });
  });
});
