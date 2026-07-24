import type { PersonalRecord } from "@/lib/types";

/** "Récords personales" — the "B-sides / Fuera del código" playlist. */
export const records: PersonalRecord[] = [
  {
    icon: "🎓",
    title: { es: "Educación", en: "Education" },
    image: "/images/todo/educacion.jpeg",
    description: {
      es: "Estudiante de Ingeniería Informática, UCAB",
      en: "Computer Engineering student, UCAB",
    },
  },
  {
    icon: "🌍",
    title: { es: "Idiomas", en: "Languages" },
    image: "/images/todo/idiomas.jpeg",
    description: {
      es: "Español (lengua materna) · Inglés C2 (certificación EF SET) · Nacionalidad venezolana y española",
      en: "Spanish (native) · English C2 (EF SET certified) · Venezuelan and Spanish nationality",
    },
  },
  {
    icon: "🏆",
    title: { es: "Logros académicos", en: "Academic achievements" },
    image: "/images/todo/logrosacademicos.jpeg",
    description: {
      es: "Medallas de oro en el colegio por excelencia académica",
      en: "Gold medals in school for academic excellence",
    },
  },
  {
    icon: "🎻",
    title: { es: "Música", en: "Music" },
    image: "/images/todo/musica.jpeg",
    description: {
      es: "Violinista graduada del Conservatorio del Colegio Emil Friedman · Ex-concertino de los Arcos Juveniles de Caracas · También canto y toco piano y guitarra",
      en: "Violinist, graduate of Colegio Emil Friedman Conservatory · Former concertmaster of Arcos Juveniles de Caracas · I also sing and play piano and guitar",
    },
  },
  {
    icon: "🎾",
    title: { es: "Deporte", en: "Sports" },
    image: "/images/todo/deporte.jpeg",
    description: {
      es: "Competidora en CTA (Competencia de Tenis entre Clubes de Caracas)",
      en: "Competitor in CTA (Caracas Inter-Club Tennis Competition)",
    },
  },
  {
    icon: "💻",
    title: { es: "Voluntariado", en: "Volunteering" },
    image: "/images/todo/voluntariado.jpeg",
    description: {
      es: "Voluntaria en Progracademy, dando clases de programación básica a niños de bajos recursos fuera de Venezuela (modalidad online)",
      en: "Volunteer at Progracademy, teaching basic programming to underprivileged children outside Venezuela (online)",
    },
  },
  // The "Certificaciones" track is rendered separately by RecordsSection: it's
  // expandable, and its content lives in `src/content/certifications.ts`.
];
