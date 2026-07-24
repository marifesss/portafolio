import type { Certification } from "@/lib/types";

/**
 * Certifications, shown inside the expandable "Certificaciones" track of the
 * "Récords personales" playlist. Course names stay in their original language
 * (that's how the certificate reads); only the surrounding copy is localized.
 */
export const certifications: Certification[] = [
  {
    id: "efset",
    name: {
      es: "EF SET English Certificate — C2 Proficient",
      en: "EF SET English Certificate — C2 Proficient",
    },
    issuer: "EF SET",
    date: { es: "Vigente", en: "Current" },
    detail: {
      es: "Nivel C2 del Marco Común Europeo de Referencia",
      en: "CEFR level C2",
    },
    href: "https://cert.efset.org/UoqVQd",
    image: "/images/certificaciones/ef.webp",
  },
  {
    id: "sql-total",
    name: {
      es: "SQL TOTAL — Domina Bases de Datos de 0 a Avanzado",
      en: "SQL TOTAL — Databases from Zero to Advanced",
    },
    issuer: "Udemy",
    date: { es: "Septiembre 2025", en: "September 2025" },
    detail: { es: "7,5 horas", en: "7.5 hours" },
    href: "https://ude.my/UC-8a55193f-63f8-4eca-b33d-bb25bcd313b3",
    image: "/images/certificaciones/sqltotaludemy.png",
  },
  {
    id: "figma",
    name: {
      es: "Figma para no Diseñadores",
      en: "Figma para no Diseñadores (Figma for non-designers)",
    },
    issuer: "UCAB — Dirección General de Desarrollo Estudiantil",
    date: { es: "Diciembre 2025", en: "December 2025" },
    detail: { es: "3 horas académicas", en: "3 academic hours" },
    image: "/images/certificaciones/figma-no-disenadores.png",
  },
];
