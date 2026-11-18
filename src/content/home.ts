import type { Localized } from "@/lib/types";

/**
 * Home ("Inicio") copy — kept as data so the landing hero renders from content,
 * never hardcoded in JSX. Holds the time-aware greeting variants
 * and which projects to surface as quick-access cards.
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
export const featuredSlugs = ["alo-mama", "partela", "yelou", "arrowmaze"] as const;
