/**
 * Plotly Chart Panel
 *
 * Interactive chart generation panel with canvas placement.
 * Supports line, bar, scatter, pie, and other Plotly chart types.
 *
 * @module PlotlyChartPanel
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Canvas as FabricCanvas } from 'fabric';

// ============================================================================
// TYPES
// ============================================================================

export type ChartType =
  | 'scatter'
  | 'bar'
  | 'line'
  | 'pie'
  | 'area'
  | 'histogram'
  | 'box'
  | 'violin'
  | 'heatmap'
  | 'contour';

export interface ChartData {
  x?: number[] | string[];
  y?: number[] | string[] | number[][];
  z?: number[][];
  values?: number[];
  labels?: string[];
  type?: ChartType;
  name?: string;
  mode?: 'lines' | 'markers' | 'lines+markers' | 'none';
  marker?: {
    color?: string | string[];
    size?: number;
    symbol?: 'circle' | 'square' | 'diamond' | 'triangle' | 'star';
  };
  line?: {
    color?: string;
    width?: number;
    dash?: 'solid' | 'dash' | 'dot' | 'dashdot';
  };
  fill?: 'none' | 'tozeroy' | 'tozerox' | 'tonexty' | 'tonextx' | 'toself' | 'tox' | 'toy';
}

export interface ChartLayout {
  title?: string;
  xaxis?: {
    title?: string;
    type?: 'linear' | 'log' | 'category' | 'date';
    range?: [number, number];
    showgrid?: boolean;
  };
  yaxis?: {
    title?: string;
    type?: 'linear' | 'log';
    range?: [number, number];
    showgrid?: boolean;
  };
  showlegend?: boolean;
  width?: number;
  height?: number;
  paper_bgcolor?: string;
  plot_bgcolor?: string;
  font?: {
    family?: string;
    size?: number;
    color?: string;
  };
  margin?: {
    l?: number;
    r?: number;
    t?: number;
    b?: number;
  };
}

export interface ChartConfig {
  data: ChartData[];
  layout: ChartLayout;
  config?: {
    responsive?: boolean;
    displayModeBar?: boolean;
    displaylogo?: boolean;
    modeBarButtonsToRemove?: string[];
  };
}

export interface PlotlyChartPanelProps {
  canvas: FabricCanvas | null;
  onClose?: () => void;
  onInsert?: (chartConfig: ChartConfig, imageDataUrl: string) => void;
}

// ============================================================================
// CHART TYPE TEMPLATES
// ============================================================================

const CHART_TEMPLATES: Record<ChartType, {
  name: string;
  icon: string;
  defaultData: ChartData[];
  defaultLayout: ChartLayout;
  description: string;
}> = {
  scatter: {
    name: 'Scatter Plot',
    icon: '⊙',
    defaultData: [{
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter',
      mode: 'markers',
      marker: { color: '#6366f1', size: 10 },
    }],
    defaultLayout: {
      title: 'Scatter Plot',
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' },
    },
    description: 'Display relationships between two variables',
  },
  line: {
    name: 'Line Chart',
    icon: '📈',
    defaultData: [{
      x: [1, 2, 3, 4, 5],
      y: [10, 12, 8, 14, 11],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#10b981', width: 2 },
    }],
    defaultLayout: {
      title: 'Line Chart',
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' },
    },
    description: 'Show trends over time or categories',
  },
  bar: {
    name: 'Bar Chart',
    icon: '📊',
    defaultData: [{
      x: ['Category A', 'Category B', 'Category C', 'Category D'],
      y: [20, 35, 30, 45],
      type: 'bar',
      marker: { color: '#f59e0b' },
    }],
    defaultLayout: {
      title: 'Bar Chart',
      xaxis: { title: 'Categories' },
      yaxis: { title: 'Values' },
    },
    description: 'Compare values across categories',
  },
  area: {
    name: 'Area Chart',
    icon: '🌊',
    defaultData: [{
      x: [1, 2, 3, 4, 5],
      y: [10, 15, 12, 18, 14],
      type: 'scatter',
      mode: 'lines',
      fill: 'tozeroy',
      line: { color: '#8b5cf6', width: 2 },
    }],
    defaultLayout: {
      title: 'Area Chart',
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' },
    },
    description: 'Show volume over time with filled area',
  },
  pie: {
    name: 'Pie Chart',
    icon: '🥧',
    defaultData: [{
      values: [30, 25, 20, 15, 10],
      labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
      type: 'pie',
    }],
    defaultLayout: {
      title: 'Pie Chart',
    },
    description: 'Show proportions of a whole',
  },
  histogram: {
    name: 'Histogram',
    icon: '📊',
    defaultData: [{
      x: [1, 2, 2, 3, 3, 3, 4, 4, 5],
      type: 'histogram',
      marker: { color: '#ec4899' },
    }],
    defaultLayout: {
      title: 'Histogram',
      xaxis: { title: 'Value' },
      yaxis: { title: 'Count' },
    },
    description: 'Show distribution of data',
  },
  box: {
    name: 'Box Plot',
    icon: '📦',
    defaultData: [{
      y: [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 7]],
      type: 'box',
      marker: { color: '#14b8a6' },
    }],
    defaultLayout: {
      title: 'Box Plot',
      yaxis: { title: 'Values' },
    },
    description: 'Show statistical distribution',
  },
  violin: {
    name: 'Violin Plot',
    icon: '🎻',
    defaultData: [{
      y: [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 7]],
      type: 'violin',
      marker: { color: '#f97316' },
    }],
    defaultLayout: {
      title: 'Violin Plot',
      yaxis: { title: 'Values' },
    },
    description: 'Show density distribution',
  },
  heatmap: {
    name: 'Heatmap',
    icon: '🔥',
    defaultData: [{
      z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
      type: 'heatmap',
    }],
    defaultLayout: {
      title: 'Heatmap',
      xaxis: { title: 'X' },
      yaxis: { title: 'Y' },
    },
    description: 'Show 2D data as color intensity',
  },
  contour: {
    name: 'Contour Plot',
    icon: '⛰️',
    defaultData: [{
      z: [[10, 10.625, 12.5, 15.625, 20],
          [5.625, 6.25, 8.125, 11.25, 15.625],
          [2.5, 3.125, 5.0, 8.125, 12.5],
          [0.625, 1.25, 3.125, 6.25, 10.625],
          [0, 0.625, 2.5, 5.625, 10]],
      type: 'contour',
    }],
    defaultLayout: {
      title: 'Contour Plot',
    },
    description: 'Show 3D surface as 2D contours',
  },
};

// ============================================================================
// STYLES
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--bg-secondary)',
    borderLeft: '1px solid var(--border-primary)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-elevated)',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    margin: 0,
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    overflow: 'hidden',
  },
  section: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--border-primary)',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  },
  chartTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '8px',
  },
  chartTypeButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    padding: '8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    fontSize: '11px',
    textAlign: 'center',
  },
  chartTypeButtonActive: {
    borderColor: 'var(--accent-primary)',
    backgroundColor: 'var(--accent-primary-bg)',
    color: 'var(--accent-primary)',
  },
  chartTypeIcon: {
    fontSize: '24px',
  },
  chartPreview: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--bg-tertiary)',
    borderBottom: '1px solid var(--border-primary)',
  },
  dataEditor: {
    flex: 1,
    padding: '12px 16px',
    overflow: 'auto',
  },
  dataInputRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    minWidth: '60px',
  },
  dataInput: {
    flex: 1,
    padding: '6px 10px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    fontFamily: 'var(--font-mono)',
  },
  textArea: {
    width: '100%',
    minHeight: '80px',
    padding: '8px 10px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    fontFamily: 'var(--font-mono)',
    resize: 'vertical' as const,
  },
  insertButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    margin: '16px',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  seriesList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    marginTop: '8px',
  },
  seriesItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-secondary)',
  },
  seriesColor: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1px solid var(--border-primary)',
  },
  removeButton: {
    marginLeft: 'auto',
    padding: '4px 8px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-hover)',
    color: 'var(--text-secondary)',
    fontSize: '11px',
    cursor: 'pointer',
  },
  addButton: {
    padding: '6px 12px',
    border: '1px dashed var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '12px',
    cursor: 'pointer',
    marginTop: '8px',
  },
};

// ============================================================================
// PLOTLY CHART COMPONENT (Server-Side Compatible)
// ============================================================================

interface PlotlyChartProps {
  data: ChartData[];
  layout: ChartLayout;
  width: number;
  height: number;
  onRenderComplete?: (imageUrl: string) => void;
}

/**
 * Plotly chart component that renders to canvas and captures as image
 * Uses a ref to the div for Plotly to render into
 */
