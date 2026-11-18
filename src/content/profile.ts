import type { Localized } from "@/lib/types";

export const profile = {
  headline: {
    es: "Sobre mí",
    en: "About me",
  } satisfies Localized,

  bio: {
    es: "Soy estudiante de Ingeniería Informática en la UCAB, apasionada por la arquitectura de software y el desarrollo fullstack. Me gusta pensar en cómo se construyen los sistemas antes de escribir una sola línea de código. Clean Architecture, DDD y los buenos patrones de diseño no son solo teoría para mí: son la forma en la que me gusta trabajar.",
    en: "I'm a Computer Engineering student at UCAB, passionate about software architecture and fullstack development. I like thinking through how systems are built before writing a single line of code. Clean Architecture, DDD, and solid design patterns aren't just theory to me: they're how I like to work.",
  } satisfies Localized,

  /**
   * "Géneros" — the focus areas rendered as circular "top" items, Spotify's
   * top-artists treatment. `image` is the cover; `glyph` is a decorative
   * fallback; the name is the content.
   */
  genres: [
    {
      name: "Business Intelligence",
      glyph: "📊",
      image: "/images/covers/genero1.jpeg",
    },
    {
      name: "Fullstack Development",
      glyph: "🧑‍💻",
      image: "/images/covers/genero2.jpeg",
    },
    { name: "Fintech", glyph: "💳", image: "/images/covers/genero3.jpeg" },
    {
      name: "Product Management",
      glyph: "🧭",
      image: "/images/covers/discoPM.jpeg",
    },
  ],
} as const;
