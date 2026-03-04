"use client";
/**
 * JournalPresets Component
 *
 * Provides 10 journal export presets with dimension validation.
 * Each preset includes specific width/height requirements and DPI settings.
 *
 * @module components/illustration/JournalPresets
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useCallback, useMemo } from 'react';
import { useEditorStore } from '@/stores/illustration/editorStore';

// ============================================================================
// TYPES
// ============================================================================

export interface JournalPreset {
  id: string;
  name: string;
  description: string;
  widthMM: number;  // Width in millimeters
  heightMM: number; // Height in millimeters
  dpi: number;
  maxFileSizeMB?: number; // Optional max file size
  colorSpace: 'RGB' | 'CMYK' | 'Grayscale';
  minFontPt: number; // Minimum font size in points
  minLineWeightPx: number; // Minimum line weight in pixels at 300 DPI
}

export interface PreflightIssue {
  type: 'error' | 'warning';
  message: string;
  details?: string;
}

export interface PreflightResult {
  valid: boolean;
  issues: PreflightIssue[];
  canvasWidthPx: number;
  canvasHeightPx: number;
  canvasWidthMM: number;
  canvasHeightMM: number;
  canvasDPI: number;
}

// ============================================================================
// JOURNAL PRESETS DATA
// ============================================================================

export const JOURNAL_PRESETS: JournalPreset[] = [
  {
    id: 'nature',
    name: 'Nature',
    description: 'Single column, 89mm width',
    widthMM: 89,
    heightMM: 247,
    dpi: 300,
    colorSpace: 'RGB',
    minFontPt: 6,
    minLineWeightPx: 0.5,
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Single column, 86mm width',
    widthMM: 86,
    heightMM: 229,
    dpi: 300,
    colorSpace: 'RGB',
    minFontPt: 6,
    minLineWeightPx: 0.5,
  },
  {
    id: 'cell',
    name: 'Cell',
    description: 'Single column, 85mm width',
    widthMM: 85,
    heightMM: 229,
    dpi: 300,
    colorSpace: 'RGB',
    minFontPt: 6,
    minLineWeightPx: 0.5,
  },
  {
    id: 'pnas',
    name: 'PNAS',
    description: '2-column, 170mm width',
    widthMM: 170,
    heightMM: 229,
    dpi: 300,
    colorSpace: 'RGB',
    minFontPt: 6,
    minLineWeightPx: 0.5,
  },
  {
    id: 'plos-one',
    name: 'PLOS ONE',
    description: 'Single/2-column, 180mm width',
    widthMM: 180,
    heightMM: 240,
    dpi: 300,
    colorSpace: 'RGB',
    minFontPt: 6,
    minLineWeightPx: 0.5,
  },
  {
    id: 'ieee',
    name: 'IEEE Transactions',
    description: 'Single column, 100mm width',
    widthMM: 100,
    heightMM: 250,
    dpi: 600,
    colorSpace: 'Grayscale',
    minFontPt: 8,
    minLineWeightPx: 1,
  },
  {
    id: 'acs-nano',
    name: 'ACS Nano',
    description: 'Single column, 88mm width',
    widthMM: 88,
    heightMM: 210,
    dpi: 300,
    colorSpace: 'RGB',
    minFontPt: 6,
    minLineWeightPx: 0.5,
  },
  {
    id: 'rsc-adv',
    name: 'RSC Advances',
    description: 'Single column, 120mm width',
    widthMM: 120,
    heightMM: 200,
    dpi: 300,
    colorSpace: 'RGB',
    minFontPt: 6,
    minLineWeightPx: 0.5,
  },
  {
    id: 'springer',
    name: 'Springer',
    description: 'Single column, 115mm width',
    widthMM: 115,
    heightMM: 190,
    dpi: 300,
    colorSpace: 'RGB',
    minFontPt: 6,
    minLineWeightPx: 0.5,
  },
  {
    id: 'elsevier',
    name: 'Elsevier',
    description: 'Single column, 90mm width',
    widthMM: 90,
    heightMM: 200,
    dpi: 300,
    colorSpace: 'RGB',
    minFontPt: 6,
    minLineWeightPx: 0.5,
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert millimeters to pixels at given DPI
 */
export function mmToPx(mm: number, dpi: number): number {
  return Math.round((mm / 25.4) * dpi);
}

/**
 * Convert pixels to millimeters at given DPI
 */
export function pxToMm(px: number, dpi: number): number {
  return (px / dpi) * 25.4;
}

/**
 * Get the DPI scale factor relative to 72 DPI
 */
export function dpiScale(dpi: number): number {
  return dpi / 72;
}

/**
 * Run preflight check on canvas against journal requirements
 */
