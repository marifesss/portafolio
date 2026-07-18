import type { Localized } from "@/lib/types";

/** Global site identity: name + taglines used across the shell. */
export const site = {
  name: "Mariana Fes",
  domain: "marianafes.dev",

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