function PlotlyChart({ data, layout, width, height, onRenderComplete }: PlotlyChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [_isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Dynamically import Plotly only on client side
    let plotlyInstance: any = null;

    const loadPlotly = async () => {
      try {
        // Try to import from the global window object first
        if (typeof window !== 'undefined' && (window as any).Plotly) {
          plotlyInstance = (window as any).Plotly;
        } else {
          // Dynamic import
          const PlotlyModule = await import('plotly.js-dist-min');
          plotlyInstance = PlotlyModule.default || PlotlyModule;
        }

        if (chartRef.current && plotlyInstance) {
          const figure = {
            /* empty state: renders nothing when no data */
            data: data.map(d => ({
              ...d,
              // Ensure type is correctly mapped
              type: d.type === 'area' ? 'scatter' : d.type,
              fill: d.type === 'area' ? 'tozeroy' : d.fill,
            })),
            layout: {
              ...layout,
              width,
              height,
              autosize: false,
            },
            config: {
              responsive: false,
              displayModeBar: false,
              displaylogo: false,
            },
          };

          await plotlyInstance.newPlot(chartRef.current, figure.data, figure.layout, figure.config);

          // Wait for render then capture as image
          setTimeout(async () => {
            try {
              const imageDataUrl = await plotlyInstance.toImage(chartRef.current, {
                format: 'png',
                width,
                height,
              });
              onRenderComplete?.(imageDataUrl);
            } catch (err) {
              console.error('Failed to capture Plotly chart:', err);
            }
          }, 100);

          setIsReady(true);
        }
      } catch (err) {
        console.error('Failed to load Plotly:', err);
      }
    };

    loadPlotly();

    const chartEl = chartRef.current;
    return () => {
      if (chartEl && plotlyInstance) {
        plotlyInstance.purge(chartEl);
      }
    };
  }, [data, layout, width, height, onRenderComplete]);

  return (
    <div
      ref={chartRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        top: '-9999px', // Hide off-screen while capturing
        visibility: 'hidden',
      }}
    />
  );
}

