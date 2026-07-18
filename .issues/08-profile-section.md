# 08 — Perfil (Sobre mí) section

**Status:** done
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
- [x] Verify `src/content/profile.ts` holds the bilingual bio, the "géneros"
      (Clean Architecture · DDD · Business Intelligence · Fintech · Fullstack),
      and an availability line; add anything missing.
      _(Added a dedicated `availability` line; enriched `genres` with decorative glyphs.)_
- [x] Build/refine `ProfileSection`: header, bio paragraphs, "Géneros"
      (rendered as circular "top artist" items per §5/§10), availability callout.
- [x] Optional: an "artist"-style header (circle avatar + eyebrow + huge name +
      meta line).
- [x] Apply shared motion (section fade/slide + staggered "Géneros" reveal).

## Acceptance criteria
- Bio renders bilingually and swaps instantly on language toggle.
- "Géneros" chips render from content, not hardcoded.
- Internship availability is clearly communicated.
- Section matches the Spotify visual language.
