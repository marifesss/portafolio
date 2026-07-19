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
  /** Emoji/glyph used as a lightweight icon (mobile tabs, fallback tile). */
  icon: string;
  /** Optional cover art path in /public shown as the sidebar row thumbnail. */
  cover?: string;
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

/** An architecture diagram in the "Cómo se hizo" tab. */
export interface DiagramItem {
  /** Path in /public; when absent a `DiagramPlaceholder` frame is shown. */
  src?: string;
  /** Caption / title shown under the frame (also the image alt text). */
  caption: Localized;
}

/**
 * "Cómo se hizo" — the making-of narrative for a project's engineering tab:
 * how it was architected, plus optional diagrams (real or placeholder).
 */
export interface ProjectMaking {
  /** Paragraphs separated by a blank line ("\n\n"), like `description`. */
  narrative: Localized;
  /** Architecture diagrams; each renders a real image or a placeholder frame. */
  diagrams?: DiagramItem[];
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
  /**
   * Engineering write-up for the "Cómo se hizo" tab. When present the detail
   * view splits into "Resumen" / "Cómo se hizo" tabs; otherwise it's one page.
   */
  making?: ProjectMaking;
}

/* ------------------------------------------------------------------ */
/* Experience ("Discográfica")                                         */
/* ------------------------------------------------------------------ */

/** A headline "track" on an experience "album" (e.g. SORT, DOI). */
export interface ExperienceHighlight {
  name: string;
  description: Localized;
}

export interface Experience {
  company: string;
  role: Localized;
  period: Localized;
  description: Localized;
  /** Coverage of the work, e.g. "all Venezuela regions". */
  scope?: Localized;
  /** Audience the output reaches, e.g. "~100 users". */
  reach?: Localized;
  /** Data / BI tooling chips (SQL Server DW, ETL, Power BI…). */
  tools?: string[];
  /** Optional "label" artwork path in /public (company logo / cover). */
  cover?: string;
  /** The album's headline "tracks". */
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
  /** Optional cover art path in /public; falls back to the emoji tile. */
  image?: string;
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
