"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  Quotes,
  X,
  FileText,
  ArrowSquareOut,
  PencilSimple,
  BookOpenText,
  FilePdf,
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

interface ChunkInfo {
  chunkId: number;
  chunkIndex: number;
  text: string;
  sectionType: string | null;
  pageNumber: number | null;
}

interface ExtractedField {
  field: string;
  value: string | null;
  sourceQuote: string;
  confidence: number;
  sourceChunkId?: number;
}

interface PaperExtraction {
  paperId: number;
  title: string;
  extractions: ExtractedField[];
  chunks?: ChunkInfo[];
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
// Source Passage Viewer — highlights the quote in chunk text
// ---------------------------------------------------------------------------

function SourcePassageViewer({
  chunk,
  sourceQuote,
  onClose,
}: {
  chunk: ChunkInfo;
  sourceQuote: string;
  onClose: () => void;
}) {
  const passageRef = useRef<HTMLDivElement>(null);

  // Highlight the source quote within the chunk text
  const highlightedText = (() => {
    if (!sourceQuote || sourceQuote.length < 10) {
      return [{ text: chunk.text, highlight: false }];
    }

    // Try exact match first, then fuzzy (first 40 chars)
    let idx = chunk.text.indexOf(sourceQuote);
    if (idx === -1) {
      const prefix = sourceQuote.slice(0, 40);
      idx = chunk.text.indexOf(prefix);
    }

    if (idx === -1) {
      // Fall back: try case-insensitive
      const lowerText = chunk.text.toLowerCase();
      const lowerQuote = sourceQuote.toLowerCase();
      idx = lowerText.indexOf(lowerQuote);
      if (idx === -1) {
        const prefix = lowerQuote.slice(0, 40);
        idx = lowerText.indexOf(prefix);
      }
    }

    if (idx === -1) {
      return [{ text: chunk.text, highlight: false }];
    }

    const matchLen = Math.min(sourceQuote.length, chunk.text.length - idx);
    return [
      { text: chunk.text.slice(0, idx), highlight: false },
      { text: chunk.text.slice(idx, idx + matchLen), highlight: true },
      { text: chunk.text.slice(idx + matchLen), highlight: false },
    ].filter((seg) => seg.text.length > 0);
  })();

  // Scroll to highlighted text on mount
  useEffect(() => {
    const el = passageRef.current?.querySelector("[data-highlight]");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-raised/50">
        <div className="flex items-center gap-2 text-sm font-medium text-ink">
          <BookOpenText weight="duotone" size={16} className="text-brand" />
          Source Passage
        </div>
        <button
          onClick={onClose}
          className="p-1 text-ink-muted hover:text-ink rounded"
        >
          <X size={14} />
        </button>
      </div>

      {/* Chunk metadata */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border/50 text-xs text-ink-muted">
        {chunk.sectionType && (
          <span className="px-2 py-0.5 rounded bg-brand/10 text-brand font-medium">
            {chunk.sectionType}
          </span>
        )}
        {chunk.pageNumber && (
          <span className="flex items-center gap-1">
            <FilePdf size={12} />
            Page {chunk.pageNumber}
          </span>
        )}
        <span>Chunk #{chunk.chunkIndex + 1}</span>
      </div>

      {/* Text with highlighted quote */}
      <div
        ref={passageRef}
        className="flex-1 overflow-y-auto px-4 py-3 text-sm text-ink-muted leading-relaxed"
      >
        {highlightedText.map((seg, i) =>
          seg.highlight ? (
            <mark
              key={i}
              data-highlight
              className="bg-amber-400/20 text-ink border-l-2 border-amber-400 px-1 rounded-sm"
            >
              {seg.text}
            </mark>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </div>
    </div>
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

  // Use full-text extraction toggle
  const [useFullText, setUseFullText] = useState(true);

  // Papers state
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loadingPapers, setLoadingPapers] = useState(true);

  // Track which papers have full-text chunks available
  const [papersWithChunks, setPapersWithChunks] = useState<Set<number>>(
    new Set()
  );

  // Extraction table state (persisted results from GET)
  const [extractionTable, setExtractionTable] =
    useState<ExtractionTable | null>(null);
  const [loadingTable, setLoadingTable] = useState(true);

  // Live extraction results (from current session POST calls)
  const [liveExtractions, setLiveExtractions] = useState<
    Map<number, ExtractedField[]>
  >(new Map());

  // Store chunks returned from full-text extraction (per paper)
  const [paperChunksMap, setPaperChunksMap] = useState<
    Map<number, ChunkInfo[]>
  >(new Map());

  // Source viewer state
  const [sourceViewer, setSourceViewer] = useState<{
    chunk: ChunkInfo;
    sourceQuote: string;
    fieldName: string;
    paperTitle: string;
  } | null>(null);

  // Inline editing state
  const [editingCell, setEditingCell] = useState<{
    paperId: number;
    field: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

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

      // Check which papers have chunks
      const chunksSet = new Set<number>();
      for (const paper of included) {
        try {
          const chunkRes = await fetch(
            `/api/systematic-review/extract?paperId=${paper.paperId}`
          );
          if (chunkRes.ok) {
            const chunkData = await chunkRes.json();
            if (chunkData.chunks && chunkData.chunks.length > 0) {
              chunksSet.add(paper.paperId);
            }
          }
        } catch {
          // Skip — paper has no chunks
        }
      }
      setPapersWithChunks(chunksSet);
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
  // Extract single paper (supports full-text mode)
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
        const hasChunks = papersWithChunks.has(paper.paperId);
        const shouldUseFullText = useFullText && hasChunks;

        if (shouldUseFullText) {
          // Full-text extraction with source linking
          const res = await fetch("/api/systematic-review/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mode: "single-fulltext",
              schema,
              title: paper.title,
              paperId: paper.paperId,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Extraction failed");
          }

          const data = await res.json();
          const extractions: ExtractedField[] = data.extractions ?? [];
          const chunks: ChunkInfo[] = data.chunks ?? [];

          setLiveExtractions((prev) => {
            const next = new Map(prev);
            next.set(paper.paperId, extractions);
            return next;
          });

          if (chunks.length > 0) {
            setPaperChunksMap((prev) => {
              const next = new Map(prev);
              next.set(paper.paperId, chunks);
              return next;
            });
          }
        } else {
          // Fallback: abstract-only extraction
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
        }
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
    [schema, isSchemaValid, useFullText, papersWithChunks]
  );

  // ---------------------------------------------------------------------------
  // Extract all papers (batch)
  // ---------------------------------------------------------------------------

  const extractAll = useCallback(async () => {
    if (!isSchemaValid) {
      setError("All schema fields must have a name and description.");
      return;
    }

    // Determine which papers can use full-text vs abstract
    const fullTextPapers = useFullText
      ? papers.filter((p) => papersWithChunks.has(p.paperId))
      : [];
    const abstractPapers = papers.filter(
      (p) =>
        !fullTextPapers.some((ft) => ft.paperId === p.paperId) &&
        (p.abstract?.length ?? 0) >= 50
    );
    const totalEligible = fullTextPapers.length + abstractPapers.length;

    if (totalEligible === 0) {
      setError(
        "No papers have enough text content for extraction. Upload PDFs or ensure papers have abstracts."
      );
      return;
    }

    setExtractingAll(true);
    setBatchProgress({ done: 0, total: totalEligible });
    setError(null);

    try {
      let completed = 0;

      // Full-text batch extraction
      if (fullTextPapers.length > 0) {
        const res = await fetch("/api/systematic-review/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "batch-fulltext",
            projectId,
            matrixName: "Data Extraction",
            schema,
            papers: fullTextPapers.map((p) => ({
              paperId: p.paperId,
              title: p.title,
            })),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const results: PaperExtraction[] = data.papers ?? [];

          setLiveExtractions((prev) => {
            const next = new Map(prev);
            for (const result of results) {
              next.set(result.paperId, result.extractions);
            }
            return next;
          });

          // Store chunks
          for (const result of results) {
            if (result.chunks && result.chunks.length > 0) {
              setPaperChunksMap((prev) => {
                const next = new Map(prev);
                next.set(result.paperId, result.chunks!);
                return next;
              });
            }
          }

          completed += results.length;
          setBatchProgress({ done: completed, total: totalEligible });
        }
      }

      // Abstract-only batch extraction
      if (abstractPapers.length > 0) {
        const res = await fetch("/api/systematic-review/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "batch",
            projectId,
            matrixName: "Data Extraction",
            schema,
            papers: abstractPapers.map((p) => ({
              paperId: p.paperId,
              title: p.title,
              textContent: p.abstract || "",
            })),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const results: PaperExtraction[] = data.papers ?? [];

          setLiveExtractions((prev) => {
            const next = new Map(prev);
            for (const result of results) {
              next.set(result.paperId, result.extractions);
            }
            return next;
          });

          completed += results.length;
          setBatchProgress({ done: completed, total: totalEligible });
        }
      }

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
  }, [schema, papers, projectId, isSchemaValid, useFullText, papersWithChunks, loadExtractionTable]);

  // ---------------------------------------------------------------------------
  // View source passage for a cell
  // ---------------------------------------------------------------------------

  const viewSource = useCallback(
    (paperId: number, fieldName: string) => {
      const extractions = liveExtractions.get(paperId);
      if (!extractions) return;

      const field = extractions.find((e) => e.field === fieldName);
      if (!field || !field.sourceChunkId) return;

      const chunks = paperChunksMap.get(paperId);
      if (!chunks) return;

      const chunk = chunks.find((c) => c.chunkId === field.sourceChunkId);
      if (!chunk) return;

      const paper = papers.find((p) => p.paperId === paperId);

      setSourceViewer({
        chunk,
        sourceQuote: field.sourceQuote,
        fieldName,
        paperTitle: paper?.title ?? `Paper #${paperId}`,
      });
    },
    [liveExtractions, paperChunksMap, papers]
  );

  // ---------------------------------------------------------------------------
  // Inline edit handlers
  // ---------------------------------------------------------------------------

  const startEditing = (paperId: number, field: string, currentValue: string) => {
    setEditingCell({ paperId, field });
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (!editingCell) return;

    setLiveExtractions((prev) => {
      const next = new Map(prev);
      const existing = next.get(editingCell.paperId) ?? [];
      const updated = existing.map((e) =>
        e.field === editingCell.field ? { ...e, value: editValue } : e
      );
      next.set(editingCell.paperId, updated);
      return next;
    });
    setEditingCell(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  // ---------------------------------------------------------------------------
  // Build unified results: merge persisted table + live extractions
  // ---------------------------------------------------------------------------

  const buildResultRows = useCallback(() => {
    type ResultCell = {
      value: string | null;
      confidence?: number;
      sourceQuote?: string;
      sourceChunkId?: number;
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
          sourceChunkId: f.sourceChunkId,
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
    <div className="flex gap-4">
      {/* Main content area */}
      <div className={cn(
        "space-y-6 transition-all duration-300",
        sourceViewer ? "flex-1 min-w-0" : "max-w-6xl w-full"
      )}>
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

          <div className="flex items-center justify-between mt-3">
            <button
              onClick={addField}
              className="px-3 py-1.5 text-sm text-brand hover:bg-brand/10 rounded flex items-center gap-1"
            >
              <Plus size={14} /> Add Field
            </button>

            {/* Full-text toggle */}
            <label className="flex items-center gap-2 text-sm text-ink-muted cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useFullText}
                onChange={(e) => setUseFullText(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-border text-brand focus:ring-brand/40"
              />
              <FileText size={14} className={cn(useFullText ? "text-brand" : "text-ink-muted")} />
              Use full-text PDF chunks
            </label>
          </div>
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
                const hasChunks = papersWithChunks.has(paper.paperId);
                const tooShort =
                  !hasChunks && (paper.abstract?.length ?? 0) < 50;

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
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-ink truncate">{paper.title}</p>
                        {hasChunks && (
                          <span
                            className="shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded bg-brand/10 text-brand"
                            title="Full-text PDF chunks available"
                          >
                            Full-text
                          </span>
                        )}
                      </div>
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
              {hasResults && (
                <span className="ml-2 text-xs font-normal text-ink-muted">
                  Click any value to view source passage
                </span>
              )}
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
                          const isEditing =
                            editingCell?.paperId === row.paperId &&
                            editingCell?.field === col;
                          const hasSourceLink =
                            cell?.sourceChunkId != null &&
                            paperChunksMap.has(row.paperId);

                          return (
                            <td
                              key={col}
                              className="py-2 px-3 text-ink-muted max-w-[200px]"
                            >
                              {cell?.value != null ? (
                                isEditing ? (
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="text"
                                      value={editValue}
                                      onChange={(e) =>
                                        setEditValue(e.target.value)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") saveEdit();
                                        if (e.key === "Escape") cancelEdit();
                                      }}
                                      autoFocus
                                      className="flex-1 px-1.5 py-0.5 text-sm bg-surface-raised border border-brand/40 rounded text-ink outline-none focus:ring-1 focus:ring-brand/40"
                                    />
                                    <button
                                      onClick={saveEdit}
                                      className="p-0.5 text-emerald-400 hover:text-emerald-300"
                                      title="Save"
                                    >
                                      <CheckCircle size={14} weight="fill" />
                                    </button>
                                    <button
                                      onClick={cancelEdit}
                                      className="p-0.5 text-ink-muted hover:text-red-400"
                                      title="Cancel"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5 group">
                                    <span
                                      className={cn(
                                        "truncate",
                                        hasSourceLink &&
                                          "cursor-pointer hover:text-brand underline decoration-dotted underline-offset-2"
                                      )}
                                      title={
                                        hasSourceLink
                                          ? "Click to view source passage"
                                          : cell.sourceQuote
                                            ? `Source: "${cell.sourceQuote}"`
                                            : undefined
                                      }
                                      onClick={() => {
                                        if (hasSourceLink) {
                                          viewSource(row.paperId, col);
                                        }
                                      }}
                                    >
                                      {cell.value}
                                    </span>
                                    {hasSourceLink && (
                                      <button
                                        onClick={() =>
                                          viewSource(row.paperId, col)
                                        }
                                        className="opacity-0 group-hover:opacity-100 p-0.5 text-brand/60 hover:text-brand transition-opacity"
                                        title="View source passage"
                                      >
                                        <Quotes size={12} weight="fill" />
                                      </button>
                                    )}
                                    {!hasSourceLink && cell.sourceQuote && (
                                      <button
                                        onClick={() => {
                                          // Show sourceQuote in a simple tooltip-like view
                                          setSourceViewer({
                                            chunk: {
                                              chunkId: 0,
                                              chunkIndex: 0,
                                              text: cell.sourceQuote!,
                                              sectionType: null,
                                              pageNumber: null,
                                            },
                                            sourceQuote: cell.sourceQuote!,
                                            fieldName: col,
                                            paperTitle: row.title,
                                          });
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-0.5 text-ink-muted/60 hover:text-ink-muted transition-opacity"
                                        title="View source quote"
                                      >
                                        <Quotes size={12} />
                                      </button>
                                    )}
                                    <button
                                      onClick={() =>
                                        startEditing(
                                          row.paperId,
                                          col,
                                          cell.value || ""
                                        )
                                      }
                                      className="opacity-0 group-hover:opacity-100 p-0.5 text-ink-muted/60 hover:text-ink-muted transition-opacity"
                                      title="Edit value"
                                    >
                                      <PencilSimple size={12} />
                                    </button>
                                    {cell.confidence != null && (
                                      <ConfidenceBadge
                                        confidence={cell.confidence}
                                      />
                                    )}
                                  </div>
                                )
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
                  AI reads each paper{"\u2019"}s full text (or abstract) and extracts matching data points
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Every extraction links to the source passage — click to verify
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  Human verifies and edits with the source visible side-by-side
                </span>
              </div>
            </div>
          </GlassPanel>
        )}
      </div>

      {/* ---- Source Passage Side Panel ---- */}
      {sourceViewer && (
        <div className="w-[400px] shrink-0 sticky top-4 self-start">
          <GlassPanel className="h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
            {/* Panel header with context */}
            <div className="px-4 py-2.5 border-b border-border bg-surface-raised/30">
              <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-1">
                <ArrowSquareOut size={12} />
                <span className="font-medium text-brand">
                  {sourceViewer.fieldName}
                </span>
              </div>
              <p className="text-xs text-ink-muted truncate" title={sourceViewer.paperTitle}>
                {sourceViewer.paperTitle}
              </p>
            </div>

            {/* Source passage viewer */}
            <div className="flex-1 overflow-hidden">
              <SourcePassageViewer
                chunk={sourceViewer.chunk}
                sourceQuote={sourceViewer.sourceQuote}
                onClose={() => setSourceViewer(null)}
              />
            </div>
          </GlassPanel>
        </div>
      )}
    </div>
  );
}
