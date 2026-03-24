"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { CommandPalette } from "@/components/ui/command-palette";
import { ShortcutsPanel } from "@/components/ui/shortcuts-panel";
import { BuddyFab, BuddyPanel } from "@/components/buddy/buddy-panel";
import { ResizeHandle } from "@/components/ui/resize-handle";

const SIDEBAR_MIN = 180;
const SIDEBAR_MAX = 320;
const SIDEBAR_DEFAULT = 224;
const BUDDY_MIN = 280;
const BUDDY_MAX_RATIO = 0.5;

// Routes where the sidebar auto-collapses for distraction-free writing
const DISTRACTION_FREE_ROUTES = ["/studio", "/latex"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [buddyOpen, setBuddyOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const [buddyWidth, setBuddyWidth] = useState(360);

  // Auto-collapse sidebar on distraction-free routes
  const isDistractionFree = DISTRACTION_FREE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const handleSidebarResize = useCallback((delta: number) => {
    setSidebarWidth((w) => Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, w + delta)));
  }, []);

  const handleBuddyResize = useCallback((delta: number) => {
    const maxWidth = typeof window !== "undefined" ? window.innerWidth * BUDDY_MAX_RATIO : 600;
    setBuddyWidth((w) => Math.min(maxWidth, Math.max(BUDDY_MIN, w + delta)));
  }, []);

  return (
    <div className="flex h-screen">
      {/* Desktop sidebar — hidden on distraction-free routes */}
      {!isDistractionFree && (
        <>
          <AppSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onShortcutsOpen={() => setShortcutsOpen(true)}
            width={sidebarWidth}
          />
          <div className="hidden md:flex h-screen">
            <ResizeHandle side="right" onResize={handleSidebarResize} />
          </div>
        </>
      )}

      {/* Mobile sidebar — available even on distraction-free routes via hamburger */}
      {isDistractionFree && (
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onShortcutsOpen={() => setShortcutsOpen(true)}
          width={sidebarWidth}
          mobileOnly
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {!isDistractionFree && (
          <AppHeader onMenuClick={() => setSidebarOpen(true)} />
        )}
        <main className={`flex-1 overflow-y-auto ${isDistractionFree ? "p-0" : "p-6"}`}>{children}</main>
      </div>

      {/* Buddy — hidden on editor routes where Workbench replaces it */}
      {!isDistractionFree && buddyOpen && (
        <>
          <ResizeHandle side="left" onResize={handleBuddyResize} />
          <BuddyPanel isOpen={buddyOpen} onClose={() => setBuddyOpen(false)} width={buddyWidth} />
        </>
      )}

      {/* Buddy FAB — hidden on distraction-free routes */}
      {!isDistractionFree && !buddyOpen && <BuddyFab onClick={() => setBuddyOpen(true)} />}

      {/* Overlays */}
      <CommandPalette />
      <ShortcutsPanel isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
}
