# 15 — Contacto ("¿Conectamos?")

**Status:** open
**Type:** feature
**Depends on:** 02, 03

## Description
Build the contact section: "¿Conectamos?" / "Let's connect" with tappable
cards/links for email, LinkedIn, and GitHub. Email opens via `mailto:`.

## Tasks
- [ ] Verify `src/content/contact.ts`: email **marianafes15@gmail.com**, LinkedIn
      linkedin.com/in/fesmariana, GitHub github.com/marifesss, plus the bilingual heading.
- [ ] Build `ContactSection`: heading + `IconLink`/`LinkRow` cards; email as
      `mailto:`, socials open in new tab (`rel="noreferrer"`).
- [ ] Reinforce the "available for internship" CTA here.
- [ ] Apply shared motion; ensure large tap targets on mobile.

## Acceptance criteria
- All three contact methods render and work (mailto/external links).
- Uses the correct email (marianafes15@gmail.com) consistently.
- Bilingual heading swaps on toggle; cards are tap-friendly on mobile.
