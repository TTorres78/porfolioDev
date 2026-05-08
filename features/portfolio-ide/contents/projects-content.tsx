"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  Info,
  Layout,
  Server,
  Star,
  X,
} from "lucide-react";

import {
  PROJECT_CARDS,
  type ProjectCard,
  type ProjectCategory,
} from "@/features/portfolio-ide/model";
import { PROJECTS_COPY } from "@/features/portfolio-ide/portfolio-copy";
import { usePortfolioSearchFocus } from "@/features/portfolio-ide/search-navigation-context";
import {
  PROJECT_PREVIEW_ICON_BY_KEY,
  PROJECT_PREVIEW_ICON_CLASS_BY_KEY,
} from "@/features/portfolio-ide/ui-config";

const PROJECT_CATEGORY_CLASS_BY_KEY: Record<ProjectCategory, string> = {
  Freelance: "border-[#d7ba7d]/45 bg-[#d7ba7d]/12 text-[#d7ba7d]",
  Professionnel: "border-[#4fc1ff]/45 bg-[#4fc1ff]/12 text-[#4fc1ff]",
  Personnel: "border-[#c586c0]/45 bg-[#c586c0]/12 text-[#c586c0]",
  ["Acad\u00E9mique"]: "border-[#2cb67d]/45 bg-[#2cb67d]/12 text-[#2cb67d]",
};

const PROJECT_MODAL_TYPE_CLASS_BY_CATEGORY: Record<ProjectCategory, string> = {
  Freelance: "text-[#d7ba7d] bg-[#d7ba7d]/10 border-[#d7ba7d]/30",
  Professionnel: "text-[#4fc1ff] bg-[#4fc1ff]/10 border-[#4fc1ff]/30",
  Personnel: "text-[#c586c0] bg-[#c586c0]/10 border-[#c586c0]/30",
  ["Acad\u00E9mique"]: "text-[#2cb67d] bg-[#2cb67d]/10 border-[#2cb67d]/30",
};

const IMAGE_OVERLAY_CLASS_NAME =
  "absolute inset-0 bg-black/48 transition-colors duration-300 group-hover:bg-black/0";

function isProjectLinkAvailable(href: string) {
  return href.trim().length > 0 && href.trim() !== "#";
}

function isAnnexDocumentAvailable(href?: string) {
  return Boolean(href && isProjectLinkAvailable(href));
}

const PROJECT_MODAL_FALLBACK_ICON_BY_CATEGORY: Record<ProjectCategory, typeof Code2> = {
  Freelance: Layout,
  Professionnel: Server,
  Personnel: Code2,
  ["Acad\u00E9mique"]: Code2,
};

function GitHubMarkIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.2.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 3 1.4 3.7 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6A4.7 4.7 0 0 1 6.8 8c-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1a4.7 4.7 0 0 1 1.3 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function ProjectModalHeroIcon({ project }: { project: ProjectCard }) {
  if (project.preview.type === "icon") {
    const Icon = PROJECT_PREVIEW_ICON_BY_KEY[project.preview.value];
    return <Icon size={64} className="text-white opacity-90 scale-125" />;
  }

  if (project.preview.type === "text") {
    return <div className="font-mono text-5xl text-white opacity-90 scale-110">{project.preview.value}</div>;
  }

  const FallbackIcon = PROJECT_MODAL_FALLBACK_ICON_BY_CATEGORY[project.category];
  return <FallbackIcon size={64} className="text-white opacity-90 scale-125" />;
}

function ProjectVisual({ project, modal = false }: { project: ProjectCard; modal?: boolean }) {
  const isImagePreview = project.preview.type === "image";
  const previewClassName = isImagePreview
    ? project.id === "arkrunners"
      ? "bg-cover bg-[center_42%]"
      : "bg-cover bg-center"
    : `bg-linear-to-br ${project.themeClassName}`;
  const previewStyle = isImagePreview
    ? { backgroundImage: `url(${project.preview.value})` }
    : undefined;
  const heightClassName = modal ? "h-40 sm:h-60" : "h-36 sm:h-40";

  return (
    <div className={`relative overflow-hidden ${heightClassName} ${previewClassName}`} style={previewStyle}>
      {isImagePreview ? <div className={modal ? "absolute inset-0 bg-black/35" : IMAGE_OVERLAY_CLASS_NAME} /> : null}

      <div className="relative flex h-full items-center justify-center">
        {!isImagePreview ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] opacity-10 bg-size-[16px_16px]" />
        ) : null}
        {project.preview.type === "text" ? (
          <div className="font-mono text-2xl text-white opacity-60">{project.preview.value}</div>
        ) : null}
        {project.preview.type === "icon" ? (
          (() => {
            const Icon = PROJECT_PREVIEW_ICON_BY_KEY[project.preview.value];
            const iconClassName = PROJECT_PREVIEW_ICON_CLASS_BY_KEY[project.preview.value];
            return <Icon size={56} className={iconClassName} />;
          })()
        ) : null}
      </div>
    </div>
  );
}

