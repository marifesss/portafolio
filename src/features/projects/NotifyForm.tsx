"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  NOTIFY_EMAIL,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
} from "@/content/notify";
import { useLanguage } from "@/i18n/LanguageProvider";

type Status = "idle" | "sending" | "sent" | "error";

/** Prefilled `mailto:` — the fallback when there's no access key, or on error. */
function useMailto(projectTitle: string) {
  const { t } = useLanguage();
  const subject = `${t.notifySubject} ${projectTitle}`;
  const body = `${t.notifyBody} ${projectTitle}.`;
  return `mailto:${NOTIFY_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Waitlist signup for an unreleased project: the visitor leaves their address
 * and it's relayed to `NOTIFY_EMAIL` — so signups land in one inbox instead of
 * depending on the visitor having a mail client configured.
 *
 * Until an access key is configured the form is replaced by the old `mailto:`
 * button, so the page degrades to what it did before rather than breaking.
 */
export function NotifyForm({ projectTitle }: { projectTitle: string }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const inputId = useId();
  const mailto = useMailto(projectTitle);

  if (!WEB3FORMS_ACCESS_KEY) {
    return (
      <a
        href={mailto}
        className="inline-flex items-center gap-2 rounded-full bg-spotify px-6 py-3 font-bold text-black transition-transform hover:scale-105"
      >
        {t.notifyMe}
      </a>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `${projectTitle} — nueva suscripción al lanzamiento`,
          from_name: `Portafolio · ${projectTitle}`,
          email,
          // Honeypot: bots fill hidden fields, humans can't see them.
          botcheck: "",
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  // Success replaces the form — there's nothing left to do on this page.
  if (status === "sent") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="inline-flex items-center gap-2 rounded-full bg-spotify/15 px-6 py-3 font-semibold text-spotify"
      >
        🔔 {t.notifySuccess}
      </motion.p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <label htmlFor={inputId} className="text-sm font-semibold text-muted">
        {t.notifyEmailLabel}
      </label>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.notifyEmailPlaceholder}
          disabled={status === "sending"}
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white outline-none transition-colors placeholder:text-faint focus:border-spotify disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 rounded-full bg-spotify px-6 py-3 font-bold text-black transition-transform hover:scale-105 disabled:scale-100 disabled:opacity-60"
        >
          🔔 {status === "sending" ? t.notifySending : t.notifySubmit}
        </button>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-3 text-sm text-muted"
          >
            {t.notifyError}{" "}
            <a href={mailto} className="font-semibold text-spotify underline">
              {t.notifyWriteDirectly}
            </a>
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
