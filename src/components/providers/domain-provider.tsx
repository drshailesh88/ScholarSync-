"use client";

import { createContext, useContext } from "react";
import type { DomainConfig } from "@/lib/search/domains/types";

const DomainContext = createContext<DomainConfig | null>(null);

export function DomainProvider({
  domain,
  children,
}: {
  domain: DomainConfig;
  children: React.ReactNode;
}) {
  return (
    <DomainContext.Provider value={domain}>
      {children}
    </DomainContext.Provider>
  );
}

export function useDomain(): DomainConfig | null {
  return useContext(DomainContext);
}
