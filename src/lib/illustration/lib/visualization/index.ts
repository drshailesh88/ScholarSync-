/**
 * Visualization Library
 *
 * Provides comprehensive data visualization capabilities using Plotly.js.
 * Supports common scientific chart types with customizable styling.
 *
 * @module lib/visualization
 * @see https://plotly.com/javascript/
 */

import Plotly from 'plotly.js-dist-min';
import type { Data, Layout, Config, PlotlyHTMLElement } from 'plotly.js-dist-min';

// ============================================================================
// Types
// ============================================================================

/** Supported chart types */
export type ChartType =
  | 'line'
  | 'scatter'
  | 'bar'
  | 'pie'
  | 'heatmap'
  | 'box'
  | 'histogram'
  | 'area'
  | 'violin';

/** Color scheme presets */
export type ColorScheme =
  | 'scientific'
  | 'viridis'
  | 'plasma'
  | 'inferno'
  | 'blues'
  | 'reds'
  | 'greens'
  | 'grayscale'
  | 'categorical';

/** Chart styling options */
export interface ChartStyle {
  /** Color scheme for the chart */
  colorScheme?: ColorScheme;
  /** Custom colors array (overrides colorScheme) */
  colors?: string[];
  /** Font family for all text */
  fontFamily?: string;
  /** Font size for axis labels */
  fontSize?: number;
  /** Title font size */
  titleFontSize?: number;
  /** Background color */
  backgroundColor?: string;
  /** Grid line color */
  gridColor?: string;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Legend position */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Chart margins */
  margin?: { t?: number; b?: number; l?: number; r?: number };
}

/** Data series for charts */
export interface DataSeries {
  /** Series name (for legend) */
  name: string;
  /** X values */
  x: (number | string)[];
  /** Y values */
  y: number[];
  /** Optional error bars */
  error?: number[];
  /** Optional marker size */
  markerSize?: number;
  /** Optional line width */
  lineWidth?: number;
  /** Optional custom color */
  color?: string;
}

/** Heatmap data structure */
export interface HeatmapData {
  /** 2D array of values */
  z: number[][];
  /** X axis labels */
  x?: string[];
  /** Y axis labels */
  y?: string[];
  /** Color scale name */
  colorscale?: string;
  /** Show annotation values */
  showAnnotation?: boolean;
}

/** Pie chart data structure */
export interface PieData {
  /** Slice labels */
  labels: string[];
  /** Slice values */
  values: number[];
  /** Optional custom colors */
  colors?: string[];
  /** Show percentages */
  showPercent?: boolean;
  /** Hole size for donut chart (0-1) */
  hole?: number;
}

/** Box plot data structure */
export interface BoxPlotData {
  /** Group labels */
  labels: string[];
  /** Data arrays for each group */
  data: number[][];
  /** Optional custom colors */
  colors?: string[];
  /** Show individual points */
  showPoints?: boolean | 'all' | 'outliers' | 'suspectedoutliers';
}

/** Chart configuration */
export interface ChartConfig {
  /** Chart type */
  type: ChartType;
  /** Chart title */
  title?: string;
  /** X axis label */
  xAxisLabel?: string;
  /** Y axis label */
  yAxisLabel?: string;
  /** Chart width */
  width?: number;
  /** Chart height */
  height?: number;
  /** Chart styling options */
  style?: ChartStyle;
  /** X axis type */
  xAxisType?: 'linear' | 'log' | 'date' | 'category';
  /** Y axis type */
  yAxisType?: 'linear' | 'log' | 'date' | 'category';
  /** X axis range */
  xAxisRange?: [number, number];
  /** Y axis range */
  yAxisRange?: [number, number];
}

/** Generated chart result */
export interface ChartResult {
  /** The Plotly HTML element */
  element: PlotlyHTMLElement;
  /** SVG string representation */
  svg: string;
  /** Chart data */
  data: Data[];
  /** Chart layout */
  layout: Partial<Layout>;
}

// ============================================================================
// Constants
// ============================================================================

