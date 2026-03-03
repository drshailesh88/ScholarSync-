"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus, Trash, ArrowUp, ArrowDown,
  MathOperations, TreeStructure, Code, Megaphone,
  ChartBar, BookOpen, Clock, Minus,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ContentBlock, ThemeConfig } from "@/types/presentation";

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  theme: ThemeConfig;
  onChange: (blocks: ContentBlock[]) => void;
}

// Block type categories for the add menu
const BLOCK_CATEGORIES = {
  content: ["text", "bullets", "quote", "citation"] as ContentBlock["type"][],
  media: ["image", "chart", "table"] as ContentBlock["type"][],
  academic: ["math", "diagram", "code", "callout", "stat_result", "bibliography", "timeline", "divider"] as ContentBlock["type"][],
};

const BLOCK_LABELS: Record<string, string> = {
  text: "Text",
  bullets: "Bullets",
  image: "Image",
  chart: "Chart",
  table: "Table",
  citation: "Citation",
  quote: "Quote",
  math: "Math",
  diagram: "Diagram",
  code: "Code",
  callout: "Callout",
  stat_result: "Stat",
  bibliography: "Bibliography",
  timeline: "Timeline",
  divider: "Divider",
};

const BLOCK_ICONS: Record<string, React.ReactNode> = {
  math: <MathOperations size={10} />,
  diagram: <TreeStructure size={10} />,
  code: <Code size={10} />,
  callout: <Megaphone size={10} />,
  stat_result: <ChartBar size={10} />,
  bibliography: <BookOpen size={10} />,
  timeline: <Clock size={10} />,
  divider: <Minus size={10} />,
};

