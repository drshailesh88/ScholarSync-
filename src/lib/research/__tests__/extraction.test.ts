import { describe, it, expect } from "vitest";
import { buildExtractionPrompt, buildColumnExtractionPrompt, parseExtractionResponse } from "../extraction";

describe("buildExtractionPrompt", () => {
  it("builds prompt with abstract", () => {
    const result = buildExtractionPrompt({
      title: "Test Paper",
      abstractText: "This is the abstract.",
      userQuery: "What are the effects of Drug X?",
    });
    expect(result.system).toContain("extraction assistant");
    expect(result.user).toContain("Test Paper");
    expect(result.user).toContain("This is the abstract.");
    expect(result.user).toContain("Drug X");
  });

  it("uses full text when available", () => {
    const result = buildExtractionPrompt({
      title: "Test",
      abstractText: "Abstract",
      fullText: "Full text content here",
      userQuery: "query",
    });
    expect(result.user).toContain("Full text");
    expect(result.user).toContain("Full text content here");
  });

  it("truncates full text to 8000 chars", () => {
    const longText = "x".repeat(10000);
    const result = buildExtractionPrompt({
      title: "Test",
      abstractText: "Abstract",
      fullText: longText,
      userQuery: "query",
    });
    expect(result.user.length).toBeLessThan(longText.length + 500);
  });
});

describe("buildColumnExtractionPrompt", () => {
  it("builds column extraction prompt", () => {
    const result = buildColumnExtractionPrompt("Paper Title", "Abstract text here", [
      { name: "Sample Size", extractionInstructions: "Extract the number of participants" },
      { name: "Intervention", extractionInstructions: "Extract the main intervention" },
    ]);
    expect(result.system).toContain("extraction assistant");
    expect(result.user).toContain("Paper Title");
    expect(result.user).toContain("Sample Size");
    expect(result.user).toContain("Intervention");
    expect(result.user).toContain("Abstract text here");
  });

  it("numbers columns in prompt", () => {
    const result = buildColumnExtractionPrompt("T", "A", [
      { name: "Col1", extractionInstructions: "inst1" },
      { name: "Col2", extractionInstructions: "inst2" },
    ]);
    expect(result.user).toContain("1.");
    expect(result.user).toContain("2.");
  });
});

describe("parseExtractionResponse", () => {
  it("parses valid JSON", () => {
    const json = JSON.stringify({ summary: "Test summary", fields: {} });
    const result = parseExtractionResponse(json);
    expect(result).not.toBeNull();
    expect(result.summary).toBe("Test summary");
  });

  it("parses JSON from code block", () => {
    const md = '```json\n{"summary": "Parsed from block"}\n```';
    const result = parseExtractionResponse(md);
    expect(result).not.toBeNull();
    expect(result.summary).toBe("Parsed from block");
  });

  it("returns null for invalid JSON", () => {
    expect(parseExtractionResponse("not json")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(parseExtractionResponse("")).toBeNull();
  });
});
