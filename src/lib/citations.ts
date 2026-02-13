/**
 * Citation formatting utility using citation-js.
 *
 * Converts paper metadata into formatted citation strings (APA, MLA, Chicago,
 * Vancouver, Harvard), in-text citations, and BibTeX entries.
 *
 * This is a plain server-side utility module -- no "use server" directive.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { Cite, plugins } = require("@citation-js/core");
require("@citation-js/plugin-csl");
require("@citation-js/plugin-bibtex");
/* eslint-enable @typescript-eslint/no-require-imports */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PaperData {
  title: string;
  authors: string[];
  journal?: string;
  year?: number;
  doi?: string;
  volume?: string;
  issue?: string;
  pages?: string;
}

export type CitationStyle =
  | "apa"
  | "mla"
  | "chicago"
  | "vancouver"
  | "harvard";

// ---------------------------------------------------------------------------
// CSL style template definitions (MLA 9th & Chicago 17th author-date)
//
// The built-in @citation-js/plugin-csl ships only apa, vancouver, and
// harvard1.  MLA and Chicago are registered once using the official CSL XML
// from the citation-style-language project (embedded as string literals so we
// don't need runtime network access).
// ---------------------------------------------------------------------------

/**
 * Minimal MLA 9th-edition CSL (covers the fields we expose).
 *
 * Source reference: https://github.com/citation-style-language/styles
 * Template: modern-language-association (MLA 9th edition)
 */
const MLA_CSL = `<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0"
       demote-non-dropping-particle="never" page-range-format="minimal">
  <info>
    <title>Modern Language Association 9th edition</title>
    <id>http://www.zotero.org/styles/modern-language-association</id>
    <updated>2024-01-01T00:00:00+00:00</updated>
  </info>
  <locale xml:lang="en">
    <terms>
      <term name="et-al">et al.</term>
    </terms>
  </locale>
  <macro name="author">
    <names variable="author">
      <name name-as-sort-order="first" and="text" delimiter=", " delimiter-precedes-last="always"/>
      <label form="short" prefix=", "/>
      <substitute><names variable="editor"/><text variable="title" font-style="italic"/></substitute>
    </names>
  </macro>
  <macro name="author-short">
    <names variable="author">
      <name form="short" and="text" delimiter=", "/>
      <substitute><names variable="editor" form="short"/><text variable="title" form="short" font-style="italic"/></substitute>
    </names>
  </macro>
  <macro name="title">
    <choose>
      <if type="article-journal chapter paper-conference" match="any">
        <text variable="title" quotes="true"/>
      </if>
      <else>
        <text variable="title" font-style="italic"/>
      </else>
    </choose>
  </macro>
  <macro name="container">
    <text variable="container-title" font-style="italic"/>
  </macro>
  <macro name="date">
    <date variable="issued"><date-part name="year"/></date>
  </macro>
  <macro name="locators">
    <group delimiter=", ">
      <group>
        <text term="volume" form="short" suffix=" "/>
        <text variable="volume"/>
      </group>
      <group>
        <text term="issue" form="short" suffix=" "/>
        <text variable="issue"/>
      </group>
    </group>
  </macro>
  <macro name="pages">
    <group>
      <label variable="page" form="short" suffix=" "/>
      <text variable="page"/>
    </group>
  </macro>
  <macro name="access">
    <text variable="DOI" prefix="https://doi.org/"/>
  </macro>
  <citation et-al-min="3" et-al-use-first="1" disambiguate-add-names="true">
    <layout prefix="(" suffix=")" delimiter="; ">
      <group delimiter=" ">
        <text macro="author-short"/>
        <text macro="date"/>
      </group>
    </layout>
  </citation>
  <bibliography hanging-indent="true" entry-spacing="0" line-spacing="2">
    <sort>
      <key macro="author"/>
      <key macro="date" sort="descending"/>
    </sort>
    <layout suffix=".">
      <group delimiter=". ">
        <text macro="author"/>
        <text macro="title"/>
        <group delimiter=", ">
          <text macro="container"/>
          <text macro="locators"/>
          <text macro="date"/>
          <text macro="pages"/>
          <text macro="access"/>
        </group>
      </group>
    </layout>
  </bibliography>
</style>`;

