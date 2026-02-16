/**
 * POST /api/research/evidence-table/export
 *
 * Export evidence table as CSV or BibTeX.
 */

import { NextRequest, NextResponse } from "next/server";

interface ExportRequest {
  format: "csv" | "bibtex";
  tableName: string;
  columns: { id: string; name: string }[];
  rows: {
    paperId: string;
    paperTitle: string;
    paperYear: number;
    paperAuthors?: string[];
    paperJournal?: string;
    paperDoi?: string;
    paperPmid?: string;
    cells: Record<string, { value: string }>;
  }[];
}

function generateCSV(data: ExportRequest): string {
  const headers = [
    "Paper",
    "Year",
    "Authors",
    "Journal",
    "PMID",
    "DOI",
    ...data.columns.map((c) => c.name),
  ];

  const escapeCSV = (val: string) => {
    if (val.includes(",") || val.includes('"') || val.includes("\n")) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const rows = data.rows.map((row) => [
    escapeCSV(row.paperTitle),
    String(row.paperYear || ""),
    escapeCSV((row.paperAuthors || []).join("; ")),
    escapeCSV(row.paperJournal || ""),
    row.paperPmid || "",
    row.paperDoi || "",
    ...data.columns.map((col) => escapeCSV(row.cells[col.id]?.value || "")),
  ]);

  return [headers.map(escapeCSV).join(","), ...rows.map((r) => r.join(","))].join("\n");
}

function generateBibTeX(data: ExportRequest): string {
  return data.rows
    .map((row) => {
      const key =
        (row.paperAuthors?.[0]?.split(" ").pop() || "Unknown") +
        (row.paperYear || "") +
        row.paperTitle
          .split(" ")
          .slice(0, 2)
          .map((w) => w.replace(/[^a-zA-Z]/g, ""))
          .join("");

      const authors = (row.paperAuthors || []).join(" and ");
      const entries = [
        `  author = {${authors}}`,
        `  title = {${row.paperTitle}}`,
        row.paperJournal ? `  journal = {${row.paperJournal}}` : null,
        row.paperYear ? `  year = {${row.paperYear}}` : null,
        row.paperDoi ? `  doi = {${row.paperDoi}}` : null,
        row.paperPmid ? `  pmid = {${row.paperPmid}}` : null,
      ]
        .filter(Boolean)
        .join(",\n");

      return `@article{${key},\n${entries}\n}`;
    })
    .join("\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const body: ExportRequest = await req.json();
    const { format } = body;

    if (format === "csv") {
      const csv = generateCSV(body);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${body.tableName || "evidence_table"}.csv"`,
        },
      });
    }

    if (format === "bibtex") {
      const bib = generateBibTeX(body);
      return new NextResponse(bib, {
        headers: {
          "Content-Type": "application/x-bibtex",
          "Content-Disposition": `attachment; filename="${body.tableName || "references"}.bib"`,
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid format. Use "csv" or "bibtex".' },
      { status: 400 }
    );
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Export failed" },
      { status: 500 }
    );
  }
}
