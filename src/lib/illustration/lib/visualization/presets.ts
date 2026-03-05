/**
 * Scientific Chart Presets
 *
 * Pre-configured chart settings for common scientific visualization needs.
 * These presets provide sensible defaults for research data visualization.
 *
 * @module lib/visualization/presets
 */

import type { Data, Layout } from 'plotly.js-dist-min';
import {
  createLineChart,
  createScatterPlot,
  createBarChart,
  createHeatmap,
  type ChartConfig,
  type ChartStyle,
  type DataSeries,
  type HeatmapData,
} from './index';

// ============================================================================
// Types
// ============================================================================

/** Available preset types */
export type PresetType =
  | 'gene-expression-heatmap'
  | 'kaplan-meier'
  | 'dose-response'
  | 'western-blot'
  | 'flow-cytometry'
  | 'time-series'
  | 'bar-with-error'
  | 'correlation-matrix'
  | 'volcano-plot'
  | 'growth-curve'
  | 'elisa-standard'
  | 'cell-viability';

/** Preset information */
export interface PresetInfo {
  id: PresetType;
  name: string;
  description: string;
  category: 'molecular' | 'clinical' | 'cell-biology' | 'statistics' | 'general';
  sampleData: () => unknown;
}

// ============================================================================
// Preset Configurations
// ============================================================================

/** Scientific style preset */
const SCIENTIFIC_STYLE: ChartStyle = {
  colorScheme: 'scientific',
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: 11,
  titleFontSize: 14,
  backgroundColor: 'white',
  gridColor: '#e5e7eb',
  showGrid: true,
  showLegend: true,
  legendPosition: 'top',
  margin: { t: 60, b: 70, l: 70, r: 40 },
};

/** Publication-ready style */
const PUBLICATION_STYLE: ChartStyle = {
  colorScheme: 'grayscale',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: 10,
  titleFontSize: 12,
  backgroundColor: 'white',
  gridColor: '#cccccc',
  showGrid: true,
  showLegend: true,
  legendPosition: 'right',
  margin: { t: 50, b: 60, l: 60, r: 100 },
};

// ============================================================================
// Gene Expression Heatmap
// ============================================================================

export interface GeneExpressionData {
  genes: string[];
  samples: string[];
  expression: number[][];
  showAnnotation?: boolean;
}

/**
 * Create a gene expression heatmap
 * Common in RNA-seq and microarray analysis
 */
export function createGeneExpressionHeatmap(
  geneData: GeneExpressionData,
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const heatmapData: HeatmapData = {
    z: geneData.expression,
    x: geneData.samples,
    y: geneData.genes,
    colorscale: 'RdBu',
    showAnnotation: geneData.showAnnotation,
  };

  return createHeatmap(heatmapData, {
    title: config?.title || 'Gene Expression Heatmap',
    xAxisLabel: config?.xAxisLabel || 'Samples',
    yAxisLabel: config?.yAxisLabel || 'Genes',
    width: config?.width || 700,
    height: config?.height || 500,
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
  });
}

/** Sample gene expression data */
export function sampleGeneExpressionData(): GeneExpressionData {
  return {
    genes: ['TP53', 'BRCA1', 'EGFR', 'MYC', 'KRAS', 'AKT1', 'PIK3CA', 'PTEN'],
    samples: ['Control 1', 'Control 2', 'Treatment 1', 'Treatment 2', 'Treatment 3'],
    expression: [
      [0.5, 0.6, 2.1, 2.3, 2.0],
      [1.2, 1.1, 0.3, 0.4, 0.2],
      [0.8, 0.7, 3.2, 3.5, 3.1],
      [1.5, 1.4, 0.8, 0.7, 0.9],
      [0.3, 0.4, 1.8, 1.9, 2.1],
      [2.0, 2.1, 0.5, 0.4, 0.6],
      [1.0, 1.1, 2.5, 2.4, 2.6],
      [0.9, 0.8, 0.2, 0.3, 0.1],
    ],
    showAnnotation: false,
  };
}

