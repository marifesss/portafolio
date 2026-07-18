"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, type Locale, type Localized } from "@/lib/types";
import { dictionary, type UIDictionary } from "./dictionary";

const STORAGE_KEY = "portfolio-locale";

/* localStorage-backed locale store. Reading it through `useSyncExternalStore`
 * keeps SSR/hydration stable (server + first client render use the default,
 * then the client swaps to the saved value) without a post-mount `setState`,
 * and syncs the choice across tabs for free via the `storage` event. */
const localeListeners = new Set<() => void>();

const isLocale = (value: string | null): value is Locale =>
  value === "es" || value === "en";

function getStoredLocale(): Locale {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(saved) ? saved : DEFAULT_LOCALE;
}

function setStoredLocale(locale: Locale) {
  window.localStorage.setItem(STORAGE_KEY, locale);
  // The native `storage` event only fires in other tabs, so notify this one.
  localeListeners.forEach((listener) => listener());
}

function subscribeLocale(onChange: () => void) {
  localeListeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    localeListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** UI label dictionary for the active locale. */
  t: UIDictionary;
  /** Resolve a `Localized<T>` value to the active locale. */
  pick: <T>(value: Localized<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR + first client render use DEFAULT_LOCALE (no hydration mismatch), then
  // the client swaps to the persisted value — with no post-mount setState.
  const locale = useSyncExternalStore(
    subscribeLocale,
    getStoredLocale,
    () => DEFAULT_LOCALE,
  );

  // Keep <html lang> in sync — a DOM side-effect, not React state.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: setStoredLocale,
      toggleLocale: () => setStoredLocale(locale === "es" ? "en" : "es"),
      t: dictionary[locale],
      pick: (localized) => localized[locale],
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a <LanguageProvider>");
  }
  return ctx;
}