export function ContentBlockEditor({ blocks, theme, onChange }: ContentBlockEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAllBlocks, setShowAllBlocks] = useState(false);

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
    setShowAllBlocks(false);
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
      <div className="space-y-1.5 pt-1">
        {/* Primary blocks row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {BLOCK_CATEGORIES.content.map((type) => (
            <button
              key={type}
              onClick={() => addBlock(type)}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-ink-muted border border-border hover:bg-surface-raised transition-colors"
            >
              <Plus size={10} />
              {BLOCK_LABELS[type]}
            </button>
          ))}
          {BLOCK_CATEGORIES.media.map((type) => (
            <button
              key={type}
              onClick={() => addBlock(type)}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-ink-muted border border-border hover:bg-surface-raised transition-colors"
            >
              <Plus size={10} />
              {BLOCK_LABELS[type]}
            </button>
          ))}
          <button
            onClick={() => setShowAllBlocks(!showAllBlocks)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-[10px] border transition-colors",
              showAllBlocks
                ? "text-brand border-brand/30 bg-brand/5"
                : "text-ink-muted border-border hover:bg-surface-raised"
            )}
          >
            <Plus size={10} />
            More
          </button>
        </div>

        {/* Academic blocks row (expanded) */}
        {showAllBlocks && (
          <div className="flex items-center gap-1.5 flex-wrap pl-1 border-l-2 border-brand/20">
            {BLOCK_CATEGORIES.academic.map((type) => (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-brand/80 border border-brand/20 hover:bg-brand/5 transition-colors"
              >
                {BLOCK_ICONS[type] ?? <Plus size={10} />}
                {BLOCK_LABELS[type]}
              </button>
            ))}
          </div>
        )}
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
              onChange={(e) => onChange({ ...block, data: { ...block.data, style: e.target.value as "title" | "subtitle" | "body" | "caption" } })}
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
          {isActive && (
            <div className="mt-1 flex gap-2">
              <input
                value={block.data.doi ?? ""}
                onChange={(e) => onChange({ ...block, data: { ...block.data, doi: e.target.value } })}
                className="flex-1 text-[10px] px-1.5 py-0.5 rounded border border-border bg-transparent text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/30"
                placeholder="DOI (e.g., 10.1000/xyz123)"
              />
              <input
                value={block.data.year?.toString() ?? ""}
                onChange={(e) => onChange({ ...block, data: { ...block.data, year: e.target.value ? parseInt(e.target.value) : undefined } })}
                className="w-16 text-[10px] px-1.5 py-0.5 rounded border border-border bg-transparent text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/30"
                placeholder="Year"
              />
            </div>
          )}
        </div>
      );

    case "image":
      return (
        <div className="flex flex-col items-center gap-1 p-3 rounded-lg" style={{ backgroundColor: theme.primaryColor + "08" }}>
          {block.data.url ? (
            <Image src={block.data.url} alt={block.data.alt} width={400} height={128} className="max-h-32 object-contain rounded" unoptimized />
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

    // -----------------------------------------------------------------------
    // V2: New academic content block editors
    // -----------------------------------------------------------------------

    case "math":
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <MathOperations size={12} className="text-ink-muted" />
            <span className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">LaTeX Math</span>
            {isActive && (
              <label className="flex items-center gap-1 text-[10px] text-ink-muted ml-auto">
                <input
                  type="checkbox"
                  checked={block.data.displayMode}
                  onChange={(e) => onChange({ ...block, data: { ...block.data, displayMode: e.target.checked } })}
                  className="w-3 h-3"
                />
                Display mode
              </label>
            )}
          </div>
          <textarea
            value={block.data.expression}
            onChange={(e) => onChange({ ...block, data: { ...block.data, expression: e.target.value } })}
            className="w-full px-2 py-1.5 rounded border border-border bg-surface-raised text-xs font-mono text-ink focus:outline-none focus:ring-1 focus:ring-brand/30 resize-none"
            rows={2}
            placeholder="e.g., E = mc^2 or \frac{a}{b}"
          />
          {block.data.caption && isActive && (
            <EditableText
              value={block.data.caption}
              onChange={(caption) => onChange({ ...block, data: { ...block.data, caption } })}
              className="text-[10px] text-ink-muted"
              placeholder="Caption"
            />
          )}
        </div>
      );

    case "diagram":
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <TreeStructure size={12} className="text-ink-muted" />
            <span className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">Mermaid Diagram</span>
            {isActive && (
              <select
                value={block.data.diagramType}
                onChange={(e) => onChange({ ...block, data: { ...block.data, diagramType: e.target.value as typeof block.data.diagramType } })}
                className="text-[10px] ml-auto bg-transparent border border-border rounded px-1 py-0.5 text-ink-muted"
              >
                <option value="flowchart">Flowchart</option>
                <option value="sequence">Sequence</option>
                <option value="classDiagram">Class Diagram</option>
                <option value="gantt">Gantt</option>
                <option value="mindmap">Mind Map</option>
                <option value="timeline">Timeline</option>
                <option value="prisma">PRISMA Flow</option>
              </select>
            )}
          </div>
          <textarea
            value={block.data.syntax}
            onChange={(e) => onChange({ ...block, data: { ...block.data, syntax: e.target.value } })}
            className="w-full px-2 py-1.5 rounded border border-border bg-surface-raised text-xs font-mono text-ink focus:outline-none focus:ring-1 focus:ring-brand/30 resize-none"
            rows={4}
            placeholder={`graph TD\n    A[Start] --> B[Process]\n    B --> C[End]`}
          />
        </div>
      );

    case "code":
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <Code size={12} className="text-ink-muted" />
            <span className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">Code</span>
            {isActive && (
              <input
                value={block.data.language}
                onChange={(e) => onChange({ ...block, data: { ...block.data, language: e.target.value } })}
                className="text-[10px] ml-auto w-20 bg-transparent border border-border rounded px-1 py-0.5 text-ink-muted"
                placeholder="Language"
              />
            )}
          </div>
          <textarea
            value={block.data.code}
            onChange={(e) => onChange({ ...block, data: { ...block.data, code: e.target.value } })}
            className="w-full px-2 py-1.5 rounded border border-border text-xs font-mono text-ink focus:outline-none focus:ring-1 focus:ring-brand/30 resize-none"
            style={{ backgroundColor: theme.codeBackground ?? "#1E1E2E", color: "#E2E8F0" }}
            rows={4}
            placeholder="// Your code here"
          />
        </div>
      );

    case "callout":
      return (
        <div
          className="p-2.5 rounded-lg border-l-3"
          style={{
            borderLeftColor: getCalloutColor(block.data.type, theme),
            backgroundColor: getCalloutColor(block.data.type, theme) + "10",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Megaphone size={12} style={{ color: getCalloutColor(block.data.type, theme) }} />
            {isActive && (
              <select
                value={block.data.type}
                onChange={(e) => onChange({ ...block, data: { ...block.data, type: e.target.value as typeof block.data.type } })}
                className="text-[10px] bg-transparent border border-border rounded px-1 py-0.5 text-ink-muted"
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="finding">Key Finding</option>
                <option value="limitation">Limitation</option>
                <option value="methodology">Methodology</option>
                <option value="clinical">Clinical Note</option>
              </select>
            )}
            {block.data.title && (
              <EditableText
                value={block.data.title}
                onChange={(title) => onChange({ ...block, data: { ...block.data, title } })}
                className="text-xs font-semibold flex-1"
              />
            )}
          </div>
          <EditableText
            value={block.data.text}
            onChange={(text) => onChange({ ...block, data: { ...block.data, text } })}
            className="text-xs"
          />
        </div>
      );

    case "stat_result":
      return (
        <div className="p-2.5 rounded-lg border border-border bg-surface-raised/50">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <EditableText
                value={block.data.label}
                onChange={(label) => onChange({ ...block, data: { ...block.data, label } })}
                className="text-[10px] uppercase tracking-wider text-ink-muted font-medium"
                placeholder="Metric name"
              />
              <EditableText
                value={block.data.value}
                onChange={(value) => onChange({ ...block, data: { ...block.data, value } })}
                className="text-lg font-bold"
                style={{ color: theme.primaryColor }}
              />
            </div>
            {isActive && (
              <div className="space-y-1">
                <input
                  value={block.data.ci ?? ""}
                  onChange={(e) => onChange({ ...block, data: { ...block.data, ci: e.target.value } })}
                  className="w-full text-[10px] px-1.5 py-0.5 rounded border border-border bg-transparent text-ink-muted"
                  placeholder="95% CI"
                />
                <input
                  value={block.data.pValue ?? ""}
                  onChange={(e) => onChange({ ...block, data: { ...block.data, pValue: e.target.value } })}
                  className="w-full text-[10px] px-1.5 py-0.5 rounded border border-border bg-transparent text-ink-muted"
                  placeholder="p-value"
                />
              </div>
            )}
          </div>
          {block.data.interpretation && (
            <p className="text-[10px] text-ink-muted italic mt-1">{block.data.interpretation}</p>
          )}
        </div>
      );

    case "bibliography":
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={12} className="text-ink-muted" />
            <span className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">
              Bibliography ({block.data.style.toUpperCase()})
            </span>
          </div>
          <div className="space-y-0.5 text-[10px]">
            {block.data.entries.map((entry, i) => (
              <div key={entry.id} className="flex gap-1.5 text-ink-muted">
                <span className="shrink-0 font-medium">[{i + 1}]</span>
                <span>{entry.formatted}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "timeline":
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={12} className="text-ink-muted" />
            <span className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">Timeline</span>
          </div>
          <div className="space-y-1.5 pl-3 border-l-2" style={{ borderColor: theme.accentColor }}>
            {block.data.entries.map((entry, i) => (
              <div key={i} className="relative">
                <div
                  className="absolute -left-[0.95rem] top-1 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      entry.status === "completed" ? "#22C55E" :
                      entry.status === "in_progress" ? theme.primaryColor :
                      "#94A3B8",
                  }}
                />
                {isActive ? (
                  <div className="space-y-0.5">
                    <div className="flex gap-1">
                      <EditableText
                        value={entry.label}
                        onChange={(label) => {
                          const entries = [...block.data.entries];
                          entries[i] = { ...entries[i], label };
                          onChange({ ...block, data: { ...block.data, entries } });
                        }}
                        className="text-xs font-medium flex-1"
                      />
                      <input
                        value={entry.date ?? ""}
                        onChange={(e) => {
                          const entries = [...block.data.entries];
                          entries[i] = { ...entries[i], date: e.target.value };
                          onChange({ ...block, data: { ...block.data, entries } });
                        }}
                        className="w-20 text-[10px] px-1 py-0.5 rounded border border-border bg-transparent text-ink-muted"
                        placeholder="Date"
                      />
                    </div>
                    {entry.description && (
                      <EditableText
                        value={entry.description}
                        onChange={(description) => {
                          const entries = [...block.data.entries];
                          entries[i] = { ...entries[i], description };
                          onChange({ ...block, data: { ...block.data, entries } });
                        }}
                        className="text-[10px] text-ink-muted"
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-medium">{entry.label} {entry.date && <span className="text-ink-muted font-normal">— {entry.date}</span>}</p>
                    {entry.description && <p className="text-[10px] text-ink-muted">{entry.description}</p>}
                  </div>
                )}
              </div>
            ))}
            {isActive && (
              <button
                onClick={() => onChange({
                  ...block,
                  data: {
                    ...block.data,
                    entries: [...block.data.entries, { label: "New milestone", status: "upcoming" as const }],
                  },
                })}
                className="text-[10px] text-brand hover:underline"
              >
                + Add milestone
              </button>
            )}
          </div>
        </div>
      );

    case "divider":
      return (
        <div className="py-2">
          <hr
            className={cn(
              "border-t",
              block.data.style === "dashed" && "border-dashed",
            )}
            style={{
              borderColor: block.data.style === "gradient"
                ? undefined
                : theme.borderColor ?? theme.accentColor + "40",
              ...(block.data.style === "gradient" && {
                border: "none",
                height: "2px",
                background: `linear-gradient(to right, ${theme.primaryColor}, ${theme.accentColor})`,
              }),
            }}
          />
          {isActive && (
            <div className="flex gap-1 mt-1 justify-center">
              {(["solid", "dashed", "gradient"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => onChange({ ...block, data: { style } })}
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded border",
                    block.data.style === style ? "border-brand text-brand" : "border-border text-ink-muted"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          )}
        </div>
      );

    default:
      return <p className="text-xs text-ink-muted">Unknown block type: {(block as ContentBlock).type}</p>;
  }
}

function EditableText({
  value,
  onChange,
  className,
  placeholder,
  style,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent || "")}
      className={cn("focus:outline-none focus:ring-1 focus:ring-brand/30 rounded px-0.5 min-h-[1.2em]", className)}
      data-placeholder={placeholder}
      style={style}
    >
      {value}
    </div>
  );
}

function getCalloutColor(type: string, theme: ThemeConfig): string {
  switch (type) {
    case "info": return "#3B82F6";
    case "warning": return "#F59E0B";
    case "success": return "#22C55E";
    case "finding": return theme.accentColor;
    case "limitation": return "#EF4444";
    case "methodology": return "#6366F1";
    case "clinical": return "#14B8A6";
    default: return theme.primaryColor;
  }
}

function createDefaultBlock(type: ContentBlock["type"]): ContentBlock {
  switch (type) {
    case "text": return { type: "text", data: { text: "Enter text here", style: "body" } };
    case "bullets": return { type: "bullets", data: { items: ["First point", "Second point"], ordered: false } };
    case "image": return { type: "image", data: { alt: "Image description", suggestion: "Add an image" } };
    case "chart": return { type: "chart", data: { chartType: "bar", title: "Chart Title", labels: ["A", "B", "C"], datasets: [{ label: "Data", data: [10, 20, 30] }] } };
    case "table": return { type: "table", data: { headers: ["Column 1", "Column 2"], rows: [["Cell 1", "Cell 2"]] } };
    case "citation": return { type: "citation", data: { text: "Citation text", source: "Author et al., 2024" } };
    case "quote": return { type: "quote", data: { text: "Quote text", attribution: "Author" } };
    case "math": return { type: "math", data: { expression: "E = mc^2", displayMode: true } };
    case "diagram": return { type: "diagram", data: { syntax: "graph TD\n    A[Start] --> B[Process]\n    B --> C[End]", diagramType: "flowchart" } };
    case "code": return { type: "code", data: { code: "// Your code here", language: "python" } };
    case "callout": return { type: "callout", data: { text: "Key finding or note", type: "finding", title: "Key Finding" } };
    case "stat_result": return { type: "stat_result", data: { label: "Primary Outcome", value: "0.73", ci: "95% CI: 0.65-0.81", pValue: "p < 0.001" } };
    case "bibliography": return { type: "bibliography", data: { entries: [{ id: 1, formatted: "Author A, et al. (2024). Title. Journal, 1(1), 1-10." }], style: "apa" } };
    case "timeline": return { type: "timeline", data: { entries: [{ label: "Phase 1", date: "Q1 2024", description: "Initial phase", status: "completed" }, { label: "Phase 2", date: "Q2 2024", status: "in_progress" }] } };
    case "divider": return { type: "divider", data: { style: "solid" } };
    case "toggle": return { type: "toggle", data: { title: "Click to expand", content: "Hidden content goes here", defaultOpen: false } };
    case "embed": return { type: "embed", data: { url: "", embedType: "generic", aspectRatio: "16:9" } };
    case "nested_card": return { type: "nested_card", data: { title: "Sub-section", contentBlocks: [{ type: "text", data: { text: "Nested content", style: "body" } }], collapsed: true } };
    case "infographic": return { type: "infographic", data: { infographicType: "process_flow", title: "Infographic", items: [{ label: "Step 1", description: "Description" }], colorScheme: "theme" } };
  }
}
