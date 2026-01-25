import { TabConfig } from '@/types/component';
import { MediaCategory } from '@/types/content';

export const DEFAULT_CATEGORY: MediaCategory = 'popular';

export const DEFAULT_CATEGORY_CONFIG: Record<
  MediaCategory,
  { title: string; subtitle: string; icon: string }
> = {
  popular: { title: 'Popular', subtitle: 'The most popular movies and TV shows', icon: '🎬' },
  top_rated: { title: 'Top Rated', subtitle: 'The highest rated movies and TV shows', icon: '🎬' },
  now_playing: {
    title: 'Now Playing',
    subtitle: 'The movies and TV shows currently playing',
    icon: '🎬',
  },
  upcoming: { title: 'Upcoming', subtitle: 'The upcoming movies and TV shows', icon: '🎬' },
  on_the_air: { title: 'On the Air', subtitle: 'The TV shows currently on the air', icon: '🎬' },
  airing_today: { title: 'Airing Today', subtitle: 'The TV shows airing today', icon: '🎬' },
};

export const DEFAULT_MOVIES_TAB_CONFIG: TabConfig = {
  emptyStateIcon: '🎬',
  emptyStateTitle: 'No movies found',
  emptyStateDescription: 'Check back later for new content',
  loadingTitle: 'Loading Movies',
  loadingSubtitle: 'Discovering the best content...',
};

export const DEFAULT_TV_TAB_CONFIG: TabConfig = {
  emptyStateIcon: '🎬',
  emptyStateTitle: 'No TV shows found',
  emptyStateDescription: 'Check back later for new content',
  loadingTitle: 'Loading TV Shows',
  loadingSubtitle: 'Discovering the best content...',
};
