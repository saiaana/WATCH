'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGenres } from '@/hooks/utils/useGenres';
import { useCachedData, useCacheSync } from '@/hooks/utils/useCachedData';
import { CACHE_TTL_MS } from '@/constants/cache';

import type { RootState } from '@/store';

interface UseCriticalContentParams<T> {
  selectItems: (state: RootState) => T[];
  selectLoading: (state: RootState) => boolean;
  selectError: (state: RootState) => string | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchAction: (category: 'popular') => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAction: (payload: { category: 'popular'; items: T[] }) => any;

  cacheKey: string;
}

const CACHE_TTL = CACHE_TTL_MS.SHORT;
const GENRES_CACHE_KEY = 'homepage_genres';

export function useCriticalContent<T>({
  selectItems,
  selectLoading,
  selectError,
  fetchAction,
  setAction,
  cacheKey,
}: UseCriticalContentParams<T>) {
  const dispatch = useAppDispatch();
  const { genres, isLoading: isLoadingGenres, error: genresError } = useGenres();

  const items = useAppSelector(selectItems);
  const isLoadingItems = useAppSelector(selectLoading);
  const itemsError = useAppSelector(selectError);

  const error = itemsError || genresError;
  const isLoading = isLoadingItems || isLoadingGenres;

  const cached = useCachedData<T[]>({
    key: cacheKey,
    ttl: CACHE_TTL,
    validateFn: (data) => Array.isArray(data) && data.length > 0,
  });

  useEffect(() => {
    if (items.length > 0) return;

    const cachedData = cached.getCached();
    if (cachedData) {
      dispatch(setAction({ category: 'popular', items: cachedData }));
    } else {
      dispatch(fetchAction('popular'));
    }
  }, [dispatch, items.length, cached, fetchAction, setAction]);

  useCacheSync({
    key: cacheKey,
    data: items,
    ttl: CACHE_TTL,
    shouldSync: (data) => data.length > 0,
  });

  useCacheSync({
    key: GENRES_CACHE_KEY,
    data: genres,
    ttl: CACHE_TTL,
    shouldSync: (data) => data.length > 0,
  });

  return {
    items,
    genres,
    isLoading,
    error,
  };
}
