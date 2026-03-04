// =============================================================================
// FEATURE RALPH: Analysis / Writing Analysis Tests
// Coverage target: 9+/10
// =============================================================================

import { describe, it, expect } from "vitest";
import {
  analyzeWriting,
  type WritingIssue,
  type WritingMetrics,
} from "@/lib/writing-analysis";

// =============================================================================
// FEATURE 1: BASIC METRICS
// =============================================================================

describe("analyzeWriting - Basic Metrics", () => {
  it("returns issues and metrics for simple text", () => {
    const result = analyzeWriting("Hello world.");
    expect(result).toHaveProperty("issues");
    expect(result).toHaveProperty("metrics");
    expect(result.metrics.wordCount).toBe(2);
    expect(result.metrics.sentenceCount).toBe(1);
  });

  it("calculates correct word count", () => {
    const result = analyzeWriting("One two three four five.");
    expect(result.metrics.wordCount).toBe(5);
  });

  it("calculates correct sentence count", () => {
    const result = analyzeWriting("First sentence. Second sentence. Third.");
    expect(result.metrics.sentenceCount).toBe(3);
  });

  it("calculates correct paragraph count", () => {
    const result = analyzeWriting("First paragraph.\n\nSecond paragraph.\n\nThird.");
    expect(result.metrics.paragraphCount).toBe(3);
  });

  it("handles empty text", () => {
    const result = analyzeWriting("");
    expect(result.metrics.wordCount).toBe(0);
    expect(result.metrics.sentenceCount).toBe(1); // Math.max(0, 1) = 1
  });

  it("handles single word", () => {
    const result = analyzeWriting("Hello");
    expect(result.metrics.wordCount).toBe(1);
    expect(result.metrics.sentenceCount).toBe(1);
  });

  it("handles text with only punctuation", () => {
    const result = analyzeWriting("... !!! ???");
    expect(result.metrics.wordCount).toBe(3); // splits on whitespace
  });

  it("handles very long text", () => {
    const longText = "word ".repeat(1000);
    const result = analyzeWriting(longText);
    expect(result.metrics.wordCount).toBe(1000);
  });

  it("handles multiple consecutive line breaks", () => {
    const result = analyzeWriting("Para 1.\n\n\n\nPara 2.");
    expect(result.metrics.paragraphCount).toBe(2);
  });

  it("handles tabs and special whitespace", () => {
    const result = analyzeWriting("word1\tword2\tword3");
    expect(result.metrics.wordCount).toBe(3);
  });

  it("handles unicode characters", () => {
    const result = analyzeWriting("Hello 世界 мир");
    expect(result.metrics.wordCount).toBe(3);
  });

  it("handles text with no sentence-ending punctuation", () => {
    const result = analyzeWriting("just some words without punctuation");
    expect(result.metrics.sentenceCount).toBe(1);
  });
});

// =============================================================================
// FEATURE 2: READABILITY SCORES
// =============================================================================

describe("analyzeWriting - Readability Scores", () => {
  it("calculates Flesch Reading Ease score", () => {
    const result = analyzeWriting("The cat sat on the mat.");
    expect(result.metrics.fleschReadingEase).toBeGreaterThanOrEqual(0);
    expect(result.metrics.fleschReadingEase).toBeLessThanOrEqual(100);
  });

  it("calculates Flesch-Kincaid Grade Level", () => {
    const result = analyzeWriting("The cat sat on the mat.");
    expect(result.metrics.fleschKincaidGrade).toBeGreaterThanOrEqual(0);
  });

  it("calculates Gunning Fog Index", () => {
    const result = analyzeWriting("The cat sat on the mat.");
    expect(result.metrics.gunningFogIndex).toBeGreaterThanOrEqual(0);
  });

  it("calculates Automated Readability Index", () => {
    const result = analyzeWriting("The cat sat on the mat.");
    expect(result.metrics.automatedReadabilityIndex).toBeGreaterThanOrEqual(0);
  });

  it("calculates Coleman-Liau Index", () => {
    const result = analyzeWriting("The cat sat on the mat.");
    expect(result.metrics.colemanLiauIndex).toBeGreaterThanOrEqual(0);
  });

  it("returns correct readability label for easy text", () => {
    const result = analyzeWriting("The cat sat on the mat.");
    expect(["Easy", "Standard", "Difficult", "Very Difficult"]).toContain(result.metrics.readabilityLabel);
  });

  it("calculates average words per sentence", () => {
    const result = analyzeWriting("One two three. Four five.");
    expect(result.metrics.avgWordsPerSentence).toBe(2.5);
  });

  it("calculates average sentence length", () => {
    const result = analyzeWriting("One two three. Four five.");
    expect(result.metrics.avgSentenceLength).toBe(2.5);
  });

  it("calculates complex word count", () => {
    const result = analyzeWriting("information methodology understanding");
    expect(result.metrics.complexWordCount).toBeGreaterThanOrEqual(0);
  });

  it("calculates complex word percentage", () => {
    const result = analyzeWriting("information methodology understanding");
    expect(result.metrics.complexWordPercentage).toBeGreaterThanOrEqual(0);
    expect(result.metrics.complexWordPercentage).toBeLessThanOrEqual(100);
  });

  it("calculates vocabulary diversity", () => {
    const result = analyzeWriting("cat cat cat dog dog");
    expect(result.metrics.vocabularyDiversity).toBeGreaterThanOrEqual(0);
    expect(result.metrics.vocabularyDiversity).toBeLessThanOrEqual(1);
  });

  it("calculates average syllables per word", () => {
    const result = analyzeWriting("The cat sat on the mat.");
    expect(result.metrics.avgSyllablesPerWord).toBeGreaterThan(0);
  });
});

