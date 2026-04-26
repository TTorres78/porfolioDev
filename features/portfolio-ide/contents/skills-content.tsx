"use client";

import { useMemo, useState } from "react";

import { SKILL_GROUPS, type SkillGroupId } from "@/features/portfolio-ide/model";
import { SKILL_GROUP_UI_BY_ID } from "@/features/portfolio-ide/ui-config";

const DEFAULT_GROUP_ID: SkillGroupId = "front";

export function SkillsFileContent() {
  const [selectedGroupId, setSelectedGroupId] = useState<SkillGroupId>(DEFAULT_GROUP_ID);

  const selectedGroup = useMemo(
    () => SKILL_GROUPS.find((group) => group.id === selectedGroupId) ?? SKILL_GROUPS[0],
    [selectedGroupId],
  );

  const selectedGroupUi = SKILL_GROUP_UI_BY_ID[selectedGroup.id];
  const SelectedIcon = selectedGroupUi.icon;

  return (
    <div className="flex min-h-full flex-col gap-3 font-sans sm:h-full sm:gap-4">
      <header>
        <h1 className="text-2xl font-bold text-white sm:text-[1.8rem] lg:text-3xl">Compétences</h1>
        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-(--color-ide-text)">
          Vue détaillée de mon expertise technique. Sélectionnez une catégorie dans le menu pour
          explorer ma stack.
        </p>
      </header>

      <section className="mt-1 overflow-hidden rounded-2xl border border-(--color-ide-border) bg-[linear-gradient(145deg,var(--color-ide-surface-1),#2a2a2d)] lg:grid lg:grid-cols-[230px_1fr]">
        <aside className="border-b border-(--color-ide-border) lg:border-r lg:border-b-0">
          <p className="px-4 pt-4 pb-2 text-xs font-semibold tracking-[0.05em] text-(--color-ide-text-muted) uppercase">
            Catégories
          </p>

          <nav className="pt-1 pb-3">
            {SKILL_GROUPS.map((group) => {
              const groupUi = SKILL_GROUP_UI_BY_ID[group.id];
              const GroupIcon = groupUi.icon;
              const isSelected = group.id === selectedGroup.id;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`flex w-full items-center gap-3 border-l-2 px-4 py-2.5 text-left transition-colors ${
                    isSelected
                      ? `${groupUi.activeBorderClassName} bg-(--color-ide-surface-2) text-white`
                      : "border-transparent text-(--color-ide-text) hover:bg-(--color-ide-surface-2)"
                  }`}
                >
                  <GroupIcon
                    size={16}
                    className={
                      isSelected ? groupUi.iconClassName : "text-(--color-ide-text-muted)"
                    }
                  />
                  <span className="text-base font-medium">{group.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="p-3 sm:p-4 lg:p-5">
          <div className="mb-2.5 flex items-center gap-3 sm:mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-ide-surface-2) sm:h-10 sm:w-10">
              <SelectedIcon size={17} className={selectedGroupUi.iconClassName} />
            </div>
            <h2 className="text-xl font-semibold text-white lg:text-2xl">{selectedGroup.title}</h2>
          </div>

          <p className="max-w-3xl text-sm leading-relaxed text-(--color-ide-text)">
            {selectedGroup.description} {selectedGroup.details}
          </p>

          <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
            {selectedGroup.skills.map((skill) => (
              <article
                key={skill.name}
                className="grid grid-cols-[minmax(0,1fr)_minmax(112px,152px)_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-3"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-base font-medium text-white">{skill.name}</h3>
                </div>

                <span
                  className={`justify-self-center inline-flex w-full items-center justify-center rounded-md border px-2 py-1 text-[8px] leading-tight font-semibold tracking-[0.01em] uppercase sm:w-auto sm:px-3 sm:text-[11px] sm:tracking-[0.08em] ${selectedGroupUi.activeBorderClassName} ${selectedGroupUi.iconClassName} bg-(--color-ide-surface-2)`}
                >
                  {skill.level}
                </span>

                <span className="justify-self-end text-right text-xs text-(--color-ide-text)">
                  {skill.experience} {skill.experience > 1 ? "ans" : "an"}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
