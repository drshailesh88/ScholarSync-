/**
 * Chart Tool Component
 *
 * Comprehensive data visualization tool for creating scientific charts.
 * Supports multiple chart types, data import, styling, and canvas insertion.
 *
 * @module components/tools/ChartTool
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { FabricImage } from 'fabric';

// Stub for react-plotly - full library needs to be installed for chart functionality
const Plot: React.ComponentType<any> = ({ data: _data, layout: _layout }: { data: unknown[]; layout: unknown }) => (
  <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted, #999)' }}>
    <div>Chart Preview</div>
    <div style={{ fontSize: '12px', marginTop: '8px' }}>
      Install react-plotly.js for interactive charts
    </div>
  </div>
);
import type { Data, Layout } from 'plotly.js-dist-min';
import {
  createLineChart,
  createScatterPlot,
  createBarChart,
  createPieChart,
  createHeatmap,
  createBoxPlot,
  createHistogram,
  createAreaChart,
  chartToSvg,
  chartToPng,
  parseCSV,
  COLOR_SCHEMES,
  type ChartType,
  type ColorScheme,
  type ChartStyle,
  type PieData,
  type HeatmapData,
  type BoxPlotData,
  type PlotlyHTMLElement,
} from '@/lib/illustration/lib/visualization';
import {
  PRESET_INFO,
  getSampleData,
  getPresetById,
  type PresetType,
} from '@/lib/illustration/lib/visualization/presets';
import { useCanvas } from '../Canvas/CanvasContext';

// ============================================================================
// Types
// ============================================================================

export interface ChartToolProps {
  /** Whether the tool panel is open */
  isOpen?: boolean;
  /** Callback when panel is closed */
  onClose?: () => void;
  /** Callback when chart is applied to canvas */
  onApply?: (svg: string) => void;
}

type DataInputMode = 'manual' | 'csv' | 'preset';

interface ChartState {
  type: ChartType;
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  colorScheme: ColorScheme;
  showLegend: boolean;
  showGrid: boolean;
  width: number;
  height: number;
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderRadius: '8px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-color, #333)',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'all 150ms ease',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
    marginBottom: '4px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
  },
  row: {
    display: 'flex',
    gap: '12px',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  input: {
    width: '100%',
    padding: '8px 10px',
    fontSize: '13px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  select: {
    width: '100%',
    padding: '8px 10px',
    fontSize: '13px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box' as const,
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '12px',
    fontFamily: 'monospace',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    outline: 'none',
    resize: 'vertical' as const,
    minHeight: '120px',
    boxSizing: 'border-box' as const,
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '6px',
  },
  tab: {
    flex: 1,
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  tabActive: {
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
  },
  chartTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '6px',
  },
  chartTypeButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    padding: '10px 6px',
    fontSize: '11px',
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  chartTypeButtonActive: {
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    borderColor: 'var(--accent-primary, #3b82f6)',
  },
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    maxHeight: '200px',
    overflow: 'auto',
  },
  presetCard: {
    padding: '10px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  presetCardActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  presetName: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-primary, #ffffff)',
    marginBottom: '4px',
  },
  presetDescription: {
    fontSize: '11px',
    color: 'var(--text-muted, #666)',
  },
  presetCategory: {
    display: 'inline-block',
    padding: '2px 6px',
    fontSize: '10px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'var(--bg-primary, #121212)',
    borderRadius: '3px',
    marginTop: '6px',
  },
  previewContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '8px',
    border: '1px solid var(--border-color, #333)',
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    color: 'var(--text-muted, #666)',
    fontSize: '14px',
    textAlign: 'center' as const,
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  checkboxInput: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  colorSchemeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '6px',
  },
  colorSchemeOption: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    padding: '8px',
    fontSize: '10px',
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  colorSchemeOptionActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
  },
  colorPalette: {
    display: 'flex',
    gap: '2px',
  },
  colorSwatch: {
    width: '10px',
    height: '10px',
    borderRadius: '2px',
  },
  buttonRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },
  button: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
  },
  primaryButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  secondaryButton: {
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    color: 'var(--text-primary, #ffffff)',
    border: '1px solid var(--border-color, #333)',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  error: {
    padding: '10px',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(244, 67, 54, 0.3)',
    color: '#f44336',
    fontSize: '12px',
  },
  info: {
    padding: '10px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '6px',
    fontSize: '11px',
    color: 'var(--text-secondary, #9d9d9d)',
  },
};

