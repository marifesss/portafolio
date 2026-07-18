# Architecture

A frontend-only portfolio (Next.js App Router + React + Tailwind + Framer Motion)
with a Spotify-inspired UI. The codebase is deliberately layered so the
structure itself reflects how I like to build: content, presentation, and
routing are separated, and nothing hardcodes copy or language inline.

## Layers

```
src/
├── app/                  Delivery / routing layer (thin)
│   ├── layout.tsx        Root: fonts + LanguageProvider + AppShell
│   ├── page.tsx          Each page just renders one feature section
│   ├── perfil/           Route → ProfileSection
│   ├── proyectos/        Route → ProjectsSection
│   │   └── [slug]/       Dynamic route → ProjectDetail (statically generated)
│   ├── experiencia/  skills/  records/  contacto/
│   ├── not-found.tsx
│   └── globals.css       Tailwind v4 + Spotify theme tokens (@theme)
│
├── content/              Domain data — the single source of truth
│   ├── site, navigation, profile, projects, experience,
│   │   skills, records, contact         (typed, bilingual)
│   └── index.ts          Barrel
│
├── features/             One vertical slice per sidebar section
│   ├── home/  profile/  projects/  experience/
│   └── skills/  records/  contact/       (interactive "Section" components)
│
├── components/
│   ├── layout/           Persistent chrome: AppShell, Sidebar,
│   │                     PlayerBar, LanguageToggle
│   └── ui/               Design-system primitives: Chip, SectionHeader
│
├── i18n/                 Cross-cutting: ES/EN
│   ├── LanguageProvider  Client context (locale + persistence + `pick`)
│   └── dictionary        UI labels (not content)
│
└── lib/
    └── types.ts          Shared domain types (Locale, Localized<T>, Project…)
```

## Key decisions

- **Content as data.** Every project, skill, etc. is typed data in `src/content`,
  not JSX. Adding a project = adding an object. The UI renders whatever's there.
- **Bilingual by type.** Any language-dependent text is `Localized<T> = { es, en }`.
  Components resolve it via `pick(value)` from the language context — the UI is
  never wired to one language.
- **Thin routing.** `app/*/page.tsx` files only map a URL to a feature section.
  The persistent Spotify shell (sidebar + "now playing" bar) lives in the root
  `layout.tsx`, so navigation only swaps the main panel.
- **Server/Client boundary.** Pages and layout are Server Components; the
  interactive `*Section` components are `"use client"` because they consume the
  language context. This keeps the client bundle small.
- **Path alias.** `@/*` → `src/*` (see `tsconfig.json`).

## Adding things

| Task                     | Where                                            |
| ------------------------ | ------------------------------------------------ |
| New project              | `src/content/projects.ts` (add an object)        |
| New sidebar section      | `src/content/navigation.ts` + `app/<route>/` + a feature under `src/features/` |
| New UI label             | `src/i18n/dictionary.ts` (both `es` and `en`)    |
| Theme color / token      | `src/app/globals.css` (`@theme`)                 |
| Project images           | `public/images/projects/`                        |
```
