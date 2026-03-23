"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquaresFour,
  PenNib,
  Code,
  PaintBrush,
  Presentation,
  MagnifyingGlass,
  BookOpen,
  Rss,
  Brain,
  Books,
  FlowArrow,
  ShieldCheck,
  Plus,
  X,
  CaretDown,
  SignOut,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ═══ NAVIGATION STRUCTURE ═══
// Matches decisions.md exactly

const navSections = [
  {
    id: "projects",
    type: "standalone" as const,
    items: [
      { id: "projects", label: "Projects", href: "/dashboard", icon: SquaresFour, removable: false },
    ],
  },
  {
    id: "create",
    type: "section" as const,
    label: "CREATE",
    items: [
      { id: "draft", label: "Draft", href: "/studio", icon: PenNib, removable: false },
      { id: "latex", label: "LaTeX", href: "/latex", icon: Code, removable: true },
      { id: "canvas", label: "Canvas", href: "/illustrate", icon: PaintBrush, removable: true },
      { id: "poster", label: "Poster", href: "/poster", icon: Presentation, removable: true },
      { id: "stage", label: "Stage", href: "/presentation", icon: Presentation, removable: true },
    ],
  },
  {
    id: "research",
    type: "section" as const,
    label: "RESEARCH",
    items: [
      { id: "discover", label: "Discover", href: "/research", icon: MagnifyingGlass, removable: true },
      { id: "reading-room", label: "Reading Room", href: "/notebook", icon: BookOpen, removable: true },
      { id: "pulse", label: "Pulse", href: "/feeds", icon: Rss, removable: true },
      { id: "deep-research", label: "Deep Research", href: "/deep-research", icon: Brain, removable: true },
      { id: "library", label: "Library", href: "/library", icon: Books, removable: true },
      { id: "systematic-review", label: "Systematic Review", href: "/systematic-review", icon: FlowArrow, removable: true },
    ],
  },
  {
    id: "audit",
    type: "section" as const,
    label: "AUDIT",
    items: [
      { id: "integrity-check", label: "Integrity Check", href: "/compliance", icon: ShieldCheck, removable: true },
    ],
  },
];

interface AppSidebarProps {
  open?: boolean;
  onClose?: () => void;
  width?: number;
}

