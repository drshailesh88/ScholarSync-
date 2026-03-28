"use client";

import { useMemo, useState, useCallback } from "react";
import type { NMAResult } from "@/lib/systematic-review/network-meta-analysis";

interface NetworkPlotProps {
  result: NMAResult;
  width?: number;
  height?: number;
  forceLayout?: boolean;
  title?: string;
}

interface NodePos {
  id: string;
  x: number;
  y: number;
  size: number;
}

const NODE_COLORS = [
  "#6D28D9",
  "#C06090",
  "#4A7AB5",
  "#0A6847",
  "#D4B060",
  "#F97316",
  "#06B6D4",
  "#EF4444",
];

function forceDirectedLayout(
  nodes: NMAResult["networkGeometry"]["nodes"],
  edges: NMAResult["networkGeometry"]["edges"],
  width: number,
  height: number
): NodePos[] {
  const n = nodes.length;
  if (n === 0) return [];

  const maxSize = Math.max(...nodes.map((node) => node.size), 1);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.32;

  const positions = nodes.map((_, index) => ({
    x: centerX + radius * Math.cos((2 * Math.PI * index) / n - Math.PI / 2),
    y: centerY + radius * Math.sin((2 * Math.PI * index) / n - Math.PI / 2),
  }));

  const nodeIndex = new Map<string, number>();
  nodes.forEach((node, index) => nodeIndex.set(node.id, index));

  const velocities = nodes.map(() => ({ x: 0, y: 0 }));

  for (let iteration = 0; iteration < 120; iteration++) {
    const forces = nodes.map(() => ({ x: 0, y: 0 }));

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = 8000 / (distance * distance);
        const fx = (force * dx) / distance;
        const fy = (force * dy) / distance;
        forces[i].x += fx;
        forces[i].y += fy;
        forces[j].x -= fx;
        forces[j].y -= fy;
      }
    }

    for (const edge of edges) {
      const sourceIndex = nodeIndex.get(edge.source);
      const targetIndex = nodeIndex.get(edge.target);
      if (sourceIndex == null || targetIndex == null) continue;

      const dx = positions[sourceIndex].x - positions[targetIndex].x;
      const dy = positions[sourceIndex].y - positions[targetIndex].y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const displacement = distance - radius * 0.6;
      const force = 0.008 * displacement * (1 + edge.weight * 0.3);
      const fx = (force * dx) / distance;
      const fy = (force * dy) / distance;
      forces[sourceIndex].x -= fx;
      forces[sourceIndex].y -= fy;
      forces[targetIndex].x += fx;
      forces[targetIndex].y += fy;
    }

    const cooling = 1 - iteration / 120;
    for (let i = 0; i < n; i++) {
      forces[i].x += (centerX - positions[i].x) * 0.001;
      forces[i].y += (centerY - positions[i].y) * 0.001;

      velocities[i].x = (velocities[i].x + forces[i].x) * 0.92 * cooling;
      velocities[i].y = (velocities[i].y + forces[i].y) * 0.92 * cooling;

      positions[i].x += velocities[i].x;
      positions[i].y += velocities[i].y;

      positions[i].x = Math.max(50, Math.min(width - 50, positions[i].x));
      positions[i].y = Math.max(50, Math.min(height - 50, positions[i].y));
    }
  }

  return nodes.map((node, index) => ({
    id: node.id,
    x: positions[index].x,
    y: positions[index].y,
    size: 12 + (node.size / maxSize) * 24,
  }));
}

function circularLayout(
  nodes: NMAResult["networkGeometry"]["nodes"],
  width: number,
  height: number
): NodePos[] {
  const n = nodes.length;
  if (n === 0) return [];

  const maxSize = Math.max(...nodes.map((node) => node.size), 1);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.34;

  return nodes.map((node, index) => ({
    id: node.id,
    x:
      centerX + radius * Math.cos((2 * Math.PI * index) / n - Math.PI / 2),
    y:
      centerY + radius * Math.sin((2 * Math.PI * index) / n - Math.PI / 2),
    size: 12 + (node.size / maxSize) * 24,
  }));
}

