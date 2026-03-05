/**
 * StylePanel Component
 *
 * Panel for controlling hand-drawn style options:
 * - Hand-drawn style toggle (applies Rough.js to selected objects)
 * - Roughness slider (0 = clean, 1 = very sketchy)
 * - Fill pattern options (solid, hachure, cross-hatch, dots)
 * - Bowing control for line curvature
 *
 * @module components/StylePanel
 */

import React, { useState, useCallback } from 'react';
import type { Options as RoughOptions } from 'roughjs/bin/core';

// ============================================================================
// Types
// ============================================================================

export type FillStyle = 'solid' | 'hachure' | 'cross-hatch' | 'dots' | 'zigzag' | 'dashed';

export interface HandDrawnSettings {
  enabled: boolean;
  roughness: number;
  bowing: number;
  fillStyle: FillStyle;
  strokeWidth: number;
  seed?: number;
}

export interface StylePanelProps {
  settings: HandDrawnSettings;
  onSettingsChange: (settings: HandDrawnSettings) => void;
  onApplyToSelection?: () => void;
  hasSelection?: boolean;
}

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '8px',
    width: '260px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-primary)',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    margin: 0,
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  toggleTrack: {
    width: '40px',
    height: '20px',
    borderRadius: '10px',
    backgroundColor: 'var(--bg-tertiary)',
    position: 'relative',
    transition: 'background-color 200ms ease',
  },
  toggleTrackActive: {
    backgroundColor: 'var(--accent-primary)',
  },
  toggleThumb: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    transition: 'transform 200ms ease',
  },
  toggleThumbActive: {
    transform: 'translateX(20px)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  slider: {
    flex: 1,
    height: '4px',
    WebkitAppearance: 'none',
    appearance: 'none',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
  },
  sliderValue: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-muted)',
    minWidth: '32px',
    textAlign: 'right',
    fontFamily: 'var(--font-mono)',
  },
  fillPatterns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  fillButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  fillButtonActive: {
    borderColor: 'var(--accent-primary)',
    backgroundColor: 'var(--accent-secondary)',
  },
  fillButtonHover: {
    borderColor: 'var(--text-muted)',
  },
  fillIcon: {
    width: '24px',
    height: '24px',
  },
  fillLabel: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
    textTransform: 'capitalize',
  },
  applyButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'opacity 200ms ease',
  },
  applyButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  presetButtons: {
    display: 'flex',
    gap: '8px',
  },
  presetButton: {
    flex: 1,
    padding: '8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '11px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
};

// ============================================================================
// Fill Pattern Icons
// ============================================================================

const FillIcons: Record<FillStyle, React.ReactNode> = {
  solid: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  ),
  hachure: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="6" y1="10" x2="10" y2="6" />
      <line x1="6" y1="14" x2="14" y2="6" />
      <line x1="6" y1="18" x2="18" y2="6" />
      <line x1="10" y1="18" x2="18" y2="10" />
      <line x1="14" y1="18" x2="18" y2="14" />
    </svg>
  ),
  'cross-hatch': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="6" y1="10" x2="10" y2="6" />
      <line x1="6" y1="18" x2="18" y2="6" />
      <line x1="14" y1="18" x2="18" y2="14" />
      <line x1="14" y1="6" x2="18" y2="10" />
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="14" x2="10" y2="18" />
    </svg>
  ),
  dots: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
    </svg>
  ),
  zigzag: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <polyline points="6,10 9,7 12,10 15,7 18,10" />
      <polyline points="6,14 9,11 12,14 15,11 18,14" />
      <polyline points="6,18 9,15 12,18 15,15 18,18" />
    </svg>
  ),
  dashed: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="6" y1="8" x2="10" y2="8" strokeDasharray="2,2" />
      <line x1="14" y1="8" x2="18" y2="8" strokeDasharray="2,2" />
      <line x1="6" y1="12" x2="10" y2="12" strokeDasharray="2,2" />
      <line x1="14" y1="12" x2="18" y2="12" strokeDasharray="2,2" />
      <line x1="6" y1="16" x2="10" y2="16" strokeDasharray="2,2" />
      <line x1="14" y1="16" x2="18" y2="16" strokeDasharray="2,2" />
    </svg>
  ),
};

// ============================================================================
// Presets
// ============================================================================

const presets: Record<string, Partial<HandDrawnSettings>> = {
  clean: {
    roughness: 0,
    bowing: 0,
    fillStyle: 'solid',
  },
  sketch: {
    roughness: 1,
    bowing: 1,
    fillStyle: 'hachure',
  },
  rough: {
    roughness: 2,
    bowing: 1.5,
    fillStyle: 'cross-hatch',
  },
};

// ============================================================================
// StylePanel Component
// ============================================================================

