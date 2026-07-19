"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import { ProjectCover } from "@/features/projects/ProjectCover";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Where the "notify me" bell sends its prefilled email. */
const NOTIFY_EMAIL = "marianafes15@gmail.com";

/**
 * Pre-launch "unreleased album" view for a `comingSoon` project (Partela).
 * Shows a blank disc cover, the stack, and a bell → prefilled `mailto:` — but
 * deliberately hides what the product does (no description, gallery, or links).
 */
export function ComingSoonDetail({ project }: { project: Project }) {
  const { pick, t } = useLanguage();

  const subject = `${t.notifySubject} ${project.title}`;
  const body = `${t.notifyBody} ${project.title}.`;
  const mailto = `mailto:${NOTIFY_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <article>
      {/* Album-style header, but with a blank "unreleased" disc cover. */}
      <header className="bg-gradient-to-b from-spotify/25 to-transparent px-6 pb-8 pt-16 sm:px-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="relative w-36 max-w-full shrink-0 sm:w-52">
            <ProjectCover
              fill
              project={project}
              label={`${project.title} — ${t.unreleased}`}
            />
            {/* Bell corner badge — ties the cover to the notify action. */}
            <span
              aria-hidden
              className="absolute -bottom-2 -right-2 grid h-11 w-11 place-items-center rounded-full bg-spotify text-lg text-black shadow-xl ring-4 ring-base"
            >
              🔔
            </span>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {pick(project.meta)}
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="text-lg font-semibold text-white">
                {pick(project.role)}
              </span>
              <Badge tone="accent">{t.comingSoon}</Badge>
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-8 px-6 pb-12 sm:px-10">
        <Link
          href="/proyectos"
          className="inline-flex text-sm text-muted transition-colors hover:text-white"
        >
          ← {t.backToProjects}
        </Link>

        {/* Mysterious teaser — no product spoilers. */}
        <p className="max-w-2xl leading-relaxed text-muted">
          {t.comingSoonTeaser}
        </p>

        {project.stack.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
              {t.stack}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </div>
        )}

        {/* Bell → prefilled email. The primary (and only) call to action. */}
        <a
          href={mailto}
          className="inline-flex items-center gap-2 rounded-full bg-spotify px-6 py-3 font-bold text-black transition-transform hover:scale-105"
        >
          {t.notifyMe}
        </a>
      </div>
    </article>
  );
}
