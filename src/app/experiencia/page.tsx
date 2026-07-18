import type { Metadata } from "next";
import { ExperienceSection } from "@/features/experience/ExperienceSection";

export const metadata: Metadata = { title: "Experiencia" };

export default function ExperienciaPage() {
  return <ExperienceSection />;
}
