"use client";

import { useState } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import type { ContentBlock, ChartData, EmbedData, ToggleData, NestedCardData, BlockAnimation, InfographicData, InfographicType, InfographicItem } from "@/types/presentation";
import { Trash, Plus, Upload } from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// BlockPropertyEditor — context-sensitive editor for the selected block.
// Shows in the properties panel when a non-text block is selected.
// ---------------------------------------------------------------------------

export function BlockPropertyEditor() {
  const selectedBlock = useSlidesStore((s) => s.getSelectedBlock());
  const selectedBlockIndex = useSlidesStore((s) => s.selectedBlockIndex);
  const updateBlock = useSlidesStore((s) => s.updateBlock);

  if (selectedBlock === null || selectedBlockIndex === null) {
    return (
      <div className="px-3 py-4 text-center text-xs text-ink-muted">
        Select a block on the canvas to edit its properties.
      </div>
    );
  }

  const onUpdate = (updated: ContentBlock) => updateBlock(selectedBlockIndex, updated);

  let editor: React.ReactNode;

  switch (selectedBlock.type) {
    case "chart":
      editor = <ChartEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "table":
      editor = <TableEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "stat_result":
      editor = <StatEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "image":
      editor = <ImageEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "math":
      editor = <MathEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "code":
      editor = <CodeEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "callout":
      editor = <CalloutEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "citation":
      editor = <CitationEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "timeline":
      editor = <TimelineEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "diagram":
      editor = <DiagramEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "divider":
      editor = <DividerEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "bibliography":
      editor = <BibliographyEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "embed":
      editor = <EmbedEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "toggle":
      editor = <ToggleEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "nested_card":
      editor = <NestedCardEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "infographic":
      editor = <InfographicEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    default:
      editor = (
        <div className="px-3 py-4 text-xs text-ink-muted">
          No property editor for {selectedBlock.type} blocks.
        </div>
      );
  }

  return (
    <>
      {editor}
      <AnimationSection block={selectedBlock} onUpdate={onUpdate} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Shared UI helpers
// ---------------------------------------------------------------------------

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
      {children}
    </label>
  );
}

function FieldInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full text-sm px-2 py-1.5 rounded-md border border-border bg-surface-raised text-ink focus:outline-none focus:ring-1 focus:ring-brand"
    />
  );
}

function FieldTextarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full text-sm px-2 py-1.5 rounded-md border border-border bg-surface-raised text-ink focus:outline-none focus:ring-1 focus:ring-brand font-mono resize-y"
    />
  );
}

function FieldSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-sm px-2 py-1.5 rounded-md border border-border bg-surface-raised text-ink focus:outline-none focus:ring-1 focus:ring-brand"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function EditorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold text-ink uppercase tracking-wider">{title}</h4>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chart Editor
// ---------------------------------------------------------------------------

type ChartBlock = Extract<ContentBlock, { type: "chart" }>;

