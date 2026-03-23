"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
/* Clerk UserButton kept available for future auth integration */
// import dynamic from "next/dynamic";
// const ClerkUserButton = dynamic(
//   () => import("@clerk/nextjs").then((mod) => mod.UserButton),
//   { ssr: false }
// );

/* ------------------------------------------------------------------ */
/*  Keyframes injected once                                            */
/* ------------------------------------------------------------------ */
const glowKeyframes = `
@keyframes sidebarGlow1{0%,100%{opacity:.18;transform:translate(-10%,-10%) scale(1)}50%{opacity:.28;transform:translate(10%,10%) scale(1.15)}}
@keyframes sidebarGlow2{0%,100%{opacity:.12;transform:translate(10%,10%) scale(1.1)}50%{opacity:.22;transform:translate(-10%,-5%) scale(1)}}
`;

/* ------------------------------------------------------------------ */
/*  Icon helpers                                                       */
/* ------------------------------------------------------------------ */
const IconProjects = () => (
  <svg viewBox="0 0 18 18" fill="none" width={18} height={18}><rect x="2" y="2" width="6" height="6" rx="1.5" fill="#fff"/><rect x="10" y="2" width="6" height="6" rx="1.5" fill="#fff"/><rect x="2" y="10" width="6" height="6" rx="1.5" fill="#fff"/><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#fff"/></svg>
);
const IconLaTeX = () => (
  <svg viewBox="0 0 18 18" fill="none" width={18} height={18}><path d="M6 3.5L2 9l4 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3.5l4 5.5-4 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.5 2.5l-3 13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const IconDiscover = () => (
  <svg viewBox="0 0 18 18" fill="none" width={18} height={18}><circle cx="8" cy="8" r="5.5" stroke="#fff" strokeWidth="1.5"/><path d="M12.5 12.5l3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
);
const IconPulse = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5" fill="#fff" stroke="none"/></svg>
);
const IconLibrary = () => (
  <svg viewBox="0 0 18 18" fill="none" width={18} height={18}><rect x="3" y="3" width="3" height="12" rx="0.8" fill="#fff" stroke="#fff" strokeWidth="1"/><rect x="7.5" y="2" width="3" height="13" rx="0.8" fill="#fff" stroke="#fff" strokeWidth="1" opacity="0.7"/><rect x="12" y="4" width="3" height="11" rx="0.8" fill="#fff" stroke="#fff" strokeWidth="1" opacity="0.45"/></svg>
);
const IconSystematicReview = () => (
  <svg viewBox="0 0 18 18" fill="none" width={18} height={18}><path d="M3 2h12v3H3z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/><path d="M5 8h8v2.5H5z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/><path d="M7 13.5h4v2.5H7z" fill="#fff" fillOpacity="0.3" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/><path d="M9 5v3M9 10.5v3" stroke="#fff" strokeWidth="1.2"/></svg>
);
const IconIntegrity = () => (
  <svg viewBox="0 0 18 18" fill="none" width={18} height={18}><path d="M9 2L3 4.5v4.5c0 4 2.5 6 6 7.5 3.5-1.5 6-3.5 6-7.5V4.5L9 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 9l2 2 3.5-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const RemoveX = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16" width={10} height={10}><path d="M4 4l8 8M12 4l-8 8"/></svg>
);

