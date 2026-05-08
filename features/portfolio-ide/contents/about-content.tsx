import { Award, CalendarDays, Code2, Coffee, Download, Globe, UserCircle2, Zap } from "lucide-react";

import { ABOUT_COPY } from "@/features/portfolio-ide/portfolio-copy";

export function AboutFileContent() {
  const stats = [
    {
      value: "5",
      label: ABOUT_COPY.statsLabels[0],
      icon: Award,
      iconClassName: "text-[var(--color-ide-accent-gold)]",
      hoverBorderClassName: "hover:border-[var(--color-ide-accent-gold)]",
    },
    {
      value: "900+",
      label: ABOUT_COPY.statsLabels[1],
      icon: Zap,
      iconClassName: "text-[var(--color-ide-accent-cyan)]",
      hoverBorderClassName: "hover:border-[var(--color-ide-accent-cyan)]",
    },
    {
      value: "∞",
      label: ABOUT_COPY.statsLabels[2],
      icon: Coffee,
      iconClassName: "text-[var(--color-ide-accent-orange)]",
      hoverBorderClassName: "hover:border-[var(--color-ide-accent-orange)]",
    },
  ];

  return (
    <div className="flex min-h-full flex-col gap-5 font-sans sm:h-full sm:gap-6">
      <section className="relative border-b border-(--color-ide-border) pb-4 sm:pb-5">
        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-(--color-ide-accent-blue) to-(--color-ide-accent-cyan) text-white shadow-[0_0_30px_rgba(0,122,204,0.3)] transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:rotate-3 sm:h-24 sm:w-24">
              <UserCircle2 size={56} strokeWidth={1.5} />
            </div>

            <div>
              <h1 className="mb-1 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.7rem]">
                {ABOUT_COPY.fullName}
              </h1>
              <h2 className="text-xl text-(--color-ide-accent-cyan) sm:text-2xl lg:text-[2rem]">
                {ABOUT_COPY.role}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-(--color-ide-text-muted) sm:gap-x-5 sm:text-sm">
                <span className="inline-flex items-center gap-2">
                  <Globe size={16} /> {ABOUT_COPY.location}
                </span>

                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} /> {ABOUT_COPY.availabilityBadge}
                  </span>
                  <a
                    href="/projects/CV_TORRES.pdf"
                    download
                    className="ml-2 inline-flex items-center gap-2 rounded border border-(--color-ide-border) bg-(--color-ide-surface-1) px-2.5 py-1.5 text-[11px] font-medium text-white transition-colors hover:border-(--color-ide-accent-cyan) hover:text-(--color-ide-accent-cyan) sm:ml-3 sm:px-3 sm:text-xs"
                  >
                    <Download size={14} /> {ABOUT_COPY.cvCta}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Code2 size={120} className="hidden text-[#2e2e2e] lg:block" strokeWidth={1.25} />
        </div>
      </section>

      <section className="grid flex-1 min-h-0 gap-4 sm:gap-6 lg:grid-cols-[1.35fr_0.75fr]">
        <div>
          <h3 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl">{ABOUT_COPY.shortStoryTitle}</h3>
          <div className="space-y-3 text-[0.95rem] leading-relaxed text-[#d4d4d4] sm:space-y-4 sm:text-base">
            <p>{ABOUT_COPY.shortStoryParagraphs[0]}</p>
            <p>{ABOUT_COPY.shortStoryParagraphs[1]}</p>
          </div>

          <div className="mt-4 rounded-xl border-l-4 border-(--color-ide-accent-blue) bg-(--color-ide-surface-1) px-4 py-3 sm:mt-5 sm:py-3.5">
            <p className="text-sm font-semibold tracking-wide text-(--color-ide-accent-cyan) uppercase">
              {ABOUT_COPY.availabilityTitle}
            </p>
            <p className="mt-1 text-[0.95rem] leading-tight text-white sm:text-base">
              {ABOUT_COPY.availabilityText}
            </p>
          </div>
        </div>

        <aside>
          <h4 className="mb-4 text-sm font-bold tracking-[0.12em] text-(--color-ide-text-muted) uppercase">
            {ABOUT_COPY.numbersTitle}
          </h4>
          <div className="grid gap-2.5 sm:gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className={`flex items-center gap-3 rounded-2xl border border-(--color-ide-border) bg-(--color-ide-surface-1) p-2.5 transition-colors sm:p-3 ${stat.hoverBorderClassName}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--color-ide-bg)">
                    <Icon size={26} className={stat.iconClassName} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                    <p className="text-xs text-(--color-ide-text-muted) uppercase">{stat.label}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </aside>
      </section>
    </div>
  );
}