function ChartEditor({ block, onUpdate }: { block: ChartBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;

  const updateData = (partial: Partial<ChartData>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Chart">
        <div>
          <FieldLabel>Chart Type</FieldLabel>
          <FieldSelect
            value={data.chartType}
            onChange={(v) => updateData({ chartType: v as ChartData["chartType"] })}
            options={[
              { value: "bar", label: "Bar" },
              { value: "line", label: "Line" },
              { value: "pie", label: "Pie" },
              { value: "scatter", label: "Scatter" },
              { value: "area", label: "Area" },
              { value: "radar", label: "Radar" },
            ]}
          />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <FieldInput value={data.title} onChange={(v) => updateData({ title: v })} />
        </div>
        <div>
          <FieldLabel>X-Axis Label</FieldLabel>
          <FieldInput
            value={data.xAxisLabel ?? ""}
            onChange={(v) => updateData({ xAxisLabel: v || undefined })}
            placeholder="e.g. Year"
          />
        </div>
        <div>
          <FieldLabel>Y-Axis Label</FieldLabel>
          <FieldInput
            value={data.yAxisLabel ?? ""}
            onChange={(v) => updateData({ yAxisLabel: v || undefined })}
            placeholder="e.g. Count"
          />
        </div>
        <div>
          <FieldLabel>Labels (comma-separated)</FieldLabel>
          <FieldInput
            value={data.labels.join(", ")}
            onChange={(v) => updateData({ labels: v.split(",").map((s) => s.trim()) })}
            placeholder="A, B, C"
          />
        </div>
      </EditorSection>

      <EditorSection title="Datasets">
        {data.datasets.map((ds, i) => (
          <div key={i} className="p-2 rounded-md border border-border bg-surface-raised/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <FieldInput
                value={ds.label}
                onChange={(v) => {
                  const updated = [...data.datasets];
                  updated[i] = { ...ds, label: v };
                  updateData({ datasets: updated });
                }}
                placeholder="Dataset label"
              />
              {data.datasets.length > 1 && (
                <button
                  onClick={() => updateData({ datasets: data.datasets.filter((_, j) => j !== i) })}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash size={14} />
                </button>
              )}
            </div>
            <FieldInput
              value={ds.data.join(", ")}
              onChange={(v) => {
                const updated = [...data.datasets];
                updated[i] = { ...ds, data: v.split(",").map((s) => Number(s.trim()) || 0) };
                updateData({ datasets: updated });
              }}
              placeholder="1, 2, 3"
            />
          </div>
        ))}
        <button
          onClick={() =>
            updateData({
              datasets: [
                ...data.datasets,
                { label: `Series ${data.datasets.length + 1}`, data: data.labels.map(() => 0) },
              ],
            })
          }
          className="w-full text-xs py-1.5 rounded-md border border-dashed border-border text-ink-muted hover:border-brand hover:text-brand transition-colors flex items-center justify-center gap-1"
        >
          <Plus size={12} /> Add Dataset
        </button>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table Editor
// ---------------------------------------------------------------------------

type TableBlock = Extract<ContentBlock, { type: "table" }>;

function TableEditor({ block, onUpdate }: { block: TableBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;

  const updateCell = (rowIdx: number, colIdx: number, value: string) => {
    const newRows = data.rows.map((row, ri) =>
      ri === rowIdx ? row.map((cell, ci) => (ci === colIdx ? value : cell)) : row
    );
    onUpdate({ ...block, data: { ...data, rows: newRows } });
  };

  const updateHeader = (colIdx: number, value: string) => {
    const newHeaders = data.headers.map((h, i) => (i === colIdx ? value : h));
    onUpdate({ ...block, data: { ...data, headers: newHeaders } });
  };

  const addRow = () => {
    const newRow = data.headers.map(() => "");
    onUpdate({ ...block, data: { ...data, rows: [...data.rows, newRow] } });
  };

  const addColumn = () => {
    onUpdate({
      ...block,
      data: {
        ...data,
        headers: [...data.headers, `Col ${data.headers.length + 1}`],
        rows: data.rows.map((row) => [...row, ""]),
      },
    });
  };

  const deleteRow = (idx: number) => {
    onUpdate({ ...block, data: { ...data, rows: data.rows.filter((_, i) => i !== idx) } });
  };

  const deleteColumn = (idx: number) => {
    onUpdate({
      ...block,
      data: {
        ...data,
        headers: data.headers.filter((_, i) => i !== idx),
        rows: data.rows.map((row) => row.filter((_, i) => i !== idx)),
      },
    });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Table">
        <div className="max-h-64 overflow-auto border border-border rounded-md">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-raised">
                {data.headers.map((h, ci) => (
                  <th key={ci} className="p-0 border-b border-r border-border">
                    <div className="flex items-center">
                      <input
                        value={h}
                        onChange={(e) => updateHeader(ci, e.target.value)}
                        className="w-full px-1.5 py-1 text-xs font-semibold bg-transparent focus:outline-none focus:bg-blue-50"
                      />
                      {data.headers.length > 1 && (
                        <button
                          onClick={() => deleteColumn(ci)}
                          className="p-0.5 text-red-400 hover:text-red-600 shrink-0"
                        >
                          <Trash size={10} />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                <th className="w-6 border-b border-border" />
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-surface-raised/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-0 border-b border-r border-border">
                      <input
                        value={cell}
                        onChange={(e) => updateCell(ri, ci, e.target.value)}
                        className="w-full px-1.5 py-1 text-xs bg-transparent focus:outline-none focus:bg-blue-50"
                      />
                    </td>
                  ))}
                  <td className="w-6 border-b border-border text-center">
                    {data.rows.length > 1 && (
                      <button
                        onClick={() => deleteRow(ri)}
                        className="p-0.5 text-red-400 hover:text-red-600"
                      >
                        <Trash size={10} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addRow}
            className="flex-1 text-xs py-1.5 rounded-md border border-dashed border-border text-ink-muted hover:border-brand hover:text-brand transition-colors flex items-center justify-center gap-1"
          >
            <Plus size={12} /> Row
          </button>
          <button
            onClick={addColumn}
            className="flex-1 text-xs py-1.5 rounded-md border border-dashed border-border text-ink-muted hover:border-brand hover:text-brand transition-colors flex items-center justify-center gap-1"
          >
            <Plus size={12} /> Column
          </button>
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat Editor
// ---------------------------------------------------------------------------

type StatBlock = Extract<ContentBlock, { type: "stat_result" }>;

function StatEditor({ block, onUpdate }: { block: StatBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const update = (partial: Partial<typeof data>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Statistic">
        <div>
          <FieldLabel>Label</FieldLabel>
          <FieldInput value={data.label} onChange={(v) => update({ label: v })} placeholder="e.g. p-value" />
        </div>
        <div>
          <FieldLabel>Value</FieldLabel>
          <FieldInput value={data.value} onChange={(v) => update({ value: v })} placeholder="e.g. 0.001" />
        </div>
        <div>
          <FieldLabel>Confidence Interval</FieldLabel>
          <FieldInput
            value={data.ci ?? ""}
            onChange={(v) => update({ ci: v || undefined })}
            placeholder="e.g. 95% CI [0.5, 1.2]"
          />
        </div>
        <div>
          <FieldLabel>P-Value</FieldLabel>
          <FieldInput
            value={data.pValue ?? ""}
            onChange={(v) => update({ pValue: v || undefined })}
            placeholder="e.g. <0.001"
          />
        </div>
        <div>
          <FieldLabel>Interpretation</FieldLabel>
          <FieldTextarea
            value={data.interpretation ?? ""}
            onChange={(v) => update({ interpretation: v || undefined })}
            placeholder="Statistical significance interpretation..."
            rows={2}
          />
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Image Editor
// ---------------------------------------------------------------------------

type ImageBlock = Extract<ContentBlock, { type: "image" }>;

function ImageEditor({ block, onUpdate }: { block: ImageBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const update = (partial: Partial<typeof data>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/slides/upload-image", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      update({ url });
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Image">
        {/* Upload area — click or drag-and-drop */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-brand bg-brand/5"
              : "border-border hover:border-brand"
          }`}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) handleFileUpload(file);
            };
            input.click();
          }}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {data.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.url} alt={data.alt} className="max-h-32 mx-auto rounded" />
          ) : (
            <div className="space-y-1">
              {uploading ? (
                <p className="text-xs text-ink-muted">Uploading...</p>
              ) : dragOver ? (
                <p className="text-xs text-brand font-medium">Drop image here</p>
              ) : (
                <>
                  <Upload size={24} className="mx-auto text-ink-muted" />
                  <p className="text-xs text-ink-muted">Click or drag an image here</p>
                </>
              )}
            </div>
          )}
        </div>

        <div>
          <FieldLabel>Image URL</FieldLabel>
          <FieldInput
            value={data.url ?? ""}
            onChange={(v) => update({ url: v || undefined })}
            placeholder="https://... or upload above"
          />
        </div>
        <div>
          <FieldLabel>Alt Text</FieldLabel>
          <FieldInput value={data.alt} onChange={(v) => update({ alt: v })} placeholder="Description of image" />
        </div>
        <div>
          <FieldLabel>Caption</FieldLabel>
          <FieldInput
            value={data.caption ?? ""}
            onChange={(v) => update({ caption: v || undefined })}
            placeholder="Figure caption"
          />
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Math Editor
// ---------------------------------------------------------------------------

type MathBlock = Extract<ContentBlock, { type: "math" }>;

function MathEditor({ block, onUpdate }: { block: MathBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const update = (partial: Partial<typeof data>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Math Expression">
        <div>
          <FieldLabel>LaTeX Expression</FieldLabel>
          <FieldTextarea
            value={data.expression}
            onChange={(v) => update({ expression: v })}
            placeholder="e.g. E = mc^2"
            rows={3}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.displayMode}
            onChange={(e) => update({ displayMode: e.target.checked })}
            className="rounded border-border"
          />
          <span className="text-xs text-ink">Display mode (centered, larger)</span>
        </div>
        <div>
          <FieldLabel>Caption</FieldLabel>
          <FieldInput
            value={data.caption ?? ""}
            onChange={(v) => update({ caption: v || undefined })}
            placeholder="Equation caption"
          />
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Code Editor
// ---------------------------------------------------------------------------

type CodeBlock = Extract<ContentBlock, { type: "code" }>;

function CodeEditor({ block, onUpdate }: { block: CodeBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const update = (partial: Partial<typeof data>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Code Block">
        <div>
          <FieldLabel>Language</FieldLabel>
          <FieldSelect
            value={data.language}
            onChange={(v) => update({ language: v })}
            options={[
              { value: "python", label: "Python" },
              { value: "javascript", label: "JavaScript" },
              { value: "typescript", label: "TypeScript" },
              { value: "r", label: "R" },
              { value: "sql", label: "SQL" },
              { value: "bash", label: "Bash" },
              { value: "java", label: "Java" },
              { value: "cpp", label: "C++" },
              { value: "latex", label: "LaTeX" },
              { value: "json", label: "JSON" },
            ]}
          />
        </div>
        <div>
          <FieldLabel>Code</FieldLabel>
          <FieldTextarea
            value={data.code}
            onChange={(v) => update({ code: v })}
            placeholder="Enter code..."
            rows={8}
          />
        </div>
        <div>
          <FieldLabel>Caption</FieldLabel>
          <FieldInput
            value={data.caption ?? ""}
            onChange={(v) => update({ caption: v || undefined })}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.showLineNumbers ?? false}
            onChange={(e) => update({ showLineNumbers: e.target.checked })}
            className="rounded border-border"
          />
          <span className="text-xs text-ink">Show line numbers</span>
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Callout Editor
// ---------------------------------------------------------------------------

type CalloutBlock = Extract<ContentBlock, { type: "callout" }>;

function CalloutEditor({ block, onUpdate }: { block: CalloutBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const update = (partial: Partial<typeof data>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Callout">
        <div>
          <FieldLabel>Type</FieldLabel>
          <FieldSelect
            value={data.type}
            onChange={(v) => update({ type: v as typeof data.type })}
            options={[
              { value: "finding", label: "Finding" },
              { value: "limitation", label: "Limitation" },
              { value: "methodology", label: "Methodology" },
              { value: "clinical", label: "Clinical" },
              { value: "warning", label: "Warning" },
              { value: "info", label: "Info" },
              { value: "success", label: "Success" },
            ]}
          />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <FieldInput
            value={data.title ?? ""}
            onChange={(v) => update({ title: v || undefined })}
            placeholder="Optional title"
          />
        </div>
        <div>
          <FieldLabel>Text</FieldLabel>
          <FieldTextarea
            value={data.text}
            onChange={(v) => update({ text: v })}
            placeholder="Callout content..."
          />
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Citation Editor
// ---------------------------------------------------------------------------

type CitationBlock = Extract<ContentBlock, { type: "citation" }>;

function CitationEditor({ block, onUpdate }: { block: CitationBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const update = (partial: Partial<typeof data>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Citation">
        <div>
          <FieldLabel>Citation Text</FieldLabel>
          <FieldTextarea value={data.text} onChange={(v) => update({ text: v })} rows={2} />
        </div>
        <div>
          <FieldLabel>Source</FieldLabel>
          <FieldInput value={data.source} onChange={(v) => update({ source: v })} placeholder="Author et al., Year" />
        </div>
        <div>
          <FieldLabel>DOI</FieldLabel>
          <FieldInput value={data.doi ?? ""} onChange={(v) => update({ doi: v || undefined })} placeholder="10.xxxx/xxxxx" />
        </div>
        <div>
          <FieldLabel>Authors (comma-separated)</FieldLabel>
          <FieldInput
            value={(data.authors ?? []).join(", ")}
            onChange={(v) => update({ authors: v ? v.split(",").map((s) => s.trim()) : undefined })}
            placeholder="Smith, J., Doe, A."
          />
        </div>
        <div>
          <FieldLabel>Year</FieldLabel>
          <FieldInput
            value={data.year ? String(data.year) : ""}
            onChange={(v) => update({ year: v ? Number(v) : undefined })}
            placeholder="2024"
            type="number"
          />
        </div>
        <div>
          <FieldLabel>Journal</FieldLabel>
          <FieldInput value={data.journal ?? ""} onChange={(v) => update({ journal: v || undefined })} />
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline Editor
// ---------------------------------------------------------------------------

type TimelineBlock = Extract<ContentBlock, { type: "timeline" }>;

function TimelineEditor({ block, onUpdate }: { block: TimelineBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;

  const updateEntry = (idx: number, partial: Partial<typeof data.entries[0]>) => {
    const entries = data.entries.map((e, i) => (i === idx ? { ...e, ...partial } : e));
    onUpdate({ ...block, data: { ...data, entries } });
  };

  const addEntry = () => {
    onUpdate({
      ...block,
      data: {
        ...data,
        entries: [...data.entries, { label: "New Phase", date: "", description: "", status: "upcoming" as const }],
      },
    });
  };

  const deleteEntry = (idx: number) => {
    onUpdate({ ...block, data: { ...data, entries: data.entries.filter((_, i) => i !== idx) } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Timeline">
        {data.entries.map((entry, i) => (
          <div key={i} className="p-2 rounded-md border border-border bg-surface-raised/50 space-y-1.5">
            <div className="flex items-center gap-1">
              <FieldInput value={entry.label} onChange={(v) => updateEntry(i, { label: v })} placeholder="Phase name" />
              <button onClick={() => deleteEntry(i)} className="p-1 text-red-500 hover:bg-red-50 rounded shrink-0">
                <Trash size={14} />
              </button>
            </div>
            <div className="flex gap-1">
              <FieldInput value={entry.date ?? ""} onChange={(v) => updateEntry(i, { date: v })} placeholder="Date" />
              <FieldSelect
                value={entry.status ?? "upcoming"}
                onChange={(v) => updateEntry(i, { status: v as "completed" | "in_progress" | "upcoming" })}
                options={[
                  { value: "completed", label: "Done" },
                  { value: "in_progress", label: "Active" },
                  { value: "upcoming", label: "Upcoming" },
                ]}
              />
            </div>
            <FieldInput
              value={entry.description ?? ""}
              onChange={(v) => updateEntry(i, { description: v })}
              placeholder="Description"
            />
          </div>
        ))}
        <button
          onClick={addEntry}
          className="w-full text-xs py-1.5 rounded-md border border-dashed border-border text-ink-muted hover:border-brand hover:text-brand transition-colors flex items-center justify-center gap-1"
        >
          <Plus size={12} /> Add Entry
        </button>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Diagram Editor
// ---------------------------------------------------------------------------

type DiagramBlock = Extract<ContentBlock, { type: "diagram" }>;

function DiagramEditor({ block, onUpdate }: { block: DiagramBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const update = (partial: Partial<typeof data>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Mermaid Diagram">
        <div>
          <FieldLabel>Diagram Type</FieldLabel>
          <FieldSelect
            value={data.diagramType}
            onChange={(v) => update({ diagramType: v as typeof data.diagramType })}
            options={[
              { value: "flowchart", label: "Flowchart" },
              { value: "sequence", label: "Sequence" },
              { value: "classDiagram", label: "Class Diagram" },
              { value: "stateDiagram", label: "State Diagram" },
              { value: "erDiagram", label: "ER Diagram" },
              { value: "gantt", label: "Gantt" },
              { value: "pie", label: "Pie" },
              { value: "mindmap", label: "Mind Map" },
              { value: "timeline", label: "Timeline" },
            ]}
          />
        </div>
        <div>
          <FieldLabel>Mermaid Syntax</FieldLabel>
          <FieldTextarea
            value={data.syntax}
            onChange={(v) => update({ syntax: v })}
            placeholder="graph TD\n  A-->B"
            rows={8}
          />
        </div>
        <div>
          <FieldLabel>Caption</FieldLabel>
          <FieldInput
            value={data.caption ?? ""}
            onChange={(v) => update({ caption: v || undefined })}
          />
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Divider Editor
// ---------------------------------------------------------------------------

type DividerBlock = Extract<ContentBlock, { type: "divider" }>;

function DividerEditor({ block, onUpdate }: { block: DividerBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;

  return (
    <div className="space-y-3">
      <EditorSection title="Divider">
        <div>
          <FieldLabel>Style</FieldLabel>
          <FieldSelect
            value={data.style ?? "solid"}
            onChange={(v) => onUpdate({ ...block, data: { style: v as "solid" | "dashed" | "gradient" } })}
            options={[
              { value: "solid", label: "Solid" },
              { value: "dashed", label: "Dashed" },
              { value: "gradient", label: "Gradient" },
            ]}
          />
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bibliography Editor
// ---------------------------------------------------------------------------

type BibliographyBlock = Extract<ContentBlock, { type: "bibliography" }>;

function BibliographyEditor({ block, onUpdate }: { block: BibliographyBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;

  const updateEntry = (idx: number, partial: Partial<typeof data.entries[0]>) => {
    const entries = data.entries.map((e, i) => (i === idx ? { ...e, ...partial } : e));
    onUpdate({ ...block, data: { ...data, entries } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Bibliography">
        <div>
          <FieldLabel>Citation Style</FieldLabel>
          <FieldSelect
            value={data.style}
            onChange={(v) => onUpdate({ ...block, data: { ...data, style: v as typeof data.style } })}
            options={[
              { value: "apa", label: "APA" },
              { value: "mla", label: "MLA" },
              { value: "chicago", label: "Chicago" },
              { value: "vancouver", label: "Vancouver" },
              { value: "harvard", label: "Harvard" },
            ]}
          />
        </div>
        {data.entries.map((entry, i) => (
          <div key={i} className="p-2 rounded-md border border-border bg-surface-raised/50 space-y-1.5">
            <FieldTextarea
              value={entry.formatted}
              onChange={(v) => updateEntry(i, { formatted: v })}
              placeholder="Formatted citation..."
              rows={2}
            />
            <FieldInput
              value={entry.doi ?? ""}
              onChange={(v) => updateEntry(i, { doi: v || undefined })}
              placeholder="DOI"
            />
          </div>
        ))}
        <button
          onClick={() =>
            onUpdate({
              ...block,
              data: {
                ...data,
                entries: [
                  ...data.entries,
                  { id: Date.now(), formatted: "", doi: undefined },
                ],
              },
            })
          }
          className="w-full text-xs py-1.5 rounded-md border border-dashed border-border text-ink-muted hover:border-brand hover:text-brand transition-colors flex items-center justify-center gap-1"
        >
          <Plus size={12} /> Add Reference
        </button>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Embed Block Editor
// ---------------------------------------------------------------------------

type EmbedBlock = ContentBlock & { type: "embed"; data: EmbedData };

const EMBED_TYPES: { value: string; label: string }[] = [
  { value: "youtube", label: "YouTube" },
  { value: "vimeo", label: "Vimeo" },
  { value: "figma", label: "Figma" },
  { value: "google_sheets", label: "Google Sheets" },
  { value: "google_docs", label: "Google Docs" },
  { value: "twitter", label: "Twitter" },
  { value: "generic", label: "Generic" },
];

function EmbedEditor({ block, onUpdate }: { block: EmbedBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const update = (partial: Partial<EmbedData>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Embed">
        <div>
          <FieldLabel>URL</FieldLabel>
          <FieldInput
            value={data.url ?? ""}
            onChange={(v) => update({ url: v })}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
        <div>
          <FieldLabel>Embed Type</FieldLabel>
          <FieldSelect
            value={data.embedType ?? "generic"}
            onChange={(v) => update({ embedType: v as EmbedData["embedType"] })}
            options={EMBED_TYPES}
          />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <FieldInput
            value={data.title ?? ""}
            onChange={(v) => update({ title: v })}
            placeholder="Optional title"
          />
        </div>
        <div>
          <FieldLabel>Aspect Ratio</FieldLabel>
          <FieldSelect
            value={data.aspectRatio ?? "16:9"}
            onChange={(v) => update({ aspectRatio: v as EmbedData["aspectRatio"] })}
            options={[
              { value: "16:9", label: "16:9 (Widescreen)" },
              { value: "4:3", label: "4:3 (Standard)" },
              { value: "1:1", label: "1:1 (Square)" },
            ]}
          />
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toggle Block Editor
// ---------------------------------------------------------------------------

type ToggleBlock = ContentBlock & { type: "toggle"; data: ToggleData };

function ToggleEditor({ block, onUpdate }: { block: ToggleBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const update = (partial: Partial<ToggleData>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Toggle / Accordion">
        <div>
          <FieldLabel>Header</FieldLabel>
          <FieldInput
            value={data.title ?? ""}
            onChange={(v) => update({ title: v })}
            placeholder="Toggle header text"
          />
        </div>
        <div>
          <FieldLabel>Content</FieldLabel>
          <FieldTextarea
            value={data.content ?? ""}
            onChange={(v) => update({ content: v })}
            placeholder="Content shown when expanded"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.defaultOpen ?? false}
            onChange={(e) => update({ defaultOpen: e.target.checked })}
            className="rounded border-border"
          />
          <span className="text-xs text-ink-muted">Open by default</span>
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nested Card Block Editor
// ---------------------------------------------------------------------------

type NestedCardBlock = ContentBlock & { type: "nested_card"; data: NestedCardData };

function NestedCardEditor({ block, onUpdate }: { block: NestedCardBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;

  return (
    <div className="space-y-3">
      <EditorSection title="Nested Card">
        <div>
          <FieldLabel>Title</FieldLabel>
          <FieldInput
            value={data.title ?? ""}
            onChange={(v) => onUpdate({ ...block, data: { ...data, title: v } })}
            placeholder="Sub-section title"
          />
        </div>
        <div className="text-[10px] text-ink-muted">
          Contains {data.contentBlocks?.length ?? 0} inner block(s).
          Edit inner blocks by clicking on them in the canvas.
        </div>
      </EditorSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animation Section — shown below every block editor
// ---------------------------------------------------------------------------

const ANIMATION_TYPES: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "fadeIn", label: "Fade In" },
  { value: "slideUp", label: "Slide Up" },
  { value: "slideLeft", label: "Slide Left" },
  { value: "scaleIn", label: "Scale In" },
  { value: "typewriter", label: "Typewriter" },
];

function AnimationSection({
  block,
  onUpdate,
}: {
  block: ContentBlock;
  onUpdate: (b: ContentBlock) => void;
}) {
  const anim: BlockAnimation = block.animation ?? { type: "none", delay: 0, duration: 0.4, order: 0 };

  function updateAnimation(partial: Partial<BlockAnimation>) {
    const updated = { ...anim, ...partial };
    onUpdate({ ...block, animation: updated.type === "none" ? undefined : updated });
  }

  return (
    <div className="px-3 py-3 border-t border-border">
      <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider mb-2">
        Animation
      </div>
      <div className="space-y-2">
        <div>
          <FieldLabel>Effect</FieldLabel>
          <FieldSelect
            value={anim.type}
            onChange={(v) => updateAnimation({ type: v as BlockAnimation["type"] })}
            options={ANIMATION_TYPES}
          />
        </div>
        {anim.type !== "none" && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <FieldLabel>Duration (s)</FieldLabel>
                <FieldInput
                  type="number"
                  value={String(anim.duration)}
                  onChange={(v) => updateAnimation({ duration: parseFloat(v) || 0.4 })}
                  placeholder="0.4"
                />
              </div>
              <div>
                <FieldLabel>Delay (s)</FieldLabel>
                <FieldInput
                  type="number"
                  value={String(anim.delay)}
                  onChange={(v) => updateAnimation({ delay: parseFloat(v) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <FieldLabel>Order</FieldLabel>
              <FieldInput
                type="number"
                value={String(anim.order)}
                onChange={(v) => updateAnimation({ order: parseInt(v) || 0 })}
                placeholder="0"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InfographicEditor — edit infographic type, items, colors
// ---------------------------------------------------------------------------

const INFOGRAPHIC_TYPE_OPTIONS: { value: InfographicType; label: string }[] = [
  { value: "process_flow", label: "Process Flow" },
  { value: "comparison", label: "Comparison" },
  { value: "hierarchy", label: "Hierarchy" },
  { value: "cycle", label: "Cycle" },
  { value: "funnel", label: "Funnel" },
  { value: "pyramid", label: "Pyramid" },
  { value: "venn", label: "Venn Diagram" },
  { value: "matrix", label: "2×2 Matrix" },
  { value: "radial", label: "Radial / Hub" },
  { value: "stats_row", label: "Stats Row" },
  { value: "checklist", label: "Checklist" },
  { value: "cause_effect", label: "Cause & Effect" },
];

const COLOR_SCHEME_OPTIONS = [
  { value: "theme", label: "Theme" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "rainbow", label: "Rainbow" },
];

function InfographicEditor({
  block,
  onUpdate,
}: {
  block: ContentBlock & { type: "infographic" };
  onUpdate: (b: ContentBlock) => void;
}) {
  const data = block.data as InfographicData;

  function updateData(partial: Partial<InfographicData>) {
    onUpdate({ ...block, data: { ...data, ...partial } });
  }

  function updateItem(index: number, partial: Partial<InfographicItem>) {
    const items = [...data.items];
    items[index] = { ...items[index], ...partial };
    updateData({ items });
  }

  function addItem() {
    updateData({
      items: [...data.items, { label: `Item ${data.items.length + 1}`, description: "" }],
    });
  }

  function removeItem(index: number) {
    updateData({ items: data.items.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-3 px-3 py-3">
      <FieldLabel>Infographic</FieldLabel>

      {/* Type selector */}
      <div>
        <FieldLabel>Visual Type</FieldLabel>
        <FieldSelect
          value={data.infographicType}
          onChange={(v) => updateData({ infographicType: v as InfographicType })}
          options={INFOGRAPHIC_TYPE_OPTIONS}
        />
      </div>

      {/* Title */}
      <div>
        <FieldLabel>Title</FieldLabel>
        <FieldInput
          value={data.title ?? ""}
          onChange={(v) => updateData({ title: v })}
          placeholder="Visual title"
        />
      </div>

      {/* Color scheme */}
      <div>
        <FieldLabel>Color Scheme</FieldLabel>
        <FieldSelect
          value={data.colorScheme ?? "theme"}
          onChange={(v) => updateData({ colorScheme: v as InfographicData["colorScheme"] })}
          options={COLOR_SCHEME_OPTIONS}
        />
      </div>

      {/* Items */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <FieldLabel>Items</FieldLabel>
          <button
            onClick={addItem}
            className="flex items-center gap-0.5 text-[10px] text-brand hover:underline"
          >
            <Plus size={10} /> Add
          </button>
        </div>
        <div className="space-y-2">
          {data.items.map((item, i) => (
            <div key={i} className="p-2 rounded-lg bg-surface-raised border border-border space-y-1.5">
              <div className="flex gap-1">
                <FieldInput
                  value={item.label}
                  onChange={(v) => updateItem(i, { label: v })}
                  placeholder="Label"
                />
                <button
                  onClick={() => removeItem(i)}
                  className="p-1 text-red-400 hover:text-red-500"
                >
                  <Trash size={10} />
                </button>
              </div>
              <FieldInput
                value={item.description ?? ""}
                onChange={(v) => updateItem(i, { description: v })}
                placeholder="Description"
              />
              <div className="flex gap-1">
                <FieldInput
                  value={item.value ?? ""}
                  onChange={(v) => updateItem(i, { value: v })}
                  placeholder="Value"
                />
                <FieldInput
                  value={item.icon ?? ""}
                  onChange={(v) => updateItem(i, { icon: v })}
                  placeholder="Icon (emoji)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <div>
        <FieldLabel>Caption</FieldLabel>
        <FieldInput
          value={data.caption ?? ""}
          onChange={(v) => updateData({ caption: v })}
          placeholder="Optional caption"
        />
      </div>
    </div>
  );
}
