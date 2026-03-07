"use client";

import { memo } from "react";
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
  blue:    ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#1D4ED8", "#1E40AF"],
  green:   ["#059669", "#10B981", "#34D399", "#6EE7B7", "#047857", "#065F46"],
  purple:  ["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#6D28D9", "#5B21B6"],
  orange:  ["#D97706", "#F59E0B", "#FBBF24", "#FCD34D", "#B45309", "#92400E"],
  rainbow: ["#DC2626", "#D97706", "#059669", "#2563EB", "#7C3AED", "#DB2777"],
};

function getColors(scheme: string | undefined, theme: ThemeConfig): string[] {
  if (scheme && scheme !== "theme" && COLOR_SCHEMES[scheme]) {
    return COLOR_SCHEMES[scheme];
  }
  return [
    theme.primaryColor,
    theme.accentColor,
    theme.secondaryColor,
    theme.primaryColor + "CC",
    theme.accentColor + "CC",
    theme.secondaryColor + "CC",
  ];
}

function getItemIcon(item: InfographicItem, fallback: string): string {
  return item.icon || fallback;
}

/** Wrap long text into multiple tspan lines */
function wrapText(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (current.length + word.length + 1 > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3); // max 3 lines
}

// ---------------------------------------------------------------------------
// Sub-renderers for each infographic type
// ---------------------------------------------------------------------------

function ProcessFlow({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const n = Math.max(items.length, 1);
  // Dynamic sizing: shrink cards and gaps when items exceed available width
  const maxTotalW = 780;
  const baseCardW = 120;
  const baseGap = 24;
  const baseR = 30;
  const baseFontIcon = 22;
  const baseFontLabel = 13;
  const baseFontDesc = 10;
  const baseDescLen = 20;

  const neededW = n * baseCardW + (n - 1) * baseGap;
  const scale = neededW > maxTotalW ? maxTotalW / neededW : 1;

  const cardW = baseCardW * scale;
  const gap = baseGap * scale;
  const r = Math.max(baseR * scale, 18);
  const fontIcon = Math.max(baseFontIcon * scale, 14);
  const fontLabel = Math.max(baseFontLabel * scale, 9);
  const fontDesc = Math.max(baseFontDesc * scale, 7);
  const descLen = Math.max(Math.floor(baseDescLen * scale), 12);

  const totalW = n * cardW + (n - 1) * gap;
  const offsetX = (800 - totalW) / 2;

  return (
    <svg viewBox="0 0 800 170" className="w-full">
      {items.map((item, i) => {
        const cx = offsetX + i * (cardW + gap) + cardW / 2;
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            {i > 0 && (
              <line
                x1={cx - cardW / 2 - gap + 5} y1={70}
                x2={cx - cardW / 2 - 5} y2={70}
                stroke={theme.textColor + "50"} strokeWidth={2.5}
                markerEnd="url(#pf-arrow)"
              />
            )}
            <circle cx={cx} cy={70} r={r + 6} fill={color} opacity={0.12} />
            <circle cx={cx} cy={70} r={r} fill={color} />
            <text x={cx} y={77} textAnchor="middle" fill="white" fontSize={fontIcon} fontWeight="bold">
              {getItemIcon(item, `${i + 1}`)}
            </text>
            <text x={cx} y={128} textAnchor="middle" fill={theme.textColor} fontSize={fontLabel} fontWeight="700">
              {item.label.length > descLen + 5 ? item.label.slice(0, descLen + 5) + "…" : item.label}
            </text>
            {item.description && (
              <text x={cx} y={145} textAnchor="middle" fill={theme.textColor} fontSize={fontDesc} opacity={0.6}>
                {item.description.length > descLen ? item.description.slice(0, descLen) + "…" : item.description}
              </text>
            )}
          </g>
        );
      })}
      <defs>
        <marker id="pf-arrow" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
          <polygon points="0 0, 10 4, 0 8" fill={theme.textColor + "70"} />
        </marker>
      </defs>
    </svg>
  );
}

