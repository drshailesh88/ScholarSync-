"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CitationNode {
  id: string;
  title: string;
  year: number | null;
  citationCount: number;
  authors: string[];
  type: "seed" | "reference" | "citation";
  // Layout positions (calculated)
  x?: number;
  y?: number;
}

interface CitationEdge {
  source: string;
  target: string;
}

interface CitationNetworkProps {
  paperId: string;
  className?: string;
}

const NODE_COLORS = {
  seed: { fill: "#6366f1", stroke: "#818cf8", label: "Selected Paper" },
  reference: { fill: "#0ea5e9", stroke: "#38bdf8", label: "References" },
  citation: { fill: "#10b981", stroke: "#34d399", label: "Cited By" },
};

function forceLayout(
  nodes: CitationNode[],
  edges: CitationEdge[],
  width: number,
  height: number
): CitationNode[] {
  // Simple radial layout: seed in center, references left, citations right
  const positioned = nodes.map((n, i) => ({ ...n, x: width / 2, y: height / 2 }));

  const seedIdx = positioned.findIndex((n) => n.type === "seed");
  if (seedIdx >= 0) {
    positioned[seedIdx].x = width / 2;
    positioned[seedIdx].y = height / 2;
  }

  const refs = positioned.filter((n) => n.type === "reference");
  const cites = positioned.filter((n) => n.type === "citation");

  // Place references in a semicircle on the left
  refs.forEach((node, i) => {
    const angle = (-Math.PI / 2) + (Math.PI * (i + 1)) / (refs.length + 1);
    node.x = width / 2 + Math.cos(angle) * (width * 0.35);
    node.y = height / 2 + Math.sin(angle) * (height * 0.35);
  });

  // Place citations in a semicircle on the right
  cites.forEach((node, i) => {
    const angle = (Math.PI / 2) + (Math.PI * (i + 1)) / (cites.length + 1);
    node.x = width / 2 + Math.cos(angle) * (width * 0.35);
    node.y = height / 2 + Math.sin(angle) * (height * 0.35);
  });

  return positioned;
}

export function CitationNetwork({ paperId, className }: CitationNetworkProps) {
  const [nodes, setNodes] = useState<CitationNode[]>([]);
  const [edges, setEdges] = useState<CitationEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<CitationNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const WIDTH = 800;
  const HEIGHT = 600;

  useEffect(() => {
    async function fetchNetwork() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/search/citations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paperId }),
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const positioned = forceLayout(data.nodes, data.edges, WIDTH, HEIGHT);
        setNodes(positioned);
        setEdges(data.edges);
      } catch {
        setError("Failed to load citation network");
      } finally {
        setLoading(false);
      }
    }
    if (paperId) fetchNetwork();
  }, [paperId]);

  const getNodeRadius = useCallback((node: CitationNode) => {
    if (node.type === "seed") return 16;
    const base = Math.min(Math.max(Math.log(node.citationCount + 1) * 3, 6), 14);
    return base;
  }, []);

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  if (loading) {
    return (
      <div className={cn("glass-panel rounded-2xl p-8 flex items-center justify-center", className)}>
        <div className="text-center">
          <div className="h-5 w-5 rounded-full border-2 border-brand border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm text-ink-muted">Loading citation network...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("glass-panel rounded-2xl p-8 text-center", className)}>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={cn("glass-panel rounded-2xl overflow-hidden", className)}>
      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-border-subtle">
        <span className="text-xs font-medium text-ink-muted">Citation Network</span>
        <div className="flex-1" />
        {Object.entries(NODE_COLORS).map(([type, config]) => (
          <span key={type} className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: config.fill }} />
            {config.label}
          </span>
        ))}
        <span className="text-xs text-ink-muted">
          {nodes.length} papers
        </span>
      </div>

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        style={{ minHeight: 400 }}
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const source = nodeMap.get(edge.source);
          const target = nodeMap.get(edge.target);
          if (!source?.x || !target?.x) return null;
          const isHighlighted =
            hoveredNode === edge.source || hoveredNode === edge.target;
          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y!}
              x2={target.x}
              y2={target.y!}
              stroke={isHighlighted ? "#6366f1" : "#334155"}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeOpacity={isHighlighted ? 0.8 : 0.3}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          if (!node.x || !node.y) return null;
          const radius = getNodeRadius(node);
          const colors = NODE_COLORS[node.type];
          const isHovered = hoveredNode === node.id;
          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(node)}
            >
              <circle
                r={isHovered ? radius + 3 : radius}
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={isHovered ? 3 : 1.5}
                opacity={hoveredNode && !isHovered ? 0.5 : 1}
              />
              {(isHovered || node.type === "seed") && (
                <text
                  y={radius + 14}
                  textAnchor="middle"
                  className="text-[10px] fill-current text-ink-muted"
                  style={{ fontSize: 10 }}
                >
                  {node.title.length > 30 ? node.title.slice(0, 30) + "..." : node.title}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="px-4 py-3 border-t border-border-subtle bg-surface-raised/50">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-ink truncate">{selectedNode.title}</h4>
              <p className="text-xs text-ink-muted mt-0.5">
                {selectedNode.authors.slice(0, 3).join(", ")}
                {selectedNode.authors.length > 3 && ` +${selectedNode.authors.length - 3} more`}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                {selectedNode.year ?? "n.d."} · {selectedNode.citationCount} citations ·{" "}
                <span className="capitalize">{selectedNode.type}</span>
              </p>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-ink-muted hover:text-ink shrink-0"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
