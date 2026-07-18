import type { Metadata } from "next";
import { RecordsSection } from "@/features/records/RecordsSection";

export const metadata: Metadata = { title: "Récords personales" };

export default function RecordsPage() {
  return <RecordsSection />;
}