// ============================================================================
// Kaplan-Meier Survival Curve
// ============================================================================

export interface SurvivalData {
  time: number[];
  survival: number[];
  name: string;
  censored?: number[];
}

/**
 * Create a Kaplan-Meier survival curve
 * Used for clinical trial and survival analysis
 */
export function createKaplanMeierCurve(
  groups: SurvivalData[],
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const series: DataSeries[] = groups.map((g) => ({
    name: g.name,
    x: g.time,
    y: g.survival.map((s) => s * 100),
  }));

  const result = createLineChart(series, {
    title: config?.title || 'Kaplan-Meier Survival Curve',
    xAxisLabel: config?.xAxisLabel || 'Time (months)',
    yAxisLabel: config?.yAxisLabel || 'Survival Probability (%)',
    width: config?.width || 600,
    height: config?.height || 400,
    yAxisRange: [0, 105],
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
  });

  // Add step mode for survival curves
  result.data.forEach((trace) => {
    if ('line' in trace) {
      (trace as { line: { shape: string } }).line.shape = 'hv';
    }
  });

  return result;
}

/** Sample Kaplan-Meier data */
export function sampleKaplanMeierData(): SurvivalData[] {
  return [
    {
      name: 'Treatment Group',
      time: [0, 3, 6, 9, 12, 15, 18, 21, 24],
      survival: [1.0, 0.95, 0.88, 0.82, 0.75, 0.70, 0.65, 0.62, 0.60],
    },
    {
      name: 'Control Group',
      time: [0, 3, 6, 9, 12, 15, 18, 21, 24],
      survival: [1.0, 0.90, 0.78, 0.65, 0.52, 0.42, 0.35, 0.30, 0.25],
    },
  ];
}

// ============================================================================
// Dose-Response Curve
// ============================================================================

export interface DoseResponseData {
  doses: number[];
  response: number[];
  error?: number[];
  name: string;
}

/**
 * Create a dose-response curve
 * Common in pharmacology and toxicology studies
 */
export function createDoseResponseCurve(
  compounds: DoseResponseData[],
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const series: DataSeries[] = compounds.map((c) => ({
    name: c.name,
    x: c.doses,
    y: c.response,
    error: c.error,
    markerSize: 8,
    lineWidth: 2,
  }));

  return createLineChart(series, {
    title: config?.title || 'Dose-Response Curve',
    xAxisLabel: config?.xAxisLabel || 'Concentration (nM)',
    yAxisLabel: config?.yAxisLabel || 'Response (%)',
    xAxisType: 'log',
    width: config?.width || 600,
    height: config?.height || 400,
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
  });
}

/** Sample dose-response data */
export function sampleDoseResponseData(): DoseResponseData[] {
  return [
    {
      name: 'Compound A',
      doses: [0.1, 1, 10, 100, 1000, 10000],
      response: [5, 15, 45, 78, 92, 95],
      error: [2, 4, 6, 5, 3, 2],
    },
    {
      name: 'Compound B',
      doses: [0.1, 1, 10, 100, 1000, 10000],
      response: [3, 8, 25, 55, 75, 82],
      error: [2, 3, 5, 6, 4, 3],
    },
  ];
}

// ============================================================================
// Western Blot Quantification
// ============================================================================

export interface WesternBlotData {
  conditions: string[];
  intensity: number[];
  error?: number[];
  normalized?: boolean;
}

/**
 * Create a Western blot quantification bar chart
 * Used for protein expression analysis
 */
