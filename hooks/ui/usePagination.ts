import { useEffect, useReducer, useCallback, useRef } from 'react';
import { useInfiniteScroll } from './useInfiniteScroll';
import { paginationReducer, PaginationState } from './usePagination.reducer';

export interface PaginatedResponse<T> {
  items: T[];
  totalPages: number;
}

interface UsePaginationOptions<T> {
  fetchPage: (page: number, signal?: AbortSignal) => Promise<PaginatedResponse<T>>;
  enabled?: boolean;
  dependencies?: unknown[];
}

function createInitialState<T>(): PaginationState<T> {
  return {
    items: [],
    page: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
  };
}

export function usePagination<T>({
  fetchPage,
  enabled = true,
  dependencies = [],
}: UsePaginationOptions<T>) {
  const [state, dispatch] = useReducer(paginationReducer<T>, createInitialState<T>());

  const fetchPageRef = useRef(fetchPage);
  useEffect(() => {
    fetchPageRef.current = fetchPage;
  }, [fetchPage]);

  const hasMore = state.page < state.totalPages;
  const isLoading = state.status === 'loading' || state.status === 'loadingMore';

  useEffect(() => {
    if (!enabled) {
      dispatch({ type: 'RESET' });
      return;
    }

    const controller = new AbortController();

    const load = async () => {
      dispatch({ type: 'LOAD_START' });

      try {
        const { items, totalPages } = await fetchPageRef.current(1, controller.signal);

        if (controller.signal.aborted) return;

        dispatch({
          type: 'LOAD_SUCCESS',
          items,
          totalPages,
        });
      } catch (err) {
        if (controller.signal.aborted) return;

        dispatch({
          type: 'LOAD_ERROR',
          error: err instanceof Error ? err : new Error('Failed to load data'),
        });
      }
    };

    load();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...dependencies]);

  const loadMore = useCallback(async () => {
    if (!enabled || isLoading || !hasMore) return;

    const nextPage = state.page + 1;
    const controller = new AbortController();

    dispatch({ type: 'LOAD_MORE_START' });

    try {
      const { items, totalPages } = await fetchPageRef.current(nextPage, controller.signal);

      if (controller.signal.aborted) return;

      dispatch({
        type: 'LOAD_MORE_SUCCESS',
        items,
        page: nextPage,
        totalPages,
      });
    } catch (err) {
      if (controller.signal.aborted) return;

      dispatch({
        type: 'LOAD_ERROR',
        error: err instanceof Error ? err : new Error('Failed to load more data'),
      });
    }
  }, [enabled, isLoading, hasMore, state.page]);

  const loadMoreRef = useInfiniteScroll({
    hasMore,
    loading: isLoading,
    onLoadMore: loadMore,
  });

  return {
    items: state.items,
    page: state.page,
    totalPages: state.totalPages,
    hasMore,

    initialLoading: state.status === 'loading',
    loading: state.status === 'loadingMore',

    error: state.error,

    loadMore,
    loadMoreRef,
  };
}
