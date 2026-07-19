"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { site } from "@/content/site";
import { greetings, featuredSlugs, home, type Daypart } from "@/content/home";
import { getProjectBySlug, projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { navigation } from "@/content/navigation";
import { Card } from "@/components/ui/Card";
import { ProjectCover } from "@/features/projects/ProjectCover";
import {
  SectionTransition,
  useSectionMotion,
} from "@/components/motion/SectionTransition";
import { useScrollAreaRef } from "@/components/layout/ScrollArea";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Bucket a local hour (0–23) into a Spotify-style daypart. */
function daypartFor(hour: number): Daypart {
  if (hour < 5) return "evening";
  if (hour < 12) return "morning";
  if (hour < 19) return "afternoon";
  return "evening";
}

/** The daypart never changes after mount, so there's nothing to subscribe to. */
const noopSubscribe = () => () => {};
/** SSR + first client (hydration) render: a stable default, so they agree. */
const getServerDaypart = (): Daypart => "afternoon";
/** After hydration: the visitor's real local daypart. */
const getClientDaypart = (): Daypart => daypartFor(new Date().getHours());

/**
 * Visitor's current daypart. Renders the stable default during SSR/hydration
 * (no mismatch), then swaps to the visitor's real local time on the client.
 */
function useDaypart(): Daypart {
  return useSyncExternalStore(
    noopSubscribe,
    getClientDaypart,
    getServerDaypart,
  );
}

/** Case- and accent-insensitive match key. */
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

/** Distinct accent hues for the "browse all" category tiles. */
const BROWSE_HUES = [145, 275, 45, 210, 15, 330, 190];

/**
 * Home ("Inicio"): a top Spotify-style search field folded into the landing
 * page. With an empty query it shows the hero (time-aware greeting + featured
 * projects + "browse everything" tiles); typing turns it into a live search
 * across projects, skills, and sections.
 */
export function HomeSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();
  const router = useRouter();
  const daypart = useDaypart();
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  // Scroll-linked parallax for the "browse all" tiles. The site scrolls inside
  // the shell's content panel, so we track that container (not the window).
  // As the grid travels from the panel's bottom to its top, its offset maps
  // from +down to −up: scrolling down lifts the tiles, scrolling up lowers them.
  const scrollAreaRef = useScrollAreaRef();
  const browseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollAreaRef ?? undefined,
    target: browseRef,
    offset: ["start end", "end start"],
  });
  const rawBrowseY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  // Spring-smooth the raw offset so the drift feels fluid, not pinned 1:1.
  const browseY = useSpring(rawBrowseY, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
  });

  const q = normalize(query);

  const featured = featuredSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project) => project !== undefined);

  // Live filter across projects (title/role), skills, and section names.
  const projectHits = q
    ? projects.filter(
        (p) =>
          normalize(p.title).includes(q) || normalize(pick(p.role)).includes(q),
      )
    : [];
  const skillHits = q
    ? skills.flatMap((group) =>
        group.items
          .filter((item) => normalize(item).includes(q))
          .map((item) => ({ item, category: pick(group.category) })),
      )
    : [];
  const sectionHits = q
    ? navigation.filter((item) => normalize(pick(item.label)).includes(q))
    : [];

  const total = projectHits.length + skillHits.length + sectionHits.length;

  // Enter jumps to the first result (projects → skills → sections).
  const firstHref =
    projectHits[0] != null
      ? `/proyectos/${projectHits[0].slug}`
      : skillHits[0] != null
        ? "/skills"
        : sectionHits[0] != null
          ? sectionHits[0].href
          : null;

  // Section tiles for the blank-query "browse everything" state (skip Home).
  const browseItems = navigation.filter((item) => item.href !== "/");

  return (
    <SectionTransition className="px-6 pb-16 pt-20 sm:px-10">
      {/* Search field — dark, modern Spotify-style pill pinned near the top. */}
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="group/search relative max-w-2xl">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted transition-colors group-focus-within/search:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && firstHref) router.push(firstHref);
            }}
            placeholder={t.searchPlaceholder}
            aria-label={t.search}
            className="w-full rounded-full border border-white/10 bg-white/[0.06] py-3.5 pl-12 pr-4 text-base font-medium text-white shadow-inner outline-none transition-all placeholder:text-muted hover:border-white/20 hover:bg-white/10 focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-white/15"
          />
        </div>
      </form>

      {q ? (
        /* ── Live search results ─────────────────────────────────────────── */
        total === 0 ? (
          <div className="mt-12 max-w-xl">
            <p className="text-lg font-bold text-white">
              {t.searchNoResults} &ldquo;{query.trim()}&rdquo;
            </p>
            <p className="mt-2 text-muted">{t.searchNoResultsHint}</p>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {projectHits.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
                  {t.searchProjects}
                </h2>
                <motion.ul
                  variants={m.staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1"
                >
                  {projectHits.map((p) => (
                    <motion.li key={p.slug} variants={m.staggerItem}>
                      <Link
                        href={`/proyectos/${p.slug}`}
                        className="flex items-center gap-4 rounded-md p-2 outline-none transition-colors hover:bg-white/10 focus-visible:bg-white/10"
                      >
                        <ProjectCover size={48} project={p} label={p.title} />
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-white">
                            {p.title}
                          </span>
                          <span className="block truncate text-sm text-muted">
                            {pick(p.role)}
                          </span>
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            )}

            {skillHits.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
                  {t.searchSkills}
                </h2>
                <motion.ul
                  variants={m.staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1"
                >
                  {skillHits.map(({ item, category }) => (
                    <motion.li key={`${category}-${item}`} variants={m.staggerItem}>
                      <Link
                        href="/skills"
                        className="flex items-center gap-4 rounded-md p-2 outline-none transition-colors hover:bg-white/10 focus-visible:bg-white/10"
                      >
                        <span
                          aria-hidden
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-white/5 text-lg"
                        >
                          🎧
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-white">
                            {item}
                          </span>
                          <span className="block truncate text-sm text-muted">
                            {category}
                          </span>
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            )}

            {sectionHits.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
                  {t.searchSections}
                </h2>
                <motion.ul
                  variants={m.staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1"
                >
                  {sectionHits.map((item) => (
                    <motion.li key={item.id} variants={m.staggerItem}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 rounded-md p-2 outline-none transition-colors hover:bg-white/10 focus-visible:bg-white/10"
                      >
                        <span
                          aria-hidden
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-white/5 text-lg"
                        >
                          {item.icon}
                        </span>
                        <span className="truncate font-semibold text-white">
                          {pick(item.label)}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            )}
          </div>
        )
      ) : (
        /* ── Blank query → the landing hero ──────────────────────────────── */
        <>
          <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-spotify">
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
            {featured.map((project) => (
              <motion.li key={project.slug} variants={m.staggerItem}>
                <Link href={`/proyectos/${project.slug}`} className="block h-full">
                  <Card className="flex h-full flex-col">
                    <div className="relative mb-4">
                      <ProjectCover fill project={project} label={project.title} />
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

          {/* Browse everything — the section tiles from the old Search page. */}
          <h2 className="mb-4 mt-12 text-2xl font-bold tracking-tight">
            {t.searchBrowseAll}
          </h2>
          {/* Outer wrapper is the scroll-measured target (never transformed, so
              the parallax below can't feed back into its own measurement); the
              inner list carries the drifting `y`. */}
          <div ref={browseRef}>
          <motion.ul
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            style={reduce ? undefined : { y: browseY }}
            variants={m.revealTileContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {browseItems.map((item, i) => {
              const hue = BROWSE_HUES[i % BROWSE_HUES.length];
              return (
                <motion.li key={item.id} variants={m.revealTile}>
                  <Link
                    href={item.href}
                    className="group/tile relative flex h-24 overflow-hidden rounded-lg p-4 outline-none ring-white/10 transition-transform hover:scale-[1.02] focus-visible:ring-2"
                    style={{
                      backgroundImage: `linear-gradient(135deg, hsl(${hue} 45% 32%), hsl(${(hue + 40) % 360} 55% 18%))`,
                    }}
                  >
                    <span className="font-bold text-white">{pick(item.label)}</span>
                    {/* Decorative tile in the same hue — a rotated "album" corner
                        with depth (drop + inner highlight) replacing the emoji. */}
                    <span
                      aria-hidden
                      className="absolute -bottom-3 -right-3 h-16 w-16 rotate-[25deg] rounded-xl transition-transform duration-300 group-hover/tile:rotate-[18deg] group-hover/tile:scale-105"
                      style={{
                        backgroundColor: `hsl(${hue} 58% 46%)`,
                        boxShadow:
                          "0 10px 22px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
                      }}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
          </div>
        </>
      )}
    </SectionTransition>
  );
}
