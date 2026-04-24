import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Cloud,
  Code2,
  Info,
  Layout,
  Mail,
  PanelsTopLeft,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";

import type {
  PortfolioFileId,
  ProjectPreviewIcon,
  SkillGroupId,
} from "@/features/portfolio-ide/model";

type FileUiConfig = {
  icon: LucideIcon;
  iconClassName: string;
};

type SkillGroupUiConfig = {
  icon: LucideIcon;
  iconClassName: string;
  activeBorderClassName: string;
};

export const FILE_UI_BY_ID: Record<PortfolioFileId, FileUiConfig> = {
  "a-propos": {
    icon: Info,
    iconClassName: "text-[var(--color-ide-accent-cyan)]",
  },
  projets: {
    icon: Briefcase,
    iconClassName: "text-[var(--color-ide-accent-gold)]",
  },
  competences: {
    icon: Code2,
    iconClassName: "text-[var(--color-ide-accent-orange)]",
  },
  contact: {
    icon: Mail,
    iconClassName: "text-[var(--color-ide-accent-violet)]",
  },
};

export const SKILL_GROUP_UI_BY_ID: Record<SkillGroupId, SkillGroupUiConfig> = {
  front: {
    icon: PanelsTopLeft,
    iconClassName: "text-[var(--color-ide-accent-cyan)]",
    activeBorderClassName: "border-[var(--color-ide-accent-cyan)]",
  },
  back: {
    icon: Server,
    iconClassName: "text-[var(--color-ide-accent-orange)]",
    activeBorderClassName: "border-[var(--color-ide-accent-orange)]",
  },
  cloud: {
    icon: Cloud,
    iconClassName: "text-[var(--color-ide-accent-gold)]",
    activeBorderClassName: "border-[var(--color-ide-accent-gold)]",
  },
  workflow: {
    icon: Wrench,
    iconClassName: "text-[var(--color-ide-accent-violet)]",
    activeBorderClassName: "border-[var(--color-ide-accent-violet)]",
  },
  mobile: {
    icon: Smartphone,
    iconClassName: "text-[var(--color-ide-accent-cyan)]",
    activeBorderClassName: "border-[var(--color-ide-accent-cyan)]",
  },
};

export const PROJECT_PREVIEW_ICON_BY_KEY: Record<ProjectPreviewIcon, LucideIcon> = {
  code: Code2,
  server: Server,
  layout: Layout,
};

export const PROJECT_PREVIEW_ICON_CLASS_BY_KEY: Record<ProjectPreviewIcon, string> = {
  code:
    "text-white opacity-40 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:opacity-100",
  server:
    "text-white opacity-40 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-110 group-hover:opacity-100",
  layout:
    "text-white opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100",
};
