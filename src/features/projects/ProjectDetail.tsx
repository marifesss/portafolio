"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/types";
import { Chip } from "@/components/ui/Chip";
import { AlbumArtPlaceholder } from "@/components/ui/AlbumArtPlaceholder";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { DiagramPlaceholder } from "@/components/ui/DiagramPlaceholder";
import { ProjectGallery } from "@/features/projects/ProjectGallery";
import { ComingSoonDetail } from "@/features/projects/ComingSoonDetail";
import { hueFor } from "@/features/projects/covers";
import { useLanguage } from "@/i18n/LanguageProvider";

type Tab = "overview" | "making";

/** Split a "\n\n"-separated block into paragraphs. */
function paragraphs(text: string) {
  return text.split("\n\n").map((p, i) => (
    <p key={i} className="max-w-2xl leading-relaxed text-muted">
      {p}
    </p>
  ));
}

/** /proyectos/[slug] — a single "track" opened as an album view. */
export function ProjectDetail({ project }: { project: Project }) {
  const { pick, t } = useLanguage();
  const [tab, setTab] = useState<Tab>("overview");

  // Unreleased projects get a dedicated, spoiler-free pre-launch layout.
  if (project.comingSoon) return <ComingSoonDetail project={project} />;

  const hasMaking = Boolean(project.making);
  // Guard against a stale tab if a project without a "making" tab is shown.
  const activeTab: Tab = hasMaking ? tab : "overview";

  return (
    <article>
      {/* Album-style header: cover + eyebrow meta + title + role ("artist"). */}
      <header className="bg-gradient-to-b from-spotify/25 to-transparent px-6 pb-8 pt-16 sm:px-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="w-36 max-w-full shrink-0 sm:w-52">
            {project.cover ? (
              <div className="relative aspect-square w-full overflow-hidden rounded-md shadow-2xl ring-1 ring-black/30">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 9rem, 13rem"
                  className="object-cover"
                />
              </div>
            ) : (
              <AlbumArtPlaceholder
                fill
                glyph="🎵"
                hue={hueFor(project.slug)}
                label={project.title}
              />
            )}
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {pick(project.meta)}
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg font-semibold text-white">
              {pick(project.role)}
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-8 px-6 pb-12 sm:px-10">
        <Link
          href="/proyectos"
          className="inline-flex text-sm text-muted transition-colors hover:text-white"
        >
          ← {t.backToProjects}
        </Link>

        {/* Tabs — only when there's a "Cómo se hizo" story to switch to. */}
        {hasMaking && (
          <div
            role="tablist"
            aria-label={project.title}
            className="flex gap-2 border-b border-white/10"
          >
            {(
              [
                ["overview", t.overview],
                ["making", t.howItWasMade],
              ] as const
            ).map(([id, label]) => {
              const selected = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${id}`}
                  onClick={() => setTab(id)}
                  className={`-mb-px border-b-2 px-1 pb-3 text-sm font-semibold outline-none transition-colors focus-visible:text-white ${
                    selected
                      ? "border-spotify text-white"
                      : "border-transparent text-muted hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {activeTab === "overview" ? (
          <div
            className="space-y-8"
            {...(hasMaking && {
              role: "tabpanel",
              id: "panel-overview",
              "aria-labelledby": "tab-overview",
            })}
          >
            {paragraphs(pick(project.description))}

            {project.stack.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
                  {t.stack}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery: real media if present; a designed placeholder otherwise. */}
            {project.media && project.media.length > 0 ? (
              <ProjectGallery media={project.media} title={project.title} />
            ) : (
              <div>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted">
                  {t.gallery}
                </h2>
                <ImagePlaceholder
                  label={t.screenshotsComingSoon}
                  className="max-w-2xl"
                />
              </div>
            )}

            {project.links.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
                  {t.links}
                </h2>
                <ul className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-spotify hover:text-spotify"
                      >
                        {pick(link.label)} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          project.making && (
            <div
              className="space-y-8"
              role="tabpanel"
              id="panel-making"
              aria-labelledby="tab-making"
            >
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted">
                  {t.architecture}
                </h2>
                {paragraphs(pick(project.making.narrative))}
              </div>

              {project.making.diagrams &&
                project.making.diagrams.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted">
                      {t.diagrams}
                    </h2>
                    <ul className="grid gap-6 sm:grid-cols-2">
                      {project.making.diagrams.map((diagram, i) => (
                        <li key={i}>
                          <figure>
                            {diagram.src ? (
                              <div className="relative aspect-[16/9] overflow-hidden rounded-lg ring-1 ring-white/10">
                                <Image
                                  src={diagram.src}
                                  alt={`${project.title} — ${pick(diagram.caption)}`}
                                  fill
                                  sizes="(max-width: 640px) 100vw, 50vw"
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <DiagramPlaceholder label={t.diagramComingSoon} />
                            )}
                            <figcaption className="mt-2 text-center text-xs text-faint">
                              {pick(diagram.caption)}
                            </figcaption>
                          </figure>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )
        )}
      </div>
    </article>
  );
}
