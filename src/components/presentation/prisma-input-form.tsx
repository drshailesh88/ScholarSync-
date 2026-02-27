"use client";

import { useState, useEffect, useId } from "react";
import {
  FlowArrow,
  Plus,
  Trash,
  MagnifyingGlass,
  Funnel,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/types/presentation";
import {
  type PrismaFlowData,
  createEmptyPrismaData,
  generatePrismaMermaid,
} from "@/lib/presentation/prisma-diagram";
import mermaid from "mermaid";

interface PrismaInputFormProps {
  onInsert: (block: ContentBlock) => void;
  onCancel: () => void;
  initialData?: Partial<PrismaFlowData>;
}

const PHASE_STYLES = {
  identification: {
    label: "Identification",
    icon: MagnifyingGlass,
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
  },
  screening: {
    label: "Screening",
    icon: Funnel,
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
  },
  eligibility: {
    label: "Eligibility",
    icon: ArrowRight,
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
  },
  included: {
    label: "Included",
    icon: CheckCircle,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
} as const;

export function PrismaInputForm({
  onInsert,
  onCancel,
  initialData,
}: PrismaInputFormProps) {
  const [data, setData] = useState<PrismaFlowData>({
    ...createEmptyPrismaData(),
    ...initialData,
  });

  const [previewSvg, setPreviewSvg] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const instanceId = useId().replace(/:/g, "_");

  // Debounced Mermaid preview
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const syntax = generatePrismaMermaid(data);
        // Mermaid.render produces SVG from its own diagram DSL parser --
        // it does not pass through arbitrary HTML, making innerHTML safe here.
        const { svg } = await mermaid.render(
          `prisma_preview_${instanceId}`,
          syntax
        );
        setPreviewSvg(svg);
        setPreviewError(null);
      } catch (err) {
        setPreviewError(
          err instanceof Error ? err.message : "Preview failed"
        );
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [data, instanceId]);

  const updateField = (
    field: keyof Omit<PrismaFlowData, "fullTextExclusionReasons">,
    value: number
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const addExclusionReason = () => {
    setData((prev) => ({
      ...prev,
      fullTextExclusionReasons: [
        ...prev.fullTextExclusionReasons,
        { reason: "", count: 0 },
      ],
    }));
  };

  const updateExclusionReason = (
    index: number,
    field: "reason" | "count",
    value: string | number
  ) => {
    setData((prev) => {
      const reasons = [...prev.fullTextExclusionReasons];
      reasons[index] = { ...reasons[index], [field]: value };
      return { ...prev, fullTextExclusionReasons: reasons };
    });
  };

  const removeExclusionReason = (index: number) => {
    setData((prev) => ({
      ...prev,
      fullTextExclusionReasons: prev.fullTextExclusionReasons.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleInsert = () => {
    const syntax = generatePrismaMermaid(data);
    const block: ContentBlock = {
      type: "diagram",
      data: {
        syntax,
        diagramType: "prisma",
        caption: "PRISMA 2020 flow diagram",
      },
    };
    onInsert(block);
  };

  return (
    <div className="flex gap-4 max-h-[70vh]">
      {/* Left: Input Form */}
      <div className="w-1/2 overflow-y-auto pr-3 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <FlowArrow size={18} className="text-brand" />
          <h3 className="text-sm font-semibold text-ink">
            PRISMA 2020 Flow Diagram
          </h3>
        </div>

        {/* Identification Phase */}
        <PhaseSection phase="identification">
          <NumberField
            label="Records from databases"
            value={data.databaseRecords}
            onChange={(v) => updateField("databaseRecords", v)}
          />
          <NumberField
            label="Records from registers"
            value={data.registerRecords}
            onChange={(v) => updateField("registerRecords", v)}
          />
          <NumberField
            label="Records from other sources"
            value={data.otherSourceRecords}
            onChange={(v) => updateField("otherSourceRecords", v)}
          />
        </PhaseSection>

        {/* Screening Phase */}
        <PhaseSection phase="screening">
          <NumberField
            label="Duplicates removed"
            value={data.duplicatesRemoved}
            onChange={(v) => updateField("duplicatesRemoved", v)}
          />
          <NumberField
            label="Records screened"
            value={data.recordsScreened}
            onChange={(v) => updateField("recordsScreened", v)}
          />
          <NumberField
            label="Records excluded"
            value={data.recordsExcluded}
            onChange={(v) => updateField("recordsExcluded", v)}
          />
        </PhaseSection>

        {/* Eligibility Phase */}
        <PhaseSection phase="eligibility">
          <NumberField
            label="Full-text articles assessed"
            value={data.fullTextAssessed}
            onChange={(v) => updateField("fullTextAssessed", v)}
          />
          <NumberField
            label="Full-text articles excluded"
            value={data.fullTextExcluded}
            onChange={(v) => updateField("fullTextExcluded", v)}
          />

          {/* Exclusion Reasons */}
          <div className="mt-2 space-y-1.5">
            <p className="text-[10px] font-medium text-ink-muted uppercase tracking-wider">
              Exclusion Reasons
            </p>
            {data.fullTextExclusionReasons.map((r, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={r.reason}
                  onChange={(e) =>
                    updateExclusionReason(i, "reason", e.target.value)
                  }
                  placeholder="Reason"
                  className="flex-1 text-xs px-2 py-1 rounded border border-border bg-transparent text-ink focus:outline-none focus:ring-1 focus:ring-brand/30"
                />
                <input
                  type="number"
                  value={r.count || ""}
                  onChange={(e) =>
                    updateExclusionReason(
                      i,
                      "count",
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="n"
                  className="w-16 text-xs px-2 py-1 rounded border border-border bg-transparent text-ink focus:outline-none focus:ring-1 focus:ring-brand/30"
                />
                <button
                  onClick={() => removeExclusionReason(i)}
                  className="p-1 text-red-400 hover:text-red-500"
                >
                  <Trash size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={addExclusionReason}
              className="flex items-center gap-1 text-[10px] text-brand hover:text-brand/80"
            >
              <Plus size={10} /> Add Exclusion Reason
            </button>
          </div>
        </PhaseSection>

        {/* Included Phase */}
        <PhaseSection phase="included">
          <NumberField
            label="Studies in qualitative synthesis"
            value={data.studiesIncluded}
            onChange={(v) => updateField("studiesIncluded", v)}
          />
          <NumberField
            label="Studies in quantitative synthesis"
            value={data.reportsIncluded}
            onChange={(v) => updateField("reportsIncluded", v)}
          />
        </PhaseSection>

        {/* Actions */}
        <div className="flex gap-2 pt-2 sticky bottom-0 bg-surface pb-1">
          <button
            onClick={handleInsert}
            className="flex-1 px-3 py-1.5 rounded-md text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
          >
            Insert into Slide
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded-md text-xs font-medium border border-border text-ink-muted hover:bg-surface-raised transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="w-1/2 border-l border-border pl-4 flex flex-col">
        <p className="text-[10px] uppercase tracking-wider text-ink-muted font-medium mb-2">
          Live Preview
        </p>
        <div className="flex-1 overflow-auto rounded-lg border border-border bg-white p-3 flex items-center justify-center">
          {previewError ? (
            <div className="text-xs text-red-500 text-center">
              <p className="font-medium">Preview unavailable</p>
              <p className="text-[10px] opacity-60 mt-1">{previewError}</p>
            </div>
          ) : previewSvg ? (
            // Mermaid SVG output is generated from its own DSL parser and is safe for innerHTML.
            // See: https://mermaid.js.org/config/security.html
            <div
              className="max-w-full overflow-hidden [&_svg]:max-w-full [&_svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: previewSvg }}
            />
          ) : (
            <p className="text-xs text-ink-muted opacity-50">
              Enter values to see the PRISMA diagram
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper components
// ---------------------------------------------------------------------------

function PhaseSection({
  phase,
  children,
}: {
  phase: keyof typeof PHASE_STYLES;
  children: React.ReactNode;
}) {
  const style = PHASE_STYLES[phase];
  const Icon = style.icon;

  return (
    <div className={cn("rounded-lg border p-3", style.bg, style.border)}>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={14} className={style.text} />
        <span
          className={cn(
            "text-[10px] uppercase tracking-wider font-semibold",
            style.text
          )}
        >
          {style.label}
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <label className="text-xs text-ink-muted">{label}</label>
      <input
        type="number"
        min={0}
        value={value || ""}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-20 text-xs px-2 py-1 rounded border border-border bg-white text-ink text-right focus:outline-none focus:ring-1 focus:ring-brand/30"
      />
    </div>
  );
}
