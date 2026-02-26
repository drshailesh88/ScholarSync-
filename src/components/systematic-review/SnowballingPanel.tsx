"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowsClockwise,
  ArrowRight,
  ArrowLeft,
  ArrowsLeftRight,
  CircleNotch,
  CheckCircle,
  Funnel,
  Graph,
  Info,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProjectPaper {
  paperId: number;
  title: string;
  authors: string[];
  year: number;
  citationCount: number;
  screeningDecision: string | null;
  addedBy: string;
  s2Id?: string;
}

interface SnowballSession {
  id: number;
  seedPaperId: number;
  seedPaperTitle: string;
  direction: string;
  depth: number;
  papersFound: number;
  status: string;
  startedAt: string;
  completedAt: string | null;
}

interface NetworkNode {
  id: number;
  title: string;
  year: number;
  citationCount: number;
  authors: string[];
  addedBy: string;
  screeningDecision: string | null;
}

interface NetworkEdge {
  citingId: number;
  citedId: number;
  discoveredVia: string;
}

interface SnowballingPanelProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SnowballingPanel({ projectId }: SnowballingPanelProps) {
  const [includedPapers, setIncludedPapers] = useState<ProjectPaper[]>([]);
  const [selectedSeeds, setSelectedSeeds] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState<"forward" | "backward" | "both">(
    "both"
  );
  const [depth, setDepth] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState<SnowballSession[]>([]);
  const [network, setNetwork] = useState<{
    nodes: NetworkNode[];
    edges: NetworkEdge[];
  }>({ nodes: [], edges: [] });
  const [lastResult, setLastResult] = useState<{
    totalDiscovered: number;
    newPapersAdded: number;
    duplicatesSkipped: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"seeds" | "results">("seeds");

  // Load included papers and existing sessions
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [papersRes, snowballRes] = await Promise.all([
        fetch(`/api/systematic-review/import?projectId=${projectId}`),
        fetch(`/api/systematic-review/snowball?projectId=${projectId}`),
      ]);

      if (papersRes.ok) {
        const data = await papersRes.json();
        // Filter to included papers (screening decision = include) or all papers if no screening yet
        const allPapers: ProjectPaper[] = data.papers || [];
        const included = allPapers.filter(
          (p: ProjectPaper) =>
            p.screeningDecision === "include" ||
            p.screeningDecision === "include_with_concerns"
        );
        setIncludedPapers(included.length > 0 ? included : allPapers);
      }

      if (snowballRes.ok) {
        const data = await snowballRes.json();
        setSessions(data.sessions || []);
        setNetwork(data.network || { nodes: [], edges: [] });
      }
    } catch (error) {
      console.error("Failed to load snowball data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Toggle seed selection
  const toggleSeed = (paperId: number) => {
    setSelectedSeeds((prev) => {
      const next = new Set(prev);
      if (next.has(paperId)) {
        next.delete(paperId);
      } else {
        next.add(paperId);
      }
      return next;
    });
  };

  // Select all / deselect all
  const selectAll = () => {
    setSelectedSeeds(new Set(includedPapers.map((p) => p.paperId)));
  };
  const deselectAll = () => {
    setSelectedSeeds(new Set());
  };

  // Run snowballing
  const runSnowball = async () => {
    if (selectedSeeds.size === 0) return;
    setIsRunning(true);
    setLastResult(null);

    try {
      const res = await fetch("/api/systematic-review/snowball", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          seedPaperIds: Array.from(selectedSeeds),
          direction,
          depth,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Snowballing failed");
      }

      const data = await res.json();
      setLastResult({
        totalDiscovered: data.result.totalDiscovered,
        newPapersAdded: data.result.newPapersAdded,
        duplicatesSkipped: data.result.duplicatesSkipped,
      });

      // Refresh data
      await loadData();
      setView("results");
    } catch (error) {
      console.error("Snowball error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <CircleNotch weight="bold" className="animate-spin text-brand" size={24} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-ink">Citation Snowballing</h2>
        <p className="text-sm text-ink-muted mt-1">
          Discover related papers by following citation chains forward (who cites
          these?) and backward (what do these cite?).
        </p>
      </div>

      {/* View toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView("seeds")}
          className={cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            view === "seeds"
              ? "bg-brand text-white"
              : "bg-surface-alt text-ink-muted hover:text-ink"
          )}
        >
          <Funnel weight="bold" className="inline mr-1.5" size={14} />
          Select Seeds
        </button>
        <button
          onClick={() => setView("results")}
          className={cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            view === "results"
              ? "bg-brand text-white"
              : "bg-surface-alt text-ink-muted hover:text-ink"
          )}
        >
          <Graph weight="bold" className="inline mr-1.5" size={14} />
          Results & Network
          {sessions.length > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded text-xs">
              {sessions.length}
            </span>
          )}
        </button>
      </div>

      {/* ─── Seeds View ─── */}
      {view === "seeds" && (
        <div className="space-y-4">
          {/* Configuration */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-surface-alt rounded-lg border border-border">
            <div>
              <label className="text-xs text-ink-muted font-medium block mb-1">
                Direction
              </label>
              <div className="flex gap-1">
                {(
                  [
                    {
                      val: "forward" as const,
                      icon: ArrowRight,
                      label: "Forward",
                    },
                    {
                      val: "backward" as const,
                      icon: ArrowLeft,
                      label: "Backward",
                    },
                    {
                      val: "both" as const,
                      icon: ArrowsLeftRight,
                      label: "Both",
                    },
                  ] as const
                ).map(({ val, icon: Icon, label }) => (
                  <button
                    key={val}
                    onClick={() => setDirection(val)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors",
                      direction === val
                        ? "bg-brand text-white"
                        : "bg-surface text-ink-muted hover:text-ink border border-border"
                    )}
                  >
                    <Icon weight="bold" size={12} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-ink-muted font-medium block mb-1">
                Depth
              </label>
              <div className="flex gap-1">
                {[1, 2].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDepth(d)}
                    className={cn(
                      "px-3 py-1 rounded text-xs font-medium transition-colors",
                      depth === d
                        ? "bg-brand text-white"
                        : "bg-surface text-ink-muted hover:text-ink border border-border"
                    )}
                  >
                    {d} hop{d > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-ink-muted">
                {selectedSeeds.size} seed{selectedSeeds.size !== 1 ? "s" : ""}{" "}
                selected
              </span>
              <button
                onClick={runSnowball}
                disabled={isRunning || selectedSeeds.size === 0}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isRunning ? (
                  <>
                    <CircleNotch
                      weight="bold"
                      className="animate-spin"
                      size={14}
                    />
                    Snowballing...
                  </>
                ) : (
                  <>
                    <ArrowsClockwise weight="bold" size={14} />
                    Run Snowball
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Last result banner */}
          {lastResult && (
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle
                weight="fill"
                className="text-green-600"
                size={20}
              />
              <div className="text-sm">
                <span className="font-medium text-green-700 dark:text-green-400">
                  Snowballing complete.
                </span>{" "}
                <span className="text-green-600 dark:text-green-500">
                  {lastResult.totalDiscovered} discovered,{" "}
                  {lastResult.newPapersAdded} new papers added,{" "}
                  {lastResult.duplicatesSkipped} duplicates skipped.
                </span>
              </div>
            </div>
          )}

          {/* Seed paper selection */}
          {includedPapers.length === 0 ? (
            <div className="text-center py-12 text-ink-muted">
              <Info weight="duotone" size={32} className="mx-auto mb-2" />
              <p className="text-sm">
                No papers in project yet. Import papers first, then use
                snowballing to discover related studies.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-ink">
                  Select seed papers ({includedPapers.length} available)
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="text-xs text-brand hover:underline"
                  >
                    Select all
                  </button>
                  <button
                    onClick={deselectAll}
                    className="text-xs text-ink-muted hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {includedPapers.map((paper) => (
                  <button
                    key={paper.paperId}
                    onClick={() => toggleSeed(paper.paperId)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md border transition-colors",
                      selectedSeeds.has(paper.paperId)
                        ? "border-brand bg-brand/5"
                        : "border-border bg-surface hover:bg-surface-alt"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                          selectedSeeds.has(paper.paperId)
                            ? "border-brand bg-brand"
                            : "border-border"
                        )}
                      >
                        {selectedSeeds.has(paper.paperId) && (
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-ink font-medium truncate">
                          {paper.title}
                        </div>
                        <div className="text-xs text-ink-muted mt-0.5">
                          {paper.authors?.slice(0, 3).join(", ")}
                          {(paper.authors?.length || 0) > 3 ? " et al." : ""}
                          {paper.year ? ` (${paper.year})` : ""}
                          {paper.citationCount
                            ? ` · ${paper.citationCount} citations`
                            : ""}
                        </div>
                      </div>
                      {paper.screeningDecision === "include" && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex-shrink-0">
                          Included
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ─── Results View ─── */}
      {view === "results" && (
        <div className="space-y-6">
          {/* Sessions history */}
          {sessions.length === 0 ? (
            <div className="text-center py-12 text-ink-muted">
              <Graph weight="duotone" size={32} className="mx-auto mb-2" />
              <p className="text-sm">
                No snowball sessions yet. Select seed papers and run
                snowballing.
              </p>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-sm font-medium text-ink mb-3">
                  Snowball Sessions
                </h3>
                <div className="space-y-2">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-3 p-3 bg-surface border border-border rounded-lg"
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full flex-shrink-0",
                          session.status === "completed"
                            ? "bg-green-500"
                            : session.status === "running"
                              ? "bg-amber-500 animate-pulse"
                              : "bg-red-500"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-ink font-medium truncate">
                          {session.seedPaperTitle}
                        </div>
                        <div className="text-xs text-ink-muted">
                          {session.direction} · depth {session.depth} ·{" "}
                          {session.papersFound} papers found
                        </div>
                      </div>
                      <div className="text-xs text-ink-muted flex-shrink-0">
                        {session.completedAt
                          ? new Date(session.completedAt).toLocaleDateString()
                          : "In progress"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini citation network visualization */}
              {network.nodes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-ink mb-3">
                    Citation Network ({network.nodes.length} papers,{" "}
                    {network.edges.length} edges)
                  </h3>
                  <MiniCitationNetwork
                    nodes={network.nodes}
                    edges={network.edges}
                  />
                </div>
              )}

              {/* Snowball-discovered papers */}
              {network.nodes.filter((n) => n.addedBy === "snowball").length >
                0 && (
                <div>
                  <h3 className="text-sm font-medium text-ink mb-3">
                    Discovered Papers (via Snowball)
                  </h3>
                  <div className="space-y-1 max-h-[300px] overflow-y-auto">
                    {network.nodes
                      .filter((n) => n.addedBy === "snowball")
                      .map((paper) => (
                        <div
                          key={paper.id}
                          className="flex items-center gap-3 px-3 py-2 bg-surface border border-border rounded-md"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-ink truncate">
                              {paper.title}
                            </div>
                            <div className="text-xs text-ink-muted">
                              {paper.authors?.slice(0, 3).join(", ")}
                              {(paper.authors?.length || 0) > 3
                                ? " et al."
                                : ""}
                              {paper.year ? ` (${paper.year})` : ""}
                              {paper.citationCount
                                ? ` · ${paper.citationCount} cit.`
                                : ""}
                            </div>
                          </div>
                          {paper.screeningDecision ? (
                            <span
                              className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded flex-shrink-0",
                                paper.screeningDecision === "include"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                  : paper.screeningDecision === "exclude"
                                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                    : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                              )}
                            >
                              {paper.screeningDecision}
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-alt text-ink-muted flex-shrink-0">
                              Unscreened
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mini Citation Network — simple SVG visualization
// ---------------------------------------------------------------------------

function MiniCitationNetwork({
  nodes,
  edges,
}: {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}) {
  const width = 700;
  const height = 300;

  // Simple force-free layout: group by addedBy
  const seedNodes = nodes.filter(
    (n) => n.addedBy !== "snowball"
  );
  const snowballNodes = nodes.filter(
    (n) => n.addedBy === "snowball"
  );

  // Position seeds on the left, snowball papers on the right
  const positioned = new Map<
    number,
    { x: number; y: number; node: NetworkNode }
  >();

  seedNodes.forEach((node, i) => {
    const y = (height / (seedNodes.length + 1)) * (i + 1);
    positioned.set(node.id, { x: 150, y, node });
  });

  snowballNodes.forEach((node, i) => {
    const y = (height / (snowballNodes.length + 1)) * (i + 1);
    positioned.set(node.id, { x: 550, y, node });
  });

  return (
    <div className="bg-surface border border-border rounded-lg p-4 overflow-x-auto">
      <svg width={width} height={height} className="text-ink">
        {/* Edges */}
        {edges.map((edge, i) => {
          const from = positioned.get(edge.citingId);
          const to = positioned.get(edge.citedId);
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeWidth={0.5}
              opacity={0.15}
            />
          );
        })}

        {/* Nodes */}
        {Array.from(positioned.values()).map(({ x, y, node }) => {
          const isSeed = node.addedBy !== "snowball";
          const r = Math.max(4, Math.min(12, Math.log2((node.citationCount || 1) + 1) * 2));
          return (
            <g key={node.id}>
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={isSeed ? "#6366f1" : "#10b981"}
                opacity={0.8}
              />
              <text
                x={x + r + 4}
                y={y + 3}
                className="text-[9px] fill-current"
                opacity={0.6}
              >
                {node.title.length > 35
                  ? node.title.slice(0, 35) + "..."
                  : node.title}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(10, ${height - 30})`}>
          <circle cx={6} cy={6} r={5} fill="#6366f1" opacity={0.8} />
          <text x={16} y={10} className="text-[10px] fill-current" opacity={0.6}>
            Seed / imported
          </text>
          <circle cx={130} cy={6} r={5} fill="#10b981" opacity={0.8} />
          <text
            x={140}
            y={10}
            className="text-[10px] fill-current"
            opacity={0.6}
          >
            Discovered (snowball)
          </text>
        </g>
      </svg>
    </div>
  );
}
