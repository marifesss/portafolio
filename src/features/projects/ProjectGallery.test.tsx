import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { MediaItem } from "@/lib/types";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { intersectionObservers } from "../../../vitest.setup";
import { ProjectGallery } from "./ProjectGallery";

const media: MediaItem[] = [
  {
    type: "video",
    src: "/images/demo/web-1.mp4",
    poster: "/images/demo/posters/web-1.webp",
    platform: "web",
    caption: { es: "Inicio web", en: "Web home" },
  },
  {
    type: "video",
    src: "/images/demo/web-2.mp4",
    poster: "/images/demo/posters/web-2.webp",
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

function renderGallery(items: MediaItem[] = media) {
  return render(
    <LanguageProvider>
      <ProjectGallery media={items} title="Demo" />
    </LanguageProvider>,
  );
}

describe("ProjectGallery", () => {
  it("splits media into one chapter per platform", () => {
    renderGallery();

    expect(
      screen.getByRole("link", { name: "Web" }),
    ).toHaveAttribute("href", "#galeria-web");
    expect(
      screen.getByRole("link", { name: "App móvil" }),
    ).toHaveAttribute("href", "#galeria-mobile");
    expect(screen.getByText("Construido para web y móvil")).toBeInTheDocument();
  });

  it("does not advertise two platforms when only one was built", () => {
    renderGallery(media.filter((item) => item.platform === "web"));

    expect(screen.queryByRole("link", { name: "App móvil" })).toBeNull();
    expect(screen.queryByText("Construido para web y móvil")).toBeNull();
  });

  it("holds back every clip until its chapter is scrolled into view", () => {
    renderGallery();

    const videos = screen.getAllByLabelText(/^Demo — /);
    // One per chapter: the clip currently facing the visitor.
    expect(videos).toHaveLength(2);
    for (const video of videos) {
      expect(video).toHaveAttribute("preload", "none");
      expect(video).not.toHaveAttribute("autoplay");
      expect(video).toHaveAttribute("poster");
    }
  });

  it("starts only the chapter that came into view", async () => {
    const played: string[] = [];
    HTMLMediaElement.prototype.play = function play(this: HTMLVideoElement) {
      played.push(new URL(this.src, "http://localhost").pathname);
      return Promise.resolve();
    };

    renderGallery();

    // Chapters register in render order: [0] is web, [1] is mobile.
    const [webChapter] = intersectionObservers;
    webChapter.trigger(true);

    await waitFor(() => expect(played).toEqual(["/images/demo/web-1.mp4"]));
  });

  it("follows the active language", () => {
    window.localStorage.setItem("portfolio-locale", "en");
    renderGallery();

    expect(screen.getByRole("link", { name: "Mobile app" })).toBeInTheDocument();
    expect(screen.getByText("Built for web and mobile")).toBeInTheDocument();
  });
});