/** Default color schemes */
export const COLOR_SCHEMES: Record<ColorScheme, string[]> = {
  scientific: [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#22c55e', // Green
    '#f59e0b', // Amber
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
    '#ec4899', // Pink
    '#64748b', // Slate
  ],
  viridis: ['#440154', '#482878', '#3e4989', '#31688e', '#26828e', '#1f9e89', '#35b779', '#6ece58', '#b5de2b', '#fde725'],
  plasma: ['#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921'],
  inferno: ['#000004', '#1b0c41', '#4a0c6b', '#781c6d', '#a52c60', '#cf4446', '#ed6925', '#fb9b06', '#f7d13d', '#fcffa4'],
  blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
  reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
  greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
  grayscale: ['#000000', '#252525', '#525252', '#737373', '#969696', '#bdbdbd', '#d9d9d9', '#f0f0f0', '#ffffff'],
  categorical: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
};

/** Default chart style */
const DEFAULT_STYLE: Required<ChartStyle> = {
  colorScheme: 'scientific',
  colors: [],
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: 12,
  titleFontSize: 16,
  backgroundColor: 'transparent',
  gridColor: '#e5e7eb',
  showGrid: true,
  showLegend: true,
  legendPosition: 'top',
  margin: { t: 60, b: 60, l: 60, r: 40 },
};

/** Default Plotly config */
const DEFAULT_CONFIG: Partial<Config> = {
  responsive: true,
  displayModeBar: false,
  staticPlot: false,
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get colors for chart based on style configuration
 */
function getColors(style: ChartStyle, count: number): string[] {
  if (style.colors && style.colors.length > 0) {
    return style.colors;
  }
  const scheme = style.colorScheme || 'scientific';
  const schemeColors = COLOR_SCHEMES[scheme];
  // Repeat colors if needed
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(schemeColors[i % schemeColors.length]);
  }
  return result;
}

/**
 * Create base layout configuration
 */
function createBaseLayout(config: ChartConfig): Partial<Layout> {
  const style = { ...DEFAULT_STYLE, ...config.style };

  const layout: Partial<Layout> = {
    title: config.title
      ? {
          text: config.title,
          font: {
            family: style.fontFamily,
            size: style.titleFontSize,
            color: '#1f2937',
          },
        }
      : undefined,
    width: config.width || 600,
    height: config.height || 400,
    font: {
      family: style.fontFamily,
      size: style.fontSize,
      color: '#374151',
    },
    paper_bgcolor: style.backgroundColor,
    plot_bgcolor: style.backgroundColor,
    margin: style.margin,
    showlegend: style.showLegend,
  };

  // Configure legend position
  if (style.showLegend) {
    switch (style.legendPosition) {
      case 'top':
        layout.legend = { orientation: 'h', y: 1.1, x: 0.5, xanchor: 'center' };
        break;
      case 'bottom':
        layout.legend = { orientation: 'h', y: -0.2, x: 0.5, xanchor: 'center' };
        break;
      case 'left':
        layout.legend = { x: -0.15, y: 0.5, yanchor: 'middle' };
        break;
      case 'right':
        layout.legend = { x: 1.02, y: 0.5, yanchor: 'middle' };
        break;
    }
  }

  // Configure X axis
  layout.xaxis = {
    title: config.xAxisLabel
      ? {
          text: config.xAxisLabel,
          font: { family: style.fontFamily, size: style.fontSize },
        }
      : undefined,
    type: config.xAxisType,
    range: config.xAxisRange,
    showgrid: style.showGrid,
    gridcolor: style.gridColor,
    zeroline: false,
  };

  // Configure Y axis
  layout.yaxis = {
    title: config.yAxisLabel
      ? {
          text: config.yAxisLabel,
          font: { family: style.fontFamily, size: style.fontSize },
        }
      : undefined,
    type: config.yAxisType,
    range: config.yAxisRange,
    showgrid: style.showGrid,
    gridcolor: style.gridColor,
    zeroline: false,
  };

  return layout;
}

// ============================================================================
// Chart Creation Functions
// ============================================================================

/**
 * Create a line chart
 */
