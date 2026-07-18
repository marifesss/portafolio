# 11 — Partela "Coming Soon" state + mailto notify

**Status:** open
**Type:** feature
**Depends on:** 02, 10

## Description
Give Partela its special pre-launch treatment: a "coming soon" album with a
blank cover placeholder, the stack, and a **bell + `mailto:` "notify me"**
button — without revealing what the product does.

## Tasks
- [ ] In `ProjectDetail` (or a dedicated coming-soon branch), detect
      `project.comingSoon` and render the pre-launch layout.
- [ ] Blank "album" cover via `AlbumArtPlaceholder` (disc/"unreleased" styling).
- [ ] Show the stack chips (React 19 · TypeScript · Vite · Tailwind · Spring
      Boot · Spring Cloud · PostgreSQL) but keep the product concept hidden.
- [ ] 🔔 "Notificarme cuando lance" / "Notify me when it drops" button that opens
      a prefilled `mailto:marianafes15@gmail.com` (subject/body bilingual by
      current locale).
- [ ] Add any notify-button labels to the dictionary; keep the "reveal later"
      note reflected as a `// TODO` in content.

## Acceptance criteria
- Partela shows a distinct coming-soon state, no product spoilers.
- The bell button opens a correctly prefilled email to
  marianafes15@gmail.com.
- Stack is visible; layout matches the Spotify aesthetic.
- Bilingual labels swap on toggle.
