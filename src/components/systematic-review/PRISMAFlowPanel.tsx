"use client";

import { useState, useCallback } from "react";
import { FlowArrow, CircleNotch, Eye, Download } from "@phosphor-icons/react";
import { GlassPanel } from "@/components/ui/glass-panel";

interface PRISMAFlowPanelProps {
  projectId: number;
}

export function PRISMAFlowPanel({ projectId }: PRISMAFlowPanelProps) {
  const [flowSvg, setFlowSvg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFlow = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/systematic-review/prisma-flow?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load PRISMA flow");
      const data = await res.json();
      setFlowSvg(data.svg);
    } catch {
      setError("Failed to generate PRISMA flow diagram. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const downloadSvg = () => {
    if (!flowSvg) return;
    const blob = new Blob([flowSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prisma-flow-diagram.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <FlowArrow weight="duotone" className="text-brand" />
          PRISMA 2020 Flow Diagram
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Auto-generated from your actual screening numbers. Tracks records
          through identification, screening, eligibility, and inclusion.
        </p>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">&#x2715;</button>
          </div>
        )}

        <div className="flex gap-3 items-end">
          <button
            onClick={loadFlow}
            disabled={loading}
            className="px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <CircleNotch weight="bold" className="animate-spin" size={16} />
            ) : (
              <Eye weight="bold" size={16} />
            )}
            Generate Diagram
          </button>
          {flowSvg && (
            <button
              onClick={downloadSvg}
              className="px-4 py-2 border border-border text-ink rounded text-sm font-medium hover:bg-surface-raised flex items-center gap-2"
            >
              <Download size={16} />
              Download SVG
            </button>
          )}
        </div>
      </GlassPanel>

      {flowSvg && (
        <GlassPanel className="p-6">
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: flowSvg }}
          />
        </GlassPanel>
      )}
    </div>
  );
}
