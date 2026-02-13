"use client";

import { useState, useRef, useCallback } from "react";
import { Plus, Trash, ArrowUp, ArrowDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ContentBlock, ThemeConfig } from "@/types/presentation";

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  theme: ThemeConfig;
  onChange: (blocks: ContentBlock[]) => void;
}

export function ContentBlockEditor({ blocks, theme, onChange }: ContentBlockEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const updateBlock = (index: number, block: ContentBlock) => {
    const next = [...blocks];
    next[index] = block;
    onChange(next);
  };

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
    setEditingIndex(null);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    onChange(next);
    setEditingIndex(newIndex);
  };

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock = createDefaultBlock(type);
    onChange([...blocks, newBlock]);
    setEditingIndex(blocks.length);
  };

  return (
    <div className="space-y-2">
      {blocks.map((block, i) => (
        <div
          key={i}
          className={cn(
            "group relative rounded-lg border transition-colors",
            editingIndex === i ? "border-brand/50 bg-surface-raised/50" : "border-transparent hover:border-border"
          )}
          onClick={() => setEditingIndex(i)}
        >
          {/* Block Controls */}
          {editingIndex === i && (
            <div className="absolute -right-2 top-0 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {i > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); moveBlock(i, -1); }}
                  className="p-0.5 rounded bg-surface-raised border border-border text-ink-muted hover:text-ink"
                >
                  <ArrowUp size={10} />
                </button>
              )}
              {i < blocks.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); moveBlock(i, 1); }}
                  className="p-0.5 rounded bg-surface-raised border border-border text-ink-muted hover:text-ink"
                >
                  <ArrowDown size={10} />
                </button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); removeBlock(i); }}
                className="p-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20"
              >
                <Trash size={10} />
              </button>
            </div>
          )}

          <div className="p-2">
            <BlockEditor block={block} theme={theme} onChange={(b) => updateBlock(i, b)} isActive={editingIndex === i} />
          </div>
        </div>
      ))}

      {/* Add Block Menu */}
      <div className="flex items-center gap-1.5 pt-1">
        {(["text", "bullets", "image", "chart", "table", "quote", "citation"] as ContentBlock["type"][]).map((type) => (
          <button
            key={type}
            onClick={() => addBlock(type)}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-ink-muted border border-border hover:bg-surface-raised transition-colors"
          >
            <Plus size={10} />
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

function BlockEditor({
  block,
  theme,
  onChange,
  isActive,
}: {
  block: ContentBlock;
  theme: ThemeConfig;
  onChange: (block: ContentBlock) => void;
  isActive: boolean;
}) {
  switch (block.type) {
    case "text":
      return (
        <div>
          {isActive && (
            <select
              value={block.data.style ?? "body"}
              onChange={(e) => onChange({ ...block, data: { ...block.data, style: e.target.value as any } })}
              className="text-[10px] mb-1 bg-transparent border border-border rounded px-1 py-0.5 text-ink-muted"
            >
              <option value="title">Title</option>
              <option value="subtitle">Subtitle</option>
              <option value="body">Body</option>
              <option value="caption">Caption</option>
            </select>
          )}
          <EditableText
            value={block.data.text}
            onChange={(text) => onChange({ ...block, data: { ...block.data, text } })}
            className={cn(
              block.data.style === "title" && "text-lg font-bold",
              block.data.style === "subtitle" && "text-sm opacity-70",
              block.data.style === "caption" && "text-xs opacity-50",
              (!block.data.style || block.data.style === "body") && "text-sm",
            )}
          />
        </div>
      );

    case "bullets":
      return (
        <div>
          {isActive && (
            <label className="flex items-center gap-1 text-[10px] text-ink-muted mb-1">
              <input
                type="checkbox"
                checked={block.data.ordered ?? false}
                onChange={(e) => onChange({ ...block, data: { ...block.data, ordered: e.target.checked } })}
                className="w-3 h-3"
              />
              Numbered
            </label>
          )}
          <div className="space-y-0.5">
            {block.data.items.map((item, i) => (
              <div key={i} className="flex items-start gap-1">
                <span className="text-sm text-ink-muted shrink-0 mt-0.5">
                  {block.data.ordered ? `${i + 1}.` : "•"}
                </span>
                <EditableText
                  value={item}
                  onChange={(text) => {
                    const items = [...block.data.items];
                    items[i] = text;
                    onChange({ ...block, data: { ...block.data, items } });
                  }}
                  className="text-sm flex-1"
                />
                {isActive && block.data.items.length > 1 && (
                  <button
                    onClick={() => {
                      const items = block.data.items.filter((_, idx) => idx !== i);
                      onChange({ ...block, data: { ...block.data, items } });
                    }}
                    className="text-red-400 hover:text-red-500 shrink-0"
                  >
                    <Trash size={10} />
                  </button>
                )}
              </div>
            ))}
            {isActive && (
              <button
                onClick={() => onChange({ ...block, data: { ...block.data, items: [...block.data.items, "New item"] } })}
                className="text-[10px] text-brand hover:underline"
              >
                + Add item
              </button>
            )}
          </div>
        </div>
      );

    case "quote":
      return (
        <div className="pl-3 border-l-2" style={{ borderColor: theme.accentColor }}>
          <EditableText
            value={block.data.text}
            onChange={(text) => onChange({ ...block, data: { ...block.data, text } })}
            className="text-sm italic"
          />
          <EditableText
            value={block.data.attribution}
            onChange={(attribution) => onChange({ ...block, data: { ...block.data, attribution } })}
            className="text-xs text-ink-muted mt-1"
            placeholder="Attribution"
          />
        </div>
      );

    case "citation":
      return (
        <div className="pl-3 border-l-2" style={{ borderColor: theme.accentColor }}>
          <EditableText
            value={block.data.text}
            onChange={(text) => onChange({ ...block, data: { ...block.data, text } })}
            className="text-xs"
          />
          <EditableText
            value={block.data.source}
            onChange={(source) => onChange({ ...block, data: { ...block.data, source } })}
            className="text-[10px] text-ink-muted mt-0.5"
            placeholder="Source"
          />
        </div>
      );

    case "image":
      return (
        <div className="flex flex-col items-center gap-1 p-3 rounded-lg" style={{ backgroundColor: theme.primaryColor + "08" }}>
          {block.data.url ? (
            <img src={block.data.url} alt={block.data.alt} className="max-h-32 object-contain rounded" />
          ) : (
            <div className="w-full h-20 rounded border-2 border-dashed border-border flex items-center justify-center text-xs text-ink-muted">
              {block.data.suggestion ?? "Image placeholder"}
            </div>
          )}
          {isActive && (
            <EditableText
              value={block.data.alt}
              onChange={(alt) => onChange({ ...block, data: { ...block.data, alt } })}
              className="text-[10px] text-ink-muted w-full text-center"
              placeholder="Alt text"
            />
          )}
        </div>
      );

    case "chart":
      return (
        <div className="p-2 rounded border border-border">
          <p className="text-xs font-medium mb-1">{block.data.chartType} chart: {block.data.title}</p>
          <p className="text-[10px] text-ink-muted">
            {block.data.labels.length} labels, {block.data.datasets.length} dataset(s)
          </p>
        </div>
      );

    case "table":
      return (
        <div className="overflow-auto text-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {block.data.headers.map((h, i) => (
                  <th key={i} className="px-2 py-1 text-left font-medium border-b-2" style={{ borderColor: theme.primaryColor }}>
                    {isActive ? (
                      <EditableText
                        value={h}
                        onChange={(val) => {
                          const headers = [...block.data.headers];
                          headers[i] = val;
                          onChange({ ...block, data: { ...block.data, headers } });
                        }}
                        className="text-xs font-medium"
                      />
                    ) : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.data.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-2 py-1 border-b border-border">
                      {isActive ? (
                        <EditableText
                          value={cell}
                          onChange={(val) => {
                            const rows = block.data.rows.map((r) => [...r]);
                            rows[ri][ci] = val;
                            onChange({ ...block, data: { ...block.data, rows } });
                          }}
                          className="text-xs"
                        />
                      ) : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return <p className="text-xs text-ink-muted">Unknown block type</p>;
  }
}

function EditableText({
  value,
  onChange,
  className,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}) {
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent || "")}
      className={cn("focus:outline-none focus:ring-1 focus:ring-brand/30 rounded px-0.5 min-h-[1.2em]", className)}
      data-placeholder={placeholder}
    >
      {value}
    </div>
  );
}

function createDefaultBlock(type: ContentBlock["type"]): ContentBlock {
  switch (type) {
    case "text": return { type: "text", data: { text: "Enter text here", style: "body" } };
    case "bullets": return { type: "bullets", data: { items: ["First point", "Second point"], ordered: false } };
    case "image": return { type: "image", data: { alt: "Image description", suggestion: "Add an image" } };
    case "chart": return { type: "chart", data: { chartType: "bar", title: "Chart Title", labels: ["A", "B", "C"], datasets: [{ label: "Data", data: [10, 20, 30] }] } };
    case "table": return { type: "table", data: { headers: ["Column 1", "Column 2"], rows: [["Cell 1", "Cell 2"]] } };
    case "citation": return { type: "citation", data: { text: "Citation text", source: "Source" } };
    case "quote": return { type: "quote", data: { text: "Quote text", attribution: "Author" } };
  }
}
