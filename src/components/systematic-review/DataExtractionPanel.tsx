"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table,
  Plus,
  Trash,
  CircleNotch,
  Play,
  Lightning,
  CheckCircle,
  WarningCircle,
  Info,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DataExtractionPanelProps {
  projectId: number;
}

interface SchemaField {
  field: string;
  description: string;
  type: "text" | "number" | "boolean" | "select";
}

interface Paper {
  paperId: number;
  title: string;
  abstract: string | null;
  screeningDecision: string | null;
  fullTextAvailable: boolean | null;
}

interface ExtractionColumn {
  id: number;
  name: string;
  type: string;
  sortOrder: number;
}

interface ExtractionRow {
  paperId: number;
  values: Array<{
    columnId: number;
    columnName: string;
    value: string | null;
  }>;
}

interface ExtractionTable {
  matrixId: number;
  name: string;
  columns: ExtractionColumn[];
  rows: ExtractionRow[];
}

interface ExtractedField {
  field: string;
  value: string | null;
  sourceQuote: string;
  confidence: number;
}

interface PaperExtraction {
  paperId: number;
  title: string;
  extractions: ExtractedField[];
}

// ---------------------------------------------------------------------------
// Confidence Badge
// ---------------------------------------------------------------------------

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  const color =
    pct >= 80
      ? "text-emerald-400 bg-emerald-500/10"
      : pct >= 50
        ? "text-amber-400 bg-amber-500/10"
        : "text-red-400 bg-red-500/10";

  return (
    <span
      className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded", color)}
      title={`Confidence: ${pct}%`}
    >
      {pct}%
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DataExtractionPanel({ projectId }: DataExtractionPanelProps) {
  // Schema editor state
  const [schema, setSchema] = useState<SchemaField[]>([
    {
      field: "sample_size",
      description: "Total number of participants",
      type: "number",
    },
    {
      field: "intervention",
      description: "Intervention used",
      type: "text",
    },
    {
      field: "primary_outcome",
      description: "Primary outcome measured",
      type: "text",
    },
    {
      field: "effect_size",
      description: "Main effect size reported",
      type: "text",
    },
    { field: "follow_up", description: "Follow-up duration", type: "text" },
  ]);

  // Papers state
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loadingPapers, setLoadingPapers] = useState(true);

  // Extraction table state (persisted results from GET)
  const [extractionTable, setExtractionTable] =
    useState<ExtractionTable | null>(null);
  const [loadingTable, setLoadingTable] = useState(true);

  // Live extraction results (from current session POST calls)
  const [liveExtractions, setLiveExtractions] = useState<
    Map<number, ExtractedField[]>
  >(new Map());

  // Extraction progress state
  const [extractingPaperIds, setExtractingPaperIds] = useState<Set<number>>(
    new Set()
  );
  const [extractingAll, setExtractingAll] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{
    done: number;
    total: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Load included papers
  // ---------------------------------------------------------------------------

  const loadPapers = useCallback(async () => {
    setLoadingPapers(true);
    try {
      const res = await fetch(
        `/api/systematic-review/import?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load papers");
      const data = await res.json();
      // Filter to only included papers
      const included = (data.papers ?? []).filter(
        (p: Paper) => p.screeningDecision === "include"
      );
      setPapers(included);
    } catch {
      setPapers([]);
    } finally {
      setLoadingPapers(false);
    }
  }, [projectId]);

  // ---------------------------------------------------------------------------
  // Load existing extraction table
  // ---------------------------------------------------------------------------

  const loadExtractionTable = useCallback(async () => {
    setLoadingTable(true);
    try {
      const res = await fetch(
        `/api/systematic-review/extract?projectId=${projectId}`
      );
      if (res.status === 404) {
        setExtractionTable(null);
        return;
      }
      if (!res.ok) throw new Error("Failed to load extraction data");
      const data = await res.json();
      setExtractionTable(data);
    } catch {
      setExtractionTable(null);
    } finally {
      setLoadingTable(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadPapers();
    loadExtractionTable();
  }, [loadPapers, loadExtractionTable]);

  // ---------------------------------------------------------------------------
  // Schema editor handlers
  // ---------------------------------------------------------------------------

  const addField = () => {
    setSchema((prev) => [
      ...prev,
      { field: "", description: "", type: "text" },
    ]);
  };

  const removeField = (index: number) => {
    setSchema((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    key: keyof SchemaField,
    value: string
  ) => {
    setSchema((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [key]: value } : f))
    );
  };

  // ---------------------------------------------------------------------------
  // Validate schema before extraction
  // ---------------------------------------------------------------------------

  const isSchemaValid = schema.every(
    (f) => f.field.trim().length > 0 && f.description.trim().length > 0
  );

  // ---------------------------------------------------------------------------
  // Extract single paper
  // ---------------------------------------------------------------------------

  const extractSingle = useCallback(
    async (paper: Paper) => {
      if (!isSchemaValid) {
        setError("All schema fields must have a name and description.");
        return;
      }

      setExtractingPaperIds((prev) => new Set(prev).add(paper.paperId));
      setError(null);

      try {
        const textContent = paper.abstract || "";
        if (textContent.length < 50) {
          setError(
            `Paper "${paper.title}" does not have enough text content for extraction (minimum 50 characters).`
          );
          return;
        }

        const res = await fetch("/api/systematic-review/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "single",
            schema,
            title: paper.title,
            textContent,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Extraction failed");
        }

        const data = await res.json();
        const extractions: ExtractedField[] = data.extractions ?? [];

        setLiveExtractions((prev) => {
          const next = new Map(prev);
          next.set(paper.paperId, extractions);
          return next;
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Extraction failed"
        );
      } finally {
        setExtractingPaperIds((prev) => {
          const next = new Set(prev);
          next.delete(paper.paperId);
          return next;
        });
      }
    },
    [schema, isSchemaValid]
  );

  // ---------------------------------------------------------------------------
  // Extract all papers (batch)
  // ---------------------------------------------------------------------------

  const extractAll = useCallback(async () => {
    if (!isSchemaValid) {
      setError("All schema fields must have a name and description.");
      return;
    }

    const eligiblePapers = papers.filter(
      (p) => (p.abstract?.length ?? 0) >= 50
    );

    if (eligiblePapers.length === 0) {
      setError(
        "No papers have enough text content for extraction. Papers need at least 50 characters of text."
      );
      return;
    }

    setExtractingAll(true);
    setBatchProgress({ done: 0, total: eligiblePapers.length });
    setError(null);

    try {
      const res = await fetch("/api/systematic-review/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "batch",
          projectId,
          matrixName: "Data Extraction",
          schema,
          papers: eligiblePapers.map((p) => ({
            paperId: p.paperId,
            title: p.title,
            textContent: p.abstract || "",
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Batch extraction failed");
      }

      const data = await res.json();
      const results: PaperExtraction[] = data.papers ?? [];

      // Merge into live extractions
      setLiveExtractions((prev) => {
        const next = new Map(prev);
        for (const result of results) {
          next.set(result.paperId, result.extractions);
        }
        return next;
      });

      setBatchProgress({ done: results.length, total: eligiblePapers.length });

      // Reload the persisted table
      await loadExtractionTable();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Batch extraction failed"
      );
    } finally {
      setExtractingAll(false);
      setBatchProgress(null);
    }
  }, [schema, papers, projectId, isSchemaValid, loadExtractionTable]);

  // ---------------------------------------------------------------------------
  // Build unified results: merge persisted table + live extractions
  // ---------------------------------------------------------------------------

  const buildResultRows = useCallback(() => {
    type ResultCell = {
      value: string | null;
      confidence?: number;
      sourceQuote?: string;
    };
    type ResultRow = {
      paperId: number;
      title: string;
      cells: Map<string, ResultCell>;
    };

    const rowMap = new Map<number, ResultRow>();

    // Seed from persisted extraction table
    if (extractionTable) {
      for (const row of extractionTable.rows) {
        const paper = papers.find((p) => p.paperId === row.paperId);
        const resultRow: ResultRow = {
          paperId: row.paperId,
          title: paper?.title ?? `Paper #${row.paperId}`,
          cells: new Map(),
        };
        for (const v of row.values) {
          resultRow.cells.set(v.columnName, { value: v.value });
        }
        rowMap.set(row.paperId, resultRow);
      }
    }

    // Overlay live extractions (takes precedence)
    for (const [paperId, fields] of liveExtractions) {
      const paper = papers.find((p) => p.paperId === paperId);
      const existing = rowMap.get(paperId) ?? {
        paperId,
        title: paper?.title ?? `Paper #${paperId}`,
        cells: new Map<string, ResultCell>(),
      };
      for (const f of fields) {
        existing.cells.set(f.field, {
          value: f.value,
          confidence: f.confidence,
          sourceQuote: f.sourceQuote,
        });
      }
      rowMap.set(paperId, existing);
    }

    return Array.from(rowMap.values());
  }, [extractionTable, liveExtractions, papers]);

  const resultRows = buildResultRows();
  const hasResults = resultRows.length > 0;

  // Column names for the results table
  const resultColumns: string[] = (() => {
    const colSet = new Set<string>();
    // From persisted table
    if (extractionTable) {
      for (const col of extractionTable.columns) {
        colSet.add(col.name);
      }
    }
    // From schema (in case live extractions used current schema)
    for (const f of schema) {
      if (f.field.trim()) colSet.add(f.field);
    }
    return Array.from(colSet);
  })();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          <WarningCircle
            weight="fill"
            size={16}
            className="shrink-0 mt-0.5"
          />
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400/60 hover:text-red-400"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ---- Schema Editor ---- */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Table weight="duotone" className="text-brand" />
          Data Extraction Schema
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Define your extraction schema once. The AI will extract structured data
          from all included papers, linking every value to its source text.
        </p>

        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-ink-muted px-1">
            <div className="col-span-3">Field Name</div>
            <div className="col-span-5">Description / Prompt</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2"></div>
          </div>

          {schema.map((field, i) => (
            <div key={i} className="grid grid-cols-12 gap-2">
              <input
                type="text"
                value={field.field}
                onChange={(e) => updateField(i, "field", e.target.value)}
                placeholder="field_name"
                className="col-span-3 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <input
                type="text"
                value={field.description}
                onChange={(e) => updateField(i, "description", e.target.value)}
                placeholder="What the AI should look for"
                className="col-span-5 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <select
                value={field.type}
                onChange={(e) =>
                  updateField(
                    i,
                    "type",
                    e.target.value as SchemaField["type"]
                  )
                }
                className="col-span-2 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="select">Category</option>
              </select>
              <div className="col-span-2 flex items-center">
                {schema.length > 1 && (
                  <button
                    onClick={() => removeField(i)}
                    className="p-1 text-ink-muted hover:text-red-500"
                  >
                    <Trash size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addField}
          className="mt-3 px-3 py-1.5 text-sm text-brand hover:bg-brand/10 rounded flex items-center gap-1"
        >
          <Plus size={14} /> Add Field
        </button>
      </GlassPanel>

      {/* ---- Papers & Extraction Actions ---- */}
      <GlassPanel className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
            <Lightning weight="duotone" className="text-brand" />
            Included Papers
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={loadPapers}
              disabled={loadingPapers}
              className="p-1.5 text-ink-muted hover:text-ink rounded"
              title="Refresh papers"
            >
              <ArrowsClockwise
                size={16}
                className={cn(loadingPapers && "animate-spin")}
              />
            </button>
            {papers.length > 0 && (
              <button
                onClick={extractAll}
                disabled={extractingAll || !isSchemaValid}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded flex items-center gap-1.5",
                  "bg-brand text-white hover:bg-brand/90",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {extractingAll ? (
                  <>
                    <CircleNotch size={14} className="animate-spin" />
                    Extracting
                    {batchProgress
                      ? ` (${batchProgress.done}/${batchProgress.total})`
                      : "..."}
                  </>
                ) : (
                  <>
                    <Play size={14} weight="fill" />
                    Extract All ({papers.length})
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {loadingPapers ? (
          <div className="flex items-center justify-center py-10 text-ink-muted text-sm gap-2">
            <CircleNotch size={16} className="animate-spin" />
            Loading papers...
          </div>
        ) : papers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-ink-muted text-sm gap-2">
            <Info size={24} className="text-ink-muted/50" />
            <p>No included papers found.</p>
            <p className="text-xs">
              Screen and include papers first, then return here to extract data.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {papers.map((paper) => {
              const isExtracting = extractingPaperIds.has(paper.paperId);
              const hasLiveResult = liveExtractions.has(paper.paperId);
              const hasPersistedResult = extractionTable?.rows.some(
                (r) => r.paperId === paper.paperId
              );
              const hasResult = hasLiveResult || hasPersistedResult;
              const tooShort = (paper.abstract?.length ?? 0) < 50;

              return (
                <div
                  key={paper.paperId}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-2 rounded-lg border",
                    "border-border bg-surface-raised/50",
                    hasResult && "border-emerald-500/20 bg-emerald-500/5"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink truncate">{paper.title}</p>
                    {tooShort && (
                      <p className="text-xs text-amber-400 mt-0.5">
                        Insufficient text content for extraction
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {hasResult && (
                      <CheckCircle
                        weight="fill"
                        size={16}
                        className="text-emerald-400"
                      />
                    )}
                    <button
                      onClick={() => extractSingle(paper)}
                      disabled={isExtracting || extractingAll || tooShort}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded flex items-center gap-1",
                        "border border-brand/30 text-brand hover:bg-brand/10",
                        "disabled:opacity-40 disabled:cursor-not-allowed"
                      )}
                    >
                      {isExtracting ? (
                        <>
                          <CircleNotch size={12} className="animate-spin" />
                          Extracting...
                        </>
                      ) : hasResult ? (
                        "Re-extract"
                      ) : (
                        "Extract"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassPanel>

      {/* ---- Results Table ---- */}
      {(hasResults || loadingTable) && (
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
            <Table weight="duotone" className="text-brand" />
            Extraction Results
          </h2>

          {loadingTable && !hasResults ? (
            <div className="flex items-center justify-center py-10 text-ink-muted text-sm gap-2">
              <CircleNotch size={16} className="animate-spin" />
              Loading extraction data...
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted whitespace-nowrap sticky left-0 bg-surface z-10">
                      Paper
                    </th>
                    {resultColumns.map((col) => (
                      <th
                        key={col}
                        className="text-left py-2 px-3 text-xs font-medium text-ink-muted whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resultRows.map((row) => (
                    <tr
                      key={row.paperId}
                      className="border-b border-border/50 hover:bg-surface-raised/30"
                    >
                      <td className="py-2 px-3 text-ink max-w-[200px] truncate sticky left-0 bg-surface z-10">
                        <span title={row.title}>{row.title}</span>
                      </td>
                      {resultColumns.map((col) => {
                        const cell = row.cells.get(col);
                        return (
                          <td
                            key={col}
                            className="py-2 px-3 text-ink-muted max-w-[200px]"
                          >
                            {cell?.value != null ? (
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="truncate"
                                  title={
                                    cell.sourceQuote
                                      ? `Source: "${cell.sourceQuote}"`
                                      : undefined
                                  }
                                >
                                  {cell.value}
                                </span>
                                {cell.confidence != null && (
                                  <ConfidenceBadge
                                    confidence={cell.confidence}
                                  />
                                )}
                              </div>
                            ) : (
                              <span className="text-ink-muted/40">--</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassPanel>
      )}

      {/* ---- How It Works (shown when no results yet) ---- */}
      {!hasResults && !loadingTable && (
        <GlassPanel className="p-6 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
          <h3 className="text-sm font-semibold text-ink mb-3">
            How AI Extraction Works
          </h3>
          <div className="space-y-2 text-sm text-ink-muted">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>
                You define the extraction schema (columns + descriptions)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>
                AI reads each paper and extracts matching data points
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>
                Every extraction links to the source quote for verification
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <span>Results populate a structured comparison table</span>
            </div>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}
