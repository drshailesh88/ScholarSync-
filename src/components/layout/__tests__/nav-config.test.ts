// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { getVisibleNavSections } from "../nav-config";

const hrefs = (sections: ReturnType<typeof getVisibleNavSections>) =>
  sections.flatMap((s) => s.items.map((i) => i.href));

describe("getVisibleNavSections", () => {
  it("exposes only the literature search entry in v1 search-only mode", () => {
    const sections = getVisibleNavSections({ searchOnly: true });
    const links = hrefs(sections);

    expect(links).toEqual(["/research"]);
    expect(sections.flatMap((s) => s.items.map((i) => i.label))).toEqual(["Search"]);
  });

  it("hides every v2 capability from v1 navigation", () => {
    const links = hrefs(getVisibleNavSections({ searchOnly: true }));
    for (const hidden of [
      "/studio",
      "/latex",
      "/illustrate",
      "/poster",
      "/presentation",
      "/notebook",
      "/feeds",
      "/deep-research",
      "/library",
      "/systematic-review",
      "/compliance",
    ]) {
      expect(links).not.toContain(hidden);
    }
  });

  it("restores the full v2 surface when search-only mode is off", () => {
    const links = hrefs(getVisibleNavSections({ searchOnly: false }));
    expect(links).toContain("/studio");
    expect(links).toContain("/explore");
    expect(links).toContain("/compliance");
  });

  it("gates the systematic-review item by domain in full mode", () => {
    const withReview = hrefs(
      getVisibleNavSections({ searchOnly: false, systematicReviewEnabled: true })
    );
    const withoutReview = hrefs(
      getVisibleNavSections({ searchOnly: false, systematicReviewEnabled: false })
    );

    expect(withReview).toContain("/systematic-review");
    expect(withoutReview).not.toContain("/systematic-review");
  });
});
