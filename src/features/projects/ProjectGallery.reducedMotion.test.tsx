import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import type { MediaItem } from "@/lib/types";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { mockMatchMedia } from "../../../vitest.setup";
import { ProjectGallery } from "./ProjectGallery";

/**
 * Lives in its own file on purpose: framer-motion reads the reduced-motion
 * media query once per module instance and caches it, so the preference has to
 * be in place before the first render of the file — it can't be flipped
 * between tests that share a module registry.
 */

const media: MediaItem[] = [
  {
    type: "video",
    src: "/images/demo/web-1.mp4",
    poster: "/images/demo/posters/web-1.webp",
    platform: "web",
    caption: { es: "Inicio web", en: "Web home" },
  },
  {
    type: "image",
    src: "/images/demo/web-2.png",
    platform: "web",
    caption: { es: "Buscador", en: "Search" },
  },
  {
    type: "video",
    src: "/images/demo/app-1.mp4",
    poster: "/images/demo/posters/app-1.webp",
    platform: "mobile",
    caption: { es: "Inicio app", en: "App home" },
  },
];

beforeEach(() => {
  mockMatchMedia((query) => query.includes("prefers-reduced-motion"));
});

describe("ProjectGallery under reduced motion", () => {
  it("collapses the scroll chapters into plain per-platform sections", () => {
    render(
      <LanguageProvider>
        <ProjectGallery media={media} title="Demo" />
      </LanguageProvider>,
    );

    expect(screen.getByRole("heading", { name: "Web" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "App móvil" }),
    ).toBeInTheDocument();
    // Nothing is hidden behind a spin, so every capture shows at once.
    expect(screen.getAllByRole("figure")).toHaveLength(3);
  });

  it("still refuses to auto-download the clips", () => {
    render(
      <LanguageProvider>
        <ProjectGallery media={media} title="Demo" />
      </LanguageProvider>,
    );

    for (const video of screen.getAllByLabelText(/^Demo — /)) {
      expect(video).not.toHaveAttribute("autoplay");
      expect(video).toHaveAttribute("preload", "metadata");
      expect(video).toHaveAttribute("controls");
    }
  });
});
