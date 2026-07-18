import type { Metadata } from "next";
import { SkillsSection } from "@/features/skills/SkillsSection";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return <SkillsSection />;
}
