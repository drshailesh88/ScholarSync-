import { describe, it, expect } from "vitest";
import { extractVideoId } from "../VideoTakeaways";

describe("extractVideoId", () => {
  it("extracts the id from a youtube.com/watch?v= URL", () => {
    expect(extractVideoId("https://www.youtube.com/watch?v=47pkFey3CZ0")).toBe("47pkFey3CZ0");
    expect(extractVideoId("https://youtube.com/watch?v=abc123&t=10s")).toBe("abc123");
  });

  it("extracts the id from a youtu.be short URL", () => {
    expect(extractVideoId("https://youtu.be/47pkFey3CZ0")).toBe("47pkFey3CZ0");
  });

  it("returns null for non-YouTube or malformed URLs", () => {
    expect(extractVideoId("https://vimeo.com/12345")).toBeNull();
    expect(extractVideoId("https://www.youtube.com/results?search=x")).toBeNull();
    expect(extractVideoId("not a url")).toBeNull();
    expect(extractVideoId(undefined)).toBeNull();
  });
});
