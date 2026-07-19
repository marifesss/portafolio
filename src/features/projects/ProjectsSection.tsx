"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { AlbumArtPlaceholder } from "@/components/ui/AlbumArtPlaceholder";
import { Badge } from "@/components/ui/Badge";
import { useSectionMotion } from "@/components/motion/SectionTransition";
import { ProjectCover } from "@/features/projects/ProjectCover";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Playlist cover for the header — the same art shown in the sidebar row. */
const PLAYLIST_COVER = navigation.find((n) => n.id === "projects")?.cover;

/** The "Proyectos" playlist: a Spotify-style track list of projects. */
export function ProjectsSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();

  return (
    <section>
      {/* Playlist header: cover + title + track count, on the album gradient. */}
      <motion.header
        variants={m.fadeSlideIn}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-b from-spotify/25 to-transparent px-6 pb-8 pt-16 sm:px-10"
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="w-36 max-w-full shrink-0 sm:w-52">
            {PLAYLIST_COVER ? (
              <div
                role="img"
                aria-label={t.projectsTitle}
                className="relative aspect-square w-full overflow-hidden rounded-lg shadow-2xl ring-1 ring-black/20"
              >
                <Image
                  src={PLAYLIST_COVER}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 144px, 208px"
                  className="object-cover"
                />
              </div>
            ) : (
              <AlbumArtPlaceholder
                fill
                glyph="🎧"
                hue={145}
                label={t.projectsTitle}
              />
            )}
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t.playlist}
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-6xl">
              {t.projectsTitle}
            </h1>
            <p className="mt-4 text-sm text-muted">
              <span className="font-semibold text-white">{site.name}</span>
              {" · "}
              {projects.length} {t.tracks}
            </p>
          </div>
        </div>
      </motion.header>

      <div className="px-2 pb-16 sm:px-6">
        {/* Column header, Spotify track-list style. Meta column drops on mobile. */}
        <div className="grid grid-cols-[1.5rem_1fr] items-center gap-4 border-b border-white/10 px-3 pb-2 text-xs font-medium uppercase tracking-wider text-faint sm:grid-cols-[1.5rem_1fr_auto]">
          <span className="text-right">#</span>
          <span>{t.trackTitle}</span>
          <span className="hidden sm:block" aria-hidden />
        </div>

        <motion.ol
          variants={m.staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-2"
        >
          {projects.map((project, index) => (
            <motion.li key={project.slug} variants={m.staggerItem}>
              <Link
                href={`/proyectos/${project.slug}`}
                aria-label={`${project.title} — ${pick(project.role)}`}
                className="group grid grid-cols-[1.5rem_1fr] items-center gap-4 rounded-md px-3 py-3 outline-none transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-spotify sm:grid-cols-[1.5rem_1fr_auto]"
              >
                {/* Index → play glyph swap on hover/focus. */}
                <span className="relative grid h-6 w-6 place-items-center justify-self-end text-base text-faint">
                  <span className="tabular-nums transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0">
                    {index + 1}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 grid place-items-center text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    ▶
                  </span>
                </span>

                {/* Cover thumbnail + title + role ("artist"). */}
                <span className="flex min-w-0 items-center gap-4">
                  <ProjectCover project={project} size={64} />
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-lg font-semibold text-white group-hover:underline">
                        {project.title}
                      </span>
                      {project.comingSoon && (
                        <Badge tone="accent">{t.comingSoon}</Badge>
                      )}
                    </span>
                    <span className="block truncate text-base text-muted">
                      {pick(project.role)}
                    </span>
                  </span>
                </span>

                {/* Meta ("duration"/context) — hidden on small screens. */}
                <span className="hidden max-w-[16rem] truncate text-base text-faint sm:block">
                  {pick(project.meta)}
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