/**
 * Minimal Chicago 17th-edition (author-date) CSL.
 *
 * Source reference: https://github.com/citation-style-language/styles
 * Template: chicago-author-date (17th edition)
 */
const CHICAGO_CSL = `<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0"
       demote-non-dropping-particle="sort-only" page-range-format="chicago">
  <info>
    <title>Chicago Manual of Style 17th edition (author-date)</title>
    <id>http://www.zotero.org/styles/chicago-author-date</id>
    <updated>2024-01-01T00:00:00+00:00</updated>
  </info>
  <locale xml:lang="en">
    <terms>
      <term name="et-al">et al.</term>
    </terms>
  </locale>
  <macro name="author">
    <names variable="author">
      <name name-as-sort-order="first" and="text" delimiter=", " delimiter-precedes-last="always"/>
      <label form="short" prefix=", "/>
      <substitute><names variable="editor"/><text variable="title"/></substitute>
    </names>
  </macro>
  <macro name="author-short">
    <names variable="author">
      <name form="short" and="text" delimiter=", "/>
      <substitute><names variable="editor" form="short"/><text variable="title" form="short"/></substitute>
    </names>
  </macro>
  <macro name="date">
    <date variable="issued"><date-part name="year"/></date>
  </macro>
  <macro name="title">
    <choose>
      <if type="article-journal chapter paper-conference" match="any">
        <text variable="title" quotes="true"/>
      </if>
      <else>
        <text variable="title" font-style="italic"/>
      </else>
    </choose>
  </macro>
  <macro name="container">
    <text variable="container-title" font-style="italic"/>
  </macro>
  <macro name="locators">
    <group delimiter=" ">
      <text variable="volume"/>
      <text variable="issue" prefix="(" suffix=")"/>
    </group>
  </macro>
  <macro name="pages">
    <text variable="page"/>
  </macro>
  <macro name="access">
    <text variable="DOI" prefix="https://doi.org/"/>
  </macro>
  <citation et-al-min="4" et-al-use-first="1" disambiguate-add-year-suffix="true" disambiguate-add-names="true">
    <sort>
      <key macro="author"/>
      <key macro="date"/>
    </sort>
    <layout prefix="(" suffix=")" delimiter="; ">
      <group delimiter=", ">
        <text macro="author-short"/>
        <text macro="date"/>
      </group>
    </layout>
  </citation>
  <bibliography hanging-indent="true" entry-spacing="0">
    <sort>
      <key macro="author"/>
      <key macro="date" sort="descending"/>
    </sort>
    <layout suffix=".">
      <group delimiter=". ">
        <text macro="author"/>
        <text macro="date"/>
        <text macro="title"/>
      </group>
      <text value=" "/>
      <group delimiter=": ">
        <text macro="container"/>
        <group delimiter=", ">
          <text macro="locators"/>
          <text macro="pages"/>
        </group>
      </group>
      <text macro="access" prefix=". "/>
    </layout>
  </bibliography>
</style>`;

// Register the additional CSL templates once at module load.
const cslConfig = plugins.config.get("@csl");
if (cslConfig?.templates) {
  if (!cslConfig.templates.has("mla")) {
    cslConfig.templates.add("mla", MLA_CSL);
  }
  if (!cslConfig.templates.has("chicago")) {
    cslConfig.templates.add("chicago", CHICAGO_CSL);
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Map our CitationStyle values to the template IDs citation-js understands. */
const STYLE_TO_TEMPLATE: Record<CitationStyle, string> = {
  apa: "apa",
  mla: "mla",
  chicago: "chicago",
  vancouver: "vancouver",
  harvard: "harvard1",
};

/**
 * Parse a single author name string into CSL-JSON name parts.
 *
 * Handles formats like:
 *   - "John Doe"         -> { given: "John", family: "Doe" }
 *   - "Doe, John"        -> { given: "John", family: "Doe" }
 *   - "J. Doe"           -> { given: "J.",   family: "Doe" }
 *   - "Doe"              -> { family: "Doe" }
 *   - "John Michael Doe" -> { given: "John Michael", family: "Doe" }
 */
function parseAuthorName(name: string): { given?: string; family: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { family: "Unknown" };
  }

  // "Family, Given" format
  if (trimmed.includes(",")) {
    const [family, ...rest] = trimmed.split(",").map((s) => s.trim());
    const given = rest.join(" ").trim();
    return given ? { given, family } : { family };
  }

  // "Given ... Family" format (last token is family name)
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { family: parts[0] };
  }
  const family = parts[parts.length - 1];
  const given = parts.slice(0, -1).join(" ");
  return { given, family };
}