export function createWesternBlotChart(
  proteins: { name: string; data: WesternBlotData }[],
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const series: DataSeries[] = proteins.map((p) => ({
    name: p.name,
    x: p.data.conditions,
    y: p.data.intensity,
    error: p.data.error,
  }));

  return createBarChart(series, {
    title: config?.title || 'Western Blot Quantification',
    xAxisLabel: config?.xAxisLabel || 'Condition',
    yAxisLabel:
      config?.yAxisLabel || (proteins[0]?.data.normalized ? 'Relative Expression' : 'Band Intensity (AU)'),
    width: config?.width || 500,
    height: config?.height || 400,
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
    grouped: true,
  });
}

/** Sample Western blot data */
export function sampleWesternBlotData(): { name: string; data: WesternBlotData }[] {
  return [
    {
      name: 'p53',
      data: {
        conditions: ['Control', 'Treatment 1h', 'Treatment 4h', 'Treatment 24h'],
        intensity: [1.0, 1.8, 2.5, 1.2],
        error: [0.1, 0.2, 0.3, 0.15],
        normalized: true,
      },
    },
    {
      name: 'p21',
      data: {
        conditions: ['Control', 'Treatment 1h', 'Treatment 4h', 'Treatment 24h'],
        intensity: [1.0, 1.2, 3.2, 2.8],
        error: [0.12, 0.18, 0.25, 0.22],
        normalized: true,
      },
    },
  ];
}

// ============================================================================
// Flow Cytometry Scatter Plot
// ============================================================================

export interface FlowCytometryData {
  populations: {
    name: string;
    x: number[];
    y: number[];
    color?: string;
  }[];
  xMarker: string;
  yMarker: string;
}

/**
 * Create a flow cytometry scatter plot
 * Common in immunology and cell biology
 */
export function createFlowCytometryPlot(
  flowData: FlowCytometryData,
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const series: DataSeries[] = flowData.populations.map((p) => ({
    name: p.name,
    x: p.x,
    y: p.y,
    color: p.color,
    markerSize: 4,
  }));

  const result = createScatterPlot(series, {
    title: config?.title || 'Flow Cytometry Analysis',
    xAxisLabel: config?.xAxisLabel || flowData.xMarker,
    yAxisLabel: config?.yAxisLabel || flowData.yMarker,
    xAxisType: 'log',
    yAxisType: 'log',
    width: config?.width || 500,
    height: config?.height || 500,
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
  });

  // Add quadrant lines
  result.layout.shapes = [
    {
      type: 'line',
      x0: 100,
      x1: 100,
      y0: 1,
      y1: 100000,
      line: { color: '#666', dash: 'dash', width: 1 },
    },
    {
      type: 'line',
      x0: 1,
      x1: 100000,
      y0: 100,
      y1: 100,
      line: { color: '#666', dash: 'dash', width: 1 },
    },
  ];

  return result;
}

/** Sample flow cytometry data */
export function sampleFlowCytometryData(): FlowCytometryData {
  const generateCluster = (cx: number, cy: number, n: number, spread: number): { x: number[]; y: number[] } => {
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i < n; i++) {
      x.push(cx * Math.exp((Math.random() - 0.5) * spread));
      y.push(cy * Math.exp((Math.random() - 0.5) * spread));
    }
    return { x, y };
  };

  const q1 = generateCluster(30, 30, 200, 1.5);
  const q2 = generateCluster(500, 30, 150, 1.2);
  const q3 = generateCluster(30, 500, 100, 1.3);
  const q4 = generateCluster(500, 500, 50, 1.0);

  return {
    xMarker: 'CD4-FITC',
    yMarker: 'CD8-PE',
    populations: [
      { name: 'CD4-CD8-', ...q1, color: '#94a3b8' },
      { name: 'CD4+CD8-', ...q2, color: '#3b82f6' },
      { name: 'CD4-CD8+', ...q3, color: '#22c55e' },
      { name: 'CD4+CD8+', ...q4, color: '#f59e0b' },
    ],
  };
}

// ============================================================================
// Time Series Data
// ============================================================================

export interface TimeSeriesData {
  name: string;
  times: (number | string | Date)[];
  values: number[];
  error?: number[];
}