export function runPreflight(
  canvasWidth: number,
  canvasHeight: number,
  preset: JournalPreset,
  objects: Array<{ type?: string; fontSize?: number; strokeWidth?: number }>
): PreflightResult {
  const issues: PreflightIssue[] = [];

  // Calculate canvas dimensions in mm
  const canvasWidthMM = pxToMm(canvasWidth, preset.dpi);
  const canvasHeightMM = pxToMm(canvasHeight, preset.dpi);

  // Check width
  if (Math.abs(canvasWidthMM - preset.widthMM) > 1) {
    issues.push({
      type: 'error',
      message: `Width mismatch`,
      details: `Canvas is ${canvasWidthMM.toFixed(1)}mm wide, expected ${preset.widthMM}mm`,
    });
  }

  // Check height (warn if exceeds, error if too small)
  if (canvasHeightMM < preset.heightMM * 0.5) {
    issues.push({
      type: 'warning',
      message: `Height is small`,
      details: `Canvas is ${canvasHeightMM.toFixed(1)}mm high, recommend at least ${preset.heightMM}mm`,
    });
  }

  // Check for text objects with small fonts
  let minFontFound = Infinity;
  for (const obj of objects) {
    if (obj.type === 'i-text' || obj.type === 'textbox') {
      if (obj.fontSize && obj.fontSize < preset.minFontPt) {
        minFontFound = Math.min(minFontFound, obj.fontSize);
      }
    }
  }

  if (minFontFound < preset.minFontPt) {
    issues.push({
      type: 'warning',
      message: `Small font detected`,
      details: `Font size ${minFontFound}pt is below minimum ${preset.minFontPt}pt`,
    });
  }

  // Check for thin lines
  let minLineWeight = Infinity;
  for (const obj of objects) {
    if (obj.strokeWidth && obj.strokeWidth < preset.minLineWeightPx) {
      minLineWeight = Math.min(minLineWeight, obj.strokeWidth);
    }
  }

  if (minLineWeight < preset.minLineWeightPx) {
    issues.push({
      type: 'warning',
      message: `Thin lines detected`,
      details: `Line weight ${minLineWeight}px is below minimum ${preset.minLineWeightPx}px`,
    });
  }

  return {
    valid: issues.filter(i => i.type === 'error').length === 0,
    issues,
    canvasWidthPx: canvasWidth,
    canvasHeightPx: canvasHeight,
    canvasWidthMM,
    canvasHeightMM,
    canvasDPI: preset.dpi,
  };
}

// ============================================================================
// STYLES
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  presetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
  },
  presetCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px',
    border: '2px solid var(--border-primary)',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-tertiary)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  presetCardSelected: {
    borderColor: 'var(--accent-primary)',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  presetCardHover: {
    borderColor: 'var(--accent-primary)',
  },
  presetName: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  presetDescription: {
    fontSize: '11px',
    color: 'var(--text-muted)',
  },
  presetDetails: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  preflightSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    border: '1px solid var(--border-primary)',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-tertiary)',
  },
  preflightHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preflightStatus: {
    fontSize: '12px',
    fontWeight: 600,
  },
  preflightStatusValid: {
    color: '#4ade80',
  },
  preflightStatusInvalid: {
    color: '#f87171',
  },
  preflightStatusWarning: {
    color: '#fbbf24',
  },
  preflightDetails: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  preflightIssue: {
    display: 'flex',
    gap: '8px',
    padding: '6px',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
  },
  preflightIssueError: {
    borderLeft: '3px solid #f87171',
  },
  preflightIssueWarning: {
    borderLeft: '3px solid #fbbf24',
  },
  issueType: {
    fontWeight: 600,
    fontSize: '10px',
    textTransform: 'uppercase',
  },
  issueTypeError: {
    color: '#f87171',
  },
  issueTypeWarning: {
    color: '#fbbf24',
  },
  button: {
    padding: '8px 16px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  buttonPrimary: {
    backgroundColor: 'var(--accent-primary)',
    borderColor: 'var(--accent-primary)',
    color: 'white',
  },
  buttonHover: {
    backgroundColor: 'var(--bg-hover)',
  },
  buttonPrimaryHover: {
    backgroundColor: '#4f46e5',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
};

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

interface PresetCardProps {
  preset: JournalPreset;
  isSelected: boolean;
  onSelect: () => void;
}

function PresetCard({ preset, isSelected, onSelect }: PresetCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.presetCard,
        ...(isSelected ? styles.presetCardSelected : {}),
        ...(isHovered ? styles.presetCardHover : {}),
      }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.presetName}>{preset.name}</div>
      <div style={styles.presetDescription}>{preset.description}</div>
      <div style={styles.presetDetails}>
        <span>{preset.widthMM}mm × {preset.heightMM}mm</span>
        <span>{preset.dpi} DPI</span>
        <span>{preset.colorSpace}</span>
      </div>
    </div>
  );
}

