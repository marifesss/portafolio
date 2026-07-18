import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { ProjectDetail } from "@/features/projects/ProjectDetail";

/** Pre-render one static page per project at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Per-project tab title + description (ES, the default locale). */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: project.title,
    description: project.description.es.split("\n\n")[0],
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