export function AppSidebar({ open, onClose, width = 224 }: AppSidebarProps) {
  const pathname = usePathname();
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [addToolOpen, setAddToolOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const sidebarContent = (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* ═══ ANIMATED GRADIENT ORBS ═══ */}
      <div 
        className="absolute -top-[40%] -left-[30%] w-[160%] h-[80%] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.25) 0%, transparent 60%),
                       radial-gradient(ellipse at 70% 30%, rgba(236,72,153,0.15) 0%, transparent 55%)`,
          animation: 'sidebarGlow 12s ease-in-out infinite alternate',
        }}
      />
      <div 
        className="absolute -bottom-[30%] -right-[20%] w-[140%] h-[70%] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.2) 0%, transparent 55%),
                       radial-gradient(ellipse at 30% 70%, rgba(168,85,247,0.12) 0%, transparent 50%)`,
          animation: 'sidebarGlow 15s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* ═══ CONTENT (above orbs) ═══ */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* ─── TOP: Logo ─── */}
        <div className="flex items-center justify-between px-4 py-4 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-white/15 flex items-center justify-center">
              <span className="font-serif text-[15px] font-bold text-white">S</span>
            </div>
            <span className="text-[14px] font-semibold text-white/95 tracking-tight">ScholarSync</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden w-6 h-6 flex items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* ─── NAV SECTIONS ─── */}
        <nav className="flex-1 px-2.5 overflow-y-auto scrollbar-thin">
          {navSections.map((section) => (
            <div key={section.id} className="mb-4">
              {/* Section Label */}
              {section.type === "section" && section.label && (
                <div className="px-3 mb-1.5">
                  <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/30">
                    {section.label}
                  </span>
                </div>
              )}
              
              {/* Nav Items */}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group relative flex items-center gap-2.5 px-3 py-[7px] rounded-md",
                        "text-white/55 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                        // Hover — glassmorphism
                        "hover:bg-white/[0.08] hover:backdrop-blur-[12px] hover:text-white/95",
                        "hover:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(0,0,0,0.12)]",
                        // Active state
                        isActive && [
                          "bg-white/10 backdrop-blur-[14px] text-white",
                          "shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),0_2px_10px_rgba(0,0,0,0.1)]"
                        ],
                        // Press feedback
                        "active:scale-[0.98] active:transition-duration-[80ms]"
                      )}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div 
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-[3px]"
                          style={{
                            background: 'linear-gradient(180deg, rgba(196,181,253,0.9), rgba(168,85,247,0.6))',
                            boxShadow: '0 0 8px rgba(168,85,247,0.3)',
                          }}
                        />
                      )}
                      
                      {/* Icon — white monochrome */}
                      <Icon 
                        size={18} 
                        weight={isActive ? "fill" : "regular"}
                        className={cn(
                          "flex-shrink-0 transition-all duration-200",
                          "opacity-60 group-hover:opacity-85",
                          isActive && "opacity-100"
                        )}
                        style={isActive ? { filter: 'brightness(1.2) drop-shadow(0 0 3px rgba(196,181,253,0.3))' } : undefined}
                      />
                      
                      {/* Label */}
                      <span className={cn(
                        "text-[13px] transition-colors duration-[250ms]",
                        isActive ? "font-medium text-white" : "text-white/55 group-hover:text-white/95"
                      )}>
                        {item.label}
                      </span>
                      
                      {/* Remove button (on hover) */}
                      {item.removable && (
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full
                                     flex items-center justify-center opacity-0 group-hover:opacity-100
                                     text-white/30 bg-white/[0.06] hover:text-white hover:bg-red-500/50
                                     transition-all duration-200"
                        >
                          <X size={10} />
                        </button>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ─── BOTTOM: Add Tool + User ─── */}
        <div className="mt-auto border-t border-white/[0.06] pt-2 px-2.5 pb-3">
          {/* + Add tool button */}
          <button 
            onClick={() => setAddToolOpen(!addToolOpen)}
            className="flex items-center gap-2 w-full px-3 py-2 mb-2 rounded-md
                       text-white/35 text-xs font-medium
                       border border-dashed border-white/[0.12]
                       hover:text-white/70 hover:border-white/25 hover:bg-white/[0.05]
                       transition-all duration-[250ms] active:scale-[0.97]"
          >
            <Plus size={14} />
            Add tool
          </button>
          
          {/* User area */}
          <button
            onClick={() => setUserPanelOpen(!userPanelOpen)}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-md
                       hover:bg-white/[0.07] transition-all duration-[250ms]
                       active:scale-[0.98] active:transition-duration-[80ms]"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center
                            text-[11px] font-semibold text-white/90
                            bg-gradient-to-br from-purple-500/40 to-indigo-500/30
                            ring-[1.5px] ring-white/10">
              SS
            </div>
            <span className="flex-1 text-left text-xs text-white/50">
              Dr. Singh
            </span>
            <CaretDown 
              size={14} 
              className={cn(
                "text-white/25 transition-transform duration-200",
                userPanelOpen && "rotate-180"
              )} 
            />
          </button>
          
          {/* User panel (expanded) */}
          {userPanelOpen && (
            <div className="mt-1 space-y-0.5 animate-in slide-in-from-bottom-2 duration-200">
              {/* Dark mode toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center justify-between w-full px-3 py-[7px] rounded-md
                           text-xs text-white/45 hover:text-white/80 hover:bg-white/[0.06]
                           transition-all"
              >
                <span>Dark mode</span>
                <div className={cn(
                  "w-[38px] h-[22px] rounded-full relative cursor-pointer transition-all duration-300",
                  isDarkMode ? "bg-[#1E1145] border-purple-500/50" : "bg-white/20",
                  "border border-white/15"
                )}>
                  <div className={cn(
                    "absolute top-[1.5px] w-[17px] h-[17px] rounded-full transition-transform duration-300",
                    isDarkMode 
                      ? "translate-x-[17px] bg-purple-300" 
                      : "translate-x-[2px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                  )} />
                </div>
              </button>
              
              {/* Sign out */}
              <button
                className="flex items-center gap-2 w-full px-3 py-[7px] rounded-md
                           text-xs text-white/45 hover:text-white/80 hover:bg-white/[0.06]
                           transition-all"
              >
                <SignOut size={14} />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside 
        className="hidden md:flex flex-col shrink-0 h-screen relative overflow-hidden"
        style={{
          width: `${width}px`,
          backgroundColor: '#1E1145',
          borderRight: '1px solid rgba(255,255,255,0.06)'
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside 
            className="absolute left-0 top-0 bottom-0 w-56 flex flex-col overflow-hidden"
            style={{ 
              backgroundColor: '#1E1145',
              borderRight: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* ═══ KEYFRAME STYLES ═══ */}
      <style jsx global>{`
        @keyframes sidebarGlow {
          0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          50% { transform: translate(5%, 8%) scale(1.05); opacity: 1; }
          100% { transform: translate(-3%, -5%) scale(0.98); opacity: 0.8; }
        }
        
        .scrollbar-thin::-webkit-scrollbar { width: 3px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </>
  );
}
