"use client";

import { useEffect, useRef, useState } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import { useTableEditorStore } from "@/stores/table-editor-store";
import type { ContentBlock, ChartData, EmbedData, ToggleData, NestedCardData, BlockAnimation, AnimationTrigger, ExitAnimationType, EmphasisAnimationType, InfographicData, InfographicType, InfographicItem, ShapeData, MediaData, ThemeConfig, TableCellMeta } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { detectMediaType } from "@/components/slides/blocks/media-block";
import { CircleNotch, Plus, Trash, Upload } from "@phosphor-icons/react";
import { SHAPE_CATEGORIES, getShapesByCategory, renderShapeSvgPrimitive, isLineShape, isConnectorShape } from "@/components/slides/blocks/shape-utils";
import { FONT_FAMILY_OPTIONS, FONT_SIZE_OPTIONS } from "@/components/slides/wysiwyg/text-formatting-options";
import { BlockStyleControls } from "@/components/slides/shared/block-style-controls";
import { ColorPicker } from "@/components/slides/shared/color-picker";
import { hexToRGBA, parseHexColor } from "@/lib/utils/color-utils";
import {
  applySelectedCellAttributes,
  applyTableStyleAttributes,
} from "@/components/slides/wysiwyg/editable-table-block";
import { requestGeneratedSlideImage } from "@/lib/slides/image-generation-client";
import { mergeGeneratedImageData } from "@/lib/slides/image-blocks";

// ---------------------------------------------------------------------------
// BlockPropertyEditor — context-sensitive editor for the selected block.
// Shows in the properties panel when a block is selected.
// ---------------------------------------------------------------------------