/**
 * Create a time series chart
 * General purpose for any temporal data
 */
export function createTimeSeriesChart(
  series: TimeSeriesData[],
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const dataSeries: DataSeries[] = series.map((s) => ({
    name: s.name,
    x: s.times.map((t) => (t instanceof Date ? t.toISOString() : t)),
    y: s.values,
    error: s.error,
    lineWidth: 2,
  }));

  return createLineChart(dataSeries, {
    title: config?.title || 'Time Series',
    xAxisLabel: config?.xAxisLabel || 'Time',
    yAxisLabel: config?.yAxisLabel || 'Value',
    xAxisType: config?.xAxisType || 'date',
    width: config?.width || 700,
    height: config?.height || 400,
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
  });
}

/** Sample time series data */
export function sampleTimeSeriesData(): TimeSeriesData[] {
  const times = Array.from({ length: 24 }, (_, i) => `2024-01-${String(i + 1).padStart(2, '0')}`);
  return [
    {
      name: 'Experiment A',
      times,
      values: times.map((_, i) => 10 + Math.sin(i / 3) * 5 + Math.random() * 2),
      error: times.map(() => 0.5 + Math.random() * 0.5),
    },
    {
      name: 'Experiment B',
      times,
      values: times.map((_, i) => 8 + Math.cos(i / 3) * 4 + Math.random() * 2),
      error: times.map(() => 0.4 + Math.random() * 0.4),
    },
  ];
}

// ============================================================================
// Bar Chart with Error Bars
// ============================================================================

export interface BarWithErrorData {
  groups: string[];
  series: {
    name: string;
    values: number[];
    error: number[];
  }[];
}

/**
 * Create a bar chart with error bars
 * Common for statistical comparisons
 */
export function createBarWithErrorChart(
  barData: BarWithErrorData,
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const series: DataSeries[] = barData.series.map((s) => ({
    name: s.name,
    x: barData.groups,
    y: s.values,
    error: s.error,
  }));

  return createBarChart(series, {
    title: config?.title || 'Statistical Comparison',
    xAxisLabel: config?.xAxisLabel || 'Group',
    yAxisLabel: config?.yAxisLabel || 'Value',
    width: config?.width || 500,
    height: config?.height || 400,
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
    grouped: true,
  });
}

/** Sample bar with error data */
export function sampleBarWithErrorData(): BarWithErrorData {
  return {
    groups: ['Control', 'Low Dose', 'Medium Dose', 'High Dose'],
    series: [
      {
        name: 'Cell Line A',
        values: [100, 85, 62, 35],
        error: [8, 10, 7, 5],
      },
      {
        name: 'Cell Line B',
        values: [100, 92, 78, 55],
        error: [6, 9, 8, 7],
      },
    ],
  };
}

// ============================================================================
// Volcano Plot
// ============================================================================

export interface VolcanoPlotData {
  genes: string[];
  log2FoldChange: number[];
  negLog10PValue: number[];
  significant?: boolean[];
}

/**
 * Create a volcano plot
 * Used for differential expression analysis
 */
