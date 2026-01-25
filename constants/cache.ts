export const CACHE_TTL_MS = {
  SHORT: 10 * 60 * 1000, // 10 minutes
  MEDIUM: 60 * 60 * 1000, // 1 hour
  LONG: 6 * 60 * 60 * 1000, // 6 hours
} as const;

export const CACHE_REVALIDATE = {
  SHORT: 10 * 60, // 10 minutes
  MEDIUM: 60 * 60, // 1 hour
  LONG: 6 * 60 * 60, // 6 hours
  DAY: 24 * 60 * 60, // 24 hours
  MONTH: 30 * 24 * 60 * 60, // 30 days
} as const;
