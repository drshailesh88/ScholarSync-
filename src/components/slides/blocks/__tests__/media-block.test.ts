import { describe, it, expect } from "vitest";
import { detectMediaType } from "../media-block";
import { BLOCK_REGISTRY, createDefaultBlock } from "../index";

// ---------------------------------------------------------------------------
// Media Block Tests
// ---------------------------------------------------------------------------

describe("media-block", () => {
  // -----------------------------------------------------------------------
  // detectMediaType — URL-based auto-detection
  // -----------------------------------------------------------------------
  describe("detectMediaType", () => {
    it("detects .mp4 as video", () => {
      expect(detectMediaType("https://example.com/clip.mp4")).toBe("video");
    });

    it("detects .webm as video", () => {
      expect(detectMediaType("https://example.com/clip.webm")).toBe("video");
    });

    it("detects .mov as video", () => {
      expect(detectMediaType("https://example.com/clip.mov")).toBe("video");
    });

    it("detects .mp3 as audio", () => {
      expect(detectMediaType("https://example.com/track.mp3")).toBe("audio");
    });

    it("detects .wav as audio", () => {
      expect(detectMediaType("https://example.com/track.wav")).toBe("audio");
    });

    it("detects .ogg as audio", () => {
      expect(detectMediaType("https://example.com/track.ogg")).toBe("audio");
    });

    it("detects youtube.com as video_embed", () => {
      expect(detectMediaType("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("video_embed");
    });

    it("detects youtu.be as video_embed", () => {
      expect(detectMediaType("https://youtu.be/dQw4w9WgXcQ")).toBe("video_embed");
    });

    it("detects vimeo.com as video_embed", () => {
      expect(detectMediaType("https://vimeo.com/123456789")).toBe("video_embed");
    });

    it("returns null for unrecognized URLs", () => {
      expect(detectMediaType("https://example.com/page")).toBeNull();
    });

    it("returns null for invalid URLs", () => {
      expect(detectMediaType("not a url")).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // Block registry integration
  // -----------------------------------------------------------------------
  describe("block registry", () => {
    it("includes media type in BLOCK_REGISTRY", () => {
      expect(BLOCK_REGISTRY.media).toBeDefined();
    });

    it("has correct label and icon", () => {
      expect(BLOCK_REGISTRY.media.label).toBe("Media");
      expect(BLOCK_REGISTRY.media.iconName).toBe("PlayCircle");
    });

    it("has media category", () => {
      expect(BLOCK_REGISTRY.media.category).toBe("media");
    });

    it("defaultData returns correct structure", () => {
      const data = BLOCK_REGISTRY.media.defaultData();
      expect(data).toEqual({
        mediaType: "video",
        source: "url",
        url: "",
        autoplay: false,
        loop: false,
        muted: false,
      });
    });

    it("createDefaultBlock produces a valid media block", () => {
      const block = createDefaultBlock("media");
      expect(block.type).toBe("media");
      expect(block.data).toHaveProperty("mediaType", "video");
      expect(block.data).toHaveProperty("source", "url");
      expect(block.data).toHaveProperty("autoplay", false);
      expect(block.data).toHaveProperty("loop", false);
      expect(block.data).toHaveProperty("muted", false);
    });
  });
});
