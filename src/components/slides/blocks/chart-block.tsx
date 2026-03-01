"use client";

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

export function ChartBlock({ data, theme }: ChartBlockProps) {
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
        <ResponsiveContainer width="100%" height="100%">
          {renderChart(data, commonProps, theme)}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function renderChart(
  data: ChartData,
  commonProps: { data: Record<string, string | number>[]; margin: Record<string, number> },
  theme: ThemeConfig
) {
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
