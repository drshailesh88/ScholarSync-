import React, { useMemo } from 'react';
import { GRADIENT_PRESETS } from '@/lib/illustration/gradient/gradient-utils';

interface GradientPresetsProps {
  activePresetId?: string | null;
  onSelectPreset: (presetId: string) => void;
}

const styles: Record<string, React.CSSProperties> = {
  root: {
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '6px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '6px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '11px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  buttonActive: {
    borderColor: 'var(--accent-primary)',
    backgroundColor: 'var(--bg-hover)',
  },
  swatch: {
    width: '48px',
    height: '16px',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.2)',
    flexShrink: 0,
  },
  customSwatch: {
    backgroundImage: [
      'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
      'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
    ].join(', '),
    backgroundSize: '12px 12px, 12px 12px',
    backgroundPosition: '0 0, 6px 6px',
    backgroundColor: 'var(--bg-secondary)',
  },
};

function toPreviewGradient(stops: Array<{ offset: number; color: string }>): string {
  if (stops.length === 0) {
    return 'linear-gradient(90deg, transparent, transparent)';
  }

  const stopsCss = [...stops]
    .sort((a, b) => a.offset - b.offset)
    .map((stop) => `${stop.color} ${(stop.offset * 100).toFixed(2)}%`)
    .join(', ');

  return `linear-gradient(90deg, ${stopsCss})`;
}

export function GradientPresets({ activePresetId = null, onSelectPreset }: GradientPresetsProps): JSX.Element {
  const previews = useMemo(
    () =>
      GRADIENT_PRESETS.map((preset) => ({
        ...preset,
        preview: toPreviewGradient(preset.stops),
      })),
    []
  );

  return (
    <div style={styles.root}>
      <div style={styles.label}>Presets</div>
      <div style={styles.grid}>
        {previews.map((preset) => {
          const isActive = activePresetId === preset.id;
          const isCustom = preset.id === 'custom';

          return (
            <button
              key={preset.id}
              type="button"
              style={{
                ...styles.button,
                ...(isActive ? styles.buttonActive : {}),
              }}
              onClick={() => onSelectPreset(preset.id)}
            >
              <span
                style={{
                  ...styles.swatch,
                  ...(isCustom
                    ? styles.customSwatch
                    : {
                        backgroundImage: preset.preview,
                      }),
                }}
              />
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GradientPresets;
