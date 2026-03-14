import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockGetCurrentUser = vi.hoisted(() => vi.fn());
const mockAuthorize = vi.hoisted(() => vi.fn());
const mockAllow = vi.hoisted(() => vi.fn());
const mockPrepareSession = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
  getCurrentUser: mockGetCurrentUser,
}));

vi.mock("@liveblocks/node", () => ({
  Liveblocks: class {
    prepareSession = mockPrepareSession;
  },
}));

import { POST } from "../route";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/liveblocks-auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/liveblocks-auth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.LIVEBLOCKS_SECRET_KEY = "liveblocks_secret";

    mockGetCurrentUserId.mockResolvedValue("user_123");
    mockGetCurrentUser.mockResolvedValue({
      firstName: "Ada",
      lastName: "Lovelace",
      imageUrl: "https://avatar",
    });

    mockAuthorize.mockResolvedValue({ status: 200, body: "authorized-token" });
    mockPrepareSession.mockReturnValue({
      FULL_ACCESS: "full",
      allow: mockAllow,
      authorize: mockAuthorize,
    });
  });

  it("returns authorized liveblocks token for valid request", async () => {
    const res = await POST(makeRequest({ room: "presentation:deck_1" }));

    expect(res.status).toBe(200);
    await expect(res.text()).resolves.toBe("authorized-token");
    expect(mockGetCurrentUserId).toHaveBeenCalledOnce();
    expect(mockAllow).toHaveBeenCalledWith("presentation:deck_1", "full");
  });

  it("returns 401 when user is not authenticated", async () => {
    mockGetCurrentUserId.mockRejectedValue(new Error("Not authenticated"));

    const res = await POST(makeRequest({ room: "presentation:deck_1" }));

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: "Unauthorized" });
  });

  it("still authorizes when room is missing (current behavior)", async () => {
    const res = await POST(makeRequest({}));

    expect(res.status).toBe(200);
    expect(mockAllow).toHaveBeenCalledWith(undefined, "full");
  });

  it("returns 500 when user profile lookup fails", async () => {
    mockGetCurrentUser.mockRejectedValue(new Error("clerk down"));

    const res = await POST(makeRequest({ room: "presentation:deck_1" }));

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Auth service error" });
  });
});
