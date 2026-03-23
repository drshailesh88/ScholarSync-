"use client";

import { useState, useRef, useCallback } from "react";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { CommandPalette } from "@/components/ui/command-palette";
import BuddyFAB from "@/components/buddy/buddy-fab";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(224);
  const resizing = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (ev: MouseEvent) => {
      if (!resizing.current) return;
      const newWidth = Math.max(180, Math.min(320, ev.clientX));
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      resizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        width={sidebarWidth}
      />

      {/* Resize handle */}
      <div
        onMouseDown={handleMouseDown}
        className="w-1 shrink-0 cursor-col-resize relative z-10 hidden md:block group"
      >
        <div className="absolute inset-y-0 -left-[3px] -right-[3px]" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-transparent group-hover:w-[3px] group-hover:bg-[#6D28D9]/40 group-hover:rounded transition-all" />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <CommandPalette />
      <BuddyFAB />
    </div>
  );
}
