"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Sparkle,
  Copy,
  FileText,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { SynthesisReportType } from "@/lib/research/types";

interface SynthesisDialogProps {
  selectedPaperCount: number;
  isSynthesizing: boolean;
  report: string | null;
  onGenerate: (reportType: SynthesisReportType, customInstructions?: string) => void;
  onInsertIntoEditor: () => void;
  onBack: () => void;
}

const REPORT_TYPES: {
  type: SynthesisReportType;
  label: string;
  description: string;
}[] = [
  {
    type: "quick_summary",
    label: "Quick Summary",
    description: "2-3 paragraphs summarizing key findings",
  },
  {
    type: "literature_review",
    label: "Literature Review Section",
    description: "500-1000 words, structured with subheadings",
  },
  {
    type: "evidence_summary",
    label: "Evidence Summary + Narrative",
    description: "Structured findings table + 2-3 interpretive paragraphs",
  },
  {
    type: "custom",
    label: "Custom Report",
    description: "Specify your own structure and length",
  },
];

export function SynthesisDialog({
  selectedPaperCount,
  isSynthesizing,
  report,
  onGenerate,
  onInsertIntoEditor,
  onBack,
}: SynthesisDialogProps) {
  const [selectedType, setSelectedType] =
    useState<SynthesisReportType | null>(null);
  const [customInstructions, setCustomInstructions] = useState("");
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (report && reportRef.current) {
      reportRef.current.scrollTop = reportRef.current.scrollHeight;
    }
  }, [report]);

  const handleCopy = () => {
    if (report) {
      navigator.clipboard.writeText(report);
    }
  };

  // If we have a report, show it
  if (report || isSynthesizing) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
          >
            <ArrowLeft size={12} />
            Back
          </button>
          {report && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
              >
                <Copy size={10} />
                Copy
              </button>
            </div>
          )}
        </div>

        <div
          ref={reportRef}
          className="flex-1 overflow-y-auto px-3 py-3"
        >
          {isSynthesizing && !report && (
            <div className="flex items-center gap-2 py-4">
              <Sparkle size={14} className="text-brand animate-spin" />
              <span className="text-xs text-brand">Generating synthesis...</span>
            </div>
          )}
          {report && (
            <div className="prose prose-sm text-xs text-ink leading-relaxed whitespace-pre-wrap">
              {report}
            </div>
          )}
          {isSynthesizing && report && (
            <span className="inline-block w-2 h-3 bg-brand/50 animate-pulse ml-0.5" />
          )}
        </div>

        {report && !isSynthesizing && (
          <div className="px-3 py-2 border-t border-border-subtle">
            <button
              onClick={onInsertIntoEditor}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-brand text-white text-xs font-medium hover:bg-brand-hover transition-colors w-full justify-center"
            >
              <FileText size={12} />
              Insert into Editor
            </button>
          </div>
        )}
      </div>
    );
  }

  // Report type selection
  return (
    <div className="flex flex-col h-full">
      <button
        onClick={onBack}
        className="flex items-center gap-1 px-3 py-2 text-xs text-ink-muted hover:text-ink border-b border-border-subtle"
      >
        <ArrowLeft size={12} />
        Back
      </button>

      <div className="px-3 py-3 space-y-3 overflow-y-auto">
        <div>
          <h3 className="text-xs font-semibold text-ink">
            Generate Research Report
          </h3>
          <p className="text-[10px] text-ink-muted mt-0.5">
            Synthesize {selectedPaperCount} paper
            {selectedPaperCount !== 1 ? "s" : ""} into a structured narrative
          </p>
        </div>

        <div className="space-y-1.5">
          {REPORT_TYPES.map(({ type, label, description }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                "w-full text-left p-2 rounded-lg border transition-colors",
                selectedType === type
                  ? "bg-brand/5 border-brand/30"
                  : "bg-surface-raised border-border hover:border-border-subtle"
              )}
            >
              <p className="text-xs font-medium text-ink">{label}</p>
              <p className="text-[10px] text-ink-muted mt-0.5">
                {description}
              </p>
            </button>
          ))}
        </div>

        {selectedType === "custom" && (
          <textarea
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="Describe the structure and focus of your report..."
            className="w-full p-2 rounded-lg bg-surface-raised border border-border text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/40 resize-none"
            rows={3}
          />
        )}

        <button
          onClick={() => {
            if (selectedType) {
              onGenerate(
                selectedType,
                selectedType === "custom" ? customInstructions : undefined
              );
            }
          }}
          disabled={!selectedType}
          className="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-brand text-white text-xs font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
        >
          <Sparkle size={12} />
          Generate Report
        </button>
      </div>
    </div>
  );
}
