import type { ReactNode } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { PlayerBar } from "./PlayerBar";
import { Sidebar } from "./Sidebar";

/**
 * The persistent Spotify chrome: sidebar (left) + scrollable main panel that
 * swaps per route + a fixed "now playing" bar at the bottom. Only `children`
 * (the current route's page) changes on navigation.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-dvh grid-rows-[1fr_auto] bg-black text-white">
      <div className="grid min-h-0 grid-cols-1 gap-2 p-2 md:grid-cols-[16rem_1fr]">
        <aside className="hidden overflow-y-auto rounded-lg md:block">
          <Sidebar />
        </aside>

        <main className="relative min-h-0 overflow-y-auto rounded-lg bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="absolute right-4 top-4 z-10">
            <LanguageToggle />
          </div>
          {children}
        </main>
      </div>

      <PlayerBar />
    </div>
  );
}
