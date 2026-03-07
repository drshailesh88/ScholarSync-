"use client";

import { useState, useMemo, useRef } from "react";
import { Modal } from "@/components/ui/modal";
import { ColorPicker } from "./color-picker";
import { cn } from "@/lib/utils";
import { PRESET_THEMES, type ThemeConfig } from "@/types/presentation";
import { useSlidesStore } from "@/stores/slides-store";

interface CustomThemeBuilderProps {
  open: boolean;
  onClose: () => void;
}

const FONT_OPTIONS = [
  "Inter, sans-serif",
  "Arial, sans-serif",
  "Helvetica, sans-serif",
  "Times New Roman, serif",
  "Georgia, serif",
  "Palatino, serif",
  "Garamond, serif",
  "Courier New, monospace",
  "Montserrat, sans-serif",
  "Roboto, sans-serif",
  "Playfair Display, serif",
  "Merriweather, serif",
];

const FONT_SIZE_SCALES = [
  { value: "compact", label: "Compact" },
  { value: "default", label: "Default" },
  { value: "large", label: "Large" },
] as const;

const BORDER_RADIUS_OPTIONS: { value: NonNullable<ThemeConfig["borderRadius"]>; label: string; preview: string }[] = [
  { value: "none", label: "None", preview: "rounded-none" },
  { value: "sm", label: "SM", preview: "rounded-sm" },
  { value: "md", label: "MD", preview: "rounded-md" },
  { value: "lg", label: "LG", preview: "rounded-lg" },
  { value: "xl", label: "XL", preview: "rounded-xl" },
];

const SHADOW_OPTIONS: { value: NonNullable<ThemeConfig["shadowStyle"]>; label: string }[] = [
  { value: "none", label: "None" },
  { value: "subtle", label: "Subtle" },
  { value: "medium", label: "Medium" },
  { value: "dramatic", label: "Dramatic" },
];

