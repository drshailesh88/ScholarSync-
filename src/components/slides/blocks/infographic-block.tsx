"use client";

import type { InfographicData, InfographicItem, ThemeConfig } from "@/types/presentation";

// ---------------------------------------------------------------------------
// InfographicBlock — SVG-based visual infographics (Napkin-style)
// Renders process flows, comparisons, hierarchies, cycles, funnels, etc.
// ---------------------------------------------------------------------------

interface InfographicBlockProps {
  data: InfographicData;
  theme: ThemeConfig;
  scale?: number;
}

const COLOR_SCHEMES: Record<string, string[]> = {
  blue:    ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#2563EB", "#1D4ED8"],
  green:   ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#059669", "#047857"],
  purple:  ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE", "#7C3AED", "#6D28D9"],
  orange:  ["#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A", "#D97706", "#B45309"],
  rainbow: ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"],
};

function getColors(scheme: string | undefined, theme: ThemeConfig): string[] {
  if (scheme && scheme !== "theme" && COLOR_SCHEMES[scheme]) {
    return COLOR_SCHEMES[scheme];
  }
  return [
    theme.primaryColor,
    theme.accentColor,
    theme.secondaryColor,
    theme.primaryColor + "99",
    theme.accentColor + "99",
    theme.secondaryColor + "99",
  ];
}

function getItemIcon(item: InfographicItem, fallback: string): string {
  return item.icon || fallback;
}

// ---------------------------------------------------------------------------
// Sub-renderers for each infographic type
// ---------------------------------------------------------------------------

