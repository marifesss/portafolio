"use client";

import { profile } from "@/content/profile";
import { Chip } from "@/components/ui/Chip";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ProfileSection() {
  const { pick } = useLanguage();

  return (
    <article>
      <SectionHeader eyebrow="Perfil" title={pick(profile.headline)} />

      <div className="space-y-6 px-6 pb-12 sm:px-10">
        {pick(profile.bio)
          .split("\n\n")
          .map((paragraph, i) => (
            <p key={i} className="max-w-2xl leading-relaxed text-zinc-300">
              {paragraph}
            </p>
          ))}

        <div className="flex flex-wrap gap-2 pt-2">
          {profile.genres.map((genre) => (
            <Chip key={genre}>{genre}</Chip>
          ))}
        </div>
      </div>
    </article>
  );
}