/**
 * Convert our PaperData into a CSL-JSON data object that citation-js consumes.
 *
 * Reference: https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html
 */
function paperToCSLJSON(paper: PaperData): Record<string, unknown> {
  const csl: Record<string, unknown> = {
    type: "article-journal",
    title: paper.title || "Untitled",
  };

  // Authors
  if (paper.authors && paper.authors.length > 0) {
    const validAuthors = paper.authors
      .filter((a) => typeof a === "string" && a.trim().length > 0)
      .map(parseAuthorName);
    if (validAuthors.length > 0) {
      csl.author = validAuthors;
    }
  }

  // Journal / container title
  if (paper.journal) {
    csl["container-title"] = paper.journal;
  }

  // Year (issued date)
  if (paper.year != null && !isNaN(paper.year)) {
    csl.issued = { "date-parts": [[paper.year]] };
  }

  // DOI
  if (paper.doi) {
    csl.DOI = paper.doi;
  }

  // Volume, issue, pages
  if (paper.volume) {
    csl.volume = paper.volume;
  }
  if (paper.issue) {
    csl.issue = paper.issue;
  }
  if (paper.pages) {
    csl.page = paper.pages;
  }

  return csl;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Format a full bibliography-style citation for a paper in the given style.
 *
 * @param paper  - Paper metadata to format.
 * @param style  - Citation style identifier.
 * @returns The formatted citation string, trimmed of surrounding whitespace.
 *
 * @example
 * ```ts
 * const cite = formatCitation(
 *   { title: "Attention Is All You Need", authors: ["Ashish Vaswani"], year: 2017 },
 *   "apa",
 * );
 * // => "Vaswani, A. (2017). Attention Is All You Need."
 * ```
 */
export function formatCitation(paper: PaperData, style: CitationStyle): string {
  const template = STYLE_TO_TEMPLATE[style];
  if (!template) {
    throw new Error(
      `Unsupported citation style "${style}". ` +
        `Supported styles: ${Object.keys(STYLE_TO_TEMPLATE).join(", ")}`,
    );
  }

  const cslData = paperToCSLJSON(paper);
  const cite = new Cite([cslData]);

  const result: string = cite.format("bibliography", {
    format: "text",
    template,
    lang: "en-US",
  });

  return result.trim();
}

/**
 * Format an in-text (parenthetical) citation for a paper in the given style.
 *
 * @param paper  - Paper metadata.
 * @param style  - Citation style identifier.
 * @returns The in-text citation string, e.g. "(Doe & Smith, 2024)".
 *
 * @example
 * ```ts
 * formatInTextCitation({ title: "Test", authors: ["John Doe"], year: 2024 }, "apa");
 * // => "(Doe, 2024)"
 * ```
 */
export function formatInTextCitation(
  paper: PaperData,
  style: CitationStyle,
): string {
  const template = STYLE_TO_TEMPLATE[style];
  if (!template) {
    throw new Error(
      `Unsupported citation style "${style}". ` +
        `Supported styles: ${Object.keys(STYLE_TO_TEMPLATE).join(", ")}`,
    );
  }

  const cslData = paperToCSLJSON(paper);
  const cite = new Cite([cslData]);

  const result: string = cite.format("citation", {
    format: "text",
    template,
    lang: "en-US",
  });

  return result.trim();
}

/**
 * Generate a BibTeX entry for a paper.
 *
 * @param paper - Paper metadata.
 * @returns A BibTeX string (e.g. `@article{Doe2024Deep, ... }`).
 *
 * @example
 * ```ts
 * generateBibTeX({ title: "My Paper", authors: ["Jane Doe"], year: 2024 });
 * // => "@article{Doe2024My,\n\tauthor = {Doe, Jane}, ..."
 * ```
 */
export function generateBibTeX(paper: PaperData): string {
  const cslData = paperToCSLJSON(paper);
  const cite = new Cite([cslData]);

  const result: string = cite.format("bibtex");

  return result.trim();
}