export function NetworkPlot({
  result,
  width = 600,
  height = 500,
  forceLayout = false,
  title,
}: NetworkPlotProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const activeNode = selectedNode ?? hoveredNode;

  const { nodes: geoNodes, edges: geoEdges } = result.networkGeometry;

  const nodePositions = useMemo(
    () =>
      forceLayout
        ? forceDirectedLayout(geoNodes, geoEdges, width, height)
        : circularLayout(geoNodes, width, height),
    [forceLayout, geoNodes, geoEdges, width, height]
  );

  const positionMap = useMemo(() => {
    const map = new Map<string, NodePos>();
    nodePositions.forEach((position) => map.set(position.id, position));
    return map;
  }, [nodePositions]);

  const maxEdgeWeight = useMemo(
    () => Math.max(...geoEdges.map((edge) => edge.weight), 1),
    [geoEdges]
  );

  const connectedTo = useMemo(() => {
    const map = new Map<string, Set<string>>();
    geoNodes.forEach((node) => map.set(node.id, new Set()));
    geoEdges.forEach((edge) => {
      map.get(edge.source)?.add(edge.target);
      map.get(edge.target)?.add(edge.source);
    });
    return map;
  }, [geoNodes, geoEdges]);

  const selectedSummary = useMemo(() => {
    if (!activeNode) return null;

    const linkedEdges = geoEdges.filter(
      (edge) => edge.source === activeNode || edge.target === activeNode
    );
    const totalWeight = linkedEdges.reduce((sum, edge) => sum + edge.weight, 0);
    const pScore = result.pScores.find((score) => score.treatment === activeNode);

    return {
      treatment: activeNode,
      connectedTreatments: connectedTo.get(activeNode)?.size ?? 0,
      directComparisons: linkedEdges.length,
      totalWeight,
      pScore: pScore?.score ?? null,
    };
  }, [activeNode, connectedTo, geoEdges, result.pScores]);

  const handleNodeEnter = useCallback((id: string) => setHoveredNode(id), []);
  const handleNodeLeave = useCallback(() => setHoveredNode(null), []);

  const isEdgeHighlighted = (source: string, target: string) => {
    if (!activeNode) return false;
    return source === activeNode || target === activeNode;
  };

  const isNodeHighlighted = (id: string) => {
    if (!activeNode) return true;
    return id === activeNode || (connectedTo.get(activeNode)?.has(id) ?? false);
  };

  return (
    <div className="space-y-4 overflow-x-auto">
      {title ? <h4 className="mb-2 text-sm font-semibold text-ink">{title}</h4> : null}
      <svg width={width} height={height} className="text-ink" style={{ fontFamily: "inherit" }}>
        <rect x={0} y={0} width={width} height={height} rx={12} fill="currentColor" opacity={0.02} />

        {!geoEdges.length ? null : geoEdges.map((edge) => {
          const source = positionMap.get(edge.source);
          const target = positionMap.get(edge.target);
          if (!source || !target) return null;

          const highlighted = isEdgeHighlighted(edge.source, edge.target);
          const opacity = activeNode ? (highlighted ? 0.8 : 0.1) : 0.4;
          const strokeWidth = 1.5 + (edge.weight / maxEdgeWeight) * 5;

          return (
            <g key={`${edge.source}-${edge.target}`}>
              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                opacity={opacity}
                strokeLinecap="round"
              />
              {edge.weight > 1 ? (
                <text
                  x={(source.x + target.x) / 2}
                  y={(source.y + target.y) / 2 - 6}
                  textAnchor="middle"
                  className="fill-current text-[9px]"
                  opacity={activeNode ? (highlighted ? 0.7 : 0.05) : 0.35}
                >
                  {edge.weight}
                </text>
              ) : null}
            </g>
          );
        })}

        {!nodePositions.length ? null : nodePositions.map((position, index) => {
          const highlighted = isNodeHighlighted(position.id);
          const isSelected = selectedNode === position.id;
          const isHovered = hoveredNode === position.id;
          const opacity = activeNode ? (highlighted ? 1 : 0.15) : 1;
          const color = NODE_COLORS[index % NODE_COLORS.length];

          return (
            <g
              key={position.id}
              onMouseEnter={() => handleNodeEnter(position.id)}
              onMouseLeave={handleNodeLeave}
              onClick={() =>
                setSelectedNode((current) =>
                  current === position.id ? null : position.id
                )
              }
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={position.x}
                cy={position.y}
                r={position.size / 2}
                fill={color}
                opacity={opacity * 0.85}
                stroke={isSelected || isHovered ? "#fff" : color}
                strokeWidth={isSelected ? 4 : isHovered ? 2.5 : 1}
              />
              <text
                x={position.x}
                y={position.y + position.size / 2 + 14}
                textAnchor="middle"
                className="fill-current text-[11px] font-medium"
                opacity={opacity}
              >
                {position.id.length > 18
                  ? `${position.id.slice(0, 18)}...`
                  : position.id}
              </text>
            </g>
          );
        })}

        <text x={12} y={height - 12} className="fill-current text-[9px]" opacity={0.4}>
          Node size = total sample size | Edge thickness = number of studies
        </text>
      </svg>

      {selectedSummary ? (
        <div className="rounded-2xl border border-border bg-surface-raised/40 p-4 text-sm text-ink">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.12em] text-ink-muted">
                Selected Treatment
              </div>
              <div className="mt-1 text-base font-semibold">
                {selectedSummary.treatment}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="text-xs text-brand hover:text-brand/80"
            >
              Clear selection
            </button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-surface px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                Connections
              </div>
              <div className="mt-1 text-lg font-semibold">
                {selectedSummary.connectedTreatments}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                Direct Comparisons
              </div>
              <div className="mt-1 text-lg font-semibold">
                {selectedSummary.directComparisons}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                Edge Weight
              </div>
              <div className="mt-1 text-lg font-semibold">
                {selectedSummary.totalWeight.toFixed(1)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                P-score
              </div>
              <div className="mt-1 text-lg font-semibold">
                {selectedSummary.pScore == null
                  ? "—"
                  : selectedSummary.pScore.toFixed(3)}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
