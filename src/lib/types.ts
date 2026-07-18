/**
 * Shared domain types for the portfolio.
 *
 * The whole site is bilingual (ES / EN). Any piece of text that changes with
 * the language is modeled as `Localized<T>`, so the UI never hardcodes a
 * language — it always renders `value[locale]`.
 */

export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

/** A value that exists in every supported language. */
export type Localized<T = string> = Record<Locale, T>;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavItem {
  /** Stable id, also used as a translation key. */
  id: string;
  /** Route this item links to. `/` is home ("Inicio"). */
  href: string;
  /** Sidebar label per language. */
  label: Localized;
  /** Emoji/glyph used as a lightweight icon in the Spotify sidebar. */
  icon: string;
}

/* ------------------------------------------------------------------ */
/* Projects ("Proyectos" playlist — each project is a "track")         */
/* ------------------------------------------------------------------ */

export interface ProjectLink {
  label: Localized;
  href: string;
}

/** A screenshot or video shown in a project's gallery. */
export interface MediaItem {
  /** `image` renders an optimized picture; `video` a native player. */
  type: "image" | "video";
  /** Path in /public. */
  src: string;
  /** Caption shown under the frame (also used as the image alt text). */
  caption: Localized;
  /** Poster frame for videos. */
  poster?: string;
}

export interface Project {
  /** URL segment: /proyectos/[slug] */
  slug: string;
  /** Track title. */
  title: string;
  /** Role, shown as the "artist". */
  role: Localized;
  /** Short meta line (duration / context) shown next to the track. */
  meta: Localized;
  /** One-paragraph description. */
  description: Localized;
  /** Tech stack chips. */
  stack: string[];
  /** External links (repo, demo, figma...). */
  links: ProjectLink[];
  /** "Coming soon" tracks render a locked/blurred cover. */
  comingSoon?: boolean;
  /** Optional cover art path in /public. */
  cover?: string;
  /** Screenshots / video shown in the detail-view gallery. */
  media?: MediaItem[];
}

/* ------------------------------------------------------------------ */
/* Experience ("Discográfica")                                         */
/* ------------------------------------------------------------------ */

export interface ExperienceHighlight {
  name: string;
  description: Localized;
}

export interface Experience {
  company: string;
  role: Localized;
  period: Localized;
  description: Localized;
  highlights: ExperienceHighlight[];
}

/* ------------------------------------------------------------------ */
/* Skills ("Skills" playlist)                                          */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  category: Localized;
  items: string[];
}

/* ------------------------------------------------------------------ */
/* Personal records ("Récords personales")                             */
/* ------------------------------------------------------------------ */

export interface PersonalRecord {
  icon: string;
  title: Localized;
  description: Localized;
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export interface ContactChannel {
  id: string;
  label: string;
  href: string;
  icon: string;
}
