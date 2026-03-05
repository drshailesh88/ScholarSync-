/**
 * Properties Panel Component
 *
 * Displays and edits properties of currently selected canvas objects.
 * Supports different object types with type-specific controls.
 *
 * @module components/PropertiesPanel
 */

/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback } from 'react';
import {
  Rect,
  Ellipse,
  Line,
  IText,
  Textbox,
  Group,
  FabricObject,
  Image as FabricImage,
} from 'fabric';
import { useCanvas } from '@/components/illustration/Canvas/CanvasContext';

// ============================================================================
// TYPES
// ============================================================================

export interface PropertiesPanelProps {
  selectedObjects?: FabricObject[];
}

interface PropertySectionProps {
  title: string;
  children: React.ReactNode;
}

interface PropertyRowProps {
  label: string;
  children: React.ReactNode;
}

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
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
    height: '100%',
    overflowY: 'auto' as const,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    color: 'var(--text-muted)',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '48px',
    height: '48px',
    marginBottom: '12px',
    opacity: 0.4,
  },
  emptyText: {
    fontSize: '12px',
    lineHeight: 1.5,
  },
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
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  rowLabel: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    minWidth: '60px',
    flexShrink: 0,
  },
  rowContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  input: {
    width: '100%',
    padding: '6px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    minWidth: 0,
  },
  numberInput: {
    width: '60px',
    padding: '4px 6px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    textAlign: 'center',
  },
  slider: {
    flex: 1,
    height: '4px',
  },
  colorInput: {
    width: '32px',
    height: '28px',
    padding: '0',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  select: {
    width: '100%',
    padding: '6px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
  },
  button: {
    padding: '6px 12px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  buttonHover: {
    backgroundColor: 'var(--bg-hover)',
  },
  toggleButton: {
    padding: '4px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '11px',
    cursor: 'pointer',
  },
  toggleButtonActive: {
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
    borderColor: 'var(--accent-primary)',
  },
};

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

function PropertySection({ title, children }: PropertySectionProps): JSX.Element {
  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

function PropertyRow({ label, children }: PropertyRowProps): JSX.Element {
  return (
    <div style={styles.row}>
      <div style={styles.rowLabel}>{label}</div>
      <div style={styles.rowContent}>{children}</div>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
}: NumberInputProps): JSX.Element {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      style={styles.numberInput}
    />
  );
}

function SliderInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}: SliderProps): JSX.Element {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      style={styles.slider}
    />
  );
}