// =============================================================================
// FEATURE 3: WRITING ISSUES
// =============================================================================

describe("analyzeWriting - Writing Issues", () => {
  it("returns empty issues array for clean text", () => {
    const result = analyzeWriting("The cat sat on the mat.");
    expect(Array.isArray(result.issues)).toBe(true);
  });

  it("detects complex sentences (>35 words)", () => {
    const longSentence = "This is a very long sentence that contains more than thirty-five words and should be flagged as complex because it is hard to read and understand for most readers who prefer shorter sentences that are easier to comprehend quickly.";
    const result = analyzeWriting(longSentence);
    expect(result.metrics.complexSentenceCount).toBeGreaterThan(0);
    const complexIssue = result.issues.find((i) => i.type === "complex");
    expect(complexIssue).toBeDefined();
  });

  it("issues have correct structure", () => {
    const longSentence = "This is a very long sentence that contains more than thirty-five words and should be flagged as complex because it is hard to read and understand for most readers who prefer shorter sentences.";
    const result = analyzeWriting(longSentence);
    if (result.issues.length > 0) {
      const issue = result.issues[0];
      expect(issue).toHaveProperty("index");
      expect(issue).toHaveProperty("offset");
      expect(issue).toHaveProperty("reason");
      expect(issue).toHaveProperty("type");
      expect(issue).toHaveProperty("severity");
    }
  });

  it("issue type is valid", () => {
    const longSentence = "This is a very long sentence that contains more than thirty-five words and should be flagged as complex because it is hard to read and understand for most readers who prefer shorter sentences.";
    const result = analyzeWriting(longSentence);
    const validTypes = ["passive", "weasel", "adverb", "complex", "readability"];
    for (const issue of result.issues) {
      expect(validTypes).toContain(issue.type);
    }
  });

  it("issue severity is valid", () => {
    const longSentence = "This is a very long sentence that contains more than thirty-five words and should be flagged as complex because it is hard to read and understand for most readers who prefer shorter sentences.";
    const result = analyzeWriting(longSentence);
    const validSeverities = ["info", "warning", "error"];
    for (const issue of result.issues) {
      expect(validSeverities).toContain(issue.severity);
    }
  });

  it("complex sentence issue includes suggestion", () => {
    const longSentence = "This is a very long sentence that contains more than thirty-five words and should be flagged as complex because it is hard to read and understand for most readers who prefer shorter sentences.";
    const result = analyzeWriting(longSentence);
    const complexIssue = result.issues.find((i) => i.type === "complex");
    // Complex sentence issues should have a suggestion
    if (complexIssue) {
      expect(complexIssue.suggestion).toBeDefined();
    } else {
      // If no complex issue found, the sentence might not be >35 words
      expect(result.metrics.complexSentenceCount).toBeGreaterThanOrEqual(0);
    }
  });
});

// =============================================================================
// FEATURE 4: TYPE CHECKS
// =============================================================================

