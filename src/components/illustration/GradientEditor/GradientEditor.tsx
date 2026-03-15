import React, { useEffect, useMemo, useState } from 'react';
import GradientBar from './GradientBar';
import GradientPresets from './GradientPresets';
import {
  applyGradientPreset,
  insertGradientStop,
  moveGradientStop,
  normalizeStops,
  removeGradientStop,
  type GradientEditorState,
  type GradientFillType,
  type GradientStop,
  updateGradientStopColor,
} from '@/lib/illustration/gradient/gradient-utils';

export interface GradientEditorProps {
  value: GradientEditorState;
  onChange: (value: GradientEditorState) => void;
}

const ANGLE_PRESETS = [0, 45, 90, 135, 180] as const;

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-secondary)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    fontWeight: 600,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  input: {
    width: '100%',
    height: '28px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    padding: '4px 6px',
    fontSize: '12px',
    minWidth: 0,
  },
  colorInput: {
    width: '36px',
    height: '28px',
    padding: 0,
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  smallInput: {
    width: '72px',
    height: '28px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    padding: '4px 6px',
    fontSize: '12px',
    textAlign: 'right',
  },
  button: {
    height: '28px',
    padding: '0 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '11px',
    cursor: 'pointer',
  },
  buttonDanger: {
    borderColor: 'rgba(248,113,113,0.5)',
    color: '#fca5a5',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  anglePresetRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
    gap: '4px',
  },
  angleButton: {
    height: '24px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)',
    fontSize: '11px',
    cursor: 'pointer',
  },
  angleButtonActive: {
    borderColor: 'var(--accent-primary)',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-hover)',
  },
};

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function normalizeEditorState(value: GradientEditorState): GradientEditorState {
  return {
    ...value,
    stops: normalizeStops(value.stops),
    angle: ((value.angle % 360) + 360) % 360,
    cx: clampPercent(value.cx),
    cy: clampPercent(value.cy),
  };
}

