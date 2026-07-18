"use client";

import { skills } from "@/content/skills";
import { Chip } from "@/components/ui/Chip";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/i18n/LanguageProvider";

export function SkillsSection() {
  const { pick, t } = useLanguage();

  return (
    <section>
      <SectionHeader eyebrow={t.playlist} title="Skills" />

      <div className="grid gap-6 px-6 pb-12 sm:grid-cols-2 sm:px-10">
        {skills.map((group) => (
          <div
            key={pick(group.category)}
            className="rounded-lg bg-white/5 p-5"
          >
            <h2 className="mb-3 font-bold text-white">
              {pick(group.category)}
            </h2>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
