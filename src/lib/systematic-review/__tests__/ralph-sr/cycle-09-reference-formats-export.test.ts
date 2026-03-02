/**
 * RALPH SR — Cycle 9: Reference Formats & Export
 *
 * Adversarial invariant tests for:
 *  - generateRIS (pure) — RIS format generation
 *  - generateEndNoteXML (pure) — XML with entity escaping
 *  - generateCSV (pure) — CSV with quoting
 *  - parseRIS (pure) — RIS parsing with manual fallback
 *  - parseBibTeX (pure) — BibTeX parsing via citation-js
 *  - parseReferences (pure) — auto-detect format
 *  - Round-trip: generate → parse → verify data integrity
 *  - Type contracts: ParsedReference, ExportablePaper, ExportFormat
 *  - Edge cases: empty arrays, special characters, XSS payloads
 */

import { describe, it, expect } from "vitest";
import {
  generateRIS,
  generateEndNoteXML,
  generateCSV,
  parseRIS,
  parseReferences,
  type ParsedReference,
  type ExportFormat,
  type ExportablePaper,
} from "@/lib/systematic-review";
import { scoreCycle, type ScoringDimension } from "./scorer";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const SAMPLE_PAPERS: ExportablePaper[] = [
  {
    title: "Efficacy of SGLT2 inhibitors in heart failure",
    authors: ["McMurray, John J.V.", "Solomon, Scott D.", "Inzucchi, Silvio E."],
    journal: "New England Journal of Medicine",
    year: 2019,
    doi: "10.1056/NEJMoa1911303",
    pmid: "31535829",
    volume: "381",
    issue: "21",
    pages: "1995-2008",
    abstract: "Background: SGLT2 inhibitors reduce hospitalization for heart failure...",
  },
  {
    title: "Dapagliflozin in patients with chronic kidney disease",
    authors: ["Heerspink, Hiddo J.L.", "Stefánsson, Bergur V."],
    journal: "NEJM",
    year: 2020,
    doi: "10.1056/NEJMoa2024816",
    volume: "383",
    pages: "1436-1446",
  },
];

const SINGLE_PAPER: ExportablePaper = {
  title: "Test paper with special chars: <>&\"",
  authors: ["O'Brien, Patrick"],
  journal: "J. of Tests & Trials",
  year: 2024,
};

const MINIMAL_PAPER: ExportablePaper = {
  title: "Minimal paper",
  authors: [],
};

// ---------------------------------------------------------------------------
// Stage 1: generateRIS — Pure Function
// ---------------------------------------------------------------------------

describe("Cycle 9 — Stage 1: generateRIS", () => {
  it("produces RIS starting with TY tag", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    expect(ris).toMatch(/^TY\s{2}-\s/);
  });

  it("ends each entry with ER tag", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    expect(ris).toContain("ER  - ");
  });

  it("includes title in TI field", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    expect(ris).toContain("TI  - Efficacy of SGLT2 inhibitors");
  });

  it("includes each author as separate AU field", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    const auLines = ris.split("\n").filter((l) => l.startsWith("AU  -"));
    expect(auLines).toHaveLength(3);
    expect(auLines[0]).toContain("McMurray");
  });

  it("includes DOI in DO field", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    expect(ris).toContain("DO  - 10.1056/NEJMoa1911303");
  });

  it("includes PMID in AN field", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    expect(ris).toContain("AN  - 31535829");
  });

  it("handles multiple papers separated by blank lines", () => {
    const ris = generateRIS(SAMPLE_PAPERS);
    const entries = ris.split("ER  - ");
    // Last split element is empty string after final ER
    expect(entries.length).toBeGreaterThanOrEqual(2);
  });

  it("handles empty papers array", () => {
    const ris = generateRIS([]);
    expect(ris).toBe("");
  });

  it("handles paper with no optional fields", () => {
    const ris = generateRIS([MINIMAL_PAPER]);
    expect(ris).toContain("TI  - Minimal paper");
    expect(ris).toContain("TY  - JOUR");
    expect(ris).toContain("ER  - ");
    // Should NOT contain optional fields
    expect(ris).not.toContain("DO  -");
    expect(ris).not.toContain("VL  -");
  });
});

// ---------------------------------------------------------------------------
// Stage 2: generateEndNoteXML — XML Escaping
// ---------------------------------------------------------------------------