// ============================================================================
// PLOTLY CHART PANEL COMPONENT
// ============================================================================

export function PlotlyChartPanel({
  canvas,
  onClose,
  onInsert,
}: PlotlyChartPanelProps): JSX.Element {
  // Chart configuration state
  const [selectedType, setSelectedType] = useState<ChartType>('scatter');
  const [chartData, setChartData] = useState<ChartData[]>(CHART_TEMPLATES.scatter.defaultData);
  const [chartLayout, setChartLayout] = useState<ChartLayout>(CHART_TEMPLATES.scatter.defaultLayout);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Parse data from text input
  const _parseDataInput = useCallback((text: string): number[] => {
    try {
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // Try comma-separated values
      return text
        .split(',')
        .map(s => parseFloat(s.trim()))
        .filter(n => !isNaN(n));
    }
  }, []);

  // Update chart data
  const _updateChartData = useCallback((index: number, updates: Partial<ChartData>) => {
    setChartData(prev =>
      prev.map((d, i) => (i === index ? { ...d, ...updates } : d))
    );
  }, []);

  // Update layout
  const updateLayout = useCallback((updates: Partial<ChartLayout>) => {
    setChartLayout(prev => ({ ...prev, ...updates }));
  }, []);

  // Select chart type
  const selectChartType = useCallback((type: ChartType) => {
    setSelectedType(type);
    const template = CHART_TEMPLATES[type];
    setChartData(template.defaultData);
    setChartLayout(template.defaultLayout);
    setCapturedImage(null);
  }, []);

  // Handle image capture
  const handleRenderComplete = useCallback((imageUrl: string) => {
    setCapturedImage(imageUrl);
    setIsGenerating(false);
  }, []);

  // Regenerate preview
  const regeneratePreview = useCallback(() => {
    setCapturedImage(null);
    setIsGenerating(true);
  }, []);

  // Insert chart to canvas
  const insertToCanvas = useCallback(() => {
    if (!canvas || !capturedImage) return;

    const config: ChartConfig = {
      data: chartData,
      layout: chartLayout,
      config: {
        responsive: false,
        displayModeBar: false,
        displaylogo: false,
      },
    };

    onInsert?.(config, capturedImage);
    onClose?.();
  }, [canvas, capturedImage, chartData, chartLayout, onInsert, onClose]);

  // Add new data series
  const addSeries = useCallback(() => {
    const baseType = selectedType === 'pie' ? 'pie' : 'scatter';
    const newSeries: ChartData = {
      x: [1, 2, 3, 4],
      y: [5, 10, 8, 12],
      type: baseType,
      mode: 'lines+markers',
      name: `Series ${chartData.length + 1}`,
      marker: {
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        size: 8,
      },
    };
    setChartData(prev => [...prev, newSeries]);
  }, [selectedType, chartData.length]);

  // Remove data series
  const removeSeries = useCallback((index: number) => {
    if (chartData.length > 1) {
      setChartData(prev => prev.filter((_, i) => i !== index));
    }
  }, [chartData.length]);

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>Chart Generator</h3>
        <button
          style={styles.closeButton}
          onClick={onClose}
          aria-label="Close panel"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Chart Type Selection */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Chart Type</div>
          <div style={styles.chartTypeGrid}>
            {Object.entries(CHART_TEMPLATES).map(([type, template]) => (
              <button
                key={type}
                style={{
                  ...styles.chartTypeButton,
                  ...(selectedType === type ? styles.chartTypeButtonActive : {}),
                }}
                onClick={() => selectChartType(type as ChartType)}
                title={template.description}
              >
                <span style={styles.chartTypeIcon}>{template.icon}</span>
                <span>{template.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chart Preview */}
        <div style={styles.chartPreview}>
          {capturedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="Chart preview"
              src={capturedImage}
              style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid var(--border-primary)', borderRadius: '8px' }}
            />
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', padding: '40px' }}>
              {isGenerating ? 'Generating chart...' : 'Click "Generate Preview" to see your chart'}
            </div>
          )}
        </div>

        {/* Data Editor */}
        <div style={styles.dataEditor}>
          <div style={styles.sectionTitle}>Chart Data</div>

          {/* Layout Options */}
          <div style={styles.dataInputRow}>
            <label style={styles.dataLabel}>Title</label>
            <input aria-label="Text input"
              type="text"
              style={styles.dataInput}
              value={chartLayout.title || ''}
              onChange={e => updateLayout({ title: e.target.value })}
              placeholder="Chart title"
            />
          </div>

          <div style={styles.dataInputRow}>
            <label style={styles.dataLabel}>Width</label>
            <input aria-label="Number input"
              type="number"
              style={{ ...styles.dataInput, maxWidth: '100px' }}
              value={chartLayout.width || 600}
              onChange={e => updateLayout({ width: parseInt(e.target.value) || 600 })}
              min="200"
              max="2000"
            />
            <label style={styles.dataLabel}>Height</label>
            <input aria-label="Number input"
              type="number"
              style={{ ...styles.dataInput, maxWidth: '100px' }}
              value={chartLayout.height || 400}
              onChange={e => updateLayout({ height: parseInt(e.target.value) || 400 })}
              min="200"
              max="2000"
            />
          </div>

          {/* Data Series */}
          <div style={styles.seriesList}>
            {chartData.map((series, index) => (
              <div key={index} style={styles.seriesItem}>
                <div
                  style={{
                    ...styles.seriesColor,
                    backgroundColor:
                      typeof series.marker?.color === 'string'
                        ? series.marker.color
                        : '#6366f1',
                  }}
                />
                <span style={{ fontSize: '12px', fontWeight: 500 }}>
                  {series.name || `Series ${index + 1}`}
                </span>
                {chartData.length > 1 && (
                  <button
                    style={styles.removeButton}
                    onClick={() => removeSeries(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {selectedType !== 'pie' && selectedType !== 'heatmap' && selectedType !== 'contour' && (
            <button style={styles.addButton} onClick={addSeries}>
              + Add Series
            </button>
          )}

          {/* Raw Data Editor (collapsible) */}
          <details style={{ marginTop: '16px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '12px', color: 'var(--text-secondary)' }}>
              Edit Raw Data (JSON)
            </summary>
            <textarea aria-label="Text area"
              style={styles.textArea}
              value={JSON.stringify(chartData, null, 2)}
              onChange={e => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  if (Array.isArray(parsed)) {
                    setChartData(parsed);
                  }
                } catch {
                  // Ignore invalid JSON
                }
              }}
              placeholder="Enter chart data as JSON array"
            />
          </details>
        </div>

        {/* Hidden chart for rendering */}
        <PlotlyChart
          data={chartData}
          layout={chartLayout}
          width={chartLayout.width || 600}
          height={chartLayout.height || 400}
          onRenderComplete={handleRenderComplete}
        />

        {/* Actions */}
        <button
          style={styles.insertButton}
          onClick={insertToCanvas}
          disabled={!capturedImage}
        >
          📊 Insert to Canvas
        </button>
        <button
          style={{
            ...styles.insertButton,
            backgroundColor: 'var(--bg-hover)',
            color: 'var(--text-primary)',
            marginTop: '0 16px 16px',
          }}
          onClick={regeneratePreview}
          disabled={isGenerating}
        >
          🔄 {capturedImage ? 'Regenerate' : 'Generate'} Preview
        </button>
      </div>
    </div>
  );
}

export default PlotlyChartPanel;
