# 20 — Deploy to Vercel & finalize README

**Status:** open
**Type:** chore
**Depends on:** 19

## Description
Ship it. Deploy the finished portfolio to Vercel on the default `*.vercel.app`
domain (custom domain later), verify the production build, and update the README
with the live URL and accurate run instructions.

## Tasks
- [ ] Confirm a clean production build (`npm run build`) and no runtime errors in
      `npm run start`.
- [ ] Create/connect the Vercel project (import the Git repo); confirm framework
      auto-detection (Next.js) and build settings.
- [ ] Deploy to production; capture the `*.vercel.app` URL.
- [ ] Smoke-test the live site: all routes, language toggle, player, search,
      mobile tab bar, mailto buttons.
- [ ] Update `README.md`: replace "[pendiente deploy]" with the live URL; fix the
      contact email to marianafes15@gmail.com; verify run instructions.
- [ ] Note the custom-domain (`marianafes.dev`) step as a future/optional TODO.

## Acceptance criteria
- The portfolio is live on a Vercel URL and passes a smoke test on desktop and
  mobile.
- README shows the live link and correct contact info / instructions.
- Production build is clean; the site is shareable with recruiters.
