const DIACRITIC_REGEX = /\p{Diacritic}/gu;

type MatchRange = {
  start: number;
  end: number;
};

export type SearchTextSegment = {
  text: string;
  matched: boolean;
};

export function normalizeSearchValue(value: string) {
  return value.normalize("NFD").replace(DIACRITIC_REGEX, "").toLowerCase();
}

export function getSearchTerms(query: string) {
  return Array.from(
    new Set(
      normalizeSearchValue(query)
        .trim()
        .split(/\s+/)
        .filter((term) => term.length > 0),
    ),
  );
}

function normalizeWithIndexMap(value: string) {
  let normalized = "";
  const indexMap: number[] = [];

  for (let index = 0; index < value.length; index += 1) {
    const normalizedChunk = normalizeSearchValue(value[index]);
    if (!normalizedChunk) {
      continue;
    }

    normalized += normalizedChunk;
    for (let chunkIndex = 0; chunkIndex < normalizedChunk.length; chunkIndex += 1) {
      indexMap.push(index);
    }
  }

  return { normalized, indexMap };
}

function mergeRanges(ranges: MatchRange[]) {
  if (ranges.length <= 1) {
    return ranges;
  }

  const sortedRanges = [...ranges].sort((a, b) => a.start - b.start);
  const mergedRanges: MatchRange[] = [sortedRanges[0]];

  for (let index = 1; index < sortedRanges.length; index += 1) {
    const currentRange = sortedRanges[index];
    const previousRange = mergedRanges[mergedRanges.length - 1];

    if (currentRange.start <= previousRange.end) {
      previousRange.end = Math.max(previousRange.end, currentRange.end);
      continue;
    }

    mergedRanges.push(currentRange);
  }

  return mergedRanges;
}

function buildMatchRanges(value: string, normalizedTerms: string[]) {
  if (!value || normalizedTerms.length === 0) {
    return [];
  }

  const { normalized, indexMap } = normalizeWithIndexMap(value);
  const ranges: MatchRange[] = [];

  for (const term of normalizedTerms) {
    if (!term) {
      continue;
    }

    let position = 0;
    while (position >= 0) {
      const matchIndex = normalized.indexOf(term, position);
      if (matchIndex < 0) {
        break;
      }

      const start = indexMap[matchIndex];
      const end = indexMap[matchIndex + term.length - 1];

      if (start !== undefined && end !== undefined) {
        ranges.push({ start, end: end + 1 });
      }

      position = matchIndex + term.length;
    }
  }

  return mergeRanges(ranges);
}

export function countSearchMatches(value: string, normalizedTerms: string[]) {
  return buildMatchRanges(value, normalizedTerms).length;
}

export function splitTextBySearchTerms(value: string, normalizedTerms: string[]): SearchTextSegment[] {
  const ranges = buildMatchRanges(value, normalizedTerms);
  if (ranges.length === 0) {
    return [{ text: value, matched: false }];
  }

  const segments: SearchTextSegment[] = [];
  let cursor = 0;

  for (const range of ranges) {
    if (range.start > cursor) {
      segments.push({ text: value.slice(cursor, range.start), matched: false });
    }

    segments.push({ text: value.slice(range.start, range.end), matched: true });
    cursor = range.end;
  }

  if (cursor < value.length) {
    segments.push({ text: value.slice(cursor), matched: false });
  }

  return segments;
}

export function extractSearchExcerpts(content: string, normalizedTerms: string[], maxExcerpts = 2) {
  if (normalizedTerms.length === 0) {
    return [];
  }

  const normalizedContent = normalizeSearchValue(content);
  const excerpts: string[] = [];

  for (const term of normalizedTerms) {
    const index = normalizedContent.indexOf(term);
    if (index < 0) {
      continue;
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + term.length + 70);
    const rawExcerpt = content.slice(start, end).replace(/\s+/g, " ").trim();

    if (rawExcerpt.length > 0) {
      excerpts.push(rawExcerpt);
    }
  }

  return Array.from(new Set(excerpts)).slice(0, maxExcerpts);
}
