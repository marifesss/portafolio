"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { Chip } from "@/components/ui/Chip";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  SectionTransition,
  useSectionMotion,
} from "@/components/motion/SectionTransition";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ProfileSection() {
  const { pick } = useLanguage();
  const m = useSectionMotion();

  return (
    <article>
      <SectionHeader eyebrow="Perfil" title={pick(profile.headline)} />

      <SectionTransition className="space-y-6 px-6 pb-12 sm:px-10">
        {pick(profile.bio)
          .split("\n\n")
          .map((paragraph, i) => (
            <p key={i} className="max-w-2xl leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}

        {/* Reference stagger: each genre chip cascades in. */}
        <motion.div
          className="flex flex-wrap gap-2 pt-2"
          variants={m.staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {profile.genres.map((genre) => (
            <motion.div key={genre} variants={m.staggerItem}>
              <Chip>{genre}</Chip>
            </motion.div>
          ))}
        </motion.div>
      </SectionTransition>
    </article>
  );
}
