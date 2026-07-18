"use client";

import { motion } from "framer-motion";
import { experience } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { AlbumArtPlaceholder } from "@/components/ui/AlbumArtPlaceholder";
import { useSectionMotion } from "@/components/motion/SectionTransition";
import { useLanguage } from "@/i18n/LanguageProvider";

/** "Discográfica" — experience framed as a record label's album releases. */
export function ExperienceSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();

  return (
    <section>
      <SectionHeader
        eyebrow={t.experienceEyebrow}
        title={t.experienceTitle}
      />

      <div className="space-y-12 px-6 pb-12 sm:px-10">
        {experience.map((job) => (
          <motion.article
            key={job.company}
            variants={m.fadeSlideIn}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Album header: label art + company as the "label", role/period. */}
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
              <div className="w-32 max-w-full shrink-0 sm:w-44">
                <AlbumArtPlaceholder
                  fill
                  glyph="🍫"
                  hue={285}
                  label={job.company}
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {t.recordLabel}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {job.company}
                </h2>
                <p className="mt-3 text-muted">
                  <span className="font-semibold text-white">
                    {pick(job.role)}
                  </span>
                  {" · "}
                  {pick(job.period)}
                </p>
              </div>
            </div>

            {/* Surfaced coverage + reach as "album" stats. */}
            {(job.scope || job.reach) && (
              <dl className="grid gap-4 sm:grid-cols-2">
                {job.scope && (
                  <div className="rounded-lg bg-white/5 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-faint">
                      {t.coverage}
                    </dt>
                    <dd className="mt-1 font-semibold text-white">
                      {pick(job.scope)}
                    </dd>
                  </div>
                )}
                {job.reach && (
                  <div className="rounded-lg bg-white/5 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-faint">
                      {t.reach}
                    </dt>
                    <dd className="mt-1 font-semibold text-white">
                      {pick(job.reach)}
                    </dd>
                  </div>
                )}
              </dl>
            )}

            <p className="max-w-2xl leading-relaxed text-muted">
              {pick(job.description)}
            </p>

            {/* Data / BI framing — the "genres" of this release. */}
            {job.tools && job.tools.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
                  {t.dataBi}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.tools.map((tool) => (
                    <Chip key={tool}>{tool}</Chip>
                  ))}
                </div>
              </div>
            )}

            {/* Headline tracks: SORT + DOI as a numbered tracklist. */}
            {job.highlights.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
                  {t.headlineTracks}
                </h3>
                <motion.ol
                  variants={m.staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {job.highlights.map((highlight, i) => (
                    <motion.li
                      key={highlight.name}
                      variants={m.staggerItem}
                      className="flex gap-4 rounded-lg bg-elevated p-5 transition-colors hover:bg-highlight"
                    >
                      <span className="pt-0.5 text-sm font-semibold tabular-nums text-faint">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white">
                          {highlight.name}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {pick(highlight.description)}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ol>
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
