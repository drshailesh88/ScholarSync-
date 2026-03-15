"use client";

import { useMemo, useState, useCallback } from "react";
import type { NMAResult } from "@/lib/systematic-review/network-meta-analysis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NetworkPlotProps {
  result: NMAResult;
  /** Width of the SVG (default 600). */
  width?: number;
  /** Height of the SVG (default 500). */
  height?: number;
  /** Use force-directed layout instead of circular (default false). */
  forceLayout?: boolean;
  title?: string;
}

interface NodePos {
  id: string;
  x: number;
  y: number;
  size: number;
}

// ---------------------------------------------------------------------------
// Color palette for treatment nodes
// ---------------------------------------------------------------------------

const NODE_COLORS = [
  "#6366f1", // indigo
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#10b981", // emerald
  "#f97316", // orange
  "#06b6d4", // cyan
  "#ef4444", // red
  "#84cc16", // lime
  "#a855f7", // purple
  "#22d3ee", // sky
];

// ---------------------------------------------------------------------------
// Simple force-directed layout (spring + charge model)
// ---------------------------------------------------------------------------

function forceDirectedLayout(
  nodes: NMAResult["networkGeometry"]["nodes"],
  edges: NMAResult["networkGeometry"]["edges"],
  width: number,
  height: number
): NodePos[] {
  const n = nodes.length;
  if (n === 0) return [];

  {/* empty state: renders nothing when no data */}
  const maxSize = Math.max(...nodes.map((nd) => nd.size), 1);

  // Initialize positions in a circle (gives a decent starting config)
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.32;

  const positions: { x: number; y: number }[] = nodes.map((_, i) => ({
    x: cx + radius * Math.cos((2 * Math.PI * i) / n - Math.PI / 2),
    y: cy + radius * Math.sin((2 * Math.PI * i) / n - Math.PI / 2),
  }));

  const idIndex = new Map<string, number>();
  nodes.forEach((nd, i) => idIndex.set(nd.id, i));

  // Run iterations
  const iterations = 120;
  const repulsionStrength = 8000;
  const springStrength = 0.008;
  const springLength = radius * 0.6;
  const damping = 0.92;

  const vx = new Array(n).fill(0);
  const vy = new Array(n).fill(0);

  for (let iter = 0; iter < iterations; iter++) {
    const fx = new Array(n).fill(0);
    const fy = new Array(n).fill(0);

    // Repulsion (Coulomb's law between all pairs)
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = repulsionStrength / (dist * dist);
        const fxComp = (force * dx) / dist;
        const fyComp = (force * dy) / dist;
        fx[i] += fxComp;
        fy[i] += fyComp;
        fx[j] -= fxComp;
        fy[j] -= fyComp;
      }
    }

    // Attraction (Hooke's law along edges)
    for (const edge of edges) {
      const si = idIndex.get(edge.source);
      const ti = idIndex.get(edge.target);
      if (si === undefined || ti === undefined) continue;
      const dx = positions[si].x - positions[ti].x;
      const dy = positions[si].y - positions[ti].y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const displacement = dist - springLength;
      const force = springStrength * displacement * (1 + edge.weight * 0.3);
      const fxComp = (force * dx) / dist;
      const fyComp = (force * dy) / dist;
      fx[si] -= fxComp;
      fy[si] -= fyComp;
      fx[ti] += fxComp;
      fy[ti] += fyComp;
    }

    // Center gravity
    for (let i = 0; i < n; i++) {
      const dx = cx - positions[i].x;
      const dy = cy - positions[i].y;
      fx[i] += dx * 0.001;
      fy[i] += dy * 0.001;
    }

    // Update velocities and positions
    const cooling = 1 - iter / iterations;
    for (let i = 0; i < n; i++) {
      vx[i] = (vx[i] + fx[i]) * damping * cooling;
      vy[i] = (vy[i] + fy[i]) * damping * cooling;
      positions[i].x += vx[i];
      positions[i].y += vy[i];

      // Keep inside bounds
      const pad = 50;
      positions[i].x = Math.max(pad, Math.min(width - pad, positions[i].x));
      positions[i].y = Math.max(pad, Math.min(height - pad, positions[i].y));
    }
  }

  return nodes.map((nd, i) => ({
    id: nd.id,
    x: positions[i].x,
    y: positions[i].y,
    size: 12 + (nd.size / maxSize) * 24,
  }));
}

// ---------------------------------------------------------------------------
// Circular layout
// ---------------------------------------------------------------------------