function Comparison({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const n = Math.max(items.length, 1);
  const colW = (760 - (n - 1) * 16) / n;

  return (
    <svg viewBox="0 0 800 180" className="w-full">
      {items.map((item, i) => {
        const x = 20 + i * (colW + 16);
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            <rect x={x} y={5} width={colW} height={170} rx={10} fill={color} opacity={0.06} />
            <rect x={x} y={5} width={colW} height={38} rx={10} fill={color} opacity={0.2} />
            <rect x={x} y={28} width={colW} height={15} fill={color} opacity={0.2} />
            <text x={x + colW / 2} y={30} textAnchor="middle" fill={theme.textColor} fontSize={13} fontWeight="700">
              {getItemIcon(item, "📌")} {item.label}
            </text>
            {item.description && (
              <foreignObject x={x + 8} y={48} width={colW - 16} height={80}>
                <div style={{ color: theme.textColor, fontSize: 10, lineHeight: 1.3, opacity: 0.75 }}>
                  {item.description}
                </div>
              </foreignObject>
            )}
            {item.value && (
              <text x={x + colW / 2} y={160} textAnchor="middle" fill={color} fontSize={18} fontWeight="800">
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
  const root = items[0];
  const children = items.slice(1);
  const n = Math.max(children.length, 1);
  const childW = 760 / n;

  return (
    <svg viewBox="0 0 800 170" className="w-full">
      {root && (
        <g>
          <rect x={280} y={8} width={240} height={42} rx={8} fill={colors[0]} />
          <text x={400} y={35} textAnchor="middle" fill="white" fontSize={14} fontWeight="700">
            {root.label}
          </text>
        </g>
      )}
      {children.map((child, i) => {
        const cx = 20 + childW * i + childW / 2;
        const color = colors[(i + 1) % colors.length];
        return (
          <g key={i}>
            <line x1={400} y1={50} x2={cx} y2={75} stroke={theme.textColor + "30"} strokeWidth={2} />
            <rect x={cx - 80} y={75} width={160} height={45} rx={6} fill={color} opacity={0.12} />
            <rect x={cx - 80} y={75} width={4} height={45} rx={2} fill={color} />
            <text x={cx - 64} y={96} fill={theme.textColor} fontSize={12} fontWeight="600">
              {child.label}
            </text>
            {child.description && (
              <text x={cx - 64} y={112} fill={theme.textColor} fontSize={9} opacity={0.6}>
                {child.description.length > 28 ? child.description.slice(0, 28) + "…" : child.description}
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
  // Ultra-wide ellipse to fit widescreen 16:10 slides
  const cxc = 400, cyc = 85;
  const rxc = 300, ryc = 55;

  return (
    <svg viewBox="0 0 800 175" className="w-full">
      {items.map((item, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const x = cxc + rxc * Math.cos(angle);
        const y = cyc + ryc * Math.sin(angle);
        const color = colors[i % colors.length];

        const nextAngle = (2 * Math.PI * ((i + 1) % n)) / n - Math.PI / 2;
        const nx = cxc + rxc * Math.cos(nextAngle);
        const ny = cyc + ryc * Math.sin(nextAngle);
        const mx = (x + nx) / 2 + (cyc - (y + ny) / 2) * 0.2;
        const my = (y + ny) / 2 + ((x + nx) / 2 - cxc) * 0.2;

        const labelLines = wrapText(item.label, 12);

        return (
          <g key={i}>
            <path
              d={`M ${x} ${y} Q ${mx} ${my} ${nx} ${ny}`}
              fill="none" stroke={theme.textColor + "30"} strokeWidth={1.5}
              markerEnd="url(#cycle-arrow)"
            />
            <circle cx={x} cy={y} r={30} fill={color} />
            <text x={x} y={y - 2} textAnchor="middle" fill="white" fontSize={15}>
              {getItemIcon(item, `${i + 1}`)}
            </text>
            {labelLines.map((line, li) => (
              <text
                key={li}
                x={x} y={y + 10 + li * 11}
                textAnchor="middle" fill="white" fontSize={9} fontWeight="600"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
      <defs>
        <marker id="cycle-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={theme.textColor + "60"} />
        </marker>
      </defs>
    </svg>
  );
}

function Funnel({ items, colors, theme: _theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const n = items.length;
  const totalH = 155;
  const stepH = totalH / n;

  return (
    <svg viewBox="0 0 800 170" className="w-full">
      {items.map((item, i) => {
        const topW = 720 - (i * 520) / n;
        const botW = 720 - ((i + 1) * 520) / n;
        const y = i * stepH + 6;
        const color = colors[i % colors.length];
        const topX = (800 - topW) / 2;
        const botX = (800 - botW) / 2;

        return (
          <g key={i}>
            <polygon
              points={`${topX},${y} ${topX + topW},${y} ${botX + botW},${y + stepH - 2} ${botX},${y + stepH - 2}`}
              fill={color} opacity={0.85}
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
  const totalH = 155;
  const stepH = totalH / n;
  const minW = 120;
  const maxW = 720;

  return (
    <svg viewBox="0 0 800 170" className="w-full">
      {items.map((item, i) => {
        const topW = minW + (i * (maxW - minW)) / n;
        const botW = minW + ((i + 1) * (maxW - minW)) / n;
        const y = i * stepH + 6;
        const color = colors[i % colors.length];
        const topX = (800 - topW) / 2;
        const botX = (800 - botW) / 2;

        return (
          <g key={i}>
            <polygon
              points={`${topX},${y} ${topX + topW},${y} ${botX + botW},${y + stepH - 2} ${botX},${y + stepH - 2}`}
              fill={color} opacity={0.85}
            />
            <text x={400} y={y + stepH / 2 + 4} textAnchor="middle" fill="white" fontSize={12} fontWeight="600">
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
    { cx: 340, cy: 80 },
    { cx: 460, cy: 80 },
    { cx: 400, cy: 140 },
  ];

  return (
    <svg viewBox="0 0 800 180" className="w-full">
      {circles.map((item, i) => {
        const pos = positions[i] || positions[0];
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            <circle cx={pos.cx} cy={pos.cy} r={70} fill={color} opacity={0.2} stroke={color} strokeWidth={2} />
            <text x={pos.cx} y={pos.cy + 4} textAnchor="middle" fill={theme.textColor} fontSize={12} fontWeight="600">
              {item.label}
            </text>
            {item.description && (
              <text x={pos.cx} y={pos.cy + 18} textAnchor="middle" fill={theme.textColor} fontSize={9} opacity={0.6}>
                {item.description.length > 22 ? item.description.slice(0, 22) + "…" : item.description}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Matrix({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const quadrants = items.slice(0, 4);
  const positions = [
    { x: 20, y: 5 },
    { x: 410, y: 5 },
    { x: 20, y: 92 },
    { x: 410, y: 92 },
  ];

  return (
    <svg viewBox="0 0 800 180" className="w-full">
      <line x1={400} y1={2} x2={400} y2={178} stroke={theme.textColor + "20"} strokeWidth={2} />
      <line x1={15} y1={90} x2={785} y2={90} stroke={theme.textColor + "20"} strokeWidth={2} />

      {quadrants.map((item, i) => {
        const pos = positions[i];
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            <rect x={pos.x} y={pos.y} width={370} height={82} rx={6} fill={color} opacity={0.06} />
            <text x={pos.x + 10} y={pos.y + 22} fill={color} fontSize={13} fontWeight="700">
              {getItemIcon(item, "●")} {item.label}
            </text>
            {item.description && (
              <foreignObject x={pos.x + 10} y={pos.y + 28} width={340} height={48}>
                <div style={{ color: theme.textColor, fontSize: 10, lineHeight: 1.3, opacity: 0.65 }}>
                  {item.description}
                </div>
              </foreignObject>
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
  const cxr = 400, cyr = 85;

  return (
    <svg viewBox="0 0 800 175" className="w-full">
      {center && (
        <g>
          <circle cx={cxr} cy={cyr} r={38} fill={colors[0]} />
          <text x={cxr} y={cyr + 4} textAnchor="middle" fill="white" fontSize={11} fontWeight="700">
            {center.label.length > 14 ? center.label.slice(0, 14) + "…" : center.label}
          </text>
        </g>
      )}
      {spokes.map((item, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const x = cxr + 220 * Math.cos(angle);
        const y = cyr + 60 * Math.sin(angle);
        const color = colors[(i + 1) % colors.length];
        return (
          <g key={i}>
            <line x1={cxr} y1={cyr} x2={x} y2={y} stroke={theme.textColor + "20"} strokeWidth={1.5} />
            <circle cx={x} cy={y} r={24} fill={color} opacity={0.12} />
            <circle cx={x} cy={y} r={21} fill={color} />
            <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize={9} fontWeight="600">
              {item.label.length > 12 ? item.label.slice(0, 12) + "…" : item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function StatsRow({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const n = items.length;
  const cardW = (760 - (n - 1) * 14) / Math.max(n, 1);

  return (
    <svg viewBox="0 0 800 160" className="w-full">
      {items.map((item, i) => {
        const x = 20 + i * (cardW + 14);
        const color = colors[i % colors.length];
        return (
          <g key={i}>
            <rect x={x} y={8} width={cardW} height={145} rx={10} fill={color} opacity={0.06} />
            <rect x={x} y={8} width={cardW} height={4} rx={2} fill={color} />
            <text x={x + cardW / 2} y={65} textAnchor="middle" fill={color} fontSize={30} fontWeight="800">
              {item.value || "—"}
            </text>
            <text x={x + cardW / 2} y={88} textAnchor="middle" fill={theme.textColor} fontSize={12} fontWeight="600">
              {item.label}
            </text>
            {item.description && (
              <foreignObject x={x + 6} y={96} width={cardW - 12} height={48}>
                <div style={{
                  color: theme.textColor,
                  fontSize: 9,
                  textAlign: "center",
                  opacity: 0.5,
                  lineHeight: 1.3,
                  overflow: "hidden",
                }}>
                  {item.description}
                </div>
              </foreignObject>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Checklist({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const rowH = 28;
  const totalH = Math.min(items.length * rowH + 16, 175);
  return (
    <svg viewBox={`0 0 800 ${totalH}`} className="w-full">
      {items.map((item, i) => {
        const y = i * rowH + 12;
        const isDone = item.status === "done";
        const isActive = item.status === "active";
        const color = isDone ? colors[0] : isActive ? colors[1] : theme.textColor + "40";
        return (
          <g key={i}>
            {i % 2 === 0 && (
              <rect x={10} y={y - 3} width={780} height={rowH} rx={4} fill={theme.textColor} opacity={0.03} />
            )}
            <circle cx={35} cy={y + 10} r={10} fill={color} opacity={isDone ? 0.9 : 0.12} stroke={color} strokeWidth={1.5} />
            {isDone && (
              <text x={35} y={y + 15} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">✓</text>
            )}
            {isActive && (
              <circle cx={35} cy={y + 10} r={4} fill={color} />
            )}
            <text
              x={58} y={y + 15}
              fill={theme.textColor}
              fontSize={12}
              fontWeight={isActive ? "600" : "400"}
              opacity={isDone ? 0.5 : 1}
              textDecoration={isDone ? "line-through" : "none"}
            >
              {item.label}
            </text>
            {item.value && (
              <text x={760} y={y + 15} textAnchor="end" fill={color} fontSize={11} fontWeight="600">
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
  const effect = items[0];
  const causes = items.slice(1);
  const n = causes.length;

  return (
    <svg viewBox="0 0 800 160" className="w-full">
      <line x1={60} y1={80} x2={660} y2={80} stroke={theme.textColor + "40"} strokeWidth={2.5} />
      {effect && (
        <g>
          <rect x={660} y={58} width={125} height={44} rx={8} fill={colors[0]} />
          <text x={722} y={85} textAnchor="middle" fill="white" fontSize={12} fontWeight="700">
            {effect.label}
          </text>
        </g>
      )}
      {causes.map((cause, i) => {
        const x = 80 + (i * 560) / Math.max(n, 1);
        const isTop = i % 2 === 0;
        const y = isTop ? 12 : 130;
        const color = colors[(i + 1) % colors.length];
        return (
          <g key={i}>
            <line x1={x + 40} y1={80} x2={x + 50} y2={isTop ? y + 28 : y - 6} stroke={color} strokeWidth={1.5} opacity={0.6} />
            <rect x={x - 5} y={isTop ? y : y - 24} width={120} height={30} rx={5} fill={color} opacity={0.12} />
            <rect x={x - 5} y={isTop ? y : y - 24} width={3} height={30} rx={2} fill={color} />
            <text x={x + 55} y={isTop ? y + 20 : y - 5} textAnchor="middle" fill={theme.textColor} fontSize={10} fontWeight="600">
              {cause.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function IconArray({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  // Each item = a category with value = count of icons
  const parsed = items.map((item, i) => ({
    label: item.label,
    count: Math.max(Math.round(Number(item.value) || 1), 0),
    icon: item.icon || "●",
    color: item.color || colors[i % colors.length],
  }));
  const total = parsed.reduce((s, p) => s + p.count, 0);
  const iconsPerRow = 10;
  const rows = Math.ceil(total / iconsPerRow);
  const iconSize = 24;
  const gridH = rows * (iconSize + 4);
  const legendH = 30;
  const viewH = gridH + legendH + 50;

  // Flatten into a single sequence of icons
  const flatIcons: { icon: string; color: string }[] = [];
  for (const p of parsed) {
    for (let j = 0; j < p.count; j++) {
      flatIcons.push({ icon: p.icon, color: p.color });
    }
  }

  const gridOffsetX = (800 - iconsPerRow * (iconSize + 8)) / 2;

  return (
    <svg viewBox={`0 0 800 ${Math.max(viewH, 120)}`} className="w-full">
      {flatIcons.map((fi, i) => {
        const col = i % iconsPerRow;
        const row = Math.floor(i / iconsPerRow);
        const x = gridOffsetX + col * (iconSize + 8) + iconSize / 2;
        const y = 20 + row * (iconSize + 4) + iconSize / 2;
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central" fill={fi.color} fontSize={iconSize - 4}>
            {fi.icon}
          </text>
        );
      })}
      {/* Legend */}
      {parsed.map((p, i) => {
        const lx = gridOffsetX + i * 140;
        const ly = gridH + 35;
        return (
          <g key={i}>
            <circle cx={lx + 6} cy={ly} r={5} fill={p.color} />
            <text x={lx + 16} y={ly + 4} fill={theme.textColor} fontSize={11} fontWeight="600">
              {p.label} ({p.count})
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Pictograph({ items, colors, theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const rowH = 50;
  const labelW = 160;
  const iconSize = 22;
  const iconGap = 6;
  const viewH = items.length * rowH + 40;

  return (
    <svg viewBox={`0 0 800 ${Math.max(viewH, 80)}`} className="w-full">
      <defs>
        <clipPath id="picto-half">
          <rect x="0" y="0" width="11" height="30" />
        </clipPath>
      </defs>
      {items.map((item, i) => {
        const y = 20 + i * rowH;
        const val = Number(item.value) || 0;
        const fullCount = Math.floor(val);
        const fractional = val - fullCount;
        const icon = item.icon || "●";
        const color = item.color || colors[i % colors.length];

        return (
          <g key={i}>
            {/* Label */}
            <text x={20} y={y + iconSize / 2 + 4} fill={theme.textColor} fontSize={12} fontWeight="600">
              {item.label.length > 18 ? item.label.slice(0, 18) + "…" : item.label}
            </text>
            {/* Full icons */}
            {Array.from({ length: fullCount }).map((_, j) => (
              <text
                key={`f${j}`}
                x={labelW + j * (iconSize + iconGap)}
                y={y + iconSize / 2 + 4}
                fill={color}
                fontSize={iconSize - 2}
                textAnchor="start"
              >
                {icon}
              </text>
            ))}
            {/* Partial icon */}
            {fractional > 0 && (
              <g clipPath="url(#picto-half)">
                <text
                  x={labelW + fullCount * (iconSize + iconGap)}
                  y={y + iconSize / 2 + 4}
                  fill={color}
                  fontSize={iconSize - 2}
                  textAnchor="start"
                >
                  {icon}
                </text>
              </g>
            )}
            {/* Value label */}
            <text
              x={labelW + (fullCount + (fractional > 0 ? 1 : 0)) * (iconSize + iconGap) + 8}
              y={y + iconSize / 2 + 4}
              fill={theme.textColor}
              fontSize={10}
              opacity={0.5}
            >
              {item.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function WordCloud({ items, colors, theme: _theme }: { items: InfographicItem[]; colors: string[]; theme: ThemeConfig }) {
  const viewW = 800, viewH = 500;
  const cx = viewW / 2, cy = viewH / 2;

  // Parse values and compute font sizes
  const values = items.map((item) => Number(item.value) || 1);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const sized = items
    .map((item, i) => {
      const v = Number(item.value) || 1;
      const fontSize = 10 + ((v - minVal) / range) * 38; // 10px to 48px
      return { label: item.label, fontSize, value: v, color: colors[i % colors.length] };
    })
    .sort((a, b) => b.value - a.value);

  // Simple spiral placement
  type Rect = { x: number; y: number; w: number; h: number };
  const placed: { label: string; x: number; y: number; fontSize: number; color: string }[] = [];
  const rects: Rect[] = [];

  function overlaps(r: Rect): boolean {
    for (const pr of rects) {
      if (r.x < pr.x + pr.w && r.x + r.w > pr.x && r.y < pr.y + pr.h && r.y + r.h > pr.y) {
        return true;
      }
    }
    return false;
  }

  for (const item of sized) {
    const estW = item.label.length * item.fontSize * 0.6;
    const estH = item.fontSize * 1.3;
    let found = false;

    // Spiral outward from center
    for (let t = 0; t < 600 && !found; t++) {
      const angle = t * 0.15;
      const radius = t * 0.8;
      const x = cx + radius * Math.cos(angle) - estW / 2;
      const y = cy + radius * Math.sin(angle) - estH / 2;

      const rect: Rect = { x, y, w: estW, h: estH };

      // Check bounds
      if (x < 10 || x + estW > viewW - 10 || y < 10 || y + estH > viewH - 10) continue;

      if (!overlaps(rect)) {
        rects.push(rect);
        placed.push({ label: item.label, x: x + estW / 2, y: y + estH * 0.75, fontSize: item.fontSize, color: item.color });
        found = true;
      }
    }

    // Fallback: deterministic offset based on index if spiral failed
    if (!found) {
      const idx = sized.indexOf(item);
      const angle = (idx * 2.39996); // golden angle in radians
      const x = cx + Math.cos(angle) * 100;
      const y = cy + Math.sin(angle) * 80;
      placed.push({ label: item.label, x, y, fontSize: item.fontSize, color: item.color });
    }
  }

  return (
    <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full">
      {placed.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          fill={p.color}
          fontSize={p.fontSize}
          fontWeight={p.fontSize > 30 ? "800" : p.fontSize > 20 ? "600" : "400"}
        >
          {p.label}
        </text>
      ))}
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
  icon_array: IconArray,
  pictograph: Pictograph,
  word_cloud: WordCloud,
};

export const InfographicBlock = memo(function InfographicBlock({ data, theme }: InfographicBlockProps) {
  const colors = getColors(data.colorScheme, theme);
  const Renderer = RENDERERS[data.infographicType] || ProcessFlow;

  return (
    <div className="flex flex-col items-center w-full">
      {data.title && (
        <div className="text-[0.7em] font-semibold tracking-tight leading-none mb-[0.15em]" style={{ color: theme.textColor }}>
          {data.title}
        </div>
      )}
      <div className="w-full">
        <Renderer items={data.items} colors={colors} theme={theme} />
      </div>
      {data.caption && (
        <div className="text-[0.5em] opacity-50 italic leading-none" style={{ color: theme.textColor }}>
          {data.caption}
        </div>
      )}
    </div>
  );
});
