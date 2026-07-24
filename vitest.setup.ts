import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

/**
 * Test environment shims.
 *
 * jsdom ships no observer APIs, and the shell leans on both: the gallery
 * watches its chapters with an `IntersectionObserver` to decide when to fetch
 * a clip, and measures the scroll panel with a `ResizeObserver`. Tests that
 * need to *drive* intersection can grab the instances from
 * `intersectionObservers`.
 */
export const intersectionObservers: MockIntersectionObserver[] = [];

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  readonly elements = new Set<Element>();

  constructor(private readonly callback: IntersectionObserverCallback) {
    intersectionObservers.push(this);
  }

  observe(element: Element) {
    this.elements.add(element);
  }
  unobserve(element: Element) {
    this.elements.delete(element);
  }
  disconnect() {
    this.elements.clear();
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Test helper: report every observed element as entering/leaving view. */
  trigger(isIntersecting: boolean) {
    const entries = [...this.elements].map(
      (target) => ({ target, isIntersecting }) as IntersectionObserverEntry,
    );
    this.callback(entries, this);
  }
}

class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

/** Media queries default to "no match"; tests override per query as needed. */
export function mockMatchMedia(matches: (query: string) => boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => {
  // jsdom has no media pipeline at all; tests that care about playback
  // override these to record the calls.
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  HTMLMediaElement.prototype.pause = vi.fn();

  intersectionObservers.length = 0;
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  vi.stubGlobal("ResizeObserver", MockResizeObserver);
  mockMatchMedia(() => false);
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