interface PreflightDisplayProps {
  result: PreflightResult | null;
}

function PreflightDisplay({ result }: PreflightDisplayProps): JSX.Element | null {
  if (!result) return null;

  const { issues, canvasWidthMM, canvasHeightMM } = result;
  const errors = issues.filter(i => i.type === 'error');
  const warnings = issues.filter(i => i.type === 'warning');

  const getStatusStyle = () => {
    if (errors.length > 0) return { ...styles.preflightStatus, ...styles.preflightStatusInvalid };
    if (warnings.length > 0) return { ...styles.preflightStatus, ...styles.preflightStatusWarning };
    return { ...styles.preflightStatus, ...styles.preflightStatusValid };
  };

  const getStatusText = () => {
    if (errors.length > 0) return `Failed: ${errors.length} error${errors.length > 1 ? 's' : ''}`;
    if (warnings.length > 0) return `Warning: ${warnings.length} issue${warnings.length > 1 ? 's' : ''}`;
    return 'Passed';
  };

  return (
    <div style={styles.preflightSection}>
      <div style={styles.preflightHeader}>
        <div>
          <div style={styles.sectionTitle}>Preflight Check</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Canvas: {canvasWidthMM.toFixed(1)}mm × {canvasHeightMM.toFixed(1)}mm
          </div>
        </div>
        <div style={getStatusStyle()}>{getStatusText()}</div>
      </div>

      {issues.length > 0 && (
        <div style={styles.preflightDetails}>
          {issues.map((issue, index) => (
            <div
              key={index}
              style={{
                ...styles.preflightIssue,
                ...(issue.type === 'error' ? styles.preflightIssueError : styles.preflightIssueWarning),
              }}
            >
              <span style={{ ...styles.issueType, ...(issue.type === 'error' ? styles.issueTypeError : styles.issueTypeWarning) }}>
                {issue.type}
              </span>
              <span>{issue.message}</span>
              {issue.details && <span style={{ color: 'var(--text-muted)' }}>{issue.details}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export interface JournalPresetsProps {
  /** Callback when preset is selected */
  onPresetSelect?: (preset: JournalPreset) => void;
  /** Callback when export should proceed with selected preset */
  onExport?: (preset: JournalPreset) => void;
}

export function JournalPresets({ onPresetSelect, onExport }: JournalPresetsProps): JSX.Element {
  const canvas = useEditorStore((state) => state.canvas);
  const [selectedPreset, setSelectedPreset] = useState<JournalPreset | null>(null);
  const [preflightResult, setPreflightResult] = useState<PreflightResult | null>(null);

  // Get canvas objects for preflight
  const canvasObjects = useMemo(() => {
    if (!canvas) return [];
    return canvas.getObjects().map((obj: any) => ({
      type: obj.type,
      fontSize: obj.fontSize,
      strokeWidth: obj.strokeWidth,
    }));
  }, [canvas]);

  // Run preflight when preset is selected
  const runPreflightCheck = useCallback(() => {
    if (!canvas || !selectedPreset) return;

    const result = runPreflight(
      canvas.width || 800,
      canvas.height || 600,
      selectedPreset,
      canvasObjects
    );
    setPreflightResult(result);
  }, [canvas, selectedPreset, canvasObjects]);

  // Handle preset selection
  const handlePresetSelect = useCallback((preset: JournalPreset) => {
    setSelectedPreset(preset);
    setPreflightResult(null);
    onPresetSelect?.(preset);
  }, [onPresetSelect]);

  // Handle export
  const handleExport = useCallback(() => {
    if (selectedPreset && onExport) {
      onExport(selectedPreset);
    }
  }, [selectedPreset, onExport]);

  return (
    <div style={styles.panel}>
      {/* Presets Grid */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Journal Presets</div>
        <div style={styles.presetsGrid}>
          {JOURNAL_PRESETS.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              isSelected={selectedPreset?.id === preset.id}
              onSelect={() => handlePresetSelect(preset)}
            />
          ))}
        </div>
      </div>

      {/* Preflight Check Button */}
      {selectedPreset && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Validation</div>
          <div style={styles.buttonGroup}>
            <button
              style={{ ...styles.button, ...styles.buttonPrimary }}
              onClick={runPreflightCheck}
            >
              Run Preflight
            </button>
            {preflightResult && preflightResult.valid && (
              <button
                style={{ ...styles.button, ...styles.buttonPrimary }}
                onClick={handleExport}
              >
                Export
              </button>
            )}
          </div>
        </div>
      )}

      {/* Preflight Results */}
      <PreflightDisplay result={preflightResult} />
    </div>
  );
}

export default JournalPresets;
