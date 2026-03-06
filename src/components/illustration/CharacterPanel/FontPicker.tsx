import React from 'react';

export interface FontOption {
  value: string;
  label: string;
}

export const FONT_FAMILY_OPTIONS: FontOption[] = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'system-ui', label: 'System UI' },
  { value: '-apple-system', label: 'Apple System' },
  { value: 'Segoe UI', label: 'Segoe UI' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'sans-serif', label: 'Sans Serif' },
  { value: 'serif', label: 'Serif' },
  { value: 'monospace', label: 'Monospace' },
];

interface FontPickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const styles: Record<string, React.CSSProperties> = {
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
};

export function FontPicker({ value, onChange, disabled = false }: FontPickerProps): JSX.Element {
  const hasExactOption = FONT_FAMILY_OPTIONS.some((option) => option.value === value);
  const options = hasExactOption || !value
    ? FONT_FAMILY_OPTIONS
    : [{ value, label: value }, ...FONT_FAMILY_OPTIONS];

  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      style={styles.select}
      aria-label="Font family"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default FontPicker;
