import { describe, it, expect, vi, afterEach } from "vitest";

const generateText = vi.fn();
vi.mock("ai", () => ({ generateText: (args: unknown) => generateText(args) }));
vi.mock("@/lib/ai/models", () => ({ getSmallModel: () => ({ __id: "small" }) }));

import { parseStudyNotes, summarizeTranscript } from "../study-notes";

const RICH = JSON.stringify({
  tldr: "It teaches CRISPR gene editing.",
  chapters: [{ title: "Intro", summary: "What CRISPR is.", timestamp: 0 }],
  concepts: [{ term: "Cas9", definition: "An enzyme that cuts DNA.", timestamp: 42 }],
  quotes: [{ quote: "CRISPR is a pair of molecular scissors.", timestamp: 88 }],
});

describe("parseStudyNotes", () => {
  it("parses rich timestamped notes from a bare JSON object", () => {
    const n = parseStudyNotes(RICH)!;
    expect(n.tldr).toBe("It teaches CRISPR gene editing.");
    expect(n.chapters[0]).toEqual({ title: "Intro", summary: "What CRISPR is.", timestamp: 0 });
    expect(n.concepts[0].term).toBe("Cas9");
    expect(n.concepts[0].timestamp).toBe(42);
    expect(n.quotes[0].timestamp).toBe(88);
  });

  it("parses JSON wrapped in a markdown fence", () => {
    const n = parseStudyNotes('```json\n{"tldr":"X.","chapters":[],"concepts":[],"quotes":[]}\n```')!;
    expect(n.tldr).toBe("X.");
  });

  it("extracts the outermost object from surrounding prose", () => {
    const n = parseStudyNotes('Here you go: {"tldr":"Y."} hope that helps')!;
    expect(n.tldr).toBe("Y.");
  });

  it("coerces a bad/missing timestamp to 0 and drops items missing their key field", () => {
    const n = parseStudyNotes(
      '{"tldr":"Z.","concepts":[{"term":"ok","definition":"d","timestamp":"nope"},{"definition":"no term"}]}'
    )!;
    expect(n.concepts).toHaveLength(1);
    expect(n.concepts[0].timestamp).toBe(0);
  });

  it("returns null without a tldr, or on non-JSON", () => {
    expect(parseStudyNotes('{"chapters":[]}')).toBeNull();
    expect(parseStudyNotes("not json")).toBeNull();
  });
});

describe("summarizeTranscript", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    generateText.mockClear();
  });

  it("distills a timestamped transcript into rich notes", async () => {
    generateText.mockResolvedValue({ text: RICH });
    const notes = await summarizeTranscript({
      text: "long transcript...",
      segments: [{ text: "hi", offset: 0, duration: 1000 }],
      lang: "en",
      availableLangs: ["en"],
    });
    expect(notes?.tldr).toBe("It teaches CRISPR gene editing.");
    expect(notes?.concepts[0].term).toBe("Cas9");
  });

  it("feeds the model a [seconds]-marked transcript so items can anchor to moments", async () => {
    generateText.mockResolvedValue({ text: RICH });
    await summarizeTranscript({
      text: "fallback",
      segments: [{ text: "welcome", offset: 5000, duration: 2000 }],
      lang: "en",
      availableLangs: ["en"],
    });
    const arg = generateText.mock.calls[0][0] as { prompt: string };
    expect(arg.prompt).toContain("[5] welcome");
  });

  it("returns null when the model output is unparseable", async () => {
    generateText.mockResolvedValue({ text: "sorry, I cannot do that" });
    expect(
      await summarizeTranscript({ text: "x", segments: [], lang: "en", availableLangs: [] })
    ).toBeNull();
  });
});
