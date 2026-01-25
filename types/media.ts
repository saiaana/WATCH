import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';

export type MediaContent = Movie | TvShow;
export type BasePath = '/movies' | '/tvshows';

export type TabType = 'movies' | 'tv';
export type ContentType = 'movie' | 'tv';

export type { LazySectionConfig, MediaCategory } from '@/types/content';