export function createLineChart(
  series: DataSeries[],
  config: Omit<ChartConfig, 'type'>
): { data: Data[]; layout: Partial<Layout> } {
  const style = { ...DEFAULT_STYLE, ...config.style };
  const colors = getColors(style, series.length);

  const data: Data[] = series.map((s, i) => ({
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: s.name,
    x: s.x,
    y: s.y,
    line: {
      color: s.color || colors[i],
      width: s.lineWidth || 2,
    },
    error_y: s.error
      ? {
          type: 'data' as const,
          array: s.error,
          visible: true,
          color: s.color || colors[i],
        }
      : undefined,
  }));

  return { data, layout: createBaseLayout({ ...config, type: 'line' }) };
}

/**
 * Create a scatter plot
 */
export function createScatterPlot(
  series: DataSeries[],
  config: Omit<ChartConfig, 'type'>
): { data: Data[]; layout: Partial<Layout> } {
  const style = { ...DEFAULT_STYLE, ...config.style };
  const colors = getColors(style, series.length);

  const data: Data[] = series.map((s, i) => ({
    type: 'scatter' as const,
    mode: 'markers' as const,
    name: s.name,
    x: s.x,
    y: s.y,
    marker: {
      color: s.color || colors[i],
      size: s.markerSize || 8,
    },
  }));

  return { data, layout: createBaseLayout({ ...config, type: 'scatter' }) };
}

/**
 * Create a bar chart
 */
export function createBarChart(
  series: DataSeries[],
  config: Omit<ChartConfig, 'type'> & { grouped?: boolean }
): { data: Data[]; layout: Partial<Layout> } {
  const style = { ...DEFAULT_STYLE, ...config.style };
  const colors = getColors(style, series.length);

  const data: Data[] = series.map((s, i) => ({
    type: 'bar' as const,
    name: s.name,
    x: s.x,
    y: s.y,
    marker: {
      color: s.color || colors[i],
    },
    error_y: s.error
      ? {
          type: 'data' as const,
          array: s.error,
          visible: true,
          color: '#374151',
        }
      : undefined,
  }));

  const layout = createBaseLayout({ ...config, type: 'bar' });
  layout.barmode = config.grouped === false ? 'stack' : 'group';

  return { data, layout };
}

/**
 * Create a pie chart
 */
export function createPieChart(
  pieData: PieData,
  config: Omit<ChartConfig, 'type'>
): { data: Data[]; layout: Partial<Layout> } {
  const style = { ...DEFAULT_STYLE, ...config.style };
  const colors = pieData.colors || getColors(style, pieData.labels.length);

  const data: Data[] = [
    {
      type: 'pie' as const,
      labels: pieData.labels,
      values: pieData.values,
      marker: {
        colors,
      },
      hole: pieData.hole || 0,
      textinfo: pieData.showPercent ? 'percent+label' : 'label',
      textposition: 'auto',
    },
  ];

  const layout = createBaseLayout({ ...config, type: 'pie' });
  // Remove axis labels for pie charts
  delete layout.xaxis;
  delete layout.yaxis;

  return { data, layout };
}

/**
 * Create a heatmap
 */
export function createHeatmap(
  heatmapData: HeatmapData,
  config: Omit<ChartConfig, 'type'>
): { data: Data[]; layout: Partial<Layout> } {
  const data: Data[] = [
    {
      type: 'heatmap' as const,
      z: heatmapData.z,
      x: heatmapData.x,
      y: heatmapData.y,
      colorscale: heatmapData.colorscale || 'Viridis',
      showscale: true,
    },
  ];

  const layout = createBaseLayout({ ...config, type: 'heatmap' });

  // Add annotations if requested
  if (heatmapData.showAnnotation) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const annotations: any[] = [];
    for (let i = 0; i < heatmapData.z.length; i++) {
      for (let j = 0; j < heatmapData.z[i].length; j++) {
        annotations.push({
          x: heatmapData.x ? heatmapData.x[j] : j,
          y: heatmapData.y ? heatmapData.y[i] : i,
          text: heatmapData.z[i][j].toFixed(2),
          showarrow: false,
          font: { color: 'white', size: 10 },
        });
      }
    }
    layout.annotations = annotations;
  }

  return { data, layout };
}

