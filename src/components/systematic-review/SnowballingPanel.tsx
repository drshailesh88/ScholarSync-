"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  Plus,
  Eye,
  EyeSlash,
  Database,
  GitBranch,
  X,
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
  const [error, setError] = useState<string | null>(null);
  const [showOnlyUnscreened, setShowOnlyUnscreened] = useState(false);
  const [addingToScreening, setAddingToScreening] = useState<Set<number>>(
    new Set()
  );

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
    } catch {
      setError("Failed to load snowball data. Please try again.");
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

      await loadData();
      setView("results");
    } catch {
      setError("Failed to run snowballing. Please try again.");
    } finally {
      setIsRunning(false);
    }
  };

  // Add paper to screening queue
  const addToScreening = async (paperId: number) => {
    setAddingToScreening((prev) => new Set(prev).add(paperId));
    try {
      const res = await fetch("/api/systematic-review/screening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          paperId,
          action: "add_to_screening",
        }),
      });
      if (res.ok) {
        // Update the node's screening decision locally
        setNetwork((prev) => ({
          ...prev,
          nodes: prev.nodes.map((n) =>
            n.id === paperId ? { ...n, screeningDecision: "pending" } : n
          ),
        }));
      }
    } catch {
      setError("Failed to add paper to screening.");
    } finally {
      setAddingToScreening((prev) => {
        const next = new Set(prev);
        next.delete(paperId);
        return next;
      });
    }
  };

  // Computed stats
  const snowballPapers = network.nodes.filter((n) => n.addedBy === "snowball");
  const databasePapers = network.nodes.filter((n) => n.addedBy !== "snowball");
  const unscreenedPapers = snowballPapers.filter(
    (n) => !n.screeningDecision || n.screeningDecision === "pending"
  );
  const forwardEdges = network.edges.filter(
    (e) =>
      e.discoveredVia === "forward_snowball" || e.discoveredVia === "forward"
  );
  const backwardEdges = network.edges.filter(
    (e) =>
      e.discoveredVia === "backward_snowball" || e.discoveredVia === "backward"
  );

  // Filtered discovered papers list
  const displayedPapers = showOnlyUnscreened
    ? snowballPapers.filter(
        (n) => !n.screeningDecision || n.screeningDecision === "pending"
      )
    : snowballPapers;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <CircleNotch
          weight="bold"
          className="animate-spin text-brand"
          size={24}
        />
      </div>
    );
  }

  return (
    <div className="sr-content max-w-5xl space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
          >
            <X weight="bold" size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="sr-panel">
        <h2 className="sr-title">Citation Snowballing</h2>
        <p className="sr-description">
          Discover related papers by following citation chains forward (who cites
          these?) and backward (what do these cite?).
        </p>

        {/* View toggle */}
        <div className="flex gap-2 mt-4">
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
      </div>

      {/* ─── Seeds View ─── */}
      {view === "seeds" && (
        <div className="space-y-4">
          {/* Configuration */}
          <div className="sr-panel">
            <div className="flex flex-wrap items-center gap-4">
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
            <div className="sr-panel text-center py-12 text-ink-muted">
              <Info weight="duotone" size={32} className="mx-auto mb-2" />
              <p className="text-sm">
                No papers in project yet. Import papers first, then use
                snowballing to discover related studies.
              </p>
            </div>
          ) : (
            <div className="sr-panel">
              <div className="flex items-center justify-between mb-3">
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
            </div>
          )}
        </div>
      )}

      {/* ─── Results View ─── */}
      {view === "results" && (
        <div className="space-y-6">
          {sessions.length === 0 ? (
            <div className="sr-panel text-center py-12 text-ink-muted">
              <Graph weight="duotone" size={32} className="mx-auto mb-2" />
              <p className="text-sm">
                No snowball sessions yet. Select seed papers and run
                snowballing.
              </p>
            </div>
          ) : (
            <>
              {/* ─── Stats: Snowball vs Database ─── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="sr-stat">
                  <div className="sr-stat-value">{network.nodes.length}</div>
                  <div className="sr-stat-label">Total Papers</div>
                </div>
                <div className="sr-stat">
                  <div className="sr-stat-value text-emerald-600 dark:text-emerald-400">
                    {snowballPapers.length}
                  </div>
                  <div className="sr-stat-label flex items-center justify-center gap-1">
                    <GitBranch weight="bold" size={10} />
                    Via Snowball
                  </div>
                </div>
                <div className="sr-stat">
                  <div className="sr-stat-value text-indigo-600 dark:text-indigo-400">
                    {databasePapers.length}
                  </div>
                  <div className="sr-stat-label flex items-center justify-center gap-1">
                    <Database weight="bold" size={10} />
                    Via Database
                  </div>
                </div>
                <div className="sr-stat">
                  <div className="sr-stat-value text-amber-600 dark:text-amber-400">
                    {unscreenedPapers.length}
                  </div>
                  <div className="sr-stat-label">Unscreened</div>
                </div>
              </div>

              {/* ─── Citation Graph Visualization ─── */}
              {network.nodes.length > 0 && (
                <div className="sr-panel">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-ink">
                      Citation Network
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-ink-muted">
                      <span>
                        {forwardEdges.length} forward
                      </span>
                      <span>
                        {backwardEdges.length} backward
                      </span>
                      <span>
                        {network.nodes.length} nodes
                      </span>
                    </div>
                  </div>
                  <CitationGraph
                    nodes={network.nodes}
                    edges={network.edges}
                  />
                </div>
              )}

              {/* Sessions history */}
              <div className="sr-panel">
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

              {/* ─── Discovered Papers with Filter & Screening Action ─── */}
              {snowballPapers.length > 0 && (
                <div className="sr-panel">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-ink">
                      Discovered Papers
                      <span className="text-ink-muted font-normal ml-1">
                        ({displayedPapers.length}
                        {showOnlyUnscreened
                          ? ` unscreened of ${snowballPapers.length}`
                          : ""}
                        )
                      </span>
                    </h3>
                    <button
                      onClick={() => setShowOnlyUnscreened((v) => !v)}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors",
                        showOnlyUnscreened
                          ? "bg-brand/10 text-brand border border-brand/20"
                          : "bg-surface-alt text-ink-muted hover:text-ink border border-border"
                      )}
                    >
                      {showOnlyUnscreened ? (
                        <EyeSlash weight="bold" size={12} />
                      ) : (
                        <Eye weight="bold" size={12} />
                      )}
                      {showOnlyUnscreened
                        ? "Showing unscreened"
                        : "Show only unscreened"}
                    </button>
                  </div>

                  {displayedPapers.length === 0 ? (
                    <div className="text-center py-8 text-ink-muted text-sm">
                      <CheckCircle
                        weight="duotone"
                        size={28}
                        className="mx-auto mb-2 text-green-500"
                      />
                      All discovered papers have been screened.
                    </div>
                  ) : (
                    <div className="space-y-1 max-h-[400px] overflow-y-auto">
                      {displayedPapers.map((paper) => (
                        <div
                          key={paper.id}
                          className="group flex items-center gap-3 px-3 py-2.5 bg-surface border border-border rounded-md hover:border-brand/20 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-ink truncate">
                              {paper.title}
                            </div>
                            <div className="text-xs text-ink-muted mt-0.5">
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

                          {/* Screening status / action */}
                          {paper.screeningDecision &&
                          paper.screeningDecision !== "pending" ? (
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
                            <button
                              onClick={() => addToScreening(paper.id)}
                              disabled={addingToScreening.has(paper.id)}
                              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium bg-brand/10 text-brand hover:bg-brand/20 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                            >
                              {addingToScreening.has(paper.id) ? (
                                <CircleNotch
                                  weight="bold"
                                  className="animate-spin"
                                  size={10}
                                />
                              ) : (
                                <Plus weight="bold" size={10} />
                              )}
                              Add to screening
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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
// Citation Graph — interactive SVG with backward/forward layout & hover
// ---------------------------------------------------------------------------

interface NodePosition {
  x: number;
  y: number;
  node: NetworkNode;
  column: "seed" | "backward" | "forward";
}

function CitationGraph({
  nodes,
  edges,
}: {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}) {
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 800;
  const height = Math.max(350, Math.min(600, nodes.length * 18));

  // Classify nodes into columns: backward (left), seed (center), forward (right)
  const seedNodeIds = new Set(
    nodes.filter((n) => n.addedBy !== "snowball").map((n) => n.id)
  );

  // Papers discovered via backward snowball = cited BY seeds = they are on the left
  const backwardDiscoveredIds = new Set(
    edges
      .filter(
        (e) =>
          (e.discoveredVia === "backward_snowball" ||
            e.discoveredVia === "backward") &&
          !seedNodeIds.has(e.citedId)
      )
      .map((e) => e.citedId)
  );

  // Papers discovered via forward snowball = papers that CITE seeds = they are on the right
  const forwardDiscoveredIds = new Set(
    edges
      .filter(
        (e) =>
          (e.discoveredVia === "forward_snowball" ||
            e.discoveredVia === "forward") &&
          !seedNodeIds.has(e.citingId)
      )
      .map((e) => e.citingId)
  );

  const seedNodes = nodes.filter((n) => seedNodeIds.has(n.id));
  const backwardNodes = nodes.filter(
    (n) => backwardDiscoveredIds.has(n.id) && !seedNodeIds.has(n.id)
  );
  const forwardNodes = nodes.filter(
    (n) => forwardDiscoveredIds.has(n.id) && !seedNodeIds.has(n.id)
  );
  // Remaining snowball nodes not classified go to forward column
  const remainingNodes = nodes.filter(
    (n) =>
      !seedNodeIds.has(n.id) &&
      !backwardDiscoveredIds.has(n.id) &&
      !forwardDiscoveredIds.has(n.id) &&
      n.addedBy === "snowball"
  );
  const allForward = [...forwardNodes, ...remainingNodes];

  // Position nodes in three columns
  const positioned = new Map<number, NodePosition>();

  const colX = { backward: 120, seed: 400, forward: 680 };

  const positionColumn = (
    items: NetworkNode[],
    x: number,
    column: "seed" | "backward" | "forward"
  ) => {
    const maxVisible = 25;
    const visible = items.slice(0, maxVisible);
    visible.forEach((node, i) => {
      const y = (height / (visible.length + 1)) * (i + 1);
      positioned.set(node.id, { x, y, node, column });
    });
  };

  positionColumn(backwardNodes, colX.backward, "backward");
  positionColumn(seedNodes, colX.seed, "seed");
  positionColumn(allForward, colX.forward, "forward");

  const getNodeRadius = (node: NetworkNode) =>
    Math.max(4, Math.min(14, Math.log2((node.citationCount || 1) + 1) * 2.5));

  const getNodeColor = (column: "seed" | "backward" | "forward") => {
    switch (column) {
      case "seed":
        return "#6366f1"; // indigo
      case "backward":
        return "#f59e0b"; // amber
      case "forward":
        return "#10b981"; // emerald
    }
  };

  const handleNodeHover = (
    node: NetworkNode,
    e: React.MouseEvent<SVGCircleElement>
  ) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setHoverPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setHoveredNode(node);
  };

  // Edges connected to hovered node for highlighting
  const hoveredEdgeSet = hoveredNode
    ? new Set(
        edges
          .filter(
            (e) =>
              e.citingId === hoveredNode.id || e.citedId === hoveredNode.id
          )
          .map((_, i) => i)
      )
    : new Set<number>();

  return (
    <div className="relative bg-surface border border-border rounded-lg p-4 overflow-x-auto">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="text-ink"
        style={{ minHeight: 300 }}
      >
        {/* Column labels */}
        <text
          x={colX.backward}
          y={16}
          textAnchor="middle"
          className="text-[10px] fill-current"
          opacity={0.4}
        >
          ← Backward (references)
        </text>
        <text
          x={colX.seed}
          y={16}
          textAnchor="middle"
          className="text-[10px] fill-current"
          opacity={0.4}
        >
          Seed Papers
        </text>
        <text
          x={colX.forward}
          y={16}
          textAnchor="middle"
          className="text-[10px] fill-current"
          opacity={0.4}
        >
          Forward (citations) →
        </text>

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = positioned.get(edge.citingId);
          const to = positioned.get(edge.citedId);
          if (!from || !to) return null;
          const isHighlighted = hoveredEdgeSet.has(i);
          const isBackward =
            edge.discoveredVia === "backward_snowball" ||
            edge.discoveredVia === "backward";

          return (
            <path
              key={i}
              d={`M${from.x},${from.y} C${(from.x + to.x) / 2},${from.y} ${(from.x + to.x) / 2},${to.y} ${to.x},${to.y}`}
              fill="none"
              stroke={isBackward ? "#f59e0b" : "#10b981"}
              strokeWidth={isHighlighted ? 1.5 : 0.5}
              opacity={
                hoveredNode ? (isHighlighted ? 0.7 : 0.05) : 0.15
              }
              className="transition-opacity duration-150"
            />
          );
        })}

        {/* Nodes */}
        {Array.from(positioned.values()).map(({ x, y, node, column }) => {
          const r = getNodeRadius(node);
          const color = getNodeColor(column);
          const isHovered = hoveredNode?.id === node.id;

          return (
            <g key={node.id}>
              <circle
                cx={x}
                cy={y}
                r={isHovered ? r + 2 : r}
                fill={color}
                opacity={
                  hoveredNode
                    ? isHovered ||
                      hoveredEdgeSet.size === 0 ||
                      edges.some(
                        (e) =>
                          (e.citingId === hoveredNode.id &&
                            e.citedId === node.id) ||
                          (e.citedId === hoveredNode.id &&
                            e.citingId === node.id)
                      )
                      ? 0.9
                      : 0.2
                    : 0.8
                }
                stroke={isHovered ? color : "transparent"}
                strokeWidth={2}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={(e) => handleNodeHover(node, e)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              {/* Truncated label for seed nodes only */}
              {column === "seed" && (
                <text
                  x={x + r + 4}
                  y={y + 3}
                  className="text-[9px] fill-current pointer-events-none"
                  opacity={0.5}
                >
                  {node.title.length > 30
                    ? node.title.slice(0, 30) + "..."
                    : node.title}
                </text>
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(10, ${height - 30})`}>
          <circle cx={6} cy={6} r={5} fill="#f59e0b" opacity={0.8} />
          <text
            x={16}
            y={10}
            className="text-[10px] fill-current"
            opacity={0.5}
          >
            Backward
          </text>
          <circle cx={100} cy={6} r={5} fill="#6366f1" opacity={0.8} />
          <text
            x={110}
            y={10}
            className="text-[10px] fill-current"
            opacity={0.5}
          >
            Seed
          </text>
          <circle cx={160} cy={6} r={5} fill="#10b981" opacity={0.8} />
          <text
            x={170}
            y={10}
            className="text-[10px] fill-current"
            opacity={0.5}
          >
            Forward
          </text>
        </g>
      </svg>

      {/* Hover tooltip */}
      {hoveredNode && (
        <div
          className="absolute z-10 pointer-events-none bg-surface border border-border rounded-lg shadow-lg p-3 max-w-xs"
          style={{
            left: Math.min(hoverPos.x + 12, width - 260),
            top: Math.max(hoverPos.y - 80, 8),
          }}
        >
          <div className="text-sm font-medium text-ink leading-snug mb-1">
            {hoveredNode.title}
          </div>
          <div className="text-xs text-ink-muted space-y-0.5">
            <div>
              {hoveredNode.authors?.slice(0, 3).join(", ")}
              {(hoveredNode.authors?.length || 0) > 3 ? " et al." : ""}
            </div>
            {hoveredNode.year ? <div>Year: {hoveredNode.year}</div> : null}
            {hoveredNode.citationCount ? (
              <div>Citations: {hoveredNode.citationCount.toLocaleString()}</div>
            ) : null}
            <div className="mt-1">
              <span
                className={cn(
                  "inline-block text-[10px] px-1.5 py-0.5 rounded",
                  hoveredNode.addedBy === "snowball"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
                )}
              >
                {hoveredNode.addedBy === "snowball"
                  ? "Discovered via snowball"
                  : "Imported / seed"}
              </span>
              {hoveredNode.screeningDecision && (
                <span
                  className={cn(
                    "inline-block text-[10px] px-1.5 py-0.5 rounded ml-1",
                    hoveredNode.screeningDecision === "include"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : hoveredNode.screeningDecision === "exclude"
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  )}
                >
                  {hoveredNode.screeningDecision}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
