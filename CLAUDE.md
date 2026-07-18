@agents.md

# Portfolio — Mariana Fes

Spotify-themed personal portfolio for **Mariana Fes**, a Computer Engineering
student (UCAB), built to showcase her software-development projects to recruiters
while looking for an internship. Frontend-only, bilingual (ES/EN).

Stack: Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · Framer Motion · TypeScript (strict).

## Design & scope

- **Visual style** — match `DESIGN.md`, the Spotify-desktop spec derived from the
  reference screenshots in `imagenesInspo/`. Read it before building any UI.
- **Scope** — `PRD.md` is the agreed product spec; `.issues/` breaks it into
  sequential, buildable tasks.

## Architecture (see `ARCHITECTURE.md` for full detail)

Deliberately layered — the codebase itself is a showcase of clean structure:

- **`src/app`** — routing only. Pages are thin: each renders one feature section.
  Persistent Spotify shell (sidebar + "now playing" bar) lives in the root `layout.tsx`.
- **`src/content`** — typed, bilingual data. Single source of truth for all copy.
- **`src/features/*`** — one interactive `*Section` component per sidebar item.
- **`src/components/layout`** — persistent chrome (AppShell, Sidebar, PlayerBar, LanguageToggle).
- **`src/components/ui`** — design-system primitives (Chip, SectionHeader).
- **`src/i18n`** — `LanguageProvider` (ES/EN context, persisted) + `dictionary` (UI labels).
- **`src/lib/types.ts`** — shared domain types (`Locale`, `Localized<T>`, `Project`, …).

## Conventions

- **Content as data** — never hardcode copy in JSX; add it to `src/content` and render from there.
- **Bilingual by type** — language-dependent text is `Localized<T> = { es, en }`, resolved via
  `pick(value)` from the language context. UI labels (not content) go in `src/i18n/dictionary.ts`.
- **Server Components by default** — add `"use client"` only to interactive `*Section` components
  (they consume the language context). Keep pages/layout server-side.
- **Path alias** — `@/*` → `src/*`.

## Pending TODOs (also marked `// TODO` in `src/content`)

- **Yelou** — GitHub repo link, live demo/deploy link, Figma link, web + app screenshots.
- **ArrowMaze** — direct backend/frontend repo links, architecture diagrams, gameplay screenshots.
- **Partela** — cover art / placeholder for the "coming soon" state.
- **Mondelēz experience** — update end date once confirmed.

When new assets or content arrive, update the matching file in `src/content` and remove the
corresponding `// TODO` marker — keep content and code in sync.
