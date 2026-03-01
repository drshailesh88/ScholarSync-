"use client";

import { useState, useRef, useEffect } from "react";
import { PaperPlaneRight, CircleNotch, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/stores/slides-store";
import { SlideRendererV2 } from "../shared/slide-renderer-v2";
import { SlideThumbnail } from "../shared/slide-thumbnail";
import { ModeSelector } from "../mode-selector";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  "Add a new slide about...",
  "Make this slide more visual",
  "Restyle the entire deck",
  "Add citations to all slides",
  "Restructure the deck",
  "Simplify the language",
];

export function ChatModeLayout() {
  const mode = useSlidesStore((s) => s.mode);
  const setMode = useSlidesStore((s) => s.setMode);
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const deckId = useSlidesStore((s) => s.deckId);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const setIsPresenting = useSlidesStore((s) => s.setIsPresenting);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading || !deckId) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/slides/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deckId,
          message: userMsg.content,
          slides: slides.map((s) => ({
            id: s.id,
            title: s.title,
            contentBlocks: s.contentBlocks,
            speakerNotes: s.speakerNotes,
          })),
          activeSlideId,
          audienceType,
        }),
      });

      if (!res.ok) throw new Error("Chat failed");

      const data = await res.json();

      // Apply any slide modifications
      if (data.modifiedSlides && Array.isArray(data.modifiedSlides)) {
        const store = useSlidesStore.getState();
        for (const mod of data.modifiedSlides) {
          store.updateSlide(mod.slideId, {
            contentBlocks: mod.contentBlocks,
            ...(mod.speakerNotes && { speakerNotes: mod.speakerNotes }),
            ...(mod.title && { title: mod.title }),
          });
        }
      }

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.summary ?? data.text ?? "Done!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Navigate slides
  const activeIndex = slides.findIndex((s) => s.id === activeSlideId);
  const prevSlide = () => {
    if (activeIndex > 0) setActiveSlide(slides[activeIndex - 1].id);
  };
  const nextSlide = () => {
    if (activeIndex < slides.length - 1) setActiveSlide(slides[activeIndex + 1].id);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-surface">
        <ModeSelector mode={mode} onModeChange={setMode} />
        <div className="flex-1" />
        <button
          onClick={() => setIsPresenting(true)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          Present
        </button>
      </div>

      {/* Main: Chat left, Preview right */}
      <div className="flex-1 flex min-h-0">
        {/* Chat panel */}
        <div className="w-[400px] shrink-0 flex flex-col border-r border-border bg-surface">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Sparkle size={24} className="text-brand/40 mx-auto mb-3" />
                <p className="text-sm text-ink-muted mb-4">
                  Describe what you want and I&apos;ll build it
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action}
                      onClick={() => setInput(action)}
                      className="px-3 py-1.5 rounded-full border border-border text-xs text-ink-muted hover:text-brand hover:border-brand/40 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-brand text-white"
                      : "bg-surface-raised text-ink border border-border"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface-raised rounded-xl px-3 py-2 border border-border">
                  <CircleNotch size={16} className="text-brand animate-spin" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you want..."
                disabled={loading}
                className="flex-1 px-3 py-2 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-3 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
              >
                <PaperPlaneRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Preview panel */}
        <div className="flex-1 flex flex-col bg-surface-raised/30 p-6">
          {/* Main slide preview */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
              <SlideRendererV2
                title={activeSlide?.title}
                subtitle={activeSlide?.subtitle}
                layout={activeSlide?.layout}
                contentBlocks={activeSlide?.contentBlocks ?? []}
                themeKey={themeKey}
                themeConfig={themeConfig}
                scale={1}
              />
            </div>
          </div>

          {/* Mini filmstrip + navigation */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={prevSlide}
              disabled={activeIndex <= 0}
              className="text-xs text-ink-muted hover:text-ink disabled:opacity-30 transition-colors"
            >
              &#9664;
            </button>
            <span className="text-xs text-ink-muted">
              {activeIndex + 1} / {slides.length}
            </span>
            <button
              onClick={nextSlide}
              disabled={activeIndex >= slides.length - 1}
              className="text-xs text-ink-muted hover:text-ink disabled:opacity-30 transition-colors"
            >
              &#9654;
            </button>
          </div>

          {/* Mini thumbnails */}
          <div className="flex gap-2 justify-center mt-3 overflow-x-auto pb-2">
            {slides.map((slide, i) => (
              <div key={slide.id} className="w-20 shrink-0">
                <SlideThumbnail
                  title={slide.title}
                  layout={slide.layout}
                  contentBlocks={slide.contentBlocks}
                  themeKey={themeKey}
                  themeConfig={themeConfig}
                  isActive={slide.id === activeSlideId}
                  slideNumber={i + 1}
                  onClick={() => setActiveSlide(slide.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
