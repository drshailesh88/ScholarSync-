import { describe, it, expect } from "vitest";
import { countWords } from "../word-counter";

describe("countWords", () => {
  it("counts words in a simple sentence", () => {
    expect(countWords("The quick brown fox")).toBe(4);
  });

  it("handles multiple spaces", () => {
    expect(countWords("word1   word2   word3")).toBe(3);
  });

  it("handles empty string", () => {
    expect(countWords("")).toBe(0);
  });

  it("handles whitespace only", () => {
    expect(countWords("   ")).toBe(0);
  });

  it("handles tabs and newlines", () => {
    expect(countWords("word1\tword2\nword3")).toBe(3);
  });

  it("handles single word", () => {
    expect(countWords("hello")).toBe(1);
  });

  it("handles leading/trailing whitespace", () => {
    expect(countWords("  hello world  ")).toBe(2);
  });
});