export function ProjectsFileContent() {
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [expandedKeyPointId, setExpandedKeyPointId] = useState<string | null>(null);
  const { searchFocus } = usePortfolioSearchFocus();

  const openProjectDetails = (project: ProjectCard) => {
    setSelectedProject(project);
    setExpandedKeyPointId(null);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    setExpandedKeyPointId(null);
  };

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProjectDetails();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!searchFocus || searchFocus.fileId !== "projets" || !searchFocus.projectId) {
      return;
    }

    const projectFromSearch = PROJECT_CARDS.find((project) => project.id === searchFocus.projectId);
    if (!projectFromSearch) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setSelectedProject(projectFromSearch);
      setExpandedKeyPointId(null);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [searchFocus]);

  const siteHref = selectedProject?.modalLinks?.siteHref ?? "";
  const sourceHref = selectedProject?.modalLinks?.sourceHref ?? "";
  const annexDocuments = selectedProject?.details.annexDocuments ?? [];

  const isSiteButtonEnabled = Boolean(
    selectedProject &&
      selectedProject.modalButtons?.isSiteEnabled &&
      isProjectLinkAvailable(siteHref),
  );
  const isSourceButtonEnabled = Boolean(
    selectedProject &&
      selectedProject.modalButtons?.isSourceEnabled &&
      isProjectLinkAvailable(sourceHref),
  );

  return (
    <>
      <div className="font-sans">
        <h1 className="mb-2 flex items-center text-2xl font-bold text-white sm:mb-3 sm:text-3xl">
          {PROJECTS_COPY.title}
        </h1>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-(--color-ide-text) sm:mb-8">
          {PROJECTS_COPY.intro}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {PROJECT_CARDS.map((project) => (
            <article
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`Ouvrir les détails du projet ${project.title}`}
              onClick={() => openProjectDetails(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openProjectDetails(project);
                }
              }}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-(--color-ide-border) bg-(--color-ide-surface-1) transition-all duration-300 hover:-translate-y-1 hover:border-(--color-ide-accent-cyan) hover:shadow-2xl hover:shadow-(--color-ide-accent-blue)/10"
            >
              <div className="absolute top-3 right-3 z-10 rounded-md border border-white/10 bg-(--color-ide-bg)/80 px-3 py-1 text-xs font-medium text-(--color-ide-text) backdrop-blur">
                {project.year}
              </div>

              <ProjectVisual project={project} />

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-(--color-ide-accent-cyan) sm:text-xl">
                    {project.title}
                  </h3>
                  <span
                    className={`shrink-0 rounded-md border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${PROJECT_CATEGORY_CLASS_BY_KEY[project.category]}`}
                  >
                    {project.category}
                  </span>
                </div>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-(--color-ide-text) transition-colors group-hover:text-[#e4e4e4]">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-(--color-ide-border) bg-(--color-ide-bg) px-2 py-1 text-xs text-white transition-colors group-hover:border-(--color-ide-accent-cyan)/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="mt-2 inline-flex w-fit items-center gap-1 text-sm text-(--color-ide-text) transition-colors group-hover:text-(--color-ide-accent-cyan)">
                  {PROJECTS_COPY.detailsCta} <ArrowUpRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={closeProjectDetails}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            className="bg-[#1e1e1e] border border-[#333333] rounded-2xl w-full max-w-3xl max-h-[94dvh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={`h-28 sm:h-40 bg-linear-to-br ${selectedProject.themeClassName} relative flex items-center justify-center shrink-0 overflow-hidden`}>
              <button
                type="button"
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-black/20 p-2.5 text-white backdrop-blur-md transition-colors hover:bg-black/40"
                aria-label="Fermer les details du projet"
              >
                <X size={20} />
              </button>
              {selectedProject.preview.type === "image" ? (
                <>
                  <div
                    className={`absolute inset-0 bg-cover ${selectedProject.id === "arkrunners" ? "bg-position-[center_42%]" : "bg-center"}`}
                    style={{ backgroundImage: `url(${selectedProject.preview.value})` }}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[16px_16px]" />
                  <ProjectModalHeroIcon project={selectedProject} />
                </>
              )}
            </div>

            <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${PROJECT_MODAL_TYPE_CLASS_BY_CATEGORY[selectedProject.category]}`}
                >
                  {selectedProject.category}
                </span>
                <span className="text-[#858585] text-sm font-medium">{selectedProject.year}</span>
              </div>

              <h2 id="project-details-title" className="text-2xl font-bold text-white mb-6 sm:mb-8 sm:text-3xl">
                {selectedProject.title}
              </h2>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white  mb-3 flex items-center">
                    <Info size={20} className="mr-2 text-[#4fc1ff]" />
                    {PROJECTS_COPY.modalAboutTitle}
                  </h3>
                  <p className="text-[#cccccc] leading-relaxed text-base">
                    {selectedProject.details.context}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Star size={20} className="mr-2 text-[#d7ba7d]" />
                    {PROJECTS_COPY.modalFeaturesTitle}
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.details.keyPoints.map((point, index) => {
                      const pointId = `${selectedProject.id}-kp-${index}`;
                      const isOpen = expandedKeyPointId === pointId;

                      return (
                        <li key={pointId} className="text-[#cccccc] bg-[#252526] p-3 rounded-lg border border-[#333333]">
                          <div className="flex items-start gap-2">
                            <button
                              type="button"
                              onClick={() => setExpandedKeyPointId(isOpen ? null : pointId)}
                              className="mt-0.5 inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#444444] text-[#007acc] transition-colors hover:border-[#4fc1ff]/70 hover:bg-[#2a2d2e] hover:text-[#4fc1ff]"
                              aria-expanded={isOpen}
                              aria-label={isOpen ? "Replier la description" : "Afficher la description"}
                            >
                              <ChevronRight size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                            </button>
                            <span className="pt-0.5">{point.title}</span>
                          </div>
                          {isOpen ? (
                            <div className="mt-3 ml-9 rounded-md border border-[#3b3b3b] bg-[#1e1e1e] px-3 py-2 text-sm leading-relaxed text-[#a7a7a7]">
                              {point.description}
                            </div>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Code2 size={20} className="mr-2 text-[#ce9178]" />
                    {PROJECTS_COPY.modalTechnologiesTitle}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#252526] px-4 py-2 rounded-lg text-sm font-medium text-[#d4d4d4] border border-[#333333] hover:border-[#4fc1ff] transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {annexDocuments.length > 0 ? (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <FileText size={20} className="mr-2 text-[#4fc1ff]" />
                      {PROJECTS_COPY.modalAnnexTitle}
                    </h3>
                    <ul className="space-y-3">
                      {annexDocuments.map((document) => {
                        const isAvailable = isAnnexDocumentAvailable(document.href);

                        return (
                          <li
                            key={document.id}
                            className="flex flex-col gap-3 rounded-lg border border-[#333333] bg-[#252526] p-4 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-[#dcdcdc]">{document.title}</p>
                              {document.description ? (
                                <p className="mt-1 text-sm text-[#a7a7a7]">{document.description}</p>
                              ) : null}
                            </div>

                            {isAvailable ? (
                              <a
                                href={document.href}
                                target="_blank"
                                rel="noreferrer"
                                className="shrink-0 inline-flex items-center justify-center rounded-md border border-[#4fc1ff]/60 bg-[#4fc1ff]/10 px-3 py-2 text-xs font-medium text-[#8dd7ff] transition-colors hover:bg-[#4fc1ff]/20"
                              >
                                Ouvrir
                              </a>
                            ) : (
                              <button
                                type="button"
                                disabled
                                className="shrink-0 cursor-not-allowed inline-flex items-center justify-center rounded-md border border-[#444444] bg-[#1f1f1f] px-3 py-2 text-xs font-medium text-[#7b7b7b]"
                              >
                                Bient&ocirc;t dispo
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-10 pt-6 border-t border-[#333333]">
                {isSiteButtonEnabled ? (
                  <a
                    href={siteHref}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#007acc] hover:bg-[#005999] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <ExternalLink size={18} className="mr-2" /> {PROJECTS_COPY.modalVisitSiteCta}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed bg-[#007acc]/45 text-white/75 font-medium py-3 px-6 rounded-lg flex items-center justify-center"
                  >
                    <ExternalLink size={18} className="mr-2" /> {PROJECTS_COPY.modalVisitSiteCta}
                  </button>
                )}
                {isSourceButtonEnabled ? (
                    <a
                      href={sourceHref}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#333333] hover:bg-[#424242] border border-[#444444] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <GitHubMarkIcon size={18} className="mr-2" /> {PROJECTS_COPY.modalSourceCta}
                    </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed bg-[#333333]/70 border border-[#444444] text-white/60 font-medium py-3 px-6 rounded-lg flex items-center justify-center"
                  >
                    <GitHubMarkIcon size={18} className="mr-2" /> {PROJECTS_COPY.modalSourceCta}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
