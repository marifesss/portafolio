# 07 — Inicio (Home): hero + featured projects

**Status:** done
**Type:** feature
**Depends on:** 02, 03

## Description
Build the landing experience: a Spotify-style time-aware greeting hero with
Mariana's name and long tagline, plus a "featured projects" set of quick-access
cards into the strongest projects. Include a subtle "available for internship"
signal.

## Tasks
- [x] Add any needed Home copy to `src/content` (greeting variants for
      morning/afternoon/evening in ES/EN; availability line) — content as data.
- [x] Add UI labels to `src/i18n/dictionary.ts` as needed.
- [x] Build `HomeSection`: time-aware greeting ("Buenas tardes"/"Good afternoon"),
      name, long tagline, availability chip/line.
- [x] Featured-projects grid: cards for Yelou, ArrowMaze, Partela (pull from
      `projects` content; use `AlbumArtPlaceholder` for missing art) linking to
      their detail pages.
- [x] Apply shared motion (stagger-in cards, hero fade).

## Acceptance criteria
- Home greets by time of day and shows name + tagline, bilingual.
- Featured cards link correctly into `/proyectos/[slug]`.
- "Available for internship" is visible but tasteful.
- All copy comes from `src/content` / dictionary, not hardcoded JSX.
