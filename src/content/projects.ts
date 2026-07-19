import type { Project } from "@/lib/types";

/**
 * The "Proyectos" playlist. Each project is a track.
 * `slug` drives the /proyectos/[slug] detail route.
 */
export const projects: Project[] = [
  {
    slug: "yelou",
    title: "Yelou",
    cover: "/images/yelou/portada.jpeg",
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
    media: [
      // Web build (landscape captures).
      {
        type: "video",
        src: "/images/yelou/videoinicialweb.mp4",
        platform: "web",
        caption: { es: "Página de inicio", en: "Landing page" },
      },
      {
        type: "video",
        src: "/images/yelou/categoriasdeservicio.mp4",
        platform: "web",
        caption: { es: "Categorías de servicio", en: "Service categories" },
      },
      {
        type: "video",
        src: "/images/yelou/videotrabajadorcotizacion.mp4",
        platform: "web",
        caption: {
          es: "Cotización con un trabajador",
          en: "Requesting a worker's quote",
        },
      },
      // Mobile build (portrait captures).
      {
        type: "video",
        src: "/images/yelou/iniciotelefono.mp4",
        platform: "mobile",
        caption: { es: "Inicio", en: "Home" },
      },
      {
        type: "video",
        src: "/images/yelou/mapatelefono.mp4",
        platform: "mobile",
        caption: { es: "Mapa de servicios", en: "Services map" },
      },
    ],
  },
  {
    // Pre-launch: the detail view renders the spoiler-free coming-soon layout
    // (teaser + stack + notify bell), so `description` below is NOT shown yet.
    // TODO: reveal the real product concept / description + cover at launch.
    slug: "partela",
    title: "Partela",
    comingSoon: true,
    cover: "/images/partela/portadaAlbum.jpeg",
    role: {
      es: "Co-founder & Frontend Developer",
      en: "Co-founder & Frontend Developer",
    },
    meta: {
      es: "🔔 Próximo lanzamiento — Pre-guarda este álbum",
      en: "🔔 Coming soon — Pre-save this album",
    },
    // Non-spoiler on purpose: the coming-soon view uses the generic teaser, and
    // no product concept ships to the client (this string is bundled/serialized).
    // TODO: swap in the real description with the product concept at launch.
    description: {
      es: "Un nuevo proyecto en desarrollo. Los detalles se revelan en el lanzamiento — dale a la campana 🔔 para enterarte cuando lance.",
      en: "A new project in the works. The details drop at launch — hit the bell 🔔 to know when it releases.",
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
    cover: "/images/arrowmaze/portadaAlbum.jpeg",
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
    making: {
      narrative: {
        es: "El backend está organizado en una Clean Architecture de 4 capas —dominio, aplicación, infraestructura y presentación— donde las dependencias siempre apuntan hacia el dominio. El núcleo del juego (reglas, estados de tablero y validación de movimientos) no conoce nada de NestJS, la base de datos ni el transporte HTTP: es lógica pura y testeable de forma aislada.\n\nSobre esa base aplicamos Domain-Driven Design completo: entidades, objetos de valor, agregados y repositorios como interfaces del dominio, implementadas en la capa de infraestructura. El modelo del juego habla el lenguaje del dominio, no el de la base de datos.\n\nComo era un proyecto de Diseño de Software, el objetivo explícito era demostrar los patrones: implementamos los 12 patrones de diseño GoF (Factory, Strategy, Observer, State, Command, entre otros), respetando los principios SOLID en cada capa y usando interceptores de NestJS para programación orientada a aspectos (logging, manejo de errores y transformación de respuestas transversales).\n\nFui responsable del dominio del juego y el motor de lógica: el modelado de las flechas, la resolución de movimientos deslizantes y las condiciones de victoria/derrota. El proyecto obtuvo 20/20 y el profesor lo tomó como ejemplo de referencia para futuros semestres.",
        en: "The backend is organized as a 4-layer Clean Architecture —domain, application, infrastructure, and presentation— where dependencies always point inward toward the domain. The game core (rules, board states, move validation) knows nothing about NestJS, the database, or HTTP transport: it's pure logic, testable in isolation.\n\nOn top of that we applied full Domain-Driven Design: entities, value objects, aggregates, and repositories as domain interfaces, implemented in the infrastructure layer. The game model speaks the domain's language, not the database's.\n\nBecause this was a Software Design course project, the explicit goal was to demonstrate the patterns: we implemented all 12 GoF design patterns (Factory, Strategy, Observer, State, Command, and more), honoring SOLID principles at every layer and using NestJS interceptors for aspect-oriented programming (cross-cutting logging, error handling, and response transformation).\n\nI was responsible for the game domain and engine: modeling the arrows, resolving sliding moves, and computing win/lose conditions. The project earned a perfect score (20/20), and the professor used it as a reference example for future semesters.",
      },
      diagrams: [
        {
          // TODO: diagrama real de las 4 capas de Clean Architecture
          caption: {
            es: "Clean Architecture — las 4 capas y sus dependencias",
            en: "Clean Architecture — the 4 layers and their dependencies",
          },
        },
        {
          // TODO: diagrama del modelo de dominio (DDD)
          caption: {
            es: "Modelo de dominio — entidades, agregados y repositorios",
            en: "Domain model — entities, aggregates, and repositories",
          },
        },
      ],
    },
    media: [
      {
        type: "video",
        src: "/images/arrowmaze/video3d.mp4",
        poster: "/images/arrowmaze/tablero3d.png",
        caption: { es: "Gameplay en 3D", en: "3D gameplay" },
      },
      {
        type: "image",
        src: "/images/arrowmaze/splashscreen.png",
        caption: { es: "Pantalla de bienvenida", en: "Splash screen" },
      },
      {
        type: "image",
        src: "/images/arrowmaze/login.png",
        caption: { es: "Inicio de sesión", en: "Login" },
      },
      {
        type: "image",
        src: "/images/arrowmaze/tablero1.png",
        caption: { es: "Tablero de juego", en: "Game board" },
      },
      {
        type: "image",
        src: "/images/arrowmaze/tablero3d.png",
        caption: { es: "Vista 3D del tablero", en: "3D board view" },
      },
      {
        type: "image",
        src: "/images/arrowmaze/exito.png",
        caption: { es: "Nivel superado", en: "Level cleared" },
      },
      {
        type: "image",
        src: "/images/arrowmaze/Failed.png",
        caption: { es: "Nivel fallido", en: "Level failed" },
      },
      {
        type: "image",
        src: "/images/arrowmaze/leaderboard.png",
        caption: { es: "Tabla de clasificación", en: "Leaderboard" },
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
