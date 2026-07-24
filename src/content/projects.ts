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
    stackGroups: [
      {
        label: { es: "Web", en: "Web" },
        items: ["Next.js 15", "React 19", "Tailwind CSS v4"],
      },
      {
        label: { es: "Móvil", en: "Mobile" },
        items: ["React Native", "Expo"],
      },
      {
        label: { es: "Base de datos", en: "Database" },
        items: ["PostgreSQL (Supabase)", "Drizzle ORM"],
      },
      {
        label: { es: "IA y búsqueda", en: "AI & search" },
        items: ["Google Gemini", "Algolia"],
      },
    ],
    // TODO: Figma, demo/deploy
    links: [],
    privateCode: true,
    // Clips are only fetched once their gallery chapter is scrolled into view;
    // until then the mockup shows the poster, which is each clip's own first
    // frame, so playback starts without a visible jump.
    media: [
      // Web build (landscape captures).
      {
        type: "video",
        src: "/images/yelou/videoinicialweb.mp4",
        poster: "/images/yelou/posters/videoinicialweb.webp",
        platform: "web",
        caption: { es: "Página de inicio", en: "Landing page" },
      },
      {
        type: "video",
        src: "/images/yelou/categoriasdeservicio.mp4",
        poster: "/images/yelou/posters/categoriasdeservicio.webp",
        platform: "web",
        caption: { es: "Categorías de servicio", en: "Service categories" },
      },
      {
        type: "video",
        src: "/images/yelou/videotrabajadorcotizacion.mp4",
        poster: "/images/yelou/posters/videotrabajadorcotizacion.webp",
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
        poster: "/images/yelou/posters/iniciotelefono.webp",
        platform: "mobile",
        caption: { es: "Inicio", en: "Home" },
      },
      {
        type: "video",
        src: "/images/yelou/mapatelefono.mp4",
        poster: "/images/yelou/posters/mapatelefono.webp",
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
      es: "Líder de desarrollo web frontend",
      en: "Web Frontend Development Lead",
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
      es: "Desarrolladora — Juego completo (backend y frontend)",
      en: "Developer — Full game (backend & frontend)",
    },
    meta: {
      es: "Proyecto universitario · 20/20",
      en: "University project · Perfect score",
    },
    description: {
      es: "ArrowMaze es un juego de puzzle deslizante desarrollado en un equipo de tres personas, con Flutter en el frontend y NestJS en el backend, con un enfoque especial en la calidad de la arquitectura de software. El backend está construido con Clean Architecture de 4 capas, aplicando Domain-Driven Design completo, patrones de diseño GoF, principios SOLID e interceptores de NestJS para programación orientada a aspectos.\n\nFui responsable del juego en general, de punta a punta: el dominio y el motor de lógica, el backend y el frontend. El proyecto obtuvo una calificación de 20/20 y fue tomado como ejemplo de referencia para futuros semestres.",
      en: "ArrowMaze is a sliding-puzzle game built by a team of three, with Flutter on the frontend and NestJS on the backend, with a strong focus on software architecture quality. The backend follows a 4-layer Clean Architecture, applying full Domain-Driven Design, GoF design patterns, SOLID principles, and NestJS interceptors for aspect-oriented programming.\n\nI was responsible for the game as a whole, end to end: the domain and engine logic, the backend, and the frontend. The project earned a perfect score (20/20) and was taken as a reference example for future semesters.",
    },
    stackGroups: [
      {
        label: { es: "Backend", en: "Backend" },
        items: ["NestJS", "TypeScript"],
      },
      {
        label: { es: "Base de datos", en: "Database" },
        items: ["PostgreSQL", "Prisma"],
      },
      {
        label: { es: "Juego", en: "Game" },
        items: ["Flutter", "Dart"],
      },
      {
        label: { es: "Arquitectura", en: "Architecture" },
        // Acronym-only so the chip reads the same in both languages.
        items: ["Clean Architecture", "DDD", "SOLID", "GoF"],
      },
      {
        label: { es: "Testing", en: "Testing" },
        items: ["Jest", "flutter_test"],
      },
    ],
    // Two independent repos under the DS-PROYECTO-ARROW-MAZE org, one per
    // side of the system — the split is part of what the project shows.
    links: [
      {
        label: { es: "Backend (NestJS)", en: "Backend (NestJS)" },
        href: "https://github.com/DS-PROYECTO-ARROW-MAZE/arrowmaze-backend",
      },
      {
        label: { es: "Juego (Flutter)", en: "Game (Flutter)" },
        href: "https://github.com/DS-PROYECTO-ARROW-MAZE/arrowmaze-frontend",
      },
    ],
    making: {
      narrative: {
        es: "ArrowMaze son dos proyectos independientes con la misma filosofía de arquitectura: un backend de API REST en NestJS 11 sobre Node 20 y TypeScript, y el juego en Flutter.\n\nEl backend está organizado en una Clean Architecture de 4 capas —dominio, aplicación, infraestructura y presentación— donde las dependencias siempre apuntan hacia el dominio. El núcleo del juego (reglas, estados de tablero y validación de movimientos) no conoce nada de NestJS, la base de datos ni el transporte HTTP: es lógica pura y testeable de forma aislada.\n\nSobre esa base aplicamos Domain-Driven Design completo: entidades, objetos de valor, agregados, eventos de dominio y repositorios definidos como puertos del dominio, implementados en infraestructura con Prisma sobre PostgreSQL (Supabase). El modelo del juego habla el lenguaje del dominio, no el de la base de datos. La autenticación va con JWT y bcrypt, la validación de entrada con class-validator, y la API se documenta sola con Swagger.\n\nComo era un proyecto de Diseño de Software, el objetivo explícito era demostrar los patrones: implementamos patrones de diseño GoF (Factory, Strategy, Observer, State, Command, entre otros), respetando los principios SOLID en cada capa y usando interceptores de NestJS para programación orientada a aspectos (logging, manejo de errores y transformación de respuestas transversales).\n\nEl frontend en Flutter sigue la misma idea, con un dominio escrito en Dart puro —sin una sola importación de Flutter— y el estado manejado con MVVM sobre ChangeNotifier nativo e inyección de dependencias manual: sin Provider, Riverpod ni Bloc, y con solo cuatro dependencias de producción. Los tableros viven como assets JSON generados por scripts propios.\n\nLa calidad se sostiene con pruebas en ambos lados: specs unitarias y suites end-to-end con Supertest en el backend, y casi un centenar de archivos de test con mocktail y fake_async en el juego. Los dos se despliegan con Docker multi-stage — el backend como imagen de Node, y el juego compilado a Flutter Web y servido por nginx.\n\nFui responsable del juego en general, de punta a punta. El proyecto obtuvo 20/20 y fue tomado como ejemplo de referencia para futuros semestres.",
        en: "ArrowMaze is two independent projects sharing one architectural philosophy: a REST API backend in NestJS 11 on Node 20 and TypeScript, and the game itself in Flutter.\n\nThe backend is organized as a 4-layer Clean Architecture —domain, application, infrastructure, and presentation— where dependencies always point inward toward the domain. The game core (rules, board states, move validation) knows nothing about NestJS, the database, or HTTP transport: it's pure logic, testable in isolation.\n\nOn top of that we applied full Domain-Driven Design: entities, value objects, aggregates, domain events, and repositories defined as domain ports, implemented in infrastructure with Prisma over PostgreSQL (Supabase). The game model speaks the domain's language, not the database's. Auth runs on JWT and bcrypt, input validation on class-validator, and the API documents itself through Swagger.\n\nBecause this was a Software Design course project, the explicit goal was to demonstrate the patterns: we implemented GoF design patterns (Factory, Strategy, Observer, State, Command, and more), honoring SOLID principles at every layer and using NestJS interceptors for aspect-oriented programming (cross-cutting logging, error handling, and response transformation).\n\nThe Flutter frontend follows the same idea, with a domain written in pure Dart —not a single Flutter import— and state handled through MVVM over native ChangeNotifier with manual dependency injection: no Provider, no Riverpod, no Bloc, and only four production dependencies. The boards live as JSON assets generated by our own scripts.\n\nQuality is held up by tests on both sides: unit specs and end-to-end suites with Supertest on the backend, and close to a hundred test files using mocktail and fake_async in the game. Both ship through multi-stage Docker builds — the backend as a Node image, and the game compiled to Flutter Web and served by nginx.\n\nI was responsible for the game as a whole, end to end. The project earned a perfect score (20/20) and was taken as a reference example for future semesters.",
      },
      diagramsUrl:
        "https://lucid.app/lucidchart/b5803118-add6-4eb7-b210-35363ea1af77/edit?viewport_loc=-3501%2C5%2C11325%2C5215%2CxYtaH.4U3PQ_&invitationId=inv_0e6631c7-9cc9-4065-a7d9-fbf0264430bf",
    },
    media: [
      {
        type: "video",
        src: "/images/arrowmaze/videocompleto-parte1.webm",
        poster: "/images/arrowmaze/posters/videocompleto-parte1.webp",
        caption: { es: "Gameplay — parte 1", en: "Gameplay — part 1" },
      },
      {
        type: "video",
        src: "/images/arrowmaze/videocompleto-parte2.webm",
        poster: "/images/arrowmaze/posters/videocompleto-parte2.webp",
        caption: { es: "Gameplay — parte 2", en: "Gameplay — part 2" },
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
