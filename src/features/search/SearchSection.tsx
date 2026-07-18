"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { navigation } from "@/content/navigation";
import { AlbumArtPlaceholder } from "@/components/ui/AlbumArtPlaceholder";
import { useSectionMotion } from "@/components/motion/SectionTransition";
import { hueFor } from "@/features/projects/covers";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Case- and accent-insensitive match key. */
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/** Distinct accent hues for the "browse all" category tiles. */
const BROWSE_HUES = [145, 275, 45, 210, 15, 330, 190];

export function SearchSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const q = normalize(query);

  // Live filter across projects (title/role), skills, and section names.
  const projectHits = q
    ? projects.filter(
        (p) =>
          normalize(p.title).includes(q) ||
          normalize(pick(p.role)).includes(q),
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
    ? navigation.filter(
        (item) =>
          item.href !== "/buscar" && normalize(pick(item.label)).includes(q),
      )
    : [];

  const total = projectHits.length + skillHits.length + sectionHits.length;

  // Enter jumps to the first result (projects â†’ skills â†’ sections).
  const firstHref =
    projectHits[0] != null
      ? `/proyectos/${projectHits[0].slug}`
      : skillHits[0] != null
        ? "/skills"
        : sectionHits[0] != null
          ? sectionHits[0].href
          : null;

  // Section tiles for the blank-query "browse everything" state.
  const browseItems = navigation.filter((item) => item.href !== "/buscar");

  return (
    <section className="px-6 pb-12 pt-16 sm:px-10">
      <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        {t.search}
      </h1>

      {/* Search field â€” white Spotify-style pill. */}
      <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-6">
        <div className="relative max-w-xl">
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-black/60"
          >
            ðŸ”
          </span>
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && firstHref) router.push(firstHref);
            }}
            placeholder={t.searchPlaceholder}
            aria-label={t.search}
            className="w-full rounded-full bg-white py-3 pl-12 pr-4 font-medium text-black outline-none placeholder:text-black/50 focus:ring-2 focus:ring-spotify"
          />
        </div>
      </form>

      {/* Blank query â†’ browse everything. */}
      {!q ? (
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-white">
            {t.searchBrowseAll}
          </h2>
          <motion.ul
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            variants={m.staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {browseItems.map((item, i) => {
              const hue = BROWSE_HUES[i % BROWSE_HUES.length];
              return (
                <motion.li key={item.id} variants={m.staggerItem}>
                  <Link
                    href={item.href}
                    className="relative flex h-24 overflow-hidden rounded-lg p-4 outline-none ring-white/10 transition-transform hover:scale-[1.02] focus-visible:ring-2"
                    style={{
                      backgroundImage: `linear-gradient(135deg, hsl(${hue} 45% 32%), hsl(${(hue + 40) % 360} 55% 18%))`,
                    }}
                  >
                    <span className="font-bold text-white">
                      {pick(item.label)}
                    </span>
                    <span
                      aria-hidden
                      className="absolute -bottom-2 -right-1 rotate-12 text-4xl drop-shadow-lg"
                    >
                      {item.icon}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      ) : total === 0 ? (
        /* No results. */
        <div className="mt-12 max-w-xl">
          <p className="text-lg font-bold text-white">
            {t.searchNoResults} &ldquo;{query.trim()}&rdquo;
          </p>
          <p className="mt-2 text-muted">{t.searchNoResultsHint}</p>
        </div>
      ) : (
        /* Grouped results. */
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
                      <AlbumArtPlaceholder
                        size={44}
                        glyph={p.comingSoon ? "ðŸ”’" : "ðŸŽµ"}
                        hue={hueFor(p.slug)}
                      />
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
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white/5 text-lg"
                      >
                        ðŸŽ§
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
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white/5 text-lg"
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
      )}
    </section>
  );
}
