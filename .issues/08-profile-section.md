# 08 — Perfil (Sobre mí) section

**Status:** open
**Type:** feature
**Depends on:** 02, 03

## Description
Polish the Profile section into an "artist about" page: bilingual bio, the
"Géneros" interest chips, and the internship-availability line — all
Spotify-styled and animated. **Model it directly on the Spotify Profile page in
`imagenesInspo/` (`...225958.png` / `...230027.png`) per `DESIGN.md` §5 & §10:
circle avatar, eyebrow "Perfil"/"Profile", huge name, then circular "top" items
(→ Géneros/top skills) and a grid (→ featured projects).**

## Tasks
- [ ] Verify `src/content/profile.ts` holds the bilingual bio, the "géneros"
      (Clean Architecture · DDD · Business Intelligence · Fintech · Fullstack),
      and an availability line; add anything missing.
- [ ] Build/refine `ProfileSection`: header, bio paragraphs, "Géneros" as
      `Chip`s, availability callout.
- [ ] Optional: an "artist"-style header (avatar placeholder + name + monthly
      "listeners" flavor) if it reads well — keep tasteful.
- [ ] Apply shared motion.

## Acceptance criteria
- Bio renders bilingually and swaps instantly on language toggle.
- "Géneros" chips render from content, not hardcoded.
- Internship availability is clearly communicated.
- Section matches the Spotify visual language.
