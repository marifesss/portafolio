"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { greetings, featuredSlugs, home, type Daypart } from "@/content/home";
import { getProjectBySlug } from "@/content/projects";
import { AlbumArtPlaceholder } from "@/components/ui/AlbumArtPlaceholder";
import { Card } from "@/components/ui/Card";
import {
  SectionTransition,
  useSectionMotion,
} from "@/components/motion/SectionTransition";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Bucket a local hour (0–23) into a Spotify-style daypart. */
function daypartFor(hour: number): Daypart {
  if (hour < 5) return "evening";
  if (hour < 12) return "morning";
  if (hour < 19) return "afternoon";
  return "evening";
}

/**
 * Visitor's current daypart. Starts at a stable default so the server and the
 * client's first render agree (no hydration mismatch), then corrects to the
 * visitor's real local time after mount.
 */
function useDaypart(): Daypart {
  const [daypart, setDaypart] = useState<Daypart>("afternoon");
  useEffect(() => setDaypart(daypartFor(new Date().getHours())), []);
  return daypart;
}

/** Distinct accent hue per featured cover (green / violet / blue). */
const COVER_HUES = [145, 275, 210];

export function HomeSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();
  const daypart = useDaypart();

  const featured = featuredSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project) => project !== undefined);

  return (
    <SectionTransition className="px-6 pb-16 pt-20 sm:px-10">
      {/* Hero: name eyebrow + time-aware greeting + long tagline. */}
      <p className="text-sm font-semibold uppercase tracking-widest text-spotify">
        {site.name}
      </p>
      <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
        {pick(greetings[daypart])}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
        {pick(site.tagline)}
      </p>

      {/* Availability signal — tasteful green "open to work" pill. */}
      <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-spotify/40 bg-spotify/10 px-4 py-1.5 text-sm font-semibold text-spotify">
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spotify opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-spotify" />
        </span>
        {pick(home.availability)}
      </span>

      {/* Featured projects — quick-access cards into the strongest work. */}
      <h2 className="mb-4 mt-12 text-2xl font-bold tracking-tight">
        {t.featuredProjects}
      </h2>
      <motion.ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={m.staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {featured.map((project, i) => (
          <motion.li key={project.slug} variants={m.staggerItem}>
            <Link href={`/proyectos/${project.slug}`} className="block h-full">
              <Card className="flex h-full flex-col">
                <div className="relative mb-4">
                  <AlbumArtPlaceholder
                    fill
                    glyph={project.comingSoon ? "🔒" : "🎵"}
                    hue={COVER_HUES[i % COVER_HUES.length]}
                    label={project.title}
                  />
                  {/* Hover play affordance (decorative; the whole card links). */}
                  <span
                    aria-hidden
                    className="absolute bottom-2 right-2 grid h-12 w-12 translate-y-2 place-items-center rounded-full bg-spotify text-lg text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    ▶
                  </span>
                </div>

                <p className="truncate font-bold text-white">{project.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {pick(project.role)}
                </p>
                {project.comingSoon && (
                  <span className="mt-3 inline-block self-start rounded-full bg-spotify/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-spotify">
                    {t.comingSoon}
                  </span>
                )}
              </Card>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </SectionTransition>
  );
}
