# 13 — Skills playlist

**Status:** open
**Type:** feature
**Depends on:** 02, 03

## Description
Present Skills as a categorized playlist / grouped chips: Lenguajes, Frontend,
Backend, Data & BI, Herramientas.

## Tasks
- [ ] Verify `src/content/skills.ts` holds the grouped skills (Lenguajes,
      Frontend, Backend, Data & BI, Herramientas) with all listed items.
- [ ] Build `SkillsSection`: each group as a "playlist"/section of `Chip`s (or
      track rows), with a clear group header.
- [ ] Apply shared motion (stagger chips/rows in per group).
- [ ] Responsive wrapping of chips on mobile.

## Acceptance criteria
- All skills render, grouped by category, from content.
- The section reads as a playlist of skills consistent with the theme.
- Bilingual group labels (if any) swap on toggle; chips wrap cleanly on mobile.
