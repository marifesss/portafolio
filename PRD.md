# PRD — Portafolio Mariana Fes

> Product Requirements Document for the Spotify-themed personal portfolio of
> **Mariana Fes**. This document is the agreed source of truth for scope; the
> `.issues/` directory breaks it into sequential, buildable tasks.

## 1. Goal

Ship a polished, bilingual (ES/EN), Spotify-inspired personal portfolio that
showcases Mariana Fes's software-development projects and helps her land a
software-development internship. The site itself is part of the pitch: the
Spotify metaphor makes it memorable, and the clean layered architecture
(documented in `ARCHITECTURE.md`) demonstrates how she builds.

Frontend-only. No backend, no database, no auth.

## 2. Target audience

- **Primary:** technical and non-technical recruiters / hiring managers looking
  at Mariana for an internship (backend, frontend, or fullstack).
- **Secondary:** engineers who might review the code/architecture, and peers.

Implications: fast load, works great on mobile (recruiters browse on phones),
English-first-class for international roles, and a clear "available for
internship" signal with an easy path to contact.

## 3. Concept & experience

The whole site is framed as a music player (Spotify):

- **Persistent chrome:** left sidebar (desktop) with the "library" of sections;
  a bottom "now playing" bar across all routes.
- **Sections map to music concepts:** Proyectos = a playlist of tracks,
  Experiencia = "Discográfica" (a label/album), Skills = a playlist,
  Récords = a "B-sides / Fuera del código" playlist.
- **Now playing bar:** animated but **silent** — a play/pause toggle animates a
  progress bar and an equalizer; no real audio is hosted or played.
- **Language toggle:** instant ES↔EN swap of all content via React context,
  persisted to `localStorage` (no page reload, no localized URLs).

## 4. Feature scope

### In scope
1. Seven core sections: Inicio, Perfil, Proyectos (+ project detail), Experiencia,
   Skills, Récords, Contacto.
2. Persistent Spotify shell: sidebar (desktop) + animated now-playing PlayerBar.
3. **Search** ("Buscar"): a Spotify-style search that filters/jumps across
   projects, skills, and sections.
4. Bilingual content (ES/EN) via `Localized<T>` + language context.
5. Rich-but-restrained animations (Framer Motion): section fade/slide
   transitions, staggered list entrances, animated hover states, equalizer.
6. Responsive design with a mobile bottom **tab bar** replacing the sidebar.
7. Designed placeholder components for all missing assets (album art,
   "screenshots coming soon", architecture-diagram frames).
8. Project detail with a **"Cómo se hizo"** tab (architecture narrative +
   diagram placeholders).
9. Partela "Coming Soon" state with a **`mailto:`** "notify me" button.
10. Metadata + Spotify-style favicon + per-route titles.
11. Deploy to **Vercel** (default `*.vercel.app` domain).

### Out of scope (for now)
- Real audio playback / audio hosting.
- Shuffle, "Liked Songs", or other extra Spotify features beyond Search.
- Custom domain (`marianafes.dev`) — may be added later.
- Backend, CMS, contact form backend (contact/notify are `mailto:` only).
- OG social-share image and deep accessibility audit — nice-to-have, not
  required for launch (basic keyboard focus + `prefers-reduced-motion` are
  included with the animation work as good practice).
- Dark/light theme switch — the site is dark-only (Spotify aesthetic).

## 5. Section-by-section requirements

### 5.1 Inicio (Home)
- Spotify-style **greeting hero** (time-aware, e.g. "Buenas tardes"), Mariana's
  name, and the long tagline.
- **Featured projects**: quick-access cards to the strongest projects (Yelou,
  ArrowMaze, Partela) linking into their detail.
- Clear, subtle "available for internship" signal.

### 5.2 Perfil (Sobre mí)
- Bilingual about text (already written).
- **"Géneros"** interest chips: Clean Architecture · DDD · Business Intelligence
  · Fintech · Fullstack Development.
- Internship-availability line.

### 5.3 Proyectos (playlist + detail)
- **List view:** a track-list playlist (index, title, role, meta, "coming soon"
  badge for Partela), with play/hover affordance.
