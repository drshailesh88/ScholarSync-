/**
 * Tests for social export formats and export utilities
 *
 * Tests format definitions and export functions for social media platforms
 */

import { describe, it, expect } from "vitest";
import { SOCIAL_FORMATS, type SocialFormatKey } from "../social-formats";
import { generateTwitterThread } from "../social-export";
import type { SlideData } from "../social-export";
import type { SocialFormatConfig } from "../social-formats";
import type { ContentBlock } from "@/types/presentation";

describe("SOCIAL_FORMATS", () => {
  it("has all expected format keys", () => {
    const keys = Object.keys(SOCIAL_FORMATS) as SocialFormatKey[];
    expect(keys).toContain("linkedin_carousel");
    expect(keys).toContain("twitter_thread");
    expect(keys).toContain("twitter_images");
    expect(keys).toContain("instagram_story");
    expect(keys).toContain("instagram_carousel");
  });

  it("has 5 formats total", () => {
    const keys = Object.keys(SOCIAL_FORMATS);
    expect(keys).toHaveLength(5);
  });

  describe("each format", () => {
    const formats = Object.entries(SOCIAL_FORMATS) as [SocialFormatKey, typeof SOCIAL_FORMATS[SocialFormatKey]][];

    formats.forEach(([key, format]) => {
      describe(`${key}`, () => {
        it("has required name and description", () => {
          expect(format.name).toBeTruthy();
          expect(typeof format.name).toBe("string");
          expect(format.description).toBeTruthy();
          expect(typeof format.description).toBe("string");
        });

        it("has valid icon", () => {
          expect(format.icon).toBeTruthy();
          expect(typeof format.icon).toBe("string");
        });

        it("has valid fileFormat", () => {
          expect(["pdf", "png", "text"]).toContain(format.fileFormat);
        });
      });
    });
  });

  describe("linkedin_carousel", () => {
    const format = SOCIAL_FORMATS.linkedin_carousel;

    it("has square aspect ratio", () => {
      expect(format.aspectRatio).toBe("1:1");
    });

    it("has correct dimensions", () => {
      expect(format.width).toBe(1080);
      expect(format.height).toBe(1080);
    });

    it("has maxSlides limit", () => {
      expect(format.maxSlides).toBe(20);
    });

    it("uses PDF file format", () => {
      expect(format.fileFormat).toBe("pdf");
    });
  });

  describe("twitter_images", () => {
    const format = SOCIAL_FORMATS.twitter_images;

    it("has 16:9 aspect ratio", () => {
      expect(format.aspectRatio).toBe("16:9");
    });

    it("has correct dimensions for 16:9", () => {
      expect(format.width).toBe(1200);
      expect(format.height).toBe(675);
    });

    it("has maxSlides limit", () => {
      expect(format.maxSlides).toBe(4);
    });
  });

  describe("instagram_story", () => {
    const format = SOCIAL_FORMATS.instagram_story;

    it("has 9:16 aspect ratio", () => {
      expect(format.aspectRatio).toBe("9:16");
    });

    it("has vertical dimensions", () => {
      expect(format.width).toBe(1080);
      expect(format.height).toBe(1920);
    });
  });

  describe("instagram_carousel", () => {
    const format = SOCIAL_FORMATS.instagram_carousel;

    it("has square aspect ratio", () => {
      expect(format.aspectRatio).toBe("1:1");
    });

    it("has maxSlides limit", () => {
      expect(format.maxSlides).toBe(10);
    });
  });

  describe("twitter_thread", () => {
    const format = SOCIAL_FORMATS.twitter_thread;

    it("has maxChars for tweets", () => {
      expect(format.maxChars).toBe(280);
    });

    it("uses text file format", () => {
      expect(format.fileFormat).toBe("text");
    });

    it("does not have dimensions (text-only)", () => {
      expect((format as SocialFormatConfig).width).toBeUndefined();
      expect((format as SocialFormatConfig).height).toBeUndefined();
    });
  });
});

describe("generateTwitterThread", () => {
  const createSlide = (title?: string, blocks?: ContentBlock[]): SlideData => ({
    title,
    subtitle: null,
    contentBlocks: blocks ?? [],
  });

  it("extracts title as tweet", () => {
    const slides = [createSlide("Tweet Title")];
    const result = generateTwitterThread(slides);
    expect(result).toHaveLength(1);
    expect(result[0]).toContain("Tweet Title");
  });

  it("extracts text block content", () => {
    const slides = [createSlide(undefined, [{ type: "text", data: { text: "Hello world" } } as ContentBlock])];
    const result = generateTwitterThread(slides);
    expect(result[0]).toContain("Hello world");
  });

  it("extracts bullet items with bullet points", () => {
    const slides = [createSlide(undefined, [{ type: "bullets", data: { items: ["Item 1", "Item 2"] } } as ContentBlock])];
    const result = generateTwitterThread(slides);
    expect(result[0]).toContain("\u2022 Item 1");
    expect(result[0]).toContain("\u2022 Item 2");
  });

  it("extracts stat_result with p-value", () => {
    const slides = [createSlide(undefined, [{ type: "stat_result", data: { label: "HR", value: "0.74", pValue: "0.001" } } as ContentBlock])];
    const result = generateTwitterThread(slides);
    expect(result[0]).toContain("HR: 0.74 (p=0.001)");
  });

  it("extracts quote with attribution", () => {
    const slides = [createSlide(undefined, [{ type: "quote", data: { text: "Be brave", attribution: "Unknown" } } as ContentBlock])];
    const result = generateTwitterThread(slides);
    expect(result[0]).toContain('"Be brave" \u2014 Unknown');
  });

  it("extracts callout title and text", () => {
    const slides = [createSlide(undefined, [{ type: "callout", data: { title: "Key Point", text: "Remember this", type: "info" } } as ContentBlock])];
    const result = generateTwitterThread(slides);
    expect(result[0]).toContain("Key Point");
    expect(result[0]).toContain("Remember this");
  });

  it("adds thread indicator for multi-slide threads", () => {
    const slides = [
      createSlide("Slide 1"),
      createSlide("Slide 2"),
      createSlide("Slide 3"),
    ];
    const result = generateTwitterThread(slides);
    expect(result[0]).toMatch(/^\d\/3\s/);
    expect(result[1]).toMatch(/^2\/3\s/);
    expect(result[2]).toMatch(/^3\/3\s/);
  });

  it("does not add thread indicator for single slide", () => {
    const slides = [createSlide("Single")];
    const result = generateTwitterThread(slides);
    expect(result[0]).not.toMatch(/^\d\/1\s/);
  });

  it("truncates long tweets to fit maxChars", () => {
    const longText = "a".repeat(300);
    const slides = [createSlide(undefined, [{ type: "text", data: { text: longText } }])];
    const result = generateTwitterThread(slides);
    expect(result[0].length).toBeLessThanOrEqual(280);
    expect(result[0]).toContain("...");
  });

  it("handles empty slides", () => {
    const slides = [createSlide()];
    const result = generateTwitterThread(slides);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe("");
  });

  it("combines title and content blocks", () => {
    const slides = [
      createSlide("Title", [
        { type: "text", data: { text: "Content" } },
      ]),
    ];
    const result = generateTwitterThread(slides);
    expect(result[0]).toContain("Title");
    expect(result[0]).toContain("Content");
  });

  it("handles slides with only title (no content)", () => {
    const slides = [createSlide("Just a title")];
    const result = generateTwitterThread(slides);
    expect(result[0]).toBe("Just a title");
  });
});
