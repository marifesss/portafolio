import type { NavItem } from "@/lib/types";

/**
 * Sidebar navigation. Order here is the order shown in the Spotify-style
 * sidebar. Each `href` maps to a route segment under `src/app`.
 */
export const navigation: NavItem[] = [
  {
    id: "home",
    href: "/",
    icon: "🏠",
    label: { es: "Inicio", en: "Home" },
  },
  {
    id: "search",
    href: "/buscar",
    icon: "🔍",
    label: { es: "Buscar", en: "Search" },
  },
  {
    id: "profile",
    href: "/perfil",
    icon: "👤",
    label: { es: "Perfil", en: "About" },
  },
  {
    id: "projects",
    href: "/proyectos",
    icon: "🎵",
    label: { es: "Proyectos", en: "Projects" },
  },
  {
    id: "experience",
    href: "/experiencia",
    icon: "💿",
    label: { es: "Discográfica", en: "Experience" },
  },
  {
    id: "skills",
    href: "/skills",
    icon: "🎧",
    label: { es: "Skills", en: "Skills" },
  },
  {
    id: "records",
    href: "/records",
    icon: "🏆",
    label: { es: "Récords personales", en: "Personal records" },
  },
  {
    id: "contact",
    href: "/contacto",
    icon: "📮",
    label: { es: "Contacto", en: "Contact" },
  },
];
