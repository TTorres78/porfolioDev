import {
  CONTACT_METHODS,
  PORTFOLIO_FILES_BY_ID,
  PROJECT_CARDS,
  SKILL_GROUPS,
  type PortfolioFileId,
  type SkillGroupId,
} from "@/features/portfolio-ide/model";
import { ABOUT_COPY, CONTACT_COPY, PROJECTS_COPY, SKILLS_COPY } from "@/features/portfolio-ide/portfolio-copy";
import {
  countSearchMatches,
  extractSearchExcerpts,
  getSearchTerms,
} from "@/features/portfolio-ide/search-text";

type SearchDocumentKind = "file" | "project-modal";

type SearchDocument = {
  id: string;
  fileId: PortfolioFileId;
  fileName: string;
  title: string;
  kind: SearchDocumentKind;
  content: string;
  skillGroupId?: SkillGroupId;
  projectId?: string;
};

export type PortfolioSearchResult = {
  id: string;
  fileId: PortfolioFileId;
  fileName: string;
  title: string;
  kind: SearchDocumentKind;
  matches: number;
  excerpts: string[];
  skillGroupId?: SkillGroupId;
  projectId?: string;
};

const DEFAULT_SKILL_GROUP_ID: SkillGroupId = "front";

function getAboutSearchText() {
  return [
    ABOUT_COPY.fullName,
    ABOUT_COPY.role,
    ABOUT_COPY.location,
    ABOUT_COPY.availabilityBadge,
    ABOUT_COPY.cvCta,
    ABOUT_COPY.shortStoryTitle,
    ...ABOUT_COPY.shortStoryParagraphs,
    ABOUT_COPY.availabilityTitle,
    ABOUT_COPY.availabilityText,
    ABOUT_COPY.numbersTitle,
    ...ABOUT_COPY.statsLabels,
  ].join(" ");
}

function getContactSearchText() {
  return [CONTACT_COPY.title, CONTACT_COPY.intro, CONTACT_COPY.directEmailTitle, CONTACT_COPY.directEmailDescription].join(" ");
}

function getAboutSearchDocument(): SearchDocument {
  return {
    id: "file-a-propos",
    fileId: "a-propos",
    fileName: PORTFOLIO_FILES_BY_ID["a-propos"].name,
    title: PORTFOLIO_FILES_BY_ID["a-propos"].name,
    kind: "file",
    content: `${PORTFOLIO_FILES_BY_ID["a-propos"].name} ${getAboutSearchText()}`,
  };
}

function getProjectsOverviewSearchDocument(): SearchDocument {
  const projectsText = PROJECT_CARDS.map((project) =>
    [project.title, project.description, project.stack.join(" "), project.category, project.year, PROJECTS_COPY.detailsCta].join(" "),
  ).join(" ");

  return {
    id: "file-projets-overview",
    fileId: "projets",
    fileName: PORTFOLIO_FILES_BY_ID.projets.name,
    title: PORTFOLIO_FILES_BY_ID.projets.name,
    kind: "file",
    content: `${PORTFOLIO_FILES_BY_ID.projets.name} ${PROJECTS_COPY.title} ${PROJECTS_COPY.intro} ${projectsText}`,
  };
}

function getProjectModalSearchText(projectId: string) {
  const project = PROJECT_CARDS.find((item) => item.id === projectId);
  if (!project) {
    return "";
  }

  const keyPointTitles = project.details.keyPoints.map((point) => point.title).join(" ");
  const annexText = (project.details.annexDocuments ?? [])
    .map((document) => {
      const isAvailable = Boolean(document.href && document.href.trim().length > 0 && document.href.trim() !== "#");
      return [document.title, document.description ?? "", isAvailable ? "Ouvrir" : "Bientôt dispo"].join(" ");
    })
    .join(" ");

  return [
    project.title,
    project.category,
    project.year,
    PROJECTS_COPY.modalAboutTitle,
    project.details.context,
    PROJECTS_COPY.modalFeaturesTitle,
    keyPointTitles,
    PROJECTS_COPY.modalTechnologiesTitle,
    project.stack.join(" "),
    annexText ? `${PROJECTS_COPY.modalAnnexTitle} ${annexText}` : "",
    PROJECTS_COPY.modalVisitSiteCta,
    PROJECTS_COPY.modalSourceCta,
  ]
    .filter((segment) => segment.length > 0)
    .join(" ");
}

