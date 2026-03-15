// Empty state: renders nothing when data.length === 0
import React from 'react';
import { IText, Textbox } from 'fabric';
import { normalizeColorToHex } from '@/lib/illustration/gradient/gradient-utils';
import { FontPicker } from './FontPicker';

export type CharacterTextAlign = 'left' | 'center' | 'right' | 'justify';
export type CharacterFontWeightOption = '300' | '400' | '500' | '600' | '700' | '900';

export interface CharacterTextLike {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontStyle?: string;
  underline?: boolean;
  linethrough?: boolean;
  textAlign?: CharacterTextAlign;
  lineHeight?: number;
  charSpacing?: number;
  fill?: unknown;
  stroke?: unknown;
  strokeWidth?: number;
  selectionStart?: number;
  selectionEnd?: number;
  getSelectionStyles?: (
    startIndex?: number,
    endIndex?: number,
    complete?: boolean
  ) => Array<Record<string, unknown>>;
  set: (key: string | Record<string, unknown>, value?: unknown) => unknown;
}

export interface CharacterPanelState {
  fontFamily: string;
  fontSize: number;
  fontWeightValue: CharacterFontWeightOption;
  isBold: boolean;
  isItalic: boolean;
  underline: boolean;
  linethrough: boolean;
  textAlign: CharacterTextAlign;
  lineHeight: number;
  charSpacing: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export type CharacterProperty =
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'fontStyle'
  | 'underline'
  | 'linethrough'
  | 'textAlign'
  | 'lineHeight'
  | 'charSpacing'
  | 'fill'
  | 'stroke'
  | 'strokeWidth';

export const FONT_WEIGHT_OPTIONS: Array<{ value: CharacterFontWeightOption; label: string }> = [
  { value: '300', label: 'Light (300)' },
  { value: '400', label: 'Regular (400)' },
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Semi-Bold (600)' },
  { value: '700', label: 'Bold (700)' },
  { value: '900', label: 'Black (900)' },
];

const ALIGN_OPTIONS: CharacterTextAlign[] = ['left', 'center', 'right', 'justify'];

const styles: Record<string, React.CSSProperties> = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '6px',
  },
  rowSingle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  select: {
    width: '100%',
    height: '28px',
    padding: '4px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
  },
  numberInput: {
    width: '100%',
    height: '28px',
    padding: '4px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
  },
  styleRow: {
    display: 'grid',
    gridTemplateColumns: '72px repeat(4, minmax(0, 1fr))',
    gap: '6px',
    alignItems: 'center',
  },
  toggleButton: {
    height: '28px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: 600,
  },
  toggleButtonActive: {
    backgroundColor: 'var(--accent-primary)',
    color: '#ffffff',
    borderColor: 'var(--accent-primary)',
  },
  alignGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '6px',
  },
  sliderRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 70px',
    gap: '6px',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
  },
  colorRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '6px',
    alignItems: 'end',
  },
  colorInput: {
    width: '100%',
    height: '28px',
    padding: 0,
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    cursor: 'pointer',
  },
};

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function isCharacterTextObject(value: unknown): value is IText | Textbox {
  return value instanceof IText || value instanceof Textbox;
}

function toNumericFontWeight(value: string | number | undefined): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === 'normal') return 400;
  if (normalized === 'bold') return 700;
  if (normalized === 'bolder') return 800;
  if (normalized === 'lighter') return 300;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function isBoldFontWeight(value: string | number | undefined): boolean {
  const numericWeight = toNumericFontWeight(value);
  return numericWeight !== null ? numericWeight >= 600 : false;
}

export function resolveFontWeightOption(value: string | number | undefined): CharacterFontWeightOption {
  const numericWeight = toNumericFontWeight(value);

  if (numericWeight === null) {
    return '400';
  }

  if (numericWeight <= 350) return '300';
  if (numericWeight <= 450) return '400';
  if (numericWeight <= 550) return '500';
  if (numericWeight <= 650) return '600';
  if (numericWeight <= 800) return '700';
  return '900';
}

function toColorValue(value: unknown, fallback: string): string {
  return typeof value === 'string' ? normalizeColorToHex(value, fallback) : fallback;
}

