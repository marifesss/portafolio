import type { Metadata } from "next";
import { ProfileSection } from "@/features/profile/ProfileSection";

export const metadata: Metadata = { title: "Perfil" };

export default function PerfilPage() {
  return <ProfileSection />;
}
