import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mocks for citation helpers
// ---------------------------------------------------------------------------
const { mockFormatCitation, mockFormatInTextCitation, mockGenerateBibTeX } =
  vi.hoisted(() => ({
    mockFormatCitation: vi.fn(),
    mockFormatInTextCitation: vi.fn(),
    mockGenerateBibTeX: vi.fn(),
  }));

vi.mock("@/lib/citations", () => ({
  formatCitation: mockFormatCitation,
  formatInTextCitation: mockFormatInTextCitation,
  generateBibTeX: mockGenerateBibTeX,
}));

// ---------------------------------------------------------------------------
// Import under test
// ---------------------------------------------------------------------------
import {
  formatCitationAction,
  formatInTextAction,
  getAllCitationFormats,
} from "../citations";

// ---------------------------------------------------------------------------
// Shared test data
// ---------------------------------------------------------------------------
const samplePaper = {
  title: "A Study on Testing",
  authors: ["Smith J", "Doe A"],
  year: 2024,
  journal: "Journal of Tests",
  doi: "10.1234/test",
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("citations actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // formatCitationAction
  // -------------------------------------------------------------------------
  describe("formatCitationAction", () => {
    it("delegates to formatCitation and returns the formatted string", async () => {
      mockFormatCitation.mockReturnValue(
        "Smith J, Doe A. A Study on Testing. Journal of Tests. 2024."
      );

      const result = await formatCitationAction(samplePaper, "apa");

      expect(mockFormatCitation).toHaveBeenCalledWith(samplePaper, "apa");
      expect(result).toBe(
        "Smith J, Doe A. A Study on Testing. Journal of Tests. 2024."
      );
    });

    it("passes the style argument through correctly", async () => {
      mockFormatCitation.mockReturnValue("MLA formatted citation");

      const result = await formatCitationAction(samplePaper, "mla");

      expect(mockFormatCitation).toHaveBeenCalledWith(samplePaper, "mla");
      expect(result).toBe("MLA formatted citation");
    });
  });

  // -------------------------------------------------------------------------
  // formatInTextAction
  // -------------------------------------------------------------------------
  describe("formatInTextAction", () => {
    it("delegates to formatInTextCitation and returns the formatted string", async () => {
      mockFormatInTextCitation.mockReturnValue("(Smith & Doe, 2024)");

      const result = await formatInTextAction(samplePaper, "apa");

      expect(mockFormatInTextCitation).toHaveBeenCalledWith(samplePaper, "apa");
      expect(result).toBe("(Smith & Doe, 2024)");
    });

    it("handles vancouver style", async () => {
      mockFormatInTextCitation.mockReturnValue("[1]");

      const result = await formatInTextAction(samplePaper, "vancouver");

      expect(mockFormatInTextCitation).toHaveBeenCalledWith(
        samplePaper,
        "vancouver"
      );
      expect(result).toBe("[1]");
    });
  });

  // -------------------------------------------------------------------------
  // getAllCitationFormats
  // -------------------------------------------------------------------------
  describe("getAllCitationFormats", () => {
    it("returns all five styles plus bibtex", async () => {
      mockFormatCitation.mockReturnValue("Full citation");
      mockFormatInTextCitation.mockReturnValue("(In-text)");
      mockGenerateBibTeX.mockReturnValue("@article{key, ...}");

      const result = await getAllCitationFormats(samplePaper);

      expect(result).toHaveProperty("apa");
      expect(result).toHaveProperty("mla");
      expect(result).toHaveProperty("chicago");
      expect(result).toHaveProperty("vancouver");
      expect(result).toHaveProperty("harvard");
      expect(result).toHaveProperty("bibtex");
    });

    it("calls formatCitation once per style (5 times)", async () => {
      mockFormatCitation.mockReturnValue("citation");
      mockFormatInTextCitation.mockReturnValue("in-text");
      mockGenerateBibTeX.mockReturnValue("bibtex");

      await getAllCitationFormats(samplePaper);

      expect(mockFormatCitation).toHaveBeenCalledTimes(5);
      expect(mockFormatInTextCitation).toHaveBeenCalledTimes(5);
      expect(mockGenerateBibTeX).toHaveBeenCalledTimes(1);
    });

    it("each style entry has full and inText fields", async () => {
      mockFormatCitation.mockReturnValue("Full");
      mockFormatInTextCitation.mockReturnValue("InText");
      mockGenerateBibTeX.mockReturnValue("@article{}");

      const result = await getAllCitationFormats(samplePaper);

      for (const style of ["apa", "mla", "chicago", "vancouver", "harvard"] as const) {
        expect(result[style]).toEqual({ full: "Full", inText: "InText" });
      }
    });

    it("returns bibtex as a plain string", async () => {
      mockFormatCitation.mockReturnValue("Full");
      mockFormatInTextCitation.mockReturnValue("InText");
      mockGenerateBibTeX.mockReturnValue("@article{smith2024, title={A Study}}");

      const result = await getAllCitationFormats(samplePaper);

      expect(typeof result.bibtex).toBe("string");
      expect(result.bibtex).toBe("@article{smith2024, title={A Study}}");
    });
  });
});
