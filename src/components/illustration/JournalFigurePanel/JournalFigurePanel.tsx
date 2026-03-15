"use client";
/**
 * JournalFigurePanel
 *
 * Right sidebar panel for journal figure preparation tools:
 * - Figure label insertion (Fig. 1, Figure 1A, etc.)
 * - Scale bar insertion
 * - Panel letter insertion (A, B, C, D)
 * - Copyright/attribution text insertion
 * - Color convention application
 * - Accessibility (color-blind simulation preview)
 *
 * @module components/illustration/JournalFigurePanel
 */

import React, { useState, useCallback } from 'react';
import { useEditorStore } from '@/stores/illustration/editorStore';
import {
  ColorConventionManager,
  COLOR_CONVENTIONS,
  formatFigureLabel,
  createScaleBar,
  simulateColorBlind,
  checkColorDistinguishability,
  type FigureLabelStyle,
  type ColorBlindType,
  type ColorConvention,
  type ApplyResult,
} from '@/lib/illustration/canvas/color-conventions';

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    overflow: 'auto',
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
  row: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '6px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
  },
  select: {
    flex: 1,
    padding: '6px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
  },
  button: {
    padding: '6px 12px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '11px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap',
  },
  buttonPrimary: {
    backgroundColor: 'var(--accent-primary)',
    borderColor: 'var(--accent-primary)',
    color: 'white',
  },
  label: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    minWidth: '50px',
  },
  preview: {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-primary)',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    textAlign: 'center',
  },
  conventionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    fontSize: '11px',
    color: 'var(--text-primary)',
  },
  colorSwatch: {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    border: '1px solid var(--border-primary)',
    flexShrink: 0,
  },
  warning: {
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    fontSize: '11px',
    color: '#fbbf24',
    lineHeight: 1.4,
  },
  info: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: 'var(--text-secondary)',
    padding: '4px 0',
  },
};

// ============================================================================
// JournalFigurePanel Component
// ============================================================================

export interface JournalFigurePanelProps {
  onInsertText?: (text: string, options?: { fontSize?: number; fontWeight?: string }) => void;
  onInsertScaleBar?: (widthPx: number, heightPx: number, label: string) => void;
  onApplyFillColor?: (objectId: string, color: string) => void;
}