export function createVolcanoPlot(
  volcanoData: VolcanoPlotData,
  config?: Partial<ChartConfig> & { fcThreshold?: number; pThreshold?: number }
): { data: Data[]; layout: Partial<Layout> } {
  const fcThreshold = config?.fcThreshold || 1;
  const pThreshold = config?.pThreshold || 1.3; // -log10(0.05)

  const significant =
    volcanoData.significant ||
    volcanoData.log2FoldChange.map(
      (fc, i) => Math.abs(fc) >= fcThreshold && volcanoData.negLog10PValue[i] >= pThreshold
    );

  // Separate significant and non-significant points
  const sigUp: DataSeries = { name: 'Upregulated', x: [], y: [], markerSize: 6, color: '#ef4444' };
  const sigDown: DataSeries = { name: 'Downregulated', x: [], y: [], markerSize: 6, color: '#3b82f6' };
  const notSig: DataSeries = { name: 'Not Significant', x: [], y: [], markerSize: 4, color: '#9ca3af' };

  volcanoData.log2FoldChange.forEach((fc, i) => {
    const pval = volcanoData.negLog10PValue[i];
    if (significant[i]) {
      if (fc > 0) {
        sigUp.x.push(fc);
        sigUp.y.push(pval);
      } else {
        sigDown.x.push(fc);
        sigDown.y.push(pval);
      }
    } else {
      notSig.x.push(fc);
      notSig.y.push(pval);
    }
  });

  const result = createScatterPlot([notSig, sigDown, sigUp], {
    title: config?.title || 'Volcano Plot',
    xAxisLabel: config?.xAxisLabel || 'log2(Fold Change)',
    yAxisLabel: config?.yAxisLabel || '-log10(p-value)',
    width: config?.width || 600,
    height: config?.height || 500,
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
  });

  // Add threshold lines
  result.layout.shapes = [
    {
      type: 'line',
      x0: -fcThreshold,
      x1: -fcThreshold,
      y0: 0,
      y1: Math.max(...volcanoData.negLog10PValue) * 1.1,
      line: { color: '#666', dash: 'dash', width: 1 },
    },
    {
      type: 'line',
      x0: fcThreshold,
      x1: fcThreshold,
      y0: 0,
      y1: Math.max(...volcanoData.negLog10PValue) * 1.1,
      line: { color: '#666', dash: 'dash', width: 1 },
    },
    {
      type: 'line',
      x0: Math.min(...volcanoData.log2FoldChange) * 1.1,
      x1: Math.max(...volcanoData.log2FoldChange) * 1.1,
      y0: pThreshold,
      y1: pThreshold,
      line: { color: '#666', dash: 'dash', width: 1 },
    },
  ];

  return result;
}

/** Sample volcano plot data */
export function sampleVolcanoPlotData(): VolcanoPlotData {
  const n = 500;
  const genes: string[] = [];
  const log2FoldChange: number[] = [];
  const negLog10PValue: number[] = [];

  for (let i = 0; i < n; i++) {
    genes.push(`Gene_${i + 1}`);
    const fc = (Math.random() - 0.5) * 6;
    log2FoldChange.push(fc);
    // Higher fold change tends to have higher significance
    const basePval = Math.random() * 4;
    negLog10PValue.push(basePval + Math.abs(fc) * Math.random());
  }

  return { genes, log2FoldChange, negLog10PValue };
}

// ============================================================================
// Growth Curve
// ============================================================================

export interface GrowthCurveData {
  name: string;
  timePoints: number[];
  od600: number[];
  error?: number[];
}

/**
 * Create a bacterial/cell growth curve
 */
export function createGrowthCurve(
  curves: GrowthCurveData[],
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const series: DataSeries[] = curves.map((c) => ({
    name: c.name,
    x: c.timePoints,
    y: c.od600,
    error: c.error,
    markerSize: 6,
    lineWidth: 2,
  }));

  return createLineChart(series, {
    title: config?.title || 'Growth Curve',
    xAxisLabel: config?.xAxisLabel || 'Time (hours)',
    yAxisLabel: config?.yAxisLabel || 'OD600',
    width: config?.width || 600,
    height: config?.height || 400,
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
  });
}

/** Sample growth curve data */
export function sampleGrowthCurveData(): GrowthCurveData[] {
  const times = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
  return [
    {
      name: 'Wild Type',
      timePoints: times,
      od600: [0.05, 0.08, 0.15, 0.35, 0.65, 1.1, 1.5, 1.8, 2.0, 2.1, 2.15, 2.18, 2.2],
      error: times.map(() => 0.05 + Math.random() * 0.05),
    },
    {
      name: 'Mutant',
      timePoints: times,
      od600: [0.05, 0.06, 0.1, 0.2, 0.4, 0.7, 1.0, 1.25, 1.4, 1.5, 1.55, 1.58, 1.6],
      error: times.map(() => 0.04 + Math.random() * 0.04),
    },
  ];
}

