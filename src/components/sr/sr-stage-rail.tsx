"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { StageRailItem } from "@/lib/sr/stage-rail";

interface SrStageRailProps {
  items: StageRailItem[];
  projectTitle: string;
  projectMeta: string;
}

function StageBadge({ item }: { item: StageRailItem }) {
  return (
    <span className="num" aria-hidden>
      {item.n ?? <Star size={11} strokeWidth={2.5} />}
    </span>
  );
}

function StageRow({ item }: { item: StageRailItem }) {
  const className = [
    "stage",
    item.active ? "on" : "",
    item.done ? "done" : "",
    item.href ? "" : "locked",
  ]
    .filter(Boolean)
    .join(" ");

  const body = (
    <>
      <span className="r1">
        <StageBadge item={item} />
        <span className="nm">{item.label}</span>
        {item.count ? (
          <span className={item.conf ? "ct conf" : "ct"}>{item.count}</span>
        ) : null}
      </span>
      {item.progress !== undefined && item.progress > 0 ? (
        <span className="prog">
          <i style={{ width: `${item.progress}%` }} />
        </span>
      ) : null}
    </>
  );

  if (!item.href) {
    return (
      <span className={className} aria-disabled="true">
        {body}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      aria-current={item.active ? "page" : undefined}
    >
      {body}
    </Link>
  );
}

/** The funnel spine: Review Summary plus the nine stages, with live counts. */
export function SrStageRail({
  items,
  projectTitle,
  projectMeta,
}: SrStageRailProps) {
  const [summary, ...stages] = items;
  const prismaItem = items.find((item) => item.id === "prisma");
  const exportItem = items.find((item) => item.id === "export");

  return (
    <aside className="rail">
      <div className="proj">{projectTitle}</div>
      <div className="projmeta">{projectMeta}</div>

      <div className="railgroup">Review</div>
      <StageRow item={summary} />

      <div className="railgroup">The funnel</div>
      <nav className="spine" aria-label="Review stages">
        {stages
          .filter((item) => item.id !== "summary")
          .map((item) => (
            <StageRow key={item.id} item={item} />
          ))}
      </nav>

      <div className="railfoot">
        {prismaItem?.href ? <Link href={prismaItem.href}>PRISMA</Link> : null}
        {exportItem?.href ? <Link href={exportItem.href}>Export</Link> : null}
      </div>
    </aside>
  );
}
