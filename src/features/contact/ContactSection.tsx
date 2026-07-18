"use client";

import { motion } from "framer-motion";
import { contactChannels, contactHeading } from "@/content/contact";
import { home } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSectionMotion } from "@/components/motion/SectionTransition";
import { useLanguage } from "@/i18n/LanguageProvider";

/** "¿Conectamos?" — contact channels as tappable cards. */
export function ContactSection() {
  const { pick } = useLanguage();
  const m = useSectionMotion();

  return (
    <section>
      <SectionHeader eyebrow="Contacto" title={pick(contactHeading)} />

      <div className="px-6 pb-12 sm:max-w-lg sm:px-10">
        {/* Reinforce the "open to work" signal right at the point of contact. */}
        <span className="inline-flex items-center gap-2 rounded-full border border-spotify/40 bg-spotify/10 px-4 py-1.5 text-sm font-semibold text-spotify">
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spotify opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-spotify" />
          </span>
          {pick(home.availability)}
        </span>

        <motion.ul
          className="mt-6 grid gap-3"
          variants={m.staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {contactChannels.map((channel) => {
            const external = channel.href.startsWith("http");
            return (
              <motion.li key={channel.id} variants={m.staggerItem}>
                <a
                  href={channel.href}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="flex min-h-14 items-center gap-4 rounded-lg bg-white/5 p-4 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-spotify"
                >
                  <span aria-hidden className="text-xl">
                    {channel.icon}
                  </span>
                  <span className="min-w-0 truncate font-semibold text-white">
                    {channel.label}
                  </span>
                  <span aria-hidden className="ml-auto text-faint">
                    →
                  </span>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