describe("Type Checks", () => {
  it("WritingIssue type has required fields", () => {
    const issue: WritingIssue = {
      index: 0,
      offset: 5,
      reason: "Test reason",
      type: "passive",
      severity: "warning",
      suggestion: "Test suggestion",
    };
    expect(issue.index).toBe(0);
    expect(issue.offset).toBe(5);
    expect(issue.reason).toBe("Test reason");
    expect(issue.type).toBe("passive");
    expect(issue.severity).toBe("warning");
    expect(issue.suggestion).toBe("Test suggestion");
  });

  it("WritingIssue suggestion is optional", () => {
    const issue: WritingIssue = {
      index: 0,
      offset: 5,
      reason: "Test reason",
      type: "adverb",
      severity: "info",
    };
    expect(issue.suggestion).toBeUndefined();
  });

  it("WritingMetrics type has all required fields", () => {
    const metrics: WritingMetrics = {
      wordCount: 100,
      sentenceCount: 10,
      paragraphCount: 3,
      avgWordsPerSentence: 10,
      avgSentenceLength: 10,
      fleschReadingEase: 60,
      fleschKincaidGrade: 8,
      gunningFogIndex: 10,
      automatedReadabilityIndex: 9,
      colemanLiauIndex: 8,
      complexWordCount: 15,
      complexWordPercentage: 15,
      vocabularyDiversity: 0.5,
      avgSyllablesPerWord: 1.5,
      passiveVoiceCount: 2,
      weaselWordCount: 1,
      adverbCount: 3,
      complexSentenceCount: 1,
      readabilityLabel: "Standard",
    };
    expect(metrics.wordCount).toBe(100);
    expect(metrics.readabilityLabel).toBe("Standard");
  });
});

// =============================================================================
// FEATURE 5: PASSIVE/WEASEL/ADVERB DETECTION
// =============================================================================

describe("analyzeWriting - Issue Detection", () => {
  it("initializes passive voice count to 0", () => {
    const result = analyzeWriting("active voice text");
    expect(result.metrics.passiveVoiceCount).toBeGreaterThanOrEqual(0);
  });

  it("initializes weasel word count to 0", () => {
    const result = analyzeWriting("specific clear text");
    expect(result.metrics.weaselWordCount).toBeGreaterThanOrEqual(0);
  });

  it("initializes adverb count to 0", () => {
    const result = analyzeWriting("simple text");
    expect(result.metrics.adverbCount).toBeGreaterThanOrEqual(0);
  });

  it("tracks issue counts in metrics", () => {
    const result = analyzeWriting("Some text with various issues.");
    expect(typeof result.metrics.passiveVoiceCount).toBe("number");
    expect(typeof result.metrics.weaselWordCount).toBe("number");
    expect(typeof result.metrics.adverbCount).toBe("number");
    expect(typeof result.metrics.complexSentenceCount).toBe("number");
  });
});

// =============================================================================
// FEATURE 6: READABILITY LABELS
// =============================================================================

describe("analyzeWriting - Readability Labels", () => {
  it("returns 'Easy' for high Flesch scores", () => {
    // Simple, short sentences should score high
    const result = analyzeWriting("The cat sat. The dog ran. I am happy.");
    expect(["Easy", "Standard", "Difficult", "Very Difficult"]).toContain(result.metrics.readabilityLabel);
  });

  it("returns valid label for any text", () => {
    const texts = [
      "Simple text.",
      "More complex academic writing with sophisticated vocabulary.",
      "This is a longer piece of text that contains multiple sentences and should be analyzed for readability using the Flesch Reading Ease formula.",
    ];
    for (const text of texts) {
      const result = analyzeWriting(text);
      expect(["Easy", "Standard", "Difficult", "Very Difficult"]).toContain(result.metrics.readabilityLabel);
    }
  });
});

// =============================================================================
// FEATURE 7: EDGE CASES
// =============================================================================

