import type { Metadata } from "next";
import { ContactSection } from "@/features/contact/ContactSection";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return <ContactSection />;
}
