import type { NavItem } from "@/lib/types";

/**
 * Sidebar navigation. Order here is the order shown in the Spotify-style
 * sidebar. Each `href` maps to a route segment under `src/app`. `cover` is the
 * album-style thumbnail shown in the sidebar (the shared art in
 * `public/images/covers`, shuffled across sections).
 */
export const navigation: NavItem[] = [
  {
    id: "home",
    href: "/",
    icon: "🏠 ",
    label: { es: "Inicio", en: "Home" },
    cover: "/images/covers/cover3.jpeg",
  },
  {
    id: "profile",
    href: "/perfil",
    icon: "👤",
    label: { es: "Perfil", en: "About" },
    cover: "/images/covers/cover2.jpeg",
  },
  {
    id: "projects",
    href: "/proyectos",
    icon: "🎵",
    label: { es: "Proyectos", en: "Projects" },
    cover: "/images/covers/cover6.jpeg",
  },
  {
    id: "experience",
    href: "/experiencia",
    icon: "💿",
    label: { es: "Discográfica", en: "Experience" },
    cover: "/images/covers/cover5.jpeg",
  },
  {
    id: "skills",
    href: "/skills",
    icon: "🎧",
    label: { es: "Skills", en: "Skills" },
    cover: "/images/covers/cover1.jpeg",
  },
  {
    id: "records",
    href: "/records",
    icon: "🏆",
    label: { es: "Récords personales", en: "Personal records" },
    cover: "/images/covers/cover4.jpeg",
  },
  {
    id: "contact",
    href: "/contacto",
    icon: "📮",
    label: { es: "Contacto", en: "Contact" },
    cover: "/images/covers/cover7.jpeg",
  },
];
