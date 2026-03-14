import { describe, expect, it, vi } from "vitest";

const createClient = vi.fn(() => ({ client: true }));
const createRoomContext = vi.fn(() => ({ RoomProvider: "RP", useRoom: "UR" }));

vi.mock("@liveblocks/client", () => ({ createClient, LiveMap: class {}, LiveObject: class {} }));
vi.mock("@liveblocks/react", () => ({ createRoomContext }));
vi.mock("@/stores/systematic-review-store", () => ({}));

describe("liveblocks config", () => {
  it("creates client + room context for presentation and SR", async () => {
    const mod = await import("../config");
    const sr = await import("../sr-config");
    expect(createClient).toHaveBeenCalledWith({ authEndpoint: "/api/liveblocks-auth" });
    expect(createRoomContext).toHaveBeenCalledTimes(2);
    expect(mod.RoomProvider).toBe("RP");
    expect(sr.SRRoomProvider).toBe("RP");
  }, 15000);
});
