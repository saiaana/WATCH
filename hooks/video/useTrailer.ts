import { useEffect, useState } from 'react';
import { getTrailerUrl } from '@/lib/client/data-service';

export function useTrailer(title: string, load: boolean) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!load) return;

    let active = true;
    setIsLoading(true);

    async function loadTrailer() {
      const url = await getTrailerUrl(title);

      if (active) {
        setTrailerUrl(url);
        setIsLoading(false);
      }
    }

    loadTrailer();

    return () => {
      active = false;
    };
  }, [title, load]);

  return { trailerUrl, isLoading };
}
