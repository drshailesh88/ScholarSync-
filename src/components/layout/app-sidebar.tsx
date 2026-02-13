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
} from "@phosphor-icons/react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const ClerkUserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false, loading: () => <div className="w-8 h-8 rounded-full bg-surface-raised" /> }
);

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: House },
  { label: "Studio", href: "/studio", icon: PenNib },
  { label: "Deep Research", href: "/research", icon: GlobeHemisphereWest },
  { label: "Notebook", href: "/notebook", icon: Notebook },
  { label: "Library", href: "/library", icon: Books },
  { label: "Archive", href: "/projects", icon: FolderOpen },
  { label: "Compliance", href: "/compliance", icon: ShieldCheck },
  { label: "Presentation", href: "/presentation", icon: ProjectorScreenChart },
  { label: "Settings", href: "/settings", icon: Gear },
];

const hasClerkKeys =
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col shrink-0 glass-panel border-r border-border h-screen">
      <div className="h-20 flex items-center px-6 border-b border-border-subtle">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-surface-raised border border-border-subtle text-ink"
                  : "text-ink-muted hover:bg-surface-raised/50 hover:text-ink"
              )}
            >
              <IconComponent
                size={20}
                weight={isActive ? "fill" : "regular"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-border-subtle">
        {hasClerkKeys ? (
          <ClerkUserButton afterSignOutUrl="/" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/30" />
        )}
      </div>
    </aside>
  );
}