export function JournalFigurePanel({
  onInsertText,
  onInsertScaleBar,
  onApplyFillColor,
}: JournalFigurePanelProps): JSX.Element {
  const canvas = useEditorStore((state) => state.canvas);

  // Figure label state
  const [labelStyle, setLabelStyle] = useState<FigureLabelStyle>('fig-dot');
  const [labelNumber, setLabelNumber] = useState(1);
  const [labelPanel, setLabelPanel] = useState('');

  // Scale bar state
  const [scaleValue, setScaleValue] = useState(100);
  const [scaleUnit, setScaleUnit] = useState('μm');
  const [scaleBarWidth, setScaleBarWidth] = useState(200);

  // Panel letters state
  const [nextPanelLetter, setNextPanelLetter] = useState('A');

  // Copyright state
  const [copyrightText, setCopyrightText] = useState('');

  // Color conventions state
  const [conventionResults, setConventionResults] = useState<ApplyResult[]>([]);
  const [colorBlindType, setColorBlindType] = useState<ColorBlindType>('deuteranopia');
  const [accessibilityWarnings, setAccessibilityWarnings] = useState<string[]>([]);

  // ---- Figure Labels ----
  const previewLabel = formatFigureLabel({
    style: labelStyle,
    number: labelNumber,
    panel: labelPanel || undefined,
  });

  const handleInsertLabel = useCallback(() => {
    if (onInsertText) {
      onInsertText(previewLabel, { fontSize: 12, fontWeight: 'bold' });
    }
  }, [onInsertText, previewLabel]);

  // ---- Scale Bar ----
  const handleInsertScaleBar = useCallback(() => {
    const bar = createScaleBar({
      lengthValue: scaleValue,
      unit: scaleUnit,
      barWidthPx: scaleBarWidth,
    });
    if (onInsertScaleBar) {
      onInsertScaleBar(bar.widthPx, bar.heightPx, bar.label);
    }
  }, [onInsertScaleBar, scaleValue, scaleUnit, scaleBarWidth]);

  // ---- Panel Letters ----
  const handleInsertPanelLetter = useCallback(() => {
    if (onInsertText) {
      onInsertText(nextPanelLetter, { fontSize: 16, fontWeight: 'bold' });
    }
    // Advance to next letter
    setNextPanelLetter(String.fromCharCode(nextPanelLetter.charCodeAt(0) + 1));
  }, [onInsertText, nextPanelLetter]);

  // ---- Copyright ----
  const handleInsertCopyright = useCallback(() => {
    if (onInsertText && copyrightText.trim()) {
      onInsertText(copyrightText, { fontSize: 8 });
    }
  }, [onInsertText, copyrightText]);

  // ---- Color Conventions ----
  const handleApplyConventions = useCallback(() => {
    if (!canvas) return;

    const mgr = new ColorConventionManager();

     
    const objects = canvas.getObjects().map((obj: any) => ({
      id: obj.get?.('id') ?? obj.id,
      text: obj.text ?? obj.get?.('text'),
      name: obj.name ?? obj.get?.('name'),
      fill: typeof obj.fill === 'string' ? obj.fill : undefined,
    }));

    const results = mgr.applyToCanvasObjects(objects);
    setConventionResults(results);

    // Apply colors to canvas objects
    if (onApplyFillColor) {
      for (const result of results) {
        if (result.objectId) {
          onApplyFillColor(result.objectId, result.appliedColor);
        }
      }
    }
  }, [canvas, onApplyFillColor]);

  // ---- Accessibility ----
  const handleCheckAccessibility = useCallback(() => {
    const usedColors = COLOR_CONVENTIONS.map(c => c.color);
    const result = checkColorDistinguishability(usedColors, colorBlindType);
    setAccessibilityWarnings(result.warnings);
  }, [colorBlindType]);

  return (
    <div style={styles.panel}>
      {/* Figure Labels */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Figure Labels</div>
        <div style={styles.row}>
          <span style={styles.label}>Style</span>
          <select aria-label="Select option"
            style={styles.select}
            value={labelStyle}
            onChange={(e) => setLabelStyle(e.target.value as FigureLabelStyle)}
          >
            <option value="fig-dot">Fig. 1</option>
            <option value="figure-space">Figure 1</option>
            <option value="letter-paren">(a)</option>
            <option value="letter-plain">A</option>
          </select>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Number</span>
          <input aria-label="Number input"
            type="number"
            style={styles.input}
            value={labelNumber}
            min={1}
            onChange={(e) => setLabelNumber(parseInt(e.target.value) || 1)}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Panel</span>
          <input aria-label="A, B, C..."
            type="text"
            style={styles.input}
            value={labelPanel}
            placeholder="A, B, C..."
            maxLength={2}
            onChange={(e) => setLabelPanel(e.target.value.toUpperCase())}
          />
        </div>
        <div style={styles.preview}>{previewLabel}</div>
        <button
          style={{ ...styles.button, ...styles.buttonPrimary }}
          onClick={handleInsertLabel}
        >
          Insert Label
        </button>
      </div>

      {/* Scale Bar */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Scale Bar</div>
        <div style={styles.row}>
          <span style={styles.label}>Value</span>
          <input aria-label="Number input"
            type="number"
            style={styles.input}
            value={scaleValue}
            min={1}
            onChange={(e) => setScaleValue(parseInt(e.target.value) || 1)}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Unit</span>
          <select aria-label="Select option"
            style={styles.select}
            value={scaleUnit}
            onChange={(e) => setScaleUnit(e.target.value)}
          >
            <option value="nm">nm</option>
            <option value="μm">μm</option>
            <option value="mm">mm</option>
            <option value="cm">cm</option>
            <option value="m">m</option>
          </select>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Width (px)</span>
          <input aria-label="Number input"
            type="number"
            style={styles.input}
            value={scaleBarWidth}
            min={10}
            onChange={(e) => setScaleBarWidth(parseInt(e.target.value) || 100)}
          />
        </div>
        <button
          style={{ ...styles.button, ...styles.buttonPrimary }}
          onClick={handleInsertScaleBar}
        >
          Insert Scale Bar
        </button>
      </div>

      {/* Panel Letters */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Panel Letters</div>
        <div style={styles.info}>
          Insert sequential panel letters for multi-panel figures.
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Next</span>
          <input aria-label="Text input"
            type="text"
            style={styles.input}
            value={nextPanelLetter}
            maxLength={1}
            onChange={(e) => setNextPanelLetter(e.target.value.toUpperCase() || 'A')}
          />
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onClick={handleInsertPanelLetter}
          >
            Insert {nextPanelLetter}
          </button>
        </div>
      </div>

      {/* Copyright / Attribution */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Copyright / Attribution</div>
        <input aria-label="e.g., Created with ScholarSync"
          type="text"
          style={styles.input}
          value={copyrightText}
          placeholder="e.g., Created with ScholarSync"
          onChange={(e) => setCopyrightText(e.target.value)}
        />
        <button
          style={styles.button}
          onClick={handleInsertCopyright}
        >
          Insert Attribution
        </button>
      </div>

      {/* Color Conventions */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Color Conventions</div>
        <div style={styles.info}>
          Auto-detect biological terms in text labels and apply standard colors.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {COLOR_CONVENTIONS.map((conv: ColorConvention) => (
            <div key={conv.term} style={styles.conventionItem}>
              <div style={{ ...styles.colorSwatch, backgroundColor: conv.color }} />
              <span style={{ fontWeight: 500 }}>{conv.term}</span>
              <span style={{ color: 'var(--text-muted)' }}>{conv.color}</span>
            </div>
          ))}
        </div>
        <button
          style={{ ...styles.button, ...styles.buttonPrimary }}
          onClick={handleApplyConventions}
        >
          Apply Conventions
        </button>
        {conventionResults.length > 0 && (
          <div style={styles.section}>
            {conventionResults.map((result, i) => (
              <div key={i} style={styles.resultItem}>
                <div style={{ ...styles.colorSwatch, backgroundColor: result.appliedColor }} />
                <span>"{result.term}" applied to {result.objectId ?? 'object'}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accessibility Check */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Accessibility Check</div>
        <div style={styles.info}>
          Simulate color vision deficiency to check if your diagram is accessible.
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Type</span>
          <select aria-label="Select option"
            style={styles.select}
            value={colorBlindType}
            onChange={(e) => setColorBlindType(e.target.value as ColorBlindType)}
          >
            <option value="deuteranopia">Deuteranopia (green-blind)</option>
            <option value="protanopia">Protanopia (red-blind)</option>
            <option value="tritanopia">Tritanopia (blue-blind)</option>
          </select>
        </div>
        {/* Simulated color preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {COLOR_CONVENTIONS.slice(0, 4).map((conv: ColorConvention) => {
            const simulated = simulateColorBlind(conv.color, colorBlindType);
            return (
              <div key={conv.term} style={styles.conventionItem}>
                <div style={{ ...styles.colorSwatch, backgroundColor: conv.color }} title="Original" />
                <span>→</span>
                <div style={{ ...styles.colorSwatch, backgroundColor: simulated }} title="Simulated" />
                <span>{conv.term}</span>
              </div>
            );
          })}
        </div>
        <button
          style={styles.button}
          onClick={handleCheckAccessibility}
        >
          Check Distinguishability
        </button>
        {accessibilityWarnings.length > 0 && (
          <div style={styles.section}>
            {accessibilityWarnings.map((w, i) => (
              <div key={i} style={styles.warning}>{w}</div>
            ))}
            <div style={styles.info}>
              Consider using patterns or textures alongside colors to convey information.
            </div>
          </div>
        )}
        {accessibilityWarnings.length === 0 && (
          <div style={styles.info}>
            Colors appear sufficiently distinct for the selected simulation type.
          </div>
        )}
      </div>
    </div>
  );
}

export default JournalFigurePanel;
