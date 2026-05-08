import { ArrowUpRight, Mail } from "lucide-react";

import { GitHubMarkIcon, LinkedInMarkIcon } from "@/features/portfolio-ide/icons";
import { CONTACT_METHODS_BY_ID } from "@/features/portfolio-ide/model";
import { CONTACT_COPY } from "@/features/portfolio-ide/portfolio-copy";

const EMAIL_METHOD = CONTACT_METHODS_BY_ID.email;
const GITHUB_METHOD = CONTACT_METHODS_BY_ID.github;
const LINKEDIN_METHOD = CONTACT_METHODS_BY_ID.linkedin;

export function ContactFileContent() {
  return (
    <div className="mx-auto flex min-h-full max-w-4xl flex-col items-center justify-start px-2 pt-1 pb-4 font-sans sm:h-full sm:justify-center sm:px-4 sm:pt-0">
      <h1 className="mb-3 text-center text-2xl font-bold tracking-tight text-white sm:mb-4 sm:text-3xl">
        {CONTACT_COPY.title}
      </h1>
      <p className="mb-4 max-w-2xl text-center text-sm leading-relaxed text-white sm:mb-5">
        {CONTACT_COPY.intro}
      </p>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        <a
          href={EMAIL_METHOD.href}
          className="group relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-3xl border border-[#333333] bg-[#1e1e1e] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#4fc1ff] hover:shadow-[0_10px_40px_-10px_rgba(79,193,255,0.2)] sm:flex-row sm:items-center sm:gap-5 sm:p-6 md:col-span-2"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10">
            <Mail size={110} />
          </div>

          <div className="relative z-10">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-[#252526] p-2.5 text-[#4fc1ff] shadow-inner">
                <Mail size={22} />
              </div>
              <h2 className="text-lg font-bold text-white sm:text-xl">{CONTACT_COPY.directEmailTitle}</h2>
            </div>
            <p className="mb-4 text-sm text-[#858585]">{CONTACT_COPY.directEmailDescription}</p>
            <div className="max-w-full overflow-hidden font-mono text-[9px] leading-tight tracking-tight whitespace-nowrap text-[#cccccc] text-ellipsis transition-colors group-hover:text-white sm:text-2xl sm:tracking-normal">
              {EMAIL_METHOD.description}
            </div>
          </div>

          <div className="relative z-10 shrink-0 rounded-full bg-[#252526] p-4 text-[#858585] shadow-sm transition-all duration-300 group-hover:bg-[#4fc1ff] group-hover:text-[#1e1e1e] group-hover:shadow-md">
            <ArrowUpRight size={24} strokeWidth={2.5} />
          </div>
        </a>

        <a
          href={LINKEDIN_METHOD.href}
          target="_blank"
          rel="noreferrer"
          className="group relative flex min-h-42 flex-col justify-between overflow-hidden rounded-3xl border border-[#333333] bg-[#1e1e1e] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0077b5] hover:shadow-[0_10px_40px_-10px_rgba(0,119,181,0.2)]"
        >
          <div className="absolute -right-6 -bottom-6 p-6 opacity-5 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10">
            <LinkedInMarkIcon size={100} />
          </div>

          <div className="relative z-10 flex w-full items-start justify-between">
            <div className="rounded-xl bg-[#252526] p-3 text-[#cccccc] shadow-inner transition-colors group-hover:text-[#0077b5]">
              <LinkedInMarkIcon size={28} />
            </div>
            <div className="rounded-full bg-[#252526] p-2 transition-colors group-hover:bg-[#0077b5]">
              <ArrowUpRight size={18} className="text-[#858585] transition-colors group-hover:text-white" />
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-4">
            <h2 className="mb-1 text-xl font-bold text-white">LinkedIn</h2>
            <p className="text-sm text-[#858585]">{LINKEDIN_METHOD.description}</p>
          </div>
        </a>

        <a
          href={GITHUB_METHOD.href}
          target="_blank"
          rel="noreferrer"
          className="group relative flex min-h-42 flex-col justify-between overflow-hidden rounded-3xl border border-[#333333] bg-[#1e1e1e] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)]"
        >
          <div className="absolute -right-6 -bottom-6 p-6 opacity-5 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10">
            <GitHubMarkIcon size={100} />
          </div>

          <div className="relative z-10 flex w-full items-start justify-between">
            <div className="rounded-xl bg-[#252526] p-3 text-[#cccccc] shadow-inner transition-colors group-hover:text-white">
              <GitHubMarkIcon size={28} />
            </div>
            <div className="rounded-full bg-[#252526] p-2 transition-colors group-hover:bg-white">
              <ArrowUpRight size={18} className="text-[#858585] transition-colors group-hover:text-[#1e1e1e]" />
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-4">
            <h2 className="mb-1 text-xl font-bold text-white">GitHub</h2>
            <p className="text-sm text-[#858585]">{GITHUB_METHOD.description}</p>
          </div>
        </a>
      </div>
    </div>
  );
}