function getProjectModalSearchDocuments(): SearchDocument[] {
  return PROJECT_CARDS.map((project) => ({
    id: `project-modal-${project.id}`,
    fileId: "projets",
    fileName: PORTFOLIO_FILES_BY_ID.projets.name,
    title: `${project.title} · ${PROJECTS_COPY.detailsCta}`,
    kind: "project-modal",
    projectId: project.id,
    content: getProjectModalSearchText(project.id),
  }));
}

function getSkillGroupSearchText(skillGroupId: SkillGroupId) {
  const group = SKILL_GROUPS.find((item) => item.id === skillGroupId) ?? SKILL_GROUPS[0];
  const skillsText = group.skills
    .map((skill) => `${skill.name} ${skill.level} ${skill.experience} ${skill.experience > 1 ? "ans" : "an"}`)
    .join(" ");

  return `${group.title} ${group.description} ${group.details} ${skillsText}`;
}

function getSkillsSearchDocument(normalizedTerms: string[]): SearchDocument {
  const skillGroupId = findBestSkillGroup(normalizedTerms) ?? DEFAULT_SKILL_GROUP_ID;
  const categoriesText = SKILL_GROUPS.map((group) => group.title).join(" ");
  const selectedGroupText = getSkillGroupSearchText(skillGroupId);

  return {
    id: "file-competences",
    fileId: "competences",
    fileName: PORTFOLIO_FILES_BY_ID.competences.name,
    title: PORTFOLIO_FILES_BY_ID.competences.name,
    kind: "file",
    content: `${PORTFOLIO_FILES_BY_ID.competences.name} ${SKILLS_COPY.title} ${SKILLS_COPY.intro} ${SKILLS_COPY.categoriesTitle} ${categoriesText} ${selectedGroupText}`,
    skillGroupId,
  };
}

function getContactSearchDocument(): SearchDocument {
  const methodsText = CONTACT_METHODS.map((method) => `${method.title} ${method.description}`).join(" ");

  return {
    id: "file-contact",
    fileId: "contact",
    fileName: PORTFOLIO_FILES_BY_ID.contact.name,
    title: PORTFOLIO_FILES_BY_ID.contact.name,
    kind: "file",
    content: `${PORTFOLIO_FILES_BY_ID.contact.name} ${getContactSearchText()} ${methodsText}`,
  };
}

function findBestSkillGroup(normalizedTerms: string[]) {
  let bestGroup: SkillGroupId | undefined;
  let bestScore = 0;

  for (const group of SKILL_GROUPS) {
    const groupText = `${group.title} ${group.description} ${group.details} ${group.skills
      .map((skill) => `${skill.name} ${skill.level} ${skill.experience}`)
      .join(" ")}`;

    const score = countSearchMatches(groupText, normalizedTerms);

    if (score > bestScore) {
      bestScore = score;
      bestGroup = group.id;
    }
  }

  return bestGroup;
}

function buildSearchDocuments(normalizedTerms: string[]): SearchDocument[] {
  return [
    getAboutSearchDocument(),
    getProjectsOverviewSearchDocument(),
    ...getProjectModalSearchDocuments(),
    getSkillsSearchDocument(normalizedTerms),
    getContactSearchDocument(),
  ];
}

export function searchPortfolio(query: string): PortfolioSearchResult[] {
  const normalizedTerms = getSearchTerms(query);
  if (normalizedTerms.length === 0) {
    return [];
  }

  const searchDocuments = buildSearchDocuments(normalizedTerms);

  return searchDocuments
    .map((document) => {
      const matches = countSearchMatches(document.content, normalizedTerms);

      return {
        id: document.id,
        fileId: document.fileId,
        fileName: document.fileName,
        title: document.title,
        kind: document.kind,
        matches,
        excerpts: extractSearchExcerpts(document.content, normalizedTerms),
        skillGroupId: document.skillGroupId,
        projectId: document.projectId,
      };
    })
    .filter((result) => result.matches > 0)
    .sort((a, b) => b.matches - a.matches || a.title.localeCompare(b.title, "fr"));
}
