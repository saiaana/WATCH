import { useEffect, useCallback, useRef, useState } from 'react';
import { cache } from '@/lib/cache';

interface UseCachedDataOptions<T> {
  key: string;
  ttl?: number;
  enabled?: boolean;
  loadFn?: () => Promise<T> | T;
  validateFn?: (data: T | null) => boolean;
  onCacheHit?: (data: T) => void;
  onCacheMiss?: (data: T) => void;
  autoSync?: boolean;
  dependencies?: unknown[];
}

interface UseCachedDataReturn<T> {
  getCached: () => T | null;
  setCached: (data: T) => void;
  hasCached: () => boolean;
  clearCache: () => void;
  load: () => Promise<T | null>;
  isLoading: boolean;
  error: Error | null;
}

export function useCachedData<T>({
  key,
  ttl = 10 * 60 * 1000,
  enabled = true,
  loadFn,
  validateFn,
  onCacheHit,
  onCacheMiss,
  autoSync = true,
  dependencies = [],
}: UseCachedDataOptions<T>): UseCachedDataReturn<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const inFlightRef = useRef<Promise<T | null> | null>(null);

  const getCached = useCallback((): T | null => {
    if (!enabled) return null;

    try {
      const data = cache.get<T>(key);
      const normalized = data ?? null;

      if (validateFn) {
        return validateFn(normalized) ? normalized : null;
      }

      return normalized;
    } catch (e) {
      console.warn(`Cache read error for key "${key}":`, e);
      return null;
    }
  }, [enabled, key, validateFn]);

  const setCached = useCallback(
    (data: T) => {
      if (!enabled) return;
      try {
        cache.set(key, data, ttl);
      } catch (e) {
        console.warn(`Cache write error for key "${key}":`, e);
      }
    },
    [enabled, key, ttl],
  );

  const hasCached = useCallback(() => {
    if (!enabled) return false;
    try {
      return cache.has(key);
    } catch {
      return false;
    }
  }, [enabled, key]);

  const clearCache = useCallback(() => {
    try {
      cache.delete(key);
    } catch (e) {
      console.warn(`Cache delete error for key "${key}":`, e);
    }
  }, [key]);

  const load = useCallback(async (): Promise<T | null> => {
    if (!enabled) return null;

    // дедупликация конкурентных вызовов
    if (inFlightRef.current) return inFlightRef.current;

    const cached = getCached();
    if (cached !== null) {
      onCacheHit?.(cached);
      return cached;
    }

    if (!loadFn) return null;

    const p = (async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await Promise.resolve(loadFn());
        setCached(data);
        onCacheMiss?.(data);
        return data;
      } catch (e) {
        const err = e instanceof Error ? e : new Error('Failed to load data');
        setError(err);
        console.error(`Error loading data for key "${key}":`, e);
        return null;
      } finally {
        setIsLoading(false);
        inFlightRef.current = null;
      }
    })();

    inFlightRef.current = p;
    return p;
  }, [enabled, getCached, loadFn, onCacheHit, onCacheMiss, setCached, key]);

  useEffect(() => {
    if (!enabled || !autoSync || !loadFn) return;

    // только если нет/невалидно
    const cached = getCached();
    if (cached === null) {
      void load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, autoSync, loadFn, getCached, load, dependencies]);

  return {
    getCached,
    setCached,
    hasCached,
    clearCache,
    load,
    isLoading,
    error,
  };
}

export function useCacheSync<T>({
  key,
  data,
  ttl = 10 * 60 * 1000,
  enabled = true,
  shouldSync,
}: {
  key: string;
  data: T | null | undefined;
  ttl?: number;
  enabled?: boolean;
  shouldSync?: (data: T) => boolean;
}) {
  useEffect(() => {
    if (!enabled) return;
    if (data == null) return;

    if (shouldSync && !shouldSync(data)) return;

    try {
      cache.set(key, data, ttl);
    } catch (e) {
      console.warn(`Cache sync error for key "${key}":`, e);
    }
  }, [key, data, ttl, enabled, shouldSync]);
}