function circularLayout(
  nodes: NMAResult["networkGeometry"]["nodes"],
  width: number,
  height: number
): NodePos[] {
  const n = nodes.length;
  if (n === 0) return [];

  const maxSize = Math.max(...nodes.map((nd) => nd.size), 1);
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.34;

  return nodes.map((nd, i) => ({
    id: nd.id,
    x: cx + radius * Math.cos((2 * Math.PI * i) / n - Math.PI / 2),
    y: cy + radius * Math.sin((2 * Math.PI * i) / n - Math.PI / 2),
    size: 12 + (nd.size / maxSize) * 24,
  }));
}

// ---------------------------------------------------------------------------
// NetworkPlot Component
// ---------------------------------------------------------------------------

export function NetworkPlot({
  result,
  width = 600,
  height = 500,
  forceLayout = false,
  title,
}: NetworkPlotProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const { nodes: geoNodes, edges: geoEdges } = result.networkGeometry;

  const nodePositions = useMemo(() => {
    if (forceLayout) {
      return forceDirectedLayout(geoNodes, geoEdges, width, height);
    }
    return circularLayout(geoNodes, width, height);
  }, [geoNodes, geoEdges, width, height, forceLayout]);

  const posMap = useMemo(() => {
    const m = new Map<string, NodePos>();
    for (const np of nodePositions) m.set(np.id, np);
    return m;
  }, [nodePositions]);

  const maxEdgeWeight = useMemo(
    () => Math.max(...geoEdges.map((e) => e.weight), 1),
    [geoEdges]
  );

  const connectedTo = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const nd of geoNodes) m.set(nd.id, new Set());
    for (const e of geoEdges) {
      m.get(e.source)?.add(e.target);
      m.get(e.target)?.add(e.source);
    }
    return m;
  }, [geoNodes, geoEdges]);

  const handleNodeEnter = useCallback((id: string) => setHoveredNode(id), []);
  const handleNodeLeave = useCallback(() => setHoveredNode(null), []);

  const isEdgeHighlighted = (source: string, target: string) => {
    if (!hoveredNode) return false;
    return source === hoveredNode || target === hoveredNode;
  };

  const isNodeHighlighted = (id: string) => {
    if (!hoveredNode) return true;
    return id === hoveredNode || (connectedTo.get(hoveredNode)?.has(id) ?? false);
  };

  return (
    <div className="overflow-x-auto">
      {title && (
        <h4 className="text-sm font-semibold text-ink mb-2">{title}</h4>
      )}
      <svg
        width={width}
        height={height}
        className="text-ink"
        style={{ fontFamily: "inherit" }}
      >
        {/* Glass background */}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={12}
          fill="currentColor"
          opacity={0.02}
        />

        {/* Edges */}
        {geoEdges.map((edge) => {
          const s = posMap.get(edge.source);
          const t = posMap.get(edge.target);
          if (!s || !t) return null;

          const highlighted = isEdgeHighlighted(edge.source, edge.target);
          const strokeWidth = 1.5 + (edge.weight / maxEdgeWeight) * 5;
          const opacity = hoveredNode
            ? highlighted
              ? 0.8
              : 0.1
            : 0.4;

          return (
            <g key={`${edge.source}-${edge.target}`}>
              <line
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                opacity={opacity}
                strokeLinecap="round"
              />
              {/* Edge weight label */}
              {edge.weight > 1 && (
                <text
                  x={(s.x + t.x) / 2}
                  y={(s.y + t.y) / 2 - 6}
                  textAnchor="middle"
                  className="text-[9px] fill-current"
                  opacity={hoveredNode ? (highlighted ? 0.7 : 0.05) : 0.35}
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodePositions.map((np, i) => {
          const highlighted = isNodeHighlighted(np.id);
          const color = NODE_COLORS[i % NODE_COLORS.length];
          const opacity = hoveredNode ? (highlighted ? 1 : 0.15) : 1;

          return (
            <g
              key={np.id}
              onMouseEnter={() => handleNodeEnter(np.id)}
              onMouseLeave={handleNodeLeave}
              style={{ cursor: "pointer" }}
            >
              {/* Node circle */}
              <circle
                cx={np.x}
                cy={np.y}
                r={np.size / 2}
                fill={color}
                opacity={opacity * 0.85}
                stroke={hoveredNode === np.id ? "#fff" : color}
                strokeWidth={hoveredNode === np.id ? 2.5 : 1}
              />

              {/* Node label */}
              <text
                x={np.x}
                y={np.y + np.size / 2 + 14}
                textAnchor="middle"
                className="text-[11px] fill-current font-medium"
                opacity={opacity}
              >
                {np.id.length > 18 ? np.id.slice(0, 18) + "..." : np.id}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <text
          x={12}
          y={height - 12}
          className="text-[9px] fill-current"
          opacity={0.4}
        >
          Node size = total sample size | Edge thickness = number of studies
        </text>
      </svg>
    </div>
  );
}