/* PNG icon wrapper */
function PngIcon({ src, alt, size = 18, filter }: { src: string; alt: string; size?: number; filter?: string }) {
  return (
    <div style={{ width: size, height: size, position: "relative", filter: filter || "brightness(0) invert(1) opacity(0.6)" }}>
      <Image src={src} alt={alt} width={size} height={size} style={{ width: size, height: size }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav data                                                           */
/* ------------------------------------------------------------------ */
type NavItemDef = {
  id: string; label: string; href: string;
  icon: ReactNode; removable: boolean;
  section: string;
};

const ALL_NAV_ITEMS: NavItemDef[] = [
  /* -- (no section label) */
  { id: "projects", label: "Projects", href: "/dashboard", icon: <IconProjects />, removable: false, section: "" },
  /* -- CREATE */
  { id: "draft", label: "Draft", href: "/studio", icon: <PngIcon src="/icons/edit.png" alt="Draft" />, removable: false, section: "Create" },
  { id: "latex", label: "LaTeX", href: "/latex", icon: <IconLaTeX />, removable: true, section: "Create" },
  { id: "canvas", label: "Canvas", href: "/illustrate", icon: <PngIcon src="/icons/pen-tool.png" alt="Canvas" />, removable: true, section: "Create" },
  { id: "poster", label: "Poster", href: "/poster/new", icon: <PngIcon src="/icons/poster.png" alt="Poster" />, removable: true, section: "Create" },
  { id: "stage", label: "Stage", href: "/slides", icon: <PngIcon src="/icons/business-analyst.png" alt="Stage" size={20} filter="brightness(0) invert(1) opacity(0.75)" />, removable: true, section: "Create" },
  /* -- RESEARCH */
  { id: "discover", label: "Discover", href: "/research", icon: <IconDiscover />, removable: true, section: "Research" },
  { id: "reading-room", label: "Reading Room", href: "/notebook", icon: <PngIcon src="/icons/reading-room.png" alt="Reading Room" />, removable: true, section: "Research" },
  { id: "pulse", label: "Pulse", href: "/feeds", icon: <IconPulse />, removable: true, section: "Research" },
  { id: "deep-research", label: "Deep Research", href: "/deep-research", icon: <PngIcon src="/icons/creativity.png" alt="Deep Research" size={20} filter="brightness(0) invert(1) opacity(0.75)" />, removable: true, section: "Research" },
  { id: "library", label: "Library", href: "/library", icon: <IconLibrary />, removable: true, section: "Research" },
  { id: "systematic-review", label: "Systematic Review", href: "/systematic-review", icon: <IconSystematicReview />, removable: true, section: "Research" },
  /* -- AUDIT */
  { id: "integrity", label: "Integrity Check", href: "/compliance", icon: <IconIntegrity />, removable: true, section: "Audit" },
];

const SECTIONS_ORDER = ["", "Create", "Research", "Audit"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
interface AppSidebarProps { open?: boolean; onClose?: () => void; }

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const [visibleTools, setVisibleTools] = useState<Set<string>>(() => new Set(ALL_NAV_ITEMS.map(i => i.id)));
  const [addPanelOpen, setAddPanelOpen] = useState(false);
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [textLarge, setTextLarge] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [hoveredRemove, setHoveredRemove] = useState<string | null>(null);

  /* Auto-collapse on /studio and /latex */
  const autoCollapse = pathname === "/studio" || pathname === "/latex" || pathname.startsWith("/studio/") || pathname.startsWith("/latex/");

  const removeTool = (id: string) => {
    setVisibleTools(prev => { const n = new Set(prev); n.delete(id); return n; });
  };
  const addTool = (id: string) => {
    setVisibleTools(prev => new Set(prev).add(id));
  };

  /* Group visible items by section */
  const visibleItems = ALL_NAV_ITEMS.filter(i => visibleTools.has(i.id));
  const grouped = SECTIONS_ORDER.map(sec => ({
    section: sec,
    items: visibleItems.filter(i => i.section === sec),
  })).filter(g => g.items.length > 0);

  /* Removed items for add-tool panel */
  const removedItems = ALL_NAV_ITEMS.filter(i => i.removable && !visibleTools.has(i.id));
  const removedGrouped = SECTIONS_ORDER.filter(s => s).map(sec => ({
    section: sec,
    items: removedItems.filter(i => i.section === sec),
  })).filter(g => g.items.length > 0);

  /* Close panels on outside click */
  useEffect(() => {
    if (!addPanelOpen && !userPanelOpen) return;
    const handler = () => { setAddPanelOpen(false); setUserPanelOpen(false); };
    const timer = setTimeout(() => document.addEventListener("click", handler), 0);
    return () => { clearTimeout(timer); document.removeEventListener("click", handler); };
  }, [addPanelOpen, userPanelOpen]);

  const sidebarContent = (
    <div className={`flex flex-col h-full ${textLarge ? "text-[14px]" : "text-[13px]"}`}>
      <style dangerouslySetInnerHTML={{ __html: glowKeyframes }} />

      {/* Glow backgrounds */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: "inherit" }}>
        <div style={{ position: "absolute", width: "180%", height: "180%", top: "-40%", left: "-40%", background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)", animation: "sidebarGlow1 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: "160%", height: "160%", bottom: "-30%", right: "-30%", background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)", animation: "sidebarGlow2 10s ease-in-out infinite" }} />
      </div>

      {/* Top row: logo + close */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 16px 12px" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15 }}>S</div>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#fff", letterSpacing: "-0.01em" }}>ScholarSync</div>
        </Link>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: 4 }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16"><path d="M10 2l-6 6 6 6"/></svg>
        </button>
      </div>

      {/* Nav area */}
      <nav style={{ position: "relative", zIndex: 1, flex: 1, overflowY: "auto", padding: "4px 8px" }}>
        {grouped.map(({ section, items }) => (
          <div key={section || "_top"} style={{ marginBottom: 8 }}>
            {section && (
              <div style={{ padding: "8px 12px 4px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
                {section}
              </div>
            )}
            {items.map(item => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <div key={item.id} style={{ position: "relative" }} className="group">
                  {/* Active indicator bar */}
                  {isActive && (
                    <div style={{ position: "absolute", left: 0, top: 4, bottom: 4, width: 3, borderRadius: 2, background: "linear-gradient(180deg, #a78bfa, #7c3aed)" }} />
                  )}
                  <Link
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "7px 12px", borderRadius: 8, textDecoration: "none",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                      fontWeight: isActive ? 500 : 400,
                      fontSize: "inherit",
                      transition: "all 80ms ease",
                      background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                    }}
                    className="sidebar-nav-link"
                    onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.98)"; }}
                    onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
                  >
                    <div style={{ width: 18, height: 18, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.icon}
                    </div>
                    <span style={{ flex: 1 }}>{item.label}</span>
                  </Link>
                  {/* Remove button */}
                  {item.removable && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeTool(item.id); }}
                      onMouseEnter={() => setHoveredRemove(item.id)}
                      onMouseLeave={() => setHoveredRemove(null)}
                      style={{
                        position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                        width: 18, height: 18, borderRadius: 4, border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: 0, transition: "opacity 150ms, background 150ms",
                        background: hoveredRemove === item.id ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.1)",
                        color: "#fff",
                      }}
                      className="sidebar-remove-btn"
                    >
                      <RemoveX />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Add tool button */}
        <button
          onClick={(e) => { e.stopPropagation(); setAddPanelOpen(p => !p); setUserPanelOpen(false); }}
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "7px 12px",
            color: "rgba(255,255,255,0.35)", fontSize: 12, fontWeight: 500,
            background: "none", border: "none", cursor: "pointer", width: "100%",
            borderRadius: 8, transition: "color 150ms",
          }}
          className="sidebar-add-tool-btn"
        >
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16" width={14} height={14}><path d="M8 3v10M3 8h10"/></svg>
          Add tool
        </button>

        {/* Add tool panel */}
        {addPanelOpen && removedGrouped.length > 0 && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              margin: "4px 8px", padding: "8px 0", borderRadius: 10,
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {removedGrouped.map(({ section, items }) => (
              <div key={section}>
                <div style={{ padding: "6px 14px 2px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)" }}>{section}</div>
                {items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { addTool(item.id); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      width: "100%", padding: "6px 14px", background: "none", border: "none",
                      color: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer",
                    }}
                    className="sidebar-add-item"
                  >
                    <span>{item.label}</span>
                    <span style={{ color: "rgba(139,92,246,0.8)", fontWeight: 600 }}>+</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
        {addPanelOpen && removedGrouped.length === 0 && (
          <div style={{ margin: "4px 8px", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)", fontSize: 12, textAlign: "center" }}>
            All tools added
          </div>
        )}
      </nav>

      {/* Bottom user area */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 12px" }}>
        {/* User panel (opens upward) */}
        {userPanelOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute", bottom: "100%", left: 8, right: 8, marginBottom: 4,
              background: "rgba(30,17,69,0.95)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "6px 0",
            }}
          >
            {/* Text size */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              <span>Text size</span>
              <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.08)", borderRadius: 6, padding: 2 }}>
                <button onClick={() => setTextLarge(false)} style={{ padding: "2px 8px", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, background: !textLarge ? "rgba(255,255,255,0.15)" : "transparent", color: "#fff" }}>
                  A<span style={{ fontSize: 9, opacity: 0.6 }}>-</span>
                </button>
                <button onClick={() => setTextLarge(true)} style={{ padding: "2px 8px", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 15, background: textLarge ? "rgba(255,255,255,0.15)" : "transparent", color: "#fff" }}>
                  A<span style={{ fontSize: 11, opacity: 0.6 }}>+</span>
                </button>
              </div>
            </div>
            {/* Dark mode */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              <span>Dark mode</span>
              <button onClick={() => setDarkMode(d => !d)} style={{ width: 36, height: 20, borderRadius: 10, border: "none", cursor: "pointer", background: darkMode ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.15)", position: "relative", transition: "background 200ms" }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", position: "absolute", top: 2, left: darkMode ? 18 : 2, transition: "left 200ms" }} />
              </button>
            </div>
            {/* Settings */}
            <Link href="/settings" onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", color: "rgba(255,255,255,0.7)", fontSize: 12, textDecoration: "none" }}>
              <span>Settings</span>
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width={14} height={14}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </Link>
            {/* Keyboard shortcuts */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", color: "rgba(255,255,255,0.7)", fontSize: 12, cursor: "pointer" }}>
              <span>Keyboard shortcuts</span>
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width={14} height={14}><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/></svg>
            </div>
            {/* Sign out */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", color: "rgba(255,255,255,0.7)", fontSize: 12, cursor: "pointer" }}>
              <span>Sign out</span>
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width={14} height={14}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round"/><path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        )}

        {/* User row */}
        <button
          onClick={(e) => { e.stopPropagation(); setUserPanelOpen(p => !p); setAddPanelOpen(false); }}
          style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: "6px 4px", background: "none", border: "none", cursor: "pointer", color: "#fff",
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "#fff",
          }}>DS</div>
          <span style={{ flex: 1, textAlign: "left", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>Dr. Singh</span>
          <svg
            width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16"
            style={{ color: "rgba(255,255,255,0.4)", transform: userPanelOpen ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
          >
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </button>
      </div>
    </div>
  );

  /* Inline hover styles */
  const hoverCSS = `
.sidebar-nav-link:hover{background:rgba(255,255,255,0.08)!important;backdrop-filter:blur(12px) saturate(1.4);color:#fff!important}
.sidebar-add-tool-btn:hover{color:rgba(255,255,255,0.6)!important}
.sidebar-add-item:hover{background:rgba(255,255,255,0.06)!important}
.group:hover .sidebar-remove-btn{opacity:1!important}
`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: hoverCSS }} />

      {/* Desktop sidebar */}
      {!autoCollapse && (
        <aside
          style={{
            width: 224, flexShrink: 0, height: "100vh", position: "relative",
            background: "#1E1145", borderRight: "1px solid rgba(255,255,255,0.06)",
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}
          className="hidden md:flex"
        >
          {sidebarContent}
        </aside>
      )}

      {/* Mobile overlay sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
          <aside
            style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 224,
              background: "#1E1145", borderRight: "1px solid rgba(255,255,255,0.06)",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
