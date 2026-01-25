import { useState, useEffect, useRef, useMemo } from 'react';
import { useIntersectionObserver } from '@/hooks/ui/useIntersectionObserver';
import { CONTENT_CONFIG } from '@/config/content';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';
import { getContentByCategory } from '@/lib/client/data-service';
import { cache } from '@/lib/cache';
import { CACHE_TTL_MS } from '@/constants/cache';
import type { MediaContent, MediaCategory } from '@/types/media';

const CACHE_TTL = CACHE_TTL_MS.SHORT;

interface UseLazyContentParams {
  category: MediaCategory;
  contentType: 'movie' | 'tv';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseLazyContentReturn {
  content: MediaContent[];
  loading: boolean;
  error: string | null;
  elementRef: (node: HTMLDivElement | null) => void;
  isIntersecting: boolean;
  hasTriggered: boolean;
}

export function useLazyContent({
  category,
  contentType,
  threshold = CONTENT_CONFIG.INTERSECTION_THRESHOLD,
  rootMargin = CONTENT_CONFIG.INTERSECTION_ROOT_MARGIN,
  triggerOnce = true,
}: UseLazyContentParams): UseLazyContentReturn {
  const [content, setContent] = useState<Movie[] | TvShow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  const { elementRef, isIntersecting, hasTriggered } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const cacheKey = useMemo(
    () => `lazy_byCategory_${contentType}_${category}_page_1`,
    [contentType, category],
  );

  useEffect(() => {
    if (!isIntersecting || isLoadingRef.current || hasLoadedRef.current) return;

    try {
      const cachedContent = cache.get<Movie[] | TvShow[]>(cacheKey);
      if (cachedContent && cachedContent.length > 0) {
        setContent(cachedContent);
        hasLoadedRef.current = true;
        return;
      }
    } catch (error) {
      console.warn('Cache read error, loading from API:', error);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[useLazyContent] Intersection detected for ${category}, loading...`);
    }

    isLoadingRef.current = true;
    hasLoadedRef.current = true;
    setLoading(true);
    setError(null);

    let isCancelled = false;

    const loadContent = async () => {
      try {
        const data = await getContentByCategory(contentType, category, 1);
        const items = data.content as Movie[] | TvShow[];

        if (process.env.NODE_ENV === 'development') {
          console.log(`[useLazyContent] Loaded ${items?.length || 0} items for ${category}`);
        }

        if (!isCancelled) {
          const contentItems = items || [];
          setContent(contentItems);
          try {
            cache.set(cacheKey, contentItems, CACHE_TTL);
          } catch (error) {
            console.warn('Cache write error:', error);
          }
          setLoading(false);
          isLoadingRef.current = false;
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[useLazyContent] Error loading ${category}:`, err);
        }
        if (!isCancelled) {
          setError('Failed to load content');
          setLoading(false);
          isLoadingRef.current = false;
          hasLoadedRef.current = false;
        }
      }
    };

    loadContent();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, contentType, category]);

  return {
    content,
    loading,
    error,
    elementRef,
    isIntersecting,
    hasTriggered,
  };
}