- **Detail view** (`/proyectos/[slug]`, statically generated):
  - Header (title, role, duration/meta, stack chips).
  - Description (bilingual).
  - Links (repo, demo, Figma, Behance) — render only those present.
  - Screenshot gallery — **placeholder frames** where assets are missing.
  - **"Cómo se hizo"** tab/section: architecture narrative + **diagram
    placeholders** (especially ArrowMaze: Clean Architecture, DDD, 12 GoF,
    SOLID).
  - **Partela:** Coming-Soon state (blank "album" cover placeholder, stack,
    bell + **`mailto:`** notify button, no product reveal).

### 5.4 Experiencia — "Discográfica" (Mondelēz)
- Framed as a record label / album: company, role, duration, scope (all regions
  of Venezuela), reach (~100 users of the reports).
- **SORT** and **DOI** presented as the two headline "tracks".
- Data/BI framing (SQL Server DW, ETL, Power BI).

### 5.5 Skills (playlist)
- Grouped skills as a playlist / categorized chips: Lenguajes, Frontend,
  Backend, Data & BI, Herramientas.

### 5.6 Récords personales — "B-sides / Fuera del código"
- Framed as a **B-sides playlist**: each achievement is a track — Educación,
  Idiomas (Inglés C2 EF SET), Logros académicos (20/20 ArrowMaze), Música
  (violín), Deporte (tenis CTA), Voluntariado (ProgramAcademy).
- Placeholder to later add LinkedIn certifications.

### 5.7 Contacto
- "¿Conectamos?" / "Let's connect".
- Email (**marianafes15@gmail.com**), phone, LinkedIn, GitHub — as tappable
  cards/links; email via `mailto:`.

### 5.8 Buscar (Search) — cross-cutting feature
- Spotify-style search input; filters/jumps across projects, skills, and
  sections. Reachable from the mobile tab bar (🔍) and desktop.

## 6. Design & interaction requirements

> **Visual spec:** the concrete look (frame, colors, headers, cards, track
> tables, section→screen mapping) is defined in **`DESIGN.md`**, derived from the
> reference screenshots in `imagenesInspo/`. This section states the intent;
> `DESIGN.md` is the implementation reference.

- **Theme:** dark-only, Spotify palette (green accent `#1db954`/`#1ed760`, near
  blacks, elevated greys). Tokens live in `globals.css` `@theme`.
- **PlayerBar:** animated-but-silent — play/pause toggles an animated progress
  bar and an equalizer; shows the short tagline as "now playing".
- **Language toggle:** instant, persisted, no reload; every piece of content is
  bilingual by type.
- **Animations (rich but restrained):** section fade/slide on route change,
  staggered entrance for lists/cards, soft scale/glow on hover, animated
  equalizer. Respect `prefers-reduced-motion`.
- **Responsive:** desktop = sidebar + main + player; mobile = main + player +
  bottom **tab bar** (Inicio, Buscar, Proyectos, Experiencia, +). Tablet
  in-between.
- **Placeholders:** missing images/links render as intentional, on-brand
  placeholder components — never broken images or empty states.

## 7. Technical constraints (from CLAUDE.md / ARCHITECTURE.md)

- Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · Framer Motion ·
  TypeScript (strict).
- **Content as data:** all copy in `src/content` (typed, bilingual); never
  hardcode copy in JSX.
- **Bilingual by type:** `Localized<T> = { es, en }`, resolved via `pick()`.
- **Server Components by default;** `"use client"` only on interactive
  `*Section` components.
- Path alias `@/*` → `src/*`.
- Images under `public/images/...`.
- Commits use the project's `commit` skill (Conventional Commits).

## 8. Success criteria

- All 7 sections + search are implemented, bilingual, and navigable on desktop
  and mobile.
- The Spotify metaphor reads clearly: animated player, playlists, "now playing".
- No broken images or dead states — every missing asset has a designed
  placeholder; only real links render.
- ES↔EN toggle instantly swaps 100% of visible content and persists.
- Animations feel polished and respect reduced-motion.
- `npm run build` passes with no type/lint errors; site is deployed and live on
  Vercel, with the live URL in the README.
- A recruiter on a phone can, in under a minute, understand who Mariana is, see
  her projects, know she's available for an internship, and reach her.

## 9. Known content still pending (tracked, non-blocking)

Handled via placeholders; swapped in later by updating `src/content`:
- Yelou: repo link, live demo, Figma link, web + app screenshots.
- ArrowMaze: direct backend/frontend repo links, architecture diagrams,
  gameplay screenshots.
- Partela: cover art / "coming soon" placeholder.
- Mondelēz: exact end date.
- Récords: LinkedIn certifications.