const CARD_SPACING_OPTIONS: { value: NonNullable<ThemeConfig["cardSpacing"]>; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

const BORDER_STYLE_OPTIONS: { value: NonNullable<ThemeConfig["borderStyle"]>; label: string }[] = [
  { value: "none", label: "None" },
  { value: "subtle", label: "Subtle" },
  { value: "strong", label: "Strong" },
];

function defaultThemeConfig(): ThemeConfig {
  return {
    name: "",
    primaryColor: "#4F46E5",
    secondaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937",
    accentColor: "#06B6D4",
    surfaceColor: "#F8FAFC",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
    borderRadius: "md",
    shadowStyle: "subtle",
    cardSpacing: "comfortable",
    borderStyle: "subtle",
    borderColor: "#E2E8F0",
    codeBackground: "#1E1E2E",
    calloutBackground: "#F1F5F9",
    gradientFrom: "#4F46E5",
    gradientTo: "#7C3AED",
  };
}

function fontDisplayName(font: string): string {
  return font.split(",")[0].trim();
}

function ThemeColorField({
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
      <label className="text-[10px] text-ink-muted block">{label}</label>
      <ColorPicker
        value={value}
        onChange={onChange}
        themeColors={themeColors}
        placement="bottom"
      />
    </div>
  );
}

export function CustomThemeBuilder({ open, onClose }: CustomThemeBuilderProps) {
  const setTheme = useSlidesStore((s) => s.setTheme);
  const addCustomTheme = useSlidesStore((s) => s.addCustomTheme);

  const [config, setConfig] = useState<ThemeConfig>(defaultThemeConfig);
  const [themeName, setThemeName] = useState("");
  const [startFrom, setStartFrom] = useState("scratch");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState<"compact" | "default" | "large">("default");
  const themeIdCounter = useRef(0);

  const presetEntries = useMemo(() => Object.entries(PRESET_THEMES), []);
  const themeColors = useMemo(
    () => [
      config.primaryColor,
      config.secondaryColor,
      config.accentColor,
      config.textColor,
      config.backgroundColor,
    ],
    [
      config.accentColor,
      config.backgroundColor,
      config.primaryColor,
      config.secondaryColor,
      config.textColor,
    ],
  );

  const updateField = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleStartFromChange = (value: string) => {
    setStartFrom(value);
    if (value === "scratch") {
      setConfig(defaultThemeConfig());
      setThemeName("");
    } else {
      const preset = PRESET_THEMES[value];
      if (preset) {
        setConfig({ ...preset });
        setThemeName("");
      }
    }
  };

  const handleSave = () => {
    const name = themeName.trim();
    if (!name) {
      setNameError(true);
      return;
    }
    setNameError(false);
    const themeConfig: ThemeConfig = { ...config, name };
    themeIdCounter.current += 1;
    const key = `custom_${name.toLowerCase().replace(/\s+/g, "_")}_${themeIdCounter.current}`;
    addCustomTheme(key, themeConfig);
    setTheme(key, themeConfig);
    onClose();
    resetState();
  };

  const handleApplyWithoutSaving = () => {
    const name = themeName.trim() || "Untitled Custom";
    const themeConfig: ThemeConfig = { ...config, name };
    themeIdCounter.current += 1;
    setTheme(`custom_temp_${themeIdCounter.current}`, themeConfig);
    onClose();
    resetState();
  };

  const resetState = () => {
    setConfig(defaultThemeConfig());
    setThemeName("");
    setStartFrom("scratch");
    setShowAdvanced(false);
    setNameError(false);
    setFontSizeScale("default");
  };

  const handleClose = () => {
    onClose();
    resetState();
  };

  // Derive surface color from background if not set
  const effectiveSurface = config.surfaceColor || config.backgroundColor;

  return (
    <Modal open={open} onClose={handleClose} title="Custom Theme Builder" className="max-w-2xl max-h-[85vh] overflow-y-auto">
      {/* Start from preset */}
      <div className="mb-4">
        <label className="text-[10px] text-ink-muted uppercase tracking-wider mb-1 block">Start from</label>
        <select
          value={startFrom}
          onChange={(e) => handleStartFromChange(e.target.value)}
          className="w-full text-xs bg-surface-raised border border-border rounded-lg px-2 py-1.5 text-ink"
        >
          <option value="scratch">Start from scratch</option>
          {presetEntries.map(([key, preset]) => (
            <option key={key} value={key}>{preset.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-[1fr_200px] gap-4">
        {/* Left — Controls */}
        <div className="space-y-4">
          {/* Section 1: Colors */}
          <section>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">Colors</h3>
            <div className="grid grid-cols-2 gap-2">
              <ThemeColorField label="Primary" value={config.primaryColor} onChange={(c) => updateField("primaryColor", c)} themeColors={themeColors} />
              <ThemeColorField label="Secondary" value={config.secondaryColor} onChange={(c) => updateField("secondaryColor", c)} themeColors={themeColors} />
              <ThemeColorField label="Background" value={config.backgroundColor} onChange={(c) => updateField("backgroundColor", c)} themeColors={themeColors} />
              <ThemeColorField label="Text" value={config.textColor} onChange={(c) => updateField("textColor", c)} themeColors={themeColors} />
              <ThemeColorField label="Accent" value={config.accentColor} onChange={(c) => updateField("accentColor", c)} themeColors={themeColors} />
              <ThemeColorField label="Surface" value={config.surfaceColor ?? config.backgroundColor} onChange={(c) => updateField("surfaceColor", c)} themeColors={themeColors} />
            </div>
          </section>

          {/* Section 2: Typography */}
          <section>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">Typography</h3>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-ink-muted mb-0.5 block">Heading Font</label>
                <select
                  value={config.headingFontFamily ?? "Inter, sans-serif"}
                  onChange={(e) => updateField("headingFontFamily", e.target.value)}
                  className="w-full text-xs bg-surface-raised border border-border rounded-lg px-2 py-1.5 text-ink"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f} value={f}>{fontDisplayName(f)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-ink-muted mb-0.5 block">Body Font</label>
                <select
                  value={config.fontFamily ?? "Inter, sans-serif"}
                  onChange={(e) => updateField("fontFamily", e.target.value)}
                  className="w-full text-xs bg-surface-raised border border-border rounded-lg px-2 py-1.5 text-ink"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f} value={f}>{fontDisplayName(f)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-ink-muted mb-0.5 block">Font Size Scale</label>
                <div className="flex gap-1">
                  {FONT_SIZE_SCALES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setFontSizeScale(s.value)}
                      className={cn(
                        "flex-1 text-[10px] py-1 rounded-lg border transition-colors",
                        fontSizeScale === s.value
                          ? "bg-brand/10 border-brand text-brand"
                          : "border-border text-ink-muted hover:border-brand/40"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Style */}
          <section>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">Style</h3>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-ink-muted mb-0.5 block">Border Radius</label>
                <div className="flex gap-1">
                  {BORDER_RADIUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateField("borderRadius", opt.value)}
                      className={cn(
                        "flex-1 py-1 text-[10px] border transition-colors",
                        opt.preview,
                        config.borderRadius === opt.value
                          ? "bg-brand/10 border-brand text-brand"
                          : "border-border text-ink-muted hover:border-brand/40"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-ink-muted mb-0.5 block">Shadow Style</label>
                <div className="flex gap-1">
                  {SHADOW_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateField("shadowStyle", opt.value)}
                      className={cn(
                        "flex-1 text-[10px] py-1 rounded-lg border transition-colors",
                        config.shadowStyle === opt.value
                          ? "bg-brand/10 border-brand text-brand"
                          : "border-border text-ink-muted hover:border-brand/40"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-ink-muted mb-0.5 block">Card Spacing</label>
                <div className="flex gap-1">
                  {CARD_SPACING_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateField("cardSpacing", opt.value)}
                      className={cn(
                        "flex-1 text-[10px] py-1 rounded-lg border transition-colors",
                        config.cardSpacing === opt.value
                          ? "bg-brand/10 border-brand text-brand"
                          : "border-border text-ink-muted hover:border-brand/40"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Advanced (collapsible) */}
          <section>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-ink uppercase tracking-wider flex items-center gap-1"
            >
              <span className={cn("transition-transform inline-block", showAdvanced ? "rotate-90" : "")}>&#9654;</span>
              Advanced
            </button>
            {showAdvanced && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <ThemeColorField label="Code Background" value={config.codeBackground ?? "#1E1E2E"} onChange={(c) => updateField("codeBackground", c)} themeColors={themeColors} />
                <ThemeColorField label="Callout Background" value={config.calloutBackground ?? "#F1F5F9"} onChange={(c) => updateField("calloutBackground", c)} themeColors={themeColors} />
                <ThemeColorField label="Gradient From" value={config.gradientFrom ?? config.primaryColor} onChange={(c) => updateField("gradientFrom", c)} themeColors={themeColors} />
                <ThemeColorField label="Gradient To" value={config.gradientTo ?? config.secondaryColor} onChange={(c) => updateField("gradientTo", c)} themeColors={themeColors} />
                <ThemeColorField label="Border Color" value={config.borderColor ?? "#E2E8F0"} onChange={(c) => updateField("borderColor", c)} themeColors={themeColors} />
                <div>
                  <label className="text-[10px] text-ink-muted mb-0.5 block">Border Style</label>
                  <div className="flex gap-1">
                    {BORDER_STYLE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateField("borderStyle", opt.value)}
                        className={cn(
                          "flex-1 text-[10px] py-1 rounded-lg border transition-colors",
                          config.borderStyle === opt.value
                            ? "bg-brand/10 border-brand text-brand"
                            : "border-border text-ink-muted hover:border-brand/40"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right — Live Preview */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">Preview</h3>
          <div
            className="aspect-video rounded-lg border border-border overflow-hidden relative"
            style={{ backgroundColor: config.backgroundColor }}
          >
            {/* Accent bar */}
            <div className="h-1.5" style={{ background: `linear-gradient(to right, ${config.gradientFrom ?? config.primaryColor}, ${config.gradientTo ?? config.secondaryColor})` }} />
            <div className="p-3">
              <p
                className="font-bold leading-tight"
                style={{
                  color: config.primaryColor,
                  fontFamily: config.headingFontFamily ?? "Inter, sans-serif",
                  fontSize: fontSizeScale === "compact" ? 11 : fontSizeScale === "large" ? 15 : 13,
                }}
              >
                Sample Title
              </p>
              <p
                className="mt-1 leading-snug"
                style={{
                  color: config.textColor,
                  fontFamily: config.fontFamily ?? "Inter, sans-serif",
                  fontSize: fontSizeScale === "compact" ? 7 : fontSizeScale === "large" ? 10 : 8,
                }}
              >
                Body text preview with your chosen fonts and colors.
              </p>
              {/* Surface card */}
              <div
                className="mt-1.5 p-1.5 rounded"
                style={{
                  backgroundColor: effectiveSurface,
                  borderLeft: `2px solid ${config.accentColor}`,
                }}
              >
                <p
                  style={{
                    color: config.textColor,
                    fontFamily: config.fontFamily ?? "Inter, sans-serif",
                    fontSize: 7,
                    opacity: 0.8,
                  }}
                >
                  Accent callout block
                </p>
              </div>
              {/* Code block */}
              <div
                className="mt-1 px-1.5 py-0.5 rounded text-[6px] font-mono"
                style={{
                  backgroundColor: config.codeBackground ?? "#1E1E2E",
                  color: config.accentColor,
                }}
              >
                const x = 42;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="mb-3">
          <label className="text-[10px] text-ink-muted mb-0.5 block">Theme Name</label>
          <input
            type="text"
            value={themeName}
            onChange={(e) => { setThemeName(e.target.value); setNameError(false); }}
            placeholder="My Custom Theme"
            className={cn(
              "w-full text-xs bg-surface-raised border rounded-lg px-2 py-1.5 text-ink",
              nameError ? "border-red-500" : "border-border"
            )}
          />
          {nameError && <p className="text-[10px] text-red-500 mt-0.5">Theme name is required</p>}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="text-xs px-3 py-1.5 rounded-lg border border-border text-ink-muted hover:bg-surface-raised transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApplyWithoutSaving}
            className="text-xs px-3 py-1.5 rounded-lg border border-brand/30 text-brand hover:bg-brand/10 transition-colors"
          >
            Apply Without Saving
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="text-xs px-3 py-1.5 rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors"
          >
            Save as Custom Theme
          </button>
        </div>
      </div>
    </Modal>
  );
}
