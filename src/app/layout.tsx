import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    // Home uses the default; other routes fill "%s" with their section name.
    default: `${site.name} — Portafolio`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline.es,
  applicationName: `${site.name} — Portafolio`,
  authors: [{ name: site.name }],
};

export const viewport: Viewport = {
  // Tints the mobile browser chrome to match the app's dark base.
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          {/* `reducedMotion="user"` makes every descendant motion component
              honor the OS setting (disables transform/layout animations); our
              variants additionally collapse opacity to instant. */}
          <MotionConfig reducedMotion="user">
            <AppShell>{children}</AppShell>
          </MotionConfig>
        </LanguageProvider>
      </body>
    </html>
  );
}
