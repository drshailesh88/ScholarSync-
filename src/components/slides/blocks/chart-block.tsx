"use client";

import { memo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  FunnelChart,
  Funnel,
  LabelList,
  Treemap,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
import type { ChartData, ThemeConfig } from "@/types/presentation";

interface ChartBlockProps {
  data: ChartData;
  theme: ThemeConfig;
}

function renderPieLabel(props: PieLabelRenderProps): string {
  const name = String(props.name ?? "");
  const percent = typeof props.percent === "number" ? props.percent : 0;
  return `${name} ${(percent * 100).toFixed(0)}%`;
}

const CHART_PALETTE = [
  "#4F46E5", "#06B6D4", "#10B981", "#F59E0B",
  "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6",
];

function getChartColor(index: number, theme: ThemeConfig): string {
  if (index === 0) return theme.primaryColor;
  if (index === 1) return theme.accentColor;
  return CHART_PALETTE[index % CHART_PALETTE.length];
}

export const ChartBlock = memo(function ChartBlock({ data, theme }: ChartBlockProps) {
  if (!data.datasets || data.datasets.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-[0.7em] opacity-40">
        No chart data
      </div>
    );
  }

  // Transform to Recharts format
  const chartData = data.labels.map((label, i) => {
    const point: Record<string, string | number> = { name: label };
    data.datasets.forEach((ds) => {
      point[ds.label] = ds.data[i] ?? 0;
    });
    return point;
  });

  const commonProps = {
    data: chartData,
    margin: { top: 5, right: 20, left: 10, bottom: 5 },
  };

  return (
    <div className="w-full h-full flex flex-col">
      {data.title && (
        <div
          className="text-[0.7em] font-semibold text-center mb-[0.3em]"
          style={{ color: theme.textColor }}
        >
          {data.title}
        </div>
      )}
      <div className="flex-1 min-h-0">
        {data.chartType === "forest_plot" || data.chartType === "gauge" ? (
          renderChart(data, commonProps, theme)
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {renderChart(data, commonProps, theme)}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// Waterfall data transformation
// ---------------------------------------------------------------------------

export function buildWaterfallData(
  labels: string[],
  values: number[]
): { name: string; base: number; value: number; total: number; isTotal: boolean }[] {
  const result: { name: string; base: number; value: number; total: number; isTotal: boolean }[] = [];
  let cumulative = 0;

  for (let i = 0; i < labels.length; i++) {
    const v = values[i] ?? 0;
    if (i === labels.length - 1) {
      // Final bar = total
      result.push({ name: labels[i], base: 0, value: cumulative + v, total: cumulative + v, isTotal: true });
    } else {
      const base = v >= 0 ? cumulative : cumulative + v;
      result.push({ name: labels[i], base, value: Math.abs(v), total: cumulative + v, isTotal: false });
      cumulative += v;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Gauge arc helper
// ---------------------------------------------------------------------------

export function describeArc(
  cx: number, cy: number, r: number, startAngle: number, endAngle: number
): string {
  const startRad = (Math.PI * startAngle) / 180;
  const endRad = (Math.PI * endAngle) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

// ---------------------------------------------------------------------------
// Custom Treemap content renderer
// ---------------------------------------------------------------------------

interface TreemapContentProps {
  x: number;
  y: number;
  width: number;
  height: number;
  name?: string;
  color?: string;
}

function TreemapContent({ x, y, width, height, name, color }: TreemapContentProps) {
  if (width < 20 || height < 20) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} stroke="#fff" strokeWidth={2} />
      {width > 40 && height > 20 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={Math.min(12, width / 6)}
          fill="#fff"
        >
          {String(name ?? "").slice(0, Math.floor(width / 7))}
        </text>
      )}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Main render function
// ---------------------------------------------------------------------------

function renderChart(
  data: ChartData,
  commonProps: { data: Record<string, string | number>[]; margin: Record<string, number> },
  theme: ThemeConfig
): React.ReactElement {
  const axisStyle = { fontSize: "0.6em", fill: theme.textColor };

  switch (data.chartType) {
    case "bar":
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.borderColor ?? "#e5e7eb"} />
          <XAxis dataKey="name" tick={axisStyle} label={data.xAxisLabel ? { value: data.xAxisLabel, position: "bottom", style: axisStyle } : undefined} />
          <YAxis tick={axisStyle} label={data.yAxisLabel ? { value: data.yAxisLabel, angle: -90, position: "left", style: axisStyle } : undefined} />
          <Tooltip />
          {data.showLegend !== false && <Legend wrapperStyle={{ fontSize: "0.6em" }} />}
          {data.datasets.map((ds, i) => (
            <Bar key={ds.label} dataKey={ds.label} fill={ds.color ?? getChartColor(i, theme)} />
          ))}
        </BarChart>
      );

    case "line":
      return (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.borderColor ?? "#e5e7eb"} />
          <XAxis dataKey="name" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip />
          {data.showLegend !== false && <Legend wrapperStyle={{ fontSize: "0.6em" }} />}
          {data.datasets.map((ds, i) => (
            <Line key={ds.label} type="monotone" dataKey={ds.label} stroke={ds.color ?? getChartColor(i, theme)} strokeWidth={2} dot={{ r: 3 }} />
          ))}
        </LineChart>
      );

    case "pie": {
      const pieData = data.labels.map((label, i) => ({
        name: label,
        value: data.datasets[0]?.data[i] ?? 0,
      }));
      return (
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            dataKey="value"
            label={renderPieLabel}
            labelLine={false}
            style={{ fontSize: "0.5em" }}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={getChartColor(i, theme)} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    }

    case "donut": {
      const donutData = data.labels.map((label, i) => ({
        name: label,
        value: data.datasets[0]?.data[i] ?? 0,
      }));
      const total = donutData.reduce((s, d) => s + d.value, 0);
      return (
        <PieChart>
          <Pie
            data={donutData}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            dataKey="value"
            label={renderPieLabel}
            labelLine={false}
            style={{ fontSize: "0.5em" }}
          >
            {donutData.map((_, i) => (
              <Cell key={i} fill={getChartColor(i, theme)} />
            ))}
          </Pie>
          <Tooltip />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="1.2em" fill={theme.textColor}>
            {total}
          </text>
        </PieChart>
      );
    }

    case "scatter":
      return (
        <ScatterChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.borderColor ?? "#e5e7eb"} />
          <XAxis dataKey="name" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip />
          {data.datasets.map((ds, i) => (
            <Scatter key={ds.label} name={ds.label} data={commonProps.data} fill={ds.color ?? getChartColor(i, theme)} />
          ))}
        </ScatterChart>
      );

    case "area":
      return (
        <AreaChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.borderColor ?? "#e5e7eb"} />
          <XAxis dataKey="name" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip />
          {data.showLegend !== false && <Legend wrapperStyle={{ fontSize: "0.6em" }} />}
          {data.datasets.map((ds, i) => (
            <Area key={ds.label} type="monotone" dataKey={ds.label} fill={ds.color ?? getChartColor(i, theme)} fillOpacity={0.3} stroke={ds.color ?? getChartColor(i, theme)} />
          ))}
        </AreaChart>
      );

    case "radar": {
      return (
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={commonProps.data}>
          <PolarGrid stroke={theme.borderColor ?? "#e5e7eb"} />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: "0.5em", fill: theme.textColor }} />
          <PolarRadiusAxis tick={{ fontSize: "0.5em" }} />
          {data.datasets.map((ds, i) => (
            <Radar key={ds.label} name={ds.label} dataKey={ds.label} stroke={ds.color ?? getChartColor(i, theme)} fill={ds.color ?? getChartColor(i, theme)} fillOpacity={0.2} />
          ))}
          {data.showLegend !== false && <Legend wrapperStyle={{ fontSize: "0.6em" }} />}
        </RadarChart>
      );
    }

    case "stacked_bar":
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.borderColor ?? "#e5e7eb"} />
          <XAxis dataKey="name" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip />
          {data.showLegend !== false && <Legend wrapperStyle={{ fontSize: "0.6em" }} />}
          {data.datasets.map((ds, i) => (
            <Bar key={ds.label} dataKey={ds.label} stackId="stack" fill={ds.color ?? getChartColor(i, theme)} />
          ))}
        </BarChart>
      );

    case "funnel": {
      const funnelData = data.labels.map((label, i) => ({
        name: label,
        value: data.datasets[0]?.data[i] ?? 0,
        fill: getChartColor(i, theme),
      }));
      return (
        <FunnelChart>
          <Tooltip />
          <Funnel dataKey="value" data={funnelData} isAnimationActive={false}>
            <LabelList position="center" fill="#fff" fontSize="0.6em" dataKey="name" />
          </Funnel>
        </FunnelChart>
      );
    }

    case "waterfall": {
      const values = data.datasets[0]?.data ?? [];
      const wfData = buildWaterfallData(data.labels, values);
      return (
        <BarChart data={wfData} margin={commonProps.margin}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.borderColor ?? "#e5e7eb"} />
          <XAxis dataKey="name" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip />
          <Bar dataKey="base" stackId="waterfall" fill="transparent" />
          <Bar dataKey="value" stackId="waterfall">
            {wfData.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.isTotal ? "#3B82F6" : entry.total >= (i > 0 ? wfData[i - 1]?.total ?? 0 : 0) ? "#10B981" : "#EF4444"}
              />
            ))}
          </Bar>
        </BarChart>
      );
    }

    case "treemap": {
      const treemapData = data.labels.map((label, i) => ({
        name: label,
        size: data.datasets[0]?.data[i] ?? 0,
        color: getChartColor(i, theme),
      }));
      return (
        <Treemap
          data={treemapData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={<TreemapContent x={0} y={0} width={0} height={0} />}
        >
          <Tooltip />
        </Treemap>
      );
    }

    case "gauge": {
      // Custom SVG gauge — rendered outside ResponsiveContainer
      const value = data.datasets[0]?.data[0] ?? 0;
      const max = data.datasets[0]?.data[1] ?? 100;
      const pct = Math.min(Math.max(value / max, 0), 1);
      const cx = 150, cy = 130, r = 100;

      // Arc from 180° (left) to 0° (right) — we go counter-clockwise in SVG coords
      // SVG: 180° = left, 0° = right, so the arc spans from PI to 0
      const startAngle = 180;
      const endAngle = 0;
      const needleAngle = startAngle - pct * (startAngle - endAngle);
      const needleRad = (Math.PI * needleAngle) / 180;

      const gaugeColor = pct < 0.33 ? "#EF4444" : pct < 0.66 ? "#F59E0B" : "#10B981";

      return (
        <svg viewBox="0 0 300 180" className="w-full h-full" data-testid="gauge-svg">
          <title>{`${data.datasets[0]?.label ?? "Value"}: ${value} / ${max}`}</title>
          {/* Background arc */}
          <path d={describeArc(cx, cy, r, endAngle, startAngle)} fill="none" stroke="#e5e7eb" strokeWidth={20} strokeLinecap="round" />
          {/* Value arc */}
          {pct > 0 && (
            <path d={describeArc(cx, cy, r, startAngle - pct * 180, startAngle)} fill="none" stroke={gaugeColor} strokeWidth={20} strokeLinecap="round">
              <title>{`${value} / ${max} (${(pct * 100).toFixed(0)}%)`}</title>
            </path>
          )}
          {/* Needle */}
          <line
            x1={cx} y1={cy}
            x2={cx + (r - 15) * Math.cos(needleRad)}
            y2={cy - (r - 15) * Math.abs(Math.sin(needleRad))}
            stroke={theme.textColor} strokeWidth={2}
          />
          <circle cx={cx} cy={cy} r={4} fill={theme.textColor} />
          {/* Value label */}
          <text x={cx} y={cy + 25} textAnchor="middle" fontSize="24" fontWeight="bold" fill={theme.textColor}>
            {value}
          </text>
          <text x={cx} y={cy + 42} textAnchor="middle" fontSize="12" fill={theme.textColor} opacity={0.6}>
            / {max}
          </text>
        </svg>
      );
    }

    case "forest_plot": {
      // Custom SVG forest plot for meta-analysis
      // datasets[0] = point estimates, datasets[1] = CI lower, datasets[2] = CI upper
      const estimates = data.datasets[0]?.data ?? [];
      const ciLower = data.datasets[1]?.data ?? [];
      const ciUpper = data.datasets[2]?.data ?? [];
      const studies = data.labels;

      const rowHeight = 28;
      const topMargin = 30;
      const leftLabelWidth = 120;
      const plotWidth = 200;
      const rightLabelWidth = 100;
      const totalWidth = leftLabelWidth + plotWidth + rightLabelWidth;
      const totalHeight = topMargin + (studies.length + 1) * rowHeight + 10;

      // Determine range
      const allVals = [...estimates, ...ciLower, ...ciUpper].filter((v) => v != null);
      const dataMin = Math.min(...allVals);
      const dataMax = Math.max(...allVals);
      const padding = (dataMax - dataMin) * 0.2 || 1;
      const rangeMin = dataMin - padding;
      const rangeMax = dataMax + padding;

      // Null line: 1.0 for odds ratios (all positive), 0 for mean differences
      const nullValue = dataMin >= 0 ? 1.0 : 0;
      const toX = (v: number) => leftLabelWidth + ((v - rangeMin) / (rangeMax - rangeMin)) * plotWidth;

      return (
        <svg viewBox={`0 0 ${totalWidth} ${totalHeight}`} className="w-full h-full" data-testid="forest-plot-svg">
          {/* Header */}
          <text x={leftLabelWidth / 2} y={18} textAnchor="middle" fontSize="10" fontWeight="bold" fill={theme.textColor}>Study</text>
          <text x={leftLabelWidth + plotWidth / 2} y={18} textAnchor="middle" fontSize="10" fontWeight="bold" fill={theme.textColor}>Effect Size</text>
          <text x={leftLabelWidth + plotWidth + rightLabelWidth / 2} y={18} textAnchor="middle" fontSize="10" fontWeight="bold" fill={theme.textColor}>ES [95% CI]</text>

          {/* Null effect line */}
          <line
            x1={toX(nullValue)} y1={topMargin}
            x2={toX(nullValue)} y2={topMargin + studies.length * rowHeight}
            stroke={theme.textColor} strokeWidth={1} strokeDasharray="4 2" opacity={0.5}
            data-testid="null-line"
          />

          {/* Study rows */}
          {studies.map((study, i) => {
            const y = topMargin + i * rowHeight + rowHeight / 2;
            const est = estimates[i] ?? 0;
            const lo = ciLower[i] ?? est;
            const hi = ciUpper[i] ?? est;

            return (
              <g key={i} data-testid={`study-row-${i}`}>
                <title>{`${study}: ${est.toFixed(2)} [${lo.toFixed(2)}, ${hi.toFixed(2)}]`}</title>
                {/* Study name */}
                <text x={leftLabelWidth - 8} y={y + 4} textAnchor="end" fontSize="9" fill={theme.textColor}>
                  {study}
                </text>
                {/* CI line */}
                <line x1={toX(lo)} y1={y} x2={toX(hi)} y2={y} stroke={theme.primaryColor} strokeWidth={2} data-testid={`ci-line-${i}`} />
                {/* Point estimate */}
                <rect
                  x={toX(est) - 4} y={y - 4} width={8} height={8}
                  fill={theme.primaryColor}
                  data-testid={`point-estimate-${i}`}
                />
                {/* Numeric values */}
                <text x={leftLabelWidth + plotWidth + 8} y={y + 4} fontSize="8" fill={theme.textColor}>
                  {est.toFixed(2)} [{lo.toFixed(2)}, {hi.toFixed(2)}]
                </text>
              </g>
            );
          })}

          {/* Pooled estimate diamond */}
          {studies.length > 0 && (() => {
            const poolY = topMargin + studies.length * rowHeight + rowHeight / 2;
            const poolEst = estimates[estimates.length - 1] ?? 0;
            const poolLo = ciLower[ciLower.length - 1] ?? poolEst;
            const poolHi = ciUpper[ciUpper.length - 1] ?? poolEst;
            const dh = 8;
            return (
              <g data-testid="pooled-diamond">
                <text x={leftLabelWidth - 8} y={poolY + 4} textAnchor="end" fontSize="9" fontWeight="bold" fill={theme.textColor}>
                  Overall
                </text>
                <polygon
                  points={`${toX(poolLo)},${poolY} ${toX(poolEst)},${poolY - dh} ${toX(poolHi)},${poolY} ${toX(poolEst)},${poolY + dh}`}
                  fill={theme.accentColor}
                />
                <text x={leftLabelWidth + plotWidth + 8} y={poolY + 4} fontSize="8" fontWeight="bold" fill={theme.textColor}>
                  {poolEst.toFixed(2)} [{poolLo.toFixed(2)}, {poolHi.toFixed(2)}]
                </text>
              </g>
            );
          })()}
        </svg>
      );
    }

    default:
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip />
          {data.datasets.map((ds, i) => (
            <Bar key={ds.label} dataKey={ds.label} fill={ds.color ?? getChartColor(i, theme)} />
          ))}
        </BarChart>
      );
  }
}
