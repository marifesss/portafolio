"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { profile } from "@/content/profile";
import {
  SectionTransition,
  useSectionMotion,
} from "@/components/motion/SectionTransition";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The "Perfil" (About) view, modeled on the Spotify Profile page: a circular
 * avatar + huge name header, an internship-availability callout, the bilingual
 * bio, then "Géneros" rendered as circular "top artist" items.
 */
export function ProfileSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();

  return (
    <article>
      {/* Artist header: circle avatar · eyebrow · huge name · meta line. */}
      <header className="flex flex-col items-center gap-6 bg-gradient-to-b from-spotify/25 to-transparent px-6 pb-8 pt-16 text-center sm:flex-row sm:items-end sm:gap-8 sm:px-10 sm:text-left">
        <Image
          src="/images/mariana/perfil.jpeg"
          alt={site.name}
          width={208}
          height={208}
          priority
          className="h-44 w-44 shrink-0 rounded-full object-cover shadow-2xl ring-1 ring-black/20 sm:h-52 sm:w-52"
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            {t.profileEyebrow}
          </p>
          <h1 className="mt-2 text-5xl font-black tracking-tight text-white sm:text-7xl">
            {site.name}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {t.profileMeta} · {profile.genres.length} {t.genres}
          </p>
        </div>
      </header>

      <SectionTransition className="space-y-8 px-6 pb-16 sm:px-10">
        {/* Internship-availability callout — the loudest signal on the page. */}
        <div className="flex items-center gap-3 rounded-lg border border-spotify/40 bg-spotify/10 px-5 py-4">
          <span aria-hidden className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spotify opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-spotify" />
          </span>
          <p className="text-sm font-semibold text-spotify">
            {pick(profile.availability)}
          </p>
        </div>

        {/* Bilingual bio. */}
        <div className="space-y-6">
          {pick(profile.bio)
            .split("\n\n")
            .map((paragraph, i) => (
              <p key={i} className="max-w-2xl leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
        </div>

        {/* "Géneros" — focus areas as Spotify "top artist" circles. */}
        <section>
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-white">
            {t.genres}
          </h2>
          <motion.ul
            className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5"
            variants={m.staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {profile.genres.map((genre) => (
              <motion.li
                key={genre.name}
                variants={m.staggerItem}
                className="flex flex-col items-center text-center"
              >
                <div className="w-full max-w-[9rem]">
                  <div
                    role="img"
                    aria-label={genre.name}
                    className="relative aspect-square w-full overflow-hidden rounded-full shadow-lg ring-1 ring-black/20"
                  >
                    <Image
                      src={genre.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 45vw, 9rem"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="mt-3 font-semibold text-white">{genre.name}</p>
                <p className="text-sm text-muted">{t.genre}</p>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      </SectionTransition>
    </article>
  );
}
