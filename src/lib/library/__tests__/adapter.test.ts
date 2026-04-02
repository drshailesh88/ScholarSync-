import { describe, it, expect } from "vitest";
import { adaptPaper, adaptWebSource } from "../adapter";
import type { PaperRow, WebSourceRow } from "../adapter";

describe("adaptPaper", () => {
  const basePaperRow: PaperRow = {
    ref: {
      id: 1,
      isFavorite: true,
      collection: "Core",
      tags: ["systematic-review", "rct"],
      notes: "Good methodology",
      workflowState: "core",
      readingProgress: 45,
      readStatus: "in_progress",
      lastReadAt: new Date("2026-03-15T10:00:00Z"),
      createdAt: new Date("2026-03-01T08:00:00Z"),
    },
    paper: {
      id: 42,
      title: "Efficacy of Treatment X",
      abstract: "Background: Treatment X has shown promise...",
      authors: [{ name: "Smith J" }, { name: "Doe A" }],
      journal: "The Lancet",
      year: 2025,
      volume: "401",
      issue: "3",
      doi: "10.1016/S0140-6736(25)00001-1",
      pubmed_id: "38000001",
      open_access_url: "https://doi.org/10.1016/S0140-6736(25)00001-1",
      citation_count: 150,
      study_type: "rct",
      source: "pubmed",
      pdf_storage_path: "/papers/42.pdf",
      publication_date: new Date("2025-01-15"),
    },
    projectIds: [1, 3],
  };

  it("produces correct libraryId", () => {
    const result = adaptPaper(basePaperRow);
    expect(result.libraryId).toBe("paper_42");
    expect(result.sourceType).toBe("paper");
  });

  it("maps common metadata", () => {
    const result = adaptPaper(basePaperRow);
    expect(result.title).toBe("Efficacy of Treatment X");
    expect(result.authors).toEqual(["Smith J", "Doe A"]);
    expect(result.year).toBe(2025);
    expect(result.doi).toBe("10.1016/S0140-6736(25)00001-1");
  });

  it("maps paper-specific fields", () => {
    const result = adaptPaper(basePaperRow);
    expect(result.journal).toBe("The Lancet");
    expect(result.volume).toBe("401");
    expect(result.citationCount).toBe(150);
    expect(result.pubmedId).toBe("38000001");
    expect(result.pdfStoragePath).toBe("/papers/42.pdf");
  });

  it("sets web-specific fields to null", () => {
    const result = adaptPaper(basePaperRow);
    expect(result.sourceCategory).toBeNull();
    expect(result.trustTier).toBeNull();
    expect(result.contentHtml).toBeNull();
    expect(result.extractionState).toBeNull();
  });

  it("maps library metadata from ref", () => {
    const result = adaptPaper(basePaperRow);
    expect(result.workflowState).toBe("core");
    expect(result.readingProgress).toBe(45);
    expect(result.readStatus).toBe("in_progress");
    expect(result.isFavorite).toBe(true);
    expect(result.tags).toEqual(["systematic-review", "rct"]);
    expect(result.notes).toBe("Good methodology");
    expect(result.collection).toBe("Core");
  });

  it("includes project IDs", () => {
    const result = adaptPaper(basePaperRow);
    expect(result.projectIds).toEqual([1, 3]);
  });

  it("defaults workflow_state to inbox when null", () => {
    const row: PaperRow = {
      ...basePaperRow,
      ref: { ...basePaperRow.ref, workflowState: null },
    };
    expect(adaptPaper(row).workflowState).toBe("inbox");
  });

  it("clamps readingProgress above 100 to 100", () => {
    const row: PaperRow = {
      ...basePaperRow,
      ref: { ...basePaperRow.ref, readingProgress: 150 },
    };
    expect(adaptPaper(row).readingProgress).toBe(100);
  });

  it("clamps negative readingProgress to 0", () => {
    const row: PaperRow = {
      ...basePaperRow,
      ref: { ...basePaperRow.ref, readingProgress: -5 },
    };
    expect(adaptPaper(row).readingProgress).toBe(0);
  });

  it("parses authors that are plain strings", () => {
    const row: PaperRow = {
      ...basePaperRow,
      paper: { ...basePaperRow.paper, authors: ["Smith J", "Doe A"] },
    };
    expect(adaptPaper(row).authors).toEqual(["Smith J", "Doe A"]);
  });

  it("handles null authors", () => {
    const row: PaperRow = {
      ...basePaperRow,
      paper: { ...basePaperRow.paper, authors: null },
    };
    expect(adaptPaper(row).authors).toEqual([]);
  });
});

