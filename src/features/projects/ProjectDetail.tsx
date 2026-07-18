"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";
import { Chip } from "@/components/ui/Chip";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/i18n/LanguageProvider";

/** /proyectos/[slug] — a single "track" opened as an album view. */
export function ProjectDetail({ project }: { project: Project }) {
  const { pick, t } = useLanguage();

  return (
    <article>
      <SectionHeader eyebrow={pick(project.meta)} title={project.title}>
        <p className="text-lg font-semibold text-white">
          {pick(project.role)}
        </p>
      </SectionHeader>

      <div className="space-y-8 px-6 pb-12 sm:px-10">
        <Link
          href="/proyectos"
          className="inline-flex text-sm text-muted transition-colors hover:text-white"
        >
          ← {t.backToProjects}
        </Link>

        {pick(project.description)
          .split("\n\n")
          .map((paragraph, i) => (
            <p key={i} className="max-w-2xl leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}

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

        {project.comingSoon ? (
          <a
            href="mailto:marianafes15@gmail.com?subject=Partela%20launch"
            className="inline-flex items-center gap-2 rounded-full bg-spotify px-6 py-3 font-bold text-black transition-transform hover:scale-105"
          >
            {t.notifyMe}
          </a>
        ) : (
          project.links.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
                {t.links}
              </h2>
              <ul className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-spotify hover:text-spotify"
                    >
                      {pick(link.label)} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </article>
  );
}
