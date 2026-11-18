"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { experience } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { AlbumArtPlaceholder } from "@/components/ui/AlbumArtPlaceholder";
import { useSectionMotion } from "@/components/motion/SectionTransition";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { ExperienceRole } from "@/lib/types";

/**
 * "Discográfica" — experience framed as a record label's album releases.
 * Each company is one "album" shown once; the roles held there hang off a
 * LinkedIn-style vertical timeline beneath it.
 */
export function ExperienceSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();

  return (
    <section>
      <SectionHeader
        eyebrow={t.experienceEyebrow}
        title={t.experienceTitle}
      />

      <div className="space-y-12 px-gutter pb-section">
        {experience.map((job) => (
          <motion.article
            key={job.company}
            variants={m.fadeSlideIn}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {/* Album header: label art + company as the "label", total tenure. */}
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
              <div className="w-32 max-w-full shrink-0 sm:w-44">
                {job.cover ? (
                  <div
                    role="img"
                    aria-label={job.company}
                    className="relative aspect-square w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/20"
                  >
                    <Image
                      src={job.cover}
                      alt={job.company}
                      fill
                      sizes="(max-width: 640px) 128px, 176px"
                      className="scale-125 object-contain"
                    />
                  </div>
                ) : (
                  <AlbumArtPlaceholder
                    fill
                    hue={285}
                    label={job.company}
                  />
                )}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {t.recordLabel}
                </p>
                <h2 className="mt-2 text-heading font-black tracking-tight text-white">
                  {job.company}
                </h2>
                <p className="mt-3 text-muted">
                  {job.roles.length > 1 && (
                    <>
                      <span className="font-semibold text-white">
                        {job.roles.length} {t.roles}
                      </span>
                      {" · "}
                    </>
                  )}
                  {pick(job.tenure)}
                </p>
              </div>
            </div>

            {/* Roles timeline: one node per position, joined by a rail. */}
            <ol className="relative">
              {job.roles.map((role, i) => (
                <RoleItem
                  key={role.role.en}
                  role={role}
                  current={i === 0}
                  last={i === job.roles.length - 1}
                />
              ))}
            </ol>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function RoleItem({
  role,
  current,
  last,
}: {
  role: ExperienceRole;
  current: boolean;
  last: boolean;
}) {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();

  return (
    <li className={`relative pl-8 sm:pl-10 ${last ? "" : "pb-12"}`}>
      {/* Rail segment down to the next role. */}
      {!last && (
        <span
          aria-hidden
          className="absolute top-3 bottom-0 left-[5px] w-0.5 bg-white/15"
        />
      )}
      {/* Node — the current role glows Spotify green. */}
      <span
        aria-hidden
        className={`absolute top-1.5 left-0 size-3 rounded-full ${
          current
            ? "bg-spotify ring-4 ring-spotify/20"
            : "bg-faint ring-4 ring-base"
        }`}
      />

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white">{pick(role.role)}</h3>
          <p className="mt-1 text-sm text-muted">{pick(role.period)}</p>
        </div>

        {/* Surfaced coverage + reach as "album" stats. */}
        {(role.scope || role.reach) && (
          <dl className="grid gap-4 sm:grid-cols-2">
            {role.scope && (
              <div className="rounded-lg bg-white/5 p-4">
                <dt className="text-xs font-semibold uppercase tracking-widest text-faint">
                  {t.coverage}
                </dt>
                <dd className="mt-1 font-semibold text-white">
                  {pick(role.scope)}
                </dd>
              </div>
            )}
            {role.reach && (
              <div className="rounded-lg bg-white/5 p-4">
                <dt className="text-xs font-semibold uppercase tracking-widest text-faint">
                  {t.reach}
                </dt>
                <dd className="mt-1 font-semibold text-white">
                  {pick(role.reach)}
                </dd>
              </div>
            )}
          </dl>
        )}

        <p className="max-w-2xl leading-relaxed text-muted">
          {pick(role.description)}
        </p>

        {/* Data / BI framing — the "genres" of this release. */}
        {role.tools && role.tools.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
              {t.dataBi}
            </h4>
            <div className="flex flex-wrap gap-2">
              {role.tools.map((tool) => (
                <Chip key={tool}>{tool}</Chip>
              ))}
            </div>
          </div>
        )}

        {/* Headline tracks as a numbered tracklist. */}
        {role.highlights.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
              {t.headlineTracks}
            </h4>
            <motion.ol
              variants={m.staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-2"
            >
              {role.highlights.map((highlight, i) => (
                <motion.li
                  key={highlight.name}
                  variants={m.staggerItem}
                  className="flex gap-4 rounded-lg bg-elevated p-5 transition-colors hover:bg-highlight"
                >
                  <span className="pt-0.5 text-sm font-semibold tabular-nums text-faint">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h5 className="font-bold text-white">{highlight.name}</h5>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {pick(highlight.description)}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        )}
      </div>
    </li>
  );
}