function getActiveSelectionStyle(textObject: CharacterTextLike): Record<string, unknown> {
  if (typeof textObject.getSelectionStyles !== 'function') {
    return {};
  }

  try {
    const start = Number.isFinite(textObject.selectionStart) ? Number(textObject.selectionStart) : 0;
    const end = Number.isFinite(textObject.selectionEnd)
      ? Number(textObject.selectionEnd)
      : start;
    const styles = textObject.getSelectionStyles(start, Math.max(start + 1, end), true);

    if (Array.isArray(styles) && styles.length > 0 && styles[0] && typeof styles[0] === 'object') {
      return styles[0];
    }
  } catch {
    return {};
  }

  return {};
}

export function readCharacterPanelState(textObject: CharacterTextLike): CharacterPanelState {
  const selectionStyle = getActiveSelectionStyle(textObject);
  const fontWeight = (selectionStyle.fontWeight as string | number | undefined) ?? textObject.fontWeight;
  const fontStyle = (selectionStyle.fontStyle as string | undefined) ?? textObject.fontStyle;
  const underline = (selectionStyle.underline as boolean | undefined) ?? textObject.underline;
  const linethrough = (selectionStyle.linethrough as boolean | undefined) ?? textObject.linethrough;

  return {
    fontFamily: (selectionStyle.fontFamily as string | undefined) || textObject.fontFamily || 'Arial',
    fontSize: Math.max(1, Math.round((selectionStyle.fontSize as number | undefined) || textObject.fontSize || 16)),
    fontWeightValue: resolveFontWeightOption(fontWeight),
    isBold: isBoldFontWeight(fontWeight),
    isItalic: fontStyle === 'italic',
    underline: Boolean(underline),
    linethrough: Boolean(linethrough),
    textAlign: textObject.textAlign || 'left',
    lineHeight: Number.isFinite(textObject.lineHeight) ? Number(textObject.lineHeight) : 1.16,
    charSpacing: Number.isFinite(textObject.charSpacing) ? Number(textObject.charSpacing) : 0,
    fill: toColorValue(textObject.fill, '#000000'),
    stroke: toColorValue(textObject.stroke, '#000000'),
    strokeWidth: Math.max(0, Number(textObject.strokeWidth) || 0),
  };
}

export function applyCharacterProperty(
  textObject: CharacterTextLike,
  property: CharacterProperty,
  value: string | number | boolean
): void {
  textObject.set(property, value);
}

export function toggleCharacterBold(textObject: CharacterTextLike): 'bold' | 'normal' {
  const nextWeight: 'bold' | 'normal' = isBoldFontWeight(textObject.fontWeight) ? 'normal' : 'bold';
  applyCharacterProperty(textObject, 'fontWeight', nextWeight);
  return nextWeight;
}

interface CharacterPanelProps {
  textObject: CharacterTextLike;
  onChange: (property: CharacterProperty, value: string | number | boolean) => void;
}

function parseNumberInput(rawValue: string, fallback: number): number {
  const nextValue = Number(rawValue);
  return Number.isFinite(nextValue) ? nextValue : fallback;
}

