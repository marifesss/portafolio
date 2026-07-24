import { describe, expect, it } from "vitest";
import { dictionary } from "./dictionary";
import { LOCALES } from "@/lib/types";

/**
 * The UI is bilingual by type, but a dictionary is a plain object: nothing
 * stops a label from being added to `es` and forgotten in `en`. These tests
 * are that missing check.
 */
describe("dictionary", () => {
  it("covers every supported locale", () => {
    expect(Object.keys(dictionary).sort()).toEqual([...LOCALES].sort());
  });

  it("defines the same labels in Spanish and English", () => {
    expect(Object.keys(dictionary.en).sort()).toEqual(
      Object.keys(dictionary.es).sort(),
    );
  });

  it.each(LOCALES)("has no blank label in %s", (locale) => {
    const blank = Object.entries(dictionary[locale])
      .filter(([, value]) => value.trim() === "")
      .map(([key]) => key);

    expect(blank).toEqual([]);
  });

  it("does not leave a label untranslated between locales", () => {
    // Labels that are legitimately identical in both languages (proper nouns,
    // short technical words). Anything else matching across locales is a
    // forgotten translation.
    const sameInBothLanguages = new Set([
      "languageName",
      "platformWeb",
      "playlist",
      "email",
      "linkedin",
      "github",
      // Industry loanwords and a music term, used as-is in Spanish.
      "searchSkills",
      "skillsTitle",
      "stack",
      "recordsEyebrow",
    ]);

    const untranslated = Object.keys(dictionary.es).filter(
      (key) =>
        !sameInBothLanguages.has(key) &&
        dictionary.es[key as keyof typeof dictionary.es] ===
          dictionary.en[key as keyof typeof dictionary.en],
    );

    expect(untranslated).toEqual([]);
  });
});