// ============================================================================
// ELISA Standard Curve
// ============================================================================

export interface ELISAData {
  concentrations: number[];
  absorbance: number[];
  error?: number[];
  unknowns?: { name: string; absorbance: number }[];
}

/**
 * Create an ELISA standard curve
 */
export function createELISAStandardCurve(
  elisaData: ELISAData,
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const series: DataSeries[] = [
    {
      name: 'Standard Curve',
      x: elisaData.concentrations,
      y: elisaData.absorbance,
      error: elisaData.error,
      markerSize: 8,
      lineWidth: 2,
    },
  ];

  const result = createLineChart(series, {
    title: config?.title || 'ELISA Standard Curve',
    xAxisLabel: config?.xAxisLabel || 'Concentration (pg/mL)',
    yAxisLabel: config?.yAxisLabel || 'Absorbance (OD450)',
    xAxisType: 'log',
    width: config?.width || 600,
    height: config?.height || 400,
    style: { ...SCIENTIFIC_STYLE, ...config?.style },
  });

  // Add unknown sample annotations if provided
  if (elisaData.unknowns && elisaData.unknowns.length > 0) {
    result.layout.annotations = elisaData.unknowns.map((u, i) => ({
      x: Math.log10(10), // Placeholder - would need interpolation
      y: u.absorbance,
      text: u.name,
      showarrow: true,
      arrowhead: 2,
      ax: 40,
      ay: -20 - i * 20,
    }));
  }

  return result;
}

/** Sample ELISA data */
export function sampleELISAData(): ELISAData {
  return {
    concentrations: [0, 15.6, 31.25, 62.5, 125, 250, 500, 1000],
    absorbance: [0.05, 0.12, 0.22, 0.38, 0.65, 1.05, 1.62, 2.15],
    error: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.1],
    unknowns: [
      { name: 'Sample 1', absorbance: 0.85 },
      { name: 'Sample 2', absorbance: 0.45 },
    ],
  };
}

// ============================================================================
// Cell Viability Assay
// ============================================================================

export interface CellViabilityData {
  treatments: string[];
  viability: number[];
  error: number[];
}

/**
 * Create a cell viability bar chart
 */
export function createCellViabilityChart(
  viabilityData: CellViabilityData,
  config?: Partial<ChartConfig>
): { data: Data[]; layout: Partial<Layout> } {
  const series: DataSeries[] = [
    {
      name: 'Cell Viability',
      x: viabilityData.treatments,
      y: viabilityData.viability,
      error: viabilityData.error,
    },
  ];

  const result = createBarChart(series, {
    title: config?.title || 'Cell Viability Assay',
    xAxisLabel: config?.xAxisLabel || 'Treatment',
    yAxisLabel: config?.yAxisLabel || 'Cell Viability (%)',
    yAxisRange: [0, 120],
    width: config?.width || 500,
    height: config?.height || 400,
    style: { ...SCIENTIFIC_STYLE, showLegend: false, ...config?.style },
    grouped: false,
  });

  // Add 100% reference line
  result.layout.shapes = [
    {
      type: 'line',
      x0: -0.5,
      x1: viabilityData.treatments.length - 0.5,
      y0: 100,
      y1: 100,
      line: { color: '#666', dash: 'dash', width: 1 },
    },
  ];

  return result;
}

/** Sample cell viability data */
export function sampleCellViabilityData(): CellViabilityData {
  return {
    treatments: ['Control', 'DMSO', '0.1 uM', '1 uM', '10 uM', '100 uM'],
    viability: [100, 98, 95, 78, 45, 12],
    error: [5, 6, 8, 7, 6, 4],
  };
}