export function GradientEditor({ value, onChange }: GradientEditorProps): JSX.Element {
  const [selectedStopId, setSelectedStopId] = useState<string | null>(value.stops[0]?.id ?? null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const normalizedValue = useMemo(() => normalizeEditorState(value), [value]);

  useEffect(() => {
    if (!normalizedValue.stops.some((stop) => stop.id === selectedStopId)) {
      setSelectedStopId(normalizedValue.stops[0]?.id ?? null);
    }
  }, [normalizedValue.stops, selectedStopId]);

  const selectedStop = useMemo(
    () => normalizedValue.stops.find((stop) => stop.id === selectedStopId) ?? normalizedValue.stops[0] ?? null,
    [normalizedValue.stops, selectedStopId]
  );

  const updateStops = (nextStops: GradientStop[]) => {
    setActivePresetId(null);
    onChange({
      ...normalizedValue,
      stops: normalizeStops(nextStops),
    });
  };

  const handleStopAdd = (offset: number) => {
    const nextStops = insertGradientStop(normalizedValue.stops, offset);
    const inserted = nextStops.find((stop) => Math.abs(stop.offset - offset) < 0.0001) ?? nextStops[0];
    setSelectedStopId(inserted?.id ?? null);
    updateStops(nextStops);
  };

  const handleStopMove = (stopId: string, offset: number) => {
    updateStops(moveGradientStop(normalizedValue.stops, stopId, offset));
  };

  const handleStopColorChange = (color: string) => {
    if (!selectedStop) {
      return;
    }
    updateStops(updateGradientStopColor(normalizedValue.stops, selectedStop.id, color));
  };

  const handleStopDelete = () => {
    if (!selectedStop) {
      return;
    }
    const nextStops = removeGradientStop(normalizedValue.stops, selectedStop.id);
    if (nextStops.length === normalizedValue.stops.length) {
      return;
    }

    setSelectedStopId(nextStops[0]?.id ?? null);
    updateStops(nextStops);
  };

  const handleAngleChange = (angle: number) => {
    setActivePresetId(null);
    onChange({
      ...normalizedValue,
      angle: ((angle % 360) + 360) % 360,
    });
  };

  const handleCenterChange = (axis: 'cx' | 'cy', nextValue: number) => {
    setActivePresetId(null);
    onChange({
      ...normalizedValue,
      [axis]: clampPercent(nextValue),
    });
  };

  const handlePresetSelect = (presetId: string) => {
    setActivePresetId(presetId);
    const nextType: GradientFillType = normalizedValue.type;
    const next = applyGradientPreset(normalizedValue, presetId, nextType);
    setSelectedStopId(next.stops[0]?.id ?? null);
    onChange(next);
  };

  return (
    <div style={styles.panel}>
      <div style={styles.section}>
        <div style={styles.label}>Gradient Stops</div>
        <GradientBar
          stops={normalizedValue.stops}
          selectedStopId={selectedStop?.id ?? null}
          onSelectStop={setSelectedStopId}
          onAddStop={handleStopAdd}
          onMoveStop={handleStopMove}
        />
      </div>

      <div style={styles.section}>
        <div style={styles.row}>
          <input aria-label="Color picker"
            type="color"
            value={selectedStop?.color ?? '#000000'}
            onChange={(event) => handleStopColorChange(event.target.value)}
            style={styles.colorInput}
          />
          <input aria-label="Number input"
            type="number"
            min={0}
            max={100}
            step={1}
            value={Math.round((selectedStop?.offset ?? 0) * 100)}
            onChange={(event) => {
              if (!selectedStop) {
                return;
              }
              const percent = Number.parseFloat(event.target.value);
              if (Number.isNaN(percent)) {
                return;
              }
              handleStopMove(selectedStop.id, percent / 100);
            }}
            style={styles.smallInput}
          />
          <button
            type="button"
            onClick={handleStopDelete}
            disabled={normalizedValue.stops.length <= 2}
            style={{
              ...styles.button,
              ...styles.buttonDanger,
              ...(normalizedValue.stops.length <= 2 ? styles.buttonDisabled : {}),
            }}
            title="Delete selected stop"
          >
            Delete
          </button>
        </div>
      </div>

      {normalizedValue.type === 'linear' ? (
        <div style={styles.section}>
          <div style={styles.label}>Angle</div>
          <div style={styles.row}>
            <input aria-label="Range slider"
              type="range"
              min={0}
              max={360}
              step={1}
              value={normalizedValue.angle}
              onChange={(event) => handleAngleChange(Number.parseFloat(event.target.value) || 0)}
              style={{ ...styles.input, padding: 0 }}
            />
            <input aria-label="Number input"
              type="number"
              min={0}
              max={360}
              step={1}
              value={Math.round(normalizedValue.angle)}
              onChange={(event) => handleAngleChange(Number.parseFloat(event.target.value) || 0)}
              style={styles.smallInput}
            />
          </div>
          <div style={styles.anglePresetRow}>
            {/* empty state: renders nothing when no data */}
            {ANGLE_PRESETS.map((preset) => {
              const isActive = Math.round(normalizedValue.angle) === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  style={{
                    ...styles.angleButton,
                    ...(isActive ? styles.angleButtonActive : {}),
                  }}
                  onClick={() => handleAngleChange(preset)}
                >
                  {preset}°
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={styles.section}>
          <div style={styles.label}>Radial Center</div>
          <div style={styles.row}>
            <label style={{ ...styles.label, marginRight: 4, minWidth: 24 }}>CX</label>
            <input aria-label="Range slider"
              type="range"
              min={0}
              max={100}
              step={1}
              value={normalizedValue.cx}
              onChange={(event) => handleCenterChange('cx', Number.parseFloat(event.target.value) || 0)}
              style={{ ...styles.input, padding: 0 }}
            />
            <input aria-label="Number input"
              type="number"
              min={0}
              max={100}
              step={1}
              value={Math.round(normalizedValue.cx)}
              onChange={(event) => handleCenterChange('cx', Number.parseFloat(event.target.value) || 0)}
              style={styles.smallInput}
            />
          </div>
          <div style={styles.row}>
            <label style={{ ...styles.label, marginRight: 4, minWidth: 24 }}>CY</label>
            <input aria-label="Range slider"
              type="range"
              min={0}
              max={100}
              step={1}
              value={normalizedValue.cy}
              onChange={(event) => handleCenterChange('cy', Number.parseFloat(event.target.value) || 0)}
              style={{ ...styles.input, padding: 0 }}
            />
            <input aria-label="Number input"
              type="number"
              min={0}
              max={100}
              step={1}
              value={Math.round(normalizedValue.cy)}
              onChange={(event) => handleCenterChange('cy', Number.parseFloat(event.target.value) || 0)}
              style={styles.smallInput}
            />
          </div>
        </div>
      )}

      <GradientPresets activePresetId={activePresetId} onSelectPreset={handlePresetSelect} />
    </div>
  );
}

export default GradientEditor;
