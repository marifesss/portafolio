/**
 * Accent hue per project, shared by the playlist rows, the Home cards, and the
 * detail-view "album art" so a given project wears the same color everywhere.
 * Falls back to the sidebar blue for any slug without an assigned hue.
 */
const PROJECT_HUES: Record<string, number> = {
  yelou: 145,
  arrowmaze: 275,
  partela: 210,
};

export const hueFor = (slug: string): number => PROJECT_HUES[slug] ?? 210;
