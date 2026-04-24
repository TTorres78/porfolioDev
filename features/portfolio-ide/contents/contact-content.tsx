import { ArrowUpRight, Mail } from "lucide-react";

import { GitHubMarkIcon, LinkedInMarkIcon } from "@/features/portfolio-ide/icons";
import { CONTACT_METHODS_BY_ID } from "@/features/portfolio-ide/model";

const EMAIL_METHOD = CONTACT_METHODS_BY_ID.email;
const GITHUB_METHOD = CONTACT_METHODS_BY_ID.github;
const LINKEDIN_METHOD = CONTACT_METHODS_BY_ID.linkedin;

export function ContactFileContent() {
  return (
    <div className="mx-auto mt-4 flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 pb-10 font-sans">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-white">
        Prêt à collaborer ?
      </h1>
      <p className="mb-6 max-w-2xl text-center text-sm leading-relaxed text-white">
        Je suis toujours ouvert aux discussions techniques, aux opportunités ou simplement pour
        faire connaissance. Choisissez votre canal pour échanger.
      </p>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        <a
          href={EMAIL_METHOD.href}
          className="group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-[#333333] bg-[#1e1e1e] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#4fc1ff] hover:shadow-[0_10px_40px_-10px_rgba(79,193,255,0.2)] sm:flex-row sm:items-center md:col-span-2"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10">
            <Mail size={160} />
          </div>

          <div className="relative z-10">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-[#252526] p-2.5 text-[#4fc1ff] shadow-inner">
                <Mail size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Email Direct</h2>
            </div>
            <p className="mb-5 text-sm text-[#858585]">
              Le moyen le plus rapide de me joindre pour un projet.
            </p>
            <div className="font-mono text-2xl text-[#cccccc] transition-colors group-hover:text-white sm:text-3xl">
              {EMAIL_METHOD.description}
            </div>
          </div>

          <div className="relative z-10 shrink-0 rounded-full bg-[#252526] p-5 text-[#858585] shadow-sm transition-all duration-300 group-hover:bg-[#4fc1ff] group-hover:text-[#1e1e1e] group-hover:shadow-md">
            <ArrowUpRight size={28} strokeWidth={2.5} />
          </div>
        </a>

        <a
          href={LINKEDIN_METHOD.href}
          target="_blank"
          rel="noreferrer"
          className="group relative flex min-h-55 flex-col justify-between overflow-hidden rounded-3xl border border-[#333333] bg-[#1e1e1e] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#0077b5] hover:shadow-[0_10px_40px_-10px_rgba(0,119,181,0.2)]"
        >
          <div className="absolute -right-6 -bottom-6 p-8 opacity-5 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10">
            <LinkedInMarkIcon size={140} />
          </div>

          <div className="relative z-10 flex w-full items-start justify-between">
            <div className="rounded-xl bg-[#252526] p-3.5 text-[#cccccc] shadow-inner transition-colors group-hover:text-[#0077b5]">
              <LinkedInMarkIcon size={32} />
            </div>
            <div className="rounded-full bg-[#252526] p-2.5 transition-colors group-hover:bg-[#0077b5]">
              <ArrowUpRight size={20} className="text-[#858585] transition-colors group-hover:text-white" />
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-6">
            <h2 className="mb-2 text-2xl font-bold text-white">LinkedIn</h2>
            <p className="text-sm text-[#858585]">{LINKEDIN_METHOD.description}</p>
          </div>
        </a>

        <a
          href={GITHUB_METHOD.href}
          target="_blank"
          rel="noreferrer"
          className="group relative flex min-h-55 flex-col justify-between overflow-hidden rounded-3xl border border-[#333333] bg-[#1e1e1e] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)]"
        >
          <div className="absolute -right-6 -bottom-6 p-8 opacity-5 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10">
            <GitHubMarkIcon size={140} />
          </div>

          <div className="relative z-10 flex w-full items-start justify-between">
            <div className="rounded-xl bg-[#252526] p-3.5 text-[#cccccc] shadow-inner transition-colors group-hover:text-white">
              <GitHubMarkIcon size={32} />
            </div>
            <div className="rounded-full bg-[#252526] p-2.5 transition-colors group-hover:bg-white">
              <ArrowUpRight size={20} className="text-[#858585] transition-colors group-hover:text-[#1e1e1e]" />
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-6">
            <h2 className="mb-2 text-2xl font-bold text-white">GitHub</h2>
            <p className="text-sm text-[#858585]">{GITHUB_METHOD.description}</p>
          </div>
        </a>
      </div>
    </div>
  );
}
