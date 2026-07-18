# 17 — Content & i18n consistency pass

**Status:** open
**Type:** content
**Depends on:** 07, 08, 10, 11, 12, 13, 14, 15, 16

## Description
Once all sections consume content, do a full sweep to guarantee correctness,
bilingual completeness, and that no copy is hardcoded in JSX. Fix the known
email discrepancy and reconcile TODOs.

## Tasks
- [ ] Standardize the contact email to **marianafes15@gmail.com** everywhere
      (content, README, mailto buttons); confirm this is the intended address.
- [ ] Verify every `*Section` and detail view pulls copy from `src/content` /
      dictionary — no inline hardcoded strings.
- [ ] Confirm every `Localized<T>` field has both `es` and `en` populated and
      that the toggle swaps 100% of visible content.
- [ ] Reconcile `// TODO` markers: keep genuinely-pending ones (Yelou/ArrowMaze
      assets & links, Partela cover, Mondelēz end date, LinkedIn certs); remove
      any that are now resolved.
- [ ] Proofread ES and EN copy for typos/consistency.

## Acceptance criteria
- No hardcoded user-facing copy remains in JSX.
- Toggling ES↔EN swaps all visible text with no missing translations.
- Email is consistent across the whole site.
- Remaining TODOs accurately reflect only still-pending assets/content.
