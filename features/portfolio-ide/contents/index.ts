import type { ComponentType } from "react";

import type { PortfolioFileId } from "@/features/portfolio-ide/model";
import { AboutFileContent } from "@/features/portfolio-ide/contents/about-content";
import { ContactFileContent } from "@/features/portfolio-ide/contents/contact-content";
import { ProjectsFileContent } from "@/features/portfolio-ide/contents/projects-content";
import { SkillsFileContent } from "@/features/portfolio-ide/contents/skills-content";

export const FILE_CONTENTS_BY_ID: Record<PortfolioFileId, ComponentType> = {
  "a-propos": AboutFileContent,
  projets: ProjectsFileContent,
  competences: SkillsFileContent,
  contact: ContactFileContent,
};
