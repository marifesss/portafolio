import Image from "next/image";
import type { Project } from "@/lib/types";
import { AlbumArtPlaceholder } from "@/components/ui/AlbumArtPlaceholder";
import { hueFor } from "@/features/projects/covers";

interface ProjectCoverProps {
  project: Project;
  /** Fixed pixel side (list thumbnail). Ignored when `fill`. */
  size?: number;
  /** Fill the parent as a responsive square (cards / headers). */
  fill?: boolean;
  /** Accessible name; omit for a decorative cover. */
  label?: string;
}

/**
 * A project's album cover: the real artwork when `project.cover` is set,
 * otherwise the on-brand gradient placeholder. Mirrors `AlbumArtPlaceholder`'s
 * shape so the two are visually interchangeable in lists, cards, and headers.
 */
export function ProjectCover({
  project,
  size = 48,
  fill = false,
  label,
}: ProjectCoverProps) {
  if (!project.cover) {
    return (
      <AlbumArtPlaceholder
        size={size}
        fill={fill}
        glyph={project.comingSoon ? "🔒" : "🎵"}
        hue={hueFor(project.slug)}
        label={label}
      />
    );
  }

  const radius = fill ? "0.5rem" : Math.max(4, size * 0.06);
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      className={`relative shrink-0 overflow-hidden shadow-lg ring-1 ring-black/20 ${
        fill ? "aspect-square w-full" : ""
      }`}
      style={{
        ...(fill ? {} : { width: size, height: size }),
        borderRadius: radius,
      }}
    >
      <Image
        src={project.cover}
        alt={label ?? ""}
        fill
        sizes={fill ? "(max-width: 640px) 100vw, 320px" : `${size}px`}
        className="object-cover"
      />
    </div>
  );
}
