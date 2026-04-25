"use client";

import { useCallback, useEffect, useMemo, useState, type KeyboardEvent, type MouseEvent } from "react";
import {
  ChevronDown,
  ChevronRight,
  Files,
  GitBranch,
  PlaySquare,
  Search,
  Settings,
  TerminalSquare,
  X,
  type LucideIcon,
} from "lucide-react";

import { FILE_CONTENTS_BY_ID } from "@/features/portfolio-ide/contents";
import {
  DEFAULT_OPEN_FILE_IDS,
  PORTFOLIO_FILES,
  PORTFOLIO_FILES_BY_ID,
  type PortfolioFileId,
} from "@/features/portfolio-ide/model";
import { FILE_UI_BY_ID } from "@/features/portfolio-ide/ui-config";

type SidebarAction = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const TOP_SIDEBAR_ACTIONS: SidebarAction[] = [
  { id: "search", label: "Recherche", icon: Search },
  { id: "git", label: "Git", icon: GitBranch },
  { id: "run", label: "Exécution", icon: PlaySquare },
];

const BOTTOM_SIDEBAR_ACTION: SidebarAction = { id: "settings", label: "Paramètres", icon: Settings };

function isPortfolioFileId(value: string): value is PortfolioFileId {
  return Object.hasOwn(PORTFOLIO_FILES_BY_ID, value);
}

