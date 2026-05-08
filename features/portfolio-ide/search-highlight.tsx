"use client";

import type { ReactNode } from "react";

import type { PortfolioFileId } from "@/features/portfolio-ide/model";
import { usePortfolioSearchFocus } from "@/features/portfolio-ide/search-navigation-context";
import { getSearchTerms, splitTextBySearchTerms } from "@/features/portfolio-ide/search-text";

export function useSearchHighlightQuery(fileId: PortfolioFileId) {
  const { searchFocus } = usePortfolioSearchFocus();
  if (!searchFocus || searchFocus.fileId !== fileId) {
    return "";
  }

  return searchFocus.query.trim();
}

export function renderHighlightedText(value: string, query: string): ReactNode {
  const normalizedTerms = getSearchTerms(query);
  if (normalizedTerms.length === 0) {
    return value;
  }

  const segments = splitTextBySearchTerms(value, normalizedTerms);

  return segments.map((segment, index) => {
    if (!segment.matched) {
      return <span key={`${segment.text}-${index}`}>{segment.text}</span>;
    }

    return (
      <mark
        key={`${segment.text}-${index}`}
        className="rounded bg-[var(--color-ide-accent-blue)] px-1 py-0.5 text-white"
      >
        {segment.text}
      </mark>
    );
  });
}
