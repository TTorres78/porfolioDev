import { Award, CalendarDays, Code2, Coffee, Download, Globe, UserCircle2, Zap } from "lucide-react";

export function AboutFileContent() {
  const stats = [
    {
      value: "5",
      label: "ANNÉES D'EXPÉRIENCE",
      icon: Award,
      iconClassName: "text-[var(--color-ide-accent-gold)]",
      hoverBorderClassName: "hover:border-[var(--color-ide-accent-gold)]",
    },
    {
      value: "900+",
      label: "Contributions sur GitHub",
      icon: Zap,
      iconClassName: "text-[var(--color-ide-accent-cyan)]",
      hoverBorderClassName: "hover:border-[var(--color-ide-accent-cyan)]",
    },
    {
      value: "∞",
      label: "TASSES DE CAFÉ",
      icon: Coffee,
      iconClassName: "text-[var(--color-ide-accent-orange)]",
      hoverBorderClassName: "hover:border-[var(--color-ide-accent-orange)]",
    },
  ];

  return (
    <div className="flex min-h-full flex-col gap-6 font-sans sm:h-full">
      <section className="relative border-b border-(--color-ide-border) pb-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="z-10 flex h-24 w-24 shrink-0 rotate-3 items-center justify-center rounded-2xl bg-linear-to-br from-(--color-ide-accent-blue) to-(--color-ide-accent-cyan) text-white shadow-[0_0_30px_rgba(0,122,204,0.3)] transition-all duration-300 hover:rotate-0">
              <UserCircle2 size={62} strokeWidth={1.5} />
            </div>

            <div>
              <h1 className="mb-1 text-4xl font-bold tracking-tight text-white lg:text-[2.7rem]">
                Timothé TORRES
              </h1>
              <h2 className="text-2xl text-(--color-ide-accent-cyan) lg:text-[2rem]">
                Développeur Full-Stack
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-(--color-ide-text-muted)">
                <span className="inline-flex items-center gap-2">
                  <Globe size={16} /> Paris, France (ou Remote)
                </span>

                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} /> Disponible
                  </span>
                  <a
                    href="/projects/CV_TORRES.pdf"
                    download
                    className="ml-3 inline-flex items-center gap-2 rounded border border-(--color-ide-border) bg-(--color-ide-surface-1) px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-(--color-ide-accent-cyan) hover:text-(--color-ide-accent-cyan)"
                  >
                    <Download size={14} /> Télécharger le CV
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Code2 size={120} className="hidden text-[#2e2e2e] lg:block" strokeWidth={1.25} />
        </div>
      </section>

      <section className="grid flex-1 min-h-0 gap-6 lg:grid-cols-[1.35fr_0.75fr]">
        <div>
          <h3 className="mb-4 text-3xl font-bold text-white">L&apos;histoire courte</h3>
          <div className="space-y-4 text-base leading-relaxed text-[#d4d4d4]">
            <p>
              Je suis développeur full-stack avec <strong>5 ans d&apos;expérience</strong> en développement logiciel
              et web, dont <strong>2 ans en CDI</strong> et <strong>3 ans en alternance</strong>.
            </p>
            <p>
              Tombé dans la programmation par curiosité, j&apos;y suis resté par passion. J&apos;aime construire des
              applications web utiles, bien pensées et agréables à faire évoluer, avec une approche à la fois
              technique et pragmatique.
            </p>
          </div>

          <div className="mt-5 rounded-xl border-l-4 border-(--color-ide-accent-blue) bg-(--color-ide-surface-1) px-4 py-3.5">
            <p className="text-sm font-semibold tracking-wide text-(--color-ide-accent-cyan) uppercase">
              Disponibilité
            </p>
            <p className="mt-1 text-base leading-tight text-white">
              Actuellement en recherche de nouvelles opportunités.
            </p>
          </div>
        </div>

        <aside>
          <h4 className="mb-4 text-sm font-bold tracking-[0.12em] text-(--color-ide-text-muted) uppercase">
            En chiffres
          </h4>
          <div className="grid gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className={`flex items-center gap-3 rounded-2xl border border-(--color-ide-border) bg-(--color-ide-surface-1) p-3 transition-colors ${stat.hoverBorderClassName}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--color-ide-bg)">
                    <Icon size={26} className={stat.iconClassName} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
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

