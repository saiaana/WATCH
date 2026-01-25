import { useCallback, useEffect, useRef, useState, startTransition } from 'react';
import { dedupeById } from '@/helpers/dedupeById';
import { useGenres } from '@/hooks/utils/useGenres';
import { useCardItems } from '@/hooks/utils/useCardItems';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';
import type { Actor, CrewMember } from '@/types/common';

type SearchType = 'movie' | 'tv' | 'person';

function filterActorsAndDirectors<T extends { known_for_department?: string }>(items: T[]): T[] {
  return items.filter(
    (item) => item.known_for_department === 'Acting' || item.known_for_department === 'Directing',
  );
}

interface PaginatedState<T = unknown> {
  items: T[];
  page: number;
  totalPages: number;
  loading: boolean;
}

const INITIAL_STATE_MOVIE: PaginatedState<Movie> = {
  items: [],
  page: 1,
  totalPages: 0,
  loading: false,
};

const INITIAL_STATE_TV: PaginatedState<TvShow> = {
  items: [],
  page: 1,
  totalPages: 0,
  loading: false,
};

const INITIAL_STATE_PERSON: PaginatedState<Actor | CrewMember> = {
  items: [],
  page: 1,
  totalPages: 0,
  loading: false,
};

export function useSearchQuery(isOpen: boolean) {
  const { genres } = useGenres();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [results, setResults] = useState<{
    movie: PaginatedState<Movie>;
    tv: PaginatedState<TvShow>;
    person: PaginatedState<Actor | CrewMember>;
  }>({
    movie: { ...INITIAL_STATE_MOVIE },
    tv: { ...INITIAL_STATE_TV },
    person: { ...INITIAL_STATE_PERSON },
  });

  const abortRef = useRef<AbortController | null>(null);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setHasSearched(false);
      setResults({
        movie: { ...INITIAL_STATE_MOVIE },
        tv: { ...INITIAL_STATE_TV },
        person: { ...INITIAL_STATE_PERSON },
      });
    }
  }, [isOpen]);

  //Initial search (debounced)
  useEffect(() => {
    if (!query.trim()) {
      setResults({
        movie: { ...INITIAL_STATE_MOVIE },
        tv: { ...INITIAL_STATE_TV },
        person: { ...INITIAL_STATE_PERSON },
      });
      setHasSearched(false);
      return;
    }

    const id = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setHasSearched(true);

      try {
        const [movies, tv, people] = await Promise.all([
          fetchByType(query, 'movie', 1, controller.signal),
          fetchByType(query, 'tv', 1, controller.signal),
          fetchByType(query, 'person', 1, controller.signal),
        ]);

        startTransition(() => {
          // Filter persons to only include Actors and Directors
          const filteredPeople = filterActorsAndDirectors(people.items);

          setResults({
            movie: {
              items: dedupeById(movies.items),
              page: 1,
              totalPages: movies.totalPages,
              loading: false,
            },
            tv: {
              items: dedupeById(tv.items),
              page: 1,
              totalPages: tv.totalPages,
              loading: false,
            },
            person: {
              items: dedupeById(filteredPeople),
              page: 1,
              totalPages: people.totalPages,
              loading: false,
            },
          });
        });
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(id);
  }, [query]);

  // Load more
  const loadMore = useCallback(
    async (type: SearchType) => {
      let nextPage: number | null = null;

      // Check if we can load more and set loading
      setResults((prev) => {
        const state = prev[type];
        if (state.loading || state.page >= state.totalPages) {
          return prev;
        }

        nextPage = state.page + 1;

        // Set loading immediately
        return {
          ...prev,
          [type]: { ...prev[type], loading: true },
        };
      });

      if (!nextPage) return;

      try {
        const data = await fetchByType(query, type, nextPage);

        startTransition(() => {
          setResults((prev) => {
            // Filter persons to only include Actors and Directors when loading more
            const newItems = type === 'person' ? filterActorsAndDirectors(data.items) : data.items;

            return {
              ...prev,
              [type]: {
                items: dedupeById([...prev[type].items, ...newItems]),
                page: nextPage!,
                totalPages: data.totalPages,
                loading: false,
              },
            };
          });
        });
      } catch {
        setResults((prev) => ({
          ...prev,
          [type]: { ...prev[type], loading: false },
        }));
      }
    },
    [query],
  );

  // Wrapper functions for compatibility with components
  const loadMoreMovies = useCallback(() => loadMore('movie'), [loadMore]);
  const loadMoreTv = useCallback(() => loadMore('tv'), [loadMore]);
  const loadMoreActors = useCallback(() => loadMore('person'), [loadMore]);

  return {
    query,
    setQuery,
    loading,
    hasSearched,

    movieItems: useCardItems(results.movie.items, genres, 'movie'),
    tvItems: useCardItems(results.tv.items, genres, 'tv'),
    people: results.person.items,

    loadingMoreMovies: results.movie.loading,
    loadingMoreTv: results.tv.loading,
    loadingMoreActors: results.person.loading,

    hasMoreMovies: results.movie.page < results.movie.totalPages,
    hasMoreTv: results.tv.page < results.tv.totalPages,
    hasMoreActors: results.person.page < results.person.totalPages,

    loadMoreMovies,
    loadMoreTv,
    loadMoreActors,
  };
}

// API call
async function fetchByType(query: string, type: SearchType, page: number, signal?: AbortSignal) {
  const res = await fetch('/api/search/by-type', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, type, page }),
    signal,
  });

  if (!res.ok) {
    throw new Error('Search failed');
  }

  return res.json();
}
