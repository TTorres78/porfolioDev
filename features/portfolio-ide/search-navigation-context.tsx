"use client";

import { createContext, useContext } from "react";

import type { PortfolioFileId, SkillGroupId } from "@/features/portfolio-ide/model";

export type PortfolioSearchFocus = {
  fileId: PortfolioFileId;
  query: string;
  timestamp: number;
  skillGroupId?: SkillGroupId;
  projectId?: string;
};

type PortfolioSearchFocusContextValue = {
  searchFocus: PortfolioSearchFocus | null;
  setSearchFocus: (focus: PortfolioSearchFocus | null) => void;
};

const PortfolioSearchFocusContext = createContext<PortfolioSearchFocusContextValue | null>(null);

export function PortfolioSearchFocusProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: PortfolioSearchFocusContextValue;
}) {
  return (
    <PortfolioSearchFocusContext.Provider value={value}>
      {children}
    </PortfolioSearchFocusContext.Provider>
  );
}

export function usePortfolioSearchFocus() {
  const context = useContext(PortfolioSearchFocusContext);
  if (!context) {
    throw new Error("usePortfolioSearchFocus must be used inside PortfolioSearchFocusProvider");
  }

  return context;
}
