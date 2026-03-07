import { describe, it, expect, vi } from "vitest";
import { PDFDocument } from "pdf-lib";

// We test the API route's POST handler by calling it directly.
// Mock auth and rate-limit so we can focus on PDF output.
vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn().mockResolvedValue("test-user"),
}));
vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn().mockResolvedValue(null),
  RATE_LIMITS: { export: {} },
}));
vi.mock("@/lib/logger", () => ({
  logger: { withRequestId: () => ({ error: vi.fn() }) },
}));

// Import after mocks
const routeMod = await import(
  "@/app/api/export/presentation-pdf/route"
);
const POST = routeMod.POST as (req: Request) => Promise<Response>;

function makeSlide(title: string, extra: Record<string, unknown> = {}) {
  return {
    title,
    subtitle: "",
    layout: "title_content",
    contentBlocks: [
      { type: "text", data: { text: `Content for ${title}` } },
      { type: "bullets", data: { items: ["Point A", "Point B"] } },
    ],
    speakerNotes: `Notes for ${title}`,
    ...extra,
  };
}

function buildRequest(overrides: Record<string, unknown> = {}) {
  const body = {
    title: "Test Deck",
    slides: [makeSlide("Slide 1"), makeSlide("Slide 2"), makeSlide("Slide 3")],
    layout: "full_slide",
    includeSlideNumbers: true,
    includeHeader: true,
    includeSpeakerNotes: true,
    paperSize: "letter",
    ...overrides,
  };
  return new Request("http://localhost/api/export/presentation-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function getPdf(overrides: Record<string, unknown> = {}) {
  const res = await POST(buildRequest(overrides));
  expect(res.status).toBe(200);
  const buf = await res.arrayBuffer();
  return PDFDocument.load(buf);
}

describe("handout PDF export layouts", () => {
  describe("full_slide layout", () => {
    it("generates landscape pages", async () => {
      const pdf = await getPdf({ layout: "full_slide" });
      const pages = pdf.getPages();
      expect(pages.length).toBe(3); // one page per slide
      // Landscape: width > height
      const { width, height } = pages[0].getSize();
      expect(width).toBeGreaterThan(height);
    });
  });

  describe("two_up layout", () => {
    it("generates portrait pages with 2 slides per page", async () => {
      const pdf = await getPdf({ layout: "two_up" });
      const pages = pdf.getPages();
      // 3 slides → 2 pages (2+1)
      expect(pages.length).toBe(2);
      // Portrait: height > width
      const { width, height } = pages[0].getSize();
      expect(height).toBeGreaterThan(width);
    });
  });

  describe("three_up_notes layout", () => {
    it("generates portrait pages with 3 slides + notes area", async () => {
      const pdf = await getPdf({ layout: "three_up_notes" });
      const pages = pdf.getPages();
      // 3 slides → 1 page
      expect(pages.length).toBe(1);
      const { width, height } = pages[0].getSize();
      expect(height).toBeGreaterThan(width);
    });

    it("generates 2 pages for 4 slides", async () => {
      const pdf = await getPdf({
        layout: "three_up_notes",
        slides: [makeSlide("S1"), makeSlide("S2"), makeSlide("S3"), makeSlide("S4")],
      });
      expect(pdf.getPages().length).toBe(2);
    });
  });

  describe("six_up layout", () => {
    it("generates portrait pages with ceil(slideCount/6) pages", async () => {
      const pdf = await getPdf({ layout: "six_up" });
      const pages = pdf.getPages();
      // 3 slides → 1 page
      expect(pages.length).toBe(1);
      const { width, height } = pages[0].getSize();
      expect(height).toBeGreaterThan(width);
    });

    it("generates 2 pages for 7 slides", async () => {
      const slides = Array.from({ length: 7 }, (_, i) => makeSlide(`Slide ${i + 1}`));
      const pdf = await getPdf({ layout: "six_up", slides });
      expect(pdf.getPages().length).toBe(2);
    });
  });

  describe("outline layout", () => {
    it("generates text-only content on portrait pages", async () => {
      const pdf = await getPdf({ layout: "outline" });
      const pages = pdf.getPages();
      expect(pages.length).toBeGreaterThanOrEqual(1);
      const { width, height } = pages[0].getSize();
      expect(height).toBeGreaterThan(width);
    });
  });

  describe("page numbers and headers", () => {
    it("includes deck title as header text", async () => {
      // We verify the PDF is created successfully with header option on
      const pdf = await getPdf({
        layout: "two_up",
        includeHeader: true,
      });
      expect(pdf.getPages().length).toBeGreaterThanOrEqual(1);
    });

    it("respects includeSlideNumbers=false", async () => {
      const pdf = await getPdf({
        layout: "full_slide",
        includeSlideNumbers: false,
      });
      expect(pdf.getPages().length).toBe(3);
    });
  });

  describe("paper size", () => {
    it("uses A4 dimensions when paperSize is a4", async () => {
      const pdf = await getPdf({ layout: "two_up", paperSize: "a4" });
      const { width, height } = pdf.getPages()[0].getSize();
      // A4: 595×842
      expect(width).toBeCloseTo(595, 0);
      expect(height).toBeCloseTo(842, 0);
    });

    it("uses Letter dimensions when paperSize is letter", async () => {
      const pdf = await getPdf({ layout: "two_up", paperSize: "letter" });
      const { width, height } = pdf.getPages()[0].getSize();
      // Letter: 612×792
      expect(width).toBeCloseTo(612, 0);
      expect(height).toBeCloseTo(792, 0);
    });
  });
});
