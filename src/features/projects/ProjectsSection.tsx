"use client";

import Link from "next/link";
import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/i18n/LanguageProvider";

/** The "Proyectos" playlist: a track list of projects. */
export function ProjectsSection() {
  const { pick, t } = useLanguage();

  return (
    <section>
      <SectionHeader
        eyebrow={t.playlist}
        title="Proyectos"
        subtitle={`${projects.length} ${t.tracks}`}
      />

      <ol className="px-3 pb-12 sm:px-6">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Link
              href={`/proyectos/${project.slug}`}
              className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 rounded-md px-3 py-3 transition-colors hover:bg-white/10"
            >
              <span className="text-right text-sm text-faint group-hover:text-white">
                {index + 1}
              </span>

              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="truncate font-semibold text-white">
                    {project.title}
                  </span>
                  {project.comingSoon && (
                    <span className="rounded-full bg-spotify/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-spotify">
                      {t.comingSoon}
                    </span>
                  )}
                </span>
                <span className="block truncate text-sm text-muted">
                  {pick(project.role)}
                </span>
              </span>

              <span className="hidden text-sm text-faint sm:block">
                {pick(project.meta)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