// ============================================================================
// Preset Registry
// ============================================================================

/** All available presets with metadata */
export const PRESET_INFO: PresetInfo[] = [
  {
    id: 'gene-expression-heatmap',
    name: 'Gene Expression Heatmap',
    description: 'Visualize gene expression levels across samples',
    category: 'molecular',
    sampleData: sampleGeneExpressionData,
  },
  {
    id: 'kaplan-meier',
    name: 'Kaplan-Meier Survival Curve',
    description: 'Survival analysis for clinical trials',
    category: 'clinical',
    sampleData: sampleKaplanMeierData,
  },
  {
    id: 'dose-response',
    name: 'Dose-Response Curve',
    description: 'Pharmacological dose-response relationships',
    category: 'molecular',
    sampleData: sampleDoseResponseData,
  },
  {
    id: 'western-blot',
    name: 'Western Blot Quantification',
    description: 'Protein expression bar chart with error bars',
    category: 'molecular',
    sampleData: sampleWesternBlotData,
  },
  {
    id: 'flow-cytometry',
    name: 'Flow Cytometry Scatter Plot',
    description: 'Cell population analysis with quadrant gates',
    category: 'cell-biology',
    sampleData: sampleFlowCytometryData,
  },
  {
    id: 'time-series',
    name: 'Time Series',
    description: 'General temporal data visualization',
    category: 'general',
    sampleData: sampleTimeSeriesData,
  },
  {
    id: 'bar-with-error',
    name: 'Bar Chart with Error Bars',
    description: 'Statistical comparisons between groups',
    category: 'statistics',
    sampleData: sampleBarWithErrorData,
  },
  {
    id: 'volcano-plot',
    name: 'Volcano Plot',
    description: 'Differential expression analysis visualization',
    category: 'molecular',
    sampleData: sampleVolcanoPlotData,
  },
  {
    id: 'growth-curve',
    name: 'Growth Curve',
    description: 'Bacterial or cell growth over time',
    category: 'cell-biology',
    sampleData: sampleGrowthCurveData,
  },
  {
    id: 'elisa-standard',
    name: 'ELISA Standard Curve',
    description: 'ELISA assay standard curve with unknowns',
    category: 'molecular',
    sampleData: sampleELISAData,
  },
  {
    id: 'cell-viability',
    name: 'Cell Viability Assay',
    description: 'Cell viability across treatment conditions',
    category: 'cell-biology',
    sampleData: sampleCellViabilityData,
  },
];

/**
 * Get preset function by ID
 */
export function getPresetById(
  id: PresetType
): ((data: unknown, config?: Partial<ChartConfig>) => { data: Data[]; layout: Partial<Layout> }) | null {
  switch (id) {
    case 'gene-expression-heatmap':
      return createGeneExpressionHeatmap as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'kaplan-meier':
      return createKaplanMeierCurve as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'dose-response':
      return createDoseResponseCurve as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'western-blot':
      return createWesternBlotChart as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'flow-cytometry':
      return createFlowCytometryPlot as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'time-series':
      return createTimeSeriesChart as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'bar-with-error':
      return createBarWithErrorChart as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'volcano-plot':
      return createVolcanoPlot as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'growth-curve':
      return createGrowthCurve as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'elisa-standard':
      return createELISAStandardCurve as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    case 'cell-viability':
      return createCellViabilityChart as (
        data: unknown,
        config?: Partial<ChartConfig>
      ) => { data: Data[]; layout: Partial<Layout> };
    default:
      return null;
  }
}

/**
 * Get sample data for a preset
 */
export function getSampleData(id: PresetType): unknown {
  const preset = PRESET_INFO.find((p) => p.id === id);
  return preset ? preset.sampleData() : null;
}

// Export styles for external use
export { SCIENTIFIC_STYLE, PUBLICATION_STYLE };
