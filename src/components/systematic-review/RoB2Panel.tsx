"use client";

import { useState } from "react";
import { ShieldCheck } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

interface RoB2PanelProps {
  projectId: number;
}

interface RoB2Result {
  paperId: number;
  domains: Array<{
    domain: string;
    judgment: string;
    supportText: string;
  }>;
  overallJudgment: string;
}

const ROB2_DOMAIN_LABELS: Record<string, string> = {
  D1: "Randomization",
  D2: "Deviations",
  D3: "Missing data",
  D4: "Measurement",
  D5: "Selection",
};

const JUDGMENT_COLORS: Record<string, string> = {
  low: "bg-emerald-500 text-white",
  some_concerns: "bg-amber-500 text-white",
  high: "bg-red-500 text-white",
  Low: "bg-emerald-500 text-white",
  "Some concerns": "bg-amber-500 text-white",
  High: "bg-red-500 text-white",
};

export function RoB2Panel({ projectId: _projectId }: RoB2PanelProps) {
  const [results, _setResults] = useState<RoB2Result[]>([]);

  return (
    <div className="space-y-6 max-w-4xl">
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <ShieldCheck weight="duotone" className="text-brand" />
          RoB 2 Risk of Bias Assessment
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Cochrane RoB 2 tool — evaluates 5 domains with signaling questions.
          AI answers each question with supporting text from the paper.
          Generates per-domain and overall Low / Some Concerns / High judgments.
        </p>

        {/* RoB 2 Domains Legend */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {Object.entries(ROB2_DOMAIN_LABELS).map(([id, name]) => (
            <div
              key={id}
              className="text-center p-2 bg-surface-raised rounded border border-border"
            >
              <div className="text-xs font-medium text-ink">{id}</div>
              <div className="text-xs text-ink-muted">{name}</div>
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Traffic Light Table */}
      {results.length > 0 && (
        <GlassPanel className="p-6">
          <h3 className="text-sm font-semibold text-ink mb-3">
            Risk of Bias Summary (Traffic Light)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-ink-muted font-medium">
                    Study
                  </th>
                  {Object.keys(ROB2_DOMAIN_LABELS).map((d) => (
                    <th
                      key={d}
                      className="text-center py-2 text-ink-muted font-medium"
                    >
                      {d}
                    </th>
                  ))}
                  <th className="text-center py-2 text-ink-muted font-medium">
                    Overall
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.paperId} className="border-b border-border/50">
                    <td className="py-2 text-ink">Paper #{r.paperId}</td>
                    {Object.keys(ROB2_DOMAIN_LABELS).map((d) => {
                      const domain = r.domains.find(
                        (dom) => dom.domain === d
                      );
                      const judgment = domain?.judgment || "—";
                      return (
                        <td key={d} className="text-center py-2">
                          <span
                            className={cn(
                              "inline-block w-6 h-6 rounded-full text-xs leading-6",
                              JUDGMENT_COLORS[judgment] || "bg-gray-200"
                            )}
                            title={judgment}
                          >
                            {judgment === "low" || judgment === "Low"
                              ? "+"
                              : judgment === "high" || judgment === "High"
                                ? "-"
                                : "?"}
                          </span>
                        </td>
                      );
                    })}
                    <td className="text-center py-2">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          JUDGMENT_COLORS[r.overallJudgment] || "bg-gray-200"
                        )}
                      >
                        {r.overallJudgment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}
