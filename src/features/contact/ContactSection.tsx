"use client";

import { motion } from "framer-motion";
import { contactChannels, contactHeading } from "@/content/contact";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSectionMotion } from "@/components/motion/SectionTransition";
import { useLanguage } from "@/i18n/LanguageProvider";

/** "¿Conectamos?" — contact channels as tappable cards. */
export function ContactSection() {
  const { pick, t } = useLanguage();
  const m = useSectionMotion();

  return (
    <section>
      <SectionHeader eyebrow={t.contactEyebrow} title={pick(contactHeading)} />

      <div className="px-gutter pb-section sm:max-w-lg">
        <motion.ul
          className="grid gap-3"
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