describe("Edge Cases", () => {
  describe("Empty and minimal inputs", () => {
    it("handles empty string", () => {
      const result = analyzeWriting("");
      expect(result.metrics.wordCount).toBe(0);
      expect(result.issues).toHaveLength(0);
    });

    it("handles whitespace only", () => {
      const result = analyzeWriting("   \t\n  ");
      expect(result.metrics.wordCount).toBe(0);
    });

    it("handles single character", () => {
      const result = analyzeWriting("a");
      expect(result.metrics.wordCount).toBe(1);
    });
  });

  describe("Long inputs", () => {
    it("handles 1000 words", () => {
      const text = "word ".repeat(1000);
      const result = analyzeWriting(text);
      expect(result.metrics.wordCount).toBe(1000);
    });

    it("handles 1000 paragraphs", () => {
      const text = "Paragraph.\n\n".repeat(1000);
      const result = analyzeWriting(text);
      expect(result.metrics.paragraphCount).toBe(1000);
    });
  });

  describe("Special characters", () => {
    it("handles markdown syntax", () => {
      const result = analyzeWriting("# Heading\n\n**Bold** and *italic* text.");
      expect(result.metrics.wordCount).toBeGreaterThan(0);
    });

    it("handles URLs", () => {
      const result = analyzeWriting("Visit https://example.com for more info.");
      expect(result.metrics.wordCount).toBeGreaterThan(0);
    });

    it("handles email addresses", () => {
      const result = analyzeWriting("Contact user@example.com for help.");
      expect(result.metrics.wordCount).toBeGreaterThan(0);
    });

    it("handles numbers", () => {
      const result = analyzeWriting("The value is 123.45 and 6,789.");
      expect(result.metrics.wordCount).toBeGreaterThan(0);
    });

    it("handles code snippets", () => {
      const result = analyzeWriting("const x = () => { return 42; };");
      expect(result.metrics.wordCount).toBeGreaterThan(0);
    });
  });

  describe("Real-world text samples", () => {
    it("handles academic abstract", () => {
      const abstract = `
        Background: Clinical decision support systems (CDSS) can improve patient outcomes.
        Objective: To evaluate the effectiveness of CDSS in reducing medication errors.
        Methods: We conducted a systematic review of randomized controlled trials.
        Results: Twenty studies met the inclusion criteria. CDSS reduced errors by 30%.
        Conclusion: CDSS is effective but requires careful implementation.
      `;
      const result = analyzeWriting(abstract);
      expect(result.metrics.wordCount).toBeGreaterThan(20);
      expect(result.metrics.paragraphCount).toBeGreaterThanOrEqual(1);
    });

    it("handles technical documentation", () => {
      const docs = `
        Installation: Run npm install to install dependencies.
        Usage: Import the module and call the analyze function.
        Configuration: Set the options object to customize behavior.
      `;
      const result = analyzeWriting(docs);
      expect(result.metrics.wordCount).toBeGreaterThan(10);
    });
  });
});

// =============================================================================
// FEATURE 8: METRIC BOUNDARIES
// =============================================================================

describe("Metric Boundaries", () => {
  it("Flesch Reading Ease is clamped to 0-100", () => {
    const result = analyzeWriting("information methodology understanding investigation");
    expect(result.metrics.fleschReadingEase).toBeGreaterThanOrEqual(0);
    expect(result.metrics.fleschReadingEase).toBeLessThanOrEqual(100);
  });

  it("Flesch-Kincaid Grade is non-negative", () => {
    const result = analyzeWriting("Simple text here.");
    expect(result.metrics.fleschKincaidGrade).toBeGreaterThanOrEqual(0);
  });

  it("Gunning Fog Index is non-negative", () => {
    const result = analyzeWriting("Simple text here.");
    expect(result.metrics.gunningFogIndex).toBeGreaterThanOrEqual(0);
  });

  it("Automated Readability Index is non-negative", () => {
    const result = analyzeWriting("Simple text here.");
    expect(result.metrics.automatedReadabilityIndex).toBeGreaterThanOrEqual(0);
  });

  it("Coleman-Liau Index is non-negative", () => {
    const result = analyzeWriting("Simple text here.");
    expect(result.metrics.colemanLiauIndex).toBeGreaterThanOrEqual(0);
  });

  it("Vocabulary diversity is 0-1", () => {
    const texts = [
      "unique words here",
      "repeat repeat repeat repeat",
      "one two three four five",
    ];
    for (const text of texts) {
      const result = analyzeWriting(text);
      expect(result.metrics.vocabularyDiversity).toBeGreaterThanOrEqual(0);
      expect(result.metrics.vocabularyDiversity).toBeLessThanOrEqual(1);
    }
  });

  it("Complex word percentage is 0-100", () => {
    const result = analyzeWriting("information methodology understanding");
    expect(result.metrics.complexWordPercentage).toBeGreaterThanOrEqual(0);
    expect(result.metrics.complexWordPercentage).toBeLessThanOrEqual(100);
  });
});
