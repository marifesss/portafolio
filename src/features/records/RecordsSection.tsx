"use client";

import { records } from "@/content/records";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/i18n/LanguageProvider";

/** "Récords personales" — the B-sides / off-the-code playlist. */
export function RecordsSection() {
  const { pick } = useLanguage();

  return (
    <section>
      <SectionHeader
        eyebrow="B-sides"
        title="Récords personales"
      />

      <ul className="grid gap-4 px-6 pb-12 sm:grid-cols-2 sm:px-10">
        {records.map((record) => (
          <li
            key={pick(record.title)}
            className="flex gap-4 rounded-lg bg-white/5 p-5 transition-colors hover:bg-white/10"
          >
            <span aria-hidden className="text-2xl">
              {record.icon}
            </span>
            <div>
              <h2 className="font-bold text-white">{pick(record.title)}</h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                {pick(record.description)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
