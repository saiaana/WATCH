import { CardItem } from '@/features/cards/mapToCardItem';
import type { ContentType } from '@/types/media';

export interface SearchPerson {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department?: string;
}

export type SearchTabType = 'movies' | 'tv' | 'actors';

export interface SearchTabConfig {
  type: SearchTabType;
  label: string;
  icon: string;
  contentType: ContentType | 'person';
  title: string;
}

export const SEARCH_TABS: Record<SearchTabType, SearchTabConfig> = {
  movies: {
    type: 'movies',
    label: 'Movies',
    icon: '🎬',
    contentType: 'movie',
    title: 'Movies',
  },
  tv: {
    type: 'tv',
    label: 'TV Shows',
    icon: '📺',
    contentType: 'tv',
    title: 'TV Shows',
  },
  actors: {
    type: 'actors',
    label: 'Actors & Directors',
    icon: '👤',
    contentType: 'person',
    title: 'Actors & Directors',
  },
} as const;

export interface SearchResultsData {
  movieItems: CardItem[];
  tvItems: CardItem[];
  people: SearchPerson[];
}

export interface SearchLoadingState {
  loading: boolean;
  loadingMoreMovies: boolean;
  loadingMoreTv: boolean;
  loadingMoreActors: boolean;
}

export interface SearchPaginationState {
  hasMoreMovies: boolean;
  hasMoreTv: boolean;
  hasMoreActors: boolean;
  loadMoreMovies: () => void;
  loadMoreTv: () => void;
  loadMoreActors: () => void;
}
