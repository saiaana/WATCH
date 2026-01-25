'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import CategoryIcon from '@mui/icons-material/Category';
import type { Genre } from '@/types/common';

interface GenreSelectUIProps {
  genres: Genre[];
  isLoading?: boolean;
  variant?: 'default' | 'mobile';
}

export default function GenreSelectUI({
  genres,
  isLoading = false,
  variant = 'default',
}: GenreSelectUIProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const genreIdFromPath = pathname?.match(/\/genres\/(\d+)/)?.[1];
  const selectedGenre = genreIdFromPath
    ? genres.find((g) => g.id === Number(genreIdFromPath))
    : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={isLoading || genres.length === 0}
        className={cn(
          'flex w-full items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-left text-xs font-medium text-neutral-200',
          'shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-200',
          'hover:border-purple-500/30 hover:bg-zinc-900/55 hover:text-purple-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 active:scale-[0.98]',
          'disabled:opacity-50 md:w-[200px] md:gap-3 md:px-4 md:py-2.5 md:text-sm lg:w-[240px]',
          variant === 'mobile' &&
            'border-transparent bg-transparent shadow-none hover:bg-zinc-800/50',
        )}
      >
        <CategoryIcon
          fontSize="small"
          className={cn(
            'flex-shrink-0 transition-colors',
            open ? 'text-purple-300' : 'text-neutral-300',
          )}
        />

        <span className="flex-1 truncate">
          {selectedGenre ? selectedGenre.name : 'SELECT GENRE'}
        </span>

        <svg
          className={cn(
            'h-4 w-4 flex-shrink-0 transition-transform',
            open ? 'rotate-180 text-purple-300' : 'text-neutral-400',
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={cn(
            'z-50 w-full overflow-hidden',
            variant === 'mobile'
              ? 'relative mt-2 rounded-xl border border-zinc-800/60 bg-zinc-900/70'
              : 'absolute mt-2 min-w-[200px] rounded-xl border border-zinc-800/50 bg-zinc-900/80 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:min-w-[240px]',
          )}
        >
          {isLoading ? (
            <div className="px-4 py-3 text-xs text-neutral-300">Loading genres...</div>
          ) : genres.length === 0 ? (
            <div className="px-4 py-3 text-xs text-neutral-300">No genres available</div>
          ) : (
            <div
              className={cn(
                'overflow-y-auto p-1.5',
                'max-h-[200px] sm:max-h-[240px] md:max-h-[280px]',
                'overscroll-contain', // Предотвращает overscroll на мобильных
              )}
              style={{
                WebkitOverflowScrolling: 'touch', // Плавный скролл на iOS
              }}
            >
              {genres.map((genre) => {
                const isSelected = selectedGenre?.id === genre.id;
                const href = `/genres/${genre.id}`;

                return (
                  <Link
                    key={genre.id}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block w-full rounded-lg text-left transition-all duration-150',
                      'px-2.5 py-2.5 text-xs sm:px-3 sm:py-2.5 md:text-sm',
                      'min-h-[44px] flex items-center', // Минимальная высота для touch target
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40',
                      'active:scale-[0.98] touch-manipulation', // Улучшенная touch-реакция
                      isSelected
                        ? 'border border-purple-500/20 bg-gradient-to-r from-purple-500/20 to-pink-500/10 text-purple-200 font-medium'
                        : 'text-neutral-200 active:bg-white/10 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    <span className="block truncate">{genre.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
