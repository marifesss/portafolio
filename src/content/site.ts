import type { Localized } from "@/lib/types";

/** Global site identity: name + taglines used across the shell. */
export const site = {
  name: "Mariana Fes",
  /** Host the site is served from; backs `metadataBase` in the root layout, and
   *  shown in the sidebar footer. Change it here and both follow. */
  domain: "marianafes.vercel.app",

  /** Long tagline (hero). */
  tagline: {
    es: "Estudiante de Ingeniería Informática construyendo software con arquitectura sólida y creatividad.",
    en: "Computer Engineering student building software with solid architecture and creativity.",
  } satisfies Localized,

  /** Short tagline for the "now playing" bar. */
  nowPlaying: {
    es: "Construyendo ideas, una línea de código a la vez.",
    en: "Building ideas, one line of code at a time.",
  } satisfies Localized,
} as const;
