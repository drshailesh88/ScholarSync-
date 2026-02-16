/**
 * Hook for evidence table management and batch extraction.
 */

"use client";

import { useCallback } from "react";
import { useResearchStore } from "@/stores/research-store";
import type { EvidenceColumn, EvidenceRow, PaperResult } from "@/lib/research/types";
import { EVIDENCE_TABLE_PRESETS } from "@/lib/research/types";

export function useEvidenceTable() {
  const store = useResearchStore();

  /**
   * Create a new evidence table with the given columns and selected papers.
   */
  const createTable = useCallback(
    (name: string, columns: EvidenceColumn[]) => {
      return store.createEvidenceTable(name, columns);
    },
    []
  );

  /**
   * Create a table from a preset configuration.
   */
  const createFromPreset = useCallback(
    (presetKey: string) => {
      const preset = EVIDENCE_TABLE_PRESETS[presetKey];
      if (!preset) return null;

      const columns: EvidenceColumn[] = preset.columns.map((c, i) => ({
        ...c,
        id: `col_${i}_${Date.now()}`,
      }));

      return store.createEvidenceTable(preset.name, columns);
    },
    []
  );

  /**
   * Run batch extraction for all selected papers against the table columns.
   */
  const runBatchExtraction = useCallback(
    async (table: { id: string; columns: EvidenceColumn[] }) => {
      const { selectedPaperIds, results, libraryPapers } =
        useResearchStore.getState();

      if (selectedPaperIds.length === 0) return;

      const allPapers = [...results, ...libraryPapers];
      const papers = selectedPaperIds
        .map((id) => allPapers.find((p) => p.id === id))
        .filter((p): p is PaperResult => !!p && !!p.abstract);

      if (papers.length === 0) return;

      store.setIsExtracting(true);
      store.setExtractionProgress({ current: 0, total: papers.length });

      try {
        const res = await fetch("/api/research/evidence-table", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            papers: papers.map((p) => ({
              id: p.id,
              title: p.title,
              abstract: p.abstract,
            })),
            columns: table.columns.map((c) => ({
              id: c.id,
              name: c.name,
              extractionInstructions: c.extractionInstructions,
            })),
          }),
        });

        if (!res.ok) throw new Error("Batch extraction failed");

        const data = await res.json();

        // Update rows in the store
        for (const paper of papers) {
          const cells = data.results?.[paper.id];
          if (cells) {
            const row: EvidenceRow = {
              paperId: paper.id,
              paperTitle: paper.title,
              paperYear: paper.year,
              cells: Object.fromEntries(
                Object.entries(cells).map(([colId, cell]) => [
                  colId,
                  {
                    value: (cell as { value: string }).value,
                    sourceQuote: (cell as { sourceQuote: string }).sourceQuote,
                    isManualOverride: false,
                    confidence: (cell as { confidence: string }).confidence as
                      | "high"
                      | "medium"
                      | "low",
                  },
                ])
              ),
            };
            store.updateEvidenceTableRow(table.id, row);
          }
        }
      } catch (error) {
        console.error("Batch extraction error:", error);
      } finally {
        store.setIsExtracting(false);
        store.setExtractionProgress(null);
      }
    },
    []
  );

  /**
   * Export the evidence table.
   */
  const exportTable = useCallback(
    async (format: "csv" | "bibtex") => {
      const table = store.activeEvidenceTable;
      if (!table) return;

      const { results, libraryPapers } = useResearchStore.getState();
      const allPapers = [...results, ...libraryPapers];

      const rows = table.rows.map((row) => {
        const paper = allPapers.find((p) => p.id === row.paperId);
        return {
          paperId: row.paperId,
          paperTitle: row.paperTitle,
          paperYear: row.paperYear,
          paperAuthors: paper?.authors,
          paperJournal: paper?.journal,
          paperDoi: paper?.doi,
          paperPmid: paper?.pmid,
          cells: row.cells,
        };
      });

      try {
        const res = await fetch("/api/research/evidence-table/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            format,
            tableName: table.name,
            columns: table.columns.map((c) => ({ id: c.id, name: c.name })),
            rows,
          }),
        });

        if (!res.ok) throw new Error("Export failed");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${table.name}.${format === "csv" ? "csv" : "bib"}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Export error:", error);
      }
    },
    [store.activeEvidenceTable]
  );

  return {
    evidenceTables: store.evidenceTables,
    activeEvidenceTable: store.activeEvidenceTable,
    selectedPaperIds: store.selectedPaperIds,
    isExtracting: store.isExtracting,
    extractionProgress: store.extractionProgress,
    togglePaperSelection: store.togglePaperSelection,
    selectAllPapers: store.selectAllPapers,
    clearPaperSelection: store.clearPaperSelection,
    setActiveEvidenceTable: store.setActiveEvidenceTable,
    createTable,
    createFromPreset,
    runBatchExtraction,
    exportTable,
  };
}
