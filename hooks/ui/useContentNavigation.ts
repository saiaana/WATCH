'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LAST_CONTENT_PAGE_KEY = 'lastContentPage';

export function useContentNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (pathname === '/movies') {
      sessionStorage.setItem(LAST_CONTENT_PAGE_KEY, 'movie');
    } else if (pathname === '/tvshows') {
      sessionStorage.setItem(LAST_CONTENT_PAGE_KEY, 'tv');
    }
  }, [pathname]);
}

export function getLastContentPage(): 'movie' | 'tv' | null {
  if (typeof window === 'undefined') return null;
  const lastPage = sessionStorage.getItem(LAST_CONTENT_PAGE_KEY);
  return lastPage === 'tv' ? 'tv' : lastPage === 'movie' ? 'movie' : null;
}
