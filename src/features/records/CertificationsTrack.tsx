"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certifications } from "@/content/certifications";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The "Certificaciones" track of the personal-records playlist. Unlike the
 * other B-sides it's expandable: clicking it opens the full list of
 * certificates, each linking out to its public verification page.
 */
export function CertificationsTrack() {
  const { pick, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-1 rounded-md border border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t.hideCertifications : t.showCertifications}
        className="flex w-full items-center gap-4 rounded-md px-3 py-4 text-left outline-none transition-colors hover:bg-white/10 focus-visible:bg-white/10"
      >
        <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-md shadow ring-1 ring-black/20">
          <Image
            src="/images/covers/certificaciones.jpeg"
            alt=""
            fill
            sizes="68px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-white">
            {t.certifications}
          </h2>
          <p className="mt-1 text-base leading-relaxed text-muted">
            {certifications.length} {t.certificatesCount}
          </p>
        </div>

        {/* Chevron doubles as the affordance that this track opens. */}
        <motion.svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="mr-1 h-5 w-5 shrink-0 text-muted"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 border-t border-white/10 px-3 py-3">
              {certifications.map((cert) => (
                <li
                  key={cert.id}
                  className="flex items-center gap-4 rounded-md px-2 py-3 transition-colors hover:bg-white/5"
                >
                  {cert.image ? (
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-14 w-20 shrink-0 overflow-hidden rounded ring-1 ring-white/15 transition-transform hover:scale-105"
                    >
                      <Image
                        src={cert.image}
                        alt={pick(cert.name)}
                        fill
                        sizes="80px"
                        className="bg-white object-cover object-top"
                      />
                    </a>
                  ) : (
                    // Certs verified online have no scan to show. Keep the
                    // empty slot so every row's text starts on the same edge.
                    <div aria-hidden className="h-14 w-20 shrink-0" />
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white">
                      {pick(cert.name)}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {cert.issuer} · {pick(cert.date)}
                      {cert.detail && ` · ${pick(cert.detail)}`}
                    </p>
                    {cert.href && (
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex text-sm font-semibold text-spotify transition-colors hover:text-white"
                      >
                        {t.viewCertificate} ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
