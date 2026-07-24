import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  certifications,
  contactChannels,
  experience,
  featuredSlugs,
  getProjectBySlug,
  navigation,
  profile,
  projects,
  records,
  skills,
} from "./index";
import { LOCALES } from "@/lib/types";

/**
 * The content layer is the site's single source of truth, so a typo here is a
 * visible defect (a blank heading, a broken image, a dead sidebar link) that
 * TypeScript can't catch: `Localized` only guarantees both keys *exist*, not
 * that either says anything, and a `src` string is just a string.
 */

/** Does this look like `Localized<string>` — exactly `{ es, en }`? */
function isLocalized(value: unknown): value is Record<string, string> {
  if (typeof value !== "object" || value === null) return false;
  const keys = Object.keys(value);
  return (
    keys.length === LOCALES.length &&
    LOCALES.every((locale) => typeof (value as never)[locale] === "string")
  );
}

/** Every `Localized` value anywhere in the tree, tagged with its path. */
function collectLocalized(
  value: unknown,
  path = "",
): { path: string; value: Record<string, string> }[] {
  if (isLocalized(value)) return [{ path, value }];
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => collectLocalized(item, `${path}[${i}]`));
  }
  if (typeof value === "object" && value !== null) {
    return Object.entries(value).flatMap(([key, child]) =>
      collectLocalized(child, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

/** Every `/…` asset path anywhere in the tree, tagged with its path. */
function collectAssetPaths(value: unknown, path = ""): string[] {
  if (typeof value === "string") {
    return value.startsWith("/images/") ? [`${path} → ${value}`] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => collectAssetPaths(item, `${path}[${i}]`));
  }
  if (typeof value === "object" && value !== null) {
    return Object.entries(value).flatMap(([key, child]) =>
      collectAssetPaths(child, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

const PUBLIC_DIR = join(process.cwd(), "public");

const everything = {
  navigation,
  profile,
  projects,
  experience,
  skills,
  records,
  certifications,
  contactChannels,
};

describe("content", () => {
  it("translates every localized string into both languages", () => {
    const empty = collectLocalized(everything)
      .filter(({ value }) =>
        LOCALES.some((locale) => value[locale].trim() === ""),
      )
      .map(({ path }) => path);

    expect(empty).toEqual([]);
  });

  it("keeps project slugs unique so routes can't collide", () => {
    const slugs = projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every featured slug to a real project", () => {
    for (const slug of featuredSlugs) {
      expect(getProjectBySlug(slug), `featured slug "${slug}"`).toBeDefined();
    }
  });

  it("returns undefined for an unknown slug instead of throwing", () => {
    expect(getProjectBySlug("no-such-project")).toBeUndefined();
  });

  it("points every sidebar item at a distinct route", () => {
    const hrefs = navigation.map((item) => item.href);

    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) expect(href).toMatch(/^\//);
  });

  it("lists each gallery capture once per project", () => {
    for (const project of projects) {
      const sources = (project.media ?? []).map((item) => item.src);
      expect(new Set(sources).size, `media of "${project.slug}"`).toBe(
        sources.length,
      );
    }
  });

  it("gives every gallery video a poster, so nothing renders as a black box", () => {
    const missing = projects.flatMap((project) =>
      (project.media ?? [])
        .filter((item) => item.type === "video" && !item.poster)
        .map((item) => `${project.slug}: ${item.src}`),
    );

    expect(missing).toEqual([]);
  });

  it("points every project link at an absolute external URL", () => {
    const links = projects.flatMap((project) =>
      project.links.map((link) => `${project.slug}: ${link.href}`),
    );

    for (const entry of links) {
      expect(entry.split(": ")[1]).toMatch(/^https:\/\//);
    }
  });

  it("references only assets that exist in public/", () => {
    const missing = collectAssetPaths(everything).filter(
      (entry) => !existsSync(join(PUBLIC_DIR, entry.split(" → ")[1])),
    );

    expect(missing).toEqual([]);
  });
});
