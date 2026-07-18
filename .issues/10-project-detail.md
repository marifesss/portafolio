# 10 — Project detail page + "Cómo se hizo" tab

**Status:** open
**Type:** feature
**Depends on:** 02, 03, 09

## Description
Build the full project detail view (`/proyectos/[slug]`, statically generated):
a "track" page with header, description, conditional links, a screenshot gallery
(placeholders where missing), and a **"Cómo se hizo"** tab holding the
architecture narrative + diagram placeholders (especially ArrowMaze).

## Tasks
- [ ] Ensure `src/content/projects.ts` types support: stack list, links
      (repo/demo/figma/behance, each optional), screenshots (optional),
      architecture narrative, diagrams (optional). Extend types in
      `src/lib/types.ts` as needed.
- [ ] `ProjectDetail`: header (title, role, meta, stack chips), bilingual
      description, "album art" (placeholder if missing).
- [ ] Links row: render **only** links that exist (no dead links); Yelou's
      Behance link renders now, others as they arrive.
- [ ] Screenshot gallery using `ImagePlaceholder` when no assets.
- [ ] **"Cómo se hizo"** tab/section toggle: architecture narrative (Clean
      Architecture, DDD, 12 GoF, SOLID for ArrowMaze) + `DiagramPlaceholder`
      frames for the diagrams.
- [ ] Confirm `generateStaticParams` covers all project slugs.

## Acceptance criteria
- Every project has a working detail page; only present links render.
- Missing screenshots/diagrams show designed placeholders, never broken images.
- ArrowMaze detail shows the architecture story + "Cómo se hizo" tab with
  diagram placeholders.
- All copy is bilingual and content-driven; `npm run build` statically
  generates each slug.