export function PortfolioIde() {
  const [openFileIds, setOpenFileIds] = useState<PortfolioFileId[]>(DEFAULT_OPEN_FILE_IDS);
  const [activeFileId, setActiveFileId] = useState<PortfolioFileId | null>(DEFAULT_OPEN_FILE_IDS[0]);
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const isProjectsFileActive = activeFileId === "projets";

  const openFiles = useMemo(
    () => openFileIds.map((fileId) => PORTFOLIO_FILES_BY_ID[fileId]),
    [openFileIds],
  );

  const activeFile = activeFileId ? PORTFOLIO_FILES_BY_ID[activeFileId] : null;
  const ActiveFileContent = activeFileId ? FILE_CONTENTS_BY_ID[activeFileId] : null;

  const openFileById = useCallback((fileId: PortfolioFileId) => {
    setOpenFileIds((previous) => (previous.includes(fileId) ? previous : [...previous, fileId]));
    setActiveFileId(fileId);
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      const fileIdFromHash = window.location.hash.replace("#", "").trim();

      if (isPortfolioFileId(fileIdFromHash)) {
        openFileById(fileIdFromHash);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => {
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [openFileById]);

  useEffect(() => {
    if (!activeFileId) {
      return;
    }

    const hash = `#${activeFileId}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }, [activeFileId]);

  const handleCloseFile = (event: MouseEvent<HTMLButtonElement>, fileId: PortfolioFileId) => {
    event.stopPropagation();

    setOpenFileIds((previous) => {
      const nextOpenFileIds = previous.filter((id) => id !== fileId);

      if (activeFileId === fileId) {
        setActiveFileId(nextOpenFileIds.length > 0 ? nextOpenFileIds[nextOpenFileIds.length - 1] : null);
      }

      return nextOpenFileIds;
    });
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, fileId: PortfolioFileId) => {
    const currentIndex = openFileIds.findIndex((id) => id === fileId);
    if (currentIndex < 0) {
      return;
    }

    let nextIndex = currentIndex;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % openFileIds.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + openFileIds.length) % openFileIds.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = openFileIds.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextFileId = openFileIds[nextIndex];
    setActiveFileId(nextFileId);
    document.getElementById(`tab-${nextFileId}`)?.focus();
  };

  return (
    <div className="flex h-svh w-full flex-col overflow-hidden bg-(--color-ide-bg) text-(--color-ide-text) selection:bg-[#264f78]">
      <header className="flex h-8 items-center justify-between border-b border-(--color-ide-bg) bg-(--color-ide-surface-3) px-3 text-xs select-none">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 text-center text-(--color-ide-text)">
          <span className="sm:hidden">Portfolio</span>
          <span className="hidden sm:inline">Timothé TORRES - Visual Studio Code</span>
        </div>
        <div className="w-12" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-12 flex-col items-center border-r border-(--color-ide-surface-1) bg-(--color-ide-border) py-4 sm:flex">
          <button
            type="button"
            className={`mb-6 -ml-2 pl-2 transition-colors ${
              isExplorerOpen
                ? "border-l-2 border-white text-white"
                : "cursor-pointer text-(--color-ide-text-muted) hover:text-white"
            }`}
            onClick={() => setIsExplorerOpen((previous) => !previous)}
            aria-label="Basculer l'explorateur"
          >
            <Files size={28} strokeWidth={1.5} />
          </button>

          {TOP_SIDEBAR_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                className="mb-6 cursor-not-allowed text-(--color-ide-text-muted) opacity-50"
                aria-label={action.label}
                disabled
                title="Bientôt disponible"
              >
                <Icon size={28} strokeWidth={1.5} />
              </button>
            );
          })}

          <div className="flex-1" />

          <button
            type="button"
            className="cursor-not-allowed text-(--color-ide-text-muted) opacity-50"
            aria-label={BOTTOM_SIDEBAR_ACTION.label}
            disabled
            title="Bientôt disponible"
          >
            <BOTTOM_SIDEBAR_ACTION.icon size={28} strokeWidth={1.5} />
          </button>
        </aside>

        {isExplorerOpen ? (
          <aside className="hidden w-56 flex-col border-r border-(--color-ide-bg) bg-(--color-ide-surface-1) sm:flex">
            <div className="px-5 py-3 text-[11px] font-semibold tracking-wider text-(--color-ide-text) uppercase">
              Explorateur
            </div>

            <div className="flex flex-col">
              <button
                type="button"
                className="flex cursor-pointer items-center px-2 py-1 text-left hover:bg-(--color-ide-surface-2)"
                onClick={() => setIsFolderOpen((previous) => !previous)}
              >
                {isFolderOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                <span className="ml-1 text-sm font-bold text-(--color-ide-text) uppercase">Portfolio</span>
              </button>

              {isFolderOpen ? (
                <div className="flex flex-col">
                  {PORTFOLIO_FILES.map((file) => {
                    const fileUi = FILE_UI_BY_ID[file.id];
                    const Icon = fileUi.icon;
                    const isActive = activeFileId === file.id;

                    return (
                      <button
                        key={file.id}
                        type="button"
                        className={`flex cursor-pointer items-center px-6 py-1 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-(--color-ide-selection) text-white"
                            : "text-(--color-ide-text) hover:bg-(--color-ide-surface-2)"
                        }`}
                        onClick={() => openFileById(file.id)}
                      >
                        <Icon size={18} className={fileUi.iconClassName} />
                        <span className="ml-2">{file.name}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </aside>
        ) : null}

        <section className="flex min-w-0 flex-1 flex-col bg-(--color-ide-bg)">
          <div role="tablist" aria-label="Fichiers ouverts" className="flex h-9 overflow-x-auto bg-(--color-ide-surface-1)">
            {openFiles.map((file) => {
              const fileUi = FILE_UI_BY_ID[file.id];
              const Icon = fileUi.icon;
              const isActive = activeFileId === file.id;
              const panelId = `panel-${file.id}`;

              return (
                <div
                  key={file.id}
                  className={`group flex min-w-30 max-w-50 items-center border-r border-(--color-ide-border-muted) px-2 transition-colors sm:min-w-35 sm:max-w-55 ${
                    isActive
                      ? "border-t border-t-(--color-ide-accent-blue) bg-(--color-ide-bg) text-white"
                      : "bg-(--color-ide-surface-2) text-[#8b949e]"
                  }`}
                >
                  <button
                    id={`tab-${file.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
                    className={`flex min-w-0 flex-1 cursor-pointer items-center py-2 text-left ${
                      isActive ? "hover:text-white" : "hover:text-(--color-ide-text)"
                    }`}
                    onClick={() => setActiveFileId(file.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, file.id)}
                  >
                    <Icon size={18} className={fileUi.iconClassName} />
                    <span className="ml-2 truncate text-sm">{file.name}</span>
                  </button>

                  <button
                    type="button"
                    className={`ml-2 hidden rounded-md p-0.5 hover:bg-(--color-ide-border) sm:block ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    onClick={(event) => handleCloseFile(event, file.id)}
                    aria-label={`Fermer ${file.name}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          <div
            id={activeFile ? `panel-${activeFile.id}` : undefined}
            role="tabpanel"
            aria-labelledby={activeFile ? `tab-${activeFile.id}` : undefined}
            className={`relative flex-1 p-3 sm:p-5 md:p-6 lg:p-7 ${
              isProjectsFileActive
                ? "overflow-y-auto custom-scrollbar"
                : "overflow-y-auto custom-scrollbar sm:overflow-hidden"
            }`}
          >
            {ActiveFileContent ? (
              <div
                className={`mx-auto w-full text-(--color-ide-text) ${
                  isProjectsFileActive ? "max-w-4xl" : "ide-fit-page max-w-5xl sm:h-full"
                }`}
              >
                <ActiveFileContent />
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center opacity-40 select-none">
                <TerminalSquare size={120} className="mb-6 text-(--color-ide-text)" strokeWidth={1} />
                <p className="text-center text-xl">Ouvrez un fichier pour commencer l&apos;exploration</p>
                <div className="mt-8 flex flex-col gap-4 text-sm sm:flex-row sm:gap-8">
                  <div className="flex flex-col items-center">
                    <span className="mb-2 rounded border border-(--color-ide-text) px-2 py-1">Cmd/Ctrl + P</span>
                    Rechercher un fichier
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-2 rounded border border-(--color-ide-text) px-2 py-1">
                      Cmd/Ctrl + Shift + F
                    </span>
                    Recherche globale
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="flex h-6 items-center justify-between bg-(--color-ide-accent-blue) px-2 sm:px-3 text-xs text-white select-none">
        <div className="flex items-center space-x-4">
          <div className="flex cursor-pointer items-center px-1 hover:bg-[#1f8ad2]">
            <GitBranch size={14} className="mr-1" /> main
          </div>
          <div className="hidden cursor-pointer px-1 hover:bg-[#1f8ad2] sm:block">0 ⚠ 0 ❌</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden cursor-pointer px-1 hover:bg-[#1f8ad2] sm:block">Ligne 1, Col 1</div>
          <div className="hidden cursor-pointer px-1 hover:bg-[#1f8ad2] sm:block">Espaces : 2</div>
          <div className="hidden cursor-pointer px-1 hover:bg-[#1f8ad2] sm:block">UTF-8</div>
          <div className="cursor-pointer px-1 hover:bg-[#1f8ad2]">{activeFile ? activeFile.language : "React"}</div>
        </div>
      </footer>
    </div>
  );
}