export function CharacterPanel({ textObject, onChange }: CharacterPanelProps): JSX.Element {
  const state = readCharacterPanelState(textObject);

  const setFontSize = (rawValue: string) => {
    const parsed = parseNumberInput(rawValue, state.fontSize);
    onChange('fontSize', clampNumber(parsed, 1, 999));
  };

  const setLineHeight = (rawValue: string) => {
    const parsed = parseNumberInput(rawValue, state.lineHeight);
    onChange('lineHeight', clampNumber(parsed, 0.5, 3));
  };

  const setCharSpacing = (rawValue: string) => {
    const parsed = parseNumberInput(rawValue, state.charSpacing);
    onChange('charSpacing', clampNumber(parsed, -200, 1000));
  };

  const setStrokeWidth = (rawValue: string) => {
    const parsed = parseNumberInput(rawValue, state.strokeWidth);
    onChange('strokeWidth', clampNumber(parsed, 0, 20));
  };

  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>Character</div>

      <div style={styles.row}>
        <label style={styles.field}>
          <span style={styles.label}>Font</span>
          <FontPicker value={state.fontFamily} onChange={(value) => onChange('fontFamily', value)} />
        </label>
        <label style={styles.field}>
          <span style={styles.label}>Weight</span>
          <select aria-label="Select option"
            value={state.fontWeightValue}
            onChange={(event) => onChange('fontWeight', Number(event.target.value))}
            style={styles.select}
          >
            {FONT_WEIGHT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={styles.styleRow}>
        <label style={styles.field}>
          <span style={styles.label}>Size</span>
          <input aria-label="Number input"
            type="number"
            min={1}
            max={999}
            step={1}
            value={state.fontSize}
            onChange={(event) => setFontSize(event.target.value)}
            style={styles.numberInput}
          />
        </label>
        <button
          type="button"
          style={{
            ...styles.toggleButton,
            ...(state.isBold ? styles.toggleButtonActive : {}),
          }}
          onClick={() => onChange('fontWeight', state.isBold ? 'normal' : 'bold')}
          aria-label="Toggle bold"
          aria-pressed={state.isBold}
        >
          B
        </button>
        <button
          type="button"
          style={{
            ...styles.toggleButton,
            ...(state.isItalic ? styles.toggleButtonActive : {}),
          }}
          onClick={() => onChange('fontStyle', state.isItalic ? 'normal' : 'italic')}
          aria-label="Toggle italic"
          aria-pressed={state.isItalic}
        >
          I
        </button>
        <button
          type="button"
          style={{
            ...styles.toggleButton,
            ...(state.underline ? styles.toggleButtonActive : {}),
          }}
          onClick={() => onChange('underline', !state.underline)}
          aria-label="Toggle underline"
          aria-pressed={state.underline}
        >
          U
        </button>
        <button
          type="button"
          style={{
            ...styles.toggleButton,
            ...(state.linethrough ? styles.toggleButtonActive : {}),
          }}
          onClick={() => onChange('linethrough', !state.linethrough)}
          aria-label="Toggle strikethrough"
          aria-pressed={state.linethrough}
        >
          S
        </button>
      </div>

      <div style={styles.alignGrid}>
        {ALIGN_OPTIONS.map((align) => (
          <button
            key={align}
            type="button"
            style={{
              ...styles.toggleButton,
              ...(state.textAlign === align ? styles.toggleButtonActive : {}),
            }}
            onClick={() => onChange('textAlign', align)}
            aria-label={`Text align ${align}`}
            aria-pressed={state.textAlign === align}
          >
            {align.charAt(0).toUpperCase() + align.slice(1)}
          </button>
        ))}
      </div>

      <div style={styles.rowSingle}>
        <label style={styles.field}>
          <span style={styles.label}>Line Height</span>
          <div style={styles.sliderRow}>
            <input aria-label="Range slider"
              type="range"
              min={0.5}
              max={3}
              step={0.1}
              value={state.lineHeight}
              onChange={(event) => setLineHeight(event.target.value)}
              style={styles.slider}
            />
            <input aria-label="Number input"
              type="number"
              min={0.5}
              max={3}
              step={0.1}
              value={state.lineHeight.toFixed(1)}
              onChange={(event) => setLineHeight(event.target.value)}
              style={styles.numberInput}
            />
          </div>
        </label>

        <label style={styles.field}>
          <span style={styles.label}>Character Spacing</span>
          <div style={styles.sliderRow}>
            <input aria-label="Range slider"
              type="range"
              min={-200}
              max={1000}
              step={1}
              value={state.charSpacing}
              onChange={(event) => setCharSpacing(event.target.value)}
              style={styles.slider}
            />
            <input aria-label="Number input"
              type="number"
              min={-200}
              max={1000}
              step={1}
              value={state.charSpacing}
              onChange={(event) => setCharSpacing(event.target.value)}
              style={styles.numberInput}
            />
          </div>
        </label>
      </div>

      <div style={styles.colorRow}>
        <label style={styles.field}>
          <span style={styles.label}>Fill</span>
          <input aria-label="Color picker"
            type="color"
            value={state.fill}
            onChange={(event) => onChange('fill', event.target.value)}
            style={styles.colorInput}
          />
        </label>
        <label style={styles.field}>
          <span style={styles.label}>Stroke</span>
          <input aria-label="Color picker"
            type="color"
            value={state.stroke}
            onChange={(event) => onChange('stroke', event.target.value)}
            style={styles.colorInput}
          />
        </label>
        <label style={styles.field}>
          <span style={styles.label}>Stroke Width</span>
          <input aria-label="Number input"
            type="number"
            min={0}
            max={20}
            step={0.1}
            value={state.strokeWidth}
            onChange={(event) => setStrokeWidth(event.target.value)}
            style={styles.numberInput}
          />
        </label>
      </div>
    </div>
  );
}

export default CharacterPanel;
