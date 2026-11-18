import type { Project } from "@/lib/types";

/**
 * The "Proyectos" playlist. Each project is a track.
 * `slug` drives the /proyectos/[slug] detail route.
 */
export const projects: Project[] = [
  {
    slug: "alo-mama",
    title: "Aló Mamá",
    cover: "/images/AloMama/alo-mama-cd.png",
    role: {
      es: "Desarrolladora de la app Android y la voz de IA",
      en: "Android app & AI voice developer",
    },
    meta: {
      es: "Platanus Hack 26: Caracas · 1er lugar en Emergencias · 2do general",
      en: "Platanus Hack 26: Caracas · 1st in Emergencies · 2nd overall",
    },
    description: {
      es: "Aló Mamá es una app Android para pedir ayuda en secreto durante un secuestro o un robo. Presionas volumen arriba-abajo-arriba, aunque el teléfono esté bloqueado, y en menos de 15 segundos te llama \"Mamá\": un agente de voz con IA que te saluda por tu nombre. Un detector de coacción revisa la llamada y, si estás en peligro, tu familia recibe un WhatsApp con tu ubicación, el veredicto y la ficha del caso. Para quien te esté mirando, es solo una llamada normal con tu mamá.\n\nLo construimos en 36 horas en Platanus Hack 26: Caracas, en un equipo de cinco. Ganamos el 1er lugar del track de Emergencias y quedamos 2dos en la clasificación general entre 22 equipos. Me encargué del disparo desde el teléfono con la pantalla bloqueada, la configuración de la app, la voz de \"Mamá\" (guion y clonación) y el pitch.",
      en: "Aló Mamá is an Android app for asking for help in secret during a kidnapping or a robbery. You press volume up-down-up, even with the phone locked, and within 15 seconds \"Mom\" calls you: an AI voice agent that greets you by name. A duress detector reviews the call and, if you're in danger, your family gets a WhatsApp message with your location, the verdict, and the case file. To anyone watching, it's just a normal call with your mom.\n\nWe built it in 36 hours at Platanus Hack 26: Caracas, as a team of five. We won 1st place in the Emergencies track and finished 2nd overall out of 22 teams. I owned the phone trigger with the screen locked, the app setup, Mom's voice (script and cloning), and the pitch.",
    },
    stackGroups: [
      {
        label: { es: "App", en: "App" },
        items: ["Kotlin", "Jetpack Compose", "Material 3"],
      },
      {
        label: { es: "Servidor", en: "Server" },
        items: ["Go", "PostgreSQL", "Render"],
      },
      {
        label: { es: "Voz y llamadas", en: "Voice & calls" },
        items: ["ElevenLabs Agents", "Twilio"],
      },
      {
        label: { es: "IA y mensajería", en: "AI & messaging" },
        items: ["Claude (Anthropic)", "Kapso (WhatsApp)"],
      },
    ],
    links: [
      {
        label: { es: "Sitio web", en: "Website" },
        href: "https://alo-mama.fyi/",
      },
      {
        label: { es: "Repositorio", en: "Repository" },
        href: "https://github.com/platanus-hack/platanus-hack-26-ve-team-27",
      },
      {
        label: { es: "Página de votación", en: "Voting page" },
        href: "https://hack.platan.us/26-ve/vote/mam",
      },
      {
        label: { es: "Descargar APK", en: "Download APK" },
        href: "https://github.com/platanus-hack/platanus-hack-26-ve-team-27/releases/latest/download/app-release.apk",
      },
    ],
    making: {
      narrative: {
        es: "Aló Mamá son dos piezas que hablan por un contrato compartido: una app Android nativa y un servidor en Go.\n\nLa app está hecha en Kotlin con Jetpack Compose y Material 3. El disparo es un patrón de volumen (arriba-abajo-arriba) que funciona incluso con el teléfono bloqueado gracias a un servicio de accesibilidad; al detectarlo, la app envía la ubicación GPS al servidor. Durante la configuración guarda a \"Mamá\" en los contactos, junto con la frase de alerta y la de todo bien.\n\nEl servidor está escrito en Go usando solo net/http, sobre Postgres y desplegado en Render. Está dividido en módulos con una responsabilidad cada uno: recibir la alerta y decidir el camino, el motor de llamadas, el detector de coacción, el veredicto, el aviso por WhatsApp y la ficha del caso con su central web.\n\nLa llamada la hace un agente de voz de ElevenLabs sobre Twilio, con una voz clonada. Al colgar, un webhook devuelve la conversación y el detector la evalúa con reglas y, cuando está configurado, con Claude: la frase de alerta o el silencio son peligro, la frase de todo bien no avisa a nadie y cualquier otra cosa avisa igual. Para medirlo, armamos un set de 70 diálogos etiquetados.\n\nLa familia recibe el aviso por WhatsApp a través de Kapso, y una central web muestra cada alerta en vivo, con su recorrido en el mapa y la ficha completa al terminar la llamada.",
        en: "Aló Mamá is two pieces that talk through a shared contract: a native Android app and a Go server.\n\nThe app is built in Kotlin with Jetpack Compose and Material 3. The trigger is a volume pattern (up-down-up) that works even with the phone locked thanks to an accessibility service; once it fires, the app sends the GPS location to the server. During setup it saves \"Mom\" to the contacts, along with the alert phrase and the all-good phrase.\n\nThe server is written in Go using only net/http, on top of Postgres and deployed on Render. It's split into modules with one responsibility each: receiving the alert and choosing the path, the call engine, the duress detector, the verdict, the WhatsApp notice, and the case file with its web dashboard.\n\nThe call is placed by an ElevenLabs voice agent over Twilio, with a cloned voice. When it ends, a webhook returns the conversation and the detector evaluates it with rules and, when configured, with Claude: the alert phrase or silence means danger, the all-good phrase alerts no one, and anything else alerts anyway. To measure it, we built a set of 70 labeled dialogues.\n\nThe family gets the alert on WhatsApp through Kapso, and a web dashboard shows every alert live, with its route on the map and the full case file once the call ends.",
      },
    },
    media: [
      {
        type: "video",
        src: "/images/AloMama/demo.mp4",
        poster: "/images/AloMama/posters/demo.webp",
        platform: "web",
        caption: {
          es: "Demo: de la alerta en la central al WhatsApp de la familia",
          en: "Demo: from the dashboard alert to the family's WhatsApp",
        },
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
      es: "🔔 Próximo lanzamiento · Pre-guarda este álbum",
      en: "🔔 Coming soon · Pre-save this album",
    },
    // Non-spoiler on purpose: the coming-soon view uses the generic teaser, and
    // no product concept ships to the client (this string is bundled/serialized).
    // TODO: swap in the real description with the product concept at launch.
    description: {
      es: "Un nuevo proyecto en desarrollo. Los detalles se revelan en el lanzamiento. Dale a la campana 🔔 para enterarte cuando lance.",
      en: "A new project in the works. The details drop at launch. Hit the bell 🔔 to know when it releases.",
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
    slug: "arrowmaze",
    title: "ArrowMaze",
    cover: "/images/arrowmaze/portadaAlbum.jpeg",
    role: {
      es: "Desarrolladora del juego completo (backend y frontend)",
      en: "Full game developer (backend & frontend)",
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
        es: "ArrowMaze son dos proyectos independientes con la misma filosofía de arquitectura: un backend de API REST en NestJS 11 sobre Node 20 y TypeScript, y el juego en Flutter.\n\nEl backend está organizado en una Clean Architecture de 4 capas (dominio, aplicación, infraestructura y presentación), donde las dependencias siempre apuntan hacia el dominio. El núcleo del juego (reglas, estados de tablero y validación de movimientos) no conoce nada de NestJS, la base de datos ni el transporte HTTP: es lógica pura y testeable de forma aislada.\n\nSobre esa base aplicamos Domain-Driven Design completo: entidades, objetos de valor, agregados, eventos de dominio y repositorios definidos como puertos del dominio, implementados en infraestructura con Prisma sobre PostgreSQL (Supabase). El modelo del juego habla el lenguaje del dominio, no el de la base de datos. La autenticación va con JWT y bcrypt, la validación de entrada con class-validator, y la API se documenta sola con Swagger.\n\nComo era un proyecto de Diseño de Software, el objetivo explícito era demostrar los patrones: implementamos patrones de diseño GoF (Factory, Strategy, Observer, State, Command, entre otros), respetando los principios SOLID en cada capa y usando interceptores de NestJS para programación orientada a aspectos (logging, manejo de errores y transformación de respuestas transversales).\n\nEl frontend en Flutter sigue la misma idea, con un dominio escrito en Dart puro, sin una sola importación de Flutter, y el estado manejado con MVVM sobre ChangeNotifier nativo e inyección de dependencias manual: sin Provider, Riverpod ni Bloc, y con solo cuatro dependencias de producción. Los tableros viven como assets JSON generados por scripts propios.\n\nLa calidad se sostiene con pruebas en ambos lados: specs unitarias y suites end-to-end con Supertest en el backend, y casi un centenar de archivos de test con mocktail y fake_async en el juego. Los dos se despliegan con Docker multi-stage: el backend como imagen de Node, y el juego compilado a Flutter Web y servido por nginx.\n\nFui responsable del juego en general, de punta a punta. El proyecto obtuvo 20/20 y fue tomado como ejemplo de referencia para futuros semestres.",
        en: "ArrowMaze is two independent projects sharing one architectural philosophy: a REST API backend in NestJS 11 on Node 20 and TypeScript, and the game itself in Flutter.\n\nThe backend is organized as a 4-layer Clean Architecture (domain, application, infrastructure, and presentation), where dependencies always point inward toward the domain. The game core (rules, board states, move validation) knows nothing about NestJS, the database, or HTTP transport: it's pure logic, testable in isolation.\n\nOn top of that we applied full Domain-Driven Design: entities, value objects, aggregates, domain events, and repositories defined as domain ports, implemented in infrastructure with Prisma over PostgreSQL (Supabase). The game model speaks the domain's language, not the database's. Auth runs on JWT and bcrypt, input validation on class-validator, and the API documents itself through Swagger.\n\nBecause this was a Software Design course project, the explicit goal was to demonstrate the patterns: we implemented GoF design patterns (Factory, Strategy, Observer, State, Command, and more), honoring SOLID principles at every layer and using NestJS interceptors for aspect-oriented programming (cross-cutting logging, error handling, and response transformation).\n\nThe Flutter frontend follows the same idea, with a domain written in pure Dart, not a single Flutter import, and state handled through MVVM over native ChangeNotifier with manual dependency injection: no Provider, no Riverpod, no Bloc, and only four production dependencies. The boards live as JSON assets generated by our own scripts.\n\nQuality is held up by tests on both sides: unit specs and end-to-end suites with Supertest on the backend, and close to a hundred test files using mocktail and fake_async in the game. Both ship through multi-stage Docker builds: the backend as a Node image, and the game compiled to Flutter Web and served by nginx.\n\nI was responsible for the game as a whole, end to end. The project earned a perfect score (20/20) and was taken as a reference example for future semesters.",
      },
      diagramsUrl:
        "https://lucid.app/lucidchart/b5803118-add6-4eb7-b210-35363ea1af77/edit?viewport_loc=-3501%2C5%2C11325%2C5215%2CxYtaH.4U3PQ_&invitationId=inv_0e6631c7-9cc9-4065-a7d9-fbf0264430bf",
    },
    media: [
      {
        type: "video",
        src: "/images/arrowmaze/videocompleto-parte1.webm",
        poster: "/images/arrowmaze/posters/videocompleto-parte1.webp",
        caption: { es: "Gameplay, parte 1", en: "Gameplay, part 1" },
      },
      {
        type: "video",
        src: "/images/arrowmaze/videocompleto-parte2.webm",
        poster: "/images/arrowmaze/posters/videocompleto-parte2.webp",
        caption: { es: "Gameplay, parte 2", en: "Gameplay, part 2" },
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
