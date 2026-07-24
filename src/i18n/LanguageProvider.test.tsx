import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import { LanguageProvider, useLanguage } from "./LanguageProvider";

const wrapper = ({ children }: { children: ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

const greeting = { es: "Hola", en: "Hi" };

describe("LanguageProvider", () => {
  it("starts on Spanish and resolves Localized values with pick", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.locale).toBe("es");
    expect(result.current.pick(greeting)).toBe("Hola");
    expect(result.current.t.gallery).toBe("Galería");
  });

  it("switches every consumer at once when the locale toggles", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => result.current.toggleLocale());

    expect(result.current.locale).toBe("en");
    expect(result.current.pick(greeting)).toBe("Hi");
    expect(result.current.t.gallery).toBe("Gallery");
  });

  it("persists the choice so a reload keeps the visitor's language", () => {
    const { result, unmount } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLocale("en"));
    unmount();

    const remounted = renderHook(() => useLanguage(), { wrapper });

    expect(remounted.result.current.locale).toBe("en");
  });

  it("ignores a stored value that is not a supported locale", () => {
    window.localStorage.setItem("portfolio-locale", "fr");

    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.locale).toBe("es");
  });

  it("fails loudly when used outside the provider", () => {
    expect(() => renderHook(() => useLanguage())).toThrow(
      /must be used within/i,
    );
  });
});
