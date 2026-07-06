"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface FunnelStageCardProps {
  name: string;
  meta?: string;
  links?: React.ReactNode;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

/** Collapsible funnel stage row on the Review Summary. */
export function FunnelStageCard({
  name,
  meta,
  links,
  defaultOpen = false,
  children,
}: FunnelStageCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen((value) => !value);

  return (
    <section className={open ? "fstage open" : "fstage"}>
      <div className="top" onClick={toggle}>
        <button
          type="button"
          className="chevbtn"
          aria-expanded={open}
          aria-label={`Toggle ${name}`}
          onClick={(event) => {
            event.stopPropagation();
            toggle();
          }}
        >
          <span className="chev" aria-hidden>
            <ChevronRight size={13} />
          </span>
        </button>
        <span className="fname">{name}</span>
        {meta ? <span className="fmeta">{meta}</span> : null}
        {links ? (
          <span className="flinks" onClick={(event) => event.stopPropagation()}>
            {links}
          </span>
        ) : null}
      </div>
      {children ? <div className="fbody">{children}</div> : null}
    </section>
  );
}
