import type { Project } from "@/lib/types";

/**
 * The "Proyectos" playlist. Each project is a track.
 * `slug` drives the /proyectos/[slug] detail route.
 */
export const projects: Project[] = [
  {
    slug: "yelou",
    title: "Yelou",
    role: {
      es: "Co-founder & Backend Developer",
      en: "Co-founder & Backend Developer",
    },
    meta: {
      es: "Hackathon de 48 horas",
      en: "48-hour hackathon",
    },
    description: {
      es: "Yelou es un directorio de servicios locales (plomeros, mecánicos, manicuristas, y más) desarrollado en un hackathon de 48 horas, construyendo tanto la web como la app. Como co-fundadora y desarrolladora backend, formé parte de un equipo de 4 personas que quedó entre los 150 seleccionados de más de 1,500 postulantes.",
      en: "Yelou is a local services directory (plumbers, mechanics, nail technicians, and more) built during a 48-hour hackathon, developing both the web and mobile app. As co-founder and backend developer, I was part of a 4-person team selected among the top 150 out of over 1,500 applicants.",
    },
    stack: ["Backend", "Web", "Mobile"],
    links: [
      {
        label: { es: "Branding (Behance)", en: "Branding (Behance)" },
        href: "https://www.behance.net/gallery/251837755/Yelou-Branding",
      },
      // TODO: repo de GitHub, Figma, demo/deploy
    ],
  },
  {
    slug: "partela",
    title: "Partela",
    comingSoon: true,
    role: {
      es: "Co-founder & Frontend Developer",
      en: "Co-founder & Frontend Developer",
    },
    meta: {
      es: "🔔 Próximo lanzamiento — Pre-guarda este álbum",
      en: "🔔 Coming soon — Pre-save this album",
    },
    description: {
      es: "Un nuevo proyecto fintech, actualmente en desarrollo. Como co-fundadora y desarrolladora frontend, trabajo con React 19, TypeScript, Vite y Tailwind, conectando con un backend en Spring Boot y Spring Cloud sobre PostgreSQL.\n\nMás detalles muy pronto — dale a la campana 🔔 para enterarte cuando lance.",
      en: "A new fintech project, currently in development. As co-founder and frontend developer, I work with React 19, TypeScript, Vite, and Tailwind, connecting to a Spring Boot and Spring Cloud backend running on PostgreSQL.\n\nMore details coming soon — hit the bell 🔔 to know when it drops.",
    },
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind",
      "Spring Boot",
      "Spring Cloud",
      "PostgreSQL",
    ],
    links: [],
  },
  {
    slug: "arrowmaze",
    title: "ArrowMaze",
    role: {
      es: "Developer — Game Domain & Engine",
      en: "Developer — Game Domain & Engine",
    },
    meta: {
      es: "Proyecto universitario · 20/20",
      en: "University project · Perfect score",
    },
    description: {
      es: "ArrowMaze es un juego de puzzle deslizante desarrollado en equipo, con Flutter en el frontend y NestJS en el backend, con un enfoque especial en la calidad de la arquitectura de software. El backend está construido con Clean Architecture de 4 capas, aplicando Domain-Driven Design completo, los 12 patrones de diseño GoF, principios SOLID e interceptores de NestJS para programación orientada a aspectos.\n\nFui responsable del dominio del juego y el motor de lógica. El proyecto obtuvo una calificación de 20/20, y el profesor lo tomó como ejemplo de referencia para futuros semestres.",
      en: "ArrowMaze is a sliding-puzzle game built as a team project, with Flutter on the frontend and NestJS on the backend, with a strong focus on software architecture quality. The backend follows a 4-layer Clean Architecture, applying full Domain-Driven Design, all 12 GoF design patterns, SOLID principles, and NestJS interceptors for aspect-oriented programming.\n\nI was responsible for the game domain and engine logic. The project earned a perfect score (20/20), and the professor used it as a reference example for future semesters.",
    },
    stack: ["Flutter", "NestJS", "Clean Architecture", "DDD", "SOLID"],
    links: [
      // TODO: repos directos (GitHub org DS-PROYECTO-ARROW-MAZE)
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