function ProcessFlow({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const stepW = 100 / Math.max(items.length, 1);
  return (
    <svg viewBox="0 0 800 200" className="w-full" style={{ maxHeight: "100%" }}>
      {items.map((item, i) => {
        const cx = stepW * i * 8 + stepW * 4;
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            {/* Arrow connector */}
            {i > 0 && (
              <line
                x1={cx - stepW * 4 - 10} y1={80}
                x2={cx - stepW * 2} y2={80}
                stroke={theme.textColor + "40"} strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
            )}
            {/* Step circle */}
            <circle cx={cx} cy={80} r={35} fill={color} opacity={0.15} />
            <circle cx={cx} cy={80} r={30} fill={color} opacity={0.9} />
            <text x={cx} y={86} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">
              {getItemIcon(item, `${i + 1}`)}
            </text>
            {/* Label */}
            <text x={cx} y={135} textAnchor="middle" fill={theme.textColor} fontSize={12} fontWeight="600">
              {item.label}
            </text>
            {item.description && (
              <text x={cx} y={152} textAnchor="middle" fill={theme.textColor} fontSize={9} opacity={0.6}>
                {item.description.length > 25 ? item.description.slice(0, 25) + "…" : item.description}
              </text>
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={theme.textColor + "60"} />
        </marker>
      </defs>
    </svg>
  );
}

function Comparison({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const colW = 100 / Math.max(items.length, 1);
  return (
    <svg viewBox="0 0 800 240" className="w-full" style={{ maxHeight: "100%" }}>
      {items.map((item, i) => {
        const x = colW * i * 8 + 10;
        const w = colW * 8 - 20;
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            <rect x={x} y={10} width={w} height={220} rx={12} fill={color} opacity={0.08} />
            <rect x={x} y={10} width={w} height={50} rx={12} fill={color} opacity={0.2} />
            {/* Clip bottom corners of header */}
            <rect x={x} y={35} width={w} height={25} fill={color} opacity={0.2} />
            <text x={x + w / 2} y={42} textAnchor="middle" fill={theme.textColor} fontSize={14} fontWeight="700">
              {getItemIcon(item, "📌")} {item.label}
            </text>
            {item.description && (
              <foreignObject x={x + 10} y={70} width={w - 20} height={140}>
                <div
                  style={{ color: theme.textColor, fontSize: 11, lineHeight: 1.4, opacity: 0.75 }}
                >
                  {item.description}
                </div>
              </foreignObject>
            )}
            {item.value && (
              <text x={x + w / 2} y={220} textAnchor="middle" fill={color} fontSize={18} fontWeight="800">
                {item.value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Hierarchy({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  // Root at top, children below in a tree
  const root = items[0];
  const children = items.slice(1);
  const childW = 800 / Math.max(children.length, 1);

  return (
    <svg viewBox="0 0 800 220" className="w-full" style={{ maxHeight: "100%" }}>
      {/* Root node */}
      {root && (
        <g>
          <rect x={300} y={10} width={200} height={50} rx={10} fill={colors[0]} opacity={0.9} />
          <text x={400} y={42} textAnchor="middle" fill="white" fontSize={14} fontWeight="700">
            {root.label}
          </text>
        </g>
      )}
      {/* Children */}
      {children.map((child, i) => {
        const cx = childW * i + childW / 2;
        const color = colors[(i + 1) % colors.length];
        return (
          <g key={i}>
            {/* Connector line */}
            <line x1={400} y1={60} x2={cx} y2={100} stroke={theme.textColor + "30"} strokeWidth={1.5} />
            {/* Child node */}
            <rect x={cx - 70} y={100} width={140} height={45} rx={8} fill={color} opacity={0.15} />
            <rect x={cx - 70} y={100} width={4} height={45} rx={2} fill={color} />
            <text x={cx - 55} y={125} fill={theme.textColor} fontSize={11} fontWeight="600">
              {child.label}
            </text>
            {child.description && (
              <text x={cx - 55} y={140} fill={theme.textColor} fontSize={9} opacity={0.6}>
                {child.description.length > 20 ? child.description.slice(0, 20) + "…" : child.description}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Cycle({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const n = items.length;
  const cx = 400, cy = 110, r = 85;

  return (
    <svg viewBox="0 0 800 230" className="w-full" style={{ maxHeight: "100%" }}>
      {items.map((item, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const x = cx + r * 1.8 * Math.cos(angle);
        const y = cy + r * Math.sin(angle) + 10;
        const color = colors[i % colors.length];

        // Arrow to next node
        const nextAngle = (2 * Math.PI * ((i + 1) % n)) / n - Math.PI / 2;
        const nx = cx + r * 1.8 * Math.cos(nextAngle);
        const ny = cy + r * Math.sin(nextAngle) + 10;
        const mx = (x + nx) / 2 + (cy - (y + ny) / 2) * 0.3;
        const my = (y + ny) / 2 + ((x + nx) / 2 - cx) * 0.3;

        return (
          <g key={i}>
            <path
              d={`M ${x} ${y} Q ${mx} ${my} ${nx} ${ny}`}
              fill="none" stroke={theme.textColor + "25"} strokeWidth={1.5}
              markerEnd="url(#arrowhead-cycle)"
            />
            <circle cx={x} cy={y} r={32} fill={color} opacity={0.9} />
            <text x={x} y={y - 5} textAnchor="middle" fill="white" fontSize={16}>
              {getItemIcon(item, `${i + 1}`)}
            </text>
            <text x={x} y={y + 12} textAnchor="middle" fill="white" fontSize={8} fontWeight="600">
              {item.label.length > 10 ? item.label.slice(0, 10) + "…" : item.label}
            </text>
          </g>
        );
      })}
      <defs>
        <marker id="arrowhead-cycle" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <polygon points="0 0, 6 2.5, 0 5" fill={theme.textColor + "50"} />
        </marker>
      </defs>
    </svg>
  );
}

function Funnel({ items, colors, theme: _theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const n = items.length;
  const totalH = 200;
  const stepH = totalH / n;

  return (
    <svg viewBox="0 0 800 240" className="w-full" style={{ maxHeight: "100%" }}>
      {items.map((item, i) => {
        const topW = 700 - (i * 500) / n;
        const botW = 700 - ((i + 1) * 500) / n;
        const y = i * stepH + 15;
        const color = colors[i % colors.length];
        const topX = (800 - topW) / 2;
        const botX = (800 - botW) / 2;

        return (
          <g key={i}>
            <polygon
              points={`${topX},${y} ${topX + topW},${y} ${botX + botW},${y + stepH - 2} ${botX},${y + stepH - 2}`}
              fill={color} opacity={0.8}
            />
            <text x={400} y={y + stepH / 2 + 4} textAnchor="middle" fill="white" fontSize={13} fontWeight="600">
              {item.label}
              {item.value ? ` — ${item.value}` : ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Pyramid({ items, colors, theme: _theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const n = items.length;
  const totalH = 200;
  const stepH = totalH / n;

  return (
    <svg viewBox="0 0 800 240" className="w-full" style={{ maxHeight: "100%" }}>
      {items.map((item, i) => {
        // Pyramid: top is narrowest, bottom is widest (reversed from funnel)
        const ri = n - 1 - i; // reverse index
        const topW = 700 - (ri * 600) / n;
        const botW = 700 - ((ri + 1) * 600) / n;
        const y = ri * stepH + 15;
        const color = colors[i % colors.length];
        const topX = (800 - topW) / 2;
        const botX = (800 - botW) / 2;

        return (
          <g key={i}>
            <polygon
              points={`${topX},${y} ${topX + topW},${y} ${botX + botW},${y + stepH - 2} ${botX},${y + stepH - 2}`}
              fill={color} opacity={0.8}
            />
            <text x={400} y={y + stepH / 2 + 5} textAnchor="middle" fill="white" fontSize={12} fontWeight="600">
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function VennDiagram({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const circles = items.slice(0, 3);
  const positions = [
    { cx: 330, cy: 100 },
    { cx: 470, cy: 100 },
    { cx: 400, cy: 160 },
  ];

  return (
    <svg viewBox="0 0 800 240" className="w-full" style={{ maxHeight: "100%" }}>
      {circles.map((item, i) => {
        const pos = positions[i] || positions[0];
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            <circle cx={pos.cx} cy={pos.cy} r={80} fill={color} opacity={0.25} stroke={color} strokeWidth={2} />
            <text x={pos.cx} y={pos.cy + 5} textAnchor="middle" fill={theme.textColor} fontSize={12} fontWeight="600">
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Matrix({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const quadrants = items.slice(0, 4);
  const positions = [
    { x: 50, y: 20 },   // top-left
    { x: 410, y: 20 },  // top-right
    { x: 50, y: 125 },  // bottom-left
    { x: 410, y: 125 }, // bottom-right
  ];

  return (
    <svg viewBox="0 0 800 240" className="w-full" style={{ maxHeight: "100%" }}>
      {/* Grid lines */}
      <line x1={400} y1={10} x2={400} y2={230} stroke={theme.textColor + "20"} strokeWidth={2} />
      <line x1={40} y1={120} x2={760} y2={120} stroke={theme.textColor + "20"} strokeWidth={2} />

      {quadrants.map((item, i) => {
        const pos = positions[i];
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            <rect x={pos.x} y={pos.y} width={340} height={95} rx={8} fill={color} opacity={0.08} />
            <text x={pos.x + 15} y={pos.y + 28} fill={color} fontSize={14} fontWeight="700">
              {getItemIcon(item, "●")} {item.label}
            </text>
            {item.description && (
              <text x={pos.x + 15} y={pos.y + 50} fill={theme.textColor} fontSize={10} opacity={0.65}>
                {item.description.length > 45 ? item.description.slice(0, 45) + "…" : item.description}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Radial({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const center = items[0];
  const spokes = items.slice(1);
  const n = spokes.length;
  const cx = 400, cy = 115;

  return (
    <svg viewBox="0 0 800 240" className="w-full" style={{ maxHeight: "100%" }}>
      {/* Central node */}
      {center && (
        <g>
          <circle cx={cx} cy={cy} r={40} fill={colors[0]} opacity={0.9} />
          <text x={cx} y={cy + 5} textAnchor="middle" fill="white" fontSize={11} fontWeight="700">
            {center.label.length > 12 ? center.label.slice(0, 12) + "…" : center.label}
          </text>
        </g>
      )}
      {/* Spokes */}
      {spokes.map((item, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const x = cx + 150 * Math.cos(angle);
        const y = cy + 85 * Math.sin(angle);
        const color = colors[(i + 1) % colors.length];
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={theme.textColor + "20"} strokeWidth={1.5} />
            <circle cx={x} cy={y} r={28} fill={color} opacity={0.15} />
            <circle cx={x} cy={y} r={24} fill={color} opacity={0.9} />
            <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize={9} fontWeight="600">
              {item.label.length > 8 ? item.label.slice(0, 8) + "…" : item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function StatsRow({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const n = items.length;
  const cardW = 800 / Math.max(n, 1) - 15;

  return (
    <svg viewBox="0 0 800 140" className="w-full" style={{ maxHeight: "100%" }}>
      {items.map((item, i) => {
        const x = i * (cardW + 15) + 5;
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            <rect x={x} y={10} width={cardW} height={120} rx={10} fill={color} opacity={0.08} />
            <rect x={x} y={10} width={cardW} height={4} rx={2} fill={color} />
            <text x={x + cardW / 2} y={55} textAnchor="middle" fill={color} fontSize={28} fontWeight="800">
              {item.value || "—"}
            </text>
            <text x={x + cardW / 2} y={80} textAnchor="middle" fill={theme.textColor} fontSize={11} fontWeight="600">
              {item.label}
            </text>
            {item.description && (
              <text x={x + cardW / 2} y={100} textAnchor="middle" fill={theme.textColor} fontSize={9} opacity={0.5}>
                {item.description.length > 25 ? item.description.slice(0, 25) + "…" : item.description}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Checklist({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const rowH = 35;
  return (
    <svg viewBox={`0 0 800 ${items.length * rowH + 20}`} className="w-full" style={{ maxHeight: "100%" }}>
      {items.map((item, i) => {
        const y = i * rowH + 15;
        const isDone = item.status === "done";
        const isActive = item.status === "active";
        const color = isDone ? colors[0] : isActive ? colors[1] : theme.textColor + "40";
        return (
          <g key={i}>
            {/* Check circle */}
            <circle cx={30} cy={y + 10} r={10} fill={color} opacity={isDone ? 0.9 : 0.15} stroke={color} strokeWidth={1.5} />
            {isDone && (
              <text x={30} y={y + 15} textAnchor="middle" fill="white" fontSize={12}>✓</text>
            )}
            {/* Label */}
            <text
              x={55} y={y + 15}
              fill={theme.textColor}
              fontSize={13}
              fontWeight={isActive ? "600" : "400"}
              opacity={isDone ? 0.5 : 1}
              textDecoration={isDone ? "line-through" : "none"}
            >
              {item.label}
            </text>
            {item.value && (
              <text x={750} y={y + 15} textAnchor="end" fill={color} fontSize={12} fontWeight="600">
                {item.value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function CauseEffect({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  // Fishbone/Ishikawa: effect on right, causes branching from spine
  const effect = items[0];
  const causes = items.slice(1);
  const n = causes.length;

  return (
    <svg viewBox="0 0 800 220" className="w-full" style={{ maxHeight: "100%" }}>
      {/* Spine */}
      <line x1={50} y1={110} x2={680} y2={110} stroke={theme.textColor + "40"} strokeWidth={3} />
      {/* Effect box */}
      {effect && (
        <g>
          <rect x={680} y={80} width={110} height={60} rx={8} fill={colors[0]} opacity={0.9} />
          <text x={735} y={115} textAnchor="middle" fill="white" fontSize={11} fontWeight="700">
            {effect.label}
          </text>
        </g>
      )}
      {/* Cause branches */}
      {causes.map((cause, i) => {
        const x = 100 + (i * 550) / Math.max(n, 1);
        const isTop = i % 2 === 0;
        const y = isTop ? 30 : 190;
        const color = colors[(i + 1) % colors.length];
        return (
          <g key={i}>
            <line x1={x} y1={110} x2={x + 30} y2={y + (isTop ? 20 : -20)} stroke={color} strokeWidth={2} opacity={0.6} />
            <rect x={x - 10} y={isTop ? y - 5 : y - 25} width={120} height={35} rx={6} fill={color} opacity={0.15} />
            <text x={x + 50} y={isTop ? y + 15 : y - 5} textAnchor="middle" fill={theme.textColor} fontSize={10} fontWeight="600">
              {cause.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main renderer
// ---------------------------------------------------------------------------

const RENDERERS: Record<string, React.ComponentType<{ items: InfographicItem[]; colors: string[]; theme: ThemeConfig }>> = {
  process_flow: ProcessFlow,
  comparison: Comparison,
  hierarchy: Hierarchy,
  cycle: Cycle,
  funnel: Funnel,
  pyramid: Pyramid,
  venn: VennDiagram,
  matrix: Matrix,
  radial: Radial,
  stats_row: StatsRow,
  checklist: Checklist,
  cause_effect: CauseEffect,
};

export function InfographicBlock({ data, theme }: InfographicBlockProps) {
  const colors = getColors(data.colorScheme, theme);
  const Renderer = RENDERERS[data.infographicType] || ProcessFlow;

  return (
    <div className="flex flex-col items-center gap-[0.2em] w-full">
      {data.title && (
        <div className="text-[0.65em] font-semibold" style={{ color: theme.textColor }}>
          {data.title}
        </div>
      )}
      <div className="w-full flex items-center justify-center">
        <Renderer items={data.items} colors={colors} theme={theme} />
      </div>
      {data.caption && (
        <div className="text-[0.5em] opacity-50 italic" style={{ color: theme.textColor }}>
          {data.caption}
        </div>
      )}
    </div>
  );
}
