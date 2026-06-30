import { describe, it, expect, vi, afterEach } from "vitest";

const generateText = vi.fn();
vi.mock("ai", () => ({ generateText: (args: unknown) => generateText(args) }));
vi.mock("@/lib/ai/models", () => ({ getSmallModel: () => ({ __id: "small" }) }));

import { parseStudyNotes, summarizeTranscript } from "../study-notes";

describe("parseStudyNotes", () => {
  it("parses a bare JSON object", () => {
    const n = parseStudyNotes('{"summary":"It teaches CRISPR.","keyPoints":["Cas9 cuts DNA"],"topics":["CRISPR"]}')!;
    expect(n.summary).toBe("It teaches CRISPR.");
    expect(n.keyPoints).toEqual(["Cas9 cuts DNA"]);
    expect(n.topics).toEqual(["CRISPR"]);
  });

  it("parses JSON wrapped in a markdown fence", () => {
    const n = parseStudyNotes('```json\n{"summary":"X.","keyPoints":[],"topics":[]}\n```')!;
    expect(n.summary).toBe("X.");
  });

  it("extracts the outermost object from surrounding prose", () => {
    const n = parseStudyNotes('Here you go: {"summary":"Y."} hope that helps')!;
    expect(n.summary).toBe("Y.");
  });

  it("filters non-string array items and returns null without a summary", () => {
    const n = parseStudyNotes('{"summary":"Z.","keyPoints":["ok",2,null,"good"]}')!;
    expect(n.keyPoints).toEqual(["ok", "good"]);
    expect(parseStudyNotes('{"keyPoints":["a"]}')).toBeNull();
    expect(parseStudyNotes("not json")).toBeNull();
  });
});

describe("summarizeTranscript", () => {
  afterEach(() => vi.restoreAllMocks());

  it("summarizes a transcript into study notes", async () => {
    generateText.mockResolvedValue({
      text: '{"summary":"A lecture on diabetes.","keyPoints":["Insulin resistance"],"topics":["T2DM"]}',
    });
    const notes = await summarizeTranscript({ text: "long transcript...", lang: "en", availableLangs: ["en"] });
    expect(notes?.summary).toBe("A lecture on diabetes.");
    expect(notes?.keyPoints).toEqual(["Insulin resistance"]);
  });

  it("returns null when the model output is unparseable", async () => {
    generateText.mockResolvedValue({ text: "sorry, I cannot do that" });
    expect(await summarizeTranscript({ text: "x", lang: "en", availableLangs: [] })).toBeNull();
  });
});