/**
 * Create a box plot
 */
export function createBoxPlot(
  boxData: BoxPlotData,
  config: Omit<ChartConfig, 'type'>
): { data: Data[]; layout: Partial<Layout> } {
  const style = { ...DEFAULT_STYLE, ...config.style };
  const colors = boxData.colors || getColors(style, boxData.labels.length);

  const data: Data[] = boxData.data.map((d, i) => ({
    type: 'box' as const,
    name: boxData.labels[i],
    y: d,
    marker: {
      color: colors[i],
    },
    boxpoints: boxData.showPoints || false,
  }));

  return { data, layout: createBaseLayout({ ...config, type: 'box' }) };
}

/**
 * Create a histogram
 */
export function createHistogram(
  values: number[],
  config: Omit<ChartConfig, 'type'> & { bins?: number; name?: string }
): { data: Data[]; layout: Partial<Layout> } {
  const style = { ...DEFAULT_STYLE, ...config.style };
  const colors = getColors(style, 1);

  const data: Data[] = [
    {
      type: 'histogram' as const,
      x: values,
      name: config.name || 'Distribution',
      marker: {
        color: colors[0],
      },
      nbinsx: config.bins,
    },
  ];

  return { data, layout: createBaseLayout({ ...config, type: 'histogram' }) };
}

/**
 * Create an area chart
 */
export function createAreaChart(
  series: DataSeries[],
  config: Omit<ChartConfig, 'type'> & { stacked?: boolean }
): { data: Data[]; layout: Partial<Layout> } {
  const style = { ...DEFAULT_STYLE, ...config.style };
  const colors = getColors(style, series.length);

  const data: Data[] = series.map((s, i) => ({
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: s.name,
    x: s.x,
    y: s.y,
    fill: i === 0 ? 'tozeroy' : 'tonexty',
    line: {
      color: s.color || colors[i],
      width: s.lineWidth || 2,
    },
    fillcolor: (s.color || colors[i]) + '40', // Add transparency
    stackgroup: config.stacked ? 'one' : undefined,
  }));

  return { data, layout: createBaseLayout({ ...config, type: 'area' }) };
}

/**
 * Create a violin plot
 */
export function createViolinPlot(
  boxData: BoxPlotData,
  config: Omit<ChartConfig, 'type'>
): { data: Data[]; layout: Partial<Layout> } {
  const style = { ...DEFAULT_STYLE, ...config.style };
  const colors = boxData.colors || getColors(style, boxData.labels.length);

  const data: Data[] = boxData.data.map((d, i) => ({
    type: 'violin' as const,
    name: boxData.labels[i],
    y: d,
    marker: {
      color: colors[i],
    },
    box: {
      visible: true,
    },
    meanline: {
      visible: true,
    },
    points: boxData.showPoints || false,
  }));

  return { data, layout: createBaseLayout({ ...config, type: 'violin' }) };
}

// ============================================================================
// Rendering Functions
// ============================================================================

/**
 * Render a chart to a container element
 */
export async function renderChart(
  container: HTMLElement,
  data: Data[],
  layout: Partial<Layout>,
  config: Partial<Config> = {}
): Promise<PlotlyHTMLElement> {
  return Plotly.newPlot(container, data, layout, {
    ...DEFAULT_CONFIG,
    ...config,
  }) as Promise<PlotlyHTMLElement>;
}

/**
 * Update an existing chart
 */
export async function updateChart(
  element: PlotlyHTMLElement,
  data: Data[],
  layout: Partial<Layout>
): Promise<PlotlyHTMLElement> {
  return Plotly.react(element, data, layout) as Promise<PlotlyHTMLElement>;
}

/**
 * Export chart as SVG string
 */
export async function chartToSvg(
  element: PlotlyHTMLElement,
  options?: { width?: number; height?: number }
): Promise<string> {
  const result = await Plotly.toImage(element, {
    format: 'svg',
    width: options?.width || 600,
    height: options?.height || 400,
  });

  // Convert data URL to SVG string
  const svgPrefix = 'data:image/svg+xml,';
  if (result.startsWith(svgPrefix)) {
    return decodeURIComponent(result.slice(svgPrefix.length));
  }

  // Handle base64 encoded SVG
  const base64Prefix = 'data:image/svg+xml;base64,';
  if (result.startsWith(base64Prefix)) {
    return atob(result.slice(base64Prefix.length));
  }

  return result;
}

