"use client";

import { useState, useRef, useEffect } from "react";
import {
  PaperPlaneRight,
  CircleNotch,
  Check,
  Images,
  Sparkle,
  SquaresFour,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/stores/slides-store";
import type { ContentBlock } from "@/types/presentation";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Illustration Mode — FINNISH scientific illustration integration
// User can: generate AI diagrams, search icons, browse templates, or open full editor
// ---------------------------------------------------------------------------

type IllustrationSubTab = "generate" | "icons" | "templates";

interface IllustrationOption {
  label: string;
  description: string;
  svgContent: string;
  domain?: string;
  backend: string;
}

const ILLUSTRATION_DOMAINS = [
  { label: "Biology", value: "biology" },
  { label: "Chemistry", value: "chemistry" },
  { label: "Physics", value: "physics" },
  { label: "Medicine", value: "medicine" },
  { label: "Cardiology", value: "cardiology" },
  { label: "Neuroscience", value: "neuroscience" },
  { label: "General", value: "general" },
] as const;

const ICON_CATEGORIES = [
  "All", "Biology", "Chemistry", "Medicine", "Physics", "Math", "Engineering"
] as const;

export function IllustrationMode() {
  const router = useRouter();
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const updateSlide = useSlidesStore((s) => s.updateSlide);

  const [activeSubTab, setActiveSubTab] = useState<IllustrationSubTab>("generate");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<IllustrationOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("general");
  const [iconSearch, setIconSearch] = useState("");
  const [iconCategory, setIconCategory] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (options.length > 0) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [options]);

  async function handleGenerateIllustration(prompt?: string) {
    const text = prompt || input.trim();
    if (!text || loading) return;

    setLoading(true);
    setOptions([]);
    setSelectedIndex(null);

    try {
      const res = await fetch("/api/illustration/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          domain: selectedDomain,
          backend: "auto",
          slideContext: activeSlide
            ? JSON.stringify({
                title: activeSlide.title,
                contentBlocks: activeSlide.contentBlocks,
              })
            : "",
        }),
      });

      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();

      if (data.illustration) {
        setOptions([{
          label: data.illustration.caption || "Generated illustration",
          description: text,
          svgContent: data.illustration.svgContent || "",
          domain: data.illustration.domain,
          backend: data.illustration.backend || "svg",
        }]);
      }
    } catch (err) {
      console.error("Illustration generation error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleInsertHere(block: ContentBlock) {
    if (!activeSlide) return;

    const updatedBlocks = [...activeSlide.contentBlocks, block];
    updateSlide(activeSlide.id, { contentBlocks: updatedBlocks });
    setOptions([]);
    setInput("");
    setSelectedIndex(null);
  }

  function handleSelectOption(index: number) {
    setSelectedIndex(index);
    const option = options[index];
    if (option?.svgContent) {
      const block: ContentBlock = {
        type: "illustration",
        data: {
          svgContent: option.svgContent,
          caption: option.label,
          sourcePrompt: option.description,
          sourceBackend: option.backend as "svg" | "mermaid" | "ai-image" | "manual",
          domain: option.domain,
          alt: option.description,
        },
      };
      handleInsertHere(block);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sub-tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveSubTab("generate")}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t-lg transition-colors",
            activeSubTab === "generate"
              ? "bg-brand text-white"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <Sparkle size={16} />
          AI Generate
        </button>
        <button
          onClick={() => setActiveSubTab("icons")}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t-lg transition-colors",
            activeSubTab === "icons"
              ? "bg-brand text-white"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <Images size={16} />
          Icons
        </button>
        <button
          onClick={() => setActiveSubTab("templates")}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t-lg transition-colors",
            activeSubTab === "templates"
              ? "bg-brand text-white"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <SquaresFour size={16} />
          Templates
        </button>
      </div>

      {/* Sub-tab content */}
      <div className="flex-1 overflow-y-auto">
        {/* AI Generate Tab */}
        {activeSubTab === "generate" && (
          <div className="space-y-4 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe the illustration
              </label>
              <textarea aria-label="Text area"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., A diagram showing the process of photosynthesis with labeled components"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleGenerateIllustration();
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Domain
              </label>
              <div className="flex flex-wrap gap-2">
                {ILLUSTRATION_DOMAINS.map((domain) => (
                  <button
                    key={domain.value}
                    onClick={() => setSelectedDomain(domain.value)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full transition-colors",
                      selectedDomain === domain.value
                        ? "bg-brand text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {domain.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleGenerateIllustration()}
              disabled={loading || !input.trim()}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                loading || !input.trim()
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "bg-brand text-white hover:opacity-90"
              )}
            >
              {loading ? (
                <>
                  <CircleNotch size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <PaperPlaneRight size={18} />
                  Generate Illustration
                </>
              )}
            </button>

            {/* Generated options */}
            {options.length > 0 && (
              <div ref={scrollRef} className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-colors",
                      selectedIndex === index
                        ? "border-brand bg-brand/5"
                        : "border-gray-200 dark:border-gray-700 hover:border-brand/50"
                    )}
                    onClick={() => handleSelectOption(index)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{option.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{option.description}</p>
                        {option.domain && (
                          <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded mt-2">
                            {option.domain}
                          </span>
                        )}
                      </div>
                      {selectedIndex === index && (
                        <Check size={20} className="text-brand" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Icons Tab */}
        {activeSubTab === "icons" && (
          <div className="space-y-4 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search icons
              </label>
              <input aria-label="Text input"
                type="text"
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                placeholder="e.g., dna, microscope, heart..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {ICON_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setIconCategory(cat)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full transition-colors",
                      iconCategory === cat
                        ? "bg-brand text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Images size={48} className="mx-auto mb-2 opacity-50" />
              <p>Icon search coming soon</p>
              <p className="text-sm mt-1">Browse 1,500+ scientific icons</p>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeSubTab === "templates" && (
          <div className="space-y-4 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Domain templates
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ILLUSTRATION_DOMAINS.map((domain) => (
                  <button
                    key={domain.value}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand/50 transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">{domain.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {domain.value} templates
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <SquaresFour size={48} className="mx-auto mb-2 opacity-50" />
              <p>Template gallery coming soon</p>
              <p className="text-sm mt-1">68 domain-specific templates</p>
            </div>
          </div>
        )}
      </div>

      {/* Open Full Editor Link */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => router.push("/illustrate")}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand hover:text-brand transition-colors"
        >
          <ArrowSquareOut size={18} />
          Open Full Editor
        </button>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          Access the complete scientific illustration studio
        </p>
      </div>
    </div>
  );
}
