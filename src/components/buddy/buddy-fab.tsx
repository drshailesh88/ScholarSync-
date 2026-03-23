"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Gear,
  PaperPlaneTilt,
  Sparkle,
  PencilSimple,
  GraduationCap,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type BuddyMode = "default" | "draft" | "learn";

interface BuddyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BuddyFAB() {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      {/* ═══ FLOATING ACTION BUTTON ═══ */}
      {!panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-6 right-6 z-[200] w-[52px] h-[52px] rounded-full
                     flex items-center justify-center overflow-hidden
                     shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.2)]
                     hover:scale-[1.08] transition-all duration-150 cursor-pointer"
        >
          <Image 
            src="/buddy-icon.png" 
            alt="Buddy" 
            width={52} 
            height={52} 
            className="w-full h-full object-cover"
          />
        </button>
      )}

      {/* ═══ BUDDY PANEL ═══ */}
      <BuddyPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}

function BuddyPanel({ isOpen, onClose }: BuddyPanelProps) {
  const [mode, setMode] = useState<BuddyMode>("default");
  const [gearOpen, setGearOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [aiIntensity, setAiIntensity] = useState<"focus" | "collaborate" | "accelerate">("collaborate");

  const modeConfig = {
    default: { icon: Sparkle, label: "Default", color: "#6D28D9", bg: "bg-white" },
    draft: { icon: PencilSimple, label: "Draft", color: "#0891B2", bg: "bg-[#F8FAFF]" },
    learn: { icon: GraduationCap, label: "Learn", color: "#15803D", bg: "bg-[#F5FBF8]" },
  };

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed right-0 top-0 bottom-0 w-[360px] z-[200]",
        "flex flex-col border-l border-black/[0.06]",
        "shadow-[-4px_0_24px_rgba(0,0,0,0.08)]",
        "transition-colors duration-300",
        modeConfig[mode].bg
      )}
    >
      {/* ─── HEADER ─── */}
      <div className="flex items-center justify-between px-4 py-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            <Image 
              src="/buddy-icon.png" 
              alt="Buddy" 
              width={36} 
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[17px] font-bold text-[#1C1917] tracking-[-0.02em]">
            Buddy
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          {/* Gear button */}
          <div className="relative">
            <button
              onClick={() => setGearOpen(!gearOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-full
                         text-[#A8A29E] hover:bg-purple-500/10 hover:text-[#6D28D9]
                         transition-all duration-200"
            >
              <Gear size={18} className={gearOpen ? "animate-spin" : ""} />
            </button>
            
            {/* Gear popover */}
            {gearOpen && (
              <div className="absolute right-0 top-10 w-[260px] bg-white border border-black/10 
                              rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-3 z-50">
                <div className="text-[10px] font-semibold text-[#A8A29E] uppercase tracking-wider mb-2">
                  AI Intensity
                </div>
                {[
                  { id: "focus", name: "Focus", desc: "Minimal suggestions, maximum concentration" },
                  { id: "collaborate", name: "Collaborate", desc: "Balanced assistance as you write" },
                  { id: "accelerate", name: "Accelerate", desc: "Proactive AI co-writing mode" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setAiIntensity(option.id as typeof aiIntensity)}
                    className="flex items-start gap-2 w-full p-2 rounded hover:bg-[#F7F5F3] transition-colors"
                  >
                    <div className={cn(
                      "w-3.5 h-3.5 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      aiIntensity === option.id ? "border-[#6D28D9]" : "border-black/20"
                    )}>
                      {aiIntensity === option.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="text-[13px] font-medium text-[#1C1917]">{option.name}</div>
                      <div className="text-[11px] text-[#A8A29E] leading-snug">{option.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full
                       text-[#A8A29E] hover:bg-black/5 hover:text-[#1C1917]
                       transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ─── MODE TABS ─── */}
      <div className="flex gap-1.5 px-3 py-2.5 border-b border-black/[0.06] flex-shrink-0">
        {(["default", "draft", "learn"] as BuddyMode[]).map((m) => {
          const config = modeConfig[m];
          const Icon = config.icon;
          const isActive = mode === m;
          
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 flex items-center justify-center gap-[7px] py-2.5 rounded-[10px]",
                "text-[13px] font-medium transition-all duration-[250ms]",
                "border-[1.5px] border-transparent",
                isActive 
                  ? "bg-white text-[#1C1917] font-semibold shadow-[0_1px_4px_rgba(0,0,0,0.08)]" 
                  : "text-[#A8A29E] hover:text-[#78716C] hover:bg-[#F7F5F3]",
                isActive && m === "default" && "border-[#6D28D9]",
                isActive && m === "draft" && "border-[#0891B2]",
                isActive && m === "learn" && "border-[#15803D]",
              )}
            >
              <div 
                className="w-[22px] h-[22px] rounded-md flex items-center justify-center"
                style={{ backgroundColor: config.color }}
              >
                <Icon size={14} className="text-white" weight="bold" />
              </div>
              {config.label}
            </button>
          );
        })}
      </div>

      {/* ─── MESSAGES ─── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Example welcome message */}
        <div className="max-w-[90%] p-3 bg-[#F7F5F3] rounded-md text-[13px] text-[#1C1917] leading-relaxed">
          <div className="text-[9px] font-medium text-[#6D28D9] uppercase tracking-wide mb-1">
            {mode.toUpperCase()} MODE
          </div>
          {mode === "default" && "Hi! I'm Buddy, your research assistant. How can I help you today?"}
          {mode === "draft" && "Ready to help you write. What are you working on?"}
          {mode === "learn" && "Let's explore this topic together. What would you like to understand better?"}
        </div>
      </div>

      {/* ─── INPUT ─── */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-black/[0.06] flex-shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Buddy..."
          className="flex-1 px-3 py-2 text-[13px] bg-[#F7F5F3] border border-black/[0.06]
                     rounded-md outline-none focus:border-[#6D28D9] transition-colors
                     placeholder:text-[#A8A29E]"
        />
        <button
          className="flex items-center gap-1.5 px-3 py-2 bg-[#6D28D9] text-white
                     text-[13px] font-medium rounded-md hover:bg-[#5B21B6]
                     transition-all duration-200 active:scale-95"
        >
          <PaperPlaneTilt size={16} weight="fill" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}

export default BuddyFAB;
