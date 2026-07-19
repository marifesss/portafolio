"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeSlideIn,
  fadeSlideInReduced,
  revealTile,
  revealTileContainer,
  revealTileContainerReduced,
  revealTileReduced,
  staggerContainer,
  staggerContainerReduced,
  staggerItem,
  staggerItemReduced,
} from "@/lib/motion";

/**
 * Reduced-motion-aware variant selector. Returns instant variants when the
 * user prefers reduced motion. Because the base and reduced variants share the
 * same `hidden` values, selecting between them never changes the SSR markup —
 * only the post-mount transition — so there's no hydration mismatch.
 *
 * Sections building their own staggered lists should resolve variants through
 * this hook so they collapse consistently:
 *
 *   const m = useSectionMotion();
 *   <motion.ul variants={m.staggerContainer} initial="hidden" animate="visible">
 *     {items.map((x) => <motion.li key={x} variants={m.staggerItem} />)}
 *   </motion.ul>
 */
export function useSectionMotion() {
  const reduce = useReducedMotion();
  return reduce
    ? {
        fadeSlideIn: fadeSlideInReduced,
        staggerContainer: staggerContainerReduced,
        staggerItem: staggerItemReduced,
        revealTileContainer: revealTileContainerReduced,
        revealTile: revealTileReduced,
      }
    : {
        fadeSlideIn,
        staggerContainer,
        staggerItem,
        revealTileContainer,
        revealTile,
      };
}

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  /**
   * Orchestrate direct `staggerItem` children instead of fading the block as a
   * whole. When true, wrap each child element in a `motion` element using the
   * `staggerItem` variant.
   */
  stagger?: boolean;
}

/**
 * The standard section/page entrance: fade + slide-in on mount, honoring
 * `prefers-reduced-motion`. Each feature `*Section` wraps its content in this
 * so every route transitions the same way. (Each page renders one section, so
 * this doubles as the page transition.)
 */
export function SectionTransition({
  children,
  className,
  stagger = false,
}: SectionTransitionProps) {
  const m = useSectionMotion();
  return (
    <motion.div
      className={className}
      variants={stagger ? m.staggerContainer : m.fadeSlideIn}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
