import React, { useEffect, useState } from 'react';

export interface FontOption {
  value: string;
  label: string;
}

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
  const [fontOptions, setFontOptions] = useState<FontOption[]>([
    { value: 'Arial', label: 'Arial' },
    { value: 'sans-serif', label: 'Sans Serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'monospace', label: 'Monospace' },
  ]);

  useEffect(() => {
    let cancelled = false;

    void import('./font-options').then((module) => {
      if (!cancelled) {
        setFontOptions(module.FONT_FAMILY_OPTIONS);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const hasExactOption = fontOptions.some((option) => option.value === value);
  const options = hasExactOption || !value
    ? fontOptions
    : [{ value, label: value }, ...fontOptions];

  return (
    <select aria-label="Select option"
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      style={styles.select}
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
