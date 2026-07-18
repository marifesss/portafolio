"use client";

import { motion } from "framer-motion";
import { skills } from "@/content/skills";
import { Chip } from "@/components/ui/Chip";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSectionMotion } from "@/components/motion/SectionTransition";
import { useLanguage } from "@/i18n/LanguageProvider";

/** "Skills" playlist: each category is a section of chips ("tracks"). */
export function SkillsSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();

  const total = skills.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section>
      <SectionHeader
        eyebrow={t.playlist}
        title="Skills"
        subtitle={`${total} ${t.tracks}`}
      />

      <motion.ul
        className="grid gap-6 px-6 pb-12 sm:grid-cols-2 sm:px-10"
        variants={m.staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {skills.map((group) => (
          <motion.li
            key={pick(group.category)}
            variants={m.staggerItem}
            className="rounded-lg bg-white/5 p-5"
          >
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <h2 className="font-bold text-white">{pick(group.category)}</h2>
              <span className="text-xs text-faint">
                {group.items.length} {t.tracks}
              </span>
            </div>

            {/* Chips stagger in within each group (inherits the parent's
                hidden→visible state, then runs its own staggerChildren). */}
            <motion.ul
              className="flex flex-wrap gap-2"
              variants={m.staggerContainer}
            >
              {group.items.map((item) => (
                <motion.li key={item} variants={m.staggerItem}>
                  <Chip>{item}</Chip>
                </motion.li>
              ))}
            </motion.ul>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
