import type { SkillGroup } from "@/lib/types";

/** "Skills" playlist, grouped by category. */
export const skills: SkillGroup[] = [
  {
    category: { es: "Lenguajes", en: "Languages" },
    items: ["JavaScript", "TypeScript", "SQL", "C++", "Python"],
  },
  {
    category: { es: "Frontend", en: "Frontend" },
    items: ["React", "Flutter", "HTML"],
  },
  {
    category: { es: "Backend", en: "Backend" },
    items: [
      "NestJS",
      "Spring Boot",
      "Spring Cloud",
      "Arquitectura Hexagonal",
      "DDD",
    ],
  },
  {
    category: { es: "Data & BI", en: "Data & BI" },
    items: [
      "Power BI",
      "SQL Server",
      "PostgreSQL",
      "Business Analysis",
      "KPIs",
      "ETL",
    ],
  },
  {
    category: { es: "Herramientas", en: "Tools" },
    items: ["Git / GitHub", "Docker", "Claude Code", "Cursor", "Lovable"],
  },
];
