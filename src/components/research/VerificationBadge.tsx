"use client";

import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  status: "verified" | "partial" | "unverified" | "retracted" | "pending";
  details?: string;
  compact?: boolean;
}

const STATUS_CONFIG = {
  verified: {
    icon: "\u2705",
    label: "Verified",
    className: "text-emerald-500 bg-emerald-500/10",
    tooltip: "Paper confirmed in PubMed/CrossRef",
  },
  partial: {
    icon: "\u26A0\uFE0F",
    label: "Partial",
    className: "text-amber-500 bg-amber-500/10",
    tooltip: "Some metadata doesn't match",
  },
  unverified: {
    icon: "\u2753",
    label: "Unverified",
    className: "text-slate-400 bg-slate-500/10",
    tooltip: "Could not verify against PubMed or CrossRef",
  },
  retracted: {
    icon: "\uD83D\uDEAB",
    label: "RETRACTED",
    className: "text-red-500 bg-red-500/15 font-bold",
    tooltip: "This paper has been retracted",
  },
  pending: {
    icon: "\u23F3",
    label: "Verifying...",
    className: "text-slate-400 bg-slate-500/10 animate-pulse",
    tooltip: "Verification in progress",
  },
};

export function VerificationBadge({ status, details, compact }: VerificationBadgeProps) {
  const config = STATUS_CONFIG[status];

  if (compact) {
    return (
      <span
        className={cn("text-[10px] leading-none", config.className)}
        title={details || config.tooltip}
      >
        {config.icon}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] leading-tight",
        config.className
      )}
      title={details || config.tooltip}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
