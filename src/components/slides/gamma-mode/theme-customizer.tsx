"use client";

import { useSlidesStore } from "@/stores/slides-store";
import { PRESET_THEMES, type ThemeConfig } from "@/types/presentation";
import { Check } from "@phosphor-icons/react";
import { ColorPicker } from "@/components/slides/shared/color-picker";

// ---------------------------------------------------------------------------
// Curated font list
// ---------------------------------------------------------------------------

const FONT_OPTIONS = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Playfair Display", value: "Playfair Display, serif" },
  { label: "Merriweather", value: "Merriweather, serif" },
  { label: "Source Sans 3", value: "Source Sans 3, sans-serif" },
  { label: "Lora", value: "Lora, serif" },
  { label: "Fira Sans", value: "Fira Sans, sans-serif" },
  { label: "Nunito", value: "Nunito, sans-serif" },
  { label: "Space Grotesk", value: "Space Grotesk, sans-serif" },
] as const;

// ---------------------------------------------------------------------------
// Segmented control helper
// ---------------------------------------------------------------------------

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T | undefined;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-lg border border-border overflow-hidden" role="radiogroup">
      {/* empty state: renders nothing when no data */}
      {options.map((opt) => (
        <button
          key={opt.value}
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 px-2 py-1 text-[11px] font-medium transition-colors ${
            value === opt.value
              ? "bg-brand text-white"
              : "bg-surface text-ink-muted hover:bg-surface-raised"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Color picker row
// ---------------------------------------------------------------------------

function ColorField({
  label,
  value,
  onChange,
  themeColors,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
  themeColors: string[];
}) {
  return (
    <div className="space-y-1">
      <span className="block text-[11px] text-ink-muted">{label}</span>
      <ColorPicker
        value={value}
        onChange={onChange}
        themeColors={themeColors}
        placement="left"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mini theme swatch (reuses the pattern from gamma-toolbar)
// ---------------------------------------------------------------------------

function ThemeSwatch({
  themeKey,
  isActive,
  onClick,
}: {
  themeKey: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const theme = PRESET_THEMES[themeKey];
  return (
    <button
      onClick={onClick}
      title={theme.name}
      aria-label={`${theme.name} theme${isActive ? " (selected)" : ""}`}
      className={`relative rounded-md overflow-hidden border-2 transition-all hover:scale-105 ${
        isActive ? "border-brand ring-1 ring-brand" : "border-border"
      }`}
      style={{ width: 64, height: 36 }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: theme.backgroundColor }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: theme.primaryColor }}
      />
      <div className="absolute left-2 top-3 flex flex-col gap-1">
        <div
          className="h-1 w-8 rounded-full"
          style={{ backgroundColor: theme.textColor, opacity: 0.6 }}
        />
        <div
          className="h-0.5 w-10 rounded-full"
          style={{ backgroundColor: theme.textColor, opacity: 0.3 }}
        />
        <div
          className="h-0.5 w-6 rounded-full"
          style={{ backgroundColor: theme.textColor, opacity: 0.3 }}
        />
      </div>
      {isActive && (
        <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-brand flex items-center justify-center">
          <Check size={8} weight="bold" className="text-white" />
        </div>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Section heading
// ---------------------------------------------------------------------------

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mt-3 mb-1.5 first:mt-0">
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// ThemeCustomizer — main export
// ---------------------------------------------------------------------------

const THEME_KEYS = Object.keys(PRESET_THEMES);

export function ThemeCustomizer() {
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const setTheme = useSlidesStore((s) => s.setTheme);
  const themeColors = [
    themeConfig.primaryColor,
    themeConfig.secondaryColor,
    themeConfig.accentColor,
    themeConfig.textColor,
    themeConfig.backgroundColor,
  ];

  // Helper: update a single field on the current theme (marks key as "custom")
  function updateField<K extends keyof ThemeConfig>(
    field: K,
    value: ThemeConfig[K],
  ) {
    const updated = { ...themeConfig, [field]: value };
    setTheme("custom", updated);
  }

  return (
    <div className="flex flex-col gap-0.5 max-h-[70vh] overflow-y-auto pr-1 -mr-1">
      {/* ---- Preset themes ---- */}
      <SectionHeading>Presets</SectionHeading>
      <div className="grid grid-cols-4 gap-2">
        {THEME_KEYS.map((key) => (
          <ThemeSwatch
            key={key}
            themeKey={key}
            isActive={key === themeKey}
            onClick={() => setTheme(key, PRESET_THEMES[key])}
          />
        ))}
      </div>

      {/* ---- Colors ---- */}
      <SectionHeading>Colors</SectionHeading>
      <div className="flex flex-col gap-1.5">
        <ColorField
          label="Primary"
          value={themeConfig.primaryColor}
          onChange={(c) => updateField("primaryColor", c)}
          themeColors={themeColors}
        />
        <ColorField
          label="Background"
          value={themeConfig.backgroundColor}
          onChange={(c) => updateField("backgroundColor", c)}
          themeColors={themeColors}
        />
        <ColorField
          label="Text"
          value={themeConfig.textColor}
          onChange={(c) => updateField("textColor", c)}
          themeColors={themeColors}
        />
        <ColorField
          label="Accent"
          value={themeConfig.accentColor}
          onChange={(c) => updateField("accentColor", c)}
          themeColors={themeColors}
        />
      </div>

      {/* ---- Fonts ---- */}
      <SectionHeading>Fonts</SectionHeading>
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-ink-muted">Heading</span>
          <select aria-label="Select option"
            value={themeConfig.headingFontFamily ?? "Inter, sans-serif"}
            onChange={(e) => updateField("headingFontFamily", e.target.value)}
            className="text-[11px] bg-surface border border-border rounded px-1.5 py-1 text-ink w-[140px]"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-ink-muted">Body</span>
          <select aria-label="Select option"
            value={themeConfig.fontFamily ?? "Inter, sans-serif"}
            onChange={(e) => updateField("fontFamily", e.target.value)}
            className="text-[11px] bg-surface border border-border rounded px-1.5 py-1 text-ink w-[140px]"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* ---- Roundness ---- */}
      <SectionHeading>Roundness</SectionHeading>
      <SegmentedControl
        options={[
          { label: "None", value: "none" as const },
          { label: "Sm", value: "sm" as const },
          { label: "Md", value: "md" as const },
          { label: "Lg", value: "lg" as const },
          { label: "Xl", value: "xl" as const },
        ]}
        value={themeConfig.borderRadius ?? "md"}
        onChange={(v) => updateField("borderRadius", v)}
      />

      {/* ---- Borders ---- */}
      <SectionHeading>Borders</SectionHeading>
      <SegmentedControl
        options={[
          { label: "None", value: "none" as const },
          { label: "Subtle", value: "subtle" as const },
          { label: "Strong", value: "strong" as const },
        ]}
        value={themeConfig.borderStyle ?? "subtle"}
        onChange={(v) => updateField("borderStyle", v)}
      />

      {/* ---- Shadows ---- */}
      <SectionHeading>Shadows</SectionHeading>
      <SegmentedControl
        options={[
          { label: "None", value: "none" as const },
          { label: "Subtle", value: "subtle" as const },
          { label: "Medium", value: "medium" as const },
          { label: "Dramatic", value: "dramatic" as const },
        ]}
        value={themeConfig.shadowStyle ?? "subtle"}
        onChange={(v) => updateField("shadowStyle", v)}
      />

      {/* ---- Card Spacing ---- */}
      <SectionHeading>Card Spacing</SectionHeading>
      <SegmentedControl
        options={[
          { label: "Compact", value: "compact" as const },
          { label: "Comfortable", value: "comfortable" as const },
          { label: "Spacious", value: "spacious" as const },
        ]}
        value={themeConfig.cardSpacing ?? "comfortable"}
        onChange={(v) => updateField("cardSpacing", v)}
      />
    </div>
  );
}
