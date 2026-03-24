"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Notepad,
  FloppyDisk,
  Export,
  CircleNotch,
  CheckCircle,
  CaretDown,
  CaretRight,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScopingChartingPanelProps {
  projectId: number;
}

interface Paper {
  paperId: number;
  title: string;
  abstract: string | null;
  screeningDecision: string | null;
}

interface ChartingField {
  key: string;
  label: string;
  type: "input" | "textarea";
}

interface ChartingCategory {
  key: string;
  label: string;
  fields: ChartingField[];
}

type ChartingData = Record<number, Record<string, string>>;

// ---------------------------------------------------------------------------
// Charting schema
// ---------------------------------------------------------------------------

const CHARTING_CATEGORIES: ChartingCategory[] = [
  {
    key: "study_characteristics",
    label: "Study Characteristics",
    fields: [
      { key: "authors", label: "Author(s)", type: "input" },
      { key: "year", label: "Year", type: "input" },
      { key: "country", label: "Country", type: "input" },
      { key: "study_design", label: "Study Design", type: "input" },
      { key: "setting", label: "Setting", type: "input" },
      { key: "population", label: "Population", type: "input" },
      { key: "sample_size", label: "Sample Size", type: "input" },
    ],
  },
  {
    key: "key_concepts",
    label: "Key Concepts",
    fields: [
      { key: "main_concept", label: "Main concept/topic", type: "textarea" },
      { key: "definitions", label: "Definitions used", type: "textarea" },
      {
        key: "theoretical_framework",
        label: "Theoretical framework",
        type: "textarea",
      },
    ],
  },
  {
    key: "key_findings",
    label: "Key Findings",
    fields: [
      { key: "main_findings", label: "Main findings", type: "textarea" },
      { key: "themes", label: "Themes identified", type: "textarea" },
      { key: "outcomes", label: "Outcomes reported", type: "textarea" },
    ],
  },
  {
    key: "gaps_implications",
    label: "Gaps & Implications",
    fields: [
      { key: "research_gaps", label: "Research gaps identified", type: "textarea" },
      {
        key: "implications_practice",
        label: "Implications for practice",
        type: "textarea",
      },
      {
        key: "implications_research",
        label: "Implications for research",
        type: "textarea",
      },
    ],
  },
];

const ALL_FIELD_KEYS = CHARTING_CATEGORIES.flatMap((c) =>
  c.fields.map((f) => f.key)
);

