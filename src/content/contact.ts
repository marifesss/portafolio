import type { ContactChannel, Localized } from "@/lib/types";

export const contactHeading: Localized = {
  es: "¿Conectamos?",
  en: "Let's connect",
};

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "marianafes15@gmail.com",
    href: "mailto:marianafes15@gmail.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fesmariana",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/marifesss",
  },
];
