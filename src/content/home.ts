import type { Localized } from "@/lib/types";

/**
 * Home ("Inicio") copy — kept as data so the landing hero renders from content,
 * never hardcoded in JSX. Holds the time-aware greeting variants, the
 * availability signal, and which projects to surface as quick-access cards.
 */

/** Spotify-style daypart buckets for the greeting. */
export type Daypart = "morning" | "afternoon" | "evening";

/** Greeting per daypart, e.g. "Buenas tardes" / "Good afternoon". */
export const greetings: Record<Daypart, Localized> = {
  morning: { es: "Buenos días", en: "Good morning" },
  afternoon: { es: "Buenas tardes", en: "Good afternoon" },
  evening: { es: "Buenas noches", en: "Good evening" },
};

/** Slugs of the projects surfaced as featured cards on Home, in display order. */
export const featuredSlugs = ["yelou", "arrowmaze", "partela"] as const;

export const home = {
  /** Subtle "open to work" signal shown in the hero. */
  availability: {
    es: "Disponible para pasantías",
    en: "Available for internships",
  } satisfies Localized,
} as const;