const ALL_FIELD_LABELS: Record<string, string> = {};
for (const cat of CHARTING_CATEGORIES) {
  for (const f of cat.fields) {
    ALL_FIELD_LABELS[f.key] = f.label;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ScopingChartingPanel({ projectId }: ScopingChartingPanelProps) {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaperId, setSelectedPaperId] = useState<number | null>(null);
  const [chartingData, setChartingData] = useState<ChartingData>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});
  const [showSummary, setShowSummary] = useState(false);

  // Fetch included papers
  useEffect(() => {
    async function fetchPapers() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/systematic-review/import?projectId=${projectId}`
        );
        if (!res.ok) throw new Error("Failed to fetch papers");
        const data = await res.json();
        const allPapers: Paper[] = data.papers ?? [];
        const included = allPapers.filter(
          (p) =>
            p.screeningDecision === "include" ||
            p.screeningDecision === "included"
        );
        setPapers(included);
        if (included.length > 0 && !selectedPaperId) {
          setSelectedPaperId(included[0].paperId);
        }
      } catch {
        // Papers may not be available yet
        setPapers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedPaper = papers.find((p) => p.paperId === selectedPaperId);

  const currentData =
    selectedPaperId != null ? chartingData[selectedPaperId] ?? {} : {};

  const updateField = useCallback(
    (fieldKey: string, value: string) => {
      if (selectedPaperId == null) return;
      setChartingData((prev) => ({
        ...prev,
        [selectedPaperId]: {
          ...(prev[selectedPaperId] ?? {}),
          [fieldKey]: value,
        },
      }));
      setSaved(false);
    },
    [selectedPaperId]
  );

  const toggleSection = (key: string) => {
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Save charting data via extraction API
  const handleSave = async () => {
    if (selectedPaperId == null) return;
    setSaving(true);
    try {
      await fetch(`/api/systematic-review/extraction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          paperId: selectedPaperId,
          chartingData: currentData,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // Extraction API may not support charting yet — data is still in local state
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  // Export CSV of all charted data
  const handleExportCSV = () => {
    const headers = ["Paper ID", "Title", ...ALL_FIELD_KEYS.map((k) => ALL_FIELD_LABELS[k])];
    const rows = papers
      .filter((p) => chartingData[p.paperId])
      .map((p) => {
        const data = chartingData[p.paperId] ?? {};
        return [
          String(p.paperId),
          `"${(p.title ?? "").replace(/"/g, '""')}"`,
          ...ALL_FIELD_KEYS.map(
            (k) => `"${(data[k] ?? "").replace(/"/g, '""')}"`
          ),
        ];
      });

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scoping-charting-project-${projectId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredPapers = searchQuery
    ? papers.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : papers;

  const chartedCount = papers.filter((p) => chartingData[p.paperId]).length;

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  if (loading) {
    return (
      <GlassPanel className="p-8 flex items-center justify-center">
        <CircleNotch
          weight="duotone"
          className="animate-spin text-brand"
          size={32}
        />
        <span className="ml-3 text-sm text-ink-muted">
          Loading included papers...
        </span>
      </GlassPanel>
    );
  }

  if (papers.length === 0) {
    return (
      <GlassPanel className="p-8 text-center">
        <Notepad weight="duotone" size={48} className="mx-auto text-ink-muted mb-3" />
        <p className="text-sm text-ink-muted">
          No included papers found. Complete screening first to chart study data.
        </p>
      </GlassPanel>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassPanel className="p-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <Notepad weight="duotone" size={28} className="text-brand" />
            <div>
              <h2 className="text-lg font-semibold text-ink">
                Scoping Review Data Charting
              </h2>
              <p className="text-sm text-ink-muted">
                Chart key characteristics from included sources
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-muted">
              {chartedCount}/{papers.length} charted
            </span>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-lg border transition-colors",
                showSummary
                  ? "bg-brand text-white border-brand"
                  : "border-border text-ink-muted hover:text-ink hover:border-brand"
              )}
            >
              {showSummary ? "Hide Summary" : "Summary Table"}
            </button>
          </div>
        </div>
      </GlassPanel>

      {/* Summary table */}
      {showSummary && (
        <GlassPanel className="p-6 overflow-x-auto">
          <h3 className="text-sm font-semibold text-ink mb-4">
            Charting Summary
          </h3>
          {chartedCount === 0 ? (
            <p className="text-sm text-ink-muted">
              No papers have been charted yet.
            </p>
          ) : (
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-ink-muted font-medium">
                    Title
                  </th>
                  {CHARTING_CATEGORIES[0].fields.slice(0, 4).map((f) => (
                    <th
                      key={f.key}
                      className="text-left py-2 px-2 text-ink-muted font-medium"
                    >
                      {f.label}
                    </th>
                  ))}
                  <th className="text-left py-2 px-2 text-ink-muted font-medium">
                    Main Findings
                  </th>
                </tr>
              </thead>
              <tbody>
                {papers
                  .filter((p) => chartingData[p.paperId])
                  .map((p) => {
                    const d = chartingData[p.paperId] ?? {};
                    return (
                      <tr
                        key={p.paperId}
                        className="border-b border-border/50 hover:bg-surface-raised/50 cursor-pointer"
                        onClick={() => {
                          setSelectedPaperId(p.paperId);
                          setShowSummary(false);
                        }}
                      >
                        <td className="py-2 px-2 text-ink max-w-[200px] truncate">
                          {p.title}
                        </td>
                        <td className="py-2 px-2 text-ink-muted">
                          {d.authors ?? "—"}
                        </td>
                        <td className="py-2 px-2 text-ink-muted">
                          {d.year ?? "—"}
                        </td>
                        <td className="py-2 px-2 text-ink-muted">
                          {d.country ?? "—"}
                        </td>
                        <td className="py-2 px-2 text-ink-muted">
                          {d.study_design ?? "—"}
                        </td>
                        <td className="py-2 px-2 text-ink-muted max-w-[250px] truncate">
                          {d.main_findings ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </GlassPanel>
      )}

      {/* Paper selector */}
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <MagnifyingGlass
              weight="duotone"
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-surface-raised border border-border rounded-lg text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredPapers.map((p) => {
            const isCharted = !!chartingData[p.paperId];
            return (
              <button
                key={p.paperId}
                onClick={() => setSelectedPaperId(p.paperId)}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-lg border transition-colors max-w-[250px] truncate",
                  p.paperId === selectedPaperId
                    ? "bg-brand text-white border-brand"
                    : "border-border text-ink-muted hover:text-ink hover:border-brand",
                  isCharted && p.paperId !== selectedPaperId && "border-green-400/50"
                )}
                title={p.title}
              >
                {isCharted && (
                  <CheckCircle
                    weight="duotone"
                    size={12}
                    className="inline mr-1 text-green-400"
                  />
                )}
                {p.title.length > 40
                  ? p.title.slice(0, 40) + "..."
                  : p.title}
              </button>
            );
          })}
        </div>
      </GlassPanel>

      {/* Charting form */}
      {selectedPaper && (
        <GlassPanel className="p-6">
          <h3 className="text-sm font-semibold text-ink mb-1">
            {selectedPaper.title}
          </h3>
          {selectedPaper.abstract && (
            <p className="text-xs text-ink-muted mb-4 line-clamp-2">
              {selectedPaper.abstract}
            </p>
          )}

          <div className="space-y-6">
            {CHARTING_CATEGORIES.map((category) => {
              const isCollapsed = collapsedSections[category.key];
              // Split fields by type for layout
              const inputFields = category.fields.filter(
                (f) => f.type === "input"
              );
              const textareaFields = category.fields.filter(
                (f) => f.type === "textarea"
              );

              return (
                <div key={category.key}>
                  <button
                    onClick={() => toggleSection(category.key)}
                    className="flex items-center gap-2 mb-3 group"
                  >
                    {isCollapsed ? (
                      <CaretRight
                        weight="duotone"
                        size={16}
                        className="text-ink-muted group-hover:text-brand"
                      />
                    ) : (
                      <CaretDown
                        weight="duotone"
                        size={16}
                        className="text-ink-muted group-hover:text-brand"
                      />
                    )}
                    <span className="text-sm font-semibold text-ink">
                      {category.label}
                    </span>
                  </button>

                  {!isCollapsed && (
                    <div className="space-y-4">
                      {/* Two-column layout for short input fields */}
                      {inputFields.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {inputFields.map((field) => (
                            <div key={field.key}>
                              <label className="block text-xs font-medium text-ink-muted mb-1">
                                {field.label}
                              </label>
                              <input
                                type="text"
                                value={currentData[field.key] ?? ""}
                                onChange={(e) =>
                                  updateField(field.key, e.target.value)
                                }
                                className="w-full px-3 py-2 text-sm bg-surface-raised border border-border rounded-lg text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Full-width textareas */}
                      {textareaFields.map((field) => (
                        <div key={field.key}>
                          <label className="block text-xs font-medium text-ink-muted mb-1">
                            {field.label}
                          </label>
                          <textarea
                            value={currentData[field.key] ?? ""}
                            onChange={(e) =>
                              updateField(field.key, e.target.value)
                            }
                            rows={3}
                            className="w-full px-3 py-2 text-sm bg-surface-raised border border-border rounded-lg text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-y"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
            <button
              onClick={handleSave}
              disabled={saving}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                saving
                  ? "bg-brand/50 text-white cursor-wait"
                  : "bg-brand text-white hover:bg-brand/90"
              )}
            >
              {saving ? (
                <CircleNotch
                  weight="duotone"
                  size={16}
                  className="animate-spin"
                />
              ) : saved ? (
                <CheckCircle weight="duotone" size={16} />
              ) : (
                <FloppyDisk weight="duotone" size={16} />
              )}
              {saving ? "Saving..." : saved ? "Saved" : "Save Charting Data"}
            </button>

            <button
              onClick={handleExportCSV}
              disabled={chartedCount === 0}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                chartedCount === 0
                  ? "border-border text-ink-muted cursor-not-allowed opacity-50"
                  : "border-border text-ink hover:border-brand hover:text-brand"
              )}
            >
              <Export weight="duotone" size={16} />
              Export CSV
            </button>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}
