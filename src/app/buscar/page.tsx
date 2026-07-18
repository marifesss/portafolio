import type { Metadata } from "next";
import { SearchSection } from "@/features/search/SearchSection";

export const metadata: Metadata = { title: "Buscar" };

export default function BuscarPage() {
  return <SearchSection />;
}
