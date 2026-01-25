/**
 * Movie categories configuration
 */
export const MOVIE_CATEGORIES = ['popular', 'top_rated', 'now_playing', 'upcoming'] as const;

export type MovieCategory = (typeof MOVIE_CATEGORIES)[number];

/**
 * TV Show categories configuration
 */
export const TV_SHOW_CATEGORIES = ['popular', 'top_rated', 'on_the_air', 'airing_today'] as const;

export type TvShowCategory = (typeof TV_SHOW_CATEGORIES)[number];
