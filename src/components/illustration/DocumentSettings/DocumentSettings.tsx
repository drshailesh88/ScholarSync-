import { useEffect, useState } from 'react';
import {
  CANVAS_PRESETS,
  DEFAULT_CANVAS_BACKGROUND,
  getPresetDimensions,
  type CanvasOrientation,
  type CanvasPreset,
  type DocumentSettingsValue,
} from '@/lib/illustration/document-settings';

export interface DocumentSettingsProps {
  isOpen: boolean;
  initialWidth: number;
  initialHeight: number;
  initialBackgroundColor?: string;
  onConfirm: (settings: DocumentSettingsValue) => void;
  onCancel: () => void;
}

type NonCustomPresetId = Exclude<CanvasPreset['id'], 'custom'>;

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 1200,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  dialog: {
    width: '100%',
    maxWidth: '480px',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-primary)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
    color: 'var(--text-primary)',
    overflow: 'hidden',
  },
  header: {
    padding: '14px 16px',
    borderBottom: '1px solid var(--border-primary)',
    fontWeight: 600,
    fontSize: '14px',
  },
  body: {
    padding: '16px',
    display: 'grid',
    gap: '14px',
  },
  field: {
    display: 'grid',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  input: {
    width: '100%',
    borderRadius: '6px',
    border: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    padding: '8px 10px',
    fontSize: '13px',
  },
  select: {
    width: '100%',
    borderRadius: '6px',
    border: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    padding: '8px 10px',
    fontSize: '13px',
  },
  toggleRow: {
    display: 'flex',
    gap: '8px',
  },
  toggleButton: {
    flex: 1,
    borderRadius: '6px',
    border: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-secondary)',
    padding: '8px 10px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  toggleButtonActive: {
    backgroundColor: 'var(--accent-primary)',
    borderColor: 'var(--accent-primary)',
    color: '#ffffff',
  },
  colorInput: {
    width: '100%',
    height: '36px',
    borderRadius: '6px',
    border: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-primary)',
    padding: '4px',
    cursor: 'pointer',
  },
  footer: {
    padding: '12px 16px',
    borderTop: '1px solid var(--border-primary)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
  },
  button: {
    borderRadius: '6px',
    border: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    padding: '8px 12px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  primaryButton: {
    borderRadius: '6px',
    border: '1px solid var(--accent-primary)',
    backgroundColor: 'var(--accent-primary)',
    color: '#ffffff',
    padding: '8px 12px',
    fontSize: '12px',
    cursor: 'pointer',
  },
};

function detectPreset(width: number, height: number): {
  presetId: CanvasPreset['id'];
  orientation: CanvasOrientation;
} {
  for (const preset of CANVAS_PRESETS) {
    if (preset.id === 'custom') {
      continue;
    }

    if (width === preset.width && height === preset.height) {
      return { presetId: preset.id, orientation: 'portrait' };
    }

    if (width === preset.height && height === preset.width) {
      return { presetId: preset.id, orientation: 'landscape' };
    }
  }

  return { presetId: 'custom', orientation: width > height ? 'landscape' : 'portrait' };
}

export function DocumentSettings({
  isOpen,
  initialWidth,
  initialHeight,
  initialBackgroundColor = DEFAULT_CANVAS_BACKGROUND,
  onConfirm,
  onCancel,
}: DocumentSettingsProps): JSX.Element | null {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [presetId, setPresetId] = useState<CanvasPreset['id']>('custom');
  const [orientation, setOrientation] = useState<CanvasOrientation>('portrait');
  const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const detected = detectPreset(initialWidth, initialHeight);
    setWidth(initialWidth);
    setHeight(initialHeight);
    setPresetId(detected.presetId);
    setOrientation(detected.orientation);
    setBackgroundColor(initialBackgroundColor);
  }, [initialBackgroundColor, initialHeight, initialWidth, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handlePresetChange = (nextPresetId: CanvasPreset['id']) => {
    setPresetId(nextPresetId);

    if (nextPresetId === 'custom') {
      return;
    }

    const dimensions = getPresetDimensions(nextPresetId as NonCustomPresetId, orientation);
    setWidth(dimensions.width);
    setHeight(dimensions.height);
  };

  const handleOrientationChange = (nextOrientation: CanvasOrientation) => {
    if (nextOrientation === orientation) {
      return;
    }

    setOrientation(nextOrientation);
    setWidth(height);
    setHeight(width);
  };

  const handleConfirm = () => {
    onConfirm({
      width: Math.max(1, Math.round(width)),
      height: Math.max(1, Math.round(height)),
      backgroundColor,
    });
  };

  return (
    <div
      style={styles.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Document settings"
    >
      <div style={styles.dialog}>
        <div style={styles.header}>Document Settings</div>

        <div style={styles.body}>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="canvas-preset-select">Preset</label>
            <select aria-label="Preset"
              id="canvas-preset-select"
              style={styles.select}
              value={presetId}
              onChange={(event) => handlePresetChange(event.target.value as CanvasPreset['id'])}
            >
              {/* empty state: renders nothing when no data */}
              {CANVAS_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <span style={styles.label}>Orientation</span>
            <div style={styles.toggleRow}>
              <button
                type="button"
                style={{
                  ...styles.toggleButton,
                  ...(orientation === 'portrait' ? styles.toggleButtonActive : {}),
                }}
                onClick={() => handleOrientationChange('portrait')}
              >
                Portrait
              </button>
              <button
                type="button"
                style={{
                  ...styles.toggleButton,
                  ...(orientation === 'landscape' ? styles.toggleButtonActive : {}),
                }}
                onClick={() => handleOrientationChange('landscape')}
              >
                Landscape
              </button>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="canvas-width-input">Width (px)</label>
              <input aria-label="Width"
                id="canvas-width-input"
                type="number"
                min={1}
                value={width}
                style={styles.input}
                onChange={(event) => {
                  setPresetId('custom');
                  setWidth(Number(event.target.value));
                }}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="canvas-height-input">Height (px)</label>
              <input aria-label="Height"
                id="canvas-height-input"
                type="number"
                min={1}
                value={height}
                style={styles.input}
                onChange={(event) => {
                  setPresetId('custom');
                  setHeight(Number(event.target.value));
                }}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="canvas-background-input">Background Color</label>
            <input aria-label="Background color"
              id="canvas-background-input"
              type="color"
              value={backgroundColor}
              style={styles.colorInput}
              onChange={(event) => setBackgroundColor(event.target.value)}
            />
          </div>
        </div>

        <div style={styles.footer}>
          <button type="button" style={styles.button} onClick={onCancel}>Cancel</button>
          <button type="button" style={styles.primaryButton} onClick={handleConfirm}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default DocumentSettings;
