"use client";

import { contactChannels, contactHeading } from "@/content/contact";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ContactSection() {
  const { pick } = useLanguage();

  return (
    <section>
      <SectionHeader eyebrow="Contacto" title={pick(contactHeading)} />

      <ul className="grid gap-3 px-6 pb-12 sm:max-w-lg sm:px-10">
        {contactChannels.map((channel) => (
          <li key={channel.id}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <span aria-hidden className="text-xl">
                {channel.icon}
              </span>
              <span className="font-semibold text-white">{channel.label}</span>
              <span className="ml-auto text-faint">→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
