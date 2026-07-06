"use client";

import Link from "next/link";
import type { SrStageId } from "@/lib/sr/stage-rail";
import { stageHref } from "@/lib/sr/stage-rail";

interface StageTarget {
  reviewId: string;
  stage: SrStageId;
  enabledStages: readonly SrStageId[];
}

/** Inline stage link that stays inert until the target stage exists. */
export function StageLink({
  reviewId,
  stage,
  enabledStages,
  children,
}: StageTarget & { children: React.ReactNode }) {
  if (!enabledStages.includes(stage)) {
    return <span aria-disabled="true">{children}</span>;
  }
  return <Link href={stageHref(reviewId, stage)}>{children}</Link>;
}

/** Button-styled stage CTA; disabled until the target stage exists. */
export function StageButton({
  reviewId,
  stage,
  enabledStages,
  primary,
  children,
}: StageTarget & { primary?: boolean; children: React.ReactNode }) {
  const className = primary ? "btn pri" : "btn";
  if (!enabledStages.includes(stage)) {
    return (
      <button type="button" className={className} disabled>
        {children}
      </button>
    );
  }
  return (
    <Link href={stageHref(reviewId, stage)} className={className}>
      {children}
    </Link>
  );
}
