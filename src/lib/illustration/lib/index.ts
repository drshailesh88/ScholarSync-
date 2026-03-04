/**
 * Library Integration Index
 *
 * This file exports all integrated libraries for the Illustrator-like editor.
 * Each library provides specific functionality for vector graphics, drawing, and export.
 */

// Paper.js - Vector graphics scripting framework
// @see https://paperjs.org/
export { default as paper } from 'paper';
export type { Project, Tool, Item, Segment, Curve } from 'paper';

// Rough.js - Create graphics with a hand-drawn, sketchy appearance
// @see https://roughjs.com/
export { default as rough } from 'roughjs';
export type { RoughCanvas } from 'roughjs/bin/canvas';
export type { Options as RoughOptions } from 'roughjs/bin/core';

// Perfect Freehand - Draw perfect pressure-sensitive freehand lines
// @see https://github.com/steveruizok/perfect-freehand
export { getStroke, getStrokeOutlinePoints, getStrokePoints } from 'perfect-freehand';
export type { StrokeOptions, StrokePoint } from 'perfect-freehand';

// Color - Immutable color conversion and manipulation
// @see https://github.com/Qix-/color
export { default as Color } from 'color';

// Color.js - Advanced color space support (OKLCH, P3, wide gamut)
// @see https://colorjs.io/
export { default as ColorJS } from 'colorjs.io';

// Save SVG as PNG - Export SVG elements as PNG images
// @see https://github.com/exupero/saveSvgAsPng
// @ts-expect-error - save-svg-as-png doesn't have TypeScript definitions
export { saveSvgAsPng, svgAsPngUri, svgAsDataUri, download } from 'save-svg-as-png';

// jsPDF - Client-side JavaScript PDF generation
// @see https://github.com/parallax/jsPDF
export { jsPDF } from 'jspdf';

// svg2pdf.js - Convert SVG elements to PDF using jsPDF
// @see https://github.com/yWorks/svg2pdf.js
// Stub export - full library needs to be installed for SVG to PDF conversion
// @ts-expect-error - svg2pdf doesn't have TypeScript definitions
export const svg2pdf = typeof window !== 'undefined' ? async (svg: SVGElement, pdf: unknown, options?: unknown) => {
  console.warn('svg2pdf stub: Full SVG to PDF conversion requires library installation');
  return Promise.resolve();
} : () => Promise.resolve();

// Tabler Icons - Free and open source icons for React
// @see https://tabler.io/icons
export * as TablerIcons from '@tabler/icons-react';

// glfx.js - WebGL image effects library
// @see https://evanw.github.io/glfx.js/
// Note: glfx doesn't have default exports, imported via local wrapper

// Re-export from local modules
export * from './paper';
export * from './rough';
export * from './freehand';
export * from './color';
export * from './color/useColorManager';
export * from './export';
export * from './icons';
export * from './glfx';
// Image processing - re-export with explicit naming to avoid ProgressCallback conflict
export {
  removeImageBackground,
  removeBackgroundFromUrl,
  removeBackgroundFromBlob,
  isBackgroundRemovalSupported,
  createPreviewUrl,
  revokePreviewUrl,
  BackgroundRemovalError,
  type BackgroundRemovalStage,
  type BackgroundRemovalOptions,
  type BackgroundRemovalResult,
  type ProgressCallback as BackgroundRemovalProgressCallback,
} from './image';

// AI module - re-export with explicit naming
export {
  generateImage,
  generateScientificDiagram,
  generateVariations,
  configureFalClient,
  isClientConfigured,
  downloadImageAsBlob,
  imageToDataUrl,
  estimateCost,
  getModelInfo,
  ImageGenerationError,
  type ImageSize,
  type FluxModel,
  type IllustrationStyle,
  type GenerationOptions,
  type GeneratedImage,
  type GenerationResult,
  type AIProgressCallback,
} from './ai';

// Visualization module - Plotly.js integration for data visualization
// @see https://plotly.com/javascript/
export {
  // Chart creation functions
  createLineChart,
  createScatterPlot,
  createBarChart,
  createPieChart,
  createHeatmap,
  createBoxPlot,
  createHistogram,
  createAreaChart,
  createViolinPlot,
  // Rendering functions
  renderChart,
  updateChart,
  chartToSvg,
  chartToPng,
  destroyChart,
  // Data parsing utilities
  parseCSV,
  parseTSV,
  parseJSON,
  // Constants
  COLOR_SCHEMES,
  // Plotly instance
  Plotly,
  // Types
  type ChartType,
  type ColorScheme,
  type ChartStyle,
  type DataSeries,
  type HeatmapData,
  type PieData,
  type BoxPlotData,
  type ChartConfig,
  type ChartResult,
  type PlotlyHTMLElement,
} from './visualization';

// Visualization presets for scientific charts
export {
  // Preset functions
  createGeneExpressionHeatmap,
  createKaplanMeierCurve,
  createDoseResponseCurve,
  createWesternBlotChart,
  createFlowCytometryPlot,
  createTimeSeriesChart,
  createBarWithErrorChart,
  createVolcanoPlot,
  createGrowthCurve,
  createELISAStandardCurve,
  createCellViabilityChart,
  // Sample data generators
  sampleGeneExpressionData,
  sampleKaplanMeierData,
  sampleDoseResponseData,
  sampleWesternBlotData,
  sampleFlowCytometryData,
  sampleTimeSeriesData,
  sampleBarWithErrorData,
  sampleVolcanoPlotData,
  sampleGrowthCurveData,
  sampleELISAData,
  sampleCellViabilityData,
  // Preset registry
  PRESET_INFO,
  getPresetById,
  getSampleData,
  // Style presets
  SCIENTIFIC_STYLE,
  PUBLICATION_STYLE,
  // Types
  type PresetType,
  type PresetInfo,
  type GeneExpressionData,
  type SurvivalData,
  type DoseResponseData,
  type WesternBlotData,
  type FlowCytometryData,
  type TimeSeriesData,
  type BarWithErrorData,
  type VolcanoPlotData,
  type GrowthCurveData,
  type ELISAData,
  type CellViabilityData,
} from './visualization/presets';
