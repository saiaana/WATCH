import { useEffect, useState, useRef } from 'react';
import type { Actor } from '@/types/common';
import { getActors } from '@/lib/client/data-service';

const actorsCache = new Map<string, Actor[]>();

export function useFeaturedHeroActors(id: number | null, isMovie: boolean) {
  const [actors, setActors] = useState<Actor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const lastRequestKey = useRef<string | null>(null);

  useEffect(() => {
    if (!id) {
      setActors([]);
      lastRequestKey.current = null;
      return;
    }

    const cacheKey = `${id}-${isMovie}`;

    if (actorsCache.has(cacheKey)) {
      setActors(actorsCache.get(cacheKey)!);
      setIsLoading(false);
      lastRequestKey.current = cacheKey;
      return;
    }

    if (lastRequestKey.current === cacheKey) {
      return;
    }

    let active = true;
    setIsLoading(true);

    async function loadActors() {
      try {
        const cast = await getActors(String(id), isMovie ? 'movie' : 'tv');
        const firstSix = cast.slice(0, 6);

        if (!active) return;

        actorsCache.set(cacheKey, firstSix);

        setActors(firstSix);
        setIsLoading(false);
        lastRequestKey.current = cacheKey;
      } catch (err) {
        console.error('Error loading actors:', err);

        if (active) {
          setActors([]);
          setIsLoading(false);
        }
      }
    }

    loadActors();

    // Cleanup for unmount/updates
    return () => {
      active = false;
    };
  }, [id, isMovie]);

  return { actors, isLoading };
}
