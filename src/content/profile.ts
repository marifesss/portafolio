import type { Localized } from "@/lib/types";

export const profile = {
  headline: {
    es: "Sobre mí",
    en: "About me",
  } satisfies Localized,

  bio: {
    es: "Soy estudiante de Ingeniería Informática en la UCAB, apasionada por la arquitectura de software y el desarrollo fullstack. Me gusta pensar en cómo se construyen los sistemas antes de escribir una sola línea de código — Clean Architecture, DDD y buenos patrones de diseño no son solo teoría para mí, son la forma en la que me gusta trabajar.\n\nActualmente busco una pasantía en desarrollo de software (backend, frontend o fullstack, sin preferencia), idealmente part-time e híbrida o remota.",
    en: "I'm a Computer Engineering student at UCAB, passionate about software architecture and fullstack development. I like thinking through how systems are built before writing a single line of code — Clean Architecture, DDD, and solid design patterns aren't just theory to me, they're how I like to work.\n\nI'm currently looking for a software development internship (backend, frontend, or fullstack — no preference), ideally part-time and hybrid or remote.",
  } satisfies Localized,

  /** "Géneros" — interest/focus chips. */
  genres: [
    "Clean Architecture",
    "DDD",
    "Business Intelligence",
    "Fintech",
    "Fullstack Development",
  ],
} as const;