/**
 * Export chart as PNG data URL
 */
export async function chartToPng(
  element: PlotlyHTMLElement,
  options?: { width?: number; height?: number; scale?: number }
): Promise<string> {
  return Plotly.toImage(element, {
    format: 'png',
    width: options?.width || 600,
    height: options?.height || 400,
    scale: options?.scale || 2,
  });
}

/**
 * Destroy a chart and clean up
 */
export function destroyChart(element: PlotlyHTMLElement): void {
  Plotly.purge(element);
}

// ============================================================================
// Data Parsing Utilities
// ============================================================================

/**
 * Parse CSV string into data series
 */
export function parseCSV(
  csv: string,
  options?: {
    delimiter?: string;
    hasHeader?: boolean;
    xColumn?: number;
    yColumns?: number[];
  }
): DataSeries[] {
  const delimiter = options?.delimiter || ',';
  const hasHeader = options?.hasHeader ?? true;
  const xColumn = options?.xColumn ?? 0;

  const lines = csv
    .trim()
    .split('\n')
    .map((line) => line.split(delimiter).map((cell) => cell.trim()));

  if (lines.length < 2) {
    return [];
  }

  const headers = hasHeader ? lines[0] : lines[0].map((_, i) => `Column ${i + 1}`);
  const dataLines = hasHeader ? lines.slice(1) : lines;

  // Determine Y columns
  const yColumns = options?.yColumns || headers.map((_, i) => i).filter((i) => i !== xColumn);

  return yColumns.map((yCol) => ({
    name: headers[yCol],
    x: dataLines.map((line) => {
      const val = line[xColumn];
      return isNaN(Number(val)) ? val : Number(val);
    }),
    y: dataLines.map((line) => Number(line[yCol]) || 0),
  }));
}

/**
 * Parse tab-separated values
 */
export function parseTSV(tsv: string, options?: Parameters<typeof parseCSV>[1]): DataSeries[] {
  return parseCSV(tsv, { ...options, delimiter: '\t' });
}

/**
 * Parse JSON data array
 */
export function parseJSON(
  json: string | object[],
  options: {
    xKey: string;
    yKey: string;
    nameKey?: string;
    groupBy?: string;
  }
): DataSeries[] {
  const data: object[] = typeof json === 'string' ? JSON.parse(json) : json;

  if (options.groupBy) {
    // Group data by a key
    const groups = new Map<string, { x: (number | string)[]; y: number[] }>();

    for (const item of data) {
      const groupValue = String((item as Record<string, unknown>)[options.groupBy] || 'Default');
      if (!groups.has(groupValue)) {
        groups.set(groupValue, { x: [], y: [] });
      }
      const group = groups.get(groupValue)!;
      group.x.push((item as Record<string, unknown>)[options.xKey] as number | string);
      group.y.push(Number((item as Record<string, unknown>)[options.yKey]) || 0);
    }

    return Array.from(groups.entries()).map(([name, { x, y }]) => ({
      name,
      x,
      y,
    }));
  }

  // Single series
  return [
    {
      name: options.nameKey
        ? String((data[0] as Record<string, unknown>)?.[options.nameKey] || 'Data')
        : 'Data',
      x: data.map((item) => (item as Record<string, unknown>)[options.xKey] as number | string),
      y: data.map((item) => Number((item as Record<string, unknown>)[options.yKey]) || 0),
    },
  ];
}

// ============================================================================
// Exports
// ============================================================================

export { Plotly };
export type { Data, Layout, Config, PlotlyHTMLElement };

// Canvas utilities for Fabric.js integration
export {
  insertChartAsImage,
  insertChartAsSvg,
  createChartImage,
  downloadChart,
  updateChartOnCanvas,
  svgToFabricImage,
  pngToFabricImage,
  type ChartInsertOptions,
  type ChartCanvasObject,
} from './canvas-utils';
