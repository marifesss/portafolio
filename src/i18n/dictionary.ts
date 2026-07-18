import type { Locale } from "@/lib/types";

/**
 * UI labels that are NOT part of the content (buttons, section subtitles,
 * chrome). Content copy lives in `src/content`; this is just the interface.
 */
export const dictionary = {
  es: {
    languageName: "ES",
    switchLanguage: "Cambiar a inglés",
    nowPlayingLabel: "Reproduciendo ahora",
    library: "Tu biblioteca",
    more: "Más",
    close: "Cerrar",
    playlist: "Playlist",
    tracks: "canciones",
    play: "Reproducir",
    pause: "Pausar",
    backToProjects: "Volver a Proyectos",
    stack: "Stack",
    links: "Enlaces",
    comingSoon: "Próximamente",
    notifyMe: "🔔 Notificarme cuando lance",
    seeProject: "Ver proyecto",
    notFoundTitle: "Pista no encontrada",
    notFoundBody: "Esta canción no existe en la playlist.",
  },
  en: {
    languageName: "EN",
    switchLanguage: "Switch to Spanish",
    nowPlayingLabel: "Now playing",
    library: "Your Library",
    more: "More",
    close: "Close",
    playlist: "Playlist",
    tracks: "tracks",
    play: "Play",
    pause: "Pause",
    backToProjects: "Back to Projects",
    stack: "Stack",
    links: "Links",
    comingSoon: "Coming soon",
    notifyMe: "🔔 Notify me when it drops",
    seeProject: "See project",
    notFoundTitle: "Track not found",
    notFoundBody: "This song isn't in the playlist.",
  },
} satisfies Record<Locale, Record<string, string>>;

export type UIDictionary = (typeof dictionary)[Locale];
