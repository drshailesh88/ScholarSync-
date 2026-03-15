import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

let prevCwd = process.cwd();
let tempDir = "";

async function fresh() {
  vi.resetModules();
  return import("../r2");
}

describe("storage/r2 local fallback", () => {
  beforeEach(async () => {
    tempDir = await mkdtemp(path.join(tmpdir(), "storage-test-"));
    prevCwd = process.cwd();
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(prevCwd);
    await rm(tempDir, { recursive: true, force: true });
  });

  it("uploads/downloads/deletes PDFs locally", async () => {
    const mod = await fresh();
    const key = await mod.uploadPdf(7, Buffer.from("pdf"));
    expect(key).toBe("papers/7.pdf");
    await expect(mod.pdfExists(7)).resolves.toBe(true);
    await expect(mod.downloadPdf(7)).resolves.toEqual(Buffer.from("pdf"));
    await mod.deletePdf(7);
    await expect(mod.downloadPdf(7)).resolves.toBeNull();
  });

  it("handles recording and audio overview paths", async () => {
    const mod = await fresh();
    const recKey = await mod.uploadRecording("deck1", "rec1", Buffer.from("video"));
    expect(recKey).toBe("recordings/deck1/rec1.webm");
    await expect(mod.downloadRecording(recKey)).resolves.toEqual(Buffer.from("video"));

    const audioKey = await mod.uploadAudioOverview(3, "a1", Buffer.from("mp3"), "wav");
    expect(audioKey).toBe("audio-overviews/3/a1.wav");
    await expect(mod.downloadAudioOverview(audioKey)).resolves.toEqual(Buffer.from("mp3"));
  });

  it("sanitizes LaTeX image filename and lists project images", async () => {
    const mod = await fresh();
    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("uuid-1");
    const result = await mod.uploadLatexImage("p1", "my fig?.png", Buffer.from("img"), "image/png");
    expect(result.storageKey).toContain("my_fig_.png");

    const listed = await mod.listLatexImages("p1");
    expect(listed).toHaveLength(1);
    expect(listed[0].contentType).toBe("image/png");
  });

  it("returns null for signed PDF url", async () => {
    const mod = await fresh();
    await expect(mod.getSignedPdfUrl(1)).resolves.toBeNull();
  });
});
