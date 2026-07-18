# 14 — Récords personales ("B-sides / Fuera del código")

**Status:** open
**Type:** feature
**Depends on:** 02, 03

## Description
Build the personal-records section as a **"B-sides / Fuera del código"**
playlist: each life achievement is a "track" — Educación, Idiomas, Logros
académicos, Música (violín), Deporte (tenis), Voluntariado. Leave room to add
LinkedIn certifications later.

## Tasks
- [ ] Verify/complete `src/content/records.ts`: each record as a track with
      emoji/label + bilingual text (Educación, Idiomas C2 EF SET, 20/20
      ArrowMaze, violín/Conservatorio, tenis CTA, ProgramAcademy volunteering).
- [ ] Build `RecordsSection` as a B-sides playlist ("Fuera del código"): playlist
      header + track rows, each with its emoji as "cover".
- [ ] Add a placeholder slot / `// TODO` for LinkedIn certifications.
- [ ] Apply shared motion.

## Acceptance criteria
- Records render as a themed B-sides playlist, bilingual.
- All six achievement areas are present with correct copy.
- A clear (non-blocking) placeholder exists for future certifications.
