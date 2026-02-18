"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import {
  House,
  PenNib,
  GlobeHemisphereWest,
  Notebook,
  Books,
  FolderOpen,
  ShieldCheck,
  ProjectorScreenChart,
  Gear,
  X,
} from "@phosphor-icons/react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const ClerkUserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false, loading: () => <div className="w-8 h-8 rounded-full bg-shell-border" /> }
);

const navSections = [
  {
    label: "WORKSPACE",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: House },
      { label: "Studio", href: "/studio", icon: PenNib },
      { label: "Deep Research", href: "/research", icon: GlobeHemisphereWest },
      { label: "Notebook", href: "/notebook", icon: Notebook },
    ],
  },
  {
    label: "LIBRARY",
    items: [
      { label: "Papers", href: "/library", icon: Books },
      { label: "Archive", href: "/projects", icon: FolderOpen },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { label: "Compliance", href: "/compliance", icon: ShieldCheck },
      { label: "Presentation", href: "/presentation", icon: ProjectorScreenChart },
      { label: "Settings", href: "/settings", icon: Gear },
    ],
  },
];

const hasClerkKeys =
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

interface AppSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center justify-between px-5 border-b border-shell-border">
        <Logo />
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded text-shell-text hover:text-shell-active transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto scroll-subtle">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-3 mb-1.5 text-[10px] font-mono font-medium text-shell-text uppercase tracking-widest">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-all",
                      isActive
                        ? "text-shell-active border-l-2 border-brand bg-white/5"
                        : "text-shell-text hover:text-shell-active hover:bg-white/5"
                    )}
                  >
                    <IconComponent
                      size={18}
                      weight={isActive ? "fill" : "regular"}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-shell-border">
        {hasClerkKeys ? (
          <ClerkUserButton afterSignOutUrl="/" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/30" />
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col shrink-0 bg-shell border-r border-shell-border h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile overlay sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-60 flex flex-col bg-shell border-r border-shell-border">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
