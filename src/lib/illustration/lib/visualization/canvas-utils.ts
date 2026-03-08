/**
 * Canvas Utilities for Chart Integration
 *
 * Provides utilities for inserting Plotly charts into Fabric.js canvas
 * as editable objects.
 *
 * @module lib/visualization/canvas-utils
 */

import { FabricImage, FabricObject, Group, Rect } from 'fabric';
import type { Canvas as FabricCanvas } from 'fabric';
import { chartToSvg, chartToPng, type PlotlyHTMLElement } from './index';

// ============================================================================
// Types
// ============================================================================

export interface ChartInsertOptions {
  /** X position on canvas */
  x?: number;
  /** Y position on canvas */
  y?: number;
  /** Scale factor (1 = original size) */
  scale?: number;
  /** Maximum width (will scale down if exceeded) */
  maxWidth?: number;
  /** Maximum height (will scale down if exceeded) */
  maxHeight?: number;
  /** Center the chart on canvas */
  center?: boolean;
  /** Add background to chart */
  addBackground?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Background padding */
  backgroundPadding?: number;
  /** Make chart selectable */
  selectable?: boolean;
  /** Custom name for the chart object */
  name?: string;
}

export interface ChartCanvasObject extends FabricObject {
  /** Chart type identifier */
  chartType?: string;
  /** Original chart data (for re-rendering) */
  chartData?: unknown;
  /** Original chart layout */
  chartLayout?: unknown;
  /** SVG string representation */
  chartSvg?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Convert SVG string to Fabric.js image object
 */
async function svgToFabricImage(svgString: string): Promise<FabricImage> {
  // Create a blob URL from SVG string
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const img = await FabricImage.fromURL(svgUrl);
    return img;
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

/**
 * Convert PNG data URL to Fabric.js image object
 */
async function pngToFabricImage(pngDataUrl: string): Promise<FabricImage> {
  return FabricImage.fromURL(pngDataUrl);
}

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Insert a Plotly chart into a Fabric.js canvas as a PNG image
 * PNG format provides better rendering quality and compatibility
 */
export async function insertChartAsImage(
  canvas: FabricCanvas,
  plotElement: PlotlyHTMLElement,
  options: ChartInsertOptions = {}
): Promise<FabricImage> {
  const {
    x,
    y,
    scale = 1,
    maxWidth,
    maxHeight,
    center = true,
    addBackground = false,
    backgroundColor = '#ffffff',
    backgroundPadding = 10,
    selectable = true,
    name = 'chart',
  } = options;

  // Get chart dimensions from plot element
  const plotWidth = plotElement.offsetWidth || 600;
  const plotHeight = plotElement.offsetHeight || 400;

  // Export chart as PNG with 2x resolution for quality
  const pngDataUrl = await chartToPng(plotElement, {
    width: plotWidth,
    height: plotHeight,
    scale: 2,
  });

  // Create Fabric image
  const chartImage = await pngToFabricImage(pngDataUrl);

  // Calculate scale factor
  let finalScale = scale * 0.5; // Compensate for 2x export resolution
  const canvasWidth = canvas.width || 800;
  const canvasHeight = canvas.height || 600;
  const effectiveMaxWidth = maxWidth || canvasWidth * 0.8;
  const effectiveMaxHeight = maxHeight || canvasHeight * 0.8;

  // Scale down if needed to fit within max dimensions
  const imageWidth = (chartImage.width || plotWidth) * finalScale;
  const imageHeight = (chartImage.height || plotHeight) * finalScale;

  if (imageWidth > effectiveMaxWidth) {
    finalScale *= effectiveMaxWidth / imageWidth;
  }
  if (imageHeight * (finalScale / finalScale) > effectiveMaxHeight) {
    finalScale *= effectiveMaxHeight / imageHeight;
  }

  chartImage.scale(finalScale);

  // Calculate position
  let posX = x ?? 0;
  let posY = y ?? 0;

  if (center) {
    const scaledWidth = (chartImage.width || 0) * finalScale;
    const scaledHeight = (chartImage.height || 0) * finalScale;
    posX = (canvasWidth - scaledWidth) / 2;
    posY = (canvasHeight - scaledHeight) / 2;
  }

  chartImage.set({
    left: posX,
    top: posY,
    selectable,
    name,
  });

  // Add background if requested
  if (addBackground) {
    const scaledWidth = (chartImage.width || 0) * finalScale;
    const scaledHeight = (chartImage.height || 0) * finalScale;

    const bgRect = new Rect({
      width: scaledWidth + backgroundPadding * 2,
      height: scaledHeight + backgroundPadding * 2,
      fill: backgroundColor,
      left: posX - backgroundPadding,
      top: posY - backgroundPadding,
      selectable: false,
      evented: false,
    });

    // Create a group with background and chart
    const chartGroup = new Group([bgRect, chartImage], {
      left: posX - backgroundPadding,
      top: posY - backgroundPadding,
      selectable,
    });

    canvas.add(chartGroup);
    canvas.setActiveObject(chartGroup);
    canvas.renderAll();

    return chartImage;
  }

  canvas.add(chartImage);
  canvas.setActiveObject(chartImage);
  canvas.renderAll();

  return chartImage;
}

/**
 * Insert a Plotly chart into a Fabric.js canvas as SVG
 * SVG format allows for better scaling but may have rendering issues
 */
export async function insertChartAsSvg(
  canvas: FabricCanvas,
  plotElement: PlotlyHTMLElement,
  options: ChartInsertOptions = {}
): Promise<FabricImage> {
  const {
    x,
    y,
    scale = 1,
    maxWidth,
    maxHeight,
    center = true,
    selectable = true,
    name = 'chart',
  } = options;

  // Get chart dimensions from plot element
  const plotWidth = plotElement.offsetWidth || 600;
  const plotHeight = plotElement.offsetHeight || 400;

  // Export chart as SVG
  const svgString = await chartToSvg(plotElement, {
    width: plotWidth,
    height: plotHeight,
  });

  // Create Fabric image from SVG
  const chartImage = await svgToFabricImage(svgString);

  // Store SVG string for potential later use
  (chartImage as ChartCanvasObject).chartSvg = svgString;

  // Calculate scale factor
  let finalScale = scale;
  const canvasWidth = canvas.width || 800;
  const canvasHeight = canvas.height || 600;
  const effectiveMaxWidth = maxWidth || canvasWidth * 0.8;
  const effectiveMaxHeight = maxHeight || canvasHeight * 0.8;

  // Scale down if needed
  const imageWidth = (chartImage.width || plotWidth) * finalScale;
  const imageHeight = (chartImage.height || plotHeight) * finalScale;

  if (imageWidth > effectiveMaxWidth) {
    finalScale *= effectiveMaxWidth / imageWidth;
  }
  if (imageHeight * (finalScale / finalScale) > effectiveMaxHeight) {
    finalScale *= effectiveMaxHeight / imageHeight;
  }

  chartImage.scale(finalScale);

  // Calculate position
  let posX = x ?? 0;
  let posY = y ?? 0;

  if (center) {
    const scaledWidth = (chartImage.width || 0) * finalScale;
    const scaledHeight = (chartImage.height || 0) * finalScale;
    posX = (canvasWidth - scaledWidth) / 2;
    posY = (canvasHeight - scaledHeight) / 2;
  }

  chartImage.set({
    left: posX,
    top: posY,
    selectable,
    name,
  });

  canvas.add(chartImage);
  canvas.setActiveObject(chartImage);
  canvas.renderAll();

  return chartImage;
}

/**
 * Create a chart image from data and layout without a DOM element
 * Useful for programmatic chart creation
 */
export async function createChartImage(
  data: unknown[],
  layout: unknown,
  options: {
    width?: number;
    height?: number;
    format?: 'png' | 'svg';
  } = {}
): Promise<string> {
  const { width = 600, height = 400, format = 'png' } = options;

  // Import Plotly dynamically to create chart
  const Plotly = await import('plotly.js-dist-min');

  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  document.body.appendChild(container);

  try {
    // Create the plot - use type assertion for compatibility
    await Plotly.newPlot(container as any, data as any, layout as any, {
      staticPlot: true,
    });

    // Export to desired format
    const result = await Plotly.toImage(container as any, {
      format,
      width,
      height,
      scale: format === 'png' ? 2 : 1,
    });

    return result;
  } finally {
    // Clean up
    Plotly.purge(container as any);
    document.body.removeChild(container);
  }
}

/**
 * Download a chart as an image file
 */
export async function downloadChart(
  plotElement: PlotlyHTMLElement,
  filename: string,
  format: 'png' | 'svg' | 'jpeg' = 'png'
): Promise<void> {
  const Plotly = await import('plotly.js-dist-min');

  // Export to image data URL
  const dataUrl = await Plotly.toImage(plotElement as any, {
    format,
    width: plotElement.offsetWidth || 600,
    height: plotElement.offsetHeight || 400,
    scale: format === 'png' ? 2 : 1,
  });

  // Create download link
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename.endsWith(`.${format}`) ? filename : `${filename}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Update a chart image on the canvas with new data
 */
export async function updateChartOnCanvas(
  canvas: FabricCanvas,
  chartObject: FabricImage,
  plotElement: PlotlyHTMLElement
): Promise<void> {
  // Get current position and scale
  const currentLeft = chartObject.left || 0;
  const currentTop = chartObject.top || 0;
  const currentScaleX = chartObject.scaleX || 1;
  const currentScaleY = chartObject.scaleY || 1;

  // Export new chart as PNG
  const pngDataUrl = await chartToPng(plotElement, {
    width: plotElement.offsetWidth || 600,
    height: plotElement.offsetHeight || 400,
    scale: 2,
  });

  // Create new image
  const newImage = await pngToFabricImage(pngDataUrl);

  // Apply same transforms
  newImage.set({
    left: currentLeft,
    top: currentTop,
    scaleX: currentScaleX,
    scaleY: currentScaleY,
    selectable: chartObject.selectable,
  });

  // Replace old object
  canvas.remove(chartObject);
  canvas.add(newImage);
  canvas.setActiveObject(newImage);
  canvas.renderAll();
}

// ============================================================================
// Exports
// ============================================================================

export {
  svgToFabricImage,
  pngToFabricImage,
};
