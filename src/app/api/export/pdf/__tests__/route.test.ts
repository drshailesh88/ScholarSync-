import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());
const mockPdfCreate = vi.hoisted(() => vi.fn());
const mockEmbedFont = vi.hoisted(() => vi.fn());
const mockAddPage = vi.hoisted(() => vi.fn());
const mockSave = vi.hoisted(() => vi.fn());
const mockDrawText = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
  RATE_LIMITS: {
    export: { limit: 30, windowSeconds: 3600 },
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: vi.fn().mockReturnValue({
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
    }),
  },
}));

vi.mock("pdf-lib", () => ({
  PDFDocument: {
    create: mockPdfCreate,
  },
  StandardFonts: {
    TimesRoman: "TimesRoman",
    TimesRomanBold: "TimesRomanBold",
    TimesRomanBoldItalic: "TimesRomanBoldItalic",
  },
  rgb: vi.fn(() => ({ r: 0, g: 0, b: 0 })),
  PageSizes: {
    Letter: [612, 792],
  },
}));

import { POST } from "../route";

function makeFont() {
  return {
    widthOfTextAtSize: vi.fn((text: string) => text.length * 6),
  };
}

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/export/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/export/pdf", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const page = {
      drawText: mockDrawText,
    };

    mockAddPage.mockReturnValue(page);
    mockEmbedFont.mockResolvedValue(makeFont());
    mockSave.mockResolvedValue(new Uint8Array([37, 80, 68, 70]));
    mockPdfCreate.mockResolvedValue({
      embedFont: mockEmbedFont,
      addPage: mockAddPage,
      save: mockSave,
    });

    mockGetCurrentUserId.mockResolvedValue("dev_user_001");
    mockCheckRateLimit.mockResolvedValue(null);
  });

  it("returns 401 when unauthenticated", async () => {
    mockGetCurrentUserId.mockRejectedValueOnce(new Error("no session"));

    const res = await POST(
      makeRequest({
        title: "Spec 33",
        content: "<p>Hello export</p>",
      })
    );

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({
      error: "Authentication required",
    });
  });

  it("returns 400 when content is empty", async () => {
    const res = await POST(
      makeRequest({
        title: "Spec 33",
        content: "",
      })
    );

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Content is required",
    });
  });

  it("rejects deprecated preview field because the schema matches DOCX", async () => {
    const res = await POST(
      makeRequest({
        title: "Spec 33",
        content: "<p>Hello export</p>",
        preview: true,
      })
    );

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Invalid request data",
    });
  });

  it("returns a binary PDF attachment for valid input", async () => {
    const res = await POST(
      makeRequest({
        title: "Spec 33 PDF",
        content: "<h2>Intro</h2><p>Hello export</p>",
        citations: ["Ref 1"],
      })
    );

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/pdf");
    expect(res.headers.get("content-disposition")).toBe(
      'attachment; filename="Spec_33_PDF.pdf"'
    );

    const body = new Uint8Array(await res.arrayBuffer());
    expect(body).toEqual(new Uint8Array([37, 80, 68, 70]));
    expect(mockPdfCreate).toHaveBeenCalledTimes(1);
    expect(mockEmbedFont).toHaveBeenCalledTimes(3);
  });

  it("returns 500 when PDF generation throws unexpectedly", async () => {
    mockPdfCreate.mockRejectedValueOnce(new Error("boom"));

    const res = await POST(
      makeRequest({
        title: "Spec 33 Failure",
        content: "<p>Hello export</p>",
      })
    );

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Export failed",
    });
  });
});
