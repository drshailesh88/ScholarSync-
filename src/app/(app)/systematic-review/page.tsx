"use client";

import { useState, useCallback } from "react";
import {
  MagnifyingGlass,
  Funnel,
  ChartBar,
  FlowArrow,
  ShieldCheck,
  Table,
  CircleNotch,
  CheckCircle,
  XCircle,
  Warning,
  ArrowRight,
  Plus,
  Trash,
  Play,
  Eye,
  Download,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Tabs } from "@/components/ui/tabs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PICOInput {
  population: string;
  intervention: string;
  comparison: string;
  outcome: string;
}

interface Criterion {
  id?: number;
  type: "inclusion" | "exclusion";
  description: string;
}

interface ScreeningResult {
  paperId: number;
  title: string;
  decision: "include" | "exclude" | "conflict";
  confidence: number;
  requiresHumanReview: boolean;
  reason: string;
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

const WORKFLOW_TABS = [
  { key: "strategy", label: "Search Strategy" },
  { key: "screening", label: "AI Screening" },
  { key: "prisma", label: "PRISMA Flow" },
  { key: "rob2", label: "Risk of Bias" },
  { key: "extraction", label: "Data Extraction" },
];

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function SystematicReviewPage() {
  const [activeTab, setActiveTab] = useState("strategy");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <h1 className="text-xl font-semibold text-ink">
          Systematic Review
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          PRISMA 2020-compliant systematic review pipeline with AI-powered
          screening, data extraction, and risk of bias assessment.
        </p>
      </div>

      {/* Workflow Tabs */}
      <div className="px-6 pt-4 border-b border-border">
        <Tabs tabs={WORKFLOW_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "strategy" && <SearchStrategyPanel />}
        {activeTab === "screening" && <ScreeningPanel />}
        {activeTab === "prisma" && <PRISMAFlowPanel />}
        {activeTab === "rob2" && <RoB2Panel />}
        {activeTab === "extraction" && <DataExtractionPanel />}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. Search Strategy Panel
// ---------------------------------------------------------------------------

function SearchStrategyPanel() {
  const [pico, setPico] = useState<PICOInput>({
    population: "",
    intervention: "",
    comparison: "",
    outcome: "",
  });
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<{
    fullSearchString: string;
    blocks: Array<{
      picoElement: string;
      meshTerms: string[];
      freeTextTerms: string[];
      booleanBlock: string;
    }>;
    estimatedResults?: number;
    suggestedFilters: string[];
  } | null>(null);

  const generateStrategy = useCallback(async () => {
    if (!pico.population || !pico.intervention || !pico.outcome) return;

    setLoading(true);
    try {
      const res = await fetch("/api/systematic-review/search-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pico),
      });
      if (!res.ok) throw new Error("Failed to generate strategy");
      const data = await res.json();
      setStrategy(data);
    } catch {
      // Error handled by UI
    } finally {
      setLoading(false);
    }
  }, [pico]);

  return (
    <div className="space-y-6 max-w-4xl">
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <MagnifyingGlass weight="duotone" className="text-brand" />
          PICO Framework
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Define your research question using the PICO framework. The AI will
          generate a comprehensive PubMed search strategy with MeSH terms and
          Boolean operators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            [
              ["population", "Population", "e.g., Adults with type 2 diabetes"],
              ["intervention", "Intervention", "e.g., Metformin monotherapy"],
              ["comparison", "Comparison", "e.g., Sulfonylurea monotherapy"],
              ["outcome", "Outcome", "e.g., HbA1c reduction at 12 months"],
            ] as const
          ).map(([key, label, placeholder]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-ink mb-1">
                {label} {key !== "comparison" && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={pico[key]}
                onChange={(e) =>
                  setPico((prev) => ({ ...prev, [key]: e.target.value }))
                }
                placeholder={placeholder}
                className="w-full px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 focus:border-brand outline-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={generateStrategy}
          disabled={loading || !pico.population || !pico.intervention || !pico.outcome}
          className="mt-4 px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <CircleNotch weight="bold" className="animate-spin" size={16} />
          ) : (
            <MagnifyingGlass weight="bold" size={16} />
          )}
          Generate Search Strategy
        </button>
      </GlassPanel>

      {strategy && (
        <GlassPanel className="p-6">
          <h3 className="text-lg font-semibold text-ink mb-4">
            Generated Search Strategy
          </h3>

          {strategy.estimatedResults !== undefined && (
            <div className="mb-4 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded text-sm text-blue-700">
              Estimated PubMed results: <strong>{strategy.estimatedResults.toLocaleString()}</strong>
            </div>
          )}

          {/* PICO Blocks */}
          <div className="space-y-3 mb-6">
            {strategy.blocks.map((block, i) => (
              <div key={i} className="border border-border rounded p-3">
                <div className="text-sm font-medium text-ink capitalize mb-2">
                  {block.picoElement}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {block.meshTerms.map((term, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 text-xs rounded"
                    >
                      {term} [MeSH]
                    </span>
                  ))}
                  {block.freeTextTerms.map((term, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 bg-sky-500/10 text-sky-700 text-xs rounded"
                    >
                      {term}
                    </span>
                  ))}
                </div>
                <code className="block text-xs text-ink-muted bg-surface-raised p-2 rounded overflow-x-auto">
                  {block.booleanBlock}
                </code>
              </div>
            ))}
          </div>

          {/* Full Search String */}
          <div>
            <div className="text-sm font-medium text-ink mb-2">
              Complete PubMed Search String
            </div>
            <div className="relative">
              <pre className="text-xs text-ink bg-surface-raised p-3 rounded border border-border overflow-x-auto whitespace-pre-wrap">
                {strategy.fullSearchString}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(strategy.fullSearchString)}
                className="absolute top-2 right-2 px-2 py-1 text-xs bg-brand/10 text-brand rounded hover:bg-brand/20"
              >
                Copy
              </button>
            </div>
          </div>

          {strategy.suggestedFilters.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium text-ink mb-1">
                Suggested Filters
              </div>
              <div className="flex flex-wrap gap-1">
                {strategy.suggestedFilters.map((filter, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-amber-500/10 text-amber-700 text-xs rounded"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          )}
        </GlassPanel>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. Screening Panel
// ---------------------------------------------------------------------------

function ScreeningPanel() {
  const [projectId, setProjectId] = useState("");
  const [criteria, setCriteria] = useState<Criterion[]>([
    { type: "inclusion", description: "" },
  ]);
  const [screeningResults, setScreeningResults] = useState<ScreeningResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<{
    total: number;
    included: number;
    excluded: number;
    conflicts: number;
  } | null>(null);

  const addCriterion = () => {
    setCriteria((prev) => [...prev, { type: "inclusion", description: "" }]);
  };

  const removeCriterion = (index: number) => {
    setCriteria((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCriterion = (
    index: number,
    field: keyof Criterion,
    value: string
  ) => {
    setCriteria((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Criteria Setup */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Funnel weight="duotone" className="text-brand" />
          Screening Criteria
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Define your inclusion and exclusion criteria. Three independent AI
          agents will evaluate each paper using majority consensus voting.
        </p>

        <div className="space-y-3">
          {criteria.map((criterion, i) => (
            <div key={i} className="flex items-start gap-2">
              <select
                value={criterion.type}
                onChange={(e) => updateCriterion(i, "type", e.target.value)}
                className="px-2 py-2 bg-surface-raised border border-border rounded text-sm text-ink"
              >
                <option value="inclusion">Inclusion</option>
                <option value="exclusion">Exclusion</option>
              </select>
              <input
                type="text"
                value={criterion.description}
                onChange={(e) =>
                  updateCriterion(i, "description", e.target.value)
                }
                placeholder="e.g., Randomized controlled trials only"
                className="flex-1 px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              {criteria.length > 1 && (
                <button
                  onClick={() => removeCriterion(i)}
                  className="p-2 text-ink-muted hover:text-red-500"
                >
                  <Trash size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addCriterion}
          className="mt-3 px-3 py-1.5 text-sm text-brand hover:bg-brand/10 rounded flex items-center gap-1"
        >
          <Plus size={14} /> Add Criterion
        </button>
      </GlassPanel>

      {/* Triple-Agent Consensus Info */}
      <GlassPanel className="p-6 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
        <h3 className="text-sm font-semibold text-ink mb-3">
          Triple-Agent AI Screening
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-surface border border-border rounded">
            <div className="text-xs text-ink-muted mb-1">Agent A</div>
            <div className="text-sm font-medium text-emerald-600">
              Sensitivity Focus
            </div>
            <div className="text-xs text-ink-muted mt-1">
              Minimizes false exclusions
            </div>
          </div>
          <div className="p-3 bg-surface border border-border rounded">
            <div className="text-xs text-ink-muted mb-1">Agent B</div>
            <div className="text-sm font-medium text-blue-600">
              Specificity Focus
            </div>
            <div className="text-xs text-ink-muted mt-1">
              Ensures precision
            </div>
          </div>
          <div className="p-3 bg-surface border border-border rounded">
            <div className="text-xs text-ink-muted mb-1">Agent C</div>
            <div className="text-sm font-medium text-purple-600">
              Balanced Review
            </div>
            <div className="text-xs text-ink-muted mt-1">
              Methodological alignment
            </div>
          </div>
        </div>
        <p className="text-xs text-ink-muted mt-3 text-center">
          Each paper is independently evaluated by all 3 agents. Majority
          consensus (2/3) decides. Disagreements are flagged for your review.
        </p>
      </GlassPanel>

      {/* Screening Results */}
      {summary && (
        <GlassPanel className="p-6">
          <h3 className="text-lg font-semibold text-ink mb-4">
            Screening Results
          </h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-surface-raised rounded">
              <div className="text-2xl font-bold text-ink">{summary.total}</div>
              <div className="text-xs text-ink-muted">Total Screened</div>
            </div>
            <div className="text-center p-3 bg-emerald-500/10 rounded">
              <div className="text-2xl font-bold text-emerald-600">{summary.included}</div>
              <div className="text-xs text-emerald-600">Included</div>
            </div>
            <div className="text-center p-3 bg-red-500/10 rounded">
              <div className="text-2xl font-bold text-red-600">{summary.excluded}</div>
              <div className="text-xs text-red-600">Excluded</div>
            </div>
            <div className="text-center p-3 bg-amber-500/10 rounded">
              <div className="text-2xl font-bold text-amber-600">{summary.conflicts}</div>
              <div className="text-xs text-amber-600">Needs Review</div>
            </div>
          </div>

          {/* Results list */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {screeningResults.map((result, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 p-3 rounded border",
                  result.decision === "include"
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : result.decision === "exclude"
                      ? "border-red-500/30 bg-red-500/5"
                      : "border-amber-500/30 bg-amber-500/5"
                )}
              >
                {result.decision === "include" ? (
                  <CheckCircle weight="fill" className="text-emerald-500 shrink-0" size={20} />
                ) : result.decision === "exclude" ? (
                  <XCircle weight="fill" className="text-red-500 shrink-0" size={20} />
                ) : (
                  <Warning weight="fill" className="text-amber-500 shrink-0" size={20} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">
                    {result.title}
                  </div>
                  <div className="text-xs text-ink-muted">{result.reason}</div>
                </div>
                <div className="text-xs text-ink-muted">
                  {Math.round(result.confidence * 100)}%
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. PRISMA Flow Panel
// ---------------------------------------------------------------------------

function PRISMAFlowPanel() {
  const [projectId, setProjectId] = useState("");
  const [flowSvg, setFlowSvg] = useState<string | null>(null);
  const [flowData, setFlowData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const loadFlow = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/systematic-review/prisma-flow?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load PRISMA flow");
      const data = await res.json();
      setFlowSvg(data.svg);
      setFlowData(data.flowData);
    } catch {
      // Error handled
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

        <div className="flex gap-3 items-end">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Project ID
            </label>
            <input
              type="number"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="Enter project ID"
              className="w-40 px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
            />
          </div>
          <button
            onClick={loadFlow}
            disabled={loading || !projectId}
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

// ---------------------------------------------------------------------------
// 4. RoB 2 Panel
// ---------------------------------------------------------------------------

function RoB2Panel() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    Array<{
      paperId: number;
      domains: Array<{
        domain: string;
        judgment: string;
        supportText: string;
      }>;
      overallJudgment: string;
    }>
  >([]);

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
            <div key={id} className="text-center p-2 bg-surface-raised rounded border border-border">
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
                    <th key={d} className="text-center py-2 text-ink-muted font-medium">
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

// ---------------------------------------------------------------------------
// 5. Data Extraction Panel
// ---------------------------------------------------------------------------

function DataExtractionPanel() {
  const [schema, setSchema] = useState<
    Array<{ field: string; description: string; type: string }>
  >([
    { field: "sample_size", description: "Total number of participants", type: "number" },
    { field: "intervention", description: "Intervention used", type: "text" },
    { field: "primary_outcome", description: "Primary outcome measured", type: "text" },
    { field: "effect_size", description: "Main effect size reported", type: "text" },
    { field: "follow_up", description: "Follow-up duration", type: "text" },
  ]);

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
    key: string,
    value: string
  ) => {
    setSchema((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [key]: value } : f))
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Table weight="duotone" className="text-brand" />
          Data Extraction Schema
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Define your extraction schema once. The AI will extract structured
          data from all included papers, linking every value to its source
          text.
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
                onChange={(e) =>
                  updateField(i, "description", e.target.value)
                }
                placeholder="What the AI should look for"
                className="col-span-5 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <select
                value={field.type}
                onChange={(e) => updateField(i, "type", e.target.value)}
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

        <button
          onClick={addField}
          className="mt-3 px-3 py-1.5 text-sm text-brand hover:bg-brand/10 rounded flex items-center gap-1"
        >
          <Plus size={14} /> Add Field
        </button>
      </GlassPanel>

      {/* Schema Preview */}
      <GlassPanel className="p-6 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
        <h3 className="text-sm font-semibold text-ink mb-3">
          How AI Extraction Works
        </h3>
        <div className="space-y-2 text-sm text-ink-muted">
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
            <span>You define the extraction schema (columns + descriptions)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
            <span>AI reads each paper and extracts matching data points</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
            <span>Every extraction links to the source quote for verification</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
            <span>Results populate a structured comparison table</span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