// ============================================================================
// Icons
// ============================================================================

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LineChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const ScatterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="7.5" cy="7.5" r="1.5" />
    <circle cx="18.5" cy="5.5" r="1.5" />
    <circle cx="11.5" cy="11.5" r="1.5" />
    <circle cx="7.5" cy="16.5" r="1.5" />
    <circle cx="17.5" cy="14.5" r="1.5" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const PieChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

const HeatmapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <rect x="7" y="7" width="3" height="3" fill="currentColor" />
    <rect x="14" y="7" width="3" height="3" fill="currentColor" opacity="0.5" />
    <rect x="7" y="14" width="3" height="3" fill="currentColor" opacity="0.3" />
    <rect x="14" y="14" width="3" height="3" fill="currentColor" opacity="0.7" />
  </svg>
);

const BoxPlotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <rect x="8" y="6" width="8" height="12" />
    <path d="M8 12h8" />
  </svg>
);

const HistogramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="12" width="4" height="8" />
    <rect x="10" y="6" width="4" height="14" />
    <rect x="17" y="9" width="4" height="11" />
  </svg>
);

const AreaChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" />
    <path d="M3 18L9 12l4 4 8-8v10H3z" fill="currentColor" opacity="0.2" />
    <path d="m19 8-5 5-4-4-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ============================================================================
// Constants
// ============================================================================

const CHART_TYPES: { type: ChartType; label: string; icon: React.ReactNode }[] = [
  { type: 'line', label: 'Line', icon: <LineChartIcon /> },
  { type: 'scatter', label: 'Scatter', icon: <ScatterIcon /> },
  { type: 'bar', label: 'Bar', icon: <BarChartIcon /> },
  { type: 'pie', label: 'Pie', icon: <PieChartIcon /> },
  { type: 'heatmap', label: 'Heatmap', icon: <HeatmapIcon /> },
  { type: 'box', label: 'Box', icon: <BoxPlotIcon /> },
  { type: 'histogram', label: 'Histogram', icon: <HistogramIcon /> },
  { type: 'area', label: 'Area', icon: <AreaChartIcon /> },
];

const DEFAULT_CSV_DATA = `x,Series A,Series B
1,10,15
2,25,18
3,18,30
4,35,25
5,28,40
6,42,35`;

const DEFAULT_PIE_DATA = `Category,Value
Engineering,35
Research,25
Marketing,20
Operations,15
HR,5`;

const DEFAULT_HEATMAP_DATA = `Sample 1,Sample 2,Sample 3,Sample 4
Gene A,0.5,1.2,0.8,1.5
Gene B,1.8,0.3,2.1,0.9
Gene C,0.9,1.5,0.4,1.2
Gene D,1.2,0.8,1.6,0.6`;

const DEFAULT_BOX_DATA = `Group A,Group B,Group C
12,15,18
14,18,22
16,14,20
11,19,25
15,17,21
13,16,23`;

// ============================================================================
// Component
// ============================================================================