export function BlockPropertyEditor() {
  const selectedBlock = useSlidesStore((s) => s.getSelectedBlock());
  const selectedBlockIndices = useSlidesStore((s) => s.selectedBlockIndices);
  const selectedBlockIndex = useSlidesStore((s) => s.getPrimarySelectedBlockIndex());
  const updateBlock = useSlidesStore((s) => s.updateBlock);
  const themeConfig = useSlidesStore((s) => s.themeConfig);

  if (
    selectedBlock === null ||
    selectedBlockIndex === null ||
    selectedBlockIndices.size !== 1
  ) {
    return (
      <div className="px-3 py-4 text-center text-xs text-ink-muted">
        Select a block on the canvas to edit its properties.
      </div>
    );
  }

  const onUpdate = (updated: ContentBlock) => updateBlock(selectedBlockIndex, updated);

  let editor: React.ReactNode;

  switch (selectedBlock.type) {
    case "text":
      editor = <TextEditor block={selectedBlock} onUpdate={onUpdate} themeConfig={themeConfig} />;
      break;
    case "chart":
      editor = <ChartEditor block={selectedBlock} onUpdate={onUpdate} />;
      break;
    case "table":
      editor = (
        <TableEditor
          block={selectedBlock}
          onUpdate={onUpdate}
          themeConfig={themeConfig}
          selectedBlockIndex={selectedBlockIndex}
        />
      );
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
    case "shape":
      editor = (
        <ShapeEditor
          block={selectedBlock}
          onUpdate={onUpdate}
          themeConfig={themeConfig}
        />
      );
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
    case "media":
      editor = <MediaEditor block={selectedBlock} onUpdate={onUpdate} />;
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
      <BlockStyleControls block={selectedBlock} onUpdate={onUpdate} />
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

function getThemeColors(themeConfig: ThemeConfig): string[] {
  return [
    themeConfig.primaryColor,
    themeConfig.secondaryColor,
    themeConfig.accentColor,
    themeConfig.textColor,
    themeConfig.backgroundColor,
  ];
}

function toRgbaColor(color: string): string {
  const parsed = parseHexColor(color);
  return hexToRGBA(parsed.hex, parsed.alpha);
}

// ---------------------------------------------------------------------------
// Text Editor
// ---------------------------------------------------------------------------

type TextBlock = Extract<ContentBlock, { type: "text" }>;
const LINE_SPACING_OPTIONS = [1.0, 1.15, 1.5, 2.0, 2.5, 3.0] as const;
const PARAGRAPH_SPACING_OPTIONS = [
  { value: 0, label: "None (0)" },
  { value: 4, label: "Tight (4px)" },
  { value: 8, label: "Normal (8px)" },
  { value: 12, label: "Relaxed (12px)" },
  { value: 16, label: "Loose (16px)" },
  { value: 24, label: "Extra (24px)" },
] as const;

function formatLineSpacingLabel(value: number): string {
  return Number.isInteger(value) ? value.toFixed(1) : String(value);
}

function TextEditor({
  block,
  onUpdate,
  themeConfig,
}: {
  block: TextBlock;
  onUpdate: (b: ContentBlock) => void;
  themeConfig: ThemeConfig;
}) {
  const data = block.data;
  const themeColors = getThemeColors(themeConfig);

  const updateData = (partial: Partial<TextBlock["data"]>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  const currentColor = data.color ?? themeConfig.textColor;

  return (
    <div className="space-y-3">
      <EditorSection title="Text">
        <div>
          <FieldLabel>Font Family</FieldLabel>
          <FieldSelect
            value={data.fontFamily ?? "__theme__"}
            onChange={(value) => updateData({ fontFamily: value === "__theme__" ? undefined : value })}
            options={[
              { value: "__theme__", label: "Theme Default" },
              ...FONT_FAMILY_OPTIONS.map((font) => ({ value: font, label: font })),
            ]}
          />
        </div>

        <div>
          <FieldLabel>Font Size</FieldLabel>
          <FieldSelect
            value={data.fontSize ?? "__theme__"}
            onChange={(value) => updateData({ fontSize: value === "__theme__" ? undefined : value })}
            options={[
              { value: "__theme__", label: "Theme Default" },
              ...FONT_SIZE_OPTIONS.map((size) => ({ value: `${size}px`, label: `${size}px` })),
            ]}
          />
        </div>

        <div>
          <FieldLabel>Line Spacing</FieldLabel>
          <FieldSelect
            value={data.lineHeight !== undefined ? String(data.lineHeight) : "__default__"}
            onChange={(value) =>
              updateData({ lineHeight: value === "__default__" ? undefined : Number(value) })
            }
            options={[
              { value: "__default__", label: "Default" },
              ...LINE_SPACING_OPTIONS.map((lineHeight) => ({
                value: String(lineHeight),
                label: formatLineSpacingLabel(lineHeight),
              })),
            ]}
          />
        </div>

        <div>
          <FieldLabel>Paragraph Spacing</FieldLabel>
          <FieldSelect
            value={
              data.paragraphSpacing !== undefined ? String(data.paragraphSpacing) : "__default__"
            }
            onChange={(value) =>
              updateData({
                paragraphSpacing:
                  value === "__default__" ? undefined : Number.parseInt(value, 10),
              })
            }
            options={[
              { value: "__default__", label: "Default" },
              ...PARAGRAPH_SPACING_OPTIONS.map((option) => ({
                value: String(option.value),
                label: option.label,
              })),
            ]}
          />
        </div>

        <div>
          <FieldLabel>Color</FieldLabel>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <ColorPicker
                value={currentColor}
                onChange={(color) => updateData({ color })}
                themeColors={themeColors}
                placement="right"
              />
            </div>
            <button
              type="button"
              onClick={() => updateData({ color: undefined })}
              className="shrink-0 rounded-md border border-border px-2 py-1.5 text-xs text-ink hover:bg-surface-raised"
            >
              Theme Color
            </button>
          </div>
        </div>
      </EditorSection>

      <TextEffectsEditor
        textShadow={data.textShadow}
        textOutline={data.textOutline}
        textTransform={data.textTransform}
        letterSpacing={data.letterSpacing}
        onUpdate={(effects) => updateData(effects)}
        glowColor={themeConfig.accentColor}
        themeColors={themeColors}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Text Effects Editor (shared between text blocks and title/subtitle)
// ---------------------------------------------------------------------------

const SHADOW_PRESETS = [
  { label: "None", value: undefined as undefined },
  { label: "Subtle", value: { offsetX: 1, offsetY: 1, blur: 2, color: "rgba(0,0,0,0.2)" } },
  { label: "Medium", value: { offsetX: 2, offsetY: 2, blur: 4, color: "rgba(0,0,0,0.3)" } },
  { label: "Strong", value: { offsetX: 3, offsetY: 3, blur: 6, color: "rgba(0,0,0,0.5)" } },
] as const;

function TextEffectsEditor({
  textShadow,
  textOutline,
  textTransform,
  letterSpacing,
  onUpdate,
  glowColor,
  themeColors,
}: {
  textShadow?: TextBlock["data"]["textShadow"];
  textOutline?: TextBlock["data"]["textOutline"];
  textTransform?: TextBlock["data"]["textTransform"];
  letterSpacing?: TextBlock["data"]["letterSpacing"];
  onUpdate: (partial: Partial<TextBlock["data"]>) => void;
  glowColor?: string;
  themeColors: string[];
}) {
  const shadowEnabled = !!textShadow;
  const outlineEnabled = !!textOutline;
  const resolvedGlowColor = glowColor ?? "#4F46E5";

  return (
    <EditorSection title="Text Effects">
      {/* Text Shadow */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <FieldLabel>Text Shadow</FieldLabel>
          <input
            type="checkbox"
            checked={shadowEnabled}
            onChange={(e) => {
              if (e.target.checked) {
                onUpdate({ textShadow: { offsetX: 1, offsetY: 1, blur: 2, color: "rgba(0,0,0,0.2)" } });
              } else {
                onUpdate({ textShadow: undefined });
              }
            }}
            className="accent-brand"
          />
        </div>
        {shadowEnabled && (
          <div className="space-y-1.5 pl-1">
            <div className="flex flex-wrap gap-1">
              {SHADOW_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => onUpdate({ textShadow: preset.value ? { ...preset.value } : undefined })}
                  className={`rounded border px-2 py-0.5 text-[10px] ${
                    !preset.value && !shadowEnabled
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border text-ink-muted hover:bg-surface-raised"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() =>
                  onUpdate({
                    textShadow: { offsetX: 0, offsetY: 0, blur: 8, color: `${resolvedGlowColor}80` },
                  })
                }
                className="rounded border border-border px-2 py-0.5 text-[10px] text-ink-muted hover:bg-surface-raised"
              >
                Glow
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-ink-muted w-12">X</span>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  value={textShadow!.offsetX}
                  onChange={(e) =>
                    onUpdate({ textShadow: { ...textShadow!, offsetX: Number(e.target.value) } })
                  }
                  className="flex-1 h-1 accent-brand cursor-pointer"
                />
                <span className="text-[10px] text-ink-muted tabular-nums w-8 text-right">
                  {textShadow!.offsetX}px
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-ink-muted w-12">Y</span>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  value={textShadow!.offsetY}
                  onChange={(e) =>
                    onUpdate({ textShadow: { ...textShadow!, offsetY: Number(e.target.value) } })
                  }
                  className="flex-1 h-1 accent-brand cursor-pointer"
                />
                <span className="text-[10px] text-ink-muted tabular-nums w-8 text-right">
                  {textShadow!.offsetY}px
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-ink-muted w-12">Blur</span>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={textShadow!.blur}
                  onChange={(e) =>
                    onUpdate({ textShadow: { ...textShadow!, blur: Number(e.target.value) } })
                  }
                  className="flex-1 h-1 accent-brand cursor-pointer"
                />
                <span className="text-[10px] text-ink-muted tabular-nums w-8 text-right">
                  {textShadow!.blur}px
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-ink-muted w-12">Color</span>
                <div className="flex-1">
                  <ColorPicker
                    value={textShadow!.color}
                    onChange={(color) =>
                      onUpdate({ textShadow: { ...textShadow!, color: toRgbaColor(color) } })
                    }
                    showAlpha
                    themeColors={themeColors}
                    placement="right"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text Outline */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <FieldLabel>Text Outline</FieldLabel>
          <input
            type="checkbox"
            checked={outlineEnabled}
            onChange={(e) => {
              if (e.target.checked) {
                onUpdate({ textOutline: { width: 1, color: "#000000" } });
              } else {
                onUpdate({ textOutline: undefined });
              }
            }}
            className="accent-brand"
          />
        </div>
        {outlineEnabled && (
          <div className="space-y-1 pl-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-ink-muted w-12">Width</span>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.5}
                value={textOutline!.width}
                onChange={(e) =>
                  onUpdate({ textOutline: { ...textOutline!, width: Number(e.target.value) } })
                }
                className="flex-1 h-1 accent-brand cursor-pointer"
              />
              <span className="text-[10px] text-ink-muted tabular-nums w-8 text-right">
                {textOutline!.width}px
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-ink-muted w-12">Color</span>
              <div className="flex-1">
                <ColorPicker
                  value={textOutline!.color}
                  onChange={(color) =>
                    onUpdate({ textOutline: { ...textOutline!, color } })
                  }
                  themeColors={themeColors}
                  placement="right"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text Transform */}
      <div>
        <FieldLabel>Text Transform</FieldLabel>
        <FieldSelect
          value={textTransform ?? "none"}
          onChange={(v) =>
            onUpdate({ textTransform: v === "none" ? undefined : (v as "uppercase" | "lowercase" | "capitalize") })
          }
          options={[
            { value: "none", label: "None" },
            { value: "uppercase", label: "UPPERCASE" },
            { value: "lowercase", label: "lowercase" },
            { value: "capitalize", label: "Capitalize" },
          ]}
        />
      </div>

      {/* Letter Spacing */}
      <div className="space-y-0.5">
        <div className="flex items-center justify-between">
          <FieldLabel>Letter Spacing</FieldLabel>
          <span className="text-[10px] text-ink-muted tabular-nums">
            {(letterSpacing ?? 0).toFixed(2)}em
          </span>
        </div>
        <input
          type="range"
          min={-0.05}
          max={0.3}
          step={0.01}
          value={letterSpacing ?? 0}
          onChange={(e) => {
            const v = Number(e.target.value);
            onUpdate({ letterSpacing: v === 0 ? undefined : v });
          }}
          className="w-full h-1 accent-brand cursor-pointer"
        />
      </div>
    </EditorSection>
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

function TableEditor({
  block,
  onUpdate,
  themeConfig,
  selectedBlockIndex,
}: {
  block: TableBlock;
  onUpdate: (b: ContentBlock) => void;
  themeConfig: ThemeConfig;
  selectedBlockIndex: number;
}) {
  const data = block.data;
  const editingBlockIndex = useSlidesStore((s) => s.editingBlockIndex);
  const activeTableBlockIndex = useTableEditorStore((s) => s.activeBlockIndex);
  const tableEditor = useTableEditorStore((s) => s.editor);
  const selectedCell = useTableEditorStore((s) => s.selectedCell);
  const canMergeCells = useTableEditorStore((s) => s.canMergeCells);
  const canSplitCell = useTableEditorStore((s) => s.canSplitCell);
  const themeColors = getThemeColors(themeConfig);
  const isLiveTableSelection =
    editingBlockIndex === selectedBlockIndex &&
    activeTableBlockIndex === selectedBlockIndex &&
    tableEditor !== null;

  const updateData = (partial: Partial<TableBlock["data"]>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  const updateTableStyle = (partial: NonNullable<TableBlock["data"]["tableStyle"]>) => {
    if (isLiveTableSelection && tableEditor) {
      if (applyTableStyleAttributes(tableEditor, partial)) {
        return;
      }
    }

    updateData({
      tableStyle: {
        ...data.tableStyle,
        ...partial,
      },
    });
  };

  const updateSelectedCell = (partial: Partial<TableCellMeta>) => {
    if (!tableEditor) return;
    applySelectedCellAttributes(tableEditor, partial);
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Table Style">
        <div>
          <FieldLabel>Header Background</FieldLabel>
          <ColorPicker
            value={data.tableStyle?.headerBackground ?? `${themeConfig.primaryColor}10`}
            onChange={(color) => updateTableStyle({ headerBackground: color })}
            themeColors={themeColors}
            placement="right"
          />
        </div>

        <div>
          <FieldLabel>Header Text Color</FieldLabel>
          <ColorPicker
            value={data.tableStyle?.headerTextColor ?? themeConfig.primaryColor}
            onChange={(color) => updateTableStyle({ headerTextColor: color })}
            themeColors={themeColors}
            placement="right"
          />
        </div>

        <label className="flex items-center justify-between rounded-md border border-border px-2 py-2 text-xs text-ink">
          <span>Striped Rows</span>
          <input
            type="checkbox"
            checked={data.tableStyle?.stripedRows ?? true}
            onChange={(event) => updateTableStyle({ stripedRows: event.target.checked })}
          />
        </label>

        <div>
          <FieldLabel>Border Style</FieldLabel>
          <FieldSelect
            value={data.tableStyle?.borderMode ?? "horizontal"}
            onChange={(value) =>
              updateTableStyle({
                borderMode: value as "all" | "horizontal" | "none" | "outer",
              })
            }
            options={[
              { value: "all", label: "All Borders" },
              { value: "horizontal", label: "Horizontal Only" },
              { value: "none", label: "No Borders" },
              { value: "outer", label: "Outer Only" },
            ]}
          />
        </div>
      </EditorSection>

      <EditorSection title="Cell Formatting">
        {isLiveTableSelection && selectedCell ? (
          <>
            <div className="rounded-md border border-border bg-surface-raised px-2 py-1.5 text-[11px] text-ink-muted">
              {selectedCell.isHeader
                ? `Header cell ${selectedCell.columnIndex + 1}`
                : `Cell ${selectedCell.rowIndex + 1}, ${selectedCell.columnIndex + 1}`}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => tableEditor.chain().focus().mergeCells().run()}
                disabled={!canMergeCells}
                className="flex-1 rounded-md border border-border px-2 py-1.5 text-xs text-ink hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50"
              >
                Merge Cells
              </button>
              <button
                type="button"
                onClick={() => tableEditor.chain().focus().splitCell().run()}
                disabled={!canSplitCell}
                className="flex-1 rounded-md border border-border px-2 py-1.5 text-xs text-ink hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50"
              >
                Split Cell
              </button>
            </div>

            <div>
              <FieldLabel>Cell Background</FieldLabel>
              <ColorPicker
                value={selectedCell.meta.backgroundColor ?? "#FFFFFF"}
                onChange={(color) => updateSelectedCell({ backgroundColor: color })}
                themeColors={themeColors}
                placement="right"
              />
            </div>

            <div>
              <FieldLabel>Text Alignment</FieldLabel>
              <FieldSelect
                value={selectedCell.meta.textAlign ?? "left"}
                onChange={(value) =>
                  updateSelectedCell({
                    textAlign: value as "left" | "center" | "right",
                  })
                }
                options={[
                  { value: "left", label: "Left" },
                  { value: "center", label: "Center" },
                  { value: "right", label: "Right" },
                ]}
              />
            </div>

            <label className="flex items-center justify-between rounded-md border border-border px-2 py-2 text-xs text-ink">
              <span>Bold</span>
              <input
                type="checkbox"
                checked={selectedCell.meta.fontWeight === "bold"}
                onChange={(event) =>
                  updateSelectedCell({
                    fontWeight: event.target.checked ? "bold" : "normal",
                  })
                }
              />
            </label>
          </>
        ) : (
          <div className="rounded-md border border-dashed border-border px-2 py-2 text-xs text-ink-muted">
            Double-click the table on the canvas and place the cursor in a cell to enable merge, split, and per-cell formatting.
          </div>
        )}
      </EditorSection>

      <EditorSection title="Table">
        <div className="rounded-md border border-dashed border-border px-2 py-2 text-xs text-ink-muted">
          Edit content directly on the canvas. Right-click a cell for row, column, merge, split, and background actions.
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
const IMAGE_ACCEPT = ".jpg,.jpeg,.png,.gif,.webp,.svg,image/jpeg,image/png,image/gif,image/webp,image/svg+xml";
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
]);

function ImageEditor({ block, onUpdate }: { block: ImageBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [generationPrompt, setGenerationPrompt] = useState(data.suggestion ?? data.alt);
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState("0");

  const update = (partial: Partial<typeof data>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  useEffect(() => {
    setGenerationPrompt(data.suggestion ?? data.alt);
  }, [data.alt, data.suggestion]);

  useEffect(() => {
    setSelectedVersionIndex("0");
  }, [data.versions?.length]);

  const handleFileUpload = async (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      setUploadError("Unsupported format. Use JPG, PNG, GIF, WEBP, or SVG.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setGenerationError(null);

    try {
      const { url } = await new Promise<{ url: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/slides/upload-image");

        xhr.upload.onprogress = (event) => {
          if (!event.lengthComputable) return;
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        };

        xhr.onload = () => {
          if (xhr.status < 200 || xhr.status >= 300) {
            reject(new Error(`Upload failed (${xhr.status})`));
            return;
          }

          try {
            const parsed = JSON.parse(xhr.responseText) as { url?: string };
            if (!parsed.url) {
              reject(new Error("Upload response did not include a URL"));
              return;
            }
            resolve({ url: parsed.url });
          } catch {
            reject(new Error("Failed to parse upload response"));
          }
        };

        xhr.onerror = () => reject(new Error("Upload failed"));

        const formData = new FormData();
        formData.append("file", file);
        xhr.send(formData);
      });

      update({ url });
    } catch (err) {
      console.error("Image upload failed:", err);
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
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

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const runGeneration = async () => {
    const prompt = generationPrompt.trim();
    if (!prompt) {
      setGenerationError("Enter a prompt before generating.");
      return;
    }

    setGenerating(true);
    setGenerationError(null);
    try {
      const payload = await requestGeneratedSlideImage({
        prompt,
        style: "illustration",
        aspectRatio: "16:9",
      });

      onUpdate({
        ...block,
        data: mergeGeneratedImageData(data, {
          imageUrl: payload.imageUrl,
          attribution: payload.attribution,
          prompt,
        }),
      });
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : "Image generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const restoreVersion = () => {
    const selected = data.versions?.[Number(selectedVersionIndex)];
    if (!selected) return;

    const remainingVersions = (data.versions ?? []).filter(
      (_version, index) => index !== Number(selectedVersionIndex)
    );
    const nextVersions = data.url
      ? [
          {
            url: data.url,
            prompt: data.suggestion,
            attribution: data.attribution,
            createdAt: new Date().toISOString(),
          },
          ...remainingVersions,
        ]
      : remainingVersions;

    update({
      url: selected.url,
      attribution: selected.attribution,
      suggestion: selected.prompt ?? data.suggestion,
      versions: nextVersions,
      crop: undefined,
    });
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Image">
        <input
          ref={fileInputRef}
          type="file"
          accept={IMAGE_ACCEPT}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFileUpload(file);
          }}
        />

        {/* Upload area — click or drag-and-drop */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-brand bg-brand/5"
              : "border-border hover:border-brand"
          }`}
          onClick={triggerFilePicker}
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
                <p className="text-xs text-ink-muted">
                  Uploading{uploadProgress !== null ? ` (${uploadProgress}%)` : "..."}
                </p>
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

        {uploadProgress !== null && (
          <div className="h-1.5 rounded bg-surface-raised overflow-hidden">
            <div
              className="h-full bg-brand transition-[width] duration-150"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {uploadError && (
          <p className="text-xs text-red-600">{uploadError}</p>
        )}

        <button
          type="button"
          onClick={triggerFilePicker}
          disabled={uploading}
          className="w-full text-xs py-1.5 rounded-md border border-border text-ink hover:bg-surface-raised disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Upload Image
        </button>

        <div>
          <FieldLabel>URL</FieldLabel>
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
        <div>
          <FieldLabel>Generation Prompt</FieldLabel>
          <FieldTextarea
            value={generationPrompt}
            onChange={(value) => {
              setGenerationPrompt(value);
              update({ suggestion: value || undefined });
            }}
            placeholder="Describe the image you want the AI to generate"
            rows={3}
          />
        </div>
        <button
          type="button"
          onClick={() => void runGeneration()}
          disabled={generating || !generationPrompt.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-brand/30 bg-brand/10 py-1.5 text-xs text-brand disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {generating ? <CircleNotch size={14} className="animate-spin" /> : null}
          {data.url ? "Regenerate Image" : "Generate Image"}
        </button>
        {generationError && (
          <p className="text-xs text-red-600">{generationError}</p>
        )}
        {data.versions && data.versions.length > 0 && (
          <div className="space-y-2">
            <FieldLabel>Previous Versions</FieldLabel>
            <select
              value={selectedVersionIndex}
              onChange={(e) => setSelectedVersionIndex(e.target.value)}
              className="w-full rounded-md border border-border bg-surface px-2 py-1.5 text-xs text-ink"
            >
              {data.versions.map((version, index) => (
                <option key={`${version.url}-${index}`} value={String(index)}>
                  {new Date(version.createdAt).toLocaleString()} {version.prompt ? `- ${version.prompt.slice(0, 48)}` : ""}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={restoreVersion}
              className="w-full rounded-md border border-border py-1.5 text-xs text-ink hover:bg-surface-raised"
            >
              Restore Selected Version
            </button>
          </div>
        )}
        {data.attribution && (
          <p className="text-[11px] text-ink-muted">{data.attribution}</p>
        )}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.lockAspectRatio ?? false}
            onChange={(e) => update({ lockAspectRatio: e.target.checked })}
            className="rounded border-border"
          />
          <span className="text-xs text-ink">Lock aspect ratio</span>
        </label>
        <button
          type="button"
          onClick={() => update({ url: undefined, crop: undefined })}
          className="w-full text-xs py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50"
        >
          Remove Image
        </button>
      </EditorSection>

      {data.url && (
        <EditorSection title="Filters">
          <ImageFilterSlider label="Brightness" value={data.filters?.brightness ?? 100} min={0} max={200} defaultValue={100} unit="%" onChange={(v) => updateFilter("brightness", v, 100)} />
          <ImageFilterSlider label="Contrast" value={data.filters?.contrast ?? 100} min={0} max={200} defaultValue={100} unit="%" onChange={(v) => updateFilter("contrast", v, 100)} />
          <ImageFilterSlider label="Saturation" value={data.filters?.saturation ?? 100} min={0} max={200} defaultValue={100} unit="%" onChange={(v) => updateFilter("saturation", v, 100)} />
          <ImageFilterSlider label="Blur" value={data.filters?.blur ?? 0} min={0} max={20} defaultValue={0} unit="px" onChange={(v) => updateFilter("blur", v, 0)} />
          <ImageFilterSlider label="Grayscale" value={data.filters?.grayscale ?? 0} min={0} max={100} defaultValue={0} unit="%" onChange={(v) => updateFilter("grayscale", v, 0)} />
          <ImageFilterSlider label="Sepia" value={data.filters?.sepia ?? 0} min={0} max={100} defaultValue={0} unit="%" onChange={(v) => updateFilter("sepia", v, 0)} />
          <ImageFilterSlider label="Hue Rotate" value={data.filters?.hueRotate ?? 0} min={0} max={360} defaultValue={0} unit="°" onChange={(v) => updateFilter("hueRotate", v, 0)} />
          <ImageFilterSlider label="Opacity" value={data.filters?.opacity ?? 100} min={0} max={100} defaultValue={100} unit="%" onChange={(v) => updateFilter("opacity", v, 100)} />
          <button
            type="button"
            onClick={() => update({ filters: undefined })}
            className="w-full text-xs py-1 rounded-md border border-border text-ink-muted hover:bg-surface-raised"
          >
            Reset All Filters
          </button>
        </EditorSection>
      )}
    </div>
  );

  function updateFilter(key: string, value: number, defaultValue: number) {
    const current = data.filters ?? {};
    const next = { ...current, [key]: value };
    // Remove filter key if it's at default to keep data clean
    if (value === defaultValue) {
      delete (next as Record<string, unknown>)[key];
    }
    // If all values are default, remove the filters object entirely
    const hasNonDefault = Object.keys(next).length > 0;
    update({ filters: hasNonDefault ? next : undefined });
  }
}

// ---------------------------------------------------------------------------
// Image Filter Slider
// ---------------------------------------------------------------------------

function ImageFilterSlider({
  label,
  value,
  min,
  max,
  defaultValue,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">{label}</span>
        <span className="text-[10px] text-ink-muted tabular-nums">{value}{unit}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-1 accent-brand cursor-pointer"
        />
        <button
          type="button"
          title={`Reset to ${defaultValue}`}
          onClick={() => onChange(defaultValue)}
          className="text-[10px] text-ink-muted hover:text-ink px-1 shrink-0"
          disabled={value === defaultValue}
        >
          &times;
        </button>
      </div>
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
// Shape Editor
// ---------------------------------------------------------------------------

type ShapeBlock = Extract<ContentBlock, { type: "shape" }>;

function ShapeEditor({
  block,
  onUpdate,
  themeConfig,
}: {
  block: ShapeBlock;
  onUpdate: (b: ContentBlock) => void;
  themeConfig: ThemeConfig;
}) {
  const data = block.data;
  const themeColors = getThemeColors(themeConfig);

  const updateData = (partial: Partial<ShapeData>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  const fillColor = data.fillColor ?? themeConfig.primaryColor;
  const strokeColor = data.strokeColor ?? themeConfig.textColor;
  const textColor = data.textColor ?? themeConfig.textColor;
  const strokeWidth = data.strokeWidth ?? 0;
  const opacity = data.opacity ?? 100;

  return (
    <div className="space-y-3">
      <EditorSection title="Shape">
        <div>
          <FieldLabel>Shape Type</FieldLabel>
          <div className="max-h-[200px] overflow-y-auto space-y-2">
            {SHAPE_CATEGORIES.map((cat) => {
              const shapes = getShapesByCategory()[cat];
              if (shapes.length === 0) return null;
              return (
                <div key={cat}>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-ink-muted/70">{cat}</span>
                  <div className="grid grid-cols-3 gap-1.5 mt-0.5">
                    {shapes.map((shape) => {
                      const isSelected = data.shapeType === shape.type;
                      const isLineLike = isLineShape(shape.type);
                      const previewStroke = isLineLike ? strokeColor : strokeWidth > 0 ? strokeColor : "#94a3b8";
                      const previewStrokeWidth = isLineLike ? Math.max(2, strokeWidth || 0) : Math.max(1, strokeWidth || 0);

                      return (
                        <button
                          key={shape.type}
                          type="button"
                          onClick={() => updateData({ shapeType: shape.type })}
                          className={`rounded-md border px-1 py-1 text-[9px] transition-colors ${
                            isSelected
                              ? "border-brand bg-brand/10 text-brand"
                              : "border-border bg-surface-raised text-ink-muted hover:border-brand/50 hover:text-ink"
                          }`}
                        >
                          <svg className="mx-auto h-6 w-full" viewBox="0 0 100 100" aria-hidden="true">
                            {renderShapeSvgPrimitive(shape.type, {
                              fill: isLineLike ? "none" : fillColor,
                              stroke: previewStroke,
                              strokeWidth: previewStrokeWidth,
                            })}
                          </svg>
                          <span className="block mt-0.5 leading-tight">{shape.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <FieldLabel>Fill Color</FieldLabel>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <ColorPicker
                value={fillColor}
                onChange={(color) => updateData({ fillColor: color })}
                themeColors={themeColors}
                placement="right"
              />
            </div>
            <button
              type="button"
              onClick={() => updateData({ fillColor: undefined })}
              className="shrink-0 rounded-md border border-border px-2 py-1.5 text-xs text-ink hover:bg-surface-raised"
            >
              Theme
            </button>
          </div>
        </div>

        <div>
          <FieldLabel>Stroke</FieldLabel>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <ColorPicker
                  value={strokeColor}
                  onChange={(color) => updateData({ strokeColor: color })}
                  themeColors={themeColors}
                  placement="right"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={12}
                step={1}
                value={strokeWidth}
                onChange={(e) => updateData({ strokeWidth: Number.parseInt(e.target.value, 10) })}
                className="w-full"
              />
              <span className="w-10 text-right text-xs text-ink-muted">{strokeWidth}px</span>
            </div>
          </div>
        </div>

        <div>
          <FieldLabel>Opacity</FieldLabel>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={opacity}
              onChange={(e) => updateData({ opacity: Number.parseInt(e.target.value, 10) })}
              className="w-full"
            />
            <span className="w-10 text-right text-xs text-ink-muted">{opacity}%</span>
          </div>
        </div>

        <div>
          <FieldLabel>Text</FieldLabel>
          <FieldTextarea
            value={data.text ?? ""}
            onChange={(value) => updateData({ text: value })}
            placeholder="Optional text inside shape"
            rows={2}
          />
        </div>

        <div>
          <FieldLabel>Text Color</FieldLabel>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <ColorPicker
                value={textColor}
                onChange={(color) => updateData({ textColor: color })}
                themeColors={themeColors}
                placement="right"
              />
            </div>
          </div>
        </div>

        <div>
          <FieldLabel>Text Alignment</FieldLabel>
          <FieldSelect
            value={data.textAlign ?? "center"}
            onChange={(value) => updateData({ textAlign: value as ShapeData["textAlign"] })}
            options={[
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ]}
          />
        </div>

        {isConnectorShape(data.shapeType) && (
          <>
            <div>
              <FieldLabel>Start Arrow</FieldLabel>
              <FieldSelect
                value={data.arrowStart ?? "none"}
                onChange={(v) => updateData({ arrowStart: v as ShapeData["arrowStart"] })}
                options={[
                  { value: "none", label: "None" },
                  { value: "arrow", label: "Arrow" },
                  { value: "circle", label: "Circle" },
                  { value: "diamond", label: "Diamond" },
                ]}
              />
            </div>
            <div>
              <FieldLabel>End Arrow</FieldLabel>
              <FieldSelect
                value={data.arrowEnd ?? "arrow"}
                onChange={(v) => updateData({ arrowEnd: v as ShapeData["arrowEnd"] })}
                options={[
                  { value: "none", label: "None" },
                  { value: "arrow", label: "Arrow" },
                  { value: "circle", label: "Circle" },
                  { value: "diamond", label: "Diamond" },
                ]}
              />
            </div>
          </>
        )}
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
// Three tabs: Entrance, Emphasis, Exit
// ---------------------------------------------------------------------------

const TRIGGER_OPTIONS: { value: AnimationTrigger; label: string }[] = [
  { value: "onClick", label: "On Click" },
  { value: "withPrevious", label: "With Previous" },
  { value: "afterPrevious", label: "After Previous" },
  { value: "auto", label: "Auto" },
];

const ENTRANCE_TYPE_GROUPS: { group: string; options: { value: string; label: string }[] }[] = [
  { group: "", options: [{ value: "none", label: "None" }] },
  { group: "Fade", options: [
    { value: "fadeIn", label: "Fade In" },
    { value: "dissolve", label: "Dissolve" },
  ]},
  { group: "Slide", options: [
    { value: "slideUp", label: "Slide Up" },
    { value: "slideDown", label: "Slide Down" },
    { value: "slideLeft", label: "Slide Left" },
    { value: "slideRight", label: "Slide Right" },
  ]},
  { group: "Scale", options: [
    { value: "scaleIn", label: "Scale In" },
    { value: "scaleUp", label: "Scale Up" },
    { value: "zoomIn", label: "Zoom In" },
    { value: "bounceIn", label: "Bounce In" },
  ]},
  { group: "Rotate", options: [
    { value: "rotateIn", label: "Rotate In" },
    { value: "flipInX", label: "Flip X" },
    { value: "flipInY", label: "Flip Y" },
  ]},
  { group: "Reveal", options: [
    { value: "wipeRight", label: "Wipe Right" },
    { value: "wipeDown", label: "Wipe Down" },
    { value: "typewriter", label: "Typewriter" },
  ]},
];

const EXIT_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "fadeOut", label: "Fade Out" },
  { value: "slideUp", label: "Slide Up" },
  { value: "slideDown", label: "Slide Down" },
  { value: "slideLeft", label: "Slide Left" },
  { value: "slideRight", label: "Slide Right" },
  { value: "scaleOut", label: "Scale Out" },
  { value: "shrinkOut", label: "Shrink Out" },
  { value: "zoomOut", label: "Zoom Out" },
  { value: "dissolveOut", label: "Dissolve Out" },
];

const EMPHASIS_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "pulse", label: "Pulse" },
  { value: "bounce", label: "Bounce" },
  { value: "shake", label: "Shake" },
  { value: "grow", label: "Grow" },
  { value: "spin", label: "Spin" },
];

type AnimationTab = "entrance" | "emphasis" | "exit";

function AnimationSection({
  block,
  onUpdate,
}: {
  block: ContentBlock;
  onUpdate: (b: ContentBlock) => void;
}) {
  const [tab, setTab] = useState<AnimationTab>("entrance");
  const anim: BlockAnimation = block.animation ?? { type: "none", delay: 0, duration: 0.4, order: 0 };

  function updateAnimation(partial: Partial<BlockAnimation>) {
    const updated = { ...anim, ...partial };
    onUpdate({ ...block, animation: updated.type === "none" && !updated.exit && !updated.emphasis ? undefined : updated });
  }

  const tabs: { key: AnimationTab; label: string }[] = [
    { key: "entrance", label: "Entrance" },
    { key: "emphasis", label: "Emphasis" },
    { key: "exit", label: "Exit" },
  ];

  return (
    <div className="px-3 py-3 border-t border-border">
      <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider mb-2">
        Animation
      </div>

      {/* Tab bar */}
      <div className="flex gap-0.5 mb-2 p-0.5 rounded-md bg-surface-raised border border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "flex-1 text-[10px] font-medium py-1 rounded transition-colors",
              tab === t.key
                ? "bg-brand text-white"
                : "text-ink-muted hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {tab === "entrance" && (
          <>
            <div>
              <FieldLabel>Effect</FieldLabel>
              <select
                value={anim.type}
                onChange={(e) => updateAnimation({ type: e.target.value as BlockAnimation["type"] })}
                className="w-full text-sm px-2 py-1.5 rounded-md border border-border bg-surface-raised text-ink focus:outline-none focus:ring-1 focus:ring-brand"
              >
                {ENTRANCE_TYPE_GROUPS.map((g) =>
                  g.group ? (
                    <optgroup key={g.group} label={g.group}>
                      {g.options.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </optgroup>
                  ) : (
                    g.options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))
                  )
                )}
              </select>
            </div>
            {anim.type !== "none" && (
              <>
                <div>
                  <FieldLabel>Trigger</FieldLabel>
                  <select
                    value={anim.trigger ?? "onClick"}
                    onChange={(e) => updateAnimation({ trigger: e.target.value as AnimationTrigger })}
                    className="w-full text-sm px-2 py-1.5 rounded-md border border-border bg-surface-raised text-ink focus:outline-none focus:ring-1 focus:ring-brand"
                  >
                    {TRIGGER_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
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
                    <FieldLabel>
                      {(anim.trigger === "afterPrevious") ? "Delay after prev (s)" :
                       (anim.trigger === "auto") ? "Delay from entry (s)" :
                       "Delay (s)"}
                    </FieldLabel>
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
          </>
        )}

        {tab === "emphasis" && (
          <>
            <div>
              <FieldLabel>Effect</FieldLabel>
              <select
                value={anim.emphasis?.type ?? "none"}
                onChange={(e) => {
                  const emphType = e.target.value as EmphasisAnimationType;
                  if (emphType === "none") {
                    updateAnimation({ emphasis: undefined });
                  } else {
                    updateAnimation({
                      emphasis: {
                        type: emphType,
                        delay: anim.emphasis?.delay ?? 0,
                        duration: anim.emphasis?.duration ?? 0.4,
                        repeat: anim.emphasis?.repeat ?? 1,
                      },
                    });
                  }
                }}
                className="w-full text-sm px-2 py-1.5 rounded-md border border-border bg-surface-raised text-ink focus:outline-none focus:ring-1 focus:ring-brand"
              >
                {EMPHASIS_TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {anim.emphasis && anim.emphasis.type !== "none" && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FieldLabel>Duration (s)</FieldLabel>
                    <FieldInput
                      type="number"
                      value={String(anim.emphasis.duration)}
                      onChange={(v) =>
                        updateAnimation({
                          emphasis: { ...anim.emphasis!, duration: parseFloat(v) || 0.4 },
                        })
                      }
                      placeholder="0.4"
                    />
                  </div>
                  <div>
                    <FieldLabel>Delay (s)</FieldLabel>
                    <FieldInput
                      type="number"
                      value={String(anim.emphasis.delay)}
                      onChange={(v) =>
                        updateAnimation({
                          emphasis: { ...anim.emphasis!, delay: parseFloat(v) || 0 },
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Repeat</FieldLabel>
                  <FieldInput
                    type="number"
                    value={String(anim.emphasis.repeat ?? 1)}
                    onChange={(v) =>
                      updateAnimation({
                        emphasis: { ...anim.emphasis!, repeat: parseInt(v) || 1 },
                      })
                    }
                    placeholder="1"
                  />
                </div>
              </>
            )}
          </>
        )}

        {tab === "exit" && (
          <>
            <div>
              <FieldLabel>Effect</FieldLabel>
              <select
                value={anim.exit?.type ?? "none"}
                onChange={(e) => {
                  const exitType = e.target.value as ExitAnimationType;
                  if (exitType === "none") {
                    updateAnimation({ exit: undefined });
                  } else {
                    updateAnimation({
                      exit: {
                        type: exitType,
                        delay: anim.exit?.delay ?? 0,
                        duration: anim.exit?.duration ?? 0.4,
                      },
                    });
                  }
                }}
                className="w-full text-sm px-2 py-1.5 rounded-md border border-border bg-surface-raised text-ink focus:outline-none focus:ring-1 focus:ring-brand"
              >
                {EXIT_TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {anim.exit && anim.exit.type !== "none" && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <FieldLabel>Duration (s)</FieldLabel>
                  <FieldInput
                    type="number"
                    value={String(anim.exit.duration)}
                    onChange={(v) =>
                      updateAnimation({
                        exit: { ...anim.exit!, duration: parseFloat(v) || 0.4 },
                      })
                    }
                    placeholder="0.4"
                  />
                </div>
                <div>
                  <FieldLabel>Delay (s)</FieldLabel>
                  <FieldInput
                    type="number"
                    value={String(anim.exit.delay)}
                    onChange={(v) =>
                      updateAnimation({
                        exit: { ...anim.exit!, delay: parseFloat(v) || 0 },
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
            )}
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

// ---------------------------------------------------------------------------
// Media Editor — audio/video source, playback options
// ---------------------------------------------------------------------------

type MediaBlock = Extract<ContentBlock, { type: "media" }>;

function MediaEditor({ block, onUpdate }: { block: MediaBlock; onUpdate: (b: ContentBlock) => void }) {
  const data = block.data;
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const update = (partial: Partial<MediaData>) => {
    onUpdate({ ...block, data: { ...data, ...partial } });
  };

  const handleUrlChange = (url: string) => {
    const detected = detectMediaType(url);
    const partial: Partial<MediaData> = { url, source: "url" };
    if (detected === "audio") partial.mediaType = "audio";
    else if (detected === "video" || detected === "video_embed") partial.mediaType = "video";
    update(partial);
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/slides/upload-media", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const payload = (await response.json()) as { url?: string; mimeType?: string };
      if (!payload.url) throw new Error("Missing URL");
      const isAudio = file.type.startsWith("audio/");
      update({
        url: payload.url,
        mimeType: payload.mimeType ?? file.type,
        mediaType: isAudio ? "audio" : "video",
        source: "upload",
      });
    } catch (error) {
      console.error("Media upload failed:", error);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <EditorSection title="Media">
        <div>
          <FieldLabel>Source</FieldLabel>
          <FieldSelect
            value={data.source ?? "url"}
            onChange={(v) => update({ source: v as "upload" | "url" })}
            options={[
              { value: "url", label: "URL" },
              { value: "upload", label: "Upload File" },
            ]}
          />
        </div>

        {data.source === "upload" ? (
          <div>
            <input
              ref={inputRef}
              type="file"
              accept="video/*,audio/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFileUpload(file);
              }}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="w-full text-xs py-1.5 rounded-md border border-border bg-surface-raised text-ink hover:bg-surface-raised/80 disabled:opacity-60"
            >
              <Upload size={12} className="inline mr-1" />
              {uploading ? "Uploading..." : data.url ? "Replace File" : "Choose File"}
            </button>
            {data.url && (
              <p className="text-[10px] text-ink-muted mt-1 truncate">{data.url}</p>
            )}
          </div>
        ) : (
          <div>
            <FieldLabel>URL</FieldLabel>
            <FieldInput
              value={data.url ?? ""}
              onChange={handleUrlChange}
              placeholder="https://example.com/video.mp4"
            />
          </div>
        )}

        <div>
          <FieldLabel>Media Type</FieldLabel>
          <FieldSelect
            value={data.mediaType ?? "video"}
            onChange={(v) => update({ mediaType: v as "video" | "audio" })}
            options={[
              { value: "video", label: "Video" },
              { value: "audio", label: "Audio" },
            ]}
          />
        </div>

        <div>
          <FieldLabel>Title</FieldLabel>
          <FieldInput
            value={data.title ?? ""}
            onChange={(v) => update({ title: v || undefined })}
            placeholder="Display title"
          />
        </div>

        {data.mediaType === "video" && (
          <div>
            <FieldLabel>Poster Image URL</FieldLabel>
            <FieldInput
              value={data.posterUrl ?? ""}
              onChange={(v) => update({ posterUrl: v || undefined })}
              placeholder="https://example.com/poster.jpg"
            />
          </div>
        )}
      </EditorSection>

      <EditorSection title="Playback">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.autoplay ?? false}
            onChange={(e) => update({ autoplay: e.target.checked })}
            className="rounded border-border"
          />
          <span className="text-xs text-ink">Autoplay in presenter mode</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.loop ?? false}
            onChange={(e) => update({ loop: e.target.checked })}
            className="rounded border-border"
          />
          <span className="text-xs text-ink">Loop</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.muted ?? false}
            onChange={(e) => update({ muted: e.target.checked })}
            className="rounded border-border"
          />
          <span className="text-xs text-ink">Muted</span>
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <FieldLabel>Start (sec)</FieldLabel>
            <FieldInput
              value={data.startTime != null ? String(data.startTime) : ""}
              onChange={(v) => update({ startTime: v ? Number(v) : undefined })}
              placeholder="0"
              type="number"
            />
          </div>
          <div className="flex-1">
            <FieldLabel>End (sec)</FieldLabel>
            <FieldInput
              value={data.endTime != null ? String(data.endTime) : ""}
              onChange={(v) => update({ endTime: v ? Number(v) : undefined })}
              placeholder=""
              type="number"
            />
          </div>
        </div>
      </EditorSection>

      {data.url && (
        <button
          type="button"
          onClick={() => update({ url: undefined, mimeType: undefined, posterUrl: undefined })}
          className="w-full text-xs py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50"
        >
          Remove Media
        </button>
      )}
    </div>
  );
}