function ColorInput({
  value,
  onChange,
  disabled = false,
}: { value: string; onChange: (value: string) => void; disabled?: boolean }): JSX.Element {
  return (
    <input
      type="color"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={styles.colorInput}
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
  disabled = false,
}: SelectProps): JSX.Element {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={styles.select}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// ============================================================================
// FONT FAMILIES
// ============================================================================

const FONT_FAMILIES = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Inter', label: 'Inter' },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PropertiesPanel({ selectedObjects = [] }: PropertiesPanelProps): JSX.Element {
  const canvas = useCanvas().canvas;
  const activeObject = selectedObjects[0] ?? null;
  const objectType = activeObject?.type;
  const isMultiple = selectedObjects.length > 1;

  // ============================================================================
  // PROPERTY CHANGE HANDLERS
  // ============================================================================

  const updateProperty = useCallback(
    (property: string, value: unknown) => {
      if (!canvas || !activeObject) return;

      activeObject.set(property as any, value);
      activeObject.setCoords();
      canvas.requestRenderAll();
      canvas.fire('object:modified', { target: activeObject });
    },
    [canvas, activeObject]
  );

  const updateMultipleProperties = useCallback(
    (updates: Record<string, unknown>) => {
      if (!canvas) return;

      for (const obj of selectedObjects) {
        for (const [prop, value] of Object.entries(updates)) {
          obj.set(prop as any, value);
        }
        obj.setCoords();
      }
      canvas.requestRenderAll();
    },
    [canvas, selectedObjects]
  );

  // Empty state
  if (selectedObjects.length === 0 || !activeObject) {
    return (
      <div style={styles.emptyState}>
        <svg
          style={styles.emptyIcon}
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <div style={styles.emptyText}>Select an object to edit its properties</div>
      </div>
    );
  }

  // ============================================================================
  // COMMON PROPERTIES (shown for all objects)
  // ============================================================================

  const renderCommonProperties = () => {
    if (!activeObject) return null;

    const bound = activeObject.getBoundingRect();
    const angle = activeObject.angle || 0;
    const opacity = activeObject.opacity ?? 1;
    const isLocked = activeObject.lockMovementX && activeObject.lockMovementY;

    return (
      <>
        <PropertySection title="Position">
          <PropertyRow
            label="X"
            children={
              <NumberInput
                value={Math.round(bound.left)}
                onChange={(v) => updateProperty('left', v)}
              />
            }
          />
          <PropertyRow
            label="Y"
            children={
              <NumberInput
                value={Math.round(bound.top)}
                onChange={(v) => updateProperty('top', v)}
              />
            }
          />
        </PropertySection>

        <PropertySection title="Size">
          <PropertyRow
            label="Width"
            children={
              <NumberInput
                value={Math.round(bound.width)}
                min={1}
                onChange={(v) => {
                  if (activeObject instanceof Rect || activeObject instanceof Ellipse) {
                    updateProperty('width', v);
                  }
                }}
              />
            }
          />
          <PropertyRow
            label="Height"
            children={
              <NumberInput
                value={Math.round(bound.height)}
                min={1}
                onChange={(v) => {
                  if (activeObject instanceof Rect || activeObject instanceof Ellipse) {
                    updateProperty('height', v);
                  }
                }}
              />
            }
          />
        </PropertySection>

        <PropertySection title="Transform">
          <PropertyRow
            label="Rotation"
            children={
              <>
                <SliderInput
                  value={Math.round(angle)}
                  min={0}
                  max={360}
                  step={1}
                  onChange={(v) => updateProperty('angle', v * Math.PI / 180)}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '30px' }}>
                  {Math.round(angle)}°
                </span>
              </>
            }
          />
          <PropertyRow
            label="Opacity"
            children={
              <>
                <SliderInput
                  value={opacity * 100}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(v) => updateProperty('opacity', v / 100)}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '30px' }}>
                  {Math.round(opacity * 100)}%
                </span>
              </>
            }
          />
        </PropertySection>

        <PropertySection title="Actions">
          <button
            style={{
              ...styles.button,
              ...(isLocked ? styles.toggleButtonActive : {}),
            }}
            onClick={() => {
              const newLockState = !isLocked;
              updateMultipleProperties({
                lockMovementX: newLockState,
                lockMovementY: newLockState,
                lockRotation: newLockState,
                lockScalingX: newLockState,
                lockScalingY: newLockState,
              });
            }}
          >
            {isLocked ? '🔒 Unlock' : '🔓 Lock'}
          </button>
        </PropertySection>
      </>
    );
  };

  // ============================================================================
  // SHAPE-SPECIFIC PROPERTIES
  // ============================================================================

  const renderShapeProperties = () => {
    const fill = (activeObject as any).fill;
    const stroke = (activeObject as any).stroke;
    const strokeWidth = (activeObject as any).strokeWidth || 0;
    const rx = (activeObject as Rect)?.rx || 0;
    const strokeDashArray = (activeObject as any).strokeDashArray;

    return (
      <>
        <PropertySection title="Appearance">
          <PropertyRow
            label="Fill"
            children={<ColorInput value={typeof fill === 'string' ? fill : '#000000'} onChange={(v) => updateProperty('fill', v)} />}
          />
          <PropertyRow
            label="Stroke"
            children={<ColorInput value={typeof stroke === 'string' ? stroke : '#000000'} onChange={(v) => updateProperty('stroke', v)} />}
          />
        </PropertySection>

        <PropertySection title="Stroke">
          <PropertyRow
            label="Width"
            children={
              <>
                <SliderInput
                  value={strokeWidth}
                  min={0}
                  max={10}
                  step={0.5}
                  onChange={(v) => updateProperty('strokeWidth', v)}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '30px' }}>
                  {Math.round(strokeWidth)}px
                </span>
              </>
            }
          />
          <PropertyRow
            label="Style"
            children={
              <SelectInput
                value={
                  !strokeDashArray
                    ? 'solid'
                    : strokeDashArray[0] === 10 && strokeDashArray[1] === 5
                    ? 'dashed'
                    : 'dotted'
                }
                onChange={(v) => {
                  if (v === 'solid') {
                    updateProperty('strokeDashArray', null);
                  } else if (v === 'dashed') {
                    updateProperty('strokeDashArray', [10, 5]);
                  } else if (v === 'dotted') {
                    updateProperty('strokeDashArray', [2, 2]);
                  }
                }}
                options={[
                  { value: 'solid', label: 'Solid' },
                  { value: 'dashed', label: 'Dashed' },
                  { value: 'dotted', label: 'Dotted' },
                ]}
              />
            }
          />
        </PropertySection>

        {activeObject instanceof Rect && (
          <PropertySection title="Corner Radius">
            <PropertyRow
              label="Radius"
              children={
                <>
                  <SliderInput
                    value={rx}
                    min={0}
                    max={100}
                    onChange={(v) => updateProperty('rx', v)}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '30px' }}>
                    {Math.round(rx)}px
                  </span>
                </>
              }
            />
          </PropertySection>
        )}
      </>
    );
  };

  // ============================================================================
  // LINE PROPERTIES
  // ============================================================================

  const renderLineProperties = () => {
    if (!(activeObject instanceof Line)) return null;

    const stroke = (activeObject as Line).stroke || '#000000';
    const strokeWidth = (activeObject as Line).strokeWidth || 1;
    const strokeDashArray = (activeObject as Line).strokeDashArray;

    return (
      <>
        <PropertySection title="Appearance">
          <PropertyRow
            label="Color"
            children={<ColorInput value={typeof stroke === 'string' ? stroke : '#000000'} onChange={(v) => updateProperty('stroke', v)} />}
          />
        </PropertySection>

        <PropertySection title="Stroke">
          <PropertyRow
            label="Width"
            children={
              <>
                <SliderInput
                  value={strokeWidth}
                  min={0.5}
                  max={20}
                  step={0.5}
                  onChange={(v) => updateProperty('strokeWidth', v)}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '30px' }}>
                  {strokeWidth}px
                </span>
              </>
            }
          />
          <PropertyRow
            label="Style"
            children={
              <SelectInput
                value={
                  !strokeDashArray
                    ? 'solid'
                    : strokeDashArray[0] === 10 && strokeDashArray[1] === 5
                    ? 'dashed'
                    : 'dotted'
                }
                onChange={(v) => {
                  if (v === 'solid') {
                    updateProperty('strokeDashArray', undefined as any);
                  } else if (v === 'dashed') {
                    updateProperty('strokeDashArray', [10, 5]);
                  } else if (v === 'dotted') {
                    updateProperty('strokeDashArray', [2, 2]);
                  }
                }}
                options={[
                  { value: 'solid', label: 'Solid' },
                  { value: 'dashed', label: 'Dashed' },
                  { value: 'dotted', label: 'Dotted' },
                ]}
              />
            }
          />
        </PropertySection>
      </>
    );
  };

  // ============================================================================
  // TEXT PROPERTIES
  // ============================================================================

  const renderTextProperties = () => {
    if (!(activeObject instanceof IText) && !(activeObject instanceof Textbox)) return null;

    const text = activeObject as IText;
    const fontFamily = text.fontFamily || 'Arial';
    const fontSize = text.fontSize || 16;
    const fill = text.fill || '#000000';
    const fontWeight = text.fontWeight || 'normal';
    const fontStyle = text.fontStyle || 'normal';
    const underline = text.underline || false;
    const linethrough = text.linethrough || false;
    const textAlign = text.textAlign || 'left';
    const lineHeight = text.lineHeight || 1.0;

    return (
      <>
        <PropertySection title="Font">
          <PropertyRow
            label="Family"
            children={
              <SelectInput
                value={fontFamily}
                onChange={(v) => updateProperty('fontFamily', v)}
                options={FONT_FAMILIES}
              />
            }
          />
          <PropertyRow
            label="Size"
            children={
              <>
                <NumberInput
                  value={Math.round(fontSize)}
                  min={8}
                  max={144}
                  onChange={(v) => updateProperty('fontSize', v)}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>px</span>
              </>
            }
          />
          <PropertyRow
            label="Color"
            children={<ColorInput value={typeof fill === 'string' ? fill : '#000000'} onChange={(v) => updateProperty('fill', v)} />}
          />
        </PropertySection>

        <PropertySection title="Style">
          <PropertyRow
            label=""
            children={
              <>
                <button
                  style={{
                    ...styles.toggleButton,
                    ...(fontWeight === 'bold' ? styles.toggleButtonActive : {}),
                  }}
                  onClick={() => updateProperty('fontWeight', fontWeight === 'bold' ? 'normal' : 'bold')}
                >
                  <strong>B</strong>
                </button>
                <button
                  style={{
                    ...styles.toggleButton,
                    ...(fontStyle === 'italic' ? styles.toggleButtonActive : {}),
                  }}
                  onClick={() => updateProperty('fontStyle', fontStyle === 'italic' ? 'normal' : 'italic')}
                >
                  <em>I</em>
                </button>
                <button
                  style={{
                    ...styles.toggleButton,
                    ...(underline ? styles.toggleButtonActive : {}),
                  }}
                  onClick={() => updateProperty('underline', !underline)}
                >
                  <u>U</u>
                </button>
                <button
                  style={{
                    ...styles.toggleButton,
                    ...(linethrough ? styles.toggleButtonActive : {}),
                  }}
                  onClick={() => updateProperty('linethrough', !linethrough)}
                >
                  <s>S</s>
                </button>
              </>
            }
          />
          <PropertyRow
            label="Align"
            children={
              <>
                {['left', 'center', 'right'].map((align) => (
                  <button
                    key={align}
                    style={{
                      ...styles.toggleButton,
                      ...(textAlign === align ? styles.toggleButtonActive : {}),
                    }}
                    onClick={() => updateProperty('textAlign', align)}
                  >
                    {align === 'left' ? '⇤' : align === 'center' ? '⇔' : '⥥'}
                  </button>
                ))}
              </>
            }
          />
        </PropertySection>

        <PropertySection title="Spacing">
          <PropertyRow
            label="Line Ht"
            children={
              <>
                <SliderInput
                  value={lineHeight}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(v) => updateProperty('lineHeight', v)}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '30px' }}>
                  {lineHeight.toFixed(1)}
                </span>
              </>
            }
          />
        </PropertySection>
      </>
    );
  };

  // ============================================================================
  // GROUP PROPERTIES
  // ============================================================================

  const renderGroupProperties = () => {
    if (!(activeObject instanceof Group)) return null;

    return (
      <PropertySection title="Group">
        <button
          style={styles.button}
          onClick={() => {
            if (!canvas) return;
            const items = (activeObject as Group).getObjects();
            canvas.discardActiveObject();
            canvas.remove(activeObject);

            items.forEach((item: FabricObject) => {
              canvas.add(item);
            });

            canvas.requestRenderAll();
          }}
        >
          Ungroup
        </button>
      </PropertySection>
    );
  };

  // ============================================================================
  // IMAGE PROPERTIES
  // ============================================================================

  const renderImageProperties = () => {
    if (!(activeObject instanceof FabricImage)) return null;

    const bound = activeObject.getBoundingRect();

    return (
      <PropertySection title="Image">
        <PropertyRow
          label="Width"
          children={<span style={{ fontSize: '12px' }}>{Math.round(bound.width)}px</span>}
        />
        <PropertyRow
          label="Height"
          children={<span style={{ fontSize: '12px' }}>{Math.round(bound.height)}px</span>}
        />
        <PropertyRow
          label="Aspect"
          children={
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {(bound.width / bound.height).toFixed(2)}
            </span>
          }
        />
      </PropertySection>
    );
  };

  // ============================================================================
  // RENDER CONTENT
  // ============================================================================

  const renderContent = () => {
    if (isMultiple) {
      return (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>
            {selectedObjects.length} objects selected
          </p>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Common properties shown below
          </p>
        </div>
      );
    }

    switch (objectType) {
      case 'rect':
      case 'ellipse':
      case 'polygon':
        return (
          <>
            {renderCommonProperties()}
            {renderShapeProperties()}
          </>
        );
      case 'line':
        return (
          <>
            {renderCommonProperties()}
            {renderLineProperties()}
          </>
        );
      case 'i-text':
      case 'textbox':
        return (
          <>
            {renderCommonProperties()}
            {renderTextProperties()}
          </>
        );
      case 'group':
        return (
          <>
            {renderCommonProperties()}
            {renderGroupProperties()}
          </>
        );
      case 'image':
        return (
          <>
            {renderCommonProperties()}
            {renderImageProperties()}
          </>
        );
      default:
        return (
          <>
            {renderCommonProperties()}
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>
                No editable properties for this object type
              </p>
            </div>
          </>
        );
    }
  };

  return <div style={styles.panel}>{renderContent()}</div>;
}