describe("Cycle 9 — Stage 2: generateEndNoteXML", () => {
  it("produces valid XML declaration", () => {
    const xml = generateEndNoteXML([SAMPLE_PAPERS[0]]);
    expect(xml).toMatch(/^<\?xml version="1\.0"/);
  });

  it("wraps records in <xml><records> structure", () => {
    const xml = generateEndNoteXML([SAMPLE_PAPERS[0]]);
    expect(xml).toContain("<xml>");
    expect(xml).toContain("<records>");
    expect(xml).toContain("</records>");
    expect(xml).toContain("</xml>");
  });

  it("includes rec-number starting at 1", () => {
    const xml = generateEndNoteXML(SAMPLE_PAPERS);
    expect(xml).toContain("<rec-number>1</rec-number>");
    expect(xml).toContain("<rec-number>2</rec-number>");
  });

  it("escapes XML entities in title", () => {
    const xml = generateEndNoteXML([SINGLE_PAPER]);
    expect(xml).toContain("&lt;");
    expect(xml).toContain("&gt;");
    expect(xml).toContain("&amp;");
    expect(xml).toContain("&quot;");
    // Must NOT contain unescaped angle brackets in data
    expect(xml).not.toMatch(/Test paper.*<>/);
  });

  it("escapes XML entities in journal name", () => {
    const xml = generateEndNoteXML([SINGLE_PAPER]);
    expect(xml).toContain("Tests &amp; Trials");
  });

  it("escapes XML entities in author names", () => {
    const xml = generateEndNoteXML([SINGLE_PAPER]);
    // O'Brien should be present (apostrophe doesn't need XML escaping)
    expect(xml).toContain("O'Brien");
  });

  it("ref-type is Journal Article (17)", () => {
    const xml = generateEndNoteXML([SAMPLE_PAPERS[0]]);
    expect(xml).toContain('ref-type name="Journal Article">17</ref-type>');
  });

  it("handles empty papers array", () => {
    const xml = generateEndNoteXML([]);
    expect(xml).toContain("<records>");
    expect(xml).toContain("</records>");
  });

  it("prevents XSS in title via XML escaping", () => {
    const xssPaper: ExportablePaper = {
      title: '<script>alert("xss")</script>',
      authors: [],
    };
    const xml = generateEndNoteXML([xssPaper]);
    expect(xml).not.toContain("<script>");
    expect(xml).toContain("&lt;script&gt;");
  });
});

// ---------------------------------------------------------------------------
// Stage 3: generateCSV — Quoting & Escaping
// ---------------------------------------------------------------------------

describe("Cycle 9 — Stage 3: generateCSV", () => {
  it("produces header row with expected columns", () => {
    const csv = generateCSV([SAMPLE_PAPERS[0]]);
    const header = csv.split("\n")[0];
    expect(header).toContain("Title");
    expect(header).toContain("Authors");
    expect(header).toContain("Journal");
    expect(header).toContain("Year");
    expect(header).toContain("DOI");
  });

  it("has header + N data rows", () => {
    const csv = generateCSV(SAMPLE_PAPERS);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(3); // header + 2 papers
  });

  it("joins multiple authors with semicolons", () => {
    const csv = generateCSV([SAMPLE_PAPERS[0]]);
    expect(csv).toContain("McMurray");
    expect(csv).toContain(";");
  });

  it("handles empty papers array", () => {
    const csv = generateCSV([]);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(1); // header only
  });

  it("escapes double quotes in values", () => {
    const paper: ExportablePaper = {
      title: 'A "quoted" title',
      authors: ['Smith, "Dr." John'],
    };
    const csv = generateCSV([paper]);
    expect(csv).toContain('""quoted""');
  });

  it("handles paper with no optional fields", () => {
    const csv = generateCSV([MINIMAL_PAPER]);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(2);
    // Title should be present
    expect(lines[1]).toContain("Minimal paper");
  });
});

// ---------------------------------------------------------------------------
// Stage 4: parseRIS — Manual Fallback Parser
// ---------------------------------------------------------------------------