describe("adaptWebSource", () => {
  const baseWebRow: WebSourceRow = {
    id: 187,
    url: "https://www.nature.com/articles/d41586-025-00001-1",
    domain: "nature.com",
    title: "New Discovery in Quantum Biology",
    snippet: "Scientists have found...",
    author: "Jane Reporter",
    publish_date: new Date("2025-06-15"),
    source_type: "news_article",
    trust_tier: "major_journalism",
    thumbnail_url: "https://media.nature.com/thumb.jpg",
    content_html: "<p>Scientists have found...</p>",
    content_plain: "Scientists have found...",
    content_extracted: true,
    notes: "Interesting for background section",
    tags: ["quantum", "biology"],
    workflow_state: "background",
    reading_progress: 80,
    read_status: "in_progress",
    last_read_at: new Date("2026-03-20T14:00:00Z"),
    extraction_state: "ready",
    created_at: new Date("2026-03-10T09:00:00Z"),
    projectIds: [2],
  };

  it("produces correct libraryId", () => {
    const result = adaptWebSource(baseWebRow);
    expect(result.libraryId).toBe("web_187");
    expect(result.sourceType).toBe("web");
  });

  it("maps common metadata", () => {
    const result = adaptWebSource(baseWebRow);
    expect(result.title).toBe("New Discovery in Quantum Biology");
    expect(result.authors).toEqual(["Jane Reporter"]);
    expect(result.year).toBe(2025);
    expect(result.url).toBe("https://www.nature.com/articles/d41586-025-00001-1");
    expect(result.domain).toBe("nature.com");
  });

  it("maps web-specific fields", () => {
    const result = adaptWebSource(baseWebRow);
    expect(result.sourceCategory).toBe("news_article");
    expect(result.trustTier).toBe("major_journalism");
    expect(result.contentHtml).toBe("<p>Scientists have found...</p>");
    expect(result.extractionState).toBe("ready");
  });

  it("sets paper-specific fields to null", () => {
    const result = adaptWebSource(baseWebRow);
    expect(result.journal).toBeNull();
    expect(result.volume).toBeNull();
    expect(result.citationCount).toBeNull();
    expect(result.pubmedId).toBeNull();
    expect(result.pdfStoragePath).toBeNull();
  });

  it("maps library metadata", () => {
    const result = adaptWebSource(baseWebRow);
    expect(result.workflowState).toBe("background");
    expect(result.readingProgress).toBe(80);
    expect(result.readStatus).toBe("in_progress");
    expect(result.tags).toEqual(["quantum", "biology"]);
    expect(result.notes).toBe("Interesting for background section");
  });

  it("defaults workflow_state to inbox when null", () => {
    const row: WebSourceRow = { ...baseWebRow, workflow_state: null };
    expect(adaptWebSource(row).workflowState).toBe("inbox");
  });

  it("clamps readingProgress above 100 to 100", () => {
    const row: WebSourceRow = { ...baseWebRow, reading_progress: 200 };
    expect(adaptWebSource(row).readingProgress).toBe(100);
  });

  it("clamps negative readingProgress to 0", () => {
    const row: WebSourceRow = { ...baseWebRow, reading_progress: -10 };
    expect(adaptWebSource(row).readingProgress).toBe(0);
  });

  it("derives extraction_state from content_extracted boolean", () => {
    const row: WebSourceRow = {
      ...baseWebRow,
      extraction_state: null,
      content_extracted: true,
    };
    expect(adaptWebSource(row).extractionState).toBe("ready");

    const row2: WebSourceRow = {
      ...baseWebRow,
      extraction_state: null,
      content_extracted: false,
    };
    expect(adaptWebSource(row2).extractionState).toBe("pending");
  });

  it("handles null author", () => {
    const row: WebSourceRow = { ...baseWebRow, author: null };
    expect(adaptWebSource(row).authors).toEqual([]);
  });

  it("handles null publish_date", () => {
    const row: WebSourceRow = { ...baseWebRow, publish_date: null };
    expect(adaptWebSource(row).year).toBeNull();
  });
});
