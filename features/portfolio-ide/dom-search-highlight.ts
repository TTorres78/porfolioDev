import { getSearchTerms, splitTextBySearchTerms } from "@/features/portfolio-ide/search-text";

const SEARCH_MARK_SELECTOR = 'mark[data-portfolio-search-highlight="true"]';

export function clearSearchHighlights(root: HTMLElement) {
  const marks = root.querySelectorAll(SEARCH_MARK_SELECTOR);
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) {
      return;
    }

    parent.replaceChild(document.createTextNode(mark.textContent ?? ""), mark);
    parent.normalize();
  });
}

export function applySearchHighlights(root: HTMLElement, query: string) {
  const normalizedTerms = getSearchTerms(query);
  if (normalizedTerms.length === 0) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const textValue = node.nodeValue ?? "";
      if (!textValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      const parentElement = node.parentElement;
      if (!parentElement) {
        return NodeFilter.FILTER_REJECT;
      }

      if (
        parentElement.closest("mark, script, style, noscript, textarea, [contenteditable='true']")
      ) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  for (const textNode of textNodes) {
    const originalText = textNode.nodeValue ?? "";
    const segments = splitTextBySearchTerms(originalText, normalizedTerms);
    const hasMatch = segments.some((segment) => segment.matched);

    if (!hasMatch) {
      continue;
    }

    const fragment = document.createDocumentFragment();

    for (const segment of segments) {
      if (!segment.text) {
        continue;
      }

      if (segment.matched) {
        const mark = document.createElement("mark");
        mark.dataset.portfolioSearchHighlight = "true";
        mark.className = "rounded bg-[var(--color-ide-accent-blue)] px-1 py-0.5 text-white";
        mark.textContent = segment.text;
        fragment.appendChild(mark);
      } else {
        fragment.appendChild(document.createTextNode(segment.text));
      }
    }

    textNode.parentNode?.replaceChild(fragment, textNode);
  }
}
