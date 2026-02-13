"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, TextT, Columns, Export } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { mockSlides } from "@/lib/mock-data";
import type { MockSlide } from "@/lib/mock-data";

const themes = [
  { name: "Modern", color: "bg-indigo-500", textColor: "text-white" },
  { name: "Dark", color: "bg-slate-800", textColor: "text-white" },
  { name: "Thesis", color: "bg-stone-100", textColor: "text-stone-900" },
  { name: "Vibrant", color: "bg-sky-500", textColor: "text-white" },
];

export default function PresentationPage() {
  const [slides, setSlides] = useState<MockSlide[]>(mockSlides);
  const [activeSlideId, setActiveSlideId] = useState(slides[0]?.id);
  const [activeTheme, setActiveTheme] = useState(0);
  const [speakerNotes, setSpeakerNotes] = useState("");
  const [exporting, setExporting] = useState(false);

  const handleExportPptx = async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/export/pptx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Presentation",
          slides: slides.map((s) => ({ title: s.title, content: s.content })),
        }),
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Presentation.pptx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PPTX export error:", err);
    } finally {
      setExporting(false);
    }
  };

  const activeSlide = slides.find((s) => s.id === activeSlideId) || slides[0];
  const theme = themes[activeTheme];

  const addSlide = () => {
    const newSlide: MockSlide = {
      id: `slide_${Date.now()}`,
      title: "New Slide",
      content: "Click to add content",
    };
    setSlides((prev) => [...prev, newSlide]);
    setActiveSlideId(newSlide.id);
  };

  const updateSlide = (field: "title" | "content", value: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === activeSlideId ? { ...s, [field]: value } : s))
    );
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] -m-6 -mt-0">
      {/* Outline Sidebar */}
      <aside className="w-64 shrink-0 glass-panel border-r border-border flex flex-col p-4">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/studio" className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h2 className="font-semibold text-ink text-sm">Outline</h2>
          <button
            onClick={addSlide}
            className="ml-auto p-1.5 rounded-lg text-brand hover:bg-brand/10 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlideId(slide.id)}
              className={cn(
                "w-full rounded-lg overflow-hidden border-2 transition-all",
                activeSlideId === slide.id ? "border-brand ring-1 ring-brand/30" : "border-border hover:border-border"
              )}
            >
              <div className={cn("aspect-video p-2 flex items-center justify-center", theme.color)}>
                <p className={cn("text-[8px] font-medium truncate", theme.textColor)}>
                  {slide.title}
                </p>
              </div>
              <div className="p-1.5 bg-surface">
                <p className="text-[10px] text-ink-muted truncate">
                  {idx + 1}. {slide.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Slide Canvas */}
      <main className="flex-1 flex flex-col overflow-hidden bg-surface-raised/30">
        {/* Mini Toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border-subtle">
          <button className="p-1.5 rounded text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
            <TextT size={16} />
          </button>
          <button className="p-1.5 rounded text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
            <Columns size={16} />
          </button>
          <div className="flex-1" />
          <button
            onClick={handleExportPptx}
            disabled={exporting}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border transition-colors",
              exporting
                ? "text-ink-muted opacity-50 cursor-not-allowed"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
          >
            <Export size={14} />
            {exporting ? "Exporting..." : "Export PPTX"}
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <div
            className={cn(
              "w-full max-w-3xl aspect-video rounded-2xl shadow-xl flex flex-col items-center justify-center p-12 relative",
              theme.color
            )}
          >
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateSlide("title", e.currentTarget.textContent || "")}
              className={cn("text-3xl font-serif font-bold text-center mb-6 focus:outline-none focus:ring-2 focus:ring-white/20 rounded px-2", theme.textColor)}
            >
              {activeSlide?.title}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateSlide("content", e.currentTarget.textContent || "")}
              className={cn("text-sm text-center whitespace-pre-wrap opacity-80 focus:outline-none focus:ring-2 focus:ring-white/20 rounded px-2 max-w-lg", theme.textColor)}
            >
              {activeSlide?.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border-subtle flex items-center justify-between">
          <p className="text-[10px] text-ink-muted">Last saved 2m ago</p>
        </div>

        {/* Speaker Notes */}
        <div className="px-4 py-2 border-t border-border-subtle">
          <textarea
            value={speakerNotes}
            onChange={(e) => setSpeakerNotes(e.target.value)}
            placeholder="Add speaker notes..."
            className="w-full h-16 bg-transparent text-xs text-ink-muted placeholder:text-ink-muted resize-none focus:outline-none"
          />
        </div>
      </main>

      {/* Design Panel */}
      <aside className="w-72 shrink-0 glass-panel border-l border-border p-5 flex flex-col overflow-y-auto">
        <h3 className="text-sm font-semibold text-ink mb-4">Theme</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {themes.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActiveTheme(i)}
              className={cn(
                "rounded-xl overflow-hidden border-2 transition-all",
                activeTheme === i ? "border-brand ring-1 ring-brand/30" : "border-border hover:border-border"
              )}
            >
              <div className={cn("aspect-video flex items-center justify-center", t.color)}>
                <span className={cn("text-xs font-medium", t.textColor)}>{t.name}</span>
              </div>
            </button>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-ink mb-3">AI Tools</h3>
        <div className="space-y-2">
          <button className="w-full px-4 py-2.5 rounded-xl text-xs font-medium text-ink-muted border border-border hover:bg-surface-raised transition-colors text-left">
            Shorten Text
          </button>
          <button className="w-full px-4 py-2.5 rounded-xl text-xs font-medium text-ink-muted border border-border hover:bg-surface-raised transition-colors text-left">
            Suggest Image
          </button>
        </div>
      </aside>
    </div>
  );
}
