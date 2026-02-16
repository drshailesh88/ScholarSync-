import { describe, it, expect } from "vitest";
import { analyzeWriting } from "../writing-analysis";

describe("analyzeWriting", () => {
  it("should return basic metrics for simple text", () => {
    const text = "The quick brown fox jumps over the lazy dog. This is a simple sentence.";
    const { metrics, issues } = analyzeWriting(text);

    expect(metrics.wordCount).toBeGreaterThan(0);
    expect(metrics.sentenceCount).toBe(2);
    expect(metrics.paragraphCount).toBe(1);
    expect(metrics.avgWordsPerSentence).toBeGreaterThan(0);
  });

  it("should detect passive voice", () => {
    const text = "The experiment was conducted by the researchers. The results were analyzed carefully.";
    const { metrics } = analyzeWriting(text);

    expect(metrics.passiveVoiceCount).toBeGreaterThan(0);
  });

  it("should calculate Flesch Reading Ease score", () => {
    const text = "This is a simple sentence. It is easy to read. The words are short.";
    const { metrics } = analyzeWriting(text);

    // Simple text should have high readability
    expect(metrics.fleschReadingEase).toBeGreaterThan(50);
  });

  it("should handle empty text", () => {
    const { metrics, issues } = analyzeWriting("");
    expect(metrics.wordCount).toBe(0);
    // write-good may count 1 sentence for empty input
    expect(metrics.sentenceCount).toBeLessThanOrEqual(1);
    expect(issues.length).toBe(0);
  });

  it("should count paragraphs correctly", () => {
    const text = "First paragraph here.\n\nSecond paragraph here.\n\nThird paragraph here.";
    const { metrics } = analyzeWriting(text);

    expect(metrics.paragraphCount).toBe(3);
  });

  it("should return readability label", () => {
    const { metrics } = analyzeWriting("Simple words make reading easy. Short sentences help too.");
    expect(metrics.readabilityLabel).toBeDefined();
    expect(typeof metrics.readabilityLabel).toBe("string");
  });

  it("should calculate Flesch-Kincaid Grade Level", () => {
    const { metrics } = analyzeWriting("The cat sat on the mat. It was warm and sunny.");
    expect(metrics.fleschKincaidGrade).toBeDefined();
    expect(typeof metrics.fleschKincaidGrade).toBe("number");
  });
});
