'use client';

import { useCategoryContent } from '@/hooks/content/categories/useCategoryContent';
import ContentGridWithTabs from './ContentGridWithTabs';
import { getContentLink } from '@/helpers/routes';
import type { TabConfig } from '@/types/component';
import type { MovieCategory } from '@/config/categories';
import type { TvShowCategory } from '@/config/categories';
import {
  DEFAULT_CATEGORY,
  DEFAULT_CATEGORY_CONFIG,
  DEFAULT_MOVIES_TAB_CONFIG,
  DEFAULT_TV_TAB_CONFIG,
} from './contentGrid.defaults';

interface ContentGridClientProps {
  category?: MovieCategory | TvShowCategory;
  movieCategory?: MovieCategory;
  tvCategory?: TvShowCategory;
  title?: string;
  subtitle?: string;
  icon?: string;
  moviesTabConfig?: TabConfig;
  tvTabConfig?: TabConfig;
}

export default function ContentGridClient(props: ContentGridClientProps) {
  const finalCategory = props.category ?? DEFAULT_CATEGORY;

  const finalMovieCategory: MovieCategory =
    props.movieCategory ??
    (['popular', 'top_rated', 'now_playing', 'upcoming'].includes(finalCategory)
      ? (finalCategory as MovieCategory)
      : 'popular');

  const finalTvCategory: TvShowCategory =
    props.tvCategory ??
    (['popular', 'top_rated', 'on_the_air', 'airing_today'].includes(finalCategory)
      ? (finalCategory as TvShowCategory)
      : 'popular');

  const defaults = DEFAULT_CATEGORY_CONFIG[finalMovieCategory];

  const title = props.title ?? defaults?.title ?? 'Movies';
  const subtitle = props.subtitle ?? defaults?.subtitle ?? '';
  const icon = props.icon ?? defaults?.icon ?? '🎬';
  const moviesConfig = { ...DEFAULT_MOVIES_TAB_CONFIG, ...props.moviesTabConfig };
  const tvConfig = { ...DEFAULT_TV_TAB_CONFIG, ...props.tvTabConfig };

  const {
    movies,
    tvShows,
    moviesLoading,
    tvShowsLoading,
    moviesInitialLoading,
    tvShowsInitialLoading,
    moviesHasMore,
    tvShowsHasMore,
    moviesLoadMoreRef,
    tvShowsLoadMoreRef,
  } = useCategoryContent(finalCategory, {
    movieCategory: finalMovieCategory,
    tvCategory: finalTvCategory,
  });

  return (
    <ContentGridWithTabs
      title={title}
      subtitle={subtitle}
      icon={icon}
      moviesTab={{
        items: movies,
        loading: moviesLoading,
        initialLoading: moviesInitialLoading,
        hasMore: moviesHasMore,
        loadMoreRef: moviesLoadMoreRef,
        ...moviesConfig,
      }}
      tvTab={{
        items: tvShows,
        loading: tvShowsLoading,
        initialLoading: tvShowsInitialLoading,
        hasMore: tvShowsHasMore,
        loadMoreRef: tvShowsLoadMoreRef,
        ...tvConfig,
      }}
      getMovieLinkTo={(item) => getContentLink(item.id, 'movie')}
      getTvLinkTo={(item) => getContentLink(item.id, 'tv')}
    />
  );
}
