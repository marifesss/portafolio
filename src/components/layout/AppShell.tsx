import type { ReactNode } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { MobileTabBar } from "./MobileTabBar";
import { PlayerBar } from "./PlayerBar";
import { Sidebar } from "./Sidebar";

/**
 * The persistent Spotify chrome: three zones floating on a pure-black frame
 * (DESIGN.md §1) — the "Your Library" sidebar (left), a scrollable content
 * panel that swaps per route (center), and a full-width "now playing" bar
 * pinned to the bottom. Only `children` (the current route's page) changes on
 * navigation; the panels and the ~8px black gutters between them stay put.
 *
 * Below `md` the sidebar is hidden and navigation moves to a bottom
 * `MobileTabBar`; the layout stacks main → player → tab bar (each an `auto`
 * grid row, the tab bar collapsing to zero on desktop).
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-dvh grid-rows-[1fr_auto_auto] bg-black text-white">
      {/* Sidebar + main float on the black frame with ~8px gutters. The sidebar
          grows toward Spotify's ~340px on wide screens; main takes the rest. */}
      <div className="grid min-h-0 grid-cols-1 gap-2 p-2 md:grid-cols-[18rem_1fr] lg:grid-cols-[21rem_1fr]">
        <aside className="hidden min-h-0 overflow-hidden rounded-lg bg-base md:block">
          <Sidebar />
        </aside>

        <main className="surface-panel min-h-0 overflow-y-auto rounded-lg">
          {/* Sticky top-right toggle: stays pinned while the panel scrolls, but
              takes no layout space (the negative margin cancels its height) so
              it overlays each section's own top padding instead of overlapping
              the content below. */}
          <div className="pointer-events-none sticky top-0 z-20 -mb-14 flex h-14 justify-end px-4 pt-4 sm:px-6">
            <LanguageToggle className="pointer-events-auto" />
          </div>
          {children}
        </main>
      </div>

      <PlayerBar />
      <MobileTabBar />
    </div>
  );
}
