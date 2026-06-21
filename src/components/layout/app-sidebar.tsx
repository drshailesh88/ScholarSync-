"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { X, CaretDown, Gear, Keyboard, SignOut, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useDomain } from "@/components/providers/domain-provider";
import { cn } from "@/lib/utils";
import { useUIScale } from "@/hooks/use-ui-scale";
import { BRAND } from "@/lib/config/branding";
import { isV1SearchOnly, SEARCH_LANDING_PATH } from "@/lib/config/v1-features";
import {
  getVisibleNavSections,
  svgIcons,
  type NavIcon as NavIconType,
} from "./nav-config";

const ClerkUserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false, loading: () => <div className="w-8 h-8 rounded-full bg-white/10" /> }
);

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
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

function NavIcon({ icon }: { icon: NavIconType }) {
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

export function AppSidebar({ open, onClose, onShortcutsOpen, width = 224, mobileOnly = false, collapsed = false, onToggleCollapse }: AppSidebarProps) {
  const pathname = usePathname();
  const domain = useDomain();
  const { theme, setTheme } = useTheme();
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const { scale, setScale } = useUIScale();
  const [mounted, setMounted] = useState(false);

  const searchOnly = isV1SearchOnly();
  const visibleNavSections = getVisibleNavSections({
    searchOnly,
    systematicReviewEnabled: domain?.features.systematicReview !== false,
  });

  // eslint-disable-next-line react-hooks/set-state-in-effect -- needed for hydration safety
  useEffect(() => setMounted(true), []);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={cn("flex items-center shrink-0", collapsed ? "justify-center px-0 py-4" : "justify-between px-4 py-4")}>
        <Link href={SEARCH_LANDING_PATH} className="flex items-center gap-2.5 no-underline" title={collapsed ? BRAND.name : undefined}>
          <div className="ss-logo-mark">{BRAND.name.charAt(0)}</div>
          {!collapsed && <span className="ss-logo-text">{BRAND.name}</span>}
        </Link>
        {!collapsed && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("scholarsync:open-command-palette")
                )
              }
              className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[10px] text-white/30 font-mono hover:text-white/50 hover:bg-white/[0.1] transition-colors"
              title="Search (⌘K)"
            >
              ⌘K
            </button>
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
        )}
      </div>

      {/* Nav area — grows to fill space */}
      <div className={cn("flex-1 py-2", collapsed ? "px-1" : "px-2.5")}>

        {/* Projects — hidden in search-only v1 (the dashboard is a v2 surface) */}
        {!searchOnly && (
          <div className="mb-3">
            <Link
              href="/dashboard"
              onClick={onClose}
              className={cn(
                "ss-nav-item no-underline",
                collapsed && "justify-center !px-0 !gap-0",
                (pathname === "/dashboard" || pathname === "/") && "active"
              )}
              title={collapsed ? "Projects" : undefined}
            >
              <div className="ss-nav-icon">{svgIcons.projects}</div>
              {!collapsed && <span className="ss-nav-label">Projects</span>}
            </Link>
          </div>
        )}

        {/* Nav sections */}
        {!visibleNavSections.length ? null : visibleNavSections.map((section) => (
          <div key={section.label} className={cn("mb-4", collapsed && "mb-2")}>
            {!collapsed && <div className="ss-section-label">{section.label}</div>}
            {collapsed && <div className="w-5 mx-auto my-2 border-t border-white/[0.06]" />}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "ss-nav-item no-underline",
                      collapsed && "justify-center !px-0 !gap-0",
                      isActive && "active",
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <NavIcon icon={item.icon} />
                    {!collapsed && <span className="ss-nav-label">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Collapse toggle */}
      {onToggleCollapse && (
        <div className={cn("px-2 shrink-0", collapsed ? "flex justify-center" : "")}>
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center w-full p-1.5 rounded-md text-white/25 hover:text-white/60 hover:bg-white/[0.06] transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <CaretRight size={14} /> : <CaretLeft size={14} />}
          </button>
        </div>
      )}

      {/* Bottom — user area with expandable panel */}
      <div className={cn("shrink-0 mt-auto", collapsed ? "px-1 py-3" : "px-3 py-3")} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className={cn("ss-user-area", collapsed && "justify-center !px-0 !gap-0")}
          onClick={() => !collapsed && setUserPanelOpen(!userPanelOpen)}
          title={collapsed ? "Dr. Singh" : undefined}
        >
          {hasClerkKeys ? (
            <ClerkUserButton afterSignOutUrl="/" />
          ) : (
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white/90 shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.4), rgba(99,102,241,0.3))" }}>
              SS
            </div>
          )}
          {!collapsed && (
            <>
              <span className="text-[12px] text-white/50">Dr. Singh</span>
              <CaretDown
                size={12}
                className="ss-user-chevron"
                style={{ transform: userPanelOpen ? "rotate(180deg)" : "", transition: "transform 0.2s ease" }}
              />
            </>
          )}
        </div>

        {!collapsed && (
          <div className={cn("ss-user-panel", userPanelOpen && "open")}>
            {/* Zoom */}
            <div className="ss-user-panel-item">
              <span>Zoom</span>
              <div className="ss-text-size-toggle">
                <span
                  className={cn("ss-text-size-opt", scale === "default" && "active")}
                  style={{ fontSize: 10 }}
                  onClick={() => setScale("default")}
                >
                  100%
                </span>
                <span
                  className={cn("ss-text-size-opt", scale === "large" && "active")}
                  style={{ fontSize: 10 }}
                  onClick={() => setScale("large")}
                >
                  110%
                </span>
                <span
                  className={cn("ss-text-size-opt", scale === "larger" && "active")}
                  style={{ fontSize: 10 }}
                  onClick={() => setScale("larger")}
                >
                  120%
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
        )}
      </div>
    </>
  );

  const sidebarScroll: React.CSSProperties = { scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" };

  return (
    <>
      {/* Desktop sidebar — hidden when mobileOnly */}
      {!mobileOnly && (
        <aside
          className="hidden md:flex flex-col shrink-0 ss-sidebar h-screen overflow-y-auto overflow-x-hidden transition-[width] duration-200 ease-in-out"
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
            className={cn("absolute left-0 top-0 h-full w-56 flex flex-col ss-sidebar overflow-y-auto overflow-x-hidden", )}
            style={sidebarScroll}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
