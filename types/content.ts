export type MediaCategory =
  | 'popular'
  | 'top_rated'
  | 'now_playing'
  | 'upcoming'
  | 'on_the_air'
  | 'airing_today';

export interface LazySectionConfig {
  category: MediaCategory;
  title: string;
  path: string;
}
