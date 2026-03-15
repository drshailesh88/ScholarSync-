import { beforeEach, describe, expect, it, vi } from "vitest";
import { OpenAITTSProvider, synthesizeLongText } from "../openai-tts";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

describe("OpenAI TTS", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENAI_API_KEY = "key";
  });

  it("synthesizes audio with clamped speed and defaults", async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, arrayBuffer: async () => new Uint8Array([1, 2]).buffer });
    const provider = new OpenAITTSProvider();
    const result = await provider.synthesize("hello", { speed: 99, format: "wav" });
    expect(result.mimeType).toBe("audio/wav");
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.speed).toBe(4);
  });

  it("throws when API key missing or api fails", async () => {
    delete process.env.OPENAI_API_KEY;
    const provider = new OpenAITTSProvider();
    await expect(provider.synthesize("x")).rejects.toThrow("OPENAI_API_KEY");

    process.env.OPENAI_API_KEY = "key";
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500, text: async () => "oops" });
    await expect(provider.synthesize("x")).rejects.toThrow("OpenAI TTS failed (500): oops");
  });

  it("chunk-synthesizes long mp3 text and concatenates", async () => {
    const provider = {
      maxCharacters: 12,
      name: "x",
      synthesize: vi.fn(async (chunk: string) => ({
        audioBuffer: Buffer.from(chunk[0] || "x"),
        mimeType: "audio/mpeg",
        extension: "mp3",
        estimatedDurationSeconds: 1,
      })),
    };
    const result = await synthesizeLongText(provider, "sentence one. sentence two.");
    expect(result.audioBuffer.length).toBeGreaterThan(1);

    const provider2 = { ...provider, synthesize: vi.fn(provider.synthesize) };
    await expect(synthesizeLongText(provider2, "very long text here", { format: "wav" })).rejects.toThrow("mp3");
  });
});
