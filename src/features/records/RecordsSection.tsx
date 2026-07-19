"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { records } from "@/content/records";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { AlbumArtPlaceholder } from "@/components/ui/AlbumArtPlaceholder";
import { useSectionMotion } from "@/components/motion/SectionTransition";
import { useLanguage } from "@/i18n/LanguageProvider";

/** A distinct accent hue per B-side "track", so each cover reads differently. */
const RECORD_HUES = [145, 275, 45, 210, 15, 330];

/** "Récords personales" — the "B-sides / Fuera del código" playlist. */
export function RecordsSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();

  return (
    <section>
      <SectionHeader
        eyebrow={t.recordsEyebrow}
        title={t.recordsTitle}
        subtitle={`${t.offTheCode} · ${records.length} ${t.tracks}`}
      />

      <motion.ul
        className="px-3 pb-12 sm:px-6"
        variants={m.staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {records.map((record, i) => (
          <motion.li
            key={pick(record.title)}
            variants={m.staggerItem}
            className="flex items-center gap-4 rounded-md px-3 py-4 transition-colors hover:bg-white/10"
          >
            {/* Real cover art, with the emoji tile as a fallback. */}
            {record.image ? (
              <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-md shadow ring-1 ring-black/20">
                <Image
                  src={record.image}
                  alt=""
                  fill
                  sizes="68px"
                  className="object-cover"
                />
              </div>
            ) : (
              <AlbumArtPlaceholder
                size={68}
                glyph={record.icon}
                hue={RECORD_HUES[i % RECORD_HUES.length]}
              />
            )}
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-white">
                {pick(record.title)}
              </h2>
              <p className="mt-1 text-base leading-relaxed text-muted">
                {pick(record.description)}
              </p>
            </div>
          </motion.li>
        ))}

        {/* Non-blocking placeholder for future LinkedIn certifications. */}
        <motion.li
          variants={m.staggerItem}
          className="mt-1 flex items-center gap-4 rounded-md border border-dashed border-white/15 px-3 py-4"
        >
          <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-md shadow ring-1 ring-black/20 opacity-90">
            <Image
              src="/images/todo/linkedin.jpeg"
              alt=""
              fill
              sizes="68px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-muted">
                {t.certifications}
              </h2>
              <Badge>{t.comingSoon}</Badge>
            </div>
            <p className="mt-1 text-base leading-relaxed text-faint">
              {t.certificationsSoon}
            </p>
          </div>
        </motion.li>
      </motion.ul>
    </section>
  );
}