export function StylePanel({
  settings,
  onSettingsChange,
  onApplyToSelection,
  hasSelection = false,
}: StylePanelProps): JSX.Element {
  const [hoveredFill, setHoveredFill] = useState<FillStyle | null>(null);

  const handleToggle = useCallback(() => {
    onSettingsChange({
      ...settings,
      enabled: !settings.enabled,
    });
  }, [settings, onSettingsChange]);

  const handleRoughnessChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      roughness: parseFloat(e.target.value),
    });
  }, [settings, onSettingsChange]);

  const handleBowingChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      bowing: parseFloat(e.target.value),
    });
  }, [settings, onSettingsChange]);

  const handleStrokeWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      strokeWidth: parseFloat(e.target.value),
    });
  }, [settings, onSettingsChange]);

  const handleFillStyleChange = useCallback((fillStyle: FillStyle) => {
    onSettingsChange({
      ...settings,
      fillStyle,
    });
  }, [settings, onSettingsChange]);

  const handlePresetClick = useCallback((presetName: string) => {
    const preset = presets[presetName];
    if (preset) {
      onSettingsChange({
        ...settings,
        ...preset,
        enabled: true,
      });
    }
  }, [settings, onSettingsChange]);

  const fillStyles: FillStyle[] = ['solid', 'hachure', 'cross-hatch', 'dots', 'zigzag', 'dashed'];

  return (
    <div style={styles.panel}>
      {/* Header with toggle */}
      <div style={styles.header}>
        <h3 style={styles.title}>Hand-Drawn Style</h3>
        <label style={styles.toggle}>
          <div
            style={{
              ...styles.toggleTrack,
              ...(settings.enabled ? styles.toggleTrackActive : {}),
            }}
            onClick={handleToggle}
          >
            <div
              style={{
                ...styles.toggleThumb,
                ...(settings.enabled ? styles.toggleThumbActive : {}),
              }}
            />
          </div>
        </label>
      </div>

      {/* Presets */}
      <div style={styles.section}>
        <label style={styles.sectionLabel}>Presets</label>
        <div style={styles.presetButtons}>
          {Object.keys(presets).map(presetName => (
            <button
              key={presetName}
              style={styles.presetButton}
              onClick={() => handlePresetClick(presetName)}
            >
              {presetName.charAt(0).toUpperCase() + presetName.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Roughness slider */}
      <div style={styles.section}>
        <label style={styles.sectionLabel}>Roughness</label>
        <div style={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={settings.roughness}
            onChange={handleRoughnessChange}
            style={styles.slider}
            disabled={!settings.enabled}
          />
          <span style={styles.sliderValue}>{settings.roughness.toFixed(1)}</span>
        </div>
      </div>

      {/* Bowing slider */}
      <div style={styles.section}>
        <label style={styles.sectionLabel}>Bowing (Line Curvature)</label>
        <div style={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={settings.bowing}
            onChange={handleBowingChange}
            style={styles.slider}
            disabled={!settings.enabled}
          />
          <span style={styles.sliderValue}>{settings.bowing.toFixed(1)}</span>
        </div>
      </div>

      {/* Stroke width slider */}
      <div style={styles.section}>
        <label style={styles.sectionLabel}>Stroke Width</label>
        <div style={styles.sliderContainer}>
          <input
            type="range"
            min="0.5"
            max="8"
            step="0.5"
            value={settings.strokeWidth}
            onChange={handleStrokeWidthChange}
            style={styles.slider}
            disabled={!settings.enabled}
          />
          <span style={styles.sliderValue}>{settings.strokeWidth.toFixed(1)}</span>
        </div>
      </div>

      {/* Fill patterns */}
      <div style={styles.section}>
        <label style={styles.sectionLabel}>Fill Pattern</label>
        <div style={styles.fillPatterns}>
          {fillStyles.map(fill => (
            <button
              key={fill}
              style={{
                ...styles.fillButton,
                ...(settings.fillStyle === fill ? styles.fillButtonActive : {}),
                ...(hoveredFill === fill && settings.fillStyle !== fill ? styles.fillButtonHover : {}),
              }}
              onClick={() => handleFillStyleChange(fill)}
              onMouseEnter={() => setHoveredFill(fill)}
              onMouseLeave={() => setHoveredFill(null)}
              disabled={!settings.enabled}
              title={fill}
            >
              <div style={styles.fillIcon}>{FillIcons[fill]}</div>
              <span style={styles.fillLabel}>{fill.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Apply to selection button */}
      {onApplyToSelection && (
        <button
          style={{
            ...styles.applyButton,
            ...((!hasSelection || !settings.enabled) ? styles.applyButtonDisabled : {}),
          }}
          onClick={onApplyToSelection}
          disabled={!hasSelection || !settings.enabled}
        >
          Apply to Selection
        </button>
      )}
    </div>
  );
}

/**
 * Convert StylePanel settings to Rough.js options
 */
export function settingsToRoughOptions(settings: HandDrawnSettings): RoughOptions {
  return {
    roughness: settings.roughness,
    bowing: settings.bowing,
    strokeWidth: settings.strokeWidth,
    fillStyle: settings.fillStyle as RoughOptions['fillStyle'],
    seed: settings.seed,
  };
}

/**
 * Default hand-drawn settings
 */
export const defaultHandDrawnSettings: HandDrawnSettings = {
  enabled: false,
  roughness: 1,
  bowing: 1,
  fillStyle: 'hachure',
  strokeWidth: 2,
};

export default StylePanel;
