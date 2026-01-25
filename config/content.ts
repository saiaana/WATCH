/**
 * Content configuration constants
 */
export const CONTENT_CONFIG = {
  // Initial number of cards to show in sliders
  INITIAL_CARDS_COUNT: 10,

  // Maximum number of search results to return
  MAX_SEARCH_RESULTS: 20,

  // Cache duration in milliseconds (1 hour)
  CACHE_DURATION: 60 * 60 * 1000,

  // Intersection Observer settings for lazy loading
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '200px',
} as const;
