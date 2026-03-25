"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { X, CaretDown, Gear, Keyboard, SignOut } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ClerkUserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false, loading: () => <div className="w-8 h-8 rounded-full bg-white/10" /> }
);

// Icon type: either SVG inline or PNG from /sidebar-icons/
type NavIcon = { type: "svg"; element: React.ReactNode } | { type: "png"; src: string; size?: number };

interface NavItem {
  label: string;
  href: string;
  icon: NavIcon;
}

interface NavSection {
  label: string;
  category: string; // CREATE, RESEARCH, AUDIT
  items: NavItem[];
}

// SVG icons (matching prototype exactly)
const svgIcons = {
  projects: (
    <svg viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#fff" />
      <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#fff" />
      <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#fff" />
      <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#fff" />
    </svg>
  ),
  latex: (
    <svg viewBox="0 0 18 18" fill="none">
      <path d="M6 3.5L2 9l4 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3.5l4 5.5-4 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 2.5l-3 13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  discover: (
    <svg viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="#fff" strokeWidth="1.5" />
      <path d="M12.5 12.5l3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1.5" fill="#fff" stroke="none" />
    </svg>
  ),
  library: (
    <svg viewBox="0 0 18 18" fill="none">
      <rect x="3" y="3" width="3" height="12" rx="0.8" fill="#fff" stroke="#fff" strokeWidth="1" />
      <rect x="7.5" y="2" width="3" height="13" rx="0.8" fill="#fff" stroke="#fff" strokeWidth="1" opacity="0.7" />
      <rect x="12" y="4" width="3" height="11" rx="0.8" fill="#fff" stroke="#fff" strokeWidth="1" opacity="0.45" />
    </svg>
  ),
  systematicReview: (
    <svg viewBox="0 0 18 18" fill="none">
      <path d="M3 2h12v3H3z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5 8h8v2.5H5z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7 13.5h4v2.5H7z" fill="#fff" fillOpacity="0.3" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9 5v3M9 10.5v3" stroke="#fff" strokeWidth="1.2" />
    </svg>
  ),
  audit: (
    <svg viewBox="0 0 18 18" fill="none">
      <path d="M9 2L3 4.5v4.5c0 4 2.5 6 6 7.5 3.5-1.5 6-3.5 6-7.5V4.5L9 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6.5 9l2 2 3.5-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const navSections: NavSection[] = [
  {
    label: "Create",
    category: "create",
    items: [
      { label: "Draft", href: "/studio", icon: { type: "png", src: "/sidebar-icons/edit.png" } },
      { label: "LaTeX", href: "/latex", icon: { type: "svg", element: svgIcons.latex } },
      { label: "Canvas", href: "/illustrate", icon: { type: "png", src: "/sidebar-icons/pen-tool.png" } },
      { label: "Poster", href: "/poster", icon: { type: "png", src: "/sidebar-icons/poster.png" } },
      { label: "Stage", href: "/presentation", icon: { type: "png", src: "/sidebar-icons/business-analyst.png", size: 20 } },
    ],
  },
  {
    label: "Research",
    category: "research",
    items: [
      { label: "Discover", href: "/research", icon: { type: "svg", element: svgIcons.discover } },
      { label: "Reading Room", href: "/notebook", icon: { type: "png", src: "/sidebar-icons/reading-room.png" } },
      { label: "Pulse", href: "/feeds", icon: { type: "svg", element: svgIcons.pulse } },
      { label: "Deep Research", href: "/deep-research", icon: { type: "png", src: "/sidebar-icons/creativity.png", size: 20 } },
      { label: "Library", href: "/library", icon: { type: "svg", element: svgIcons.library } },
      { label: "Systematic Review", href: "/systematic-review", icon: { type: "svg", element: svgIcons.systematicReview } },
    ],
  },
  {
    label: "Audit",
    category: "audit",
    items: [
      { label: "Integrity Check", href: "/compliance", icon: { type: "svg", element: svgIcons.audit } },
    ],
  },
];

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasClerkKeys = Boolean(
  clerkPublishableKey && !clerkPublishableKey.includes("placeholder")
);

interface AppSidebarProps {
  open?: boolean;
  onClose?: () => void;
  onShortcutsOpen?: () => void;
  width?: number;
  mobileOnly?: boolean;
}

function NavIcon({ icon }: { icon: NavIcon }) {
  if (icon.type === "svg") {
    return <div className="ss-nav-icon">{icon.element}</div>;
  }
  return (
    <div className="ss-nav-icon">
      <Image
        src={icon.src}
        alt=""
        width={icon.size || 18}
        height={icon.size || 18}
        className="object-contain"
        style={{
          filter: "brightness(0) invert(1) opacity(0.6)",
          width: icon.size || 18,
          height: icon.size || 18,
        }}
      />
    </div>
  );
}

export function AppSidebar({ open, onClose, onShortcutsOpen, width = 224, mobileOnly = false }: AppSidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [textSize, setTextSize] = useState<"normal" | "large">("normal");
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- needed for hydration safety
  useEffect(() => setMounted(true), []);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5 no-underline">
          <div className="ss-logo-mark">S</div>
          <span className="ss-logo-text">ScholarSync</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              "p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors",
              !mobileOnly && "md:hidden"
            )}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav area — grows to fill space */}
      <div className="flex-1 px-2.5 py-2">

        {/* Projects — always visible, no category header */}
        <div className="mb-3">
          <Link
            href="/dashboard"
            onClick={onClose}
            className={cn(
              "ss-nav-item no-underline",
              (pathname === "/dashboard" || pathname === "/") && "active"
            )}
          >
            <div className="ss-nav-icon">{svgIcons.projects}</div>
            <span className="ss-nav-label">Projects</span>
          </Link>
        </div>

        {/* Nav sections */}
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            <div className="ss-section-label">{section.label}</div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn("ss-nav-item no-underline", isActive && "active")}
                  >
                    <NavIcon icon={item.icon} />
                    <span className="ss-nav-label">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom — user area with expandable panel */}
      <div className="px-3 py-3 shrink-0 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="ss-user-area"
          onClick={() => setUserPanelOpen(!userPanelOpen)}
        >
          {hasClerkKeys ? (
            <ClerkUserButton afterSignOutUrl="/" />
          ) : (
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white/90"
              style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.4), rgba(99,102,241,0.3))" }}>
              SS
            </div>
          )}
          <span className="text-[12px] text-white/50">Dr. Singh</span>
          <CaretDown
            size={12}
            className="ss-user-chevron"
            style={{ transform: userPanelOpen ? "rotate(180deg)" : "", transition: "transform 0.2s ease" }}
          />
        </div>

        <div className={cn("ss-user-panel", userPanelOpen && "open")}>
          {/* Text size */}
          <div className="ss-user-panel-item">
            <span>Text size</span>
            <div className="ss-text-size-toggle">
              <span
                className={cn("ss-text-size-opt", textSize === "normal" && "active")}
                style={{ fontSize: 11 }}
                onClick={() => setTextSize("normal")}
              >
                A<span style={{ fontSize: 9, opacity: 0.6 }}>−</span>
              </span>
              <span
                className={cn("ss-text-size-opt", textSize === "large" && "active")}
                style={{ fontSize: 15 }}
                onClick={() => setTextSize("large")}
              >
                A<span style={{ fontSize: 11, opacity: 0.6 }}>+</span>
              </span>
            </div>
          </div>

          {/* Dark mode */}
          {mounted && (
            <div className="ss-user-panel-item" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <span>Dark mode</span>
              <div className={cn("ss-theme-switch", theme === "dark" && "dark")} />
            </div>
          )}

          {/* Settings */}
          <Link href="/settings" onClick={onClose} className="ss-user-panel-item no-underline">
            <span>Settings</span>
            <Gear size={14} />
          </Link>

          {/* Keyboard shortcuts */}
          <div className="ss-user-panel-item" onClick={() => { onShortcutsOpen?.(); setUserPanelOpen(false); }}>
            <span>Keyboard shortcuts</span>
            <Keyboard size={14} />
          </div>

          {/* Sign out */}
          <div className="ss-user-panel-item" onClick={() => { if (typeof window !== "undefined") window.location.href = "/"; }}>
            <span>Sign out</span>
            <SignOut size={14} />
          </div>
        </div>
      </div>
    </>
  );

  const sidebarScroll: React.CSSProperties = { scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" };

  return (
    <>
      {/* Desktop sidebar — hidden when mobileOnly */}
      {!mobileOnly && (
        <aside
          className={cn("hidden md:flex flex-col shrink-0 ss-sidebar h-screen overflow-y-auto overflow-x-hidden", textSize === "large" && "text-large")}
          style={{ width, ...sidebarScroll }}
        >
          {sidebarContent}
        </aside>
      )}

      {/* Overlay sidebar (mobile always, desktop when mobileOnly/Studio) */}
      {open && (
        <div className={cn("fixed inset-0 z-50", !mobileOnly && "md:hidden")}>
          <div
            className="absolute top-10 left-0 right-0 bottom-0 bg-transparent"
            onClick={onClose}
          />
          <aside
            className={cn("absolute left-0 top-0 h-full w-56 flex flex-col ss-sidebar overflow-y-auto overflow-x-hidden", textSize === "large" && "text-large")}
            style={sidebarScroll}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