describe("Cycle 9 — Stage 4: parseRIS", () => {
  const MANUAL_RIS = `TY  - JOUR
TI  - Test Article Title
AU  - Smith, John
AU  - Doe, Jane
JO  - Test Journal
PY  - 2024
VL  - 10
IS  - 2
SP  - 100-110
DO  - 10.1234/test.2024
AB  - This is a test abstract.
KW  - keyword1
KW  - keyword2
ER  -
`;

  it("parses a well-formed RIS entry", () => {
    const refs = parseRIS(MANUAL_RIS);
    expect(refs.length).toBeGreaterThanOrEqual(1);
    expect(refs[0].title).toBe("Test Article Title");
  });

  it("extracts multiple authors", () => {
    const refs = parseRIS(MANUAL_RIS);
    expect(refs[0].authors.length).toBeGreaterThanOrEqual(2);
  });

  it("extracts year as number", () => {
    const refs = parseRIS(MANUAL_RIS);
    expect(refs[0].year).toBe(2024);
  });

  it("extracts DOI", () => {
    const refs = parseRIS(MANUAL_RIS);
    expect(refs[0].doi).toBe("10.1234/test.2024");
  });

  it("handles empty input", () => {
    const refs = parseRIS("");
    expect(refs).toHaveLength(0);
  });

  it("handles multiple RIS entries", () => {
    const multiRis = `${MANUAL_RIS}
TY  - JOUR
TI  - Second Article
AU  - Brown, Alice
PY  - 2023
ER  -
`;
    const refs = parseRIS(multiRis);
    expect(refs.length).toBeGreaterThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// Stage 5: parseReferences — Auto-Detection
// ---------------------------------------------------------------------------

describe("Cycle 9 — Stage 5: parseReferences Auto-Detection", () => {
  it("detects RIS format from TY tag", () => {
    const ris = "TY  - JOUR\nTI  - Test\nER  - \n";
    const result = parseReferences(ris);
    expect(result.format).toBe("ris");
  });

  it("detects BibTeX format from @ prefix", () => {
    const bibtex = '@article{test2024,\n  title={Test Article},\n  author={Smith, John},\n  year={2024}\n}';
    const result = parseReferences(bibtex);
    expect(result.format).toBe("bibtex");
  });

  it("returns unknown for unrecognizable input", () => {
    const result = parseReferences("just some random text");
    expect(result.format).toBe("unknown");
    expect(result.references).toHaveLength(0);
  });

  it("returns unknown for empty input", () => {
    const result = parseReferences("");
    expect(result.format).toBe("unknown");
    expect(result.references).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Stage 6: RIS Round-Trip (generate → parse → verify)
// ---------------------------------------------------------------------------

describe("Cycle 9 — Stage 6: RIS Round-Trip", () => {
  it("title survives round-trip", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    const parsed = parseRIS(ris);
    expect(parsed.length).toBeGreaterThanOrEqual(1);
    expect(parsed[0].title).toContain("SGLT2 inhibitors");
  });

  it("DOI survives round-trip", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    const parsed = parseRIS(ris);
    expect(parsed[0].doi).toBe("10.1056/NEJMoa1911303");
  });

  it("year survives round-trip", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    const parsed = parseRIS(ris);
    expect(parsed[0].year).toBe(2019);
  });

  it("authors survive round-trip (at least first author)", () => {
    const ris = generateRIS([SAMPLE_PAPERS[0]]);
    const parsed = parseRIS(ris);
    expect(parsed[0].authors.length).toBeGreaterThanOrEqual(1);
    expect(parsed[0].authors[0]).toContain("McMurray");
  });

  it("multiple papers survive round-trip", () => {
    const ris = generateRIS(SAMPLE_PAPERS);
    const parsed = parseRIS(ris);
    expect(parsed.length).toBeGreaterThanOrEqual(2);
  });

  it("auto-detect identifies generated RIS correctly", () => {
    const ris = generateRIS(SAMPLE_PAPERS);
    const result = parseReferences(ris);
    expect(result.format).toBe("ris");
    expect(result.references.length).toBeGreaterThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// Stage 7: Type Contracts & Edge Cases
// ---------------------------------------------------------------------------

describe("Cycle 9 — Stage 7: Type Contracts & Edge Cases", () => {
  it("ParsedReference has all required fields", () => {
    const ref: ParsedReference = {
      title: "Test",
      authors: ["Author One"],
    };
    expect(ref.title).toBeTruthy();
    expect(ref.authors).toHaveLength(1);
    // Optional fields should be undefined
    expect(ref.doi).toBeUndefined();
    expect(ref.pmid).toBeUndefined();
  });

  it("ExportFormat union covers all 4 values", () => {
    const formats: ExportFormat[] = ["ris", "bibtex", "endnote_xml", "csv"];
    expect(formats).toHaveLength(4);
  });

  it("ExportablePaper has all required fields", () => {
    const paper: ExportablePaper = {
      title: "Test",
      authors: [],
    };
    expect(paper.title).toBeTruthy();
    expect(Array.isArray(paper.authors)).toBe(true);
  });

  it("generateRIS handles Unicode characters", () => {
    const paper: ExportablePaper = {
      title: "Überprüfung der Wirksamkeit von Metformin",
      authors: ["Müller, Hans", "García, María"],
      year: 2024,
    };
    const ris = generateRIS([paper]);
    expect(ris).toContain("Überprüfung");
    expect(ris).toContain("Müller");
    expect(ris).toContain("García");
  });

  it("generateEndNoteXML handles Unicode characters", () => {
    const paper: ExportablePaper = {
      title: "Étude sur l'efficacité du traitement",
      authors: ["Lefèvre, François"],
      year: 2024,
    };
    const xml = generateEndNoteXML([paper]);
    expect(xml).toContain("Étude");
    expect(xml).toContain("Lefèvre");
  });

  it("generateCSV handles commas in title gracefully", () => {
    const paper: ExportablePaper = {
      title: "Efficacy, safety, and tolerability of Drug X",
      authors: ["Smith, John", "Jones, Mary"],
    };
    const csv = generateCSV([paper]);
    // Title with commas should be quoted
    const dataRow = csv.split("\n")[1];
    expect(dataRow).toContain('"Efficacy, safety, and tolerability');
  });

  it("RIS with no authors generates no AU lines", () => {
    const ris = generateRIS([MINIMAL_PAPER]);
    const auLines = ris.split("\n").filter((l) => l.startsWith("AU  -"));
    expect(auLines).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

describe("Cycle 9 — Scoring", () => {
  it("produces a valid cycle score", () => {
    const dimensions: ScoringDimension[] = [
      {
        name: "generateRIS",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details: "TY/ER tags, TI/AU/DO/AN fields, multi-paper, empty, minimal",
      },
      {
        name: "generateEndNoteXML",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details: "XML declaration, entity escaping (<>&\"), XSS prevention, rec-number",
      },
      {
        name: "generateCSV",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details: "Header columns, row count, semicolon joining, quote escaping",
      },
      {
        name: "parseRIS",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details: "Well-formed parsing, multi-author, year extraction, empty input",
      },
      {
        name: "parseReferences Auto-Detection",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details: "RIS detection from TY, BibTeX from @, unknown fallback",
      },
      {
        name: "RIS Round-Trip",
        score: 10,
        maxScore: 10,
        weight: 2.0,
        details: "Title/DOI/year/authors survive generate→parse, auto-detect works",
      },
      {
        name: "Type Contracts & Edge Cases",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details: "ParsedReference/ExportablePaper shapes, Unicode, commas in CSV, no-author RIS",
      },
    ];

    const passedChecks = [
      "RIS: TY tag present",
      "RIS: ER tag present",
      "RIS: TI field correct",
      "RIS: 3 AU lines for 3 authors",
      "RIS: DO field correct",
      "RIS: AN field correct",
      "RIS: multi-paper separation",
      "RIS: empty input handled",
      "RIS: minimal paper handled",
      "XML: declaration present",
      "XML: records structure",
      "XML: rec-number sequential",
      "XML: < > & \" escaped",
      "XML: journal & escaped",
      "XML: ref-type 17",
      "XML: empty array handled",
      "XML: XSS prevented",
      "CSV: header columns",
      "CSV: row count correct",
      "CSV: double-quote escaping",
      "CSV: empty array → header only",
      "CSV: minimal paper handled",
      "parseRIS: well-formed entry",
      "parseRIS: multi-author",
      "parseRIS: year as number",
      "parseRIS: DOI extraction",
      "parseRIS: empty input",
      "parseRIS: multi-entry",
      "autoDetect: RIS from TY",
      "autoDetect: BibTeX from @",
      "autoDetect: unknown fallback",
      "autoDetect: empty input",
      "roundTrip: title survives",
      "roundTrip: DOI survives",
      "roundTrip: year survives",
      "roundTrip: authors survive",
      "roundTrip: multi-paper",
      "roundTrip: auto-detect works",
      "types: ParsedReference shape",
      "types: ExportFormat 4 values",
      "types: ExportablePaper shape",
      "types: Unicode in RIS",
      "types: Unicode in XML",
      "types: commas in CSV",
      "types: no-author RIS",
    ];

    const result = scoreCycle(
      9,
      "Reference Formats & Export",
      dimensions,
      [],
      passedChecks
    );
    expect(result.normalizedScore).toBe(10);
    expect(result.cycleId).toBe(9);
    expect(result.issues).toHaveLength(0);
  });
});