export function ChartTool({ isOpen = true, onClose, onApply }: ChartToolProps): JSX.Element | null {
  // State
  const [dataInputMode, setDataInputMode] = useState<DataInputMode>('preset');
  const [csvData, setCsvData] = useState(DEFAULT_CSV_DATA);
  const [selectedPreset, setSelectedPreset] = useState<PresetType | null>('bar-with-error');
  const [chartState, setChartState] = useState<ChartState>({
    type: 'bar',
    title: 'My Chart',
    xAxisLabel: 'X Axis',
    yAxisLabel: 'Y Axis',
    colorScheme: 'scientific',
    showLegend: true,
    showGrid: true,
    width: 600,
    height: 400,
  });
  const [plotData, setPlotData] = useState<Data[] | null>(null);
  const [plotLayout, setPlotLayout] = useState<Partial<Layout> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Refs
  const plotRef = useRef<PlotlyHTMLElement | null>(null);

  // Canvas context
  const canvasContext = useCanvas();

  // Generate chart from current state
  const generateChart = useCallback(() => {
    setError(null);

    try {
      let data: Data[];
      let layout: Partial<Layout>;

      const style: ChartStyle = {
        colorScheme: chartState.colorScheme,
        showLegend: chartState.showLegend,
        showGrid: chartState.showGrid,
      };

      const config = {
        title: chartState.title,
        xAxisLabel: chartState.xAxisLabel,
        yAxisLabel: chartState.yAxisLabel,
        width: chartState.width,
        height: chartState.height,
        style,
      };

      if (dataInputMode === 'preset' && selectedPreset) {
        // Use preset
        const presetFn = getPresetById(selectedPreset);
        const sampleData = getSampleData(selectedPreset);
        if (presetFn && sampleData) {
          const result = presetFn(sampleData, config);
          data = result.data;
          layout = result.layout;
        } else {
          throw new Error('Invalid preset selected');
        }
      } else {
        // Parse CSV data
        const dataToParse = csvData.trim();
        if (!dataToParse) {
          throw new Error('Please enter some data');
        }

        switch (chartState.type) {
          case 'line':
          case 'scatter':
          case 'area': {
            const series = parseCSV(dataToParse);
            if (series.length === 0) {
              throw new Error('Could not parse data. Check format.');
            }
            const result =
              chartState.type === 'line'
                ? createLineChart(series, config)
                : chartState.type === 'scatter'
                  ? createScatterPlot(series, config)
                  : createAreaChart(series, config);
            data = result.data;
            layout = result.layout;
            break;
          }

          case 'bar': {
            const series = parseCSV(dataToParse);
            if (series.length === 0) {
              throw new Error('Could not parse data. Check format.');
            }
            const result = createBarChart(series, config);
            data = result.data;
            layout = result.layout;
            break;
          }

          case 'pie': {
            const lines = dataToParse.split('\n').map((l) => l.split(',').map((c) => c.trim()));
            const hasHeader = isNaN(Number(lines[0][1]));
            const dataLines = hasHeader ? lines.slice(1) : lines;
            const pieData: PieData = {
              labels: dataLines.map((l) => l[0]),
              values: dataLines.map((l) => Number(l[1]) || 0),
              showPercent: true,
            };
            const result = createPieChart(pieData, config);
            data = result.data;
            layout = result.layout;
            break;
          }

          case 'heatmap': {
            const lines = dataToParse.split('\n').map((l) => l.split(',').map((c) => c.trim()));
            const xLabels = lines[0].slice(1);
            const yLabels: string[] = [];
            const zData: number[][] = [];
            for (let i = 1; i < lines.length; i++) {
              yLabels.push(lines[i][0]);
              zData.push(lines[i].slice(1).map((v) => Number(v) || 0));
            }
            const heatmapData: HeatmapData = {
              z: zData,
              x: xLabels,
              y: yLabels,
            };
            const result = createHeatmap(heatmapData, config);
            data = result.data;
            layout = result.layout;
            break;
          }

          case 'box': {
            const lines = dataToParse.split('\n').map((l) => l.split(',').map((c) => c.trim()));
            const labels = lines[0];
            const boxData: number[][] = labels.map(() => []);
            for (let i = 1; i < lines.length; i++) {
              for (let j = 0; j < labels.length; j++) {
                const val = Number(lines[i][j]);
                if (!isNaN(val)) {
                  boxData[j].push(val);
                }
              }
            }
            const boxPlotData: BoxPlotData = {
              labels,
              data: boxData,
            };
            const result = createBoxPlot(boxPlotData, config);
            data = result.data;
            layout = result.layout;
            break;
          }

          case 'histogram': {
            const lines = dataToParse.split('\n').map((l) => l.split(',').map((c) => c.trim()));
            const hasHeader = isNaN(Number(lines[0][0]));
            const dataLines = hasHeader ? lines.slice(1) : lines;
            const values = dataLines.flatMap((l) => l.map((v) => Number(v)).filter((v) => !isNaN(v)));
            const result = createHistogram(values, config);
            data = result.data;
            layout = result.layout;
            break;
          }

          default:
            throw new Error(`Unsupported chart type: ${chartState.type}`);
        }
      }

      setPlotData(data);
      setPlotLayout(layout);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate chart');
      setPlotData(null);
      setPlotLayout(null);
    }
  }, [dataInputMode, csvData, selectedPreset, chartState]);

  // Generate chart on state changes
  useEffect(() => {
    generateChart();
  }, [generateChart]);

  // Update CSV template based on chart type
  const updateCsvTemplate = useCallback((type: ChartType) => {
    switch (type) {
      case 'pie':
        setCsvData(DEFAULT_PIE_DATA);
        break;
      case 'heatmap':
        setCsvData(DEFAULT_HEATMAP_DATA);
        break;
      case 'box':
        setCsvData(DEFAULT_BOX_DATA);
        break;
      default:
        setCsvData(DEFAULT_CSV_DATA);
    }
  }, []);

  // Handle chart type change
  const handleChartTypeChange = useCallback(
    (type: ChartType) => {
      setChartState((prev) => ({ ...prev, type }));
      if (dataInputMode !== 'preset') {
        updateCsvTemplate(type);
      }
    },
    [dataInputMode, updateCsvTemplate]
  );

  // Handle preset selection
  const handlePresetSelect = useCallback((presetId: PresetType) => {
    setSelectedPreset(presetId);
    setDataInputMode('preset');
  }, []);

  // Apply chart to canvas
  const handleApplyToCanvas = useCallback(async () => {
    if (!plotRef.current || !canvasContext.canvas) return;

    setIsExporting(true);
    try {
      // Export as PNG for better quality
      const pngDataUrl = await chartToPng(plotRef.current, {
        width: chartState.width,
        height: chartState.height,
        scale: 2,
      });

      // Load as Fabric image
      const img = await FabricImage.fromURL(pngDataUrl);

      // Scale to fit canvas
      const canvas = canvasContext.canvas;
      const canvasWidth = canvas.width || 800;
      const canvasHeight = canvas.height || 600;
      const maxWidth = canvasWidth * 0.8;
      const maxHeight = canvasHeight * 0.8;

      const scaleX = maxWidth / (img.width || 1);
      const scaleY = maxHeight / (img.height || 1);
      const scale = Math.min(scaleX, scaleY, 1);

      img.scale(scale);
      img.set({
        left: (canvasWidth - (img.width || 0) * scale) / 2,
        top: (canvasHeight - (img.height || 0) * scale) / 2,
      });

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();

      // Get SVG for callback
      const svg = await chartToSvg(plotRef.current, {
        width: chartState.width,
        height: chartState.height,
      });

      if (onApply) {
        onApply(svg);
      }

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error('Failed to apply chart to canvas:', err);
      setError('Failed to add chart to canvas. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [canvasContext, chartState.width, chartState.height, onApply, onClose]);

  // Handle plot initialization - use generic signature for react-plotly.js compatibility
  const handlePlotInit = useCallback((_figure: any, graphDiv: any) => {
    plotRef.current = graphDiv as PlotlyHTMLElement;
  }, []);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>
          <ChartIcon />
          Chart Tool
        </h3>
        {onClose && (
          <button style={styles.closeButton} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Data Input Mode Tabs */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(dataInputMode === 'preset' ? styles.tabActive : {}),
          }}
          onClick={() => setDataInputMode('preset')}
        >
          Presets
        </button>
        <button
          style={{
            ...styles.tab,
            ...(dataInputMode === 'csv' ? styles.tabActive : {}),
          }}
          onClick={() => setDataInputMode('csv')}
        >
          Enter Data
        </button>
      </div>

      {/* Preset Selection */}
      {dataInputMode === 'preset' && (
        <div style={styles.section}>
          <span style={styles.sectionTitle}>Scientific Presets</span>
          <div style={styles.presetGrid}>
            {PRESET_INFO.map((preset) => (
              <div
                key={preset.id}
                style={{
                  ...styles.presetCard,
                  ...(selectedPreset === preset.id ? styles.presetCardActive : {}),
                }}
                onClick={() => handlePresetSelect(preset.id)}
              >
                <div style={styles.presetName}>{preset.name}</div>
                <div style={styles.presetDescription}>{preset.description}</div>
                <span style={styles.presetCategory}>{preset.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSV Data Input */}
      {dataInputMode === 'csv' && (
        <>
          {/* Chart Type Selection */}
          <div style={styles.section}>
            <span style={styles.sectionTitle}>Chart Type</span>
            <div style={styles.chartTypeGrid}>
              {CHART_TYPES.map((ct) => (
                <button
                  key={ct.type}
                  style={{
                    ...styles.chartTypeButton,
                    ...(chartState.type === ct.type ? styles.chartTypeButtonActive : {}),
                  }}
                  onClick={() => handleChartTypeChange(ct.type)}
                >
                  {ct.icon}
                  {ct.label}
                </button>
              ))}
            </div>
          </div>

          {/* Data Input */}
          <div style={styles.section}>
            <span style={styles.sectionTitle}>Data (CSV format)</span>
            <textarea aria-label="Text area"
              style={styles.textarea}
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              placeholder="Paste your data here..."
            />
            <div style={styles.info}>
              Paste CSV data with headers. First column is X-axis, other columns are data series.
            </div>
          </div>
        </>
      )}

      {/* Chart Options */}
      <div style={styles.section}>
        <span style={styles.sectionTitle}>Chart Options</span>

        <div style={styles.row}>
          <div style={styles.column}>
            <label style={styles.label}>Title</label>
            <input aria-label="Text input"
              type="text"
              style={styles.input}
              value={chartState.title}
              onChange={(e) => setChartState((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.column}>
            <label style={styles.label}>X Axis Label</label>
            <input aria-label="X Axis Label"
              type="text"
              style={styles.input}
              value={chartState.xAxisLabel}
              onChange={(e) => setChartState((prev) => ({ ...prev, xAxisLabel: e.target.value }))}
            />
          </div>
          <div style={styles.column}>
            <label style={styles.label}>Y Axis Label</label>
            <input aria-label="Y Axis Label"
              type="text"
              style={styles.input}
              value={chartState.yAxisLabel}
              onChange={(e) => setChartState((prev) => ({ ...prev, yAxisLabel: e.target.value }))}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.column}>
            <label style={styles.label}>Width (px)</label>
            <input aria-label="Number input"
              type="number"
              style={styles.input}
              value={chartState.width}
              onChange={(e) => setChartState((prev) => ({ ...prev, width: Number(e.target.value) || 600 }))}
              min={200}
              max={1200}
            />
          </div>
          <div style={styles.column}>
            <label style={styles.label}>Height (px)</label>
            <input aria-label="Number input"
              type="number"
              style={styles.input}
              value={chartState.height}
              onChange={(e) => setChartState((prev) => ({ ...prev, height: Number(e.target.value) || 400 }))}
              min={200}
              max={800}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div style={styles.row}>
          <label style={styles.checkbox}>
            <input aria-label="Checkbox"
              type="checkbox"
              style={styles.checkboxInput}
              checked={chartState.showLegend}
              onChange={(e) => setChartState((prev) => ({ ...prev, showLegend: e.target.checked }))}
            />
            <span style={styles.label}>Show Legend</span>
          </label>
          <label style={styles.checkbox}>
            <input aria-label="Checkbox"
              type="checkbox"
              style={styles.checkboxInput}
              checked={chartState.showGrid}
              onChange={(e) => setChartState((prev) => ({ ...prev, showGrid: e.target.checked }))}
            />
            <span style={styles.label}>Show Grid</span>
          </label>
        </div>
      </div>

      {/* Color Scheme */}
      <div style={styles.section}>
        <span style={styles.sectionTitle}>Color Scheme</span>
        <div style={styles.colorSchemeGrid}>
          {(Object.keys(COLOR_SCHEMES) as ColorScheme[]).map((scheme) => (
            <div
              key={scheme}
              style={{
                ...styles.colorSchemeOption,
                ...(chartState.colorScheme === scheme ? styles.colorSchemeOptionActive : {}),
              }}
              onClick={() => setChartState((prev) => ({ ...prev, colorScheme: scheme }))}
            >
              <div style={styles.colorPalette}>
                {COLOR_SCHEMES[scheme].slice(0, 5).map((color, i) => (
                  <div key={i} style={{ ...styles.colorSwatch, backgroundColor: color }} />
                ))}
              </div>
              {scheme}
            </div>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Chart Preview */}
      <div style={styles.section}>
        <span style={styles.sectionTitle}>Preview</span>
        <div style={styles.previewContainer}>
          {plotData && plotLayout ? (
            <Plot
              data={plotData as any}
              layout={{
                ...plotLayout,
                width: Math.min(chartState.width, 700),
                height: Math.min(chartState.height, 350),
              } as any}
              config={{ displayModeBar: false, responsive: true }}
              onInitialized={handlePlotInit}
              onUpdate={handlePlotInit}
            />
          ) : (
            <div style={styles.placeholder}>
              {error ? 'Fix errors to see preview' : 'Chart preview will appear here'}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.buttonRow}>
        <button
          style={{
            ...styles.button,
            ...styles.secondaryButton,
          }}
          onClick={generateChart}
        >
          Refresh
        </button>
        <button
          style={{
            ...styles.button,
            ...styles.primaryButton,
            ...(!plotData || isExporting ? styles.disabledButton : {}),
          }}
          onClick={handleApplyToCanvas}
          disabled={!plotData || isExporting}
        >
          <CheckIcon />
          {isExporting ? 'Exporting...' : 'Add to Canvas'}
        </button>
      </div>
    </div>
  );
}

export default ChartTool;
