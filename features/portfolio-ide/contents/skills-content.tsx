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
    <div className="space-y-5 font-sans">
      <header>
        <h1 className="text-3xl font-bold text-white">Compétences</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-(--color-ide-text)">
          Vue détaillée de mon expertise technique. Sélectionnez une catégorie dans le menu pour
          explorer ma stack.
        </p>
      </header>

      <section className="mt-8 overflow-hidden rounded-2xl border border-(--color-ide-border) bg-[linear-gradient(145deg,var(--color-ide-surface-1),#2a2a2d)] lg:grid lg:grid-cols-[270px_1fr]">
        <aside className="border-b border-(--color-ide-border) lg:border-r lg:border-b-0">
          <p className="px-5 pt-5 pb-3 text-xs font-semibold tracking-[0.05em] text-(--color-ide-text-muted) uppercase">
            Catégories
          </p>

          <nav className="pt-2 pb-5">
            {SKILL_GROUPS.map((group) => {
              const groupUi = SKILL_GROUP_UI_BY_ID[group.id];
              const GroupIcon = groupUi.icon;
              const isSelected = group.id === selectedGroup.id;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`flex w-full items-center gap-3 border-l-2 px-5 py-3 text-left transition-colors ${
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

        <div className="p-5 lg:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-(--color-ide-surface-2)">
              <SelectedIcon size={20} className={selectedGroupUi.iconClassName} />
            </div>
            <h2 className="text-2xl font-semibold text-white">{selectedGroup.title}</h2>
          </div>

          <p className="max-w-3xl text-sm leading-relaxed text-(--color-ide-text)">
            {selectedGroup.description} {selectedGroup.details}
          </p>

          <div className="mt-6 space-y-4">
            {selectedGroup.skills.map((skill) => (
              <article
                key={skill.name}
                className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3"
              >
                <div className="min-w-0 mt-1">
                  <h3 className="text-base font-medium text-white">{skill.name}</h3>
                </div>

                <span
                  className={`justify-self-center inline-flex items-center rounded-md border px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase ${selectedGroupUi.activeBorderClassName} ${selectedGroupUi.iconClassName} bg-(--color-ide-surface-2)`}
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
