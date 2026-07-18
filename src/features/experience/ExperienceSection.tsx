"use client";

import { experience } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/i18n/LanguageProvider";

/** "Discográfica" — experience as a label / release list. */
export function ExperienceSection() {
  const { pick } = useLanguage();

  return (
    <section>
      <SectionHeader eyebrow="Discográfica" title="Experiencia" />

      <div className="space-y-10 px-6 pb-12 sm:px-10">
        {experience.map((job) => (
          <article key={job.company} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{job.company}</h2>
              <p className="text-zinc-400">
                {pick(job.role)} · {pick(job.period)}
              </p>
            </div>

            <p className="max-w-2xl leading-relaxed text-zinc-300">
              {pick(job.description)}
            </p>

            <ul className="grid gap-4 sm:grid-cols-2">
              {job.highlights.map((highlight) => (
                <li
                  key={highlight.name}
                  className="rounded-lg bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <h3 className="font-bold text-spotify">{highlight.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {pick(highlight.description)}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
