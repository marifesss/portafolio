import type { Metadata } from "next";
import { ProjectsSection } from "@/features/projects/ProjectsSection";

export const metadata: Metadata = { title: "Proyectos" };

export default function ProyectosPage() {
  return <ProjectsSection />;
}
