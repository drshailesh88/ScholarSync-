import { describe, it, expect } from "vitest";
import { toLibraryId, parseLibraryId } from "../types";

describe("toLibraryId", () => {
  it("encodes paper type", () => {
    expect(toLibraryId("paper", 42)).toBe("paper_42");
  });

  it("encodes web type", () => {
    expect(toLibraryId("web", 187)).toBe("web_187");
  });

  it("handles id of 0", () => {
    expect(toLibraryId("paper", 0)).toBe("paper_0");
  });

  it("throws on NaN", () => {
    expect(() => toLibraryId("paper", NaN)).toThrow("Invalid id");
  });

  it("throws on negative id", () => {
    expect(() => toLibraryId("paper", -1)).toThrow("Invalid id");
  });

  it("throws on non-integer id", () => {
    expect(() => toLibraryId("web", 1.5)).toThrow("Invalid id");
  });

  it("throws on Infinity", () => {
    expect(() => toLibraryId("paper", Infinity)).toThrow("Invalid id");
  });
});

describe("parseLibraryId", () => {
  it("decodes paper_42", () => {
    expect(parseLibraryId("paper_42")).toEqual({ type: "paper", id: 42 });
  });

  it("decodes web_187", () => {
    expect(parseLibraryId("web_187")).toEqual({ type: "web", id: 187 });
  });

  it("throws on invalid format", () => {
    expect(() => parseLibraryId("invalid_42")).toThrow("Invalid libraryId format");
  });

  it("throws on missing number", () => {
    expect(() => parseLibraryId("paper_")).toThrow("Invalid libraryId format");
  });

  it("throws on empty string", () => {
    expect(() => parseLibraryId("")).toThrow("Invalid libraryId format");
  });

  it("throws on wrong separator", () => {
    expect(() => parseLibraryId("paper-42")).toThrow("Invalid libraryId format");
  });

  it("roundtrips with toLibraryId", () => {
    const id = toLibraryId("web", 999);
    const parsed = parseLibraryId(id);
    expect(parsed).toEqual({ type: "web", id: 999 });
  });
});
